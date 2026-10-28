'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/components/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CasePreview } from '@/components/CasePreview';
import { LadyJustice } from '@/components/LadyJustice';
import {
  ArrowRight,
  ShieldCheck,
  FileText,
  Smartphone,
  Globe2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const { lang, t } = useApp();

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
    <div className="min-h-screen flex flex-col bg-bg-light text-primary-light transition-colors bg-parchment-grid">
      <Header />

      <main className="flex-1">
        {/* ========================================================
            HERO SECTION (Matching Reference with Lady Justice & Moving Scales)
            ======================================================== */}
        <section className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20 border-b border-border-light/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Classical Headline & Description */}
              <div className="lg:col-span-7 space-y-6">
                
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

                {/* Hero Title: Bold Geometric Display Bangla matching user reference screenshot */}
                {lang === 'bn' ? (
                  <h1 className="font-anek text-3xl sm:text-5xl md:text-[3.35rem] font-extrabold text-primary-light leading-[1.3] tracking-tight">
                    মাই লজ: বাংলাদেশের প্রত্যেক নাগরিকের জন্য<br className="hidden md:inline" /> নির্ভরযোগ্য আইনি সহায়তা
                  </h1>
                ) : (
                  <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.14] text-primary-light">
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
                <p className="font-hind text-sm sm:text-base text-secondary-light leading-relaxed max-w-2xl font-normal">
                  {t(
                    'সহজ বাংলা, বাংলিশ বা ইংরেজিতে আপনার সমস্যাটি বলুন। মাই লজ (MyLaws) জটিল আইনকে স্পষ্ট চেকলিস্টে রূপান্তরিত করে, সরকারি গেজেটের মূল বিধান দেখায় এবং প্রয়োজনীয় লিখিত অভিযোগ বা সাধারণ ডায়েরির (GD) খসড়া প্রস্তুত করে।',
                    'Describe everyday legal situations naturally in Bangla, Banglish, or English. MyLaws translates complex statutes into clear Action Checklists, inspects official gazette sources, and prepares editable drafts.'
                  )}
                </p>

                {/* Action Buttons: Signature Bracket Button & Mobile Touch Target */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/ask"
                    className="bracket-btn text-primary-light hover:text-accent-light py-3.5 px-7 shadow-sm"
                  >
                    <span className={lang === 'bn' ? 'font-hind font-bold text-xs' : 'font-cinzel text-xs font-bold'}>
                      — {t('এখনই প্রশ্ন করুন', 'USE ONLINE NOW')} —
                    </span>
                  </Link>

                  <Link
                    href="/download"
                    className="inline-flex items-center gap-2 rounded-lg border border-border-light bg-surface-light px-5 py-3 text-xs tracking-wider text-primary-light hover:border-accent-light hover:text-accent-light transition-all shadow-2xs"
                  >
                    <Smartphone className="h-4 w-4 text-accent-light" />
                    <span className={lang === 'bn' ? 'font-hind font-semibold text-xs' : 'font-cinzel text-xs'}>
                      {t('অ্যান্ড্রয়েড প্রিভিউ', 'ANDROID PREVIEW')}
                    </span>
                  </Link>
                </div>

                {/* Subtext guarantees */}
                <div className="flex flex-wrap items-center gap-5 pt-3 text-xs text-secondary-light">
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

                {/* Reference Chevron Accent Motif */}
                <div className="pt-2 text-accent-light flex items-center gap-2">
                  <ChevronUp className="h-5 w-5" />
                  <span className="h-[1px] w-24 bg-border-light" />
                </div>
              </div>

              {/* Right Column: Lady Justice Statue with Moving Balance Scale Animation */}
              <div className="lg:col-span-5 flex justify-center items-center py-4">
                <LadyJustice />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            INTERACTIVE CASE PREVIEW SECTION
            ======================================================== */}
        <section className="py-14 sm:py-20 border-b border-border-light/80 bg-surface-light/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{t('সরাসরি ইন্টারঅ্যাক্টিভ ডেমো', 'Live Interactive Experience')}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl font-bold text-primary-light">
                  {t(
                    'বাস্তব কেস ফোল্ডারের মাধ্যমে কীভাবে সাহায্য পাবেন',
                    'How MyLaws Works in Real Situations'
                  )}
                </h2>

                <p className="text-xs sm:text-sm text-secondary-light leading-relaxed">
                  {t(
                    'ডানপাশের ফোল্ডারে ক্লিক করে দেখুন কীভাবে মাই লজ একটি বকেয়া বেতনের প্রশ্ন বিশ্লেষণ করে স্পষ্ট করণীয় পদক্ষেপ, সরকারি ধারার প্রামাণিক পাঠ এবং প্রস্তুতকৃত খসড়া আবেদন প্রদান করে।',
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
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-primary-light">
                {t('সমস্যা বর্ণনা থেকে খসড়া প্রস্তুত—৩টি ধাপে', 'From Problem Statement to Finished Draft in 3 Steps')}
              </h2>
              <p className="text-xs sm:text-sm text-secondary-light">
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
                <h3 className="font-display text-lg font-bold text-primary-light">
                  {t('১. সহজ ভাষায় সমস্যা বলুন', '1. Describe in Your Own Words')}
                </h3>
                <p className="text-xs text-secondary-light leading-relaxed">
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
                <h3 className="font-display text-lg font-bold text-primary-light">
                  {t('২. চেকলিস্ট ও মূল উৎস দেখুন', '2. Inspect Checklist & Sources')}
                </h3>
                <p className="text-xs text-secondary-light leading-relaxed">
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
                <h3 className="font-display text-lg font-bold text-primary-light">
                  {t('৩. অভিযোগ বা জিডির খসড়া প্রস্তুত', '3. Prepare an Editable Draft')}
                </h3>
                <p className="text-xs text-secondary-light leading-relaxed">
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
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-light mt-1">
                  {t('যাচাইকৃত আইনি বিষয়ের পরিধি', 'Verified Statutory Corpus')}
                </h2>
              </div>
              <p className="text-xs text-secondary-light max-w-md">
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

                  <h3 className="font-display text-lg font-bold text-primary-light">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-secondary-light leading-relaxed">
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
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-light">
                {t('ওয়েব ও অ্যান্ড্রয়েড অ্যাপের সংযোগ', 'Seamless Web & Android Interoperability')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-border-light bg-surface-light space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-cinzel font-bold text-primary-light">
                  <Globe2 className="h-5 w-5 text-accent-light" />
                  <span>{t('অনলাইন ওয়েব সহকারী (Current Portal)', 'Online Web Assistant')}</span>
                </div>
                <ul className="text-xs space-y-2.5 text-secondary-light">
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
                <div className="flex items-center gap-2 text-sm font-cinzel font-bold text-primary-light">
                  <Smartphone className="h-5 w-5 text-accent-light" />
                  <span>{t('জেটপ্যাক কম্পোজ অ্যান্ড্রয়েড অ্যাপ', 'Native Android Application')}</span>
                </div>
                <ul className="text-xs space-y-2.5 text-secondary-light">
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
