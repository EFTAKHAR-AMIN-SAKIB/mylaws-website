/**
 * MyLaws Application Page Configuration & Content Source
 *
 * This file is the single source of truth for the Application page (/download).
 * The team can update:
 *   - `estimatedPercentage`: Current development progress estimate (e.g. 30).
 *   - `lastUpdated`: ISO date string of last verified content update (e.g. '2026-10-30').
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
  iconName: 'MessageSquare' | 'ShieldCheck' | 'FileText' | 'HardDrive';
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
    sampleClarificationBn: string;
    sampleClarificationEn: string;
    sampleNextStepBn: string;
    sampleNextStepEn: string;
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
    statusPillBn: 'অ্যান্ড্রয়েড অ্যাপ · তৈরির কাজ চলছে',
    statusPillEn: 'Android app · In development',
    headlineBn: 'আপনার অধিকার, এবার আপনার হাতেই।',
    headlineEn: 'Your rights. In your pocket.',
    descriptionBn:
      'আপনার অধিকার বুঝতে, পরের করণীয় জানতে এবং প্রয়োজন হলে খসড়া তৈরি করতে—সহজ বাংলা বা ইংরেজিতে সাহায্য করবে MyLaws অ্যাপ। আমরা এখন সেটিই তৈরি করছি।',
    descriptionEn:
      'We’re building a simpler way to understand your rights, find practical next steps, and prepare a draft—in Bangla or English.',
    availabilityNoteBn: 'ওয়েবসাইট এখনই ব্যবহার করতে পারেন। অ্যান্ড্রয়েড অ্যাপের কাজ চলছে।',
    availabilityNoteEn: 'The website is available now. The Android app is still being built.',
    primaryCtaBn: 'ওয়েবসাইটে সাহায্য নিন',
    primaryCtaEn: 'Use MyLaws online',
    secondaryCtaBn: 'কাজ কতদূর হলো দেখুন',
    secondaryCtaEn: 'See our progress',
  },
  progress: {
    headingBn: 'আপনার জন্য, ধাপে ধাপে তৈরি হচ্ছে।',
    headingEn: 'Built step by step, with you in mind.',
    subheadingBn:
      'অ্যান্ড্রয়েড অ্যাপ তৈরির কাজ কীভাবে এগোচ্ছে, তা সবার সামনে স্বচ্ছ রাখা আমাদের লক্ষ্য।',
    subheadingEn:
      'We keep our mobile application development visible and transparent as each phase matures.',
    // EDITABLE: Approximate team estimate (not a legally measured progress or uptime metric)
    estimatedPercentage: 30,
    estimateNoteBn: 'এটি আমাদের দলের আনুমানিক হিসাব। কাজ এগোলে এখানে আপডেট দেব।',
    estimateNoteEn: 'Team estimate; we’ll update it as development progresses.',
    // EDITABLE: Static content update date
    lastUpdated: '2026-10-30',
    latestUpdateNote: {
      bn: 'জেটপ্যাক কম্পোজ ইন্টারফেস লেআউট এবং ওয়েবসাইট এপিআই সার্ভিসের সাথে ডেটা কন্ট্রাক্ট সম্পূর্ণ হয়েছে। অফলাইন রেফারেন্স মডেল ও লোকাল স্টোরেজ সিঙ্ক নিয়ে কাজ চলছে।',
      en: 'Jetpack Compose interface layout and shared service contracts aligned with web APIs. Offline reference models and local storage sync are in progress.',
    },
    // EDITABLE: Milestone list reflecting actual development evidence
    milestones: [
      {
        id: 'app_design',
        titleBn: 'অ্যাপের ডিজাইন ও সহজ ব্যবহার',
        titleEn: 'App design and ease of use',
        descriptionBn: 'পরিষ্কার বাংলা টাইপোগ্রাফি, পরিচিত আইকন এবং সাধারণ মানুষের জন্য স্বাচ্ছন্দ্যময় লেআউট।',
        descriptionEn: 'Readable Bangla typography, familiar icons, and calm, accessible mobile layouts.',
        status: 'in_progress',
      },
      {
        id: 'online_queries',
        titleBn: 'অনলাইনে প্রশ্ন ও পরের কথোপকথন',
        titleEn: 'Online questions and follow-ups',
        descriptionBn: 'ওয়েবসাইটের ২৫৫টি আইনি ধারার সার্চ ইঞ্জিন ও ক্লাউড এপিআইয়ের সাথে নিরাপদ সংযোগ।',
        descriptionEn: 'Secure integration with the website’s 255-provision search engine and cloud APIs.',
        status: 'ready',
      },
      {
        id: 'checklists_drafts',
        titleBn: 'করণীয় তালিকা ও খসড়া তৈরি',
        titleEn: 'Checklists and draft preparation',
        descriptionBn: 'আইনি প্রমাণ সংরক্ষণের নির্দেশিকা এবং জিডি ও শ্রম অভিযোগের বাংলা চিঠি তৈরির সুবিধা।',
        descriptionEn: 'Step-by-step evidence checklists and formal Bangla complaint drafting modules.',
        status: 'in_progress',
      },
      {
        id: 'offline_support',
        titleBn: 'ডাউনলোড করে অফলাইনে সহায়তা',
        titleEn: 'Downloadable offline support',
        descriptionBn: 'ইন্টারনেট সংযোগ ছাড়াও মৌলিক আইনি ধারা ও পরামর্শ ব্রাউজ করার পরিকল্পিত অফলাইন প্যাক।',
        descriptionEn: 'Planned offline statutory reference packs for exploring rights without active internet.',
        status: 'planned',
      },
    ],
  },
  preview: {
    badgeBn: 'ডিজাইনের নমুনা · সুবিধাগুলোর কাজ চলছে',
    badgeEn: 'Design preview · Features are being developed',
    captionBn: 'প্রস্তাবিত অ্যাপ ইন্টারফেসের একটি নমুনা। অ্যাপটির উন্নয়ন কার্যক্রম চলমান।',
    captionEn: 'Illustrative preview of the planned mobile interface. Actual features are under active development.',
    sampleQueryBn: 'দোকানদার মেয়াদোত্তীর্ণ ওষুধ বিক্রি করেছে, টাকাও ফেরত দিচ্ছে না।',
    sampleQueryEn: 'The pharmacy sold me expired medicine and refused a refund.',
    sampleClarificationBn: 'ওষুধের ক্রয়রসিদ ও মোড়কের ছবি কি আপনার কাছে সংরক্ষিত আছে?',
    sampleClarificationEn: 'Do you have the purchase receipt and photo of the packaging with batch info?',
    sampleNextStepBn: 'ভোক্তা অধিকার সংরক্ষণ আইন, ২০০৯ (ধারা ৫১ ও ৬০): ক্রয়রসিদ সংগ্রহ করে ৩০ দিনের মধ্যে DNCRP-এ লিখিত অভিযোগ দাখিল করুন।',
    sampleNextStepEn: 'Consumers’ Right Protection Act 2009 (Sec 51 & 60): Preserve the receipt and file a written complaint to DNCRP within 30 days.',
  },
  benefits: {
    headingBn: 'অ্যাপে যে সুবিধাগুলো আনার কাজ করছি',
    headingEn: 'What we’re building for you',
    subheadingBn: 'দৈনন্দিন জীবনে সাধারণ নাগরিকের আইনি সুরক্ষাকে সহজ ও হাতের নাগালে নিয়ে আসা।',
    subheadingEn: 'Bringing practical statutory clarity and preparation into everyday citizens’ hands.',
    items: [
      {
        id: 'talk_naturally',
        titleBn: 'সহজ ভাষায় মনের কথা বলুন',
        titleEn: 'Talk naturally',
        descriptionBn:
          'আইনি পরিভাষা জানার দরকার নেই। বাংলা, সাধারণ ইংরেজি কিংবা স্বাভাবিক বাংলিশে আপনার সমস্যা জানান এবং দরকারি প্রশ্নে জবাব দিন।',
        descriptionEn:
          'No legal jargon required. Describe your situation in Bangla, English, or Banglish, and answer friendly follow-ups.',
        badgeBn: 'কাজ চলছে',
        badgeEn: 'In progress',
        iconName: 'MessageSquare',
      },
      {
        id: 'understand_and_act',
        titleBn: 'আইন জানুন ও করণীয় ঠিক করুন',
        titleEn: 'Understand and act',
        descriptionBn:
          'সহজ ভাষায় আইনের ব্যাখ্যা, নির্ভরযোগ্য সরকারি সূত্রের লিঙ্ক এবং পরবর্তী ধাপে কী প্রমাণ জোগাড় করবেন তার বাস্তবসম্মত তালিকা।',
        descriptionEn:
          'Grounded explanations with verified statutory sources, paired with a practical checklist of evidence and authorities to contact.',
        badgeBn: 'কাজ চলছে',
        badgeEn: 'In progress',
        iconName: 'ShieldCheck',
      },
      {
        id: 'prepare_draft',
        titleBn: 'দরকারে আইনি চিঠি বা আবেদন তৈরি',
        titleEn: 'Prepare a draft when needed',
        descriptionBn:
          'থানার জিডি কিংবা শ্রম পরিদর্শকের কাছে অভিযোগপত্রের খসড়া নিজে দেখে নিয়ে প্রিন্ট বা সেভ করুন। এটি স্ব-পর্যালোচিত খসড়া, স্বয়ংক্রিয় মামলা নয়।',
        descriptionEn:
          'Review and customize a formal complaint or Police GD draft based on your facts. It is a self-reviewed draft, not an automated lawsuit.',
        badgeBn: 'কাজ চলছে',
        badgeEn: 'In progress',
        iconName: 'FileText',
      },
      {
        id: 'less_internet',
        titleBn: 'কম ইন্টারনেটেই সহায়তা',
        titleEn: 'Use supported help with less internet',
        descriptionBn:
          'অ্যান্ড্রয়েড অ্যাপে একবার প্যাক ডাউনলোড করে নিলে জরুরি সময়ে ইন্টারনেট সংযোগ ছাড়াও মৌলিক ধারাগুলো ব্রাউজ করা যাবে।',
        descriptionEn:
          'Planned downloadable packs so you can explore core statutory provisions even with weak or intermittent internet connectivity.',
        badgeBn: 'পরিকল্পিত',
        badgeEn: 'Planned',
        iconName: 'HardDrive',
      },
    ],
  },
  faqs: {
    headingBn: 'সাধারণ কিছু জিজ্ঞাসা',
    headingEn: 'Frequently Asked Questions',
    items: [
      {
        id: 'can_i_download',
        questionBn: 'অ্যাপটি কি এখনই ডাউনলোড করা যাবে?',
        questionEn: 'Can I download the app now?',
        answerBn:
          'অ্যাপটি এখনও তৈরির পর্যায়ে রয়েছে এবং সাধারণ মানুষের জন্য পাবলিকলি প্রকাশ করা হয়নি। তবে আপনি এখনই আমাদের ওয়েবসাইটের সম্পূর্ণ ফিচার (প্রশ্ন করা, ২৫৫টি ধারা দেখা ও খসড়া তৈরি) অনলাইনে বিনামূল্যে ব্যবহার করতে পারেন।',
        answerEn:
          'The Android app is currently in active development and not yet published for general public use. However, you can use all features—including legal queries, 255 statutory provisions, and draft generation—online on this website today.',
      },
      {
        id: 'work_without_internet',
        questionBn: 'অ্যাপটি কি ইন্টারনেট ছাড়া চলবে?',
        questionEn: 'Will it work without internet?',
        answerBn:
          'অ্যান্ড্রয়েড অ্যাপটির লক্ষ্য শুরুতে একবার ছোট একটি প্যাক ডাউনলোডের পর মৌলিক ধারা ও চেকলিস্ট অফলাইনে ব্রাউজ করতে দেওয়া। তবে এআই সহকারী ও নিয়মিত হালনাগাদের জন্য মাঝে মাঝে ইন্টারনেট প্রয়োজন হবে। ওয়েবসাইটের সহকারী সম্পূর্ণ অনলাইনভিত্তিক।',
        answerEn:
          'The Android app is planned to support offline reference for core statutory provisions after an initial download. However, dynamic AI assistance and updates will need internet. The website assistant runs completely online.',
      },
      {
        id: 'supported_phones',
        questionBn: 'কোন কোন ফোনে চলবে?',
        questionEn: 'Which phones will it support?',
        answerBn:
          'আমরা মূলত ৪ জিবি র‍্যাম এবং অ্যান্ড্রয়েড ৮.০ (Android 8.0 Oreo) বা তার চেয়ে নতুন ভার্সনের স্মার্টফোন লক্ষ্য করে অ্যাপটি তৈরি করছি। চূড়ান্ত রিলিজের পূর্বে ব্যাপক পরীক্ষিত মডেলের তালিকা প্রকাশ করা হবে।',
        answerEn:
          'We are targeting modern Android phones with at least 4 GB RAM running Android 8.0 (API level 26) or higher. Verified hardware compatibility will be published as testing expands.',
      },
      {
        id: 'what_can_i_use_today',
        questionBn: 'আজই কী কী সুবিধা ব্যবহার করতে পারব?',
        questionEn: 'What can I use today?',
        answerBn:
          'আজই আপনি MyLaws অনলাইন সহকারী (/ask)-তে ৭টি বিভাগের ২৫৫টি ধারার ভিত্তিতে আইনি পরামর্শ পেতে পারেন, এবং ড্রাফট এডিটরে (/drafts) গিয়ে জিডি বা লিখিত অভিযোগ তৈরি করে A4 PDF ডাউনলোড করতে পারেন।',
        answerEn:
          'You can use our verified online assistant today at /ask across 255 provisions, and visit /drafts to generate customized complaint documents and download print-ready A4 PDFs.',
      },
    ],
  },
  finalCta: {
    headingBn: 'এখনই সাহায্য দরকার?',
    headingEn: 'Need help today?',
    descriptionBn:
      'অ্যাপ তৈরির কাজ চলাকালীন ওয়েবসাইটের সম্পূর্ণ ফিচার এখনই আপনার হাতের নাগালে। আপনার সমস্যার কথা জানান এবং নির্ভরযোগ্য আইনি তথ্য জেনে নিন।',
    descriptionEn:
      'While our mobile application is being built, all legal guidance and draft preparation tools are available on the website right now.',
    ctaBn: 'অনলাইন সহকারীর সাহায্য নিন',
    ctaEn: 'Use MyLaws online',
  },
  experimentalRelease: {
    // Only displayed inside an accessible developer disclosure; not the primary reading flow
    enabled: true,
    manifest: androidReleaseManifest,
  },
};
