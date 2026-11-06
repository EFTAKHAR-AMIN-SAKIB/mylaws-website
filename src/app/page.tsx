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
  MessageSquare,
  Lock,
  ExternalLink,
  Play,
  Check,
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
  const [activeSimCase, setActiveSimCase] = useState<number>(0);
  const [activeDivision, setActiveDivision] = useState<number>(0);
  const [desktopQueryInput, setDesktopQueryInput] = useState<string>('');

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

  const simulationCases = [
    {
      id: 'work',
      title: t('বকেয়া বেতন ও শ্রম অধিকার', 'Unpaid Wages & Labour Rights'),
      badge: t('শ্রম আইন', 'LABOUR'),
      query: t(
        'আমার মালিক দুই মাস ধরে বেতন দিচ্ছে না। আমি কীভাবে আইনি পদক্ষেপ নেব?',
        'My employer has not paid my salary for two months. How do I take legal steps?'
      ),
      statute: t('বাংলাদেশ শ্রম আইন, ২০০৬', 'Bangladesh Labour Act, 2006'),
      section: t('ধারা ১২৩ (মজুরি পরিশোধের সময়সীমা)', 'Section 123 (Time for payment of wages)'),
      statuteQuote: t(
        'মজুরি মেয়াদের শেষ তারিখের পরবর্তী ৭ কর্মদিবসের মধ্যে প্রত্যেক শ্রমিকের সমুদয় মজুরি পরিশোধ করিতে হইবে।',
        'Wages of every worker shall be paid before the expiry of the seventh working day after the last day of wage period.'
      ),
      checklist: [
        t('হাজিরা খাতা, নিয়োগপত্র বা বেতন রসিদের ছবি বা প্রমাণ সংগ্রহ', 'Preserve attendance records, ID card, or salary receipts'),
        t('কলকারখানা পরিদর্শন (DIFE) সরকারি হটলাইন ১৬১০৪-এ তাৎক্ষণিক অভিযোগ', 'Call DIFE Labour Inspector Helpline (16104) to register complaint'),
        t('শ্রম আদালতের নির্ধারিত ৬০ দিনের নোটিশ ও প্রমিত অভিযোগ খসড়া', 'Serve statutory formal notice & file petition with Labour Court'),
      ],
      draftName: t('শ্রম পরিদর্শকের নিকট প্রমিত অভিযোগপত্র', 'DIFE Formal Labour Inspector Complaint'),
      askPrompt: 'আমার মালিক দুই মাসের বেতন দেয়নি। কী কী বিষয় জানা দরকার?',
    },
    {
      id: 'gd',
      title: t('হুমকি ও পুলিশ জিডি (GD)', 'Threats & Police General Diary'),
      badge: t('ফৌজদারি ও সাইবার', 'CRIMINAL & CYBER'),
      query: t(
        'আমাকে ফোনে ও অনলাইনে হুমকি দেওয়া হচ্ছে। আমি কি থানায় জিডি করতে পারব?',
        'I am receiving threatening calls and online messages. How do I file a GD?'
      ),
      statute: t('দণ্ডবিধি, ১৮৬০ ও সাইবার বিধান', 'Penal Code, 1860 & Cyber Law'),
      section: t('ধারা ৫০৩ ও ৫০৭ (ফৌজদারি ভীতি প্রদর্শন)', 'Sections 503 & 507 (Criminal Intimidation)'),
      statuteQuote: t(
        'কোনো ব্যক্তি যদি অপর কোনো ব্যক্তির ক্ষতি সাধনের ভীতি প্রদর্শন করে, তবে তা অপরাধমূলক ভীতি প্রদর্শন হিসেবে গণ্য হইবে।',
        'Whoever threatens another with injury to person, reputation or property commits criminal intimidation.'
      ),
      checklist: [
        t('হুমকির তারিখ, সুনির্দিষ্ট সময় ও অডিও/স্ক্রিনশট সংরক্ষণ', 'Log exact call timestamps, preserve audio & message screenshots'),
        t('এখতিয়ারভুক্ত থানায় গিয়ে ভারপ্রাপ্ত কর্মকর্তার (OC) বরাবরে সাধারণ ডায়েরি', 'Submit structured petition to Officer-in-Charge (OC) at local Thana'),
        t('তাৎক্ষণিক নিরাপত্তার প্রয়োজনে জাতীয় জরুরি সেবা ৯৯৯ এ যোগাযোগ', 'Call National Emergency Service (999) if in imminent physical danger'),
      ],
      draftName: t('থানায় দাখিলের উপযোগী সাধারণ ডায়েরি (GD) আবেদন', 'Print-Ready Police General Diary (GD) Petition'),
      askPrompt: 'আমাকে অপরিচিত নম্বর থেকে হুমকি দেওয়া হচ্ছে। জিডি কীভাবে করব?',
    },
    {
      id: 'consumer',
      title: t('ভোক্তা অধিকার ও প্রতারণা', 'Consumer Rights & Fraud'),
      badge: t('ভোক্তা অধিকার', 'CONSUMER'),
      query: t(
        'অনলাইন শপে অগ্রিম টাকা দিয়ে পণ্য পাইনি, পেজটি আমাকে ব্লক করেছে। প্রতিকার কী?',
        'I paid an online shop in advance but never received the item. What is the legal remedy?'
      ),
      statute: t('ভোক্তা অধিকার সংরক্ষণ আইন, ২০০৯', 'Consumers’ Right Protection Act, 2009'),
      section: t('ধারা ৪০, ৪৪ ও ৪৫ (প্রতারণামূলক বিক্রয়)', 'Sections 40, 44 & 45 (Deceptive Practices)'),
      statuteQuote: t(
        'কোনো ব্যক্তি প্রতিশ্রুত পণ্য প্রদান না করিলে বা মিথ্যা প্রতিশ্রুতি দিলে তিনি অর্থদণ্ড ও কারাদণ্ডে দণ্ডনীয় হইবেন।',
        'Failure to deliver promised goods or deceptive promises constitutes a punishable statutory offence.'
      ),
      checklist: [
        t('অর্থ পাঠানোর ৩০ দিনের মধ্যে অভিযোগ দাখিল নিশ্চিতকরণ', 'File claim strictly within the statutory 30-day limitation window'),
        t('বিকাশ/নগদ পেমেন্ট ট্রানজেকশন আইডি ও চ্যাট হিস্ট্রি প্রিন্ট', 'Preserve bKash/Nagad transaction slips, invoice, and conversation history'),
        t('জাতীয় ভোক্তা অধিদপ্তরে (DNCRP) ২৫% সরকারি ক্ষতিপূরণসহ দাবি', 'Submit formal petition to DNCRP claiming statutory 25% penalty share'),
      ],
      draftName: t('ভোক্তা অধিকার সংরক্ষণ অধিদপ্তরে আইনি অভিযোগ', 'Formal DNCRP Consumer Protection Petition'),
      askPrompt: 'অনলাইন দোকানে টাকা দিয়েছি কিন্তু পণ্য পাইনি। কোন আইন প্রাসঙ্গিক হতে পারে?',
    },
  ];

  const lawyerDivisions = [
    {
      id: 'dhaka',
      name: t('ঢাকা বিভাগ', 'Dhaka'),
      advocateName: t('অ্যাডভোকেট সৈয়দ রফিকুল হক', 'Advocate Syed Rafiqul Haque'),
      court: t('বাংলাদেশ সুপ্রিম কোর্ট (হাইকোর্ট বিভাগ) • ২২+ বছর অভিজ্ঞতা', 'Supreme Court of Bangladesh • 22+ Years Experience'),
      barId: 'SCBA #14205',
      barName: t('সুপ্রিম কোর্ট বার অ্যাসোসিয়েশন', 'Supreme Court Bar Association'),
      tags: [t('জমি কেনাবেচা ও খতিয়ান', 'Land & Property'), t('হুমকি ও ফৌজদারি (জামিন)', 'Criminal & Bail')],
      chamber: t('চেম্বার: সুপ্রিম কোর্ট এনেক্স ভবন, ঢাকা', 'Chamber: Supreme Court Annex, Dhaka'),
      hours: t('সময়: সন্ধ্যা ৬:৩০ - রাত ৯:০০', 'Hours: 6:30 PM - 9:00 PM'),
      badge: t('হাইকোর্ট বিভাগ', 'High Court'),
      badgeColor: 'bg-blue-500/10 text-blue-800 border-blue-500/20',
    },
    {
      id: 'chittagong',
      name: t('চট্টগ্রাম বিভাগ', 'Chittagong'),
      advocateName: t('অ্যাডভোকেট মাহবুবুর রহমান', 'Advocate Mahbubur Rahman'),
      court: t('চট্টগ্রাম জেলা ও দায়রা জজ আদালত • ১৮+ বছর অভিজ্ঞতা', 'Chittagong District & Sessions Court • 18+ Years Experience'),
      barId: 'CDBA #842',
      barName: t('চট্টগ্রাম জেলা আইনজীবী সমিতি', 'Chittagong District Bar'),
      tags: [t('বকেয়া বেতন ও শ্রম অধিকার', 'Labour Law'), t('বাণিজ্যিক চুক্তি ও বিরোধ', 'Commercial Law')],
      chamber: t('চেম্বার: কোর্ট হিল ল’ চেম্বার্স, কোতোয়ালি, চট্টগ্রাম', 'Chamber: Court Hill Law Chambers, Chittagong'),
      hours: t('সময়: বিকাল ৫:০০ - রাত ৮:৩০', 'Hours: 5:00 PM - 8:30 PM'),
      badge: t('জেলা ও দায়রা জজ', 'District Court'),
      badgeColor: 'bg-amber-500/10 text-amber-800 border-amber-500/20',
    },
    {
      id: 'rajshahi',
      name: t('রাজশাহী বিভাগ', 'Rajshahi'),
      advocateName: t('অ্যাডভোকেট নাসরিন সুলতানা', 'Advocate Nasrin Sultana'),
      court: t('জেলা আদালত ও সরকারি লিগ্যাল এইড প্যানেল আইনজীবী', 'District Court & NLASO Free Legal Aid Panel'),
      barId: 'RDBA #519',
      barName: t('রাজশাহী জেলা বার ও লিগ্যাল এইড', 'Rajshahi District Bar & Legal Aid'),
      tags: [t('পারিবারিক দেনমোহর ও ভরণপোষণ', 'Family Law'), t('বিনামূল্যে সরকারি আইনি সহায়তা', 'Free Legal Aid')],
      chamber: t('চেম্বার: জেলা জজ আদালত বার ভবন-১, রাজশাহী', 'Chamber: District Judge Court Bar Bldg, Rajshahi'),
      hours: t('সময়: বিকাল ৪:৩০ - রাত ৮:০০', 'Hours: 4:30 PM - 8:00 PM'),
      badge: t('সরকারি লিগ্যাল এইড', 'Govt Legal Aid'),
      badgeColor: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20',
      isLegalAid: true,
    },
    {
      id: 'sylhet',
      name: t('সিলেট বিভাগ', 'Sylhet'),
      advocateName: t('অ্যাডভোকেট ফারুক আহমেদ', 'Advocate Faruq Ahmed'),
      court: t('সিলেট জেলা ও দায়রা জজ আদালত • ১৫+ বছর অভিজ্ঞতা', 'Sylhet District & Sessions Court • 15+ Years Experience'),
      barId: 'SDBA #630',
      barName: t('সিলেট জেলা আইনজীবী সমিতি', 'Sylhet District Bar'),
      tags: [t('প্রবাসী জমিজমা ও দলিল বিরোধ', 'Expatriate Land Rights'), t('সম্পত্তি হস্তান্তর আইন', 'Property Rights')],
      chamber: t('চেম্বার: বন্দরবাজার বার ভবন-২, সিলেট', 'Chamber: Bandar Bazar Bar Bldg-2, Sylhet'),
      hours: t('সময়: সন্ধ্যা ৬:০০ - রাত ৯:০০', 'Hours: 6:00 PM - 9:00 PM'),
      badge: t('জেলা আদালত', 'District Court'),
      badgeColor: 'bg-purple-500/10 text-purple-800 border-purple-500/20',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bg-light text-primary-light transition-colors drafting-grid-96">
      <Header />

      <main className="flex-1">
        {/* ========================================================
            HERO SECTION: 12-Column Split Screen
            Desktop: Left Copy & Obsidian Glass Prompt Launcher, Right Live Legal Reasoning Simulator
            Mobile: Full focus on Headline, 3-Step Micro Banner & Obsidian Glass Action
            ======================================================== */}
        <section
          ref={turntableContainerRef}
          className="relative w-full border-b border-border-light/80 py-6 sm:py-12 lg:py-16 flex items-center min-h-[auto] lg:min-h-[min(800px,calc(100vh-5rem))]"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT 6 COLUMNS: Headline, Promise, CTA & Guarantees */}
              <div className="lg:col-span-6">
                
                {/* ========================================================
                    DESKTOP & TABLET VIEW (sm:block, hidden on mobile)
                    Retains full 12-column architectural balance & live prompt terminal
                    ======================================================== */}
                <div className="hidden sm:block space-y-5 sm:space-y-6">
                  {/* Category Pill Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-light/10 border border-accent-light/30 text-accent-light text-xs font-hind font-semibold shadow-2xs">
                    <Sparkles className="h-3.5 w-3.5 text-accent-light animate-sparkle-twinkle" />
                    <span>{t('বাংলাদেশের প্রথম এআই আইনি প্ল্যাটফর্ম • বাংলাদেশ কোড গেজেট যাচাইকৃত', 'AI Legal Assistant • Verified against official Bangladesh Code')}</span>
                  </div>

                  {/* Main Hero Headline */}
                  {lang === 'bn' ? (
                    <h1 className="font-anek text-3xl sm:text-5xl md:text-[3.25rem] font-extrabold text-primary-light leading-[1.28] tracking-tight">
                      MyLaws: আইনি সমস্যার সহজ সমাধান,<br className="hidden md:inline" /> <span className="text-accent-light">নিজের ভাষায় এক ক্লিকে।</span>
                    </h1>
                  ) : (
                    <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.14] text-primary-light">
                      Intelligent Legal Help for Bangladesh, <span className="text-accent-light italic">In Plain Words.</span>
                    </h1>
                  )}

                  {/* Subtitle / Promise */}
                  {lang === 'bn' ? (
                    <p className="font-hind text-base sm:text-lg font-semibold text-accent-light tracking-wide">
                      আপনার অধিকার বুঝুন। নির্ভরযোগ্য পরবর্তী পদক্ষেপ নিন।
                    </p>
                  ) : (
                    <p className="font-display text-base sm:text-lg font-medium text-accent-light italic">
                      Understand your rights. Take verified legal action.
                    </p>
                  )}

                  {/* Body Copy */}
                  <p className="font-hind text-xs sm:text-base text-secondary-light leading-relaxed max-w-xl font-normal">
                    {t(
                      'সহজ বাংলা বা ইংরেজিতে আপনার সমস্যাটি বলুন। MyLaws জটিল আইনকে স্পষ্ট চেকলিস্টে রূপান্তরিত করে, সরকারি গেজেটের মূল বিধান দেখায় এবং প্রয়োজনীয় লিখিত অভিযোগ বা সাধারণ ডায়েরির (GD) খসড়া প্রস্তুত করে।',
                      'Describe everyday legal situations naturally in Bangla or English. MyLaws translates complex statutes into clear Action Checklists, inspects official gazette sources, and prepares editable drafts.'
                    )}
                  </p>

                  {/* Desktop Obsidian Glass Prompt Launcher */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (desktopQueryInput.trim()) {
                        window.location.href = `/ask?prompt=${encodeURIComponent(desktopQueryInput.trim())}`;
                      } else {
                        window.location.href = '/ask';
                      }
                    }}
                    className="relative group block overflow-hidden rounded-2xl p-[1.5px] transition-all duration-300 animate-glass-glow bg-gradient-to-r from-white/40 via-white/10 to-white/30"
                  >
                    <div className="absolute inset-0 pointer-events-none w-1/2 -skew-x-20 -translate-x-full bg-gradient-to-r from-transparent via-white/18 to-transparent animate-glass-sheen" />

                    <div className="relative rounded-[15px] bg-[#141210]/95 backdrop-blur-xl border border-white/15 p-2 sm:p-2.5 text-white flex items-center gap-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.22)]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.08] border border-white/20 text-white shrink-0 ml-1">
                        <Scale className="h-5 w-5 text-white/90" />
                      </div>

                      <input
                        type="text"
                        value={desktopQueryInput}
                        onChange={(e) => setDesktopQueryInput(e.target.value)}
                        placeholder={t('আপনার আইনি সমস্যাটি এখানে লিখুন বা জিজ্ঞেস করুন...', 'Describe your legal question or situation here...')}
                        className="flex-1 bg-transparent px-2 py-2 text-xs sm:text-sm text-white placeholder:text-white/45 focus:outline-none font-hind"
                      />

                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-xl bg-white/[0.15] hover:bg-white/[0.25] text-white border border-white/25 backdrop-blur-md text-xs font-bold font-hind shadow-xs transition-all duration-200 flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer"
                      >
                        <span>{t('সহকারীকে প্রশ্ন করুন', 'Ask Assistant')}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </form>

                  {/* Desktop Quick Direct Actions */}
                  <div className="flex flex-row items-center gap-3 pt-1">
                    <Link
                      href="/ask"
                      className="bracket-btn text-primary-light hover:text-accent-light py-2 px-5 shadow-sm text-center active-press"
                    >
                      <span className={lang === 'bn' ? 'font-hind font-bold text-xs' : 'font-cinzel text-xs font-bold'}>
                        — {t('অনলাইন সহকারী খুলুন', 'LAUNCH ASSISTANT')} —
                      </span>
                    </Link>

                    <Link
                      href="/download"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-light bg-surface-cardLight px-4 py-2 text-xs tracking-wider text-primary-light hover:border-accent-light hover:text-accent-light transition-all shadow-2xs active-press"
                    >
                      <Smartphone className="h-4 w-4 text-accent-light" />
                      <span className={lang === 'bn' ? 'font-hind font-semibold text-xs' : 'font-cinzel text-xs'}>
                        {t('অফলাইন অ্যাপ', 'OFFLINE APP')}
                      </span>
                    </Link>
                  </div>

                  {/* Desktop Trust Guarantees */}
                  <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-1.5 pt-2 text-xs text-secondary-light font-hind">
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

                  {/* Desktop Interactive Scroll Cue */}
                  <div className="pt-1 flex items-center justify-start">
                    <a
                      href="#how-it-works"
                      className="group inline-flex items-center gap-2 text-xs text-secondary-light hover:text-accent-light transition-all py-1.5 px-3.5 rounded-full bg-surface-cardLight border border-border-light shadow-2xs"
                      aria-label={t('স্ক্রল করে কার্যপদ্ধতি দেখুন', 'Scroll to view methodology')}
                    >
                      <ChevronDown className="h-3.5 w-3.5 text-accent-light animate-scroll-bounce" />
                      <span className={lang === 'bn' ? 'font-hind font-semibold text-xs' : 'font-cinzel text-xs tracking-wider'}>
                        {t('৩টি মৌলিক স্তম্ভ দেখুন', 'EXPLORE 3 PILLARS')}
                      </span>
                    </a>
                  </div>
                </div>

                {/* ========================================================
                    MOBILE TAILORED ARCHITECTURE (sm:hidden)
                    Ultra-clean, minimalistic, high-conversion & immediate clarity
                    ======================================================== */}
                <div className="sm:hidden space-y-4">
                  
                  {/* Category Pill Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-light/10 border border-accent-light/30 text-accent-light text-[11px] font-hind font-semibold shadow-2xs">
                    <Sparkles className="h-3 w-3 text-accent-light animate-sparkle-twinkle shrink-0" />
                    <span>{t('বাংলাদেশের এআই আইনি সহকারী', 'AI Legal Assistant • Bangladesh')}</span>
                  </div>

                  {/* Punchy, Clear Mobile Headline */}
                  <h1 className="font-anek text-[1.75rem] font-extrabold text-primary-light leading-[1.22] tracking-tight">
                    {lang === 'bn' ? (
                      <>
                        আইনি সমস্যার সহজ সমাধান,<br />
                        <span className="text-accent-light font-display">নিজের ভাষায় এক ক্লিকে।</span>
                      </>
                    ) : (
                      <>
                        Intelligent Legal Help,<br />
                        <span className="text-accent-light font-display">In Plain Words.</span>
                      </>
                    )}
                  </h1>

                  {/* Clear 1-Sentence Value Hook (No walls of text) */}
                  <p className="font-hind text-xs text-secondary-light leading-relaxed">
                    {t(
                      'আপনার সাধারণ ভাষায় সমস্যা বলুন—এআই সরাসরি সরকারি গেজেট থেকে সঠিক ধারা, করণীয় পদক্ষেপ এবং প্রস্তুত দরখাস্তের খসড়া দেবে।',
                      'Describe your situation in plain words. MyLaws instantly maps verified statutes, actionable checklists, and ready drafts.'
                    )}
                  </p>

                  {/* Visual 3-Step Micro Workflow Banner (Instant comprehension in 1 glance) */}
                  <div className="grid grid-cols-3 gap-1 p-2 rounded-2xl bg-surface-cardLight border border-border-light shadow-2xs">
                    <div className="flex flex-col items-center text-center p-1">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-light/10 text-accent-light mb-1">
                        <MessageSquare className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[11px] font-bold font-anek text-primary-light leading-tight">
                        {t('১. সমস্যা বলুন', '1. Describe')}
                      </span>
                      <span className="text-[9px] text-secondary-light font-hind mt-0.5 leading-none">
                        {t('সহজ ভাষায় জানান', 'In plain words')}
                      </span>
                    </div>

                    <div className="flex flex-col items-center text-center p-1 border-x border-border-light/70">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-light/10 text-accent-light mb-1">
                        <Scale className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[11px] font-bold font-anek text-primary-light leading-tight">
                        {t('২. আইন ও ধাপ', '2. Get Law')}
                      </span>
                      <span className="text-[9px] text-secondary-light font-hind mt-0.5 leading-none">
                        {t('গেজেট ও চেকলিস্ট', 'Statutes & steps')}
                      </span>
                    </div>

                    <div className="flex flex-col items-center text-center p-1">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-light/10 text-accent-light mb-1">
                        <FileText className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[11px] font-bold font-anek text-primary-light leading-tight">
                        {t('৩. রেডি ড্রাফট', '3. Ready Draft')}
                      </span>
                      <span className="text-[9px] text-secondary-light font-hind mt-0.5 leading-none">
                        {t('জিডি বা দরখাস্ত PDF', 'Printable PDF')}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Obsidian Glass Action Card (Human-Touch & Monochromatic Glass Animation) */}
                  <div className="pt-0.5">
                    <Link
                      href="/ask"
                      className="relative group w-full block overflow-hidden rounded-2xl p-[1px] transition-all duration-300 active:scale-[0.98] animate-glass-glow bg-gradient-to-r from-white/30 via-white/10 to-white/25"
                    >
                      {/* Monochromatic Diagonal Glass Sheen Sweep */}
                      <div className="absolute inset-0 pointer-events-none w-1/2 -skew-x-20 -translate-x-full bg-gradient-to-r from-transparent via-white/18 to-transparent animate-glass-sheen" />

                      <div className="relative rounded-[15px] bg-[#141210]/95 backdrop-blur-xl border border-white/15 px-4 py-3.5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.22)]">
                        <div className="flex items-center justify-between gap-3">
                          
                          {/* Left: Monochromatic Frosted Glass Icon Squircle */}
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.08] border border-white/20 text-white shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-300">
                              <Scale className="h-5 w-5 text-white/90" />
                              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
                            </div>

                            {/* Human Touch Center Content */}
                            <div className="text-left min-w-0">
                              <span className="block text-[10px] font-cinzel uppercase tracking-wider text-white/60 font-semibold truncate">
                                {t('ব্যক্তিগত আইনি পরামর্শ', 'CONFIDENTIAL CONSULTATION')}
                              </span>
                              <span className="block text-sm sm:text-base font-bold font-anek text-white leading-snug truncate">
                                {t('আপনার সমস্যাটি খুলে বলুন', 'Tell Us What Happened')}
                              </span>
                              <span className="block text-[11px] font-hind text-white/50 leading-none mt-0.5 truncate">
                                {t('গোপনীয় • নির্ভরযোগ্য আইনি সমাধান', 'Private • Clear statutory guidance')}
                              </span>
                            </div>
                          </div>

                          {/* Right: Glassy Translucent Action Pill */}
                          <div className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/[0.12] group-hover:bg-white/[0.22] text-white border border-white/25 backdrop-blur-md text-xs font-semibold font-hind shadow-xs transition-all duration-300 shrink-0">
                            <span>{t('শুরু করুন', 'Ask Now')}</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </div>

                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Clean Minimalist Trust Guarantees */}
                  <div className="flex items-center justify-between px-1 py-1 text-[11px] font-hind text-secondary-light border-t border-border-light/60">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0" />
                      <span>{t('সরকারি গেজেট', 'Gazette Citations')}</span>
                    </div>
                    <span className="text-secondary-light/30">•</span>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0" />
                      <span>{t('১০০% গোপনীয়', '100% Private')}</span>
                    </div>
                    <span className="text-secondary-light/30">•</span>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0" />
                      <span>{t('বিনামূল্যে ব্যবহার্য', 'Free to Use')}</span>
                    </div>
                  </div>

                  {/* Mobile Compact Scroll Cue */}
                  <div className="pt-0.5 flex items-center justify-center">
                    <a
                      href="#how-it-works"
                      className="group inline-flex items-center gap-1.5 text-[11px] text-secondary-light hover:text-accent-light transition-all py-1 px-3.5 rounded-full bg-surface-cardLight border border-border-light shadow-2xs"
                      aria-label={t('স্ক্রল করে কার্যপদ্ধতি দেখুন', 'Scroll to view methodology')}
                    >
                      <ChevronDown className="h-3 w-3 text-accent-light animate-scroll-bounce" />
                      <span className={lang === 'bn' ? 'font-hind font-semibold text-[11px]' : 'font-cinzel text-[11px] tracking-wider'}>
                        {t('৩টি মৌলিক স্তম্ভ দেখুন', 'SEE 3 PILLARS')}
                      </span>
                    </a>
                  </div>
                </div>

              </div>

              {/* RIGHT 6 COLUMNS: Interactive Legal Reasoning Simulator (Desktop & Tablet) */}
              <div className="hidden lg:flex lg:col-span-6 items-center justify-center py-2 px-1">
                <div className="w-full max-w-lg rounded-3xl border border-border-light bg-surface-cardLight p-6 shadow-md space-y-4 hover:border-accent-light/40 transition-all">
                  
                  {/* Simulator Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-border-light/70">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-cinzel text-xs font-bold tracking-wider text-accent-light uppercase">
                        {t('লিগ্যাল রিজনিং সিমুলেটর', 'LEGAL REASONING SIMULATOR')}
                      </span>
                    </div>
                    <span className="text-[10px] font-hind font-bold text-secondary-light bg-surface-light border border-border-light px-2.5 py-0.5 rounded-full">
                      {t('লাইভ প্রিভিউ', 'LIVE PREVIEW')}
                    </span>
                  </div>

                  {/* Case Switcher Tabs */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-light border border-border-light">
                    {simulationCases.map((sim, idx) => (
                      <button
                        key={sim.id}
                        type="button"
                        onClick={() => setActiveSimCase(idx)}
                        className={`flex-1 py-1.5 px-2 text-center text-xs font-hind font-semibold rounded-lg transition-all cursor-pointer ${
                          activeSimCase === idx
                            ? 'bg-[#141210] text-white shadow-xs font-bold'
                            : 'text-secondary-light hover:text-primary-light'
                        }`}
                      >
                        {sim.badge}
                      </button>
                    ))}
                  </div>

                  {/* Active Simulation Content */}
                  {(() => {
                    const sim = simulationCases[activeSimCase];
                    return (
                      <div className="space-y-3.5 animate-in fade-in duration-200">
                        
                        {/* Step 1: Citizen Query Speech Bubble */}
                        <div className="p-3.5 rounded-2xl bg-surface-light/80 border border-border-light/80 space-y-1">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-secondary-light uppercase font-cinzel">
                            <MessageSquare className="h-3 w-3 text-accent-light" />
                            <span>{t('নাগরিকের প্রশ্ন (Citizen Input)', 'CITIZEN INQUIRY')}</span>
                          </div>
                          <p className="text-xs font-medium text-primary-light font-hind italic">
                            &ldquo;{sim.query}&rdquo;
                          </p>
                        </div>

                        {/* Step 2: Statutory Grounding Citation */}
                        <div className="p-3.5 rounded-2xl bg-accent-light/[0.06] border border-accent-light/25 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-accent-light uppercase font-cinzel">
                              <ShieldCheck className="h-3.5 w-3.5" />
                              <span>{t('বাংলাদেশ কোড গেজেট ধারা', 'STATUTORY SECTION')}</span>
                            </div>
                            <span className="text-[10px] font-bold text-accent-light font-hind bg-white px-2 py-0.5 rounded border border-accent-light/20">
                              {t('যাচাইকৃত', 'VERIFIED')}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-primary-light font-anek">
                            {sim.statute} • <span className="text-accent-light">{sim.section}</span>
                          </div>
                          <p className="text-[11px] text-secondary-light font-hind leading-relaxed">
                            {sim.statuteQuote}
                          </p>
                        </div>

                        {/* Step 3: Action Checklist Preview */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-bold text-secondary-light uppercase font-cinzel tracking-wider block">
                            {t('করণীয় পদক্ষেপের চেকলিস্ট', 'ACTION CHECKLIST STEPS')}
                          </span>
                          <div className="space-y-1.5">
                            {sim.checklist.map((item, cIdx) => (
                              <div key={cIdx} className="flex items-start gap-2 text-xs font-hind text-secondary-light">
                                <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0 mt-0.5" />
                                <span className="text-[11px] leading-tight">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Step 4: Ready Draft & Action */}
                        <div className="pt-2 border-t border-border-light flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-[11px] font-hind text-secondary-light truncate">
                            <FileText className="h-3.5 w-3.5 text-accent-light shrink-0" />
                            <span className="truncate">{sim.draftName}</span>
                          </div>
                          <Link
                            href={`/ask?prompt=${encodeURIComponent(sim.askPrompt)}`}
                            className="px-3.5 py-1.5 rounded-xl bg-[#141210] hover:bg-[#231F1C] text-white text-xs font-bold font-hind flex items-center gap-1 shrink-0 transition-colors shadow-xs"
                          >
                            <span>{t('সহকারীর সাহায্য নিন', 'Ask AI Now')}</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>

                      </div>
                    );
                  })()}

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            THE INTERACTIVE LEGAL ENGINE THEATER (Consolidated Core Capabilities)
            ======================================================== */}
        <section id="how-it-works" className="py-8 sm:py-16 md:py-20 border-b border-border-light/80 bg-surface-light/40 scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center space-y-2 mb-8 sm:mb-12 max-w-2xl mx-auto">
              <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                {t('মৌলিক ৩টি আইনি সুরক্ষা স্তম্ভ', 'THREE FOUNDATIONAL PILLARS')}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-primary-light tracking-tight">
                {t(
                  'আইনি সচেতনতা থেকে কার্যকর পদক্ষেপ—MyLaws এর ৩টি মূল স্তম্ভ',
                  'From Legal Awareness to Action: Three Foundational Pillars'
                )}
              </h2>
              <p className="text-xs sm:text-sm text-secondary-light font-hind leading-relaxed">
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
                    className={`flex-1 py-2 px-1 text-center text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      activePillar === idx
                        ? 'bg-[#141210] text-white shadow-xs font-bold'
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
                    <div className="p-5 rounded-2xl border border-border-light bg-surface-cardLight shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-light/10 text-accent-light">
                          <ActiveIcon className="h-3.5 w-3.5 shrink-0" />
                          <span className="font-cinzel text-[10px] tracking-wider uppercase font-bold">
                            {activeItem.tag}
                          </span>
                        </div>
                        <span className="font-cinzel font-bold text-accent-light/70 text-sm">{activeItem.num}</span>
                      </div>

                      <h3 className="font-anek text-base font-bold text-primary-light leading-snug">
                        {activeItem.title}
                      </h3>

                      <p className="font-hind text-xs text-secondary-light leading-relaxed">
                        {activeItem.desc}
                      </p>

                      <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                        {activeItem.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="p-2 rounded-xl border border-border-light bg-surface-light">
                            <span className="font-bold text-accent-light font-cinzel text-xs block">{m.value}</span>
                            <p className="text-[10px] text-secondary-light font-hind truncate">{m.label}</p>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1.5 pt-1 text-xs font-hind border-t border-border-light/60">
                        {activeItem.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-secondary-light">
                            <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2">
                        <Link
                          href={activeItem.ctaLink}
                          className="w-full py-2.5 rounded-xl bg-[#141210] text-white text-xs font-bold font-hind text-center block shadow-xs active:scale-95 transition-all"
                        >
                          <span>{activeItem.ctaText} →</span>
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
                    <div className="p-6 sm:p-7 rounded-3xl border border-border-light bg-surface-cardLight shadow-xs flex flex-col justify-between space-y-4 hover:border-accent-light/50 hover:shadow-md transition-all h-full">
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

                        <h3 className="font-anek text-lg font-bold text-primary-light tracking-tight leading-snug">
                          {pillar.title}
                        </h3>

                        <p className="font-hind text-xs text-secondary-light leading-relaxed">
                          {pillar.desc}
                        </p>

                        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                          {pillar.metrics.map((m, mIdx) => (
                            <div key={mIdx} className="p-2 rounded-xl border border-border-light bg-surface-light">
                              <span className="font-bold text-accent-light font-cinzel text-sm block">{m.value}</span>
                              <p className="text-[10px] text-secondary-light font-hind">{m.label}</p>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-1.5 pt-1 text-xs font-hind border-t border-border-light/60">
                          {pillar.highlights.map((h, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2 text-secondary-light">
                              <CheckCircle2 className="h-3.5 w-3.5 text-accent-light shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border-light/60">
                        <Link
                          href={pillar.ctaLink}
                          className="w-full py-2.5 rounded-xl bg-[#141210] hover:bg-[#231F1C] text-white text-xs font-bold font-hind text-center block shadow-xs transition-colors"
                        >
                          <span>{pillar.ctaText} →</span>
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
            Interactive 64-District Bar & Legal Aid Directory
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

              {/* Right 5 cols: Interactive Preview Card with Division Tabs */}
              <div className="lg:col-span-5 space-y-3">
                {/* Division Tabs */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-cardLight border border-border-light shadow-2xs overflow-x-auto">
                  {lawyerDivisions.map((div, idx) => (
                    <button
                      key={div.id}
                      type="button"
                      onClick={() => setActiveDivision(idx)}
                      className={`flex-1 py-1.5 px-2.5 text-center text-xs font-anek rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        activeDivision === idx
                          ? 'bg-[#141210] text-white shadow-xs font-bold'
                          : 'text-secondary-light hover:text-primary-light hover:bg-black/5'
                      }`}
                    >
                      {div.name}
                    </button>
                  ))}
                </div>

                {/* Dynamic Advocate Card */}
                {(() => {
                  const currentAdvocate = lawyerDivisions[activeDivision] || lawyerDivisions[0];
                  return (
                    <div className="p-5 sm:p-6 rounded-3xl border border-border-light bg-surface-cardLight shadow-md space-y-4 transition-all">
                      <div className="flex items-center justify-between pb-3 border-b border-border-light/60">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="font-anek font-bold text-xs text-[#231F1C]">
                            {t('যাচাইকৃত চেম্বার', 'Verified Listing')} • {currentAdvocate.name}
                          </span>
                        </div>
                        <span className={`text-[10px] font-anek font-bold px-2 py-0.5 rounded-full border ${currentAdvocate.badgeColor}`}>
                          {currentAdvocate.badge}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-anek text-base sm:text-lg font-bold text-[#231F1C]">
                          {currentAdvocate.advocateName}
                        </h3>
                        <p className="text-xs text-[#5A534A] font-hind">
                          {currentAdvocate.court}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#5A534A] bg-[#FAF7F0] p-2 rounded-xl border border-border-light/70 font-hind">
                        <Award className="h-3.5 w-3.5 text-accent-light shrink-0" />
                        <span><strong>{currentAdvocate.barId}</strong> • {currentAdvocate.barName}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {currentAdvocate.tags.map((tg, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-anek font-semibold px-2 py-0.5 rounded-md bg-accent-light/10 text-accent-light border border-accent-light/20">
                            {tg}
                          </span>
                        ))}
                      </div>

                      {currentAdvocate.isLegalAid && (
                        <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[11px] font-hind flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span>{t('সরকারি বিনামূল্যে আইনি সহায়তা হটলাইন: ১৬৪৩০ / ১৬৬৯৯', 'Govt Free Legal Aid Hotline: 16430 / 16699')}</span>
                        </div>
                      )}

                      <div className="pt-2 border-t border-border-light/60 flex items-center justify-between">
                        <div className="text-[11px] text-[#5A534A] font-hind">
                          <span className="block font-bold">{currentAdvocate.chamber}</span>
                          <span>{currentAdvocate.hours}</span>
                        </div>
                        <Link
                          href={`/lawyers?division=${currentAdvocate.id}`}
                          className="px-3.5 py-1.5 rounded-xl bg-[#141210] hover:bg-[#231F1C] text-white text-xs font-anek font-bold transition-colors shadow-xs"
                        >
                          {t('বিস্তারিত দেখুন', 'View Details')}
                        </Link>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            WEB VS ANDROID COMPARISON
            Empowerment & Accessibility for Every Citizen
            ======================================================== */}
        <section className="py-8 sm:py-16 md:py-20 border-b border-border-light/80">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2 mb-8 sm:mb-10">
              <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                {t('প্ল্যাটফর্ম সমন্বয়', 'PLATFORM ACCESSIBILITY')}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#231F1C]">
                {t('ওয়েব ও অ্যান্ড্রয়েড অ্যাপের সমন্বিত সুবিধা', 'Seamless Web & Mobile Legal Empowerment')}
              </h2>
              <p className="text-xs sm:text-sm text-secondary-light font-hind max-w-xl mx-auto">
                {t(
                  'যেকোনো ডিভাইসে তাৎক্ষণিক সমাধান নিন অথবা অ্যাপে ব্যক্তিগত খসড়া নিরাপদে সংরক্ষণ করুন।',
                  'Instant web access from any device or offline on-device drafting with our native mobile companion.'
                )}
              </p>
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
                    <span>{t('কোনো অ্যাপ ইনস্টল বা রেজিস্ট্রেশন ছাড়াই ব্রাউজারে তাৎক্ষণিক ব্যবহারযোগ্য', 'Instant access on any smartphone or PC with zero installation or sign-up')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                    <span>{t('থানা বা আদালতে জমা উপযোগী পূর্ণাঙ্গ A4 প্রিন্ট ও বাংলা পিডিএফ এক্সপোর্ট', 'Complete print-ready multi-page A4 Bangla PDF petition and GD export')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                    <span>{t('১০০% ব্রাউজার গোপনীয়তা—সার্ভারে কোনো ব্যক্তিগত মামলার নথি জমা থাকে না', '100% in-browser confidentiality—zero personal case drafts stored on servers')}</span>
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
                    <span>{t('ডিভাইসের নিজস্ব মেমরিতে সম্পূর্ণ গোপনীয়তার সাথে কেস ও খসড়া সংরক্ষণ', 'Private on-device storage of personal drafts and legal checklists')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                    <span>{t('ইন্টারনেট ছাড়াও জরুরি আইনি ধারা ও প্রাথমিক গাইডলাইন অনুসন্ধানের সুবিধা', 'Offline legal corpus lookup and step-by-step guidance without active internet')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-light shrink-0 mt-0.5" />
                    <span>{t('ওয়েব ও মোবাইল উভয় মাধ্যমেই একই নির্ভরযোগ্য সরকারি আইন ও ফরম্যাটের নিশ্চয়তা', 'Exact statutory parity with official gazettes and verified complaint templates')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            HIGH-CONVERSION CLOSING CALL-TO-ACTION
            Warm Alabaster & Obsidian Glass Hero Anchor
            ======================================================== */}
        <section className="py-12 sm:py-20 border-b border-border-light/80 bg-surface-light relative overflow-hidden">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-light/30 bg-accent-light/10 text-accent-light text-xs font-semibold font-cinzel uppercase tracking-widest">
              <Scale className="h-3.5 w-3.5" />
              <span>{t('নাগরিকের আইনি অধিকার সুরক্ষা', 'CITIZEN LEGAL EMPOWERMENT')}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-primary-light tracking-tight leading-tight">
              {t(
                'আইনি জটিলতায় আর দ্বিধা নয়। সহজ ভাষায় জেনে নিন আপনার করণীয়।',
                'No More Confusion Over Legal Issues. Know Your Rights in Plain Words.'
              )}
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-secondary-light font-hind max-w-2xl mx-auto leading-relaxed">
              {t(
                'বাংলাদেশ কোডের ১,০৪৬টি যাচাইকৃত ধারা এবং সরকারি ফরম্যাট অনুযায়ী প্রস্তুত খসড়া—সম্পূর্ণ বিনামূল্যে ও ১০০% ব্যক্তিগত গোপনীয়তায়। কোনো সাইন-আপ ছাড়াই শুরু করুন।',
                'Verified against 1,046 Bangladesh Code sections with formal draft generation. Completely free, confidential, and instant without sign-up.'
              )}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/ask"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#141210] hover:bg-[#231F1C] text-white text-sm font-bold font-hind flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-[0.98] group"
              >
                <Scale className="h-4 w-4 text-[#C9A96E] group-hover:rotate-12 transition-transform" />
                <span>{t('সহকারীর সাথে আইনি আলোচনা শুরু করুন', 'Consult AI Legal Assistant Now')}</span>
                <ArrowRight className="h-4 w-4 text-white/70 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/drafts"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-surface-cardLight hover:bg-surface-light border border-border-light text-primary-light text-sm font-bold font-hind flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <FileText className="h-4 w-4 text-accent-light" />
                <span>{t('প্রমিত আবেদন খসড়া ব্রাউজ করুন', 'Browse Complaint Drafts')}</span>
              </Link>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] sm:text-xs text-secondary-light/80 font-hind">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent-light" />
                {t('অফিসিয়াল গেজেট রেফারেন্স', 'Official Gazette References')}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent-light" />
                {t('১০০% ব্রাউজার গোপনীয়তা', '100% In-Browser Privacy')}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent-light" />
                {t('লগইন ছাড়া ব্যবহার্য', 'No Registration Needed')}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent-light" />
                {t('জাতীয় আইনি সহায়তা: ১৬৪৩০', 'Govt Legal Aid: 16430')}
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
