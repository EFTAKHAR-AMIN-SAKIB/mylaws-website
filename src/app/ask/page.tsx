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
  CheckCircle2,
  BookOpen,
  MessageSquare,
  ListOrdered,
  Check,
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
  const [draftDeclined, setDraftDeclined] = useState<boolean>(false);

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
    <div className="min-h-screen flex flex-col bg-bg-light text-primary-light transition-colors bg-parchment-grid">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Workspace Title & Online Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border-light dark:border-border-dark gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t('আইনি অনুসন্ধান ও সমাধান', 'Legal Inquiry & Resolution')}</span>
            </div>
            <h1 className="font-anek text-2xl sm:text-3xl font-extrabold tracking-tight text-primary-light">
              {t('অনলাইন আইনি সহকারী', 'Online Legal Assistant')}
            </h1>
            <p className="font-hind text-xs sm:text-sm text-secondary-light mt-1">
              {t(
                'বাংলাদেশ কোডের গেজেটভিত্তিক তথ্য, অ্যাকশন চেকলিস্ট ও খসড়া তৈরির সহায়তা',
                'Official gazette provisions, actionable checklists, and draft preparation'
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-secondary-light bg-surface-light px-3 py-1.5 rounded-lg border border-border-light self-start sm:self-auto shadow-2xs">
            <Info className="h-3.5 w-3.5 text-accent-light" />
            <span className="font-hind">{t('কোনো একাউন্ট বা লগইন প্রয়োজন নেই', 'No login required')}</span>
          </div>
        </div>

        {/* Input Composer Section */}
        <div className="mt-6 p-4 sm:p-6 rounded-2xl border border-border-light bg-surface-light shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="legal-input" className="block text-xs font-hind font-bold tracking-wide uppercase text-primary-light">
              {t('আপনার পরিস্থিতি বা আইনি প্রশ্নটি লিখুন:', 'Describe your situation or legal question:')}
            </label>
            <span className="text-[11px] font-hind text-secondary-light hidden sm:inline">
              {t('গোপনীয় ও নিরাপদ · ব্রাউজারের বাইরে তথ্য সংরক্ষিত হয় না', 'Private & Secure · No browser tracking')}
            </span>
          </div>

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
              className="w-full rounded-xl border border-border-light dark:border-border-dark bg-bg-light/60 dark:bg-bg-dark/60 p-3.5 text-sm text-primary-light dark:text-primary-dark placeholder-secondary-light/60 dark:placeholder-secondary-dark/60 focus:bg-surface-light dark:focus:bg-surface-dark transition-colors resize-none focus:outline-none focus:ring-1 focus:ring-accent-light dark:focus:ring-accent-dark"
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
                className="text-[11px] px-3 py-1.5 rounded-full border border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark text-secondary-light dark:text-secondary-dark hover:border-accent-light dark:hover:border-accent-dark hover:text-accent-light dark:hover:text-accent-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-all"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Composer Controls */}
          <div className="flex flex-wrap items-center justify-between pt-3 border-t border-border-light/60 dark:border-border-dark/60 gap-3">
            <span className="text-[11px] text-secondary-light/80 dark:text-secondary-dark/80">
              {t('Enter চাপলে উত্তর আসবে, Shift+Enter নতুন লাইনের জন্য', 'Press Enter to submit, Shift+Enter for new line')}
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {result && (
                <button
                  type="button"
                  onClick={() => {
                    setInput('');
                    setResult(null);
                    setStatus('ready');
                  }}
                  className="px-3.5 py-2 rounded-lg border border-border-light dark:border-border-dark text-xs font-medium text-secondary-light dark:text-secondary-dark hover:bg-bg-light dark:hover:bg-bg-dark transition-colors"
                >
                  {t('নতুন প্রশ্ন', 'New Query')}
                </button>
              )}

              <button
                type="button"
                disabled={status === 'submitted' || status === 'finding_sources' || !input.trim()}
                onClick={() => handleAsk()}
                className="bracket-btn inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-cinzel font-bold tracking-wider disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full sm:w-auto"
              >
                {status === 'submitted' || status === 'finding_sources' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t('আইন বিশ্লেষণ হচ্ছে...', 'Analyzing statutes...')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('আইনি অনুসন্ধান চালান', 'Submit Legal Inquiry')}</span>
                    <Send className="h-3.5 w-3.5 ml-1" />
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

        {/* Result Container: 4 Clear Canonical Steps */}
        {result && (
          <div className="mt-8 space-y-7 animate-in fade-in slide-in-from-bottom-2 duration-200">
            
            {/* ========================================================
                STEP 1: UNDERSTAND THE USER'S PROBLEM
                ======================================================== */}
            <div className="p-6 sm:p-7 rounded-3xl border border-border-light bg-surface-cardLight shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-light/60 pb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
                  <MessageSquare className="h-4 w-4" />
                  <span className="font-cinzel tracking-wider uppercase font-bold text-[11px]">
                    {t('ধাপ ০১ · সমস্যার বিশ্লেষণ ও অনুধাবন', 'STEP 1 · UNDERSTAND THE PROBLEM')}
                  </span>
                </div>
                {result.problemSummary?.identifiedIssue && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-accent-light/10 text-accent-light border border-accent-light/20 font-hind">
                    {result.problemSummary.identifiedIssue}
                  </span>
                )}
              </div>

              {/* Natural Empathetic Understanding Text */}
              <p className="font-hind text-sm sm:text-base leading-relaxed text-[#231F1C] font-medium">
                {result.problemSummary?.understanding || result.explanation[0]?.text}
              </p>

              {/* Additional facts needed (Clarification Inputs) */}
              {result.questions && result.questions.length > 0 && (
                <div className="mt-4 p-4 rounded-2xl border border-accent-light/30 bg-[#F1EDE1]/60 space-y-3">
                  <div className="flex items-center gap-2 text-accent-light font-bold text-xs uppercase tracking-wider">
                    <HelpCircle className="h-4 w-4" />
                    <span>{t('পরিস্থিতিটি আরও নিখুঁত করার জন্য অতিরিক্ত তথ্য (ঐচ্ছিক):', 'Additional details to confirm exact jurisdiction (Optional):')}</span>
                  </div>

                  <div className="space-y-3">
                    {result.questions.map((q, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <label className="block text-xs font-medium text-primary-light">
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
                          className="w-full text-xs rounded-lg border border-border-light bg-surface-light p-2.5 text-primary-light focus:outline-none focus:ring-1 focus:ring-accent-light"
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleClarificationSubmit}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent-light text-surface-light text-xs font-semibold hover:opacity-90 transition-all cursor-pointer"
                  >
                    <span>{t('তথ্য আপডেট করুন', 'Update Information')}</span>
                    <RotateCcw className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* ========================================================
                STEP 2: EXPLAIN THE SITUATION IN SIMPLE LANGUAGE & LEGAL SOURCES
                ======================================================== */}
            <div className="p-6 sm:p-7 rounded-3xl border border-border-light bg-surface-cardLight shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-border-light/60 pb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
                  <BookOpen className="h-4 w-4" />
                  <span className="font-cinzel tracking-wider uppercase font-bold text-[11px]">
                    {t('ধাপ ০২ · সহজ ভাষায় পরিস্থিতি ও অধিকার ব্যাখ্যা', 'STEP 2 · EXPLAIN IN SIMPLE LANGUAGE')}
                  </span>
                </div>
                <span className="text-[11px] font-cinzel text-secondary-light">
                  {t('প্যাক সংস্করণ: ', 'Corpus: ')}{result.sourcePackVersion}
                </span>
              </div>

              {/* Plain Language Meaning */}
              <div className="space-y-2">
                <h4 className="font-anek text-sm sm:text-base font-bold text-[#231F1C]">
                  {t('সহজ ভাষায় আপনার পরিস্থিতি:', 'What this means in plain language:')}
                </h4>
                <p className="font-hind text-xs sm:text-sm text-[#5A534A] leading-relaxed">
                  {result.plainLanguageExplanation?.meaning ||
                    result.explanation.map((c) => c.text).join(' ')}
                </p>
              </div>

              {/* Your Rights & Options */}
              {result.plainLanguageExplanation?.userRightsAndOptions && (
                <div className="space-y-2 pt-2 border-t border-border-light/60">
                  <h4 className="font-anek text-sm sm:text-base font-bold text-[#231F1C]">
                    {t('আপনার আইনগত অধিকার ও বিকল্পসমূহ:', 'Your legal rights and options:')}
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#5A534A] font-hind">
                    {result.plainLanguageExplanation.userRightsAndOptions.map((opt, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                        <span>{opt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Next Steps Guidance */}
              {result.plainLanguageExplanation?.whatToDoNext && (
                <div className="p-3.5 rounded-xl border border-border-light bg-[#F1EDE1]/50 text-xs sm:text-sm text-[#5A534A] font-hind flex items-start gap-2.5">
                  <Info className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                  <p>{result.plainLanguageExplanation.whatToDoNext}</p>
                </div>
              )}

              {/* Naturally Embedded Legal Sources & Citations */}
              <div className="pt-2 border-t border-border-light/60 space-y-2">
                <span className="font-cinzel text-[11px] font-bold text-secondary-light uppercase tracking-wider block">
                  {t('প্রাসঙ্গিক আইনি বিধান ও অফিশিয়াল গেজেট উৎস:', 'RELEVANT LEGAL SOURCES & GAZETTE PROVISIONS:')}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {result.explanation.flatMap((c) => c.sourceIds || []).filter((v, i, a) => a.indexOf(v) === i).map((sid) => (
                    <button
                      key={sid}
                      onClick={() => setSelectedSourceId(sid)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-light bg-surface-light text-xs font-semibold text-accent-light hover:border-accent-light transition-all shadow-2xs cursor-pointer"
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>{sid}</span>
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Limitations note */}
              {result.limitations && result.limitations.length > 0 && (
                <div className="pt-2 text-[11px] text-secondary-light/90 space-y-1">
                  <span className="font-semibold text-primary-light">
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

            {/* ========================================================
                STEP 3: STEP-BY-STEP ACTION CHECKLIST
                ======================================================== */}
            <div className="p-6 sm:p-7 rounded-3xl border border-border-light bg-surface-cardLight shadow-sm space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light mb-1">
                <ListOrdered className="h-4 w-4" />
                <span className="font-cinzel tracking-wider uppercase font-bold text-[11px]">
                  {t('ধাপ ০৩ · ধাপে ধাপে ব্যবহারিক চেকলিস্ট', 'STEP 3 · ACTION CHECKLIST')}
                </span>
              </div>

              <Checklist
                steps={result.checklist}
                onOpenSource={(srcId) => setSelectedSourceId(srcId)}
                onOpenOffice={(offId) => setSelectedOfficeId(offId)}
              />
            </div>

            {/* ========================================================
                STEP 4: OFFER TO PREPARE A FORMAL DRAFT
                ======================================================== */}
            <div className="p-7 sm:p-8 rounded-3xl border-2 border-accent-light/40 bg-accent-light/5 shadow-md space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/15 text-accent-light">
                  <FileText className="h-4 w-4" />
                  <span className="font-cinzel tracking-wider uppercase font-bold text-[11px]">
                    {t('ধাপ ০৪ · আনুষ্ঠানিক খসড়া প্রস্তুতের প্রস্তাব', 'STEP 4 · FORMAL DRAFT OFFER')}
                  </span>
                </div>
                <span className="text-xs font-cinzel font-bold text-accent-light">
                  {t('ঐচ্ছিক পরবর্তী পদক্ষেপ', 'OPTIONAL NEXT STEP')}
                </span>
              </div>

              {/* Conversational Prompt */}
              <div className="space-y-2">
                <h3 className="font-anek text-xl sm:text-2xl font-extrabold text-[#231F1C] tracking-tight">
                  “{result.draftOffer?.prompt || t('আপনি কি এই ঘটনার ভিত্তিতে একটি আনুষ্ঠানিক খসড়া আবেদন প্রস্তুত করতে চান?', 'Would you like to prepare a formal draft based on this incident?')}”
                </h3>
                <p className="font-hind text-xs sm:text-sm text-[#5A534A] leading-relaxed max-w-2xl">
                  {result.draftOffer?.description ||
                    t(
                      'MyLaws আপনার নিশ্চিত তথ্যের ভিত্তিতে সংশ্লিষ্ট কর্তৃপক্ষ বরাবর একটি প্রমিত আবেদনপত্র তৈরি করে দেবে। ব্রাউজারেই বাংলায় সম্পাদনা করে প্রিন্ট-রেডি A4 PDF ডাউনলোড করতে পারবেন।',
                      'MyLaws will prepare a formal application draft for the relevant authority. You can edit in Bangla and export a print-ready A4 PDF.'
                    )}
                </p>
              </div>

              {/* Missing Details Notice */}
              {result.draftOffer?.missingDetails && result.draftOffer.missingDetails.length > 0 && !draftDeclined && (
                <div className="p-3.5 rounded-xl border border-border-light bg-surface-light text-xs text-[#5A534A] font-hind space-y-1">
                  <span className="font-semibold text-primary-light">
                    {t('খসড়াটি পূর্ণাঙ্গ করতে এই তথ্যগুলো ব্যবহার করা হবে:', 'Details that will be filled in the draft:')}
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {result.draftOffer.missingDetails.map((det, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-[#F1EDE1] border border-border-light text-[11px] text-primary-light">
                        {det}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive User Choices */}
              {!draftDeclined ? (
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => handleGoToDraft(result.draftOffer?.documentType || result.allowedDraftOptions[0] || 'gd')}
                    className="bracket-btn text-xs font-bold tracking-wider py-3 px-6 shadow-sm cursor-pointer"
                  >
                    <span>
                      — {t('হ্যাঁ, খসড়া আবেদন তৈরি করুন', 'YES, PREPARE FORMAL DRAFT')} —
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDraftDeclined(true)}
                    className="px-4 py-2.5 rounded-lg border border-border-light bg-surface-light text-xs font-medium text-secondary-light hover:text-primary-light transition-all cursor-pointer"
                  >
                    {t('না, আমি শুধু তথ্য দেখতে চেয়েছিলাম', 'No, I just needed information')}
                  </button>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-accent-light/10 text-accent-light text-xs font-hind flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0" />
                  <span>
                    {t(
                      'ধন্যবাদ! আপনি যেকোনো সময় পরবর্তীতে শীর্ষ নেভিগেশনের "খসড়া" মেন্যু থেকে আবেদন তৈরি করতে পারবেন।',
                      'Thank you! You can prepare a draft at any time from the "Drafts" navigation menu.'
                    )}
                  </span>
                </div>
              )}
            </div>

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
