import fs from 'node:fs';
import crypto from 'node:crypto';

const cat = JSON.parse(fs.readFileSync('scripts/new_family_catalog.json', 'utf8'))['act_succession_1925'];
const printHtml = fs.readFileSync('scripts/act-138-print.html', 'utf8');
const splits = printHtml.split(/<div[^>]*class=["'][^"']*txt-details[^"']*["'][^>]*>/i);

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
    title: { bn: "সংক্ষিপ্ত শিরোনাম (ধারা ১)", en: "Short Title (Section 1)" },
    plainExplanation: {
      bn: "এই আইনটি 'The Succession Act, 1925' (১৯২৫ সনের ৩৯ নং আইন) নামে অভিহিত এবং সমগ্র বাংলাদেশে কার্যকর।",
      en: "Designates the statute as the Succession Act, 1925 (Act No. XXXIX of 1925). It governs testamentary and intestate succession, probate, letters of administration, and succession certificates across Bangladesh."
    },
    caution: {
      bn: "মৃত ব্যক্তির দেনা, ব্যাংক ব্যালেন্স ও সঞ্চয়পত্র উত্তোলনে এই আইনের সাকসেশন সার্টিফিকেট সংবিধিবদ্ধ বাধ্যবাধকতা।",
      en: "Succession certificates under Part X are mandatory for collecting debts, securities, and deceased bank balances."
    },
    keywords: ["succession act 1925", "uttoradhikar ain 1925", "succession certificate bangladesh", "উত্তরাধিকার আইন ১৯২৫", "section 1", "ধারা ১"]
  },
  2: {
    title: { bn: "সংজ্ঞা ও পরিভাষা (ধারা ২)", en: "Definitions (Section 2)" },
    plainExplanation: {
      bn: "এই আইনে প্রশাসক (Administrator), নির্বাহক (Executor), উইল (Will), প্রবেট (Probate) এবং জেলা জজ সংজ্ঞায়িত করা হইয়াছে।",
      en: "Defines administrator, executor, probate, will, and District Judge. Establishes the jurisdictional framework for civil estate administration."
    },
    caution: {
      bn: "উইল বা অছিয়তের ক্ষেত্রে প্রবেট এবং ব্যাংক হিসাব বা ঋণের ক্ষেত্রে সাকসেশন সার্টিফিকেট প্রযোজ্য।",
      en: "Distinguishes between testamentary probate/letters of administration and debt succession certificates."
    },
    keywords: ["succession definitions", "executor probate", "will definition", "উইল প্রবেট", "section 2", "ধারা ২"]
  },
  214: {
    title: { bn: "মৃত ব্যক্তির দেনা ও ব্যাংক ব্যালেন্স আদায়ে সাকসেশন সার্টিফিকেট পূর্বশর্ত (ধারা ২১৪)", en: "Proof of Representative Title Precedent to Recovering Debts (Section 214)" },
    plainExplanation: {
      bn: "মৃত ব্যক্তির কোনো দেনাদার, ব্যাংক, আর্থিক প্রতিষ্ঠান বা সরকারের নিকট হইতে পাওনা অর্থ, সঞ্চয়পত্র, বন্ড, শেয়ার বা ব্যাংক ব্যালেন্স আদালতের মাধ্যমে আদায় করিতে হইলে প্রবেট, লেটার্স অব অ্যাডমিনিস্ট্রেশন অথবা সাকসেশন সার্টিফিকেট (Succession Certificate) দাখিল করা আইনত বাধ্যতামূলক পূর্বশর্ত।",
      en: "A foundational banking and succession provision: No Court shall pass a decree against a debtor of a deceased person for payment of his debt, nor shall banks, companies, or financial institutions release deposits, securities, or shares without production of probate, letters of administration, or a Succession Certificate granted under Part X."
    },
    caution: {
      bn: "ব্যাংক অ্যাকাউন্টে কোনো নমিনি না থাকলে বা জটিলতা দেখা দিলে আদালত হতে সাকসেশন সার্টিফিকেট না আনা পর্যন্ত ব্যাংক মৃত ব্যক্তির টাকা প্রদান করতে পারে না।",
      en: "Banks and financial entities are legally barred from disbursing deceased deposits to heirs without a valid Succession Certificate."
    },
    keywords: [
      "succession certificate mandatory",
      "bank balance deceased person",
      "section 214 succession",
      "মৃত ব্যক্তির ব্যাংক হিসাব",
      "সাকসেশন সার্টিফিকেট বাধ্যতামূলক",
      "সঞ্চয়পত্র উত্তোলন",
      "recovering debts of deceased",
      "ধারা ২১৪",
      "section 214"
    ]
  },
  370: {
    title: { bn: "সাকসেশন সার্টিফিকেট প্রদানের সীমাবদ্ধতা (ধারা ৩৭০)", en: "Restriction on Grant of Succession Certificates (Section 370)" },
    plainExplanation: {
      bn: "সাকসেশন সার্টিফিকেট কেবল মৃত ব্যক্তির পাওনা দেনা (Debts) এবং সিকিউরিটিজের (Securities - যেমন: সঞ্চয়পত্র, বন্ড, শেয়ার, ব্যাংক হিসাব) ক্ষেত্রে প্রযোজ্য। কোনো স্থাবর সম্পত্তি (জমি-জমা বা বাড়ি) বণ্টন বা স্বত্ব নির্ধারণের জন্য সাকসেশন সার্টিফিকেট প্রদান করা যায় না।",
      en: "Restricts the scope of succession certificates: Certificates under Part X can only be granted in respect of debts and securities (e.g. promissory notes, bank deposits, government bonds, shares, debentures). Certificates cannot be granted for immovable land or real estate titles (which require a partition suit)."
    },
    caution: {
      bn: "জমি বা বাড়ির জন্য সাকসেশন সার্টিফিকেট চাওয়া যায় না; এটি কেবল অস্থাবর আর্থিক পাওনা ও সিকিউরিটির জন্য প্রযোজ্য।",
      en: "Succession certificates do not confer or adjudicate title to immovable landed properties."
    },
    keywords: ["restriction succession certificate", "debts and securities only", "জমি সাকসেশন নয়", "সঞ্চয়পত্র ব্যাংক ব্যালেন্স", "ধারা ৩৭০", "section 370"]
  },
  371: {
    title: { bn: "সাকসেশন সার্টিফিকেট মঞ্জুরির এখতিয়ারসম্পন্ন আদালত (ধারা ৩৭১)", en: "Court Having Jurisdiction to Grant Certificate (Section 371)" },
    plainExplanation: {
      bn: "মৃত ব্যক্তি মৃত্যুর সময় যে জেলা জজের স্থানীয় এখতিয়ারের মধ্যে সাধারণত বসবাস করিতেছিলেন, সেই জেলার আদালত সাকসেশন সার্টিফিকেট প্রদানের অধিকারী। যদি বাংলাদেশে তাহার স্থায়ী বাসস্থান না থাকে, তবে তাহার সম্পত্তির যে অংশ যেখানে অবস্থিত, সেখানকার আদালত আবেদন গ্রহণ করিতে পারে।",
      en: "Territorial jurisdiction: The District Court (or delegated Senior Assistant Judge / Joint District Judge under Section 388) within whose jurisdiction the deceased ordinarily resided at the time of his death holds jurisdiction; or if no fixed place of abode, where any property of the deceased is found."
    },
    caution: {
      bn: "মৃত ব্যক্তির শেষ স্থায়ী বাসস্থান যে জেলায় ছিল, সেই জেলার আদালতে মামলা দায়ের করতে হবে।",
      en: "Filing in the wrong district court results in return of petition for lack of territorial jurisdiction."
    },
    keywords: ["jurisdiction succession certificate", "court for succession", "আদালতের এখতিয়ার", "জেলা জজ সাকসেশন", "স্থায়ী বাসস্থান", "ধারা ৩৭১", "section 371"]
  },
  372: {
    title: { bn: "সাকসেশন সার্টিফিকেটের দরখাস্ত ও প্রয়োজনীয় তথ্যাবলি (ধারা ৩৭২)", en: "Application for Succession Certificate (Section 372)" },
    plainExplanation: {
      bn: "সাকসেশন সার্টিফিকেটের আবেদন একটি স্বাক্ষরিত ও সত্যায়িত আরজির মাধ্যমে জেলা জজ আদালতে দাখিল করিতে হয়। দরখাস্তে মৃত ব্যক্তির মৃত্যুর সময় ও স্থান, স্থায়ী ঠিকানা, জীবিত নিকটাত্মীয় ও ওয়ারিশগণের বিবরণ, পারিবারিক ওয়ারিশান সনদ (Family Tree), মৃত্যুর সনদপত্র (Death Certificate) এবং পাওনা ঋণ ও ব্যাংক হিসাব/সিকিউরিটির সুনির্দিষ্ট তপশিল উল্লেখ করিতে হয়।",
      en: "Prescribes application particulars: The petition must be signed and verified by the petitioner, specifying the date and place of death, ordinary residence, family tree of surviving relatives and legal heirs, death certificate, and an itemized schedule of specific debts and securities (bank account numbers, branch, exact balance, share certificates)."
    },
    caution: {
      bn: "সকল বৈধ ওয়ারিশকে বিবাদী বা পক্ষভুক্ত না করলে এবং তপশিলে হিসাব নম্বর ভুল থাকলে সার্টিফিকেট বাতিল হতে পারে।",
      en: "Omitting lawful legal heirs or misstating account particulars can lead to revocation under Section 383."
    },
    keywords: [
      "application succession certificate",
      "succession petition",
      "সাকসেশন দরখাস্ত",
      "ওয়ারিশান সনদ",
      "মৃত্যু সনদ",
      "ব্যাংক হিসাব তপশিল",
      "heirs schedule",
      "ধারা ৩৭২",
      "section 372"
    ]
  },
  373: {
    title: { bn: "দরখাস্তের শুনানি ও সংক্ষিপ্ত বিচার পদ্ধতি (ধারা ৩৭৩)", en: "Procedure on Application and Summary Hearing (Section 373)" },
    plainExplanation: {
      bn: "আদালত দরখাস্ত প্রাপ্তির পর জাতীয় পত্রিকায় বিজ্ঞপ্তি (Citation) প্রকাশ এবং সকল ওয়ারিশের প্রতি নোটিশ জারির নির্দেশ দেন। নির্ধারিত দিনে কোনো আপত্তি না থাকিলে আদালত সংক্ষিপ্ত শুনানির মাধ্যমে আবেদনকারীকে সাকসেশন সার্টিফিকেট মঞ্জুর করেন। একাধিক দাবিদার থাকিলে আদালত সর্বোত্তম অধিকারসম্পন্ন ব্যক্তিকে সার্টিফিকেট প্রদান করেন।",
      en: "Hearing procedure: The court serves notice on all relatives and publishes a public citation in widely circulated daily newspapers. If no objection is lodged on the hearing date, the court conducts a summary inquiry into title and grants the certificate to the person holding the paramount legal right."
    },
    caution: {
      bn: "জাতীয় দৈনিকে বিজ্ঞপ্তি প্রকাশের মাধ্যমে জনসাধারণকে অবগত করা সংবিধিবদ্ধ বাধ্যতামূলক নিয়ম।",
      en: "Public newspaper citation is a mandatory procedural safeguard against fraudulent applications."
    },
    keywords: ["summary inquiry succession", "citation newspaper", "পত্রিকায় বিজ্ঞপ্তি", "শুনানি পদ্ধতি", "grant of certificate", "ধারা ৩৭৩", "section 373"]
  },
  374: {
    title: { bn: "সার্টিফিকেটের বিষয়বস্তু ও ক্ষমতা (ধারা ৩৭৪)", en: "Contents and Powers Conferred by Certificate (Section 374)" },
    plainExplanation: {
      bn: "আদালত সার্টিফিকেটে সুনির্দিষ্টভাবে উল্লেখ করিবেন যে সার্টিফিকেটধারী ব্যক্তি কোন কোন ঋণ বা সিকিউরিটিজের টাকা উত্তোলন করিতে পারিবেন, সুদ বা লভ্যাংশ গ্রহণ করিতে পারিবেন অথবা উক্ত সিকিউরিটি হস্তান্তর বা ভাঙাইতে পারিবেন।",
      en: "Specifies that the certificate shall expressly empower the grantee to receive interest or dividends on the securities, to negotiate or transfer them, or to collect and give valid discharge for the specified debts."
    },
    caution: {
      bn: "সার্টিফিকেটে যে ব্যাংকের হিসাব বা সিকিউরিটির সুনির্দিষ্ট উল্লেখ থাকে, কেবল সেই অর্থই উত্তোলন করা যায়।",
      en: "The grantee cannot withdraw sums from any bank account not expressly scheduled in the certificate."
    },
    keywords: ["contents of certificate", "powers of grantee", "সার্টিফিকেটের ক্ষমতা", "টাকা উত্তোলনের ক্ষমতা", "ধারা ৩৭৪", "section 374"]
  },
  375: {
    title: { bn: "সার্টিফিকেট গ্রহীতার নিকট হইতে জামানত তলব (ধারা ৩৭৫)", en: "Requisition of Security from Grantee (Section 375)" },
    plainExplanation: {
      bn: "আদালত অন্যান্য ওয়ারিশ বা ঋণদাতাদের স্বার্থ সংরক্ষণের জন্য উপযুক্ত মনে করিলে সার্টিফিকেট প্রদানের শর্ত হিসেবে আবেদনকারীকে বন্ড বা জামানত (Indemnity Bond / Security) দাখিল করিতে নির্দেশ দিতে পারেন।",
      en: "Empowers the District Court to require the grantee to execute a bond with sureties (indemnity bond) to ensure the rightful distribution of proceeds among all co-heirs and creditors."
    },
    caution: {
      bn: "অন্যান্য ওয়ারিশের অধিকার রক্ষার্থে আদালত জামানতদারসহ মুচলেকা চাইতে পারেন।",
      en: "Protects minor or absent heirs against misappropriation by the certificate holder."
    },
    keywords: ["security from grantee", "indemnity bond succession", "জামানত তলব", "মুচলেকা", "ওয়ারিশের সুরক্ষা", "ধারা ৩৭৫", "section 375"]
  },
  376: {
    title: { bn: "সার্টিফিকেটের পরিধি সম্প্রসারণ (ধারা ৩৭৬)", en: "Extension of Certificate to Additional Debts (Section 376)" },
    plainExplanation: {
      bn: "সার্টিফিকেট পাওয়ার পর যদি মৃত ব্যক্তির আরও কোনো ব্যাংক হিসাব, সঞ্চয়পত্র বা পাওনা ঋণের সন্ধান পাওয়া যায়, তবে নতুন মামলা না করিয়া পূর্বের সার্টিফিকেটেই অতিরিক্ত তপশিল অন্তর্ভুক্ত করিয়া সম্প্রসারণের (Extension) আবেদন করা যায়।",
      en: "Authorizes the court, upon subsequent application, to extend the existing certificate to cover newly discovered debts or securities of the deceased without requiring a fresh suit."
    },
    caution: {
      bn: "অতিরিক্ত সিকিউরিটিজের জন্য আনুপাতিক অতিরিক্ত কোর্ট ফি দাখিল করতে হয়।",
      en: "Supplemental court fees must be paid on extended financial amounts."
    },
    keywords: ["extension of certificate", "shomprosharon", "সার্টিফিকেট সম্প্রসারণ", "নতুন ব্যাংক হিসাব সংযোজন", "ধারা ৩৭৬", "section 376"]
  },
  377: {
    title: { bn: "সার্টিফিকেটের নির্ধারিত ফরম (ধারা ৩৭৭)", en: "Forms of Certificate and Extended Certificate (Section 377)" },
    plainExplanation: {
      bn: "সাকসেশন সার্টিফিকেট এবং সম্প্রসারিত সার্টিফিকেট এই আইনের অষ্টম তফসিলে বর্ণিত নির্দিষ্ট সংবিধিবদ্ধ ফরমে আদালতের সিলমোহর ও বিচারকের স্বাক্ষরে জারি করিতে হয়।",
      en: "Directs that certificates and extensions be issued in the official statutory forms set forth in Schedule VIII under the seal of the court and signature of the judge."
    },
    caution: {
      bn: "নির্ধারিত ফরম ছাড়া সাধারণ কাগজে সার্টিফিকেট দিলে ব্যাংক তা গ্রহণ করবে না।",
      en: "Financial institutions require authentic court-stamped Schedule VIII certificates."
    },
    keywords: ["forms of certificate", "schedule viii", "নির্ধারিত ফরম", "আদালতের সিলমোহর", "ধারা ৩৭৭", "section 377"]
  },
  378: {
    title: { bn: "সিকিউরিটির ক্ষমতা সংক্রান্ত সংশোধন (ধারা ৩৭৮)", en: "Amendment of Certificate as to Securities (Section 378)" },
    plainExplanation: {
      bn: "আদালত সার্টিফিকেটধারীর আবেদনের ভিত্তিতে সার্টিফিকেটে উল্লিখিত সিকিউরিটিজ হস্তান্তর বা সুদ গ্রহণের ক্ষমতাসমূহ প্রয়োজন অনুযায়ী সংশোধন বা বর্ধিত করিতে পারিবে।",
      en: "Permits the court to amend the certificate regarding the grantee's powers to negotiate, transfer, or receive dividends on specified securities."
    },
    caution: {
      bn: "শেয়ার বিক্রয় বা ট্রান্সফারের বিশেষ ক্ষমতা যুক্ত করতে এই ধারায় সংশোধন চাওয়া যায়।",
      en: "Enables capital restructuring and asset liquidation under judicial supervision."
    },
    keywords: ["amendment of certificate", "songshodhon", "সার্টিফিকেট সংশোধন", "শেয়ার হস্তান্তর ক্ষমতা", "ধারা ৩৭৮", "section 378"]
  },
  379: {
    title: { bn: "কোর্ট ফি আদায়ের পদ্ধতি (ধারা ৩৭৯)", en: "Mode of Collecting Court Fees on Certificates (Section 379)" },
    plainExplanation: {
      bn: "Court-fees Act, 1870 এর তফসিল অনুযায়ী সার্টিফিকেটে দাবিকৃত মোট টাকার পরিমাণের উপর নির্দিষ্ট কোর্ট ফি সরকারি ট্রেজারিতে বা বিচারিক স্ট্যাম্পের মাধ্যমে দাখিল করিতে হয়। সার্টিফিকেট প্রস্তুত হওয়ার পূর্বে এই ফি প্রদান বাধ্যতামূলক।",
      en: "Prescribes collection of ad valorem court fees under the Court-fees Act, 1870 on the total financial valuation of scheduled debts/securities prior to issuing the certificate."
    },
    caution: {
      bn: "আদালত সার্টিফিকেট মঞ্জুর করার পর কোর্ট ফি জমা না দিলে মূল সার্টিফিকেট হস্তান্তর করা হয় না।",
      en: "Treasury chalan or judicial stamps must be deposited before the signed certificate is delivered."
    },
    keywords: ["court fees succession", "treasury chalan", "কোর্ট ফি আদায়", "ট্রেজারি চালান", "ad valorem court fees", "ধারা ৩৭৯", "section 379"]
  },
  380: {
    title: { bn: "সার্টিফিকেটের দেশব্যাপী কার্যকারিতা (ধারা ৩৮০)", en: "Local Extent of Certificate Throughout Bangladesh (Section 380)" },
    plainExplanation: {
      bn: "আদালত কর্তৃক প্রদত্ত সাকসেশন সার্টিফিকেট সমগ্র বাংলাদেশের যেকোনো ব্যাংক, কোম্পানি বা ঋণদাতার ক্ষেত্রে সমানভাবে প্রযোজ্য ও কার্যকর হইবে।",
      en: "Declares that a certificate granted by a competent court shall have full legal effect throughout the entire territory of Bangladesh."
    },
    caution: {
      bn: "এক জেলার আদালত থেকে প্রাপ্ত সার্টিফিকেট দিয়ে অন্য জেলার বা ঢাকার যেকোনো ব্যাংকের টাকা তোলা যায়।",
      en: "A valid certificate is universally enforceable across all administrative divisions and banking branches in Bangladesh."
    },
    keywords: ["local extent", "countrywide effect", "সমগ্র বাংলাদেশে কার্যকর", "দেশব্যাপী কার্যকারিতা", "ধারা ৩৮০", "section 380"]
  },
  381: {
    title: { bn: "সার্টিফিকেটের আইনগত ফলাফল ও দেনাদারের দায়মুক্তি (ধারা ৩৮১)", en: "Conclusive Effect of Certificate and Indemnity to Debtors (Section 381)" },
    plainExplanation: {
      bn: "সাকসেশন সার্টিফিকেটধারী ব্যক্তির নিকট কোনো ব্যাংক বা দেনাদার যদি পাওনা টাকা পরিশোধ করে, তবে উক্ত দেনাদার বা ব্যাংক মৃত ব্যক্তির সকল ওয়ারিশ ও তৃতীয় পক্ষের নিকট হইতে সম্পূর্ণ আইনি দায়মুক্তি (Indemnity) লাভ করিবে। সার্টিফিকেটের বিপরীতে করা পরিশোধ চূড়ান্ত ও প্রামাণ্য।",
      en: "A vital banking indemnity provision: Payment of debts or securities made to the holder of a Succession Certificate conclusively indemnifies and discharges the debtor (bank, financial company, or government agency) from all further liability against all heirs, claimants, and executors."
    },
    caution: {
      bn: "ব্যাংক সাকসেশন সার্টিফিকেটধারীকে টাকা দিয়ে দিলে অন্যান্য ওয়ারিশরা ব্যাংকের বিরুদ্ধে মামলা করতে পারে না; তাদের দাবি কেবল সার্টিফিকেটধারীর বিরুদ্ধে বর্তায়।",
      en: "Complete statutory shield protecting banks against conflicting inheritance disputes among family members."
    },
    keywords: [
      "effect of certificate",
      "indemnity to banks",
      "banker protection succession",
      "ব্যাংকের দায়মুক্তি",
      "চূড়ান্ত প্রমাণ",
      "conclusive discharge",
      "ধারা ৩৮১",
      "section 381"
    ]
  },
  382: {
    title: { bn: "বিদেশি আদালতের সার্টিফিকেটের কার্যকারিতা (ধারা ৩৮২)", en: "Effect of Foreign Succession Certificates (Section 382)" },
    plainExplanation: {
      bn: "বিদেশে নিযুক্ত বাংলাদেশের কোনো কূটনৈতিক প্রতিনিধি বা সরকার কর্তৃক স্বীকৃত বিদেশি আদালত কর্তৃক প্রদত্ত বা সম্প্রসারিত সার্টিফিকেট স্ট্যাম্পযুক্ত করা সাপেক্ষে বাংলাদেশে কার্যকর হইবে।",
      en: "Validates succession certificates granted or extended by accredited diplomatic representatives of Bangladesh in foreign states or recognized reciprocal foreign jurisdictions."
    },
    caution: {
      bn: "প্রবাসী মৃত ব্যক্তির বিদেশি সার্টিফিকেট বাংলাদেশে যথাযথ প্রামাণ্যকরণ ও ফি জমা সাপেক্ষে কার্যকর হয়।",
      en: "Requires diplomatic authentication and requisite local stamping for enforceability."
    },
    keywords: ["foreign succession certificate", "probashi certificate", "প্রবাসী উত্তরাধিকার", "বিদেশি সনদ", "ধারা ৩৮২", "section 382"]
  },
  383: {
    title: { bn: "সাকসেশন সার্টিফিকেট বাতিল ও প্রত্যাহার (ধারা ৩৮৩)", en: "Revocation of Succession Certificate (Section 383)" },
    plainExplanation: {
      bn: "আদালত নিম্নলিখিত কারণে যেকোনো সাকসেশন সার্টিফিকেট বাতিল করিতে পারেন: (১) কার্যধারায় গুরুতর ত্রুটি থাকিলে; (২) জালিয়াতি, তথ্য গোপন বা প্রতারণার মাধ্যমে সার্টিফিকেট গ্রহণ করিলে; (৩) কোনো তথ্য মিথ্যা প্রমাণিত হইলে; (৪) পরবর্তীতে কোনো বৈধ প্রবেট বা উইল প্রকাশিত হইলে; অথবা (৫) সার্টিফিকেটটি অকার্যকর হইয়া পড়িলে।",
      en: "Enumerates statutory grounds for revocation of certificate: (1) Defective proceedings; (2) Grant obtained fraudulently by misrepresentation or concealment of material facts (e.g. hiding legal heirs); (3) False allegations; (4) Discovery of a subsequent valid Will or Probate; (5) Certificate becoming inoperative."
    },
    caution: {
      bn: "অন্যান্য ওয়ারিশকে গোপন করে প্রতারণামূলকভাবে সার্টিফিকেট নিলে তা আদালতে আবেদন করে সরাসরি বাতিল করানো যায়।",
      en: "Aggrieved heirs excluded from proceedings can petition the court to set aside and revoke the fraudulent certificate."
    },
    keywords: [
      "revocation succession certificate",
      "certificate batil",
      "সার্টিফিকেট বাতিল",
      "জালিয়াতি তথ্য গোপন",
      "fraudulent certificate revocation",
      "ধারা ৩৮৩",
      "section 383"
    ]
  },
  384: {
    title: { bn: "হাইকোর্ট বিভাগে আপিল (ধারা ৩৮৪)", en: "Appeals to High Court Division (Section 384)" },
    plainExplanation: {
      bn: "জেলা জজ আদালত কর্তৃক সাকসেশন সার্টিফিকেট মঞ্জুর, প্রত্যাখ্যান বা বাতিল করিবার আদেশের বিরুদ্ধে সংক্ষুব্ধ ব্যক্তি হাইকোর্ট বিভাগে আপিল দায়ের করিতে পারিবেন।",
      en: "An appeal lies to the High Court Division of the Supreme Court of Bangladesh against any order of a District Court granting, refusing, or revoking a Succession Certificate."
    },
    caution: {
      bn: "অধস্তন আদালতের আদেশের বিরুদ্ধে জেলা জজে এবং জেলা জজের আদেশের বিরুদ্ধে সরাসরি হাইকোর্টে আপিল হয়।",
      en: "Appeals follow the statutory civil judicial hierarchy to the High Court Division."
    },
    keywords: ["appeal succession certificate", "high court appeal", "হাইকোর্টে আপিল", "আপিল এখতিয়ার", "ধারা ৩৮৪", "section 384"]
  },
  385: {
    title: { bn: "পূর্ববর্তী সার্টিফিকেট বা প্রবেটের ফলাফল (ধারা ৩৮৫)", en: "Effect of Previous Certificate, Probate, or Administration (Section 385)" },
    plainExplanation: {
      bn: "মৃত ব্যক্তির সম্পত্তির ক্ষেত্রে পূর্বেই কোনো উপযুক্ত আদালত কর্তৃক প্রবেট বা লেটার্স অব অ্যাডমিনিস্ট্রেশন মঞ্জুর হইয়া থাকিলে পরবর্তী সময়ে প্রদত্ত কোনো সাকসেশন সার্টিফিকেট বাতিল ও অকার্যকর হইবে।",
      en: "A succession certificate is void in respect of any debt or security to which a valid prior grant of probate or letters of administration applies."
    },
    caution: {
      bn: "উইলের প্রবেট থাকলে সাকসেশন সার্টিফিকেট বাতিল হয়ে প্রবেট প্রাধান্য পাবে।",
      en: "Testamentary probate grants enjoy legal primacy over general succession certificates."
    },
    keywords: ["effect previous probate", "probate supremacy", "প্রবেট প্রাধান্য", "পূর্ববর্তী সার্টিফিকেট", "ধারা ৩৮৫", "section 385"]
  },
  386: {
    title: { bn: "বাতিল সার্টিফিকেটের বিপরীতে সরল বিশ্বাসে প্রদত্ত অর্থের বৈধতা (ধারা ৩৮৬)", en: "Protection of Good Faith Payments on Invalid Certificates (Section 386)" },
    plainExplanation: {
      bn: "সার্টিফিকেট পরবর্তীতে বাতিল হইলেও, বাতিলের পূর্বে যদি কোনো ব্যাংক বা দেনাদার সরল বিশ্বাসে সার্টিফিকেটধারীকে টাকা প্রদান করিয়া থাকে, তবে উক্ত পরিশোধ বৈধ থাকিবে এবং দেনাদার দায়ী হইবে না।",
      en: "Validates payments made in good faith to a certificate holder prior to its revocation, protecting innocent debtors and banks from double payment liability."
    },
    caution: {
      bn: "আদালতের আনুষ্ঠানিক বাতিলের নোটিশ পাওয়ার পূর্বে ব্যাংক টাকা পরিশোধ করে দিলে ব্যাংক নির্দোষ হিসেবে গণ্য হবে।",
      en: "Debtors are exonerated from liability for disbursements made prior to receipt of judicial revocation notice."
    },
    keywords: ["good faith payment", "sorol bishwashe porishodh", "সরল বিশ্বাসে পরিশোধ", "protection innocent debtor", "ধারা ৩৮৬", "section 386"]
  },
  387: {
    title: { bn: "সার্টিফিকেট গ্রহীতার জবাবদিহিতা ও ওয়ারিশগণের অধিকার (ধারা ৩৮৭)", en: "Accountability of Certificate Holder and Heirs' Proprietary Rights (Section 387)" },
    plainExplanation: {
      bn: "সাকসেশন সার্টিফিকেট মঞ্জুর করার অর্থ এই নহে যে সার্টিফিকেটধারী ব্যক্তি একাই সমস্ত টাকার মালিক। তিনি একজন ট্রাস্টি (Trustee) বা প্রতিনিধি মাত্র। ব্যাংক হইতে টাকা উত্তোলনের পর তিনি আইন অনুযায়ী মৃত ব্যক্তির সকল বৈধ ওয়ারিশের মধ্যে তাহাদের প্রাপ্য অংশ বণ্টন করিতে বাধ্য থাকিবেন। বণ্টন না করিলে ওয়ারিশগণ দেওয়ানি আদালতে মামলা করিতে পারিবেন।",
      en: "A fundamental equitable safeguard: Grant of a Succession Certificate does not establish absolute ownership of the money in the holder; the grantee collects funds strictly as an accountable trustee and agent for all legal heirs. Any aggrieved co-heir retains the absolute right to sue the certificate holder in a civil court for their rightful share."
    },
    caution: {
      bn: "সার্টিফিকেট নিয়ে একা টাকা আত্মসাৎ করলে অন্য ওয়ারিশরা সার্টিফিকেটধারীর বিরুদ্ধে অর্থ আত্মসাৎ ও দেওয়ানি বণ্টনের মামলা করতে পারেন।",
      en: "The certificate holder is criminally and civilly liable to distribute realized sums strictly according to shares under personal succession law."
    },
    keywords: [
      "liability of certificate holder",
      "accountable trustee",
      "ওয়ারিশদের পাওনা বণ্টন",
      "টাকা বণ্টনের বাধ্যবাধকতা",
      "heirs rights against holder",
      "trustee capacity",
      "ধারা ৩৮৭",
      "section 387"
    ]
  },
  388: {
    title: { bn: "অধস্তন আদালতসমূহকে সাকসেশন এখতিয়ার অর্পণ (ধারা ৩৮৮)", en: "Investiture of Subordinate Courts with Succession Jurisdiction (Section 388)" },
    plainExplanation: {
      bn: "সরকার সরকারি গেজেটে প্রজ্ঞাপন দ্বারা জেলা জজ ছাড়াও সিনিয়র সহকারী জজ বা যুগ্ম জেলা জজ আদালতসমূহকে সাকসেশন সার্টিফিকেট সংক্রান্ত মামলা গ্রহণ ও নিষ্পত্তির ক্ষমতা প্রদান করিতে পারিবে। বাংলাদেশে সহকারী জজ ও যুগ্ম জেলা জজ আদালতসমূহ এই ক্ষমতা প্রয়োগ করেন।",
      en: "Empowers the Government to invest subordinate civil courts (Senior Assistant Judges and Joint District Judges as District Delegates) with the powers of a District Court to receive, try, and grant Succession Certificates."
    },
    caution: {
      bn: "উপজেলা ও জেলা পর্যায়ের সহকারী জজ বা যুগ্ম জেলা জজ আদালতেই সাধারণত সাকসেশন মোকদ্দমা দায়ের করা হয়।",
      en: "Civil subordinate courts operate as designated succession forums in practice."
    },
    keywords: ["subordinate court jurisdiction", "joint district judge succession", "যুগ্ম জেলা জজ", "সহকারী জজ সাকসেশন", "investiture of courts", "ধারা ৩৮৮", "section 388"]
  },
  389: {
    title: { bn: "বাতিল বা বাতিলকৃত সার্টিফিকেট সমর্পণ (ধারা ৩৮৯)", en: "Surrender of Revoked and Superseded Certificates (Section 389)" },
    plainExplanation: {
      bn: "আদালত কোনো সাকসেশন সার্টিফিকেট বাতিল করিলে বা অন্য সার্টিফিকেট দ্বারা প্রতিস্থাপিত করিলে পূর্বের সার্টিফিকেটধারী অবিলম্বে মূল সার্টিফিকেটটি আদালতে সমর্পণ করিতে বাধ্য থাকিবেন। সমর্পণ না করিলে আদালত জরিমানার আদেশ দিতে পারিবে।",
      en: "Mandates that when a certificate is superseded or revoked, the holder must forthwith surrender the original document to the issuing court. Failure to surrender without reasonable cause invites fine."
    },
    caution: {
      bn: "বাতিল সার্টিফিকেট ধরে রেখে টাকা তোলার চেষ্টা করা জালিয়াতি হিসেবে শাস্তিযোগ্য।",
      en: "Retaining a revoked certificate to solicit funds constitutes a punishable criminal offense."
    },
    keywords: ["surrender revoked certificate", "somorpon", "বাতিল সার্টিফিকেট সমর্পণ", "surrender of certificate", "ধারা ৩৮৯", "section 389"]
  }
};

const provisions = [];
for (const [secNumStr, m] of Object.entries(meta)) {
  const catItem = cat.find(s => s.secNumStr === secNumStr);
  const catIdx = cat.findIndex(s => s.secNumStr === secNumStr);
  if (!catItem || catIdx === -1) {
    console.warn(`Could not find catalog entry for succession sec ${secNumStr}`);
    continue;
  }
  const rawText = cleanHtmlToText(splits[catIdx + 1]);

  const prov = {
    id: `succession-1925-${secNumStr}`,
    actId: 'act_succession_1925',
    sectionNumber: `Section ${secNumStr}`,
    categories: ['family', 'rights'],
    title: m.title,
    originalText: rawText,
    originalLanguage: 'en',
    plainExplanation: m.plainExplanation,
    caution: m.caution,
    sourceUrl: catItem.url,
    retrievalDate: '2026-11-01',
    effectiveDate: '1925-09-30',
    legalStatus: 'active',
    reviewStatus: 'verified',
    contentHash: sha256(rawText),
    keywords: m.keywords
  };
  provisions.push(prov);
}

fs.writeFileSync('scripts/generated_succession_1925.json', JSON.stringify(provisions, null, 2), 'utf8');
console.log(`Generated ${provisions.length} provisions for The Succession Act 1925 (Succession Certificates)`);
