import fs from 'fs';
import crypto from 'crypto';

function computeHash(p) {
  const payload = [
    p.id,
    p.actId,
    p.sectionNumber,
    p.originalText,
    p.originalLanguage,
    p.plainExplanation?.bn,
    p.plainExplanation?.en,
    p.caution?.bn,
    p.caution?.en,
    p.sourceUrl,
    p.effectiveDate,
    p.legalStatus,
  ].join('|');
  return crypto.createHash('sha256').update(payload, 'utf8').digest('hex');
}

const provs = JSON.parse(fs.readFileSync('src/data/corpus/provisions.json', 'utf8'));

// 1. Correct land-crime-13 and add land-crime-19
const s13 = provs.find(p => p.id === 'land-crime-13');
if (s13) {
  s13.sectionNumber = 'Section 13';
  s13.title = {
    bn: 'কৃষিজমির উপরি-স্তর কর্তন ও অনুমতিবিহীন মাটি ভরাট নিষিদ্ধ (ধারা ১৩)',
    en: 'Prohibition on Cutting Topsoil of Agricultural Land and Unauthorized Land Filling (Section 13)'
  };
  s13.originalText = '১৩। যদি কোনো ব্যক্তি জেলা প্রশাসকের অনুমতি ব্যতিরেকে আবাদযোগ্য বা কর্ষণীয় জমির উপরি-স্তর কর্তন করেন অথবা জমির রেকর্ডীয় মালিকের বিনা অনুমতিতে জমিতে বালু বা মাটি দ্বারা ভরাট করেন, তাহা হইলে তাহার অনুরূপ কার্য হইবে একটি অপরাধ, এবং তজ্জন্য তিনি অনধিক ২ (দুই) বৎসর কারাদণ্ড ও অর্থদণ্ডে দণ্ডনীয় হইবেন: তবে শর্ত থাকে যে, কোনো ব্যক্তি তাহার বসতবাড়ি নির্মাণ বা স্বীয় প্রয়োজনে স্বীয় মালিকানাধীন ভূমি হইতে সীমিত পরিসরে, জমির ঊর্বরতার ক্ষতিসাধন না করিয়া, ভূমি কর্তন বা উত্তোলন করিলে উহা এই ধারার অধীন অপরাধ বলিয়া গণ্য হইবে না।';
  s13.plainExplanation = {
    bn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩-এর ১৩ ধারা অনুযায়ী জেলা প্রশাসকের (ডিসি) পূর্বানুমতি ছাড়া আবাদযোগ্য কৃষিজমির উর্বর উপরি-স্তর (টপসয়েল) কেটে নেওয়া এবং জমির রেকর্ডীয় মালিকের অনুমতি ছাড়া জমিতে বালু বা মাটি ভরাট করা শাস্তিযোগ্য অপরাধ (সর্বোচ্চ ২ বছর কারাদণ্ড ও অর্থদণ্ড)। তবে শর্ত থাকে যে, কোনো ব্যক্তি বসতবাড়ি নির্মাণ বা ব্যক্তিগত প্রয়োজনে নিজের জমি থেকে সীমিত মাত্রায় জমির উর্বরতা নষ্ট না করে মাটি কাটার ক্ষেত্রে এই নিষেধাজ্ঞা প্রযোজ্য নয়।',
    en: 'Under Section 13 of the Land Crime Prevention and Redress Act 2023, cutting the topsoil of cultivable land without District Commissioner permission, or filling land with sand/soil without the recorded owner\'s permission, is punishable by up to 2 years imprisonment and fine. It strictly exempts limited excavation on private land solely for constructing personal dwellings without damaging soil fertility.'
  };
  s13.caution = {
    bn: 'ধারা ১৯(১) অনুযায়ী এই অপরাধ আমলযোগ্য (cognizable), তবে জামিনযোগ্য (bailable) ও আপোষযোগ্য (compoundable)। কেবলমাত্র ধারা ৪ ও ৫ এর অপরাধ অ-জামিনযোগ্য।',
    en: 'Under Section 19(1), offenses under Section 13 are cognizable, bailable, and compoundable. Only Sections 4 and 5 are non-bailable under this Act.'
  };
  s13.sourceUrl = 'https://bdlaws.minlaw.gov.bd/act-1454/section-52391.html';
  s13.reviewStatus = 'auto_checked';
  s13.contentHash = computeHash(s13);
}

// Add land-crime-19 if not present
let s19 = provs.find(p => p.id === 'land-crime-19');
if (!s19) {
  s19 = {
    id: 'land-crime-19',
    actId: 'act_land_crime_2023',
    sectionNumber: 'Section 19',
    categories: ['land', 'threats'],
    title: {
      bn: 'ভূমি অপরাধের আমলযোগ্যতা, জামিন ও আপোষযোগ্যতা (ধারা ১৯)',
      en: 'Cognizability, Bailability, and Compounding of Land Crimes (Section 19)'
    },
    originalText: '১৯। (১) এই আইনের অধীন অপরাধসমূহ, আমলযোগ্য (cognizable), ধারা ৪ ও ৫ এ বর্ণিত অপরাধ অ-জামিনযোগ্য (non-bailable), অন্যান্য ধারায় বর্ণিত অপরাধ জামিনযোগ্য এবং আপোষযোগ্য (compoundable) হইবে। (২) এই আইনের অন্যান্য বিধানাবলি সাপেক্ষে, এই আইনের অধীন অপরাধসমূহ প্রথম শ্রেণির জুডিসিয়াল ম্যাজিস্ট্রেট বা মেট্রোপলিটন ম্যাজিস্ট্রেট কর্তৃক বিচার্য হইবে। (৩) এই আইনের অধীন অপরাধের বিচার মামলা প্রাপ্তির তারিখ হইতে ১৮০ (একশত আশি) দিনের মধ্যে সমাপ্ত করিতে হইবে। (৪) এই আইনের অন্যান্য বিধানাবলি সাপেক্ষে, এই আইনের অধীন অপরাধের বিচার ও আপিলের ক্ষেত্রে ফৌজদারি কার্যবিধির বিধানাবলি প্রযোজ্য হইবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩-এর ১৯(১) ধারা অনুযায়ী এই আইনের সব অপরাধ আমলযোগ্য (পুলিশ সরাসরি মামলা নিতে পারে)। তবে শুধুমাত্র ধারা ৪ (জাল দলিল সৃষ্টি) ও ধারা ৫ (মিথ্যা মালিকানা দাবি) অ-জামিনযোগ্য; ধারা ১৩ (মাটি কাটা/ভরাট) সহ অন্যান্য অপরাধ জামিনযোগ্য ও আপোষযোগ্য। মামলা প্রাপ্তির ১৮০ দিনের মধ্যে বিচার সমাপ্ত করার আইনি বাধ্যবাধকতা রয়েছে।',
      en: 'Under Section 19(1) of the Land Crime Prevention and Redress Act 2023, all offenses under the Act are cognizable. Crucially, only Section 4 and Section 5 offenses are non-bailable; offenses under all other sections (including Section 13 soil cutting) are bailable and compoundable. Trials must conclude within 180 days.'
    },
    caution: {
      bn: 'প্রথম শ্রেণির জুডিসিয়াল ম্যাজিস্ট্রেট বা মেট্রোপলিটন ম্যাজিস্ট্রেট এই আইনের অপরাধের বিচারিক এখতিয়ার রাখেন।',
      en: 'Triable exclusively by Judicial Magistrate of the 1st Class or Metropolitan Magistrate.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1454/section-52397.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2023-09-18',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: [
      'land crime bail',
      'bailable land crime',
      'cognizable land crime',
      'section 19',
      'ধারা ১৯',
      'জামিনযোগ্য ভূমি অপরাধ',
      'আমলযোগ্য'
    ],
    relatedProvisions: ['land-crime-4', 'land-crime-5', 'land-crime-13']
  };
  s19.contentHash = computeHash(s19);
  provs.push(s19);
}

// 2. Correct Family Courts Act 2023 sections
// Change family-court-2023-4 to section 5 (Subject-matter jurisdiction)
const f4 = provs.find(p => p.id === 'family-court-2023-4');
if (f4) {
  f4.sectionNumber = 'Section 5';
  f4.title = {
    bn: 'পারিবারিক আদালতের বিষয়ভিত্তিক এখতিয়ার (ধারা ৫)',
    en: 'Subject-Matter Jurisdiction of Family Courts over 5 Matrimonial Matters (Section 5)'
  };
  f4.originalText = '৫। মুসলিম পারিবারিক আইনের বিধানাবলি সাপেক্ষে, পারিবারিক আদালতে নিম্নরূপ সকল বা যেকোনো বিষয় সম্পর্কিত বা উহা হইতে উদ্ভূত যেকোনো মোকদ্দমা গ্রহণ, বিচার এবং নিষ্পত্তির এখতিয়ার থাকিবে, যথা :- (ক) বিবাহ বিচ্ছেদ; (খ) দাম্পত্য অধিকার পুনরুদ্ধার; (গ) দেনমোহর; (ঘ) ভরণপোষণ; এবং (ঙ) শিশু সন্তানদের অভিভাবকত্ব ও তত্ত্বাবধান।';
  f4.plainExplanation = {
    bn: 'পারিবারিক আদালত আইন ২০২৩-এর ৫ ধারা অনুযায়ী পারিবারিক আদালতের ৫টি সুনির্দিষ্ট পারিবারিক বিষয়ে মামলা গ্রহণ ও নিষ্পত্তির একচ্ছত্র এখতিয়ার রয়েছে: (১) বিবাহ বিচ্ছেদ, (২) দাম্পত্য অধিকার পুনরুদ্ধার, (৩) দেনমোহর আদায়, (৪) স্ত্রী ও সন্তানদের ভরণপোষণ, এবং (৫) অপ্রাপ্তবয়স্ক সন্তানের অভিভাবকত্ব ও হেফাজত (কাস্টডি)।',
    en: 'Under Section 5 of the Family Courts Act 2023, Family Courts hold exclusive subject-matter jurisdiction over 5 matrimonial matters: (1) dissolution of marriage, (2) restitution of conjugal rights, (3) dower, (4) maintenance of wife and children, and (5) custody and guardianship of minor children.'
  };
  f4.caution = {
    bn: 'মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১ এর সালিসি কাউন্সিলের এখতিয়ার অক্ষুণ্ণ রেখে এই আদালতের এখতিয়ার কার্যকর হয়।',
    en: 'Subject to provisions of the Muslim Family Laws Ordinance 1961.'
  };
  f4.sourceUrl = 'https://bdlaws.minlaw.gov.bd/act-1444/section-52077.html';
  f4.reviewStatus = 'auto_checked';
  f4.contentHash = computeHash(f4);
}

// Update family-court-5 to Section 6 (Place of Suing & Territorial Jurisdiction)
const f5 = provs.find(p => p.id === 'family-court-5');
if (f5) {
  f5.sectionNumber = 'Section 6';
  f5.title = {
    bn: 'পারিবারিক মোকদ্দমা দায়ের ও স্থানীয় এখতিয়ার (ধারা ৬)',
    en: 'Territorial Jurisdiction and Place of Suing in Family Courts (Section 6)'
  };
  f5.originalText = '৬। (১) এই আইনের অধীন কোনো মোকদ্দমা সেই পারিবারিক আদালতে আরজি দাখিলের মাধ্যমে দায়ের করিতে হইবে যাহার এখতিয়ারের স্থানীয় সীমানার মধ্যে- (ক) মোকদ্দমার কারণ সম্পূর্ণভাবে বা আংশিকভাবে উদ্ভূত হইয়াছে; অথবা (খ) পক্ষগণ একত্রে বসবাস করেন বা সর্বশেষ বসবাস করিয়াছিলেন: তবে শর্ত থাকে যে, বিবাহ বিচ্ছেদ, দেনমোহর বা ভরণপোষণের মোকদ্দমায় সেই আদালতেরও এখতিয়ার থাকিবে, যাহার এখতিয়ারের স্থানীয় সীমানার মধ্যে স্ত্রী সাধারণত বসবাস করেন।';
  f5.plainExplanation = {
    bn: 'পারিবারিক আদালত আইন ২০২৩-এর ৬ ধারা অনুযায়ী যেখানে বিরোধের কারণ ঘটেছে বা স্বামী-স্ত্রী সর্বশেষ একত্রে বসবাস করেছেন সেই পারিবারিক আদালতে মামলা করতে হয়। বিশেষ সুবিধা হিসেবে দেনমোহর, ভরণপোষণ বা বিবাহ বিচ্ছেদের মোকদ্দমায় স্ত্রী যেখানে সাধারণত বসবাস করেন, সেখানকার পারিবারিক আদালতেও মামলা দায়ের করতে পারবেন।',
    en: 'Section 6 of the Family Courts Act 2023 establishes territorial jurisdiction where the cause of action arose or where parties last resided together. Crucially, a wife filing for dissolution of marriage, dower, or maintenance is statutorily entitled to file in the Family Court within whose local jurisdiction she ordinarily resides.'
  };
  f5.sourceUrl = 'https://bdlaws.minlaw.gov.bd/act-1444/section-52078.html';
  f5.reviewStatus = 'auto_checked';
  f5.contentHash = computeHash(f5);
}

// 3. Correct Consumer Protection Act 2009 sections
// Correct consumer-42: Mixing prohibited substances in food products (NOT short weight)
const c42 = provs.find(p => p.id === 'consumer-42');
if (c42) {
  c42.sectionNumber = 'Section 42';
  c42.title = {
    bn: 'খাদ্য পণ্যে ক্ষতিকর নিষিদ্ধ দ্রব্যের মিশ্রণের দণ্ড (ধারা ৪২)',
    en: 'Penalty for Mixing Prohibited Substances in Food Products (Section 42)'
  };
  c42.originalText = '৪২৷ মানুষের জীবন বা স্বাস্থ্যের জন্য ক্ষতিকারক কোন দ্রব্য, কোন খাদ্য পণ্যের সহিত যাহার মিশ্রণ কোন আইন বা বিধির অধীন নিষিদ্ধ করা হইয়াছে, কোন ব্যক্তি উক্তরূপ দ্রব্য কোন খাদ্য পণ্যের সহিত মিশ্রিত করিলে তিনি অনূর্ধ্ব তিন বৎসর কারাদণ্ড, বা অনধিক দুই লক্ষ টাকা অর্থদণ্ড, বা উভয় দণ্ডে দণ্ডিত হইবেন।';
  c42.plainExplanation = {
    bn: 'ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯-এর ৪২ ধারা অনুযায়ী মানুষের জীবন বা স্বাস্থ্যের জন্য ক্ষতিকর এবং আইনত নিষিদ্ধ এমন কোনো দ্রব্য খাদ্য পণ্যের সাথে মিশ্রণ করলে অনূর্ধ্ব ৩ বছর কারাদণ্ড বা অনধিক ২ লাখ টাকা জরিমানা বা উভয় দণ্ড হতে পারে।',
    en: 'Under Section 42 of the Consumers\' Right Protection Act 2009, mixing any substance injurious to human life or health whose addition to food is prohibited under any law or rule carries up to 3 years imprisonment, up to 2,00,000 BDT fine, or both.'
  };
  c42.keywords = [
    'prohibited substance food',
    'toxic chemical food',
    'formalin',
    'ভেজাল খাদ্য',
    'নিষিদ্ধ দ্রব্য মিশ্রণ',
    'ধারা ৪২'
  ];
  c42.sourceUrl = 'https://bdlaws.minlaw.gov.bd/act-1014/section-31411.html';
  c42.reviewStatus = 'auto_checked';
  c42.contentHash = computeHash(c42);
}

// Correct consumer-43: Preserve specific statutory condition (process prohibited under law/rule)
const c43 = provs.find(p => p.id === 'consumer-43');
if (c43) {
  c43.sectionNumber = 'Section 43';
  c43.title = {
    bn: 'আইন বা বিধির অধীন নিষিদ্ধ অবৈধ প্রক্রিয়ায় পণ্য উৎপাদন বা প্রক্রিয়াকরণের দণ্ড (ধারা ৪৩)',
    en: 'Penalty for Manufacturing Goods through Legally Prohibited Processes (Section 43)'
  };
  c43.originalText = '৪৩৷ কোন ব্যক্তি মানুষের জীবন বা স্বাস্থ্যের জন্য ক্ষতিকর হয় এমন কোন প্রক্রিয়ায়, যাহা কোন আইন বা বিধির অধীন নিষিদ্ধ করা হইয়াছে, কোন পণ্য উৎপাদন বা প্রক্রিয়াকরণ করিলে তিনি অনূর্ধ্ব দুই বৎসর কারাদণ্ড, বা অনধিক এক লক্ষ টাকা অর্থদণ্ড, বা উভয় দণ্ডে দণ্ডিত হইবেন।';
  c43.plainExplanation = {
    bn: 'ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯-এর ৪৩ ধারা অনুযায়ী মানুষের জীবন বা স্বাস্থ্যের জন্য ক্ষতিকর এমন কোনো প্রক্রিয়ায় (যা কোনো আইন বা বিধির অধীন সুনির্দিষ্টভাবে নিষিদ্ধ) পণ্য উৎপাদন বা প্রক্রিয়াকরণ করলে সর্বোচ্চ ২ বছরের কারাদণ্ড বা অনধিক ১ লাখ টাকা অর্থদণ্ড বা উভয় দণ্ড হবে।',
    en: 'Under Section 43 of the Consumers\' Right Protection Act 2009, manufacturing or processing goods through any process that is harmful to human life or health AND specifically prohibited under any law or rule carries up to 2 years imprisonment, up to 1,00,000 BDT fine, or both.'
  };
  c43.caution = {
    bn: 'অপরাধ প্রমাণের জন্য উক্ত উৎপাদন প্রক্রিয়াটি কোনো আইন বা বিধির অধীন স্পষ্টভাবে নিষিদ্ধ হতে হবে।',
    en: 'Requires that the manufacturing or processing method is explicitly prohibited under an existing law or statutory rule.'
  };
  c43.sourceUrl = 'https://bdlaws.minlaw.gov.bd/act-1014/section-31412.html';
  c43.reviewStatus = 'auto_checked';
  c43.contentHash = computeHash(c43);
}

// Add consumer-46 (Deceptive Weights / Short Weights)
let c46 = provs.find(p => p.id === 'consumer-46');
if (!c46) {
  c46 = {
    id: 'consumer-46',
    actId: 'act_consumer_2009',
    sectionNumber: 'Section 46',
    categories: ['consumer'],
    title: {
      bn: 'ওজনে কারচুপির দণ্ড (ধারা ৪৬)',
      en: 'Penalty for Short Weight and Deceptive Weighing (Section 46)'
    },
    originalText: '৪৬৷ কোন ব্যক্তি কোন পণ্য সরবরাহ বা বিক্রয়ের সময় ভোক্তাকে প্রতিশ্রুত ওজন অপেক্ষা কম ওজনে উক্ত পণ্য বিক্রয় বা সরবরাহ করিলে তিনি অনূর্ধ্ব এক বৎসর কারাদণ্ড, বা অনধিক পঞ্চাশ হাজার টাকা অর্থদণ্ড, বা উভয় দণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯-এর ৪৬ ধারা অনুযায়ী পণ্য সরবরাহ বা বিক্রির সময় ক্রেতাকে প্রতিশ্রুত ওজনের চেয়ে কম ওজনে বিক্রি করলে অনূর্ধ্ব ১ বছর কারাদণ্ড বা অনধিক ৫০ হাজার টাকা অর্থদণ্ড বা উভয় দণ্ড হতে পারে।',
      en: 'Under Section 46 of the Consumers\' Right Protection Act 2009, selling or supplying goods with weight less than what was promised to the consumer carries up to 1 year imprisonment, up to 50,000 BDT fine, or both.'
    },
    caution: {
      bn: 'বাটখারা বা স্কেলের কারচুপির ক্ষেত্রে ৪৭ ধারা এবং ফিতা বা দৈর্ঘ্যের কারচুপির ক্ষেত্রে ৪৯ ধারা প্রযোজ্য।',
      en: 'For faulty weighing scales/weights see Section 47; for length/measuring tapes see Section 49.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-31415.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2009-04-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: [
      'short weight',
      'deceptive weight',
      'ojon kom',
      'ওজনে কম',
      'ওজন কারচুপি',
      'কম ওজন দেওয়া',
      'বাটখারা কারচুপি',
      'underweight'
    ],
    relatedProvisions: ['consumer-47', 'consumer-48', 'consumer-60', 'consumer-76']
  };
  c46.contentHash = computeHash(c46);
  provs.push(c46);
}

// Correct consumer-50: Counterfeit Manufacturing (NOT hoarding)
const c50 = provs.find(p => p.id === 'consumer-50');
if (c50) {
  c50.sectionNumber = 'Section 50';
  c50.title = {
    bn: 'পণ্যের নকল প্রস্তুত বা উৎপাদন করিবার দণ্ড (ধারা ৫০)',
    en: 'Penalty for Manufacturing or Producing Counterfeit Goods (Section 50)'
  };
  c50.originalText = '৫০৷ কোন ব্যক্তি কোন পণ্যের নকল প্রস্তুত বা উৎপাদন করিলে তিনি অনূর্ধ্ব তিন বৎসর কারাদণ্ড, বা অনধিক দুই লক্ষ টাকা অর্থদণ্ড, বা উভয় দণ্ডে দণ্ডিত হইবেন।';
  c50.plainExplanation = {
    bn: 'ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯-এর ৫০ ধারা অনুযায়ী কোনো ব্র্যান্ড বা আসল পণ্যের নকল তৈরি বা উৎপাদন করলে অনূর্ধ্ব ৩ বছর কারাদণ্ড বা অনধিক ২ লাখ টাকা অর্থদণ্ড বা উভয় দণ্ডে দণ্ডিত হবেন।',
    en: 'Under Section 50 of the Consumers\' Right Protection Act 2009, manufacturing or producing counterfeit goods carries up to 3 years imprisonment, up to 2,00,000 BDT fine, or both.'
  };
  c50.keywords = [
    'counterfeit production',
    'fake goods manufacture',
    'nokol utpadon',
    'নকল পণ্য তৈরি',
    'নকল উৎপাদন',
    'ধারা ৫০'
  ];
  c50.sourceUrl = 'https://bdlaws.minlaw.gov.bd/act-1014/section-31419.html';
  c50.reviewStatus = 'auto_checked';
  c50.contentHash = computeHash(c50);
}

// 4. Correct Labour Act 2006: Weekly holidays belong to section 103, not section 105
const l103 = provs.find(p => p.id === 'labour-103');
if (l103) {
  l103.sectionNumber = 'Section 103';
  l103.title = {
    bn: 'শ্রমিকের সাপ্তাহিক ছুটি (ধারা ১০৩)',
    en: 'Weekly Holiday for Workers (Section 103)'
  };
  l103.originalText = '১০৩। কোন প্রতিষ্ঠানে কর্মরত কোন শ্রমিক- (ক) প্রতি সপ্তাহে কারখানা ও শিল্পের ক্ষেত্রে একদিন এবং দোকান ও প্রতিষ্ঠানের ক্ষেত্রে দেড় দিন ছুটি পাইবেন; (খ) সড়ক পরিবহণ প্রতিষ্ঠানের ক্ষেত্রে, প্রতি সপ্তাহে অবিচ্ছিন্ন চব্বিশ ঘণ্টার একদিন ছুটি পাইবেন; (গ) উপরোক্ত দফা (ক) ও (খ) এর আওতায় কোন ছুটির জন্য শ্রমিকের মজুরী হইতে কোন কর্তন করা যাইবে না।';
  l103.plainExplanation = {
    bn: 'বাংলাদেশ শ্রম আইন ২০০৬-এর ১০৩ ধারা অনুযায়ী কারখানা ও শিল্প প্রতিষ্ঠানে কর্মরত শ্রমিক প্রতি সপ্তাহে ১ দিন এবং দোকান ও বাণিজ্যিক প্রতিষ্ঠানে দেড় দিন বেতনসহ ছুটি পাবেন। সড়ক পরিবহন শ্রমিক একটানা ২৪ ঘণ্টার ১ দিন ছুটি পাবেন। এই ছুটির জন্য মজুরি কাটা দণ্ডনীয় অপরাধ।',
    en: 'Under Section 103 of the Bangladesh Labour Act 2006, industrial and factory workers are entitled to 1 full rest day per week, while shop and commercial establishment workers are entitled to 1.5 rest days per week with full pay. Road transport workers receive 24 consecutive hours off. No deduction from wages may be made for weekly holidays.'
  };
  l103.sourceUrl = 'https://bdlaws.minlaw.gov.bd/act-952/section-30230.html';
  l103.reviewStatus = 'auto_checked';
  l103.contentHash = computeHash(l103);
}

// Update labour-105: Spread-over (max 10 hours daily including intervals)
const l105 = provs.find(p => p.id === 'labour-105');
if (l105) {
  l105.sectionNumber = 'Section 105';
  l105.title = {
    bn: 'দৈনিক কর্মঘণ্টার বিস্তার বা স্প্রেড-ওভার (ধারা ১০৫)',
    en: 'Spread-Over of Daily Working Hours (Section 105)'
  };
  l105.originalText = '১০৫। কোন প্রতিষ্ঠানে কর্মরত কোন প্রাপ্ত বয়স্ক শ্রমিকের কাজের সময় এমনভাবে ব্যবস্থা করিতে হইবে যেন, ধারা ১০১ এর অধীন তাহার আহার ও বিশ্রামের বিরতি ব্যতীত ইহা দশ ঘণ্টার অধিক সম্প্রসারিত না হয়, তবে সরকার কর্তৃক প্রদত্ত অনুমতির ভিত্তিতে ইহার ব্যতিক্রম করা যাইবে।';
  l105.plainExplanation = {
    bn: 'বাংলাদেশ শ্রম আইন ২০০৬-এর ১০৫ ধারা অনুযায়ী আহার ও বিশ্রামের বিরতিসহ প্রাপ্তবয়স্ক শ্রমিকের দৈনিক মোট কাজের বিস্তার (Spread-over) কোনোভাবেই ১০ ঘণ্টার বেশি হবে না, যদি না সরকার বা উপযুক্ত কর্তৃপক্ষ নির্দিষ্ট সেক্টরের জন্য বিশেষ অনুমতি দেয়।',
    en: 'Under Section 105 of the Bangladesh Labour Act 2006, the daily working hours of an adult worker, inclusive of meal and rest intervals under Section 101, must not spread over more than 10 hours in any single day unless specifically permitted by the government.'
  };
  l105.keywords = [
    'spread over',
    'daily working hours limit',
    'kajer bistar',
    '১০ ঘণ্টার বেশি কাজ',
    'কর্মঘণ্টার বিস্তার',
    'ধারা ১০৫'
  ];
  l105.sourceUrl = 'https://bdlaws.minlaw.gov.bd/act-952/section-30232.html';
  l105.reviewStatus = 'auto_checked';
  l105.contentHash = computeHash(l105);
}

// Add labour-104 (Compensatory Weekly Holiday) if not present
let l104 = provs.find(p => p.id === 'labour-104');
if (!l104) {
  l104 = {
    id: 'labour-104',
    actId: 'act_labour_2006',
    sectionNumber: 'Section 104',
    categories: ['work'],
    title: {
      bn: 'ক্ষতিপূরণমূলক বা বিকল্প সাপ্তাহিক ছুটি (ধারা ১০৪)',
      en: 'Compensatory Weekly Holiday (Section 104)'
    },
    originalText: '১০৪। যে ক্ষেত্রে কোন প্রতিষ্ঠানকে বা উহাতে কর্মরত শ্রমিকগণকে ধারা ১০৩ এর বিধান হইতে অব্যাহতি প্রদান করিয়া জারীকৃত কোন আদেশের ফলে অথবা এই আইনের অধীন প্রণীত কোন বিধির ফলে কোন শ্রমিক উক্ত ধারার অধীন তাহার প্রাপ্য কোন ছুটি হইতে বঞ্চিত হন সে ক্ষেত্রে, উক্ত শ্রমিককে অবস্থা অনুযায়ী যথাশীঘ্র সম্ভব উক্তরূপ ছুটির সমসংখ্যক বিকল্প ছুটি মঞ্জুর করিতে হইবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'বাংলাদেশ শ্রম আইন ২০০৬-এর ১০৪ ধারা অনুযায়ী যদি কোনো বিশেষ প্রজ্ঞাপন বা নিয়মে শ্রমিককে ১০৩ ধারার সাপ্তাহিক ছুটির দিনে কাজ করানো হয়, তবে তাকে যত দ্রুত সম্ভব সমসংখ্যক বিকল্প বা ক্ষতিপূরণমূলক ছুটি প্রদান করতে হবে।',
      en: 'Under Section 104 of the Bangladesh Labour Act 2006, if a worker is deprived of any weekly holiday under Section 103 due to an exemption order or statutory rule, they must be granted compensatory holidays of equal duration as soon as possible.'
    },
    caution: {
      bn: 'বিকল্প ছুটি কোনো অবস্থাতেই অনির্দিষ্টকালের জন্য বিলম্বিত করা যাবে না।',
      en: 'Compensatory rest must be provided as soon as circumstantial feasibility allows.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-30231.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2006-10-11',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: [
      'compensatory holiday',
      'bikolpo chuti',
      'work on holiday',
      'বিকল্প ছুটি',
      'ক্ষতিপূরণমূলক ছুটি',
      'ছুটির দিনে কাজ',
      'ধারা ১০৪'
    ],
    relatedProvisions: ['labour-103', 'labour-105', 'labour-108']
  };
  l104.contentHash = computeHash(l104);
  provs.push(l104);
}

// 5. Replace cyber-protection-core with precise statutory provisions
// Remove synthetic 'cyber-protection-core'
const cCoreIdx = provs.findIndex(p => p.id === 'cyber-protection-core');
if (cCoreIdx !== -1) {
  provs.splice(cCoreIdx, 1);
}

// Ensure precise cyber provisions: cyber-17 (Hacking/CII access), cyber-19 (System damage), cyber-22 (Extortion/blackmail), cyber-23 (Fraud)
// And add cyber-pornography-8 for intimate image blackmail
let cPorno8 = provs.find(p => p.id === 'cyber-pornography-8');
if (!cPorno8) {
  cPorno8 = {
    id: 'cyber-pornography-8',
    actId: 'act_pornography_2012',
    sectionNumber: 'Section 8',
    categories: ['digital', 'threats'],
    title: {
      bn: 'ইন্টারনেটে অন্তরঙ্গ ছবি প্রকাশ বা ব্ল্যাকমেইলের দণ্ড (ধারা ৮)',
      en: 'Penalty for Publishing Intimate Media or Blackmail Online (Section 8)'
    },
    originalText: '৮। (১) কোনো ব্যক্তি পর্নোগ্রাফি উৎপাদন করিলে বা উৎপাদনে অংশগ্রহণ করিলে তিনি অনধিক ৭ (সাত) বৎসর পর্যন্ত সশ্রম কারাদণ্ড এবং ২ (দুই) লক্ষ টাকা পর্যন্ত অর্থদণ্ডে দণ্ডিত হইবেন। (২) কোনো ব্যক্তি ইন্টারনেট বা অন্য কোনো ডিজিটাল মাধ্যমে পর্নোগ্রাফি বা কোনো ব্যক্তির অন্তরঙ্গ ছবি বা ভিডিও বিতরণ বা প্রকাশ করিলে তিনি অনধিক ৫ (পাঁচ) বৎসর পর্যন্ত সশ্রম কারাদণ্ড এবং ২ (দুই) লক্ষ টাকা পর্যন্ত অর্থদণ্ডে দণ্ডিত হইবেন। (৩) পর্নোগ্রাফির মাধ্যমে কোনো ব্যক্তিকে ব্ল্যাকমেইল বা অর্থ দাবি করিলে অনধিক ৫ (পাঁচ) বৎসর কারাদণ্ড ও অর্থদণ্ডে দণ্ডনীয় হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'পর্নোগ্রাফি নিয়ন্ত্রণ আইন ২০১২-এর ৮ ধারা অনুযায়ী ইন্টারনেটে বা সোশ্যাল মিডিয়ায় কারো ব্যক্তিগত অন্তরঙ্গ ছবি বা ভিডিও ছড়িয়ে দেওয়া বা তা ছড়িয়ে দেওয়ার ভয় দেখিয়ে ব্ল্যাকমেইল ও টাকা দাবি করা একটি জামিন-অযোগ্য গুরুতর ফৌজদারি অপরাধ, যাতে সর্বোচ্চ ৫ থেকে ৭ বছর সশ্রম কারাদণ্ড ও অর্থদণ্ড হতে পারে।',
      en: 'Under Section 8 of the Pornography Control Act 2012, distributing or publishing intimate images/videos online, or blackmailing someone by threatening to leak intimate media, is a serious non-bailable criminal offense punishable by up to 5 to 7 years rigorous imprisonment and fine.'
    },
    caution: {
      bn: 'ডিজিটাল প্রমাণ (মেসেজ, চ্যাট হিস্ট্রি, হুমকিদাতার প্রোফাইল লিঙ্ক) ডিলিট না করে স্ক্রিনশট ও লিঙ্ক সংরক্ষণ করে দ্রুত থানায় এজাহার দায়ের করতে হবে।',
      en: 'Preserve full digital audit trails (screenshots, chat logs, profile URLs) without deleting messages and report directly to local Thana or Cyber Police.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1087/section-34199.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2012-04-18',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: [
      'intimate picture leak',
      'cyber blackmail',
      'photo viral bhoy',
      'fb hack picture viral',
      'অন্তরঙ্গ ছবি ভাইরাল',
      'ছবি দিয়ে ব্ল্যাকমেইল',
      'পর্নোগ্রাফি নিয়ন্ত্রণ আইন ধারা ৮'
    ],
    relatedProvisions: ['cyber-22', 'cyber-24', 'cyber-crime-reporting']
  };
  cPorno8.contentHash = computeHash(cPorno8);
  provs.push(cPorno8);
}

// Add act_pornography_2012 to acts.json if not present
const acts = JSON.parse(fs.readFileSync('src/data/corpus/acts.json', 'utf8'));
if (!acts.some(a => a.id === 'act_pornography_2012')) {
  acts.push({
    id: 'act_pornography_2012',
    name: {
      bn: 'পর্নোগ্রাফি নিয়ন্ত্রণ আইন, ২০১২',
      en: 'Pornography Control Act, 2012'
    },
    shortName: 'Pornography Control Act 2012',
    enactmentYear: 2012,
    actNumber: 'Act IX of 2012',
    officialUrl: 'https://bdlaws.minlaw.gov.bd/act-1087.html',
    legalStatus: 'active'
  });
  fs.writeFileSync('src/data/corpus/acts.json', JSON.stringify(acts, null, 2), 'utf8');
}

fs.writeFileSync('src/data/corpus/provisions.json', JSON.stringify(provs, null, 2), 'utf8');
console.log('Successfully updated provisions.json. Total provisions now:', provs.length);
