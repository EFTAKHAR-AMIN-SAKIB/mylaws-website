import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('scripts/extracted_raw_consumer.json', 'utf8'));
const existingProvs = JSON.parse(fs.readFileSync('src/data/corpus/provisions.json', 'utf8'));
const existingSecNums = new Set(
  existingProvs
    .filter(p => p.actId === 'act_consumer_2009')
    .map(p => {
      const m = p.sectionNumber.match(/Section\s*(\d+)/i);
      return m ? parseInt(m[1], 10) : null;
    })
    .filter(Boolean)
);

// Metadata map for Consumer Act sections 1-36, 57-59, 61-70, 72-75, 77-82
const consumerMetadata = {
  1: {
    enTitle: "Short Title and Commencement",
    enExp: "Establishes the official name as the Consumers' Right Protection Act, 2009 and specifies that it came into force immediately across Bangladesh.",
    bnExp: "এই আইনটি 'ভোক্তা-অধিকার সংরক্ষণ আইন, ২০০৯' নামে অভিহিত এবং গেজেট প্রকাশের সাথে সাথেই সমগ্র বাংলাদেশে কার্যকর হয়েছে।",
    enCaution: "Applicable universally across Bangladesh to all consumer transactions, goods, and commercial services unless specifically exempted.",
    bnCaution: "আইনটি কোনো নির্দিষ্ট এলাকার জন্য সীমাবদ্ধ নয়, সমগ্র বাংলাদেশে ভোক্তা অধিকার সংক্রান্ত সকল বিরোধে প্রযোজ্য।",
    keywords: ["short title", "commencement", "consumer act 2009", "bhokta odhikar ain 2009", "আইন কার্যকর", "ভোক্তা অধিকার ধারা ১", "ain shuru", "ain proyug"],
    related: ["consumer-2", "consumer-3"]
  },
  2: {
    enTitle: "Definitions and Interpretations",
    enExp: "Defines foundational statutory terms including 'consumer', 'commercial service', 'anti-consumer right practice', 'counterfeit goods', and the 'Directorate'.",
    bnExp: "এই ধারায় ভোক্তা, সেবা, ভোক্তা-অধিকার বিরোধী কার্য, ক্ষতিকর পণ্য, নকল পণ্য ও অধিদপ্তরের সংবিধিবদ্ধ আইনি সংজ্ঞা প্রদান করা হয়েছে।",
    enCaution: "Legal protection applies strictly to end consumers who purchase for personal consumption or livelihood, not commercial resale intermediaries.",
    bnCaution: "পুনর্বিক্রয়ের উদ্দেশ্যে বা বাণিজ্যিক উদ্দেশ্যে পণ্য ক্রয়কারী সাধারণ অর্থে এই আইনের ভোক্তা সংজ্ঞার মধ্যে পড়েন না।",
    keywords: ["consumer definition", "anti consumer practice", "commercial service", "vokta shongga", "bhokta mane ki", "ভোক্তা সংজ্ঞা", "ভোক্তার অধিকার কি", "ধারা ২"],
    related: ["consumer-1", "consumer-40", "consumer-76"]
  },
  3: {
    enTitle: "Act to be in Addition to Other Laws",
    enExp: "Declares that the provisions of this Act are supplementary to, and do not derogate from or repeal, any other existing laws in force.",
    bnExp: "এই আইনের বিধানাবলী অন্য কোনো প্রচলিত আইনকে ক্ষুণ্ণ করে না, বরং অন্যান্য আইনের অতিরিক্ত হিসেবে বলবৎ থাকে।",
    enCaution: "Remedies under this Act do not preclude separate criminal prosecution under the Penal Code or Special Powers Act.",
    bnCaution: "ভোক্তা আইনে প্রতিকার পাওয়ার পাশাপাশি দণ্ডবিধি বা নিরাপদ খাদ্য আইনেও পৃথক আইনি পদক্ষেপ গ্রহণ করা যায়।",
    keywords: ["supplementary law", "in addition to other laws", "onno ain khunno na", "অন্য আইনের অতিরিক্ত", "ভোক্তা অধিকার ধারা ৩", "parallel remedies"],
    related: ["consumer-75", "consumer-71"]
  },
  4: {
    enTitle: "Exemption from Operation of Act",
    enExp: "Empowers the Government to exempt any specific service, trade, or designated geographic area from the operation of this Act by official gazette notification.",
    bnExp: "সরকার সরকারি গেজেটে প্রজ্ঞাপন জারি করে যেকোনো বিশেষ সেবা, খাত বা ভৌগোলিক এলাকাকে নির্দিষ্ট মেয়াদের জন্য এই আইনের আওতা থেকে অব্যাহতি দিতে পারে।",
    enCaution: "Exemptions must be explicitly published via official government gazette; private businesses cannot claim informal waivers.",
    bnCaution: "অব্যাহতি শুধুমাত্র সরকারি প্রজ্ঞাপন দ্বারা প্রযোজ্য, কোনো বেসরকারি চুক্তি বা দাবির ভিত্তিতে আইনের আওতা বহির্ভূত হওয়া যায় না।",
    keywords: ["statutory exemption", "government gazette exemption", "obbaheti", "আইন থেকে অব্যাহতি", "ভোক্তা অধিকার ধারা ৪", "gazette notification exemption"],
    related: ["consumer-3", "consumer-21"]
  },
  5: {
    enTitle: "Establishment of National Consumer Rights Protection Council",
    enExp: "Establishes the apex National Consumer Rights Protection Council headed by the Minister of Commerce to formulate national consumer protection policies.",
    bnExp: "বাণিজ্য মন্ত্রীর সভাপতিত্বে সর্বোচ্চ নীতি-নির্ধারণী সংস্থা হিসেবে 'জাতীয় ভোক্তা-অধিকার সংরক্ষণ পরিষদ' গঠনের বিধান।",
    enCaution: "The Council serves as a high-level policy formulation body; individual consumer complaints are handled by the Directorate under Section 76.",
    bnCaution: "পরিষদ নীতি নির্ধারণ করে, কিন্তু ব্যক্তিগত অভিযোগ নিষ্পত্তির জন্য সরাসরি অধিদপ্তরের মহাপরিচালকের নিকট যেতে হবে।",
    keywords: ["National Consumer Council", "commerce minister", "bhokta parishad", "জাতীয় ভোক্তা অধিকার সংরক্ষণ পরিষদ", "ভোক্তা কাউন্সিল", "ধারা ৫"],
    related: ["consumer-7", "consumer-8", "consumer-18"]
  },
  6: {
    enTitle: "Tenure of Council Members",
    enExp: "Specifies the tenure of nominated non-official members of the National Council as two years and provides procedures for resignation and removal.",
    bnExp: "পরিষদের মনোনীত বেসরকারি সদস্যদের মেয়াদ ২ বছর এবং পদত্যাগ বা পদ শূন্য হওয়া সংক্রান্ত নিয়মাবলী নির্ধারিত।",
    enCaution: "Nominated members may be removed by the Government before expiration of their term for misconduct or inability to discharge duties.",
    bnCaution: "সরকার যেকোনো মনোনীত সদস্যকে দায়িত্ব পালনে ব্যর্থতা বা অসদাচরণের দায়ে মেয়াদপূর্তির পূর্বেও অপসারণ করতে পারে।",
    keywords: ["council tenure", "member resignation", "shodossho meyadh", "সদস্য মেয়াদ", "ভোক্তা পরিষদ সদস্য", "ধারা ৬"],
    related: ["consumer-5", "consumer-7"]
  },
  7: {
    enTitle: "Meetings of the National Council",
    enExp: "Regulates Council meeting frequency, quorum requirements, and presiding officers, mandating at least one meeting every six months.",
    bnExp: "পরিষদের সভার নিয়মাবলী নির্ধারণ, যার মধ্যে প্রতি ছয় মাসে অন্তত একটি সভা অনুষ্ঠান এবং কোরাম সংক্রান্ত শর্তাবলী অন্তর্ভুক্ত।",
    enCaution: "At least one-third of total members constitutes a quorum; council decisions cannot be challenged merely due to a temporary vacancy.",
    bnCaution: "পরিষদের সভায় মোট সদস্যের এক-তৃতীয়াংশ উপস্থিতিতে কোরাম গঠিত হয় এবং পদ শূন্যতার কারণে সিদ্ধান্ত অবৈধ হয় না।",
    keywords: ["council meetings", "quorum", "shova porishod", "পরিষদের সভা", "কোরাম", "ভোক্তা অধিকার ধারা ৭"],
    related: ["consumer-5", "consumer-8"]
  },
  8: {
    enTitle: "Functions and Duties of the National Council",
    enExp: "Outlines the statutory functions of the National Council, including advising the government, formulating guidelines, and monitoring consumer protection nationwide.",
    bnExp: "ভোক্তা অধিকার সুরক্ষায় সরকারকে নীতিগত পরামর্শ প্রদান, নির্দেশিকা প্রণয়ন এবং দেশব্যাপী কার্যক্রম তদারকির দায়িত্ব পরিষদের ওপর ন্যস্ত।",
    enCaution: "Directives issued by the National Council are binding on District Committees and subordinate agencies.",
    bnCaution: "পরিষদ কর্তৃক প্রদত্ত দিকনির্দেশনা ও সুপারিশমালা জেলা কমিটি ও সংশ্লিষ্ট দপ্তরসমূহের জন্য বাধ্যতামূলক।",
    keywords: ["council functions", "policy guidelines", "porishod er kaj", "পরিষদের কার্যাবলী", "ভোক্তা নীতি", "ধারা ৮"],
    related: ["consumer-5", "consumer-11", "consumer-18"]
  },
  9: {
    enTitle: "Fund of the National Council",
    enExp: "Establishes the statutory fund of the National Council comprising government grants, donations, and other approved sources to finance operational activities.",
    bnExp: "সরকারি অনুদান ও অন্যান্য অনুমোদিত উৎস থেকে অর্থ সংগ্রহের মাধ্যমে জাতীয় ভোক্তা-অধিকার সংরক্ষণ পরিষদের তহবিল গঠনের বিধান।",
    enCaution: "All monies received must be maintained in a scheduled bank account and utilized strictly for statutory Council objectives.",
    bnCaution: "তহবিলের অর্থ তফসিলি ব্যাংকে সংরক্ষিত থাকবে এবং শুধুমাত্র নির্ধারিত আইনি উদ্দেশ্যে ব্যয় করা যাবে।",
    keywords: ["council fund", "government grants", "tohovil", "পরিষদের তহবিল", "ভোক্তা তহবিল", "ধারা ৯"],
    related: ["consumer-15", "consumer-16"]
  },
  10: {
    enTitle: "Establishment of District Consumer Rights Protection Committees",
    enExp: "Mandates the establishment of District Consumer Rights Protection Committees in every administrative district headed by the Deputy Commissioner (DC).",
    bnExp: "প্রতিটি জেলায় জেলা প্রশাসকের (ডিসি) সভাপতিত্বে জেলা ভোক্তা-অধিকার সংরক্ষণ কমিটি গঠনের বিধান।",
    enCaution: "The District Committee serves as the primary regional administrative body to coordinate consumer protection inspections and awareness.",
    bnCaution: "জেলা পর্যায়ে ভোক্তা অধিকার পর্যবেক্ষণ ও প্রচারণার কেন্দ্রীয় দায়িত্ব জেলা কমিটির ওপর ন্যস্ত।",
    keywords: ["district committee", "deputy commissioner", "jela committee", "জেলা কমিটি", "ডিসি ভোক্তা অধিকার", "ধারা ১০"],
    related: ["consumer-11", "consumer-12", "consumer-69"]
  },
  11: {
    enTitle: "Duties and Functions of District Committees",
    enExp: "Details the responsibilities of District Committees, including market supervision, public awareness campaigns, and executing Council directives.",
    bnExp: "জেলা কমিটির প্রধান দায়িত্ব পাইকারি ও খুচরা বাজার পরিদর্শন, গণসচেতনতা তৈরি এবং পরিষদের নির্দেশনা বাস্তবায়ন করা।",
    enCaution: "District Committees coordinate inspections with the Directorate's field officers and law enforcement agencies.",
    bnCaution: "জেলা কমিটি ভ্রাম্যমাণ আদালত পরিচালনা ও বাজার মনিটরিংয়ে স্থানীয় প্রশাসনের সাথে যৌথভাবে কাজ করে।",
    keywords: ["district committee duties", "market inspection", "jela komitir kaj", "বাজার তদারকি", "জেলা কমিটির দায়িত্ব", "ধারা ১১"],
    related: ["consumer-10", "consumer-13", "consumer-28"]
  },
  12: {
    enTitle: "Meetings and Procedure of District Committees",
    enExp: "Requires District Committees to meet at least once a month to review local consumer rights situations, pricing, and complaint trends.",
    bnExp: "জেলা কমিটির সভার কার্যপদ্ধতি নির্ধারণ, যেখানে প্রতি মাসে অন্তত একটি সভা আয়োজন এবং ন্যূনতম ৫ জন সদস্যের উপস্থিতির বিধান রয়েছে।",
    enCaution: "Monthly meetings are mandatory; proceedings may examine local supply chains, hoarding, and unresolved consumer grievances.",
    bnCaution: "প্রতি মাসে অন্তত একটি সভা অনুষ্ঠান বাধ্যতামূলক; সভায় স্থানীয় দ্রব্যমূল্য ও ভোক্তা অভিযোগের অগ্রগতি পর্যালোচনা করা হয়।",
    keywords: ["district committee meetings", "monthly meeting", "jela shova", "জেলা কমিটির সভা", "মাসিক সভা", "ধারা ১২"],
    related: ["consumer-10", "consumer-11"]
  },
  13: {
    enTitle: "Upazila and Union Consumer Rights Protection Committees",
    enExp: "Authorizes the establishment of Upazila and Union-level Consumer Rights Protection Committees to extend protection to rural and grassroots consumers.",
    bnExp: "তৃণমূল পর্যায়ে ভোক্তা অধিকার নিশ্চিত করতে উপজেলা ও ইউনিয়ন পর্যায়ে ভোক্তা-অধিকার সংরক্ষণ কমিটি গঠনের আইনি কর্তৃত্ব।",
    enCaution: "Upazila Committees operate under the supervision of the UNO and report findings to the District Committee.",
    bnCaution: "উপজেলা নির্বাহী অফিসারের (ইউএনও) তত্ত্বাবধানে উপজেলা কমিটি স্থানীয় বাজারের অনিয়ম প্রতিরোধে ব্যবস্থা নেয়।",
    keywords: ["upazila committee", "union committee", "grassroots consumer", "upazila vokta committee", "উপজেলা কমিটি", "ইউনিয়ন কমিটি", "ধারা ১৩"],
    related: ["consumer-10", "consumer-11"]
  },
  14: {
    enTitle: "Funds of District and Subordinate Committees",
    enExp: "Provides for the creation, administration, and banking of dedicated funds for District and local consumer protection committees.",
    bnExp: "জেলা ও স্থানীয় ভোক্তা সংরক্ষণ কমিটির কার্যক্রম পরিচালনার জন্য তহবিল গঠন ও তফসিলি ব্যাংকে হিসাব পরিচালনার বিধান।",
    enCaution: "Expenditure from local committee funds is strictly subject to public procurement rules and statutory audit.",
    bnCaution: "তহবিলের অর্থ ব্যয়ের ক্ষেত্রে সরকারি আর্থিক বিধিমালা এবং নিরীক্ষা নিয়মাবলী কঠোরভাবে অনুসরণ করতে হবে।",
    keywords: ["committee funds", "district finance", "jela tohovil", "কমিটির তহবিল", "ভোক্তা অধিকার ধারা ১৪"],
    related: ["consumer-9", "consumer-15", "consumer-16"]
  },
  15: {
    enTitle: "Budget Allocation and Approval",
    enExp: "Requires the Council and committees to prepare annual budget estimates for each financial year and submit them to the Government for approval.",
    bnExp: "প্রতিটি অর্থ বৎসরের জন্য সম্ভাব্য আয়-ব্যয়ের বার্ষিক বাজেট প্রণয়ন ও সরকারের অনুমোদনের জন্য পেশ করার বাধ্যবাধকতা।",
    enCaution: "No expenditure may be incurred outside approved budgetary heads without prior sanction from the Ministry.",
    bnCaution: "অনুমোদিত বাজেটের অতিরিক্ত বা বহির্ভূত কোনো ব্যয় মন্ত্রণালয়ের পূর্বানুমতি ছাড়া করা যাবে না।",
    keywords: ["annual budget", "financial estimates", "bajet", "বার্ষিক বাজেট", "ভোক্তা বাজেট", "ধারা ১৫"],
    related: ["consumer-9", "consumer-16"]
  },
  16: {
    enTitle: "Maintenance of Accounts and Audit",
    enExp: "Mandates proper maintenance of accounts and annual audit by the Comptroller and Auditor-General of Bangladesh (C&AG).",
    bnExp: "যথাযথ হিসাব সংরক্ষণ এবং বাংলাদেশের মহাহিসাব নিরীক্ষক ও নিয়ন্ত্রক (সিএজি) কর্তৃক বার্ষিক হিসাব নিরীক্ষার আইনি বিধান।",
    enCaution: "Audit reports must be submitted to the Government, and any financial irregularities are subject to public accountability laws.",
    bnCaution: "সিএজি কর্তৃক উত্থাপিত অডিট আপত্তির ক্ষেত্রে সংশ্লিষ্ট কর্মকর্তাদের ব্যক্তিগত জবাবদিহিতা নিশ্চিত করা হয়।",
    keywords: ["audit", "CAG audit", "accounts maintenance", "hisab nirikkha", "হিসাব রক্ষণ", "অডিট", "ধারা ১৬"],
    related: ["consumer-15", "consumer-17"]
  },
  17: {
    enTitle: "Submission of Annual Report",
    enExp: "Directs the Council to prepare an annual report of its activities during the preceding year and submit it to the Government for parliamentary presentation.",
    bnExp: "বিগত বছরের কার্যক্রমের পূর্ণাঙ্গ বিবরণ সম্বলিত বার্ষিক প্রতিবেদন প্রস্তুত করে সরকারের নিকট পেশ করার বিধান।",
    enCaution: "The annual report documents national enforcement trends, total recovered penalties, and consumer complaint resolutions.",
    bnCaution: "বার্ষিক প্রতিবেদনে আদায়কৃত মোট জরিমানা, নিষ্পত্তি হওয়া অভিযোগ ও জাতীয় বাজারের চিত্র অন্তর্ভুক্ত থাকে।",
    keywords: ["annual report", "yearly performance", "barshik protibedon", "বার্ষিক প্রতিবেদন", "ভোক্তা রিপোর্ট", "ধারা ১৭"],
    related: ["consumer-8", "consumer-16"]
  },
  18: {
    enTitle: "Establishment of the Directorate of National Consumer Rights Protection",
    enExp: "Establishes the Directorate of National Consumer Rights Protection (DNCRP) as the primary executive enforcement agency under the Ministry of Commerce.",
    bnExp: "এই আইনের উদ্দেশ্য বাস্তবায়নে 'জাতীয় ভোক্তা-অধিকার সংরক্ষণ অধিদপ্তর' (DNCRP) প্রতিষ্ঠার মূল বিধান।",
    enCaution: "DNCRP has executive jurisdiction across Bangladesh to receive complaints, conduct market raids, and impose administrative fines.",
    bnCaution: "ভোক্তা অধিকার অধিদপ্তরের দেশব্যাপী কার্যালয় ও ভ্রাম্যমাণ আদালত পরিচালনার পূর্ণ আইনি এখতিয়ার রয়েছে।",
    keywords: ["DNCRP establishment", "Directorate of Consumer Rights", "bhokta odhidoptor", "জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তর", "ডিএনসিআরপি", "ধারা ১৮"],
    related: ["consumer-19", "consumer-20", "consumer-70", "consumer-76"]
  },
  19: {
    enTitle: "Head Office and Regional Branch Offices",
    enExp: "Designates Dhaka as the head office of the Directorate and authorizes the establishment of regional and branch offices across divisions and districts.",
    bnExp: "অধিদপ্তরের প্রধান কার্যালয় ঢাকায় স্থাপন এবং বিভাগ ও জেলা পর্যায়ে আঞ্চলিক শাখা কার্যালয় স্থাপনের কর্তৃত্ব।",
    enCaution: "Consumers may submit written complaints to the Directorate head office or any local district office in their jurisdiction.",
    bnCaution: "নাগরিকগণ যেকোনো জেলা কার্যালয় বা ঢাকা প্রধান কার্যালয়ে সরাসরি বা ইমেইলে অভিযোগ দাখিল করতে পারেন।",
    keywords: ["head office", "branch office", "regional office", "prodhan karjaloy", "প্রধান কার্যালয়", "ভোক্তা শাখা অফিস", "ধারা ১৯"],
    related: ["consumer-18", "consumer-76"]
  },
  20: {
    enTitle: "Appointment and Powers of the Director General",
    enExp: "Provides for the appointment of a Director General (DG) by the Government as the chief executive officer of the Directorate.",
    bnExp: "সরকার কর্তৃক অধিদপ্তরের প্রধান নির্বাহী কর্মকর্তা হিসেবে মহাপরিচালক (DG) নিয়োগ ও তার প্রশাসনিক ক্ষমতার বিধান।",
    enCaution: "The DG holds statutory authority to issue enforcement orders, sanction prosecutions, and delegate powers to authorized officers.",
    bnCaution: "মহাপরিচালকের প্রশাসনিক নির্দেশেই দেশব্যাপী বাজার অভিযান ও আইন প্রয়োগের কার্যক্রম পরিচালিত হয়।",
    keywords: ["Director General", "DG DNCRP", "mohaporichalok", "মহাপরিচালক", "ডিজি ভোক্তা অধিকার", "ধারা ২০"],
    related: ["consumer-18", "consumer-21", "consumer-79"]
  },
  21: {
    enTitle: "Powers and Functions of the Director General",
    enExp: "Empowers the DG to oversee investigations, inspect commercial establishments, coordinate market raids, and regulate anti-consumer practices.",
    bnExp: "ভোক্তা অধিকার লঙ্ঘন তদন্ত, ব্যবসা প্রতিষ্ঠান পরিদর্শন, বাজার অভিযান এবং ক্ষতিকর বাণিজ্যিক কর্মকাণ্ড নিয়ন্ত্রণের ক্ষেত্রে ডিজির ক্ষমতা।",
    enCaution: "The DG or authorized officers can enter any commercial premise during business hours without prior notice to verify compliance.",
    bnCaution: "মহাপরিচালক বা ক্ষমতাপ্রাপ্ত কর্মকর্তা বাণিজ্যিক সময়ে নোটিশ ছাড়াই যেকোনো ব্যবসা প্রতিষ্ঠানে আকস্মিক অভিযান চালাতে পারেন।",
    keywords: ["DG powers", "enforcement powers", "market raids", "mohaporichaloker khomota", "মহাপরিচালকের ক্ষমতা", "বাজার অভিযান", "ধারা ২১"],
    related: ["consumer-20", "consumer-23", "consumer-27", "consumer-70"]
  },
  22: {
    enTitle: "Appointment of Officers and Employees",
    enExp: "Authorizes the appointment of necessary officers, inspectors, and support staff for the Directorate in accordance with government recruitment rules.",
    bnExp: "অধিদপ্তরের সুষ্ঠু কার্য পরিচালনার জন্য প্রয়োজনীয় কর্মকর্তা ও কর্মচারী নিয়োগের আইনি বিধান।",
    enCaution: "All appointed officers and inspectors act as public servants within the meaning of Section 21 of the Penal Code.",
    bnCaution: "অধিদপ্তরের সকল পরিদর্শক ও কর্মকর্তা দণ্ডবিধির ২১ ধারা অনুযায়ী সরকারি কর্মচারী হিসেবে গণ্য হন।",
    keywords: ["officer appointment", "staff recruitment", "kormokorta niog", "কর্মকর্তা নিয়োগ", "ভোক্তা পরিদর্শক", "ধারা ২২"],
    related: ["consumer-18", "consumer-23"]
  },
  23: {
    enTitle: "Investigative Powers of the Director General and Officers",
    enExp: "Grants the DG and authorized officers the powers of a Civil Court under the CPC to summon witnesses, examine documents, and demand evidence.",
    bnExp: "তদন্ত পরিচালনার স্বার্থে সাক্ষী তলব, শপথ পাঠ করানো এবং দলিল ও রেকর্ড তলব করার দেওয়ানি আদালতের ক্ষমতা প্রদান।",
    enCaution: "Failure to produce demanded records or attend pursuant to a statutory summons is an offense under the Penal Code.",
    bnCaution: "অধিদপ্তরের আইনানুগ তলবে উপস্থিত না হওয়া বা কাগজপত্র দাখিলে ব্যর্থ হলে তা আইনত দণ্ডনীয় অপরাধ।",
    keywords: ["investigative powers", "summon witnesses", "civil court powers", "todonto khomota", "তদন্ত ক্ষমতা", "সাক্ষী তলব", "ধারা ২৩"],
    related: ["consumer-21", "consumer-24", "consumer-26"]
  },
  24: {
    enTitle: "Power to Issue Warrants",
    enExp: "Authorizes the DG to issue search and arrest warrants during investigations where offenses under this Act are credibly suspected.",
    bnExp: "তদন্তাধীন বিষয়ে অপরাধের সুস্পষ্ট আশঙ্কা থাকলে মহাপরিচালক কর্তৃক তল্লাশি ও পরোয়ানা জারির বিশেষ ক্ষমতা।",
    enCaution: "Warrants must adhere strictly to the Code of Criminal Procedure 1898 provisions governing searches and seizures.",
    bnCaution: "পরোয়ানা জারির ক্ষেত্রে ফৌজদারি কার্যবিধির নিয়মাবলী যথাযথভাবে অনুসরণ করা আবশ্যক।",
    keywords: ["search warrant", "issue warrant", "poroyana", "পরোয়ানা", "তল্লাশি পরোয়ানা", "ধারা ২৪"],
    related: ["consumer-23", "consumer-25", "consumer-26"]
  },
  25: {
    enTitle: "Power of Arrest and Detention in Public Places",
    enExp: "Empowers authorized officers to arrest or detain persons in public places who are found violating the Act or attempting to evade inspection.",
    bnExp: "প্রকাশ্য স্থানে আইন লঙ্ঘনরত বা পলায়নপর ব্যক্তিকে তাৎক্ষণিকভাবে আটক বা গ্রেপ্তার করার ক্ষমতা।",
    enCaution: "Arrested persons must be handed over to the nearest police station immediately without unnecessary delay.",
    bnCaution: "গ্রেপ্তারকৃত ব্যক্তিকে অবিলম্বে নিকটস্থ থানায় সোপর্দ করতে হবে এবং অযথা কালক্ষেপণ করা যাবে না।",
    keywords: ["public arrest", "detention power", "greftar khomota", "আটক বা গ্রেপ্তার", "প্রকাশ্য স্থানে গ্রেপ্তার", "ধারা ২৫"],
    related: ["consumer-24", "consumer-26", "consumer-74"]
  },
  26: {
    enTitle: "Procedure for Search and Seizure",
    enExp: "Specifies search and seizure procedures, requiring presence of independent witnesses, preparation of seizure lists (zobto talika), and strict transparency.",
    bnExp: "তল্লাশি ও মালামাল জব্দের সময় নিরপেক্ষ সাক্ষীর উপস্থিতি এবং বিধিমতে জব্দ তালিকা প্রস্তুতের বিস্তারিত নিয়মাবলী।",
    enCaution: "A signed copy of the seizure list must be provided to the owner or person in possession of the seized items on the spot.",
    bnCaution: "জব্দ তালিকার একটি সত্যায়িত কপি তৎক্ষণাৎ অভিযুক্ত বা প্রতিষ্ঠানের দায়িত্বপ্রাপ্ত ব্যক্তির নিকট হস্তান্তর করতে হবে।",
    keywords: ["search procedure", "seizure list", "zobto talika", "জব্দ তালিকা", "তল্লাশি পদ্ধতি", "ধারা ২৬"],
    related: ["consumer-24", "consumer-32", "consumer-33"]
  },
  27: {
    enTitle: "Temporary Closure of Commercial Establishments",
    enExp: "Empowers the DG or authorized officer to order temporary closure of any shop, factory, or commercial premises engaging in severe anti-consumer practices.",
    bnExp: "মারাত্মক ভোক্তা অধিকার বিরোধী কার্যে লিপ্ত দোকান, কারখানা বা ব্যবসা প্রতিষ্ঠান সাময়িকভাবে সিলগালা বা বন্ধের নির্দেশ প্রদানের ক্ষমতা।",
    enCaution: "Temporary closure orders may initially remain in effect for up to 72 hours pending formal proceedings or safety remediations.",
    bnCaution: "সাময়িক বন্ধের আদেশ জনস্বার্থে দেওয়া হয় এবং মারাত্মক ক্ষতিকর পণ্য উৎপাদন অব্যাহত রাখলে প্রতিষ্ঠান সিলগালা করা যায়।",
    keywords: ["temporary closure", "shop sealing", "dokan bondho", "দোকান সিলগালা", "প্রতিষ্ঠান বন্ধের নির্দেশ", "ধারা ২৭"],
    related: ["consumer-21", "consumer-36", "consumer-70"]
  },
  28: {
    enTitle: "Assistance from Law Enforcement Agencies",
    enExp: "Mandates the Police, RAB, Coast Guard, and other law enforcement agencies to provide armed assistance to consumer officers during raids upon request.",
    bnExp: "অভিযান ও আইন প্রয়োগকালে পুলিশ ও অন্যান্য আইনশৃঙ্খলা বাহিনীকে ভোক্তা সংরক্ষণ কর্মকর্তাদের সর্বাত্মক সহায়তা প্রদানের বাধ্যবাধকতা।",
    enCaution: "Law enforcement personnel must execute lawful requisitions without delay to maintain order and protect inspecting teams.",
    bnCaution: "ভোক্তা কর্মকর্তাদের তলবে তাৎক্ষণিক পুলিশি সহায়তা প্রদান আইনশৃঙ্খলা বাহিনীর জন্য আইনত বাধ্যতামূলক।",
    keywords: ["police assistance", "law enforcement", "aid to officers", "police shohayota", "পুলিশের সহায়তা", "আইনশৃঙ্খলা বাহিনীর সহায়তা", "ধারা ২৮"],
    related: ["consumer-21", "consumer-25", "consumer-30"]
  },
  29: {
    enTitle: "Restrictions on Manufacturing and Sale of Health-Hazardous Goods",
    enExp: "Prohibits the manufacture, storage, distribution, or sale of goods that pose serious health, life, or safety hazards to citizens.",
    bnExp: "মানবস্বাস্থ্যের জন্য ক্ষতিকর বা বিপজ্জনক যেকোনো পণ্য সামগ্রী উৎপাদন, মজুদ, বিপণন ও বিক্রয়ের ওপর কঠোর নিষেধাজ্ঞা।",
    enCaution: "Directly links to severe criminal liability and immediate seizure under Sections 42, 43, and 56.",
    bnCaution: "মানবস্বাস্থ্যের জন্য হুমকিস্বরূপ পণ্যের বিরুদ্ধে তাৎক্ষণিক বাজেয়াপ্তকরণ ও মোবাইল কোর্টে কঠোর দণ্ড আরোপ করা হয়।",
    keywords: ["health hazard goods", "dangerous products", "shasthyo khotikor ponno", "ক্ষতিকর পণ্য", "বিপজ্জনক পণ্য", "ধারা ২৯"],
    related: ["consumer-36", "consumer-42", "consumer-56"]
  },
  30: {
    enTitle: "Power of Entry and Inspection",
    enExp: "Grants authorized officers statutory authority to enter any commercial building, warehouse, or transport vehicle to inspect goods and equipment.",
    bnExp: "পণ্যের মান ও পরিমাপক যাচাই করতে যেকোনো গুদাম, কারখানা, বাণিজ্যিক ভবন বা পরিবহনে প্রবেশের আইনি কর্তৃত্ব।",
    enCaution: "Inspections must take place during normal operational or trading hours unless urgent concealment is credibly suspected.",
    bnCaution: "স্বাভাবিক কর্মঘণ্টায় বা অবৈধ পণ্য মজুদের গোপন সংবাদ থাকলে যেকোনো সময় তল্লাশি পরিচালনা করা যায়।",
    keywords: ["power of entry", "commercial inspection", "probesh khomota", "প্রবেশের ক্ষমতা", "গুদাম তল্লাশি", "ধারা ৩০"],
    related: ["consumer-21", "consumer-26", "consumer-31"]
  },
  31: {
    enTitle: "Power to Collect Samples for Testing",
    enExp: "Empowers consumer protection officers to collect representative samples of goods, seal them in the presence of witnesses, and send them for chemical analysis.",
    bnExp: "ল্যাবরেটরি পরীক্ষার জন্য পণ্যের নমুনা সংগ্রহ, সিলগালা করা এবং সরকারি পরীক্ষাগারে প্রেরণের বিস্তারিত পদ্ধতি।",
    enCaution: "Samples must be sealed properly and divided into statutory parts, with one part retained by the vendor as a benchmark counter-sample.",
    bnCaution: "নমুনা সংগ্রহের সময় বিক্রেতার উপস্থিতিতে সিলগালা করতে হবে এবং একটি নমুনা বিক্রেতার সংরক্ষণের জন্য দিতে হবে।",
    keywords: ["sample collection", "chemical testing", "nomuna songgroho", "নমুনা সংগ্রহ", "ল্যাব পরীক্ষা", "ধারা ৩১"],
    related: ["consumer-30", "consumer-62"]
  },
  32: {
    enTitle: "Goods Subject to Confiscation",
    enExp: "Specifies categories of goods subject to statutory confiscation, including adulterated food, counterfeit products, and tampered measuring devices.",
    bnExp: "ভেজাল খাদ্য, নকল প্রসাধন, চোরাই বা অবৈধভাবে প্রস্তুতকৃত পণ্য এবং ত্রুটিপূর্ণ বাটখারা বাজেয়াপ্তকরণের বিধান।",
    enCaution: "Seized items can be declared forfeited to the State upon judicial order of the competent Magistrate under Section 56.",
    bnCaution: "ম্যাজিস্ট্রেটের আদেশ সাপেক্ষে বাজেয়াপ্তযোগ্য সকল পণ্য চূড়ান্তভাবে রাষ্ট্রের অনুকূলে বাজেয়াপ্ত করা হয়।",
    keywords: ["confiscation of goods", "seizure", "bajeyapto", "বাজেয়াপ্তযোগ্য পণ্য", "মালপত্র বাজেয়াপ্ত", "ধারা ৩২"],
    related: ["consumer-26", "consumer-33", "consumer-56"]
  },
  33: {
    enTitle: "Procedure for Confiscation",
    enExp: "Outlines the statutory procedure for formal confiscation, documentation, inventorying, and safe custody of seized commercial articles.",
    bnExp: "আটককৃত মালামালের তালিকা প্রস্তুত, নিরাপদ সংরক্ষণ এবং আইনি প্রক্রিয়ায় বাজেয়াপ্ত করার পদ্ধতি।",
    enCaution: "Complete chain of custody records must be maintained to present seized physical evidence before the Magistrate Court.",
    bnCaution: "আদালতে সাক্ষ্য প্রমাণ হিসেবে উপস্থাপনের জন্য জব্দকৃত মালামালের নিরাপত্তা ও রেকর্ড নিখুঁত রাখা বাধ্যতামূলক।",
    keywords: ["confiscation procedure", "safe custody", "bajeyapto poddhoti", "বাজেয়াপ্তকরণ পদ্ধতি", "জব্দ মালামাল হেফাজত", "ধারা ৩৩"],
    related: ["consumer-32", "consumer-35", "consumer-56"]
  },
  34: {
    enTitle: "Disposal of Perishable Goods",
    enExp: "Authorizes the immediate sale via public auction or safe destruction of perishable seized goods that cannot be stored without rapid decay.",
    bnExp: "পঁচনশীল প্রকৃতির আটককৃত পণ্য দ্রুত নষ্ট হয়ে যাওয়ার ঝুঁকি থাকলে তাৎক্ষণিক নিলাম বিক্রয় বা ধ্বংস করার বিধান।",
    enCaution: "Sale proceeds of auctioned perishable items must be deposited in escrow pending the final judicial decision on the offense.",
    bnCaution: "নিলামের বিক্রয়লব্ধ অর্থ সরকারি কোষাগার বা নির্ধারিত একাউন্টে জমা রাখা হয় এবং মামলার রায়ের ওপর ভিত্তি করে নিষ্পত্তি হয়।",
    keywords: ["perishable goods", "emergency auction", "pochonshil ponno", "পচনশীল পণ্যের নিষ্পত্তি", "তাৎক্ষণিক নিলাম", "ধারা ৩৪"],
    related: ["consumer-32", "consumer-35"]
  },
  35: {
    enTitle: "Disposal and Distribution of Confiscated Goods",
    enExp: "Regulates the final disposal, auctioning, recycling, or destruction of goods permanently forfeited to the State following conviction.",
    bnExp: "রাষ্ট্রের অনুকূলে চূড়ান্তভাবে বাজেয়াপ্ত দ্রব্যাদি নিলামে বিক্রয়, জনস্বার্থে বিলি-বণ্টন বা নিরাপদ ধ্বংসকরণের নিয়মাবলী।",
    enCaution: "Dangerous, poisonous, or counterfeit goods must never be re-auctioned into the market; they must be destroyed safely.",
    bnCaution: "বিষাক্ত বা মানবস্বাস্থ্যের জন্য মারাত্মক ক্ষতিকর পণ্য নিলামে বিক্রি করা নিষেধ; তা সম্পূর্ণরূপে ধ্বংস করতে হবে।",
    keywords: ["disposal of goods", "state auction", "bili bondobosto", "বাজেয়াপ্ত দ্রব্যাদির বিলি", "ধ্বংসকরণ", "ধারা ৩৫"],
    related: ["consumer-33", "consumer-56"]
  },
  36: {
    enTitle: "Immediate Seizure and Disposal of Adulterated Goods",
    enExp: "Empowers inspecting officers to seize and summarily destroy grossly adulterated food or medicines on the spot in the interest of public safety.",
    bnExp: "চরম ভেজালযুক্ত খাদ্য বা ক্ষতিকর ঔষধ তাৎক্ষণিকভাবে ঘটনাস্থলেই বিনষ্ট বা ধ্বংস করার বিশেষ জরুরি ক্ষমতা।",
    enCaution: "Destruction must be documented in a written report attested by local public witnesses present during the market drive.",
    bnCaution: "ঘটনাস্থলে ধ্বংস করার পূর্বে স্থানীয় গণ্যমান্য সাক্ষীদের উপস্থিতিতে বিস্তারিত প্রতিবেদন তৈরি ও স্বাক্ষর নিতে হবে।",
    keywords: ["immediate seizure", "on the spot destruction", "bhezal ponno dhongsho", "ভেজাল পণ্য বিনষ্ট", "তাৎক্ষণিক ধ্বংস", "ধারা ৩৬"],
    related: ["consumer-29", "consumer-41", "consumer-42"]
  },
  57: {
    enTitle: "Jurisdiction of Courts to Try Offenses",
    enExp: "Establishes that offenses under this Act are triable exclusively by a First Class Magistrate or a Metropolitan Magistrate.",
    bnExp: "এই আইনের অধীন অপরাধসমূহের বিচার কেবলমাত্র প্রথম শ্রেণীর জুডিসিয়াল ম্যাজিস্ট্রেট বা মেট্রোপলিটন ম্যাজিস্ট্রেট আদালতে অনুষ্ঠিত হবে।",
    enCaution: "Executive Magistrates may try offenses summarily under the Mobile Court Act 2009 for caught-in-the-act violations.",
    bnCaution: "র‌্যাব বা জেলা প্রশাসনের নির্বাহী ম্যাজিস্ট্রেটগণ মোবাইল কোর্ট আইন ২০০৯ এর আওতায় ঘটনাস্থলে তাৎক্ষণিক দণ্ড দিতে পারেন।",
    keywords: ["trial jurisdiction", "first class magistrate", "metropolitan magistrate", "bichar", "বিচারিক আদালত", "প্রথম শ্রেণীর ম্যাজিস্ট্রেট", "ধারা ৫৭"],
    related: ["consumer-58", "consumer-60", "consumer-63"]
  },
  58: {
    enTitle: "Summary Trial Procedure",
    enExp: "Authorizes the Magistrate to try offenses under this Act through summary trial procedures governed by Chapter XXII of the Code of Criminal Procedure, 1898.",
    bnExp: "১৮৯৮ সালের ফৌজদারি কার্যবিধির ২২ অধ্যায় অনুযায়ী সংক্ষিপ্ত পদ্ধতিতে দ্রুত বিচার নিষ্পত্তির আইনি এখতিয়ার।",
    enCaution: "Summary trials accelerate resolution of commercial fraud cases and eliminate lengthy delays in straightforward violations.",
    bnCaution: "সংক্ষিপ্ত বিচার পদ্ধতিতে দ্রুততম সময়ে প্রতারক ব্যবসায়ীদের বিরুদ্ধে রায় ও অর্থদণ্ড নিশ্চিত করা যায়।",
    keywords: ["summary trial", "CrPC Chapter XXII", "songkhipto bichar", "সংক্ষিপ্ত বিচার পদ্ধতি", "দ্রুত বিচার", "ধারা ৫৮"],
    related: ["consumer-57", "consumer-63"]
  },
  59: {
    enTitle: "Bailability and Cognizability of Offenses",
    enExp: "Classifies offenses under this Act as bailable, non-cognizable (except as specified), and compoundable with the approval of the Magistrate.",
    bnExp: "এই আইনের অপরাধসমূহ সাধারণভাবে জামিনযোগ্য এবং আদালতের অনুমতি সাপেক্ষে আপোষযোগ্য হিসেবে নির্ধারিত।",
    enCaution: "While offenses are generally bailable, severe adulteration under Section 42 may attract non-bailable Special Powers Act charges.",
    bnCaution: "সাধারণ অপরাধগুলো জামিনযোগ্য হলেও মারাত্মক খাদ্যে ভেজালের ক্ষেত্রে বিশেষ ক্ষমতা আইনের কঠোর জামিন-অযোগ্য ধারা যুক্ত হতে পারে।",
    keywords: ["bailable offense", "compoundable", "jaminjoggo", "জামিনযোগ্যতা", "আপোষযোগ্যতা", "ধারা ৫৯"],
    related: ["consumer-57", "consumer-60"]
  },
  61: {
    enTitle: "Statutory Limitation for Magistrate Cognizance",
    enExp: "Bars any Magistrate from taking cognizance of an offense under this Act unless a formal complaint is lodged within 30 days of the cause of action.",
    bnExp: "অপরাধ সংঘটিত হওয়ার ৩০ দিনের মধ্যে অভিযোগ দায়ের না করা হলে ম্যাজিস্ট্রেট কোনো অপরাধ বিচারার্থে গ্রহণ করতে পারবেন না।",
    enCaution: "The 30-day limitation is absolute; delay cannot be condoned under the general Limitation Act for criminal cognizance.",
    bnCaution: "ঘটনার ৩০ দিন পার হয়ে গেলে ম্যাজিস্ট্রেট সরাসরি নালিশ গ্রহণ করতে আইনত বাধ্য নন; তাই অবিলম্বে অভিযোগ করুন।",
    keywords: ["30 days limitation", "statutory deadline", "tamadi", "৩০ দিনের তামাদি", "অভিযোগের সময়সীমা", "ধারা ৬১"],
    related: ["consumer-60", "consumer-76"]
  },
  62: {
    enTitle: "Testing of Defective Goods by Chemical Laboratories",
    enExp: "Authorizes the Magistrate or Directorate to send suspect goods to designated chemical laboratories for scientific verification of quality and ingredients.",
    bnExp: "পণ্যের মান ও উপাদানের ত্রুটি নির্ণয়ে আদালত বা অধিদপ্তর কর্তৃক পরীক্ষাগারে রাসায়নিক পরীক্ষার নির্দেশ প্রদানের ক্ষমতা।",
    enCaution: "Laboratory testing fees are initially borne by the complainant or state, but reimbursed by the convicted vendor upon guilt.",
    bnCaution: "সরকারি অনুমোদিত ল্যাবের পরীক্ষার রিপোর্ট আদালতে চূড়ান্ত ও প্রামাণ্য দালিলিক সাক্ষ্য হিসেবে গণ্য হয়।",
    keywords: ["chemical testing", "lab report", "porikkha", "ল্যাবরেটরি পরীক্ষা", "রাসায়নিক পরীক্ষা", "ধারা ৬২"],
    related: ["consumer-31", "consumer-41", "consumer-50"]
  },
  63: {
    enTitle: "Special Powers of Magistrate Regarding Fines",
    enExp: "Empowers First Class and Metropolitan Magistrates to impose the full statutory fines prescribed under this Act notwithstanding Section 32 of the CrPC.",
    bnExp: "ফৌজদারি কার্যবিধির ৩২ ধারার সীমাবদ্ধতা সত্ত্বেও ম্যাজিস্ট্রেটকে এই আইনের নির্ধারিত পূর্ণ অর্থদণ্ড আরোপের বিশেষ ক্ষমতা প্রদান।",
    enCaution: "Magistrates can impose fines up to 2 lakh taka or higher as statutorily designated without requiring Sessions Court transfer.",
    bnCaution: "এই ধারার বলে ম্যাজিস্ট্রেট সাধারণ সিআরপিসির জরিমানার সীমা ছাড়িয়ে ভোক্তা আইনের সর্বোচ্চ জরিমানা ধার্য করতে পারেন।",
    keywords: ["magistrate special powers", "fine enhancement", "magistrater khomota", "ম্যাজিস্ট্রেটের বিশেষ ক্ষমতা", "অর্থদণ্ড আরোপ", "ধারা ৬৩"],
    related: ["consumer-57", "consumer-60"]
  },
  64: {
    enTitle: "Bar Against Double Jeopardy (Non Bis In Idem)",
    enExp: "Prohibits prosecuting or punishing any person more than once for the exact same act or omission under this statute.",
    bnExp: "একই অপরাধ বা লঙ্ঘনের জন্য কোনো ব্যক্তিকে দ্বিতীয়বার বিচার বা শাস্তি প্রদান নিষিদ্ধ করার সাংবিধানিক সুরক্ষা।",
    enCaution: "Administrative compounding or payment of an administrative fine precludes subsequent criminal trial for the identical transaction.",
    bnCaution: "অধিদপ্তরের মাধ্যমে প্রশাসনিক জরিমানা আদায় করা হলে একই ঘটনার জন্য পুনরায় ফৌজদারি আদালতে মামলা চলে না।",
    keywords: ["double jeopardy", "second trial barred", "ditiyobar bichar nishiddho", "দ্বিতীয়বার বিচার নিষিদ্ধ", "ধারা ৬৪"],
    related: ["consumer-57", "consumer-70"]
  },
  65: {
    enTitle: "Appeals Against Conviction and Sentence",
    enExp: "Provides for appeals against any conviction or sentence passed by a Magistrate to the Court of Sessions within 30 days of the order.",
    bnExp: "ম্যাজিস্ট্রেটের দণ্ডাদেশের বিরুদ্ধে আদেশের ৩০ দিনের মধ্যে দায়রা জজ আদালতে আপিল দায়েরের আইনি অধিকার।",
    enCaution: "Appellants must file certified copies of the judgment and adhere strictly to the 30-day appeal period.",
    bnCaution: "আপিল দায়েরের জন্য রায়ের অনুলিপি সহ ৩০ কার্যদিবসের মধ্যে বিজ্ঞ দায়রা আদালতে আবেদন করতে হবে।",
    keywords: ["criminal appeal", "sessions court", "appeal", "আপিল", "দায়রা জজ আদালত", "ধারা ৬৫"],
    related: ["consumer-57", "consumer-68"]
  },
  66: {
    enTitle: "Civil Remedy and Compensation for Consumer Harm",
    enExp: "Affirms that criminal proceedings do not bar an aggrieved consumer from instituting a civil suit for actual financial compensation and damages.",
    bnExp: "ফৌজদারি ব্যবস্থার পাশাপাশি প্রতারিত ভোক্তার জন্য দেওয়ানি আদালতে আর্থিক ক্ষতিপূরণ ও লোকসান আদায়ের পৃথক অধিকার।",
    enCaution: "Civil suits require proof of actual financial loss, medical bills, or consequential damages resulting from defective goods or services.",
    bnCaution: "দেওয়ানি ক্ষতিপূরণের মামলায় আর্থিক ক্ষতির পরিমাণ ও চিকিৎসা ব্যয়ের প্রমাণপত্র দাখিল করা আবশ্যক।",
    keywords: ["civil remedy", "financial damages", "dewani protikar", "দেওয়ানি প্রতিকার", "আর্থিক ক্ষতিপূরণ মামলা", "ধারা ৬৬"],
    related: ["consumer-67", "consumer-71"]
  },
  67: {
    enTitle: "Powers of Civil Courts to Award Compensation",
    enExp: "Empowers the Joint District Judge Court trying a consumer compensation suit to award actual compensatory damages and grant injunctions.",
    bnExp: "ভোক্তা ক্ষতিপূরণ মোকদ্দমায় প্রকৃত ক্ষতিপূরণ ধার্য এবং প্রয়োজনীয় নিষেধাজ্ঞা প্রদানের ক্ষেত্রে যুগ্ম জেলা জজ আদালতের ক্ষমতা।",
    enCaution: "Compensation awarded is legally enforceable as a civil court money decree under Order XXI of the Code of Civil Procedure.",
    bnCaution: "যুগ্ম জেলা জজ আদালতের ক্ষতিপূরণের ডিক্রি জারি মোকদ্দমার মাধ্যমে অভিযুক্তের সম্পত্তি ক্রোক করে আদায় করা যায়।",
    keywords: ["joint district judge", "money decree", "dewani adalot khomota", "যুগ্ম জেলা জজ", "ক্ষতিপূরণ ডিক্রি", "ধারা ৬৭"],
    related: ["consumer-66", "consumer-68", "consumer-71"]
  },
  68: {
    enTitle: "Civil Appeals to High Court Division",
    enExp: "Specifies that appeals against final decrees or judgments of the Joint District Judge Court lie before the High Court Division of the Supreme Court.",
    bnExp: "যুগ্ম জেলা জজ আদালতের ক্ষতিপূরণ ডিক্রির বিরুদ্ধে সুপ্রিম কোর্টের হাইকোর্ট বিভাগে সিভিল আপিল দায়েরের নিয়মাবলী।",
    enCaution: "Governed by the Code of Civil Procedure 1908 and statutory time limitations for First Appeals (90 days).",
    bnCaution: "হাইকোর্টে সিভিল প্রথম আপিল দায়েরের ক্ষেত্রে ৯০ দিনের সংবিধিবদ্ধ তামাদি সময়সীমা প্রযোজ্য।",
    keywords: ["civil appeal", "high court division", "supreme court", "dewani appeal", "হাইকোর্ট বিভাগ", "সিভিল আপিল", "ধারা ৬৮"],
    related: ["consumer-66", "consumer-67"]
  },
  69: {
    enTitle: "Powers of District Magistrate Under the Act",
    enExp: "Vests District Magistrates with administrative authority to coordinate district-wide market controls, price stability, and mobile court operations.",
    bnExp: "জেলাব্যাপী বাজার নিয়ন্ত্রণ, নিত্যপণ্যের মূল্য স্থিতিশীল রাখা এবং ভ্রাম্যমাণ আদালত পরিচালনায় জেলা ম্যাজিস্ট্রেটের সমন্বিত ক্ষমতা।",
    enCaution: "District Magistrates can deploy executive magistrates and law enforcement forces to prevent hoarding during crises.",
    bnCaution: "রমজান বা জরুরি পরিস্থিতিতে সিন্ডিকেট ও মজুতদারি রোধে জেলা ম্যাজিস্ট্রেট তাৎক্ষণিক ব্যবস্থা নিতে পারেন।",
    keywords: ["district magistrate", "market regulation", "jela magistrate", "জেলা ম্যাজিস্ট্রেট", "ভ্রাম্যমাণ আদালত পরিচালনা", "ধারা ৬৯"],
    related: ["consumer-10", "consumer-28", "consumer-70"]
  },
  70: {
    enTitle: "Administrative Measures and Penalties by Directorate",
    enExp: "Authorizes the DG and designated officers to impose administrative fines, confiscate unlawful gains, and compound commercial grievances directly.",
    bnExp: "অধিদপ্তরের মহাপরিচালক কর্তৃক প্রশাসনিক জরিমানা আরোপ এবং অভিযোগের ভিত্তিতে সরাসরি প্রশাসনিক প্রতিকার প্রদানের ক্ষমতা।",
    enCaution: "Administrative fines under Section 70 provide instant relief; Section 76(4) awards 25% of this realized fine to the complainant.",
    bnCaution: "প্রশাসনিক নিষ্পত্তিতে আদায়কৃত জরিমানার ২৫% তাৎক্ষণিকভাবে অভিযোগকারীকে সরকারিভাবে প্রদান করা হয়।",
    keywords: ["administrative penalty", "DNCRP fine", "proshashonik jorimana", "প্রশাসনিক জরিমানা", "২৫% প্রাপ্তি", "ধারা ৭০"],
    related: ["consumer-21", "consumer-76", "consumer-76-reward"]
  },
  72: {
    enTitle: "Special Provisions Regarding Medicines and Pharmaceuticals",
    enExp: "Establishes coordinated enforcement protocols between DNCRP and the Directorate General of Drug Administration (DGDA) for spurious medicines.",
    bnExp: "নকল ও মেয়াদোত্তীর্ণ ঔষধের বিরুদ্ধে ওষুধ প্রশাসন অধিদপ্তরের সাথে যৌথ তদারকি ও কঠোর ব্যবস্থার বিশেষ বিধান।",
    enCaution: "Selling unregistered or adulterated medicines triggers simultaneous penalties under the Drugs Act 1940 and Consumer Act.",
    bnCaution: "ওষুধের ক্ষেত্রে সর্বোচ্চ খুচরা মূল্যের (MRP) অতিরিক্ত রাখা বা মেয়াদোত্তীর্ণ ওষুধ বিক্রি জামিন-অযোগ্য অপরাধের সমতুল্য।",
    keywords: ["medicine regulation", "pharmaceuticals", "drug administration", "oushodh", "ঔষধ সংক্রান্ত বিধান", "ড্রাগ প্রশাসন", "ধারা ৭২"],
    related: ["consumer-41", "consumer-51"]
  },
  73: {
    enTitle: "Monitoring of Private Health and Diagnostic Services",
    enExp: "Directs monitoring of private clinical and diagnostic services to prevent unethical billing, lack of price transparency, and medical negligence.",
    bnExp: "বেসরকারি হাসপাতাল ও ডায়াগনস্টিক সেন্টারের পরীক্ষা-নিরীক্ষার মূল্য তালিকা প্রদর্শন এবং অপচিকিৎসা রোধে পরিবীক্ষণ।",
    enCaution: "Clinics must openly display diagnostic fee charts; failing to do so or overcharging is an offense under Section 39.",
    bnCaution: "রোগীর নিকট থেকে নির্ধারিত ফির অতিরিক্ত ফি আদায় বা ভুয়া টেস্ট রিপোর্ট প্রদান আইনত দণ্ডনীয় অপরাধ।",
    keywords: ["private healthcare", "diagnostic monitoring", "hospital billing", "shasthyo sheba", "বেসরকারি স্বাস্থ্য সেবা", "হাসপাতাল বিল", "ধারা ৭৩"],
    related: ["consumer-39", "consumer-52", "consumer-53"]
  },
  74: {
    enTitle: "Informing Superior Officers Regarding Arrest and Detention",
    enExp: "Requires any inspecting officer arresting a person under this Act to notify their immediate superior officer and the police station forthwith in writing.",
    bnExp: "কোনো ব্যক্তিকে গ্রেপ্তার বা আটক করা হলে অবিলম্বে কারণ উল্লেখপূর্বক ঊর্ধ্বতন কর্তৃপক্ষকে লিখিতভাবে অবহিত করার বাধ্যবাধকতা।",
    enCaution: "Protects citizens against unauthorized arbitrary detentions and enforces statutory institutional accountability.",
    bnCaution: "গ্রেপ্তারের সাথে সাথে ঊর্ধ্বতন কর্মকর্তাকে অবহিত না করলে সংশ্লিষ্ট কর্মকর্তার বিরুদ্ধে বিভাগীয় ব্যবস্থা গ্রহণ করা যায়।",
    keywords: ["informing superior", "arrest notification", "urdhoton kormokorta", "ঊর্ধ্বতন কর্মকর্তাকে অবহিতকরণ", "গ্রেপ্তার সুরক্ষা", "ধারা ৭৪"],
    related: ["consumer-25", "consumer-77"]
  },
  75: {
    enTitle: "Procedure When Offense Falls Under Other Statutes",
    enExp: "Clarifies that where an offense constitutes an offense under both this Act and another statute, proceedings may be instituted under either law.",
    bnExp: "কোনো কার্য এই আইন এবং অন্য কোনো বিশেষ আইন উভয় আইনের অধীন অপরাধ হলে যেকোনো একটি আইনের অধীনে আইনি ব্যবস্থা গ্রহণের নিয়ম।",
    enCaution: "No person shall be punished twice for the identical physical offense under the principle of non bis in idem.",
    bnCaution: "উভয় আইনে ব্যবস্থা নেওয়া গেলেও একই অপরাধে একই ব্যক্তিকে দুইবার শাস্তি দেওয়া যাবে না।",
    keywords: ["concurrent offenses", "multiple statutes", "onno ain", "অন্য আইনের অধীনে অপরাধ", "ধারা ৭৫"],
    related: ["consumer-3", "consumer-64"]
  },
  77: {
    enTitle: "Protection of Action Taken in Good Faith (Statutory Indemnity)",
    enExp: "Provides statutory immunity against civil and criminal lawsuits for officers acting in good faith in discharge of their statutory functions under this Act.",
    bnExp: "এই আইনের অধীন সরল বিশ্বাসে দায়িত্ব পালনকালে কৃত কোনো কাজের জন্য সরকারি কর্মকর্তাদের বিরুদ্ধে মামলা বা মামলা পরিচালনার প্রতিবন্ধকতা।",
    enCaution: "Immunity applies strictly to bona fide official acts; it does not protect corrupt, malicious, or ultra vires misconduct.",
    bnCaution: "দুর্নীতি বা উদ্দেশ্যপ্রণোদিত অসদাচরণের ক্ষেত্রে এই ধারা কোনো সরকারি কর্মচারীকে দায়মুক্তি দেয় না।",
    keywords: ["good faith indemnity", "statutory immunity", "shorol bishashe kaj", "সরল বিশ্বাসে কৃত কার্য", "দায়মুক্তি", "ধারা ৭৭"],
    related: ["consumer-74", "consumer-78"]
  },
  78: {
    enTitle: "Exemption from Government Liability",
    enExp: "Shields the Government and the Council from damages for any unintentional loss suffered by any person during bona fide enforcement actions.",
    bnExp: "আইন প্রয়োগকালে সরল বিশ্বাসে সংঘটিত অনিচ্ছাকৃত ক্ষতির জন্য সরকার বা পরিষদের ওপর আর্থিক দায়ভার বর্তাবে না।",
    enCaution: "Applies to lawful sovereign actions taken in public interest to safeguard general consumer safety.",
    bnCaution: "জনস্বার্থে ভেজাল পণ্য ধ্বংস বা অভিযানে কোনো অনিচ্ছাকৃত ক্ষতি হলে সরকারের বিরুদ্ধে ক্ষতিপূরণ দাবি করা যায় না।",
    keywords: ["government liability exemption", "sovereign immunity", "shorkarer daymukti", "দায় হইতে অব্যাহতি", "সরকারি দায়মুক্তি", "ধারা ৭৮"],
    related: ["consumer-77"]
  },
  79: {
    enTitle: "Delegation of Powers by Director General",
    enExp: "Empowers the DG to delegate any of their statutory powers and responsibilities to subordinate directors, deputy directors, or assistant directors.",
    bnExp: "মহাপরিচালক কর্তৃক এই আইনের অধীন তার যেকোনো প্রশাসনিক ক্ষমতা অধস্তন কর্মকর্তাদের ওপর অর্পণ করার অধিকার।",
    enCaution: "Delegated officers exercise the full statutory authority of the DG within their assigned regional territorial jurisdictions.",
    bnCaution: "সহকারী পরিচালক বা উপ-পরিচালকগণ অর্পিত ক্ষমতাবলে স্ব-স্ব জেলায় সরাসরি ম্যাজিস্ট্রেসি ও বাজার অভিযান পরিচালনা করেন।",
    keywords: ["delegation of powers", "officer authority", "khomota orpon", "ক্ষমতা অর্পণ", "ডিজির ক্ষমতা অর্পণ", "ধারা ৭৯"],
    related: ["consumer-20", "consumer-21"]
  },
  80: {
    enTitle: "Power of Government to Make Rules",
    enExp: "Empowers the Government to make rules by official gazette notification to implement and execute the objectives of this Act.",
    bnExp: "এই আইনের উদ্দেশ্য পূরণকল্পে সরকার কর্তৃক সরকারি গেজেটে প্রজ্ঞাপন দ্বারা সংবিধিবদ্ধ বিধিমালা প্রণয়নের ক্ষমতা।",
    enCaution: "The Consumers' Right Protection Rules formulate procedural details regarding complaint forms and reward distribution.",
    bnCaution: "ভোক্তা অধিকার সংরক্ষণ বিধিমালা অনুযায়ী অভিযোগের ফরম এবং ২৫% অর্থ প্রদানের নিয়মাবলি কার্যকর হয়।",
    keywords: ["rule making power", "government rules", "bidhi pronoyon", "বিধি প্রণয়নের ক্ষমতা", "ভোক্তা বিধিমালা", "ধারা ৮০"],
    related: ["consumer-81", "consumer-82"]
  },
  81: {
    enTitle: "Power of Directorate to Make Regulations",
    enExp: "Authorizes the Directorate, with prior Government approval, to formulate internal regulations for the operational administration of the Directorate.",
    bnExp: "সরকারের পূর্বানুমোদন সাপেক্ষে অধিদপ্তর কর্তৃক অভ্যন্তরীণ প্রশাসনিক পরিচালনা সংক্রান্ত প্রবিধান প্রণয়নের কর্তৃত্ব।",
    enCaution: "Regulations govern internal service conditions, inspection protocols, and operational workflows of consumer officers.",
    bnCaution: "প্রবিধানের মাধ্যমে কর্মকর্তা-কর্মচারীদের কার্যপদ্ধতি ও পরিদর্শন নীতিমালা সুনির্দিষ্ট করা হয়।",
    keywords: ["regulation making power", "directorate regulations", "probidhan pronoyon", "প্রবিধান প্রণয়ন", "অধিদপ্তরের প্রবিধান", "ধারা ৮১"],
    related: ["consumer-80"]
  },
  82: {
    enTitle: "Publication of Authentic English Text",
    enExp: "Provides for the publication of an authentic English text of this Act, stipulating that in case of conflict, the original Bengali text prevails.",
    bnExp: "এই আইনের একটি অনুমোদিত ইংরেজি পাঠ প্রকাশের বিধান, তবে ইংরেজি ও মূল বাংলা পাঠের মধ্যে বিরোধ দেখা দিলে বাংলা পাঠ প্রাধান্য পাবে।",
    enCaution: "Judicial interpretation and statutory citations in courts must be resolved based on the authoritative Bengali gazette text.",
    bnCaution: "আইনি কোনো বিভ্রান্তি বা অর্থের দ্বন্দ্ব দেখা দিলে মূল বাংলা পাঠই চূড়ান্ত হিসেবে গণ্য হবে।",
    keywords: ["authentic english text", "bengali text prevails", "english version", "ইংরেজি পাঠ", "বাংলা পাঠ প্রাধান্য", "ধারা ৮২"],
    related: ["consumer-1"]
  }
};

const newProvisions = [];

for (const raw of rawData) {
  const secNum = raw.secIndex;
  if (existingSecNums.has(secNum)) {
    continue; // already in corpus
  }

  const meta = consumerMetadata[secNum];
  if (!meta) {
    console.error(`Missing metadata mapping for Consumer Section ${secNum}`);
    continue;
  }

  const id = `consumer-${secNum}`;
  const sectionNumber = `Section ${secNum}`;
  const titleBn = raw.titleBn ? `${raw.titleBn} (ধারা ${secNum})` : `ধারা ${secNum}`;
  const titleEn = `${meta.enTitle} (Section ${secNum})`;

  const provision = {
    id,
    actId: 'act_consumer_2009',
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
    effectiveDate: '2009-04-06',
    legalStatus: 'active',
    reviewStatus: 'verified',
    contentHash: '',
    keywords: [
      ...meta.keywords,
      `ধারা ${secNum}`,
      `section ${secNum}`,
      `consumer ${secNum}`,
      `ভোক্তা অধিকার সংরক্ষণ আইন ধারা ${secNum}`,
      `consumer act section ${secNum}`,
      'ভোক্তা অধিকার',
      'bhokta odhikar'
    ],
    relatedProvisions: meta.related || []
  };

  newProvisions.push(provision);
}

console.log(`Generated ${newProvisions.length} missing provisions for Consumers' Right Protection Act, 2009`);
fs.writeFileSync('scripts/generated_consumer_provisions.json', JSON.stringify(newProvisions, null, 2), 'utf8');
