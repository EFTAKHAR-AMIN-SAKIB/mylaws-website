'use client';

import React from 'react';
import { useApp } from '@/components/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Lock, EyeOff, Server, Database } from 'lucide-react';

export default function PrivacyPage() {
  const { lang, t } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-bg-light text-primary-light dark:bg-bg-dark dark:text-primary-dark transition-colors">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark">
            <Lock className="h-4 w-4" />
            <span>{t('গোপনীয়তা ও তথ্য সংরক্ষণ নীতি', 'Privacy & Data Protection')}</span>
          </div>

          <h1 className="font-cinzel text-3xl font-bold tracking-wide text-primary-light dark:text-gold-gradient">
            {t('গোপনীয়তা নীতি (Privacy Policy)', 'Privacy Policy')}
          </h1>

          <p className="text-xs text-secondary-light dark:text-secondary-dark">
            {t('সর্বশেষ হালনাগাদ: ২৮ অক্টোবর ২০২৬', 'Last updated: 28 October 2026')}
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-secondary-light dark:text-secondary-dark leading-relaxed">
          <div className="p-5 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-2">
            <h2 className="text-base font-bold text-primary-light dark:text-primary-dark flex items-center gap-2">
              <EyeOff className="h-4 w-4 text-accent-light dark:text-accent-dark" />
              <span>{t('১. কোনো বাধ্যতামূলক অ্যাকাউন্ট বা রেজিস্ট্রেশন নেই', '1. No Mandatory Account or User Registration')}</span>
            </h2>
            <p>
              {t(
                'মাই লজ (MyLaws) ব্যবহারের জন্য কোনো সাইন-আপ, ইমেইল প্রদান, সামাজিক যোগাযোগ মাধ্যমের লগইন বা ফোন নম্বর দেওয়া আবশ্যক নয়। যে কেউ পরিচয় প্রকাশ না করেই সরাসরি আইনি তথ্য অনুসন্ধান ও খসড়া তৈরি করতে পারেন।',
                'MyLaws does not require user accounts, emails, social logins, or telephone numbers for core usage. Anyone can research legal provisions and prepare drafts without revealing their identity.'
              )}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-2">
            <h2 className="text-base font-bold text-primary-light dark:text-primary-dark flex items-center gap-2">
              <Database className="h-4 w-4 text-accent-light dark:text-accent-dark" />
              <span>{t('২. ব্যক্তিগত তথ্যের স্থানীয় ব্রাউজার সংরক্ষণ', '2. Local Browser Retention for Personal Drafts')}</span>
            </h2>
            <p>
              {t(
                'খসড়া তৈরির সময় আপনার নাম, মোবাইল নম্বর, ঠিকানা ও ঘটনার বিবরণ শুধুমাত্র আপনার ব্রাউজারের অস্থায়ী মেমোরিতে (Session Storage) থাকে। এগুলো আমাদের রিমোট সার্ভার ডাটাবেজে স্থায়ীভাবে সংরক্ষণ করা হয় না। ব্রাউজার বন্ধ করলে বা ক্যাশ পরিষ্কার করলে এই তথ্য মুছে যাবে।',
                'Personal information entered into draft complaints (names, phone numbers, addresses, facts) remains strictly within your browser\'s temporary session storage. It is never persisted in a cloud database.'
              )}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-2">
            <h2 className="text-base font-bold text-primary-light dark:text-primary-dark flex items-center gap-2">
              <Server className="h-4 w-4 text-accent-light dark:text-accent-dark" />
              <span>{t('৩. ক্লাউড প্রসেসিং ও এআই প্রোভাইডার নীতি', '3. Cloud Processing & Model Inference')}</span>
            </h2>
            <p>
              {t(
                'যখন আপনি অনলাইন আইনি সহকারীতে প্রশ্ন করেন, আপনার প্রশ্নটি প্রাসঙ্গিক আইনের বিধান অনুসন্ধানের জন্য আমাদের নিরাপদ সার্ভার এন্ডপয়েন্টে পাঠানো হয়। মেটা এআই (Muse Spark) সক্ষম থাকলে প্রশ্নটি শুধুমাত্র আইনি উদ্ধৃতি যাচাইয়ের জন্য প্রক্রিয়াজাত করা হয়। আমরা কোনো ব্যক্তিগত বিরোধের সংবেদনশীল তথ্য পাবলিক লগে রাখি না।',
                'When you submit questions to the online assistant, queries are processed via our server endpoints to match verified statutory provisions. If Meta AI is enabled, inquiries are evaluated solely for legal citation verification.'
              )}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-2">
            <h2 className="text-base font-bold text-primary-light dark:text-primary-dark flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent-light dark:text-accent-dark" />
              <span>{t('৪. শেয়ার্ড ডিভাইস সংক্রান্ত সতর্কতা', '4. Shared Device Caution')}</span>
            </h2>
            <p>
              {t(
                'আপনি যদি কোনো সাইবার ক্যাফে বা অন্যের কম্পিউটার/ফোনে ড্রাফট প্রস্তুত করেন, কাজ শেষে ব্রাউজার হিস্ট্রি ও ক্যাশ পরিষ্কার করুন অথবা প্রাইভেট/ইনকগনিটো মোড ব্যবহার করুন। একই ব্রাউজার প্রোফাইলের অন্য কোনো ব্যবহারকারী আপনার ড্রাফট দেখতে পারার ঝুঁকি পরিহার করুন।',
                'If accessing MyLaws from shared or public computers, use private browsing mode and clear browser data after exporting documents to protect your confidential information.'
              )}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
