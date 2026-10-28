import { provisions, type Lang } from '../data/legal';
import { nationalLegalAid, difeOffice, policeGdOffice } from '../data/offices';
import type {
  ChecklistStep,
  Claim,
  DocumentType,
  FactValue,
  AnswerResult,
  AnswerRequest,
  ExecutionMode,
} from '@/types/contracts';

export const SOURCE_VERSION = 'bd-pilot-2026-10-27.1';

export type EmploymentType = 'unknown' | 'private' | 'epz' | 'public' | 'other';

export interface WorkflowFacts {
  workplace?: string;
  employment?: EmploymentType;
  incidentDate?: string;
  incidentPlace?: string;
  amount?: string;
  evidence?: string;
  notes?: string;
}

export function isWorkQuestion(text: string): boolean {
  return (
    /\b(wages?|wagess|salary|salry|salaries|employer|appointment\s+letter|beton|betan|betn|mojuri|niyogpotro)\b/i.test(text) ||
    /বেতন|বেত্ন|মজুরি|মজুরী|নিয়োগপত্র|নিয়োগপত্র|শ্রমিক/u.test(text)
  );
}

export function isGdQuestion(text: string): boolean {
  return (
    /\b(gd|general\s+diary|thana|police|harassment|threat|blackmail|lost|document\s+loss)\b/i.test(text) ||
    /সাধারণ\s*ডায়েরি|জিডি|থানা|পুলিশ|হুমকি|ব্ল্যাকমেইল|হারিয়ে|নিখোঁজ/u.test(text)
  );
}

export function isConsumerQuestion(text: string): boolean {
  return (
    /\b(consumer|mrp|overcharge|expired|fake|refund|delivery|online\s+shop|fraud|cheating)\b/i.test(text) ||
    /ভোক্তা|অতিরিক্ত\s*দাম|মেয়াদোত্তীর্ণ|মেয়াদোত্তীর্ণ|ডেলিভারি|টাকা\s*ফেরত|নকল|ভেজাল|ওজনে\s*কম|পণ্য|প্রতারণা/u.test(text)
  );
}

export function createLegalWorkflow(
  request: AnswerRequest,
  mode: ExecutionMode = 'online'
): AnswerResult {
  const { originalMessage, language } = request;
  const isBn = language === 'bn';

  // Check foreign territory
  const outside = /\b(india|kolkata|delhi|mumbai|pakistan|london|dubai|usa|uk)\b|ভারত|কলকাতা|দিল্লি/i.test(
    originalMessage
  );

  // Check paid in full / contradictory
  const paidInFull = /paid in full|no unpaid wages remain|পুরো বেতন পেয়েছি|সব বেতন পেয়েছি|shob beton paisi/i.test(
    originalMessage
  );

  // Detect topic
  const isWork = isWorkQuestion(originalMessage);
  const isGd = isGdQuestion(originalMessage);
  const isConsumer = isConsumerQuestion(originalMessage);

  if (paidInFull) {
    return {
      schemaVersion: 1,
      answerId: request.requestId,
      mode,
      status: 'unsupported',
      questions: [],
      userFacts: [
        {
          fieldId: 'condition',
          value: 'Full payment reported',
          status: 'user_reported',
          provenance: 'user_input',
        },
      ],
      checklist: [],
      explanation: [
        {
          text: isBn
            ? 'আপনার বর্ণনানুযায়ী পুরো মজুরি পরিশোধ করা হয়েছে। কোনো বকেয়া না থাকলে শ্রম আইনে বকেয়া মজুরির দাবি প্রযোজ্য নয়।'
            : 'According to your description, all wages have been paid in full. When no arrears exist, wage-recovery provisions are inapplicable.',
          sourceIds: [],
        },
      ],
      limitations: [
        isBn
          ? 'বিরোধ বা আইনি ভিত্তি ছাড়া কোনো পদক্ষেপ গ্রহণ করা যায় না।'
          : 'Legal claims cannot be initiated without an active dispute or unpaid entitlement.',
      ],
      sourcePackVersion: SOURCE_VERSION,
      allowedDraftOptions: [],
    };
  }

  if (outside) {
    return {
      schemaVersion: 1,
      answerId: request.requestId,
      mode,
      status: 'unsupported',
      questions: [],
      userFacts: [
        {
          fieldId: 'jurisdiction',
          value: 'Outside Bangladesh',
          status: 'user_reported',
          provenance: 'user_input',
        },
      ],
      checklist: [],
      explanation: [
        {
          text: isBn
            ? 'MyLaws শুধুমাত্র বাংলাদেশের প্রচলিত আইনের তথ্য প্রদান করে। বাংলাদেশের ভৌগোলিক এলাকার বাইরের ঘটনার ক্ষেত্রে সংশ্লিষ্ট দেশের আইন প্রযোজ্য।'
            : 'MyLaws only covers Bangladesh legal information. For incidents outside Bangladesh, foreign jurisdictions apply.',
          sourceIds: [],
        },
      ],
      limitations: [
        isBn
          ? 'এই সিস্টেমে শুধুমাত্র বাংলাদেশের ৬টি প্রধান আইন ও বিধি অন্তর্ভুক্ত রয়েছে।'
          : 'This system is restricted to verified Bangladesh statutory instruments.',
      ],
      sourcePackVersion: SOURCE_VERSION,
      allowedDraftOptions: [],
    };
  }

  if (isWork) {
    const questions: string[] = [];
    const hasWorkplace = request.facts.some((f) => f.fieldId === 'workplace' && f.value.trim().length > 0);
    const hasEmployment = request.facts.some(
      (f) => f.fieldId === 'employment' && ['private', 'epz', 'public'].includes(f.value)
    );

    if (!hasWorkplace) {
      questions.push(
        isBn
          ? 'কর্মস্থলটি কোন জেলা ও উপজেলায় অবস্থিত ছিল? (সঠিক ঠিকানা না দিয়ে এলাকা জানালেই হবে)'
          : 'Which district and upazila was the workplace located in? (Exact address is not necessary)'
      );
    }
    if (!hasEmployment) {
      questions.push(
        isBn
          ? 'চাকরিটি কি বেসরকারি প্রতিষ্ঠান, ইপিজেড (EPZ), নাকি সরকারি প্রতিষ্ঠানে ছিল?'
          : 'Was the employment in a private enterprise, an Export Processing Zone (EPZ), or government service?'
      );
    }

    const checklist: ChecklistStep[] = [
      {
        id: 'step-wage-1',
        text: isBn
          ? 'নিয়োগ সংক্রান্ত নথিপত্র এবং বকেয়া মাসের হিসাব আলাদা করুন (নিয়োগপত্র, আইডি কার্ড, পে-স্লিপ, ব্যাংকিং তথ্য ইত্যাদি)।'
          : 'Gather and organize your employment records and wage arrears calculation (appointment letter, photo ID, salary slips, or bank records).',
        sourceIds: ['labour-5', 'labour-123'],
        condition: isBn ? 'আপনার হেফাজতে থাকা বৈধ নথির কপি রাখুন' : 'Retain records already lawfully in your custody',
        requiredDocuments: isBn ? ['নিয়োগপত্র বা কাজের প্রমাণ', 'বকেয়া মজুরির হিসাব'] : ['Appointment letter or proof of work', 'Wage arrears calculation'],
        helpfulEvidence: isBn ? ['মালিকের সাথে বার্তা বা ইমেইল', 'বেতন স্লিপ বা ক্যাশ ভাউচার'] : ['Messages/emails with employer', 'Payslips or payment vouchers'],
      },
      {
        id: 'step-wage-2',
        text: isBn
          ? 'আইন অনুযায়ী মজুরি পরিশোধের সময়সীমা পার হয়েছে কি না নিশ্চিত হোন (মজুরিকাল শেষের ৭ কার্যদিবস অথবা চাকরি শেষের ৩০ কার্যদিবস)।'
          : 'Confirm whether the statutory payment deadline has lapsed (7 working days after wage period, or 30 working days upon termination).',
        sourceIds: ['labour-123'],
        condition: isBn ? 'ধারা ১২৩ এর সময়সীমা প্রযোজ্য' : 'Statutory time limits under Section 123 apply',
      },
      {
        id: 'step-wage-3',
        text: isBn
          ? 'কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর (DIFE)-এর আঞ্চলিক পরিদর্শক বরাবর লিখিত অভিযোগ অথবা আপসের আবেদন প্রস্তুত করুন।'
          : 'Prepare a written complaint or conciliation application addressed to the Inspector General / regional inspectorate of DIFE.',
        sourceIds: ['labour-124a', 'labour-132'],
        officeId: difeOffice.id,
        condition: isBn ? 'সংশ্লিষ্ট এলাকার শ্রম পরিদর্শক দপ্তরে দাখিল প্রযোজ্য' : 'Submit to the relevant regional DIFE inspectorate',
      },
      {
        id: 'step-wage-4',
        text: isBn
          ? 'প্রয়োজনে জাতীয় আইনি সহায়তা হেল্পলাইনে (১৬৬৯৯) যোগাযোগ করে সরকারি প্যানেল আইনজীবীর পরামর্শ নিন।'
          : 'Call the National Legal Aid Hotline (16699) to verify local jurisdiction and panel legal assistance if required.',
        sourceIds: ['constitution-27', 'constitution-31'],
        officeId: nationalLegalAid.id,
      },
    ];

    const explanation: Claim[] = [
      {
        text: isBn
          ? 'বাংলাদেশ শ্রম আইন, ২০০৬-এর ধারা ১২৩ অনুযায়ী নিয়মিত মজুরি মজুরিকাল শেষ হওয়ার পরবর্তী ৭ কার্যদিবসের মধ্যে পরিশোধ বাধ্যতামূলক। চাকরি অবসানের ক্ষেত্রে তা ৩০ কার্যদিবসের মধ্যে দিতে হয়।'
          : 'Under Section 123 of the Bangladesh Labour Act 2006, wages must be paid within 7 working days following the end of the wage period (or 30 working days upon termination).',
        sourceIds: ['labour-123'],
      },
      {
        text: isBn
          ? 'বকেয়া বা কর্তিত মজুরির জন্য ধারা ১২৪ক অনুযায়ী শ্রম পরিদর্শকের নিকট আপসের আবেদন করা যায়, অথবা ধারা ১৩২ অনুযায়ী শ্রম আদালতে ১২ মাসের মধ্যে আবেদন করা যায়।'
          : 'For unpaid wages, a worker may seek conciliation via the Chief Inspector under Section 124A, or apply to the Labour Court within 12 months under Section 132.',
        sourceIds: ['labour-124a', 'labour-132'],
      },
      {
        text: isBn
          ? 'ধারা ৫ অনুযায়ী নিয়োগকারীকে লিখিত নিয়োগপত্র ও ছবিসহ পরিচয়পত্র প্রদান করতে হয়। নিয়োগপত্র না থাকলেও অন্যান্য সাক্ষ্য-প্রমাণ দিয়ে চাকরি প্রমাণ করা সম্ভব।'
          : 'Section 5 mandates that employers issue an appointment letter and identity card. Even in its absence, circumstantial evidence may establish employment.',
        sourceIds: ['labour-5'],
      },
    ];

    return {
      schemaVersion: 1,
      answerId: request.requestId,
      mode,
      status: questions.length > 0 ? 'clarifying' : 'completed',
      questions,
      userFacts: [
        {
          fieldId: 'issue_type',
          value: 'unpaid_wages',
          status: 'user_reported',
          provenance: 'intent_classification',
        },
      ],
      checklist,
      explanation,
      limitations: [
        isBn
          ? 'ইপিজেড বা সরকারি কর্মচারীদের জন্য আলাদা শ্রম ও সার্ভিস বিধিমালা প্রযোজ্য হতে পারে।'
          : 'EPZ workers and civil servants are governed by separate statutory frameworks.',
        isBn
          ? 'এটি কেবল তথ্য ও প্রস্তুতির সহায়তা; কোনো আনুষ্ঠানিক দাখিলপত্র বা নিশ্চয়তা নয়।'
          : 'This is an information and preparation aid, not an official filing or legal outcome guarantee.',
      ],
      sourcePackVersion: SOURCE_VERSION,
      allowedDraftOptions: ['dife'],
      // Canonical 4-Step User Journey
      problemSummary: {
        identifiedIssue: isBn
          ? 'বকেয়া মজুরি ও শ্রম অধিকারের লঙ্ঘন'
          : 'Unpaid Wages & Statutory Labour Rights Violation',
        understanding: isBn
          ? 'আমরা আপনার পরিস্থিতিটি যত্নসহকারে বিশ্লেষণ করেছি: আপনি কর্মস্থলে শ্রম দেওয়ার পর নির্ধারিত সময়ে আপনার বকেয়া মজুরি পাননি। এটি বাংলাদেশ শ্রম আইন অনুযায়ী একটি মৌলিক অধিকারের লঙ্ঘন এবং আপনি আপনার সম্পূর্ণ পাওনা আদায়ে আইনি পদক্ষেপ নেওয়ার পূর্ণ অধিকারী।'
          : 'We have carefully analyzed your situation: you have rendered work but your employer has failed to pay your wages on time. Under the Bangladesh Labour Act, this is an actionable statutory violation, and you hold the full legal right to recover your earned wages.',
        additionalInfoNeeded: questions,
      },
      plainLanguageExplanation: {
        meaning: isBn
          ? 'সহজ ভাষায় বলতে গেলে, মালিক চাইলেই আপনার বেতন অনির্দিষ্টকাল আটকে রাখতে পারেন না। আইন অনুযায়ী মজুরির মেয়াদ শেষ হওয়ার পরবর্তী ৭ কার্যদিবসের মধ্যে (এবং চাকরি শেষ হলে বা ছাঁটাই হলে ৩০ কার্যদিবসের মধ্যে) পুরো পাওনা পরিশোধ করা নিয়োগদাতার আইনি বাধ্যবাধকতা। বকেয়া রাখা আইনত সম্পূর্ণ বেআইনি।'
          : 'In plain language, an employer cannot withhold your salary indefinitely. Under Section 123 of the Bangladesh Labour Act, full wages must be paid within 7 working days following the end of the wage period (or 30 working days upon termination). Withholding pay is unlawful.',
        userRightsAndOptions: isBn
          ? [
              'আপনার বকেয়া বেতন ও সকল পাওনা শতভাগ বুঝে পাওয়ার পূর্ণ আইনগত অধিকার রয়েছে।',
              'কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তরের (DIFE) শ্রম পরিদর্শক বরাবর লিখিত অভিযোগ দাখিল বা মধ্যস্থতার আবেদন করতে পারেন।',
              'সমঝোতা না হলে শ্রম আদালতের মাধ্যমে বকেয়ার সাথে ক্ষতিপূরণসহ অর্থ আদায়ের মামলা দায়ের করার সুযোগ রয়েছে।'
            ]
          : [
              'You hold a strict statutory entitlement to recover 100% of your unpaid wage arrears.',
              'You can submit a written complaint or conciliation application before the regional Labour Inspector (DIFE).',
              'If conciliation fails, you may initiate proceedings in the Labour Court for recovery plus compensation.'
            ],
        whatToDoNext: isBn
          ? 'প্রথমেই আপনার কাজের প্রমাণাদি (যেমন নিয়োগপত্র, আইডি কার্ড, মেসেজ, বেতন স্লিপ বা ক্যাশ ভাউচার) গুছিয়ে রাখুন এবং নিচের চেকলিস্টের ধাপগুলো ধারাবাহিকভাবে অনুসরণ করুন।'
          : 'First safeguard your records of employment (appointment letter, ID card, payslips, communication logs) and proceed through the action checklist below.'
      },
      draftOffer: {
        prompt: isBn
          ? 'আপনি কি এই ঘটনার ভিত্তিতে একটি আনুষ্ঠানিক খসড়া আবেদন প্রস্তুত করতে চান?'
          : 'Would you like to prepare a formal draft based on this incident?',
        documentType: 'dife',
        documentTitle: isBn
          ? 'কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর (DIFE) বরাবর লিখিত অভিযোগ'
          : 'Formal Written Complaint to the Inspector General of Labour (DIFE)',
        description: isBn
          ? 'MyLaws আপনার নিশ্চিত তথ্যের ভিত্তিতে শ্রম পরিদর্শক বরাবর দাখিলযোগ্য একটি প্রমিত অভিযোগপত্র তৈরি করবে। আপনি বাংলায় সরাসরি সম্পাদনা করে অফিসিয়াল মার্জিন ও পৃষ্ঠা নম্বরসহ প্রিন্ট-রেডি A4 PDF ডাউনলোড করতে পারবেন।'
          : 'MyLaws will generate a structured written complaint addressed to the Labour Inspector. You can customize it in Bangla and export an official print-ready A4 PDF.',
        missingDetails: isBn
          ? ['কর্মস্থলের সুনির্দিষ্ট জেলা ও উপজেলা', 'মালিক বা প্রতিষ্ঠানের নাম ও ঠিকানা', 'বকেয়া মাসের সুনির্দিষ্ট তালিকা']
          : ['Workplace district and upazila', 'Employer/company name & address', 'Specific list of unpaid months']
      }
    };
  }

  if (isConsumer) {
    const questions: string[] = [];
    const hasOrderDate = request.facts.some((f) => f.fieldId === 'order_date' && f.value.trim().length > 0);
    const hasVendor = request.facts.some((f) => f.fieldId === 'vendor' && f.value.trim().length > 0);

    if (!hasOrderDate) {
      questions.push(
        isBn
          ? 'লেনদেন বা পণ্য অর্ডারের তারিখটি কবে ছিল? (ভোক্তা অধিকার আইনে ৩০ দিনের সময়সীমা রয়েছে)'
          : 'When did the transaction take place? (A 30-day statutory limitation period applies under Section 60)'
      );
    }
    if (!hasVendor) {
      questions.push(
        isBn
          ? 'বিক্রেতা বা অনলাইন শপটির নাম ও যোগাযোগের কোনো মাধ্যম জানা আছে কি?'
          : 'Is the name and contact details of the vendor or online shop available?'
      );
    }

    const checklist: ChecklistStep[] = [
      {
        id: 'step-consumer-1',
        text: isBn
          ? 'ক্রয় সংক্রান্ত সকল রসিদ, অনলাইন অর্ডারের স্ক্রিনশট, পেমেন্ট ট্রানজ্যাকশন আইডি ও চ্যাট লগ নিরাপদ হেফাজতে সংরক্ষণ করুন।'
          : 'Gather and preserve all invoices, online order confirmation screenshots, transaction IDs, and communication logs.',
        sourceIds: ['consumer-45'],
        condition: isBn ? 'দালিলিক প্রমাণ সংরক্ষণ আবশ্যক' : 'Documentary evidence required',
        requiredDocuments: isBn ? ['পেমেন্ট বা অর্ডারের রসিদ', 'বিজ্ঞাপন বা চ্যাট হিস্ট্রি'] : ['Payment receipt or order copy', 'Advertisement or chat history'],
        helpfulEvidence: isBn ? ['বিকাশ/নগদ/ব্যাংক স্টেটমেন্ট', 'ডেলিভারি ট্র্যাকিং স্ট্যাটাস'] : ['bKash/Nagad/Bank statement', 'Delivery tracking status'],
      },
      {
        id: 'step-consumer-2',
        text: isBn
          ? 'ঘটনা ঘটার ৩০ কার্যদিবসের মধ্যে প্রতিকার চাওয়ার আইনি সময়সীমা নিশ্চিত করুন।'
          : 'Confirm that the 30-day statutory limitation period under Section 60 has not lapsed.',
        sourceIds: ['consumer-60'],
        condition: isBn ? 'ধারা ৬০ অনুযায়ী ৩০ দিনের সময়সীমা' : 'Section 60 statutory limit of 30 days',
      },
      {
        id: 'step-consumer-3',
        text: isBn
          ? 'জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তর (DNCRP ১৬১২১) বরাবর লিখিত অভিযোগ দাখিল করুন।'
          : 'Lodge a formal written complaint before the Directorate of National Consumer Rights Protection (DNCRP 16121).',
        sourceIds: ['consumer-40', 'consumer-44', 'consumer-45'],
      },
      {
        id: 'step-consumer-4',
        text: isBn
          ? 'প্রতারণা প্রমাণিত হলে আরোপিত জরিমানার ২৫ শতাংশ অর্থ নগদ ক্ষতিপূরণ হিসেবে পাওয়ার দাবি রাখুন।'
          : 'Claim your statutory right to receive 25% of the total administrative penalty imposed on the vendor.',
        sourceIds: ['consumer-40'],
      },
    ];

    const explanation: Claim[] = [
      {
        text: isBn
          ? 'ভোক্তা অধিকার সংরক্ষণ আইন, ২০০৯-এর ধারা ৪৫ অনুযায়ী প্রতিশ্রুত পণ্য বা সেবা প্রদান না করা অথবা অর্থ গ্রহণ করে পণ্য ডেলিভারি না দেওয়া শাস্তিযোগ্য অপরাধ।'
          : 'Under Section 45 of the Consumers’ Right Protection Act 2009, failing to deliver agreed goods or services after receiving payment is a statutory offense.',
        sourceIds: ['consumer-45'],
      },
      {
        text: isBn
          ? 'ধারা ৬০ অনুযায়ী কারণ উদ্ভব হওয়ার ৩০ দিনের মধ্যে জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তরে লিখিত অভিযোগ দাখিল করতে হয়।'
          : 'Under Section 60, written complaints must be submitted to the Directorate within 30 days of the cause of action arising.',
        sourceIds: ['consumer-60'],
      },
      {
        text: isBn
          ? 'ধারা ৪০ অনুযায়ী ধার্যকৃত সর্বোচ্চ মূল্যের চেয়ে বেশি দাবি করা অথবা ধারা ৪৪ অনুযায়ী মিথ্যা বিজ্ঞাপনে প্রতারিত করা দণ্ডনীয়।'
          : 'Under Section 40, overcharging beyond marked price, or Section 44 for misleading advertisements, penal sanctions apply.',
        sourceIds: ['consumer-40', 'consumer-44'],
      },
    ];

    return {
      schemaVersion: 1,
      answerId: request.requestId,
      mode,
      status: questions.length > 0 ? 'clarifying' : 'completed',
      questions,
      userFacts: [
        {
          fieldId: 'issue_type',
          value: 'consumer_fraud',
          status: 'user_reported',
          provenance: 'intent_classification',
        },
      ],
      checklist,
      explanation,
      limitations: [
        isBn
          ? 'ধারা ৬০ অনুযায়ী ঘটনার ৩০ দিন অতিক্রান্ত হলে ভোক্তা অধিদপ্তরে অভিযোগ দায়ের করা যায় না।'
          : 'Under Section 60, complaints filed after the 30-day limitation period are time-barred.',
      ],
      sourcePackVersion: SOURCE_VERSION,
      allowedDraftOptions: ['dncrp'],
      // Canonical 4-Step User Journey
      problemSummary: {
        identifiedIssue: isBn
          ? 'ভোক্তা অধিকার লঙ্ঘন ও অনলাইন ডেলিভারি প্রতারণা'
          : 'Consumer Rights Violation & Commercial Deception',
        understanding: isBn
          ? 'আমরা আপনার বিষয়টি যত্নসহকারে পর্যালোচনা করেছি: আপনি অর্থ পরিশোধের পরও প্রতিশ্রুত পণ্য পাননি অথবা বিজ্ঞাপনের সাথে পণ্যের অসঙ্গতি ও প্রতারণার শিকার হয়েছেন। ভোক্তা অধিকার সংরক্ষণ আইন, ২০০৯ অনুযায়ী ক্রেতা হিসেবে আপনি সম্পূর্ণ সুরক্ষিত এবং ক্ষতিপূরণ পাওয়ার অধিকারী।'
          : 'We have carefully reviewed your situation: you have paid for goods or services that were not delivered as agreed, or you were subjected to false commercial claims. Under the Consumers’ Right Protection Act 2009, you are legally entitled to remedies and compensation.',
        additionalInfoNeeded: questions,
      },
      plainLanguageExplanation: {
        meaning: isBn
          ? 'সহজ কথায়, অগ্রিম টাকা নিয়ে পণ্য না দেওয়া বা ক্রেতাকে মিথ্যা তথ্য দিয়ে প্রলুব্ধ করা বাংলাদেশে আইনত দণ্ডনীয় অপরাধ। ঘটনার ৩০ দিনের মধ্যে ভোক্তা অধিকার অধিদপ্তরে অভিযোগ দাখিল করলে সরকার তদন্ত করে বিক্রেতাকে জরিমানা করবে এবং সেই জরিমানার ২৫% অর্থ সরাসরি আপনাকে নগদ ক্ষতিপূরণ দেওয়া হবে।'
          : 'In plain language, taking advance payment without delivering goods or making misleading claims is an unlawful offense. When filed within 30 days, the authorities investigate, penalize the seller, and pay 25% of the total fine directly to you as compensation.',
        userRightsAndOptions: isBn
          ? [
              'প্রদত্ত অর্থ শতভাগ ফেরত ও প্রতারণার ক্ষতিপূরণ পাওয়ার আইনি অধিকার।',
              'জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তরে (হটলাইন ১৬১২১) লিখিত অভিযোগ বা ইমেইল দাখিল।',
              'প্রতারক ব্যবসায়ীর ওপর আরোপিত প্রশাসনিক জরিমানার ২৫ শতাংশ অর্থ নগদ ক্ষতিপূরণ হিসেবে পাওয়া।'
            ]
          : [
              'Right to demand a 100% refund and appropriate statutory compensation.',
              'Submit a written complaint to the Directorate of National Consumer Rights Protection (hotline 16121).',
              'Statutory entitlement to 25% of the financial penalty imposed on the offending vendor.'
            ],
        whatToDoNext: isBn
          ? 'অনলাইন অর্ডারের স্ক্রিনশট, ইনভয়েস ও মেসেজগুলো নিরাপদে রাখুন এবং ৩০ দিনের সময়সীমার মধ্যে ভোক্তা অধিকার সংরক্ষণ অধিদপ্তর বরাবর অভিযোগ প্রস্তুত করুন।'
          : 'Safeguard your transaction receipts, invoices, and message logs, and prepare your complaint within the 30-day statutory window.'
      },
      draftOffer: {
        prompt: isBn
          ? 'আপনি কি এই ঘটনার ভিত্তিতে একটি আনুষ্ঠানিক খসড়া আবেদন প্রস্তুত করতে চান?'
          : 'Would you like to prepare a formal draft based on this incident?',
        documentType: 'dncrp',
        documentTitle: isBn
          ? 'জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তর (DNCRP) বরাবর লিখিত অভিযোগ'
          : 'Written Complaint to National Consumer Rights Protection (DNCRP)',
        description: isBn
          ? 'MyLaws আপনার নিশ্চিত তথ্যের ভিত্তিতে ভোক্তা অধিকার সংরক্ষণ অধিদপ্তর বরাবর দাখিলযোগ্য একটি প্রমিত অভিযোগপত্র তৈরি করবে। আপনি বাংলায় সরাসরি সম্পাদনা করে প্রিন্ট-রেডি A4 PDF ডাউনলোড করতে পারবেন।'
          : 'MyLaws will generate a structured complaint addressed to the Consumer Rights Directorate, which you can customize in Bangla and export as an A4 PDF.',
        missingDetails: isBn
          ? ['বিক্রেতা বা প্রতিষ্ঠানের নাম ও যোগাযোগের মাধ্যম', 'লেনদেন বা অর্ডারের তারিখ ও রসিদ নম্বর']
          : ['Vendor/shop name and contact details', 'Transaction date and receipt/order ID']
      }
    };
  }

  if (isGd) {
    const questions: string[] = [];
    const hasPlace = request.facts.some((f) => f.fieldId === 'place' && f.value.trim().length > 0);
    const hasDate = request.facts.some((f) => f.fieldId === 'date' && f.value.trim().length > 0);

    if (!hasPlace) {
      questions.push(
        isBn
          ? 'ঘটনাটি কোন এলাকায় বা কোন থানার অধীন ঘটেছে? (জানা না থাকলে অজানা রাখুন)'
          : 'Which area or police station jurisdiction did this occur in? (If unknown, mark as unknown)'
      );
    }
    if (!hasDate) {
      questions.push(
        isBn
          ? 'ঘটনাটি কবে ঘটেছে? (তারিখ ও আনুমানিক সময় জানা আছে কি?)'
          : 'When did the incident take place? (Is the date and estimated time known?)'
      );
    }

    const checklist: ChecklistStep[] = [
      {
        id: 'step-gd-1',
        text: isBn
          ? 'ঘটনার ধারাবাহিক বিবরণ প্রস্তুত করুন; সঠিক তারিখ জানা না থাকলে অনুমান না করে "অজানা" হিসেবে চিহ্নিত করুন।'
          : 'Draft a chronological statement of facts; do not guess unknown dates, mark them as unknown.',
        sourceIds: ['penal-503', 'penal-507'],
        condition: isBn ? 'অনুমান বা মিথ্যা তথ্য পরিহার করুন' : 'Avoid speculation or unconfirmed statements',
        requiredDocuments: isBn ? ['জাতীয় পরিচয়পত্র / জন্ম নিবন্ধন নম্বর (যদি থাকে)', 'ঘটনার বিবরণ'] : ['NID / Birth certificate (if available)', 'Chronological statement of facts'],
        helpfulEvidence: isBn ? ['হুমকিপূর্ণ বার্তা / স্ক্রিনশট / কল লগ', 'হারিয়ে যাওয়া জিনিসের রসিদ বা বিবরণ'] : ['Screenshots / call logs / messages', 'Purchase receipts / item descriptions'],
      },
      {
        id: 'step-gd-2',
        text: isBn
          ? 'হুমকি বা অপরাধমূলক বার্তার স্ক্রিনশট, অডিও রেকর্ড বা চ্যাট লগ নিরাপদে ব্যাকআপ রাখুন।'
          : 'Safely preserve and back up screenshots, messages, or recordings of intimidating communications.',
        sourceIds: ['penal-503', 'penal-507'],
        condition: isBn ? 'প্রেরকের মুখোমুখি না হয়ে প্রমাণ সংরক্ষণ করুন' : 'Preserve evidence safely without confronting sender',
      },
      {
        id: 'step-gd-3',
        text: isBn
          ? 'সংশ্লিষ্ট থানার ভারপ্রাপ্ত কর্মকর্তা (OC) বরাবর সাধারণ ডায়েরির (GD) আবেদন প্রস্তুত করুন।'
          : 'Prepare a structured General Diary (GD) draft addressed to the Officer-in-Charge of the jurisdictional Police Station.',
        sourceIds: ['penal-503'],
        officeId: policeGdOffice.id,
      },
      {
        id: 'step-gd-4',
        text: isBn
          ? 'জরুরি শারীরিক বিপদের ঝুঁকি থাকলে অবিলম্বে ৯৯৯ নম্বরে কল করে পুলিশের জরুরি সহায়তা নিন।'
          : 'If facing immediate physical danger, dial 999 immediately for emergency police assistance.',
        sourceIds: ['constitution-31'],
        officeId: policeGdOffice.id,
      },
    ];

    const explanation: Claim[] = [
      {
        text: isBn
          ? 'দণ্ডবিধি, ১৮৬০-এর ধারা ৫০৩ অনুযায়ী কাউকে শারীরিক, মানসিক, সামাজিক সুনাম বা সম্পত্তির ক্ষতির হুমকি দেওয়া অপরাধমূলক ভীতি প্রদর্শন (Criminal Intimidation)।'
          : 'Under Section 503 of the Penal Code 1860, threatening injury to person, reputation, or property constitutes criminal intimidation.',
        sourceIds: ['penal-503'],
      },
      {
        text: isBn
          ? 'ধারা ৫০৭ অনুযায়ী বেনামি বার্তা বা ভুয়া একাউন্ট ব্যবহার করে পরিচয় গোপন রেখে হুমকি দেওয়া হলে তা অতিরিক্ত শাস্তিযোগ্য অপরাধ।'
          : 'Section 507 provides enhanced penalties for criminal intimidation committed by anonymous communications or hidden identities.',
        sourceIds: ['penal-507'],
      },
    ];

    return {
      schemaVersion: 1,
      answerId: request.requestId,
      mode,
      status: questions.length > 0 ? 'clarifying' : 'completed',
      questions,
      userFacts: [
        {
          fieldId: 'issue_type',
          value: 'police_gd_threat',
          status: 'user_reported',
          provenance: 'intent_classification',
        },
      ],
      checklist,
      explanation,
      limitations: [
        isBn
          ? 'জিডি কোনো আনুষ্ঠানিক এফআইআর (FIR) বা মামলা নয়; এটি নিরাপত্তা বা তথ্য সংরক্ষণের প্রাথমিক ডায়েরি।'
          : 'A GD is a preliminary record of information or security concern, not a formal FIR or court case.',
        isBn
          ? 'পুলিশের জিডি গ্রহণের সিদ্ধান্ত সংশ্লিষ্ট থানার দায়িত্বপ্রাপ্ত কর্মকর্তার এখতিয়ারভুক্ত।'
          : 'Acceptance of a GD remains subject to the assessment of the Officer-in-Charge.',
      ],
      sourcePackVersion: SOURCE_VERSION,
      allowedDraftOptions: ['gd'],
      // Canonical 4-Step User Journey
      problemSummary: {
        identifiedIssue: isBn
          ? 'অপরিচিত ব্যক্তি কর্তৃক হুমকি ও নিরাপত্তা ঝুঁকি (Criminal Intimidation)'
          : 'Criminal Intimidation & Personal Security Threat',
        understanding: isBn
          ? 'আমরা আপনার বিষয়টি স্পষ্টভাবে বুঝতে পারছি: আপনি ফোন বা সামাজিক যোগাযোগমাধ্যমে (ফেসবুক বা মেসেঞ্জার) অজ্ঞাত বা অপরিচিত ব্যক্তির কাছ থেকে অনাকাঙ্ক্ষিত হুমকি বা ব্ল্যাকমেইলের শিকার হচ্ছেন। এটি আপনার মানসিক শান্তি ও ব্যক্তিগত নিরাপত্তার ওপর সরাসরি আঘাত।'
          : 'We clearly understand what you are facing: you are being subjected to unsolicited threats, intimidation, or harassment via phone or social media from an unknown individual. This is a direct infringement on your security and peace of mind.',
        additionalInfoNeeded: questions,
      },
      plainLanguageExplanation: {
        meaning: isBn
          ? 'সহজ কথায়, কাউকে ভয় দেখানো বা কোনো ক্ষতি করার হুমকি দেওয়া বাংলাদেশে দণ্ডবিধির আওতায় একটি সুনির্দিষ্ট ফৌজদারি অপরাধ (Criminal Intimidation)। যদি হুমকিদাতা নাম-পরিচয় গোপন রেখে বা ভুয়া একাউন্ট থেকে বার্তা পাঠায়, তবে আইনের চোখে অপরাধটি আরও বেশি গুরুতর। আপনার তাৎক্ষণিক আইনি সুরক্ষা হলো থানায় সাধারণ ডায়েরি (GD) নথিভুক্ত করা।'
          : 'In plain language, threatening anyone with injury or harm is a defined criminal offense in Bangladesh (Section 503, Penal Code). Threatening anonymously or from concealed/fake profiles attracts even higher statutory penalties (Section 507). Your primary legal remedy is lodging a General Diary (GD).',
        userRightsAndOptions: isBn
          ? [
              'নিকটস্থ থানায় একটি সাধারণ ডায়েরি (GD) দায়ের করে ঘটনার আনুষ্ঠানিক সরকারি রেকর্ড সৃষ্টি করা।',
              'হুমকির মেসেজ, স্ক্রিনশট, অডিও ক্লিপ ও ফোন নম্বর ডিজিটাল প্রমাণ হিসেবে পুলিশের নিকট উপস্থাপন করা।',
              'যদি তাৎক্ষণিক শারীরিক বিপদের আশঙ্কা থাকে, তবে সরাসরি জাতীয় জরুরি সেবা ৯৯৯ নম্বরে কল দিয়ে পুলিশের সাহায্য নেওয়া।'
            ]
          : [
              'Formally lodge a General Diary (GD) with your local police station to establish an official record.',
              'Submit digital evidence (screenshots, recordings, phone numbers, profile links) to the police.',
              'Dial the 999 National Emergency Service immediately if there is any immediate physical threat.'
            ],
        whatToDoNext: isBn
          ? 'হুমকিদাতার সাথে কোনো প্রকার উত্তপ্ত বাক্যবিনিময়ে যাবেন না। দ্রুত সব স্ক্রিনশট ও প্রমাণ নিরাপদে ব্যাকআপ রাখুন এবং সংশ্লিষ্ট থানার ওসির বরাবরে জিডি খসড়া প্রস্তুত করুন।'
          : 'Avoid engaging or confronting the sender. Back up all digital evidence safely and prepare a GD application addressed to the Officer-in-Charge.'
      },
      draftOffer: {
        prompt: isBn
          ? 'আপনি কি এই ঘটনার ভিত্তিতে একটি আনুষ্ঠানিক খসড়া আবেদন প্রস্তুত করতে চান?'
          : 'Would you like to prepare a formal draft based on this incident?',
        documentType: 'gd',
        documentTitle: isBn
          ? 'থানার ভারপ্রাপ্ত কর্মকর্তা (OC) বরাবর সাধারণ ডায়েরি (GD) আবেদন'
          : 'General Diary (GD) Application to Officer-in-Charge (OC)',
        description: isBn
          ? 'MyLaws আপনার ঘটনার বিবরণ অনুযায়ী থানার ওসির নিকট দাখিলের জন্য একটি প্রমিত জিডি খসড়া প্রস্তুত করবে। নাম, ঠিকানা বা তারিখের কোনো তথ্য বাকি থাকলে তা পূরণ করে তাৎক্ষণিক A4 PDF ডাউনলোড করতে পারবেন।'
          : 'MyLaws will generate a structured GD application for the police station. You can supplement any missing details in Bangla and export an official print-ready A4 PDF.',
        missingDetails: isBn
          ? ['ঘটনা সংঘটনের এলাকা বা থানার নাম', 'হুমকিদাতার ফোন নম্বর বা সোশ্যাল মিডিয়া প্রোফাইল লিঙ্ক (যদি জানা থাকে)']
          : ['Incident jurisdiction or police station name', 'Sender phone number or profile link (if known)']
      }
    };
  }

  // Generic / Consumer / Other covered query fallback
  return {
    schemaVersion: 1,
    answerId: request.requestId,
    mode,
    status: 'completed',
    questions: [],
    userFacts: [
      {
        fieldId: 'query',
        value: originalMessage,
        status: 'user_reported',
        provenance: 'user_input',
      },
    ],
    checklist: [
      {
        id: 'step-gen-1',
        text: isBn
          ? 'ঘটনা সম্পর্কিত মূল তারিখ, লেনদেনের প্রমাণ এবং যোগাযোগের তথ্য লিপিবদ্ধ করুন।'
          : 'Record relevant transaction dates, communication logs, and evidence.',
        sourceIds: ['constitution-31'],
      },
      {
        id: 'step-gen-2',
        text: isBn
          ? 'জাতীয় আইনি সহায়তা হেল্পলাইনে (১৬৬৯৯) যোগাযোগ করে আপনার এলাকার প্রযোজ্য সরকারি সেবা সম্পর্কে জানুন।'
          : 'Contact National Legal Aid at 16699 to discover available governmental legal services in your area.',
        sourceIds: ['constitution-27'],
        officeId: nationalLegalAid.id,
      },
    ],
    explanation: [
      {
        text: isBn
          ? 'সংবিধানের অনুচ্ছেদ ৩১ অনুযায়ী প্রত্যেক নাগরিকের আইনানুযায়ী আচরণ পাওয়ার ও আইনের আশ্রয় লাভের অধিকার রয়েছে।'
          : 'Article 31 of the Constitution establishes the inalienable right of every citizen to be treated only in accordance with law.',
        sourceIds: ['constitution-31'],
      },
    ],
    limitations: [
      isBn
        ? 'বর্তমানে MyLaws শ্রম অধিকার, সাধারণ ডায়েরি ও মৌলিক অধিকারের নির্বাচিত বিধানসমূহ সমর্থন করে।'
        : 'Currently MyLaws covers selected labour, general diary, and fundamental rights provisions.',
    ],
    sourcePackVersion: SOURCE_VERSION,
    allowedDraftOptions: [],
    // Canonical 4-Step User Journey
    problemSummary: {
      identifiedIssue: isBn
        ? 'আইনি অধিকার ও সুরক্ষা পর্যালোচনা'
        : 'Legal Rights & Statutory Review',
      understanding: isBn
        ? 'আমরা আপনার পরিস্থিতিটি যত্নসহকারে বিশ্লেষণ করেছি। বাংলাদেশের আইন অনুসারে যেকোনো বিরোধ বা অধিকার লঙ্ঘনের ক্ষেত্রে সুনির্দিষ্ট আইনি প্রতিকারের পথ খোলা রয়েছে।'
        : 'We have analyzed your inquiry. Under Bangladesh law, legal remedies exist for protection of fundamental rights and statutory entitlements.',
      additionalInfoNeeded: [],
    },
    plainLanguageExplanation: {
      meaning: isBn
        ? 'সহজ কথায়, সংবিধান ও দেশের প্রচলিত আইন অনুযায়ী আপনার অধিকার সুরক্ষিত এবং আপনি যেকোনো অন্যায় বা বিরোধে সরকারি আইনি সহায়তা ও প্রতিকার লাভের পূর্ণ অধিকারী।'
        : 'In plain language, the Constitution of Bangladesh guarantees that no detrimental action can be taken against you except in accordance with the law.',
      userRightsAndOptions: isBn
        ? [
            'আইনের আশ্রয় লাভ এবং ন্যায়বিচার পাওয়ার সাংবিধানিক অধিকার।',
            'সরকারি জাতীয় আইনি সহায়তা সংস্থা (১৬৬৯৯) থেকে বিনামূল্যে পরামর্শ ও আইনজীবী সেবা গ্রহণের সুযোগ।'
          ]
        : [
            'Constitutional entitlement to protection of law and fair treatment.',
            'Access to free government legal aid and panel attorneys via 16699.'
          ],
      whatToDoNext: isBn
        ? 'আপনার কাছে থাকা নথিপত্র সংগ্রহ করুন এবং নিচে দেওয়া প্রাথমিক চেকলিস্টটি দেখুন।'
        : 'Organize your documents and review the preliminary checklist below.'
    },
    draftOffer: {
      prompt: isBn
        ? 'আপনি কি এই ঘটনার ভিত্তিতে একটি আনুষ্ঠানিক খসড়া আবেদন প্রস্তুত করতে চান?'
        : 'Would you like to prepare a formal draft based on this incident?',
      documentType: 'gd',
      documentTitle: isBn ? 'আইনি নোটিশ বা জিডি আবেদন' : 'Formal Legal Notice or Application',
      description: isBn
        ? 'MyLaws আপনাকে ঘটনার ওপর ভিত্তি করে প্রাতিষ্ঠানিক খসড়া তৈরিতে সহায়তা করে।'
        : 'MyLaws assists you in preparing structured drafts based on confirmed facts.',
      missingDetails: []
    }
  };
}
