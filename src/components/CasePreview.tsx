'use client';

import React, { useState } from 'react';
import { useApp } from './AppContext';
import {
  FileText,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Shield,
  Clock,
  Building,
  Sparkles,
  HelpCircle,
  ListOrdered,
  Check,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

type CaseStepTab = 'step1' | 'step2' | 'step3' | 'step4';

export function CasePreview() {
  const { lang, t } = useApp();
  const [activeTab, setActiveTab] = useState<CaseStepTab>('step1');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    'step-1': true,
  });

  const toggleStep = (id: string) => {
    setCompletedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const stepsList: { id: CaseStepTab; stepNum: string; label: string; icon: React.ReactNode }[] = [
    {
      id: 'step1',
      stepNum: t('১', '1'),
      label: t('সমস্যা অনুধাবন', 'Understand Problem'),
      icon: <Sparkles className="h-3.5 w-3.5" />,
    },
    {
      id: 'step2',
      stepNum: t('২', '2'),
      label: t('সহজ ব্যাখ্যা ও উৎস', 'Plain Explanation'),
      icon: <BookOpen className="h-3.5 w-3.5" />,
    },
    {
      id: 'step3',
      stepNum: t('৩', '3'),
      label: t('অ্যাকশন চেকলিস্ট', 'Action Checklist'),
      icon: <ListOrdered className="h-3.5 w-3.5" />,
    },
    {
      id: 'step4',
      stepNum: t('৪', '4'),
      label: t('আনুষ্ঠানিক খসড়া', 'Formal Draft'),
      icon: <FileText className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <div className="relative rounded-3xl border border-border-light bg-surface-cardLight p-2 sm:p-3 shadow-2xl transition-all">
      {/* Folder Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-border-light/80 px-4 py-3 bg-bg-light/60 rounded-t-2xl gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent-light inline-block shadow-sm" />
          <span className="font-cinzel text-xs font-bold tracking-wider text-secondary-light">
            {t('বাস্তব ৪-ধাপের কেস ফোল্ডার #BD-2026-09', '4-STEP CASE WORKFLOW #BD-2026-09')}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-accent-light font-medium bg-accent-light/10 px-2.5 py-0.5 rounded-full border border-accent-light/20">
          <Shield className="h-3 w-3" />
          <span>{t('শ্রম আইন ২০০৬ সমর্থিত', 'Labour Act 2006 Verified')}</span>
        </div>
      </div>

      {/* Case Situation Banner */}
      <div className="px-4 py-3 bg-accent-light/5 border-b border-border-light/60">
        <p className="text-xs text-secondary-light font-sans leading-relaxed">
          <span className="font-bold text-primary-light font-anek">
            {t('বর্ণিত সমস্যা: ', 'User Description: ')}
          </span>
          &ldquo;{t('আমার মালিক গত দুই মাসের বেতন দেয়নি। এখন আমি কী করতে পারি?', 'My employer has not paid my salary for two months. What can I do now?')}&rdquo;
        </p>
      </div>

      {/* 4-Step Interactive Tab Stepper */}
      <div className="flex items-center overflow-x-auto no-scrollbar border-b border-border-light/80 bg-surface-light sm:grid sm:grid-cols-4 p-1 gap-1">
        {stepsList.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-xl transition-all cursor-pointer shrink-0 active-press ${
                isActive
                  ? 'border border-accent-light/40 text-accent-light bg-accent-light/10 font-bold shadow-2xs'
                  : 'text-secondary-light hover:text-primary-light hover:bg-bg-light/40'
              }`}
            >
              <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${
                isActive ? 'bg-accent-light text-white' : 'bg-border-light text-secondary-light'
              }`}>
                {tab.stepNum}
              </span>
              <span className="font-anek whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Step Body */}
      <div className="p-4 sm:p-5 min-h-[340px] flex flex-col justify-between">
        {/* STEP 1: UNDERSTAND THE PROBLEM */}
        {activeTab === 'step1' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-border-light/60 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold font-anek text-primary-light">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-light text-white text-[11px]">১</span>
                <span>{t('ধাপ ১: সমস্যার গভীর অনুধাবন ও মূল বিষয় শনাক্তকরণ', 'Step 1: Understand Problem & Identify Issue')}</span>
              </div>
              <span className="text-[11px] text-accent-light font-cinzel font-bold">
                {t('AI বিশ্লেষণ', 'AI ANALYSIS')}
              </span>
            </div>

            {/* AI Understanding Narrative */}
            <div className="p-3.5 rounded-2xl bg-bg-light/70 border border-border-light space-y-1.5">
              <span className="text-[11px] font-bold font-anek text-secondary-light uppercase tracking-wider block">
                {t('AI যেভাবে ঘটনাটি বিশ্লেষণ করেছে:', 'How AI understands your story:')}
              </span>
              <p className="text-xs text-primary-light font-hind leading-relaxed">
                {t(
                  'আমরা আপনার বিষয়টি পর্যালোচনা করেছি: আপনি প্রতিষ্ঠানে নিয়মিত দায়িত্ব পালন করার পরও মালিকপক্ষ গত দুই মাসের আইনসংগত মজুরি পরিশোধ করেনি। এটি বাংলাদেশ শ্রম আইন অনুযায়ী বকেয়া মজুরির সুনির্দিষ্ট লঙ্ঘন।',
                  'We have analyzed your situation: you have faithfully rendered work, but your employer has failed to disburse your statutory wages for two months. This constitutes an actionable wage-recovery violation.'
                )}
              </p>
            </div>

            {/* Identified Issue Badge */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-accent-light/10 border border-accent-light/20 text-xs text-primary-light">
              <Shield className="h-4 w-4 text-accent-light shrink-0" />
              <div>
                <span className="font-bold font-anek text-accent-light block">
                  {t('শনাক্তকৃত মূল আইনি বিষয়:', 'Identified Legal Issue:')}
                </span>
                <span className="font-hind text-[11px] text-secondary-light">
                  {t('বকেয়া মজুরি ও শ্রম অধিকারের লঙ্ঘন (বাংলাদেশ শ্রম আইন, ২০০৬)', 'Unpaid Wages & Statutory Labour Rights Violation (Labour Act 2006)')}
                </span>
              </div>
            </div>

            {/* Missing details check */}
            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold font-anek">
                <HelpCircle className="h-3.5 w-3.5 text-amber-700" />
                <span>{t('প্রয়োজনীয় অতিরিক্ত তথ্যের অনুসন্ধান:', 'Additional Information Needed:')}</span>
              </div>
              <p className="text-[11px] text-amber-800 font-hind leading-relaxed">
                {t(
                  'কলকারখানা পরিদর্শন অধিদপ্তরের (DIFE) কোন আঞ্চলিক পরিদর্শকের এখতিয়ারে আবেদনটি যাবে, তা নিশ্চিত করতে কর্মস্থলের জেলা বা থানা প্রয়োজন।',
                  'Workplace district/police station is required to determine the regional DIFE inspectorate jurisdiction.'
                )}
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: EXPLAIN THE SITUATION IN SIMPLE LANGUAGE */}
        {activeTab === 'step2' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-border-light/60 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold font-anek text-primary-light">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-light text-white text-[11px]">২</span>
                <span>{t('ধাপ ২: সহজ ভাষায় পরিস্থিতি ও অধিকারের ব্যাখ্যা', 'Step 2: Plain Language Explanation & Sources')}</span>
              </div>
              <span className="text-[11px] text-accent-light font-cinzel font-bold">
                {t('আইনি উৎস ও অধিকার', 'RIGHTS & SOURCES')}
              </span>
            </div>

            {/* Plain explanation */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold font-anek text-primary-light">
                {t('সহজ ভাষায় আপনার পরিস্থিতি ও অধিকার:', 'What this means in plain language:')}
              </h4>
              <p className="text-xs text-secondary-light font-hind leading-relaxed">
                {t(
                  'মালিক চাইলেই বেতন অনির্দিষ্টকাল আটকে রাখতে পারেন না। আইন অনুযায়ী মজুরির মেয়াদ শেষ হওয়ার সর্বোচ্চ ৭ কার্যদিবসের মধ্যে শ্রমিকের সম্পূর্ণ মজুরি পরিশোধ করা নিয়োগদাতার আইনি বাধ্যবাধকতা।',
                  'An employer cannot withhold wages indefinitely. Under Section 123 of the Bangladesh Labour Act, wages must be paid within 7 working days after the wage period ends.'
                )}
              </p>
            </div>

            {/* Statutory Source with Verbatim Quote & Link */}
            <div className="p-3.5 rounded-2xl bg-bg-light/80 border border-border-light space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold font-display text-primary-light">
                  {t('বাংলাদেশ শ্রম আইন, ২০০৬ · ধারা ১২৩', 'Bangladesh Labour Act, 2006 · Section 123')}
                </div>
                <a
                  href="https://bdlaws.minlaw.gov.bd/act-952/section-29450.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-cinzel text-accent-light hover:underline font-bold"
                >
                  <span>BDLAWS</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-cardLight border-l-4 border-accent-light text-xs font-sans text-primary-light leading-relaxed">
                &ldquo;সেই কাল শেষ হওয়ার পরবর্তী সাত কর্মদিবসের মধ্যে তাহার মজুরী পরিশোধ করিতে হইবে।&rdquo;
              </div>
            </div>

            {/* Statutory Rights & Options */}
            <div className="space-y-1 text-xs">
              <span className="font-bold font-anek text-primary-light block">
                {t('আপনার আইনি অধিকার ও বিকল্পসমূহ:', 'Your statutory rights and options:')}
              </span>
              <ul className="space-y-1 text-[11px] text-secondary-light font-hind list-disc list-inside">
                <li>{t('বকেয়া মজুরির ১০০% বুঝে পাওয়ার অবিচ্ছেদ্য আইনগত অধিকার।', 'Right to recover 100% of unpaid wages.')}</li>
                <li>{t('কলকারখানা পরিদর্শন অধিদপ্তরে (DIFE) লিখিত অভিযোগ দাখিল।', 'Right to lodge a complaint with the regional Labour Inspector.')}</li>
              </ul>
            </div>
          </div>
        )}

        {/* STEP 3: STEP-BY-STEP ACTION CHECKLIST */}
        {activeTab === 'step3' && (
          <div className="space-y-3.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-border-light/60 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold font-anek text-primary-light">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-light text-white text-[11px]">৩</span>
                <span>{t('ধাপ ৩: ধাপে ধাপে বাস্তবসম্মত অ্যাকশন চেকলিস্ট', 'Step 3: Ordered Action Checklist')}</span>
              </div>
              <span className="text-[11px] text-accent-light font-cinzel font-bold">
                {Object.values(completedSteps).filter(Boolean).length} / 3 {t('সম্পন্ন', 'DONE')}
              </span>
            </div>

            {/* Checklist items */}
            <div className="space-y-2">
              <div
                onClick={() => toggleStep('step-1')}
                className={`flex items-start gap-3 p-2.5 sm:p-3 rounded-xl border transition-colors cursor-pointer ${
                  completedSteps['step-1']
                    ? 'bg-accent-light/10 border-accent-light/30'
                    : 'bg-bg-light/60 border-border-light'
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!completedSteps['step-1']}
                  onChange={() => toggleStep('step-1')}
                  className="mt-0.5 h-4 w-4 rounded accent-accent-light cursor-pointer"
                />
                <div className="flex-1 text-xs space-y-0.5">
                  <p className={completedSteps['step-1'] ? 'line-through opacity-75' : 'font-medium font-hind'}>
                    {t(
                      '১. নিয়োগপত্র, কাজের আইডি এবং বকেয়া মজুরির হিসাব গুছিয়ে রাখুন।',
                      '1. Gather your appointment letter, workplace ID, and calculation of unpaid wages.'
                    )}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-secondary-light">
                    <span className="bg-surface-light px-1.5 py-0.5 rounded border border-border-light">
                      {t('সহায়ক প্রমাণ', 'Helpful Evidence')}
                    </span>
                    <span>·</span>
                    <span>{t('শ্রম আইন ধারা ৫ ও ১২৩', 'Labour Act Sec 5 & 123')}</span>
                  </div>
                </div>
              </div>

              <div
                onClick={() => toggleStep('step-2')}
                className={`flex items-start gap-3 p-2.5 sm:p-3 rounded-xl border transition-colors cursor-pointer ${
                  completedSteps['step-2']
                    ? 'bg-accent-light/10 border-accent-light/30'
                    : 'bg-bg-light/60 border-border-light'
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!completedSteps['step-2']}
                  onChange={() => toggleStep('step-2')}
                  className="mt-0.5 h-4 w-4 rounded accent-accent-light cursor-pointer"
                />
                <div className="flex-1 text-xs space-y-0.5">
                  <p className={completedSteps['step-2'] ? 'line-through opacity-75' : 'font-medium font-hind'}>
                    {t(
                      '২. আইননির্ধারিত সময়সীমা (মজুরিকাল শেষের ৭ কার্যদিবস) অতিবাহিত হয়েছে কি না যাচাই করুন।',
                      '2. Verify that the statutory payment deadline (7 working days) has elapsed.'
                    )}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-secondary-light">
                    <Clock className="h-3 w-3 text-accent-light" />
                    <span>{t('ধারা ১২৩(১)', 'Section 123(1)')}</span>
                  </div>
                </div>
              </div>

              <div
                onClick={() => toggleStep('step-3')}
                className={`flex items-start gap-3 p-2.5 sm:p-3 rounded-xl border transition-colors cursor-pointer ${
                  completedSteps['step-3']
                    ? 'bg-accent-light/10 border-accent-light/30'
                    : 'bg-bg-light/60 border-border-light'
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!completedSteps['step-3']}
                  onChange={() => toggleStep('step-3')}
                  className="mt-0.5 h-4 w-4 rounded accent-accent-light cursor-pointer"
                />
                <div className="flex-1 text-xs space-y-0.5">
                  <p className={completedSteps['step-3'] ? 'line-through opacity-75' : 'font-medium font-hind'}>
                    {t(
                      '৩. কলকারখানা পরিদর্শন অধিদপ্তর (DIFE)-এর আঞ্চলিক পরিদর্শক বরাবর লিখিত অভিযোগ প্রস্তুত করুন।',
                      '3. Prepare a written complaint to the regional inspector of DIFE.'
                    )}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-secondary-light">
                    <Building className="h-3 w-3 text-accent-light" />
                    <span>{t('দপ্তর: ডিআইএফই (১৬১০৪)', 'Office: DIFE (16104)')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: OFFER TO PREPARE A FORMAL DRAFT */}
        {activeTab === 'step4' && (
          <div className="space-y-3.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-border-light/60 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold font-anek text-primary-light">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-light text-white text-[11px]">৪</span>
                <span>{t('ধাপ ৪: আনুষ্ঠানিক খসড়া প্রস্তুতের প্রস্তাব', 'Step 4: Formal Draft Preparation Offer')}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-accent-light/10 text-accent-light border border-accent-light/20 font-cinzel">
                A4 PDF READY
              </span>
            </div>

            {/* Offer Callout */}
            <div className="p-3 rounded-xl bg-accent-light/10 border border-accent-light/20 text-xs font-bold text-accent-light font-anek">
              &ldquo;{t('আপনি কি কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর (DIFE) বরাবর একটি আনুষ্ঠানিক লিখিত অভিযোগ খসড়া প্রস্তুত করতে চান?', 'Would you like to prepare a formal written complaint addressed to the DIFE Labour Inspector?')}&rdquo;
            </div>

            {/* Snippet of document */}
            <div className="p-3 rounded-xl bg-bg-light/90 border border-border-light text-[11px] font-mono space-y-1.5 leading-relaxed">
              <p className="text-secondary-light">
                {t('বরাবর: আঞ্চলিক উপ-মহাপরিদর্শক, কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর', 'To: Regional Deputy Inspector General, DIFE')}
              </p>
              <p className="font-semibold text-primary-light">
                {t('বিষয়: বকেয়া মজুরি আদায়ের জন্য লিখিত অভিযোগ।', 'Subject: Complaint for recovery of unpaid wages.')}
              </p>
              <p className="text-secondary-light text-[10px]">
                {t(
                  'আমি [আবেদনকারীর নাম]। প্রতিষ্ঠান: [কর্মস্থলের নাম]। বকেয়া মজুরি: [টাকার পরিমাণ]...',
                  'I am [Applicant Name]. Workplace: [Employer Name]. Unpaid Amount: [Amount]...'
                )}
              </p>
            </div>

            {/* Missing details note */}
            <div className="p-2.5 rounded-xl bg-surface-light border border-border-light text-[11px] font-hind text-secondary-light">
              <span className="font-bold text-primary-light">
                {t('খসড়া নিখুঁত করতে প্রয়োজনীয় তথ্য: ', 'Details needed to prepare draft: ')}
              </span>
              <span>{t('প্রতিষ্ঠানের সঠিক ঠিকানা, বকেয়া মাসের তালিকা ও টাকার পরিমাণ।', 'Employer address, list of unpaid months, and amount.')}</span>
            </div>
          </div>
        )}

        {/* Stepper Footer Action */}
        <div className="mt-4 pt-3 border-t border-border-light/70 flex items-center justify-between gap-2">
          {/* Next / Previous step controls */}
          <div className="flex items-center gap-2">
            {activeTab !== 'step4' ? (
              <button
                type="button"
                onClick={() => {
                  if (activeTab === 'step1') setActiveTab('step2');
                  else if (activeTab === 'step2') setActiveTab('step3');
                  else if (activeTab === 'step3') setActiveTab('step4');
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent-light/10 hover:bg-accent-light/20 text-accent-light text-xs font-semibold font-anek transition-all cursor-pointer"
              >
                <span>{t('পরবর্তী ধাপ দেখুন', 'Next Step')}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <Link
                href="/drafts"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-light text-white text-xs font-semibold font-anek hover:opacity-90 transition-all shadow-2xs"
              >
                <span>{t('খসড়া এডিটর খুলুন', 'Open Draft Editor')}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          <Link
            href="/ask"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-light hover:underline font-cinzel tracking-wider"
          >
            <span>{t('আপনার প্রশ্ন নিয়ে পরীক্ষা করুন', 'TRY YOUR INQUIRY')}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
