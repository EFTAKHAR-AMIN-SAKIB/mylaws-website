'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useApp } from './AppContext';
import { RotateCw, Compass } from 'lucide-react';

interface TurntableScalesProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

const TOTAL_FRAMES = 180;

export function TurntableScales({ containerRef }: TurntableScalesProps) {
  const { lang, t } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation & Frame tracking refs
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetProgress = useRef<number>(0);
  const currentProgress = useRef<number>(0);
  const lastDrawnFrameIndex = useRef<number>(-1);
  const animFrameId = useRef<number | null>(null);
  const isFirstFrameDrawn = useRef<boolean>(false);

  // Display state for live rotation angle indicator
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

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

      // Clear previous canvas
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // Aspect ratio containment for 1280x720 (16:9)
      const imgW = img.naturalWidth || 1280;
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

    // Preload all 180 WebP frames on mount
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/frames/frame_${numStr}.webp`;

      img.onload = () => {
        loadedCount++;
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
        targetProgress.current = 0;
        return;
      }

      // 0.0 when container top is at viewport top, 1.0 when bottom hits viewport bottom
      const progress = -rect.top / scrollableH;
      targetProgress.current = Math.max(0, Math.min(1, progress));
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

    // Continuous requestAnimationFrame loop with linear interpolation (LERP)
    let lastReportedAngle = -1;

    const loop = () => {
      if (prefersReducedMotion) {
        currentProgress.current = targetProgress.current;
      } else {
        // Linear interpolation (currentProgress += (targetProgress - currentProgress) * 0.09)
        const diff = targetProgress.current - currentProgress.current;
        currentProgress.current += diff * 0.09;
      }

      // Map progress to frame index [0..179]
      const frameIndex = Math.min(
        179,
        Math.max(0, Math.round(currentProgress.current * 179))
      );

      // Only draw when rounded frame index changes
      if (frameIndex !== lastDrawnFrameIndex.current) {
        drawFrameByIndex(frameIndex);
      }

      // Update rotation angle display smoothly
      const angle = Math.round(currentProgress.current * 360) % 360;
      if (angle !== lastReportedAngle) {
        lastReportedAngle = angle;
        setRotationAngle(angle);
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
    <div className="relative w-full max-w-[620px] lg:max-w-none flex flex-col items-center justify-center select-none">
      {/* Soft Vignette Overlay to blend WebP edges seamlessly into drafting grid */}
      <div className="relative w-full aspect-[16/9] max-h-[70vh] flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,black_75%,transparent_100%)]">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
          style={{ mixBlendMode: 'multiply' }}
        />

        {/* Loading placeholder skeleton while frame 001 is fetching */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-cinzel text-secondary-light/60">
            <RotateCw className="h-5 w-5 animate-spin mr-2 text-accent-light" />
            <span>Loading 3D Turntable...</span>
          </div>
        )}
      </div>

      {/* Antique Architectural Angle & Scrubbing Status Pill */}
      <div className="mt-3 flex items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border-light bg-surface-light/85 backdrop-blur-xs text-[11px] text-secondary-light shadow-2xs font-cinzel font-semibold tracking-wider">
          <Compass className="h-3.5 w-3.5 text-accent-light animate-pulse" />
          <span>{t('আইনের পাল্লা · ৩৬০° ইন্টারঅ্যাক্টিভ ভিউ', 'SCALES OF JUSTICE · 360° TURNTABLE')}</span>
          <span className="font-mono text-accent-light font-bold bg-accent-light/10 px-1.5 py-0.5 rounded text-[10px]">
            {rotationAngle}°
          </span>
        </div>
      </div>
      <p className="text-[10px] text-secondary-light/80 mt-1 font-hind font-medium">
        {t('স্ক্রল করার সাথে সাথে পাল্লাটি ৩৬০ ডিগ্রিতে ঘুরবে', 'Scroll naturally to scrub the 3D turntable in real-time')}
      </p>
    </div>
  );
}
