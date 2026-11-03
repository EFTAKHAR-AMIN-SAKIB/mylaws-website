'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/components/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

import {
  applicationPageContent,
  MilestoneStatus,
} from '@/data/applicationContent';
import {
  Smartphone,
  Sparkles,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Clock,
  Activity,
  FileText,
  ShieldCheck,
  HardDrive,
  MessageSquare,
  HelpCircle,
  Info,
  Download,
  Cpu,
  AlertTriangle,
  Layers,
  Copy,
  Check,
  BookOpen,
} from 'lucide-react';

export default function ApplicationPage() {
  const { lang, t } = useApp();
  const content = applicationPageContent;
  const progressPercent = content.progress.estimatedPercentage;
  const [copiedChecksum, setCopiedChecksum] = React.useState(false);

  const handleCopyChecksum = () => {
    const checksum = content.experimentalRelease.manifest.sha256Checksum || '';
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(checksum).then(() => {
        setCopiedChecksum(true);
        setTimeout(() => setCopiedChecksum(false), 2200);
      }).catch(() => {
        fallbackCopy(checksum);
      });
    } else {
      fallbackCopy(checksum);
    }
  };

  const fallbackCopy = (text: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedChecksum(true);
      setTimeout(() => setCopiedChecksum(false), 2200);
    } catch {
      // ignore
    }
  };

  const scrollToProgress = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('progress');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getStatusBadge = (status: MilestoneStatus) => {
    switch (status) {
      case 'ready':
        return {
          label: t('সম্পন্ন', 'Ready'),
          className:
            'bg-emerald-800/10 text-emerald-900 border-emerald-800/25',
          icon: CheckCircle2,
        };
      case 'in_progress':
        return {
          label: t('কাজ চলছে', 'In progress'),
          className:
            'bg-amber-800/15 text-amber-950 border-amber-800/30 font-semibold',
          icon: Activity,
        };
      case 'testing':
        return {
          label: t('পরীক্ষা চলছে', 'Testing'),
          className:
            'bg-blue-800/10 text-blue-950 border-blue-800/25 font-semibold',
          icon: Clock,
        };
      case 'planned':
      default:
        return {
          label: t('পরিকল্পিত', 'Planned'),
          className:
            'bg-secondary-light/10 text-secondary-light border-secondary-light/25',
          icon: Clock,
        };
    }
  };

  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return MessageSquare;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'FileText':
        return FileText;
      case 'Cpu':
        return Cpu;
      case 'HardDrive':
      default:
        return HardDrive;
    }
  };

  const formatFriendlyDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split('-');
    if (lang === 'bn') {
      const bnMonths: Record<string, string> = {
        '01': 'জানুয়ারি',
        '02': 'ফেব্রুয়ারি',
        '03': 'মার্চ',
        '04': 'এপ্রিল',
        '05': 'মে',
        '06': 'জুন',
        '07': 'জুলাই',
        '08': 'আগস্ট',
        '09': 'সেপ্টেম্বর',
        '10': 'অক্টোবর',
        '11': 'নভেম্বর',
        '12': 'ডিসেম্বর',
      };
      return `${parseInt(day, 10)} ${bnMonths[month] || month}, ${year}`;
    }
    const enDate = new Date(`${dateStr}T00:00:00`);
    return enDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-light text-primary-light transition-colors bg-parchment-grid">
      <Header />

      <main className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-16 sm:space-y-20">
        
        {/* ========================================================================= */}
        {/* SECTION 1: ELEGANT CENTERED HERO (NO PREVIEW MOCKUP, NO TOP STATUS TAG)   */}
        {/* ========================================================================= */}
        <section aria-labelledby="hero-heading" className="relative text-center max-w-4xl mx-auto space-y-6 pt-2 sm:pt-4">
          
          {/* Main Headline */}
          <h1
            id="hero-heading"
            className="font-anek font-extrabold text-3xl sm:text-5xl lg:text-6xl text-primary-light tracking-tight leading-[1.18]"
          >
            {lang === 'bn' ? content.meta.headlineBn : content.meta.headlineEn}
          </h1>

          {/* Description */}
          <p className="font-hind text-base sm:text-lg text-secondary-light leading-relaxed max-w-2xl mx-auto">
            {lang === 'bn' ? content.meta.descriptionBn : content.meta.descriptionEn}
          </p>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/ask"
              className="bracket-btn inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs sm:text-sm font-bold tracking-wider text-center"
            >
              <Sparkles className="h-4 w-4 text-accent-light" />
              <span>
                {lang === 'bn'
                  ? content.meta.primaryCtaBn
                  : content.meta.primaryCtaEn}
              </span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>

            <a
              href="#progress"
              onClick={scrollToProgress}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border-light/90 bg-surface-light hover:bg-surface-cardLight text-secondary-light hover:text-primary-light text-xs sm:text-sm font-semibold transition-all shadow-sm"
            >
              <span>
                {lang === 'bn'
                  ? content.meta.secondaryCtaBn
                  : content.meta.secondaryCtaEn}
              </span>
              <ChevronDown className="h-4 w-4" />
            </a>
          </div>

          {/* 3 Fast Value Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-surface-light border border-border-light/80 text-xs font-hind space-y-1 shadow-xs hover:border-accent-light/50 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">
              <span className="font-bold text-primary-light text-sm block">
                {t('১০০% অফলাইন প্রস্তুত', '100% Offline')}
              </span>
              <span className="text-secondary-light leading-relaxed">
                {t('ইন্টারনেট সংযোগ ছাড়াই ১,০৪৬টি ধারার সমাধান', '1,046 verified statutory provisions on-device')}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-light border border-border-light/80 text-xs font-hind space-y-1 shadow-xs hover:border-accent-light/50 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">
              <span className="font-bold text-primary-light text-sm block">
                {t('যে কোনো কম র‍্যামের ফোনে মসৃণ', 'Any Low-RAM Phone')}
              </span>
              <span className="text-secondary-light leading-relaxed">
                {t('১ জিবি বা ২ জিবি সাধারণ বাজেট ফোনেও দ্রুত চলে', 'Runs smoothly on budget 1 GB / 2 GB RAM phones')}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-light border border-border-light/80 text-xs font-hind space-y-1 shadow-xs hover:border-accent-light/50 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">
              <span className="font-bold text-accent-light text-sm block">
                {t('ইতিমধ্যেই ৪৫% কাজ সম্পন্ন', 'Already 45% Completed')}
              </span>
              <span className="text-secondary-light leading-relaxed">
                {t('মূল অফলাইন ইনডেক্স সম্পন্ন, দ্রুত রিলিজের পথে', 'Core offline index complete, releasing soon')}
              </span>
            </div>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: DEVELOPMENT PROGRESS - CONFIDENT 45% STATUS                   */}
        {/* ========================================================================= */}
        <section
          id="progress"
          aria-labelledby="progress-heading"
          className="scroll-mt-24 p-6 sm:p-8 rounded-3xl border border-border-light/90 bg-surface-light shadow-sm space-y-8"
        >
          {/* Section Header */}
          <div className="space-y-2 border-b border-border-light/60 pb-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-light uppercase tracking-wider font-cinzel">
              <Layers className="h-3.5 w-3.5" />
              <span>{t('উন্নয়ন অগ্রগতি', 'Development Milestones')}</span>
            </div>
            <h2
              id="progress-heading"
              className="font-anek text-2xl sm:text-3xl font-extrabold text-primary-light"
            >
              {lang === 'bn'
                ? content.progress.headingBn
                : content.progress.headingEn}
            </h2>
            <p className="font-hind text-sm text-secondary-light leading-relaxed max-w-3xl">
              {lang === 'bn'
                ? content.progress.subheadingBn
                : content.progress.subheadingEn}
            </p>
          </div>

          {/* Progress Bar with Accessible Semantics */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
              <span className="text-xs sm:text-sm font-semibold text-primary-light font-hind">
                {t('সামগ্রিক উন্নয়ন অগ্রগতি (Already Completed)', 'Overall development progress (Already Completed)')}
              </span>
              <span className="text-lg sm:text-2xl font-bold font-anek text-accent-light shrink-0">
                {lang === 'bn'
                  ? `ইতিমধ্যেই ${progressPercent}% সম্পন্ন`
                  : `Already ${progressPercent}% Completed`}
              </span>
            </div>

            <div
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={
                lang === 'bn'
                  ? `অ্যান্ড্রয়েড অ্যাপের সামগ্রিক উন্নয়ন অগ্রগতি ইতিমধ্যেই ${progressPercent} শতাংশ সম্পন্ন`
                  : `Android app overall development progress: already ${progressPercent} percent completed`
              }
              className="h-3.5 w-full bg-border-light/50 rounded-full overflow-hidden p-0.5 border border-border-light/70 shadow-inner"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-light via-accent-gold to-accent-light transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-secondary-light font-hind">
              <p className="font-medium text-primary-light/90">
                {lang === 'bn'
                  ? content.progress.estimateNoteBn
                  : content.progress.estimateNoteEn}
              </p>
              {content.progress.lastUpdated && (
                <p className="shrink-0 font-medium text-secondary-light">
                  {t('সর্বশেষ হালনাগাদ: ', 'Last updated: ')}
                  {formatFriendlyDate(content.progress.lastUpdated)}
                </p>
              )}
            </div>
          </div>

          {/* Latest Engineering Note */}
          {content.progress.latestUpdateNote && (
            <div className="p-4 rounded-2xl bg-bg-light/70 border border-border-light/80 text-xs space-y-1.5 font-hind shadow-xs">
              <div className="flex items-center gap-1.5 font-bold text-accent-light">
                <Info className="h-3.5 w-3.5 shrink-0" />
                <span>{t('সাম্প্রতিক কাজের বিবরণ', 'Latest Engineering Update')}</span>
              </div>
              <p className="text-secondary-light leading-relaxed">
                {lang === 'bn'
                  ? content.progress.latestUpdateNote.bn
                  : content.progress.latestUpdateNote.en}
              </p>
            </div>
          )}

          {/* Milestone Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.progress.milestones.map((milestone) => {
              const badge = getStatusBadge(milestone.status);
              const BadgeIcon = badge.icon;
              return (
                <div
                  key={milestone.id}
                  className="p-5 rounded-2xl bg-surface-cardLight border border-border-light/80 hover:border-accent-light/50 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300 space-y-3 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2.5 flex-wrap sm:flex-nowrap">
                    <h3 className="font-anek text-base font-bold text-primary-light">
                      {lang === 'bn' ? milestone.titleBn : milestone.titleEn}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border shrink-0 ${badge.className}`}
                    >
                      <BadgeIcon className="h-3 w-3" />
                      <span>{badge.label}</span>
                    </span>
                  </div>
                  <p className="font-hind text-xs text-secondary-light leading-relaxed">
                    {lang === 'bn'
                      ? milestone.descriptionBn
                      : milestone.descriptionEn}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: WHAT PEOPLE WILL GAIN FROM THE APP                            */}
        {/* ========================================================================= */}
        <section aria-labelledby="benefits-heading" className="space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <h2
              id="benefits-heading"
              className="font-anek text-2xl sm:text-3xl font-extrabold text-primary-light"
            >
              {lang === 'bn'
                ? content.benefits.headingBn
                : content.benefits.headingEn}
            </h2>
            <p className="font-hind text-sm text-secondary-light leading-relaxed">
              {lang === 'bn'
                ? content.benefits.subheadingBn
                : content.benefits.subheadingEn}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {content.benefits.items.map((item) => {
              const IconComp = getBenefitIcon(item.iconName);
              return (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-surface-light border border-border-light/80 hover:border-accent-light/50 hover:-translate-y-1 hover:shadow-sm transition-all duration-300 space-y-3.5 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-accent-light/10 border border-accent-light/20 flex items-center justify-center text-accent-light">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent-light/10 text-accent-light border border-accent-light/20">
                      {lang === 'bn' ? item.badgeBn : item.badgeEn}
                    </span>
                  </div>

                  <h3 className="font-anek text-lg font-bold text-primary-light">
                    {lang === 'bn' ? item.titleBn : item.titleEn}
                  </h3>

                  <p className="font-hind text-xs sm:text-sm text-secondary-light leading-relaxed">
                    {lang === 'bn' ? item.descriptionBn : item.descriptionEn}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: FREQUENTLY ASKED QUESTIONS                                    */}
        {/* ========================================================================= */}
        <section aria-labelledby="faq-heading" className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-light uppercase tracking-wider font-cinzel">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>{t('প্রশ্নোত্তর', 'FAQ')}</span>
            </div>
            <h2
              id="faq-heading"
              className="font-anek text-2xl sm:text-3xl font-extrabold text-primary-light"
            >
              {lang === 'bn' ? content.faqs.headingBn : content.faqs.headingEn}
            </h2>
          </div>

          <div className="space-y-3">
            {content.faqs.items.map((faq) => (
              <details
                key={faq.id}
                className="group rounded-2xl border border-border-light/80 bg-surface-light p-4 sm:p-5 transition-all open:bg-surface-cardLight"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-anek text-sm sm:text-base font-bold text-primary-light">
                  <span>
                    {lang === 'bn' ? faq.questionBn : faq.questionEn}
                  </span>
                  <ChevronDown className="h-4 w-4 text-secondary-light group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <div className="pt-3 border-t border-border-light/40 mt-3 font-hind text-xs sm:text-sm text-secondary-light leading-relaxed">
                  {lang === 'bn' ? faq.answerBn : faq.answerEn}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: FINAL CTA BANNER (USE ONLINE ASSISTANT TODAY)                 */}
        {/* ========================================================================= */}
        <section
          aria-labelledby="cta-heading"
          className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-surface-light via-surface-cardLight to-surface-light border border-accent-light/30 shadow-md text-center space-y-5"
        >
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-accent-light/15 text-accent-light mx-auto">
            <Sparkles className="h-6 w-6" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2
              id="cta-heading"
              className="font-anek text-2xl sm:text-3xl font-extrabold text-primary-light"
            >
              {lang === 'bn'
                ? content.finalCta.headingBn
                : content.finalCta.headingEn}
            </h2>
            <p className="font-hind text-xs sm:text-sm text-secondary-light leading-relaxed">
              {lang === 'bn'
                ? content.finalCta.descriptionBn
                : content.finalCta.descriptionEn}
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/ask"
              className="bracket-btn inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs sm:text-sm font-bold tracking-wider"
            >
              <span>
                {lang === 'bn' ? content.finalCta.ctaBn : content.finalCta.ctaEn}
              </span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: TECHNICAL SPECIFICATIONS & DEVICE COMPATIBILITY               */}
        {/* ========================================================================= */}
        {content.experimentalRelease.enabled && (
          <section aria-labelledby="tech-details-heading" className="pt-4">
            <details
              className="group border border-border-light/90 rounded-3xl bg-surface-light/80 p-5 sm:p-7 transition-all open:bg-surface-light open:shadow-sm"
              open
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none select-none">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="h-8 w-8 rounded-lg bg-accent-light/10 border border-accent-light/20 flex items-center justify-center text-accent-light shrink-0">
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <div>
                    <span
                      id="tech-details-heading"
                      className="font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-light group-hover:text-accent-light transition-colors"
                    >
                      {t(
                        'কারিগরি তথ্য ও ডিভাইস সামঞ্জস্যতা (Device Compatibility & Tech Specs)',
                        'Technical Specifications & Hardware Compatibility'
                      )}
                    </span>
                    <span className="block text-[11px] text-secondary-light font-hind">
                      {t('নভেম্বর ২০২৬ অডিট · ১,০৪৬ ধারা, ৪৯ আইন ও ১০ ড্রাফট ইঞ্জিন স্পেসিফিকেশন', 'November 2026 Audit · 1,046 provisions, 49 statutes & 10 draft engine specifications')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[11px] font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                    </span>
                    <span>{t('ভেরিফাইড অফলাইন ইঞ্জিন', 'Verified Offline Engine')}</span>
                  </div>
                  <ChevronDown className="h-5 w-5 text-secondary-light group-open:rotate-180 transition-transform duration-200" />
                </div>
              </summary>

              <div className="pt-6 mt-5 border-t border-border-light/70 space-y-6 text-xs font-hind">
                
                {/* Advisory / Architecture Note */}
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-300/80 text-amber-950 space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-900">
                    <AlertTriangle className="h-4 w-4 text-amber-800 shrink-0" />
                    <span>
                      {t(
                        'স্বল্প মেমোরি ও শতভাগ অফলাইন আর্কিটেকচার অডিট নোট',
                        'Low-Memory & 100% Offline Architecture Audit Note'
                      )}
                    </span>
                  </div>
                  <p className="leading-relaxed text-xs text-amber-900/90 font-hind">
                    {t(
                      'MyLaws অ্যান্ড্রয়েড অ্যাপটি বিশেষভাবে অপটিমাইজ করা হয়েছে যাতে কোনো দামি ফোন বা অতিরিক্ত র‍্যাম ছাড়াই কমদামি ডিভাইসে শতভাগ অফলাইনে কাজ করতে পারে। নভেম্বর ২০২৬ অডিট অনুযায়ী মোট ১,০৪৬টি সংবিধিবদ্ধ ধারা, ৪৯টি আইন এবং ১০টি স্ট্যান্ডার্ডাইজড ড্রাফট টেমপ্লেট সম্পূর্ণ ডিভাইসে প্রি-ইনডেক্সড রয়েছে।',
                      'The MyLaws Android application is engineered for zero-lag execution on budget low-RAM devices without cloud dependency. The November 2026 legal corpus packages 1,046 statutory provisions across 49 Bangladesh statutes and 10 standardized legal draft templates fully pre-indexed on-device.'
                    )}
                  </p>
                </div>

                {/* 4 Core Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pillar 1: Legal Database & Corpus */}
                  <div className="p-4 rounded-2xl bg-surface-cardLight border border-border-light/80 hover:border-accent-light/50 transition-all duration-200 space-y-2.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary-light flex items-center gap-2 text-xs sm:text-sm">
                        <BookOpen className="h-4 w-4 text-accent-light shrink-0" />
                        <span>{t('আইনি ডাটাবেজ ও ড্রাফট ইঞ্জিন', 'Legal Corpus & Draft Engine')}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-accent-light/10 text-accent-light font-mono text-[10px] font-bold">
                        v2026.11.01
                      </span>
                    </div>
                    <p className="text-secondary-light leading-relaxed text-xs">
                      {t(
                        '৭টি প্রধান শাখার ১,০৪৬টি বিধান (শ্রম, সাইবার, ফৌজদারি, ভোক্তা, ভূমি অপরাধ ২০২৩, পারিবারিক আদালত ও সংবিধান) এবং ১০টি কোর্ট ও প্রশাসনিক প্রমিত আবেদন ফরম্যাট।',
                        '1,046 verified provisions across 7 core branches (Labour, Cyber, Criminal, Consumer, Land Crime 2023, Family, Constitution) and 10 standardized court/agency templates.'
                      )}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded-md bg-surface-light border border-border-light text-[10px] font-semibold text-secondary-light">
                        {t('১,০৪৬ ধারা', '1,046 Sections')}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-surface-light border border-border-light text-[10px] font-semibold text-secondary-light">
                        {t('৪৯টি আইন', '49 Statutes')}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-surface-light border border-border-light text-[10px] font-semibold text-secondary-light">
                        {t('১০টি ড্রাফট', '10 Drafts')}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-surface-light border border-border-light text-[10px] font-semibold text-secondary-light">
                        {t('গেজেট সাইটেশন', 'Official Gazette')}
                      </span>
                    </div>
                  </div>

                  {/* Pillar 2: Offline Index & Search Engine */}
                  <div className="p-4 rounded-2xl bg-surface-cardLight border border-border-light/80 hover:border-accent-light/50 transition-all duration-200 space-y-2.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary-light flex items-center gap-2 text-xs sm:text-sm">
                        <HardDrive className="h-4 w-4 text-accent-light shrink-0" />
                        <span>{t('অন-ডিভাইস অফলাইন সার্চ ইঞ্জিন', 'On-Device Offline Search Engine')}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-accent-light/10 text-accent-light font-mono text-[10px] font-bold">
                        FTS-BM25 v2
                      </span>
                    </div>
                    <p className="text-secondary-light leading-relaxed text-xs">
                      {t(
                        'SQLite Room ডেটাবেজ ও FTS-BM25 ইন-ডিভাইস ইনডেক্স। ইন্টারনেট বন্ধ থাকলেও < ৫০ মিলিসেকেন্ডে তাৎক্ষণিক বাংলা আইনি ধারা ও তামাদি সময়সীমা খুঁজে দেয়।',
                        'In-device SQLite Room DB with FTS-BM25 full-text indexing. Delivers sub-50ms query responses without internet or remote server pings.'
                      )}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded-md bg-surface-light border border-border-light text-[10px] font-semibold text-secondary-light">
                        {t('০ মি.সে. নেটওয়ার্ক ল্যাগ', '0ms Network Lag')}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-surface-light border border-border-light text-[10px] font-semibold text-secondary-light">
                        {t('২.৫ MB ডেটা প্যাক', '2.5 MB DB Size')}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-surface-light border border-border-light text-[10px] font-semibold text-secondary-light">
                        {t('সম্পূর্ণ অফলাইন', '100% Offline')}
                      </span>
                    </div>
                  </div>

                  {/* Pillar 3: Hardware Compatibility & RAM */}
                  <div className="p-4 rounded-2xl bg-surface-cardLight border border-border-light/80 hover:border-accent-light/50 transition-all duration-200 space-y-2.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary-light flex items-center gap-2 text-xs sm:text-sm">
                        <Cpu className="h-4 w-4 text-accent-light shrink-0" />
                        <span>{t('ডিভাইস ও র‍্যাম সামঞ্জস্যতা', 'RAM & Hardware Specs')}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 font-mono text-[10px] font-bold">
                        1 GB / 2 GB OK
                      </span>
                    </div>
                    <p className="text-secondary-light leading-relaxed text-xs">
                      {lang === 'bn'
                        ? 'সুপার-লাইটওয়েট মেমোরি টিউনিং: ১ জিবি ও ২ জিবি র‍্যামের স্বল্পমূল্যের বাজেট ফোনেও (Android Go) মসৃণ চলবে (এবং ৪ জিবি/৮ জিবি সব ফোনে)।'
                        : content.experimentalRelease.manifest.recommendedRam}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded-md bg-surface-light border border-border-light text-[10px] font-semibold text-secondary-light">
                        {t('ন্যূনতম: Android 8.0 (API 26)', 'Min: Android 8.0 (API 26)')}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-surface-light border border-border-light text-[10px] font-semibold text-secondary-light">
                        {t('টার্গেট: Android 15 (API 35)', 'Target: Android 15 (API 35)')}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-surface-light border border-border-light text-[10px] font-semibold text-secondary-light">
                        &lt; 45 MB RSS Memory
                      </span>
                    </div>
                  </div>

                  {/* Pillar 4: Privacy & Cryptographic Verification */}
                  <div className="p-4 rounded-2xl bg-surface-cardLight border border-border-light/80 hover:border-accent-light/50 transition-all duration-200 space-y-2.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary-light flex items-center gap-2 text-xs sm:text-sm">
                        <ShieldCheck className="h-4 w-4 text-accent-light shrink-0" />
                        <span>{t('গোপনীয়তা ও সিকিউরিটি', 'Privacy & Cryptographic Checksum')}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 font-mono text-[10px] font-bold">
                        Zero Telemetry
                      </span>
                    </div>
                    <p className="text-secondary-light leading-relaxed text-xs">
                      {t(
                        'কোনো ক্লাউড ট্র্যাকিং নেই। আপনার ব্যক্তিগত তথ্যের খসড়া ও আইনি অনুসন্ধান সম্পূর্ণ আপনার ডিভাইসেই থাকে। প্যাকেজটি ক্রিপ্টোগ্রাফিকভাবে স্বাক্ষরিত।',
                        'Zero cloud analytics or query logging. Personal facts and draft files remain strictly on handset. Binaries are cryptographically verified.'
                      )}
                    </p>
                    <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-surface-light border border-border-light/70 font-mono text-[10px] text-primary-light">
                      <span className="truncate">
                        SHA-256: {content.experimentalRelease.manifest.sha256Checksum?.substring(0, 24)}...
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyChecksum}
                        aria-label={t('চেকসাম কপি করুন', 'Copy Checksum')}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-cardLight hover:bg-border-light/40 border border-border-light text-secondary-light hover:text-primary-light transition-colors text-[10px] shrink-0 font-hind font-semibold"
                      >
                        {copiedChecksum ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span className="text-emerald-700">{t('কপি হয়েছে', 'Copied')}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-accent-light" />
                            <span>{t('কপি', 'Copy')}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tested Hardware Targets */}
                <div className="p-4 sm:p-5 rounded-2xl bg-surface-cardLight border border-border-light/80 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary-light font-cinzel">
                      {t('বাস্তব পরীক্ষিত ডিভাইস ও ওএস (Verified Hardware Testing)', 'Tested Hardware Environments')}
                    </h4>
                    <span className="text-[11px] text-secondary-light font-medium">
                      {t('৪টি ভিন্ন ক্যাটাগরিতে পরীক্ষিত', 'Verified across 4 target tiers')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-secondary-light">
                    {content.experimentalRelease.manifest.testedDevices.map((dev: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-surface-light border border-border-light/60">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug text-primary-light">{dev}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secondary Experimental Action & Build Metadata */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border-light/70">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-primary-light text-sm">
                        MyLaws v{content.experimentalRelease.manifest.version}
                      </p>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 text-[10px] font-semibold border border-emerald-500/20">
                        {t('যাচাইকৃত বাইনারি', 'Signed Binary')}
                      </span>
                    </div>
                    <p className="text-[11px] text-secondary-light">
                      {t('বিল্ড তারিখ: ', 'Build Date: ')}
                      {content.experimentalRelease.manifest.releaseDate} · Build #{content.experimentalRelease.manifest.versionCode} · {t('প্যাকেজ সাইজ: ১০.৩ MB', 'Size: 10.3 MB')}
                    </p>
                  </div>

                  <a
                    href={content.experimentalRelease.manifest.apkUrl || '#'}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border-light bg-surface-cardLight hover:bg-bg-light hover:border-accent-light/50 text-secondary-light hover:text-primary-light text-xs font-bold transition-all shadow-xs"
                  >
                    <Download className="h-4 w-4 text-accent-light" />
                    <span>
                      {t('পরীক্ষামূলক প্রিভিউ ডাউনলোড করুন (~১০.৩ MB)', 'Try experimental preview (~10.3 MB)')}
                    </span>
                  </a>
                </div>

              </div>
            </details>
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
}
