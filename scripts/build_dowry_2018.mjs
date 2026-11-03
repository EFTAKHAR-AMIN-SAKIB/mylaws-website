import fs from 'node:fs';
import crypto from 'node:crypto';

const extracted = JSON.parse(fs.readFileSync('scripts/family_sections_extracted.json', 'utf8'))['act_dowry_2018'];

function sha256(str) {
  return crypto.createHash('sha256').update(str.trim()).digest('hex');
}

const titlesAndMeta = {
  1: {
    title: { bn: "সংক্ষিপ্ত শিরোনাম ও প্রবর্তন (ধারা ১)", en: "Short Title and Commencement (Section 1)" },
    plainExplanation: {
      bn: "এই আইনটি 'যৌতুক নিরোধ আইন, ২০১৮' নামে অভিহিত এবং ৮ অক্টোবর ২০১৮ তারিখে গেজেট প্রকাশের মাধ্যমে অবিলম্বে কার্যকর হয়।",
      en: "Designates the act as the Dowry Prohibition Act, 2018 (Act No. XXXIX of 2018), which came into force immediately on 8 October 2018."
    },
    caution: {
      bn: "১৯৮০ সালের পূর্ববর্তী যৌতুক নিরোধ আইন রহিত করে এই আইন কার্যকর করা হয়েছে।",
      en: "Repeals and replaces the Dowry Prohibition Act, 1980 with enhanced penal and procedural provisions."
    },
    keywords: ["dowry prohibition act 2018", "joutuk nirodh ain 2018", "যৌতুক নিরোধ আইন ২০১৮", "section 1", "ধারা ১", "short title"]
  },
  2: {
    title: { bn: "সংজ্ঞা ও যৌতুকের ব্যাখ্যা (ধারা ২)", en: "Definitions and Scope of Dowry (Section 2)" },
    plainExplanation: {
      bn: "যৌতুক বলিতে বিবাহ অব্যাহত রাখা বা সম্পাদনের শর্ত হিসেবে প্রত্যক্ষ বা পরোক্ষভাবে দাবি বা প্রদত্ত অর্থ, মূল্যবান জামানত বা সম্পত্তিকে বুঝায়। তবে দেনমোহর ও স্বাভাবিক বিবাহের উপহার (বিনা দাবিতে প্রদত্ত) যৌতুকের অন্তর্ভুক্ত নহে।",
      en: "Defines dowry as any property, valuable security, or money demanded or given directly or indirectly as consideration or condition for marriage or for maintaining the marital relationship. Dower (Mahr) and customary voluntary gifts given without demand are explicitly excluded."
    },
    caution: {
      bn: "বিয়ের পর সম্পর্ক টিকিয়ে রাখার শর্তে কোনো টাকা বা উপহার দাবি করাও আইনের দৃষ্টিতে যৌতুক হিসেবে গণ্য হবে।",
      en: "Post-marital demands of money or goods made as conditions to continue cohabitation or marital ties constitute illegal dowry."
    },
    keywords: ["dowry definition", "joutuk er shongga", "what is dowry", "যৌতুকের সংজ্ঞা", "যৌতুক কি", "wedding jewelry", "jewelry given voluntarily", "bride gifts not dowry", "বিয়ের গহনা", "উপহার যৌতুক নয়", "section 2", "ধারা ২"]
  },
  3: {
    title: { bn: "যৌতুক দাবি করিবার দণ্ড (ধারা ৩)", en: "Punishment for Demanding Dowry (Section 3)" },
    plainExplanation: {
      bn: "বিয়ের কোনো এক পক্ষ অন্য পক্ষের নিকট প্রত্যক্ষ বা পরোক্ষভাবে কোনো যৌতুক দাবি করিলে তিনি অনধিক ৫ (পাঁচ) বৎসর কিন্তু অন্যূন ১ (এক) বৎসর কারাদণ্ড বা অনধিক ৫০,০০০ (পঞ্চাশ হাজার) টাকা অর্থদণ্ড বা উভয় দণ্ডে দণ্ডনীয় হইবেন।",
      en: "Demanding dowry directly or indirectly by either party to a marriage is punishable with imprisonment between 1 and 5 years, or fine up to 50,000 taka, or both."
    },
    caution: {
      bn: "যৌতুক দাবি করা একটি আমলযোগ্য এবং জামিন-অযোগ্য অপরাধ। ম্যাজিস্ট্রেট আদালত বা থানায় সরাসরি এজাহার করা যায়।",
      en: "Demanding dowry is a cognizable and non-bailable offense. Complaints can be filed at the police station or before a Judicial Magistrate."
    },
    keywords: ["dowry demand", "dowry act 2018", "joutuk dabi", "যৌতুক দাবি", "যৌতুক চাওয়া", "পণের দাবি", "যৌতুক নিরোধ আইন", "section 3", "ধারা ৩", "punishment for dowry demand"]
  },
  4: {
    title: { bn: "যৌতুক প্রদান বা গ্রহণ, ইত্যাদির দণ্ড (ধারা ৪)", en: "Penalty for Giving, Taking, or Abetting Dowry (Section 4)" },
    plainExplanation: {
      bn: "বিবাহের কোনো পক্ষ যৌতুক প্রদান বা গ্রহণ করিলে অথবা যৌতুক প্রদান বা গ্রহণে সহায়তা করিলে বা চুক্তি করিলে তিনি অনধিক ৫ বৎসর কিন্তু অন্যূন ১ বৎসর কারাদণ্ড বা অনধিক ৫০,০০০ টাকা অর্থদণ্ড অথবা উভয় দণ্ডে দণ্ডিত হইবেন।",
      en: "Giving, taking, abetting, or contracting to give or receive dowry is punishable with imprisonment from 1 to 5 years, or fine up to 50,000 taka, or both."
    },
    caution: {
      bn: "যৌতুক দেওয়া এবং নেওয়া উভয়ই সমান অপরাধ। তবে স্বেচ্ছায় দেওয়া সাধারণ শুভেচ্ছা উপহার যৌতুকের পর্যায়ে পড়বে না।",
      en: "Both giving and receiving dowry are criminalized. Voluntary customary gifts given without any demand or marital condition are exempted."
    },
    keywords: ["giving dowry", "taking dowry", "joutuk grohon", "যৌতুক দেওয়া", "যৌতুক গ্রহণ", "যৌতুকের চুক্তি", "section 4", "ধারা ৪", "abetment of dowry"]
  },
  5: {
    title: { bn: "যৌতুক সংক্রান্ত চুক্তি ফলবিহীন (ধারা ৫)", en: "Agreements for Dowry to be Void (Section 5)" },
    plainExplanation: {
      bn: "যৌতুক প্রদান বা গ্রহণ সংক্রান্ত যেকোনো চুক্তি আইনের দৃষ্টিতে সম্পূর্ণ বাতিল ও ফলবিহীন (void ab initio)। যৌতুকের প্রতিশ্রুতি দিয়ে লিখিত কোনো অঙ্গীকারনামা আদালতে কার্যকর করা যাবে না।",
      en: "Any contract or agreement to give or take dowry is legally void and unenforceable in any court of law."
    },
    caution: {
      bn: "চাপ বা প্রলোভন দেখিয়ে স্ট্যাম্পে বা অঙ্গীকারনামায় যৌতুকের প্রতিশ্রুতি লিখিয়ে নেওয়া হলেও তা দিয়ে কোনো দেওয়ানি বা আইনি দাবি প্রতিষ্ঠা করা যায় না।",
      en: "Written bonds or stamp commitments for dowry have zero legal validity and cannot be enforced as civil debts."
    },
    keywords: ["dowry agreement void", "joutuk chukti batil", "যৌতুক চুক্তি ফলবিহীন", "void contract dowry", "ধারা ৫", "section 5"]
  },
  6: {
    title: { bn: "মিথ্যা মামলা দায়েরের দণ্ড (ধারা ৬)", en: "Penalty for Filing False or Harassing Cases (Section 6)" },
    plainExplanation: {
      bn: "কোনো ব্যক্তির ক্ষতিসাধনের উদ্দেশ্যে ন্যায্য বা আইনানুগ কারণ নাই জানিয়াও এই আইনের অধীন মিথ্যা মামলা বা অভিযোগ দায়ের করিলে বাদী অনধিক ৫ বৎসর কারাদণ্ড বা অনধিক ৫০,০০০ টাকা অর্থদণ্ড অথবা উভয় দণ্ডে দণ্ডিত হইবেন।",
      en: "Filing a false, frivolous, or malicious complaint under this Act with intent to cause injury or without lawful basis is punishable with up to 5 years imprisonment or fine up to 50,000 taka, or both."
    },
    caution: {
      bn: "যৌতুকের অভিযোগ মিথ্যা প্রমাণিত হলে বা কাউকে হয়রানি করার উদ্দেশ্যে মামলা করলে মামলার বাদীর বিরুদ্ধেই ৫ বছরের কারাদণ্ড হতে পারে।",
      en: "Deters frivolous accusations; complainants face up to 5 years jail if allegations are proven maliciously fabricated."
    },
    keywords: ["false dowry case", "mithya joutuk mamla", "মিথ্যা যৌতুক মামলা", "penalty false complaint", "section 6", "ধারা ৬", "harassment by dowry case"]
  },
  7: {
    title: { bn: "অপরাধের আমলযোগ্যতা, জামিন অযোগ্যতা ও আপসযোগ্যতা (ধারা ৭)", en: "Cognizability, Non-bailable and Compoundable Nature of Offences (Section 7)" },
    plainExplanation: {
      bn: "যৌতুক নিরোধ আইনের অধীন সকল অপরাধ পুলিশ বিনা পরোয়ানায় গ্রেপ্তার করিতে পারিবে (আমলযোগ্য/Cognizable), জামিন আদালতের বিবেচনার বিষয় (জামিন অযোগ্য/Non-bailable) এবং পক্ষগণের সম্মতিতে আদালতের অনুমতি সাপেক্ষে আপসযোগ্য (Compoundable)।",
      en: "Offenses under the Dowry Prohibition Act 2018 are cognizable (police can arrest without warrant), non-bailable (bail is judicial discretion), and compoundable (parties can reach an amicable compromise with court permission)."
    },
    caution: {
      bn: "মামলাটি জামিন-অযোগ্য হলেও আপসযোগ্য বিধায় পারিবারিক সম্পর্ক রক্ষা বা পুনর্বাসনের জন্য ম্যাজিস্ট্রেট আদালতে উভয় পক্ষ আপস মীমাংসা করতে পারেন।",
      en: "Although non-bailable, compoundability allows the magistrate court to record a settlement and acquit the accused if marital disputes are resolved."
    },
    keywords: ["dowry bailability", "cognizable non-bailable", "joutuk jamin", "যৌতুক জামিন", "আপসযোগ্য", "compoundable", "ধারা ৭", "section 7", "crpc 1898"]
  },
  8: {
    title: { bn: "অপরাধের বিচার ও কার্যপদ্ধতি (ধারা ৮)", en: "Trial and Procedure under CrPC (Section 8)" },
    plainExplanation: {
      bn: "এই আইনের অধীন অপরাধের তদন্ত, বিচার ও আপিল ফৌজদারি কার্যবিধি, ১৮৯৮ (CrPC) অনুযায়ী পরিচালিত হইবে। জুডিশিয়াল ম্যাজিস্ট্রেট বা মেট্রোপলিটন ম্যাজিস্ট্রেট আদালত এই মামলার বিচার করিবেন।",
      en: "Investigation, trial, and appeals under this Act follow the Code of Criminal Procedure, 1898 (CrPC). First Class Judicial Magistrates or Metropolitan Magistrates hold summary and regular trial jurisdiction."
    },
    caution: {
      bn: "থানায় পুলিশ মামলা নিতে অস্বীকার করলে সরাসরি জুডিশিয়াল ম্যাজিস্ট্রেট আদালতে সি.আর. (CR) মামলা দায়ের করা যায়।",
      en: "If police decline an FIR, complainant can file a Complaint Register (CR) case directly before the Judicial Magistrate."
    },
    keywords: ["trial under crpc", "dowry court", "judicial magistrate dowry", "যৌতুক আদালত", "সিআর মামলা", "ধারা ৮", "section 8", "crpc investigation"]
  },
  9: {
    title: { bn: "বিধি প্রণয়ন ক্ষমতা (ধারা ৯)", en: "Power to Make Rules (Section 9)" },
    plainExplanation: {
      bn: "এই আইনের উদ্দেশ্য বাস্তবায়ন ও পদ্ধতি নির্ধারণের জন্য সরকার সরকারি গেজেটে প্রজ্ঞাপন দ্বারা বিধিমালা প্রণয়ন করিতে পারিবে।",
      en: "Empowers the Government to frame rules by official gazette notification to execute the purposes of this Act."
    },
    caution: {
      bn: "বিধিমালায় যৌতুকের বিরুদ্ধে প্রশাসনিক ও সামাজিক প্রতিরোধ সংক্রান্ত বিস্তারিত নির্দেশনা দেওয়া যেতে পারে।",
      en: "Government regulations supplement statutory procedural rules."
    },
    keywords: ["power to make rules", "dowry rules", "ধারা ৯", "section 9", "বিধি প্রণয়ন"]
  },
  10: {
    title: { bn: "রহিতকরণ ও হেফাজত (ধারা ১০)", en: "Repeal and Savings (Section 10)" },
    plainExplanation: {
      bn: "১৯৮০ সালের যৌতুক নিরোধ আইন (Act No. XXXV of 1980) রহিত করা হইল। তবে পূর্বের আইনের অধীনে নিষ্পন্নাধীন মামলাসমূহ পূর্বের আইন অনুসারেই চলমান থাকিবে।",
      en: "Repeals the Dowry Prohibition Act, 1980 while saving pending investigations, trials, and proceedings to be disposed under the repealed law."
    },
    caution: {
      bn: "৮ অক্টোবর ২০১৮ এর পূর্বের ঘটনার ক্ষেত্রে পূর্ববর্তী ১৯৮০ সালের আইন এবং পরবর্তী অপরাধের ক্ষেত্রে ২০১৮ সালের আইন প্রযোজ্য।",
      en: "Offenses committed prior to 8 October 2018 proceed under the 1980 Act; later offenses proceed under the 2018 Act."
    },
    keywords: ["repeal of 1980 act", "rohitkoron", "রহিতকরণ", "dowry act 1980", "ধারা ১০", "section 10", "savings clause"]
  },
  11: {
    title: { bn: "ইংরেজিতে অনূদিত নির্ভরযোগ্য পাঠ প্রকাশ (ধারা ১১)", en: "Publication of Authentic English Text (Section 11)" },
    plainExplanation: {
      bn: "সরকার এই আইনের একটি নির্ভরযোগ্য ইংরেজি পাঠ (Authentic English Text) সরকারি গেজেটে প্রকাশ করিতে পারিবে। তবে বাংলা ও ইংরেজি পাঠের মধ্যে বিরোধ দেখা দিলে বাংলা পাঠ প্রাধান্য পাইবে।",
      en: "Authorizes publication of an authentic English translation in the official Gazette. In case of conflict between Bengali and English texts, the Bengali text prevails."
    },
    caution: {
      bn: "উচ্চ আদালত ও আন্তর্জাতিক সালিশে বাংলা পাঠকেই চূড়ান্ত প্রামাণ্য ভিত্তি হিসেবে বিবেচনা করা হয়।",
      en: "The Bengali text has statutory supremacy over the English translation in all legal proceedings."
    },
    keywords: ["authentic english text", "bangla text prevails", "ধারা ১১", "section 11", "ইংরেজি পাঠ"]
  }
};

function bnToEnNum(str) {
  const bn = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  return String(str).replace(/[০-৯]/g, d => bn.indexOf(d));
}

const provisions = [];
for (const s of extracted) {
  const num = parseInt(bnToEnNum(s.secNumStr), 10);
  const meta = titlesAndMeta[num];
  if (!meta) continue;

  const id = `dowry-2018-${num}`;
  const prov = {
    id,
    actId: 'act_dowry_2018',
    sectionNumber: `Section ${num}`,
    categories: ['family', 'threats'],
    title: meta.title,
    originalText: s.rawContent,
    originalLanguage: 'bn',
    plainExplanation: meta.plainExplanation,
    caution: meta.caution,
    sourceUrl: s.url,
    retrievalDate: '2026-11-01',
    effectiveDate: '2018-10-08',
    legalStatus: 'active',
    reviewStatus: 'verified',
    contentHash: sha256(s.rawContent),
    keywords: meta.keywords
  };
  provisions.push(prov);
}

fs.writeFileSync('scripts/generated_dowry_2018.json', JSON.stringify(provisions, null, 2), 'utf8');
console.log(`Generated ${provisions.length} provisions for Dowry Prohibition Act 2018`);
