'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useApp } from '@/components/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CasePreview } from '@/components/CasePreview';
import { TurntableScales } from '@/components/TurntableScales';
import { LadyJustice } from '@/components/LadyJustice';
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
      phase: t('ধাপ ০১ · সমস্যা শনাক্তকরণ', 'STEP 01 · IDENTIFICATION'),
      title: t('সমস্যা গভীরভাবে অনুধাবন', 'Deep Problem Understanding'),
      desc: t(
        'AI আপনার পুরো ঘটনা মনোযোগ দিয়ে পড়ে, মূল আইনি সমস্যা শনাক্ত করে এবং সঠিক এখতিয়ারের জন্য অতিরিক্ত কোনো তথ্যের প্রয়োজন আছে কি না তা নির্ধারণ করে।',
        'AI analyzes your situation thoroughly, identifies core statutory issues, and determines any missing facts needed for exact legal jurisdiction.'
      ),
      icon: Search,
      badge: t('বিশ্লেষণ ও এখতিয়ার', 'PROBLEM IDENTIFICATION'),
      highlights: [
        t('মূল বিরোধ ও ক্ষেত্র শনাক্তকরণ', 'Core Legal Dispute Identification'),
        t('এখতিয়ারের জন্য সম্পূরক প্রশ্ন', 'Jurisdictional Fact Verification'),
      ],
    },
    {
      num: t('০২', '02'),
      phase: t('ধাপ ০২ · আইনি উৎস ও ধারা', 'STEP 02 · STATUTORY SOURCES'),
      title: t('সহজ ভাষায় ব্যাখ্যা ও ধারা', 'Plain Explanation & Sources'),
      desc: t(
        'সমস্যার অর্থ কী, আপনার আইনি অধিকার ও বিকল্পসমূহ কী—তা সাধারণ মানুষের বোধগম্য ভাষায় বুঝিয়ে দেওয়া হয়। সাথে বাংলাদেশ কোডের প্রামাণিক গেজেট লিংক থাকে।',
        'Translates what happened into supportive plain-language advice alongside exact Bangladesh Code gazette citations and verifiable bdlaws links.'
      ),
      icon: BookOpen,
      badge: t('সহজ ব্যাখ্যা ও গেজেট লিঙ্ক', 'PLAIN LANGUAGE & SOURCES'),
      highlights: [
        t('বাংলাদেশ কোডের আসল গেজেট পাঠ', 'Verbatim Official Gazette Quotes'),
        t('নাগরিকের আইনি অধিকার ও বিকল্প', 'Clear Citizen Rights & Remedies'),
      ],
    },
    {
      num: t('০৩', '03'),
      phase: t('ধাপ ০৩ · বাস্তব চেকলিস্ট', 'STEP 03 · ACTION CHECKLIST'),
      title: t('ধাপে ধাপে অ্যাকশন চেকলিস্ট', 'Ordered Action Checklist'),
      desc: t(
        'আইন জানার পর, MyLaws সঠিক ক্রমানুসারে আপনার করণীয় পদক্ষেপের চেকলিস্ট প্রদান করে—কী কী প্রমাণ সংরক্ষণ করবেন এবং কোন দপ্তরে যোগাযোগ করবেন।',
        'Delivers an intuitive, step-by-step checklist of what to do in order—what documents/evidence to preserve and which public agency to approach.'
      ),
      icon: CheckSquare,
      badge: t('ধাপে ধাপে করণীয় পদক্ষেপ', 'ORDERED ACTION CHECKLIST'),
      highlights: [
        t('৩ থেকে ৫টি অগ্রাধিকারমূলক পদক্ষেপ', '3 to 5 Prioritized Action Steps'),
        t('জরুরি হটলাইন (৯৯৯ / ১৬১০৪ / ১৬১২১)', 'Official Hotlines (999/16104/16121)'),
      ],
    },
    {
      num: t('০৪', '04'),
      phase: t('ধাপ ০৪ · আনুষ্ঠানিক আবেদন', 'STEP 04 · FORMAL DRAFT'),
      title: t('প্রমিত খসড়া ও A4 PDF প্রস্তুত', 'Formal Draft & Print-Ready PDF'),
      desc: t(
        'পরিস্থিতি অনুযায়ী সরাসরি থানার ভারপ্রাপ্ত কর্মকর্তা, শ্রম পরিদর্শক বা ভোক্তা অধিকার বরাবর প্রমিত আবেদনপত্র তৈরি হয় এবং প্রিন্ট-রেডি A4 PDF ডাউনলোড করা যায়।',
        'Transforms verified facts into formal petitions for Police OC, Labour Inspector, or DNCRP with instant editable Bangla preview and A4 PDF export.'
      ),
      icon: FileText,
      badge: t('প্রমিত আবেদন ও A4 PDF', 'FORMAL DRAFT PREPARATION'),
      highlights: [
        t('বাংলায় সরাসরি এডিটেবল দরখাস্ত', 'In-Browser Editable Bangla Petition'),
        t('অফিসিয়াল মার্জিনসহ প্রিন্ট-রেডি PDF', 'Print-Ready Multi-Page A4 PDF'),
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

                {/* Mobile / Tablet Interactive Lady Justice Balance Statue (Hidden on Desktop where TurntableScales renders) */}
                <div className="lg:hidden pt-4 pb-2 flex justify-center">
                  <LadyJustice />
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
              
              <div className="lg:col-span-5 space-y-4 sm:space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{t('সরাসরি ইন্টারঅ্যাক্টিভ অভিজ্ঞতা', 'Live Interactive Experience')}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#231F1C] tracking-tight">
                  {t(
                    'বাস্তব আইনি পরিস্থিতিতে MyLaws যেভাবে কাজ করে',
                    'How MyLaws Resolves Real Legal Scenarios'
                  )}
                </h2>

                <p className="text-xs sm:text-sm text-[#5A534A] leading-relaxed font-hind">
                  {t(
                    'আইনি জটিলতায় দিশেহারা না হয়ে পাশের ইন্টারঅ্যাক্টিভ সিমুলেটরটি পরীক্ষা করে দেখুন। শ্রম অধিকার, পুলিশ জিডি, ভূমি অপরাধ কিংবা ভোক্তা অধিকার—প্রতিটি ক্ষেত্রে MyLaws কীভাবে সমস্যা বিশ্লেষণ থেকে প্রমিত খসড়া প্রস্তুত পর্যন্ত ৪টি ধাপে সম্পূর্ণ সমাধান দেয়।',
                    'Explore our interactive case simulator. See how MyLaws transforms complex real-world situations—across Labour Rights, Police GD, Land Disputes, and Consumer Fraud—into clear 4-step action plans, verbatim gazettes, and verified drafts.'
                  )}
                </p>

                {/* 4-Step Interactive Workflow Highlights */}
                <div className="space-y-2.5 pt-1 text-xs font-hind border-y border-border-light/60 py-3">
                  <div className="flex items-start gap-2.5 text-[#5A534A]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-light text-white text-[10px] font-bold shrink-0 mt-0.5">১</span>
                    <div>
                      <strong className="text-primary-light font-anek">{t('গভীর সমস্যা অনুধাবন: ', 'Deep Case Analysis: ')}</strong>
                      <span>{t('ঘটনাক্রম পড়ে মূল আইনি বিরোধ ও এখতিয়ার শনাক্তকরণ।', 'Identifies core issues and missing jurisdictional facts.')}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-[#5A534A]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-light text-white text-[10px] font-bold shrink-0 mt-0.5">২</span>
                    <div>
                      <strong className="text-primary-light font-anek">{t('সরকারি গেজেট ও ধারা: ', 'Gazette Citations: ')}</strong>
                      <span>{t('bdlaws.minlaw.gov.bd এর প্রামাণিক পাঠ ও সরকারি লিংক।', 'Verbatim Bangladesh Code text and official sources.')}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-[#5A534A]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-light text-white text-[10px] font-bold shrink-0 mt-0.5">৩</span>
                    <div>
                      <strong className="text-primary-light font-anek">{t('অ্যাকশন চেকলিস্ট: ', 'Action Checklist: ')}</strong>
                      <span>{t('কী প্রমাণ সংরক্ষণ করবেন এবং কোন সরকারি হটলাইনে যাবেন।', 'Evidence preservation and emergency hotline routing.')}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-[#5A534A]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-light text-white text-[10px] font-bold shrink-0 mt-0.5">৪</span>
                    <div>
                      <strong className="text-primary-light font-anek">{t('প্রমিত খসড়া ও A4 PDF: ', 'Formal Draft & PDF: ')}</strong>
                      <span>{t('বাংলায় এডিটেবল আবেদনপত্র ও প্রিন্ট-রেডি ফরম্যাট।', 'Print-ready Bangla petitions with official margins.')}</span>
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
              <TiltCard maxTilt={5} className="h-full">
                <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-border-light bg-surface-cardLight/95 shadow-sm flex flex-col justify-between space-y-4 sm:space-y-5 hover:border-accent-light/50 transition-all h-full">
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

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/70 space-y-0.5">
                        <span className="font-bold text-accent-light font-cinzel text-sm sm:text-base block">{t('১,০৪৬টি', '1,046+')}</span>
                        <p className="text-[10px] text-[#5A534A] font-hind leading-tight">{t('যাচাইকৃত ধারা', 'Sections')}</p>
                      </div>
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/70 space-y-0.5">
                        <span className="font-bold text-accent-light font-cinzel text-sm sm:text-base block">{t('৪৯টি', '49')}</span>
                        <p className="text-[10px] text-[#5A534A] font-hind leading-tight">{t('আইনের পরিধি', 'Acts')}</p>
                      </div>
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/70 space-y-0.5">
                        <span className="font-bold text-accent-light font-cinzel text-sm sm:text-base block">{t('৭টি', '7')}</span>
                        <p className="text-[10px] text-[#5A534A] font-hind leading-tight">{t('নাগরিক ক্ষেত্র', 'Domains')}</p>
                      </div>
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/70 space-y-0.5">
                        <span className="font-bold text-accent-light font-cinzel text-sm sm:text-base block">{t('১০০%', '100%')}</span>
                        <p className="text-[10px] text-[#5A534A] font-hind leading-tight">{t('bdlaws লিঙ্ক', 'bdlaws Link')}</p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1 text-xs font-hind">
                      <div className="flex items-start gap-2 text-[#5A534A]">
                        <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                        <span>{t('বাংলাদেশ কোডের (bdlaws.minlaw.gov.bd) প্রামাণিক গেজেট ও ধারা থেকে হুবহু উদ্ধৃতি', 'Verbatim Bangladesh Code text & official gazette links with zero hallucination')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-[#5A534A]">
                        <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                        <span>{t('আইনের ধারার স্পষ্ট ও বোধগম্য ব্যাখ্যা এবং নাগরিক অধিকারের সুনির্দিষ্ট পরিধি', 'Plain-language statutory explanations with citizen rights & legal remedies')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-[#5A534A]">
                        <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                        <span>{t('শ্রম, ভূমি, ফৌজদারি, পারিবারিক, ভোক্তা ও সাইবারসহ ৪৯টি প্রধান আইনের ক্রস-রেফারেন্স', 'Full cross-referenced coverage across 49 Acts and 7 core citizen domains')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-border-light/60">
                    <Link
                      href="/sources"
                      className="bracket-btn text-xs font-bold tracking-wider inline-block text-center w-full"
                    >
                      <span>— {t('আইনি ডাটাবেজ অন্বেষণ করুন', 'EXPLORE LEGAL CORPUS')} —</span>
                    </Link>
                  </div>
                </div>
              </TiltCard>

              {/* Feature 02: Action Checklist */}
              <TiltCard maxTilt={5} className="h-full">
                <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-border-light bg-surface-cardLight/95 shadow-sm flex flex-col justify-between space-y-4 sm:space-y-5 hover:border-accent-light/50 transition-all h-full">
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

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/70 space-y-0.5">
                        <span className="font-bold text-accent-light font-cinzel text-sm sm:text-base block">{t('৩-৫টি', '3-5')}</span>
                        <p className="text-[10px] text-[#5A534A] font-hind leading-tight">{t('অগ্রাধিকার ধাপ', 'Steps')}</p>
                      </div>
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/70 space-y-0.5">
                        <span className="font-bold text-accent-light font-cinzel text-sm sm:text-base block">{t('৫টি', '5+')}</span>
                        <p className="text-[10px] text-[#5A534A] font-hind leading-tight">{t('জরুরি হটলাইন', 'Hotlines')}</p>
                      </div>
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/70 space-y-0.5">
                        <span className="font-bold text-accent-light font-cinzel text-sm sm:text-base block">{t('১০০%', '100%')}</span>
                        <p className="text-[10px] text-[#5A534A] font-hind leading-tight">{t('বাস্তবায়নযোগ্য', 'Actionable')}</p>
                      </div>
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/70 space-y-0.5">
                        <span className="font-bold text-accent-light font-cinzel text-sm sm:text-base block">{t('২৪/৭', '24/7')}</span>
                        <p className="text-[10px] text-[#5A534A] font-hind leading-tight">{t('তাৎক্ষণিক গাইড', 'Instant')}</p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1 text-xs font-hind">
                      <div className="flex items-start gap-2 text-[#5A534A]">
                        <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                        <span>{t('প্রমাণ ও দালিলিক কাগজপত্র সংরক্ষণের সুনির্দিষ্ট দিকনির্দেশনা (নিয়োগপত্র, চালান, স্ক্রিনশট)', 'Specific instructions for preserving documentation (Appointment letters, vouchers, screenshots)')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-[#5A534A]">
                        <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                        <span>{t('কলকারখানা পরিদর্শক (১৬১০৪), জাতীয় জরুরি সেবা (৯৯৯) ও ভোক্তা অধিকার (১৬১২১) হটলাইন', 'Hotline routing: DIFE (16104), National Emergency (999), and Consumer Rights (16121)')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-[#5A534A]">
                        <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                        <span>{t('কখন আইনজীবী প্রয়োজন এবং সরকারি বিনামূল্যে আইনি সহায়তা (১৬৪৩০ / ১৬৬৯৯) পাওয়ার নিয়ম', 'When counsel is essential and Government Free Legal Aid (16430 / 16699) procedures')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-border-light/60">
                    <Link
                      href="/ask"
                      className="bracket-btn text-xs font-bold tracking-wider inline-block text-center w-full"
                    >
                      <span>— {t('অনলাইন সহকারী ব্যবহার করুন', 'TRY ACTION ASSISTANT')} —</span>
                    </Link>
                  </div>
                </div>
              </TiltCard>

              {/* Feature 03: Drafts & A4 PDF */}
              <TiltCard maxTilt={5} className="h-full">
                <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-border-light bg-surface-cardLight/95 shadow-sm flex flex-col justify-between space-y-4 sm:space-y-5 hover:border-accent-light/50 transition-all h-full">
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

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/70 space-y-0.5">
                        <span className="font-bold text-accent-light font-cinzel text-sm sm:text-base block">{t('১০টি', '10')}</span>
                        <p className="text-[10px] text-[#5A534A] font-hind leading-tight">{t('প্রমিত আবেদন', 'Templates')}</p>
                      </div>
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/70 space-y-0.5">
                        <span className="font-bold text-accent-light font-cinzel text-sm sm:text-base block">A4 PDF</span>
                        <p className="text-[10px] text-[#5A534A] font-hind leading-tight">{t('প্রিন্ট-রেডি', 'Print-Ready')}</p>
                      </div>
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/70 space-y-0.5">
                        <span className="font-bold text-accent-light font-cinzel text-sm sm:text-base block">{t('০%', '0%')}</span>
                        <p className="text-[10px] text-[#5A534A] font-hind leading-tight">{t('ক্লাউড স্টোরেজ', 'No Cloud Log')}</p>
                      </div>
                      <div className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/70 space-y-0.5">
                        <span className="font-bold text-accent-light font-cinzel text-sm sm:text-base block">{t('১০০%', '100%')}</span>
                        <p className="text-[10px] text-[#5A534A] font-hind leading-tight">{t('সম্পাদনাযোগ্য', 'Editable')}</p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1 text-xs font-hind">
                      <div className="flex items-start gap-2 text-[#5A534A]">
                        <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                        <span>{t('পারিবারিক আদালত, ভূমি নামজারি, চেক ডিজঅনার, শ্রম আদালত, ভোক্তা অধিকার ও জিডিসহ ১০টি প্রমিত ফরম্যাট', '10 verified statutory templates: Family Court, Land Mutation, NI 138 Notice, Labour, DNCRP & Police GD')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-[#5A534A]">
                        <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                        <span>{t('অফিসিয়াল মার্জিন ও পৃষ্ঠা নম্বরসহ প্রিন্ট-রেডি মাল্টি-পেজ A4 PDF এক্সপোর্ট', 'Multi-page print-ready A4 PDF export with official margins, signature spaces, and seals')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-[#5A534A]">
                        <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                        <span>{t('১০০% ব্রাউজারে ব্যক্তিগত ও নিরাপদ—ব্যক্তিগত কোনো তথ্য ক্লাউড সার্ভারে রাখা হয় না', '100% private and secure in your browser—zero personal data stored remotely')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-border-light/60">
                    <Link
                      href="/drafts"
                      className="bracket-btn text-xs font-bold tracking-wider inline-block text-center w-full"
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
            4-STEP CANONICAL LEGAL JOURNEY SECTION (Connected Process Pipeline)
            ======================================================== */}
        <section className="py-12 sm:py-20 border-b border-border-light/80 bg-surface-light/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-2.5">
              <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                {t('কার্যপ্রণালী ও সেবা পদ্ধতি', 'FOUR-STEP METHODOLOGY')}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#231F1C]">
                {t('সমস্যা বর্ণনা থেকে আনুষ্ঠানিক খসড়া—৪টি ধাপে', 'From Problem Statement to Finished Draft in 4 Steps')}
              </h2>
              <p className="text-xs sm:text-sm text-[#5A534A] leading-relaxed font-hind">
                {t(
                  'কোনো জটিল আইনি বইয়ের ভাষা নয়; সহানুভূতিশীল ব্যাখ্যা, বাস্তবিক চেকলিস্ট ও নির্ভুল খসড়ার সমন্বিত সমাধান।',
                  'Not an intimidating legal textbook; supportive plain-language explanations, actionable checklists, and verified draft preparation.'
                )}
              </p>
            </div>

            {/* Connected Step Cards Container */}
            <div className="relative mt-10 lg:mt-14">
              {/* Connecting vertical timeline line for mobile */}
              <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-accent-light via-accent-gold to-accent-light/20 sm:hidden" />

              {/* Connecting horizontal track line for desktop */}
              <div className="hidden lg:block absolute top-[28px] left-[6%] right-[6%] h-[2px] bg-gradient-to-r from-accent-light/30 via-accent-gold/40 to-accent-light/30 z-0" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch relative z-10">
                {canonicalSteps.map((step, idx) => {
                  const StepIcon = step.icon;
                  return (
                    <TiltCard key={idx} maxTilt={6} className="h-full">
                      <div
                        className="group relative pl-14 sm:pl-6 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-border-light bg-surface-cardLight shadow-xs space-y-4 hover:border-accent-light hover:shadow-md transition-all flex flex-col justify-between h-full"
                      >
                        <div className="space-y-3 sm:space-y-3.5">
                          {/* Step Header: Icon / Badge & Phase Tag */}
                          <div className="flex items-center justify-between">
                            <div className="absolute left-2.5 top-5 sm:static flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-accent-light text-white font-anek font-bold text-sm sm:text-base shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                              <span className="font-anek font-bold">{step.num}</span>
                            </div>
                            
                            <span className="font-cinzel text-[10px] tracking-wider uppercase font-bold text-accent-light bg-accent-light/10 border border-accent-light/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                              {step.phase}
                            </span>
                          </div>

                          {/* Title with matching step icon */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-accent-light text-xs font-semibold">
                              <StepIcon className="h-3.5 w-3.5" />
                              <span className="font-cinzel text-[10px] tracking-wider uppercase">
                                {t(`ধাপ ${step.num}`, `STEP ${step.num}`)}
                              </span>
                            </div>
                            <h3 className="font-anek sm:font-display text-base sm:text-lg font-bold text-[#231F1C] group-hover:text-accent-light transition-colors leading-snug">
                              {step.title}
                            </h3>
                          </div>

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

                        {/* Bottom Category Tag */}
                        <div className="pt-3 border-t border-border-light/60 flex items-center justify-between">
                          <span className="font-cinzel text-[10px] font-bold text-accent-light/90 tracking-wider">
                            {step.badge}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 text-accent-light/50 group-hover:text-accent-light group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </TiltCard>
                  );
                })}
              </div>
            </div>

            {/* Bottom Workflow Action Prompt */}
            <div className="mt-10 sm:mt-12 text-center">
              <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 p-3 sm:p-3.5 px-5 rounded-2xl border border-border-light bg-surface-cardLight shadow-xs max-w-xl mx-auto">
                <div className="flex items-center gap-2 text-xs font-medium text-secondary-light font-hind">
                  <Sparkles className="h-4 w-4 text-accent-light shrink-0" />
                  <span>{t('এই ৪টি ধাপ নিজের কোনো সমস্যা দিয়ে পরীক্ষা করতে চান?', 'Want to test this 4-step workflow on your situation?')}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href="/ask"
                    className="bracket-btn text-xs font-cinzel font-bold py-1.5 px-3.5 text-center active-press"
                  >
                    <span>— {t('এখনই প্রশ্ন করুন', 'TRY ONLINE NOW')} —</span>
                  </Link>
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
