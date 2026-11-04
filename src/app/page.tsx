'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/components/AppContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TurntableScales } from '@/components/TurntableScales';
import { TiltCard } from '@/components/TiltCard';
import {
  ArrowRight,
  ShieldCheck,
  FileText,
  Smartphone,
  Globe2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Sparkles,
  BookOpen,
  Building,
  CheckSquare,
  Scale,
  Award,
  Search,
  Briefcase,
  ShieldAlert,
  ShoppingBag,
  Users,
  Info,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface TopicItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  shortSummary: string;
  law: string;
  sections: string;
  remedies: string[];
  sampleQuery: string;
}

export default function HomePage() {
  const { lang, t } = useApp();
  const turntableContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicItem | null>(null);
  const [activePillar, setActivePillar] = useState<number>(0);

  // Close topic details modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedTopic(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scrolling when topic modal is open
  useEffect(() => {
    if (selectedTopic) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedTopic]);

  const supportedTopics: TopicItem[] = [
    {
      id: 'work',
      icon: Briefcase,
      title: t('বকেয়া বেতন ও শ্রম অধিকার', 'Unpaid Wages & Labour Rights'),
      shortSummary: t(
        'বকেয়া বেতন, ওভারটাইম বকেয়া, হঠাৎ বরখাস্ত বা শ্রম আদালতের পদক্ষেপ।',
        'Salary delays, unpaid overtime, unlawful termination, and Labour Court steps.'
      ),
      law: t('বাংলাদেশ শ্রম আইন, ২০০৬', 'Bangladesh Labour Act, 2006'),
      sections: t('ধারা ১২৩, ১২৪ক ও ১৩২', 'Sections 123, 124A, 132'),
      remedies: [
        t('বেতন পরিশোধে বিলম্বের আইনি সময়সীমা ও অধিকার নিশ্চিতকরণ', 'Statutory deadlines and legal rights for overdue wages'),
        t('প্রমাণ সংরক্ষণ ও সালিশি উদ্যোগের ধারাবাহিক পদক্ষেপ', 'Evidence preservation and prioritized conciliation steps'),
        t('কলকারখানা পরিদর্শন (DIFE) ও শ্রম পরিদর্শকের নিকট প্রমিত অভিযোগ ড্রাফট', 'Ready formal complaint draft for DIFE labour inspectors'),
      ],
      sampleQuery: t(
        'আমার মালিক দুই মাসের বেতন দেয়নি। কী কী বিষয় জানা দরকার?',
        'My employer has not paid my salary for two months. What should I know?'
      ),
    },
    {
      id: 'gd',
      icon: ShieldAlert,
      title: t('হুমকি ও সাধারণ ডায়েরি (GD)', 'Threats & Police General Diary'),
      shortSummary: t(
        'ফোন বা অনলাইনে হুমকি, ব্ল্যাকমেইল ও থানায় নিরপেক্ষ জিডি প্রস্তুতকরণ।',
        'Phone or online threats, blackmail, and structured GD filing with police.'
      ),
      law: t('দণ্ডবিধি, ১৮৬০ ও সাইবার নিরাপত্তা বিধান', 'Penal Code, 1860 & Cyber Provisions'),
      sections: t('ধারা ৫০৩ ও ৫০৭', 'Sections 503 & 507'),
      remedies: [
        t('অপরাধের মাত্রা ও ফৌজদারি ভীতি প্রদর্শন (Criminal Intimidation) শনাক্তকরণ', 'Classifying threats and intimidation under Penal Code'),
        t('হুমকির কল রেকর্ড, মেসেজ বা ডিজিটাল প্রমাণ সংরক্ষণের তালিকা', 'Checklist for preserving digital evidence and call logs'),
        t('থানায় জমা দেওয়ার উপযোগী সুনির্দিষ্ট আইনি ভাষায় পুলিশ জিডি ড্রাফট', 'Print-ready structured General Diary petition for police'),
      ],
      sampleQuery: t(
        'আমাকে অপরিচিত নম্বর থেকে হুমকি দেওয়া হচ্ছে। জিডি কীভাবে করব?',
        'I am receiving threats from an unknown number. How do I file a GD?'
      ),
    },
    {
      id: 'consumer',
      icon: ShoppingBag,
      title: t('ভোক্তা অধিকার ও প্রতারণা', 'Consumer Rights & Fraud'),
      shortSummary: t(
        'অনলাইন শপে প্রতারণা, নকল পণ্য বা অতিরিক্ত মূল্যের বিরুদ্ধে ৩০ দিনে প্রতিকার।',
        'Online scams, counterfeit products, overcharging, and statutory 30-day claims.'
      ),
      law: t('ভোক্তা অধিকার সংরক্ষণ আইন, ২০০৯', 'Consumers’ Right Protection Act, 2009'),
      sections: t('ধারা ৪০, ৪৪, ৪৫ ও ৬০', 'Sections 40, 44, 45, 60'),
      remedies: [
        t('পণ্য ক্রয়ের তারিখ থেকে ৩০ দিনের মধ্যে অভিযোগের সময়সীমা গণনা', 'Enforcing the strict 30-day statutory limitation window'),
        t('ইনভয়েস, চ্যাট স্ক্রিনশট ও পেমেন্ট রসিদ সংগ্রহের চেকলিস্ট', 'Gathering proof: invoices, payment slips, and delivery chats'),
        t('জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তরে (DNCRP) জমা দেওয়ার ফরম্যাট', 'Ready-to-file complaint petition for Consumer Protection (DNCRP)'),
      ],
      sampleQuery: t(
        'অনলাইন দোকানে টাকা দিয়েছি কিন্তু পণ্য পাইনি। কোন আইন প্রাসঙ্গিক হতে পারে?',
        'I paid an online shop but never received the product. What laws apply?'
      ),
    },
    {
      id: 'property',
      icon: Building,
      title: t('জমি কেনাবেচা ও খতিয়ান', 'Land Purchase & Khatian'),
      shortSummary: t(
        'জমি ক্রয়ের আগে খতিয়ান ও দলিল যাচাই এবং জবরদখল প্রতিরোধে প্রতিকার।',
        'Khatian and deed verification, and fast remedies against land grabbing.'
      ),
      law: t('সম্পত্তি হস্তান্তর আইন, ১৮৮২ ও ভূমি অপরাধ আইন, ২০২৩', 'Transfer of Property Act, 1882 & Land Crime Act, 2023'),
      sections: t('ধারা ৫৩গ ও ভূমি অপরাধ প্রতিরোধ বিধান', 'Section 53C & Land Crime Prevention Provisions'),
      remedies: [
        t('বিক্রেতার নামে আরএস/বিএস খতিয়ান ও দাখিলার সঠিকতা যাচাই', 'Verifying RS/BS khatian, mutation records, and title chain'),
        t('নিবন্ধিত দলিলের বৈধতা ও দায়মুক্ত সনদ পরীক্ষার নির্দেশনা', 'Checklist for verifying registered deeds and encumbrances'),
        t('বেআইনি দখল বা উচ্ছেদের ক্ষেত্রে ম্যাজিস্ট্রেট আদালতে তাৎক্ষণিক পিটিশন', 'Fast petition drafting to Executive Magistrate under 2023 Land Crime Act'),
      ],
      sampleQuery: t(
        'জমি কেনার আগে খতিয়ান সম্পর্কে কী যাচাই করব?',
        'What should I verify about the khatian before buying land?'
      ),
    },
    {
      id: 'family',
      icon: Users,
      title: t('পারিবারিক অধিকার, দেনমোহর ও সুরক্ষা', 'Family Rights, Dower & Protection'),
      shortSummary: t(
        'বকেয়া দেনমোহর, সন্তানের ভরণপোষণ ও পারিবারিক সহিংসতা থেকে আইনি সুরক্ষা।',
        'Statutory recovery of dower, child maintenance, and protection orders.'
      ),
      law: t('পারিবারিক আদালত আইন, ২০২৩ ও পারিবারিক সহিংসতা আইন, ২০১০', 'Family Courts Act, 2023 & Domestic Violence Act, 2010'),
      sections: t('পারিবারিক আদালত ধারা ৫ ও পারিবারিক সুরক্ষা ধারা', 'Family Courts Act Sec 5 & Protection Order Provisions'),
      remedies: [
        t('নিকাহনামা অনুযায়ী তাৎক্ষণিক বা বিলম্বিত দেনমোহর আদায়ের নিয়ম', 'Calculating and claiming prompt and deferred dower'),
        t('সন্তানের অভিভাবকত্ব ও মাসিক আইনানুগ ভরণপোষণ নির্ধারণ', 'Securing lawful monthly maintenance and custody rights for children'),
        t('শারীরিক বা মানসিক নির্যাতনের ক্ষেত্রে আদালতের তাৎক্ষণিক সুরক্ষা আদেশ', 'Immediate court protective injunctions against domestic abuse'),
      ],
      sampleQuery: t(
        'স্বামীর নিকট থেকে বকেয়া দেনমোহর ও সন্তানের ভরণপোষণ আদায়ের নিয়ম কী?',
        'How do I claim overdue dower and child maintenance from my husband?'
      ),
    },
    {
      id: 'rights',
      icon: Scale,
      title: t('মৌলিক অধিকার ও বিনামূল্যে আইনি সহায়তা', 'Fundamental Rights & Free Legal Aid'),
      shortSummary: t(
        'গ্রেফতারের ক্ষেত্রে নাগরিক অধিকার ও অসচ্ছল নাগরিকদের সরকারি খরচে আইনজীবী।',
        'Rights during police arrest and free government-appointed legal counsel.'
      ),
      law: t('বাংলাদেশের সংবিধান ও আইনগত সহায়তা প্রদান আইন, ২০০০', 'Constitution of Bangladesh & Legal Aid Act, 2000'),
      sections: t('সংবিধানের অনুচ্ছেদ ৩৩ ও লিগ্যাল এইড বিধিমালা', 'Constitution Article 33 & Legal Aid Rules'),
      remedies: [
        t('গ্রেফতারের কারণ জানা ও ২৪ ঘণ্টার মধ্যে ম্যাজিস্ট্রেটের নিকট উপস্থাপনের অধিকার', 'Constitutional safeguards: knowing charges and production within 24 hours'),
        t('জাতীয় আইনগত সহায়তা সংস্থার (১৬৪৩০) মাধ্যমে নিখরচায় আইনজীবী নিয়োগ', 'Steps to obtain free government legal aid counsel via National Helpline 16430'),
        t('জেলা লিগ্যাল এইড কর্মকর্তার নিকট সহায়তার আনুষ্ঠানিক দরখাস্তের ফরম্যাট', 'Ready application draft for District Legal Aid Office eligibility screening'),
      ],
      sampleQuery: t(
        'সরকারি খরচে বিনামূল্যে আইনজীবী বা আইনি সহায়তা পাওয়ার নিয়ম কী?',
        'How do I get free government-funded legal aid and a lawyer?'
      ),
    },
  ];

  const currentTopicIndex = selectedTopic ? supportedTopics.findIndex((item) => item.id === selectedTopic.id) : -1;
  const prevTopic = currentTopicIndex > 0 ? supportedTopics[currentTopicIndex - 1] : supportedTopics[supportedTopics.length - 1];
  const nextTopic = currentTopicIndex >= 0 && currentTopicIndex < supportedTopics.length - 1 ? supportedTopics[currentTopicIndex + 1] : supportedTopics[0];

  const foundationalPillars = [
    {
      id: 'statutes',
      num: '০১',
      tag: t('গেজেটভিত্তিক তথ্য', 'VERIFIED CITATIONS'),
      icon: ShieldCheck,
      title: t(
        'সরকারি গেজেট ও আইনের মূল ধারা থেকে সরাসরি উদ্ধৃতি',
        'Verified Statutory Grounding & Exact Gazette Citations'
      ),
      desc: t(
        'MyLaws কোনো কাল্পনিক বা অনুমাননির্ভর পরামর্শ দেয় না। প্রতিটি উত্তরের সাথে বাংলাদেশ কোডের (bdlaws) সংশ্লিষ্ট ধারা ও হুবহু পাঠ প্রদর্শিত হয়।',
        'No fabricated statutes or hallucinated legal advice. Every claim is strictly grounded in verified legislation from the official Bangladesh Code with verbatim quotations.'
      ),
      metrics: [
        { value: t('১,০৪৬টি', '1,046+'), label: t('যাচাইকৃত ধারা', 'Sections') },
        { value: t('৪৯টি', '49'), label: t('প্রধান আইন', 'Major Acts') },
        { value: '100%', label: t('bdlaws লিঙ্ক', 'Official Link') },
      ],
      highlights: [
        t('বাংলাদেশ কোডের প্রামাণিক গেজেট ও ধারা থেকে হুবহু উদ্ধৃতি', 'Verbatim Bangladesh Code text & official gazette links'),
        t('শ্রম, জমি, পারিবারিক, ভোক্তা ও সাইবারসহ ৪৯টি প্রধান আইন', 'Cross-referenced coverage across 49 Acts and 7 core domains'),
      ],
      ctaText: t('আইনি ডাটাবেজ অন্বেষণ করুন', 'EXPLORE LEGAL CORPUS'),
      ctaLink: '/sources',
    },
    {
      id: 'checklists',
      num: '০২',
      tag: t('অ্যাকশন চেকলিস্ট', 'ACTION CHECKLIST'),
      icon: CheckSquare,
      title: t(
        'সহজ ৩ থেকে ৫টি করণীয় পদক্ষেপ ও সরকারি হটলাইন',
        'Clear Action Checklists & Official Hotlines'
      ),
      desc: t(
        'জটিল আইনে দিশেহারা না হয়ে জানুন কী কী প্রমাণ সংরক্ষণ করবেন এবং কোন সরকারি দপ্তর বা জরুরি হটলাইনে যোগাযোগ করবেন।',
        'Translate complex statutes into an intuitive 3 to 5 step checklist. Know what evidence to preserve and which public hotline to contact.'
      ),
      metrics: [
        { value: t('৩-৫টি', '3-5'), label: t('করণীয় ধাপ', 'Action Steps') },
        { value: t('৪টি', '4'), label: t('জরুরি হটলাইন', 'Hotlines') },
        { value: '24/7', label: t('তাৎক্ষণিক গাইড', 'Instant') },
      ],
      highlights: [
        t('প্রমাণ ও দালিলিক কাগজপত্র সংরক্ষণের সুনির্দিষ্ট দিকনির্দেশনা', 'Specific instructions for preserving essential evidence & documents'),
        t('জরুরি হটলাইন (৯৯৯ / ১৬১০৪) ও সরকারি আইনি সহায়তা (১৬৪৩০)', 'Hotlines: DIFE (16104), Police (999), and Legal Aid (16430 / 16699)'),
      ],
      ctaText: t('অনলাইন সহকারী ব্যবহার করুন', 'TRY ACTION ASSISTANT'),
      ctaLink: '/ask',
    },
    {
      id: 'drafts',
      num: '০৩',
      tag: t('প্রমিত খসড়া ও PDF', 'FORMAL DRAFTS'),
      icon: FileText,
      title: t(
        'বাংলায় প্রমিত আইনি আবেদন ও প্রিন্ট-রেডি A4 PDF',
        'Standardized Bangla Complaints & Print-Ready A4 PDF'
      ),
      desc: t(
        'আপনার দেওয়া তথ্যের ভিত্তিতে সরাসরি অভিযোগ বা জিডির ফরম্যাট তৈরি হয়। ব্রাউজারে বাংলায় সম্পাদনা ও নির্ভুল মার্জিনসহ A4 PDF ডাউনলোড করুন।',
        'Generate structured General Diary (GD) or formal complaint drafts. Review, edit in Bangla, and export crisp multi-page A4 PDFs.'
      ),
      metrics: [
        { value: t('১০টি', '10'), label: t('প্রমিত ফরম্যাট', 'Templates') },
        { value: 'A4 PDF', label: t('প্রিন্ট-রেডি', 'Print-Ready') },
        { value: '100%', label: t('ব্যক্তিগত সুরক্ষা', 'Private') },
      ],
      highlights: [
        t('শ্রম, পারিবারিক, ভোক্তা ও জিডিসহ ১০টি প্রমিত ফরম্যাট', '10 verified statutory templates for GD, Labour, and Consumer'),
        t('১০০% ব্রাউজারে সুরক্ষিত—ব্যক্তিগত কোনো ডেটা ক্লাউডে জমা থাকে না', '100% private in browser—zero personal data stored in cloud'),
      ],
      ctaText: t('খসড়া তৈরি শুরু করুন', 'START DRAFTING'),
      ctaLink: '/drafts',
    },
  ];

  const canonicalSteps = [
    {
      num: t('০১', '01'),
      tag: t('বিশ্লেষণ', 'ANALYSIS'),
      title: t('সমস্যা বর্ণনা করুন', 'Describe Your Situation'),
      desc: t(
        'আপনার সাধারণ ভাষায় ঘটনাটি জানান। MyLaws মূল আইনি বিরোধ ও এখতিয়ার স্বয়ংক্রিয়ভাবে শনাক্ত করে।',
        'Explain what happened in simple words. MyLaws instantly identifies the legal dispute and jurisdiction.'
      ),
      icon: Search,
      highlights: [
        t('মূল আইনি বিরোধ শনাক্তকরণ', 'Identifies core dispute'),
        t('প্রয়োজনীয় তথ্যের দ্রুত যাচাই', 'Verifies key facts'),
      ],
    },
    {
      num: t('০২', '02'),
      tag: t('গেজেট ও ধারা', 'STATUTES'),
      title: t('আইনি ধারা ও গেজেট', 'Statutes & Citations'),
      desc: t(
        'কাল্পনিক কিছু নয়; সরাসরি বাংলাদেশ কোডের প্রামাণিক গেজেট এবং আসল ধারার সহজ ব্যাখ্যা দেখুন।',
        'No guesswork. Get verbatim Bangladesh Code citations and verified official bdlaws links.'
      ),
      icon: BookOpen,
      highlights: [
        t('বাংলাদেশ কোডের আসল পাঠ', 'Verbatim official text'),
        t('সহজ ভাষায় নাগরিক অধিকার', 'Rights in plain language'),
      ],
    },
    {
      num: t('০৩', '03'),
      tag: t('অ্যাকশন প্ল্যান', 'CHECKLIST'),
      title: t('করণীয় পদক্ষেপের চেকলিস্ট', 'Clear Action Steps'),
      desc: t(
        'কী কী প্রমাণ সংরক্ষণ করবেন এবং কোন সরকারি দপ্তর বা হটলাইনে যাবেন—তার ৩-৫টি ধারাবাহিক ধাপ।',
        'Know what evidence to preserve, legal deadlines to follow, and official hotlines to call.'
      ),
      icon: CheckSquare,
      highlights: [
        t('৩ থেকে ৫টি ধারাবাহিক ধাপ', '3-5 prioritized steps'),
        t('সরকারি হটলাইন (৯৯৯ / ১৬১০৪)', 'Hotlines (999, 16104, 16121)'),
      ],
    },
    {
      num: t('০৪', '04'),
      tag: t('প্রমিত খসড়া', 'READY DRAFT'),
      title: t('প্রস্তুত দরখাস্ত ও PDF', 'Ready Draft & A4 PDF'),
      desc: t(
        'পরিস্থিতি অনুযায়ী সরাসরি জিডি বা অভিযোগপত্রের ফরম্যাট তৈরি হয় এবং প্রিন্ট-রেডি A4 PDF পাওয়া যায়।',
        'Official complaint drafts & GD generated from your facts, ready to edit and print in A4 PDF.'
      ),
      icon: FileText,
      highlights: [
        t('বাংলায় এডিটেবল দরখাস্ত', 'Editable in Bangla'),
        t('প্রিন্ট-রেডি অফিসিয়াল A4 PDF', 'Official print-ready A4 PDF'),
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F1EDE1] text-[#231F1C] transition-colors drafting-grid-96">
      <Header />

      <main className="flex-1">
        {/* ========================================================
            HERO SECTION: 12-Column Split Screen
            Desktop: Left Copy, Right 3D Turntable Scales
            Mobile: Full focus on Headline, Bangladesh Pride Badge & Direct Action
            ======================================================== */}
        <section
          ref={turntableContainerRef}
          className="relative w-full border-b border-border-light/80 py-6 sm:py-12 lg:py-16 flex items-center min-h-[auto] lg:min-h-[min(800px,calc(100vh-5rem))]"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT 6 COLUMNS: Headline, Promise, CTA & Guarantees */}
              <div className="lg:col-span-6 space-y-5 sm:space-y-6">
                
                {/* Main Hero Headline */}
                {lang === 'bn' ? (
                  <h1 className="font-anek text-3xl sm:text-5xl md:text-[3.25rem] font-extrabold text-[#231F1C] leading-[1.28] tracking-tight">
                    MyLaws: বাংলাদেশের প্রত্যেক নাগরিকের জন্য<br className="hidden md:inline" /> নির্ভরযোগ্য আইনি সহায়তা
                  </h1>
                ) : (
                  <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.14] text-[#231F1C]">
                    MyLaws: Intelligent Legal Assistance for Every Citizen of Bangladesh
                  </h1>
                )}

                {/* Subtitle / Promise */}
                {lang === 'bn' ? (
                  <p className="font-hind text-base sm:text-xl font-semibold text-accent-light tracking-wide">
                    আপনার অধিকার বুঝুন। নির্ভরযোগ্য পরবর্তী পদক্ষেপ নিন।
                  </p>
                ) : (
                  <p className="font-display text-base sm:text-xl font-medium text-accent-light italic">
                    Understand your rights. Know your next step.
                  </p>
                )}

                {/* Body Copy */}
                <p className="font-hind text-xs sm:text-base text-[#5A534A] leading-relaxed max-w-xl font-normal">
                  {t(
                    'সহজ বাংলা বা ইংরেজিতে আপনার সমস্যাটি বলুন। MyLaws জটিল আইনকে স্পষ্ট চেকলিস্টে রূপান্তরিত করে, সরকারি গেজেটের মূল বিধান দেখায় এবং প্রয়োজনীয় লিখিত অভিযোগ বা সাধারণ ডায়েরির (GD) খসড়া প্রস্তুত করে।',
                    'Describe everyday legal situations naturally in Bangla or English. MyLaws translates complex statutes into clear Action Checklists, inspects official gazette sources, and prepares editable drafts.'
                  )}
                </p>

                {/* Desktop Action Buttons (Visible only on tablets & desktops) */}
                <div className="hidden sm:flex flex-row items-center gap-3 pt-1">
                  <Link
                    href="/ask"
                    className="bracket-btn text-[#231F1C] hover:text-accent-light py-3 px-6 shadow-sm text-center active-press"
                  >
                    <span className={lang === 'bn' ? 'font-hind font-bold text-xs' : 'font-cinzel text-xs font-bold'}>
                      — {t('এখনই প্রশ্ন করুন', 'USE ONLINE NOW')} —
                    </span>
                  </Link>

                  <Link
                    href="/download"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-light bg-surface-light px-5 py-3 text-xs tracking-wider text-[#231F1C] hover:border-accent-light hover:text-accent-light transition-all shadow-2xs active-press"
                  >
                    <Smartphone className="h-4 w-4 text-accent-light" />
                    <span className={lang === 'bn' ? 'font-hind font-semibold text-xs' : 'font-cinzel text-xs'}>
                      {t('অ্যাপ্লিকেশন', 'APPLICATION')}
                    </span>
                  </Link>
                </div>

                {/* Mobile Direct Focused Inquiry Unit (High clarity & zero visual noise on phones) */}
                <div className="sm:hidden space-y-3 pt-1">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const queryInput = (e.currentTarget.elements.namedItem('heroQuery') as HTMLInputElement)?.value;
                      if (queryInput && queryInput.trim()) {
                        window.location.href = `/ask?prompt=${encodeURIComponent(queryInput.trim())}`;
                      }
                    }}
                    className="flex items-center gap-2 p-1.5 rounded-2xl border border-accent-light/40 bg-surface-cardLight shadow-xs focus-within:border-accent-light focus-within:ring-2 focus-within:ring-accent-light/20"
                  >
                    <Search className="h-4 w-4 text-accent-light ml-2.5 shrink-0" />
                    <input
                      name="heroQuery"
                      type="text"
                      placeholder={t('আপনার আইনি সমস্যাটি এখানে লিখুন...', 'Type your legal issue here...')}
                      className="flex-1 bg-transparent px-2 py-2 text-xs text-primary-light placeholder:text-secondary-light/60 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="h-9 px-3.5 rounded-xl bg-accent-light text-white text-xs font-bold font-hind flex items-center gap-1 active-press shadow-xs shrink-0"
                    >
                      <span>{t('প্রশ্ন করুন', 'Ask')}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </form>

                  {/* Quick Mobile Category Chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                    {[
                      { label: t('বকেয়া বেতন', 'Unpaid Wages'), q: 'আমার মালিক দুই মাসের বেতন দেয়নি। কী কী বিষয় জানা দরকার?' },
                      { label: t('হুমকি ও জিডি', 'Threats & GD'), q: 'আমাকে অপরিচিত নম্বর থেকে হুমকি দেওয়া হচ্ছে। জিডি কীভাবে করব?' },
                      { label: t('অনলাইন প্রতারণা', 'Online Fraud'), q: 'অনলাইন দোকানে টাকা দিয়েছি কিন্তু পণ্য পাইনি। কোন আইন প্রাসঙ্গিক?' },
                      { label: t('জমি কেনাবেচা', 'Land Deal'), q: 'জমি কেনার আগে খতিয়ান সম্পর্কে কী যাচাই করব?' },
                    ].map((chip, idx) => (
                      <Link
                        key={idx}
                        href={`/ask?prompt=${encodeURIComponent(chip.q)}`}
                        className="shrink-0 px-3 py-1 rounded-full text-[11px] font-hind font-semibold bg-surface-cardLight border border-border-light text-secondary-light hover:text-accent-light hover:border-accent-light active-press shadow-2xs whitespace-nowrap flex items-center gap-1"
                      >
                        <Sparkles className="h-2.5 w-2.5 text-accent-light" />
                        <span>{chip.label}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Quick Action Link Row */}
                  <div className="flex items-center justify-between pt-1 px-1 text-[11px] font-hind">
                    <Link
                      href="/ask"
                      className="text-accent-light hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      <Sparkles className="h-3 w-3" />
                      <span>{t('সহকারীর সাথে সরাসরি চ্যাট →', 'Direct AI Assistant Chat →')}</span>
                    </Link>
                    <Link
                      href="/download"
                      className="text-secondary-light hover:text-accent-light inline-flex items-center gap-1 font-medium"
                    >
                      <Smartphone className="h-3 w-3 text-accent-light" />
                      <span>{t('অফলাইন অ্যাপ (৪৫%)', 'Offline App (45%)')}</span>
                    </Link>
                  </div>
                </div>

                {/* Trust Guarantees: Compact single-row on mobile, spacious wrap on desktop */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 sm:gap-x-4 gap-y-1.5 pt-2 text-[11px] sm:text-xs text-[#5A534A] font-hind">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0" />
                    <span>{t('অফিশিয়াল গেজেট', 'Gazette Citations')}</span>
                  </div>
                  <span className="text-secondary-light/40">•</span>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0" />
                    <span>{t('১০০% গোপনীয়', '100% Private')}</span>
                  </div>
                  <span className="text-secondary-light/40">•</span>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0" />
                    <span>{t('লগইন ছাড়া ব্যবহার্য', 'No Sign-up Needed')}</span>
                  </div>
                  <span className="text-secondary-light/40">•</span>
                  <Link href="/lawyers" className="flex items-center gap-1 text-accent-light hover:underline font-semibold">
                    <Scale className="h-3.5 w-3.5 text-accent-light shrink-0" />
                    <span>{t('যাচাইকৃত আইনজীবী', 'Verified Lawyers')}</span>
                  </Link>
                </div>

                {/* Interactive Animated Scroll Cue */}
                <div className="pt-1 flex items-center justify-center sm:justify-start">
                  <a
                    href="#how-it-works"
                    className="group inline-flex items-center gap-2 text-xs text-[#5A534A] hover:text-accent-light transition-all py-1.5 px-3.5 rounded-full bg-surface-light border border-border-light/80 shadow-2xs"
                    aria-label={t('স্ক্রল করে ৪টি ধাপের কার্যপদ্ধতি দেখুন', 'Scroll to view 4-step methodology')}
                  >
                    <ChevronDown className="h-3.5 w-3.5 text-accent-light animate-scroll-bounce" />
                    <span className={lang === 'bn' ? 'font-hind font-semibold text-xs' : 'font-cinzel text-xs tracking-wider'}>
                      {t('কার্যপ্রণালী ও ৪টি ধাপ দেখুন', 'EXPLORE 4-STEP METHODOLOGY')}
                    </span>
                  </a>
                </div>
              </div>

              {/* RIGHT 6 COLUMNS: 3D Turntable Scales of Justice (Desktop/Laptop Only - Hidden on Mobile) */}
              <div className="hidden lg:flex lg:col-span-6 items-center justify-center py-2 px-1">
                <TurntableScales containerRef={turntableContainerRef} />
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            4-STEP CANONICAL LEGAL JOURNEY SECTION (Clean & Easy Workflow)
            ======================================================== */}
        <section id="how-it-works" className="py-8 sm:py-16 md:py-20 border-b border-border-light/80 bg-surface-light/40 scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                {t('কীভাবে কাজ করে', 'HOW IT WORKS')}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#231F1C] tracking-tight">
                {t('সহজ ৪টি ধাপে আপনার আইনি সমাধান', '4 Simple Steps to Resolve Your Legal Issue')}
              </h2>
              <p className="text-xs sm:text-sm text-[#5A534A] leading-relaxed font-hind">
                {t(
                  'কোনো জটিল আইনি বইয়ের ভাষা নয়—আপনার সাধারণ বর্ণনা থেকে সঠিক ধারা, করণীয় ধাপ এবং প্রস্তুত দরখাস্ত।',
                  'No complicated legal jargon. From your plain-language story to verified statutes, action steps, and ready drafts.'
                )}
              </p>
            </div>

            {/* Mobile Connected Timeline Journey (< sm) */}
            <div className="sm:hidden relative mt-6 pl-7 space-y-4 my-6">
              {/* Vertical connecting line */}
              <div className="absolute left-3.5 top-3 bottom-3 w-[2px] bg-gradient-to-b from-accent-light via-accent-gold/60 to-accent-light/30" />

              {canonicalSteps.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div key={idx} className="relative group">
                    {/* Step marker node */}
                    <div className="absolute -left-7 top-1 flex h-7 w-7 items-center justify-center rounded-xl bg-accent-light text-white font-anek font-bold text-xs shadow-xs ring-4 ring-[#F1EDE1]">
                      <span>{step.num}</span>
                    </div>

                    {/* Step Content Card */}
                    <div className="p-3.5 rounded-2xl border border-border-light bg-surface-cardLight space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-cinzel text-[9px] uppercase font-bold tracking-wider text-accent-light bg-accent-light/10 border border-accent-light/20 px-2 py-0.5 rounded-full">
                          {step.tag}
                        </span>
                        <StepIcon className="h-3.5 w-3.5 text-accent-light" />
                      </div>

                      <h3 className="font-anek text-sm font-bold text-[#231F1C] leading-snug">
                        {step.title}
                      </h3>

                      <p className="text-[11px] text-[#5A534A] leading-relaxed font-hind">
                        {step.desc}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1 border-t border-border-light/60">
                        {step.highlights.map((h, hIdx) => (
                          <span key={hIdx} className="inline-flex items-center gap-1 text-[10px] font-hind text-secondary-light bg-surface-light px-2 py-0.5 rounded border border-border-light/60">
                            <CheckCircle2 className="h-2.5 w-2.5 text-accent-light shrink-0" />
                            <span>{h}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Connected Step Cards Container (sm:) */}
            <div className="hidden sm:block relative mt-8 sm:mt-12">
              {/* Connecting horizontal track line for desktop */}
              <div className="hidden lg:block absolute top-[28px] left-[6%] right-[6%] h-[2px] bg-gradient-to-r from-accent-light/20 via-accent-gold/30 to-accent-light/20 z-0" />

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-stretch relative z-10">
                {canonicalSteps.map((step, idx) => {
                  const StepIcon = step.icon;
                  return (
                    <TiltCard key={idx} maxTilt={5} className="h-full">
                      <div
                        className="group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-border-light bg-surface-cardLight shadow-xs space-y-3.5 sm:space-y-4 hover:border-accent-light hover:shadow-md transition-all flex flex-col justify-between h-full"
                      >
                        <div className="space-y-3">
                          {/* Step Header */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-light text-white font-anek font-bold text-xs sm:text-sm shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                                <span>{step.num}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-accent-light text-xs font-semibold">
                                <StepIcon className="h-4 w-4" />
                              </div>
                            </div>
                            
                            <span className="font-cinzel text-[10px] tracking-wider uppercase font-bold text-accent-light bg-accent-light/10 border border-accent-light/20 px-2.5 py-0.5 rounded-full truncate max-w-[125px]">
                              {step.tag}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-anek sm:font-display text-base sm:text-lg font-bold text-[#231F1C] group-hover:text-accent-light transition-colors leading-snug pt-0.5">
                            {step.title}
                          </h3>

                          {/* Description */}
                          <p className="text-xs text-[#5A534A] leading-relaxed font-hind">
                            {step.desc}
                          </p>

                          {/* Key deliverables pills / checkmarks */}
                          <div className="space-y-1.5 pt-2 border-t border-border-light/60">
                            {step.highlights.map((h, hIdx) => (
                              <div key={hIdx} className="flex items-start gap-1.5 text-[11px] font-hind text-secondary-light">
                                <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0 mt-0.5" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Subtle bottom indicator */}
                        <div className="pt-2 flex items-center justify-end text-accent-light/60 group-hover:text-accent-light transition-colors">
                          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </TiltCard>
                  );
                })}
              </div>
            </div>

            {/* Bottom Workflow Action Prompt */}
            <div className="mt-8 sm:mt-10 text-center">
              <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 p-3 px-5 rounded-2xl border border-border-light bg-surface-cardLight shadow-xs max-w-xl mx-auto">
                <div className="flex items-center gap-2 text-xs font-medium text-secondary-light font-hind">
                  <Sparkles className="h-4 w-4 text-accent-light shrink-0" />
                  <span>{t('এই ৪টি ধাপ এখনই নিজের কোনো সমস্যা দিয়ে দেখতে চান?', 'Want to test this 4-step workflow on your situation?')}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href="/ask"
                    className="bracket-btn text-xs font-cinzel font-bold py-1.5 px-3.5 text-center active-press"
                  >
                    <span>— {t('এখনই প্রশ্ন করুন →', 'TRY IT NOW →')} —</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            CORE FEATURES SECTION: 3 Core Capabilities (Clean & Approachable)
            ======================================================== */}
        <section id="core-features" className="py-8 sm:py-16 md:py-20 border-b border-border-light/80 bg-surface-light/35 scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center space-y-2 mb-8 sm:mb-12 max-w-2xl mx-auto">
              <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                {t('মৌলিক ৩টি আইনি সক্ষমতা', 'THREE CORE CAPABILITIES')}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#231F1C] tracking-tight">
                {t(
                  'আইনি সচেতনতা থেকে কার্যকর পদক্ষেপ—MyLaws এর ৩টি মূল স্তম্ভ',
                  'From Legal Awareness to Action: Three Foundational Pillars'
                )}
              </h2>
              <p className="text-xs sm:text-sm text-[#5A534A] font-hind leading-relaxed">
                {t(
                  'সরকারি গেজেট যাচাই, ধাপে ধাপে ব্যবহারিক চেকলিস্ট এবং প্রমিত আইনি আবেদনপত্রের সহজ ও সমন্বিত সমাধান।',
                  'A streamlined framework combining verified statutory citations, practical checklists, and verified draft preparation.'
                )}
              </p>
            </div>

            {/* Mobile 3-Pillar Tab Switcher (< lg) */}
            <div className="lg:hidden mb-6">
              <div className="flex items-center p-1 rounded-xl bg-surface-cardLight border border-border-light shadow-2xs">
                {foundationalPillars.map((pillar, idx) => (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActivePillar(idx)}
                    className={`flex-1 py-2 px-1 text-center text-xs font-semibold rounded-lg transition-all ${
                      activePillar === idx
                        ? 'bg-accent-light text-white shadow-xs font-bold'
                        : 'text-secondary-light hover:text-primary-light'
                    }`}
                  >
                    <span className="font-anek">{pillar.num}. </span>
                    <span className="font-hind">{pillar.tag}</span>
                  </button>
                ))}
              </div>

              {/* Single Active Pillar Card on Mobile */}
              <div className="mt-3.5">
                {(() => {
                  const activeItem = foundationalPillars[activePillar];
                  const ActiveIcon = activeItem.icon;
                  return (
                    <div className="p-4 sm:p-6 rounded-2xl border border-border-light bg-surface-cardLight shadow-xs space-y-3.5">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
                          <ActiveIcon className="h-3.5 w-3.5 shrink-0" />
                          <span className="font-cinzel text-[10px] tracking-wider uppercase font-bold">
                            {activeItem.tag}
                          </span>
                        </div>
                        <span className="font-cinzel font-bold text-accent-light/70 text-sm">{activeItem.num}</span>
                      </div>

                      <h3 className="font-anek text-base sm:text-lg font-bold text-[#231F1C] leading-snug">
                        {activeItem.title}
                      </h3>

                      <p className="font-hind text-xs text-[#5A534A] leading-relaxed">
                        {activeItem.desc}
                      </p>

                      <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                        {activeItem.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/60">
                            <span className="font-bold text-accent-light font-cinzel text-xs sm:text-sm block">{m.value}</span>
                            <p className="text-[10px] text-[#5A534A] font-hind truncate">{m.label}</p>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1.5 pt-1 text-xs font-hind border-t border-border-light/60">
                        {activeItem.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-[#5A534A]">
                            <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2">
                        <Link
                          href={activeItem.ctaLink}
                          className="bracket-btn text-xs font-bold tracking-wider inline-block text-center w-full py-2.5 active-press"
                        >
                          <span>— {activeItem.ctaText} —</span>
                        </Link>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Desktop 3-Column Dossier Grid (hidden on mobile, visible on lg:) */}
            <div className="hidden lg:grid grid-cols-3 gap-6 items-stretch">
              {foundationalPillars.map((pillar) => {
                const PillarIcon = pillar.icon;
                return (
                  <TiltCard key={pillar.id} maxTilt={4} className="h-full">
                    <div className="p-5 sm:p-7 rounded-3xl border border-border-light bg-surface-cardLight/95 shadow-xs flex flex-col justify-between space-y-4 hover:border-accent-light/50 transition-all h-full">
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
                            <PillarIcon className="h-3.5 w-3.5 shrink-0" />
                            <span className="font-cinzel text-[10px] tracking-wider uppercase font-bold truncate max-w-[160px]">
                              {pillar.tag}
                            </span>
                          </div>
                          <span className="font-cinzel font-bold text-accent-light/70 text-base">{pillar.num}</span>
                        </div>

                        <h3 className="font-anek text-lg sm:text-xl font-bold text-[#231F1C] tracking-tight leading-snug">
                          {pillar.title}
                        </h3>

                        <p className="font-hind text-xs text-[#5A534A] leading-relaxed">
                          {pillar.desc}
                        </p>

                        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                          {pillar.metrics.map((m, mIdx) => (
                            <div key={mIdx} className="p-2 rounded-xl border border-border-light bg-[#F1EDE1]/60">
                              <span className="font-bold text-accent-light font-cinzel text-xs sm:text-sm block">{m.value}</span>
                              <p className="text-[10px] text-[#5A534A] font-hind">{m.label}</p>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-1.5 pt-1 text-xs font-hind border-t border-border-light/60">
                          {pillar.highlights.map((h, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2 text-[#5A534A]">
                              <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border-light/60">
                        <Link
                          href={pillar.ctaLink}
                          className="bracket-btn text-xs font-bold tracking-wider inline-block text-center w-full py-2"
                        >
                          <span>— {pillar.ctaText} —</span>
                        </Link>
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            SIMPLIFIED TOPIC COVERAGE SECTION
            Non-informatic, clean, human-centered citizen categories.
            Detailed statutory basis accessible on demand.
            ======================================================== */}
        <section id="topics-covered" className="py-8 sm:py-16 md:py-20 border-b border-border-light/80 bg-surface-light/40 scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-12">
              <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                {t('আইনি ক্ষেত্রসমূহ', 'TOPIC COVERAGE')}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#231F1C] tracking-tight">
                {t('যেসব আইনি সমস্যায় পাশে পাবেন', 'What Can MyLaws Help You With?')}
              </h2>
              <p className="text-xs sm:text-sm text-[#5A534A] leading-relaxed font-hind">
                {t(
                  'দৈনন্দিন নাগরিক জীবনের ৬টি প্রধান ক্ষেত্রে সহজ বাংলায় নির্ভরযোগ্য আইনি সমাধান ও প্রস্তুত দরখাস্ত।',
                  'Clear guidance, statutory grounding, and ready complaint drafts for everyday legal situations.'
                )}
              </p>
            </div>

            {/* Responsive Topic Grid: 2-column compact on phones (< md), 3-column spacious on desktop (lg:) */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
              {supportedTopics.map((topic) => {
                const IconComponent = topic.icon;
                return (
                  <TiltCard key={topic.id} maxTilt={3} className="h-full">
                    <div 
                      onClick={() => setSelectedTopic(topic)}
                      className="p-3.5 sm:p-6 rounded-2xl border border-border-light bg-surface-cardLight hover:border-accent-light/50 transition-all shadow-xs h-full flex flex-col justify-between group active:scale-[0.98] cursor-pointer"
                    >
                      <div className="space-y-2 sm:space-y-3">
                        {/* Header: Icon + Law Tag */}
                        <div className="flex items-center justify-between">
                          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-accent-light/10 text-accent-light group-hover:bg-accent-light group-hover:text-white transition-colors shrink-0">
                            <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                          </div>
                          <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 sm:px-2 py-0.5 rounded bg-surface-light border border-border-light/70 text-secondary-light font-hind truncate max-w-[85px] sm:max-w-none">
                            {topic.law.split(',')[0]}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-xs sm:text-lg font-bold text-[#231F1C] leading-snug line-clamp-2">
                          {topic.title}
                        </h3>

                        {/* Simple plain-language 1-line citizen explanation */}
                        <p className="text-[11px] sm:text-xs text-[#5A534A] leading-relaxed font-hind line-clamp-2">
                          {topic.shortSummary}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-border-light/60 flex items-center justify-between gap-1 text-[11px] sm:text-xs">
                        <span className="font-semibold text-secondary-light group-hover:text-accent-light transition-colors font-hind flex items-center gap-1">
                          <Info className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-accent-light" />
                          <span className="hidden sm:inline">{t('আইনি ভিত্তি ও বিস্তারিত', 'Legal basis & details')}</span>
                          <span className="sm:hidden">{t('বিস্তারিত', 'Details')}</span>
                        </span>

                        <Link
                          href={`/ask?prompt=${encodeURIComponent(topic.sampleQuery)}`}
                          onClick={(e) => e.stopPropagation()}
                          className="font-bold text-accent-light hover:underline font-hind shrink-0 flex items-center gap-0.5"
                        >
                          <span>{t('প্রশ্ন', 'Ask')}</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </div>

            {/* Bottom transparency badge linking to full Sources repository */}
            <div className="mt-8 sm:mt-10 text-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full border border-border-light/80 bg-surface-cardLight text-xs text-[#5A534A] font-hind shadow-2xs">
                <ShieldCheck className="h-4 w-4 text-accent-light shrink-0" />
                <span>{t('বাংলাদেশ কোডের ৪৯টি আইন ও ১,০৪৬টি যাচাইকৃত ধারা অন্তর্ভুক্ত।', 'Verified against 49 Bangladesh statutes and 1,046 provisions.')}</span>
                <Link href="/sources" className="text-accent-light font-bold hover:underline ml-1">
                  {t('সকল আইন দেখুন →', 'Browse All Statutes →')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            TOPIC DETAIL MODAL / DRAWER
            Opens when a user wants to know specific legal details,
            sections, and sample prompts without cluttering the homepage.
            ======================================================== */}
        {selectedTopic && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedTopic(null);
            }}
          >
            <div className="relative w-full max-w-xl rounded-t-3xl sm:rounded-2xl border-t sm:border border-border-light bg-[#FBF9F4] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col pb-safe">
              
              {/* Mobile Drag Indicator Bar */}
              <div className="w-10 h-1 rounded-full bg-secondary-light/30 mx-auto mt-2.5 -mb-1 sm:hidden shrink-0" />

              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-border-light/70 px-5 sm:px-6 py-4 bg-bg-light/60 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-light/15 text-accent-light shrink-0">
                    {React.createElement(selectedTopic.icon, { className: 'h-4 w-4' })}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold font-display text-primary-light">
                      {selectedTopic.title}
                    </h3>
                    <p className="text-[11px] text-[#5A534A] font-hind">
                      {selectedTopic.law}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTopic(null)}
                  className="rounded-lg p-1.5 text-secondary-light hover:bg-border-light/50 active-press transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto p-5 sm:p-6 space-y-4 font-hind">
                {/* Governing Statute & Key Sections */}
                <div className="p-3.5 rounded-xl bg-surface-cardLight border border-border-light space-y-1">
                  <div className="flex items-center gap-1.5 text-accent-light text-xs font-bold font-cinzel uppercase tracking-wider">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>{t('আইনি ভিত্তি ও সংশ্লিষ্ট ধারা', 'Statutory Basis & Sections')}</span>
                  </div>
                  <div className="text-xs text-[#231F1C] font-semibold">
                    {selectedTopic.law}
                  </div>
                  <div className="text-[11px] text-[#5A534A]">
                    {t('প্রধান প্রাসঙ্গিক ধারা: ', 'Key relevant sections: ')}
                    <span className="font-semibold text-primary-light">{selectedTopic.sections}</span>
                  </div>
                </div>

                {/* What MyLaws provides */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-primary-light">
                    {t('MyLaws আপনাকে কীভাবে সাহায্য করে:', 'What MyLaws Helps You With:')}
                  </div>
                  <div className="space-y-1.5 text-xs text-[#5A534A]">
                    {selectedTopic.remedies.map((remedy, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                        <span>{remedy}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Citizen Query Box */}
                <div className="p-4 rounded-xl bg-accent-light/5 border border-accent-light/20 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-accent-light text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{t('এই বিষয়ের নমুনা প্রশ্ন', 'Sample Citizen Query')}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-primary-light italic font-medium">
                    &ldquo;{selectedTopic.sampleQuery}&rdquo;
                  </p>
                  <Link
                    href={`/ask?prompt=${encodeURIComponent(selectedTopic.sampleQuery)}`}
                    onClick={() => setSelectedTopic(null)}
                    className="bracket-btn text-xs font-bold tracking-wider inline-block text-center w-full py-2 shadow-2xs"
                  >
                    <span>— {t('এই প্রশ্ন নিয়ে সহকারীকে জিজ্ঞেস করুন →', 'ASK ASSISTANT THIS QUESTION →')} —</span>
                  </Link>
                  <Link
                    href={`/lawyers?topic=${selectedTopic.id}`}
                    onClick={() => setSelectedTopic(null)}
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-[#5A534A] hover:text-[#9A6F32] font-semibold w-full pt-1 transition-colors"
                  >
                    <Scale className="h-3.5 w-3.5 text-[#9A6F32]" />
                    <span>{t('এই বিষয়ের জেলা আইনজীবী খুঁজুন →', 'Find District Lawyers in this Field →')}</span>
                  </Link>
                </div>
              </div>

              {/* Modal Footer with Carousel-style Next/Previous Switcher */}
              <div className="flex items-center justify-between border-t border-border-light/70 px-5 sm:px-6 py-3 bg-bg-light/40 shrink-0 text-xs font-hind">
                <button
                  type="button"
                  onClick={() => setSelectedTopic(prevTopic)}
                  className="inline-flex items-center gap-1 text-secondary-light hover:text-accent-light font-semibold transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>{t('পূর্ববর্তী বিষয়', 'Previous')}</span>
                </button>
                <div className="text-[11px] text-secondary-light/80">
                  {currentTopicIndex + 1} / {supportedTopics.length}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTopic(nextTopic)}
                  className="inline-flex items-center gap-1 text-secondary-light hover:text-accent-light font-semibold transition-colors cursor-pointer"
                >
                  <span>{t('পরবর্তী বিষয়', 'Next')}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================
            VERIFIED DISTRICT ADVOCATES & CHAMBERS SHOWCASE
            ======================================================== */}
        <section className="py-8 sm:py-16 md:py-20 border-b border-border-light/80 bg-[#F4EFE3]/60 dark:bg-[#201C19]/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left 7 cols: Story & Trust Values */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-light/30 bg-accent-light/10 text-accent-light text-xs font-semibold font-hind">
                  <ShieldCheck className="h-4 w-4" />
                  <span>{t('৬৪ জেলার সরকারি ও বার কাউন্সিল যাচাইকৃত তালিকা', 'Bar Council Verified Across 64 Districts')}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#231F1C] tracking-tight leading-tight">
                  {t(
                    'আইনি প্রতিনিধিত্ব: ৬৪ জেলার যাচাইকৃত আইনজীবী ও চেম্বার ডিরেক্টরি',
                    'Access to Justice: Verified Advocates & Chamber Directory'
                  )}
                </h2>

                <p className="text-xs sm:text-sm text-[#5A534A] leading-relaxed font-hind">
                  {t(
                    'কোনো দালাল বা মধ্যস্বত্বভোগী ছাড়া আপনার জেলার বিজ্ঞ আইনজীবীর সাথে সরাসরি যোগাযোগ করুন। সুপ্রিম কোর্টের আপিল ও হাইকোর্ট বিভাগ, জেলা ও দায়রা জজ আদালত এবং সরকারি লিগ্যাল এইড (বিনামূল্যে আইনি সহায়তা) প্যানেলভুক্ত আইনজীবীদের সঠিক তথ্য এক জায়গায়।',
                    'Connect directly with licensed advocates in your district without intermediaries or referral fees. Covers Bangladesh Supreme Court (Appellate & High Court Divisions), District Courts, and Govt Legal Aid Panel lawyers.'
                  )}
                </p>

                {/* 4 Pillars of the Directory */}
                <div className="grid grid-cols-2 gap-3 pt-2 font-hind text-xs">
                  <div className="p-3 rounded-xl bg-surface-cardLight border border-border-light space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#231F1C] font-anek">
                      <Scale className="h-4 w-4 text-accent-light" />
                      <span>{t('বার সনদ যাচাইকৃত', 'Bar Verified')}</span>
                    </div>
                    <p className="text-[11px] text-[#5A534A]">{t('SCBA, DBA ও জেলা বার সমিতির সনদ নম্বর সহ তালিকা।', 'Listed with official Bar Council registration numbers.')}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-cardLight border border-border-light space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#231F1C] font-anek">
                      <Users className="h-4 w-4 text-accent-light" />
                      <span>{t('বিনামূল্যে লিগ্যাল এইড', 'Free Legal Aid')}</span>
                    </div>
                    <p className="text-[11px] text-[#5A534A]">{t('অসচ্ছল নাগরিকদের জন্য সরকারি প্যানেল আইনজীবী ও হটলাইন ১৬৬৯৯।', 'Official NLASO panel lawyers for underprivileged citizens.')}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-cardLight border border-border-light space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#231F1C] font-anek">
                      <Briefcase className="h-4 w-4 text-accent-light" />
                      <span>{t('বিষয়ভিত্তিক ফিল্টার', 'Practice Domains')}</span>
                    </div>
                    <p className="text-[11px] text-[#5A534A]">{t('শ্রম আইন, জমিজমা, ফৌজদারি ও পারিবারিক বিশেষায়িত চেম্বার।', 'Specialized by Labour, Land, Criminal, and Family Law.')}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-cardLight border border-border-light space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#231F1C] font-anek">
                      <Building className="h-4 w-4 text-accent-light" />
                      <span>{t('সরাসরি যোগাযোগ', 'Direct Chambers')}</span>
                    </div>
                    <p className="text-[11px] text-[#5A534A]">{t('স্থায়ী চেম্বার ঠিকানা, সাক্ষাতের সময় ও সরাসরি ফোন কল।', 'Chamber floor locations, visiting hours & direct phone.')}</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/lawyers"
                    className="bracket-btn text-xs font-bold tracking-wider py-2.5 px-6 shadow-sm active-press inline-flex items-center gap-2"
                  >
                    <span>— {t('আইনজীবী ডিরেক্টরিতে খুঁজুন', 'BROWSE ADVOCATES DIRECTORY')} —</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/lawyers?legalAid=1"
                    className="text-xs font-anek font-semibold text-emerald-800 dark:text-emerald-300 hover:underline inline-flex items-center gap-1"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{t('সরকারি বিনামূল্যে আইনি সহায়তা তালিকা →', 'Free Legal Aid Panel →')}</span>
                  </Link>
                </div>
              </div>

              {/* Right 5 cols: Interactive Preview Card */}
              <div className="lg:col-span-5">
                <div className="p-5 sm:p-6 rounded-3xl border border-border-light bg-surface-cardLight shadow-md space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border-light/60">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-anek font-bold text-xs text-[#231F1C]">{t('ডিরেক্টরি নমুনা কার্ড', 'Sample Verified Listing')}</span>
                    </div>
                    <span className="text-[10px] font-anek font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-800 border border-blue-500/20">
                      {t('হাইকোর্ট বিভাগ', 'High Court')}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-anek text-base sm:text-lg font-bold text-[#231F1C]">
                      {t('অ্যাডভোকেট সৈয়দ রফিকুল হক', 'Advocate Syed Rafiqul Haque')}
                    </h3>
                    <p className="text-xs text-[#5A534A] font-hind">
                      {t('বাংলাদেশ সুপ্রিম কোর্ট (হাইকোর্ট বিভাগ) • ২২+ বছর অভিজ্ঞতা', 'Supreme Court of Bangladesh • 22+ Years Experience')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#5A534A] bg-[#FAF7F0] p-2 rounded-xl border border-border-light/70 font-hind">
                    <Award className="h-3.5 w-3.5 text-accent-light shrink-0" />
                    <span><strong>SCBA #14205</strong> • {t('সুপ্রিম কোর্ট বার অ্যাসোসিয়েশন', 'Supreme Court Bar')}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <span className="text-[10px] font-anek font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
                      {t('জমি কেনাবেচা ও খতিয়ান', 'Land & Property')}
                    </span>
                    <span className="text-[10px] font-anek font-semibold px-2 py-0.5 rounded-md bg-red-500/10 text-red-800 border border-red-500/20">
                      {t('হুমকি ও ফৌজদারি (জামিন)', 'Criminal & Bail')}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-border-light/60 flex items-center justify-between">
                    <div className="text-[11px] text-[#5A534A] font-hind">
                      <span className="block font-bold">{t('চেম্বার: সুপ্রিম কোর্ট এনেক্স ভবন', 'Chamber: Supreme Court Annex')}</span>
                      <span>{t('সময়: সন্ধ্যা ৬:৩০ - রাত ৯:০০', 'Hours: 6:30 PM - 9:00 PM')}</span>
                    </div>
                    <Link
                      href="/lawyers"
                      className="px-3 py-1.5 rounded-xl bg-accent-light text-white text-xs font-anek font-bold hover:bg-[#855D28] transition-colors"
                    >
                      {t('বিস্তারিত দেখুন', 'View Details')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            WEB VS ANDROID COMPARISON
            ======================================================== */}
        <section className="py-8 sm:py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2 mb-8 sm:mb-10">
              <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                {t('প্ল্যাটফর্ম সমন্বয়', 'PLATFORM ARCHITECTURE')}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#231F1C]">
                {t('ওয়েব ও অ্যান্ড্রয়েড অ্যাপের সংযোগ', 'Seamless Web & Android Interoperability')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-5 sm:p-6 rounded-2xl border border-border-light bg-surface-light space-y-3.5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-cinzel font-bold text-[#231F1C]">
                  <Globe2 className="h-5 w-5 text-accent-light" />
                  <span>{t('অনলাইন ওয়েব সহকারী (Current Portal)', 'Online Web Assistant')}</span>
                </div>
                <ul className="text-xs space-y-2 text-[#5A534A] font-hind">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                    <span>{t('লগইন ছাড়া যেকোনো ব্রাউজার ও ডিভাইসে তাৎক্ষণিক ব্যবহারযোগ্য', 'Zero-friction browser access on any desktop or phone')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                    <span>{t('সম্পূর্ণ A4 প্রিন্ট উপযোগী বাংলা পিডিএফ ডাউনলোড', 'Complete print-ready multi-page A4 Bangla PDF export')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                    <span>{t('সার্ভারে ব্যবহারকারীর খসড়া তথ্য সংরক্ষণ করা হয় না', 'Zero remote persistence of personal case details')}</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl border border-border-light bg-surface-light space-y-3.5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-cinzel font-bold text-[#231F1C]">
                  <Smartphone className="h-5 w-5 text-accent-light" />
                  <span>{t('জেটপ্যাক কম্পোজ অ্যান্ড্রয়েড অ্যাপ', 'Native Android Application')}</span>
                </div>
                <ul className="text-xs space-y-2 text-[#5A534A] font-hind">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                    <span>{t('ডিভাইসের লোকাল ডাটাবেজে খসড়া ও ইতিহাস সংরক্ষণ', 'Local Room SQLite persistence of private cases')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                    <span>{t('ইন্টারনেট ছাড়া সংরক্ষিত আইনি প্যাক অনুসন্ধানের প্রস্তুতি', 'Offline search support with verified local legal packs')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                    <span>{t('একই ব্যাকএন্ড ও আইনি ডাটা পাইপলাইনের সাথে ১০০% সঙ্গতিপূর্ণ', 'Identical schema and data parity with web API')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
