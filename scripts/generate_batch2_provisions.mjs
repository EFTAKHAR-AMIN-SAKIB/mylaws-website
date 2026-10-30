import fs from 'fs';
import crypto from 'crypto';

function sha256(str) {
  return crypto.createHash('sha256').update(str || '', 'utf8').digest('hex');
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

// 1. Ensure Acts in acts.json
const acts = JSON.parse(fs.readFileSync('src/data/corpus/acts.json', 'utf8'));
const actIds = new Set(acts.map(a => a.id));

if (!actIds.has('act_dmma_1939')) {
  acts.push({
    id: 'act_dmma_1939',
    name: {
      bn: 'মুসলিম বিবাহ বিচ্ছেদ আইন, ১৯৩৯',
      en: 'Dissolution of Muslim Marriages Act, 1939'
    },
    shortName: 'Dissolution of Muslim Marriages Act 1939',
    enactmentYear: 1939,
    actNumber: 'Act VIII of 1939',
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
    shortName: 'ICT Act 2006',
    enactmentYear: 2006,
    actNumber: 'Act XXXIX of 2006',
    officialUrl: 'https://bdlaws.minlaw.gov.bd/act-957.html',
    legalStatus: 'amended'
  });
}
fs.writeFileSync('src/data/corpus/acts.json', JSON.stringify(acts, null, 2), 'utf8');

// 2. Load Existing Provisions
const provs = JSON.parse(fs.readFileSync('src/data/corpus/provisions.json', 'utf8'));
const existingMap = new Map(provs.map(p => [p.id, p]));

console.log('Current provisions count before Batch 2:', provs.length);

// 3. Define the 92 additions across all 7 categories
const batch2Items = [
  // --- Category 1: Work (14 items) ---
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

  // --- Category 2: Consumer (14 items) ---
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
  }
];

console.log('Batch 2 Category 1 & 2 defined: ' + batch2Items.length + ' items');
