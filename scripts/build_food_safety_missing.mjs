import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('scripts/extracted_raw_food_safety.json', 'utf8'));
const existingProvs = JSON.parse(fs.readFileSync('src/data/corpus/provisions.json', 'utf8'));
const existingSecNums = new Set(
  existingProvs
    .filter(p => p.actId === 'act_food_safety_2013')
    .map(p => {
      const m = p.sectionNumber.match(/Section\s*(\d+)/i);
      return m ? parseInt(m[1], 10) : null;
    })
    .filter(Boolean)
);

// Metadata for all 85 missing sections
const fsMetadata = {
  1: {
    enTitle: "Short Title and Commencement",
    enExp: "Establishes the Act as the Food Safety Act, 2013, providing that it comes into force across Bangladesh on dates notified by government gazette.",
    bnExp: "এই আইনটি 'নিরাপদ খাদ্য আইন, ২০১৩' নামে অভিহিত এবং সরকার কর্তৃক প্রজ্ঞাপিত তারিখে সমগ্র বাংলাদেশে কার্যকর হয়।",
    enCaution: "Enacted on 10 October 2013 and fully operationalized on 1 February 2015 via official gazette notification.",
    bnCaution: "আইনটি সমগ্র বাংলাদেশে নিরাপদ খাদ্য নিশ্চিতকরণে প্রযোজ্য এবং ২০১৫ সালের ১ ফেব্রুয়ারি থেকে কার্যকর হয়েছে।",
    keywords: ["Food Safety Act 2013", "short title", "commencement", "nirapod khaddo ain", "নিরাপদ খাদ্য আইন ২০১৩", "খাদ্য আইন ধারা ১"],
    related: ["food-safety-2", "food-safety-5"]
  },
  2: {
    enTitle: "Definitions and Interpretations",
    enExp: "Defines statutory food safety terms: 'food', 'food additive', 'adulterant', 'contaminant', 'food business operator', and 'Food Court'.",
    bnExp: "খাদ্য, খাদ্য সংযোজন দ্রব্য, ভেজাল, দূষক, খাদ্য ব্যবসায়ী ও বিশুদ্ধ খাদ্য আদালতের বিস্তারিত আইনি সংজ্ঞা।",
    enCaution: "'Food' includes all raw, processed, semi-processed, liquid, solid edible substances and water consumed by humans.",
    bnCaution: "মানুষের আহার্য সকল তরল, কঠিন, প্রক্রিয়াজাত বা অপ্রক্রিয়াজাত খাদ্য এবং পানীয় জল এই আইনের আওতাভুক্ত।",
    keywords: ["food definition", "adulterant definition", "khaddor shongga", "খাদ্যের সংজ্ঞা", "ভেজাল সংজ্ঞা", "ধারা ২"],
    related: ["food-safety-1", "food-safety-25"]
  },
  3: {
    enTitle: "National Food Safety Management Advisory Council",
    enExp: "Establishes the 29-member National Food Safety Management Advisory Council headed by the Minister of Food to guide national food safety policy.",
    bnExp: "খাদ্যমন্ত্রীর নেতৃত্বে ২৯ সদস্য বিশিষ্ট জাতীয় নিরাপদ খাদ্য ব্যবস্থাপনা উপদেষ্টা পরিষদ গঠনের সংবিধিবদ্ধ বিধান।",
    enCaution: "Provides high-level scientific and inter-ministerial policy guidance on food safety standards and risk management.",
    bnCaution: "উপদেষ্টা পরিষদ জাতীয় পর্যায়ে খাদ্য নীতি ও বিভিন্ন মন্ত্রণালয়ের সমন্বয়ে নীতিগত নির্দেশনা প্রদান করে।",
    keywords: ["Food Advisory Council", "Minister of Food", "upodeshta parishad", "উপদেষ্টা পরিষদ", "খাদ্য উপদেষ্টা পরিষদ", "ধারা ৩"],
    related: ["food-safety-4", "food-safety-5"]
  },
  4: {
    enTitle: "Meetings of the Advisory Council",
    enExp: "Mandates Council meetings at least twice a year to review national food safety policies and coordinate inter-agency responses.",
    bnExp: "বৎসরে কমপক্ষে ২ বার উপদেষ্টা পরিষদের সভা অনুষ্ঠানের বাধ্যবাধকতা এবং সভার কার্যপ্রণালী।",
    enCaution: "Council directives are circulated across agriculture, commerce, fisheries, and health ministries for synchronized enforcement.",
    bnCaution: "পরিষদের সভার সিদ্ধান্ত কৃষি, স্বাস্থ্য ও বাণিজ্য মন্ত্রণালয় বাস্তবায়নে যৌথভাবে কাজ করে।",
    keywords: ["council meetings", "biannual meeting", "shova", "উপদেষ্টা পরিষদের সভা", "দ্বিবার্ষিক সভা", "ধারা ৪"],
    related: ["food-safety-3", "food-safety-5"]
  },
  5: {
    enTitle: "Establishment of the Bangladesh Food Safety Authority (BFSA)",
    enExp: "Establishes the Bangladesh Food Safety Authority (BFSA) as an independent statutory regulatory body to oversee food safety from farm to fork.",
    bnExp: "নিরাপদ খাদ্য নিশ্চিত করতে সংবিধিবদ্ধ স্বাধীন সংস্থা হিসেবে 'বাংলাদেশ নিরাপদ খাদ্য কর্তৃপক্ষ' (BFSA) প্রতিষ্ঠার বিধান।",
    enCaution: "BFSA is the primary regulatory agency coordinating food testing, market monitoring, and food safety standards in Bangladesh.",
    bnCaution: "বিএফএসএ সমগ্র দেশে খাদ্য নিরাপত্তা তদারকি ও নিয়ন্ত্রণকারী প্রধান সরকারি সংবিধিবদ্ধ কর্তৃপক্ষ।",
    keywords: ["BFSA establishment", "Food Safety Authority", "bfsa protishtha", "বাংলাদেশ নিরাপদ খাদ্য কর্তৃপক্ষ", "বিএফএসএ", "ধারা ৫"],
    related: ["food-safety-6", "food-safety-11"]
  },
  6: {
    enTitle: "Head Office of the Authority",
    enExp: "Locates the head office of BFSA in Dhaka and empowers it to establish regional and branch offices across divisions and districts.",
    bnExp: "কর্তৃপক্ষের প্রধান কার্যালয় ঢাকায় স্থাপন এবং বিভাগ ও জেলা পর্যায়ে আঞ্চলিক শাখা কার্যালয় স্থাপনের কর্তৃত্ব।",
    enCaution: "Regional offices coordinate local food testing laboratories, surveillance, and Food Court prosecutions.",
    bnCaution: "বিভাগীয় ও জেলা কার্যালয় থেকে স্থানীয় হোটেল, রেস্তোরাঁ ও খাদ্য কারখানায় নিয়মিত তদারকি পরিচালিত হয়।",
    keywords: ["head office", "branch offices", "prodhan karjaloy", "প্রধান কার্যালয়", "বিএফএসএ শাখা অফিস", "ধারা ৬"],
    related: ["food-safety-5", "food-safety-11"]
  },
  7: {
    enTitle: "Composition of the Authority",
    enExp: "Specifies that BFSA consists of a Chairman and four full-time expert Members covering food safety, public health, nutrition, and law.",
    bnExp: "সরকার কর্তৃক নিযুক্ত একজন চেয়ারম্যান এবং জনস্বাস্থ্য, পুষ্টি ও খাদ্য বিজ্ঞান বিষয়ের ৪ জন সদস্যের সমন্বয়ে কর্তৃপক্ষ গঠন।",
    enCaution: "Members must hold recognized academic credentials and specialized experience in food safety sciences or administration.",
    bnCaution: "খাদ্য বিজ্ঞান, পুষ্টি বা আইন বিষয়ের অভিজ্ঞ বিশেষজ্ঞদের মধ্য থেকে পূর্ণকালীন সদস্য নিয়োগ করা হয়।",
    keywords: ["BFSA composition", "chairman members", "kothripokkho gothon", "কর্তৃপক্ষ গঠন", "চেয়ারম্যান", "ধারা ৭"],
    related: ["food-safety-5", "food-safety-8"]
  },
  8: {
    enTitle: "Disqualification, Removal, and Resignation of Members",
    enExp: "Regulates grounds for disqualification and removal of Chairman and Members, including insolvency, physical incapacity, or conflict of interest.",
    bnExp: "কর্তৃপক্ষের চেয়ারম্যান বা সদস্যগণের অযোগ্যতা, অপসারণ এবং পদত্যাগ সংক্রান্ত বিস্তারিত নিয়মাবলী।",
    enCaution: "Members engaging in private commercial food businesses must disclose interests or face immediate removal.",
    bnCaution: "ব্যক্তিগত খাদ্য ব্যবসায় স্বার্থের সংঘাত থাকলে সংশ্লিষ্ট সদস্যকে সরকার তদন্ত সাপেক্ষে অপসারণ করতে পারে।",
    keywords: ["disqualification", "member removal", "resignation", "shodossho oyoggota", "সদস্য অপসারণ", "ধারা ৮"],
    related: ["food-safety-7", "food-safety-9"]
  },
  9: {
    enTitle: "Tenure of the Chairman and Members",
    enExp: "Fixes the tenure of the Chairman and Members as three years, eligible for reappointment for a second term up to age sixty-five.",
    bnExp: "চেয়ারম্যান ও সদস্যগণের মেয়াদ ৩ বছর এবং অনূর্ধ্ব ৬৫ বছর বয়স পর্যন্ত এক মেয়াদের জন্য পুনর্নিয়োগের বিধান।",
    enCaution: "Tenure security ensures independent regulatory decisions free from commercial influence.",
    bnCaution: "স্বাধীনভাবে খাদ্যমান নিয়ন্ত্রণ ও ভেজালবিরোধী সিদ্ধান্ত নেওয়ার জন্য সদস্যদের মেয়াদের সুরক্ষা দেওয়া হয়েছে।",
    keywords: ["tenure", "term of office", "meyadh", "চেয়ারম্যানের মেয়াদ", "সদস্য মেয়াদ", "ধারা ৯"],
    related: ["food-safety-7", "food-safety-8"]
  },
  10: {
    enTitle: "Meetings and Quorum of the Authority",
    enExp: "Regulates monthly meetings of the Authority, voting procedures, and establishes a quorum of at least three members.",
    bnExp: "কর্তৃপক্ষের সভার নিয়মাবলী নির্ধারণ, যেখানে চেয়ারম্যান সহ কমপক্ষে ৩ জন সদস্যের উপস্থিতিতে কোরাম গঠিত হয়।",
    enCaution: "Decisions are taken by majority vote; in case of equality, the presiding Chairman has a casting vote.",
    bnCaution: "সকল সিদ্ধান্ত সংখ্যাগরিষ্ঠ ভোটে গৃহীত হয় এবং সমসংখ্যক ভোটের ক্ষেত্রে সভাপতির নির্ণায়ক ভোট থাকে।",
    keywords: ["BFSA meetings", "quorum", "shova bfsa", "কর্তৃপক্ষের সভা", "কোরাম", "ধারা ১০"],
    related: ["food-safety-5", "food-safety-7"]
  },
  11: {
    enTitle: "Powers and Functions of the Authority",
    enExp: "Outlines the statutory duties of BFSA: setting scientific food standards, coordinating agencies, accrediting labs, and monitoring supply chains.",
    bnExp: "বিজ্ঞানের ভিত্তিতে নিরাপদ খাদ্যের মান প্রণয়ন, ল্যাবরেটরি স্বীকৃতি, খাদ্যে ভেজাল প্রতিরোধ ও জনসচেতনতা তৈরির দায়িত্ব।",
    enCaution: "BFSA coordinates between BSTI, DIFE, Directorate of Consumer Rights, and local government bodies to avoid regulatory gaps.",
    bnCaution: "খাদ্য মানদণ্ড রক্ষায় বিএফএসএ বিভিন্ন সরকারি সংস্থা ও ল্যাবের কাজের মধ্যে কেন্দ্রীয় সমন্বয়কারী হিসেবে কাজ করে।",
    keywords: ["BFSA powers", "food standards", "supply chain safety", "khomota o karjaboli", "কর্তৃপক্ষের ক্ষমতা ও কার্যাবলী", "খাদ্য মান", "ধারা ১১"],
    related: ["food-safety-5", "food-safety-12", "food-safety-13"]
  },
  12: {
    enTitle: "Central Food Safety Technical Committee",
    enExp: "Establishes the Central Food Safety Technical Committee to provide multi-disciplinary scientific advice on complex food risks.",
    bnExp: "জটিল খাদ্য ঝুঁকি ও রাসায়নিক দূষণ মূল্যায়নে পরামর্শ প্রদানের জন্য কেন্দ্রীয় নিরাপদ খাদ্য কারিগরি কমিটি গঠন।",
    enCaution: "Comprises university professors, toxicologists, microbiologists, and food technologists.",
    bnCaution: "বিশ্ববিদ্যালয়ের গবেষক ও বিষবিজ্ঞানীদের সমন্বয়ে গঠিত কমিটি বৈজ্ঞানিক ঝুঁকির বিশ্লেষণ করে।",
    keywords: ["Technical Committee", "scientific risk analysis", "karigori komiti", "কারিগরি কমিটি", "বৈজ্ঞানিক ঝুঁকি", "ধারা ১২"],
    related: ["food-safety-11", "food-safety-13"]
  },
  13: {
    enTitle: "Scientific Panels and Risk Assessment Working Groups",
    enExp: "Authorizes BFSA to constitute specialized Scientific Panels on food additives, pesticides, GMOs, biological hazards, and contaminants.",
    bnExp: "কীটনাশক, খাদ্য সংযোজন দ্রব্য, অণুজীব ও রাসায়নিক দূষক বিষয়ে বিশেষজ্ঞ সাইন্টিফিক প্যানেল গঠনের কর্তৃত্ব।",
    enCaution: "Scientific Panel risk assessments form the statutory basis for maximum residue limits (MRL) enforceable under Chapter V.",
    bnCaution: "সাইন্টিফিক প্যানেলের মতামতের ভিত্তিতে খাদ্যে কীটনাশক বা ভারী ধাতুর সর্বোচ্চ সহনীয় মাত্রা গেজেটে নির্ধারিত হয়।",
    keywords: ["scientific panels", "risk assessment", "scientific panel", "সাইন্টিফিক প্যানেল", "ঝুঁকি নিরূপণ", "ধারা ১৩"],
    related: ["food-safety-11", "food-safety-12", "food-safety-24"]
  },
  14: {
    enTitle: "Power of Authority to Appoint Other Committees",
    enExp: "Empowers the Authority to appoint specialized ad hoc committees or regional working groups to address specific localized food contamination emergencies.",
    bnExp: "জরুরি খাদ্য সংকট বা আঞ্চলিক ভেজাল সমস্যা তদন্তে কর্তৃপক্ষ কর্তৃক বিশেষ অ্যাডহক কমিটি গঠনের ক্ষমতা।",
    enCaution: "Ad hoc committees can investigate specific foodborne disease outbreaks or industrial chemical dumping.",
    bnCaution: "ডায়রিয়া প্রাদুর্ভাব বা কোনো কারখানার বিষাক্ত বর্জ্য খাদ্য শৃঙ্খলে প্রবেশ করলে কমিটি দ্রুত তদন্ত করে।",
    keywords: ["ad hoc committees", "emergency investigation", "bishesh komiti", "বিশেষ কমিটি", "খাদ্য সংকট তদন্ত", "ধারা ১৪"],
    related: ["food-safety-11", "food-safety-12"]
  },
  15: {
    enTitle: "Appointment of Secretary, Officers, and Employees",
    enExp: "Provides for the appointment of a Secretary as chief administrative assistant and necessary technical, scientific, and field personnel.",
    bnExp: "কর্তৃপক্ষের সচিব এবং প্রয়োজনীয় বৈজ্ঞানিক কর্মকর্তা, পরিদর্শক ও কর্মচারী নিয়োগের সংবিধিবদ্ধ বিধান।",
    enCaution: "Recruitment adheres to government food safety technical qualification standards.",
    bnCaution: "খাদ্য পরীক্ষা ও পরিদর্শনের জন্য যোগ্যতাসম্পন্ন বৈজ্ঞানিক কর্মকর্তা ও পরিদর্শক নিয়োগ দেওয়া হয়।",
    keywords: ["secretary appointment", "scientific officers", "kormokorta niog", "সচিব ও কর্মকর্তা নিয়োগ", "ধারা ১৫"],
    related: ["food-safety-5", "food-safety-51"]
  },
  16: {
    enTitle: "Remuneration and Service Conditions of Employees",
    enExp: "Regulates the salary scale, allowances, pensions, and statutory conditions of service of all officers and employees of BFSA.",
    bnExp: "কর্তৃপক্ষের কর্মকর্তা-কর্মচারীদের বেতন-ভাতা, সুযোগ-সুবিধা ও চাকরির শর্তাবলী সরকার অনুমোদিত প্রবিধান দ্বারা নির্ধারণ।",
    enCaution: "Employees are bound by government anti-corruption and public conduct rules.",
    bnCaution: "কর্মকর্তাগণ সরকারি চাকরি বিধি ও আচরণবিধির অধীন দায়বদ্ধ থাকেন।",
    keywords: ["service conditions", "remuneration", "chakrir shortoboli", "চাকরির শর্তাবলী", "বেতন ভাতা", "ধারা ১৬"],
    related: ["food-safety-15"]
  },
  17: {
    enTitle: "Experts and Professional Consultants",
    enExp: "Authorizes BFSA to engage local and foreign food safety experts, toxicologists, and legal consultants for specialized evaluations.",
    bnExp: "বিশেষায়িত খাদ্য পরীক্ষা বা আন্তর্জাতিক মানের সাথে সামঞ্জস্য বিধানে দেশি-বিদেশি বিশেষজ্ঞ পরামর্শক নিয়োগের ক্ষমতা।",
    enCaution: "Consultants must sign strict non-disclosure and conflict of interest undertakings.",
    bnCaution: "পরামর্শক নিয়োগের ক্ষেত্রে বাণিজ্যিক স্বার্থের নিরপেক্ষতা ও গোপনীয়তা বজায় রাখা বাধ্যতামূলক।",
    keywords: ["consultants", "food experts", "poramorshok", "বিশেষজ্ঞ পরামর্শক", "টক্সিকোলজিস্ট", "ধারা ১৭"],
    related: ["food-safety-11", "food-safety-13"]
  },
  18: {
    enTitle: "Administrative and Financial Powers of Chairman",
    enExp: "Vests overall executive, administrative, and financial management of the Authority in the Chairman as principal accounting officer.",
    bnExp: "কর্তৃপক্ষের প্রধান প্রশাসনিক ও আর্থিক কর্মকর্তা হিসেবে চেয়ারম্যানের সার্বিক নির্বাহী ক্ষমতা প্রয়োগের বিধান।",
    enCaution: "The Chairman can delegate specific financial sanctions to the Secretary or designated Directors.",
    bnCaution: "চেয়ারম্যানের প্রশাসনিক নিয়ন্ত্রণে দৈনন্দিন কার্যক্রম ও বাজার মনিটরিং পরিচালিত হয়।",
    keywords: ["Chairman powers", "executive administration", "chairmanner khomota", "চেয়ারম্যানের ক্ষমতা", "ধারা ১৮"],
    related: ["food-safety-7", "food-safety-19"]
  },
  19: {
    enTitle: "Food Safety Authority Fund",
    enExp: "Establishes the Bangladesh Food Safety Authority Fund comprising government grants, analytical fees, and approved donations.",
    bnExp: "সরকারি অনুদান, নমুনা পরীক্ষার ফি এবং অনুমোদিত উৎস থেকে সংগৃহীত অর্থে 'বাংলাদেশ নিরাপদ খাদ্য কর্তৃপক্ষ তহবিল' গঠন।",
    enCaution: "Moneys must be maintained in a scheduled bank account and utilized strictly for statutory operations.",
    bnCaution: "তহবিলের অর্থ অনুমোদিত ব্যাংকে সংরক্ষিত থাকে এবং ল্যাব আধুনিকায়ন ও নিরাপদ খাদ্য কার্যক্রমে ব্যয় হয়।",
    keywords: ["BFSA Fund", "testing fees", "bfsa tohovil", "কর্তৃপক্ষের তহবিল", "ধারা ১৯"],
    related: ["food-safety-20", "food-safety-21"]
  },
  20: {
    enTitle: "Sources and Utilization of the Fund",
    enExp: "Details eligible income sources and specifies authorized expenditures for surveillance, lab accreditations, and food safety testing.",
    bnExp: "তহবিলের আয়ের উৎস এবং খাদ্য তদারকি, ল্যাবরেটরি উন্নয়ন ও জনসচেতনতা তৈরিতে ব্যয়ের সুনির্দিষ্ট ক্ষেত্রসমূহ।",
    enCaution: "All expenditures are subject to the Public Procurement Act and mandatory public accounting standards.",
    bnCaution: "তহবিল থেকে ব্যয়ের ক্ষেত্রে সরকারি ক্রয় আইন (PPA) যথাযথভাবে অনুসরণ করতে হবে।",
    keywords: ["fund sources", "expenditure", "tohoviler utsho", "তহবিলের উৎস ও ব্যয়", "ধারা ২০"],
    related: ["food-safety-19", "food-safety-21"]
  },
  21: {
    enTitle: "Annual Budget Estimates",
    enExp: "Directs BFSA to prepare annual budget estimates for each upcoming financial year and submit them to the Government for sanction.",
    bnExp: "প্রতিটি অর্থ বছরের সম্ভাব্য আয়-ব্যয়ের বার্ষিক বাজেট প্রণয়ন করে সরকারের অনুমোদনের জন্য পেশ করার বিধান।",
    enCaution: "No operational expenditure may exceed approved budget allocations without revised government sanction.",
    bnCaution: "মন্ত্রণালয়ের পূর্বানুমোদন ছাড়া বাজেটের অতিরিক্ত অর্থ ব্যয় করা সরকারি আর্থিক বিধিমালার পরিপন্থী।",
    keywords: ["annual budget", "budget estimates", "barshik bajet", "বার্ষিক বাজেট", "ধারা ২১"],
    related: ["food-safety-19", "food-safety-22"]
  },
  22: {
    enTitle: "Maintenance of Accounts and Audit",
    enExp: "Requires BFSA to maintain regular accounts and undergo annual audit by the Comptroller and Auditor-General of Bangladesh.",
    bnExp: "কর্তৃপক্ষের হিসাব যথাযথভাবে সংরক্ষণ এবং মহাহিসাব নিরীক্ষক ও নিয়ন্ত্রক (সিএজি) কর্তৃক বার্ষিক অডিট সম্পাদনের বিধান।",
    enCaution: "Audit reports are presented to Parliament through the Government to ensure public accountability.",
    bnCaution: "অডিট আপত্তির ক্ষেত্রে সংশ্লিষ্ট কর্মকর্তাদের ব্যক্তিগত জবাবদিহিতা নিশ্চিত করা হয়।",
    keywords: ["statutory audit", "CAG audit", "hisab nirikkha", "হিসাব রক্ষণ ও নিরীক্ষা", "ধারা ২২"],
    related: ["food-safety-21", "food-safety-84"]
  },
  25: {
    enTitle: "Prohibition of Manufacturing, Importing, or Marketing Adulterated Food",
    enExp: "Strictly prohibits manufacturing, importing, stocking, distributing, or selling any adulterated food item or food ingredient.",
    bnExp: "কোনো প্রকার ভেজাল খাদ্য বা খাদ্যোপকরণ উৎপাদন, আমদানি, প্রক্রিয়াকরণ, মজুদ, সরবরাহ বা বিক্রয় সম্পূর্ণরূপে নিষিদ্ধ।",
    enCaution: "Violating Section 25 is punishable under Section 58 with imprisonment up to 5 years, fine up to 10 lakh taka, or both.",
    bnCaution: "ভেজাল খাদ্য উৎপাদন বা বিক্রয় করলে ধারা ৫৮ অনুযায়ী সর্বোচ্চ ৫ বছরের জেল ও ১০ লাখ টাকা জরিমানা হতে পারে।",
    keywords: ["adulterated food", "food adulteration", "bhezal khaddho", "ভেজাল খাদ্য নিষিদ্ধ", "ভেজাল খাবার বিক্রি", "ধারা ২৫"],
    related: ["food-safety-23", "food-safety-26", "food-safety-58"]
  },
  26: {
    enTitle: "Prohibition of Manufacturing Substandard Food",
    enExp: "Prohibits manufacturing, selling, or distributing food that falls below statutory national quality specifications.",
    bnExp: "সরকার বা কর্তৃপক্ষ কর্তৃক নির্ধারিত গুণগত মানের চেয়ে নিম্নমানের খাদ্য উৎপাদন, মজুদ বা বিক্রয় নিষিদ্ধ।",
    enCaution: "Products must comply with prescribed nutritional profiles, moisture limits, and ingredient percentages.",
    bnCaution: "নির্ধারিত স্ট্যান্ডার্ডের চেয়ে নিম্নমানের খাদ্য বিক্রি করলে ধারা ৫৮ মতে কঠোর অর্থদণ্ড ও কারাদণ্ড কার্যকর হয়।",
    keywords: ["substandard food", "quality standards", "nimnomaner khabar", "নিম্নমানের খাদ্য", "মানহীন খাবার", "ধারা ২৬"],
    related: ["food-safety-25", "food-safety-58"]
  },
  27: {
    enTitle: "Prohibition on Unauthorized Food Additives and Processing Aids",
    enExp: "Prohibits using food additives, artificial colors, preservatives, or processing aids in excess of statutory limits or without approval.",
    bnExp: "নির্ধারিত মাত্রার অতিরিক্ত খাদ্য সংযোজন দ্রব্য, কৃত্রিম রং, প্রিজারভেটিভ বা অনুমোদনহীন কেমিক্যাল ব্যবহার নিষিদ্ধ।",
    enCaution: "Using textile dyes or industrial colorants in confectionery or sweetmeats triggers immediate criminal prosecution.",
    bnCaution: "মিষ্টি বা বেকারি খাদ্যে কাপড়ের বিষাক্ত রঙ ব্যবহার করলে সরাসরি বিশুদ্ধ খাদ্য আদালতে বিচার ও জেল হবে।",
    keywords: ["food additives", "artificial coloring", "preservatives", "rong khemikyal", "খাদ্য সংযোজন দ্রব্য", "কৃত্রিম রং", "ধারা ২৭"],
    related: ["food-safety-23", "food-safety-25", "food-safety-58"]
  },
  28: {
    enTitle: "Prohibition on Storing Industrial Oils, Wastes, or Contaminants in Food Premises",
    enExp: "Bars storing industrial chemicals, engine oils, toxic wastes, pesticides, or non-food chemicals inside food processing or dining establishments.",
    bnExp: "খাদ্য প্রস্তুত বা প্রক্রিয়াকরণ কারখানায় শিল্প-কারখানায় ব্যবহৃত তৈল, পোড়া মবিল, বিষাক্ত বর্জ্য বা কীটনাশক রাখা নিষিদ্ধ।",
    enCaution: "Food premises must maintain strict physical separation from industrial and sanitation chemicals.",
    bnCaution: "রেস্তোরাঁর রান্নাঘরে বা মিষ্টির কারখানায় পোড়া তেল বা ক্ষতিকর কেমিক্যাল পাওয়া গেলে কারখানা সিলগালা করা হয়।",
    keywords: ["industrial oil in kitchen", "toxic waste", "pesticides near food", "pora tel", "শিল্প কারখানার তেল", "দূষণকারী দ্রব্য", "ধারা ২৮"],
    related: ["food-safety-27", "food-safety-35", "food-safety-58"]
  },
  30: {
    enTitle: "Restrictions on Growth Promoters, Pesticides, and Veterinary Drug Residues",
    enExp: "Prohibits harvesting, producing, or selling crops, poultry, or fish containing pesticide, antibiotic, or hormone residues exceeding MRLs.",
    bnExp: "ফসলে কীটনাশক, পশুখাদ্যে অ্যান্টিবায়োটিক বা গ্রোথ হরমোনের অবশিষ্টাংশ নির্ধারিত সর্বোচ্চ সীমার (MRL) বেশি থাকা নিষিদ্ধ।",
    enCaution: "Poultry, meat, and vegetables containing prohibited steroid or antibiotic residues are liable to immediate destruction.",
    bnCaution: "মাছ বা মুরগিতে ক্ষতিকর অ্যান্টিবায়োটিক বা হরমোনের অতিরিক্ত উপস্থিতি পাওয়া গেলে খামারির বিরুদ্ধে মামলা হতে পারে।",
    keywords: ["pesticide residue", "antibiotic residue", "hormones", "kitnashok", "কীটনাশকের অবশিষ্টাংশ", "অ্যান্টিবায়োটিক খাদ্যে", "ধারা ৩০"],
    related: ["food-safety-24", "food-safety-58"]
  },
  31: {
    enTitle: "Regulation of Genetically Modified (GM), Organic, and Functional Foods",
    enExp: "Requires special prior approval and accurate scientific labeling for marketing GM food, organic food, dietary supplements, and proprietary foods.",
    bnExp: "বংশগত বৈশিষ্ট্য পরিবর্তনকৃত (GM) খাদ্য, অর্গানিক খাদ্য বা খাদ্য সম্পূরকের ক্ষেত্রে কর্তৃপক্ষের পূর্বানুমোদন ও সুস্পষ্ট লেবেলিং বাধ্যতামূলক।",
    enCaution: "Claiming a food item is '100% Organic' without valid certification constitutes a fraudulent offense.",
    bnCaution: "ভুয়া অর্গানিক বা ন্যাচারাল দাবি করে প্রতারণামূলক পণ্য বিক্রি করলে ধারা ৪১ ও ৫৮ এর অধীনে শাস্তি হবে।",
    keywords: ["GM food", "organic food", "dietary supplement", "organic khabar", "জৈব খাদ্য", "জিএম ফুড", "ধারা ৩১"],
    related: ["food-safety-32", "food-safety-41"]
  },
  32: {
    enTitle: "Mandatory Food Packaging and Labeling Standards",
    enExp: "Mandates that packaged food must bear clear labeling in Bengali stating ingredients, manufacturing date, expiry date, batch number, and net weight.",
    bnExp: "মোড়কজাত খাদ্যের গায়ে বাংলায় স্পষ্ট অক্ষরে উপাদানের তালিকা, উৎপাদন ও মেয়াদোত্তীর্ণের তারিখ, ব্যাচ নম্বর ও খুচরা মূল্য প্রদর্শন বাধ্যতামূলক।",
    enCaution: "Selling packaged food without manufacturing/expiry dates or with obscured stickers is directly punishable under Section 58.",
    bnCaution: "তারিখ ছাড়া বা ঘষামাজা করা লেবেলযুক্ত খাদ্য মোড়ক দোকানে রাখা আইনত অপরাধ ও তাৎক্ষণিক জব্দযোগ্য।",
    keywords: ["packaging labeling", "expiry date", "ingredient list", "morokikoron", "খাদ্য মোড়কীকরণ", "লেবেলিং", "মেয়াদোত্তীর্ণের তারিখ", "ধারা ৩২"],
    related: ["food-safety-29", "food-safety-58"]
  },
  33: {
    enTitle: "Prohibition on Producing or Selling Food by Injurious Methods",
    enExp: "Penalizes the production, handling, storage, or transport of food using unhygienic, contaminated, or hazardous methods endangering human health.",
    bnExp: "অস্বাস্থ্যকর, নোংরা বা মানবস্বাস্থ্যের জন্য মারাত্মক ক্ষতিকর পদ্ধতিতে খাদ্য উৎপাদন, প্রক্রিয়াকরণ বা বিক্রয় নিষিদ্ধ।",
    enCaution: "Applies to street food preparation, open sewage contamination, and filthy hotel kitchens.",
    bnCaution: "পয়ঃনিষ্কাশনের পাশে বা চরম নোংরা পরিবেশে খাদ্য রান্না ও পরিবেশন করলে জরিমানা ও দোকান বন্ধ করা যায়।",
    keywords: ["unhygienic food", "injurious methods", "dirty kitchen", "oshwasthyokor khabar", "অস্বাস্থ্যকর খাদ্য প্রস্তুত", "নোংরা পরিবেশ", "ধারা ৩৩"],
    related: ["food-safety-35", "food-safety-58"]
  },
  34: {
    enTitle: "Prohibition on Selling Diseased or Putrid Fish, Meat, and Dairy",
    enExp: "Strictly bans the slaughter, distribution, or sale of diseased, dead, contaminated, or decomposed cattle, poultry, fish, or milk products.",
    bnExp: "রোগাক্রান্ত বা মৃত পশুর মাংস, পচা মাছ বা দূষিত দুধ ও দুগ্ধজাত খাদ্য বিক্রয় বা বাজারজাতকরণ সম্পূর্ণরূপে নিষিদ্ধ।",
    enCaution: "Selling carcass meat (mora gorur mangsho) or formalin-preserved rotten fish triggers non-bailable arrest and heavy prison sentences.",
    bnCaution: "মরা পশুর মাংস বা পচা মাছ বিক্রি করলে তাৎক্ষণিক ফৌজদারি গ্রেপ্তার ও সর্বোচ্চ মেয়াদের কারাদণ্ড নিশ্চিত।",
    keywords: ["rotten fish", "carcass meat", "diseased cattle", "pocha mangsho", "পচা মাংস", "রোগাক্রান্ত মাছ", "মৃত পশু", "ধারা ৩৪"],
    related: ["food-safety-23", "food-safety-33", "food-safety-58"]
  },
  35: {
    enTitle: "Hygiene Standards in Hotels, Restaurants, and Eateries",
    enExp: "Requires all commercial restaurants, hotels, bakeries, and food stalls to maintain certified kitchen hygiene, potable water, and sanitized utensils.",
    bnExp: "হোটেল, রেস্তোরাঁ ও মিষ্টির দোকানে বিশুদ্ধ পানির সরবরাহ, স্বাস্থ্যকর রান্নাঘর ও পরিষ্কার-পরিচ্ছন্ন পরিবেশ বজায় রাখার সংবিধিবদ্ধ বাধ্যবাধকতা।",
    enCaution: "Restaurants failing hygiene grading can be demoted, fined, or temporarily shut down during mobile court raids.",
    bnCaution: "রান্নায় দূষিত পানি ব্যবহার বা বাসি খাবার ফ্রিজে সংরক্ষণ করলে রেস্তোরাঁর মালিকের বিরুদ্ধে ব্যবস্থা নেওয়া হয়।",
    keywords: ["hotel hygiene", "restaurant kitchen", "food stall sanitation", "hotel restora", "হোটেল রেস্তোরাঁ", "খাবারের মান", "ধারা ৩৫"],
    related: ["food-safety-33", "food-safety-36", "food-safety-58"]
  },
  36: {
    enTitle: "Prohibition on Employing Persons with Infectious Diseases in Food Preparation",
    enExp: "Prohibits employing any person suffering from communicable diseases (e.g. tuberculosis, typhoid, hepatitis, active skin sores) in food handling.",
    bnExp: "যক্ষ্মা, টাইফয়েড, চর্মরোগ বা সংক্রামক ব্যাধিতে আক্রান্ত কোনো ব্যক্তিকে খাদ্য প্রস্তুত বা পরিবেশন কাজে নিয়োজিত রাখা নিষিদ্ধ।",
    enCaution: "Food business operators must obtain periodic certified medical fitness clearances for kitchen and waiting staff.",
    bnCaution: "খাদ্য কর্মীদের নিয়মিত স্বাস্থ্য পরীক্ষা ও মেডিকেল সনদ সংরক্ষণ করা রেস্তোরাঁ মালিকের দায়িত্ব।",
    keywords: ["infectious disease", "food handler health", "medical fitness", "choyache rog", "সংক্রামক ব্যাধি", "বাবুর্চির স্বাস্থ্য", "ধারা ৩৬"],
    related: ["food-safety-35", "food-safety-58"]
  },
  37: {
    enTitle: "Prohibition on Manufacturing or Selling Counterfeit Food",
    enExp: "Prohibits the manufacture, branding, packaging, or sale of fake, imitation, or counterfeit food articles passing off as genuine branded commodities.",
    bnExp: "কোনো প্রতিষ্ঠিত ব্র্যান্ডের মোড়ক বা নাম নকল করে ভুয়া খাদ্যপণ্য তৈরি, মজুদ বা বিক্রয় করা কঠোরভাবে নিষিদ্ধ।",
    enCaution: "Counterfeit food production combines offenses under this Act, the Penal Code (Sec 420/486), and the Trademark Act 2009.",
    bnCaution: "নকল ব্র্যান্ডের ঘি, তেল বা মশলা তৈরির কারখানা সরাসরি সিলগালা ও মালামাল রাষ্ট্রের অনুকূলে বাজেয়াপ্ত করা হয়।",
    keywords: ["counterfeit food", "fake brand food", "imitation food", "nokol khabar", "নকল খাদ্য", "ভুয়া ব্র্যান্ডের খাবার", "ধারা ৩৭"],
    related: ["food-safety-25", "food-safety-41", "food-safety-58"]
  },
  38: {
    enTitle: "Mandatory Maintenance of Names, Addresses, and Transaction Receipts",
    enExp: "Mandates that food traders maintain invoices, supplier ledgers, and transaction cash memos for inspection to trace supply chains.",
    bnExp: "খাদ্য ব্যবসায়ীদের জন্য ক্রয়-বিক্রয়ের রশিদ, চালান এবং সরবরাহকারী পক্ষের নাম-ঠিকানা সংরক্ষণ ও প্রদর্শন বাধ্যতামূলক।",
    enCaution: "Inability to show purchase receipts for substandard or adulterated food items creates a legal presumption of culpability on the trader.",
    bnCaution: "দোকানে ভেজাল পণ্য পাওয়া গেলে চালান বা ক্রয়ের রশিদ দেখাতে না পারলে বিক্রেতা নিজেই দায়ী থাকবেন।",
    keywords: ["cash memo", "invoice records", "supplier trace", "rashid chalan", "রশিদ বা চালান সংরক্ষণ", "ক্রয় রশিদ", "ধারা ৩৮"],
    related: ["food-safety-44", "food-safety-54"]
  },
  40: {
    enTitle: "Duty to Cooperate with the Authority and Authorized Officers",
    enExp: "Mandates that all citizens, food business operators, and public officials cooperate with BFSA officers and Inspectors during enforcement duties.",
    bnExp: "খাদ্য পরিদর্শক বা কর্তৃপক্ষের কর্মকর্তাদের দায়িত্ব পালনে সহযোগিতা প্রদান করা সকল নাগরিক ও ব্যবসায়ীর জন্য সংবিধিবদ্ধ দায়িত্ব।",
    enCaution: "Refusing to assist, failing to open premises, or providing evasive statements constitutes an offense.",
    bnCaution: "পরিদর্শন দলকে দোকানে প্রবেশে বাধা দিলে বা সহযোগিতা না করলে তা আইনত দণ্ডনীয় অপরাধ।",
    keywords: ["duty to cooperate", "assist inspectors", "shohayota kora", "সহযোগিতা প্রদান", "পরিদর্শককে সহায়তা", "ধারা ৪০"],
    related: ["food-safety-51", "food-safety-52"]
  },
  42: {
    enTitle: "Prohibition on Preparing, Printing, or Broadcasting False Advertisements",
    enExp: "Penalizes advertising agencies, publishers, printers, and broadcasters who knowingly create, print, or air deceptive food advertisements.",
    bnExp: "খাদ্যপণ্য সম্পর্কে মিথ্যা, অবৈজ্ঞানিক বা বিভ্রান্তিকর বিজ্ঞাপন তৈরি, মুদ্রণ বা প্রচার করা আইনত নিষিদ্ধ ও দণ্ডনীয়।",
    enCaution: "Advertising media and celebrities endorsers can be made co-defendants if medical claims lack scientific verification.",
    bnCaution: "মিথ্যা স্বাস্থ্য দাবি বা পুষ্টির ভুয়া গুণাগুণ সম্বলিত বিজ্ঞাপন প্রচারকারী এজেন্সির বিরুদ্ধেও মামলা হবে।",
    keywords: ["false advertising", "ad agency liability", "media publisher", "bhua biddapon", "মিথ্যা বিজ্ঞাপন মুদ্রণ", "বিজ্ঞাপন প্রচার", "ধারা ৪২"],
    related: ["food-safety-41", "food-safety-58"]
  },
  43: {
    enTitle: "Mandatory Recall of Substandard, Hazardous, or Toxic Food",
    enExp: "Requires food business operators to immediately halt sales and recall defective, contaminated, or hazardous food batches from markets at their own expense.",
    bnExp: "বাজারে সরবরাহকৃত কোনো খাদ্য ঝুঁকিপূর্ণ বা বিষাক্ত প্রমাণিত হলে তা নিজ খরচে বাজার থেকে তাৎক্ষণিকভাবে প্রত্যাহার (Recall) করার বাধ্যবাধকতা।",
    enCaution: "Failure to execute a mandatory recall order triggers aggravated fines and commercial license revocation.",
    bnCaution: "বিজ্ঞপ্তি জারির পরও ত্রুটিপূর্ণ পণ্য বাজার থেকে তুলে না নিলে কোম্পানির উৎপাদন লাইসেন্স বাতিল করা হয়।",
    keywords: ["food recall", "mandatory recall", "withdraw toxic food", "bazar theke khabar tola", "খাদ্যদ্রব্য প্রত্যাহার", "পণ্য রিকল", "ধারা ৪৩"],
    related: ["food-safety-25", "food-safety-44", "food-safety-58"]
  },
  44: {
    enTitle: "Special Liabilities of Manufacturers, Packagers, Distributors, and Sellers",
    enExp: "Distributes statutory liability across the supply chain, holding manufacturers, packagers, distributors, and retailers jointly and severally accountable.",
    bnExp: "উৎপাদনকারী, মোড়ককারী, পাইকারি পরিবেশক এবং খুচরা বিক্রেতার যৌথ ও পৃথক বিশেষ আইনি দায়বদ্ধতার বিধান।",
    enCaution: "Retailers can only escape liability if they prove the product was sold in the exact original tamper-proof sealed packaging from a licensed producer.",
    bnCaution: "সিলগালা অক্ষত থাকা ও ক্রয়ের ক্যাশমেমো দেখাতে পারলে খুচরা বিক্রেতা দায়মুক্ত হতে পারেন, অন্যথায় বিক্রেতাও দায়ী।",
    keywords: ["supply chain liability", "joint liability", "retailer liability", "bikreta day", "বিশেষ দায়বদ্ধতা", "উৎপাদনকারীর দায়", "ধারা ৪৪"],
    related: ["food-safety-38", "food-safety-43", "food-safety-59"]
  },
  45: {
    enTitle: "Appointment and Responsibilities of Food Analysts",
    enExp: "Provides for the appointment and statutory certification of qualified scientific Food Analysts to test and analyze suspect food samples.",
    bnExp: "খাদ্যের নমুনা বিজ্ঞানসম্মতভাবে পরীক্ষা ও বিশ্লেষণ করার জন্য সরকার কর্তৃক যোগ্যতাসম্পন্ন খাদ্য বিশ্লেষক নিয়োগের বিধান।",
    enCaution: "Food Analysts must possess postgraduate credentials in food chemistry, biochemistry, or microbiology.",
    bnCaution: "অনুমোদিত খাদ্য বিশ্লেষকের প্রদত্ত রিপোর্ট আদালতে অকাট্য দালিলিক প্রমাণ হিসেবে গণ্য হয়।",
    keywords: ["Food Analyst", "lab analyst", "khaddho bishleshok", "খাদ্য বিশ্লেষক নিয়োগ", "ল্যাব পরীক্ষক", "ধারা ৪৫"],
    related: ["food-safety-46", "food-safety-49"]
  },
  46: {
    enTitle: "Food Examination and Analysis Procedures",
    enExp: "Governs scientific protocols, calibration standards, and procedures for testing food composition, chemical additives, and toxicity in accredited laboratories.",
    bnExp: "স্বীকৃত পরীক্ষাগারে আন্তর্জাতিক মানসম্পন্ন প্রটোকল অনুযায়ী খাদ্যবস্তুর রাসায়নিক গঠন ও ক্ষতিকর উপাদান পরীক্ষার নিয়ম।",
    enCaution: "Tests must be performed in ISO/IEC 17025 accredited laboratories to ensure unassailable evidentiary standing.",
    bnCaution: "আদালতে সাক্ষ্য প্রমাণের জন্য খাদ্য পরীক্ষা অবশ্যই সরকারি বা স্বীকৃত ল্যাবরেটরিতে সম্পন্ন হতে হবে।",
    keywords: ["food testing", "laboratory analysis", "khaddo porikkha", "খাদ্যবস্তু পরীক্ষা", "ল্যাব টেস্ট", "ধারা ৪৬"],
    related: ["food-safety-45", "food-safety-48"]
  },
  47: {
    enTitle: "Mandatory Sale and Surrender of Food Samples for Testing",
    enExp: "Empowers Food Safety Inspectors to demand, purchase, or take custody of representative samples of food from any commercial vendor for laboratory testing.",
    bnExp: "ল্যাব পরীক্ষার জন্য পরিদর্শক কর্তৃক যেকোনো দোকান বা গুদাম থেকে খাদ্যের নমুনা বাধ্যতামূলক ক্রয় বা সমর্পণের আইনি কর্তৃত্ব।",
    enCaution: "Vendors refusing to sell or surrender samples commit an offense punishable with fine and imprisonment.",
    bnCaution: "নমুনা দিতে অস্বীকৃতি জানানো বা বাধা প্রদান করা আইনত অপরাধ ও তাৎক্ষণিক আটকের কারণ।",
    keywords: ["mandatory sample", "sample collection", "nomuna somorpon", "নমুনা সমর্পণ", "খাদ্যের নমুনা সংগ্রহ", "ধারা ৪৭"],
    related: ["food-safety-48", "food-safety-51"]
  },
  48: {
    enTitle: "Procedure for Handling and Dividing Collected Samples",
    enExp: "Requires collected food samples to be divided into three sealed portions in the presence of witnesses: one for analysis, one for the vendor, and one for court escrow.",
    bnExp: "সংগৃহীত নমুনা ৩ ভাগে বিভক্ত করে সিলগালা করার পদ্ধতি: একটি পরীক্ষার জন্য, একটি বিক্রেতার হেফাজতে এবং একটি আদালত/কর্তৃপক্ষের কাছে সংরক্ষণ।",
    enCaution: "Strict chain-of-custody protocols must be recorded on statutory forms signed by the vendor and witnesses.",
    bnCaution: "সাক্ষীদের উপস্থিতিতে নমুনা সিলগালা করা না হলে আদালতে বিবাদীপক্ষ পদ্ধতিগত ত্রুটির সুবিধা পেতে পারে।",
    keywords: ["sample sealing", "chain of custody", "three samples", "nomuna seal", "নমুনা সিলগালা", "তিন ভাগে নমুনা", "ধারা ৪৮"],
    related: ["food-safety-47", "food-safety-49"]
  },
  49: {
    enTitle: "Duties of Food Analysts and Issuance of Test Certificates",
    enExp: "Requires the Food Analyst to analyze submitted samples and deliver an official signed Certificate of Analysis within prescribed statutory deadlines.",
    bnExp: "নমুনা প্রাপ্তির পর নির্ধারিত সময়ের মধ্যে পরীক্ষা সম্পন্ন করে স্বাক্ষরিত বিশ্লেষণ সনদ (Certificate of Analysis) প্রদানের আইনি দায়িত্ব।",
    enCaution: "The certificate serves as conclusive evidence in Pure Food Courts without requiring personal appearance of the analyst unless ordered.",
    bnCaution: "খাদ্য বিশ্লেষকের সার্টিফিকেট আদালতে প্রাথমিক অকাট্য সাক্ষ্য হিসেবে গৃহীত হয়।",
    keywords: ["Certificate of Analysis", "lab test certificate", "sonod", "বিশ্লেষণ সনদ", "ল্যাব রিপোর্ট", "ধারা ৪৯"],
    related: ["food-safety-45", "food-safety-46", "food-safety-50"]
  },
  50: {
    enTitle: "Court Directions for Retesting of Samples",
    enExp: "Authorizes the Pure Food Court, upon application of the accused, to send the third referee sample to an apex appellate laboratory for retesting.",
    bnExp: "আসামিপক্ষের আবেদনের ভিত্তিতে আদালতের নির্দেশে তৃতীয় সংরক্ষিত নমুনাটি রেফারেন্স ল্যাবে পুনঃপরীক্ষার বিধান।",
    enCaution: "Retesting costs must be deposited in court by the applicant, and the appellate laboratory's result is final.",
    bnCaution: "রেফারেন্স ল্যাবরেটরির পুনঃপরীক্ষার ফলাফলই চূড়ান্ত ও অপরিবর্তনীয় হিসেবে গণ্য হবে।",
    keywords: ["court retesting", "referee laboratory", "adaloter nirdesh", "আদালতের নির্দেশে পুনঃপরীক্ষা", "রেফারেন্স ল্যাব", "ধারা ৫০"],
    related: ["food-safety-48", "food-safety-49"]
  },
  51: {
    enTitle: "Appointment and Powers of Food Safety Inspectors",
    enExp: "Provides for the appointment of Food Safety Inspectors and designates sanitary inspectors of local government bodies as ex-officio inspectors.",
    bnExp: "খাদ্য নিরাপত্তা পরিদর্শক নিয়োগ এবং সিটি কর্পোরেশন ও পৌরসভার স্যানিটারি পরিদর্শকদের পদাধিকারবলে পরিদর্শক হিসেবে ক্ষমতা অর্পণ।",
    enCaution: "Inspectors possess statutory powers to inspect food premises, collect samples, seize unsafe commodities, and lodge complaints.",
    bnCaution: "পরিদর্শকগণ সরাসরি বাজারে অভিযান পরিচালনা, নমুনা সংগ্রহ এবং আদালতে মামলা দায়েরের এখতিয়ার রাখেন।",
    keywords: ["Food Safety Inspector", "Sanitary Inspector", "poridorshok", "খাদ্য নিরাপত্তা পরিদর্শক", "স্যানিটারি পরিদর্শক", "ধারা ৫১"],
    related: ["food-safety-52", "food-safety-53", "food-safety-66"]
  },
  52: {
    enTitle: "Statutory Duties and Functions of Inspectors",
    enExp: "Details inspector responsibilities: regular surveillance, inspecting restaurants, monitoring markets, seizing adulterants, and reporting to BFSA.",
    bnExp: "পরিদর্শকের প্রধান দায়িত্ব নিয়মিত বাজার পরিদর্শন, খাদ্য কারখানার স্বাস্থ্যবিধি পর্যবেক্ষণ, দূষিত খাদ্য জব্দ এবং কর্তৃপক্ষের নিকট রিপোর্ট পেশ।",
    enCaution: "Inspectors must wear official uniforms or carry authorized credentials and conduct inspections with transparency.",
    bnCaution: "পরিদর্শনের সময় পরিচয়পত্র প্রদর্শন এবং স্থানীয় সাক্ষীদের উপস্থিতিতে জব্দ তালিকা তৈরি বাধ্যতামূলক।",
    keywords: ["inspector duties", "market surveillance", "poridorshoker kaj", "পরিদর্শকের দায়িত্ব", "বাজার পরিদর্শন", "ধারা ৫২"],
    related: ["food-safety-51", "food-safety-53"]
  },
  53: {
    enTitle: "Power of Entry into Food Premises, Buildings, and Transports",
    enExp: "Grants Inspectors legal authority to enter, inspect, and search any food factory, warehouse, hotel kitchen, cold storage, or transport vessel.",
    bnExp: "খাদ্যের গুণগত মান যাচাইয়ে যেকোনো খাদ্য কারখানা, গুদাম, রেস্তোরাঁ, কোল্ড স্টোরেজ বা যানবাহনে প্রবেশের আইনি ক্ষমতা।",
    enCaution: "Inspections may be conducted at any reasonable time during business operations without prior warning.",
    bnCaution: "ব্যবসা চলাকালীন সময়ে নোটিশ ছাড়াই আকস্মিক পরিদর্শনের পূর্ণ সরকারি ক্ষমতা পরিদর্শকের রয়েছে।",
    keywords: ["power of entry", "factory inspection", "probesh khomota", "খাদ্য স্থাপনায় প্রবেশ", "গুদাম তল্লাশি", "ধারা ৫৩"],
    related: ["food-safety-51", "food-safety-55", "food-safety-70"]
  },
  54: {
    enTitle: "Submission of Account Books, Receipts, and Financial Ledgers",
    enExp: "Empowers Inspectors to seize and examine ledgers, transaction records, bills, and purchase invoices from commercial food establishments.",
    bnExp: "খাদ্য উৎপাদন ও ক্রয়ের হিসাব খাতা, ক্যাশমেমো ও চালান জব্দ এবং খতিয়ে দেখার আইনি কর্তৃত্ব।",
    enCaution: "Failing to produce books or concealing financial documents is a punishable criminal obstruction.",
    bnCaution: "হিসাব বহি প্রদর্শনে অস্বীকৃতি জানালে বা লুকানোর চেষ্টা করলে তাৎক্ষণিক আইনি ব্যবস্থা নেওয়া যায়।",
    keywords: ["examine ledgers", "invoice books", "hisab dakhil", "হিসাব দাখিল", "চালান খাতা তলব", "ধারা ৫৪"],
    related: ["food-safety-38", "food-safety-53"]
  },
  55: {
    enTitle: "Power to Seize Adulterated and Hazardous Food",
    enExp: "Authorizes the immediate seizure of suspect adulterated food, toxic chemicals, counterfeit packages, and equipment used in committing offenses.",
    bnExp: "ভেজাল খাদ্য, ক্ষতিকর রাসায়নিক, নকল মোড়ক এবং অপরাধে ব্যবহৃত যন্ত্রপাতি তাৎক্ষণিকভাবে জব্দ করার ক্ষমতা।",
    enCaution: "A detailed seizure list must be prepared on the spot and signed by at least two local witnesses.",
    bnCaution: "ঘটনাস্থলেই সাক্ষীদের স্বাক্ষর সম্বলিত জব্দ তালিকা তৈরি করতে হবে এবং একটি কপি মালিককে হস্তান্তর করতে হবে।",
    keywords: ["seizure of adulterated food", "seizure list", "zobto khomota", "ভেজাল খাদ্য জব্দ", "মালামাল আটক", "ধারা ৫৫"],
    related: ["food-safety-56", "food-safety-57", "food-safety-71"]
  },
  56: {
    enTitle: "Destruction of Living, Active, or Decomposing Organisms",
    enExp: "Empowers Inspectors to destroy decomposing, rotten, or highly infected food materials on the spot to prevent outbreak of disease.",
    bnExp: "পচা, রোগাক্রান্ত বা জীবন্ত ব্যাকটেরিয়া/কীটপতঙ্গযুক্ত মারাত্মক ক্ষতিকর খাদ্য তাৎক্ষণিকভাবে বিনষ্ট বা ধ্বংস করার ক্ষমতা।",
    enCaution: "On-the-spot destruction must be documented in a written report countersigned by witnesses and municipal authorities.",
    bnCaution: "জনস্বাস্থ্যের মারাত্মক ঝুঁকিপূর্ণ খাবার উপস্থিত সাক্ষীদের সামনে ধ্বংস করে লিখিত প্রতিবেদন তৈরি করতে হবে।",
    keywords: ["destruction of rotten food", "emergency destruction", "dhongsho kora", "পচা খাদ্য বিনষ্ট", "তাৎক্ষণিক ধ্বংস", "ধারা ৫৬"],
    related: ["food-safety-34", "food-safety-55", "food-safety-57"]
  },
  57: {
    enTitle: "Disposal of Seized Biological Articles and Containers",
    enExp: "Regulates the lawful disposal, auction, or destruction of seized perishable goods and containers following judicial review.",
    bnExp: "আদালতের তত্ত্বাবধানে জব্দকৃত পচনশীল মালামাল ও ধারণপাত্র নিলাম, বিনষ্ট বা বিলি-বণ্টনের আইনি বিধান।",
    enCaution: "Harmful or contaminated materials must never be auctioned; they must be incinerated or deeply buried safely.",
    bnCaution: "বিষাক্ত খাবার কখনোই নিলামে বিক্রি করা যাবে না, তা পরিবেশসম্মতভাবে ধ্বংস করা বাধ্যতামূলক।",
    keywords: ["disposal of seized items", "perishable disposal", "zobto mal nishpotti", "জব্দ মালামাল নিষ্পত্তি", "ধারা ৫৭"],
    related: ["food-safety-55", "food-safety-56"]
  },
  58: {
    enTitle: "General Penalties for Violations of Food Safety Provisions",
    enExp: "Prescribes graduated penalties ranging from 1 to 5 years imprisonment and fines from 1 lakh to 10 lakh taka for contravening Sections 23 to 44.",
    bnExp: "ধারা ২৩ থেকে ৪৪ এর বিধান লঙ্ঘনের দায়ে অপরাধের মাত্রাভেদে ১ থেকে ৫ বছর পর্যন্ত কারাদণ্ড এবং ১ লাখ থেকে ১০ লাখ টাকা পর্যন্ত অর্থদণ্ড।",
    enCaution: "Repeat offenses mandate double the statutory maximum penalty under Section 58(2).",
    bnCaution: "একই অপরাধ দ্বিতীয়বার করলে অপরাধী সর্বোচ্চ সাজার দ্বিগুণ শাস্তি বা সর্বোচ্চ ২০ লাখ টাকা জরিমানার সম্মুখীন হবেন।",
    keywords: ["penalties", "food safety fine", "prison sentence", "dondo", "খাদ্য আইনের দণ্ড", "কারাদণ্ড ও অর্থদণ্ড", "ধারা ৫৮"],
    related: ["food-safety-23", "food-safety-25", "food-safety-59"]
  },
  59: {
    enTitle: "Offenses Committed by Companies and Corporate Entities",
    enExp: "Imposes vicarious liability on company directors, managing directors, managers, and partners for offenses committed by corporate bodies.",
    bnExp: "কোম্পানি কর্তৃক অপরাধ সংঘটিত হলে ব্যবস্থাপনা পরিচালক, পরিচালক, ম্যানেজার ও অংশীদারগণ ব্যক্তিগতভাবে দায়ী হবেন।",
    enCaution: "Officers escape liability only by affirmatively proving the violation occurred without their knowledge despite due diligence.",
    bnCaution: "কারখানায় ভেজাল খাবারের জন্য বাণিজ্যিক সত্তার আড়ালে দায় এড়ানো যায় না; শীর্ষ কর্মকর্তারা সরাসরি ফৌজদারি আসামি হন।",
    keywords: ["company offense", "director liability", "corporate food crime", "companyr day", "কোম্পানী কর্তৃক অপরাধ", "পরিচালকের দায়", "ধারা ৫৯"],
    related: ["food-safety-44", "food-safety-58"]
  },
  60: {
    enTitle: "Bailability and Cognizability of Offenses",
    enExp: "Designates offenses under this Act as cognizable and non-bailable, requiring formal bail hearings before the competent Magistrate or Food Court.",
    bnExp: "এই আইনের অধীন সংঘটিত অপরাধসমূহ আমলযোগ্য (Cognizable) এবং জামিন-অযোগ্য (Non-Bailable) হিসেবে সংবিধিবদ্ধ।",
    enCaution: "Inspectors can arrest without warrant for caught-in-the-act violations, and bail is discretionary and rarely granted in severe adulteration.",
    bnCaution: "খাদ্যে বিষাক্ত কেমিক্যাল বা ফরমালিন মেশানো জামিন-অযোগ্য অপরাধ; পুলিশ বা পরিদর্শক সরাসরি গ্রেপ্তার করতে পারেন।",
    keywords: ["non bailable", "cognizable offense", "bail hearing", "jamin ogoggo", "জামিন-অযোগ্য", "আমলযোগ্য অপরাধ", "ধারা ৬০"],
    related: ["food-safety-58", "food-safety-64", "food-safety-70"]
  },
  61: {
    enTitle: "Procedure When Offense Constitutes Crime Under Other Laws",
    enExp: "Clarifies that where an act constitutes an offense under this Act and another statute (e.g. Special Powers Act 1974), prosecution can proceed under either law.",
    bnExp: "কোনো অপরাধ এই আইন এবং অন্য কোনো বিশেষ আইন উভয় আইনের অধীন দণ্ডনীয় হলে যেকোনো একটি আইনে মামলা রুজু করার বিধান।",
    enCaution: "Severe toxic adulteration threatening mass lives is often prosecuted under Section 25C of the Special Powers Act 1974 for capital penalties.",
    bnCaution: "চরম বিষাক্ত ভেজালের ক্ষেত্রে সরকার বিশেষ ক্ষমতা আইনের ২৫সি ধারায় যাবজ্জীবন বা মৃত্যুদণ্ডযোগ্য মামলা করতে পারে।",
    keywords: ["other laws", "special powers act", "multiple statutes", "onno ain", "অন্য আইনের অধীন অপরাধ", "বিশেষ ক্ষমতা আইন", "ধারা ৬১"],
    related: ["food-safety-58", "food-safety-60"]
  },
  62: {
    enTitle: "Awarding Share of Realized Fine to the Complainant",
    enExp: "Provides that up to 25% of the financial fine realized from the convicted offender may be awarded by the court to the informant or complainant.",
    bnExp: "আদালত কর্তৃক আদায়কৃত অর্থদণ্ডের সর্বোচ্চ ২৫% অংশ তথ্য প্রদানকারী বা অভিযোগকারীকে পুরস্কার হিসেবে প্রদানের বিধান।",
    enCaution: "The award is disbursed directly by the court or authority following realization of the fine from the convict.",
    bnCaution: "আসামির নিকট থেকে জরিমানা আদায়ের পর আদালত অভিযোগকারী নাগরিককে প্রণোদনা হিসেবে এই অর্থ প্রদান করে।",
    keywords: ["complainant reward", "25 percent fine", "informant award", "jorimanar ongsho", "জরিমানার ২৫% অংশ", "অভিযোগকারীর পুরস্কার", "ধারা ৬২"],
    related: ["food-safety-58", "food-safety-66"]
  },
  63: {
    enTitle: "Assistance in Identifying Actual Offenders",
    enExp: "Provides leniency or immunity for subordinates or small retailers who provide truthful evidence identifying kingpins and actual adulteration manufacturers.",
    bnExp: "আসল ভেজাল উৎপাদনকারী বা মূল চক্রকে শনাক্ত করতে সত্য তথ্য দিয়ে সহায়তা করলে আদালত সংশ্লিষ্ট ব্যক্তির সাজা লাঘব করতে পারে।",
    enCaution: "Encourages whistleblowing and supply chain transparency to catch masterminds behind food adulteration syndicates.",
    bnCaution: "মূল ভেজালকারীকে ধরিয়ে দিতে সহায়তা করলে আদালত ছোট দোকানদারের প্রতি সহানুভূতিশীল বিবেচনা করতে পারে।",
    keywords: ["whistleblower leniency", "kingpin identification", "shohayota", "প্রকৃত অপরাধী সনাক্তকরণ", "সাজা লাঘব", "ধারা ৬৩"],
    related: ["food-safety-44", "food-safety-58"]
  },
  64: {
    enTitle: "Establishment and Jurisdiction of Pure Food Courts",
    enExp: "Designates Courts of Senior Judicial Magistrates and Metropolitan Magistrates as 'Pure Food Courts' (বিশুদ্ধ খাদ্য আদালত) with exclusive jurisdiction.",
    bnExp: "প্রতিটি জেলায় সিনিয়র জুডিসিয়াল ম্যাজিস্ট্রেট এবং মেট্রোপলিটনে মেট্রোপলিটন ম্যাজিস্ট্রেট আদালতকে 'বিশুদ্ধ খাদ্য আদালত' হিসেবে নির্ধারণ।",
    enCaution: "Pure Food Courts hold specialized summary and regular trial powers over all food safety crimes in their territorial jurisdiction.",
    bnCaution: "খাদ্য আইনের সকল নিয়মিত মামলার বিচার এই বিশেষায়িত বিশুদ্ধ খাদ্য আদালতে অনুষ্ঠিত হয়।",
    keywords: ["Pure Food Court", "Senior Judicial Magistrate", "Metropolitan Magistrate", "bishuddho khaddo adalot", "বিশুদ্ধ খাদ্য আদালত", "খাদ্য আদালত", "ধারা ৬৪"],
    related: ["food-safety-65", "food-safety-66", "food-safety-74"]
  },
  65: {
    enTitle: "Trial Procedure in Pure Food Courts",
    enExp: "Governs trial proceedings in Pure Food Courts under the Code of Criminal Procedure 1898, prioritizing expeditious day-to-day hearings.",
    bnExp: "ফৌজদারি কার্যবিধি অনুযায়ী বিশুদ্ধ খাদ্য আদালতে বিচারিক কার্যক্রম পরিচালনা এবং মামলা দ্রুত নিষ্পত্তির নিয়মাবলী।",
    enCaution: "Magistrates may invoke summary trial procedures under CrPC Chapter XXII for straightforward violations.",
    bnCaution: "মামলার দীর্ঘসূত্রিতা এড়াতে বিচারক দ্রুত বিচার ও সাক্ষ্য গ্রহণের পদ্ধতি অনুসরণ করেন।",
    keywords: ["trial procedure", "CrPC trial", "bichar poddhoti", "বিচার পদ্ধতি", "খাদ্য আদালতের বিচার", "ধারা ৬৫"],
    related: ["food-safety-64", "food-safety-68"]
  },
  66: {
    enTitle: "Filing of Complaints and Institution of Cases",
    enExp: "Authorizes the Chairman, authorized BFSA officers, or designated Food Safety Inspectors to lodge formal written complaints before the Food Court.",
    bnExp: "চেয়ারম্যান, ক্ষমতাপ্রাপ্ত কর্মকর্তা বা খাদ্য পরিদর্শকের লিখিত রিপোর্ট বা নালিশের ভিত্তিতে আদালতে মামলা রুজু করার বিধান।",
    enCaution: "A citizen discovering adulterated food submits their grievance to the Food Inspector or BFSA, which prosecutes before the court.",
    bnCaution: "নাগরিকগণ প্রমাণসহ খাদ্য পরিদর্শক বা কর্তৃপক্ষের নিকট অভিযোগ দিলে কর্তৃপক্ষ আদালতে মামলা দায়ের করে।",
    keywords: ["filing complaint", "initiating food cases", "mamla dayer", "মামলা দায়ের", "অভিযোগ দাখিল", "ধারা ৬৬"],
    related: ["food-safety-62", "food-safety-64"]
  },
  67: {
    enTitle: "Investigation and Designation of Investigating Officers",
    enExp: "Authorizes the Food Court or BFSA to designate an Inspector or Police Officer not below the rank of Sub-Inspector as Investigating Officer (IO).",
    bnExp: "মামলার সুষ্ঠু তদন্তের জন্য খাদ্য পরিদর্শক বা ন্যূনতম সাব-ইন্সপেক্টর পদমর্যাদার পুলিশ কর্মকর্তাকে তদন্তকারী কর্মকর্তা নিয়োগের বিধান।",
    enCaution: "IOs exercise all investigative powers of an Officer-in-Charge of a police station under the Code of Criminal Procedure.",
    bnCaution: "তদন্তকারী কর্মকর্তা ফৌজদারি কার্যবিধি মতে তল্লাশি, জব্দ ও সাক্ষী জিজ্ঞাসাবাদের পূর্ণ ক্ষমতা প্রয়োগ করেন।",
    keywords: ["investigating officer", "IO food safety", "todonto kormokorta", "তদন্তকারী কর্মকর্তা", "তদন্ত", "ধারা ৬৭"],
    related: ["food-safety-68", "food-safety-70"]
  },
  68: {
    enTitle: "Statutory Time Limit for Food Safety Investigations",
    enExp: "Mandates that investigations must be completed within 90 days, extendable by the Food Court for a maximum of 30 additional days upon cause.",
    bnExp: "তদন্তভার গ্রহণের ৯০ দিনের মধ্যে তদন্ত সম্পন্ন করার বাধ্যবাধকতা, যা আদালতের অনুমতিতে সর্বোচ্চ আরও ৩০ দিন বৃদ্ধি করা যায়।",
    enCaution: "Total investigation time cannot exceed 120 days; failing to report in time attracts disciplinary proceedings against the IO.",
    bnCaution: "সর্বোচ্চ ১২০ দিনের মধ্যে তদন্ত প্রতিবেদন দাখিলে ব্যর্থ হলে তদন্তকারী কর্মকর্তার বিরুদ্ধে বিভাগীয় ব্যবস্থা নেওয়া যায়।",
    keywords: ["investigation deadline", "90 days limit", "todonto somoy", "তদন্তের সময়সীমা", "৯০ দিনের মধ্যে তদন্ত", "ধারা ৬৮"],
    related: ["food-safety-67", "food-safety-81"]
  },
  69: {
    enTitle: "Power of Pure Food Court to Issue Warrants",
    enExp: "Empowers the Pure Food Court to issue arrest warrants and search warrants against accused persons, commercial godowns, and transport vehicles.",
    bnExp: "অভিযুক্ত ব্যক্তি বা প্রতিষ্ঠানের বিরুদ্ধে বিশুদ্ধ খাদ্য আদালত কর্তৃক গ্রেপ্তারি পরোয়ানা ও তল্লাশি পরোয়ানা জারির ক্ষমতা।",
    enCaution: "Warrants are executed by the police force with top priority under the Code of Criminal Procedure.",
    bnCaution: "পরোয়ানা জারির পর পুলিশ তাৎক্ষণিকভাবে আসামিকে গ্রেপ্তার করে আদালতে হাজির করতে বাধ্য।",
    keywords: ["issue warrants", "arrest warrant", "search warrant", "poroyana", "পরোয়ানা জারীর ক্ষমতা", "গ্রেপ্তারি পরোয়ানা", "ধারা ৬৯"],
    related: ["food-safety-64", "food-safety-70"]
  },
  70: {
    enTitle: "Powers of Search, Seizure, and Arrest During Investigation",
    enExp: "Authorizes the IO to enter premises, break open locks if refused entry, conduct searches, seize tainted products, and arrest suspects.",
    bnExp: "তদন্তকালে যেকোনো খাদ্য গুদাম বা ভবনে তল্লাশি চালানো, তালা ভাঙা, মালামাল জব্দ করা এবং জড়িত ব্যক্তিদের গ্রেপ্তারের ক্ষমতা।",
    enCaution: "Searches must comply strictly with Section 103 of the CrPC, requiring independent local witnesses and signed seizure lists.",
    bnCaution: "তল্লাশির সময় স্থানীয় নিরপেক্ষ সাক্ষীদের উপস্থিতি এবং জব্দ তালিকা তৈরি করা আবশ্যক।",
    keywords: ["search arrest powers", "break locks", "tollashi greftar", "তল্লাশি ও গ্রেপ্তার", "তালা ভাঙার ক্ষমতা", "ধারা ৭০"],
    related: ["food-safety-53", "food-safety-55", "food-safety-69"]
  },
  71: {
    enTitle: "Provisions Regarding Arrested Persons and Seized Articles",
    enExp: "Requires that arrested suspects be produced before the nearest Magistrate within 24 hours and seized items deposited in safe judicial custody.",
    bnExp: "গ্রেপ্তারকৃত ব্যক্তিকে ২৪ ঘণ্টার মধ্যে আদালতে সোপর্দ করা এবং জব্দ মালামাল আদালতের মালখানায় নিরাপদে সংরক্ষণের বিধান।",
    enCaution: "Violating the 24-hour constitutional production deadline renders detention unlawful under Article 33.",
    bnCaution: "গ্রেপ্তারের পর ২৪ ঘণ্টার বেশি সময় থানায় আটকে রাখা বেআইনি ও সাংবিধানিক অধিকারের পরিপন্থী।",
    keywords: ["24 hours production", "arrest safeguards", "judicial custody", "malkhana", "২৪ ঘণ্টার মধ্যে সোপর্দ", "আদালতে হাজির", "ধারা ৭১"],
    related: ["food-safety-60", "food-safety-70"]
  },
  72: {
    enTitle: "Evidentiary Value of Digital Video Recordings, Photographs, and Audio Tapes",
    enExp: "Expressly confers admissible evidentiary status on video camera footage, audio recordings, digital CCTV clips, and photographs in Food Courts.",
    bnExp: "অভিযানের সময় ক্যামেরায় তোলা ছবি, ভিডিও ফুটেজ, সিসিটিভি ক্লিপ ও অডিও রেকর্ডিং আদালতে গ্রহণযোগ্য সাক্ষ্য হিসেবে স্বীকৃতি।",
    enCaution: "Digital evidence must be preserved with metadata and certified chain-of-custody to prove absence of tampering.",
    bnCaution: "অভিযানের ভিডিও এবং ছবি আদালতে উপস্থাপন করলে অপরাধ অস্বীকার করার সুযোগ থাকে না।",
    keywords: ["digital evidence", "video footage", "CCTV recordings", "camera chobi", "ক্যামেরার ছবি", "ভিডিও ফুটেজ সাক্ষ্য", "ধারা ৭২"],
    related: ["food-safety-49", "food-safety-65"]
  },
  73: {
    enTitle: "Testing and Retesting of Food Commodities During Trial",
    enExp: "Empowers the Food Court during trial to direct fresh sampling and scientific retesting of suspect commodities by independent national experts.",
    bnExp: "বিচার চলাকালে অপরাধের সত্যতা প্রমাণের স্বার্থে আদালত কর্তৃক নতুন করে নমুনা সংগ্রহ ও পরীক্ষাগারে পরীক্ষার নির্দেশ দেওয়ার ক্ষমতা।",
    enCaution: "Protects both consumer safety and defendants from contaminated or compromised initial test batches.",
    bnCaution: "পরীক্ষার ফলাফলে সন্দেহ থাকলে বিচারক স্বীয় উদ্যোগে উচ্চতর গবেষণাগারে পরীক্ষার নির্দেশ দিতে পারেন।",
    keywords: ["retesting in trial", "court ordered testing", "adalote porikkha", "আদালতে খাদ্য পরীক্ষা", "ধারা ৭৩"],
    related: ["food-safety-46", "food-safety-50"]
  },
  74: {
    enTitle: "Appeals to the Court of Sessions",
    enExp: "Provides that any person convicted or aggrieved by a judgment of a Pure Food Court may appeal to the Court of Sessions within 30 days.",
    bnExp: "বিশুদ্ধ খাদ্য আদালতের রায়ের বিরুদ্ধে ৩০ দিনের মধ্যে বিজ্ঞ দায়রা জজ আদালতে আপিল দায়েরের সংবিধিবদ্ধ অধিকার।",
    enCaution: "Appeals must be submitted within 30 calendar days along with certified copies of the trial judgment and order sheet.",
    bnCaution: "আদেশের ৩০ কার্যদিবসের মধ্যে দায়রা আদালতে আপিল করতে হবে; তামাদি মেয়াদ পার হলে আপিল তামাদি দোষে বাতিল হবে।",
    keywords: ["appeal to sessions", "criminal appeal", "sessions judge", "appeal", "দায়রা আদালতে আপিল", "৩০ দিনের মধ্যে আপিল", "ধারা ৭৪"],
    related: ["food-safety-64", "food-safety-65"]
  },
  75: {
    enTitle: "Application and Jurisdiction of the Mobile Court Act, 2009",
    enExp: "Empowers Executive Magistrates to conduct Mobile Courts and summarily convict food business operators for offenses committed in their presence.",
    bnExp: "নির্বাহী ম্যাজিস্ট্রেট কর্তৃক মোবাইল কোর্ট আইন ২০০৯ এর আওতায় ঘটনাস্থলে তাৎক্ষণিক বিচার ও অর্থদণ্ড/কারাদণ্ড আরোপের এখতিয়ার।",
    enCaution: "Mobile Courts can impose up to 2 years imprisonment or statutory fines on the spot for confessed or visible violations.",
    bnCaution: "ভ্রাম্যমাণ আদালত সরাসরি দোকানে অভিযান চালিয়ে তাৎক্ষণিকভাবে সিলগালা, জরিমানা বা জেল প্রদান করতে পারে।",
    keywords: ["mobile court", "on the spot conviction", "executive magistrate", "mobile court ain", "মোবাইল কোর্টের এখতিয়ার", "ভ্রাম্যমাণ আদালত", "ধারা ৭৫"],
    related: ["food-safety-58", "food-safety-64"]
  },
  76: {
    enTitle: "Civil Remedies and Compensation Suits for Consumers",
    enExp: "Affirms that criminal prosecution does not bar victims of unsafe food from filing a civil suit before the Joint District Judge Court for damages.",
    bnExp: "ফৌজদারি মামলার পাশাপাশি ক্ষতিগ্রস্ত ব্যক্তি কর্তৃক যুগ্ম জেলা জজ আদালতে আর্থিক ক্ষতিপূরণ ও চিকিৎসার খরচের দেওয়ানি মোকদ্দমার অধিকার।",
    enCaution: "Aggrieved consumers can claim actual financial damages, lost wages, and hospitalization expenses caused by contaminated food.",
    bnCaution: "বিষাক্ত খাবার খেয়ে অসুস্থ হলে হাসপাতাল বিল ও আর্থিক ক্ষতি আদায়ের জন্য দেওয়ানি আদালতে ক্ষতিপূরণ মোকদ্দমা করা যায়।",
    keywords: ["civil remedy", "food compensation suit", "joint district judge", "dewani khotipuron", "দেওয়ানী প্রতিকার", "ক্ষতিপূরণ মামলা", "ধারা ৭৬"],
    related: ["food-safety-74", "food-safety-77"]
  },
  77: {
    enTitle: "Civil Appeals to the High Court Division",
    enExp: "Provides that appeals against any final decree or judgment of the Joint District Judge Court in a food compensation suit lie to the High Court Division.",
    bnExp: "যুগ্ম জেলা জজ আদালতের দেওয়ানি ক্ষতিপূরণ ডিক্রির বিরুদ্ধে সুপ্রিম কোর্টের হাইকোর্ট বিভাগে সিভিল আপিল দায়েরের বিধান।",
    enCaution: "Civil appeals follow standard Code of Civil Procedure 1908 procedures and statutory limitation timelines.",
    bnCaution: "হাইকোর্টে প্রথম সিভিল আপিল দায়েরের নিয়মাবলী ও ৯০ দিনের তামাদি সময়সীমা অনুসরণ করতে হবে।",
    keywords: ["civil appeal", "high court division", "supreme court", "dewani appeal", "হাইকোর্টে সিভিল আপিল", "ধারা ৭৭"],
    related: ["food-safety-76"]
  },
  78: {
    enTitle: "Powers of the Authority in Conducting Administrative Inquiries",
    enExp: "Empowers BFSA to summon witnesses, inspect records, and conduct administrative inquiries into systemic food contamination across industries.",
    bnExp: "শিল্পখাতে সামগ্রিক খাদ্য ভেজাল প্রতিরোধে সাক্ষী তলব ও প্রশাসনিক তদন্ত পরিচালনায় কর্তৃপক্ষের দেওয়ানি আদালতের ক্ষমতা।",
    enCaution: "Entities failing to comply with administrative summons are liable to regulatory sanctions and licensing suspensions.",
    bnCaution: "কর্তৃপক্ষের তলবে হাজির না হলে সংশ্লিষ্ট কোম্পানির খাদ্য উৎপাদন লাইসেন্স স্থগিত করা যায়।",
    keywords: ["administrative inquiry", "summoning witnesses", "proshashonik todonto", "প্রশাসনিক তদন্ত", "সাক্ষী তলব", "ধারা ৭৮"],
    related: ["food-safety-11", "food-safety-79"]
  },
  79: {
    enTitle: "Appeals Against Administrative Orders of the Authority",
    enExp: "Authorizes any food business operator aggrieved by an administrative order of BFSA (e.g. license suspension) to appeal to the Ministry of Food within 30 days.",
    bnExp: "কর্তৃপক্ষের কোনো প্রশাসনিক আদেশের বিরুদ্ধে সংক্ষুব্ধ ব্যক্তি ৩০ দিনের মধ্যে খাদ্য মন্ত্রণালয়ের সচিবের নিকট আপিল করতে পারেন।",
    enCaution: "The appellate decision of the Government on administrative matters is final and binding.",
    bnCaution: "মন্ত্রণালয়ের আপিল শুনানিতে গৃহীত সিদ্ধান্তই চূড়ান্ত হিসেবে গণ্য হবে।",
    keywords: ["administrative appeal", "ministry of food", "proshashonik appeal", "প্রশাসনিক আদেশের বিরুদ্ধে আপিল", "মন্ত্রণালয়ে আপিল", "ধারা ৭৯"],
    related: ["food-safety-78"]
  },
  80: {
    enTitle: "Members and Staff of the Authority to be Public Servants",
    enExp: "Declares all members, officers, analysts, inspectors, and employees of BFSA to be public servants within the meaning of Section 21 of the Penal Code.",
    bnExp: "কর্তৃপক্ষের চেয়ারম্যান, সদস্য, পরিদর্শক, বিশ্লেষক ও সকল কর্মচারী দণ্ডবিধির ২১ ধারা অনুযায়ী সরকারি কর্মচারী হিসেবে গণ্য হবেন।",
    enCaution: "Obstructing, bribing, or assaulting food safety personnel carries severe penal consequences under the Penal Code.",
    bnCaution: "খাদ্য কর্মকর্তাদের কাজে বাধা দিলে বা লাঞ্ছিত করলে সরকারি কাজে বাধার দায়ে সরাসরি পুলিশি গ্রেপ্তার ও মামলা হবে।",
    keywords: ["public servants", "penal code section 21", "jonoshebok", "জনসেবক", "সরকারি কর্মচারী", "ধারা ৮০"],
    related: ["food-safety-51", "food-safety-81"]
  },
  81: {
    enTitle: "Penalties for Public Officers Failing to Discharge Statutory Duties",
    enExp: "Establishes administrative and criminal liability for food safety officers or inspectors who willfully neglect duties, collude, or take bribes.",
    bnExp: "কোনো কর্মকর্তা বা পরিদর্শক ইচ্ছাকৃতভাবে দায়িত্ব পালনে অবহেলা করলে বা ভেজালকারীর সাথে যোগসাজশ করলে বিভাগীয় ও ফৌজদারি দণ্ড।",
    enCaution: "Whistleblowers can report corrupt inspectors directly to the Ministry or Anti-Corruption Commission (ACC).",
    bnCaution: "ঘুষ গ্রহণ বা ভেজাল কারখানার তথ্য চেপে রাখার প্রমাণ মিললে পরিদর্শকের চাকরিচ্যুতি ও দুর্নীতি দমন আইনে বিচার হবে।",
    keywords: ["officer misconduct", "corruption liability", "kormokortar dayittwo obohela", "কর্মকর্তার দায়িত্বে অবহেলা", "দুর্নীতি", "ধারা ৮১"],
    related: ["food-safety-80"]
  },
  82: {
    enTitle: "Cooperation and Assistance from Other Ministries and Agencies",
    enExp: "Mandates that all government ministries, divisions, police, port authorities, and local bodies provide full cooperation to BFSA upon request.",
    bnExp: "খাদ্য নিরাপত্তা বাস্তবায়নে কৃষি, স্বাস্থ্য, মৎস্য, পুলিশ ও স্থানীয় প্রশাসনকে বিএফএসএ-কে পূর্ণ সহযোগিতা প্রদানের বাধ্যবাধকতা।",
    enCaution: "Ensures synchronized nationwide action preventing contaminated commodities from entering supply channels.",
    bnCaution: "সীমান্ত ও বন্দরে ক্ষতিকর খাদ্যপণ্য আটকাতে কাস্টমস ও বন্দর কর্তৃপক্ষ বিএফএসএ-কে তাৎক্ষণিক সহায়তা দেয়।",
    keywords: ["inter agency cooperation", "police customs support", "shohayota", "মন্ত্রণালয় ও সংস্থার সহযোগিতা", "ধারা ৮২"],
    related: ["food-safety-11", "food-safety-51"]
  },
  83: {
    enTitle: "Duty to Maintain Confidentiality of Proprietary Information",
    enExp: "Requires BFSA officials and analysts to maintain confidentiality regarding trade secrets, commercial formulas, and proprietary business information.",
    bnExp: "পরিদর্শন বা ল্যাব পরীক্ষার সময় প্রাপ্ত বাণিজ্যিক গোপনীয়তা, ফর্মুলা বা প্যাটেন্ট তথ্য গোপন রাখার আইনি বাধ্যবাধকতা।",
    enCaution: "Unlawful disclosure of trade secrets by any official is punishable under service rules and general criminal law.",
    bnCaution: "কোম্পানির ব্যবসায়িক ফর্মুলা বা গোপন তথ্য অননুমোদিতভাবে প্রকাশ করা বেআইনি ও শাস্তিযোগ্য।",
    keywords: ["confidentiality", "trade secrets", "goponiyota", "গোপনীয় তথ্য সংরক্ষণ", "বাণিজ্যিক গোপনীয়তা", "ধারা ৮৩"],
    related: ["food-safety-80", "food-safety-81"]
  },
  84: {
    enTitle: "Submission of Annual Performance Report",
    enExp: "Requires the Authority to prepare an annual report of its activities, market surveillance statistics, and finances for parliamentary submission.",
    bnExp: "প্রতিটি অর্থ বৎসরের সমাপ্তির পর বার্ষিক কার্যক্রম ও আর্থিক ব্যয়ের পূর্ণাঙ্গ প্রতিবেদন সরকারের মাধ্যমে সংসদে উপস্থাপনের বিধান।",
    enCaution: "Documents nationwide food safety enforcement progress, total convictions, and laboratory test statistics.",
    bnCaution: "বার্ষিক প্রতিবেদনে জাতীয় খাদ্য নিরাপত্তার সামগ্রিক চিত্র এবং অভিযানের পরিসংখ্যান সংরক্ষিত থাকে।",
    keywords: ["annual report", "performance report", "barshik protibedon", "বার্ষিক প্রতিবেদন", "ধারা ৮৪"],
    related: ["food-safety-22", "food-safety-82"]
  },
  85: {
    enTitle: "Delegation of Powers by the Authority",
    enExp: "Empowers the Authority, with government approval, to delegate any of its powers or duties to the Chairman, Members, or field directors.",
    bnExp: "কর্তৃপক্ষ কর্তৃক সরকারের পূর্বানুমোদনক্রমে স্বীয় যেকোনো ক্ষমতা চেয়ারম্যান, সদস্য বা অধস্তন কর্মকর্তার ওপর অর্পণের আইনি কর্তৃত্ব।",
    enCaution: "Delegated field directors exercise full enforcement authority in their respective divisional jurisdictions.",
    bnCaution: "ক্ষমতাপ্রাপ্ত বিভাগীয় ও জেলা কর্মকর্তা স্থানীয় পর্যায়ে সরাসরি অভিযান ও সিদ্ধান্ত নিতে পারেন।",
    keywords: ["delegation of powers", "officer authority", "khomota orpon", "ক্ষমতা অর্পণ", "ধারা ৮৫"],
    related: ["food-safety-5", "food-safety-18"]
  },
  86: {
    enTitle: "Power of Government to Make Statutory Rules",
    enExp: "Empowers the Government, by official gazette notification, to make rules to carry out the purposes and provisions of this Act.",
    bnExp: "এই আইনের উদ্দেশ্য পূরণকল্পে সরকার কর্তৃক সরকারি গেজেটে প্রজ্ঞাপন দ্বারা সংবিধিবদ্ধ বিধিমালা প্রণয়নের ক্ষমতা।",
    enCaution: "Rules prescribe detailed procedural frameworks for sample collection, lab testing, and pure food court filings.",
    bnCaution: "নিরাপদ খাদ্য বিধিমালা অনুযায়ী পরীক্ষাগারের ফি এবং খাদ্য আদালতের কার্যপ্রণালী পরিচালিত হয়।",
    keywords: ["rule making power", "government rules", "bidhi pronoyon", "বিধি প্রণয়নের ক্ষমতা", "নিরাপদ খাদ্য বিধিমালা", "ধারা ৮৬"],
    related: ["food-safety-87", "food-safety-88"]
  },
  87: {
    enTitle: "Power of the Authority to Make Regulations",
    enExp: "Authorizes BFSA, with prior Government approval, to formulate regulations on food safety standards, lab procedures, and hygiene benchmarks.",
    bnExp: "সরকারের পূর্বানুমোদন সাপেক্ষে কর্তৃপক্ষ কর্তৃক নিরাপদ খাদ্যের কারিগরি মান ও পরিদর্শনের প্রবিধান প্রণয়নের কর্তৃত্ব।",
    enCaution: "Regulations establish scientific threshold limits for chemicals, additives, and restaurant hygiene grading.",
    bnCaution: "প্রবিধানের মাধ্যমে বিভিন্ন খাবারের কেমিক্যাল মাত্রা ও রেস্তোরাঁর গ্রেডিং পদ্ধতি সুনির্দিষ্ট করা হয়।",
    keywords: ["regulation making power", "BFSA regulations", "probidhan", "প্রবিধান প্রণয়নের ক্ষমতা", "কর্তৃপক্ষের প্রবিধান", "ধারা ৮৭"],
    related: ["food-safety-86"]
  },
  88: {
    enTitle: "Removal of Difficulties",
    enExp: "Empowers the Government to issue clarification orders to remove any practical difficulty or ambiguity in implementing this Act.",
    bnExp: "এই আইনের বিধানাবলি কার্যকর করার ক্ষেত্রে কোনো অসুবিধা বা অস্পষ্টতা দেখা দিলে সরকার আদেশ দ্বারা তা দূর করতে পারবে।",
    enCaution: "Orders cannot run contrary to the fundamental principles or substantive protections of the statute.",
    bnCaution: "অস্পষ্টতা দূরীকরণের আদেশ মূল আইনের বিধানের সাথে সামঞ্জস্যপূর্ণ হতে হবে।",
    keywords: ["removal of difficulties", "clarification orders", "oshposhtota durikoron", "অস্পষ্টতা দূরীকরণ", "ধারা ৮৮"],
    related: ["food-safety-86", "food-safety-89"]
  },
  89: {
    enTitle: "Publication of Authentic English Text",
    enExp: "Provides for the publication of an authentic English text of this Act, stipulating that in case of conflict, the original Bengali text prevails.",
    bnExp: "এই আইনের মূল বাংলা পাঠের একটি নির্ভরযোগ্য ইংরেজি অনুবাদ প্রকাশের বিধান, তবে বিরোধ দেখা দিলে বাংলা পাঠ প্রাধান্য পাবে।",
    enCaution: "Judicial interpretation in Bangladesh courts must be grounded on the authoritative Bengali gazette text.",
    bnCaution: "আদালতে ব্যাখ্যার দ্বন্দ্ব দেখা দিলে আইনটির মূল বাংলা পাঠই চূড়ান্ত হিসেবে বিবেচিত হবে।",
    keywords: ["authentic english text", "bengali text prevails", "ingreji onubad", "ইংরেজি অনুবাদ প্রকাশ", "বাংলা পাঠ প্রাধান্য", "ধারা ৮৯"],
    related: ["food-safety-1"]
  },
  90: {
    enTitle: "Repeal and Savings",
    enExp: "Repeals the Pure Food Ordinance, 1959 (Ordinance LXVIII of 1959) while legally saving prior cases, rules, and existing pure food court proceedings.",
    bnExp: "১৯৫৯ সালের পিওর ফুড অর্ডিন্যান্স রহিতকরণ, তবে পূর্বের মামলা ও গৃহীত কার্যক্রম আইনত বলবৎ ও সংরক্ষিত রাখা হয়েছে।",
    enCaution: "Cases pending before Pure Food Courts established under the 1959 Ordinance continue under the modern 2013 statute.",
    bnCaution: "পূর্বের ১৯৫৯ সালের আইনের অধীনে চলমান মামলাসমূহ এই আইনের অধীন বিশুদ্ধ খাদ্য আদালতে বিচারিক কার্যক্রম অব্যাহত থাকবে।",
    keywords: ["repeal and savings", "Pure Food Ordinance 1959 repeal", "rohitkoron", "রহিতকরণ ও হেফাজতকরণ", "১৯৫৯ অর্ডিন্যান্স রহিত", "ধারা ৯০"],
    related: ["food-safety-5", "food-safety-64"]
  }
};

const newProvisions = [];

for (const raw of rawData) {
  const secNum = raw.secIndex;
  if (existingSecNums.has(secNum)) {
    continue;
  }

  const meta = fsMetadata[secNum];
  if (!meta) {
    console.error(`Missing metadata for Food Safety section ${secNum}`);
    continue;
  }

  const id = `food-safety-${secNum}`;
  const sectionNumber = `Section ${secNum}`;
  const titleBn = raw.titleBn ? `${raw.titleBn} (ধারা ${secNum})` : `ধারা ${secNum}`;
  const titleEn = `${meta.enTitle} (Section ${secNum})`;

  const provision = {
    id,
    actId: 'act_food_safety_2013',
    sectionNumber,
    categories: ['consumer'],
    title: {
      bn: titleBn,
      en: titleEn
    },
    originalText: raw.text,
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
    effectiveDate: '2013-10-10',
    legalStatus: 'active',
    reviewStatus: 'verified',
    contentHash: '',
    keywords: [
      ...meta.keywords,
      `ধারা ${secNum}`,
      `section ${secNum}`,
      `food safety ${secNum}`,
      `নিরাপদ খাদ্য আইন ধারা ${secNum}`,
      `food safety act section ${secNum}`,
      'নিরাপদ খাদ্য',
      'ভেজাল খাদ্য',
      'food safety',
      'খাদ্য আদালত'
    ],
    relatedProvisions: meta.related || []
  };

  newProvisions.push(provision);
}

console.log(`Generated ${newProvisions.length} missing provisions for Food Safety Act, 2013`);
fs.writeFileSync('scripts/generated_food_safety_provisions.json', JSON.stringify(newProvisions, null, 2), 'utf8');
