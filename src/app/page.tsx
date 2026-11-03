'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useApp } from '@/components/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { InteractiveMobileDemo } from '@/components/InteractiveMobileDemo';
import { TurntableScales } from '@/components/TurntableScales';
import { TiltCard } from '@/components/TiltCard';
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
      law: t('সম্পত্তি হস্তান্তর আইন, ১৮৮২ ও ভূমি অপরাধ আইন, ২০২৩', 'Transfer of Property Act, 1882 & Land Crime Act, 2023'),
      desc: t(
        'জমি কেনার আগে ধারা ৫৩গ অনুযায়ী খতিয়ানে বিক্রেতার নাম, নিবন্ধিত দলিল ও জমি জবরদখল রোধে ভূমি অপরাধ আইনে তাৎক্ষণিক প্রতিকার।',
        'Statutory requirements for khatian verification, registered deeds under TP Act, and fast remedies against illegal dispossession.'
      ),
      sampleQuery: 'জমি কেনার আগে খতিয়ান সম্পর্কে কী যাচাই করব?',
    },
    {
      id: 'family',
      title: t('পারিবারিক অধিকার, দেনমোহর ও সুরক্ষা', 'Family Rights, Dower & Protection'),
      law: t('পারিবারিক আদালত আইন, ২০২৩ ও পারিবারিক সহিংসতা আইন, ২০১০', 'Family Courts Act, 2023 & Domestic Violence Act, 2010'),
      desc: t(
        'বকেয়া দেনমোহর, সন্তানের ভরণপোষণ বা পারিবারিক সহিংসতা থেকে সুরক্ষার জন্য পারিবারিক আদালত ও ম্যাজিস্ট্রেট আদালতে সুনির্দিষ্ট প্রতিকারের বিধান।',
        'Statutory remedies under Family Courts Act and Domestic Violence Act for dower recovery, child maintenance, and court protection orders.'
      ),
      sampleQuery: 'স্বামীর নিকট থেকে বকেয়া দেনমোহর ও সন্তানের ভরণপোষণ আদায়ের নিয়ম কী?',
    },
    {
      id: 'rights',
      title: t('মৌলিক সাংবিধানিক অধিকার ও লিগ্যাল এইড', 'Fundamental Rights & Free Legal Aid'),
      law: t('বাংলাদেশের সংবিধান ও আইনগত সহায়তা প্রদান আইন, ২০০০', 'Constitution of Bangladesh & Legal Aid Act, 2000'),
      desc: t(
        'আইনের আশ্রয় লাভের অধিকার, বেআইনি গ্রেফতারের বিরুদ্ধে সুরক্ষা এবং অসচ্ছল নাগরিকদের সরকারি খরচে বিনামূল্যে আইনজীবী (১৬৪৩০ / ১৬৬৯৯) পাওয়ার নিয়ম।',
        'Constitutional protection against unlawful detention, equality before law, and procedures for accessing free government legal aid counsel (16430 / 16699).'
      ),
      sampleQuery: 'সরকারি খরচে বিনামূল্যে আইনজীবী বা আইনি সহায়তা পাওয়ার নিয়ম কী?',
    },
  ];

  const canonicalSteps = [
    {
      num: t('০১', '01'),
      tag: t('বিশ্লেষণ', 'ANALYSIS'),
      title: t('সমস্যা বর্ণনা করুন', 'Describe Your Situation'),
      desc: t(
        'আপনার সাধারণ ভাষায় ঘটনাটি জানান। MyLaws মূল আইনি বিরোধ ও এখতিয়ার স্বয়ংক্রিয়ভাবে শনাক্ত করে।',
        'Explain what happened in simple words. MyLaws instantly identifies the legal dispute and jurisdiction.'
      ),
      icon: Search,
      highlights: [
        t('মূল আইনি বিরোধ শনাক্তকরণ', 'Identifies core dispute'),
        t('প্রয়োজনীয় তথ্যের দ্রুত যাচাই', 'Verifies key facts'),
      ],
    },
    {
      num: t('০২', '02'),
      tag: t('গেজেট ও ধারা', 'STATUTES'),
      title: t('আইনি ধারা ও গেজেট', 'Statutes & Citations'),
      desc: t(
        'কাল্পনিক কিছু নয়; সরাসরি বাংলাদেশ কোডের প্রামাণিক গেজেট এবং আসল ধারার সহজ ব্যাখ্যা দেখুন।',
        'No guesswork. Get verbatim Bangladesh Code citations and verified official bdlaws links.'
      ),
      icon: BookOpen,
      highlights: [
        t('বাংলাদেশ কোডের আসল পাঠ', 'Verbatim official text'),
        t('সহজ ভাষায় নাগরিক অধিকার', 'Rights in plain language'),
      ],
    },
    {
      num: t('০৩', '03'),
      tag: t('অ্যাকশন প্ল্যান', 'CHECKLIST'),
      title: t('করণীয় পদক্ষেপের চেকলিস্ট', 'Clear Action Steps'),
      desc: t(
        'কী কী প্রমাণ সংরক্ষণ করবেন এবং কোন সরকারি দপ্তর বা হটলাইনে যাবেন—তার ৩-৫টি ধারাবাহিক ধাপ।',
        'Know what evidence to preserve, legal deadlines to follow, and official hotlines to call.'
      ),
      icon: CheckSquare,
      highlights: [
        t('৩ থেকে ৫টি ধারাবাহিক ধাপ', '3-5 prioritized steps'),
        t('সরকারি হটলাইন (৯৯৯ / ১৬১০৪)', 'Hotlines (999, 16104, 16121)'),
      ],
    },
    {
      num: t('০৪', '04'),
      tag: t('প্রমিত খসড়া', 'READY DRAFT'),
      title: t('প্রস্তুত দরখাস্ত ও PDF', 'Ready Draft & A4 PDF'),
      desc: t(
        'পরিস্থিতি অনুযায়ী সরাসরি জিডি বা অভিযোগপত্রের ফরম্যাট তৈরি হয় এবং প্রিন্ট-রেডি A4 PDF পাওয়া যায়।',
        'Official complaint drafts & GD generated from your facts, ready to edit and print in A4 PDF.'
      ),
      icon: FileText,
      highlights: [
        t('বাংলায় এডিটেবল দরখাস্ত', 'Editable in Bangla'),
        t('প্রিন্ট-রেডি অফিসিয়াল A4 PDF', 'Official print-ready A4 PDF'),
      ],
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
          className="relative w-full border-b border-border-light/80 py-6 sm:py-12 lg:py-16 flex items-center min-h-[auto] lg:min-h-[min(800px,calc(100vh-5rem))]"
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

                {/* Desktop Action Buttons (Visible only on tablets & desktops) */}
                <div className="hidden sm:flex flex-row items-center gap-3 pt-1">
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

                {/* Mobile Direct Focused Inquiry Unit (High clarity & zero visual noise on phones) */}
                <div className="sm:hidden space-y-3 pt-1">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const queryInput = (e.currentTarget.elements.namedItem('heroQuery') as HTMLInputElement)?.value;
                      if (queryInput && queryInput.trim()) {
                        window.location.href = `/ask?prompt=${encodeURIComponent(queryInput.trim())}`;
                      }
                    }}
                    className="flex items-center gap-2 p-1.5 rounded-2xl border border-accent-light/40 bg-surface-cardLight shadow-xs focus-within:border-accent-light focus-within:ring-2 focus-within:ring-accent-light/20"
                  >
                    <Search className="h-4 w-4 text-accent-light ml-2.5 shrink-0" />
                    <input
                      name="heroQuery"
                      type="text"
                      placeholder={t('আপনার আইনি সমস্যাটি এখানে লিখুন...', 'Type your legal issue here...')}
                      className="flex-1 bg-transparent px-2 py-2 text-xs text-primary-light placeholder:text-secondary-light/60 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="h-9 px-3.5 rounded-xl bg-accent-light text-white text-xs font-bold font-hind flex items-center gap-1 active-press shadow-xs shrink-0"
                    >
                      <span>{t('প্রশ্ন করুন', 'Ask')}</span>
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

                  {/* Mobile Quick Action Link Row */}
                  <div className="flex items-center justify-between pt-1 px-1 text-[11px] font-hind">
                    <Link
                      href="/ask"
                      className="text-accent-light hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      <Sparkles className="h-3 w-3" />
                      <span>{t('সহকারীর সাথে সরাসরি চ্যাট →', 'Direct AI Assistant Chat →')}</span>
                    </Link>
                    <Link
                      href="/download"
                      className="text-secondary-light hover:text-accent-light inline-flex items-center gap-1 font-medium"
                    >
                      <Smartphone className="h-3 w-3 text-accent-light" />
                      <span>{t('অফলাইন অ্যাপ (৪৫%)', 'Offline App (45%)')}</span>
                    </Link>
                  </div>
                </div>

                {/* Trust Guarantees (Clean wrapped horizontal pills) */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 text-[11px] sm:text-xs text-[#5A534A] font-hind">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0" />
                    <span>{t('অফিশিয়াল গেজেট রেফারেন্স', 'Exact gazette citations')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0" />
                    <span>{t('ব্যক্তিগত তথ্যের সুরক্ষা', 'Per-user query privacy')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0" />
                    <span>{t('নিরাপদ সাইন-ইন সেবা', 'Secure authenticated access')}</span>
                  </div>
                </div>

                {/* Interactive Animated Scroll Cue */}
                <div className="pt-1 flex items-center justify-center sm:justify-start">
                  <a
                    href="#how-it-works"
                    className="group inline-flex items-center gap-2 text-xs text-[#5A534A] hover:text-accent-light transition-all py-1.5 px-3.5 rounded-full bg-surface-light border border-border-light/80 shadow-2xs"
                    aria-label={t('স্ক্রল করে ৪টি ধাপের কার্যপদ্ধতি দেখুন', 'Scroll to view 4-step methodology')}
                  >
                    <ChevronDown className="h-3.5 w-3.5 text-accent-light animate-scroll-bounce" />
                    <span className={lang === 'bn' ? 'font-hind font-semibold text-xs' : 'font-cinzel text-xs tracking-wider'}>
                      {t('কার্যপ্রণালী ও ৪টি ধাপ দেখুন', 'EXPLORE 4-STEP METHODOLOGY')}
                    </span>
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
            4-STEP CANONICAL LEGAL JOURNEY SECTION (Clean & Easy Workflow)
            ======================================================== */}
        <section id="how-it-works" className="py-12 sm:py-20 border-b border-border-light/80 bg-surface-light/40 scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                {t('কীভাবে কাজ করে', 'HOW IT WORKS')}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#231F1C] tracking-tight">
                {t('সহজ ৪টি ধাপে আপনার আইনি সমাধান', '4 Simple Steps to Resolve Your Legal Issue')}
              </h2>
              <p className="text-xs sm:text-sm text-[#5A534A] leading-relaxed font-hind">
                {t(
                  'কোনো জটিল আইনি বইয়ের ভাষা নয়—আপনার সাধারণ বর্ণনা থেকে সঠিক ধারা, করণীয় ধাপ এবং প্রস্তুত দরখাস্ত।',
                  'No complicated legal jargon. From your plain-language story to verified statutes, action steps, and ready drafts.'
                )}
              </p>
            </div>

            {/* Connected Step Cards Container */}
            <div className="relative mt-8 sm:mt-12">
              {/* Connecting horizontal track line for desktop */}
              <div className="hidden lg:block absolute top-[28px] left-[6%] right-[6%] h-[2px] bg-gradient-to-r from-accent-light/20 via-accent-gold/30 to-accent-light/20 z-0" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-stretch relative z-10">
                {canonicalSteps.map((step, idx) => {
                  const StepIcon = step.icon;
                  return (
                    <TiltCard key={idx} maxTilt={5} className="h-full">
                      <div
                        className="group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-border-light bg-surface-cardLight shadow-xs space-y-3.5 sm:space-y-4 hover:border-accent-light hover:shadow-md transition-all flex flex-col justify-between h-full"
                      >
                        <div className="space-y-3">
                          {/* Step Header: Step Number Box + Compact Category Tag (Never overflows) */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-light text-white font-anek font-bold text-xs sm:text-sm shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                                <span>{step.num}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-accent-light text-xs font-semibold">
                                <StepIcon className="h-4 w-4" />
                              </div>
                            </div>
                            
                            <span className="font-cinzel text-[10px] tracking-wider uppercase font-bold text-accent-light bg-accent-light/10 border border-accent-light/20 px-2.5 py-0.5 rounded-full truncate max-w-[125px]">
                              {step.tag}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-anek sm:font-display text-base sm:text-lg font-bold text-[#231F1C] group-hover:text-accent-light transition-colors leading-snug pt-0.5">
                            {step.title}
                          </h3>

                          {/* Description */}
                          <p className="text-xs text-[#5A534A] leading-relaxed font-hind">
                            {step.desc}
                          </p>

                          {/* Key deliverables pills / checkmarks */}
                          <div className="space-y-1.5 pt-2 border-t border-border-light/60">
                            {step.highlights.map((h, hIdx) => (
                              <div key={hIdx} className="flex items-start gap-1.5 text-[11px] font-hind text-secondary-light">
                                <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0 mt-0.5" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Subtle bottom indicator */}
                        <div className="pt-2 flex items-center justify-end text-accent-light/60 group-hover:text-accent-light transition-colors">
                          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </TiltCard>
                  );
                })}
              </div>
            </div>

            {/* Bottom Workflow Action Prompt */}
            <div className="mt-8 sm:mt-10 text-center">
              <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 p-3 px-5 rounded-2xl border border-border-light bg-surface-cardLight shadow-xs max-w-xl mx-auto">
                <div className="flex items-center gap-2 text-xs font-medium text-secondary-light font-hind">
                  <Sparkles className="h-4 w-4 text-accent-light shrink-0" />
                  <span>{t('এই ৪টি ধাপ এখনই নিজের কোনো সমস্যা দিয়ে দেখতে চান?', 'Want to test this 4-step workflow on your situation?')}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="#case-preview-section"
                    className="bracket-btn text-xs font-cinzel font-bold py-1.5 px-3.5 text-center active-press"
                  >
                    <span>— {t('সরাসরি ডেমো দেখুন ↓', 'VIEW LIVE DEMO ↓')} —</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            CORE FEATURES SECTION: 3 Core Capabilities (Clean & Approachable)
            ======================================================== */}
        <section id="core-features" className="py-12 sm:py-20 border-b border-border-light/80 bg-surface-light/35 scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center space-y-2 mb-8 sm:mb-12 max-w-2xl mx-auto">
              <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                {t('মৌলিক ৩টি আইনি সক্ষমতা', 'THREE CORE CAPABILITIES')}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#231F1C] tracking-tight">
                {t(
                  'আইনি সচেতনতা থেকে কার্যকর পদক্ষেপ—MyLaws এর ৩টি মূল স্তম্ভ',
                  'From Legal Awareness to Action: Three Foundational Pillars'
                )}
              </h2>
              <p className="text-xs sm:text-sm text-[#5A534A] font-hind leading-relaxed">
                {t(
                  'সরকারি গেজেট যাচাই, ধাপে ধাপে ব্যবহারিক চেকলিস্ট এবং প্রমিত আইনি আবেদনপত্রের সহজ ও সমন্বিত সমাধান।',
                  'A streamlined framework combining verified statutory citations, practical checklists, and verified draft preparation.'
                )}
              </p>
            </div>

            {/* 3-Column Dossier Grid (Clean, spacious & easy to scan) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
              
              {/* Feature 01: Statutory Verification */}
              <TiltCard maxTilt={4} className="h-full">
                <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-border-light bg-surface-cardLight/95 shadow-xs flex flex-col justify-between space-y-4 hover:border-accent-light/50 transition-all h-full">
                  <div className="space-y-3 sm:space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
                        <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                        <span className="font-cinzel text-[10px] tracking-wider uppercase font-bold truncate max-w-[160px]">
                          {t('গেজেটভিত্তিক তথ্য', 'VERIFIED CITATIONS')}
                        </span>
                      </div>
                      <span className="font-cinzel font-bold text-accent-light/70 text-base">০১</span>
                    </div>

                    <h3 className="font-anek text-lg sm:text-xl font-bold text-[#231F1C] tracking-tight leading-snug">
                      {t(
                        'সরকারি গেজেট ও আইনের মূল ধারা থেকে সরাসরি উদ্ধৃতি',
                        'Verified Statutory Grounding & Exact Gazette Citations'
                      )}
                    </h3>

                    <p className="font-hind text-xs text-[#5A534A] leading-relaxed">
                      {t(
                        'MyLaws কোনো কাল্পনিক বা অনুমাননির্ভর পরামর্শ দেয় না। প্রতিটি উত্তরের সাথে বাংলাদেশ কোডের (bdlaws) সংশ্লিষ্ট ধারা ও হুবহু পাঠ প্রদর্শিত হয়।',
                        'No fabricated statutes or hallucinated legal advice. Every claim is strictly grounded in verified legislation from the official Bangladesh Code with verbatim quotations.'
                      )}
                    </p>

                    {/* 3 Clean Highlight Metrics */}
                    <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/60">
                        <span className="font-bold text-accent-light font-cinzel text-xs sm:text-sm block">{t('১,০৪৬টি', '1,046+')}</span>
                        <p className="text-[10px] text-[#5A534A] font-hind">{t('যাচাইকৃত ধারা', 'Sections')}</p>
                      </div>
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/60">
                        <span className="font-bold text-accent-light font-cinzel text-xs sm:text-sm block">{t('৪৯টি', '49')}</span>
                        <p className="text-[10px] text-[#5A534A] font-hind">{t('প্রধান আইন', 'Major Acts')}</p>
                      </div>
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/60">
                        <span className="font-bold text-accent-light font-cinzel text-xs sm:text-sm block">100%</span>
                        <p className="text-[10px] text-[#5A534A] font-hind">{t('bdlaws লিঙ্ক', 'Official Link')}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1 text-xs font-hind border-t border-border-light/60">
                      <div className="flex items-start gap-2 text-[#5A534A]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0 mt-0.5" />
                        <span>{t('বাংলাদেশ কোডের প্রামাণিক গেজেট ও ধারা থেকে হুবহু উদ্ধৃতি', 'Verbatim Bangladesh Code text & official gazette links')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-[#5A534A]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0 mt-0.5" />
                        <span>{t('শ্রম, জমি, পারিবারিক, ভোক্তা ও সাইবারসহ ৪৯টি প্রধান আইন', 'Cross-referenced coverage across 49 Acts and 7 core domains')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border-light/60">
                    <Link
                      href="/sources"
                      className="bracket-btn text-xs font-bold tracking-wider inline-block text-center w-full py-2"
                    >
                      <span>— {t('আইনি ডাটাবেজ অন্বেষণ করুন', 'EXPLORE LEGAL CORPUS')} —</span>
                    </Link>
                  </div>
                </div>
              </TiltCard>

              {/* Feature 02: Action Checklist */}
              <TiltCard maxTilt={4} className="h-full">
                <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-border-light bg-surface-cardLight/95 shadow-xs flex flex-col justify-between space-y-4 hover:border-accent-light/50 transition-all h-full">
                  <div className="space-y-3 sm:space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
                        <CheckSquare className="h-3.5 w-3.5 shrink-0" />
                        <span className="font-cinzel text-[10px] tracking-wider uppercase font-bold truncate max-w-[160px]">
                          {t('অ্যাকশন চেকলিস্ট', 'ACTION CHECKLIST')}
                        </span>
                      </div>
                      <span className="font-cinzel font-bold text-accent-light/70 text-base">০২</span>
                    </div>

                    <h3 className="font-anek text-lg sm:text-xl font-bold text-[#231F1C] tracking-tight leading-snug">
                      {t(
                        'সহজ ৩ থেকে ৫টি করণীয় পদক্ষেপ ও সরকারি হটলাইন',
                        'Clear Action Checklists & Official Hotlines'
                      )}
                    </h3>

                    <p className="font-hind text-xs text-[#5A534A] leading-relaxed">
                      {t(
                        'জটিল আইনে দিশেহারা না হয়ে জানুন কী কী প্রমাণ সংরক্ষণ করবেন এবং কোন সরকারি দপ্তর বা জরুরি হটলাইনে যোগাযোগ করবেন।',
                        'Translate complex statutes into an intuitive 3 to 5 step checklist. Know what evidence to preserve and which public hotline to contact.'
                      )}
                    </p>

                    {/* 3 Clean Highlight Metrics */}
                    <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/60">
                        <span className="font-bold text-accent-light font-cinzel text-xs sm:text-sm block">{t('৩-৫টি', '3-5')}</span>
                        <p className="text-[10px] text-[#5A534A] font-hind">{t('করণীয় ধাপ', 'Action Steps')}</p>
                      </div>
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/60">
                        <span className="font-bold text-accent-light font-cinzel text-xs sm:text-sm block">{t('৪টি', '4')}</span>
                        <p className="text-[10px] text-[#5A534A] font-hind">{t('জরুরি হটলাইন', 'Hotlines')}</p>
                      </div>
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/60">
                        <span className="font-bold text-accent-light font-cinzel text-xs sm:text-sm block">24/7</span>
                        <p className="text-[10px] text-[#5A534A] font-hind">{t('তাৎক্ষণিক গাইড', 'Instant')} </p>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1 text-xs font-hind border-t border-border-light/60">
                      <div className="flex items-start gap-2 text-[#5A534A]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0 mt-0.5" />
                        <span>{t('প্রমাণ ও দালিলিক কাগজপত্র সংরক্ষণের সুনির্দিষ্ট দিকনির্দেশনা', 'Specific instructions for preserving essential evidence & documents')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-[#5A534A]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0 mt-0.5" />
                        <span>{t('জরুরি হটলাইন (৯৯৯ / ১৬১০৪) ও সরকারি আইনি সহায়তা (১৬৪৩০)', 'Hotlines: DIFE (16104), Police (999), and Legal Aid (16430 / 16699)')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border-light/60">
                    <Link
                      href="/ask"
                      className="bracket-btn text-xs font-bold tracking-wider inline-block text-center w-full py-2"
                    >
                      <span>— {t('অনলাইন সহকারী ব্যবহার করুন', 'TRY ACTION ASSISTANT')} —</span>
                    </Link>
                  </div>
                </div>
              </TiltCard>

              {/* Feature 03: Drafts & A4 PDF */}
              <TiltCard maxTilt={4} className="h-full">
                <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-border-light bg-surface-cardLight/95 shadow-xs flex flex-col justify-between space-y-4 hover:border-accent-light/50 transition-all h-full">
                  <div className="space-y-3 sm:space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
                        <FileText className="h-3.5 w-3.5 shrink-0" />
                        <span className="font-cinzel text-[10px] tracking-wider uppercase font-bold truncate max-w-[160px]">
                          {t('প্রমিত খসড়া ও PDF', 'FORMAL DRAFTS')}
                        </span>
                      </div>
                      <span className="font-cinzel font-bold text-accent-light/70 text-base">০৩</span>
                    </div>

                    <h3 className="font-anek text-lg sm:text-xl font-bold text-[#231F1C] tracking-tight leading-snug">
                      {t(
                        'বাংলায় প্রমিত আইনি আবেদন ও প্রিন্ট-রেডি A4 PDF',
                        'Standardized Bangla Complaints & Print-Ready A4 PDF'
                      )}
                    </h3>

                    <p className="font-hind text-xs text-[#5A534A] leading-relaxed">
                      {t(
                        'আপনার দেওয়া তথ্যের ভিত্তিতে সরাসরি অভিযোগ বা জিডির ফরম্যাট তৈরি হয়। ব্রাউজারে বাংলায় সম্পাদনা ও নির্ভুল মার্জিনসহ A4 PDF ডাউনলোড করুন।',
                        'Generate structured General Diary (GD) or formal complaint drafts. Review, edit in Bangla, and export crisp multi-page A4 PDFs.'
                      )}
                    </p>

                    {/* 3 Clean Highlight Metrics */}
                    <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/60">
                        <span className="font-bold text-accent-light font-cinzel text-xs sm:text-sm block">{t('১০টি', '10')}</span>
                        <p className="text-[10px] text-[#5A534A] font-hind">{t('প্রমিত ফরম্যাট', 'Templates')}</p>
                      </div>
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/60">
                        <span className="font-bold text-accent-light font-cinzel text-xs sm:text-sm block">A4 PDF</span>
                        <p className="text-[10px] text-[#5A534A] font-hind">{t('প্রিন্ট-রেডি', 'Print-Ready')}</p>
                      </div>
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/60">
                        <span className="font-bold text-accent-light font-cinzel text-xs sm:text-sm block">100%</span>
                        <p className="text-[10px] text-[#5A534A] font-hind">{t('ব্যক্তিগত সুরক্ষা', 'Private')}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1 text-xs font-hind border-t border-border-light/60">
                      <div className="flex items-start gap-2 text-[#5A534A]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0 mt-0.5" />
                        <span>{t('শ্রম, পারিবারিক, ভোক্তা ও জিডিসহ ১০টি প্রমিত ফরম্যাট', '10 verified statutory templates for GD, Labour, and Consumer')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-[#5A534A]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0 mt-0.5" />
                        <span>{t('১০০% ব্রাউজারে সুরক্ষিত—ব্যক্তিগত কোনো ডেটা ক্লাউডে জমা থাকে না', '100% private in browser—zero personal data stored in cloud') }</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border-light/60">
                    <Link
                      href="/drafts"
                      className="bracket-btn text-xs font-bold tracking-wider inline-block text-center w-full py-2"
                    >
                      <span>— {t('খসড়া তৈরি শুরু করুন', 'START DRAFTING')} —</span>
                    </Link>
                  </div>
                </div>
              </TiltCard>

            </div>
          </div>
        </section>

        {/* ========================================================
            INTERACTIVE CASE PREVIEW SECTION: 3D Interactive Mobile Demo
            ======================================================== */}
        <section id="case-preview-section" className="py-14 sm:py-24 border-b border-border-light/80 bg-surface-light/40 scroll-mt-16 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-5 space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{t('সরাসরি ৩ডি ইন্টারঅ্যাক্টিভ মোবাইল ডেমো', 'Live 3D Interactive Mobile Demo')}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#231F1C] tracking-tight">
                  {t(
                    'বাস্তব পরিস্থিতিতে MyLaws কীভাবে কাজ করে দেখুন',
                    'See How MyLaws Resolves Real Legal Situations'
                  )}
                </h2>

                <p className="text-xs sm:text-sm text-[#5A534A] leading-relaxed font-hind">
                  {t(
                    'পাশের ৩ডি ইন্টারঅ্যাক্টিভ মোবাইলে স্বয়ংক্রিয়ভাবে দেখুন কীভাবে একজন সাধারণ নাগরিকের প্রশ্ন থেকে মুহূর্তের মধ্যে সরকারি গেজেট ধারা, ধাপে ধাপে অ্যাকশন প্ল্যান এবং প্রিন্ট-রেডি দরখাস্ত তৈরি হয়। আপনি যেকোনো অপশনে ক্লিক করে নিজেই পরীক্ষা করতে পারেন।',
                    'Watch our interactive 3D mobile assistant automatically demonstrate real legal workflows. From citizen inquiries to verbatim Bangladesh Code citations, prioritized checklists, and ready A4 complaint drafts.'
                  )}
                </p>

                {/* 3 Core Interactive Capabilities */}
                <div className="space-y-2.5 pt-1 text-xs font-hind border-y border-border-light/60 py-3.5">
                  <div className="flex items-start gap-2.5 text-[#5A534A]">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-light/15 text-accent-light text-[10px] font-bold shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <strong className="text-primary-light font-anek">{t('বাংলাদেশ কোডের আসল ধারা: ', 'Statutory Citations: ')}</strong>
                      <span>{t('bdlaws সরকারি পোর্টাল থেকে হুবহু উদ্ধৃতি ও রেফারেন্স।', 'Verbatim Bangladesh Code text and official links.')}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-[#5A534A]">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-light/15 text-accent-light text-[10px] font-bold shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <strong className="text-primary-light font-anek">{t('করণীয় পদক্ষেপ ও হটলাইন: ', 'Action Plan & Hotlines: ')}</strong>
                      <span>{t('প্রমাণ সংরক্ষণ ও সরকারি হটলাইন (৯৯৯ / ১৬১০৪) নির্দেশিকা।', 'Evidence preservation and emergency agency routing.')}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-[#5A534A]">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-light/15 text-accent-light text-[10px] font-bold shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <strong className="text-primary-light font-anek">{t('প্রমিত দরখাস্ত ও A4 PDF: ', 'Print-Ready Petitions: ')}</strong>
                      <span>{t('বাংলায় সরাসরি এডিটেবল ফরম্যাট ও প্রিন্ট-রেডি এক্সপোর্ট।', 'Instant editable Bangla preview and A4 PDF export.')}</span>
                    </div>
                  </div>
                </div>

                {/* Primary & Secondary Action CTA */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                  <Link
                    href="/ask"
                    className="bracket-btn text-xs font-cinzel font-bold tracking-wider inline-block text-center shadow-xs"
                  >
                    <span>— {t('আপনার নিজের প্রশ্ন নিয়ে পরীক্ষা করুন', 'TRY WITH YOUR OWN QUESTION')} —</span>
                  </Link>
                  <Link
                    href="/drafts"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-border-light bg-surface-light text-xs font-semibold text-secondary-light hover:text-accent-light hover:border-accent-light transition-all shadow-2xs font-hind text-center"
                  >
                    <FileText className="h-3.5 w-3.5 text-accent-light" />
                    <span>{t('আইনি খসড়া এডিটর →', 'Legal Draft Editor →')}</span>
                  </Link>
                </div>
              </div>

              {/* RIGHT 7 COLUMNS: 3D Interactive Demo Mobile */}
              <div className="lg:col-span-7 flex justify-center">
                <InteractiveMobileDemo />
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
                  'আমরা কাল্পনিক বা মনগড়া আইন দেখাই না। বর্তমানে বাংলাদেশ কোডের ৪৯টি প্রধান আইনের নির্বাচিত ১,০৪৬টি বিধান ও ৭টি নাগরিক বিভাগ সরাসরি সমর্থিত।',
                  'We do not fabricate laws. Currently 1,046 verified provisions across 49 major Bangladesh statutes and 7 core citizen categories are active.'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {supportedTopics.map((topic) => (
                <TiltCard key={topic.id} maxTilt={4} className="h-full">
                  <div
                    className="p-5 sm:p-7 rounded-2xl border border-border-light bg-surface-cardLight space-y-3 hover:border-accent-light/50 transition-colors shadow-xs h-full flex flex-col justify-between"
                  >
                    <div className="space-y-3">
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
                    </div>

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
                </TiltCard>
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
