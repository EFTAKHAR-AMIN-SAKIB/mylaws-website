'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useApp } from '@/components/AppContext';
import { useAuth } from '@/components/AuthContext';
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
  ClarificationQuestion,
  ChatHistoryMessage,
} from '@/types/contracts';
import type { SavedUserQuery } from '@/lib/userDb';
import { detectInputLanguage } from '@/lib/followup';
import { provisions } from '@/data/legal';
import {
  Send,
  Loader2,
  AlertCircle,
  HelpCircle,
  Shield,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Info,
  ArrowRight,
  BookOpen,
  ListOrdered,
  Cpu,
  BookmarkCheck,
  FileText,
  History,
  X,
  Lock,
  Clock,
  User,
  MessageSquare,
  CornerDownRight,
  CheckCircle2,
  ArrowUp,
  ChevronDown,
  Plus,
  Scale,
} from 'lucide-react';

function getSourceLabel(sid: string, currentLang: 'en' | 'bn'): string {
  const prov = provisions.find((p) => p.id === sid);
  if (prov) {
    const actName = currentLang === 'bn' ? prov.act.bn : prov.act.en;
    const shortAct = actName.split(',')[0].split('(')[0].trim();
    const sec = prov.section ? `(${prov.section})` : '';
    return `${shortAct} ${sec}`.trim();
  }
  return sid;
}

export interface ChatTurn {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  result?: AnswerResult;
  error?: string;
}

function AskContent() {
  const { lang, setLang, t } = useApp();
  const { user, quota, setQuota, openAuthModal, getIdToken } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Chat message stream
  const [chatTurns, setChatTurns] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<AnswerStatus>('ready');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [selectedOfficeId, setSelectedOfficeId] = useState<string | null>(null);

  // History state
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyItems, setHistoryItems] = useState<SavedUserQuery[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Clarification answers keyed by fieldId
  const [clarificationAnswers, setClarificationAnswers] = useState<Record<string, string>>({});
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const topInputRef = useRef<HTMLTextAreaElement>(null);
  const bottomInputRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const activeRequestIdRef = useRef<string | null>(null);
  const prevLangRef = useRef(lang);

  // Auto-resize textarea helper
  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  };

  // Monitor scroll for the floating "scroll to bottom" button (Claude Style)
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      setShowScrollBottom(distanceFromBottom > 180 && chatTurns.length > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chatTurns.length]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Dynamic time-of-day greeting (Claude Style)
  const getGreeting = () => {
    const hour = new Date().getHours();
    const rawName = user?.displayName || '';
    const firstName = rawName.split(' ')[0] || (user?.email ? user.email.split('@')[0] : '');

    if (lang === 'bn') {
      if (hour >= 5 && hour < 12) return `শুভ সকাল${firstName ? ', ' + firstName : ''}`;
      if (hour >= 12 && hour < 17) return `শুভ দুপুর${firstName ? ', ' + firstName : ''}`;
      if (hour >= 17 && hour < 22) return `শুভ সন্ধ্যা${firstName ? ', ' + firstName : ''}`;
      return `স্বাগতম${firstName ? ', ' + firstName : ''}`;
    } else {
      if (hour >= 5 && hour < 12) return `Good morning${firstName ? ', ' + firstName : ''}`;
      if (hour >= 12 && hour < 17) return `Good afternoon${firstName ? ', ' + firstName : ''}`;
      if (hour >= 17 && hour < 22) return `Good evening${firstName ? ', ' + firstName : ''}`;
      return `Welcome${firstName ? ', ' + firstName : ''}`;
    }
  };

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Pre-fill from query parameter if present, without auto-submitting
  useEffect(() => {
    const p = searchParams.get('prompt');
    if (p && p.trim()) {
      setInput(p.trim());
    }
  }, [searchParams]);

  // Smooth scroll to bottom whenever a new turn is added or status changes
  useEffect(() => {
    if (chatTurns.length > 0) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatTurns, status]);

  // Load user query history from Cloudflare D1
  const fetchHistory = async () => {
    if (!user) {
      openAuthModal('login', t('পূর্ববর্তী প্রশ্ন দেখতে সাইন ইন করুন।', 'Please sign in to view your question history.'));
      return;
    }
    setHistoryLoading(true);
    setHistoryOpen(true);
    try {
      const token = await getIdToken();
      if (!token) return;
      const res = await fetch('/api/user/history', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setHistoryItems(data.history || []);
      }
    } catch (err) {
      console.warn('Failed to load history:', err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const exampleChips = [
    {
      label: t('বকেয়া বেতন', 'Unpaid Wages'),
      query: 'আমার মালিক গত দুই মাসের বেতন দেয়নি। এখন আমি কী করব?',
    },
    {
      label: t('ছুরি দিয়ে আঘাত / মারধর', 'Knife Assault & Hurt'),
      query: 'কালকে রাতে রাস্তা দিয়ে যাওয়ার সময় একজন আমাকে ছুরি দিয়ে আঘাত করেছে, এখন আমি কী করতে পারি?',
    },
    {
      label: t('মোবাইল ফোন চুরি', 'Mobile Phone Theft'),
      query: 'আজ সকাল ৯:৪৫ এ আমার মোবাইল ফোন চুরি হয়েছে, কীভাবে জিডি করব?',
    },
    {
      label: t('অনলাইন শপিং প্রতারণা', 'Online Shopping Fraud'),
      query: 'অনলাইন শপে অগ্রিম টাকা দেওয়ার পরও পণ্য দেয়নি। ভোক্তা অধিকার কীভাবে পাব?',
    },
  ];

  const handleClearCase = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setChatTurns([]);
    setInput('');
    setStatus('ready');
    setErrorMsg(null);
    setClarificationAnswers({});
    try {
      sessionStorage.removeItem('mylaws_pending_draft');
    } catch {}
    if (topInputRef.current) {
      topInputRef.current.style.height = 'auto';
      topInputRef.current.focus();
    }
    if (bottomInputRef.current) {
      bottomInputRef.current.style.height = 'auto';
    }
  };

  const handleAsk = async (
    customMessage?: string,
    additionalFacts: FactValue[] = [],
    overrideLang?: 'bn' | 'en'
  ) => {
    const questionToAsk = customMessage || input;
    if (!questionToAsk.trim()) return;

    // Check user authentication first
    const token = await getIdToken();
    if (!token) {
      router.push(`/login?redirect=/ask&prompt=${encodeURIComponent(questionToAsk.trim())}`);
      return;
    }

    // Detect query language intelligently (English, Bengali, or Banglish)
    const detectedLang = detectInputLanguage(questionToAsk, lang);
    const targetLang = overrideLang || detectedLang;

    // If query language changed, sync the app language
    if (detectedLang !== lang && !overrideLang) {
      setLang(detectedLang);
    }

    // Prevent duplicate rapid submissions if currently loading
    if (status === 'submitted' || status === 'finding_sources') {
      return;
    }

    // Cancel any inflight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const currentRequestId = crypto.randomUUID();
    activeRequestIdRef.current = currentRequestId;

    // Immediately append user turn to chat stream
    const userTurn: ChatTurn = {
      id: `user-${currentRequestId}`,
      role: 'user',
      content: questionToAsk.trim(),
      timestamp: new Date().toISOString(),
    };

    setChatTurns((prev) => [...prev, userTurn]);
    setInput('');
    if (topInputRef.current) topInputRef.current.style.height = 'auto';
    if (bottomInputRef.current) bottomInputRef.current.style.height = 'auto';
    setStatus('submitted');
    setErrorMsg(null);

    try {
      // Gather previous conversation history
      const historyPayload: ChatHistoryMessage[] = chatTurns.map((turn) => ({
        role: turn.role,
        content: turn.content,
      }));

      // Merge accumulated facts from all previous turns
      const mergedFactsMap = new Map<string, FactValue>();
      chatTurns.forEach((turn) => {
        turn.result?.userFacts?.forEach((f) => mergedFactsMap.set(f.fieldId, f));
      });
      additionalFacts.forEach((f) => mergedFactsMap.set(f.fieldId, f));

      const payloadFacts = Array.from(mergedFactsMap.values());

      const payload: Partial<AnswerRequest> = {
        requestId: currentRequestId,
        originalMessage: questionToAsk.trim(),
        language: targetLang,
        facts: payloadFacts,
        conversationHistory: historyPayload,
      };

      const res = await fetch('/api/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        signal: abortController.signal,
      });

      // Ignore stale responses if another request was triggered
      if (activeRequestIdRef.current !== currentRequestId) {
        return;
      }

      if (res.status === 401) {
        openAuthModal(
          'login',
          t(
            'আপনার লগইন সেশনের মেয়াদ উত্তীর্ণ হয়েছে। দয়া করে আবার সাইন ইন করুন।',
            'Your session has expired. Please sign in again.'
          )
        );
        setStatus('ready');
        return;
      }

      if (res.status === 429) {
        const errJson = await res.json().catch(() => ({}));
        const quotaError =
          errJson.message ||
          t(
            'আজকের দৈনিক প্রশ্ন কোটা (১০টি) শেষ হয়েছে। দয়া করে আগামীকাল আবার চেষ্টা করুন।',
            'Daily query limit of 10 reached. Please check back tomorrow.'
          );
        setErrorMsg(quotaError);
        if (errJson.userQuota) {
          setQuota(errJson.userQuota);
        }

        const assistantErrorTurn: ChatTurn = {
          id: `assistant-err-${currentRequestId}`,
          role: 'assistant',
          content: '',
          timestamp: new Date().toISOString(),
          error: quotaError,
        };
        setChatTurns((prev) => [...prev, assistantErrorTurn]);
        setStatus('unavailable');
        return;
      }

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || t('অনুরোধ সম্পন্ন করা যায়নি।', 'Request could not be processed.'));
      }

      const data: AnswerResult = await res.json();

      if (activeRequestIdRef.current === currentRequestId) {
        if (data.userQuota) {
          setQuota(data.userQuota);
        }

        const assistantTurn: ChatTurn = {
          id: `assistant-${currentRequestId}`,
          role: 'assistant',
          content:
            data.followUpResponse?.directAnswer ||
            data.plainLanguageExplanation?.meaning ||
            data.problemSummary?.understanding ||
            '',
          timestamp: new Date().toISOString(),
          result: data,
        };

        setChatTurns((prev) => [...prev, assistantTurn]);
        setStatus(data.status);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return;
      }
      if (activeRequestIdRef.current === currentRequestId) {
        const fallbackMsg = err.message || t('সার্ভার ত্রুটি। অনুগ্রহ করে আবার চেষ্টা করুন।', 'Server error. Please try again.');
        setErrorMsg(fallbackMsg);
        const assistantErrorTurn: ChatTurn = {
          id: `assistant-err-${currentRequestId}`,
          role: 'assistant',
          content: '',
          timestamp: new Date().toISOString(),
          error: fallbackMsg,
        };
        setChatTurns((prev) => [...prev, assistantErrorTurn]);
        setStatus('unavailable');
      }
    }
  };

  // Re-fetch in the newly selected language when user toggles language switch
  useEffect(() => {
    if (prevLangRef.current !== lang) {
      prevLangRef.current = lang;
      const lastUserTurn = [...chatTurns].reverse().find((t) => t.role === 'user');
      if (lastUserTurn) {
        const lastResult = [...chatTurns].reverse().find((t) => t.result)?.result;
        handleAsk(lastUserTurn.content, lastResult?.userFacts || [], lang);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const handleClarificationSubmit = (lastResult: AnswerResult) => {
    // Extract non-empty answers and map directly to canonical fieldIds
    const answeredFacts: FactValue[] = Object.entries(clarificationAnswers)
      .filter(([_, val]) => val && val.trim().length > 0)
      .map(([fieldId, val]) => ({
        fieldId,
        value: val.trim(),
        status: 'user_confirmed',
        provenance: 'clarification_response',
      }));

    if (answeredFacts.length === 0) return;

    // Build human-friendly follow up clarification message
    const answeredSummary = answeredFacts.map((f) => `${f.fieldId}: ${f.value}`).join(', ');
    const followUpMessage = `${t('অতিরিক্ত নিশ্চিত তথ্য: ', 'Additional confirmed details: ')}${answeredSummary}`;

    handleAsk(followUpMessage, answeredFacts, lang);
  };

  const handleGoToDraft = (docType: string, turnResult?: AnswerResult) => {
    const activeResult = turnResult || [...chatTurns].reverse().find((t) => t.result)?.result;
    if (!activeResult) return;

    const lastUserTurn = [...chatTurns].reverse().find((t) => t.role === 'user');
    const draftPayload = {
      type: docType,
      facts: activeResult.userFacts,
      query: lastUserTurn?.content || '',
    };
    try {
      sessionStorage.setItem('mylaws_pending_draft', JSON.stringify(draftPayload));
    } catch {}
    router.push('/drafts');
  };

  const latestResult = [...chatTurns].reverse().find((t) => t.result)?.result;
  const remainingQuestions = quota ? quota.remaining : 50;
  const isChatMode = chatTurns.length > 0;

  return (
    <div className="min-h-screen bg-bg-light text-primary-light flex flex-col font-sans transition-colors duration-200">
      <Header />

      <main className={`flex-1 w-full mx-auto px-4 py-6 ${isChatMode ? 'max-w-3xl pb-44 sm:pb-48' : 'max-w-4xl pb-12'}`}>
        {/* Top Session Bar (Compact and clean, shown when in chat mode) */}
        {isChatMode && (
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-light/60">
            <div className="flex items-center gap-2.5">
              <span className="h-8 w-8 rounded-xl bg-accent-light/10 text-accent-light flex items-center justify-center shrink-0">
                <Scale className="h-4 w-4" />
              </span>
              <div>
                <span className="font-cinzel text-xs font-bold text-primary-light block tracking-wide">
                  {t('MyLaws আইনি পরামর্শ', 'MyLaws Legal Consultation')}
                </span>
                <span className="text-[10px] text-secondary-light font-hind">
                  {t('বাংলাদেশ গেজেট ও সংবিধিবদ্ধ আইন সমর্থিত', 'Statutory Provisions & Gazette Verified')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClearCase}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-light bg-surface-light text-xs font-medium text-secondary-light hover:text-primary-light hover:border-accent-light transition-all shadow-2xs cursor-pointer"
                title={t('নতুন কেস শুরু করুন', 'Start New Case')}
              >
                <RotateCcw className="h-3.5 w-3.5 text-accent-light" />
                <span className="hidden sm:inline">{t('নতুন কেস', 'New Case')}</span>
              </button>

              <button
                type="button"
                onClick={fetchHistory}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-light bg-surface-light text-xs font-medium text-secondary-light hover:text-primary-light hover:border-accent-light transition-all shadow-2xs cursor-pointer"
              >
                <History className="h-3.5 w-3.5 text-accent-light" />
                <span className="hidden sm:inline">{t('ইতিহাস', 'History')}</span>
              </button>

              {user ? (
                <div className="flex items-center gap-1 text-xs text-amber-900 dark:text-amber-200 bg-amber-500/15 px-2.5 py-1.5 rounded-lg border border-amber-600/30 shadow-2xs">
                  <Sparkles className="h-3 w-3 text-amber-700 dark:text-amber-400" />
                  <span className="font-semibold text-[11px]">
                    {t(`বাকি: ${remainingQuestions}`, `${remainingQuestions} left`)}
                  </span>
                </div>
              ) : (
                <Link
                  href="/login?redirect=/ask"
                  className="flex items-center gap-1 text-xs text-amber-900 bg-amber-500/20 px-2.5 py-1.5 rounded-lg border border-amber-600/40 hover:bg-amber-500/30 transition-all font-semibold cursor-pointer"
                >
                  <Lock className="h-3 w-3 text-amber-700" />
                  <span className="text-[11px]">{t('লগইন', 'Login')}</span>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* ============================================================
            INITIAL COMPOSER HERO (Claude Style - Shown only before conversation starts)
            ============================================================ */}
        {!isChatMode && (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-240px)] max-w-3xl mx-auto px-2 sm:px-4 py-8 animate-in fade-in duration-300">
            {/* Top Greeting with Emblem */}
            <div className="flex flex-col items-center text-center space-y-3 mb-8">
              <div className="inline-flex items-center gap-3">
                <span className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-accent-light/10 text-accent-light flex items-center justify-center shadow-xs">
                  <Scale className="h-6 w-6 sm:h-7 sm:w-7 text-accent-light" />
                </span>
                <h1 className="font-cinzel text-2xl sm:text-4xl font-bold tracking-tight text-primary-light">
                  {getGreeting()}
                </h1>
              </div>
              <p className="font-hind text-xs sm:text-sm text-secondary-light max-w-md">
                {t(
                  'আপনার আইনি পরিস্থিতি বা সমস্যাটি খুলে বলুন—আমরা যাচাইকৃত আইন, করণীয় ধাপ ও প্রস্তুত খসড়া দেব।',
                  'Describe your situation or legal question—we provide verified statutes, actionable steps, and drafts.'
                )}
              </p>
            </div>

            {/* Central Asking Box */}
            <div className="w-full rounded-3xl border border-border-light bg-surface-cardLight p-4 sm:p-5 shadow-sm hover:shadow-md transition-all space-y-3 focus-within:border-accent-light/60 focus-within:ring-2 focus-within:ring-accent-light/10">
              <textarea
                id="top-legal-input"
                ref={topInputRef}
                rows={3}
                value={input}
                onInput={handleTextareaInput}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (status !== 'submitted' && status !== 'finding_sources' && input.trim()) {
                      handleAsk();
                    }
                  }
                }}
                placeholder={t(
                  'আপনার পরিস্থিতি বা আইনি প্রশ্নটি বিস্তারিত লিখুন... (যেমন: আমার দোকান থেকে মালামাল চুরি হয়েছে, এখন কী করব?)',
                  'Describe your situation or legal question... (e.g. Goods were stolen from my shop, what should I do?)'
                )}
                className="w-full resize-none border-none bg-transparent p-1.5 text-sm sm:text-base text-primary-light placeholder-secondary-light/60 focus:outline-none min-h-[88px]"
              />

              {/* Bottom Controls Bar Inside Asking Box */}
              <div className="flex items-center justify-between pt-2 border-t border-border-light/60">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-accent-light/10 text-accent-light border border-accent-light/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-light animate-pulse" />
                    <span>{t('বাংলাদেশ আইন ২০২৬', 'Bangladesh Law 2026')}</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-secondary-light/80 font-hind">
                    <ShieldCheck className="h-3 w-3 text-emerald-600" />
                    <span>{t('গেজেট যাচাইকৃত', 'Gazette Verified')}</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden md:inline text-[11px] text-secondary-light/70 font-hind">
                    {t('Enter চাপলে উত্তর আসবে', 'Press Enter to submit')}
                  </span>
                  <button
                    type="button"
                    disabled={status === 'submitted' || status === 'finding_sources' || !input.trim()}
                    onClick={() => handleAsk()}
                    className="h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center bg-accent-light text-white shadow hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                    title={t('অনুসন্ধান চালান', 'Submit Inquiry')}
                  >
                    {status === 'submitted' || status === 'finding_sources' ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowUp className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Example Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6 max-w-2xl">
              {exampleChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInput(chip.query);
                    if (topInputRef.current) {
                      topInputRef.current.focus();
                      topInputRef.current.style.height = 'auto';
                    }
                  }}
                  className="text-xs px-3.5 py-1.5 rounded-full border border-border-light bg-surface-light text-secondary-light hover:border-accent-light hover:text-accent-light hover:bg-surface-cardLight transition-all cursor-pointer shadow-2xs font-hind flex items-center gap-1.5"
                >
                  <Sparkles className="h-3 w-3 text-accent-light/70" />
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Global Error Banner */}
        {errorMsg && (
          <div className="mt-6 p-4 rounded-xl border border-red-300 bg-red-50 text-red-800 text-xs flex items-start gap-3">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold">{t('ত্রুটি ঘটেছে:', 'Notice:')}</span>
              <p>{errorMsg}</p>
            </div>
          </div>
        )}

        {/* ============================================================
            CHAT STREAM CONVERSATION VIEW (Active after inquiry starts)
            ============================================================ */}
        {isChatMode && (
          <div className="mt-6 space-y-8 animate-in fade-in duration-200">
            {chatTurns.map((turn, turnIdx) => (
              <div key={turn.id} className="space-y-4">
                {/* ------------------------------------------------------
                    USER MESSAGE BUBBLE
                    ------------------------------------------------------ */}
                {turn.role === 'user' && (
                  <div className="flex items-start justify-end gap-3 max-w-2xl ml-auto animate-in slide-in-from-right-2 duration-150">
                    <div className="space-y-1.5 text-right">
                      <div className="flex items-center justify-end gap-2 text-[10px] text-secondary-light font-hind">
                        <span>{new Date(turn.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="font-semibold text-primary-light">{user?.displayName || t('আপনি', 'You')}</span>
                      </div>
                      <div className="p-4 sm:p-5 rounded-2xl rounded-tr-xs bg-accent-light text-white font-hind text-sm shadow-sm leading-relaxed text-left whitespace-pre-wrap">
                        {turn.content}
                      </div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-accent-light/20 border border-accent-light/40 flex items-center justify-center shrink-0 mt-4 text-accent-light">
                      <User className="h-4 w-4" />
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------
                    ASSISTANT MESSAGE WITH CANONICAL 4-STEP CARDS
                    ------------------------------------------------------ */}
                {turn.role === 'assistant' && (
                  <div className="space-y-6 animate-in slide-in-from-left-2 duration-200">
                    {/* Top Assistant Persona Banner */}
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-2xs font-cinzel font-bold text-xs">
                        ML
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-cinzel text-xs font-bold text-primary-light tracking-wide">
                          {t('MyLaws আইনি সহকারী', 'MyLaws Legal Assistant')}
                        </span>
                        <span className="text-[10px] text-secondary-light font-hind">
                          {new Date(turn.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    {/* Error Turn Message if failed */}
                    {turn.error ? (
                      <div className="p-4 rounded-2xl border border-red-300 bg-red-50 text-red-800 text-xs flex items-start gap-3">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <span className="font-semibold">{t('ত্রুটি ঘটেছে:', 'Notice:')}</span>
                          <p>{turn.error}</p>
                        </div>
                      </div>
                    ) : turn.result ? (
                      turn.result.isFollowUp && turn.result.followUpResponse ? (
                        <div className="space-y-4">
                          {/* Top Contextual Badge */}
                          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl border border-border-light bg-surface-light shadow-2xs">
                            <div className="flex items-center gap-2.5">
                              <span className="p-1.5 rounded-lg bg-accent-light/10 text-accent-light">
                                <MessageSquare className="h-4 w-4" />
                              </span>
                              <div>
                                <span className="text-xs font-bold text-primary-light font-anek block">
                                  {turn.result.isGreeting
                                    ? t('স্বাগতম ও পরিচিতি', 'Welcome & Introduction')
                                    : turn.result.isCapability
                                    ? t('MyLaws-এর সেবাসমূহ ও সক্ষমতা', 'MyLaws Capabilities & Services')
                                    : t('প্রাসঙ্গিক আইনি উত্তর ও বিশদ তথ্য', 'Contextual Legal Follow-Up')}
                                </span>
                                <span className="text-[11px] text-secondary-light font-hind">
                                  {turn.result.isGreeting
                                    ? t('আপনার আইনি সহকারী সেবায় প্রস্তুত', 'Your legal assistant is ready to help')
                                    : turn.result.isCapability
                                    ? t('যাচাইকৃত আইন, অ্যাকশন চেকলিস্ট ও ড্রাফট সেবা', 'Verified law, action checklists, and legal drafts')
                                    : t('সংক্ষিপ্ত ও কার্যকর আইনি ব্যাখ্যা', 'Focused answer based on your inquiry')}
                                </span>
                              </div>
                            </div>

                            {/* Provenance Badge */}
                            <div className="flex items-center gap-2">
                              {turn.result.engineProvenance === 'online_meta' ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                                  <Cpu className="h-3 w-3" />
                                  <span>{t('মেটা এআই ও গেজেট যৌথভাবে বিশ্লেষিত', 'Meta-assisted verified response')}</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-accent-light/10 text-accent-light border border-accent-light/20">
                                  <BookmarkCheck className="h-3 w-3" />
                                  <span>{t('যাচাইকৃত সংবিধিবদ্ধ উত্তর', 'Verified statutory guidance')}</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Main Focused Conversational Response Box */}
                          <div className="p-6 sm:p-7 rounded-3xl border border-border-light bg-surface-cardLight shadow-sm space-y-5">
                            {/* Direct Conversational Answer */}
                            <div className="space-y-2">
                              <p className="font-hind text-sm sm:text-base text-primary-light font-medium leading-relaxed whitespace-pre-line">
                                {turn.result.followUpResponse.directAnswer}
                              </p>
                            </div>

                            {/* Structured Key Points / Documents / Steps */}
                            {turn.result.followUpResponse.keyPoints && turn.result.followUpResponse.keyPoints.length > 0 && (
                              <div className="space-y-2.5 pt-1">
                                {turn.result.followUpResponse.keyPoints.map((point, pIdx) => (
                                  <div
                                    key={pIdx}
                                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-bg-light/80 border border-border-light/80 text-xs sm:text-sm font-hind text-primary-light leading-relaxed transition-all hover:bg-bg-light"
                                  >
                                    <div className="h-5 w-5 rounded-full bg-accent-light/15 text-accent-light flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
                                      {pIdx + 1}
                                    </div>
                                    <div className="flex-1">
                                      <span>{point}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Suggested Next Step Callout */}
                            {turn.result.followUpResponse.suggestedNextStep && (
                              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-600/20 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3">
                                <Info className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
                                <div className="space-y-1">
                                  <span className="font-bold font-anek block">{t('পরবর্তী করণীয় পদক্ষেপ:', 'Recommended Next Step:')}</span>
                                  <p className="font-hind leading-relaxed">
                                    {turn.result.followUpResponse.suggestedNextStep}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Clickable Statutory Citations */}
                            {turn.result.followUpResponse.sourceIds && turn.result.followUpResponse.sourceIds.length > 0 && (
                              <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-border-light/60">
                                <span className="text-[11px] font-hind text-secondary-light flex items-center gap-1">
                                  <BookOpen className="h-3 w-3" />
                                  {t('সংশ্লিষ্ট সংবিধিবদ্ধ বিধান:', 'Cited Statutory Provisions:')}
                                </span>
                                {turn.result.followUpResponse.sourceIds.map((sid) => (
                                  <button
                                    key={sid}
                                    type="button"
                                    onClick={() => setSelectedSourceId(sid)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-anek font-semibold bg-accent-light/10 text-accent-light hover:bg-accent-light hover:text-white transition-all cursor-pointer border border-accent-light/20"
                                  >
                                    <span>{getSourceLabel(sid, lang)}</span>
                                    <ArrowRight className="h-2.5 w-2.5 opacity-60" />
                                  </button>
                                ))}
                              </div>
                            )}

                            {/* Optional Draft Offer in follow-up if relevant */}
                            {turn.result.draftOffer && (
                              <div className="pt-3 border-t border-border-light/60 flex items-center justify-between gap-3 flex-wrap">
                                <span className="text-xs text-secondary-light font-hind">
                                  {t('এই বিষয়ের আনুষ্ঠানিক আইনি খসড়া ও আবেদনপত্র প্রস্তুত করতে চান?', 'Ready to draft a formal legal petition or application?')}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleGoToDraft(turn.result!.draftOffer!.documentType, turn.result)}
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-light text-white text-xs font-cinzel font-bold tracking-wider hover:opacity-90 transition-all cursor-pointer shadow"
                                >
                                  <span>{t('আনুষ্ঠানিক খসড়া তৈরি করুন', 'PREPARE FORMAL DRAFT')}</span>
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 sm:p-8 rounded-3xl border border-border-light bg-surface-cardLight shadow-sm space-y-6 text-primary-light">
                          {/* Top Meta Bar: Issue & Provenance */}
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-light/60 pb-3.5">
                            <div className="flex items-center gap-2.5">
                              <span className="p-1.5 rounded-lg bg-accent-light/10 text-accent-light">
                                <Scale className="h-4 w-4" />
                              </span>
                              <div>
                                <span className="text-xs sm:text-sm font-bold text-primary-light font-anek block">
                                  {turn.result.problemSummary?.identifiedIssue || t('আইনি অধিকার পর্যালোচনা', 'Legal Applicability Review')}
                                </span>
                                <span className="text-[11px] text-secondary-light font-hind">
                                  {t('প্যাক সংস্করণ: ', 'Corpus: ')}{turn.result.sourcePackVersion}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {turn.result.engineProvenance === 'online_meta' ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                                  <Cpu className="h-3 w-3" />
                                  <span>{t('মেটা এআই ও গেজেট যৌথভাবে বিশ্লেষিত', 'Meta-assisted verified response')}</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-accent-light/10 text-accent-light border border-accent-light/20">
                                  <BookmarkCheck className="h-3 w-3" />
                                  <span>{t('যাচাইকৃত সংবিধিবদ্ধ নির্দেশিকা', 'Verified statutory guidance')}</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* 1. Conversational Understanding & Empathy */}
                          <div className="space-y-2">
                            <p className="font-hind text-sm sm:text-base text-primary-light font-medium leading-relaxed">
                              {turn.result.problemSummary?.understanding || t(
                                'আপনার বিষয়টি পর্যালোচনা করে এর সাথে প্রযোজ্য আইনি ক্ষেত্র চিহ্নিত করা হয়েছে।',
                                'We have analyzed your situation and identified the applicable statutory legal path.'
                              )}
                            </p>
                          </div>

                          {/* Clarification Questions (if active in this turn) */}
                          {turn.result.status === 'clarifying' && turn.result.clarificationQuestions && turn.result.clarificationQuestions.length > 0 && (
                            <div className="p-4 sm:p-5 rounded-2xl border border-amber-300 bg-amber-50/70 shadow-2xs space-y-3.5">
                              <div className="flex items-center gap-2 text-amber-900 border-b border-amber-200/80 pb-2.5">
                                <HelpCircle className="h-4 w-4 text-amber-700 shrink-0" />
                                <h4 className="font-anek font-bold text-xs sm:text-sm">
                                  {t('আরও নির্ভুল পরামর্শের জন্য কয়েকটি প্রশ্নের উত্তর দিন', 'Answer a few quick questions for tailored guidance')}
                                </h4>
                              </div>

                              <div className="space-y-3">
                                {turn.result.clarificationQuestions.map((q: ClarificationQuestion) => (
                                  <div key={q.fieldId} className="space-y-1.5">
                                    <label className="block text-xs font-hind font-semibold text-primary-light">
                                      {t(q.question.bn, q.question.en)}
                                    </label>
                                    {q.options && q.options.length > 0 ? (
                                      <div className="flex flex-wrap gap-2">
                                        {q.options.map((opt) => (
                                          <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() =>
                                              setClarificationAnswers((prev) => ({
                                                ...prev,
                                                [q.fieldId]: opt.value,
                                              }))
                                            }
                                            className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                                              clarificationAnswers[q.fieldId] === opt.value
                                                ? 'border-accent-light bg-accent-light text-white font-medium shadow-xs'
                                                : 'border-border-light bg-surface-light text-secondary-light hover:border-accent-light/60'
                                            }`}
                                          >
                                            {t(opt.label.bn, opt.label.en)}
                                          </button>
                                        ))}
                                      </div>
                                    ) : (
                                      <input
                                        type="text"
                                        value={clarificationAnswers[q.fieldId] || ''}
                                        onChange={(e) =>
                                          setClarificationAnswers((prev) => ({
                                            ...prev,
                                            [q.fieldId]: e.target.value,
                                          }))
                                        }
                                        placeholder={t('এখানে লিখুন...', 'Type here...')}
                                        className="w-full text-xs p-2.5 rounded-lg border border-border-light bg-surface-light text-primary-light focus:outline-none focus:ring-1 focus:ring-accent-light"
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>

                              <div className="pt-1 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => handleClarificationSubmit(turn.result!)}
                                  className="px-4 py-2 rounded-lg bg-accent-light text-white text-xs font-cinzel font-bold tracking-wider hover:opacity-90 transition-all cursor-pointer shadow"
                                >
                                  {t('তথ্য জমা দিন ও সম্পূর্ণ সমাধান দেখুন', 'SUBMIT & REFRESH ANALYSIS')}
                                </button>
                              </div>
                            </div>
                          )}

                          {/* 2. What the Law Says (আইনের মতে ও সংবিধিবদ্ধ বিধান) */}
                          {turn.result.plainLanguageExplanation && (
                            <div className="pt-2 border-t border-border-light/60 space-y-3">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-accent-light shrink-0" />
                                <h4 className="font-anek text-sm sm:text-base font-bold text-primary-light">
                                  {t('আইনের মতে:', 'What the Law Says:')}
                                </h4>
                              </div>

                              <p className="font-hind text-xs sm:text-sm text-secondary-light leading-relaxed whitespace-pre-line">
                                {turn.result.plainLanguageExplanation.meaning}
                              </p>

                              {/* Clickable Statutory Sources (Source pills as drawn in user sketch) */}
                              {(() => {
                                const allSourceIds = Array.from(
                                  new Set([
                                    ...(turn.result.explanation?.flatMap((e) => e.sourceIds || []) || []),
                                    ...(turn.result.checklist?.flatMap((c) => c.sourceIds || []) || []),
                                    ...(turn.result.followUpResponse?.sourceIds || []),
                                  ])
                                ).filter(Boolean);

                                if (allSourceIds.length === 0) return null;

                                return (
                                  <div className="flex flex-wrap items-center gap-2 pt-1.5">
                                    <span className="text-[11px] font-hind text-secondary-light flex items-center gap-1">
                                      <Shield className="h-3 w-3 text-accent-light" />
                                      {t('আইনি উৎস ও ধারা:', 'Statutory Sources:')}
                                    </span>
                                    {allSourceIds.map((sid) => (
                                      <button
                                        key={sid}
                                        type="button"
                                        onClick={() => setSelectedSourceId(sid)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-anek font-semibold bg-accent-light/10 text-accent-light hover:bg-accent-light hover:text-white transition-all cursor-pointer border border-accent-light/20 shadow-2xs"
                                        title={t('মূল সরকারি গেজেট ও ধারা দেখুন', 'View official statutory text')}
                                      >
                                        <span>{getSourceLabel(sid, lang)}</span>
                                        <ArrowRight className="h-2.5 w-2.5 opacity-60" />
                                      </button>
                                    ))}
                                  </div>
                                );
                              })()}

                              {/* Key Caveat / Advice */}
                              {turn.result.plainLanguageExplanation.whatToDoNext && (
                                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-600/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                                  <Info className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
                                  <div className="space-y-0.5">
                                    <span className="font-bold block">{t('জরুরি করণীয়:', 'What to do next:')}</span>
                                    <span className="font-hind leading-relaxed">
                                      {turn.result.plainLanguageExplanation.whatToDoNext}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* 3. Action Steps (আপনি এখন যে পদক্ষেপ নিবেন:-) */}
                          {turn.result.checklist && turn.result.checklist.length > 0 && (
                            <div className="pt-2 border-t border-border-light/60 space-y-3.5">
                              <Checklist
                                caseId={turn.result.answerId}
                                steps={turn.result.checklist}
                                onOpenSource={(id: string) => setSelectedSourceId(id)}
                                onOpenOffice={(id: string) => setSelectedOfficeId(id)}
                                variant="lineByLine"
                              />
                            </div>
                          )}

                          {/* 4. Prepare Formal Draft (আনুষ্ঠানিক খসড়া তৈরি করুন) */}
                          {turn.result.draftOffer && (
                            <div className="pt-3 border-t border-border-light/60">
                              <div className="p-4 sm:p-5 rounded-2xl bg-accent-light/5 border border-accent-light/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-accent-light shrink-0" />
                                    <h4 className="font-anek font-bold text-sm sm:text-base text-primary-light">
                                      {turn.result.draftOffer.documentTitle}
                                    </h4>
                                  </div>
                                  <p className="font-hind text-xs text-secondary-light">
                                    {turn.result.draftOffer.description}
                                  </p>
                                  {turn.result.draftOffer.missingDetails && turn.result.draftOffer.missingDetails.length > 0 && (
                                    <p className="text-[11px] text-secondary-light/90 font-hind pt-1">
                                      <span className="font-semibold">{t('প্রয়োজনীয় তথ্য: ', 'Details needed: ')}</span>
                                      {turn.result.draftOffer.missingDetails.join(' • ')}
                                    </p>
                                  )}
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleGoToDraft(turn.result!.draftOffer!.documentType, turn.result)}
                                  className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent-light text-white text-xs sm:text-sm font-cinzel font-bold tracking-wider hover:opacity-90 transition-all cursor-pointer shadow hover:shadow-md"
                                >
                                  <span>{t('আনুষ্ঠানিক খসড়া তৈরি করুন', 'PREPARE A FORMAL DRAFT')}</span>
                                  <ArrowRight className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    ) : null}
                  </div>
                )}
              </div>
            ))}

            {/* In-flight Analyzing / Typing Indicator */}
            {(status === 'submitted' || status === 'finding_sources') && (
              <div className="flex items-center gap-3 p-4 sm:p-5 rounded-2xl border border-accent-light/30 bg-surface-cardLight shadow-sm text-xs text-primary-light animate-pulse">
                <Loader2 className="h-5 w-5 animate-spin text-accent-light" />
                <div className="space-y-0.5">
                  <span className="font-bold font-anek block text-sm">
                    {t('আইন, গেজেট ও বিধিবদ্ধ সমাধান বিশ্লেষণ করা হচ্ছে...', 'Analyzing statutes, official gazettes & statutory solutions...')}
                  </span>
                  <span className="text-[11px] text-secondary-light font-hind">
                    {t('আপনার প্রশ্নের প্রেক্ষিতে ৪-ধাপ আইনি রোডম্যাপ তৈরি হচ্ছে...', 'Building canonical 4-step legal guidance for your case...')}
                  </span>
                </div>
              </div>
            )}

            {/* Scroll Anchor */}
            <div ref={chatEndRef} />
          </div>
        )}
      </main>

      {/* ============================================================
          FIXED BOTTOM CHAT DOCK (Claude Style)
          Shrunk & docked at bottom in fixed aspect, without suggestion pills!
          ============================================================ */}
      {isChatMode && (
        <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none pb-3 sm:pb-4 pt-6 bg-gradient-to-t from-bg-light via-bg-light/95 to-transparent">
          <div className="max-w-3xl mx-auto px-4 w-full pointer-events-auto">
            {/* Docked Asking Card */}
            <div className="rounded-2xl sm:rounded-3xl border border-border-light bg-surface-cardLight/95 backdrop-blur-md shadow-xl transition-all focus-within:border-accent-light/60 focus-within:ring-2 focus-within:ring-accent-light/10 p-3 sm:p-3.5 space-y-2">
              <textarea
                ref={bottomInputRef}
                rows={1}
                value={input}
                onInput={handleTextareaInput}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (status !== 'submitted' && status !== 'finding_sources' && input.trim()) {
                      handleAsk();
                    }
                  }
                }}
                placeholder={t(
                  'অনুসরণমূলক প্রশ্ন লিখুন... (যেমন: পুলিশ যদি মামলা না নেয় তখন কী করব?)',
                  'Write a message...'
                )}
                className="w-full resize-none border-none bg-transparent px-2 py-1 text-xs sm:text-sm text-primary-light placeholder-secondary-light/60 focus:outline-none min-h-[44px] max-h-[140px]"
              />

              {/* Bottom Dock Action Row */}
              <div className="flex items-center justify-between pt-1 border-t border-border-light/40">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleClearCase}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium text-secondary-light hover:text-primary-light hover:bg-bg-light transition-all cursor-pointer"
                    title={t('নতুন আলোচনা শুরু করুন', 'Start new chat')}
                  >
                    <Plus className="h-3 w-3 text-accent-light" />
                    <span className="hidden sm:inline">{t('নতুন প্রশ্ন', 'New')}</span>
                  </button>

                  <span className="text-[11px] font-hind text-secondary-light/80 px-2 py-0.5 rounded-full bg-bg-light/80 border border-border-light/60">
                    {t(`বাকি: ${remainingQuestions}টি`, `${remainingQuestions} queries left`)}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="hidden md:inline text-[10px] text-secondary-light/60 font-hind">
                    {t('Shift+Enter নতুন লাইনের জন্য', 'Shift+Enter for newline')}
                  </span>
                  <button
                    type="button"
                    disabled={status === 'submitted' || status === 'finding_sources' || !input.trim()}
                    onClick={() => handleAsk()}
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center bg-accent-light text-white shadow hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                    title={t('পাঠান', 'Send')}
                  >
                    {status === 'submitted' || status === 'finding_sources' ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <ArrowUp className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Discreet Disclaimer below dock */}
            <p className="text-center text-[10px] text-secondary-light/60 font-hind mt-2">
              {t(
                'MyLaws সরকারি গেজেট ও সংবিধিবদ্ধ আইন বিশ্লেষণ করে। আদালত বা আনুষ্ঠানিক ওকালতির জন্য মূল গেজেট যাচাই করুন।',
                'MyLaws analyzes official statutory gazettes. Verify official legal gazettes for formal court proceedings.'
              )}
            </p>
          </div>
        </div>
      )}

      {/* Floating Scroll To Bottom Button (Claude Style) */}
      {showScrollBottom && (
        <button
          type="button"
          onClick={scrollToBottom}
          className="fixed bottom-32 sm:bottom-36 left-1/2 -translate-x-1/2 z-40 p-2.5 rounded-full bg-surface-cardLight/95 backdrop-blur-md border border-border-light shadow-lg hover:bg-surface-light hover:border-accent-light text-primary-light transition-all cursor-pointer animate-in fade-in zoom-in-95 duration-150"
          title={t('নিচে যান', 'Scroll to bottom')}
        >
          <ChevronDown className="h-4 w-4 text-accent-light" />
        </button>
      )}

      <Footer />

      {/* Cloudflare D1 User History Drawer */}
      {historyOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/50 backdrop-blur-xs transition-opacity"
          onClick={(e) => {
            if (e.target === e.currentTarget) setHistoryOpen(false);
          }}
        >
          <div className="h-full w-full max-w-md bg-surface-light border-l border-border-light shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-200 overflow-hidden">
            <div>
              <div className="flex items-center justify-between border-b border-border-light pb-4">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-accent-light" />
                  <h3 className="font-cinzel text-sm font-bold tracking-wider text-primary-light">
                    {t('পূর্ববর্তী আইনি অনুসন্ধান', 'QUESTION HISTORY')}
                  </h3>
                </div>
                <button
                  onClick={() => setHistoryOpen(false)}
                  className="rounded-lg p-1 text-secondary-light hover:bg-bg-light transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-[11px] text-secondary-light mt-2 font-hind">
                {t(
                  'ক্লাউডফ্লেয়ার ডি১ ডাটাবেসে সংরক্ষিত আপনার সাম্প্রতিক প্রশ্ন ও এআই সমাধান',
                  'Your recent queries and legal solutions preserved in Cloudflare D1'
                )}
              </p>

              <div className="mt-4 space-y-3 max-h-[calc(100vh-160px)] overflow-y-auto pr-1">
                {historyLoading ? (
                  <div className="py-12 flex flex-col items-center justify-center text-secondary-light text-xs gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-accent-light" />
                    <span>{t('তথ্য লোড হচ্ছে...', 'Loading your history...')}</span>
                  </div>
                ) : historyItems.length === 0 ? (
                  <div className="py-12 text-center text-xs text-secondary-light font-hind">
                    {t('এখনও কোনো প্রশ্ন রেকর্ড পাওয়া যায়নি।', 'No recorded questions yet.')}
                  </div>
                ) : (
                  historyItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-border-light bg-bg-light/60 p-3.5 space-y-2 hover:border-accent-light/50 transition-all cursor-pointer"
                      onClick={() => {
                        handleAsk(item.question);
                        setHistoryOpen(false);
                      }}
                    >
                      <div className="flex items-center justify-between text-[10px] text-secondary-light">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-accent-light" />
                          {new Date(item.createdAt).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        <span className="uppercase text-[9px] px-1.5 py-0.5 rounded bg-accent-light/10 text-accent-light font-cinzel font-semibold">
                          {item.engineProvenance}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-primary-light line-clamp-2">
                        {item.question}
                      </p>
                      {item.responseSnippet && (
                        <p className="text-[11px] text-secondary-light line-clamp-2 italic font-hind">
                          &ldquo;{item.responseSnippet}&rdquo;
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-border-light text-center">
              <span className="text-[11px] text-secondary-light">
                {t('যেকোনো প্রশ্নে ক্লিক করে সরাসরি প্রশ্ন চালু করুন', 'Click any question to open and run inquiry')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Source Drawer */}
      <SourceDrawer
        sourceId={selectedSourceId}
        onClose={() => setSelectedSourceId(null)}
      />

      {/* Office Modal */}
      <OfficeModal
        officeId={selectedOfficeId}
        onClose={() => setSelectedOfficeId(null)}
      />
    </div>
  );
}

export default function AskPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-light" />}>
      <AskContent />
    </Suspense>
  );
}
