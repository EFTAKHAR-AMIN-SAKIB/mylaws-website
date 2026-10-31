'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { useApp } from '@/components/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Loader2,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';

function LoginContent() {
  const { lang, t } = useApp();
  const {
    user,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    sendPasswordReset,
    signOutUser,
    loading: authLoading,
  } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const promptParam = searchParams.get('prompt');
  const rawRedirect = searchParams.get('redirect') || '/ask';
  const redirectUrl = promptParam
    ? `${rawRedirect}${rawRedirect.includes('?') ? '&' : '?'}prompt=${encodeURIComponent(promptParam)}`
    : rawRedirect;
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // If already logged in, redirect or display status
  useEffect(() => {
    if (user && !authLoading) {
      // Gentle auto-redirect if requested
      const autoRedirect = searchParams.get('auto') === '1';
      if (autoRedirect) {
        router.push(redirectUrl);
      }
    }
  }, [user, authLoading, redirectUrl, router, searchParams]);

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmitting(true);
    try {
      await signInWithGoogle();
      router.push(redirectUrl);
    } catch (err: any) {
      console.error('Google sign in error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg(t('লগইন উইন্ডো বন্ধ করা হয়েছে।', 'Sign-in popup was closed.'));
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
    setSuccessMsg(null);

    if (mode === 'forgot') {
      if (!email.trim()) {
        setErrorMsg(t('অনুগ্রহ করে আপনার ইমেইল প্রদান করুন।', 'Please enter your email address.'));
        return;
      }
      setSubmitting(true);
      try {
        await sendPasswordReset(email);
        setSuccessMsg(
          t(
            'আপনার ইমেইলে পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে। ইনবক্স চেক করুন।',
            'Password reset link has been sent to your email. Check your inbox.'
          )
        );
      } catch (err: any) {
        setErrorMsg(err.message || t('রিসেট লিংক পাঠানো যায়নি।', 'Could not send reset link.'));
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (!email.trim() || !password) {
      setErrorMsg(t('ইমেইল ও পাসওয়ার্ড পূরণ করুন।', 'Please enter both email and password.'));
      return;
    }

    if (mode === 'signup' && password.length < 6) {
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
      router.push(redirectUrl);
    } catch (err: any) {
      console.error('Email auth error:', err);
      let msg = err.message || t('প্রক্রিয়া ব্যর্থ হয়েছে।', 'Authentication failed.');
      if (err.code === 'auth/email-already-in-use') {
        msg = t('এই ইমেইল ইতোমধ্যে ব্যবহৃত হয়েছে। দয়া করে লগইন করুন।', 'Email already in use. Please sign in instead.');
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
    <div className="min-h-screen flex flex-col bg-bg-light text-primary-light transition-colors drafting-grid-96">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl animate-in fade-in zoom-in-[0.98] duration-300">
          
          {/* Main Authentic Architectural Split Card */}
          <div className="relative overflow-hidden rounded-[28px] border border-border-light bg-[#FAF7F0] shadow-[0_20px_50px_rgba(42,32,21,0.10)] transition-all">
            
            {/* If user is already logged in, show status & continue button */}
            {user && (
              <div className="p-8 sm:p-12 text-center space-y-5">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 border border-amber-600/30 text-accent-light">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-anek text-2xl font-bold text-primary-light">
                    {t('আপনি ইতোমধ্যেই সাইন ইন করা আছেন', 'You Are Already Signed In')}
                  </h2>
                  <p className="font-hind text-sm text-secondary-light">
                    {t('ব্যবহারকারী: ', 'Signed in as: ')}
                    <span className="font-semibold text-primary-light">
                      {user.displayName || user.email}
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <Link
                    href={redirectUrl}
                    className="inline-flex items-center gap-2 rounded-full bg-[#8c653f] hover:bg-[#785330] text-white px-7 py-3 text-sm font-semibold tracking-wide shadow-md transition-all active:scale-[0.98]"
                  >
                    <span>{t('আইনি সহকারীতে প্রবেশ করুন', 'Continue to Assistant')}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <button
                    onClick={() => signOutUser()}
                    className="rounded-full border border-border-light bg-surface-cardLight hover:bg-red-50 hover:border-red-300 text-secondary-light hover:text-red-700 px-6 py-3 text-sm font-semibold transition-all active:scale-[0.98]"
                  >
                    {t('সাইন আউট', 'Sign Out')}
                  </button>
                </div>
              </div>
            )}

            {/* When not logged in: Split Card Experience */}
            {!user && (
              <div className="relative flex flex-col md:flex-row min-h-[500px]">
                
                {/* Slanted / Diagonal Background Slice for the Right Panel */}
                <div 
                  className="hidden md:block absolute inset-y-0 right-0 w-[50%] bg-[#F2ECDC]/90 border-l border-[#DDD3C1]/50 pointer-events-none"
                  style={{
                    clipPath: 'polygon(14% 0, 100% 0, 100% 100%, 0% 100%)',
                  }}
                />

                {/* Left Side: Interactive Form Panel */}
                <div className="w-full md:w-[54%] p-6 sm:p-10 md:p-12 z-10 flex flex-col justify-center order-2 md:order-1">
                  
                  {/* Dynamic Form Title */}
                  <div className="mb-6">
                    <h2 className="font-cinzel text-3xl font-bold tracking-tight text-[#231F1C]">
                      {mode === 'signup'
                        ? t('নতুন একাউন্ট', 'Sign Up')
                        : mode === 'forgot'
                        ? t('পাসওয়ার্ড রিসেট', 'Reset Password')
                        : t('লগইন', 'Login')}
                    </h2>
                    <p className="font-hind text-xs text-secondary-light mt-1">
                      {mode === 'signup'
                        ? t('প্রতিদিন ১০টি ফ্রি প্রশ্ন পেতে নিবন্ধন করুন', 'Register for 10 free AI inquiries daily')
                        : mode === 'forgot'
                        ? t('আপনার ইমেইলে পাসওয়ার্ড পরিবর্তনের লিংক পাঠানো হবে', 'We will send a reset link to your email')
                        : t('আপনার একাউন্টে প্রবেশ করুন', 'Access your verified legal command center')}
                    </p>
                  </div>

                  {/* Feedback Messages */}
                  {errorMsg && (
                    <div className="mb-5 rounded-xl border border-red-300 bg-red-50/90 p-3 text-xs text-red-700 flex items-start gap-2.5 animate-in fade-in duration-200">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {successMsg && (
                    <div className="mb-5 rounded-xl border border-emerald-300 bg-emerald-50/90 p-3 text-xs text-emerald-800 flex items-start gap-2.5 animate-in fade-in duration-200">
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
                      <span>{successMsg}</span>
                    </div>
                  )}

                  {/* The Form */}
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    {/* Full Name field (in signup mode) */}
                    {mode === 'signup' && (
                      <div className="relative">
                        <label className="block text-[11px] font-hind font-semibold text-secondary-light mb-1">
                          {t('আপনার নাম', 'Full Name')}
                        </label>
                        <div className="relative flex items-center">
                          <input
                            type="text"
                            required
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder={t('যেমন: মোঃ করিম', 'e.g. John Doe')}
                            className="w-full rounded-xl border border-border-light bg-white/70 px-4 py-2.5 pr-10 text-xs sm:text-sm text-primary-light placeholder-secondary-light/50 focus:border-accent-light focus:bg-white focus:outline-none transition-all"
                          />
                          <UserIcon className="absolute right-3.5 h-4 w-4 text-secondary-light/60 pointer-events-none" />
                        </div>
                      </div>
                    )}

                    {/* Email Field */}
                    <div className="relative">
                      <label className="block text-[11px] font-hind font-semibold text-secondary-light mb-1">
                        {t('ইমেইল', 'Email')}
                      </label>
                      <div className="relative flex items-center">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full rounded-xl border border-border-light bg-white/70 px-4 py-2.5 pr-10 text-xs sm:text-sm text-primary-light placeholder-secondary-light/50 focus:border-accent-light focus:bg-white focus:outline-none transition-all"
                        />
                        <Mail className="absolute right-3.5 h-4 w-4 text-secondary-light/60 pointer-events-none" />
                      </div>
                    </div>

                    {/* Password Field (only for login & signup) */}
                    {mode !== 'forgot' && (
                      <div className="relative">
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-[11px] font-hind font-semibold text-secondary-light">
                            {t('পাসওয়ার্ড', 'Password')}
                          </label>
                          {mode === 'login' && (
                            <button
                              type="button"
                              onClick={() => {
                                setMode('forgot');
                                setErrorMsg(null);
                                setSuccessMsg(null);
                              }}
                              className="text-[11px] font-hind text-secondary-light hover:text-accent-light transition-colors"
                            >
                              {t('পাসওয়ার্ড ভুলে গেছেন?', 'Forgot Password?')}
                            </button>
                          )}
                        </div>

                        <div className="relative flex items-center">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-xl border border-border-light bg-white/70 px-4 py-2.5 pr-16 text-xs sm:text-sm text-primary-light placeholder-secondary-light/50 focus:border-accent-light focus:bg-white focus:outline-none transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 text-xs text-secondary-light hover:text-primary-light font-medium flex items-center gap-1 select-none"
                          >
                            {showPassword ? (
                              <>
                                <EyeOff className="h-3.5 w-3.5" />
                                <span className="text-[11px]">{t('গোপন', 'Hide')}</span>
                              </>
                            ) : (
                              <>
                                <Eye className="h-3.5 w-3.5" />
                                <span className="text-[11px]">{t('দেখান', 'Show')}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Primary Solid Caramel/Brown Pill Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full mt-2 rounded-full bg-[#8C653F] hover:bg-[#785330] text-white py-3 text-xs sm:text-sm font-semibold tracking-wider shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>{t('অপেক্ষা করুন...', 'Processing...')}</span>
                        </>
                      ) : mode === 'signup' ? (
                        t('নিবন্ধন করুন', 'Create Account')
                      ) : mode === 'forgot' ? (
                        t('রিসেট লিংক পাঠান', 'Send Reset Link')
                      ) : (
                        t('লগইন', 'Login')
                      )}
                    </button>
                  </form>

                  {/* Google Login Pill Button (only for login & signup) */}
                  {mode !== 'forgot' && (
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={submitting}
                        className="w-full rounded-full border border-[#8C653F]/40 bg-white hover:bg-slate-50 text-primary-light py-2.5 px-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 shadow-2xs transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
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
                            ? t('Google দিয়ে দ্রুত নিবন্ধন', 'Sign Up via Google')
                            : t('Google দিয়ে লগইন', 'Login via Google')}
                        </span>
                      </button>
                    </div>
                  )}

                  {/* Switch between Login and Sign Up / Forgot Password */}
                  <div className="mt-5 text-center text-xs font-hind text-secondary-light">
                    {mode === 'login' ? (
                      <p>
                        {t('কোনো অ্যাকাউন্ট নেই? ', "Don't have an account? ")}
                        <button
                          type="button"
                          onClick={() => {
                            setMode('signup');
                            setErrorMsg(null);
                            setSuccessMsg(null);
                          }}
                          className="font-bold text-accent-light hover:underline ml-1"
                        >
                          {t('নিবন্ধন করুন (Sign Up)', 'Sign Up')}
                        </button>
                      </p>
                    ) : mode === 'signup' ? (
                      <p>
                        {t('ইতোমধ্যে অ্যাকাউন্ট আছে? ', 'Already have an account? ')}
                        <button
                          type="button"
                          onClick={() => {
                            setMode('login');
                            setErrorMsg(null);
                            setSuccessMsg(null);
                          }}
                          className="font-bold text-accent-light hover:underline ml-1"
                        >
                          {t('লগইন করুন (Log In)', 'Log In')}
                        </button>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setMode('login');
                          setErrorMsg(null);
                          setSuccessMsg(null);
                        }}
                        className="font-bold text-accent-light hover:underline"
                      >
                        ← {t('লগইনে ফিরে যান', 'Back to Login')}
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Side: Signature Welcome Showcase Panel */}
                <div className="w-full md:w-[46%] p-6 sm:p-10 md:p-12 z-10 flex flex-col justify-between relative bg-gradient-to-br from-[#F5EDE0] to-[#EAE0CA] md:bg-transparent order-1 md:order-2 border-b md:border-b-0 border-[#DDD3C1]/60">
                  
                  {/* Top Big Heading matching the Reference Image */}
                  <div className="space-y-1 pt-2">
                    <h1 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-wide text-[#231F1C] uppercase leading-tight">
                      WELCOME TO <br />
                      <span className="text-[#8C653F]">MyLaws!</span>
                    </h1>
                    <p className="font-anek text-xs sm:text-sm font-semibold text-secondary-light pt-1">
                      {t('গণপ্রজাতন্ত্রী বাংলাদেশ আইনি তথ্য ও প্রস্তুতি সহকারী', 'Bangladesh Legal Aid & Preparation Assistant')}
                    </p>
                  </div>

                  {/* Middle Feature Highlights */}
                  <div className="py-6 space-y-2.5 text-xs text-secondary-light hidden sm:block">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                      <span>{t('প্রতিদিন বিনামূল্যে ১০টি এআই আইনি বিশ্লেষণ', '10 verified AI legal inquiries daily')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                      <span>{t('ক্লাউডফ্লেয়ার ডি১ সুরক্ষিত ডাটাবেসে খসড়া সংরক্ষণ', 'Cloudflare D1 encrypted case & draft storage')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
                      <span>{t('গেজেট ও মূল ধারার শতভাগ নির্ভরযোগ্য রেফারেন্স', '100% statutory citations from official gazettes')}</span>
                    </div>
                  </div>

                  {/* Bottom Pitch matching the Reference Image */}
                  <div className="pt-4 border-t border-border-light/60">
                    <p className="font-hind text-xs sm:text-sm text-secondary-light leading-relaxed">
                      {t(
                        'আপনার ডিজিটাল আইনি প্ল্যাটফর্মে প্রবেশ করুন। সাংবিধানিক অধিকার বুঝুন, সাধারণ ডায়েরি ও অভিযোগের খসড়া তৈরি করুন এবং যাচাইকৃত ধারার সমাধান পান।',
                        'Log in to your citizen command center. Understand constitutional rights, prepare legal drafts, and track verified statutes in real-time.'
                      )}
                    </p>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-bg-light">
          <Loader2 className="h-8 w-8 animate-spin text-accent-light" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
