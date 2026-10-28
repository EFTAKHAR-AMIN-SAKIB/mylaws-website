'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCw } from 'lucide-react';

interface TurntableScalesProps {
  containerRef?: React.RefObject<HTMLElement | null>;
}

const TOTAL_FRAMES = 180;

export function TurntableScales({ containerRef }: TurntableScalesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation & Frame tracking refs
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const scrollProgressRef = useRef<number>(0);
  const autoRotateOffsetRef = useRef<number>(0);
  const dragOffsetRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const lastTimestampRef = useRef<number>(0);
  const animFrameId = useRef<number | null>(null);

  // Pointer drag state for tangible interactive turntable
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartOffsetRef = useRef<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Render helper function with sub-frame alpha crossfade for liquid-smooth 60fps
  const renderFrames = useCallback(
    (frameIndexA: number, frameIndexB: number, blendFraction: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const displayWidth = rect.width;
      const displayHeight = rect.height;
      if (displayWidth === 0 || displayHeight === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetCanvasWidth = Math.round(displayWidth * dpr);
      const targetCanvasHeight = Math.round(displayHeight * dpr);

      if (canvas.width !== targetCanvasWidth || canvas.height !== targetCanvasHeight) {
        canvas.width = targetCanvasWidth;
        canvas.height = targetCanvasHeight;
      }

      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Retina & high-quality smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Clear previous canvas frame with full alpha transparency
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      const imgA = imagesRef.current[frameIndexA];
      if (!imgA || !imgA.complete || imgA.naturalWidth === 0) {
        const first = imagesRef.current[0];
        if (first && first.complete && first.naturalWidth > 0) {
          ctx.drawImage(first, 0, 0, displayWidth, displayHeight);
        }
        ctx.restore();
        return;
      }

      // 1:1 Aspect ratio containment
      const imgRatio = 1;
      const canvasRatio = displayWidth / displayHeight;

      let drawW = displayWidth;
      let drawH = displayHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawH = displayHeight;
        drawW = displayHeight * imgRatio;
        offsetX = (displayWidth - drawW) / 2;
      } else {
        drawW = displayWidth;
        drawH = displayWidth / imgRatio;
        offsetY = (displayHeight - drawH) / 2;
      }

      // Draw primary base frame A
      ctx.globalAlpha = 1.0;
      ctx.drawImage(imgA, offsetX, offsetY, drawW, drawH);

      // Draw next frame B with smooth fractional alpha crossfade for sub-frame fluidity
      if (blendFraction > 0.01) {
        const imgB = imagesRef.current[frameIndexB];
        if (imgB && imgB.complete && imgB.naturalWidth > 0) {
          ctx.globalAlpha = blendFraction;
          ctx.drawImage(imgB, offsetX, offsetY, drawW, drawH);
        }
      }

      ctx.restore();
    },
    []
  );

  useEffect(() => {
    const images: HTMLImageElement[] = [];

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Preload all 180 transparent WebP frames on mount
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/frames/frame_${numStr}.webp`;

      img.onload = () => {
        // Draw frame_001.webp immediately as soon as it loads!
        if (i === 1) {
          renderFrames(0, 1, 0);
          setIsLoading(false);
        }
      };

      images.push(img);
    }
    imagesRef.current = images;

    // Scroll listener: smoothly scrubs turntable based on scroll offset
    const handleScroll = () => {
      // Fast, responsive 360 rotation on scroll
      scrollProgressRef.current = (window.scrollY * 0.0018) % 1.0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Handle window resize for retina sizing
    const handleResize = () => {
      const exactFrame = currentProgressRef.current * TOTAL_FRAMES;
      const frameA = Math.floor(exactFrame) % TOTAL_FRAMES;
      const frameB = (frameA + 1) % TOTAL_FRAMES;
      const fraction = exactFrame - Math.floor(exactFrame);
      renderFrames(frameA, frameB, fraction);
    };
    window.addEventListener('resize', handleResize);

    // Continuous requestAnimationFrame loop with sub-frame alpha crossfade
    const loop = (timestamp: number) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimestampRef.current) / 1000, 0.1);
      lastTimestampRef.current = timestamp;

      // Auto-round: energetic, brisk 3D turntable rotation (~5 seconds per 360° turn)
      if (!prefersReducedMotion && !isDraggingRef.current) {
        autoRotateOffsetRef.current = (autoRotateOffsetRef.current + dt * 0.20) % 1.0;
      }

      // Target progress combines user scroll scrub + manual drag + auto-rotation
      const targetProgress =
        (scrollProgressRef.current + dragOffsetRef.current + autoRotateOffsetRef.current) % 1.0;

      if (prefersReducedMotion) {
        currentProgressRef.current = targetProgress;
      } else {
        // Silky circular shortest-path interpolation with fast, snappy response
        let diff = targetProgress - currentProgressRef.current;
        if (diff > 0.5) diff -= 1.0;
        if (diff < -0.5) diff += 1.0;
        currentProgressRef.current = (currentProgressRef.current + diff * 0.18 + 1.0) % 1.0;
      }

      // Calculate continuous floating frame index [0.0 .. 180.0)
      const exactFrame = currentProgressRef.current * TOTAL_FRAMES;
      const frameA = Math.floor(exactFrame) % TOTAL_FRAMES;
      const frameB = (frameA + 1) % TOTAL_FRAMES;
      const fraction = exactFrame - Math.floor(exactFrame);

      // Render blended frames at native monitor refresh rate (60fps/120fps)
      renderFrames(frameA, frameB, fraction);

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    // Clean up all listeners and RAF on unmount
    return () => {
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [renderFrames]);

  // Pointer drag event handlers for direct tactile turntable interaction
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = dragOffsetRef.current;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    // 300px drag = 1 full 360 degree rotation (faster, responsive drag)
    dragOffsetRef.current = (dragStartOffsetRef.current + deltaX / 300) % 1.0;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  return (
    <div
      className="relative w-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      title="Click and drag horizontally to spin the Scales of Justice"
    >
      {/* Prominently sized with clean transparent backdrop and soft elevation shadow */}
      <div className="relative w-full aspect-square max-w-[560px] sm:max-w-[620px] lg:max-w-[700px] xl:max-w-[760px] max-h-[82vh] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none drop-shadow-[0_16px_32px_rgba(35,31,28,0.12)]"
        />

        {/* Loading placeholder skeleton while initial frame loads */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-cinzel text-secondary-light/60">
            <RotateCw className="h-6 w-6 animate-spin mr-2 text-accent-light" />
            <span>Loading 3D Scales of Justice...</span>
          </div>
        )}
      </div>
    </div>
  );
}
