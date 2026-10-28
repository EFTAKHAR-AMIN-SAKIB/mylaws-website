export type Lang = 'en' | 'bn';
export type Category = 'work' | 'consumer' | 'land' | 'family' | 'digital' | 'rights';

export interface Provision {
  id: string;
  category: Category;
  act: { en: string; bn: string };
  section: string;
  title: { en: string; bn: string };
  /** A short, verbatim excerpt, not the whole provision. */
  quote: string;
  sourceLanguage: Lang;
  sourceUrl: string;
  /** Date the public source was consulted, not a legal-review or amendment date. */
  checkedOn: string;
  versionNote: { en: string; bn: string };
  explanation: { en: string; bn: string };
  caution: { en: string; bn: string };
  keywords: string[];
}

const constitution = { en: 'Constitution of Bangladesh', bn: 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান' };
const labour = { en: 'Bangladesh Labour Act, 2006', bn: 'বাংলাদেশ শ্রম আইন, ২০০৬' };
const consumer = { en: 'Consumers’ Right Protection Act, 2009', bn: 'ভোক্তা অধিকার সংরক্ষণ আইন, ২০০৯' };
const property = { en: 'Transfer of Property Act, 1882', bn: 'সম্পত্তি হস্তান্তর আইন, ১৮৮২' };
const domestic = { en: 'Domestic Violence (Prevention and Protection) Act, 2010', bn: 'পারিবারিক সহিংসতা (প্রতিরোধ ও সুরক্ষা) আইন, ২০১০' };
const penal = { en: 'Penal Code, 1860', bn: 'দণ্ডবিধি, ১৮৬০' };

const versionNote = {
  en: 'Official portal consulted on 26 October 2026. A selected excerpt; later amendments, court decisions, rules and exceptions may affect its application. Not professionally reviewed.',
  bn: '২৬ অক্টোবর ২০২৬ তারিখে সরকারি পোর্টাল দেখা হয়েছে। এটি নির্বাচিত উদ্ধৃতি; পরবর্তী সংশোধন, আদালতের সিদ্ধান্ত, বিধি ও ব্যতিক্রম প্রয়োগে প্রভাব ফেলতে পারে। আইনজীবী দ্বারা পর্যালোচিত নয়।',
};

const workScope = {
  en: 'First establish whether the person and establishment fall within this Act. EPZ employment, public service and excluded work may follow different rules. Keep employment and payment records; obtain advice before choosing a claim route.',
  bn: 'প্রথমে দেখতে হবে কর্মী ও প্রতিষ্ঠান এই আইনের আওতাভুক্ত কি না। ইপিজেড, সরকারি চাকরি বা বাদ পড়া কাজে ভিন্ন নিয়ম হতে পারে। নিয়োগ ও লেনদেনের প্রমাণ রাখুন; দাবির পদ্ধতি বাছাইয়ে পরামর্শ নিন।',
};

type Entry = Omit<Provision, 'checkedOn' | 'versionNote'> & { versionNote?: Provision['versionNote'] };
const entry = (value: Entry): Provision => ({ checkedOn: '2026-10-26', versionNote, ...value });

export const provisions: Provision[] = [
  entry({
    id: 'constitution-27',
    category: 'rights',
    act: constitution,
    section: 'Article 27',
    title: { en: 'Equal protection of the law', bn: 'আইনের সমান আশ্রয়' },
    quote: 'All citizens are equal before law and are entitled to equal protection of law.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/part-details-200.html?lang=en',
    explanation: {
      en: 'Article 27 gives citizens equality before the law and equal legal protection. It is a constitutional starting point when a public authority treats people unequally; the facts and the applicable law still determine the remedy.',
      bn: 'অনুচ্ছেদ ২৭ অনুযায়ী নাগরিকেরা আইনের দৃষ্টিতে সমান এবং আইনের সমান আশ্রয় পাওয়ার অধিকারী। সরকারি কর্তৃপক্ষের বৈষম্যমূলক আচরণের ক্ষেত্রে এটি প্রাসঙ্গিক হতে পারে; প্রতিকার নির্ভর করে ঘটনা ও প্রযোজ্য আইনের ওপর。',
    },
    caution: {
      en: 'This does not decide whether a particular difference in treatment is unlawful or guarantee a court outcome. Constitutional exceptions and the appropriate legal route need individual assessment.',
      bn: 'আচরণের প্রতিটি পার্থক্য বেআইনি কি না বা মামলার ফল কী হবে, এই অনুচ্ছেদ একা তা নির্ধারণ করে না। সাংবিধানিক ব্যতিক্রম ও উপযুক্ত প্রতিকারের পথ যাচাই করতে হবে।',
    },
    keywords: ['equality', 'equal protection', 'unequal treatment', 'discrimination', 'সমতা', 'বৈষম্য', 'সমান অধিকার', 'আইনের দৃষ্টিতে'],
  }),
  entry({
    id: 'constitution-28',
    category: 'rights',
    act: constitution,
    section: 'Article 28',
    title: { en: 'Protection from discrimination', bn: 'বৈষম্য থেকে সুরক্ষা' },
    quote: 'The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex or place of birth.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24576.html',
    explanation: {
      en: 'The State must not discriminate against a citizen solely on the listed grounds. Women have equal rights in State and public life. The article also addresses access to public places and educational institutions.',
      bn: 'রাষ্ট্র শুধু ধর্ম, বর্ণ, জাত, নারী-পুরুষভেদ বা জন্মস্থানের কারণে নাগরিকের প্রতি বৈষম্য করতে পারে না। রাষ্ট্র ও গণজীবনে নারীর সমান অধিকার রয়েছে। গণস্থান ও শিক্ষাপ্রতিষ্ঠানে প্রবেশের বিষয়ও এই অনুচ্ছেদে আছে।',
    },
    caution: {
      en: 'Article 28(4) permits special measures for women, children and disadvantaged sections. Do not assume that every private dispute falls directly under this article.',
      bn: 'অনুচ্ছেদ ২৮(৪) নারী, শিশু ও অনগ্রসর জনগোষ্ঠীর জন্য বিশেষ ব্যবস্থা অনুমোদন করে। প্রতিটি ব্যক্তিগত বিরোধ সরাসরি এই অনুচ্ছেদের আওতায় পড়ে না।',
    },
    keywords: ['discrimination', 'religion', 'gender', 'sex discrimination', 'equal rights', 'বৈষম্য', 'ধর্ম', 'নারীর অধিকার', 'লিঙ্গ', 'জন্মস্থান'],
  }),
  entry({
    id: 'constitution-31',
    category: 'rights',
    act: constitution,
    section: 'Article 31',
    title: { en: 'Treatment according to law', bn: 'আইন অনুযায়ী আচরণ পাওয়া' },
    quote: 'no action detrimental to the life, liberty, body, reputation or property of any person shall be taken except in accordance with law.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24579.html',
    explanation: {
      en: 'Article 31 protects lawful treatment of citizens and other people currently in Bangladesh. Action harming life, liberty, the body, reputation or property must have a basis in law.',
      bn: 'অনুচ্ছেদ ৩১ নাগরিক এবং বাংলাদেশে অবস্থানরত অন্য ব্যক্তিদের আইনানুযায়ী আচরণ পাওয়ার অধিকার দেয়। জীবন, স্বাধীনতা, দেহ, সুনাম বা সম্পত্তির ক্ষতিকর ব্যবস্থা আইন অনুযায়ী হতে হবে।',
    },
    caution: {
      en: 'The article alone does not identify the proper court, deadline or remedy. Special constitutional provisions, including Article 47A where applicable, require legal assessment.',
      bn: 'এই অনুচ্ছেদ একা উপযুক্ত আদালত, সময়সীমা বা প্রতিকার নির্ধারণ করে না। প্রযোজ্য ক্ষেত্রে অনুচ্ছেদ ৪৭ক-সহ বিশেষ বিধান যাচাই করা জরুরি।',
    },
    keywords: ['lawful treatment', 'protection of law', 'abuse of power', 'liberty', 'আইনের আশ্রয়', 'ক্ষমতার অপব্যবহার', 'বেআইনি ব্যবস্থা', 'ব্যক্তিস্বাধীনতা'],
  }),
  entry({
    id: 'constitution-33',
    category: 'rights',
    act: constitution,
    section: 'Article 33(1)–(3)',
    title: { en: 'Rights after an arrest', bn: 'গ্রেপ্তারের পর অধিকার' },
    quote: 'nor shall he be denied the right to consult and be defended by a legal practitioner of his choice.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24581.html',
    explanation: {
      en: 'Ordinarily, an arrested person must promptly learn the grounds of arrest and be allowed a lawyer of their choice. Production before the nearest magistrate is required within 24 hours, excluding necessary travel time. Further detention needs a magistrate’s authority.',
      bn: 'সাধারণ নিয়মে গ্রেপ্তারের কারণ যত দ্রুত সম্ভব জানাতে হবে এবং পছন্দের আইনজীবীর সঙ্গে পরামর্শের সুযোগ দিতে হবে। যাতায়াতের প্রয়োজনীয় সময় বাদে ২৪ ঘণ্টার মধ্যে নিকটতম ম্যাজিস্ট্রেটের সামনে হাজির করতে হবে; এরপর আটক রাখতে ম্যাজিস্ট্রেটের অনুমতি লাগে।',
    },
    caution: {
      en: 'Article 33(3) makes exceptions for enemy aliens and preventive detention; other safeguards then require separate assessment. An arrest or detention needs urgent legal assistance.',
      bn: 'অনুচ্ছেদ ৩৩(৩)-এ শত্রুভাবাপন্ন বিদেশি ও নিবর্তনমূলক আটকের ব্যতিক্রম আছে; সেক্ষেত্রে অন্য সুরক্ষা আলাদাভাবে দেখতে হয়। গ্রেপ্তার বা আটকের ক্ষেত্রে দ্রুত আইনগত সহায়তা নিন।',
    },
    keywords: ['arrest', 'arrested', 'detention', 'police custody', 'magistrate', '24 hours', 'গ্রেপ্তার', 'গ্রেফতার', 'আটক', 'হাজত', 'ম্যাজিস্ট্রেট', '২৪ ঘণ্টা'],
  }),
  entry({
    id: 'constitution-35',
    category: 'rights',
    act: constitution,
    section: 'Article 35(4)–(6)',
    title: { en: 'Protection against compelled testimony and torture', bn: 'জোরপূর্বক সাক্ষ্য ও নির্যাতন থেকে সুরক্ষা' },
    quote: 'No person accused of any offence shall be compelled to be a witness against himself.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24583.html',
    explanation: {
      en: 'An accused person cannot be compelled to testify against themselves. Article 35(5) also prohibits torture and cruel, inhuman or degrading punishment or treatment.',
      bn: 'অভিযুক্ত ব্যক্তিকে নিজের বিরুদ্ধে সাক্ষ্য দিতে বাধ্য করা যায় না। অনুচ্ছেদ ৩৫(৫) নির্যাতন এবং নিষ্ঠুর, অমানবিক বা অবমাননাকর শাস্তি বা আচরণও নিষিদ্ধ করে।',
    },
    caution: {
      en: 'The source includes Article 35(6), concerning existing trial and punishment laws. The scope of testimony protection and the response to alleged torture require legal advice; this is not a blanket instruction to refuse every lawful request.',
      bn: 'মূল পাঠে বিদ্যমান বিচার ও শাস্তির আইনসংক্রান্ত অনুচ্ছেদ ৩৫(৬) রয়েছে। সাক্ষ্যসংক্রান্ত সুরক্ষার সীমা ও নির্যাতনের প্রতিকারে আইনি পরামর্শ প্রয়োজন; সব বৈধ অনুরোধ অমান্য করার নির্দেশ এটি নয়।',
    },
    keywords: ['torture', 'forced confession', 'self incrimination', 'confession', 'নির্যাতন', 'জোর করে স্বীকারোক্তি', 'স্বীকারোক্তি', 'নিজের বিরুদ্ধে সাক্ষ্য'],
  }),
  entry({
    id: 'constitution-44',
    category: 'rights',
    act: constitution,
    section: 'Article 44(1)',
    title: { en: 'Enforcing fundamental rights', bn: 'মৌলিক অধিকার কার্যকর করা' },
    quote: 'The right to move the High Court Division in accordance with clause (1) of article 102',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-print-367/section-print-24592.html',
    explanation: {
      en: 'Article 44 provides a route to the High Court Division, under Article 102(1), to enforce the fundamental rights in Part III of the Constitution.',
      bn: 'সংবিধানের তৃতীয় ভাগের মৌলিক অধিকার কার্যকর করতে অনুচ্ছেদ ১০২(১) অনুযায়ী হাইকোর্ট বিভাগে আবেদন করার অধিকার অনুচ্ছেদ ৪৪-এ রয়েছে।',
    },
    caution: {
      en: 'Whether a constitutional application is appropriate depends on jurisdiction, facts and exceptions, including Article 47A where relevant. A lawyer should assess the route before filing.',
      bn: 'সাংবিধানিক আবেদন উপযুক্ত কি না তা এখতিয়ার, ঘটনা এবং প্রযোজ্য ক্ষেত্রে অনুচ্ছেদ ৪৭ক-সহ ব্যতিক্রমের ওপর নির্ভর করে। দাখিলের আগে আইনজীবীর পরামর্শ নিন।',
    },
    keywords: ['fundamental rights', 'high court', 'writ', 'constitutional remedy', 'মৌলিক অধিকার', 'হাইকোর্ট', 'রিট', 'সাংবিধানিক প্রতিকার'],
  }),
  entry({
    id: 'labour-5',
    category: 'work',
    act: labour,
    section: 'Section 5',
    title: { en: 'Appointment letter and photo ID', bn: 'নিয়োগপত্র ও ছবিসহ পরিচয়পত্র' },
    quote: 'কোন মালিক নিয়োগপত্র প্রদান না করিয়া কোন শ্রমিককে নিয়োগ করিতে পারিবেন না',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-29073.html',
    explanation: {
      en: 'For employment covered by this Act, an employer must provide an appointment letter and a photo identity card. This can be relevant if you have been working without written appointment documents.',
      bn: 'এই আইনের আওতাভুক্ত চাকরিতে মালিককে নিয়োগপত্র ও ছবিসহ পরিচয়পত্র দিতে হয়। লিখিত নিয়োগপত্র ছাড়া কাজ করলে এই বিধান প্রাসঙ্গিক হতে পারে।',
    },
    caution: workScope,
    keywords: ['appointment letter', 'employment contract', 'id card', 'no contract', 'নিয়োগপত্র', 'নিয়োগপত্র', 'পরিচয়পত্র', 'চাকরির কাগজ', 'লিখিত চুক্তি'],
  }),
  entry({
    id: 'labour-108',
    category: 'work',
    act: labour,
    section: 'Section 108(1)–(2)',
    title: { en: 'Pay for overtime work', bn: 'অতিরিক্ত কাজের মজুরি' },
    quote: 'এর সাধারণ হারের দ্বিগুণ হারে ভাতা পাইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-29435.html',
    explanation: {
      en: 'For covered workers, work beyond the statutory daily or weekly hours attracts overtime at twice the ordinary rate of the specified wage components: basic wage, dearness allowance and any ad hoc or interim wage. This is not automatically twice the entire salary.',
      bn: 'আওতাভুক্ত শ্রমিকের আইননির্ধারিত দৈনিক বা সাপ্তাহিক সময়ের অতিরিক্ত কাজে মূল মজুরি, মহার্ঘভাতা এবং প্রযোজ্য এডহক বা অন্তর্বর্তী মজুরির সাধারণ হারের দ্বিগুণ হারে ভাতা প্রাপ্য। এটি স্বয়ংক্রিয়ভাবে পুরো বেতনের দ্বিগুণ নয়।',
    },
    caution: {
      en: 'Section 108(2) excludes piece-rate workers from subsection (1). Check coverage, recorded hours and wage components before calculating an amount.',
      bn: 'ধারা ১০৮(২) অনুযায়ী পিস-রেট শ্রমিকের ক্ষেত্রে উপধারা (১) প্রযোজ্য নয়। অঙ্ক হিসাবের আগে আইনের প্রযোজ্যতা, কর্মঘণ্টা ও মজুরির অংশ যাচাই করুন।',
    },
    keywords: ['overtime', 'extra hours', 'over time', 'double pay', 'ওভারটাইম', 'অতিরিক্ত কাজ', 'অধিকাল', 'বাড়তি সময়', 'দ্বিগুণ মজুরি'],
  }),
  entry({
    id: 'labour-123',
    category: 'work',
    act: labour,
    section: 'Section 123',
    title: { en: 'When wages must be paid', bn: 'মজুরি পরিশোধের সময়' },
    quote: 'সেই কাল শেষ হওয়ার পরবর্তী সাত কর্মদিবসের মধ্যে তাহার মজুরী পরিশোধ করিতে হইবে।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-29450.html',
    explanation: {
      en: 'For workers covered by the Act, regular wages must be paid within seven working days after the wage period ends. Section 123(2) sets a different period of thirty working days after employment ends for the wages payable in those circumstances.',
      bn: 'এই আইনের আওতাভুক্ত শ্রমিকের নিয়মিত মজুরি মজুরিকাল শেষ হওয়ার পর সাত কর্মদিবসের মধ্যে দিতে হয়। চাকরি শেষ হলে ধারা ১২৩(২)-এর পরিস্থিতিতে প্রাপ্য মজুরি পরিশোধের জন্য চাকরি শেষের পর ত্রিশ কর্মদিবসের আলাদা সময়সীমা রয়েছে।',
    },
    caution: workScope,
    keywords: ['salary', 'wages', 'unpaid', 'not paid', 'late payment', 'employer', 'বেতন', 'মজুরি', 'মজুরী', 'বকেয়া', 'বকেয়া', 'বেতন দেয়নি', 'মালিক টাকা'],
  }),
  entry({
    id: 'labour-132',
    category: 'work',
    act: labour,
    section: 'Section 132(1)–(2)',
    title: { en: 'A claim for unpaid or deducted wages', bn: 'বকেয়া বা কাটা মজুরির দাবি' },
    quote: 'বকেয়া বা বিলম্বিত মজুরী ও অন্যান্য পাওনা আদায়ের জন্য শ্রম আদালতে দরখাসত্দ করিতে পারিবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-29459.html',
    versionNote: {
      en: 'Source checked 26 October 2026. The portal notes an addition by section 29 of Bangladesh Labour (Amendment) Act, 2026 (Act 43): an inspector may apply. This is a source observation, not a full amendment audit.',
      bn: 'উৎস দেখা হয়েছে ২৬ অক্টোবর ২০২৬। পোর্টালে বাংলাদেশ শ্রম (সংশোধন) আইন, ২০২৬ (৪৩ নং আইন)-এর ২৯ ধারায় পরিদর্শকের আবেদন করার সংযোজন উল্লেখ আছে। এটি পূর্ণ সংশোধনী নিরীক্ষা নয়।',
    },
    explanation: {
      en: 'For claims covered by this provision, a worker or another authorized applicant may apply to the Labour Court for unlawful deductions, unpaid or delayed wages and certain other dues. The ordinary filing period is twelve months from deduction or the date payment became due; sufficient cause can allow a late application.',
      bn: 'এই বিধানের আওতাভুক্ত বেআইনি কর্তন, অপরিশোধিত বা বিলম্বিত মজুরি ও নির্দিষ্ট পাওনার জন্য শ্রমিক বা অনুমোদিত আবেদনকারী শ্রম আদালতে আবেদন করতে পারেন। সাধারণ সময়সীমা কর্তন বা পাওনা হওয়ার তারিখ থেকে বারো মাস; যথেষ্ট কারণ দেখাতে পারলে বিলম্বিত আবেদন গ্রহণ হতে পারে।',
    },
    caution: {
      en: 'Confirm worker coverage, the correct Labour Court and which dues qualify. This does not guarantee payment or compensation. Seek advice promptly rather than relying on the possibility of an extension.',
      bn: 'শ্রমিকের আওতাভুক্তি, উপযুক্ত শ্রম আদালত ও কোন পাওনা এই ধারায় পড়ে তা যাচাই করুন। টাকা বা ক্ষতিপূরণ পাওয়া নিশ্চিত নয়। সময় বাড়ার সম্ভাবনার ওপর নির্ভর না করে দ্রুত পরামর্শ নিন।',
    },
    keywords: ['unpaid salary', 'wage claim', 'deduction', 'labour court', 'salary withheld', 'বকেয়া বেতন', 'বকেয়া মজুরি', 'মজুরি কর্তন', 'বেতন কাটা', 'শ্রম আদালত'],
  }),
  entry({
    id: 'labour-124a',
    category: 'work',
    act: labour,
    section: 'Section 124A',
    title: { en: 'Conciliation for wages and other dues', bn: 'আপসের মাধ্যমে মজুরি ও পাওনা' },
    quote: 'প্রধান পরিদর্শক বা প্রধান পরিদর্শক কর্তৃক ক্ষমতাপ্রাপ্ত কর্মকর্তার নিকট আবেদন করা যাইবে।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-952/section-43728.html',
    explanation: {
      en: 'A covered worker may ask the Chief Inspector or an authorized officer to help settle legally owed wages and other dues through discussion or conciliation. This route can apply at different stages of employment, including after it ends.',
      bn: 'আওতাভুক্ত শ্রমিক আইনত প্রাপ্য মজুরি ও অন্যান্য পাওনা আপসের মাধ্যমে পেতে প্রধান পরিদর্শক বা ক্ষমতাপ্রাপ্ত কর্মকর্তার কাছে আবেদন করতে পারেন। চাকরি চলাকালীন বা শেষ হওয়ার পরও এই পদ্ধতি প্রাসঙ্গিক হতে পারে।',
    },
    caution: {
      en: 'Conciliation is not a guaranteed settlement. Check how this route interacts with court deadlines and other remedies before relying on it.',
      bn: 'আপসের উদ্যোগ মানেই নিষ্পত্তি নিশ্চিত নয়। এই পদ্ধতি আদালতের সময়সীমা ও অন্য প্রতিকারে কী প্রভাব ফেলে তা যাচাই করুন।',
    },
    keywords: ['conciliation', 'inspector', 'wage settlement', 'dife', 'শ্রম পরিদর্শক', 'আপস', 'আপোষ', 'পাওনা', 'মজুরি আদায়'],
  }),
  entry({
    id: 'consumer-40',
    category: 'consumer',
    act: consumer,
    section: 'Section 40',
    title: { en: 'Charging more than a legally fixed price', bn: 'আইননির্ধারিত মূল্যের বেশি নেওয়া' },
    quote: 'কোন আইন বা বিধির অধীন নির্ধারিত মূল্য অপেক্ষা অধিক মূল্যে',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-39148.html',
    explanation: {
      en: 'Selling or offering a product, medicine or service above a price fixed under a law or rule can be an offence under section 40. Preserve the receipt and evidence of the legally prescribed price.',
      bn: 'আইন বা বিধির অধীন নির্ধারিত দামের চেয়ে বেশি দামে পণ্য, ওষুধ বা সেবা বিক্রি বা বিক্রির প্রস্তাব ধারা ৪০-এর অপরাধ হতে পারে। রসিদ ও নির্ধারিত দামের প্রমাণ সংরক্ষণ করুন।',
    },
    caution: {
      en: 'A higher price than another shop’s price is not by itself enough: this provision concerns a price fixed under law or rules. Check the complaint deadline separately.',
      bn: 'অন্য দোকানের চেয়ে দাম বেশি হলেই এই ধারা প্রযোজ্য হয় না; এখানে আইন বা বিধিতে নির্ধারিত মূল্যের কথা বলা হয়েছে। অভিযোগের সময়সীমাও যাচাই করুন।',
    },
    keywords: ['overcharge', 'fixed price', 'mrp', 'medicine price', 'বেশি দাম', 'নির্ধারিত মূল্য', 'এমআরপি', 'ওষুধের দাম'],
  }),
  entry({
    id: 'consumer-44',
    category: 'consumer',
    act: consumer,
    section: 'Section 44',
    title: { en: 'Misleading advertisements', bn: 'মিথ্যা বিজ্ঞাপনে প্রতারণা' },
    quote: 'অসত্য বা মিথ্যা বিজ্ঞাপন দ্বারা ক্রেতা সাধারণকে প্রতারিত করিলে',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-39152.html',
    explanation: {
      en: 'Section 44 addresses deceiving buyers through false advertisements for products or services. Keep the advertisement, seller details and evidence of what was promised and supplied.',
      bn: 'পণ্য বা সেবা বিক্রির জন্য মিথ্যা বিজ্ঞাপনে ক্রেতাকে প্রতারিত করার বিষয়টি ধারা ৪৪-এ আছে। বিজ্ঞাপন, বিক্রেতার তথ্য এবং কী প্রতিশ্রুতি দেওয়া ও সরবরাহ করা হয়েছে তার প্রমাণ রাখুন।',
    },
    caution: {
      en: 'Whether an advertisement is legally false and deceptive requires evidence. The app cannot determine guilt or promise a refund; complaint procedures and deadlines also apply.',
      bn: 'বিজ্ঞাপন আইনগতভাবে মিথ্যা ও প্রতারণামূলক কি না তা প্রমাণের বিষয়। অ্যাপ অপরাধ বা টাকা ফেরত নির্ধারণ করতে পারে না; অভিযোগের পদ্ধতি ও সময়সীমা প্রযোজ্য।',
    },
    keywords: ['false advertisement', 'misleading ad', 'fake offer', 'advertised', 'মিথ্যা বিজ্ঞাপন', 'ভুয়া অফার', 'বিজ্ঞাপনে প্রতারণা'],
  }),
  entry({
    id: 'consumer-45',
    category: 'consumer',
    act: consumer,
    section: 'Section 45',
    title: { en: 'Not receiving what you paid for', bn: 'টাকা দিয়েও প্রতিশ্রুত পণ্য না পাওয়া' },
    quote: 'প্রদত্ত মূল্যের বিনিময়ে প্রতিশ্রুত পণ্য বা সেবা যথাযথভাবে বিক্রয় বা সরবরাহ না করিলে',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-39153.html',
    explanation: {
      en: 'Section 45 addresses failure to properly sell or supply promised goods or services in exchange for payment. It may be relevant when a paid order is not delivered as promised. Keep the order, receipt and seller messages.',
      bn: 'টাকা নেওয়ার পর প্রতিশ্রুত পণ্য বা সেবা যথাযথভাবে না দেওয়ার বিষয়টি ধারা ৪৫-এ রয়েছে। পরিশোধিত অর্ডার প্রতিশ্রুতি অনুযায়ী না পেলে এটি প্রাসঙ্গিক হতে পারে। অর্ডার, রসিদ ও বিক্রেতার বার্তা রাখুন।',
    },
    caution: {
      en: 'Consumer status, the transaction and evidence must be assessed. This section does not itself guarantee a refund. Act quickly because section 60 provides a complaint deadline.',
      bn: 'ভোক্তা হিসেবে যোগ্যতা, লেনদেন ও প্রমাণ যাচাই করতে হবে। এই ধারা নিজে টাকা ফেরতের নিশ্চয়তা দেয় না। ধারা ৬০-এ অভিযোগের সময়সীমা আছে, তাই দেরি করবেন না।',
    },
    keywords: ['online shopping', 'not delivered', 'wrong product', 'refund', 'consumer fraud', 'paid order', 'অনলাইন কেনাকাটা', 'পণ্য পাইনি', 'টাকা ফেরত', 'ভুল পণ্য', 'প্রতারণা', 'ডেলিভারি'],
  }),
  entry({
    id: 'consumer-60',
    category: 'consumer',
    act: consumer,
    section: 'Section 60',
    title: { en: 'Time limit for a consumer complaint', bn: 'ভোক্তা অভিযোগের সময়সীমা' },
    quote: 'কারণ উদ্ভব হইবার ৩০ (ত্রিশ) দিনের মধ্যে',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-39167.html',
    explanation: {
      en: 'A complaint under this Act must reach the Director General or an authorized officer within thirty days after the cause arises; otherwise it is not admissible under section 60.',
      bn: 'এই আইনে অভিযোগের কারণ উদ্ভবের ত্রিশ দিনের মধ্যে মহাপরিচালক বা ক্ষমতাপ্রাপ্ত কর্মকর্তার কাছে অভিযোগ করতে হয়; অন্যথায় ধারা ৬০ অনুযায়ী তা গ্রহণযোগ্য নয়।',
    },
    caution: {
      en: 'The date the cause arose can need legal assessment. Do not assume that a shop discussion or refund promise pauses the period. Other legal routes may have different rules.',
      bn: 'কারণ কবে উদ্ভব হয়েছে তা আইনি মূল্যায়নের বিষয় হতে পারে। দোকানের সঙ্গে আলোচনা বা টাকা ফেরতের প্রতিশ্রুতিতে সময়সীমা থেমে যায় ধরে নেবেন না। অন্য প্রতিকারে ভিন্ন নিয়ম থাকতে পারে।',
    },
    keywords: ['consumer complaint', 'complaint deadline', '30 days', 'dncrp', 'ভোক্তা অভিযোগ', 'অভিযোগের সময়', '৩০ দিন', 'ভোক্তা অধিদপ্তর'],
  }),
  entry({
    id: 'property-54',
    category: 'land',
    act: property,
    section: 'Section 54 — Sale how made',
    title: { en: 'Registration of an immovable-property sale', bn: 'স্থাবর সম্পত্তি বিক্রির নিবন্ধন' },
    quote: 'can be made only by a registered instrument.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-48/section-29466.html',
    explanation: {
      en: 'The sale-transfer described in this part of section 54 requires a registered instrument for tangible immovable property. Payment or taking possession alone does not replace that requirement.',
      bn: 'ধারা ৫৪-এর এই অংশ অনুযায়ী দৃশ্যমান স্থাবর সম্পত্তি বিক্রয়ের মাধ্যমে হস্তান্তরে নিবন্ধিত দলিল লাগে। শুধু টাকা দেওয়া বা দখল নেওয়া এই শর্তের বিকল্প নয়।',
    },
    caution: {
      en: 'Registration alone does not prove the seller has valid title. Have title, records, encumbrances, possession and applicable special laws checked before paying or signing.',
      bn: 'দলিল নিবন্ধিত হলেই বিক্রেতার বৈধ মালিকানা প্রমাণিত হয় না। টাকা বা স্বাক্ষর দেওয়ার আগে মালিকানা, রেকর্ড, বন্ধক, দখল ও বিশেষ আইন যাচাই করান।',
    },
    keywords: ['land purchase', 'sale deed', 'registration', 'land ownership', 'জমি কেনা', 'দলিল', 'রেজিস্ট্রি', 'নিবন্ধন', 'জমির মালিকানা'],
  }),
  entry({
    id: 'property-54a',
    category: 'land',
    act: property,
    section: 'Section 54A',
    title: { en: 'A written, registered agreement to sell', bn: 'লিখিত ও নিবন্ধিত বায়নাপত্র' },
    quote: 'can be made only by an instrument in writing and registered under the Registration Act, 1908',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-48/section-16095.html',
    explanation: {
      en: 'A contract to sell immovable property must be written and registered. It must state the time for execution and registration of the sale deed; if no time is stated, the provision treats six months from registration as the time.',
      bn: 'স্থাবর সম্পত্তি বিক্রির চুক্তি লিখিত ও নিবন্ধিত হতে হয়। চূড়ান্ত বিক্রয়দলিল সম্পাদন ও নিবন্ধনের সময় উল্লেখ করতে হয়; সময় না থাকলে নিবন্ধনের তারিখ থেকে ছয় মাস ধরা হয়।',
    },
    caution: {
      en: 'An agreement to sell and a completed transfer are different. Registration deadlines, enforcement and title questions need separate advice; this excerpt does not settle a disputed transaction.',
      bn: 'বিক্রির চুক্তি ও সম্পূর্ণ হস্তান্তর এক বিষয় নয়। নিবন্ধনের সময়সীমা, চুক্তি কার্যকর করা ও মালিকানার প্রশ্নে আলাদা পরামর্শ প্রয়োজন; এই উদ্ধৃতি বিরোধ মীমাংসা করে না।',
    },
    keywords: ['agreement to sell', 'bayna', 'baina', 'land advance', 'বায়না', 'বায়না', 'বায়নাপত্র', 'বিক্রয়চুক্তি', 'জমির অগ্রিম'],
  }),
  entry({
    id: 'property-53c',
    category: 'land',
    act: property,
    section: 'Section 53C',
    title: { en: 'Check the latest khatian before a sale', bn: 'বিক্রির আগে সর্বশেষ খতিয়ান' },
    quote: 'appears in respect of the property in the latest khatian prepared under the State Acquisition and Tenancy Act, 1950',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-48/section-25437.html',
    explanation: {
      en: 'Section 53C requires the seller’s name in the latest relevant khatian. For ownership by inheritance, the seller’s or predecessor’s name may satisfy this stated condition. The provision says a sale contrary to it is void.',
      bn: 'ধারা ৫৩গ অনুযায়ী সর্বশেষ সংশ্লিষ্ট খতিয়ানে বিক্রেতার নাম থাকতে হয়। উত্তরাধিকারসূত্রে মালিক হলে বিক্রেতা বা পূর্বসূরির নাম থাকার বিধান আছে। এর ব্যত্যয়ে বিক্রি বাতিল বলে ধারায় উল্লেখ রয়েছে।',
    },
    caution: {
      en: 'A khatian is one check, not a complete title determination. Confirm inheritance, deed history, possession and other restrictions with a qualified professional.',
      bn: 'খতিয়ান একটি যাচাই; এটি সম্পূর্ণ মালিকানা নির্ধারণ নয়। উত্তরাধিকার, দলিলের ধারাবাহিকতা, দখল ও অন্য বিধিনিষেধ পেশাজীবীর মাধ্যমে যাচাই করুন।',
    },
    keywords: ['khatian', 'mutation', 'land record', 'seller name', 'inherited land', 'খতিয়ান', 'খতিয়ান', 'নামজারি', 'জমির রেকর্ড', 'উত্তরাধিকার জমি'],
  }),
  entry({
    id: 'domestic-3',
    category: 'family',
    act: domestic,
    section: 'Section 3',
    title: { en: 'Recognising domestic violence', bn: 'পারিবারিক সহিংসতা চেনা' },
    quote: 'শারীরিক নির্যাতন, মানসিক নির্যাতন, যৌন নির্যাতন অথবা আর্থিক ক্ষতিকে বুঝাইবে।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-print-1063/section-print-40958.html',
    explanation: {
      en: 'For this Act, domestic violence includes physical, psychological and sexual abuse or economic harm to a woman or child by a person in a family relationship. Harm need not be physical to fall within the definition.',
      bn: 'এই আইনে পারিবারিক সম্পর্কের ব্যক্তির দ্বারা পরিবারের নারী বা শিশুর ওপর শারীরিক, মানসিক, যৌন নির্যাতন বা আর্থিক ক্ষতি পারিবারিক সহিংসতার অন্তর্ভুক্ত। শুধু শারীরিক আঘাতই এর একমাত্র ধরন নয়।',
    },
    caution: {
      en: 'This Act’s definition concerns women and children in a family relationship. It does not cover every family dispute or all victims under the same route. In immediate danger, prioritise getting to safety and contacting emergency assistance.',
      bn: 'এই আইনের সংজ্ঞা পারিবারিক সম্পর্কের নারী ও শিশুকে নিয়ে। সব পারিবারিক বিরোধ বা সব ভুক্তভোগীর ক্ষেত্রে একই পথ প্রযোজ্য নয়। তাৎক্ষণিক বিপদে নিরাপদ স্থানে যাওয়া ও জরুরি সহায়তা নেওয়াকে অগ্রাধিকার দিন।',
    },
    keywords: ['domestic violence', 'husband beating', 'family abuse', 'economic abuse', 'পারিবারিক সহিংসতা', 'স্বামী মারধর', 'নির্যাতন', 'মানসিক নির্যাতন', 'আর্থিক নির্যাতন'],
  }),
  entry({
    id: 'domestic-11',
    category: 'family',
    act: domestic,
    section: 'Section 11',
    title: { en: 'Applying for protection through the court', bn: 'সুরক্ষার জন্য আদালতে আবেদন' },
    quote: 'প্রতিটি আবেদন বিধি দ্বারা নির্ধারিত ফরমে করিতে হইবে।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1063/section-40966.html',
    explanation: {
      en: 'An aggrieved person, or an enforcement officer, service provider or another person on their behalf, may apply for relief under this Act. The prescribed form must be used. The court must set a hearing date within seven working days of receiving the application.',
      bn: 'সংক্ষুব্ধ ব্যক্তি অথবা তাঁর পক্ষে প্রয়োগকারী কর্মকর্তা, সেবাদানকারী বা অন্য ব্যক্তি এই আইনে প্রতিকার চাইতে পারেন। নির্ধারিত ফরম ব্যবহার করতে হয়। আবেদন পাওয়ার সাত কার্যদিবসের মধ্যে আদালত শুনানির তারিখ নির্ধারণ করবে।',
    },
    caution: {
      en: 'Setting a hearing date is not a promise that a final protection order will issue within seven days. Appropriate orders, venue, evidence and immediate safety need individual assistance.',
      bn: 'সাত কার্যদিবসে শুনানির তারিখ নির্ধারণ মানে ওই সময়ে চূড়ান্ত সুরক্ষা আদেশের নিশ্চয়তা নয়। আদেশের ধরন, আদালত, প্রমাণ ও তাৎক্ষণিক নিরাপত্তায় ব্যক্তিগত সহায়তা নিন।',
    },
    keywords: ['protection order', 'domestic violence application', 'family protection', 'সুরক্ষা আদেশ', 'পারিবারিক সহিংসতার আবেদন', 'নিরাপত্তার আবেদন'],
  }),
  entry({
    id: 'constitution-43',
    category: 'digital',
    act: constitution,
    section: 'Article 43',
    title: { en: 'Privacy of home and communications', bn: 'বাসগৃহ ও যোগাযোগের গোপনীয়তা' },
    quote: 'to the privacy of his correspondence and other means of communication.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24591.html',
    explanation: {
      en: 'Article 43 recognises citizens’ protection of the home against entry, search and seizure and privacy of correspondence and other communications, subject to the stated lawful restrictions.',
      bn: 'অনুচ্ছেদ ৪৩ নাগরিকের বাসগৃহে প্রবেশ, তল্লাশি ও জব্দ থেকে সুরক্ষা এবং চিঠিপত্র ও অন্যান্য যোগাযোগের গোপনীয়তার অধিকার স্বীকার করে, উল্লিখিত আইনসম্মত বিধিনিষেধ সাপেক্ষে।',
    },
    caution: {
      en: 'The right is subject to reasonable legal restrictions for State security, public order, morality or health. It does not by itself establish an offence or the remedy for a specific online incident. Current cyber and privacy statutes need separate verification.',
      bn: 'রাষ্ট্রীয় নিরাপত্তা, জনশৃঙ্খলা, নৈতিকতা বা জনস্বাস্থ্যের জন্য যুক্তিসংগত আইনগত বিধিনিষেধ প্রযোজ্য। নির্দিষ্ট অনলাইন ঘটনার অপরাধ বা প্রতিকার শুধু এই অনুচ্ছেদে নির্ধারিত হয় না। বর্তমান সাইবার ও গোপনীয়তার আইন আলাদাভাবে যাচাই করতে হবে।',
    },
    keywords: ['privacy', 'messages', 'correspondence', 'phone search', 'private communication', 'গোপনীয়তা', 'গোপনীয়তা', 'ব্যক্তিগত বার্তা', 'ফোন তল্লাশি', 'যোগাযোগ'],
  }),
  entry({
    id: 'penal-503',
    category: 'digital',
    act: penal,
    section: 'Section 503',
    title: { en: 'Threats intended to frighten or compel', bn: 'ভয় দেখানো বা বাধ্য করার হুমকি' },
    quote: 'Whoever threatens another with any injury to his person, reputation or property',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-print-11/section-print-3564.html',
    explanation: {
      en: 'A threat to a person, reputation or property can amount to criminal intimidation when intended to cause alarm or compel an act or omission as described in section 503. Preserve the original messages, sender details and dates if doing so is safe.',
      bn: 'ব্যক্তি, সুনাম বা সম্পত্তির ক্ষতির হুমকি দিয়ে ভয় সৃষ্টি করা বা ধারা ৫০৩-এ বর্ণিত কাজ করতে বা বিরত থাকতে বাধ্য করার উদ্দেশ্য থাকলে অপরাধমূলক ভীতি প্রদর্শন হতে পারে। নিরাপদ হলে মূল বার্তা, প্রেরকের তথ্য ও তারিখ সংরক্ষণ করুন।',
    },
    caution: {
      en: 'Not every unpleasant message meets the legal elements. This is a general Penal Code provision, not comprehensive coverage of online harassment or current cyber legislation. If danger is immediate, seek emergency help.',
      bn: 'প্রতিটি অপ্রীতিকর বার্তা এই অপরাধের উপাদান পূরণ করে না। এটি দণ্ডবিধির সাধারণ বিধান; অনলাইন হয়রানি বা বর্তমান সাইবার আইনের পূর্ণ বিবরণ নয়। তাৎক্ষণিক বিপদে জরুরি সহায়তা নিন।',
    },
    keywords: ['threat', 'threatening', 'blackmail', 'harassment', 'facebook threat', 'হুমকি', 'ভয় দেখানো', 'ব্ল্যাকমেইল', 'অনলাইন হয়রানি', 'ফেসবুক হুমকি'],
  }),
  entry({
    id: 'penal-507',
    category: 'digital',
    act: penal,
    section: 'Section 507',
    title: { en: 'Anonymous threatening messages', bn: 'অজ্ঞাত পরিচয়ে হুমকির বার্তা' },
    quote: 'Whoever commits the offence of criminal intimidation by an anonymous communication',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-print-11/section-print-3570.html',
    explanation: {
      en: 'Section 507 addresses criminal intimidation through anonymous communication or precautions taken to hide the sender’s identity or address. It provides an additional penalty beyond the preceding intimidation provision.',
      bn: 'নাম-পরিচয়হীন যোগাযোগ বা প্রেরকের নাম-ঠিকানা গোপনের ব্যবস্থা নিয়ে অপরাধমূলক ভীতি প্রদর্শনের বিষয় ধারা ৫০৭-এ আছে। আগের ভীতি প্রদর্শনের বিধানের অতিরিক্ত শাস্তির ব্যবস্থা এখানে রয়েছে।',
    },
    caution: {
      en: 'An anonymous message is not automatically a crime: the elements of criminal intimidation must also be established. Do not confront the sender or expose private information to investigate.',
      bn: 'অজ্ঞাত পরিচয়ের বার্তা হলেই অপরাধ হয় না; অপরাধমূলক ভীতি প্রদর্শনের উপাদানও প্রতিষ্ঠা করতে হবে। তদন্ত করতে গিয়ে প্রেরকের মুখোমুখি হওয়া বা ব্যক্তিগত তথ্য প্রকাশ করা থেকে বিরত থাকুন।',
    },
    keywords: ['anonymous threat', 'fake account', 'unknown number', 'hidden identity', 'অজ্ঞাত হুমকি', 'ভুয়া আইডি', 'অচেনা নম্বর', 'বেনামি হুমকি'],
  }),
];

export const examplePrompts: Record<Category, { en: string; bn: string }> = {
  work: { en: 'My employer has not paid my salary for two months. What should I check?', bn: 'আমার মালিক দুই মাসের বেতন দেননি। কী কী বিষয় জানা দরকার?' },
  consumer: { en: 'I paid an online seller but my order was never delivered. What law may apply?', bn: 'অনলাইন দোকানে টাকা দিয়েছি কিন্তু পণ্য পাইনি। কোন আইন প্রাসঙ্গিক হতে পারে?' },
  land: { en: 'What should I check about the khatian before buying land?', bn: 'জমি কেনার আগে খতিয়ান সম্পর্কে কী যাচাই করব?' },
  family: { en: 'Does domestic violence include psychological and economic abuse?', bn: 'মানসিক ও আর্থিক নির্যাতন কি পারিবারিক সহিংসতার অন্তর্ভুক্ত?' },
  digital: { en: 'Someone is threatening me from a fake account. What law may be relevant?', bn: 'ভুয়া আইডি থেকে আমাকে হুমকি দেওয়া হচ্ছে। কোন আইন প্রাসঙ্গিক হতে পারে?' },
  rights: { en: 'What rights does a person have after being arrested?', bn: 'গ্রেপ্তার হলে একজন ব্যক্তির কী অধিকার আছে?' },
};
