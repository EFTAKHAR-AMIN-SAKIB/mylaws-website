'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useApp } from './AppContext';
import {
  Hourglass,
  X,
  FileText,
  BookOpen,
  Sparkles,
  Calendar,
  CheckCircle2,
  Scale,
} from 'lucide-react';

export interface QuotaExceededModalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyLimit?: number;
}

export function QuotaExceededModal({
  isOpen,
  onClose,
  dailyLimit = 10,
}: QuotaExceededModalProps) {
  const { t } = useApp();

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const formattedLimit = `${dailyLimit}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quota-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md p-6 sm:p-7 rounded-3xl border border-amber-500/35 bg-surface-cardLight shadow-2xl text-center space-y-5 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Gold Glow at Top */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Right Close 'X' Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-secondary-light hover:text-primary-light hover:bg-border-light/40 transition-colors cursor-pointer"
          title={t('বন্ধ করুন', 'Close')}
          aria-label={t('বন্ধ করুন', 'Close')}
        >
          <X className="h-4 w-4" />
        </button>

        {/* Central Graphic Emblem */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-inner">
          <Hourglass className="h-8 w-8 stroke-[2.2] animate-pulse" />
        </div>

        {/* Title & Core Friendly Message */}
        <div className="space-y-2">
          <h2
            id="quota-modal-title"
            className="font-cinzel text-xl sm:text-2xl font-bold text-primary-light tracking-wide"
          >
            {t('আজকের দৈনিক কোটা শেষ', 'Daily Limit Reached')}
          </h2>
          <p className="font-hind text-xs sm:text-sm text-secondary-light leading-relaxed max-w-sm mx-auto">
            {t(
              `আপনি আজকের জন্য নির্ধারিত ${formattedLimit}টি আইনি প্রশ্নের কোটা সম্পূর্ণ ব্যবহার করেছেন। গুণগত মান ও সুষ্ঠু সেবা নিশ্চিত করতে প্রতি ব্যবহারকারী দৈনিক ${formattedLimit}টি প্রশ্ন পাঠাতে পারেন।`,
              `You have reached your daily limit of ${formattedLimit} legal inquiries for today. Please check back tomorrow when your quota automatically refreshes.`
            )}
          </p>
        </div>

        {/* Quota Meter Box */}
        <div className="p-4 rounded-2xl border border-border-light bg-bg-light/80 text-left space-y-2.5">
          <div className="flex items-center justify-between text-xs font-hind">
            <span className="font-semibold text-primary-light">
              {t(`ব্যবহৃত প্রশ্ন: ${formattedLimit} / ${formattedLimit}টি`, `Inquiries Used: ${formattedLimit} / ${formattedLimit}`)}
            </span>
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
              {t('১০০% পূর্ণ', '100% Reached')}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full rounded-full bg-border-light/80 overflow-hidden shadow-inner">
            <div className="h-full bg-amber-500 rounded-full w-full" />
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-secondary-light font-hind pt-1">
            <Calendar className="h-3.5 w-3.5 text-accent-light shrink-0" />
            <span>
              {t(
                'পরবর্তী কোটা নবায়ন: প্রতিদিন রাত ১২:০০ টা (মধ্যরাত)',
                'Next quota refresh: Tonight at 12:00 AM (Midnight)'
              )}
            </span>
          </div>
        </div>

        {/* Alternative Free Actions */}
        <div className="text-left space-y-2 pt-1">
          <span className="text-[11px] font-cinzel font-bold text-secondary-light/80 tracking-wider uppercase block">
            {t('অন্যান্য সুবিধা দেখুন:', 'Available in the meantime:')}
          </span>

          <div className="grid grid-cols-2 gap-2 text-xs font-hind">
            <Link
              href="/drafts"
              onClick={onClose}
              className="p-2.5 rounded-xl border border-border-light bg-surface-light hover:border-accent-light/50 flex flex-col gap-1 transition-all group"
            >
              <div className="flex items-center gap-1.5 text-accent-light font-semibold text-xs">
                <FileText className="h-3.5 w-3.5" />
                <span>{t('খসড়া স্টুডিও', 'Draft Studio')}</span>
              </div>
              <span className="text-[10px] text-secondary-light line-clamp-1">
                {t('আদালত ও জিডি আবেদন', 'Court & GD Petitions')}
              </span>
            </Link>

            <Link
              href="/sources"
              onClick={onClose}
              className="p-2.5 rounded-xl border border-border-light bg-surface-light hover:border-accent-light/50 flex flex-col gap-1 transition-all group"
            >
              <div className="flex items-center gap-1.5 text-accent-light font-semibold text-xs">
                <BookOpen className="h-3.5 w-3.5" />
                <span>{t('আইনি উৎস', 'Legal Sources')}</span>
              </div>
              <span className="text-[10px] text-secondary-light line-clamp-1">
                {t('মূল সরকারি গেজেট ও আইন', 'Official Gazettes & Acts')}
              </span>
            </Link>
          </div>
        </div>

        {/* Primary Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 sm:py-3 rounded-xl bg-accent-light hover:bg-accent-light/90 text-white font-semibold font-hind text-xs sm:text-sm shadow-md active:scale-98 transition-all cursor-pointer"
        >
          {t('বুঝেছি, আগামীকাল আবার চেষ্টা করব', 'Understood, I will wait for tomorrow')}
        </button>
      </div>
    </div>
  );
}
