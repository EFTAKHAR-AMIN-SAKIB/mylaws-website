import fs from 'fs';

const rawExtracted = JSON.parse(fs.readFileSync('scripts/raw_extracted_36.json', 'utf8'));

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

const sraMeta = {
  "1": {
    secNum: "Section 1",
    id: "sra-1",
    enTitle: "Short Title, Local Extent, and Commencement",
    bnTitle: "সংক্ষিপ্ত শিরোনাম, ভৌগোলিক বিস্তৃতি ও প্রবর্তন",
    enExp: "Names the statute as the Specific Relief Act, 1877 (Act No. I of 1877), extends to the whole of Bangladesh, and took effect on 1 May 1877.",
    bnExp: "এই আইনটি 'সুনির্দিষ্ট প্রতিকার আইন, ১৮৭৭' নামে অভিহিত, সমগ্র বাংলাদেশে প্রযোজ্য এবং ১৮৭৭ সালের ১ মে তারিখে কার্যকর হয়।",
    enCaution: "Foundational procedural statute governing civil remedies for property recovery, contract enforcement, and injunctions.",
    bnCaution: "দেওয়ানি আদালতে সম্পত্তি পুনরুদ্ধার, চুক্তি কার্যকরীকরণ ও নিষেধাজ্ঞার মৌলিক কার্যপদ্ধতি নির্ধারণকারী প্রারম্ভিক বিধান।",
    keywords: ["specific relief act 1877", "sra section 1", "shunirdishto protikar ain", "সুনির্দিষ্ট প্রতিকার আইন", "ধারা ১"]
  },
  "3": {
    secNum: "Section 3",
    id: "sra-3",
    enTitle: "Interpretation Clause and Definition of Trust",
    bnTitle: "ব্যাখ্যামূলক ধারা ও ট্রাস্টের সংজ্ঞা",
    enExp: "Defines legal terms under the Act including 'obligation' (every duty enforceable by law), 'trust', 'trustee', and adopts definitions from the Contract Act 1872.",
    bnExp: "এই আইনে ব্যবহৃত বাধ্যবাধকতা (Obligation), ট্রাস্ট, ট্রাস্টি এবং চুক্তি আইন ১৮৭২-এর পারিভাষিক সংজ্ঞার বিধিবদ্ধ অন্তর্ভুক্তি।",
    enCaution: "Obligation encompasses both contractual duties and non-contractual legal duties enforceable in civil courts.",
    bnCaution: "আইনি বাধ্যবাধকতা শুধুমাত্র চুক্তি নয়, বরং দেওয়ানি আদালতে কার্যকরযোগ্য যেকোনো আইনানুগ দায়িত্বকে অন্তর্ভুক্ত করে।",
    keywords: ["interpretation clause sra", "definition obligation trust", "shongga", "ব্যাখ্যা ট্রাস্ট সংজ্ঞা", "ধারা ৩"]
  },
  "4": {
    secNum: "Section 4",
    id: "sra-4",
    enTitle: "Savings of Other Rights and Remedies",
    bnTitle: "অন্যান্য অধিকার ও প্রতিকারের হেফাজত",
    enExp: "Preserves any other right to relief, any remedy available under contract, or the operation of the Registration Act.",
    bnExp: "চুক্তি বা প্রচলিত অন্য কোনো আইনের অধীন লভ্য প্রতিকার এবং রেজিস্ট্রেশন আইনের কার্যকারিতা এই আইনের কারণে ব্যাহত হবে না।",
    enCaution: "Does not bar standard damages suits or common law remedies in contract or tort.",
    bnCaution: "সুনির্দিষ্ট প্রতিকার না চাইলেও সাধারণ ক্ষতিপূরণের দেওয়ানি মামলা দায়েরের অধিকার সুরক্ষিত থাকে।",
    keywords: ["sra savings", "registration act preservation", "chukti protikar hefazot", "হেফাজত", "ধারা ৪"]
  },
  "5": {
    secNum: "Section 5",
    id: "sra-5",
    enTitle: "Modes of Granting Specific Relief",
    bnTitle: "সুনির্দিষ্ট প্রতিকার প্রদানের পদ্ধতি",
    enExp: "Specifies the five statutory modes of granting specific relief: taking possession, ordering performance, preventing wrongful acts, declaring status, or appointing a receiver.",
    bnExp: "আদালত কর্তৃক সুনির্দিষ্ট প্রতিকার দেওয়ার ৫টি পদ্ধতি: দখল গ্রহণ ও হস্তান্তর, কার্য সম্পাদনের নির্দেশ, বারণ বা নিষেধাজ্ঞা, স্বত্ব ঘোষণা এবং রিসিভার নিয়োগ।",
    enCaution: "Specific relief is an equitable remedy granted strictly within the judicial discretion of civil courts.",
    bnCaution: "সুনির্দিষ্ট প্রতিকার আদালত ন্যায়পরতার নীতিতে (Equity) প্রদান করেন; এটি কোনো স্বয়ংক্রিয় বা অযৌক্তিক অধিকার নয়।",
    keywords: ["specific relief how given", "modes of specific relief", "protikarer poddhoti", "প্রতিকার প্রদানের পদ্ধতি", "ধারা ৫"]
  },
  "6": {
    secNum: "Section 6",
    id: "sra-6",
    enTitle: "Preventive Relief Defined",
    bnTitle: "নিবারক প্রতিকারের সংজ্ঞা",
    enExp: "Defines preventive relief as relief granted by preventing a party from doing that which he is under an obligation not to do (injunctions).",
    bnExp: "কোনো পক্ষকে আইনত যা করা নিষিদ্ধ তা করা থেকে বিরত রাখার মাধ্যমে আদালত যে প্রতিকার দেন তাকে নিবারক প্রতিকার বা নিষেধাজ্ঞা বলে।",
    enCaution: "Granted in the form of temporary, perpetual, or mandatory injunctions under Part III of this Act.",
    bnCaution: "নিবারক প্রতিকার অস্থায়ী বা স্থায়ী নিষেধাজ্ঞার ডিক্রির মাধ্যমে মঞ্জুর করা হয়।",
    keywords: ["preventive relief sra", "injunction definition", "nibrok protikar", "নিবারক প্রতিকার", "ধারা ৬"]
  },
  "7": {
    secNum: "Section 7",
    id: "sra-7",
    enTitle: "Specific Relief Not Granted to Enforce Penal Law",
    bnTitle: "দণ্ডবিধিমূলক আইন কার্যকরের জন্য সুনির্দিষ্ট প্রতিকার নিষিদ্ধ",
    enExp: "Expressly bars civil courts from granting specific relief for the mere purpose of enforcing a penal law.",
    bnExp: "কোনো ফৌজদারি বা দণ্ডমূলক বিধান কেবল কার্যকর করার উদ্দেশ্যে দেওয়ানি আদালত সুনির্দিষ্ট প্রতিকার দিতে পারবে না।",
    enCaution: "Civil suits cannot be filed solely to obtain criminal punishment or police enforcement without an underlying civil right.",
    bnCaution: "দেওয়ানি স্বত্ব বা অধিকার লঙ্ঘন ছাড়া কেবল ফৌজদারি অপরাধ প্রমাণের জন্য দেওয়ানি মামলা চলে না।",
    keywords: ["penal law enforcement bar", "civil court penal bar", "dondobidhi proborton bar", "দণ্ড আইন কার্যকরে বাধা", "ধারা ৭"]
  },
  "8": {
    secNum: "Section 8",
    id: "sra-8",
    enTitle: "Recovery of Specific Immoveable Property Based on Title",
    bnTitle: "স্বত্বসহ সুনির্দিষ্ট স্থাবর সম্পত্তির দখল পুনরুদ্ধার",
    enExp: "Authorizes a person entitled to the possession of specific immovable property to recover it in the manner prescribed by the Code of Civil Procedure (CPC) based on title.",
    bnExp: "মালিকানা স্বত্বের অধিকারী ব্যক্তি সিপিসির বিধান অনুযায়ী উপযুক্ত দেওয়ানি আদালতে স্বত্ব সাব্যস্তপূর্বক জমির দখল পুনরুদ্ধারের মামলা করতে পারেন।",
    enCaution: "Limitation is strictly 12 years under Articles 142 and 144 of the Limitation Act, 1908. Requires payment of ad valorem court fees based on valuation.",
    bnCaution: "তামাদি আইন ১৯০৮-এর ১৪২ ও ১৪৪ অনুচ্ছেদ অনুযায়ী মামলা দায়েরের তামাদির মেয়াদ ১২ বছর। সম্পত্তির মূল্যের ওপর অ্যাডভ্যালোরেম কোর্ট ফি পরিশোধ বাধ্যতামূলক।",
    keywords: ["recovery of immovable property", "section 8 sra", "title suit 12 years", "jomir shotto dokhol", "ধারা ৮", "দখল পুনরুদ্ধার ১২ বছর"]
  },
  "9": {
    secNum: "Section 9",
    id: "sra-9",
    enTitle: "Suit by Person Dispossessed of Immoveable Property Without Consent",
    bnTitle: "স্থাবর সম্পত্তি থেকে অবৈধভাবে বেদখল ব্যক্তির দখল পুনরুদ্ধারের মামলা",
    enExp: "Provides a summary civil remedy allowing any person dispossessed without consent otherwise than in due course of law to recover possession without proving title.",
    bnExp: "আইনবহির্ভূতভাবে বা বিনা সম্মতিতে জোরপূর্বক বেদখলকৃত ব্যক্তি মালিকানা প্রমাণ না করেই কেবল পূর্ববর্তী দখল প্রমাণের মাধ্যমে দখল ফিরে পাওয়ার সংক্ষিপ্ত মামলা করতে পারেন।",
    enCaution: "Limitation is strictly 6 months from dispossession under Article 3 of the Limitation Act, 1908. Court fee is half of ad valorem. No suit lies against Government; no appeal or review lies from order/decree.",
    bnCaution: "বেদখল হওয়ার তারিখ থেকে অনধিক ৬ মাসের মধ্যে মামলা করতে হবে (তামাদি আইনের ৩ অনুচ্ছেদ)। সরকারের বিরুদ্ধে এই ধারায় মামলা চলে না। আদেশের বিরুদ্ধে আপিল বা রিভিউ নেই, কেবল সিভিল রিভিশন (Section 115 CPC) চলে।",
    keywords: ["summary possession suit", "section 9 sra", "6 months dispossession", "bedokhol mamla 6 mash", "ধারা ৯", "বেদখল ৬ মাস"]
  },
  "10": {
    secNum: "Section 10",
    id: "sra-10",
    enTitle: "Recovery of Specific Moveable Property",
    bnTitle: "সুনির্দিষ্ট অস্থাবর সম্পত্তির দখল পুনরুদ্ধার",
    enExp: "Permits a person entitled to the immediate possession of specific moveable property (goods, chattels, vehicles, machinery) to recover it in the manner prescribed by the CPC.",
    bnExp: "সুনির্দিষ্ট কোনো অস্থাবর সম্পত্তি (যানবাহন, যন্ত্রপাতি, মালামাল) পাওয়ার অধিকারী ব্যক্তি দেওয়ানি কার্যবিধির নিয়মে তা উদ্ধারের মামলা করতে পারেন।",
    enCaution: "Limitation is 3 years from the date of wrongful taking or detention under Articles 48 and 49 of the Limitation Act, 1908.",
    bnCaution: "মালামাল অবৈধভাবে আটকে রাখার তারিখ থেকে ৩ বছরের মধ্যে মামলা করতে হবে (তামাদি আইনের ৪৮ ও ৪৯ অনুচ্ছেদ)।",
    keywords: ["recovery moveable property", "osthabor shompotti uddhar", "section 10 sra", "অস্থাবর সম্পত্তি উদ্ধার", "ধারা ১০"]
  },
  "11": {
    secNum: "Section 11",
    id: "sra-11",
    enTitle: "Liability of Person in Possession, Not as Owner, to Deliver to Entitled Person",
    bnTitle: "মালিক ছাড়া অন্য কোনো দখলদার কর্তৃক হকদারের নিকট অস্থাবর সম্পত্তি হস্তান্তরের বাধ্যবাধকতা",
    enExp: "Compels a person having possession of a specific moveable article (as trustee, agent, or bailee) to deliver it immediately to the person entitled to immediate possession.",
    bnExp: "যে ব্যক্তি প্রকৃত মালিক না হয়ে কোনো অস্থাবর মালামালের দখলে রয়েছে (যেমন এজেন্ট, আমানতদার), হকদার চাইলে সে তা হস্তান্তর করতে বাধ্য।",
    enCaution: "Applicable where money compensation is inadequate or damages cannot be ascertained, or the article has sentimental/unique value.",
    bnCaution: "টাকা দিয়ে ক্ষতিপূরণ সম্ভব না হলে বা বস্তুটি দুষ্প্রাপ্য/অনন্য হলে এই ধারায় সরাসরি হস্তান্তর আদেশ চাওয়া যায়।",
    keywords: ["delivery of moveable article", "bailee delivery", "amanotdar mal ferot", "অস্থাবর বস্তু প্রত্যর্পণ", "ধারা ১১"]
  },
  "12": {
    secNum: "Section 12",
    id: "sra-12",
    enTitle: "Cases in Which Specific Performance of Contracts is Enforceable",
    bnTitle: "যেসব ক্ষেত্রে চুক্তির সুনির্দিষ্ট কার্যসম্পাদন বলবতযোগ্য",
    enExp: "Empowers the court to enforce specific performance of a contract when the act agreed upon is in performance of a trust, when no standard exists for ascertaining actual damage, or when pecuniary compensation cannot afford adequate relief.",
    bnExp: "স্থাবর সম্পত্তি বিক্রয়ের চুক্তি বা যেখানে আর্থিক ক্ষতিপূরণ পর্যাপ্ত নয়, সেখানে আদালত চুক্তির শর্ত অনুযায়ী সরাসরি জমি রেজিস্ট্রির নির্দেশ দিতে পারেন।",
    enCaution: "Limitation is strictly 1 year from the date fixed for performance, or from date of refusal under Article 113 of the Limitation Act, 1908. In Bangladesh, contracts for sale of land must be registered (Sec 21A).",
    bnCaution: "চুক্তি কার্যসম্পাদনের নির্দিষ্ট তারিখ বা অস্বীকৃতির তারিখ থেকে ১ বছরের মধ্যে মামলা করতে হবে (তামাদি আইনের ১১৩ অনুচ্ছেদ)। জমি বিক্রির চুক্তি হলে তা অবশ্যই রেজিস্ট্রিকৃত বায়নাপত্র হতে হবে (ধারা ২১ক)।",
    keywords: ["specific performance of contract", "section 12 sra", "bayna chukti mamla", "চুক্তি প্রবল মামলা", "ধারা ১২", "১ বছর তামাদি"]
  },
  "13": {
    secNum: "Section 13",
    id: "sra-13",
    enTitle: "Contract of Which the Subject Has Partially Ceased to Exist",
    bnTitle: "যে চুক্তির বিষয়বস্তুর আংশিক বিলুপ্তি ঘটিয়াছে",
    enExp: "Provides that specific performance may be enforced even if the subject matter has partially ceased to exist after execution but before performance, without fault of either party.",
    bnExp: "চুক্তি সম্পাদনের পর এবং কার্যকর হওয়ার পূর্বে চুক্তির বিষয়বস্তুর আংশিক ধ্বংস বা ক্ষতি হলেও অবশিষ্ট অংশের চুক্তি বলবত করা যায়।",
    enCaution: "Does not apply if the contract becomes wholly impossible of performance (frustrated under Contract Act Sec 56).",
    bnCaution: "সম্পূর্ণ বিষয়বস্তু ধ্বংস হয়ে চুক্তি অসম্ভব হয়ে পড়লে সুনির্দিষ্ট কার্যসম্পাদন ডিক্রি দেওয়া যায় না।",
    keywords: ["partial cessation of subject", "chuktir bishoybostu khoti", "partial contract enforcement", "আংশিক বিলুপ্তি", "ধারা ১৩"]
  },
  "14": {
    secNum: "Section 14",
    id: "sra-14",
    enTitle: "Specific Performance Where Part Unperformed is Small",
    bnTitle: "চুক্তির যে অংশ অসম্পাদিত তা সামান্য হইলে সুনির্দিষ্ট কার্যসম্পাদন",
    enExp: "Allows the court to decree specific performance where a party is unable to perform the whole, but the part left unperformed bears only a small proportion to the whole and admits of compensation in money.",
    bnExp: "চুক্তির অসম্পাদিত অংশ যদি মোট চুক্তির তুলনায় খুব সামান্য হয় এবং টাকায় ক্ষতিপূরণযোগ্য হয়, তবে আদালত অবশিষ্ট চুক্তি কার্যসম্পাদন ও ক্ষতিপূরণের ডিক্রি দিতে পারেন।",
    enCaution: "Compensation is deducted from the purchase price for the unperformed fractional portion.",
    bnCaution: "অসম্পাদিত অংশের জন্য নির্ধারিত মূল্য আনুপাতিক হারে কর্তন করা হয়।",
    keywords: ["small unperformed part", "samanno oshomprowto", "proportional compensation", "সামান্য অসম্পাদিত অংশ", "ধারা ১৪"]
  },
  "15": {
    secNum: "Section 15",
    id: "sra-15",
    enTitle: "Specific Performance Where Part Unperformed is Large",
    bnTitle: "চুক্তির যে অংশ অসম্পাদিত তা বৃহৎ হইলে সুনির্দিষ্ট কার্যসম্পাদন",
    enExp: "Governs cases where the unperformed part is large: the defaulting party cannot obtain performance, but the other party can obtain performance of the possible portion if he relinquishes all claims to compensation.",
    bnExp: "চুক্তির বড় অংশ অসম্পাদিত থাকলে ক্রেতা চাইলে ক্ষতিপূরণের দাবি ত্যাগ করে বিক্রেতার নিয়ন্ত্রণাধীন অংশের জন্য চুক্তি কার্যকর করাতে পারেন।",
    enCaution: "Plaintiff must expressly abandon all claims for further performance and all rights to compensation for the deficiency.",
    bnCaution: "বাদীকে অবশিষ্ট অংশের ক্ষতিপূরণ বা ভবিষ্যৎ দাবির অধিকার সুস্পষ্টভাবে পরিত্যাগ করতে হয়।",
    keywords: ["large unperformed part", "brihot oshomprowto", "abandoning compensation", "বৃহৎ অসম্পাদিত অংশ", "ধারা ১৫"]
  },
  "16": {
    secNum: "Section 16",
    id: "sra-16",
    enTitle: "Specific Performance of Independent Part of Contract",
    bnTitle: "চুক্তির স্বাধীন পৃথক অংশের সুনির্দিষ্ট কার্যসম্পাদন",
    enExp: "Allows specific performance of a separate and independent part of a contract that stands on a complete separate footing from another part that cannot be specifically performed.",
    bnExp: "চুক্তির কোনো অংশ যদি অন্য অংশ থেকে সম্পূর্ণ স্বাধীন ও পৃথক হয়, তবে আদালত সেই পৃথক অংশের সুনির্দিষ্ট কার্যসম্পাদনের নির্দেশ দিতে পারেন।",
    enCaution: "The contract must be severable into distinctly separate independent transactions.",
    bnCaution: "চুক্তিটি পৃথকীকরণযোগ্য (Severable) না হলে আদালত একক চুক্তির খণ্ডিতাংশ কার্যকর করেন না।",
    keywords: ["independent part of contract", "prithok chukti ongsho", "severable contract", "স্বাধীন পৃথক অংশ", "ধারা ১৬"]
  },
  "17": {
    secNum: "Section 17",
    id: "sra-17",
    enTitle: "Bar to Specific Performance of Part of Contract",
    bnTitle: "চুক্তির আংশিক সুনির্দিষ্ট কার্যসম্পাদনের সাধারণ নিষেধ",
    enExp: "Enacts the general rule that the court shall not direct the specific performance of a part of a contract except in cases provided by Sections 14, 15, and 16.",
    bnExp: "ধারা ১৪, ১৫ ও ১৬-এর সুনির্দিষ্ট ব্যতিক্রম ছাড়া আদালত কোনো চুক্তির আংশিক কার্যসম্পাদনের ডিক্রি দিতে পারেন না।",
    enCaution: "Contracts must ordinarily be enforced as an indivisible integrated whole.",
    bnCaution: "চুক্তি সাধারণত সমগ্র ও অবিভাজ্য হিসেবে কার্যকর করতে হয়।",
    keywords: ["bar to partial performance", "angshik chukti nishedh", "indivisible contract", "আংশিক কার্যসম্পাদনে বাধা", "ধারা ১৭"]
  },
  "18": {
    secNum: "Section 18",
    id: "sra-18",
    enTitle: "Purchaser's Rights Against Vendor with Imperfect Title",
    bnTitle: "ত্রুটিপূর্ণ স্বত্ববিশিষ্ট বিক্রেতার বিরুদ্ধে ক্রেতার অধিকার",
    enExp: "Protects a purchaser where the vendor had an imperfect title at contracting but subsequently acquires interest, or where vendor can procure concurrence of other persons or clear encumbrances.",
    bnExp: "চুক্তিকালে বিক্রেতার স্বত্বে ত্রুটি থাকলে কিন্তু পরবর্তীতে সে স্বত্ব অর্জন করলে বা দায়মুক্ত করতে সক্ষম হলে ক্রেতা চুক্তি কার্যকর করাতে পারেন।",
    enCaution: "Also entitles purchaser to return of deposit with interest and costs if suit for specific performance fails.",
    bnCaution: "চুক্তি অসম্ভব হলে ক্রেতা তার দেওয়া অগ্রিম অর্থ (বায়না) সুদ ও খরচসহ ফেরত পাওয়ার অধিকারী।",
    keywords: ["purchaser rights imperfect title", "trutipurno shotto bikreta", "feeding the estoppel", "ত্রুটিপূর্ণ স্বত্ব", "ধারা ১৮"]
  },
  "19": {
    secNum: "Section 19",
    id: "sra-19",
    enTitle: "Power to Award Compensation in Certain Cases",
    bnTitle: "কতিপয় ক্ষেত্রে ক্ষতিপূরণ মঞ্জুরির ক্ষমতা",
    enExp: "Empowers a plaintiff suing for specific performance to also claim compensation for breach, either in addition to or in substitution for such performance.",
    bnExp: "চুক্তি কার্যসম্পাদনের মামলার সাথে বিকল্প বা অতিরিক্ত প্রতিকার হিসেবে ক্ষতিপূরণ দাবি করা যায় এবং আদালত ক্ষতিপূরণ মঞ্জুর করতে পারেন।",
    enCaution: "Compensation cannot be awarded unless the plaintiff has specifically prayed for it in the plaint (can be amended with leave).",
    bnCaution: "আরজিতে সুস্পষ্টভাবে ক্ষতিপূরণের বিকল্প বা অতিরিক্ত প্রার্থনা না থাকলে আদালত ক্ষতিপূরণ দিতে পারেন না।",
    keywords: ["compensation in specific performance", "chukti bhonge khotipuron", "damages in lieu", "ক্ষতিপূরণ মঞ্জুরি", "ধারা ১৯"]
  },
  "20": {
    secNum: "Section 20",
    id: "sra-20",
    enTitle: "Liquidation of Damages Not a Bar to Specific Performance",
    bnTitle: "চুক্তিতে জরিমানার অঙ্ক নির্দিষ্ট থাকা সত্ত্বেও সুনির্দিষ্ট কার্যসম্পাদনে বাধা নয়",
    enExp: "Provides that naming a specified sum in the contract as liquidated damages or penalty for breach does not bar the court from decreeing specific performance if performance was intended.",
    bnExp: "চুক্তিতে বরখেলাপের জরিমানা বা ক্ষতিপূরণের টাকা নির্দিষ্ট থাকলেও আদালত চুক্তি সুনির্দিষ্ট কার্যসম্পাদনের ডিক্রি দিতে পারেন।",
    enCaution: "Defendant cannot simply choose to pay the penalty and evade property conveyance if the agreement intended conveyance.",
    bnCaution: "বিবাদী কেবল জরিমানার টাকা দিয়ে জমি রেজিস্ট্রি না করে পার পেতে পারে না যদি চুক্তির মূল উদ্দেশ্য জমি হস্তান্তর হয়ে থাকে।",
    keywords: ["liquidated damages not a bar", "penalty clause sra", "chuktir jorimana", "নির্দিষ্ট ক্ষতিপূরণ বাধা নয়", "ধারা ২০"]
  },
  "21": {
    secNum: "Section 21",
    id: "sra-21",
    enTitle: "Contracts Not Specifically Enforceable",
    bnTitle: "যেসব চুক্তি সুনির্দিষ্টভাবে কার্যকর করা যায় না",
    enExp: "Specifies 8 classes of contracts that cannot be specifically enforced (e.g., contracts where compensation in money is adequate, contracts running into minute details, personal service contracts, revocable contracts).",
    bnExp: "৮ শ্রেণির চুক্তি সুনির্দিষ্টভাবে বলবত করা যায় না; যেমন ব্যক্তিগত দক্ষতার চাকরি, যে চুক্তিতে টাকা ক্ষতিপূরণই যথেষ্ট, বা যা প্রতিনিয়ত তদারকি সাপেক্ষ।",
    enCaution: "Personal employment contracts cannot be specifically enforced; remedy lies in damages under Contract Act.",
    bnCaution: "চাকরির চুক্তি বা ব্যক্তিগত সেবামূলক চুক্তি বলবত করতে এই ধারায় মামলা চলে না; প্রতিকার কেবল আর্থিক ক্ষতিপূরণ।",
    keywords: ["contracts not specifically enforceable", "section 21 sra", "personal service contract", "অকার্যকরযোগ্য চুক্তি", "ধারা ২১"]
  },
  "21A": {
    secNum: "Section 21A",
    id: "sra-21a",
    enTitle: "Unregistered Contract for Sale Not Specifically Enforceable",
    bnTitle: "অনিবন্ধিত বিক্রয় চুক্তি সুনির্দিষ্টভাবে কার্যকরযোগ্য নহে",
    enExp: "Mandates that no contract for sale of specific immovable property can be specifically enforced unless it is in writing and registered under the Registration Act 1908, and suit filed within limitation.",
    bnExp: "স্থাবর সম্পত্তি বিক্রয়ের কোনো বায়না চুক্তি লিখিত ও রেজিস্ট্রেশন আইন ১৯০৮ অনুযায়ী নিবন্ধিত না হলে আদালত তা কার্যকরের কোনো ডিক্রি দিতে পারবেন না।",
    enCaution: "Crucial Bangladesh land law rule: 300 taka stamp unregistered agreements are completely unenforceable for land transfer. Suit must also be filed within 1 year from execution/stipulated date.",
    bnCaution: "বাংলাদেশে ৩০০ টাকার নন-জুডিশিয়াল স্ট্যাম্পে অপ্রমাণিত বায়না দলিল দিয়ে জমি রেজিস্ট্রি করানোর কোনো মামলা চলে না। বায়না দলিল অবশ্যই রেজিস্ট্রি হতে হবে।",
    keywords: ["unregistered contract not enforceable", "section 21a sra", "registered baynanama mandatory", "অনিবন্ধিত বায়না নিষিদ্ধ", "ধারা ২১ক", "রেজিস্ট্রি বায়না"]
  },
  "22": {
    secNum: "Section 22",
    id: "sra-22",
    enTitle: "Discretion as to Decreeing Specific Performance",
    bnTitle: "সুনির্দিষ্ট কার্যসম্পাদনের ডিক্রি প্রদানে আদালতের সুবিবেচনামূলক এখতিয়ার",
    enExp: "Affirms that the jurisdiction to decree specific performance is discretionary, guided by sound and reasonable judicial principles, not arbitrary; court is not bound to grant relief merely because it is lawful.",
    bnExp: "সুনির্দিষ্ট কার্যসম্পাদন আদালতের সুবিবেচনামূলক অধিকার; কেবল আইনসম্মত বলেই আদালত অন্ধভাবে ডিক্রি দিতে বাধ্য নন, ন্যায়পরতা ও ন্যায্যতা বিবেচনা করা হয়।",
    enCaution: "Relief will be refused where plaintiff gains an unfair advantage or performance involves unforeseen extreme hardship to defendant.",
    bnCaution: "বাদী অসদুপায়ে অন্যায্য সুবিধা নিলে বা বিবাদীর ওপর মারাত্মক অপ্রত্যক্ষ ক্ষতি চাপলে আদালত ডিক্রি প্রত্যাখ্যান করতে পারেন।",
    keywords: ["discretion of court sra", "judicial discretion specific relief", "subibechona khomota", "আদালতের সুবিবেচনা", "ধারা ২২"]
  },
  "23": {
    secNum: "Section 23",
    id: "sra-23",
    enTitle: "Who May Obtain Specific Performance",
    bnTitle: "যাহারা সুনির্দিষ্ট কার্যসম্পাদন পাইতে পারেন",
    enExp: "Lists persons who can obtain specific performance: any party to the contract, representative in interest, principal, persons entitled in family settlements, or remainder-men.",
    bnExp: "চুক্তির যেকোনো পক্ষ, তার বৈধ ওয়ারিশ, প্রতিনিধি, বা পারিবারিক আপোষ নিষ্পত্তির সুবিধাভোগী চুক্তির সুনির্দিষ্ট কার্যসম্পাদন চাইতে পারেন।",
    enCaution: "Representatives cannot enforce if personal skill or capacity was the essential ingredient of the contract.",
    bnCaution: "চুক্তিটি যদি ব্যক্তির বিশেষ দক্ষতার ওপর নির্ভরশীল হয়, তবে তার প্রতিনিধির পক্ষে তা কার্যকর করা যায় না।",
    keywords: ["who may obtain performance", "kar chukti probol odhikar", "parties entitled to relief", "কারা প্রতিকার পাবেন", "ধারা ২৩"]
  },
  "24": {
    secNum: "Section 24",
    id: "sra-24",
    enTitle: "Personal Bars to the Relief",
    bnTitle: "প্রতিকার প্রাপ্তির ব্যক্তিগত বাধা",
    enExp: "Bars specific performance in favor of a person who has become incapable of performing, violates essential terms, acts fraudulently, or deliberately subverts the agreement.",
    bnExp: "যে ব্যক্তি নিজে চুক্তির মৌলিক শর্ত ভঙ্গ করেছে, প্রতারণা করেছে বা কার্যসম্পাদনে অসমর্থ হয়ে পড়েছে, সে সুনির্দিষ্ট প্রতিকার পেতে পারে না।",
    enCaution: "He who comes to equity must come with clean hands; plaintiff must aver readiness and willingness to perform his part.",
    bnCaution: "বাদীকে প্রমাণ করতে হবে যে সে চুক্তির নিজের অংশ পালনে সর্বদা প্রস্তুত ও ইচ্ছুক (Ready and willing) ছিল।",
    keywords: ["personal bars to relief", "clean hands equity", "ready and willing to perform", "ব্যক্তিগত বাধা", "ধারা ২৪"]
  },
  "25": {
    secNum: "Section 25",
    id: "sra-25",
    enTitle: "Contracts to Sell Property by One Who Has No Title",
    bnTitle: "স্বত্বহীন ব্যক্তি কর্তৃক সম্পত্তি বিক্রয়ের চুক্তি কার্যকর না হওয়া",
    enExp: "Bars a vendor from enforcing a contract of sale if he has no title to the property, or cannot give the purchaser a title free from reasonable doubt.",
    bnExp: "বিক্রেতার যদি জমিতে কোনো বৈধ মালিকানা না থাকে বা সে যদি যুক্তিসঙ্গত সন্দেহমুক্ত নির্ভেজাল স্বত্ব দিতে ব্যর্থ হয়, তবে সে চুক্তি বলবত করাতে পারবে না।",
    enCaution: "Purchaser cannot be forced to accept a defective, encumbered, or litigious property title.",
    bnCaution: "ক্রেতাকে কোনো অবস্থাতেই বিরোধপূর্ণ বা ত্রুটিযুক্ত মালিকানার জমি গ্রহণে বাধ্য করা যাবে না।",
    keywords: ["no title contract sale", "title free from reasonable doubt", "shottohin bikreta", "স্বত্বহীন চুক্তি", "ধারা ২৫"]
  },
  "26": {
    secNum: "Section 26",
    id: "sra-26",
    enTitle: "Non-Enforcement Except with Variation",
    bnTitle: "পরিবর্তন বা রূপান্তর ব্যতীত চুক্তি কার্যকর না হওয়া",
    enExp: "Provides that where fraud, mistake, or misrepresentation occurred, the plaintiff cannot obtain specific performance without admitting the variation set up by the defendant.",
    bnExp: "চুক্তিতে ভুল বা প্রতারণার কারণে বিবাদী যে সংশোধিত রূপ বা শর্ত প্রমাণ করে, তা স্বীকার না করে বাদী চুক্তি কার্যকর করাতে পারে না।",
    enCaution: "Protects defendants from being trapped into enforcement of terms contrary to their true mutual understanding.",
    bnCaution: "বিবাদীর সাথে হওয়া প্রকৃত সম্মতির বিপরীত শর্তে একতরফা চুক্তি কার্যকর করা আদালত রোধ করেন।",
    keywords: ["non-enforcement with variation", "chuktir poriborton", "mistake in contract terms", "পরিবর্তনসহ কার্যকর", "ধারা ২৬"]
  },
  "27": {
    secNum: "Section 27",
    id: "sra-27",
    enTitle: "Relief Against Parties and Persons Claiming Under Subsequent Title",
    bnTitle: "চুক্তির পক্ষ এবং পরবর্তী স্বত্ব দাবিদারদের বিরুদ্ধে প্রতিকার",
    enExp: "Enforces specific performance against either party, or any person claiming under him by a title arising subsequently to the contract, EXCEPT a transferee for value who has paid money in good faith and without notice of the original contract.",
    bnExp: "বায়না করার পর বিক্রেতা অন্য কারো কাছে জমি বিক্রি করে দিলেও সেই তৃতীয় ব্যক্তির বিরুদ্ধে চুক্তি বলবত করা যায়, যদি না সে সরল বিশ্বাসে টাকা দিয়ে না জেনে কিনে থাকে।",
    enCaution: "Bona fide purchaser for value without notice is protected. Notice includes registration, actual notice, or constructive notice (possession).",
    bnCaution: "সরল বিশ্বাসে না জেনে ক্রয়কারী ব্যক্তি (Bona fide purchaser without notice) রক্ষিত হন; তবে দখল বা পূর্ববর্তী রেজিস্ট্রি নোটিশ হিসেবে গণ্য হয়।",
    keywords: ["relief against subsequent purchaser", "bona fide purchaser for value", "poroborti kreta", "পরবর্তী ক্রেতার বিরুদ্ধে প্রতিকার", "ধারা ২৭"]
  },
  "27A": {
    secNum: "Section 27A",
    id: "sra-27a",
    enTitle: "Specific Performance of Contract to Lease in Part Performance",
    bnTitle: "চুক্তির আংশিক সম্পাদন সাপেক্ষে ইজারা চুক্তির সুনির্দিষ্ট কার্যসম্পাদন",
    enExp: "Authorizes specific performance of an unregistered contract to lease immoveable property where the lessee has taken possession and performed acts in furtherance of the contract.",
    bnExp: "ইজারা চুক্তির ভিত্তিতে ইজারাদার দখল গ্রহণ করে শর্ত পালন শুরু করলে আদালত সেই ইজারা চুক্তির সুনির্দিষ্ট কার্যসম্পাদন ডিক্রি দিতে পারেন।",
    enCaution: "Section 53A of Transfer of Property Act (Doctrine of Part Performance) also applies concurrently.",
    bnCaution: "সম্পত্তি হস্তান্তর আইনের ৫৩ক ধারার আংশিক কার্যসম্পাদনের নীতি এখানে সমান্তরালভাবে প্রযোজ্য।",
    keywords: ["specific performance lease", "part performance doctrine", "ijara chukti probol", "ইজারা চুক্তি কার্যকর", "ধারা ২৭ক"]
  },
  "28": {
    secNum: "Section 28",
    id: "sra-28",
    enTitle: "What Parties Cannot be Compelled to Perform",
    bnTitle: "যাহাদিগকে সুনির্দিষ্ট কার্যসম্পাদনে বাধ্য করা যায় না",
    enExp: "Bars specific performance against a party if the consideration is grossly inadequate, if consent was obtained through fraud, misrepresentation, or surprise, or by mistake of fact.",
    bnExp: "মূল্য বা পণ যদি অবিশ্বাস্যভাবে কম হয়, অথবা সম্মতি যদি প্রতারণা, ভুল বোঝাবুঝি বা বিস্ময়ের মাধ্যমে আদায় করা হয়ে থাকে, তবে তাকে চুক্তি পালনে বাধ্য করা যায় না।",
    enCaution: "Inadequacy of consideration coupled with undue influence or distress bars equitable enforcement.",
    bnCaution: "চরম কম মূল্যে জমি লিখে নেওয়ার চুক্তি থাকলে আদালত সুনির্দিষ্ট কার্যসম্পাদনের আদেশ দেন না।",
    keywords: ["what parties cannot be compelled", "inadequate consideration", "ojouthik mulyo", "বাধ্য না করার ক্ষেত্র", "ধারা ২৮"]
  },
  "29": {
    secNum: "Section 29",
    id: "sra-29",
    enTitle: "Bar of Suit for Breach After Dismissal",
    bnTitle: "মামলা খারিজের পর চুক্তিভঙ্গের ক্ষতিপূরণের মামলা নিষিদ্ধ",
    enExp: "Enacts that dismissal of a suit for specific performance bars the plaintiff's right to sue for compensation for the breach of such contract.",
    bnExp: "সুনির্দিষ্ট কার্যসম্পাদনের মামলা খারিজ হয়ে গেলে একই চুক্তিভঙ্গের ক্ষতিপূরণের দাবিতে নতুন মামলা দায়ের আইনত বারিত বা নিষিদ্ধ।",
    enCaution: "Res judicata applies; plaintiff must include all alternative claims for damages/compensation in the original suit itself.",
    bnCaution: "প্রথম মামলাতেই সুনির্দিষ্ট প্রতিকারের পাশাপাশি ক্ষতিপূরণের বিকল্প প্রার্থনা অন্তর্ভুক্ত করতে হয়; খারিজ হলে নতুন মামলা চলে না।",
    keywords: ["bar of suit after dismissal", "res judicata specific performance", "mamla kharij por bar", "খারিজের পর বাধা", "ধারা ২৯"]
  },
  "30": {
    secNum: "Section 30",
    id: "sra-30",
    enTitle: "Application to Awards and Testamentary Directions",
    bnTitle: "রোয়েদাদ এবং অসিয়তনামা নির্দেশাবলীতে প্রয়োগ",
    enExp: "Applies the provisions regarding contracts to arbitration awards and testamentary directions in wills to execute settlements.",
    bnExp: "চুক্তি কার্যসম্পাদনের এই অধ্যায়ের বিধানাবলি সালিসি রোয়েদাদ (Arbitration Award) এবং উইল বা অসিয়তের নির্দেশনার ক্ষেত্রেও সমভাবে প্রযোজ্য।",
    enCaution: "Awards filed in court or directed settlements can be specifically enforced under this Section.",
    bnCaution: "সালিসি রায় বা উইলের মাধ্যমে ঘোষিত বন্দোবস্ত কার্যকর করতে এই ধারার সহায়তা নেওয়া যায়।",
    keywords: ["awards and testamentary directions", "arbitration award enforcement", "royedad proborton", "রোয়েদাদ কার্যকর", "ধারা ৩০"]
  },
  "31": {
    secNum: "Section 31",
    id: "sra-31",
    enTitle: "When Instrument May be Rectified",
    bnTitle: "যেসব ক্ষেত্রে দলিল সংশোধন করা যায়",
    enExp: "Authorizes either party to sue to have a written contract or other instrument rectified when, through fraud or a mutual mistake of the parties, it does not truly express their intention.",
    bnExp: "প্রতারণা বা উভয় পক্ষের অনিচ্ছাকৃত ভুলের কারণে কোনো লিখিত দলিল যদি পক্ষগণের প্রকৃত উদ্দেশ্য প্রকাশে ব্যর্থ হয়, তবে দেওয়ানি আদালতে দলিল সংশোধনের মামলা করা যায়।",
    enCaution: "Limitation is 3 years from discovery of the fraud or mistake under Articles 95 and 96 of the Limitation Act, 1908. Does not affect bona fide third-party rights.",
    bnCaution: "ভুল বা প্রতারণা ধরা পড়ার তারিখ থেকে ৩ বছরের মধ্যে দলিল সংশোধনের মামলা করতে হবে (তামাদি আইনের ৯৫ ও ৯৬ অনুচ্ছেদ)। সরল বিশ্বাসে তৃতীয় ক্রেতার স্বার্থ ক্ষুণ্ণ করা যায় না।",
    keywords: ["rectification of instrument", "section 31 sra", "dalil songshodhon mamla", "দলিল সংশোধন", "ধারা ৩১", "৩ বছর তামাদি"]
  },
  "32": {
    secNum: "Section 32",
    id: "sra-32",
    enTitle: "Presumption as to Intent of Parties in Rectification",
    bnTitle: "দলিল সংশোধনে পক্ষগণের উদ্দেশ্য সম্পর্কে অনুমান",
    enExp: "Directs the court in rectifying an instrument to inquire what the instrument was intended to mean, presuming all parties intended to make an equitable and conscientious agreement.",
    bnExp: "দলিল সংশোধনের সময় আদালত তদন্ত করবেন পক্ষগণের প্রকৃত উদ্দেশ্য কী ছিল এবং ধরে নেওয়া হবে পক্ষগণ একটি ন্যায়সঙ্গত চুক্তি করতে চেয়েছিল।",
    enCaution: "The burden of proving mutual mistake or fraud is heavy and requires clear convincing parol and documentary evidence.",
    bnCaution: "দলিলের ভুল প্রমাণে সুস্পষ্ট ও জোরালো দালিলিক প্রমাণ উপস্থাপন করতে হয়।",
    keywords: ["presumption of intent", "equitable agreement presumption", "pokkhogoner uddesho", "উদ্দেশ্য অনুমান", "ধারা ৩২"]
  },
  "33": {
    secNum: "Section 33",
    id: "sra-33",
    enTitle: "Principles of Rectification",
    bnTitle: "সংশোধনের মূলনীতি",
    enExp: "Provides that the court may in its discretion rectify an instrument to ascertain its legal consequences and true meaning as intended by the parties.",
    bnExp: "দলিল সংশোধন করে পক্ষগণের পারস্পরিক দায়-দায়িত্ব ও আইনগত ফলাফল সুস্পষ্ট করার সুবিবেচনামূলক ক্ষমতা।",
    enCaution: "Court rectifies the written expression of the contract, not the original underlying oral agreement itself.",
    bnCaution: "আদালত দলিলের ত্রুটিপূর্ণ লিখিত ভাষ্য সংশোধন করেন, নতুন কোনো চুক্তি তৈরি করেন না।",
    keywords: ["principles of rectification", "songshodhoner mulniti", "court discretion rectification", "সংশোধন নীতি", "ধারা ৩৩"]
  },
  "34": {
    secNum: "Section 34",
    id: "sra-34",
    enTitle: "Specific Enforcement of Rectified Contract",
    bnTitle: "সংশোধিত চুক্তির সুনির্দিষ্ট কার্যসম্পাদন",
    enExp: "Permits a party to ask in the same suit first for rectification of the contract and secondly for its specific performance as rectified.",
    bnExp: "একই মামলায় বাদী প্রথমে দলিল সংশোধনের এবং সাথে সাথে সংশোধিত দলিলের সুনির্দিষ্ট কার্যসম্পাদনের যৌথ ডিক্রি প্রার্থনা করতে পারেন।",
    enCaution: "Both prayers must be clearly pleaded in the plaint to avoid multiple litigation.",
    bnCaution: "একই আরজিতে দলিল সংশোধন ও চুক্তি কার্যসম্পাদন উভয় প্রতিকার চাইতে হয়।",
    keywords: ["enforcement of rectified contract", "joint rectification performance", "songshodhito chukti", "সংশোধিত চুক্তি কার্যকর", "ধারা ৩৪"]
  },
  "35": {
    secNum: "Section 35",
    id: "sra-35",
    enTitle: "When Rescission of Contract May be Adjudged",
    bnTitle: "যেসব ক্ষেত্রে চুক্তি বাতিল বা রদ ঘোষণা করা যায়",
    enExp: "Authorizes any person interested in a contract to sue for rescission where the contract is voidable, where it is unlawful for causes not apparent on its face and defendant is more to blame, or in lease default.",
    bnExp: "চুক্তি যদি বাতিলযোগ্য (Voidable) হয়, বা অপ্রকাশ্য কারণে বেআইনি হয় এবং বিবাদী অধিক দোষী হয়, তবে চুক্তি রদ বা বাতিলের মামলা করা যায়।",
    enCaution: "Limitation is strictly 3 years under Article 114 of the Limitation Act, 1908 from when facts entitling rescission become known.",
    bnCaution: "চুক্তি রদের কারণ জানার তারিখ থেকে ৩ বছরের মধ্যে মামলা করতে হবে (তামাদি আইনের ১১৪ অনুচ্ছেদ)।",
    keywords: ["rescission of contract", "section 35 sra", "chukti rod batil", "চুক্তি রদ বা বাতিল", "ধারা ৩৫", "৩ বছর তামাদি"]
  },
  "36": {
    secNum: "Section 36",
    id: "sra-36",
    enTitle: "Rescission for Mistake",
    bnTitle: "ভুলের কারণে চুক্তি রদ",
    enExp: "Allows rescission of a contract where the plaintiff made a mistake, provided that the defendant was not in substantially the same mistake and cannot be put in the same position.",
    bnExp: "ভুলের কারণে কোনো পক্ষ চুক্তিতে আবদ্ধ হলে এবং বিবাদীকে পূর্বাবস্থায় ফিরিয়ে দেওয়া সম্ভব হলে চুক্তি রদ করা যায়।",
    enCaution: "Rescission will not be granted if the parties cannot be restored to substantially the status quo ante.",
    bnCaution: "পক্ষগণকে পূর্বের অবস্থায় ফিরিয়ে দেওয়া অসম্ভব হলে কেবল ভুলের অজুহাতে চুক্তি রদ মঞ্জুর হয় না।",
    keywords: ["rescission for mistake", "bhul chukti rod", "status quo ante", "ভুলের জন্য রদ", "ধারা ৩৬"]
  },
  "37": {
    secNum: "Section 37",
    id: "sra-37",
    enTitle: "Alternative Prayer for Rescission in Suit for Specific Performance",
    bnTitle: "সুনির্দিষ্ট কার্যসম্পাদনের মামলায় চুক্তি রদের বিকল্প প্রার্থনা",
    enExp: "Permits a plaintiff suing for specific performance to pray alternatively that if the contract cannot be specifically enforced, it may be rescinded and delivered up to be cancelled.",
    bnExp: "চুক্তি কার্যসম্পাদনের মামলায় বিকল্প প্রার্থনা রাখা যায় যে চুক্তিটি কার্যকর করা না গেলে তা যেন রদ বা বাতিল ঘোষণা করা হয়।",
    enCaution: "Strategic pleading practice: always include alternative prayer for rescission and refund of earnest money.",
    bnCaution: "মামলা করার সময় চুক্তি কার্যসম্পাদনের সাথে বিকল্পে বায়নার টাকা ফেরত ও চুক্তি বাতিলের প্রার্থনা করা নিরাপদ আইনি কৌশল।",
    keywords: ["alternative prayer rescission", "chukti rod bikolpo", "refund earnest money", "বিকল্প প্রার্থনা রদ", "ধারা ৩৭"]
  },
  "38": {
    secNum: "Section 38",
    id: "sra-38",
    enTitle: "Court May Require Party Rescinding to do Equity",
    bnTitle: "চুক্তি রদকারী পক্ষকে ন্যায়পরতার আচরণ করিতে আদালত বাধ্য করিতে পারেন",
    enExp: "Empowers the court, on adjudging rescission, to require the party to whom such relief is granted to make any compensation to the other which justice may require.",
    bnExp: "চুক্তি বাতিলের ডিক্রি দেওয়ার সময় আদালত বিজয়ী পক্ষকে অপর পক্ষের কোনো ক্ষতিপূরণ বা সুবিধা ফেরত দেওয়ার নির্দেশ দিতে পারেন।",
    enCaution: "Restitution principle: a party rescinding a contract must return any benefit received under it.",
    bnCaution: "চুক্তি বাতিলের সুবিধা গ্রহণকারীকে অপর পক্ষ থেকে নেওয়া কোনো অগ্রিম অর্থ ফেরত দিতে আদালত বাধ্য করতে পারেন।",
    keywords: ["do equity rescission", "restitution of benefits", "nyayporota chukti rod", "ন্যায়পরতা আচরণ", "ধারা ৩৮"]
  },
  "39": {
    secNum: "Section 39",
    id: "sra-39",
    enTitle: "When Cancellation of Written Instrument May be Ordered",
    bnTitle: "যেসব ক্ষেত্রে লিখিত দলিল বাতিলের আদেশ দেওয়া যায়",
    enExp: "Allows any person against whom a written instrument is void or voidable, and who has reasonable apprehension of serious injury if left outstanding, to sue to have it adjudged void and cancelled.",
    bnExp: "কোনো লিখিত দলিল যদি বাতিল বা বাতিলযোগ্য হয় এবং তা বহাল থাকলে গুরুতর ক্ষতির আশঙ্কা থাকে, তবে সংক্ষুব্ধ ব্যক্তি দেওয়ানি আদালতে দলিল বাতিলের মামলা করতে পারেন।",
    enCaution: "Limitation is strictly 3 years from when facts entitling cancellation became known under Article 91 of the Limitation Act, 1908. Void deeds (forged) can also be declared void under Sec 42.",
    bnCaution: "জাল দলিলের কথা জানার তারিখ থেকে ৩ বছরের মধ্যে দলিল বাতিলের মামলা করতে হয় (তামাদি আইনের ৯১ অনুচ্ছেদ)। সাব-রেজিস্ট্রার কার্যালয়ে আদালত ডিক্রির অনুলিপি পাঠিয়ে বাতিলের নির্দেশ দেন।",
    keywords: ["cancellation of instrument", "section 39 sra", "jal dalil batil", "দলিল বাতিল মামলা", "ধারা ৩৯", "৩ বছর তামাদি", "অন্য শরিকদের না জানিয়ে বিক্রি দলিল বাতিল", "জাল দলিল তৈরি করে দখল"]
  },
  "40": {
    secNum: "Section 40",
    id: "sra-40",
    enTitle: "What Instruments May be Partially Cancelled",
    bnTitle: "যেসব দলিলের আংশিক বাতিল করা যায়",
    enExp: "Permits the court to partially cancel an instrument where it is evidence of different rights or obligations, leaving the remainder intact.",
    bnExp: "কোনো দলিলে একাধিক ভিন্ন স্বত্ব বা দায়িত্ব লিপিবদ্ধ থাকলে আদালত ক্ষতিকর অংশ বাতিল করে অবশিষ্টাংশ বহাল রাখতে পারেন।",
    enCaution: "Used where a co-sharer fraudulently included another co-sharer's portion in an otherwise genuine sale deed.",
    bnCaution: "দলিলে নিজের অংশের বাইরে অন্যের অংশ জালিয়াতি করে ঢুকিয়ে দিলে আদালত অন্যের অংশটুকু বাতিল করতে পারেন।",
    keywords: ["partial cancellation of deed", "angshik dalil batil", "severable instrument cancellation", "আংশিক দলিল বাতিল", "ধারা ৪০"]
  },
  "41": {
    secNum: "Section 41",
    id: "sra-41",
    enTitle: "Compensation by Party for Whom Instrument is Cancelled",
    bnTitle: "দলিল বাতিলের আদেশপ্রাপ্ত পক্ষ কর্তৃক ক্ষতিপূরণ প্রদান",
    enExp: "Empowers the court, on adjudging cancellation, to require the party to whom relief is granted to make compensation to the other party as justice may require.",
    bnExp: "দলিল বাতিল ঘোষণার সময় আদালত অপর পক্ষকে ন্যায়সঙ্গত কোনো আর্থিক ক্ষতিপূরণ প্রদানের জন্য আদেশ দিতে পারেন।",
    enCaution: "Applies where a minor cancels a deed executed by guardian but benefited from consideration money for necessities.",
    bnCaution: "দলিল বাতিল করিয়ে অর্থ আত্মসাৎ রোধে আদালত ন্যায়সঙ্গত ক্ষতিপূরণের শর্ত জুড়ে দিতে পারেন।",
    keywords: ["compensation upon cancellation", "khotipuron dalil batil", "equitable compensation deed", "ক্ষতিপূরণ দলিল বাতিল", "ধারা ৪১"]
  },
  "42": {
    secNum: "Section 42",
    id: "sra-42",
    enTitle: "Declaratory Decree of Status or Right and Bar to Mere Declaration",
    bnTitle: "আইনগত পরিচয় বা অধিকারের ঘোষণামূলক ডিক্রি এবং আনুষঙ্গিক প্রতিকারবিহীন মামলায় বাধা",
    enExp: "Enables any person entitled to any legal character or right as to property to institute a suit for declaration of title; proviso strictly bars declaration where plaintiff, being able to seek consequential relief, omits to do so.",
    bnExp: "কোনো সম্পত্তিতে স্বত্ব বা আইনগত অধিকার অস্বীকার করা হলে স্বত্ব ঘোষণার ডিক্রি চাওয়া যায়; তবে দখল না থাকলে কেবল স্বত্ব ঘোষণা চাওয়া যায় না, সাথে দখল উদ্ধারের মতো আনুষঙ্গিক প্রতিকার চাইতে হবে।",
    enCaution: "Limitation is 6 years from when right to sue accrues under Article 120 of the Limitation Act, 1908. If out of possession, failure to pray for recovery of possession renders the suit non-maintainable under the proviso.",
    bnCaution: "তামাদি আইনের ১২০ অনুচ্ছেদ অনুযায়ী তামাদির মেয়াদ ৬ বছর। জমিতে দখল না থাকলে কেবল ঘোষণার মামলা অচল; আরজিতে অবশ্যই দখল উদ্ধার বা নিষেধাজ্ঞার আনুষঙ্গিক প্রতিকার চাইতে হবে।",
    keywords: ["declaratory decree", "section 42 sra", "shotto ghoshona", "consequential relief mandatory", "স্বত্ব ঘোষণার মামলা", "ধারা ৪২", "৬ বছর তামাদি"]
  },
  "43": {
    secNum: "Section 43",
    id: "sra-43",
    enTitle: "Effect of Declaratory Decree",
    bnTitle: "ঘোষণামূলক ডিক্রির কার্যকারিতা",
    enExp: "Specifies that a declaration is binding only on the parties to the suit, persons claiming through them, and trustees where parties are trustees.",
    bnExp: "ঘোষণামূলক ডিক্রি কেবলমাত্র মামলার পক্ষগণ, তাদের উত্তরাধিকারী ও সংশ্লিষ্ট ট্রাস্টিদের ওপর বাধ্যকর; অচেনা তৃতীয় পক্ষের বিরুদ্ধে এটি কার্যকর নয়।",
    enCaution: "Declaratory decrees operate in personam, not in rem against the whole world.",
    bnCaution: "স্বত্ব ঘোষণার ডিক্রি কেবল মামলার বিবাদী পক্ষের ওপর কার্যকর হয়, অচেনা তৃতীয় পক্ষের বিরুদ্ধে স্বয়ংক্রিয়ভাবে খাটে না।",
    keywords: ["effect of declaration", "decree binding in personam", "ghosonamulok dikrir karjokarita", "ডিক্রির কার্যকারিতা", "ধারা ৪৩"]
  },
  "44": {
    secNum: "Section 44",
    id: "sra-44",
    enTitle: "Appointment of Receivers Discretionary",
    bnTitle: "রিসিভার নিয়োগে আদালতের সুবিবেচনা",
    enExp: "Provides that appointment of a receiver pending suit rests in the discretion of the court, regulated by the Code of Civil Procedure (Order 40 CPC).",
    bnExp: "বিচারাধীন অবস্থায় বিরোধীয় সম্পত্তি বিনষ্ট বা অপচয় রোধে আদালত সুবিধাজনক মনে করলে সিপিসির ৪০ আদেশ অনুযায়ী রিসিভার নিয়োগ করতে পারেন।",
    enCaution: "Appointed only when property is in danger of being dissipated, damaged, or aliened to defeat a decree.",
    bnCaution: "সম্পত্তি নষ্ট বা হস্তান্তর হওয়ার তাৎক্ষণিক ঝুঁকি থাকলে তবেই নিরপেক্ষ সরকারি রিসিভার নিয়োগের আদেশ দেওয়া হয়।",
    keywords: ["appointment of receiver", "receiver in civil suit", "order 40 cpc", "রিসিভার নিয়োগ", "ধারা ৪৪"]
  },
  "52": {
    secNum: "Section 52",
    id: "sra-52",
    enTitle: "Preventive Relief How Granted: Temporary and Perpetual Injunctions",
    bnTitle: "নিবারক প্রতিকার প্রদানের পদ্ধতি: অস্থায়ী ও স্থায়ী নিষেধাজ্ঞা",
    enExp: "Provides that preventive relief is granted at the discretion of the court by injunction, either temporary (regulated by CPC) or perpetual (decreed after full trial).",
    bnExp: "আদালত সুবিবেচনামূলক এখতিয়ারে নিষেধাজ্ঞার মাধ্যমে নিবারক প্রতিকার দেন; এটি অস্থায়ী (দেওয়ানি কার্যবিধি অনুযায়ী) বা স্থায়ী (পূর্ণাঙ্গ শুনানির পর ডিক্রি) হতে পারে।",
    enCaution: "Temporary injunctions are regulated by Order 39 of the Code of Civil Procedure, 1908. Applicant must establish prima facie case, balance of convenience, and irreparable loss.",
    bnCaution: "অস্থায়ী নিষেধাজ্ঞা পেতে আপাতদৃষ্টিতে সন্তোষজনক অধিকার (Prima facie case), সুবিধার ভারসাম্য (Balance of convenience) ও অপূরণীয় ক্ষতির প্রমাণ দিতে হয়।",
    keywords: ["preventive relief injunction", "temporary perpetual injunction", "section 52 sra", "osthayi nishedhagya", "ধারা ৫২", "অস্থায়ী নিষেধাজ্ঞা", "প্রতিবেশী সীমানার ভেতর দেয়াল নির্মাণ", "তাৎক্ষণিক নিষেধাজ্ঞা পাওয়ার নিয়ম", "সীমানায় দেওয়াল নির্মাণ"]
  },
  "53": {
    secNum: "Section 53",
    id: "sra-53",
    enTitle: "Temporary Injunctions and Perpetual Injunctions Distinguished",
    bnTitle: "অস্থায়ী ও স্থায়ী নিষেধাজ্ঞার পার্থক্য",
    enExp: "Defines temporary injunctions as those continuing until a specified time or further order of court (Order 39 CPC), and perpetual injunctions as those decreed after hearing merits of the suit.",
    bnExp: "অস্থায়ী নিষেধাজ্ঞা নির্দিষ্ট সময় বা পরবর্তী আদেশ না দেওয়া পর্যন্ত বহাল থাকে; আর স্থায়ী নিষেধাজ্ঞা মামলার পূর্ণাঙ্গ বিচার শেষে চূড়ান্ত ডিক্রির মাধ্যমে মঞ্জুর হয়।",
    enCaution: "Violation of temporary injunction is punishable under Order 39 Rule 2(3) CPC with civil imprisonment up to 6 months and property attachment.",
    bnCaution: "অস্থায়ী নিষেধাজ্ঞা অমান্য করলে দেওয়ানি কার্যবিধির ৩৯ আদেশের ২(৩) নিয়ম অনুযায়ী সম্পত্তি ক্রোক ও দেওয়ানি কারাগারে আটক করা যায়।",
    keywords: ["temporary vs perpetual injunction", "order 39 rule 2 cpc", "nishedhaggay parthokko", "স্থায়ী অস্থায়ী নিষেধাজ্ঞা পার্থক্য", "ধারা ৫৩"]
  },
  "54": {
    secNum: "Section 54",
    id: "sra-54",
    enTitle: "When Perpetual Injunction May be Granted",
    bnTitle: "যেসব ক্ষেত্রে স্থায়ী নিষেধাজ্ঞা মঞ্জুর করা যায়",
    enExp: "Governs grounds for perpetual injunction to prevent breach of an obligation: where defendant is trustee, where no standard exists for ascertaining damage, where compensation is inadequate, or to prevent multiplicity of judicial proceedings.",
    bnExp: "আইনগত অধিকার রক্ষা বা ক্ষতিপূরণ যেখানে অসম্ভব এবং মামলার বহুত্ব রোধ করতে আদালত বিচার শেষে স্থায়ী নিষেধাজ্ঞার ডিক্রি প্রদান করেন।",
    enCaution: "Perpetual injunction is decreed only after full civil trial on merits. Cannot be granted where plaintiff is out of possession and seeks no recovery.",
    bnCaution: "স্থায়ী নিষেধাজ্ঞা শুধুমাত্র পূর্ণাঙ্গ সাক্ষ্য-প্রমাণ ও শুনানির পর চূড়ান্ত ডিক্রির মাধ্যমে দেওয়া হয়। দখল না থাকলে শুধু নিষেধাজ্ঞা মামলা চলে না।",
    keywords: ["perpetual injunction grounds", "section 54 sra", "prevent multiplicity of suits", "স্থায়ী নিষেধাজ্ঞা মামলা", "ধারা ৫৪", "মামলার বহুত্ব রোধ", "প্রতিবেশী সীমানার ভেতর দেয়াল নির্মাণ", "তাৎক্ষণিক নিষেধাজ্ঞা পাওয়ার নিয়ম", "সীমানায় দেওয়াল নির্মাণ স্থায়ী নিষেধাজ্ঞা"]
  },
  "55": {
    secNum: "Section 55",
    id: "sra-55",
    enTitle: "Mandatory Injunctions",
    bnTitle: "আদেশমূলক নিষেধাজ্ঞা",
    enExp: "Authorizes the court to grant a mandatory injunction compelling the performance of requisite acts to prevent breach of an obligation and preserve rights (e.g., demolishing an encroaching wall).",
    bnExp: "অধিকার লঙ্ঘন রোধে কোনো কাজ করার বাধ্যবাধকতা থাকলে আদালত আদেশমূলক নিষেধাজ্ঞা দিয়ে অবৈধভাবে নির্মিত দেওয়াল ভাঙা বা প্রতিবন্ধকতা অপসারণের নির্দেশ দিতে পারেন।",
    enCaution: "Mandatory injunction is an extraordinary remedy granted with extreme caution only where restoration of status quo is compelling.",
    bnCaution: "আদেশমূলক নিষেধাজ্ঞা বিরল প্রতিকার; জোরপূর্বক দেওয়াল নির্মাণ বা রাস্তা বন্ধের ক্ষেত্রে তাৎক্ষণিক প্রতিকার হিসেবে চাওয়া হয়।",
    keywords: ["mandatory injunction", "section 55 sra", "compelling demolition wall", "adesh mulok nishedhagya", "আদেশমূলক নিষেধাজ্ঞা", "ধারা ৫৫"]
  },
  "56": {
    secNum: "Section 56",
    id: "sra-56",
    enTitle: "When Injunction Must be Refused",
    bnTitle: "যেসব ক্ষেত্রে নিষেধাজ্ঞা প্রত্যাখ্যান করিতে হইবে",
    enExp: "Specifies 11 statutory grounds where an injunction CANNOT be granted: e.g., staying judicial proceedings unless to prevent multiplicity, restraining application to legislative bodies, interfering with public duties of government departments, when equally efficacious relief is available, or plaintiff has no personal interest.",
    bnExp: "১১টি ক্ষেত্রে আদালত কোনো নিষেধাজ্ঞা দিতে পারেন না; যেমন সরকারি দপ্তরের কাজে হস্তক্ষেপ, উচ্চ আদালতের কার্যধারায় স্থগিতাদেশ, বিকল্প কার্যকর প্রতিকার থাকলে, বা বাদীর ব্যক্তিগত স্বার্থ না থাকলে।",
    enCaution: "Statutory bar: if another equally efficacious civil relief (like damages or possession suit) is available, an injunction suit is strictly barred under clause (i).",
    bnCaution: "ধারা ৫৬ অনুযায়ী সমমানের বিকল্প কার্যকর প্রতিকার লভ্য থাকলে বা সরকারি দাপ্তরিক কর্তব্যে হস্তক্ষেপে আদালত কোনো নিষেধাজ্ঞা দিতে পারেন না।",
    keywords: ["injunction when refused", "section 56 sra statutory bar", "grounds refusing injunction", "নিষেধাজ্ঞা প্রত্যাখ্যানের ক্ষেত্র", "ধারা ৫৬", "১১টি বাধা"]
  },
  "57": {
    secNum: "Section 57",
    id: "sra-57",
    enTitle: "Injunction to Perform Negative Agreement",
    bnTitle: "নেতিবাচক বা বর্জনমূলক চুক্তি পালনের জন্য নিষেধাজ্ঞা",
    enExp: "Provides that where a contract comprises an affirmative agreement and a negative agreement not to do a certain act, court may grant an injunction to perform the negative agreement even if affirmative agreement cannot be specifically enforced.",
    bnExp: "চুক্তিতে কোনো কাজ করার পাশাপাশি কোনো কাজ না করার (নেতিবাচক) শর্ত থাকলে, মূল চুক্তি কার্যকর করা না গেলেও নেতিবাচক শর্ত পালনে নিষেধাজ্ঞা দেওয়া যায়।",
    enCaution: "Plaintiff must not have failed to perform the contract so far as binding on him.",
    bnCaution: "বাদী নিজে চুক্তির শর্ত মেনে চললে তবেই বিবাদীকে নেতিবাচক শর্ত লঙ্ঘনে বাধা দেওয়া যায়।",
    keywords: ["negative covenant injunction", "section 57 sra", "affirmative negative agreement", "নেতিবাচক চুক্তি নিষেধাজ্ঞা", "ধারা ৫৭"]
  }
};

const provisions = [];

// Handle Section 1: combine rawExtracted items 0, 1, 2
const rawSec1 = rawExtracted.slice(0, 3);
const combinedSec1Text = rawSec1.map(r => cleanText(r.text)).join('\n\n');
const metaSec1 = sraMeta["1"];
provisions.push({
  id: metaSec1.id,
  actId: 'act_specific_relief_1877',
  sectionNumber: metaSec1.secNum,
  categories: ['land', 'rights'],
  title: {
    bn: `${metaSec1.bnTitle} (ধারা ১)`,
    en: `${metaSec1.enTitle} (${metaSec1.secNum})`
  },
  originalText: combinedSec1Text,
  originalLanguage: 'en',
  plainExplanation: {
    bn: metaSec1.bnExp,
    en: metaSec1.enExp
  },
  caution: {
    bn: metaSec1.bnCaution,
    en: metaSec1.enCaution
  },
  sourceUrl: rawSec1[0].url,
  retrievalDate: '2026-11-01',
  effectiveDate: '1877-05-01',
  legalStatus: 'active',
  reviewStatus: 'verified',
  contentHash: '',
  keywords: [
    ...metaSec1.keywords,
    'specific relief act',
    'shunirdishto protikar',
    'civil remedy'
  ]
});

// Handle Section 3: combine items 4 and 5
const rawSec3 = rawExtracted.slice(4, 6);
const combinedSec3Text = rawSec3.map(r => cleanText(r.text)).join('\n\n');
const metaSec3 = sraMeta["3"];
provisions.push({
  id: metaSec3.id,
  actId: 'act_specific_relief_1877',
  sectionNumber: metaSec3.secNum,
  categories: ['land', 'rights'],
  title: {
    bn: `${metaSec3.bnTitle} (ধারা ৩)`,
    en: `${metaSec3.enTitle} (${metaSec3.secNum})`
  },
  originalText: combinedSec3Text,
  originalLanguage: 'en',
  plainExplanation: {
    bn: metaSec3.bnExp,
    en: metaSec3.enExp
  },
  caution: {
    bn: metaSec3.bnCaution,
    en: metaSec3.enCaution
  },
  sourceUrl: rawSec3[0].url,
  retrievalDate: '2026-11-01',
  effectiveDate: '1877-05-01',
  legalStatus: 'active',
  reviewStatus: 'verified',
  contentHash: '',
  keywords: [
    ...metaSec3.keywords,
    'specific relief act',
    'shunirdishto protikar',
    'civil remedy'
  ]
});

// For all other sections from rawExtracted
for (let i = 6; i < rawExtracted.length; i++) {
  const raw = rawExtracted[i];
  // Determine section key
  let secKey = null;
  const m = raw.tocText.match(/^([0-9]+[A-Za-z]?)\./);
  if (m) {
    secKey = m[1];
  } else if (raw.tocText.includes('Omitted')) {
    continue; // Omitted sections 45-51
  }

  if (!secKey) continue;
  const meta = sraMeta[secKey];
  if (!meta) {
    console.warn(`No metadata for SRA section ${secKey} at index ${i}`);
    continue;
  }

  const cleanedText = cleanText(raw.text);

  provisions.push({
    id: meta.id,
    actId: 'act_specific_relief_1877',
    sectionNumber: meta.secNum,
    categories: ['land', 'rights'],
    title: {
      bn: `${meta.bnTitle} (ধারা ${secKey})`,
      en: `${meta.enTitle} (${meta.secNum})`
    },
    originalText: cleanedText,
    originalLanguage: 'en',
    plainExplanation: {
      bn: meta.bnExp,
      en: meta.enExp
    },
    caution: {
      bn: meta.bnCaution,
      en: meta.enCaution
    },
    sourceUrl: raw.url,
    retrievalDate: '2026-11-01',
    effectiveDate: '1877-05-01',
    legalStatus: 'active',
    reviewStatus: 'verified',
    contentHash: '',
    keywords: [
      ...meta.keywords,
      `ধারা ${secKey}`,
      `section ${secKey}`,
      `sra ${secKey}`,
      `specific relief section ${secKey}`,
      'সুনির্দিষ্ট প্রতিকার',
      'specific relief act 1877',
      'civil court remedy'
    ]
  });
}

fs.writeFileSync('scripts/sra_1877_all.json', JSON.stringify(provisions, null, 2), 'utf8');
console.log(`Generated all ${provisions.length} provisions for Specific Relief Act, 1877`);
