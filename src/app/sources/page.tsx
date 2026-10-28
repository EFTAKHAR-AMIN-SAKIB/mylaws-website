'use client';

import React, { useState } from 'react';
import { useApp } from '@/components/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { provisions, type Category } from '@/data/legal';
import { SourceDrawer } from '@/components/SourceDrawer';
import {
  BookOpen,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Search,
  Filter,
  AlertCircle,
} from 'lucide-react';

export default function SourcesPage() {
  const { lang, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [activeSourceId, setActiveSourceId] = useState<string | null>(null);

  const categories: Array<{ id: Category | 'all'; label: string }> = [
    { id: 'all', label: t('সকল বিষয় (২৩টি)', 'All Topics (23)') },
    { id: 'work', label: t('শ্রম ও মজুরি', 'Labour & Wages') },
    { id: 'rights', label: t('সাংবিধানিক অধিকার', 'Constitutional Rights') },
    { id: 'consumer', label: t('ভোক্তা অধিকার', 'Consumer Rights') },
    { id: 'land', label: t('সম্পত্তি ও জমি', 'Property & Land') },
    { id: 'family', label: t('পারিবারিক সহিংসতা', 'Domestic Violence') },
    { id: 'digital', label: t('ডিজিটাল নিরাপত্তা ও হুমকি', 'Digital Safety & Threats') },
  ];

  const filteredProvisions = provisions.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      p.title.en.toLowerCase().includes(term) ||
      p.title.bn.toLowerCase().includes(term) ||
      p.act.en.toLowerCase().includes(term) ||
      p.act.bn.toLowerCase().includes(term) ||
      p.section.toLowerCase().includes(term) ||
      p.quote.toLowerCase().includes(term);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-bg-light text-primary-light transition-colors bg-parchment-grid">
      <Header />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        {/* Header Banner */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
            <ShieldCheck className="h-4 w-4" />
            <span>{t('উৎস সত্যতা ও নিরীক্ষা নীতি', 'Source Integrity & Verification Methodology')}</span>
          </div>

          <h1 className="font-anek text-3xl sm:text-4xl font-extrabold tracking-tight text-primary-light">
            {t('যাচাইকৃত আইনি উৎস ও কার্যপদ্ধতি', 'Verified Statutory Corpus & Methodology')}
          </h1>

          <p className="font-hind text-xs sm:text-sm text-secondary-light leading-relaxed">
            {t(
              'মাই লজ (MyLaws) কোনো অনুমাননির্ভর তথ্য বা কাল্পনিক আইনের উদ্ধৃতি প্রদান করে না। বর্তমান পাইলট ডাটাবেজে বাংলাদেশ সরকারের আইন মন্ত্রণালয়ের লেজিসলেটিভ ও সংসদ বিষয়ক বিভাগের অফিশিয়াল পোর্টাল (bdlaws.minlaw.gov.bd) থেকে সংগৃহীত ৬টি মূল আইনের ২৩টি বিধান সংরক্ষিত রয়েছে।',
              'MyLaws does not hallucinate statutes. The current verified corpus contains 23 specific provisions across 6 core instruments from the official Bangladesh Code portal (bdlaws.minlaw.gov.bd).'
            )}
          </p>
        </div>

        {/* Verification Rules Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-2">
            <span className="text-xs font-bold text-primary-light dark:text-primary-dark flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-accent-light dark:text-accent-dark" />
              <span>{t('উৎস দেখার তারিখ: ২৬ অক্টোবর ২০২৬', 'Consulted: 26 October 2026')}</span>
            </span>
            <p className="text-xs text-secondary-light dark:text-secondary-dark leading-relaxed">
              {t(
                'এটি সরকারি পোর্টাল থেকে উদ্ধৃতি সংগ্রহের তারিখ; কোনো সংশোধনী বা আদালতের চূড়ান্ত রায়ের তারিখ নয়।',
                'Indicates when official online text was referenced; not an amendment or judicial enactment date.'
              )}
            </p>
          </div>

          <div className="p-5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-2">
            <span className="text-xs font-bold text-primary-light dark:text-primary-dark flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-accent-light dark:text-accent-dark" />
              <span>{t('অক্ষরে অক্ষরে উদ্ধৃতি (Verbatim Excerpt)', 'Verbatim Excerpts')}</span>
            </span>
            <p className="text-xs text-secondary-light dark:text-secondary-dark leading-relaxed">
              {t(
                'প্রতিটি বিধানে সরকারি গেজেটের মূল পাঠের ২৫ শব্দের কম দৈর্ঘ্যের অবিকল উদ্ধৃতি রাখা হয়েছে।',
                'Each provision preserves a verbatim excerpt under 25 words directly from statutory text.'
              )}
            </p>
          </div>

          <div className="p-5 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark space-y-2">
            <span className="text-xs font-bold text-primary-light dark:text-primary-dark flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 text-accent-light dark:text-accent-dark" />
              <span>{t('সীমিত পরিধি ও আইনি পরামর্শের বিকল্প নয়', 'Statutory Boundaries')}</span>
            </span>
            <p className="text-xs text-secondary-light dark:text-secondary-dark leading-relaxed">
              {t(
                'পূর্ণ আইনি জটিলতা এবং প্রমাণের বিষয়সমূহ শুধুমাত্র আইনজীবীর মাধ্যমে নিশ্চিত হতে হবে।',
                'Specific factual applications, deadlines, and court exceptions require licensed legal counsel.'
              )}
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-border-light/60 dark:border-border-dark/60">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === c.id
                    ? 'bg-accent-light text-surface-light dark:bg-accent-dark dark:text-bg-dark font-semibold'
                    : 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-secondary-light dark:text-secondary-dark hover:border-accent-light dark:hover:border-accent-dark'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-secondary-light/60 dark:text-secondary-dark/60" />
            <input
              type="text"
              placeholder={t('আইন বা ধারা খুঁজুন...', 'Search provision...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark pl-9 pr-3.5 py-2 text-primary-light dark:text-primary-dark focus:border-accent-light dark:focus:border-accent-dark"
            />
          </div>
        </div>

        {/* Provisions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProvisions.map((p) => (
            <div
              key={p.id}
              onClick={() => setActiveSourceId(p.id)}
              className="p-5 rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:border-accent-light/50 dark:hover:border-accent-dark/50 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-accent-light dark:text-accent-dark font-medium">
                  <span className="truncate max-w-[200px]">{p.act[lang]}</span>
                  <span className="font-mono bg-accent-light/10 dark:bg-accent-dark/15 px-1.5 py-0.5 rounded">
                    {p.section}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-primary-light dark:text-primary-dark line-clamp-2">
                  {p.title[lang]}
                </h3>

                <p className="text-xs font-serif italic text-secondary-light dark:text-secondary-dark border-l-2 border-accent-light dark:border-accent-dark pl-2 line-clamp-3">
                  &ldquo;{p.quote}&rdquo;
                </p>
              </div>

              <div className="pt-2 border-t border-border-light/40 dark:border-border-dark/40 flex items-center justify-between text-[11px] text-secondary-light dark:text-secondary-dark">
                <span>{t('পরিদর্শন: ', 'Checked: ')}{p.checkedOn}</span>
                <span className="font-semibold text-accent-light dark:text-accent-dark hover:underline">
                  {t('বিস্তারিত দেখুন →', 'View Details →')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Source Modal */}
      <SourceDrawer
        sourceId={activeSourceId}
        onClose={() => setActiveSourceId(null)}
      />

      <Footer />
    </div>
  );
}
