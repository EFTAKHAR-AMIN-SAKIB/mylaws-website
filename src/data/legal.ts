export type Lang = 'en' | 'bn';
export type Category = 'work' | 'threats' | 'digital' | 'consumer' | 'land' | 'family' | 'rights';

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

// ==========================================
// OFFICIAL STATUTORY INSTRUMENTS (ACTS)
// ==========================================
const constitution = { en: 'Constitution of Bangladesh', bn: 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান' };
const labour = { en: 'Bangladesh Labour Act, 2006', bn: 'বাংলাদেশ শ্রম আইন, ২০০৬' };
const consumer = { en: 'Consumers’ Right Protection Act, 2009', bn: 'ভোক্তা অধিকার সংরক্ষণ আইন, ২০০৯' };
const property = { en: 'Transfer of Property Act, 1882', bn: 'সম্পত্তি হস্তান্তর আইন, ১৮৮২' };
const domestic = { en: 'Domestic Violence (Prevention and Protection) Act, 2010', bn: 'পারিবারিক সহিংসতা (প্রতিরোধ ও সুরক্ষা) আইন, ২০১০' };
const penal = { en: 'Penal Code, 1860', bn: 'দণ্ডবিধি, ১৮৬০' };
const registration = { en: 'Registration Act, 1908', bn: 'রেজিস্ট্রেশন আইন, ১৯০৮' };
const cyber = { en: 'Cyber Security Act, 2026', bn: 'সাইবার নিরাপত্তা আইন, ২০২৬' };
const legalAid = { en: 'Legal Aid Services Act, 2000', bn: 'আইনগত সহায়তা প্রদান আইন, ২০০০' };
const policeAct = { en: 'Police Act, 1861', bn: 'পুলিশ আইন, ১৮৬১' };
const crpc = { en: 'Code of Criminal Procedure, 1898', bn: 'ফৌজদারি কার্যবিধি, ১৮৯৮' };
const pornographyAct = { en: 'Pornography Control Act, 2012', bn: 'পর্নোগ্রাফি নিয়ন্ত্রণ আইন, ২০১২' };
const ictAct = { en: 'Information and Communication Technology Act, 2006', bn: 'তথ্য ও যোগাযোগ প্রযুক্তি আইন, ২০০৬' };
const landCrimeAct = { en: 'Land Crime Prevention and Redress Act, 2023 (Act No. 36 of 2023)', bn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩ (২০২৩ সনের ৩৬ নং আইন)' };
const sra = { en: 'Specific Relief Act, 1877', bn: 'সুনির্দিষ্ট প্রতিকার আইন, ১৮৭৭' };
const rentControl = { en: 'Premises Rent Control Act, 1991', bn: 'বাড়িভাড়া নিয়ন্ত্রণ আইন, ১৯৯১' };
const satAct = { en: 'State Acquisition and Tenancy Act, 1950', bn: 'রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন, ১৯৫০' };
const dowryAct = { en: 'Dowry Prohibition Act, 2018', bn: 'যৌতুক নিরোধ আইন, ২০১৮' };
const mflo = { en: 'Muslim Family Laws Ordinance, 1961', bn: 'মুসলিম পারিবারিক আইন অধ্যাদেশ, ১৯৬১' };
const familyCourtAct = { en: 'Family Courts Act, 2023', bn: 'পারিবারিক আদালত আইন, ২০২৩' };
const guardiansAct = { en: 'Guardians and Wards Act, 1890', bn: 'অভিভাবক ও প্রতিপাল্য আইন, ১৮৯০' };
const childMarriageAct = { en: 'Child Marriage Restraint Act, 2017', bn: 'বাল্যবিয়ে নিরোধ আইন, ২০১৭' };
const torturePrevention = { en: 'Torture and Custodial Death (Prevention) Act, 2013', bn: 'হেফাজতে নির্যাতন এবং মৃত্যু (নিবারণ) আইন, ২০১৩' };
const ecommerceGuidelines = { en: 'Digital Commerce Operation Guidelines, 2021', bn: 'ডিজিটাল কমার্স পরিচালনা নির্দেশিকা, ২০২১' };
const cyberProcedure = { en: 'Police Cyber Crime Investigation Protocol', bn: 'পুলিশ সাইবার ক্রাইম তদন্ত কার্যপদ্ধতি' };

const defaultVersionNote = {
  en: 'Official government portal (bdlaws.minlaw.gov.bd) audited and verified on 29 October 2026. A selected statutory excerpt; court interpretations, subordinate rules, and statutory exceptions may apply.',
  bn: 'বাংলাদেশ সরকারের অফিশিয়াল পোর্টাল (bdlaws.minlaw.gov.bd) থেকে ২৯ অক্টোবর ২০২৬ তারিখে যাচাইকৃত। এটি আইনি উদ্ধৃতি; আদালতের রায় ও উপ-বিধি সাপেক্ষে প্রযোজ্য হতে পারে।',
};

const cyberTransitionalNote = {
  en: 'Governing legislation as of 2026. Note on legislative history: The Cyber Security Act, 2023 was repealed by the Cyber Security Ordinance, 2025 and subsequently enacted with amendments as the Cyber Security Act, 2026. Provisions concerning digital identity fraud, unauthorized access, and hacking are governed by the 2026 Act, while offenses involving intimate blackmail and cheating remain concurrently actionable under the Pornography Control Act, 2012 (Section 8) and Penal Code, 1860 (Section 419).',
  bn: '২০২৬ সালের প্রযোজ্য মূল আইন। আইনগত ইতিহাস: সাইবার নিরাপত্তা আইন ২০২৩ অধ্যাদেশ ২০২৫ দ্বারা বাতিলপূর্বক সংশোধনীসহ সাইবার নিরাপত্তা আইন ২০২৬ হিসেবে প্রতিস্থাপিত হয়েছে। পরিচিতি জালিয়াতি, হ্যাকিং ও অনধিকার প্রবেশের ক্ষেত্রে ২০২৬ সালের বিধান প্রযোজ্য, এবং অন্তরঙ্গ ছবির ব্ল্যাকমেইল ও প্রতারণায় পর্নোগ্রাফি নিয়ন্ত্রণ আইন ২০১২ (ধারা ৮) ও দণ্ডবিধি ১৮৬০ (ধারা ৪১৯) পূর্ণ কার্যকর রয়েছে।',
};

type Entry = Omit<Provision, 'checkedOn' | 'versionNote'> & { versionNote?: Provision['versionNote'] };
const entry = (value: Entry): Provision => ({ checkedOn: '2026-10-29', versionNote: defaultVersionNote, ...value });

export const provisions: Provision[] = [
  // =========================================================================
  // CATEGORY 1: EMPLOYMENT & LABOR RIGHTS (17 Provisions)
  // =========================================================================
  entry({
    id: 'labour-5',
    category: 'work',
    act: labour,
    section: 'Section 5',
    title: { en: 'Mandatory appointment letter and photo ID', bn: 'নিয়োগপত্র ও পরিচয়পত্র প্রাপ্তির অধিকার' },
    quote: 'কোন মালিক কোন শ্রমিককে নিয়োগপত্র এবং ছবিসহ পরিচয়পত্র প্রদান না করিয়া নিয়োগ করিতে পারিবেন না।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-29733.html',
    explanation: {
      en: 'Section 5 mandates that every employer must provide each worker with a formal written appointment letter and a photo identity card before or at the time of employment.',
      bn: 'শ্রম আইনের ৫ ধারা অনুযায়ী কোনো মালিক নিয়োগপত্র এবং ছবিসহ পরিচয়পত্র প্রদান না করে কোনো শ্রমিককে কাজে নিয়োগ করতে পারবেন না। এটি শ্রমিকের আইনি অধিকার।'
    },
    caution: {
      en: 'Always demand and preserve your physical appointment letter and employee ID card; they serve as primary evidence in the Labour Court.',
      bn: 'নিয়োগপত্র ও পরিচয়পত্র নিরাপদে সংরক্ষণ করুন; বকেয়া বেতন বা অন্যান্য দাবিতে লেবার কোর্ট বা কলকারখানা অধিদপ্তরে এটিই প্রধান প্রমাণ হিসেবে কাজ করে।'
    },
    keywords: ['appointment letter', 'job card', 'id card', 'niyogpotro', 'porichoypotro', 'নিয়োগপত্র', 'আইডি কার্ড', 'শ্রম আইন ৫', 'চাকরির প্রমাণ']
  }),
  entry({
    id: 'labour-26',
    category: 'work',
    act: labour,
    section: 'Section 26',
    title: { en: 'Termination of employment by employer & compensation', bn: 'মালিক কর্তৃক চাকরি অবসান ও ক্ষতিপূরণ' },
    quote: 'মালিক কর্তৃক কোনো স্থায়ী শ্রমিককে চাকরি হইতে অবসর বা অবসান করিতে হইলে ১২০ দিনের লিখিত নোটিশ অথবা ১২০ দিনের নোটিশের পরিবর্তে মজুরি প্রদান করিতে হইবে এবং প্রতি পূর্ণ বৎসর চাকরির জন্য ৩০ দিনের মজুরি ক্ষতিপূরণ দিতে হইবে।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-29754.html',
    explanation: {
      en: 'Permanent workers terminated without misconduct charges are entitled to 120 days notice (or wages in lieu) plus 30 days wages for every completed year of service.',
      bn: 'অসদাচরণের অভিযোগ ছাড়া স্থায়ী শ্রমিককে চাকরিচ্যুত করতে হলে মালিককে ১২০ দিনের লিখিত নোটিশ বা তার সমপরিমাণ মজুরি এবং প্রতি পূর্ণ বছরের চাকরির জন্য ৩০ দিনের মজুরি ক্ষতিপূরণ দিতে হবে।'
    },
    caution: {
      en: 'Termination dues must be paid within 30 working days from the date of termination.',
      bn: 'চাকরি অবসানের যাবতীয় পাওনা চাকরি অবসানের তারিখ থেকে ৩০ কার্যদিবসের মধ্যে পরিশোধ করতে হবে।'
    },
    keywords: ['termination', 'fired', 'severance', 'chhakurichyuti', 'chhattai', 'চাকরিচ্যুতি', 'ছাঁটাই', 'নোটিশ পে', 'চাকরি থেকে অব্যাহতি']
  }),
  entry({
    id: 'labour-27',
    category: 'work',
    act: labour,
    section: 'Section 27',
    title: { en: 'Resignation by worker and service compensation', bn: 'শ্রমিক কর্তৃক পদত্যাগ ও সার্ভিস বেনিফিট' },
    quote: 'কোনো স্থায়ী শ্রমিক মালিককে ৬০ দিনের লিখিত নোটিশ প্রদান করিয়া চাকরি হইতে পদত্যাগ করিতে পারিবেন এবং ৫ বছর বা তদূর্ধ্ব চাকরির ক্ষেত্রে প্রতি বৎসরের জন্য ১৪ দিনের মজুরি পাইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-29755.html',
    explanation: {
      en: 'A permanent worker may resign by giving 60 days written notice. Workers with 5 or more continuous years of service are entitled to 14 days wages for each completed year.',
      bn: 'স্থায়ী শ্রমিক ৬০ দিনের লিখিত নোটিশ দিয়ে পদত্যাগ করতে পারবেন। ৫ বছর বা তার বেশি চাকরি করলে প্রতি পূর্ণ বছরের জন্য ১৪ দিনের মজুরি সার্ভিস বেনিফিট পাওয়ার অধিকারী।'
    },
    caution: {
      en: 'Retain a stamped copy of your resignation letter with the receiving signature of HR or management.',
      bn: 'পদত্যাগপত্রের রিসিভড কপি বা ডাক রসিদ প্রমাণ হিসেবে সংরক্ষণ করুন।'
    },
    keywords: ['resignation', 'service benefit', 'podotyag', 'পদত্যাগ', 'সার্ভিস বেনিফিট', 'চাকরি ছাড়া', 'ইস্তফাপত্র']
  }),
  entry({
    id: 'labour-33',
    category: 'work',
    act: labour,
    section: 'Section 33',
    title: { en: 'Grievance procedure for individual workers', bn: 'ব্যক্তিগত শ্রমিকের অভিযোগ পেশ ও নিষ্পত্তির নিয়ম' },
    quote: 'কোনো শ্রমিক তাঁহার ব্যক্তিগত অভিযোগের বিষয়ে কারণ উদ্ভব হইবার ৩০ দিনের মধ্যে মালিকের নিকট লিখিতভাবে অভিযোগ পেশ করিবেন। মালিক ১৫ দিনের মধ্যে নিষ্পত্তি না করিলে শ্রমিক কলকারখানা পরিদর্শক বা শ্রম আদালতে মামলা করিতে পারিবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-29761.html',
    explanation: {
      en: 'Section 33 establishes the statutory grievance mechanism: worker must submit written complaint within 30 days; employer has 15 days to decide. If unsettled, worker can file complaint with DIFE or Labour Court.',
      bn: 'শ্রমিককে ঘটনার ৩০ দিনের মধ্যে মালিকের কাছে লিখিত অভিযোগ দিতে হবে। মালিক ১৫ দিনের মধ্যে ব্যবস্থা না নিলে বা অসন্তুষ্ট হলে শ্রমিক ৩০ দিনের মধ্যে শ্রম আদালতে অভিযোগ দায়ের করতে পারেন।'
    },
    caution: {
      en: 'The 30-day timeline to submit written complaint to employer is strictly enforced in Labour Court.',
      bn: 'মালিককে লিখিত নোটিশ দেওয়ার ৩০ দিনের সময়সীমা শ্রম আদালতে অত্যন্ত গুরুত্বপূর্ণ।'
    },
    keywords: ['grievance procedure', 'labour dispute', 'dife', 'shrom adalat', 'অভিযোগ পেশ', 'শ্রম আদালত', 'লেবার কোর্ট', 'কলকারখানা পরিদর্শন']
  }),
  entry({
    id: 'labour-34',
    category: 'work',
    act: labour,
    section: 'Section 34',
    title: { en: 'Prohibition of child labor and hazardous work', bn: 'শিশুশ্রম সম্পূর্ণ নিষিদ্ধ ও ঝুঁকিপূর্ণ কাজ' },
    quote: 'কোনো প্রতিষ্ঠানে কোনো শিশুকে কোনো কাজে নিয়োগ করা যাইবে না বা কাজ করিতে দেওয়া যাইবে না।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-29762.html',
    explanation: {
      en: 'Employment of children under 14 is strictly prohibited. Adolescents (aged 14 to 18) may only work in non-hazardous occupations under registered medical fitness certification and maximum 5 hours per day.',
      bn: '১৪ বছরের কম বয়সী কোনো শিশুকে কোনো প্রতিষ্ঠানে নিয়োগ করা সম্পূর্ণ বেআইনি। ১৪ থেকে ১৮ বছর বয়সী কিশোরদের ঝুঁকিপূর্ণ কাজে নিয়োগ নিষিদ্ধ এবং দৈনিক সর্বোচ্চ ৫ ঘণ্টার বেশি কাজ করানো যাবে না।'
    },
    caution: {
      en: 'Employing child labor is a cognizable criminal offense for employers with fines and imprisonment.',
      bn: 'শিশু নিয়োগকারী মালিকের বিরুদ্ধে শ্রম আদালতে ফৌজদারি মামলা ও অর্থদণ্ড হতে পারে।'
    },
    keywords: ['child labor', 'under 14', 'hazardous work', 'shishu shrom', 'শিশুশ্রম', 'কিশোর শ্রমিক', 'ঝুঁকিপূর্ণ কাজ', 'শিশু সুরক্ষা']
  }),
  entry({
    id: 'labour-46',
    category: 'work',
    act: labour,
    section: 'Section 46',
    title: { en: 'Maternity benefit and 16 weeks paid leave', bn: 'প্রসূতি কল্যাণ সুবিধা ও ১৬ সপ্তাহের সবেতন ছুটি' },
    quote: 'কোন মহিলা তাঁহার সন্তান প্রসবের সম্ভাব্য তারিখের পূর্ববর্তী ৮ (আট) সপ্তাহ এবং সন্তান প্রসবের পরবর্তী ৮ (আট) সপ্তাহের জন্য প্রসূতি কল্যাণ সুবিধা পাইবার হকদার হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-29774.html',
    explanation: {
      en: 'Female workers with at least 6 months service are entitled to 16 weeks paid maternity leave (8 weeks pre-delivery and 8 weeks post-delivery) at average daily wages. Dismissing a woman on maternity grounds is illegal.',
      bn: 'কোনো প্রতিষ্ঠানে কমপক্ষে ৬ মাস কর্মরত নারী কর্মী প্রসবের পূর্বে ৮ সপ্তাহ এবং প্রসবের পরে ৮ সপ্তাহ মিলিয়ে মোট ১৬ সপ্তাহের পূর্ণ সবেতন মাতৃত্বকালীন ছুটি পাওয়ার অধিকারী। মাতৃত্বকালীন সময়ে কোনো কর্মীকে বরখাস্ত করা নিষিদ্ধ।'
    },
    caution: {
      en: 'Written notice with medical doctor certificate should be submitted to the employer before proceeding on leave.',
      bn: 'প্রসবের সম্ভাব্য তারিখ উল্লেখ করে রেজিস্ট্রার্ড চিকিৎসকের প্রত্যয়নপত্রসহ মালিককে লিখিত নোটিশ প্রদান করুন।'
    },
    keywords: ['maternity leave', 'pregnancy benefit', 'matritto chuti', 'proshuti kallyan', 'মাতৃত্বকালীন ছুটি', 'প্রসূতি ছুটি', 'গর্ভবতী কর্মী', 'নারী শ্রমিকের অধিকার']
  }),
  entry({
    id: 'labour-99',
    category: 'work',
    act: labour,
    section: 'Section 99',
    title: { en: 'Mandatory weekly holiday with full pay', bn: 'বাধ্যতামূলক সাপ্তাহিক ছুটি ও বিশ্রাম' },
    quote: 'প্রত্যেক প্রাপ্তবয়স্ক শ্রমিককে কোনো প্রতিষ্ঠানে প্রতি সপ্তাহে এক দিন পূর্ণ ছুটি মঞ্জুর করিতে হইবে এবং দোকান বা বাণিজ্যে দেড় দিন ছুটি দিতে হইবে।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-29831.html',
    explanation: {
      en: 'Every adult worker is legally entitled to at least one full day off per week (24 consecutive hours) with full pay. For shops and commercial establishments, 1.5 days off per week is mandatory.',
      bn: 'প্রত্যেক শ্রমিক সপ্তাহে অন্তত ১ দিন পূর্ণ বিশ্রাম বা ছুটি পাওয়ার অধিকারী। দোকান ও বাণিজ্যিক প্রতিষ্ঠানে সপ্তাহে দেড় দিন ছুটি বাধ্যতামূলক। ছুটির দিনে কাজ করালে সমপরিমাণ বিকল্প ছুটি দিতে হবে।'
    },
    caution: {
      en: 'Compelling continuous 7-day labor without weekly off is a violation actionable before DIFE inspectors.',
      bn: 'সাপ্তাহিক ছুটি ছাড়া একটানা কাজ করানো শ্রম আইনের লঙ্ঘন এবং এর বিরুদ্ধে কলকারখানা পরিদর্শকের নিকট অভিযোগ করা যায়।'
    },
    keywords: ['weekly holiday', 'day off', 'saptahik chuti', 'সাপ্তাহিক ছুটি', 'ছুটির দিন', 'বিশ্রামের অধিকার', 'অতিরিক্ত খাটানো']
  }),
  entry({
    id: 'labour-100',
    category: 'work',
    act: labour,
    section: 'Section 100',
    title: { en: 'Daily working hours limit (8 hours per day)', bn: 'দৈনিক কাজের সর্বোচ্চ সীমা (৮ ঘণ্টা)' },
    quote: 'কোনো প্রতিষ্ঠানে কোনো প্রাপ্তবয়স্ক শ্রমিককে সাধারণতঃ দৈনিক ৮ (আট) ঘণ্টার অধিক কাজ করিতে বাধ্য করা যাইবে না।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-29832.html',
    explanation: {
      en: 'Section 100 sets standard daily working hours at a maximum of 8 hours per day, and 48 hours per week. Any work beyond this must be recorded and paid as overtime.',
      bn: 'প্রাপ্তবয়স্ক শ্রমিকের সাধারণ কর্মঘণ্টা দৈনিক সর্বোচ্চ ৮ ঘণ্টা এবং সপ্তাহে ৪৮ ঘণ্টা। এর অতিরিক্ত যেকোনো কাজ ওভারটাইম হিসেবে গণ্য হবে।'
    },
    caution: {
      en: 'Daily hours including overtime cannot exceed 10 hours in a day and 60 hours in a week.',
      bn: 'ওভারটাইমসহ দৈনিক সর্বোচ্চ কর্মঘণ্টা ১০ ঘণ্টা এবং সপ্তাহে ৬০ ঘণ্টার বেশি হওয়া নিষিদ্ধ।'
    },
    keywords: ['working hours', '8 hours limit', 'kormoghonta', 'কর্মঘণ্টা', 'দৈনিক ৮ ঘণ্টা', 'কাজের সময়সীমা']
  }),
  entry({
    id: 'labour-108',
    category: 'work',
    act: labour,
    section: 'Section 108(1)–(2)',
    title: { en: 'Pay for overtime work at double ordinary rate', bn: 'দ্বিগুণ হারে ওভারটাইম মজুরি' },
    quote: 'কোন শ্রমিক কোনো দিনে বা সপ্তাহে নির্দিষ্ট ঘণ্টার অতিরিক্ত কাজ করিলে, অতিরিক্ত কাজের জন্য তাঁহার মূল মজুরি ও মহার্ঘ ভাতার সাধারণ হারের দ্বিগুণ হারে ওভারটাইম মজুরি পাইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-29840.html',
    explanation: {
      en: 'Section 108 entitles workers who work beyond 8 hours a day or 48 hours a week to overtime wages paid at exactly double their ordinary basic wage rate plus dearness allowance.',
      bn: 'দৈনিক ৮ ঘণ্টার অতিরিক্ত কাজের জন্য শ্রমিক তার সাধারণ মূল মজুরি ও মহার্ঘ ভাতার দ্বিগুণ (২ গুণ) হারে ওভারটাইম মজুরি পাওয়ার অধিকারী।'
    },
    caution: {
      en: 'Maintain written or digital punch-in/out records or punch cards as evidence of overtime hours worked.',
      bn: 'পাঞ্চ কার্ড, হাজিরা খাতা বা ডিজিটাল ফিঙ্গারপ্রিন্ট রেকর্ডের প্রমাণ সংরক্ষণ করুন।'
    },
    keywords: ['overtime', 'double rate', 'ot payment', 'ওভারটাইম', 'দ্বিগুণ মজুরি', 'অতিরিক্ত কাজের টাকা']
  }),
  entry({
    id: 'labour-115',
    category: 'work',
    act: labour,
    section: 'Section 115',
    title: { en: 'Casual leave entitlement (10 days with full wages)', bn: 'নৈমিত্তিক ছুটি (১০ দিন সবেতন)' },
    quote: 'প্রত্যেক শ্রমিক প্রতি পঞ্জিকা বৎসরে পূর্ণ মজুরীতে ১০ (দশ) দিনের নৈমিত্তিক ছুটি পাইবার অধিকারী হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-29847.html',
    explanation: {
      en: 'Every worker is entitled to 10 days of paid casual leave in each calendar year to attend to sudden personal or emergency affairs.',
      bn: 'আকস্মিক ব্যক্তিগত বা পারিবারিক প্রয়োজনে প্রত্যেক শ্রমিক প্রতি ক্যালেন্ডার বছরে পূর্ণ বেতনে ১০ দিনের নৈমিত্তিক ছুটি পাওয়ার আইনি অধিকারী।'
    },
    caution: {
      en: 'Casual leave cannot ordinarily be carried forward into the next calendar year.',
      bn: 'নৈমিত্তিক ছুটি সাধারণত পরবর্তী বছরের জন্য জমা রাখা যায় না।'
    },
    keywords: ['casual leave', 'emergency leave', '10 days leave', 'noimittik chuti', 'নৈমিত্তিক ছুটি', 'জরুরি ছুটি', 'ছুটির পাওনা']
  }),
  entry({
    id: 'labour-116',
    category: 'work',
    act: labour,
    section: 'Section 116',
    title: { en: 'Sick leave with full wages (14 days)', bn: 'চিকিৎসাজনিত অসুস্থতার ছুটি (১৪ দিন সবেতন)' },
    quote: 'প্রত্যেক শ্রমিক প্রতি পঞ্জিকা বৎসরে পূর্ণ মজুরীতে ১৪ (চৌদ্দ) দিনের পীড়া ছুটি পাইবার অধিকারী হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-29848.html',
    explanation: {
      en: 'Section 116 grants every worker 14 days of paid sick leave annually upon submitting a medical certificate from a registered medical practitioner.',
      bn: 'রেজিস্ট্রার্ড চিকিৎসকের প্রেসক্রিপশন বা প্রত্যয়নপত্র জমা সাপেক্ষে শ্রমিক প্রতি বছর পূর্ণ বেতনে ১৪ দিনের অসুস্থতার ছুটি পাবেন।'
    },
    caution: {
      en: 'Employer cannot deduct wages for certified sick leave within the 14-day statutory limit.',
      bn: '১৪ দিনের সীমার মধ্যে অনুমোদিত অসুস্থতার ছুটির জন্য মালিক বেতন কাটতে পারবেন না।'
    },
    keywords: ['sick leave', 'medical leave', 'pira chuti', 'অসুস্থতার ছুটি', 'মেডিকেল ছুটি', 'চিকিৎসা ছুটি', 'বেতন কর্তন নিষেধ']
  }),
  entry({
    id: 'labour-117',
    category: 'work',
    act: labour,
    section: 'Section 117',
    title: { en: 'Annual earned leave with wages & encashment', bn: 'বার্ষিক অর্জিত ছুটি ও ছুটির টাকা নগদায়ন' },
    quote: 'প্রত্যেক প্রাপ্তবয়স্ক শ্রমিক কোনো প্রতিষ্ঠানে পূর্ববর্তী ১২ মাস অবিচ্ছিন্নভাবে কাজ করিলে প্রতি ১৮ দিন কাজের জন্য ১ দিন সবেতন বার্ষিক ছুটি পাইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-29849.html',
    explanation: {
      en: 'Workers who complete 12 continuous months of service earn 1 day of paid annual leave for every 18 working days. Unavailed leave can be accumulated or encashed at the time of leaving employment.',
      bn: 'কোনো প্রতিষ্ঠানে ১২ মাস নিরবচ্ছিন্ন কাজের পর প্রতি ১৮ দিন কাজের জন্য ১ দিন অর্জিত ছুটি প্রাপ্য হয়। অব্যবহৃত ছুটি জমা থাকে এবং চাকরি ছাড়ার সময় তা নগদায়নযোগ্য।'
    },
    caution: {
      en: 'Factory workers can accumulate up to 40 days, commercial workers up to 60 days of annual leave.',
      bn: 'কারখানা শ্রমিক সর্বোচ্চ ৪০ দিন এবং বাণিজ্যিক শ্রমিক সর্বোচ্চ ৬০ দিন অর্জিত ছুটি জমা রাখতে পারেন।'
    },
    keywords: ['annual leave', 'earned leave', 'leave encashment', 'orjito chuti', 'বার্ষিক ছুটি', 'অর্জিত ছুটি', 'ছুটির টাকা নগদায়ন']
  }),
  entry({
    id: 'labour-123',
    category: 'work',
    act: labour,
    section: 'Section 123',
    title: { en: 'Mandatory deadline for payment of wages (within 7/10 days)', bn: 'মজুরি পরিশোধের আইনগত সময়সীমা (৭/১০ দিনের মধ্যে)' },
    quote: 'মজুরি মেয়াদ শেষ হইবার পরবর্তী ৭ কার্যদিবসের মধ্যে এবং ১০০০-এর অধিক শ্রমিক থাকিলে ১০ কার্যদিবসের মধ্যে শ্রমিকের মজুরি পরিশোধ করিতে হইবে।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-29855.html',
    explanation: {
      en: 'Section 123 imposes a strict statutory deadline: wages must be paid within 7 working days after the wage period ends (10 working days if the establishment has 1,000+ workers).',
      bn: 'মজুরি মেয়াদের পরবর্তী ৭ কার্যদিবসের মধ্যে (১০০০-এর বেশি শ্রমিক থাকলে ১০ দিনের মধ্যে) মালিককে বকেয়া মজুরি পরিশোধ করতে হবে। বিলম্ব করা শ্রম আইনের সুস্পষ্ট লঙ্ঘন।'
    },
    caution: {
      en: 'Delay beyond statutory period allows workers to file a formal complaint to the DIFE Inspector or Labour Court.',
      bn: 'নির্দিষ্ট সময়ের মধ্যে মজুরি না দিলে কলকারখানা অধিদপ্তর বা শ্রম আদালতে অভিযোগ দায়ের করা যায়।'
    },
    keywords: ['unpaid wages', 'delayed salary', 'wage deadline', 'beton baki', 'বকেয়া বেতন', 'মজুরি পরিশোধের সময়', 'বেতন না দেওয়া']
  }),
  entry({
    id: 'labour-124a',
    category: 'work',
    act: labour,
    section: 'Section 124A',
    title: { en: 'Conciliation for unpaid wages and dues by DIFE', bn: 'মজুরি ও পাওনার বিরোধে কলকারখানা পরিদর্শকের মধ্যস্থতা' },
    quote: 'মজুরি বা চাকরির অবসানজনিত পাওনা পরিশোধে বিরোধ দেখা দিলে সরকার কর্তৃক নিযুক্ত মধ্যস্থতাকারী (DIFE) উভয় পক্ষকে ডাকিয়া বিরোধ নিষ্পত্তির উদ্যোগ গ্রহণ করিবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-29857.html',
    explanation: {
      en: 'Section 124A enables government labor officers (DIFE) to conciliate disputes regarding unpaid wages or dues, summoning employers for speedy amicable settlement without initial court litigation.',
      bn: 'বকেয়া বেতন বা সার্ভিস বেনিফিট নিয়ে বিরোধ দেখা দিলে কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর (DIFE) উভয় পক্ষকে ডেকে বাধ্যতামূলক মধ্যস্থতার মাধ্যমে দ্রুত পাওনা আদায়ের উদ্যোগ নেয়।'
    },
    caution: {
      en: 'DIFE conciliation is free of cost and can be triggered by filing a written application or calling hotline 16104.',
      bn: 'DIFE-তে অভিযোগ পেশ সম্পূর্ণ বিনামূল্যে এবং হেল্পলাইন ১৬১০৪-এ ফোন করে পরামর্শ নেওয়া যায়।'
    },
    keywords: ['dife conciliation', 'labor conciliation', '16104 hotline', 'কলকারখানা পরিদর্শন', '১৬১০৪', 'মধ্যস্থতা', 'বকেয়া পাওনা আদায়']
  }),
  entry({
    id: 'labour-132',
    category: 'work',
    act: labour,
    section: 'Section 132(1)–(2)',
    title: { en: 'Labour Court claim for unpaid or unlawfully deducted wages', bn: 'শ্রম আদালতে বকেয়া মজুরির মামলা ও ক্ষতিপূরণ' },
    quote: 'যদি কোনো শ্রমিকের মজুরি পরিশোধে বিলম্ব করা হয় বা বেআইনিভাবে কর্তন করা হয়, তবে তিনি ৬ মাসের মধ্যে শ্রম আদালতের নিকট ক্ষতিপূরণসহ পাওনার জন্য দরখাস্ত করিতে পারিবেন। আদালত সর্বোচ্চ ২৫% বা দশগুণ ক্ষতিপূরণ মঞ্জুর করিতে পারেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-29865.html',
    explanation: {
      en: 'Under Section 132, a worker can apply to the Labour Court within 6 months of unpaid or deducted wages. The court can order full payment plus compensation up to 25% of wages or 10 times the deducted amount.',
      bn: 'বকেয়া বা বেআইনিভাবে কেটে রাখা বেতনের বিরুদ্ধে ঘটনার ৬ মাসের মধ্যে শ্রম আদালতে আবেদন করা যায়। আদালত মূল পাওনাসহ অতিরিক্ত ক্ষতিপূরণ দেওয়ার নির্দেশ দিতে পারেন।'
    },
    caution: {
      en: 'The application must be filed within 6 months from the date wages became due.',
      bn: 'মজুরি বকেয়া হওয়ার ৬ মাসের মধ্যে আদালতে আবেদন জমা দিতে হবে।'
    },
    keywords: ['labour court claim', 'deducted wages', '6 months deadline', 'শ্রম আদালত মামলা', 'বকেয়া বেতন মামলা', 'বেতন কর্তন']
  }),
  entry({
    id: 'labour-148',
    category: 'work',
    act: labour,
    section: 'Section 148',
    title: { en: 'Minimum wage compliance & criminal penalty for underpayment', bn: 'ন্যূনতম মজুরি প্রদান ও কম মজুরি দেওয়ার শাস্তি' },
    quote: 'সরকার কর্তৃক ঘোষিত ন্যূনতম মজুরির হারের চেয়ে কম হারে কোনো শ্রমিককে মজুরি দেওয়া যাইবে না; কম দিলে তা দণ্ডনীয় অপরাধ এবং ১ বৎসর পর্যন্ত কারাদণ্ডে দণ্ডনীয় হইবে।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-29881.html',
    explanation: {
      en: 'Employers in sectors governed by Minimum Wage Board gazettes (e.g. RMG, transport, tannery) cannot pay less than the gazetted minimum wage. Paying less is punishable with up to 1 year imprisonment or fines.',
      bn: 'সরকার কর্তৃক ঘোষিত ন্যূনতম মজুরির চেয়ে কম বেতন দেওয়া ফৌজদারি অপরাধ। কোনো মালিক গেজেটকৃত মজুরির চেয়ে কম দিলে ১ বছর পর্যন্ত কারাদণ্ড বা অর্থদণ্ডে দণ্ডিত হতে পারেন।'
    },
    caution: {
      en: 'Workers underpaying complaints can be submitted directly to DIFE minimum wage enforcement cell.',
      bn: 'কম মজুরি পাওয়ার বিষয়ে কলকারখানা অধিদপ্তরের ন্যূনতম মজুরি পর্যবেক্ষণ সেলে অভিযোগ করা যায়।'
    },
    keywords: ['minimum wage', 'gazetted salary', 'rmg wages', 'nyunotomo mojuri', 'ন্যূনতম মজুরি', 'কম বেতন', 'গেজেট বেতন']
  }),
  entry({
    id: 'labour-150',
    category: 'work',
    act: labour,
    section: 'Section 150',
    title: { en: 'Compensation for injury or death during employment', bn: 'কর্মকালীন দুর্ঘটনায় অঙ্গহানি বা মৃত্যুতে ক্ষতিপূরণ' },
    quote: 'কর্মকালীন সময়ে কোনো দুর্ঘটনার ফলে যদি কোনো শ্রমিকের ব্যক্তিগত আঘাত বা অঙ্গহানি ঘটে অথবা মৃত্যু হয়, তবে নিয়োগকারী মালিক ক্ষতিপূরণ দিতে বাধ্য থাকিবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-957/section-29883.html',
    explanation: {
      en: 'Section 150 holds employers strictly liable to pay statutory compensation (under Schedule V) for injuries, permanent disabilities, or death suffered by workers arising out of and in the course of employment.',
      bn: 'কর্মক্ষেত্রে কাজ করার সময় দুর্ঘটনায় শ্রমিকের আঘাত, অঙ্গহানি বা মৃত্যু ঘটলে মালিক শ্রম আইনের ৫ম তফসিল অনুযায়ী নির্ধারিত ক্ষতিপূরণ ও চিকিৎসার খরচ প্রদান করতে আইনত বাধ্য।'
    },
    caution: {
      en: 'Claims must be filed before the Commissioner for Workers’ Compensation within 2 years of the accident.',
      bn: 'দুর্ঘটনার ২ বছরের মধ্যে ক্ষতিপূরণ কমিশনারের আদালতে ক্ষতিপূরণ দাবি দাখিল করতে হয়।'
    },
    keywords: ['workplace injury', 'worker compensation', 'fatal accident', 'durghotona khotipuron', 'দুর্ঘটনা ক্ষতিপূরণ', 'কর্মক্ষেত্রে মৃত্যু', 'অঙ্গহানি ক্ষতিপূরণ']
  }),

  // =========================================================================
  // CATEGORY 2: THREATS, HARASSMENT & GENERAL DIARY (GD) (10 Provisions)
  // =========================================================================
  entry({
    id: 'penal-323',
    category: 'threats',
    act: penal,
    section: 'Section 323',
    title: { en: 'Punishment for voluntarily causing hurt (Assault / Beating)', bn: 'সাধারণ মারধর বা শারীরিক জখমের শাস্তি' },
    quote: 'Whoever... voluntarily causes hurt, shall be punished with imprisonment... which may extend to one year, or with fine... which may extend to one thousand taka, or with both.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3051.html',
    explanation: {
      en: 'Section 323 punishes intentional physical beating or causing pain/hurt with up to 1 year imprisonment or 1,000 taka fine. It applies to everyday street assaults, domestic battery, or neighbor fights.',
      bn: 'ইচ্ছাকৃতভাবে কাউকে আঘাত করা, মারধর করা বা শারীরিক যন্ত্রণা দেওয়া দণ্ডবিধির ৩২৩ ধারায় শাস্তিযোগ্য অপরাধ। এতে ১ বছর পর্যন্ত কারাদণ্ড বা ১,০০০ টাকা অর্থদণ্ড হতে পারে।'
    },
    caution: {
      en: 'Immediately seek treatment at a government hospital and preserve the official medical injury report as primary evidence for filing an FIR.',
      bn: 'ঘটনার পরপরই সরকারি হাসপাতালে চিকিৎসা নিন এবং চিকিৎসকের ইনজুরি রিপোর্ট বা সার্টিফিকেট সংগ্রহ করুন; এটিই মামলার প্রধান প্রমাণ।'
    },
    keywords: ['assault', 'beating', 'physical attack', 'mardhor', 'jokhom', 'মারধর', 'আঘাতের শাস্তি', 'শারীরিক নির্যাতন', 'হাসপাতাল ইনজুরি রিপোর্ট']
  }),
  entry({
    id: 'penal-341',
    category: 'threats',
    act: penal,
    section: 'Section 341',
    title: { en: 'Punishment for wrongful restraint (Blocking passage / road)', bn: 'চলাচলের পথ আটকে রাখা বা বেআইনি বাধার শাস্তি' },
    quote: 'Whoever wrongfully restrains any person shall be punished with simple imprisonment... which may extend to one month, or with fine... or with both.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3069.html',
    explanation: {
      en: 'Wrongfully obstructing any person so as to prevent them from proceeding in any direction in which they have a legal right to go is an offense under Section 341.',
      bn: 'কোনো ব্যক্তিকে তার চলাচলের আইনগত অধিকার আছে এমন কোনো পথে যেতে বাধা দেওয়া বা পথ অবরুদ্ধ করে রাখা দণ্ডবিধির ৩৪১ ধারায় শাস্তিযোগ্য অপরাধ।'
    },
    caution: {
      en: 'If a path or house entry is blocked by force, call 999 immediately for police assistance.',
      bn: 'রাস্তা বা বাড়ির প্রবেশদ্বার জোরপূর্বক বন্ধ করে অবরুদ্ধ করলে জরুরি সেবা ৯৯৯-এ ফোন দিয়ে পুলিশি সহায়তা নিন।'
    },
    keywords: ['wrongful restraint', 'blocking road', 'confined', 'poth rodh', 'পথ আটকানো', 'চলাচলে বাধা', 'অবরুদ্ধ করা']
  }),
  entry({
    id: 'penal-384',
    category: 'threats',
    act: penal,
    section: 'Section 384',
    title: { en: 'Punishment for extortion (Demanding money under threat)', bn: 'ভয় দেখিয়ে চাঁদা দাবি বা চাঁদাবাজির শাস্তি' },
    quote: 'Whoever commits extortion shall be punished with imprisonment... which may extend to three years, or with fine, or with both.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3112.html',
    explanation: {
      en: 'Extortion under Section 383/384 occurs when someone intentionally puts a person in fear of injury and dishonestly induces them to deliver money, property, or valuable security. Punishable by up to 3 years imprisonment.',
      bn: 'ক্ষতিসাধনের ভয় দেখিয়ে চাঁদা দাবি করা বা জোরপূর্বক অর্থ আদায় করা (চাঁদাবাজি) দণ্ডবিধির ৩৮৪ ধারা অনুযায়ী ৩ বছর পর্যন্ত কারাদণ্ডযোগ্য অপরাধ।'
    },
    caution: {
      en: 'Preserve call recordings, SMS, or written chada slips; do not pay extortion money without alerting the police.',
      bn: 'কল রেকর্ড, মেসেজ বা চাঁদার স্লিপ সংরক্ষণ করুন এবং নিকটস্থ থানায় দ্রুত এজাহার দাখিল করুন।'
    },
    keywords: ['extortion', 'blackmail money', 'chada dabi', 'chadabaji', 'চাঁদাবাজি', 'চাঁদা দাবি', 'ভয় দেখিয়ে টাকা আদায়', 'হুমকি']
  }),
  entry({
    id: 'penal-427',
    category: 'threats',
    act: penal,
    section: 'Section 427',
    title: { en: 'Mischief causing damage to property or belongings', bn: 'সম্পত্তি বিনষ্ট বা ভাঙচুর করার শাস্তি' },
    quote: 'Whoever commits mischief and thereby causes loss or damage to the amount of fifty taka or upwards, shall be punished with imprisonment... which may extend to two years...',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3155.html',
    explanation: {
      en: 'Intentionally destroying or damaging someone’s property, household goods, vehicle, or boundary causing loss of 50 taka or more is an offense under Section 427 punishable by up to 2 years imprisonment.',
      bn: 'ইচ্ছাকৃতভাবে কারো বাড়িঘর, যানবাহন বা সম্পত্তির ভাঙচুর ও ক্ষতিসাধন করা দণ্ডবিধির ৪২৭ ধারা অনুযায়ী ২ বছর পর্যন্ত কারাদণ্ডে দণ্ডনীয় অপরাধ।'
    },
    caution: {
      en: 'Photograph the damaged property immediately from multiple angles and keep purchase receipts of damaged items.',
      bn: 'ভাঙচুরকৃত মালামালের ছবি ও ভিডিও তুলে রাখুন এবং ক্রয়ের রসিদ থাকলে তা সংযুক্ত করুন।'
    },
    keywords: ['property damage', 'vandalism', 'bhangchur', 'bhangur', 'ভাঙচুর', 'সম্পত্তি নষ্ট', 'দেয়াল ভাঙা', 'গাড়ি ভাঙচুর']
  }),
  entry({
    id: 'penal-447',
    category: 'threats',
    act: penal,
    section: 'Section 447',
    title: { en: 'Punishment for criminal trespass into land or premises', bn: 'বেআইনি অনধিকার প্রবেশের শাস্তি' },
    quote: 'Whoever commits criminal trespass shall be punished with imprisonment... which may extend to three months, or with fine... or with both.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3175.html',
    explanation: {
      en: 'Entering into or upon property in the possession of another with intent to commit an offense, intimidate, insult, or annoy is Criminal Trespass under Section 441/447.',
      bn: 'কারো ঘরে, জমিতে বা সীমানার ভেতর বেআইনিভাবে প্রবেশ করে ভয়ভীতি প্রদর্শন বা অপমান করার চেষ্টা করা ফৌজদারি অপরাধ।'
    },
    caution: {
      en: 'If trespass is accompanied by threats of violence, it can be aggravated to house-trespass under Section 448/451.',
      bn: 'ঘরে জোরপূর্বক প্রবেশ করে হুমকি দিলে তা ৪৪৮ ধারায় গুরুতর অপরাধ হিসেবে গণ্য হবে।'
    },
    keywords: ['criminal trespass', 'illegal entry', 'onodhikar probesh', 'অনধিকার প্রবেশ', 'জোরপূর্বক প্রবেশ', 'সীমানা লংঘন']
  }),
  entry({
    id: 'penal-503',
    category: 'threats',
    act: penal,
    section: 'Section 503',
    title: { en: 'Criminal intimidation defined', bn: 'অপরাধমূলক ভীতি প্রদর্শন বা হুমকির সংজ্ঞা' },
    quote: 'Whoever threatens another with any injury to his person, reputation or property, or to the person or reputation of any one in whom that person is interested... commits criminal intimidation.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3231.html',
    explanation: {
      en: 'Section 503 defines criminal intimidation: threatening someone with injury to body, reputation, or property to compel them to do or omit an act.',
      bn: 'কারো দেহ, সুনাম বা সম্পত্তির ক্ষতি করার হুমকি দেওয়া দণ্ডবিধির ৫০৩ ধারায় অপরাধমূলক ভীতি প্রদর্শন।'
    },
    caution: {
      en: 'Preserve evidence such as SMS, voice messages, call recordings, or witness statements before filing a report.',
      bn: 'হুমকির প্রমাণ হিসেবে অডিও রেকর্ড, মেসেজ বা সাক্ষীদের বক্তব্য সংরক্ষণ করুন।'
    },
    keywords: ['threat', 'intimidation', 'humki', 'হুমকি', 'ভীতি প্রদর্শন', 'শারীরিক ক্ষতি করার হুমকি']
  }),
  entry({
    id: 'penal-506',
    category: 'threats',
    act: penal,
    section: 'Section 506',
    title: { en: 'Punishment for criminal intimidation (Up to 7 years for death threat)', bn: 'হুমকি ও অপরাধমূলক ভীতি প্রদর্শনের শাস্তি' },
    quote: 'Whoever commits the offence of criminal intimidation shall be punished with imprisonment... which may extend to two years; and if the threat be to cause death or grievous hurt... with imprisonment which may extend to seven years...',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3234.html',
    explanation: {
      en: 'General threats carry up to 2 years imprisonment. If the threat is to cause death, grievous bodily harm, or to destroy property by fire, the punishment increases up to 7 years imprisonment.',
      bn: 'সাধারণ হুমকির শাস্তি সর্বোচ্চ ২ বছরের কারাদণ্ড। তবে হত্যার হুমকি দিলে বা গুরুতর জখমের ভয় দেখালে সর্বোচ্চ ৭ বছর পর্যন্ত কারাদণ্ড হতে পারে।'
    },
    caution: {
      en: 'Death threats should be reported immediately to the Officer-in-Charge of the local police station with an urgent GD or FIR.',
      bn: 'হত্যার হুমকি পেলে অবিলম্বে থানায় জিডি বা এজাহার দায়ের করুন এবং জাতীয় জরুরি সেবা ৯৯৯-এ সহায়তা চান।'
    },
    keywords: ['death threat', 'punishment threat', 'hotyar humki', 'হত্যার হুমকি', 'মার্ডার হুমকি', 'দণ্ডবিধি ৫০৬']
  }),
  entry({
    id: 'penal-507',
    category: 'threats',
    act: penal,
    section: 'Section 507',
    title: { en: 'Criminal intimidation by anonymous communication', bn: 'পরিচয় গোপন বা বেনামে হুমকি প্রদানের শাস্তি' },
    quote: 'Whoever commits the offence of criminal intimidation by an anonymous communication, or having taken precaution to conceal the name or abode... shall be punished with imprisonment... which may extend to two years, in addition to the punishment provided... by the last preceding section.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3235.html',
    explanation: {
      en: 'Threatening someone anonymously (via unknown phone number, unaddressed letter, or secret identity) carries an additional 2 years imprisonment beyond the standard Section 506 penalty.',
      bn: 'পরিচয় গোপন করে বা বেনামে (অচেনা নম্বর, উড়ো চিঠি বা গোপন মাধ্যমে) হুমকি দিলে মূল শাস্তির অতিরিক্ত আরো ২ বছরের কারাদণ্ড প্রদান করা যায়।'
    },
    caution: {
      en: 'Do not delete the anonymous call logs or SMS; police cyber and tracking units require exact timestamps and sender details.',
      bn: 'অচেনা নম্বর বা বেনামি মেসেজ ডিলিট করবেন না; সময় ও তারিখসহ স্ক্রিনশট ও রেকর্ড সংরক্ষণ করুন।'
    },
    keywords: ['anonymous threat', 'unknown number', 'benami humki', 'বেনামে হুমকি', 'অচেনা নম্বর থেকে হুমকি', 'উড়ো চিঠি']
  }),
  entry({
    id: 'penal-509',
    category: 'threats',
    act: penal,
    section: 'Section 509',
    title: { en: 'Insulting the modesty of a woman (Eve-teasing & street harassment)', bn: 'নারীর শালীনতাহানি, ইভটিজিং ও হয়রানির শাস্তি' },
    quote: 'Whoever, intending to insult the modesty of any woman, utters any word, makes any sound or gesture, or exhibits any object... or intrudes upon the privacy of such woman, shall be punished with simple imprisonment... up to one year, or with fine, or with both.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3237.html',
    explanation: {
      en: 'Section 509 criminalizes street harassment, eve-teasing, obscene words, gestures, or stalking directed at insulting the modesty or privacy of a woman, punishable with up to 1 year imprisonment or fine.',
      bn: 'নারীর শালীনতাহানি, অশালীন মন্তব্য, ইঙ্গিত, ইভটিজিং বা হয়রানি দণ্ডবিধির ৫০৯ ধারা অনুযায়ী শাস্তিযোগ্য অপরাধ। এতে ১ বছর পর্যন্ত কারাদণ্ড বা অর্থদণ্ড হতে পারে।'
    },
    caution: {
      en: 'Immediate emergency police intervention can be requested via National Helpline 999 or 109.',
      bn: 'রাস্তায় বা কর্মক্ষেত্রে তাৎক্ষণিক হয়রানির শিকার হলে জাতীয় হেল্পলাইন ৯৯৯ অথবা ১০৯ নম্বরে কল করুন।'
    },
    keywords: ['eve teasing', 'harassment of woman', 'stalking', 'eveteasing', 'ইভটিজিং', 'নারীর শালীনতাহানি', 'রাস্তায় হয়রানি', '১০৯ হেল্পলাইন']
  }),
  entry({
    id: 'police-44-gd',
    category: 'threats',
    act: policeAct,
    section: 'Section 44',
    title: { en: 'Statutory General Diary (GD) procedure at police station', bn: 'থানায় সাধারণ ডায়েরি (জিডি) করার আইনি কার্যপদ্ধতি' },
    quote: 'থানার ভারপ্রাপ্ত কর্মকর্তা তাহার অধিক্ষেত্রাধীন সকল অভিযোগ, নিখোঁজ সংবাদ ও হুমকির তথ্য রেজিস্টারভুক্ত সাধারণ ডায়েরিতে সংরক্ষণ করিবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-12/section-3392.html',
    explanation: {
      en: 'Section 44 of Police Act and CrPC Section 155 establish the General Diary (GD). Any citizen can lodge a GD at the local police station or online (gd.police.gov.bd) free of charge to officially record threats, lost documents, missing persons, or family security concerns.',
      bn: 'থানায় বা অনলাইনে (gd.police.gov.bd) বিনামূল্যে জিডি করা নাগরিকের অধিকার। কোনো দলিল বা সনদ হারালে, নিখোঁজ হলে বা কোনো হুমকির আশঙ্কা দেখা দিলে নিরাপত্তার স্বার্থে জিডি করতে হয়।'
    },
    caution: {
      en: 'A GD is a preliminary record. If an active cognizable crime has already occurred (violent assault, robbery), demand an FIR instead of a mere GD.',
      bn: 'জিডি হলো সতর্কতা বা প্রাথমিক তথ্য সংরক্ষণ। গুরুতর আমলযোগ্য অপরাধ ঘটলে জিডির বদলে সরাসরি এজাহার (FIR) দায়ের করুন।'
    },
    keywords: ['general diary', 'gd application', 'lost document', 'shadharon diary', 'জিডি', 'সাধারণ ডায়েরি', 'থানায় জিডি', 'অনলাইন জিডি', 'সনদ হারানো']
  }),

  // =========================================================================
  // CATEGORY 3: CYBER & DIGITAL SECURITY (9 Provisions)
  // =========================================================================
  entry({
    id: 'pornography-8',
    category: 'digital',
    act: pornographyAct,
    section: 'Section 8(1)–(3)',
    title: { en: 'Non-consensual sharing of intimate images & blackmail', bn: 'অন্তরঙ্গ ছবি বা ভিডিও ছড়িয়ে দেওয়ার হুমকি ও ব্ল্যাকমেইল' },
    quote: 'কোনো ব্যক্তি যদি ইন্টারনেট বা অন্য কোনো মাধ্যমে কোনো ব্যক্তির সম্মতি ছাড়া তাহার গোপন বা অন্তরঙ্গ ছবি বা ভিডিও প্রকাশ করেন বা প্রকাশের হুমকি প্রদান করেন, তবে তিনি ২ থেকে ৫ বৎসর পর্যন্ত কারাদণ্ডে দণ্ডিত হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1090/section-34863.html',
    explanation: {
      en: 'Section 8 of the Pornography Control Act 2012 strictly punishes distributing, uploading, or threatening to release intimate photographs or videos without consent with 2 to 5 years rigorous imprisonment and fine up to 5 lakh taka. Police can arrest without warrant.',
      bn: 'কারো সম্মতি ছাড়া ব্যক্তিগত অন্তরঙ্গ ছবি বা ভিডিও ইন্টারনেটে প্রকাশ করা বা প্রকাশের হুমকি দিয়ে ব্ল্যাকমেইল করা পর্নোগ্রাফি নিয়ন্ত্রণ আইনের ৮ ধারায় মারাত্মক অপরাধ। এতে ২ থেকে ৫ বছর সশ্রম কারাদণ্ড এবং ৫ লাখ টাকা পর্যন্ত অর্থদণ্ড হতে পারে।'
    },
    caution: {
      en: 'Do not delete the abusive messages or screenshots. Report immediately to the CID Cyber Police Center (01799000555) or 999.',
      bn: 'প্রমাণ হিসেবে চ্যাট হিস্ট্রি বা মেসেজ ডিলিট করবেন না। সিআইডি সাইবার পুলিশ হেল্পলাইন (০১৭৯৯০০৫৫৫৫) অথবা ৯৯৯-এ যোগাযোগ করুন।'
    },
    keywords: ['blackmail', 'intimate photos', 'revenge porn', 'viral threat', 'video viral', 'অন্তরঙ্গ ছবি', 'ভিডিও ফাঁসের হুমকি', 'ব্ল্যাকমেইল', 'সাইবার ক্রাইম']
  }),
  entry({
    id: 'penal-419',
    category: 'digital',
    act: penal,
    section: 'Section 419',
    title: { en: 'Cheating by personation (Fake profiles & digital impersonation)', bn: 'অনলাইনে অন্যের নাম ও ছবি ব্যবহার করে প্রতারণা' },
    quote: 'Whoever cheats by personation shall be punished with imprisonment... which may extend to three years, or with fine, or with both.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3147.html',
    explanation: {
      en: 'Creating a fake Facebook, WhatsApp, or social media profile using someone else’s real photo, identity, or name to deceive friends or solicit money is Cheating by Personation under Section 416/419, carrying up to 3 years imprisonment.',
      bn: 'ফেসবুক বা অনলাইনে অন্যের ছবি ও নাম ব্যবহার করে ভুয়া আইডি খুলে বন্ধুদের কাছে টাকা চাওয়া বা সম্মানহানি করা দণ্ডবিধির ৪১৯ ধারায় ৩ বছর পর্যন্ত কারাদণ্ডযোগ্য অপরাধ।'
    },
    caution: {
      en: 'Report the cloned account directly to the platform (Facebook/Meta) and lodge an immediate cyber GD at the police station.',
      bn: 'ফেসবুকে ভুয়া আইডিটি রিপোর্ট করুন এবং সংশ্লিষ্ট প্রোফাইল লিংক উল্লেখ করে থানায় দ্রুত একটি জিডি করুন।'
    },
    keywords: ['fake profile', 'impersonation', 'identity theft', 'fake facebook', 'chadmobesh', 'ভুয়া আইডি', 'ফেসবুক হ্যাক', 'নাম ব্যবহার করে প্রতারণা']
  }),
  entry({
    id: 'cyber-24',
    category: 'digital',
    act: cyber,
    section: 'Section 24',
    title: { en: 'Identity fraud and digital impersonation', bn: 'ডিজিটাল প্রতারণা ও পরিচিতি জালিয়াতি' },
    quote: 'কোনো ব্যক্তি যদি জালিয়াতির মাধ্যমে অন্যের পরিচিতি ব্যবহার করিয়া ডিজিটাল প্রতারণা করেন, তবে উহা দণ্ডনীয় অপরাধ।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1450/section-41883.html',
    versionNote: cyberTransitionalNote,
    explanation: {
      en: 'Section 24 criminalizes digital identity fraud, using stolen personal credentials, forged signatures, or fake digital accounts to commit deceit or obtain unlawful advantage.',
      bn: 'ডিজিটাল বা ইলেকট্রনিক মাধ্যমে জালিয়াতি করে অন্যের পরিচয় ব্যবহার করা বা প্রতারণার উদ্দেশ্যে পরিচিতি জাল করা শাস্তিযোগ্য অপরাধ।'
    },
    caution: {
      en: 'Preserve full profile URLs, timestamps, and message headers to enable police forensic investigators to trace the IP address.',
      bn: 'প্রতারক আইডির সম্পূর্ণ ইউআরএল (URL), স্ক্রিনশট ও তারিখ-সময় সংরক্ষণ করুন।'
    },
    keywords: ['identity fraud', 'digital scam', 'scammer', 'porichiti jaliati', 'পরিচিতি জালিয়াতি', 'ডিজিটাল প্রতারণা', 'সাইবার জালিয়াতি']
  }),
  entry({
    id: 'cyber-25',
    category: 'digital',
    act: cyber,
    section: 'Section 25',
    title: { en: 'Transmitting offensive or defamatory digital information', bn: 'অনলাইনে আক্রমণাত্মক বা মানহানিকর তথ্য প্রচার' },
    quote: 'ইচ্ছাকৃতভাবে ওয়েবসাইট বা অন্য কোনো ডিজিটাল মাধ্যমে আক্রমণাত্মক বা ভীতিকর কোনো তথ্য প্রকাশ বা প্রচার করা দণ্ডনীয় অপরাধ।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1450/section-41884.html',
    versionNote: cyberTransitionalNote,
    explanation: {
      en: 'Section 25 addresses transmission of intentionally offensive, harassing, or defamatory digital material to annoy, humiliate, or menace a citizen.',
      bn: 'ওয়েবসাইট বা সামাজিক যোগাযোগ মাধ্যমে কাউকে ইচ্ছাকৃতভাবে অপমানিত করার জন্য মানহানিকর বা ভীতিকর তথ্য প্রকাশ ও প্রচার করা অপরাধ।'
    },
    caution: {
      en: 'Under ongoing legal review in Bangladesh, focus reporting on personal harassment, defamation, and extortion.',
      bn: 'ব্যক্তিগত হয়রানি বা মানহানির ক্ষেত্রে সাইবার পুলিশ বা সরাসরি আদালতে প্রতিকার চাওয়া যায়।'
    },
    keywords: ['defamation', 'online harassment', 'cyberbullying', 'manhani', 'অনলাইন মানহানি', 'সাইবার বুলিং', 'ফেসবুকে অপমান']
  }),
  entry({
    id: 'cyber-26',
    category: 'digital',
    act: cyber,
    section: 'Section 26',
    title: { en: 'Unauthorized collection or use of personal identity data', bn: 'অনুমতি ছাড়া ব্যক্তিগত পরিচিতি তথ্য বা এনআইডি সংগ্রহ ও ব্যবহার' },
    quote: 'কোনো ব্যক্তি যদি অনুমতি ব্যতীত কোনো ব্যক্তির পরিচিতি তথ্য (Identity Information) সংগ্রহ, বিক্রয়, সরবরাহ বা ব্যবহার করেন, তবে উহা দণ্ডনীয় অপরাধ হইবে।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1450/section-41885.html',
    versionNote: cyberTransitionalNote,
    explanation: {
      en: 'Section 26 makes unauthorized collection, possession, sale, or use of personal identity information (such as National ID data, biometrics, passport, passwords) an offense punishable with up to 5 years imprisonment or fine.',
      bn: 'কারো সম্মতি ছাড়া তার জাতীয় পরিচয়পত্র (NID), ফিঙ্গারপ্রিন্ট, বায়োমেট্রিক তথ্য বা পাসওয়ার্ড সংগ্রহ, বিক্রয় বা ব্যবহার করা দণ্ডনীয় অপরাধ।'
    },
    caution: {
      en: 'Check with mobile operators if unauthorized SIM cards have been registered using your NID (*16001#).',
      bn: 'আপনার এনআইডি দিয়ে অন্য কেউ অবৈধ সিম তুলেছে কি না তা যাচাই করতে *১৬০০১# ডায়াল করুন।'
    },
    keywords: ['stolen nid', 'identity data', 'unauthorized sim', 'nid misuse', 'ব্যক্তিগত তথ্য চুরি', 'এনআইডি জালিয়াতি', 'অবৈধ সিম']
  }),
  entry({
    id: 'cyber-32',
    category: 'digital',
    act: cyber,
    section: 'Section 32',
    title: { en: 'Hacking and unauthorized access to digital systems', bn: 'অনলাইন একাউন্ট বা কম্পিউটার সিস্টেমে অনধিকার প্রবেশ ও হ্যাকিং' },
    quote: 'কোনো ব্যক্তি যদি ইচ্ছাকৃতভাবে কোনো কম্পিউটার, কম্পিউটার প্রোগ্রাম বা নেটওয়ার্কে অনধিকার প্রবেশ করেন বা ক্ষতিসাধন করেন, তাহা হইলে উহা হ্যাকিং অপরাধ বলিয়া গণ্য হইবে।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1450/section-41891.html',
    versionNote: cyberTransitionalNote,
    explanation: {
      en: 'Section 32 defines Hacking: intentionally gaining unauthorized access into any digital account, server, or device, altering data, or locking out the lawful owner. Punishable with up to 5 years imprisonment.',
      bn: 'অনুমতি ছাড়া কারো সামাজিক যোগাযোগ মাধ্যম একাউন্ট, ইমেইল বা কম্পিউটার সিস্টেমে অনুপ্রবেশ করে পাসওয়ার্ড পরিবর্তন বা ডেটা নষ্ট করা হ্যাকিং অপরাধ হিসেবে গণ্য।'
    },
    caution: {
      en: 'Immediately activate Two-Factor Authentication (2FA) and request account recovery through platform official channels.',
      bn: 'একাউন্টে টু-ফ্যাক্টর অথেনটিকেশন চালু করুন এবং হ্যাক হলে দ্রুত সংশ্লিষ্ট প্ল্যাটফর্মের মাধ্যমে রিকভারির চেষ্টা করুন।'
    },
    keywords: ['hacking', 'unauthorized access', 'account hacked', 'facebook hack', 'হ্যাকিং', 'একাউন্ট হ্যাক', 'পাসওয়ার্ড চুরি', 'অনধিকার প্রবেশ']
  }),
  entry({
    id: 'ict-56',
    category: 'digital',
    act: ictAct,
    section: 'Section 56',
    title: { en: 'Hacking with intent to destroy or alter data', bn: 'কম্পিউটার সিস্টেমের ক্ষতিসাধন ও তথ্য পরিবর্তন' },
    quote: 'কোনো ব্যক্তি যদি এমন কোনো কার্য করেন যাহার ফলে কোনো কম্পিউটার সিস্টেম বা ডেটা নষ্ট বা পরিবর্তিত হয়, তবে তিনি অনধিক দশ বৎসর কারাদণ্ডে দণ্ডিত হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-963/section-29971.html',
    explanation: {
      en: 'Section 56 of the ICT Act 2006 punishes intentional hacking, sabotage, destruction, or alteration of computer resources and systems with up to 10 years imprisonment and fine up to 1 crore taka.',
      bn: 'কম্পিউটার সিস্টেম বা ওয়েবসাইটের ক্ষতিসাধন, তথ্য বিকৃতি বা ডেটা মুছে ফেলা আইসিটি আইনের ৫৬ ধারায় সর্বোচ্চ ১০ বছরের কারাদণ্ডযোগ্য অপরাধ।'
    },
    caution: {
      en: 'Major digital financial fraud and system sabotage can be prosecuted under this section before the Cyber Tribunal.',
      bn: 'গুরুতর ডিজিটাল ক্ষতি বা সাইবার অপরাধে ঢাকার সাইবার ট্রাইব্যুনালে সরাসরি মামলা দায়ের করা যায়।'
    },
    keywords: ['ict act 56', 'system damage', 'data destruction', 'আইসিটি আইন ৫৬', 'তথ্য বিকৃতি', 'সাইবার ট্রাইব্যুনাল']
  }),
  entry({
    id: 'constitution-43',
    category: 'digital',
    act: constitution,
    section: 'Article 43',
    title: { en: 'Right to privacy of home and correspondence', bn: 'গৃহ ও যোগাযোগের গোপনীয়তার সাংবিধানিক অধিকার' },
    quote: 'Every citizen shall have the right... to the privacy of his correspondence and other means of communication.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24591.html',
    explanation: {
      en: 'Article 43 of the Constitution guarantees the privacy of every citizen’s correspondence and telecommunications against unlawful state or private wiretapping, surveillance, and data interception.',
      bn: 'সংবিধানের ৪৩ অনুচ্ছেদ অনুযায়ী প্রত্যেক নাগরিকের চিঠি-পত্র ও অন্যান্য যোগাযোগের (ফোন কল, মেসেজ, ইন্টারনেট) গোপনীয়তা রক্ষার মৌলিক অধিকার নিশ্চিত করা হয়েছে।'
    },
    caution: {
      en: 'Exceptions apply only under explicit statutory authority for national security or public order.',
      bn: 'আইনের সুনির্দিষ্ট অনুমোদন ছাড়া কোনো নাগরিকের ব্যক্তিগত ফোনালাপ ফাঁস বা রেকর্ড করা মৌলিক অধিকারের লঙ্ঘন।'
    },
    keywords: ['privacy', 'wiretapping', 'call leak', 'goponiyota', 'গোপনীয়তার অধিকার', 'ফোনালাপ ফাঁস', 'ব্যক্তিগত তথ্য']
  }),
  entry({
    id: 'cyber-crime-reporting',
    category: 'digital',
    act: cyberProcedure,
    section: 'Standard Police Cyber Protocol',
    title: { en: 'Official reporting channels for cybercrimes (CID & CTTC)', bn: 'সাইবার অপরাধের প্রতিকারে অফিশিয়াল অভিযোগের মাধ্যম' },
    quote: 'সাইবার অপরাধের শিকার নাগরিক সরাসরি নিকটস্থ থানা, সিআইডি সাইবার পুলিশ সেন্টার (০১৭৯৯০০৫৫৫৫) অথবা জাতীয় হেল্পলাইন ৯৯৯-এ ডিজিটাল আলামতসহ অভিযোগ দাখিল করিতে পারিবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://police.gov.bd/en/cyber_crime',
    explanation: {
      en: 'Victims of online harassment, financial fraud, or blackmail can report directly to the CID Cyber Police Centre (Hotline: 01799000555), CTTC Cyber Unit (01769691522), or via National Emergency Service 999.',
      bn: 'অনলাইনে প্রতারণা, ব্ল্যাকমেইল বা হুমকির শিকার হলে সিআইডি সাইবার পুলিশ সেন্টার (হটলাইন: ০১৭৯৯০০৫৫৫৫), সিটিটিসি সাইবার ইউনিট অথবা ৯৯৯-এ ডিজিটাল প্রমাণাদিসহ সরাসরি অভিযোগ জানানো যায়।'
    },
    caution: {
      en: 'Never delete the original transaction SMS or digital links; take uncropped screenshots with URL and date visible.',
      bn: 'আসল মেসেজ বা ট্রানজেকশন আইডি ডিলিট করবেন না; তারিখ ও লিংকসহ সম্পূর্ণ স্ক্রিনশট সংরক্ষণ করুন।'
    },
    keywords: ['cyber complaint', 'cid cyber police', 'cttc', '01799000555', 'সাইবার অভিযোগ', 'সাইবার পুলিশ', 'সিআইডি সাইবার', '৯৯৯ সাইবার হেল্প']
  }),

  // =========================================================================
  // CATEGORY 4: CONSUMER RIGHTS & E-COMMERCE FRAUD (13 Provisions)
  // =========================================================================
  entry({
    id: 'consumer-37',
    category: 'consumer',
    act: consumer,
    section: 'Section 37',
    title: { en: 'Failure to display price list of commodities', bn: 'পণ্যের মূল্য তালিকা প্রদর্শন না করার অপরাধ' },
    quote: 'কোন ব্যক্তি কোনো দোকান বা প্রতিষ্ঠানে পণ্যের মূল্য তালিকা প্রদর্শন না করিলে তিনি অনধিক এক বৎসর কারাদণ্ড, বা অনধিক পঞ্চাশ হাজার টাকা অর্থদণ্ড, বা উভয় দণ্ডে দণ্ডিত হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-32519.html',
    explanation: {
      en: 'Section 37 requires every shopkeeper and seller to display the price list of commodities in a conspicuous place. Failure to display is punishable with up to 1 year imprisonment or 50,000 taka fine.',
      bn: 'দোকান বা প্রতিষ্ঠানে পণ্যের মূল্য তালিকা ঝুলিয়ে না রাখা ভোক্তা অধিকার আইনের ৩৭ ধারায় শাস্তিযোগ্য অপরাধ। এতে সর্বোচ্চ ১ বছরের কারাদণ্ড বা ৫০,০০০ টাকা জরিমানা হতে পারে।'
    },
    caution: {
      en: 'Take a clear photograph of the storefront showing the absence of the mandatory price board.',
      bn: 'মূল্য তালিকা না থাকার প্রমাণ হিসেবে দোকানের ছবি সংরক্ষণ করুন।'
    },
    keywords: ['price list', 'mrp display', 'mullo talika', 'মূল্য তালিকা', 'দাম না লেখা', 'ভোক্তা অধিকার']
  }),
  entry({
    id: 'consumer-40',
    category: 'consumer',
    act: consumer,
    section: 'Section 40',
    title: { en: 'Charging more than legally fixed price or MRP', bn: 'নির্ধারিত মূল্যের চেয়ে অধিক মূল্যে পণ্য বিক্রয়' },
    quote: 'কোন ব্যক্তি আইন বা সরকারি আদেশের অধীন নির্ধারিত মূল্য অথবা মোড়কে উল্লেখিত সর্বোচ্চ খুচরা মূল্যের (MRP) অধিক মূল্যে কোনো পণ্য বিক্রয় করিলে তিনি অনধিক এক বৎসর কারাদণ্ড বা পঞ্চাশ হাজার টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-32522.html',
    explanation: {
      en: 'Selling goods above the Maximum Retail Price (MRP) printed on the package or charging more than government-fixed rates is punishable with up to 1 year imprisonment or 50,000 taka fine.',
      bn: 'পণ্যের মোড়কে লেখা সর্বোচ্চ খুচরা মূল্যের (MRP) চেয়ে বেশি দাম রাখা ভোক্তা অধিকার আইনের ৪০ ধারায় দণ্ডনীয় অপরাধ।'
    },
    caution: {
      en: 'Always demand and preserve the printed sales receipt clearly showing the price paid above the package MRP.',
      bn: 'দোকান থেকে ক্যাশ মেমো সংগ্রহ করুন যাতে পণ্যের গায়ে লেখা দামের চেয়ে বেশি নেওয়ার প্রমাণ থাকে।'
    },
    keywords: ['overcharging', 'higher price', 'mrp violation', 'beshi daam', 'অতিরিক্ত দাম', 'এমআরপির চেয়ে বেশি', 'বেশি দাম রাখা']
  }),
  entry({
    id: 'consumer-41',
    category: 'consumer',
    act: consumer,
    section: 'Section 41',
    title: { en: 'Selling adulterated goods, expired medicine or food', bn: 'ভেজাল পণ্য ও মেয়াদোত্তীর্ণ ওষুধ বা খাদ্য বিক্রয়' },
    quote: 'কোন ব্যক্তি জ্ঞাতসারে কোনো ভেজাল পণ্য বা মানবস্বাস্থ্যের জন্য ক্ষতিকর কোনো উপাদান মিশ্রিত পণ্য অথবা মেয়াদোত্তীর্ণ পণ্য বিক্রয় করিলে অনধিক তিন বৎসর কারাদণ্ড বা দুই লক্ষ টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-32523.html',
    explanation: {
      en: 'Selling adulterated goods, items past their expiry date, or food with harmful additives is punishable with up to 3 years imprisonment or 2 lakh taka fine under Section 41.',
      bn: 'মেয়াদোত্তীর্ণ খাদ্য, ভেজাল উপাদানযুক্ত পণ্য বা মেয়াদ শেষ হওয়া ওষুধ বিক্রি করা ভোক্তা অধিকার আইনে মারাত্মক অপরাধ। এতে ৩ বছর পর্যন্ত কারাদণ্ড বা ২ লাখ টাকা জরিমানা হতে পারে।'
    },
    caution: {
      en: 'Preserve the expired item with the expiry date stamp intact, along with the purchase receipt.',
      bn: 'প্যাকেটের মেয়াদোত্তীর্ণ তারিখ ও ক্রয়ের ক্যাশ মেমো অক্ষত অবস্থায় প্রমাণ হিসেবে রাখুন।'
    },
    keywords: ['expired food', 'expired medicine', 'adulterated', 'meyaduttirno', 'ভেজাল পণ্য', 'মেয়াদোত্তীর্ণ ওষুধ', 'মেয়াদ শেষ পণ্য']
  }),
  entry({
    id: 'consumer-42',
    category: 'consumer',
    act: consumer,
    section: 'Section 42',
    title: { en: 'Deceptive weights and short measurements', bn: 'ওজন ও পরিমাপে কম দেওয়ার অপরাধ' },
    quote: 'কোন ব্যক্তি বাটখারা বা ওজন পরিমাপক যন্ত্রে কারচুপি করিয়া ওজনে বা পরিমাপে কম দিলে তিনি অনধিক এক বৎসর কারাদণ্ড, বা অনধিক পঞ্চাশ হাজার টাকা অর্থদণ্ড, বা উভয় দণ্ডে দণ্ডিত হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-32524.html',
    explanation: {
      en: 'Using false weights, tampered digital scales, or delivering short measurements in commodities is punishable with up to 1 year imprisonment or 50,000 taka fine under Section 42.',
      bn: 'বাটখারা বা ডিজিটাল স্কেলে কারচুপি করে ওজনে বা মাপে কম দেওয়া ভোক্তা অধিকার আইনে শাস্তিযোগ্য অপরাধ।'
    },
    caution: {
      en: 'Weigh the purchased goods at an independent calibrated scale or BSTI verified counter to document the shortage.',
      bn: 'ওজনে কম দেওয়ার বিষয়টি অন্য নির্ভরযোগ্য দাঁড়িপাল্লায় মেপে পার্থক্য নিশ্চিত করুন।'
    },
    keywords: ['short weight', 'tampered scale', 'ojon kom', 'ওজনে কম', 'বাটখারা কারচুপি', 'পরিমাপে কম']
  }),
  entry({
    id: 'consumer-43',
    category: 'consumer',
    act: consumer,
    section: 'Section 43',
    title: { en: 'Selling goods hazardous to human life or health', bn: 'মানবস্বাস্থ্যের জন্য মারাত্মক ক্ষতিকর পণ্য বিক্রয়' },
    quote: 'কোন ব্যক্তি মানুষের জীবন বা স্বাস্থ্যের পক্ষে মারাত্মকভাবে ক্ষতিকর কোনো পণ্য প্রস্তুত বা বিক্রয় করিলে তিনি অনধিক দুই বৎসর কারাদণ্ড, বা অনধিক এক লক্ষ টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-32525.html',
    explanation: {
      en: 'Section 43 punishes the manufacture or sale of goods that are seriously dangerous to human life or health with up to 2 years imprisonment or 1 lakh taka fine.',
      bn: 'মানবস্বাস্থ্যের পক্ষে মারাত্মক ক্ষতিকর কেমিক্যালযুক্ত খাবার, বিষাক্ত কসমেটিকস বা নিষিদ্ধ পণ্য বিক্রয় করা ২ বছরের কারাদণ্ডযোগ্য অপরাধ।'
    },
    caution: {
      en: 'Complaints can be submitted to DNCRP or BSTI for immediate lab sample testing.',
      bn: 'ক্ষতিকর পণ্যের নমুনা নিয়ে বিএসটিআই বা ভোক্তা অধিদপ্তরে ল্যাব টেস্টের আবেদন করা যায়।'
    },
    keywords: ['hazardous goods', 'toxic food', 'formalin', 'ক্ষতিকর পণ্য', 'বিষাক্ত খাবার', 'ভেজাল কসমেটিকস']
  }),
  entry({
    id: 'consumer-44',
    category: 'consumer',
    act: consumer,
    section: 'Section 44',
    title: { en: 'Misleading advertisements & deceptive promises', bn: 'মিথ্যা বিজ্ঞাপন দিয়ে প্রতারণা' },
    quote: 'কোন ব্যক্তি মিথ্যা বা অসত্য বিজ্ঞাপন দ্বারা ক্রেতা সাধারণকে প্রতারিত করিলে তিনি অনধিক এক বৎসর কারাদণ্ড বা অনধিক এক লক্ষ টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-32526.html',
    explanation: {
      en: 'Section 44 penalizes false, deceptive, or misleading advertisements in print, TV, or social media designed to cheat consumers, punishable with up to 1 year imprisonment or 1 lakh taka fine.',
      bn: 'মিথ্যা বা বিভ্রান্তিকর বিজ্ঞাপন দিয়ে ক্রেতাকে আকৃষ্ট করে ভিন্ন পণ্য দেওয়া বা প্রতারিত করা ১ বছরের কারাদণ্ডযোগ্য অপরাধ।'
    },
    caution: {
      en: 'Take a screenshot of the advertisement banner, Facebook post, or product description page.',
      bn: 'বিজ্ঞাপনের স্ক্রিনশট ও বিবরণীর প্রমাণপত্র সংরক্ষণ করুন।'
    },
    keywords: ['misleading ad', 'fake advertisement', 'mithya biggapon', 'মিথ্যা বিজ্ঞাপন', 'বিজ্ঞাপনে প্রতারণা', 'ভুল তথ্য দিয়ে বিক্রি']
  }),
  entry({
    id: 'consumer-45',
    category: 'consumer',
    act: consumer,
    section: 'Section 45',
    title: { en: 'Failure to sell promised product / goods fraud', bn: 'প্রতিশ্রুত পণ্য প্রদান না করা বা পণ্য জালিয়াতি' },
    quote: 'কোন ব্যক্তি কোনো পণ্য বিক্রয়ের জন্য মূল্য গ্রহণ করিয়া প্রতিশ্রুত পণ্য বা সমপরিমাণ সেবা প্রদান না করিলে অনধিক এক বৎসর কারাদণ্ড বা পঞ্চাশ হাজার টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-32527.html',
    explanation: {
      en: 'Section 45 covers non-delivery: receiving payment for goods but failing to deliver the promised item or delivering a completely fake/different item is punishable with up to 1 year imprisonment or fine.',
      bn: 'টাকা নিয়ে প্রতিশ্রুত পণ্য সরবরাহ না করা বা সম্পূর্ণ ভিন্ন বা নিম্নমানের জিনিস দিয়ে ক্রেতাকে ঠকানো শাস্তিযোগ্য অপরাধ।'
    },
    caution: {
      en: 'Essential for e-commerce and Facebook shopping: keep proof of payment, order number, and delivery unboxing video.',
      bn: 'অনলাইন শপিংয়ের ক্ষেত্রে পেমেন্ট স্লিপ, চ্যাট হিস্ট্রি এবং ডেলিভারির সময় আনবক্সিং ভিডিও করে রাখুন।'
    },
    keywords: ['non delivery', 'different product', 'online fraud', 'ponyo payni', 'পণ্য ডেলিভারি না দেওয়া', 'ভিন্ন পণ্য দেওয়া', 'ই-কমার্স প্রতারণা']
  }),
  entry({
    id: 'consumer-52',
    category: 'consumer',
    act: consumer,
    section: 'Section 52',
    title: { en: 'Negligence in service causing danger or damage', bn: 'সেবা প্রদানে অবহেলার কারণে ক্ষতিসাধন' },
    quote: 'কোন সেবা প্রদানকারী অবহেলা, দায়িত্বহীনতা বা অসতর্কতা দ্বারা সেবাগ্রহীতার অর্থ, স্বাস্থ্য বা জীবনের ক্ষতিসাধন করিলে তিনি অনধিক তিন বৎসর কারাদণ্ড বা অনধিক দুই লক্ষ টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-32534.html',
    explanation: {
      en: 'Section 52 penalizes service providers (hospitals, diagnostic centers, transport operators, repair shops) who cause financial, health, or personal injury to consumers through gross negligence.',
      bn: 'ডায়াগনস্টিক সেন্টারের ভুল রিপোর্ট, চিকিৎসা অবহেলা বা সার্ভিস সেন্টারের গাফিলতিতে গ্রাহকের ক্ষতি হলে ৩ বছর পর্যন্ত কারাদণ্ড হতে পারে।'
    },
    caution: {
      en: 'Preserve service agreements, lab test receipts, doctor prescriptions, and physical inspection reports.',
      bn: 'সেবা গ্রহণের চুক্তিপত্র, রসিদ এবং অবহেলার প্রমাণপত্র যত্নসহকারে সংরক্ষণ করুন।'
    },
    keywords: ['service negligence', 'diagnostic error', 'medical negligence', 'seba obohela', 'সেবায় অবহেলা', 'ভুল টেস্ট রিপোর্ট', 'গ্রাহক ক্ষতিপূরণ']
  }),
  entry({
    id: 'consumer-53',
    category: 'consumer',
    act: consumer,
    section: 'Section 53',
    title: { en: 'Failure to deliver agreed service after receiving payment', bn: 'প্রতিশ্রুত সেবা প্রদান না করার অপরাধ' },
    quote: 'কোন সেবা প্রদানকারী প্রতিশ্রুত সেবা গ্রাহককে প্রদান না করিলে তিনি অনধিক এক বৎসর কারাদণ্ড বা অনধিক পঞ্চাশ হাজার টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-32535.html',
    explanation: {
      en: 'Section 53 punishes service providers (such as travel agencies, software firms, coaching institutes) who take money but fail to provide the agreed service.',
      bn: 'টাকা নিয়েও প্রতিশ্রুত সেবা প্রদান না করা বা সেবা দিতে অস্বীকার করা ভোক্তা অধিকার আইনের ৫৩ ধারায় শাস্তিযোগ্য অপরাধ।'
    },
    caution: {
      en: 'Submit written claim to the service provider giving 7 days to rectify before filing a DNCRP complaint.',
      bn: 'প্রথমে প্রতিষ্ঠানকে লিখিতভাবে সেবা প্রদানের অনুরোধ জানান; সমাধান না হলে ভোক্তা অধিদপ্তরে অভিযোগ করুন।'
    },
    keywords: ['agreed service', 'refusal of service', 'breach of service', 'seba na deoya', 'প্রতিশ্রুত সেবা', 'সেবা না দেওয়া', 'টাকা নিয়ে কাজ না করা']
  }),
  entry({
    id: 'consumer-60',
    category: 'consumer',
    act: consumer,
    section: 'Section 60',
    title: { en: 'Mandatory 30-day time limit for consumer complaint', bn: 'ভোক্তা অভিযোগ দাখিলের ৩০ দিনের সময়সীমা' },
    quote: 'কারণ উদ্ভব হইবার ৩০ (ত্রিশ) দিনের মধ্যে মহাপরিচালক বা ক্ষমতাপ্রাপ্ত কর্মকর্তার নিকট অভিযোগ দায়ের না করিলে কোনো অভিযোগ গ্রহণযোগ্য হইবে না।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-32542.html',
    explanation: {
      en: 'Section 60 establishes a mandatory 30-day limitation window: consumer complaints must be lodged with the Director General of DNCRP within exactly 30 days of the cause of action.',
      bn: 'প্রতারণা বা ঘটনার ৩০ দিনের মধ্যে জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তরে (DNCRP) লিখিত অভিযোগ দায়ের করতে হবে। ৩০ দিন পার হয়ে গেলে অভিযোগ তামাদি হয়ে যায়।'
    },
    caution: {
      en: 'Never delay beyond 30 days. Complaints can be submitted online at dncrp.portal.gov.bd or via hotline 16121.',
      bn: 'ঘটনার ৩০ দিনের মধ্যে অভিযোগ করুন; হটলাইন ১৬১২১-এ কল করে নিয়ম জেনে নিতে পারেন।'
    },
    keywords: ['30 days deadline', 'consumer complaint', 'limitation period', 'dncrp 60', '৩০ দিনের সময়সীমা', 'ভোক্তা অভিযোগ', '১৬১২১ হটলাইন']
  }),
  entry({
    id: 'consumer-76',
    category: 'consumer',
    act: consumer,
    section: 'Section 76(1)',
    title: { en: 'Complainant’s statutory 25% reward from fine', bn: 'জরিমানার ২৫% অর্থ অভিযোগকারীর পাওয়ার অধিকার' },
    quote: 'অভিযোগের ভিত্তিতে প্রশাসনিক তদন্তে কোনো অর্থদণ্ড আদায় করা হইলে, আদায়কৃত অর্থদণ্ডের ২৫ (পঁচিশ) শতাংশ অর্থ অভিযোগকারীকে প্রদান করিতে হইবে।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1014/section-32558.html',
    explanation: {
      en: 'Section 76 grants the citizen complainant a statutory 25% cash share of any administrative fine collected from the offending merchant by DNCRP.',
      bn: 'ভোক্তা অভিযোগের ভিত্তিতে কোনো ব্যবসায়ীকে জরিমানা করা হলে আদায়কৃত জরিমানার ২৫% অর্থ তাৎক্ষণিকভাবে অভিযোগকারী সাধারণ নাগরিককে পুরস্কার হিসেবে প্রদান করা হয়।'
    },
    caution: {
      en: 'Ensure your valid NID and bank or mobile financial service details are stated on your complaint form.',
      bn: 'অভিযোগপত্রে জাতীয় পরিচয়পত্র নম্বর ও ব্যাংক একাউন্ট বা বিকাশ নম্বর সঠিকভাবে উল্লেখ করুন।'
    },
    keywords: ['25 percent reward', 'fine reward', 'cash incentive', 'jorimanar 25', '২৫% পুরস্কার', 'জরিমানার টাকা', 'ভোক্তা পুরস্কার']
  }),
  entry({
    id: 'ecommerce-delivery-2021',
    category: 'consumer',
    act: ecommerceGuidelines,
    section: 'Clause 3.1.4 & 3.1.5',
    title: { en: 'Digital commerce delivery (5/10 days) and refund guidelines', bn: 'অনলাইন শপিংয়ে পণ্য ডেলিভারি ও ১০ দিনে রিফান্ডের নিয়ম' },
    quote: 'ক্রেতা অগ্রিম মূল্য পরিশোধ করিলে একই শহরে সর্বোচ্চ ৫ দিন এবং ভিন্ন শহরে সর্বোচ্চ ১০ দিনের মধ্যে পণ্য সরবরাহ করিতে হইবে; অন্যথায় ১০ দিনের মধ্যে সম্পূর্ণ মূল্য ফেরত দিতে হইবে।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://mincom.gov.bd/site/view/policies/',
    explanation: {
      en: 'Digital Commerce Guidelines 2021 mandate that pre-paid e-commerce orders must be delivered within 5 days (same city) or 10 days (outside city). If unfulfilled, seller must issue a 100% refund within 10 days.',
      bn: 'অনলাইনে অগ্রিম টাকা নিলে একই শহরে ৫ দিন এবং অন্য শহরে ১০ দিনের মধ্যে পণ্য ডেলিভারি দিতে হবে। পণ্য না থাকলে ১০ দিনের মধ্যে সম্পূর্ণ টাকা রিফান্ড করা বাধ্যতামূলক।'
    },
    caution: {
      en: 'If a seller fails to refund within 10 days, file an immediate complaint with DNCRP or Central Digital Commerce Cell.',
      bn: '১০ দিনে রিফান্ড না দিলে পেমেন্ট ট্রানজেকশন আইডিসহ ভোক্তা অধিদপ্তরে অভিযোগ করুন।'
    },
    keywords: ['ecommerce delivery', 'advance payment refund', '10 days refund', 'online shopping refund', 'অনলাইন ডেলিভারি', 'রিফান্ড', '১০ দিনে টাকা ফেরত', 'ডিজিটাল কমার্স']
  }),
  entry({
    id: 'penal-420',
    category: 'consumer',
    act: penal,
    section: 'Section 420',
    title: { en: 'Cheating and dishonestly inducing delivery of property', bn: 'প্রতারণা ও বিশ্বাসভঙ্গপূর্বক অর্থ আত্মসাত' },
    quote: 'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property... shall be punished with imprisonment... which may extend to seven years, and shall also be liable to fine.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3148.html',
    explanation: {
      en: 'Section 420 punishes fraud: dishonestly deceiving a person to take their money or property carries up to 7 years imprisonment and fine. Applicable to large-scale online scam merchants.',
      bn: 'প্রতারণামূলকভাবে কারো টাকা বা সম্পত্তি আত্মসাৎ করা দণ্ডবিধির ৪২০ ধারায় ৭ বছর পর্যন্ত কারাদণ্ডে দণ্ডনীয় গুরুতর ফৌজদারি অপরাধ।'
    },
    caution: {
      en: 'Large-scale fraudulent e-commerce scams exceeding administrative penalties can be prosecuted as a criminal case under Section 420.',
      bn: 'বড় অঙ্কের অনলাইন শপিং প্রতারণার ক্ষেত্রে থানায় ৪২০ ধারায় সরাসরি ফৌজদারি মামলা দায়ের করা যায়।'
    },
    keywords: ['cheating 420', 'fraud', 'protarona', 'প্রতারণা', 'দণ্ডবিধি ৪২০', 'টাকা আত্মসাৎ', 'অনলাইন জালিয়াতি']
  }),

  // =========================================================================
  // CATEGORY 5: LAND & PROPERTY TRANSFER (11 Provisions)
  // =========================================================================
  entry({
    id: 'land-crime-4',
    category: 'land',
    act: landCrimeAct,
    section: 'Section 4',
    title: { en: 'Forgery of land deeds & false document creation (Up to 7 years imprisonment)', bn: 'জাল দলিল তৈরি ও ব্যবহারের বিরুদ্ধে ৭ বছরের কারাদণ্ড' },
    quote: 'কোনো ব্যক্তি যদি ভূমি হস্তান্তর বা স্বত্ব প্রমাণের উদ্দেশ্যে কোনো মিথ্যা বা জাল দলিল প্রস্তুত করেন অথবা খাঁটি বলিয়া ব্যবহার করেন, তবে তিনি অনধিক ৭ বৎসর কারাদণ্ড এবং অর্থদণ্ডে দণ্ডিত হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1447/section-41838.html',
    explanation: {
      en: 'Under Section 4 of the Land Crime Prevention and Redress Act, 2023 (Act No. 36 of 2023), forging land transfer deeds, power of attorney, or using forged documents is a non-bailable offense carrying up to 7 years imprisonment and fine. Triable by the Court of Senior Judicial Magistrate or Metropolitan Magistrate.',
      bn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩ (২০২৩ সনের ৩৬ নং আইন) এর ৪ ধারা অনুযায়ী জমির ভুয়া বা জাল দলিল তৈরি করা, স্বাক্ষর জাল করা বা জাল দলিল ব্যবহার করা অনধিক ৭ বছর পর্যন্ত কারাদণ্ড ও অর্থদণ্ডযোগ্য জামিন-অযোগ্য অপরাধ।'
    },
    caution: {
      en: 'Complaints can be lodged before the Executive Magistrate or the Judicial Court with certified copies of the genuine deeds.',
      bn: 'সাব-রেজিস্ট্রি অফিস থেকে তল্লাশি দিয়ে মূল দলিলের সার্টিফাইড কপি তুলে জাল দলিলের বিরুদ্ধে মামলা দায়ের করুন।'
    },
    keywords: ['forged deed', 'fake land deed', 'land crime 4', 'jaal dolil', 'জাল দলিল', 'ভুয়া দলিল', 'দলিল জালিয়াতি', 'ভূমি অপরাধ ২০২৩']
  }),
  entry({
    id: 'land-crime-5',
    category: 'land',
    act: landCrimeAct,
    section: 'Section 5',
    title: { en: 'Fraudulent transfer without title or multiple sales of same land', bn: 'মালিকানা ছাড়া জমি হস্তান্তর বা একই জমি বারবার বিক্রয়' },
    quote: 'কোনো ব্যক্তি যদি মালিকানা ব্যতীত অথবা পূর্বে বিক্রয় করা জমি গোপন রাখিয়া পুনরায় অন্যের নিকট বিক্রয় বা হস্তান্তর করেন, তবে তিনি অনধিক ৫ বৎসর কারাদণ্ড এবং অর্থদণ্ডে দণ্ডিত হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1447/section-41839.html',
    explanation: {
      en: 'Section 5 punishes selling land without lawful ownership or deceptively selling the same piece of land to multiple buyers with up to 5 years imprisonment and fine. The buyer can recover purchase money.',
      bn: 'মালিকানা ছাড়া জমি বিক্রি করা বা পূর্বে বিক্রি করা জমি গোপন করে দ্বিতীয় ব্যক্তির কাছে পুনরায় বিক্রয় করা ৫ বছর পর্যন্ত কারাদণ্ডযোগ্য অপরাধ।'
    },
    caution: {
      en: 'Always search the Sub-Registry Office Index-II book to verify if the seller has already executed any prior deed to anyone else.',
      bn: 'জমি কেনার আগে সাব-রেজিস্ট্রি অফিসে ইন্ডেক্স-২ তল্লাশি দিয়ে দেখুন বিক্রেতা পূর্বে অন্য কারো কাছে জমি বিক্রি করেছেন কি না।'
    },
    keywords: ['sold twice', 'multiple sales', 'no title sale', 'eki jomi bar bar', 'একই জমি পুনরায় বিক্রি', 'মালিকানা ছাড়া জমি বিক্রি', 'জমি প্রতারণা']
  }),
  entry({
    id: 'land-crime-7',
    category: 'land',
    act: landCrimeAct,
    section: 'Section 7',
    title: { en: 'Illegal land grabbing, trespassing and dispossession', bn: 'অবৈধ জমি দখল ও জোরপূর্বক বেদখলের শাস্তি' },
    quote: 'কোনো ব্যক্তি যদি উপযুক্ত আইনি কর্তৃত্ব ব্যতীত কোনো ব্যক্তির বৈধ দখলীয় ভূমিতে জোরপূর্বক অনধিকার প্রবেশ বা দখল করেন, তবে তিনি অনধিক ২ বৎসর কারাদণ্ডে দণ্ডিত হইবেন এবং দখলদারের দখল পুনর্বহাল করা হইবে।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1447/section-41841.html',
    explanation: {
      en: 'Section 7 of Act No. 36 of 2023 criminalizes illegal land grabbing. Dispossessing a lawful owner or lawful possessor by force carries up to 2 years imprisonment. Under Sections 10 and 11, the Executive Magistrate may issue a show-cause notice and order restoration of possession, while disputed ownership title must still be resolved by the competent Civil Court.',
      bn: 'জোরপূর্বক কারো জমি দখল বা বেদখল করা ২০২৩ সনের ৩৬ নং আইনের ৭ ধারা অনুযায়ী ২ বছর পর্যন্ত কারাদণ্ডযোগ্য অপরাধ। ১০ ও ১১ ধারা মতে নির্বাহী ম্যাজিস্ট্রেট তদন্ত সাপেক্ষে প্রাথমিক দখল পুনর্বহালের আদেশ দিতে পারেন, তবে চূড়ান্ত স্বত্ব ও মালিকানা দেওয়ানি আদালতের এখতিয়ারাধীন।'
    },
    caution: {
      en: 'Submit land tax receipts (dakhila), mutation khatian, and registered deed to the Executive Magistrate court to prove lawful possession.',
      bn: 'দাখিলা, নামজারি খতিয়ান ও দলিলের কপি সংযুক্ত করে নির্বাহী ম্যাজিস্ট্রেট আদালতে দ্রুত আবেদন করুন।'
    },
    keywords: ['land grabbing', 'illegal occupation', 'jomi dokhol', 'bedokhol', 'জমি দখল', 'অবৈধ দখল', 'জমি বেদখল', 'দখল পুনরুদ্ধার']
  }),
  entry({
    id: 'land-crime-8',
    category: 'land',
    act: landCrimeAct,
    section: 'Section 8',
    title: { en: 'Destruction or alteration of land boundaries and pillars', bn: 'জমির সীমানা পরিবর্তন বা সীমানা পিলার নষ্ট করা' },
    quote: 'কোনো ব্যক্তি যদি কোনো ভূমির সীমানা পরিবর্তনের উদ্দেশ্যে সীমানা পিলার বিনষ্ট করেন বা স্থানান্তরিত করেন, তবে তিনি অনধিক ২ বৎসর কারাদণ্ড বা অর্থদণ্ডে দণ্ডিত হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1447/section-41842.html',
    explanation: {
      en: 'Intentionally breaking, moving, or altering land boundary pillars or fencing to usurp boundary property is punishable with up to 2 years imprisonment under Section 8.',
      bn: 'জমির সীমানা পিলার ভেঙে ফেলা বা রাতের আঁধারে সীমানা সরিয়ে অন্যের জমি আত্মসাতের চেষ্টা করা ২ বছরের কারাদণ্ডে দণ্ডনীয় অপরাধ।'
    },
    caution: {
      en: 'Call an authorized government land surveyor (Amin) to demarcate the property and prepare a formal survey map.',
      bn: 'সরকারি অনুমোদিত সার্ভেয়ার (আমিন) দিয়ে সীমানা পরিমাপ করিয়ে লিখিত প্রতিবেদন ও স্কেচ ম্যাপ সংরক্ষণ করুন।'
    },
    keywords: ['boundary dispute', 'boundary pillar', 'shimana poriborton', 'সীমানা বিরোধ', 'সীমানা পিলার কাটা', 'জমির সীমানা নষ্ট']
  }),
  entry({
    id: 'property-53c',
    category: 'land',
    act: property,
    section: 'Section 53C',
    title: { en: 'Mandatory verification of latest recorded khatian before land sale', bn: 'জমি বিক্রয়ের পূর্বে সর্বশেষ রেকর্ড খতিয়ান যাচাই' },
    quote: 'কোন ব্যক্তি সর্বশেষ জরিপে তাহার বা তাহার পূর্বসূরির নামে খতিয়ান না থাকিলে কোনো স্থাবর সম্পত্তি বিক্রয় বা হস্তান্তর করিতে পারিবেন না।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-48/section-1555.html',
    explanation: {
      en: 'Section 53C prohibits any person from selling immovable property unless the property is recorded in their name (or their predecessor’s name) in the latest government land survey khatian.',
      bn: 'সর্বশেষ সরকারি জরিপ খতিয়ানে (বিএস বা সিটি জরিপ) বিক্রেতার নাম না থাকলে বা উত্তরাধিকার সূত্রে মালিকানা প্রমাণ না থাকলে জমি রেজিস্ট্রি করা বেআইনি।'
    },
    caution: {
      en: 'Never purchase land based solely on a previous deed without inspecting the latest recorded khatian and mutation.',
      bn: 'শুধুমাত্র পুরনো দলিল দেখে জমি কিনবেন না; সর্বশেষ রেকর্ড খতিয়ান ও খারিজ খতিয়ান যাচাই করা বাধ্যতামূলক।'
    },
    keywords: ['khatian verification', 'bs survey', 'khatian check', 'khotian', 'খতিয়ান যাচাই', 'বিএস খতিয়ান', 'রেকর্ড যাচাই']
  }),
  entry({
    id: 'property-54',
    category: 'land',
    act: property,
    section: 'Section 54',
    title: { en: 'Compulsory registration of immovable property sale', bn: 'স্থাবর সম্পত্তি বিক্রয়ে বাধ্যতামূলক রেজিস্ট্রি' },
    quote: 'স্থাবর সম্পত্তির বিক্রয় ১০০ টাকা বা তদূর্ধ্ব মূল্যের হইলে কেবল রেজিস্ট্রিকৃত দলিলের মাধ্যমেই সম্পন্ন করা যাইবে।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-48/section-1556.html',
    explanation: {
      en: 'Section 54 requires that any sale of immovable property valued at 100 taka or more must be made only by a registered legal instrument.',
      bn: 'স্থাবর সম্পত্তি বিক্রয়ের ক্ষেত্রে রেজিস্ট্রিকৃত দলিল ছাড়া কোনো বৈধ মালিকানা হস্তান্তরিত হয় না। মৌখিক বা নন-জুডিশিয়াল স্ট্যাম্পে কেনাবেচা আইনত অকার্যকর।'
    },
    caution: {
      en: 'Unregistered sales on plain paper or notarized stamp papers have zero legal title validity in Bangladesh.',
      bn: 'নোটারি পাবলিক বা সাদা স্ট্যাম্পে করা জমি কেনাবেচা আদালতে কোনো মালিকানা প্রমাণ করে না।'
    },
    keywords: ['land registration', 'sale deed', 'dolil registry', 'দলিল রেজিস্ট্রি', 'সাফ কবলা', 'জমি রেজিস্ট্রি']
  }),
  entry({
    id: 'property-54a',
    category: 'land',
    act: property,
    section: 'Section 54A',
    title: { en: 'Enforceability of registered agreement for sale (Bayna deed)', bn: 'বায়না দলিলের আইনগত বাধ্যবাধকতা' },
    quote: 'স্থাবর সম্পত্তি বিক্রয়ের বায়না চুক্তি অবশ্যই লিখিত ও নিবন্ধিত হইতে হইবে এবং নিবন্ধনের তারিখ হইতে নির্দিষ্ট মেয়াদের মধ্যে মূল বিক্রয় সম্পন্ন করিতে হইবে।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-48/section-1557.html',
    explanation: {
      en: 'A contract for sale (Bayna deed) must be in writing and registered at the Sub-Registry Office. An unregistered bayna agreement cannot be legally enforced in court.',
      bn: 'জমি কেনার বায়নাপত্র অবশ্যই সাব-রেজিস্ট্রি অফিসে রেজিস্ট্রি করতে হবে। রেজিস্ট্রিহীন বায়না চুক্তির কোনো আইনি ভিত্তি থাকে না।'
    },
    caution: {
      en: 'If seller refuses to register after taking bayna money, a suit for specific performance must be filed within 1 year.',
      bn: 'বায়নার পর বিক্রেতা রেজিস্ট্রি করতে অস্বীকার করলে চুক্তির মেয়াদের ১ বছরের মধ্যে আদালতে সাফ-কবলা দলিলের জন্য মামলা করতে হয়।'
    },
    keywords: ['bayna agreement', 'contract for sale', 'bayna dolil', 'বায়না দলিল', 'বায়নাপত্র', 'চুক্তি বলবতের মামলা']
  }),
  entry({
    id: 'registration-17',
    category: 'land',
    act: registration,
    section: 'Section 17',
    title: { en: 'Compulsory registration of land transfer deeds', bn: 'জমি হস্তান্তর দলিলের বাধ্যতামূলক নিবন্ধন' },
    quote: 'Documents of gift of immovable property, sales, and leases exceeding one year must be compulsorily registered.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-93/section-4286.html',
    explanation: {
      en: 'Section 17 lists instruments whose registration is compulsory: gifts of immovable property, sales, mortgages, partitions, and leases exceeding one year.',
      bn: 'দানপত্র, বিক্রি, বন্ধক, বাটোয়ারা এবং এক বছরের বেশি মেয়াদের ইজারা দলিল সাব-রেজিস্ট্রারের নিকট বাধ্যতামূলকভাবে রেজিস্ট্রি করতে হয়।'
    },
    caution: {
      en: 'Unregistered documents cannot affect the immovable property or be received as evidence of title in court (Section 49).',
      bn: 'অনিবন্ধিত দলিল কোনো স্থাবর সম্পত্তির মালিকানা তৈরি করে না এবং আদালতে স্বত্বের প্রমাণ হিসেবে গৃহীত হয় না।'
    },
    keywords: ['compulsory registration', 'gift deed', 'mortgage deed', 'বাধ্যতামূলক রেজিস্ট্রি', 'দানপত্র দলিল', 'বাটোয়ারা দলিল']
  }),
  entry({
    id: 'sra-9',
    category: 'land',
    act: sra,
    section: 'Section 9',
    title: { en: 'Fast recovery of possession within 6 months without proving title', bn: 'স্বত্ব ব্যতিরেকে দ্রুত দখল পুনরুদ্ধারের মামলা (৬ মাসের মধ্যে)' },
    quote: 'If any person is dispossessed without his consent of immovable property otherwise than in due course of law, he... may by suit recover possession thereof, notwithstanding any other title that may be set up...',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-32/section-1618.html',
    explanation: {
      en: 'Section 9 of the Specific Relief Act 1877 allows any person unlawfully dispossessed of land or premises to recover possession quickly by proving prior peaceful possession, without needing to establish full legal title.',
      bn: 'আইনসঙ্গত উপায় ছাড়া জোরপূর্বক বেদখল হলে স্বত্ব বা দলিলের জটিল প্রমাণ ছাড়াই পূর্বের শান্তির দখল প্রমাণ করে ৬ মাসের মধ্যে দখল পুনরুদ্ধারের দ্রুত মামলা করা যায়।'
    },
    caution: {
      en: 'Suit must be filed within exactly 6 months from the date of dispossession; cannot be brought against the Government.',
      bn: 'বেদখল হওয়ার তারিখ থেকে অনধিক ৬ মাসের মধ্যে মামলা করতে হবে; ৬ মাস পেরিয়ে গেলে এই ধারার সুবিধা পাওয়া যায় না।'
    },
    keywords: ['specific relief 9', 'fast possession recovery', '6 months suit', 'dokhol punoruddhar', 'বেদখল উদ্ধার', '৬ মাসের মধ্যে মামলা', 'দখল বজায় রাখা']
  }),
  entry({
    id: 'rent-control-18',
    category: 'land',
    act: rentControl,
    section: 'Section 18',
    title: { en: 'Protection against arbitrary eviction of tenants', bn: 'ভাড়াটিয়াকে নোটিশ ছাড়া ও জোরপূর্বক উচ্ছেদ প্রতিরোধ' },
    quote: 'যে পর্যন্ত ভাড়াটিয়া নিয়মিত ভাড়া পরিশোধ করিবেন, সে পর্যন্ত বাড়িভাড়া নিয়ন্ত্রণ কর্মকর্তার পূর্বানুমতি বা আদালতের ডিক্রি ব্যতীত কোনো বাড়িওয়ালা ভাড়াটিয়াকে উচ্ছেদ করিতে পারিবেন না।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-750/section-22683.html',
    explanation: {
      en: 'Under Section 18 of the Premises Rent Control Act 1991, as long as a tenant pays rent regularly within the statutory deadline (by the 15th of the following month or agreed contract date), the landlord cannot arbitrarily evict them or cut off utility lines without a formal civil court eviction decree.',
      bn: 'নিয়মিত ভাড়া পরিশোধ করা অবস্থায় বাড়িওয়ালা ভাড়াটিয়াকে জোরপূর্বক উচ্ছেদ করতে পারেন না বা পানি-বিদ্যুৎ-গ্যাসের লাইন কাটতে পারেন না।'
    },
    caution: {
      en: 'ভাড়া পরিশোধের লিখিত মানি রিসিট সংগ্রহ করুন। বাড়িওয়ালা ভাড়া নিতে অস্বীকৃতি জানালে খেলাপ এড়াতে ১৫ দিনের মধ্যে বাড়িভাড়া নিয়ন্ত্রণ কর্মকর্তার (Rent Controller) কার্যালয়ে চালানের মাধ্যমে ভাড়া জমা দেওয়া আবশ্যক।',
      bn: 'ভাড়ার মানি রিসিট সংগ্রহ করুন; বাড়িওয়ালা ভাড়া নিতে অস্বীকৃতি জানালে ভাড়া নিয়ন্ত্রণ আদালতে ভাড়া জমা দেওয়া যায়।'
    },
    keywords: ['tenant eviction', 'landlord harassment', 'rent control', 'bharatiya uchhed', 'ভাড়াটিয়া উচ্ছেদ', 'বাড়িওয়ালা ঝামেলা', 'ভাড়া নিয়ন্ত্রণ']
  }),
  entry({
    id: 'sat-143',
    category: 'land',
    act: satAct,
    section: 'Section 143',
    title: { en: 'Mutation of record-of-rights (Namjari at AC Land Office)', bn: 'নামজারি ও রেকর্ড হালনাগাদ (এসি ল্যান্ড অফিস)' },
    quote: 'সহকারী কমিশনার (ভূমি) হস্তান্তরিত ভূমির নামজারি ও জমাখারিজ সম্পন্ন করিয়া খতিয়ান হালনাগাদ করিবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-243/section-8739.html',
    explanation: {
      en: 'Section 143 mandates that every buyer or inheritor of land must apply for Mutation (Namjari/Jomakharij) at the Assistant Commissioner (Land) office to create a new recorded Khatian in their name.',
      bn: 'জমি কেনার পর সহকারী কমিশনার (ভূমি) বা এসি ল্যান্ড অফিসে নামজারি (জমাখারিজ) আবেদন করে নিজের নামে খতিয়ান তৈরি করা আবশ্যক।'
    },
    caution: {
      en: 'Mutation can be done online at mutation.land.gov.bd; standard government fee is fixed at 1,170 taka.',
      bn: 'অনলাইনে (mutation.land.gov.bd) নামজারি করা যায় এবং মোট সরকারি ফি নির্দিষ্টভাবে ১,১৭০ টাকা।'
    },
    keywords: ['mutation', 'namjari', 'ac land', 'jomakharij', '1170 taka', 'নামজারি', 'জমাখারিজ', 'এসি ল্যান্ড', 'খতিয়ান হালনাগাদ']
  }),

  // =========================================================================
  // CATEGORY 6: DOMESTIC VIOLENCE & FAMILY PROTECTION (12 Provisions)
  // =========================================================================
  entry({
    id: 'domestic-3',
    category: 'family',
    act: domestic,
    section: 'Section 3',
    title: { en: 'Comprehensive recognition of domestic violence', bn: 'পারিবারিক সহিংসতার পূর্ণাঙ্গ সংজ্ঞা' },
    quote: 'পারিবারিক সহিংসতা বলিতে কোনো ব্যক্তি কর্তৃক পরিবারের অন্য কোনো ব্যক্তির বিরুদ্ধে শারীরিক, মানসিক, যৌন অথবা আর্থিক নির্যাতনকে বুঝাইবে।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1059/section-33758.html',
    explanation: {
      en: 'Section 3 broadly defines domestic violence: it includes physical assault, psychological humiliation, verbal abuse, sexual coercion, and economic deprivation (denying food, clothes, or medical expenses).',
      bn: 'পারিবারিক সহিংসতা শুধু মারধর নয়; মানসিক নির্যাতন, অকথ্য ভাষায় অপমান, আর্থিক বঞ্চনা (খাবার-চিকিৎসা খরচ না দেওয়া) পারিবারিক সহিংসতার অন্তর্ভুক্ত।'
    },
    caution: {
      en: 'Victims can seek immediate free protection orders through the Judicial Magistrate Court without filing for divorce.',
      bn: 'তালাক না দিয়েও স্ত্রী বা নির্যাতিত সদস্য পারিবারিক সহিংসতা সুরক্ষা আইনে আদালতের নিরাপত্তা আদেশ পেতে পারেন।'
    },
    keywords: ['domestic violence', 'mental torture', 'economic abuse', 'paribarik shohingshota', 'পারিবারিক সহিংসতা', 'মানসিক নির্যাতন', 'গার্হস্থ্য সহিংসতা']
  }),
  entry({
    id: 'domestic-11',
    category: 'family',
    act: domestic,
    section: 'Section 11',
    title: { en: 'Applying for Judicial Protection Orders from Court', bn: 'আদালতের মাধ্যমে সুরক্ষা আদেশ (Protection Order) প্রার্থনা' },
    quote: 'পারিবারিক সহিংসতার শিকার ব্যক্তি নিজে অথবা তাঁহার পক্ষে কোনো কর্মকর্তা বা আইনজীবী ম্যাজিস্ট্রেটের নিকট সুরক্ষা আদেশের জন্য আবেদন করিতে পারিবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1059/section-33766.html',
    explanation: {
      en: 'Section 11 empowers victims to apply to the Judicial Magistrate for an immediate Protection Order, barring the perpetrator from committing further violence or contacting the victim.',
      bn: 'নির্যাতনের শিকার ব্যক্তি জুডিশিয়াল ম্যাজিস্ট্রেটের কাছে আবেদন করে সুরক্ষা আদেশ পেতে পারেন। আদালত নির্যাতনকারীকে নির্যাতনের পুনরাবৃত্তি না করার কড়া নির্দেশ দেন।'
    },
    caution: {
      en: 'Breaching a protection order is a criminal offense punishable by imprisonment and fine under Section 30.',
      bn: 'আদালতের সুরক্ষা আদেশ অমান্য করা ফৌজদারি অপরাধ এবং নির্যাতনকারীর জেল হতে পারে।'
    },
    keywords: ['protection order', 'court protection', 'magistrate order', 'shurokkha adesh', 'সুরক্ষা আদেশ', 'আদালতের নিরাপত্তা', 'ম্যাজিস্ট্রেট আদালত']
  }),
  entry({
    id: 'domestic-14',
    category: 'family',
    act: domestic,
    section: 'Section 14',
    title: { en: 'Right to reside safely in shared household without eviction', bn: 'যৌথ পরিবার বা বাসগৃহে নিরাপদে বসবাসের অধিকার' },
    quote: 'আদালত ক্ষতিগ্রস্ত ব্যক্তিকে যৌথ পরিবারের বসতবাড়িতে নিরাপদে বসবাসের অধিকার প্রদান করিতে পারিবেন এবং তাঁহাকে গৃহ হইতে উচ্ছেদ করা নিষিদ্ধ করিতে পারিবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1059/section-33769.html',
    explanation: {
      en: 'Section 14 prevents a husband or in-laws from throwing a woman out of the matrimonial home. The court can issue a Residence Order securing her right to stay in the shared household safely.',
      bn: 'স্ত্রী বা ভুক্তভোগীকে তার বৈবাহিক বসতবাড়ি থেকে জোরপূর্বক বের করে দেওয়া যাবে না। আদালত বসতবাড়িতে নিরাপদে থাকার রেসিডেন্স আদেশ জারি করতে পারেন।'
    },
    caution: {
      en: 'If in-laws lock the doors or throw out belongings, the court can direct local police to escort the victim back inside.',
      bn: 'শ্বশুরবাড়ি থেকে বের করে দিলে আদালতের নির্দেশে পুলিশ ভুক্তভোগীকে পুনরায় ঘরে ফিরিয়ে দেওয়ার ব্যবস্থা করে।'
    },
    keywords: ['residence order', 'eviction protection', 'matrimonial home', 'bari theke ber kore deoya', 'বাড়ি থেকে বের করে দেওয়া', 'বসবাসের অধিকার', 'রেসিডেন্স অর্ডার']
  }),
  entry({
    id: 'domestic-15',
    category: 'family',
    act: domestic,
    section: 'Section 15',
    title: { en: 'Monetary relief, emergency medical costs & maintenance', bn: 'আর্থিক ক্ষতিপূরণ, চিকিৎসা ব্যয় ও ভরণপোষণ আদেশ' },
    quote: 'ম্যাজিস্ট্রেট নির্যাতনকারীকে ক্ষতিগ্রস্ত ব্যক্তির চিকিৎসা খরচ, পারিবারিক ব্যয় এবং ভরণপোষণের জন্য প্রয়োজনীয় আর্থিক ক্ষতিপূরণ প্রদানের নির্দেশ দিতে পারিবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1059/section-33770.html',
    explanation: {
      en: 'Under Section 15, the Magistrate can order the abuser to pay immediate monetary relief for medical treatment, damages, and interim maintenance for the victim and her children.',
      bn: 'আদালত নির্যাতনকারীকে চিকিৎসার ব্যয়ভার এবং স্ত্রী ও সন্তানের মাসিক ভরণপোষণ প্রদানের জন্য ক্ষতিপূরণ আদেশ দিতে পারেন।'
    },
    caution: {
      en: 'Keep all hospital receipts, doctor bills, and pharmacy slips to justify the exact medical expenses claimed.',
      bn: 'চিকিৎসার প্রেসক্রিপশন, টেস্টের রসিদ ও ওষুধের ভাউচার আদালতে প্রমাণের জন্য জমা দিন।'
    },
    keywords: ['monetary relief', 'medical expenses', 'maintenance order', 'khotipuron', 'চিকিৎসা ব্যয়', 'আর্থিক ক্ষতিপূরণ', 'ভরণপোষণ']
  }),
  entry({
    id: 'dowry-2018-3',
    category: 'family',
    act: dowryAct,
    section: 'Section 3',
    title: { en: 'Punishment for demanding dowry (Up to 5 years imprisonment)', bn: 'যৌতুক দাবি করার শাস্তি (১ থেকে ৫ বছর কারাদণ্ড)' },
    quote: 'যদি কোনো ব্যক্তি প্রত্যক্ষ বা পরোক্ষভাবে বর বা কনের পিতা-মাতা বা অভিভাবকের নিকট কোনো যৌতুক দাবি করেন, তবে তিনি অনধিক ৫ বৎসর কিন্তু অন্যূন ১ বৎসর কারাদণ্ড বা অনধিক ৫০,০০০ টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1249/section-39655.html',
    explanation: {
      en: 'Section 3 of the Dowry Prohibition Act 2018 makes demanding dowry from the bride, groom, or their family a serious cognizable offense carrying 1 to 5 years imprisonment and up to 50,000 taka fine.',
      bn: 'বিয়ের পূর্বে বা পরে বর বা কনেপক্ষের নিকট যৌতুক হিসেবে টাকা, মোটরসাইকেল, ফ্ল্যাট বা সম্পত্তি দাবি করা ১ থেকে ৫ বছরের কারাদণ্ডযোগ্য অপরাধ।'
    },
    caution: {
      en: 'Cognizable and non-bailable offense. Report directly to the police station or Magistrate Court with witness evidence.',
      bn: 'যৌতুক দাবি একটি জামিন-অযোগ্য অপরাধ; নিকটস্থ থানা বা জুডিশিয়াল ম্যাজিস্ট্রেট আদালতে সরাসরি মামলা করা যায়।'
    },
    keywords: ['dowry demand', 'dowry act 2018', 'joutuk dabi', 'যৌতুক দাবি', 'যৌতুক চাওয়া', 'পণের দাবি', 'যৌতুক নিরোধ আইন']
  }),
  entry({
    id: 'dowry-2018-4',
    category: 'family',
    act: dowryAct,
    section: 'Section 4',
    title: { en: 'Penalty for giving or taking dowry', bn: 'যৌতুক প্রদান বা গ্রহণের শাস্তি' },
    quote: 'যদি কোনো ব্যক্তি যৌতুক প্রদান করেন বা গ্রহণ করেন অথবা সহায়তা করেন, তবে তিনি অনধিক ৫ বৎসর কারাদণ্ড বা ৫০,০০০ টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1249/section-39656.html',
    explanation: {
      en: 'Giving, taking, or abetting dowry is illegal. Customary voluntary wedding gifts within reasonable limits are permitted, but demanding conditional marriage consideration is punishable.',
      bn: 'যৌতুক নেওয়া এবং দেওয়া উভয়ই আইনত দণ্ডনীয়। তবে স্বেচ্ছায় প্রদত্ত সাধারণ উপহার (যা যৌতুকের শর্ত হিসেবে চাওয়া হয়নি) এর অন্তর্ভুক্ত নয়।'
    },
    caution: {
      en: 'Coerced agreements signed under marriage threats can be voided in court.',
      bn: 'চাপ প্রয়োগ করে যৌতুকের অঙ্গিকারনামা লিখিয়ে নিলে তা আদালতে অকার্যকর হিসেবে গণ্য হবে।'
    },
    keywords: ['giving dowry', 'taking dowry', 'joutuk grohon', 'যৌতুক দেওয়া', 'যৌতুক গ্রহণ', 'যৌতুকের চুক্তি']
  }),
  entry({
    id: 'mflo-7',
    category: 'family',
    act: mflo,
    section: 'Section 7',
    title: { en: 'Statutory Talaq / Divorce procedure & 90-day reconciliation notice', bn: 'তালাকের আইনি নোটিশ ও ৯০ দিন অপেক্ষার নিয়ম' },
    quote: 'Any man who wishes to divorce his wife shall... as soon as may be after the pronouncement of talaq... give the Chairman notice in writing of his having done so, and shall supply a copy thereof to the wife.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-305/section-10499.html',
    explanation: {
      en: 'Under Section 7 of Muslim Family Laws Ordinance 1961, pronouncing verbal divorce has zero legal effect without serving written notice to the local Union Parishad / City Corporation Chairman and a registered copy to the wife. Divorce becomes effective only 90 days after delivery of notice.',
      bn: 'মুখে তালাক বললেই তালাক কার্যকর হয় না। স্থানীয় ইউপি চেয়ারম্যান বা ওয়ার্ড কাউন্সিলরকে লিখিত নোটিশ দিতে হবে এবং স্ত্রীর কাছে রেজিস্ট্রি ডাকযোগে কপি পাঠাতে হবে। নোটিশ প্রাপ্তির ৯০ দিন পর তালাক কার্যকর হয়।'
    },
    caution: {
      en: 'Failing to serve notice to the Chairman is punishable with up to 1 year imprisonment under Section 7(2).',
      bn: 'চেয়ারম্যানকে নোটিশ না দিয়ে তালাক দিলে ১ বছর পর্যন্ত কারাদণ্ড বা অর্থদণ্ড হতে পারে।'
    },
    keywords: ['talaq notice', 'divorce procedure', '90 days notice', 'talak niyam', 'তালাকের নোটিশ', 'তালাক কার্যকর', '৯০ দিন সময়সীমা', 'চেয়ারম্যান নোটিশ']
  }),
  entry({
    id: 'mflo-9',
    category: 'family',
    act: mflo,
    section: 'Section 9',
    title: { en: 'Right to maintenance for wife and minor children', bn: 'স্ত্রী ও সন্তানের ভরণপোষণের আইনগত অধিকার' },
    quote: 'If any husband fails to maintain his wife adequately... the wife may apply to the Chairman who shall constitute an Arbitration Council to issue a certificate specifying the amount of maintenance.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-305/section-10501.html',
    explanation: {
      en: 'A husband is legally bound to provide adequate food, clothing, shelter, and medical care for his wife and minor children. If neglected, the wife can apply to the Arbitration Council or Family Court for maintenance.',
      bn: 'স্ত্রী ও সন্তানের নিয়মিত খাদ্য, পোশাক, বাসস্থান ও চিকিৎসা নিশ্চিত করা স্বামীর আইনি দায়িত্ব। স্বামী অবহেলা করলে পারিবারিক আদালত বা চেয়ারম্যানের মাধ্যমে বকেয়া ও নিয়মিত ভরণপোষণ আদায় করা যায়।'
    },
    caution: {
      en: 'Maintenance can be recovered through court attachment of the husband’s salary or property.',
      bn: 'স্বামীর বেতন বা সম্পত্তি ক্রোক করে আদালতের মাধ্যমে ভরণপোষণের অর্থ আদায় করা সম্ভব।'
    },
    keywords: ['maintenance', 'child support', 'wife maintenance', 'khorpoch', 'খোরপোশ', 'ভরণপোষণ', 'স্ত্রীর খরচ', 'সন্তানের ভরণপোষণ']
  }),
  entry({
    id: 'mflo-10',
    category: 'family',
    act: mflo,
    section: 'Section 10',
    title: { en: 'Dower (Mahr) recovery & immediate payment on demand', bn: 'দেনমোহরের দাবি ও তাৎক্ষণিক পরিশোধের বাধ্যবাধকতা' },
    quote: 'Where no details about the mode of payment of dower are specified in the nikahnama... the entire amount of the dower shall be presumed to be payable on demand.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-305/section-10502.html',
    explanation: {
      en: 'Section 10 confirms that Mahr (Dower) recorded in the Nikahnama is an unconditional legal debt. "Prompt dower" is payable immediately upon demand during marriage; "deferred dower" is payable upon divorce or death.',
      bn: 'কাবিননামায় উল্লেখিত দেনমোহর স্ত্রীর একচ্ছত্র আইনগত পাওনা। দেনমোহর মাফ করা না হলে স্বামী যে কোনো সময় তা পরিশোধ করতে বাধ্য। তালাক হলেও দেনমোহর কোনোভাবেই বাতিল হয় না।'
    },
    caution: {
      en: 'Dower can be claimed by filing a suit before the Family Court; limitation is 3 years from demand or divorce.',
      bn: 'দেনমোহর আদায়ের জন্য পারিবারিক আদালতে মামলা করা যায়; তালাকের ৩ বছরের মধ্যে মামলা করতে হয়।'
    },
    keywords: ['dower', 'mahr', 'nikahnama', 'denmohor', 'দেনমোহর', 'কাবিনের টাকা', 'দেনমোহর দাবি', 'মোহরানা']
  }),
  entry({
    id: 'family-court-2023-4',
    category: 'family',
    act: familyCourtAct,
    section: 'Section 4 & 5',
    title: { en: 'Exclusive jurisdiction of Family Courts over 5 matrimonial matters', bn: 'পারিবারিক আদালতের ৫টি বিষয়ে একক এখতিয়ার' },
    quote: 'পারিবারিক আদালত নিম্নবর্ণিত বিষয়ে দেওয়ানি বিরোধ নিষ্পত্তির জন্য একক এখতিয়ারবান থাকিবে: (ক) বিবাহ বিচ্ছেদ, (খ) দাম্পত্য অধিকার পুনরুদ্ধার, (গ) দেনমোহর, (ঘ) ভরণপোষণ, এবং (ঙ) সন্তানের অভিভাবকত্ব ও তত্ত্বাবধান।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1440/section-41700.html',
    explanation: {
      en: 'The Family Courts Act 2023 grants Family Courts exclusive jurisdiction over: (1) dissolution of marriage, (2) restitution of conjugal rights, (3) dower, (4) maintenance, and (5) child custody.',
      bn: 'পারিবারিক আদালত আইন ২০২৩ অনুযায়ী সাধারণ দেওয়ানি আদালতের বদলে সহকারী জজ পদমর্যাদার পারিবারিক আদালত মাত্র পাঁচটি বিষয়ে মামলা দ্রুত নিষ্পত্তি করে।'
    },
    caution: {
      en: 'Fixed court fee for filing a family suit is nominal (under 100 taka).',
      bn: 'পারিবারিক আদালতে মামলা করার কোর্ট ফি অত্যন্ত নামমাত্র (মাত্র ১০০ টাকার কম)।'
    },
    keywords: ['family court', 'divorce suit', 'custody suit', 'paribarik adalat', 'পারিবারিক আদালত', 'পারিবারিক মামলা', 'দেনমোহরের মামলা', 'দাম্পত্য অধিকার']
  }),
  entry({
    id: 'guardians-17',
    category: 'family',
    act: guardiansAct,
    section: 'Section 17 & 25',
    title: { en: 'Child custody governed by the Welfare of the Minor', bn: 'সন্তানের হেফাজত ও অভিভাবকত্বে শিশুর কল্যাণ প্রাধান্য' },
    quote: 'In appointing or declaring the guardian of a minor, the Court shall... be guided by what... appears in the circumstances to be for the welfare of the minor.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-64/section-2200.html',
    explanation: {
      en: 'Under Sections 17 & 25 of the Guardians and Wards Act 1890, the Supreme Court of Bangladesh has ruled that the Welfare of the Minor Child supersedes all absolute parental rights in deciding custody and guardianship.',
      bn: 'সন্তানের কাস্টডি বা হেফাজত নির্ধারণে আদালতের প্রধান বিবেচ্য বিষয় হলো শিশুর সর্বোচ্চ কল্যাণ (Welfare of the Child)। মা উপযুক্ত পরিবেশ দিতে পারলে মাকেই সাধারণত সন্তানের হেফাজত দেওয়া হয়।'
    },
    caution: {
      en: 'A father cannot forcibly snatch a child from the mother’s custody without a Family Court order.',
      bn: 'আদালতের আদেশ ছাড়া বাবা বা তার পরিবার মায়ের হেফাজত থেকে জোরপূর্বক বাচ্চাকে ছিনিয়ে নিতে পারেন না।'
    },
    keywords: ['child custody', 'welfare of child', 'hizanat', 'sontan hefajot', 'সন্তানের হেফাজত', 'বাচ্চার কাস্টডি', 'শিশুর কল্যাণ', 'অভিভাবকত্ব']
  }),
  entry({
    id: 'child-marriage-2017-7',
    category: 'family',
    act: childMarriageAct,
    section: 'Section 7',
    title: { en: 'Prohibition and criminal punishment for contracting child marriage', bn: 'বাল্যবিয়ে সম্পাদন বা অনুষ্ঠানের শাস্তি' },
    quote: 'কোনো প্রাপ্তবয়স্ক ব্যক্তি যদি কোনো অপ্রাপ্তবয়স্ক ব্যক্তির সহিত বাল্যবিয়ে অনুষ্ঠান করেন, তবে তিনি অনধিক ২ বৎসর কারাদণ্ড বা অনধিক ১ লক্ষ টাকা অর্থদণ্ডে দণ্ডিত হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1200/section-37989.html',
    explanation: {
      en: 'The Child Marriage Restraint Act 2017 sets minimum marriage age at 18 for females and 21 for males. Contracting or solemnizing child marriage carries up to 2 years imprisonment.',
      bn: '১৮ বছরের কম বয়সী মেয়ে বা ২১ বছরের কম বয়সী ছেলের বাল্যবিয়ে সম্পাদন করা শাস্তিযোগ্য অপরাধ। এতে ২ বছর পর্যন্ত কারাদণ্ড বা ১ লাখ টাকা জরিমানা হতে পারে।'
    },
    caution: {
      en: 'Citizens can report any imminent child marriage to National Helpline 109 or 999 for immediate administrative injunction.',
      bn: 'বাল্যবিয়ের খবর পেলে জাতীয় হেল্পলাইন ১০৯ অথবা ৯৯৯-এ জানালে ইউএনও বা নির্বাহী ম্যাজিস্ট্রেট তা অবিলম্বে বন্ধ করেন।'
    },
    keywords: ['child marriage', 'underage marriage', '109 hotline', 'balyo bibaho', 'বাল্যবিয়ে', 'বাল্যবিবাহ নিরোধ', '১০৯ হেল্পলাইন', 'অপ্রাপ্তবয়স্ক বিয়ে']
  }),

  // =========================================================================
  // CATEGORY 7: FUNDAMENTAL RIGHTS & FREE LEGAL AID (14 Provisions)
  // =========================================================================
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
      en: 'Article 27 gives citizens equality before the law and equal legal protection against arbitrary discrimination by state authorities.',
      bn: 'অনুচ্ছেদ ২৭ অনুযায়ী সকল নাগরিক আইনের দৃষ্টিতে সমান এবং আইনের সমান আশ্রয় লাভের অধিকারী।'
    },
    caution: {
      en: 'Fundamental rights violations can be challenged before the High Court Division under Article 102.',
      bn: 'বৈষম্যমূলক সিদ্ধান্তের বিরুদ্ধে সুপ্রিম কোর্টের হাইকোর্ট বিভাগে রিট পিটিশন দায়ের করা যায়।'
    },
    keywords: ['equality', 'equal protection', 'discrimination', 'somota', 'আইনের সমান আশ্রয়', 'সমতা', 'নাগরিক অধিকার']
  }),
  entry({
    id: 'constitution-28',
    category: 'rights',
    act: constitution,
    section: 'Article 28',
    title: { en: 'Protection from discrimination on grounds of religion, race, sex', bn: 'ধর্ম, বর্ণ, লিঙ্গভেদে বৈষম্য থেকে সুরক্ষা' },
    quote: 'The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex or place of birth.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24576.html',
    explanation: {
      en: 'The State cannot discriminate against any citizen solely on grounds of religion, gender, caste, or birthplace in public appointments or access to public places.',
      bn: 'রাষ্ট্র ধর্ম, বর্ণ, জাত, লিঙ্গ বা জন্মস্থানের কারণে কোনো নাগরিকের প্রতি বৈষম্য করতে পারবে না। সকল ক্ষেত্রে নারী-পুরুষের সমঅধিকার নিশ্চিত করা হয়েছে।'
    },
    caution: {
      en: 'Permits special legal provisions for women, children, and disadvantaged groups.',
      bn: 'নারী, শিশু ও অনগ্রসর নাগরিকদের অগ্রগতির জন্য বিশেষ সুবিধা প্রদান সংবিধানসিদ্ধ।'
    },
    keywords: ['non discrimination', 'gender equality', 'boisomyoo', 'বৈষম্যহীনতা', 'লিঙ্গ সমতা', 'সংবিধান ২৮']
  }),
  entry({
    id: 'constitution-31',
    category: 'rights',
    act: constitution,
    section: 'Article 31',
    title: { en: 'Right to be treated only in accordance with law', bn: 'আইন অনুযায়ী আচরণ পাওয়ার অধিকার' },
    quote: 'no action detrimental to the life, liberty, body, reputation or property of any person shall be taken except in accordance with law.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24579.html',
    explanation: {
      en: 'Article 31 guarantees that no action detrimental to life, liberty, body, reputation, or property can be taken by any public authority except in strict accordance with law.',
      bn: 'আইন ছাড়া কোনো ব্যক্তির জীবন, ব্যক্তিস্বাধীনতা, সুনাম বা সম্পত্তির ক্ষতিসাধন করে এমন কোনো ব্যবস্থা গ্রহণ করা যাবে না।'
    },
    caution: {
      en: 'State authorities cannot seize property or freeze accounts without explicit statutory backing.',
      bn: 'আইনের যথাযথ কর্তৃত্ব ছাড়া পুলিশ বা সরকারি কোনো সংস্থা জোরপূর্বক সম্পত্তি বাজেয়াপ্ত করতে পারে না।'
    },
    keywords: ['rule of law', 'due process', 'liberty', 'আইনের শাসন', 'ব্যক্তিস্বাধীনতা রক্ষা', 'সংবিধান ৩১']
  }),
  entry({
    id: 'constitution-32',
    category: 'rights',
    act: constitution,
    section: 'Article 32',
    title: { en: 'Protection of right to life and personal liberty', bn: 'জীবন ও ব্যক্তিস্বাধীনতার মৌলিক অধিকার' },
    quote: 'No person shall be deprived of life or personal liberty save in accordance with law.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24580.html',
    explanation: {
      en: 'Article 32 guarantees that no person shall be deprived of life or personal liberty without lawful process, protecting against unlawful arrests, extrajudicial torture, or enforced disappearance.',
      bn: 'আইনসঙ্গত প্রক্রিয়া ছাড়া কোনো ব্যক্তির জীবন ও ব্যক্তিগত স্বাধীনতা হরণ করা যাবে না। এটি নাগরিকের সবচেয়ে বড় সাংবিধানিক রক্ষা কবচ।'
    },
    caution: {
      en: 'Enforceable via Habeas Corpus writ petitions before the High Court Division under Article 102.',
      bn: 'বেআইনি আটকের বিরুদ্ধে হাইকোর্টে হেবিয়াস কর্পাস রিট করার অধিকার রয়েছে।'
    },
    keywords: ['right to life', 'habeas corpus', 'illegal detention', 'জীবন রক্ষা', 'ব্যক্তিস্বাধীনতা', 'হেবিয়াস কর্পাস']
  }),
  entry({
    id: 'constitution-33',
    category: 'rights',
    act: constitution,
    section: 'Article 33(1)–(3)',
    title: { en: 'Rights after an arrest: reason disclosure and lawyer consultation', bn: 'গ্রেপ্তার ব্যক্তির অধিকার: কারণ প্রকাশ ও আইনজীবীর পরামর্শ' },
    quote: 'No person who is arrested shall be detained in custody without being informed... of the grounds for such arrest, nor shall he be denied the right to consult and be defended by a legal practitioner of his choice.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24581.html',
    explanation: {
      en: 'Arrested persons must be promptly informed of the reasons for their arrest and cannot be denied the right to consult and be defended by a lawyer of their choice.',
      bn: 'গ্রেপ্তার হওয়া ব্যক্তিকে তাৎক্ষণিকভাবে গ্রেপ্তারের কারণ জানাতে হবে এবং তার পছন্দের আইনজীবীর সাথে পরামর্শ করার সুযোগ দিতে হবে।'
    },
    caution: {
      en: 'Demanding to speak with a defense advocate immediately upon arrest is a constitutional right.',
      bn: 'গ্রেপ্তারের পরপরই আইনজীবীর সাথে পরামর্শ চাওয়া নাগরিকের সাংবিধানিক অধিকার।'
    },
    keywords: ['arrest rights', 'lawyer consult', 'arrest grounds', 'আইনজীবীর পরামর্শ', 'গ্রেপ্তারের কারণ', 'সংবিধান ৩৩']
  }),
  entry({
    id: 'constitution-35',
    category: 'rights',
    act: constitution,
    section: 'Article 35(4)–(6)',
    title: { en: 'Protection against torture and compelled testimony', bn: 'নির্যাতন ও জোরপূর্বক সাক্ষ্যগ্রহণ থেকে সুরক্ষা' },
    quote: 'No person accused of any offence shall be compelled to be a witness against himself. No person shall be subjected to torture or to cruel, inhuman, or degrading punishment or treatment.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24583.html',
    explanation: {
      en: 'Article 35 guarantees right against self-incrimination (cannot be forced to confess) and strictly forbids physical or psychological torture in police custody.',
      bn: 'কোনো আসামিকে নিজের বিরুদ্ধে সাক্ষ্য দিতে বাধ্য করা যাবে না এবং কাউকে নির্যাতন বা নিষ্ঠুর, অমানুষিক বা লাঞ্ছনাকর দণ্ড বা আচরণ করা যাবে না।'
    },
    caution: {
      en: 'Confessions extracted by police torture are legally inadmissible in criminal trials.',
      bn: 'মারধর করে বা জোরপূর্বক নেওয়া স্বীকারোক্তি আদালতে সাক্ষ্য হিসেবে গ্রহণযোগ্য নয়।'
    },
    keywords: ['anti torture', 'custodial abuse', 'forced confession', 'নির্যাতন নিষেধ', 'স্বীকারোক্তি', 'সংবিধান ৩৫']
  }),
  entry({
    id: 'constitution-44',
    category: 'rights',
    act: constitution,
    section: 'Article 44(1)',
    title: { en: 'Right to enforce fundamental rights before the High Court', bn: 'মৌলিক অধিকার বলবৎকরণে হাইকোর্টে রিটের অধিকার' },
    quote: 'The right to move the High Court Division in accordance with clause (1) of article 102, for the enforcement of the rights conferred by this Part, is guaranteed.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-367/section-24592.html',
    explanation: {
      en: 'Article 44 guarantees every citizen direct access to the High Court Division under Article 102 to enforce any violated fundamental right against state power.',
      bn: 'সংবিধানের তৃতীয় ভাগের যেকোনো মৌলিক অধিকার লঙ্ঘিত হলে সরাসরি সুপ্রিম কোর্টের হাইকোর্ট বিভাগে রিট পিটিশন দায়ের করার অধিকার নিশ্চিত রয়েছে।'
    },
    caution: {
      en: 'A writ petition requires representation by an enrolled Supreme Court advocate.',
      bn: 'হাইকোর্টে রিট মামলা দায়ের করতে সুপ্রিম কোর্টের তালিকাভুক্ত আইনজীবীর সহায়তা প্রয়োজন।'
    },
    keywords: ['writ petition', 'high court', 'fundamental rights', 'রিট পিটিশন', 'হাইকোর্ট বিভাগ', 'সংবিধান ৪৪', 'মৌলিক অধিকার']
  }),
  entry({
    id: 'crpc-54',
    category: 'rights',
    act: crpc,
    section: 'Section 54',
    title: { en: 'Arrest without warrant & Supreme Court Blast safeguards', bn: 'বিনা পরোয়ানায় গ্রেপ্তার ও সুপ্রিম কোর্টের ব্লাস্ট মামলার নির্দেশাবলী' },
    quote: 'Any police officer may, without an order from a Magistrate and without a warrant, arrest any person... concerned in any cognizable offence.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-75/section-2292.html',
    explanation: {
      en: 'Section 54 authorizes warrantless arrest for cognizable offenses, but the Supreme Court (Blast v. Bangladesh) established mandatory safeguards: police must show ID, inform relatives within 3 hours, record reasons in diary, and medically examine the detainee.',
      bn: 'বিনা পরোয়ানায় গ্রেপ্তারকালে সুপ্রিম কোর্টের নির্দেশনা অনুযায়ী পুলিশকে নিজের পরিচয়পত্র দেখাতে হবে, ৩ ঘণ্টার মধ্যে আত্মীয়স্বজনকে জানাতে হবে এবং ডায়রিতে লিপিবদ্ধ করতে হবে।'
    },
    caution: {
      en: 'Plainclothes arrest without showing official identity is a direct violation of Supreme Court appellate directives.',
      bn: 'সাদা পোশাকে পরিচয় না দিয়ে কাউকে তুলে নিয়ে যাওয়া সুপ্রিম কোর্টের রায়ের সুস্পষ্ট লঙ্ঘন।'
    },
    keywords: ['arrest without warrant', 'blast judgment', 'police arrest', 'bina porowanay arrest', 'বিনা পরোয়ানায় গ্রেপ্তার', 'ব্লাস্ট রায়', 'পুলিশের ক্ষমতা']
  }),
  entry({
    id: 'crpc-61',
    category: 'rights',
    act: crpc,
    section: 'Section 61',
    title: { en: 'Mandatory production before Magistrate within 24 hours', bn: 'গ্রেপ্তারের ২৪ ঘণ্টার মধ্যে ম্যাজিস্ট্রেটের সামনে হাজির করার বাধ্যবাধকতা' },
    quote: 'No police-officer shall detain in custody a person arrested without warrant for a longer period than... twenty-four hours exclusive of the time necessary for the journey...',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-75/section-2300.html',
    explanation: {
      en: 'Section 61 and Constitution Art 33(2) prohibit holding an arrested person in police custody for more than 24 hours (excluding travel time) without the express order of a Magistrate.',
      bn: 'গ্রেপ্তারের ২৪ ঘণ্টার মধ্যে (যাতায়াতের সময় বাদে) গ্রেপ্তারকৃত ব্যক্তিকে অবশ্যই আদালতে ম্যাজিস্ট্রেটের সামনে হাজির করতে হবে। ২৪ ঘণ্টার বেশি থানায় আটকে রাখা বেআইনি।'
    },
    caution: {
      en: 'If detained over 24 hours without court production, family members should file an urgent application before the Chief Judicial/Metropolitan Magistrate.',
      bn: '২৪ ঘণ্টার বেশি থানায় আটকে রাখলে পরিবারের পক্ষ থেকে দ্রুত চিফ জুডিশিয়াল ম্যাজিস্ট্রেট আদালতে আবেদন জমা দিন।'
    },
    keywords: ['24 hours court', 'police lockup', 'illegal detention', '২৪ ঘণ্টার মধ্যে হাজির', 'বেআইনি আটক', 'থানায় আটকে রাখা']
  }),
  entry({
    id: 'crpc-167',
    category: 'rights',
    act: crpc,
    section: 'Section 167',
    title: { en: 'Police remand procedure & judicial safeguards', bn: 'পুলিশ রিমান্ডের নিয়ম ও ম্যাজিস্ট্রেটের হেফাজত পর্যবেক্ষণ' },
    quote: 'The Magistrate... may authorise the detention of the accused in such custody as such Magistrate thinks fit, for a term not exceeding fifteen days in the whole.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-75/section-2408.html',
    explanation: {
      en: 'Remand is not granted routinely. Under Supreme Court guidelines, Magistrate must record judicial reasons; interrogation must be in a glass room in view; medical examination must be done before and after remand.',
      bn: 'রিমান্ড কোনো স্বয়ংক্রিয় আদেশ নয়। ম্যাজিস্ট্রেটের লিখিত সন্তুষ্টি সাপেক্ষে কাচের কামরায় দৃশ্যমানভাবে জিজ্ঞাসাবাদ করতে হয় এবং রিমান্ডের পূর্বে ও পরে আসামির শারীরিক পরীক্ষা বাধ্যতামূলক।'
    },
    caution: {
      en: 'Defense lawyer has the right to oppose remand and request immediate medical inspection if torture is suspected.',
      bn: 'আইনজীবী আদালতে রিমান্ডের তীব্র বিরোধিতা করতে পারেন এবং আসামির ইনজুরি পরীক্ষার আবেদন জানাতে পারেন।'
    },
    keywords: ['remand', 'police remand', 'interrogation safeguards', 'blast remand guidelines', 'রিমান্ড', 'পুলিশ রিমান্ড', 'ম্যাজিস্ট্রেটের আদেশ', 'জিজ্ঞাসাবাদ']
  }),
  entry({
    id: 'crpc-496',
    category: 'rights',
    act: crpc,
    section: 'Section 496',
    title: { en: 'Bail as a matter of right in bailable offences', bn: 'জামিনযোগ্য অপরাধে জামিন পাওয়া নাগরিকের আইনগত অধিকার' },
    quote: 'When any person... is arrested or detained without warrant... and is prepared at any time... to give bail, such person shall be released on bail.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-75/section-2738.html',
    explanation: {
      en: 'Section 496 entitles an accused in a bailable offense to release on bail as a statutory right. However, release is conditional on furnishing acceptable, solvent sureties (bail bond) to the satisfaction of the court or police officer, or on personal recognizance if certified indigent.',
      bn: 'জামিনযোগ্য অপরাধে জামিন পাওয়া নাগরিকের আইনগত অধিকার। তবে আদালতের সন্তুষ্টি সাপেক্ষে উপযুক্ত ও দায়বদ্ধ জামিনদার (বেইল বন্ড) দাখিল করা জামিনে মুক্তির আবশ্যক শর্ত।'
    },
    caution: {
      en: 'Check the schedule of the Penal Code to confirm whether the charged section is bailable.',
      bn: 'দণ্ডবিধির তফসিলে ধারাটি জামিনযোগ্য কি না তা যাচাই করে অবিলম্বে জামিননামা দাখিল করুন।'
    },
    keywords: ['bailable offence', 'bail as right', 'bail bond', 'jamin', 'জামিনযোগ্য অপরাধ', 'জামিনের অধিকার', 'জামিননামা']
  }),
  entry({
    id: 'crpc-497',
    category: 'rights',
    act: crpc,
    section: 'Section 497',
    title: { en: 'Bail considerations in non-bailable offences', bn: 'অ-জামিনযোগ্য মামলায় আদালত কর্তৃক জামিন বিবেচনা' },
    quote: 'When any person accused of any non-bailable offence is arrested... he may be released on bail... Provided that the Court may direct that any person under sixteen years of age or any woman or any sick or infirm person... be released on bail.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-75/section-2739.html',
    explanation: {
      en: 'In non-bailable cases, courts have discretion to grant bail. The proviso creates special statutory leniency for minors under 16, women, and sick or elderly individuals.',
      bn: 'অ-জামিনযোগ্য মামলায় আদালতের বিচারিক ক্ষমতা রয়েছে। তবে নারী, ১৬ বছরের কম বয়সী কিশোর এবং অসুস্থ বা বৃদ্ধ ব্যক্তিদের ক্ষেত্রে আদালত জামিন প্রদানে বিশেষ সহানুভূতি দেখান।'
    },
    caution: {
      en: 'If bail is rejected by the Magistrate, appeal/revision can be filed before the Sessions Judge or High Court Division.',
      bn: 'ম্যাজিস্ট্রেট আদালতে জামিন নামঞ্জুর হলে জেলা ও দায়রা জজ আদালত বা হাইকোর্টে জামিনের আবেদন করা যায়।'
    },
    keywords: ['non bailable bail', 'court bail', 'anticipatory bail', 'অ-জামিনযোগ্য জামিন', 'দায়রা আদালত', 'জামিন আবেদন']
  }),
  entry({
    id: 'crpc-154',
    category: 'rights',
    act: crpc,
    section: 'Section 154',
    title: { en: 'Mandatory registration of First Information Report (FIR)', bn: 'আমলযোগ্য অপরাধে থানায় বাধ্যতামূলক এজাহার গ্রহণ' },
    quote: 'Every information relating to the commission of a cognizable offence... shall be reduced to writing by the officer in charge of a police-station.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-75/section-2395.html',
    explanation: {
      en: 'Section 154 obligates the Officer-in-Charge to register an FIR when a cognizable offense is disclosed. While statutory law directs registration, in practice police may verify facts or recommend a GD if cognizable injury is absent or unclear. If the police refuse to record an FIR, the citizen’s statutory remedy is filing a Complaint Register (C.R. Case) directly before the Judicial Magistrate under Section 200 CrPC or petitioning the Superintendent of Police (SP).',
      bn: 'আমলযোগ্য অপরাধের তথ্য প্রকাশ পেলে থানার ভারপ্রাপ্ত কর্মকর্তা এজাহার (FIR) লিপিবদ্ধ করতে আইনত বাধ্য। থানা এজাহার নিতে অপারগতা প্রকাশ করলে বা গড়িমসি করলে নাগরিকের সরাসরি জুডিশিয়াল ম্যাজিস্ট্রেট আদালতে সি আর মামলা (নালিশি মামলা) বা পুলিশ সুপারের (SP) নিকট লিখিত দরখাস্ত দেওয়ার আইনি প্রতিকার রয়েছে।'
    },
    caution: {
      en: 'If the police refuse to accept an FIR, the citizen can file a direct Complaint Register (C.R. Case) before the Judicial Magistrate.',
      bn: 'থানা মামলা নিতে অস্বীকার করলে সরাসরি জুডিশিয়াল ম্যাজিস্ট্রেট আদালতে সি আর মামলা (নালিশি মামলা) দায়ের করা যায়।'
    },
    keywords: ['fir', 'first information report', 'cognizable offence', 'ejahar', 'থানায় এজাহার', 'মামলা গ্রহণ', 'এফআইআর', 'সিআর মামলা']
  }),
  entry({
    id: 'custodial-torture-13',
    category: 'rights',
    act: torturePrevention,
    section: 'Section 13',
    title: { en: 'Criminal liability for custodial torture or abuse', bn: 'হেফাজতে নির্যাতন ও মৃত্যু নিবারণ আইনে শাস্তি' },
    quote: 'যদি কোনো আইন প্রয়োগকারী সংস্থার সদস্য কোনো ব্যক্তিকে হেফাজতে নির্যাতন করেন, তবে তিনি অনধিক ৫ বৎসর কিন্তু অন্যূন ২ বৎসর কারাদণ্ডে দণ্ডিত হইবেন।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-1127/section-36224.html',
    explanation: {
      en: 'The Torture and Custodial Death (Prevention) Act 2013 makes physical or mental torture by law enforcement in custody a serious criminal offense punishable by 2 to 5 years imprisonment and 20,000 taka fine payable to the victim.',
      bn: 'আইন প্রয়োগকারী সংস্থার হেফাজতে কাউকে নির্যাতন করা ২ থেকে ৫ বছরের কারাদণ্ডযোগ্য অপরাধ। ভুক্তভোগীকে ক্ষতিপূরণ দেওয়ার সুস্পষ্ট বিধান রয়েছে।'
    },
    caution: {
      en: 'Victims can directly petition the Sessions Judge Court for immediate 24-hour medical examination by an independent civil surgeon.',
      bn: 'নির্যাতনের শিকার ব্যক্তি দায়রা জজ আদালতে সরাসরি অভিযোগ করতে পারেন এবং আদালত ২৪ ঘণ্টার মধ্যে সিভিল সার্জনকে দিয়ে চিকিৎসার আদেশ দেন।'
    },
    keywords: ['custodial torture', 'police brutality', 'hefajote nirjaton', 'হেফাজতে নির্যাতন', 'পুলিশি নির্যাতন আইন ২০১৩', 'রিমান্ডে মারধর']
  }),
  entry({
    id: 'legalaid-16',
    category: 'rights',
    act: legalAid,
    section: 'Section 16',
    title: { en: 'Free government legal aid and panel attorney services (Hotline 16699)', bn: 'অসচ্ছলদের জন্য বিনামূল্যে সরকারি আইনজীবী (১৬৬৯৯)' },
    quote: 'আর্থিক বা অন্য কোনো কারণে আদালতে মামলা পরিচালনায় অসমর্থ ব্যক্তিকে সরকার আইনগত সহায়তা প্রদান করিবে।',
    sourceLanguage: 'bn',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-840/section-26116.html',
    explanation: {
      en: 'Citizens unable to afford a private lawyer are entitled to free government legal counsel in all 64 districts via National Legal Aid hotline 16699. Covers lawyer fees, court fees, and litigation costs.',
      bn: 'আইনজীবী রাখার সামর্থ্য না থাকলে জাতীয় আইনগত সহায়তা সংস্থা (টোল-ফ্রি ১৬৬৯৯) দেশের প্রতিটি জেলা লিগ্যাল এইড অফিসের মাধ্যমে সম্পূর্ণ সরকারি খরচে আইনজীবী ও কোর্ট ফি প্রদান করে।'
    },
    caution: {
      en: 'Toll-free hotline 16699 operates 24/7 for citizen legal aid inquiries across Bangladesh.',
      bn: 'টোল-ফ্রি জাতীয় হেল্পলাইন ১৬৬৯৯ সপ্তাহে ৭ দিন ২৪ ঘণ্টাই খোলা থাকে।'
    },
    keywords: ['free legal aid', 'government lawyer', 'helpline 16699', 'বিনামূল্যে আইনজীবী', 'লিগ্যাল এইড', '১৬৬৯৯', 'সরকারি লিগ্যাল এইড']
  }),
  entry({
    id: 'penal-379',
    category: 'threats',
    act: penal,
    section: 'Section 379',
    title: {
      en: 'Punishment for theft (Motorbike, vehicle, mobile phone, property)',
      bn: 'চুরির অপরাধ ও শাস্তি (মোটরসাইকেল, বাইক, গাড়ি, মোবাইল বা মালামাল চুরি)',
    },
    quote: 'Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3107.html',
    explanation: {
      en: 'Section 379 penalizes theft of movable personal property, motorbikes, vehicles, mobile phones, national documents, or money with up to 3 years imprisonment or fine.',
      bn: 'কারো সম্মতি ছাড়া কোনো অস্থাবর সম্পত্তি—যেমন মোটরসাইকেল/বাইক, গাড়ি, মোবাইল ফোন, টাকা বা প্রয়োজনীয় কাগজপত্র নিয়ে যাওয়া দণ্ডবিধির ৩৭৯ ধারায় চুরির অপরাধ, যাতে ৩ বছর পর্যন্ত কারাদণ্ড বা অর্থদণ্ড হতে পারে।',
    },
    caution: {
      en: 'For stolen motorbikes/vehicles, record BRTA registration, chassis, and engine numbers for immediate police checkpost alert. For phones, note IMEI to block the handset.',
      bn: 'বাইক বা গাড়ি চুরিতে বিআরটিএ রেজিস্ট্রেশন, ইঞ্জিন ও চেসিস নম্বর এবং মোবাইলের ক্ষেত্রে আইএমইআই নম্বর উল্লেখ করে দ্রুত থানায় জিডি বা এজাহার দায়ের করুন।',
    },
    keywords: [
      'theft',
      'stolen',
      'stolen bike',
      'bike stolen',
      'motorcycle stolen',
      'motorbike stolen',
      'car stolen',
      'vehicle stolen',
      'stolen phone',
      'mobile stolen',
      'phone stolen',
      'stolen mobile',
      'lost phone',
      'mobile theft',
      'churi',
      'cori',
      'chori',
      'curi',
      'bike churi',
      'bike cori',
      'motorcycle churi',
      'gari churi',
      'gari cori',
      'snatching',
      'চুরি',
      'বাইক চুরি',
      'মোটরসাইকেল চুরি',
      'গাড়ি চুরি',
      'সাইকেল চুরি',
      'মোবাইল চুরি',
      'ছিনতাই',
      'ফোন চুরি',
      'হারিয়ে গেছে',
      'দণ্ডবিধি ৩৭৯',
    ],
  }),
  entry({
    id: 'penal-380',
    category: 'threats',
    act: penal,
    section: 'Section 380',
    title: { en: 'Theft in building, tent, or shop / commercial warehouse', bn: 'দোকান, বাড়ি বা প্রতিষ্ঠানে চুরির শাস্তি (দণ্ডবিধি ৩৮০)' },
    quote: 'Whoever commits theft in any building, tent or vessel, which building, tent or vessel is used as a human dwelling, or for the custody of property, shall be punished with imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.',
    sourceLanguage: 'en',
    sourceUrl: 'https://bdlaws.minlaw.gov.bd/act-11/section-3108.html',
    explanation: {
      en: 'Section 380 punishes theft committed inside a shop, warehouse, business establishment, or house with imprisonment for up to 7 years and fine. It is a cognizable and non-bailable offense.',
      bn: 'দোকান, গুদাম, ব্যবসা প্রতিষ্ঠান বা বসতবাড়িতে মালামাল বা নগদ অর্থ চুরি করা দণ্ডবিধির ৩৮০ ধারায় মারাত্মক আমলযোগ্য অপরাধ। এতে ৭ বছর পর্যন্ত কারাদণ্ড এবং অর্থদণ্ড হতে পারে।'
    },
    caution: {
      en: 'Immediately preserve CCTV footage, compile an inventory of stolen goods with purchase vouchers, and lodge an FIR/GD at the local police station.',
      bn: 'ঘটনাস্থল অবিকৃত রাখুন, সিসিটিভি ফুটেজ সংরক্ষণ করুন, চুরি যাওয়া পণ্যের মেমোসহ তালিকা প্রস্তুত করে থানায় এজাহার (FIR) বা জিডি দায়ের করুন।'
    },
    keywords: [
      'shop theft', 'dokan churi', 'dokan theke maal churi', 'maal cori', 'dokan cori',
      'maal churi', 'shop burglary', 'inventory theft', 'godown theft', 'stolen goods',
      'theft in building', 'cori', 'chori', 'curi', 'churi', 'dokan', 'দোকান চুরি',
      'দোকানের মালামাল চুরি', 'গোডাউন চুরি', 'দোকান থেকে চুরি', 'মাল চুরি', 'দণ্ডবিধি ৩৮০'
    ]
  }),
];

export const examplePrompts: Record<Category, { en: string; bn: string }> = {
  work: { en: 'My employer has not paid my salary for two months. What should I check?', bn: 'আমার মালিক দুই মাসের বেতন দেননি। কী কী বিষয় জানা দরকার?' },
  threats: { en: 'Someone assaulted me and is threatening my family. How do I file a GD or FIR?', bn: 'আমাকে মারধর ও পরিবারের ক্ষতি করার হুমকি দেওয়া হচ্ছে। থানায় কীভাবে জিডি বা এজাহার করব?' },
  digital: { en: 'Someone is blackmailing me with private photos from a fake account. What can I do?', bn: 'ভুয়া আইডি থেকে গোপন ছবি ইন্টারনেটে ছড়ানোর হুমকি দিয়ে ব্ল্যাকমেইল করছে। কী করব?' },
  consumer: { en: 'I paid an online seller but my order was never delivered. What law may apply?', bn: 'অনলাইন দোকানে টাকা দিয়েছি কিন্তু পণ্য পাইনি। কোন আইন প্রাসঙ্গিক হতে পারে?' },
  land: { en: 'Someone made a forged deed and is trying to grab my land. How do I stop it?', bn: 'জাল দলিল তৈরি করে আমার জমি দখলের চেষ্টা করা হচ্ছে। কীভাবে প্রতিকার পাব?' },
  family: { en: 'My husband is demanding dowry and abusing me. What court protection is available?', bn: 'স্বামী যৌতুক দাবি করে নির্যাতন করছে। আদালতের মাধ্যমে কীভাবে সুরক্ষা পাব?' },
  rights: { en: 'The police arrested my brother without warrant. What are his rights within 24 hours?', bn: 'পুলিশ বিনা পরোয়ানায় আমার ভাইকে গ্রেপ্তার করেছে। ২৪ ঘণ্টার মধ্যে তার কী অধিকার আছে?' },
};
