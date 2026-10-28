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
} from 'lucide-react';
import Link from 'next/link';

export function CasePreview() {
  const { lang, t } = useApp();
  const [activeTab, setActiveTab] = useState<'steps' | 'source' | 'draft'>('steps');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    'step-1': true,
  });

  const toggleStep = (id: string) => {
    setCompletedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative rounded-2xl border border-border-light dark:border-border-dark bg-surface-cardLight dark:bg-surface-cardDark p-1.5 sm:p-2.5 shadow-2xl transition-all">
      {/* Folder Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-border-light/80 dark:border-border-dark/80 px-4 py-3 bg-bg-light/60 dark:bg-bg-dark/60 rounded-t-xl gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent-light dark:bg-accent-dark inline-block shadow-sm" />
          <span className="font-cinzel text-xs font-semibold tracking-wider text-secondary-light dark:text-accent-dark/90">
            {t('কেস ফোল্ডার #BD-2026-09', 'CASE FOLDER #BD-2026-09')}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-accent-light dark:text-accent-dark font-medium bg-accent-light/10 dark:bg-accent-dark/15 px-2.5 py-0.5 rounded border border-accent-light/20 dark:border-accent-dark/30">
          <Shield className="h-3 w-3" />
          <span>{t('শ্রম আইন ২০০৬ সমর্থিত', 'Labour Act 2006 Verified')}</span>
        </div>
      </div>

      {/* Case Situation Banner */}
      <div className="px-4 py-3 bg-accent-light/5 dark:bg-accent-dark/5 border-b border-border-light/60 dark:border-border-dark/60">
        <p className="text-xs text-secondary-light dark:text-secondary-dark font-sans leading-relaxed">
          <span className="font-semibold text-primary-light dark:text-primary-dark">
            {t('বর্ণিত সমস্যা: ', 'User Description: ')}
          </span>
          &ldquo;{t('আমার মালিক গত দুই মাসের বেতন দেয়নি। এখন আমি কী করতে পারি?', 'My employer has not paid my salary for two months. What can I do now?')}&rdquo;
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-border-light/80 dark:border-border-dark/80 px-4 bg-surface-light dark:bg-surface-dark overflow-x-auto">
        <button
          onClick={() => setActiveTab('steps')}
          className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-medium border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'steps'
              ? 'border-accent-light text-accent-light dark:border-accent-dark dark:text-accent-dark font-semibold'
              : 'border-transparent text-secondary-light hover:text-primary-light dark:text-secondary-dark dark:hover:text-primary-dark'
          }`}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>{t('পরবর্তী পদক্ষেপ', 'Action Checklist')}</span>
        </button>
        <button
          onClick={() => setActiveTab('source')}
          className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-medium border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'source'
              ? 'border-accent-light text-accent-light dark:border-accent-dark dark:text-accent-dark font-semibold'
              : 'border-transparent text-secondary-light hover:text-primary-light dark:text-secondary-dark dark:hover:text-primary-dark'
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>{t('মূল আইনি উৎস', 'Statutory Source')}</span>
        </button>
        <button
          onClick={() => setActiveTab('draft')}
          className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-medium border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'draft'
              ? 'border-accent-light text-accent-light dark:border-accent-dark dark:text-accent-dark font-semibold'
              : 'border-transparent text-secondary-light hover:text-primary-light dark:text-secondary-dark dark:hover:text-primary-dark'
          }`}
        >
          <FileText className="h-3.5 w-3.5" />
          <span>{t('খসড়া অভিযোগ', 'Prepared Draft')}</span>
        </button>
      </div>

      {/* Tab Body */}
      <div className="p-4 sm:p-5 min-h-[300px] flex flex-col justify-between">
        {activeTab === 'steps' && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs font-semibold text-primary-light dark:text-primary-dark">
              <span>{t('আপনি এখন যা করতে পারেন:', 'What you can do now:')}</span>
              <span className="text-[11px] text-accent-light dark:text-accent-dark font-cinzel">
                {t('৩টি পদক্ষেপ', '3 STEPS')}
              </span>
            </div>

            {/* Checklist items */}
            <div className="space-y-2.5">
              <div
                onClick={() => toggleStep('step-1')}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-colors cursor-pointer ${
                  completedSteps['step-1']
                    ? 'bg-accent-light/10 border-accent-light/30 dark:bg-accent-dark/15 dark:border-accent-dark/30'
                    : 'bg-bg-light/60 border-border-light dark:bg-bg-dark/60 dark:border-border-dark'
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!completedSteps['step-1']}
                  onChange={() => toggleStep('step-1')}
                  className="mt-0.5 h-4 w-4 rounded accent-accent-light dark:accent-accent-dark cursor-pointer"
                />
                <div className="flex-1 text-xs space-y-1">
                  <p className={completedSteps['step-1'] ? 'line-through opacity-75' : 'font-medium'}>
                    {t(
                      '১. নিয়োগপত্র, কাজের আইডি এবং বকেয়া মজুরির হিসাব গুছিয়ে রাখুন।',
                      '1. Gather your appointment letter, workplace ID, and calculation of unpaid wages.'
                    )}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-secondary-light dark:text-secondary-dark">
                    <span className="bg-surface-light dark:bg-surface-dark px-1.5 py-0.5 rounded border border-border-light dark:border-border-dark">
                      {t('সহায়ক প্রমাণ', 'Helpful Evidence')}
                    </span>
                    <span>·</span>
                    <span>{t('শ্রম আইন ধারা ৫ ও ১২৩', 'Labour Act Sec 5 & 123')}</span>
                  </div>
                </div>
              </div>

              <div
                onClick={() => toggleStep('step-2')}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-colors cursor-pointer ${
                  completedSteps['step-2']
                    ? 'bg-accent-light/10 border-accent-light/30 dark:bg-accent-dark/15 dark:border-accent-dark/30'
                    : 'bg-bg-light/60 border-border-light dark:bg-bg-dark/60 dark:border-border-dark'
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!completedSteps['step-2']}
                  onChange={() => toggleStep('step-2')}
                  className="mt-0.5 h-4 w-4 rounded accent-accent-light dark:accent-accent-dark cursor-pointer"
                />
                <div className="flex-1 text-xs space-y-1">
                  <p className={completedSteps['step-2'] ? 'line-through opacity-75' : 'font-medium'}>
                    {t(
                      '২. আইননির্ধারিত সময়সীমা (মজুরিকাল শেষের ৭ কার্যদিবস) অতিবাহিত হয়েছে কি না যাচাই করুন।',
                      '2. Verify that the statutory payment deadline (7 working days) has elapsed.'
                    )}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-secondary-light dark:text-secondary-dark">
                    <Clock className="h-3 w-3 text-accent-light dark:text-accent-dark" />
                    <span>{t('ধারা ১২৩(১)', 'Section 123(1)')}</span>
                  </div>
                </div>
              </div>

              <div
                onClick={() => toggleStep('step-3')}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-colors cursor-pointer ${
                  completedSteps['step-3']
                    ? 'bg-accent-light/10 border-accent-light/30 dark:bg-accent-dark/15 dark:border-accent-dark/30'
                    : 'bg-bg-light/60 border-border-light dark:bg-bg-dark/60 dark:border-border-dark'
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!completedSteps['step-3']}
                  onChange={() => toggleStep('step-3')}
                  className="mt-0.5 h-4 w-4 rounded accent-accent-light dark:accent-accent-dark cursor-pointer"
                />
                <div className="flex-1 text-xs space-y-1">
                  <p className={completedSteps['step-3'] ? 'line-through opacity-75' : 'font-medium'}>
                    {t(
                      '৩. কলকারখানা পরিদর্শন অধিদপ্তর (DIFE)-এর আঞ্চলিক পরিদর্শক বরাবর লিখিত অভিযোগ প্রস্তুত করুন।',
                      '3. Prepare a written complaint to the regional inspector of DIFE.'
                    )}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-secondary-light dark:text-secondary-dark">
                    <Building className="h-3 w-3 text-accent-light dark:text-accent-dark" />
                    <span>{t('দপ্তর: ডিআইএফই (১৬১০৪)', 'Office: DIFE (16104)')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'source' && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold font-display text-primary-light dark:text-accent-dark">
                  {t('বাংলাদেশ শ্রম আইন, ২০০৬ · ধারা ১২৩', 'Bangladesh Labour Act, 2006 · Section 123')}
                </h4>
                <p className="text-[11px] text-secondary-light dark:text-secondary-dark">
                  {t('মজুরি পরিশোধের সময়সীমা', 'Time for payment of wages')}
                </p>
              </div>
              <a
                href="https://bdlaws.minlaw.gov.bd/act-952/section-29450.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-cinzel text-accent-light dark:text-accent-dark hover:underline"
              >
                <span>BDLAWS</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Verbatim quote */}
            <div className="p-3.5 rounded-xl bg-bg-light/80 dark:bg-bg-dark/80 border-l-4 border-accent-light dark:border-accent-dark text-xs italic font-serif leading-relaxed text-primary-light dark:text-primary-dark">
              &ldquo;সেই কাল শেষ হওয়ার পরবর্তী সাত কর্মদিবসের মধ্যে তাহার মজুরী পরিশোধ করিতে হইবে।&rdquo;
            </div>

            {/* Plain-language explanation */}
            <div className="text-xs text-secondary-light dark:text-secondary-dark space-y-1">
              <p className="font-semibold text-primary-light dark:text-primary-dark">
                {t('সহজ ব্যাখ্যা:', 'Plain Explanation:')}
              </p>
              <p className="leading-relaxed">
                {t(
                  'এই আইনের আওতাভুক্ত শ্রমিকের নিয়মিত মজুরি মজুরিকাল শেষ হওয়ার পর সর্বোচ্চ ৭ কার্যদিবসের মধ্যে প্রদান করা বাধ্যতামূলক। চাকরি অবসানের ক্ষেত্রে ৩০ কার্যদিবসের বিধান রয়েছে।',
                  'For workers covered by this Act, regular wages must be disbursed within seven working days after the wage period ends (or thirty working days upon termination).'
                )}
              </p>
            </div>

            <div className="text-[10px] text-secondary-light/80 dark:text-secondary-dark/80 border-t border-border-light/60 dark:border-border-dark/60 pt-2 font-cinzel">
              {t(
                'উৎস পরিদর্শন: ২৬ অক্টোবর ২০২৬ · অফিসিয়াল গেজেট',
                'SOURCE CONSULTED: 26 OCTOBER 2026 · OFFICIAL GAZETTE'
              )}
            </div>
          </div>
        )}

        {activeTab === 'draft' && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold font-display text-primary-light dark:text-accent-dark">
                  {t('DIFE-তে লিখিত অভিযোগ — খসড়া', 'Written Complaint to DIFE — Draft')}
                </h4>
                <p className="text-[11px] text-secondary-light dark:text-secondary-dark">
                  {t('প্রমিত ফরম্যাট / A4 প্রিন্ট উপযোগী', 'Standardized Format / A4 Print Ready')}
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark border border-accent-light/20 dark:border-accent-dark/30 font-cinzel">
                {t('EDITABLE', 'EDITABLE')}
              </span>
            </div>

            {/* Snippet of document */}
            <div className="p-3.5 rounded-xl bg-bg-light/80 dark:bg-bg-dark/80 border border-border-light dark:border-border-dark text-[11px] font-mono space-y-2 leading-relaxed">
              <p className="text-secondary-light dark:text-secondary-dark">
                {t('বরাবর: আঞ্চলিক উপ-মহাপরিদর্শক, কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর', 'To: Regional Deputy Inspector General, DIFE')}
              </p>
              <p className="font-semibold text-primary-light dark:text-accent-dark">
                {t('বিষয়: বকেয়া মজুরি আদায়ের জন্য লিখিত অভিযোগ।', 'Subject: Complaint for recovery of unpaid wages.')}
              </p>
              <p className="text-secondary-light dark:text-secondary-dark">
                {t(
                  'আমি [আবেদনকারীর নাম লিখুন]। প্রতিষ্ঠান: [কর্মস্থলের নাম]। বকেয়া মজুরি: [টাকার পরিমাণ]।',
                  'I am [Applicant Name]. Workplace: [Employer Name]. Unpaid Amount: [Amount].'
                )}
              </p>
            </div>

            <p className="text-[11px] text-secondary-light dark:text-secondary-dark">
              {t(
                'অনলাইনে আপনার তথ্য পূরণ করুন, প্রিন্ট করুন বা সরাসরি পিডিএফ (PDF) ডাউনলোড করুন।',
                'Fill in your details online, print directly, or export as a clean A4 PDF.'
              )}
            </p>
          </div>
        )}

        {/* Footer Action */}
        <div className="mt-4 pt-3 border-t border-border-light/70 dark:border-border-dark/70 flex items-center justify-between">
          <Link
            href="/ask"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-light dark:text-accent-dark hover:underline font-cinzel tracking-wider"
          >
            <span>{t('এই প্রশ্ন দিয়ে শুরু করুন', 'TRY THIS IN ASSISTANT')}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <span className="text-[10px] text-secondary-light dark:text-secondary-dark">
            {t('কোনো সাইন-আপ নেই', 'No sign-up required')}
          </span>
        </div>
      </div>
    </div>
  );
}
