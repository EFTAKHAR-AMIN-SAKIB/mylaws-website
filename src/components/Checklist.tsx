'use client';

import React, { useState } from 'react';
import { useApp } from './AppContext';
import type { ChecklistStep } from '@/types/contracts';
import { CheckCircle2, Shield, Building, HelpCircle } from 'lucide-react';

interface ChecklistProps {
  steps: ChecklistStep[];
  onOpenSource: (sourceId: string) => void;
  onOpenOffice: (officeId: string) => void;
}

export function Checklist({ steps, onOpenSource, onOpenOffice }: ChecklistProps) {
  const { t } = useApp();
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!steps || steps.length === 0) return null;

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
