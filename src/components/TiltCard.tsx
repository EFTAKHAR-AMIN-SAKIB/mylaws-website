'use client';

import React, { useRef, useState, useCallback } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
}

export function TiltCard({
  children,
  className = '',
  maxTilt = 7,
  perspective = 1000,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [sheenStyle, setSheenStyle] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setTransformStyle(
        `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(6px)`
      );

      // Light sheen coordinates
      setSheenStyle({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.14,
      });
    },
    [maxTilt, perspective]
  );

  const handleMouseLeave = useCallback(() => {
    setTransformStyle(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px)`);
    setSheenStyle((prev) => ({ ...prev, opacity: 0 }));
  }, [perspective]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
        transition: transformStyle ? 'transform 0.12s ease-out' : 'transform 0.4s ease-out',
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}

      {/* Dynamic Specular Sheen Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: sheenStyle.opacity,
          background: `radial-gradient(circle at ${sheenStyle.x}% ${sheenStyle.y}%, rgba(255, 235, 180, 0.5) 0%, rgba(255, 255, 255, 0) 65%)`,
        }}
      />
    </div>
  );
}
