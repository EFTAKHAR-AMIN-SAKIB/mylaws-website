'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from './AppContext';
import { useAuth } from './AuthContext';
import { BrandLogo } from './BrandLogo';
import {
  Menu,
  X,
  Globe,
  User as UserIcon,
  LogOut,
  Sparkles,
  ChevronDown,
  Plus,
  History,
  FileText,
  BookOpen,
  Smartphone,
  Home,
  Scale,
  ShieldCheck,
  Clock,
  ArrowRight,
} from 'lucide-react';

import type { SavedUserQuery } from '@/lib/userDb';

export function Header() {
  const { lang, setLang, t } = useApp();
  const { user, quota, openAuthModal, signOutUser, getIdToken, loading: authLoading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [recentQueries, setRecentQueries] = useState<SavedUserQuery[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [mounted, setMounted] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close desktop user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scroll when mobile drawer or profile sheet is open
  useEffect(() => {
    if (mobileOpen || mobileProfileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen, mobileProfileOpen]);

  // Load user queries for slide-over drawer when drawer opens
  useEffect(() => {
    if ((mobileOpen || mobileProfileOpen) && user) {
      setLoadingHistory(true);
      getIdToken().then((token) => {
        if (!token) {
          setLoadingHistory(false);
          return;
        }
        fetch('/api/user/history', {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data?.history) {
              setRecentQueries(data.history.slice(0, 4));
            }
          })
          .catch(() => {})
          .finally(() => setLoadingHistory(false));
      });
    }
  }, [mobileOpen, mobileProfileOpen, user, getIdToken]);

  const navLinks = [
    { href: '/', label: t('হোম', 'HOME'), icon: Home },
    { href: '/ask', label: t('সহকারী', 'ASSISTANT'), icon: Sparkles },
    { href: '/drafts', label: t('খসড়া', 'DRAFTS'), icon: FileText },
    { href: '/sources', label: t('আইনি উৎস', 'SOURCES'), icon: BookOpen },
    { href: '/download', label: t('অ্যাপ্লিকেশন', 'APPLICATION'), icon: Smartphone },
  ];

  const dailyLimit = quota?.dailyLimit || 30;
  const remainingQuota = quota ? quota.remaining : dailyLimit;
  const formattedRemaining = `${remainingQuota}`;
  const formattedDailyLimit = `${dailyLimit}`;
  const userDisplayName = user?.displayName || user?.email?.split('@')[0] || t('আইন সেবাপ্রার্থী', 'Citizen');

  const handleStartNewCase = () => {
    setMobileOpen(false);
    setMobileProfileOpen(false);
    try {
      sessionStorage.removeItem('mylaws_pending_draft');
    } catch {}
    if (pathname === '/ask') {
      window.location.href = '/ask';
    } else {
      router.push('/ask');
    }
  };

  return (
    <header className="no-print sticky top-0 z-40 border-b border-border-light/80 bg-bg-light/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 sm:px-6 lg:px-8">
        
        {/* Left Section: Mobile Menu Trigger + Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Slide-Over Drawer Trigger (Positioned on left like ChatGPT / Claude) */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 -ml-1 rounded-xl text-primary-light hover:bg-border-light/40 active-press transition-all"
            aria-label="Open Navigation Drawer"
          >
            <Menu className="h-6 w-6 text-primary-light" />
          </button>

          <BrandLogo />
        </div>

        {/* Center Nav Items (Desktop) */}
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

        {/* Right Section: Desktop Controls */}
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

                  {/* User Profile Dropdown Pill (Desktop) */}
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

                    {/* Desktop Dropdown Menu */}
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

        {/* Mobile Right Controls: New Case (+) + Language + Profile */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick "New Case" button on mobile for /ask page */}
          {pathname === '/ask' && (
            <button
              onClick={handleStartNewCase}
              className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium font-cinzel rounded-lg border border-accent-light/30 bg-accent-light/10 text-accent-light active-press transition-all"
              title={t('নতুন কেস শুরু করুন', 'Start New Case')}
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{t('নতুন', 'New')}</span>
            </button>
          )}

          {/* Mobile Language Switcher */}
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="px-2 py-1 text-[11px] font-cinzel rounded-lg border border-border-light bg-surface-light text-secondary-light font-bold active-press transition-all"
          >
            {lang === 'bn' ? 'EN' : 'বাং'}
          </button>

          {/* User Profile Avatar Trigger (Opens Dedicated Mobile Profile Sheet) */}
          {user ? (
            <button
              onClick={() => setMobileProfileOpen(true)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white shadow-xs active-press cursor-pointer ring-2 ring-amber-700/20"
              title={t('প্রোফাইল ও কোটা দেখুন', 'View Profile & Quota')}
              aria-label="Open Citizen Profile"
            >
              {userDisplayName.charAt(0).toUpperCase()}
            </button>
          ) : (
            <Link
              href="/login"
              className="px-2.5 py-1 text-[11px] font-cinzel rounded-lg border border-amber-800/40 bg-amber-500/10 text-amber-900 font-bold active-press"
            >
              {t('লগইন', 'LOGIN')}
            </Link>
          )}
        </div>
      </div>

      {/* ========================================================
          1. NATIVE SLIDE-OVER NAVIGATION DRAWER (Mounted via Portal)
          ======================================================== */}
      {mounted && mobileOpen && createPortal(
        <div
          className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs transition-opacity duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileOpen(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="h-full w-[85vw] max-w-xs bg-surface-light border-r border-border-light shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-250 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-border-light/80 flex items-center justify-between bg-bg-light/50">
              <div className="flex items-center gap-2">
                <BrandLogo showSubtitle={false} />
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-secondary-light hover:bg-border-light/40 active-press transition-colors"
                aria-label="Close Drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Primary Action Button: New Case */}
              <button
                onClick={handleStartNewCase}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-accent-light text-white font-cinzel text-xs font-bold tracking-wider shadow-sm active-press transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>{t('নতুন কেস শুরু করুন', 'START NEW INQUIRY')}</span>
              </button>

              {/* Navigation Menu */}
              <div className="space-y-1">
                <span className="text-[10px] font-cinzel font-bold tracking-widest text-secondary-light/70 uppercase px-2 block">
                  {t('প্রধান পাতা সমূহ', 'NAVIGATION')}
                </span>
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all active-press ${
                        isActive
                          ? 'bg-accent-light/15 text-accent-light font-bold'
                          : 'text-primary-light hover:bg-bg-light'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-accent-light" />
                      <span className={lang === 'bn' ? 'font-hind font-semibold text-sm' : 'font-cinzel'}>
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Recent Question History Section */}
              {user && (
                <div className="space-y-2 pt-2 border-t border-border-light/70">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-cinzel font-bold tracking-widest text-secondary-light/70 uppercase">
                      {t('সাম্প্রতিক প্রশ্ন', 'RECENT QUESTIONS')}
                    </span>
                    <Link
                      href="/ask"
                      onClick={() => setMobileOpen(false)}
                      className="text-[10px] text-accent-light font-hind font-semibold hover:underline"
                    >
                      {t('সব দেখুন', 'View All')}
                    </Link>
                  </div>

                  <div className="space-y-1">
                    {loadingHistory ? (
                      <div className="p-3 text-center text-xs text-secondary-light font-hind">
                        {t('লোড হচ্ছে...', 'Loading...')}
                      </div>
                    ) : recentQueries.length === 0 ? (
                      <div className="p-2 text-[11px] text-secondary-light font-hind italic">
                        {t('কোনো পূর্ববর্তী প্রশ্ন নেই', 'No previous queries yet')}
                      </div>
                    ) : (
                      recentQueries.map((item) => (
                        <Link
                          key={item.id}
                          href={`/ask?prompt=${encodeURIComponent(item.question)}`}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-start gap-2 p-2 rounded-lg text-xs text-primary-light hover:bg-bg-light transition-colors"
                        >
                          <Clock className="h-3.5 w-3.5 shrink-0 text-accent-light/80 mt-0.5" />
                          <span className="line-clamp-1 font-hind text-[11px]">{item.question}</span>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-border-light/80 bg-bg-light/40 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-secondary-light">
                <span className="flex items-center gap-1 font-hind">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent-light" />
                  <span>{t('বাংলাদেশ কোড সমর্থিত', 'Bangladesh Code')}</span>
                </span>
                <span className="font-cinzel text-[10px]">v1.0.0</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ========================================================
          2. DEDICATED MOBILE USER PROFILE BOTTOM SHEET (Mounted via Portal)
          ======================================================== */}
      {mounted && mobileProfileOpen && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileProfileOpen(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-md rounded-t-3xl sm:rounded-2xl border-t sm:border border-border-light bg-surface-light shadow-2xl p-5 pb-safe space-y-4 animate-bottom-sheet max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Drag Indicator Bar */}
            <div className="w-10 h-1 rounded-full bg-secondary-light/30 mx-auto -mt-1 mb-2 sm:hidden" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border-light/80">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-accent-light/10 text-accent-light">
                  <UserIcon className="h-4 w-4" />
                </span>
                <h3 className="font-cinzel text-sm font-bold tracking-wider text-primary-light">
                  {t('ইউজার অ্যাকাউন্ট ও প্রোফাইল', 'CITIZEN ACCOUNT & PROFILE')}
                </h3>
              </div>
              <button
                onClick={() => setMobileProfileOpen(false)}
                className="p-1.5 rounded-lg text-secondary-light hover:bg-border-light/40 active-press transition-colors"
                aria-label="Close Profile"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* User Identity Card */}
            {user ? (
              <div className="rounded-2xl border border-amber-600/30 bg-amber-500/10 p-4 space-y-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={user.photoURL}
                      alt={userDisplayName}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-amber-600/30"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-700 text-lg font-bold text-white uppercase shadow">
                      {userDisplayName.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-primary-light truncate">{userDisplayName}</p>
                    <p className="text-xs text-secondary-light truncate">{user.email}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300 font-semibold mt-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-700" />
                      <span>{t('অনুমোদিত নাগরিক আইডি', 'Verified Citizen Account')}</span>
                    </span>
                  </div>
                </div>

                {/* Quota Progress */}
                <div className="pt-2 border-t border-amber-600/20 text-xs">
                  <div className="flex items-center justify-between font-semibold text-amber-950">
                    <span className="flex items-center gap-1.5 font-cinzel">
                      <Sparkles className="h-3.5 w-3.5 text-amber-700" />
                      <span>{t('দৈনিক এআই আইনি কোটা', 'Daily AI Legal Quota')}</span>
                    </span>
                    <span className="font-bold">
                      {formattedRemaining} / {formattedDailyLimit} {t('বাকি', 'left')}
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-amber-200/60 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-500 transition-all"
                      style={{ width: `${Math.min(100, Math.max(0, (remainingQuota / dailyLimit) * 100))}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-secondary-light/80 mt-1.5 font-hind">
                    {t(
                      'প্রতিদিন রাত ১২:০০ টায় দৈনিক প্রশ্ন কোটা স্বয়ংক্রিয়ভাবে নবায়ন হয়।',
                      'Daily inquiry allowance refreshes automatically at midnight.'
                    )}
                  </p>
                </div>
              </div>
            ) : null}

            {/* Quick Actions List */}
            <div className="space-y-1.5 pt-1">
              <button
                onClick={handleStartNewCase}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-border-light bg-surface-cardLight hover:border-accent-light text-primary-light text-xs font-semibold active-press transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Plus className="h-4 w-4 text-accent-light" />
                  <span className="font-hind text-xs">{t('নতুন আইনি কেস শুরু করুন', 'Start New Legal Case')}</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-secondary-light" />
              </button>

              <Link
                href="/drafts"
                onClick={() => setMobileProfileOpen(false)}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-border-light bg-surface-cardLight hover:border-accent-light text-primary-light text-xs font-semibold active-press transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4 w-4 text-accent-light" />
                  <span className="font-hind text-xs">{t('সংরক্ষিত অভিযোগ ও জিডি ড্রাফট', 'Saved Complaint & GD Drafts')}</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-secondary-light" />
              </Link>

              <Link
                href="/sources"
                onClick={() => setMobileProfileOpen(false)}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-border-light bg-surface-cardLight hover:border-accent-light text-primary-light text-xs font-semibold active-press transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="h-4 w-4 text-accent-light" />
                  <span className="font-hind text-xs">{t('যাচাইকৃত বাংলাদেশ গেজেট ও আইন', 'Verified Statutory Gazettes')}</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-secondary-light" />
              </Link>
            </div>

            {/* Sign Out Button */}
            {user && (
              <div className="pt-2">
                <button
                  onClick={async () => {
                    setMobileProfileOpen(false);
                    await signOutUser();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 bg-red-50 text-xs font-bold text-red-600 hover:bg-red-100 active-press transition-colors shadow-2xs cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-hind">{t('অ্যাকাউন্ট থেকে সাইন আউট', 'Sign Out of Account')}</span>
                </button>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
