'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from './AppContext';
import { useAuth } from './AuthContext';
import { BrandLogo } from './BrandLogo';
import { Menu, X, Globe, User as UserIcon, LogOut, Sparkles, ChevronDown } from 'lucide-react';
import { toBanglaNum } from '@/lib/followup';

export function Header() {
  const { lang, setLang, t } = useApp();
  const { user, quota, openAuthModal, signOutUser, loading: authLoading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { href: '/', label: t('হোম', 'HOME') },
    { href: '/ask', label: t('সহকারী', 'ASSISTANT') },
    { href: '/drafts', label: t('খসড়া', 'DRAFTS') },
    { href: '/sources', label: t('আইনি উৎস', 'SOURCES') },
    { href: '/download', label: t('অ্যাপ্লিকেশন', 'APPLICATION') },
  ];

  const dailyLimit = quota?.dailyLimit || 30;
  const remainingQuota = quota ? quota.remaining : dailyLimit;
  const formattedRemaining = lang === 'bn' ? toBanglaNum(remainingQuota) : `${remainingQuota}`;
  const formattedDailyLimit = lang === 'bn' ? toBanglaNum(dailyLimit) : `${dailyLimit}`;
  const userDisplayName = user?.displayName || user?.email?.split('@')[0] || t('আইন সেবাপ্রার্থী', 'Citizen');

  return (
    <header className="no-print sticky top-0 z-50 border-b border-border-light/80 bg-bg-light/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Left Section: Brand Logo & Scales */}
        <div className="flex items-center">
          <BrandLogo />
        </div>

        {/* Center Nav Items */}
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

        {/* Right Section: Language Switcher, User Auth, & CTA */}
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

          {/* User Auth Section & Signature Bracketed Action */}
          {!authLoading && (
            <>
              {user ? (
                <div className="flex items-center gap-3">
                  {/* If not already on /ask, show compact Assistant link */}
                  {pathname !== '/ask' && (
                    <Link
                      href="/ask"
                      className="bracket-btn text-primary-light hover:text-accent-light hidden lg:inline-flex"
                    >
                      <span className="flex items-center gap-1.5">
                        <span>—</span>
                        <span className={lang === 'bn' ? 'font-hind font-bold text-xs' : 'font-cinzel text-xs font-bold'}>
                          {t('প্রশ্ন করুন', 'ASK MYLAWS')}
                        </span>
                        <span>—</span>
                      </span>
                    </Link>
                  )}

                  {/* User Profile Dropdown Pill */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 rounded-full border border-amber-800/30 bg-amber-50/60 dark:bg-amber-950/20 px-2.5 py-1 text-xs text-primary-light hover:border-amber-700 transition-all cursor-pointer"
                    >
                      {user.photoURL ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={user.photoURL}
                          alt={userDisplayName}
                          className="h-5 w-5 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-700 text-[10px] font-bold text-white uppercase">
                          {userDisplayName.charAt(0)}
                        </div>
                      )}
                      <span className="max-w-[100px] truncate text-xs font-medium">
                        {userDisplayName}
                      </span>
                      <span className="rounded bg-amber-200/60 dark:bg-amber-800/40 px-1.5 py-0.5 text-[10px] font-semibold text-amber-900 dark:text-amber-200">
                        {formattedRemaining}/{formattedDailyLimit}
                      </span>
                      <ChevronDown className="h-3 w-3 text-secondary-light" />
                    </button>

                    {/* Dropdown Menu */}
                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 rounded-xl border border-border-light bg-surface-light p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="border-b border-border-light pb-2.5 mb-2.5">
                          <p className="text-xs font-bold text-primary-light truncate">
                            {userDisplayName}
                          </p>
                          <p className="text-[11px] text-secondary-light truncate">
                            {user.email}
                          </p>
                          {/* Daily Quota Indicator */}
                          <div className="mt-2.5 rounded-lg border border-amber-600/20 bg-amber-500/10 p-2 text-xs">
                            <div className="flex items-center justify-between text-[11px] font-semibold text-amber-900 dark:text-amber-200">
                              <span className="flex items-center gap-1">
                                <Sparkles className="h-3 w-3 text-amber-600" />
                                {t('দৈনিক এআই কোটা', 'Daily AI Quota')}
                              </span>
                              <span>{formattedRemaining} / {formattedDailyLimit} {t('বাকি', 'left')}</span>
                            </div>
                            <div className="mt-1.5 h-1.5 w-full rounded-full bg-amber-200/40 overflow-hidden">
                              <div
                                className="h-full bg-amber-600 transition-all"
                                style={{ width: `${Math.min(100, Math.max(0, (remainingQuota / dailyLimit) * 100))}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Link
                            href="/ask"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-primary-light hover:bg-bg-light transition-colors"
                          >
                            <Sparkles className="h-3.5 w-3.5 text-accent-light" />
                            <span>{t('প্রশ্ন জিজ্ঞাসা করুন', 'Ask a Question')}</span>
                          </Link>
                          <button
                            onClick={async () => {
                              setUserDropdownOpen(false);
                              await signOutUser();
                            }}
                            className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                          >
                            <LogOut className="h-3.5 w-3.5" />
                            <span>{t('সাইন আউট', 'Sign Out')}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Signature Architectural Bracketed LOGIN Button (matches reference design) */
                <Link
                  href="/login"
                  className="bracket-btn text-primary-light hover:text-accent-light"
                >
                  <span className="flex items-center gap-1.5">
                    <span>—</span>
                    <span className={lang === 'bn' ? 'font-hind font-bold text-xs' : 'font-cinzel text-xs font-bold'}>
                      {t('লগইন', 'LOGIN')}
                    </span>
                    <span>—</span>
                  </span>
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          {!user ? (
            <Link
              href="/login"
              className="px-2 py-1 text-[11px] font-cinzel rounded border border-amber-800/40 bg-amber-500/10 text-amber-900"
            >
              {t('লগইন', 'LOGIN')}
            </Link>
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-700 text-[11px] font-bold text-white">
              {userDisplayName.charAt(0).toUpperCase()}
            </div>
          )}

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

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border-light bg-surface-light px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-md">
          {user && (
            <div className="rounded-lg border border-amber-600/20 bg-amber-500/10 p-3 text-xs mb-2">
              <div className="flex items-center justify-between font-bold text-primary-light">
                <span>{userDisplayName}</span>
                <span className="text-amber-800 font-semibold">{formattedRemaining}/{formattedDailyLimit} {t('প্রশ্ন বাকি', 'queries left')}</span>
              </div>
              <p className="text-[11px] text-secondary-light truncate">{user.email}</p>
            </div>
          )}

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
            {user ? (
              <button
                onClick={async () => {
                  setMobileOpen(false);
                  await signOutUser();
                }}
                className="w-full rounded-lg border border-red-300 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 text-center"
              >
                {t('সাইন আউট', 'Sign Out')}
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full rounded-lg bg-amber-700 py-2 text-xs font-bold text-white text-center shadow-xs block"
              >
                {t('লগইন / নতুন একাউন্ট', 'Sign In / Register')}
              </Link>
            )}

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
