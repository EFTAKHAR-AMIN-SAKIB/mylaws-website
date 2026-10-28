'use client';

import React from 'react';
import { useApp } from '@/components/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { androidReleaseManifest, legalPackManifest } from '@/data/manifest';
import {
  Smartphone,
  Download,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Cpu,
  HardDrive,
  FileCode,
} from 'lucide-react';

export default function DownloadPage() {
  const { lang, t } = useApp();
  const manifest = androidReleaseManifest;

  return (
    <div className="min-h-screen flex flex-col bg-bg-light text-primary-light dark:bg-bg-dark dark:text-primary-dark transition-colors">
      <Header />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-10">
        {/* Banner */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light dark:bg-accent-dark/15 dark:text-accent-dark">
            <Smartphone className="h-4 w-4" />
            <span>{t('অ্যান্ড্রয়েড রিলিজ ও বিবরণী', 'Android Release Manifest')}</span>
          </div>

          <h1 className="font-display text-3xl font-bold text-primary-light dark:text-primary-dark">
            {t('মাই লজ অ্যান্ড্রয়েড অ্যাপ্লিকেশন', 'MyLaws Android Application')}
          </h1>

          <p className="text-xs sm:text-sm text-secondary-light dark:text-secondary-dark leading-relaxed">
            {t(
              'স্মার্টফোনে ব্যবহার উপযোগী জেটপ্যাক কম্পোজ (Jetpack Compose) ভিত্তিক নেটিভ অ্যাপ্লিকেশন। অনলাইন সহকারী ব্যবহারের পাশাপাশি ডিভাইসে স্থানীয় আইনি প্যাক ও ড্রাফট তৈরির সুবিধা প্রদান করে।',
              'Native Android application built with Jetpack Compose. Combines online assistant services with local database persistence and optional offline legal packs.'
            )}
          </p>
        </div>

        {/* Release Status Card */}
        <div className="p-6 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-light/60 dark:border-border-dark/60 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-primary-light dark:text-primary-dark">
                  MyLaws v{manifest.version}
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-accent-light/15 text-accent-light dark:bg-accent-dark/20 dark:text-accent-dark">
                  {manifest.status === 'preview' ? t('প্রিভিউ রিলিজ', 'Preview Release') : manifest.status}
                </span>
              </div>
              <p className="text-xs text-secondary-light dark:text-secondary-dark mt-0.5">
                {t('প্রকাশের তারিখ: ', 'Release Date: ')}{manifest.releaseDate} · Build #{manifest.versionCode}
              </p>
            </div>

            {/* APK Download Button or Honest Status */}
            <div>
              {manifest.status === 'available' ? (
                <a
                  href={manifest.apkUrl || '#'}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-light text-surface-light dark:bg-accent-dark dark:text-bg-dark text-xs font-semibold shadow hover:opacity-90"
                >
                  <Download className="h-4 w-4" />
                  <span>{t('APK ডাউনলোড করুন (~১৮.৫ মেগাবাইট)', 'Download APK (~18.5 MB)')}</span>
                </a>
              ) : (
                <div className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-accent-light/10 dark:bg-accent-dark/15 text-accent-light dark:text-accent-dark border border-accent-light/20 dark:border-accent-dark/30">
                  <Info className="h-4 w-4" />
                  <span>{t('ফেজ ১ প্রিভিউ বিল্ড (Phase 1 Preview Ready)', 'Phase 1 Preview Ready')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-bg-light/70 dark:bg-bg-dark/70 border border-border-light/70 dark:border-border-dark/70 space-y-1">
              <span className="font-semibold text-secondary-light dark:text-secondary-dark flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-accent-light dark:text-accent-dark" />
                <span>{t('ডিভাইস প্রয়োজনীয়তা (RAM)', 'RAM Requirements')}</span>
              </span>
              <p className="text-primary-light dark:text-primary-dark font-medium">
                {manifest.recommendedRam}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-bg-light/70 dark:bg-bg-dark/70 border border-border-light/70 dark:border-border-dark/70 space-y-1">
              <span className="font-semibold text-secondary-light dark:text-secondary-dark flex items-center gap-1.5">
                <HardDrive className="h-3.5 w-3.5 text-accent-light dark:text-accent-dark" />
                <span>{t('ন্যূনতম অপারেটিং সিস্টেম', 'Minimum Android OS')}</span>
              </span>
              <p className="text-primary-light dark:text-primary-dark font-medium">
                {manifest.minimumAndroidVersion}
              </p>
            </div>

            <div className="sm:col-span-2 p-3.5 rounded-xl bg-bg-light/70 dark:bg-bg-dark/70 border border-border-light/70 dark:border-border-dark/70 space-y-1">
              <span className="font-semibold text-secondary-light dark:text-secondary-dark flex items-center gap-1.5">
                <FileCode className="h-3.5 w-3.5 text-accent-light dark:text-accent-dark" />
                <span>SHA-256 Checksum</span>
              </span>
              <p className="font-mono text-[11px] text-primary-light dark:text-primary-dark break-all">
                {manifest.sha256Checksum}
              </p>
            </div>
          </div>

          {/* Tested Hardware Environment */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-light dark:text-primary-dark">
              {t('প্রকৃত পরীক্ষিত ডিভাইসসমূহ (Tested Devices)', 'Tested Hardware Environments')}
            </h3>
            <ul className="space-y-1.5 text-xs text-secondary-light dark:text-secondary-dark">
              {manifest.testedDevices.map((dev, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent-light dark:text-accent-dark shrink-0" />
                  <span>{dev}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Change Log */}
          <div className="space-y-2 pt-2 border-t border-border-light/40 dark:border-border-dark/40">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-light dark:text-primary-dark">
              {t('রিলিজ নোট ও পরিবর্তনসমূহ (Changelog)', 'Release Changelog')}
            </h3>
            <ul className="space-y-1.5 text-xs text-secondary-light dark:text-secondary-dark list-disc list-inside">
              {manifest.changeLog.map((log, idx) => (
                <li key={idx}>{log}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Honest Security & Install Notice */}
        <div className="p-5 rounded-2xl border border-amber-300 dark:border-amber-900 bg-amber-50/70 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-200 space-y-2">
          <div className="flex items-center gap-2 font-bold">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{t('নিরাপত্তা ও ইনস্টলেশন নির্দেশনা', 'Installation & Security Advisory')}</span>
          </div>
          <p className="leading-relaxed">
            {t(
              'গুগল প্লে স্টোর বা অফিশিয়াল স্টোরে প্রকাশের পূর্বে সাইডলোড (sideload) করার ক্ষেত্রে শুধুমাত্র বিশ্বস্ত উৎস থেকে APK ইনস্টল করুন। আপনার ফোনের নিরাপত্তা সেটিংস সম্পূর্ণ নিষ্ক্রিয় না করে শুধুমাত্র এই নির্দিষ্ট অ্যাপের ইনস্টল অনুমোদন দিন।',
              'When sideloading APK files prior to official app store release, only install from verified repositories. Do not broadly disable device security protections.'
            )}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
