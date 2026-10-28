'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from './AppContext';
import { BrandLogo } from './BrandLogo';
import { Menu, X, Globe, ArrowRight } from 'lucide-react';

export function Header() {
  const { lang, setLang, t } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: t('হোম', 'HOME') },
    { href: '/ask', label: t('সহকারী', 'ASSISTANT') },
    { href: '/drafts', label: t('খসড়া', 'DRAFTS') },
    { href: '/sources', label: t('আইনি উৎস', 'SOURCES') },
    { href: '/download', label: t('অ্যান্ড্রয়েড', 'ANDROID') },
  ];

  return (
    <header className="no-print sticky top-0 z-50 border-b border-border-light/80 bg-bg-light/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Left Section: Perfect Brand Logo & Balance Scales */}
        <div className="flex items-center">
          <BrandLogo />
        </div>

        {/* Center / Right Nav Items: Classical Letter-Spaced Uppercase */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors relative py-1 ${
                  lang === 'bn'
                    ? 'font-hind font-semibold text-[13px] tracking-wide'
                    : 'font-cinzel text-xs tracking-[0.16em] uppercase'
                } ${
                  isActive
                    ? 'text-accent-light font-bold'
                    : 'text-secondary-light/90 hover:text-primary-light'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent-light" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Language Switcher & Signature Bracketed CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switch */}
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium tracking-wider rounded border border-border-light bg-surface-light text-secondary-light hover:border-accent-light hover:text-primary-light transition-all shadow-2xs ${
              lang === 'bn' ? 'font-hind font-semibold' : 'font-cinzel'
            }`}
            title={t('Switch to English', 'বাংলায় পরিবর্তন করুন')}
          >
            <Globe className="h-3 w-3 text-accent-light" />
            <span>{lang === 'bn' ? 'ENGLISH' : 'বাংলা'}</span>
          </button>

          {/* Signature Architectural Bracketed Button */}
          <Link
            href="/ask"
            className="bracket-btn text-primary-light hover:text-accent-light"
          >
            <span className="flex items-center gap-1.5">
              <span>—</span>
              <span className={lang === 'bn' ? 'font-hind font-bold text-xs' : 'font-cinzel text-xs font-bold'}>
                {t('এখনই প্রশ্ন করুন', 'ASK MYLAWS')}
              </span>
            </span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="px-2.5 py-1 text-xs font-cinzel rounded border border-border-light bg-surface-light text-secondary-light font-medium"
          >
            {lang === 'bn' ? 'EN' : 'বাং'}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded text-primary-light hover:bg-border-light/40 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Clean Parchment Style, No Theme Switcher) */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border-light bg-surface-light px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-md">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-cinzel font-semibold tracking-wider transition-colors ${
                    isActive
                      ? 'bg-accent-light/10 text-accent-light font-bold'
                      : 'text-primary-light hover:bg-bg-light'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-border-light flex flex-col gap-3">
            <Link
              href="/ask"
              onClick={() => setMobileOpen(false)}
              className="bracket-btn w-full text-center py-2.5 font-cinzel font-bold text-xs tracking-wider"
            >
              <span>— {t('এখনই প্রশ্ন করুন', 'ASK MYLAWS')} —</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
