'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useApp } from '@/components/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CasePreview } from '@/components/CasePreview';
import { TurntableScales } from '@/components/TurntableScales';
import {
  ArrowRight,
  ShieldCheck,
  FileText,
  Smartphone,
  Globe2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Sparkles,
  BookOpen,
  Building,
  CheckSquare,
  Scale,
  Search,
} from 'lucide-react';

export default function HomePage() {
  const { lang, t } = useApp();
  const turntableContainerRef = useRef<HTMLDivElement | null>(null);

  const supportedTopics = [
    {
      id: 'work',
      title: t('বকেয়া বেতন ও শ্রম অধিকার', 'Unpaid Wages & Labour Rights'),
      law: t('বাংলাদেশ শ্রম আইন, ২০০৬', 'Bangladesh Labour Act, 2006'),
      desc: t(
        'মালিক বেতন বা ওভারটাইম না দিলে ধারা ১২৩, ১২৪ক ও ১৩২ অনুযায়ী শ্রম পরিদর্শক বা আদালতে যাওয়ার পদক্ষেপ এবং ডিআইএফই অভিযোগ ড্রাফট।',
        'Practical next steps under Sections 123, 124A, and 132 for unpaid wages, conciliation, and DIFE written complaint preparation.'
      ),
      sampleQuery: 'আমার মালিক দুই মাসের বেতন দেয়নি। কী কী বিষয় জানা দরকার?',
    },
    {
      id: 'gd',
      title: t('হুমকি ও সাধারণ ডায়েরি (GD)', 'Threats & Police General Diary'),
      law: t('দণ্ডবিধি, ১৮৬০', 'Penal Code, 1860'),
      desc: t(
        'অনলাইনে বা সরাসরি কোনো হুমকি, ব্ল্যাকমেইল বা ক্ষতির আশঙ্কায় ধারা ৫০৩ ও ৫০৭ অনুযায়ী তথ্য গুছিয়ে নিরপেক্ষ জিডি আবেদন তৈরি।',
        'Steps under Sections 503 and 507 for criminal intimidation and preparing structured General Diary (GD) drafts for police.'
      ),
      sampleQuery: 'আমাকে অপরিচিত নম্বর থেকে হুমকি দেওয়া হচ্ছে। জিডি কীভাবে করব?',
    },
    {
      id: 'consumer',
      title: t('ভোক্তা অধিকার ও প্রতারণা', 'Consumer Rights & Fraud'),
      law: t('ভোক্তা অধিকার সংরক্ষণ আইন, ২০০৯', 'Consumers’ Right Protection Act, 2009'),
      desc: t(
        'অতিরিক্ত দাম রাখা, প্রতিশ্রুত পণ্য না দেওয়া বা মিথ্যা বিজ্ঞাপনে প্রতারিত হলে ধারা ৪০, ৪৪, ৪৫ ও ৬০ এর ৩০ দিনের সময়সীমা মেনে প্রতিকার।',
        'Recourse under Sections 40, 44, 45, and 60 for overcharging, non-delivery, and false advertisements within statutory deadlines.'
      ),
      sampleQuery: 'অনলাইন দোকানে টাকা দিয়েছি কিন্তু পণ্য পাইনি। কোন আইন প্রাসঙ্গিক হতে পারে?',
    },
    {
      id: 'property',
      title: t('জমি কেনাবেচা ও খতিয়ান', 'Land Purchase & Khatian'),
      law: t('সম্পত্তি হস্তান্তর আইন, ১৮৮২', 'Transfer of Property Act, 1882'),
      desc: t(
        'জমি কেনার আগে ধারা ৫৩গ অনুযায়ী খতিয়ানে বিক্রেতার নাম ও ধারা ৫৪ ও ৫৪ক অনুযায়ী নিবন্ধিত দলিল ও বায়নাপত্রের আবশ্যকতা।',
        'Statutory requirements for khatian verification, registered deeds, and agreements to sell under Sections 53C, 54, and 54A.'
      ),
      sampleQuery: 'জমি কেনার আগে খতিয়ান সম্পর্কে কী যাচাই করব?',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F1EDE1] text-[#231F1C] transition-colors drafting-grid-96">
      <Header />

      <main className="flex-1">
        {/* ========================================================
            HERO SECTION: 12-Column Split Screen
            Desktop: Left Copy, Right 3D Turntable Scales
            Mobile: Full focus on Headline, Bangladesh Pride Badge & Direct Action
            ======================================================== */}
        <section
          ref={turntableContainerRef}
          className="relative w-full border-b border-border-light/80 py-6 sm:py-12 lg:py-16 flex items-center min-h-[auto] lg:min-h-[calc(100vh-5rem)]"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT 6 COLUMNS: Headline, Promise, CTA & Guarantees */}
              <div className="lg:col-span-6 space-y-5 sm:space-y-6">
                
                {/* Main Hero Headline */}
                {lang === 'bn' ? (
                  <h1 className="font-anek text-3xl sm:text-5xl md:text-[3.25rem] font-extrabold text-[#231F1C] leading-[1.28] tracking-tight">
                    MyLaws: বাংলাদেশের প্রত্যেক নাগরিকের জন্য<br className="hidden md:inline" /> নির্ভরযোগ্য আইনি সহায়তা
                  </h1>
                ) : (
                  <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.14] text-[#231F1C]">
                    MyLaws: Intelligent Legal Assistance for Every Citizen of Bangladesh
                  </h1>
                )}

                {/* Subtitle / Promise */}
                {lang === 'bn' ? (
                  <p className="font-hind text-base sm:text-xl font-semibold text-accent-light tracking-wide">
                    আপনার অধিকার বুঝুন। নির্ভরযোগ্য পরবর্তী পদক্ষেপ নিন।
                  </p>
                ) : (
                  <p className="font-display text-base sm:text-xl font-medium text-accent-light italic">
                    Understand your rights. Know your next step.
                  </p>
                )}

                {/* Body Copy */}
                <p className="font-hind text-xs sm:text-base text-[#5A534A] leading-relaxed max-w-xl font-normal">
                  {t(
                    'সহজ বাংলা বা ইংরেজিতে আপনার সমস্যাটি বলুন। MyLaws জটিল আইনকে স্পষ্ট চেকলিস্টে রূপান্তরিত করে, সরকারি গেজেটের মূল বিধান দেখায় এবং প্রয়োজনীয় লিখিত অভিযোগ বা সাধারণ ডায়েরির (GD) খসড়া প্রস্তুত করে।',
                    'Describe everyday legal situations naturally in Bangla or English. MyLaws translates complex statutes into clear Action Checklists, inspects official gazette sources, and prepares editable drafts.'
                  )}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                  <Link
                    href="/ask"
                    className="bracket-btn text-[#231F1C] hover:text-accent-light py-3 px-6 shadow-sm text-center active-press"
                  >
                    <span className={lang === 'bn' ? 'font-hind font-bold text-xs' : 'font-cinzel text-xs font-bold'}>
                      — {t('এখনই প্রশ্ন করুন', 'USE ONLINE NOW')} —
                    </span>
                  </Link>

                  <Link
                    href="/download"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-light bg-surface-light px-5 py-3 text-xs tracking-wider text-[#231F1C] hover:border-accent-light hover:text-accent-light transition-all shadow-2xs active-press"
                  >
                    <Smartphone className="h-4 w-4 text-accent-light" />
                    <span className={lang === 'bn' ? 'font-hind font-semibold text-xs' : 'font-cinzel text-xs'}>
                      {t('অ্যাপ্লিকেশন', 'APPLICATION')}
                    </span>
                  </Link>
                </div>

                {/* Mobile Direct Quick Inquiry Search Card (Fast engagement on phones) */}
                <div className="pt-1 sm:hidden space-y-2.5">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const queryInput = (e.currentTarget.elements.namedItem('heroQuery') as HTMLInputElement)?.value;
                      if (queryInput && queryInput.trim()) {
                        window.location.href = `/ask?prompt=${encodeURIComponent(queryInput.trim())}`;
                      }
                    }}
                    className="flex items-center gap-2 p-1.5 rounded-2xl border border-accent-light/40 bg-surface-cardLight shadow-md focus-within:border-accent-light focus-within:ring-2 focus-within:ring-accent-light/20"
                  >
                    <Search className="h-4 w-4 text-accent-light ml-2 shrink-0" />
                    <input
                      name="heroQuery"
                      type="text"
                      placeholder={t('আপনার আইনি সমস্যাটি এখানে লিখুন...', 'Type your legal issue here...')}
                      className="flex-1 bg-transparent px-2 py-2 text-sm text-primary-light placeholder:text-secondary-light/60 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="h-9 px-3.5 rounded-xl bg-accent-light text-white text-xs font-bold font-hind flex items-center gap-1 active-press shadow shrink-0"
                    >
                      <span>{t('জিজ্ঞাসা', 'Ask')}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </form>

                  {/* Quick Mobile Category Chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                    {[
                      { label: t('বকেয়া বেতন', 'Unpaid Wages'), q: 'আমার মালিক দুই মাসের বেতন দেয়নি। কী কী বিষয় জানা দরকার?' },
                      { label: t('হুমকি ও জিডি', 'Threats & GD'), q: 'আমাকে অপরিচিত নম্বর থেকে হুমকি দেওয়া হচ্ছে। জিডি কীভাবে করব?' },
                      { label: t('অনলাইন প্রতারণা', 'Online Fraud'), q: 'অনলাইন দোকানে টাকা দিয়েছি কিন্তু পণ্য পাইনি। কোন আইন প্রাসঙ্গিক?' },
                      { label: t('জমি কেনাবেচা', 'Land Deal'), q: 'জমি কেনার আগে খতিয়ান সম্পর্কে কী যাচাই করব?' },
                    ].map((chip, idx) => (
                      <Link
                        key={idx}
                        href={`/ask?prompt=${encodeURIComponent(chip.q)}`}
                        className="shrink-0 px-3 py-1 rounded-full text-[11px] font-hind font-semibold bg-surface-cardLight border border-border-light text-secondary-light hover:text-accent-light hover:border-accent-light active-press shadow-2xs whitespace-nowrap flex items-center gap-1"
                      >
                        <Sparkles className="h-2.5 w-2.5 text-accent-light" />
                        <span>{chip.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Trust guarantees */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5 pt-2 text-xs text-[#5A534A]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0" />
                    <span>{t('নিরাপদ সাইন-ইন ভিত্তিক সেবা', 'Secure authenticated access')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0" />
                    <span>{t('অফিশিয়াল গেজেটের আসল পাঠ ও লিঙ্ক', 'Exact gazette citations')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0" />
                    <span>{t('ব্যবহারকারীর ব্যক্তিগত তথ্যের সুরক্ষা', 'Per-user query privacy')}</span>
                  </div>
                </div>

                {/* Interactive Animated Scroll Cue */}
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="#case-preview-section"
                    className="group inline-flex items-center gap-2.5 text-xs text-[#5A534A] hover:text-accent-light transition-all py-1 cursor-pointer"
                    aria-label={t('স্ক্রল করে বাস্তব কেস ফ্লো দেখুন', 'Scroll to view interactive case flow')}
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border-light bg-surface-light group-hover:border-accent-light group-hover:bg-accent-light/10 shadow-2xs transition-all">
                      <ChevronDown className="h-4 w-4 text-accent-light animate-scroll-bounce" />
                    </div>
                    <span className={lang === 'bn' ? 'font-hind font-semibold text-xs' : 'font-cinzel text-xs tracking-wider'}>
                      {t('বাস্তব কেস ফ্লো দেখুন', 'VIEW INTERACTIVE CASE FLOW')}
                    </span>
                    <span className="h-[1.5px] w-16 bg-border-light group-hover:w-24 group-hover:bg-accent-light transition-all" />
                  </a>
                </div>
              </div>

              {/* RIGHT 6 COLUMNS: 3D Turntable Scales of Justice (Desktop/Laptop Only - Hidden on Mobile) */}
              <div className="hidden lg:flex lg:col-span-6 items-center justify-center py-2 px-1">
                <TurntableScales containerRef={turntableContainerRef} />
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            INTERACTIVE CASE PREVIEW SECTION
            ======================================================== */}
        <section id="case-preview-section" className="py-12 sm:py-20 border-b border-border-light/80 bg-surface-light/40 scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{t('সরাসরি ইন্টারঅ্যাক্টিভ ডেমো', 'Live Interactive Experience')}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#231F1C]">
                  {t(
                    'বাস্তব কেস ফোল্ডারের মাধ্যমে কীভাবে সাহায্য পাবেন',
                    'How MyLaws Works in Real Situations'
                  )}
                </h2>

                <p className="text-xs sm:text-sm text-[#5A534A] leading-relaxed">
                  {t(
                    'নিচের ফোল্ডারে ক্লিক করে দেখুন কীভাবে MyLaws একটি বকেয়া বেতনের প্রশ্ন বিশ্লেষণ করে স্পষ্ট করণীয় পদক্ষেপ, সরকারি ধারার প্রামাণিক পাঠ এবং প্রস্তুতকৃত খসড়া আবেদন প্রদান করে।',
                    'Explore the digital case folder to see how an unpaid wages inquiry is structured into actionable steps, official gazette citations, and ready-to-export drafts.'
                  )}
                </p>

                <div className="pt-1">
                  <Link
                    href="/ask"
                    className="bracket-btn text-xs font-cinzel font-bold tracking-wider inline-block text-center w-full sm:w-auto"
                  >
                    <span>— {t('আপনার নিজের প্রশ্ন নিয়ে পরীক্ষা করুন', 'TRY WITH YOUR OWN QUESTION')} —</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <CasePreview />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            CORE FEATURES SECTION: Balanced 3-Column Dossier Grid
            ======================================================== */}
        <section id="core-features" className="py-14 sm:py-24 border-b border-border-light/80 bg-surface-light/35 scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center space-y-2 mb-10 sm:mb-16">
              <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                {t('মৌলিক ৩টি আইনি সক্ষমতা', 'THREE CORE CAPABILITIES')}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#231F1C] tracking-tight">
                {t(
                  'আইনি সচেতনতা থেকে কার্যকর পদক্ষেপ—MyLaws এর ৩টি মূল স্তম্ভ',
                  'From Legal Awareness to Action: Three Foundational Pillars'
                )}
              </h2>
              <p className="text-xs sm:text-sm text-[#5A534A] max-w-2xl mx-auto font-hind leading-relaxed">
                {t(
                  'সরকারি গেজেটের আসল রেফারেন্স যাচাই, ধাপে ধাপে ব্যবহারিক চেকলিস্ট এবং প্রমিত আইনি আবেদনপত্র প্রস্তুতের সমন্বিত সমাধান।',
                  'A comprehensive framework combining statutory verification, actionable checklists, and verified draft preparation.'
                )}
              </p>
            </div>

            {/* 3-Column Architectural Cards Grid (Mobile-friendly paddings and structure) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8 items-stretch">
              
              {/* Feature 01: Statutory Verification */}
              <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-border-light bg-surface-cardLight/95 shadow-sm flex flex-col justify-between space-y-4 sm:space-y-5 hover:border-accent-light/50 transition-all">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
                      <ShieldCheck className="h-4 w-4" />
                      <span className="font-cinzel text-[11px] tracking-wider uppercase">
                        {t('বৈশিষ্ট্য ০১ · গেজেটভিত্তিক তথ্য', 'FEATURE 01 · STATUTORY VERIFICATION')}
                      </span>
                    </div>
                    <span className="font-cinzel font-bold text-accent-light/60 text-lg">০১</span>
                  </div>

                  <h3 className="font-anek text-lg sm:text-2xl font-extrabold text-[#231F1C] tracking-tight leading-snug">
                    {t(
                      'সরকারি গেজেট ও আইনের মূল ধারা থেকে সরাসরি উদ্ধৃতি',
                      'Verified Statutory Grounding & Exact Gazette Citations'
                    )}
                  </h3>

                  <p className="font-hind text-xs sm:text-sm text-[#5A534A] leading-relaxed">
                    {t(
                      'MyLaws কোনো কাল্পনিক বা অনুমাননির্ভর আইনি তথ্য প্রদান করে না। প্রতিটি দাবির সাথে বাংলাদেশ কোডের (bdlaws.minlaw.gov.bd) সংশ্লিষ্ট ধারা ও হুবহু মূল পাঠ প্রদর্শিত হয়, যা সরাসরি সরকারি পোর্টাল থেকে মিলিয়ে দেখা সম্ভব।',
                      'No fabricated statutes or hallucinated legal advice. Every claim is strictly grounded in verified legislation from the official Bangladesh Code with verbatim quotations.'
                    )}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                    <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/70 space-y-0.5">
                      <span className="font-bold text-accent-light font-cinzel text-sm sm:text-base block">{t('৮৮টি', '88')}</span>
                      <p className="text-[10px] text-[#5A534A] font-hind leading-tight">{t('যাচাইকৃত ধারা', 'Sections')}</p>
                    </div>
                    <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/70 space-y-0.5">
                      <span className="font-bold text-accent-light font-cinzel text-sm sm:text-base block">{t('২৫টি', '25')}</span>
                      <p className="text-[10px] text-[#5A534A] font-hind leading-tight">{t('আইনের পরিধি', 'Acts')}</p>
                    </div>
                    <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/70 space-y-0.5">
                      <span className="font-bold text-accent-light font-cinzel text-sm sm:text-base block">১০০%</span>
                      <p className="text-[10px] text-[#5A534A] font-hind leading-tight">bdlaws লিঙ্ক</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-border-light/60">
                  <Link
                    href="/sources"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-light hover:underline font-hind"
                  >
                    <span>{t('সম্পূর্ণ আইনি ডাটাবেজ পরীক্ষা করুন →', 'Explore Verified Legal Corpus →')}</span>
                  </Link>
                </div>
              </div>

              {/* Feature 02: Action Checklist */}
              <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-border-light bg-surface-cardLight/95 shadow-sm flex flex-col justify-between space-y-4 sm:space-y-5 hover:border-accent-light/50 transition-all">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
                      <CheckSquare className="h-4 w-4" />
                      <span className="font-cinzel text-[11px] tracking-wider uppercase">
                        {t('বৈশিষ্ট্য ০২ · ব্যবহারিক চেকলিস্ট', 'FEATURE 02 · ACTION CHECKLIST')}
                      </span>
                    </div>
                    <span className="font-cinzel font-bold text-accent-light/60 text-lg">০২</span>
                  </div>

                  <h3 className="font-anek text-lg sm:text-2xl font-extrabold text-[#231F1C] tracking-tight leading-snug">
                    {t(
                      'জটিল আইনি ভাষায় না জড়িয়ে ৩ থেকে ৫টি করণীয় পদক্ষেপ',
                      'Clear Action Checklists & Official Jurisdiction Routing'
                    )}
                  </h3>

                  <p className="font-hind text-xs sm:text-sm text-[#5A534A] leading-relaxed">
                    {t(
                      'আপনার পরিস্থিতির বিবরণ পাওয়ার সাথে সাথে MyLaws ৩ থেকে ৫টি বাস্তবায়নযোগ্য পদক্ষেপ সাজিয়ে দেয়। কোন সরকারি দপ্তরে কখন যাবেন এবং কী প্রমাণ সংগ্রহ করবেন তা সুস্পষ্ট থাকে।',
                      'Translate complex statutes into an intuitive 3 to 5 step checklist. Know exactly what evidence to preserve, statutory deadlines to respect, and which governmental hotline to contact.'
                    )}
                  </p>

                  <div className="space-y-2 pt-1 text-xs font-hind">
                    <div className="flex items-start gap-2 text-[#5A534A]">
                      <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                      <span>প্রমাণ ও দালিলিক কাগজপত্র সংরক্ষণের সুনির্দিষ্ট দিকনির্দেশনা</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#5A534A]">
                      <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                      <span>কলকারখানা পরিদর্শক (16104) ও জাতীয় জরুরি সেবা (999) হটলাইন</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#5A534A]">
                      <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                      <span>কখন আইনজীবী প্রয়োজন এবং সরকারি লিগ্যাল এইড (16699) নিয়ম</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-border-light/60">
                  <Link
                    href="/ask"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-light hover:underline font-hind"
                  >
                    <span>{t('অনলাইন সহকারী ব্যবহার করে দেখুন →', 'Try Action Assistant Online →')}</span>
                  </Link>
                </div>
              </div>

              {/* Feature 03: Drafts & A4 PDF */}
              <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-border-light bg-surface-cardLight/95 shadow-sm flex flex-col justify-between space-y-4 sm:space-y-5 hover:border-accent-light/50 transition-all">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
                      <FileText className="h-4 w-4" />
                      <span className="font-cinzel text-[11px] tracking-wider uppercase">
                        {t('বৈশিষ্ট্য ০৩ · প্রমিত খসড়া প্রস্তুত', 'FEATURE 03 · DRAFT PREPARATION')}
                      </span>
                    </div>
                    <span className="font-cinzel font-bold text-accent-light/60 text-lg">০৩</span>
                  </div>

                  <h3 className="font-anek text-lg sm:text-2xl font-extrabold text-[#231F1C] tracking-tight leading-snug">
                    {t(
                      'বাংলায় লিখিত অভিযোগ ও জিডির খসড়া এবং A4 PDF ডাউনলোড',
                      'Standardized Bangla Complaints & Print-Ready A4 PDF'
                    )}
                  </h3>

                  <p className="font-hind text-xs sm:text-sm text-[#5A534A] leading-relaxed">
                    {t(
                      'আপনার উত্তর ও ঘটনার ভিত্তিতে শ্রম পরিদর্শক বা থানার ভারপ্রাপ্ত কর্মকর্তা বরাবর প্রমিত আইনি আবেদনপত্র প্রস্তুত হয়। ব্রাউজারে বাংলায় সরাসরি সম্পাদনা করে নির্ভুল মার্জিন ও পৃষ্ঠা নম্বরসহ A4 PDF ডাউনলোড করুন।',
                      'Generate structured General Diary (GD) or DIFE written complaint drafts from confirmed facts. Review, customize in Bangla, and export crisp multi-page A4 PDFs with zero cloud tracking.'
                    )}
                  </p>

                  <div className="space-y-2 pt-1 text-xs font-hind">
                    <div className="flex items-start gap-2 text-[#5A534A]">
                      <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                      <span>তাৎক্ষণিক বাংলায় এডিটেবল প্রমিত আবেদন ও জিডি খসড়া</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#5A534A]">
                      <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                      <span>অফিসিয়াল মার্জিন ও পৃষ্ঠা নম্বরসহ প্রিন্ট-রেডি A4 PDF এক্সপোর্ট</span>
                    </div>
                    <div className="flex items-start gap-2 text-[#5A534A]">
                      <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                      <span>১০০% ব্রাউজারে ব্যক্তিগত ও নিরাপদ—কোনো ক্লাউড স্টোরেজ নেই</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-border-light/60">
                  <Link
                    href="/drafts"
                    className="bracket-btn text-xs font-bold tracking-wider inline-block text-center w-full sm:w-auto"
                  >
                    <span>— {t('খসড়া তৈরি শুরু করুন', 'START DRAFTING')} —</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            4-STEP CANONICAL LEGAL JOURNEY SECTION (Interactive Visual Timeline on Mobile)
            ======================================================== */}
        <section className="py-14 sm:py-24 border-b border-border-light/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-2.5">
              <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                {t('কার্যপ্রণালী ও সেবা পদ্ধতি', 'FOUR-STEP METHODOLOGY')}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#231F1C]">
                {t('সমস্যা বর্ণনা থেকে আনুষ্ঠানিক খসড়া—৪টি ধাপে', 'From Problem Statement to Finished Draft in 4 Steps')}
              </h2>
              <p className="text-xs sm:text-sm text-[#5A534A]">
                {t(
                  'কোনো জটিল আইনি বইয়ের ভাষা নয়; সহানুভূতিশীল ব্যাখ্যা, বাস্তবিক চেকলিস্ট ও নির্ভুল খসড়ার সমন্বিত সমাধান।',
                  'Not an intimidating legal textbook; supportive plain-language explanations, actionable checklists, and verified draft preparation.'
                )}
              </p>
            </div>

            {/* Mobile Connected Timeline & Desktop 4-Column Grid */}
            <div className="relative mt-10 lg:mt-14">
              {/* Connecting vertical timeline line for mobile */}
              <div className="absolute left-[18px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-accent-light via-accent-gold to-accent-light/20 sm:hidden" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Step 1 */}
                <div className="relative pl-12 sm:pl-0 p-4 sm:p-7 rounded-2xl border border-border-light bg-surface-cardLight shadow-xs space-y-3 hover:border-accent-light/50 transition-all flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="absolute left-1 top-4 sm:static flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-accent-light text-white font-anek font-bold text-sm sm:text-base shadow-xs shrink-0">
                      ১
                    </div>
                    <h3 className="font-anek text-base sm:text-lg font-bold text-[#231F1C]">
                      {t('১. সমস্যা গভীরভাবে অনুধাবন', '1. Understand Problem')}
                    </h3>
                    <p className="text-xs text-[#5A534A] leading-relaxed font-hind">
                      {t(
                        'AI আপনার পুরো ঘটনা পড়ে, মূল আইনি সমস্যা শনাক্ত করে এবং সঠিক এখতিয়ারের জন্য অতিরিক্ত কোনো তথ্যের প্রয়োজন আছে কি না তা নির্ধারণ করে।',
                        'The AI reads the user\'s story, understands what happened, identifies the main issue, and determines what additional information might be needed.'
                      )}
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] sm:text-[11px] font-bold text-accent-light font-cinzel">
                    {t('বিশ্লেষণ ও শনাক্তকরণ', 'PROBLEM IDENTIFICATION')}
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative pl-12 sm:pl-0 p-4 sm:p-7 rounded-2xl border border-border-light bg-surface-cardLight shadow-xs space-y-3 hover:border-accent-light/50 transition-all flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="absolute left-1 top-4 sm:static flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-accent-light text-white font-anek font-bold text-sm sm:text-base shadow-xs shrink-0">
                      ২
                    </div>
                    <h3 className="font-anek text-base sm:text-lg font-bold text-[#231F1C]">
                      {t('২. সহজ ভাষায় ব্যাখ্যা ও আইনি উৎস', '2. Explain Plainly')}
                    </h3>
                    <p className="text-xs text-[#5A534A] leading-relaxed font-hind">
                      {t(
                        'সমস্যার অর্থ কী, আপনার বিকল্পসমূহ কী এবং এরপরে কী করতে পারেন—তা সহজ, আন্তরিক ও সহমর্মী ভাষায় বুঝিয়ে দেওয়া হয়। সাথে নির্ভরযোগ্য সরকারি গেজেট ও লিঙ্ক থাকে।',
                        'The AI explains what the problem means, what your options are, and what you can do next naturally, alongside relevant statutory sources and links.'
                      )}
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] sm:text-[11px] font-bold text-accent-light font-cinzel">
                    {t('সহজ ব্যাখ্যা ও গেজেট লিঙ্ক', 'PLAIN LANGUAGE & SOURCES')}
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative pl-12 sm:pl-0 p-4 sm:p-7 rounded-2xl border border-border-light bg-surface-cardLight shadow-xs space-y-3 hover:border-accent-light/50 transition-all flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="absolute left-1 top-4 sm:static flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-accent-light text-white font-anek font-bold text-sm sm:text-base shadow-xs shrink-0">
                      ৩
                    </div>
                    <h3 className="font-anek text-base sm:text-lg font-bold text-[#231F1C]">
                      {t('৩. ধাপে ধাপে অ্যাকশন চেকলিস্ট', '3. Action Checklist')}
                    </h3>
                    <p className="text-xs text-[#5A534A] leading-relaxed font-hind">
                      {t(
                        'পরিস্থিতি ব্যাখ্যা করার পর, MyLaws সঠিক ক্রমানুসারে আপনার করণীয় কাজগুলোর একটি বাস্তবসম্মত চেকলিস্ট প্রদান করে—কী প্রমাণ রাখবেন, কোন দপ্তরে যাবেন তা সাজানো থাকে।',
                        'After explaining the situation, MyLaws gives the user a practical checklist of what to do, in the exact right order.'
                      )}
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] sm:text-[11px] font-bold text-accent-light font-cinzel">
                    {t('ধাপে ধাপে করণীয় পদক্ষেপ', 'ORDERED ACTION CHECKLIST')}
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative pl-12 sm:pl-0 p-4 sm:p-7 rounded-2xl border border-border-light bg-surface-cardLight shadow-xs space-y-3 hover:border-accent-light/50 transition-all flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="absolute left-1 top-4 sm:static flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-accent-light text-white font-anek font-bold text-sm sm:text-base shadow-xs shrink-0">
                      ৪
                    </div>
                    <h3 className="font-anek text-base sm:text-lg font-bold text-[#231F1C]">
                      {t('৪. আনুষ্ঠানিক খসড়া প্রস্তুতের প্রস্তাব', '4. Formal Draft Offer')}
                    </h3>
                    <p className="text-xs text-[#5A534A] leading-relaxed font-hind">
                      {t(
                        'করণীয় বোঝার পর MyLaws প্রস্তাব করে: “আনুষ্ঠানিক খসড়া প্রস্তুত করুন”। ক্লিক করলে পরিস্থিতি অনুযায়ী অভিযোগপত্র বা জিডি তৈরি হয় এবং A4 PDF ডাউনলোড করা যায়।',
                        'Once understood, MyLaws offers the optional next step: “Prepare a formal draft” to help create the complaint letter, notice, or GD, asking for any missing details needed.'
                      )}
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] sm:text-[11px] font-bold text-accent-light font-cinzel">
                    {t('প্রমিত আবেদন ও A4 PDF', 'FORMAL DRAFT PREPARATION')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SUPPORTED USE-CASES SECTION
            ======================================================== */}
        <section className="py-14 sm:py-24 border-b border-border-light/80 bg-surface-light/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
              <div>
                <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                  {t('বর্তমান সমর্থিত ক্ষেত্রসমূহ', 'VERIFIED TOPIC COVERAGE')}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#231F1C] mt-1">
                  {t('যাচাইকৃত আইনি বিষয়ের পরিধি', 'Verified Statutory Corpus')}
                </h2>
              </div>
              <p className="text-xs text-[#5A534A] max-w-md font-hind">
                {t(
                  'আমরা কাল্পনিক বা মনগড়া আইন দেখাই না। বর্তমানে বাংলাদেশ কোডের ৬টি প্রধান আইনের নির্বাচিত ২৩টি বিধান সরাসরি সমর্থিত।',
                  'We do not fabricate laws. Currently 23 specific provisions across 6 major Bangladesh statutes are verified and active.'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {supportedTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="p-5 sm:p-7 rounded-2xl border border-border-light bg-surface-cardLight space-y-3 hover:border-accent-light/50 transition-colors shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-xs font-semibold text-accent-light tracking-wider">
                      {topic.law}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-accent-light/10 text-accent-light">
                      {topic.id}
                    </span>
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold text-[#231F1C]">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-[#5A534A] leading-relaxed font-hind">
                    {topic.desc}
                  </p>

                  <div className="pt-2 border-t border-border-light/60 flex items-center justify-between">
                    <Link
                      href={`/ask?prompt=${encodeURIComponent(topic.sampleQuery)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-light hover:underline font-hind"
                    >
                      <span>{t('এই বিষয়ে আইনি সমাধান নিন', 'Get legal guidance on this')}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            WEB VS ANDROID COMPARISON
            ======================================================== */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2 mb-8 sm:mb-10">
              <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                {t('প্ল্যাটফর্ম সমন্বয়', 'PLATFORM ARCHITECTURE')}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#231F1C]">
                {t('ওয়েব ও অ্যান্ড্রয়েড অ্যাপের সংযোগ', 'Seamless Web & Android Interoperability')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-5 sm:p-6 rounded-2xl border border-border-light bg-surface-light space-y-3.5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-cinzel font-bold text-[#231F1C]">
                  <Globe2 className="h-5 w-5 text-accent-light" />
                  <span>{t('অনলাইন ওয়েব সহকারী (Current Portal)', 'Online Web Assistant')}</span>
                </div>
                <ul className="text-xs space-y-2 text-[#5A534A] font-hind">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                    <span>{t('লগইন ছাড়া যেকোনো ব্রাউজার ও ডিভাইসে তাৎক্ষণিক ব্যবহারযোগ্য', 'Zero-friction browser access on any desktop or phone')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                    <span>{t('সম্পূর্ণ A4 প্রিন্ট উপযোগী বাংলা পিডিএফ ডাউনলোড', 'Complete print-ready multi-page A4 Bangla PDF export')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                    <span>{t('সার্ভারে ব্যবহারকারীর খসড়া তথ্য সংরক্ষণ করা হয় না', 'Zero remote persistence of personal case details')}</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border border-border-light bg-surface-light space-y-3.5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-cinzel font-bold text-[#231F1C]">
                  <Smartphone className="h-5 w-5 text-accent-light" />
                  <span>{t('জেটপ্যাক কম্পোজ অ্যান্ড্রয়েড অ্যাপ', 'Native Android Application')}</span>
                </div>
                <ul className="text-xs space-y-2 text-[#5A534A] font-hind">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                    <span>{t('ডিভাইসের লোকাল ডাটাবেজে খসড়া ও ইতিহাস সংরক্ষণ', 'Local Room SQLite persistence of private cases')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                    <span>{t('ইন্টারনেট ছাড়া সংরক্ষিত আইনি প্যাক অনুসন্ধানের প্রস্তুতি', 'Offline search support with verified local legal packs')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                    <span>{t('একই ব্যাকএন্ড ও আইনি ডাটা পাইপলাইনের সাথে ১০০% সঙ্গতিপূর্ণ', 'Identical schema and data parity with web API')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
