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
          width={1357}
          height={1270}
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

  const heights = {
    sm: 'h-7 sm:h-8',
    md: 'h-8 sm:h-9',
    lg: 'h-10 sm:h-12',
  };

  // When showSubtitle is true (e.g. in Footer), use the precision lockup
  // where "LEGAL ASSISTANT" is perfectly aligned directly under the "MYLAWS" wordmark.
  const logoSrc = showSubtitle
    ? '/images/logo-horizontal-with-subtitle.png'
    : '/images/logo-horizontal.png';

  const subtitleHeights = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-12 sm:h-14',
  };

  const activeHeight = showSubtitle ? subtitleHeights[size] : heights[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center group transition-opacity hover:opacity-95 ${className}`}
      aria-label="MyLaws Home"
    >
      <div className="relative flex items-center">
        <Image
          src={logoSrc}
          alt="MyLaws"
          width={1919}
          height={787}
          className={`${activeHeight} w-auto object-contain transform transition-transform duration-300 group-hover:scale-[1.02]`}
          priority
        />
      </div>
    </Link>
  );
}
