'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export function BrandLogo({ className = '', showSubtitle = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group transition-opacity hover:opacity-95 ${className}`}
      aria-label="MyLaws Home"
    >
      {/* Precision Scaled Vector Balance of Justice Icon */}
      <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-primary-light">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform duration-300 group-hover:scale-105"
        >
          {/* Top Finial Ring */}
          <circle cx="18" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="18" cy="5" r="0.8" fill="currentColor" />

          {/* Central Vertical Spire */}
          <line x1="18" y1="7.2" x2="18" y2="30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

          {/* Horizontal Balance Beam */}
          <line x1="5" y1="13" x2="31" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="18" cy="13" r="1.6" fill="currentColor" />

          {/* Beam End Finials */}
          <circle cx="6" cy="13" r="1.3" fill="currentColor" />
          <circle cx="30" cy="13" r="1.3" fill="currentColor" />

          {/* Center Indicator Needle */}
          <line x1="18" y1="13" x2="18" y2="17.5" stroke="#9A6F32" strokeWidth="1.6" strokeLinecap="round" />

          {/* Left Suspension Strings */}
          <line x1="6" y1="13.5" x2="2.5" y2="23" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="6" y1="13.5" x2="9.5" y2="23" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

          {/* Left Pan */}
          <path
            d="M 1.5 23 Q 6 26.5 10.5 23 Z"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          {/* Right Suspension Strings */}
          <line x1="30" y1="13.5" x2="26.5" y2="23" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="30" y1="13.5" x2="33.5" y2="23" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

          {/* Right Pan */}
          <path
            d="M 25.5 23 Q 30 26.5 34.5 23 Z"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          {/* Stepped Pedestal Base */}
          <line x1="12" y1="30" x2="24" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="9" y1="32.5" x2="27" y2="32.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col">
        <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-primary-light leading-none">
          MyLaws
        </span>
        {showSubtitle && (
          <span className="font-cinzel text-[9px] uppercase tracking-widest text-secondary-light font-medium mt-0.5">
            Legal Assistant
          </span>
        )}
      </div>
    </Link>
  );
}
