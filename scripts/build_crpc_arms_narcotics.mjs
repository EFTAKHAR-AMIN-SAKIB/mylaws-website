import fs from 'fs';
import path from 'path';

const extracted = JSON.parse(fs.readFileSync('scripts/criminal_extracted.json', 'utf8'));
function getExtracted(actId, sec) {
  const item = extracted.find(x => x.actId === actId && String(x.sec).toLowerCase() === String(sec).toLowerCase());
  if (!item) {
    throw new Error(`Item not found for ${actId} sec ${sec}`);
  }
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

// 1. Update acts.json
const actsPath = 'src/data/corpus/acts.json';
const acts = JSON.parse(fs.readFileSync(actsPath, 'utf8'));

const actArms = {
  id: 'act_arms_1878',
  name: {
    en: 'The Arms Act, 1878',
    bn: 'অস্ত্র আইন, ১৮৭৮'
  },
  actNumber: 'Act XI of 1878',
  year: 1878,
  categories: ['threats'],
  officialUrl: 'https://bdlaws.minlaw.gov.bd/act-38.html',
  legalStatus: 'active',
  notes: {
    en: 'Regulates arms licensing, prohibited weapons, and strict penalties for illegal possession and carrying of firearms (Sections 13, 14, 19, 19A, 20A).',
    bn: 'অস্ত্রের লাইসেন্সিং, লাইসেন্সবিহীন অস্ত্র বহন ও রাখার কঠোর দণ্ড এবং বিশেষ ট্রাইব্যুনালে বিচার সংক্রান্ত আইন (ধারা ১৩, ১৪, ১৯, ১৯ক, ২০ক)।'
  }
};

const actNarcotics = {
  id: 'act_narcotics_2018',
  name: {
    en: 'Narcotics Control Act, 2018',
    bn: 'মাদকদ্রব্য নিয়ন্ত্রণ আইন, ২০১৮'
  },
  actNumber: '২০১৮ সনের ৬৩ নং আইন',
  year: 2018,
  categories: ['threats', 'rights'],
  officialUrl: 'https://bdlaws.minlaw.gov.bd/act-1276.html',
  legalStatus: 'active',
  notes: {
    en: 'Prohibits illegal narcotics, prescribes death penalty/life imprisonment for commercial quantities, mandates special narcotics control tribunals, and restricts bail (Sections 9, 36, 44A, 46, 47).',
    bn: 'মাদকদ্রব্য নিষিদ্ধকরণ, বাণিজ্যিক চালানে সর্বোচ্চ মৃত্যুদণ্ড ও যাবজ্জীবন কারাদণ্ড, মাদক ট্রাইব্যুনাল গঠন এবং জামিনের কঠোর শর্তাবলী সংক্রান্ত আইন।'
  }
};

if (!acts.some(a => a.id === 'act_arms_1878')) {
  acts.push(actArms);
  console.log('Added act_arms_1878 to acts.json');
}
if (!acts.some(a => a.id === 'act_narcotics_2018')) {
  acts.push(actNarcotics);
  console.log('Added act_narcotics_2018 to acts.json');
}

fs.writeFileSync(actsPath, JSON.stringify(acts, null, 2), 'utf8');
console.log(`acts.json updated: Total acts = ${acts.length}`);

// 2. Load provisions
const provsPath = 'src/data/corpus/provisions.json';
const provisions = JSON.parse(fs.readFileSync(provsPath, 'utf8'));

// Helper to update or create
const provMap = new Map(provisions.map(p => [p.id, p]));

// Update CrPC provisions
// 1. crpc-154
const ext154 = getExtracted('act_crpc_1898', '154');
const p154 = provMap.get('crpc-154');
if (p154) {
  p154.sectionNumber = 'Section 154';
  p154.title = {
    bn: 'আমলযোগ্য অপরাধে থানায় বাধ্যতামূলক এজাহার (FIR) গ্রহণ ও লিপিবদ্ধকরণ',
    en: 'Mandatory Registration of First Information Report (FIR) in Cognizable Offences'
  };
  p154.originalText = cleanText(ext154.text);
  p154.sourceUrl = ext154.url;
  p154.reviewStatus = 'verified';
  p154.plainExplanation = {
    bn: 'আমলযোগ্য কোনো অপরাধ সংঘটিত হওয়ার তথ্য মৌখিক বা লিখিতভাবে প্রদান করা হলে থানার ভারপ্রাপ্ত কর্মকর্তা (OC) এজাহার বা এফআইআর (FIR) লিপিবদ্ধ করতে আইনত বাধ্য। মৌখিক বক্তব্য দিলে তা লিপিবদ্ধ করে তথ্যদাতাকে পড়ে শুনাতে হবে এবং তথ্যদাতার স্বাক্ষর নিতে হবে। থানা যদি মামলা নিতে গড়িমসি বা অস্বীকার করে, তবে নাগরিকের সরাসরি জুডিশিয়াল ম্যাজিস্ট্রেট আদালতে সি আর মামলা (নালিশি মামলা) বা পুলিশ সুপারের (SP) নিকট লিখিত দরখাস্ত দেওয়ার সংবিধিবদ্ধ প্রতিকার রয়েছে।',
    en: 'Section 154 obligates the Officer-in-Charge of a police station to record an FIR whenever information disclosing the commission of a cognizable offence is given orally or in writing. If given orally, it must be reduced to writing, read over to the informant, and signed by the informant. If police refuse to register an FIR, the statutory remedy for the citizen is to file a direct Complaint Register (C.R. Case) before the Judicial Magistrate under Section 200 CrPC, or submit a written petition to the Superintendent of Police (SP).'
  };
  p154.caution = {
    bn: 'আমলযোগ্য অপরাধে থানা মামলা নিতে অস্বীকার করতে পারে না। থানা মামলা না নিলে কোনো ঘুষ না দিয়ে জুডিশিয়াল ম্যাজিস্ট্রেট আদালতে সরাসরি সিআর মামলা দায়ের করুন।',
    en: 'Police have no legal authority to refuse an FIR disclosing a cognizable offence. If refused, file a direct Complaint Register (C.R. Case) before the Judicial Magistrate.'
  };
  const extraKws154 = ['crpc 154', 'section 154', 'police refusal to record fir', 'police case registration', 'cr case remedy', 'thana case', 'ধারা ১৫৪', 'থানা মামলা'];
  for (const kw of extraKws154) {
    if (!p154.keywords.includes(kw)) p154.keywords.push(kw);
  }
  console.log('Updated crpc-154 with verbatim text');
}

// 2. crpc-161 (New)
const ext161 = getExtracted('act_crpc_1898', '161');
const p161 = {
  id: 'crpc-161',
  actId: 'act_crpc_1898',
  sectionNumber: 'Section 161',
  categories: ['rights', 'threats'],
  title: {
    bn: 'পুলিশ কর্তৃক সাক্ষীদের জিজ্ঞাসাবাদ ও ১৬১ ধারায় জবানবন্দি গ্রহণ',
    en: 'Police Examination of Witnesses and Prohibition of Forced Inculpation'
  },
  originalText: cleanText(ext161.text),
  originalLanguage: 'en',
  plainExplanation: {
    bn: 'ফৌজদারী কার্যবিধির ১৬১ ধারার অধীনে তদন্তকারী পুলিশ কর্মকর্তা ঘটনার সাথে পরিচিত যে কোনো ব্যক্তিকে মৌখিকভাবে জিজ্ঞাসাবাদ করতে পারেন এবং তাঁর বক্তব্য লিপিবদ্ধ করতে পারেন। জিজ্ঞাসাবাদকৃত ব্যক্তি সত্য উত্তর দিতে বাধ্য, তবে যে প্রশ্নের উত্তরে তিনি নিজে কোনো অপরাধে ফেঁসে যেতে পারেন তা প্রকাশ না করার সাংবিধানিক অধিকার তাঁর রয়েছে (আত্ম-দোষারোপ থেকে সুরক্ষা)। সবচেয়ে গুরুত্বপূর্ণ বিষয় হলো, ১৬১ ধারায় পুলিশের নিকট প্রদত্ত কোনো জবানবন্দিতে সাক্ষীকে স্বাক্ষর করতে বাধ্য করা সম্পূর্ণ বেআইনি এবং পুলিশের কাছে দেওয়া বিবৃতির ওপর ভিত্তি করে কোনো আদালত কাউকে দোষী সাব্যস্ত করতে পারেন না।',
    en: 'Under Section 161, an investigating police officer may orally examine any person supposed to be acquainted with the facts of the case and reduce their statements to writing. The person is bound to answer truthfully, except questions whose answers would have a tendency to expose them to a criminal charge or penalty (protection against self-incrimination). Crucially, pursuant to Section 162 and fundamental constitutional rights (Article 35(4)), statements recorded under Section 161 must never be signed by the witness or accused, and cannot be used as substantive evidence or sole basis for conviction.'
  },
  caution: {
    bn: 'পুলিশের নিকট ১৬১ ধারায় প্রদত্ত জবানবন্দিতে জোরপূর্বক স্বাক্ষর নেওয়া সম্পূর্ণ বেআইনি এবং কেবল পুলিশের কাছে দেওয়া বিবৃতির ওপর ভিত্তি করে ম্যাজিস্ট্রেট কোনো আসামিকে দণ্ড দিতে পারেন না।',
    en: 'A statement recorded under Section 161 CrPC cannot be used as substantive evidence in court, and forcing a signature on it is strictly illegal. A magistrate cannot convict solely based on a police statement.'
  },
  sourceUrl: ext161.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '1898-01-01',
  legalStatus: 'active',
  reviewStatus: 'verified',
  contentHash: '',
  keywords: [
    'crpc 161',
    'section 161',
    'police statement',
    'forced to sign',
    'forced signature',
    'witness statement',
    'accused statement',
    'police interrogation',
    'examination of witnesses',
    'self-incrimination',
    'police statement where the accused was forced to sign',
    'solely based on a police statement',
    'can a magistrate convict solely based on police statement',
    '১৬১ ধারা',
    'পুলিশের জবানবন্দি',
    'জোরপূর্বক স্বাক্ষর',
    'সাক্ষী জিজ্ঞাসাবাদ',
    'পুলিশের জিজ্ঞাসাবাদ',
    'জবানবন্দিতে স্বাক্ষর'
  ],
  relatedProvisions: ['constitution-35', 'crpc-167']
};
if (!provMap.has('crpc-161')) {
  provisions.push(p161);
  provMap.set('crpc-161', p161);
  console.log('Added crpc-161');
} else {
  Object.assign(provMap.get('crpc-161'), p161);
  console.log('Overwritten crpc-161');
}

// 3. crpc-167
const ext167 = getExtracted('act_crpc_1898', '167');
const p167 = provMap.get('crpc-167');
if (p167) {
  p167.sectionNumber = 'Section 167';
  p167.title = {
    bn: 'তদন্তকালীন পুলিশ রিমান্ডের বিধান ও ম্যাজিস্ট্রেটের হেফাজত পর্যবেক্ষণ',
    en: 'Police Remand Procedure, Maximum Detention and Judicial Safeguards'
  };
  p167.originalText = cleanText(ext167.text);
  p167.sourceUrl = ext167.url;
  p167.reviewStatus = 'verified';
  p167.plainExplanation = {
    bn: 'ফৌজদারী কার্যবিধির ৬১ ধারা ও সংবিধানের ৩৩ অনুচ্ছেদ অনুযায়ী গ্রেপ্তারকৃত ব্যক্তিকে ২৪ ঘণ্টার বেশি থানায় আটকে রাখা নিষিদ্ধ। ২৪ ঘণ্টার মধ্যে তদন্ত সম্পন্ন না হলে ১৬৭ ধারা অনুযায়ী আসামিকে কেস ডায়েরিসহ ম্যাজিস্ট্রেটের কাছে হাজির করতে হয়। ম্যাজিস্ট্রেট সুনির্দিষ্ট কারণ লিপিবদ্ধ করে সর্বোচ্চ মোট ১৫ দিন পর্যন্ত পুলিশ হেফাজতে (রিমান্ড) প্রেরণের আদেশ দিতে পারেন। সুপ্রিম কোর্টের ব্লাস্ট বনাম বাংলাদেশ মামলার যুগান্তকারী নির্দেশনা অনুযায়ী রিমান্ড কোনো নিয়মিত বিষয় নয়; শারীরিক নির্যাতন সম্পূর্ণ নিষিদ্ধ এবং আসামির শারীরিক সুস্থতা নিশ্চিত করে কঠোর তদারকিতে জিজ্ঞাসাবাদ করতে হবে।',
    en: 'Section 167 governs remand when investigation cannot be completed within the 24-hour statutory limit under Section 61 and Constitution Article 33. The police officer must transmit the diary entries and forward the accused to the nearest Judicial Magistrate. A Magistrate may authorize detention in police custody (remand) only for well-recorded reasons, not exceeding 15 days in total. Under the landmark Supreme Court appellate guidelines (BLAST v Bangladesh), remand must not be granted mechanically or for coercive interrogation; the accused must be produced physically, allowed medical examination, and safeguarded against custodial torture.'
  };
  p167.caution = {
    bn: 'ম্যাজিস্ট্রেটের আদেশ ছাড়া কোনো আসামিকে নিজের খুশিমতো ২৪ ঘণ্টার বেশি থানায় আটকে রেখে জেরা করা সম্পূর্ণ বেআইনি ও অসাংবিধানিক।',
    en: 'Detaining an accused in a police station beyond 24 hours without an explicit order from a Magistrate is strictly unconstitutional and illegal. Police cannot hold anyone for 5 days on their own whim.'
  };
  const extraKws167 = ['crpc 167', 'section 167', '24 hours detention', 'maximum 15 days remand', 'custodial interrogation', 'judicial remand', 'blast guidelines remand', 'ধারা ১৬৭', '২৪ ঘণ্টা', 'হেফাজত', 'পুলিশ হেফাজত'];
  for (const kw of extraKws167) {
    if (!p167.keywords.includes(kw)) p167.keywords.push(kw);
  }
  console.log('Updated crpc-167 with verbatim text');
}

// 4. crpc-173 (New)
const ext173 = getExtracted('act_crpc_1898', '173');
const p173 = {
  id: 'crpc-173',
  actId: 'act_crpc_1898',
  sectionNumber: 'Section 173',
  categories: ['rights', 'threats'],
  title: {
    bn: 'তদন্ত সমাপ্তিতে পুলিশ প্রতিবেদন (চার্জশিট বা চূড়ান্ত রিপোর্ট)',
    en: 'Police Investigation Report (Charge Sheet or Final Report)'
  },
  originalText: cleanText(ext173.text),
  originalLanguage: 'en',
  plainExplanation: {
    bn: 'ফৌজদারী কার্যবিধির ১৭৩ ধারার অধীনে কোনো মামলার তদন্ত শেষ হওয়ার সাথে সাথে তদন্তকারী কর্মকর্তা সংশ্লিষ্ট ম্যাজিস্ট্রেটের নিকট পুলিশ রিপোর্ট দাখিল করবেন। অপরাধের সত্যতা প্রমাণিত হলে পুলিশ "চার্জশিট" (অভিযোগপত্র) দাখিল করে। আর অভিযোগের পক্ষে প্রমাণ না পাওয়া গেলে বা ঘটনা ভুল/মিথ্যা হলে "ফাইনাল রিপোর্ট" (চূড়ান্ত রিপোর্ট) দাখিল করে মামলা থেকে অব্যাহতির সুপারিশ করা হয়। পুলিশ যদি পক্ষপাতমূলক বা মিথ্যা ফাইনাল রিপোর্ট দেয়, তবে বাদী ম্যাজিস্ট্রেটের কাছে "নারাজি পিটিশন" (Naraji Petition) দাখিল করে পুনঃতদন্ত বা মামলা আমলে নেওয়ার আবেদন করতে পারেন।',
    en: 'Under Section 173, as soon as police investigation is completed without unnecessary delay, the Officer-in-Charge must forward a police report to the Magistrate. If the allegations are substantiated by evidence, the police submit a Charge Sheet (police report for trial). If no evidence is found or the case was based on a mistake of law/fact or false allegations, the police submit a Final Report (FRT - Final Report True, FRF - Final Report False, FRM - Final Report Mistake). If the complainant is aggrieved by a Final Report, they have the statutory right to file a Protest Petition (Naraji Petition) before the Magistrate to request further investigation or cognizance.'
  },
  caution: {
    bn: 'পুলিশ মনগড়া বা অন্যায্য ফাইনাল রিপোর্ট দিলে বাদী আদালতে নারাজি পিটিশন (Naraji) দিয়ে পুনঃতদন্ত বা সিআইডি/পিবিআই দিয়ে তদন্ত করাতে পারেন।',
    en: 'If police submit a biased Final Report recommending release of the real culprits, the complainant has the legal right to file a Naraji (protest petition) before the Magistrate.'
  },
  sourceUrl: ext173.url,
  retrievalDate: '2026-11-01',
  effectiveDate: '1898-01-01',
  legalStatus: 'active',
  reviewStatus: 'verified',
  contentHash: '',
  keywords: [
    'crpc 173',
    'section 173',
    'charge sheet',
    'final report',
    'police report',
    'investigation report',
    'naraji petition',
    'protest petition',
    'অভিযোগপত্র',
    'চার্জশিট',
    'চূড়ান্ত রিপোর্ট',
    'ফাইনাল রিপোর্ট',
    'নারাজি দরখাস্ত',
    'নারাজি পিটিশন',
    'পুলিশ রিপোর্ট',
    '১৭৩ ধারা'
  ],
  relatedProvisions: ['crpc-154', 'crpc-167']
};
if (!provMap.has('crpc-173')) {
  provisions.push(p173);
  provMap.set('crpc-173', p173);
  console.log('Added crpc-173');
} else {
  Object.assign(provMap.get('crpc-173'), p173);
  console.log('Overwritten crpc-173');
}

// 5. crpc-496
const ext496 = getExtracted('act_crpc_1898', '496');
const p496 = provMap.get('crpc-496');
if (p496) {
  p496.sectionNumber = 'Section 496';
  p496.title = {
    bn: 'জামিনযোগ্য অপরাধে জামিন পাওয়া নাগরিকের সংবিধিবদ্ধ আইনি অধিকার',
    en: 'Bail as a Matter of Legal Right in Bailable Offences'
  };
  p496.originalText = cleanText(ext496.text);
  p496.sourceUrl = ext496.url;
  p496.reviewStatus = 'verified';
  p496.plainExplanation = {
    bn: 'ফৌজদারী কার্যবিধির ৪৯৬ ধারা অনুযায়ী, কোনো ব্যক্তি জামিনযোগ্য অপরাধে গ্রেপ্তার বা আদালতে হাজির হলে তিনি আইনগত অধিকার হিসেবে জামিন পাওয়ার যোগ্য। আদালত বা পুলিশ উপযুক্ত জামিননামা গ্রহণ করে তাকে জামিন দিতে বাধ্য। জামিনযোগ্য অপরাধের ক্ষেত্রে (যেমন দ্বিতীয় তফসিলে জামিনযোগ্য উল্লিখিত বা সর্বোচ্চ ১ বছর কারাদণ্ডযোগ্য অধিকাংশ সাধারণ অপরাধ) জামিন নাকচ করার কোনো স্বেচ্ছাচারী ক্ষমতা আদালতের নেই; উপযুক্ত জামিনদার বা বন্ড দাখিল করলেই জামিন প্রদান বাধ্যতামূলক।',
    en: 'Section 496 lays down that when a person accused of a bailable offence is arrested or detained without warrant, or appears before a court, they shall be released on bail as a matter of absolute statutory right upon furnishing a reasonable bond with or without sureties. In bailable offences (such as offences punishable with up to 1 year imprisonment or specified as bailable in Schedule II of the CrPC), neither the police officer nor the court has discretionary power to refuse bail if the accused is prepared to offer bail.'
  };
  p496.caution = {
    bn: 'জামিনযোগ্য অপরাধে জামিন আদালতের দয়া নয়, নাগরিকের আইনি অধিকার। বন্ড ও জামিনদার প্রস্তুত থাকলে আদালত জামিন দিতে আইনত বাধ্য।',
    en: 'In bailable offences, bail cannot be denied as a punitive measure. If bail is refused by an officer or lower magistrate, immediate recourse lies in higher judicial revision.'
  };
  const extraKws496 = ['crpc 496', 'section 496', '1 year imprisonment bailable', 'right to bail', 'mandatory bail', 'bailable bail', '৪৯৬ ধারা'];
  for (const kw of extraKws496) {
    if (!p496.keywords.includes(kw)) p496.keywords.push(kw);
  }
  console.log('Updated crpc-496 with verbatim text');
}

// 6. crpc-497
const ext497 = getExtracted('act_crpc_1898', '497');
const p497 = provMap.get('crpc-497');
if (p497) {
  p497.sectionNumber = 'Section 497';
  p497.title = {
    bn: 'অ-জামিনযোগ্য মামলায় আদালত কর্তৃক জামিন বিবেচনা ও বিশেষ ব্যতিক্রম',
    en: 'Judicial Discretion and Exceptions for Bail in Non-Bailable Offences'
  };
  p497.originalText = cleanText(ext497.text);
  p497.sourceUrl = ext497.url;
  p497.reviewStatus = 'verified';
  p497.plainExplanation = {
    bn: 'ফৌজদারী কার্যবিধির ৪৯৭ ধারায় অ-জামিনযোগ্য অপরাধে জামিন মঞ্জুরের বিচারিক এখতিয়ার নির্ধারিত হয়েছে। অ-জামিনযোগ্য মামলায় জামিন দাবি করা অধিকার নয়, বরং আদালতের সুবিবেচনার বিষয়। যদি কোনো ব্যক্তি মৃত্যুদণ্ড বা যাবজ্জীবন কারাদণ্ডে দণ্ডনীয় অপরাধে যুক্ত থাকার যুক্তিসঙ্গত প্রমাণ থাকে, তবে সাধারণ নিয়মে তাকে জামিন দেওয়া হয় না। তবে বিশেষ ব্যতিক্রম হিসেবে অভিযুক্ত ব্যক্তি যদি ১৬ বছরের কম বয়সী কোনো নাবালক, কোনো নারী, অথবা অসুস্থ বা দুর্বল ব্যক্তি হন, তবে মৃত্যুদণ্ডযোগ্য মামলায়ও আদালত বিবেচনাপূর্বক জামিন দিতে পারেন।',
    en: 'Section 497 governs the release on bail of persons accused of non-bailable offences. While bail in non-bailable offences is not an automatic right, the court has broad judicial discretion to grant bail. However, bail shall not be granted if there appear reasonable grounds for believing the accused is guilty of an offence punishable with death or imprisonment for life, EXCEPT that the court may direct that any person under the age of 16 years, any woman, or any sick or infirm person accused of such an offence be released on bail.'
  };
  p497.caution = {
    bn: 'অ-জামিনযোগ্য অপরাধে জামিন আদালতের সুবিবেচনামূলক ক্ষমতা, তবে নারী, ১৬ বছরের কম বয়সী শিশু ও অসুস্থ ব্যক্তিদের ক্ষেত্রে আইনে বিশেষ জামিনের সুযোগ রয়েছে।',
    en: 'In non-bailable offences, bail is at the discretion of the court, but special statutory leniency applies to minors under 16, women, and sick or infirm persons.'
  };
  const extraKws497 = ['crpc 497', 'section 497', 'non-bailable offence', 'bail discretion', 'minor female sick bail', '৪৯৭ ধারা'];
  for (const kw of extraKws497) {
    if (!p497.keywords.includes(kw)) p497.keywords.push(kw);
  }
  console.log('Updated crpc-497 with verbatim text');
}

// 7. crpc-498
const ext498 = getExtracted('act_crpc_1898', '498');
const p498 = provMap.get('crpc-498');
if (p498) {
  p498.sectionNumber = 'Section 498';
  p498.title = {
    bn: 'হাইকোর্ট বিভাগ বা দায়রা আদালত কর্তৃক জামিন মঞ্জুর ও আগাম জামিনের এখতিয়ার',
    en: 'High Court Division and Sessions Court Bail Powers & Anticipatory Bail'
  };
  p498.originalText = cleanText(ext498.text);
  p498.sourceUrl = ext498.url;
  p498.reviewStatus = 'verified';
  p498.plainExplanation = {
    bn: 'ফৌজদারী কার্যবিধির ৪৯৮ ধারার অধীনে হাইকোর্ট বিভাগ এবং দায়রা আদালত যে কোনো ব্যক্তির জামিন মঞ্জুর করতে পারেন এবং অতিরিক্ত বা অযৌক্তিক জামিনের বন্ডের পরিমাণ কমিয়ে দিতে পারেন। সুপ্রিম কোর্টের সুপ্রতিষ্ঠিত সিদ্ধান্ত অনুসারে এই ধারার ক্ষমতা বলেই কোনো ব্যক্তি যদি মিথ্যা, উদ্দেশ্যপ্রণোদিত বা হয়রানিমূলক মামলায় গ্রেপ্তার হওয়ার যুক্তিসঙ্গত আশঙ্কা করেন, তবে তিনি সশরীরে হাজির হয়ে হাইকোর্ট বা দায়রা আদালতে আগাম জামিনের (Anticipatory Bail) আবেদন করতে পারেন।',
    en: 'Section 498 grants concurrent and extraordinary supervisory powers to the High Court Division and Court of Sessions to admit any accused person to bail, whether in custody or before arrest, or to reduce excessive bail amounts. Under established judicial precedents of the Supreme Court of Bangladesh, Section 498 is the procedural vehicle for granting Anticipatory Bail (Ogrim Jamin) to a person who has reasonable apprehension of being arrested in a false, fabricated, or politically motivated criminal case, enabling them to surrender to the court’s jurisdiction while being protected from unlawful police harassment.'
  };
  p498.caution = {
    bn: 'আগাম জামিনের জন্য আবেদনকারীকে সশরীরে আদালতে উপস্থিত হতে হয় এবং প্রমাণ করতে হয় যে তাকে মিথ্যা বা হয়রানিমূলক উদ্দেশ্যে গ্রেপ্তার করার চেষ্টা করা হচ্ছে।',
    en: 'Anticipatory bail requires genuine apprehension of arrest in a fabricated or malicious case; the petitioner must physically surrender before the court and show bona fide grounds.'
  };
  const extraKws498 = ['crpc 498', 'section 498', 'high court anticipatory bail', 'sessions court bail', '৪৯৮ ধারা'];
  for (const kw of extraKws498) {
    if (!p498.keywords.includes(kw)) p498.keywords.push(kw);
  }
  console.log('Updated crpc-498 with verbatim text');
}

// ---------------------------------------------------------------------------
// Arms Act, 1878 Provisions (5 provisions)
// ---------------------------------------------------------------------------
const armsProvisions = [
  {
    id: 'arms-1878-13',
    sec: '13',
    titleBn: 'লাইসেন্স ব্যতীত প্রকাশ্যে অস্ত্র বহন বা যাতায়াত নিষিদ্ধকরণ',
    titleEn: 'Prohibition of Going Armed Without License',
    bnExp: '১৮৭৮ সালের অস্ত্র আইনের ১৩ ধারা অনুযায়ী সরকারের ক্ষমতাপ্রাপ্ত কর্তৃপক্ষের বৈধ লাইসেন্স ও নির্ধারিত শর্ত ছাড়া কোনো ব্যক্তি কোনো প্রকার অস্ত্র নিয়ে প্রকাশ্যে চলাফেরা বা যাতায়াত করতে পারবেন না। এই বিধান লঙ্ঘন করে অস্ত্র বহন করা হলে যে কোনো পুলিশ কর্মকর্তা বা ক্ষমতাপ্রাপ্ত ব্যক্তি তাৎক্ষণিকভাবে উক্ত অস্ত্র জব্দ করতে পারেন।',
    enExp: 'Section 13 of The Arms Act, 1878 prohibits any person from going armed with any arms except under a valid license issued by the Government and strictly within the terms permitted thereby. Any arms carried in violation of this section may be seized by any police officer or person empowered by the Government.',
    bnCaution: 'বৈধ লাইসেন্স ছাড়া প্রকাশ্যে যে কোনো আগ্নেয়াস্ত্র বা নিষিদ্ধ অস্ত্র বহন করা দণ্ডনীয় অপরাধ এবং পুলিশ যে কাউকে তাৎক্ষণিক গ্রেপ্তার ও অস্ত্র জব্দ করতে পারে।',
    enCaution: 'Carrying a firearm or prohibited weapon in public without an active, authorized arms license is a cognizable offence subject to immediate arrest and seizure.',
    keywords: ['arms act 13', 'section 13', 'going armed without license', 'unlicensed weapon carrying', 'carrying arms in public', 'weapon seizure', '১৩ ধারা', 'অস্ত্র বহন', 'লাইসেন্স ছাড়া অস্ত্র বহন', 'অবৈধ অস্ত্র জব্দ']
  },
  {
    id: 'arms-1878-14',
    sec: '14',
    titleBn: 'লাইসেন্স ব্যতীত আগ্নেয়াস্ত্র বা গোলাবারুদ নিজের দখলে বা নিয়ন্ত্রণে রাখা নিষিদ্ধকরণ',
    titleEn: 'Prohibition on Unlicensed Possession of Firearms and Ammunition',
    bnExp: '১৪ ধারা অনুযায়ী বৈধ লাইসেন্স এবং অনুমতি ছাড়া কোনো ব্যক্তি কোনো প্রকার কামান, আগ্নেয়াস্ত্র, গোলাবারুদ বা সামরিক সরঞ্জাম নিজের দখলে, হেফাজতে বা নিয়ন্ত্রণে রাখতে পারবেন না। বাড়ি, গাড়ি বা ব্যক্তিগত হেফাজতে অবৈধ অস্ত্র রাখা সরাসরি আইন লঙ্ঘন।',
    enExp: 'Section 14 strictly prohibits any person from having in their possession or under their custody or control any cannon, fire-arm, ammunition, or military stores, except under a valid license and in the manner permitted thereby. Unauthorized possession in a residence, vehicle, or person constitutes illegal arms possession.',
    bnCaution: 'লাইসেন্স ছাড়া বাড়িতে বা গাড়িতে কোনো পিস্তল, বন্দুক, রাইফেল বা গুলি রাখা সম্পূর্ণ বেআইনি এবং এর জন্য কঠোর কারাদণ্ড নির্ধারিত।',
    enCaution: 'Keeping an unregistered pistol, shotgun, rifle, or ammunition in your home or vehicle without a license violates Section 14 and incurs severe criminal penalties under Sections 19 and 19A.',
    keywords: ['arms act 14', 'section 14', 'unlicensed possession of firearms', 'illegal ammunition', 'firearms possession', 'gun possession', 'military stores', '১৪ ধারা', 'অবৈধ অস্ত্র রাখা', 'আগ্নেয়াস্ত্র দখল', 'গোলাবারুদ সংরক্ষণ']
  },
  {
    id: 'arms-1878-19',
    sec: '19',
    titleBn: 'অবৈধ অস্ত্র প্রস্তুত, বিক্রি, পরিবহন ও দখলে রাখার সাধারণ দণ্ড (৭-১০ বছর বা যাবজ্জীবন)',
    titleEn: 'Penalties for Unlicensed Manufacture, Sale, Transport and Possession of Arms',
    bnExp: 'অস্ত্র আইনের ১৯ ধারায় লাইসেন্স ছাড়া অস্ত্র তৈরি, রূপান্তর, বিক্রি, আমদানি, রপ্তানি, পরিবহন বা দখলে রাখার জন্য কঠোর শাস্তির বিধান রয়েছে। এই অপরাধে দোষী সাব্যস্ত হলে ব্যক্তি যাবজ্জীবন কারাদণ্ড অথবা অন্যূন ৭ বছর থেকে সর্বোচ্চ ১০ বছর পর্যন্ত সশ্রম কারাদণ্ড এবং অর্থদণ্ডে দণ্ডিত হবেন।',
    enExp: 'Section 19 sets forth heavy criminal penalties for manufacturing, converting, selling, importing, exporting, transporting, going armed with, or possessing any arms, ammunition, or military stores in contravention of the Act. Any person committing these breaches is punishable with imprisonment for life, or with rigorous imprisonment for a term which may extend to 10 years and not less than 7 years, and also liable to fine.',
    bnCaution: '১৯ ধারার অপরাধসমূহ আমলযোগ্য ও অ-জামিনযোগ্য এবং বিশেষ ট্রাইব্যুনালে এর বিচার পরিচালিত হয়।',
    enCaution: 'Offences under Section 19 are cognizable, non-bailable, and tried by a Special Tribunal under the Special Powers Act / Arms Act framework.',
    keywords: ['arms act 19', 'section 19', 'punishment for illegal arms', 'arms manufacture penalty', 'unlicensed gun punishment', 'arms possession sentence', 'life imprisonment arms', '১৯ ধারা', 'অবৈধ অস্ত্রের শাস্তি', 'অস্ত্র রাখার সাজা', 'যাবজ্জীবন কারাদণ্ড অস্ত্র', 'অস্ত্র বিক্রি দণ্ড']
  },
  {
    id: 'arms-1878-19a',
    sec: '19A',
    titleBn: 'পিস্তল, রিভলবার, রাইফেল বা বন্দুক জাতীয় মারাত্মক আগ্নেয়াস্ত্র রাখার বিশেষ দণ্ড (অন্যূন ১০ বছর হতে যাবজ্জীবন)',
    titleEn: 'Mandatory Minimum 10-Year to Life Sentence for Possession of Firearms (Pistol, Revolver, Rifle, Shotgun)',
    bnExp: '১৯ক ধারা অনুযায়ী, যদি কোনো ব্যক্তি পিস্তল, রিভলবার, রাইফেল, শর্টগান বা অন্যান্য আগ্নেয়াস্ত্রের ক্ষেত্রে অবৈধভাবে রাখা, বহন বা আমদানির অপরাধ সংঘটন করেন, তবে তিনি যাবজ্জীবন কারাদণ্ড অথবা অন্যূন ১০ বছর সশ্রম কারাদণ্ড এবং অর্থদণ্ডে দণ্ডিত হবেন। এই ধারায় সর্বনিম্ন সাজা ১০ বছর বাধ্যতামূলক।',
    enExp: 'Section 19A provides an enhanced, mandatory minimum sentence for offences committed in respect of specific modern firearms—namely pistols, revolvers, rifles, shotguns, or other military firearms. Notwithstanding Section 19, whoever possesses, carries, or imports such firearms without a license is punishable with imprisonment for life, or with rigorous imprisonment for a term which shall not be less than 10 years, and also liable to fine.',
    bnCaution: 'পিস্তল, রিভলবার বা রাইফেল জাতীয় আগ্নেয়াস্ত্র অবৈধভাবে রাখলে আইনানুযায়ী সর্বনিম্ন ১০ বছর সশ্রম কারাদণ্ড থেকে যাবজ্জীবন কারাদণ্ড হতে পারে এবং এটি সম্পূর্ণ অ-জামিনযোগ্য।',
    enCaution: 'Possession of modern lethal firearms like pistols, revolvers, or rifles carries a mandatory statutory minimum of 10 years rigorous imprisonment up to life imprisonment. It is non-bailable.',
    keywords: ['arms act 19a', 'section 19a', 'pistol possession punishment', 'revolver rifle sentence', 'minimum 10 years arms', 'firearm life imprisonment', 'mandatory minimum firearms', '১৯ক ধারা', 'পিস্তল রাখার শাস্তি', 'রিভলবার রাইফেল সাজা', 'অবৈধ আগ্নেয়াস্ত্র দণ্ড', '১০ বছর কারাদণ্ড অস্ত্র']
  },
  {
    id: 'arms-1878-20a',
    sec: '20A',
    titleBn: 'খুন, ডাকাতি বা গুরুতর অপরাধের উদ্দেশ্যে অবৈধ আগ্নেয়াস্ত্র বহনের মৃত্যুদণ্ড বা যাবজ্জীবন কারাদণ্ড',
    titleEn: 'Capital Punishment (Death Penalty) for Carrying Arms with Intent to Commit Murder or Dacoity',
    bnExp: 'অস্ত্র আইনের ২০ক ধারায় বলা হয়েছে, কোনো ব্যক্তি যদি খুন, ডাকাতি, দস্যুতা বা মারাত্মক অপরাধ সংঘটনের উদ্দেশ্যে অথবা অবৈধ উদ্দেশ্যে লাইসেন্সবিহীন পিস্তল, রিভলবার, রাইফেল বা বন্দুক নিয়ে ঘোরাফেরা করেন বা নিজের দখলে রাখেন, তবে তিনি মৃত্যুদণ্ড অথবা যাবজ্জীবন কারাদণ্ড অথবা ১৪ বছর পর্যন্ত সশ্রম কারাদণ্ড এবং অর্থদণ্ডে দণ্ডিত হবেন।',
    enExp: 'Section 20A prescribes capital punishment where any person goes armed with a pistol, revolver, rifle, shotgun, or other firearm without a license, or has it in possession or control, with the intent to use it for an unlawful purpose or to commit murder, dacoity, robbery, or grievous hurt. The offender shall be punished with death, or imprisonment for life, or rigorous imprisonment for up to 14 years, and liable to fine.',
    bnCaution: 'ডাকাতি বা হত্যার উদ্দেশ্যে অবৈধ আগ্নেয়াস্ত্র বহন বা ব্যবহার করলে সর্বোচ্চ মৃত্যুদণ্ড হতে পারে।',
    enCaution: 'Using or possessing unlicensed firearms for robbery, extortion, or violence can result in the death penalty under Section 20A.',
    keywords: ['arms act 20a', 'section 20a', 'death penalty for arms', 'murder dacoity firearms', 'capital punishment arms', 'twenty a arms act', '২০ক ধারা', 'অস্ত্র আইনের ২০ক', 'অস্ত্রসহ ডাকাতি মৃত্যুদণ্ড', 'অবৈধ অস্ত্র খুন ফাঁসি']
  }
];

for (const meta of armsProvisions) {
  const ext = getExtracted('act_arms_1878', meta.sec);
  const prov = {
    id: meta.id,
    actId: 'act_arms_1878',
    sectionNumber: `Section ${meta.sec}`,
    categories: ['threats'],
    title: {
      bn: meta.titleBn,
      en: meta.titleEn
    },
    originalText: cleanText(ext.text),
    originalLanguage: 'en',
    plainExplanation: {
      bn: meta.bnExp,
      en: meta.enExp
    },
    caution: {
      bn: meta.bnCaution,
      en: meta.enCaution
    },
    sourceUrl: ext.url,
    retrievalDate: '2026-11-01',
    effectiveDate: '1878-03-15',
    legalStatus: 'active',
    reviewStatus: 'verified',
    contentHash: '',
    keywords: [
      ...meta.keywords,
      `The Arms Act 1878`,
      `অস্ত্র আইন ১৮৭৮`,
      `arms act section ${meta.sec}`
    ],
    relatedProvisions: ['crpc-154']
  };

  if (!provMap.has(meta.id)) {
    provisions.push(prov);
    provMap.set(meta.id, prov);
    console.log(`Added ${meta.id}`);
  } else {
    Object.assign(provMap.get(meta.id), prov);
    console.log(`Overwritten ${meta.id}`);
  }
}

// ---------------------------------------------------------------------------
// Narcotics Control Act, 2018 Provisions (5 provisions)
// ---------------------------------------------------------------------------
const narcoticsProvisions = [
  {
    id: 'narcotics-2018-9',
    sec: '9',
    titleBn: 'অ্যালকোহল ব্যতীত অন্যান্য সকল মাদকদ্রব্যের উৎপাদন, পরিবহন, সংরক্ষণ ও বেচাকেনা নিষিদ্ধকরণ',
    titleEn: 'Prohibition on Production, Possession, Transport and Sale of Narcotics',
    bnExp: 'মাদকদ্রব্য নিয়ন্ত্রণ আইন, ২০১৮-এর ৯ ধারা মোতাবেক সরকারের লাইসেন্স বা অনুমতি ছাড়া অ্যালকোহল ব্যতীত অন্যান্য সকল মাদকদ্রব্য বা সাইকোট্রপিক সাবস্ট্যান্স (যেমন ইয়াবা, মেথামফেটামিন, হেরোইন, কোকেন, গাঁজা, ফেনসিডিল, প্যাথেডিন ইত্যাদি) চাষাবাদ, উৎপাদন, প্রক্রিয়াজাতকরণ, বহন, পরিবহন, সংরক্ষণ, গুদামজাতকরণ, ক্রয়-বিক্রয়, ব্যবহার, আমদানি বা রপ্তানি সম্পূর্ণ নিষিদ্ধ।',
    enExp: 'Section 9 of the Narcotics Control Act, 2018 strictly prohibits the cultivation, production, manufacturing, carrying, transporting, storing, selling, purchasing, using, importing, or exporting of any narcotics or psychotropic substances (such as Yaba, methamphetamine, heroin, cocaine, morphine, cannabis/ganja, phensedyl, or synthetic drugs) without a statutory license or permit issued under the Act.',
    bnCaution: 'অনুমতি ছাড়া যে কোনো মাদক পরিবহন, কেনাবেচা বা নিজের হেফাজতে রাখা আইনত নিষিদ্ধ ও দণ্ডনীয়।',
    enCaution: 'Any unauthorized dealing, carrying, or possession of scheduled narcotics is strictly banned under Section 9 and penalized under Section 36.',
    keywords: ['narcotics act 9', 'section 9', 'narcotics prohibition', 'yaba ban', 'heroin ban', 'drug transport prohibition', 'phensedyl illegal', '৯ ধারা', 'মাদক নিষিদ্ধ', 'ইয়াবা পরিবহন', 'মাদকদ্রব্য উৎপাদন নিষিদ্ধ', 'মাদক আইন ধারা ৯']
  },
  {
    id: 'narcotics-2018-36',
    sec: '36',
    titleBn: 'মাদক অপরাধের শাস্তির তফসিল: ইয়াবা, হেরোইন, কোকেন, ফেনসিডিল ও গাঁজার দণ্ড',
    titleEn: 'Penalties for Narcotics Offences: Table of Sentences for Yaba, Heroin, Phensedyl, Ganja',
    bnExp: '৩৬ ধারার ১ উপধারার সারণিতে মাদকের ধরন ও পরিমাণের ভিত্তিতে কঠোর সাজার বিধান দেওয়া হয়েছে। ইয়াবা বা মেথামফেটামিনের ক্ষেত্রে (সারণি ক্রমিক ১৬): ২০০ পিস বা ২৫ গ্রাম পর্যন্ত ১ থেকে ৫ বছর কারাদণ্ড; ২০০ পিসের বেশি কিন্তু ৪০০ পিস বা ৫০ গ্রাম পর্যন্ত ৫ থেকে ১০ বছর কারাদণ্ড; এবং ৪০০ পিস বা ৫০ গ্রামের বেশি হলে সর্বোচ্চ মৃত্যুদণ্ড অথবা যাবজ্জীবন কারাদণ্ড। হেরোইন, কোকেনের ক্ষেত্রে (ক্রমিক ১): ২৫ গ্রামের বেশি হলে মৃত্যুদণ্ড বা যাবজ্জীবন কারাদণ্ড; ২৫ গ্রামের কম হলে ১ থেকে ১০ বছর কারাদণ্ড। গাঁজার ক্ষেত্রে (ক্রমিক ১৭): ৫ কেজির কম হলে ৬ মাস থেকে ৩ বছর কারাদণ্ড; ৫ কেজির বেশি হলে ৫ থেকে ১০ বছর কারাদণ্ড। ফেনসিডিলের বাণিজ্যিক চালানের ক্ষেত্রে যাবজ্জীবন কারাদণ্ডের বিধান রয়েছে।',
    enExp: 'Section 36(1) sets forth the comprehensive penalty table for violating narcotic prohibitions based on substance category and commercial threshold. For Yaba / Methamphetamine (Table Entry 16): possession up to 200 tablets or 25g is punishable with 1 to 5 years imprisonment; exceeding 200 tablets up to 400 tablets or 25g-50g carries 5 to 10 years; exceeding 400 tablets (over 50g) carries mandatory death penalty or life imprisonment. For Heroin / Cocaine / Morphine (Table Entry 1): exceeding 25 grams carries death penalty or life imprisonment; below 25g carries 1 to 10 years. For Cannabis / Ganja (Table Entry 17): possession under 5kg carries 6 months to 3 years; exceeding 5kg carries 5 to 10 years imprisonment. For Phensedyl / Codeine (Table Entry 14): commercial quantities carry up to life imprisonment.',
    bnCaution: 'বাণিজ্যিক পরিমাণ মাদক (যেমন ৪০০ পিসের বেশি ইয়াবা অথবা ২৫ গ্রামের বেশি হেরোইন) বহনে সর্বোচ্চ মৃত্যুদণ্ড বা যাবজ্জীবন কারাদণ্ড হতে পারে।',
    enCaution: 'Possession of commercial quantities of narcotics (over 400 pieces of Yaba, or over 25g of Heroin/Cocaine) carries capital punishment (death penalty) or life imprisonment.',
    keywords: ['narcotics act 36', 'section 36', 'yaba punishment', 'death penalty for yaba', 'heroin punishment', 'ganja punishment', 'phensedyl punishment', 'drug penalties table', 'methamphetamine sentence', '৩৬ ধারা', 'মাদকের সাজা', 'ইয়াবার শাস্তি', 'ইয়াবা মৃত্যুদণ্ড', 'হেরোইনের সাজা', 'ফেনসিডিল শাস্তি', 'গাঁজার শাস্তি']
  },
  {
    id: 'narcotics-2018-44a',
    sec: '44A',
    titleBn: 'গুরুতর মাদক অপরাধ বিচারের জন্য মাদকদ্রব্য নিয়ন্ত্রণ ট্রাইব্যুনাল গঠন',
    titleEn: 'Special Narcotics Control Tribunals for Trial of Serious Drug Offences',
    bnExp: '৪৪ক ধারা অনুযায়ী অন্যূন ৫ বছর কারাদণ্ড, যাবজ্জীবন কারাদণ্ড বা মৃত্যুদণ্ডে দণ্ডনীয় মাদক অপরাধের বিচার ও আমলে গ্রহণের জন্য সরকার প্রত্যেক জেলা বা মহানগর এলাকায় এক বা একাধিক "মাদকদ্রব্য নিয়ন্ত্রণ ট্রাইব্যুনাল" গঠন করবে। দায়রা জজ বা অতিরিক্ত দায়রা জজ পদমর্যাদার বিচারক এই ট্রাইব্যুনালের বিচারক হিসেবে দায়িত্ব পালন করেন। আর ৫ বছরের কম মেয়াদের কারাদণ্ডযোগ্য অপরাধ জুডিশিয়াল বা মেট্রোপলিটন ম্যাজিস্ট্রেট কর্তৃক বিচার্য।',
    enExp: 'Section 44A mandates the establishment of specialized "Narcotics Control Tribunals" (মাদকদ্রব্য নিয়ন্ত্রণ ট্রাইব্যুনাল) in every district and metropolitan area to take cognizance and try offences punishable with imprisonment of 5 years or more, life imprisonment, or death. The Government designates an Additional Sessions Judge (অতিরিক্ত দায়রা জজ) as the Judge of the Tribunal. Offences punishable with less than 5 years imprisonment may be tried by designated Judicial Magistrates.',
    bnCaution: '৫ বছর বা তদূর্ধ্ব কারাদণ্ডযোগ্য মাদক মামলার বিচার কেবল বিশেষ মাদকদ্রব্য নিয়ন্ত্রণ ট্রাইব্যুনালে পরিচালিত হয়।',
    enCaution: 'Serious narcotics cases involving 5+ years of imprisonment or death penalty are exclusively tried by the Special Narcotics Control Tribunal.',
    keywords: ['narcotics act 44a', 'section 44a', 'narcotics control tribunal', 'drug tribunal jurisdiction', 'additional sessions judge drug court', 'special narcotics court', '৪৪ক ধারা', 'মাদক ট্রাইব্যুনাল', 'মাদকদ্রব্য নিয়ন্ত্রণ ট্রাইব্যুনাল', 'মাদক আদালত']
  },
  {
    id: 'narcotics-2018-46',
    sec: '46',
    titleBn: 'মাদকদ্রব্য সম্পর্কিত সকল অপরাধ আমলযোগ্য (Cognizable)',
    titleEn: 'All Narcotics Offences Cognizable (Amoljoggo)',
    bnExp: 'মাদকদ্রব্য নিয়ন্ত্রণ আইনের ৪৬ ধারা স্পষ্টভাবে বিধান করেছে যে, এই আইনের অধীন সংঘটিত সকল অপরাধই আমলযোগ্য (Cognizable) অপরাধ। ফলে পুলিশ বা মাদকদ্রব্য নিয়ন্ত্রণ অধিদপ্তরের ক্ষমতাপ্রাপ্ত কর্মকর্তারা কোনো প্রকার ওয়ারেন্ট ছাড়াই সন্দেহভাজন ব্যক্তিকে তাৎক্ষণিক গ্রেপ্তার এবং ঘটনাস্থলে তল্লাশি ও জব্দ করতে পারেন।',
    enExp: 'Section 46 succinctly and unequivocally declares that all offences under the Narcotics Control Act, 2018 are cognizable offences (আমলযোগ্য অপরাধ). This empowers authorized police officers and Narcotics Control Department officers to arrest any suspect without a warrant and initiate instant search, seizure, and investigation upon receiving information or encountering an offence.',
    bnCaution: 'মাদক সংক্রান্ত অপরাধ আমলযোগ্য হওয়ায় ওয়ারেন্ট ছাড়াই আইনশৃঙ্খলা রক্ষাকারী বাহিনী যে কাউকে তাৎক্ষণিক গ্রেপ্তার করতে পারে।',
    enCaution: 'Because all drug offences are cognizable, enforcement officers have full legal power to arrest suspects without a judicial warrant.',
    keywords: ['narcotics act 46', 'section 46', 'narcotics cognizable', 'arrest without warrant narcotics', 'amoljoggo drug offences', '৪৬ ধারা', 'মাদক অপরাধ আমলযোগ্য', 'ওয়ারেন্ট ছাড়া মাদক গ্রেপ্তার', 'আমলযোগ্য অপরাধ']
  },
  {
    id: 'narcotics-2018-47',
    sec: '47',
    titleBn: 'মাদক মামলায় জামিন মঞ্জুরের কঠোর শর্তাবলী ও বিধিনিষেধ',
    titleEn: 'Strict Bail Restrictions in Narcotics Cases: Non-Bailable Criteria',
    bnExp: '৪৭ ধারায় মাদক মামলায় জামিনের ক্ষেত্রে অত্যন্ত কঠোর বিধিনিষেধ আরোপ করা হয়েছে। এই বিধান অনুযায়ী, রাষ্ট্রপক্ষকে শুনানির সুযোগ না দিয়ে কোনো আসামিকে জামিন দেওয়া যাবে না। এছাড়া যে অপরাধের সাজা ৫ বছরের বেশি, যাবজ্জীবন বা মৃত্যুদণ্ড, সে ক্ষেত্রে আদালত যদি বিশ্বাস করার যুক্তিসঙ্গত কারণ না পায় যে অভিযুক্ত ব্যক্তি উক্ত অপরাধে দোষী নন এবং জামিনে থাকলে তিনি পুনরায় কোনো অপরাধ করবেন না, তবে তাকে কোনোভাবেই জামিনে মুক্তি দেওয়া যাবে না। ফলে বাণিজ্যিক চালানের ক্ষেত্রে মাদক মামলা কঠোরভাবে অ-জামিনযোগ্য।',
    enExp: 'Section 47 establishes stringent statutory barriers to granting bail in narcotics cases. An accused person shall NOT be released on bail unless: (1) the State/prosecution has been given an opportunity of being heard; and (2) where the offence is punishable with death, imprisonment for life, or imprisonment exceeding 5 years, the court is satisfied upon reasonable grounds that the accused is not guilty of the offence and will not commit any offence while on bail. For serious drug trafficking charges, offences are strictly non-bailable.',
    bnCaution: '৫ বছরের বেশি মেয়াদের সাজাযোগ্য মাদক মামলায় আইনগতভাবে জামিন পাওয়া অত্যন্ত দুরূহ এবং এটি কঠোরভাবে অ-জামিনযোগ্য।',
    enCaution: 'Bail is virtually impossible to obtain during investigation in cases involving commercial drug quantities (where maximum penalty exceeds 5 years) due to Section 47’s reverse presumption.',
    keywords: ['narcotics act 47', 'section 47', 'narcotics bail restrictions', 'non-bailable narcotics', 'drug case bail conditions', 'bail in yaba case', '৪৭ ধারা', 'মাদক মামলায় জামিন', 'মাদক জামিন বিধিনিষেধ', 'অ-জামিনযোগ্য মাদক মামলা', 'জামিন শর্তাবলী']
  }
];

for (const meta of narcoticsProvisions) {
  const ext = getExtracted('act_narcotics_2018', meta.sec);
  const prov = {
    id: meta.id,
    actId: 'act_narcotics_2018',
    sectionNumber: `Section ${meta.sec}`,
    categories: ['threats', 'rights'],
    title: {
      bn: meta.titleBn,
      en: meta.titleEn
    },
    originalText: cleanText(ext.text),
    originalLanguage: 'bn',
    plainExplanation: {
      bn: meta.bnExp,
      en: meta.enExp
    },
    caution: {
      bn: meta.bnCaution,
      en: meta.enCaution
    },
    sourceUrl: ext.url,
    retrievalDate: '2026-11-01',
    effectiveDate: '2018-12-27',
    legalStatus: 'active',
    reviewStatus: 'verified',
    contentHash: '',
    keywords: [
      ...meta.keywords,
      `Narcotics Control Act 2018`,
      `মাদকদ্রব্য নিয়ন্ত্রণ আইন ২০১৮`,
      `মাদক আইন ধারা ${meta.sec}`
    ],
    relatedProvisions: ['crpc-497']
  };

  if (!provMap.has(meta.id)) {
    provisions.push(prov);
    provMap.set(meta.id, prov);
    console.log(`Added ${meta.id}`);
  } else {
    Object.assign(provMap.get(meta.id), prov);
    console.log(`Overwritten ${meta.id}`);
  }
}

// 3. Save updated provisions.json
fs.writeFileSync(provsPath, JSON.stringify(provisions, null, 2), 'utf8');
console.log(`Provisions updated successfully! Total provisions count = ${provisions.length}`);
