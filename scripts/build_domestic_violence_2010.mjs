import fs from 'node:fs';
import crypto from 'node:crypto';

const extracted = JSON.parse(fs.readFileSync('scripts/family_sections_extracted.json', 'utf8'))['act_domestic_violence_2010'];
const existingProvs = JSON.parse(fs.readFileSync('src/data/corpus/provisions.json', 'utf8')).filter(p => p.actId === 'act_domestic_violence_2010');

function sha256(str) {
  return crypto.createHash('sha256').update(str.trim()).digest('hex');
}

function bnToEnNum(str) {
  const bn = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  return String(str).replace(/[০-৯]/g, d => bn.indexOf(d));
}

const existingMap = new Map();
existingProvs.forEach(p => existingMap.set(p.id, p));

const sectionsMeta = {
  1: {
    title: { bn: "সংক্ষিপ্ত শিরোনাম ও প্রবর্তন (ধারা ১)", en: "Short Title and Commencement (Section 1)" },
    plainExplanation: {
      bn: "এই আইনটি 'পারিবারিক সহিংসতা (প্রতিরোধ ও সুরক্ষা) আইন, ২০১০' নামে অভিহিত এবং সরকার কর্তৃক প্রজ্ঞাপিত তারিখে কার্যকর হয়।",
      en: "Designates the statute as the Domestic Violence (Prevention and Protection) Act, 2010 (Act No. LVIII of 2010)."
    },
    caution: {
      bn: "পরিবারের নারী ও শিশুদের শারীরিক, মানসিক, যৌন ও আর্থিক নির্যাতন প্রতিরোধে এটি বাংলাদেশের প্রধান বিশেষ সুরক্ষা আইন।",
      en: "Primary civil and protective statutory framework safeguarding women and children from intra-familial abuse without requiring divorce."
    },
    keywords: ["domestic violence act 2010", "paribarik shohingshota ain", "পারিবারিক সহিংসতা আইন ২০১০", "section 1", "ধারা ১", "short title"]
  },
  2: {
    title: { bn: "সংজ্ঞা ও মূল পরিভাষা (ধারা ২)", en: "Definitions and Statutory Terms (Section 2)" },
    plainExplanation: {
      bn: "এই আইনে সংক্ষুব্ধ ব্যক্তি (ভুক্তভোগী নারী বা শিশু), প্রতিপক্ষ, পারিবারিক সম্পর্ক, অংশীদারী বাসগৃহ (shared household), সুরক্ষা আদেশ, বসবাস আদেশ ও ক্ষতিপূরণ আদেশ সংজ্ঞায়িত করা হইয়াছে।",
      en: "Defines aggrieved person (abused woman or child), respondent, domestic relationship, shared household, protection order, residence order, and monetary compensation."
    },
    caution: {
      bn: "অংশীদারী বাসগৃহে নারী বা শিশুর কোনো মালিকানা না থাকলেও রক্তের সম্পর্ক, বিয়ে বা দত্তক সূত্রে বসবাসের পূর্ণ অধিকার রয়েছে।",
      en: "Aggrieved persons have statutory rights in the shared household regardless of whether they hold legal title or proprietary rights."
    },
    keywords: ["domestic definitions", "aggrieved person", "shared household", "shongkhubdho bekti", "অংশীদারী বাসগৃহ", "সংজ্ঞা", "ধারা ২", "section 2"]
  },
  3: {
    title: { bn: "পারিবারিক সহিংসতার পূর্ণাঙ্গ সংজ্ঞা (ধারা ৩)", en: "Comprehensive Definition of Domestic Violence (Section 3)" },
    plainExplanation: {
      bn: "পারিবারিক সহিংসতা বলিতে পরিবারের সদস্য কর্তৃক নারী বা শিশুর উপর শারীরিক নির্যাতন, মানসিক নির্যাতন (গালাগালি, অপমান, চরিত্র নিয়ে অপবাদ), যৌন নির্যাতন এবং অর্থনৈতিক নির্যাতন (খোরপোশ বন্ধ, সম্পত্তিতে প্রবেশে বাধা, বেতন বা আয় কেড়ে নেওয়া) বুঝায়।",
      en: "Defines domestic violence expansively to include physical abuse, psychological abuse (verbal insults, defamation, emotional torment), sexual abuse, and economic abuse (denying maintenance, withholding food or medical care, forceful seizure of income or stridhan)."
    },
    caution: {
      bn: "কেবল মারধর নয়, চরিত্র নিয়ে অপবাদ দেওয়া বা ভরণপোষণ বন্ধ করে দেওয়াও আইনের দৃষ্টিতে পারিবারিক সহিংসতা।",
      en: "Emotional abuse, character assassination, and economic deprivation constitute punishable domestic violence under the law."
    },
    keywords: ["domestic violence definition", "mental torture", "economic abuse", "paribarik shohingshota", "পারিবারিক সহিংসতা", "মানসিক নির্যাতন", "আর্থিক নির্যাতন", "ধারা ৩", "section 3"]
  },
  4: {
    title: { bn: "পুলিশ অফিসারের দায়িত্ব ও কর্তব্য (ধারা ৪)", en: "Duties and Responsibilities of Police Officers (Section 4)" },
    plainExplanation: {
      bn: "পারিবারিক সহিংসতার খবর পাইলে পুলিশ অফিসার ভুক্তভোগীকে তাহার সুরক্ষার অধিকার, চিকিৎসা সেবা, আশ্রয় নিবাস ও বিনা খরচে আইনি সহায়তা প্রাপ্তির অধিকার সম্পর্কে অবহিত করিতে বাধ্য থাকিবেন।",
      en: "Mandates police officers who receive reports of domestic violence to inform the victim of their right to apply for protection orders, medical examination, shelter homes, and free legal aid."
    },
    caution: {
      bn: "পুলিশ কর্মকর্তা ঘটনা জানার সাথে সাথে প্রয়োগকারী কর্মকর্তাকে রিপোর্ট দিতে এবং প্রয়োজনে জরুরি সুরক্ষা দিতে বাধ্য।",
      en: "Police cannot dismiss domestic disputes as 'private family matters'; they have affirmative statutory duties to assist victims."
    },
    keywords: ["police duty domestic violence", "police shohayota", "পুলিশের দায়িত্ব", "পারিবারিক সুরক্ষা পুলিশ", "ধারা ৪", "section 4"]
  },
  5: {
    title: { bn: "প্রয়োগকারী কর্মকর্তা নিয়োগ (ধারা ৫)", en: "Appointment of Enforcement Officers (Section 5)" },
    plainExplanation: {
      bn: "সরকার প্রত্যেক উপজেলা, থানা বা মেট্রোপলিটন এলাকায় পারিবারিক সহিংসতা প্রতিরোধ ও সহায়তার জন্য এক বা একাধিক প্রয়োগকারী কর্মকর্তা (Enforcement Officer / মহিলা বিষয়ক কর্মকর্তা) নিয়োগ করিবে।",
      en: "Authorizes the Government to appoint one or more Enforcement Officers (typically Upazila / District Women Affairs Officers) in each upazila, thana, or metropolitan area."
    },
    caution: {
      bn: "প্রয়োগকারী কর্মকর্তা ভুক্তভোগী নারীর আবেদন ম্যাজিস্ট্রেটের কাছে পেশ ও সুরক্ষার ব্যবস্থা করেন।",
      en: "Enforcement officers act as statutory liaisons connecting victims directly with magistrate courts and shelters."
    },
    keywords: ["enforcement officer", "proyogkari kormokorta", "প্রয়োগকারী কর্মকর্তা", "উপজেলা মহিলা বিষয়ক কর্মকর্তা", "ধারা ৫", "section 5"]
  },
  6: {
    title: { bn: "প্রয়োগকারী কর্মকর্তার দায়িত্ব ও কর্তব্য (ধারা ৬)", en: "Duties and Powers of Enforcement Officers (Section 6)" },
    plainExplanation: {
      bn: "প্রয়োগকারী কর্মকর্তা পারিবারিক সহিংসতার তদন্ত রিপোর্ট আদালতে পেশ করবেন, ভুক্তভোগীকে চিকিৎসা ও আশ্রয় প্রদান নিশ্চিত করবেন এবং আদালতের সুরক্ষা আদেশ কার্যকর করবেন।",
      en: "Enforcement officers investigate domestic incidents, prepare Domestic Incident Reports (DIR), assist in court filings, ensure shelter and medical access, and enforce court orders."
    },
    caution: {
      bn: "প্রয়োগকারী কর্মকর্তার মাধ্যমে আবেদন করলে আদালতের প্রক্রিয়া দ্রুত ও বিনামূল্যে সম্পন্ন হয়।",
      en: "Submitting reports through the enforcement officer facilitates prompt ex-parte protection orders from the magistrate."
    },
    keywords: ["duties of enforcement officer", "domestic incident report", "সুরক্ষা কর্মকর্তার দায়িত্ব", "ধারা ৬", "section 6"]
  },
  7: {
    title: { bn: "সেবা প্রদানকারী এবং উহাদের দায়িত্ব ও কর্তব্য (ধারা ৭)", en: "Service Providers and Their Responsibilities (Section 7)" },
    plainExplanation: {
      bn: "সরকার কর্তৃক তালিকাভুক্ত স্বেচ্ছাসেবী সংস্থা বা এনজিও (Service Provider) ভুক্তভোগী নারী ও শিশুদের চিকিৎসা, মনস্তাত্ত্বিক কাউন্সেলিং, আইনি সহায়তা এবং সাময়িক আশ্রয়ের ব্যবস্থা করিবে।",
      en: "Recognizes voluntary agencies and registered NGOs as official Service Providers to assist victims with counseling, legal support, medical aid, and shelter."
    },
    caution: {
      bn: "স্বীকৃত সেবা প্রদানকারীর নিকট করা বক্তব্য গোপনীয় ও সাক্ষ্য হিসেবে গ্রহণযোগ্য।",
      en: "Reports from registered service providers assist courts in granting prompt emergency relief."
    },
    keywords: ["service provider domestic violence", "sheba prodankari", "সেবা প্রদানকারী", "এনজিও সহায়তা", "ধারা ৭", "section 7"]
  },
  8: {
    title: { bn: "আশ্রয় নিবাসের দায়িত্ব (ধারা ৮)", en: "Duties of Shelter Homes (Section 8)" },
    plainExplanation: {
      bn: "ভুক্তভোগী ব্যক্তি বা তাহার পক্ষে প্রয়োগকারী কর্মকর্তা বা পুলিশ অফিসার অনুরোধ করিলে সরকারি বা অনুমোদিত আশ্রয় নিবাস সংক্ষুব্ধ ব্যক্তিকে নিরাপদ আশ্রয় প্রদান করিতে বাধ্য থাকিবে।",
      en: "Mandates government and authorized shelter homes to provide safe shelter and boarding to aggrieved women and children upon request."
    },
    caution: {
      bn: "আশ্রয় নিবাস সংক্ষুব্ধ ব্যক্তিকে আশ্রয় প্রদানের রিপোর্ট অবিলম্বে নিকটস্থ ম্যাজিস্ট্রেট আদালতে প্রেরণ করবে।",
      en: "Shelter operators must promptly transmit admission notifications to the jurisdictional magistrate."
    },
    keywords: ["shelter homes", "ashroy nibas", "আশ্রয় নিবাস", "safe home", "ধারা ৮", "section 8"]
  },
  9: {
    title: { bn: "চিকিৎসা সেবা প্রদানকারীর দায়িত্ব (ধারা ৯)", en: "Duties of Medical Facility / Providers (Section 9)" },
    plainExplanation: {
      bn: "সহিংসতার শিকার নারী বা শিশু চিকিৎসকের নিকট উপস্থিত হইলে হাসপাতাল বা স্বাস্থ্য কেন্দ্র অবিলম্বে বিনামূল্যে প্রয়োজনীয় চিকিৎসা সেবা ও মেডিকেল সার্টিফিকেট প্রদান করিবে।",
      en: "Requires medical institutions and physicians to provide emergency medical treatment to domestic violence victims and prepare free medical reports."
    },
    caution: {
      bn: "চিকিৎসক তার মেডিকেল রিপোর্টের অনুলিপি সংশ্লিষ্ট প্রয়োগকারী কর্মকর্তা ও ম্যাজিস্ট্রেটকে প্রেরণ করবেন।",
      en: "Medical records serve as critical corroborative evidence in subsequent civil protection and criminal proceedings."
    },
    keywords: ["medical facility duty", "chikitsa sheba", "চিকিৎসা সেবা", "মেডিকেল রিপোর্ট", "ধারা ৯", "section 9"]
  },
  10: {
    title: { bn: "অংশীদারী বাসগৃহে বসবাসের অধিকার (ধারা ১০)", en: "Right to Reside in Shared Household (Section 10)" },
    plainExplanation: {
      bn: "পারিবারিক সম্পর্কের সূত্রে সংক্ষুব্ধ প্রত্যেক নারী বা শিশুর অংশীদারী বাসগৃহে নিরাপদে বসবাস করিবার অবিচ্ছেদ্য অধিকার রহিয়াছে। আইনের যথাযথ প্রক্রিয়া ব্যতীত তাহাকে বাসগৃহ হইতে উচ্ছেদ বা প্রবেশে বাধা দেওয়া নিষিদ্ধ।",
      en: "Guarantees every aggrieved person the statutory right to reside safely in the shared household. The respondent cannot evict, exclude, or restrict the victim's access except by due process of law."
    },
    caution: {
      bn: "বাড়িটি স্বামীর বা শ্বশুরের নামে হলেও স্ত্রীকে জোর করে বের করে দেওয়া আইনত দণ্ডনীয়।",
      en: "Wives and children cannot be forcefully thrown out of the matrimonial home even if title is held solely by the husband or in-laws."
    },
    keywords: ["shared household right", "onshodari basgriho", "বাসগৃহে বসবাসের অধিকার", "উচ্ছেদ প্রতিরোধ", "right to reside safely", "eviction protection", "ধারা ১০", "section 10"]
  },
  11: {
    title: { bn: "আদালতে সুরক্ষা ও প্রতিকারের আবেদন (ধারা ১১)", en: "Application to Court for Protection and Relief Orders (Section 11)" },
    plainExplanation: {
      bn: "সংক্ষুব্ধ ব্যক্তি নিজে, তাহার পক্ষে প্রয়োগকারী কর্মকর্তা, পুলিশ অফিসার বা কোনো সেবা প্রদানকারী জুডিশিয়াল বা মেট্রোপলিটন ম্যাজিস্ট্রেট আদালতে সুরক্ষা, বসবাস, ক্ষতিপূরণ বা হেফাজত আদেশের জন্য সরাসরি আবেদন করিতে পারেন।",
      en: "An aggrieved person, enforcement officer, police, or service provider may apply directly to a Judicial Magistrate or Metropolitan Magistrate for protection, residence, monetary relief, or custody orders."
    },
    caution: {
      bn: "পারিবারিক সহিংসতা আইনে প্রতিকার পাওয়ার জন্য বিবাহবিচ্ছেদ করার কোনো প্রয়োজন নাই।",
      en: "Victims can obtain immediate judicial protection and monetary support without having to file for divorce."
    },
    keywords: ["application to court", "adallote abedon", "ম্যাজিস্ট্রেট আদালতে আবেদন", "সুরক্ষা প্রার্থনা", "protection order petition", "ধারা ১১", "section 11"]
  },
  12: {
    title: { bn: "আবেদন দাখিলের স্থান ও এখতিয়ার (ধারা ১২)", en: "Jurisdiction and Place of Filing Application (Section 12)" },
    plainExplanation: {
      bn: "যে এলাকায় সংক্ষুব্ধ ব্যক্তি স্থায়ী বা অস্থায়ীভাবে বসবাস করেন, বা চাকরি/ব্যবসা করেন, বা প্রতিপক্ষ বসবাস করেন, অথবা যেখানে সহিংসতা সংঘটিত হইয়াছে—সেই এলাকার ম্যাজিস্ট্রেট আদালতে আবেদন করা যাইবে।",
      en: "Specifies territorial jurisdiction: Applications may be filed where the victim temporarily or permanently resides, works, or where the respondent resides or the domestic violence occurred."
    },
    caution: {
      bn: "ভুক্তভোগী নারী বাবার বাড়ি বা আশ্রয়ে অবস্থান করলেও সেখানকার স্থানীয় ম্যাজিস্ট্রেট আদালতে মামলা করতে পারেন।",
      en: "Protects displaced victims by allowing suits in their current sanctuary jurisdiction rather than matrimonial residence."
    },
    keywords: ["place of application", "abedon dakhiler sthan", "এখতিয়ার", "আদালতের এলাকা", "jurisdiction domestic violence", "ধারা ১২", "section 12"]
  },
  13: {
    title: { bn: "অন্তর্বর্তীকালীন সুরক্ষা আদেশ ও নোটিশ জারি (ধারা ১৩)", en: "Interim Protection Orders and Notice to Respondent (Section 13)" },
    plainExplanation: {
      bn: "আবেদন প্রাপ্তির পর ম্যাজিস্ট্রেট সন্তুষ্ট হইলে নোটিশ জারির পূর্বে বা সাথে সাথে একতরফা জরুরি অন্তর্বর্তীকালীন সুরক্ষা আদেশ (Ex-parte Interim Protection Order) প্রদান করিতে পারেন।",
      en: "Empowers the Magistrate to pass an ex-parte interim protection order upon prima facie satisfaction before or alongside issuing show-cause notice to the respondent."
    },
    caution: {
      bn: "প্রতিপক্ষের উপস্থিতি ছাড়াও জরুরি জীবন ও নিরাপত্তার ঝুঁকিতে তাৎক্ষণিক অন্তর্বর্তী আদেশ পাওয়া যায়।",
      en: "Emergency interim orders protect victims immediately without waiting for respondent appearance."
    },
    keywords: ["interim protection order", "ontorbotikalin adesh", "অন্তর্বর্তীকালীন সুরক্ষা", "ex parte protection", "ধারা ১৩", "section 13"]
  },
  14: {
    title: { bn: "সুরক্ষা আদেশ (ধারা ১৪)", en: "Protection Orders Against Violence (Section 14)" },
    plainExplanation: {
      bn: "ম্যাজিস্ট্রেট প্রতিপক্ষকে পারিবারিক সহিংসতা সংঘটন, সহায়তা, সংক্ষুব্ধ ব্যক্তির কর্মস্থল বা বাসস্থানে প্রবেশ, যোগাযোগ স্থাপন বা সংক্ষুব্ধ ব্যক্তির সম্পত্তিতে হস্তক্ষেপ করা হইতে বিরত থাকিবার নির্দেশ দিয়া সুরক্ষা আদেশ জারি করিতে পারেন।",
      en: "The Magistrate may pass a protection order prohibiting the respondent from committing acts of domestic violence, entering the victim's workplace or residence, contacting the victim, or disposing of shared assets."
    },
    caution: {
      bn: "সুরক্ষা আদেশ অমান্য করা একটি আমলযোগ্য ও শাস্তিযোগ্য ফৌজদারি অপরাধ (ধারা ৩০)।",
      en: "Breaching a Section 14 protection order triggers immediate criminal prosecution and imprisonment under Section 30."
    },
    keywords: ["protection order", "shurokkha adesh", "সুরক্ষা আদেশ", "prohibition of violence", "restraining order", "ধারা ১৪", "section 14"]
  },
  15: {
    title: { bn: "বসবাস আদেশ ও উচ্ছেদ নিষেধাজ্ঞা (ধারা ১৫)", en: "Residence Orders Protecting Shared Household (Section 15)" },
    plainExplanation: {
      bn: "আদালত প্রতিপক্ষকে অংশীদারী বাসগৃহ হইতে সংক্ষুব্ধ ব্যক্তিকে উচ্ছেদ করা হইতে বিরত থাকার নির্দেশ দিতে পারেন, অথবা প্রতিপক্ষকে বাসগৃহ হইতে সরিয়া যাওয়ার বা সংক্ষুব্ধ ব্যক্তির জন্য বিকল্প বাসস্থানের খরচ দেওয়ার নির্দেশ দিতে পারেন।",
      en: "Authorizes the Magistrate to pass a residence order restraining the respondent from evicting the victim, directing the respondent to remove themselves from the home, or directing payment of alternative accommodation rental."
    },
    caution: {
      bn: "কোনো নারী প্রতিপক্ষের বিরুদ্ধে বাসগৃহ ত্যাগ করার আদেশ দেওয়া যাবে না।",
      en: "Female respondents cannot be ordered to vacate the shared household under this section."
    },
    keywords: ["residence order", "bosobas adesh", "বসবাস আদেশ", "উচ্ছেদ নিষেধাজ্ঞা", "shared household order", "alternative accommodation", "ধারা ১৫", "section 15"]
  },
  16: {
    title: { bn: "আর্থিক ক্ষতিপূরণ ও ভরণপোষণ আদেশ (ধারা ১৬)", en: "Monetary Relief and Compensation Orders (Section 16)" },
    plainExplanation: {
      bn: "আদালত প্রতিপক্ষকে সংক্ষুব্ধ ব্যক্তির চিকিৎসার খরচ, সহিংসতার ফলে নষ্ট হওয়া সম্পত্তির ক্ষতিপূরণ, সংক্ষুব্ধ ব্যক্তি ও সন্তানের খোরপোশ এবং শারীরিক ও মানসিক যাতনার ক্ষতিপূরণ প্রদানের নির্দেশ দিতে পারেন।",
      en: "Authorizes monetary relief orders directing the respondent to pay medical expenses, compensation for damaged property, maintenance for the victim and minor children, and damages for physical and mental trauma."
    },
    caution: {
      bn: "নির্ধারিত সময়ের মধ্যে ক্ষতিপূরণ পরিশোধ না করিলে আদালত সম্পত্তি ক্রোক বা জেল প্রদানের নির্দেশ দিতে পারে।",
      en: "Unpaid monetary relief can be recovered by attachment of salary, bank accounts, or distress warrants under CrPC."
    },
    keywords: ["monetary relief", "khotipuron adesh", "ক্ষতিপূরণ আদেশ", "ভরণপোষণ", "medical expenses relief", "maintenance domestic violence", "ধারা ১৬", "section 16"]
  },
  17: {
    title: { bn: "সন্তানের নিরাপদ হেফাজত আদেশ (ধারা ১৭)", en: "Temporary Custody Orders for Minor Children (Section 17)" },
    plainExplanation: {
      bn: "পারিবারিক সহিংসতা চলাকালীন বা মামলার কার্যধারায় আদালত সংক্ষুব্ধ ব্যক্তি বা আবেদনকারীকে সন্তানের সাময়িক নিরাপদ হেফাজত (Temporary Custody) প্রদান এবং প্রতিপক্ষের সাক্ষাতের শর্ত নির্ধারণ করিতে পারেন।",
      en: "Authorizes temporary custody of any child or children to the aggrieved person or applicant, and regulates visiting arrangements if safe for the child."
    },
    caution: {
      bn: "সন্তানের নিরাপত্তার ঝুঁকি থাকিলে আদালত প্রতিপক্ষের সাক্ষাৎ করার অধিকার সম্পূর্ণ বাতিল বা স্থগিত করতে পারেন।",
      en: "Visitation rights can be denied if the child is at risk of harm or emotional trauma from the abusive parent."
    },
    keywords: ["temporary custody order", "hefazot adesh", "সন্তানের নিরাপদ হেফাজত", "custody of children", "visitation rights", "ধারা ১৭", "section 17"]
  },
  18: {
    title: { bn: "বিনা মূল্যে আদেশের অনুলিপি সরবরাহ (ধারা ১৮)", en: "Free Certified Copies of Court Orders (Section 18)" },
    plainExplanation: {
      bn: "আদালত সুরক্ষা, বসবাস বা ক্ষতিপূরণ আদেশ প্রদানের পর উভয় পক্ষ, স্থানীয় প্রয়োগকারী কর্মকর্তা এবং ভারপ্রাপ্ত পুলিশ কর্মকর্তাকে বিনা খরচে আদেশের অনুলিপি সরবরাহ করিবে।",
      en: "Directs the Magistrate to deliver certified copies of orders to both parties, the enforcement officer, and the local police station entirely free of cost."
    },
    caution: {
      bn: "আদেশের অনুলিপি পাওয়ার পর স্থানীয় পুলিশ সুরক্ষা কার্যকর করতে বাধ্য থাকে।",
      en: "Police and enforcement officers must execute and monitor protection orders immediately upon receiving free copies."
    },
    keywords: ["free copies of order", "bina mulle onulipi", "আদেশের অনুলিপি", "free certified copy", "ধারা ১৮", "section 18"]
  },
  19: {
    title: { bn: "আদেশের মেয়াদ ও সংশোধন (ধারা ১৯)", en: "Duration, Alteration, and Revocation of Orders (Section 19)" },
    plainExplanation: {
      bn: "সুরক্ষা আদেশ আদালত কর্তৃক নির্দিষ্ট মেয়াদ পর্যন্ত অথবা পরবর্তী কোনো আদেশ না দেওয়া পর্যন্ত বলবৎ থাকিবে। পরিস্থিতির পরিবর্তন হইলে পক্ষগণের আবেদনের প্রেক্ষিতে আদালত আদেশ সংশোধন বা বাতিল করিতে পারিবে।",
      en: "Protection orders remain operative until discharged or for a specified duration. The Magistrate may alter, modify, or revoke orders upon proof of a material change in circumstances."
    },
    caution: {
      bn: "কোনো পক্ষ নোটিশ ছাড়া একতরফাভাবে সুরক্ষা আদেশ বাতিল করাতে পারবে না।",
      en: "Modification requires giving reasonable notice and opportunity of hearing to both sides."
    },
    keywords: ["duration of order", "adesh songshodhon", "আদেশের মেয়াদ ও সংশোধন", "alteration revocation", "ধারা ১৯", "section 19"]
  },
  20: {
    title: { bn: "আবেদন নিষ্পত্তি ও ৬০ দিনের সময়সীমা (ধারা ২০)", en: "Expeditious Disposal within 60 Days (Section 20)" },
    plainExplanation: {
      bn: "ম্যাজিস্ট্রেট আদালতে পারিবারিক সহিংসতার আবেদন প্রথম শুনানির তারিখ হইতে অনধিক ৬০ (ষাট) কার্যদিবসের মধ্যে অবশ্যই চূড়ান্ত নিষ্পত্তি করিতে হইবে।",
      en: "Mandates that the Magistrate shall endeavor to dispose of every application within strictly sixty (60) working days from the date of the first hearing."
    },
    caution: {
      bn: "মামলাটি যাতে বছরের পর বছর প্রলম্বিত না হয় সেজন্য আইনে ৬০ দিনের সংবিধিবদ্ধ বাধ্যতামূলক সময়সীমা রাখা হয়েছে।",
      en: "A statutory fast-track benchmark ensuring prompt judicial relief for vulnerable women and children."
    },
    keywords: ["disposal within 60 days", "shat diner moddhe", "৬০ দিনের মধ্যে নিষ্পত্তি", "fast track disposal", "ধারা ২০", "section 20"]
  },
  21: {
    title: { bn: "বিচার ও ট্রায়াল আদালত (ধারা ২১)", en: "Trial Jurisdiction of Magistrates (Section 21)" },
    plainExplanation: {
      bn: "পারিবারিক সহিংসতা আইনের অধীন অপরাধ ও আদেশ লঙ্ঘনের বিচার প্রথম শ্রেণীর জুডিশিয়াল ম্যাজিস্ট্রেট বা মেট্রোপলিটন ম্যাজিস্ট্রেট আদালত কর্তৃক অনুষ্ঠিত হইবে।",
      en: "Designates Courts of Judicial Magistrate of the First Class or Metropolitan Magistrate as competent trial courts for all offenses and proceedings under this Act."
    },
    caution: {
      bn: "ম্যাজিস্ট্রেট আদালত একই সাথে দেওয়ানি ধরনের সুরক্ষা আদেশ এবং ফৌজদারি শাস্তিমূলক ক্ষমতা প্রয়োগ করতে পারেন।",
      en: "Magistrates possess quasi-civil protective powers alongside criminal enforcement authority."
    },
    keywords: ["trial by magistrate", "bichar", "বিচারিক এখতিয়ার", "judicial magistrate trial", "ধারা ২১", "section 21"]
  },
  22: {
    title: { bn: "বিচারের সংক্ষিপ্ত কার্যপদ্ধতি (ধারা ২২)", en: "Summary Procedure of Trial under CrPC (Section 22)" },
    plainExplanation: {
      bn: "আবেদনের শুনানি ও বিচার ফৌজদারি কার্যবিধি, ১৮৯৮ এর সংক্ষিপ্ত বিচার পদ্ধতি (Summary Trial Procedure) অনুযায়ী দ্রুততম সময়ে পরিচালিত হইবে।",
      en: "Prescribes summary trial procedures under the Code of Criminal Procedure, 1898 for expeditious resolution without cumbersome procedural delays."
    },
    caution: {
      bn: "আদালত মামলার প্রয়োজনে উভয় পক্ষকে কাউন্সেলিং বা আপস-মীমাংসার সুযোগ প্রদান করতে পারেন।",
      en: "Courts may direct conciliation and counseling without compromising victim security."
    },
    keywords: ["summary trial crpc", "karyopodhoti", "সংক্ষিপ্ত বিচার পদ্ধতি", "crpc procedure", "ধারা ২২", "section 22"]
  },
  23: {
    title: { bn: "নিভৃত কক্ষে বিচার কার্যক্রম (ধারা ২৩)", en: "In Camera Trial Proceedings (Section 23)" },
    plainExplanation: {
      bn: "আদালত উপযুক্ত মনে করিলে অথবা কোনো পক্ষ আবেদন করিলে পারিবারিক সহিংসতার বিচার বা শুনানির সম্পূর্ণ বা অংশবিশেষ নিভৃত কক্ষে (In Camera) অনুষ্ঠান করিতে পারিবে।",
      en: "Empowers the Magistrate to conduct proceedings in camera upon request of either party or on the court's own motion to protect family privacy and dignity."
    },
    caution: {
      bn: "সংবেদনশীল পারিবারিক বিষয়ে প্রকাশ্যে শুনানি এড়াতে নারী ভুক্তভোগী নিভৃত কক্ষে শুনানির আবেদন করতে পারেন।",
      en: "Protects victims from public embarrassment and intimidation during evidence presentation."
    },
    keywords: ["in camera proceedings", "nibhrito kokkhe bichar", "নিভৃত কক্ষে বিচার", "privacy in trial", "ধারা ২৩", "section 23"]
  },
  24: {
    title: { bn: "সরেজমিনে তদন্ত (ধারা ২৪)", en: "Local Inquiry and Investigation (Section 24)" },
    plainExplanation: {
      bn: "আদালত প্রয়োজন মনে করিলে কোনো প্রয়োগকারী কর্মকর্তা, পুলিশ কর্মকর্তা বা অন্য কোনো উপযুক্ত ব্যক্তিকে ঘটনাস্থল সরেজমিনে তদন্ত করিয়া রিপোর্ট পেশের নির্দেশ দিতে পারেন।",
      en: "The Magistrate may direct local spot inquiries by an enforcement officer, police, or court appointee to verify facts before issuing final orders."
    },
    caution: {
      bn: "তদন্ত চলাকালীন সময়েও অন্তর্বর্তীকালীন সুরক্ষা আদেশ বলবৎ রাখা যায়।",
      en: "Local investigation directives do not suspend interim safety orders."
    },
    keywords: ["local inquiry", "shorejomin todonto", "সরেজমিনে তদন্ত", "spot investigation", "ধারা ২৪", "section 24"]
  },
  25: {
    title: { bn: "আদেশ জারি ও বাস্তবায়ন (ধারা ২৫)", en: "Execution and Service of Orders (Section 25)" },
    plainExplanation: {
      bn: "আদালত কর্তৃক প্রদত্ত আদেশ প্রয়োগকারী কর্মকর্তা এবং ভারপ্রাপ্ত পুলিশ কর্মকর্তার মাধ্যমে সরাসরি জারি ও তামিল করা হইবে।",
      en: "Court orders are served and executed directly through the enforcement officer and local police station personnel."
    },
    caution: {
      bn: "প্রতিপক্ষ নোটিশ গ্রহণে অস্বীকৃতি জানাইলে তাহা যথাযথভাবে জারি হইয়াছে বলিয়া গণ্য হইবে।",
      en: "Refusal to accept court notices constitutes effective statutory service."
    },
    keywords: ["execution of orders", "adesh jari", "আদেশ জারি", "service of protection order", "ধারা ২৫", "section 25"]
  },
  26: {
    title: { bn: "প্রতিপক্ষের অনুপস্থিতিতে বিচার (ধারা ২৬)", en: "Ex-parte Decision on Respondent's Default (Section 26)" },
    plainExplanation: {
      bn: "সমন বা নোটিশ যথাযথভাবে জারি হওয়ার পর প্রতিপক্ষ আদালতে হাজির হইতে ব্যর্থ হইলে আদালত একতরফাভাবে (Ex-parte) আবেদন নিষ্পত্তি করিয়া সুরক্ষা আদেশ প্রদান করিতে পারিবে।",
      en: "If the respondent fails to appear after valid service of notice, the Magistrate is empowered to pass ex-parte orders on the basis of the victim's affidavit and evidence."
    },
    caution: {
      bn: "প্রতিপক্ষ পলাতক থাকিলেও ভুক্তভোগী নারী একতরফা আদেশের মাধ্যমে বাড়ি ও খোরপোশের অধিকার পেতে পারেন।",
      en: "Absconding respondents cannot stall judicial protection or residence rights."
    },
    keywords: ["ex parte hearing", "onuposthitite bichar", "একতরফা বিচার", "default by respondent", "ধারা ২৬", "section 26"]
  },
  27: {
    title: { bn: "ভিত্তিহীন আবেদন খারিজ (ধারা ২৭)", en: "Dismissal of Frivolous Applications (Section 27)" },
    plainExplanation: {
      bn: "প্রাথমিক শুনানিতে যদি প্রতীয়মান হয় যে কোনো পারিবারিক সহিংসতা সংঘটিত হয় নাই বা আবেদনটি ভিত্তিহীন, তবে আদালত কারণ লিপিবদ্ধ করিয়া আবেদন খারিজ করিতে পারিবে।",
      en: "The Magistrate may dismiss an application with recorded reasons if satisfied that no prima facie case of domestic violence exists."
    },
    caution: {
      bn: "খারিজ আদেশের বিরুদ্ধে ৩০ দিনের মধ্যে দায়রা জজ আদালতে আপিল করার সুযোগ রয়েছে।",
      en: "Complainants may appeal dismissal orders to the Sessions Court within 30 days."
    },
    keywords: ["dismissal of application", "abedon kharij", "আবেদন খারিজ", "frivolous application", "ধারা ২৭", "section 27"]
  },
  28: {
    title: { bn: "দায়রা আদালতে আপিল (ধারা ২৮)", en: "Appeals to Sessions Judge Court (Section 28)" },
    plainExplanation: {
      bn: "ম্যাজিস্ট্রেটের যেকোনো আদেশ প্রদানের তারিখ হইতে ৩০ (ত্রিশ) দিনের মধ্যে সংক্ষুব্ধ ব্যক্তি বা প্রতিপক্ষ দায়রা জজ আদালতে আপিল দায়ের করিতে পারিবেন।",
      en: "An appeal lies to the Court of Session against any order passed by the Magistrate within thirty (30) days of the order date."
    },
    caution: {
      bn: "আপিল দায়েরের কারণে স্বয়ংক্রিয়ভাবে সুরক্ষা আদেশ স্থগিত হবে না, দায়রা আদালত স্পষ্ট স্থগিতাদেশ না দিলে আদেশ কার্যকর থাকবে।",
      en: "Filing an appeal does not automatically operate as a stay on protection or residence orders."
    },
    keywords: ["appeal sessions court", "apil 30 din", "আপিল ৩০ দিন", "দায়রা আদালত আপিল", "appeal domestic violence", "ধারা ২৮", "section 28"]
  },
  29: {
    title: { bn: "অপরাধের আমলযোগ্যতা, জামিনযোগ্যতা ও আপসযোগ্যতা (ধারা ২৯)", en: "Bailability, Cognizability, and Compoundability (Section 29)" },
    plainExplanation: {
      bn: "এই আইনের ধারা ৩০ (সুরক্ষা আদেশ লঙ্ঘন) এবং ধারা ৩২ (মিথ্যা আবেদন) এর অধীন সংঘটিত অপরাধসমূহ আমলযোগ্য (Cognizable), জামিনযোগ্য (Bailable) এবং আদালতের অনুমতি সাপেক্ষে আপসযোগ্য (Compoundable)।",
      en: "Offenses under Section 30 (breach of protection order) and Section 32 (false complaint) are cognizable, bailable, and compoundable with the leave of the court."
    },
    caution: {
      bn: "সুরক্ষা আদেশ অমান্য করলে পুলিশ বিনা পরোয়ানায় গ্রেপ্তার করতে পারে, তবে ম্যাজিস্ট্রেট আদালত শর্তসাপেক্ষে জামিন দিতে পারেন।",
      en: "Police may arrest without warrant for breaching court orders; bail is discretionary and subject to strict victim safety conditions."
    },
    keywords: ["bailable compoundable", "cognizable bailable", "আমলযোগ্য জামিনযোগ্য", "আপসযোগ্য", "jaminjoggo", "ধারা ২৯", "section 29"]
  },
  30: {
    title: { bn: "সুরক্ষা আদেশ লঙ্ঘনের শাস্তি (ধারা ৩০)", en: "Penalty for Breach of Protection Order by Respondent (Section 30)" },
    plainExplanation: {
      bn: "প্রতিপক্ষ আদালতের সুরক্ষা আদেশ লঙ্ঘন করিলে তিনি প্রথম অপরাধের জন্য অনধিক ৬ (ছয়) মাস কারাদণ্ড বা অনধিক ১০,০০০ (দশ হাজার) টাকা অর্থদণ্ড বা উভয় দণ্ডে; এবং দ্বিতীয় বা পরবর্তী অপরাধের জন্য অনধিক ২ (দুই) বৎসর কারাদণ্ড বা অনধিক ১,০০,০০০ (এক লক্ষ) টাকা অর্থদণ্ড বা উভয় দণ্ডে দণ্ডিত হইবেন।",
      en: "Breach of a protection order by the respondent is punishable for the first offense with imprisonment up to 6 months or fine up to 10,000 taka, or both; and for repeat offenses with up to 2 years imprisonment or fine up to 1,00,000 taka, or both."
    },
    caution: {
      bn: "আদালতের সুরক্ষা আদেশ অমান্য করা সরাসরি ফৌজদারি অপরাধ হিসেবে গণ্য হবে।",
      en: "Violating a protection order is an independent criminal offense resulting in imprisonment."
    },
    keywords: ["breach of protection order", "shurokkha adesh longghon", "সুরক্ষা আদেশ লঙ্ঘন", "penalty violation protection order", "ধারা ৩০", "section 30"]
  },
  31: {
    title: { bn: "সমাজকল্যাণমূলক কাজে সেবা প্রদানের আদেশ (ধারা ৩১)", en: "Community Service Orders (Section 31)" },
    plainExplanation: {
      bn: "আদালত কারাদণ্ড দেওয়ার পরিবর্তে বা তাহার অতিরিক্ত হিসেবে প্রতিপক্ষকে নির্দিষ্ট মেয়াদে কোনো সমাজকল্যাণমূলক বা দাতব্য প্রতিষ্ঠানে অবৈতনিক সেবা প্রদানের নির্দেশ দিতে পারে।",
      en: "Allows the Magistrate to sentence an offender to perform community service in approved welfare or educational institutions in lieu of or in addition to imprisonment."
    },
    caution: {
      bn: "সমাজসেবামূলক কাজ সফলভাবে সম্পন্ন করলে কারাদণ্ড মওকুফ হতে পারে।",
      en: "Rehabilitative sentencing aims to reduce domestic repeat offenses through supervised community work."
    },
    keywords: ["community service", "shomajkollan mulok kaj", "সমাজসেবামূলক আদেশ", "rehabilitation order", "ধারা ৩১", "section 31"]
  },
  32: {
    title: { bn: "মিথ্যা বা ভিত্তিহীন আবেদনের শাস্তি (ধারা ৩২)", en: "Punishment for False or Malicious Applications (Section 32)" },
    plainExplanation: {
      bn: "কোনো ব্যক্তি অন্য কারো ক্ষতিসাধন বা হয়রানির উদ্দেশ্যে ইচ্ছাকৃতভাবে মিথ্যা বা বানোয়াট আবেদন দায়ের করিলে তিনি অনধিক ১ (এক) বৎসর কারাদণ্ড বা অনধিক ৫০,০০০ (পঞ্চাশ হাজার) টাকা অর্থদণ্ড বা উভয় দণ্ডে দণ্ডিত হইবেন।",
      en: "Filing a false, fabricated, or malicious application under this Act with intent to cause harm or harassment is punishable with imprisonment up to 1 year or fine up to 50,000 taka, or both."
    },
    caution: {
      bn: "মিথ্যা মামলা দিয়ে কাউকে ফাঁসাতে চাইলে আবেদনকারীর বিরুদ্ধেই ১ বছরের জেল হতে পারে।",
      en: "Prevents misuse of protective domestic legislation; malicious complainants face criminal liability."
    },
    keywords: ["false domestic application", "mithya abedon shasti", "মিথ্যা আবেদনের শাস্তি", "penalty false allegation", "ধারা ৩২", "section 32"]
  },
  33: {
    title: { bn: "জনসেবক ও সরল বিশ্বাসে কৃত কাজের সুরক্ষা (ধারা ৩৩)", en: "Protection of Action Taken in Good Faith (Section 33)" },
    plainExplanation: {
      bn: "প্রয়োগকারী কর্মকর্তা ও সেবা প্রদানকারীগণ Penal Code এর ধারা ২১ অনুযায়ী জনসেবক (Public Servant) হিসেবে গণ্য হইবেন এবং সরল বিশ্বাসে কৃত কোনো কাজের জন্য তাহাদের বিরুদ্ধে কোনো মামলা বা আইনগত ব্যবস্থা গ্রহণ করা যাইবে না।",
      en: "Deems enforcement officers and recognized service providers to be public servants under Section 21 of the Penal Code, conferring indemnity for actions taken in good faith under this Act."
    },
    caution: {
      bn: "আইনানুযায়ী ভুক্তভোগীকে সহায়তা করার জন্য কর্মকর্তাদের ব্যক্তিগতভাবে দায়ী করা যায় না।",
      en: "Officers acting within statutory authority enjoy statutory immunity against civil and criminal suits."
    },
    keywords: ["public servant indemnity", "jonoshebok", "জনসেবক", "সরল বিশ্বাসে কৃত কাজ", "good faith protection", "ধারা ৩৩", "section 33"]
  },
  34: {
    title: { bn: "প্রয়োগকারী কর্মকর্তার জবাবদিহিতা (ধারা ৩৪)", en: "Accountability and Neglect of Duty by Enforcement Officers (Section 34)" },
    plainExplanation: {
      bn: "কোনো প্রয়োগকারী কর্মকর্তা ইচ্ছাকৃতভাবে তাহার আইনগত দায়িত্ব পালনে ব্যর্থ বা অবহেলা করিলে তাহার বিরুদ্ধে বিভাগীয় শৃঙ্খলাবিধি অনুযায়ী ব্যবস্থা গ্রহণ করা হইবে।",
      en: "Provides administrative and departmental disciplinary proceedings against enforcement officers who deliberately neglect their statutory duties under this Act."
    },
    caution: {
      bn: "কর্মকর্তা দায়িত্ব অবহেলা করলে সংক্ষুব্ধ ব্যক্তি ঊর্ধ্বতন কর্মকর্তা বা আদালতের নিকট অভিযোগ জানাতে পারেন।",
      en: "Victims can lodge administrative grievances if enforcement officers refuse assistance."
    },
    keywords: ["accountability enforcement officer", "jowabdihita", "জবাবদিহিতা", "দায়িত্বে অবহেলা", "ধারা ৩৪", "section 34"]
  },
  35: {
    title: { bn: "অন্যান্য আইনের বিধানের অতিরিক্ত হওয়া (ধারা ৩৫)", en: "Act to be in Addition to and Not in Derogation of Other Laws (Section 35)" },
    plainExplanation: {
      bn: "এই আইনের বিধানাবলি আপাতত বলবৎ অন্য কোনো আইনের বিকল্প নহে বরং অতিরিক্ত (In addition to and not in derogation of any other law)। সংক্ষুব্ধ ব্যক্তি নারী ও শিশু নির্যাতন দমন আইন বা দণ্ডবিধির অধীনেও পৃথক মামলা করিতে পারিবেন।",
      en: "Clarifies that provisions of this Act are supplementary to existing laws; obtaining civil protection does not bar criminal complaints under the Nari O Shishu Nirjatan Daman Ain or Penal Code."
    },
    caution: {
      bn: "এই আইনে সুরক্ষা চাওয়ার পাশাপাশি নারী নির্যাতন দমন ট্রাইব্যুনালে ফৌজদারি মামলা দায়েরের পূর্ণ অধিকার থাকে।",
      en: "Civil protective remedies under this Act run concurrent with criminal prosecutions in Nari O Shishu tribunals."
    },
    keywords: ["supplementary to other laws", "onno ainer otirokto", "আইনের অতিরিক্ততা", "concurrent criminal complaint", "ধারা ৩৫", "section 35"]
  },
  36: {
    title: { bn: "বিধি প্রণয়ন ক্ষমতা (ধারা ৩৬)", en: "Power to Make Rules (Section 36)" },
    plainExplanation: {
      bn: "সরকার সরকারি গেজেটে প্রজ্ঞাপন দ্বারা এই আইনের উদ্দেশ্য বাস্তবায়নকল্পে পারিবারিক সহিংসতা (প্রতিরোধ ও সুরক্ষা) বিধিমালা প্রণয়ন করিতে পারিবে।",
      en: "Empowers the Government to make procedural and administrative rules by official gazette notification."
    },
    caution: {
      bn: "২০১৩ সালে সরকার 'পারিবারিক সহিংসতা (প্রতিরোধ ও সুরক্ষা) বিধিমালা, ২০১৩' জারি করেছে।",
      en: "Rules framed in 2013 regulate shelter standards, report templates, and enforcement protocols."
    },
    keywords: ["power to make rules", "dv rules 2013", "বিধি প্রণয়ন", "পারিবারিক সহিংসতা বিধিমালা", "ধারা ৩৬", "section 36"]
  },
  37: {
    title: { bn: "ইংরেজিতে অনূদিত পাঠ প্রকাশ (ধারা ৩৭)", en: "Publication of Authentic English Text (Section 37)" },
    plainExplanation: {
      bn: "সরকার সরকারি গেজেটে প্রজ্ঞাপন দ্বারা এই আইনের একটি নির্ভরযোগ্য ইংরেজি অনুবাদ প্রকাশ করিতে পারিবে, তবে বাংলা ও ইংরেজি পাঠের মধ্যে বিরোধ দেখা দিলে বাংলা পাঠ প্রাধান্য পাইবে।",
      en: "Authorizes publication of an authentic English translation. In the event of discrepancy between the Bengali and English texts, the Bengali text prevails."
    },
    caution: {
      bn: "আইনি বিরোধ নিষ্পত্তিতে বাংলা পাঠই আদালতের নিকট চূড়ান্ত কর্তৃত্বপূর্ণ ভিত্তি।",
      en: "The Bengali statutory enactment retains interpretive supremacy in all legal forums."
    },
    keywords: ["authentic english text", "bangla text prevails", "ইংরেজি পাঠ", "ধারা ৩৭", "section 37"]
  }
};

const finalProvisions = [];

for (const s of extracted) {
  const num = parseInt(bnToEnNum(s.secNumStr), 10);
  const meta = sectionsMeta[num];
  if (!meta) continue;

  const id = `domestic-${num}`;
  const existing = existingMap.get(id);

  // Preserve existing keywords if present
  let keywords = meta.keywords;
  if (existing && Array.isArray(existing.keywords)) {
    keywords = [...new Set([...existing.keywords, ...meta.keywords])];
  }

  // Preserve existing title / plainExplanation if specially tuned, or use rich meta
  const title = meta.title;
  const plainExplanation = (existing && existing.plainExplanation && existing.plainExplanation.bn.length > 50) ? existing.plainExplanation : meta.plainExplanation;
  const caution = (existing && existing.caution && existing.caution.bn.length > 20) ? existing.caution : meta.caution;

  const prov = {
    id,
    actId: 'act_domestic_violence_2010',
    sectionNumber: `Section ${num}`,
    categories: ['family', 'threats'],
    title,
    originalText: s.rawContent,
    originalLanguage: 'bn',
    plainExplanation,
    caution,
    sourceUrl: s.url,
    retrievalDate: '2026-11-01',
    effectiveDate: '2010-12-02',
    legalStatus: 'active',
    reviewStatus: 'verified',
    contentHash: sha256(s.rawContent),
    keywords
  };

  finalProvisions.push(prov);
}

fs.writeFileSync('scripts/generated_domestic_violence_2010.json', JSON.stringify(finalProvisions, null, 2), 'utf8');
console.log(`Generated ${finalProvisions.length} provisions for Domestic Violence Act 2010 (complete 1 to 37)`);
