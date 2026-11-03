'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale } from 'lucide-react';
import { useApp } from '@/components/AppContext';

export default function NotFound() {
  const { t } = useApp();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="h-16 w-16 rounded-3xl bg-accent-light/10 border border-accent-light/30 flex items-center justify-center text-accent-light mb-6 shadow-sm">
        <Scale className="h-8 w-8" />
      </div>

      <span className="font-cinzel text-xs font-bold tracking-widest text-accent-light uppercase mb-2">
        404 — {t('পাতাটি পাওয়া যায়নি', 'PAGE NOT FOUND')}
      </span>

      <h1 className="font-anek text-2xl sm:text-4xl font-extrabold text-[#231F1C] mb-3">
        {t('অনুরোধকৃত আইনি পাতাটি বিদ্যমান নেই', 'The requested legal page does not exist')}
      </h1>

      <p className="font-hind text-xs sm:text-sm text-[#5A534A] max-w-md mb-8 leading-relaxed">
        {t(
          'আপনি যে ঠিকানাটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা ভুল টাইপ করা হয়েছে। MyLaws এর মূল পাতায় ফিরে যান।',
          'The link you followed may be broken or the page has been moved. Return to MyLaws home to continue.'
        )}
      </p>

      <Link
        href="/"
        className="bracket-btn text-[#231F1C] hover:text-accent-light py-2.5 px-6 shadow-sm inline-flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="font-hind font-bold text-xs">
          {t('হোমে ফিরে যান', 'RETURN TO HOME')}
        </span>
      </Link>
    </div>
  );
}
