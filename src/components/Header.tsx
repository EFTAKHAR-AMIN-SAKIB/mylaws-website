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
  FileText,
  BookOpen,
  Smartphone,
} from 'lucide-react';

export function Header() {
  const { lang, setLang, theme, toggleTheme, t } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: t('হোম', 'Home') },
    { href: '/ask', label: t('প্রশ্ন করুন', 'Ask') },
    { href: '/drafts', label: t('খসড়া প্রস্তুতকারক', 'Drafts') },
    { href: '/sources', label: t('আইনি উৎস', 'Sources') },
    { href: '/download', label: t('অ্যান্ড্রয়েড অ্যাপ', 'Android App') },
  ];

  return (
    <header className="no-print sticky top-0 z-50 border-b border-border-light/70 bg-surface-light/90 backdrop-blur-md dark:border-border-dark/70 dark:bg-surface-dark/90 transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Wordmark & Brand Identity */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-primary-light dark:text-primary-dark group"
          aria-label="MyLaws Homepage"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark border border-accent-light/20 dark:border-accent-dark/30 group-hover:scale-105 transition-transform">
            <Scale className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-tight text-primary-light dark:text-primary-dark">
              MyLaws
            </span>
            <span className="text-[10px] uppercase tracking-wider text-secondary-light dark:text-secondary-dark font-medium -mt-1">
              {t('বাংলাদেশ আইনি সহকারী', 'Bangladesh Legal Aid')}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'text-accent-light dark:text-accent-dark bg-accent-light/10 dark:bg-accent-dark/10 font-semibold'
                    : 'text-secondary-light hover:text-primary-light dark:text-secondary-dark dark:hover:text-primary-dark hover:bg-border-light/40 dark:hover:bg-border-dark/40'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Controls: Language, Theme, and Primary CTA */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Language Switch */}
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md border border-border-light dark:border-border-dark text-secondary-light dark:text-secondary-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
            title={t('Switch to English', 'বাংলায় পরিবর্তন করুন')}
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5 text-accent-light dark:text-accent-dark" />
            <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          {/* Theme Switch */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md border border-border-light dark:border-border-dark text-secondary-light dark:text-secondary-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
            title={t('থিম পরিবর্তন', 'Toggle Theme')}
            aria-label="Toggle dark mode"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-accent-dark" />}
          </button>

          {/* Primary Action Button */}
          <Link
            href="/ask"
            className="ml-1 inline-flex items-center gap-1.5 rounded-lg bg-accent-light px-3.5 py-1.5 text-xs font-semibold text-surface-light shadow-sm hover:bg-accent-light/90 dark:bg-accent-dark dark:text-bg-dark dark:hover:bg-accent-dark/90 transition-all hover:scale-[1.02]"
          >
            <span>{t('এখনই প্রশ্ন করুন', 'Ask MyLaws')}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="px-2 py-1 text-xs font-medium rounded border border-border-light dark:border-border-dark text-secondary-light dark:text-secondary-dark"
          >
            {lang === 'bn' ? 'EN' : 'বাং'}
          </button>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded border border-border-light dark:border-border-dark text-secondary-light dark:text-secondary-dark"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-md text-primary-light dark:text-primary-dark hover:bg-border-light/40 dark:hover:bg-border-dark/40"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === link.href
                    ? 'bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark font-semibold'
                    : 'text-secondary-light dark:text-secondary-dark'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/ask"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent-light py-2.5 text-sm font-semibold text-surface-light dark:bg-accent-dark dark:text-bg-dark"
            >
              <span>{t('এখনই প্রশ্ন করুন', 'Ask MyLaws')}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
