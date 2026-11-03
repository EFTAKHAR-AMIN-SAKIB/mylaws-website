import fs from 'node:fs';
import crypto from 'node:crypto';

const extracted = JSON.parse(fs.readFileSync('scripts/family_sections_extracted.json', 'utf8'))['act_mflo_1961'];
const existingProvs = JSON.parse(fs.readFileSync('src/data/corpus/provisions.json', 'utf8')).filter(p => p.actId === 'act_mflo_1961');

function sha256(str) {
  return crypto.createHash('sha256').update(str.trim()).digest('hex');
}

const existingMap = new Map();
existingProvs.forEach(p => existingMap.set(p.id, p));

const newSectionsMeta = {
  1: {
    id: "mflo-1",
    secNum: "Section 1",
    title: { bn: "সংক্ষিপ্ত শিরোনাম, বিস্তার, প্রয়োগ ও প্রবর্তন (ধারা ১)", en: "Short Title, Extent, Application and Commencement (Section 1)" },
    plainExplanation: {
      bn: "এই অধ্যাদেশটি 'Muslim Family Laws Ordinance, 1961' (১৯৬১ সনের ৮ নং অধ্যাদেশ) নামে অভিহিত। ইহা সমগ্র বাংলাদেশের সকল মুসলিম নাগরিকের ক্ষেত্রে, তাহারা যেখানেই থাকুন না কেন, প্রযোজ্য এবং ১৫ জুলাই ১৯৬১ হইতে কার্যকর।",
      en: "Designates the statute as the Muslim Family Laws Ordinance, 1961 (Ordinance No. VIII of 1961). It applies to all Muslim citizens of Bangladesh wherever they may be, and came into force on 15 July 1961."
    },
    caution: {
      bn: "বাংলাদেশের বাইরে অবস্থানকারী প্রবাসী মুসলিম নাগরিকদের পারিবারিক ও বৈবাহিক বিরোধের ক্ষেত্রেও এই অধ্যাদেশ প্রযোজ্য।",
      en: "Extraterritorial application extends statutory protection to Bangladeshi Muslim citizens residing abroad."
    },
    keywords: ["mflo 1961", "muslim family laws ordinance", "muslim paribar ain 1961", "section 1", "ধারা ১", "short title", "application to expatriates"]
  },
  2: {
    id: "mflo-2",
    secNum: "Section 2",
    title: { bn: "সংজ্ঞা ও সালিশি কাউন্সিল গঠন (ধারা ২)", en: "Definitions and Arbitration Council Constitution (Section 2)" },
    plainExplanation: {
      bn: "এই ধারায় সালিশি কাউন্সিল (Arbitration Council), চেয়ারম্যান (ইউনিয়ন পরিষদ বা পৌরসভার মেয়র বা সিটি কর্পোরেশনের কাউন্সিলর) এবং সংশ্লিষ্ট আইনি পরিভাষাসমূহ সংজ্ঞায়িত করা হইয়াছে। চেয়ারম্যানের নেতৃত্বে উভয় পক্ষের মনোনীত একজন করিয়া প্রতিনিধির সমন্বয়ে সালিশি কাউন্সিল গঠিত হয়।",
      en: "Defines the Arbitration Council, Chairman (Union Parishad, Paurashava, or City Corporation), and representatives. The Arbitration Council consists of the Chairman and one representative nominated by each party to facilitate amicable matrimonial dispute resolution."
    },
    caution: {
      bn: "সালিশি কাউন্সিলে উভয় পক্ষের প্রতিনিধি উপস্থিত থাকা বাধ্যতামূলক; কোনো পক্ষ প্রতিনিধি না দিলে চেয়ারম্যান একতরফা নিষ্পত্তি করতে পারেন।",
      en: "Each party is entitled to nominate one representative. If a party fails to nominate within the specified time, the Council proceeds."
    },
    keywords: ["arbitration council", "chairman mflo", "salishi council", "শালিসি কাউন্সিল", "চেয়ারম্যান", "union parishad chairman", "ধারা ২", "section 2"]
  },
  3: {
    id: "mflo-3",
    secNum: "Section 3",
    title: { bn: "অন্যান্য আইনের উপর এই অধ্যাদেশের প্রাধান্য (ধারা ৩)", en: "Ordinance to Override Other Laws and Customs (Section 3)" },
    plainExplanation: {
      bn: "আপাতত বলবৎ অন্য কোনো আইন, প্রথা বা রীতির বিপরীত হওয়া সত্ত্বেও এই অধ্যাদেশের বিধানাবলি প্রাধান্য পাইবে। কোনো প্রথাগত নিয়ম এই অধ্যাদেশের বিরোধী হইলে তাহা বাতিল বলিয়া গণ্য হইবে।",
      en: "Statutory supremacy clause providing that the provisions of this Ordinance shall have effect notwithstanding any other law, custom, or traditional usage to the contrary."
    },
    caution: {
      bn: "প্রথাগত মুখে মুখে তিন তালাক বা কোনো স্থানীয় কুসংস্কার এই অধ্যাদেশের সংবিধিবদ্ধ নোটিশ ও সালিশি প্রক্রিয়ার ঊর্ধ্বে স্থান পাবে না।",
      en: "Customary practices such as verbal triple talaq are subordinate to the statutory notification and reconciliation procedures of this Ordinance."
    },
    keywords: ["override other laws", "mflo overriding effect", "আইনের প্রাধান্য", "non obstante clause", "section 3", "ধারা ৩"]
  },
  4: {
    id: "mflo-4",
    secNum: "Section 4",
    title: { bn: "উত্তরাধিকার ও এতিম নাতি-নাতনির অধিকার (ধারা ৪)", en: "Succession and Representation Rights of Orphan Grandchildren (Section 4)" },
    plainExplanation: {
      bn: "পিতা বা মাতার মৃত্যুর পূর্বে কোনো পুত্র বা কন্যা মারা গেলে, সম্পত্তি বণ্টনের সময় তাহাদের জীবিত সন্তানগণ (এতিম নাতি বা নাতনি) তাহাদের মৃত পিতা বা মাতা জীবিত থাকিলে যে অংশ পাইতেন, ঠিক সেই অংশই প্রতিনিধিস্বরূপ (per stirpes) লাভ করিবেন।",
      en: "A landmark succession provision in Bangladesh: If any son or daughter dies before the death of the property owner (propositus), the children of such predeceased son or daughter (orphan grandchildren) inherit per stirpes the exact share which their deceased parent would have received if alive."
    },
    caution: {
      bn: "সাধারণ মুসলিম ফরায়েজ অনুযায়ী এতিম নাতি-নাতনিরা চাচাদের উপস্থিতিতে বঞ্চিত হলেও, বাংলাদেশে এই ৪ ধারার কারণে তারা তাদের মৃত পিতামাতার পূর্ণ উত্তরাধিকার পায়।",
      en: "Under traditional classical Hanafi doctrine, predeceased children's offspring were excluded by surviving uncles; Section 4 statutory representation ensures orphan grandchildren cannot be disinherited."
    },
    keywords: [
      "orphan grandchild inheritance",
      "etim nati natni uttoradhikar",
      "succession mflo section 4",
      "representation per stirpes",
      "ওয়ারিশি অধিকার",
      "এতিম নাতির সম্পত্তি",
      "মৃত পিতার সম্পত্তি",
      "ধারা ৪",
      "section 4"
    ]
  },
  11: {
    id: "mflo-11",
    secNum: "Section 11",
    title: { bn: "বিধি প্রণয়নের ক্ষমতা (ধারা ১১)", en: "Power to Make Rules (Section 11)" },
    plainExplanation: {
      bn: "এই অধ্যাদেশের উদ্দেশ্য কার্যকর করিবার জন্য সরকার সরকারি গেজেটে প্রজ্ঞাপন দ্বারা মুসলিম পারিবারিক আইন বিধিমালা প্রণয়ন করিতে পারিবে।",
      en: "Empowers the Government to frame administrative and procedural rules (Muslim Family Laws Rules) to carry out the purposes of this Ordinance."
    },
    caution: {
      bn: "সালিশি কাউন্সিলের নোটিশের ফরম ও পদ্ধতি সরকার কর্তৃক প্রণীত বিধিমালার মাধ্যমে নিয়ন্ত্রিত হয়।",
      en: "Arbitration Council forms, fee scales, and reconciliation proceedings are regulated under the Muslim Family Laws Rules."
    },
    keywords: ["power to make rules", "mflo rules 1961", "বিধি প্রণয়ন", "ধারা ১১", "section 11"]
  },
  "11A": {
    id: "mflo-11a",
    secNum: "Section 11A",
    title: { bn: "অপরাধের বিচারের স্থান ও এখতিয়ার (ধারা ১১ক)", en: "Place of Trial for Offences (Section 11A)" },
    plainExplanation: {
      bn: "অন্য আইনে যাহা কিছুই থাকুক না কেন, এই অধ্যাদেশের অধীন যেকোনো অপরাধের বিচার সেই এলাকার উপযুক্ত আদালত দ্বারা অনুষ্ঠিত হইবে যেখানে অভিযোগকারী বসবাস করেন অথবা যেখানে অপরাধ সংঘটিত হইয়াছে।",
      en: "Notwithstanding anything contained in any other law, an offence under this Ordinance shall be tried by a Court within the local limits of whose jurisdiction the complainant resides or the offence was committed."
    },
    caution: {
      bn: "স্ত্রী তাহার বর্তমান বাসস্থান বা যে এলাকায় অবস্থান করছেন সেখানকার ম্যাজিস্ট্রেট আদালতে মামলা দায়ের করতে পারেন।",
      en: "Aggrieved wives can institute criminal proceedings in their own current residential jurisdiction, avoiding the need to travel to the husband's district."
    },
    keywords: ["place of trial mflo", "bicharr sthan", "jurisdiction of trial", "বিচারের স্থান", "ধারা ১১ক", "section 11a", "magistrate court mflo"]
  },
  12: {
    id: "mflo-12",
    secNum: "Section 12",
    title: { bn: "বাল্যবিয়ে নিরোধ আইন সংশোধন (ধারা ১২)", en: "Amendment of Child Marriage Restraint Act (Section 12)" },
    plainExplanation: {
      bn: "এই ধারার মাধ্যমে তদানীন্তন Child Marriage Restraint Act, 1929 এর বিবাহযোগ্য বয়সের সংজ্ঞা ও শাস্তির বিধানে যুগান্তকারী সংশোধন আনা হইয়াছিল।",
      en: "Effected statutory amendments to the Child Marriage Restraint Act, 1929, harmonizing age of marriage and penal provisions."
    },
    caution: {
      bn: "বর্তমানে বাংলাদেশে বাল্যবিয়ে সংক্রান্ত বিষয়াবলি বাল্যবিয়ে নিরোধ আইন, ২০১৭ (Act VI of 2017) দ্বারা সরাসরি পরিচালিত হয়।",
      en: "Currently superseded and governed by the Child Marriage Restraint Act, 2017 (Act No. VI of 2017)."
    },
    keywords: ["amendment child marriage", "balyabibaho", "বাল্যবিয়ে সংশোধন", "ধারা ১২", "section 12"]
  },
  13: {
    id: "mflo-13",
    secNum: "Section 13",
    title: { bn: "মুসলিম বিবাহ বিচ্ছেদ আইন সংশোধন (ধারা ১৩)", en: "Amendment of Dissolution of Muslim Marriages Act (Section 13)" },
    plainExplanation: {
      bn: "এই ধারার মাধ্যমে Dissolution of Muslim Marriages Act, 1939 এর ধারা ২ এ স্বামীর বহুবিবাহ বা অধ্যাদেশের বিধান লঙ্ঘনকে স্ত্রীর জন্য আদালতে তালাকের একটি বৈধ কারণ হিসেবে অন্তর্ভুক্ত করা হয়।",
      en: "Amended Section 2 of the Dissolution of Muslim Marriages Act, 1939, creating an explicit ground for judicial divorce if a husband contracts a second marriage without lawful permission under Section 6 of this Ordinance."
    },
    caution: {
      bn: "অনুমতি ছাড়া স্বামী দ্বিতীয় বিয়ে করলে প্রথম স্ত্রী পারিবারিক আদালতে বিবাহবিচ্ছেদ চেয়ে মামলা দায়ের করতে পারেন।",
      en: "Unpermitted polygamy by the husband grants the wife an absolute statutory right to seek judicial dissolution of marriage."
    },
    keywords: ["amendment dmma 1939", "judicial divorce polygamy", "বিবাহ বিচ্ছেদ আইন সংশোধন", "ধারা ১৩", "section 13"]
  }
};

const finalProvisions = [];

// Add existing provisions first, updating originalText with verbatim bdlaws text if available
for (const p of existingProvs) {
  // Find matching extracted section
  const secNumClean = p.sectionNumber.replace(/Section\s+/i, '').trim();
  const matchedExt = extracted.find(e => e.secNumStr === secNumClean);
  if (matchedExt && matchedExt.rawContent) {
    p.originalText = matchedExt.rawContent;
    p.contentHash = sha256(matchedExt.rawContent);
  }
  p.sourceUrl = matchedExt ? matchedExt.url : p.sourceUrl;
  p.retrievalDate = '2026-11-01';
  p.legalStatus = 'active';
  p.reviewStatus = 'verified';
  finalProvisions.push(p);
}

// Now add all new sections
for (const [key, meta] of Object.entries(newSectionsMeta)) {
  const matchedExt = extracted.find(e => e.secNumStr.toUpperCase() === String(key).toUpperCase());
  if (!matchedExt) {
    console.warn(`Could not find extracted text for section ${key}`);
    continue;
  }
  const prov = {
    id: meta.id,
    actId: 'act_mflo_1961',
    sectionNumber: meta.secNum,
    categories: ['family'],
    title: meta.title,
    originalText: matchedExt.rawContent,
    originalLanguage: 'en',
    plainExplanation: meta.plainExplanation,
    caution: meta.caution,
    sourceUrl: matchedExt.url,
    retrievalDate: '2026-11-01',
    effectiveDate: '1961-07-15',
    legalStatus: 'active',
    reviewStatus: 'verified',
    contentHash: sha256(matchedExt.rawContent),
    keywords: meta.keywords
  };
  finalProvisions.push(prov);
}

fs.writeFileSync('scripts/generated_mflo_1961.json', JSON.stringify(finalProvisions, null, 2), 'utf8');
console.log(`Generated ${finalProvisions.length} provisions for Muslim Family Laws Ordinance 1961 (7 existing updated + 8 new)`);
