'use client';

import React, { useState } from 'react';
import { useApp } from './AppContext';
import {
  FileText,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Shield,
  Clock,
  Building,
  Sparkles,
  HelpCircle,
  ListOrdered,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Scale,
  Briefcase,
  AlertTriangle,
  Home,
  ShoppingBag,
} from 'lucide-react';
import Link from 'next/link';

type CaseStepTab = 'step1' | 'step2' | 'step3' | 'step4';

interface CaseScenario {
  id: string;
  categoryBn: string;
  categoryEn: string;
  icon: React.ReactNode;
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
    calloutBn: string;
    calloutEn: string;
    toBn: string;
    toEn: string;
    subjectBn: string;
    subjectEn: string;
    previewTextBn: string;
    previewTextEn: string;
    requiredDetailsBn: string;
    requiredDetailsEn: string;
    draftPath: string;
  };
}

const SCENARIOS: CaseScenario[] = [
  {
    id: 'labour',
    categoryBn: 'বকেয়া বেতন ও শ্রম অধিকার',
    categoryEn: 'Unpaid Wages & Labour Rights',
    icon: <Briefcase className="h-3.5 w-3.5" />,
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
      missingInfoBn: 'কলকারখানা পরিদর্শন অধিদপ্তরের (DIFE) কোন আঞ্চলিক পরিদর্শকের এখতিয়ারে আবেদন যাবে, তা নিশ্চিত করতে কর্মস্থলের জেলা বা থানা প্রয়োজন।',
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
        'বকেয়া মজুরির ১০০% বুঝে পাওয়ার অবিচ্ছেদ্য আইনগত অধিকার।',
        'অযৌক্তিক বিলম্বে শ্রম আদালত অতিরিক্ত ২৫% ক্ষতিপূরণ দেওয়ার নির্দেশ দিতে পারেন।',
        'কলকারখানা পরিদর্শন অধিদপ্তরে (DIFE) লিখিত অভিযোগ দাখিল।',
      ],
      rightsEn: [
        'Statutory right to recover 100% of earned wages.',
        'Labour Court can award up to 25% statutory compensation atop arrears for unjustified delay.',
        'Right to file a formal complaint with the regional DIFE Labour Inspector.',
      ],
    },
    step3: {
      checklists: [
        {
          id: 'labour-1',
          titleBn: '১. নিয়োগপত্র, হাজিরা কার্ড, ব্যাংক/বিকাশ স্টেটমেন্ট ও বকেয়া হিসাব সংরক্ষণ করুন।',
          titleEn: '1. Preserve appointment letter, punch records, bank/bKash statement, and calculation.',
          metaBn: 'সহায়ক প্রমাণ · শ্রম আইন ধারা ৫ ও ১২৩',
          metaEn: 'Essential Evidence · BLA Sec 5 & 123',
        },
        {
          id: 'labour-2',
          titleBn: '২. ধারা ১২১ ও ১২৩ অনুযায়ী ডাকযোগে রেজিস্টার্ড আইনি নোটিশ প্রদান করুন।',
          titleEn: '2. Serve formal written demand notice under Sections 121 & 123 with proof of delivery.',
          metaBn: 'আইনি নোটিশ · ধারা ১২১-১২৩',
          metaEn: 'Written Demand · Sec 121-123',
        },
        {
          id: 'labour-3',
          titleBn: '৩. কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর (DIFE) বরাবর লিখিত অভিযোগ দাখিল করুন।',
          titleEn: '3. Lodge a formal complaint with regional DIFE Labour Inspector (Hotline: 16104).',
          metaBn: 'সরকারি দপ্তর · ডিআইএফই (১৬১০৪)',
          metaEn: 'Govt Authority · DIFE (16104)',
        },
      ],
    },
    step4: {
      calloutBn: 'আপনি কি কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর (DIFE) বরাবর একটি আনুষ্ঠানিক লিখিত অভিযোগ খসড়া প্রস্তুত করতে চান?',
      calloutEn: 'Would you like to prepare a formal written complaint addressed to the DIFE Labour Inspector?',
      toBn: 'বরাবর: আঞ্চলিক উপ-মহাপরিদর্শক, কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর',
      toEn: 'To: Regional Deputy Inspector General, DIFE Labour Inspectorate',
      subjectBn: 'বিষয়: বাংলাদেশ শ্রম আইন ২০০৬ অনুযায়ী বকেয়া মজুরি আদায়ের আবেদন।',
      subjectEn: 'Subject: Formal Complaint for Recovery of Unpaid Wages under Labour Act 2006.',
      previewTextBn: 'আমি [আবেদনকারীর নাম], প্রতিষ্ঠান: [কর্মস্থলের নাম]। গত দুই মাস যাবত অর্জিত আইনসংগত মজুরি পরিশোধ করা হইতেছে না...',
      previewTextEn: 'I am [Applicant Name], employed at [Workplace Name]. Statutory wages for the preceding two months have been unlawfully withheld...',
      requiredDetailsBn: 'খসড়া চূড়ান্ত করতে: প্রতিষ্ঠানের সঠিক ঠিকানা, বকেয়া মাসের তালিকা ও টাকার পরিমাণ প্রয়োজন।',
      requiredDetailsEn: 'To finalize draft: Employer address, list of unpaid months, and total amount owed.',
      draftPath: '/drafts',
    },
  },
  {
    id: 'gd',
    categoryBn: 'হুমকি ও সাধারণ ডায়েরি (GD)',
    categoryEn: 'Threats & Police General Diary',
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
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
      statuteBn: 'দণ্ডবিধি, ১৮৬০ (ধারা ৫০৩, ৫০৬ ও ৫০৭) এবং পুলিশ আইন, ১৮৬১ (ধারা ৪৪)',
      statuteEn: 'Penal Code, 1860 (Sec 503, 506, 507) & Police Act, 1861 (Sec 44)',
      missingInfoBn: 'যে ফোন নম্বর থেকে হুমকি দেওয়া হয়েছে, কল রেকর্ড/এসএমএসের স্ক্রিনশট এবং নিকটবর্তী থানার নাম।',
      missingInfoEn: 'Phone numbers used for threats, call recordings/SMS screenshots, and local police station name.',
    },
    step2: {
      plainMeaningBn: 'যেকোনো হুমকি পাওয়ার সাথে সাথে নিকটবর্তী থানায় সাধারণ ডায়েরি (GD) করা আপনার নাগরিক অধিকার। জিডি ভবিষ্যতে আদালতে প্রাথমিক প্রমাণ হিসেবে গণ্য হয় এবং পুলিশ তদন্তের নির্দেশ চাইতে পারে।',
      plainMeaningEn: 'Filing a General Diary (GD) at your local police station is your fundamental right. A GD records the incident officially and enables police to seek magisterial inquiry orders.',
      lawTitleBn: 'দণ্ডবিধি, ১৮৬০ · ধারা ৫০৬ ও ৫০৭',
      lawTitleEn: 'The Penal Code, 1860 · Section 506 & 507',
      quoteBn: '“যে ব্যক্তি অপরাধমূলক ভীতি প্রদর্শন করে, সেই ব্যক্তি কারাদণ্ডে অথবা অর্থদণ্ডে কিংবা উভয় দণ্ডেই দণ্ডিত হইবে।”',
      quoteEn: '"Whoever commits the offence of criminal intimidation shall be punished with imprisonment... or with fine, or with both."',
      bdlawsUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3269.html',
      rightsBn: [
        'নিকটস্থ থানায় ২৪ ঘণ্টা জিডি এন্ট্রি করার আইনসংগত অধিকার।',
        'জরুরি বিপদে তাৎক্ষণিক জাতীয় জরুরি সেবা ৯৯৯-এ পুলিশ সহায়তা পাওয়ার সুযোগ।',
        'ম্যাজিস্ট্রেটের অনুমতি সাপেক্ষে পুলিশের তদন্ত ও সুরক্ষামূলক ব্যবস্থা নেওয়ার অধিকার।',
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
          titleBn: '১. হুমকিদাতার ফোন নম্বর, কলের তারিখ ও সুনির্দিষ্ট সময় ডায়রিতে নোট করুন।',
          titleEn: '1. Note exact date, timestamp, and phone numbers of the threatening calls.',
          metaBn: 'দালিলিক প্রমাণ · অডিও/এসএমএস ব্যাকআপ',
          metaEn: 'Evidence · Call audio/SMS backup',
        },
        {
          id: 'gd-2',
          titleBn: '২. কলের ভয়েস রেকর্ডিং বা মেসেজের স্ক্রিনশট একাধিক ডিভাইসে সুরক্ষিত রাখুন।',
          titleEn: '2. Backup call audio and SMS screenshots securely across multiple devices.',
          metaBn: 'সাইবার প্রমাণ সংরক্ষণ',
          metaEn: 'Digital Proof Preservation',
        },
        {
          id: 'gd-3',
          titleBn: '৩. নিকটবর্তী থানার ভারপ্রাপ্ত কর্মকর্তা (OC) বরাবর লিখিত সাধারণ ডায়েরি দাখিল করুন।',
          titleEn: '3. Submit formal GD application to Officer-in-Charge (OC) of local Thana.',
          metaBn: 'জরুরি সেবা: ৯৯৯',
          metaEn: 'Police Emergency: 999',
        },
      ],
    },
    step4: {
      calloutBn: 'আপনি কি থানার ভারপ্রাপ্ত কর্মকর্তা (OC) বরাবর একটি প্রমিত সাধারণ ডায়েরি (GD) খসড়া তৈরি করতে চান?',
      calloutEn: 'Would you like to generate a standardized General Diary (GD) draft addressed to the Thana OC?',
      toBn: 'বরাবর: অফিসার ইনচার্জ (OC), [থানার নাম] থানা, [জেলার নাম]',
      toEn: 'To: Officer-in-Charge (OC), [Police Station Name] Thana, [District]',
      subjectBn: 'বিষয়: নিরাপত্তা শঙ্কা ও অপরাধমূলক হুমকির বিষয়ে সাধারণ ডায়েরি (GD) করার আবেদন।',
      subjectEn: 'Subject: Application for Entry of General Diary regarding Criminal Intimidation.',
      previewTextBn: 'বিনীত নিবেদন এই যে, আমি [আবেদনকারীর নাম]। গত [তারিখ] তারিখে আনুমানিক [সময়] ঘটিকায় অজ্ঞাত ব্যক্তি হইতে হুমকি প্রদান করা হয়...',
      previewTextEn: 'I respectfully state that I am [Applicant Name]. On [Date] at approximately [Time], threats of bodily harm were made...',
      requiredDetailsBn: 'খসড়া নিখুঁত করতে: থানার নাম, আপনার জাতীয় পরিচয়পত্র নম্বর এবং হুমকি আসার তারিখ-সময়।',
      requiredDetailsEn: 'To finalize draft: Thana name, your NID number, and date/time of incident.',
      draftPath: '/drafts',
    },
  },
  {
    id: 'property',
    categoryBn: 'জমি দখল ও জাল দলিল',
    categoryEn: 'Land Dispossession & Forged Deeds',
    icon: <Home className="h-3.5 w-3.5" />,
    lawBadgeBn: 'ভূমি অপরাধ প্রতিরোধ আইন ২০২৩',
    lawBadgeEn: 'Land Crime Act 2023 Verified',
    caseRef: '#BD-2026-LAND-03',
    userQueryBn: 'আমার পৈতৃক জমি জাল দলিল বানিয়ে দখলের চেষ্টা করছে। নতুন ভূমি আইনে কী ব্যবস্থা নেব?',
    userQueryEn: 'Someone forged a deed and is attempting to dispossess me of ancestral land. What can I do under the new Land Crime Act?',
    step1: {
      analysisBn: 'বৈধ মালিকানা ও দখল থাকা সত্ত্বেও জাল দলিল প্রস্তুত ও জবরদখল ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ অনুযায়ী অজামিনযোগ্য ফৌজদারি অপরাধ। পাশাপাশি স্বত্ব ঘোষণার দেওয়ানি প্রতিকার রয়েছে।',
      analysisEn: 'Attempting to grab land using fabricated deeds is a severe criminal offense under Land Crime Act 2023, coupled with civil remedies under Specific Relief Act.',
      identifiedIssueBn: 'জাল দলিল প্রস্তুত ও অবৈধ ভূমি দখল',
      identifiedIssueEn: 'Forged Deed Creation & Unlawful Land Dispossession',
      statuteBn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩ (ধারা ৪ ও ৭) এবং সুনির্দিষ্ট প্রতিকার আইন, ১৮৭৭ (ধারা ৯)',
      statuteEn: 'Land Crime Prevention Act, 2023 (Sec 4 & 7) & Specific Relief Act, 1877 (Sec 9)',
      missingInfoBn: 'জমির খতিয়ান নম্বর (CS/SA/RS/BS), মৌজা এবং অভিযুক্ত ব্যক্তি কোনো ভুয়া দলিল উপস্থাপন করেছে কি না।',
      missingInfoEn: 'Khatian number (CS/SA/RS/BS), mouza, and details of the fraudulent deed.',
    },
    step2: {
      plainMeaningBn: 'নতুন আইন অনুযায়ী বৈধ স্বত্ব ছাড়া জমি দখল করা শাস্তিযোগ্য ফৌজদারি অপরাধ। জাল দলিল তৈরি করলে সর্বোচ্চ ৭ বছরের কারাদণ্ড ও অর্থদণ্ড হতে পারে। তাৎক্ষণিক সহকারী কমিশনার (ভূমি) ও নির্বাহী ম্যাজিস্ট্রেট আদালতে আবেদন করা যায়।',
      plainMeaningEn: 'Under the 2023 Act, land grabbing without lawful title carries up to 7 years imprisonment. Aggrieved owners can file before Executive Magistrates and AC (Land).',
      lawTitleBn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩ · ধারা ৪',
      lawTitleEn: 'Land Crime Prevention & Redress Act, 2023 · Section 4',
      quoteBn: '“কোনো ব্যক্তি প্রতারণার উদ্দেশ্যে কোনো জাল দলিল প্রস্তুত করিলে তিনি অনধিক ৭ বৎসর কারাদণ্ডে এবং অর্থদণ্ডে দণ্ডিত হইবেন।”',
      quoteEn: '"Whoever prepares any forged document with fraudulent intent shall be punished with imprisonment up to 7 years and fine."',
      bdlawsUrl: 'https://bdlaws.minlaw.gov.bd/act-1454/section-54641.html',
      rightsBn: [
        'ভূমি অপরাধ প্রতিরোধ আইনে সরাসরি ফৌজদারি মামলা দায়েরের অধিকার।',
        'দখলচ্যুত হওয়ার ৬ মাসের মধ্যে সুনির্দিষ্ট প্রতিকার আইনের ৯ ধারায় দ্রুত দখল পুনরুদ্ধারের মামলা।',
        'সহকারী কমিশনার (ভূমি) বরাবর মিস কেস দাখিল করে রেকর্ড সংশোধনের সুযোগ।',
      ],
      rightsEn: [
        'Right to file criminal complaint under Land Crime Prevention Act 2023.',
        'Right to summary repossession within 6 months under Specific Relief Act Section 9.',
        'Right to file mutation correction before AC (Land).',
      ],
    },
    step3: {
      checklists: [
        {
          id: 'land-1',
          titleBn: '১. পৈতৃক ওয়ারিশান সনদ, বায়া দলিল এবং হালনাগাদ আরএস/বিএস খতিয়ান সংগ্রহ করুন।',
          titleEn: '1. Collect inheritance certificate, mother deeds, and certified RS/BS khatian copies.',
          metaBn: 'মৌলিক মালিকানা প্রমাণ',
          metaEn: 'Fundamental Title Deeds',
        },
        {
          id: 'land-2',
          titleBn: '২. ইউনিয়ন ভূমি অফিসে গিয়ে হালনাগাদ ভূমি উন্নয়ন কর (খাজনা) পরিশোধের দাখিলা নিন।',
          titleEn: '2. Pay updated land development tax at Union Land Office and secure rent dakhila.',
          metaBn: 'খাজনা দাখিলা · সরকারি প্রমাণ',
          metaEn: 'Land Tax Receipt',
        },
        {
          id: 'land-3',
          titleBn: '৩. ফৌজদারি কার্যবিধির ১৪৫ ধারা অনুযায়ী নির্বাহী ম্যাজিস্ট্রেট আদালতে শান্তি রক্ষার আবেদন করুন।',
          titleEn: '3. File Section 145 CrPC application before Executive Magistrate Court to prevent breach of peace.',
          metaBn: 'ম্যাজিস্ট্রেট আদালত · CrPC 145',
          metaEn: 'Magistrate Court · CrPC 145',
        },
      ],
    },
    step4: {
      calloutBn: 'আপনি কি সহকারী কমিশনার (ভূমি) বা নির্বাহী ম্যাজিস্ট্রেট বরাবর আনুষ্ঠানিক অভিযোগের খসড়া প্রস্তুত করতে চান?',
      calloutEn: 'Would you like to draft a formal complaint petition to the Executive Magistrate or AC (Land)?',
      toBn: 'বরাবর: বিজ্ঞ নির্বাহী ম্যাজিস্ট্রেট, আদালত, [জেলার নাম]',
      toEn: 'To: The Court of Learned Executive Magistrate, [District Name]',
      subjectBn: 'বিষয়: ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ অনুযায়ী জাল দলিল রোধ ও বেদখল প্রতিরোধে আবেদন।',
      subjectEn: 'Subject: Petition under Land Crime Prevention Act 2023 for Preventing Fraudulent Dispossession.',
      previewTextBn: 'বিনীত নিবেদন এই যে, তফসিল বর্ণিত জমি আমি বৈধ ওয়ারিশ সূত্রে ভোগদখল করিয়া আসিতেছি। বিবাদী অবৈধ জাল দলিল সৃজন করিয়া বেদখলের হুমকি দিতেছে...',
      previewTextEn: 'I respectfully submit that I have lawful title and peaceful possession of the scheduled property. Opposite party is threatening illegal entry...',
      requiredDetailsBn: 'খসড়া চূড়ান্ত করতে: মৌজা, খতিয়ান, দাগ নম্বর, চৌহদ্দি এবং জমির পরিমাণ।',
      requiredDetailsEn: 'To finalize draft: Mouza, khatian, dag number, boundaries, and land quantum.',
      draftPath: '/drafts',
    },
  },
  {
    id: 'consumer',
    categoryBn: 'ভোক্তা অধিকার ও প্রতারণা',
    categoryEn: 'Consumer Rights & Fraud',
    icon: <ShoppingBag className="h-3.5 w-3.5" />,
    lawBadgeBn: 'ভোক্তা অধিকার আইন ২০০৯',
    lawBadgeEn: 'Consumer Rights Act 2009',
    caseRef: '#BD-2026-DNCRP-04',
    userQueryBn: 'দোকানদার আমাকে মেয়াদোত্তীর্ণ পণ্য বিক্রি করেছে এবং টাকা ফেরত দিচ্ছে না। কোন আইনে প্রতিকার পাব?',
    userQueryEn: 'The store sold me expired products and refuses a refund. What remedy do I have under consumer protection laws?',
    step1: {
      analysisBn: 'মেয়াদোত্তীর্ণ বা ভেজাল পণ্য বিক্রয় ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯ অনুযায়ী দণ্ডনীয় অপরাধ। ঘটনার ৩০ দিনের মধ্যে লিখিত অভিযোগ দাখিল করলে জরিমানা আদায়ের পাশাপাশি অভিযোগকারী ক্ষতিপূরণ লাভ করেন।',
      analysisEn: 'Selling expired or adulterated goods is a strict statutory offense under Consumers’ Right Protection Act 2009. Complaints filed within 30 days are entitled to statutory rewards.',
      identifiedIssueBn: 'মেয়াদোত্তীর্ণ পণ্য বিক্রয় ও ভোক্তা অধিকার লঙ্ঘন',
      identifiedIssueEn: 'Sale of Expired Goods & Consumer Protection Violation',
      statuteBn: 'ভোক্তা অধিকার সংরক্ষণ আইন, ২০০৯ (ধারা ৫১, ৬০ ও ৭৬)',
      statuteEn: 'Consumers’ Right Protection Act, 2009 (Sec 51, 60, & 76)',
      missingInfoBn: 'ক্রয়রসিদ (Cash Memo), পণ্যের মোড়কে ব্যাচ নম্বর ও মেয়াদের ছবি এবং দোকানের সুনির্দিষ্ট নাম-ঠিকানা।',
      missingInfoEn: 'Purchase cash memo, high-resolution photo of expiry date & batch, and exact shop address.',
    },
    step2: {
      plainMeaningBn: 'ভোক্তা অধিকার আইনে ক্রেতাকে প্রতারণা করলে বিক্রেতাকে সর্বোচ্চ ১ বছরের কারাদণ্ড বা ৫০,০০০ টাকা জরিমানা করা যায়। সবচেয়ে গুরুত্বপূর্ণ: আদায়কৃত জরিমানার ২৫% অর্থ তাৎক্ষণিক অভিযোগকারী ভোক্তাকে দেওয়া হয়!',
      plainMeaningEn: 'Under Section 51, selling expired goods carries up to 1 year imprisonment or 50,000 BDT fine. Crucially, under Section 76(4), the consumer directly receives 25% of any fine collected!',
      lawTitleBn: 'ভোক্তা অধিকার সংরক্ষণ আইন, ২০০৯ · ধারা ৫১ ও ৭৬(৪)',
      lawTitleEn: 'Consumers’ Right Protection Act, 2009 · Section 51 & 76(4)',
      quoteBn: '“আদায়কৃত অর্থ হইতে পঁচিশ শতাংশ অর্থ তাৎক্ষণিকভাবে অভিযোগকারীকে প্রদান করিতে হইবে।”',
      quoteEn: '"Twenty-five percent of the collected fine shall immediately be disbursed to the complainant."',
      bdlawsUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-31890.html',
      rightsBn: [
        'সম্পূর্ণ টাকা ফেরত বা সঠিক পণ্য বুঝে পাওয়ার আইনসংগত অধিকার।',
        'জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তরে (DNCRP) ৩০ দিনের মধ্যে অভিযোগের অধিকার।',
        'আদায়কৃত সরকারি জরিমানার ২৫% নগদ পুরস্কার হিসেবে পাওয়ার আইনি বিধান।',
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
          titleBn: '১. ক্রয়রসিদ (Cash Memo) বা লেনদেনের ডিজিটাল প্রুফ যত্নসহকারে সংরক্ষণ করুন।',
          titleEn: '1. Preserve purchase receipt, invoice, or digital transaction voucher.',
          metaBn: 'আবশ্যিক প্রমাণ · ৩০ দিনের তামাদি',
          metaEn: 'Mandatory Proof · 30-day limit',
        },
        {
          id: 'consumer-2',
          titleBn: '২. পণ্যের গায়ে মুদ্রিত ব্যাচ নম্বর, মূল্য ও মেয়াদোত্তীর্ণের তারিখের স্পষ্ট ছবি তুলুন।',
          titleEn: '2. Take clear high-resolution photos of batch number, MRP, and expiry date.',
          metaBn: 'ফটোগ্রাফিক প্রমাণ',
          metaEn: 'Product Photo Evidence',
        },
        {
          id: 'consumer-3',
          titleBn: '৩. জাতীয় ভোক্তা অধিকার হটলাইন ১৬১২১-এ কল করে অথবা লিখিত আকারে DNCRP-এ জমা দিন।',
          titleEn: '3. Call National Consumer Helpline 16121 or lodge a formal petition with DNCRP.',
          metaBn: 'ভোক্তা হটলাইন: ১৬১২১',
          metaEn: 'DNCRP Helpline: 16121',
        },
      ],
    },
    step4: {
      calloutBn: 'আপনি কি জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তর (DNCRP) বরাবর আনুষ্ঠানিক অভিযোগ খসড়া তৈরি করতে চান?',
      calloutEn: 'Would you like to draft a formal complaint petition addressed to the Director General of DNCRP?',
      toBn: 'বরাবর: মহাপরিচালক, জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তর (DNCRP)',
      toEn: 'To: Director General, Directorate of National Consumers’ Right Protection (DNCRP)',
      subjectBn: 'বিষয়: ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯ অনুযায়ী মেয়াদোত্তীর্ণ পণ্য বিক্রয়ের প্রতিকার চেয়ে আবেদন।',
      subjectEn: 'Subject: Formal Complaint under Consumers’ Right Protection Act 2009 regarding Sale of Expired Goods.',
      previewTextBn: 'বিনীত নিবেদন এই যে, আমি [ভোক্তার নাম]। গত [তারিখ] তারিখে [দোকানের নাম] হইতে ক্রয়কৃত পণ্যটি মেয়াদোত্তীর্ণ প্রমাণিত হয়...',
      previewTextEn: 'I respectfully submit that I am [Consumer Name]. On [Date], I purchased product from [Store Name] which was past expiration date...',
      requiredDetailsBn: 'খসড়া চূড়ান্ত করতে: দোকানের নাম ও পূর্ণ ঠিকানা, পণ্যের নাম, দাম ও ক্রয়ের তারিখ।',
      requiredDetailsEn: 'To finalize draft: Store name and address, product brand, purchase price, and date.',
      draftPath: '/drafts',
    },
  },
];

export function CasePreview() {
  const { lang, t } = useApp();
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('labour');
  const [activeTab, setActiveTab] = useState<CaseStepTab>('step1');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    'labour-1': true,
  });

  const currentScenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  const toggleStep = (id: string) => {
    setCompletedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const stepsList: { id: CaseStepTab; stepNum: string; label: string; icon: React.ReactNode }[] = [
    {
      id: 'step1',
      stepNum: t('১', '1'),
      label: t('সমস্যা অনুধাবন', 'Understand Problem'),
      icon: <Sparkles className="h-3.5 w-3.5" />,
    },
    {
      id: 'step2',
      stepNum: t('২', '2'),
      label: t('সহজ ব্যাখ্যা ও উৎস', 'Plain Explanation'),
      icon: <BookOpen className="h-3.5 w-3.5" />,
    },
    {
      id: 'step3',
      stepNum: t('৩', '3'),
      label: t('অ্যাকশন চেকলিস্ট', 'Action Checklist'),
      icon: <ListOrdered className="h-3.5 w-3.5" />,
    },
    {
      id: 'step4',
      stepNum: t('৪', '4'),
      label: t('আনুষ্ঠানিক খসড়া', 'Formal Draft'),
      icon: <FileText className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <div className="relative rounded-3xl border border-border-light bg-surface-cardLight p-2.5 sm:p-4 shadow-xl transition-all">
      {/* Top Scenario Switcher Pills */}
      <div className="border-b border-border-light/80 pb-2.5 mb-2 px-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold text-secondary-light uppercase font-cinzel tracking-wider">
            {t('বাস্তব আইনি পরিস্থিতি বেছে নিন:', 'Select Real Legal Scenario:')}
          </span>
          <span className="text-[10px] text-accent-light font-semibold font-hind">
            {t('৪টি ভিন্ন ভিন্ন আইনের উদাহরণ', '4 Live Tested Scenarios')}
          </span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {SCENARIOS.map((sc) => {
            const isSelected = sc.id === selectedScenarioId;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  setSelectedScenarioId(sc.id);
                  setActiveTab('step1');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-accent-light text-white shadow-xs font-bold'
                    : 'bg-surface-light border border-border-light/80 text-secondary-light hover:text-primary-light hover:border-accent-light/50'
                }`}
              >
                {sc.icon}
                <span className="font-anek">{lang === 'bn' ? sc.categoryBn : sc.categoryEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Folder Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-border-light/80 px-3.5 py-2.5 bg-bg-light/70 rounded-t-2xl gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent-light inline-block shadow-sm animate-pulse" />
          <span className="font-cinzel text-xs font-bold tracking-wider text-secondary-light">
            {currentScenario.caseRef}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-accent-light font-bold bg-accent-light/10 px-2.5 py-0.5 rounded-full border border-accent-light/20">
          <ShieldCheck className="h-3 w-3 text-accent-light" />
          <span>{lang === 'bn' ? currentScenario.lawBadgeBn : currentScenario.lawBadgeEn}</span>
        </div>
      </div>

      {/* Case Situation Banner */}
      <div className="px-3.5 py-2.5 bg-accent-light/5 border-b border-border-light/60">
        <p className="text-xs text-secondary-light font-sans leading-relaxed">
          <span className="font-bold text-primary-light font-anek">
            {t('বর্ণিত সমস্যা: ', 'User Description: ')}
          </span>
          &ldquo;{lang === 'bn' ? currentScenario.userQueryBn : currentScenario.userQueryEn}&rdquo;
        </p>
      </div>

      {/* 4-Step Interactive Tab Stepper */}
      <div className="flex items-center overflow-x-auto no-scrollbar border-b border-border-light/80 bg-surface-light sm:grid sm:grid-cols-4 p-1 gap-1">
        {stepsList.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-xl transition-all cursor-pointer shrink-0 active-press ${
                isActive
                  ? 'border border-accent-light/40 text-accent-light bg-accent-light/10 font-bold shadow-2xs'
                  : 'text-secondary-light hover:text-primary-light hover:bg-bg-light/40'
              }`}
            >
              <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${
                isActive ? 'bg-accent-light text-white' : 'bg-border-light text-secondary-light'
              }`}>
                {tab.stepNum}
              </span>
              <span className="font-anek whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Step Body */}
      <div className="p-4 sm:p-5 min-h-[350px] flex flex-col justify-between">
        {/* STEP 1: UNDERSTAND THE PROBLEM */}
        {activeTab === 'step1' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-border-light/60 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold font-anek text-primary-light">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-light text-white text-[11px]">১</span>
                <span>{t('ধাপ ১: সমস্যার গভীর অনুধাবন ও মূল বিষয় শনাক্তকরণ', 'Step 1: Understand Problem & Identify Issue')}</span>
              </div>
              <span className="text-[11px] text-accent-light font-cinzel font-bold">
                {t('AI বিশ্লেষণ', 'AI ANALYSIS')}
              </span>
            </div>

            {/* AI Understanding Narrative */}
            <div className="p-3.5 rounded-2xl bg-bg-light/70 border border-border-light space-y-1.5">
              <span className="text-[11px] font-bold font-anek text-secondary-light uppercase tracking-wider block">
                {t('AI যেভাবে ঘটনাটি বিশ্লেষণ করেছে:', 'How AI understands your story:')}
              </span>
              <p className="text-xs text-primary-light font-hind leading-relaxed">
                {lang === 'bn' ? currentScenario.step1.analysisBn : currentScenario.step1.analysisEn}
              </p>
            </div>

            {/* Identified Issue Badge */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-accent-light/10 border border-accent-light/20 text-xs text-primary-light">
              <Shield className="h-4 w-4 text-accent-light shrink-0" />
              <div>
                <span className="font-bold font-anek text-accent-light block">
                  {t('শনাক্তকৃত মূল আইনি বিষয়:', 'Identified Legal Issue:')}
                </span>
                <span className="font-hind text-[11px] text-secondary-light">
                  {lang === 'bn' ? currentScenario.step1.identifiedIssueBn : currentScenario.step1.identifiedIssueEn} · {lang === 'bn' ? currentScenario.step1.statuteBn : currentScenario.step1.statuteEn}
                </span>
              </div>
            </div>

            {/* Missing details check */}
            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold font-anek">
                <HelpCircle className="h-3.5 w-3.5 text-amber-700" />
                <span>{t('প্রয়োজনীয় অতিরিক্ত তথ্যের অনুসন্ধান:', 'Additional Information Needed:')}</span>
              </div>
              <p className="text-[11px] text-amber-800 font-hind leading-relaxed">
                {lang === 'bn' ? currentScenario.step1.missingInfoBn : currentScenario.step1.missingInfoEn}
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: EXPLAIN THE SITUATION IN SIMPLE LANGUAGE */}
        {activeTab === 'step2' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-border-light/60 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold font-anek text-primary-light">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-light text-white text-[11px]">২</span>
                <span>{t('ধাপ ২: সহজ ভাষায় পরিস্থিতি ও অধিকারের ব্যাখ্যা', 'Step 2: Plain Language Explanation & Sources')}</span>
              </div>
              <span className="text-[11px] text-accent-light font-cinzel font-bold">
                {t('আইনি উৎস ও অধিকার', 'RIGHTS & SOURCES')}
              </span>
            </div>

            {/* Plain explanation */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold font-anek text-primary-light">
                {t('সহজ ভাষায় আপনার পরিস্থিতি ও অধিকার:', 'What this means in plain language:')}
              </h4>
              <p className="text-xs text-secondary-light font-hind leading-relaxed">
                {lang === 'bn' ? currentScenario.step2.plainMeaningBn : currentScenario.step2.plainMeaningEn}
              </p>
            </div>

            {/* Statutory Source with Verbatim Quote & Link */}
            <div className="p-3.5 rounded-2xl bg-bg-light/80 border border-border-light space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold font-display text-primary-light">
                  {lang === 'bn' ? currentScenario.step2.lawTitleBn : currentScenario.step2.lawTitleEn}
                </div>
                <a
                  href={currentScenario.step2.bdlawsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-cinzel text-accent-light hover:underline font-bold"
                >
                  <span>BDLAWS</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-cardLight border-l-4 border-accent-light text-xs font-sans text-primary-light leading-relaxed">
                {lang === 'bn' ? currentScenario.step2.quoteBn : currentScenario.step2.quoteEn}
              </div>
            </div>

            {/* Statutory Rights & Options */}
            <div className="space-y-1 text-xs">
              <span className="font-bold font-anek text-primary-light block">
                {t('আপনার আইনি অধিকার ও বিকল্পসমূহ:', 'Your statutory rights and options:')}
              </span>
              <ul className="space-y-1 text-[11px] text-secondary-light font-hind list-disc list-inside">
                {(lang === 'bn' ? currentScenario.step2.rightsBn : currentScenario.step2.rightsEn).map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* STEP 3: STEP-BY-STEP ACTION CHECKLIST */}
        {activeTab === 'step3' && (
          <div className="space-y-3.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-border-light/60 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold font-anek text-primary-light">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-light text-white text-[11px]">৩</span>
                <span>{t('ধাপ ৩: ধাপে ধাপে বাস্তবসম্মত অ্যাকশন চেকলিস্ট', 'Step 3: Ordered Action Checklist')}</span>
              </div>
              <span className="text-[11px] text-accent-light font-cinzel font-bold">
                {Object.keys(completedSteps).filter((k) => completedSteps[k] && k.startsWith(currentScenario.id)).length} / {currentScenario.step3.checklists.length} {t('সম্পন্ন', 'DONE')}
              </span>
            </div>

            {/* Checklist items */}
            <div className="space-y-2">
              {currentScenario.step3.checklists.map((item) => {
                const isChecked = !!completedSteps[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleStep(item.id)}
                    className={`flex items-start gap-3 p-2.5 sm:p-3 rounded-xl border transition-colors cursor-pointer ${
                      isChecked
                        ? 'bg-accent-light/10 border-accent-light/30'
                        : 'bg-bg-light/60 border-border-light hover:border-accent-light/40'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleStep(item.id)}
                      className="mt-0.5 h-4 w-4 rounded accent-accent-light cursor-pointer"
                    />
                    <div className="flex-1 text-xs space-y-0.5">
                      <p className={isChecked ? 'line-through opacity-75' : 'font-medium font-hind'}>
                        {lang === 'bn' ? item.titleBn : item.titleEn}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-secondary-light">
                        <span className="bg-surface-light px-1.5 py-0.5 rounded border border-border-light">
                          {lang === 'bn' ? item.metaBn : item.metaEn}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Checklist Completion Banner if all items checked */}
            {currentScenario.step3.checklists.every((item) => completedSteps[item.id]) && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 font-hind animate-in fade-in duration-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">
                  {t(
                    'চমৎকার! এই বিষয়ের প্রাথমিক করণীয় ও প্রমাণ সংগ্রহের ধাপগুলো সম্পন্ন হয়েছে। এবার পরবর্তী ধাপে গিয়ে অভিযোগের আনুষ্ঠানিক খসড়া তৈরি করুন।',
                    'Great! All preparatory and evidence-gathering steps are marked complete. Proceed to Step 4 to prepare the formal draft.'
                  )}
                </span>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: OFFER TO PREPARE A FORMAL DRAFT */}
        {activeTab === 'step4' && (
          <div className="space-y-3.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-border-light/60 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold font-anek text-primary-light">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-light text-white text-[11px]">৪</span>
                <span>{t('ধাপ ৪: আনুষ্ঠানিক খসড়া প্রস্তুতের প্রস্তাব', 'Step 4: Formal Draft Preparation Offer')}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-accent-light/10 text-accent-light border border-accent-light/20 font-cinzel">
                A4 PDF READY
              </span>
            </div>

            {/* Offer Callout */}
            <div className="p-3 rounded-xl bg-accent-light/10 border border-accent-light/20 text-xs font-bold text-accent-light font-anek">
              &ldquo;{lang === 'bn' ? currentScenario.step4.calloutBn : currentScenario.step4.calloutEn}&rdquo;
            </div>

            {/* Snippet of document */}
            <div className="p-3.5 rounded-xl bg-bg-light/90 border border-border-light text-[11px] font-mono space-y-1.5 leading-relaxed shadow-xs">
              <p className="text-secondary-light">
                {lang === 'bn' ? currentScenario.step4.toBn : currentScenario.step4.toEn}
              </p>
              <p className="font-semibold text-primary-light">
                {lang === 'bn' ? currentScenario.step4.subjectBn : currentScenario.step4.subjectEn}
              </p>
              <p className="text-secondary-light text-[10px]">
                {lang === 'bn' ? currentScenario.step4.previewTextBn : currentScenario.step4.previewTextEn}
              </p>
            </div>

            {/* Missing details note */}
            <div className="p-2.5 rounded-xl bg-surface-light border border-border-light text-[11px] font-hind text-secondary-light">
              <span className="font-bold text-primary-light">
                {t('খসড়া নিখুঁত করতে প্রয়োজনীয় তথ্য: ', 'Details needed to prepare draft: ')}
              </span>
              <span>{lang === 'bn' ? currentScenario.step4.requiredDetailsBn : currentScenario.step4.requiredDetailsEn}</span>
            </div>
          </div>
        )}

        {/* Stepper Footer Action */}
        <div className="mt-4 pt-3 border-t border-border-light/70 flex flex-wrap items-center justify-between gap-2">
          {/* Next / Previous step controls */}
          <div className="flex items-center gap-2">
            {activeTab !== 'step1' && (
              <button
                type="button"
                onClick={() => {
                  if (activeTab === 'step4') setActiveTab('step3');
                  else if (activeTab === 'step3') setActiveTab('step2');
                  else if (activeTab === 'step2') setActiveTab('step1');
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border-light bg-surface-light hover:bg-bg-light text-secondary-light text-xs font-semibold font-anek transition-all cursor-pointer"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>{t('পূর্ববর্তী ধাপ', 'Previous')}</span>
              </button>
            )}

            {activeTab !== 'step4' ? (
              <button
                type="button"
                onClick={() => {
                  if (activeTab === 'step1') setActiveTab('step2');
                  else if (activeTab === 'step2') setActiveTab('step3');
                  else if (activeTab === 'step3') setActiveTab('step4');
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent-light/10 hover:bg-accent-light/20 text-accent-light text-xs font-semibold font-anek transition-all cursor-pointer"
              >
                <span>{t('পরবর্তী ধাপ দেখুন', 'Next Step')}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <Link
                href="/drafts"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-light text-white text-xs font-semibold font-anek hover:opacity-90 transition-all shadow-2xs"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>{t('খসড়া এডিটর খুলুন', 'Open Draft Editor')}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          <Link
            href={`/ask?prompt=${encodeURIComponent(currentScenario.userQueryBn)}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-light hover:underline font-cinzel tracking-wider"
          >
            <span>{t('আপনার প্রশ্ন নিয়ে পরীক্ষা করুন', 'TRY YOUR INQUIRY')}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
