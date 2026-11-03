import fs from 'node:fs';
import crypto from 'node:crypto';

const catalog = JSON.parse(fs.readFileSync('scripts/new_family_catalog.json', 'utf8'))['act_special_marriage_1872'];
const printHtml = fs.readFileSync('scripts/act-25-print.html', 'utf8');
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
  "1": {
    title: { bn: "প্রয়োগ ও বিস্তার (ধারা ১)", en: "Local Extent and Application (Section 1)" },
    plainExplanation: {
      bn: "এই আইনটি সমগ্র বাংলাদেশে প্রযোজ্য এবং ধর্ম পরিবর্তন না করিয়া ভিন্ন ধর্মের ব্যক্তিদের মধ্যে অথবা সাধারণ ধর্মীয় রীতির বাইরে দেওয়ানি বা বিশেষ বিবাহ সম্পাদনে ব্যবহৃত হয়।",
      en: "Extends to the whole of Bangladesh. It provides a legal mechanism for civil marriages between persons of different religious faiths without requiring either party to renounce or change their religion."
    },
    caution: {
      bn: "এই আইনে বিবাহ করিতে হইলে কোনো পক্ষকেই ধর্ম ত্যাগ বা ধর্মান্তরিত হওয়ার প্রয়োজন হয় না।",
      en: "Neither party is required to convert to another religion to contract a valid marriage under this Act."
    },
    keywords: ["special marriage act 1872", "interfaith marriage bangladesh", "civil marriage", "বিশেষ বিবাহ আইন", "ভিন্ন ধর্মের বিয়ে", "ধর্ম পরিবর্তন ছাড়া বিয়ে", "section 1", "ধারা ১"]
  },
  "2": {
    title: { bn: "বিবাহ সম্পাদনের আবশ্যিক শর্তাবলি (ধারা ২)", en: "Conditions for Celebrating Special Marriage (Section 2)" },
    plainExplanation: {
      bn: "বিশেষ বিবাহের অপরিহার্য শর্তসমূহ: (১) বিবাহের সময় কোনো পক্ষেরই কোনো জীবিত স্বামী বা স্ত্রী থাকিতে পারিবে না (একবিবাহ); (২) বরের বয়স অন্যূন ১৮ বৎসর এবং কনের বয়স অন্যূন ১৪ বৎসর হইতে হইবে (যদি ২১ বৎসরের কম হয় তবে অভিভাবকের সম্মতি আবশ্যক); (৩) পক্ষদ্বয় নিষিদ্ধ সম্পর্কের মধ্যে সম্পর্কিত হইতে পারিবে না।",
      en: "Prescribes statutory conditions: (1) Neither party has a spouse living at the time of marriage (monogamy); (2) The man must have completed 18 years and the woman 14 years of age (parental consent required if under 21); (3) Parties must not be related within prohibited degrees of consanguinity or affinity."
    },
    caution: {
      bn: "বাল্যবিয়ে নিরোধ আইন ২০১৭ অনুযায়ী বাংলাদেশে বিয়ের সাধারণ ন্যূনতম বয়স পুরুষের জন্য ২১ এবং নারীর জন্য ১৮ বৎসর।",
      en: "Age requirements are subject to the overarching general minimum age standards (21 for males, 18 for females) under the Child Marriage Restraint Act, 2017."
    },
    keywords: ["conditions of marriage", "monogamy interfaith", "minimum age marriage", "বিবাহের শর্তাবলি", "নিষিদ্ধ সম্পর্ক", "section 2", "ধারা ২"]
  },
  "3": {
    title: { bn: "ম্যারেজ রেজিস্ট্রার নিয়োগ (ধারা ৩)", en: "Appointment of Marriage Registrars (Section 3)" },
    plainExplanation: {
      bn: "সরকার বিশেষ বিবাহ রেজিস্ট্রি করার উদ্দেশ্যে যেকোনো জেলায় এক বা একাধিক বিশেষ বিবাহ নিবন্ধক (Marriage Registrar) নিয়োগ করিতে পারিবে।",
      en: "Authorizes the Government to appoint one or more Special Marriage Registrars for any territory or district to administer notices, solemnizations, and registrations under this Act."
    },
    caution: {
      bn: "বিশেষ বিবাহ কেবল সরকার কর্তৃক ক্ষমতাপ্রাপ্ত বিশেষ বিবাহ রেজিস্ট্রারের মাধ্যমে সম্পাদন করা যায়।",
      en: "Marriages under this Act can only be solemnized before an officially gazetted Special Marriage Registrar."
    },
    keywords: ["marriage registrar", "special marriage registrar", "বিবাহ নিবন্ধক", "ম্যারেজ রেজিস্ট্রার", "section 3", "ধারা ৩"]
  },
  "4": {
    title: { bn: "রেজিস্ট্রারের নিকট ১৪ দিনের লিখিত নোটিশ প্রদান (ধারা ৪)", en: "Notice of Intended Marriage to Registrar (Section 4)" },
    plainExplanation: {
      bn: "বিবাহে ইচ্ছুক পক্ষদ্বয়ের যেকোনো একজনকে যে এলাকায় তাহারা বিগত ১৪ দিন ধরিয়া বসবাস করিতেছেন, সেই এলাকার ম্যারেজ রেজিস্ট্রারের নিকট নির্ধারিত ফরমে অন্যূন ১৪ দিন পূর্বে লিখিত নোটিশ প্রদান করিতে হইবে।",
      en: "Requires one of the parties to give written notice of intended marriage in the prescribed Second Schedule format to the Marriage Registrar within whose district at least one party has resided for at least 14 days."
    },
    caution: {
      bn: "নোটিশ জারির পর ১৪ দিনের অপেক্ষার মেয়াদ সমাপ্ত না হওয়া পর্যন্ত বিয়ে সম্পাদন করা যাবে না।",
      en: "Marriage cannot be solemnized until the statutory 14-day public notice period has fully elapsed."
    },
    keywords: ["notice of intended marriage", "14 days notice", "১৪ দিনের নোটিশ", "বিয়ের নোটিশ", "section 4", "ধারা ৪"]
  },
  "5": {
    title: { bn: "ম্যারেজ নোটিশ বুক ও গণবিজ্ঞপ্তি (ধারা ৫)", en: "Marriage Notice Book and Public Inspection (Section 5)" },
    plainExplanation: {
      bn: "রেজিস্ট্রার নোটিশ পাওয়ার পর তাহা 'ম্যারেজ নোটিশ বুক' এ লিপিবদ্ধ করিবেন এবং তাহার কার্যালয়ের প্রকাশ্য স্থানে নোটিশটি প্রদর্শন করিবেন, যাহা যেকোনো ব্যক্তি বিনামূল্যে পরিদর্শন করিতে পারিবে।",
      en: "The Registrar enters the notice in the Marriage Notice Book and posts a copy in a conspicuous place in his office for free public inspection."
    },
    caution: {
      bn: "নোটিশটি জনসমক্ষে উন্মুক্ত রাখা হয় যাতে কোনো আইনগত বাধা থাকলে যে কেউ আপত্তি জানাতে পারে।",
      en: "Public display ensures interested family members or third parties can inspect and file legal objections."
    },
    keywords: ["marriage notice book", "public notice", "নোটিশ বুক", "গণবিজ্ঞপ্তি", "section 5", "ধারা ৫"]
  },
  "6": {
    title: { bn: "বিবাহে আপত্তি উত্থাপন (ধারা ৬)", en: "Objection to Intended Marriage (Section 6)" },
    plainExplanation: {
      bn: "নোটিশ প্রদর্শনের ১৪ দিনের মধ্যে যেকোনো ব্যক্তি যদি মনে করেন যে ধারা ২ এর কোনো শর্ত লঙ্ঘিত হইতেছে (যেমন: পূর্বের জীবিত স্ত্রী থাকা বা নিষিদ্ধ রক্তের সম্পর্ক), তবে তিনি রেজিস্ট্রারের নিকট লিখিত আপত্তি দায়ের করিতে পারেন।",
      en: "Any person may object to the intended marriage within 14 days of notice publication on the ground that the marriage would violate conditions specified in Section 2."
    },
    caution: {
      bn: "আপত্তি উত্থাপিত হলে তদন্ত নিষ্পত্তি না হওয়া পর্যন্ত রেজিস্ট্রার বিয়ে রেজিস্ট্রি করতে পারেন না।",
      en: "Receipt of a bona fide objection stays marriage solemnization pending inquiry."
    },
    keywords: ["objection to marriage", "apotti", "বিয়েতে আপত্তি", "grounds for objection", "section 6", "ধারা ৬"]
  },
  "7": {
    title: { bn: "আপত্তি নিষ্পত্তির কার্যপদ্ধতি ও দেওয়ানি আদালতে মামলা (ধারা ৭)", en: "Procedure on Objection and Filing Civil Suit (Section 7)" },
    plainExplanation: {
      bn: "আপত্তি দাখিল হইলে রেজিস্ট্রার তাহা নোটিশ বুকে লিপিবদ্ধ করিবেন। অভিভাবকের সম্মতি ব্যতীত অন্য কোনো কারণে আপত্তি উঠিলে পক্ষদ্বয় আপত্তি প্রত্যাহারের জন্য দেওয়ানি আদালতে মোকদ্দমা দায়ের করিতে পারেন।",
      en: "Upon receiving an objection, the Registrar records it in the Marriage Notice Book. Unless the objection relates to lack of parental consent, the applicant may file a suit in the local District Court for removal of the objection."
    },
    caution: {
      bn: "দেওয়ানি আদালত আপত্তি খারিজ না করা পর্যন্ত বা প্রত্যাহার না হওয়া পর্যন্ত রেজিস্ট্রার বিয়ে সম্পাদন করবেন না।",
      en: "Solemnization remains stayed until the District Court decides the validity of the objection."
    },
    keywords: ["procedure on objection", "district court suit", "আপত্তি নিষ্পত্তি", "দেওয়ানি মামলা", "section 7", "ধারা ৭"]
  },
  "8": {
    title: { bn: "আদালতে মামলা দায়েরের সার্টিফিকেট দাখিল (ধারা ৮)", en: "Certificate of Suit Filing Lodged with Registrar (Section 8)" },
    plainExplanation: {
      bn: "আপত্তিকারী ব্যক্তি আপত্তি দায়েরের দিন হইতে ১৪ দিনের মধ্যে সংশ্লিষ্ট দেওয়ানি আদালতে মামলা দায়ের করিয়া তাহার সার্টিফিকেট রেজিস্ট্রারের নিকট দাখিল করিতে বাধ্য থাকিবেন।",
      en: "Requires the objector to institute a suit in the competent civil court and lodge a certificate of suit institution with the Registrar within 14 days of filing the objection."
    },
    caution: {
      bn: "১৪ দিনের মধ্যে আপত্তিকারী আদালতের সার্টিফিকেট দাখিল করতে ব্যর্থ হলে আপত্তিটি বাতিল হয়ে যাবে এবং বিয়ে সম্পন্ন করা যাবে।",
      en: "Failure by the objector to file court proceedings within 14 days automatically discharges the objection."
    },
    keywords: ["certificate of suit", "14 days court certificate", "মামলার সার্টিফিকেট", "আপত্তি বাতিল", "section 8", "ধারা ৮"]
  },
  "9": {
    title: { bn: "ভিত্তিহীন ও অযৌক্তিক আপত্তির জন্য ক্ষতিপূরণ ও জরিমানা (ধারা ৯)", en: "Court May Fine Frivolous and Malicious Objectors (Section 9)" },
    plainExplanation: {
      bn: "দেওয়ানি আদালত যদি দেখে যে আপত্তিটি যুক্তিসঙ্গত নহে এবং ইচ্ছাকৃতভাবে হয়রানির উদ্দেশ্যে করা হইয়াছে, তবে আদালত আপত্তিকারীকে অনধিক ১,০০০ (এক হাজার) টাকা জরিমানা করিতে পারিবে এবং উক্ত টাকা ক্ষতিপূরণ হিসেবে বর বা কনেকে প্রদান করা হইবে।",
      en: "Empowers the District Court to fine the objector up to 1,000 BDT if the objection is found frivolous, unreasonable, or maliciously intended to harass, awarding the fine to the parties as compensation."
    },
    caution: {
      bn: "বিয়েতে অযৌক্তিক বাধা দিলে আপত্তিকারীকে জরিমানার মুখোমুখি হতে হয়।",
      en: "Deters bad-faith interferences with civil marriages."
    },
    keywords: ["frivolous objection fine", "compensation objector", "ভিত্তিহীন আপত্তির জরিমানা", "১০০০ টাকা জরিমানা", "section 9", "ধারা ৯"]
  },
  "10": {
    title: { bn: "পক্ষদ্বয় ও তিন সাক্ষীর ঘোষণা প্রদান (ধারা ১০)", en: "Declaration by Parties and Three Witnesses (Section 10)" },
    plainExplanation: {
      bn: "বিবাহ অনুষ্ঠানের পূর্বে বর ও কনে এবং অন্যূন ৩ (তিন) জন উপযুক্ত সাক্ষীকে রেজিস্ট্রারের সম্মুখে তৃতীয় তফসিলে বর্ণিত ফরমে লিখিত ঘোষণা স্বাক্ষর করিতে হইবে।",
      en: "Prior to solemnization, both parties and at least three (3) credible witnesses must sign a statutory declaration in the form contained in the Third Schedule before the Registrar."
    },
    caution: {
      bn: "তিনজন প্রাপ্তবয়স্ক সাক্ষীর উপস্থিতি ও স্বাক্ষর ছাড়া এই বিবাহ আইনিভাবে সম্পন্ন হতে পারে না।",
      en: "The presence and countersignature of three witnesses is a mandatory statutory condition of validity."
    },
    keywords: ["declaration by parties", "three witnesses", "তিনজন সাক্ষী", "স্বাক্ষরিত ঘোষণা", "section 10", "ধারা ১০"]
  },
  "11": {
    title: { bn: "বিবাহ যেভাবে সম্পন্ন হইবে (ধারা ১১)", en: "Solemnization of Marriage (Section 11)" },
    plainExplanation: {
      bn: "বিবাহটি রেজিস্ট্রারের উপস্থিতিতে এবং তিন জন সাক্ষীর সম্মুখে পক্ষদ্বয়ের পারস্পরিক সম্মতির ভিত্তিতে যেকোনো শালীন পদ্ধতিতে সম্পন্ন হইতে পারে। তবে প্রত্যেক পক্ষকে প্রকাশ্যে বলিতে হইবে: 'আমি (নাম) তোমাকে (নাম) আমার বৈধ স্বামী/স্ত্রী হিসেবে গ্রহণ করিলাম'।",
      en: "Marriage may be solemnized in any form chosen by the parties in the presence of the Registrar and three witnesses, provided each party explicitly declares: 'I, (A), take thee, (B), to be my lawful wife (or husband)'."
    },
    caution: {
      bn: "ধর্মীয় মন্ত্র বা আচার না থাকলেও এই আনুষ্ঠানিক ঘোষণাটি প্রদান করা আইনগতভাবে বাধ্যতামূলক।",
      en: "Statutory verbal exchange of mutual consent is mandatory regardless of religious ceremony."
    },
    keywords: ["solemnization of marriage", "lawful husband wife", "বিবাহ অনুষ্ঠান", "সম্মতি ঘোষণা", "section 11", "ধারা ১১"]
  },
  "12": {
    title: { bn: "বিবাহ অনুষ্ঠানের স্থান (ধারা ১২)", en: "Place Where Marriage May Be Solemnized (Section 12)" },
    plainExplanation: {
      bn: "বিবাহ রেজিস্ট্রারের কার্যালয়ে অথবা অতিরিক্ত সরকারি ফি পরিশোধ সাপেক্ষে রেজিস্ট্রারের এখতিয়ারভুক্ত এলাকার যেকোনো উপযুক্ত স্থানে অনুষ্ঠিত হইতে পারে।",
      en: "The marriage may be celebrated either at the office of the Marriage Registrar or, upon payment of prescribed travel fees, at any other designated place within the Registrar's local jurisdiction."
    },
    caution: {
      bn: "কার্যালয়ের বাইরে বিয়ে সম্পন্ন করাতে হলে রেজিস্ট্রারের নির্ধারিত যাতায়াত ফি পরিশোধ করতে হয়।",
      en: "Solemnization at private residences requires payment of statutory off-site registrar fees."
    },
    keywords: ["place of marriage", "registrar office", "বিবাহের স্থান", "রেজিস্ট্রার অফিস", "section 12", "ধারা ১২"]
  },
  "13": {
    title: { bn: "বিবাহের সার্টিফিকেট প্রদান ও নিবন্ধন (ধারা ১৩)", en: "Certificate of Marriage and Entry in Register (Section 13)" },
    plainExplanation: {
      bn: "বিবাহ সম্পন্ন হইবার পরপরই রেজিস্ট্রার নির্ধারিত চতুর্থ তফসিলে একটি সার্টিফিকেট প্রস্তুত করিবেন এবং তাহা 'ম্যারেজ সার্টিফিকেট বুক' এ লিপিবদ্ধ করিবেন। সার্টিফিকেটটিতে পক্ষদ্বয়, তিন সাক্ষী ও রেজিস্ট্রার স্বাক্ষর করিবেন। এই সার্টিফিকেটটি বিবাহের চূড়ান্ত প্রামাণ্য দলিল (Conclusive Proof)।",
      en: "Immediately following solemnization, the Registrar enters a marriage certificate in the Marriage Certificate Book signed by both parties, three witnesses, and the Registrar. The certificate is conclusive proof of the valid celebration of marriage."
    },
    caution: {
      bn: "রেজিস্ট্রি করা এই সার্টিফিকেটটি দেশ-বিদেশে সকল আদালত ও সরকারি দপ্তরে বিয়ের অবিসংবাদিত প্রমাণ হিসেবে গৃহীত হয়।",
      en: "The certified entry serves as unimpeachable evidence of lawful marital status across domestic and international authorities."
    },
    keywords: ["marriage certificate", "certificate book", "বিবাহের সার্টিফিকেট", "ম্যারেজ সার্টিফিকেট", "conclusive proof marriage", "section 13", "ধারা ১৩"]
  },
  "13A": {
    title: { bn: "রেজিস্ট্রার জেনারেলের নিকট অনুলিপি প্রেরণ (ধারা ১৩ক)", en: "Transmission of Certified Copies to Registrar General (Section 13A)" },
    plainExplanation: {
      bn: "ম্যারেজ রেজিস্ট্রার নির্দিষ্ট সময় পরপর তাহার ম্যারেজ সার্টিফিকেট বুকের সকল এন্ট্রির প্রত্যায়িত অনুলিপি সরকারের জন্ম, মৃত্যু ও বিবাহ রেজিস্ট্রি মহা-পরিদর্শকের (Registrar General) নিকট সংরক্ষণের জন্য প্রেরণ করিবেন।",
      en: "Requires the Marriage Registrar to transmit certified true copies of all entries made in the Marriage Certificate Book to the Registrar General of Births, Deaths and Marriages for permanent national archiving."
    },
    caution: {
      bn: "সরকারি কেন্দ্রীয় আর্কাইভে রেকর্ড সংরক্ষিত থাকার কারণে মূল সার্টিফিকেট হারিয়ে গেলেও নকল তোলা যায়।",
      en: "Guarantees that certified historical duplicates can always be extracted from central archives."
    },
    keywords: ["registrar general transmission", "archival copy", "কেন্দ্রীয় সংরক্ষণ", "অনুলিপি প্রেরণ", "section 13a", "ধারা ১৩ক"]
  },
  "14": {
    title: { bn: "রেজিস্ট্রেশন ফি (ধারা ১৪)", en: "Fees Payable to Marriage Registrar (Section 14)" },
    plainExplanation: {
      bn: "নোটিশ দাখিল, সার্টিফিকেট ইস্যু এবং রেজিস্ট্রারের কার্যালয়ের বাইরে উপস্থিতির জন্য সরকার কর্তৃক নির্ধারিত সরকারি ফি প্রযোজ্য হইবে।",
      en: "Prescribes official statutory fees for receiving notice, solemnizing marriage, issuing certified true copies, and travel expenses."
    },
    caution: {
      bn: "সরকার নির্ধারিত ফি ব্যতিরেকে অতিরিক্ত ফি দাবি করা আইনত দণ্ডনীয়।",
      en: "Registrars are bound strictly by government-gazetted fee structures."
    },
    keywords: ["marriage fees", "registration fees", "রেজিস্ট্রেশন ফি", "সরকারি ফি", "section 14", "ধারা ১৪"]
  },
  "15": {
    title: { bn: "বিবাহিত ব্যক্তি পুনরায় বিশেষ বিয়ে করার দণ্ড (ধারা ১৫)", en: "Penalty on Married Person Contracting Second Marriage (Section 15)" },
    plainExplanation: {
      bn: "কোনো বিবাহিত ব্যক্তি তাহার প্রথম বিবাহ বহাল থাকা অবস্থায় এই আইনের অধীন পুনরায় বিবাহ করিলে তিনি দণ্ডবিধির ৪৯৪ বা ৪৯৫ ধারা অনুযায়ী দ্বি-বিবাহের অপরাধে সর্বোচ্চ ৭ বৎসর পর্যন্ত কারাদণ্ডে দণ্ডিত হইবেন এবং উক্ত বিবাহটি সম্পূর্ণ অবৈধ ও বাতিল (Void) হইবে।",
      en: "Any person who, while married, contracts a second marriage under this Act is deemed guilty of bigamy under Sections 494 and 495 of the Penal Code (punishable with up to 7 years imprisonment), and the subsequent marriage is void ab initio."
    },
    caution: {
      bn: "বিশেষ বিবাহ আইনে কোনো অবস্থাতেই দ্বিতীয় বিয়ে বা বহুবিবাহ করার কোনো সুযোগ নেই।",
      en: "Strict monogamy: Prior subsisting marriage completely nullifies any subsequent civil marriage under this Act."
    },
    keywords: ["penalty second marriage", "bigamy penalty", "দ্বি বিবাহ দণ্ড", "বহুবিবাহ নিষিদ্ধ", "penal code 494", "section 15", "ধারা ১৫"]
  },
  "16": {
    title: { bn: "দ্বি-বিবাহের ফৌজদারি শাস্তি (ধারা ১৬)", en: "Criminal Punishment for Bigamy (Section 16)" },
    plainExplanation: {
      bn: "এই আইনের অধীন বিবাহিত কোনো ব্যক্তি তাহার এই বিবাহ বহাল থাকা অবস্থায় অন্য কোনো আইনের অধীনেও দ্বিতীয় বিবাহ করিতে পারিবে না; করিলে তিনি দণ্ডবিধির ৪৯৪ বা ৪৯৫ ধারায় শাস্তিযোগ্য হইবেন।",
      en: "Every person married under this Act who, during the lifetime of their spouse, contracts any other marriage (even under personal religious laws) is liable to criminal prosecution for bigamy under the Penal Code."
    },
    caution: {
      bn: "বিশেষ বিয়ে করার পর ইসলাম বা অন্য কোনো ধর্মের ব্যক্তিগত আইন দেখিয়ে স্বামী দ্বিতীয় বিয়ে করলে তা সরাসরি শাস্তিযোগ্য অপরাধ হবে।",
      en: "Subsequent religious conversion or reliance on personal law cannot validate a second marriage while the civil marriage subsists."
    },
    keywords: ["punishment bigamy", "dwi bibaho", "দ্বি বিবাহের শাস্তি", "penal code 495", "section 16", "ধারা ১৬"]
  },
  "17": {
    title: { bn: "বিবাহবিচ্ছেদে ডিভোর্স অ্যাক্ট ১৮৬৯ এর প্রয়োগ (ধারা ১৭)", en: "Divorce Act to Apply for Dissolution and Separation (Section 17)" },
    plainExplanation: {
      bn: "এই আইনের অধীন সম্পাদিত বিবাহের বিবাহবিচ্ছেদ (Dissolution of Marriage), বিবাহ বাতিল ঘোষণা (Nullity of Marriage) অথবা জুডিশিয়াল সেপারেশনের ক্ষেত্রে Divorce Act, 1869 এর বিধানাবলি প্রযোজ্য হইবে। পক্ষগণ দেওয়ানি জেলা জজ আদালতে বিবাহবিচ্ছেদের মামলা দায়ের করিতে পারেন।",
      en: "Declares that the Divorce Act, 1869 applies to all marriages solemnized under this Act for dissolution of marriage, declaration of nullity, and judicial separation before the civil District Judge."
    },
    caution: {
      bn: "মুসলিম ব্যক্তিগত আইনের মৌখিক তালাক বা নোটিশের তালাক এই বিশেষ বিয়ের ক্ষেত্রে প্রযোজ্য নয়; আদালতের মাধ্যমে ডিভোর্স নিতে হয়।",
      en: "Marriages contracted under this Act cannot be dissolved unilaterally or by religious talaq; dissolution requires a decree from the District Court."
    },
    keywords: ["divorce act 1869", "special marriage divorce", "বিবাহ বিচ্ছেদ", "ডিভোর্স অ্যাক্ট", "judicial separation", "district judge divorce", "section 17", "ধারা ১৭"]
  },
  "18": {
    title: { bn: "সন্তানদের বৈধতা ও উত্তরাধিকার (ধারা ১৮)", en: "Status and Legitimacy of Children (Section 18)" },
    plainExplanation: {
      bn: "এই আইনের অধীন বিবাহিত দম্পতির ঔরসজাত সকল সন্তান আইনত বৈধ (Legitimate) বলিয়া গণ্য হইবে এবং তাহারা পিতামাতার সম্পত্তির পূর্ণ উত্তরাধিকারী হইবে।",
      en: "Affirms that all children born of marriages celebrated under this Act are fully legitimate and entitled to legal inheritance from their parents."
    },
    caution: {
      bn: "ভিন্ন ধর্মের দম্পতির সন্তান হিসেবে কোনো সন্তানের উত্তরাধিকার বা বৈধতা নিয়ে প্রশ্ন তোলা যাবে না।",
      en: "Statutory legitimacy shields children from religious inheritance challenges."
    },
    keywords: ["legitimacy of children", "child inheritance", "সন্তানের বৈধতা", "উত্তরাধিকার অধিকার", "section 18", "ধারা ১৮"]
  },
  "19": {
    title: { bn: "অন্য আইনে সম্পাদিত বিবাহের বৈধতা সংরক্ষণ (ধারা ১৯)", en: "Saving of Other Religious Marriages (Section 19)" },
    plainExplanation: {
      bn: "এই আইনের কোনো বিধান ব্যক্তিগত ধর্মীয় অনুশাসন বা অন্যান্য আইনের অধীনে সম্পাদিত বৈধ বিবাহকে প্রভাবিত করিবে না।",
      en: "Savings provision clarifying that nothing in this Act affects the validity of any marriage solemnized under other existing personal religious laws or customs."
    },
    caution: {
      bn: "এটি বিশেষ দেওয়ানি বিকল্প ব্যবস্থা, প্রথাগত ধর্মীয় বিয়েকে রহিত করে না।",
      en: "Operates as a parallel civil option without displacing conventional religious statutes."
    },
    keywords: ["saving other marriages", "dhormiyo biye", "ধর্মীয় বিবাহ হেফাজত", "section 19", "ধারা ১৯"]
  },
  "20": {
    title: { bn: "ধারা ২০ [রহিত] (ধারা ২০)", en: "Section 20 [Repealed] (Section 20)" },
    plainExplanation: {
      bn: "এই ধারাটি পূর্ববর্তী সংশোধনের মাধ্যমে আইন হইতে রহিত (Repealed) করা হইয়াছে।",
      en: "This section was formally repealed by subsequent amending legislation."
    },
    caution: {
      bn: "রহিতকৃত ধারা, বর্তমানে কোনো সক্রিয় বিধান নেই।",
      en: "Repealed provision with zero current statutory effect."
    },
    keywords: ["repealed section 20", "rohit", "রহিত", "section 20", "ধারা ২০"]
  },
  "21": {
    title: { bn: "মিথ্যা ঘোষণা বা সার্টিফিকেটের জন্য দণ্ড (ধারা ২১)", en: "Penalty for False Statements or Declarations (Section 21)" },
    plainExplanation: {
      bn: "কোনো ব্যক্তি যদি এই আইনের অধীন নোটিশ বা ঘোষণাপত্রে ইচ্ছাকৃতভাবে মিথ্যা তথ্য প্রদান করেন বা মিথ্যা স্বাক্ষর করেন, তবে তিনি Penal Code এর ধারা ১৯৯ অনুযায়ী আদালতের মিথ্যা সাক্ষ্যের অপরাধে ৩ বৎসর পর্যন্ত কারাদণ্ডে দণ্ডিত হইবেন।",
      en: "Any person who knowingly signs any false declaration or certificate required under this Act is punishable under Section 199 of the Penal Code for making a false declaration receivable as evidence (up to 3 years imprisonment)."
    },
    caution: {
      bn: "বয়স বা পূর্বের বিয়ে গোপন করে হলফনামা দিলে সরাসরি ৩ বছরের ফৌজদারি কারাদণ্ড হতে পারে।",
      en: "Concealing age or existing marital status in statutory declarations triggers criminal prosecution."
    },
    keywords: ["false declaration penalty", "mithya shonglap", "মিথ্যা ঘোষণার শাস্তি", "penal code 199", "perjury marriage", "section 21", "ধারা ২১"]
  },
  "22": {
    title: { bn: "যৌথ হিন্দু পরিবার হইতে পৃথকীকরণ (ধারা ২২)", en: "Effect of Marriage on Undivided Joint Family (Section 22)" },
    plainExplanation: {
      bn: "হিন্দু, বৌদ্ধ, শিখ বা জৈন ধর্মের কোনো ব্যক্তি এই আইনের অধীন বিবাহ করিলে তিনি তাহার অবিভক্ত যৌথ পরিবার (Joint Family / Coparcenary) হইতে আইনত পৃথক (Severance) বলিয়া গণ্য হইবেন।",
      en: "Provides that the marriage of any member of an undivided Hindu, Buddhist, Sikh, or Jaina family under this Act effects a statutory severance of that person from such joint family."
    },
    caution: {
      bn: "যৌথ পরিবার থেকে পৃথক হলেও তার নিজস্ব অর্জিত সম্পত্তি ও প্রাপ্য অংশের অধিকার অক্ষুণ্ণ থাকে।",
      en: "Severance operates as a statutory partition of coparcenary status."
    },
    keywords: ["severance joint family", "hindu joint family", "যৌথ পরিবার পৃথকীকরণ", "coparcenary effect", "section 22", "ধারা ২২"]
  },
  "23": {
    title: { bn: "উত্তরাধিকারের বিশেষ অধিকার (ধারা ২৩)", en: "Rights of Succession in Certain Cases (Section 23)" },
    plainExplanation: {
      bn: "এই আইনের অধীন বিবাহ করা সত্ত্বেও ব্যক্তি তাহার পূর্বপুরুষ বা পরিবারের সম্পত্তিতে সাধারণ উত্তরাধিকারের অধিকার হইতে বঞ্চিত হইবেন না (Caste Disabilities Removal Act এর অনুরূপ সুরক্ষা)।",
      en: "Guarantees that marriage under this Act does not deprive a person of any right of succession or inheritance which they would otherwise have enjoyed under personal succession rules."
    },
    caution: {
      bn: "ভিন্ন ধর্মে বিয়ের কারণে পরিবার কাউকে পৈতৃক সম্পত্তির বৈধ উত্তরাধিকার থেকে বঞ্চিত করতে পারে না।",
      en: "Civil interfaith marriage cannot be used as a legal pretext to disinherit a person from ancestral estate."
    },
    keywords: ["succession rights interfaith", "uttoradhikar odhikar", "পৈতৃক সম্পত্তিতে অধিকার", "inheritance protection", "section 23", "ধারা ২৩"]
  },
  "24": {
    title: { bn: "সম্পত্তির উত্তরাধিকার সাকসেশন অ্যাক্ট ১৯২৫ দ্বারা পরিচালিত হওয়া (ধারা ২৪)", en: "Succession to Property Regulated by Succession Act, 1925 (Section 24)" },
    plainExplanation: {
      bn: "এই আইনের অধীন বিবাহিত ব্যক্তিদের স্বোপার্জিত এবং যাবতীয় সম্পত্তির উত্তরাধিকার ও বণ্টন The Succession Act, 1925 এর বিধানাবলি দ্বারা সরাসরি পরিচালিত হইবে (ব্যক্তিগত ধর্মীয় আইন প্রযোজ্য হইবে না)।",
      en: "Mandates that succession to the property of any person who marries under this Act, and to the property of their issue, shall be regulated exclusively by the provisions of the Succession Act, 1925, rather than personal religious succession laws."
    },
    caution: {
      bn: "দম্পতির মৃত্যুর পর তাদের সম্পত্তির বণ্টন ফরায়েজ বা হিন্দু দায়ভাগ নয়, বরং ১৯২৫ সালের সাকসেশন আইন অনুযায়ী সন্তান ও স্বামী-স্ত্রীর মধ্যে বণ্টিত হয়।",
      en: "Excludes personal religious inheritance rules; estate devolution follows the secular statutory scheme of the Succession Act."
    },
    keywords: ["succession act applies", "property devolution", "সাকসেশন আইন প্রযোজ্য", "উত্তরাধিকার বণ্টন", "succession act 1925", "section 24", "ধারা ২৪"]
  },
  "25": {
    title: { bn: "সন্তান দত্তক গ্রহণের অধিকারের সীমাবদ্ধতা (ধারা ২৫)", en: "Restrictions on Right of Adoption (Section 25)" },
    plainExplanation: {
      bn: "এই আইনের অধীন বিবাহিত কোনো ব্যক্তি প্রথাগত ধর্মীয় রীতির আওতায় সন্তান দত্তক (Adoption) গ্রহণের অধিকার দাবি করিতে পারিবেন না।",
      en: "Provides that no person marrying under this Act shall have any right of adoption under customary personal religious laws."
    },
    caution: {
      bn: "অভিভাবকত্ব প্রয়োজন হলে Guardians and Wards Act, 1890 এর অধীনে আদালতের মাধ্যমে বৈধ জিম্মাদারী গ্রহণ করতে হয়।",
      en: "Statutory guardianship under the Guardians and Wards Act 1890 must be pursued instead of customary adoption."
    },
    keywords: ["adoption restriction", "dottok grohon shima", "দত্তক গ্রহণের অধিকার", "adoption special marriage", "section 25", "ধারা ২৫"]
  },
  "26": {
    title: { bn: "পিতার দত্তক গ্রহণের অধিকার (ধারা ২৬)", en: "Adoption by Father of Person Marrying under Act (Section 26)" },
    plainExplanation: {
      bn: "এই আইনের অধীন বিবাহিত কোনো ব্যক্তির পিতা যদি হিন্দু ধর্মাবলম্বী হন এবং তাহার আর কোনো জীবিত পুত্র না থাকে, তবে পিতা অন্য কোনো ব্যক্তিকে আইনসম্মতভাবে দত্তক গ্রহণ করিতে পারিবেন।",
      en: "Preserves the right of a Hindu father whose only son marries under this Act to adopt another son under Hindu personal law if he has no other surviving male issue."
    },
    caution: {
      bn: "হিন্দু পিতার ধর্মীয় পিণ্ডদান ও বংশরক্ষার ঐতিহ্যিক অধিকারকে সুরক্ষিত রাখতে এই বিশেষ বিধান রাখা হয়েছে।",
      en: "Accommodates traditional Hindu religious obligations regarding spiritual lineage."
    },
    keywords: ["adoption by father", "pita dottok grohon", "পিতার দত্তক গ্রহণ", "hindu father adoption", "section 26", "ধারা ২৬"]
  }
};

const provisions = [];
for (let i = 0; i < catalog.length; i++) {
  const cat = catalog[i];
  const secKey = cat.secNumStr.toUpperCase();
  const rawText = cleanHtmlToText(blocks[i][1]);
  const m = meta[secKey];
  if (!m) {
    console.warn(`Missing meta for Special Marriage section ${secKey}`);
    continue;
  }

  const id = `special-marriage-1872-${secKey.toLowerCase()}`;
  const prov = {
    id,
    actId: 'act_special_marriage_1872',
    sectionNumber: `Section ${secKey}`,
    categories: ['family'],
    title: m.title,
    originalText: rawText,
    originalLanguage: 'en',
    plainExplanation: m.plainExplanation,
    caution: m.caution,
    sourceUrl: cat.url,
    retrievalDate: '2026-11-01',
    effectiveDate: '1872-03-22',
    legalStatus: secKey === '20' ? 'repealed' : 'active',
    reviewStatus: 'verified',
    contentHash: sha256(rawText),
    keywords: m.keywords
  };
  provisions.push(prov);
}

fs.writeFileSync('scripts/generated_special_marriage_1872.json', JSON.stringify(provisions, null, 2), 'utf8');
console.log(`Generated ${provisions.length} provisions for The Special Marriage Act 1872`);
