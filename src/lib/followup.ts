import {
  LAWYERS,
  filterLawyers,
  rankLawyersForContext,
  ALL_DISTRICTS,
  LegalDomain,
  LawyerProfile,
  CourtLevel,
} from '@/data/lawyers';
import type { FactValue, FollowUpResponse, ChatHistoryMessage } from '@/types/contracts';
import { provisions, type Provision } from '@/data/legal';

export interface FollowUpContext {
  query: string;
  language: 'en' | 'bn';
  conversationHistory: ChatHistoryMessage[];
  facts: FactValue[];
  issueType?: string;
  candidateSources?: Provision[];
}

/**
 * Intelligent Language Detector:
 * Identifies whether input is in Bengali (native script or Banglish) or English.
 */
export function detectInputLanguage(text: string, fallbackLang: 'en' | 'bn' = 'en'): 'en' | 'bn' {
  const trimmed = text.trim();
  if (!trimmed) return fallbackLang;

  // 1. Any Bengali Unicode script character -> always 'bn'
  if (/[\u0980-\u09FF]/.test(trimmed)) {
    return 'bn';
  }

  // 2. Strong Banglish tokens -> 'bn'
  const banglishSignals = /\b(ami|amr|amar|amake|apni|apnr|apnar|tumi|tomar|kori|cori|churi|curi|hoise|hoyeche|korbo|koreche|korte|bujhlam|bujhini|kintu|lagbe|jabo|thana|mamla|beton|dokan|bari|basha|shami|shontan|taka|hajar|koto|somoy|din|kagoj|proman|shasti)\b/i;
  if (banglishSignals.test(trimmed)) {
    return 'bn';
  }

  // 3. Clear English words -> 'en'
  const englishSignals = /\b(what|how|why|who|when|where|which|can|could|will|would|should|you|your|me|my|i|we|us|provide|offer|help|service|services|hello|hi|hey|good|morning|evening|stolen|loss|theft|salary|wages|employer|court|police|rights|law|laws|constitution|legal|action|notice|contract|money|pay|paid|unpaid|penalty|jail)\b/i;
  if (englishSignals.test(trimmed)) {
    return 'en';
  }

  return fallbackLang;
}

/**
 * Converts English numeral digits to Bengali numerals (e.g. 30 -> ৩০)
 */
export function toBanglaNum(n: number | string): string {
  const s = n.toString();
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return s.replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
}

/**
 * Converts Bengali numeral digits to clean, standard numerals (e.g. ৩০ -> 30, ১,০০০ -> 1,000)
 * Eliminates confusion where Bengali ১ looks like English 9, ৪ looks like 8, ৭ looks like 9/1, etc.
 */
export function toEnglishNum(text: string | null | undefined): string {
  if (!text) return '';
  return text.replace(/[০-৯]/g, (c) => String(c.charCodeAt(0) - 0x09e6));
}

/**
 * Canonical suggested legal topics for conversational exploration.
 */
export const DEFAULT_SUGGESTED_TOPICS = {
  bn: [
    { title: '💼 বকেয়া বেতন ও চাকরি', query: 'আমার বকেয়া বেতন ও চাকরির অধিকার সম্পর্কে জানতে চাই' },
    { title: '🏡 জমি ও ফ্ল্যাট বিরোধ', query: 'জমির দলিল জালিয়াতি বা দখলের আইনি প্রতিকার কী?' },
    { title: '🛡️ সাইবার ব্ল্যাকমেইল ও ছবি ফাঁস', query: 'অনলাইনে ছবি দিয়ে ব্ল্যাকমেইল করলে কীভাবে জিডি করব?' },
    { title: '🛒 ভোক্তা প্রতারণা ও ভেজাল', query: 'অনলাইনে পণ্য প্রতারণা বা মেয়াদোত্তীর্ণ পণ্যে কীভাবে অভিযোগ করব?' },
    { title: '⚖️ পারিবারিক অধিকার ও দেনমোহর', query: 'পারিবারিক আদালতে দেনমোহর ও ভরণপোষণের নিয়ম কী?' },
  ],
  en: [
    { title: '💼 Unpaid Wages & Employment', query: 'How to recover unpaid salary under Bangladesh Labour Act?' },
    { title: '🏡 Land Fraud & Property Disputes', query: 'What is the legal remedy for land grabbing or forged deeds?' },
    { title: '🛡️ Cyber Blackmail & Fake Accounts', query: 'How to report fake Facebook accounts or online blackmail?' },
    { title: '🛒 Consumer Fraud & Expired Goods', query: 'How to file a consumer complaint for defective products?' },
    { title: '⚖️ Family Rights & Maintenance', query: 'What are the legal procedures for child maintenance and dower?' },
  ],
};

/**
 * Detects whether the query is a friendly greeting or salutation.
 */
export function isGreetingQuery(text: string): boolean {
  const normalized = text.trim().toLowerCase();
  const clean = normalized.replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
  if (!clean) return false;

  const hasSubstantiveLegalTerms =
    /\b(lawyer|advocate|court|legal\s*aid|16699|arrest|bail|remand|wage\w*|salary|salaries|beton|land|jomi|stolen|theft|churi|cori|fraud|consumer|police|thana|gd|fir|murder|threat\w*|humki|assault|beating|bhoronposhon|denmohor|talaq)\b/i.test(clean) ||
    /আইনজীবী|উকিল|আদালত|লিগ্যাল এইড|১৬৬৯৯|গ্রেফতার|জামিন|রিমান্ড|বেতন|মজুরি|চাকরি|জমি|দখল|মারধর|হুমকি|চুরি|ছিনতাই|ওষুধ|ভোক্তা|খোরপোষ|দেনমোহর|তালাক|পুলিশ|থানা|জিডি|এজাহার|মামলা/u.test(clean);

  if (hasSubstantiveLegalTerms) return false;

  const exactGreetings = [
    'hi', 'hello', 'hey', 'hiya', 'hola', 'heya', 'yo', 'salam', 'assalam', 'assalamu alaikum', 'assalamualaikum', 'slm', 'as-salamu alaykum',
    'good morning', 'good afternoon', 'good evening', 'good day', 'good night',
    'how are you', 'how are u', 'how r u', 'how are you doing', 'how do you do', 'how is it going', 'hows it going', 'whats up', 'what is up', 'sup',
    'hey how are you', 'hi how are you', 'hello how are you', 'hey how are you doing', 'hi how are you doing', 'hello how are you doing',
    'hey there', 'hi there', 'hello there',
    'kemon acho', 'kemon achen', 'kemon achos', 'kemon asen', 'kemon aso', 'ki khobor', 'ki obostha', 'bhalo achen', 'bhalo acho', 'valo achen', 'valo acho',
    'সালাম', 'আসসালামু আলাইকুম', 'আসসালামুআলাইকুম',
    'হ্যালো', 'হাই', 'হে', 'শুভ সকাল', 'শুভ দুপুর', 'শুভ সন্ধ্যা', 'শুভ রাত্রি',
    'কেমন আছেন', 'কেমন আছো', 'কেমন আছিস', 'কি অবস্থা', 'কী অবস্থা', 'কি খবর', 'কী খবর', 'ভালো আছেন', 'ভালো আছো'
  ];

  if (exactGreetings.includes(clean)) return true;

  const greetingPattern = /^(hi|hello|hey|hiya|yo|salam|assalamu\s*alaikum|halo|হ্যালো|হাই|সালাম)\b/i;
  const howAreYouPattern = /\b(how\s+are\s+(you|u)|how\s+do\s+you\s+do|how\s+is\s+it\s+going|hows\s+it\s+going|whats\s+up|kemon\s+(achen|acho|achos|asen|aso)|ki\s+(khobor|obostha)|কেমন\s+(আছেন|আছো|আছিস)|কি\s+(খবর|অবস্থা)|কী\s+(খবর|অবস্থা))\b/i;

  if (howAreYouPattern.test(clean) || (greetingPattern.test(clean) && clean.split(/\s+/).length <= 7)) {
    return true;
  }

  return false;
}

/**
 * Detects whether the user is asking about MyLaws capabilities, identity, or services.
 */
export function isCapabilityQuery(text: string): boolean {
  const normalized = text.trim().toLowerCase();
  const clean = normalized.replace(/[!?.,।\-]+$/, '').trim();

  // If query explicitly mentions substantive legal entities or disputes, it is NOT a generic capability query
  const hasSubstantiveLegalTerms =
    /\b(lawyer|advocate|court|legal\s*aid|16699|arrest|bail|wage|salary|land|stolen|theft|fraud|consumer|police|gd|fir)\b/i.test(clean) ||
    /আইনজীবী|উকিল|আদালত|লিগ্যাল এইড|১৬৬৯৯|গ্রেফতার|জামিন|বেতন|মজুরি|চাকরি|জমি|দখল|মারধর|চুরি|ওষুধ|ভোক্তা|খোরপোষ|দেনমোহর|পুলিশ|জিডি|এজাহার|মামলা/u.test(clean);

  if (hasSubstantiveLegalTerms) return false;

  const exactShortQueries = ['help', 'help me', 'সাহায্য', 'সহায়তা', 'সহায়তা', 'sahajjo'];
  if (exactShortQueries.includes(clean)) return true;

  const capabilityPhrases = [
    'what you can provide me',
    'what can you provide me',
    'what can you provide',
    'what you can provide',
    'what can you do',
    'what do you do',
    'what are your capabilities',
    'what are your features',
    'what services do you offer',
    'what service can you provide',
    'how can you help me',
    'how can you help',
    'who are you',
    'what are you',
    'what is mylaws',
    'tell me about yourself',
    'tumi ki korte paro',
    'apni ki korte paren',
    'tumi ki ki korte paro',
    'apni ki ki korte paren',
    'apni ki sahajjo korte paren',
    'tumi ki sahajjo korte paro',
    'apnar kaj ki',
    'apnar kaaj ki',
    'tumar kaj ki',
    'apni ke',
    'tumi ke',
    'apnar subidha ki',
    'mylaws ki',
    'তুমি কি করতে পারো',
    'আপনি কি করতে পারেন',
    'আপনি কীভাবে সাহায্য করবেন',
    'আপনি কিভাবে সাহায্য করতে পারেন',
    'আপনার কাজ কি',
    'আপনার কাজ কী',
    'তুমি কে',
    'আপনি কে',
    'মাই ল কি'
  ];

  if (capabilityPhrases.some((phrase) => clean.includes(phrase))) return true;

  if (
    /\bwhat\b.*\b(provide|offer|features?|capabilities)\b/i.test(clean) ||
    /\b(what\s+can\s+you\s+do|how\s+can\s+you\s+help|who\s+are\s+you)\b/i.test(clean) ||
    /\b(ki\s+korte\s+paro|ki\s+korte\s+paren|ki\s+sahajjo|kaj\s+ki)\b/i.test(clean) ||
    /কী\s*করতে\s*পারেন|কি\s*করতে\s*পারেন|কীভাবে\s*সাহায্য|কিভাবে\s*সাহায্য|কাজ\s*কী|কাজ\s*কি/u.test(clean)
  ) {
    return true;
  }

  return false;
}

/**
 * Determines whether a query is introducing a brand-new primary legal problem.
 * If true, it should start the canonical 4-step journey rather than a short follow-up.
 */
export function isPrimaryLegalInquiry(text: string): boolean {
  // If explicitly asking follow-up meta questions, it's NOT a primary statement
  if (
    /\b(kagoj|proman|documents?|evidence|sohoj\s+kore|simplify|age\s+kothay|where\s+to\s+go|shasti|punishment|penalty|section|dhara|police\s+jodi|refuse)\b/i.test(text) ||
    /কাগজ|প্রমাণ|সহজ\s*করে|আগে\s*কোথায়|শাস্তি|ধারা|মামলা\s*না\s*নিলে/u.test(text)
  ) {
    return false;
  }

  const normalized = text.toLowerCase();
  const hasTheftSignals =
    /\b(bike|motorbike|motorcycle|gari|car|cycle|mobile|phone|handset|dokan|inventory|maal)\b/i.test(normalized) &&
    /\b(cori|churi|stolen|theft|snatch|lost)\b/i.test(normalized);

  const hasWageSignals =
    /\b(beton|salary|wages?)\b/i.test(normalized) &&
    /\b(baki|deynai|painai|unpaid|due|arrears?)\b/i.test(normalized);

  const hasAssaultSignals =
    /\b(marpeet|mardhor|aghat|churi\s+diye|attack|assault|beating|injured)\b/i.test(normalized);

  const hasGeneralPrimaryTheft =
    /\b(stolen|theft|robbery|pickpocket)\b/i.test(normalized) ||
    /চুরি|ছিনতাই|ডাকাতি|বকেয়া\s*বেতন|মারধর|ছুরিকাঘাত/u.test(text);

  return hasTheftSignals || hasWageSignals || hasAssaultSignals || hasGeneralPrimaryTheft;
}

/**
 * Generates an empathetic, friendly greeting response.
 */
export function generateGreetingResponse(
  language: 'en' | 'bn',
  query?: string
): FollowUpResponse {
  const isBn = language === 'bn';
  const clean = (query || '').toLowerCase().trim();

  const isAskingHowAreYou =
    /\b(how\s+are\s+(you|u)|how\s+do\s+you\s+do|how\s+is\s+it\s+going|hows\s+it\s+going|whats\s+up|kemon\s+(achen|acho|achos|asen|aso)|ki\s+(khobor|obostha)|valo\s+(achen|acho)|bhalo\s+(achen|acho))\b/i.test(clean) ||
    /কেমন\s*(আছেন|আছো|আছিস)|কি\s*(খবর|অবস্থা)|কী\s*(খবর|অবস্থা)|ভালো\s*(আছেন|আছো)/u.test(clean);

  const directAnswer = isAskingHowAreYou
    ? isBn
      ? `আমি ভালো আছি, ধন্যবাদ! আমি **MyLaws**, বাংলাদেশের সংবিধিবদ্ধ আইন ও নাগরিক অধিকার বিষয়ক আপনার এআই আইনি সহকারী।

সবকিছু ঠিকঠাক চলছে তো? আপনার যদি চাকরি ও বকেয়া বেতন, জমিজমা বিরোধ, সাইবার ব্ল্যাকমেইল, ভোক্তা প্রতারণা কিংবা পারিবারিক কোনো আইনি বিষয়ে প্রশ্ন থাকে—আমি আপনাকে সঠিক আইন, করণীয় ধাপ ও ড্রাফট তৈরিতে সাহায্য করতে প্রস্তুত।

আজ আপনাকে কীভাবে সাহায্য করতে পারি?`
      : `I'm doing well, thank you! I am **MyLaws**, your dedicated AI legal assistant for Bangladesh law and citizen rights.

Everything going smoothly with you? Whether you have questions about unpaid salaries, property disputes, online harassment, consumer fraud, or family matters—I am right here to help you with verified laws, checklists, and legal drafts.

How can I assist you today?`
    : isBn
    ? `হ্যালো! আমি **MyLaws**, বাংলাদেশের আইন ও নাগরিক অধিকার বিষয়ক আপনার এআই আইনি সহকারী।

যেকোনো আইনি সংকটে আপনাকে সঠিক আইনি দিকনির্দেশনা, পর্যায়ক্রমিক অ্যাকশন চেকলিস্ট এবং সরাসরি প্রিন্টযোগ্য আবেদনপত্র (থানা জিডি/মামলার খসড়া) তৈরিতে সাহায্য করতে আমি প্রস্তুত।

আপনি আমাকে যেকোনো বিষয়ে প্রশ্ন করতে পারেন, যেমন:
• **চাকরি ও বকেয়া বেতন:** বেতন বকেয়া, হঠাৎ ছাঁটাই বা শ্রম অধিকার।
• **চুরি ও হারানো মালামাল:** মোটরসাইকেল, গাড়ি বা ফোন চুরি এবং থানায় জিডি করার নিয়ম।
• **বাড়িভাড়া ও জমিজমা:** ভাড়াটিয়া উচ্ছেদ, চুক্তিপত্র বিরোধ বা জমির ভুয়া দলিলের প্রতিকার।
• **সাইবার সমস্যা ও ব্ল্যাকমেইল:** ফেক প্রোফাইল, ছবি দিয়ে ব্ল্যাকমেইল বা অনলাইনে হয়রানি।
• **ভোক্তা অধিকার:** পণ্যে প্রতারণা বা অতিরিক্ত দাম রাখা।
• **পারিবারিক ও নারী-শিশু সুরক্ষা:** ভরণপোষণ, পারিবারিক সহিংসতা ও সরকারি ফ্রি লিগ্যাল এইড (১৬৬৯৯)।

আজ আপনাকে কীভাবে সাহায্য করতে পারি?`
    : `Hello! I am **MyLaws**, your dedicated AI legal assistant for Bangladesh.

I can guide you through your legal rights, provide step-by-step action roadmaps, and instantly generate ready-to-print legal drafts (Police GD, Criminal Complaints, Legal Notices).

You can describe any situation or ask any question, such as:
• **Employment & Wages:** Unpaid salary, illegal termination, or labour rights.
• **Theft & Lost Property:** Motorbike, vehicle, or phone theft and filing a police GD.
• **Tenancy & Land:** Eviction threats, rental disputes, or fraudulent deeds.
• **Cyber Harassment:** Fake accounts, online blackmail, or unauthorized photos.
• **Consumer Protection:** Counterfeit products, overcharging, or delivery fraud.
• **Family & Domestic:** Maintenance, domestic violence protection, and free legal aid (16699).

How can I assist you today?`;

  return {
    directAnswer,
    keyPoints: isBn
      ? [
          'সংবিধিবদ্ধ আইনি ব্যাখ্যা: সরকারি গেজেট ও আইনের সুনির্দিষ্ট ধারার ব্যাখ্যা।',
          'অ্যাকশন চেকলিস্ট: কী কী কাগজ লাগবে এবং কোন থানা বা আদালতে যাবেন।',
          'রেডি-টু-প্রিন্ট ড্রাফট: থানা জিডি, এজাহার ও নোটিশের প্রস্তুতকৃত দরখাস্ত।',
          'সরকারি হটলাইন: জাতীয় আইনগত সহায়তা (১৬৬৯৯) ও জরুরি সেবা (৯৯৯)।',
        ]
      : [
          'Statutory Guidance: Grounded strictly in Bangladesh Gazette and Acts.',
          'Action Checklist: Required documents and where to go first.',
          'Ready-to-Print Drafts: Instant formatted A4 PDFs for GD and complaints.',
          'Official Helplines: National Legal Aid 16699 and Emergency 999.',
        ],
    suggestedNextStep: isBn
      ? 'আপনার পরিস্থিতি বা যেকোনো প্রশ্ন নিচে লিখুন, অথবা নিচের প্রস্তাবিত আইনি বিষয়গুলো দেখতে পারেন।'
      : 'Type your question below, or select any of the suggested topics to explore.',
    suggestedTopics: DEFAULT_SUGGESTED_TOPICS[language],
    sourceIds: ['constitution-31', 'legalaid-16'],
  };
}

/**
 * Detects whether the query is a casual, general, or out-of-scope inquiry (e.g. cooking, coding, jokes, weather, science, general chat).
 */
export function isGeneralOrIrrelevantQuery(text: string): boolean {
  const clean = text.trim().toLowerCase().replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
  if (!clean) return false;

  if (isGreetingQuery(text) || isCapabilityQuery(text)) return false;

  // Broad legal terminology check in English and Bengali
  const legalKeywords =
    /\b(law|laws|legal|lawyer|advocate|court|magistrate|police|thana|gd|fir|jail|bail|remand|arrest|warrant|custody|habeas|section|act|ordinance|statute|penal|crpc|constitution|rights?|fundamental|aid|16699|999|salary|wage|wages|employer|employee|worker|boss|fired|termination|dismiss|retrench|resignation|gratuity|provident|overtime|maternity|dife|land|property|deed|khatian|mutation|namjari|dalil|tenant|landlord|rent|evict|eviction|topsoil|dredger|boundary|dispossess|possession|consumer|dncrp|customer|shop|seller|vendor|mrp|expired|expiry|adulterat|short\s*weight|counterfeit|refund|daraz|delivery|threat\w*|intimidation|extort\w*|blackmail\w*|assault\w*|hurt|injury|beating|kill\w*|murder\w*|theft|stolen|thief|churi|cori|snatch\w*|robbery|bike|motorcycle|phone|mobile|cyber|hack\w*|fb|facebook|fake\s*id|intimate|viral|leak\w*|photo\w*|picture\w*|pornography|family|marriage|divorce|talaq|talak|dower|mahr|mohor|maintenance|khorposh|bhoronposhon|custody|child|dowry|joutuk|domestic\s*violence|parents\s*care|succession|inheritance|heir|will|probate|wronged|injustice|justice|dispute|claim)\b/i;

  const bnLegalKeywords =
    /আইন|আইনি|আইনজীবী|উকিল|আদালত|ম্যাজিস্ট্রেট|পুলিশ|থানা|জিডি|এজাহার|মামলা|জেল|হাজত|জামিন|রিমান্ড|গ্রেফতার|গ্রেপ্তার|ওয়ারেন্ট|ধারা|সংবিধান|মৌলিক অধিকার|লিগ্যাল এইড|১৬৬৯৯|৯৯৯|বেতন|মজুরি|মালিক|কর্মকর্তা|কর্মচারী|শ্রমিক|চাকরি|ছাঁটাই|বরখাস্ত|ইস্তফা|ছুটি|মাতৃত্বকালীন|ওভারটাইম|কলকারখানা|ডিআইএফই|জমি|দলিল|খতিয়ান|নামজারি|পর্চা|ভাড়াটিয়া|বাড়িওয়ালা|বাড়িভাড়া|উচ্ছেদ|দখল|বেদখল|টপসয়েল|ড্রেজার|সীমানা|ভোক্তা|ক্রেতা|দোকান|বিক্রেতা|মেয়াদোত্তীর্ণ|ভেজাল|ওজনে কম|নকল|রিফান্ড|ডেলিভারি|হুমকি|ভীতি|চাঁদাবাজি|ব্ল্যাকমেইল|মারধর|আঘাত|হত্যা|খুন|চুরি|ছিনতাই|পকেটমার|হারানো|বাইক|মোটরসাইকেল|ফোন|মোবাইল|সাইবার|হ্যাক|ফেসবুক|আইডি|ছবি ফাঁস|পর্নোগ্রাফি|পরিবার|বিয়ে|বিবাহ|ডিভোর্স|তালাক|দেনমোহর|মোহরানা|ভরণপোষণ|খোরপোষ|সন্তান|হেফাজত|যৌতুক|সহিংসতা|পিতা-মাতা|উত্তরাধিকার|ওয়ারিশ|অন্যায়|অবিচার|বিচার|বিপদ|সমস্যা|প্রতিকার|ভাতা|বকেয়া|সরকারি|প্রাথমিক|শিক্ষক|খাদ্য|খাবার|হোটেল|রেস্তোরাঁ|বিষাক্ত|রাসায়নিক|নিষিদ্ধ|উপাদান|মেশানো|পরিমাপ|মিটার|কারচুপি|লিটার|পেট্রোল|পাম্প/u;

  if (legalKeywords.test(clean) || bnLegalKeywords.test(clean)) {
    return false;
  }

  const generalPatterns = [
    /\b(bake|cake|recipe|cook|cooking|curry|tea|coffee|biryani|kitchen|pasta|food|ranna|banabo)\b/i,
    /রান্না|কেক|রেসিপি|চা বানাব|বিরিয়ানি|তরকারি/u,
    /\b(python|javascript|react|code|coding|algorithm|html|css|function|program|programming)\b/i,
    /কোড|প্রোগ্রামিং|পাইথন/u,
    /\b(weather|temperature|physics|chemistry|biology|photosynthesis|gravity|planet|speed\s+of\s+light|capital\s+of|highest\s+mountain|math|calculate)\b/i,
    /আবহাওয়া|বিজ্ঞান|তাপমাত্রা|রাজধানী|গণিত/u,
    /\b(tell\s+me\s+a\s+joke|joke|poem|write\s+a\s+poem|story|funny|who\s+won|football|cricket|messi|ronaldo|movie|song)\b/i,
    /কৌতুক|জোকস|কবিতা|গান|সিনেমা|খেলা|ফুটবল|ক্রিকেট/u,
  ];

  return generalPatterns.some((pattern) => pattern.test(clean));
}

/**
 * Generates a warm, conversational answer to an out-of-scope query, with a smooth bridge to Bangladesh legal guidance.
 */
export function generateGeneralConversationalResponse(
  query: string,
  language: 'en' | 'bn'
): FollowUpResponse {
  const isBn = language === 'bn';
  const clean = query.trim().toLowerCase();

  let directAnswer = '';

  // 1. Joke or Humor
  if (/joke|funny|কৌতুক|জোকস/i.test(clean)) {
    directAnswer = isBn
      ? `একটি মজার কৌতুক শুনুন:\n\nশিক্ষক: মন্টু, বলো তো পৃথিবীর সবচেয়ে চালাক প্রাণী কোনটি?\nমন্টু: মানুষ স্যার, কারণ মানুষ নিজের জালে নিজেই আটকে যায় আর হাসিমুখে বলে "সব ঠিক আছে!"\n\n😄 হাসি-ঠাট্টা তো চললই, তবে জীবনে সিরিয়াস কোনো আইনি সংকটে পড়লে কিন্তু MyLaws সব সময় আপনার পাশে আছে। চাকরি, জমিজমা, সাইবার নিরাপত্তা, ভোক্তা অধিকার কিংবা পারিবারিক বিষয়ে কোনো আইনি প্রশ্ন বা পরামর্শ লাগলে আমাকে নির্দ্বিধায় জানাতে পারেন!`
      : `Here's a lighthearted joke for you:\n\nWhy do programmers prefer dark mode?\nBecause light attracts bugs!\n\n😄 All jokes aside, whenever you face a serious situation involving Bangladesh law—such as workplace wage disputes, property fraud, online blackmail, or consumer issues—I'm right here to guide you with verified legal provisions.`;
  }
  // 2. Cooking / Food / Recipes
  else if (/bake|cake|recipe|cook|curry|tea|coffee|biryani|kitchen|pasta|food|রান্না|কেক|রেসিপি|বিরিয়ানি/i.test(clean)) {
    directAnswer = isBn
      ? `সুস্বাদু রান্নার রেসিপি বা খাবারের আইডিয়া চমৎকার একটি বিষয়! ভালো খাবার মন ভালো রাখে।\n\nতবে রান্নার বাইরে দৈনন্দিন জীবনের ভোক্তা অধিকার (যেমন: প্যাকেটজাত পণ্যে ওজন কম দেয়া, মেয়াদোত্তীর্ণ জিনিস বিক্রি বা খাবারে ক্ষতিকর ভেজাল মেশানো) কিংবা অন্য যেকোনো আইনি প্রয়োজনে কিন্তু আমি আপনাকে পূর্ণ আইনি সুরক্ষা দিতে পারি।\n\nআপনি কি বাংলাদেশ ভোক্তা অধিকার সংরক্ষণ আইন বা অন্য কোনো আইনি বিষয়ে জানতে চান?`
      : `Cooking and good recipes are always wonderful! Good food certainly makes every day better.\n\nWhile I can appreciate culinary questions, my core specialty is protecting your citizen rights in Bangladesh—including Consumer Protection laws against adulterated food, expired products, or false weight, as well as employment and property matters.\n\nWould you like to know more about consumer rights or any other legal protection?`;
  }
  // 3. Coding / Tech / Programming
  else if (/python|javascript|react|code|coding|algorithm|program|কোড|প্রোগ্রামিং/i.test(clean)) {
    directAnswer = isBn
      ? `টেক ও প্রোগ্রামিংয়ের জগতে সমস্যা সমাধান করতে ভালোই লাগে!\n\nতবে কোডিংয়ের বাইরে প্রযুক্তি সংক্রান্ত আইনি বিষয়—যেমন: বাংলাদেশে সাইবার নিরাপত্তা আইন, অনলাইনে ছবি বা তথ্য ফাঁসের বিরুদ্ধে জিডি, ফ্রিল্যান্সারদের পারিশ্রমিক চুক্তি কিংবা সফটওয়্যার কপিরাইট সংক্রান্ত যেকোনো আইনি সহায়তার জন্য আমি সব সময় প্রস্তুত।\n\nপ্রযুক্তি বা সাধারণ আইনের কোনো বিষয়ে আপনার কি কোনো প্রশ্ন আছে?`
      : `Tech and programming problem-solving is always exciting!\n\nBeyond coding logic, I specialize in the legal frameworks surrounding technology and daily life in Bangladesh—such as Cyber Security laws against blackmail or fake profiles, freelance contract disputes, or property and labour rights.\n\nDo you have any legal questions you'd like guidance on?`;
  }
  // 4. Default / General Casual Conversation
  else {
    directAnswer = isBn
      ? `আপনার প্রশ্নটি আমি বুঝতে পেরেছি। তবে একজন এআই সহকারী হিসেবে আমার প্রধান লক্ষ্য ও বিশেষ প্রশিক্ষণ হলো বাংলাদেশের সংবিধিবদ্ধ আইন ও নাগরিক অধিকার নিয়ে সাধারণ মানুষকে সহজ ভাষায় সাহায্য করা।\n\nআপনার কি চাকরি ও বকেয়া বেতন, জমিজমা ও বাড়িভাড়া বিরোধ, সাইবার নিরাপত্তা ও ব্ল্যাকমেইল, ভোক্তা প্রতারণা কিংবা পারিবারিক আইন সংক্রান্ত কোনো বিষয় জানার আছে? নিচে কিছু জনপ্রিয় বিষয় দেয়া হলো—যেকোনোটিতে ক্লিক করে আপনি সরাসরি জানতে পারেন:`
      : `I hear you! While I'm happy to chat casually, my primary expertise and focus is helping citizens navigate Bangladesh statutory law, citizen rights, and formal legal filing procedures.\n\nIf you or someone you know is dealing with workplace wage issues, land disputes, online harassment, consumer fraud, or family matters, I can provide immediate, verified statutory guidance and ready-to-use legal drafts. You can explore our main legal categories below:`;
  }

  return {
    directAnswer,
    keyPoints: isBn
      ? [
          'চাকরি ও বকেয়া বেতন: শ্রম আইন ২০০৬ অনুযায়ী বকেয়া আদায় ও বরখাস্তের প্রতিকার।',
          'জমিজমা ও দলিল: ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ অনুযায়ী ব্যবস্থা।',
          'সাইবার নিরাপত্তা: পর্নোগ্রাফি নিয়ন্ত্রণ আইন ও সাইবার সুরক্ষা অধ্যাদেশ।',
          'ভোক্তা অধিকার: ভোক্তা-অধিকার সংরক্ষণ আইন ২০০৯ (২৫% পুরস্কার ও ক্ষতিপূরণ)।',
        ]
      : [
          'Labour & Wages: Labour Act 2006 for unpaid salary and termination relief.',
          'Land & Property: Land Crime Prevention Act 2023 for grabbing & forged deeds.',
          'Cyber & Privacy: Pornography Control Act & Cyber Security laws.',
          'Consumer Protection: Consumers Rights Act 2009 (25% fine reward & remedies).',
        ],
    suggestedNextStep: isBn
      ? 'নিচের যেকোনো বিষয় নির্বাচন করুন অথবা আপনার পরিস্থিতি সংক্ষেপে লিখে পাঠান।'
      : 'Select any topic below or describe your situation in your own words.',
    suggestedTopics: DEFAULT_SUGGESTED_TOPICS[language],
    sourceIds: ['constitution-31'],
  };
}

/**
 * Generates an authoritative overview of MyLaws capabilities and services.
 */
export function generateCapabilityResponse(language: 'en' | 'bn'): FollowUpResponse {
  const isBn = language === 'bn';
  return {
    directAnswer: isBn
      ? `**MyLaws** সাধারণ নাগরিকদের আইনি সমস্যা সমাধানে নিচের মূল সেবাগুলো প্রদান করে:

১. **যাচাইকৃত সংবিধিবদ্ধ আইনি পরামর্শ:** বাংলাদেশের শ্রম আইন, দণ্ডবিধি, ভূমি অপরাধ প্রতিরোধ আইন, সাইবার নিরাপত্তা ও ভোক্তা অধিকার সংরক্ষণ আইনের আলোকে সহজ ভাষায় আপনার অধিকার ও প্রতিকারের সঠিক তথ্য প্রদান করে।

২. **পর্যায়ক্রমিক অ্যাকশন চেকলিস্ট:** কোনো ঘটনা ঘটলে সবার আগে কী করতে হবে, কী কী প্রমাণপত্র ও নথিপত্র সাথে রাখতে হবে এবং কোন নির্দিষ্ট থানা বা দপ্তরে যেতে হবে—তার ধাপে ধাপে রূপরেখা।

৩. **প্রিন্ট-উপযোগী আইনি দরখাস্ত খসড়া:** থানায় সাধারণ ডায়েরি (জিডি), এজাহার (এফআইআর), শ্রম দপ্তরের অভিযোগ বা লিগ্যাল নোটিশের জন্য স্বয়ংক্রিয়ভাবে একটি আনুষ্ঠানিক A4 প্রিন্টযোগ্য আবেদনপত্র তৈরি করে দেয়।

৪. **সরকারি হটলাইন ও ফ্রি লিগ্যাল এইড:** জাতীয় আইনগত সহায়তা হেল্পলাইন (১৬৬৯৯), জরুরি সেবা (৯৯৯), নারী ও শিশু নির্যাতন প্রতিরোধ সেল (১০৯) এবং সরকারি অফিসসমূহের সঠিক তথ্য।`
      : `Here is what **MyLaws** can provide you:

1. **Verified Statutory Guidance:** Clear, reliable explanations of Bangladesh laws (Labour Act, Penal Code, Land Crime Prevention Act, Cyber Security, Consumer Rights, Family Law) directly grounded in official government gazettes.

2. **Step-by-Step Action Checklist:** A prioritized roadmap of immediate actions, required evidence, documents to gather, and exactly which local Police Station (Thana), Magistrate Court, or government authority to approach.

3. **Ready-to-Print Legal Drafts:** Automatically generates professionally formatted, ready-to-print A4 PDF drafts for Police GD (General Diary), Criminal Complaints (FIR), and Legal Notices.

4. **Official Emergency Helplines & Free Legal Aid:** Direct routing to official services (National Legal Aid 16699, Police Emergency 999, Women & Child Helpline 109) and government assistance offices across Bangladesh.`,
    keyPoints: isBn
      ? [
          '১. সংবিধিবদ্ধ আইনি ব্যাখ্যা (গেজেট ভিত্তিক)',
          '২. করণীয় কাজের পর্যায়ক্রমিক অ্যাকশন চেকলিস্ট',
          '৩. থানা জিডি ও এজাহারের প্রিন্টযোগ্য ড্রাফট',
          '৪. জাতীয় আইনগত সহায়তা (১৬৬৯৯) ও হটলাইন সংযোগ',
        ]
      : [
          '1. Verified Statutory Guidance (Gazette Grounded)',
          '2. Step-by-Step Sequential Action Checklist',
          '3. Ready-to-Print Legal Document Drafts (GD / FIR)',
          '4. Official Hotlines & Free Legal Aid (16699)',
        ],
    suggestedNextStep: isBn
      ? 'আপনার পরিস্থিতি বিস্তারিত লিখে জানান বা কোনো নির্দিষ্ট আইনি প্রশ্ন থাকলে জিজ্ঞাসা করুন।'
      : 'Describe your situation or ask any specific legal question to begin.',
    sourceIds: ['constitution-31', 'legalaid-16', 'police-44-gd'],
  };
}

/**
 * Determines whether a query is a conversational follow-up to an existing consultation.
 */
export function isFollowUpQuery(query: string, historyLength: number): boolean {
  if (historyLength === 0) return false;

  // Greetings and capability queries can happen at any turn
  if (isGreetingQuery(query) || isCapabilityQuery(query)) {
    return true;
  }

  // If introducing a new primary incident (e.g. bike stolen, wage arrears), trigger canonical workflow
  if (isPrimaryLegalInquiry(query)) {
    return false;
  }

  const normalized = query.trim().toLowerCase();

  // Explicit follow-up markers (Bangla, Banglish, English)
  const followUpSignals = [
    'bujhlam na', 'bujhini', 'sohoj kore', 'shohaj kore', 'simple', 'simplify', 'সহজ করে', 'বুঝলাম না', 'বুঝিনি',
    'kagoj', 'kagojpotro', 'proman', 'paper', 'papers', 'document', 'documents', 'evidence', 'proof', 'কী কাগজ', 'কাগজপত্র', 'প্রমাণ',
    'age kothay', 'kothay jabo', 'where to go', 'where should', 'first step', 'কার কাছে', 'কোথায় যাব', 'আগে কোথায়',
    'dhara', 'section', 'kothay lekha', 'which law', 'কোন ধারা', 'কোথায় লেখা', 'আইন কোথায়',
    'na,', 'na beton', 'not 20', 'noy', 'না,', 'টাকা নয়', 'নয়,',
    'police jodi', 'na ney', 'refuse', 'মামলা না নিলে', 'জিডি না নিলে', 'পুলিশ যদি',
    'shasti', 'jail', 'punishment', 'penalty', 'fine', 'শাস্তি', 'জেল', 'জরিমানা',
    'koto din', 'how long', 'somoy', 'time', 'কত দিন', 'কত সময়',
    'khoshra', 'draft', 'petition', 'দরখাস্ত', 'খসড়া',
    'eitar', 'eita', 'oita', 'this', 'that', 'those', 'it', 'them',
  ];

  if (followUpSignals.some((sig) => normalized.includes(sig))) {
    return true;
  }

  const wordCount = query.trim().split(/\s+/).length;
  if (wordCount <= 16) {
    return true;
  }

  return true;
}

/**
 * Generates a focused, natural, conversational answer for follow-up questions.
 * Avoids dumping repetitive 4-section boilerplates.
 */

/**
 * Infers the closest LegalDomain based on query, conversation history, and issueType.
 */
export function inferDomainFromContext(query: string, historyText: string, issueType: string = ''): LegalDomain {
  const text = `${query} ${historyText} ${issueType}`.toLowerCase();

  if (
    /salary|wages|wage|termination|dismissal|employer|employee|worker|overtime|dife|gratuity|retrenchment|factory|labour|বেতন|মজুরি|চাকরি|ছাঁটাই|বরখাস্ত|শ্রম|কলকারখানা|মালিক/i.test(text)
  ) {
    return 'work';
  }

  if (
    /land|property|deed|dalil|khatian|mutation|namjari|boundary|tenant|rent|eviction|dispossess|topsoil|possession|porcha|জমি|দলিল|খতিয়ান|নামজারি|পর্চা|ভাড়াটিয়া|উচ্ছেদ|দখল|বেদখল|সীমানা/i.test(text)
  ) {
    return 'property';
  }

  if (
    /theft|stolen|churi|cori|threat|humki|assault|beating|police|thana|gd|fir|bail|remand|arrest|cyber|blackmail|crime|criminal|মারধর|হুমকি|চুরি|ছিনতাই|পুলিশ|থানা|জিডি|এজাহার|জামিন|রিমান্ড/i.test(text)
  ) {
    return 'gd';
  }

  if (
    /family|marriage|divorce|talaq|talak|dower|mahr|mohor|maintenance|khorposh|bhoronposhon|child|custody|dowry|joutuk|বিয়ে|তালাক|দেনমোহর|মোহরানা|ভরণপোষণ|খোরপোষ|সন্তান|যৌতুক/i.test(text)
  ) {
    return 'family';
  }

  if (
    /consumer|customer|shop|seller|vendor|mrp|expired|adulterat|counterfeit|refund|daraz|dncrp|ভোক্তা|ক্রেতা|দোকান|বিক্রেতা|ভেজাল|ওজনে কম|নকল|রিফান্ড|প্রতারণা/i.test(text)
  ) {
    return 'consumer';
  }

  if (
    /rights|constitution|legal\s*aid|16699|fundamental|writ|pil|high\s*court|মৌলিক অধিকার|লিগ্যাল এইড|সংবিধান|রিট|হাইকোর্ট/i.test(text)
  ) {
    return 'rights';
  }

  return 'work';
}

export const ALL_BANGLADESH_DISTRICT_MAP: Record<string, string> = {
  // Bengali Unicode 64 Districts
  'ঢাকা': 'Dhaka', 'গাজীপুর': 'Gazipur', 'নারায়ণগঞ্জ': 'Narayanganj', 'নারায়ণগঞ্জ': 'Narayanganj',
  'নরসিংদী': 'Narsingdi', 'টাঙ্গাইল': 'Tangail', 'ফরিদপুর': 'Faridpur', 'মানিকগঞ্জ': 'Manikganj',
  'মুন্সীগঞ্জ': 'Munshiganj', 'মাদারীপুর': 'Madaripur', 'গোপালগঞ্জ': 'Gopalganj', 'রাজবাড়ী': 'Rajbari',
  'রাজবাড়ি': 'Rajbari', 'শরীয়তপুর': 'Shariatpur', 'শরীয়তপুর': 'Shariatpur', 'কিশোরগঞ্জ': 'Kishoreganj',
  'চট্টগ্রাম': 'Chattogram', 'কক্সবাজার': "Cox's Bazar", 'কুমিল্লা': 'Cumilla', 'ব্রাহ্মণবাড়িয়া': 'Brahmanbaria',
  'ব্রাহ্মণবাড়িয়া': 'Brahmanbaria', 'নোয়াখালী': 'Noakhali', 'নোয়াখালী': 'Noakhali', 'ফেনী': 'Feni',
  'চাঁদপুর': 'Chandpur', 'লক্ষ্মীপুর': 'Lakshmipur', 'রাঙ্গামাটি': 'Rangamati', 'খাগড়াছড়ি': 'Khagrachhari',
  'বান্দরবান': 'Bandarban', 'সিলেট': 'Sylhet', 'মৌলভীবাজার': 'Moulvibazar', 'হবিগঞ্জ': 'Habiganj',
  'সুনামগঞ্জ': 'Sunamganj', 'রাজশাহী': 'Rajshahi', 'বগুড়া': 'Bogura', 'বগুড়া': 'Bogura', 'পাবনা': 'Pabna',
  'সিরাজগঞ্জ': 'Sirajganj', 'নওগাঁ': 'Naogaon', 'নাটোর': 'Natore', 'চাঁপাইনবাবগঞ্জ': 'Chapainawabganj',
  'জয়পুরহাট': 'Joypurhat', 'জয়পুরহাট': 'Joypurhat', 'খুলনা': 'Khulna', 'যশোর': 'Jashore',
  'কুষ্টিয়া': 'Kushtia', 'কুষ্টিয়া': 'Kushtia', 'সাতক্ষীরা': 'Satkhira', 'বাগেরহাট': 'Bagerhat',
  'ঝিনাইদহ': 'Jhenaidah', 'চুয়াডাঙ্গা': 'Chuadanga', 'চুয়াডাঙ্গা': 'Chuadanga', 'মাগুরা': 'Magura',
  'মেহেরপুর': 'Meherpur', 'নড়াইল': 'Narail', 'নড়াইল': 'Narail', 'বরিশাল': 'Barishal', 'ভোলা': 'Bhola',
  'পটুয়াখালী': 'Patuakhali', 'পটুয়াখালী': 'Patuakhali', 'পিরোজপুর': 'Pirojpur', 'বরগুনা': 'Barguna',
  'ঝালকাঠি': 'Jhalokathi', 'রংপুর': 'Rangpur', 'দিনাজপুর': 'Dinajpur', 'গাইবান্ধা': 'Gaibandha',
  'কুড়িগ্রাম': 'Kurigram', 'কুড়িগ্রাম': 'Kurigram', 'লালমনিরহাট': 'Lalmonirhat', 'নীলফামারী': 'Nilphamari',
  'পঞ্চগড়': 'Panchagarh', 'পঞ্চগড়': 'Panchagarh', 'ঠাকুরগাঁও': 'Thakurgaon', 'ময়মনসিংহ': 'Mymensingh',
  'ময়মনসিংহ': 'Mymensingh', 'জামালপুর': 'Jamalpur', 'নেত্রকোণা': 'Netrokona', 'নেত্রকোনা': 'Netrokona',
  'শেরপুর': 'Sherpur',

  // Prominent Upazilas / Thanas / Sub-regions
  'মিরপুর': 'Dhaka', 'গুলশান': 'Dhaka', 'বনানী': 'Dhaka', 'উত্তরা': 'Dhaka', 'ধানমন্ডি': 'Dhaka',
  'মতিঝিল': 'Dhaka', 'মোহাম্মদপুর': 'Dhaka', 'সাভার': 'Dhaka', 'কেরানীগঞ্জ': 'Dhaka', 'তেজগাঁও': 'Dhaka',
  'আগ্রাবাদ': 'Chattogram', 'পাঁচলাইশ': 'Chattogram', 'কোতোয়ালী': 'Chattogram', 'পটিয়া': 'Chattogram',
  'সীতাকুণ্ড': 'Chattogram', 'জিন্দাবাজার': 'Sylhet', 'আম্বরখানা': 'Sylhet', 'টঙ্গী': 'Gazipur',
  'শ্রীমঙ্গল': 'Moulvibazar', 'টেকনাফ': "Cox's Bazar", 'দাউদকান্দি': 'Cumilla', 'লাকসাম': 'Cumilla',
  'শিবগঞ্জ': 'Bogura', 'শেরপুর সদর': 'Sherpur',

  // English thana tokens
  'mirpur': 'Dhaka', 'gulshan': 'Dhaka', 'banani': 'Dhaka', 'uttara': 'Dhaka', 'dhanmondi': 'Dhaka',
  'motijheel': 'Dhaka', 'mohammadpur': 'Dhaka', 'savar': 'Dhaka', 'agrabad': 'Chattogram',
  'panchlaish': 'Chattogram', 'zindabazar': 'Sylhet', 'sreemangal': 'Moulvibazar', 'tongi': 'Gazipur'
};

/**
 * Infers if a specific district is mentioned in context.
 */
export function inferDistrictFromContext(query: string, historyText: string): string | undefined {
  const text = `${query} ${historyText}`.toLowerCase();
  for (const dist of ALL_DISTRICTS) {
    if (text.includes(dist.toLowerCase())) {
      return dist;
    }
  }
  for (const [key, enName] of Object.entries(ALL_BANGLADESH_DISTRICT_MAP)) {
    if (text.includes(key.toLowerCase())) {
      return enName;
    }
  }
  return undefined;
}

export function generateFollowUpResponse(ctx: FollowUpContext): FollowUpResponse {
  const { query, language, facts, issueType = '', conversationHistory, candidateSources = [] } = ctx;
  const isBn = language === 'bn';
  const q = query.trim().toLowerCase();

  // Combine conversation history to understand context
  const fullContextText = conversationHistory.map((m) => m.content).join(' ').toLowerCase();

  // 0. GREETINGS & CAPABILITY OVERVIEW
  if (isGreetingQuery(query)) {
    return generateGreetingResponse(language);
  }
  if (isCapabilityQuery(query)) {
    return generateCapabilityResponse(language);
  }

  // 0.3 LAWYER CONSULTATION & RECOMMENDATION INTENT
  // Directly matches user queries asking if they need a lawyer or asking to find an advocate.
  const isLawyerInquiry =
    /\b(need.*(lawyer|advocate|attorney)|hire.*(lawyer|advocate)|talk.*to.*(lawyer|advocate)|find.*(lawyer|advocate)|recommend.*(lawyer|advocate)|lawyer.*needed|should\s+i\s+(get|hire|consult|talk)\s+(to\s+)?a?\s*(lawyer|advocate))\b/i.test(q) ||
    /আইনজীবী|উকিল|আইনজীবি|উকিল.*লাগবে|আইনজীবী.*দরকার|উকিল.*দরকার|আইনজীবী.*নিয়োগ|চেম্বার|উকিল.*পাব|আইনজীবী.*পাব|আইনজীবী.*খুঁজে|উকিল.*খুঁজে/u.test(q) ||
    (/\b(lawyer|advocate|attorney)\b/i.test(q) && /\b(need|should|help|how|where|find|get|list|recommend)\b/i.test(q));

  if (isLawyerInquiry) {
    const domain = inferDomainFromContext(query, fullContextText, issueType);
    const district = inferDistrictFromContext(query, fullContextText);
    const isLegalAidQuery = /বিনামূল্যে|লিগ্যাল এইড|free|legal aid|টাকা ছাড়া|টাকা নাই|গরিব|অসহায়/i.test(q);
    const isHighCourtQuery = /হাইকোর্ট|সুপ্রিম কোর্ট|রিট|high court|supreme court|writ/i.test(q);
    const courtLevelPreference: CourtLevel | undefined = isHighCourtQuery ? 'high_court' : undefined;

    // Use intelligent multi-dimensional ranking
    let recommendedLawyers = rankLawyersForContext({
      domain,
      district,
      legalAidOnly: isLegalAidQuery,
      courtLevel: courtLevelPreference,
      limit: 2,
    });

    if (recommendedLawyers.length === 0) {
      recommendedLawyers = LAWYERS.slice(0, 2);
    }

    return {
      directAnswer: isBn
        ? `আপনার পরিস্থিতিতে আইনজীবী প্রয়োজন কিনা, সে বিষয়ে স্পষ্ট দিকনির্দেশনা:\n\n১. প্রাথমিক অভিযোগ (যেমন: থানায় জিডি, ভোক্তা অধিকার অধিদপ্তরে অভিযোগ বা শ্রম অধিদপ্তরে মীমাংসার চিঠি) আপনি নিজেই MyLaws-এর তৈরি ড্রাফট নিয়ে সরাসরি দাখিল করতে পারেন; এর জন্য কোনো আইনজীবী নিয়োগের বাধ্যবাধকতা নেই।\n\n২. তবে বিষয়টি যদি শ্রম আদালত (Labour Court), জমিজমার দেওয়ানি মামলা, ফৌজদারি মামলায় নিয়মিত জামিন বা পারিবারিক আদালতে দেনমোহর আদায়ের মতো আনুষ্ঠানিক বিচারিক কার্যক্রমের দিকে যায়, তবে একজন বিজ্ঞ আইনজীবীর মাধ্যমে আদালতে মামলা পরিচালনা করা অত্যন্ত জরুরি।\n\nআপনার ঘটনার বিষয়বস্তু ও অবস্থানের ওপর ভিত্তি করে আমাদের যাচাইকৃত ডিরেক্টরি থেকে সেরা নির্বাচিত আইনজীবীদের বিবরণ নিচে দেওয়া হলো:`
        : `Here is clear guidance on whether you require an advocate for your situation:\n\n1. Initial Pleading Stage: For preliminary complaints (e.g. Police GD, DNCRP consumer claims, or DIFE conciliation letters), you can submit your draft directly without mandatory legal representation.\n\n2. Formal Judicial Proceedings: If your dispute escalates to Labour Court, Civil Court (land title/injunction), Criminal Court (regular bail/sessions trial), or Family Court, engaging an enrolled advocate is critical and required for formal court advocacy.\n\nBased on your issue and location, here are verified advocates best matched from our directory:`,
      keyPoints: isBn
        ? [
            'আইনজীবী বাছাইয়ের সময় তাঁর বাংলাদেশ বার কাউন্সিল সনদ নম্বর ও স্থায়ী চেম্বার ঠিকানা যাচাই করে নিন।',
            'চেম্বারে যাওয়ার আগে জাতীয় পরিচয়পত্র ও প্রয়োজনীয় সব প্রমাণপত্রের ফটোকপি একসাথে প্রস্তুত রাখুন।',
            'আর্থিক সমস্যা থাকলে জাতীয় আইনগত সহায়তা প্রদান সংস্থার টোল-ফ্রি ১৬৬৯৯ নম্বরে সরকারি প্যানেল আইনজীবী পেতে পারেন।',
          ]
        : [
            'Verify the advocate’s Bar Council enrollment ID and permanent chamber location before meeting.',
            'Carry your NID photocopy and all original documents/receipts to the chamber consultation.',
            'If you have financial constraints, call 16699 (toll-free) for a free government-appointed legal aid lawyer.',
          ],
      suggestedNextStep: isBn
        ? 'নিচে প্রদর্শিত আইনজীবীর চেম্বারে সরাসরি ফোন করে সাক্ষাতের সময় নিতে পারেন, অথবা পুরো ডিরেক্টরি ব্রাউজ করতে পারেন।'
        : 'You may call the matched advocate directly to schedule a chamber consultation or browse the full directory.',
      recommendedLawyers,
      lawyerDomain: domain,
      lawyerDistrict: district,
      sourceIds: ['constitution-31'],
    };
  }


  // 0.5 DIFFERENCE BETWEEN GD AND FIR
  const isGdVsFirQuery =
    /\b(gd.*(fir|mamla)|fir.*gd|difference.*between.*(gd|fir)|পার্থক্য)\b/i.test(q) ||
    /জিডি.*মামলা|মামলা.*জিডি|জিডি.*এফআইআর|পার্থক্য/u.test(q);

  if (isGdVsFirQuery) {
    return {
      directAnswer: isBn
        ? 'জিডি (সাধারণ ডায়েরি) এবং মামলার (এফআইআর/এজাহার) মধ্যকার মূল পার্থক্য:'
        : 'The key differences between a Police GD (General Diary) and an FIR (First Information Report / Case):',
      keyPoints: isBn
        ? [
            'জিডি (পুলিশ আইন ৪৪ ধারা): কোনো ঘটনা ঘটার আশঙ্কা, হুমকি, বা কোনো মূল্যবান বস্তু/কাগজ হারানোর ক্ষেত্রে বিষয়টি পুলিশকে আনুষ্ঠানিকভাবে রেকর্ডভুক্ত রাখার আবেদন। এতে পুলিশ আদালতের অনুমতি ছাড়া তদন্ত করতে পারে না।',
            'এফআইআর বা মামলা (ফৌজদারি কার্যবিধি ১৫৪ ধারা): কোনো আমলযোগ্য (Cognizable) অপরাধ সংঘটিত হলে অপরাধীদের গ্রেপ্তার ও বিচারের জন্য সরাসরি মামলা রুজু করা হয়। পুলিশ আদালতের নির্দেশ ছাড়াই সাথে সাথে তদন্ত ও গ্রেপ্তারের ক্ষমতা পায়।',
            'খরচ: থানায় জিডি বা এফআইআর দায়ের করতে কোনো সরকারি ফি লাগে না (সম্পূর্ণ বিনামূল্যে)।',
          ]
        : [
            'General Diary / GD (Police Act Section 44): A formal record of lost articles, apprehension of danger, or non-cognizable matters. Police cannot investigate without Magistrate permission.',
            'First Information Report / FIR (CrPC Section 154): Lodged when a cognizable criminal offense has occurred. Police have immediate statutory authority to investigate and arrest suspects.',
            'Fee: Filing a GD or FIR at any Bangladesh police station is completely free of charge.',
          ],
      suggestedNextStep: isBn
        ? 'আপনার ঘটনাটি যদি চুরি বা হারানো হয় তবে জিডি প্রযোজ্য; আর যদি মারাত্মক আঘাত, জালিয়াতি বা ডাকাতি হয় তবে সরাসরি এজাহার দায়ের করতে হবে।'
        : 'If you suffered loss or simple theft, a GD is standard; for severe assault or fraud, an FIR is required.',
      sourceIds: ['police-44-gd', 'constitution-31'],
    };
  }

  // 1. FACT CORRECTION (e.g. “না, বেতন ২০ হাজার নয়, ১২ হাজার।”)
  const isFactCorrection =
    /^\s*(?:na|no|না|নয়)\s*[,।.\-]/i.test(query) ||
    /\b(?:instead\s+of|actually|correction|wrong\s+amount|vul\s+hoyeche|bhul\s+hoyeche|ভুল\s*হয়েছে|সংশোধন)\b/i.test(q) ||
    (/\d+/.test(q) && /\b(?:noy|not|পরিবর্তে)\b/i.test(q) && !/police|mamla|gd|bujhlam|bujhini/i.test(q));

  if (isFactCorrection) {
    const numberMatch = query.match(/\d+(?:[.,]\d+)?(?:\s*(?:হাজার|লাখ|k|thousand))?/i);
    const updatedVal = numberMatch ? numberMatch[0] : query.trim();

    return {
      directAnswer: isBn
        ? `বুঝলাম। তথ্যটি সংশোধন করে নিলাম (সংশোধিত তথ্য: ${updatedVal})। আপনার পরিবর্তিত তথ্যের আলোকে আইনি পদক্ষেপ ও প্রযোজ্য হিসাব সমন্বয় করা হয়েছে।`
        : `Understood. I have updated the record to ${updatedVal}. Your guidance and calculations have been adjusted accordingly.`,
      keyPoints: isBn
        ? [
            `সংশোধিত তথ্য অনুযায়ী বকেয়া ও দাবির হিসাব হালনাগাদ করা হয়েছে।`,
            `থানায় বা শ্রম দপ্তরে দাখিলের সময় এই সঠিক সংখ্যাটিই উল্লেখ করবেন।`,
          ]
        : [
            `The financial computation has been updated based on your revised figure.`,
            `Ensure this exact figure is reflected in your formal petition.`,
          ],
      suggestedNextStep: isBn
        ? 'আপনার আর কোনো সংশোধনী বা প্রশ্ন থাকলে জানাতে পারেন, অথবা চূড়ান্ত খসড়ায় যেতে পারেন।'
        : 'Feel free to specify any other corrections, or proceed to final draft review.',
      updatedFact: { fieldId: 'corrected_fact', value: updatedVal },
    };
  }

  // 2. DOCUMENTS & EVIDENCE (e.g. “কোন কাগজগুলো লাগবে?” / “eitar jonno ki ki proman ba kagojpotro lagte pare?”)
  const isDocumentsQuery =
    /\b(kagoj|kagojpotro|proman|document|documents|paper|papers|evidence|proof|proyojon|lagbe|lagte)\b/i.test(q) ||
    /কাগজ|কাগজপত্র|প্রমাণ|প্রমাণাদি|ডকুমেন্ট|রসিদ|ভাউচার|কী\s*লাগবে|কী\s*কী/u.test(q);

  if (isDocumentsQuery) {
    // A: Motorbike / Vehicle Theft
    if (
      issueType.includes('vehicle') ||
      /\b(bike|motorbike|motorcycle|scooter|gari|car|cycle|বাইক|মোটরসাইকেল|গাড়ি|স্কুটার)\b/i.test(fullContextText)
    ) {
      return {
        directAnswer: isBn
          ? 'বুঝলাম। আপনার বাইক চুরির ঘটনায় থানায় সাধারণ ডায়েরি (GD) বা অভিযোগপত্র দিতে যেসব কাগজপত্র ও তথ্য সবচেয়ে জরুরি:'
          : 'Understood. To lodge a police General Diary (GD) or complaint for your stolen motorbike, here are the essential documents and details required:',
        keyPoints: isBn
          ? [
              'বাইকের বিআরটিএ রেজিস্ট্রেশন সনদ (Smart Card বা Blue Book)-এর ফটোকপি।',
              'ইঞ্জিন নম্বর ও চেসিস নম্বরের স্পষ্ট রেকর্ড (ট্যাক্স টোকেন বা ক্রয়ের মেমোতেও থাকে)।',
              'হালনাগাদ ট্যাক্স টোকেন এবং ফিটনেস সনদের কপি (যদি থাকে)।',
              'বাইক কেনার ক্যাশ মেমো / ইনভয়েস বা শোরুমের ডেলিভারি চালান (মালিকানার প্রমাণ হিসেবে)।',
              'ঘটনাস্থলের সিসিটিভি ফুটেজ বা পার্কিং টোকেন (যদি পাওয়া যায়)।',
              'আপনার জাতীয় পরিচয়পত্র (NID) ও সচল যোগাযোগের মোবাইল নম্বর।',
            ]
          : [
              'Photocopy of BRTA Registration Smart Card or Blue Book.',
              'Engine number and chassis number (from tax token or purchase invoice).',
              'Updated Tax Token and Fitness Certificate (if applicable).',
              'Original purchase cash memo / invoice or showroom delivery challan.',
              'CCTV footage of the parking spot or parking slip (if available).',
              'Your National ID (NID) and active contact number.',
            ],
        suggestedNextStep: isBn
          ? 'এই কাগজগুলোর এক সেট ফটোকপিসহ প্রস্তুত দরখাস্ত নিয়ে যে থানা এলাকা থেকে বাইকটি চুরি হয়েছে, সেই থানায় ওসির বরাবরে দ্রুত জমা দিন। মূল কাগজগুলো অবশ্যই নিজের কাছে নিরাপদে রাখবেন।'
          : 'Take one set of photocopies and submit your formal GD application to the Officer-in-Charge (OC) of the local police station. Keep your original documents safely in your custody.',
        sourceIds: ['penal-379', 'police-44-gd'],
      };
    }

    // B: Shop Theft / Burglary
    if (issueType.includes('shop') || /dokan|maal|দোকান|মালামাল|ব্যবসায়িক/i.test(fullContextText)) {
      return {
        directAnswer: isBn
          ? 'বুঝলাম। আপনার দোকান থেকে মালামাল চুরির ঘটনায় থানায় এজাহার (FIR) বা মামলা করার জন্য যেসব কাগজপত্র ও প্রমাণ সবচেয়ে জরুরি:'
          : 'Understood. To lodge a formal FIR or police case for shop inventory theft, here are the essential documents and evidence required:',
        keyPoints: isBn
          ? [
              'দোকানের মালিকানা বা বৈধতার প্রমাণ: ট্রেড লাইসেন্স, ভাড়ার চুক্তিপত্র বা দোকান বরাদ্দের কাগজ।',
              'চুরি যাওয়া মালামালের সুনির্দিষ্ট তালিকা: পণ্যের বিবরণ, ব্র্যান্ড, মডেল এবং ক্রয় রসিদ/চালানের ফটোকপি।',
              'আনুমানিক মোট মূল্যের হিসাব: খোয়া যাওয়া মালের সর্বমোট আর্থিক মূল্যের সুস্পষ্ট উল্লেখ।',
              'ডিজিটাল ও পারিপার্শ্বিক প্রমাণ: দোকানের সিসিটিভি ফুটেজ (পেনড্রাইভ বা মেমোরি কার্ডে), তালা কাটার ছবি এবং প্রত্যক্ষদর্শীদের নাম।',
              'আপনার জাতীয় পরিচয়পত্র (NID): আবেদনকারীর নাম, ঠিকানা ও সচল মোবাইল নম্বর।',
            ]
          : [
              'Proof of Shop Ownership/Tenancy: Trade license, rental deed, or allotment letter.',
              'Itemized Stolen Inventory List: Brand, model, and purchase cash vouchers/invoices.',
              'Estimated Total Value: Specific monetary valuation of the missing goods.',
              'Digital & Physical Evidence: CCTV footage (on pen drive), photos of damaged locks/doors, and witness details.',
              'National ID (NID): Identification and contact phone number of the complainant.',
            ],
        suggestedNextStep: isBn
          ? 'এই প্রমাণগুলোর এক সেট প্রস্তুত করে স্থানীয় থানায় অফিসার ইনচার্জ (ওসি) বরাবরে এজাহার দাখিল করুন। মূল ক্যাশ মেমো নিজের কাছে সুরক্ষিত রাখুন।'
          : 'Compile one set of verified photocopies and present the complaint to the Thana Officer-in-Charge.',
        sourceIds: ['penal-380', 'crpc-154'],
      };
    }

    // C: Mobile Phone Theft / Loss
    if (issueType.includes('theft') && /mobile|phone|মোবাইল|ফোন/i.test(fullContextText)) {
      return {
        directAnswer: isBn
          ? 'মোবাইল ফোন চুরির জিডি করার জন্য নিচের তথ্য ও কাগজপত্র জরুরি:'
          : 'To file a GD for a stolen mobile phone, the following details are required:',
        keyPoints: isBn
          ? [
              'মোবাইলের ১৫ ডিজিটের আইএমইআই (IMEI) নম্বর (বাক্সে বা ক্রয়ের রসিদে পাওয়া যায়)।',
              'ব্যবহৃত সিম কার্ডের নম্বর এবং কোন অপারেটরের সিম চালু ছিল তার বিবরণ।',
              'মোবাইল কেনার ক্যাশ মেমো / মানি রিসিট (প্রযোজ্য ক্ষেত্রে)।',
              'আপনার জাতীয় পরিচয়পত্র (NID) নম্বর ও বর্তমান যোগাযোগের নম্বর।',
            ]
          : [
              '15-digit IMEI number (from packaging box or invoice).',
              'Phone number and telecom operator details.',
              'Purchase invoice/cash memo (if available).',
              'Your National ID (NID) number.',
            ],
        suggestedNextStep: isBn
          ? 'জিডি করার সাথে সাথে ১২১ নম্বরে কল করে চুরি যাওয়া সিমটি সাময়িকভাবে বন্ধ (Deactivate) রাখুন।'
          : 'Call 121 immediately to block the SIM card.',
        sourceIds: ['penal-379', 'police-44-gd'],
      };
    }

    // D: Unpaid Wages / Labour Dispute
    if (issueType.includes('wage') || /beton|salary|মজুরি|বেতন/i.test(fullContextText)) {
      return {
        directAnswer: isBn
          ? 'বকেয়া বেতনের আইনি দাবির ক্ষেত্রে যেসব প্রমাণপত্র সবচেয়ে বেশি কার্যকরী:'
          : 'Key documents and records required for your unpaid wage claim:',
        keyPoints: isBn
          ? [
              'চাকরির নিয়োগপত্র (Appointment Letter) বা পরিচয়পত্র (ID Card)।',
              'বেতন রসিদ (Pay Slip), ব্যাংক স্টেটমেন্ট বা বিকাশ/নগদ স্টেটমেন্ট (আগের বেতনের প্রমাণ)।',
              'হাজিরা খাতা বা ইলেকট্রনিক অ্যাটেনডেন্সের রেকর্ড/ছবি (যদি থাকে)।',
              'মালিকপক্ষের সাথে বেতন সংক্রান্ত এসএমএস, হোয়াটসঅ্যাপ চ্যাট বা নোটিশের স্ক্রিনশট।',
            ]
          : [
              'Appointment Letter or Employee ID Card.',
              'Pay slips or bank/MFS salary transfer statements.',
              'Attendance records or biometric logs.',
              'Written messages or notices regarding unpaid dues.',
            ],
        suggestedNextStep: isBn
          ? 'এসব প্রমাণের অনুলিপিসহ শ্রম আইনের ১৩২ ধারায় কলকারখানা অধিদপ্তরে (DIFE) আবেদন জমা দিন।'
          : 'Submit these documents with your petition to the Department of Inspection for Factories and Establishments (DIFE).',
        sourceIds: ['labour-123', 'labour-132'],
      };
    }
  }

  // 3. SIMPLIFICATION / EXPLANATION ("বুঝলাম না, সহজ করে বলুন")
  const isSimplifyQuery =
    /\b(bujhlam\s+na|bujhini|sohoj|shohaj|simple|simplify|sohoje|sohoj\s+kore)\b/i.test(q) ||
    /সহজ\s*করে|বুঝলাম\s*না|বুঝিনি|সহজ\s*ভাষায়/u.test(q);

  if (isSimplifyQuery) {
    if (
      issueType.includes('vehicle') ||
      /\b(bike|motorbike|motorcycle|scooter|gari|car|cycle|বাইক|মোটরসাইকেল|গাড়ি|স্কুটার)\b/i.test(fullContextText)
    ) {
      return {
        directAnswer: isBn
          ? 'একদম সহজ ভাষায় বলি: আপনার বাইক চুরি হলে সবচেয়ে বড় বিপদ হলো—চোরেরা বাইকটি দিয়ে কোনো অপরাধ করলে বা কারও কাছে বিক্রি করে দিলে আপনি ফেঁসে যেতে পারেন। তাই দ্রুত থানায় গিয়ে জিডি করতে হবে, যাতে পুলিশ হাইওয়ের চেকপোস্টে ওয়্যারলেস বার্তার (W/T message) মাধ্যমে বাইকটি আটকানোর চেষ্টা করে এবং বিআরটিএ ডেটাবেজে গাড়িটি লক করে রাখা যায়।'
          : 'In simple words: When a motorbike is stolen, the biggest risk is that thieves might commit other crimes with it or illegally sell it, putting you at legal liability. Filing an immediate police GD enables officers to broadcast a wireless alert (W/T message) to highway checkpoints and freeze the vehicle record in the BRTA database.',
        keyPoints: isBn
          ? [
              '১. আপনি আইনিভাবে নিরাপদ থাকবেন (বাইক দিয়ে কোনো খারাপ কাজ হলে দায় আপনার ওপর আসবে না)।',
              '২. ট্রাফিক পুলিশ ও চেকপোস্টে গাড়িটির নম্বর দ্রুত পৌঁছে যাবে।',
              '৩. বিআরটিএ-তে গাড়ির ফাইল লক থাকায় চোরেরা অন্য কারও নামে মালিকানা বদল করতে পারবে না।',
            ]
          : [
              '1. Legal immunity: Protects you from liability if criminals misuse the vehicle.',
              '2. Highway alert: Police checkposts and traffic units get notified immediately.',
              '3. BRTA lock: Prevents unauthorized transfer of vehicle registration.',
            ],
        suggestedNextStep: isBn
          ? 'আপনি চাইলে আমি এখনই আপনার তথ্যের ভিত্তিতে একটি রেডি-টু-প্রিন্ট জিডি দরখাস্ত তৈরি করে দিতে পারি।'
          : 'I can generate a ready-to-print GD petition right now with your vehicle details.',
        sourceIds: ['penal-379', 'police-44-gd'],
      };
    }

    if (issueType.includes('shop') || /dokan|maal|দোকান/i.test(fullContextText)) {
      return {
        directAnswer: isBn
          ? 'সহজ করে বলি: দোকান বা ব্যবসাপ্রতিষ্ঠানের মালামাল চুরি সাধারণ চুরির চেয়ে অনেক বড় অপরাধ (দণ্ডবিধি ৩৮০ ধারা)। এতে সর্বোচ্চ ৭ বছরের সশ্রম জেল হতে পারে। আপনার দোকানের ট্রেড লাইসেন্স ও মালের রসিদ নিয়ে থানায় এফআইআর (এজাহার) করতে হবে, যাতে পুলিশ চোরাই মালামাল উদ্ধারে অভিযান চালাতে পারে।'
          : 'Simply put: Theft from a commercial shop or warehouse is an aggravated offense under Section 380 of the Penal Code, punishable with up to 7 years imprisonment. Filing an FIR with your trade license and inventory vouchers enables police to raid and seize the stolen goods.',
        keyPoints: isBn
          ? [
              'দোকানের তালা কাটার ছবি ও সিসিটিভি ফুটেজ সংরক্ষণ করুন।',
              'খোয়া যাওয়া মালের আনুমানিক মূল্যসহ থানায় এজাহার দাখিল করুন।',
            ]
          : [
              'Preserve CCTV footage and photos of broken locks.',
              'Lodge a formal FIR with itemized goods value.',
            ],
        sourceIds: ['penal-380', 'crpc-154'],
      };
    }

    if (issueType.includes('wage') || /beton|salary|বেতন/i.test(fullContextText)) {
      return {
        directAnswer: isBn
          ? 'সহজ কথায়: শ্রম আইন অনুযায়ী মাস শেষ হওয়ার পরবর্তী ৭ কর্মদিবসের মধ্যে মালিককে আপনার বেতন পরিশোধ করতে হবে। বেতন আটকে রাখা সম্পূর্ণ বেআইনি। আপনি সরাসরি কলকারখানা পরিদর্শনে (DIFE) লিখিত নালিশ দিতে পারেন, যা সম্পূর্ণ বিনামূল্যে।'
          : 'In plain language: Under Bangladesh Labour law, wages must be paid within 7 working days of wage period expiration. Withholding wages is illegal, and you can file a free formal grievance with DIFE.',
        keyPoints: isBn
          ? [
              'মালিকের কাছ থেকে পাওনা বেতনের নির্দিষ্ট মাস ও টাকার হিসাব প্রস্তুত করুন।',
              'কলকারখানা অধিদপ্তরের শ্রম পরিদর্শকের কাছে লিখিত অভিযোগ দিন।',
            ]
          : [
              'Quantify exact unpaid months and monetary sum.',
              'Lodge a petition before the DIFE labour inspector.',
            ],
        sourceIds: ['labour-123', 'labour-132'],
      };
    }
  }

  // 4. WHERE TO GO FIRST ("আমি আগে কোথায় যাব?")
  const isWhereToGoQuery =
    /\b(age\s+kothay|kothay\s+jabo|where\s+to\s+go|where\s+should\s+i\s+go|first\s+step|office|station)\b/i.test(q) ||
    /আগে\s*কোথায়|কোথায়\s*যাব|কোন\s*অফিসে|কার\s*কাছে/u.test(q);

  if (isWhereToGoQuery) {
    if (
      issueType.includes('vehicle') ||
      /\b(bike|motorbike|motorcycle|scooter|gari|car|cycle|বাইক|মোটরসাইকেল|গাড়ি|স্কুটার)\b/i.test(fullContextText)
    ) {
      return {
        directAnswer: isBn
          ? 'আপনার প্রথম পদক্ষেপ হলো: যে এলাকা থেকে বাইকটি চুরি হয়েছে, সেই এলাকার সংশ্লিষ্ট থানায় সরাসরি ডিউটি অফিসারের কাছে যাওয়া।'
          : 'Your immediate first destination: Visit the local Police Station (Thana) whose jurisdiction covers the place of theft.',
        keyPoints: isBn
          ? [
              '১. স্থানীয় থানা (Police Station): ডিউটি অফিসারের কাছে গিয়ে বাইক চুরির দরখাস্ত জমা দিয়ে জিডি নম্বর সংগ্রহ করবেন।',
              '২. বিআরটিএ (BRTA): জিডির সত্যায়িত কপি নিয়ে স্থানীয় বিআরটিএ সার্কেল অফিসে জমা দিয়ে গাড়ির রেজিস্ট্রেশন লক করাবেন।',
            ]
          : [
              '1. Local Thana: Submit the vehicle theft GD and obtain the official GD diary number.',
              '2. BRTA Circle Office: Submit certified GD copy to block vehicle transfer in the database.',
            ],
        suggestedNextStep: isBn
          ? 'দরখাস্ত জমা দিয়ে থানার রিসিভড কপি ও জিডি নম্বর অবশ্যই সংগ্রহ করবেন।'
          : 'Always collect the signed receiving copy and official GD number from the duty officer.',
        sourceIds: ['police-44-gd'],
      };
    }

    if (issueType.includes('shop') || /dokan|maal|দোকান/i.test(fullContextText)) {
      return {
        directAnswer: isBn
          ? 'দোকান চুরির ক্ষেত্রে সবার আগে দোকান যে থানা এলাকায় অবস্থিত, সেই থানার অফিসার ইনচার্জ (ওসি) বরাবরে সরাসরি এজাহার নিয়ে যেতে হবে।'
          : 'For shop inventory theft, proceed immediately to the Officer-in-Charge (OC) of the local police station.',
        keyPoints: isBn
          ? [
              'দোকানের স্থান পরিবর্তন বা আলামত নষ্ট না করে পুলিশ আসার ব্যবস্থা করুন।',
              'সিসিটিভি মেমোরি কার্ড বা ফুটেজ সাথে নিয়ে থানায় উপস্থিত হন।',
            ]
          : [
              'Avoid tampering with the crime scene.',
              'Bring CCTV storage media and inventory list to the station.',
            ],
        sourceIds: ['penal-380', 'crpc-154'],
      };
    }

    if (issueType.includes('wage') || /beton|salary|বেতন/i.test(fullContextText)) {
      return {
        directAnswer: isBn
          ? 'বকেয়া বেতনের জন্য আপনাকে প্রথমে কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর (DIFE)-এর স্থানীয় কার্যালয়ে শ্রম পরিদর্শকের কাছে যেতে হবে।'
          : 'For unpaid wages, your primary destination is the local office of the Department of Inspection for Factories and Establishments (DIFE).',
        keyPoints: isBn
          ? [
              'কলকারখানা অধিদপ্তর (DIFE): শ্রম আইনের ১৩২ ধারায় সালিশ ও তদন্তের জন্য বিনামূল্যে অভিযোগ দায়ের করা যায়।',
              'জাতীয় আইনগত সহায়তা (১৬৬৯৯): কোনো ফি ছাড়া সরকারি আইনজীবী পেতে কল করতে পারেন।',
            ]
          : [
              'DIFE Regional Office: Free conciliation and recovery proceedings.',
              'National Legal Aid Helpline (16699): Free state-appointed attorney.',
            ],
        sourceIds: ['labour-132', 'legalaid-16'],
      };
    }
  }

  // 5. POLICE REFUSAL TO RECORD COMPLAINT ("পুলিশ যদি মামলা না নেয়?")
  const isPoliceRefusalQuery =
    /\b(police\s+jodi|na\s+ney|refuse|mamla\s+na\s+nile|gd\s+na\s+nile)\b/i.test(q) ||
    /পুলিশ\s*যদি|মামলা\s*না\s*নিলে|জিডি\s*না\s*নিলে|অভিযোগ\s*না\s*নিলে/u.test(q);

  if (isPoliceRefusalQuery) {
    return {
      directAnswer: isBn
        ? 'যদি থানা পুলিশ আপনার অভিযোগ বা জিডি গ্রহণ করতে অপারগতা প্রকাশ করে, তবে বাংলাদেশের আইনে আপনার জন্য সুস্পষ্ট ৩টি উচ্চতর প্রতিকার রয়েছে:'
        : 'If the police station refuses to record your complaint or GD, Bangladesh law provides 3 clear statutory remedies:',
      keyPoints: isBn
        ? [
            '১. সার্কেল এএসপি বা পুলিশ সুপার (এসপি)-এর কাছে লিখিত প্রতিকার: থানার ঊর্ধ্বতন কর্মকর্তা (Circle ASP / SP)-এর দপ্তরে সরাসরি লিখিত অভিযোগ দাখিল করুন।',
            '২. বিজ্ঞ জুডিশিয়াল ম্যাজিস্ট্রেট আদালতে সিআর মামলা (CR Case): ফৌজদারি কার্যবিধির ধারা ১৫৬(৩) বা ১৯০-এর আওতায় সরাসরি আদালতে মামলা দায়ের করতে পারেন। ম্যাজিস্ট্রেট নির্দেশ দিলে থানা তা এফআইআর হিসেবে নিতে বাধ্য।',
            '৩. সরকারি আইনি সহায়তা (১৬৬৯৯): সরকারি খরচে আইনজীবী নিয়োগ করে আদালতে নালিশ দায়ের করতে ১৬৬৯৯ নম্বরে টোল-ফ্রি কল করুন।',
          ]
        : [
            '1. Escalate to Senior Officers: Submit a written grievance to the Circle ASP or Superintendent of Police (SP).',
            '2. Lodge a Complaint (CR Case) in Court: File directly before the Judicial Magistrate under CrPC Section 156(3) or 190. The Magistrate has statutory authority to direct the police to record it as an FIR.',
            '3. Free Legal Aid (16699): Call 16699 toll-free to obtain an appointed panel attorney to move the petition.',
          ],
      suggestedNextStep: isBn
        ? 'থানার ডিউটি অফিসারের বক্তব্য ও তারিখ নোট করে রাখুন, যা আদালতে উপস্থাপন করা যাবে।'
        : 'Note down the date and duty officer details to support your court petition.',
      sourceIds: ['police-44-gd', 'constitution-31'],
    };
  }

  // 6. STATUTORY PENALTY / PUNISHMENT INQUIRY
  const isPenaltyQuery =
    /\b(shasti|jail|punishment|penalty|fine|dondo|bichar|শাস্তি|জেল|কারাদণ্ড|জরিমানা)\b/i.test(q);

  if (isPenaltyQuery) {
    if (
      issueType.includes('vehicle') ||
      /\b(bike|motorbike|motorcycle|scooter|gari|car|cycle|বাইক|মোটরসাইকেল|গাড়ি|স্কুটার)\b/i.test(fullContextText)
    ) {
      return {
        directAnswer: isBn
          ? 'দণ্ডবিধি ১৮৬০-এর ধারা ৩৭৯ অনুযায়ী সাধারণ চুরির শাস্তি সর্বোচ্চ ৩ বছর পর্যন্ত কারাদণ্ড বা অর্থদণ্ড। তবে কোনো গ্যারেজ, বাড়ি বা ভবন থেকে তালা ভেঙে বাইক চুরি হলে ধারা ৩৮০ প্রযোজ্য হবে, যাতে সর্বোচ্চ ৭ বছর পর্যন্ত সশ্রম কারাদণ্ড ও অর্থদণ্ড হতে পারে।'
          : 'Under Section 379 of the Penal Code 1860, theft is punishable with up to 3 years imprisonment or fine. If the bike was stolen from a locked garage, house, or building premises, Section 380 applies, carrying up to 7 years imprisonment and fine.',
        keyPoints: isBn
          ? [
              'রাস্তা বা উন্মুক্ত স্থান থেকে চুরি: দণ্ডবিধি ৩৭৯ ধারা (সর্বোচ্চ ৩ বছরের কারাদণ্ড বা জরিমানা)।',
              'গ্যারেজ, বাড়ি বা প্রতিষ্ঠান থেকে তালা ভেঙে চুরি: দণ্ডবিধি ৩৮০ ধারা (সর্বোচ্চ ৭ বছরের সশ্রম কারাদণ্ড ও জরিমানা)।',
              'পুলিশের ফৌজদারি কার্যবিধির আওতায় চোরাই যানবাহন জব্দ করে মূল মালিকের জিম্মায় (জিম্মানামা মূলে) ফিরিয়ে দেওয়ার আইনি এখতিয়ার রয়েছে।',
            ]
          : [
              'Theft from public roads/spaces: Penal Code Section 379 (up to 3 years imprisonment or fine).',
              'Theft from inside garages, homes, or enclosed premises: Section 380 (up to 7 years rigorous imprisonment & fine).',
              'Law enforcement is empowered under CrPC to seize recovered vehicles and restore them to the registered owner.',
            ],
        sourceIds: ['penal-379', 'penal-380'],
      };
    }

    if (issueType.includes('shop') || /dokan|দোকান/i.test(fullContextText)) {
      return {
        directAnswer: isBn
          ? 'দণ্ডবিধি ১৮৬০-এর ধারা ৩৮০ অনুযায়ী দোকান, ব্যবসা প্রতিষ্ঠান বা বসতবাড়িতে মালামাল চুরির শাস্তি হলো সর্বোচ্চ ৭ বছর পর্যন্ত যেকোনো বর্ণনার কারাদণ্ড এবং অর্থদণ্ড।'
          : 'Under Section 380 of the Penal Code 1860, theft committed in a shop, building, or warehouse is punishable with imprisonment for up to 7 years and fine.',
        keyPoints: isBn
          ? [
              'এটি সাধারণ চুরির (ধারা ৩৭৯ - ৩ বছর) চেয়ে অনেক বেশি গুরুতর অপরাধ।',
              'অপরাধ প্রমাণিত হলে বিজ্ঞ আদালত কারাদণ্ডের পাশাপাশি চোরাই মাল উদ্ধার বা সমপরিমাণ অর্থদণ্ড দিতে পারেন।',
            ]
          : [
              'Carries enhanced punishment compared to simple theft (Section 379 - 3 years).',
              'The court may order restitution of recovered property alongside penal sentence.',
            ],
        sourceIds: ['penal-380'],
      };
    }

    if (issueType.includes('assault') || /knife|আঘাত/i.test(fullContextText)) {
      return {
        directAnswer: isBn
          ? 'দণ্ডবিধি অনুযায়ী মারধর বা মারাত্মক অস্ত্র দিয়ে জখম করার শাস্তি আঘাতের তীব্রতার ওপর নির্ভর করে ১ থেকে ৭ বছর পর্যন্ত কারাদণ্ড হতে পারে (ধারা ৩২৩/৩২৪)।'
          : 'Under the Penal Code (Sections 323 & 324), voluntarily causing hurt by dangerous weapons carries imprisonment from 1 to 7 years, alongside financial penalties.',
        sourceIds: ['penal-323'],
      };
    }
  }

  // 7. GENERAL CONTEXT-AWARE FALLBACK
  const hasVehicleContext =
    issueType.includes('vehicle') ||
    /\b(bike|motorbike|motorcycle|scooter|gari|car|cycle|বাইক|মোটরসাইকেল|গাড়ি|স্কুটার)\b/i.test(fullContextText);
  const hasShopContext = issueType.includes('shop') || /dokan|দোকান/i.test(fullContextText);
  const hasWageContext = issueType.includes('wage') || /beton|salary|বেতন/i.test(fullContextText);

  let directAnswer = '';
  if (hasVehicleContext) {
    directAnswer = isBn
      ? `আপনার বাইক চুরির ঘটনার বিষয়ে আমি প্রস্তুত। আপনি কি প্রয়োজনীয় কাগজপত্র, থানার ওয়্যারলেস বার্তা, বিআরটিএ-তে লক করার প্রক্রিয়া বা জিডির খসড়া প্রস্তুত করতে চান? সুনির্দিষ্ট যেকোনো প্রশ্ন করতে পারেন।`
      : `Regarding your reported motorbike theft, I am here to assist. Would you like details on required documents, police W/T checkpost alerts, BRTA database locking, or preparing the GD draft?`;
  } else if (hasShopContext) {
    directAnswer = isBn
      ? `আপনার দোকান থেকে মালামাল চুরির ঘটনার বিষয়ে আমি বিস্তারিত নির্দেশনা দিতে পারি। এজাহারের প্রয়োজনীয় কাগজপত্র, ট্রেড লাইসেন্স বা দণ্ডবিধি ৩৮০ ধারার পদক্ষেপ সম্পর্কে জানতে চাইলে সরাসরি বলুন।`
      : `Regarding your shop theft incident, I can guide you on FIR filing, trade license and inventory valuation documents, or proceedings under Penal Code 380.`;
  } else if (hasWageContext) {
    directAnswer = isBn
      ? `আপনার বকেয়া বেতনের বিষয়ে শ্রম আইন ২০০৬-এর আলোকে প্রয়োজনীয় আইনি প্রতিকার রয়েছে। কলকারখানা অধিদপ্তর (DIFE)-এ অভিযোগ বা শ্রম আদালতে দাবির বিষয়ে নির্দিষ্ট তথ্য জানতে পারেন।`
      : `Regarding your unpaid wages, statutory remedies exist under the Bangladesh Labour Act 2006. Feel free to ask about lodging a DIFE complaint or moving the Labour Court.`;
  } else {
    directAnswer = isBn
      ? `আপনার বিষয়টি আমি বুঝতে পারছি। আপনি কি কোনো নির্দিষ্ট আইনি ধারা, প্রয়োজনীয় প্রমাণপত্র, কোন অফিসে যেতে হবে বা দরখাস্তের খসড়া তৈরি করতে চান? বিষয়টি জানালে আপনাকে সরাসরি গাইড করতে পারব।`
      : `I understand your inquiry. Please let me know if you would like guidance on specific legal sections, required documents, which authority to approach, or generating a draft petition.`;
  }

  return {
    directAnswer,
    suggestedNextStep: isBn
      ? 'প্রয়োজনে আপনার পরিস্থিতি বিস্তারিত লিখতে পারেন বা যে কোনো স্পষ্টীকরণ প্রশ্ন করতে পারেন।'
      : 'You can type your specific situation or ask any clarifying questions directly.',
    sourceIds: candidateSources.slice(0, 2).map((s) => s.id),
  };
}
