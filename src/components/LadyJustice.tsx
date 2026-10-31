'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from './AppContext';
import { Scale, Sparkles } from 'lucide-react';

export function LadyJustice() {
  const { lang, t } = useApp();
  const [tiltMode, setTiltMode] = useState<'auto' | 'left' | 'right'>('auto');

  return (
    <div className="relative w-full max-w-[420px] mx-auto select-none group">
      {/* Ambient Radial Golden Aura behind the statue */}
      <div className="absolute inset-0 -top-8 bg-gradient-to-b from-[#EADBC8]/40 via-[#F4EFE6]/20 to-transparent rounded-full filter blur-2xl pointer-events-none" />

      {/* Main Statue Container with Multiply Blend to merge white background into parchment */}
      <div className="relative overflow-visible animate-statue-breathe">
        {/* Base Statue Image */}
        <div className="relative w-full aspect-[848/1264] mix-blend-multiply drop-shadow-sm">
          <Image
            src="/images/lady-justice.jpg"
            alt="Statue of Lady Justice (Justitia) holding the scales of justice"
            fill
            sizes="(max-width: 768px) 320px, 420px"
            priority
            className="object-contain object-bottom pointer-events-none"
          />
        </div>

        {/* Dynamic Articulated Moving Balance Scale Overlay (Anchored to Hand) */}
        <div
          className="absolute top-[8%] left-[60%] -translate-x-1/2 w-[46%] aspect-square cursor-pointer"
          onMouseEnter={() => setTiltMode('left')}
          onMouseLeave={() => setTiltMode('auto')}
          title={t(
            'ন্যায্যতার ভারসাম্য (ইন্টারেক্টিভ স্কেল - নাড়াচাড়া করে পরীক্ষা করুন)',
            'The Scales of Justice (Interactive Balance - hover to tilt)'
          )}
        >
          <svg
            viewBox="0 0 200 220"
            className="w-full h-full overflow-visible drop-shadow-sm"
          >
            <defs>
              <linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C49856" />
                <stop offset="50%" stopColor="#9A6F32" />
                <stop offset="100%" stopColor="#6E4A1E" />
              </linearGradient>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#DFBB84" />
                <stop offset="100%" stopColor="#9A6F32" />
              </linearGradient>
            </defs>

            {/* Top Anchor Ring Held by Fingers */}
            <circle cx="100" cy="22" r="7" fill="none" stroke="url(#bronzeGrad)" strokeWidth="3" />
            <circle cx="100" cy="22" r="3" fill="#9A6F32" />

            {/* Central Vertical Fulcrum Post */}
            <line x1="100" y1="28" x2="100" y2="52" stroke="url(#bronzeGrad)" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="100" cy="52" r="5" fill="url(#bronzeGrad)" />

            {/* ARTICULATED MOVING CROSSBEAM ASSEMBLY */}
            <g
              className={
                tiltMode === 'left'
                  ? 'transition-transform duration-700 ease-out -rotate-10 origin-[100px_52px]'
                  : tiltMode === 'right'
                  ? 'transition-transform duration-700 ease-out rotate-10 origin-[100px_52px]'
                  : 'animate-scale-beam'
              }
            >
              {/* Horizontal Crossbeam */}
              <line
                x1="24"
                y1="52"
                x2="176"
                y2="52"
                stroke="url(#bronzeGrad)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Central Finial & Needle */}
              <polygon points="100,42 96,52 104,52" fill="url(#goldGrad)" />
              <line x1="100" y1="52" x2="100" y2="70" stroke="#7E5723" strokeWidth="2" strokeLinecap="round" />

              {/* Beam End Decorative Finials */}
              <circle cx="26" cy="52" r="4.5" fill="url(#goldGrad)" />
              <circle cx="174" cy="52" r="4.5" fill="url(#goldGrad)" />

              {/* LEFT SUSPENDED PAN & CHAINS (Moves down when tilted left) */}
              <g
                className={
                  tiltMode === 'left'
                    ? 'transition-transform duration-700 ease-out rotate-10 origin-[26px_52px]'
                    : tiltMode === 'right'
                    ? 'transition-transform duration-700 ease-out -rotate-10 origin-[26px_52px]'
                    : 'animate-pan-left'
                }
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setTiltMode('left');
                }}
              >
                {/* 3 Suspension Cords */}
                <line x1="26" y1="56" x2="10" y2="135" stroke="#7E5723" strokeWidth="1.2" strokeDasharray="3 2" />
                <line x1="26" y1="56" x2="26" y2="135" stroke="#9A6F32" strokeWidth="1.4" />
                <line x1="26" y1="56" x2="42" y2="135" stroke="#7E5723" strokeWidth="1.2" strokeDasharray="3 2" />

                {/* Left Pan (Brass Bowl) */}
                <path
                  d="M 6 135 Q 26 155 46 135 Z"
                  fill="url(#goldGrad)"
                  stroke="#6E4A1E"
                  strokeWidth="2"
                />
                <ellipse cx="26" cy="135" rx="20" ry="4" fill="#E6D3B1" stroke="#6E4A1E" strokeWidth="1.5" />
              </g>

              {/* RIGHT SUSPENDED PAN & CHAINS (Moves up when tilted left) */}
              <g
                className={
                  tiltMode === 'left'
                    ? 'transition-transform duration-700 ease-out rotate-10 origin-[174px_52px]'
                    : tiltMode === 'right'
                    ? 'transition-transform duration-700 ease-out -rotate-10 origin-[174px_52px]'
                    : 'animate-pan-right'
                }
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setTiltMode('right');
                }}
              >
                {/* 3 Suspension Cords */}
                <line x1="174" y1="56" x2="158" y2="135" stroke="#7E5723" strokeWidth="1.2" strokeDasharray="3 2" />
                <line x1="174" y1="56" x2="174" y2="135" stroke="#9A6F32" strokeWidth="1.4" />
                <line x1="174" y1="56" x2="190" y2="135" stroke="#7E5723" strokeWidth="1.2" strokeDasharray="3 2" />

                {/* Right Pan (Brass Bowl) */}
                <path
                  d="M 154 135 Q 174 155 194 135 Z"
                  fill="url(#goldGrad)"
                  stroke="#6E4A1E"
                  strokeWidth="2"
                />
                <ellipse cx="174" cy="135" rx="20" ry="4" fill="#E6D3B1" stroke="#6E4A1E" strokeWidth="1.5" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Classical Badge under the Statue */}
      <div className="text-center mt-2 flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-light/80 bg-surface-light/80 backdrop-blur-xs text-[11px] font-semibold tracking-wider text-secondary-light shadow-2xs">
          <Scale className="h-3.5 w-3.5 text-accent-light" />
          <span className={lang === 'bn' ? 'font-hind font-semibold' : 'font-cinzel tracking-wider'}>
            {t('লেডি জাস্টিস · আইনের চিরন্তন সমতা', 'JUSTITIA · EQUALITY BEFORE LAW')}
          </span>
        </div>
        <p className={`text-[10px] text-secondary-light/80 mt-1 ${lang === 'bn' ? 'font-hind font-medium' : 'font-sans font-medium'}`}>
          {t('পাল্লা স্পর্শ করে ভারসাম্য পরীক্ষা করুন', 'Hover pans to balance facts against statutory rights')}
        </p>
      </div>
    </div>
  );
}
