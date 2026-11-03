import fs from 'node:fs';
import crypto from 'node:crypto';

const extracted = JSON.parse(fs.readFileSync('scripts/family_sections_extracted.json', 'utf8'))['act_family_courts_2023'];
const existingProvs = JSON.parse(fs.readFileSync('src/data/corpus/provisions.json', 'utf8')).filter(p => p.actId === 'act_family_courts_2023');

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
    title: { bn: "সংক্ষিপ্ত শিরোনাম, প্রয়োগ ও প্রবর্তন (ধারা ১)", en: "Short Title, Application, and Commencement (Section 1)" },
    plainExplanation: {
      bn: "এই আইনটি 'পারিবারিক আদালত আইন, ২০২৩' (২০২৩ সনের ২৬ নং আইন) নামে অভিহিত। ইহা রাঙ্গামাটি, বান্দরবান ও খাগড়াছড়ি পার্বত্য জেলা ব্যতীত সমগ্র বাংলাদেশে কার্যকর এবং ১৮ সেপ্টেম্বর ২০২৩ তারিখ হইতে বলবৎ।",
      en: "Designates the statute as the Family Courts Act, 2023 (Act No. 26 of 2023). It applies across all districts of Bangladesh except the three Chittagong Hill Tracts districts (Rangamati, Bandarban, Khagrachhari) and came into force immediately on 18 September 2023."
    },
    caution: {
      bn: "১৯৮৫ সালের পূর্ববর্তী পারিবারিক আদালত অধ্যাদেশ রহিত করে এই আধুনিক আইন প্রণয়ন করা হয়েছে।",
      en: "Repeals and modernizes the Family Courts Ordinance, 1985 (Ordinance XVIII of 1985)."
    },
    keywords: ["family courts act 2023", "paribarik adalat ain 2023", "পারিবারিক আদালত আইন ২০২৩", "section 1", "ধারা ১", "short title"]
  },
  2: {
    title: { bn: "সংজ্ঞা ও আদালত গঠন (ধারা ২)", en: "Definitions and Court Hierarchy (Section 2)" },
    plainExplanation: {
      bn: "এই আইনে সহকারী জজ ও সিনিয়র সহকারী জজ আদালতকে 'পারিবারিক আদালত' এবং জেলা জজ ও অতিরিক্ত জেলা জজ আদালতকে 'পারিবারিক আপিল আদালত' হিসেবে সংজ্ঞায়িত করা হইয়াছে। এছাড়াও ইমেইল ও ইলেকট্রনিক সমন জারির আধুনিক সংজ্ঞা অন্তর্ভুক্ত করা হইয়াছে।",
      en: "Defines statutory terms including Assistant Judge / Senior Assistant Judge as Family Court Judges, District Judge / Additional District Judge as the Family Appellate Court, and introduces digital e-filing and email definitions."
    },
    caution: {
      bn: "পারিবারিক আদালত মূলত দেওয়ানি বিচার বিভাগের সহকারী জজ পর্যায় থেকে পরিচালিত হয়।",
      en: "Family courts operate within the subordinate civil judiciary framework under special statutory procedures."
    },
    keywords: ["definitions family courts", "assistant judge", "family appellate court", "সংজ্ঞা", "সহকারী জজ", "ধারা ২", "section 2"]
  },
  3: {
    title: { bn: "আইনের প্রাধান্য (ধারা ৩)", en: "Overriding Effect of the Act (Section 3)" },
    plainExplanation: {
      bn: "আপাতত বলবৎ অন্য কোনো আইনে যাহা কিছুই থাকুক না কেন, এই আইনের বিধানাবলি প্রাধান্য পাইবে।",
      en: "Non-obstante clause ensuring that the provisions of the Family Courts Act 2023 shall override and take precedence over any other inconsistent law."
    },
    caution: {
      bn: "দেওয়ানি কার্যবিধির জটিল কারিগরি নিয়ম পারিবারিক বিরোধ নিষ্পত্তিতে বাধা সৃষ্টি করতে পারে না।",
      en: "Technical rules of ordinary civil procedure cannot restrict or defeat proceedings under this Act."
    },
    keywords: ["overriding effect", "ainer pradhanno", "আইনের প্রাধান্য", "non obstante", "section 3", "ধারা ৩"]
  },
  4: {
    title: { bn: "পারিবারিক আদালত প্রতিষ্ঠা (ধারা ৪)", en: "Establishment of Family Courts (Section 4)" },
    plainExplanation: {
      bn: "সরকার সরকারি গেজেটে প্রজ্ঞাপন দ্বারা প্রত্যেক জেলায় এক বা একাধিক পারিবারিক আদালত প্রতিষ্ঠা করিবে এবং সহকারী জজ বা সিনিয়র সহকারী জজকে বিচারক হিসেবে দায়িত্ব প্রদান করিবে।",
      en: "Directs the Government to establish one or more Family Courts in every administrative district, designating Assistant Judges or Senior Assistant Judges to preside over such courts."
    },
    caution: {
      bn: "প্রত্যেক উপজেলা বা চৌকি আদালতে সহকারী জজগণ পারিবারিক আদালতের ক্ষমতাপ্রাপ্ত বিচারক হিসেবে দায়িত্ব পালন করেন।",
      en: "Assistant Judges exercising territorial jurisdiction in upazila/chowki courts act as Family Courts."
    },
    keywords: ["establishment family court", "paribarik adalat protishtha", "আদালত প্রতিষ্ঠা", "সহকারী জজ আদালত", "ধারা ৪", "section 4"]
  },
  5: {
    title: { bn: "পারিবারিক আদালতের বিষয়ভিত্তিক এখতিয়ার (ধারা ৫)", en: "Subject-Matter Jurisdiction over 5 Matrimonial Matters (Section 5)" },
    plainExplanation: {
      bn: "পারিবারিক আদালতের ৫টি সুনির্দিষ্ট পারিবারিক বিষয়ে মামলা গ্রহণ, বিচার ও নিষ্পত্তির একচ্ছত্র এখতিয়ার রয়েছে: (১) বিবাহ বিচ্ছেদ, (২) দাম্পত্য অধিকার পুনরুদ্ধার, (৩) দেনমোহর আদায়, (৪) স্ত্রী ও সন্তানের ভরণপোষণ, এবং (৫) অপ্রাপ্তবয়স্ক সন্তানের অভিভাবকত্ব ও তত্ত্বাবধান (কাস্টডি)।",
      en: "Under Section 5, Family Courts hold exclusive subject-matter jurisdiction to entertain, try, and dispose of suits relating to 5 specific matrimonial matters: (1) dissolution of marriage, (2) restitution of conjugal rights, (3) dower, (4) maintenance of wife and children, and (5) custody and guardianship of minor children."
    },
    caution: {
      bn: "মুসলিম পারিবারিক আইন অধ্যাদেশ ১৯৬১ এর সালিসি কাউন্সিলের এখতিয়ার অক্ষুণ্ণ রেখে এই আদালতের এখতিয়ার কার্যকর হয়।",
      en: "Subject to provisions of the Muslim Family Laws Ordinance, 1961."
    },
    keywords: [
      "family court",
      "divorce suit",
      "custody suit",
      "paribarik adalat",
      "পারিবারিক আদালত",
      "পারিবারিক মামলা",
      "দেনমোহরের মামলা",
      "দাম্পত্য অধিকার",
      "ভরণপোষণ মামলা",
      "সন্তানের কাস্টডি",
      "ধারা ৫",
      "section 5"
    ]
  },
  6: {
    title: { bn: "পারিবারিক মোকদ্দমা দায়ের ও স্থানীয় এখতিয়ার (ধারা ৬)", en: "Territorial Jurisdiction & Wife's Special Forum Entitlement (Section 6)" },
    plainExplanation: {
      bn: "মোকদ্দমার কারণ যেখানে উদ্ভূত হয়েছে বা পক্ষগণ যেখানে সর্বশেষ বসবাস করেছেন সেখানকার আদালতে মামলা করা যায়। তবে বিবাহ বিচ্ছেদ, দেনমোহর বা ভরণপোষণের মোকদ্দমায় স্ত্রী যেখানে সাধারণত বসবাস করেন, সেখানকার পারিবারিক আদালতেও মামলা দায়েরের বিশেষ সংবিধিবদ্ধ অধিকার স্ত্রীর রয়েছে।",
      en: "Section 6 establishes territorial jurisdiction: Suits may be filed where the cause of action arose or where the parties last resided together. Crucially, a wife filing for dissolution of marriage, dower, or maintenance is statutorily entitled to institute the suit in the Family Court within whose local jurisdiction she ordinarily resides."
    },
    caution: {
      bn: "স্ত্রী বাবার বাড়িতে অবস্থান করলেও সেখানেই স্বামীর বিরুদ্ধে দেনমোহর ও ভরণপোষণের মামলা দায়ের করতে পারেন।",
      en: "Aggrieved wives can institute suits in their own parental or present place of residence, without having to travel to the husband's jurisdiction."
    },
    keywords: [
      "family court jurisdiction",
      "place of suing wife",
      "where to file family suit",
      "পারিবারিক আদালত মামলা দায়ের",
      "স্ত্রীর বসবাস",
      "ধারা ৬",
      "section 6"
    ]
  },
  7: {
    title: { bn: "সমন ও নোটিশ জারিকরণ (ধারা ৭)", en: "Service of Summons and Notice (Section 7)" },
    plainExplanation: {
      bn: "আরজি দাখিলের পর আদালত বিবাদীর প্রতি অনধিক ৩০ দিনের মধ্যে হাজিরার জন্য সমন জারি করিবে। সমন সাধারণ জারি ছাড়াও রেজিস্ট্রি ডাকযোগে প্রাপ্তি স্বীকারপত্রসহ (AD) এবং ইমেইল বা ইলেকট্রনিক মাধ্যমে জারি করা যাইবে।",
      en: "Upon filing of plaint, the court issues summons fixing appearance within thirty (30) days. Summons is served by court process, registered post with acknowledgment due (AD), and modern electronic mail/digital messaging."
    },
    caution: {
      bn: "রেজিস্ট্রি ডাকে বিবাদী সমন গ্রহণে অস্বীকৃতি জানালে বা ডাক ফেরত আসলে সমন যথাযথ জারি হয়েছে বলে গণ্য হবে।",
      en: "Refusal to accept registered post or service returns deemed good and valid service under sub-section (4)."
    },
    keywords: ["summons family court", "somon jari", "সমন জারি", "registered post ad", "electronic summons", "ধারা ৭", "section 7"]
  },
  8: {
    title: { bn: "লিখিত জবাব দাখিল (ধারা ৮)", en: "Written Statement by Defendant (Section 8)" },
    plainExplanation: {
      bn: "বিবাদী নির্ধারিত তারিখে উপস্থিত হইয়া লিখিত জবাব দাখিল করিবেন। ব্যর্থ হইলে আদালত উপযুক্ত কারণ সাপেক্ষে অনধিক ২১ দিনের অতিরিক্ত সময় দিতে পারে।",
      en: "The defendant must file a written statement on the scheduled date. If unable to file, the court may grant an extension not exceeding twenty-one (21) days upon reasonable cause and cost imposition."
    },
    caution: {
      bn: "লিখিত জবাবে সমস্ত আত্মপক্ষ সমর্থনের যুক্তি, সাক্ষী ও দলিলের তালিকা সংযুক্ত করতে হবে।",
      en: "Pleadings must attach documentary evidence and witness list directly to the written statement."
    },
    keywords: ["written statement", "likhito jobab", "লিখিত জবাব", "w/s family court", "time limit written statement", "ধারা ৮", "section 8"]
  },
  9: {
    title: { bn: "আরজি ও লিখিত জবাব সংশোধন (ধারা ৯)", en: "Amendment of Plaint and Written Statement (Section 9)" },
    plainExplanation: {
      bn: "মোকদ্দমার যেকোনো পর্যায়ে করণিক ভুল সংশোধন বা ন্যায়বিচার নিশ্চিত করিবার উদ্দেশ্যে আদালত পক্ষগণের আবেদনের পরিপ্রেক্ষিতে আরজি বা লিখিত জবাব সংশোধনের আদেশ দিতে পারিবে।",
      en: "Authorizes the Family Court at any stage of proceedings to permit amendment of the plaint or written statement to rectify clerical errors or ensure substantial justice between the parties."
    },
    caution: {
      bn: "সংশোধনের মাধ্যমে মোকদ্দমার মূল বিষয়বস্তু বা প্রকৃতির আমূল পরিবর্তন করা যাবে না।",
      en: "Amendments cannot change the foundational character of the matrimonial claim."
    },
    keywords: ["amendment of plaint", "arji songshodhon", "আরজি সংশোধন", "written statement amendment", "ধারা ৯", "section 9"]
  },
  10: {
    title: { bn: "পক্ষগণের অনুপস্থিতির ফলাফল ও পুনঃবহাল (ধারা ১০)", en: "Consequences of Non-Appearance and Restoration (Section 10)" },
    plainExplanation: {
      bn: "শুনানির দিনে বাদী অনুপস্থিত থাকিলে আদালত মামলা খারিজ করিতে পারিবে; এবং কেবল বিবাদী অনুপস্থিত থাকিলে একতরফা শুনানি গ্রহণ করিতে পারিবে। খারিজ বা একতরফা আদেশের বিরুদ্ধে ৩০ দিনের মধ্যে আবেদন করিয়া মোকদ্দমা পুনঃবহাল করা যায়।",
      en: "If the plaintiff fails to appear on hearing date, the suit may be dismissed for default; if the defendant defaults, ex-parte proceedings proceed. Either party may apply for restoration or setting aside ex-parte orders within thirty (30) days upon showing sufficient cause."
    },
    caution: {
      bn: "একতরফা ডিক্রি রদ বা খারিজ মোকদ্দমা পুনঃবহালের আবেদন অনধিক ৩০ দিনের মধ্যে উপযুক্ত খরচা প্রদান সাপেক্ষে করতে হবে।",
      en: "Limitation period is strictly thirty (30) days from dismissal or date of knowledge of ex-parte decree."
    },
    keywords: ["non appearance family court", "kharij mamla punobohol", "খারিজ পুনঃবহাল", "একতরফা ডিক্রি রদ", "ex parte family court", "ধারা ১০", "section 10"]
  },
  11: {
    title: { bn: "বিচার-পূর্ব কার্যক্রম ও বাধ্যতামূলক আপস-মীমাংসার চেষ্টা (ধারা ১১)", en: "Pre-Trial Proceedings and Mandatory Reconciliation Attempt (Section 11)" },
    plainExplanation: {
      bn: "লিখিত জবাব দাখিলের পর আদালত অনধিক ৩০ দিনের মধ্যে বিচার-পূর্ব শুনানির তারিখ ধার্য করিবে। এই তারিখে আদালত উভয় পক্ষের মধ্যে আপস-মীমাংসা বা সমঝোতার জন্য আন্তরিক ও বাধ্যতামূলক উদ্যোগ গ্রহণ করিবে।",
      en: "Following the written statement, the Family Court schedules a pre-trial hearing within 30 days to examine pleadings and mandatorily effect an amicable reconciliation or compromise settlement between the parties."
    },
    caution: {
      bn: "আপস-মীমাংসা ব্যর্থ হইলে আদালত মোকদ্দমার বিরোধীয় বিষয়সমূহ (Issues) নির্ধারণ করিয়া সাক্ষ্য গ্রহণের দিন ধার্য করিবেন।",
      en: "Only if ADR and conciliation attempts fail will the court frame issues and proceed to evidentiary trial."
    },
    keywords: ["pre trial reconciliation", "bichar purbo shonani", "বিচার পূর্ব শুনানি", "বাধ্যতামূলক আপস", "compromise attempt", "ধারা ১১", "section 11"]
  },
  12: {
    title: { bn: "রুদ্ধদ্বার কক্ষে বিচার (ধারা ১২)", en: "In Camera Trial Proceedings (Section 12)" },
    plainExplanation: {
      bn: "পারিবারিক আদালত বা আপিল আদালত উপযুক্ত মনে করিলে অথবা কোনো পক্ষের আবেদনে মোকদ্দমার কার্যধারা সম্পূর্ণ বা অংশবিশেষ সাধারণ জনগণের অনুপস্থিতিতে রুদ্ধদ্বার কক্ষে (In Camera) অনুষ্ঠান করিতে পারিবে।",
      en: "Authorizes the Family Court or Family Appellate Court to conduct trial or appellate proceedings in camera to preserve family privacy and sensitive personal dignity."
    },
    caution: {
      bn: "দাম্পত্য ঘনিষ্ঠতা বা শারীরিক নির্যাতনের সংবেদনশীল সাক্ষ্য দেওয়ার সময় রুদ্ধদ্বার শুনানির আবেদন করা যায়।",
      en: "Safeguards matrimonial privacy and encourages candid testimony free from public scrutiny."
    },
    keywords: ["in camera trial", "ruddhoddar bichar", "রুদ্ধদ্বার কক্ষে বিচার", "privacy family court", "ধারা ১২", "section 12"]
  },
  13: {
    title: { bn: "সাক্ষ্য লিপিবদ্ধকরণ ও জবানবন্দি (ধারা ১৩)", en: "Recording of Evidence and Witnesses (Section 13)" },
    plainExplanation: {
      bn: "সাক্ষ্য গ্রহণের নির্ধারিত তারিখে পারিবারিক আদালত উভয় পক্ষের সাক্ষীদের সাক্ষ্য গ্রহণ করিবে। বিচারক স্বহস্তে বা তাহার তত্ত্বাবধানে টাইপ করিয়া সাক্ষ্য লিপিবদ্ধ করিবেন এবং সাক্ষীকে তাহা পড়িয়া শুনাইয়া স্বাক্ষর গ্রহণ করিবেন।",
      en: "Governs evidentiary examination: The Family Court examines witnesses presented by both parties under judicial supervision, recording depositions in writing, reading over statements to witnesses, and securing signatures."
    },
    caution: {
      bn: "সাক্ষীর জবানবন্দি ও জেরা সংক্ষিপ্তভাবে সরাসরি মূল বিরোধীয় বিষয়ের ওপর গ্রহণ করা হয়।",
      en: "Summary examination focuses strictly on framed issues, eliminating irrelevant harassment in cross-examination."
    },
    keywords: ["recording of evidence", "shakkho lipiboddhokoron", "সাক্ষ্য লিপিবদ্ধকরণ", "witness deposition family", "ধারা ১৩", "section 13"]
  },
  14: {
    title: { bn: "বিচারের সমাপ্তি ও শুনানি-পরবর্তী আপস প্রচেষ্টা (ধারা ১৪)", en: "Conclusion of Trial and Post-Trial Conciliation Effort (Section 14)" },
    plainExplanation: {
      bn: "সকল পক্ষের সাক্ষ্য গ্রহণ সমাপ্ত হইবার পর আদালত রায় ঘোষণার পূর্বে পুনরায় পক্ষগণের মধ্যে আপস বা সমঝোতা করাইবার জন্য চূড়ান্ত আন্তরিক প্রচেষ্টা গ্রহণ করিবে।",
      en: "After conclusion of evidence, the Family Court must make a second statutory conciliation effort before pronouncing judgment, seeking an amicable settlement."
    },
    caution: {
      bn: "আইনে বিচারকের জন্য দুইবার (বিচার শুরুর পূর্বে ও বিচারের সমাপ্তিতে) আপসের চেষ্টা করা সংবিধিবদ্ধভাবে বাধ্যতামূলক করা হয়েছে।",
      en: "Dual statutory conciliation: Courts must attempt reconciliation both at pre-trial and post-evidentiary stages."
    },
    keywords: ["conclusion of trial", "bicharer shomapti", "বিচারের সমাপ্তি", "post trial reconciliation", "আপস প্রচেষ্টা", "ধারা ১৪", "section 14"]
  },
  15: {
    title: { bn: "আপোষ ডিক্রি ও চূড়ান্ত নিষ্পত্তি (ধারা ১৫)", en: "Compromise Decree (Section 15)" },
    plainExplanation: {
      bn: "উভয় পক্ষের মধ্যে আপস-মীমাংসা সফল হইলে আদালত আপসের শর্তাবলি লিপিবদ্ধ করিয়া একটি আপোষ ডিক্রি (Compromise Decree) প্রদান করিবে। আপোষ ডিক্রির বিরুদ্ধে কোনো আপিল দায়ের করা যায় না।",
      en: "Where conciliation succeeds, the court records the settlement terms and passes a compromise decree in accordance therewith. No appeal lies against a compromise decree."
    },
    caution: {
      bn: "আপোষ ডিক্রির শর্ত উভয় পক্ষের জন্য চূড়ান্ত ও অলঙ্ঘনীয়।",
      en: "Compromise decrees achieve finality and cannot be challenged in appellate courts."
    },
    keywords: ["compromise decree", "aposh decree", "আপোষ ডিক্রি", "settlement family court", "no appeal compromise", "ধারা ১৫", "section 15"]
  },
  16: {
    title: { bn: "রায় লিখন ও ঘোষণা (ধারা ১৬)", en: "Writing and Pronouncement of Judgment (Section 16)" },
    plainExplanation: {
      bn: "আপস সম্ভব না হইলে আদালত সাক্ষ্য প্রমাণের ভিত্তিতে প্রকাশ্য আদালতে রায় ঘোষণা করিবে এবং রায়ের ভিত্তিতে একটি আনুষ্ঠানিক ডিক্রি প্রস্তুত করিবে।",
      en: "If reconciliation fails, the court pronounces judgment in open court based on evaluated evidence, specifying the relief granted, and prepares a formal decree."
    },
    caution: {
      bn: "রায়ের সত্যায়িত অনুলিপি প্রাপ্তির পর ৩০ দিনের মধ্যে সংক্ষুব্ধ পক্ষকে আপিল করতে হবে।",
      en: "Appeals must be calculated within thirty days from the formal signing and delivery of judgment."
    },
    keywords: ["writing judgment", "ray likhon", "রায় লিখন", "রায় ঘোষণা", "pronouncement judgment", "ধারা ১৬", "section 16"]
  },
  17: {
    title: { bn: "ডিক্রি বলবৎকরণ ও দেনমোহর-ভরণপোষণ আদায় (ধারা ১৭)", en: "Enforcement and Execution of Decrees for Dower & Maintenance (Section 17)" },
    plainExplanation: {
      bn: "পারিবারিক আদালতের ডিক্রি জারি: ডিক্রিকৃত অর্থ (দেনমোহর বা ভরণপোষণ) পরিশোধ না করিলে আদালত বিবাদীর সম্পত্তি ক্রোক ও নিলাম বিক্রয় করিতে পারিবে, অথবা বকেয়া অর্থ সরকারি পাওনা হিসেবে Public Demands Recovery Act এর মাধ্যমে আদায় করিতে পারিবে, অথবা বিবাদীকে অনধিক ৬ মাস দেওয়ানি কারাগারে আটক রাখিতে পারিবে।",
      en: "Enforcement of Family Court Decrees: If a husband fails to satisfy a decree for dower or maintenance, the court may attach and auction his property, recover unpaid sums as public demands (arrears of land revenue) under the PDR Act 1913, or commit him to civil prison for a term up to six (6) months."
    },
    caution: {
      bn: "দেনমোহর ও খোরপোশের টাকা না দিলে আদালত সরাসরি দেওয়ানি পরোয়ানা জারি করে স্বামীকে জেলে পাঠাতে পারে।",
      en: "Non-compliance with financial family decrees empowers the court to issue distress warrants and commit the judgment-debtor to civil custody."
    },
    keywords: [
      "decree enforcement",
      "execute family decree",
      "maintenance enforcement",
      "khorposh jari",
      "ভরণপোষণ আদায়",
      "ডিক্রি জারি",
      "দেনমোহর আদায়",
      "দেওয়ানি জেল",
      "পাবলিক ডিমান্ড",
      "ধারা ১৭",
      "section 17"
    ]
  },
  18: {
    title: { bn: "পারিবারিক আপিল আদালত প্রতিষ্ঠা (ধারা ১৮)", en: "Establishment of Family Appellate Courts (Section 18)" },
    plainExplanation: {
      bn: "প্রত্যেক জেলায় পারিবারিক আদালতের রায়ের বিরুদ্ধে আপিল শুনানির জন্য জেলা জজ আদালতকে 'পারিবারিক আপিল আদালত' হিসেবে প্রতিষ্ঠা করা হইয়াছে। জেলা জজ যেকোনো অতিরিক্ত জেলা জজের নিকট আপিল নিষ্পত্তির জন্য পাঠাইতে পারেন।",
      en: "Establishes Courts of District Judge in every district as the Family Appellate Court, with power to transfer family appeals to Additional District Judges for disposal."
    },
    caution: {
      bn: "পারিবারিক আদালতের রায়ের বিরুদ্ধে সরাসরি জেলা জজ আদালতে আপিল দায়ের করতে হয়।",
      en: "Appellate jurisdiction resides with the District Judge / Additional District Judge of the district."
    },
    keywords: ["family appellate court", "paribarik apil adalat", "পারিবারিক আপিল আদালত", "জেলা জজ আপিল", "district judge family appeal", "ধারা ১৮", "section 18"]
  },
  19: {
    title: { bn: "আপিল দায়ের ও নিষ্পত্তির সময়সীমা (ধারা ১৯)", en: "Filing and Disposal of Appeals within 30 Days (Section 19)" },
    plainExplanation: {
      bn: "পারিবারিক আদালতের ডিক্রি বা আদেশের বিরুদ্ধে ৩০ (ত্রিশ) দিনের মধ্যে পারিবারিক আপিল আদালতে আপিল দায়ের করিতে হইবে। তবে দেনমোহরের পরিমাণ ৫,০০০ টাকার কম হইলে অথবা ক্ষতিপূরণ ছাড়া কেবল বিবাহ বিচ্ছেদের ডিক্রি হইলে তাহার বিরুদ্ধে কোনো আপিল চলিবে না।",
      en: "An appeal lies to the Family Appellate Court within strictly thirty (30) days from decree. No appeal lies where dower decree is under 5,000 taka or against a decree for dissolution of marriage except regarding accompanying financial claims."
    },
    caution: {
      bn: "৩০ দিনের সময়সীমা অতিক্রম করলে তামাদি মওকুফের উপযুক্ত কারণ প্রমাণ না করিলে আপিল সরাসরি খারিজ হইয়া যাইবে।",
      en: "Strict 30-day limitation benchmark; Section 5 Limitation Act applies only upon demonstration of sufficient cause."
    },
    keywords: [
      "family court appeal",
      "apil 30 din",
      "পারিবারিক আপিল ৩০ দিন",
      "আপিল দায়ের ও নিষ্পত্তি",
      "district judge family appeal",
      "ধারা ১৯",
      "section 19"
    ]
  },
  20: {
    title: { bn: "মোকদ্দমা এবং আপিল স্থানান্তর ও স্থগিতকরণ (ধারা ২০)", en: "Transfer and Stay of Suits and Appeals (Section 20)" },
    plainExplanation: {
      bn: "জেলা জজ তাহার জেলার এক পারিবারিক আদালত হইতে অন্য পারিবারিক আদালতে মোকদ্দমা স্থানান্তর করিতে পারেন। এছাড়া হাইকোর্ট বিভাগ এক জেলা হইতে অন্য জেলায় পারিবারিক মোকদ্দমা বা আপিল স্থানান্তর করিতে পারে।",
      en: "District Judges may transfer suits between family courts within the district. The High Court Division retains statutory authority to transfer family suits or appeals across different districts for the ends of justice."
    },
    caution: {
      bn: "পক্ষগণের ন্যায়বিচার নিশ্চিত করতে বা পক্ষপাতিত্বের আশঙ্কায় জেলা জজে স্থানান্তরের আবেদন করা যায়।",
      en: "Facilitates forum transfers where parties face local bias or logistical impossibility."
    },
    keywords: ["transfer of family suit", "mamla sthanantor", "মোকদ্দমা স্থানান্তর", "হাইকোর্ট স্থানান্তর", "ধারা ২০", "section 20"]
  },
  21: {
    title: { bn: "পারিবারিক আদালতের অন্তর্বর্তী আদেশ প্রদানের ক্ষমতা (ধারা ২১)", en: "Power to Pass Interim Orders (Section 21)" },
    plainExplanation: {
      bn: "পারিবারিক আদালত মোকদ্দমা চলাকালীন যেকোনো পর্যায়ে অন্তর্বর্তীকালীন ভরণপোষণ (Interim Maintenance), সন্তানের অন্তর্বর্তী হেফাজত ও সাক্ষাৎ, অথবা সন্তানকে দেশের বাইরে নেওয়া রোধে অস্থায়ী নিষেধাজ্ঞামূলক অন্তর্বর্তী আদেশ দিতে পারিবে।",
      en: "Empowers the Family Court or Family Appellate Court to grant interim relief at any stage, including interim maintenance, temporary child visitation, or injunctions preventing the removal of children from jurisdiction."
    },
    caution: {
      bn: "চূড়ান্ত রায়ের জন্য অপেক্ষা না করে মামলা চলাকালীন সময় থেকেই স্ত্রী ও সন্তান অন্তর্বর্তীকালীন খোরপোশ পেতে পারে।",
      en: "Victims are entitled to interim subsistence payments during trial pendency."
    },
    keywords: ["interim maintenance", "ontorbotikalin khorposh", "অন্তর্বর্তী আদেশ", "interim child custody", "পারিবারিক অন্তর্বর্তী খোরপোশ", "ধারা ২১", "section 21"]
  },
  22: {
    title: { bn: "সমন ও দলিল তলবের ক্ষমতা (ধারা ২২)", en: "Power to Summon Witnesses and Documents (Section 22)" },
    plainExplanation: {
      bn: "পারিবারিক আদালতের যেকোনো ব্যক্তিকে সাক্ষী হিসেবে হাজির করাইবার, শপথ পাঠ করাইয়া পরীক্ষা করিবার এবং দলিল বা বস্তু আদালতে দাখিল করিতে বাধ্য করিবার দেওয়ানি আদালতের পূর্ণ ক্ষমতা থাকিবে।",
      en: "Endows the Family Court with the full powers of a Civil Court to summon witnesses, examine individuals on oath, and compel discovery and production of documents."
    },
    caution: {
      bn: "আদালতের সমন সত্ত্বেও দলিল দাখিল না করিলে বা হাজির না হইলে গ্রেপ্তারি পরোয়ানা জারি হতে পারে।",
      en: "Non-attendance in response to witness summons invites bailable warrants or contempt citations."
    },
    keywords: ["summon witness documents", "dolil tolob", "সমন জারির ক্ষমতা", "witness examination", "ধারা ২২", "section 22"]
  },
  23: {
    title: { bn: "আদালত অবমাননা ও সংক্ষিপ্ত দণ্ড (ধারা ২৩)", en: "Contempt of Family Court and Summary Penalties (Section 23)" },
    plainExplanation: {
      bn: "পারিবারিক আদালত বা পারিবারিক আপিল আদালতের বিচার চলাকালীন কোনো ব্যক্তি বাধা সৃষ্টি করিলে বা আদালত অবমাননা করিলে আদালত তাহাকে সংক্ষিপ্ত শুনানিতে অনধিক ২,০০০ টাকা জরিমানা বা অনাদায়ে অনধিক ১ মাস বিনাশ্রম কারাদণ্ড দিতে পারিবে।",
      en: "Authorizes summary contempt proceedings where any person insults, interrupts, or refuses to obey the Family Court or Appellate Court, punishable with fine up to 2,000 taka or simple imprisonment up to one (1) month."
    },
    caution: {
      bn: "আদালত অবমাননার বিরুদ্ধে জেলা জজে আপিলের সুযোগ রয়েছে।",
      en: "Appeals against contempt convictions lie to the higher appellate forum."
    },
    keywords: ["contempt family court", "adalat obomannona", "আদালত অবমাননা", "summary contempt fine", "ধারা ২৩", "section 23"]
  },
  24: {
    title: { bn: "প্রতিনিধিদের মাধ্যমে উপস্থিতি ও পর্দানশীন নারী (ধারা ২৪)", en: "Appearance through Agents and Purdanashin Women (Section 24)" },
    plainExplanation: {
      bn: "কোনো পক্ষ নিজে বা তাহার নিযুক্ত আইনজীবী বা ক্ষমতাপ্রাপ্ত প্রতিনিধির মাধ্যমে আদালতে হাজিরা দিতে পারিবেন। তবে আদালত ব্যক্তিগত উপস্থিতি আবশ্যক মনে করিলে আদেশ দিতে পারিবে। পর্দানশীন নারীদের ব্যক্তিগত উপস্থিতি হইতে অব্যাহতি দেওয়া যায়।",
      en: "Permits parties to appear through recognized agents or legal practitioners. Courts may exempt purdanashin women from personal appearance, examining them on commission."
    },
    caution: {
      bn: "আপস-মীমাংসার তারিখে আদালত পক্ষগণের ব্যক্তিগত উপস্থিতি বাধ্যতামূলক করতে পারে।",
      en: "Personal appearance is typically insisted upon during mandatory conciliation sessions."
    },
    keywords: ["appearance through agent", "purdanashin exemption", "আইনজীবীর মাধ্যমে হাজিরা", "পর্দানশীন নারী", "ধারা ২৪", "section 24"]
  },
  25: {
    title: { bn: "কোর্ট ফি ও নামমাত্র খরচ (ধারা ২৫)", en: "Nominal Fixed Court Fees (Section 25)" },
    plainExplanation: {
      bn: "পারিবারিক আদালতে আরজি দাখিলের ক্ষেত্রে কোর্ট ফি মাত্র ২০০ (দুইশত) টাকা এবং পারিবারিক আপিল আদালতে আপিল দায়েরের ক্ষেত্রে কোর্ট ফি মাত্র ২০০ (দুইশত) টাকা নির্ধারিত। দাবিকৃত দেনমোহর কোটি টাকা হলেও অতিরিক্ত অ্যাড ভ্যালোরেম কোর্ট ফি লাগে না।",
      en: "Prescribes a nominal fixed court fee of only 200 BDT for instituting a plaint in the Family Court, and 200 BDT for filing an appeal, regardless of the financial valuation of the dower or maintenance claim."
    },
    caution: {
      bn: "দেনমোহর বা খোরপোশের মামলা অত্যন্ত দরিদ্র নারীদের জন্যও সহজলভ্য করতে এই নামমাত্র কোর্ট ফি রাখা হয়েছে।",
      en: "Eliminates ad valorem fee barriers, guaranteeing accessible justice for destitute women."
    },
    keywords: ["court fee family court", "200 taka court fee", "কোর্ট ফি ২০০ টাকা", "fixed court fee", "nomal fee", "ধারা ২৫", "section 25"]
  },
  26: {
    title: { bn: "মুসলিম পারিবারিক আইনের বিধান অক্ষুণ্ণ রাখা (ধারা ২৬)", en: "Saving of Muslim Family Laws Ordinance, 1961 (Section 26)" },
    plainExplanation: {
      bn: "এই আইনের কোনো বিধানই Muslim Family Laws Ordinance, 1961 (১৯৬১ সনের ৮ নং অধ্যাদেশ) এর বিধানাবলিকে ক্ষুণ্ণ বা প্রভাবিত করিবে না। ১৯৬১ সালের অধ্যাদেশের সালিসি কাউন্সিলের এখতিয়ার বলবৎ থাকিবে।",
      en: "Statutory savings clause preserving the full operation of the Muslim Family Laws Ordinance, 1961. The jurisdiction of Union Parishad Arbitration Councils remains unaffected."
    },
    caution: {
      bn: "তালাকের নোটিশ চেয়ারম্যানকে দেওয়ার পর ৯০ দিন অতিবাহিত হওয়ার নিয়ম পারিবারিক আদালতের মামলায় বাতিল হয় না।",
      en: "Statutory 90-day talaq notice procedures before local chairmen remain mandatory."
    },
    keywords: ["saving mflo 1961", "muslim family laws saving", "মুসলিম পারিবারিক আইন হেফাজত", "salishi council intact", "ধারা ২৬", "section 26"]
  },
  27: {
    title: { bn: "গার্ডিয়ানস অ্যান্ড ওয়ার্ডস অ্যাক্টের আওতায় জেলা আদালত গণ্যকরণ (ধারা ২৭)", en: "Family Court Deemed District Court under Guardians and Wards Act, 1890 (Section 27)" },
    plainExplanation: {
      bn: "Guardians and Wards Act, 1890 এর অধীন অপ্রাপ্তবয়স্ক সন্তানের অভিভাবকত্ব ও হেফাজত নির্ধারণের উদ্দেশ্যে পারিবারিক আদালতকে দেওয়ানি 'জেলা আদালত' (District Court) রূপে গণ্য করা হইবে।",
      en: "Deems the Family Court to be a District Court for the purposes of the Guardians and Wards Act, 1890, conferring jurisdiction to appoint guardians and determine child custody."
    },
    caution: {
      bn: "সন্তানের সর্বোত্তম কল্যাণ (Paramount Welfare of Child) বিবেচনা করে আদালত মা বা বাবার জিম্মায় হেফাজতের আদেশ দেন।",
      en: "Paramount welfare test overrides technical custody presumptions."
    },
    keywords: [
      "guardians and wards act",
      "custody district court",
      "অভিভাবক ও প্রতিপাল্য আইন",
      "সন্তানের অভিভাবকত্ব জেলা আদালত",
      "paramount welfare child",
      "ধারা ২৭",
      "section 27"
    ]
  },
  28: {
    title: { bn: "দেওয়ানি কার্যবিধি ও সাক্ষ্য আইনের জটিলতা বর্জন (ধারা ২৮)", en: "Exclusion of Complex CPC Formalities and Summary Family Procedure (Section 28)" },
    plainExplanation: {
      bn: "সাক্ষ্য আইন, ১৮৭২ (Evidence Act) এবং দেওয়ানি কার্যবিধি, ১৯০৮ (CPC) এর জটিল কারিগরি নিয়ম পারিবারিক আদালতের ক্ষেত্রে প্রযোজ্য নহে (ধারা ১০ ও ১১ সিপিসি ব্যতীত)। পারিবারিক আদালত দ্রুত ও অ-কারিগরিভাবে সংক্ষিপ্ত পদ্ধতিতে বিচার সম্পন্ন করিবে।",
      en: "Excludes the technicalities of the Evidence Act, 1872 and the Code of Civil Procedure, 1908 (except Sections 10 and 11 CPC on res judicata), mandating swift, non-technical family dispute adjudication."
    },
    caution: {
      bn: "সাধারণ দেওয়ানি মামলার মতো বছরের পর বছর দীর্ঘসূত্রতা পারিবারিক আদালতে অনুমোদিত নয়।",
      en: "Prevents technical civil objections from stalling urgent matrimonial and child custody reliefs."
    },
    keywords: [
      "exclusion of cpc",
      "cpc formalities non applicable",
      "দেওয়ানি কার্যবিধির জটিলতা বর্জন",
      "সংক্ষিপ্ত বিচার পদ্ধতি",
      "evidence act non applicable",
      "ধারা ২৮",
      "section 28"
    ]
  },
  29: {
    title: { bn: "বিধি প্রণয়নের ক্ষমতা (ধারা ২৯)", en: "Power of Supreme Court to Frame Rules (Section 29)" },
    plainExplanation: {
      bn: "সুপ্রিম কোর্ট, সরকারের পূর্বানুমোদনক্রমে, সরকারি গেজেটে প্রজ্ঞাপন দ্বারা এই আইনের কার্যপদ্ধতি ও উদ্দেশ্য পূরণের জন্য পারিবারিক আদালত বিধিমালা প্রণয়ন করিতে পারিবে।",
      en: "Empowers the Supreme Court of Bangladesh, with prior Government approval, to frame rules regulating the practice and procedure of Family Courts."
    },
    caution: {
      bn: "সুপ্রিম কোর্টের তত্ত্বাবধানে পারিবারিক আদালতের কার্যপদ্ধতি নিয়ন্ত্রিত হয়।",
      en: "High Court Division exercises judicial superintendence over family proceedings."
    },
    keywords: ["power to frame rules", "supreme court family rules", "বিধি প্রণয়ন ক্ষমতা", "ধারা ২৯", "section 29"]
  },
  30: {
    title: { bn: "রহিতকরণ ও হেফাজত (ধারা ৩০)", en: "Repeal of 1985 Ordinance and Savings (Section 30)" },
    plainExplanation: {
      bn: "Family Courts Ordinance, 1985 (Ordinance No. XVIII of 1985) রহিত করা হইল। তবে পূর্বের অধ্যাদেশের অধীন নিষ্পন্নাধীন মোকদ্দমা, আপিল বা ডিক্রি এই আইনের অধীনে অব্যাহত ও কার্যকর থাকিবে।",
      en: "Repeals the Family Courts Ordinance, 1985 while explicitly saving all pending suits, appeals, and execution decrees to continue smoothly under the 2023 enactment."
    },
    caution: {
      bn: "পূর্বের ১৯৮৫ সালের আইনের অধীনে দায়েরকৃত মামলা বাতিল হয় না, স্বয়ংক্রিয়ভাবে ২০২৩ সালের আইনের অধীনে পরিচালিত হয়।",
      en: "Seamless transition: Pending matrimonial litigations automatically continue under the new 2023 Act."
    },
    keywords: ["repeal of 1985 ordinance", "family courts ordinance 1985", "রহিতকরণ ও হেফাজত", "savings clause", "ধারা ৩০", "section 30"]
  },
  31: {
    title: { bn: "ইংরেজিতে অনূদিত নির্ভরযোগ্য পাঠ প্রকাশ (ধারা ৩১)", en: "Publication of Authentic English Text (Section 31)" },
    plainExplanation: {
      bn: "সরকার সরকারি গেজেটে প্রজ্ঞাপন দ্বারা এই আইনের একটি নির্ভরযোগ্য ইংরেজি অনুবাদ প্রকাশ করিতে পারিবে, তবে বাংলা ও ইংরেজি পাঠের মধ্যে বিরোধ দেখা দিলে বাংলা পাঠ প্রাধান্য পাইবে।",
      en: "Authorizes gazette publication of an authentic English translation. In the event of conflict between the Bengali text and English text, the Bengali text prevails."
    },
    caution: {
      bn: "আইনি বিরোধ ও ব্যাখ্যায় বাংলা পাঠই আদালতের নিকট চূড়ান্ত কর্তৃত্বপূর্ণ ভিত্তি।",
      en: "The Bengali text retains supreme interpretive authority in all judicial disputes."
    },
    keywords: ["authentic english text", "bangla text prevails", "ইংরেজি পাঠ প্রকাশ", "ধারা ৩১", "section 31"]
  }
};

const finalProvisions = [];

// 1. Generate clean 1 to 31 sections with IDs `family-court-2023-1` to `family-court-2023-31`
for (const s of extracted) {
  const num = parseInt(bnToEnNum(s.secNumStr), 10);
  const meta = sectionsMeta[num];
  if (!meta) continue;

  const id = `family-court-2023-${num}`;
  const existing = existingMap.get(id);

  let keywords = meta.keywords;
  if (existing && Array.isArray(existing.keywords)) {
    keywords = [...new Set([...existing.keywords, ...meta.keywords])];
  }

  const title = meta.title;
  const plainExplanation = (existing && existing.plainExplanation && existing.plainExplanation.bn.length > 50) ? existing.plainExplanation : meta.plainExplanation;
  const caution = (existing && existing.caution && existing.caution.bn.length > 20) ? existing.caution : meta.caution;

  const prov = {
    id,
    actId: 'act_family_courts_2023',
    sectionNumber: `Section ${num}`,
    categories: ['family'],
    title,
    originalText: s.rawContent,
    originalLanguage: 'bn',
    plainExplanation,
    caution,
    sourceUrl: s.url,
    retrievalDate: '2026-11-01',
    effectiveDate: '2023-09-18',
    legalStatus: 'active',
    reviewStatus: 'verified',
    contentHash: sha256(s.rawContent),
    keywords
  };

  finalProvisions.push(prov);
}

// 2. Also preserve tested legacy bridge records: family-court-13, family-court-10, family-court-5
const bridgeIds = ['family-court-13', 'family-court-10', 'family-court-5'];
for (const bId of bridgeIds) {
  const ex = existingMap.get(bId);
  if (ex) {
    finalProvisions.push(ex);
  }
}

fs.writeFileSync('scripts/generated_family_courts_2023.json', JSON.stringify(finalProvisions, null, 2), 'utf8');
console.log(`Generated ${finalProvisions.length} provisions for Family Courts Act 2023 (31 sections + 3 legacy test bridges)`);
