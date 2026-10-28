'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useApp } from '@/components/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Checklist } from '@/components/Checklist';
import { SourceDrawer } from '@/components/SourceDrawer';
import { OfficeModal } from '@/components/OfficeModal';
import type {
  AnswerRequest,
  AnswerResult,
  AnswerStatus,
  FactValue,
} from '@/types/contracts';
import {
  Send,
  Loader2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  FileText,
  RotateCcw,
  Sparkles,
  Info,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

function AskContent() {
  const { lang, setLang, t } = useApp();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [input, setInput] = useState('');
  const [status, setStatus] = useState<AnswerStatus>('ready');
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [selectedOfficeId, setSelectedOfficeId] = useState<string | null>(null);

  // Clarification answers
  const [clarificationAnswers, setClarificationAnswers] = useState<Record<string, string>>({});

  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Pre-fill from query parameter if present, without auto-submitting
  useEffect(() => {
    const p = searchParams.get('prompt');
    if (p && p.trim()) {
      setInput(p.trim());
    }
  }, [searchParams]);

  const exampleChips = [
    {
      label: t('বকেয়া বেতন', 'Unpaid Wages'),
      query: 'আমার মালিক গত দুই মাসের বেতন দেয়নি। এখন আমি কী করব?',
    },
    {
      label: t('হুমকি ও জিডি', 'Threat & GD'),
      query: 'ফেসবুক ও ফোনে অপরিচিত ব্যক্তি হুমকি দিচ্ছে। কীভাবে জিডি করব?',
    },
    {
      label: t('অনলাইন কেনাকাটায় প্রতারণা', 'Online Shopping Fraud'),
      query: 'অনলাইন শপে অগ্রিম টাকা দেওয়ার পরও পণ্য দেয়নি। ভোক্তা অধিকার কীভাবে পাব?',
    },
    {
      label: t('জমি ক্রয়ে খতিয়ান', 'Land Khatian Check'),
      query: 'জমি কেনার আগে বিক্রেতার নাম ও খতিয়ান যাচাইয়ের নিয়ম কী?',
    },
  ];

  const handleAsk = async (customMessage?: string, additionalFacts: FactValue[] = []) => {
    const questionToAsk = customMessage || input;
    if (!questionToAsk.trim()) return;

    setStatus('submitted');
    setErrorMsg(null);

    // Realistic state progression
    setTimeout(() => {
      setStatus('finding_sources');
    }, 400);

    try {
      const payload: Partial<AnswerRequest> = {
        requestId: crypto.randomUUID(),
        originalMessage: questionToAsk.trim(),
        language: lang,
        facts: additionalFacts,
      };

      const res = await fetch('/api/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || t('অনুরোধ সম্পন্ন করা যায়নি।', 'Request could not be processed.'));
      }

      const data: AnswerResult = await res.json();
      setResult(data);
      setStatus(data.status);
    } catch (err: any) {
      setErrorMsg(err.message || t('সার্ভার ত্রুটি। অনুগ্রহ করে আবার চেষ্টা করুন।', 'Server error. Please try again.'));
      setStatus('unavailable');
    }
  };

  const handleClarificationSubmit = () => {
    if (!result) return;
    const answeredFacts: FactValue[] = Object.entries(clarificationAnswers).map(
      ([key, val]) => ({
        fieldId: key,
        value: val,
        status: 'user_confirmed',
        provenance: 'clarification_response',
      })
    );

    handleAsk(result.userFacts.find((f) => f.fieldId === 'query')?.value || input, answeredFacts);
  };

  const handleGoToDraft = (docType: string) => {
    if (!result) return;
    // Store fact snapshot in session storage for the drafts page
    const draftPayload = {
      type: docType,
      facts: result.userFacts,
      query: input,
    };
    try {
      sessionStorage.setItem('mylaws_pending_draft', JSON.stringify(draftPayload));
    } catch {}
    router.push('/drafts');
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-light text-primary-light dark:bg-bg-dark dark:text-primary-dark transition-colors">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Workspace Title & Online Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border-light/70 dark:border-border-dark/70 gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary-light dark:text-primary-dark">
              {t('অনলাইন আইনি সহকারী', 'Online Legal Assistant')}
            </h1>
            <p className="text-xs text-secondary-light dark:text-secondary-dark mt-0.5">
              {t(
                'বাংলাদেশ কোডের গেজেটভিত্তিক তথ্য, অ্যাকশন চেকলিস্ট ও খসড়া তৈরির সহায়তা',
                'Official gazette provisions, actionable checklists, and draft preparation'
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-secondary-light dark:text-secondary-dark bg-surface-light dark:bg-surface-dark px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark">
            <Info className="h-3.5 w-3.5 text-accent-light dark:text-accent-dark" />
            <span>{t('কোনো একাউন্ট বা লগইন প্রয়োজন নেই', 'No login required')}</span>
          </div>
        </div>

        {/* Input Composer Section */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shadow-sm space-y-3">
          <label htmlFor="legal-input" className="block text-xs font-semibold text-primary-light dark:text-primary-dark">
            {t('আপনার পরিস্থিতি বা আইনি প্রশ্নটি লিখুন:', 'Describe your situation or legal question:')}
          </label>

          <div className="relative">
            <textarea
              id="legal-input"
              ref={inputRef}
              rows={3}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAsk();
                }
              }}
              placeholder={t(
                'যেমন: আমার মালিক ২ মাসের বেতন দেয়নি, কী করব? অথবা: অপরিচিত নাম্বার থেকে হুমকি পেলে জিডি কীভাবে করব?',
                'e.g. My employer hasn\'t paid my salary for 2 months, what should I do?'
              )}
              className="w-full rounded-xl border border-border-light dark:border-border-dark bg-bg-light/60 dark:bg-bg-dark/60 p-3.5 text-sm text-primary-light dark:text-primary-dark placeholder-secondary-light/60 dark:placeholder-secondary-dark/60 focus:bg-surface-light dark:focus:bg-surface-dark transition-colors resize-none"
            />
          </div>

          {/* Example Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-secondary-light dark:text-secondary-dark font-medium">
              {t('নমুনা প্রশ্ন:', 'Try an example:')}
            </span>
            {exampleChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInput(chip.query);
                  if (inputRef.current) inputRef.current.focus();
                }}
                className="text-[11px] px-2.5 py-1 rounded-full border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-secondary-light dark:text-secondary-dark hover:border-accent-light dark:hover:border-accent-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Composer Controls */}
          <div className="flex flex-wrap items-center justify-between pt-2 border-t border-border-light/40 dark:border-border-dark/40 gap-2">
            <span className="text-[11px] text-secondary-light/80 dark:text-secondary-dark/80">
              {t('Enter চাপলে উত্তর আসবে, Shift+Enter নতুন লাইনের জন্য', 'Press Enter to submit, Shift+Enter for new line')}
            </span>

            <div className="flex items-center gap-2">
              {result && (
                <button
                  type="button"
                  onClick={() => {
                    setInput('');
                    setResult(null);
                    setStatus('ready');
                  }}
                  className="px-3 py-1.5 rounded-lg border border-border-light dark:border-border-dark text-xs font-medium text-secondary-light dark:text-secondary-dark hover:bg-bg-light dark:hover:bg-bg-dark"
                >
                  {t('নতুন প্রশ্ন', 'New Query')}
                </button>
              )}

              <button
                type="button"
                disabled={status === 'submitted' || status === 'finding_sources' || !input.trim()}
                onClick={() => handleAsk()}
                className="inline-flex items-center gap-1.5 rounded-xl bg-accent-light px-5 py-2.5 text-xs font-semibold text-surface-light shadow-sm hover:bg-accent-light/90 dark:bg-accent-dark dark:text-bg-dark dark:hover:bg-accent-dark/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {status === 'submitted' || status === 'finding_sources' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t('আইন বিশ্লেষণ হচ্ছে...', 'Analyzing statutes...')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('উপদেশ ও চেকলিস্ট পান', 'Get Guidance')}</span>
                    <Send className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {errorMsg && (
          <div className="mt-6 p-4 rounded-xl border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 text-xs flex items-start gap-3">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold">{t('ত্রুটি ঘটেছে:', 'An error occurred:')}</span>
              <p>{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Result Container */}
        {result && (
          <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* Clarification Section if essential facts are missing */}
            {result.questions && result.questions.length > 0 && (
              <div className="p-5 rounded-2xl border border-accent-light/40 dark:border-accent-dark/40 bg-accent-light/5 dark:bg-accent-dark/10 space-y-4">
                <div className="flex items-center gap-2 text-accent-light dark:text-accent-dark font-bold text-xs uppercase tracking-wider">
                  <HelpCircle className="h-4 w-4" />
                  <span>{t('সঠিক আইনি ধারার জন্য কিছু তথ্য প্রয়োজন:', 'Key facts needed to confirm statutory route:')}</span>
                </div>

                <div className="space-y-3">
                  {result.questions.map((q, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <label className="block text-xs font-medium text-primary-light dark:text-primary-dark">
                        {q}
                      </label>
                      <input
                        type="text"
                        placeholder={t('এখানে উত্তর লিখুন...', 'Type answer here...')}
                        value={clarificationAnswers[`q_${idx}`] || ''}
                        onChange={(e) =>
                          setClarificationAnswers({
                            ...clarificationAnswers,
                            [`q_${idx}`]: e.target.value,
                          })
                        }
                        className="w-full text-xs rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-2 text-primary-light dark:text-primary-dark"
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleClarificationSubmit}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent-light text-surface-light dark:bg-accent-dark dark:text-bg-dark text-xs font-semibold hover:opacity-90"
                >
                  <span>{t('তথ্য আপডেট করুন', 'Update Information')}</span>
                  <RotateCcw className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Substantive Action Checklist */}
            <Checklist
              steps={result.checklist}
              onOpenSource={(srcId) => setSelectedSourceId(srcId)}
              onOpenOffice={(offId) => setSelectedOfficeId(offId)}
            />

            {/* Legal Explanation & Supporting Claims */}
            <div className="p-5 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-border-light/60 dark:border-border-dark/60 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary-light dark:text-primary-dark flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent-light dark:text-accent-dark" />
                  <span>{t('যাচাইকৃত আইনি ভিত্তি ও ব্যাখ্যা', 'Verified Statutory Basis & Explanation')}</span>
                </h3>
                <span className="text-[11px] text-secondary-light dark:text-secondary-dark">
                  {t('প্যাক সংস্করণ: ', 'Pack Version: ')}{result.sourcePackVersion}
                </span>
              </div>

              <div className="space-y-3.5">
                {result.explanation.map((claim, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <p className="text-xs sm:text-sm leading-relaxed text-primary-light dark:text-primary-dark">
                      {claim.text}
                    </p>
                    {claim.sourceIds && claim.sourceIds.length > 0 && (
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="text-[10px] text-secondary-light dark:text-secondary-dark font-medium">
                          {t('উৎস ধারা: ', 'Cited Section: ')}
                        </span>
                        {claim.sourceIds.map((sid) => (
                          <button
                            key={sid}
                            onClick={() => setSelectedSourceId(sid)}
                            className="text-[10px] px-2 py-0.5 rounded bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark hover:underline font-medium"
                          >
                            {sid}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Limitations note */}
              {result.limitations && result.limitations.length > 0 && (
                <div className="pt-3 border-t border-border-light/40 dark:border-border-dark/40 text-[11px] text-secondary-light dark:text-secondary-dark space-y-1">
                  <span className="font-semibold text-primary-light dark:text-primary-dark">
                    {t('সীমাবদ্ধতা ও আইনি সতর্কতা: ', 'Statutory Boundaries: ')}
                  </span>
                  <ul className="list-disc list-inside space-y-0.5">
                    {result.limitations.map((lim, i) => (
                      <li key={i}>{lim}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Draft Preparation Action Banner */}
            {result.allowedDraftOptions && result.allowedDraftOptions.length > 0 && (
              <div className="p-6 rounded-2xl border-2 border-accent-light/30 dark:border-accent-dark/30 bg-accent-light/5 dark:bg-accent-dark/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <FileText className="h-5 w-5 text-accent-light dark:text-accent-dark" />
                    <h3 className="text-sm font-bold text-primary-light dark:text-primary-dark">
                      {t('এই ঘটনার ভিত্তিতে খসড়া আবেদন তৈরি করুন', 'Prepare a formal draft from this incident')}
                    </h3>
                  </div>
                  <p className="text-xs text-secondary-light dark:text-secondary-dark max-w-md">
                    {result.allowedDraftOptions.includes('dife')
                      ? t(
                          'শ্রম পরিদর্শক বরাবর বকেয়া মজুরি আদায়ের লিখিত অভিযোগের খসড়া তৈরি করুন এবং A4 PDF ডাউনলোড করুন।',
                          'Create a structured written complaint to the labour inspector with full A4 PDF export.'
                        )
                      : t(
                          'সংশ্লিষ্ট থানা বরাবর সাধারণ ডায়েরির (GD) খসড়া তৈরি করুন এবং A4 PDF ডাউনলোড করুন।',
                          'Create an organized General Diary (GD) draft addressed to the police with full A4 PDF export.'
                        )}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {result.allowedDraftOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleGoToDraft(opt)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-light text-surface-light dark:bg-accent-dark dark:text-bg-dark text-xs font-semibold shadow hover:opacity-90 transition-all hover:scale-[1.02]"
                    >
                      <span>
                        {opt === 'dife'
                          ? t('ডিআইএফই অভিযোগ প্রস্তুত করুন', 'Prepare DIFE Complaint')
                          : t('জিডি খসড়া প্রস্তুত করুন', 'Prepare GD Draft')}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Source Modal */}
      <SourceDrawer
        sourceId={selectedSourceId}
        onClose={() => setSelectedSourceId(null)}
      />

      {/* Office Modal */}
      <OfficeModal
        officeId={selectedOfficeId}
        onClose={() => setSelectedOfficeId(null)}
      />

      <Footer />
    </div>
  );
}

export default function AskPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark text-secondary-light">
        <Loader2 className="h-6 w-6 animate-spin text-accent-light dark:text-accent-dark" />
      </div>
    }>
      <AskContent />
    </Suspense>
  );
}
