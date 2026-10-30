'use client';

import React from 'react';
import { useApp } from './AppContext';
import { provisions, type Provision } from '@/data/legal';
import { X, ExternalLink, ShieldCheck, AlertCircle, Calendar } from 'lucide-react';

interface SourceDrawerProps {
  sourceId: string | null;
  onClose: () => void;
}

export function SourceDrawer({ sourceId, onClose }: SourceDrawerProps) {
  const { lang, t } = useApp();

  if (!sourceId) return null;

  const provision = provisions.find((p) => p.id === sourceId);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl rounded-t-3xl sm:rounded-2xl border-t sm:border border-border-light bg-surface-light shadow-2xl overflow-hidden animate-bottom-sheet sm:animate-in sm:zoom-in-95 max-h-[85vh] sm:max-h-[90vh] flex flex-col pb-safe">
        {/* Mobile Drag Indicator Bar */}
        <div className="w-10 h-1 rounded-full bg-secondary-light/30 mx-auto mt-2.5 -mb-1 sm:hidden shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-light/70 px-5 sm:px-6 py-3.5 sm:py-4 bg-bg-light/50 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-accent-light" />
            <h3 className="text-sm font-bold text-primary-light">
              {t('যাচাইকৃত মূল আইনি বিধান', 'Verified Legal Provision')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-secondary-light hover:bg-border-light/40 active-press transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          {provision ? (
            <>
              {/* Instrument & Section Title */}
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-light dark:text-accent-dark">
                  {provision.act[lang]}
                </span>
                <h4 className="text-lg font-bold font-display text-primary-light dark:text-primary-dark mt-0.5">
                  {provision.section} — {provision.title[lang]}
                </h4>
              </div>

              {/* Verbatim Excerpt */}
              <div className="p-4 rounded-xl bg-bg-light dark:bg-bg-dark border-l-4 border-accent-light dark:border-accent-dark space-y-1.5">
                <span className="text-[10px] uppercase font-semibold text-secondary-light dark:text-secondary-dark tracking-wider">
                  {t('সরকারি গেজেট/পোর্টাল থেকে মূল উদ্ধৃতি (Verbatim Excerpt):', 'Verbatim Excerpt from Official Portal:')}
                </span>
                <p className="font-serif text-sm italic leading-relaxed text-primary-light dark:text-primary-dark">
                  &ldquo;{provision.quote}&rdquo;
                </p>
              </div>

              {/* Plain Language Explanation */}
              <div className="space-y-1 text-xs">
                <h5 className="font-semibold text-primary-light dark:text-primary-dark">
                  {t('সহজ ভাষার বিশ্লেষণ:', 'Plain Language Explanation:')}
                </h5>
                <p className="text-secondary-light dark:text-secondary-dark leading-relaxed">
                  {provision.explanation[lang]}
                </p>
              </div>

              {/* Caution & Boundary */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-accent-light/5 dark:bg-accent-dark/10 border border-accent-light/20 dark:border-accent-dark/20 text-xs">
                <AlertCircle className="h-4 w-4 text-accent-light dark:text-accent-dark shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold text-primary-light dark:text-primary-dark">
                    {t('আইনি সীমাবদ্ধতা ও সতর্কতা:', 'Legal Boundary & Caveat:')}
                  </span>
                  <p className="text-secondary-light dark:text-secondary-dark leading-relaxed">
                    {provision.caution[lang]}
                  </p>
                </div>
              </div>

              {/* Verification & Official Link */}
              <div className="pt-3 border-t border-border-light/60 dark:border-border-dark/60 flex flex-wrap items-center justify-between text-xs text-secondary-light dark:text-secondary-dark gap-2">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-accent-light dark:text-accent-dark" />
                  <span>
                    {t('সরকারি পোর্টাল দেখার তারিখ: ', 'Source consulted: ')}
                    <span className="font-medium text-primary-light dark:text-primary-dark">{provision.checkedOn}</span>
                  </span>
                </div>

                <a
                  href={provision.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-accent-light dark:text-accent-dark hover:underline"
                >
                  <span>{t('bdlaws সরকারি পোর্টালে সম্পূর্ণ পাঠ দেখুন', 'View on bdlaws Portal')}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-secondary-light dark:text-secondary-dark">
              <p>{t('উৎসটির বিস্তারিত তথ্য পাওয়া যায়নি।', 'Source details could not be found.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
