'use client';

import React from 'react';
import { useApp } from './AppContext';
import { findOffice } from '@/data/offices';
import { X, Building, Phone, MapPin, Globe, ExternalLink, ShieldCheck } from 'lucide-react';

interface OfficeModalProps {
  officeId: string | null;
  onClose: () => void;
}

export function OfficeModal({ officeId, onClose }: OfficeModalProps) {
  const { lang, t } = useApp();

  if (!officeId) return null;

  const office = findOffice(officeId);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg rounded-t-3xl sm:rounded-2xl border-t sm:border border-border-light bg-surface-light shadow-2xl overflow-hidden animate-bottom-sheet sm:animate-in sm:zoom-in-95 max-h-[85vh] sm:max-h-[90vh] flex flex-col pb-safe">
        {/* Mobile Drag Indicator Bar */}
        <div className="w-10 h-1 rounded-full bg-secondary-light/30 mx-auto mt-2.5 -mb-1 sm:hidden shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-light/70 px-5 sm:px-6 py-3.5 sm:py-4 bg-bg-light/50 shrink-0">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-accent-light" />
            <h3 className="text-sm font-bold text-primary-light">
              {t('সংশ্লিষ্ট সরকারি দপ্তর ও যোগাযোগ', 'Verified Office & Contact')}
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
        <div className="overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
          {office ? (
            <>
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-accent-light dark:text-accent-dark uppercase tracking-wider mb-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{t('যাচাইকৃত সরকারি চ্যানেল', 'Authoritative Channel')}</span>
                </div>
                <h4 className="text-base font-bold text-primary-light dark:text-primary-dark">
                  {office.name}
                </h4>
              </div>

              <div className="space-y-3 pt-2">
                {office.phone && (
                  <div className="flex items-start gap-2.5">
                    <Phone className="h-4 w-4 text-accent-light dark:text-accent-dark shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-primary-light dark:text-primary-dark">
                        {t('হটলাইন / টেলিফোন:', 'Hotline / Phone:')}
                      </span>
                      <p className="text-secondary-light dark:text-secondary-dark font-mono text-sm">
                        {office.phone}
                      </p>
                    </div>
                  </div>
                )}

                {office.address && (
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-accent-light dark:text-accent-dark shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-primary-light dark:text-primary-dark">
                        {t('ঠিকানা / আঞ্চলিক পরিধি:', 'Address / Jurisdiction:')}
                      </span>
                      <p className="text-secondary-light dark:text-secondary-dark">
                        {office.address}
                      </p>
                    </div>
                  </div>
                )}

                {office.issueScope && (
                  <div className="p-3 rounded-lg bg-bg-light dark:bg-bg-dark border border-border-light/70 dark:border-border-dark/70 space-y-1">
                    <span className="font-semibold text-primary-light dark:text-primary-dark">
                      {t('কার্যপরিধি ও এখতিয়ার:', 'Scope & Jurisdiction:')}
                    </span>
                    <p className="text-secondary-light dark:text-secondary-dark leading-relaxed">
                      {office.issueScope}
                    </p>
                  </div>
                )}

                <div className="text-secondary-light dark:text-secondary-dark text-[11px] leading-relaxed">
                  {office.notes[lang]}
                </div>
              </div>

              {/* Portal link */}
              {office.portalUrl && (
                <div className="pt-3 border-t border-border-light/60 dark:border-border-dark/60 flex justify-end">
                  <a
                    href={office.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-accent-light dark:text-accent-dark hover:underline"
                  >
                    <span>{t('সরকারি অনলাইন পোর্টাল ভিজিট করুন', 'Visit Official Portal')}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6 text-secondary-light dark:text-secondary-dark">
              <p>{t('দপ্তর সংক্রান্ত তথ্য পাওয়া যায়নি।', 'Office details not found.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
