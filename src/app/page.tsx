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
  ListChecks,
  Smartphone,
  Globe2,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Scale,
  Sparkles,
  Download,
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
    <div className="min-h-screen flex flex-col bg-bg-light text-primary-light dark:bg-bg-dark dark:text-primary-dark transition-colors">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border-light/60 dark:border-border-dark/60 bg-folder-texture">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headline and Call-to-actions */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-3.5 py-1 text-xs font-medium text-secondary-light dark:text-secondary-dark shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-accent-light dark:bg-accent-dark animate-pulse" />
                  <span>
                    {t(
                      'বাংলাদেশ আইন ও প্রশাসনিক ব্যবস্থার বাস্তব সহায়ক',
                      'Bangladesh Legal & Administrative Preparation Assistant'
                    )}
                  </span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary-light dark:text-primary-dark leading-[1.18]">
                  {t(
                    'আপনার অধিকার বুঝুন। পরের পদক্ষেপ জানুন।',
                    'Understand your rights. Know your next step.'
                  )}
                </h1>

                <p className="text-sm sm:text-base text-secondary-light dark:text-secondary-dark leading-relaxed max-w-2xl">
                  {t(
                    'সহজ বাংলা, বাংলিশ বা ইংরেজিতে আপনার সমস্যাটি বলুন। মাই লজ (MyLaws) জটিল আইনকে স্পষ্ট চেকলিস্টে রূপান্তরিত করে, সরকারি গেজেটের মূল বিধান দেখায় এবং প্রয়োজনীয় অভিযোগ বা জিডির খসড়া প্রস্তুত করে।',
                    'Describe everyday legal situations naturally in Bangla, Banglish, or English. MyLaws translates complex statutes into clear Action Checklists, inspects official gazette sources, and prepares editable drafts.'
                  )}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/ask"
                    className="inline-flex items-center gap-2 rounded-xl bg-accent-light px-6 py-3.5 text-sm font-semibold text-surface-light shadow-md hover:bg-accent-light/90 dark:bg-accent-dark dark:text-bg-dark dark:hover:bg-accent-dark/90 transition-all hover:scale-[1.02]"
                  >
                    <span>{t('এখনই প্রশ্ন করুন (Use Online)', 'Use Online Now')}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/download"
                    className="inline-flex items-center gap-2 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-5 py-3.5 text-sm font-medium text-primary-light dark:text-primary-dark hover:bg-border-light/30 dark:hover:bg-border-dark/30 transition-colors"
                  >
                    <Smartphone className="h-4 w-4 text-accent-light dark:text-accent-dark" />
                    <span>{t('অ্যান্ড্রয়েড প্রিভিউ দেখুন', 'Android Preview')}</span>
                  </Link>
                </div>

                {/* Subtext guarantees & honest scope */}
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-secondary-light dark:text-secondary-dark">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-light dark:text-accent-dark" />
                    <span>{t('লগইন বা একাউন্ট খোলা ছাড়া তাৎক্ষণিক ব্যবহার', 'No account or login required')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-accent-light dark:text-accent-dark" />
                    <span>{t('গেজেটের আসল উদ্ধৃতি ও লিঙ্ক', 'Exact gazette citations & bdlaws links')}</span>
                  </div>
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
        <section className="py-16 md:py-24 border-b border-border-light/60 dark:border-border-dark/60 bg-surface-light/40 dark:bg-surface-dark/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-light dark:text-accent-dark">
                {t('সহজ ও নির্ভরযোগ্য প্রক্রিয়া', 'Simple & Reliable Journey')}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-light dark:text-primary-dark">
                {t('সমস্যা বর্ণনা থেকে খসড়া প্রস্তুত—৩টি ধাপে', 'From Problem Statement to Finished Draft in 3 Steps')}
              </h2>
              <p className="text-xs sm:text-sm text-secondary-light dark:text-secondary-dark">
                {t(
                  'কোনো বিভ্রান্তিকর আইনি পরিভাষা ছাড়া আপনার করণীয় স্পষ্টভাবে জানা সম্ভব।',
                  'Gain clarity without intimidating legal jargon or hallucinated court advice.'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark font-bold text-base">
                  ১
                </div>
                <h3 className="text-base font-bold text-primary-light dark:text-primary-dark">
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
              <div className="p-6 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark font-bold text-base">
                  ২
                </div>
                <h3 className="text-base font-bold text-primary-light dark:text-primary-dark">
                  {t('২. অ্যাকশন চেকলিস্ট ও মূল উৎস দেখুন', '2. Inspect Checklist & Sources')}
                </h3>
                <p className="text-xs text-secondary-light dark:text-secondary-dark leading-relaxed">
                  {t(
                    'প্রথমেই ৩-৫টি ব্যবহারিক করণীয় পদক্ষেপের তালিকা পান। প্রতিটি পদক্ষেপের সাথে সংশ্লিষ্ট সরকারি আইনের মূল ধারা ও সরকারি পোর্টালের লিঙ্ক যাচাই করুন।',
                    'Receive 3 to 5 actionable next steps immediately. Inspect verbatim quotations from official gazettes with direct links to bdlaws.minlaw.gov.bd.'
                  )}
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark font-bold text-base">
                  ৩
                </div>
                <h3 className="text-base font-bold text-primary-light dark:text-primary-dark">
                  {t('৩. অভিযোগ বা জিডির খসড়া প্রস্তুত করুন', '3. Prepare an Editable Draft')}
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
        <section className="py-16 md:py-24 border-b border-border-light/60 dark:border-border-dark/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent-light dark:text-accent-dark">
                  {t('বর্তমান সমর্থিত ক্ষেত্রসমূহ', 'Currently Supported Topics')}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-light dark:text-primary-dark mt-1">
                  {t('যাচাইকৃত আইনি বিষয়ের পরিধি', 'Verified Topic Coverage')}
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
                  className="p-6 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-3.5 hover:border-accent-light/50 dark:hover:border-accent-dark/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-accent-light dark:text-accent-dark uppercase tracking-wider">
                      {topic.law}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark text-secondary-light dark:text-secondary-dark">
                      {t('যাচাইকৃত', 'Verified')}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-primary-light dark:text-primary-dark">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-secondary-light dark:text-secondary-dark leading-relaxed">
                    {topic.desc}
                  </p>

                  <div className="pt-2 border-t border-border-light/50 dark:border-border-dark/50 flex items-center justify-between">
                    <Link
                      href={`/ask?prompt=${encodeURIComponent(topic.sampleQuery)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-light dark:text-accent-dark hover:underline"
                    >
                      <span>{t('এই প্রশ্ন দিয়ে শুরু করুন', 'Try this question')}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Honest Comparison: Web vs Android */}
        <section className="py-16 md:py-24 border-b border-border-light/60 dark:border-border-dark/60 bg-surface-light/40 dark:bg-surface-dark/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-light dark:text-accent-dark">
                {t('সততা ও স্বচ্ছতা', 'Honest Architecture')}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-light dark:text-primary-dark">
                {t('ওয়েবসাইট ও অ্যান্ড্রয়েড অ্যাপের পার্থক্য', 'Web Assistant vs. Android Application')}
              </h2>
              <p className="text-xs sm:text-sm text-secondary-light dark:text-secondary-dark">
                {t(
                  'কোনো বিভ্রান্তি ছাড়া জেনে নিন কোন মাধ্যমে কী পাওয়া যাবে।',
                  'Clear and honest comparison between our web capabilities and native mobile development.'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Web Platform */}
              <div className="p-6 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark">
                    <Globe2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-primary-light dark:text-primary-dark">
                      {t('মাই লজ ওয়েবসাইট (এখন সক্রিয়)', 'MyLaws Website (Active Now)')}
                    </h3>
                    <p className="text-xs text-secondary-light dark:text-secondary-dark">
                      {t('ব্রাউজার-ভিত্তিক লাইভ সহকারী', 'Browser-based Live Assistant')}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-secondary-light dark:text-secondary-dark">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light dark:text-accent-dark shrink-0 mt-0.5" />
                    <span>{t('ইনস্টল বা অ্যাকাউন্ট তৈরি ছাড়া তাৎক্ষণিক ব্যবহার', 'Zero installation, instant access on mobile & desktop')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light dark:text-accent-dark shrink-0 mt-0.5" />
                    <span>{t('অনলাইন সার্ভার ব্যাকএন্ড এবং মেটা এআই (Muse Spark) যাচাইকরণ', 'Online backend integration with optional Meta Muse Spark')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light dark:text-accent-dark shrink-0 mt-0.5" />
                    <span>{t('ব্রাউজারে সরাসরি বাংলা ড্রাফট সম্পাদন ও A4 PDF রপ্তানি', 'In-browser Bangla draft editor & genuine A4 PDF export')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-secondary-light/70 dark:text-secondary-dark/70">
                    <AlertCircle className="h-4 w-4 text-secondary-light shrink-0 mt-0.5" />
                    <span>{t('লাইভ প্রশ্নোত্তরের জন্য সক্রিয় ইন্টারনেট সংযোগ প্রয়োজন', 'Requires active internet connectivity for live answers')}</span>
                  </li>
                </ul>
              </div>

              {/* Android Platform */}
              <div className="p-6 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-primary-light dark:text-primary-dark">
                      {t('অ্যান্ড্রয়েড নেটিভ অ্যাপ (প্রিভিউ)', 'Android Native App (Preview)')}
                    </h3>
                    <p className="text-xs text-secondary-light dark:text-secondary-dark">
                      {t('অনলাইন ও ঐচ্ছিক অফলাইন প্যাক', 'Online & Optional Offline Packs')}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-secondary-light dark:text-secondary-dark">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light dark:text-accent-dark shrink-0 mt-0.5" />
                    <span>{t('জেটপ্যাক কম্পোজ (Jetpack Compose) ভিত্তিক নেটিভ মোবাইল ইন্টারফেস', 'Jetpack Compose native UI with custom Bangla fonts')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light dark:text-accent-dark shrink-0 mt-0.5" />
                    <span>{t('ওয়েবসাইট ব্যাকএন্ডের সাথে শতভাগ অভিন্ন API ও সার্ভিস চুক্তি', '100% shared API schema and service contracts')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light dark:text-accent-dark shrink-0 mt-0.5" />
                    <span>{t('স্থানীয় ডাটাবেজে অ্যাকশন চেকলিস্ট ও খসড়া সংরক্ষণ', 'Local Room database persistence for checklists & drafts')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-secondary-light/70 dark:text-secondary-dark/70">
                    <AlertCircle className="h-4 w-4 text-secondary-light shrink-0 mt-0.5" />
                    <span>{t('স্থানীয় এআই মডেলের পূর্ণ প্যাকেজিং প্রক্রিয়াধীন (Phase 1 APK প্রস্তুত)', 'Local offline LLM weights packaging in progress (Phase 1 APK ready)')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Focused FAQ Section */}
        <section className="py-16 md:py-24 border-b border-border-light/60 dark:border-border-dark/60">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-light dark:text-accent-dark">
                {t('সাধারণ জিজ্ঞাসা', 'Frequently Asked Questions')}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-light dark:text-primary-dark">
                {t('আপনার মনে হতে পারে এমন কিছু প্রশ্ন', 'Common Questions About MyLaws')}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-2">
                <h3 className="text-sm font-bold text-primary-light dark:text-primary-dark">
                  {t('মাই লজ কি কোনো আইনজীবী বা আইনি পরামর্শদাতা?', 'Is MyLaws a lawyer or legal counsel?')}
                </h3>
                <p className="text-xs text-secondary-light dark:text-secondary-dark leading-relaxed">
                  {t(
                    'না। মাই লজ কোনো আইনজীবী, ল ফার্ম বা আদালত নয়। এটি একটি তথ্যপ্রযুক্তিগত প্রস্তুতি সহকারী, যা বাংলাদেশের গেজেটভুক্ত আইন ও সরকারি প্রক্রিয়ার সাধারণ তথ্য উপস্থাপন করে। জটিল বিরোধে পেশাদার আইনজীবীর পরামর্শ নেওয়া আবশ্যক।',
                    'No. MyLaws is not a law firm, attorney, or court. It is an informational preparation assistant designed to help citizens understand published statutes and procedural steps. Consult a licensed advocate for representation.'
                  )}
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-2">
                <h3 className="text-sm font-bold text-primary-light dark:text-primary-dark">
                  {t('আমার ব্যক্তিগত তথ্য কি সার্ভারে জমা থাকে?', 'Is my personal information stored on servers?')}
                </h3>
                <p className="text-xs text-secondary-light dark:text-secondary-dark leading-relaxed">
                  {t(
                    'না। খসড়া তৈরিতে ব্যবহৃত নাম, ঠিকানা বা মোবাইল নম্বর একান্তই আপনার ব্রাউজারের মেমোরিতে থাকে। ড্রাফটের ব্যক্তিগত তথ্য ক্লাউডে ডাটাবেজে সংরক্ষণ করা হয় না।',
                    'No. Personal details filled into draft applications remain in your local browser session. We do not persist personal identities, addresses, or phone numbers in a remote database.'
                  )}
                </p>
              </div>

              <div className="p-5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-2">
                <h3 className="text-sm font-bold text-primary-light dark:text-primary-dark">
                  {t('প্রস্তুতকৃত খসড়া কি সরাসরি আদালতে বা থানায় দাখিল করা যায়?', 'Can the generated draft be submitted directly?')}
                </h3>
                <p className="text-xs text-secondary-light dark:text-secondary-dark leading-relaxed">
                  {t(
                    'মাই লজের তৈরি ড্রাফটটি একটি আনুষ্ঠানিক কাঠামোযুক্ত খসড়া। এটি প্রিন্ট করে বা স্বাক্ষর করে আপনি সংশ্লিষ্ট থানা (জিডির ক্ষেত্রে) বা ডিআইএফই পরিদর্শক বরাবর দাখিল করতে পারেন। দাখিলের পূর্বে সকল তথ্য সত্য ও সঠিক কি না তা যাচাই করা আপনার দায়িত্ব।',
                    'The prepared draft provides an organized complaint format. You can print and sign it to submit to the relevant police station (for GD) or DIFE regional office. Verifying factual accuracy is your responsibility.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="py-16 md:py-20 bg-accent-light/10 dark:bg-accent-dark/10 border-b border-border-light/60 dark:border-border-dark/60">
          <div className="mx-auto max-w-4xl px-4 text-center space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary-light dark:text-primary-dark">
              {t('আপনার আইনি সমস্যাটি এখনই পরিষ্কার করে নিন', 'Clarify your legal situation right now')}
            </h2>
            <p className="text-xs sm:text-sm text-secondary-light dark:text-secondary-dark max-w-xl mx-auto leading-relaxed">
              {t(
                'কোনো ফর্ম পূরণ বা সাইন-আপ করতে হবে না। সরাসরি প্রশ্ন করুন এবং আপনার অধিকার ও করণীয় জেনে নিন।',
                'No sign-up or registration required. Ask your question directly and discover your actionable next steps.'
              )}
            </p>
            <div className="flex justify-center">
              <Link
                href="/ask"
                className="inline-flex items-center gap-2 rounded-xl bg-accent-light px-8 py-3.5 text-sm font-semibold text-surface-light shadow-md hover:bg-accent-light/90 dark:bg-accent-dark dark:text-bg-dark dark:hover:bg-accent-dark/90 transition-all hover:scale-[1.02]"
              >
                <span>{t('অনলাইন সহকারীতে যান', 'Go to Online Assistant')}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
