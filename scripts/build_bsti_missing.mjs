import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('scripts/extracted_raw_bsti.json', 'utf8'));
const existingProvs = JSON.parse(fs.readFileSync('src/data/corpus/provisions.json', 'utf8'));
const existingSecNums = new Set(
  existingProvs
    .filter(p => p.actId === 'act_bsti_2018')
    .map(p => {
      const m = p.sectionNumber.match(/Section\s*(\d+)/i);
      return m ? parseInt(m[1], 10) : null;
    })
    .filter(Boolean)
);

const bstiMetadata = {
  1: {
    enTitle: "Short Title and Commencement",
    enExp: "Names the statute as the Bangladesh Standards and Testing Institution Act, 2018 and came into force immediately across Bangladesh.",
    bnExp: "এই আইনটি 'বাংলাদেশ স্ট্যান্ডার্ডস এন্ড টেস্টিং ইনস্টিটিউশন আইন, ২০১৮' নামে অভিহিত এবং সমগ্র বাংলাদেশে অবিলম্বে কার্যকর হয়েছে।",
    enCaution: "Governs national standardization, testing, calibration, and quality marks for industrial, food, and consumer goods.",
    bnCaution: "সমগ্র বাংলাদেশে উৎপাদিত ও আমদানিকৃত পণ্যের জাতীয় মানদণ্ড ও বিএসটিআই সনদের ক্ষেত্রে এই আইন প্রযোজ্য।",
    keywords: ["BSTI Act 2018", "short title", "standards testing", "bsti ain", "বিএসটিআই আইন ২০১৮", "বিএসটিআই ধারা ১", "ain shuru"],
    related: ["bsti-2", "bsti-4"]
  },
  2: {
    enTitle: "Definitions and Interpretations",
    enExp: "Defines statutory terms including 'Institution', 'Standard Mark', 'License', 'Standardization', 'Quality Clearance', and 'Inspector'.",
    bnExp: "এই ধারায় ইনস্টিটিউশন, স্ট্যান্ডার্ড মার্ক, মানচিহ্ন, লাইসেন্স, মানসনদ, ছাড়পত্র ও পরিদর্শকের সংবিধিবদ্ধ সংজ্ঞা নির্ধারিত।",
    enCaution: "Standard Mark specifically refers to the official BSTI quality certification seal denoting compliance with national standards.",
    bnCaution: "স্ট্যান্ডার্ড মার্ক বা বিএসটিআই সিল অনুমতি ব্যতিরেকে কোনো বাণিজ্যিক পণ্যের মোড়কে ব্যবহার করা আইনত নিষিদ্ধ।",
    keywords: ["BSTI definitions", "Standard Mark definition", "license definition", "shongga bsti", "বিএসটিআই সংজ্ঞা", "মানচিহ্ন", "ধারা ২"],
    related: ["bsti-15", "bsti-16", "bsti-21"]
  },
  3: {
    enTitle: "Act Not in Derogation of Other Laws",
    enExp: "Declares that the provisions of this Act operate supplementary to, and do not prejudice, remedies under other active statutes.",
    bnExp: "এই আইনের বিধানাবলী প্রচলিত অন্য কোনো আইনের বিধানকে ক্ষুণ্ণ না করিয়া উহার অতিরিক্ত হিসেবে গণ্য হইবে।",
    enCaution: "Violations involving food standards can be concurrently prosecuted under the Food Safety Act 2013 or Consumers' Right Protection Act 2009.",
    bnCaution: "খাদ্যপণ্যের নিম্নমানের ক্ষেত্রে বিএসটিআই আইনের পাশাপাশি নিরাপদ খাদ্য আদালত বা ভোক্তা অধিকার অধিদপ্তরেও মামলা হতে পারে।",
    keywords: ["supplementary law", "onno ain", "অন্য আইনের অতিরিক্ত", "বিএসটিআই ধারা ৩", "parallel jurisdiction"],
    related: ["bsti-2", "bsti-35"]
  },
  4: {
    enTitle: "Establishment of the Institution",
    enExp: "Establishes the Bangladesh Standards and Testing Institution (BSTI) as a body corporate with perpetual succession, a common seal, and power to acquire property.",
    bnExp: "বাংলাদেশ স্ট্যান্ডার্ডস এন্ড টেস্টিং ইনস্টিটিউশন (BSTI) একটি সংবিধিবদ্ধ অবিচ্ছিন্ন সত্তা ও সাধারণ সিলমোহরযুক্ত প্রতিষ্ঠান হিসেবে প্রতিষ্ঠিত।",
    enCaution: "BSTI is the sole statutory national standardization and metrology institution in Bangladesh under the Ministry of Industries.",
    bnCaution: "শিল্প মন্ত্রণালয়ের অধীন বিএসটিআই বাংলাদেশের একমাত্র জাতীয় মান ও পরিমাপক নিয়ন্ত্রণকারী সরকারি প্রতিষ্ঠান।",
    keywords: ["BSTI establishment", "body corporate", "institution", "bsti protishtha", "বিএসটিআই প্রতিষ্ঠা", "ধারা ৪"],
    related: ["bsti-5", "bsti-11"]
  },
  5: {
    enTitle: "Head Office and Regional Branch Offices",
    enExp: "Designates Dhaka as the head office of BSTI and empowers it to establish regional branches and testing laboratories across Bangladesh.",
    bnExp: "ইনস্টিটিউশনের প্রধান কার্যালয় ঢাকায় স্থাপন এবং সরকারের পূর্বানুমোদনক্রমে বিভাগ ও জেলায় শাখা কার্যালয় ও টেস্টিং ল্যাব স্থাপনের বিধান।",
    enCaution: "Regional laboratories in divisional cities carry out mandatory testing and calibration services locally.",
    bnCaution: "বিভাগীয় ও আঞ্চলিক কার্যালয়সমূহ থেকে ব্যবসায়ীরা পণ্যের ল্যাব টেস্ট ও মানসনদ সংগ্রহ করতে পারেন।",
    keywords: ["head office", "testing lab", "regional branch", "prodhan karjaloy bsti", "প্রধান কার্যালয়", "বিএসটিআই ল্যাব", "ধারা ৫"],
    related: ["bsti-4", "bsti-11"]
  },
  6: {
    enTitle: "General Direction and Administration",
    enExp: "Vests the general direction and administration of BSTI affairs in its Council, which exercises all powers and functions of the Institution.",
    bnExp: "ইনস্টিটিউশনের সাধারণ পরিচালনা ও প্রশাসনিক কর্তৃত্ব কাউন্সিলের ওপর ন্যস্ত, যাহা ইনস্টিটিউশনের সকল ক্ষমতা প্রয়োগ করিবে।",
    enCaution: "The Council acts in accordance with broad national industrial policy guidelines issued by the Government.",
    bnCaution: "কাউন্সিলের নীতিমালার আলোকেই জাতীয় মান প্রণয়ন ও শিল্প প্রতিষ্ঠানের মান তদারকি পরিচালিত হয়।",
    keywords: ["administration", "BSTI Council", "porichalona", "পরিচালনা ও প্রশাসন", "কাউন্সিল", "ধারা ৬"],
    related: ["bsti-7", "bsti-10"]
  },
  7: {
    enTitle: "Composition of the Council",
    enExp: "Specifies the composition of the BSTI Council headed by the Minister of Industries as Chairman and representatives from ministries, trade bodies, and academia.",
    bnExp: "শিল্পমন্ত্রীর সভাপতিত্বে সংশ্লিষ্ট মন্ত্রণালয়, এফবিসিসিআই, বুয়েট, ঢাকা বিশ্ববিদ্যালয় ও বিজ্ঞান একাডেমির প্রতিনিধিদের সমন্বয়ে কাউন্সিল গঠন।",
    enCaution: "Broad multi-sectoral representation ensures balanced and scientifically rigorous national standards.",
    bnCaution: "ব্যবসায়ী প্রতিনিধি ও বিজ্ঞানী-অধ্যাপকদের সমন্বিত অংশগ্রহণে পণ্যের জাতীয় মান নির্ধারিত হয়।",
    keywords: ["council composition", "minister of industries", "fbcci representation", "council gothon", "কাউন্সিল গঠন", "ধারা ৭"],
    related: ["bsti-6", "bsti-8", "bsti-9"]
  },
  8: {
    enTitle: "Disqualifications of Council Members",
    enExp: "Details statutory disqualifications for Council membership, including insolvency, conviction for moral turpitude, and mental unfitness.",
    bnExp: "কাউন্সিল সদস্যপদের অযোগ্যতার শর্তাবলী, যেমন দেউলিয়া ঘোষণা, নৈতিক স্খলনজনিত অপরাধে কারাদণ্ড বা মানসিক অপ্রকৃতিস্থতা।",
    enCaution: "Members incurring any disqualification cease to hold office immediately upon formal government notification.",
    bnCaution: "আইন অনুযায়ী অযোগ্য ঘোষিত হলে সংশ্লিষ্ট ব্যক্তি তাৎক্ষণিকভাবে সদস্যপদ থেকে অপসারিত হন।",
    keywords: ["disqualification", "moral turpitude", "member oyoggota", "সদস্য অযোগ্যতা", "ধারা ৮"],
    related: ["bsti-7", "bsti-9"]
  },
  9: {
    enTitle: "Tenure of Members and Resignation",
    enExp: "Sets a three-year term for nominated non-official Council members and provides formal procedures for resignation and casual vacancies.",
    bnExp: "কাউন্সিলের মনোনীত বেসরকারি সদস্যদের মেয়াদ ৩ বছর এবং পদত্যাগপত্র দাখিল সংক্রান্ত নিয়মাবলী।",
    enCaution: "A nominated member may resign by writing under their hand addressed to the Chairman of the Council.",
    bnCaution: "পদত্যাগপত্র চেয়ারম্যানের নিকট গৃহীত না হওয়া পর্যন্ত সংশ্লিষ্ট সদস্য দায়িত্ব পালনে দায়বদ্ধ থাকেন।",
    keywords: ["tenure", "resignation", "shodossho meyadh", "সদস্য মেয়াদ", "পদত্যাগ", "ধারা ৯"],
    related: ["bsti-7", "bsti-8"]
  },
  10: {
    enTitle: "Meetings of the Council",
    enExp: "Mandates Council meetings at least twice a year and regulates voting, quorum requirements, and emergency sessions.",
    bnExp: "বৎসরে কমপক্ষে ২ বার কাউন্সিলের সভা অনুষ্ঠানের বাধ্যবাধকতা এবং সভার কোরাম ও সিদ্ধান্ত গ্রহণের কার্যপ্রণালী।",
    enCaution: "Council acts and proceedings are not invalidated merely by reason of any vacancy in the membership.",
    bnCaution: "কাউন্সিলের কোনো পদ শূন্য থাকার কারণে সভার কার্যধারা বা গৃহীত সিদ্ধান্ত বেআইনি হয় না।",
    keywords: ["council meetings", "quorum", "shova", "কাউন্সিলের সভা", "দ্বিবার্ষিক সভা", "ধারা ১০"],
    related: ["bsti-6", "bsti-7"]
  },
  11: {
    enTitle: "Powers and Functions of BSTI",
    enExp: "Details the statutory functions of BSTI: establishing national standards, certifying products, calibrating metrological instruments, and testing commodities.",
    bnExp: "জাতীয় মান নির্ধারণ, মানসনদ প্রদান, পরিমাপক যন্ত্র ক্যালিব্রেশন এবং দেশি-বিদেশি পণ্যের ল্যাবরেটরি টেস্ট ইনস্টিটিউশনের মূল দায়িত্ব।",
    enCaution: "BSTI holds exclusive national authority to designate 'Bangladesh Standards' (BDS) across all consumer and industrial products.",
    bnCaution: "বাংলাদেশে বিডিএস (BDS) স্ট্যান্ডার্ড নির্ধারণের একক সংবিধিবদ্ধ দায়িত্ব বিএসটিআইয়ের।",
    keywords: ["BSTI powers", "national standards", "BDS certification", "bsti karjaboli", "বিএসটিআই কার্যাবলী", "জাতীয় মান প্রণয়ন", "ধারা ১১"],
    related: ["bsti-4", "bsti-15", "bsti-21"]
  },
  12: {
    enTitle: "Committees of the Institution",
    enExp: "Authorizes the Council to form Divisional Standards Committees, Technical Committees, and Advisory Panels to evaluate specific industries.",
    bnExp: "সুনির্দিষ্ট পণ্য ও প্রযুক্তির মান নির্ধারণের জন্য টেকনিক্যাল কমিটি ও বিভাগীয় মান কমিটি গঠনের আইনি কর্তৃত্ব।",
    enCaution: "Technical committees consist of sector specialists who draft and review national standard specifications (BDS).",
    bnCaution: "খাদ্য, বস্ত্র, কেমিক্যাল ও ইলেকট্রনিক্স খাতের মান প্রণয়নে বিশেষজ্ঞ টেকনিক্যাল কমিটি কাজ করে।",
    keywords: ["technical committee", "standards committee", "komiti", "কমিটি গঠন", "টেকনিক্যাল কমিটি", "ধারা ১২"],
    related: ["bsti-6", "bsti-11"]
  },
  13: {
    enTitle: "Appointment and Powers of the Director General",
    enExp: "Provides for the appointment of a Director General as the chief executive officer of BSTI responsible for overall day-to-day administration.",
    bnExp: "সরকার কর্তৃক বিএসটিআইয়ের প্রধান নির্বাহী হিসেবে মহাপরিচালক নিয়োগ এবং দৈনন্দিন প্রশাসনিক পরিচালনার ক্ষমতা।",
    enCaution: "The DG oversees all licensing decisions, inspection drives, and enforcement prosecutions under this Act.",
    bnCaution: "মহাপরিচালকের অনুমোদনক্রমে লাইসেন্স প্রদান, বাতিল এবং অনুমোদনহীন পণ্যের বিরুদ্ধে মোবাইল কোর্ট অভিযান পরিচালিত হয়।",
    keywords: ["Director General BSTI", "DG BSTI", "mohaporichalok bsti", "মহাপরিচালক বিএসটিআই", "প্রধান নির্বাহী", "ধারা ১৩"],
    related: ["bsti-11", "bsti-14", "bsti-24"]
  },
  14: {
    enTitle: "Appointment of Officers and Employees",
    enExp: "Authorizes the appointment of necessary scientific officers, examiners, metrologists, and administrative staff according to service regulations.",
    bnExp: "ইনস্টিটিউশনের জন্য প্রয়োজনীয় বিজ্ঞানী, পরীক্ষক, পরিদর্শক ও কর্মচারী নিয়োগের সংবিধিবদ্ধ বিধান।",
    enCaution: "Officers carry out statutory quality inspections and laboratory analyses with full public servant authority.",
    bnCaution: "বিএসটিআই কর্মকর্তা ও ল্যাব পরীক্ষকগণ আইনত ক্ষমতাপ্রাপ্ত এবং তাদের টেস্ট রিপোর্ট আদালতে প্রামাণ্য দলিল।",
    keywords: ["officer appointment", "scientific officers", "kormokorta niog", "কর্মকর্তা নিয়োগ", "পরীক্ষক", "ধারা ১৪"],
    related: ["bsti-13", "bsti-22"]
  },
  15: {
    enTitle: "Prohibition on Using Standard Mark Without License",
    enExp: "Prohibits any person or business from using the official BSTI Standard Mark or any deceptive imitation thereof without holding a valid license.",
    bnExp: "বৈধ লাইসেন্স গ্রহণ ব্যতিরেকে কোনো পণ্যে বিএসটিআই স্ট্যান্ডার্ড মার্ক বা এর সদৃশ কোনো ভুয়া মানচিহ্ন ব্যবহার সম্পূর্ণরূপে নিষিদ্ধ।",
    enCaution: "Violating Section 15 is a major criminal offense punishable under Section 27 with up to 2 years imprisonment and a 1 lakh taka fine.",
    bnCaution: "অনুমতি ছাড়া পণ্যের গায়ে বিএসটিআই লোগো বা মার্ক ব্যবহার করলে ধারা ২৭ অনুযায়ী সর্বোচ্চ ২ বছরের কারাদণ্ড ও ১ লাখ টাকা জরিমানা হতে পারে।",
    keywords: ["unauthorized standard mark", "fake BSTI logo", "license prohibition", "bhua bsti mark", "অননুমোদিত মানচিহ্ন", "ভুয়া বিএসটিআই লোগো", "ধারা ১৫"],
    related: ["bsti-16", "bsti-21", "bsti-27"]
  },
  16: {
    enTitle: "Grant, Renewal, and Cancellation of Licenses",
    enExp: "Governs the procedure for applying, evaluating, granting, renewing, suspending, or cancelling licenses to use the BSTI Standard Mark.",
    bnExp: "বিএসটিআই স্ট্যান্ডার্ড মার্ক ব্যবহারের লাইসেন্স প্রদান, নবায়ন, স্থগিতকরণ এবং শর্ত ভঙ্গের দায়ে লাইসেন্স বাতিলের নিয়মাবলী।",
    enCaution: "If product samples fail quality benchmarks during surveillance testing, BSTI can summarily cancel or suspend the license.",
    bnCaution: "বাজার তদারকিতে সংগৃহীত নমুনা পরীক্ষায় মান উত্তীর্ণ না হলে কারখানাটির লাইসেন্স বাতিল বা স্থগিত করা হয়।",
    keywords: ["grant of license", "license cancellation", "license renewal", "license batil", "লাইসেন্স প্রদান", "লাইসেন্স বাতিল", "ধারা ১৬"],
    related: ["bsti-15", "bsti-17", "bsti-25"]
  },
  17: {
    enTitle: "Quality Clearance for Imported and Domestic Goods",
    enExp: "Requires mandatory BSTI Quality Clearance (Chharpatro) prior to customs clearance or local marketing for designated imported and local commodities.",
    bnExp: "আমদানিকৃত এবং স্থানীয়ভাবে প্রস্তুতকৃত নির্দিষ্ট পণ্যের ক্ষেত্রে কাস্টমস খালাস ও বাজারজাতকরণের পূর্বে বিএসটিআই ছাড়পত্র গ্রহণ বাধ্যতামূলক।",
    enCaution: "Customs authorities cannot release regulated imported goods without an authentic verification certificate from BSTI.",
    bnCaution: "বিএসটিআইয়ের গুণগত মানের ছাড়পত্র ব্যতিরেকে বন্দর থেকে বাধ্যতামূলক পণ্য খালাস করা বেআইনি।",
    keywords: ["quality clearance", "import clearance", "customs clearance", "charpatro", "গুণগত মানের ছাড়পত্র", "আমদানি ছাড়পত্র", "ধারা ১৭"],
    related: ["bsti-16", "bsti-20", "bsti-27"]
  },
  18: {
    enTitle: "Prohibition on Using Certain Names and Trade Marks",
    enExp: "Prohibits using names, titles, abbreviations, or trademarks containing 'BSTI', 'Bangladesh Standards', or resembling the Institute's identity deceptively.",
    bnExp: "ইনস্টিটিউটের নাম, 'বিএসটিআই', 'বাংলাদেশ স্ট্যান্ডার্ডস' বা সরকার কর্তৃক অনুমোদিত অনুরূপ কোনো বিভ্রান্তিকর নাম বাণিজ্যিক উদ্দেশ্যে ব্যবহার নিষিদ্ধ।",
    enCaution: "Strictly penalizes deceptive brand names that mislead buyers into believing the product has official state patronage or standards approval.",
    bnCaution: "বিএসটিআইয়ের নামের অপব্যবহার করে ভুয়া বাণিজ্যিক ব্র্যান্ডিং করলে ধারা ২৭ মতে কারাদণ্ড ও অর্থদণ্ড হয়।",
    keywords: ["prohibited names", "trade mark abuse", "misleading brand", "nam bebohar nishiddho", "নাম ব্যবহার নিষিদ্ধ", "ধারা ১৮"],
    related: ["bsti-15", "bsti-19", "bsti-27"]
  },
  19: {
    enTitle: "Prohibition of Registration of Deceptive Entities",
    enExp: "Bars the Registrar of Joint Stock Companies and Trademark Registry from registering entities or marks that infringe on BSTI names or marks.",
    bnExp: "আরজেএসসি এবং ট্রেডমার্ক রেজিস্ট্রিকে বিএসটিআই এর নাম বা প্রতীকের সাথে সাদৃশ্যপূর্ণ কোনো কোম্পানি বা ট্রেডমার্ক নিবন্ধন করতে বাধা প্রদান।",
    enCaution: "Any registration obtained in contravention of this section is null, void, and liable to immediate cancellation.",
    bnCaution: "ভুলবশত নিবন্ধিত হয়ে থাকলেও সরকারের আদেশে উক্ত নিবন্ধন তাৎক্ষণিকভাবে বাতিলযোগ্য।",
    keywords: ["registration prohibited", "trademark restriction", "nibondhon nishiddho", "নিবন্ধন নিষিদ্ধ", "ট্রেডমার্ক বিধিনিষেধ", "ধারা ১৯"],
    related: ["bsti-18", "bsti-27"]
  },
  20: {
    enTitle: "Power to Prohibit or Restrict Export of Substandard Goods",
    enExp: "Empowers the Government to prohibit or restrict the export of any article that fails to meet mandatory Bangladesh export quality standards.",
    bnExp: "জাতীয় মান উত্তীর্ণ নয় এমন নিম্নমানের কোনো পণ্য বিদেশে রপ্তানি নিষিদ্ধ বা সীমাবদ্ধ করার সরকারি ক্ষমতা।",
    enCaution: "Exporting substandard goods in breach of an official notification is a punishable offense under Section 28.",
    bnCaution: "রপ্তানি পণ্যের মান রক্ষা করতে ব্যর্থ হলে ধারা ২৮ অনুযায়ী সর্বোচ্চ ১ বছরের কারাদণ্ড ও ৫০ হাজার টাকা জরিমানা হতে পারে।",
    keywords: ["export restriction", "substandard export", "roptani nishiddho", "রপ্তানি নিষিদ্ধকরণ", "ধারা ২০"],
    related: ["bsti-17", "bsti-28"]
  },
  21: {
    enTitle: "Power to Prohibit Sale, Distribution, and Commercial Advertising of Mandatory Products",
    enExp: "Authorizes the Government to make BSTI certification mandatory for specific products, prohibiting their sale, distribution, or advertising without the seal.",
    bnExp: "সরকার প্রজ্ঞাপন দ্বারা কোনো পণ্যের বিএসটিআই মানসনদ বাধ্যতামূলক করিতে পারিবে এবং মানসনদ ও সিল ছাড়া বিক্রয়, বিতরণ বা বিজ্ঞাপন নিষিদ্ধ।",
    enCaution: "Selling mandatory items (e.g. packaged water, milk, cooking oil, cement) without valid BSTI certification is punishable under Section 29.",
    bnCaution: "বাধ্যতামূলক ঘোষিত পণ্যের ক্ষেত্রে বিএসটিআই অনুমোদন ছাড়া বিক্রয় বা বিজ্ঞাপন দিলে ধারা ২৯ অনুযায়ী সর্বোচ্চ ২ বছরের জেল ও ২ লাখ টাকা জরিমানা।",
    keywords: ["mandatory BSTI certification", "prohibited sale without mark", "badhyotamulok ponno", "বাধ্যতামূলক পণ্য", "বিএসটিআই ছাড়া বিক্রি নিষিদ্ধ", "ধারা ২১"],
    related: ["bsti-15", "bsti-27", "bsti-29"]
  },
  22: {
    enTitle: "Appointment and Jurisdiction of Inspectors",
    enExp: "Governs the appointment and powers of BSTI Inspectors authorized to inspect factories, examine weights, collect samples, and verify certification.",
    bnExp: "পণ্যের মান, পরিমাপক যন্ত্র এবং কারখানার মানসনদ পরীক্ষার জন্য পরিদর্শক নিয়োগ ও তাদের আইনি এখতিয়ার।",
    enCaution: "Inspectors carry official photo identification and can enter any commercial premise to inspect compliance during operational hours.",
    bnCaution: "বিএসটিআই পরিদর্শকদের কারখানা পরিদর্শন এবং তাৎক্ষণিক নমুনা পরীক্ষার সরকারি ক্ষমতা রয়েছে।",
    keywords: ["inspectors", "factory inspection", "poridorshok", "পরিদর্শক", "বিএসটিআই পরিদর্শক", "ধারা ২২"],
    related: ["bsti-14", "bsti-23", "bsti-30"]
  },
  23: {
    enTitle: "Power to Require Information, Books, and Records",
    enExp: "Authorizes the DG or Inspectors to require manufacturers and traders to furnish information, production records, and raw material ledgers.",
    bnExp: "পণ্য প্রস্তুত ও মান নিয়ন্ত্রণ সংক্রান্ত খাতা, কাঁচামালের রেকর্ড ও তথ্য দাখিল করার নির্দেশ প্রদানের সরকারি ক্ষমতা।",
    enCaution: "Failing to furnish demanded documents or providing deceptive statements is punishable under general provisions.",
    bnCaution: "পরিদর্শকের তলবে তথ্য গোপনের চেষ্টা করলে বা ভুয়া হিসাব প্রদর্শন করলে তা দণ্ডনীয় অপরাধ।",
    keywords: ["require information", "production records", "tothyo songgroho", "তথ্য সংগ্রহের ক্ষমতা", "রেকর্ড তলব", "ধারা ২৩"],
    related: ["bsti-22", "bsti-30"]
  },
  25: {
    enTitle: "Appeals Against Decisions of the Institution or Director General",
    enExp: "Provides an administrative appeal mechanism for persons aggrieved by the refusal, cancellation, or suspension of a license within 30 days.",
    bnExp: "লাইসেন্স প্রত্যাখ্যান, বাতিল বা স্থগিতের আদেশের বিরুদ্ধে সংক্ষুব্ধ ব্যক্তি ৩০ দিনের মধ্যে সরকারের নিকট আপিল দায়ের করতে পারেন।",
    enCaution: "The appeal must be filed within 30 calendar days along with the prescribed treasury fee, and the government's appellate decision is final.",
    bnCaution: "আদেশের ৩০ দিনের মধ্যে মন্ত্রণালয়ে আপিল করতে হবে; নির্ধারিত সময় পার হলে আদেশ চূড়ান্ত হয়ে যায়।",
    keywords: ["administrative appeal", "license appeal", "appeal bsti", "আপিল", "লাইসেন্স আপিল", "ধারা ২৫"],
    related: ["bsti-16", "bsti-27"]
  },
  26: {
    enTitle: "Duty to Maintain Confidentiality of Trade Secrets",
    enExp: "Requires BSTI officers and examiners to maintain strict confidentiality regarding manufacturer trade secrets, manufacturing formulas, and proprietary patents.",
    bnExp: "পরিদর্শন ও পরীক্ষার সময় জানা যাওয়া কোনো কোম্পানির উৎপাদন ফর্মুলা, বাণিজ্যিক গোপনীয়তা বা প্যাটেন্ট তথ্য গোপন রাখার আইনি বাধ্যবাধকতা।",
    enCaution: "Breach of confidentiality by any BSTI officer is a criminal offense punishable under Section 31.",
    bnCaution: "কোনো কর্মকর্তা অননুমোদিতভাবে ব্যবসায়ীর গোপনীয় ফর্মুলা ফাঁস করলে তার বিরুদ্ধে ফৌজদারি ব্যবস্থা ও চাকরিচ্যুতির বিধান রয়েছে।",
    keywords: ["confidentiality", "trade secrets", "manufacturing formula", "goponiyota", "গোপনীয়তা রক্ষা", "বাণিজ্যিক গোপনীয়তা", "ধারা ২৬"],
    related: ["bsti-22", "bsti-31"]
  },
  29: {
    enTitle: "Penalty for Selling Mandatory Products Without BSTI Certification",
    enExp: "Prescribes imprisonment for up to 2 years, or a fine from 25,000 to 2,00,000 taka, or both, for selling, distributing, or advertising mandatory products without BSTI mark.",
    bnExp: "বাধ্যতামূলক মানসনদ ব্যতিরেকে ধারা ২১ এর অধীন ঘোষিত পণ্য বিক্রয়, বিতরণ বা বিজ্ঞাপন দিলে অনূর্ধ্ব ২ বছর কারাদণ্ড বা ২৫ হাজার থেকে ২ লাখ টাকা অর্থদণ্ড বা উভয় দণ্ড।",
    enCaution: "Retailers, wholesalers, and manufacturers share joint liability if they stock or display uncertified mandatory consumer items.",
    bnCaution: "বাধ্যতামূলক পণ্য যেমন বোতলজাত পানি, ভোজ্যতেল বা সিমেন্ট বিএসটিআই সিল ছাড়া দোকানে রাখলে বিক্রেতা সরাসরি এই ধারায় দণ্ডিত হবেন।",
    keywords: ["penalty section 21", "mandatory mark penalty", "dondho 29", "ধারা ২১ লঙ্ঘনের দণ্ড", "অননুমোদিত পণ্য বিক্রির শাস্তি", "ধারা ২৯"],
    related: ["bsti-21", "bsti-32", "bsti-35"]
  },
  30: {
    enTitle: "Penalty for Obstructing BSTI Inspectors",
    enExp: "Punishes obstructing, assaulting, or preventing an Inspector or authorized officer in the performance of their statutory duties with imprisonment up to 1 year and fine.",
    bnExp: "বিএসটিআই পরিদর্শককে দায়িত্ব পালনে বাধা প্রদান বা অসদাচরণ করলে অনূর্ধ্ব ১ বছর কারাদণ্ড বা ৫০ হাজার টাকা অর্থদণ্ড বা উভয় দণ্ড।",
    enCaution: "Preventing entry to premises or hiding inspection samples constitutes active obstruction under this Section.",
    bnCaution: "কারখানা পরিদর্শনে বাধা দিলে বা পরিদর্শন দলকে তালাবদ্ধ করার চেষ্টা করলে তাৎক্ষণিক পুলিশি গ্রেপ্তার ও মামলা হবে।",
    keywords: ["obstruction penalty", "resisting inspection", "badha prodan", "পরিদর্শককে বাধা প্রদানের দণ্ড", "ধারা ৩০"],
    related: ["bsti-22", "bsti-23"]
  },
  31: {
    enTitle: "General Penalties for Other Contraventions",
    enExp: "Provides a residual penalty of up to 6 months imprisonment, or fine up to 25,000 taka, or both, for any contravention of this Act without specific punishment.",
    bnExp: "এই আইনের অন্য কোনো বিধান লঙ্ঘনের ক্ষেত্রে নির্দিষ্ট শাস্তি না থাকলে অনূর্ধ্ব ৬ মাস কারাদণ্ড বা ২৫ হাজার টাকা অর্থদণ্ড বা উভয় দণ্ডের সাধারণ বিধান।",
    enCaution: "Applies to procedural defaults, failing to keep standard registers, or breach of reporting requirements.",
    bnCaution: "নির্দিষ্ট কোনো শাস্তির উল্লেখ না থাকা অন্যান্য নিয়ম ভঙ্গের ক্ষেত্রে এই ধারায় আদালত অর্থদণ্ড আরোপ করে।",
    keywords: ["general penalty", "residual punishment", "onnanhyo oporadh", "অন্যান্য অপরাধের দণ্ড", "ধারা ৩১"],
    related: ["bsti-27", "bsti-28", "bsti-29"]
  },
  32: {
    enTitle: "Enhanced Punishment for Repeat Offenses",
    enExp: "Mandates double the maximum statutory punishment or fine for any person convicted of repeating an offense under this Act.",
    bnExp: "একই অপরাধ দ্বিতীয়বার বা পুনঃসংঘটন করিলে সংশ্লিষ্ট অপরাধের জন্য নির্ধারিত সর্বোচ্চ দণ্ডের দ্বিগুণ দণ্ডে দণ্ডিত করার বিধান।",
    enCaution: "Judicial Magistrates are legally bound to impose escalated penalties on repeat offenders in standard violations.",
    bnCaution: "পূর্বে সাজাপ্রাপ্ত কোনো ব্যবসায়ী আবার একই ভেজাল বা নকল সিল ব্যবহার করলে দ্বিগুণ কারাদণ্ড ও অর্থদণ্ড নিশ্চিত।",
    keywords: ["repeat offense", "enhanced penalty", "oporadh punohshonggothon", "অপরাধ পুনঃসংঘটনের দণ্ড", "দ্বিগুণ শাস্তি", "ধারা ৩২"],
    related: ["bsti-27", "bsti-29", "bsti-31"]
  },
  33: {
    enTitle: "Cognizance of Offenses by Courts",
    enExp: "Bars courts from taking cognizance of offenses under this Act except upon a written complaint made by the DG or an authorized BSTI officer.",
    bnExp: "মহাপরিচালক বা তদ্‌কর্তৃক ক্ষমতাপ্রাপ্ত কোনো বিএসটিআই কর্মকর্তার লিখিত অভিযোগ ব্যতীত কোনো আদালত এই আইনের অধীন কোনো অপরাধ আমলে গ্রহণ করবে না।",
    enCaution: "Individual citizens cannot file private criminal complaints directly in magistrate courts; they must report violations to BSTI for prosecution.",
    bnCaution: "নাগরিকরা সরাসরি ফৌজদারি আদালতে মামলা করতে পারেন না, তাদের বিএসটিআই কার্যালয়ে লিখিত অভিযোগ বা ভোক্তা অধিকার অধিদপ্তরে নালিশ জানাতে হবে।",
    keywords: ["cognizance of offense", "written complaint", "amole grohon", "অপরাধ বিচারার্থে গ্রহণ", "লিখিত অভিযোগ", "ধারা ৩৩"],
    related: ["bsti-34", "bsti-35"]
  },
  34: {
    enTitle: "Trial of Offenses by Magistrates",
    enExp: "Specifies that offenses under this Act are triable exclusively by a Judicial Magistrate of the First Class or a Metropolitan Magistrate.",
    bnExp: "এই আইনের অধীন সকল অপরাধের বিচার কেবলমাত্র প্রথম শ্রেণীর জুডিসিয়াল ম্যাজিস্ট্রেট বা মেট্রোপলিটন ম্যাজিস্ট্রেট আদালত কর্তৃক অনুষ্ঠিত হবে।",
    enCaution: "Trials proceed according to standard procedures prescribed in the Code of Criminal Procedure 1898.",
    bnCaution: "ম্যাজিস্ট্রেট আদালত মামলার সাক্ষ্য প্রমাণ পর্যালোচনা করে রায় ও দণ্ড প্রদান করেন।",
    keywords: ["trial of offenses", "first class magistrate", "metropolitan magistrate", "bichar", "অপরাধের বিচার", "ম্যাজিস্ট্রেট আদালত", "ধারা ৩৪"],
    related: ["bsti-33", "bsti-36"]
  },
  35: {
    enTitle: "Application of the Mobile Court Act, 2009",
    enExp: "Expressly incorporates offenses under this Act into the Schedule of the Mobile Court Act, 2009 for on-the-spot summary punishment.",
    bnExp: "ঘটনাস্থলে তাৎক্ষণিক বিচার ও দণ্ড আরোপের লক্ষ্যে মোবাইল কোর্ট আইন ২০০৯ এর তফসিলভুক্ত করার সংবিধিবদ্ধ বিধান।",
    enCaution: "Executive Magistrates accompanied by BSTI examiners can conduct mobile raids, seize fake products, and impose fines immediately.",
    bnCaution: "জেলা প্রশাসনের ভ্রাম্যমাণ আদালত বিএসটিআই বিশেষজ্ঞদের নিয়ে তাৎক্ষণিকভাবে বাজার ও কারখানায় অভিযান চালিয়ে জরিমানা ও জেল দিতে পারে।",
    keywords: ["mobile court", "on the spot fine", "mobile court ain 2009", "মোবাইল কোর্টের প্রয়োগ", "ভ্রাম্যমাণ আদালত", "ধারা ৩৫"],
    related: ["bsti-21", "bsti-29", "bsti-34"]
  },
  36: {
    enTitle: "Special Powers of Magistrate Regarding Fines",
    enExp: "Empowers Magistrates to impose the full statutory fines under this Act exceeding standard monetary limits under Section 32 of the CrPC.",
    bnExp: "ফৌজদারি কার্যবিধির ৩২ ধারার সীমাবদ্ধতা অতিক্রম করে এই আইনের নির্ধারিত পূর্ণ অর্থদণ্ড আরোপে ম্যাজিস্ট্রেটের বিশেষ ক্ষমতা।",
    enCaution: "Magistrates can impose statutory fines up to 2,00,000 taka without requiring committal to the Court of Sessions.",
    bnCaution: "ম্যাজিস্ট্রেট এই আইনের অধীনে ২ লাখ টাকা পর্যন্ত যেকোনো জরিমানার আদেশ সরাসরি প্রদান করতে পারেন।",
    keywords: ["special powers of magistrate", "magistrates fine", "orthodondo khomota", "অর্থদণ্ড আরোপের বিশেষ ক্ষমতা", "ম্যাজিস্ট্রেটের ক্ষমতা", "ধারা ৩৬"],
    related: ["bsti-34", "bsti-35"]
  },
  37: {
    enTitle: "Confiscation of Substandard and Illegal Goods",
    enExp: "Empowers the trial Court or Mobile Court to order the forfeiture and destruction of articles, packaging, and machinery involved in the offense.",
    bnExp: "অপরাধে ব্যবহৃত নিম্নমানের পণ্য, নকল সিলযুক্ত মোড়ক ও উৎপাদনকারী যন্ত্রপাতি রাষ্ট্রের অনুকূলে বাজেয়াপ্ত করার আদেশ প্রদানের ক্ষমতা।",
    enCaution: "Confiscated uncertified consumer goods are destroyed in the presence of law enforcement to prevent re-entry into commerce.",
    bnCaution: "বাজেয়াপ্তকৃত নকল বা ঝুঁকিপূর্ণ পণ্য জনসমক্ষে বিনষ্ট করা হয় যাতে তা বাজারে পুনঃপ্রবেশ করতে না পারে।",
    keywords: ["confiscation", "forfeiture of goods", "bajeyapto", "বাজেয়াপ্তকরণ", "মালপত্র বাজেয়াপ্ত", "ধারা ৩৭"],
    related: ["bsti-34", "bsti-38"]
  },
  38: {
    enTitle: "Powers of Search and Seizure",
    enExp: "Regulates search and seizure operations by Inspectors, requiring seizure list preparation, witness presence, and adherence to CrPC safeguards.",
    bnExp: "কারখানা বা গুদামে তল্লাশি ও মালামাল জব্দের সময় নিরপেক্ষ সাক্ষীর উপস্থিতি এবং বিধিবদ্ধ জব্দ তালিকা প্রস্তুতের নিয়ম।",
    enCaution: "Seizure lists must accurately record batch numbers, quantities, and descriptions of seized counterfeit standard mark items.",
    bnCaution: "জব্দ তালিকায় মালামালের সঠিক বিবরণ ও সাক্ষীদের স্বাক্ষর না থাকলে আদালতে মামলা প্রমাণের জটিলতা তৈরি হতে পারে।",
    keywords: ["search and seizure", "seizure list", "tollashi", "তল্লাশি ও জব্দকরণ", "জব্দ তালিকা", "ধারা ৩৮"],
    related: ["bsti-22", "bsti-37"]
  },
  39: {
    enTitle: "Offenses Committed by Companies and Corporate Bodies",
    enExp: "Establishes corporate liability, holding directors, managers, and corporate officers personally liable unless they prove due diligence.",
    bnExp: "কোম্পানি কর্তৃক অপরাধ সংঘটিত হলে মালিক, পরিচালক, ম্যানেজার ও সচিব ব্যক্তিগতভাবে অপরাধী সাব্যস্ত হবেন, যদি না তারা প্রমাণ করেন এটি তাদের অজ্ঞাতে ঘটেছে।",
    enCaution: "Corporate executives cannot evade liability by hiding behind legal entity status for mass substandard product distribution.",
    bnCaution: "কোম্পানির তৈরি নিম্নমানের পণ্যের জন্য কারখানার এমডি, পরিচালক ও কোয়ালিটি ইনচার্জ সরাসরি দায়ী থাকেন।",
    keywords: ["company offense", "corporate liability", "director liability", "companyr oporadh", "কোম্পানী কর্তৃক অপরাধ", "পরিচালকের দায়", "ধারা ৩৯"],
    related: ["bsti-27", "bsti-29"]
  },
  40: {
    enTitle: "Compounding of Offenses",
    enExp: "Authorizes the DG to compound minor offenses under this Act prior to court filing upon payment of prescribed compounding fines.",
    bnExp: "মামলা দায়েরের পূর্বে মহাপরিচালক কর্তৃক নির্ধারিত জরিমানা আদায়ের মাধ্যমে লঘুপাপ বা অনবধানতাবশত অপরাধ আপোষ নিষ্পত্তির ক্ষমতা।",
    enCaution: "Compounding is not permitted for repeat offenders or offenses involving deliberate public health endangerment.",
    bnCaution: "জনস্বাস্থ্যের জন্য মারাত্মক ক্ষতিকর কোনো কর্মকাণ্ড আপোষ নিষ্পত্তির আওতায় আসবে না।",
    keywords: ["compounding", "settlement of offense", "aposh nishpotti", "অপরাধ আপোষযোগ্যতা", "ধারা ৪০"],
    related: ["bsti-27", "bsti-33"]
  },
  41: {
    enTitle: "BSTI Fund and Sources of Revenue",
    enExp: "Establishes the BSTI Fund comprising testing fees, certification charges, government grants, and authorized revenue sources.",
    bnExp: "পরীক্ষা ফি, লাইসেন্স নবায়ন ফি, সরকারি অনুদান এবং অন্যান্য আইনানুগ উৎস থেকে অর্জিত অর্থে বিএসটিআই তহবিল পরিচালনার বিধান।",
    enCaution: "All revenues must be deposited in scheduled bank accounts and audited annually under strict public finance laws.",
    bnCaution: "তহবিলের অর্থ ইনস্টিটিউশনের ল্যাব আধুনিকায়ন ও বৈজ্ঞানিক যন্ত্রপাতি ক্রয়ে ব্যবহার করা হয়।",
    keywords: ["BSTI Fund", "testing fees", "certification revenue", "bsti tohovil", "ইনস্টিটিউশনের তহবিল", "ধারা ৪১"],
    related: ["bsti-42", "bsti-43"]
  },
  42: {
    enTitle: "Annual Budget Estimates",
    enExp: "Directs BSTI to prepare annual budget estimates for each financial year and submit them to the Ministry of Industries for sanction.",
    bnExp: "প্রতিটি অর্থ বছরের সম্ভাব্য আয় ও ব্যয়ের বার্ষিক বাজেট প্রস্তুত করে সরকারের অনুমোদনের জন্য পেশ করার আইনি বাধ্যবাধকতা।",
    enCaution: "No operational expenditure can be incurred exceeding approved budgetary limits without revised ministerial sanction.",
    bnCaution: "অনুমোদিত বাজেটের বাইরে কোনো আর্থিক ব্যয় করা সরকারি আর্থিক নিয়মের চরম লঙ্ঘন হিসেবে গণ্য হয়।",
    keywords: ["budget estimates", "annual budget", "bajet bsti", "বার্ষিক বাজেট", "ধারা ৪২"],
    related: ["bsti-41", "bsti-43"]
  },
  43: {
    enTitle: "Maintenance of Accounts and Statutory Audit",
    enExp: "Requires BSTI to maintain proper books of accounts and submit to annual audit by the Comptroller and Auditor-General of Bangladesh.",
    bnExp: "ইনস্টিটিউশনের যথাযথ হিসাব সংরক্ষণ এবং সিএজি কর্তৃক বার্ষিক সরকারি অডিট সম্পাদনের সংবিধিবদ্ধ বিধান।",
    enCaution: "Statutory audit reports are submitted to Parliament via the Government to maintain financial transparency.",
    bnCaution: "অডিট আপত্তির ক্ষেত্রে সংশ্লিষ্ট কর্মকর্তাদের আর্থিক জবাবদিহিতা নিশ্চিত করা হয়।",
    keywords: ["audit", "CAG audit", "accounts", "hisab nirikkha", "হিসাব রক্ষণ ও নিরীক্ষা", "ধারা ৪৩"],
    related: ["bsti-41", "bsti-44"]
  },
  44: {
    enTitle: "Submission of Annual Performance Report",
    enExp: "Directs BSTI to prepare an annual report detailing standard developments, market testing statistics, and enforcement drives for submission to Government.",
    bnExp: "বছরের কর্মকাণ্ড, প্রণীত মানসমূহ, ল্যাব টেস্টের পরিসংখ্যান ও বাজার অভিযানের বিবরণসহ বার্ষিক প্রতিবেদন সরকারের নিকট দাখিলের নিয়ম।",
    enCaution: "Annual reports document industrial compliance rates and list penalized manufacturers for public record.",
    bnCaution: "বার্ষিক প্রতিবেদনে জাতীয় গুণগত মানের অবস্থা এবং লাইসেন্সপ্রাপ্ত প্রতিষ্ঠানের তথ্য সংরক্ষিত থাকে।",
    keywords: ["annual report", "performance report", "barshik protibedon", "বার্ষিক প্রতিবেদন", "ধারা ৪৪"],
    related: ["bsti-11", "bsti-43"]
  },
  45: {
    enTitle: "Indemnity for Action Taken in Good Faith",
    enExp: "Protects the Council, DG, Inspectors, and BSTI staff from civil suits or criminal prosecutions for acts done in good faith under this Act.",
    bnExp: "এই আইনের অধীন সরল বিশ্বাসে দায়িত্ব পালনকালে কৃত কোনো কাজের জন্য কর্মকর্তাদের বিরুদ্ধে মামলা করার প্রতিবন্ধকতা।",
    enCaution: "Statutory immunity does not protect deliberate extortion, fraudulent test certification, or corrupt practices.",
    bnCaution: "উদ্দেশ্যপ্রণোদিত অনিয়ম বা দুর্নীতির প্রমাণ থাকলে সংশ্লিষ্ট কর্মকর্তার বিরুদ্ধে ফৌজদারি ব্যবস্থা নেওয়া যায়।",
    keywords: ["indemnity", "good faith protection", "shorol bishashe kaj", "সরল বিশ্বাসে কৃত কার্য", "দায়মুক্তি", "ধারা ৪৫"],
    related: ["bsti-46"]
  },
  46: {
    enTitle: "Officers and Staff to be Public Servants",
    enExp: "Declares all members, officers, inspectors, and employees of BSTI to be public servants within the meaning of Section 21 of the Penal Code.",
    bnExp: "ইনস্টিটিউশনের সকল সদস্য, কর্মকর্তা, পরিদর্শক ও কর্মচারী দণ্ডবিধির ২১ ধারা অনুযায়ী সরকারি কর্মচারী হিসেবে গণ্য হবেন।",
    enCaution: "Assaulting or obstructing a BSTI officer in execution of duty attracts aggravated penalties under the Penal Code.",
    bnCaution: "বিএসটিআই কর্মকর্তাদের দায়িত্ব পালনে বাধা দিলে সরকারি কাজে বাধার দায়ে সরাসরি গ্রেপ্তার ও দণ্ড হতে পারে।",
    keywords: ["public servants", "penal code 21", "jonoshebok", "জনসেবক", "সরকারি কর্মচারী", "ধারা ৪৬"],
    related: ["bsti-22", "bsti-30"]
  },
  47: {
    enTitle: "Assistance from Police, Customs, and Public Authorities",
    enExp: "Mandates the Police, Customs, Port Authorities, and local administration to provide active assistance to BSTI officers upon requisition.",
    bnExp: "অভিযান ও পরিদর্শন পরিচালনার স্বার্থে পুলিশ, কাস্টমস ও স্থানীয় প্রশাসনকে বিএসটিআই কর্মকর্তাদের সর্বাত্মক সহায়তা প্রদানের বাধ্যবাধকতা।",
    enCaution: "Port and Customs officials must collaborate to prevent importation of non-compliant foreign commodities.",
    bnCaution: "সীমান্ত ও বন্দরে নিম্নমানের পণ্য প্রবেশ ঠেকাতে কাস্টমস ও বিএসটিআই যৌথভাবে কাজ করে।",
    keywords: ["customs assistance", "police aid", "shohayota", "পুলিশ ও শুল্ক কর্তৃপক্ষের সহায়তা", "ধারা ৪৭"],
    related: ["bsti-17", "bsti-22"]
  },
  48: {
    enTitle: "Power of Government to Make Rules",
    enExp: "Empowers the Government, by notification in the official Gazette, to make statutory rules to implement the provisions and purposes of this Act.",
    bnExp: "এই আইনের উদ্দেশ্য সফল করার জন্য সরকার কর্তৃক সরকারি গেজেটে প্রজ্ঞাপন দ্বারা বিধি প্রণয়নের আইনি ক্ষমতা।",
    enCaution: "Rules detail specific schedules of fees, testing procedures, and licensing renewal protocols.",
    bnCaution: "বিধিমালায় বিভিন্ন পণ্যের সনদ গ্রহণের ফি এবং ল্যাবরেটরি টেস্টের বিস্তারিত কারিগরি শর্ত নির্ধারিত হয়।",
    keywords: ["rule making power", "government rules", "bidhi pronoyon", "বিধি প্রণয়নের ক্ষমতা", "ধারা ৪৮"],
    related: ["bsti-49", "bsti-50"]
  },
  49: {
    enTitle: "Power of Institution to Make Regulations",
    enExp: "Empowers the Institution, with prior approval of the Government, to frame operational regulations governing internal management and staff.",
    bnExp: "সরকারের পূর্বানুমোদন সাপেক্ষে ইনস্টিটিউশন কর্তৃক অভ্যন্তরীণ পরিচালনা ও কর্মচারী চাকরি প্রবিধান প্রণয়নের কর্তৃত্ব।",
    enCaution: "Regulations establish internal lab testing workflows, sample handling criteria, and employee conduct.",
    bnCaution: "প্রবিধানের মাধ্যমে ল্যাবের কাজের মানদণ্ড এবং প্রশাসনিক পরিচালনা সুনির্দিষ্ট করা হয়।",
    keywords: ["regulation making power", "internal regulations", "probidhan", "প্রবিধান প্রণয়নের ক্ষমতা", "ধারা ৪৯"],
    related: ["bsti-48"]
  },
  50: {
    enTitle: "Removal of Difficulties",
    enExp: "Empowers the Government to issue clarification orders to remove any practical difficulty in giving effect to the provisions of this Act.",
    bnExp: "এই আইনের বিধান কার্যকর করার ক্ষেত্রে কোনো অস্পষ্টতা বা অসুবিধা দেখা দিলে সরকার আদেশ দ্বারা তা দূর করতে পারবে।",
    enCaution: "Clarification orders cannot contradict the primary substantive provisions of the Act.",
    bnCaution: "অস্পষ্টতা দূরীকরণের আদেশ আইনের মূল বিধানের পরিপন্থী হতে পারবে না।",
    keywords: ["removal of difficulties", "clarification orders", "oshposhtota durikoron", "অস্পষ্টতা দূরীকরণ", "ধারা ৫০"],
    related: ["bsti-48", "bsti-51"]
  },
  51: {
    enTitle: "Repeal and Savings",
    enExp: "Repeals the Bangladesh Standards and Testing Institution Ordinance, 1985 (Ordinance XXXVII of 1985) while legally saving prior acts, licenses, and regulations.",
    bnExp: "১৯৮৫ সালের বিএসটিআই অধ্যাদেশ রহিত করা হয়েছে, তবে পূর্ববর্তী সকল লাইসেন্স, বিধি ও কার্যক্রম আইনত বহাল ও সংরক্ষিত রাখা হয়েছে।",
    enCaution: "Existing BSTI licenses issued under the 1985 Ordinance remain valid until their expiration or formal renewal under this Act.",
    bnCaution: "পূর্বের ১৯৮৫ সালের অধ্যাদেশের অধীনে প্রদত্ত সনদসমূহ মেয়াদ শেষ না হওয়া পর্যন্ত আইনত বলবৎ থাকবে।",
    keywords: ["repeal and savings", "ordinance 1985 repeal", "rohitkoron", "রহিতকরণ ও হেফাজতকরণ", "১৯৮৫ অধ্যাদেশ রহিত", "ধারা ৫১"],
    related: ["bsti-4", "bsti-16"]
  },
  52: {
    enTitle: "Publication of Authentic English Text",
    enExp: "Authorizes the publication of an authentic English text of this Act, stipulating that the original Bengali text prevails in case of conflict.",
    bnExp: "এই আইনের মূল বাংলা পাঠের একটি নির্ভরযোগ্য ইংরেজি পাঠ প্রকাশের বিধান, তবে বিরোধের ক্ষেত্রে বাংলা পাঠ প্রাধান্য পাইবে।",
    enCaution: "Legal interpretations in Bangladesh courts must be grounded on the authoritative Bengali gazette text.",
    bnCaution: "আদালতে বা আইনি কার্যধারায় কোনো বিরোধ দেখা দিলে মূল বাংলা পাঠই চূড়ান্ত হিসেবে গণ্য হবে।",
    keywords: ["authentic english text", "bengali text prevails", "ingreji path", "ইংরেজি পাঠ প্রকাশ", "বাংলা প্রাধান্য", "ধারা ৫২"],
    related: ["bsti-1"]
  }
};

const newProvisions = [];

for (const raw of rawData) {
  const secNum = raw.secIndex;
  if (existingSecNums.has(secNum)) {
    continue;
  }

  const meta = bstiMetadata[secNum];
  if (!meta) {
    console.error(`Missing metadata for BSTI section ${secNum}`);
    continue;
  }

  const id = `bsti-${secNum}`;
  const sectionNumber = `Section ${secNum}`;
  const titleBn = raw.titleBn ? `${raw.titleBn} (ধারা ${secNum})` : `ধারা ${secNum}`;
  const titleEn = `${meta.enTitle} (Section ${secNum})`;

  const provision = {
    id,
    actId: 'act_bsti_2018',
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
    effectiveDate: '2018-11-14',
    legalStatus: 'active',
    reviewStatus: 'verified',
    contentHash: '',
    keywords: [
      ...meta.keywords,
      `ধারা ${secNum}`,
      `section ${secNum}`,
      `bsti ${secNum}`,
      `বিএসটিআই আইন ধারা ${secNum}`,
      `bsti act section ${secNum}`,
      'বিএসটিআই',
      'bsti',
      'মানচিহ্ন',
      'standard mark'
    ],
    relatedProvisions: meta.related || []
  };

  newProvisions.push(provision);
}

console.log(`Generated ${newProvisions.length} missing provisions for BSTI Act, 2018`);
fs.writeFileSync('scripts/generated_bsti_provisions.json', JSON.stringify(newProvisions, null, 2), 'utf8');
