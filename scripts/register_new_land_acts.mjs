import fs from 'fs';

const acts = JSON.parse(fs.readFileSync('src/data/corpus/acts.json', 'utf8'));

const newActs = [
  {
    id: "act_real_estate_2010",
    name: {
      en: "Real Estate Development and Management Act, 2010",
      bn: "রিয়েল এস্টেট উন্নয়ন ও ব্যবস্থাপনা আইন, ২০১০"
    },
    actNumber: "Act XLVIII of 2010",
    year: 2010,
    categories: [
      "land",
      "consumer"
    ],
    officialUrl: "https://bdlaws.minlaw.gov.bd/act-1055.html",
    legalStatus: "active",
    notes: {
      en: "Comprehensive citizen protections against developer fraud, mandatory handover within contract terms with rental delay penalty, deed execution within 3 months, criminal penalties for double-selling and layout deviations, and REHAB mediation under Arbitration Act 2001.",
      bn: "ফ্ল্যাট ও প্লট ক্রেতাদের অধিকার সুরক্ষা, রিয়েল এস্টেট ডেভেলপারদের প্রতারণা ও দ্বৈত বিক্রয় রোধ, ৩ মাসে দলিল সম্পাদন, নির্ধারিত সময়ে ফ্ল্যাট হস্তান্তরে ব্যর্থতার ক্ষতিপূরণ এবং রিহ্যাব/সালিসি বিরোধ নিষ্পত্তি আইন।"
    }
  },
  {
    id: "act_acquisition_2017",
    name: {
      en: "Acquisition and Requisition of Immovable Property Act, 2017",
      bn: "স্থাবর সম্পত্তি অধিগ্রহণ ও হুকুমদখল আইন, ২০১৭"
    },
    actNumber: "Act XXI of 2017",
    year: 2017,
    categories: [
      "land",
      "rights"
    ],
    officialUrl: "https://bdlaws.minlaw.gov.bd/act-1220.html",
    legalStatus: "active",
    notes: {
      en: "Governs government and private land acquisition, establishing statutory 200% additional premium for public projects (300% total value) and 300% additional premium for private projects (400% total value), 15-day objections under Section 5, 45-day arbitration before Joint District Judge under Section 30, and 30-day appeal to Arbitration Appellate Tribunal.",
      bn: "সরকারি ও বেসরকারি প্রয়োজনে জমি অধিগ্রহণ ও ক্ষতিপূরণ নির্ধারণ আইন; সরকারি প্রকল্পে অতিরিক্ত ২০০% (মোট ৩ গুণ) ও বেসরকারি প্রকল্পে অতিরিক্ত ৩০০% (মোট ৪ গুণ) ক্ষতিপূরণ, ৪ ও ৭ ধারার নোটিশ, এবং ৩০ ধারায় আরবিট্রেটরে ৪৫ দিনে আবেদন।"
    }
  },
  {
    id: "act_partition_1893",
    name: {
      en: "The Partition Act, 1893",
      bn: "বাটোয়ারা আইন, ১৮৯৩"
    },
    actNumber: "Act IV of 1893",
    year: 1893,
    categories: [
      "land",
      "family"
    ],
    officialUrl: "https://bdlaws.minlaw.gov.bd/act-68.html",
    legalStatus: "active",
    notes: {
      en: "Governs partition suits in civil courts, court-ordered sale instead of physical division when indivisible (Sections 2 & 3), and provides absolute statutory pre-emption rights to family co-sharers against outside stranger purchasers of shares in undivided family dwelling-houses under Section 4.",
      bn: "পৈতৃক ও যৌথ সম্পত্তির বাটোয়ারা মামলা, সম্পত্তি সুবিধাজনকভাবে বণ্টন অযোগ্য হলে নিলাম বিক্রয়, এবং অবিভক্ত পারিবারিক বসতবাড়িতে বহিরাগত ক্রেতা প্রবেশ রোধে ৪ ধারায় শরিকদের বাধ্যতামূলক খরিদ অধিকার।"
    }
  }
];

let added = 0;
for (const na of newActs) {
  if (!acts.some(a => a.id === na.id)) {
    acts.push(na);
    added++;
  }
}

fs.writeFileSync('src/data/corpus/acts.json', JSON.stringify(acts, null, 2) + '\n', 'utf8');
console.log(`Successfully registered ${added} new acts. Total acts in acts.json: ${acts.length}`);
