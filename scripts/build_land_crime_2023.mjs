import fs from 'fs';

const rawExtracted = JSON.parse(fs.readFileSync('scripts/raw_extracted_1454.json', 'utf8'));

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

const sectionMeta = {
  1: {
    enTitle: "Short Title and Commencement",
    bnTitle: "সংক্ষিপ্ত শিরোনাম ও প্রবর্তন",
    enExp: "Names the statute as the Land Crime Prevention and Redress Act, 2023 (Act No. XXXI of 2023) and came into force immediately across Bangladesh upon gazette publication on 18 September 2023.",
    bnExp: "এই আইনটি 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩' নামে অভিহিত এবং ১৮ সেপ্টেম্বর ২০২৩ তারিখে গেজেট প্রকাশের সাথে সাথে সমগ্র বাংলাদেশে অবিলম্বে কার্যকর হয়েছে।",
    enCaution: "Applies across all territorial limits of Bangladesh to all citizens and immovable properties.",
    bnCaution: "এই আইনটি সমগ্র বাংলাদেশের সকল নাগরিক ও ভূমির ক্ষেত্রে কার্যকর।",
    keywords: ["land crime act", "bhumi oporadh ain 2023", "short title commencement", "আইনের নাম ও প্রবর্তন", "ধারা ১"]
  },
  2: {
    enTitle: "Definitions of Land, Deeds, and Fraud",
    bnTitle: "সংজ্ঞা",
    enExp: "Defines key statutory terms including land, document/deed, fraud, forgery, illegal possession, Executive Magistrate, and competent civil court.",
    bnExp: "এই আইনে ব্যবহৃত ভূমি, দলিল, প্রতারণা, জালিয়াতি, অবৈধ দখল, নির্বাহী ম্যাজিস্ট্রেট ও উপযুক্ত দেওয়ানি আদালতের সুস্পষ্ট সংজ্ঞায়ন।",
    enCaution: "Legal complaints must conform to the statutory definitions established under this Section.",
    bnCaution: "আইনি কার্যধারা দায়েরের সময় সংজ্ঞার সুনির্দিষ্ট পরিভাষা অনুযায়ী অভিযোগ গঠন করতে হবে।",
    keywords: ["land crime definitions", "bhumi songga", "dalil jaliati songga", "ভূমি সংজ্ঞা", "ধারা ২"]
  },
  3: {
    enTitle: "Application in Addition to Other Laws",
    bnTitle: "এই আইনের বিধানাবলির অতিরিক্ততা",
    enExp: "Clarifies that the provisions of this Act are in addition to, and not in derogation of, any other existing laws (e.g., Penal Code, SAT Act, Transfer of Property Act).",
    bnExp: "এই আইনের বিধানাবলি পেনাল কোড, সুনির্দিষ্ট প্রতিকার আইন বা অন্য কোনো প্রচলিত আইনের বিকল্প নয় বরং সেগুলোর অতিরিক্ত হিসেবে প্রয়োগযোগ্য।",
    enCaution: "Concurrent civil suits or criminal complaints under other statutes remain admissible alongside proceedings under this Act.",
    bnCaution: "এই আইনের পাশাপাশি প্রচলিত ফৌজদারি বা দেওয়ানি আইনে প্রতিকার প্রার্থনা করতে কোনো আইনি বাধা নেই।",
    keywords: ["addition to other laws", "onno ainer odhikatota", "concurrent remedy", "আইনের অতিরিক্ততা", "ধারা ৩"]
  },
  4: {
    enTitle: "Land Fraud Offenses and Penalties",
    bnTitle: "ভূমি প্রতারণা সংক্রান্ত অপরাধ ও দণ্ড",
    enExp: "Criminalizes deceptive land transactions such as concealing genuine ownership, executing deeds without title, impersonation, or executing multiple deeds for the same land, punishable with rigorous imprisonment up to 7 years and fine.",
    bnExp: "প্রকৃত মালিকানা গোপন করে, মালিকানার স্বত্বহীন হয়ে বা মিথ্যা পরিচয়ে জমি রেজিস্ট্রি করা এবং একই জমি একাধিক ব্যক্তির নিকট বিক্রি বা হস্তান্তর করা ফৌজদারি অপরাধ; সাজা অনধিক ৭ বছর কারাদণ্ড ও অর্থদণ্ড।",
    enCaution: "Under Section 19(1), offenses under Section 4 are strictly cognizable and NON-BAILABLE. Triable by 1st Class Judicial Magistrate or Metropolitan Magistrate.",
    bnCaution: "ধারা ১৯(১) অনুযায়ী ধারা ৪ এর অপরাধ আমলযোগ্য (cognizable) এবং অ-জামিনযোগ্য (non-bailable)। সাব-রেজিস্ট্রি অফিসের ইনডেক্স তল্লাশি দিয়ে মূল দলিলের সার্টিফাইড কপিসহ মামলা করুন।",
    keywords: ["land fraud penalty", "bhumi protarona dondo", "fake ownership sale", "ভূমি প্রতারণা", "ধারা ৪", "non-bailable land fraud", "land grabbing via forged deed", "forged deed under land crime act 2023", "জাল দলিল তৈরি", "জালিয়াত চক্র", "জোরপূর্বক দখল", "পৈতৃক জমি দখল"]
  },
  5: {
    enTitle: "Land Deed Forgery Offenses and Penalties",
    bnTitle: "ভূমি জালিয়াতি সংক্রান্ত অপরাধ ও দণ্ড",
    enExp: "Criminalizes forging or altering land title deeds, fake signatures, forged court decrees, or bogus mutation documents, punishable with rigorous imprisonment up to 7 years and fine.",
    bnExp: "জাল দলিল, ভুয়া খতিয়ান, ভুয়া সই বা ভুয়া আদালতের ডিক্রি প্রস্তুত করা গুরুতর ফৌজদারি অপরাধ; সাজা অনধিক ৭ বছর কারাদণ্ড ও অর্থদণ্ড।",
    enCaution: "Under Section 19(1), offenses under Section 5 are cognizable and NON-BAILABLE. Rigorous imprisonment up to 7 years applies.",
    bnCaution: "ধারা ১৯(১) অনুযায়ী ধারা ৫ এর অপরাধ আমলযোগ্য (cognizable) এবং অ-জামিনযোগ্য (non-bailable)। সাব-রেজিস্ট্রার কার্যালয় থেকে তল্লাশিসহ বিজ্ঞ আদালতে দ্রুত নালিশ করুন।",
    keywords: ["deed forgery penalty", "dalil jaliati", "fake dalil punishment", "ভূমি জালিয়াতি", "ধারা ৫", "non-bailable deed forgery", "জাল দলিল তৈরি করে", "জালিয়াত চক্র"]
  },
  6: {
    enTitle: "Prevention of Co-Sharer Fraud and Excess Land Transfer",
    bnTitle: "প্রতারণা ও জালিয়াতি সংক্রান্ত অপরাধ রোধে ব্যবস্থা",
    enExp: "Bars co-sharers or individuals from selling more than their legitimate share or transferring specific physical portions without lawful partition, punishable with imprisonment up to 2 years or fine or both.",
    bnExp: "বণ্টননামা ব্যতীত অংশীদারী পৈতৃক জমি নিজের হিস্যার অতিরিক্ত বিক্রি করা বা নির্দিষ্ট অংশ জোরপূর্বক হস্তান্তর করা দণ্ডনীয় অপরাধ; সাজা অনধিক ২ বছর কারাদণ্ড বা অর্থদণ্ড বা উভয় দণ্ড।",
    enCaution: "Under Section 19(1), this offense is cognizable, bailable, and compoundable. Civil remedies like partition suits remain available.",
    bnCaution: "ধারা ১৯(১) অনুযায়ী এই অপরাধ আমলযোগ্য (cognizable), তবে জামিনযোগ্য (bailable) ও আপোষযোগ্য (compoundable)। অংশীদারি জমিতে বণ্টনের মামলা (Partition Suit) বা প্রিয়েমশন মামলাও করা যায়।",
    keywords: ["co-sharer excess sale", "shorik jomi bikri", "partition prevention", "শরিকের অতিরিক্ত জমি বিক্রি", "ধারা ৬", "নিজের ভাগের বেশি পৈতৃক জমি", "অন্য শরিকদের না জানিয়ে", "পৈতৃক জমি এক শরিক গোপনে বিক্রি", "শরিক গোপনে বিক্রি"]
  },
  7: {
    enTitle: "Prohibition and Penalty for Illegal Possession and Land Grabbing",
    bnTitle: "অবৈধ দখল প্রতিরোধ ও দণ্ড",
    enExp: "Criminalizes unlawful trespass, physical dispossession, or land grabbing without lawful title or valid court order, punishable with imprisonment up to 2 years or fine or both.",
    bnExp: "বৈধ মালিকানার দলিল বা আদালতের পরোয়ানা ছাড়া জোরপূর্বক অন্যের জমি দখল করা বা বেদখল করার চেষ্টা করা দণ্ডনীয় অপরাধ; সাজা অনধিক ২ বছর কারাদণ্ড বা অর্থদণ্ড।",
    enCaution: "Under Section 19(1), this offense is cognizable, bailable, and compoundable with court approval.",
    bnCaution: "ধারা ১৯(১) অনুযায়ী এই অপরাধ আমলযোগ্য (cognizable), জামিনযোগ্য (bailable) ও আদালতের অনুমতিতে আপোষযোগ্য। জমির দাখিলা, মিউটেশন ও দলিলের কপি সহ নির্বাহী বা বিচারিক আদালতে প্রতিকার চাওয়া যায়।",
    keywords: ["illegal land grabbing", "jomi dokhol dondo", "unlawful possession", "অবৈধ দখল প্রতিরোধ", "ধারা ৭", "land grabbing via forged deed", "forged deed under land crime act 2023", "জোরপূর্বক দখল", "পৈতৃক জমি জোরপূর্বক দখল", "জমি দখল", "আমার জমিতে অপরিচিত লোক এসে সাইনবোর্ড ঝুলিয়ে দিয়েছে", "সাইনবোর্ড ঝুলিয়ে দেওয়া", "অপরিচিত লোক সাইনবোর্ড"]
  },
  8: {
    enTitle: "Restoration of Possession to Dispossessed Person by Executive Magistrate",
    bnTitle: "অবৈধভাবে দখলচ্যুত ব্যক্তির দখল পুনরুদ্ধার",
    enExp: "Empowers the Executive Magistrate to summarily restore physical possession to a person unlawfully dispossessed without due process of law upon inquiry within specified time.",
    bnExp: "বেআইনিভাবে কোনো ব্যক্তিকে তার দখলীয় জমি থেকে উচ্ছেদ করা হলে নির্বাহী ম্যাজিস্ট্রেট তদন্ত সাপেক্ষে সংক্ষিপ্ত কার্যধারায় তাৎক্ষণিক দখল পুনরুদ্ধারের আদেশ দিতে পারেন।",
    enCaution: "Provides summary administrative restoration of actual physical possession; questions of title must be resolved in civil court. Disobeying restoration order is penal under Section 15.",
    bnCaution: "এটি শারীরিক দখল উদ্ধারের সংক্ষিপ্ত প্রশাসনিক প্রতিকার; জটিল স্বত্ব বা দলিলের বৈধতা নির্ধারণের এখতিয়ার দেওয়ানি আদালতের। আদেশ অমান্য করলে ধারা ১৫ অনুযায়ী সাজা প্রযোজ্য।",
    keywords: ["restoration of possession", "dokhol punoruddhar", "executive magistrate possession", "দখল পুনরুদ্ধার", "ধারা ৮", "জোরপূর্বক দখল পুনরুদ্ধার", "বেদখল জমি পুনরুদ্ধার"]
  },
  9: {
    enTitle: "Penalty for Failure to Deliver Possession to Purchaser",
    bnTitle: "ক্রেতা বরাবর বিক্রিত ভূমির দখল হস্তান্তর না করিবার দণ্ড",
    enExp: "Punishes a seller who, after receiving full consideration money, fails or refuses to hand over physical possession of the sold land to the buyer, punishable with imprisonment up to 2 years or fine or both.",
    bnExp: "জমির সম্পূর্ণ বিক্রয়মূল্য গ্রহণ করার পরও ক্রেতাকে জমির দখল হস্তান্তর না করলে বিক্রেতা অনধিক ২ বছর কারাদণ্ড বা অর্থদণ্ড বা উভয় দণ্ডে দণ্ডিত হবেন।",
    enCaution: "Under Section 19(1), this offense is cognizable, bailable, and compoundable with court leave.",
    bnCaution: "ধারা ১৯(১) অনুযায়ী এই অপরাধ আমলযোগ্য, জামিনযোগ্য ও আপোষযোগ্য। রেজিস্ট্রি দলিলের শর্ত এবং দখল প্রাপ্তির তারিখ সুস্পষ্ট উল্লেখ থাকা জরুরি।",
    keywords: ["delivery of possession", "kreta dokhol na deya", "seller refusal possession", "বিক্রিত জমি দখল না দেওয়া", "ধারা ৯"]
  },
  10: {
    enTitle: "Penalty for Damaging Boundaries, Survey Marks, or Land",
    bnTitle: "সীমানা বা ভূমির ক্ষতিসাধনের দণ্ড",
    enExp: "Criminalizes removing, destroying, altering, or damaging legal boundaries, survey pillars, fence, or land surface of another person's lawfully possessed land, punishable with imprisonment up to 2 years or fine or both.",
    bnExp: "অন্যের আইনানুগভাবে দখলকৃত ভূমির সীমানা পিলার, সীমানা চিহ্ন বা বেড়া বিনষ্ট বা পরিবর্তন করা এবং জমির ক্ষতিসাধন করা দণ্ডনীয় অপরাধ; সাজা অনধিক ২ বছর কারাদণ্ড বা অর্থদণ্ড।",
    enCaution: "Under Section 19(1), this offense is cognizable, bailable, and compoundable. Preserve survey reports and photographic evidence of damaged boundary marks.",
    bnCaution: "ধারা ১৯(১) অনুযায়ী এই অপরাধ আমলযোগ্য, জামিনযোগ্য ও আপোষযোগ্য। সীমানা বিরোধে সরকারি সার্ভেয়ার দিয়ে পরিমাপ প্রতিবেদন ও ছবি প্রমাণ হিসেবে সংগ্রহ করুন।",
    keywords: ["boundary damage penalty", "shimana khotishadhon", "survey pillar destruction", "সীমানা ক্ষতিসাধন", "ধারা ১০"]
  },
  11: {
    enTitle: "Penalty for Grabbing or Encroaching on Public or Government Land",
    bnTitle: "সরকারি বা জনসাধারণের ভূমির অবৈধ দখল বা ক্ষতিসাধনের দণ্ড",
    enExp: "Punishes unlawful entry, grabbing, construction, or damage to government, semi-government, autonomous body, or public utility land (roads, canals, parks), with imprisonment up to 2 years or fine or both.",
    bnExp: "সরকারি, আধা-সরকারি, স্বায়ত্তশাসিত সংস্থা বা জনগণের ব্যবহার্য রাস্তাঘাট, খালবিল বা পার্কে অবৈধ দখল, স্থাপনা নির্মাণ বা ক্ষতিসাধন করলে অনধিক ২ বছর কারাদণ্ড বা অর্থদণ্ড বা উভয় দণ্ড।",
    enCaution: "Under Section 19(1), this offense is cognizable and bailable. Executive authorities possess summary powers to demolish structures and evict encroachers.",
    bnCaution: "ধারা ১৯(১) অনুযায়ী এই অপরাধ আমলযোগ্য ও জামিনযোগ্য। সরকারি খাস জমি বা এভেন্ডার সম্পত্তির দখলদারদের বিরুদ্ধে জেলা প্রশাসন ও নির্বাহী ম্যাজিস্ট্রেট তাৎক্ষণিক উচ্ছেদ ব্যবস্থা গ্রহণ করতে পারেন।",
    keywords: ["government land encroachment", "sorkari jomi dokhol", "public land protection", "সরকারি জমি দখল", "ধারা ১১"]
  },
  12: {
    enTitle: "Penalty for Illegal Filling or Changing Classification of Public Land",
    bnTitle: "সরকারি বা জনসাধারণের ভূমি অবৈধ ভরাট ও শ্রেণি পরিবর্তনের দণ্ড",
    enExp: "Prohibits illegal earth-filling, excavation, or altering the classification or character of public, wetland, or government land without statutory clearance, punishable with imprisonment up to 2 years or fine or both.",
    bnExp: "সরকারি স্বার্থযুক্ত বা জনসাধারণের ব্যবহার্য জলাভূমি, খেলার মাঠ বা খাস জমি অবৈধভাবে ভরাট করা বা জমির শ্রেণি পরিবর্তন করা শাস্তিযোগ্য অপরাধ; সাজা অনধিক ২ বছর কারাদণ্ড বা অর্থদণ্ড।",
    enCaution: "Cognizable, bailable, and compoundable under Section 19(1). Environmental conservation and reservoir protection laws may apply concurrently.",
    bnCaution: "ধারা ১৯(১) অনুযায়ী এই অপরাধ আমলযোগ্য, জামিনযোগ্য ও আপোষযোগ্য। পরিবেশ সংরক্ষণ আইন ও জলাধার রক্ষা আইনের বিধানও একত্রে প্রযোজ্য হতে পারে।",
    keywords: ["wetland filling penalty", "sorkari jomi bhorat", "land class alteration", "জমি ভরাট শ্রেণি পরিবর্তন", "ধারা ১২"]
  },
  13: {
    enTitle: "Penalty for Cutting Topsoil and Unauthorized Landfilling",
    bnTitle: "মাটির উপরি-স্তর কর্তন ও ভরাটের দণ্ড",
    enExp: "Prohibits cutting or extracting topsoil from agricultural arable land or filling lowlands without written permission from the Deputy Commissioner, punishable with imprisonment up to 2 years or fine or both.",
    bnExp: "জেলা প্রশাসকের পূর্বানুমতি ছাড়া কৃষিজমির উপরিভাগের উর্বর মাটি (টপসয়েল) কাটা বা ইটভাটায় সরবরাহ করা বা নিচু জমি ভরাট করা দণ্ডনীয় অপরাধ; সাজা অনধিক ২ বছর কারাদণ্ড বা অর্থদণ্ড।",
    enCaution: "Under Section 19(1), offenses under Section 13 are cognizable, bailable, and compoundable. Only Sections 4 and 5 are non-bailable under this Act.",
    bnCaution: "ধারা ১৯(১) অনুযায়ী এই অপরাধ আমলযোগ্য (cognizable), তবে জামিনযোগ্য (bailable) ও আপোষযোগ্য (compoundable)। কেবলমাত্র ধারা ৪ ও ৫ এর অপরাধ অ-জামিনযোগ্য।",
    keywords: ["topsoil cutting penalty", "matir uporistor korton", "agricultural land soil cutting", "টপসয়েল কাটা", "ধারা ১৩"]
  },
  14: {
    enTitle: "Preventive Measures against Imminent Land Crimes",
    bnTitle: "অপরাধ প্রতিরোধে ব্যবস্থা",
    enExp: "Empowers the Executive Magistrate or law enforcement to intervene, seize machinery, issue stop-work orders, or take preventive action when offenses under Sections 11, 12, or 13 are being committed.",
    bnExp: "ধারা ১১, ১২ বা ১৩ এর অধীন কোনো অপরাধমূলক কার্য চললে নির্বাহী ম্যাজিস্ট্রেট বা ক্ষমতাপ্রাপ্ত কর্তৃপক্ষ কাজ বন্ধের নির্দেশ, যন্ত্রপাতি জব্দ বা তাৎক্ষণিক প্রতিরোধমূলক ব্যবস্থা গ্রহণ করতে পারেন।",
    enCaution: "Urgent administrative injunctions and equipment seizure can be solicited from the Assistant Commissioner (Land) or Executive Magistrate.",
    bnCaution: "জরুরি ক্ষেত্রে সহকারী কমিশনার (ভূমি) বা নির্বাহী ম্যাজিস্ট্রেটের নিকট তাৎক্ষণিক ভ্রাম্যমাণ আদালত পরিচালনা ও মালামাল জব্দের আবেদন করা যায়।",
    keywords: ["preventive land orders", "oporadh protirodh bebostha", "equipment seizure land", "অপরাধ প্রতিরোধ ব্যবস্থা", "ধারা ১৪"]
  },
  15: {
    enTitle: "Penalty for Disobeying Restoration or Preventive Orders",
    bnTitle: "আদেশ অমান্যে দণ্ড",
    enExp: "Punishes any person who willfully disobeys, obstructs, or violates any order passed under Section 8 (possession restoration) or Section 14 (preventive order), with imprisonment up to 1 year or fine or both.",
    bnExp: "ধারা ৮ এর অধীন দখল প্রত্যর্পণ বা ধারা ১৪ এর অধীন কাজ বন্ধের কোনো সরকারি বা বিচারিক আদেশ ইচ্ছাকৃতভাবে লঙ্ঘন করলে অনধিক ১ বছর কারাদণ্ড বা অর্থদণ্ড বা উভয় দণ্ড প্রযোজ্য।",
    enCaution: "Cognizable, bailable, and compoundable under Section 19(1). Under Section 22, Section 15 is excluded from Mobile Court jurisdiction and must be tried by a Judicial Magistrate.",
    bnCaution: "ধারা ১৯(১) অনুযায়ী এই অপরাধ আমলযোগ্য, জামিনযোগ্য ও আপোষযোগ্য। তবে ধারা ২২ অনুযায়ী ধারা ১৫ মোবাইল কোর্টের এখতিয়াবহির্ভূত; বিচারিক ম্যাজিস্ট্রেট আদালতে বিচার্য।",
    keywords: ["disobeying land order", "adesh omanyo dondo", "breach of possession order", "আদেশ অমান্য দণ্ড", "ধারা ১৫"]
  },
  16: {
    enTitle: "Penalty for Abetment, Conspiracy, or Assistance",
    bnTitle: "অপরাধ সংঘটনে সহায়তা বা প্ররোচনার দণ্ড",
    enExp: "Provides that anyone who aids, abets, conspires, or facilitates the commission of any land crime under this Act shall be punished with the same penalty provided for the principal offense.",
    bnExp: "এই আইনের অধীন কোনো অপরাধ সংঘটনে সহায়তা, পরামর্শ, যোগসাজশ বা প্ররোচনা প্রদানকারী ব্যক্তি মূল অপরাধীর সমান দণ্ডে দণ্ডিত হবেন।",
    enCaution: "Deed writers, brokers, fake identifiers, and public servants colluding in land forgery face equal statutory penalties as principal perpetrators.",
    bnCaution: "ভুয়া দলিল লেখক, দালাল, ভুয়া সনাক্তকারী বা সরকারি কর্মকর্তা-কর্মচারী অপরাধে সহযোগিতা করলে মূল অপরাধের সমান সাজা পাবেন।",
    keywords: ["land crime abetment", "shohayota prorochona", "deed writer collusion", "সহায়তা ও প্ররোচনা", "ধারা ১৬"]
  },
  17: {
    enTitle: "Enhanced Penalty for Repeat Land Offenses",
    bnTitle: "অপরাধ পুনঃসংঘটনের দণ্ড",
    enExp: "Provides enhanced punishment for repeat offenders: a person previously convicted under any section who commits an offense again under this Act shall be liable to double the maximum punishment.",
    bnExp: "এই আইনের কোনো অপরাধে একবার দণ্ডিত হওয়ার পর পুনরায় একই বা অন্য কোনো অপরাধ সংঘটন করলে সর্বোচ্চ নির্ধারিত সাজার দ্বিগুণ দণ্ডে দণ্ডিত হবেন।",
    enCaution: "Repeat offense trials are excluded from Mobile Court (Section 22) and must be adjudicated by Judicial Magistrates. Certified conviction copies must be submitted.",
    bnCaution: "ধারা ২২ অনুযায়ী ধারা ১৭ এর বিচার মোবাইল কোর্ট করতে পারে না; এটি বিচারিক ম্যাজিস্ট্রেটের নিয়মিত আদালতে বিচার্য। পূর্ববর্তী সাজার রায় ও নথি নালিশে যুক্ত করুন।",
    keywords: ["repeat land crime", "punoh songghoton dondo", "recidivism double penalty", "পুনঃসংঘটন দণ্ড", "ধারা ১৭"]
  },
  18: {
    enTitle: "Offenses Committed by Companies and Corporate Entities",
    bnTitle: "কোম্পানি কর্তৃক অপরাধ সংঘটন",
    enExp: "Governs corporate liability: where an offense is committed by a company, developer, or firm, every director, manager, or officer consenting to or neglecting the offense shall be deemed guilty alongside the entity.",
    bnExp: "কোনো ডেভেলপার কোম্পানি বা ফার্ম কর্তৃক ভূমি অপরাধ সংঘটিত হলে উক্ত কোম্পানির প্রত্যেক পরিচালক, ম্যানেজার বা সংশ্লিষ্ট কর্মকর্তা ব্যক্তিগতভাবে দায়ী ও দণ্ডিত হবেন।",
    enCaution: "Complainants should explicitly name specific directors, managing agents, and officers with executive authority alongside the corporate entity.",
    bnCaution: "আবাসন বা ডেভেলপার কোম্পানির ক্ষেত্রে কোম্পানির পাশাপাশি পরিচালনা পর্ষদের দায়িত্বশীল ব্যক্তিদের নামীয়ভাবে বিবাদী করা আইনি কৌশল।",
    keywords: ["company land offense", "corporate land grabbing", "developer fraud liability", "কোম্পানি অপরাধ", "ধারা ১৮"]
  },
  19: {
    enTitle: "Trial Procedure, Cognizability, Bailability, and 180-Day Trial Limitation",
    bnTitle: "অপরাধের বিচার",
    enExp: "Prescribes that offenses are triable by 1st Class Judicial Magistrate or Metropolitan Magistrate; Sec 4 & 5 are cognizable and non-bailable; all other sections are cognizable, bailable, and compoundable; trial must conclude within 180 days.",
    bnExp: "প্রথম শ্রেণির জুডিসিয়াল ম্যাজিস্ট্রেট বা মেট্রোপলিটন ম্যাজিস্ট্রেট কর্তৃক বিচার্য; ধারা ৪ ও ৫ আমলযোগ্য ও অ-জামিনযোগ্য; অবশিষ্ট অপরাধসমূহ আমলযোগ্য, জামিনযোগ্য ও আপোষযোগ্য; মামলা প্রাপ্তির ১৮০ দিনের মধ্যে বিচার সমাপ্ত করতে হবে।",
    enCaution: "Mandatory 180-day trial deadline extendable only once by 90 days with recorded written reasons. Sections 4 & 5 are strictly non-bailable; all other sections are bailable.",
    bnCaution: "১৮০ দিনের মধ্যে বিচার সমাপ্ত না হলে ম্যাজিস্ট্রেট কারণ লিপিবদ্ধ করে অনধিক ৯০ দিন সময় বাড়াতে পারেন। ১৮০ দিন অতিক্রান্ত হলে রিট বা উচ্চ আদালতে দ্রুত নিষ্পত্তির আবেদন করা যায়।",
    keywords: ["trial procedure land crime", "180 days trial limitation", "bailable non-bailable land", "অপরাধের বিচার ১৮০ দিন", "ধারা ১৯"]
  },
  20: {
    enTitle: "Award of Compensation and Restoration Costs to Victims",
    bnTitle: "ক্ষতিপূরণ ও প্রতিকার",
    enExp: "Empowers the criminal court, in addition to imposing punishment, to order the convict to pay fair financial compensation, damages, and restoration costs to the aggrieved victim.",
    bnExp: "ফৌজদারি আদালত দোষীকে কারাদণ্ড বা জরিমানার পাশাপাশি সংক্ষুব্ধ পক্ষকে ক্ষতিপূরণ ও পুনর্বাসন খরচ প্রদানের নির্দেশ দিতে পারেন।",
    enCaution: "Submit quantified schedules of financial losses, demolition costs, and litigation expenses during trial to facilitate statutory compensation awards.",
    bnCaution: "ক্ষতিপূরণের টাকা অনাদায়ে অর্থদণ্ড আদায়ের দেওয়ানি পদ্ধতি বা অতিরিক্ত কারাদণ্ড কার্যকর হতে পারে। আবেদনের সময় আর্থিক ক্ষতির সুনির্দিষ্ট হিসাব দাখিল করুন।",
    keywords: ["victim compensation land", "khotipuron protikar", "restitution land grab", "ক্ষতিপূরণ ও প্রতিকার", "ধারা ২০"]
  },
  21: {
    enTitle: "Protection of Witnesses and Complainants",
    bnTitle: "সাক্ষীর সুরক্ষা",
    enExp: "Empowers the court to provide necessary legal, administrative, and physical security to witnesses and complainants facing threats, coercion, or intimidation from land grabbers.",
    bnExp: "ভূমি দখলকারী বা প্রভাবশালী আসামিদের হুমকি বা ভীতি প্রদর্শনের মুখে আদালত সংক্ষুব্ধ ব্যক্তি বা সাক্ষীদের সার্বিক নিরাপত্তা নিশ্চিতের নির্দেশ দিতে পারেন।",
    enCaution: "Immediate protective police escort and confidential testimony provisions can be petitioned before the trial court upon apprehension of violence.",
    bnCaution: "সাক্ষী বা বাদী হুমকির সম্মুখীন হলে তাৎক্ষণিক আদালতের নজরে এনে পুলিশ সুরক্ষার আদেশ প্রার্থনা করতে পারেন।",
    keywords: ["witness protection land", "shakkhir shurokkha", "complainant safety", "সাক্ষীর সুরক্ষা", "ধারা ২১"]
  },
  22: {
    enTitle: "Jurisdiction of Mobile Court",
    bnTitle: "মোবাইল কোর্ট কর্তৃক বিচার্য",
    enExp: "Authorizes Mobile Courts under the Mobile Court Act, 2009 to summarily try all offenses under this Act EXCEPT Sections 4, 5, 15, and 17.",
    bnExp: "মোবাইল কোর্ট আইন ২০০৯-এর আওতায় ধারা ৪, ৫, ১৫ ও ১৭ ব্যতীত এই আইনের অন্যান্য সকল অপরাধ নির্বাহী ম্যাজিস্ট্রেট পরিচালিত মোবাইল কোর্টে বিচারযোগ্য।",
    enCaution: "Sections 4 (fraud), 5 (forgery), 15 (disobedience), and 17 (repeat offense) CANNOT be tried by Mobile Courts and must proceed before Judicial Magistrates.",
    bnCaution: "গুরুতর ভূমি জালিয়াতি (ধারা ৫), ভূমি প্রতারণা (ধারা ৪), আদেশ অমান্য (ধারা ১৫) ও পুনঃসংঘটন (ধারা ১৭) মোবাইল কোর্টের বিচার্য নয়; এগুলো নিয়মিত বিচারিক আদালতে দায়ের করতে হবে।",
    keywords: ["mobile court land crimes", "executive magistrate mobile court", "summary land trial", "মোবাইল কোর্ট বিচার্য", "ধারা ২২"]
  },
  23: {
    enTitle: "Integrated National Land Database and Record Digitalization",
    bnTitle: "ভূমির তথ্য সম্বলিত সমন্বিত ডাটাবেজ প্রস্তুতকরণ",
    enExp: "Mandates the Government to create an integrated national digital database containing all public lands, disputed properties, court decrees, and ownership records to eradicate fraudulent mutations.",
    bnExp: "জালিয়াতি ও প্রতারণা রোধে সরকারি স্বার্থযুক্ত জমি, বিচারাধীন মামলা ও নামজারির তথ্য সমন্বিত জাতীয় ডিজিটাল ডাটাবেজ প্রস্তুতকরণের আইনি বাধ্যবাধকতা।",
    enCaution: "Always cross-verify mutation entries, khatian details, and encumbrance certificates via the national digital land portal before transacting.",
    bnCaution: "অনলাইন ভূমি সেবা প্ল্যাটফর্মে খতিয়ান ও নামজারির ডিজিটাল রেকর্ড পরীক্ষা করে জমি ক্রয় করা আইনত নিরাপদ।",
    keywords: ["integrated land database", "somonnito database", "digital land records", "সমন্বিত ডাটাবেজ", "ধারা ২৩"]
  },
  24: {
    enTitle: "Assistance from Law Enforcement and Statutory Agencies",
    bnTitle: "সংস্থা বা প্রতিষ্ঠানের সহায়তা",
    enExp: "Obligates police, local government bodies, and administrative authorities to render all necessary operational assistance to authorities executing enforcement duties under this Act.",
    bnExp: "এই আইনের অধীন উচ্ছেদ, সীমানা রক্ষা বা তদন্ত পরিচালনায় সংশ্লিষ্ট কর্তৃপক্ষকে সহায়তা দিতে পুলিশ ও আইনশৃঙ্খলা রক্ষাকারী বাহিনী আইনত বাধ্য।",
    enCaution: "Executive Magistrates and enforcement officers can requisition armed police personnel to execute eviction and restoration decrees.",
    bnCaution: "ম্যাজিস্ট্রেটের আদেশ তামিলকালে পুলিশ ফোর্স প্রাপ্তির জন্য জেলা পুলিশ প্রশাসনের মাধ্যমে রিজার্ভ ফোর্সের সহায়তা চাওয়া যায়।",
    keywords: ["law enforcement assistance", "police shohayota", "agency assistance eviction", "সংস্থার সহায়তা", "ধারা ২৪"]
  },
  25: {
    enTitle: "Removal of Legal Difficulties and Ambiguities",
    bnTitle: "অস্পষ্টতা দূরীকরণ",
    enExp: "Empowers the Government, by gazette order within two years of enactment, to make necessary provisions not inconsistent with the Act to remove practical difficulties in implementation.",
    bnExp: "আইন কার্যকর করতে কোনো অস্পষ্টতা বা অসুবিধা দেখা দিলে সরকার গেজেট প্রজ্ঞাপন দ্বারা ব্যাখ্যামূলক আদেশ জারি করতে পারবে।",
    enCaution: "Government executive clarifications cannot dilute or override explicit statutory rights guaranteed under the primary Act.",
    bnCaution: "মন্ত্রণালয়ের সার্কুলার বা প্রজ্ঞাপন মূল আইনের বিধিবদ্ধ কাঠামোর সঙ্গে সঙ্গতিপূর্ণ হতে হবে।",
    keywords: ["removal of difficulties", "oshposthota durikoron", "executive clarification", "অস্পষ্টতা দূরীকরণ", "ধারা ২৫"]
  },
  26: {
    enTitle: "Power to Make Rules",
    bnTitle: "বিধি প্রণয়নের ক্ষমতা",
    enExp: "Empowers the Government to make rules by official gazette notification for carrying out the objectives and procedural mechanisms of this Act.",
    bnExp: "এই আইনের উদ্দেশ্য বাস্তবায়ন ও পদ্ধতিগত প্রক্রিয়া সুনির্দিষ্ট করার লক্ষ্যে সরকার সরকারি গেজেটে প্রজ্ঞাপন দ্বারা বিধি প্রণয়ন করতে পারবে।",
    enCaution: "Primary statutory provisions remain directly enforceable notwithstanding whether comprehensive subordinate rules have been notified.",
    bnCaution: "বিধি প্রণীত না হওয়া পর্যন্ত আইনের প্রাথমিক বিধানাবলী সরাসরি কার্যকর থাকবে।",
    keywords: ["power to make rules", "bidhi pronoyon khomota", "subordinate legislation", "বিধি প্রণয়ন", "ধারা ২৬"]
  },
  27: {
    enTitle: "Publication of Authentic English Translation",
    bnTitle: "ইংরেজিতে অনূদিত পাঠ প্রকাশ",
    enExp: "Mandates publication of an authentic English text of the Act, provided that in case of conflict between Bengali and English versions, the Bengali text prevails.",
    bnExp: "সরকার এই আইনের একটি নির্ভরযোগ্য ইংরেজিতে অনূদিত পাঠ প্রকাশ করবে; তবে বাংলা ও ইংরেজি পাঠের মধ্যে বিরোধ দেখা দিলে বাংলা পাঠ প্রাধান্য পাবে।",
    enCaution: "In legal proceedings and judicial interpretation, the original Bengali text is legally authentic and authoritative.",
    bnCaution: "আইনগত বিরোধ ও আদালতের ব্যাখ্যায় বাংলা পাঠই প্রামাণ্য ও চূড়ান্ত হিসেবে গৃহীত হবে।",
    keywords: ["authentic english translation", "engrejite onubad", "bengali text prevails", "অনূদিত পাঠ", "ধারা ২৭"]
  }
};

const provisions = [];

for (const raw of rawExtracted) {
  const secNum = raw.secIndex;
  const meta = sectionMeta[secNum];
  if (!meta) {
    console.error(`Missing metadata for section ${secNum}`);
    continue;
  }

  const id = `land-crime-${secNum}`;
  const sectionNumber = `Section ${secNum}`;
  const titleBn = `${meta.bnTitle} (ধারা ${secNum})`;
  const titleEn = `${meta.enTitle} (Section ${secNum})`;

  const cleanedOriginalText = cleanText(raw.text);

  const provision = {
    id,
    actId: 'act_land_crime_2023',
    sectionNumber,
    categories: ['land', 'threats'],
    title: {
      bn: titleBn,
      en: titleEn
    },
    originalText: cleanedOriginalText,
    originalLanguage: 'bn',
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
    effectiveDate: '2023-09-18',
    legalStatus: 'active',
    reviewStatus: 'verified',
    contentHash: '',
    keywords: [
      ...meta.keywords,
      `ধারা ${secNum}`,
      `section ${secNum}`,
      `land crime ${secNum}`,
      `ভূমি অপরাধ ধারা ${secNum}`,
      `land crime act 2023`,
      'ভূমি অপরাধ আইন',
      ...([4, 5, 7, 8].includes(secNum) ? ['land grabbing', 'ভূমি দখল'] : [])
    ]
  };

  provisions.push(provision);
}

fs.writeFileSync('scripts/land_crime_2023_all.json', JSON.stringify(provisions, null, 2), 'utf8');
console.log(`Generated all ${provisions.length} provisions for Land Crime Prevention and Redress Act, 2023`);
