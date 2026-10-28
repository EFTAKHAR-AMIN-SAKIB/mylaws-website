'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/components/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CasePreview } from '@/components/CasePreview';
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
    <div className="min-h-screen flex flex-col bg-bg-light text-primary-light dark:bg-bg-dark dark:text-primary-dark transition-colors bg-parchment-grid">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-28 border-b border-border-light/80 dark:border-border-dark/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Classical Headline & Description */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Reference Pill Label */}
                <div className="inline-flex items-center gap-2 rounded-full border border-border-light dark:border-accent-dark/40 bg-surface-light dark:bg-surface-dark px-3.5 py-1 text-xs font-cinzel tracking-wider text-secondary-light dark:text-accent-dark shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-accent-light dark:bg-accent-dark" />
                  <span>
                    {t(
                      'বাংলাদেশ আইন ও প্রশাসনিক প্রস্তুতি সহকারী',
                      'BANGLADESH LEGAL INFORMATION & PREPARATION ASSISTANT'
                    )}
                  </span>
                </div>

                {/* Hero Title: Gold Gradient on Dark Mode, Deep Ink on Light Mode */}
                <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.14] text-primary-light dark:text-gold-gradient">
                  {t(
                    'আপনার অধিকার বুঝুন। পরের পদক্ষেপ জানুন।',
                    'Understand your rights. Know your next step.'
                  )}
                </h1>

                {/* Subtitle / Body Copy */}
                <p className="text-sm sm:text-base text-secondary-light dark:text-secondary-dark leading-relaxed max-w-2xl font-sans">
                  {t(
                    'সহজ বাংলা, বাংলিশ বা ইংরেজিতে আপনার সমস্যাটি বলুন। মাই লজ (MyLaws) জটিল আইনকে স্পষ্ট চেকলিস্টে রূপান্তরিত করে, সরকারি গেজেটের মূল বিধান দেখায় এবং প্রয়োজনীয় অভিযোগ বা জিডির খসড়া প্রস্তুত করে।',
                    'Describe everyday legal situations naturally in Bangla, Banglish, or English. MyLaws translates complex statutes into clear Action Checklists, inspects official gazette sources, and prepares editable drafts.'
                  )}
                </p>

                {/* Action Buttons: Signature Bracket Button & Mobile Touch Target */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/ask"
                    className="bracket-btn text-primary-light hover:text-accent-light dark:text-accent-dark dark:hover:text-white py-3.5 px-7 text-xs font-bold shadow-md"
                  >
                    <span>— {t('এখনই প্রশ্ন করুন', 'USE ONLINE NOW')} —</span>
                  </Link>

                  <Link
                    href="/download"
                    className="inline-flex items-center gap-2 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-5 py-3 text-xs font-cinzel tracking-wider text-primary-light dark:text-secondary-dark hover:border-accent-light dark:hover:border-accent-dark hover:text-primary-light dark:hover:text-accent-dark transition-colors"
                  >
                    <Smartphone className="h-4 w-4 text-accent-light dark:text-accent-dark" />
                    <span>{t('অ্যান্ড্রয়েড প্রিভিউ', 'ANDROID PREVIEW')}</span>
                  </Link>
                </div>

                {/* Subtext guarantees */}
                <div className="flex flex-wrap items-center gap-5 pt-3 text-xs text-secondary-light dark:text-secondary-dark">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-light dark:text-accent-dark" />
                    <span>{t('লগইন বা একাউন্ট ছাড়াই ব্যবহারযোগ্য', 'Zero login required')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-light dark:text-accent-dark" />
                    <span>{t('অফিশিয়াল গেজেটের আসল পাঠ ও লিঙ্ক', 'Exact gazette citations')}</span>
                  </div>
                </div>

                {/* Reference Chevron Accent Motif */}
                <div className="pt-2 text-accent-light dark:text-accent-dark/60 flex items-center gap-2">
                  <ChevronUp className="h-5 w-5" />
                  <span className="h-[1px] w-24 bg-border-light dark:bg-border-dark" />
                </div>
              </div>

              {/* Right Column: Hero Product Preview (Digital Case Folder) */}
              <div className="lg:col-span-5">
                <CasePreview />
              </div>
            </div>
          </div>
        </section>

        {/* 3-Step Journey Section */}
        <section className="py-16 md:py-24 border-b border-border-light/80 dark:border-border-dark/80 bg-surface-light/50 dark:bg-surface-dark/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light dark:text-accent-dark">
                {t('পদ্ধতি ও কার্যপ্রণালী', 'THREE-STEP METHODOLOGY')}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-primary-light dark:text-gold-gradient">
                {t('সমস্যা বর্ণনা থেকে খসড়া প্রস্তুত—৩টি ধাপে', 'From Problem Statement to Finished Draft in 3 Steps')}
              </h2>
              <p className="text-xs sm:text-sm text-secondary-light dark:text-secondary-dark">
                {t(
                  'কোনো বিভ্রান্তিকর আইনি পরিভাষা ছাড়া আপনার করণীয় স্পষ্টভাবে জানা সম্ভব।',
                  'Gain clarity without intimidating legal jargon or hallucinated court advice.'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
              {/* Step 1 */}
              <div className="p-7 rounded-2xl border border-border-light dark:border-border-dark bg-surface-cardLight dark:bg-surface-cardDark space-y-4 shadow-sm hover:border-accent-light/50 dark:hover:border-accent-dark/50 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark font-cinzel font-bold text-base border border-accent-light/20 dark:border-accent-dark/30">
                  I
                </div>
                <h3 className="font-display text-lg font-bold text-primary-light dark:text-accent-dark">
                  {t('১. সহজ ভাষায় সমস্যা বলুন', '1. Describe in Your Own Words')}
                </h3>
                <p className="text-xs text-secondary-light dark:text-secondary-dark leading-relaxed">
                  {t(
                    'বাংলা, বাংলিশ বা ইংরেজিতে স্বাভাবিকভাবে লিখুন। সিস্টেমটি স্বয়ংক্রিয়ভাবে মূল তথ্য ও ঘটনা বিশ্লেষণ করে এবং প্রয়োজনীয় ক্ষেত্রে নির্দিষ্ট প্রশ্ন জিজ্ঞেস করে।',
                    'Write naturally in Bangla, Banglish, or English. The assistant analyzes key factual predicates and asks clarifying questions only when critical facts are missing.'
                  )}
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-7 rounded-2xl border border-border-light dark:border-border-dark bg-surface-cardLight dark:bg-surface-cardDark space-y-4 shadow-sm hover:border-accent-light/50 dark:hover:border-accent-dark/50 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark font-cinzel font-bold text-base border border-accent-light/20 dark:border-accent-dark/30">
                  II
                </div>
                <h3 className="font-display text-lg font-bold text-primary-light dark:text-accent-dark">
                  {t('২. চেকলিস্ট ও মূল উৎস দেখুন', '2. Inspect Checklist & Sources')}
                </h3>
                <p className="text-xs text-secondary-light dark:text-secondary-dark leading-relaxed">
                  {t(
                    'প্রথমেই ৩-৫টি ব্যবহারিক করণীয় পদক্ষেপের তালিকা পান। প্রতিটি পদক্ষেপের সাথে সংশ্লিষ্ট সরকারি আইনের মূল ধারা ও সরকারি পোর্টালের লিঙ্ক যাচাই করুন।',
                    'Receive 3 to 5 actionable next steps immediately. Inspect verbatim quotations from official gazettes with direct links to bdlaws.minlaw.gov.bd.'
                  )}
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-7 rounded-2xl border border-border-light dark:border-border-dark bg-surface-cardLight dark:bg-surface-cardDark space-y-4 shadow-sm hover:border-accent-light/50 dark:hover:border-accent-dark/50 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark font-cinzel font-bold text-base border border-accent-light/20 dark:border-accent-dark/30">
                  III
                </div>
                <h3 className="font-display text-lg font-bold text-primary-light dark:text-accent-dark">
                  {t('৩. অভিযোগ বা জিডির খসড়া প্রস্তুত', '3. Prepare an Editable Draft')}
                </h3>
                <p className="text-xs text-secondary-light dark:text-secondary-dark leading-relaxed">
                  {t(
                    'অনলাইনে আপনার ব্যক্তিগত বিবরণ পূরণ করুন, খসড়াটি বাংলায় সম্পাদনা করুন এবং এক ক্লিকে স্পষ্ট মার্জিন ও পৃষ্ঠা নম্বরসহ A4 PDF ডাউনলোড করুন।',
                    'Fill in your confirmed facts into structured GD or DIFE templates, review in Bangla, and export as a clean multi-page A4 PDF.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Use-Cases Section */}
        <section className="py-16 md:py-24 border-b border-border-light/80 dark:border-border-dark/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light dark:text-accent-dark">
                  {t('বর্তমান সমর্থিত ক্ষেত্রসমূহ', 'VERIFIED TOPIC COVERAGE')}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-light dark:text-gold-gradient mt-1">
                  {t('যাচাইকৃত আইনি বিষয়ের পরিধি', 'Verified Statutory Corpus')}
                </h2>
              </div>
              <p className="text-xs text-secondary-light dark:text-secondary-dark max-w-md">
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
                  className="p-6 sm:p-7 rounded-2xl border border-border-light dark:border-border-dark bg-surface-cardLight dark:bg-surface-cardDark space-y-3.5 hover:border-accent-light/50 dark:hover:border-accent-dark/50 transition-colors shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-xs font-semibold text-accent-light dark:text-accent-dark tracking-wider">
                      {topic.law}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-cinzel font-medium bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark text-secondary-light dark:text-secondary-dark">
                      {t('VERIFIED', 'VERIFIED')}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-primary-light dark:text-primary-dark">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-secondary-light dark:text-secondary-dark leading-relaxed font-sans">
                    {topic.desc}
                  </p>

                  <div className="pt-3 border-t border-border-light/60 dark:border-border-dark/60 flex items-center justify-between">
                    <Link
                      href={`/ask?prompt=${encodeURIComponent(topic.sampleQuery)}`}
                      className="inline-flex items-center gap-1.5 font-cinzel text-xs font-semibold text-accent-light dark:text-accent-dark hover:underline tracking-wider"
                    >
                      <span>{t('এই প্রশ্ন দিয়ে শুরু করুন', 'TRY THIS IN ASSISTANT')}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Honest Comparison: Web vs Android */}
        <section className="py-16 md:py-24 border-b border-border-light/80 dark:border-border-dark/80 bg-surface-light/50 dark:bg-surface-dark/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
              <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light dark:text-accent-dark">
                {t('সততা ও স্থাপত্য', 'ARCHITECTURE COMPARISON')}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-light dark:text-gold-gradient">
                {t('ওয়েবসাইট ও অ্যান্ড্রয়েড অ্যাপের পার্থক্য', 'Web Assistant vs. Android Application')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Web Platform */}
              <div className="p-7 rounded-2xl border border-border-light dark:border-border-dark bg-surface-cardLight dark:bg-surface-cardDark space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark border border-accent-light/20 dark:border-accent-dark/30">
                    <Globe2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-primary-light dark:text-accent-dark">
                      {t('মাই লজ ওয়েবসাইট (এখন সক্রিয়)', 'MyLaws Website (Active Now)')}
                    </h3>
                    <p className="font-cinzel text-[11px] text-secondary-light dark:text-secondary-dark tracking-wider">
                      {t('BROWSER-BASED ASSISTANT', 'BROWSER-BASED ASSISTANT')}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-secondary-light dark:text-secondary-dark">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-light dark:text-accent-dark shrink-0 mt-0.5" />
                    <span>{t('ইনস্টল বা অ্যাকাউন্ট তৈরি ছাড়া তাৎক্ষণিক ব্যবহার', 'Zero installation, instant access on mobile & desktop')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-light dark:text-accent-dark shrink-0 mt-0.5" />
                    <span>{t('অনলাইন সার্ভার ব্যাকএন্ড এবং মেটা এআই (Muse Spark) যাচাইকরণ', 'Online backend integration with optional Meta Muse Spark')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-light dark:text-accent-dark shrink-0 mt-0.5" />
                    <span>{t('ব্রাউজারে সরাসরি বাংলা ড্রাফট সম্পাদন ও A4 PDF রপ্তানি', 'In-browser Bangla draft editor & genuine A4 PDF export')}</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-secondary-light/75 dark:text-secondary-dark/75">
                    <AlertCircle className="h-4 w-4 text-secondary-light shrink-0 mt-0.5" />
                    <span>{t('লাইভ উত্তরের জন্য সক্রিয় ইন্টারনেট সংযোগ প্রয়োজন', 'Requires active internet connectivity for live answers')}</span>
                  </li>
                </ul>
              </div>

              {/* Android Platform */}
              <div className="p-7 rounded-2xl border border-border-light dark:border-border-dark bg-surface-cardLight dark:bg-surface-cardDark space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark border border-accent-light/20 dark:border-accent-dark/30">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-primary-light dark:text-accent-dark">
                      {t('অ্যান্ড্রয়েড নেটিভ অ্যাপ (প্রিভিউ)', 'Android Native App (Preview)')}
                    </h3>
                    <p className="font-cinzel text-[11px] text-secondary-light dark:text-secondary-dark tracking-wider">
                      {t('OFFLINE REFERENCE & PACKS', 'OFFLINE REFERENCE & PACKS')}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-secondary-light dark:text-secondary-dark">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-light dark:text-accent-dark shrink-0 mt-0.5" />
                    <span>{t('জেটপ্যাক কম্পোজ (Jetpack Compose) ভিত্তিক নেটিভ মোবাইল ইন্টারফেস', 'Jetpack Compose native UI with custom Bangla fonts')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-light dark:text-accent-dark shrink-0 mt-0.5" />
                    <span>{t('ওয়েবসাইট ব্যাকএন্ডের সাথে শতভাগ অভিন্ন API ও সার্ভিস চুক্তি', '100% shared API schema and service contracts')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-light dark:text-accent-dark shrink-0 mt-0.5" />
                    <span>{t('স্থানীয় ডাটাবেজে অ্যাকশন চেকলিস্ট ও খসড়া সংরক্ষণ', 'Local Room database persistence for checklists & drafts')}</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-secondary-light/75 dark:text-secondary-dark/75">
                    <AlertCircle className="h-4 w-4 text-secondary-light shrink-0 mt-0.5" />
                    <span>{t('স্থানীয় এআই মডেলের পূর্ণ প্যাকেজিং প্রক্রিয়া সম্পন্ন হলে অফলাইনে উত্তর দেবে', 'Phase 1 APK ready for testing; local model weights packaging in progress')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="py-16 md:py-24 border-b border-border-light/80 dark:border-border-dark/80 bg-bg-light dark:bg-bg-dark">
          <div className="mx-auto max-w-4xl px-4 text-center space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-light dark:text-gold-gradient">
              {t('আপনার আইনি সমস্যাটি এখনই পরিষ্কার করে নিন', 'Clarify your legal situation right now')}
            </h2>
            <p className="text-xs sm:text-sm text-secondary-light dark:text-secondary-dark max-w-xl mx-auto leading-relaxed">
              {t(
                'কোনো ফর্ম পূরণ বা সাইন-আপ করতে হবে না। সরাসরি প্রশ্ন করুন এবং আপনার অধিকার ও করণীয় জেনে নিন।',
                'No sign-up or registration required. Ask your question directly and discover your actionable next steps.'
              )}
            </p>
            <div className="flex justify-center pt-2">
              <Link
                href="/ask"
                className="bracket-btn text-primary-light hover:text-accent-light dark:text-accent-dark dark:hover:text-white py-4 px-9 text-xs font-bold"
              >
                <span>— {t('অনলাইন সহকারীতে যান', 'OPEN ONLINE ASSISTANT')} —</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
