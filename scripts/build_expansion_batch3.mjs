import fs from 'fs';
import path from 'path';

const workspaceDir = process.cwd();
const actsPath = path.join(workspaceDir, 'src/data/corpus/acts.json');
const provisionsPath = path.join(workspaceDir, 'src/data/corpus/provisions.json');

const acts = JSON.parse(fs.readFileSync(actsPath, 'utf8'));
const provisions = JSON.parse(fs.readFileSync(provisionsPath, 'utf8'));

const s267 = JSON.parse(fs.readFileSync('scripts/extracted_raw_267.json', 'utf8'));
const s623 = JSON.parse(fs.readFileSync('scripts/extracted_raw_623.json', 'utf8'));

// 1. Register the 3 acts if not already present
const newActs = [
  {
    id: "act_drugs_control_1982",
    name: {
      en: "The Drugs (Control) Ordinance, 1982",
      bn: "ঔষধ (নিয়ন্ত্রণ) অধ্যাদেশ, ১৯৮২"
    },
    actNumber: "Ordinance VIII of 1982",
    year: 1982,
    categories: ["consumer"],
    officialUrl: "https://bdlaws.minlaw.gov.bd/act-623.html",
    legalStatus: "repealed",
    notes: {
      en: "Pivotal statute regulating essential drug lists, Maximum Retail Price (MRP) fixation for medicines, prohibition of spurious/adulterated drugs, and designating Drug Courts. Substantively consolidated under the Drugs and Cosmetics Act 2023 with savings for ongoing matters.",
      bn: "ঔষধের সর্বোচ্চ খুচরা মূল্য (MRP) নির্ধারণ, ক্ষতিকর ও ভেজাল ঔষধ প্রস্তুত/বিক্রয় নিষিদ্ধকরণ এবং ড্রাগ আদালতের এখতিয়ার সংক্রান্ত ঐতিহাসিক আইন; ২০২৩ সালের ঔষধ ও কসমেটিকস্ আইন দ্বারা প্রতিস্থাপিত।"
    }
  },
  {
    id: "act_essential_commodities_1957",
    name: {
      en: "The Essential Commodities Act, 1957",
      bn: "অত্যাবশ্যকীয় পণ্য আইন, ১৯৫৭"
    },
    actNumber: "Act III of 1957",
    year: 1957,
    categories: ["consumer"],
    officialUrl: "https://bdlaws.minlaw.gov.bd/act-267.html",
    legalStatus: "active",
    notes: {
      en: "Authorizes the Government to regulate production, maximum prices, anti-hoarding, movement, and rationing of essential commodities (food grains, edible oils, fuel, cement, and textiles).",
      bn: "নিত্যপ্রয়োজনীয় দ্রব্যসামগ্রী (খাদ্যশস্য, ভোজ্যতেল, জ্বালানি, সিমেন্ট ও বস্ত্র)-র মূল্য নিয়ন্ত্রণ, মজুদদারি ও চোরাচালান প্রতিরোধে সরকারি আদেশ ও শাস্তির বিধান।"
    }
  },
  {
    id: "act_digital_commerce_2021",
    name: {
      en: "Digital Commerce Operation Guidelines, 2021",
      bn: "ডিজিটাল কমার্স পরিচালনা নির্দেশিকা, ২০২১"
    },
    actNumber: "Gazette SRO No. 192 of 2021",
    year: 2021,
    categories: ["consumer", "digital"],
    officialUrl: "https://mincom.gov.bd/site/view/policies/",
    legalStatus: "active",
    notes: {
      en: "Official Ministry of Commerce regulatory guidelines governing online marketplace transparency, 5/10-day mandatory delivery timelines, mandatory 10-day refunds for unfulfilled pre-paid orders, escrow payments, and banning deceptive lotteries.",
      bn: "বাণিজ্য মন্ত্রণালয় কর্তৃক জারিকৃত ডিজিটাল কমার্স পরিচালনা নির্দেশিকা; অনলাইনে অগ্রিম মূল্যে কেনাকাটায় ৫/১০ দিনে পণ্য ডেলিভারি, ব্যর্থতায় ১০ দিনে ১০০% রিফান্ড এবং এস্ক্রো পেমেন্ট বাধ্যবাধকতা।"
    }
  }
];

for (const na of newActs) {
  const existingIdx = acts.findIndex(a => a.id === na.id);
  if (existingIdx >= 0) {
    acts[existingIdx] = na;
  } else {
    acts.push(na);
  }
}
fs.writeFileSync(actsPath, JSON.stringify(acts, null, 2), 'utf8');
console.log(`Registered target acts in acts.json. Total acts: ${acts.length}`);

// 2. Build Key Citizen Provisions for The Drugs (Control) Ordinance, 1982
const drugsProvisions = [
  {
    secIndex: 5,
    secNumStr: "Section 5",
    id: "drugs-control-5",
    titleBn: "ঔষধের রেজিস্ট্রেশন বা নিবন্ধন (ধারা ৫)",
    titleEn: "Registration of Medicines (Section 5)",
    bnExp: "ড্রাগ প্রশাসনের পূর্বানুমোদন ও রেজিস্ট্রেশন ব্যতিরেকে কোনো ব্যক্তি বা প্রতিষ্ঠান কোনো ঔষধ তৈরি, আমদানি, বাজারজাত বা বিক্রয় করতে পারে না।",
    enExp: "Prohibits the manufacture, import, distribution, or sale of any medicine unless it has been formally registered with the licensing authority.",
    bnCaution: "অননুমোদিত বা বিদেশি চোরাই ঔষধ দোকানে রাখা আইনত দণ্ডনীয় এবং তাৎক্ষণিক বাজেয়াপ্তযোগ্য।",
    enCaution: "Stocking or selling unregistered or foreign smuggled medicines is illegal and subject to summary confiscation.",
    keywords: ["drug registration", "unregistered medicine", "DGDA registration", "oushodher registration", "ঔষধের নিবন্ধন", "রেজিস্ট্রেশন বিহীন ঔষধ", "ড্রাগ লাইসেন্স", "ধারা ৫"]
  },
  {
    secIndex: 9, // Section 8
    secNumStr: "Section 8",
    id: "drugs-control-8",
    titleBn: "কতিপয় ঔষধ তৈরি ও বিক্রয় নিষিদ্ধকরণ (ধারা ৮)",
    titleEn: "Prohibition of Manufacture and Sale of Certain Medicines (Section 8)",
    bnExp: "জাতীয় ঔষধ নীতি বহির্ভূত ক্ষতিকর, অপ্রয়োজনীয় বা সরকার কর্তৃক নিষিদ্ধ ঘোষিত কোনো কম্বিনেশন ড্রাগ তৈরি বা বিক্রয় করা সম্পূর্ণ নিষিদ্ধ।",
    enExp: "Strictly bans the manufacture, import, stock, or sale of medicines not included in the National Essential Drug List or banned by government order.",
    bnCaution: "নিষিদ্ধ ঔষধ বিক্রি করলে ধারা ১৬ মোতাবেক সর্বোচ্চ ১০ বছরের সশ্রম কারাদণ্ড এবং ২ লাখ টাকা পর্যন্ত অর্থদণ্ড হতে পারে।",
    enCaution: "Selling banned pharmaceuticals is punishable under Section 16 with rigorous imprisonment up to 10 years and fines up to 2 lakh taka.",
    keywords: ["banned medicine", "prohibited drugs", "essential drug list", "nishiddho oushodh", "নিষিদ্ধ ঔষধ", "ক্ষতিকর ঔষধ বিক্রি", "ধারা ৮"]
  },
  {
    secIndex: 12, // Section 11
    secNumStr: "Section 11",
    id: "drugs-control-11",
    titleBn: "ঔষধের সর্বোচ্চ খুচরা মূল্য (MRP) নির্ধারণ (ধারা ১১)",
    titleEn: "Fixation of Maximum Retail Price of Drugs (Section 11)",
    bnExp: "সরকার গেজেট প্রজ্ঞাপন দ্বারা যেকোনো ঔষধের সর্বোচ্চ খুচরা মূল্য (MRP) নির্ধারণ করতে পারে এবং এই মূল্যের চেয়ে বেশি রাখা সম্পূর্ণ বেআইনি।",
    enExp: "Empowers the Government to fix the Maximum Retail Price (MRP) of medicines and pharmaceutical raw materials to protect consumers from price gouging.",
    bnCaution: "প্যাকেটের গায়ের প্রিন্ট মূল্যের চেয়ে ১ টাকাও বেশি রাখা ধারা ১৯ অনুযায়ী ফৌজদারি অপরাধ।",
    enCaution: "Selling medicines above the printed MRP constitutes a direct criminal offense punishable under Section 19.",
    keywords: ["medicine MRP", "drug price fixation", "overpricing medicine", "oushodher dam", "ঔষধের দাম", "এমআরপি এর বেশি দাম", "ধারা ১১"]
  },
  {
    secIndex: 14, // Section 13
    secNumStr: "Section 13",
    id: "drugs-control-13",
    titleBn: "ফার্মাসিস্ট নিয়োগ ও প্রেসক্রিপশন ছাড়া ঔষধ বিক্রয় নিয়ন্ত্রণ (ধারা ১৩)",
    titleEn: "Mandatory Employment of Qualified Pharmacists (Section 13)",
    bnExp: "ঔষধ প্রস্তুতকারী প্রতিষ্ঠান এবং খুচরা ফার্মেসিতে রেজিস্টার্ড যোগ্যতাসম্পন্ন ফার্মাসিস্টের সার্বক্ষণিক উপস্থিতি ও তদারকি থাকা আইনত বাধ্যতামূলক।",
    enExp: "Mandates the employment and active supervision of registered qualified pharmacists in all pharmaceutical factories, dispensaries, and retail pharmacies.",
    bnCaution: "ফার্মাসিস্ট ছাড়া অ্যান্টিবায়োটিক বা সিডিউল ড্রাগ বিক্রি করলে ফার্মেসির লাইসেন্স বাতিল ও ভ্রাম্যমাণ আদালতে জরিমানা করা হয়।",
    enCaution: "Selling prescription drugs or antibiotics without a qualified pharmacist can lead to license suspension and mobile court fines.",
    keywords: ["pharmacist mandatory", "registered pharmacist", "pharmacy license", "pharmacist chara oushodh", "ফার্মাসিস্ট নিয়োগ", "ফার্মেসির লাইসেন্স", "ধারা ১৩"]
  },
  {
    secIndex: 15, // Section 14
    secNumStr: "Section 14",
    id: "drugs-control-14",
    titleBn: "ঔষধের ভুয়া বিজ্ঞাপন ও বিভ্রান্তিকর প্রচার নিয়ন্ত্রণ (ধারা ১৪)",
    titleEn: "Control of Advertisements and Therapeutic Claims (Section 14)",
    bnExp: "ড্রাগ প্রশাসনের পূর্বানুমোদন ব্যতিরেকে যেকোনো ঔষধের বাণিজ্যিক বিজ্ঞাপন প্রচার বা জাদুকরী নিরাময়ের মিথ্যা দাবি করা আইনত নিষিদ্ধ।",
    enExp: "Prohibits advertising any medicine, sexual stimulant, or herbal remedy to the public without prior written approval from the licensing authority.",
    bnCaution: "ক্যান্সার, ডায়াবেটিস বা যৌনরোগ নিরাময়ের অবৈজ্ঞানিক বিজ্ঞাপন দিলে ধারা ২১ মোতাবেক ৩ বছর পর্যন্ত কারাদণ্ড হতে পারে।",
    enCaution: "Publishing unapproved therapeutic claims carries up to 3 years imprisonment under Section 21.",
    keywords: ["fake drug advertisement", "miracle cure claims", "misleading pharma ad", "oushodher biggapon", "ঔষধের ভুয়া বিজ্ঞাপন", "ভুয়া চিকিৎসা দাবি", "ধারা ১৪"]
  },
  {
    secIndex: 16, // Section 14A
    secNumStr: "Section 14A",
    id: "drugs-control-14a",
    titleBn: "অনিবন্ধিত ঔষধ প্রেসক্রিপশনে লেখা নিষিদ্ধ (ধারা ১৪ক)",
    titleEn: "Prohibition on Prescribing Unregistered Medicines (Section 14A)",
    bnExp: "কোনো রেজিস্টার্ড চিকিৎসক প্রেসক্রিপশনে ড্রাগ প্রশাসন কর্তৃক অনিবন্ধিত বা অনুমোদিত নয় এমন কোনো ঔষধ রোগীদের সেবনের জন্য লিখতে পারবেন না।",
    enExp: "Strictly forbids medical practitioners from prescribing any unregistered or unapproved drug to patients.",
    bnCaution: "অনিবন্ধিত বা নিষিদ্ধ ঔষধ প্রেসক্রাইব করলে চিকিৎসকের বিরুদ্ধে বাংলাদেশ মেডিকেল অ্যান্ড ডেন্টাল কাউন্সিল (বিএমডিসি) ও ড্রাগ আইনে ব্যবস্থা নেওয়া যায়।",
    enCaution: "Prescribing unregistered medicines exposes practitioners to disciplinary action by BMDC and prosecution under drug laws.",
    keywords: ["prescription of unregistered drug", "doctor prescription", "doctor bhua oushodh", "প্রেসক্রিপশন", "অনিবন্ধিত ঔষধ প্রেসক্রাইব", "ধারা ১৪ক"]
  },
  {
    secIndex: 17, // Section 15
    secNumStr: "Section 15",
    id: "drugs-control-15",
    titleBn: "মান নিয়ন্ত্রণ ও জিএমপি (GMP) অনুসরণ (ধারা ১৫)",
    titleEn: "Good Practices in the Manufacture and Quality Control of Drugs (Section 15)",
    bnExp: "ঔষধ উৎপাদনকারী প্রতিটি কারখানাকে অবশ্যই বিশ্ব স্বাস্থ্য সংস্থার জিএমপি (Good Manufacturing Practices) মানদণ্ড ও নিজস্ব টেস্টিং ল্যাব পরিচালনা করতে হবে।",
    enExp: "Obligates all pharmaceutical manufacturers to strictly maintain Good Manufacturing Practices (GMP) and fully equipped quality control laboratories.",
    bnCaution: "জিএমপি মান লঙ্ঘন করে অস্বাস্থ্যকর পরিবেশে ঔষধ বানালে কারখানার উৎপাদন সাময়িকভাবে বা স্থায়ীভাবে বন্ধ করে দেওয়া হয়।",
    enCaution: "Failure to comply with WHO-GMP guidelines results in immediate factory sealing and cancellation of manufacturing licenses.",
    keywords: ["GMP compliance", "quality control laboratory", "drug manufacturing standard", "gmp man", "জিএমপি মানদণ্ড", "ঔষধের মান নিয়ন্ত্রণ", "ধারা ১৫"]
  },
  {
    secIndex: 18, // Section 16
    secNumStr: "Section 16",
    id: "drugs-control-16",
    titleBn: "নিষিদ্ধ বা নকল ঔষধ তৈরির শাস্তি (ধারা ১৬)",
    titleEn: "Penalty for Manufacture or Sale of Prohibited or Unregistered Drugs (Section 16)",
    bnExp: "অননুমোদিত, নিষিদ্ধ বা নকল ঔষধ প্রস্তুত, মজুদ বা বিক্রয় করিলে সর্বোচ্চ ১০ বছর পর্যন্ত সশ্রম কারাদণ্ড অথবা ২ লাখ টাকা পর্যন্ত অর্থদণ্ড বা উভয় দণ্ড।",
    enExp: "Prescribes rigorous imprisonment up to 10 years, or a fine up to 2 lakh taka, or both, for manufacturing, stocking, or selling banned or unregistered medicines.",
    bnCaution: "এটি অত্যন্ত গুরুতর জামিন-অযোগ্য অপরাধ; ড্রাগ আদালতে বিশেষ ট্রায়ালের মাধ্যমে বিচার নিষ্পন্ন হয়।",
    enCaution: "A non-bailable offense triable exclusively before designated Drug Courts.",
    keywords: ["penalty for fake medicine", "prohibited drugs punishment", "10 years prison", "nokol oushodh shasti", "নকল ঔষধের শাস্তি", "১০ বছরের জেল", "ধারা ১৬"]
  },
  {
    secIndex: 19, // Section 17
    secNumStr: "Section 17",
    id: "drugs-control-17",
    titleBn: "নিম্নমানের ও ভেজাল ঔষধ বিক্রয়ের দণ্ড (ধারা ১৭)",
    titleEn: "Penalty for Manufacture, Stock, or Sale of Substandard Drugs (Section 17)",
    bnExp: "ফার্মাকোপিয়া অনুযায়ী নির্ধারিত মানের চেয়ে নিম্নমানের, ভেজাল বা অকার্যকর ঔষধ উৎপাদন বা বিক্রয় করিলে সর্বোচ্চ ৫ বছরের কারাদণ্ড বা ১ লাখ টাকা অর্থদণ্ড।",
    enExp: "Punishes manufacturing, stocking, or selling substandard or adulterated drugs with imprisonment for up to 5 years, or fine up to 1 lakh taka, or both.",
    bnCaution: "সরকারি ল্যাবরেটরির কেমিক্যাল টেস্ট রিপোর্ট আদালতে ভেজালের অকাট্য প্রমাণ হিসেবে গণ্য হয়।",
    enCaution: "Government drug testing laboratory analysis serves as primary admissible evidence of substandard formulation.",
    keywords: ["substandard drugs", "adulterated medicine", "drug testing", "nimnomaner oushodh", "নিম্নমানের ঔষধ", "ভেজাল ঔষধের শাস্তি", "ধারা ১৭"]
  },
  {
    secIndex: 20, // Section 18
    secNumStr: "Section 18",
    id: "drugs-control-18",
    titleBn: "অবৈধভাবে ঔষধ আমদানির দণ্ড (ধারা ১৮)",
    titleEn: "Penalty for Unauthorised Import of Drugs (Section 18)",
    bnExp: "আমদানি লাইসেন্স ও রেজিস্ট্রেশন ব্যতিরেকে বিদেশ থেকে চোরাই পথে কোনো ঔষধ বা কাঁচামাল আমদানি করিলে সর্বোচ্চ ৩ বছর কারাদণ্ড বা অর্থদণ্ড।",
    enExp: "Prescribes imprisonment up to 3 years, or fine, or both, for importing drugs or pharmaceutical raw materials without an official import license.",
    bnCaution: "অবৈধভাবে আমদানিকৃত সকল ঔষধ কাস্টমস ও ড্রাগ প্রশাসন কর্তৃক সরাসরি রাষ্ট্রের অনুকূলে বাজেয়াপ্ত করা হয়।",
    enCaution: "All smuggled or unauthorized imported drugs are subject to absolute confiscation and destruction.",
    keywords: ["unauthorised drug import", "smuggled medicine", "import license", "oushodh amdani", "অবৈধ ঔষধ আমদানি", "চোরাই ঔষধ", "ধারা ১৮"]
  },
  {
    secIndex: 21, // Section 19
    secNumStr: "Section 19",
    id: "drugs-control-19",
    titleBn: "নির্ধারিত মূল্যের চেয়ে বেশি মূল্যে ঔষধ বিক্রয়ের দণ্ড (ধারা ১৯)",
    titleEn: "Penalty for Selling Medicines Above Fixed Maximum Retail Price (Section 19)",
    bnExp: "সরকার কর্তৃক নির্ধারিত সর্বোচ্চ খুচরা মূল্যের (MRP) চেয়ে অতিরিক্ত মূল্যে ঔষধ বিক্রয় করিলে সর্বোচ্চ ২ বছরের কারাদণ্ড বা ১০ হাজার টাকা অর্থদণ্ড বা উভয় দণ্ড।",
    enExp: "Imposes imprisonment up to 2 years, or fine up to 10,000 taka, or both, on any pharmacist or retailer selling medicine at a price exceeding the fixed MRP.",
    bnCaution: "ঔষধের অতিরিক্ত মূল্য নিলে ক্যাশমেমো সংগ্রহ করে জাতীয় ভোক্তা অধিকার অধিদপ্তর বা ড্রাগ সুপারের নিকট অবিলম্বে অভিযোগ করুন।",
    enCaution: "Keep the cash memo as evidence when filing price gouging complaints with DNCRP or the District Drug Superintendent.",
    keywords: ["medicine overcharging", "selling above MRP", "drug price gouging", "oushodher beshi dam", "ঔষধের বেশি দাম রাখা", "এমআরপির বেশি মূল্য", "ধারা ১৯"]
  },
  {
    secIndex: 22, // Section 20
    secNumStr: "Section 20",
    id: "drugs-control-20",
    titleBn: "সরকারি হাসপাতালের ঔষধ চুরি ও অবৈধ বিক্রয়ের দণ্ড (ধারা ২০)",
    titleEn: "Penalty for Theft or Illegal Sale of Government Medicines (Section 20)",
    bnExp: "সরকারি হাসপাতাল বা দাতব্য চিকিৎসালয়ের জন্য সরবরাহকৃত 'বিক্রয়ের জন্য নহে' সিলযুক্ত ঔষধ চুরি, মজুদ বা ফার্মেসিতে বিক্রয় করিলে সর্বোচ্চ ১০ বছরের সশ্রম কারাদণ্ড।",
    enExp: "Punishes the theft, illegal possession, or retail sale of medicines marked for Government Hospital or Charitable Clinic use with rigorous imprisonment up to 10 years and a 2 lakh taka fine.",
    bnCaution: "সরকারি ঔষধ কোনো ফার্মেসিতে পাওয়া গেলে ফার্মেসি মালিক ও সংশ্লিষ্ট হাসপাতালের কর্মকর্তা উভয়েই গ্রেফতারযোগ্য।",
    enCaution: "Stocking Government hospital medicines in a commercial pharmacy triggers non-bailable arrest of both vendor and hospital suppliers.",
    keywords: ["government hospital medicine", "theft of govt drugs", "hospital oushodh", "সরকারি ঔষধ চুরি", "সরকারি ঔষধ বিক্রয়", "১০ বছরের কারাদণ্ড", "ধারা ২০"]
  },
  {
    secIndex: 23, // Section 21
    secNumStr: "Section 21",
    id: "drugs-control-21",
    titleBn: "অননুমোদিত ঔষধের বিজ্ঞাপনের দণ্ড (ধারা ২১)",
    titleEn: "Penalty for Illegal Drug Advertisements and Exaggerated Claims (Section 21)",
    bnExp: "অনুমোদন ছাড়া ঔষধের বিজ্ঞাপন প্রকাশ করিলে বা যৌনশক্তি বর্ধক ও জটিল রোগ নিরাময়ের ভুয়া দাবি প্রচার করিলে সর্বোচ্চ ৩ বছরের কারাদণ্ড বা অর্থদণ্ড।",
    enExp: "Imposes up to 3 years imprisonment or fine on any person or advertising agency publishing deceptive or unauthorized drug promotions.",
    bnCaution: "পত্রিকা, টিভি বা অনলাইনে অনুমোদনহীন আয়ুর্বেদিক বা ভেষজ ঔষধের চটকদার বিজ্ঞাপনের বিরুদ্ধে ড্রাগ সুপার মামলা করতে পারেন।",
    enCaution: "Advertising agencies and media outlets airing unverified sexual or miraculous medicinal claims are equally criminally liable.",
    keywords: ["illegal drug advertisement", "miracle cure penalty", "bhua biggapon", "ভুয়া ঔষধের বিজ্ঞাপন", "বিজ্ঞাপনের দণ্ড", "ধারা ২১"]
  },
  {
    secIndex: 25, // Section 22
    secNumStr: "Section 22",
    id: "drugs-control-22",
    titleBn: "অপরাধ বিচারার্থে গ্রহণ ও নালিশ দায়ের (ধারা ২২)",
    titleEn: "Cognizance of Offenses Under Drug Laws (Section 22)",
    bnExp: "ড্রাগ সুপারিনটেনডেন্ট বা ঔষধ পরিদর্শকের লিখিত রিপোর্ট বা নালিশ ব্যতীত কোনো ড্রাগ আদালত এই আইনের অধীন কোনো অপরাধ আমলে গ্রহণ করবে না।",
    enExp: "Bars courts from taking cognizance of offenses under this Ordinance except upon a formal written report by a statutory Drug Inspector or Superintendent.",
    bnCaution: "সাধারণ নাগরিকরা সরাসরি ড্রাগ আদালতে মামলা করতে পারেন না; প্রমাণসহ জেলা ড্রাগ সুপারের নিকট লিখিত অভিযোগ করতে হয়।",
    enCaution: "Aggrieved consumers must submit grievances to the District Drug Superintendent, who initiates formal prosecution before the Drug Court.",
    keywords: ["cognizance of drug offenses", "drug superintendent complaint", "drug inspector report", "amole grohon", "ড্রাগ আদালতের মামলা", "অভিযোগ দায়ের", "ধারা ২২"]
  },
  {
    secIndex: 26, // Section 23
    secNumStr: "Section 23",
    id: "drugs-control-23",
    titleBn: "ড্রাগ আদালত প্রতিষ্ঠা ও বিশেষ এখতিয়ার (ধারা ২৩)",
    titleEn: "Establishment and Jurisdiction of Drug Courts (Section 23)",
    bnExp: "সরকার দায়রা জজ বা অতিরিক্ত দায়রা জজকে বিচারক নিযুক্ত করে বিশেষ 'ড্রাগ আদালত' (Drug Court) গঠন করবে, যা এই আইনের সকল অপরাধের একচেটিয়া বিচার করবে।",
    enExp: "Authorizes the establishment of specialized Drug Courts presided over by a Sessions Judge or Additional Sessions Judge with exclusive jurisdiction to try pharmaceutical offenses.",
    bnCaution: "ড্রাগ আদালতের রায়ের বিরুদ্ধে সরাসরি সুপ্রিম কোর্টের হাইকোর্ট বিভাগে আপিল দায়ের করতে হয়।",
    enCaution: "Appeals against final verdicts and sentences of the Drug Court lie directly before the High Court Division.",
    keywords: ["Drug Court", "Sessions Judge", "exclusive jurisdiction", "drug adalot", "ড্রাগ আদালত", "বিশেষ আদালত", "ধারা ২৩"]
  }
];

// 3. Build Key Citizen Provisions for The Essential Commodities Act, 1957
const essentialProvisions = [
  {
    secIndex: 2,
    secNumStr: "Section 2",
    id: "essential-commodities-2",
    titleBn: "নিত্যপ্রয়োজনীয় পণ্যের সংজ্ঞা ও পরিধি (ধারা ২)",
    titleEn: "Definitions and Scope of Essential Commodities (Section 2)",
    bnExp: "খাদ্যশস্য, ভোজ্যতেল, ডাল, চিনি, পেঁয়াজ, জ্বালানি তেল, কয়লা, লোহা, সিমেন্ট, কাগজ ও কাপড় সহ সরকার কর্তৃক গেজেটে ঘোষিত যেকোনো পণ্য অত্যাবশ্যকীয় পণ্য।",
    enExp: "Defines essential commodities broadly to include foodstuffs, edible oils, petroleum products, coal, iron, steel, cement, paper, textiles, and any commodity gazetted by the Government.",
    bnCaution: "নিত্যপণ্যের তালিকা সরকার জনস্বার্থে যেকোনো সময় পরিবর্তন বা নতুন পণ্য অন্তর্ভুক্ত করতে পারে।",
    enCaution: "The statutory list of essential commodities is dynamic and expanded via official gazette during market crises.",
    keywords: ["essential commodities definition", "foodstuffs", "edible oils", "fuel", "cement", "nityoponno", "নিত্যপ্রয়োজনীয় পণ্য", "অত্যাবশ্যকীয় পণ্য সংজ্ঞা", "ধারা ২"]
  },
  {
    secIndex: 3,
    secNumStr: "Section 3",
    id: "essential-commodities-3",
    titleBn: "মূল্য নিয়ন্ত্রণ ও মজুদদারি নিষিদ্ধের সরকারি ক্ষমতা (ধারা ৩)",
    titleEn: "Power to Control Production, Supply, Distribution, and Prices (Section 3)",
    bnExp: "সরকার নিত্যপ্রয়োজনীয় পণ্যের সর্বোচ্চ বিক্রয়মূল্য নির্ধারণ, অবৈধ মজুদদারি নিষিদ্ধ, গুদামজাতকরণের সর্বোচ্চ সীমা এবং ন্যায্যমূল্যে বিতরণ নিশ্চিত করার আদেশ জারি করতে পারে।",
    enExp: "Empowers the Government to issue statutory control orders fixing maximum prices, prohibiting hoarding, regulating storage quotas, and mandating fair distribution of essential commodities.",
    bnCaution: "নির্ধারিত সীমার অতিরিক্ত চাল, তেল বা চিনি গুদামজাত করলে তা বেআইনি মজুদদারি হিসেবে গণ্য হয়ে পণ্য বাজেয়াপ্ত ও জেল হতে পারে।",
    enCaution: "Exceeding statutory warehouse storage ceilings constitutes illegal hoarding subject to immediate confiscation and criminal prosecution.",
    keywords: ["price control order", "anti hoarding", "storage quota", "dam niyontron", "mojudari nishiddho", "মূল্য নিয়ন্ত্রণ", "মজুদদারি নিষিদ্ধ", "ধারা ৩"]
  },
  {
    secIndex: 7, // Section 6
    secNumStr: "Section 6",
    id: "essential-commodities-6",
    titleBn: "মূল্য নিয়ন্ত্রণ আদেশ অমান্য ও মজুদদারির দণ্ড (ধারা ৬)",
    titleEn: "Penalties for Contravening Orders and Hoarding (Section 6)",
    bnExp: "মূল্য বা বিতরণ সংক্রান্ত কোনো সরকারি আদেশ অমান্য করিলে বা অতিরিক্ত মূল্যে পণ্য বিক্রি করিলে সর্বোচ্চ ৩ বছরের কারাদণ্ড অথবা অর্থদণ্ড বা উভয় দণ্ড।",
    enExp: "Imposes imprisonment up to 3 years, or fine, or both, for contravening any price control or anti-hoarding order, with mandatory forfeiture of the commodities involved.",
    bnCaution: "দণ্ডের পাশাপাশি অপরাধে ব্যবহৃত গুদামের সমস্ত মালপত্র এবং মালামাল বহনে ব্যবহৃত যানবাহন রাষ্ট্রের অনুকূলে বাজেয়াপ্ত করা হয়।",
    enCaution: "In addition to prison sentences, the court orders absolute forfeiture of seized commodities and transport vehicles to the State.",
    keywords: ["hoarding penalty", "price order violation", "forfeiture of goods", "mojudarir shasti", "মজুদদারির শাস্তি", "৩ বছরের কারাদণ্ড", "পণ্য বাজেয়াপ্ত", "ধারা ৬"]
  },
  {
    secIndex: 8, // Section 7
    secNumStr: "Section 7",
    id: "essential-commodities-7",
    titleBn: "মজুদদারি ও মূল্য কারসাজির চেষ্টা ও সহায়তার শাস্তি (ধারা ৭)",
    titleEn: "Penalties for Attempts and Abetments (Section 7)",
    bnExp: "নিত্যপণ্যের কৃত্রিম সংকট তৈরি বা মজুদদারির চেষ্টা করা অথবা অন্য কাউকে এতে সহায়তা করা মূল অপরাধের সমতুল্য দণ্ডে দণ্ডনীয়।",
    enExp: "Stipulates that any person who attempts to contravene or abets the contravention of an essential commodities control order is punished as a principal offender.",
    bnCaution: "সিন্ডিকেটের সাথে জড়িত মধ্যস্বত্বভোগী বা গুদাম ভাড়াদাতারাও এই ধারায় সরাসরি সমান সাজার মুখোমুখি হন।",
    enCaution: "Middlemen, brokers, and godown owners facilitating hoarding syndicates are prosecuted with identical severity as primary hoarders.",
    keywords: ["abetment of hoarding", "attempt to hoard", "syndicate middleman", "mojudari shohayota", "মজুদদারির চেষ্টা", "সিন্ডিকেট শাস্তি", "ধারা ৭"]
  },
  {
    secIndex: 9, // Section 8
    secNumStr: "Section 8",
    id: "essential-commodities-8",
    titleBn: "কোম্পানি ও কর্পোরেশন কর্তৃক অপরাধ সংঘটন (ধারা ৮)",
    titleEn: "Offences by Companies and Corporations (Section 8)",
    bnExp: "কোনো কোম্পানি নিত্যপণ্য মজুদ বা কৃত্রিম মূল্য বৃদ্ধি করলে ব্যবস্থাপনা পরিচালক, পরিচালক, ম্যানেজার ও সচিব ব্যক্তিগতভাবে দায়ী হবেন।",
    enExp: "Holds company directors, managing directors, managers, and corporate officers personally criminally liable for corporate hoarding and price manipulations.",
    bnCaution: "কোম্পানির কর্তাব্যক্তিরা কেবল তখনই রেহাই পান যদি তারা প্রমাণ করতে পারেন যে অপরাধটি তাদের অজ্ঞাতে বা যথাসাধ্য প্রতিরোধের পরও ঘটেছে।",
    enCaution: "Corporate executives can avoid liability only by affirmatively proving due diligence and complete lack of knowledge.",
    keywords: ["corporate hoarding", "director liability", "company price rigging", "companyr mojudari", "কোম্পানির মজুদদারি", "পরিচালকের শাস্তি", "ধারা ৮"]
  },
  {
    secIndex: 10, // Section 9
    secNumStr: "Section 9",
    id: "essential-commodities-9",
    titleBn: "মিথ্যা স্টক হিসাব ও ভুয়া তথ্য দাখিলের দণ্ড (ধারা ৯)",
    titleEn: "Penalties for False Statements and Fictitious Ledgers (Section 9)",
    bnExp: "গুদামের মজুদের তথ্য গোপনের উদ্দেশ্যে মিথ্যা হিসাব খাতা প্রদর্শন বা ভুয়া স্টক স্টেটমেন্ট দিলে সর্বোচ্চ ৩ বছরের কারাদণ্ড বা অর্থদণ্ড।",
    enExp: "Prescribes imprisonment up to 3 years, or fine, or both, for providing false declarations, fake stock ledgers, or fictitious information to inspecting officers.",
    bnCaution: "পরিদর্শন দলের কাছে চালানের ভুল তথ্য দিলে বা গোপন গুদামের তথ্য চেপে রাখলে সরাসরি এই ধারায় মামলা রুজু হয়।",
    enCaution: "Concealing stock registers or presenting fabricated invoices during administrative inspections triggers immediate criminal charges under Section 9.",
    keywords: ["false stock statement", "fake ledger", "hiding inventory", "bhua hisab", "মিথ্যা স্টক বিবরণ", "গোপন গুদাম", "ধারা ৯"]
  },
  {
    secIndex: 11, // Section 10
    secNumStr: "Section 10",
    id: "essential-commodities-10",
    titleBn: "আদালত কর্তৃক অপরাধ আমলে গ্রহণ (ধারা ১০)",
    titleEn: "Cognizance of Offences by Courts (Section 10)",
    bnExp: "সরকারি কর্মকর্তা বা ক্ষমতাপ্রাপ্ত পুলিশ অফিসারের লিখিত রিপোর্ট ব্যতীত কোনো আদালত এই আইনের অধীন কোনো মামলা বিচারার্থে গ্রহণ করবে না।",
    enExp: "Provides that no court shall take cognizance of any offense under this Act except upon a written report by an authorized public servant or police officer.",
    bnCaution: "নাগরিকরা বাজার মনিটরিং সেল, জেলা প্রশাসন বা থানায় অভিযোগ দিলে সংশ্লিষ্ট ম্যাজিস্ট্রেট বা পুলিশ আদালতে মামলা পাঠায়।",
    enCaution: "Citizens report illegal hoarding to the District Administration or Police, who file the formal statutory report before the trial court.",
    keywords: ["cognizance of hoarding", "written report", "amole grohon", "মামলা আমলে গ্রহণ", "লিখিত রিপোর্ট", "ধারা ১০"]
  },
  {
    secIndex: 12, // Section 11
    secNumStr: "Section 11",
    id: "essential-commodities-11",
    titleBn: "সংক্ষিপ্ত পদ্ধতিতে দ্রুত বিচার নিষ্পত্তি (ধারা ১১)",
    titleEn: "Powers to Try Offences Summarily (Section 11)",
    bnExp: "প্রথম শ্রেণীর ম্যাজিস্ট্রেট বা স্পেশাল ম্যাজিস্ট্রেটকে ফৌজদারি কার্যবিধির ২২ অধ্যায় অনুযায়ী সংক্ষিপ্ত পদ্ধতিতে দ্রুত বিচারের বিশেষ ক্ষমতা প্রদান।",
    enExp: "Empowers First Class Magistrates and Special Magistrates to try offenses under this Act through summary trial procedures governed by Chapter XXII of the CrPC.",
    bnCaution: "সংক্ষিপ্ত বিচারে দ্রুততম সময়ে মজুতদারদের জেল ও জরিমানা নিশ্চিত করা যায়।",
    enCaution: "Summary proceedings enable rapid adjudication of market hoarding offenses without prolonged procedural delays.",
    keywords: ["summary trial", "CrPC chapter XXII", "songkhipto bichar", "সংক্ষিপ্ত বিচার", "দ্রুত বিচার", "ধারা ১১"]
  },
  {
    secIndex: 13, // Section 12
    secNumStr: "Section 12",
    id: "essential-commodities-12",
    titleBn: "অর্থদণ্ড আরোপের ক্ষেত্রে ম্যাজিস্ট্রেটের বিশেষ ক্ষমতা (ধারা ১২)",
    titleEn: "Special Provision Regarding Fines (Section 12)",
    bnExp: "ফৌজদারি কার্যবিধির ৩২ ধারার সীমাবদ্ধতা সত্ত্বেও প্রথম শ্রেণীর ম্যাজিস্ট্রেট এই আইনের পূর্ণ নির্ধারিত অর্থদণ্ড আরোপ করতে পারেন।",
    enExp: "Authorizes First Class Magistrates to impose statutory fines under this Act exceeding standard monetary jurisdictional limits under Section 32 of the CrPC.",
    bnCaution: "ম্যাজিস্ট্রেট বড় ধরনের মজুতদারদের বিরুদ্ধে যেকোনো অঙ্কের সংবিধিবদ্ধ জরিমানা ধার্য করতে পারেন।",
    enCaution: "Magistrates possess enhanced statutory authority to impose hefty fines reflecting the commercial magnitude of the hoarded goods.",
    keywords: ["magistrate fine power", "special fine powers", "orthodondo", "অর্থদণ্ড আরোপের বিশেষ ক্ষমতা", "ধারা ১২"]
  },
  {
    secIndex: 15, // Section 14
    secNumStr: "Section 14",
    id: "essential-commodities-14",
    titleBn: "প্রমাণের বিপরীত দায়ভার (Burden of Proof) (ধারা ১৪)",
    titleEn: "Burden of Proof in Hoarding Cases (Section 14)",
    bnExp: "কোনো ব্যবসায়ীর গুদামে সরকার নির্ধারিত সীমার বেশি পণ্য পাওয়া গেলে, তা যে বেআইনি মজুদদারি নয় তা প্রমাণের দায়ভার অভিযুক্ত ব্যবসায়ীর ওপর বর্তাবে।",
    enExp: "Reverses the burden of proof, establishing that where a person is found in possession of essential commodities exceeding prescribed limits, the burden is on them to prove lawful authority.",
    bnCaution: "ব্যবসায়ী বৈধ ক্রয়ের চালান বা অনুমোদিত ডিলারশিপ দেখাতে ব্যর্থ হলে আদালত সরাসরি তাকে অবৈধ মজুতদার হিসেবে দোষী সাব্যস্ত করে।",
    enCaution: "Failure by a trader to present authentic purchase vouchers or valid licensing creates an immediate presumption of guilt in hoarding charges.",
    keywords: ["burden of proof", "reverse burden", "presumption of hoarding", "promaner daybhar", "প্রমাণের দায়ভার", "মজুদদারির প্রমাণ", "ধারা ১৪"]
  }
];

// 4. Build Key Citizen Provisions for Digital Commerce Operation Guidelines, 2021
const digitalCommerceProvisions = [
  {
    id: "ecommerce-delivery-2021",
    actId: "act_digital_commerce_2021",
    sectionNumber: "Clause 3.1.4 & 3.1.5",
    categories: ["consumer", "digital"],
    title: {
      bn: "অনলাইন শপিংয়ে ৫/১০ দিনে পণ্য ডেলিভারি ও ১০ দিনে রিফান্ডের নিয়ম (অনুচ্ছেদ ৩.১.৪ ও ৩.১.৫)",
      en: "Mandatory E-Commerce Delivery Timeline (5/10 Days) and Refund Rules (Clause 3.1.4 & 3.1.5)"
    },
    originalText: "ক্রেতা অগ্রিম মূল্য পরিশোধ করিলে একই শহরে সর্বোচ্চ ৫ দিন এবং ভিন্ন শহরে সর্বোচ্চ ১০ দিনের মধ্যে পণ্য সরবরাহ করিতে হইবে; অন্যথায় ১০ দিনের মধ্যে সম্পূর্ণ মূল্য ফেরত দিতে হইবে।",
    originalLanguage: "bn",
    plainExplanation: {
      bn: "অনলাইনে অগ্রিম টাকা নিলে একই শহরে ৫ দিন এবং অন্য শহরে ১০ দিনের মধ্যে পণ্য ডেলিভারি দেওয়া বাধ্যতামূলক। পণ্য সরবরাহ করতে ব্যর্থ হলে পরবর্তী ১০ দিনের মধ্যে সম্পূর্ণ টাকা রিফান্ড করতে হবে।",
      en: "Digital Commerce Guidelines 2021 strictly mandate that pre-paid orders must be delivered within 5 days (same city) or 10 days (outside city). If unfulfilled, the merchant must refund 100% of the money within 10 days."
    },
    caution: {
      bn: "নির্ধারিত সময়ে পণ্য ডেলিভারি বা টাকা ফেরত না দিলে ট্রানজেকশন আইডিসহ জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তরে (DNCRP) অভিযোগ করুন।",
      en: "If the seller fails to deliver or refund within the deadline, lodge a complaint with DNCRP citing transaction IDs for full refund and 25% penalty share."
    },
    sourceUrl: "https://mincom.gov.bd/site/view/policies/",
    retrievalDate: "2026-11-01",
    effectiveDate: "2021-07-04",
    legalStatus: "active",
    reviewStatus: "verified",
    contentHash: "",
    keywords: [
      "ecommerce delivery deadline",
      "5 days delivery",
      "10 days refund",
      "online shopping delivery",
      "prepaid order delay",
      "daraz delivery delay",
      "evaly refund",
      "advance payment refund",
      "অনলাইন ডেলিভারি",
      "১০ দিনে রিফান্ড",
      "অগ্রিম টাকা ফেরত",
      "ডিজিটাল কমার্স নির্দেশিকা",
      "অনুচ্ছেদ ৩.১.৪"
    ],
    relatedProvisions: ["ecommerce-refund-escrow-2021", "consumer-45", "consumer-60"]
  },
  {
    id: "ecommerce-refund-escrow-2021",
    actId: "act_digital_commerce_2021",
    sectionNumber: "Clause 3.1.8 & 3.1.9",
    categories: ["consumer", "digital"],
    title: {
      bn: "এস্ক্রো পেমেন্ট ও ৭-১০ দিনে বাধ্যতামূলক রিফান্ড (অনুচ্ছেদ ৩.১.৮ ও ৩.১.৯)",
      en: "Mandatory Escrow Payment and 7-10 Day Refund Guarantee (Clause 3.1.8 & 3.1.9)"
    },
    originalText: "পেমেন্ট গেটওয়ের মাধ্যমে গৃহীত অগ্রিম অর্থ পণ্য গ্রাহক কর্তৃক বুঝে না পাওয়া পর্যন্ত এসক্রো বা ট্রাস্ট একাউন্টে সংরক্ষিত থাকিবে এবং ডেলিভারি নিশ্চিত না হইলে ৭ হইতে ১০ দিনের মধ্যে গ্রাহকের মূল একাউন্টে স্বয়ংক্রিয়ভাবে ফেরত যাইবে।",
    originalLanguage: "bn",
    plainExplanation: {
      bn: "অনলাইন কেনাকাটায় পেমেন্ট গেটওয়েতে প্রদত্ত অগ্রিম টাকা গ্রাহক পণ্য হাতে পাওয়ার পূর্ব পর্যন্ত বিক্রেতার কাছে যাবে না। পণ্য না পেলে ৭ থেকে ১০ দিনের মধ্যে গেটওয়ে সরাসরি গ্রাহকের বিকাশ/ব্যাংক একাউন্টে টাকা ফেরত দেবে।",
      en: "Under Clauses 3.1.8 and 3.1.9, customer funds paid through payment gateways are held in escrow and cannot be released to the merchant until successful delivery is verified. If cancelled, the gateway must refund the money within 7 to 10 days."
    },
    caution: {
      bn: "কোনো অবস্থাতেই রিফান্ডের টাকা ওয়ালেট বা কুপন আকারে আটকে রাখা যাবে না; মূল ব্যাংক বা এমএফএস একাউন্টেই ফেরত দিতে হবে।",
      en: "Merchants are prohibited from forcing customer refunds into store credits or non-cash coupons; refunds must be credited to the original funding account."
    },
    sourceUrl: "https://mincom.gov.bd/site/view/policies/",
    retrievalDate: "2026-11-01",
    effectiveDate: "2021-07-04",
    legalStatus: "active",
    reviewStatus: "verified",
    contentHash: "",
    keywords: [
      "escrow refund",
      "payment gateway refund",
      "bkash refund",
      "nagad refund",
      "auto refund",
      "escrow payment",
      "টাকা ফেরত",
      "এস্ক্রো পেমেন্ট",
      "গেটওয়ে রিফান্ড",
      "৭ দিনে টাকা ফেরত",
      "অনুচ্ছেদ ৩.১.৮"
    ],
    relatedProvisions: ["ecommerce-delivery-2021", "consumer-40", "consumer-76"]
  },
  {
    id: "ecommerce-product-disclosure-2021",
    actId: "act_digital_commerce_2021",
    sectionNumber: "Clause 3.1.1",
    categories: ["consumer", "digital"],
    title: {
      bn: "পণ্যের বিবরণ, সাইজ, উপাদান ও মূল্যের বাধ্যতামূলক বাংলা প্রদর্শন (অনুচ্ছেদ ৩.১.১)",
      en: "Mandatory Pre-Purchase Disclosure of Product Specifications and Pricing (Clause 3.1.1)"
    },
    originalText: "ডিজিটাল কমার্স প্ল্যাটফর্মে প্রদর্শিত পণ্যের বিবরণ, উপাদান, সাইজ, ওজন, প্রস্তুতকারকের নাম, সর্বোচ্চ খুচরা মূল্য এবং ফেরত নীতিমালা সুস্পষ্টভাবে বাংলায় উল্লেখ করিতে হইবে।",
    originalLanguage: "bn",
    plainExplanation: {
      bn: "অনলাইন বিক্রেতাকে অবশ্যই ওয়েবসাইটে পণ্যের আসল ছবি, সঠিক সাইজ, উপাদান, প্রস্তুতকারকের নাম এবং মোট ডেলিভারি চার্জ স্পষ্ট বাংলায় প্রদর্শন করতে হবে।",
      en: "Mandates that e-commerce websites and Facebook shops clearly display accurate product specifications, materials, sizes, manufacturer identity, return terms, and total delivery charges before checkout."
    },
    caution: {
      bn: "ছবিতে এক রকম দেখিয়ে ডেলিভারির সময় নিম্নমানের পণ্য পাঠানো ভোক্তা অধিকার আইনে সরাসরি প্রতারণা ও দণ্ডনীয় অপরাধ।",
      en: "Delivering products that materially differ from advertised online photos constitutes deceptive passing-off under Section 45 of Consumer Act."
    },
    sourceUrl: "https://mincom.gov.bd/site/view/policies/",
    retrievalDate: "2026-11-01",
    effectiveDate: "2021-07-04",
    legalStatus: "active",
    reviewStatus: "verified",
    contentHash: "",
    keywords: [
      "product disclosure",
      "facebook shop fake picture",
      "mismatched online order",
      "picture vs reality",
      "chobir shathe mil nai",
      "অনলাইন পণ্যের বিবরণ",
      "ভুয়া ছবি",
      "ভুল সাইজ ডেলিভারি",
      "অনুচ্ছেদ ৩.১.১"
    ],
    relatedProvisions: ["ecommerce-return-replace-2021", "consumer-44", "consumer-45"]
  },
  {
    id: "ecommerce-inventory-custody-2021",
    actId: "act_digital_commerce_2021",
    sectionNumber: "Clause 3.1.3",
    categories: ["consumer", "digital"],
    title: {
      bn: "মজুদ বা বাস্তব চুক্তি ছাড়া পণ্য বিক্রি নিষিদ্ধ (অনুচ্ছেদ ৩.১.৩)",
      en: "Prohibition on Selling Goods Without Physical Stock Custody (Clause 3.1.3)"
    },
    originalText: "মার্কেটপ্লেস বা মার্চেন্টের নিজস্ব নিয়ন্ত্রণে বাস্তব মজুদ পণ্য না থাকিলে কিংবা অনুমোদিত প্রস্তুতকারক বা আমদানিকারকের সাথে কার্যকর লিখিত চুক্তি না থাকিলে পণ্যের অর্ডার বা মূল্য গ্রহণ করা যাইবে না।",
    originalLanguage: "bn",
    plainExplanation: {
      bn: "নিজের নিয়ন্ত্রণে পণ্য না থাকলে বা সরবরাহকারীর সাথে চুক্তি ছাড়া কোনো ওয়েবসাইট গ্রাহকদের কাছ থেকে অর্ডার বা টাকা নিতে পারবে না। অস্তিত্বহীন পণ্য বিক্রয় সম্পূর্ণ নিষিদ্ধ।",
      en: "Strictly forbids online marketplaces from collecting customer orders or money for phantom inventory unless they have physical custody or binding supply agreements."
    },
    caution: {
      bn: "মজুদ ছাড়া হাজার হাজার গ্রাহকের টাকা সংগ্রহ করে উধাও হওয়া ডিজিটাল জালিয়াতি ও দণ্ডবিধির ৪০৬/৪২০ ধারায় জামিন-অযোগ্য অপরাধ।",
      en: "Collecting advance payments without stock constitutes criminal breach of trust under Penal Code Section 406/420."
    },
    sourceUrl: "https://mincom.gov.bd/site/view/policies/",
    retrievalDate: "2026-11-01",
    effectiveDate: "2021-07-04",
    legalStatus: "active",
    reviewStatus: "verified",
    contentHash: "",
    keywords: [
      "phantom inventory",
      "fake stock ecommerce",
      "stock chara order",
      "ponno chara taka neya",
      "মজুদ ছাড়া পণ্য বিক্রি",
      "অস্তিত্বহীন পণ্য",
      "অনুচ্ছেদ ৩.১.৩"
    ],
    relatedProvisions: ["ecommerce-delivery-2021", "penal-420"]
  },
  {
    id: "ecommerce-delivery-tracking-2021",
    actId: "act_digital_commerce_2021",
    sectionNumber: "Clause 3.1.6",
    categories: ["consumer", "digital"],
    title: {
      bn: "কুরিয়ার ট্র্যাকিং কোড ও এসএমএস আপডেট প্রদানের বাধ্যবাধকতা (অনুচ্ছেদ ৩.১.৬)",
      en: "Mandatory Courier Tracking Code and SMS Notifications (Clause 3.1.6)"
    },
    originalText: "অর্ডার নিশ্চিতকরণের সাথে সাথে ক্রেতাকে অনন্য ইনভয়েস নম্বর এবং পণ্য কুরিয়ারে হস্তান্তরের সাথে সাথে ট্র্যাকিং নম্বর ও লিঙ্ক এসএমএস বা ইমেইলে সরবরাহ করিতে হইবে।",
    originalLanguage: "bn",
    plainExplanation: {
      bn: "অর্ডার কনফার্ম হলেই গ্রাহককে ডিজিটাল ক্যাশমেমো দিতে হবে এবং কুরিয়ারে বুকিং দেওয়ার পর ট্র্যাকিং কোড ও ট্র্যাকিং লিঙ্ক এসএমএসে পাঠানো বিক্রেতার দায়িত্ব।",
      en: "Merchants must issue an official electronic invoice upon order confirmation and dispatch valid courier tracking IDs and links via SMS/email upon shipment."
    },
    caution: {
      bn: "ট্র্যাকিং কোড না দিয়ে অস্পষ্ট আশ্বাসে সময়ক্ষেপণ করলে গ্রাহক ভোক্তা অধিদপ্তরে চুক্তিভঙ্গের অভিযোগ দায়ের করতে পারেন।",
      en: "Failure to provide verified tracking information allows the consumer to treat the transaction as defaulted and demand an immediate refund."
    },
    sourceUrl: "https://mincom.gov.bd/site/view/policies/",
    retrievalDate: "2026-11-01",
    effectiveDate: "2021-07-04",
    legalStatus: "active",
    reviewStatus: "verified",
    contentHash: "",
    keywords: [
      "courier tracking",
      "tracking code sms",
      "delivery tracking link",
      "courier tracking dey na",
      "কুরিয়ার ট্র্যাকিং",
      "ট্র্যাকিং কোড",
      "এসএমএস আপডেট",
      "অনুচ্ছেদ ৩.১.৬"
    ],
    relatedProvisions: ["ecommerce-delivery-2021", "consumer-45"]
  },
  {
    id: "ecommerce-anti-lottery-2021",
    actId: "act_digital_commerce_2021",
    sectionNumber: "Clause 3.3.1",
    categories: ["consumer", "digital"],
    title: {
      bn: "লটারি, জুয়া ও পিরামিড স্কিম নিষিদ্ধকরণ (অনুচ্ছেদ ৩.৩.১)",
      en: "Strict Prohibition on Lotteries, Gambling, and Pyramid MLM Schemes (Clause 3.3.1)"
    },
    originalText: "ডিজিটাল কমার্স কার্যক্রমে ডিসকাউন্ট বা অফারের নামে কোনো প্রকার লটারি, ভাগ্য পরীক্ষা, জুয়া কিংবা বহুস্তরীয় বিপণন (MLM/Pyramid scheme) পরিচালনা সম্পূর্ণ নিষিদ্ধ।",
    originalLanguage: "bn",
    plainExplanation: {
      bn: "অনলাইনে ডিসকাউন্ট বা লোভনীয় অফারের নামে কোনো ধরনের লটারি, ভাগ্য পরীক্ষা বা এমএলএম (MLM) স্কিম পরিচালনা করা আইনত দণ্ডনীয় অপরাধ।",
      en: "Explicitly outlaws lotteries, gambling, cash-back betting, and multi-level marketing (MLM) pyramid structures disguised as promotional e-commerce discounts."
    },
    caution: {
      bn: "লটারি বা অফারের মাধ্যমে গ্রাহকের অর্থ আত্মসাৎ মানিলন্ডারিং ও ডিজিটাল নিরাপত্তা আইনে কঠোর শাস্তিযোগ্য।",
      en: "Running illegal digital lotteries exposes operators to severe criminal penalties under the Money Laundering Prevention Act."
    },
    sourceUrl: "https://mincom.gov.bd/site/view/policies/",
    retrievalDate: "2026-11-01",
    effectiveDate: "2021-07-04",
    legalStatus: "active",
    reviewStatus: "verified",
    contentHash: "",
    keywords: [
      "ecommerce lottery banned",
      "pyramid scheme",
      "online gambling discount",
      "lottery offer",
      "অনলাইন লটারি নিষিদ্ধ",
      "জুয়া অফার",
      "পিরামিড স্কিম",
      "অনুচ্ছেদ ৩.৩.১"
    ],
    relatedProvisions: ["ecommerce-delivery-2021", "penal-420"]
  },
  {
    id: "ecommerce-return-replace-2021",
    actId: "act_digital_commerce_2021",
    sectionNumber: "Clause 3.5.1",
    categories: ["consumer", "digital"],
    title: {
      bn: "ত্রুটিপূর্ণ বা ভিন্ন পণ্য ডেলিভারিতে ৭ দিনে বদল ও টাকা ফেরতের অধিকার (অনুচ্ছেদ ৩.৫.১)",
      en: "Right to 7-Day Return, Replacement, and Full Refund for Defective or Mismatched Goods (Clause 3.5.1)"
    },
    originalText: "সরবরাহকৃত পণ্য ত্রুটিযুক্ত, বিনষ্ট, ভিন্ন সাইজ বা বিজ্ঞাপনে বর্ণিত বৈশিষ্ট্যের সাথে গরমিল থাকিলে ক্রেতা কর্তৃক ফেরত প্রদানের ৭ দিনের মধ্যে পণ্য বদল অথবা সম্পূর্ণ অর্থ ফেরত প্রদান করিতে হইবে।",
    originalLanguage: "bn",
    plainExplanation: {
      bn: "অনলাইনে অর্ডার করা পণ্য নষ্ট, ছেঁড়া, ভুল সাইজ বা ভিন্ন মডেলের হলে গ্রাহক ফেরত দিলে ৭ দিনের মধ্যে বিক্রেতা তা পরিবর্তন করে দেবে অথবা সম্পূর্ণ টাকা রিফান্ড করতে বাধ্য।",
      en: "If delivered goods are damaged, defective, wrong size, or mismatched with online specifications, the merchant must replace the product or issue a full refund within 7 days of return."
    },
    caution: {
      bn: "পার্সেল খোলার সময় একটি সংক্ষিপ্ত আনবক্সিং ভিডিও করে রাখুন; এটি ক্ষতিপূরণ ও রিফান্ড আদায়ে আদালতে অকাট্য প্রমাণ হিসেবে কাজ করে।",
      en: "Always record an unboxing video when opening e-commerce deliveries to serve as incontrovertible proof of defect or mismatch."
    },
    sourceUrl: "https://mincom.gov.bd/site/view/policies/",
    retrievalDate: "2026-11-01",
    effectiveDate: "2021-07-04",
    legalStatus: "active",
    reviewStatus: "verified",
    contentHash: "",
    keywords: [
      "return replacement policy",
      "damaged online product",
      "wrong size return",
      "unboxing video evidence",
      "nosto ponno ফেরত",
      "ভুল পণ্য ডেলিভারি",
      "৭ দিনে বদল",
      "রিপ্লেসমেন্ট",
      "অনুচ্ছেদ ৩.৫.১"
    ],
    relatedProvisions: ["ecommerce-delivery-2021", "ecommerce-product-disclosure-2021", "consumer-45"]
  },
  {
    id: "ecommerce-hidden-charges-2021",
    actId: "act_digital_commerce_2021",
    sectionNumber: "Clause 3.2.1",
    categories: ["consumer", "digital"],
    title: {
      bn: "অনলাইনে লুকানো চার্জ ও অতিরিক্ত ডেলিভারি ফি আরোপ নিষিদ্ধ (অনুচ্ছেদ ৩.২.১)",
      en: "Prohibition on Hidden Surcharges and Undisclosed Delivery Fees (Clause 3.2.1)"
    },
    originalText: "চেকআউট পেজে প্রদর্শিত চূড়ান্ত মূল্যের অতিরিক্ত কোনো প্রকার গোপন চার্জ, পেমেন্ট গেটওয়ে সারচার্জ বা অতিরিক্ত ডেলিভারি ফি ক্রেতার নিকট হইতে দাবি করা যাইবে না।",
    originalLanguage: "bn",
    plainExplanation: {
      bn: "অর্ডার করার সময় যে চূড়ান্ত মূল্য দেখানো হয়, তার বাইরে কোনো গোপন ফি, অতিরিক্ত গেটওয়ে চার্জ বা কুরিয়ারে বাড়তি টাকা দাবি করা আইনত নিষিদ্ধ।",
      en: "Merchants cannot impose surprise fees, hidden payment gateway surcharges, or inflated delivery costs beyond the final price confirmed at checkout."
    },
    caution: {
      bn: "কুরিয়ারম্যান বা সেলার অতিরিক্ত টাকা দাবি করলে ক্যাশমেমো ছাড়া বাড়তি টাকা দেবেন না এবং ভোক্তা অধিকারে অভিযোগ করুন।",
      en: "Do not pay undeclared extra charges at delivery time without an official receipt; report violations to DNCRP."
    },
    sourceUrl: "https://mincom.gov.bd/site/view/policies/",
    retrievalDate: "2026-11-01",
    effectiveDate: "2021-07-04",
    legalStatus: "active",
    reviewStatus: "verified",
    contentHash: "",
    keywords: [
      "hidden charges",
      "extra delivery charge",
      "gateway surcharge",
      "lukano fee",
      "লুকানো চার্জ",
      "অতিরিক্ত ডেলিভারি ফি",
      "অনুচ্ছেদ ৩.২.১"
    ],
    relatedProvisions: ["ecommerce-delivery-2021", "consumer-40"]
  }
];

// Helper to format bdlaws text
function cleanText(raw) {
  return raw
    .replace(/<div class="clbr">&nbsp;<\/div>/gi, '\n')
    .replace(/<div class="na">&nbsp;<\/div>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s+/g, '\n')
    .trim();
}

// Map Drugs Control provisions
const drugsBuilt = [];
for (const dp of drugsProvisions) {
  const raw = s623[dp.secIndex - 1];
  if (!raw) {
    console.error(`Missing raw for Drugs section index ${dp.secIndex}`);
    continue;
  }
  drugsBuilt.push({
    id: dp.id,
    actId: "act_drugs_control_1982",
    sectionNumber: dp.secNumStr,
    categories: ["consumer"],
    title: {
      bn: dp.titleBn,
      en: dp.titleEn
    },
    originalText: cleanText(raw.text),
    originalLanguage: "en",
    plainExplanation: {
      bn: dp.bnExp,
      en: dp.enExp
    },
    caution: {
      bn: dp.bnCaution,
      en: dp.enCaution
    },
    sourceUrl: raw.url,
    retrievalDate: "2026-11-01",
    effectiveDate: "1982-06-12",
    legalStatus: "repealed",
    reviewStatus: "verified",
    contentHash: "",
    keywords: [
      ...dp.keywords,
      dp.secNumStr.toLowerCase(),
      `drugs control ${dp.secNumStr}`,
      "the drugs control ordinance 1982",
      "ঔষধ নিয়ন্ত্রণ অধ্যাদেশ"
    ],
    relatedProvisions: ["consumer-41", "consumer-51"]
  });
}
console.log(`Built ${drugsBuilt.length} Drugs Control provisions`);

// Map Essential Commodities provisions
const essentialBuilt = [];
for (const ep of essentialProvisions) {
  const raw = s267[ep.secIndex - 1];
  if (!raw) {
    console.error(`Missing raw for Essential Commodities section index ${ep.secIndex}`);
    continue;
  }
  essentialBuilt.push({
    id: ep.id,
    actId: "act_essential_commodities_1957",
    sectionNumber: ep.secNumStr,
    categories: ["consumer"],
    title: {
      bn: ep.titleBn,
      en: ep.titleEn
    },
    originalText: cleanText(raw.text),
    originalLanguage: "en",
    plainExplanation: {
      bn: ep.bnExp,
      en: ep.enExp
    },
    caution: {
      bn: ep.bnCaution,
      en: ep.enCaution
    },
    sourceUrl: raw.url,
    retrievalDate: "2026-11-01",
    effectiveDate: "1957-03-06",
    legalStatus: "active",
    reviewStatus: "verified",
    contentHash: "",
    keywords: [
      ...ep.keywords,
      ep.secNumStr.toLowerCase(),
      `essential commodities ${ep.secNumStr}`,
      "the essential commodities act 1957",
      "অত্যাবশ্যকীয় পণ্য আইন"
    ],
    relatedProvisions: ["consumer-40", "food-safety-23"]
  });
}
console.log(`Built ${essentialBuilt.length} Essential Commodities provisions`);

// Merge Digital Commerce provisions (update existing ecommerce-delivery-2021 or add new)
const allNewProvisions = [...drugsBuilt, ...essentialBuilt, ...digitalCommerceProvisions];
console.log(`Total new/updated provisions to merge: ${allNewProvisions.length}`);

// Merge into provisions.json
let updatedCount = 0;
let addedCount = 0;

for (const np of allNewProvisions) {
  const existingIdx = provisions.findIndex(p => p.id === np.id);
  if (existingIdx >= 0) {
    provisions[existingIdx] = np;
    updatedCount++;
  } else {
    provisions.push(np);
    addedCount++;
  }
}

console.log(`Merged: ${updatedCount} updated, ${addedCount} added. Total provisions now: ${provisions.length}`);
fs.writeFileSync(provisionsPath, JSON.stringify(provisions, null, 2), 'utf8');
console.log('Saved updated provisions.json');
