import { describe, it, expect } from 'vitest';
import { retrieve } from '@/lib/retrieval';
import { createLegalWorkflow } from '@/lib/workflow';
import { provisions } from '@/data/legal';

interface BenchmarkQuestion {
  id: string;
  category: string;
  language: 'bn' | 'en';
  text: string;
  expectedSourceIds: string[];
  description: string;
}

const benchmarkQuestions: BenchmarkQuestion[] = [
  // -------------------------------------------------------------
  // DOMAIN 1: WORKPLACE & UNPAID WAGES (10 Questions)
  // -------------------------------------------------------------
  {
    id: 'work-01',
    category: 'work',
    language: 'bn',
    text: 'আমার মালিক গত ৩ মাস ধরে বকেয়া বেতন দিচ্ছে না, আমি কীভাবে টাকা আদায় করব?',
    expectedSourceIds: ['labour-123', 'labour-132', 'labour-26'],
    description: 'Unpaid wages recovery under Labour Act'
  },
  {
    id: 'work-02',
    category: 'work',
    language: 'en',
    text: 'My employer suddenly terminated me after 4 years of continuous service without any notice or severance pay.',
    expectedSourceIds: ['labour-26', 'labour-27'],
    description: 'Termination without notice or service compensation'
  },
  {
    id: 'work-03',
    category: 'work',
    language: 'bn',
    text: 'Amr malik amar 2 masher salary আটকায় রাখসে ar chakri theke ber kore dise',
    expectedSourceIds: ['labour-123', 'labour-132', 'labour-26'],
    description: 'Banglish wage arrears & dismissal'
  },
  {
    id: 'work-04',
    category: 'work',
    language: 'bn',
    text: 'ঈদের ছুটির দিনে বাধ্যতামূলক কাজ করিয়েছে কিন্তু কোনো অতিরিক্ত মজুরি বা বিকল্প ছুটি দেয়নি',
    expectedSourceIds: ['labour-118', 'labour-105', 'labour-108'],
    description: 'Festival holiday work without overtime or compensatory leave'
  },
  {
    id: 'work-05',
    category: 'work',
    language: 'en',
    text: 'Can my factory manager deny my 10 days of paid casual leave when my mother is sick?',
    expectedSourceIds: ['labour-115', 'labour-116'],
    description: 'Casual leave entitlement under Section 115'
  },
  {
    id: 'work-06',
    category: 'work',
    language: 'bn',
    text: 'গর্ভবতী হওয়ার কারণে নারী শ্রমিককে বরখাস্ত করা হয়েছে এবং মাতৃত্বকালীন সুবিধা প্রদান করা হয়নি',
    expectedSourceIds: ['labour-45', 'labour-46'],
    description: 'Maternity protection & leave violation'
  },
  {
    id: 'work-07',
    category: 'work',
    language: 'bn',
    text: 'কারখানায় কাজ করার সময় মেশিনে হাত কেটে স্থায়ী পঙ্গুত্ব হয়েছে, মালিক কোনো ক্ষতিপূরণ দিচ্ছে না',
    expectedSourceIds: ['labour-150', 'labour-151'],
    description: 'Workplace injury & statutory disability compensation'
  },
  {
    id: 'work-08',
    category: 'work',
    language: 'en',
    text: 'I was working in Dhaka EPZ garment factory and unpaid for 2 months, which authority do I complain to?',
    expectedSourceIds: ['labour-123', 'labour-132', 'labour-26'],
    description: 'EPZ Labour Act context and unpaid wages'
  },
  {
    id: 'work-09',
    category: 'work',
    language: 'en',
    text: 'Our company forces us to work 12 hours a day every week without double overtime pay.',
    expectedSourceIds: ['labour-100', 'labour-102', 'labour-108'],
    description: 'Working hours violation & overtime double rate entitlement'
  },
  {
    id: 'work-10',
    category: 'work',
    language: 'en',
    text: 'As an administrative General Manager earning high salary, can I claim worker rights in Labour Court?',
    expectedSourceIds: ['labour-2-65', 'labour-33'],
    description: 'Worker definition boundary under Section 2(65)'
  },

  // -------------------------------------------------------------
  // DOMAIN 2: THREATS, HARASSMENT & GD (10 Questions)
  // -------------------------------------------------------------
  {
    id: 'threats-01',
    category: 'threats',
    language: 'bn',
    text: 'মোবাইলে কল করে আমাকে এবং আমার সন্তানকে মেরে ফেলার হুমকি দিচ্ছে ও পাঁচ লাখ টাকা চাঁদা দাবি করছে',
    expectedSourceIds: ['penal-506', 'penal-384', 'penal-383', 'police-44-gd'],
    description: 'Death threats & extortion'
  },
  {
    id: 'threats-02',
    category: 'threats',
    language: 'en',
    text: 'A gang of 7 armed men gathered in front of my house and threatened violence and property destruction.',
    expectedSourceIds: ['penal-141', 'penal-143', 'penal-147', 'penal-506'],
    description: 'Unlawful assembly & mob threat'
  },
  {
    id: 'threats-03',
    category: 'threats',
    language: 'bn',
    text: 'Rastay boke ghire dhorsilo ar churi diye voy dekhayসে taka na dile mardhor korbe',
    expectedSourceIds: ['penal-324', 'penal-506', 'penal-383', 'penal-384'],
    description: 'Banglish weapon threat & assault'
  },
  {
    id: 'threats-04',
    category: 'threats',
    language: 'bn',
    text: 'থানার পুলিশ সাধারণ ডায়েরি (জিডি) গ্রহণ করতে অস্বীকৃতি জানালে আমার কী করণীয়?',
    expectedSourceIds: ['police-44-gd', 'crpc-155'],
    description: 'Police GD refusal and Section 44 / CrPC 155 rules'
  },
  {
    id: 'threats-05',
    category: 'threats',
    language: 'en',
    text: 'My Samsung mobile phone was stolen from the dining table at a restaurant in Dhanmondi.',
    expectedSourceIds: ['penal-379', 'penal-380', 'police-44-gd'],
    description: 'Theft of mobile phone and GD lodging'
  },
  {
    id: 'threats-06',
    category: 'threats',
    language: 'bn',
    text: 'বাজারের পার্কিং থেকে আমার মোটরসাইকেল চুরি হয়ে গেছে, দ্রুত কী আইনি ব্যবস্থা নেব?',
    expectedSourceIds: ['penal-379', 'police-44-gd'],
    description: 'Motorcycle theft and vehicle alert procedure'
  },
  {
    id: 'threats-07',
    category: 'threats',
    language: 'en',
    text: 'An extortionist threatened me with injury demanding 50,000 taka, but I refused and he ran away.',
    expectedSourceIds: ['penal-385', 'penal-383', 'penal-506'],
    description: 'Extortion attempt without payment under Section 385'
  },
  {
    id: 'threats-08',
    category: 'threats',
    language: 'bn',
    text: 'মারপিট করে ধারালো ছুরি দিয়ে কুপিয়ে হাত ভেঙে দিয়েছে এবং হাসপাতালে ২০ দিন ভর্তি ছিলাম',
    expectedSourceIds: ['penal-325', 'penal-326', 'penal-324'],
    description: 'Grievous hurt and dangerous weapon assault'
  },
  {
    id: 'threats-09',
    category: 'threats',
    language: 'bn',
    text: 'প্রতিবেশী প্রতিনিয়ত মারামারির হুমকি দিচ্ছে, তাকে শান্তি রক্ষার মুচলেকায় বাধ্য করার নিয়ম কী?',
    expectedSourceIds: ['crpc-107', 'penal-506'],
    description: 'Executive Magistrate peace bond petition under Section 107'
  },
  {
    id: 'threats-10',
    category: 'threats',
    language: 'bn',
    text: 'জমিতে দুই পক্ষের রক্তক্ষয়ী সংঘর্ষের আশঙ্কা দেখা দিলে কি ১৪৪ ধারা জারি করা যায়?',
    expectedSourceIds: ['crpc-144', 'land-crime-7'],
    description: 'Section 144 emergency injunction in imminent clash'
  },

  // -------------------------------------------------------------
  // DOMAIN 3: CYBER & DIGITAL SECURITY (10 Questions)
  // -------------------------------------------------------------
  {
    id: 'digital-01',
    category: 'digital',
    language: 'bn',
    text: 'ফেসবুক আইডি হ্যাক করে ব্যক্তিগত অন্তরঙ্গ ছবি ইন্টারনেটে ছড়িয়ে ব্ল্যাকমেইল ও টাকা দাবি করছে',
    expectedSourceIds: ['pornography-8', 'pornography-8-2', 'cyber-protection-core'],
    description: 'Intimate photo leak blackmail & Pornography Act'
  },
  {
    id: 'digital-02',
    category: 'digital',
    language: 'en',
    text: 'Someone created a fake Facebook account with my name and photos to defame me among relatives.',
    expectedSourceIds: ['penal-419', 'cyber-protection-core'],
    description: 'Identity impersonation and defamation'
  },
  {
    id: 'digital-03',
    category: 'digital',
    language: 'bn',
    text: 'Amar name fake profile khule kharap post kortese ar vulgar massage pathayসে',
    expectedSourceIds: ['penal-419', 'telecom-66', 'cyber-protection-core'],
    description: 'Banglish fake profile harassment'
  },
  {
    id: 'digital-04',
    category: 'digital',
    language: 'bn',
    text: 'বিকাশ কর্মকর্তা সেজে ওটিপি (OTP) প্রতারণার মাধ্যমে আমার অ্যাকাউন্ট থেকে ৩০ হাজার টাকা হাতিয়ে নিয়েছে',
    expectedSourceIds: ['cyber-23', 'penal-420'],
    description: 'Digital MFS phishing and cyber fraud'
  },
  {
    id: 'digital-05',
    category: 'digital',
    language: 'en',
    text: 'An unknown number keeps calling me late at night with obscene and sexually harassing comments.',
    expectedSourceIds: ['telecom-66', 'penal-509'],
    description: 'Obscene telephone harassment under Telecom Act 66'
  },
  {
    id: 'digital-06',
    category: 'digital',
    language: 'en',
    text: 'A former employee hacked into our office server and deleted our client database files.',
    expectedSourceIds: ['cyber-19', 'ict-66', 'cyber-17'],
    description: 'Data destruction and hacking under cyber law'
  },
  {
    id: 'digital-07',
    category: 'digital',
    language: 'bn',
    text: 'আমার জাতীয় পরিচয়পত্র জালিয়াতি করে অপরিচিত ব্যক্তি ৩টি ভুয়া সিম তুলে ব্যবহার করছে',
    expectedSourceIds: ['telecom-67', 'cyber-26', 'penal-465'],
    description: 'Illegal SIM card registration using another NID'
  },
  {
    id: 'digital-08',
    category: 'digital',
    language: 'bn',
    text: 'সাইবার নিরাপত্তা আইন ২০২৩ কি এখনো বলবৎ আছে নাকি বাতিল করা হয়েছে?',
    expectedSourceIds: ['cyber-protection-core', 'cyber-25'],
    description: 'Cyber Security Act repeal & Cyber Protection Act 2026 status'
  },
  {
    id: 'digital-09',
    category: 'digital',
    language: 'en',
    text: 'A hospital receptionist leaked confidential medical records of patients on a public website.',
    expectedSourceIds: ['cyber-32', 'constitution-43'],
    description: 'Breach of confidential data and constitutional privacy'
  },
  {
    id: 'digital-10',
    category: 'digital',
    language: 'en',
    text: 'A scammer sent a fraudulent fake appointment letter with fake government stamps to extort money.',
    expectedSourceIds: ['penal-468', 'penal-465', 'penal-420'],
    description: 'Forgery for purpose of cheating online'
  },

  // -------------------------------------------------------------
  // DOMAIN 4: CONSUMER RIGHTS & FRAUD (10 Questions)
  // -------------------------------------------------------------
  {
    id: 'consumer-01',
    category: 'consumer',
    language: 'bn',
    text: 'ফার্মেসিতে ওষুধের প্যাকেটের গায়ে মুদ্রিত সর্বোচ্চ মূল্যের (MRP) চেয়ে অতিরিক্ত দাম নিয়েছে',
    expectedSourceIds: ['consumer-40', 'consumer-60'],
    description: 'Overcharging higher than MRP under Section 40'
  },
  {
    id: 'consumer-02',
    category: 'consumer',
    language: 'en',
    text: 'The grocery store sold me baby milk powder that expired two months ago and refused to refund.',
    expectedSourceIds: ['consumer-51', 'consumer-60'],
    description: 'Selling expired consumer goods under Section 51'
  },
  {
    id: 'consumer-03',
    category: 'consumer',
    language: 'bn',
    text: 'Daraz theke pre-paid order disi, 15 din hoilo kono delivery nai refund o dey na',
    expectedSourceIds: ['ecommerce-delivery-2021', 'consumer-45'],
    description: 'Banglish e-commerce delivery default and refund'
  },
  {
    id: 'consumer-04',
    category: 'consumer',
    language: 'bn',
    text: 'ভোক্তা অধিকার অধিদপ্তরে অভিযোগ করলে আদায়কৃত জরিমানার ২৫ শতাংশ কি অভিযোগকারী পায়?',
    expectedSourceIds: ['consumer-76'],
    description: 'Section 76 25% reward payout to complainant'
  },
  {
    id: 'consumer-05',
    category: 'consumer',
    language: 'en',
    text: 'I was cheated by an electronics vendor 40 days ago, is my consumer complaint still valid?',
    expectedSourceIds: ['consumer-60'],
    description: '30-day limitation period under Section 60'
  },
  {
    id: 'consumer-06',
    category: 'consumer',
    language: 'bn',
    text: 'বোতলজাত খাবার পানিতে ভুয়া বিএসটিআই সিল ব্যবহার করে বিক্রি করা হচ্ছে',
    expectedSourceIds: ['bsti-24', 'consumer-43'],
    description: 'Fake BSTI certification mark violation'
  },
  {
    id: 'consumer-07',
    category: 'consumer',
    language: 'bn',
    text: 'ফলের আড়তে ক্ষতিকর কার্বাইড ও রাসায়নিক ফরমালিন প্রয়োগ করে ফল পাকানো হচ্ছে',
    expectedSourceIds: ['food-safety-23', 'food-safety-41', 'consumer-40'],
    description: 'Chemical additives & food contamination'
  },
  {
    id: 'consumer-08',
    category: 'consumer',
    language: 'en',
    text: 'The shopkeeper refused to provide a cash memo or printed receipt for the television I purchased.',
    expectedSourceIds: ['consumer-45', 'consumer-60'],
    description: 'Refusal to provide purchase receipt / evidentiary basis for complaint'
  },
  {
    id: 'consumer-09',
    category: 'consumer',
    language: 'bn',
    text: 'বাজারে নামীদামী ব্র্যান্ডের লোগো নকল করে কমদামী নকল প্রসাধনী তৈরি করে বিক্রি করছে',
    expectedSourceIds: ['consumer-50', 'consumer-76'],
    description: 'Counterfeit manufacturing and production of fake consumer goods (Section 50)'
  },
  {
    id: 'consumer-10',
    category: 'consumer',
    language: 'en',
    text: 'The pressure cooker had a manufacturing defect and exploded causing severe burns to my hands.',
    expectedSourceIds: ['consumer-48', 'consumer-47'],
    description: 'Hazardous consumer goods threatening safety'
  },

  // -------------------------------------------------------------
  // DOMAIN 5: LAND & PROPERTY (10 Questions)
  // -------------------------------------------------------------
  {
    id: 'land-01',
    category: 'land',
    language: 'bn',
    text: 'আমাদের পৈতৃক জমি ভুয়া জাল দলিল বানিয়ে ভূমিদস্যুরা জোরপূর্বক দখল করে নিয়েছে',
    expectedSourceIds: ['land-crime-4', 'land-crime-7', 'sra-8', 'sra-39'],
    description: 'Land grabbing via forged deed under Land Crime Act 2023'
  },
  {
    id: 'land-02',
    category: 'land',
    language: 'en',
    text: 'The landlord broke the lock and forcefully threw out my belongings without any court decree.',
    expectedSourceIds: ['rent-control-18', 'sra-9'],
    description: 'Tenant eviction without decree and summary possession recovery'
  },
  {
    id: 'land-03',
    category: 'land',
    language: 'bn',
    text: 'Amar jomi bayna korsi ar taka disi kintu malik ekhon registry kore dicche na',
    expectedSourceIds: ['property-54', 'property-53a', 'registration-17'],
    description: 'Banglish unregistered contract of sale and specific performance'
  },
  {
    id: 'land-04',
    category: 'land',
    language: 'bn',
    text: 'জমি ক্রয়ের পর সহকারী কমিশনার (ভূমি) অফিসে নামজারি বা মিউটেশন করার নিয়ম কী?',
    expectedSourceIds: ['sat-143'],
    description: 'Mutation / Namjari under SAT Act Section 143'
  },
  {
    id: 'land-05',
    category: 'land',
    language: 'en',
    text: 'I was dispossessed of my agricultural land without my consent 4 months ago; can I file a summary suit?',
    expectedSourceIds: ['sra-9', 'sra-8'],
    description: '6-month summary possession suit under SRA Section 9'
  },
  {
    id: 'land-06',
    category: 'land',
    language: 'bn',
    text: 'প্রতিবেশী আমার জমির সীমানার ভেতর দেয়াল নির্মাণ করছে, তাৎক্ষণিক নিষেধাজ্ঞা পাওয়ার নিয়ম কী?',
    expectedSourceIds: ['sra-52', 'sra-54'],
    description: 'Temporary injunction to halt encroaching construction'
  },
  {
    id: 'land-07',
    category: 'land',
    language: 'en',
    text: 'Can a person claim ownership of land based on an unregistered deed executed on 300 taka stamp?',
    expectedSourceIds: ['registration-49', 'registration-17', 'property-54'],
    description: 'Effect of non-registration under Section 49'
  },
  {
    id: 'land-08',
    category: 'land',
    language: 'bn',
    text: 'অন্য শরিকদের না জানিয়ে নিজের ভাগের বেশি পৈতৃক জমি এক শরিক গোপনে বিক্রি করে দিয়েছে',
    expectedSourceIds: ['land-crime-6', 'sra-39'],
    description: 'Deceitful sale by co-sharer under Land Crime Act Section 6'
  },
  {
    id: 'land-09',
    category: 'land',
    language: 'bn',
    text: 'বাড়িওয়ালা প্রতি মাসে ভাড়া নিচ্ছে কিন্তু কোনো লিখিত রসিদ দেয় না',
    expectedSourceIds: ['rent-control-13', 'rent-control-7'],
    description: 'Landlord refusal of rent receipt under Section 13'
  },
  {
    id: 'land-10',
    category: 'land',
    language: 'bn',
    text: 'স্থানীয় প্রভাবশালী ব্যক্তিরা ড্রেজার লাগিয়ে আমাদের কৃষিজমির ওপরের মাটি কেটে নিয়ে যাচ্ছে',
    expectedSourceIds: ['land-crime-13'],
    description: 'Illegal soil cutting under Land Crime Act Section 13'
  },

  // -------------------------------------------------------------
  // DOMAIN 6: DOMESTIC VIOLENCE & FAMILY (10 Questions)
  // -------------------------------------------------------------
  {
    id: 'family-01',
    category: 'family',
    language: 'bn',
    text: 'যৌতুকের দাবিতে স্বামী ও শ্বশুরবাড়ির লোকজন প্রতিদিন মারধর করে ঘর থেকে বের করে দিয়েছে',
    expectedSourceIds: ['dowry-2018-3', 'domestic-14', 'domestic-15', 'nari-shishu-11b'],
    description: 'Dowry demand and domestic violence protection order'
  },
  {
    id: 'family-02',
    category: 'family',
    language: 'en',
    text: 'My husband married a second wife without my knowledge or written permission from the Arbitration Council.',
    expectedSourceIds: ['mflo-6', 'mflo-10'],
    description: 'Polygamy without permission under MFLO Section 6'
  },
  {
    id: 'family-03',
    category: 'family',
    language: 'bn',
    text: 'Shami talaq na diye bari theke ber kore dise, amake ar bacchar bhoronposhon diche na',
    expectedSourceIds: ['mflo-9', 'domestic-16', 'family-court-2023-4', 'domestic-14', 'domestic-3'],
    description: 'Banglish wife and child maintenance claims'
  },
  {
    id: 'family-04',
    category: 'family',
    language: 'bn',
    text: 'বিবাহবিচ্ছেদ না ঘটিয়েও কি পারিবারিক সুরক্ষা আইনে স্বামীর বাড়িতে বসবাসের অধিকার চাওয়া যায়?',
    expectedSourceIds: ['domestic-15', 'domestic-14'],
    description: 'Residence order in shared household under Section 15'
  },
  {
    id: 'family-05',
    category: 'family',
    language: 'en',
    text: 'My in-laws forcibly took away my 3-year-old child and refused to let me see him.',
    expectedSourceIds: ['guardians-25', 'domestic-19', 'guardians-17'],
    description: 'Child custody recovery and paramount welfare rule'
  },
  {
    id: 'family-06',
    category: 'family',
    language: 'bn',
    text: 'স্বামী মুখে তিন তালাক উচ্চারণ করেছে কিন্তু চেয়ারম্যান অফিসে কোনো লিখিত নোটিশ দেয়নি',
    expectedSourceIds: ['mflo-7'],
    description: 'Oral talaq invalidity and 90-day notice rule under MFLO Section 7'
  },
  {
    id: 'family-07',
    category: 'family',
    language: 'en',
    text: 'How can a divorced Muslim wife recover her unpaid prompt and deferred dower (Mohorana)?',
    expectedSourceIds: ['mflo-10', 'family-court-2023-4', 'family-court-13'],
    description: 'Recovery of dower / Mohorana in Family Court'
  },
  {
    id: 'family-08',
    category: 'family',
    language: 'bn',
    text: '১৫ বছর বয়সী অপ্রাপ্তবয়স্ক মেয়েকে জোরপূর্বক বিয়ে দেওয়ার চেষ্টা করা হচ্ছে, কীভাবে থামানো যায়?',
    expectedSourceIds: ['child-marriage-2017-7'],
    description: 'Child marriage prevention and penalties'
  },
  {
    id: 'family-09',
    category: 'family',
    language: 'en',
    text: 'Is wedding jewelry given to the bride voluntarily considered illegal dowry?',
    expectedSourceIds: ['dowry-2018-2', 'dowry-2018-3'],
    description: 'Definition of dowry excluding customary wedding gifts'
  },
  {
    id: 'family-10',
    category: 'family',
    language: 'bn',
    text: 'আদালতের সুরক্ষা আদেশ লঙ্ঘন করে স্বামী পুনরায় ভিকটিমের কর্মস্থলে এসে ভয়ভীতি দেখাচ্ছে',
    expectedSourceIds: ['domestic-30', 'domestic-14'],
    description: 'Penalty for breach of protection order under Section 30'
  },

  // -------------------------------------------------------------
  // DOMAIN 7: FUNDAMENTAL RIGHTS & LEGAL AID (10 Questions)
  // -------------------------------------------------------------
  {
    id: 'rights-01',
    category: 'rights',
    language: 'bn',
    text: 'পুলিশ কাউকে বিনা পরোয়ানায় গ্রেপ্তার করে ২৪ ঘণ্টার বেশি আদালতে হাজির না করে আটকে রেখেছে',
    expectedSourceIds: ['crpc-61', 'constitution-33', 'crpc-54'],
    description: '24-hour detention limit and constitutional arrest safeguards'
  },
  {
    id: 'rights-02',
    category: 'rights',
    language: 'en',
    text: 'The suspect was tortured with electric shocks in police custody to force a confession.',
    expectedSourceIds: ['torture-prevention-15', 'constitution-35'],
    description: 'Prohibition of custodial torture and penal sanctions'
  },
  {
    id: 'rights-03',
    category: 'rights',
    language: 'bn',
    text: 'Amr taka nai ukil dhorar, sorkari vabe ki free ukil pawa jay 16699 e?',
    expectedSourceIds: ['legalaid-16', 'legalaid-9', 'legalaid-24'],
    description: 'Banglish legal aid hotline 16699 and panel lawyer assignment'
  },
  {
    id: 'rights-04',
    category: 'rights',
    language: 'en',
    text: 'Plainclothes men abducted my brother 3 days ago; what writ petition can be filed in the High Court?',
    expectedSourceIds: ['constitution-102-2', 'constitution-102-1', 'constitution-32'],
    description: 'Habeas Corpus writ under Article 102 for missing detainee'
  },
  {
    id: 'rights-05',
    category: 'rights',
    language: 'en',
    text: 'Is an offense punishable with 1 year imprisonment bailable as a matter of right under CrPC?',
    expectedSourceIds: ['crpc-496', 'crpc-497'],
    description: 'Bailable offense entitlement under Section 496'
  },
  {
    id: 'rights-06',
    category: 'rights',
    language: 'en',
    text: 'Can a person falsely accused in a police case move the High Court for anticipatory bail?',
    expectedSourceIds: ['crpc-498'],
    description: 'Anticipatory bail powers under Section 498'
  },
  {
    id: 'rights-07',
    category: 'rights',
    language: 'bn',
    text: 'সরকারি কোনো দপ্তরের বিরুদ্ধে সংক্ষুব্ধ নাগরিক কি হাইকোর্টে রিট পিটিশন করতে পারেন?',
    expectedSourceIds: ['constitution-102-1', 'constitution-44'],
    description: 'Writ jurisdiction under Article 102 and Article 44'
  },
  {
    id: 'rights-08',
    category: 'rights',
    language: 'bn',
    text: 'তথ্য অধিকার আইনে সরকারি অফিসে আবেদন করলে কত কার্যদিবসের মধ্যে তথ্য দিতে বাধ্য?',
    expectedSourceIds: ['rti-8'],
    description: 'Right to Information 20-day timeline under Section 8'
  },
  {
    id: 'rights-09',
    category: 'rights',
    language: 'en',
    text: 'Can a magistrate convict an accused solely based on a police statement where the accused was forced to sign?',
    expectedSourceIds: ['crpc-161', 'constitution-35'],
    description: 'Prohibition of forced signatures and witness statements under Section 161'
  },
  {
    id: 'rights-10',
    category: 'rights',
    language: 'bn',
    text: 'আইনের কর্তৃত্ব ব্যতীত কি সরকার কোনো নাগরিকের ব্যক্তিগত জমি বাজেয়াপ্ত বা অধিগ্রহণ করতে পারে?',
    expectedSourceIds: ['constitution-42', 'constitution-31'],
    description: 'Property protection under Constitution Article 42 and 31'
  }
];

describe('MyLaws 70-Question Grounded Pilot Benchmark Across All 7 Categories', () => {
  it('has exactly 70 comprehensive test questions spanning all 7 legal domains', () => {
    expect(benchmarkQuestions.length).toBe(70);
    const categoryCounts: Record<string, number> = {};
    for (const q of benchmarkQuestions) {
      categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
    }
    expect(categoryCounts['work']).toBe(10);
    expect(categoryCounts['threats']).toBe(10);
    expect(categoryCounts['digital']).toBe(10);
    expect(categoryCounts['consumer']).toBe(10);
    expect(categoryCounts['land']).toBe(10);
    expect(categoryCounts['family']).toBe(10);
    expect(categoryCounts['rights']).toBe(10);
  });

  it('evaluates lexical retrieval and citation integrity across all 70 questions', () => {
    let top3Hits = 0;
    let validCitations = 0;
    const failures: Array<{ id: string; query: string; expected: string[]; retrieved: string[] }> = [];

    const startTime = Date.now();

    for (const q of benchmarkQuestions) {
      const matches = retrieve(q.text, 3);
      const retrievedIds = matches.map((m) => m.provision.id);

      // Verify all retrieved provisions exist in canonical corpus
      for (const id of retrievedIds) {
        expect(provisions.some((p) => p.id === id)).toBe(true);
        validCitations++;
      }

      // Check if at least one expected source ID was retrieved in the top-3 results
      const hasExpectedHit = q.expectedSourceIds.some((expId) => retrievedIds.includes(expId));

      if (hasExpectedHit) {
        top3Hits++;
      } else {
        failures.push({
          id: q.id,
          query: q.text,
          expected: q.expectedSourceIds,
          retrieved: retrievedIds,
        });
      }
    }

    const elapsed = Date.now() - startTime;
    const accuracy = (top3Hits / benchmarkQuestions.length) * 100;

    console.log(`\n==========================================================`);
    console.log(`70-QUESTION PILOT BENCHMARK RESULTS:`);
    console.log(`  Total Evaluated: ${benchmarkQuestions.length}`);
    console.log(`  Top-3 Accuracy: ${top3Hits}/${benchmarkQuestions.length} (${accuracy.toFixed(1)}%)`);
    console.log(`  Valid Citations Verified: ${validCitations}`);
    console.log(`  Total Benchmark Duration: ${elapsed}ms (avg ${(elapsed / 70).toFixed(1)}ms / query)`);
    console.log(`==========================================================\n`);

    if (failures.length > 0) {
      console.warn('Questions requiring retrieval tuning:');
      for (const f of failures) {
        console.warn(`  [${f.id}] Expected: ${f.expected.join(', ')} | Got: ${f.retrieved.join(', ')}`);
      }
    }

    // Benchmark threshold: At least 85% top-3 accuracy on zero-shot legal queries
    expect(accuracy).toBeGreaterThanOrEqual(85);
  });

  it('validates factual clarification and workflow safety logic', () => {
    // Test that missing material facts trigger clarification questions without inventing facts
    const wageQuery = {
      requestId: 'test-clarify',
      originalMessage: 'মালিক গত ২ মাস ধরে বকেয়া বেতন দেয়নি',
      language: 'bn' as const,
      facts: [],
      requestedMode: 'online' as const,
    };

    const wf = createLegalWorkflow(wageQuery);
    expect(wf.status).toBe('clarifying');
    expect(wf.questions.length).toBeGreaterThan(0);
    expect(wf.clarificationQuestions?.some((cq) => cq.fieldId === 'workplace')).toBe(true);
    expect(wf.clarificationQuestions?.some((cq) => cq.fieldId === 'employment')).toBe(true);
  });

  it('respects non-Bangladesh foreign jurisdiction gracefully without hallucination', () => {
    const foreignQuery = {
      requestId: 'test-foreign',
      originalMessage: 'I was employed in a company in London and my salary was withheld',
      language: 'en' as const,
      facts: [],
      requestedMode: 'online' as const,
    };

    const wf = createLegalWorkflow(foreignQuery);
    expect(wf.status).toBe('unsupported');
    expect(wf.explanation[0].text).toContain('MyLaws only covers Bangladesh legal information');
  });
});
