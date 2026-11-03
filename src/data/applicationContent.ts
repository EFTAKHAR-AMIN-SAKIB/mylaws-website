/**
 * MyLaws Application Page Configuration & Content Source
 *
 * This file is the single source of truth for the Application page (/download).
 * The team can update:
 *   - `estimatedPercentage`: Current development progress estimate (e.g. 45).
 *   - `lastUpdated`: ISO date string of last verified content update (e.g. '2026-11-01').
 *   - `latestUpdateNote`: Short bilingual summary of recent engineering work.
 *   - `milestones`: Individual milestone statuses ('planned' | 'in_progress' | 'testing' | 'ready').
 *   - `experimentalPreviewEnabled`: Whether to offer the technical developer preview in a disclosure.
 */

import { androidReleaseManifest } from './manifest';
import type { AndroidReleaseManifest } from '@/types/contracts';

export type MilestoneStatus = 'planned' | 'in_progress' | 'testing' | 'ready';

export interface MilestoneItem {
  id: string;
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  descriptionEn: string;
  status: MilestoneStatus;
}

export interface BenefitItem {
  id: string;
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  descriptionEn: string;
  badgeBn: string;
  badgeEn: string;
  iconName: 'MessageSquare' | 'ShieldCheck' | 'FileText' | 'HardDrive' | 'Cpu';
}

export interface FaqItem {
  id: string;
  questionBn: string;
  questionEn: string;
  answerBn: string;
  answerEn: string;
}

export interface ApplicationPageContent {
  meta: {
    statusPillBn: string;
    statusPillEn: string;
    headlineBn: string;
    headlineEn: string;
    descriptionBn: string;
    descriptionEn: string;
    availabilityNoteBn: string;
    availabilityNoteEn: string;
    primaryCtaBn: string;
    primaryCtaEn: string;
    secondaryCtaBn: string;
    secondaryCtaEn: string;
  };
  progress: {
    headingBn: string;
    headingEn: string;
    subheadingBn: string;
    subheadingEn: string;
    estimatedPercentage: number;
    estimateNoteBn: string;
    estimateNoteEn: string;
    lastUpdated: string | null;
    latestUpdateNote: {
      bn: string;
      en: string;
    } | null;
    milestones: MilestoneItem[];
  };
  preview: {
    badgeBn: string;
    badgeEn: string;
    captionBn: string;
    captionEn: string;
    sampleQueryBn: string;
    sampleQueryEn: string;
    sampleJurisdictionBn: string;
    sampleJurisdictionEn: string;
    sampleStatusPillBn: string;
    sampleStatusPillEn: string;
    sampleVerifiedBasisBn: string;
    sampleVerifiedBasisEn: string;
    sampleHeadingBn: string;
    sampleHeadingEn: string;
    sampleSummaryBn: string;
    sampleSummaryEn: string;
    sampleSteps: Array<{
      stepNumber: string;
      titleBn: string;
      titleEn: string;
      descBn: string;
      descEn: string;
      tagBn: string;
      tagEn: string;
    }>;
    sampleLimitationBn: string;
    sampleLimitationEn: string;
    sampleDraftCtaBn: string;
    sampleDraftCtaEn: string;
  };
  benefits: {
    headingBn: string;
    headingEn: string;
    subheadingBn: string;
    subheadingEn: string;
    items: BenefitItem[];
  };
  faqs: {
    headingBn: string;
    headingEn: string;
    items: FaqItem[];
  };
  finalCta: {
    headingBn: string;
    headingEn: string;
    descriptionBn: string;
    descriptionEn: string;
    ctaBn: string;
    ctaEn: string;
  };
  experimentalRelease: {
    enabled: boolean;
    manifest: AndroidReleaseManifest;
  };
}

export const applicationPageContent: ApplicationPageContent = {
  meta: {
    statusPillBn: 'অ্যান্ড্রয়েড অ্যাপ · অফলাইন সুবিধাসহ ৪৫% কাজ সম্পন্ন',
    statusPillEn: 'Android App · 45% Completed with Full Offline Support',
    headlineBn: 'ইন্টারনেট ছাড়াই আপনার আইনি অধিকার, এবার আপনার পকেটে।',
    headlineEn: 'Instant Legal Answers, Even Completely Offline. In Your Pocket.',
    descriptionBn:
      'কম র‍্যামের যে কোনো সাধারণ অ্যান্ড্রয়েড ফোনে চলবে MyLaws অ্যাপ। ইন্টারনেট সংযোগ ছাড়াই মৌলিক ১,০৪৬টি আইনি বিধান, করণীয় চেকলিস্ট ও ১০টি প্রমিত ড্রাফট নির্দেশিকা জানুন ঘরে বসেই। ইতিমধ্যে ৪৫% কাজ সম্পন্ন—খুব দ্রুতই উন্মুক্ত করা হচ্ছে।',
    descriptionEn:
      'Engineered to run lightning-fast on any Android smartphone, even entry-level low-RAM devices. Access 1,046 verified provisions across 49 acts, evidence checklists, and 10 statutory draft templates completely offline with zero internet. Already 45% built and launching soon.',
    availabilityNoteBn: 'ওয়েবসাইট এখনই অনলাইনে ব্যবহার করা যাচ্ছে। অফলাইন সুবিধা ও অ্যান্ড্রয়েড অ্যাপের ৪৫% কাজ সম্পন্ন এবং দ্রুত এগিয়ে চলেছে।',
    availabilityNoteEn: 'Website is live today. The full offline Android app is already 45% built and moving rapidly towards launch.',
    primaryCtaBn: 'অনলাইন সহকারী ব্যবহার করুন',
    primaryCtaEn: 'Use Online Assistant',
    secondaryCtaBn: 'উন্নয়ন অগ্রগতি ও ফিচারসমূহ',
    secondaryCtaEn: 'Explore Progress & Features',
  },
  progress: {
    headingBn: 'ইতিমধ্যেই ৪৫% সম্পন্ন — দ্রুত গতিতে এগোচ্ছে উন্নয়ন কার্যক্রম',
    headingEn: 'Already 45% Completed — Rapidly Advancing Towards Launch',
    subheadingBn:
      'প্রত্যন্ত অঞ্চলের নাগরিক যেন ইন্টারনেট ছাড়াও যে কোনো স্বল্পমূল্যের ফোনে পূর্ণাঙ্গ আইনি অধিকার পেতে পারেন, সেই লক্ষ্যেই তৈরি হচ্ছে আমাদের সুপার-লাইটওয়েট অ্যাপ।',
    subheadingEn:
      'Engineered so every citizen can access verified legal guidance on any entry-level smartphone, even with zero internet connectivity.',
    // EDITABLE: Approximate team estimate - explicitly 45% completed
    estimatedPercentage: 45,
    estimateNoteBn: 'মূল ইঞ্জিন, অফলাইন ইনডেক্সিং এবং ইউআই আর্কিটেকচার সম্পন্ন হয়েছে। অফলাইন ডেটা স্টোরেজ ও লোকাল এআই সিঙ্ক কার্যক্রম চলছে।',
    estimateNoteEn: 'Core deterministic engine, offline indexing, and UI architecture complete. Local offline storage and search syncing in active progress.',
    // EDITABLE: Static content update date
    lastUpdated: '2026-11-01',
    latestUpdateNote: {
      bn: 'জেটপ্যাক কম্পোজ ইন্টারফেস, বাংলা টাইপোগ্রাফি এবং ডিভাইসে সম্পূর্ণ অফলাইন FTS-BM25 আইনি ধারা সার্চ ইঞ্জিন সফলভাবে ইন্টিগ্রেট করা হয়েছে। স্বল্প মেমোরির (১/২ জিবি র‍্যাম) ডিভাইসে মসৃণ চলার জন্য মেমোরি টিউনিং ও স্থানীয় ডেটা সিঙ্ক চলছে।',
      en: 'Native Jetpack Compose UI, ultra-compact Noto Bengali typography, and in-device offline FTS-BM25 statutory index integrated. Memory tuning for low-RAM devices (1 GB / 2 GB) and local data sync are in active progress.',
    },
    milestones: [
      {
        id: 'app_design',
        titleBn: 'সুপার-লাইটওয়েট ডিজাইন ও লো-র‍্যাম অপটিমাইজেশন',
        titleEn: 'Super-lightweight UI & Low-RAM Optimization',
        descriptionBn: '১ জিবি বা ২ জিবি র‍্যামের স্বল্পমূল্যের ফোনেও মসৃণ পারফরম্যান্স, পরিষ্কার বাংলা টাইপোগ্রাফি এবং সহজ মোবাইল ইন্টারফেস।',
        descriptionEn: 'Ultra-smooth performance on budget 1 GB / 2 GB RAM phones, crisp Bangla typography, and intuitive mobile ergonomics.',
        status: 'ready',
      },
      {
        id: 'offline_answers',
        titleBn: 'সম্পূর্ণ অফলাইনে আইনি উত্তর ও অন-ডিভাইস ইনডেক্স',
        titleEn: 'Full Offline Legal Answers & On-Device Search',
        descriptionBn: 'ইন্টারনেট ডাটা ছাড়াই ১,০৪৬টি আইনি ধারার সমাধান, সময়সীমা ও ধারাভিত্তিক সার্চ তাৎক্ষণিক ব্রাউজ করার শক্তিশালী ইন-ডিভাইস ইঞ্জিন।',
        descriptionEn: 'High-speed in-device FTS search over 1,046 verified provisions across 49 acts, statutory deadlines, and guidance with zero internet required.',
        status: 'in_progress',
      },
      {
        id: 'checklists_drafts',
        titleBn: 'অফলাইন করণীয় চেকলিস্ট ও খসড়া প্রস্তুত',
        titleEn: 'Offline Evidence Checklists & Drafts',
        descriptionBn: 'আইনি প্রমাণ সংরক্ষণের বাস্তবমুখী নির্দেশিকা এবং জিডি ও শ্রম অভিযোগের বাংলা আবেদন প্রস্তুতের সম্পূর্ণ অফলাইন মডিউল।',
        descriptionEn: 'Step-by-step evidence checklists and formal Bangla complaint & Police GD drafting modules available on device.',
        status: 'in_progress',
      },
      {
        id: 'cloud_sync',
        titleBn: 'ঐচ্ছিক ক্লাউড সিঙ্ক ও এআই আপগ্রেড',
        titleEn: 'Optional Cloud Sync & Dynamic AI Follow-up',
        descriptionBn: 'ইন্টারনেট পাওয়া মাত্র নতুন গেজেট ও আইনের সংশোধনী স্বয়ংক্রিয়ভাবে সিঙ্ক হওয়া এবং দূরবর্তী এআই পরামর্শের হাইব্রিড কানেকশন।',
        descriptionEn: 'Automatic background synchronization for new official gazette amendments and extended hybrid cloud intelligence when online.',
        status: 'in_progress',
      },
    ],
  },
  preview: {
    badgeBn: 'নেটিভ অ্যান্ড্রয়েড অ্যাপ প্রিভিউ · সম্পূর্ণ অফলাইন প্রস্তুত',
    badgeEn: 'Native Android App Preview · Fully Offline-Ready',
    captionBn: 'আমাদের প্রস্তুতকৃত অ্যান্ড্রয়েড অ্যাপের বাস্তব ইন্টারফেস। ইন্টারনেট ছাড়াই এভাবে তাৎক্ষণিক যাচাইকৃত আইনি সমাধান পাবেন।',
    captionEn: 'Real preview of the upcoming Android app. Delivers instant, verified statutory solutions even completely offline.',
    sampleQueryBn: 'দুই মাস ধরে মালিক বেতন দিচ্ছে না। বাংলাদেশ শ্রম আইনে কীভাবে প্রতিকার পাব?',
    sampleQueryEn: 'My employer has not paid my wages for the last two months. How can I seek relief under the Bangladesh Labour Act?',
    sampleJurisdictionBn: 'সকাল ১০:০১ • ঢাকা অঞ্চল জুরিসডিকশন',
    sampleJurisdictionEn: 'Sent 10:01 AM • Dhaka jurisdiction',
    sampleStatusPillBn: 'আইনি সময়সীমা ও শ্রম আদালত বিধিমালা যাচাই সম্পন্ন',
    sampleStatusPillEn: 'Checking statutory deadlines and Labour Court rules',
    sampleVerifiedBasisBn: 'যাচাইকৃত আইনি ভিত্তি: বাংলাদেশ শ্রম আইন, ২০০৬',
    sampleVerifiedBasisEn: 'VERIFIED LEGAL BASIS: Bangladesh Labour Act, 2006',
    sampleHeadingBn: 'শ্রম আইনের ১৩২ ধারা অনুযায়ী আপনি বকেয়া মজুরির জন্য সরাসরি শ্রম আদালতে মামলা করতে পারেন।',
    sampleHeadingEn: 'You can claim your unpaid wages in the Labour Court under Section 132 of the Bangladesh Labour Act, 2006.',
    sampleSummaryBn: 'আইন অনুযায়ী মজুরি মেয়াদের শেষ হওয়ার ৭ কার্যদিবসের মধ্যে সমস্ত বকেয়া পরিশোধ করতে হবে। পরিশোধে ব্যর্থ হলে তা সরাসরি আদালতে মামলা দায়ের ও অতিরিক্ত ক্ষতিপূরণ পাওয়ার আইনি ভিত্তি তৈরি করে।',
    sampleSummaryEn: 'Under statutory law, wages must be cleared within 7 working days following the conclusion of the wage period. Non-payment gives direct cause of legal action for recovery and punitive compensation.',
    sampleSteps: [
      {
        stepNumber: '১',
        titleBn: 'প্রমাণ সংগ্রহ করুন:',
        titleEn: 'Gather Proof:',
        descBn: 'নিয়োগপত্র, হাজিরার প্রমাণ, ব্যাংক বা বিকাশ স্টেটমেন্ট এবং বার্তা সংরক্ষণ করুন।',
        descEn: 'Preserve appointment letter, punch records, bank/bKash statement, or SMS/reminders.',
        tagBn: 'dife.gov.bd',
        tagEn: 'dife.gov.bd',
      },
      {
        stepNumber: '২',
        titleBn: 'আনুষ্ঠানিক লিখিত নোটিশ পাঠান:',
        titleEn: 'Serve Formal Written Demand:',
        descBn: '১২১ ও ১২৩ ধারা অনুযায়ী মামলা দায়েরের পূর্বে ডাকযোগে রেজিস্টার্ড নোটিশ দিন।',
        descEn: 'Under Section 121 & 123, demand wages formally with registered proof of dispatch.',
        tagBn: 'ধারা ১২১-১২৩',
        tagEn: 'BLA §121-123',
      },
      {
        stepNumber: '৩',
        titleBn: 'এলাকাভিত্তিক শ্রম আদালতে মামলা দায়ের:',
        titleEn: 'File in Designated Labour Court:',
        descBn: 'নোটিশের পরও সমাধান না হলে ১৩২ ধারায় নির্ধারিত শ্রম আদালতে আবেদন করুন।',
        descEn: 'If unpaid after notice, lodge an application under Section 132 before the Labour Court.',
        tagBn: 'আদালত বিধিমালা',
        tagEn: 'Labour Court Rules',
      },
      {
        stepNumber: '৪',
        titleBn: '২৫% অতিরিক্ত ক্ষতিপূরণ দাবি করুন:',
        titleEn: 'Claim 25% Statutory Compensation:',
        descBn: 'অযৌক্তিক বিলম্বে আদালত বকেয়ার উপর সর্বোচ্চ ২৫% অতিরিক্ত ক্ষতিপূরণ দিতে পারেন।',
        descEn: 'In cases of unjustified delays, the Labour Court can direct up to 25% additional compensation.',
        tagBn: 'ধারা ১৩২(গ)',
        tagEn: 'BLA §132(c)',
      },
    ],
    sampleLimitationBn: 'তামাদি সময়সীমা: পাওনা হওয়ার তারিখ থেকে ১২ মাসের মধ্যে মামলা করতে হবে। | সরকারি লিগ্যাল এইড হেল্পলাইন: ১৬৬৯৯ (টোল ফ্রি)',
    sampleLimitationEn: 'Statutory Limitation: Claims must be filed within 12 months. | Free Legal Aid Helpline: 16699 (Toll-Free)',
    sampleDraftCtaBn: 'শ্রম পরিদর্শক বরাবর অভিযোগের লিখিত খসড়া তৈরি করুন',
    sampleDraftCtaEn: 'Prepare a Formal Legal Draft for DIFE',
  },
  benefits: {
    headingBn: 'অ্যান্ড্রয়েড অ্যাপে যে অনন্য সুবিধাগুলো পাবেন',
    headingEn: 'Why You Will Love the Mobile App',
    subheadingBn: 'যে কোনো সাধারণ স্মার্টফোনে সাধারণ মানুষের আইনি অধিকারকে ১০০% হাতের নাগালে নিয়ে আসা।',
    subheadingEn: 'Bringing practical statutory clarity and empowerment into everyday citizens’ hands.',
    items: [
      {
        id: 'full_offline',
        titleBn: 'ইন্টারনেট ছাড়াই সম্পূর্ণ আইনি উত্তর',
        titleEn: '100% Offline Legal Intelligence',
        descriptionBn:
          'গ্রামাঞ্চলে বা ভ্রমণের সময় ইন্টারনেট ডাটা প্যাক না থাকলেও সমস্যা নেই। ১,০৪৬টি আইনি ধারার সমাধান ও নির্দেশিকা ফোনের ভেতরেই তৈরি থাকবে।',
        descriptionEn:
          'No data pack needed. 1,046 verified statutory solutions across 49 acts, legal time limits, and action plans are stored locally on your device for instant offline access.',
        badgeBn: 'প্রধান সুবিধা',
        badgeEn: 'Core Feature',
        iconName: 'HardDrive',
      },
      {
        id: 'low_ram_compatible',
        titleBn: 'যে কোনো সাধারণ ও কম র‍্যামের ফোনে মসৃণ',
        titleEn: 'Runs on Any Low-RAM Device',
        descriptionBn:
          'কোনো ৪ জিবি র‍্যামের প্রয়োজন নেই। মাত্র ১০ এমবির হালকা অ্যাপটি ১ জিবি বা ২ জিবি র‍্যামের যে কোনো কমদামি বাজেট স্মার্টফোনেও মাখনের মতো চলবে।',
        descriptionEn:
          'No 4 GB RAM requirement. Ultra-optimized under 10.3 MB, engineered to run smoothly on any budget phone with just 1 GB or 2 GB RAM.',
        badgeBn: 'সুপার লাইট',
        badgeEn: 'Featherlight',
        iconName: 'Cpu',
      },
      {
        id: 'talk_naturally',
        titleBn: 'সহজ বাংলা ও স্বাভাবিক ভাষায় প্রশ্ন',
        titleEn: 'Natural Bangla Voice & Text',
        descriptionBn:
          'আইনের ধারা মুখস্থ রাখার দরকার নেই। আপনার বাস্তব সমস্যাটি মুখে বলুন বা সহজ বাংলায় লিখুন—অ্যাপটি স্বয়ংক্রিয়ভাবে সঠিক আইন খুঁজে দেবে।',
        descriptionEn:
          'No legal jargon required. Type or speak your situation in plain Bangla, and the app instantly pinpoints the exact statutory remedies.',
        badgeBn: 'সহজ ব্যবহার',
        badgeEn: 'Intuitive',
        iconName: 'MessageSquare',
      },
      {
        id: 'prepare_draft',
        titleBn: '১০টি প্রমিত আইনি আবেদন ও জিডি খসড়া প্রস্তুত',
        titleEn: '10 Instant Formal Legal Drafts & GDs',
        descriptionBn:
          'আইনি প্রমাণ সংরক্ষণের চেকলিস্ট দেখে নিয়ে সঠিক আইনি ফরম্যাটে থানার জিডি, পারিবারিক আদালত, যৌতুক নিরোধ, ভূমি অপরাধ ২০২৩, নামজারি কিংবা শ্রম অভিযোগের খসড়া ফোনে প্রস্তুত করে সেভ বা প্রিন্ট করুন।',
        descriptionEn:
          'Follow grounded evidence checklists and generate 10 formal statutory drafts including Police GD, Family Court, Land Crime, and Labour complaint drafts ready for review, saving or print.',
        badgeBn: 'প্রিন্ট প্রস্তুত',
        badgeEn: 'Ready to Print',
        iconName: 'FileText',
      },
    ],
  },
  faqs: {
    headingBn: 'সাধারণ কিছু জিজ্ঞাসা ও উত্তর',
    headingEn: 'Frequently Asked Questions',
    items: [
      {
        id: 'work_without_internet',
        questionBn: 'অ্যাপটি কি ইন্টারনেট ছাড়া সম্পূর্ণ অফলাইনে আইনি উত্তর দেবে?',
        questionEn: 'Will the app provide answers completely offline?',
        answerBn:
          'হ্যাঁ! এটিই MyLaws মোবাইল অ্যাপের সবচেয়ে বড় বিশেষত্ব। বাংলাদেশের ১,০৪৬টি গুরুত্বপূর্ণ আইনি বিধান, মামলা দায়েরের সময়সীমা, বিনামূল্যে আইনি সহায়তার তথ্য (১৬৪৩০ / ১৬৬৯৯) এবং প্রমাণ সংগ্রহের চেকলিস্ট সম্পূর্ণ অফলাইনে আপনার ডিভাইসেই থাকবে। ফলে ইন্টারনেট বন্ধ থাকলেও বা প্রত্যন্ত অঞ্চলে আপনি তাৎক্ষণিক আইনি সুরক্ষা পাবেন। নতুন সরকারি গেজেট ও আইন এলে ইন্টারনেট সংযোগের মাধ্যমে স্বয়ংক্রিয়ভাবে সিঙ্ক হয়ে যাবে।',
        answerEn:
          'Yes! That is the core pillar of the MyLaws mobile app. All 1,046 statutory provisions across 49 acts, procedural deadlines, free legal aid helpline details (16430 / 16699), and evidence checklists are packaged on-device. Even with zero internet or in remote areas, you get instant legal answers. When online, it seamlessly syncs new gazettes and amendments.',
      },
      {
        id: 'supported_phones',
        questionBn: 'অ্যাপটি চালাতে কেমন ফোন লাগবে? কম দামি ফোনে কি চলবে?',
        questionEn: 'What kind of phone is needed? Will it work on low-end devices?',
        answerBn:
          'অবশ্যই! আমাদের অ্যাপটির জন্য কোনো ৪ জিবি র‍্যাম বা দামি ফোনের প্রয়োজন নেই। আমরা অত্যন্ত আধুনিক কম্প্রেশন ও অন-ডিভাইস ইনডেক্সিং ব্যবহার করেছি, যাতে মাত্র ১ জিবি বা ২ জিবি র‍্যামের যে কোনো সাধারণ বাজেট স্মার্টফোনেও এটি বিদ্যুৎ গতিতে এবং কোনো ল্যাগ ছাড়াই চলে।',
        answerEn:
          'Absolutely! There is no 4 GB RAM requirement. We engineered lightweight on-device indexing and minimal memory footprint so it runs effortlessly fast on entry-level budget phones with 1 GB or 2 GB RAM.',
      },
      {
        id: 'development_status_45',
        questionBn: 'অ্যাপটির কাজ কতদূর সম্পন্ন হয়েছে এবং কবে পাওয়া যাবে?',
        questionEn: 'How much is completed and when will it be released?',
        answerBn:
          'অ্যাপটির ৪৫% কাজ ইতিমধ্যেই সফলভাবে সম্পন্ন হয়েছে। মূল অফলাইন ইনডেক্স, জেটপ্যাক কম্পোজ ইউআই এবং আইনি চেকলিস্ট আর্কিটেকচার তৈরি শেষ। বর্তমানে স্বল্প মেমোরি টিউনিং ও ফিল্ড টেস্টিং দ্রুত গতিতে এগিয়ে চলছে। খুব শীঘ্রই এটি সবার জন্য উন্মুক্ত করা হবে।',
        answerEn:
          'The application is already 45% completed. The deterministic offline engine, Jetpack Compose UI, and evidence checklists are fully built. Low-memory tuning and field validation are moving rapidly, and the public release is coming very soon.',
      },
      {
        id: 'what_can_i_use_today',
        questionBn: 'অ্যাপ উন্মুক্ত হওয়ার আগে আজই আমি কী সুবিধা ব্যবহার করতে পারব?',
        questionEn: 'What features can I use today on the website?',
        answerBn:
          'আজই আপনি আমাদের ওয়েবসাইটের সম্পূর্ণ অনলাইন সংস্করণ (https://mylaws-bd.vercel.app/ask) বিনামূল্যে ব্যবহার করতে পারেন। সেখানে ৭টি ক্যাটাগরির ১,০৪৬টি ধারার ভিত্তিতে তাৎক্ষণিক প্রশ্ন করতে পারবেন এবং ড্রাফটস এডিটরে গিয়ে ১০টি প্রমিত আইনি আবেদন ও থানার জিডি তৈরি করে A4 PDF ডাউনলোড করতে পারবেন।',
        answerEn:
          'You can use the complete online version of MyLaws right now at /ask for 1,046 verified provisions across 49 acts, and use /drafts to generate 10 customized complaint documents and print-ready A4 PDFs completely free.',
      },
    ],
  },
  finalCta: {
    headingBn: 'অ্যাপ আসার আগেই আজই অনলাইনে সমাধান নিন',
    headingEn: 'Get Instant Legal Guidance Online Today',
    descriptionBn:
      'অ্যান্ড্রয়েড অ্যাপের ৪৫% কাজ সম্পন্ন এবং দ্রুত গতিতে এগিয়ে চলছে। অ্যাপের চূড়ান্ত উন্মুক্তির আগেই ওয়েবসাইটের সম্পূর্ণ ফিচার এখনই আপনার হাতের নাগালে।',
    descriptionEn:
      'While the 45% completed mobile app is rapidly finalizing, every feature is available online for you right now.',
    ctaBn: 'অনলাইন সহকারীর সাহায্য নিন',
    ctaEn: 'Use MyLaws Online',
  },
  experimentalRelease: {
    // Only displayed inside an accessible developer disclosure; not the primary reading flow
    enabled: true,
    manifest: androidReleaseManifest,
  },
};
