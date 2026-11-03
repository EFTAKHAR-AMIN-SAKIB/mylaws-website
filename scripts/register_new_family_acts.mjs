import fs from 'node:fs';

const actsPath = 'src/data/corpus/acts.json';
const acts = JSON.parse(fs.readFileSync(actsPath, 'utf8'));

const newActs = [
  {
    id: "act_parents_care_2013",
    name: {
      en: "Parents Care Act, 2013",
      bn: "পিতা-মাতার ভরণ-পোষণ আইন, ২০১৩"
    },
    actNumber: "Act XLIX of 2013",
    year: 2013,
    categories: ["family", "rights"],
    officialUrl: "https://bdlaws.minlaw.gov.bd/act-1132.html",
    legalStatus: "active",
    notes: {
      en: "Mandates biological children to ensure maintenance, health, and dignified living conditions for elderly parents (Sec 3), prohibits sending parents to old-age homes against their will, and punishes neglect with fines up to 1 lakh BDT or 3 months imprisonment (Sec 5).",
      bn: "পিতা-মাতার ভরণপোষণ নিশ্চিত করার আইনি বাধ্যবাধকতা, ইচ্ছার বিরুদ্ধে বৃদ্ধাশ্রমে পাঠানো নিষিদ্ধ এবং অমান্য করলে ১ লাখ টাকা জরিমানা বা ৩ মাস কারাদণ্ড।"
    }
  },
  {
    id: "act_special_marriage_1872",
    name: {
      en: "The Special Marriage Act, 1872",
      bn: "বিশেষ বিবাহ আইন, ১৮৭২"
    },
    actNumber: "Act III of 1872",
    year: 1872,
    categories: ["family"],
    officialUrl: "https://bdlaws.minlaw.gov.bd/act-25.html",
    legalStatus: "active",
    notes: {
      en: "Enables civil marriage between persons of different religious faiths without religious conversion; requires 14 days statutory public notice to the Marriage Registrar (Sec 4) and solemnization before Registrar and three witnesses (Sec 10-12).",
      bn: "ধর্ম পরিবর্তন ব্যতীত ভিন্ন ধর্মের ব্যক্তিদের মধ্যে বৈধ আইনি বিয়ে (সিভিল ম্যারেজ), রেজিস্ট্রার বরাবর ১৪ দিনের নোটিশ ও তিন সাক্ষীর উপস্থিতিতে বিবাহ রেজিস্ট্রি।"
    }
  },
  {
    id: "act_succession_1925",
    name: {
      en: "The Succession Act, 1925",
      bn: "উত্তরাধিকার আইন, ১৯২৫"
    },
    actNumber: "Act XXXIX of 1925",
    year: 1925,
    categories: ["family", "rights"],
    officialUrl: "https://bdlaws.minlaw.gov.bd/act-138.html",
    legalStatus: "active",
    notes: {
      en: "Governs testamentary and intestate succession; Section 214 and Part X (Sections 370-389) provide the statutory procedure for obtaining Succession Certificates from civil courts (Senior Assistant Judge / Joint District Judge) to collect debts, securities, savings certificates, and bank deposits of deceased persons.",
      bn: "মৃত ব্যক্তির ব্যাংক হিসাব, সঞ্চয়পত্র ও পাওনা টাকা উত্তোলনে দেওয়ানি আদালত থেকে সাকসেশন সার্টিফিকেট (উত্তরাধিকার সনদ) প্রাপ্তির সংবিধিবদ্ধ আইন।"
    }
  },
  {
    id: "act_children_2013",
    name: {
      en: "Children Act, 2013",
      bn: "শিশু আইন, ২০১৩"
    },
    actNumber: "Act XXIV of 2013",
    year: 2013,
    categories: ["family", "rights", "threats"],
    officialUrl: "https://bdlaws.minlaw.gov.bd/act-1119.html",
    legalStatus: "active",
    notes: {
      en: "Comprehensive child rights legislation in accordance with UNCRC: defines child as up to 18 years (Sec 4), establishes specialized Children's Courts (Sec 16), Child Affairs Police Officers (Sec 13), prohibits handcuffs/shackles, bars death penalty or life imprisonment for children (Sec 33), guarantees bail rights (Sec 44), and criminalizes cruelty against children (Sec 70).",
      bn: "১৮ বছর বয়স পর্যন্ত সকল ব্যক্তির শিশু সুরক্ষা, বিশেষ শিশু আদালত, শিশুদের হাতকড়া বা ডাণ্ডাবেড়ি পরানো নিষিদ্ধ, জামিনের বিশেষ অধিকার এবং শিশুর প্রতি নিষ্ঠুরতা ও শোষণের বিরুদ্ধে কঠোর শাস্তি।"
    }
  }
];

for (const na of newActs) {
  const existingIdx = acts.findIndex(a => a.id === na.id);
  if (existingIdx >= 0) {
    acts[existingIdx] = na;
    console.log(`Updated existing act: ${na.id}`);
  } else {
    acts.push(na);
    console.log(`Added new act: ${na.id}`);
  }
}

// Sort acts by id
acts.sort((a, b) => a.id.localeCompare(b.id));

fs.writeFileSync(actsPath, JSON.stringify(acts, null, 2) + '\n', 'utf8');
console.log(`Updated acts.json. Total registered acts: ${acts.length}`);
