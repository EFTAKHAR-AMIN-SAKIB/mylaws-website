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
    /\b(consumer|mrp|overcharge|expired|fake|refund|delivery|online\s+shop)\b/i.test(text) ||
    /ভোক্তা|অতিরিক্ত\s*দাম|মেয়াদোত্তীর্ণ|মেয়াদোত্তীর্ণ|ডেলিভারি|টাকা\s*ফেরত/u.test(text)
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
  };
}
