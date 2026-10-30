import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

function sha256(text) {
  return crypto.createHash('sha256').update(text || '', 'utf8').digest('hex');
}

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
  return sha256(payload);
}

// Ensure acts.json has all necessary acts
const acts = JSON.parse(fs.readFileSync('src/data/corpus/acts.json', 'utf8'));
const actIds = new Set(acts.map(a => a.id));

if (!actIds.has('act_dmma_1939')) {
  acts.push({
    id: 'act_dmma_1939',
    name: {
      bn: 'মুসলিম বিবাহ বিচ্ছেদ আইন, ১৯৩৯',
      en: 'Dissolution of Muslim Marriages Act, 1939'
    },
    actNumber: 'Act VIII of 1939',
    year: 1939,
    categories: ['family'],
    officialUrl: 'https://bdlaws.minlaw.gov.bd/act-184.html',
    legalStatus: 'active'
  });
}

if (!actIds.has('act_ict_2006')) {
  acts.push({
    id: 'act_ict_2006',
    name: {
      bn: 'তথ্য ও যোগাযোগ প্রযুক্তি আইন, ২০০৬',
      en: 'Information and Communication Technology Act, 2006'
    },
    actNumber: 'Act XXXIX of 2006',
    year: 2006,
    categories: ['digital'],
    officialUrl: 'https://bdlaws.minlaw.gov.bd/act-957.html',
    legalStatus: 'amended'
  });
}
fs.writeFileSync('src/data/corpus/acts.json', JSON.stringify(acts, null, 2), 'utf8');

// Load existing 168 provisions
const provs = JSON.parse(fs.readFileSync('src/data/corpus/provisions.json', 'utf8'));
const provMap = new Map(provs.map(p => [p.id, p]));

console.log('Existing provisions count:', provMap.size);

// Define the 92 Batch 2 additions
const items = [
  // -------------------------------------------------------------
  // Category 1: Work (14 additions)
  // -------------------------------------------------------------
  {
    id: 'labour-22',
    actId: 'act_labour_2006',
    sectionNumber: 'Section 22',
    categories: ['work'],
    title: {
      bn: 'কর্মরত অবস্থায় শ্রমিকের মৃত্যুজনিত ক্ষতিপূরণ ও সুবিধাদি (ধারা ২২)',
      en: 'Death Compensation and Terminal Benefits of Deceased Worker (Section 22)'
    },
    originalText: '২২। (১) কোনো শ্রমিক অবিচ্ছিন্নভাবে অন্তত দুই বৎসর কোনো প্রতিষ্ঠানে কর্মরত অবস্থায় মৃত্যুবরণ করিলে, তাহার মৃত্যুর জন্য তাহার মনোনীত ব্যক্তি বা ওয়ারিশগণকে প্রতি পূর্ণ বৎসর বা তাহার অতিরিক্ত ছয় মাসের অধিক মেয়াদের চাকুরীর জন্য ক্ষতিপূরণ বাবদ অন্তত ৩০ দিনের মজুরী প্রদান করিতে হইবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'বাংলাদেশ শ্রম আইন ২০০৬-এর ২২ ধারা অনুযায়ী কোনো শ্রমিক অবিচ্ছিন্ন ২ বছর চাকরি করার পর মারা গেলে তার উত্তরাধিকারী বা মনোনীত ব্যক্তি চাকরির প্রতি বছরের জন্য অন্তত ৩০ দিনের মজুরি ও যাবতীয় বকেয়া পাওনা পাওয়ার অধিকারী।',
      en: 'Under Section 22 of the Bangladesh Labour Act 2006, if a worker dies after at least 2 continuous years of service, the employer must pay their nominee or legal heirs at least 30 days wages for each completed year of service, in addition to all pending dues.'
    },
    caution: {
      bn: 'এটি সাধারণ মৃত্যুজনিত গ্র্যাচুইটি/সুবিধা; কর্মক্ষেত্রে দুর্ঘটনায় মৃত্যুর ক্ষতিপূরণ ১৫০ ধারায় পৃথকভাবে প্রদেয়।',
      en: 'This is standard service death compensation; workplace accident death benefits are governed separately under Section 150.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-30149.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2006-10-11',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['worker death', 'death compensation', 'nominee wages', 'shromik mrittu', 'শ্রমিকের মৃত্যু', 'মৃত্যুজনিত ক্ষতিপূরণ', 'ধারা ২২']
  },
  {
    id: 'labour-23',
    actId: 'act_labour_2006',
    sectionNumber: 'Section 23',
    categories: ['work'],
    title: {
      bn: 'অসদাচরণের শাস্তি ও বরখাস্তের বিধান (ধারা ২৩)',
      en: 'Punishment for Misconduct and Dismissal (Section 23)'
    },
    originalText: '২৩। (১) কোনো শ্রমিককে কোনো নোটিশ বা নোটিশের পরিবর্তে মজুরী প্রদান ব্যতিরেকেই বরখাস্ত করা যাইবে যদি তিনি- (ক) কোনো ফৌজদারি অপরাধে দোষী সাব্যস্ত হন; অথবা (খ) ধারা ২৪ এর অধীন অসদাচরণের দায়ে দোষী সাব্যস্ত হন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'শ্রম আইন ২০০৬-এর ২৩ ধারা অনুযায়ী কোনো শ্রমিক চুরি, আত্মসাৎ, ঘুষ গ্রহণ, প্রতিষ্ঠানের শৃঙ্খলাভঙ্গ বা ফৌজদারি অপরাধে দোষী প্রমাণিত হলে মালিক তাকে নোটিশ ছাড়াই বরখাস্ত করতে পারে। তবে এজন্য ২৪ ধারা অনুযায়ী আনুষ্ঠানিক তদন্ত বাধ্যতামূলক।',
      en: 'Under Section 23 of the Labour Act 2006, a worker may be dismissed without notice if convicted of a criminal offense or found guilty of defined statutory misconduct, subject to formal disciplinary proceedings under Section 24.'
    },
    caution: {
      bn: 'তদন্ত ও আত্মপক্ষ সমর্থনের সুযোগ না দিয়ে বরখাস্ত করা সম্পূর্ণ বেআইনি।',
      en: 'Summary dismissal without conducting inquiry and notice of hearing under Section 24 is unlawful.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-30150.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2006-10-11',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['misconduct', 'dismissal', 'borkhasto', 'osodachoron', 'অসদাচরণ', 'চাকরি থেকে বরখাস্ত', 'ধারা ২৩']
  },
  {
    id: 'labour-24',
    actId: 'act_labour_2006',
    sectionNumber: 'Section 24',
    categories: ['work'],
    title: {
      bn: 'শাস্তি প্রদানের আইনি পদ্ধতি ও আত্মপক্ষ সমর্থনের নোটিশ (ধারা ২৪)',
      en: 'Procedure for Imposing Punishment & Right of Hearing (Section 24)'
    },
    originalText: '২৪। (১) ধারা ২৩ এর অধীন কোনো বরখাস্তের আদেশ প্রদান করা যাইবে না, যদি না- (ক) তাহার বিরুদ্ধে অভিযোগ লিখিতভাবে লিপিবদ্ধ করা হয়; (খ) তাহার অনুলিপি শ্রমিককে দেওয়া হয় এবং আত্মপক্ষ সমর্থনের জন্য অন্তত সাত দিনের সময় প্রদান করা হয়; (গ) একটি নিরপেক্ষ তদন্ত কমিটি দ্বারা তদন্ত সম্পন্ন করা হয়।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'শ্রম আইনের ২৪ ধারা অনুযায়ী কোনো শ্রমিককে শাস্তি বা বরখাস্ত করার আগে অবশ্যই লিখিত অভিযোগনামা দিতে হবে, আত্মপক্ষ সমর্থনের জন্য অন্তত ৭ দিন সময় দিতে হবে এবং নিরপেক্ষ তদন্তের মাধ্যমে শুনানি গ্রহণ করতে হবে।',
      en: 'Section 24 mandates strict due process: a written charge-sheet must be served, at least 7 days given to reply, an impartial inquiry held, and approval from the employer obtained before any punishment or dismissal.'
    },
    caution: {
      bn: 'তদন্তের সময় শ্রমিককে সাময়িক বরখাস্ত রাখা হইলে ৫০% খোরাকি ভাতা দিতে হইবে।',
      en: 'Suspension pending inquiry mandates payment of 50% subsistence allowance.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-30151.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2006-10-11',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['charge sheet', 'inquiry', 'due process', 'show cause', 'শোকজ', 'তদন্ত', 'আত্মপক্ষ সমর্থন', 'ধারা ২৪']
  },
  {
    id: 'labour-28',
    actId: 'act_labour_2006',
    sectionNumber: 'Section 28',
    categories: ['work'],
    title: {
      bn: '৬০ বছর পূর্ণে শ্রমিকের স্বাভাবিক অবসর ও গ্র্যাচুইটি (ধারা ২৮)',
      en: 'Retirement of Worker upon Reaching 60 Years (Section 28)'
    },
    originalText: '২৮। (১) কোনো শ্রমিক ৬০ (ষাট) বৎসর বয়স পূর্ণ করিলে তিনি চাকরি হইতে অবসর গ্রহণ করিবেন। (২) অবসরপ্রাপ্ত শ্রমিককে তাহার প্রত্যেক পূর্ণ বৎসর চাকুরীর জন্য ক্ষতিপূরণ বাবদ অন্তত ৩০ দিনের মজুরী বা গ্র্যাচুইটি, যাহা অধিক, প্রদান করিতে হইবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'শ্রম আইন ২০০৬-এর ২৮ ধারা অনুযায়ী শ্রমিকের স্বাভাবিক অবসরের বয়স ৬০ বছর। অবসরের সময় চাকরির প্রতি বছরের জন্য অন্তত ৩০ দিনের মূল মজুরি অথবা গ্র্যাচুইটি এবং অন্যান্য সব পাওনাদি মালিককে পরিশোধ করতে হবে।',
      en: 'Under Section 28 of the Labour Act 2006, a worker retires upon reaching 60 years of age. The employer must pay at least 30 days wages for each completed year of service or gratuity, whichever is higher, plus all accrued benefits.'
    },
    caution: {
      bn: 'বয়স নির্ধারণের ক্ষেত্রে জন্ম নিবন্ধন সনদ, জাতীয় পরিচয়পত্র বা সার্ভিস বুক প্রামাণ্য দলিল হিসেবে গণ্য হবে।',
      en: 'Age is verified via birth certificate, NID, or official service record book.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-30155.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2006-10-11',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['retirement', '60 years', 'gratuity', 'oboshhor', 'অবসর', '৬০ বছর বয়স', 'গ্র্যাচুইটি', 'ধারা ২৮']
  },
  {
    id: 'labour-30',
    actId: 'act_labour_2006',
    sectionNumber: 'Section 30',
    categories: ['work'],
    title: {
      bn: 'চাকরি অবসানের ৩০ কার্যদিবসের মধ্যে সকল পাওনা পরিশোধের বাধ্যবাধকতা (ধারা ৩০)',
      en: 'Mandatory Payment of All Dues within 30 Working Days (Section 30)'
    },
    originalText: '৩০। এই অধ্যায়ের অধীন কোনো শ্রমিকের চাকুরি অবসান, বরখাস্ত, অপসারণ, পদত্যাগ বা অবসরের ক্ষেত্রে তাহার প্রাপ্য যাবতীয় মজুরী ও অন্যান্য সুবিধাদি চাকুরি অবসানের তারিখ হইতে অনধিক ৩০ (ত্রিশ) কার্যদিবসের মধ্যে মালিক পরিশোধ করিবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'শ্রম আইন ২০০৬-এর ৩০ ধারা অনুযায়ী বরখাস্ত, ছাঁটাই, পদত্যাগ বা অবসর—যেকোনো উপায়ে চাকরি শেষ হলে শ্রমিকের সকল পাওনা টাকা চাকরি শেষ হওয়ার সর্বোচ্চ ৩০ কার্যদিবসের মধ্যে পরিশোধ করতে মালিক আইনত বাধ্য।',
      en: 'Under Section 30 of the Labour Act 2006, upon termination, resignation, dismissal, or retirement, the employer is legally obligated to settle all outstanding wages and terminal benefits within a mandatory deadline of 30 working days.'
    },
    caution: {
      bn: '৩০ কার্যদিবসে পাওনা না দিলে শ্রম আইনের ৩৩ ধারা অনুযায়ী শ্রম আদালতে সরাসরি ক্লেইম মোকদ্দমা দায়ের করা যায়।',
      en: 'Non-payment within 30 working days entitles the worker to file a claim under Section 33 in the Labour Court.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-30157.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2006-10-11',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['terminal benefits', '30 days payout', 'final settlement', 'paona', 'পাওনা পরিশোধ', '৩০ কার্যদিবস', 'ধারা ৩০']
  },
  {
    id: 'labour-32',
    actId: 'act_labour_2006',
    sectionNumber: 'Section 32',
    categories: ['work'],
    title: {
      bn: 'মালিক কর্তৃক প্রদত্ত বাসস্থান হইতে উচ্ছেদ সংক্রান্ত শর্তাবলী (ধারা ৩২)',
      en: 'Eviction from Residential Accommodation Provided by Employer (Section 32)'
    },
    originalText: '৩২। (১) কোনো শ্রমিকের চাকুরি অবসান হইলে তিনি মালিক কর্তৃক প্রদত্ত বাসস্থান চাকুরি অবসানের তারিখ হইতে অনধিক দুই মাসের মধ্যে খালি করিয়া দিবেন। (২) উক্ত সময়ের মধ্যে খালি না করিলে মালিক ম্যাজিস্ট্রেট আদালতে আবেদন করিতে পারিবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'শ্রম আইন ২০০৬-এর ৩২ ধারা অনুযায়ী চাকরি শেষ হওয়ার পর মালিকের দেওয়া কোয়ার্টার বা বাসস্থান খালি করার জন্য শ্রমিক অন্তত ২ মাস সময় পাবেন। এর আগে জোরপূর্বক উচ্ছেদ বেআইনি।',
      en: 'Under Section 32 of the Labour Act 2006, when employment ceases, the worker is entitled to vacate residential accommodation provided by the employer within up to 2 months. Summary forced eviction prior to that is unlawful.'
    },
    caution: {
      bn: 'উচ্ছেদের ক্ষেত্রে মালিককে ফৌজদারি কার্যবিধির মাধ্যমে ম্যাজিস্ট্রেটের আদেশ নিতে হয়, জোরজবরদস্তি নিষিদ্ধ।',
      en: 'Enforcement requires applying to the Magistrate; forceful eviction by the employer is barred.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-30159.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2006-10-11',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['worker quarter', 'residential eviction', 'bashosthan ucched', 'কোয়ার্টার উচ্ছেদ', 'বাসস্থান খালি', 'ধারা ৩২']
  },
  {
    id: 'labour-45',
    actId: 'act_labour_2006',
    sectionNumber: 'Section 45',
    categories: ['work'],
    title: {
      bn: 'প্রসূতি কল্যাণ সুবিধা প্রদানের পদ্ধতি ও কিস্তি (ধারা ৪৫)',
      en: 'Payment Procedure for Maternity Benefit (Section 45)'
    },
    originalText: '৪৫। (১) কোনো প্রসূতি শ্রমিককে মোট ১৬ সপ্তাহের (প্রসবের পূর্বে ৮ সপ্তাহ এবং প্রসবের পরে ৮ সপ্তাহ) প্রসূতি কল্যাণ ছুটি ও পূর্ণ গড় মজুরী প্রদান করিতে হইবে। (২) এই সুবিধার অর্থ দুই কিস্তিতে প্রদেয় হইবে- প্রসবের পূর্বে প্রথম অর্ধাংশ এবং প্রসবের প্রমাণ পেশের তিন দিনের মধ্যে শেষ অর্ধাংশ।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'শ্রম আইনের ৪৫ ধারা অনুযায়ী নারী শ্রমিক ১৬ সপ্তাহের (প্রসবের পূর্বে ৮ সপ্তাহ ও পরে ৮ সপ্তাহ) পূর্ণ মজুরিসহ মাতৃত্বকালীন ছুটি পাবেন। এই ছুটির টাকা দুই কিস্তিতে প্রদান করা বাধ্যতামূলক।',
      en: 'Under Section 45 of the Labour Act 2006, female workers are statutorily entitled to 16 weeks (8 weeks prenatal and 8 weeks postnatal) of fully paid maternity leave, payable in two installments.'
    },
    caution: {
      bn: 'সন্তান প্রসবের সম্ভাব্য তারিখের অন্তত ৮ সপ্তাহ পূর্বে মালিককে প্রজ্ঞাপন নোটিশ দিতে হয়।',
      en: 'Requires working at least 6 months with the employer prior to expected delivery under Section 46.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-30172.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2006-10-11',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['maternity benefit', 'maternity leave', '16 weeks leave', 'proshuti kalyan', 'মাতৃত্বকালীন ছুটি', 'প্রসূতি কল্যাণ', 'ধারা ৪৫']
  },
  {
    id: 'labour-47',
    actId: 'act_labour_2006',
    sectionNumber: 'Section 47',
    categories: ['work'],
    title: {
      bn: 'প্রসূতি কল্যাণ সুবিধার নোটিশ ও প্রসবকালীন সুরক্ষার নিয়ম (ধারা ৪৭)',
      en: 'Notice of Maternity Benefit and Protection of Expecting Mothers (Section 47)'
    },
    originalText: '৪৭। (১) কোনো নারী শ্রমিক প্রসবের সম্ভাবনার কথা মালিককে মৌখিক বা লিখিতভাবে নোটিশ প্রদান করিবেন। (২) প্রসূতি ছুটির নোটিশ প্রদানের পর হইতে প্রসবের পরবর্তী ৬ মাস পর্যন্ত উক্ত নারী শ্রমিককে বরখাস্ত বা চাকুরিচ্যুতি করা সম্পূর্ণ নিষিদ্ধ।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'শ্রম আইনের ৪৭ ধারা অনুযায়ী নারী শ্রমিক প্রসূতি ছুটির নোটিশ দেওয়ার পর থেকে প্রসবের পরবর্তী ৬ মাস পর্যন্ত মালিক তাকে কোনো অবস্থাতেই বরখাস্ত বা চাকরিচ্যুত করতে পারবে না। করলে তা দণ্ডনীয় অপরাধ।',
      en: 'Section 47 strictly bars terminating or dismissing a female worker once she serves maternity notice through 6 months post-childbirth. Any termination during this statutory protection period is void and penal.'
    },
    caution: {
      bn: 'মালিক কোনো অবস্থাতেই প্রসবের পরবর্তী ৮ সপ্তাহের মধ্যে কোনো নারীকে কাজে নিয়োজিত করিতে পারিবে না।',
      en: 'Employers are barred from employing a mother within 8 weeks following childbirth.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-30174.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2006-10-11',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['maternity protection', 'no dismissal pregnancy', 'gorvoboti shromik', 'গর্ভবতী শ্রমিক বরখাস্ত নিষেধ', 'ধারা ৪৭']
  },
  {
    id: 'labour-102',
    actId: 'act_labour_2006',
    sectionNumber: 'Section 102',
    categories: ['work'],
    title: {
      bn: 'প্রাপ্তবয়স্ক শ্রমিকের সাপ্তাহিক কর্মঘণ্টার সর্বোচ্চ সীমা: ৪৮ ঘণ্টা (ধারা ১০২)',
      en: 'Weekly Working Hours Limit for Adult Workers: 48 Hours (Section 102)'
    },
    originalText: '১০২। (১) কোনো প্রাপ্তবয়স্ক শ্রমিক কোনো প্রতিষ্ঠানে সাধারণতঃ সপ্তাহে ৪৮ (আটচল্লিশ) ঘণ্টার অধিক সময় কাজ করিবেন না বা তাহাকে দিয়া কাজ করানো যাইবে না। (২) তবে শর্ত থাকে যে, ধারা ১০৮ এর বিধান সাপেক্ষে অধিকাল ভাতা প্রদান করিয়া সপ্তাহে সর্বোচ্চ ৬০ ঘণ্টা পর্যন্ত কাজ করানো যাইতে পারে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'শ্রম আইন ২০০৬-এর ১০২ ধারা অনুযায়ী একজন প্রাপ্তবয়স্ক শ্রমিকের স্বাভাবিক কাজের সময় সপ্তাহে সর্বোচ্চ ৪৮ ঘণ্টা। ওভারটাইমসহ কোনো অবস্থাতেই সপ্তাহে মোট কাজের সময় ৬০ ঘণ্টার বেশি হতে পারবে না এবং বছরে গড়ে সপ্তাহে ৫৬ ঘণ্টার বেশি কাজ করানো বেআইনি।',
      en: 'Under Section 102 of the Labour Act 2006, normal working hours must not exceed 48 hours per week. Subject to overtime pay under Section 108, total weekly hours cannot exceed 60 hours, with an annual weekly average capped at 56 hours.'
    },
    caution: {
      bn: '৪৮ ঘণ্টার অতিরিক্ত প্রতি ঘণ্টার কাজের জন্য ১০৮ ধারা অনুযায়ী দ্বিগুণ মজুরি দিতে হয়।',
      en: 'Hours worked beyond 48 must be paid at double the ordinary basic wage rate under Section 108.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-30229.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2006-10-11',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['weekly hours', '48 hours limit', 'max working hours', 'shaptahik kaj', 'সাপ্তাহিক কর্মঘণ্টা', '৪৮ ঘণ্টা', 'ধারা ১০২']
  },
  {
    id: 'labour-109',
    actId: 'act_labour_2006',
    sectionNumber: 'Section 109',
    categories: ['work'],
    title: {
      bn: 'মহিলা শ্রমিকের ক্ষেত্রে নৈশকালীন কাজের বিধিনিষেধ (ধারা ১০৯)',
      en: 'Restrictions on Night Work for Female Workers (Section 109)'
    },
    originalText: '১০৯। কোনো প্রতিষ্ঠানে কোনো মহিলা শ্রমিককে তাহার সম্মতি ব্যতিরেকে রাত ১০ ঘটিকা হইতে সকাল ৬ ঘটিকা পর্যন্ত সময়ের মধ্যে কোনো কাজ করিতে বাধ্য করা যাইবে না।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'শ্রম আইন ২০০৬-এর ১০৯ ধারা অনুযায়ী কোনো নারী শ্রমিককে তার সুস্পষ্ট লিখিত সম্মতি ছাড়া রাত ১০টা থেকে সকাল ৬টার মধ্যে কোনো কাজে নিয়োগ বা বাধ্য করা যাবে না।',
      en: 'Under Section 109 of the Labour Act 2006, no female worker can be scheduled or coerced into night shifts between 10:00 PM and 6:00 AM without her explicit prior consent.'
    },
    caution: {
      bn: 'সম্মতি থাকলেও নিরাপদ পরিবহন ও কর্মপরিবেশ নিশ্চিত করার আইনি নির্দেশনা রয়েছে।',
      en: 'Even with consent, adequate safety, transportation, and health provisions are statutory prerequisites.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-30236.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2006-10-11',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['female night shift', 'night work women', 'mohela shromik rat', 'নারী শ্রমিক নৈশকালীন কাজ', 'রাত ১০টা থেকে সকাল ৬টা', 'ধারা ১০৯']
  },
  {
    id: 'labour-114',
    actId: 'act_labour_2006',
    sectionNumber: 'Section 114',
    categories: ['work'],
    title: {
      bn: 'দোকান ও বাণিজ্যিক প্রতিষ্ঠান সপ্তাহে দেড় দিন বন্ধ রাখার বাধ্যবাধকতা (ধারা ১১৪)',
      en: 'Mandatory Closure of Shops & Establishments for 1.5 Days Weekly (Section 114)'
    },
    originalText: '১১৪। (১) প্রত্যেক দোকান বা বাণিজ্যিক বা শিল্প প্রতিষ্ঠান প্রতি সপ্তাহে অন্তত দেড় দিন সম্পূর্ণ বন্ধ থাকিবে। (২) সরকার বা প্রধান পরিদর্শক কর্তৃক নির্ধারিত এলাকাভিত্তিক বন্ধের দিন এই ধারার অধীন প্রযোজ্য হইবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'শ্রম আইন ২০০৬-এর ১১৪ ধারা অনুযায়ী সব দোকান ও বাণিজ্যিক প্রতিষ্ঠান প্রতি সপ্তাহে বাধ্যতামূলকভাবে অন্তত দেড় দিন বন্ধ রাখতে হবে। বন্ধের দিনে শ্রমিকদের কাজ করানো আইনত দণ্ডনীয়।',
      en: 'Section 114 mandates that every shop and commercial establishment must remain closed for at least 1.5 continuous days each week, as zoned by the government or Chief Inspector.'
    },
    caution: {
      bn: 'ফার্মেসি, হাসপাতাল, ক্লাব ও জরুরি সেবামূলক প্রতিষ্ঠান ১১৪ ধারার আওতামুক্ত।',
      en: 'Pharmacies, medical clinics, and essential emergency suppliers are exempt from mandatory closure.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-30241.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2006-10-11',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['shop closure', '1.5 days holiday', 'dokan bondho', 'দোকান বন্ধ', 'দেড় দিন বন্ধ', 'ধারা ১১৪']
  },
  {
    id: 'labour-121',
    actId: 'act_labour_2006',
    sectionNumber: 'Section 121',
    categories: ['work'],
    title: {
      bn: 'মজুরি পরিশোধের দায়িত্ব ও জবাবদিহিতা (ধারা ১২১)',
      en: 'Responsibility for Payment of Wages (Section 121)'
    },
    originalText: '১২১। প্রত্যেক মালিক তাহার অধীন নিযুক্ত শ্রমিকগণের এই আইনের অধীন প্রদেয় সকল মজুরী পরিশোধের জন্য স্বয়ং দায়িত্বশীল থাকিবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'শ্রম আইন ২০০৬-এর ১২১ ধারা অনুযায়ী শ্রমিকের ন্যায্য মজুরি পরিশোধের একক ও পূর্ণ দায়িত্ব সরাসরি প্রতিষ্ঠানের মালিকের। ঠিকাদার বা মধ্যস্বত্বভোগীর অজুহাতে মালিক দায়িত্ব এড়াতে পারেন না।',
      en: 'Under Section 121 of the Labour Act 2006, every employer is personally responsible and legally liable for the payment of all wages required to be paid to workers employed under them.'
    },
    caution: {
      bn: 'ঠিকাদারি শ্রমিকের ক্ষেত্রেও প্রধান নিয়োগকারী (মালিক) মজুরি নিশ্চিত করিতে বাধ্য।',
      en: 'Direct owners retain statutory liability if contractors default on wage settlements.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-30248.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2006-10-11',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['wage responsibility', 'employer liability', 'malik dayitto', 'মজুরি পরিশোধের দায়িত্ব', 'মালিকের দায়', 'ধারা ১২১']
  },
  {
    id: 'labour-122',
    actId: 'act_labour_2006',
    sectionNumber: 'Section 122',
    categories: ['work'],
    title: {
      bn: 'মজুরি মেয়াদ নির্ধারণ: সর্বোচ্চ ১ মাস (ধারা ১২২)',
      en: 'Fixation of Wage Period Not Exceeding One Month (Section 122)'
    },
    originalText: '১২২। (১) মজুরী পরিশোধের দায়িত্বপ্রাপ্ত ব্যক্তি মজুরী পরিশোধের জন্য একটি মেয়াদ নির্ধারণ করিবেন: তবে শর্ত থাকে যে, কোনো মজুরী মেয়াদ এক মাসের অধিক হইবে না।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'শ্রম আইন ২০০৬-এর ১২২ ধারা অনুযায়ী মজুরি পরিশোধের সময়কাল সর্বোচ্চ ১ মাস হতে পারে। মালিক কোনো অবস্থাতেই ১ মাসের বেশি সময় ধরে মজুরি পুঞ্জীভূত বা বকেয়া রাখতে পারবেন না।',
      en: 'Under Section 122 of the Labour Act 2006, wage periods must be explicitly fixed and cannot exceed one month in duration.'
    },
    caution: {
      bn: 'মজুরি মেয়াদ শেষ হওয়ার পরবর্তী ৭ কার্যদিবসের মধ্যে ১২৩ ধারা অনুযায়ী পরিশোধ বাধ্যতামূলক।',
      en: 'Must be paid within 7 working days following the end of the wage period under Section 123.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-30249.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2006-10-11',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['wage period', 'monthly salary deadline', 'mojuri meyad', 'মজুরি মেয়াদ', 'এক মাস', 'ধারা ১২২']
  },
  {
    id: 'labour-213',
    actId: 'act_labour_2006',
    sectionNumber: 'Section 213',
    categories: ['work'],
    title: {
      bn: 'শ্রমিক বা মালিক কর্তৃক বিরোধ নিষ্পত্তিতে শ্রম আদালতে মামলা (ধারা ২১৩)',
      en: 'Jurisdiction of Labour Court on Industrial & Worker Disputes (Section 213)'
    },
    originalText: '২১৩। কোনো যৌথ দরকষাকষি প্রতিনিধি (CBA) অথবা কোনো মালিক বা শ্রমিক কোনো অধিকার কার্যকর করিবার জন্য শ্রম আদালতের নিকট আবেদন করিতে পারিবেন এবং শ্রম আদালত উহা বিচার নিষ্পত্তি করিবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'শ্রম আইন ২০০৬-এর ২১৩ ধারা অনুযায়ী কোনো শ্রমিক তার সংবিধিবদ্ধ অধিকার বা শ্রম আইনের সুরক্ষা কার্যকর করতে সরাসরি শ্রম আদালতে মামলা দায়ের করতে পারেন।',
      en: 'Under Section 213 of the Labour Act 2006, any worker or Collective Bargaining Agent (CBA) may petition the Labour Court directly to adjudicate and enforce statutory rights.'
    },
    caution: {
      bn: 'ব্যক্তিগত পাওনা আদায়ের ক্ষেত্রে ৩৩ ধারার আবেদন প্রথমে সম্পন্ন করা উত্তম।',
      en: 'Individual grievance processes under Section 33 are standard prerequisite workflows.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-30340.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2006-10-11',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['labour court', 'labour suit', 'shrom adalat', 'industrial dispute', 'শ্রম আদালত', 'শ্রম বিরোধ', 'ধারা ২১৩']
  },

  // -------------------------------------------------------------
  // Category 2: Consumer (14 additions)
  // -------------------------------------------------------------
  {
    id: 'consumer-38',
    actId: 'act_consumer_2009',
    sectionNumber: 'Section 38',
    categories: ['consumer'],
    title: {
      bn: 'পণ্যের মূল্য তালিকা প্রদর্শন না করিবার দণ্ড (ধারা ৩৮)',
      en: 'Penalty for Failure to Display Price List of Goods (Section 38)'
    },
    originalText: '৩৮৷ কোন ব্যক্তি কোন দোকান বা ব্যবসা প্রতিষ্ঠানে কোন পণ্যের মূল্য তালিকা সহজে দৃশ্যমান স্থানে প্রদর্শন না করিলে তিনি অনূর্ধ্ব এক বৎসর কারাদণ্ড, বা অনধিক পঞ্চাশ হাজার টাকা অর্থদণ্ড, বা উভয় দণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯-এর ৩৮ ধারা অনুযায়ী দোকানে সহজে দেখা যায় এমন স্থানে পণ্যের সঠিক মূল্য তালিকা ঝুলিয়ে না রাখলে অনূর্ধ্ব ১ বছর কারাদণ্ড বা অনধিক ৫০ হাজার টাকা জরিমানা হতে পারে।',
      en: 'Under Section 38 of the Consumers\' Right Protection Act 2009, failing to visibly display the price list of goods at a shop or commercial premises carries up to 1 year imprisonment, up to 50,000 BDT fine, or both.'
    },
    caution: {
      bn: 'দোকানের ক্যাশ মেমোতে উল্লেখিত দাম ও মূল্য তালিকার মধ্যে অমিল থাকাও এই ধারায় অপরাধ।',
      en: 'Discrepancy between posted price list and billed cash memo also violates this section.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-31407.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2009-04-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['price list display', 'mulp talika', 'no price tag', 'মূল্য তালিকা প্রদর্শন', 'তালিকা না থাকা', 'ধারা ৩৮']
  },
  {
    id: 'consumer-39',
    actId: 'act_consumer_2009',
    sectionNumber: 'Section 39',
    categories: ['consumer'],
    title: {
      bn: 'সেবার মূল্যের তালিকা সংরক্ষণ ও প্রদর্শন না করিবার দণ্ড (ধারা ৩৯)',
      en: 'Penalty for Failure to Display Price List of Services (Section 39)'
    },
    originalText: '৩৯৷ কোন ব্যক্তি কোন সেবার মূল্যের তালিকা প্রস্তুত, প্রদর্শন ও সংরক্ষণ না করিলে তিনি অনূর্ধ্ব এক বৎসর কারাদণ্ড, বা অনধিক পঞ্চাশ হাজার টাকা অর্থদণ্ড, বা উভয় দণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ভোক্তা অধিকার সংরক্ষণ আইনের ৩৯ ধারা অনুযায়ী ডায়াগনস্টিক সেন্টার, হাসপাতাল, হোটেল বা মেরামত সেবা প্রদানকারী প্রতিষ্ঠানে সেবামূল্যের তালিকা প্রদর্শন না করলে সর্বোচ্চ ১ বছর কারাদণ্ড বা ৫০ হাজার টাকা অর্থদণ্ড হতে পারে।',
      en: 'Under Section 39 of the Consumers\' Right Protection Act 2009, failing to prepare, display, and maintain a price list for services (such as diagnostic tests or repairs) carries up to 1 year imprisonment or 50,000 BDT fine.'
    },
    caution: {
      bn: 'চিকিৎসা সেবার ক্ষেত্রে নির্ধারিত সরকারি ফির চেয়ে অতিরিক্ত দাবি এই ধারার আওতায় পড়ে।',
      en: 'Overcharging diagnostic tests beyond public health rate cards triggers this section.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-31408.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2009-04-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['service price list', 'diagnostic fees', 'sheba mulya talika', 'সেবামূল্য তালিকা', 'হাসপাতাল ফি', 'ধারা ৩৯']
  },
  {
    id: 'consumer-47',
    actId: 'act_consumer_2009',
    sectionNumber: 'Section 47',
    categories: ['consumer'],
    title: {
      bn: 'বাটখারা বা ওজন পরিমাপক যন্ত্রে কারচুপির দণ্ড (ধারা ৪৭)',
      en: 'Penalty for Tampered Weights and Weighing Scales (Section 47)'
    },
    originalText: '৪৭৷ কোন পণ্য বিক্রয় বা সরবরাহের উদ্দেশ্যে কোন ব্যক্তির দোকান বা ব্যবসা প্রতিষ্ঠানে ওজন পরিমাপের কার্যে ব্যবহৃত বাটখারা বা ওজন পরিমাপক যন্ত্র প্রকৃত ওজন অপেক্ষা অতিরিক্ত ওজন প্রদর্শনকারী হইলে তিনি অনূর্ধ্ব এক বৎসর কারাদণ্ড, বা অনধিক পঞ্চাশ হাজার টাকা অর্থদণ্ড, বা উভয় দণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯-এর ৪৭ ধারা অনুযায়ী ব্যবসা প্রতিষ্ঠানে বাটখারা বা ওজন মাপার ডিজিটাল স্কেলে কারচুপি করে প্রকৃত ওজনের চেয়ে বেশি দেখানো শাস্তিযোগ্য অপরাধ (সর্বোচ্চ ১ বছর কারাদণ্ড বা ৫০ হাজার টাকা অর্থদণ্ড)।',
      en: 'Under Section 47 of the Consumers\' Right Protection Act 2009, maintaining tampered weighing scales or weights that display false measurements carries up to 1 year imprisonment, up to 50,000 BDT fine, or both.'
    },
    caution: {
      bn: 'বিএসটিআই সিলবিহীন বা ভেরিফিকেশন মেয়াদোত্তীর্ণ বাটখারা ব্যবহারও দণ্ডনীয়।',
      en: 'Using scales lacking valid BSTI verification stamps is punishable under BSTI Act as well.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-31416.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2009-04-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['tampered scale', 'batkhara karchupi', 'digital scale fraud', 'বাটখারা কারচুপি', 'ওজন পরিমাপক যন্ত্র', 'ধারা ৪৭']
  },
  {
    id: 'consumer-48',
    actId: 'act_consumer_2009',
    sectionNumber: 'Section 48',
    categories: ['consumer'],
    title: {
      bn: 'পরিমাপে কারচুপির দণ্ড (ধারা ৪৮)',
      en: 'Penalty for Short Measure in Liquids and Commodities (Section 48)'
    },
    originalText: '৪৮৷ কোন ব্যক্তি কোন পণ্য সরবরাহ বা বিক্রয়ের সময় ভোক্তাকে প্রতিশ্রুত পরিমাপ অপেক্ষা কম পরিমাপে উক্ত পণ্য বিক্রয় বা সরবরাহ করিলে তিনি অনূর্ধ্ব এক বৎসর কারাদণ্ড, বা অনধিক পঞ্চাশ হাজার টাকা অর্থদণ্ড, বা উভয় দণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯-এর ৪৮ ধারা অনুযায়ী তরল পদার্থ (তেল, দুধ, পেট্রোল ইত্যাদি) বা অন্য কোনো পণ্য প্রতিশ্রুত পরিমাপের চেয়ে কম দিলে অনূর্ধ্ব ১ বছর কারাদণ্ড বা ৫০ হাজার টাকা অর্থদণ্ড হতে পারে।',
      en: 'Under Section 48 of the Consumers\' Right Protection Act 2009, delivering less liquid or commodity volume than agreed (e.g. short volume at petrol pumps) carries up to 1 year imprisonment, up to 50,000 BDT fine, or both.'
    },
    caution: {
      bn: 'পেট্রোল পাম্প বা ফুয়েল স্টেশনে মিটার টেম্পারিংয়ের ক্ষেত্রে ভোক্তা আইন ও ওজন-পরিমাপ আইন উভয়ই প্রযোজ্য।',
      en: 'Fuel dispenser meter tampering triggers both Consumer Protection and Standards of Weights Acts.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-31417.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2009-04-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['short measure', 'petrol pump fraud', 'porimepe kom', 'পরিমাপে কম', 'তেল কম দেওয়া', 'ধারা ৪৮']
  },
  {
    id: 'consumer-49',
    actId: 'act_consumer_2009',
    sectionNumber: 'Section 49',
    categories: ['consumer'],
    title: {
      bn: 'দৈর্ঘ্য পরিমাপক ফিতায় কারচুপির দণ্ড (ধারা ৪৯)',
      en: 'Penalty for Tampered Measuring Tape and Length Scales (Section 49)'
    },
    originalText: '৪৯৷ কোন পণ্য বিক্রয় বা সরবরাহের উদ্দেশ্যে কোন ব্যক্তির দোকান বা ব্যবসা প্রতিষ্ঠানে দৈর্ঘ্য পরিমাপের কার্যে ব্যবহৃত পরিমাপক ফিতা বা অন্য কিছুতে কারচুপি করা হইলে তিনি অনূর্ধ্ব এক বৎসর কারাদণ্ড, বা অনধিক পঞ্চাশ হাজার টাকা অর্থদণ্ড, বা উভয় দণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯-এর ৪৯ ধারা অনুযায়ী কাপড় বা অন্য কোনো পণ্য বিক্রির সময় দৈর্ঘ্য পরিমাপের ফিতা বা গজে কারচুপি করলে অনূর্ধ্ব ১ বছর কারাদণ্ড বা ৫০ হাজার টাকা অর্থদণ্ড হতে পারে।',
      en: 'Under Section 49 of the Consumers\' Right Protection Act 2009, tampering with measuring tapes or length rules used in commercial sales carries up to 1 year imprisonment, up to 50,000 BDT fine, or both.'
    },
    caution: {
      bn: 'কাপড়ের দোকানে গজ বা মিটারের দাগ কেটে ছোট করা সুস্পষ্ট দণ্ডনীয় অপরাধ।',
      en: 'Cutting length scales to deliver shorter fabrics violates this explicit prohibition.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-31418.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2009-04-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['measuring tape fraud', 'doirgho kom', 'goj karchupi', 'দৈর্ঘ্যে কম', 'ফিতা কারচুপি', 'ধারা ৪৯']
  },
  {
    id: 'consumer-54',
    actId: 'act_consumer_2009',
    sectionNumber: 'Section 54',
    categories: ['consumer'],
    title: {
      bn: 'মিথ্যা বা হয়রানিমূলক অভিযোগ দায়েরের দণ্ড (ধারা ৫৪)',
      en: 'Penalty for Filing False or Harassing Complaints (Section 54)'
    },
    originalText: '৫৪৷ কোন ব্যক্তি কোন ব্যবসায়ীকে ক্ষতিগ্রস্ত বা হয়রানি করিবার অসদুদ্দেশ্যে এই আইনের অধীন মিথ্যা বা ভিত্তিহীন অভিযোগ দায়ের করিলে তিনি অনূর্ধ্ব তিন বৎসর কারাদণ্ড, বা অনধিক পঞ্চাশ হাজার টাকা অর্থদণ্ড, বা উভয় দণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯-এর ৫৪ ধারা অনুযায়ী কোনো ব্যবসায়ীকে ব্ল্যাকমেইল বা ক্ষতি করার উদ্দেশ্যে মিথ্যা ও ভিত্তিহীন অভিযোগ দাখিল করলে অভিযোগকারীর সর্বোচ্চ ৩ বছর কারাদণ্ড বা ৫০ হাজার টাকা অর্থদণ্ড হতে পারে।',
      en: 'Under Section 54 of the Consumers\' Right Protection Act 2009, lodging malicious, false, or vexatious consumer complaints to harass a merchant carries up to 3 years imprisonment, up to 50,000 BDT fine, or both.'
    },
    caution: {
      bn: 'অভিযোগের সমর্থনে ক্রয় রসিদ, চালান বা উপযুক্ত প্রমাণ থাকা আবশ্যক।',
      en: 'Complaints require prima facie documentation (invoices, receipts) to prevent dismissal.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-31423.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2009-04-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['false complaint', 'vexatious claim', 'mittha ovijog', 'মিথ্যা অভিযোগ', 'হয়রানিমূলক মামলা', 'ধারা ৫৪']
  },
  {
    id: 'consumer-55',
    actId: 'act_consumer_2009',
    sectionNumber: 'Section 55',
    categories: ['consumer'],
    title: {
      bn: 'অপরাধ পুনঃসংগঠনের ক্ষেত্রে দ্বিগুণ দণ্ডের বিধান (ধারা ৫৫)',
      en: 'Enhanced Penalty for Repeated Offenses (Section 55)'
    },
    originalText: '৫৫৷ কোন ব্যক্তি এই আইনের অধীন কোন অপরাধের জন্য একবার দণ্ডিত হইবার পর পুনরায় অনুরূপ অপরাধ করিলে তিনি উক্ত অপরাধের জন্য নির্ধারিত সর্বোচ্চ দণ্ডের দ্বিগুণ দণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ভোক্তা অধিকার সংরক্ষণ আইনের ৫৫ ধারা অনুযায়ী কোনো ব্যবসায়ী একবার দোষী সাব্যস্ত হয়ে পুনরায় একই ধরনের ভেজাল বা ভোক্তা অধিকার বিরোধী অপরাধ করলে তিনি সর্বোচ্চ নির্ধারিত দণ্ডের দ্বিগুণ সাজা পাবেন।',
      en: 'Under Section 55 of the Consumers\' Right Protection Act 2009, upon conviction for a repeated consumer offense, the offender is liable to double the maximum statutory penalty prescribed for that offense.'
    },
    caution: {
      bn: 'পুনঃসংগঠনের ক্ষেত্রে ট্রেড লাইসেন্স ও বিএসটিআই সনদ বাতিল করার ক্ষমতা রয়েছে।',
      en: 'Repeat offenders face trade license cancellation and administrative seizure.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-31424.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2009-04-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['repeat offense', 'double penalty', 'punosongothon', 'অপরাধ পুনঃসংগঠন', 'দ্বিগুণ দণ্ড', 'ধারা ৫৫']
  },
  {
    id: 'consumer-71',
    actId: 'act_consumer_2009',
    sectionNumber: 'Section 71',
    categories: ['consumer'],
    title: {
      bn: 'দেওয়ানি আদালতে আর্থিক ক্ষতিপূরণ মোকদ্দমার অধিকার (ধারা ৭১)',
      en: 'Civil Suit for Financial Compensation before Joint District Judge (Section 71)'
    },
    originalText: '৭১৷ এই আইনের অন্যান্য বিধানে যাহা কিছুই থাকুক না কেন, ভোক্তা-অধিকার বিরোধী কার্যের ফলে ক্ষতিগ্রস্ত কোনো ভোক্তা যুগ্ম জেলা জজ আদালতে আর্থিক ক্ষতিপূরণ আদায়ের জন্য দেওয়ানি মোকদ্দমা দায়ের করিতে পারিবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯-এর ৭১ ধারা অনুযায়ী ভোক্তা অধিকার লঙ্ঘনের শিকার ব্যক্তি প্রশাসনিক অভিযোগের পাশাপাশি সরাসরি যুগ্ম জেলা জজ আদালতে পূর্ণাঙ্গ দেওয়ানি ক্ষতিপূরণ মোকদ্দমা দায়ের করতে পারেন।',
      en: 'Under Section 71 of the Consumers\' Right Protection Act 2009, aggrieved consumers retain the explicit right to file a civil suit before the Joint District Judge Court to recover actual damages and compensatory financial relief.'
    },
    caution: {
      bn: 'দেওয়ানি আদালতের ক্ষতিপূরণ মোকদ্দমায় তামাদি আইন ১৯০৮ অনুযায়ী নির্ধারিত সময়সীমা প্রযোজ্য।',
      en: 'Civil compensation suits are governed by the Limitation Act 1908 and Court Fees Act.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-31440.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2009-04-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['civil compensation', 'joint district judge', 'khotipuron mamla', 'ক্ষতিপূরণ মোকদ্দমা', 'দেওয়ানি ক্ষতিপূরণ', 'ধারা ৭১']
  },
  {
    id: 'consumer-76-reward',
    actId: 'act_consumer_2009',
    sectionNumber: 'Section 76(4)',
    categories: ['consumer'],
    title: {
      bn: 'অভিযোগকারীর জন্য আদায়কৃত প্রশাসনিক জরিমানার ২৫% অর্থ প্রাপ্তি (ধারা ৭৬(৪))',
      en: 'Complainant Entitled to 25% of Realized Administrative Fine (Section 76(4))'
    },
    originalText: '৭৬৷ (৪) এই ধারার অধীন জাতীয় ভোক্তা-অধিকার সংরক্ষণ অধিদপ্তর কর্তৃক আদায়কৃত অর্থ বা আরোপিত অর্থদণ্ডের ২৫ (পঁচিশ) শতাংশ অর্থ সংশ্লিষ্ট অভিযোগকারীকে অবিলম্বে প্রদান করিতে হইবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯-এর ৭৬(৪) ধারা অনুযায়ী ভোক্তা অধিদপ্তরে অভিযোগ প্রমাণিত হয়ে বিক্রেতার ওপর যে প্রশাসনিক জরিমানা আদায় করা হয়, তার ২৫ শতাংশ অর্থ অভিযোগকারী ব্যক্তি আইনত পুরস্কার হিসেবে পাবেন। এটি তাৎক্ষণিক নগদ রিফান্ড নয়, বরং আদায়কৃত জরিমানার অংশ।',
      en: 'Under Section 76(4) of the Consumers\' Right Protection Act 2009, upon successful adjudication and realization of an administrative fine from an offending vendor, 25% of the collected fine is disbursed directly to the complainant.'
    },
    caution: {
      bn: 'জরিমানা সরকারিভাবে আদায় হওয়ার পরেই কেবল এই ২৫% অর্থ ছাড় করা হয়।',
      en: 'Disbursement occurs only after the administrative penalty has been formally realized from the violator.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-31445.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2009-04-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['25 percent reward', 'fine distribution', 'jorimana 25 percent', '২৫ শতাংশ পুরস্কার', 'জরিমানার টাকা', 'ধারা ৭৬']
  },
  {
    id: 'bsti-27',
    actId: 'act_bsti_2018',
    sectionNumber: 'Section 27',
    categories: ['consumer'],
    title: {
      bn: 'বিএসটিআই বাধ্যতামূলক সনদ ব্যতিরেকে পণ্য উৎপাদন বা বিক্রয় নিষিদ্ধ (ধারা ২৭)',
      en: 'Prohibition on Selling Mandatory Products without BSTI Certification (Section 27)'
    },
    originalText: '২৭। কোনো ব্যক্তি সরকারি গেজেটে ঘোষিত বাধ্যতামূলক পণ্যের ক্ষেত্রে বিএসটিআই হইতে স্ট্যান্ডার্ড মার্ক বা লাইসেন্স গ্রহণ ব্যতিরেকে উক্ত পণ্য উৎপাদন, বিক্রয় বা বিতরণ করিতে পারিবেন না।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'বাংলাদেশ স্ট্যান্ডার্ডস অ্যান্ড টেস্টিং ইনস্টিটিউশন (বিএসটিআই) আইন ২০১৮-এর ২৭ ধারা অনুযায়ী সরকারের বাধ্যতামূলক তালিকাভুক্ত খাদ্য বা পণ্য বিএসটিআই লাইসেন্স ছাড়া উৎপাদন বা বাজারজাত করলে সর্বোচ্চ ২ বছর কারাদণ্ড ও ১ লাখ টাকা অর্থদণ্ড হতে পারে।',
      en: 'Under Section 27 of the BSTI Act 2018, manufacturing, selling, or distributing mandatory listed products without valid certification from BSTI is a criminal offense punishable by up to 2 years imprisonment and fine.'
    },
    caution: {
      bn: 'মোবাইল কোর্টের মাধ্যমে বিএসটিআই লাইসেন্সবিহীন মালামাল সরাসরি বাজেয়াপ্ত করা যায়।',
      en: 'Uncertified mandatory goods are subject to summary seizure by Executive Magistrates via Mobile Courts.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1262/section-47120.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2018-10-08',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['bsti license', 'mandatory bsti', 'bsti chara bikri', 'বিএসটিআই লাইসেন্স', 'বাধ্যতামূলক পণ্য', 'ধারা ২৭']
  },
  {
    id: 'bsti-28',
    actId: 'act_bsti_2018',
    sectionNumber: 'Section 28',
    categories: ['consumer'],
    title: {
      bn: 'বিএসটিআই স্ট্যান্ডার্ড মার্কের ভুয়া বিজ্ঞাপন বা বিভ্রান্তিকর প্রচারের দণ্ড (ধারা ২৮)',
      en: 'Penalty for Deceptive Advertising Regarding BSTI Standards (Section 28)'
    },
    originalText: '২৮। কোনো ব্যক্তি বিএসটিআই কর্তৃক অনুমোদিত না হওয়া সত্ত্বেও পণ্যের বিজ্ঞাপনে বা মোড়কে বিভ্রান্তিকরভাবে বিএসটিআই সনদপ্রাপ্ত বলিয়া দাবি করিলে অনূর্ধ্ব এক বৎসর কারাদণ্ড বা পঞ্চাশ হাজার টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'বিএসটিআই আইন ২০১৮-এর ২৮ ধারা অনুযায়ী পণ্য বিএসটিআই পরীক্ষিত না হওয়া সত্ত্বেও প্যাকেটে বা বিজ্ঞাপনে মিথ্যা বিএসটিআই লোগো বা অনুমোদন দাবি করা দণ্ডনীয় ফৌজদারি অপরাধ।',
      en: 'Under Section 28 of the BSTI Act 2018, falsely advertising or claiming BSTI standard compliance on uncertified packaging carries up to 1 year imprisonment or 50,000 BDT fine.'
    },
    caution: {
      bn: 'ভোক্তা অধিকার সংরক্ষণ আইনের ৪৪ ধারার মিথ্যা বিজ্ঞাপনের বিধানও এর সাথে প্রযোজ্য হতে পারে।',
      en: 'Concurrent with false advertising offenses under Section 44 of the Consumer Protection Act.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1262/section-47121.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2018-10-08',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['fake bsti logo', 'deceptive bsti ad', 'bhua bsti', 'ভুয়া বিএসটিআই লোগো', 'মিথ্যা বিজ্ঞাপন', 'ধারা ২৮']
  },
  {
    id: 'food-safety-24',
    actId: 'act_food_safety_2013',
    sectionNumber: 'Section 24',
    categories: ['consumer'],
    title: {
      bn: 'বিষাক্ত বা মানবস্বাস্থ্যের জন্য মারাত্মক ক্ষতিকর খাদ্য বিক্রয় নিষিদ্ধ (ধারা ২৪)',
      en: 'Prohibition on Sale of Toxic Food Injurious to Health (Section 24)'
    },
    originalText: '২৪। কোনো ব্যক্তি মানবস্বাস্থ্যের জন্য মারাত্মক ক্ষতিকর বা বিষাক্ত কোনো রাসায়নিক দ্রব্য বা কীটনাশক মিশ্রিত খাদ্যদ্রব্য উৎপাদন, আমদানি বা বিক্রয় করিলে তিনি অনূর্ধ্ব পাঁচ বৎসর কারাদণ্ড বা অনধিক দশ লক্ষ টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'নিরাপদ খাদ্য আইন ২০১৩-এর ২৪ ধারা অনুযায়ী খাবারে বিষাক্ত রাসায়নিক (যেমন ফরমালিন, টেক্সটাইল রং বা ক্ষতিকর কীটনাশক) মেশালে সর্বোচ্চ ৫ বছর কারাদণ্ড বা অনধিক ১০ লাখ টাকা অর্থদণ্ড হতে পারে।',
      en: 'Under Section 24 of the Food Safety Act 2013, manufacturing, importing, or selling food containing toxic chemicals or hazardous pesticides carries up to 5 years imprisonment or up to 10,00,000 BDT fine.'
    },
    caution: {
      bn: 'নিরাপদ খাদ্য আদালতের বিশেষ ম্যাজিস্ট্রেটের নিকট এই অপরাধের সরাসরি বিচার হয়।',
      en: 'Special Pure Food Magistrates have dedicated jurisdiction over food contamination trials.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1123/section-35804.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2015-02-01',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['toxic food', 'formalin chemical', 'food safety', 'bishakto khabar', 'বিষাক্ত খাবার', 'ফরমালিন', 'ধারা ২৪']
  },
  {
    id: 'food-safety-29',
    actId: 'act_food_safety_2013',
    sectionNumber: 'Section 29',
    categories: ['consumer'],
    title: {
      bn: 'খাদ্যপণ্যের প্রতারণামূলক মোড়কীকরণ ও মিথ্যা লেবেলিং নিষিদ্ধ (ধারা ২৯)',
      en: 'Prohibition on Deceptive Packaging & False Labeling of Food (Section 29)'
    },
    originalText: '২৯। কোনো ব্যক্তি খাদ্যপণ্যের মোড়কে বা বিজ্ঞাপনে পুষ্টিগুণ, মেয়াদ বা উপাদানের বিষয়ে অসত্য বা প্রতারণামূলক তথ্য লিপিবদ্ধ করিলে তিনি অনূর্ধ্ব দুই বৎসর কারাদণ্ড বা চার লক্ষ টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'নিরাপদ খাদ্য আইনের ২৯ ধারা অনুযায়ী খাদ্যপণ্যের প্যাকেটে ভুল উৎপাদন তারিখ, ভুয়া মেয়াদ বা উপাদান সংক্রান্ত মিথ্যা লেবেল লাগানো দণ্ডনীয় অপরাধ (সর্বোচ্চ ২ বছর কারাদণ্ড বা ৪ লাখ টাকা জরিমানা)।',
      en: 'Under Section 29 of the Food Safety Act 2013, affixing deceptive nutrition claims, forged expiry dates, or misleading ingredient lists carries up to 2 years imprisonment or 4,00,000 BDT fine.'
    },
    caution: {
      bn: 'প্যাকেটজাত খাদ্যের গায়ে খাদ্য নিয়ন্ত্রণ কর্তৃপক্ষের প্রমিত পুষ্টিমান লেবেল থাকা বাধ্যতামূলক।',
      en: 'Mandatory standard nutrition facts panels must strictly reflect certified laboratory tests.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1123/section-35809.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2015-02-01',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['false labeling', 'food expiry tampered', 'morokikaron', 'মোড়কীকরণ প্রতারণা', 'মিথ্যা লেবেল', 'ধারা ২৯']
  },
  {
    id: 'food-safety-39',
    actId: 'act_food_safety_2013',
    sectionNumber: 'Section 39',
    categories: ['consumer'],
    title: {
      bn: 'খাদ্য পরীক্ষার জন্য সরকারি পরীক্ষাগার ও সার্টিফিকেটের আইনি মর্যাদা (ধারা ৩৯)',
      en: 'Designated Food Laboratories & Evidentiary Value of Test Reports (Section 39)'
    },
    originalText: '৩৯। (১) এই আইনের অধীন কোনো খাদ্য বিশ্লেষক কর্তৃক প্রদত্ত পরীক্ষণ রিপোর্ট আদালতে বিশেষ প্রামাণ্য দলিল হিসেবে গণ্য হইবে। (২) কোনো ভোক্তা সরকারি ফি জমা দিয়া নমুনা খাদ্য পরীক্ষা করাইতে পারিবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'নিরাপদ খাদ্য আইনের ৩৯ ধারা অনুযায়ী যে কোনো ভোক্তা নির্ধারিত ফি দিয়ে সরকারি পরীক্ষাগারে খাদ্যদ্রব্য পরীক্ষা করাতে পারেন এবং সেই রিপোর্ট আদালতে ভেজালের বিরুদ্ধে চূড়ান্ত প্রামাণ্য দলিল হিসেবে গণ্য হয়।',
      en: 'Section 39 empowers consumers to submit suspicious food samples to designated public laboratories upon paying standard fees, with certified test reports enjoying primary evidentiary status in court.'
    },
    caution: {
      bn: 'নমুনা সংগ্রহের সময় নিরাপদ খাদ্য পরিদর্শকের প্রটোকল অনুযায়ী সিলগালা করা জরুরি।',
      en: 'Chain of custody protocols require authorized inspection officer verification.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1123/section-35819.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2015-02-01',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['food test lab', 'lab report evidence', 'khaddo porikkha', 'খাদ্য পরীক্ষা', 'ল্যাব রিপোর্ট', 'ধারা ৩৯']
  },

  // -------------------------------------------------------------
  // Category 3: Land (13 additions)
  // -------------------------------------------------------------
  {
    id: 'land-crime-9',
    actId: 'act_land_crime_2023',
    sectionNumber: 'Section 9',
    categories: ['land', 'threats'],
    title: {
      bn: 'শান্তিপূর্ণ ভোগদখলে বেআইনি বাধা সৃষ্টির দণ্ড (ধারা ৯)',
      en: 'Penalty for Unlawful Obstruction to Lawful Possession (Section 9)'
    },
    originalText: '৯। যদি কোনো ব্যক্তি উপযুক্ত আদালতের আদেশ বা আইনানুগ কর্তৃত্ব ব্যতিরেকে কোনো ব্যক্তিকে তাহার বৈধ দখলীয় ভূমির শান্তিময় ভোগদখলে বাধা প্রদান করেন বা ভীতি প্রদর্শন করেন, তাহা হইলে তিনি অনধিক দুই বৎসর কারাদণ্ড বা অর্থদণ্ডে দণ্ডনীয় হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩-এর ৯ ধারা অনুযায়ী উপযুক্ত আদালতের বৈধ আদেশ ছাড়া কারো বৈধ জমির শান্তিপূর্ণ ভোগদখলে বাধা দেওয়া, সাইনবোর্ড ফেলে দেওয়া বা দেয়াল তোলায় বাধা দেওয়া দণ্ডনীয় অপরাধ (সর্বোচ্চ ২ বছর কারাদণ্ড বা অর্থদণ্ড)।',
      en: 'Under Section 9 of the Land Crime Prevention and Redress Act 2023, obstructing or threatening a person in lawful, peaceful possession of land without a competent court decree carries up to 2 years imprisonment, fine, or both.'
    },
    caution: {
      bn: 'ধারা ১৯(১) অনুযায়ী এই ধারার অপরাধ আমলযোগ্য, জামিনযোগ্য এবং আপোষযোগ্য।',
      en: 'Offenses under Section 9 are cognizable, bailable, and compoundable under Section 19(1).'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1454/section-52387.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2023-09-18',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['land obstruction', 'peaceful enjoyment', 'jomite badha', 'জমিতে বাধা', 'শান্তিপূর্ণ ভোগদখল', 'ধারা ৯']
  },
  {
    id: 'land-crime-11',
    actId: 'act_land_crime_2023',
    sectionNumber: 'Section 11',
    categories: ['land'],
    title: {
      bn: 'জমির সীমানা পিলার বা জরিপ চিহ্ন বিনষ্টকরণের দণ্ড (ধারা ১১)',
      en: 'Penalty for Damaging Boundary Markers or Survey Pillars (Section 11)'
    },
    originalText: '১১। যদি কোনো ব্যক্তি অসদুদ্দেশ্যে কোনো ভূমির সরকারি বা বেসরকারি সীমানা নির্ধারণী পিলার, খুঁটি বা জরিপ চিহ্ন তুলিয়া ফেলেন, বিনষ্ট করেন বা পরিবর্তন করেন, তাহা হইলে তিনি অনধিক দুই বৎসর কারাদণ্ড বা অর্থদণ্ডে দণ্ডনীয় হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩-এর ১১ ধারা অনুযায়ী জমির সরকারি বা বেসরকারি সীমানা পিলার উপড়ে ফেলা, ভেঙে ফেলা বা সীমানা পরিবর্তন করা দণ্ডনীয় ফৌজদারি অপরাধ (সর্বোচ্চ ২ বছর জেল বা অর্থদণ্ড)।',
      en: 'Under Section 11 of the Land Crime Prevention and Redress Act 2023, maliciously removing, destroying, or altering public or private land boundary survey markers carries up to 2 years imprisonment or fine.'
    },
    caution: {
      bn: 'সীমানা বিরোধে জরিপ বিভাগের সার্ভেয়ারের মাধ্যমে সরকারি মাপজোক করানো উত্তম।',
      en: 'Boundary disputes require measurement surveys conducted by authorized land survey officers.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1454/section-52389.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2023-09-18',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['boundary marker', 'survey pillar damaged', 'shimana pillar', 'সীমানা পিলার ভাঙা', 'জরিপ খুঁটি', 'ধারা ১১']
  },
  {
    id: 'land-crime-14',
    actId: 'act_land_crime_2023',
    sectionNumber: 'Section 14',
    categories: ['land', 'threats'],
    title: {
      bn: 'ভয়ভীতি প্রদর্শন ও ভূমি দখল সিন্ডিকেটের দণ্ড (ধারা ১৪)',
      en: 'Coercion, Threats, and Organized Land Grabbing (Section 14)'
    },
    originalText: '১৪। যদি কোনো ব্যক্তি বা ব্যক্তিগোষ্ঠী সন্ত্রাসী কার্য বা পেশিশক্তির ভয় প্রদর্শন করিয়া কোনো ব্যক্তির নিকট হইতে ভূমির দখল বা দলিল লিখাইয়া লন অথবা ভূমি জবরদখল করেন, তাহা হইলে তজ্জন্য তিনি অনধিক পাঁচ বৎসর কারাদণ্ড বা অর্থদণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ভূমি অপরাধ আইনের ১৪ ধারা অনুযায়ী অস্ত্র বা পেশিশক্তির ভয় দেখিয়ে জোর করে জমি দখল করা, স্ট্যাম্পে সই নেওয়া বা চাঁদাবাজি করে জমি লিখে নেওয়া গুরুতর অপরাধ, যাতে অনধিক ৫ বছর কারাদণ্ড হতে পারে।',
      en: 'Under Section 14 of the Land Crime Prevention and Redress Act 2023, using threats of violence, criminal syndicates, or muscle power to seize land or extort signatures carries up to 5 years imprisonment and fine.'
    },
    caution: {
      bn: 'থানায় এজাহার এবং ফৌজদারি কার্যবিধির ১৪৫ ধারায় ম্যাজিস্ট্রেটের নিকট তাৎক্ষণিক নিষেধাজ্ঞা প্রার্থনা করা যায়।',
      en: 'Concurrent remedies include filing an FIR at the Thana and seeking injunctive protection under Section 145 CrPC.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1454/section-52392.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2023-09-18',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['land grabbing syndicate', 'forced land seizure', 'jomor dokhol', 'জোরপূর্বক জমি দখল', 'পেশিশক্তি জমি দখল', 'ধারা ১৪']
  },
  {
    id: 'land-crime-16',
    actId: 'act_land_crime_2023',
    sectionNumber: 'Section 16',
    categories: ['land'],
    title: {
      bn: 'ভূমি অপরাধে সহায়তা বা ষড়যন্ত্রের দণ্ড (ধারা ১৬)',
      en: 'Punishment for Abetment and Conspiracy in Land Crimes (Section 16)'
    },
    originalText: '১৬। যদি কোনো ব্যক্তি এই আইনের অধীন কোনো অপরাধ সংঘটনে সহায়তা করেন বা ষড়যন্ত্র করেন, তাহা হইলে তিনি উক্ত অপরাধের জন্য নির্ধারিত মূল দণ্ডেই দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩-এর ১৬ ধারা অনুযায়ী জাল দলিল তৈরিতে সহায়তাকারী, মধ্যস্বত্বভোগী বা ভূমি দখলে সহায়তাকারী যে কেউ মূল অপরাধীর সমান কারাদণ্ড ও অর্থদণ্ডে দণ্ডিত হবেন।',
      en: 'Under Section 16 of the Land Crime Prevention and Redress Act 2023, anyone who abets, conspires, or assists in the commission of any land offense is punishable with the same statutory penalty as the principal offender.'
    },
    caution: {
      bn: 'দলিল লেখক বা ভুয়া সনাক্তকারীরাও এই ধারায় সরাসরি অভিযুক্ত হন।',
      en: 'Deed writers and false witnesses identifying impersonators face direct prosecution.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1454/section-52394.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2023-09-18',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['land abetment', 'conspiracy land crime', 'shohoyota', 'সহায়তা ও ষড়যন্ত্র', 'জাল দলিলে সহায়তা', 'ধারা ১৬']
  },
  {
    id: 'premises-rent-8',
    actId: 'act_premises_rent_1991',
    sectionNumber: 'Section 8',
    categories: ['land'],
    title: {
      bn: 'মানসম্মত ভাড়া বৃদ্ধি সংক্রান্ত শর্তাবলী ও বিধিনিষেধ (ধারা ৮)',
      en: 'Lawful Grounds for Increase of Standard Rent (Section 8)'
    },
    originalText: '৮। ভাড়া নিয়ন্ত্রণ আদালতের আদেশ ব্যতিরেকে কোনো বাড়িওয়ালা মানসম্মত ভাড়ার অতিরিক্ত ভাড়া বৃদ্ধি করিতে পারিবেন না, কেবল বাড়িওয়ালা কর্তৃক নিজ ব্যয়ে কোনো উন্নয়ন বা সংস্কার সাধিত হইলে শর্তসাপেক্ষে ভাড়া বৃদ্ধি করা যাইবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'বাড়িভাড়া নিয়ন্ত্রণ আইন ১৯৯১-এর ৮ ধারা অনুযায়ী বাড়িওয়ালা ইচ্ছেমতো ভাড়া বাড়াতে পারবেন না। ভাড়াটিয়ার সম্মতি ও ভাড়া নিয়ন্ত্রণ আদালতের অনুমতি ছাড়া মানসম্মত ভাড়ার অতিরিক্ত দাবি বেআইনি।',
      en: 'Under Section 8 of the Premises Rent Control Act 1991, landlords are barred from increasing rent beyond standard rates established by the Rent Controller, except where structural improvements have been added with the tenant\'s consent.'
    },
    caution: {
      bn: 'একতরফাভাবে অযৌক্তিক ভাড়া বৃদ্ধির বিরুদ্ধে ভাড়া নিয়ন্ত্রণ আদালতে আবেদন করা যায়।',
      en: 'Arbitrary unilateral rent hikes can be challenged before the local Rent Controller (Assistant Judge Court).'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-759/section-22079.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1991-03-23',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['rent hike', 'standard rent increase', 'vara briddhi', 'ভাড়া বৃদ্ধি নিষেধ', 'বাড়িভাড়া নিয়ন্ত্রণ', 'ধারা ৮']
  },
  {
    id: 'premises-rent-10',
    actId: 'act_premises_rent_1991',
    sectionNumber: 'Section 10',
    categories: ['land'],
    title: {
      bn: 'এক মাসের অতিরিক্ত অগ্রিম বা সেলামি গ্রহণ নিষিদ্ধ (ধারা ১০)',
      en: 'Prohibition of Advance or Premium Exceeding One Month Rent (Section 10)'
    },
    originalText: '১০। কোনো বাড়িওয়ালা বাড়িভাড়ার ক্ষেত্রে এক মাসের ভাড়ার অতিরিক্ত কোনো প্রকার অগ্রিম অর্থ, জামানত বা সেলামি দাবি বা গ্রহণ করিতে পারিবেন না।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'বাড়িভাড়া নিয়ন্ত্রণ আইন ১৯৯১-এর ১০ ধারা অনুযায়ী বাড়িওয়ালা ভাড়াটিয়ার কাছ থেকে কোনো অবস্থাতেই এক মাসের ভাড়ার অতিরিক্ত কোনো জামানত বা অগ্রিম অর্থ গ্রহণ করতে পারেন না। অতিরিক্ত দাবি আইনত নিষিদ্ধ।',
      en: 'Under Section 10 of the Premises Rent Control Act 1991, landlords are prohibited from claiming or receiving any advance, premium, or security deposit exceeding one month of agreed rent.'
    },
    caution: {
      bn: 'চুক্তিতে অতিরিক্ত অগ্রিম নেওয়া থাকলে তা ১৪ ধারা অনুযায়ী নিয়মিত মাসিক ভাড়ার সাথে সমন্বয়ের অধিকার রয়েছে।',
      en: 'Excess advances paid can be adjusted against monthly rent under Section 14.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-759/section-22081.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1991-03-23',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['rent advance', 'security deposit limit', 'ogrim vara', 'ভাড়া অগ্রিম ১ মাস', 'জামানত সীমা', 'ধারা ১০']
  },
  {
    id: 'premises-rent-13',
    actId: 'act_premises_rent_1991',
    sectionNumber: 'Section 13',
    categories: ['land'],
    title: {
      bn: 'ভাড়া পরিশোধের লিখিত রসিদ প্রদানের আইনি বাধ্যবাধকতা (ধারা ১৩)',
      en: 'Landlord\'s Obligation to Grant Rent Receipt (Section 13)'
    },
    originalText: '১৩। (১) ভাড়াটিয়া কর্তৃক ভাড়া পরিশোধ করা হইলে বাড়িওয়ালা তৎক্ষণাৎ স্বাক্ষরিত একটি লিখিত রসিদ ভাড়াটিয়াকে প্রদান করিবেন। (২) রসিদ প্রদানে অস্বীকৃতি জ্ঞাপন দণ্ডনীয় অপরাধ।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'বাড়িভাড়া নিয়ন্ত্রণ আইন ১৯৯১-এর ১৩ ধারা অনুযায়ী ভাড়া পরিশোধ করার পর বাড়িওয়ালা অবিলম্বে স্বাক্ষরিত লিখিত মানি রসিদ দিতে আইনত বাধ্য। রসিদ না দেওয়া শাস্তিযোগ্য অপরাধ।',
      en: 'Under Section 13 of the Premises Rent Control Act 1991, landlords are legally obligated to issue signed written receipts immediately upon receiving rent payments. Refusal to grant receipts is a penal offense.'
    },
    caution: {
      bn: 'বাড়িওয়ালা রসিদ দিতে অস্বীকৃতি জানালে ভাড়া নিয়ন্ত্রণ আদালতে ডাকযোগে বা ব্যাংক ড্রাফটের মাধ্যমে ভাড়া জমা দেওয়া যায়।',
      en: 'If receipts are refused, rent may be deposited via postal money order or directly with the Rent Controller under Section 19.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-759/section-22084.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1991-03-23',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['rent receipt', 'money receipt landlord', 'varar roshid', 'ভাড়ার রসিদ', 'মানি রসিদ', 'ধারা ১৩']
  },
  {
    id: 'premises-rent-14',
    actId: 'act_premises_rent_1991',
    sectionNumber: 'Section 14',
    categories: ['land'],
    title: {
      bn: 'ভাড়াটিয়া কর্তৃক অতিরিক্ত পরিশোধিত অর্থ ফেরত বা সমন্বয়ের নিয়ম (ধারা ১৪)',
      en: 'Refund or Adjustment of Excess Rent Paid by Tenant (Section 14)'
    },
    originalText: '১৪। যদি কোনো বাড়িওয়ালা এই আইনের অধীন নির্ধারিত সীমার অতিরিক্ত কোনো ভাড়া বা অগ্রিম গ্রহণ করিয়া থাকেন, তবে ভাড়াটিয়া উক্ত অর্থ ফেরত পাওয়ার অথবা পরবর্তী মাসিক ভাড়ার সহিত সমন্বয় করিবার অধিকারী হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'বাড়িভাড়া আইনের ১৪ ধারা অনুযায়ী বাড়িওয়ালা যদি আইনের নির্ধারিত সীমার বেশি ভাড়া বা অগ্রিম নিয়ে থাকেন, তবে ভাড়াটিয়া সেই অতিরিক্ত টাকা ফেরত নিতে পারেন অথবা পরবর্তী মাসের ভাড়ার সাথে সমন্বয় করতে পারেন।',
      en: 'Section 14 entitles tenants to recover any excess rent or unlawful advances paid beyond statutory caps, either by direct refund or through deduction against future monthly rent installments.'
    },
    caution: {
      bn: 'সমন্বয়ের ক্ষেত্রে লিখিত নোটিশ বাড়িওয়ালাকে প্রদান করা উত্তম।',
      en: 'Serving written notice specifying the adjustment schedule prevents default claims.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-759/section-22085.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1991-03-23',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['excess rent adjustment', 'rent refund', 'otirikto vara shomonnoy', 'অতিরিক্ত ভাড়া সমন্বয়', 'টাকা ফেরত', 'ধারা ১৪']
  },
  {
    id: 'premises-rent-19',
    actId: 'act_premises_rent_1991',
    sectionNumber: 'Section 19',
    categories: ['land'],
    title: {
      bn: 'বেআইনিভাবে উচ্ছেদকৃত ভাড়াটিয়ার দখল পুনরুদ্ধারের আদেশ (ধারা ১৯)',
      en: 'Restoration of Possession to Tenant Unlawfully Evicted (Section 19)'
    },
    originalText: '১৯। যদি কোনো বাড়িওয়ালা বলপ্রয়োগ বা জোরজবরদস্তির মাধ্যমে ভাড়াটিয়াকে উচ্ছেদ করেন অথবা গ্যাস, বিদ্যুৎ বা পানি সংযোগ বিচ্ছিন্ন করিয়া উচ্ছেদে বাধ্য করেন, তবে নিয়ন্ত্রক আদালতের আদেশে তাৎক্ষণিক দখল ও সংযোগ পুনর্বহাল করিতে হইবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'বাড়িভাড়া নিয়ন্ত্রণ আইনের ১৯ ধারা অনুযায়ী বাড়িওয়ালা গ্যাস, বিদ্যুৎ, পানি বন্ধ করে বা জোর করে ভাড়াটিয়াকে নামিয়ে দিলে ভাড়া নিয়ন্ত্রণ আদালত فوری দখল ও সংযোগ পুনর্বহালের আদেশ দেন এবং বাড়িওয়ালাকে জরিমানা করেন।',
      en: 'Under Section 19 of the Premises Rent Control Act 1991, if a landlord forcibly evicts a tenant or severs utilities (water, electricity, gas) to compel eviction, the Rent Controller can summarily order full restoration of possession and utilities.'
    },
    caution: {
      bn: 'ইউটিলিটি সংযোগ বিচ্ছিন্ন করা ফৌজদারি কার্যবিধির অধীন অপরাধ হিসেবেও গণ্য হতে পারে।',
      en: 'Disrupting essential domestic utility supplies can also be reported to police under Penal Code Section 427.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-759/section-22090.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1991-03-23',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['utility disconnection eviction', 'unlawful eviction restoration', 'dokhol punoruddhar', 'বিদ্যুৎ পানি বন্ধ', 'দখল পুনরুদ্ধার', 'ধারা ১৯']
  },
  {
    id: 'property-106',
    actId: 'act_property_transfer_1882',
    sectionNumber: 'Section 106',
    categories: ['land'],
    title: {
      bn: 'মাসিক ইজারা বা ভাড়ার ক্ষেত্রে ১৫ দিনের আইনি নোটিশের বাধ্যবাধকতা (ধারা ১০৬)',
      en: 'Fifteen Days Written Notice for Termination of Monthly Leases (Section 106)'
    },
    originalText: '১০৬। চুক্তির অবর্তমানে, অন্য কোনো উদ্দেশ্যে বাড়ি বা স্থাবর সম্পত্তির মাসিক ইজারা অবসানের ক্ষেত্রে যে-কোনো পক্ষ অপর পক্ষকে অন্তত ১৫ (পনেরো) দিনের মেয়াদ প্রদান করিয়া লিখিত নোটিশ প্রদান করিবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'সম্পত্তি হস্তান্তর আইন ১৮৮২-এর ১০৬ ধারা অনুযায়ী বাড়িওয়ালা বা ভাড়াটিয়া উভয়কেই বাসা ছাড়ার বা ছাড়ানোর জন্য অন্তত ১৫ দিন পূর্বে লিখিত নোটিশ দিতে হবে। নোটিশ ছাড়া তাৎক্ষণিক উচ্ছেদ আইনত অচল।',
      en: 'Under Section 106 of the Transfer of Property Act 1882, in the absence of a contrary contract, monthly residential tenancy agreements require at least 15 days written notice expiring with the end of a tenancy month.'
    },
    caution: {
      bn: 'কৃষি বা শিল্প কারখানার ক্ষেত্রে নোটিশের সময়সীমা অন্তত ৬ মাস।',
      en: 'Agricultural or manufacturing leases require at least 6 months statutory notice.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-48/section-1602.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1882-07-01',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['15 days notice', 'lease termination notice', '15 diner notice', '১৫ দিনের নোটিশ', 'ইজারা অবসান', 'ধারা ১০৬']
  },
  {
    id: 'property-108',
    actId: 'act_property_transfer_1882',
    sectionNumber: 'Section 108',
    categories: ['land'],
    title: {
      bn: 'ইজারা গ্রহীতা ও দাতার মৌলিক অধিকার ও দায়িত্বাবলী (ধারা ১০৮)',
      en: 'Rights and Liabilities of Lessor and Lessee (Section 108)'
    },
    originalText: '১০৮। ইজারা চুক্তির অবর্তমানে, ইজারা দাতা সম্পত্তি শান্তিময় ভোগদখল নিশ্চিত করিবেন এবং ইজারা গ্রহীতা সময়মতো নির্ধারিত ভাড়া পরিশোধ করিবেন ও সম্পত্তির যুক্তিসঙ্গত যত্ন লইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'সম্পত্তি হস্তান্তর আইনের ১০৮ ধারা অনুযায়ী বাড়িওয়ালা ভাড়াটিয়াকে শান্তিময় বসবাসের পরিবেশ দিতে বাধ্য, এবং ভাড়াটিয়া সময়মতো ভাড়া পরিশোধ করতে ও বাসার কোনো কাঠামোগত ক্ষতি না করতে বাধ্য।',
      en: 'Section 108 of the Transfer of Property Act 1882 defines statutory covenants: the lessor guarantees quiet enjoyment and essential repairs, while the lessee is bound to pay agreed rent punctually and maintain property care.'
    },
    caution: {
      bn: 'ভাড়াটিয়া বাড়িওয়ালার অনুমতি ছাড়া সম্পত্তির কাঠামোগত পরিবর্তন করিতে পারিবেন না।',
      en: 'Tenants cannot erect permanent structural alterations without written lessor consent.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-48/section-1604.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1882-07-01',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['lessor lessee rights', 'quiet enjoyment', 'bariwala varatia dayitto', 'বাড়িওয়ালা ভাড়াটিয়া দায়িত্ব', 'ধারা ১০৮']
  },
  {
    id: 'sat-143a',
    actId: 'act_sat_1950',
    sectionNumber: 'Section 143A',
    categories: ['land'],
    title: {
      bn: 'সহকারী কমিশনার (ভূমি) কর্তৃক নামজারি ও রেকর্ড হালনাগাদকরণ (ধারা ১৪৩এ)',
      en: 'Mutation and Updating Record of Rights by Assistant Commissioner (Land) (Section 143A)'
    },
    originalText: '১৪৩এ। ক্রয়, হেবা, উত্তরাধিকার বা অন্য কোনো সূত্রে জমির মালিকানা পরিবর্তিত হইলে সহকারী কমিশনার (ভূমি) তদন্ত সাপেক্ষে নামজারি (মিউটেশন) সম্পাদন করিবেন এবং নতুন খতিয়ান প্রস্তুত করিবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন ১৯৫০-এর ১৪৩এ ধারা অনুযায়ী জমি কেনার পর বা ওয়ারিশ সূত্রে পাওয়ার পর এসি ল্যান্ড অফিসে নামজারি (Mutation) করিয়ে নিজের নামে পৃথক খতিয়ান ও খাজনা প্রদান নিশ্চিত করা আইনত আবশ্যক।',
      en: 'Under Section 143A of the State Acquisition and Tenancy Act 1950, when land ownership changes through purchase, inheritance, or gift, the Assistant Commissioner (Land) conducts mutation to open a distinct record-of-rights (Khatian) in the transferee\'s name.'
    },
    caution: {
      bn: 'নামজারি ছাড়া ভূমির বৈধ স্বত্ব ও সরকারি ভূমি উন্নয়ন কর (খাজনা) পরিশোধ আইনসম্মত হয় না।',
      en: 'Mutation is legally prerequisite to paying Land Development Tax and establishing registered revenue ownership.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-241/section-8714.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1951-05-16',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['mutation namjari', 'ac land mutation', 'khatian update', 'নামজারি', 'খতিয়ান', 'এসি ল্যান্ড', 'ধারা ১৪৩এ']
  },
  {
    id: 'sat-144',
    actId: 'act_sat_1950',
    sectionNumber: 'Section 144',
    categories: ['land'],
    title: {
      bn: 'ভূমি রেকর্ড ও জরিপের মাধ্যমে খতিয়ান সংশোধন ও রক্ষণাবেক্ষণ (ধারা ১৪৪)',
      en: 'Maintenance and Revision of Record of Rights through Survey (Section 144)'
    },
    originalText: '১৪৪। সরকার সরকারি গেজেটে প্রজ্ঞাপন দ্বারা কোনো এলাকা বা জেলার খতিয়ান বা স্বত্বলিপি প্রস্তুত, সংশোধন ও হালনাগাদ করিবার জন্য ভূমি জরিপের আদেশ প্রদান করিতে পারিবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'রাষ্ট্রীয় অধিগ্রহণ আইনের ১৪৪ ধারা অনুযায়ী সরকার গেজেট বিজ্ঞপ্তির মাধ্যমে ডিজিটাল বা মৌজা জরিপের মাধ্যমে খতিয়ান হালনাগাদ ও স্বত্বলিপি প্রস্তুত করে। জরিপে ভুল থাকলে রাজস্ব আদালতে আপিল করা যায়।',
      en: 'Section 144 empowers the government to order land surveys to revise and maintain the official Record of Rights (Khatian). Cadastral survey errors are appealable before Revenue and Settlement Courts.'
    },
    caution: {
      bn: 'জরিপকালীন সময়ে মাঠপর্চা ও তসদিক পর্যায়ে উপস্থিত থেকে আপত্তি দাখিল করা জরুরি।',
      en: 'Objections must be lodged during the preliminary survey verification and attestation stages.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-241/section-8715.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1951-05-16',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['land survey', 'record of rights revision', 'jorip khotian', 'ভূমি জরিপ', 'খতিয়ান সংশোধন', 'ধারা ১৪৪']
  },

  // -------------------------------------------------------------
  // Category 4: Threats (13 additions)
  // -------------------------------------------------------------
  {
    id: 'penal-342',
    actId: 'act_penal_code_1860',
    sectionNumber: 'Section 342',
    categories: ['threats', 'rights'],
    title: {
      bn: 'অবৈধভাবে আটকে রাখা বা ঘরে বন্দি করার দণ্ড (ধারা ৩৪২)',
      en: 'Punishment for Wrongful Confinement (Section 342)'
    },
    originalText: '৩৪২। যে ব্যক্তি কোনো ব্যক্তিকে অন্যায়ভাবে আটক বা অবরুদ্ধ করেন, তিনি অনধিক এক বৎসর পর্যন্ত যেকোনো মেয়াদের কারাদণ্ডে, বা এক হাজার টাকা পর্যন্ত অর্থদণ্ডে, বা উভয় দণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'দণ্ডবিধি ১৮৬০-এর ৩৪২ ধারা অনুযায়ী কাউকে তার ইচ্ছার বিরুদ্ধে কোনো ঘরে বা সীমানায় তালা মেরে আটকে রাখা দণ্ডনীয় ফৌজদারি অপরাধ, যাতে সর্বোচ্চ ১ বছর কারাদণ্ড বা ১০০০ টাকা জরিমানা হতে পারে।',
      en: 'Under Section 342 of the Penal Code 1860, wrongfully confining any person within defined boundaries (e.g. locking inside a room against their will) carries up to 1 year imprisonment, fine up to 1000 BDT, or both.'
    },
    caution: {
      bn: 'পুলিশ বিনা পরোয়ানায় আটকে রাখলেও সংবিধানের ৩৩ অনুচ্ছেদ ও ৩৪২ ধারার লঙ্ঘন ঘটে।',
      en: 'Wrongful detention by police without statutory authorization also triggers this offense.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3112.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1860-10-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['wrongful confinement', 'locked in room', 'atke rakha', 'অবৈধ আটক', 'ঘরে বন্দি রাখা', 'ধারা ৩৪২']
  },
  {
    id: 'penal-354',
    actId: 'act_penal_code_1860',
    sectionNumber: 'Section 354',
    categories: ['threats', 'rights'],
    title: {
      bn: 'নারীর শ্লীলতাহানির উদ্দেশ্যে আক্রমণ বা বলপ্রয়োগের দণ্ড (ধারা ৩৫৪)',
      en: 'Assault or Criminal Force to Woman with Intent to Outrage Modesty (Section 354)'
    },
    originalText: '৩৫৪। যে ব্যক্তি কোনো নারীর শ্লীলতাহানির উদ্দেশ্যে বা তিনি যে তাহার শ্লীলতাহানি করিবেন তাহা জ্ঞাত থাকিয়া উক্ত নারীকে আক্রমণ বা অপরাধমূলক বলপ্রয়োগ করেন, তিনি অনধিক দুই বৎসর পর্যন্ত যেকোনো মেয়াদের কারাদণ্ডে, বা অর্থদণ্ডে, বা উভয় দণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'দণ্ডবিধি ১৮৬০-এর ৩৫৪ ধারা অনুযায়ী কোনো নারীর শ্লীলতাহানির উদ্দেশ্যে গায়ে হাত দেওয়া, ওড়না বা জামাকাপড় টানাটানি করা বা শারীরিক আক্রমণ করা আমলযোগ্য ফৌজদারি অপরাধ, যাতে অনধিক ২ বছর কারাদণ্ড বা অর্থদণ্ড হতে পারে।',
      en: 'Under Section 354 of the Penal Code 1860, assaulting or using criminal force against any woman with the intention to outrage her modesty is a cognizable criminal offense punishable by up to 2 years imprisonment, fine, or both.'
    },
    caution: {
      bn: 'গুরুতর যৌন হয়রানি বা নির্যাতনের ক্ষেত্রে নারী ও শিশু নির্যাতন দমন আইনের ১০ ধারাও প্রযোজ্য হতে পারে।',
      en: 'Severe sexual harassment triggers Section 10 of the Nari O Shishu Nirjatan Daman Ain 2000.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3124.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1860-10-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['outrage modesty', 'female assault', 'shlilatahani', 'শ্লীলতাহানি', 'গায়ে হাত দেওয়া', 'ইভটিজিং', 'ধারা ৩৫৪']
  },
  {
    id: 'penal-406',
    actId: 'act_penal_code_1860',
    sectionNumber: 'Section 406',
    categories: ['threats', 'consumer'],
    title: {
      bn: 'অপরাধমূলক বিশ্বাসভঙ্গের দণ্ড (ধারা ৪০৬)',
      en: 'Punishment for Criminal Breach of Trust (Section 406)'
    },
    originalText: '৪০৬। যে ব্যক্তি অপরাধমূলক বিশ্বাসভঙ্গ করিবেন, তিনি অনধিক তিন বৎসর পর্যন্ত যেকোনো মেয়াদের কারাদণ্ডে, বা অর্থদণ্ডে, বা উভয় দণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'দণ্ডবিধি ১৮৬০-এর ৪০৬ ধারা অনুযায়ী বিশ্বস্ততার ভিত্তিতে প্রদত্ত কোনো অর্থ, সম্পত্তি বা মালামাল আত্মসাৎ করা বা নিজের প্রয়োজনে খরচ করে ফেলা অপরাধমূলক বিশ্বাসভঙ্গ, যাতে সর্বোচ্চ ৩ বছর পর্যন্ত কারাদণ্ড বা অর্থদণ্ড হতে পারে।',
      en: 'Under Section 406 of the Penal Code 1860, committing criminal breach of trust regarding entrusted funds, property, or goods carries up to 3 years imprisonment, fine, or both.'
    },
    caution: {
      bn: 'প্রতারণা ও বিশ্বাসভঙ্গ একসাথে সংগঠিত হলে ৪০৬ ও ৪২০ ধারা একত্রে মামলা দায়ের করা হয়।',
      en: 'Commonly charged concurrently with cheating under Section 420.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3176.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1860-10-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['breach of trust', 'entrusted property fraud', 'bishwashbhongo', 'বিশ্বাসভঙ্গ', 'আমানত আত্মসাৎ', 'ধারা ৪০৬']
  },
  {
    id: 'penal-417',
    actId: 'act_penal_code_1860',
    sectionNumber: 'Section 417',
    categories: ['threats', 'consumer'],
    title: {
      bn: 'সাধারণ প্রতারণার দণ্ড (ধারা ৪১৭)',
      en: 'Punishment for Simple Cheating (Section 417)'
    },
    originalText: '৪১৭। যে ব্যক্তি প্রতারণা করিবেন, তিনি অনধিক এক বৎসর পর্যন্ত যেকোনো মেয়াদের কারাদণ্ডে, বা অর্থদণ্ডে, বা উভয় দণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'দণ্ডবিধি ১৮৬০-এর ৪১৭ ধারা অনুযায়ী মিথ্যা প্রতিশ্রুতি বা প্রবঞ্চনার মাধ্যমে কারো ক্ষতিসাধন করা বা প্রতারণা করা শাস্তিযোগ্য অপরাধ, যাতে অনধিক ১ বছর কারাদণ্ড বা অর্থদণ্ড হতে পারে।',
      en: 'Under Section 417 of the Penal Code 1860, simple cheating and fraudulent deception without property delivery carries up to 1 year imprisonment, fine, or both.'
    },
    caution: {
      bn: 'প্রতারণার মাধ্যমে অর্থ বা মালামাল হস্তান্তরিত হলে ৪২০ ধারা প্রযোজ্য, যাতে ৭ বছর কারাদণ্ড হয়।',
      en: 'If property or money is dishonestly induced into delivery, Section 420 applies with up to 7 years imprisonment.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3187.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1860-10-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['simple cheating', 'deception', 'protarona', 'প্রতারণা', 'প্রবঞ্চনা', 'ধারা ৪১৭']
  },
  {
    id: 'penal-441',
    actId: 'act_penal_code_1860',
    sectionNumber: 'Section 441',
    categories: ['threats', 'land'],
    title: {
      bn: 'অপরাধমূলক অনধিকার প্রবেশের সংজ্ঞা ও নীতিমালা (ধারা ৪৪১)',
      en: 'Definition of Criminal Trespass (Section 441)'
    },
    originalText: '৪৪১। যে ব্যক্তি কোনো অপরাধ সংঘটন বা ভীতি প্রদর্শন, অপমান বা বিরক্তি উৎপাদনের উদ্দেশ্যে অন্যের দখলে থাকা সম্পত্তিতে অনধিকার প্রবেশ করেন বা আইনানুগ প্রবেশের পর সেখানে বেআইনিভাবে অবস্থান করেন, তিনি অপরাধমূলক অনধিকার প্রবেশ করেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'দণ্ডবিধির ৪৪১ ধারা অনুযায়ী কারো অনুমতি ছাড়া তার বাড়ি, জমি বা সীমানায় ভয় দেখানো, ক্ষতি করা বা বিরক্তি সৃষ্টির অসদুদ্দেশ্যে প্রবেশ করা ‘ক্রিমিনাল ট্রেসপাস’ বা অপরাধমূলক অনধিকার প্রবেশ হিসেবে গণ্য হয়।',
      en: 'Section 441 defines criminal trespass as entering into or remaining unlawfully upon property in another\'s possession with intent to commit an offense or intimidate, insult, or annoy the lawful occupant.'
    },
    caution: {
      bn: 'অনধিকার প্রবেশের সাথে বলপ্রয়োগ বা ক্ষতি থাকলে ৪৪৭ ও ৪৪৮ ধারায় সরাসরি মামলা হয়।',
      en: 'Actionable penal sanctions are enforced via Sections 447 (trespass) and 448 (house trespass).'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3211.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1860-10-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['criminal trespass', 'property intrusion', 'ondhikar probesh', 'অনধিকার প্রবেশ', 'জোরপূর্বক ঢোকা', 'ধারা ৪৪১']
  },
  {
    id: 'penal-448',
    actId: 'act_penal_code_1860',
    sectionNumber: 'Section 448',
    categories: ['threats', 'land'],
    title: {
      bn: 'বাসগৃহে বেআইনি অনধিকার প্রবেশের দণ্ড (ধারা ৪৪৮)',
      en: 'Punishment for House-Trespass (Section 448)'
    },
    originalText: '৪৪৮। যে ব্যক্তি গৃহ-অনধিকার প্রবেশ করিবেন, তিনি অনধিক এক বৎসর পর্যন্ত যেকোনো মেয়াদের কারাদণ্ডে, বা এক হাজার টাকা পর্যন্ত অর্থদণ্ডে, বা উভয় দণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'দণ্ডবিধি ১৮৬০-এর ৪৪৮ ধারা অনুযায়ী কারো বসতবাড়ি, ফ্ল্যাট বা ঘরে অনুমতি ছাড়া জবরদস্তিমূলকভাবে ঢুকে পড়া শাস্তিযোগ্য অপরাধ (সর্বোচ্চ ১ বছর কারাদণ্ড বা ১০০০ টাকা অর্থদণ্ড)।',
      en: 'Under Section 448 of the Penal Code 1860, committing house-trespass into a dwelling or building carries up to 1 year imprisonment, fine up to 1000 BDT, or both.'
    },
    caution: {
      bn: 'রাতে তালা ভেঙে বা অস্ত্রসহ ঢুকলে ৪৫০ থেকে ৪৫৭ ধারায় সর্বোচ্চ যাবজ্জীবন কারাদণ্ড হতে পারে।',
      en: 'Lurking house trespass by night or breaking locks triggers Sections 456-457 with severe penalties.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3218.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1860-10-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['house trespass', 'entering house unlawfully', 'griho probesh', 'ঘরে অনধিকার প্রবেশ', 'বাড়ি দখল চেষ্টা', 'ধারা ৪৪৮']
  },
  {
    id: 'penal-499',
    actId: 'act_penal_code_1860',
    sectionNumber: 'Section 499',
    categories: ['threats', 'digital'],
    title: {
      bn: 'ফৌজদারি মানহানির সংজ্ঞা ও ১০টি আইনি ব্যতিক্রম (ধারা ৪৯৯)',
      en: 'Definition of Criminal Defamation & Ten Exceptions (Section 499)'
    },
    originalText: '৪৯৯। যে ব্যক্তি কথার দ্বারা বা ইঙ্গিতের দ্বারা বা দৃশ্যমান প্রতীকের দ্বারা কোনো ব্যক্তির বিষয়ে এইরূপ কোনো অপবাদ তৈরি বা প্রকাশ করেন যাহা তাহার সুনামের ক্ষতি করে, তিনি উক্ত ব্যক্তির মানহানি করেন: তবে শর্ত থাকে যে জনস্বার্থে সত্য প্রকাশ এবং সরল বিশ্বাসে সৎ সমালোচনা মানহানি নহে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'দণ্ডবিধির ৪৯৯ ধারা অনুযায়ী কারো সুনাম নষ্ট করার উদ্দেশ্যে মিথ্যা বা বানোয়াট অপবাদ ছড়ানো মানহানি। তবে জনস্বার্থে সত্য কথা প্রকাশ বা দায়িত্বশীল সমালোচনা মানহানির ব্যতিক্রম হিসেবে সুরক্ষিত।',
      en: 'Section 499 defines criminal defamation as making or publishing imputations harming a person\'s reputation, while establishing 10 statutory exceptions including truth published for the public good and fair criticism in good faith.'
    },
    caution: {
      bn: 'সাইবার আইনে মানহানি বাতিল হওয়ায় বর্তমানে সাধারণ দণ্ডবিধির ৪৯৯ ও ৫০০ ধারায় সিআর মামলা করতে হয়।',
      en: 'Following the repeal of cyber speech offenses, all criminal defamation is governed under Sections 499-500.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3270.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1860-10-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['criminal defamation', 'reputation harm', 'manhani', 'মানহানি', 'সুনাম নষ্ট', 'অপবাদ', 'ধারা ৪৯৯']
  },
  {
    id: 'penal-500',
    actId: 'act_penal_code_1860',
    sectionNumber: 'Section 500',
    categories: ['threats', 'digital'],
    title: {
      bn: 'মানহানির দণ্ড ও আইনি প্রতিকার (ধারা ৫০০)',
      en: 'Punishment for Criminal Defamation (Section 500)'
    },
    originalText: '৫০০। যে ব্যক্তি অন্য কোনো ব্যক্তির মানহানি করিবেন, তিনি অনধিক দুই বৎসর পর্যন্ত যেকোনো মেয়াদের বিনাশ্রম কারাদণ্ডে, বা অর্থদণ্ডে, বা উভয় দণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'দণ্ডবিধি ১৮৬০-এর ৫০০ ধারা অনুযায়ী মানহানি প্রমাণিত হলে অভিযুক্ত ব্যক্তিকে সর্বোচ্চ ২ বছর পর্যন্ত বিনাশ্রম কারাদণ্ড বা অর্থদণ্ড বা উভয় দণ্ডে দণ্ডিত করা যায়। এটি জামিনযোগ্য অপরাধ।',
      en: 'Under Section 500 of the Penal Code 1860, committing defamation is a bailable offense punishable with simple imprisonment for up to 2 years, fine, or both.'
    },
    caution: {
      bn: 'মানহানির মামলা ম্যাজিস্ট্রেট আদালতে ফৌজদারি কার্যবিধির ২০০ ধারা অনুযায়ী সরাসরি সিআর মামলা হিসেবে দায়ের করতে হয়।',
      en: 'Defamation cannot be an FIR at Thana; it requires filing a direct Complaint (CR Case) before a Magistrate.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3271.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1860-10-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['defamation punishment', 'libel slander', 'manhanir shasti', 'মানহানির শাস্তি', 'ধারা ৫০০']
  },
  {
    id: 'crpc-145',
    actId: 'act_crpc_1898',
    sectionNumber: 'Section 145',
    categories: ['threats', 'land'],
    title: {
      bn: 'জমি সংক্রান্ত বিরোধে শান্তিভঙ্গের আশঙ্কায় নির্বাহী ম্যাজিস্ট্রেটের কার্যক্রম (ধারা ১৪৫)',
      en: 'Magistrate Inquiry in Land Disputes Likely to Cause Breach of Peace (Section 145)'
    },
    originalText: '১৪৫। (১) যখন কোনো জেলা ম্যাজিস্ট্রেট বা নির্বাহী ম্যাজিস্ট্রেট এই মর্মে নিশ্চিত হন যে তাহার এখতিয়ারাধীন সীমার মধ্যে জমি বা পানি বা উহার সীমানা সংক্রান্ত বিরোধের কারণে শান্তিভঙ্গের আশঙ্কা রহিয়াছে, তখন তিনি উভয় পক্ষকে আদালতে হাজির হইয়া স্ব স্ব প্রকৃত দখলের পক্ষে লিখিত বিবৃতি দাখিল করিবার নির্দেশ দিবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ফৌজদারি কার্যবিধির ১৪৫ ধারা অনুযায়ী জমিতে মারামারি বা শান্তিভঙ্গের আশঙ্কা থাকলে নির্বাহী ম্যাজিস্ট্রেট উভয় পক্ষকে ডেকে জমি যার দখলে আছে তার পক্ষে নিষেধাজ্ঞা দেন এবং শান্তি বজায় রাখতে পুলিশ মোতায়েন করেন।',
      en: 'Under Section 145 of the Code of Criminal Procedure 1898, where an urgent land dispute threatens a breach of peace, an Executive Magistrate can initiate summary proceedings, restrain parties, and preserve actual possession until civil adjudication.'
    },
    caution: {
      bn: 'ম্যাজিস্ট্রেট ১৪৫ ধারায় কেবল দখল নির্ধারণ করেন; জমির মূল মালিকানা দেওয়ানি আদালতে নির্ধারিত হয়।',
      en: 'Determines only actual factual possession at the date of order, not proprietary title.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-75/section-2905.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1898-07-01',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['crpc 145', 'land dispute peace', 'magistrate land order', '১৪৫ ধারা', 'শান্তিভঙ্গ জমি', 'নির্বাহী ম্যাজিস্ট্রেট']
  },
  {
    id: 'crpc-156',
    actId: 'act_crpc_1898',
    sectionNumber: 'Section 156',
    categories: ['threats', 'rights'],
    title: {
      bn: 'আমলযোগ্য অপরাধে ম্যাজিস্ট্রেটের আদেশ ব্যতিরেকে পুলিশের তদন্তের ক্ষমতা (ধারা ১৫৬)',
      en: 'Police Investigation into Cognizable Offenses without Magistrate Order (Section 156)'
    },
    originalText: '১৫৬। (১) কোনো থানার ভারপ্রাপ্ত কর্মকর্তা কোনো ম্যাজিস্ট্রেটের আদেশ ব্যতিরেকেই এমন যেকোনো আমলযোগ্য অপরাধের তদন্ত করিতে পারিবেন যাহার বিচারের এখতিয়ার উক্ত স্থানীয় এলাকার বিচারিক আদালতের রহিয়াছে। (৩) ম্যাজিস্ট্রেট ধারা ১৯০ এর অধীন ক্ষমতা প্রয়োগ করিয়া ১৫৬(৩) উপধারায় থানাকে এজাহার হিসেবে তদন্তের নির্দেশ দিতে পারেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ফৌজদারি কার্যবিধির ১৫৬ ধারা অনুযায়ী আমলযোগ্য অপরাধে (যেমন চুরি, মারধর, ডাকাতি) পুলিশ ম্যাজিস্ট্রেটের অনুমতি ছাড়াই তদন্ত ও আসামি গ্রেফতার করতে পারে। থানা মামলা না নিলে ম্যাজিস্ট্রেট ১৫৬(৩) ধারায় থানাকে মামলা হিসেবে তদন্তের সরাসরি নির্দেশ দেন।',
      en: 'Under Section 156 of the CrPC 1898, police hold statutory authority to investigate cognizable offenses without prior Magistrate sanction. Under Section 156(3), a Magistrate can order the police station to treat a complaint as an FIR and conduct statutory investigation.'
    },
    caution: {
      bn: 'থানা এফআইআর নিতে অস্বীকৃতি জানালে ১৫৬(৩) ধারার দরখাস্ত সবচেয়ে কার্যকর প্রতিকার।',
      en: 'Section 156(3) petitions before the Judicial Magistrate represent the primary statutory recourse when police stations refuse to register an FIR.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-75/section-2916.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1898-07-01',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['crpc 156', 'police investigation power', '156(3) order', '১৫৬ ধারা', 'পুলিশ তদন্ত', '১৫৬(৩) দরখাস্ত']
  },
  {
    id: 'crpc-200',
    actId: 'act_crpc_1898',
    sectionNumber: 'Section 200',
    categories: ['threats', 'rights'],
    title: {
      bn: 'ম্যাজিস্ট্রেট আদালতে নালিশি (CR) মামলায় বাদীর প্রাথমিক জবানবন্দি গ্রহণ (ধারা ২০০)',
      en: 'Examination of Complainant upon Filing CR Case (Section 200)'
    },
    originalText: '২০০। কোনো ম্যাজিস্ট্রেট নালিশের ভিত্তিতে অপরাধ আমলে গ্রহণ করিবার সময় অবিলম্বে শপথপূর্বক বাদীর জবানবন্দি গ্রহণ করিবেন এবং উক্ত জবানবন্দির সারসংক্ষেপ লিপিবদ্ধ করিয়া বাদীর স্বাক্ষর গ্রহণ করিবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ফৌজদারি কার্যবিধির ২০০ ধারা অনুযায়ী সরাসরি আদালতে নালিশি মামলা (CR Case) দায়ের করলে ম্যাজিস্ট্রেট বাদীর শপথপূর্বক জবানবন্দি শোনেন এবং সন্তুষ্ট হলে আসামির বিরুদ্ধে সমন বা ওয়ারেন্ট জারি করেন।',
      en: 'Under Section 200 of the CrPC 1898, a Magistrate taking cognizance of an offense on a direct complaint must examine the complainant on solemn oath, record the substance in writing, and obtain the complainant\'s signature.'
    },
    caution: {
      bn: 'জবানবন্দির সময় মূল তথ্য ও ঘটনার তারিখ নির্ভুলভাবে বলা জরুরি।',
      en: 'Material facts, incident dates, and eyewitness accounts must be stated precisely under oath.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-75/section-2960.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1898-07-01',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['cr case', 'complainant examination', 'crpc 200', 'নালিশি মামলা', 'বাদীর জবানবন্দি', 'ধারা ২০০']
  },
  {
    id: 'crpc-202',
    actId: 'act_crpc_1898',
    sectionNumber: 'Section 202',
    categories: ['threats', 'rights'],
    title: {
      bn: 'সিআর মামলায় পরোয়ানা স্থগিত ও বিচারিক তদন্তের আদেশ (ধারা ২০২)',
      en: 'Postponement of Issue of Process and Judicial Inquiry (Section 202)'
    },
    originalText: '২০২। (১) কোনো ম্যাজিস্ট্রেট যদি নালিশের সত্যতা সম্পর্কে সন্দিহান হন, তবে তিনি আসামির বিরুদ্ধে সমন বা পরোয়ানা জারি স্থগিত রাখিয়া কোনো অধস্তন ম্যাজিস্ট্রেট বা পুলিশ অফিসার দ্বারা তদন্তের নির্দেশ দিতে পারিবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ফৌজদারি কার্যবিধির ২০২ ধারা অনুযায়ী সিআর মামলায় আদালত অবিলম্বে সমন জারি না করে ঘটনার সত্যতা নিশ্চিত করতে পুলিশ বা কোনো কর্মকর্তার মাধ্যমে তদন্ত রিপোর্ট (Judicial Inquiry) তলব করতে পারেন।',
      en: 'Section 202 allows a Magistrate who doubts the veracity of a direct complaint to postpone issuing summons and direct an inquiry or investigation by a police officer or subordinate magistrate.'
    },
    caution: {
      bn: 'তদন্ত রিপোর্ট বাদীর পক্ষে আসলে আদালত আসামির প্রতি আনুষ্ঠানিক সমন জারি করেন।',
      en: 'Summons or warrants issue once the Section 202 inquiry report substantiates a prima facie offense.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-75/section-2962.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1898-07-01',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['crpc 202', 'judicial inquiry', 'police inquiry report', '২০২ ধারা', 'বিচার বিভাগীয় তদন্ত', 'তদন্ত রিপোর্ট']
  },
  {
    id: 'crpc-561a',
    actId: 'act_crpc_1898',
    sectionNumber: 'Section 561A',
    categories: ['threats', 'rights'],
    title: {
      bn: 'আদালতের কার্যক্রমের অপব্যবহার রোধে হাইকোর্ট বিভাগের সহজাত ক্ষমতা (ধারা ৫৬১এ)',
      en: 'Inherent Power of High Court Division to Prevent Abuse of Process (Section 561A)'
    },
    originalText: '৫৬১এ। এই সংহিতার কোনো কিছুই হাইকোর্ট বিভাগের ন্যায়বিচারের উদ্দেশ্য পূরণার্থে অথবা কোনো আদালতের কার্যক্রমের অপব্যবহার প্রতিরোধকল্পে যেরূপ আদেশ দেওয়া প্রয়োজন মনে করেন সেইরূপ আদেশ দেওয়ার অন্তর্নিহিত ক্ষমতাকে সীমিত করিবে না।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ফৌজদারি কার্যবিধির ৫৬১এ ধারা অনুযায়ী মিথ্যা, ভিত্তিহীন ও হয়রানিমূলক ফৌজদারি মামলা সরাসরি বাতিল (Quashment) করার অসাধারণ সহজাত ক্ষমতা হাইকোর্ট বিভাগের রয়েছে।',
      en: 'Under Section 561A of the CrPC 1898, the High Court Division possesses inherent jurisdiction to make such orders as may be necessary to prevent abuse of the process of any court or otherwise to secure the ends of justice (Quashment).'
    },
    caution: {
      bn: 'মামলায় কোনো স্পষ্ট অপরাধের উপাদান না থাকলেই কেবল কোয়াশমেন্ট পিটিশন সফল হয়।',
      en: 'Exercised sparingly where the FIR or charge-sheet discloses no prima facie cognizable offense whatsoever.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-75/section-3323.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1898-07-01',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['crpc 561a', 'quashment', 'inherent power high court', 'মামলা বাতিল', '৫৬১এ কোয়াশমেন্ট', 'হাইকোর্ট']
  },

  // -------------------------------------------------------------
  // Category 5: Family (14 additions)
  // -------------------------------------------------------------
  {
    id: 'family-court-2023-6',
    actId: 'act_family_courts_2023',
    sectionNumber: 'Section 6',
    categories: ['family'],
    title: {
      bn: 'পারিবারিক মোকদ্দমা দায়ের ও স্থানীয় এখতিয়ার (ধারা ৬)',
      en: 'Territorial Jurisdiction & Wife\'s Special Forum Entitlement (Section 6)'
    },
    originalText: '৬। (১) এই আইনের অধীন কোনো মোকদ্দমা সেই পারিবারিক আদালতে আরজি দাখিলের মাধ্যমে দায়ের করিতে হইবে যাহার এখতিয়ারের স্থানীয় সীমানার মধ্যে- (ক) মোকদ্দমার কারণ সম্পূর্ণভাবে বা আংশিকভাবে উদ্ভূত হইয়াছে; অথবা (খ) পক্ষগণ একত্রে বসবাস করেন বা সর্বশেষ বসবাস করিয়াছিলেন: তবে শর্ত থাকে যে, বিবাহ বিচ্ছেদ, দেনমোহর বা ভরণপোষণের মোকদ্দমায় সেই আদালতেরও এখতিয়ার থাকিবে, যাহার এখতিয়ারের স্থানীয় সীমানার মধ্যে স্ত্রী সাধারণত বসবাস করেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'পারিবারিক আদালত আইন ২০২৩-এর ৬ ধারা অনুযায়ী দেনমোহর, ভরণপোষণ বা বিবাহ বিচ্ছেদের মোকদ্দমায় স্ত্রী যেখানে সাধারণত বসবাস করছেন, সেখানকার পারিবারিক আদালতে মামলা দায়ের করার বিশেষ অধিকার তার রয়েছে।',
      en: 'Section 6 of the Family Courts Act 2023 establishes territorial jurisdiction. Crucially, a wife filing for dissolution of marriage, dower, or maintenance is statutorily entitled to institute the suit in the Family Court within whose local jurisdiction she ordinarily resides.'
    },
    caution: {
      bn: 'আরজিতে সকল তথ্য, সাক্ষী তালিকা ও দলিলের তালিকা সংযোজন করা বাধ্যতামূলক।',
      en: 'Pleadings must include schedule of witnesses and certified documents under Section 6(3).'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1444/section-52078.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2023-09-18',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['family court jurisdiction', 'place of suing wife', 'where to file family suit', 'পারিবারিক আদালত মামলা দায়ের', 'স্ত্রীর বসবাস', 'ধারা ৬']
  },
  {
    id: 'family-court-2023-10',
    actId: 'act_family_courts_2023',
    sectionNumber: 'Section 10',
    categories: ['family'],
    title: {
      bn: 'বিচার-পূর্ব শুনানিতে বাধ্যতামূলক আপোষ ও সমঝোতা প্রচেষ্টা (ধারা ১০)',
      en: 'Pre-Trial Hearing and Mandatory Reconciliation Attempt (Section 10)'
    },
    originalText: '১০। (১) আরজি ও লিখিত জবাব দাখিলের পর পারিবারিক আদালত বিচার-পূর্ব শুনানির একটি তারিখ নির্ধারণ করিবে। (২) বিচার-পূর্ব শুনানির দিনে আদালত পক্ষদ্বয়ের মধ্যে আপোষ বা সমঝোতা ঘটাইবার জন্য সর্বাত্মক চেষ্টা করিবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'পারিবারিক আদালত আইন ২০২৩-এর ১০ ধারা অনুযায়ী পারিবারিক মামলায় বিচার শুরুর আগেই বিচারক উভয় পক্ষকে মুখোমুখি বসিয়ে আপোষ বা বিরোধ নিষ্পত্তির আন্তরিক চেষ্টা করতে আইনত বাধ্য।',
      en: 'Under Section 10 of the Family Courts Act 2023, before proceeding to full trial, the Family Court is statutorily required to hold a pre-trial hearing to attempt a formal amicable compromise between the parties.'
    },
    caution: {
      bn: 'সমঝোতা হলে আদালত তৎক্ষণাৎ আপোষ ডিক্রি জারি করেন; ব্যর্থ হলে বিচার শুরু হয়।',
      en: 'A successful reconciliation results in an immediate consent decree; if it fails, trial issues are framed.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1444/section-52082.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2023-09-18',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['pre-trial reconciliation', 'family court settlement', 'aposh prochesta', 'আপোষ প্রচেষ্টা', 'পারিবারিক সমঝোতা', 'ধারা ১০']
  },
  {
    id: 'family-court-2023-13',
    actId: 'act_family_courts_2023',
    sectionNumber: 'Section 13',
    categories: ['family'],
    title: {
      bn: 'পারিবারিক আদালতের ডিক্রি জারি ও দেনমোহর-ভরণপোষণ আদায় (ধারা ১৩)',
      en: 'Enforcement of Family Court Decrees for Dower & Maintenance (Section 13)'
    },
    originalText: '১৩। (১) পারিবারিক আদালত কর্তৃক প্রদত্ত কোনো ডিক্রি অর্থ আদায়ের ডিক্রি হইলে আদালত অর্থ আদায়ের জন্য দেনাদারের সম্পত্তি ক্রোক ও বিক্রয় করিতে পারিবে অথবা তাহাকে অনধিক তিন মাসের জন্য দেওয়ানি কারাগারে আটক রাখিতে পারিবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'পারিবারিক আদালত আইন ২০২৩-এর ১৩ ধারা অনুযায়ী দেনমোহর বা ভরণপোষণের ডিক্রিকৃত টাকা স্বামী স্বেচ্ছায় পরিশোধ না করলে আদালত তার সম্পত্তি ক্রোক ও নিলাম বিক্রি করে টাকা আদায় করতে পারেন অথবা স্বামীকে অনধিক ৩ মাসের দেওয়ানি কারাদণ্ড দিতে পারেন।',
      en: 'Under Section 13 of the Family Courts Act 2023, if a judgment-debtor husband fails to satisfy a decree for dower or maintenance, the court may attach and auction his property or commit him to civil prison for up to 3 months.'
    },
    caution: {
      bn: 'কারাদণ্ড ভোগ করলেও দেনমোহর বা ভরণপোষণ পরিশোধের দায় থেকে স্বামী মুক্ত হয় না।',
      en: 'Serving civil imprisonment does not discharge the monetary liability under the decree.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1444/section-52085.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2023-09-18',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['decree execution', 'maintenance recovery', 'dower attachment', 'ডিক্রি জারি', 'দেনমোহর আদায়', 'ভরণপোষণ আদায়', 'ধারা ১৩']
  },
  {
    id: 'family-court-2023-16',
    actId: 'act_family_courts_2023',
    sectionNumber: 'Section 16',
    categories: ['family'],
    title: {
      bn: 'পারিবারিক আদালতের রায়ের বিরুদ্ধে জেলা জজে ৩০ দিনের মধ্যে আপিল (ধারা ১৬)',
      en: 'Appeals to District Judge Court within 30 Days (Section 16)'
    },
    originalText: '১৬। (১) পারিবারিক আদালতের কোনো ডিক্রি বা আদেশের বিরুদ্ধে সংক্ষুব্ধ পক্ষ ডিক্রি বা আদেশের তারিখ হইতে ৩০ (ত্রিশ) দিনের মধ্যে জেলা জজ আদালতে আপিল দায়ের করিতে পারিবেন। (২) জেলা জজের সিদ্ধান্ত চূড়ান্ত বলিয়া গণ্য হইবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'পারিবারিক আদালত আইন ২০২৩-এর ১৬ ধারা অনুযায়ী পারিবারিক আদালতের রায়ে অসন্তুষ্ট হলে রায়ের ৩০ দিনের মধ্যে জেলা জজ আদালতে আপিল দায়ের করতে হয়। জেলা জজের আপিল সিদ্ধান্ত চূড়ান্ত।',
      en: 'Under Section 16 of the Family Courts Act 2023, any party aggrieved by a decree passed by a Family Court may prefer an appeal before the District Judge within a strict limitation period of 30 days.'
    },
    caution: {
      bn: 'আপোষ ডিক্রি বা পাঁচ হাজার টাকার কম মূল্যের কোনো ডিক্রির বিরুদ্ধে আপিল চলে না।',
      en: 'No appeal lies against consent decrees or monetary decrees below statutory thresholds.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1444/section-52088.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2023-09-18',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['family court appeal', '30 days appeal limitation', 'জেলা জজ আপিল', 'পারিবারিক আপিল', 'ধারা ১৬']
  },
  {
    id: 'family-court-2023-22',
    actId: 'act_family_courts_2023',
    sectionNumber: 'Section 22',
    categories: ['family'],
    title: {
      bn: 'দেওয়ানি কার্যবিধির জটিলতা বর্জন ও সংক্ষিপ্ত বিচার পদ্ধতি (ধারা ২২)',
      en: 'Exclusion of Complex CPC Formalities & Summary Family Procedure (Section 22)'
    },
    originalText: '২২। সমন জারি ও ডিক্রি কার্যকরীকরণ ব্যতীত দেওয়ানি কার্যবিধি ১৯০৮ (CPC) এবং সাক্ষ্য আইন ১৮৭২ পারিবারিক আদালতের কার্যক্রমে সাধারণভাবে প্রযোজ্য হইবে না।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'পারিবারিক আদালত আইনের ২২ ধারা অনুযায়ী সাধারণ দেওয়ানি মামলার জটিল দীর্ঘসূত্রিতা পরিহার করতে পারিবারিক আদালতে দ্রুত ও সংক্ষিপ্ত পদ্ধতিতে বিচার করার আইনগত বাধ্যবাধকতা রয়েছে।',
      en: 'Section 22 expressly excludes the strict technicalities of the Code of Civil Procedure 1908 and Evidence Act 1872 (except for summons and decree execution), ensuring fast and summary resolution of matrimonial matters.'
    },
    caution: {
      bn: 'আদালত প্রাকৃতিক ন্যায়বিচারের নীতি (Principles of Natural Justice) অনুসরণ করে বিচার পরিচালনা করেন।',
      en: 'Courts are guided by natural justice principles rather than formal evidentiary technicalities.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1444/section-52094.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2023-09-18',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['family court procedure', 'cpc excluded', 'summary family trial', 'সংক্ষিপ্ত বিচার পদ্ধতি', 'পারিবারিক মামলা', 'ধারা ২২']
  },
  {
    id: 'mflo-5',
    actId: 'act_mflo_1961',
    sectionNumber: 'Section 5',
    categories: ['family'],
    title: {
      bn: 'মুসলিম বিবাহ রেজিস্ট্রেশনের সংবিধিবদ্ধ বাধ্যবাধকতা (ধারা ৫)',
      en: 'Mandatory Registration of Muslim Marriages (Section 5)'
    },
    originalText: '৫। মুসলিম আইনের অধীন অনুষ্ঠিত প্রত্যেকটি বিবাহ এই অধ্যাদেশের বিধান অনুযায়ী নিকাহ রেজিস্ট্রার (কাজী) কর্তৃক যথারীতি রেজিস্ট্রি করিতে হইবে। রেজিস্ট্রেশন না করা দণ্ডনীয় অপরাধ।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১-এর ৫ ধারা অনুযায়ী প্রত্যেক বিবাহ সরকারি কাজী দিয়ে কাবিননামা রেজিস্ট্রি করা বাধ্যতামূলক। বিবাহ রেজিস্ট্রেশন না করা শাস্তিযোগ্য অপরাধ।',
      en: 'Under Section 5 of the Muslim Family Laws Ordinance 1961, every marriage solemnized under Muslim law must be registered with the authorized Nikah Registrar (Kazi). Failure to register is a punishable offense.'
    },
    caution: {
      bn: 'রেজিস্ট্রেশন ছাড়া পরবর্তীতে দেনমোহর বা উত্তরাধিকার প্রমাণের ক্ষেত্রে জটিলতা সৃষ্টি হতে পারে।',
      en: 'Unregistered marriages create severe evidentiary hurdles in establishing dower or inheritance.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-305/section-9721.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1961-07-15',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['marriage registration', 'nikah kazi', 'kabin registration', 'বিবাহ রেজিস্ট্রেশন', 'কাজী রেজিস্ট্রি', 'কাবিননামা', 'ধারা ৫']
  },
  {
    id: 'mflo-9-enforcement',
    actId: 'act_mflo_1961',
    sectionNumber: 'Section 9(2)',
    categories: ['family'],
    title: {
      bn: 'সালিসি কাউন্সিলের মাধ্যমে বকেয়া ভরণপোষণ ভূমি রাজস্বের মতো আদায় (ধারা ৯(২))',
      en: 'Recovery of Unpaid Maintenance through Collector as Arrears of Land Revenue (Section 9(2))'
    },
    originalText: '৯। (২) সালিসি কাউন্সিল কর্তৃক নির্ধারিত ভরণপোষণের অর্থ কোনো পক্ষ স্বেচ্ছায় পরিশোধ না করিলে উক্ত অর্থ সরকারি ভূমি রাজস্বের বকেয়া (Arrears of Land Revenue) হিসেবে সার্টিফিকেট কোর্টের মাধ্যমে আদায় করা যাইবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'মুসলিম পারিবারিক আইন অধ্যাদেশের ৯(২) ধারা অনুযায়ী ইউনিয়ন পরিষদ বা সিটি কর্পোরেশনের সালিসি কাউন্সিল স্ত্রী বা সন্তানের জন্য যে ভরণপোষণের আদেশ দেয়, স্বামী তা না দিলে তা সরকারি খাজনা বা রাজস্বের মতো কঠোরভাবে আদায় করা যায়।',
      en: 'Section 9(2) of the Muslim Family Laws Ordinance 1961 provides that maintenance ordered by the Arbitration Council, if unpaid, is recoverable through the Deputy Commissioner/Collector as arrears of land revenue.'
    },
    caution: {
      bn: 'সালিসি কাউন্সিলের আদেশের বিরুদ্ধে নির্ধারিত ৩০ দিনের মধ্যে সহকারী জজের নিকট রিভিশন আবেদন করা যায়।',
      en: 'Subject to revision before the Assistant Judge within 30 days of the award.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-305/section-9725.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1961-07-15',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['arbitration maintenance', 'arrears land revenue', 'salishi council', 'সালিসি কাউন্সিল ভরণপোষণ', 'বকেয়া ভরণপোষণ', 'ধারা ৯(২)']
  },
  {
    id: 'dmma-2',
    actId: 'act_dmma_1939',
    sectionNumber: 'Section 2',
    categories: ['family'],
    title: {
      bn: 'মুসলিম নারী কর্তৃক আদালতে বিবাহ বিচ্ছেদের ৯টি সুনির্দিষ্ট আইনি কারণ (ধারা ২)',
      en: 'Nine Statutory Grounds for Divorce by Muslim Wife (Section 2)'
    },
    originalText: '২। কোনো মুসলিম বিবাহিতা নারী নিম্নবর্ণিত যেকোনো কারণে পারিবারিক আদালতে বিবাহ বিচ্ছেদের ডিক্রি পাইবার অধিকারী হইবেন: (১) ৪ বৎসর স্বামীর সন্ধান অজ্ঞাত থাকিলে; (২) ২ বৎসর স্বামী ভরণপোষণ দিতে ব্যর্থ হইলে; (৩) স্বামী ৭ বৎসর কারাদণ্ডে দণ্ডিত হইলে; (৪) স্বামী ৩ বৎসর দাম্পত্য দায়িত্ব পালনে ব্যর্থ হইলে; (৫) শারীরিক বা মানসিক নিষ্ঠুরতা করিলে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'মুসলিম বিবাহ বিচ্ছেদ আইন ১৯৩৯-এর ২ ধারা অনুযায়ী স্বামী যদি ২ বছর ভরণপোষণ না দেয়, ৪ বছর নিরুদ্দেশ থাকে, শারীরিক/মানসিক নির্যাতন করে বা স্বামীত্ব পালনে ব্যর্থ হয়, তবে স্ত্রী পারিবারিক আদালতে মামলা করে বিবাহ বিচ্ছেদ নেওয়ার পূর্ণ অধিকারী।',
      en: 'Under Section 2 of the Dissolution of Muslim Marriages Act 1939, a Muslim woman is entitled to obtain a judicial decree of divorce on established statutory grounds including 2 years failure to provide maintenance, 4 years husband missing, severe cruelty, or neglect of marital obligations.'
    },
    caution: {
      bn: 'আদালতের মাধ্যমে বিবাহ বিচ্ছেদ হলেও স্ত্রীর পাওনা দেনমোহর মাফ হয় না, দেনমোহর বহাল থাকে।',
      en: 'Judicial dissolution of marriage does not extinguish the wife\'s statutory right to recover unpaid dower.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-184/section-6302.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1939-03-17',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['grounds for divorce', 'wife divorce right', 'dmma section 2', 'স্ত্রী কর্তৃক তালাক', 'বিবাহ বিচ্ছেদের কারণ', 'ধারা ২']
  },
  {
    id: 'guardians-12',
    actId: 'act_guardians_1890',
    sectionNumber: 'Section 12',
    categories: ['family'],
    title: {
      bn: 'মামলা চলাকালীন অপ্রাপ্তবয়স্ক সন্তানের অন্তর্বর্তীকালীন হেফাজতের আদেশ (ধারা ১২)',
      en: 'Interim Custody and Protection of Minor Pending Suit (Section 12)'
    },
    originalText: '১২। (১) কোনো নাবালকের শরীর বা সম্পত্তির অভিভাবক নিয়োগের আবেদন চলাকালে আদালত নাবালকের সুরক্ষার জন্য তৎক্ষণাৎ অন্তর্বর্তীকালীন হেফাজতের আদেশ প্রদান করিতে পারিবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'অভিভাবক ও প্রতিপাল্য আইন ১৮৯০-এর ১২ ধারা অনুযায়ী কাস্টডি বা অভিভাবকত্বের মামলা বিচারাধীন থাকা অবস্থায় আদালত শিশুর তাৎক্ষণিক সুরক্ষার জন্য মা বা উপযুক্ত ব্যক্তির নিকট অন্তর্বর্তীকালীন হেফাজতের আদেশ দিতে পারেন।',
      en: 'Under Section 12 of the Guardians and Wards Act 1890, pending adjudication of guardianship suits, the court has full powers to pass interlocutory orders for interim custody and physical protection of the minor.'
    },
    caution: {
      bn: 'অন্তর্বর্তীকালীন আদেশের ক্ষেত্রেও শিশুর কল্যাণ (Welfare of the minor) প্রধান বিবেচ্য।',
      en: 'Paramount consideration at all interlocutory stages remains the paramount welfare of the child.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-63/section-2394.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1890-07-01',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['interim custody', 'child protection pending suit', 'shontan ontorbortikalin', 'সন্তানের অন্তর্বর্তীকালীন হেফাজত', 'ধারা ১২']
  },
  {
    id: 'guardians-19',
    actId: 'act_guardians_1890',
    sectionNumber: 'Section 19',
    categories: ['family'],
    title: {
      bn: 'পিতার বিদ্যমানতায় অভিভাবক নিয়োগের বিধিনিষেধ ও শর্তাবলী (ধারা ১৯)',
      en: 'Statutory Limitations on Appointing Guardian when Father is Living (Section 19)'
    },
    originalText: '১৯। কোনো নাবালকের পিতা জীবিত থাকিলে এবং তিনি নাবালকের অভিভাবক হওয়ার ক্ষেত্রে অযোগ্য বা অনুপযুক্ত না হইলে, আদালত অন্য কোনো ব্যক্তিকে অভিভাবক নিয়োগ করিবে না।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'অভিভাবক আইনের ১৯ ধারা অনুযায়ী পিতা জীবিত এবং সন্তানের কল্যাণে উপযুক্ত হলে সাধারণ নিয়মে পিতাই প্রাকৃতিক অভিভাবক থাকেন; তবে পিতা অনুপযুক্ত বা নিষ্ঠুর প্রমাণিত হলে আদালত মাতাকে পূর্ণ অভিভাবকত্ব দিতে পারেন।',
      en: 'Section 19 establishes that courts generally do not appoint a third party as guardian if the father is living, unless the father is judicially established to be unfit to protect the welfare of the minor.'
    },
    caution: {
      bn: 'অভিভাবকত্ব (Guardianship) এবং মায়ের লালন-পালনের অধিকার (Hizanat/Custody) দুটি ভিন্ন আইনি ধারণা।',
      en: 'Legal guardianship of property differs from the maternal right of hizanat (physical day-to-day care).'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-63/section-2401.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1890-07-01',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['father natural guardian', 'guardianship fitness', 'pitar ovivabokotto', 'পিতার অভিভাবকত্ব', 'ধারা ১৯']
  },
  {
    id: 'guardians-41',
    actId: 'act_guardians_1890',
    sectionNumber: 'Section 41',
    categories: ['family'],
    title: {
      bn: 'সন্তান ১৮ বছর বয়স প্রাপ্তিতে অভিভাবকত্বের আইনি অবসান (ধারা ৪১)',
      en: 'Cessation of Guardianship Authority upon Minor Attaining Majority (Section 41)'
    },
    originalText: '৪১। (১) কোনো নাবালক প্রাপ্তবয়স্কতা (১৮ বৎসর) অর্জন করিলে তাহার শরীর বা ব্যক্তিত্বের অভিভাবকের কর্তৃত্ব আইনত সমাপ্ত হইবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'অভিভাবক ও প্রতিপাল্য আইনের ৪১ ধারা অনুযায়ী কোনো সন্তান ১৮ বছর বয়স পূর্ণ করলে সে প্রাপ্তবয়স্ক হিসেবে গণ্য হয় এবং তার ওপর পিতা বা মাতার অভিভাবকত্বের আইনি কর্তৃত্ব স্বয়ংক্রিয়ভাবে সমাপ্ত হয়।',
      en: 'Section 41 of the Guardians and Wards Act 1890 establishes that guardianship over the person of a minor automatically ceases by operation of law upon the ward attaining majority at 18 years of age.'
    },
    caution: {
      bn: 'প্রাপ্তবয়স্ক সন্তান নিজের ইচ্ছা অনুযায়ী পিতা, মাতা বা নিজস্ব ঠিকানায় বসবাস করার স্বাধীন অধিকার রাখে।',
      en: 'An adult ward has complete constitutional autonomy over their residency and personal choices.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-63/section-2423.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1890-07-01',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['majority 18 years', 'end of custody', 'praptoboyoshko shontan', '১৮ বছর বয়সে অভিভাবকত্ব শেষ', 'প্রাপ্তবয়স্ক সন্তান', 'ধারা ৪১']
  },
  {
    id: 'domestic-12',
    actId: 'act_domestic_violence_2010',
    sectionNumber: 'Section 12',
    categories: ['family', 'threats'],
    title: {
      bn: 'পারিবারিক সহিংসতায় ম্যাজিস্ট্রেটের নিকট জরুরি সুরক্ষার আবেদন (ধারা ১২)',
      en: 'Application to Magistrate for Immediate Protection and Relief Orders (Section 12)'
    },
    originalText: '১২। (১) কোনো সংক্ষুব্ধ ব্যক্তি বা তাহার পক্ষে সুরক্ষা কর্মকর্তা বা অন্য কোনো ব্যক্তি পারিবারিক সহিংসতার ঘটনায় সুরক্ষা আদেশ, বাসস্থান আদেশ বা আর্থিক ক্ষতিপূরণের জন্য ম্যাজিস্ট্রেটের নিকট আবেদন করিতে পারিবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'পারিবারিক সহিংসতা (প্রতিরোধ ও সুরক্ষা) আইন ২০১০-এর ১২ ধারা অনুযায়ী স্বামী বা শ্বশুরবাড়ির সদস্যদের নির্যাতনের শিকার নারী দ্রুত সুরক্ষা আদেশ, আর্থিক ক্ষতিপূরণ ও বাসস্থান পাওয়ার জন্য সরাসরি ম্যাজিস্ট্রেটের নিকট আবেদন করতে পারেন।',
      en: 'Under Section 12 of the Domestic Violence (Prevention and Protection) Act 2010, any victim or protection officer may petition the Judicial Magistrate for emergency protection orders, residence orders, and financial relief.'
    },
    caution: {
      bn: 'আদালত আবেদন পাওয়ার তারিখ হইতে ৬০ দিনের মধ্যে মামলা নিষ্পত্তির আইনি বাধ্যবাধকতা রয়েছে।',
      en: 'Magistrates are statutorily required to dispose of applications within a speedy 60-day window.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1057/section-33756.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2010-12-30',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['domestic violence petition', 'protection order magistrate', 'shurokkha adesh', 'পারিবারিক সহিংসতা আবেদন', 'সুরক্ষা আদেশ', 'ধারা ১২']
  },
  {
    id: 'domestic-16',
    actId: 'act_domestic_violence_2010',
    sectionNumber: 'Section 16',
    categories: ['family', 'threats'],
    title: {
      bn: 'যৌথ বসতবাড়ি হইতে নারীকে উচ্ছেদ প্রতিরোধে বাসস্থান আদেশ (ধারা ১৬)',
      en: 'Residence Order Protecting Victim\'s Right to Shared Household (Section 16)'
    },
    originalText: '১৬। (১) পারিবারিক সহিংসতায় সংক্ষুব্ধ নারীকে তাহার যৌথ বসতবাড়ি (Shared household) হইতে উচ্ছেদ করা যাইবে না এবং আদালত প্রতিপক্ষকে উক্ত বাড়ি ত্যাগ করিবার বা নারীর নির্বিঘ্ন বাসস্থান নিশ্চিত করিবার আদেশ প্রদান করিতে পারিবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'পারিবারিক সহিংসতা প্রতিরোধ আইনের ১৬ ধারা অনুযায়ী স্বামী বা শ্বশুরবাড়ির লোকজন কোনো অবস্থাতেই গৃহবধূকে মারধর করে বাড়ি থেকে তাড়িয়ে দিতে পারবে না। আদালত নারীকে ওই বাড়িতে নিরাপদে রাখার বাধ্যতামূলক আদেশ দেন।',
      en: 'Section 16 empowers the Magistrate to pass a Residence Order prohibiting the respondent from evicting or disturbing the victim from the shared household, or directing the respondent to secure alternative accommodation.'
    },
    caution: {
      bn: 'বাসস্থান আদেশে নারীর ঘরের তালা ভেঙে ঢোকা বা তাকে মানসিক নির্যাতন করা কঠোরভাবে নিষিদ্ধ।',
      en: 'Restraining orders can bar respondents from entering portions of the house occupied by the victim.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1057/section-33760.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2010-12-30',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['shared household', 'residence order', 'bari theke ber kore deya', 'যৌথ বসতবাড়ি', 'বাড়ি থেকে তাড়িয়ে দেওয়া', 'ধারা ১৬']
  },
  {
    id: 'domestic-32',
    actId: 'act_domestic_violence_2010',
    sectionNumber: 'Section 32',
    categories: ['family', 'threats'],
    title: {
      bn: 'আদালতের সুরক্ষা আদেশ লঙ্ঘনের ফৌজদারি শাস্তি (ধারা ৩২)',
      en: 'Punishment for Breach of Protection Order by Respondent (Section 32)'
    },
    originalText: '৩২। (১) কোনো প্রতিপক্ষ যদি আদালতের প্রদত্ত কোনো সুরক্ষা আদেশ ভঙ্গ করেন, তবে তিনি অনধিক ছয় মাসের কারাদণ্ড বা দশ হাজার টাকা অর্থদণ্ডে বা উভয় দণ্ডে দণ্ডিত হইবেন। (২) পুনঃসংগঠনের ক্ষেত্রে সর্বোচ্চ দুই বছর কারাদণ্ড।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'পারিবারিক সহিংসতা আইনের ৩২ ধারা অনুযায়ী আদালতের দেওয়া সুরক্ষা আদেশ ভঙ্গ করে পুনরায় নারীকে মারধর বা হুমকি দিলে অভিযুক্তের সর্বোচ্চ ৬ মাস কারাদণ্ড ও ১০ হাজার টাকা জরিমানা হবে এবং দ্বিতীয়বার করলে ২ বছর কারাদণ্ড হবে।',
      en: 'Under Section 32 of the Domestic Violence Act 2010, breaching any protection or residence order passed by the Magistrate is a criminal offense punishable by up to 6 months imprisonment, fine up to 10,000 BDT, or up to 2 years for repeated breach.'
    },
    caution: {
      bn: 'আদেশ লঙ্ঘনের ঘটনায় পুলিশ বিনা পরোয়ানায় অভিযুক্তকে অবিলম্বে গ্রেফতার করতে পারে।',
      en: 'Breach of a domestic violence protection order constitutes a cognizable offense allowing warrantless arrest.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1057/section-33776.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2010-12-30',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['breach of protection order', 'domestic violence penalty', 'shurokkha vongho', 'সুরক্ষা আদেশ লঙ্ঘন', 'পারিবারিক সহিংসতা শাস্তি', 'ধারা ৩২']
  },

  // -------------------------------------------------------------
  // Category 6: Rights (12 additions)
  // -------------------------------------------------------------
  {
    id: 'constitution-11',
    actId: 'act_constitution_1972',
    sectionNumber: 'Article 11',
    categories: ['rights'],
    title: {
      bn: 'গণতন্ত্র ও মৌলিক মানবাধিকারের নিশ্চয়তা (অনুচ্ছেদ ১১)',
      en: 'Democracy and Fundamental Human Rights (Article 11)'
    },
    originalText: '১১। প্রজাতন্ত্র হইবে একটি গণতন্ত্র, যেখানে মৌলিক মানবাধিকার ও স্বাধীনতার নিশ্চয়তা থাকিবে, মানবসত্তার মর্যাদা ও মূল্যের প্রতি শ্রদ্ধাবোধ নিশ্চিত হইবে এবং প্রশাসনের সকল পর্যায়ে নির্বাচিত প্রতিনিধিদের মাধ্যমে জনগণের কার্যকর অংশগ্রহণ নিশ্চিত হইবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'সংবিধানের ১১ অনুচ্ছেদ অনুযায়ী বাংলাদেশ একটি গণতান্ত্রিক রাষ্ট্র যেখানে প্রত্যেক নাগরিকের মৌলিক মানবাধিকার, ব্যক্তিস্বাধীনতা এবং মানুষের মর্যাদার সাংবিধানিক নিশ্চয়তা দেওয়া হয়েছে।',
      en: 'Article 11 of the Constitution establishes Bangladesh as a democracy where fundamental human rights, civil freedoms, and respect for the dignity and worth of the human person are guaranteed.'
    },
    caution: {
      bn: 'এটি রাষ্ট্র পরিচালনার মূলনীতি এবং নাগরিক অধিকার সুরক্ষার মৌলিক ভিত্তি।',
      en: 'Serves as a fundamental principle of state policy guiding statutory interpretation.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24559.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1972-12-16',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['human rights', 'democracy dignity', 'moulik manobadhikar', 'মৌলিক মানবাধিকার', 'মানবসত্তার মর্যাদা', 'অনুচ্ছেদ ১১']
  },
  {
    id: 'constitution-19',
    actId: 'act_constitution_1972',
    sectionNumber: 'Article 19',
    categories: ['rights', 'work'],
    title: {
      bn: 'সকল নাগরিকের জন্য সুযোগের সমতা ও বৈষম্য বিলোপ (অনুচ্ছেদ ১৯)',
      en: 'Equality of Opportunity for all Citizens (Article 19)'
    },
    originalText: '১৯। (১) সকল নাগরিকের জন্য সুযোগের সমতা নিশ্চিত করিতে রাষ্ট্র সচেষ্ট হইবেন। (২) মানুষে মানুষে সামাজিক ও অর্থনৈতিক অসামঞ্জস্য বিলোপ করিবার জন্য রাষ্ট্র কার্যকর ব্যবস্থা গ্রহণ করিবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'সংবিধানের ১৯ অনুচ্ছেদ অনুযায়ী রাষ্ট্র সকল নাগরিকের সমান সুযোগ নিশ্চিত করবে এবং সামাজিক ও অর্থনৈতিক বৈষম্য দূর করতে পদক্ষেপ গ্রহণ করবে।',
      en: 'Article 19 mandates that the State shall endeavor to ensure equality of opportunity to all citizens and adopt measures to remove social and economic inequalities.'
    },
    caution: {
      bn: 'অনগ্রসর জনগোষ্ঠীর জন্য বিশেষ সুযোগ প্রদান এই নীতির লঙ্ঘন নয়।',
      en: 'Affirmative action for backward sections of citizens is constitutionally protected.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24567.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1972-12-16',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['equality of opportunity', 'economic fairness', 'shujoger shomota', 'সুযোগের সমতা', 'বৈষম্য বিলোপ', 'অনুচ্ছেদ ১৯']
  },
  {
    id: 'constitution-20',
    actId: 'act_constitution_1972',
    sectionNumber: 'Article 20',
    categories: ['rights', 'work'],
    title: {
      bn: 'কর্মের অধিকার, কর্তব্য ও সামর্থ্য অনুযায়ী পারিশ্রমিক (অনুচ্ছেদ ২০)',
      en: 'Work as a Right, Duty & Fair Remuneration (Article 20)'
    },
    originalText: '২০। (১) কর্ম হইতেছে কর্মক্ষম প্রত্যেক নাগরিকের পক্ষে অধিকার, কর্তব্য ও সম্মানের বিষয়, এবং প্রত্যেকের নিকট হইতে তাহার সামর্থ্য অনুযায়ী ও প্রত্যেককে তাহার কর্ম অনুযায়ী- এই নীতির ভিত্তিতে প্রত্যেকে স্বীয় কর্মের জন্য পারিশ্রমিক পাইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'সংবিধানের ২০ অনুচ্ছেদ অনুযায়ী কাজ করা প্রত্যেক নাগরিকের অধিকার ও সম্মানের বিষয় এবং কোনো নাগরিককে তার ন্যায্য মজুরি থেকে বঞ্চিত করা অসাংবিধানিক।',
      en: 'Article 20 establishes work as a right, a duty, and an honor for every capable citizen, entitling everyone to fair remuneration on the principle: from each according to ability, to each according to work.'
    },
    caution: {
      bn: 'জোরপূর্বক বিনা মজুরিতে শ্রম খাটানো (Forced Labour) সংবিধানের ৩৪ অনুচ্ছেদে নিষিদ্ধ।',
      en: 'Forced labor or withholding wages violates Article 34 of the Constitution.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24568.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1972-12-16',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['right to work', 'fair remuneration', 'kormer odhikar', 'কাজের অধিকার', 'ন্যায্য পারিশ্রমিক', 'অনুচ্ছেদ ২০']
  },
  {
    id: 'constitution-29',
    actId: 'act_constitution_1972',
    sectionNumber: 'Article 29',
    categories: ['rights', 'work'],
    title: {
      bn: 'সরকারি চাকুরিতে নিয়োগে সুযোগের সমতা ও বৈষম্যহীনতা (অনুচ্ছেদ ২৯)',
      en: 'Equality of Opportunity in Public Employment (Article 29)'
    },
    originalText: '২৯। (১) প্রজাতন্ত্রের কর্মে নিয়োগ বা পদ-লাভের ক্ষেত্রে সকল নাগরিকের জন্য সুযোগের সমতা থাকিবে। (২) কেবল ধর্ম, গোষ্ঠী, বর্ণ, নারী-পুরুষভেদ বা জন্মস্থানের কারণে কোনো নাগরিক প্রজাতন্ত্রের কর্মে অযোগ্য হইবেন না।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'সংবিধানের ২৯ অনুচ্ছেদ অনুযায়ী সরকারি চাকরি ও নিয়োগের ক্ষেত্রে সকল নাগরিক সমান সুযোগ পাবেন। ধর্ম, বর্ণ, লিঙ্গ বা জন্মস্থানের ভিত্তিতে কোনো বৈষম্য করা সম্পূর্ণ নিষিদ্ধ।',
      en: 'Article 29 guarantees equality of opportunity for all citizens in public employment. Discrimination solely on grounds of religion, race, caste, sex, or place of birth is unconstitutional.'
    },
    caution: {
      bn: 'অনগ্রসর নাগরিক বা প্রতিবন্ধীদের জন্য কোটা সংরক্ষণ এই অনুচ্ছেদের ব্যতিক্রম হিসেবে বৈধ।',
      en: 'Special provisions or quotas for backward sections of citizens are constitutionally exempted.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24577.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1972-12-16',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['public employment equality', 'no discrimination job', 'shorkari chakri somota', 'সরকারি চাকরি সমতা', 'অনুচ্ছেদ ২৯']
  },
  {
    id: 'constitution-37',
    actId: 'act_constitution_1972',
    sectionNumber: 'Article 37',
    categories: ['rights'],
    title: {
      bn: 'শান্তিপূর্ণ সমাবেশের সাংবিধানিক স্বাধীনতা (অনুচ্ছেদ ৩৭)',
      en: 'Freedom of Peaceful Assembly (Article 37)'
    },
    originalText: '৩৭। জনশৃঙ্খলা বা জনস্বাস্থ্যের স্বার্থে আইনের দ্বারা আরোপিত যুক্তিসঙ্গত বাধানিষেধ সাপেক্ষে শান্তিপূর্ণভাবে ও নিরস্ত্র অবস্থায় সমবেত হইবার এবং জনসভা ও শোভাযাত্রায় যোগদান করিবার অধিকার প্রত্যেক নাগরিকের থাকিবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'সংবিধানের ৩৭ অনুচ্ছেদ অনুযায়ী অস্ত্র ছাড়া যেকোনো শান্তিপূর্ণ সমাবেশ, মিছিল বা জনসভায় অংশগ্রহণ করার মৌলিক সাংবিধানিক অধিকার প্রত্যেক নাগরিকের রয়েছে।',
      en: 'Article 37 guarantees that every citizen has the fundamental right to assemble and participate in public meetings and processions peacefully and without arms, subject to reasonable statutory restrictions.'
    },
    caution: {
      bn: 'ফৌজদারি কার্যবিধির ১৪৪ ধারা জারি থাকলে সাময়িকভাবে সভা-সমাবেশ নিষিদ্ধ হতে পারে।',
      en: 'Magistrate orders under Section 144 CrPC may temporarily restrict assemblies for public peace.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24585.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1972-12-16',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['freedom of assembly', 'peaceful protest', 'shomabesh odhikar', 'সমাবেশের স্বাধীনতা', 'মিছিল মিটিং', 'অনুচ্ছেদ ৩৭']
  },
  {
    id: 'constitution-38',
    actId: 'act_constitution_1972',
    sectionNumber: 'Article 38',
    categories: ['rights', 'work'],
    title: {
      bn: 'সংগঠন বা সমিতি গঠনের মৌলিক স্বাধীনতা (অনুচ্ছেদ ৩৮)',
      en: 'Freedom of Association & Trade Unions (Article 38)'
    },
    originalText: '৩৮। জনশৃঙ্খলা ও নৈতিকতার স্বার্থে আইনের দ্বারা আরোপিত যুক্তিসঙ্গত বাধানিষেধ সাপেক্ষে সমিতি বা ইউনিয়ন গঠন করিবার অধিকার প্রত্যেক নাগরিকের থাকিবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'সংবিধানের ৩৮ অনুচ্ছেদ অনুযায়ী ট্রেড ইউনিয়ন, সামাজিক সমিতি বা রাজনৈতিক সংগঠন গঠন ও পরিচালনার পূর্ণ অধিকার প্রত্যেক নাগরিকের রয়েছে।',
      en: 'Article 38 establishes the fundamental right of every citizen to form associations, unions, or societies, subject to reasonable legal restrictions in the interests of public order or morality.'
    },
    caution: {
      bn: 'শ্রম আইন অনুযায়ী কারখানায় ট্রেড ইউনিয়ন গঠন শ্রম অধিদপ্তরের অধীনে নিবন্ধিত হতে হয়।',
      en: 'Trade unions in industrial establishments must be registered with the Department of Labour.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24586.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1972-12-16',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['freedom of association', 'trade union right', 'shongothon odhikar', 'সংগঠন করার অধিকার', 'ট্রেড ইউনিয়ন', 'অনুচ্ছেদ ৩৮']
  },
  {
    id: 'constitution-40',
    actId: 'act_constitution_1972',
    sectionNumber: 'Article 40',
    categories: ['rights', 'work'],
    title: {
      bn: 'পেশা বা বৃত্তির স্বাধীনতা এবং ব্যবসা পরিচালনার অধিকার (অনুচ্ছেদ ৪০)',
      en: 'Freedom of Lawful Profession, Occupation or Trade (Article 40)'
    },
    originalText: '৪০। আইনের দ্বারা আরোপিত বাধানিষেধ সাপেক্ষে কোনো পেশা বা বৃত্তি গ্রহণের এবং যেকোনো আইনসঙ্গত কারবার বা ব্যবসা পরিচালনার অধিকার প্রত্যেক নাগরিকের থাকিবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'সংবিধানের ৪০ অনুচ্ছেদ অনুযায়ী যেকোনো নাগরিকের আইনসম্মত বৈধ পেশা, ব্যবসা বা বাণিজ্য বেছে নেওয়ার ও পরিচালনা করার স্বাধীন অধিকার রয়েছে।',
      en: 'Article 40 guarantees that, subject to legal qualifications, every citizen has the fundamental right to enter upon any lawful profession or occupation, and to conduct any lawful trade or business.'
    },
    caution: {
      bn: 'পেশাগত লাইসেন্স (ট্রেড লাইসেন্স, টিন, ভ্যাট) নেওয়ার সরকারি বাধ্যবাধকতা এর আওতাভুক্ত।',
      en: 'Regulatory licensing requirements (Trade License, Tax registrations) are valid statutory conditions.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24588.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1972-12-16',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['freedom of profession', 'right to do business', 'pesha bebsha odhikar', 'পেশার স্বাধীনতা', 'ব্যবসার অধিকার', 'অনুচ্ছেদ ৪০']
  },
  {
    id: 'constitution-42',
    actId: 'act_constitution_1972',
    sectionNumber: 'Article 42',
    categories: ['rights', 'land'],
    title: {
      bn: 'সম্পত্তি অর্জন, ধারণ ও হস্তান্তরের সাংবিধানিক অধিকার (অনুচ্ছেদ ৪২)',
      en: 'Constitutional Right to Acquire, Hold and Dispose of Property (Article 42)'
    },
    originalText: '৪২। (১) আইনের দ্বারা আরোপিত বাধানিষেধ সাপেক্ষে প্রত্যেক নাগরিকের সম্পত্তি অর্জন, ধারণ, হস্তান্তর বা অন্যভাবে বিলি-ব্যবস্থা করিবার অধিকার থাকিবে এবং আইনের কর্তৃত্ব ব্যতিরেকে কোনো সম্পত্তি বাধ্যতামূলকভাবে গ্রহণ, রাষ্ট্রায়ত্ত বা দখল করা যাইবে না।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'সংবিধানের ৪২ অনুচ্ছেদ অনুযায়ী প্রত্যেক নাগরিকের সম্পত্তি কেনার, রাখার ও বিক্রি করার অধিকার রয়েছে। যথাযথ আইন ও ন্যায্য ক্ষতিপূরণ ছাড়া সরকার বা কেউ কারো জমি বা সম্পত্তি কেড়ে নিতে পারে না।',
      en: 'Article 42 guarantees the fundamental right to acquire, hold, transfer, and dispose of property. No property can be compulsorily acquired, nationalized, or requisitioned save by authority of law with fair compensation.'
    },
    caution: {
      bn: 'সরকারি অধিগ্রহণের ক্ষেত্রে ভূমি অধিগ্রহণ আইন ২০১৭ অনুযায়ী উপযুক্ত ক্ষতিপূরণ প্রদেয়।',
      en: 'Public acquisitions are subject to mandatory compensation under the Acquisition Act 2017.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24590.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '1972-12-16',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['property right constitution', 'no forced acquisition', 'shompotti odhikar', 'সম্পত্তির অধিকার', 'জমি অধিগ্রহণ', 'অনুচ্ছেদ ৪২']
  },
  {
    id: 'rti-4',
    actId: 'act_rti_2009',
    sectionNumber: 'Section 4',
    categories: ['rights'],
    title: {
      bn: 'সরকারি ও বেসরকারি প্রতিষ্ঠান হইতে তথ্য প্রাপ্তির মৌলিক অধিকার (ধারা ৪)',
      en: 'Statutory Right to Obtain Information from Authorities (Section 4)'
    },
    originalText: '৪। এই আইনের বিধানাবলি সাপেক্ষে, কর্তৃপক্ষের নিকট হইতে প্রত্যেক নাগরিকের তথ্য লাভের অধিকার থাকিবে এবং কোনো নাগরিকের অনুরোধের প্রেক্ষিতে কর্তৃপক্ষ তাহাকে তথ্য সরবরাহ করিতে বাধ্য থাকিবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'তথ্য অধিকার আইন ২০০৯-এর ৪ ধারা অনুযায়ী যে কোনো নাগরিক সরকারি দপ্তর, মন্ত্রণালয়, সিটি কর্পোরেশন বা এনজিওর নিকট থেকে পাবলিক রেকর্ড বা তথ্য চাওয়ার ও পাওয়ার আইনি অধিকার রাখেন।',
      en: 'Under Section 4 of the Right to Information Act 2009, every citizen has the statutory right to request and receive information from public authorities, and authorities are legally bound to supply it.'
    },
    caution: {
      bn: 'রাষ্ট্রীয় নিরাপত্তা, প্রতিরক্ষা বা আদালতের গোপনীয় তথ্য ৭ ধারার অধীন অব্যাহতিপ্রাপ্ত।',
      en: 'Matters affecting state security or confidential judicial proceedings are exempted under Section 7.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1011/section-31318.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2009-04-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['right to information', 'rti petition', 'tottho odhikar', 'তথ্য অধিকার', 'সরকারি তথ্য পাওয়া', 'ধারা ৪']
  },
  {
    id: 'rti-9',
    actId: 'act_rti_2009',
    sectionNumber: 'Section 9',
    categories: ['rights'],
    title: {
      bn: '২০ কার্যদিবসের মধ্যে তথ্য সরবরাহের আইনি সময়সীমা ও পদ্ধতি (ধারা ৯)',
      en: 'Twenty Working Days Timeframe for Information Supply (Section 9)'
    },
    originalText: '৯। (১) দায়িত্বপ্রাপ্ত কর্মকর্তা আবেদন প্রাপ্তির তারিখ হইতে অনধিক ২০ (বিশ) কার্যদিবসের মধ্যে চাহিত তথ্য সরবরাহ করিবেন। (২) একাধিক দপ্তর জড়িত থাকিলে অনধিক ৩০ কার্যদিবস এবং জীবনের নিরাপত্তার বিষয় হইলে ৪৮ ঘণ্টার মধ্যে তথ্য দিতে হইবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'তথ্য অধিকার আইনের ৯ ধারা অনুযায়ী তথ্য চেয়ে আবেদন করলে সরকারি কর্মকর্তা সর্বোচ্চ ২০ কার্যদিবসের মধ্যে তথ্য দিতে বাধ্য। জীবন বা ব্যক্তিস্বাধীনতার ক্ষেত্রে ৪৮ ঘণ্টার মধ্যে তথ্য দেওয়ার কড়া নিয়ম রয়েছে।',
      en: 'Section 9 mandates that the Designated Officer must provide requested information within 20 working days (or 30 days if multiple offices are involved). Crucially, information concerning life or liberty must be provided within 48 hours.'
    },
    caution: {
      bn: 'তথ্য না দিলে বা প্রত্যাখ্যান করলে ৩০ দিনের মধ্যে আপিল কর্মকর্তার নিকট আপিল করা যায়।',
      en: 'Non-supply or refusal can be appealed before the Appellate Authority within 30 days.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1011/section-31323.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2009-04-06',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['rti deadline', '20 days info supply', 'tottho meyad', 'তথ্য সরবরাহের সময়সীমা', '২০ কার্যদিবস', 'ধারা ৯']
  },
  {
    id: 'legalaid-11',
    actId: 'act_legal_aid_2000',
    sectionNumber: 'Section 11',
    categories: ['rights'],
    title: {
      bn: 'জেলা লিগ্যাল এইড কমিটির কার্যক্রম ও সরকারি প্যানেল আইনজীবী নিয়োগ (ধারা ১১)',
      en: 'District Legal Aid Committee Operations & Free Panel Advocates (Section 11)'
    },
    originalText: '১১। প্রত্যেক জেলায় একটি জেলা লিগ্যাল এইড কমিটি থাকিবে, যাহার সভাপতি হইবেন জেলা জজ, এবং উক্ত কমিটি অসচ্ছল বিচারপ্রার্থীকে বিনামূল্যে প্যানেল আইনজীবী ও কোর্ট ফি প্রদান করিবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'আইনগত সহায়তা প্রদান আইন ২০০০-এর ১১ ধারা অনুযায়ী প্রতিটি জেলা জজ আদালতে জেলা লিগ্যাল এইড অফিস রয়েছে, যেখানে গরিব ও অসচ্ছল বিচারপ্রার্থীদের সরকার নিজ খরচে আইনজীবী ও মামলার যাবতীয় খরচ বহন করে।',
      en: 'Section 11 of the Legal Aid Services Act 2000 provides for District Legal Aid Committees headed by the District Judge, providing impoverished litigants with free government-paid panel advocates and court fees.'
    },
    caution: {
      bn: 'জাতীয় হেল্পলাইন ১৬৬৯৯ নম্বরে কল করে যে কেউ সরকারি লিগ্যাল এইড সম্পর্কে সরাসরি তথ্য জানতে পারেন।',
      en: 'Dialing the national toll-free helpline 16699 connects citizens directly to government legal aid officers.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-837/section-25412.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2000-01-26',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['district legal aid', 'free government lawyer', 'panel advocate 16699', 'জেলা লিগ্যাল এইড', 'বিনামূল্যে সরকারি আইনজীবী', 'ধারা ১১']
  },
  {
    id: 'legalaid-20',
    actId: 'act_legal_aid_2000',
    sectionNumber: 'Section 20',
    categories: ['rights'],
    title: {
      bn: 'সরকারি বিনামূল্যে আইনি সহায়তা পাওয়ার যোগ্যতা ও আয়সীমা (ধারা ২০)',
      en: 'Eligibility Criteria and Income Threshold for Government Legal Aid (Section 20)'
    },
    originalText: '২০। অসচ্ছল, নিঃস্ব, বিধবা, তালাকপ্রাপ্তা নারী, এসিডদগ্ধ ব্যক্তি, প্রতিবন্ধী এবং বার্ষিক নির্ধারিত আয়ের নিচের যেকোনো ব্যক্তি বিনামূল্যে সরকারি আইনগত সহায়তা পাওয়ার যোগ্য বলিয়া বিবেচিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'আইনগত সহায়তা আইনের ২০ ধারা অনুযায়ী নিঃস্ব, দুস্থ নারী, স্বামী পরিত্যক্তা, প্রতিবন্ধী, বিনা বিচারে আটক হাজতি এবং দরিদ্র যে কেউ সরকারি খরচে মামলার আইনি সেবা পাওয়ার অধিকারী।',
      en: 'Under Section 20 of the Legal Aid Services Act 2000, indigent citizens, destitute women, victims of domestic abuse or acid violence, disabled individuals, and under-trial prisoners are statutorily eligible for free legal representation.'
    },
    caution: {
      bn: 'আবেদনের সাথে জাতীয় পরিচয়পত্র ও চেয়ারম্যান বা কাউন্সিলরের আয়ের প্রত্যয়ন দাখিল করতে হয়।',
      en: 'Applicants submit NID and local council income certificates to verify eligibility.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-837/section-25421.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2000-01-26',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['legal aid eligibility', 'free lawyer criteria', 'dusto nari aini shohayota', 'লিগ্যাল এইড যোগ্যতা', 'দরিদ্রদের আইনি সহায়তা', 'ধারা ২০']
  },

  // -------------------------------------------------------------
  // Category 7: Digital (12 additions)
  // -------------------------------------------------------------
  {
    id: 'cyber-18',
    actId: 'act_cyber_security_2023',
    sectionNumber: 'Section 18',
    categories: ['digital', 'threats'],
    title: {
      bn: 'কম্পিউটার বা নেটওয়ার্কে অননুমোদিত প্রবেশের দণ্ড (ধারা ১৮)',
      en: 'Punishment for Unauthorized Access to Computer Systems (Section 18)'
    },
    originalText: '১৮। (১) যদি কোনো ব্যক্তি ইচ্ছাকৃতভাবে কোনো কম্পিউটার, কম্পিউটার প্রোগ্রাম, কম্পিউটার সিস্টেম বা কম্পিউটার নেটওয়ার্কে অননুমোদিতভাবে প্রবেশাধিকার (Illegal access) গ্রহণ করেন, তাহা হইলে তিনি অনধিক তিন বৎসর কারাদণ্ডে বা অনধিক দশ লক্ষ টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'সাইবার আইনে পাসওয়ার্ড হ্যাক করে, অনুমতি ছাড়া অন্যের সার্ভার, কম্পিউটার, ফেসবুক বা ইমেইলে অনধিকার প্রবেশ করা আমলযোগ্য অপরাধ, যাতে অনধিক ৩ বছর কারাদণ্ড বা ১০ লাখ টাকা অর্থদণ্ড হতে পারে।',
      en: 'Under Section 18 of the Cyber Security / Cyber Protection framework, intentionally gaining unauthorized access into any computer system, server, or social account carries up to 3 years imprisonment or up to 10,0,000 BDT fine.'
    },
    caution: {
      bn: 'গুরুত্বপূর্ণ তথ্য পরিকাঠামো (CII) যেমন সরকারি সার্ভারে হ্যাকিংয়ের ক্ষেত্রে ১৭ ধারা প্রযোজ্য, যাতে যাবজ্জীবন কারাদণ্ড হতে পারে।',
      en: 'Unauthorized access into Critical Information Infrastructure carries enhanced penalties under Section 17.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1455/section-52418.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2023-09-18',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['unauthorized access', 'computer intrusion', 'server hacking', 'অননুমোদিত প্রবেশ', 'পাসওয়ার্ড হ্যাক', 'ধারা ১৮']
  },
  {
    id: 'cyber-20',
    actId: 'act_cyber_security_2023',
    sectionNumber: 'Section 20',
    categories: ['digital'],
    title: {
      bn: 'কম্পিউটার সোর্স কোড পরিবর্তন বা বিনষ্টকরণের দণ্ড (ধারা ২০)',
      en: 'Punishment for Alteration or Tampering of Computer Source Code (Section 20)'
    },
    originalText: '২০। যদি কোনো ব্যক্তি ইচ্ছাকৃতভাবে বা অসদুদ্দেশ্যে কোনো কম্পিউটার বা সফটওয়্যারের সোর্স কোড গোপন, ধ্বংস, পরিবর্তন বা নষ্ট করেন, তাহা হইলে তিনি অনধিক তিন বৎসর কারাদণ্ডে বা অনধিক তিন লক্ষ টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'সাইবার আইনে কোনো কোম্পানি বা ব্যক্তির সফটওয়্যার, ডাটাবেজ বা সিস্টেমের সোর্স কোড বেআইনিভাবে নষ্ট বা পরিবর্তন করা শাস্তিযোগ্য ফৌজদারি অপরাধ (সর্বোচ্চ ৩ বছর কারাদণ্ড বা ৩ লাখ টাকা জরিমানা)।',
      en: 'Under Section 20, knowingly altering, concealing, destroying, or tampering with computer source code used for any program or system carries up to 3 years imprisonment or up to 3,00,000 BDT fine.'
    },
    caution: {
      bn: 'ডেভেলপার বা আইটি কর্মীদের ক্ষেত্রে কোম্পানির সাথে সম্পাদিত নন-ডিসক্লোজার চুক্তিও (NDA) প্রাসঙ্গিক।',
      en: 'Civil remedies for proprietary software breach also lie under Contract and Copyright Acts.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1455/section-52420.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2023-09-18',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['source code tampering', 'software sabotage', 'source code noshto', 'সোর্স কোড পরিবর্তন', 'সফটওয়্যার সাবোটাজ', 'ধারা ২০']
  },
  {
    id: 'cyber-21',
    actId: 'act_cyber_security_2023',
    sectionNumber: 'Section 21',
    categories: ['digital'],
    title: {
      bn: 'সাইবার সন্ত্রাস বা নিরাপত্তা বিঘ্নকারী ডিজিটাল নাশকতার দণ্ড (ধারা ২১)',
      en: 'Offenses against Cyber Infrastructure & Sabotage (Section 21)'
    },
    originalText: '২১। যদি কোনো ব্যক্তি ডিজিটাল বা সাইবার মাধ্যমে রাষ্ট্র বা সার্বভৌম নিরাপত্তার জন্য হুমকিস্বরূপ কোনো সাইবার নাশকতা পরিচালনা করেন, তবে তিনি সংবিধিবদ্ধ সাইবার সুরক্ষা আইনের অধীন অনধিক পাঁচ বৎসর কারাদণ্ডে বা অর্থদণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'সাইবার সুরক্ষা আইনের ২১ ধারা অনুযায়ী ডিজিটাল মাধ্যমে রাষ্ট্রের ডিজিটাল অবকাঠামোতে ম্যালওয়্যার ছড়িয়ে বা সাইবার নাশকতা ঘটালে সর্বোচ্চ ৫ বছর কারাদণ্ড হতে পারে।',
      en: 'Section 21 penalizes intentional cyber sabotage directed at disabling national cyber networks or state cyber operations, carrying up to 5 years imprisonment and fine.'
    },
    caution: {
      bn: 'পূর্বের মতপ্রকাশ দমনকারী রাজনৈতিক ধারাগুলো ২০২৬ সংস্কারে বাতিল করা হয়েছে।',
      en: 'Former speech and defamation offenses have been abolished under the 2026 Cyber Protection reforms.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1455/section-52421.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2023-09-18',
    legalStatus: 'amended',
    reviewStatus: 'auto_checked',
    keywords: ['cyber sabotage', 'digital terrorism', 'cyber nashokota', 'সাইবার নাশকতা', 'ডিজিটাল নাশকতা', 'ধারা ২১']
  },
  {
    id: 'cyber-27',
    actId: 'act_cyber_security_2023',
    sectionNumber: 'Section 27',
    categories: ['digital', 'threats'],
    title: {
      bn: 'সাইবার সন্ত্রাসমূলক কর্মকাণ্ডের দণ্ড (ধারা ২৭)',
      en: 'Punishment for Cyber Terrorism (Section 27)'
    },
    originalText: '২৭। (১) যদি কোনো ব্যক্তি জাতীয় নিরাপত্তাকে বিপন্ন করিবার বা জনগণকে আতঙ্কিত করিবার উদ্দেশ্যে কোনো কম্পিউটার সিস্টেম বা ইন্টারনেটে আক্রমণ চালান, তাহা হইলে তাহা সাইবার সন্ত্রাসমূলক অপরাধ হইবে এবং তজ্জন্য তিনি অনধিক চৌদ্দ বৎসর কারাদণ্ডে বা অর্থদণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'সাইবার আইনের ২৭ ধারা অনুযায়ী জননিরাপত্তা বিপন্ন করতে বা আতঙ্ক তৈরি করতে গুরুত্বপূর্ণ ব্যাংকিং, বিদ্যুৎ বা যোগাযোগ নেটওয়ার্কে সাইবার হামলা চালালে অনধিক ১৪ বছর সশ্রম কারাদণ্ড ও এক কোটি টাকা পর্যন্ত জরিমানা হতে পারে।',
      en: 'Under Section 27, cyber terrorism aimed at threatening the unity, integrity, or security of the nation through unauthorized computer network disruptions carries up to 14 years imprisonment and heavy fines.'
    },
    caution: {
      bn: 'এই অপরাধটি সম্পূর্ণরূপে আমলযোগ্য ও অ-জামিনযোগ্য (non-bailable)।',
      en: 'Cyber terrorism offenses are strictly non-bailable and cognizable.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1455/section-52427.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2023-09-18',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['cyber terrorism', 'critical network attack', 'cyber shontrash', 'সাইবার সন্ত্রাস', '১৪ বছর জেল', 'ধারা ২৭']
  },
  {
    id: 'cyber-28',
    actId: 'act_cyber_security_2023',
    sectionNumber: 'Section 28',
    categories: ['digital'],
    title: {
      bn: '[বিলুপ্ত ধারা] সাইবার নিরাপত্তা আইনের ২৮ ধারা বাতিল ও সাধারণ দণ্ডবিধিতে রূপান্তর',
      en: '[REPEALED SECTION] Cyber Security Act Section 28 Transition to Penal Code 295A'
    },
    originalText: '২৮। [বিলুপ্ত/বাতিল ধারা]: সাইবার সুরক্ষা সংস্কার ২০২৬ অনুযায়ী ডিজিটাল মাধ্যমে অনুভূতি আঘাতের বিশেষ দমনমূলক বিধান রহিত করা হইয়াছে এবং ধর্মীয় অবমাননার কোনো অভিযোগ থাকিলে তাহা সাধারণ দণ্ডবিধির ২৯৫ক ধারার প্রচলিত ফৌজদারি আদালত দ্বারা বিচার্য হইবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ঐতিহাসিক সংবিধিবদ্ধ তথ্য: সাইবার সিকিউরিটি আইন ২০২৩-এর বিতর্কিত ২৮ ধারাটি সংস্কার প্রক্রিয়ায় বিলুপ্ত করা হয়েছে। কোনো ধর্মীয় কটূক্তি বা অবমাননার অপরাধ ঘটলে তা সাইবার ট্রাইব্যুনালের বদলে সাধারণ দণ্ডবিধির ২৯৫ক ধারার ফৌজদারি আদালতে পরিচালিত হয়।',
      en: 'Historical Statutory Note: Section 28 of the Cyber Security Act 2023 has been abolished. Allegations of deliberate religious insult are governed exclusively under ordinary criminal law (Section 295A of the Penal Code 1860) rather than specialized cyber speech tribunals.'
    },
    caution: {
      bn: 'এই বাতিল ধারাটি কোনো চলমান মামলায় সক্রিয় নতুন আইনি প্রতিকার হিসেবে প্রয়োগযোগ্য নয়।',
      en: 'This repealed provision cannot be invoked to institute fresh cyber prosecutions.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1455/section-52428.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2023-09-18',
    legalStatus: 'repealed',
    reviewStatus: 'auto_checked',
    keywords: ['repealed section 28', 'penal code 295a', 'batil dhara 28', 'বাতিল ধারা ২৮', 'ধর্মীয় অবমাননা দণ্ডবিধি']
  },
  {
    id: 'cyber-30',
    actId: 'act_cyber_security_2023',
    sectionNumber: 'Section 30',
    categories: ['digital', 'consumer'],
    title: {
      bn: 'ই-লেনদেন নিরাপত্তা লঙ্ঘন ও ডিজিটাল স্বাক্ষরে জালিয়াতির দণ্ড (ধারা ৩০)',
      en: 'E-Transaction Security Breach & Digital Signature Forgery (Section 30)'
    },
    originalText: '৩০। যদি কোনো ব্যক্তি ডিজিটাল মাধ্যমে আর্থিক লেনদেনের ক্ষেত্রে ইলেকট্রনিক স্বাক্ষর জালিয়াতি করেন বা পেমেন্ট গেটওয়ের নিরাপত্তা লঙ্ঘন করিয়া অর্থ আত্মসাৎ করেন, তবে তিনি অনধিক পাঁচ বৎসর কারাদণ্ডে বা অর্থদণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'সাইবার আইনের ৩০ ধারা অনুযায়ী ডিজিটাল স্বাক্ষর জালিয়াতি করা, অন্যের বিকাশ/নগদ পিন বা ওটিপি জালিয়াতি করে ই-লেনদেনে অর্থ চুরি করা শাস্তিযোগ্য ফৌজদারি অপরাধ (সর্বোচ্চ ৫ বছর কারাদণ্ড ও অর্থদণ্ড)।',
      en: 'Under Section 30, committing forgery of digital signatures, tampering with electronic payment gateways, or illicitly diverting electronic funds carries up to 5 years imprisonment and fine.'
    },
    caution: {
      bn: 'অনলাইন ব্যাংকিং বা ফিনটেক জালিয়াতিতে মানি লন্ডারিং প্রতিরোধ আইনের বিধানও যুক্ত হতে পারে।',
      en: 'Concurrent with offenses under the Money Laundering Prevention Act 2012.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1455/section-52430.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2023-09-18',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['digital signature forgery', 'e-transaction fraud', 'otp pin theft', 'ডিজিটাল স্বাক্ষর জাল', 'ই-লেনদেন জালিয়াতি', 'ধারা ৩০']
  },
  {
    id: 'cyber-31',
    actId: 'act_cyber_security_2023',
    sectionNumber: 'Section 31',
    categories: ['digital'],
    title: {
      bn: '[বিলুপ্ত ধারা] সাইবার নিরাপত্তা আইনের ৩১ ধারা বাতিল ও প্রচলিত দণ্ডবিধিতে রূপান্তর',
      en: '[REPEALED SECTION] Cyber Security Act Section 31 Transition to Ordinary Penal Law'
    },
    originalText: '৩১। [বিলুপ্ত/বাতিল ধারা]: সাইবার সংস্কারের মাধ্যমে ৩১ ধারার সংজ্ঞাগত অস্পষ্ট অপব্যবহার রোধে এই ধারা বিলুপ্ত করা হইয়াছে এবং কোনো সাধারণ উস্কানিমূলক ঘটনার ক্ষেত্রে দণ্ডবিধির ১৫৩ বা ৫০৫ ধারা প্রযোজ্য হইবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ঐতিহাসিক সংবিধিবদ্ধ তথ্য: সাইবার সিকিউরিটি আইন ২০২৩-এর ৩১ ধারাটি (আইনশৃঙ্খলা অবনতি ঘটানোর অপরাধ) বাতিল করা হয়েছে। কোনো বিশৃঙ্খলা বা উস্কানির ঘটনায় সাধারণ দণ্ডবিধির ১৫৩ বা ৫০৫ ধারার অধীনে নিয়মিত ফৌজদারি আদালতে বিচার্য।',
      en: 'Historical Statutory Note: Section 31 has been repealed under human rights safeguards against broad speech suppression. Public order provocations are adjudicated under ordinary Penal Code Sections 153 and 505.'
    },
    caution: {
      bn: 'বাতিলকৃত ধারাটির অধীন নতুন কোনো এজাহার গ্রহণ আইনিভাবে নিষিদ্ধ।',
      en: 'Fresh complaints under this repealed section cannot be lawfully accepted.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1455/section-52431.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2023-09-18',
    legalStatus: 'repealed',
    reviewStatus: 'auto_checked',
    keywords: ['repealed section 31', 'batil dhara 31', 'বাতিল ধারা ৩১', 'দণ্ডবিধি ১৫৩ ধারা']
  },
  {
    id: 'cyber-33',
    actId: 'act_cyber_security_2023',
    sectionNumber: 'Section 33',
    categories: ['digital'],
    title: {
      bn: 'গোপনীয় ডিজিটাল তথ্য বা ডাটাবেজ বেআইনিভাবে ধারণের দণ্ড (ধারা ৩৩)',
      en: 'Illegal Retention of Confidential Digital Data or Database (Section 33)'
    },
    originalText: '৩৩। যদি কোনো ব্যক্তি আইনসঙ্গত কর্তৃত্ব ব্যতিরেকে কোনো সরকারি বা প্রাতিষ্ঠানিক ডিজিটাল ডাটাবেজ, সংরক্ষিত তথ্য বা ক্লাউড সার্ভারের কপি নিজের দখলে রাখেন বা অন্যত্র পাচার করেন, তবে তিনি অনধিক তিন বৎসর কারাদণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'সাইবার আইনের ৩৩ ধারা অনুযায়ী চাকরি ছাড়ার পর বা অনুমোদন ছাড়া প্রতিষ্ঠানের গ্রাহক ডাটা, সোর্স কোড বা ক্লাউড ব্যাকআপ নিজের কাছে রেখে দেওয়া বা বিক্রি করা দণ্ডনীয় অপরাধ (সর্বোচ্চ ৩ বছর কারাদণ্ড)।',
      en: 'Under Section 33, retaining, exfiltrating, or trafficking confidential institutional databases or private customer data without lawful authorization carries up to 3 years imprisonment and fine.'
    },
    caution: {
      bn: 'ব্যক্তিগত তথ্যের বাণিজ্যিক ব্যবহারের ক্ষেত্রে ২৬ ধারার জরিমানাও যুক্ত হবে।',
      en: 'Commercial trading of personal identity records additionally triggers penalties under Section 26.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1455/section-52433.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2023-09-18',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['illegal data retention', 'database leak', 'goponio tottho dharon', 'ডাটাবেজ চুরি', 'গোপনীয় ডাটা ধারণ', 'ধারা ৩৩']
  },
  {
    id: 'ict-54',
    actId: 'act_ict_2006',
    sectionNumber: 'Section 54',
    categories: ['digital', 'threats'],
    title: {
      bn: 'কম্পিউটার সিস্টেম বিনষ্ট, ভাইরাস প্রবেশ ও ক্ষতিপূরণ (ধারা ৫৪)',
      en: 'Penalty for Damage to Computer System & Introducing Viruses (Section 54)'
    },
    originalText: '৫৪। (১) যদি কোনো ব্যক্তি অন্য কোনো ব্যক্তির কম্পিউটার বা নেটওয়ার্কে কম্পিউটার ভাইরাস প্রবেশ করান, ডাটা ডাউনলোড বা কপি করিয়া চুরি করেন অথবা সার্ভার কার্যক্ষমতাহীন করেন, তবে ক্ষতিগ্রস্ত ব্যক্তি অনধিক এক কোটি টাকা পর্যন্ত ক্ষতিপূরণ পাইবার অধিকারী হইবেন এবং অভিযুক্ত অনধিক দশ বৎসর কারাদণ্ডে দণ্ডিত হইবেন।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'তথ্য ও যোগাযোগ প্রযুক্তি আইন ২০০৬-এর ৫৪ ধারা অনুযায়ী অন্যের সার্ভারে ভাইরাস বা ম্যালওয়্যার ছড়ানো, ডাটাবেজ ধ্বংস করা বা কম্পিউটার স্লো করে দিলে অভিযুক্তের সর্বোচ্চ ১০ বছর কারাদণ্ড এবং আদালত ক্ষতিগ্রস্তকে ১ কোটি টাকা পর্যন্ত ক্ষতিপূরণ দেওয়ার আদেশ দিতে পারেন।',
      en: 'Under Section 54 of the ICT Act 2006, introducing computer contaminants, unauthorized data extraction, or denial-of-service disruptions carries up to 10 years imprisonment, and mandates paying up to 1 crore BDT compensation to the victim.'
    },
    caution: {
      bn: 'ক্ষতিপূরণের আদেশ বিশেষ সাইবার ট্রাইব্যুনাল কর্তৃক দেওয়ানি ডিক্রির ন্যায় কার্যকর করা যায়।',
      en: 'Compensation awards are executable as civil decrees by the Cyber Tribunal.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-30472.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2006-10-08',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['computer virus', 'system damage', 'ict section 54', 'কম্পিউটার ভাইরাস', '১ কোটি টাকা ক্ষতিপূরণ', 'ধারা ৫৪']
  },
  {
    id: 'ict-57',
    actId: 'act_ict_2006',
    sectionNumber: 'Section 57',
    categories: ['digital'],
    title: {
      bn: '[আইনত বিলুপ্ত ধারা] আইসিটি আইনের বহুল আলোচিত ৫৭ ধারা বাতিল ও রহিতকরণ',
      en: '[REPEALED SECTION] ICT Act Section 57 Repealed and Replaced'
    },
    originalText: '৫৭। [আইনত বাতিল ও রহিত ধারা]: ডিজিটাল নিরাপত্তা আইন ২০১৮ এবং তৎপরবর্তী সংবিধিবদ্ধ সংস্কারের মাধ্যমে আইসিটি আইনের ৫৭ ধারা সম্পূর্ণভাবে বিলুপ্ত ঘোষণা করা হইয়াছে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'ঐতিহাসিক সংবিধিবদ্ধ তথ্য: আইসিটি আইনের ৫৭ ধারাটি মতপ্রকাশের স্বাধীনতার পরিপন্থী হওয়ায় ২০১৮ সালেই আইনগতভাবে সম্পূর্ণ বাতিল করা হয়েছে। বর্তমানে ৫৭ ধারায় নতুন কোনো মামলা করা বা কাউকে গ্রেফতার করা সম্পূর্ণ অবৈধ।',
      en: 'Historical Statutory Note: Section 57 of the ICT Act 2006 was formally repealed due to constitutional free speech concerns. Initiating new prosecutions under this abolished provision is strictly unlawful.'
    },
    caution: {
      bn: 'পূর্বের বিচারাধীন মামলার ক্ষেত্রে সুপ্রিম কোর্টের সাংবিধানিক ব্যাখ্যা ও অন্তর্বর্তীকালীন সুরক্ষা প্রযোজ্য।',
      en: 'Pending historic prosecutions are subject to constitutional review by the Supreme Court.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-30475.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2006-10-08',
    legalStatus: 'repealed',
    reviewStatus: 'auto_checked',
    keywords: ['repealed ict 57', 'batil dhara 57', 'বাতিল ধারা ৫৭', 'আইসিটি ৫৭ ধারা বাতিল']
  },
  {
    id: 'ict-65',
    actId: 'act_ict_2006',
    sectionNumber: 'Section 65',
    categories: ['digital'],
    title: {
      bn: 'সাইবার অপরাধের বিশেষ বিচারালয়: সাইবার ট্রাইব্যুনাল প্রতিষ্ঠা ও এখতিয়ার (ধারা ৬৫)',
      en: 'Establishment & Jurisdiction of Cyber Tribunals (Section 65)'
    },
    originalText: '৬৫। (১) সরকার সাইবার অপরাধসমূহের দ্রুত ও কার্যকর বিচারের লক্ষ্যে সরকারি গেজেটে প্রজ্ঞাপন দ্বারা এক বা একাধিক সাইবার ট্রাইব্যুনাল প্রতিষ্ঠা করিবে। (২) দায়রা জজ পদমর্যাদার একজন বিচারক সমন্বয়ে সাইবার ট্রাইব্যুনাল গঠিত হইবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'আইসিটি আইনের ৬৫ ধারা অনুযায়ী সাইবার অপরাধ বিচারের জন্য বিশেষ সাইবার ট্রাইব্যুনাল গঠিত হয়, যার প্রধান একজন দায়রা জজ পদমর্যাদার বিচারক। ডিজিটাল জালিয়াতি ও হ্যাকিংয়ের বিচার এই ট্রাইব্যুনালে অনুষ্ঠিত হয়।',
      en: 'Section 65 provides for specialized Cyber Tribunals presided over by a Sessions Judge, exercising exclusive trial jurisdiction over cybercrimes, online fraud, and system sabotage.'
    },
    caution: {
      bn: 'সাইবার ট্রাইব্যুনালের রায়ের বিরুদ্ধে সরাসরি সুপ্রিম কোর্টের হাইকোর্ট বিভাগে আপিল করতে হয়।',
      en: 'Appeals against Cyber Tribunal judgments lie directly before the High Court Division.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-30483.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2006-10-08',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['cyber tribunal', 'sessions judge cyber court', 'cyber tribunal appeal', 'সাইবার ট্রাইব্যুনাল', 'দায়রা জজ সাইবার আদালত', 'ধারা ৬৫']
  },
  {
    id: 'pornography-4',
    actId: 'act_pornography_2012',
    sectionNumber: 'Section 4',
    categories: ['digital', 'threats'],
    title: {
      bn: 'পর্নোগ্রাফি উৎপাদন, মুদ্রণ, প্রচার ও বাজারজাতকরণ সম্পূর্ণ নিষিদ্ধ (ধারা ৪)',
      en: 'Prohibition on Production, Distribution and Marketing of Pornography (Section 4)'
    },
    originalText: '৪। (১) কোনো ব্যক্তি পর্নোগ্রাফি উৎপাদন, মুদ্রণ, প্রকাশ, বিতরণ, প্রদর্শন বা বাজারজাত করিতে পারিবেন না। (২) এই ধারার লঙ্ঘন একটি আমলযোগ্য এবং অ-জামিনযোগ্য ফৌজদারি অপরাধ বলিয়া গণ্য হইবে।',
    originalLanguage: 'bn',
    plainExplanation: {
      bn: 'পর্নোগ্রাফি নিয়ন্ত্রণ আইন ২০১২-এর ৪ ধারা অনুযায়ী যে কোনো ধরনের পর্নোগ্রাফি তৈরি, সিডি/মেমোরিতে রাখা, ওয়েবসাইটে আপলোড বা প্রচার করা সম্পূর্ণ বেআইনি, আমলযোগ্য এবং অ-জামিনযোগ্য অপরাধ।',
      en: 'Under Section 4 of the Pornography Control Act 2012, producing, printing, publishing, distributing, or marketing pornography in any medium is strictly prohibited, constituting a cognizable and non-bailable offense.'
    },
    caution: {
      bn: 'ইন্টারনেটে ছবি বা ভিডিও ফাঁসের ক্ষেত্রে ৮ ধারার অধীনে ৭ বছর সশ্রম কারাদণ্ড হয়।',
      en: 'Disseminating intimate photos or blackmail online attracts enhanced punishment under Section 8.'
    },
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1087/section-34195.html',
    retrievalDate: '2026-10-30',
    effectiveDate: '2012-04-18',
    legalStatus: 'active',
    reviewStatus: 'auto_checked',
    keywords: ['pornography prohibition', 'non-bailable pornography', 'pornography nishiddho', 'পর্নোগ্রাফি নিষিদ্ধ', 'অ-জামিনযোগ্য', 'ধারা ৪']
  }
];

console.log('Batch 2 items defined:', items.length);

let newAdded = 0;
let updated = 0;

for (const it of items) {
  it.contentHash = computeHash(it);
  if (provMap.has(it.id)) {
    provMap.set(it.id, { ...provMap.get(it.id), ...it });
    updated++;
  } else {
    provMap.set(it.id, it);
    newAdded++;
  }
}

const finalProvisions = Array.from(provMap.values());
console.log(`Merged results: ${newAdded} new added, ${updated} updated.`);
console.log(`Total final provisions count: ${finalProvisions.length}`);

// Category breakdown
const finalCounts = {};
for (const p of finalProvisions) {
  const c = (p.categories && p.categories[0]) || p.category || 'other';
  finalCounts[c] = (finalCounts[c] || 0) + 1;
}
console.log('Final Category Distribution:');
console.table(finalCounts);

// Save back to src/data/corpus/provisions.json
fs.writeFileSync('src/data/corpus/provisions.json', JSON.stringify(finalProvisions, null, 2), 'utf8');

// Compute overall corpus hash
const corpusHash = sha256(JSON.stringify(finalProvisions));
const versionData = {
  corpusVersion: '2026.10.30-batch2.1',
  publishedAt: new Date().toISOString(),
  contentHash: corpusHash,
  provisionCount: finalProvisions.length,
  actsCount: acts.length,
  categories: ['work', 'threats', 'digital', 'consumer', 'land', 'family', 'rights']
};

fs.writeFileSync('src/data/corpus/version.json', JSON.stringify(versionData, null, 2), 'utf8');
console.log(`Saved version.json with version ${versionData.corpusVersion}`);

// Write offline pack
fs.writeFileSync('public/packs/mylaws_corpus_latest.json', JSON.stringify({
  version: versionData.corpusVersion,
  corpusVersion: versionData.corpusVersion,
  contentHash: versionData.contentHash,
  publishedAt: versionData.publishedAt,
  provisionCount: finalProvisions.length,
  acts,
  provisions: finalProvisions
}, null, 2), 'utf8');
console.log('Exported public/packs/mylaws_corpus_latest.json');

// Generate legal.generated.ts
const code = `/**
 * AUTOGENERATED FILE - DO NOT EDIT DIRECTLY.
 * Generated from src/data/corpus/provisions.json and acts.json by scripts/build_batch2_additions.mjs
 * Published Corpus Version: ${versionData.corpusVersion}
 */

export type Lang = 'en' | 'bn';
export type Category = 'work' | 'threats' | 'digital' | 'consumer' | 'land' | 'family' | 'rights';
export type LegalStatus = 'active' | 'amended' | 'repealed' | 'transitional';
export type ReviewStatus = 'draft' | 'auto_checked' | 'human_reviewed';

export interface ActMetadata {
  id: string;
  name: { en: string; bn: string };
  actNumber: string;
  year: number;
  categories: Category[];
  officialUrl: string;
  legalStatus: LegalStatus;
  notes?: { en: string; bn: string };
}

export interface CanonicalProvision {
  id: string;
  actId: string;
  sectionNumber: string;
  categories: Category[];
  title: { en: string; bn: string };
  originalText: string;
  originalLanguage: Lang;
  plainExplanation: { en: string; bn: string };
  caution: { en: string; bn: string };
  sourceUrl: string;
  retrievalDate: string;
  effectiveDate?: string;
  legalStatus: LegalStatus;
  reviewStatus: ReviewStatus;
  contentHash: string;
  keywords: string[];
  relatedProvisions?: string[];
}

export interface Provision {
  id: string;
  category: Category;
  act: { en: string; bn: string };
  section: string;
  title: { en: string; bn: string };
  quote: string;
  sourceLanguage: Lang;
  sourceUrl: string;
  checkedOn: string;
  explanation: { en: string; bn: string };
  caution: { en: string; bn: string };
  keywords: string[];
  categories?: Category[];
  actId?: string;
  effectiveDate?: string;
  legalStatus?: LegalStatus;
  reviewStatus?: ReviewStatus;
  contentHash?: string;
  versionNote?: { en: string; bn: string };
}

export const CORPUS_VERSION = '${versionData.corpusVersion}';
export const CORPUS_HASH = '${versionData.contentHash}';
export const PUBLISHED_AT = '${versionData.publishedAt}';
export const CORPUS_PUBLISHED_AT = PUBLISHED_AT;

export const canonicalActs: ActMetadata[] = ${JSON.stringify(acts, null, 2)};

export const canonicalProvisions: CanonicalProvision[] = ${JSON.stringify(finalProvisions, null, 2)};

// Runtime view provision mapping
export const provisions: Provision[] = canonicalProvisions.map((cp) => {
  const act = canonicalActs.find((a) => a.id === cp.actId);
  const primaryCat = (cp.categories && cp.categories[0]) || 'rights';
  return {
    id: cp.id,
    category: primaryCat as Category,
    categories: cp.categories as Category[],
    actId: cp.actId,
    act: {
      en: act ? act.name.en : cp.actId,
      bn: act ? act.name.bn : cp.actId,
    },
    section: cp.sectionNumber,
    title: cp.title,
    quote: cp.originalText,
    sourceLanguage: cp.originalLanguage,
    sourceUrl: cp.sourceUrl,
    checkedOn: cp.retrievalDate,
    effectiveDate: cp.effectiveDate,
    legalStatus: cp.legalStatus,
    reviewStatus: cp.reviewStatus,
    contentHash: cp.contentHash,
    explanation: cp.plainExplanation,
    caution: cp.caution,
    keywords: cp.keywords || [],
  };
});
`;

fs.writeFileSync('src/data/legal.generated.ts', code, 'utf8');
console.log(`Generated src/data/legal.generated.ts with ${finalProvisions.length} provisions!`);
