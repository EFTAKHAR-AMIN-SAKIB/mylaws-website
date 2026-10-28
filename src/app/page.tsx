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
            SCROLL-DRIVEN 3D TURNTABLE HERO & FEATURES SECTION
            min-h-[320vh] 12-Column Sticky Split-Screen Layout
            ======================================================== */}
        <section
          ref={turntableContainerRef}
          className="relative min-h-[320vh] w-full border-b border-border-light/80"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
              
              {/* LEFT 6 COLUMNS: Scrolls naturally through Hero headline & Feature blocks */}
              <div className="lg:col-span-6 space-y-36 sm:space-y-48 pt-10 sm:pt-20 pb-40">
                
                {/* ----------------------------------------------------
                    BLOCK 1: Hero Introduction (0% to ~25% Scroll)
                    ---------------------------------------------------- */}
                <div className="space-y-6 pt-2">
                  {/* Reference Pill Label */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-border-light bg-surface-light px-3.5 py-1 text-xs font-cinzel tracking-wider text-secondary-light shadow-2xs">
                    <span className="flex h-2 w-2 rounded-full bg-accent-light" />
                    <span>
                      {t(
                        'বাংলাদেশ আইন ও প্রশাসনিক প্রস্তুতি সহকারী',
                        'BANGLADESH LEGAL INFORMATION & PREPARATION ASSISTANT'
                      )}
                    </span>
                  </div>

                  {/* Main Hero Headline */}
                  {lang === 'bn' ? (
                    <h1 className="font-anek text-3xl sm:text-5xl md:text-[3.35rem] font-extrabold text-[#231F1C] leading-[1.3] tracking-tight">
                      MyLaws: বাংলাদেশের প্রত্যেক নাগরিকের জন্য<br className="hidden md:inline" /> নির্ভরযোগ্য আইনি সহায়তা
                    </h1>
                  ) : (
                    <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.14] text-[#231F1C]">
                      MyLaws: Intelligent Legal Assistance for Every Citizen of Bangladesh
                    </h1>
                  )}

                  {/* Subtitle / Promise */}
                  {lang === 'bn' ? (
                    <p className="font-hind text-lg sm:text-xl font-semibold text-accent-light tracking-wide">
                      আপনার অধিকার বুঝুন। নির্ভরযোগ্য পরবর্তী পদক্ষেপ নিন।
                    </p>
                  ) : (
                    <p className="font-display text-lg sm:text-xl font-medium text-accent-light italic">
                      Understand your rights. Know your next step.
                    </p>
                  )}

                  {/* Body Copy */}
                  <p className="font-hind text-sm sm:text-base text-[#5A534A] leading-relaxed max-w-xl font-normal">
                    {t(
                      'সহজ বাংলা, বাংলিশ বা ইংরেজিতে আপনার সমস্যাটি বলুন। MyLaws জটিল আইনকে স্পষ্ট চেকলিস্টে রূপান্তরিত করে, সরকারি গেজেটের মূল বিধান দেখায় এবং প্রয়োজনীয় লিখিত অভিযোগ বা সাধারণ ডায়েরির (GD) খসড়া প্রস্তুত করে।',
                      'Describe everyday legal situations naturally in Bangla, Banglish, or English. MyLaws translates complex statutes into clear Action Checklists, inspects official gazette sources, and prepares editable drafts.'
                    )}
                  </p>

                  {/* Action Buttons: Signature Bracket Button & Application Target */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Link
                      href="/ask"
                      className="bracket-btn text-[#231F1C] hover:text-accent-light py-3.5 px-7 shadow-sm"
                    >
                      <span className={lang === 'bn' ? 'font-hind font-bold text-xs' : 'font-cinzel text-xs font-bold'}>
                        — {t('এখনই প্রশ্ন করুন', 'USE ONLINE NOW')} —
                      </span>
                    </Link>

                    <Link
                      href="/download"
                      className="inline-flex items-center gap-2 rounded-lg border border-border-light bg-surface-light px-5 py-3 text-xs tracking-wider text-[#231F1C] hover:border-accent-light hover:text-accent-light transition-all shadow-2xs"
                    >
                      <Smartphone className="h-4 w-4 text-accent-light" />
                      <span className={lang === 'bn' ? 'font-hind font-semibold text-xs' : 'font-cinzel text-xs'}>
                        {t('অ্যাপ্লিকেশন', 'APPLICATION')}
                      </span>
                    </Link>
                  </div>

                  {/* Trust guarantees */}
                  <div className="flex flex-wrap items-center gap-5 pt-3 text-xs text-[#5A534A]">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-accent-light" />
                      <span>{t('লগইন বা একাউন্ট ছাড়াই ব্যবহারযোগ্য', 'Zero login required')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-accent-light" />
                      <span>{t('অফিশিয়াল গেজেটের আসল পাঠ ও লিঙ্ক', 'Exact gazette citations')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-accent-light" />
                      <span>{t('ব্রাউজারেই তথ্য নিরাপদ', '100% private in browser')}</span>
                    </div>
                  </div>

                  {/* Interactive Animated Scroll Cue */}
                  <div className="pt-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
                      }}
                      className="group inline-flex items-center gap-2.5 text-xs text-[#5A534A] hover:text-accent-light transition-all py-1 cursor-pointer"
                      aria-label={t('স্ক্রল করে ৩ডি ভিউ দেখুন', 'Scroll to rotate 3D turntable')}
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border-light bg-surface-light group-hover:border-accent-light group-hover:bg-accent-light/10 shadow-2xs transition-all">
                        <ChevronDown className="h-4 w-4 text-accent-light animate-scroll-bounce" />
                      </div>
                      <span className={lang === 'bn' ? 'font-hind font-semibold text-xs' : 'font-cinzel text-xs tracking-wider'}>
                        {t('নিচে স্ক্রল করে ৩ডি পরিভ্রমণ দেখুন', 'SCROLL TO ROTATE 360°')}
                      </span>
                      <span className="h-[1.5px] w-16 bg-border-light group-hover:w-24 group-hover:bg-accent-light transition-all" />
                    </button>
                  </div>
                </div>

                {/* ----------------------------------------------------
                    BLOCK 2: Feature 01 - Statutory Verification (~25% to ~50% Scroll)
                    ---------------------------------------------------- */}
                <div className="p-7 sm:p-9 rounded-3xl border border-border-light bg-surface-cardLight/95 shadow-sm space-y-5 transition-all">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="font-cinzel text-[11px] tracking-wider uppercase">
                      {t('বৈশিষ্ট্য ০১ · গেজেটভিত্তিক তথ্য', 'FEATURE 01 · STATUTORY VERIFICATION')}
                    </span>
                  </div>

                  <h2 className="font-anek text-2xl sm:text-3xl font-extrabold text-[#231F1C] tracking-tight leading-snug">
                    {t(
                      'সরকারি গেজেট ও আইনের মূল ধারা থেকে সরাসরি উদ্ধৃতি',
                      'Verified Statutory Grounding & Exact Gazette Citations'
                    )}
                  </h2>

                  <p className="font-hind text-sm text-[#5A534A] leading-relaxed">
                    {t(
                      'MyLaws কোনো কাল্পনিক বা অনুমাননির্ভর আইনি তথ্য প্রদান করে না। প্রতিটি দাবির সাথে বাংলাদেশ কোডের (bdlaws.minlaw.gov.bd) অফিসিয়াল আইনের সংশ্লিষ্ট ধারা ও হুবহু মূল পাঠ প্রদর্শিত হয়, যা সরাসরি সরকারি পোর্টাল থেকে মিলিয়ে দেখা সম্ভব।',
                      'No fabricated statutes or hallucinated legal advice. Every claim is strictly grounded in verified legislation from the official Bangladesh Code with verbatim quotations under 25 words.'
                    )}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-xl border border-border-light bg-[#F1EDE1]/60 space-y-1">
                      <span className="font-bold text-accent-light font-cinzel text-base">২৩টি</span>
                      <p className="text-[11px] text-[#5A534A] font-hind">যাচাইকৃত মূল ধারা</p>
                    </div>
                    <div className="p-3 rounded-xl border border-border-light bg-[#F1EDE1]/60 space-y-1">
                      <span className="font-bold text-accent-light font-cinzel text-base">৬টি</span>
                      <p className="text-[11px] text-[#5A534A] font-hind">মৌলিক আইনের পরিধি</p>
                    </div>
                    <div className="p-3 rounded-xl border border-border-light bg-[#F1EDE1]/60 space-y-1">
                      <span className="font-bold text-accent-light font-cinzel text-base">১০০%</span>
                      <p className="text-[11px] text-[#5A534A] font-hind">bdlaws অফিশিয়াল লিঙ্ক</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/sources"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-light hover:underline font-hind"
                    >
                      <span>{t('সম্পূর্ণ আইনি ডাটাবেজ পরীক্ষা করুন →', 'Explore Verified Legal Corpus →')}</span>
                    </Link>
                  </div>
                </div>

                {/* ----------------------------------------------------
                    BLOCK 3: Feature 02 - Action Checklist (~50% to ~75% Scroll)
                    ---------------------------------------------------- */}
                <div className="p-7 sm:p-9 rounded-3xl border border-border-light bg-surface-cardLight/95 shadow-sm space-y-5 transition-all">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
                    <CheckSquare className="h-4 w-4" />
                    <span className="font-cinzel text-[11px] tracking-wider uppercase">
                      {t('বৈশিষ্ট্য ০২ · ব্যবহারিক চেকলিস্ট', 'FEATURE 02 · ACTION CHECKLIST')}
                    </span>
                  </div>

                  <h2 className="font-anek text-2xl sm:text-3xl font-extrabold text-[#231F1C] tracking-tight leading-snug">
                    {t(
                      'জটিল আইনি ভাষায় না জড়িয়ে ৩ থেকে ৫টি করণীয় পদক্ষেপ',
                      'Clear Action Checklists & Official Jurisdiction Routing'
                    )}
                  </h2>

                  <p className="font-hind text-sm text-[#5A534A] leading-relaxed">
                    {t(
                      'আপনার পরিস্থিতির বিবরণ পাওয়ার সাথে সাথে MyLaws ৩ থেকে ৫টি বাস্তবায়নযোগ্য পদক্ষেপ সাজিয়ে দেয়। কোন সরকারি দপ্তরে (DIFE 16104, পুলিশ ৯৯৯ বা ভোক্তা অধিকার ১৬১২১) কখন যাবেন এবং কী প্রমাণ সংগ্রহ করবেন তা সুস্পষ্ট থাকে।',
                      'Translate complex statutes into an intuitive 3 to 5 step checklist. Know exactly what evidence to preserve, statutory deadlines to respect, and which governmental hotline to contact.'
                    )}
                  </p>

                  <div className="space-y-2 pt-2 text-xs font-hind">
                    <div className="flex items-center gap-2 text-[#5A534A]">
                      <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0" />
                      <span>প্রমাণ ও দালিলিক কাগজপত্র সংরক্ষণের সুনির্দিষ্ট দিকনির্দেশনা</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#5A534A]">
                      <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0" />
                      <span>কলকারখানা পরিদর্শক (DIFE 16104) ও জাতীয় জরুরি সেবা (999) হটলাইন</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#5A534A]">
                      <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0" />
                      <span>কখন আইনজীবী নিয়োগ করবেন এবং কখন সরকারি লিগ্যাল এইড (16699) পাবেন</span>
                    </div>
                  </div>
                </div>

                {/* ----------------------------------------------------
                    BLOCK 4: Feature 03 - Drafts & A4 PDF (~75% to 100% Scroll)
                    ---------------------------------------------------- */}
                <div className="p-7 sm:p-9 rounded-3xl border border-border-light bg-surface-cardLight/95 shadow-sm space-y-5 transition-all">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
                    <FileText className="h-4 w-4" />
                    <span className="font-cinzel text-[11px] tracking-wider uppercase">
                      {t('বৈশিষ্ট্য ০৩ · প্রমিত খসড়া প্রস্তুত', 'FEATURE 03 · DRAFT PREPARATION')}
                    </span>
                  </div>

                  <h2 className="font-anek text-2xl sm:text-3xl font-extrabold text-[#231F1C] tracking-tight leading-snug">
                    {t(
                      'বাংলায় লিখিত অভিযোগ ও জিডির খসড়া এবং A4 PDF ডাউনলোড',
                      'Standardized Bangla Complaints & Print-Ready A4 PDF'
                    )}
                  </h2>

                  <p className="font-hind text-sm text-[#5A534A] leading-relaxed">
                    {t(
                      'আপনার উত্তর ও ঘটনার ভিত্তিতে শ্রম পরিদর্শক বা থানার ভারপ্রাপ্ত কর্মকর্তা বরাবর প্রমিত আইনি আবেদনপত্র প্রস্তুত হয়। ব্রাউজারে বাংলায় সরাসরি সম্পাদনা করে নির্ভুল মার্জিন ও পৃষ্ঠা নম্বরসহ A4 PDF ডাউনলোড করুন।',
                      'Generate structured General Diary (GD) or DIFE written complaint drafts from confirmed facts. Review, customize in Bangla, and export crisp multi-page A4 PDFs with zero cloud tracking.'
                    )}
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/drafts"
                      className="bracket-btn text-xs font-bold tracking-wider"
                    >
                      <span>— {t('খসড়া তৈরি শুরু করুন', 'START DRAFTING')} —</span>
                    </Link>
                  </div>
                </div>

              </div>

              {/* RIGHT 6 COLUMNS: Sticky top-0 h-screen keeping the 3D Scales pinned */}
              <div className="lg:col-span-6 sticky top-0 h-screen flex items-center justify-center overflow-hidden py-6">
                <TurntableScales containerRef={turntableContainerRef} />
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            INTERACTIVE CASE PREVIEW SECTION
            ======================================================== */}
        <section id="case-preview-section" className="py-14 sm:py-20 border-b border-border-light/80 bg-surface-light/40 scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5 space-y-4">
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
                    'ডানপাশের ফোল্ডারে ক্লিক করে দেখুন কীভাবে MyLaws একটি বকেয়া বেতনের প্রশ্ন বিশ্লেষণ করে স্পষ্ট করণীয় পদক্ষেপ, সরকারি ধারার প্রামাণিক পাঠ এবং প্রস্তুতকৃত খসড়া আবেদন প্রদান করে।',
                    'Explore the digital case folder to see how an unpaid wages inquiry is structured into actionable steps, official gazette citations, and ready-to-export drafts.'
                  )}
                </p>

                <div className="pt-2">
                  <Link
                    href="/ask"
                    className="bracket-btn text-xs font-cinzel font-bold tracking-wider"
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
            3-STEP JOURNEY SECTION
            ======================================================== */}
        <section className="py-16 md:py-24 border-b border-border-light/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                {t('পদ্ধতি ও কার্যপ্রণালী', 'THREE-STEP METHODOLOGY')}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#231F1C]">
                {t('সমস্যা বর্ণনা থেকে খসড়া প্রস্তুত—৩টি ধাপে', 'From Problem Statement to Finished Draft in 3 Steps')}
              </h2>
              <p className="text-xs sm:text-sm text-[#5A534A]">
                {t(
                  'কোনো বিভ্রান্তিকর আইনি পরিভাষা ছাড়া আপনার করণীয় স্পষ্টভাবে জানা সম্ভব।',
                  'Gain clarity without intimidating legal jargon or hallucinated court advice.'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
              {/* Step 1 */}
              <div className="p-7 rounded-2xl border border-border-light bg-surface-cardLight space-y-4 shadow-sm hover:border-accent-light/50 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light/10 text-accent-light font-cinzel font-bold text-base border border-accent-light/20">
                  I
                </div>
                <h3 className="font-display text-lg font-bold text-[#231F1C]">
                  {t('১. সহজ ভাষায় সমস্যা বলুন', '1. Describe in Your Own Words')}
                </h3>
                <p className="text-xs text-[#5A534A] leading-relaxed">
                  {t(
                    'বাংলা, বাংলিশ বা ইংরেজিতে স্বাভাবিকভাবে লিখুন। সিস্টেমটি স্বয়ংক্রিয়ভাবে মূল তথ্য ও ঘটনা বিশ্লেষণ করে এবং প্রয়োজনীয় ক্ষেত্রে নির্দিষ্ট প্রশ্ন জিজ্ঞেস করে।',
                    'Write naturally in Bangla, Banglish, or English. The assistant analyzes key factual predicates and asks clarifying questions only when critical facts are missing.'
                  )}
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-7 rounded-2xl border border-border-light bg-surface-cardLight space-y-4 shadow-sm hover:border-accent-light/50 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light/10 text-accent-light font-cinzel font-bold text-base border border-accent-light/20">
                  II
                </div>
                <h3 className="font-display text-lg font-bold text-[#231F1C]">
                  {t('২. চেকলিস্ট ও মূল উৎস দেখুন', '2. Inspect Checklist & Sources')}
                </h3>
                <p className="text-xs text-[#5A534A] leading-relaxed">
                  {t(
                    'প্রথমেই ৩-৫টি ব্যবহারিক করণীয় পদক্ষেপের তালিকা পান। প্রতিটি পদক্ষেপের সাথে সংশ্লিষ্ট সরকারি আইনের মূল ধারা ও সরকারি পোর্টালের লিঙ্ক যাচাই করুন।',
                    'Receive 3 to 5 actionable next steps immediately. Inspect verbatim quotations from official gazettes with direct links to bdlaws.minlaw.gov.bd.'
                  )}
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-7 rounded-2xl border border-border-light bg-surface-cardLight space-y-4 shadow-sm hover:border-accent-light/50 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light/10 text-accent-light font-cinzel font-bold text-base border border-accent-light/20">
                  III
                </div>
                <h3 className="font-display text-lg font-bold text-[#231F1C]">
                  {t('৩. অভিযোগ বা জিডির খসড়া প্রস্তুত', '3. Prepare an Editable Draft')}
                </h3>
                <p className="text-xs text-[#5A534A] leading-relaxed">
                  {t(
                    'অনলাইনে আপনার ব্যক্তিগত বিবরণ পূরণ করুন, খসড়াটি বাংলায় সম্পাদনা করুন এবং এক ক্লিকে স্পষ্ট মার্জিন ও পৃষ্ঠা নম্বরসহ A4 PDF ডাউনলোড করুন।',
                    'Fill in your confirmed facts into structured GD or DIFE templates, review in Bangla, and export as a clean multi-page A4 PDF.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SUPPORTED USE-CASES SECTION
            ======================================================== */}
        <section className="py-16 md:py-24 border-b border-border-light/80 bg-surface-light/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                  {t('বর্তমান সমর্থিত ক্ষেত্রসমূহ', 'VERIFIED TOPIC COVERAGE')}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#231F1C] mt-1">
                  {t('যাচাইকৃত আইনি বিষয়ের পরিধি', 'Verified Statutory Corpus')}
                </h2>
              </div>
              <p className="text-xs text-[#5A534A] max-w-md">
                {t(
                  'আমরা কাল্পনিক বা মনগড়া আইন দেখাই না। বর্তমানে বাংলাদেশ কোডের ৬টি প্রধান আইনের নির্বাচিত ২৩টি বিধান সরাসরি সমর্থিত।',
                  'We do not fabricate laws. Currently 23 specific provisions across 6 major Bangladesh statutes are verified and active.'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportedTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="p-6 sm:p-7 rounded-2xl border border-border-light bg-surface-cardLight space-y-3.5 hover:border-accent-light/50 transition-colors shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-xs font-semibold text-accent-light tracking-wider">
                      {topic.law}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-accent-light/10 text-accent-light">
                      {topic.id}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#231F1C]">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-[#5A534A] leading-relaxed">
                    {topic.desc}
                  </p>

                  <div className="pt-2 border-t border-border-light/60 flex items-center justify-between">
                    <Link
                      href={`/ask?prompt=${encodeURIComponent(topic.sampleQuery)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-light hover:underline"
                    >
                      <span>{t('এই বিষয়ে অনুসন্ধান করুন', 'Inquire about this')}</span>
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
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2 mb-10">
              <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                {t('প্ল্যাটফর্ম সমন্বয়', 'PLATFORM ARCHITECTURE')}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#231F1C]">
                {t('ওয়েব ও অ্যান্ড্রয়েড অ্যাপের সংযোগ', 'Seamless Web & Android Interoperability')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-border-light bg-surface-light space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-cinzel font-bold text-[#231F1C]">
                  <Globe2 className="h-5 w-5 text-accent-light" />
                  <span>{t('অনলাইন ওয়েব সহকারী (Current Portal)', 'Online Web Assistant')}</span>
                </div>
                <ul className="text-xs space-y-2.5 text-[#5A534A]">
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

              <div className="p-6 rounded-2xl border border-border-light bg-surface-light space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-cinzel font-bold text-[#231F1C]">
                  <Smartphone className="h-5 w-5 text-accent-light" />
                  <span>{t('জেটপ্যাক কম্পোজ অ্যান্ড্রয়েড অ্যাপ', 'Native Android Application')}</span>
                </div>
                <ul className="text-xs space-y-2.5 text-[#5A534A]">
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
