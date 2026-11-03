'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useApp } from './AppContext';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  BookOpen,
  ListOrdered,
  FileText,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Scale,
  Briefcase,
  AlertTriangle,
  Home,
  ShoppingBag,
  PhoneCall,
  Download,
  ChevronRight,
  Wifi,
  Battery,
  ArrowRight,
  Send,
  User,
  Bot,
} from 'lucide-react';

type CaseStepTab = 'step1' | 'step2' | 'step3' | 'step4';

interface CaseScenario {
  id: string;
  categoryBn: string;
  categoryEn: string;
  icon: React.ComponentType<{ className?: string }>;
  lawBadgeBn: string;
  lawBadgeEn: string;
  caseRef: string;
  userQueryBn: string;
  userQueryEn: string;
  step1: {
    analysisBn: string;
    analysisEn: string;
    identifiedIssueBn: string;
    identifiedIssueEn: string;
    statuteBn: string;
    statuteEn: string;
    missingInfoBn: string;
    missingInfoEn: string;
  };
  step2: {
    plainMeaningBn: string;
    plainMeaningEn: string;
    lawTitleBn: string;
    lawTitleEn: string;
    quoteBn: string;
    quoteEn: string;
    bdlawsUrl: string;
    rightsBn: string[];
    rightsEn: string[];
  };
  step3: {
    checklists: Array<{
      id: string;
      titleBn: string;
      titleEn: string;
      metaBn: string;
      metaEn: string;
    }>;
  };
  step4: {
    toBn: string;
    toEn: string;
    subjectBn: string;
    subjectEn: string;
    previewTextBn: string;
    previewTextEn: string;
    draftPath: string;
  };
}

const SCENARIOS: CaseScenario[] = [
  {
    id: 'labour',
    categoryBn: 'বকেয়া বেতন ও শ্রম অধিকার',
    categoryEn: 'Unpaid Wages & Labour Rights',
    icon: Briefcase,
    lawBadgeBn: 'শ্রম আইন ২০০৬ সমর্থিত',
    lawBadgeEn: 'Labour Act 2006 Verified',
    caseRef: '#BD-2026-LABOUR-01',
    userQueryBn: 'আমার মালিক গত দুই মাসের বেতন দেয়নি। এখন আমি শ্রম আইনে কী করতে পারি?',
    userQueryEn: 'My employer has not paid my wages for the last two months. How can I seek relief under the Bangladesh Labour Act?',
    step1: {
      analysisBn: 'আপনি প্রতিষ্ঠানে নিয়মিত দায়িত্ব পালন করার পরও মালিকপক্ষ গত দুই মাসের আইনসংগত মজুরি পরিশোধ করেনি। এটি বাংলাদেশ শ্রম আইন অনুযায়ী বকেয়া মজুরির সুনির্দিষ্ট লঙ্ঘন।',
      analysisEn: 'You have faithfully rendered work, but your employer has failed to disburse your statutory wages for two months. This constitutes an actionable statutory wage-recovery violation.',
      identifiedIssueBn: 'বকেয়া মজুরি ও শ্রম অধিকারের লঙ্ঘন',
      identifiedIssueEn: 'Unpaid Wages & Statutory Labour Rights Violation',
      statuteBn: 'বাংলাদেশ শ্রম আইন, ২০০৬ (ধারা ১২৩ ও ১৩২)',
      statuteEn: 'Bangladesh Labour Act, 2006 (Sections 123 & 132)',
      missingInfoBn: 'ডিআইএফই (DIFE) কোন আঞ্চলিক পরিদর্শকের এখতিয়ারে আবেদন যাবে, তা নিশ্চিত করতে কর্মস্থলের জেলা বা থানা প্রয়োজন।',
      missingInfoEn: 'Workplace district/police station is required to determine the regional DIFE inspectorate jurisdiction.',
    },
    step2: {
      plainMeaningBn: 'মালিক চাইলেই বেতন অনির্দিষ্টকাল আটকে রাখতে পারেন না। আইন অনুযায়ী মজুরির মেয়াদ শেষ হওয়ার সর্বোচ্চ ৭ কার্যদিবসের মধ্যে শ্রমিকের সম্পূর্ণ মজুরি পরিশোধ করা নিয়োগদাতার আইনি বাধ্যবাধকতা।',
      plainMeaningEn: 'An employer cannot withhold wages indefinitely. Under Section 123 of the Bangladesh Labour Act, wages must be paid within 7 working days after the wage period ends.',
      lawTitleBn: 'বাংলাদেশ শ্রম আইন, ২০০৬ · ধারা ১২৩',
      lawTitleEn: 'Bangladesh Labour Act, 2006 · Section 123',
      quoteBn: '“সেই কাল শেষ হওয়ার পরবর্তী সাত কর্মদিবসের মধ্যে তাহার মজুরী পরিশোধ করিতে হইবে।”',
      quoteEn: '"The wages of every worker shall be paid before the expiry of the seventh working day after the last day of the wage period."',
      bdlawsUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-29450.html',
      rightsBn: [
        'বকেয়া মজুরির ১০০% বুঝে পাওয়ার আইনগত অধিকার।',
        'বিলম্বের জন্য শ্রম আদালত অতিরিক্ত ২৫% ক্ষতিপূরণ দিতে পারে।',
        'কলকারখানা পরিদর্শন অধিদপ্তরে (DIFE) লিখিত অভিযোগ দাখিল।',
      ],
      rightsEn: [
        'Statutory right to recover 100% of earned wages.',
        'Labour Court can award up to 25% statutory compensation atop arrears.',
        'Right to file a formal complaint with DIFE Labour Inspector.',
      ],
    },
    step3: {
      checklists: [
        {
          id: 'labour-1',
          titleBn: '১. নিয়োগপত্র, আইডি কার্ড ও বিকাশ/ব্যাংক স্টেটমেন্ট সংরক্ষণ করুন।',
          titleEn: '1. Preserve appointment letter, ID card & bank/bKash statements.',
          metaBn: 'আবশ্যক প্রমাণ · ধারা ৫ ও ১২৩',
          metaEn: 'Evidence · BLA Sec 5 & 123',
        },
        {
          id: 'labour-2',
          titleBn: '২. ধারা ১২১ অনুযায়ী মালিককে লিখিত নোটিশ বা দাবি জানান।',
          titleEn: '2. Serve formal written demand notice under Section 121.',
          metaBn: 'লিখিত দাবি · প্রমাণ সহ',
          metaEn: 'Written Demand with Proof',
        },
        {
          id: 'labour-3',
          titleBn: '৩. কলকারখানা পরিদর্শন অধিদপ্তর (DIFE) হটলাইন ১৬১০৪-এ কল করুন।',
          titleEn: '3. Lodge complaint with DIFE Inspector (Hotline: 16104).',
          metaBn: 'সরকারি হটলাইন: ১৬১০৪',
          metaEn: 'Govt Helpline: 16104',
        },
      ],
    },
    step4: {
      toBn: 'বরাবর: আঞ্চলিক উপ-মহাপরিদর্শক, কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর (DIFE)',
      toEn: 'To: Regional Deputy Inspector General, DIFE Labour Inspectorate',
      subjectBn: 'বিষয়: বাংলাদেশ শ্রম আইন ২০০৬ অনুযায়ী বকেয়া মজুরি আদায়ের আবেদন।',
      subjectEn: 'Subject: Formal Complaint for Recovery of Unpaid Wages under Labour Act 2006.',
      previewTextBn: 'আমি [আবেদনকারীর নাম], প্রতিষ্ঠান: [কর্মস্থলের নাম]। গত দুই মাস যাবত অর্জিত আইনসংগত মজুরি পরিশোধ করা হইতেছে না। এমতাবস্থায় শ্রম আইন ২০০৬ এর ১২৩ ও ১৩২ ধারা অনুযায়ী প্রয়োজনীয় ব্যবস্থা গ্রহণে প্রার্থনা করিতেছি...',
      previewTextEn: 'I am [Applicant Name], employed at [Workplace Name]. Statutory wages for the preceding two months have been unlawfully withheld. I respectfully pray for statutory enforcement under Sections 123 & 132 of BLA 2006...',
      draftPath: '/drafts',
    },
  },
  {
    id: 'gd',
    categoryBn: 'হুমকি ও পুলিশ জিডি',
    categoryEn: 'Threats & Police General Diary',
    icon: AlertTriangle,
    lawBadgeBn: 'দণ্ডবিধি ১৮৬০ ও পুলিশ আইন',
    lawBadgeEn: 'Penal Code 1860 & Police Act',
    caseRef: '#BD-2026-POLICE-02',
    userQueryBn: 'অপরিচিত নম্বর থেকে ফোন করে আমাকে ও পরিবারকে হুমকি দেওয়া হচ্ছে। থানায় জিডি কীভাবে করব?',
    userQueryEn: 'I am receiving extortion and harm threats from an unknown phone number. How do I file a Police GD?',
    step1: {
      analysisBn: 'অপরিচিত নম্বর থেকে ক্ষতি বা ভীতির সঞ্চার করা দণ্ডবিধি অনুযায়ী অপরাধজনক ভীতি প্রদর্শন (Criminal Intimidation)। সুরক্ষার জন্য তাৎক্ষণিক থানায় সাধারণ ডায়েরি (GD) করা আইনত জরুরি।',
      analysisEn: 'Threats of violence or extortion over phone constitute criminal intimidation under Penal Code Section 503. Immediate entry in the Police General Diary (GD) is essential for security.',
      identifiedIssueBn: 'অপরাধমূলক ভীতি প্রদর্শন ও নিরাপত্তা শঙ্কা',
      identifiedIssueEn: 'Criminal Intimidation & Personal Security Risk',
      statuteBn: 'দণ্ডবিধি, ১৮৬০ (ধারা ৫০৩ ও ৫০৬) ও পুলিশ আইন (ধারা ৪৪)',
      statuteEn: 'Penal Code, 1860 (Sec 503 & 506) & Police Act (Sec 44)',
      missingInfoBn: 'যে নম্বর থেকে হুমকি দেওয়া হয়েছে, কল রেকর্ড/এসএমএসের স্ক্রিনশট এবং নিকটবর্তী থানার নাম।',
      missingInfoEn: 'Phone numbers used for threats, call recordings/SMS screenshots, and local police station name.',
    },
    step2: {
      plainMeaningBn: 'যেকোনো হুমকি পাওয়ার সাথে সাথে নিকটবর্তী থানায় সাধারণ ডায়েরি (GD) করা আপনার নাগরিক অধিকার। জিডি ভবিষ্যতে আদালতে প্রাথমিক প্রমাণ হিসেবে গণ্য হয় এবং পুলিশ তদন্তের নির্দেশ চাইতে পারে।',
      plainMeaningEn: 'Filing a General Diary (GD) at your local police station is your fundamental right. A GD records the incident officially and enables police to seek magisterial inquiry orders.',
      lawTitleBn: 'দণ্ডবিধি, ১৮৬০ · ধারা ৫০৬',
      lawTitleEn: 'The Penal Code, 1860 · Section 506',
      quoteBn: '“যে ব্যক্তি অপরাধমূলক ভীতি প্রদর্শন করে, সেই ব্যক্তি কারাদণ্ডে অথবা অর্থদণ্ডে কিংবা উভয় দণ্ডেই দণ্ডিত হইবে।”',
      quoteEn: '"Whoever commits the offence of criminal intimidation shall be punished with imprisonment... or with fine, or with both."',
      bdlawsUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3269.html',
      rightsBn: [
        'নিকটস্থ থানায় ২৪ ঘণ্টা জিডি এন্ট্রি করার আইনসংগত অধিকার।',
        'জরুরি বিপদে জাতীয় জরুরি সেবা ৯৯৯-এ তাৎক্ষণিক পুলিশ সহায়তা।',
        'ম্যাজিস্ট্রেটের অনুমতি সাপেক্ষে পুলিশের তদন্ত ও সুরক্ষামূলক ব্যবস্থা।',
      ],
      rightsEn: [
        'Statutory right to lodge a GD at any police station 24/7.',
        'Immediate police dispatch via National Emergency Hotline 999.',
        'Court-sanctioned investigation and preventive police protection.',
      ],
    },
    step3: {
      checklists: [
        {
          id: 'gd-1',
          titleBn: '১. হুমকিদাতার ফোন নম্বর, কলের তারিখ ও সুনির্দিষ্ট সময় নোট করুন।',
          titleEn: '1. Note exact date, timestamp, and phone numbers of the threatening calls.',
          metaBn: 'দালিলিক প্রমাণ · অডিও/এসএমএস',
          metaEn: 'Evidence · Call audio/SMS backup',
        },
        {
          id: 'gd-2',
          titleBn: '২. কলের ভয়েস রেকর্ডিং বা মেসেজের স্ক্রিনশট ব্যাকআপ রাখুন।',
          titleEn: '2. Backup call audio and SMS screenshots securely across devices.',
          metaBn: 'ডিজিটাল প্রমাণ সংরক্ষণ',
          metaEn: 'Digital Proof Preservation',
        },
        {
          id: 'gd-3',
          titleBn: '৩. নিকটবর্তী থানার ভারপ্রাপ্ত কর্মকর্তা (OC) বরাবর জিডি জমা দিন।',
          titleEn: '3. Submit formal GD application to Officer-in-Charge (OC) of Thana.',
          metaBn: 'জাতীয় জরুরি সেবা: ৯৯৯',
          metaEn: 'Police Emergency: 999',
        },
      ],
    },
    step4: {
      toBn: 'বরাবর: অফিসার ইনচার্জ (OC), [থানার নাম] থানা, [জেলার নাম]',
      toEn: 'To: Officer-in-Charge (OC), [Police Station Name] Thana, [District]',
      subjectBn: 'বিষয়: নিরাপত্তা শঙ্কা ও অপরাধমূলক হুমকির বিষয়ে সাধারণ ডায়েরি (GD) করার আবেদন।',
      subjectEn: 'Subject: Application for Entry of General Diary regarding Criminal Intimidation.',
      previewTextBn: 'বিনীত নিবেদন এই যে, আমি [আবেদনকারীর নাম]। গত [তারিখ] তারিখে আনুমানিক [সময়] ঘটিকায় অজ্ঞাত ব্যক্তি হইতে আমাকে খুন জখমের হুমকি প্রদান করা হয়। ভবিষ্যতে কোনো ক্ষতিসাধন হইলে যাহাতে প্রমাণ হিসাবে গণ্য হয় তজ্জন্য সাধারণ ডায়েরিভুক্ত করার প্রার্থনা করিতেছি...',
      previewTextEn: 'I respectfully state that I am [Applicant Name]. On [Date] at approximately [Time], threats of bodily harm were made by unknown callers. I pray that this formal entry be registered in the General Diary for preventive security...',
      draftPath: '/drafts',
    },
  },
  {
    id: 'property',
    categoryBn: 'জমি দখল ও ভূমি অপরাধ',
    categoryEn: 'Land Dispossession & Crime',
    icon: Home,
    lawBadgeBn: 'ভূমি অপরাধ আইন ২০২৩',
    lawBadgeEn: 'Land Crime Act 2023 Verified',
    caseRef: '#BD-2026-LAND-03',
    userQueryBn: 'আমার পৈতৃক জমি জাল দলিল বানিয়ে দখলের চেষ্টা করছে। নতুন ভূমি আইনে কী ব্যবস্থা নেব?',
    userQueryEn: 'Someone is attempting to grab my ancestral land using forged deeds. What remedies exist under the new Land Crime Act?',
    step1: {
      analysisBn: 'বৈধ মালিকানা ও স্বত্ব থাকা সত্ত্বেও কোনো ব্যক্তিকে পেশিশক্তি বা জাল দলিলের মাধ্যমে জমি থেকে বেদখল করা ভূমি অপরাধ আইন ২০২৩ অনুযায়ী অজামিনযোগ্য ফৌজদারি অপরাধ।',
      analysisEn: 'Dispossessing a lawful owner of land through force or fabricated title deeds is a non-bailable criminal offence punishable with up to 7 years imprisonment under the Land Crime Act 2023.',
      identifiedIssueBn: 'অবৈধ জবরদখল ও জাল দলিল সৃজন',
      identifiedIssueEn: 'Illegal Land Dispossession & Forged Title Deeds',
      statuteBn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩ (ধারা ৪, ৭ ও ৮)',
      statuteEn: 'Land Crime Prevention and Redress Act, 2023 (Sec 4, 7, 8)',
      missingInfoBn: 'খতিয়ানের প্রকারভেদ (CS/SA/RS/BS), নামজারি পরচা ও সর্বশেষ ভূমি উন্নয়ন কর পরিশোধের রশিদ।',
      missingInfoEn: 'Khatian type (CS/SA/RS/BS), mutation record, and latest land tax payment voucher.',
    },
    step2: {
      plainMeaningBn: 'নতুন আইন ২০২৩ অনুযায়ী শুধুমাত্র দলিল থাকলেই হবে না, মূল মালিকের নামে সর্বশেষ খতিয়ান ও নামজারি থাকতে হবে। জবরদখলকারীদের বিরুদ্ধে নির্বাহী ম্যাজিস্ট্রেট আদালতে তাৎক্ষণিক দখল পুনরুদ্ধারের আবেদন করা যায়।',
      plainMeaningEn: 'Under the 2023 Act, forged deeds are void ab initio. The Executive Magistrate has fast-track powers to evict trespassers and restore vacant possession to the recorded owner within 90 days.',
      lawTitleBn: 'ভূমি অপরাধ প্রতিরোধ আইন, ২০২৩ · ধারা ৮',
      lawTitleEn: 'Land Crime Prevention Act, 2023 · Section 8',
      quoteBn: '“কোনো ব্যক্তিকে উপযুক্ত আদালতের আদেশ ব্যতীত তাহার দখলীয় জমি হইতে বেদখল করা যাইবে না; করিলে তাহা ফৌজদারি অপরাধ বলিয়া গণ্য হইবে।”',
      quoteEn: '"No person shall be dispossessed from their occupied land except by lawful court order; any violation constitutes a criminal offence."',
      bdlawsUrl: 'https://bdlaws.minlaw.gov.bd/act-1466.html',
      rightsBn: [
        'নির্বাহী ম্যাজিস্ট্রেট আদালতে ধারা ৮ অনুযায়ী তাৎক্ষণিক দখল পুনরুদ্ধারের প্রতিকার।',
        'জাল দলিল প্রস্তুতকারীর বিরুদ্ধে সর্বোচ্চ ৭ বছরের সশ্রম কারাদণ্ড।',
        'সহকারী কমিশনার (ভূমি) বরাবরে নামজারি পর্যালোচনার আবেদন।',
      ],
      rightsEn: [
        'Right to petition Executive Magistrate for immediate summary recovery of possession.',
        'Criminal prosecution carrying up to 7 years rigorous imprisonment.',
        'Right to file review petition before Assistant Commissioner (Land).',
      ],
    },
    step3: {
      checklists: [
        {
          id: 'land-1',
          titleBn: '১. সিএস/এসএ/আরএস ও বিএস খতিয়ান এবং নামজারি পরচা সংগ্রহ করুন।',
          titleEn: '1. Collect certified chain of CS/SA/RS/BS Khatians and mutation khatian.',
          metaBn: 'মালিকানার স্বত্ব · খতিয়ান চেইন',
          metaEn: 'Title Chain · Certified Records',
        },
        {
          id: 'land-2',
          titleBn: '২. সর্বশেষ অর্থবছরের দাখিলা (ভূমি উন্নয়ন কর রশিদ) হালনাগাদ রাখুন।',
          titleEn: '2. Keep updated land development tax payment voucher (Dakhila).',
          metaBn: 'ভূমি উন্নয়ন কর রশিদ',
          metaEn: 'Land Tax (Dakhila) Receipt',
        },
        {
          id: 'land-3',
          titleBn: '৩. নির্বাহী ম্যাজিস্ট্রেট আদালতে ভূমি অপরাধ আইনে লিখিত দরখাস্ত দাখিল করুন।',
          titleEn: '3. File eviction petition before Executive Magistrate Court under Sec 8.',
          metaBn: 'এখতিয়ার: নির্বাহী আদালত',
          metaEn: 'Court: Executive Magistrate',
        },
      ],
    },
    step4: {
      toBn: 'বরাবর: বিজ্ঞ নির্বাহী ম্যাজিস্ট্রেট আদালত, [উপজেলা/জেলা]',
      toEn: 'To: Learned Executive Magistrate Court, [Upazila/District]',
      subjectBn: 'বিষয়: ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩ এর ৮ ধারা অনুযায়ী অবৈধ জবরদখল উচ্ছেদ ও দখল পুনরুদ্ধারের আবেদন।',
      subjectEn: 'Subject: Petition for Eviction of Illegal Trespassers and Restoration of Possession under Section 8 of Land Crime Act 2023.',
      previewTextBn: 'বিনীত নিবেদন এই যে, তফসিল বর্ণিত জমি আমি আবেদনকারী পৈতৃক সূত্রে মালিক ও নামজারি খতিয়ানভুক্ত স্বত্বাধিকারী। বিবাদীগণ পেশিশক্তি ও জাল দলিলের বলে জোরপূর্বক অনুপ্রবেশের অপচেষ্টা করিতেছে...',
      previewTextEn: 'I respectfully submit that I am the lawful recorded owner of the schedule land. The respondents, possessing no lawful title, are attempting forceful trespass via forged instruments...',
      draftPath: '/drafts',
    },
  },
  {
    id: 'consumer',
    categoryBn: 'ভোক্তা অধিকার ও প্রতারণা',
    categoryEn: 'Consumer Rights & Fraud',
    icon: ShoppingBag,
    lawBadgeBn: 'ভোক্তা অধিকার আইন ২০০৯',
    lawBadgeEn: 'Consumer Rights Act 2009',
    caseRef: '#BD-2026-CONSUMER-04',
    userQueryBn: 'দোকান থেকে মেয়াদোত্তীর্ণ পণ্য দিয়ে টাকা ফেরত দিতে চাইছে না। আমি কীভাবে অভিযোগ করব?',
    userQueryEn: 'A retail store sold me expired goods and refuses to refund my money. How can I file a formal complaint?',
    step1: {
      analysisBn: 'মেয়াদোত্তীর্ণ খাদ্য বা পণ্য বিক্রি করা ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯ এর ৫১ ধারা অনুযায়ী শাস্তিযোগ্য অপরাধ। ক্রেতা আইনসংগতভাবে সম্পূর্ণ ক্ষতিপূরণ এবং ২৫% জরিমানা পাওয়ার অধিকারী।',
      analysisEn: 'Selling expired consumer products is an offence under Section 51 of the Consumers’ Right Protection Act 2009. Complainants are entitled to 25% of any administrative fine collected.',
      identifiedIssueBn: 'মেয়াদোত্তীর্ণ পণ্য বিক্রয় ও ক্রেতা প্রতারণা',
      identifiedIssueEn: 'Sale of Expired Goods & Consumer Fraud',
      statuteBn: 'ভোক্তা অধিকার সংরক্ষণ আইন, ২০০৯ (ধারা ৫১ ও ৭৬)',
      statuteEn: 'Consumers’ Right Protection Act, 2009 (Sections 51 & 76)',
      missingInfoBn: 'ক্রয়রসিদ (Cash Memo), পণ্যের গায়ে মুদ্রিত মেয়াদোত্তীর্ণের তারিখের ছবি ও দোকানের নাম-ঠিকানা।',
      missingInfoEn: 'Purchase receipt (Cash Memo), clear photo of printed expiration date, and store address.',
    },
    step2: {
      plainMeaningBn: 'ভোক্তা আইন অনুযায়ী পণ্যের গায়ে মেয়াদোত্তীর্ণের তারিখ স্পষ্ট থাকা বাধ্যতামূলক। প্রতারিত ভোক্তা ঘটনার ৩০ দিনের মধ্যে জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তরে লিখিত অভিযোগ করতে পারেন।',
      plainMeaningEn: 'Under Section 51, selling adulterated or expired products is penalized with up to 1 year imprisonment or monetary fines. Written complaint must be submitted within 30 days of purchase.',
      lawTitleBn: 'ভোক্তা অধিকার সংরক্ষণ আইন, ২০০৯ · ধারা ৫১',
      lawTitleEn: 'Consumers’ Right Protection Act, 2009 · Section 51',
      quoteBn: '“কোন ব্যক্তি মেয়াদ উত্তীর্ণ কোন পণ্য বিক্রয় বা বিক্রয়ের প্রস্তাব করিলে তিনি অনধিক এক বৎসর কারাদণ্ড, বা অনধিক পঞ্চাশ হাজার টাকা অর্থদণ্ড, বা উভয় দণ্ডে দণ্ডিত হইবেন।”',
      quoteEn: '"Whoever sells or offers for sale any expired goods shall be punished with imprisonment for a term not exceeding 1 year, or with fine not exceeding 50,000 Taka, or with both."',
      bdlawsUrl: 'https://bdlaws.minlaw.gov.bd/act-1016/section-36254.html',
      rightsBn: [
        'পূর্ণ টাকা ফেরত অথবা ত্রুটিমুক্ত পণ্য পাওয়ার আইনগত অধিকার।',
        'জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তরে (DNCRP) ৩০ দিনের মধ্যে অভিযোগ।',
        'আদায়কৃত সরকারি জরিমানার ২৫% নগদ পুরস্কার পাওয়ার আইনগত অধিকার।',
      ],
      rightsEn: [
        'Right to full refund or defect-free replacement.',
        'Right to file complaint to DNCRP within 30 days of purchase.',
        'Statutory guarantee to receive 25% of any administrative fine levied on the seller.',
      ],
    },
    step3: {
      checklists: [
        {
          id: 'consumer-1',
          titleBn: '১. ক্যাশ মেমো বা লেনদেনের রশিদ যত্নসহকারে সংরক্ষণ করুন।',
          titleEn: '1. Preserve purchase receipt, invoice, or digital transaction voucher.',
          metaBn: 'আবশ্যিক প্রমাণ · ৩০ দিনের তামাদি',
          metaEn: 'Mandatory Proof · 30-day limit',
        },
        {
          id: 'consumer-2',
          titleBn: '২. পণ্যের ব্যাচ নম্বর ও মেয়াদোত্তীর্ণের তারিখের স্পষ্ট ছবি তুলুন।',
          titleEn: '2. Take clear high-resolution photos of batch number and expiry date.',
          metaBn: 'ফটোগ্রাফিক প্রমাণ',
          metaEn: 'Product Photo Evidence',
        },
        {
          id: 'consumer-3',
          titleBn: '৩. জাতীয় ভোক্তা অধিকার হটলাইন ১৬১২১-এ কল করে অভিযোগ করুন।',
          titleEn: '3. Call National Consumer Helpline 16121 or lodge a formal petition.',
          metaBn: 'ভোক্তা হটলাইন: ১৬১২১',
          metaEn: 'DNCRP Helpline: 16121',
        },
      ],
    },
    step4: {
      toBn: 'বরাবর: মহাপরিচালক, জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তর (DNCRP)',
      toEn: 'To: Director General, Directorate of National Consumers’ Right Protection (DNCRP)',
      subjectBn: 'বিষয়: ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯ অনুযায়ী মেয়াদোত্তীর্ণ পণ্য বিক্রয়ের প্রতিকার চেয়ে আবেদন।',
      subjectEn: 'Subject: Formal Complaint under Consumers’ Right Protection Act 2009 regarding Sale of Expired Goods.',
      previewTextBn: 'বিনীত নিবেদন এই যে, আমি [ভোক্তার নাম]। গত [তারিখ] তারিখে [দোকানের নাম] হইতে ক্রয়কৃত পণ্যটি মেয়াদোত্তীর্ণ প্রমাণিত হয়। দোকানদার টাকা ফেরত প্রদানে অস্বীকৃতি জানিয়েছে। তজ্জন্য আইনগত ব্যবস্থা গ্রহণ ও ২৫% পুরস্কারের আবেদন করিতেছি...',
      previewTextEn: 'I respectfully submit that I am [Consumer Name]. On [Date], I purchased product from [Store Name] which was past expiration date. The merchant refused statutory refund. I pray for investigation and statutory reward under Sec 76...',
      draftPath: '/drafts',
    },
  },
];

export function InteractiveMobileDemo() {
  const { lang, t } = useApp();
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('labour');
  const [activeStep, setActiveStep] = useState<CaseStepTab>('step1');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'labour-1': true,
    'gd-1': true,
    'land-1': true,
    'consumer-1': true,
  });

  // 3D Tilt Physics State
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [stepProgress, setStepProgress] = useState<number>(0);

  const scenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  const stepsList: { id: CaseStepTab; num: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'step1', num: t('১', '1'), label: t('বিশ্লেষণ', 'Analysis'), icon: Sparkles },
    { id: 'step2', num: t('২', '2'), label: t('গেজেট ও ধারা', 'Statutes'), icon: BookOpen },
    { id: 'step3', num: t('৩', '3'), label: t('চেকলিস্ট', 'Checklist'), icon: ListOrdered },
    { id: 'step4', num: t('৪', '4'), label: t('প্রমিত খসড়া', 'Ready Draft'), icon: FileText },
  ];

  // Auto-play timer loop
  useEffect(() => {
    if (!isPlaying) return;

    const STEP_DURATION = 4200; // 4.2 seconds per step
    const intervalTime = 50;
    const progressIncrement = (intervalTime / STEP_DURATION) * 100;

    const timer = setInterval(() => {
      setStepProgress((prev) => {
        if (prev >= 100) {
          // Advance to next step
          setActiveStep((current) => {
            if (current === 'step1') return 'step2';
            if (current === 'step2') return 'step3';
            if (current === 'step3') return 'step4';
            // If at step4, advance to next scenario and loop to step1
            setSelectedScenarioId((scenId) => {
              const currentIdx = SCENARIOS.findIndex((s) => s.id === scenId);
              const nextIdx = (currentIdx + 1) % SCENARIOS.length;
              return SCENARIOS[nextIdx].id;
            });
            return 'step1';
          });
          return 0;
        }
        return prev + progressIncrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Handle pointer move for real-time 3D tilt & specular glass reflection
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2; // -1 to 1
    const normY = (y / rect.height - 0.5) * 2; // -1 to 1

    // Maximum 12 degrees tilt
    setTilt({
      x: -normY * 11, // rotateX tilts backwards when cursor is at bottom
      y: normX * 12,  // rotateY tilts right when cursor is at right
    });

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleManualStepSelect = (stepId: CaseStepTab) => {
    setActiveStep(stepId);
    setStepProgress(0);
  };

  const handleManualScenarioSelect = (id: string) => {
    setSelectedScenarioId(id);
    setActiveStep('step1');
    setStepProgress(0);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-2">
      
      {/* ========================================================
          TOP CONTROL BAR: Scenario Selector & Auto-Play Controller
          ======================================================== */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 bg-surface-cardLight/95 p-2 sm:p-2.5 rounded-2xl border border-border-light shadow-xs backdrop-blur-sm">
        
        {/* Scenario Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none py-0.5">
          {SCENARIOS.map((s) => {
            const Icon = s.icon;
            const isSelected = s.id === selectedScenarioId;
            return (
              <button
                key={s.id}
                onClick={() => handleManualScenarioSelect(s.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-accent-light text-white shadow-xs font-anek font-bold'
                    : 'bg-surface-light text-secondary-light hover:text-accent-light hover:bg-[#F1EDE1] border border-border-light/60 font-hind'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-white' : 'text-accent-light'}`} />
                <span>{lang === 'bn' ? s.categoryBn : s.categoryEn}</span>
              </button>
            );
          })}
        </div>

        {/* Auto-Play Toggle & Step Scrubber */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-light border border-border-light text-xs font-semibold text-secondary-light hover:text-accent-light transition-all shadow-2xs font-hind group"
            title={isPlaying ? 'Pause Auto Tour' : 'Resume Auto Tour'}
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5 text-accent-light" />
                <span className="text-[11px] font-bold">{t('বিরতি', 'Pause')}</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-accent-light fill-accent-light" />
                <span className="text-[11px] font-bold">{t('স্বয়ংক্রিয় চালান', 'Auto Play')}</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setActiveStep('step1');
              setStepProgress(0);
            }}
            className="p-1.5 rounded-xl bg-surface-light border border-border-light text-secondary-light hover:text-accent-light transition-all"
            title="Reset to Step 1"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================
          3D INTERACTIVE SMARTPHONE STAGE
          ======================================================== */}
      <div
        className="relative flex items-center justify-center py-4"
        style={{ perspective: '1200px' }}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={handlePointerLeave}
      >
        
        {/* Floating Ambient Parallax Glows */}
        <div className="absolute -top-10 left-1/4 w-72 h-72 bg-accent-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-1/4 w-80 h-80 bg-accent-light/10 rounded-full blur-3xl pointer-events-none" />

        {/* 3D Floating Holographic Legal Badges (Desktop visible) */}
        <div
          className="hidden lg:flex absolute -left-6 top-20 z-20 items-center gap-2 px-3 py-2 rounded-2xl bg-surface-cardLight/95 border border-border-light shadow-md backdrop-blur-md transition-transform duration-300"
          style={{
            transform: `translate3d(${tilt.y * -0.8}px, ${tilt.x * 0.8}px, 35px)`,
          }}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-accent-light/10 text-accent-light">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="text-left font-hind">
            <div className="text-[10px] font-bold text-accent-light uppercase tracking-wider font-cinzel">
              {t('তাৎক্ষণিক বিশ্লেষণ', 'Instant Analysis')}
            </div>
            <div className="text-xs font-semibold text-primary-light">
              {t('সরাসরি ধারা ও এখতিয়ার', 'Verbatim Provisions')}
            </div>
          </div>
        </div>

        <div
          className="hidden lg:flex absolute -right-6 bottom-28 z-20 items-center gap-2 px-3 py-2 rounded-2xl bg-surface-cardLight/95 border border-border-light shadow-md backdrop-blur-md transition-transform duration-300"
          style={{
            transform: `translate3d(${tilt.y * 0.8}px, ${tilt.x * -0.8}px, 35px)`,
          }}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-accent-light text-white">
            <FileText className="h-4 w-4" />
          </div>
          <div className="text-left font-hind">
            <div className="text-[10px] font-bold text-accent-light uppercase tracking-wider font-cinzel">
              {t('প্রমিত ফরম্যাট', 'Ready Draft')}
            </div>
            <div className="text-xs font-semibold text-primary-light">
              {t('প্রিন্ট-রেডি A4 PDF', 'Print-Ready A4 PDF')}
            </div>
          </div>
        </div>

        {/* ========================================================
            THE 3D SMARTPHONE CHASSIS
            ======================================================== */}
        <div
          ref={phoneRef}
          className="relative w-full max-w-[340px] sm:max-w-[365px] transition-transform duration-150 ease-out select-none"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
              !isHovered ? 'translateY(-4px)' : 'translateY(0px)'
            }`,
            transformStyle: 'preserve-3d',
            boxShadow: `
              0 30px 70px -15px rgba(35, 31, 28, 0.4),
              0 15px 35px -10px rgba(138, 104, 64, 0.25),
              0 0 0 1px rgba(138, 104, 64, 0.15)
            `,
            borderRadius: '48px',
          }}
        >
          {/* Hardware Outer Bezel (Titanium Edge) */}
          <div className="relative rounded-[48px] p-[8px] bg-gradient-to-b from-[#3B342C] via-[#2A241F] to-[#1C1814] shadow-2xl border border-white/20">
            
            {/* Hardware Side Buttons */}
            <div className="absolute -left-[11px] top-24 w-[3px] h-10 bg-[#423A31] rounded-l-md" />
            <div className="absolute -left-[11px] top-38 w-[3px] h-10 bg-[#423A31] rounded-l-md" />
            <div className="absolute -right-[11px] top-28 w-[3px] h-14 bg-[#423A31] rounded-r-md" />

            {/* Inner Phone Screen */}
            <div className="relative rounded-[40px] overflow-hidden bg-[#FAF8F3] border border-black/40 text-primary-light flex flex-col min-h-[610px] sm:min-h-[640px]">
              
              {/* Dynamic Specular Glass Reflection Sheen */}
              <div
                className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(${115 + tilt.y * 2}deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 40%, transparent 60%)`,
                }}
              />

              {/* Top Phone Status Bar & Dynamic Island */}
              <div className="relative z-20 pt-3 px-5 pb-2 flex items-center justify-between text-[11px] font-bold text-[#231F1C]/80 font-sans">
                <span>9:41</span>
                
                {/* Dynamic Island Camera Notch */}
                <div className="h-4 w-24 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-inner">
                  <div className="h-2 w-2 rounded-full bg-[#1A1A1A] border border-white/10" />
                  <div className="h-1.5 w-1.5 rounded-full bg-[#0D2440]" />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px]">5G</span>
                  <Wifi className="h-3 w-3" />
                  <Battery className="h-3.5 w-3.5 text-accent-light" />
                </div>
              </div>

              {/* In-App Navigation Header */}
              <div className="relative z-10 px-4 py-2 border-b border-border-light/70 bg-surface-cardLight/90 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-accent-light text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    <Scale className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-anek font-bold text-xs text-primary-light">MyLaws</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="text-[10px] text-accent-light font-cinzel font-semibold tracking-wider">
                      {scenario.caseRef}
                    </div>
                  </div>
                </div>

                {/* Law Badge Pill */}
                <span className="font-anek text-[10px] font-bold text-accent-light bg-accent-light/10 border border-accent-light/20 px-2 py-0.5 rounded-full">
                  {lang === 'bn' ? scenario.lawBadgeBn : scenario.lawBadgeEn}
                </span>
              </div>

              {/* Auto-Play Step Progress Bar */}
              <div className="h-1 w-full bg-border-light/50 overflow-hidden relative z-10">
                <div
                  className="h-full bg-accent-light transition-all duration-75 ease-linear"
                  style={{ width: isPlaying ? `${stepProgress}%` : '100%' }}
                />
              </div>

              {/* 4 Step Switcher Inside Phone */}
              <div className="relative z-10 grid grid-cols-4 gap-1 p-2 bg-[#F1EDE1]/60 border-b border-border-light/60">
                {stepsList.map((step) => {
                  const Icon = step.icon;
                  const isActive = activeStep === step.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => handleManualStepSelect(step.id)}
                      className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-center transition-all ${
                        isActive
                          ? 'bg-accent-light text-white shadow-2xs font-bold scale-[1.02]'
                          : 'bg-surface-cardLight text-secondary-light hover:text-accent-light'
                      }`}
                    >
                      <span className="text-[10px] font-anek font-bold leading-none mb-0.5">
                        {step.num}
                      </span>
                      <span className="text-[9px] font-hind leading-tight truncate max-w-full">
                        {step.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* ========================================================
                  PHONE APP MAIN CONTENT AREA (Scrollable, Interactive)
                  ======================================================== */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3 font-hind text-xs">
                
                {/* 1. Citizen Inquiry Message Bubble */}
                <div className="flex items-start justify-end gap-2 pl-4">
                  <div className="p-2.5 rounded-2xl rounded-tr-xs bg-accent-light text-white shadow-xs max-w-[85%] text-[11px] leading-relaxed font-hind">
                    <div className="flex items-center gap-1 text-[9px] font-semibold text-white/80 mb-0.5">
                      <User className="h-3 w-3" />
                      <span>{t('নাগরিক জিজ্ঞাসা', 'Citizen Query')}</span>
                    </div>
                    {lang === 'bn' ? scenario.userQueryBn : scenario.userQueryEn}
                  </div>
                </div>

                {/* 2. MyLaws AI Assistant Response Cards */}
                <div className="space-y-2.5 pt-1">
                  
                  {/* STEP 1: Deep Legal Problem Analysis */}
                  {activeStep === 'step1' && (
                    <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                      <div className="p-3 rounded-2xl bg-surface-cardLight border border-border-light shadow-2xs space-y-2">
                        <div className="flex items-center gap-1.5 text-accent-light font-bold font-anek text-[11px]">
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>{t('আইনি সমস্যা অনুধাবন ও এখতিয়ার', 'Core Statutory Identification')}</span>
                        </div>
                        <p className="text-[11px] text-[#5A534A] leading-relaxed">
                          {lang === 'bn' ? scenario.step1.analysisBn : scenario.step1.analysisEn}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl border border-accent-light/30 bg-accent-light/5 space-y-1">
                        <div className="text-[10px] font-bold text-accent-light uppercase font-cinzel">
                          {t('চিহ্নিত আইনি বিধান:', 'Identified Statute:')}
                        </div>
                        <div className="text-[11px] font-anek font-bold text-primary-light">
                          {lang === 'bn' ? scenario.step1.statuteBn : scenario.step1.statuteEn}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl border border-amber-300/60 bg-amber-50/70 text-[10px] text-amber-900 leading-snug">
                        <strong>{t('প্রয়োজনীয় অতিরিক্ত তথ্য: ', 'Missing Jurisdictional Facts: ')}</strong>
                        <span>{lang === 'bn' ? scenario.step1.missingInfoBn : scenario.step1.missingInfoEn}</span>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Verbatim Gazette Quotations & Citizen Rights */}
                  {activeStep === 'step2' && (
                    <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                      <div className="p-3 rounded-2xl bg-surface-cardLight border border-border-light shadow-2xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-anek font-bold text-primary-light text-[11px]">
                            {lang === 'bn' ? scenario.step2.lawTitleBn : scenario.step2.lawTitleEn}
                          </span>
                          <span className="text-[9px] font-bold uppercase font-cinzel text-accent-light bg-accent-light/10 px-1.5 py-0.5 rounded">
                            {t('গেজেট পাঠ', 'Gazette')}
                          </span>
                        </div>

                        {/* Verbatim Gazette Quote Box */}
                        <div className="p-2.5 rounded-xl border-l-2 border-accent-light bg-[#F1EDE1]/70 font-anek text-[11px] font-semibold text-primary-light italic leading-relaxed">
                          {lang === 'bn' ? scenario.step2.quoteBn : scenario.step2.quoteEn}
                        </div>

                        <p className="text-[11px] text-[#5A534A] leading-relaxed">
                          {lang === 'bn' ? scenario.step2.plainMeaningBn : scenario.step2.plainMeaningEn}
                        </p>

                        <a
                          href={scenario.step2.bdlawsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] font-bold text-accent-light hover:underline pt-0.5"
                        >
                          <span>bdlaws.minlaw.gov.bd {t('এ আসল ধারা দেখুন', 'view on bdlaws')}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>

                      {/* Citizen Rights List */}
                      <div className="p-2.5 rounded-2xl bg-surface-cardLight border border-border-light space-y-1.5">
                        <div className="text-[10px] font-bold uppercase font-cinzel text-accent-light">
                          {t('আপনার আইনসংগত অধিকারসমূহ:', 'Your Statutory Remedies:')}
                        </div>
                        {(lang === 'bn' ? scenario.step2.rightsBn : scenario.step2.rightsEn).map((right, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-1.5 text-[10px] text-[#5A534A]">
                            <CheckCircle2 className="h-3 w-3 text-accent-light shrink-0 mt-0.5" />
                            <span>{right}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Action Checklist & Hotlines */}
                  {activeStep === 'step3' && (
                    <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[11px] font-bold font-anek text-primary-light">
                          {t('৩টি অগ্রাধিকারমূলক পদক্ষেপ:', '3-Step Action Checklist:')}
                        </span>
                        <span className="text-[10px] text-accent-light font-semibold font-hind">
                          {t('(চেক করতে ট্যাপ করুন)', '(Tap to check)')}
                        </span>
                      </div>

                      {scenario.step3.checklists.map((item) => {
                        const isChecked = !!checkedItems[item.id];
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleCheck(item.id)}
                            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2 ${
                              isChecked
                                ? 'bg-emerald-50/60 border-emerald-300/80 text-emerald-950'
                                : 'bg-surface-cardLight border-border-light text-[#5A534A] hover:border-accent-light/50'
                            }`}
                          >
                            <div className="pt-0.5 shrink-0">
                              <div
                                className={`h-4 w-4 rounded-md flex items-center justify-center transition-colors ${
                                  isChecked ? 'bg-emerald-600 text-white' : 'border border-border-light bg-surface-light'
                                }`}
                              >
                                {isChecked && <CheckCircle2 className="h-3.5 w-3.5" />}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-[11px] font-hind leading-snug ${isChecked ? 'line-through text-emerald-800/80' : 'text-[#231F1C]'}`}>
                                {lang === 'bn' ? item.titleBn : item.titleEn}
                              </p>
                              <span className="text-[9px] font-semibold text-accent-light block mt-0.5">
                                {lang === 'bn' ? item.metaBn : item.metaEn}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* STEP 4: Formal Draft Preparation Studio */}
                  {activeStep === 'step4' && (
                    <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                      <div className="p-3 rounded-2xl bg-surface-cardLight border border-border-light shadow-2xs space-y-2">
                        <div className="flex items-center justify-between border-b border-border-light/60 pb-1.5">
                          <span className="text-[10px] font-bold uppercase font-cinzel text-accent-light">
                            {t('প্রমিত আবেদনপত্র খসড়া', 'Formal Legal Petition')}
                          </span>
                          <span className="text-[9px] font-bold text-white bg-accent-light px-2 py-0.5 rounded-full">
                            A4 PDF
                          </span>
                        </div>

                        {/* Formal Draft Envelope Style */}
                        <div className="space-y-1 text-[10px] font-hind border border-border-light/60 p-2 rounded-xl bg-[#F1EDE1]/50">
                          <div className="font-semibold text-primary-light">
                            {lang === 'bn' ? scenario.step4.toBn : scenario.step4.toEn}
                          </div>
                          <div className="font-bold text-accent-light">
                            {lang === 'bn' ? scenario.step4.subjectBn : scenario.step4.subjectEn}
                          </div>
                          <p className="text-[#5A534A] leading-relaxed pt-1 line-clamp-3">
                            {lang === 'bn' ? scenario.step4.previewTextBn : scenario.step4.previewTextEn}
                          </p>
                        </div>

                        {/* Draft Action Buttons */}
                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                          <Link
                            href="/drafts"
                            className="inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-accent-light text-white text-[10px] font-bold font-anek active-press shadow-xs hover:bg-accent-light/90 transition-all text-center"
                          >
                            <Download className="h-3 w-3" />
                            <span>{t('PDF ডাউনলোড', 'Get A4 PDF')}</span>
                          </Link>
                          <Link
                            href="/drafts"
                            className="inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl border border-border-light bg-surface-light text-[10px] font-semibold text-secondary-light hover:text-accent-light transition-all text-center font-hind"
                          >
                            <span>{t('সম্পাদনা করুন →', 'Edit Draft →')}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* In-App Interactive Navigation Buttons */}
              <div className="relative z-10 p-2.5 border-t border-border-light/70 bg-surface-cardLight/95 flex items-center justify-between text-xs">
                <button
                  disabled={activeStep === 'step1'}
                  onClick={() => {
                    if (activeStep === 'step4') handleManualStepSelect('step3');
                    else if (activeStep === 'step3') handleManualStepSelect('step2');
                    else if (activeStep === 'step2') handleManualStepSelect('step1');
                  }}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-semibold text-secondary-light disabled:opacity-30 disabled:pointer-events-none hover:text-accent-light transition-colors font-hind"
                >
                  {t('← পূর্ববর্তী', '← Prev')}
                </button>

                <span className="font-cinzel text-[10px] font-bold text-accent-light tracking-widest uppercase">
                  {activeStep === 'step1' && t('ধাপ ১ / ৪', 'STEP 1 / 4')}
                  {activeStep === 'step2' && t('ধাপ ২ / ৪', 'STEP 2 / 4')}
                  {activeStep === 'step3' && t('ধাপ ৩ / ৪', 'STEP 3 / 4')}
                  {activeStep === 'step4' && t('ধাপ ৪ / ৪', 'STEP 4 / 4')}
                </span>

                <button
                  disabled={activeStep === 'step4'}
                  onClick={() => {
                    if (activeStep === 'step1') handleManualStepSelect('step2');
                    else if (activeStep === 'step2') handleManualStepSelect('step3');
                    else if (activeStep === 'step3') handleManualStepSelect('step4');
                  }}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-accent-light disabled:opacity-30 disabled:pointer-events-none hover:underline transition-all font-hind"
                >
                  {t('পরবর্তী →', 'Next →')}
                </button>
              </div>

              {/* Phone Home Swipe Indicator Bar */}
              <div className="relative z-10 pb-2 flex justify-center bg-surface-cardLight/95">
                <div className="h-1 w-28 rounded-full bg-primary-light/20" />
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
