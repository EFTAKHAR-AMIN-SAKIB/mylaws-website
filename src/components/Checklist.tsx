'use client';

import React, { useState } from 'react';
import { useApp } from './AppContext';
import type { ChecklistStep } from '@/types/contracts';
import { CheckCircle2, Shield, Building, HelpCircle } from 'lucide-react';

interface ChecklistProps {
  caseId?: string;
  steps: ChecklistStep[];
  onOpenSource: (sourceId: string) => void;
  onOpenOffice: (officeId: string) => void;
  variant?: 'cards' | 'lineByLine';
  hideHeader?: boolean;
}

const toBanglaNum = (n: number) => n.toString().replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);

export function Checklist({
  caseId,
  steps,
  onOpenSource,
  onOpenOffice,
  variant = 'cards',
  hideHeader = false,
}: ChecklistProps) {
  const { t, lang } = useApp();
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  // Reset completion state when caseId changes so steps from a previous query don't bleed over
  React.useEffect(() => {
    setCompleted({});
  }, [caseId]);

  const toggle = (id: string) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!steps || steps.length === 0) return null;

  const completedCount = Object.values(completed).filter(Boolean).length;

  if (variant === 'lineByLine') {
    return (
      <div className="space-y-3">
        {!hideHeader && (
          <div className="flex items-center justify-between pb-1">
            <h4 className="font-anek text-sm sm:text-base font-bold text-primary-light flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0" />
              <span>{t('আপনি এখন যে পদক্ষেপ নিবেন:', 'Immediate Steps You Should Take:')}</span>
            </h4>
            <span className="text-xs text-secondary-light font-hind">
              {lang === 'bn' ? toBanglaNum(completedCount) : completedCount} / {lang === 'bn' ? toBanglaNum(steps.length) : steps.length} {t('সম্পন্ন', 'completed')}
            </span>
          </div>
        )}

        <div className="space-y-2.5">
          {steps.map((step, idx) => {
            const isDone = !!completed[step.id];
            const numLabel = lang === 'bn' ? `${toBanglaNum(idx + 1)}.` : `${idx + 1}.`;
            return (
              <div
                key={step.id}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                  isDone
                    ? 'bg-accent-light/10 border-accent-light/30'
                    : 'bg-bg-light/80 border-border-light/80 hover:border-accent-light/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id={`chk-${step.id}`}
                    checked={isDone}
                    onChange={() => toggle(step.id)}
                    className="mt-1 h-4 w-4 rounded accent-accent-light cursor-pointer shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-xs sm:text-sm text-accent-light font-anek shrink-0 mt-0.5">
                        {numLabel}
                      </span>
                      <label
                        htmlFor={`chk-${step.id}`}
                        className={`block text-xs sm:text-sm cursor-pointer leading-relaxed ${
                          isDone
                            ? 'line-through opacity-70 text-secondary-light'
                            : 'font-medium text-primary-light'
                        }`}
                      >
                        {step.text}
                      </label>
                    </div>

                    {/* Conditions & Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px]">
                      {step.condition && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-surface-light border border-border-light text-secondary-light">
                          <HelpCircle className="h-3 w-3 text-secondary-light/80" />
                          <span>{step.condition}</span>
                        </span>
                      )}

                      {/* Sources buttons */}
                      {step.sourceIds?.map((srcId) => (
                        <button
                          key={srcId}
                          type="button"
                          onClick={() => onOpenSource(srcId)}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-accent-light/10 text-accent-light border border-accent-light/20 hover:bg-accent-light hover:text-white transition-all font-cinzel font-medium tracking-wide cursor-pointer"
                        >
                          <Shield className="h-3 w-3" />
                          <span>{srcId}</span>
                        </button>
                      ))}

                      {/* Office button */}
                      {step.officeId && (
                        <button
                          key={step.officeId}
                          type="button"
                          onClick={() => onOpenOffice(step.officeId!)}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-accent-light/10 text-accent-light border border-accent-light/20 hover:bg-accent-light hover:text-white transition-all font-medium cursor-pointer"
                        >
                          <Building className="h-3 w-3" />
                          <span>{t('সরকারি দপ্তর ও হেল্পলাইন', 'Verified Office')}</span>
                        </button>
                      )}
                    </div>

                    {/* Evidence lists */}
                    {(step.requiredDocuments?.length || step.helpfulEvidence?.length) ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] text-secondary-light border-t border-border-light/60">
                        {step.requiredDocuments && step.requiredDocuments.length > 0 && (
                          <div>
                            <span className="font-semibold text-primary-light">
                              {t('প্রয়োজনীয় নথি: ', 'Required Docs: ')}
                            </span>
                            <span>{step.requiredDocuments.join(', ')}</span>
                          </div>
                        )}
                        {step.helpfulEvidence && step.helpfulEvidence.length > 0 && (
                          <div>
                            <span className="font-semibold text-primary-light">
                              {t('সহায়ক প্রমাণ: ', 'Helpful Evidence: ')}
                            </span>
                            <span>{step.helpfulEvidence.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <h3 className="font-cinzel text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-primary-light dark:text-accent-dark flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-accent-light dark:text-accent-dark" />
          <span>{t('আপনি এখন যা করতে পারেন (Action Checklist)', 'ACTION CHECKLIST')}</span>
        </h3>
        <span className="text-xs text-secondary-light dark:text-secondary-dark font-cinzel">
          {Object.values(completed).filter(Boolean).length} / {steps.length} {t('সম্পন্ন', 'COMPLETED')}
        </span>
      </div>

      <div className="space-y-3">
        {steps.map((step) => {
          const isDone = !!completed[step.id];
          return (
            <div
              key={step.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all shadow-sm ${
                isDone
                  ? 'bg-accent-light/10 border-accent-light/30 dark:bg-accent-dark/15 dark:border-accent-dark/30'
                  : 'bg-surface-cardLight border-border-light dark:bg-surface-cardDark dark:border-border-dark'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <input
                  type="checkbox"
                  id={`chk-${step.id}`}
                  checked={isDone}
                  onChange={() => toggle(step.id)}
                  className="mt-1 h-5 w-5 rounded-md accent-accent-light dark:accent-accent-dark cursor-pointer shrink-0"
                />
                <div className="flex-1 space-y-2.5">
                  <label
                    htmlFor={`chk-${step.id}`}
                    className={`block text-xs sm:text-sm cursor-pointer leading-relaxed ${
                      isDone
                        ? 'line-through opacity-70 text-secondary-light dark:text-secondary-dark'
                        : 'font-medium text-primary-light dark:text-primary-dark'
                    }`}
                  >
                    {step.text}
                  </label>

                  {/* Conditions & Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                    {step.condition && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark text-secondary-light dark:text-secondary-dark">
                        <HelpCircle className="h-3 w-3" />
                        <span>{step.condition}</span>
                      </span>
                    )}

                    {/* Sources buttons */}
                    {step.sourceIds?.map((srcId) => (
                      <button
                        key={srcId}
                        onClick={() => onOpenSource(srcId)}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-accent-light/10 dark:bg-accent-dark/15 text-accent-light dark:text-accent-dark border border-accent-light/20 dark:border-accent-dark/30 hover:underline font-cinzel font-medium tracking-wide"
                      >
                        <Shield className="h-3 w-3" />
                        <span>{srcId}</span>
                      </button>
                    ))}

                    {/* Office button */}
                    {step.officeId && (
                      <button
                        onClick={() => onOpenOffice(step.officeId!)}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-accent-light/10 dark:bg-accent-dark/15 text-accent-light dark:text-accent-dark border border-accent-light/20 dark:border-accent-dark/30 hover:underline font-medium"
                      >
                        <Building className="h-3 w-3" />
                        <span>{t('সরকারি দপ্তর ও হেল্পলাইন', 'Verified Office')}</span>
                      </button>
                    )}
                  </div>

                  {/* Evidence lists */}
                  {(step.requiredDocuments?.length || step.helpfulEvidence?.length) ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-[11px] text-secondary-light dark:text-secondary-dark border-t border-border-light/60 dark:border-border-dark/60">
                      {step.requiredDocuments && step.requiredDocuments.length > 0 && (
                        <div>
                          <span className="font-semibold text-primary-light dark:text-primary-dark">
                            {t('প্রয়োজনীয় নথি: ', 'Required Docs: ')}
                          </span>
                          <span>{step.requiredDocuments.join(', ')}</span>
                        </div>
                      )}
                      {step.helpfulEvidence && step.helpfulEvidence.length > 0 && (
                        <div>
                          <span className="font-semibold text-primary-light dark:text-primary-dark">
                            {t('সহায়ক প্রমাণ: ', 'Helpful Evidence: ')}
                          </span>
                          <span>{step.helpfulEvidence.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
