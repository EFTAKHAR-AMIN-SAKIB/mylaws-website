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
  FileCode,
  AlertTriangle,
  Layers,
} from 'lucide-react';

export default function ApplicationPage() {
  const { lang, t } = useApp();
  const content = applicationPageContent;
  const progressPercent = content.progress.estimatedPercentage;

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

      <main className="flex-1 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-16 sm:space-y-20">
        
        {/* ========================================================================= */}
        {/* SECTION 1 & 2: BENEFITS-LED HERO WITH LIGHTWEIGHT PHONE PREVIEW           */}
        {/* ========================================================================= */}
        <section aria-labelledby="hero-heading" className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Benefits-Led Copy & Primary CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light border border-accent-light/20 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-light opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-light"></span>
                </span>
                <span className="font-medium">
                  {lang === 'bn' ? content.meta.statusPillBn : content.meta.statusPillEn}
                </span>
              </div>

              {/* Main Headline */}
              <h1
                id="hero-heading"
                className={`font-anek font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary-light tracking-tight leading-[1.18]`}
              >
                {lang === 'bn' ? content.meta.headlineBn : content.meta.headlineEn}
              </h1>

              {/* Description */}
              <p className="font-hind text-base sm:text-lg text-secondary-light leading-relaxed max-w-2xl">
                {lang === 'bn' ? content.meta.descriptionBn : content.meta.descriptionEn}
              </p>

              {/* Availability Note */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-light border border-border-light/70 text-xs text-secondary-light font-hind">
                <Info className="h-4 w-4 text-accent-light shrink-0" />
                <span>
                  {lang === 'bn'
                    ? content.meta.availabilityNoteBn
                    : content.meta.availabilityNoteEn}
                </span>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  href="/ask"
                  className="bracket-btn inline-flex items-center justify-center gap-2.5 px-6 py-3 text-xs sm:text-sm font-bold tracking-wider text-center"
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
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border-light/90 bg-surface-light hover:bg-surface-cardLight text-secondary-light hover:text-primary-light text-xs sm:text-sm font-semibold transition-all shadow-sm"
                >
                  <span>
                    {lang === 'bn'
                      ? content.meta.secondaryCtaBn
                      : content.meta.secondaryCtaEn}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Honest Illustrative Phone Preview */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                className="w-full max-w-[320px] rounded-[2.5rem] border-[6px] border-border-light/90 bg-surface-cardLight shadow-xl overflow-hidden transition-all hover:shadow-2xl"
                aria-hidden="true"
              >
                {/* Phone Speaker Notch */}
                <div className="pt-3 pb-2 px-6 flex justify-center items-center bg-surface-light/80 border-b border-border-light/40">
                  <div className="h-1.5 w-16 bg-border-light rounded-full" />
                </div>

                {/* Mini App Bar */}
                <div className="px-4 py-3 bg-bg-light/80 border-b border-border-light/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-accent-light/15 flex items-center justify-center text-accent-light font-bold text-xs">
                      ⚖
                    </div>
                    <span className="font-cinzel text-xs font-bold tracking-wider text-primary-light">
                      MyLaws
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-accent-light px-2 py-0.5 rounded-full bg-accent-light/10 border border-accent-light/20">
                    {lang === 'bn' ? 'নমুনা' : 'Preview'}
                  </span>
                </div>

                {/* Mini Chat Stream Body */}
                <div className="p-4 space-y-3.5 bg-bg-light/40 font-hind text-xs min-h-[340px]">
                  
                  {/* User Message Bubble */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-accent-light/15 border border-accent-light/25 text-primary-light p-3 shadow-xs">
                      <p className="font-medium text-[11px] leading-relaxed">
                        {lang === 'bn'
                          ? content.preview.sampleQueryBn
                          : content.preview.sampleQueryEn}
                      </p>
                    </div>
                  </div>

                  {/* Clarification Step */}
                  <div className="flex justify-start">
                    <div className="max-w-[90%] rounded-2xl rounded-tl-xs bg-surface-light border border-border-light/80 text-primary-light p-3 shadow-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-semibold text-accent-light">
                        <Sparkles className="h-3 w-3" />
                        <span>{t('সহকারী জিজ্ঞাসা', 'Clarification')}</span>
                      </div>
                      <p className="text-[11px] text-secondary-light leading-relaxed">
                        {lang === 'bn'
                          ? content.preview.sampleClarificationBn
                          : content.preview.sampleClarificationEn}
                      </p>
                    </div>
                  </div>

                  {/* Grounded Next-Step Card */}
                  <div className="rounded-xl bg-surface-cardLight border border-border-light p-3 shadow-sm space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-900">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                      <span>{t('প্রাসঙ্গিক আইনি বিধান', 'Relevant Statutory Rule')}</span>
                    </div>
                    <p className="text-[11px] text-primary-light font-medium leading-relaxed">
                      {lang === 'bn'
                        ? content.preview.sampleNextStepBn
                        : content.preview.sampleNextStepEn}
                    </p>
                  </div>
                </div>

                {/* Bottom Bar indicator */}
                <div className="py-2.5 flex justify-center bg-surface-light/80 border-t border-border-light/40">
                  <div className="h-1 w-24 bg-border-light/80 rounded-full" />
                </div>
              </div>

              {/* Honest Preview Caption */}
              <div className="mt-3 text-center space-y-1 max-w-xs">
                <span className="inline-block text-[11px] font-semibold text-accent-light">
                  {lang === 'bn' ? content.preview.badgeBn : content.preview.badgeEn}
                </span>
                <p className="text-[11px] text-secondary-light font-hind">
                  {lang === 'bn' ? content.preview.captionBn : content.preview.captionEn}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: DEVELOPMENT PROGRESS USERS CAN UNDERSTAND                     */}
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
                {t('সামগ্রিক উন্নয়ন অগ্রগতি (আনুমানিক)', 'Overall development progress (Estimated)')}
              </span>
              <span className="text-base sm:text-xl font-bold font-anek text-accent-light shrink-0">
                {lang === 'bn'
                  ? `আনুমানিক ${progressPercent}%`
                  : `About ${progressPercent}%`}
              </span>
            </div>

            <div
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={
                lang === 'bn'
                  ? `অ্যান্ড্রয়েড অ্যাপের সামগ্রিক উন্নয়ন অগ্রগতি আনুমানিক ${progressPercent} শতাংশ`
                  : `Android app overall development progress: estimated about ${progressPercent} percent`
              }
              className="h-3 w-full bg-border-light/50 rounded-full overflow-hidden p-0.5 border border-border-light/70"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-light via-accent-gold to-accent-light transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-secondary-light font-hind">
              <p>
                {lang === 'bn'
                  ? content.progress.estimateNoteBn
                  : content.progress.estimateNoteEn}
              </p>
              {content.progress.lastUpdated && (
                <p className="shrink-0 font-medium">
                  {t('সর্বশেষ হালনাগাদ: ', 'Last updated: ')}
                  {formatFriendlyDate(content.progress.lastUpdated)}
                </p>
              )}
            </div>
          </div>

          {/* Latest Engineering Note */}
          {content.progress.latestUpdateNote && (
            <div className="p-4 rounded-2xl bg-bg-light/70 border border-border-light/80 text-xs space-y-1.5 font-hind">
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
                  className="p-5 rounded-2xl bg-surface-cardLight border border-border-light/80 hover:border-border-light transition-all space-y-3 shadow-xs"
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
        {/* SECTION 4: WHAT PEOPLE WILL GAIN FROM THE APP                            */}
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
                  className="p-6 rounded-2xl bg-surface-light border border-border-light/80 hover:border-accent-light/40 transition-all space-y-3.5 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-accent-light/10 border border-accent-light/20 flex items-center justify-center text-accent-light">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary-light/10 text-secondary-light border border-secondary-light/20">
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
        {/* SECTION 5: FREQUENTLY ASKED QUESTIONS                                    */}
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
        {/* SECTION 6: FINAL CTA BANNER (USE ONLINE ASSISTANT TODAY)                 */}
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
        {/* SECTION 7: TECHNICAL & DEVELOPER PREVIEW DISCLOSURE                      */}
        {/* ========================================================================= */}
        {content.experimentalRelease.enabled && (
          <section aria-labelledby="tech-details-heading" className="pt-4">
            <details className="group border border-border-light/80 rounded-2xl bg-surface-light/60 p-5 sm:p-6 transition-all open:bg-surface-light">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-accent-light" />
                  <span
                    id="tech-details-heading"
                    className="font-cinzel text-xs font-bold uppercase tracking-wider text-secondary-light group-hover:text-primary-light transition-colors"
                  >
                    {t(
                      'কারিগরি তথ্য ও পরীক্ষামূলক প্রিভিউ বিবরণী',
                      'Technical & Developer Preview Details'
                    )}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-secondary-light group-open:rotate-180 transition-transform" />
              </summary>

              <div className="pt-5 mt-4 border-t border-border-light/60 space-y-6 text-xs font-hind">
                
                {/* Advisory Notice */}
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300 text-amber-950 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <AlertTriangle className="h-4 w-4 text-amber-800 shrink-0" />
                    <span>
                      {t(
                        'পরীক্ষামূলক প্রিভিউ সংক্রান্ত সতর্কতা',
                        'Notice for Developer & Experimental Builds'
                      )}
                    </span>
                  </div>
                  <p className="leading-relaxed text-[11px]">
                    {t(
                      'এটি সাধারণ ব্যবহারকারীদের জন্য চূড়ান্ত সংস্করণ নয়। অভ্যন্তরীণ কারিগরি পরীক্ষার জন্য প্রস্তুতকৃত প্রাথমিক বিল্ড। সাইডলোড করার পূর্বে ডিভাইস নিরাপত্তা বিবেচনা করুন।',
                      'This is an early development build for engineering evaluation. Sideloading is intended for technical contributors and is not a general public release.'
                    )}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-3.5 rounded-xl bg-surface-cardLight border border-border-light space-y-1">
                    <span className="font-semibold text-secondary-light flex items-center gap-1.5">
                      <Cpu className="h-3.5 w-3.5 text-accent-light" />
                      <span>{t('লক্ষ্যমাত্রা RAM', 'Target RAM')}</span>
                    </span>
                    <p className="text-primary-light font-medium">
                      {content.experimentalRelease.manifest.recommendedRam}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-cardLight border border-border-light space-y-1">
                    <span className="font-semibold text-secondary-light flex items-center gap-1.5">
                      <Smartphone className="h-3.5 w-3.5 text-accent-light" />
                      <span>{t('ন্যূনতম অ্যান্ড্রয়েড ভার্সন', 'Minimum Target OS')}</span>
                    </span>
                    <p className="text-primary-light font-medium">
                      {content.experimentalRelease.manifest.minimumAndroidVersion}
                    </p>
                  </div>

                  <div className="sm:col-span-2 p-3.5 rounded-xl bg-surface-cardLight border border-border-light space-y-1">
                    <span className="font-semibold text-secondary-light flex items-center gap-1.5">
                      <FileCode className="h-3.5 w-3.5 text-accent-light" />
                      <span>SHA-256 Checksum</span>
                    </span>
                    <p className="font-mono text-[11px] text-primary-light break-all">
                      {content.experimentalRelease.manifest.sha256Checksum}
                    </p>
                  </div>
                </div>

                {/* Tested Hardware Targets */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary-light">
                    {t('পরীক্ষিত হার্ডওয়্যার পরিবেশ (Tested Devices)', 'Tested Hardware Environments')}
                  </h4>
                  <ul className="space-y-1 text-xs text-secondary-light">
                    {content.experimentalRelease.manifest.testedDevices.map((dev: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-800 shrink-0" />
                        <span>{dev}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Secondary Experimental Action */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border-light/60">
                  <div>
                    <p className="font-bold text-primary-light">
                      MyLaws v{content.experimentalRelease.manifest.version}
                    </p>
                    <p className="text-[11px] text-secondary-light">
                      {t('বিল্ড তারিখ: ', 'Build Date: ')}
                      {content.experimentalRelease.manifest.releaseDate} · Build #{content.experimentalRelease.manifest.versionCode}
                    </p>
                  </div>

                  <a
                    href={content.experimentalRelease.manifest.apkUrl || '#'}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-border-light bg-surface-cardLight hover:bg-bg-light text-secondary-light hover:text-primary-light text-xs font-semibold transition-all shadow-xs"
                  >
                    <Download className="h-3.5 w-3.5 text-accent-light" />
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
