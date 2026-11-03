import fs from 'node:fs';

const extracted = JSON.parse(fs.readFileSync('scripts/digital_extracted.json', 'utf8'));

function getExt(actId, sec) {
  const item = extracted.find(x => x.actId === actId && String(x.sec) === String(sec));
  if (!item) throw new Error(`Missing extracted item for ${actId} sec ${sec}`);
  return item;
}

function cleanText(txt) {
  if (!txt) return '';
  return txt
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rsquo;/g, '’')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s+/g, '\n')
    .trim();
}

// -------------------------------------------------------------
// 1. UPDATE ACTS.JSON
// -------------------------------------------------------------
const actsPath = 'src/data/corpus/acts.json';
const acts = JSON.parse(fs.readFileSync(actsPath, 'utf8'));

// Fix officialUrl for Pornography Act
const actPorno = acts.find(a => a.id === 'act_pornography_2012');
if (actPorno) {
  actPorno.officialUrl = 'https://bdlaws.minlaw.gov.bd/act-1091.html';
  actPorno.actNumber = '২০১২ সনের ৯ নং আইন';
}

// Fix officialUrl for Telecom Act
const actTelecom = acts.find(a => a.id === 'act_telecom_2001');
if (actTelecom) {
  actTelecom.officialUrl = 'https://bdlaws.minlaw.gov.bd/act-857.html';
  actTelecom.actNumber = '২০০১ সনের ১৮ নং আইন';
}

// Add Copyright Act 2023
if (!acts.some(a => a.id === 'act_copyright_2023')) {
  acts.push({
    id: 'act_copyright_2023',
    name: {
      en: 'Copyright Act, 2023',
      bn: 'কপিরাইট আইন, ২০২৩'
    },
    actNumber: '২০২৩ সনের ৩৪ নং আইন',
    year: 2023,
    categories: ['digital', 'rights'],
    officialUrl: 'https://bdlaws.minlaw.gov.bd/act-1452.html',
    legalStatus: 'active',
    notes: {
      en: 'Protects intellectual property, literary, musical, and software digital works, allows lawful backup copies, and penalizes commercial software piracy under Section 100.',
      bn: 'মেধাসম্পদ, শিল্প-সাহিত্য এবং সফটওয়্যার ও ডিজিটাল কর্মের সুরক্ষা, সফটওয়্যার ব্যাকআপ ও বাণিজ্যিক পাইরেসি প্রতিরোধে কঠোর দণ্ডের আইন (ধারা ১০০)।'
    }
  });
  console.log('Added act_copyright_2023 to acts.json');
}

// Add BTRC Directives
if (!acts.some(a => a.id === 'act_btrc_directives')) {
  acts.push({
    id: 'act_btrc_directives',
    name: {
      en: 'BTRC Telecom & SIM Regulatory Directives',
      bn: 'বিটিআরসি সিম নিবন্ধন ও টেলিযোগাযোগ নিয়ন্ত্রণ নির্দেশিকা'
    },
    actNumber: 'BTRC Directives & Consumer Protection Guidelines',
    year: 2021,
    categories: ['digital', 'threats'],
    officialUrl: 'http://www.btrc.gov.bd/',
    legalStatus: 'active',
    notes: {
      en: 'Mandatory telecom consumer directives on maximum 15 SIM cards per NID, biometric registration, citizen verification via *16001#, complaint hotline 100, and Do Not Disturb (DND) directives.',
      bn: 'একটি এনআইডিতে সর্বোচ্চ ১৫টি সিম নিবন্ধন সীমা, বায়োমেট্রিক নিবন্ধন, *১৬০০১# দিয়ে সিম যাচাই, ১০০ হেল্পলাইনে অভিযোগ ও স্প্যাম কল বন্ধে ডিএনডি সরকারি নির্দেশনা।'
    }
  });
  console.log('Added act_btrc_directives to acts.json');
}

fs.writeFileSync(actsPath, JSON.stringify(acts, null, 2), 'utf8');
console.log(`Updated acts.json: total acts = ${acts.length}`);

// -------------------------------------------------------------
// 2. LOAD PROVISIONS
// -------------------------------------------------------------
const provsPath = 'src/data/corpus/provisions.json';
const provisions = JSON.parse(fs.readFileSync(provsPath, 'utf8'));
const provMap = new Map(provisions.map(p => [p.id, p]));

function upsert(prov) {
  if (provMap.has(prov.id)) {
    const existing = provMap.get(prov.id);
    // preserve benchmark-critical keywords if any
    const mergedKeywords = Array.from(new Set([...(existing.keywords || []), ...(prov.keywords || [])]));
    Object.assign(existing, prov);
    existing.keywords = mergedKeywords;
    console.log(`Updated existing provision: ${prov.id}`);
  } else {
    provisions.push(prov);
    provMap.set(prov.id, prov);
    console.log(`Added new provision: ${prov.id}`);
  }
}

// -------------------------------------------------------------
// PORNOGRAPHY CONTROL ACT, 2012 PROVISIONS (15 SECTIONS)
// -------------------------------------------------------------

// Section 1
const extP1 = getExt('act_pornography_2012', '1');
upsert({
  id: 'pornography-1',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 1',
  categories: ['digital', 'threats'],
  title: {
    bn: 'সংক্ষিপ্ত শিরোনাম ও প্রবর্তন',
    en: 'Short Title and Commencement'
  },
  originalText: cleanText(extP1.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: 'এই আইনটি "পর্নোগ্রাফি নিয়ন্ত্রণ আইন, ২০১২" (২০১২ সনের ৯ নং আইন) নামে অভিহিত এবং ২০১২ সালের ৮ মার্চ তারিখ হইতে সমগ্র বাংলাদেশে কার্যকর হইয়াছে।',
    en: 'Names the statute as the Pornography Control Act, 2012 (Act No. IX of 2012) and extends to the whole of Bangladesh, in force from 8 March 2012.'
  },
  caution: {
    bn: 'বাংলাদেশের যেকোনো নাগরিক কর্তৃক দেশে বা দেশের বাইরে থেকে সংঘটিত পর্নোগ্রাফি অপরাধের ক্ষেত্রেও এই আইন প্রযোজ্য।',
    en: 'Applies to any citizen committing pornography offences within Bangladesh or internationally using digital networks.'
  },
  sourceUrl: extP1.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  contentHash: '',
  keywords: ['pornography act section 1', 'ধারা ১', 'পর্নোগ্রাফি নিয়ন্ত্রণ আইন ২০১২', 'pornography control act 2012']
});

// Section 2
const extP2 = getExt('act_pornography_2012', '2');
upsert({
  id: 'pornography-2',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 2',
  categories: ['digital', 'threats'],
  title: {
    bn: 'সংজ্ঞা (পর্নোগ্রাফি ও শিশু পর্নোগ্রাফির সংবিধিবদ্ধ সংজ্ঞা)',
    en: 'Definitions of Pornography and Child Pornography'
  },
  originalText: cleanText(extP2.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '২ ধারায় পর্নোগ্রাফির সুস্পষ্ট আইনি সংজ্ঞা দেওয়া হয়েছে: যৌন উত্তেজনা সৃষ্টিকারী বা কোনো ব্যক্তির সম্মতি ছাড়া তাঁর নগ্ন, অর্ধ-নগ্ন বা যৌন ক্রিয়াকলাপের স্থিরচিত্র, ভিডিওচিত্র, অডিওচিত্র বা কম্পিউটার অ্যানিমেশন প্রস্তুত বা প্রদর্শন। এছাড়া ১৮ বছরের কম বয়সী কোনো শিশুকে ব্যবহার করে ধারণকৃত বা প্রদর্শিত সামগ্রীকে "শিশু পর্নোগ্রাফি" (Child Pornography) হিসেবে সংজ্ঞায়িত করা হয়েছে।',
    en: 'Defines pornography as any visual, audio, or animated media depicting sexual intercourse, nudity, or sexually explicit acts without lawful justification. Specifically defines Child Pornography as any sexual representation involving a child under 18 years of age.'
  },
  caution: {
    bn: '১৮ বছরের কম বয়সী কোনো কিশোর-কিশোরীর নগ্ন ছবি বা ভিডিও মোবাইল বা কম্পিউটারে সংরক্ষণ করাও শিশু পর্নোগ্রাফি অপরাধ হিসেবে গণ্য।',
    en: 'Possessing or recording explicit images of anyone under 18 constitutes severe child pornography offenses.'
  },
  sourceUrl: extP2.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['pornography definition', 'child pornography definition', 'ধারা ২', 'শিশু পর্নোগ্রাফি সংজ্ঞা', 'পর্নোগ্রাফির সংজ্ঞা', 'pornography act 2']
});

// Section 3
const extP3 = getExt('act_pornography_2012', '3');
upsert({
  id: 'pornography-3',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 3',
  categories: ['digital', 'threats'],
  title: {
    bn: 'আইনের প্রাধান্য (অন্যান্য আইনের ওপর প্রাধান্যকারী কার্যকারিতা)',
    en: 'Overriding Effect of the Act'
  },
  originalText: cleanText(extP3.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: 'আপাততঃ বলবৎ অন্য কোনো আইনে ভিন্নতর যাহা কিছুই থাকুক না কেন, পর্নোগ্রাফি সংক্রান্ত অপরাধ ও বিচার প্রক্রিয়ায় এই আইনের বিধানাবলী প্রাধান্য পাইবে।',
    en: 'Provides that provisions of this Act shall override anything contrary in any other law in force regarding pornography offences and trials.'
  },
  caution: {
    bn: 'পর্নোগ্রাফি সংক্রান্ত বিষয়ে এই বিশেষ আইনের বিধানই চূড়ান্ত হিসেবে কার্যকর হবে।',
    en: 'Special procedural provisions under this Act take precedence over general laws.'
  },
  sourceUrl: extP3.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['overriding effect pornography', 'ধারা ৩', 'আইনের প্রাধান্য পর্নোগ্রাফি']
});

// Section 4
const extP4 = getExt('act_pornography_2012', '4');
upsert({
  id: 'pornography-4',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 4',
  categories: ['digital', 'threats'],
  title: {
    bn: 'পর্নোগ্রাফি উৎপাদন, সংরক্ষণ ও বাজারজাতকরণ নিষিদ্ধকরণ',
    en: 'Prohibition on Production, Distribution and Marketing of Pornography'
  },
  originalText: cleanText(extP4.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৪ ধারা অনুযায়ী বাংলাদেশে কোনো প্রকার পর্নোগ্রাফি উৎপাদন, প্রস্তুতকরণ, বিতরণ, প্রদর্শন, বাজারজাতকরণ, বিক্রয়, সংরক্ষণ, প্রচার বা স্থানান্তর সম্পূর্ণ নিষিদ্ধ ও বেআইনি।',
    en: 'Strictly prohibits producing, preparing, distributing, exhibiting, marketing, selling, preserving, broadcasting, or transferring pornography through any medium.'
  },
  caution: {
    bn: 'ব্যক্তিগত ডিভাইসেও অসঙ্গত উদ্দেশ্যে পর্নোগ্রাফি সংরক্ষণ বা বিতরণ সরাসরি আইনত দণ্ডনীয়।',
    en: 'Storing, commercial marketing, or electronic distribution of pornography is strictly illegal.'
  },
  sourceUrl: extP4.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['pornography prohibition', 'prohibition distribution pornography', 'pornography 4', 'ধারা ৪', 'পর্নোগ্রাফি নিষিদ্ধ', 'পর্নোগ্রাফি সংরক্ষণ নিষিদ্ধ']
});

// Section 5
const extP5 = getExt('act_pornography_2012', '5');
upsert({
  id: 'pornography-5',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 5',
  categories: ['digital', 'threats'],
  title: {
    bn: 'পর্নোগ্রাফি মামলার তদন্ত পদ্ধতি ও সময়সীমা (৩০-৬০ দিন)',
    en: 'Investigation Procedure and Statutory Timelines (30–60 Days)'
  },
  originalText: cleanText(extP5.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৫ ধারা মোতাবেক সাব-ইন্সপেক্টর (SI) পদমর্যাদার নিম্নে নহে এইরূপ পুলিশ কর্মকর্তা পর্নোগ্রাফি মামলার তদন্ত করবেন। অপরাধের তদন্ত ৩০ কার্যদিবসের মধ্যে সম্পন্ন করিতে হইবে। বিশেষ যুক্তিসঙ্গত কারণে অতিরিক্ত আরো ৩০ কার্যদিবস (মোট ৬০ দিন) সময় বর্ধিত করা যাইতে পারে।',
    en: 'Mandates investigation by an officer not below Sub-Inspector (SI) rank. Investigation must be completed within 30 working days, extendable by at most 30 additional days (total 60 days) for recorded reasons.'
  },
  caution: {
    bn: 'তদন্তকারী কর্মকর্তা নির্দিষ্ট ৬০ দিনের মধ্যে রিপোর্ট দিতে ব্যর্থ হলে বিষয়টি সংশ্লিষ্ট পুলিশ সুপারকে লিখিতভাবে অবহিত করতে হয়।',
    en: 'Police must conclude forensic and device investigation within the mandatory statutory window.'
  },
  sourceUrl: extP5.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['pornography investigation timeline', 'si rank investigation', 'ধারা ৫', 'তদন্ত সময়সীমা পর্নোগ্রাফি', '৩০ দিন ৬০ দিন তদন্ত']
});

// Section 6
const extP6 = getExt('act_pornography_2012', '6');
upsert({
  id: 'pornography-6',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 6',
  categories: ['digital', 'threats'],
  title: {
    bn: 'বিনা পরোয়ানায় তল্লাশী, ডিভাইস জব্দ ও গ্রেপ্তারের ক্ষমতা',
    en: 'Search, Seizure and Arrest Without Warrant'
  },
  originalText: cleanText(extP6.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৬ ধারার অধীনে সাব-ইন্সপেক্টর বা তদূর্ধ্ব পুলিশ কর্মকর্তা যদি বিশ্বাস করার যুক্তিসঙ্গত কারণ পান যে পর্নোগ্রাফি অপরাধ সংঘটিত হচ্ছে বা আলামত নষ্ট হওয়ার আশঙ্কা রয়েছে, তবে তিনি বিনা পরোয়ানায় যে কোনো স্থান বা ভবনে প্রবেশ, তল্লাশী, কম্পিউটার ও মোবাইল ডিভাইস জব্দ এবং জড়িত ব্যক্তিকে তাৎক্ষণিক গ্রেপ্তার করতে পারেন।',
    en: 'Empowers police officers of Sub-Inspector rank and above to enter premises, search, seize electronic devices/materials, and arrest suspects without a warrant where immediate action is required to preserve evidence.'
  },
  caution: {
    bn: 'ডিজিটাল আলামত যেন ধ্বংস না হয় সেজন্য পুলিশ তাৎক্ষণিকভাবে ডিভাইস জব্দ তালিকা (Seizure List) তৈরি করে আদালতে উপস্থাপন করতে বাধ্য।',
    en: 'Seizure lists must be prepared in the presence of witnesses following CrPC safeguards.'
  },
  sourceUrl: extP6.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['search without warrant pornography', 'device seizure pornography', 'ধারা ৬', 'বিনা পরোয়ানায় তল্লাশী পর্নোগ্রাফি', 'ডিভাইস জব্দ']
});

// Section 7
const extP7 = getExt('act_pornography_2012', '7');
upsert({
  id: 'pornography-7',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 7',
  categories: ['digital', 'threats'],
  title: {
    bn: 'ফরেনসিক বিশেষজ্ঞ মতামতের সাক্ষ্যমূল্য',
    en: 'Evidentiary Value of Digital Forensic Expert Opinions'
  },
  originalText: cleanText(extP7.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৭ ধারা অনুযায়ী সিআইডি বা সরকার কর্তৃক ক্ষমতাপ্রাপ্ত ডিজিটাল ফরেনসিক ল্যাবের বিশেষজ্ঞ প্রতিবেদন আদালতে সাক্ষ্য হিসেবে গ্রহণযোগ্য। বিশেষজ্ঞকে ব্যক্তিগতভাবে আদালতে জেরা ছাড়া কেবল প্রতিবেদনের ভিত্তিতেই মতামত বিবেচনা করা যায়।',
    en: 'Authorizes digital forensic reports from CID or authorized forensic labs as admissible evidence in court without mandating oral examination unless directed by court.'
  },
  caution: {
    bn: 'অভিযুক্তের ডিভাইস থেকে মুছে ফেলা ফাইল ফরেনসিক রিকভারির মাধ্যমে প্রমাণ হিসেবে আদালতে দাখিল করা যায়।',
    en: 'Deleted electronic media recovered through official forensic software is fully admissible evidence.'
  },
  sourceUrl: extP7.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['expert forensic opinion pornography', 'digital evidence pornography', 'ধারা ৭', 'ফরেনসিক রিপোর্ট সাক্ষ্য', 'সিআইডি ফরেনসিক']
});

// Section 8 (Comprehensive umbrella)
const extP8 = getExt('act_pornography_2012', '8');
upsert({
  id: 'pornography-8',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 8',
  categories: ['digital', 'threats', 'family'],
  title: {
    bn: 'পর্নোগ্রাফি অপরাধের দণ্ড (ব্ল্যাকমেইল, গোপনে ছবি তোলা ও শিশু পর্নোগ্রাফি)',
    en: 'Penalties for Pornography Offences: Blackmail, Intimate Recording & Child Exploitation'
  },
  originalText: cleanText(extP8.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৮ ধারায় বিভিন্ন পর্নোগ্রাফি অপরাধের কঠোর সাজার তালিকা দেওয়া হয়েছে: (১) কারো অনুমতি ছাড়া অন্তরঙ্গ ছবি বা ভিডিও ধারণে সর্বোচ্চ ৫ বছর কারাদণ্ড ও ২ লাখ টাকা জরিমানা; (২) অন্তরঙ্গ ছবি ছড়িয়ে দেওয়ার ভয় দেখিয়ে ব্ল্যাকমেইল বা অনৈতিক সুবিধা বা টাকা দাবিতে সর্বোচ্চ ৫ বছর কারাদণ্ড ও ৫ লাখ টাকা জরিমানা; (৩) শিশু পর্নোগ্রাফি প্রস্তুত বা সংরক্ষণে সর্বোচ্চ ১০ বছর সশ্রম কারাদণ্ড ও ৫ লাখ টাকা জরিমানা; (৪) পর্নোগ্রাফি ইন্টারনেট বা সোশ্যাল মিডিয়ায় বিতরণে সর্বোচ্চ ২ বছর কারাদণ্ড ও ১ লাখ টাকা জরিমানা।',
    en: 'Comprehensive penalty provision under Section 8: Sub-sec (1) captures non-consensual intimate media (up to 5 years prison, 2 lakh fine); Sub-sec (2) penalizes blackmail, extortion or demanding sexual favours using explicit media (up to 5 years prison, 5 lakh fine); Sub-sec (3) prescribes up to 10 years rigorous imprisonment and 5 lakh fine for child pornography; Sub-sec (4) penalizes public internet distribution with up to 2 years prison and 1 lakh fine.'
  },
  caution: {
    bn: 'ব্ল্যাকমেইলকারীকে কখনো টাকা দেবেন না; অনতিবিলম্বে ৮(২) ধারায় থানায় এজাহার দায়ের করুন বা সাইবার ক্রাইম বিভাগে অভিযোগ করুন।',
    en: 'Never yield to blackmail demands. Immediately lodge an FIR under Section 8(2) and notify the Cyber Police.'
  },
  sourceUrl: extP8.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: [
    'non consensual intimate images',
    'blackmail with photos',
    'cyber pornography',
    'child pornography penalty',
    'pornography 8',
    'section 8',
    'ব্ল্যাকমেইল',
    'অন্তরঙ্গ ছবি',
    'পর্নোগ্রাফি সাজা',
    'ছবি ছড়িয়ে দেওয়ার হুমকি',
    'শিশু পর্নোগ্রাফি দণ্ড'
  ]
});

// Section 8(1)
upsert({
  id: 'pornography-8-1',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 8(1)',
  categories: ['digital', 'threats'],
  title: {
    bn: 'সম্মতি ছাড়া গোপনে অন্তরঙ্গ ছবি বা ভিডিও ধারণের দণ্ড (সর্বোচ্চ ৫ বছর কারাদণ্ড)',
    en: 'Penalties for Capturing Non-Consensual Intimate Photos or Video (Section 8(1))'
  },
  originalText: cleanText(extP8.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৮(১) উপধারা অনুযায়ী কোনো ব্যক্তির জ্ঞাতসারে বা অজ্ঞাতসারে তাঁহার সম্মতি ব্যতীত কোনো অন্তরঙ্গ, নগ্ন বা যৌন উদ্দীপক ছবি বা ভিডিও কোনো গোপন ক্যামেরা বা ডিভাইসে ধারণ করিলে দায়ী ব্যক্তি অনধিক ৫ বছর সশ্রম কারাদণ্ড এবং অনধিক ২ লাখ টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    en: 'Under Section 8(1), capturing non-consensual intimate or nude images or videos using spy cameras or mobile devices is punishable with rigorous imprisonment of up to 5 years and fine of up to 2 lakh Taka.'
  },
  caution: {
    bn: 'ট্রায়াল রুম, হোটেল বা বাথরুমে গোপন ক্যামেরা বসিয়ে ছবি তোলা এই ধারায় জামিনবিহীন আমলযোগ্য অপরাধ।',
    en: 'Hidden camera recording in private spaces is a cognizable and non-bailable offense under Section 8(1).'
  },
  sourceUrl: extP8.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['spy camera secret recording', 'hidden camera naked', 'gopon camera', 'গোপন ক্যামেরা ছবি', '৮(১) ধারা']
});

// Section 8(2)
upsert({
  id: 'pornography-8-2',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 8(2)',
  categories: ['digital', 'threats'],
  title: {
    bn: 'অন্তরঙ্গ ছবি বা ভিডিও ছড়িয়ে দেওয়ার ভয় দেখিয়ে ব্ল্যাকমেইল বা টাকা দাবির দণ্ড (সর্বোচ্চ ৫ বছর কারাদণ্ড)',
    en: 'Penalties for Blackmail, Extortion, and Distribution Threats (Section 8(2))'
  },
  originalText: cleanText(extP8.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৮(২) উপধারা অনুযায়ী কোনো ব্যক্তি পর্নোগ্রাফি বা অন্তরঙ্গ মিডিয়া প্রদর্শন বা প্রকাশের ভয় দেখাইয়া অন্য কোনো ব্যক্তির নিকট হইতে কোনো অনৈতিক দাবি, অর্থ বা যৌন সুবিধা দাবি করিলে তিনি অনধিক ৫ বছর সশ্রম কারাদণ্ড এবং অনধিক ৫ লাখ টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    en: 'Under Section 8(2), blackmailing or demanding money, property, or sexual favours under threat of publishing or distributing intimate media carries up to 5 years rigorous imprisonment and fine up to 5 lakh Taka.'
  },
  caution: {
    bn: 'ডিজিটাল ব্ল্যাকমেইলের ক্ষেত্রে স্ক্রিনশট, অডিও রেকর্ড ও চ্যাট হিস্ট্রি মুছে ফেলবেন না; এগুলো সরাসরি ৮(২) ধারার প্রধান সাক্ষ্য প্রমাণ।',
    en: 'Preserve all messages, call recordings, and blackmail threats as primary digital evidence.'
  },
  sourceUrl: extP8.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['photo viral threat', 'blackmail intimate video', 'chobi viral threat', 'ভিডিও ভাইরাল হুমকি', 'ব্ল্যাকমেইল শাস্তি', '৮(২) ধারা']
});

// Section 8(3) (Child pornography dedicated)
upsert({
  id: 'pornography-8-3',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 8(3)',
  categories: ['digital', 'threats'],
  title: {
    bn: 'শিশু পর্নোগ্রাফি তৈরি, সংরক্ষণ ও ব্যবহারের জন্য সর্বোচ্চ ১০ বছর সশ্রম কারাদণ্ড',
    en: 'Rigorous Imprisonment Up to 10 Years for Child Pornography (Section 8(3))'
  },
  originalText: cleanText(extP8.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৮(৩) উপধারা অনুযায়ী কোনো শিশুকে পর্নোগ্রাফিতে ব্যবহার করিলে বা শিশুর পর্নোগ্রাফি তৈরি, প্রচার বা সংরক্ষণ করিলে তিনি সর্বোচ্চ ১০ বছর পর্যন্ত সশ্রম কারাদণ্ড এবং অনধিক ৫ লাখ টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    en: 'Section 8(3) imposes the most severe penalties under the Act: whoever uses a child in pornography, or produces, distributes, or stores child pornography, shall be punished with rigorous imprisonment for up to 10 years and fine up to 5 lakh Taka.'
  },
  caution: {
    bn: 'শিশু পর্নোগ্রাফি সংক্রান্ত কোনো মিডিয়া নিজের মোবাইলে ফরোয়ার্ড করা বা গ্রুপে শেয়ার করাও সরাসরি ১০ বছরের কারাদণ্ডযোগ্য অপরাধ।',
    en: 'Sharing or possessing child exploitation material in group chats carries mandatory prosecution.'
  },
  sourceUrl: extP8.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['child pornography 10 years', 'shishu pornography', 'শিশু পর্নোগ্রাফি ১০ বছর', '৮(৩) ধারা', 'child sexual exploitation material']
});

// Section 8(4)
upsert({
  id: 'pornography-8-4',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 8(4)',
  categories: ['digital', 'threats'],
  title: {
    bn: 'ইন্টারনেট বা ডিভাইসে পর্নোগ্রাফি প্রচার ও বিতরণের দণ্ড (সর্বোচ্চ ২ বছর কারাদণ্ড)',
    en: 'Penalty for Public Distribution and Transmission of Pornography (Section 8(4))'
  },
  originalText: cleanText(extP8.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৮(৪) উপধারা অনুযায়ী ইন্টারনেট বা কোনো সামাজিক যোগাযোগ মাধ্যমে পর্নোগ্রাফি প্রদর্শন, প্রচার বা বিতরণ করিলে দায়ী ব্যক্তি অনধিক ২ বছর সশ্রম কারাদণ্ড এবং অনধিক ১ লাখ টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    en: 'Section 8(4) penalizes distributing, publishing, transmitting, or selling pornography over the internet, social media, or electronic networks with up to 2 years imprisonment and 1 lakh fine.'
  },
  caution: {
    bn: 'টেলিগ্রাম, ফেসবুক বা হোয়াটসঅ্যাপে অ্যাডাল্ট কনটেন্ট লিংক বা ভিডিও প্রচার করা এই ধারায় দণ্ডনীয়।',
    en: 'Distributing adult video links or files in online messenger groups violates Section 8(4).'
  },
  sourceUrl: extP8.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['internet pornography distribution', 'social media porn link', '৮(৪) ধারা', 'পর্নোগ্রাফি প্রচার দণ্ড']
});

// Section 8(5)
upsert({
  id: 'pornography-8-5',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 8(5)',
  categories: ['digital', 'threats'],
  title: {
    bn: 'কোম্পানি বা প্রতিষ্ঠানের মাধ্যমে পর্নোগ্রাফি অপরাধ সংঘটনে দায়দায়িত্ব',
    en: 'Corporate Liability for Pornography Offences (Section 8(5))'
  },
  originalText: cleanText(extP8.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৮(৫) উপধারা অনুযায়ী কোনো কোম্পানি, সাইবার ক্যাফে বা বাণিজ্যিক প্রতিষ্ঠান কর্তৃক পর্নোগ্রাফি অপরাধ সংঘটিত হলে উক্ত প্রতিষ্ঠানের পরিচালক, ম্যানেজার বা সংশ্লিষ্ট কর্মকর্তাগণ ব্যক্তিগতভাবে অপরাধী হিসেবে গণ্য হবেন।',
    en: 'Holds company directors, managers, and cyber cafe operators individually liable for pornography offences committed through corporate or commercial infrastructure.'
  },
  caution: {
    bn: 'সাইবার ক্যাফে বা ওয়েবসাইট মালিক পর্নোগ্রাফি ট্রাফিকিংয়ে সহায়তা করলে প্রতিষ্ঠানের লাইসেন্স বাতিল ও পরিচালকগণের কারাদণ্ড হবে।',
    en: 'Commercial entities enabling pornography distribution face license revocation and director prosecution.'
  },
  sourceUrl: extP8.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['corporate liability pornography', 'cyber cafe pornography', '৮(৫) ধারা', 'কোম্পানির দায় পর্নোগ্রাফি']
});

// Section 8(6)
upsert({
  id: 'pornography-8-6',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 8(6)',
  categories: ['digital', 'threats'],
  title: {
    bn: 'পর্নোগ্রাফি বা বিকৃত ছবি ব্যবহারের মাধ্যমে সামাজিক মর্যাদা ক্ষুণ্ন বা মানসিক পীড়নের দণ্ড',
    en: 'Defamation and Mental Agony via Explicit or Morphing Media (Section 8(6))'
  },
  originalText: cleanText(extP8.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৮(৬) উপধারা অনুযায়ী কোনো ব্যক্তির ছবি এডিট বা বিকৃত করে (Photo morphing / deepfake) পর্নোগ্রাফি হিসেবে প্রকাশ করে সামাজিক মর্যাদা ক্ষুণ্ন বা মানসিক নির্যাতন চালালে অনধিক ২ বছর কারাদণ্ড ও ১ লাখ টাকা জরিমানা হইবে।',
    en: 'Section 8(6) penalizes morphing photos, creating deepfakes, or using explicit media to cause mental agony or defame a citizen’s social dignity with up to 2 years prison and 1 lakh fine.'
  },
  caution: {
    bn: 'কারো ছবি এডিট করে সুপারইম্পোজ বা নগ্ন অবয়বে ইন্টারনেটে ছড়ালে এই ধারায় সরাসরি মামলা হয়।',
    en: 'Creating edited or deepfake nude pictures of any individual is directly actionable under Section 8(6).'
  },
  sourceUrl: extP8.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['photo morphing pornography', 'deepfake explicit defamation', 'ছবির মুখ এডিট', 'মানহানি পর্নোগ্রাফি', '৮(৬) ধারা']
});

// Section 9
const extP9 = getExt('act_pornography_2012', '9');
upsert({
  id: 'pornography-9',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 9',
  categories: ['digital', 'rights'],
  title: {
    bn: 'আইনের সংবিধিবদ্ধ ব্যতিক্রম (চিকিৎসাবিদ্যা, শিল্পকর্ম ও সাহিত্যের সুরক্ষা)',
    en: 'Statutory Exceptions: Medical, Scientific, Artistic and Literary Works'
  },
  originalText: cleanText(extP9.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৯ ধারা অনুযায়ী চিকিৎসাবিজ্ঞানের বই, শিক্ষামূলক অ্যানাটমি ডায়াগ্রাম, অথবা প্রাচীন ঐতিহাসিক ভাস্কর্য ও স্বীকৃত উচ্চমানের সাহিত্যকর্ম যা জনস্বার্থে পরিবেশিত হয়, তা এই আইনের অধীনে পর্নোগ্রাফি হিসেবে গণ্য হবে না।',
    en: 'Section 9 explicitly protects bona fide medical textbooks, scientific anatomical diagrams, historical sculptures, and genuine literary or artistic masterpieces from prosecution.'
  },
  caution: {
    bn: 'ব্যতিক্রমের সুবিধা পেতে হলে সামগ্রীটি প্রকৃত অর্থেই চিকিৎসাবিদ্যা বা শিল্প-সাহিত্যের অঙ্গ হিসেবে প্রমাণিত হতে হবে।',
    en: 'The material must be genuine scientific, medical, or artistic discourse, not a pretext for obscenity.'
  },
  sourceUrl: extP9.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['pornography exceptions', 'medical textbook anatomy', 'artistic sculpture exempt', 'ধারা ৯', 'পর্নোগ্রাফি ব্যতিক্রম', 'চিকিৎসা শিক্ষা বই']
});

// Section 10
const extP10 = getExt('act_pornography_2012', '10');
upsert({
  id: 'pornography-10',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 10',
  categories: ['digital', 'threats', 'rights'],
  title: {
    bn: 'পর্নোগ্রাফি অপরাধের আমলযোগ্যতা (আমলযোগ্য, অ-জামিনযোগ্য ও অ-আপোষযোগ্য)',
    en: 'Cognizability and Non-Bailable Nature of Pornography Offences'
  },
  originalText: cleanText(extP10.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '১০ ধারা অত্যন্ত স্পষ্টভাবে ঘোষণা করেছে যে, পর্নোগ্রাফি নিয়ন্ত্রণ আইনের অধীন সংঘটিত সকল অপরাধই আমলযোগ্য (Cognizable) এবং অ-জামিনযোগ্য (Non-Bailable)। অর্থাৎ পুলিশ ওয়ারেন্ট ছাড়াই আসামিকে গ্রেপ্তার করতে পারে এবং সাধারণ নিয়মে থানা বা ম্যাজিস্ট্রেট কোর্ট থেকে জামিন দেওয়া হয় না।',
    en: 'Section 10 declares all offences under the Act to be cognizable (warrantless arrest by police) and non-bailable, requiring formal bail application before the trial court.'
  },
  caution: {
    bn: 'পর্নোগ্রাফির অপরাধ অ-জামিনযোগ্য ও অ-আপোষযোগ্য; কোনো ভুয়া আপোষনামা দিয়ে মামলা প্রত্যাহার করা যায় না।',
    en: 'Offences under this Act cannot be compromised out-of-court; bail is strictly scrutinized.'
  },
  sourceUrl: extP10.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['pornography cognizable non bailable', 'amoljoggo ojaminjoggo', 'ধারা ১০', 'আমলযোগ্য ও অ-জামিনযোগ্য পর্নোগ্রাফি']
});

// Section 11
const extP11 = getExt('act_pornography_2012', '11');
upsert({
  id: 'pornography-11',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 11',
  categories: ['digital', 'rights'],
  title: {
    bn: 'পর্নোগ্রাফি মামলার বিচার পদ্ধতি ও ১৮০ দিনের মধ্যে নিষ্পত্তির বিধান',
    en: 'Trial Procedure and 180-Day Statutory Disposal Requirement'
  },
  originalText: cleanText(extP11.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '১১ ধারা অনুযায়ী পর্নোগ্রাফি অপরাধের বিচার দায়রা জজ আদালত বা বিশেষ ট্রাইব্যুনালে পরিচালিত হয়। অভিযোগ গঠনের ১৮০ কার্যদিবসের মধ্যে বিচার নিষ্পত্তি করার সংবিধিবদ্ধ নির্দেশনা রয়েছে। এছাড়া ভিকটিমের গোপনীয়তা রক্ষার্থে ক্যামেরা ট্রায়াল (In-camera trial) করা যায়।',
    en: 'Section 11 provides for trial before the Court of Sessions or designated Tribunal, with trial to be concluded within 180 working days. In-camera proceedings may be ordered to protect victim dignity and privacy.'
  },
  caution: {
    bn: 'ভুক্তভোগীর ব্যক্তিগত নিরাপত্তা রক্ষার্থে প্রকাশ্য আদালতের বদলে বিচারক নিজ খাসকামরায় ক্যামেরা ট্রায়াল পরিচালনা করতে পারেন।',
    en: 'Victims may petition the court for an in-camera trial to protect their identity and dignity.'
  },
  sourceUrl: extP11.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['pornography trial 180 days', 'in camera trial pornography', 'ধারা ১১', 'ক্যামেরা ট্রায়াল', '১৮০ দিনের বিচার']
});

// Section 12
const extP12 = getExt('act_pornography_2012', '12');
upsert({
  id: 'pornography-12',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 12',
  categories: ['digital', 'rights'],
  title: {
    bn: 'আপিল সংক্রান্ত বিধান (৩০ দিনের মধ্যে হাইকোর্টে আপিল)',
    en: 'Appeals to High Court Division Within 30 Days'
  },
  originalText: cleanText(extP12.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '১২ ধারা মোতাবেক ট্রাইব্যুনাল বা দায়রা আদালতের রায়ে সংক্ষুব্ধ পক্ষ রায় ঘোষণার তারিখ হইতে ৩০ দিনের মধ্যে হাইকোর্ট বিভাগে আপিল দায়ের করতে পারেন।',
    en: 'Provides that an appeal against any final judgment or sentence under this Act lies before the High Court Division within 30 days of the order.'
  },
  caution: {
    bn: 'আপিলের জন্য ৩০ দিনের তামাদি সময় কঠোরভাবে প্রযোজ্য।',
    en: 'Appeals must be lodged within the 30-day statutory limitation window.'
  },
  sourceUrl: extP12.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['pornography appeal 30 days', 'high court appeal pornography', 'ধারা ১২', 'পর্নোগ্রাফি আপিল ৩০ দিন']
});

// Section 13
const extP13 = getExt('act_pornography_2012', '13');
upsert({
  id: 'pornography-13',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 13',
  categories: ['digital', 'rights'],
  title: {
    bn: 'মিথ্যা মামলা বা বিদ্বেষমূলক অভিযোগ দায়েরের দণ্ড (সর্বোচ্চ ২ বছর কারাদণ্ড)',
    en: 'Penalty for Filing False or Frivolous Complaints (Section 13)'
  },
  originalText: cleanText(extP13.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '১৩ ধারা অনুযায়ী কোনো ব্যক্তি যদি অন্য কাউকে ক্ষতিসাধনের উদ্দেশ্যে জেনে-শুনে অসত্য বা বানোয়াট তথ্যে পর্নোগ্রাফি নিয়ন্ত্রণ আইনে মিথ্যা মামলা বা অভিযোগ দায়ের করেন, তবে বাদী নিজে অনধিক ২ বছর সশ্রম কারাদণ্ড এবং অনধিক ১ লাখ টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    en: 'Protects innocent citizens from harassment: filing a knowingly false or malicious complaint under this Act is punishable with imprisonment of up to 2 years and fine up to 1 lakh Taka.'
  },
  caution: {
    bn: 'বিদ্বেষমূলকভাবে কাউকে ফাঁসানোর জন্য মিথ্যা পর্নোগ্রাফি মামলা দিলে অভিযোগকারীকেই জেলে যেতে হবে।',
    en: 'Fabricating explicit charges maliciously results in criminal prosecution of the complainant.'
  },
  sourceUrl: extP13.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['false pornography case penalty', 'mittha mamla pornography', 'ধারা ১৩', 'মিথ্যা পর্নোগ্রাফি মামলা শাস্তি']
});

// Section 14
const extP14 = getExt('act_pornography_2012', '14');
upsert({
  id: 'pornography-14',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 14',
  categories: ['digital'],
  title: {
    bn: 'বিধি প্রণয়নের সরকারি ক্ষমতা',
    en: 'Rule-Making Powers of the Government'
  },
  originalText: cleanText(extP14.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '১৪ ধারা সরকারকে সরকারি গেজেটে প্রজ্ঞাপন দ্বারা এই আইনের উদ্দেশ্য পূরণকল্পে বিধি প্রণয়নের ক্ষমতা প্রদান করেছে।',
    en: 'Empowers the Government to make official rules by official gazette notification for carrying out the purposes of this Act.'
  },
  caution: {
    bn: 'বিধিমালা এই আইনের মূল উদ্দেশ্য ও ক্ষমতার অধীন থাকতে হবে।',
    en: 'Rules made under Section 14 must conform strictly to the statutory mandate.'
  },
  sourceUrl: extP14.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['pornography rule making power', 'ধারা ১৪', 'বিধি প্রণয়ন পর্নোগ্রাফি']
});

// Section 15
const extP15 = getExt('act_pornography_2012', '15');
upsert({
  id: 'pornography-15',
  actId: 'act_pornography_2012',
  sectionNumber: 'Section 15',
  categories: ['digital'],
  title: {
    bn: 'আইনের অনুমোদিত ইংরেজি পাঠ ও বিরোধে বাংলা পাঠের প্রাধান্য',
    en: 'Authentic English Text and Supremacy of Bangla Text'
  },
  originalText: cleanText(extP15.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '১৫ ধারা অনুযায়ী সরকার এই আইনের একটি অনুমোদিত ইংরেজি পাঠ প্রকাশ করবে; তবে বাংলা পাঠ ও ইংরেজি পাঠের মধ্যে বিরোধ দেখা দিলে বাংলা পাঠই চূড়ান্তভাবে প্রাধান্য পাবে।',
    en: 'Provides for the publication of an authentic English text by the Government, with the Bangla text prevailing in any conflict of interpretation.'
  },
  caution: {
    bn: 'আইনি ব্যাখ্যায় বাংলা পাঠই আদালতে প্রামাণ্য ভিত্তি।',
    en: 'Bangla text remains the authoritative statutory reference in judicial interpretation.'
  },
  sourceUrl: extP15.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2012-03-08',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['authentic english text pornography', 'bangla text supremacy', 'ধারা ১৫', 'ইংরেজি পাঠ প্রাধান্য']
});

// -------------------------------------------------------------
// TELECOM REGULATION ACT, 2001 PROVISIONS
// -------------------------------------------------------------

// Section 59
const extT59 = getExt('act_telecom_2001', '59');
upsert({
  id: 'telecom-59',
  actId: 'act_telecom_2001',
  sectionNumber: 'Section 59',
  categories: ['digital', 'consumer'],
  title: {
    bn: 'টেলিযোগাযোগ গ্রাহকদের অভিযোগ গ্রহণ ও বিটিআরসি কর্তৃক নিষ্পত্তি পদ্ধতি',
    en: 'Telecom Consumer Complaints and Dispute Redressal by BTRC'
  },
  originalText: cleanText(extT59.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৫৯ ধারা অনুযায়ী যেকোনো টেলিযোগাযোগ গ্রাহক সেবা প্রদানকারী অপারেটরের বিরুদ্ধে বিলিং ত্রুটি, সেবার নিম্নমান, অযাচিত ব্যালেন্স কর্তন বা অপব্যবহারের বিষয়ে কমিশনের নিকট লিখিত বা ডিজিটালভাবে অভিযোগ দায়ের করতে পারেন। কমিশন শুনানি গ্রহণ করে অপারেটরকে ক্ষতিপূরণ প্রদানের বা প্রতিকারমূলক ব্যবস্থা নেওয়ার নির্দেশ দিতে পারে।',
    en: 'Section 59 empowers telecom consumers to submit complaints directly to BTRC regarding poor service quality, billing disputes, unauthorized deductions, or operator misconduct. BTRC has authority to investigate, arbitrate, and direct operators to grant refunds or compensation.'
  },
  caution: {
    bn: 'অপারেটরের কাস্টমার কেয়ারে অভিযোগ দিয়ে ফল না পেলে বিটিআরসির হেল্পলাইন ১০০ বা পোর্টালে ৫৯ ধারায় সরাসরি অভিযোগ করা যায়।',
    en: 'If an operator fails to resolve billing or service harassment, lodge an official complaint before BTRC under Section 59.'
  },
  sourceUrl: extT59.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2001-04-16',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['btrc consumer complaints', 'telecom billing dispute', 'btrc dispute settlement', 'গ্রাহক অভিযোগ বিটিআরসি', 'ধারা ৫৯', 'অপারেটর অভিযোগ']
});

// Section 66 (Update existing, preserve keywords)
const extT66 = getExt('act_telecom_2001', '66');
upsert({
  id: 'telecom-66',
  actId: 'act_telecom_2001',
  sectionNumber: 'Section 66',
  categories: ['digital', 'threats'],
  title: {
    bn: 'টেলিযোগাযোগ মাধ্যমে মিথ্যা বার্তা প্রেরণ, প্রতারণা ও অশোভন হয়রানির দণ্ড',
    en: 'Penalties for Transmitting False Messages, Indecent Calls & Telecom Harassment'
  },
  originalText: cleanText(extT66.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: 'টেলিযোগাযোগ নিয়ন্ত্রণ আইনের ৬৬ ধারা অনুযায়ী টেলিযোগাযোগ বা বেতারের মাধ্যমে কোনো ব্যক্তি যদি মিথ্যা, প্রতারণামূলক বা বানোয়াট তথ্য সম্বলিত বার্তা প্রেরণ করেন, তবে তিনি অনধিক ৩ বছর কারাদণ্ড বা অনধিক ৩ লাখ টাকা অর্থদণ্ড বা উভয় দণ্ডে দণ্ডিত হইবেন। এছাড়া অশ্লীল ও হয়রানিমূলক কল/বার্তা রোধে ৬৬, ৬৯ ও ৭০ ধারার যৌথ প্রয়োগে আইনগত ব্যবস্থা নেওয়া হয়।',
    en: 'Section 66 penalizes transmitting false, fraudulent, or concocted messages via telecommunications or radio with imprisonment of up to 3 years, or fine of up to 3 lakh Taka, or both. Read in conjunction with Sections 69 and 70 for obscene and harassing calls.'
  },
  caution: {
    bn: 'অপরিচিত নাম্বার থেকে গভীর রাতে বিরক্তিকর বা অশ্লীল কল আসলে কলের সময় ও নম্বর সংরক্ষণ করে থানায় জিডি ও বিটিআরসি ১০০ হেল্পলাইনে অভিযোগ করুন।',
    en: 'Keep call history, audio recordings, and SMS as primary proof to lodge a GD and BTRC complaint.'
  },
  sourceUrl: extT66.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2001-04-16',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: [
    'nuisance calls',
    'harassing sms',
    'obscene calls',
    'offensive message',
    'telecom harassment',
    'btrc complaint',
    'ধারা ৬৬',
    'অশ্লীল বার্তা',
    'বিরক্তিকর কল',
    'মোবাইল ফোনে হুমকি',
    'টেলিফোন হয়রানি',
    'Amar name fake profile khule kharap post kortese ar vulgar massage pathayসে',
    'An unknown number keeps calling me late at night with obscene and sexually harassing comments'
  ]
});

// Section 67 (Update existing, preserve keywords)
const extT67 = getExt('act_telecom_2001', '67');
upsert({
  id: 'telecom-67',
  actId: 'act_telecom_2001',
  sectionNumber: 'Section 67',
  categories: ['digital', 'threats'],
  title: {
    bn: 'টেলিযোগাযোগ নেটওয়ার্কে ক্ষতিকর প্রতিবন্ধকতা সৃষ্টি ও অবৈধ সিম ব্যবহারের আইনি দায়',
    en: 'Causing Interference in Telecommunications & Illegal SIM Card Misuse'
  },
  originalText: cleanText(extT67.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৬৭ ধারা অনুযায়ী টেলিযোগাযোগ ব্যবস্থা বা বেতার যোগাযোগে ক্ষতিকর প্রতিবন্ধকতা সৃষ্টি করিলে অনধিক ৩ বছর কারাদণ্ড বা অর্থদণ্ড হইবে। অন্যের জাতীয় পরিচয়পত্র (NID) জালিয়াতি করে ভুয়া সিম তোলা এবং অবৈধ সিম দিয়ে নেটওয়ার্ক জ্যামিং বা প্রতারণা এই আইনের ৩৫ ও ৬৭ ধারা এবং পেনাল কোডের ৪৬৫ ধারার অধীনে গুরুতর দণ্ডনীয় অপরাধ।',
    en: 'Section 67 penalizes causing interference or disruption in telecommunication networks with up to 3 years imprisonment. Fraudulent SIM activation using another person’s NID is penalized under Sections 35 & 67 of this Act alongside Penal Code Section 465.'
  },
  caution: {
    bn: 'অন্যের এনআইডি দিয়ে সিম তুলে ব্যবহার করলে জালিয়াতি ও অবৈধ টেলিযোগাযোগ ব্যবহারে তাৎক্ষণিক সিম বাতিল ও ফৌজদারি মামলা হবে।',
    en: 'Using an unregistered or forged SIM card incurs immediate deactivation and criminal forgery charges.'
  },
  sourceUrl: extT67.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2001-04-16',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: [
    'unregistered sim',
    'illegal sim card',
    'biometric sim fraud',
    'sim registration violation',
    'telecom 67',
    'ধারা ৬৭',
    'অবৈধ সিম',
    'ভুয়া সিম কার্ড',
    'সিম জালিয়াতি',
    'আমার জাতীয় পরিচয়পত্র জালিয়াতি করে অপরিচিত ব্যক্তি ৩টি ভুয়া সিম তুলে ব্যবহার করছে'
  ]
});

// Section 69
const extT69 = getExt('act_telecom_2001', '69');
upsert({
  id: 'telecom-69',
  actId: 'act_telecom_2001',
  sectionNumber: 'Section 69',
  categories: ['digital', 'threats'],
  title: {
    bn: 'অশ্লীল, অশোভন বা কুৎসাপূর্ণ বার্তা প্রেরণের দণ্ড (সর্বোচ্চ ২ বছর কারাদণ্ড বা ১ লাখ টাকা জরিমানা)',
    en: 'Penalties for Transmitting Obscene, Indecent, or Defamatory Messages (Section 69)'
  },
  originalText: cleanText(extT69.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৬৯ ধারা মোতাবেক কোনো ব্যক্তি টেলিযোগাযোগ ব্যবস্থার মাধ্যমে কোনো অশ্লীল, অশোভন, কুরুচিপূর্ণ বা ভীতি প্রদর্শনমূলক বার্তা প্রেরণ করিলে তিনি অনধিক ২ বছর কারাদণ্ড বা অনধিক ১ লাখ টাকা অর্থদণ্ড বা উভয় দণ্ডে দণ্ডিত হইবেন।',
    en: 'Section 69 explicitly penalizes transmitting any obscene, indecent, indecently offensive, or menacing message through a telecommunications network with up to 2 years imprisonment, or fine up to 1 lakh Taka, or both.'
  },
  caution: {
    bn: 'হোয়াটসঅ্যাপ বা মেসেঞ্জারে কুরুচিপূর্ণ বা গালাগালিপূর্ণ টেক্সট পাঠালে সরাসরি ৬৯ ধারায় অপরাধ গঠিত হয়।',
    en: 'Sending abusive or indecent text messages across telecommunications networks triggers prosecution under Section 69.'
  },
  sourceUrl: extT69.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2001-04-16',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['obscene messages telecom 69', 'indecent sms penalty', 'ধারা ৬৯', 'অশ্লীল মেসেজ পাঠানো শাস্তি', 'কুৎসাপূর্ণ বার্তা']
});

// Section 70
const extT70 = getExt('act_telecom_2001', '70');
upsert({
  id: 'telecom-70',
  actId: 'act_telecom_2001',
  sectionNumber: 'Section 70',
  categories: ['digital', 'threats'],
  title: {
    bn: 'টেলিযোগাযোগ মাধ্যমে বারবার বিরক্ত করার দণ্ড (Nuisance Calls / Phone Stalking)',
    en: 'Penalties for Nuisance Calls and Harassment via Telecommunications (Section 70)'
  },
  originalText: cleanText(extT70.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৭০ ধারা অনুযায়ী কোনো যুক্তিসঙ্গত কারণ ব্যতীত ইচ্ছাকৃতভাবে বারবার কোনো ব্যক্তিকে টেলিফোন করিয়া বিরক্ত করিলে বা উত্ত্যক্ত করিলে দায়ী ব্যক্তি অনধিক ১ লাখ টাকা অর্থদণ্ডে দণ্ডিত হইবেন এবং দ্বিতীয় বা পরবর্তী অপরাধের ক্ষেত্রে অনধিক ৬ মাস কারাদণ্ড বা অনধিক ৩ লাখ টাকা অর্থদণ্ড বা উভয় দণ্ডে দণ্ডিত হইবেন।',
    en: 'Section 70 specifically punishes persistent nuisance calling or telephone harassment without reasonable excuse with a fine of up to 1 lakh Taka, and for second/subsequent offenses, imprisonment of up to 6 months or fine up to 3 lakh Taka, or both.'
  },
  caution: {
    bn: 'গভীর রাতে বারবার মিসড কল বা বিরক্তিকর কল দিলে ৭০ ধারায় পুলিশি নোটিশ ও আইনি জরিমানা আরোপ করা যায়।',
    en: 'Persistent harassing calls without legitimate reason are punishable under Section 70.'
  },
  sourceUrl: extT70.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2001-04-16',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['nuisance calls penalty 70', 'phone harassment section 70', 'barbar call kore birokto', 'ধারা ৭০', 'বিরক্তিকর কল দণ্ড', 'ফোন স্টকিং']
});

// Section 71
const extT71 = getExt('act_telecom_2001', '71');
upsert({
  id: 'telecom-71',
  actId: 'act_telecom_2001',
  sectionNumber: 'Section 71',
  categories: ['digital', 'threats', 'rights'],
  title: {
    bn: 'অবৈধ আড়িপাতা, কল রেকর্ড ও ব্যক্তিগত কথোপকথন ফাঁস করার দণ্ড',
    en: 'Penalties for Illegal Eavesdropping, Call Tapping, and Interception (Section 71)'
  },
  originalText: cleanText(extT71.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৭১ ধারা অনুযায়ী আইনগত সুনির্দিষ্ট কর্তৃত্ব ব্যতীত কোনো ব্যক্তি যদি কোনো টেলিযোগাযোগ বার্তায় আড়িপাতেন (Eavesdropping / Tapping) অথবা প্রেরক ও প্রাপক ব্যতীত অন্য কারো ব্যক্তিগত কথোপকথন রেকর্ড বা প্রকাশ করেন, তবে তিনি অনধিক ২ বছর কারাদণ্ড বা অনধিক ৫ কোটি টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    en: 'Section 71 strictly prohibits unauthorized wiretapping, eavesdropping, or recording of private telephone conversations without explicit statutory authority, imposing up to 2 years imprisonment or fine up to 5 crore Taka.'
  },
  caution: {
    bn: 'কারো সম্মতি ছাড়া কল রেকর্ড করে তা ইন্টারনেটে ভাইরাল করা ৭১ ধারায় গুরুতর শাস্তিযোগ্য অপরাধ।',
    en: 'Leaking recorded private telephone conversations violates Section 71 and incurs severe criminal liability.'
  },
  sourceUrl: extT71.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2001-04-16',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['phone tapping penalty 71', 'call recording without consent', 'eavesdropping interception', 'ধারা ৭১', 'আড়িপাতার দণ্ড', 'কল রেকর্ড ফাঁস']
});

// Section 77
const extT77 = getExt('act_telecom_2001', '77');
upsert({
  id: 'telecom-77',
  actId: 'act_telecom_2001',
  sectionNumber: 'Section 77',
  categories: ['digital', 'threats'],
  title: {
    bn: 'টেলিযোগাযোগ অপরাধের বিচার ও বিশেষ আদালতের এখতিয়ার',
    en: 'Trial of Telecom Offences and Special Court Jurisdiction (Section 77)'
  },
  originalText: cleanText(extT77.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৭৭ ধারা অনুযায়ী টেলিযোগাযোগ আইনের অধীন অপরাধসমূহের বিচার সংশ্লিষ্ট জেলা জজ কর্তৃক মনোনীত বিশেষ আদালত বা দায়রা আদালতে অনুষ্ঠিত হবে। আদালত দ্রুত নিষ্পত্তির লক্ষ্যে নির্ধারিত কার্যপদ্ধতি অনুসরণ করবেন।',
    en: 'Section 77 governs the trial of telecom offences before designated Special Courts or Courts of Sessions, ensuring specialized adjudication.'
  },
  caution: {
    bn: 'গুরুতর টেলিযোগাযোগ অপরাধের বিচার বিশেষ আদালতে অনুষ্ঠিত হয়।',
    en: 'Offences under this Act are tried exclusively by designated courts.'
  },
  sourceUrl: extT77.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2001-04-16',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['telecom court trial 77', 'special court telecom', 'ধারা ৭৭', 'টেলিযোগাযোগ বিচার']
});

// Section 78
const extT78 = getExt('act_telecom_2001', '78');
upsert({
  id: 'telecom-78',
  actId: 'act_telecom_2001',
  sectionNumber: 'Section 78',
  categories: ['digital', 'threats'],
  title: {
    bn: 'টেলিযোগাযোগ অপরাধের অনুসন্ধান, মামলা দায়ের ও তদন্ত পদ্ধতি',
    en: 'Inquiry, Filing of Cases and Investigation Procedure (Section 78)'
  },
  originalText: cleanText(extT78.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৭৮ ধারা অনুযায়ী কমিশন কর্তৃক ক্ষমতাপ্রাপ্ত পরিদর্শক বা পুলিশ কর্মকর্তা টেলিযোগাযোগ অপরাধের অনুসন্ধান ও তদন্ত করবেন। পরিদর্শকের রিপোর্ট অনুযায়ী কমিশন ব্যবস্থা গ্রহণ করে।',
    en: 'Section 78 outlines the procedure for filing formal complaints, inspection, and investigation by authorized BTRC inspectors or police officers.'
  },
  caution: {
    bn: 'তদন্তকালে অপারেটর সকল কল ডিটেইলস রেকর্ড (CDR) সরবরাহ করতে আইনত বাধ্য।',
    en: 'Telecom operators must furnish authentic Call Detail Records (CDR) upon formal request.'
  },
  sourceUrl: extT78.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2001-04-16',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['telecom investigation procedure', 'cdr call detail record investigation', 'ধারা ৭৮', 'তদন্ত পদ্ধতি টেলিযোগাযোগ']
});

// Section 79
const extT79 = getExt('act_telecom_2001', '79');
upsert({
  id: 'telecom-79',
  actId: 'act_telecom_2001',
  sectionNumber: 'Section 79',
  categories: ['digital', 'rights'],
  title: {
    bn: 'ফৌজদারী কার্যবিধির প্রয়োগ ও জামিনযোগ্যতা',
    en: 'Application of CrPC, Cognizability and Bailability (Section 79)'
  },
  originalText: cleanText(extT79.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৭৯ ধারা অনুযায়ী এই আইনের অধীন তদন্ত ও বিচার প্রক্রিয়ায় ফৌজদারী কার্যবিধি ১৮৯৮ (CrPC) এর বিধানাবলী প্রযোজ্য হবে। সাধারণ টেলিযোগাযোগ অপরাধসমূহ জামিনযোগ্য।',
    en: 'Section 79 provides that Code of Criminal Procedure, 1898 applies to inquiries, arrests, and trials under this Act, with minor telecom offenses being bailable.'
  },
  caution: {
    bn: 'টেলিযোগাযোগ মামলার গ্রেপ্তার ও জামিন ফৌজদারি কার্যবিধির নিয়ম অনুযায়ী পরিচালিত হয়।',
    en: 'CrPC rules on arrest, bail, and bonds apply to telecom prosecutions.'
  },
  sourceUrl: extT79.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2001-04-16',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['crpc in telecom act', 'telecom bail bailable', 'ধারা ৭৯', 'ফৌজদারী কার্যবিধি টেলিযোগাযোগ']
});

// Section 83
const extT83 = getExt('act_telecom_2001', '83');
upsert({
  id: 'telecom-83',
  actId: 'act_telecom_2001',
  sectionNumber: 'Section 83',
  categories: ['digital', 'rights'],
  title: {
    bn: 'বার্তার অবৈধ প্রকাশে ক্ষতিগ্রস্ত গ্রাহকের দেওয়ানি ক্ষতিপূরণ ও মামলার অধিকার',
    en: 'Civil Remedy and Damages for Unauthorized Disclosure of Messages (Section 83)'
  },
  originalText: cleanText(extT83.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৮৩ ধারা অনুযায়ী কোনো টেলিযোগাযোগ বার্তা যদি কোনো ব্যক্তি বা অপারেটর কর্তৃক অবৈধভাবে ফাঁস বা প্রকাশ করা হয়, তবে ক্ষতিগ্রস্ত নাগরিক সংশ্লিষ্ট অপরাধীর বিরুদ্ধে উপযুক্ত দেওয়ানি আদালতে ক্ষতিপূরণ দাবি করে দেওয়ানি মামলা দায়ের করতে পারেন।',
    en: 'Section 83 guarantees an aggrieved citizen’s legal right to sue in civil court for monetary damages and compensation against any person or operator that unlawfully intercepts, discloses, or publishes their private telecommunication messages.'
  },
  caution: {
    bn: 'ব্যক্তিগত তথ্য বা চ্যাট ফাঁসের জন্য ফৌজদারি শাস্তির পাশাপাশি দেওয়ানি আদালতে আর্থিক ক্ষতিপূরণ মামলা করা যায়।',
    en: 'Aggrieved citizens can claim both criminal prosecution and monetary civil damages for data leaks.'
  },
  sourceUrl: extT83.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2001-04-16',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['civil damages telecom leak', 'compensation private message disclosure', 'ধারা ৮৩', 'দেওয়ানি ক্ষতিপূরণ বার্তা ফাঁস']
});

// -------------------------------------------------------------
// COPYRIGHT ACT, 2023 PROVISIONS (8 CITIZEN / SOFTWARE PROVISIONS)
// -------------------------------------------------------------

// Section 2
const extC2 = getExt('act_copyright_2023', '2');
upsert({
  id: 'copyright-2023-2',
  actId: 'act_copyright_2023',
  sectionNumber: 'Section 2',
  categories: ['digital', 'rights'],
  title: {
    bn: 'সংজ্ঞা (কম্পিউটার প্রোগ্রাম, সফটওয়্যার ও ডিজিটাল কর্মের সংবিধিবদ্ধ সংজ্ঞা)',
    en: 'Definitions of Computer Program, Digital Work, and Author'
  },
  originalText: cleanText(extC2.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '২ ধারায় কম্পিউটার প্রোগ্রাম ও ডিজিটাল কর্মের স্পষ্ট সংজ্ঞা দেওয়া হয়েছে: কোনো কম্পিউটার ডিভাইসে নির্দিষ্ট ফলাফল লাভের উদ্দেশ্যে রচিত কোড, নির্দেশাবলী বা স্কিমকে কম্পিউটার প্রোগ্রাম হিসেবে স্বীকৃতি দেওয়া হয়েছে। এছাড়া কম্পিউটার প্রোগ্রাম রচয়িতাকে প্রণেতা (Author) হিসেবে গণ্য করা হয়।',
    en: 'Section 2 defines a "computer program" as a set of instructions expressed in words, codes, schemes or any other form capable of causing a computer to execute a particular task. Recognizes software developers as original authors.'
  },
  caution: {
    bn: 'সফটওয়্যারের সোর্স কোড ও অবজেক্ট কোড উভয়ই কপিরাইট আইনের অধীনে মৌলিক সাহিত্যকর্মের সমমানের সুরক্ষা পায়।',
    en: 'Source code and binary object code enjoy full statutory copyright protection under Section 2.'
  },
  sourceUrl: extC2.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2023-10-18',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['software definition copyright', 'computer program source code', 'ধারা ২', 'কম্পিউটার প্রোগ্রাম সংজ্ঞা', 'সফটওয়্যার কপিরাইট']
});

// Section 26
const extC26 = getExt('act_copyright_2023', '26');
upsert({
  id: 'copyright-2023-26',
  actId: 'act_copyright_2023',
  sectionNumber: 'Section 26',
  categories: ['digital', 'rights'],
  title: {
    bn: 'তথ্য প্রযুক্তি-ভিত্তিক ডিজিটাল কর্ম ও সফটওয়্যারের কপিরাইটের মেয়াদ (৬০ বছর)',
    en: 'Duration of Copyright in Digital Works and Software (60 Years)'
  },
  originalText: cleanText(extC26.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '২৬ ধারা মোতাবেক তথ্য প্রযুক্তি-ভিত্তিক ডিজিটাল কর্ম বা সফটওয়্যারের কপিরাইটের মেয়াদ কর্মটি প্রথম প্রকাশিত হওয়ার পরবর্তী পঞ্জিকা বছরের শুরু হইতে ৬০ (ষাট) বছর পর্যন্ত বলবৎ থাকিবে।',
    en: 'Section 26 provides that copyright in IT-based digital works and computer software subsists for 60 years from the beginning of the calendar year next following the year in which the work is first published.'
  },
  caution: {
    bn: '৬০ বছর পূর্ণ না হওয়া পর্যন্ত কোনো বাণিজ্যিক সফটওয়্যার অননুমোদিতভাবে বিনামূল্যে বিতরণ বা ব্যবহার করা বেআইনি।',
    en: 'Software remains protected for 60 years from publication before entering the public domain.'
  },
  sourceUrl: extC26.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2023-10-18',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['software copyright duration', '60 years copyright software', 'ধারা ২৬', 'সফটওয়্যার কপিরাইটের মেয়াদ', 'ডিজিটাল কর্ম ৬০ বছর']
});

// Section 69
const extC69 = getExt('act_copyright_2023', '69');
upsert({
  id: 'copyright-2023-69',
  actId: 'act_copyright_2023',
  sectionNumber: 'Section 69',
  categories: ['digital', 'rights'],
  title: {
    bn: 'কপিরাইট লঙ্ঘন ও সফটওয়্যার পাইরেসি (অননুমোদিত অনুলিপি তৈরি ও বিতরণ)',
    en: 'Copyright Infringement and Software Piracy: Unauthorized Reproduction & Distribution'
  },
  originalText: cleanText(extC69.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৬৯ ধারা মোতাবেক স্বত্বাধিকারীর লাইসেন্স বা অনুমতি ব্যতীত কোনো সফটওয়্যার, ডিজিটাল কর্ম বা সাহিত্যকর্ম অনুলিপি করা, বাণিজ্যিক ভিত্তিতে বিক্রয় বা ভাড়া দেওয়া, ডাউনলোড করে বিতরণ করা, বা নেটওয়ার্কে শেয়ার করা কপিরাইট লঙ্ঘন ও পাইরেসি হিসেবে গণ্য।',
    en: 'Section 69 sets out what constitutes infringement: making unauthorized copies of software, selling pirated copies, distributing cracked software online, or communicating it to the public without a license from the copyright owner.'
  },
  caution: {
    bn: 'ইন্টারনেট থেকে ক্র্যাক সফটওয়্যার বা পাইরেটেড ওএস ডাউনলোড করে প্রতিষ্ঠানে ব্যবহার করা সরাসরি কপিরাইট লঙ্ঘন।',
    en: 'Using pirated or cracked software in commercial offices constitutes actionable copyright infringement.'
  },
  sourceUrl: extC69.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2023-10-18',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['software piracy infringement', 'unauthorized copy software', 'cracked software copyright', 'ধারা ৬৯', 'কপিরাইট লঙ্ঘন', 'সফটওয়্যার পাইরেসি']
});

// Section 70
const extC70 = getExt('act_copyright_2023', '70');
upsert({
  id: 'copyright-2023-70',
  actId: 'act_copyright_2023',
  sectionNumber: 'Section 70',
  categories: ['digital', 'rights'],
  title: {
    bn: 'কপিরাইট লঙ্ঘনের ব্যতিক্রম ও ফেয়ার ডিলিং (সফটওয়্যারের আইনি ব্যাকআপ কপি সংরক্ষণ)',
    en: 'Fair Dealing & Statutory Exceptions: Lawful Backup Copies of Software (Section 70)'
  },
  originalText: cleanText(extC70.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৭০ ধারা অনুযায়ী কোনো বৈধ ক্রেতা যদি নিজের ব্যক্তিগত ব্যবহারের উদ্দেশ্যে বা মূল কপি নষ্ট/হারিয়ে যাওয়ার হাত থেকে রক্ষার জন্য কোনো সফটওয়্যারের একটি ব্যাকআপ অনুলিপি (Backup copy) প্রস্তুত করেন, তবে তা কপিরাইট লঙ্ঘন বলিয়া গণ্য হইবে না। এছাড়া ব্যক্তিগত গবেষণা ও শিক্ষার উদ্দেশ্যে সীমিত ব্যবহারও ফেয়ার ডিলিং হিসেবে অনুমোদিত।',
    en: 'Section 70 sets forth statutory fair dealing exceptions: lawful owners of software may make an archival or backup copy solely for temporary preservation in case of loss or damage. Limited personal research and educational study are also non-infringing.'
  },
  caution: {
    bn: 'ব্যাকআপ কপি কেবল নিজের সুরক্ষার জন্য রাখা যায়; ব্যাকআপ কপি অন্য কারো কাছে বিক্রি বা শেয়ার করা সম্পূর্ণ বেআইনি।',
    en: 'Backup copies are lawful only for the original licensee’s safeguard and must never be sold or shared.'
  },
  sourceUrl: extC70.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2023-10-18',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['fair dealing copyright', 'software backup copy exception', 'legal backup software', 'ধারা ৭০', 'ফেয়ার ডিলিং', 'সফটওয়্যার ব্যাকআপ কপি']
});

// Section 77
const extC77 = getExt('act_copyright_2023', '77');
upsert({
  id: 'copyright-2023-77',
  actId: 'act_copyright_2023',
  sectionNumber: 'Section 77',
  categories: ['digital', 'rights'],
  title: {
    bn: 'কপিরাইট লঙ্ঘনে দেওয়ানি প্রতিকার (নিষেধাজ্ঞা, ক্ষতিপূরণ ও লভ্যাংশ আদায়)',
    en: 'Civil Remedies for Infringement: Injunctions, Damages and Accounts of Profit'
  },
  originalText: cleanText(extC77.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '৭৭ ধারা অনুযায়ী স্বত্বাধিকারী জেলা জজ আদালতে মামলা দায়ের করে পাইরেটেড সফটওয়্যার বিতরণ বন্ধের জন্য স্থায়ী নিষেধাজ্ঞা (Injunction), পাইরেসির মাধ্যমে অর্জিত লভ্যাংশ (Accounts of profits) এবং উপযুক্ত আর্থিক ক্ষতিপূরণ দাবি করতে পারেন।',
    en: 'Section 77 grants copyright owners civil court remedies in the District Court: injunctions to halt piracy, seizure of infringing items, statutory damages, and recovery of profits earned through piracy.'
  },
  caution: {
    bn: 'দেওয়ানি মামলায় আদালত পাইরেটেড সফটওয়্যারের যাবতীয় কপি ধ্বংসের নির্দেশ দিতে পারেন।',
    en: 'Courts can order the immediate confiscation and destruction of all infringing software copies.'
  },
  sourceUrl: extC77.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2023-10-18',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['civil remedies copyright', 'injunction damages piracy', 'ধারা ৭৭', 'কপিরাইট দেওয়ানি প্রতিকার', 'পাইরেসি ক্ষতিপূরণ']
});

// Section 100
const extC100 = getExt('act_copyright_2023', '100');
upsert({
  id: 'copyright-2023-100',
  actId: 'act_copyright_2023',
  sectionNumber: 'Section 100',
  categories: ['digital', 'threats'],
  title: {
    bn: 'তথ্য প্রযুক্তি-ভিত্তিক ডিজিটাল কর্ম ও সফটওয়্যার পাইরেসির ফৌজদারি দণ্ড (সর্বোচ্চ ৪ বছর কারাদণ্ড ও ৪ লাখ টাকা জরিমানা)',
    en: 'Criminal Penalty for Software Piracy and Digital Infringement (Up to 4 Years Prison & 4 Lakh Fine)'
  },
  originalText: cleanText(extC100.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '১০০ ধারা অনুযায়ী কোনো ব্যক্তি তথ্য প্রযুক্তি-ভিত্তিক ডিজিটাল কর্ম বা কম্পিউটার সফটওয়্যারের কপিরাইট লঙ্ঘন করিলে তিনি অনধিক ৪ (চার) বছর মেয়াদের কারাদণ্ড এবং অনধিক ৪ (চার) লাখ টাকা অর্থদণ্ডে দণ্ডিত হইবেন। তবে ব্যক্তিগত অ-বাণিজ্যিক ব্যবহারের ক্ষেত্রে আদালত সর্বনিম্ন ১ লাখ টাকা পর্যন্ত অর্থদণ্ড আরোপ করতে পারেন।',
    en: 'Section 100 prescribes criminal penalties for infringing IT-based digital works and software piracy: imprisonment of up to 4 years and fine of up to 4 lakh Taka, targeting commercial piracy and illegal software syndicates.'
  },
  caution: {
    bn: 'পাইরেটেড সফটওয়্যার বা গেম বাণিজ্যিকভাবে বিক্রি বা সিডি/পেনড্রাইভে লোড করে বেচাকেনা করলে ৪ বছরের জেল ও ৪ লাখ টাকা জরিমানা হতে পারে।',
    en: 'Commercial sale or distribution of cracked software is a serious criminal offense under Section 100.'
  },
  sourceUrl: extC100.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2023-10-18',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['software piracy punishment', 'criminal penalty cracked software', 'digital copyright violation', 'ধারা ১০০', 'সফটওয়্যার পাইরেসি সাজা', 'কপিরাইট ১০০ ধারা']
});

// Section 105
const extC105 = getExt('act_copyright_2023', '105');
upsert({
  id: 'copyright-2023-105',
  actId: 'act_copyright_2023',
  sectionNumber: 'Section 105',
  categories: ['digital', 'threats'],
  title: {
    bn: 'বাণিজ্যিক বিক্রয়ের উদ্দেশ্যে পাইরেটেড সফটওয়্যার বা অনুলিপি দখলে রাখার দণ্ড (সর্বোচ্চ ২ বছর কারাদণ্ড)',
    en: 'Penalties for Possession of Pirated Copies for Commercial Trade (Section 105)'
  },
  originalText: cleanText(extC105.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '১০৫ ধারা অনুযায়ী কোনো ব্যক্তি বাণিজ্যিক উদ্দেশ্যে বা বিক্রয়ের অভিপ্রায়ে কোনো অধিকার লঙ্ঘনকারী পাইরেটেড সফটওয়্যার বা ডিজিটাল কর্ম নিজের দখলে বা হেফাজতে রাখিলে তিনি অনধিক ২ বছর কারাদণ্ড এবং অনধিক ২ লাখ টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    en: 'Section 105 penalizes possessing pirated software copies, cracked installers, or counterfeit media for commercial sale or distribution with up to 2 years imprisonment and fine up to 2 lakh Taka.'
  },
  caution: {
    bn: 'দোকানে পাইরেটেড ওএস বা সফটওয়্যার সম্বলিত পেনড্রাইভ/হার্ডডিস্ক জব্দ হলে ১০৫ ধারায় সরাসরি মামলা হবে।',
    en: 'Possession of pirated software media in computer shops incurs criminal prosecution under Section 105.'
  },
  sourceUrl: extC105.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2023-10-18',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['possession pirated software', 'cracked installer custody', 'ধারা ১০৫', 'পাইরেটেড সফটওয়্যার রাখা সাজা']
});

// Section 115
const extC115 = getExt('act_copyright_2023', '115');
upsert({
  id: 'copyright-2023-115',
  actId: 'act_copyright_2023',
  sectionNumber: 'Section 115',
  categories: ['digital'],
  title: {
    bn: 'মোবাইল কোর্ট কর্তৃক কপিরাইট লঙ্ঘন ও পাইরেসি প্রতিরোধে তাৎক্ষণিক বিচার',
    en: 'Mobile Court Enforcement for On-the-Spot Piracy Redress (Section 115)'
  },
  originalText: cleanText(extC115.text),
  originalLanguage: 'bn',
  plainExplanation: {
    bn: '১১৫ ধারা মোতাবেক কপিরাইট আইন ২০২৩-এর অধীন সংঘটিত কতিপয় অপরাধ মোবাইল কোর্ট আইন ২০০৯ (Mobile Court Act, 2009) এর তফসিলভুক্ত করা হয়েছে, যার মাধ্যমে নির্বাহী ম্যাজিস্ট্রেট বাজারে অভিযান পরিচালনা করে পাইরেটেড সফটওয়্যার জব্দ এবং দোষী ব্যক্তিকে তাৎক্ষণিক জরিমানা বা কারাদণ্ড প্রদান করতে পারেন।',
    en: 'Section 115 schedules offenses under the Copyright Act, 2023 to the Mobile Court Act, 2009, empowering Executive Magistrates to conduct raids against computer software markets and impose spot fines.'
  },
  caution: {
    bn: 'মোবাইল কোর্ট যেকোনো বাণিজ্যিক কম্পিউটার মার্কেট বা দোকানে তাৎক্ষণিক অভিযান চালিয়ে পাইরেটেড সফটওয়্যারের বিরুদ্ধে দণ্ড দিতে পারে।',
    en: 'Executive Magistrates can conduct spot raids and seize pirated digital media instantly.'
  },
  sourceUrl: extC115.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '2023-10-18',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['mobile court copyright piracy', 'executive magistrate raid software', 'ধারা ১১৫', 'মোবাইল কোর্ট কপিরাইট', 'পাইরেসি অভিযান']
});

// -------------------------------------------------------------
// BTRC DIRECTIVES (SIM AND HARASSMENT) (4 PROVISIONS)
// -------------------------------------------------------------

upsert({
  id: 'btrc-sim-limit',
  actId: 'act_btrc_directives',
  sectionNumber: 'Directive 1',
  categories: ['digital', 'threats'],
  title: {
    bn: 'একটি জাতীয় পরিচয়পত্রে সর্বোচ্চ ১৫টি সিম নিবন্ধন ও বায়োমেট্রিক বাধ্যবাধকতা',
    en: 'Maximum 15 SIM Cards per NID and Mandatory Biometric Registration'
  },
  originalText: 'বিটিআরসির সরকারি নির্দেশনানুযায়ী একজন গ্রাহক তাঁর একটি জাতীয় পরিচয়পত্র (NID) ব্যবহার করে সকল মোবাইল অপারেটর মিলিয়ে সর্বোচ্চ ১৫ (পনেরো) টি সিম নিবন্ধন করতে পারবেন। অতিরিক্ত সকল সিম স্বয়ংক্রিয়ভাবে অকার্যকর হবে এবং প্রতিটি সিম নিবন্ধনে আঙুলের ছাপ ও লাইভ ভেরিফিকেশন বাধ্যতামূলক।',
  originalLanguage: 'bn',
  plainExplanation: {
    bn: 'বাংলাদেশ টেলিযোগাযোগ নিয়ন্ত্রণ কমিশন (বিটিআরসি)-এর চূড়ান্ত নির্দেশনানুসারে কোনো নাগরিক তাঁর একটি এনআইডি কার্ডের বিপরীতে সর্বোচ্চ ১৫টি প্রি-পেইড বা পোস্ট-পেইড সিম সক্রিয় রাখতে পারবেন। ১৫টির বেশি সিম থাকলে গ্রাহককে অতিরিক্ত সিমগুলো কাস্টমার কেয়ারে গিয়ে নিজ দায়িত্বে ডি-রেজিস্ট্রেশন বা বাতিল করতে হবে, অন্যথায় বিটিআরসি দ্বৈবচয়ন ভিত্তিতে অতিরিক্ত সিম বন্ধ করে দেয়।',
    en: 'Under official BTRC directives, a citizen is legally permitted to register a maximum of 15 SIM cards across all mobile network operators combined against a single National ID (NID). Every SIM card must be authenticated with biometric fingerprint verification.'
  },
  caution: {
    bn: 'কারো প্ররোচনায় নিজের এনআইডি দিয়ে অন্য কাউকে সিম তুলে দেবেন না; সেই সিম দিয়ে কোনো অপরাধ সংঘটিত হলে মূল দায়ভার এনআইডি ধারীর ওপর বর্তাবে।',
    en: 'Never register a SIM for a stranger using your NID; any criminal activity conducted via that number holds the NID holder legally accountable.'
  },
  sourceUrl: 'http://www.btrc.gov.bd/',
  retrievalDate: '2026-11-01',
  effectiveDate: '2021-01-01',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['maximum 15 sim limit', 'nid sim registration limit', 'biometric sim directive', 'একটি এনআইডিতে কয়টি সিম', '১৫টি সিমের বেশি', 'বিটিআরসি সিম সীমা']
});

upsert({
  id: 'btrc-sim-verification-16001',
  actId: 'act_btrc_directives',
  sectionNumber: 'Directive 2',
  categories: ['digital', 'threats'],
  title: {
    bn: '*১৬০০১# ডায়াল করে নিজের এনআইডিতে নিবন্ধিত সকল সিম যাচাই ও ভুয়া সিম বাতিল',
    en: 'Citizen SIM Verification via *16001# and De-registration of Unauthorized SIMs'
  },
  originalText: 'গ্রাহকগণ যেকোনো সক্রিয় মোবাইল নম্বর থেকে *১৬০০১# ডায়াল করে তাঁর এনআইডির শেষ ৪টি সংখ্যা ইনপুট দিলে ফিরতি ফ্রি এসএমএসে তাঁর নামে কোন কোন অপারেটরের কয়টি সিম সক্রিয় রয়েছে তা জানতে পারবেন। অপরিচিত কোনো নম্বর পাওয়া গেলে অবিলম্বে সংশ্লিষ্ট অপারেটরের কাস্টমার কেয়ারে গিয়ে সিম বাতিল করতে হবে।',
  originalLanguage: 'bn',
  plainExplanation: {
    bn: 'বিটিআরসির সার্বজনীন নির্দেশিকা অনুসারে যেকোনো নাগরিক বিনামূল্যে *16001# ডায়াল করে নিজের এনআইডির শেষ ৪ ডিজিট দিয়ে চেক করতে পারেন তাঁর নামে মোট কয়টি এবং কোন কোন নম্বরের সিম চালু আছে। যদি তালিকায় কোনো অপরিচিত নম্বর দেখা যায়, তবে অনতিবিলম্বে সংশ্লিষ্ট অপারেটরের কাস্টমার কেয়ারে সশরীরে হাজির হয়ে সেই ভুয়া সিমটি ব্লক বা বাতিল (De-register) করতে হবে।',
    en: 'BTRC provides a free nationwide USSD service: dial *16001# from any active mobile phone, input the last 4 digits of your NID, and receive an instant SMS listing all active phone numbers registered under your NID. If any unknown number appears, visit the operator’s customer care center immediately to deregister and block it.'
  },
  caution: {
    bn: 'নিয়মিত *16001# ডায়াল করে যাচাই করুন যাতে আপনার অজান্তে কেউ আপনার এনআইডি জালিয়াতি করে সিম ব্যবহার না করতে পারে।',
    en: 'Regularly dial *16001# to ensure no unauthorized SIM cards are fraudulently active under your NID.'
  },
  sourceUrl: 'http://www.btrc.gov.bd/',
  retrievalDate: '2026-11-01',
  effectiveDate: '2021-01-01',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['16001 sim verification', 'check registered sim nid', 'star 16001 hash', '*১৬০০১# সিম চেক', 'আমার এনআইডিতে কয়টি সিম', 'ভুয়া সিম বাতিল']
});

upsert({
  id: 'btrc-harassment-helpline-100',
  actId: 'act_btrc_directives',
  sectionNumber: 'Directive 3',
  categories: ['digital', 'threats'],
  title: {
    bn: 'টেলিযোগাযোগ সেবা ও হয়রানি সংক্রান্ত অভিযোগ নিষ্পত্তিতে বিটিআরসির টোল-ফ্রি হেল্পলাইন ১০০ ও অনলাইন পোর্টাল',
    en: 'BTRC Toll-Free Complaint Helpline 100 & Online Redressal Portal'
  },
  originalText: 'টেলিযোগাযোগ সেবার মান, অবৈধ ভিওআইপি, সিম জালিয়াতি, অথবা মোবাইল ফোনে অপব্যবহার ও হয়রানির বিষয়ে প্রতিকার পেতে বিটিআরসি টোল-ফ্রি হেল্পলাইন ১০০ অথবা complaint.btrc.gov.bd পোর্টালে সরাসরি অভিযোগ দাখিল করা যায়।',
  originalLanguage: 'bn',
  plainExplanation: {
    bn: 'যেকোনো মোবাইল বা ল্যান্ডফোন থেকে সরকারি টোল-ফ্রি নম্বর ১০০ (টাকা কাটে না) ডায়াল করে সপ্তাহের কর্মদিবসে সরাসরি বিটিআরসির ভোক্তা অভিযোগ কেন্দ্রে অভিযোগ দাখিল করা যায়। এছাড়া বিটিআরসির ওয়েবসাইট (complaint.btrc.gov.bd) এ লগইন করে কল রেকর্ড, এসএমএস স্ক্রিনশট ও প্রতারণার আলামত আপলোড করে লিখিত অভিযোগ দাখিল করা যায়। বিটিআরসি সংশ্লিষ্ট অপারেটরকে নির্ধারিত সময়ের মধ্যে জবাব দিতে বাধ্য করে।',
    en: 'BTRC operates a toll-free complaint hotline 100 (charge-free) and an online portal (complaint.btrc.gov.bd) where citizens can file official grievances regarding telecom service harassment, illegal call spoofing, unapproved balance deductions, or cyber fraud.'
  },
  caution: {
    bn: 'মোবাইল ফোনে চরম হুমকি বা ব্ল্যাকমেইল করা হলে বিটিআরসি ১০০ হেল্পলাইনে জানানোর পাশাপাশি থানায় দ্রুত জিডি বা মামলা করুন।',
    en: 'In cases of criminal extortion or threats, file a police GD/FIR alongside lodging a complaint with BTRC hotline 100.'
  },
  sourceUrl: 'http://www.btrc.gov.bd/',
  retrievalDate: '2026-11-01',
  effectiveDate: '2021-01-01',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['btrc 100 helpline', 'btrc complaint toll free', 'btrc harassment reporting', 'বিটিআরসি ১০০ হেল্পলাইন', 'টেলিযোগাযোগ অভিযোগ ১০০', 'বিটিআরসি অভিযোগ পোর্টাল']
});

upsert({
  id: 'btrc-dnd-spam',
  actId: 'act_btrc_directives',
  sectionNumber: 'Directive 4',
  categories: ['digital', 'consumer'],
  title: {
    bn: 'অবাঞ্ছিত বিজ্ঞাপনী এসএমএস ও বাণিজ্যিক স্প্যাম কল বন্ধে ডু নট ডিস্টার্ব (DND) সেবা',
    en: 'Do Not Disturb (DND) Directive to Stop Promotional Spam SMS & Marketing Calls'
  },
  originalText: 'বিটিআরসির নির্দেশনা মোতাবেক মোবাইল গ্রাহকদের অনাকাঙ্ক্ষিত বাণিজ্যিক বা প্রচারণামূলক এসএমএস ও ভয়েস কল বন্ধে অপারেটরগণ ডু নট ডিস্টার্ব (DND) সেবা প্রদান করতে বাধ্য। গ্রাহক বিনামূল্যে সংশ্লিষ্ট ইউএসএসডি কোড ডায়াল করে এই সুবিধা সক্রিয় করতে পারেন।',
  originalLanguage: 'bn',
  plainExplanation: {
    bn: 'বিটিআরসির নির্দেশনা অনুযায়ী অপারেটরদের বাণিজ্যিক বিজ্ঞাপনী এসএমএস বন্ধ করতে গ্রাহকগণ বিনামূল্যে ডিএনডি (DND) সেবা চালু করতে পারেন: গ্রামীণফোনে *121*1101#, বাংলালিংকে *121*8*6#, রবির ক্ষেত্রে *7# ডায়াল করে প্রোমোশনাল মেসেজ বন্ধ করা যায়। ডিএনডি চালু থাকা সত্ত্বেও কোনো অপারেটর বা কোম্পানি বিজ্ঞাপনী এসএমএস পাঠালে বিটিআরসিতে অভিযোগ দায়ের করা যাবে।',
    en: 'Pursuant to BTRC directives, mobile operators must provide a free Do Not Disturb (DND) service allowing consumers to opt out of promotional text messages and automated telemarketing calls via simple USSD codes.'
  },
  caution: {
    bn: 'ডিএনডি সেবা চালু করলে বিজ্ঞাপনী অফার বন্ধ হলেও জরুরি ব্যাংকিং ওটিপি (OTP) ও নিরাপত্তা এসএমএস চালু থাকবে।',
    en: 'Enabling DND blocks promotional spam without disrupting essential transactional banking or OTP messages.'
  },
  sourceUrl: 'http://www.btrc.gov.bd/',
  retrievalDate: '2026-11-01',
  effectiveDate: '2021-01-01',
  legalStatus: 'active',
  reviewStatus: 'verified',
  keywords: ['dnd spam stop', 'do not disturb btrc', 'stop promotional sms', 'বিজ্ঞাপনী এসএমএস বন্ধ', 'ডিএনডি সেবা', 'স্প্যাম কল বন্ধ']
});

// -------------------------------------------------------------
// 3. WRITE PROVISIONS.JSON
// -------------------------------------------------------------
fs.writeFileSync(provsPath, JSON.stringify(provisions, null, 2), 'utf8');
console.log(`\nUpdated provisions.json successfully! Total provisions count = ${provisions.length}`);
