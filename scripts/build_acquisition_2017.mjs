import fs from 'fs';

const rawExtracted = JSON.parse(fs.readFileSync('scripts/raw_extracted_1220.json', 'utf8'));

function cleanText(txt) {
  if (!txt) return '';
  return txt
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rsquo;/g, '’')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s+/g, '\n')
    .trim();
}

const acqMeta = {
  1: {
    enTitle: "Short Title and Commencement",
    bnTitle: "সংক্ষিপ্ত শিরোনাম ও প্রবর্তন",
    enExp: "Names the statute as the Acquisition and Requisition of Immovable Property Act, 2017 (Act No. XXI of 2017) and came into force immediately on 21 September 2017.",
    bnExp: "এই আইনটি 'স্থাবর সম্পত্তি অধিগ্রহণ ও হুকুমদখল আইন, ২০১৭' নামে অভিহিত এবং ২১ সেপ্টেম্বর ২০১৭ তারিখে গেজেট প্রকাশের সাথে সাথে অবিলম্বে কার্যকর হয়।",
    enCaution: "Applies to all public and private acquisitions and requisitions of land across Bangladesh, superseding the 1982 Ordinance.",
    bnCaution: "১৯৮২ সালের পূর্ববর্তী অধ্যাদেশ বাতিল করে সমগ্র বাংলাদেশে জমি অধিগ্রহণ ও হুকুমদখলের একমাত্র বিধিবদ্ধ আইন।",
    keywords: ["acquisition act 2017", "jomi odhigrohon ain", "land acquisition compensation bangladesh", "অধিগ্রহণ আইন ২০১৭", "হুকুমদখল", "ধারা ১"]
  },
  2: {
    enTitle: "Definitions of Acquisition, Requisition, and Deputy Commissioner",
    bnTitle: "সংজ্ঞা",
    enExp: "Defines 'acquisition', 'requisition', 'Deputy Commissioner', 'interested person', 'requiring body', 'Arbitrator', and 'award'.",
    bnExp: "অধিগ্রহণ, হুকুমদখল, জেলা প্রশাসক, স্বার্থসংশ্লিষ্ট ব্যক্তি, প্রত্যাশী সংস্থা, আরবিট্রেটর এবং রোয়েদাদের বিধিবদ্ধ সংজ্ঞা।",
    enCaution: "Interested person includes landowners, tenants, bargadars (sharecroppers), and easement holders entitled to compensation.",
    bnCaution: "স্বার্থসংশ্লিষ্ট ব্যক্তির সংজ্ঞায় জমির মালিক ছাড়াও বর্গাদার ও ক্ষতিপূরণ দাবিদাররা অন্তর্ভুক্ত।",
    keywords: ["acquisition definitions", "swarthoshongshlishto bekti", "arbitrator rovedad definition", "অধিগ্রহণ সংজ্ঞা", "ধারা ২"]
  },
  3: {
    enTitle: "Supremacy of the Act Over Other Laws",
    bnTitle: "আইনের প্রাধান্য",
    enExp: "Declares that the provisions of this Act shall prevail notwithstanding anything to the contrary contained in any other law for the time being in force.",
    bnExp: "আপাতত বলবৎ অন্য কোনো আইনে ভিন্নতর কিছু থাকলেও জমি অধিগ্রহণ ও ক্ষতিপূরণ বিষয়ে এই আইনের বিধানাবলিই প্রাধান্য পাবে।",
    enCaution: "All statutory land acquisition procedures must strictly conform to this enactment.",
    bnCaution: "জমি অধিগ্রহণের যাবতীয় কার্যক্রম এই আইনের সুনির্দিষ্ট বিধান মেনেই সম্পন্ন করতে হবে।",
    keywords: ["supremacy acquisition act", "ainer pradhanno", "overriding effect", "আইনের প্রাধান্য", "ধারা ৩"]
  },
  4: {
    enTitle: "Preliminary Notice of Acquisition of Immovable Property",
    bnTitle: "স্থাবর সম্পত্তি অধিগ্রহণের জন্য প্রাথমিক নোটিশ জারি (৪ ধারার নোটিশ)",
    enExp: "Empowers the DC to issue a public preliminary notice of proposed acquisition in public interest, publishing it on the land and prominent local public places.",
    bnExp: "জনস্বার্থে জমি অধিগ্রহণের প্রয়োজনীয়তা দেখা দিলে জেলা প্রশাসক প্রস্তাবিত জমির বিবরণসহ ৪ ধারার প্রাথমিক নোটিশ সংশ্লিষ্ট জমি ও এলাকায় জারি করবেন।",
    enCaution: "After Section 4 notice, any new structure, alteration, tree planting, or land class change made on the land is NOT eligible for compensation.",
    bnCaution: "৪ ধারার নোটিশ জারির পর জমিতে কোনো নতুন ঘরবাড়ি নির্মাণ, গাছ রোপণ বা জমির শ্রেণি পরিবর্তন করলে তার জন্য কোনো ক্ষতিপূরণ পাওয়া যাবে না।",
    keywords: ["section 4 notice land acquisition", "preliminary notice acquisition", "4 dharar notice", "৪ ধারার নোটিশ", "প্রাথমিক নোটিশ", "ধারা ৪"]
  },
  5: {
    enTitle: "Objections Against Acquisition and 15 Working Days Deadline",
    bnTitle: "অধিগ্রহণের বিরুদ্ধে আপত্তি এবং ১৫ কার্যদিবসের সময়সীমা (৫ ধারার আপত্তি)",
    enExp: "Entitles any interested person to submit written objections against the proposed acquisition to the DC within 15 working days from Section 4 notice publication.",
    bnExp: "৪ ধারার নোটিশ জারির ১৫ (পনের) কার্যদিবসের মধ্যে যেকোনো স্বার্থসংশ্লিষ্ট ব্যক্তি জেলা প্রশাসকের নিকট অধিগ্রহণের বিরুদ্ধে লিখিত আপত্তি দাখিল করতে পারেন।",
    enCaution: "Strict 15 working days limitation: failure to file objection within 15 working days waives the right to challenge acquisition before the DC or Commissioner.",
    bnCaution: "কঠোর ১৫ কার্যদিবসের তামাদি: নোটিশের ১৫ কার্যদিবসের মধ্যে লিখিত আপত্তি না জানালে পরবর্তীতে অধিগ্রহণের বিরুদ্ধে আপত্তি জানানোর অধিকার থাকে না।",
    keywords: ["objection against acquisition 15 days", "section 5 objection", "15 karjodibos apotti", "অধিগ্রহণে আপত্তি ১৫ দিন", "ধারা ৫"]
  },
  6: {
    enTitle: "Final Decision on Acquisition",
    bnTitle: "অধিগ্রহণ বিষয়ে চূড়ান্ত সিদ্ধান্ত",
    enExp: "Regulates disposal of objections: up to 50 bighas decided by Divisional Commissioner; above 50 bighas decided by the Government, rendering decision final.",
    bnExp: "৫০ বিঘা পর্যন্ত জমির আপত্তিতে বিভাগীয় কমিশনার এবং ৫০ বিঘার বেশি হলে সরকার চূড়ান্ত সিদ্ধান্ত গ্রহণ করবে।",
    enCaution: "Once final decision is rendered, government gazette declaration solidifies acquisition.",
    bnCaution: "চূড়ান্ত সিদ্ধান্ত গৃহীত হওয়ার পর জমি অধিগ্রহণের ঘোষণা বাধ্যতামূলক ও চূড়ান্ত হিসেবে গণ্য হয়।",
    keywords: ["final decision acquisition", "divisional commissioner decision", "chunanto shiddhanto", "চূড়ান্ত সিদ্ধান্ত", "ধারা ৬"]
  },
  7: {
    enTitle: "Notice to Interested Persons to Submit Claims (Section 7 Notice)",
    bnTitle: "স্বার্থসংশ্লিষ্ট ব্যক্তিকে নোটিশ প্রদান (৭ ধারার নোটিশ)",
    enExp: "Directs DC to issue Section 7 notice requiring owners and interested persons to submit their claims for compensation, documents of title, and property interests within prescribed time.",
    bnExp: "অধিগ্রহণ চূড়ান্ত হওয়ার পর জেলা প্রশাসক স্বার্থসংশ্লিষ্ট ব্যক্তিদের স্বত্ব, মালিকানার দলিল, খতিয়ান ও ক্ষতিপূরণের সুনির্দিষ্ট দাবি দাখিলের জন্য ৭ ধারার নোটিশ জারি করবেন।",
    enCaution: "Submit registered deed (dalil), mutation khatian, latest dakhila (land tax receipt), and bank details to DC Land Acquisition (LA) branch upon receipt.",
    bnCaution: "৭ ধারার নোটিশ পাওয়ার পর মূল দলিল, নামজারি খতিয়ান ও খাজনার রসিদসহ ডিসি অফিসের এলএ শাখায় নির্ধারিত দিনে উপস্থিত হয়ে দাবি দাখিল করতে হবে।",
    keywords: ["section 7 notice acquisition", "claims submission notice", "7 dharar notice", "৭ ধারার নোটিশ", "দাবি দাখিল", "ধারা ৭"]
  },
  8: {
    enTitle: "Preparation of Award by Deputy Commissioner",
    bnTitle: "জেলা প্রশাসক কর্তৃক রোয়েদাদ প্রস্তুত (৮ ধারার রোয়েদাদ)",
    enExp: "Requires DC to inquire into claims, inspect the site, and prepare an official compensation award (রোয়েদাদ) stating true area, market value, and apportionment among owners.",
    bnExp: "দাখিলকৃত দাবি ও সরেজমিন তদন্ত সাপেক্ষে জেলা প্রশাসক জমির সঠিক পরিমাণ, বাজারমূল্য ও মালিকদের হিস্যানুযায়ী আনুষ্ঠানিক ক্ষতিপূরণের রোয়েদাদ প্রস্তুত করবেন।",
    enCaution: "The award fixes the official baseline compensation. Aggrieved owners must accept award under protest to preserve arbitration rights under Section 30.",
    bnCaution: "রোয়েদাদে ক্ষতিপূরণ কম হলে পরবর্তীতে ৩০ ধারায় আরবিট্রেটরে যেতে হলে অবশ্যই 'আপত্তিসহ' (Under protest) রোয়েদাদের টাকা গ্রহণ করতে হবে।",
    keywords: ["preparation of award dc", "section 8 award", "rovedad prostut dc", "রোয়েদাদ প্রস্তুত", "ধারা ৮"]
  },
  9: {
    enTitle: "Matters Considered in Determining Compensation: 200% and 300% Premium",
    bnTitle: "ক্ষতিপূরণ নির্ধারণের ক্ষেত্রে বিবেচ্য বিষয়াবলি (২০০% ও ৩০০% অতিরিক্ত ক্ষতিপূরণ)",
    enExp: "Prescribes statutory compensation: average market value of preceding 12 months deeds PLUS additional 200% premium for Government projects (300% total), and additional 300% premium for private projects (400% total), plus crop/structure/severance damages.",
    bnExp: "ক্ষতিপূরণের পরিমাণ: পূর্ববর্তী ১২ মাসের দলিলের গড় বাজারমূল্য; সরকারি অধিগ্রহণে বাজারমূল্যের অতিরিক্ত ২০০% প্রিমিয়াম (মোট ৩ গুণ বা ৩০০%); বেসরকারি সংস্থায় অতিরিক্ত ৩০০% প্রিমিয়াম (মোট ৪ গুণ বা ৪০০%); সাথে ফসল, গাছপালা ও ঘরবাড়ির ক্ষতিপূরণ।",
    enCaution: "Government projects entitle owners to 3x market value (100% base + 200% premium); private/commercial projects entitle owners to 4x market value (100% base + 300% premium).",
    bnCaution: "সরকারি প্রকল্পে জমির বাজারমূল্যের ৩ গুণ (২০০% অতিরিক্ত) এবং বেসরকারি প্রকল্পে ৪ গুণ (৩০০% অতিরিক্ত) ক্ষতিপূরণ পাওয়া নাগরিকের বিধিবদ্ধ অধিকার।",
    keywords: ["compensation 200 percent premium", "300 percent premium acquisition", "3x market value government", "4x private project", "অতিরিক্ত ২০০% ক্ষতিপূরণ", "৩০০% প্রিমিয়াম", "ধারা ৯", "৩ গুণ ক্ষতিপূরণ"]
  },
  10: {
    enTitle: "Matters Not Considered in Determining Compensation",
    bnTitle: "ক্ষতিপূরণ নির্ধারণে যে সকল বিষয় বিবেচ্য নয়",
    enExp: "Lists factors excluded from compensation: degree of urgency, disinclination of person to part with land, damage by private person, or post-notice speculative improvements.",
    bnExp: "অধিগ্রহণের জরুরি তাগিদ, অনিচ্ছাকৃত জমি হস্তান্তর, বা নোটিশের পর জমির কৃত্রিম মূল্য বৃদ্ধির কোনো দাবি ক্ষতিপূরণ নির্ধারণে গণ্য হবে না।",
    enCaution: "Speculative post-notice transactions or artificial value inflation will be rejected by the DC.",
    bnCaution: "নোটিশের পর কৃত্রিমভাবে বেশি মূল্যে দলিল রেজিস্ট্রি দেখিয়ে অতিরিক্ত ক্ষতিপূরণের দাবি আইনত গ্রহণযোগ্য নয়।",
    keywords: ["matters not considered compensation", "excluded factors acquisition", "khotipuron obibechito", "বিবেচ্য নয় ক্ষতিপূরণ", "ধারা ১০"]
  },
  11: {
    enTitle: "Payment of Compensation Before Possession",
    bnTitle: "ক্ষতিপূরণ প্রদান",
    enExp: "Mandates that compensation awarded under Section 8 must be paid or deposited in the public account of the Republic before physical possession is taken by the DC.",
    bnExp: "জমির শারীরিক দখল গ্রহণের পূর্বে জেলা প্রশাসক অবশ্যই স্বার্থসংশ্লিষ্ট মালিকগণকে ক্ষতিপূরণ পরিশোধ করবেন অথবা সরকারি তহবিলে জমা রাখবেন।",
    enCaution: "Taking physical possession without tendering or depositing the awarded compensation is strictly unlawful.",
    bnCaution: "ক্ষতিপূরণের অর্থ প্রদান বা সরকারি অ্যাকাউন্টে জমা না দিয়ে জোরপূর্বক জমির দখল গ্রহণ বেআইনি।",
    keywords: ["payment compensation before possession", "khotipuron prodan", "dokholl purbe taka", "দখল গ্রহণের পূর্বে ক্ষতিপূরণ", "ধারা ১১"]
  },
  12: {
    enTitle: "Compensation to Bargadars (Sharecroppers)",
    bnTitle: "বর্গাদারকে ক্ষতিপূরণ প্রদান",
    enExp: "Explicitly guarantees that sharecroppers (bargadars) cultivating the acquired land shall receive fair direct compensation for their standing crops and agricultural investments.",
    bnExp: "অধিগ্রহণকৃত জমিতে বর্গাদার কোনো ফসল আবাদ করিয়া থাকিলে উক্ত ফসলের সম্পূর্ণ ক্ষতিপূরণ সরাসরি বর্গাদারকে প্রদান করা বাধ্যতামূলক।",
    enCaution: "Landowners cannot claim the crop compensation belonging to the cultivating bargadar.",
    bnCaution: "ফসলের ক্ষতিপূরণের টাকা জমির মালিক নয়, বরং চাষকারী বর্গাদার সরাসরি পাওয়ার আইনগত অধিকারী।",
    keywords: ["bargadar compensation acquisition", "sharecropper crop damage", "borgadar khotipuron", "বর্গাদার ক্ষতিপূরণ", "ধারা ১২"]
  },
  13: {
    enTitle: "Acquisition and Taking Physical Possession",
    bnTitle: "অধিগ্রহণ এবং দখল গ্রহণ",
    enExp: "Empowers the DC to enter upon and take physical possession of the land after compensation payment/deposit, upon which the land vests absolutely in Government free from all encumbrances.",
    bnExp: "ক্ষতিপূরণ প্রদানের পর জেলা প্রশাসক জমির দখল গ্রহণ করবেন এবং উক্ত জমি যাবতীয় দায়মুক্তভাবে সরকারের অনুকূলে চূড়ান্তভাবে ন্যস্ত হবে।",
    enCaution: "Upon vesting, all previous mortgages, leases, and charges on the property stand extinguished against the land.",
    bnCaution: "দখল গ্রহণের সাথে সাথে জমিতে পূর্ববর্তী সকল বন্ধক ও দায় বিলুপ্ত হয়ে ক্ষতিপূরণের টাকার ওপর স্থানান্তরিত হয়।",
    keywords: ["taking possession vesting free encumbrances", "dokhol grohon", "daymukto sorkare nesto", "দখল গ্রহণ দায়মুক্ত", "ধারা ১৩"]
  },
  14: {
    enTitle: "Revocation or Withdrawal of Acquisition Proceedings",
    bnTitle: "অধিগ্রহণ কার্যক্রম বাতিল অথবা প্রত্যাহার",
    enExp: "Authorizes the Government to revoke or withdraw from acquisition at any stage before possession is taken, paying compensation for damages suffered during proceedings.",
    bnExp: "জমির দখল গ্রহণের পূর্ব পর্যন্ত সরকার যেকোনো সময় অধিগ্রহণ কার্যক্রম প্রত্যাহার বা বাতিল করতে পারে; তবে মালিকের ক্ষয়ক্ষতি হলে ক্ষতিপূরণ দিতে হবে।",
    enCaution: "Once physical possession is taken under Section 13, acquisition cannot be revoked.",
    bnCaution: "একবার শারীরিক দখল গ্রহণ সম্পন্ন হয়ে গেলে অধিগ্রহণ প্রত্যাহার করার কোনো সুযোগ থাকে না।",
    keywords: ["withdrawal of acquisition", "revocation acquisition", "odhigrohon prottehar", "অধিগ্রহণ প্রত্যাহার", "ধারা ১৪"]
  },
  15: {
    enTitle: "Restriction on Partial Acquisition of Dwelling-House or Building",
    bnTitle: "ঘর-বাড়ি অথবা ইমারতের আংশিক অধিগ্রহণ",
    enExp: "Prohibits acquiring only a fraction of any house, manufactory, or other building if the owner demands in writing that the whole building must be acquired.",
    bnExp: "মালিক যদি লিখিতভাবে দাবি করেন যে তার বাড়ি, কারখানা বা ভবনের সম্পূর্ণ অংশ অধিগ্রহণ করতে হবে, তবে কর্তৃপক্ষ কেবল আংশিক অধিগ্রহণ করতে পারবে না।",
    enCaution: "Protects citizens from having half their home demolished while left with an unusable remnant; entire structure must be compensated.",
    bnCaution: "বসতবাড়ির অর্ধাংশ ভেঙে রেখে যাওয়া যাবে না; মালিক চাইলে সম্পূর্ণ ভবনের ক্ষতিপূরণ দাবি করতে পারেন।",
    keywords: ["partial acquisition house building", "whole building acquisition demand", "ghorbari angshik odhigrohon", "ঘরবাড়ি আংশিক অধিগ্রহণ", "ধারা ১৫"]
  },
  16: {
    enTitle: "Acquisition of Immovable Property for Private Persons or Entities",
    bnTitle: "বেসরকারি ব্যক্তি বা প্রতিষ্ঠানের অনুকূলে স্থাবর সম্পত্তি অধিগ্রহণ",
    enExp: "Regulates acquisitions for private non-government entities: requires prior agreement, statutory 300% premium payment, and execution of formal transfer agreement.",
    bnExp: "বেসরকারি ব্যক্তি বা বাণিজ্যিক সংস্থার জন্য জমি অধিগ্রহণে পূর্বচুক্তি এবং ৩০০% অতিরিক্ত ক্ষতিপূরণ (মোট ৪ গুণ মূল্য) পরিশোধ বাধ্যতামূলক।",
    enCaution: "Private acquiring body must deposit the entire 400% compensation funds before proceedings advance.",
    bnCaution: "বেসরকারি প্রকল্পে পুরো ৪০০% ক্ষতিপূরণের অর্থ সরকারি কোষাগারে জমা নিশ্চিত করতে হয়।",
    keywords: ["private acquisition 300 percent", "commercial land acquisition", "beshorkari odhigrohon", "বেসরকারি অধিগ্রহণ", "ধারা ১৬"]
  },
  17: {
    enTitle: "Transfer of Acquired Land to Private Requiring Body",
    bnTitle: "অধিগ্রহণকৃত জমি বেসরকারি প্রত্যাশী ব্যক্তি বা সংস্থার নিকট হস্তান্তর",
    enExp: "Governs formal conveyance of acquired land to private bodies, restricting use strictly to the sanctioned public purpose under penal forfeiture.",
    bnExp: "অধিগ্রহণকৃত জমি প্রত্যাশী সংস্থার নিকট হস্তান্তর এবং প্রতিশ্রুত সুনির্দিষ্ট উদ্দেশ্য ছাড়া অন্য কোনো উদ্দেশ্যে ব্যবহার নিষিদ্ধকরণ।",
    enCaution: "Using acquired land for unauthorized speculative purposes leads to resumption by Government.",
    bnCaution: "যে উদ্দেশ্যে অধিগ্রহণ করা হয়েছে তার বাইরে অন্য কাজে ব্যবহার করলে জমি সরকারে বাজেয়াপ্ত হতে পারে।",
    keywords: ["transfer to requiring body", "prottashi shongstha", "purpose restriction", "প্রত্যাশী সংস্থাকে হস্তান্তর", "ধারা ১৭"]
  },
  18: {
    enTitle: "Recovery of Excess or Mistakenly Paid Compensation",
    bnTitle: "কতিপয় ক্ষেত্রে ক্ষতিপূরণের অর্থ পুনরুদ্ধার",
    enExp: "Empowers the DC to recover any compensation money paid to a wrong person or through fraud/mistake as a public demand under the Public Demands Recovery Act, 1913.",
    bnExp: "ভুল ব্যক্তি বা প্রতারণার মাধ্যমে ক্ষতিপূরণের অর্থ গ্রহণ করলে তা সরকারি পাওনা হিসেবে সার্টিফিকেট মামলায় আদায় করার ক্ষমতা।",
    enCaution: "Fraudulent withdrawal of compensation attracts both PDR Act certificate warrant and criminal prosecution.",
    bnCaution: "ভুয়া ওয়ারিশ সেজে অন্যের ক্ষতিপূরণ তুললে সার্টিফিকেট মামলায় ক্রোক ছাড়াও জেল হতে পারে।",
    keywords: ["recovery excess compensation", "pdr act certificate recovery", "khotipuron punoruddhar", "ক্ষতিপূরণ পুনরুদ্ধার", "ধারা ১৮"]
  },
  19: {
    enTitle: "Statutory Use of Acquired Immovable Property",
    bnTitle: "অধিগ্রহণকৃত স্থাবর সম্পত্তি ব্যবহার",
    enExp: "Mandates that acquired land must be utilized solely for the designated project and public purpose for which it was sanctioned.",
    bnExp: "অধিগ্রহণকৃত জমি কেবলমাত্র অনুমোদিত প্রকল্প ও জনকল্যাণমূলক উদ্দেশ্যেই ব্যবহার করার আইনি বাধ্যবাধকতা।",
    enCaution: "Surplus or unutilized land cannot be sold privately by requiring body; must be surrendered back to DC.",
    bnCaution: "অতিরিক্ত বা অব্যবহৃত জমি বেসরকারিভাবে বিক্রি করা বেআইনি; তা জেলা প্রশাসকের খাস খতিয়ানে ফেরত দিতে হয়।",
    keywords: ["use acquired property", "surplus land surrender dc", "jomi byabohar", "অধিগ্রহণকৃত জমি ব্যবহার", "ধারা ১৯"]
  },
  20: {
    enTitle: "Requisition of Immovable Property for Public Emergency",
    bnTitle: "স্থাবর সম্পত্তি হুকুমদখল (২০ ধারা)",
    enExp: "Authorizes the DC to temporarily requisition any immovable property for public emergency or temporary administrative necessity by written order.",
    bnExp: "জনপ্রয়োজনে বা জরুরি সরকারি প্রয়োজনে জেলা প্রশাসক লিখিত আদেশের মাধ্যমে সাময়িকভাবে কোনো জমি বা ভবন হুকুমদখল করতে পারেন।",
    enCaution: "Requisition is temporary; religious places, educational institutions, and graveyards CANNOT be requisitioned.",
    bnCaution: "হুকুমদখল সাময়িক ব্যবস্থা; কোনো মসজিদ, মন্দির, শিক্ষাপ্রতিষ্ঠান বা কবরস্থান হুকুমদখল করা যায় না।",
    keywords: ["requisition immovable property", "temporary emergency requisition", "hukumdokhol 20 dhara", "হুকুমদখল", "ধারা ২০"]
  },
  21: {
    enTitle: "Revision of Requisition Orders",
    bnTitle: "আদেশ সংশোধন",
    enExp: "Empowers the DC or Government to revise, amend, or modify any temporary requisition order passed under Section 20.",
    bnExp: "হুকুমদখলের আদেশে কোনো অসঙ্গতি থাকলে জেলা প্রশাসক বা সরকার তা সংশোধন করতে পারেন।",
    enCaution: "Aggrieved owners can petition for exemption or reduction of requisitioned area.",
    bnCaution: "হুকুমদখলে মারাত্মক ক্ষতি হলে তা সংশোধনের জন্য লিখিত আবেদন করা যায়।",
    keywords: ["revision requisition order", "amendment requisition", "adesh shongshodhon", "আদেশ সংশোধন", "ধারা ২১"]
  },
  22: {
    enTitle: "Preparation of Award for Requisition Compensation",
    bnTitle: "জেলা প্রশাসক কর্তৃক রোয়েদাদ প্রস্তুত (হুকুমদখল)",
    enExp: "Requires DC to determine fair monthly or periodic rental compensation and property damages for requisitioned property.",
    bnExp: "হুকুমদখলকৃত সম্পত্তির মাসিক ভাড়া ও সম্ভাব্য ক্ষয়ক্ষতির হিসাব করে জেলা প্রশাসক ক্ষতিপূরণের রোয়েদাদ তৈরি করবেন।",
    enCaution: "Rental compensation must reflect prevailing commercial market rent in the locality.",
    bnCaution: "হুকুমদখলকৃত ভবনের মাসিক ভাড়া এলাকার প্রচলিত ভাড়ার সাথে সঙ্গতিপূর্ণ হতে হবে।",
    keywords: ["requisition award dc", "monthly rent requisition", "hukumdokhol rovedad", "হুকুমদখল রোয়েদাদ", "ধারা ২২"]
  },
  23: {
    enTitle: "Payment of Requisition Compensation",
    bnTitle: "ক্ষতিপূরণ প্রদান (হুকুমদখল)",
    enExp: "Requires periodic and timely payment of determined requisition rent and damages to the property owner.",
    bnExp: "হুকুমদখলের নির্ধারিত ক্ষতিপূরণ ও ভাড়া নিয়মিতভাবে সম্পত্তির মালিককে পরিশোধ করার বাধ্যবাধকতা।",
    enCaution: "Delay in rent disbursement gives rise to claim for commercial interest.",
    bnCaution: "ভাড়া বা ক্ষতিপূরণ পরিশোধে বিলম্ব হলে অতিরিক্ত সুদ দাবি করা যায়।",
    keywords: ["payment requisition compensation", "hukumdokhol khotipuron prodan", "হুকুমদখল ক্ষতিপূরণ প্রদান", "ধারা ২৩"]
  },
  24: {
    enTitle: "Recovery of Expenses from Allotted Person",
    bnTitle: "হুকুমদখলকৃত স্থাবর সম্পত্তির বরাদ্দপ্রাপ্ত ব্যক্তির নিকট হইতে অর্থ আদায়",
    enExp: "Authorizes recovery of requisition expenses and maintenance charges from the entity or person in actual temporary occupation.",
    bnExp: "হুকুমদখলকৃত সম্পত্তি যে সংস্থার অনুকূলে বরাদ্দ দেওয়া হয়েছে তার নিকট থেকে খরচ আদায়ের বিধান।",
    enCaution: "The occupant entity is legally responsible for utility and operational bills.",
    bnCaution: "ব্যবহারকারী সংস্থা বিদ্যুৎ ও গ্যাস বিলসহ যাবতীয় খরচ বহন করতে বাধ্য।",
    keywords: ["recovery expenses allotted person", "occupant charges requisition", "ortho aday", "অর্থ আদায়", "ধারা ২৪"]
  },
  25: {
    enTitle: "Maintenance and Upkeep of Requisitioned Property",
    bnTitle: "হুকুমদখলকৃত স্থাবর সম্পত্তি রক্ষণাবেক্ষণ",
    enExp: "Requires the occupant authority to maintain the requisitioned property in good tenantable repair and prevent waste or destruction.",
    bnExp: "হুকুমদখলে থাকাকালে ভবনের যথাযথ রক্ষণাবেক্ষণ ও ক্ষয়ক্ষতি রোধের আইনগত বাধ্যবাধকতা।",
    enCaution: "Owner is entitled to full restoration damages upon return if property is damaged during requisition.",
    bnCaution: "হুকুমদখলে থাকাকালে সম্পত্তি ক্ষতিগ্রস্ত হলে অবমুক্তির সময় ক্ষতিপূরণ প্রদান বাধ্যতামূলক।",
    keywords: ["maintenance requisitioned property", "prevent waste requisition", "rokkhonabekkhon", "রক্ষণাবেক্ষণ", "ধারা ২৫"]
  },
  26: {
    enTitle: "Release from Requisition and Restoration to Owner",
    bnTitle: "হুকুমদখল অবমুক্তকরণ",
    enExp: "Mandates that when the public emergency ceases, the property must be released from requisition and physical possession restored to the owner.",
    bnExp: "প্রয়োজন শেষ হওয়া মাত্র সম্পত্তিটি হুকুমদখল মুক্ত করে প্রকৃত মালিকের নিকট হস্তান্তর করতে হবে।",
    enCaution: "Requisition cannot be continued indefinitely as disguised acquisition; property must be acquired or returned.",
    bnCaution: "স্থায়ীভাবে আটকে রাখার জন্য হুকুমদখল ব্যবহার করা যাবে না; স্থায়ী প্রয়োজন হলে নিয়মিত অধিগ্রহণ করতে হবে।",
    keywords: ["release from requisition", "restoration property to owner", "hukumdokhol obomuktoboron", "হুকুমদখল অবমুক্তকরণ", "ধারা ২৬"]
  },
  27: {
    enTitle: "Eviction of Unauthorized Occupant from Requisitioned Property",
    bnTitle: "বরাদ্দপ্রাপ্ত ব্যক্তিকে উচ্ছেদ",
    enExp: "Empowers the DC to summarily evict any allotted person or organization refusing to vacate after expiry of requisition period.",
    bnExp: "হুকুমদখলের মেয়াদ শেষ হওয়ার পর দখল ছাড়তে অস্বীকৃতি জানালে জেলা প্রশাসক উচ্ছেদ করতে পারেন।",
    enCaution: "Enables administrative eviction without needing a civil suit.",
    bnCaution: "মেয়াদান্তে খালি না করলে ম্যাজিস্ট্রেট সরাসরি পুলিশ ফোর্স দিয়ে খালি করে নিতে পারেন।",
    keywords: ["eviction occupant requisition", "summary eviction dc", "ucched hukumdokhol", "উচ্ছেদ হুকুমদখল", "ধারা ২৭"]
  },
  28: {
    enTitle: "Non-Application to Cantonment Areas",
    bnTitle: "ক্যান্টনমেন্ট এলাকায় প্রযোজ্য নয়",
    enExp: "Exempts cantonment lands governed by military cantonment authorities from the requisition provisions of this chapter.",
    bnExp: "সেনানিবাস বা ক্যান্টনমেন্ট এলাকার আওতাধীন জমির ক্ষেত্রে এই অধ্যায়ের বিধানাবলি প্রযোজ্য নয়।",
    enCaution: "Cantonments Act and defense land regulations govern cantonment areas separately.",
    bnCaution: "সেনানিবাস এলাকার জন্য পৃথক প্রতিরক্ষা ভূমি আইন প্রযোজ্য।",
    keywords: ["cantonment area exemption", "military land requisition", "ক্যান্টনমেন্ট অব্যাহতি", "ধারা ২৮"]
  },
  29: {
    enTitle: "Appointment of Arbitrators (Joint District Judges)",
    bnTitle: "আরবিট্রেটর নিয়োগ (২৯ ধারা)",
    enExp: "Directs Government to appoint judicial officers of the rank of Joint District Judge as Arbitrators to resolve land acquisition compensation disputes.",
    bnExp: "ক্ষতিপূরণ সংক্রান্ত বিরোধ নিষ্পত্তির লক্ষ্যে সরকার সরকারি গেজেটে প্রজ্ঞাপন দ্বারা যুগ্ম জেলা জজ পদমর্যাদার বিচারিক কর্মকর্তাকে আরবিট্রেটর নিয়োগ করবেন।",
    enCaution: "The Arbitrator operates as a specialized statutory judicial tribunal to determine fair market value.",
    bnCaution: "জেলা প্রশাসকের ক্ষতিপূরণ কম হলে তা পুনর্বিবেচনার একমাত্র প্রাথমিক বিচারিক ফোরাম হলেন আরবিট্রেটর (যুগ্ম জেলা জজ)।",
    keywords: ["arbitrator appointment joint district judge", "section 29 arbitrator", "arbitrator niyog", "আরবিট্রেটর নিয়োগ", "ধারা ২৯"]
  },
  30: {
    enTitle: "Application to Arbitrator and 45-Day Limitation Period",
    bnTitle: "আরবিট্রেটরের নিকট আবেদন এবং ৪৫ দিনের তামাদি (৩০ ধারা)",
    enExp: "Entitles any interested person dissatisfied with the DC's award to apply to the Arbitrator within 45 days of notice of award to increase compensation.",
    bnExp: "ডিসি কর্তৃক ধার্যকৃত রোয়েদাদের ক্ষতিপূরণে অসন্তুষ্ট হলে রোয়েদাদের নোটিশ প্রাপ্তির ৪৫ দিনের মধ্যে আরবিট্রেটরের নিকট ক্ষতিপূরণ বৃদ্ধির আবেদন করতে হবে।",
    enCaution: "Strict 45-day limitation: apply within exactly 45 days. Must accept DC compensation 'under protest' (আপত্তিসহ) to preserve locus standi.",
    bnCaution: "কঠোর ৪৫ দিনের তামাদি সময়সীমা। নোটিশ প্রাপ্তির ৪৫ দিনের মধ্যে যুগ্ম জেলা জজ (আরবিট্রেটর) আদালতে আরজি দাখিল করতে হবে এবং ডিসি অফিস থেকে টাকা নেওয়ার সময় রসিদে 'আপত্তিসহ গ্রহণ করিলাম' লিখতে হবে।",
    keywords: ["application to arbitrator 45 days", "section 30 arbitrator limitation", "under protest award", "আরবিট্রেটরে আবেদন ৪৫ দিন", "ধারা ৩০", "আপত্তিসহ রোয়েদাদ গ্রহণ"]
  },
  31: {
    enTitle: "Notice of Hearing Before Arbitrator",
    bnTitle: "শুনানির নোটিশ",
    enExp: "Directs the Arbitrator to issue formal notice of hearing specifying date and time to the applicant, requiring body, and Deputy Commissioner.",
    bnExp: "আবেদনের পর আরবিট্রেটর আবেদনকারী, জেলা প্রশাসক এবং প্রত্যাশী সংস্থাকে শুনানির তারিখ উল্লেখপূর্বক লিখিত নোটিশ জারি করবেন।",
    enCaution: "All relevant registered sales deeds and expert valuation evidence must be submitted during hearing.",
    bnCaution: "শুনানিতে ওই মৌজার সর্বোচ্চ মূল্যের সার্টিফাইড রেজিস্ট্রি দলিল ও কাঠামোগত মূল্যায়ন রিপোর্ট দাখিল করতে হয়।",
    keywords: ["notice of hearing arbitrator", "arbitration summons", "shunanir notice", "শুনানির নোটিশ", "ধারা ৩১"]
  },
  32: {
    enTitle: "Scope of Arbitration Proceedings",
    bnTitle: "কার্যধারার পরিধি",
    enExp: "Restricts the scope of inquiry before the Arbitrator strictly to the determination of fair compensation and apportionment among entitled claimants.",
    bnExp: "আরবিট্রেটরের নিকট শুনানির পরিধি কেবলমাত্র সঠিক ক্ষতিপূরণ নির্ধারণ ও স্বার্থসংশ্লিষ্ট পক্ষগণের মধ্যে তা বণ্টনের মধ্যেই সীমাবদ্ধ থাকবে।",
    enCaution: "The Arbitrator CANNOT question the validity of the acquisition itself; inquiry is limited strictly to compensation quantum.",
    bnCaution: "আরবিট্রেটর আদালতের এখতিয়ার কেবল ক্ষতিপূরণের টাকা বৃদ্ধি ও বণ্টনে সীমাবদ্ধ; জমি অধিগ্রহণের বৈধতা তিনি চ্যালেঞ্জ করতে পারেন না।",
    keywords: ["scope arbitration proceedings", "compensation determination only", "karjodharar poridhi", "কার্যধারার পরিধি", "ধারা ৩২"]
  },
  33: {
    enTitle: "Procedure of Arbitrator in Determining Compensation",
    bnTitle: "ক্ষতিপূরণ নির্ধারণে আরবিট্রেটরের কর্মপদ্ধতি",
    enExp: "Guides Arbitrator in applying Section 9 valuation principles, considering mauza rate, comparable sales, infrastructure, and the mandatory 200%/300% premiums.",
    bnExp: "ধারা ৯-এর মূলনীতি অনুযায়ী মৌজার দলিলের বাজারমূল্য, অবস্থান, অবকাঠামোগত মান এবং ২০০% বা ৩০০% অতিরিক্ত ক্ষতিপূরণ হিসাব করার বিচারিক কর্মপদ্ধতি।",
    enCaution: "The Arbitrator must add the statutory 200% (Govt) or 300% (Private) premium onto any enhanced market value awarded.",
    bnCaution: "আরবিট্রেটর যদি জমির বাজারমূল্য বাড়িয়ে দেন, তবে বর্ধিত মূল্যের ওপরও আইনানুগ ২০০% বা ৩০০% অতিরিক্ত প্রিমিয়াম দিতে হবে।",
    keywords: ["arbitrator compensation calculation", "200 300 premium arbitrator", "khotipuron kormopoddhoti", "আরবিট্রেটরের কর্মপদ্ধতি", "ধারা ৩৩"]
  },
  34: {
    enTitle: "Award Decreed by Arbitrator",
    bnTitle: "আরবিট্রেটর কর্তৃক ধার্যকৃত রোয়েদাদ",
    enExp: "Mandates that the Arbitrator shall sign and deliver a formal reasoned written award specifying enhanced compensation, interest, and costs.",
    bnExp: "আরবিট্রেটর বর্ধিত ক্ষতিপূরণের পরিমাণ, সুদ এবং খরচের যৌক্তিক কারণ উল্লেখপূর্বক লিখিত ও স্বাক্ষরিত রোয়েদাদ প্রদান করবেন।",
    enCaution: "Operates as a civil court money decree executable under Order XXI CPC.",
    bnCaution: "আরবিট্রেটরের রোয়েদাদ দেওয়ানি আদালতের ডিক্রির ন্যায় কার্যকরযোগ্য।",
    keywords: ["award by arbitrator", "arbitration decree", "arbitrator rovedad", "আরবিট্রেটর রোয়েদাদ", "ধারা ৩৪"]
  },
  35: {
    enTitle: "Costs of Arbitration Proceedings",
    bnTitle: "মামলার ব্যয়",
    enExp: "Authorizes the Arbitrator to award reasonable costs of litigation and legal fees against the requiring body or unsuccessful party.",
    bnExp: "মামলার পরিচালনা খরচ ও আনুষঙ্গিক ব্যয় কার দ্বারা প্রদেয় হবে তা নির্ধারণের ক্ষমতা।",
    enCaution: "Awarded costs can be recovered from the requiring body alongside compensation.",
    bnCaution: "ক্ষতিপূরণের টাকার পাশাপাশি মামলার খরচও প্রত্যাশী সংস্থার নিকট থেকে আদায় করা যায়।",
    keywords: ["costs arbitration proceedings", "legal costs acquisition", "mamlar byay", "মামলার ব্যয়", "ধারা ৩৫"]
  },
  36: {
    enTitle: "Appeal Against Arbitrator's Award to Arbitration Appellate Tribunal (30 Days)",
    bnTitle: "আরবিট্রেটর কর্তৃক ধার্যকৃত রোয়েদাদের বিরুদ্ধে আপিল এবং ৩০ দিনের তামাদি (৩৬ ধারা)",
    enExp: "Permits any aggrieved party to appeal against the Arbitrator's award to the Arbitration Appellate Tribunal (District Judge) within 30 days of the award.",
    bnExp: "আরবিট্রেটরের রোয়েদাদে সংক্ষুব্ধ যেকোনো পক্ষ রোয়েদাদের অনুলিপি পাওয়ার ৩০ দিনের মধ্যে জেলা জজের সমন্বয়ে গঠিত আরবিট্রেশন অ্যাপিলেট ট্রাইব্যুনালে আপিল দায়ের করতে পারেন।",
    enCaution: "Strict 30-day limitation: file appeal with certified copy before the District Judge Tribunal within 30 days. Tribunal's decision is final under Section 36(5).",
    bnCaution: "কঠোর ৩০ দিনের তামাদি সময়সীমা: রোয়েদাদের সার্টিফাইড কপিসহ ৩০ দিনের মধ্যে জেলা জজ আদালতে আপিল ট্রাইব্যুনালে আপিল দাখিল করতে হবে। ট্রাইব্যুনালের রায় চূড়ান্ত।",
    keywords: ["appeal arbitrator award 30 days", "arbitration appellate tribunal district judge", "section 36 appeal limitation", "আরবিট্রেটর আপিল ৩০ দিন", "আপিল ট্রাইব্যুনাল জেলা জজ", "ধারা ৩৬"]
  },
  37: {
    enTitle: "Payment of Additional Enhanced Compensation with Interest",
    bnTitle: "অতিরিক্ত ক্ষতিপূরণ প্রদান",
    enExp: "Requires the requiring body to pay the enhanced compensation decreed by Arbitrator or Tribunal with interest from the date of taking possession.",
    bnExp: "আরবিট্রেটর বা ট্রাইব্যুনাল কর্তৃক বর্ধিত অতিরিক্ত ক্ষতিপূরণের অর্থ দখল গ্রহণের তারিখ থেকে সুদসহ প্রত্যাশী সংস্থাকে পরিশোধ করার বাধ্যবাধকতা।",
    enCaution: "Interest runs continuously until full enhanced compensation is disbursed to the citizen.",
    bnCaution: "সম্পূর্ণ বর্ধিত ক্ষতিপূরণ পরিশোধ না হওয়া পর্যন্ত নির্ধারিত হারে সুদ প্রযোজ্য থাকে।",
    keywords: ["additional compensation with interest", "enhanced compensation payment", "otirikto khotipuron shud", "অতিরিক্ত ক্ষতিপূরণ সুদ", "ধারা ৩৭"]
  },
  38: {
    enTitle: "Non-Application of the Arbitration Act, 2001",
    bnTitle: "২০০১ সনের ১ নং আইনের অপ্রযোজ্যতা",
    enExp: "Explicitly clarifies that the general Arbitration Act, 2001 (Act No. I of 2001) does not apply to proceedings before Arbitrators or Tribunals under this Act.",
    bnExp: "সাধারণ সালিস আইন ২০০১-এর বিধানাবলি এই আইনের অধীন আরবিট্রেটর বা ট্রাইব্যুনালের ক্ষেত্রে প্রযোজ্য হবে না।",
    enCaution: "Statutory arbitration is self-contained exclusively within Sections 29 to 37 of this Act.",
    bnCaution: "জমি অধিগ্রহণের আরবিট্রেশন এই আইনের নিজস্ব কাঠামোর অধীনেই পরিচালিত হয়।",
    keywords: ["arbitration act 2001 non application", "self-contained statutory arbitration", "shalish ain oproyojyota", "২০০১ সনের আইন অপ্রযোজ্য", "ধারা ৩৮"]
  },
  39: {
    enTitle: "Civil Court Powers of DC and Arbitrator",
    bnTitle: "জেলা প্রশাসক এবং আরবিট্রেটরের দেওয়ানি আদালতের কতিপয় ক্ষমতা",
    enExp: "Vests the DC and Arbitrator with powers of a civil court under CPC for summoning witnesses, compelling document production, and issuing discovery commissions.",
    bnExp: "সাক্ষী তলব, দলিল দাখিলে বাধ্য করা ও কমিশন জারির ক্ষেত্রে জেলা প্রশাসক ও আরবিট্রেটরের দেওয়ানি আদালতের সমমানের ক্ষমতা।",
    enCaution: "Enables issuance of witness summons to Sub-Registrars to produce deed registers.",
    bnCaution: "সাব-রেজিস্ট্রি অফিসের বালাম বই বা দলিলের মূল রেকর্ড তলবের জন্য এই ক্ষমতা প্রয়োগ করা যায়।",
    keywords: ["civil court powers dc arbitrator", "summoning witnesses cpc", "dewani adalot khomota", "দেওয়ানি আদালত ক্ষমতা", "ধারা ৩৯"]
  },
  40: {
    enTitle: "Power of Entry and Inspection",
    bnTitle: "প্রবেশ এবং পরিদর্শনের ক্ষমতা",
    enExp: "Authorizes the DC and survey officers to enter, survey, set boundary marks, and inspect land proposed for acquisition after reasonable notice.",
    bnExp: "অধিগ্রহণের উদ্দেশ্যে জমিতে প্রবেশ, পরিমাপ, সীমানা নির্ধারণ ও পরিদর্শনের আইনি ক্ষমতা।",
    enCaution: "Cannot enter residential dwelling compounds without reasonable notice to occupants.",
    bnCaution: "আবাসিক ভবনে প্রবেশের পূর্বে পরিবারকে যুক্তিসঙ্গত নোটিশ প্রদান করতে হবে।",
    keywords: ["power of entry survey inspection", "probesh poridoroshan", "প্রবেশ পরিদর্শন ক্ষমতা", "ধারা ৪০"]
  },
  41: {
    enTitle: "Power to Require Information",
    bnTitle: "তথ্য সংগ্রহের ক্ষমতা",
    enExp: "Empowers the DC to order any person to furnish information, land documents, deeds, or rent receipts related to the acquired property.",
    bnExp: "জমির স্বত্ব ও স্বার্থ যাচাইয়ের জন্য যেকোনো ব্যক্তিকে তথ্য ও নথিপত্র দাখিলের নির্দেশ দেওয়ার ক্ষমতা।",
    enCaution: "Willful withholding of requested documents can prejudice compensation claims.",
    bnCaution: "কাগজপত্র জমা না দিলে ক্ষতিপূরণ আটকে যেতে পারে।",
    keywords: ["power require information", "tottho shonggroho", "তথ্য সংগ্রহের ক্ষমতা", "ধারা ৪১"]
  },
  42: {
    enTitle: "Service of Notices and Orders",
    bnTitle: "নোটিশ ও আদেশ জারি",
    enExp: "Prescribes procedure for serving statutory notices by personal delivery, registered post, or affixture on prominent part of property.",
    bnExp: "সংশ্লিষ্ট ব্যক্তির নিকট সরাসরি হস্তান্তর, রেজিস্ট্রি ডাকযোগে বা জমিতে ঝুলিয়ে দিয়ে নোটিশ জারির আইনি পদ্ধতি।",
    enCaution: "Service on property or adult family member constitutes legal notice under the Act.",
    bnCaution: "জমিতে নোটিশ লটকিয়ে দিলে তা আইনত নোটিশ জারি হিসেবে গণ্য হয়।",
    keywords: ["service of notices orders", "notice jari poddhoti", "নোটিশ আদেশ জারি", "ধারা ৪২"]
  },
  43: {
    enTitle: "Penalties for False Claims or Obstructing Acquisition",
    bnTitle: "দণ্ড (৪৩ ধারা)",
    enExp: "Criminalizes making fraudulent compensation claims, forged deeds, or willfully obstructing officers from executing duties, punishable with imprisonment up to 6 months or fine.",
    bnExp: "ভুয়া দলিল দিয়ে ক্ষতিপূরণ দাবি করা বা অধিগ্রহণ কার্যক্রমে সরকারি কাজে বেআইনি বাধা দিলে অনধিক ৬ মাস কারাদণ্ড বা অর্থদণ্ড বা উভয় দণ্ড।",
    enCaution: "False claims before DC lead to immediate prosecution alongside recovery of moneys.",
    bnCaution: "ভুয়া খতিয়ান বা দলিল দিয়ে ক্ষতিপূরণ দাবি করলে ফৌজদারি শাস্তি ভোগ করতে হবে।",
    keywords: ["penalty false compensation claim", "obstructing acquisition officer fine", "dondo 43 dhara", "দণ্ড ভুয়া দাবি", "ধারা ৪৩"]
  },
  44: {
    enTitle: "Use of Force for Eviction and Possession",
    bnTitle: "দখল সমর্পণের ক্ষেত্রে বলপ্রয়োগ",
    enExp: "Authorizes the DC to requisition police assistance and use necessary reasonable force to take possession if anyone resists eviction after compensation payment.",
    bnExp: "ক্ষতিপূরণ প্রদানের পরও দখল হস্তান্তর না করলে পুলিশ বাহিনীর সহায়তায় বলপ্রয়োগ করে দখল নেওয়ার ক্ষমতা।",
    enCaution: "Resistance to lawful eviction after award tender can result in immediate police detention.",
    bnCaution: "ক্ষতিপূরণের টাকা পাওয়ার পর দখল ছাড়তে বাধা দিলে পুলিশ দিয়ে উচ্ছেদ করা যাবে।",
    keywords: ["use force eviction possession", "police assistance land takeover", "bolproyog dokhol", "বলপ্রয়োগ দখল", "ধারা ৪৪"]
  },
  45: {
    enTitle: "Exemption from Stamp Duty and Fees",
    bnTitle: "স্ট্যাম্প ডিউটি ও ফিস হইতে অব্যাহতি",
    enExp: "Exempts all awards, declarations, bonds, and applications made under this Act from stamp duty, court fees, and registration fees.",
    bnExp: "এই আইনের অধীন প্রদত্ত রোয়েদাদ, চুক্তিপত্র ও আবেদনের ক্ষেত্রে স্ট্যাম্প ডিউটি ও কোর্ট ফি মওকুফ।",
    enCaution: "Applicants are exempt from heavy ad valorem court fees when filing claims before DC.",
    bnCaution: "ডিসি অফিসে ক্ষতিপূরণ দাবির আবেদনে সাধারণ মামলার মতো চড়া কোর্ট ফি দিতে হয় না।",
    keywords: ["exemption stamp duty court fees", "fee waiver acquisition", "stamp duty obbahoti", "স্ট্যাম্প ডিউটি অব্যাহতি", "ধারা ৪৫"]
  },
  46: {
    enTitle: "Protection of Action Taken in Good Faith (Indemnity)",
    bnTitle: "সরল বিশ্বাসে কৃত কাজকর্ম রক্ষণ",
    enExp: "Provides legal indemnity: no suit, prosecution, or legal proceeding shall lie against any public officer for anything done in good faith under this Act.",
    bnExp: "সরল বিশ্বাসে আইনানুগ দায়িত্ব পালনকালে কোনো কর্মকর্তার বিরুদ্ধে দেওয়ানি বা ফৌজদারি মামলা চলবে না।",
    enCaution: "Malicious fraud or corrupt practices are excluded from good-faith protection.",
    bnCaution: "ইচ্ছাকৃত জালিয়াতি বা দুর্নীতির ক্ষেত্রে এই সুরক্ষা কার্যকর হয় না।",
    keywords: ["good faith indemnity", "sorol bishwashe kaj", "সরল বিশ্বাসে কাজকর্ম", "ধারা ৪৬"]
  },
  47: {
    enTitle: "Bar to Civil Court Jurisdiction (Ouster Clause)",
    bnTitle: "মামলা দায়েরের ক্ষেত্রে বিধি-নিষেধ (দেওয়ানি আদালতের এক্তিয়ার বারিত)",
    enExp: "Expressly bars all civil courts from entertaining any suit or application challenging any notice, award, decision, or proceeding taken under this Act.",
    bnExp: "আপাতত বলবৎ অন্য কোনো আইনে যাহা কিছুই থাকুক না কেন, এই আইনের কোনো নোটিশ, রোয়েদাদ বা কার্যক্রমের বিরুদ্ধে কোনো দেওয়ানি আদালতে মামলা চলবে না।",
    enCaution: "Civil suits challenging acquisition are non-maintainable. Aggrieved citizens must seek relief strictly through Arbitrators (Sec 30), Appellate Tribunal (Sec 36), or High Court Division Writ (Art 102).",
    bnCaution: "দেওয়ানি আদালতে মামলা করে অধিগ্রহণ বা ক্ষতিপূরণ আটকানো যায় না; আইনি প্রতিকার নিতে হবে ৩০ ধারায় আরবিট্রেটরে অথবা সুপ্রিম কোর্টের রিট পিটিশনে।",
    keywords: ["bar to civil court jurisdiction", "section 47 ouster clause", "civil suit bar acquisition", "দেওয়ানি আদালতে বাধা", "মামলা দায়েরে বিধি-নিষেধ", "ধারা ৪৭"]
  },
  48: {
    enTitle: "Delegation of Powers",
    bnTitle: "ক্ষমতা অর্পণ",
    enExp: "Empowers the Government or DC to delegate any of their powers under this Act to subordinate officers (e.g., Additional Deputy Commissioner LA).",
    bnExp: "সরকার বা জেলা প্রশাসক এই আইনের অধীন যেকোনো ক্ষমতা অতিরিক্ত জেলা প্রশাসক (এলএ)-কে অর্পণ করতে পারেন।",
    enCaution: "ADC (Revenue) or ADC (LA) routinely exercises statutory DC powers under delegation.",
    bnCaution: "অতিরিক্ত জেলা প্রশাসক (রাজস্ব বা এলএ) জেলা প্রশাসকের ক্ষমতাপ্রাপ্ত প্রতিনিধি হিসেবে কাজ করেন।",
    keywords: ["delegation of powers adc la", "khomota orpon", "ক্ষমতা অর্পণ", "ধারা ৪৮"]
  },
  49: {
    enTitle: "Power to Make Rules",
    bnTitle: "বিধি প্রণয়নের ক্ষমতা",
    enExp: "Empowers the Government to make rules by official gazette notification for carrying out the objectives and procedural mechanisms of this Act.",
    bnExp: "এই আইনের উদ্দেশ্য বাস্তবায়ন ও পদ্ধতি নির্ধারণের লক্ষ্যে সরকার সরকারি গেজেটে প্রজ্ঞাপন দ্বারা বিধি প্রণয়ন করতে পারবে।",
    enCaution: "Acquisition and Requisition of Immovable Property Rules govern detailed assessment forms.",
    bnCaution: "বিধিমালা ক্ষতিপূরণ নির্ধারণের মূল্যায়ন ফরম ও নোটিশের রূপরেখা পরিচালনা করে।",
    keywords: ["power make rules acquisition", "bidhi pronoyon", "বিধি প্রণয়ন ক্ষমতা", "ধারা ৪৯"]
  },
  50: {
    enTitle: "Repeal and Savings",
    bnTitle: "রহিতকরণ ও হেফাজত",
    enExp: "Repeals the Acquisition and Requisition of Immovable Property Ordinance, 1982 (Ordinance No. II of 1982) and saves ongoing proceedings thereunder.",
    bnExp: "১৯৮২ সালের ২ নং অধ্যাদেশ রহিতকরণ এবং তৎসংক্রান্ত কার্যক্রমের হেফাজত।",
    enCaution: "Acquisitions initiated prior to 2017 continue under the old ordinance; new notices follow this 2017 Act.",
    bnCaution: "২০১৭ সালের পূর্বে শুরু হওয়া কার্যক্রম পুরাতন অধ্যাদেশে এবং ২০১৭ সালের পরের নোটিশ এই নতুন আইনে নিষ্পন্ন হবে।",
    keywords: ["repeal 1982 ordinance", "hefazot 2017 act", "রহিতকরণ হেফাজত", "ধারা ৫০"]
  },
  51: {
    enTitle: "Publication of Authentic English Translation",
    bnTitle: "ইংরেজিতে অনূদিত পাঠ প্রকাশ",
    enExp: "Mandates publication of an authentic English text of the Act, provided that in case of conflict between Bengali and English versions, the Bengali text prevails.",
    bnExp: "সরকার এই আইনের একটি প্রামাণ্য ইংরেজি অনূদিত পাঠ প্রকাশ করবে; বিরোধ দেখা দিলে বাংলা পাঠ প্রাধান্য পাবে।",
    enCaution: "The Bengali statutory text is legally authoritative and conclusive in judicial interpretation.",
    bnCaution: "আইনি বিরোধ ও আদালতে ব্যাখ্যার ক্ষেত্রে বাংলা পাঠই চূড়ান্ত হিসেবে গৃহীত হবে।",
    keywords: ["authentic english translation acquisition", "bengali text prevails", "অনূদিত পাঠ", "ধারা ৫১"]
  }
};

const provisions = [];

for (const raw of rawExtracted) {
  const secNum = raw.secIndex;
  const meta = acqMeta[secNum];
  if (!meta) {
    console.warn(`Missing metadata for Acquisition section ${secNum}`);
    continue;
  }

  const id = `acquisition-${secNum}`;
  const sectionNumber = `Section ${secNum}`;
  const titleBn = `${meta.bnTitle} (ধারা ${secNum})`;
  const titleEn = `${meta.enTitle} (Section ${secNum})`;

  const cleanedOriginalText = cleanText(raw.text);

  const provision = {
    id,
    actId: 'act_acquisition_2017',
    sectionNumber,
    categories: ['land', 'rights'],
    title: {
      bn: titleBn,
      en: titleEn
    },
    originalText: cleanedOriginalText,
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
    effectiveDate: '2017-09-21',
    legalStatus: 'active',
    reviewStatus: 'verified',
    contentHash: '',
    keywords: [
      ...meta.keywords,
      `ধারা ${secNum}`,
      `section ${secNum}`,
      `acquisition ${secNum}`,
      `অধিগ্রহণ ধারা ${secNum}`,
      'স্থাবর সম্পত্তি অধিগ্রহণ ও হুকুমদখল আইন ২০১৭',
      'land acquisition compensation',
      'জমি অধিগ্রহণ ক্ষতিপূরণ',
      'dc office land acquisition'
    ]
  };

  provisions.push(provision);
}

fs.writeFileSync('scripts/acquisition_2017_all.json', JSON.stringify(provisions, null, 2), 'utf8');
console.log(`Generated all ${provisions.length} provisions for Acquisition and Requisition of Immovable Property Act, 2017`);
