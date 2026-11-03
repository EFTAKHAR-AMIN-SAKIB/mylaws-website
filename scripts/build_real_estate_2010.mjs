import fs from 'fs';

const rawExtracted = JSON.parse(fs.readFileSync('scripts/raw_extracted_1055.json', 'utf8'));

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

const reMeta = {
  1: {
    enTitle: "Short Title and Commencement",
    bnTitle: "সংক্ষিপ্ত শিরোনাম ও প্রবর্তন",
    enExp: "Names the statute as the Real Estate Development and Management Act, 2010 (Act No. XLVIII of 2010) and specifies commencement dates across Bangladesh.",
    bnExp: "এই আইনটি 'রিয়েল এস্টেট উন্নয়ন ও ব্যবস্থাপনা আইন, ২০১০' নামে অভিহিত এবং সমগ্র বাংলাদেশে কার্যকর।",
    enCaution: "Applies to all private developers, apartment projects, commercial spaces, and plot allotments in Bangladesh.",
    bnCaution: "বাংলাদেশে বেসরকারি রিয়েল এস্টেট ডেভেলপার, ফ্ল্যাট ও প্লট বরাদ্দ সংক্রান্ত যাবতীয় বিষয়ে এই আইন বাধ্যতামূলক।",
    keywords: ["real estate act 2010", "rehab flat law", "apartment developer law", "রিয়েল এস্টেট আইন", "ফ্ল্যাট আইন", "ধারা ১"]
  },
  2: {
    enTitle: "Definitions of Developer, Purchaser, and Real Estate",
    bnTitle: "সংজ্ঞা",
    enExp: "Defines 'developer', 'real estate' (plots, apartments, commercial spaces), 'purchaser', 'allotment', 'common space', and 'authorized officer'.",
    bnExp: "ডেভেলপার, রিয়েল এস্টেট (প্লট, ফ্ল্যাট, বাণিজ্যিক স্থান), ক্রেতা, বরাদ্দপত্র, সাধারণ সুবিধাদি এবং অনুমোদিত কর্তৃপক্ষের সুস্পষ্ট সংজ্ঞা।",
    enCaution: "Developer includes any company, firm, or individual developing land or constructing apartments for commercial sale.",
    bnCaution: "বাণিজ্যিকভাবে ফ্ল্যাট বা প্লট তৈরি ও বিক্রয়কারী যেকোনো ব্যক্তি, অংশীদারি ফার্ম বা কোম্পানি ডেভেলপার হিসেবে গণ্য হবে।",
    keywords: ["developer definition", "real estate definition", "shongga flat developer", "ডেভেলপার সংজ্ঞা", "ধারা ২"]
  },
  3: {
    enTitle: "Application of the Act",
    bnTitle: "প্রযোজ্যতা",
    enExp: "Specifies scope of application: applies to private developers and joint developments, excluding wholly government-managed public housing projects.",
    bnExp: "বেসরকারি ডেভেলপার ও ভূমির মালিকের যৌথ প্রকল্পে প্রযোজ্য; তবে সম্পূর্ণ সরকারি ব্যবস্থাপনায় পরিচালিত আবাসন প্রকল্পে এটি প্রযোজ্য নয়।",
    enCaution: "Private developers operating under government PPP or autonomous authority land must comply with this Act.",
    bnCaution: "সরকারি জমিতে বেসরকারি ডেভেলপার কাজ করলেও ডেভেলপার এই আইনের আওতায় দায়বদ্ধ থাকবে।",
    keywords: ["application real estate act", "proyojyota", "scope apartment law", "আইনের প্রযোজ্যতা", "ধারা ৩"]
  },
  4: {
    enTitle: "Establishment of Authority",
    bnTitle: "কর্তৃপক্ষ প্রতিষ্ঠা",
    enExp: "Empowers the Government to establish designated regulatory authorities (e.g. RAJUK, CDA, KDA, RDA, or National Housing Authority) to supervise developer compliance.",
    bnExp: "আইন বাস্তবায়নে রাজউক, সিডিএ, কেডিএ, আরডিএ বা জাতীয় গৃহায়ন কর্তৃপক্ষকে তদারকি কর্তৃপক্ষ হিসেবে দায়িত্ব প্রদান।",
    enCaution: "Complaints regarding building code and layout violations can be submitted directly to the competent development authority.",
    bnCaution: "নকশা ও নিয়ম লঙ্ঘনের অভিযোগ সংশ্লিষ্ট উন্নয়ন কর্তৃপক্ষের নিকট দাখিল করা যায়।",
    keywords: ["authority establishment rajuk cda", "real estate regulator", "kortripokkho protishtha", "কর্তৃপক্ষ প্রতিষ্ঠা", "ধারা ৪"]
  },
  5: {
    enTitle: "Mandatory Registration of Real Estate Developers",
    bnTitle: "রিয়েল এস্টেট ডেভেলপার নিবন্ধন",
    enExp: "Mandates that every developer must obtain statutory registration from the competent authority before conducting real estate business in any designated area.",
    bnExp: "নির্দিষ্ট এলাকায় ব্যবসা পরিচালনার পূর্বে প্রত্যেক ডেভেলপারকে যথাযথ সরকারি কর্তৃপক্ষের নিকট থেকে বাধ্যতামূলক নিবন্ধন গ্রহণ করতে হবে।",
    enCaution: "Carrying on real estate business without registration is a criminal offense punishable under Section 19 with up to 2 years imprisonment.",
    bnCaution: "নিবন্ধনহীন ডেভেলপারের নিকট থেকে ফ্ল্যাট কেনা অত্যন্ত ঝুঁকিপূর্ণ এবং নিবন্ধন ছাড়া ব্যবসা পরিচালনা ধারা ১৯ অনুযায়ী কারাদণ্ডযোগ্য অপরাধ।",
    keywords: ["developer registration mandatory", "unregistered developer fraud", "developer nibondhon", "ডেভেলপার নিবন্ধন", "ধারা ৫"]
  },
  6: {
    enTitle: "Statutory Duties and Responsibilities of Developers",
    bnTitle: "ডেভেলপারের দায়-দায়িত্ব",
    enExp: "Requires developers to prepare realistic layout designs, employ registered architects/engineers, observe Bangladesh National Building Code (BNBC), and maintain safety.",
    bnExp: "অনুমোদিত নকশা অনুযায়ী মানসম্মত নির্মাণ, নিবন্ধিত প্রকৌশলী নিয়োগ, বিএনবিসি কোড অনুসরণ ও নির্মাণ নিরাপত্তা নিশ্চিত করার আইনি বাধ্যবাধকতা।",
    enCaution: "Failure to follow the National Building Code renders developers liable to criminal prosecution and structural liability.",
    bnCaution: "ভবন নির্মাণ কোড ও নিরাপত্তা মান না মানলে ডেভেলপার ব্যক্তিগত ও ফৌজদারিভাবে দায়ী হবেন।",
    keywords: ["developer duties bnbc", "building code compliance", "developer day dayitto", "ডেভেলপারের দায়িত্ব", "ধারা ৬"]
  },
  7: {
    enTitle: "Construction of Real Estate by Landowner",
    bnTitle: "ভূমির মালিক কর্তৃক রিয়েল এস্টেট নির্মাণ",
    enExp: "Regulates cases where a landowner himself constructs multi-unit apartments for commercial sale, subjecting the owner to developer obligations under the Act.",
    bnExp: "জমির মালিক নিজে বাণিজ্যিকভাবে বিক্রয়ের উদ্দেশ্যে বহুতল ভবন নির্মাণ করলে তাকেও ডেভেলপারের সমমানের দায়িত্ব পালন করতে হবে।",
    enCaution: "Private landowners commercially selling apartments to public cannot evade statutory warranties by claiming individual status.",
    bnCaution: "মালিক নিজে ফ্ল্যাট বিক্রি করলেও ক্রেতার প্রতি এই আইনের সকল ওয়ারেন্টি ও বাধ্যবাধকতা প্রযোজ্য হবে।",
    keywords: ["landowner developer construction", "malik kortrik nirman", "commercial apartment sale", "মালিক কর্তৃক নির্মাণ", "ধারা ৭"]
  },
  8: {
    enTitle: "Terms and Conditions for Sale and Purchase of Real Estate",
    bnTitle: "রিয়েল এস্টেট ক্রয়-বিক্রয়ের শর্তাবলী",
    enExp: "Mandates that prospectus or allotment letters must explicitly specify usable net carpet area, common space percentage, layout map, parking space, and total cost.",
    bnExp: "প্রসপেক্টাস ও বরাদ্দপত্রে ফ্ল্যাটের নিট কার্পেট এরিয়া, কমন স্পেসের শতকরা হার, পার্কিং এবং মোট মূল্যের সুস্পষ্ট বিভাজন থাকতে হবে।",
    enCaution: "Developers cannot advertise or demand earnest money without approved layout plan and clear title.",
    bnCaution: "অনুমোদিত নকশা ও স্বচ্ছ স্বত্ব ব্যতীত কোনো চটকদার বিজ্ঞাপন বা বায়নার টাকা নেওয়া আইনত নিষিদ্ধ।",
    keywords: ["terms of sale real estate", "carpet area common space", "kroy bikroy shortaboli", "ক্রয় বিক্রয়ের শর্ত", "ধারা ৮"]
  },
  9: {
    enTitle: "Mandatory Execution and Registration of Transfer Deed",
    bnTitle: "হস্তান্তর দলিল সম্পাদন ও রেজিস্ট্রেশন",
    enExp: "Mandates that upon payment of total consideration money, the developer MUST execute and register the title transfer deed and hand over vacant possession within 3 months.",
    bnExp: "সমুদয় মূল্য পরিশোধের অনূর্ধ্ব ৩ (তিন) মাসের মধ্যে ডেভেলপার ক্রেতার অনুকূলে ফ্ল্যাট/প্লটের রেজিস্ট্রি দলিল সম্পাদন ও খালি দখল বুঝিয়ে দিতে বাধ্য।",
    enCaution: "Strict 3-month statutory deadline. Withholding registration after receiving full price entitles buyer to criminal complaint and specific performance.",
    bnCaution: "সম্পূর্ণ টাকা পাওয়ার ৩ মাসের মধ্যে সাব-কবলা রেজিস্ট্রি না দিলে ডেভেলপার ফৌজদারি অপরাধী সাব্যস্ত হবে এবং দেওয়ানি আদালতে কার্যকর করা যাবে।",
    keywords: ["mandatory registration deed 3 months", "handover transfer deed developer", "dolil shompodon registration", "দলিল রেজিস্ট্রেশন ৩ মাস", "ধারা ৯"]
  },
  10: {
    enTitle: "Agreement Between Landowner and Developer",
    bnTitle: "ভূমি মালিক ও ডেভেলপারের মধ্যে চুক্তি",
    enExp: "Governs joint venture development contracts between landowner and developer, specifying sharing ratio, completion timeframe, power of attorney, and security deposits.",
    bnExp: "জমির মালিক ও ডেভেলপারের মধ্যে ফ্ল্যাট বণ্টনের অনুপাত, নির্মাণ সমাপ্তির সময়সীমা, আম-মোক্তারনামা এবং নিরাপত্তা জামানতের সুস্পষ্ট দ্বিপাক্ষিক চুক্তি।",
    enCaution: "Developer must provide bank guarantee or earnest deposit to landowner as stipulated in the registered contract.",
    bnCaution: "চুক্তি রেজিস্ট্রি হতে হবে এবং প্রতিশ্রুত সময়সীমা ও বণ্টনের ব্যত্যয় ঘটলে ধারা ২৮ ও ৩০ অনুযায়ী ফৌজদারি শাস্তি প্রযোজ্য।",
    keywords: ["landowner developer agreement", "joint venture apartment ratio", "bhumi malik developer chukti", "ভূমি মালিক ডেভেলপার চুক্তি", "ধারা ১০"]
  },
  11: {
    enTitle: "Real Estate Facilities and Common Areas",
    bnTitle: "রিয়েল এস্টেট এর সুবিধাদি",
    enExp: "Requires provision of necessary common facilities including stairs, lift, generator, fire safety, parking, roof access, and designated community space.",
    bnExp: "ভবনে পর্যাপ্ত সিঁড়ি, লিফট, জেনারেটর, অগ্নিনির্বাপক ব্যবস্থা, পার্কিং, ছাদ ব্যবহারের অধিকার এবং উন্মুক্ত স্থান নিশ্চিতকরণের বাধ্যবাধকতা।",
    enCaution: "Common areas cannot be sold separately or converted into private commercial spaces by the developer.",
    bnCaution: "ছাদ, সিঁড়িঘর বা কমন স্পেস কোনো একক ব্যক্তির কাছে আলাদাভাবে বিক্রয় করা সম্পূর্ণ বেআইনি।",
    keywords: ["common space facilities apartment", "lift generator fire safety", "chhad byabohar", "কমন স্পেস সুবিধাদি", "ধারা ১১"]
  },
  12: {
    enTitle: "Rules for Payment of Consideration by Purchaser",
    bnTitle: "রিয়েল এস্টেট এর মূল্য পরিশোধের নিয়মাবলী",
    enExp: "Requires payments to be made through banking channels (account payee cheque/pay order/bank draft); developer must issue signed printed money receipts.",
    bnExp: "ফ্ল্যাটের মূল্য ব্যাংক অ্যাকাউন্ট পেয়ি চেক, পে-অর্ডার বা ব্যাংক ড্রাফটের মাধ্যমে পরিশোধ করতে হবে এবং ডেভেলপার আনুষ্ঠানিক লিখিত রসিদ দিতে বাধ্য।",
    enCaution: "Never pay cash without banking instrument and official money receipt specifying apartment number.",
    bnCaution: "ব্যাংক লেনদেন বা বৈধ মানি রসিদ ছাড়া কোনো নগদ অর্থ লেনদেন করবেন না।",
    keywords: ["payment terms real estate", "pay order money receipt flat", "mulyo porishodh", "মূল্য পরিশোধ নিয়মাবলী", "ধারা ১২"]
  },
  13: {
    enTitle: "Ensuring Utility Services (Water, Gas, Electricity, Sewerage)",
    bnTitle: "রিয়েল এস্টেট এর সেবাসমূহ (utility services) নিশ্চিতকরণ",
    enExp: "Obligates developer to arrange and secure permanent connections for electricity, water, sewerage, and gas (where available) prior to handover.",
    bnExp: "দখল হস্তান্তরের পূর্বেই পানি, বিদ্যুৎ, পয়ঃনিষ্কাশন এবং গ্যাস (লভ্যতানুযায়ী) স্থায়ী সংযোগ নিশ্চিত করতে ডেভেলপার আইনত বাধ্য।",
    enCaution: "Handing over flats with temporary builder power or without water connection is punishable under Section 21 with fine up to 5 lakh taka.",
    bnCaution: "স্থায়ী বিদ্যুৎ বা পানির সংযোগ না দিয়ে ফ্ল্যাট হস্তান্তর করলে ধারা ২১ অনুযায়ী অনধিক ৫ লাখ টাকা জরিমানা হতে পারে।",
    keywords: ["utility services electricity water", "apartment utility connection", "sebashomuh nishchitkoron", "পানি বিদ্যুৎ ইউটিলিটি", "ধারা ১৩"]
  },
  14: {
    enTitle: "Default by Purchaser in Installment Payments and Remedies",
    bnTitle: "ক্রেতা কর্তৃক এককালীন মূল্য বা কিস্তি পরিশোধে ব্যর্থতা",
    enExp: "Governs buyer default: developer must issue at least 60 days' registered written notice before taking action; buyer can pay with statutory interest.",
    bnExp: "ক্রেতা কিস্তি পরিশোধে ব্যর্থ হলে ডেভেলপারকে কমপক্ষে ৬০ দিনের রেজিস্ট্রি লিখিত নোটিশ দিতে হবে; ক্রেতা বিলম্ব সুদসহ কিস্তি পরিশোধ করতে পারেন।",
    enCaution: "Developer cannot unilaterally cancel allotment without serving mandatory 60 days' registered notice under Section 22.",
    bnCaution: "৬০ দিনের বিধিবদ্ধ লিখিত নোটিশ ছাড়া ডেভেলপার একতরফাভাবে ফ্ল্যাটের বরাদ্দ বাতিল করতে পারে না; করলে ধারা ২২ অনুযায়ী শাস্তিযোগ্য।",
    keywords: ["buyer installment default", "60 days notice allotment cancel", "kisti porishodhe berthota", "কিস্তি বকেয়া ৬০ দিন নোটিশ", "ধারা ১৪"]
  },
  15: {
    enTitle: "Developer Failure to Hand Over Possession Within Stipulated Time",
    bnTitle: "ডেভেলপার কর্তৃক রিয়েল এস্টেট হস্তান্তরে ব্যর্থতা",
    enExp: "Provides that if developer fails to hand over possession within the contracted timeframe, developer must pay rental compensation/commercial interest to the purchaser.",
    bnExp: "চুক্তি অনুযায়ী নির্ধারিত সময়ে ফ্ল্যাট বুঝিয়ে দিতে ব্যর্থ হলে ডেভেলপার ক্রেতাকে মাসিক ক্ষতিপূরণ বা ভাড়ার সমপরিমাণ অর্থ প্রদানে আইনত বাধ্য।",
    enCaution: "Purchaser can claim compensation for every month of delay, or cancel contract and demand full refund with commercial interest under Section 17.",
    bnCaution: "বিলম্বিত প্রতি মাসের জন্য ক্ষতিপূরণ দাবি করা যায় অথবা চুক্তি বাতিল করে বাণিজ্যিক ব্যাংক হারে সুদসহ সকল টাকা ফেরত চাওয়া যায়।",
    keywords: ["developer delayed handover penalty", "possession delay compensation", "hastantore berthota khotipuron", "ফ্ল্যাট হস্তান্তরে বিলম্ব ক্ষতিপূরণ", "ধারা ১৫"]
  },
  16: {
    enTitle: "Mortgage of Real Estate and Restrictions",
    bnTitle: "রিয়েল এস্টেট বন্ধক, ইত্যাদি",
    enExp: "Prohibits developer from mortgaging any real estate, apartment, or land without obtaining prior written consent from the purchaser or landowner.",
    bnExp: "ক্রেতা বা জমির মালিকের লিখিত পূর্বানুমতি ছাড়া কোনো ফ্ল্যাট, প্লট বা জমি কোনো ব্যাংক বা আর্থিক প্রতিষ্ঠানে বন্ধক রাখা সম্পূর্ণ নিষিদ্ধ।",
    enCaution: "Violating this provision is a criminal offense punishable under Section 23 with imprisonment up to 1 year or fine up to 5 lakh taka.",
    bnCaution: "ক্রেতাকে না জানিয়ে ফ্ল্যাট ব্যাংক বন্ধক রেখে ঋণ নিলে ধারা ২৩ অনুযায়ী ১ বছরের কারাদণ্ড ও ৫ লাখ টাকা অর্থদণ্ড হবে।",
    keywords: ["mortgage real estate restriction", "developer bank loan flat mortgage", "bondhok nishedh", "ফ্ল্যাট বন্ধক নিষিদ্ধ", "ধারা ১৬"]
  },
  17: {
    enTitle: "Rules for Refund of Money to Purchaser",
    bnTitle: "ক্রেতা কর্তৃক অর্থ ফেরত গ্রহণের নিয়মাবলী",
    enExp: "Mandates that if a buyer cancels allotment with written application, or developer defaults, developer must refund total deposited money with interest within 3 months.",
    bnExp: "ক্রেতা লিখিত আবেদন করে বরাদ্দ বাতিল করলে বা ডেভেলপার ব্যর্থ হলে ৩ মাসের মধ্যে পরিশোধিত অর্থ ব্যাংক হারে সুদসহ ক্রেতাকে ফেরত দিতে হবে।",
    enCaution: "Refund must be executed strictly within 3 months via account payee cheque; bouncing cheques attract Negotiable Instruments Act Section 138.",
    bnCaution: "৩ মাসের মধ্যে সমুদয় অর্থ ফেরত দেওয়া বাধ্যতামূলক। চেক ডিজঅনার হলে এনআই অ্যাক্টের ১৩৮ ধারায় এবং এই আইনের আওতায় মামলা করা যায়।",
    keywords: ["refund money buyer real estate", "3 months refund flat cancellation", "ortho ferot", "টাকা ফেরত ৩ মাস", "ধারা ১৭"]
  },
  18: {
    enTitle: "Delivery of Architectural Layout and Possession Certificate",
    bnTitle: "স্থাপত্য নকশা বা দখল হস্তান্তর পত্র প্রদান",
    enExp: "Requires developer to deliver approved architectural drawing, structural design, service layout, and formal possession certificate to purchaser at handover.",
    bnExp: "দখল দেওয়ার সময় অনুমোদিত স্থাপত্য নকশা, কাঠামোগত ডিজাইন এবং আনুষ্ঠানিক দখল হস্তান্তরপত্র ক্রেতাকে প্রদান করা বাধ্যতামূলক।",
    enCaution: "Essential for apartment owners' association formation and future utility mutation.",
    bnCaution: "ভবিষ্যতে নামজারি ও ফ্ল্যাট মালিক সমিতি গঠনের জন্য অনুমোদিত মূল নকশার অনুলিপি বুঝে নেওয়া অপরিহার্য।",
    keywords: ["architectural layout possession certificate", "handover letter apartment", "dokhol hastantor potro", "দখল হস্তান্তরপত্র", "ধারা ১৮"]
  },
  19: {
    enTitle: "Penalty for Operating Real Estate Business Without Registration",
    bnTitle: "নিবন্ধন ব্যতীত রিয়েল এস্টেট উন্নয়ন কাজ করিবার দণ্ড",
    enExp: "Punishes any person or entity conducting real estate development without Section 5 registration with imprisonment up to 2 years or fine up to 10 lakh taka or both.",
    bnExp: "নিবন্ধন ছাড়া রিয়েল এস্টেট ব্যবসা পরিচালনা করলে অনধিক ২ বছর কারাদণ্ড বা অনধিক ১০ লাখ টাকা অর্থদণ্ড বা উভয় দণ্ডে দণ্ডিত হবেন।",
    enCaution: "Triable by Metropolitan Magistrate or 1st Class Judicial Magistrate under Section 32.",
    bnCaution: "ভুয়া ও অনুমোদনহীন ডেভেলপারদের বিরুদ্ধে এই ধারায় সরাসরি ফৌজদারি মামলা দায়ের করা যায়।",
    keywords: ["unregistered developer penalty", "section 19 real estate", "nibondhon chara dondo", "নিবন্ধনহীন ব্যবসা দণ্ড", "ধারা ১৯"]
  },
  20: {
    enTitle: "Penalty for Starting Project Without Approved Layout Plan",
    bnTitle: "অনুমোদন ব্যতীত রিয়েল এস্টেট উন্নয়ন প্রকল্পের কাজ শুরু করিবার দণ্ড",
    enExp: "Punishes starting construction without approved plan from competent authority (RAJUK/CDA/etc.) with imprisonment up to 2 years or fine up to 10 lakh taka or both.",
    bnExp: "অনুমোদিত নকশা ব্যতিরেকে আবাসন প্রকল্পের কাজ শুরু করলে অনধিক ২ বছর কারাদণ্ড বা অনধিক ১০ লাখ টাকা অর্থদণ্ড বা উভয় দণ্ড।",
    enCaution: "Buyers should verify RAJUK/authorities approval memo number before booking any flat.",
    bnCaution: "প্রকল্পের রাজউক বা সংশ্লিষ্ট কর্তৃপক্ষের অনুমোদন নম্বর যাচাই ছাড়া বুকিং দেওয়া অনিরাপদ।",
    keywords: ["starting project without approval", "unauthorized construction penalty", "onumodon chara nirman", "অনুমোদন ছাড়া প্রকল্প দণ্ড", "ধারা ২০"]
  },
  21: {
    enTitle: "Penalty for Failure to Provide Utility Service Connections",
    bnTitle: "সেবাসমূহের (utility services) সংযোগ প্রদান না করিবার দণ্ড",
    enExp: "Punishes failure to provide committed utility connections (water, power, sewerage) under Section 13 with fine up to 5 lakh taka.",
    bnExp: "প্রতিশ্রুত পানি, বিদ্যুৎ বা গ্যাস সংযোগ প্রদানে ব্যর্থ হলে ডেভেলপারকে অনধিক ৫ লাখ টাকা অর্থদণ্ডে দণ্ডিত করা যাবে।",
    enCaution: "Developer remains obligated to provide the connections notwithstanding the fine.",
    bnCaution: "জরিমানা দেওয়ার পরও ডেভেলপার সংযোগ নিশ্চিত করার দায় থেকে অব্যাহতি পায় না।",
    keywords: ["utility service failure penalty", "electricity water delay fine", "utility shongjog dondo", "ইউটিলিটি সংযোগ ব্যর্থতা দণ্ড", "ধারা ২১"]
  },
  22: {
    enTitle: "Penalty for Cancelling Allotment Without Statutory Notice",
    bnTitle: "নোটিশ ব্যতিরেকে বরাদ্দ বাতিল বা স্থগিত করিবার দণ্ড",
    enExp: "Punishes cancelling or suspending buyer's allotment in violation of Section 14 notice procedures with imprisonment up to 1 year or fine up to 5 lakh taka or both.",
    bnExp: "বিধিবদ্ধ ৬০ দিনের নোটিশ ছাড়া একতরফাভাবে ফ্ল্যাট বরাদ্দ বাতিল করলে অনধিক ১ বছর কারাদণ্ড বা অনধিক ৫ লাখ টাকা অর্থদণ্ড বা উভয় দণ্ড।",
    enCaution: "Protects buyers against arbitrary forfeiture of paid installments by unscrupulous developers.",
    bnCaution: "ক্রেতার টাকা আত্মসাৎ করতে আকস্মিক বরাদ্দ বাতিল করা ফৌজদারি অপরাধ।",
    keywords: ["illegal allotment cancellation penalty", "cancelling flat without notice", "boraddo batil dondo", "বরাদ্দ বাতিল দণ্ড", "ধারা ২২"]
  },
  23: {
    enTitle: "Penalty for Mortgaging Real Estate Without Consent",
    bnTitle: "রিয়েল এস্টেট বন্ধক রাখিবার দণ্ড",
    enExp: "Punishes mortgaging real estate without buyer's or landowner's written consent under Section 16 with imprisonment up to 1 year or fine up to 5 lakh taka or both.",
    bnExp: "ক্রেতা বা জমির মালিকের অজ্ঞাতে সম্পত্তি বন্ধক রাখলে অনধিক ১ বছর কারাদণ্ড বা অনধিক ৫ লাখ টাকা অর্থদণ্ড বা উভয় দণ্ডে দণ্ডিত হবেন।",
    enCaution: "Such mortgages are legally voidable against the innocent purchaser.",
    bnCaution: "গোপনে বন্ধক রেখে ডেভেলপার ঋণ নিলে সংশ্লিষ্ট আর্থিক প্রতিষ্ঠান ক্রেতার ফ্ল্যাট নিলাম করতে পারে না।",
    keywords: ["unauthorized mortgage penalty", "secret flat mortgage fine", "bondhok dondo", "বন্ধক দণ্ড", "ধারা ২৩"]
  },
  24: {
    enTitle: "Penalty for Altering Contracted Apartment or Specifications",
    bnTitle: "চুক্তিবদ্ধ রিয়েল এস্টেট পরিবর্তন করিবার দণ্ড",
    enExp: "Punishes selling promised apartment to another person or altering contracted apartment size/location without consent with imprisonment up to 3 years or fine up to 20 lakh taka.",
    bnExp: "চুক্তিবদ্ধ ফ্ল্যাট ক্রেতাকে না দিয়ে অন্যের নিকট বিক্রি করা বা চুক্তি ভঙ্গ করে পরিবর্তন করলে অনধিক ৩ বছর কারাদণ্ড বা ২০ লাখ টাকা অর্থদণ্ড বা উভয় দণ্ড।",
    enCaution: "Severe criminal penalty designed to eradicate double-selling and fraudulent flat reassignment.",
    bnCaution: "একই ফ্ল্যাট একাধিক ব্যক্তির কাছে বিক্রি করা বা ফ্ল্যাট বদল করা গুরুতর দণ্ডনীয় অপরাধ (২০ লাখ টাকা পর্যন্ত জরিমানা)।",
    keywords: ["altering contracted apartment penalty", "double selling flat fine", "flats double sale", "ফ্ল্যাট পরিবর্তন দণ্ড", "ধারা ২৪"]
  },
  25: {
    enTitle: "Penalty for Using Substandard or Unpromised Construction Materials",
    bnTitle: "প্রতিশ্রুত নির্মাণ উপকরণ ব্যবহার না করিবার দণ্ড",
    enExp: "Punishes using substandard materials or deviating from contract specifications with imprisonment up to 3 years or fine up to 20 lakh taka or both.",
    bnExp: "চুক্তির প্রতিশ্রুত মানসম্মত রড, সিমেন্ট, ফিটিংসের পরিবর্তে নিম্নমানের সামগ্রী ব্যবহার করলে অনধিক ৩ বছর কারাদণ্ড বা ২০ লাখ টাকা অর্থদণ্ড বা উভয় দণ্ড।",
    enCaution: "Aggrieved buyers can get building testing done via BUET/accredited laboratories as evidence.",
    bnCaution: "বুয়েট বা স্বীকৃত ল্যাবের টেস্ট রিপোর্ট আদালতে প্রামাণ্য দলিল হিসেবে দাখিল করা যায়।",
    keywords: ["substandard construction materials penalty", "defective rod cement fine", "nimnomaner upokoron dondo", "নিম্নমানের উপকরণ দণ্ড", "ধারা ২৫"]
  },
  26: {
    enTitle: "Penalty for Construction Deviating from Approved Layout Plan",
    bnTitle: "অনুমোদিত নকশা বহির্ভূত নির্মাণের দণ্ড",
    enExp: "Punishes constructing floors, units, or structures deviating from approved layout plan with imprisonment up to 3 years or fine up to 20 lakh taka or both.",
    bnExp: "কর্তৃপক্ষের অনুমোদিত নকশা লঙ্ঘন করে অতিরিক্ত তলা বা অবৈধ কাঠামো নির্মাণ করলে অনধিক ৩ বছর কারাদণ্ড বা ২০ লাখ টাকা অর্থদণ্ড বা উভয় দণ্ড।",
    enCaution: "Unapproved floors face demolition by development authorities at developer's cost.",
    bnCaution: "অনুমোদনহীন তলা বা নকশাবহির্ভূত অংশ রাজউক ভেঙে ফেলতে পারে; ক্রেতাদের অনুমোদিত প্ল্যান যাচাই করা উচিত।",
    keywords: ["deviation approved layout penalty", "unauthorized floor construction fine", "noksha bohirbhuto nirman", "নকশা বহির্ভূত নির্মাণ দণ্ড", "ধারা ২৬"]
  },
  27: {
    enTitle: "Penalty for Fraudulent Offenses Committed by Developers",
    bnTitle: "ডেভেলপার কর্তৃক প্রতারণামূলক অপরাধের দণ্ড",
    enExp: "Punishes deceptive practices, executing deeds without title, fake layout assurances, or extortionate demands with imprisonment up to 3 years or fine up to 20 lakh taka.",
    bnExp: "মালিকানা স্বত্বহীন জমিতে প্রকল্প দেখিয়ে টাকা নেওয়া বা জালিয়াতির আশ্রয় নিলে ডেভেলপার অনধিক ৩ বছর কারাদণ্ড বা ২০ লাখ টাকা অর্থদণ্ড বা উভয় দণ্ডে দণ্ডিত হবেন।",
    enCaution: "Applies alongside Penal Code Section 420/406 for cheating and criminal breach of trust.",
    bnCaution: "পেনাল কোডের প্রতারণা (ধারা ৪২০) ও বিশ্বাসভঙ্গের (ধারা ৪০৬) পাশাপাশি এই ধারায় সরাসরি বিচারিক আদালতে বিচার চলে।",
    keywords: ["developer fraud penalty", "apartment fraud punishment", "protaronamulok oporadh dondo", "প্রতারণামূলক অপরাধ দণ্ড", "ধারা ২৭"]
  },
  28: {
    enTitle: "Penalty on Landowner for Failing to Deliver Land Possession to Developer",
    bnTitle: "ভূমির মালিক কর্তৃক নির্দিষ্ট সময়ে ডেভেলপারের বরাবরে ভূমির দখল হস্তান্তর না করিবার দণ্ড",
    enExp: "Punishes landowner who, after contract, fails or refuses to hand over physical possession of land within stipulated time with imprisonment up to 2 years or fine up to 10 lakh taka.",
    bnExp: "চুক্তি সম্পাদনের পর জমির মালিক নির্দিষ্ট সময়ে ডেভেলপারের নিকট জমির দখল হস্তান্তর না করলে অনধিক ২ বছর কারাদণ্ড বা ১০ লাখ টাকা অর্থদণ্ড।",
    enCaution: "Protects developers from bad-faith landowners reneging on signed joint development agreements.",
    bnCaution: "চুক্তি করে জমি হস্তান্তর না করলে জমির মালিকের বিরুদ্ধে ফৌজদারি দণ্ড প্রযোজ্য।",
    keywords: ["landowner failure deliver land penalty", "bhumi malik dokhol hastantor dondo", "জমির মালিকের দণ্ড", "ধারা ২৮"]
  },
  29: {
    enTitle: "Penalty on Landowner for Unilateral Cancellation of Power of Attorney",
    bnTitle: "ভূমির মালিক কর্তৃক সম্পাদিত আম-মোক্তারনামা বাতিলের দণ্ড",
    enExp: "Punishes landowner who arbitrarily cancels registered general power of attorney given to developer without Section 36 ADR with imprisonment up to 2 years or fine up to 10 lakh taka.",
    bnExp: "বিরোধ নিষ্পত্তি প্রক্রিয়া অনুসরণ ছাড়া জমির মালিক একতরফাভাবে ডেভেলপারের অনুকূলে প্রদত্ত আম-মোক্তারনামা বাতিল করলে অনধিক ২ বছর কারাদণ্ড বা ১০ লাখ টাকা অর্থদণ্ড।",
    enCaution: "Power of Attorney Act 2012 irrevocability principles apply concurrently.",
    bnCaution: "আম-মোক্তারনামা আইন ২০১২ অনুযায়ী স্বার্থযুক্ত আম-মোক্তারনামা একতরফা বাতিল করা যায় না।",
    keywords: ["cancellation power of attorney penalty", "am moktarnama batil dondo", "আম-মোক্তারনামা বাতিলের দণ্ড", "ধারা ২৯"]
  },
  30: {
    enTitle: "Penalty on Developer for Failing to Deliver Landowner's Share",
    bnTitle: "ডেভেলপার কর্তৃক ভূমির মালিকের অংশ বুঝাইয়া না দেওয়ার দণ্ড",
    enExp: "Punishes developer who fails or refuses to deliver the contracted share of apartments or space to landowner with imprisonment up to 2 years or fine up to 20 lakh taka or both.",
    bnExp: "চুক্তিতে নির্ধারিত ফ্ল্যাট বা অংশ জমির মালিককে বুঝিয়ে না দিলে ডেভেলপার অনধিক ২ বছর কারাদণ্ড বা ২০ লাখ টাকা অর্থদণ্ড বা উভয় দণ্ডে দণ্ডিত হবেন।",
    enCaution: "Landowners can petition the criminal court for delivery of possession and compensation.",
    bnCaution: "জমির মালিক তার ন্যায্য হিস্যা বুঝে পেতে ফৌজদারি আদালতে প্রতিকার চাইতে পারেন।",
    keywords: ["developer withholding landowner share penalty", "bhumi malik ongsho na deya", "মালিকের অংশ না দেওয়ার দণ্ড", "ধারা ৩০"]
  },
  31: {
    enTitle: "Corporate Offenses by Developers and Firms",
    bnTitle: "কোম্পানি কর্তৃক অপরাধ সংঘটন",
    enExp: "Governs corporate liability: where an offense is committed by a company or firm, every director, managing director, or officer shall be deemed guilty unless proved lack of knowledge.",
    bnExp: "কোনো ডেভেলপার কোম্পানি বা ফার্ম এই আইনের কোনো অপরাধ করলে উক্ত কোম্পানির প্রত্যেক পরিচালক, এমডি ও ম্যানেজার ব্যক্তিগতভাবে দায়ী ও দণ্ডিত হবেন।",
    enCaution: "Victims should explicitly name the Managing Director and Board of Directors in criminal complaints.",
    bnCaution: "মামলা করার সময় কোম্পানির পাশাপাশি ব্যবস্থাপনা পরিচালক ও সংশ্লিষ্ট কর্মকর্তাদের নামীয়ভাবে আসামি করা আবশ্যক।",
    keywords: ["corporate developer liability", "company managing director liability", "company oporadh", "কোম্পানির অপরাধ", "ধারা ৩১"]
  },
  32: {
    enTitle: "Cognizance of Offenses by Competent Magistrates",
    bnTitle: "অপরাধ বিচারার্থ গ্রহণ, ইত্যাদি",
    enExp: "Provides that offenses under this Act are triable exclusively by a Court of Judicial Magistrate 1st Class or Metropolitan Magistrate, upon written complaint.",
    bnExp: "এই আইনের অধীন অপরাধসমূহ কেবলমাত্র প্রথম শ্রেণির জুডিসিয়াল ম্যাজিস্ট্রেট বা মেট্রোপলিটন ম্যাজিস্ট্রেট আদালত কর্তৃক বিচারার্থ গৃহীত হবে।",
    enCaution: "Complaints must be filed before the competent criminal magistrate court with transaction proof.",
    bnCaution: "থানায় মামলা না নিলে সরাসরি বিজ্ঞ সিআর (নালিশি) আদালতে আইনজীবীর মাধ্যমে নালিশ দাখিল করা যায়।",
    keywords: ["cognizance real estate offenses", "magistrate trial apartment fraud", "oporadh bicharartho grohon", "অপরাধ আমলে গ্রহণ", "ধারা ৩২"]
  },
  33: {
    enTitle: "Trial Procedure",
    bnTitle: "বিচার",
    enExp: "Specifies that trials of offenses under this Act shall follow the summary and warrant trial procedures prescribed in the Code of Criminal Procedure, 1898 (CrPC).",
    bnExp: "ফৌজদারি কার্যবিধি ১৮৯৮-এর নির্ধারিত পদ্ধতি অনুযায়ী এই আইনের অপরাধের বিচারিক কার্যধারা পরিচালিত হবে।",
    enCaution: "Magistrates may adopt summary trial procedure under CrPC for expeditious disposal.",
    bnCaution: "মামলা দ্রুত নিষ্পত্তির জন্য সংক্ষিপ্ত বিচার পদ্ধতি প্রয়োগের বিধান রয়েছে।",
    keywords: ["trial procedure real estate", "crpc trial developer", "bichar poddhoti", "বিচার পদ্ধতি", "ধারা ৩৩"]
  },
  34: {
    enTitle: "Special Powers of Magistrates to Impose Fines",
    bnTitle: "অর্থদণ্ড আরোপের ক্ষেত্রে ম্যাজিস্ট্রেটের বিশেষ ক্ষমতা",
    enExp: "Empowers the trying Magistrate to impose any statutory fine prescribed in this Act (up to 20 lakh taka) notwithstanding CrPC Section 32 limits.",
    bnExp: "ফৌজদারি কার্যবিধির সীমাবদ্ধতা সত্ত্বেও এই আইনের অধীন নির্ধারিত সর্বোচ্চ ২০ লাখ টাকা পর্যন্ত অর্থদণ্ড আরোপের বিশেষ ক্ষমতা ম্যাজিস্ট্রেটের রয়েছে।",
    enCaution: "Ensures full statutory penalties can be awarded directly at Magistrate level without Session Court committal.",
    bnCaution: "ম্যাজিস্ট্রেট আদালত নিজেই ২০ লাখ টাকা পর্যন্ত জরিমানা কার্যকর করতে পারেন।",
    keywords: ["magistrate special fine power", "20 lakh taka fine magistrate", "orthodondo bishesh khomota", "ম্যাজিস্ট্রেটের বিশেষ ক্ষমতা", "ধারা ৩৪"]
  },
  35: {
    enTitle: "Distribution of Recovered Fines to Aggrieved Buyers or Owners",
    bnTitle: "আদায়কৃত অর্থ বণ্টন",
    enExp: "Mandates that out of the fine realized from a convicted developer, the court may award up to 50% or the entire damages to the aggrieved purchaser or landowner.",
    bnExp: "দোষী ডেভেলপারের নিকট থেকে আদায়কৃত জরিমানার অর্থ আদালত সংক্ষুব্ধ ক্রেতা বা জমির মালিককে ক্ষতিপূরণ হিসেবে প্রদানের নির্দেশ দিতে পারেন।",
    enCaution: "Complainants should formally petition the court for disbursement of realized fines under this Section.",
    bnCaution: "আদালতে জরিমানার অর্থ সংক্ষুব্ধ ক্রেতাকে পাইয়ে দেওয়ার সুনির্দিষ্ট আবেদন দাখিল করা উচিত।",
    keywords: ["distribution of fines victim", "compensation to apartment buyer", "adaykrito ortho bonton", "আদায়কৃত অর্থ বণ্টন", "ধারা ৩৫"]
  },
  36: {
    enTitle: "Alternative Dispute Resolution, Mediation, and REHAB Arbitration",
    bnTitle: "বিরোধ নিষ্পত্তি (মধ্যস্থতা ও সালিস)",
    enExp: "Mandates alternative dispute resolution (ADR): parties must first attempt mediation (via REHAB or mutual mediators); if failed, dispute is resolved under the Arbitration Act, 2001.",
    bnExp: "বিরোধ দেখা দিলে পক্ষগণ মধ্যস্থতার মাধ্যমে বা রিহ্যাব (REHAB)-এর মাধ্যমে নিষ্পত্তির চেষ্টা করবেন; ব্যর্থ হলে সালিস আইন ২০০১ অনুযায়ী সালিসি ট্রাইব্যুনালে নিষ্পত্তি হবে।",
    enCaution: "Arbitration clause does not bar criminal proceedings under Sections 19-30 for fraud or cheating. Civil disputes must undergo mediation before suit.",
    bnCaution: "সালিসি চুক্তির কারণে প্রতারণার ফৌজদারি মামলা দায়েরের অধিকার খর্ব হয় না; তবে দেওয়ানি বিরোধে সালিস প্রক্রিয়ার আশ্রয় নেওয়া যায়।",
    keywords: ["rehab arbitration dispute resolution", "mediation real estate 2010", "arbitration act 2001 flat", "বিরোধ নিষ্পত্তি সালিস রিহ্যাব", "ধারা ৩৬"]
  },
  37: {
    enTitle: "Application to Ongoing Projects",
    bnTitle: "চলমান প্রকল্পের ক্ষেত্রে এই আইনের প্রয়োগ",
    enExp: "Applies the regulatory, safety, and consumer protection provisions of this Act to all real estate projects ongoing at the time of enactment.",
    bnExp: "এই আইন কার্যকর হওয়ার পূর্বে শুরু হওয়া চলমান আবাসন প্রকল্পসমূহের ক্ষেত্রেও এই আইনের বিধানাবলি সমভাবে প্রযোজ্য।",
    enCaution: "Developers cannot evade obligations on previously booked apartments by claiming grandfathered exemption.",
    bnCaution: "পূর্বের চলমান প্রকল্পেও নকশা অনুমোদন ও সময়মতো হস্তান্তরের আইনি দায় বহাল থাকবে।",
    keywords: ["ongoing projects real estate", "choloman prokolpo", "retrospective application", "চলমান প্রকল্পে প্রয়োগ", "ধারা ৩৭"]
  },
  38: {
    enTitle: "Power to Make Rules",
    bnTitle: "বিধি প্রণয়নের ক্ষমতা",
    enExp: "Empowers the Government to make rules by official gazette notification for carrying out the objectives and procedural mechanisms of this Act.",
    bnExp: "এই আইনের উদ্দেশ্য বাস্তবায়নকল্পে সরকার সরকারি গেজেটে প্রজ্ঞাপন দ্বারা বিধি প্রণয়ন করতে পারে।",
    enCaution: "Real Estate Development and Management Rules 2011 govern registration forms and fees.",
    bnCaution: "রিয়েল এস্টেট উন্নয়ন ও ব্যবস্থাপনা বিধিমালা ২০১১ পদ্ধতিগতভাবে প্রযোজ্য।",
    keywords: ["power to make rules real estate", "bidhi pronoyon", "real estate rules 2011", "বিধি প্রণয়ন ক্ষমতা", "ধারা ৩৮"]
  },
  39: {
    enTitle: "Repeal and Special Savings Provision",
    bnTitle: "হেফাজত সংক্রান্ত বিশেষ বিধান",
    enExp: "Repeals the Real Estate Development and Management Ordinance, 2008 and validates all actions, registrations, and orders made thereunder.",
    bnExp: "২০০৮ সালের অধ্যাদেশ রহিতকরণ এবং তৎসংক্রান্ত যাবতীয় কার্যক্রমের বৈধতা হেফাজত।",
    enCaution: "Actions initiated under 2008 ordinance continue seamlessly under this primary Act.",
    bnCaution: "২০০৮ সালের অধ্যাদেশের অধীন গৃহীত সকল কার্যক্রম এই আইনের অধীনে কৃত বলিয়া গণ্য হবে।",
    keywords: ["repeal savings real estate 2008", "hefazot bishesh bidhan", "রহিতকরণ ও হেফাজত", "ধারা ৩৯"]
  }
};

const provisions = [];

for (const raw of rawExtracted) {
  const secNum = raw.secIndex;
  const meta = reMeta[secNum];
  if (!meta) {
    console.warn(`Missing metadata for Real Estate section ${secNum}`);
    continue;
  }

  const id = `real-estate-${secNum}`;
  const sectionNumber = `Section ${secNum}`;
  const titleBn = `${meta.bnTitle} (ধারা ${secNum})`;
  const titleEn = `${meta.enTitle} (Section ${secNum})`;

  const cleanedOriginalText = cleanText(raw.text);

  const provision = {
    id,
    actId: 'act_real_estate_2010',
    sectionNumber,
    categories: ['land', 'consumer'],
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
    effectiveDate: '2010-12-05',
    legalStatus: 'active',
    reviewStatus: 'verified',
    contentHash: '',
    keywords: [
      ...meta.keywords,
      `ধারা ${secNum}`,
      `section ${secNum}`,
      `real estate ${secNum}`,
      `রিয়েল এস্টেট ধারা ${secNum}`,
      'রিয়েল এস্টেট উন্নয়ন ও ব্যবস্থাপনা আইন',
      'apartment fraud bangladesh',
      'rehab developer complaint',
      'ফ্ল্যাট জালিয়াতি'
    ]
  };

  provisions.push(provision);
}

fs.writeFileSync('scripts/real_estate_2010_all.json', JSON.stringify(provisions, null, 2), 'utf8');
console.log(`Generated all ${provisions.length} provisions for Real Estate Development and Management Act, 2010`);
