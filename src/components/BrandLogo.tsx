'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BrandLogoProps {
  className?: string;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'stacked';
}

export function BrandLogo({
  className = '',
  showSubtitle = false,
  size = 'md',
  layout = 'horizontal',
}: BrandLogoProps) {
  if (layout === 'stacked') {
    return (
      <Link
        href="/"
        className={`inline-flex flex-col items-center group transition-opacity hover:opacity-95 ${className}`}
        aria-label="MyLaws Home"
      >
        <Image
          src="/images/logo-stacked.png"
          alt="MyLaws"
          width={220}
          height={208}
          className="w-auto h-20 sm:h-24 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          priority
        />
        {showSubtitle && (
          <span className="font-cinzel text-[9px] uppercase tracking-widest text-secondary-light font-medium mt-1">
            Legal Assistant
          </span>
        )}
      </Link>
    );
  }

  const iconHeights = {
    sm: 'h-7 sm:h-8',
    md: 'h-8 sm:h-9',
    lg: 'h-10 sm:h-12',
  };

  const textHeights = {
    sm: 'h-4 sm:h-5',
    md: 'h-5 sm:h-6',
    lg: 'h-6 sm:h-7',
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 sm:gap-3 group transition-opacity hover:opacity-95 ${className}`}
      aria-label="MyLaws Home"
    >
      {/* Precision Official Balance Scale Icon */}
      <div className="relative flex items-center justify-center shrink-0">
        <Image
          src="/images/logo-icon.png"
          alt=""
          width={49}
          height={36}
          className={`${iconHeights[size]} w-auto object-contain transform transition-transform duration-300 group-hover:scale-105`}
          priority
        />
      </div>

      {/* Official MyLaws Custom Wordmark */}
      <div className="flex flex-col justify-center">
        <Image
          src="/images/logo-text.png"
          alt="MyLaws"
          width={102}
          height={24}
          className={`${textHeights[size]} w-auto object-contain`}
          priority
        />
        {showSubtitle && (
          <span className="font-cinzel text-[9px] uppercase tracking-widest text-secondary-light font-medium mt-0.5">
            Legal Assistant
          </span>
        )}
      </div>
    </Link>
  );
}
