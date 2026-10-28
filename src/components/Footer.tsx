'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from './AppContext';
import { Scale, ShieldCheck, ExternalLink, AlertTriangle } from 'lucide-react';

export function Footer() {
  const { t } = useApp();

  return (
    <footer className="no-print border-t border-border-light/70 bg-surface-light dark:border-border-dark/70 dark:bg-surface-dark transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark border border-accent-light/20 dark:border-accent-dark/30">
                <Scale className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-bold text-primary-light dark:text-primary-dark">
                MyLaws
              </span>
            </div>
            <p className="text-xs text-secondary-light dark:text-secondary-dark leading-relaxed max-w-md">
              {t(
                'মাই লজ (MyLaws) বাংলাদেশের সাধারণ মানুষের জন্য একটি আইনি তথ্য ও প্রস্তুতি সহায়ক প্ল্যাটফর্ম। এটি কোনো আইনজীবী, আদালত বা সরকারি সংস্থা নয়। এখানে প্রদত্ত তথ্য কোনো আনুষ্ঠানিক আইনি পরামর্শ বা মামলার চূড়ান্ত সিদ্ধান্ত হিসেবে বিবেচনা করা যাবে না।',
                'MyLaws is a legal information and preparation assistance platform for ordinary people in Bangladesh. It is not a law firm, court, or governmental agency. Information provided is not formal legal advice or a guarantee of legal outcome.'
              )}
            </p>
            <div className="inline-flex items-center gap-2 rounded-md bg-accent-light/5 dark:bg-accent-dark/10 px-3 py-1.5 text-[11px] text-accent-light dark:text-accent-dark border border-accent-light/15 dark:border-accent-dark/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>
                {t(
                  'উৎস নিরীক্ষা: ২৬ অক্টোবর ২০২৬ · ৬টি মৌলিক আইনের ২৩টি নির্বাচিত বিধান',
                  'Corpus checked: 26 October 2026 · 23 provisions across 6 statutes'
                )}
              </span>
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-light dark:text-primary-dark">
              {t('প্রধান লিংক', 'Main Links')}
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link
                  href="/ask"
                  className="text-secondary-light dark:text-secondary-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
                >
                  {t('অনলাইন আইনি সহকারী', 'Online Assistant')}
                </Link>
              </li>
              <li>
                <Link
                  href="/drafts"
                  className="text-secondary-light dark:text-secondary-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
                >
                  {t('অভিযোগ ও জিডি খসড়া', 'Draft Generator')}
                </Link>
              </li>
              <li>
                <Link
                  href="/sources"
                  className="text-secondary-light dark:text-secondary-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
                >
                  {t('আইনি উৎস ও কার্যপদ্ধতি', 'Sources & Methodology')}
                </Link>
              </li>
              <li>
                <Link
                  href="/download"
                  className="text-secondary-light dark:text-secondary-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
                >
                  {t('অ্যান্ড্রয়েড অ্যাপ ও অফলাইন প্যাক', 'Android App & Offline Packs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal, Privacy & External Portals */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-light dark:text-primary-dark">
              {t('সরকারি পোর্টাল ও নীতি', 'Official Portals & Policies')}
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <a
                  href="https://bdlaws.minlaw.gov.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-secondary-light dark:text-secondary-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
                >
                  <span>{t('বাংলাদেশ কোড (আইন মন্ত্রণালয়)', 'Bangladesh Laws (bdlaws)')}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://lima.dife.gov.bd/complaint"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-secondary-light dark:text-secondary-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
                >
                  <span>{t('ডিআইএফই অভিযোগ পোর্টাল (লিমা)', 'DIFE LIMA Complaint')}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://gd.police.gov.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-secondary-light dark:text-secondary-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
                >
                  <span>{t('অনলাইন জিডি (বাংলাদেশ পুলিশ)', 'Online GD (Police)')}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-secondary-light dark:text-secondary-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
                >
                  {t('গোপনীয়তা নীতি', 'Privacy Policy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-secondary-light dark:text-secondary-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors"
                >
                  {t('ব্যবহারের শর্তাবলী', 'Terms of Use')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 pt-6 border-t border-border-light/50 dark:border-border-dark/50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-secondary-light dark:text-secondary-dark gap-3">
          <p>
            © {new Date().getFullYear()} MyLaws. {t('সকল অধিকার সংরক্ষিত।', 'All rights reserved.')}
          </p>
          <p className="text-center sm:text-right">
            {t(
              'জাতীয় সরকারি আইনি সহায়তা হেল্পলাইন: ১৬৬৯৯ (টোল-ফ্রি) · পুলিশ জরুরি সেবা: ৯৯৯',
              'National Legal Aid Hotline: 16699 (Toll-Free) · Police Emergency: 999'
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
