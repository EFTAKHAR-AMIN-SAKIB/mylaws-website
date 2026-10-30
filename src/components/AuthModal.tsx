'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useApp } from './AppContext';
import { X, Lock, Mail, User as UserIcon, Loader2, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export function AuthModal() {
  const {
    isAuthModalOpen,
    authModalMode,
    authModalPrompt,
    closeAuthModal,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
  } = useAuth();
  const { lang, t } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMode(authModalMode);
    setErrorMsg(null);
  }, [authModalMode, isAuthModalOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAuthModal();
    };
    if (isAuthModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleGoogleSubmit = async () => {
    setErrorMsg(null);
    setSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error('Google sign in error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg(t('লগইন উইন্ডো বন্ধ করা হয়েছে।', 'Sign in popup was closed.'));
      } else if (err.code === 'auth/unauthorized-domain') {
        setErrorMsg(
          t(
            'Firebase ডোমেন অনুমোদিত নয়: অনুগ্রহ করে Firebase Console > Authentication > Settings > Authorized domains-এ "mylaws-bd.vercel.app" যুক্ত করুন।',
            'Unauthorized domain: Please add "mylaws-bd.vercel.app" to Authorized Domains in Firebase Console > Authentication > Settings.'
          )
        );
      } else {
        setErrorMsg(err.message || t('গুগল লগইন ব্যর্থ হয়েছে।', 'Google sign-in failed.'));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg(t('ইমেইল ও পাসওয়ার্ড পূরণ করুন।', 'Please enter email and password.'));
      return;
    }

    if (password.length < 6) {
      setErrorMsg(t('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।', 'Password must be at least 6 characters.'));
      return;
    }

    setSubmitting(true);
    try {
      if (mode === 'signup') {
        await signUpWithEmail(email, password, displayName);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      console.error('Email auth error:', err);
      let msg = err.message || t('প্রক্রিয়া ব্যর্থ হয়েছে।', 'Authentication failed.');
      if (err.code === 'auth/email-already-in-use') {
        msg = t('এই ইমেইল দিয়ে ইতোমধ্যে একটি অ্যাকাউন্ট রয়েছে। দয়া করে লগইন করুন।', 'Email already in use. Please sign in instead.');
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = t('ভুল ইমেইল বা পাসওয়ার্ড।', 'Invalid email or password.');
      } else if (err.code === 'auth/user-not-found') {
        msg = t('কোনো অ্যাকাউন্ট পাওয়া যায়নি। দয়া করে নিবন্ধন করুন।', 'No account found. Please sign up.');
      } else if (err.code === 'auth/unauthorized-domain') {
        msg = t(
          'Firebase ডোমেন অনুমোদিত নয়: অনুগ্রহ করে Firebase Console > Authentication > Settings > Authorized domains-এ "mylaws-bd.vercel.app" যুক্ত করুন।',
          'Unauthorized domain: Please add "mylaws-bd.vercel.app" to Authorized Domains in Firebase Console > Authentication > Settings.'
        );
      }
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-amber-900/20 bg-[#faf8f5] dark:bg-[#1a1e24] shadow-2xl transition-all">
        {/* Architectural Header Bar */}
        <div className="bg-gradient-to-r from-[#1e293b] via-[#0f172a] to-[#1e293b] px-6 py-4 text-amber-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-amber-400" />
              <h3 className="font-cinzel text-sm font-semibold tracking-wider text-amber-100">
                MYLAWS AUTHENTICATION
              </h3>
            </div>
            <button
              onClick={closeAuthModal}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-1 text-xs text-slate-300">
            {t(
              'বাংলাদেশের সংবিধান ও আইনি অধিকার নিশ্চিতে আপনার বিশ্বস্ত প্ল্যাটফর্ম',
              'Your trusted portal for Bangladesh legal rights and verified guidance'
            )}
          </p>
        </div>

        <div className="p-6">
          {/* Prompt banner if invoked with a reason (e.g. while asking a question) */}
          {authModalPrompt && (
            <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2.5">
              <Sparkles className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
              <span>{authModalPrompt}</span>
            </div>
          )}

          {/* Mode Switch Tabs */}
          <div className="mb-5 flex rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 p-1">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg(null);
              }}
              className={`flex-1 rounded-md py-1.5 text-xs font-semibold tracking-wider transition-all ${
                mode === 'login'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {t('সাইন ইন', 'SIGN IN')}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMsg(null);
              }}
              className={`flex-1 rounded-md py-1.5 text-xs font-semibold tracking-wider transition-all ${
                mode === 'signup'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {t('নতুন একাউন্ট', 'CREATE ACCOUNT')}
            </button>
          </div>

          {/* Google One-Click Auth */}
          <button
            type="button"
            onClick={handleGoogleSubmit}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all disabled:opacity-60"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>
              {mode === 'signup'
                ? t('গুগল দিয়ে দ্রুত নিবন্ধন', 'Sign up with Google')
                : t('গুগল দিয়ে সাইন ইন', 'Continue with Google')}
            </span>
          </button>

          {/* Divider */}
          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <span className="relative bg-[#faf8f5] dark:bg-[#1a1e24] px-3 text-[11px] font-medium uppercase tracking-wider text-slate-400">
              {t('অথবা ইমেইল দিয়ে', 'OR WITH EMAIL')}
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t('আপনার নাম', 'Full Name')}
                </label>
                <div className="relative">
                  <UserIcon className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={t('নাম লিখুন', 'Your Name')}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 pl-9 pr-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('ইমেইল ঠিকানা', 'Email Address')}
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 pl-9 pr-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:border-amber-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('পাসওয়ার্ড', 'Password')}
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 pl-9 pr-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:border-amber-600 focus:outline-none"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="rounded-md border border-red-200 bg-red-50 p-2 text-xs text-red-600 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white py-2 text-xs font-bold tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{t('অনুগ্রহ করে অপেক্ষা করুন...', 'Processing...')}</span>
                </>
              ) : mode === 'signup' ? (
                t('অ্যাকাউন্ট তৈরি করুন', 'CREATE ACCOUNT')
              ) : (
                t('লগইন করুন', 'SIGN IN')
              )}
            </button>
          </form>

          {/* Member Benefits Footer */}
          <div className="mt-5 border-t border-slate-200 dark:border-slate-700/80 pt-4 text-[11px] text-slate-500 space-y-1.5">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>{t('প্রতিদিন বিনামূল্যে ১০টি এআই আইনি বিশ্লেষণ', '10 free AI legal consultations daily')}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>{t('ক্লাউডফ্লেয়ার ডি১-এ সংরক্ষিত পূর্ববর্তী প্রশ্ন ও সমাধান', 'History and solutions secured on Cloudflare D1')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
