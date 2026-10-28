'use client';

import React from 'react';
import { useApp } from '@/components/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Scale, AlertCircle, FileCheck, HelpCircle } from 'lucide-react';

export default function TermsPage() {
  const { lang, t } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-bg-light text-primary-light dark:bg-bg-dark dark:text-primary-dark transition-colors">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark">
            <Scale className="h-4 w-4" />
            <span>{t('ব্যবহারের নিয়ম ও দায়িত্বের সীমা', 'Terms of Use & Disclaimer')}</span>
          </div>

          <h1 className="font-display text-3xl font-bold text-primary-light dark:text-primary-dark">
            {t('ব্যবহারের শর্তাবলী (Terms of Use)', 'Terms of Use')}
          </h1>

          <p className="text-xs text-secondary-light dark:text-secondary-dark">
            {t('সর্বশেষ হালনাগাদ: ২৮ অক্টোবর ২০২৬', 'Last updated: 28 October 2026')}
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-secondary-light dark:text-secondary-dark leading-relaxed">
          <div className="p-5 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-2">
            <h2 className="text-base font-bold text-primary-light dark:text-primary-dark flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-accent-light dark:text-accent-dark" />
              <span>{t('১. আইনজীবী বা সরকারি প্রতিনিধিত্বের স্পষ্ট অস্বীকৃতি', '1. No Attorney-Client Relationship or Agency Representation')}</span>
            </h2>
            <p>
              {t(
                'মাই লজ (MyLaws) কোনো আইনজীবী, আইন পরামর্শক সংস্থা বা সরকারি আদালত নয়। এই প্ল্যাটফর্মের তথ্য কোনো পেশাদার আইনি পর্যালোচনার সমতুল্য নয়। কোনো বিরোধের চূড়ান্ত সমাধান, মামলা দাখিল বা আদালতে শুনানির জন্য বাংলাদেশ বার কাউন্সিলের তালিকাভুক্ত আইনজীবীর সরাসরি পরামর্শ গ্রহণ আবশ্যক।',
                'MyLaws does not establish an attorney-client relationship. It is an informational preparation tool and does not provide formal legal representation, official case filings, or judicial guarantees.'
              )}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-2">
            <h2 className="text-base font-bold text-primary-light dark:text-primary-dark flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-accent-light dark:text-accent-dark" />
              <span>{t('২. ব্যবহারকারীর তথ্যের সত্যতা ও খসড়ার দায়বদ্ধতা', '2. User Fact Accuracy & Document Responsibility')}</span>
            </h2>
            <p>
              {t(
                'অভিযোগ বা সাধারণ ডায়েরির (GD) খসড়া প্রস্তুত করার সময় প্রদত্ত সমস্ত বিবরণ, তারিখ, ব্যক্তি ও স্থানের তথ্যের নির্ভুলতা একান্তই ব্যবহারকারীর নিজস্ব দায়িত্ব। কোনো ভুল বা মিথ্যা তথ্য অন্তর্ভুক্ত করে তা কোনো সরকারি দপ্তরে দাখিল করলে আইনগত পরিণতির দায় ব্যবহারকারীর।',
                'Users are solely responsible for ensuring the factual accuracy of any statements, dates, and names entered into draft documents. Submitting false statements to official bodies carries legal liability.'
              )}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-2">
            <h2 className="text-base font-bold text-primary-light dark:text-primary-dark flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-accent-light dark:text-accent-dark" />
              <span>{t('৩. আইনি তথ্যের সীমাবদ্ধতা ও পরিবর্তন', '3. Statutory Scope & Legislative Amendments')}</span>
            </h2>
            <p>
              {t(
                'মাই লজ বর্তমানে বাংলাদেশ কোডের ৬টি নির্বাচিত আইনের ২৩টি ধারা উপস্থাপন করে। আইনসভায় পরবর্তী যেকোনো সংশোধনী, আদালতের নতুন নজির বা বিশেষ ব্যতিক্রমের কারণে বাস্তব প্রয়োগে পার্থক্য ঘটতে পারে।',
                'MyLaws currently covers 23 selected provisions from 6 statutes. Subsequent statutory amendments or judicial precedents may impact real-world applications.'
              )}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
