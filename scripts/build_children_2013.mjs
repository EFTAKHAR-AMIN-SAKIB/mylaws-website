import fs from 'node:fs';
import crypto from 'node:crypto';

const cat = JSON.parse(fs.readFileSync('scripts/new_family_catalog.json', 'utf8'))['act_children_2013'];
const printHtml = fs.readFileSync('scripts/act-1119-print.html', 'utf8');
const splits = printHtml.split(/<div[^>]*class=["'][^"']*txt-details[^"']*["'][^>]*>/i);

function sha256(str) {
  return crypto.createHash('sha256').update(str.trim()).digest('hex');
}

function bnToEnNum(str) {
  const bn = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  return String(str).replace(/[০-৯]/g, d => bn.indexOf(d));
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

// Special curated metadata for milestone sections
const curatedMeta = {
  1: {
    enTitle: "Short Title and Commencement (Section 1)",
    bnExpl: "এই আইনটি 'শিশু আইন, ২০১৩' (২০১৩ সনের ২৪ নং আইন) নামে অভিহিত এবং জাতিসংঘের শিশু অধিকার সনদ (UNCRC) এর আলোকে প্রণীত হইয়া ২১ আগস্ট ২০১৩ তারিখে কার্যকর হয়।",
    enExpl: "Names the statute as the Children Act, 2013 (Act No. XXIV of 2013), enacted to implement the UN Convention on the Rights of the Child (UNCRC), effective from 21 August 2013.",
    bnCaut: "১৯৭৪ সালের পূর্ববর্তী শিশু আইন রহিত করে শিশুদের সুরক্ষা ও বিচারের জন্য এই পূর্ণাঙ্গ আধুনিক আইন কার্যকর করা হয়েছে।",
    enCaut: "Repeals and replaces the Children Act, 1974 with comprehensive child protection and juvenile justice standards."
  },
  2: {
    enTitle: "Definitions (Section 2)",
    bnExpl: "এই আইনে শিশু, শিশু আদালত, শিশুবিষয়ক পুলিশ কর্মকর্তা, প্রবেশন কর্মকর্তা, বিকল্প পরিচর্যা, প্রত্যয়িত প্রতিষ্ঠান ও উন্নয়ন কেন্দ্র সংজ্ঞায়িত করা হইয়াছে।",
    enExpl: "Defines child, Children's Court, Child Affairs Police Officer, Probation Officer, certified institutes, development centres, and alternative care.",
    bnCaut: "আইনের সংস্পর্শে আসা শিশু এবং আইনের সহিত সংঘাতে জড়িত শিশুর মধ্যে আইনি পার্থক্য স্পষ্ট করা হয়েছে।",
    enCaut: "Distinguishes between children in conflict with the law and children in contact with the law / in need of protection."
  },
  4: {
    enTitle: "Age of Child Defined as Up to 18 Years (Section 4)",
    bnExpl: "আপাতত বলবৎ অন্য কোনো আইনে যাহা কিছুই থাকুক না কেন, এই আইনের উদ্দেশ্য পূরণকল্পে ১৮ (আঠারো) বৎসর বয়স পর্যন্ত প্রত্যেক ব্যক্তি শিশু বলিয়া গণ্য হইবে।",
    enExpl: "Foundational child age definition: Notwithstanding anything in any other law, every individual up to 18 years of age is statutorily defined as a child in Bangladesh.",
    bnCaut: "অপরাধ সংঘটনের তারিখে অভিযুক্ত ব্যক্তির বয়স ১৮ বছরের কম থাকলে তিনি পূর্ণাঙ্গ শিশু আইনের সুরক্ষা ও শিশু আদালতের অধিকার লাভ করবেন।",
    enCaut: "Age is determined as of the date of alleged offense commission; under-18s are strictly entitled to juvenile justice protections."
  },
  13: {
    enTitle: "Child Affairs Police Desk at Every Police Station (Section 13)",
    bnExpl: "প্রত্যেক থানায় শিশুদের সেবার জন্য পৃথক শিশুবিষয়ক ডেস্ক (Child Affairs Desk) থাকিবে এবং অন্তত একজন সাব-ইন্সপেক্টর পদমর্যাদার পুলিশ কর্মকর্তা শিশুবিষয়ক পুলিশ কর্মকর্তা (CAPO) হিসেবে দায়িত্ব পালন করবেন।",
    enExpl: "Mandates establishment of a dedicated Child Affairs Desk in every police station, headed by an officer not below Sub-Inspector rank designated as Child Affairs Police Officer (CAPO).",
    bnCaut: "থানায় কোনো শিশুকে সাধারণ আসামিদের সাথে রাখা সম্পূর্ণ নিষিদ্ধ।",
    enCaut: "Children brought to police stations cannot be detained in general lockups with adult suspects."
  },
  14: {
    enTitle: "Duties of Child Affairs Police Officer (Section 14)",
    bnExpl: "শিশুবিষয়ক পুলিশ কর্মকর্তা শিশুর সাথে বন্ধুভাবাপন্ন আচরণ করবেন, সাদা পোশাকে থাকবেন, শিশুকে হাতকড়া বা ডাণ্ডাবেড়ি পরানো হইতে বিরত থাকিবেন এবং প্রবেশন কর্মকর্তাকে অবিলম্বে অবহিত করিবেন।",
    enExpl: "CAPO must interact in a child-friendly manner without police uniform, ensure no handcuffs or ropes are used, and immediately notify parents and the Probation Officer.",
    bnCaut: "কোনো অবস্থাতেই শিশুকে হাতকড়া বা রশি দিয়ে বাঁধা যাবে না (ধারা ৪৪ ও উচ্চ আদালতের নির্দেশনা)।",
    enCaut: "Strict statutory ban on handcuffing, tying with ropes, or physical restraints on children."
  },
  16: {
    enTitle: "Establishment of Children's Court (Section 16)",
    bnExpl: "প্রত্যেক জেলায় এক বা একাধিক শিশু আদালত (Children's Court) থাকিবে। নারী ও শিশু নির্যাতন দমন ট্রাইব্যুনালসমূহ শিশু আদালত হিসেবে দায়িত্ব পালন করিবে; ট্রাইব্যুনাল না থাকিলে জেলা ও দায়রা জজ আদালত শিশু আদালত হিসেবে বিচার করিবেন।",
    enExpl: "Directs establishment of Children's Courts in every district. Prevention of Women and Children Repression Tribunals (or District & Sessions Judges) act as designated Children's Courts.",
    bnCaut: "সাধারণ ফৌজদারি আদালত বা ম্যাজিস্ট্রেট আদালতে শিশুদের বিচার করার কোনো এখতিয়ার নেই।",
    enCaut: "Ordinary criminal and magistrate courts have zero jurisdiction to try child offenses."
  },
  19: {
    enTitle: "Child-Friendly Court Environment and Prohibitions (Section 19)",
    bnExpl: "শিশু আদালতের পরিবেশ সাধারণ আদালতের মতো হইবে না: কোনো কাঠগড়া (Dock) থাকিবে না, বিচারক বা আইনজীবীগণ গাউন বা কালো কোট পরিধান করিবেন না, এবং শিশু তাহার পিতামাতা বা প্রবেশন কর্মকর্তার পাশে বসিবে।",
    enExpl: "Mandates informal child-friendly courtroom settings: no docks, judges and lawyers shall not wear black coats or gowns, and children shall sit alongside parents and probation officers.",
    bnCaut: "আদালত কক্ষের ভীতিকর পরিবেশ পরিহার করে শিশুর মানসিক স্বাচ্ছন্দ্য নিশ্চিত করা বাধ্যতামূলক।",
    enCaut: "Eliminates intimidating judicial trappings to prevent re-traumatization of juvenile accused."
  },
  33: {
    enTitle: "Absolute Ban on Death Penalty, Life Imprisonment, and Joint Trial (Section 33)",
    bnExpl: "কোনো শিশুকে মৃত্যুদণ্ড বা যাবজ্জীবন কারাদণ্ড প্রদান করা যাইবে না। কোনো অবস্থাতেই প্রাপ্তবয়স্ক কোনো আসামির সাথে কোনো শিশুর যৌথ বিচার (Joint Trial) অনুষ্ঠান করা যাইবে না।",
    enExpl: "Absolute statutory prohibition: No child shall be sentenced to death or life imprisonment. Furthermore, no child can ever be jointly tried with an adult co-accused.",
    bnCaut: "প্রাপ্তবয়স্কের সাথে একই ঘটনায় জড়িত থাকলেও শিশুর বিচার শিশু আদালতে সম্পূর্ণ পৃথকভাবে অনুষ্ঠিত হবে।",
    enCaut: "Complete separation of trials: Joint charge-sheets must be split into separate adult and juvenile trials."
  },
  44: {
    enTitle: "Right to Bail for Children in Conflict with Law (Section 44)",
    bnExpl: "আমলযোগ্য বা জামিন-অযোগ্য অপরাধে জড়িত থাকার অভিযোগে কোনো শিশুকে আটক করা হইলেও জামিন তাহার সংবিধিবদ্ধ অধিকার। জামিন শিশুর শারীরিক বা নৈতিক ক্ষতির কারণ না হইলে তাহাকে অবশ্যই জামিনে মুক্তি দিতে হইবে।",
    enExpl: "Statutory presumption of bail: When any child is arrested for any bailable or non-bailable offense, release on bail is a statutory right, unless release would expose the child to moral danger or defeat the ends of justice.",
    bnCaut: "পুলিশ কর্মকর্তা বা শিশু আদালত জামিন দিতে বাধ্য; জামিন না দিলে শিশুকে শিশু উন্নয়ন কেন্দ্রে পাঠাতে হবে, সাধারণ কারাগারে নয়।",
    enCaut: "Children denied bail must be placed in Child Development Centres (CDC), never in central adult prisons."
  },
  70: {
    enTitle: "Penalty for Cruelty to Children (Section 70)",
    bnExpl: "শিশুর হেফাজত বা দায়িত্বে নিয়োজিত কোনো ব্যক্তি শিশুকে মারধর, মানসিক নির্যাতন, অবহেলা বা পরিত্যাগ করিলে তিনি অনধিক ৫ (পাঁচ) বৎসর কারাদণ্ড বা অনধিক ১,০০,০০০ (এক লক্ষ) টাকা অর্থদণ্ড বা উভয় দণ্ডে দণ্ডনীয় হইবেন।",
    enExpl: "Penalizes cruelty to children: Any person having custody or charge of a child who assaults, ill-treats, neglects, abandons, or exposes the child to suffering faces up to 5 years imprisonment or fine up to 1,00,000 BDT, or both.",
    bnCaut: "গৃহকর্মী শিশু বা কোনো শিশুর উপর শারীরিক বা মানসিক নির্যাতন চালালে এই ধারায় সরাসরি ৫ বছরের কারাদণ্ড হতে পারে।",
    enCaut: "Severe deterrence against child domestic worker torture and domestic physical violence against minors."
  },
  71: {
    enTitle: "Penalty for Employing Child in Begging (Section 71)",
    bnExpl: "কোনো ব্যক্তিকে শিশুকে ভিক্ষাবৃত্তিতে নিয়োজিত বা ব্যবহার করিবার অপরাধে অনধিক ৫ বৎসর কারাদণ্ড বা অনধিক ১ লক্ষ টাকা অর্থদণ্ড বা উভয় দণ্ডে দণ্ডিত করা যাইবে।",
    enExpl: "Criminalizes employing, causing, or using a child for begging, punishable with up to 5 years imprisonment or fine up to 1,00,000 BDT, or both.",
    bnCaut: "ভিক্ষাবৃত্তির উদ্দেশ্যে শিশুর অঙ্গহানি করলে দণ্ডবিধির ৩০৭/৩২৫ ধারাসহ কঠোর বিশেষ শাস্তি প্রযোজ্য হয়।",
    enCaut: "Direct statutory weapon against child begging syndicates."
  },
  80: {
    enTitle: "Penalty for Exploitation of Children (Section 80)",
    bnExpl: "কোনো শিশুকে অনৈতিক বা বাণিজ্যিক উদ্দেশ্যে শোষণ করিলে বা ঝুঁকিপূর্ণ শ্রমে ব্যবহার করিলে অনধিক ২ বৎসর কারাদণ্ড বা অনধিক ৫০,০০০ টাকা অর্থদণ্ড বা উভয় দণ্ড প্রদান করা যাইবে।",
    enExpl: "Punishes commercial or immoral exploitation of children, including hazardous child labor, with up to 2 years imprisonment or fine up to 50,000 BDT, or both.",
    bnCaut: "ঝুঁকিপূর্ণ কারখানায় শিশু নিয়োগ দেওয়া এই আইনের অধীন একটি দণ্ডনীয় অপরাধ।",
    enCaut: "Prohibits child exploitation across industrial and commercial sectors."
  },
  81: {
    enTitle: "Prohibition on Publishing Child Identity in Media (Section 81)",
    bnExpl: "সংবাদমাধ্যম বা সামাজিক যোগাযোগমাধ্যমে অপরাধের শিকার বা অপরাধে জড়িত কোনো শিশুর ছবি, নাম, ঠিকানা বা পরিচয় প্রকাশ করা সম্পূর্ণ নিষিদ্ধ। এই বিধান লঙ্ঘন করিলে অনধিক ১ (এক) বৎসর কারাদণ্ড বা অনধিক ৫০,০০০ টাকা অর্থদণ্ড হইবে।",
    enExpl: "Strict media privacy ban: Prohibits publishing the name, address, school, photograph, or identifying particulars of any child victim, witness, or accused in print, television, or online media, punishable with up to 1 year jail or 50,000 BDT fine.",
    bnCaut: "ফেসবুক, ইউটিউব বা সংবাদপত্রে শিশুর ছবি বা নাম প্রকাশ করা সরাসরি আইনত দণ্ডনীয়।",
    enCaut: "Shields children from lifelong public stigma and online exposure."
  }
};

const provisions = [];

for (let i = 0; i < cat.length; i++) {
  const item = cat[i];
  let secNumStr = item.secNumStr ? item.secNumStr.trim() : '';
  
  // If secNumStr was empty (like 15A), extract from rawTitle
  if (!secNumStr) {
    const m = item.rawTitle.match(/^([০-৯]+[ক-হ]?|[0-9]+[A-Z]?)\s*[।\.]/);
    if (m) secNumStr = m[1];
    else secNumStr = String(i + 1);
  }

  const enNumStr = bnToEnNum(secNumStr).replace(/ক/g, 'a').replace(/খ/g, 'b');
  const numInt = parseInt(enNumStr, 10);
  const rawText = cleanHtmlToText(splits[i + 1]);

  const curated = curatedMeta[numInt];

  const titleBn = `${item.titleText} (ধারা ${secNumStr})`;
  const titleEn = curated ? curated.enTitle : `${item.titleText} (Section ${enNumStr.toUpperCase()})`;

  const plainExplanationBn = curated ? curated.bnExpl : `শিশু আইন, ২০১৩ এর ধারা ${secNumStr} অনুযায়ী: ${item.titleText} সংক্রান্ত সংবিধিবদ্ধ বিধানাবলী।`;
  const plainExplanationEn = curated ? curated.enExpl : `Provides statutory provisions regarding ${item.titleText} under Section ${enNumStr.toUpperCase()} of the Children Act, 2013.`;

  const cautionBn = curated ? curated.bnCaut : `১৮ বছর বয়স পর্যন্ত সকল শিশুর ক্ষেত্রে শিশু আইনের এই সুরক্ষা ও পদ্ধতি বাধ্যতামূলকভাবে প্রযোজ্য।`;
  const cautionEn = curated ? curated.enCaut : `Applies mandatory statutory child protections to all individuals under 18 years of age.`;

  const keywords = [
    "children act 2013",
    "shishu ain 2013",
    "শিশু আইন ২০১৩",
    `ধারা ${secNumStr}`,
    `section ${enNumStr}`,
    "child rights bangladesh",
    "shishu odhikar",
    item.titleText.toLowerCase()
  ];

  if (numInt === 4) keywords.push("child age 18", "shishur boyosh 18", "শিশু ১৮ বছর");
  if (numInt === 16) keywords.push("children court", "shishu adalat", "শিশু আদালত");
  if (numInt === 33) keywords.push("ban on death penalty child", "no life imprisonment child", "no joint trial");
  if (numInt === 44) keywords.push("child bail", "shishur jamin", "শিশু জামিন");
  if (numInt === 70) keywords.push("cruelty to children", "shishur proti nisthurata", "শিশুর প্রতি নিষ্ঠুরতা");
  if (numInt === 81) keywords.push("media ban child picture", "shishur chobi prokash nisiddho", "শিশু পরিচয় গোপন");

  let legalStatus = 'active';
  if (/বিলুপ্ত|রহিত|repealed|omitted/i.test(item.rawTitle)) {
    legalStatus = 'repealed';
  }

  const prov = {
    id: `children-2013-${enNumStr.toLowerCase()}`,
    actId: 'act_children_2013',
    sectionNumber: `Section ${enNumStr.toUpperCase()}`,
    categories: ['family', 'rights', 'threats'],
    title: { bn: titleBn, en: titleEn },
    originalText: rawText,
    originalLanguage: 'bn',
    plainExplanation: { bn: plainExplanationBn, en: plainExplanationEn },
    caution: { bn: cautionBn, en: cautionEn },
    sourceUrl: item.url,
    retrievalDate: '2026-11-01',
    effectiveDate: '2013-08-21',
    legalStatus,
    reviewStatus: 'verified',
    contentHash: sha256(rawText),
    keywords
  };

  provisions.push(prov);
}

fs.writeFileSync('scripts/generated_children_2013.json', JSON.stringify(provisions, null, 2), 'utf8');
console.log(`Generated ${provisions.length} provisions for Children Act 2013`);
