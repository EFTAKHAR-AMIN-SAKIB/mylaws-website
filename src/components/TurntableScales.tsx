'use client';

import React, { useEffect, useRef, useState } from 'react';
import { RotateCw } from 'lucide-react';

interface TurntableScalesProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

const TOTAL_FRAMES = 180;

export function TurntableScales({ containerRef }: TurntableScalesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation & Frame tracking refs
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const scrollProgressRef = useRef<number>(0);
  const autoRotateOffsetRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const lastDrawnFrameIndex = useRef<number>(-1);
  const animFrameId = useRef<number | null>(null);
  const isFirstFrameDrawn = useRef<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const images: HTMLImageElement[] = [];

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Render helper function for canvas
    const renderFrame = (img: HTMLImageElement) => {
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

      // Clear previous canvas frame with full alpha transparency
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // Aspect ratio containment for 720x720 (1:1)
      const imgW = img.naturalWidth || 720;
      const imgH = img.naturalHeight || 720;
      const imgRatio = imgW / imgH;
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

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      ctx.restore();
    };

    const drawFrameByIndex = (index: number) => {
      const img = imagesRef.current[index];
      if (img && img.complete && img.naturalWidth > 0) {
        renderFrame(img);
        lastDrawnFrameIndex.current = index;
      } else {
        // Fallback to frame 0 if current frame not ready yet
        const first = imagesRef.current[0];
        if (first && first.complete && first.naturalWidth > 0 && !isFirstFrameDrawn.current) {
          renderFrame(first);
          isFirstFrameDrawn.current = true;
          lastDrawnFrameIndex.current = 0;
        }
      }
    };

    // Preload all 180 transparent WebP frames on mount
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/frames/frame_${numStr}.webp`;

      img.onload = () => {
        // Draw frame_001.webp immediately as soon as it loads!
        if (i === 1) {
          drawFrameByIndex(0);
          setIsLoading(false);
          isFirstFrameDrawn.current = true;
        }
      };

      images.push(img);
    }
    imagesRef.current = images;

    // Scroll listener: track container scroll progress (0.0 to 1.0)
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const scrollableH = rect.height - windowH;

      if (scrollableH <= 0) {
        scrollProgressRef.current = 0;
        return;
      }

      // 0.0 when container top is at viewport top, 1.0 when bottom hits viewport bottom
      const progress = -rect.top / scrollableH;
      scrollProgressRef.current = Math.max(0, Math.min(1, progress));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial position check
    handleScroll();

    // Handle window resize for retina sizing
    const handleResize = () => {
      if (lastDrawnFrameIndex.current >= 0) {
        drawFrameByIndex(lastDrawnFrameIndex.current);
      }
    };
    window.addEventListener('resize', handleResize);

    // Continuous requestAnimationFrame loop with auto-round (continuous auto-rotation)
    // and smooth scroll scrubbing with linear interpolation (LERP)
    const loop = () => {
      // Auto-round: gentle, stately auto-rotation pace (~22 seconds per 360° turn at 60fps)
      if (!prefersReducedMotion) {
        autoRotateOffsetRef.current = (autoRotateOffsetRef.current + 0.00075) % 1.0;
      }

      // Target progress combines user scroll scrub with auto-rotation
      const targetProgress = (scrollProgressRef.current * 1.5 + autoRotateOffsetRef.current) % 1.0;

      if (prefersReducedMotion) {
        currentProgressRef.current = targetProgress;
      } else {
        // Circular linear interpolation (shortest path around 0..1 circle to prevent backwards flips)
        let diff = targetProgress - currentProgressRef.current;
        if (diff > 0.5) diff -= 1.0;
        if (diff < -0.5) diff += 1.0;
        currentProgressRef.current = (currentProgressRef.current + diff * 0.09 + 1.0) % 1.0;
      }

      // Map progress to frame index [0..179]
      const frameIndex = Math.min(
        179,
        Math.max(0, Math.floor(currentProgressRef.current * TOTAL_FRAMES))
      );

      // Only draw when rounded frame index changes
      if (frameIndex !== lastDrawnFrameIndex.current) {
        drawFrameByIndex(frameIndex);
      }

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
  }, [containerRef]);

  return (
    <div className="relative w-full flex items-center justify-center select-none">
      {/* Sized prominently to match website scale & vibe with 100% transparent backdrop */}
      <div className="relative w-full aspect-square max-w-[560px] sm:max-w-[620px] lg:max-w-[700px] xl:max-w-[760px] max-h-[82vh] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none drop-shadow-[0_16px_32px_rgba(35,31,28,0.12)]"
        />

        {/* Loading placeholder skeleton while frame 001 is fetching */}
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
