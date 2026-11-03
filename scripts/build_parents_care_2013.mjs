import fs from 'node:fs';
import crypto from 'node:crypto';

const catalog = JSON.parse(fs.readFileSync('scripts/new_family_catalog.json', 'utf8'))['act_parents_care_2013'];
const printHtml = fs.readFileSync('scripts/act-1132-print.html', 'utf8');
const blocks = [...printHtml.matchAll(/<div[^>]*class=["'][^"']*txt-details[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)];

function sha256(str) {
  return crypto.createHash('sha256').update(str.trim()).digest('hex');
}

function cleanHtmlToText(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<div[^>]*class=["'][^"']*clbr[^"']*["'][^>]*>.*?<\/div>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rsquo;/g, '’')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

const meta = {
  1: {
    title: { bn: "সংক্ষিপ্ত শিরোনাম ও প্রবর্তন (ধারা ১)", en: "Short Title and Commencement (Section 1)" },
    plainExplanation: {
      bn: "এই আইনটি 'পিতা-মাতার ভরণ-পোষণ আইন, ২০১৩' (২০১৩ সনের ৪৯ নং আইন) নামে অভিহিত এবং ২৭ অক্টোবর ২০১৩ তারিখে গেজেট প্রকাশের মাধ্যমে অবিলম্বে কার্যকর হয়।",
      en: "Designates the statute as the Parents Care Act, 2013 (Act No. XLIX of 2013), which came into force immediately on 27 October 2013."
    },
    caution: {
      bn: "বাংলাদেশে প্রবীণ পিতা-মাতার সামাজিক নিরাপত্তা ও সম্মানজনক জীবনযাত্রা নিশ্চিতকরণে এটি একটি যুগান্তকারী বিশেষ আইন।",
      en: "Establishes a statutory duty of support owed by adult biological children to their elderly parents."
    },
    keywords: ["parents care act 2013", "pita matar bhoron poshon ain", "পিতা মাতার ভরণ পোষণ আইন ২০১৩", "section 1", "ধারা ১", "elderly parents care"]
  },
  2: {
    title: { bn: "সংজ্ঞা ও ভরণ-পোষণের পরিধি (ধারা ২)", en: "Definitions and Scope of Maintenance (Section 2)" },
    plainExplanation: {
      bn: "এই আইনে পিতা, মাতা, সন্তান এবং ভরণ-পোষণ সংজ্ঞায়িত করা হইয়াছে। 'ভরণ-পোষণ' বলিতে খাদ্য, বস্ত্র, বাসস্থান, চিকিৎসা সেবা এবং নিয়মিত সেবা-শুশ্রূষা ও সঙ্গ প্রদানকে বুঝায়।",
      en: "Defines father, mother, child (biological son or daughter), and maintenance. Maintenance comprehensively includes food, clothing, shelter, medical treatment, physical care, and regular companionship."
    },
    caution: {
      bn: "কেবল অর্থ প্রদান নয়, পিতা-মাতার সার্বিক যত্ন ও চিকিৎসা নিশ্চিত করাও ভরণ-পোষণের অপরিহার্য অংশ।",
      en: "Maintenance encompasses active personal healthcare and dignified living support, not merely monetary remittances."
    },
    keywords: ["parents care definitions", "bhoron poshoner shongga", "ভরণ পোষণের সংজ্ঞা", "food clothing medical care", "ধারা ২", "section 2"]
  },
  3: {
    title: { bn: "পিতা-মাতার ভরণ-পোষণ ও বৃদ্ধাশ্রমে পাঠানো নিষেধাজ্ঞা (ধারা ৩)", en: "Mandatory Maintenance of Parents and Ban on Forced Old-Age Homes (Section 3)" },
    plainExplanation: {
      bn: "প্রত্যেক সন্তান তাহার পিতা-মাতার ভরণ-পোষণ নিশ্চিত করিতে আইনত বাধ্য। পিতা-মাতাকে তাহাদের ইচ্ছার বিরুদ্ধে কোনো বৃদ্ধাশ্রম বা অন্য কোথাও বসবাস করিতে বাধ্য করা যাইবে না। সন্তান পিতা-মাতার সাথে একই গৃহে বসবাস করিবে অথবা পৃথক থাকিলে নিয়মিত খোঁজখবর ও সাক্ষাৎ করিবে। একাধিক সন্তান থাকিলে পরস্পরের সাথে আলোচনা করিয়া ভরণ-পোষণ নিশ্চিত করিতে হইবে।",
      en: "Imposes an absolute statutory duty on adult children to maintain their parents. Crucially, children are prohibited from compelling parents to reside in old-age homes or outside shelters against their will. Children must reside with parents or regularly visit and provide maintenance. Multiple children must jointly or alternately support parents based on mutual consultation."
    },
    caution: {
      bn: "পিতা-মাতার ইচ্ছার বিরুদ্ধে বৃদ্ধাশ্রমে রেখে আসা বা যোগাযোগ বন্ধ করে দেওয়া আইনত দণ্ডনীয় অপরাধ।",
      en: "Abandoning parents or forcing them into old-age homes constitutes a punishable criminal offense under Section 5."
    },
    keywords: [
      "care of parents",
      "ban on old age homes",
      "briddhashrom nisiddho",
      "বৃদ্ধাশ্রমে পাঠানো নিষেধ",
      "পিতা মাতার ভরণপোষণ",
      "mandatory child support parents",
      "ধারা ৩",
      "section 3"
    ]
  },
  4: {
    title: { bn: "পিতা-মাতার অবর্তমানে দাদা-দাদী ও নানা-নানীর ভরণ-পোষণ (ধারা ৪)", en: "Maintenance of Grandparents in Absence of Parents (Section 4)" },
    plainExplanation: {
      bn: "পিতা বা মাতার অবর্তমানে (মারা গেলে বা অক্ষম হইলে) সন্তান তাহার জীবিত দাদা-দাদী এবং নানা-নানীর ভরণ-পোষণ নিশ্চিত করিতে আইনত বাধ্য থাকিবে।",
      en: "Extends statutory maintenance obligations to paternal and maternal grandparents if their own children (the parents) are deceased or physically/financially incapable of providing care."
    },
    caution: {
      bn: "পিতা বা মাতা মারা গেলেও নাতি-নাতনিরা দাদা-দাদী বা নানা-নানীকে অবহেলা বা ত্যাগ করতে পারবে না।",
      en: "Grandchildren are legally accountable for the welfare, medical treatment, and sustenance of surviving grandparents."
    },
    keywords: [
      "grandparents care",
      "dada dadi bhoron poshon",
      "nana nani care",
      "দাদা দাদীর ভরণপোষণ",
      "নানা নানীর সেবা",
      "maintenance of grandparents",
      "ধারা ৪",
      "section 4"
    ]
  },
  5: {
    title: { bn: "পিতা-মাতার ভরণ-পোষণ না করিবার দণ্ড (ধারা ৫)", en: "Penalties for Neglecting Parents (Section 5)" },
    plainExplanation: {
      bn: "কোনো সন্তান পিতা-মাতার ভরণ-পোষণ না করিলে তিনি অনূর্ধ্ব ১,০০,০০০ (এক লক্ষ) টাকা অর্থদণ্ডে দণ্ডিত হইবেন; অর্থদণ্ড অনাদায়ে অনূর্ধ্ব ৩ (তিন) মাস কারাদণ্ডে দণ্ডিত হইবেন। সন্তানের স্বামী বা স্ত্রী যদি ভরণ-পোষণ প্রদানে বাধা দেয় বা প্ররোচিত করে, তবে তিনিও সমান দণ্ডে দণ্ডনীয় হইবেন।",
      en: "Failure or refusal by a child to maintain parents is punishable with a fine up to 1,00,000 BDT, or in default, simple imprisonment up to three (3) months. Furthermore, if the spouse of a child instigates or obstructs maintenance, they are liable to the exact same penal liability."
    },
    caution: {
      bn: "সন্তানের পাশাপাশি সন্তানের স্বামী বা স্ত্রীও পিতা-মাতার সেবায় বাধা দিলে সরাসরি ১ লাখ টাকা জরিমানা ও ৩ মাসের কারাদণ্ডে দণ্ডনীয় হবে।",
      en: "Spouses of children who obstruct parental care or maintenance face joint criminal culpability."
    },
    keywords: [
      "penalty for neglecting parents",
      "shasti bhoron poshon",
      "পিতা মাতার অবহেলার শাস্তি",
      "১ লাখ টাকা জরিমানা",
      "spouse liability parents care",
      "ধারা ৫",
      "section 5"
    ]
  },
  6: {
    title: { bn: "অপরাধের আমলযোগ্যতা, জামিনযোগ্যতা ও আপোষযোগ্যতা (ধারা ৬)", en: "Cognizability, Bailability, and Compoundability (Section 6)" },
    plainExplanation: {
      bn: "এই আইনের অধীন সকল অপরাধ আমলযোগ্য (Cognizable), জামিনযোগ্য (Bailable) এবং আদালতের অনুমতি সাপেক্ষে আপোষযোগ্য (Compoundable)।",
      en: "Offenses under the Parents Care Act 2013 are cognizable (police or magistrate can initiate action), bailable, and compoundable with court approval."
    },
    caution: {
      bn: "পারিবারিক বন্ধন পুনরুদ্ধারের স্বার্থে মামলা চলাকালীন যেকোনো পর্যায়ে পক্ষগণের মধ্যে আপোষ মীমাংসা করা যায়।",
      en: "Encourages restorative family harmony; courts permit amicable settlements between parents and children."
    },
    keywords: [
      "bailable compoundable parents care",
      "cognizable bailable",
      "আমলযোগ্য জামিনযোগ্য",
      "আপোষযোগ্য",
      "ধারা ৬",
      "section 6"
    ]
  },
  7: {
    title: { bn: "অপরাধ বিচারার্থ গ্রহণ ও বিচার আদালত (ধারা ৭)", en: "Cognizance and Jurisdiction of Trial Court (Section 7)" },
    plainExplanation: {
      bn: "পিতা বা মাতার লিখিত অভিযোগের ভিত্তিতে ১ম শ্রেণীর জুডিশিয়াল ম্যাজিস্ট্রেট বা মেট্রোপলিটন ম্যাজিস্ট্রেট আদালত এই অপরাধ বিচারার্থ গ্রহণ করিবেন। আদালত পিতা-মাতার আবেদন প্রাপ্তির পর দ্রুত শুনানির উদ্যোগ গ্রহণ করিবেন।",
      en: "Cognizance is taken upon written complaint filed by the aggrieved father or mother. The Court of Judicial Magistrate of the First Class or Metropolitan Magistrate holds exclusive trial jurisdiction."
    },
    caution: {
      bn: "পিতা বা মাতা সশরীরে বা আইনজীবীর মাধ্যমে ম্যাজিস্ট্রেট আদালতে সরাসরি লিখিত নালিশ দাখিল করতে পারেন।",
      en: "Complainant parents can file directly before the local Judicial Magistrate without going through police stations."
    },
    keywords: [
      "cognizance parents care",
      "magistrate court parents care",
      "বিচার আদালত",
      "লিখিত অভিযোগ",
      "judicial magistrate trial",
      "ধারা ৭",
      "section 7"
    ]
  },
  8: {
    title: { bn: "আপোষ-নিষ্পত্তি ও মধ্যস্থতা (ধারা ৮)", en: "Alternative Dispute Resolution and Conciliation (Section 8)" },
    plainExplanation: {
      bn: "ম্যাজিস্ট্রেট আদালত অভিযোগ প্রাপ্তির পর উপযুক্ত মনে করিলে মামলাটি সংশ্লিষ্ট ইউনিয়ন পরিষদের চেয়ারম্যান, পৌরসভার মেয়র বা সিটি কর্পোরেশনের ওয়ার্ড কাউন্সিলরের নিকট আপোষ-নিষ্পত্তির জন্য প্রেরণ করিতে পারেন। মধ্যস্থতাকারী উভয় পক্ষকে ডাকিয়া আপোষের উদ্যোগ গ্রহণ করিবেন।",
      en: "Authorizes the Magistrate to refer complaints to the local Union Parishad Chairman, Paurashava Mayor, or City Ward Councillor for conciliation and alternative dispute resolution (ADR) prior to or during trial."
    },
    caution: {
      bn: "মধ্যস্থতায় সন্তান পিতা-মাতার ভরণ-পোষণের লিখিত অঙ্গীকার করিলে মামলা প্রত্যাহার বা নিষ্পত্তি করা যায়।",
      en: "Successful local mediation secures enforceable support agreements without subjecting children to jail."
    },
    keywords: [
      "adr parents care",
      "aposh nishpotti",
      "আপোষ নিষ্পত্তি",
      "ইউপি চেয়ারম্যান সালিশ",
      "conciliation parents support",
      "ধারা ৮",
      "section 8"
    ]
  },
  9: {
    title: { bn: "বিধি প্রণয়নের ক্ষমতা (ধারা ৯)", en: "Power to Make Rules (Section 9)" },
    plainExplanation: {
      bn: "এই আইনের উদ্দেশ্য বাস্তবায়নকল্পে সরকার সরকারি গেজেটে প্রজ্ঞাপন দ্বারা পিতা-মাতার ভরণ-পোষণ বিধিমালা প্রণয়ন করিতে পারিবে।",
      en: "Empowers the Government to frame statutory rules by official gazette notification to implement the purposes of this Act."
    },
    caution: {
      bn: "সরকার বৃদ্ধাশ্রমের মান নিয়ন্ত্রণ ও প্রবীণ নিবাসের সুরক্ষা বিষয়ক বিধি প্রণয়ন করতে পারে।",
      en: "Government regulations supplement statutory elderly care protocols."
    },
    keywords: ["power to make rules", "parents care rules", "বিধি প্রণয়ন", "ধারা ৯", "section 9"]
  }
};

const provisions = [];
for (let i = 0; i < catalog.length; i++) {
  const cat = catalog[i];
  const num = i + 1;
  const rawText = cleanHtmlToText(blocks[i][1]);
  const m = meta[num];
  if (!m) continue;

  const prov = {
    id: `parents-care-2013-${num}`,
    actId: 'act_parents_care_2013',
    sectionNumber: `Section ${num}`,
    categories: ['family', 'rights'],
    title: m.title,
    originalText: rawText,
    originalLanguage: 'bn',
    plainExplanation: m.plainExplanation,
    caution: m.caution,
    sourceUrl: cat.url,
    retrievalDate: '2026-11-01',
    effectiveDate: '2013-10-27',
    legalStatus: 'active',
    reviewStatus: 'verified',
    contentHash: sha256(rawText),
    keywords: m.keywords
  };
  provisions.push(prov);
}

fs.writeFileSync('scripts/generated_parents_care_2013.json', JSON.stringify(provisions, null, 2), 'utf8');
console.log(`Generated ${provisions.length} provisions for Parents Care Act 2013`);
