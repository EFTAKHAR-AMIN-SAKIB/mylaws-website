'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from './AppContext';
import {
  Scale,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  ArrowRight,
} from 'lucide-react';

export function Header() {
  const { lang, setLang, theme, toggleTheme, t } = useApp();
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
    <header className="no-print sticky top-0 z-50 border-b border-border-light/80 dark:border-border-dark/80 bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Left Section: Pill Mode Toggle + Scales Brand */}
        <div className="flex items-center gap-3.5">
          {/* Reference Capsule Pill Toggle for Theme */}
          <button
            onClick={toggleTheme}
            className="group relative flex h-7 w-13 items-center rounded-full border border-border-light dark:border-accent-dark/50 bg-surface-light dark:bg-surface-dark px-1 shadow-inner transition-colors focus-visible:ring-2 focus-visible:ring-accent-light dark:focus-visible:ring-accent-dark"
            title={t('থিম পরিবর্তন (হালকা / গাঢ়)', 'Toggle theme')}
            aria-label="Toggle theme"
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full shadow transition-all duration-300 ${
                theme === 'dark'
                  ? 'translate-x-6 bg-accent-dark text-bg-dark'
                  : 'translate-x-0 bg-accent-light text-surface-light'
              }`}
            >
              {theme === 'dark' ? (
                <Moon className="h-3 w-3 fill-current" />
              ) : (
                <Sun className="h-3 w-3 fill-current" />
              )}
            </div>
          </button>

          {/* Wordmark & Scales Icon */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-primary-light dark:text-accent-dark group"
            aria-label="MyLaws Home"
          >
            <Scale className="h-5 w-5 text-accent-light dark:text-accent-dark group-hover:scale-105 transition-transform" />
            <span className="font-display text-xl font-bold tracking-wide text-primary-light dark:text-accent-dark">
              MyLaws
            </span>
          </Link>
        </div>

        {/* Center / Right Nav Items: Classical Letter-Spaced Uppercase */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-cinzel text-xs tracking-[0.16em] uppercase transition-colors relative py-1 ${
                  isActive
                    ? 'text-accent-light dark:text-accent-dark font-bold'
                    : 'text-secondary-light/85 hover:text-primary-light dark:text-secondary-dark/85 dark:hover:text-accent-dark'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent-light dark:bg-accent-dark" />
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
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium font-cinzel tracking-wider rounded border border-border-light dark:border-border-dark text-secondary-light dark:text-secondary-dark hover:border-accent-light dark:hover:border-accent-dark hover:text-primary-light dark:hover:text-accent-dark transition-colors"
            title={t('Switch to English', 'বাংলায় পরিবর্তন করুন')}
          >
            <Globe className="h-3 w-3 text-accent-light dark:text-accent-dark" />
            <span>{lang === 'bn' ? 'ENGLISH' : 'বাংলা'}</span>
          </button>

          {/* Signature Architectural Bracketed Button */}
          <Link
            href="/ask"
            className="bracket-btn text-primary-light hover:text-accent-light dark:text-accent-dark dark:hover:text-white"
          >
            <span className="flex items-center gap-1.5">
              <span>—</span>
              <span>{t('এখনই প্রশ্ন করুন', 'ASK MYLAWS')}</span>
            </span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="px-2 py-1 text-xs font-cinzel rounded border border-border-light dark:border-border-dark text-secondary-light dark:text-secondary-dark"
          >
            {lang === 'bn' ? 'EN' : 'বাং'}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded text-primary-light dark:text-accent-dark hover:bg-border-light/40 dark:hover:bg-border-dark/40"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark px-5 pt-4 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`font-cinzel text-xs tracking-[0.16em] uppercase py-2 transition-colors ${
                  pathname === link.href
                    ? 'text-accent-light dark:text-accent-dark font-bold'
                    : 'text-secondary-light dark:text-secondary-dark'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-border-light/60 dark:border-border-dark/60">
            <Link
              href="/ask"
              onClick={() => setMobileOpen(false)}
              className="bracket-btn w-full text-center text-primary-light dark:text-accent-dark py-3"
            >
              <span>— {t('এখনই প্রশ্ন করুন', 'ASK MYLAWS')} —</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
