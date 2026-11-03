import type {
  DocumentType,
  DraftDocument,
  DraftFacts,
  ReviewStatus,
} from '@/types/contracts';

export interface DraftTypeMetadata {
  id: DocumentType;
  titleBn: string;
  titleEn: string;
  category: 'court' | 'admin' | 'police' | 'notice';
  categoryLabelBn: string;
  categoryLabelEn: string;
  recipientDefaultBn: string;
  recipientDefaultEn: string;
  shortDescBn: string;
  shortDescEn: string;
}

export const DRAFT_CATALOG: DraftTypeMetadata[] = [
  {
    id: 'domestic_violence',
    titleBn: 'পারিবারিক সহিংসতা প্রতিরোধ ও সুরক্ষা আইনে সুরক্ষা ও ক্ষতিপূরণের দরখাস্ত',
    titleEn: 'Application for Protection & Compensation Order under Domestic Violence Act 2010',
    category: 'court',
    categoryLabelBn: 'আদালত পিটিশন',
    categoryLabelEn: 'Court Petition',
    recipientDefaultBn: 'বিজ্ঞ চিফ মেট্রোপলিটন / জুডিশিয়াল ম্যাজিস্ট্রেট আদালত',
    recipientDefaultEn: 'Court of Chief Judicial / Metropolitan Magistrate',
    shortDescBn: 'পারিবারিক সহিংসতা ও নির্যাতনের বিরুদ্ধে আদালতের সুরক্ষা আদেশ ও ক্ষতিপূরণের পিটিশন আরজি।',
    shortDescEn: 'Petition for court protection order and monetary relief against domestic violence.',
  },
  {
    id: 'family_maintenance',
    titleBn: 'পারিবারিক আদালত আইন অনুযায়ী দেনমোহর ও ভরণপোষণের মোকদ্দমার আরজি',
    titleEn: 'Suit Plaint for Dower & Maintenance under Family Courts Act 2023',
    category: 'court',
    categoryLabelBn: 'পারিবারিক আদালত',
    categoryLabelEn: 'Family Court',
    recipientDefaultBn: 'বিজ্ঞ সহকারী জজ ও পারিবারিক আদালত',
    recipientDefaultEn: 'Court of Assistant Judge & Family Court',
    shortDescBn: 'স্বামীর নিকট থেকে বকেয়া দেনমোহর ও বিগত এবং চলমান খোরপোশ আদায়ের জন্য পারিবারিক আদালতের আরজি।',
    shortDescEn: 'Plaint for recovering prompt/deferred dower and ongoing maintenance from husband.',
  },
  {
    id: 'land_mutation',
    titleBn: 'উত্তরাধিকার সূত্রে প্রাপ্ত জমির ই-নামজারি ও জমাভাগ আবেদন',
    titleEn: 'Application for Inheritance Land Mutation & Khatiyan Separation',
    category: 'admin',
    categoryLabelBn: 'ভূমি প্রশাসন',
    categoryLabelEn: 'Land Administration',
    recipientDefaultBn: 'সহকারী কমিশনার (ভূমি) / AC Land, উপজেলা ভূমি অফিস',
    recipientDefaultEn: 'Assistant Commissioner (Land), Upazila Land Office',
    shortDescBn: 'বাবার মৃত্যুর পর ওয়ারিশান সনদের ভিত্তিতে সহকারী কমিশনার (ভূমি) বরাবর নিজ নামে নামজারি আবেদন।',
    shortDescEn: 'Formal application for mutation of inherited land title at the AC Land office.',
  },
  {
    id: 'land_crime_complaint',
    titleBn: 'কৃষিজমির অবৈধ মাটি কাটা বন্ধ ও শান্তিভঙ্গ রোধে জরুরি দরখাস্ত',
    titleEn: 'Complaint against Illegal Topsoil Excavation under Land Crime Redress Act 2023',
    category: 'admin',
    categoryLabelBn: 'উপজেলা প্রশাসন',
    categoryLabelEn: 'Upazila Administration',
    recipientDefaultBn: 'উপজেলা নির্বাহী অফিসার (UNO) / জেলা প্রশাসক (DC)',
    recipientDefaultEn: 'Upazila Nirbahi Officer (UNO) / Deputy Commissioner',
    shortDescBn: 'ড্রেজার দিয়ে কৃষিজমির টপসয়েল কাটা বা ভরাট বন্ধে উপজেলা প্রশাসন বরাবর লিখিত অভিযোগ।',
    shortDescEn: 'Petition to administrative authorities to halt unauthorized topsoil dredging.',
  },
  {
    id: 'possession_recovery',
    titleBn: 'সুনির্দিষ্ট প্রতিকার আইনে বেদখলকৃত জমির দখল পুনরুদ্ধারের আরজি',
    titleEn: 'Summary Suit for Recovery of Immovable Property under Section 9 Specific Relief Act',
    category: 'court',
    categoryLabelBn: 'দেওয়ানি আদালত',
    categoryLabelEn: 'Civil Court',
    recipientDefaultBn: 'বিজ্ঞ সহকারী জজ আদালত',
    recipientDefaultEn: 'Court of Assistant Judge (Civil Jurisdiction)',
    shortDescBn: 'বলপ্রয়োগে দখলচ্যুত হওয়ার ৬ মাসের মধ্যে স্বত্ব প্রমাণের বাধ্যবাধকতা ছাড়া দখল পুনরুদ্ধারের আরজি।',
    shortDescEn: 'Summary suit plaint to recover peaceful possession within 6 months of eviction.',
  },
  {
    id: 'gd',
    titleBn: 'সাধারণ ডায়েরি (GD) করার জন্য আবেদন',
    titleEn: 'Application for Police General Diary (GD)',
    category: 'police',
    categoryLabelBn: 'থানা ও পুলিশ',
    categoryLabelEn: 'Police Station',
    recipientDefaultBn: 'ভারপ্রাপ্ত কর্মকর্তা (OC), সংশ্লিষ্ট থানা, বাংলাদেশ পুলিশ',
    recipientDefaultEn: 'Officer-in-Charge (OC), Police Station',
    shortDescBn: 'হুমকি, ব্ল্যাকমেইল, দলিল বা গুরুত্বপূর্ণ সামগ্রী হারানোর বিষয়ে থানায় সাধারণ ডায়েরির আবেদন।',
    shortDescEn: 'General Diary entry application for threats, loss of documents, or intimidation.',
  },
  {
    id: 'dncrp',
    titleBn: 'ভোক্তা অধিকার সংরক্ষণ আইন অনুযায়ী লিখিত অভিযোগ',
    titleEn: 'Written Consumer Complaint under Consumers\' Right Protection Act 2009',
    category: 'admin',
    categoryLabelBn: 'ভোক্তা অধিকার',
    categoryLabelEn: 'Consumer Rights',
    recipientDefaultBn: 'মহাপরিচালক / জেলা উপপরিচালক, জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তর (DNCRP)',
    recipientDefaultEn: 'Director General / Deputy Director, DNCRP',
    shortDescBn: 'ভেজাল, মেয়াদোত্তীর্ণ পণ্য, প্রতারণা বা অতিরিক্ত মূল্যের বিরুদ্ধে ভোক্তা অধিকারের লিখিত অভিযোগ।',
    shortDescEn: 'Formal complaint against deceptive trade practices, expired goods, or overcharging.',
  },
  {
    id: 'dife',
    titleBn: 'বকেয়া মজুরি ও শ্রম অধিকার সুরক্ষার লক্ষ্যে লিখিত অভিযোগ',
    titleEn: 'Labour Rights & Unpaid Wages Complaint to DIFE',
    category: 'admin',
    categoryLabelBn: 'শ্রম অধিকার',
    categoryLabelEn: 'Labour Inspection',
    recipientDefaultBn: 'মহাপরিদর্শক / আঞ্চলিক উপ-মহাপরিদর্শক, কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর (DIFE)',
    recipientDefaultEn: 'Inspector General, DIFE (Ministry of Labour)',
    shortDescBn: 'শ্রম আইন অনুযায়ী বকেয়া বেতন, ওভারটাইম ও ক্ষতিপূরণ আদায়ে শ্রম পরিদর্শক বরাবর অভিযোগ।',
    shortDescEn: 'Administrative complaint for non-payment of wages and statutory labour entitlements.',
  },
  {
    id: 'cheque_dishonour',
    titleBn: 'চেক ডিজঅনারের জন্য ৩০ দিনের আইনি নোটিশ (ধারা ১৩৮)',
    titleEn: 'Statutory 30-Day Legal Notice for Cheque Dishonour under Section 138 NI Act',
    category: 'notice',
    categoryLabelBn: 'আইনি নোটিশ',
    categoryLabelEn: 'Legal Notice',
    recipientDefaultBn: 'চেক প্রদানকারী / দেনাদার (রেজিস্ট্রি এডি ডাকযোগে)',
    recipientDefaultEn: 'Drawer of the Cheque (via Registered Post with A/D)',
    shortDescBn: 'ব্যাংক মেমো প্রাপ্তির ৩০ দিনের মধ্যে দেনাদারকে টাকা পরিশোধের সংবিধিবদ্ধ আইনি নোটিশ।',
    shortDescEn: 'Mandatory 30-day statutory notice to cheque drawer prior to filing criminal suit.',
  },
  {
    id: 'bail_petition',
    titleBn: 'বিজ্ঞ আদালতে নিয়মিত বা অন্তর্বর্তীকালীন জামিনের আবেদন',
    titleEn: 'Petition for Regular / Urgent Bail before Magistrate Court',
    category: 'court',
    categoryLabelBn: 'ফৌজদারি আদালত',
    categoryLabelEn: 'Criminal Court',
    recipientDefaultBn: 'বিজ্ঞ চিফ মেট্রোপলিটন / জুডিশিয়াল ম্যাজিস্ট্রেট আদালত',
    recipientDefaultEn: 'Court of Chief Metropolitan / Judicial Magistrate',
    shortDescBn: 'পরোয়ানা ছাড়া বা ফৌজদারি মামলায় গ্রেফতারকৃত আসামির জরুরি জামিনের জন্য আদালতের আবেদন।',
    shortDescEn: 'Urgent bail application under Sections 496/497 CrPC before Magistrate Court.',
  },
];

export const draftFieldLabels: Record<string, string> = {
  name: 'আবেদনকারী / বাদীর পূর্ণ নাম / Applicant Full Name',
  contact: 'যোগাযোগ (মোবাইল নম্বর) / Phone Number',
  address: 'বর্তমান ঠিকানা / Address',
  recipient: 'প্রাপক ও অধিক্ষেত্র (আদালত / দপ্তর / দেনাদার) / Recipient or Authority',
  respondent: 'প্রতিপক্ষ / বিবাদী / দেনাদারের নাম ও ঠিকানা / Respondent or Debtor',
  place: 'ঘটনা / কর্মস্থল / নালিশি সম্পত্তির অবস্থান / Incident or Property Location',
  date: 'ঘটনার তারিখ ও সময় / Date & Time of Incident',
  role: 'পদবী ও চাকরির সময়কাল / Role & Tenure',
  period: 'বকেয়া মজুরির সময়কাল / Unpaid Period',
  amount: 'দাবিকৃত বা ক্ষতির আর্থিক পরিমাণ / Amount Claimed (BDT)',
  khatianDag: 'খতিয়ান, দাগ, মৌজা ও ভূমির পরিমাণ / Khatian, Dag & Mouza',
  chequeDetails: 'চেক নম্বর ও ব্যাংকের বিবরণ / Cheque No. & Bank Details',
  bankMemoDate: 'ব্যাংক ডিজঅনার রসিদের তারিখ / Dishonour Memo Date',
  chronology: 'ঘটনা বা বিরোধের পূর্ণ বিবরণ / Detailed Facts & Grievance',
  assistance: 'প্রার্থিত প্রতিকার বা সুরক্ষা আদেশ / Relief or Order Prayed For',
  attachments: 'সংযুক্ত নথিপত্র / List of Attachments',
  applicationDate: 'আবেদনের তারিখ / Application Date',
};

export function getRequiredFields(type: DocumentType): string[] {
  const common = ['name', 'contact', 'address', 'recipient', 'place', 'date', 'chronology', 'assistance', 'applicationDate'];

  switch (type) {
    case 'domestic_violence':
      return ['name', 'contact', 'address', 'recipient', 'respondent', 'place', 'date', 'amount', 'chronology', 'assistance', 'applicationDate'];
    case 'family_maintenance':
      return ['name', 'contact', 'address', 'recipient', 'respondent', 'place', 'date', 'amount', 'chronology', 'assistance', 'applicationDate'];
    case 'land_mutation':
      return ['name', 'contact', 'address', 'recipient', 'place', 'khatianDag', 'chronology', 'assistance', 'applicationDate'];
    case 'land_crime_complaint':
      return ['name', 'contact', 'address', 'recipient', 'respondent', 'place', 'date', 'khatianDag', 'chronology', 'assistance', 'applicationDate'];
    case 'possession_recovery':
      return ['name', 'contact', 'address', 'recipient', 'respondent', 'place', 'date', 'khatianDag', 'chronology', 'assistance', 'applicationDate'];
    case 'cheque_dishonour':
      return ['name', 'contact', 'address', 'recipient', 'chequeDetails', 'amount', 'bankMemoDate', 'chronology', 'applicationDate'];
    case 'bail_petition':
      return ['name', 'contact', 'address', 'recipient', 'place', 'date', 'chronology', 'assistance', 'applicationDate'];
    case 'dife':
      return [...common, 'role', 'period', 'amount'];
    case 'dncrp':
      return [...common, 'respondent', 'amount'];
    case 'gd':
    default:
      return common;
  }
}

export function getDraftTitle(type: DocumentType): string {
  const found = DRAFT_CATALOG.find((d) => d.id === type);
  return found ? found.titleBn : 'আইনি দরখাস্ত বা অভিযোগ খসড়া';
}

export function getDefaultRecipient(type: DocumentType): string {
  const found = DRAFT_CATALOG.find((d) => d.id === type);
  return found ? found.recipientDefaultBn : 'ভারপ্রাপ্ত কর্মকর্তা / সংশ্লিষ্ট সরকারি কর্তৃপক্ষ';
}

/**
 * Intelligently analyzes any checklist step or user query to detect
 * which specific legal draft type is required.
 */
export function detectDraftType(stepOrQueryText: string, issueTitle?: string): DocumentType | undefined {
  const text = `${stepOrQueryText} ${issueTitle || ''}`.toLowerCase();

  // 1. Domestic Violence Protection & Relief
  if (
    /পারিবারিক\s*সহিংসতা|সুরক্ষা\s*আদেশ|বউ\s*নির্যাতন|স্ত্রীর\s*উপর\s*অত্যাচার|domestic\s*violence|protection\s*order|ধারা\s*১৪|ধারা\s*১৬/u.test(text)
  ) {
    return 'domestic_violence';
  }

  // 2. Family Maintenance & Dower
  if (
    /দেনমোহর|ভরণপোষণ|খোরপোশ|পারিবারিক\s*আদালত|maintenance|dower|mahr|nikahnama/u.test(text)
  ) {
    return 'family_maintenance';
  }

  // 3. Land Mutation & Succession
  if (
    /নামজারি|মিউটেশন|উত্তরাধিকার|ওয়ারিশ|ওয়ারিশান|খতিয়ান\s*হালনাগাদ|জমাভাগ|mutation|inheritance|khatian/u.test(text)
  ) {
    return 'land_mutation';
  }

  // 4. Land Topsoil Cutting / Dredging Complaint
  if (
    /মাটি\s*কাটা|ড্রেজার|টপসয়েল|টপ\s*সয়েল|ভূমি\s*অপরাধ|topsoil|dredg|sand\s*filling/u.test(text)
  ) {
    return 'land_crime_complaint';
  }

  // 5. Land Possession Recovery (SRA 9)
  if (
    /দখল\s*উদ্ধার|দখলচ্যুতি|বেদখল|জোরপূর্বক\s*উচ্ছেদ|ধারা\s*৯|dispossess|recovery\s*of\s*possession/u.test(text)
  ) {
    return 'possession_recovery';
  }

  // 6. Cheque Dishonour Notice (NI Act 138)
  if (
    /চেক\s*ডিজঅনার|চেক\s*বাউন্স|১৩৮\s*ধারা|cheque\s*dishonou?r|dishonou?red\s*cheque/u.test(text)
  ) {
    return 'cheque_dishonour';
  }

  // 7. Bail Application
  if (
    /জামিনের\s*আবেদন|জামিন\s*প্রার্থনা|ম্যাজিস্ট্রেটে\s*জামিন|bail\s*petition|regular\s*bail/u.test(text)
  ) {
    return 'bail_petition';
  }

  // 8. Consumer Rights Complaint
  if (
    /ভোক্তা\s*অধিকার|ডিএনসিআরপি|ভেজাল|মেয়াদোত্তীর্ণ|dncrp|consumer\s*rights|short\s*weight/u.test(text)
  ) {
    return 'dncrp';
  }

  // 9. Labour / DIFE Wage Complaint
  if (
    /বকেয়া\s*বেতন|বকেয়া\s*মজুরি|ডিআইএফই|শ্রম\s*অধিদপ্তর|unpaid\s*salary|unpaid\s*wages|dife/u.test(text)
  ) {
    return 'dife';
  }

  // 10. Police General Diary (GD)
  if (
    /সাধারণ\s*ডায়েরি|জিডি|থানায়\s*অভিযোগ|থানায়\s*জানিয়ে|নিরাপত্তা\s*সংরক্ষণ|general\s*diary|\bgd\b|police\s*gd/u.test(text)
  ) {
    return 'gd';
  }

  // Fallback for general application mentions
  if (/আদালতে\s*আবেদন|আদালতে\s*মামলা|আইনি\s*আবেদন/u.test(text)) {
    return 'domestic_violence';
  }
  if (/থানায়\s*অভিযোগ|লিখিত\s*অভিযোগ/u.test(text)) {
    return 'gd';
  }

  return undefined;
}

/**
 * Normalizes amount values to avoid stuttering "টাকা টাকা"
 */
function cleanAmount(raw: string): string {
  if (!raw) return '';
  const trimmed = raw.trim();
  if (/টাকা|bdt|tk|\/-/i.test(trimmed)) {
    return trimmed;
  }
  return `${trimmed} টাকা`;
}

/**
 * Normalizes date phrasing to avoid stuttering "গত গত"
 */
function cleanDate(raw: string): string {
  if (!raw) return '';
  const trimmed = raw.trim();
  if (trimmed.startsWith('গত ')) {
    return trimmed;
  }
  return `গত ${trimmed}`;
}

export function prepareDraftDocument(
  type: DocumentType,
  facts: DraftFacts,
  id: string = crypto.randomUUID()
): DraftDocument {
  const values = facts.fields.reduce<Record<string, string>>((acc, f) => {
    acc[f.fieldId] = f.value;
    return acc;
  }, {});

  const required = getRequiredFields(type);
  const unresolved: string[] = [];

  const v = (key: string): string => {
    const val = values[key]?.trim();
    if (val && val.length > 0 && !val.startsWith('[')) return val;
    unresolved.push(key);
    return `[${draftFieldLabels[key] || key} লিখুন]`;
  };

  const recipientVal = values['recipient']?.trim();
  const recipientResolved = Boolean(recipientVal && recipientVal.length > 0 && !recipientVal.startsWith('['));
  if (!recipientResolved) {
    unresolved.push('recipient');
  }
  const displayRecipient = recipientResolved
    ? recipientVal
    : `[${draftFieldLabels['recipient'] || 'প্রাপক ও অধিক্ষেত্র'} যাচাই করে লিখুন]`;

  const dateVal = values['applicationDate']?.trim();
  const dateResolved = Boolean(dateVal && dateVal.length > 0 && !dateVal.startsWith('['));
  if (!dateResolved) {
    unresolved.push('applicationDate');
  }
  const displayDate = dateResolved
    ? dateVal
    : `[${draftFieldLabels['applicationDate'] || 'আবেদনের তারিখ'} লিখুন]`;

  let paragraphs: string[] = [];

  // =====================================================================
  // 1. DOMESTIC VIOLENCE PROTECTION & RELIEF (Act 2010 Sec 14/15/16)
  // =====================================================================
  if (type === 'domestic_violence') {
    paragraphs = [
      `মোকাম: ${displayRecipient}`,
      `পারিবারিক সহিংসতা বিবিধ পিটিশন মোকদ্দমা নং: ________________ / ২০২__`,
      `দরখাস্তকারী / নির্যাতিতা:\n${v('name')}\nবর্তমান ঠিকানা: ${v('address')}\nমোবাইল নম্বর: ${v('contact')}`,
      `বনাম`,
      `প্রতিপক্ষ / অভিযুক্ত:\n${v('respondent')}\nঘটনা/অবস্থান: ${v('place')}`,
      `বিষয়: পারিবারিক সহিংসতা (প্রতিরোধ ও সুরক্ষা) আইন, ২০১০-এর ধারা ১৪, ১৫ ও ১৬ অনুযায়ী সুরক্ষা আদেশ (Protection Order), নিরাপদ বাসস্থান (Residence Order) এবং জরুরি চিকিৎসা ও অন্তর্বর্তীকালীন আর্থিক ক্ষতিপূরণের প্রার্থনায় পিটিশন আরজি।`,
      `বিনীত নিবেদন এই যে, দরখাস্তকারী নিম্নবর্ণিত মর্মে বিজ্ঞ আদালতের সদয় বিবেচনার জন্য আরজি পেশ করিতেছেন—`,
      `১. পক্ষগণের পরিচয় ও পারিবারিক সম্পর্ক:\nদরখাস্তকারী একজন আইনসম্মত নাগরিক ও সংক্ষুব্ধ ব্যক্তি (Aggrieved Person) এবং প্রতিপক্ষের সহিত বৈধ পারিবারিক সম্পর্কে আবদ্ধ।`,
      `২. ঘটনার সময় ও স্থান:\n${cleanDate(v('date'))} তারিখে ${v('place')} এলাকায় প্রতিপক্ষ কর্তৃক দরখাস্তকারী শারীরিক, মানসিক ও মৌখিক পারিবারিক সহিংসতার শিকার হন।`,
      `৩. সহিংসতার ধারাবাহিক বিবরণ ও নির্যাতন:\n${v('chronology')}`,
      `৪. আর্থিক ক্ষতি ও চিকিৎসা ব্যয়:\nপ্রতিপক্ষের অন্যায় মারধর ও শারীরিক নির্যাতনের ফলে দরখাস্তকারীর আনুমানিক ${cleanAmount(v('amount'))} চিকিৎসা ব্যয় ও আর্থিক ক্ষতি সাধিত হইয়াছে।`,
      `৫. আশু আদালতের সুরক্ষার আবশ্যকতা:\nদরখাস্তকারীর জীবন ও শারীরিক নিরাপত্তা বর্তমানে চরম ঝুঁকিতে রহিয়াছে। অবিলম্বে আদালতের সুরক্ষা আদেশ ব্যতিরেকে দরখাস্তকারীর জীবন রক্ষা করা অসম্ভব হইয়া পড়িয়াছে।`,
      `অতএব বিনীত প্রার্থনা এই যে, বিজ্ঞ আদালত উপরোক্ত বিষয়াদি পর্যালোচনা করিয়া—\nক. পারিবারিক সহিংসতা (প্রতিরোধ ও সুরক্ষা) আইন, ২০১০-এর ধারা ১৪ অনুযায়ী প্রতিপক্ষ যেন দরখাস্তকারীর সহিত কোনো প্রকার সহিংস আচরণ করিতে না পারে তজ্জন্য অবিলম্বে সুরক্ষা আদেশ জারি করিতে;\nখ. ধারা ১৫ অনুযায়ী দরখাস্তকারীর নিরাপদ বাসস্থান নিশ্চিত করিতে;\nগ. ধারা ১৬ অনুযায়ী প্রয়োজনীয় অন্তর্বর্তীকালীন চিকিৎসা ব্যয় বাবদ নগদ ক্ষতিপূরণের আদেশ দানে বিজ্ঞ আদালতের সদয় মর্জি হয়।`,
      `হলফনামা / সত্যপাঠ:\nআমি শপথপূর্বক ঘোষণা করিতেছি যে, অত্র দরখাস্তের বর্ণিত তথ্যাবলি আমার জ্ঞান ও বিশ্বাসমতে সত্য এবং কোনো তথ্য গোপন করা হয় নাই।`,
      `সংযুক্ত প্রমাণাদি:\n${values['attachments']?.trim() || '১. সরকারি হাসপাতালের চিকিৎসা ব্যবস্থাপত্র ও আঘাতের ছবি, ২. জাতীয় পরিচয়পত্রের অনুলিপি, ৩. স্থানীয় সালিশের তথ্য (যদি থাকে)'}`,
      `আবেদনের তারিখ: ${displayDate}`,
      `দরখাস্তকারীর স্বাক্ষর: ____________________\n(${values['name']?.trim() || 'দরখাস্তকারী'})`,
    ];
  }

  // =====================================================================
  // 2. FAMILY MAINTENANCE & DOWER (Family Courts Act 2023 Sec 5 & 6)
  // =====================================================================
  else if (type === 'family_maintenance') {
    paragraphs = [
      `মোকাম: ${displayRecipient}`,
      `পারিবারিক মোকদ্দমা নং: ________________ / ২০২__`,
      `বাদী:\n${v('name')}\nবর্তমান ঠিকানা: ${v('address')}\nমোবাইল নম্বর: ${v('contact')}`,
      `বনাম`,
      `বিবাদী:\n${v('respondent')}\nঠিকানা: ${v('place')}`,
      `বিষয়: পারিবারিক আদালত আইন, ২০২৩ (২০২৩ সনের ২৬ নং আইন)-এর ধারা ৫ ও ৬ অনুযায়ী দেনমোহর এবং বিগত ও চলমান ভরণপোষণ (খোরপোশ) আদায়ের আরজি।`,
      `মোকদ্দমার মূল্যায়ন: দাবিকৃত দেনমোহর ও বকেয়া খোরপোশ বাবদ মোট ${cleanAmount(v('amount'))}। কোর্ট ফি আইন মোতাবেক নির্ধারিত ফি দাখিল করা হইল।`,
      `বিনীত নিবেদন এই যে, বাদী নিম্নবর্ণিত মর্মে বিজ্ঞ আদালতের সুবিচারের জন্য আরজি দাখিল করিতেছেন—`,
      `১. পক্ষগণের বিবাহ ও কাবিননামা:\nবাদী ও বিবাদীর মধ্যে ইসলামি শরিয়ত মোতাবেক রেজিস্ট্রি কাবিননামা মূলে বিবাহ অনুষ্ঠিত হয় এবং উক্ত বিবাহ অদ্যাবধি বলবৎ রহিয়াছে।`,
      `২. অধিক্ষেত্র ও বাদীর বর্তমান বসবাস:\nবিবাদী দীর্ঘদিন যাবত বাদীকে অবহেলা করিয়া ভরণপোষণ প্রদানে বিরত রহিয়াছেন। পারিবারিক আদালত আইন ২০২৩-এর ধারা ৬ অনুযায়ী বাদী বর্তমানে যে এলাকায় বাবার বাড়ি বা আশ্রয়ে বসবাস করিতেছেন (${v('address')}), উক্ত এলাকা এই আদালতের আঞ্চলিক অধিক্ষেত্রভুক্ত।`,
      `৩. পাওনা দেনমোহর ও খোরপোশের সুনির্দিষ্ট হিসাব:\n${cleanAmount(v('amount'))}\nবিবাদী উপযুক্ত সামর্থ্যবান হওয়া সত্ত্বেও বাদীর আইনসঙ্গত তলবি/স্থগিত দেনমোহর এবং দৈনিক আহার-বস্ত্রের ভরণপোষণ প্রদান করিতেছেন না।`,
      `৪. মোকদ্দমার কারণ (Cause of Action):\n${cleanDate(v('date'))} তারিখে বিবাদী শেষবার বাদীকে ভরণপোষণ দিতে অস্বীকার করে এবং ${v('chronology')}`,
      `অতএব বিনীত প্রার্থনা এই যে, বিজ্ঞ আদালত বাদীর আরজি গ্রহণ করিয়া—\nক. বিবাদীর নিকট হইতে বাদীর আইনসম্মত দেনমোহরের পাওনা ডিক্রি করিতে;\nখ. বিগত দিনের বকেয়া খোরপোশ এবং মোকদ্দমা চলাকালীন ও ভবিষ্যৎ নিয়মিত মাসিক উপযুক্ত হারে খোরপোশের আদেশ দানে বিজ্ঞ আদালতের সদয় মর্জি হয়।`,
      `সত্যপাঠ (CPC Order VI Rule 15 ও পারিবারিক আদালত আইন ২০২৩ অনুযায়ী):\nআমি শপথপূর্বক বলিতেছি যে, অত্র আরজির ১ হইতে ৪ দফার বিবরণ আমার জ্ঞান ও বিশ্বাসমতে সত্য এবং অবশিষ্ট দফার বিবরণ আইনজীবীর পরামর্শমতে সঠিক জানিয়া অদ্য ${displayDate} তারিখে নিজ নাম দস্তখত করিলাম।`,
      `সংযুক্ত দালিলিক প্রমাণাদি:\n${values['attachments']?.trim() || '১. রেজিস্ট্রি কাবিননামার সহি মোহরযুক্ত নকল, ২. ইউনিয়ন পরিষদ/পৌরসভার সালিশি নোটিশ, ৩. জাতীয় পরিচয়পত্রের অনুলিপি'}`,
      `বাদীর স্বাক্ষর: ____________________\n(${values['name']?.trim() || 'বাদী'})`,
    ];
  }

  // =====================================================================
  // 3. LAND MUTATION & INHERITANCE (SAT 1950 Sec 143A)
  // =====================================================================
  else if (type === 'land_mutation') {
    paragraphs = [
      `বরাবর\n${displayRecipient}`,
      `বিষয়: রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন, ১৯৫০ (State Acquisition & Tenancy Act, 1950)-এর ধারা ১৪৩এ এবং ভূমি ব্যবস্থাপনা ম্যানুয়াল অনুযায়ী পিতার মৃত্যুর পর ওয়ারিশান সূত্রে প্রাপ্ত জমির ই-নামজারি ও নতুন খতিয়ান প্রস্তুতের আবেদন।`,
      `মহোদয়,\nবিনীত নিবেদন এই যে, আমি নিম্নস্বাক্ষরকারী আবেদনকারী আপনার কার্যালয়ের সদয় সুবিবেচনার জন্য প্রার্থনা জানাইতেছি যে—`,
      `১. আবেদনকারীর পরিচয় ও ওয়ারিশান স্বত্ব:\nআমি ${v('name')}, পিতা: মরহুম পূর্ববর্তী রেকর্ডীয় মালিক। পিতার মৃত্যুর পর আমি ও অন্যান্য বৈধ ওয়ারিশগণ মুসলিম ফারায়েজ ও পারিবারিক আইন অনুযায়ী নালিশি সম্পত্তির নিরঙ্কুশ উত্তরাধিকারী হইয়াছি।`,
      `২. নালিশি ভূমির তফসিল পরিচয়:\nমৌজা ও এলাকা: ${v('place')}\nখতিয়ান, দাগ ও ভূমির পরিমাণ: ${v('khatianDag')}`,
      `৩. ঘটনার বিবরণ ও নামজারির প্রয়োজনীয়তা:\n${v('chronology')}\nপিতার মৃত্যুর পর নিজ নামে সরকারি রেকর্ড হালনাগাদ ও ই-নামজারি সম্পন্ন করিয়া সরকারের অনুকূলে নিয়মিত ভূমি উন্নয়ন কর (খাজনা) দাখিলা প্রদানের জন্য নামজারি আবশ্যক হইয়া পড়িয়াছে।`,
      `৪. প্রার্থিত প্রতিকার:\n${v('assistance') || 'সরজমিন তদন্ত ও শুনানি অন্তে পিতার নামীয় খতিয়ান সংশোধনপূর্বক আবেদনকারীর নামে পৃথক জোত/খতিয়ান সৃজন করা হউক।'}`,
      `অতএব মহোদয়ের সমীপে বিনীত প্রার্থনা, সংযুক্ত নথিপত্র ও মূল ওয়ারিশান সনদ যাচাইপূর্বক রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইনের বিধান অনুযায়ী আবেদনকারীর নামে যথারীতি নামজারি খতিয়ান জারি ও ডিসিআর (DCR) প্রদানের আদেশ দানে সদয় মর্জি হয়।`,
      `সংযুক্ত নথিপত্র:\n${values['attachments']?.trim() || '১. মূল ওয়ারিশান সনদ, ২. পিতার মূল মৃত্যু সনদ, ৩. সিএস/এসএ/আরএস খতিয়ান ও মূল দলিলের কপি, ৪. হালনাগাদ ভূমি উন্নয়ন কর (খাজনা) দাখিলা, ৫. এনআইডি ও ছবি'}`,
      `আবেদনের তারিখ: ${displayDate}`,
      `বিনীত নিবেদক: ____________________\n(${values['name']?.trim() || 'আবেদনকারী'})`,
    ];
  }

  // =====================================================================
  // 4. LAND CRIME PREVENTION COMPLAINT (Land Crime Act 2023 Sec 13 & 19)
  // =====================================================================
  else if (type === 'land_crime_complaint') {
    paragraphs = [
      `বরাবর\n${displayRecipient}`,
      `বিষয়: ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩-এর ধারা ১৩ ও ১৯ অনুযায়ী কৃষিজমির উপরিভাগের উর্বর মাটি (টপসয়েল) অবৈধভাবে কাটা/ভরাট বন্ধ, পরিবেশ রক্ষা ও শান্তিভঙ্গ রোধে জরুরি অভিযোগ।`,
      `মহোদয়,\nবিনীত নিবেদন এই যে, আমি ${v('name')}, বর্তমান ঠিকানা: ${v('address')}, মোবাইল: ${v('contact')}। আপনার সদয় দৃষ্টি আকর্ষণপূর্বক জানাইতেছি যে—`,
      `১. ঘটনাস্থল ও নালিশি জমির তফসিল:\nঅবস্থান: ${v('place')}\nখতিয়ান ও দাগ নম্বর: ${v('khatianDag')}`,
      `২. অভিযুক্ত ব্যক্তি / ভূমি দখলদার:\n${v('respondent')}`,
      `৩. ভূমি অপরাধের সুস্পষ্ট বিবরণ:\n${v('chronology')}\nপ্রতিপক্ষ জেলা প্রশাসনের কোনো বৈধ অনুমতি ব্যতিরেকে ক্ষমতার অপব্যবহার করিয়া ভারী ড্রেজার ও এক্সকাভেটর দিয়া কৃষিজমির উর্বর টপসয়েল কাটিয়া বিক্রি করিতেছে / অবৈধভাবে বালু ভরাট করিয়া ফসলি জমির স্থায়ী পরিবেশগত ক্ষতিসাধন করিতেছে।`,
      `৪. জরুরি প্রশাসনিক হস্তক্ষেপের আইনি আবশ্যকতা:\nঅবিলম্বে প্রশাসনিক হস্তক্ষেপ ব্যতিরেকে জমির ভৌগোলিক রূপান্তর ও আইনশৃঙ্খলার চরম অবনতি ঘটিবে। ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩-এর ধারা ১৩ অনুযায়ী জেলা প্রশাসকের অনুমতি ব্যতিরেকে কৃষিজমির উপরিভাগের উর্বর মাটি কাটা বা শ্রেণি পরিবর্তন শাস্তিযোগ্য জামিন-অযোগ্য অপরাধ।`,
      `অতএব মহোদয়ের নিকট আকুল প্রার্থনা, অবিলম্বে সরেজমিন মোবাইল কোর্ট (ভ্রাম্যমাণ আদালত) পরিচালনাপূর্বক অবৈধ মাটি কাটার কাজে ব্যবহৃত ড্রেজার ও যানবাহন জব্দ করিয়া কাজ তাৎক্ষণিক বন্ধের নির্দেশ দানে এবং দোষীদের বিরুদ্ধে আইনানুগ ব্যবস্থা গ্রহণে সদয় মর্জি হয়।`,
      `সংযুক্ত প্রমাণাদি:\n${values['attachments']?.trim() || '১. ভূমির মালিকানার খতিয়ান ও খাজনা দাখিলা, ২. ঘটনাস্থলে অবৈধ মাটি কাটার স্পষ্ট স্থিরচিত্র ও ভিডিও'}`,
      `আবেদনের তারিখ: ${displayDate}`,
      `আবেদনকারীর স্বাক্ষর: ____________________\n(${values['name']?.trim() || 'আবেদনকারী'})`,
    ];
  }

  // =====================================================================
  // 5. SUMMARY SUIT FOR POSSESSION RECOVERY (Specific Relief Act 1877 Sec 9)
  // =====================================================================
  else if (type === 'possession_recovery') {
    paragraphs = [
      `মোকাম: ${displayRecipient}`,
      `দেওয়ানি মোকদ্দমা নং: ________________ / ২০২__`,
      `বাদী:\n${v('name')}\nবর্তমান ঠিকানা: ${v('address')}, মোবাইল: ${v('contact')}`,
      `বনাম`,
      `বিবাদী:\n${v('respondent')}\nঠিকানা: ${v('place')}`,
      `বিষয়: সুনির্দিষ্ট প্রতিকার আইন, ১৮৭৭ (Specific Relief Act, 1877)-এর ধারা ৯ অনুযায়ী স্বত্ব প্রমাণ ব্যতিরেকে বলপ্রয়োগে বেদখলকৃত স্থাবর সম্পত্তির দখল পুনরুদ্ধারের সংক্ষিপ্ত দেওয়ানি আরজি।`,
      `মোকদ্দমার মূল্যায়ন: নালিশি জমির বার্ষিক মুনাফা/মূল্যমান বিবেচনাপূর্বক সুনির্দিষ্ট প্রতিকার আইনের ৯ ধারা অনুযায়ী নির্ধারিত অ্যাডভেলোরেম কোর্ট ফির অর্ধেক ফি দাখিল করা হইল।`,
      `বিনীত নিবেদন এই যে, বাদী নিম্নরূপ আর্জি পেশ করিতেছেন—`,
      `১. বাদীর পূর্ববর্তী শান্তিপূর্ণ অবিচ্ছিন্ন দখল:\nবাদী নালিশি তফসিলে বর্ণিত ভূমিতে দীর্ঘকাল যাবৎ বৈধ, প্রকাশ্য ও শান্তিপূর্ণ দখলে নিয়োজিত ছিলেন।`,
      `২. বলপ্রয়োগে বেআইনি দখলচ্যুতির বিবরণ ও সংবিধিবদ্ধ ৬ মাসের তামাদি সীমা:\n${cleanDate(v('date'))} তারিখে বিবাদী বাদীর বিনা সম্মতিতে এবং উপযুক্ত আইনের প্রক্রিয়া ব্যতিরেকে লাঠিয়াল বাহিনী দ্বারা জোরপূর্বক বাদীর বৈধ দখল উচ্ছেদ করিয়া সম্পত্তি দখল করিয়াছে। ঘটনাটি তামাদি আইনের ৩ অনুচ্ছেদ ও ৯ ধারা অনুযায়ী ৬ মাসের সংবিধিবদ্ধ সময়সীমার মধ্যে সংঘটিত হইয়াছে।`,
      `৩. ঘটনার পটভূমি ও দখলচ্যুতি:\n${v('chronology')}`,
      `৪. নালিশি সম্পত্তির তফসিল ও চৌহদ্দি:\nমৌজা ও এলাকা: ${v('place')}\nখতিয়ান ও দাগ নম্বর: ${v('khatianDag')}\nচৌহদ্দি: উত্তরে বিবাদীর জমি, দক্ষিণে রাস্তা, পূর্বে সরকারি খাল, পশ্চিমে অপর জোতদার।`,
      `৫. স্বত্ব প্রমাণ ব্যতিরেকে দখল পুনরুদ্ধারের অধিকার:\nসুনির্দিষ্ট প্রতিকার আইনের ধারা ৯-এর বিধান অনুযায়ী স্বত্ব বা টাইটেল প্রমাণ ব্যতিরেকে কেবল বেআইনি উচ্ছেদ ও পূর্ববর্তী শান্তিপূর্ণ দখলের ভিত্তিতে বাদীর দখল প্রত্যর্পণ পাইবার আইনানুগ অধিকার রহিয়াছে।`,
      `অতএব বিনীত প্রার্থনা এই যে, বিজ্ঞ আদালত নালিশি সম্পত্তির দখল বিবাদীর নিকট হইতে উচ্ছেদ করিয়া বাদীর অনুকূলে দখল প্রত্যর্পণ করার ডিক্রি দানে বিজ্ঞ আদালতের সদয় মর্জি হয়।`,
      `সত্যপাঠ (Verification CPC Order VI Rule 15):\nআমি শপথপূর্বক বলিতেছি যে, অত্র আরজির ১ হইতে ৫ দফার বিবরণ আমার জ্ঞান ও চাক্ষুষ বাস্তব সত্য এবং অদ্য ${displayDate} তারিখে সুস্থ মস্তিষ্কে অত্র আরজিতে নিজ নাম দস্তখত করিলাম।`,
      `সংযুক্ত প্রমাণাদি:\n${values['attachments']?.trim() || '১. পূর্ববর্তী দখলের প্রমাণপত্র (হোল্ডিং ট্যাক্স রসিদ, বিদ্যুৎ বিলের কপি), ২. স্থানীয় গণ্যমান্য ব্যক্তিদের প্রত্যয়নপত্র, ৩. থানায় দায়েরকৃত পূর্বের অভিযোগের কপি'}`,
      `বাদীর স্বাক্ষর: ____________________\n(${values['name']?.trim() || 'বাদী'})`,
    ];
  }

  // =====================================================================
  // 6. POLICE GENERAL DIARY (Police Act 1861 Sec 44 / PRB 377)
  // =====================================================================
  else if (type === 'gd') {
    const respondentText = values['respondent']?.trim() || 'জ্ঞাত / অজ্ঞাতনামা ব্যক্তিগণ';
    paragraphs = [
      `বরাবর\n${displayRecipient}`,
      `বিষয়: ভবিষ্যৎ নিরাপত্তা বিধান, সতর্কতা ও আইনি সুরক্ষার্থে সাধারণ ডায়েরি (GD) ভুক্তির আবেদন।`,
      `মহোদয়,\nবিনীত নিবেদন এই যে, আমি নিম্নস্বাক্ষরকারী আবেদনকারী আপনার থানার সদয় অবগতির জন্য জানাইতেছি যে—`,
      `১. আবেদনকারীর পরিচয়:\nনাম: ${v('name')}\nবর্তমান ঠিকানা: ${v('address')}\nমোবাইল নম্বর: ${v('contact')}`,
      `২. প্রতিপক্ষ / অভিযুক্ত / সন্দেহভাজনদের বিবরণ:\n${respondentText}`,
      `৩. ঘটনার সময় ও স্থান:\n${cleanDate(v('date'))} তারিখে ${v('place')} এলাকায়।`,
      `৪. ঘটনার বিস্তারিত বিবরণ ও ভীতির কারণ:\n${v('chronology')}\nউক্ত ঘটনার প্রেক্ষিতে আমি ও আমার পরিবারের সদস্যগণ চরম নিরাপত্তাহীনতায় ভুগিতেছি এবং ভবিষ্যতে প্রাণনাশ বা জানমালের গুরুতর ক্ষতির আশঙ্কা করিতেছি।`,
      `৫. প্রার্থিত প্রতিকার:\n${v('assistance') || 'উপরোক্ত বিষয়টি থানার সাধারণ ডায়েরি (GD) রেজিস্টারে যথাযথভাবে লিপিবদ্ধ করত আমাকে একটি জিডি নম্বর সম্বলিত অনুলিপি প্রদান করিতে এবং প্রয়োজনীয় পুলিশি নজরদারি ও আইনি সুরক্ষার ব্যবস্থা গ্রহণে আপনার সদয় মর্জি হয়।'}`,
      `অতএব মহোদয়ের সমীপে বিনীত প্রার্থনা, উক্ত বিষয়টি সাধারণ ডায়েরি হিসেবে নথিভুক্ত করিয়া আইনগত ব্যবস্থা গ্রহণে আপনার সদয় মর্জি হয়।`,
      `সংযুক্ত নথিপত্র:\n${values['attachments']?.trim() || 'জাতীয় পরিচয়পত্রের অনুলিপি ও সংশ্লিষ্ট প্রমাণের কপি'}`,
      `আবেদনের তারিখ: ${displayDate}`,
      `আবেদনকারীর স্বাক্ষর: ____________________\n(${values['name']?.trim() || 'আবেদনকারী'})`,
    ];
  }

  // =====================================================================
  // 7. CONSUMER RIGHTS COMPLAINT (Consumers' Right Protection Act 2009 Sec 60/76)
  // =====================================================================
  else if (type === 'dncrp') {
    paragraphs = [
      `বরাবর\n${displayRecipient}`,
      `বিষয়: ভোক্তা অধিকার সংরক্ষণ আইন, ২০০৯-এর ধারা ৬০ অনুযায়ী প্রতারণা, ভেজাল/মেয়াদোত্তীর্ণ পণ্য বিক্রয় এবং আর্থিক ক্ষতির বিরুদ্ধে লিখিত অভিযোগ।`,
      `মহোদয়,\nবিনীত নিবেদন এই যে, আমি একজন সংক্ষুব্ধ সাধারণ ভোক্তা হিসেবে আপনার দপ্তরে সুবিচারের জন্য নিম্নরূপ অভিযোগ পেশ করিতেছি—`,
      `১. অভিযোগকারীর বিবরণ:\nনাম: ${v('name')}\nবর্তমান ঠিকানা: ${v('address')}\nমোবাইল: ${v('contact')}`,
      `২. অভিযুক্ত প্রতিষ্ঠান / বিক্রেতার বিবরণ:\n${v('respondent')}\nপ্রতিষ্ঠানের অবস্থান / ঠিকানা: ${v('place')}`,
      `৩. পণ্য/সেবা ক্রয়ের তারিখ ও ক্যাশ মেমোর বিবরণ:\nক্রয়ের তারিখ: ${cleanDate(v('date'))}\nপ্রতারিত/দাবিকৃত আর্থিক পরিমাণ: ${cleanAmount(v('amount'))}`,
      `৪. ভোক্তা অধিকার লঙ্ঘনের সুনির্দিষ্ট অভিযোগ:\n${v('chronology')}\nঅভিযুক্ত প্রতিষ্ঠান ভোক্তা অধিকার সংরক্ষণ আইন, ২০০৯-এর ধারা ৩৭/৩৮/৪০/৪১/৪২/৪৫ অনুযায়ী নির্ধারিত আইন লঙ্ঘন করিয়া প্রতারণামূলক ব্যবসা পরিচালনা করিয়াছে।`,
      `৫. সংবিধিবদ্ধ ৩০ দিনের সময়সীমা ও ২৫% প্রণোদনা:\nধারা ৬০ অনুযায়ী ঘটনার ৩০ (ত্রিশ) দিনের মধ্যে অত্র অভিযোগ দাখিল করা হইল। এছাড়াও ধারা ৭৬(৪) অনুযায়ী আদায়কৃত প্রশাসনিক জরিমানার ২৫% অংশ অভিযোগকারী হিসেবে পাওয়ার আইনগত অধিকার রহিয়াছে।`,
      `৬. প্রার্থিত প্রতিকার:\n${v('assistance') || 'অভিযোগটি আমলে নিয়া অভিযুক্ত প্রতিষ্ঠানের বিরুদ্ধে তদন্তপূর্বক আইনানুগ ব্যবস্থা গ্রহণ, আর্থিক জরিমানা আরোপ এবং ধারা ৭৬(৪) অনুযায়ী আরোপিত জরিমানার ২৫% অভিযোগকারীকে প্রদানের আদেশ দানে সদয় মর্জি হয়।'}`,
      `অতএব মহোদয়ের নিকট বিনীত প্রার্থনা, ন্যায়বিচার নিশ্চিতকল্পে প্রয়োজনীয় আইনানুগ ব্যবস্থা গ্রহণে সদয় মর্জি হয়।`,
      `সংযুক্ত দালিলিক প্রমাণাদি:\n${values['attachments']?.trim() || '১. ক্রয়ের মূল ক্যাশ মেমো / মানি রসিদ, ২. পণ্যের মোড়ক ও মেয়াদোত্তীর্ণ তারিখের স্পষ্ট ছবি, ৩. জাতীয় পরিচয়পত্রের অনুলিপি'}`,
      `আবেদনের তারিখ: ${displayDate}`,
      `অভিযোগকারীর স্বাক্ষর: ____________________\n(${values['name']?.trim() || 'অভিযোগকারী'})`,
    ];
  }

  // =====================================================================
  // 8. LABOUR INSPECTION COMPLAINT (Bangladesh Labour Act 2006 Sec 121/123/132)
  // =====================================================================
  else if (type === 'dife') {
    const respondentText = values['respondent']?.trim() || values['place']?.trim() || 'কারখানা কর্তৃপক্ষ / মালিকপক্ষ';
    paragraphs = [
      `বরাবর\n${displayRecipient}`,
      `বিষয়: বাংলাদেশ শ্রম আইন, ২০০৬-এর ধারা ১২১, ১২৩ ও ১৩২ অনুযায়ী বকেয়া মজুরি ও আইনানুগ ক্ষতিপূরণ আদায়ের লক্ষ্যে লিখিত অভিযোগ।`,
      `মহোদয়,\nবিনীত নিবেদন এই যে, আমি নিম্নস্বাক্ষরকারী শ্রমিক আপনার অধিদপ্তরের সদয় হস্তক্ষেপ ও আইনানুগ প্রতিকার প্রার্থনায় জানাইতেছি যে—`,
      `১. শ্রমিকের পরিচয় ও চাকরির বিবরণ:\nনাম: ${v('name')}\nবর্তমান ঠিকানা: ${v('address')}, মোবাইল: ${v('contact')}\nপদবী ও চাকরির সময়কাল: ${v('role')}`,
      `২. অভিযুক্ত কারখানা / প্রতিষ্ঠানের বিবরণ:\nমালিক/ব্যবস্থাপনা কর্তৃপক্ষ: ${respondentText}\nকারখানা/প্রতিষ্ঠানের অবস্থান: ${v('place')}`,
      `৩. বকেয়া মজুরির সুনির্দিষ্ট হিসাব ও সময়কাল:\nবকেয়ার সময়কাল: ${v('period')}\nসর্বমোট বকেয়া মজুরির পরিমাণ: ${cleanAmount(v('amount'))}`,
      `৪. শ্রম আইন লঙ্ঘনের বিবরণ:\n${v('chronology')}\nবাংলাদেশ শ্রম আইন ২০০৬-এর ১২১ ও ১২৩ ধারা অনুযায়ী পরবর্তী মাসের ৭ কার্যদিবসের মধ্যে মজুরি পরিশোধের আইনি বাধ্যবাধকতা থাকা সত্ত্বেও মালিকপক্ষ তাহা অমান্য করিয়াছে। বারবার অনুরোধ সত্ত্বেও মজুরি পরিশোধ করা হয় নাই।`,
      `৫. প্রার্থিত প্রতিকার:\n${v('assistance') || 'উক্ত প্রতিষ্ঠানে অবিলম্বে শ্রম পরিদর্শক প্রেরণপূর্বক সরজমিন পরিদর্শন করিয়া শ্রম আইনের বিধান অনুযায়ী শ্রমিকের সমুদয় বকেয়া মজুরি আদায়ের নির্দেশ দানে এবং সংশ্লিষ্ট প্রতিষ্ঠানের বিরুদ্ধে আইনি ব্যবস্থা গ্রহণে আপনার সদয় মর্জি হয়।'}`,
      `অতএব মহোদয়ের নিকট আকুল প্রার্থনা, উক্ত বিষয়ে যথাযথ আইনানুগ ব্যবস্থা গ্রহণে আপনার সদয় মর্জি হয়।`,
      `সংযুক্ত নথিপত্র:\n${values['attachments']?.trim() || '১. কারখানা পরিচয়পত্র (ID Card) ও নিয়োগপত্র, ২. পূর্ববর্তী বেতন রসিদ বা ব্যাংক স্টেটমেন্ট, ৩. এনআইডি কপি'}`,
      `আবেদনের তারিখ: ${displayDate}`,
      `অভিযোগকারী শ্রমিকের স্বাক্ষর: ____________________\n(${values['name']?.trim() || 'অভিযোগকারী শ্রমিক'})`,
    ];
  }

  // =====================================================================
  // 9. STATUTORY CHEQUE DISHONOUR NOTICE (NI Act 1881 Sec 138)
  // =====================================================================
  else if (type === 'cheque_dishonour') {
    paragraphs = [
      `রেজিস্ট্রি ডাকযোগে এডি সহ প্রেরিত / সংবিধিবদ্ধ আইনি নোটিশ (Statutory Legal Notice)`,
      `প্রাপক (চেক প্রদানকারী / দেনাদার):\n${displayRecipient}`,
      `প্রেরক (চেক গ্রহীতা / পাওনাদার):\n${v('name')}\nবর্তমান ঠিকানা: ${v('address')}, মোবাইল: ${v('contact')}`,
      `বিষয়: দ্য নেগোশিয়েবল ইনস্ট্রুমেন্টস অ্যাক্ট, ১৮৮১ (The Negotiable Instruments Act, 1881)-এর ধারা ১৩৮ অনুযায়ী চেক ডিজঅনার বাবদ দাবিকৃত ${cleanAmount(v('amount'))} আগামী ৩০ (ত্রিশ) দিনের মধ্যে পরিশোধের সংবিধিবদ্ধ আইনি নোটিশ।`,
      `জনাব / মহাশয়,\nআমার পক্ষ হইতে আপনাকে এই মর্মে চূড়ান্ত আইনি নোটিশ প্রদান করিতেছি যে—`,
      `১. চেকের বিবরণ ও দেনা দায়:\nআপনার দেনা পরিশোধের নিমিত্তে আপনি আমার বরাবর নিম্নবর্ণিত চেক ইস্যু করিয়াছিলেন:\n${v('chequeDetails')}\nটাকার পরিমাণ: ${cleanAmount(v('amount'))}।`,
      `২. ব্যাংকে উপস্থাপন ও ডিজঅনার মেমো:\nউক্ত চেকটি নগদায়নের জন্য নির্ধারিত ব্যাংকে জমা দিলে সংশ্লিষ্ট ব্যাংক কর্তৃপক্ষ ${cleanDate(v('bankMemoDate'))} তারিখে "তহবিল অপ্রতুল" (Insufficient Funds) মর্মে ডিজঅনার স্লিপ/মেমো সহ ফেরত প্রদান করে।`,
      `৩. ঘটনার পটভূমি ও বিরোধ:\n${v('chronology')}`,
      `৪. সংবিধিবদ্ধ ৩০ দিনের চূড়ান্ত আলটিমেটাম:\nঅতএব দ্য নেগোশিয়েবল ইনস্ট্রুমেন্টস অ্যাক্ট, ১৮৮১-এর ধারা ১৩৮(১)(গ) অনুযায়ী অত্র নোটিশ প্রাপ্তির ৩০ (ত্রিশ) দিনের মধ্যে চেকের উল্লেখিত সর্বমোট ${cleanAmount(v('amount'))} সম্পূর্ণ পরিশোধ করিবার জন্য আপনাকে অনুরোধ করা যাইতেছে।`,
      `সতর্কবার্তা:\nঅন্যথায় উক্ত ৩০ দিনের সময় অতিক্রান্ত হইলে দ্য নেগোশিয়েবল ইনস্ট্রুমেন্টস অ্যাক্ট, ১৮৮১-এর ধারা ১৩৮ ও ১৪১ অনুযায়ী আপনার বিরুদ্ধে উপযুক্ত বিজ্ঞ চিফ মেট্রোপলিটন / জুডিশিয়াল ম্যাজিস্ট্রেট আদালতে ফৌজদারি মামলা দায়ের করা হইবে। উক্ত মামলায় দোষী সাব্যস্ত হইলে ১ (এক) বছর পর্যন্ত কারাদণ্ড এবং চেকের মূল্যের তিন গুণ পর্যন্ত অর্থদণ্ড প্রদানের বিধান রহিয়াছে।`,
      `নোটিশ প্রেরণের তারিখ: ${displayDate}`,
      `নোটিশ প্রেরকের স্বাক্ষর: ____________________\n(${values['name']?.trim() || 'নোটিশ প্রেরক'})`,
    ];
  }

  // =====================================================================
  // 10. CRIMINAL BAIL PETITION (CrPC 1898 Sec 496/497)
  // =====================================================================
  else if (type === 'bail_petition') {
    paragraphs = [
      `মোকাম: ${displayRecipient}`,
      `জি.আর / সি.আর মোকদ্দমা নং: ________________ / ২০২__\nথানা: ${v('place')}, সংশ্লিষ্ট ধারা: ________________ দণ্ডবিধি, ১৮৬০`,
      `দরখাস্তকারী / আসামী:\n${v('name')}\nবর্তমান ঠিকানা: ${v('address')}, মোবাইল: ${v('contact')}`,
      `বনাম`,
      `রাষ্ট্র পক্ষ`,
      `বিষয়: ফৌজদারি কার্যবিধি, ১৮৯৮ (CrPC 1898)-এর ধারা ৪৯৬ / ৪৯৭ অনুযায়ী আসামির নিয়মিত / অন্তর্বর্তীকালীন জামিন মঞ্জুরের প্রার্থনা।`,
      `বিনীত নিবেদন এই যে, দরখাস্তকারী/আসামী নিম্নবর্ণিত আইনি কারণে জামিনের জন্য বিজ্ঞ আদালতের সদয় সুবিবেচনা প্রার্থনা করিতেছেন—`,
      `১. আসামীর নিরপরাধিতা:\nআসামী একজন শান্তিপ্রিয় ও আইনের প্রতি শ্রদ্ধাশীল নাগরিক। বর্তমান মামলায় সম্পূর্ণ শত্রুভাবাপন্ন হইয়া হয়রানিমূলকভাবে জড়ানো হইয়াছে।`,
      `২. এজাহার ও সুনির্দিষ্ট অভিযোগের অনুপস্থিতি:\nএজাহারে আসামীর বিরুদ্ধে কোনো সুনির্দিষ্ট মারাত্মক বা সরাসরি অপরাধমূলক ভূমিকা উল্লেখ নাই। গত ${cleanDate(v('date'))} তারিখে আসামীকে গ্রেফতার করিয়া হাজতে প্রেরণ করা হইয়াছে।`,
      `৩. ঘটনার বিবরণ ও আইনি ভিত্তি:\n${v('chronology')}`,
      `৪. জামিনের যুক্তিসমূহ ও জামিনদারের অঙ্গীকার:\nক. আসামী কোনো পেশাদার অপরাধী নহে এবং ইতিপূর্বে তাহার বিরুদ্ধে কোনো ফৌজদারি দণ্ড নাই;\nখ. আসামী স্থানীয় স্থায়ী বাসিন্দা ও সমাজে প্রতিষ্ঠিত, সুতরাং জামিন পাইলে পলায়নের কোনো আশঙ্কা নাই;\nগ. তদন্ত কর্মকর্তা বা আদালতের যে কোনো শুনানিতে হাজির থাকিতে আসামী বদ্ধপরিকর;\nঘ. বিজ্ঞ আদালতের সন্তুষ্টি অনুযায়ী স্থানীয় সচ্ছল জামিনদার দাখিল করিতে প্রস্তুত।`,
      `৫. প্রার্থিত প্রতিকার:\n${v('assistance') || 'উপরোক্ত মানবিক ও আইনি কারণাবলি বিবেচনা করিয়া আসামীকে মামলার বিচার নিষ্পত্তি না হওয়া পর্যন্ত উপযুক্ত শর্তে নিয়মিত জামিন মঞ্জুর করিতে বিজ্ঞ আদালতের সদয় মর্জি হয়।'}`,
      `অতএব বিনীত প্রার্থনা এই যে, বিজ্ঞ আদালত সদয় বিবেচনাপূর্বক আসামীর জামিন আদেশ দানে মর্জি হয়।`,
      `সংযুক্ত নথিপত্র:\n${values['attachments']?.trim() || '১. এজাহার ও প্রাথমিক তদন্ত প্রতিবেদন (এফআইআর), ২. গ্রেফতার ও ফরওয়ার্ডিং কপি, ৩. স্থানীয় জামিনদারের জাতীয় পরিচয়পত্র'}`,
      `তারিখ: ${displayDate}`,
      `দরখাস্তকারীর পক্ষে বিজ্ঞ আইনজীবীর স্বাক্ষর: ____________________`,
    ];
  }

  const isComplete = unresolved.length === 0;

  return {
    id,
    templateId: `${type}-application-v2`,
    templateVersion: '2.0.0',
    type,
    facts,
    recipient: displayRecipient,
    paragraphs,
    unresolvedPlaceholders: unresolved,
    reviewStatus: isComplete ? 'needs_review' : 'incomplete',
    sourcePackVersion: 'bd-pilot-2026-11-03.2',
    exportStatus: 'never_exported',
  };
}

export function assembleDraftPlainText(
  doc: DraftDocument,
  reviewed: boolean,
  customBody?: string
): string {
  const headerNotice = 'খসড়া — জমা দেওয়ার আগে তথ্য যাচাই করুন\n';
  const hasPlaceholders = doc.unresolvedPlaceholders.length > 0 || (customBody ? customBody.includes('[') : false);
  const statusLabel =
    hasPlaceholders || !reviewed
      ? 'অসম্পূর্ণ খসড়া / Incomplete draft\n\n'
      : 'তথ্য পর্যালোচিত খসড়া / Reviewed draft\n\n';

  const body = customBody || doc.paragraphs.join('\n\n');
  const footerLegalDisclaimer =
    '\n\n----------------------------------------\n' +
    'সতর্কতা: এটি MyLaws দ্বারা প্রস্তুতকৃত একটি খসড়া আইনি কাঠামো। এটি আদালত কর্তৃক গৃহীত কোনো চূড়ান্ত ডিক্রি বা অফিশিয়াল দালিলিক সমন নয়। ' +
    'দাখিলের পূর্বে প্রয়োজনীয় কোর্ট ফি, এখতিয়ার ও তথ্যসমূহ বিজ্ঞ আইনজীবী বা সংশ্লিষ্ট দপ্তরে যাচাই করিয়া লইবেন।';

  return headerNotice + statusLabel + body + footerLegalDisclaimer;
}
