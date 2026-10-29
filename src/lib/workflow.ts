import { provisions, type Lang } from '../data/legal';
import { nationalLegalAid, difeOffice, policeGdOffice, dncrpOffice } from '../data/offices';
import {
  isGreetingQuery,
  isCapabilityQuery,
  generateGreetingResponse,
  generateCapabilityResponse,
} from './followup';
import type {
  ChecklistStep,
  Claim,
  DocumentType,
  FactValue,
  AnswerResult,
  AnswerRequest,
  ExecutionMode,
  ClarificationQuestion,
} from '@/types/contracts';

export const SOURCE_VERSION = 'bd-pilot-2026-10-27.1';

export type EmploymentType = 'unknown' | 'private' | 'epz' | 'public' | 'other';

export function isWageArrearsQuestion(text: string): boolean {
  const hasWageTerm =
    /\b(wages?|salary|salaries|allowance|allowances|remuneration|beton|betan|betn|mojuri|bhata|vhata)\b/i.test(text) ||
    /বেতন|মজুরি|মজুরী|ভাতা|পারিশ্রমিক/u.test(text);

  const hasArrearsContext =
    /\b(unpaid|due|arrears?|pending|withheld|not\s+paid|haven't\s+paid|owes?|did\s+not\s+pay|deynai|painai|paisi\s*na)\b/i.test(text) ||
    /বকেয়া|বকেয়া|দেয়নি|দেয়নাই|দেয়\s*নাই|পাইনি|পাই\s*নাই|আটকে|আটক|পরিশোধ\s*করেনি|দেওয়া\s*হচ্ছে\s*না|দেওয়া\s*হয়নি/u.test(text);

  return hasWageTerm && hasArrearsContext;
}

export function isWorkQuestion(text: string): boolean {
  return (
    isWageArrearsQuestion(text) ||
    /\b(wages?|salary|salaries|employer|appointment\s+letter|worker|employee|termination|dismissal|overtime|allowance|remuneration|job|beton|betan|mojuri|niyogpotro|chakri)\b/i.test(text) ||
    /বেতন|মজুরি|মজুরী|ভাতা|নিয়োগপত্র|নিয়োগপত্র|শ্রমিক|কর্মচারী|কর্মকর্তা|চাকরি|চাকরী|ছাঁটাই|চাকরি\s*চ্যুতি|ওভারটাইম|পারিশ্রমিক/u.test(text)
  );
}

export function isAssaultOrInjuryQuestion(text: string): boolean {
  return (
    /\b(assault|beating|attack|attacked|stab|stabbed|stabbing|knife|churi\s+diye|blade|injured|injury|hurt|wound|wounded|mardhor|marpit|marpeet|aghat)\b/i.test(text) ||
    /মারধর|আঘাত|কুপিয়েছে|কুপিয়ে|ছুরি\s*দিয়ে|চাকু|জখম|রক্তাক্ত|শারীরিক\s*নির্যাতন|হামলা|মারামারি|ছুরিকাঘাত/u.test(text)
  );
}

export function isTheftOrLossQuestion(text: string): boolean {
  // If explicitly an assault or weapon attack, do not classify as theft
  if (isAssaultOrInjuryQuestion(text)) return false;
  return (
    /\b(stolen|theft|thief|steal|stole|snatch|snatched|snatching|robbed|robbery|pickpocket|mobile\s+stolen|phone\s+stolen|shop\s+theft|burglary|bike\s+stolen|motorcycle\s+stolen|car\s+stolen|vehicle\s+stolen)\b/i.test(text) ||
    /চুরি|ছিনতাই|পকেটমার|ডাকাতি|মোবাইল\s*চুরি|ফোন\s*চুরি|দোকান\s*চুরি|মাল\s*চুরি|মালামাল\s*চুরি|বাইক\s*চুরি|মোটরসাইকেল\s*চুরি|গাড়ি\s*চুরি|সাইকেল\s*চুরি|হারিয়ে|হারানো|হারিয়েছে|হারাইছে/u.test(text) ||
    (/\b(churi|cori|chori|curi)\b/i.test(text) && !/\b(diye|aghat|knife|stab)\b/i.test(text)) ||
    /\b(dokan\s+theke\s+maal|maal\s+cori|maal\s+churi|dokan\s+cori|dokan\s+churi|bike\s+cori|bike\s+churi|gari\s+cori|gari\s+churi)\b/i.test(text)
  );
}

export function isGdQuestion(text: string): boolean {
  return (
    isTheftOrLossQuestion(text) ||
    isAssaultOrInjuryQuestion(text) ||
    /\b(gd|general\s+diary|fir|thana|police|harassment|threat|blackmail|lost|document\s+loss)\b/i.test(text) ||
    /সাধারণ\s*ডায়েরি|সাধারণ\s*ডায়েরি|জিডি|এজাহার|মামলা|এফআইআর|থানা|পুলিশ|হুমকি|ব্ল্যাকমেইল|হারিয়ে|নিখোঁজ|নিরাপত্তা\s*ঝুঁকি/u.test(text)
  );
}

export function isConsumerQuestion(text: string): boolean {
  return (
    /\b(consumer|mrp|overcharge|expired|fake|refund|delivery|online\s+shop|fraud|cheating|dncrp)\b/i.test(text) ||
    /ভোক্তা|অতিরিক্ত\s*দাম|মেয়াদোত্তীর্ণ|মেয়াদোত্তীর্ণ|ডেলিভারি|টাকা\s*ফেরত|নকল|ভেজাল|ওজনে\s*কম|পণ্য|প্রতারণা/u.test(text)
  );
}

export function createLegalWorkflow(
  request: AnswerRequest,
  mode: ExecutionMode = 'online'
): AnswerResult {
  const { originalMessage, language } = request;
  const isBn = language === 'bn';

  // 0. Greeting & Salutation Intent Handling
  if (isGreetingQuery(originalMessage)) {
    const greetingRes = generateGreetingResponse(language);
    return {
      schemaVersion: 1,
      answerId: request.requestId,
      mode,
      status: 'completed',
      questions: [],
      userFacts: request.facts || [],
      checklist: [],
      explanation: [],
      limitations: [],
      sourcePackVersion: SOURCE_VERSION,
      allowedDraftOptions: [],
      isFollowUp: true,
      isGreeting: true,
      followUpResponse: greetingRes,
      problemSummary: {
        identifiedIssue: isBn ? 'স্বাগতম ও পরিচিতি' : 'Welcome & Introduction',
        understanding: greetingRes.directAnswer,
      },
    };
  }

  // 0.5 Capability, About & Service Overview Handling
  if (isCapabilityQuery(originalMessage)) {
    const capRes = generateCapabilityResponse(language);
    return {
      schemaVersion: 1,
      answerId: request.requestId,
      mode,
      status: 'completed',
      questions: [],
      userFacts: request.facts || [],
      checklist: [],
      explanation: [],
      limitations: [],
      sourcePackVersion: SOURCE_VERSION,
      allowedDraftOptions: [],
      isFollowUp: true,
      isCapability: true,
      followUpResponse: capRes,
      problemSummary: {
        identifiedIssue: isBn ? 'MyLaws-এর সেবাসমূহ ও সক্ষমতা' : 'MyLaws Capabilities & Services',
        understanding: capRes.directAnswer,
      },
    };
  }

  // 1. Accurate Negation & Contradiction Detection
  const hasPaymentNegation =
    /(not|haven't|havent|hasn't|never|didn't|did\s+not|wasn't|was\s+not)\s+(been\s+)?paid\s+in\s+full/i.test(originalMessage) ||
    /পাই\s*নাই|পাইনি|দেয়\s*নাই|দেয়নি|দেয়নাই/u.test(originalMessage) ||
    /\b(deynai|painai|paisi\s*na)\b/i.test(originalMessage);

  const paidInFull =
    !hasPaymentNegation &&
    (/paid in full|no unpaid wages remain|পুরো বেতন পেয়েছি|সব বেতন পেয়েছি|পুরো বেতন পেয়েছি/i.test(originalMessage) ||
      /\b(shob beton paisi|puro beton paisi)\b/i.test(originalMessage));

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
            ? 'আপনার বর্ণনানুযায়ী পুরো মজুরি পরিশোধ করা হয়েছে। কোনো বকেয়া বা বিরোধ না থাকলে শ্রম আইনের বকেয়া মজুরি আদায়ের বিধান প্রযোজ্য নয়।'
            : 'According to your description, all wages have been paid in full. When no arrears exist, statutory wage-recovery provisions are inapplicable.',
          sourceIds: [],
        },
      ],
      limitations: [
        isBn
          ? 'বিরোধ বা আইনি ভিত্তি ছাড়া কোনো আইনি পদক্ষেপ গ্রহণ করা যায় না।'
          : 'Legal claims cannot be initiated without an active dispute or unpaid entitlement.',
      ],
      sourcePackVersion: SOURCE_VERSION,
      allowedDraftOptions: [],
    };
  }

  // 2. Scoped Foreign Jurisdiction Detection
  const mentionsBangladeshLoc =
    /\b(dhaka|chittagong|ctg|gazipur|narayanganj|sylhet|khulna|rajshahi|barishal|rangpur|cumilla|savar|mirpur|motijheel|uttara|bangladesh|bd)\b/i.test(originalMessage) ||
    /ঢাকা|চট্টগ্রাম|গাজীপুর|নারায়ণগঞ্জ|সিলেট|খুলনা|রাজশাহী|বরিশাল|রংপুর|কুমিল্লা|সাভার|মিরপুর|মতিঝিল|উত্তরা|বাংলাদেশ/u.test(originalMessage);

  const mentionsTradeContext =
    /\b(import|export|from|supplier|goods|products?|raw\s+materials?)\b/i.test(originalMessage) ||
    /আমদানি|রপ্তানি|সাপ্লায়ার|পণ্য|মাল|কিনি|বিক্রি/u.test(originalMessage);

  const isExplicitForeignWorkplace =
    /\b(worked\s+in|working\s+in|company\s+in|office\s+in|employed\s+in|job\s+in)\s+(india|kolkata|delhi|mumbai|pakistan|london|dubai|usa|uk)\b/i.test(originalMessage) ||
    /(ভারতে|কলকাতায়|দিল্লিতে|পাকিস্তানে|লন্ডনে|দুবাইয়ে)\s*(চাকরি|কাজ|কর্মস্থল)/u.test(originalMessage);

  const foreignMention = /\b(india|kolkata|delhi|mumbai|pakistan|london|dubai|usa|uk)\b|ভারত|কলকাতা|দিল্লি/i.test(originalMessage);

  const outside = isExplicitForeignWorkplace || (foreignMention && !mentionsBangladeshLoc && !mentionsTradeContext);

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
            ? 'MyLaws শুধুমাত্র বাংলাদেশের ভৌগোলিক এলাকার মধ্যে সংঘটিত ঘটনার জন্য প্রযোজ্য আইনের তথ্য প্রদান করে। বিদেশের কর্মস্থল বা ঘটনার ক্ষেত্রে সংশ্লিষ্ট দেশের আইন প্রযোজ্য।'
            : 'MyLaws only covers Bangladesh legal information. For incidents occurring outside Bangladesh, foreign jurisdictions apply.',
          sourceIds: [],
        },
      ],
      limitations: [
        isBn
          ? 'এই সিস্টেমে শুধুমাত্র বাংলাদেশের ৬টি প্রধান আইন ও বিধির নির্বাচিত অংশ অন্তর্ভুক্ত রয়েছে।'
          : 'This system is restricted to verified Bangladesh statutory instruments.',
      ],
      sourcePackVersion: SOURCE_VERSION,
      allowedDraftOptions: [],
    };
  }

  // Detect specific topics
  const hasWorkFacts = request.facts.some((f) => f.fieldId === 'employment' || f.fieldId === 'workplace');
  const isWork = isWorkQuestion(originalMessage) || hasWorkFacts;
  const isGd = isGdQuestion(originalMessage);
  const isConsumer = isConsumerQuestion(originalMessage);

  // -------------------------------------------------------------
  // DOMAIN 1: WORKPLACE & UNPAID WAGES
  // -------------------------------------------------------------
  if (isWork) {
    const workplaceFact = request.facts.find((f) => f.fieldId === 'workplace' && f.value.trim().length > 0);
    const employmentFact = request.facts.find(
      (f) => f.fieldId === 'employment' && ['private', 'epz', 'public'].includes(f.value.toLowerCase())
    );

    const hasWorkplace = Boolean(workplaceFact);
    const hasEmployment = Boolean(employmentFact);

    // If material facts are missing, ask typed clarification questions
    if (!hasWorkplace || !hasEmployment) {
      const clarificationQuestions: ClarificationQuestion[] = [];
      const questions: string[] = [];

      if (!hasWorkplace) {
        const qText = isBn
          ? 'কর্মস্থলটি কোন জেলা ও উপজেলায় অবস্থিত ছিল? (সঠিক ঠিকানা না দিয়ে এলাকা জানালেই হবে)'
          : 'Which district and upazila was the workplace located in? (Exact address is not necessary)';
        questions.push(qText);
        clarificationQuestions.push({
          id: 'clarify-workplace',
          fieldId: 'workplace',
          question: {
            bn: 'কর্মস্থলটি কোন জেলা ও উপজেলায় অবস্থিত ছিল?',
            en: 'Which district and upazila was the workplace located in?',
          },
          importance: {
            bn: 'সঠিক আঞ্চলিক শ্রম পরিদর্শক দপ্তর (DIFE) ও আঞ্চলিক এখতিয়ার নির্ধারণের জন্য কর্মস্থলের জেলা প্রয়োজন।',
            en: 'Workplace district is necessary to determine regional DIFE inspectorate jurisdiction.',
          },
          answerType: 'text',
        });
      }

      if (!hasEmployment) {
        const qText = isBn
          ? 'চাকরিটি কি বেসরকারি প্রতিষ্ঠান, ইপিজেড (EPZ), নাকি সরকারি প্রতিষ্ঠানে ছিল?'
          : 'Was the employment in a private enterprise, an Export Processing Zone (EPZ), or government service?';
        questions.push(qText);
        clarificationQuestions.push({
          id: 'clarify-employment',
          fieldId: 'employment',
          question: {
            bn: 'চাকরিটি কি বেসরকারি প্রতিষ্ঠান, ইপিজেড (EPZ), নাকি সরকারি প্রতিষ্ঠানে ছিল?',
            en: 'Was the employment in a private enterprise, an Export Processing Zone (EPZ), or government service?',
          },
          importance: {
            bn: 'বাংলাদেশ শ্রম আইন ২০০৬ বেসরকারি প্রতিষ্ঠানে প্রযোজ্য; ইপিজেড বা সরকারি চাকরিতে ভিন্ন আইন ও কর্তৃপক্ষ কার্যকর।',
            en: 'Bangladesh Labour Act 2006 applies to private establishments; EPZ or government employment follows separate legal frameworks.',
          },
          answerType: 'choice',
          options: [
            { label: { bn: 'বেসরকারি প্রতিষ্ঠান / কারখানা / দোকান', en: 'Private enterprise / shop / factory' }, value: 'private' },
            { label: { bn: 'ইপিজেড (EPZ) এলাকার কারখানা', en: 'Export Processing Zone (EPZ)' }, value: 'epz' },
            { label: { bn: 'সরকারি / স্বায়ত্তশাসিত প্রতিষ্ঠান', en: 'Government service' }, value: 'public' },
          ],
        });
      }

      const safeChecklist: ChecklistStep[] = [
        {
          id: 'step-wage-preserve-1',
          text: isBn
            ? 'নিয়োগ সংক্রান্ত নথিপত্র এবং পরিচয়পত্র (ID card), উপস্থিতি রেকর্ড বা পে-স্লিপ আলাদা করুন।'
            : 'Safeguard your employment records, photo ID, attendance card, or payslips.',
          sourceIds: ['labour-5'],
          condition: isBn ? 'আপনার হেফাজতে থাকা বৈধ নথির কপি রাখুন' : 'Retain records already lawfully in your custody',
          requiredDocuments: isBn ? ['নিয়োগপত্র বা কাজের প্রমাণ', 'বকেয়া হিসাব'] : ['Appointment letter or proof of work', 'Wage calculation'],
        },
        {
          id: 'step-wage-preserve-2',
          text: isBn
            ? 'আইন অনুযায়ী মজুরি পরিশোধের সময়সীমা পার হয়েছে কি না নিশ্চিত হোন (মজুরিকাল শেষের ৭ কার্যদিবস অথবা চাকরি শেষের ৩০ কার্যদিবস)।'
            : 'Confirm whether the statutory payment deadline has lapsed (7 working days after wage period, or 30 working days upon termination).',
          sourceIds: ['labour-123'],
          condition: isBn ? 'ধারা ১২৩ এর সময়সীমা প্রযোজ্য' : 'Statutory time limits under Section 123 apply',
        },
        {
          id: 'step-wage-preserve-3',
          text: isBn
            ? 'কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর (DIFE) অথবা জাতীয় আইনি সহায়তা হেল্পলাইনে (১৬৬৯৯) যোগাযোগ করে আপনার এলাকার এখতিয়ার যাচাই করুন।'
            : 'Contact the DIFE inspectorate or National Legal Aid (16699) to verify regional jurisdiction.',
          sourceIds: ['labour-124a', 'constitution-27'],
          officeId: difeOffice.id,
        },
      ];

      return {
        schemaVersion: 1,
        answerId: request.requestId,
        mode,
        status: 'clarifying',
        questions,
        clarificationQuestions,
        userFacts: [
          ...request.facts,
          {
            fieldId: 'issue_type',
            value: 'unpaid_wages',
            status: 'inferred',
            provenance: 'intent_classification',
          },
        ],
        checklist: safeChecklist,
        explanation: [
          {
            text: isBn
              ? 'বাংলাদেশ শ্রম আইন, ২০০৬-এর ধারা ১২৩ অনুযায়ী নিয়মিত মজুরি মজুরিকাল শেষ হওয়ার পরবর্তী ৭ কার্যদিবসের মধ্যে পরিশোধ বাধ্যতামূলক।'
              : 'Under Section 123 of the Bangladesh Labour Act 2006, wages must be paid within 7 working days following the end of the wage period.',
            sourceIds: ['labour-123'],
          },
          {
            text: isBn
              ? 'বকেয়া বা কর্তিত মজুরির জন্য ধারা ১২৪ক অনুযায়ী শ্রম পরিদর্শকের নিকট আপসের আবেদন করা যায়, অথবা ধারা ১৩২ অনুযায়ী শ্রম আদালতে ১২ মাসের মধ্যে আবেদন করা যায়।'
              : 'For unpaid wages, a worker may seek conciliation via the Chief Inspector under Section 124A, or apply to the Labour Court within 12 months under Section 132.',
            sourceIds: ['labour-124a', 'labour-132'],
          },
        ],
        limitations: [
          isBn
            ? 'কর্মস্থলের ধরন ও এলাকা নিশ্চিত না হওয়া পর্যন্ত নির্দিষ্ট আঞ্চলিক দপ্তর বা প্রমিত খসড়া চূড়ান্ত করা সম্ভব নয়।'
            : 'Formal draft preparation and local authority referral require confirmed establishment type and district.',
        ],
        sourcePackVersion: SOURCE_VERSION,
        allowedDraftOptions: ['dife'],
        problemSummary: {
          identifiedIssue: isBn ? 'বকেয়া মজুরি ও শ্রম অধিকারের লঙ্ঘন' : 'Unpaid Wages & Statutory Labour Rights Violation',
          understanding: isBn
            ? 'আমরা আপনার অভিযোগটি বুঝতে পেরেছি। তবে সঠিক আইনের ধারা ও সংশ্লিষ্ট দপ্তর নির্ধারণে উপরের তথ্যগুলো প্রয়োজন।'
            : 'We understand your inquiry. To determine the exact legal path and authority, the details above are required.',
          additionalInfoNeeded: questions,
        },
        plainLanguageExplanation: {
          heading: isBn
            ? 'বাংলাদেশ শ্রম আইন ২০০৬ ও বিধিবদ্ধ অধিকার'
            : 'Bangladesh Labour Act 2006 & Statutory Rights',
          meaning: isBn
            ? 'সহজ ভাষায় বলতে গেলে, মালিক চাইলেই আপনার বেতন অনির্দিষ্টকাল আটকে রাখতে পারেন না। আইন অনুযায়ী মজুরির মেয়াদ শেষ হওয়ার পরবর্তী ৭ কার্যদিবসের মধ্যে পুরো পাওনা পরিশোধ করা নিয়োগদাতার আইনি বাধ্যবাধকতা।'
            : 'In plain language, an employer cannot withhold your salary indefinitely. Under Section 123, full wages must be paid within 7 working days.',
          userRightsAndOptions: isBn
            ? [
                'কাজের বিনিময়ে অর্জিত মজুরি যথাসময়ে বুঝে পাওয়ার মৌলিক অধিকার।',
                'কলকারখানা পরিদর্শন অধিদপ্তরে (DIFE) লিখিত অভিযোগ বা মধ্যস্থতার আবেদন।',
              ]
            : [
                'Fundamental right to timely payment of earned wages.',
                'Right to seek conciliation and recovery before the designated statutory body.',
              ],
          whatToDoNext: isBn
            ? 'উপরে উল্লিখিত কর্মস্থলের তথ্যগুলো নির্বাচন করুন যাতে আমরা আপনার জন্য সুনির্দিষ্ট আইনি চেকলিস্ট তৈরি করতে পারি।'
            : 'Please specify your establishment details above so we can generate your precise action checklist.',
        },
        draftOffer: {
          prompt: isBn
            ? 'আপনি কি এই ঘটনার ভিত্তিতে কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর (DIFE) বরাবর লিখিত অভিযোগ খসড়া করতে চান?'
            : 'Would you like to prepare a formal written complaint to the DIFE Labour Inspector?',
          documentType: 'dife',
          documentTitle: isBn
            ? 'কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর (DIFE) বরাবর লিখিত অভিযোগ'
            : 'Formal Written Complaint to Inspector General of Labour (DIFE)',
          description: isBn
            ? 'MyLaws আপনার নিশ্চিত তথ্যের ভিত্তিতে শ্রম পরিদর্শক বরাবর দাখিলযোগ্য একটি প্রমিত অভিযোগপত্র তৈরি করবে। বাকি বিবরণ সরাসরি সম্পাদনা করে A4 PDF ডাউনলোড করতে পারবেন।'
            : 'MyLaws will generate a structured written complaint addressed to the Labour Inspector, exportable as an A4 PDF.',
          missingDetails: questions,
        },
      };
    }

    const empType = employmentFact?.value.toLowerCase() || 'private';

    // SUB-PATH A: EPZ EMPLOYMENT
    if (empType === 'epz') {
      return {
        schemaVersion: 1,
        answerId: request.requestId,
        mode,
        status: 'completed',
        questions: [],
        userFacts: [
          ...request.facts,
          {
            fieldId: 'jurisdiction_framework',
            value: 'BEPZA_EPZ_Labour_Act_2019',
            status: 'user_confirmed',
            provenance: 'rule_routing',
          },
        ],
        checklist: [
          {
            id: 'step-epz-1',
            text: isBn
              ? 'নিয়োগপত্র, আইডি কার্ড, গেট পাস এবং বকেয়া মজুরির লিখিত হিসাব সংরক্ষণ করুন।'
              : 'Preserve appointment records, ID card, factory gate pass, and written arrears statement.',
            requiredDocuments: isBn ? ['ইপিজেড আইডি ও গেটপাস', 'বকেয়া হিসাব'] : ['EPZ ID & gate pass', 'Wage arrears calculation'],
          },
          {
            id: 'step-epz-2',
            text: isBn
              ? 'সংশ্লিষ্ট ইপিজেড-এর শিল্প সম্পর্ক বিভাগ (Industrial Relations Department) বা ইন্ডাস্ট্রিয়াল রিলেশনস কাউন্সিলর (IRC)-এর নিকট লিখিতভাবে অভিযোগ দাখিল করুন।'
              : 'Submit a written complaint to the Industrial Relations Department or Counsellor (IRC) of your respective EPZ.',
            condition: isBn ? 'ইপিজেড কর্তৃপক্ষ (BEPZA)-এর মধ্যস্থতা প্রযোজ্য' : 'BEPZA administrative conciliation applies',
          },
          {
            id: 'step-epz-3',
            text: isBn
              ? 'আপস ব্যর্থ হলে বা সহায়তা প্রয়োজন হলে জাতীয় আইনি সহায়তা হেল্পলাইনে (১৬৬৯৯) যোগাযোগ করে ইপিজেড শ্রম ট্রাইব্যুনাল সংক্রান্ত পরামর্শ নিন।'
              : 'Contact National Legal Aid (16699) for free counsel regarding the specialized EPZ Labour Tribunal.',
            officeId: nationalLegalAid.id,
            sourceIds: ['constitution-27'],
          },
        ],
        explanation: [
          {
            text: isBn
              ? 'বাংলাদেশ ইপিজেড শ্রম আইন, ২০১৯ অনুযায়ী রপ্তানি প্রক্রিয়াকরণ অঞ্চলের (EPZ) কারখানাগুলো সাধারণ শ্রম পরিদর্শকের (DIFE) পরিবর্তে বেপজা (BEPZA)-এর শিল্প সম্পর্ক শাখা ও ইপিজেড শ্রম ট্রাইব্যুনালের আওতাধীন।'
              : 'Under the Bangladesh EPZ Labour Act 2019, enterprises in Export Processing Zones fall under the regulatory authority of BEPZA Counsellors and the EPZ Labour Tribunal, rather than the general DIFE inspectorate.',
            sourceIds: [],
          },
        ],
        limitations: [
          isBn
            ? 'ইপিজেড এলাকার বিরোধে সাধারণ শ্রম পরিদর্শক (DIFE)-এর নিকট সাধারণ অভিযোগ প্রযোজ্য নয়; বেপজা কাউন্সেলরের নিকট আবেদন করতে হয়।'
            : 'General DIFE complaints do not apply to EPZ enterprises; applications must be made before BEPZA Counsellors.',
        ],
        sourcePackVersion: SOURCE_VERSION,
        allowedDraftOptions: [],
        problemSummary: {
          identifiedIssue: isBn ? 'ইপিজেড (EPZ) শ্রম অধিকার ও পাওনা' : 'EPZ Employment Rights & Wage Arrears',
          understanding: isBn
            ? 'আপনি ইপিজেড কারখানায় কর্মরত ছিলেন এবং বকেয়া মজুরি দাবি করছেন। ইপিজেড প্রতিষ্ঠানগুলোর ক্ষেত্রে বাংলাদেশ ইপিজেড শ্রম আইন ২০১৯ প্রযোজ্য।'
            : 'You were employed in an EPZ factory with wage arrears. EPZ establishments are governed by the specialized Bangladesh EPZ Labour Act 2019.',
          additionalInfoNeeded: [],
        },
        plainLanguageExplanation: {
          heading: isBn
            ? 'বাংলাদেশ ইপিজেড শ্রম আইন ২০১৯'
            : 'Bangladesh EPZ Labour Act 2019',
          meaning: isBn
            ? 'ইপিজেড প্রতিষ্ঠানের বিরুদ্ধে বকেয়া মজুরির জন্য সাধারণ শ্রম আদালতের পরিবর্তে সংশ্লিষ্ট ইপিজেডের জেনারেল ম্যানেজার (শিল্প সম্পর্ক) বা বেপজা কাউন্সেলরের নিকট আবেদন করতে হয়।'
            : 'For wage claims against EPZ enterprises, complaints must be submitted to the BEPZA Industrial Relations Department or Counsellor.',
          userRightsAndOptions: isBn
            ? [
                'ইপিজেড শ্রম আইন ২০১৯ অনুযায়ী বকেয়া মজুরি শতভাগ আদায়ের অধিকার।',
                'বেপজা (BEPZA) কাউন্সেলরের মাধ্যমে মধ্যস্থতা ও নিষ্পত্তির সুযোগ।',
              ]
            : [
                'Full statutory entitlement to recovered wage arrears under EPZ Labour Act 2019.',
                'Conciliation through BEPZA Industrial Relations Counsellors.',
              ],
          whatToDoNext: isBn
            ? 'আপনার নিয়োগ ও আইডি কার্ডের কপি নিয়ে সংশ্লিষ্ট ইপিজেড অফিসের শিল্প সম্পর্ক বিভাগে যোগাযোগ করুন।'
            : 'Approach your zone’s BEPZA Industrial Relations office.',
        },
      };
    }

    // SUB-PATH B: PUBLIC SERVICE
    if (empType === 'public') {
      return {
        schemaVersion: 1,
        answerId: request.requestId,
        mode,
        status: 'completed',
        questions: [],
        userFacts: [
          ...request.facts,
          {
            fieldId: 'jurisdiction_framework',
            value: 'Public_Service_Rules',
            status: 'user_confirmed',
            provenance: 'rule_routing',
          },
        ],
        checklist: [
          {
            id: 'step-pub-1',
            text: isBn
              ? 'নিয়োগ প্রজ্ঞাপন, পোস্টিং অর্ডার, পে-ফিক্সেশন ও বকেয়া বিল সংক্রান্ত অফিসিয়াল কপি সংরক্ষণ করুন।'
              : 'Preserve your gazette notification, posting order, pay-fixation, and pending bill records.',
            requiredDocuments: isBn ? ['নিয়োগ প্রজ্ঞাপন বা পোস্টিং কপি', 'বেতন ফিক্সেশন কপি'] : ['Gazette notification/posting copy', 'Pay fixation document'],
          },
          {
            id: 'step-pub-2',
            text: isBn
              ? 'বিভাগীয় নিয়ম অনুযায়ী ঊর্ধ্বতন কর্তৃপক্ষ বা হিসাবরক্ষণ কর্মকর্তা (CAO/DCAG) বরাবর লিখিত আবেদন বা বিভাগীয় আপিল দায়ের করুন।'
              : 'Submit a departmental appeal or written representation to the competent authority or Chief Accounts Officer.',
          },
          {
            id: 'step-pub-3',
            text: isBn
              ? 'বিভাগীয় আপিল নিষ্পত্তিতে বিলম্ব হলে জাতীয় আইনি সহায়তা হেল্পলাইনে (১৬৬৯৯) যোগাযোগ করে প্রশাসনিক ট্রাইব্যুনাল সংক্রান্ত পরামর্শ নিন।'
              : 'Consult National Legal Aid (16699) regarding proceedings before the Administrative Tribunal under Act VII of 1980.',
            officeId: nationalLegalAid.id,
            sourceIds: ['constitution-27'],
          },
        ],
        explanation: [
          {
            text: isBn
              ? 'বাংলাদেশ শ্রম আইন, ২০০৬-এর ধারা ১(৪) অনুযায়ী সরকারি কর্মকর্তা-কর্মচারীরা সাধারণ শ্রম আইনের আওতা বহির্ভূত।'
              : 'Under Section 1(4) of the Bangladesh Labour Act 2006, civil servants and government employees are excluded from the Act.',
            sourceIds: [],
          },
        ],
        limitations: [
          isBn
            ? 'সরকারি চাকুরিজীবীদের ক্ষেত্রে কলকারখানা পরিদর্শন অধিদপ্তর (DIFE) বা সাধারণ শ্রম আদালতের কোনো এখতিয়ার নেই।'
            : 'The DIFE labour inspectorate and ordinary Labour Courts have no statutory jurisdiction over government civil service.',
        ],
        sourcePackVersion: SOURCE_VERSION,
        allowedDraftOptions: [],
        problemSummary: {
          identifiedIssue: isBn ? 'সরকারি চাকুরিজীবীদের চাকরি ও পাওনা বিধিমালা' : 'Civil Service Employment & Pay Regulations',
          understanding: isBn
            ? 'আপনি সরকারি বা স্বায়ত্তশাসিত প্রতিষ্ঠানে কর্মরত। সরকারি কর্মচারীদের পাওনা ও চাকরির বিরোধ সাধারণ শ্রম আইনের পরিবর্তে সরকারি চাকরি বিধিমালা দ্বারা নিয়ন্ত্রিত হয়।'
            : 'You are employed in government service. Civil service pay disputes fall under public service regulations and Administrative Tribunals.',
          additionalInfoNeeded: [],
        },
        plainLanguageExplanation: {
          heading: isBn
            ? 'বাংলাদেশ সংবিধান ও প্রশাসনিক ট্রাইব্যুনাল আইন ১৯৮০'
            : 'Constitution of Bangladesh & Administrative Tribunals Act 1980',
          meaning: isBn
            ? 'সরকারি কর্মকর্তা-কর্মচারীদের বকেয়া বেতন বা চাকরির বিরোধে সাধারণ শ্রম আদালতে যাওয়া যায় না। প্রথমে বিভাগীয় আবেদন করতে হয় এবং পরবর্তীতে প্রশাসনিক ট্রাইব্যুনালে প্রতিকার চাইতে হয়।'
            : 'Civil servants cannot approach ordinary Labour Courts. The prescribed path involves departmental representations followed by the Administrative Tribunal.',
          userRightsAndOptions: isBn
            ? [
                'বিভাগীয় নিয়ম অনুযায়ী নির্ধারিত বেতন ও ভাতাদি প্রাপ্তির অধিকার।',
                'প্রশাসনিক ট্রাইব্যুনালে আইনি প্রতিকার প্রার্থনার অধিকার।',
              ]
            : [
                'Entitlement to government-scale pay and allowances.',
                'Right to appeal before the Administrative Tribunal.',
              ],
          whatToDoNext: isBn
            ? 'আপনার নিয়োগ ও ফিক্সেশন কপি নিয়ে সংশ্লিষ্ট কর্তৃপক্ষের নিকট বিভাগীয় আবেদন দাখিল করুন।'
            : 'Submit a formal departmental representation with your service book and pay records.',
        },
      };
    }

    // SUB-PATH C: PRIVATE EMPLOYMENT (Labour Act 2006 Applies)
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
          ? `কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর (DIFE)-এর ${workplaceFact?.value || 'আঞ্চলিক'} শ্রম পরিদর্শক বরাবর লিখিত অভিযোগ বা আপসের আবেদন দাখিল করুন।`
          : `Prepare and submit a written complaint or conciliation application to the regional DIFE inspectorate of ${workplaceFact?.value || 'the area'}.`,
        sourceIds: ['labour-124a', 'labour-132'],
        officeId: difeOffice.id,
        condition: isBn ? 'সংশ্লিষ্ট এলাকার শ্রম পরিদর্শক দপ্তরে দাখিল প্রযোজ্য' : 'Submit to the relevant regional DIFE inspectorate',
      },
      {
        id: 'step-wage-4',
        text: isBn
          ? 'আপস ব্যর্থ হলে অথবা সরাসরি আইনি সহায়তার জন্য জাতীয় আইনি সহায়তা হেল্পলাইনে (১৬৬৯৯) যোগাযোগ করে শ্রম আদালতের প্যানেল আইনজীবীর সেবা নিন।'
          : 'If conciliation fails or for direct court assistance, call National Legal Aid (16699) for free panel attorney services at the Labour Court.',
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
          ? 'ধারা ৫ অনুযায়ী নিয়োগকারীকে লিখিত নিয়োগপত্র ও ছবিসহ পরিচয়পত্র প্রদান করতে হয়। নিয়োগপত্র না থাকলেও অন্যান্য দালিলিক সাক্ষ্য-প্রমাণ দিয়ে চাকরি প্রমাণ করা সম্ভব।'
          : 'Section 5 mandates that employers issue an appointment letter and identity card. Even in its absence, circumstantial evidence may establish employment.',
        sourceIds: ['labour-5'],
      },
    ];

    return {
      schemaVersion: 1,
      answerId: request.requestId,
      mode,
      status: 'completed',
      questions: [],
      userFacts: [
        ...request.facts,
        {
          fieldId: 'issue_type',
          value: 'unpaid_wages',
          status: 'user_confirmed',
          provenance: 'intent_classification',
        },
      ],
      checklist,
      explanation,
      limitations: [
        isBn
          ? 'ধারা ১৩২ অনুযায়ী মজুরি পরিশোধের নির্ধারিত সময়সীমা পার হওয়ার ১২ মাসের মধ্যে শ্রম আদালতে আবেদন করতে হয়।'
          : 'Under Section 132, applications to the Labour Court must be presented within 12 months from the date of default.',
        isBn
          ? 'এটি কেবল তথ্য ও প্রস্তুতির সহায়তা; কোনো আইনজীবী বা সরকারি কর্মকর্তার আনুষ্ঠানিক আদেশ নয়।'
          : 'This is an information and preparation aid, not official legal advice or court decree.',
      ],
      sourcePackVersion: SOURCE_VERSION,
      allowedDraftOptions: ['dife'],
      problemSummary: {
        identifiedIssue: isBn ? 'বকেয়া মজুরি ও শ্রম অধিকারের লঙ্ঘন' : 'Unpaid Wages & Statutory Labour Rights Violation',
        understanding: isBn
          ? 'আমরা আপনার পরিস্থিতিটি যত্নসহকারে বিশ্লেষণ করেছি: আপনি কর্মস্থলে শ্রম দেওয়ার পর নির্ধারিত সময়ে আপনার বকেয়া মজুরি পাননি। এটি বাংলাদেশ শ্রম আইন অনুযায়ী একটি মৌলিক অধিকারের লঙ্ঘন এবং আপনি আপনার সম্পূর্ণ পাওনা আদায়ে আইনি পদক্ষেপ নেওয়ার পূর্ণ অধিকারী।'
          : 'We have analyzed your situation: you have rendered work but your employer has failed to pay your wages on time. Under the Bangladesh Labour Act 2006, this is an actionable violation.',
        additionalInfoNeeded: [],
      },
      plainLanguageExplanation: {
        heading: isBn
          ? 'বাংলাদেশ শ্রম আইন ২০০৬ (ধারা ১২৩, ১২৪ক ও ১৩২)'
          : 'Bangladesh Labour Act 2006 (Sections 123, 124A & 132)',
        meaning: isBn
          ? 'সহজ ভাষায় বলতে গেলে, মালিক চাইলেই আপনার বেতন অনির্দিষ্টকাল আটকে রাখতে পারেন না। আইন অনুযায়ী মজুরির মেয়াদ শেষ হওয়ার পরবর্তী ৭ কার্যদিবসের মধ্যে পুরো পাওনা পরিশোধ করা নিয়োগদাতার আইনি বাধ্যবাধকতা। বকেয়া রাখা আইনত সম্পূর্ণ বেআইনি।'
          : 'In plain language, an employer cannot withhold your salary indefinitely. Under Section 123 of the Bangladesh Labour Act, full wages must be paid within 7 working days following the end of the wage period.',
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
          ? 'প্রথমেই আপনার কাজের প্রমাণাদি (যেমন নিয়োগপত্র, আইডি কার্ড, মেসেজ, বেতন স্লিপ) গুছিয়ে রাখুন এবং নিচের চেকলিস্টের ধাপগুলো ধারাবাহিকভাবে অনুসরণ করুন।'
          : 'First safeguard your records of employment (appointment letter, ID card, payslips) and proceed through the action checklist below.'
      },
      draftOffer: {
        prompt: isBn
          ? 'আপনি কি এই ঘটনার ভিত্তিতে কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর (DIFE) বরাবর একটি আনুষ্ঠানিক লিখিত অভিযোগ খসড়া প্রস্তুত করতে চান?'
          : 'Would you like to prepare a formal complaint addressed to the DIFE Labour Inspector?',
        documentType: 'dife',
        documentTitle: isBn
          ? 'কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর (DIFE) বরাবর লিখিত অভিযোগ'
          : 'Formal Written Complaint to Inspector General of Labour (DIFE)',
        description: isBn
          ? 'MyLaws আপনার নিশ্চিত তথ্যের ভিত্তিতে শ্রম পরিদর্শক বরাবর দাখিলযোগ্য একটি প্রমিত অভিযোগপত্র তৈরি করবে। আপনি সরাসরি সম্পাদনা করে প্রিন্ট-রেডি A4 PDF ডাউনলোড করতে পারবেন।'
          : 'MyLaws will generate a structured written complaint addressed to the Labour Inspector, exportable as an A4 PDF.',
        missingDetails: isBn
          ? ['মালিক বা প্রতিষ্ঠানের সুনির্দিষ্ট নাম ও ঠিকানা', 'বকেয়া মাসের সুনির্দিষ্ট তালিকা ও টাকার পরিমাণ']
          : ['Employer/company name & address', 'Specific list of unpaid months and amount']
      }
    };
  }

  // -------------------------------------------------------------
  // DOMAIN 2: CONSUMER FRAUD & DELIVERY DISPUTES (DNCRP Act 2009)
  // -------------------------------------------------------------
  if (isConsumer) {
    const hasOrderDate = request.facts.some((f) => f.fieldId === 'order_date' && f.value.trim().length > 0);
    const hasVendor = request.facts.some((f) => f.fieldId === 'vendor' && f.value.trim().length > 0);

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
          ? 'জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তর (DNCRP হটলাইন ১৬১২১) বরাবর লিখিত অভিযোগ বা ইমেইল দাখিল করুন।'
          : 'Lodge a formal written complaint before the Directorate of National Consumer Rights Protection (DNCRP 16121).',
        sourceIds: ['consumer-40', 'consumer-44', 'consumer-45'],
        officeId: dncrpOffice.id,
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

    const clarificationQuestions: ClarificationQuestion[] = [];
    const questions: string[] = [];

    if (!hasOrderDate) {
      const qText = isBn
        ? 'লেনদেন বা পণ্য অর্ডারের তারিখটি কবে ছিল? (ভোক্তা অধিকার সংরক্ষণ আইনের ধারা ৬০ অনুযায়ী ৩০ দিনের সময়সীমা রয়েছে)'
        : 'When did the transaction take place? (A 30-day statutory limitation period applies under Section 60)';
      questions.push(qText);
      clarificationQuestions.push({
        id: 'clarify-consumer-date',
        fieldId: 'order_date',
        question: {
          bn: 'লেনদেন বা পণ্য অর্ডারের তারিখটি কবে ছিল?',
          en: 'When did the transaction take place?',
        },
        importance: {
          bn: 'ভোক্তা অধিকার সংরক্ষণ আইনের ধারা ৬০ অনুযায়ী কারণ উদ্ভব হওয়ার ৩০ কার্যদিবসের মধ্যে অভিযোগ দায়ের বাধ্যতামূলক।',
          en: 'Under Section 60, consumer complaints must be lodged within 30 days of the cause of action.',
        },
        answerType: 'date',
      });
    }

    if (!hasVendor) {
      const qText = isBn
        ? 'বিক্রেতা বা অনলাইন শপটির নাম ও যোগাযোগের মাধ্যম জানা আছে কি?'
        : 'Is the name and contact details of the vendor or online shop available?';
      questions.push(qText);
      clarificationQuestions.push({
        id: 'clarify-consumer-vendor',
        fieldId: 'vendor',
        question: {
          bn: 'বিক্রেতা বা অনলাইন শপটির নাম ও যোগাযোগের মাধ্যম জানা আছে কি?',
          en: 'Is the name and contact details of the vendor or online shop available?',
        },
        importance: {
          bn: 'অভিযোগের নোটিশ ও শুনানির সমন জারির জন্য বিক্রেতার তথ্য প্রয়োজন।',
          en: 'Vendor details are required for issuing statutory notices and hearings.',
        },
        answerType: 'text',
      });
    }

    return {
      schemaVersion: 1,
      answerId: request.requestId,
      mode,
      status: questions.length > 0 ? 'clarifying' : 'completed',
      questions,
      clarificationQuestions,
      userFacts: [
        ...request.facts,
        {
          fieldId: 'issue_type',
          value: 'consumer_fraud',
          status: questions.length > 0 ? 'inferred' : 'user_confirmed',
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
      problemSummary: {
        identifiedIssue: isBn ? 'ভোক্তা অধিকার লঙ্ঘন ও অনলাইন ডেলিভারি প্রতারণা' : 'Consumer Rights Violation & Commercial Deception',
        understanding: isBn
          ? 'আমরা আপনার বিষয়টি যত্নসহকারে পর্যালোচনা করেছি: আপনি অর্থ পরিশোধের পরও প্রতিশ্রুত পণ্য পাননি অথবা প্রতারণার শিকার হয়েছেন। ভোক্তা অধিকার সংরক্ষণ আইন, ২০০৯ অনুযায়ী ক্রেতা হিসেবে আপনি সম্পূর্ণ সুরক্ষিত এবং ক্ষতিপূরণ পাওয়ার অধিকারী।'
          : 'We have reviewed your situation: you have paid for goods that were not delivered as agreed. Under the Consumers’ Right Protection Act 2009, you are legally entitled to remedies and statutory compensation.',
        additionalInfoNeeded: questions,
      },
      plainLanguageExplanation: {
        heading: isBn
          ? 'ভোক্তা অধিকার সংরক্ষণ আইন ২০০৯ (ধারা ৪৫ ও ৬০)'
          : 'Consumers’ Right Protection Act 2009 (Sections 45 & 60)',
        meaning: isBn
          ? 'সহজ কথায়, অগ্রিম টাকা নিয়ে পণ্য না দেওয়া বা ক্রেতাকে মিথ্যা তথ্য দিয়ে প্রলুব্ধ করা বাংলাদেশে আইনত দণ্ডনীয় অপরাধ। ঘটনার ৩০ দিনের মধ্যে ভোক্তা অধিকার অধিদপ্তরে অভিযোগ দাখিল করলে সরকার তদন্ত করে বিক্রেতাকে জরিমানা করবে এবং সেই জরিমানার ২৫% অর্থ সরাসরি আপনাকে নগদ ক্ষতিপূরণ দেওয়া হবে।'
          : 'In plain language, taking payment without delivering goods is unlawful. When filed within 30 days, the authorities investigate, penalize the seller, and pay 25% of the fine directly to you as statutory compensation.',
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
          : 'Safeguard your transaction receipts and invoices, and prepare your complaint within the 30-day statutory window.'
      },
      draftOffer: {
        prompt: isBn
          ? 'আপনি কি এই ঘটনার ভিত্তিতে জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তর (DNCRP) বরাবর একটি আনুষ্ঠানিক লিখিত অভিযোগ খসড়া প্রস্তুত করতে চান?'
          : 'Would you like to prepare a formal complaint addressed to the Directorate of National Consumer Rights Protection (DNCRP)?',
        documentType: 'dncrp',
        documentTitle: isBn
          ? 'জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তর (DNCRP) বরাবর লিখিত অভিযোগ'
          : 'Written Complaint to National Consumer Rights Protection (DNCRP)',
        description: isBn
          ? 'MyLaws আপনার নিশ্চিত তথ্যের ভিত্তিতে ভোক্তা অধিকার সংরক্ষণ অধিদপ্তর বরাবর দাখিলযোগ্য একটি প্রমিত অভিযোগপত্র তৈরি করবে। আপনি বাংলায় সরাসরি সম্পাদনা করে প্রিন্ট-রেডি A4 PDF ডাউনলোড করতে পারবেন।'
          : 'MyLaws will generate a structured complaint addressed to the Consumer Rights Directorate, exportable as an A4 PDF.',
        missingDetails: isBn
          ? ['বিক্রেতা বা প্রতিষ্ঠানের নাম ও যোগাযোগের মাধ্যম', 'লেনদেন বা অর্ডারের তারিখ ও রসিদ নম্বর']
          : ['Vendor/shop name and contact details', 'Transaction date and receipt/order ID']
      }
    };
  }

  // -------------------------------------------------------------
  // DOMAIN 3: THREATS, HARASSMENT, ASSAULT, THEFT & POLICE GD/FIR
  // -------------------------------------------------------------
  if (isGd) {
    const priorIssue = request.facts.find((f) => f.fieldId === 'issue_type')?.value;
    const historyText = request.conversationHistory?.map((m) => m.content).join(' ') || '';
    const combinedMsg = `${historyText} ${originalMessage}`;

    const isAssault =
      isAssaultOrInjuryQuestion(originalMessage) ||
      priorIssue === 'police_fir_assault' ||
      (isAssaultOrInjuryQuestion(combinedMsg) && !isTheftOrLossQuestion(originalMessage));

    const isTheft =
      !isAssault &&
      (isTheftOrLossQuestion(originalMessage) ||
        (priorIssue?.includes('theft') ?? false) ||
        isTheftOrLossQuestion(combinedMsg));

    const isVehicleTheft =
      isTheft &&
      (/\b(bike|motorbike|motorcycle|scooter|gari|car|cycle|bicycle|cng|বাইক|মোটরসাইকেল|গাড়ি|স্কুটার|সাইকেল|যানবাহন)\b/i.test(combinedMsg) ||
        priorIssue === 'police_gd_vehicle_theft');

    const isShopTheft =
      isTheft &&
      !isVehicleTheft &&
      (/\b(dokan|shop|store|maal|goods|inventory|bazar|market|ব্যবসা|দোকান|মালামাল|মাল|গুদাম)\b/i.test(combinedMsg) ||
        priorIssue === 'police_fir_shop_theft');

    const isMobileTheft =
      isTheft &&
      !isVehicleTheft &&
      !isShopTheft &&
      (/\b(mobile|phone|handset|imei|sim|মোবাইল|ফোন|হ্যান্ডসেট|সিম)\b/i.test(combinedMsg) ||
        priorIssue === 'police_gd_theft');

    let placeFact = request.facts.find((f) => f.fieldId === 'place' && f.value.trim().length > 0);
    let dateFact = request.facts.find((f) => f.fieldId === 'incident_date' && f.value.trim().length > 0);

    // Check request.location / request.date if not already in facts
    if (!placeFact && request.location && request.location.trim().length > 0) {
      placeFact = {
        fieldId: 'place',
        value: request.location.trim(),
        status: 'user_reported',
        provenance: 'request_location',
      };
      request.facts.push(placeFact);
    }

    if (!dateFact && request.date && request.date.trim().length > 0) {
      dateFact = {
        fieldId: 'incident_date',
        value: request.date.trim(),
        status: 'user_reported',
        provenance: 'request_date',
      };
      request.facts.push(dateFact);
    }

    // Auto-extract common date/time mentions from text if still missing
    if (!dateFact) {
      const timeMatch = originalMessage.match(
        /\b(?:today|yesterday|tonight|this morning|last night|আজ|গতকাল|গতরাত|কালকে\s*রাতে|রাতে)(?:\s+(?:at\s+)?\d{1,2}(?::\d{2})?\s*(?:am|pm|ঘণ্টায়|টায়)?)?/i
      );
      if (timeMatch) {
        dateFact = {
          fieldId: 'incident_date',
          value: timeMatch[0].trim(),
          status: 'inferred',
          provenance: 'text_extraction',
        };
        request.facts.push(dateFact);
      }
    }

    const hasPlace = Boolean(placeFact);
    const hasDate = Boolean(dateFact);

    const checklist: ChecklistStep[] = isAssault
      ? [
          {
            id: 'step-assault-1',
            text: isBn
              ? 'অবিলম্বে নিকটস্থ সরকারি হাসপাতাল বা উপজেলা স্বাস্থ্য কমপ্লেক্সে জরুরি চিকিৎসা গ্রহণ করুন এবং চিকিৎসকের ইনজুরি সার্টিফিকেট (জখমী সনদ) সংগ্রহ করুন।'
              : 'Immediately seek treatment at the nearest government hospital/Upazila Health Complex and secure a certified Medical Injury Report.',
            sourceIds: ['penal-323'],
            condition: isBn ? 'ডাক্তারী জখমী সনদ মামলার প্রধান সাক্ষ্য-প্রমাণ' : 'Medical Injury Certificate is primary prosecution evidence',
            requiredDocuments: isBn ? ['হাসপাতালের জরুরি প্রেসক্রিপশন ও চিকিৎসার রসিদ', 'চিকিৎসকের অফিসিয়াল ইনজুরি সার্টিফিকেট'] : ['Hospital emergency prescription & receipt', 'Certified Medical Injury Report'],
            helpfulEvidence: isBn ? ['আঘাত ও ক্ষতের স্পষ্ট ছবি', 'রক্তাক্ত কাপড় ও ক্ষতের বিবরণ'] : ['Clear photos of wounds', 'Preserved bloodstained clothes'],
          },
          {
            id: 'step-assault-2',
            text: isBn
              ? 'আক্রমণকারী যদি আশেপাশে থাকে বা পুনরায় কোনো শারীরিক বিপদের আশঙ্কা থাকে, তবে তাৎক্ষণিক জাতীয় জরুরি সেবা ৯৯৯ নম্বরে ফোন দিয়ে পুলিশি সুরক্ষা নিন।'
              : 'If the assailant poses ongoing danger or remains nearby, call the 999 National Emergency Service for immediate police protection.',
            condition: isBn ? 'তাৎক্ষণিক জীবনের নিরাপত্তা' : 'Immediate personal security',
          },
          {
            id: 'step-assault-3',
            text: isBn
              ? 'সংশ্লিষ্ট এলাকার থানার ভারপ্রাপ্ত কর্মকর্তা (OC) বরাবর ফৌজদারি কার্যবিধির ১৫৪ ধারা অনুযায়ী নিয়মিত এজাহার (FIR) দায়ের করুন।'
              : 'Lodge a formal First Information Report (FIR) under CrPC Section 154 addressed to the Officer-in-Charge (OC) of the local police station.',
            sourceIds: ['penal-323', 'police-44-gd'],
            officeId: policeGdOffice.id,
          },
          {
            id: 'step-assault-4',
            text: isBn
              ? 'আক্রমণকারীর পরিচয়, ব্যবহৃত অস্ত্রের বিবরণ ও প্রত্যক্ষদর্শীদের সাক্ষ্য থানা তদন্তকারী কর্মকর্তার (IO) নিকট লিপিবদ্ধ নিশ্চিত করুন।'
              : 'Provide assailant details, weapon description, and witness contacts to the police investigation officer for prompt arrest.',
            sourceIds: ['police-44-gd'],
            officeId: policeGdOffice.id,
          },
        ]
      : isShopTheft
      ? [
          {
            id: 'step-shop-1',
            text: isBn
              ? 'চুরি হওয়া সকল মালামালের সুনির্দিষ্ট তালিকা, ব্র্যান্ড, পরিমাণ ও আনুমানিক মূল্যের হিসাব ক্যাশ মেমো/ভাউচারসহ প্রস্তুত করুন।'
              : 'Compile an itemized list of all stolen goods, brands, quantities, and approximate valuations supported by cash memos/invoices.',
            sourceIds: ['penal-380'],
            condition: isBn ? 'ক্ষতির সুনির্দিষ্ট পরিমাণ নির্ধারণ' : 'Itemized valuation of loss required',
            requiredDocuments: isBn
              ? ['দোকানের ট্রেড লাইসেন্স বা বরাদ্দপত্র', 'চুরি হওয়া মালের ক্রয় রসিদ বা ইনভেন্টরি লগ', 'জাতীয় পরিচয়পত্র (NID)']
              : ['Shop trade license or tenancy deed', 'Purchase invoices or inventory stock log', 'National ID (NID)'],
            helpfulEvidence: isBn
              ? ['সিসিটিভি ক্যামেরার ভিডিও ফুটেজ (পেনড্রাইভে সংরক্ষিত)', 'তালা ভাঙা বা কাটার স্পষ্ট ছবি', 'দোকানের কর্মচারী বা প্রতিবেশীদের সাক্ষ্য']
              : ['CCTV camera footage on pen drive', 'Clear photos of broken locks or forced entry', 'Witness contact details'],
          },
          {
            id: 'step-shop-2',
            text: isBn
              ? 'দোকান ও ব্যবসা প্রতিষ্ঠানের সিসিটিভি ফুটেজ তাৎক্ষণিকভাবে পেনড্রাইভে ব্যাকআপ নিন এবং ঘটনার স্থান অবিকৃত রাখুন।'
              : 'Immediately backup shop CCTV footage onto a pen drive and preserve physical crime scene evidence.',
            sourceIds: ['police-44-gd'],
            condition: isBn ? 'ডিজিটাল ও পারিপার্শ্বিক প্রমাণ সংরক্ষণ' : 'Digital and forensic evidence preservation',
          },
          {
            id: 'step-shop-3',
            text: isBn
              ? 'সংশ্লিষ্ট এলাকার থানার ভারপ্রাপ্ত কর্মকর্তা (OC) বরাবর দণ্ডবিধির ৩৮০ ধারায় নিয়মিত ফৌজদারি এজাহার (FIR) বা সাধারণ ডায়েরি দাখিল করুন।'
              : 'Lodge a formal First Information Report (FIR) under Section 380 of the Penal Code addressed to the local Thana Officer-in-Charge (OC).',
            sourceIds: ['penal-380', 'police-44-gd'],
            officeId: policeGdOffice.id,
          },
          {
            id: 'step-shop-4',
            text: isBn
              ? 'থানা পুলিশ মামলা গ্রহণে কালক্ষেপণ করলে সার্কেল এএসপি বরাবরে লিখিত অভিযোগ বা সিআর মামলা (CrPC 156(3)) দায়ের করার প্রস্তুতি রাখুন।'
              : 'If Thana delays case registration, escalate to the Circle ASP or file a direct CR complaint under CrPC Section 156(3).',
            sourceIds: ['police-44-gd'],
            officeId: nationalLegalAid.id,
          },
        ]
      : isVehicleTheft
      ? [
          {
            id: 'step-vehicle-1',
            text: isBn
              ? 'বাইকের বিআরটিএ রেজিস্ট্রেশন সনদ (Smart Card বা Blue Book), ইঞ্জিন নম্বর, চেসিস নম্বর এবং ট্যাক্স টোকেন এক জায়গায় গুছিয়ে নিন।'
              : 'Collect your BRTA Vehicle Registration Certificate (Smart Card / Blue Book), Engine Number, Chassis Number, and Tax Token.',
            sourceIds: ['penal-379'],
            condition: isBn ? 'গাড়ির সুনির্দিষ্ট পরিচয় ও মালিকানা প্রমাণ' : 'Proof of vehicle ownership and identification numbers',
            requiredDocuments: isBn
              ? ['বিআরটিএ রেজিস্ট্রেশন সার্টিফিকেট / ব্লু-বুক', 'ইঞ্জিন ও চেসিস নম্বর সম্বলিত কর টোকেন / রসিদ', 'জাতীয় পরিচয়পত্র (NID)']
              : ['BRTA Registration Smart Card / Blue Book', 'Tax token with Engine & Chassis numbers', 'National ID (NID)'],
            helpfulEvidence: isBn
              ? ['বাইক ক্রয়ের রসিদ বা শোরুম ক্যাশ মেমো', 'বাইকের স্পষ্ট ছবি (রঙ ও শনাক্তকরণ চিহ্ন)']
              : ['Original sales receipt / invoice', 'Clear photograph of the motorbike'],
          },
          {
            id: 'step-vehicle-2',
            text: isBn
              ? 'চুরির স্থান (রাস্তা, গ্যারেজ বা বাজার) ও আশপাশের সিসিটিভি ক্যামেরা ফুটেজ দ্রুত সংগ্রহ ও পেনড্রাইভে ব্যাকআপ রাখুন।'
              : 'Immediately secure and backup CCTV camera footage covering the parking area or street on a pen drive.',
            sourceIds: ['police-44-gd'],
            condition: isBn ? 'চোর শনাক্তকরণ ও ঘটনার সময় প্রমাণ' : 'Forensic proof of incident timing and perpetrator identification',
            helpfulEvidence: isBn
              ? ['পার্কিংয়ের সিসিটিভি ভিডিও ক্লিপ (পেনড্রাইভে)', 'পার্কিং স্লিপ বা টিকিট (যদি থাকে)', 'প্রত্যক্ষদর্শীর বিবরণ']
              : ['CCTV clip on pen drive', 'Parking slip or token', 'Eyewitness accounts'],
          },
          {
            id: 'step-vehicle-3',
            text: isBn
              ? 'যে এলাকা থেকে বাইকটি চুরি হয়েছে, সেই এলাকার সংশ্লিষ্ট থানার ভারপ্রাপ্ত কর্মকর্তা (OC) বরাবর সাধারণ ডায়েরি (GD) বা নিয়মিত ফৌজদারি এজাহার (FIR) দায়ের করুন।'
              : 'Lodge a formal General Diary (GD) or First Information Report (FIR) addressed to the local Thana Officer-in-Charge (OC).',
            sourceIds: ['penal-379', 'police-44-gd'],
            officeId: policeGdOffice.id,
          },
          {
            id: 'step-vehicle-4',
            text: isBn
              ? 'থানার মাধ্যমে হাইওয়ে ও জেলা চেকপোস্টে তাৎক্ষণিক ওয়্যারলেস বার্তা (W/T alert) পাঠানো নিশ্চিত করুন এবং বিআরটিএ-তে জিডি কপি দিয়ে গাড়ির ডিজিটাল মালিকানা হস্তান্তর লক করার আবেদন দিন।'
              : 'Request Thana duty officers to broadcast an immediate highway checkpoint wireless alert (W/T), and submit the GD copy to BRTA to lock ownership transfer.',
            sourceIds: ['police-44-gd'],
            officeId: policeGdOffice.id,
          },
        ]
      : isMobileTheft
      ? [
          {
            id: 'step-theft-1',
            text: isBn
              ? 'ফোনের ক্রয় রসিদ বা বক্স থেকে ১৫ ডিজিটের আইএমইআই (IMEI) নম্বর, মডেল ও রঙের বিবরণ সংরক্ষণ করুন।'
              : 'Collect your 15-digit IMEI number, handset model, and brand details from the phone box or receipt.',
            sourceIds: ['penal-379'],
            condition: isBn ? 'ডিভাইসের সঠিক শনাক্তকরণ' : 'Handset identification details required',
            requiredDocuments: isBn ? ['ক্রয় মেমো বা ফোন বক্স', 'জাতীয় পরিচয়পত্র (NID)'] : ['Purchase receipt or phone box', 'National ID (NID)'],
          },
          {
            id: 'step-theft-2',
            text: isBn
              ? 'মোবাইল অপারেটরের হেল্পলাইনে (১২১) কল করে চুরি হওয়া সিম কার্ডটি সাময়িক বন্ধ (Bar/Deactivate) করুন।'
              : 'Call your mobile operator hotline (121) immediately to suspend the stolen SIM card and prevent unauthorized OTP access.',
            sourceIds: ['penal-379'],
            condition: isBn ? 'আর্থিক ও পরিচয় জালিয়াতি রোধ' : 'Prevent OTP and financial fraud',
          },
          {
            id: 'step-theft-3',
            text: isBn
              ? 'যে এলাকায় ফোনটি চুরি হয়েছে, সেই এলাকার সংশ্লিষ্ট থানার ভারপ্রাপ্ত কর্মকর্তা (OC) বরাবর সাধারণ ডায়েরি (GD) আবেদন জমা দিন।'
              : 'Lodge a formal General Diary (GD) application addressed to the Officer-in-Charge (OC) of the local police station.',
            sourceIds: ['police-44-gd'],
            officeId: policeGdOffice.id,
          },
          {
            id: 'step-theft-4',
            text: isBn
              ? 'জিডি নম্বর ও আইএমইআই বিবরণ থানা ডিউটি অফিসার ও সিআইডি সাইবার পুলিশ ইউনিটে প্রদান করে হ্যান্ডসেট ট্র্যাকিং নিশ্চিত করুন।'
              : 'Provide your recorded GD entry number and IMEI to the Thana investigation officer for electronic tracking and handset recovery.',
            sourceIds: ['police-44-gd'],
            officeId: policeGdOffice.id,
          },
        ]
      : isTheft
      ? [
          {
            id: 'step-prop-1',
            text: isBn
              ? 'চুরি হওয়া মালামালের সুনির্দিষ্ট তালিকা, ক্রয় রসিদ, সিরিয়াল নম্বর বা শনাক্তকরণ বিবরণ সংগ্রহ করুন।'
              : 'Compile a list of missing property, purchase receipts, serial numbers, and identifying marks.',
            sourceIds: ['penal-379'],
            condition: isBn ? 'সম্পত্তির সঠিক মালিকানা ও মূল্য নির্ধারণ' : 'Proof of ownership and property valuation',
            requiredDocuments: isBn ? ['ক্রয় রসিদ বা ভাউচার', 'জাতীয় পরিচয়পত্র (NID)'] : ['Purchase receipt or invoice', 'National ID (NID)'],
          },
          {
            id: 'step-prop-2',
            text: isBn
              ? 'ঘটনার স্থান ও সম্ভাব্য প্রত্যক্ষদর্শীদের সাক্ষ্য কিংবা আশপাশের সিসিটিভি ফুটেজ সংগ্রহ করে রাখুন।'
              : 'Preserve physical evidence, eyewitness details, and any nearby CCTV camera footage.',
            condition: isBn ? 'ঘটনার প্রামাণিক রেকর্ড সংরক্ষণ' : 'Preserve corroborating evidence',
          },
          {
            id: 'step-prop-3',
            text: isBn
              ? 'যে এলাকায় ঘটনাটি ঘটেছে, সেই এলাকার সংশ্লিষ্ট থানার ভারপ্রাপ্ত কর্মকর্তা (OC) বরাবর সাধারণ ডায়েরি (GD) বা এজাহার দায়ের করুন।'
              : 'Lodge a formal General Diary (GD) or FIR application addressed to the Officer-in-Charge (OC) of the local police station.',
            sourceIds: ['police-44-gd'],
            officeId: policeGdOffice.id,
          },
          {
            id: 'step-prop-4',
            text: isBn
              ? 'জিডি নম্বর সংগ্রহ করে থানার দায়িত্বপ্রাপ্ত তদন্তকারী কর্মকর্তার সাথে নিয়মিত যোগাযোগ বজায় রাখুন।'
              : 'Secure the recorded GD number and coordinate with the assigned investigation officer for recovery.',
            sourceIds: ['police-44-gd'],
            officeId: policeGdOffice.id,
          },
        ]
      : [
          {
            id: 'step-gd-1',
            text: isBn
              ? 'হুমকির ডিজিটাল প্রমাণাদি (কল রেকর্ডিং, এসএমএস, ফেসবুক মেসেঞ্জার বা হোয়াটসঅ্যাপের স্ক্রিনশট) নিরাপদে সংরক্ষণ ও ব্যাকআপ নিন।'
              : 'Preserve digital evidence safely (call recordings, SMS, Facebook Messenger/WhatsApp screenshots) with timestamps.',
            sourceIds: ['penal-503'],
            condition: isBn ? 'ডিজিটাল প্রমাণ সংরক্ষণ আবশ্যক' : 'Preserve digital evidence without alteration',
            requiredDocuments: isBn ? ['হুমকির স্ক্রিনশট বা মেসেজ কপি', 'হুমকিদাতার নম্বর বা প্রোফাইল'] : ['Threat screenshots/messages', 'Sender phone or profile link'],
            helpfulEvidence: isBn ? ['কল লগ বা অডিও রেকর্ডিং', 'ঘটনার সময়কাল ও প্রত্যক্ষদর্শী'] : ['Call logs or audio clips', 'Timeline and witnesses'],
          },
          {
            id: 'step-gd-2',
            text: isBn
              ? 'হুমকিদাতার সাথে কোনো প্রকার উত্তপ্ত বাক্যবিনিময় বা পাল্টা হুমকি প্রদান থেকে সম্পূর্ণ বিরত থাকুন।'
              : 'Avoid confronting, engaging in arguments, or counter-threatening the sender.',
            condition: isBn ? 'ব্যক্তিগত নিরাপত্তা রক্ষা' : 'Personal safety first',
          },
          {
            id: 'step-gd-3',
            text: isBn
              ? 'সংশ্লিষ্ট এলাকার থানার ভারপ্রাপ্ত কর্মকর্তা (OC) বরাবর সাধারণ ডায়েরি (GD) করার জন্য একটি প্রমিত লিখিত আবেদন প্রস্তুত করুন।'
              : 'Prepare a structured General Diary (GD) application addressed to the Officer-in-Charge of the local police station.',
            sourceIds: ['penal-507'],
            officeId: policeGdOffice.id,
          },
          {
            id: 'step-gd-4',
            text: isBn
              ? 'যদি তাৎক্ষণিক শারীরিক আক্রমণ বা গুরুতর বিপদের আশঙ্কা থাকে, তবে কোনো আনুষ্ঠানিকতার অপেক্ষা না করে সরাসরি জাতীয় জরুরি সেবা ৯৯৯ নম্বরে কল দিন।'
              : 'If there is immediate physical danger, call the 999 National Emergency Service without delay for police protection.',
            sourceIds: ['constitution-31'],
            officeId: policeGdOffice.id,
          },
        ];

    const explanation: Claim[] = isAssault
      ? [
          {
            text: isBn
              ? 'দণ্ডবিধি, ১৮৬০-এর ধারা ৩২৩ ও ৩২৪ অনুযায়ী ধারালো অস্ত্র বা ছুরি দিয়ে কাউকে শারীরিক আঘাত বা জখম করা একটি আমলযোগ্য গুরুতর ফৌজদারি অপরাধ।'
              : 'Under Sections 323 and 324 of the Penal Code 1860, voluntarily causing hurt by dangerous weapons or cutting instruments is a serious cognizable crime.',
            sourceIds: ['penal-323'],
          },
          {
            text: isBn
              ? 'ফৌজদারি কার্যবিধি ১৫৪ ধারা অনুযায়ী থানার ভারপ্রাপ্ত কর্মকর্তা আমলযোগ্য অপরাধের এজাহার (FIR) নথিভুক্ত করতে বাধ্য এবং ধারা ৫৪ অনুযায়ী পরোয়ানা ছাড়াই আসামিকে গ্রেফতারের ক্ষমতা রাখেন।'
              : 'Under CrPC Section 154, the Officer-in-Charge is required to record an FIR for cognizable crimes and possesses statutory power under Section 54 to arrest suspects without a warrant.',
            sourceIds: ['police-44-gd'],
          },
        ]
      : isVehicleTheft
      ? [
          {
            text: isBn
              ? 'দণ্ডবিধি, ১৮৬০-এর ধারা ৩৭৯ অনুযায়ী কারো সম্মতি ছাড়া মোটরসাইকেল বা যেকোনো যানবাহন নিয়ে যাওয়া চুরির অপরাধ, যাতে ৩ বছর পর্যন্ত কারাদণ্ড বা অর্থদণ্ড হতে পারে। তালা ভেঙে গ্যারেজ বা বাড়ি থেকে নিলে ধারা ৩৮০-তে ৭ বছর পর্যন্ত কারাদণ্ড হতে পারে।'
              : 'Under Section 379 of the Penal Code 1860, stealing a motorbike or vehicle is a criminal theft punishable with up to 3 years imprisonment or fine (or up to 7 years under Section 380 if stolen from a garage or building).',
            sourceIds: ['penal-379'],
          },
          {
            text: isBn
              ? 'পুলিশ আইন ১৮৬১-এর ধারা ৪৪ ও ফৌজদারি কার্যবিধি অনুযায়ী থানায় জিডি লিপিবদ্ধ করার পর পুলিশ তাৎক্ষণিক সব চেকপোস্টে ওয়্যারলেস বার্তা পাঠিয়ে চোরাই গাড়ি আটকে দেওয়ার আইনি এখতিয়ার রাখে।'
              : 'Under Section 44 of the Police Act 1861, recording a GD empowers police to broadcast highway checkpoint alerts and initiate statutory vehicle tracking.',
            sourceIds: ['police-44-gd'],
          },
        ]
      : isShopTheft
      ? [
          {
            text: isBn
              ? 'দণ্ডবিধি, ১৮৬০-এর ধারা ৩৮০ অনুযায়ী কোনো দোকান, গুদাম, ব্যবসা প্রতিষ্ঠান বা ভবন থেকে মালামাল চুরি করা একটি মারাত্মক আমলযোগ্য অপরাধ, যাতে ৭ বছর পর্যন্ত কারাদণ্ড ও অর্থদণ্ড হতে পারে।'
              : 'Under Section 380 of the Penal Code 1860, theft committed in a shop, building, or warehouse is a serious cognizable crime punishable with imprisonment for up to 7 years and fine.',
            sourceIds: ['penal-380'],
          },
          {
            text: isBn
              ? 'ফৌজদারি কার্যবিধি ১৫৪ ধারা অনুযায়ী থানার ভারপ্রাপ্ত কর্মকর্তা দোকান চুরির ঘটনায় এজাহার (FIR) নথিভুক্ত করতে বাধ্য এবং ধারা ৫৪ অনুযায়ী পরোয়ানা ছাড়াই তদন্ত ও আসামি গ্রেফতারের ক্ষমতা রাখেন।'
              : 'Under CrPC Section 154, the Officer-in-Charge is legally required to record an FIR for shop theft, and police hold statutory power to recover stolen inventory.',
            sourceIds: ['police-44-gd'],
          },
        ]
      : isMobileTheft
      ? [
          {
            text: isBn
              ? 'দণ্ডবিধি, ১৮৬০-এর ধারা ৩৭৯ অনুযায়ী বিনা অনুমতিতে কারো মোবাইল ফোন নিয়ে যাওয়া চুরির অপরাধ, যাতে ৩ বছর পর্যন্ত কারাদণ্ড বা অর্থদণ্ড হতে পারে।'
              : 'Under Section 379 of the Penal Code 1860, stealing a mobile phone constitutes criminal theft punishable with up to 3 years imprisonment or fine.',
            sourceIds: ['penal-379'],
          },
          {
            text: isBn
              ? 'পুলিশ আইন ১৮৬১-এর ধারা ৪৪ অনুযায়ী থানায় সাধারণ ডায়েরি (GD) করে হারানো বা চুরি যাওয়া ফোনের আইএমইআই সরকারিভাবে ট্র্যাক ও ব্লক করার আইনি অধিকার রয়েছে।'
              : 'Section 44 of the Police Act 1861 establishes the right to lodge a GD to record stolen phones and initiate electronic IMEI tracking.',
            sourceIds: ['police-44-gd'],
          },
        ]
      : isTheft
      ? [
          {
            text: isBn
              ? 'দণ্ডবিধি, ১৮৬০-এর ধারা ৩৭৯ অনুযায়ী বিনা অনুমতিতে কারো অধিকারভুক্ত যেকোনো অস্থাবর সম্পত্তি নিয়ে যাওয়া চুরির অপরাধ, যাতে ৩ বছর পর্যন্ত কারাদণ্ড বা অর্থদণ্ড হতে পারে।'
              : 'Under Section 379 of the Penal Code 1860, whoever commits theft shall be punished with imprisonment for up to three years, or with fine, or with both.',
            sourceIds: ['penal-379'],
          },
          {
            text: isBn
              ? 'পুলিশ আইন ১৮৬১-এর ধারা ৪৪ ও ফৌজদারি কার্যবিধি ১৫৫ অনুযায়ী থানায় সাধারণ ডায়েরি (GD) করে হারানো বা চুরি যাওয়া সম্পদের সরকারি রেকর্ড রাখা ও ট্র্যাকিংয়ের অধিকার রয়েছে।'
              : 'Section 44 of the Police Act 1861 and CrPC Section 155 establish the right to lodge a General Diary (GD) to record stolen or lost property and initiate formal law enforcement tracking.',
            sourceIds: ['police-44-gd'],
          },
        ]
      : [
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

    const clarificationQuestions: ClarificationQuestion[] = [];
    const questions: string[] = [];

    if (!hasPlace) {
      const qText = isBn
        ? 'ঘটনাটি কোন এলাকায় বা কোন থানার অধীন ঘটেছে? (জানা না থাকলে অজানা লিখুন)'
        : 'Which area or police station jurisdiction did this occur in? (If unknown, type unknown)';
      questions.push(qText);
      clarificationQuestions.push({
        id: 'clarify-gd-place',
        fieldId: 'place',
        question: {
          bn: 'ঘটনাটি কোন এলাকায় বা কোন থানার অধীন ঘটেছে?',
          en: 'Which area or police station jurisdiction did this occur in?',
        },
        importance: {
          bn: 'জিডি কোন আঞ্চলিক থানায় নথিভুক্ত হবে তা নির্ধারণ করতে এখতিয়ার প্রয়োজন।',
          en: 'Jurisdiction is necessary to determine the appropriate local police station for the GD.',
        },
        answerType: 'text',
      });
    }

    if (!hasDate) {
      const qText = isBn
        ? 'ঘটনাটি কবে ও কোন সময় সংঘটিত হয়েছিল? (যেমন: আজ সকাল ৯:৪৫)'
        : 'When did the incident occur? (e.g. today at 9:45 AM)';
      questions.push(qText);
      clarificationQuestions.push({
        id: 'clarify-gd-date',
        fieldId: 'incident_date',
        question: {
          bn: 'ঘটনাটি কবে ও কোন সময় সংঘটিত হয়েছিল?',
          en: 'When did the incident occur?',
        },
        importance: {
          bn: 'থানায় সাধারণ ডায়েরির বিবরণীতে ঘটনার সঠিক সময়কাল লিপিবদ্ধ করা আবশ্যক।',
          en: 'Recording the incident timeframe is required in a police General Diary entry.',
        },
        answerType: 'text',
      });
    }

    return {
      schemaVersion: 1,
      answerId: request.requestId,
      mode,
      status: questions.length > 0 ? 'clarifying' : 'completed',
      questions,
      clarificationQuestions,
      userFacts: [
        ...request.facts,
        {
          fieldId: 'issue_type',
          value: isAssault
            ? 'police_fir_assault'
            : isVehicleTheft
            ? 'police_gd_vehicle_theft'
            : isShopTheft
            ? 'police_fir_shop_theft'
            : isMobileTheft
            ? 'police_gd_theft'
            : isTheft
            ? 'police_gd_property_theft'
            : 'police_gd_threat',
          status: questions.length > 0 ? 'inferred' : 'user_confirmed',
          provenance: 'intent_classification',
        },
      ],
      checklist,
      explanation,
      limitations: [
        isBn
          ? 'জিডি বা এজাহার কোনো চূড়ান্ত আদালত রায় নয়; এটি আইনগত প্রাথমিক তথ্য নথিভুক্তকরণ ও তদন্ত শুরুর প্রক্রিয়া।'
          : 'A GD or FIR is an official statutory record initiating investigation, not a final court judgment.',
        isBn
          ? 'পুলিশের এজাহার ও জিডি গ্রহণের প্রক্রিয়া সংশ্লিষ্ট থানার দায়িত্বপ্রাপ্ত কর্মকর্তার এখতিয়ারভুক্ত।'
          : 'Registration of an FIR or GD remains subject to the assessment of the Officer-in-Charge.',
      ],
      sourcePackVersion: SOURCE_VERSION,
      allowedDraftOptions: ['gd'],
      problemSummary: {
        identifiedIssue: isAssault
          ? isBn
            ? 'মারধর, ধারালো অস্ত্রের আঘাত ও ফৌজদারি এজাহার (FIR)'
            : 'Physical Assault, Weapon Injury & Criminal FIR'
          : isVehicleTheft
          ? isBn
            ? 'মোটরসাইকেল / বাইক চুরি ও আইনগত উদ্ধার পদক্ষেপ (জিডি/এজাহার)'
            : 'Motorbike / Vehicle Theft & Police Recovery (GD/FIR)'
          : isShopTheft
          ? isBn
            ? 'দোকান থেকে মালামাল চুরি ও ফৌজদারি এজাহার (FIR / দণ্ডবিধি ৩৮০ ধারা)'
            : 'Shop Burglary / Theft & Criminal FIR (Penal Code Section 380)'
          : isMobileTheft
          ? isBn
            ? 'মোবাইল ফোন চুরি ও সাধারণ ডায়েরি (জিডি)'
            : 'Mobile Phone Theft & Police General Diary (GD)'
          : isTheft
          ? isBn
            ? 'মালামাল / সম্পত্তি চুরি ও সাধারণ ডায়েরি (জিডি)'
            : 'Property Theft & Police General Diary (GD)'
          : isBn
          ? 'অপরিচিত ব্যক্তি কর্তৃক হুমকি ও নিরাপত্তা ঝুঁকি (Criminal Intimidation)'
          : 'Criminal Intimidation & Personal Security Threat',
        understanding: isAssault
          ? isBn
            ? 'খুবই দুঃখজনক ও ভীতিকর একটি ঘটনা। আপনার ওপর রাস্তায় ছুরি বা মারাত্মক অস্ত্র দিয়ে হামলা ও আঘাত করা অত্যন্ত গুরুতর ফৌজদারি অপরাধ। এই মুহূর্তে আপনার শারীরিক নিরাপত্তা ও সুচিকিৎসাই সবচেয়ে বড় অগ্রাধিকার। হাসপাতালে চিকিৎসা নিলে তৈরি হওয়া ইনজুরি রিপোর্টই আদালতের প্রধান অকাট্য প্রমাণ হবে, যার ভিত্তিতে পুলিশ আসামিকে দ্রুত গ্রেফতার করতে পারবে। চলুন দেখে নিই এখন কী করতে হবে:'
            : 'I am very sorry you had to experience this. Being physically attacked or wounded with a knife or dangerous weapon is a traumatic ordeal and a serious criminal offense under the Penal Code 1860. Right now, your personal health, safety, and proper medical treatment are the highest priorities. Obtaining an official hospital injury certificate gives police the primary statutory evidence to arrest the assailant. Here is the immediate checklist:'
          : isVehicleTheft
          ? isBn
            ? 'খুবই মন খারাপ করা ঘটনা। আপনার বাইকটি চুরি হওয়া অনেক বড় একটি দুশ্চিন্তার বিষয়। তবে দ্রুত সঠিক কিছু আইনি পদক্ষেপ নিলে বাইকটি ট্র্যাক ও উদ্ধার করার সম্ভাবনা সবচেয়ে বেশি থাকে। বাইক বা যানবাহন চুরির ক্ষেত্রে পুলিশ তাৎক্ষণিক ওয়্যারলেস বার্তার (W/T alert) মাধ্যমে সব হাইওয়ে চেকপোস্টে গাড়ির নম্বর ছড়িয়ে দেয় এবং বিআরটিএ ডেটাবেজে গাড়িটি লক করা যায় যাতে কেউ এটি বিক্রি বা রেজিস্ট্রেশন বদল করতে না পারে। চলুন দেখি ধাপে ধাপে কী করতে হবে:'
            : 'I am really sorry to hear that. Having your bike stolen is deeply upsetting and disruptive. Taking prompt, strategic legal steps right now maximizes the chance of tracking and recovering it. When vehicle theft is reported, police broadcast an immediate wireless alert across highway checkpoints and you can lock its registration in the BRTA system to prevent unauthorized resale or transfer. Here is what you should do step-by-step:'
          : isShopTheft
          ? isBn
            ? 'খুবই উদ্বেগজনক একটি ঘটনা। আপনার দোকান বা ব্যবসা প্রতিষ্ঠান থেকে মালামাল চুরি হওয়া একটি বড় অর্থনৈতিক আঘাত। তবে ভালো খবর হলো, আইনের চোখে এটি একটি মারাত্মক আমলযোগ্য অপরাধ (দণ্ডবিধি ৩৮০ ধারা), যার কারণে পুলিশ আদালতের অনুমতির অপেক্ষা না করেই সরাসরি চোর ধরতে অভিযান চালাতে পারে এবং চোরাই মাল উদ্ধারে ব্যবস্থা নিতে পারে। মালামাল ফেরত পেতে দ্রুত এই পদক্ষেপগুলো নেওয়া দরকার:'
            : 'I understand how stressful this is. Having merchandise or goods stolen from your shop is a major financial blow. Under Bangladesh law, this is treated as severe building burglary (Section 380), empowering police to arrest suspects and launch searches immediately without waiting for a warrant. Here are the most effective steps to take right now:'
          : isMobileTheft
          ? isBn
            ? 'খুবই মন খারাপ করা বিষয়। আপনার মোবাইল ফোনটি চুরি বা ছিনতাই হওয়া অনেক বড় একটি ঝামেলা। তবে দ্রুত সঠিক পদক্ষেপ নিলে ফোনটি উদ্ধার এবং যেকোনো অপব্যবহার ঠেকানো সম্ভব। দণ্ডবিধি ১৮৬০-এর ধারা ৩৭৯ অনুযায়ী মোবাইল চুরি শাস্তিযোগ্য অপরাধ। ফোন চুরি হলে পুলিশ আইএমইআই (IMEI) ট্র্যাকিং করে ডিভাইসটি শনাক্ত করতে পারে। এছাড়া চোর যেন আপনার সিম কার্ড দিয়ে কোনো অনৈতিক কাজ বা আর্থিক প্রতারণা না করতে পারে, সেজন্য দ্রুত কিছু আইনি ও নিরাপত্তামূলক কাজ করা দরকার। চলুন দেখি কী কী করতে হবে:'
            : 'I am sorry to hear that. Having your mobile phone stolen is deeply stressful and disruptive. Under Section 379 of the Penal Code 1860, taking any mobile phone or property without consent is a criminal offense. Taking prompt action now protects you from fraud and maximizes recovery chances. Police can initiate tracking using your 15-digit IMEI number, while blocking the SIM prevents unauthorized financial transactions. Here is the step-by-step guidance:'
          : isTheft
          ? isBn
            ? 'খুবই মন খারাপ করা ঘটনা। আপনার জিনিসপত্র চুরি হওয়া বড় একটি কষ্টের বিষয়। দণ্ডবিধি ১৮৬০-এর ধারা ৩৭৯ অনুযায়ী কারো সম্মতি ছাড়া কোনো জিনিস নিয়ে যাওয়া সরাসরি ফৌজদারি অপরাধ। চুরি যাওয়া মালামাল উদ্ধার এবং সরকারি রেকর্ডভুক্ত করতে নিকটস্থ থানায় একটি সাধারণ ডায়েরি (GD) করা আপনার প্রধান আইনি পদক্ষেপ। চলুন দেখে নিই কী কী পদক্ষেপ নিতে হবে:'
            : 'I am really sorry to hear that. Having your personal property stolen is upsetting. Under Section 379 of the Penal Code 1860, taking any property without consent is a criminal offense. Lodging an immediate General Diary (GD) with the local police station creates an official record and initiates recovery efforts. Here is what you should do step-by-step:'
          : isBn
          ? 'খুবই মানসিক চাপের একটি বিষয়। আপনাকে হুমকি বা ভয়ভীতি দেখানো আপনার মানসিক শান্তি ও ব্যক্তিগত নিরাপত্তার ওপর সরাসরি আঘাত। আইনের চোখে এটি শাস্তিযোগ্য অপরাধ (Criminal Intimidation)। ভয় না পেয়ে ডিজিটাল প্রমাণগুলো নিরাপদে সংরক্ষণ করে থানায় সাধারণ ডায়েরি (GD) করা আপনার প্রধান আইনি সুরক্ষা। চলুন দেখি ধাপে ধাপে কী করতে হবে:'
          : 'I understand how distressing this is. Receiving threats or facing intimidation is stressful and a direct infringement on your peace of mind and personal safety. Under Bangladesh law, this is a punishable criminal offense. Securing digital evidence and lodging a GD at your local police station provides immediate legal protection. Here is how to proceed:',
        additionalInfoNeeded: questions,
      },
      plainLanguageExplanation: {
        heading: isAssault
          ? isBn
            ? 'দণ্ডবিধি ১৮৬০ (ধারা ৩২৩/৩২৪) ও ফৌজদারি কার্যবিধি (ধারা ১৫৪ - এজাহার)'
            : 'Penal Code 1860 (Sections 323/324) & CrPC (Section 154 - FIR)'
          : isVehicleTheft
          ? isBn
            ? 'দণ্ডবিধি ১৮৬০ (ধারা ৩৭৯/৩৮০) ও পুলিশ আইনের সংবিধিবদ্ধ বিধান'
            : 'Penal Code 1860 (Sections 379/380) & Police Act Vehicle Recovery'
          : isShopTheft
          ? isBn
            ? 'দণ্ডবিধি ১৮৬০ (ধারা ৩৮০ - দোকানে চুরি) ও ফৌজদারি কার্যবিধি (ধারা ১৫৪)'
            : 'Penal Code 1860 (Section 380 - Theft in Building/Shop) & CrPC (Section 154)'
          : isMobileTheft
          ? isBn
            ? 'দণ্ডবিধি ১৮৬০ (ধারা ৩৭৯) ও পুলিশ আইনের সংবিধিবদ্ধ বিধান'
            : 'Penal Code 1860 (Section 379) & Statutory GD Provisions'
          : isTheft
          ? isBn
            ? 'দণ্ডবিধি ১৮৬০ (ধারা ৩৭৯) ও পুলিশ আইনের সংবিধিবদ্ধ বিধান'
            : 'Penal Code 1860 (Section 379) & Statutory GD Provisions'
          : isBn
          ? 'দণ্ডবিধি ১৮৬০ (ধারা ৫০৩/৫০৭) ও পুলিশ আইনের সংবিধিবদ্ধ বিধান'
          : 'Penal Code 1860 (Section 503/507) & Statutory GD Provisions',
        meaning: isAssault
          ? isBn
            ? 'সহজ ভাষায় বললে, রাস্তায় ছুরি বা অস্ত্র দিয়ে আঘাত করা মারাত্মক ফৌজদারি অপরাধ। এ ধরনের আমলযোগ্য অপরাধে পুলিশ কোনো পরোয়ানা ছাড়াই আসামিকে গ্রেফতারের ক্ষমতা রাখে। আপনার এক নম্বর জরুরি কাজ হলো নিকটস্থ সরকারি হাসপাতালে চিকিৎসা নিয়ে ইনজুরি সার্টিফিকেট সংগ্রহ করা; এটিই মামলার প্রধান দলিল। এরপর থানায় ওসির বরাবরে নিয়মিত এজাহার (FIR) দাখিল করলে পুলিশ তাৎক্ষণিক তদন্ত ও আসামি গ্রেফতার শুরু করতে পারবে।'
            : 'In plain language, assaulting anyone with a knife or dangerous weapon is a serious cognizable crime. Police have statutory powers to arrest the assailant without warrant under CrPC Section 54. Your first priority is getting treated at a government hospital to obtain a certified injury report, which is essential evidence. Filing an FIR mandates immediate police investigation.'
          : isVehicleTheft
          ? isBn
            ? 'সহজ কথায় বললে, আপনার অনুমতি ছাড়া বাইক নিয়ে যাওয়া দণ্ডবিধির ৩৭৯ ধারায় শাস্তিযোগ্য ফৌজদারি অপরাধ (Theft), যাতে সর্বোচ্চ ৩ বছর পর্যন্ত কারাদণ্ড বা জরিমানা হতে পারে। আর যদি বাড়ি, গ্যারেজ বা প্রতিষ্ঠান থেকে তালা কেটে বা ভেঙে নেওয়া হয়, তবে ৩৮০ ধারায় ৭ বছর পর্যন্ত জেল হতে পারে। আপনার সবচেয়ে জরুরি কাজ হলো দেরি না করে যে এলাকা থেকে বাইক চুরি হয়েছে, সেই এলাকার থানায় গিয়ে সাধারণ ডায়েরি (GD) বা এজাহার দায়ের করা। থানার ডিউটি অফিসারকে বাইকের রেজিস্ট্রেশন, ইঞ্জিন ও চেসিস নম্বর দিলে তারা সব চেকপোস্টে মেসেজ পাঠিয়ে গাড়ি উদ্ধারে অভিযান শুরু করতে পারে।'
            : 'In plain terms, stealing your motorbike without permission is a serious criminal offense under Section 379 of the Penal Code (punishable with up to 3 years imprisonment or fine), and under Section 380 (up to 7 years) if stolen from a building or locked garage. Your first priority is lodging a GD or FIR at the local police station with your registration, engine, and chassis numbers so police can alert highway checkpoints and trace the vehicle.'
          : isShopTheft
          ? isBn
            ? 'সহজ কথায়, দোকান বা যেকোনো ব্যবসা প্রতিষ্ঠান থেকে মালামাল চুরি সাধারণ চুরির চেয়ে বেশি গুরুতর—এটি দণ্ডবিধির ৩৮০ ধারার আওতায় পড়ে এবং এতে সর্বোচ্চ ৭ বছরের জেল হতে পারে। আপনার প্রথম কাজ হলো দোকানের চুরি হওয়া মালামালের সুনির্দিষ্ট তালিকা তৈরি করা, সিসিটিভি ফুটেজ থাকলে তা ব্যাকআপ নেওয়া এবং নিকটস্থ থানায় ওসির বরাবরে সরাসরি এজাহার (FIR) বা সাধারণ ডায়েরি (GD) দায়ের করা। পুলিশ এই ধারায় সরাসরি মামলা নিয়ে আসামি গ্রেফতার ও মালামাল উদ্ধারে অভিযান চালাতে আইনত বাধ্য।'
            : 'In plain language, stealing goods from a shop or commercial premises is a severe form of theft under Section 380 of the Penal Code 1860, punishable by up to 7 years imprisonment. Your immediate priority is making an itemized inventory of stolen merchandise, securing any CCTV footage on a pen drive, and submitting a formal petition to the local police station Officer-in-Charge (OC).'
          : isMobileTheft
          ? isBn
            ? 'সহজ কথায় বললে, কারো সম্মতি ছাড়া তার মোবাইল ফোন নিয়ে যাওয়া দণ্ডবিধির ৩৭৯ ধারা অনুযায়ী চুরির অপরাধ, যাতে ৩ বছর পর্যন্ত কারাদণ্ড হতে পারে। আপনার প্রাথমিক ও সবচেয়ে কার্যকর প্রতিকার হলো স্থানীয় থানায় একটি সাধারণ ডায়েরি (GD) লিপিবদ্ধ করা। জিডির এন্ট্রি নম্বর ব্যবহার করে পুলিশ ও বিটিআরসি ফোনের ১৫ ডিজিটের আইএমইআই (IMEI) ট্র্যাকিং শুরু করতে পারে এবং হ্যান্ডসেটটি ব্লক করা সম্ভব হয়।'
            : 'In plain language, taking anyone\'s mobile phone without consent is theft under Section 379 of the Penal Code 1860. Lodging a General Diary (GD) at the local police station allows law enforcement and telecom authorities to initiate IMEI tracking and block the stolen device on national registries.'
          : isTheft
          ? isBn
            ? 'সহজ কথায়, কারো সম্মতি ছাড়া তার মালামাল বা সম্পত্তি নিয়ে যাওয়া দণ্ডবিধির ৩৭৯ ধারা অনুযায়ী চুরির অপরাধ, যাতে ৩ বছর পর্যন্ত কারাদণ্ড বা জরিমানা হতে পারে। আপনার প্রাথমিক ও সর্বাধিক কার্যকর প্রতিকার হলো স্থানীয় থানায় একটি সাধারণ ডায়েরি (GD) লিপিবদ্ধ করা, যার ভিত্তিতে পুলিশ তদন্ত ও মাল উদ্ধারের কার্যক্রম চালাতে পারে।'
            : 'In plain language, taking anyone\'s personal property without consent is defined as theft under Section 379 of the Penal Code 1860. Your immediate legal recourse is lodging a General Diary (GD) at the local police station to initiate official recovery.'
          : isBn
          ? 'সহজ কথায়, কাউকে ভয় দেখানো বা কোনো ক্ষতি করার হুমকি দেওয়া বাংলাদেশে দণ্ডবিধির আওতায় একটি সুনির্দিষ্ট ফৌজদারি অপরাধ (Criminal Intimidation)। যদি হুমকিদাতা নাম-পরিচয় গোপন রেখে বা ভুয়া একাউন্ট থেকে বার্তা পাঠায়, তবে আইনের চোখে অপরাধটি আরও বেশি গুরুতর। আপনার তাৎক্ষণিক আইনি সুরক্ষা হলো থানায় সাধারণ ডায়েরি (GD) নথিভুক্ত করা।'
          : 'In plain language, threatening anyone with injury is a defined criminal offense (Section 503, Penal Code). Anonymous threats attract enhanced penalties under Section 507. Your primary legal record is lodging a General Diary (GD).',
        userRightsAndOptions: isAssault
          ? isBn
            ? [
                'নিকটস্থ সরকারি হাসপাতাল থেকে জরুরি চিকিৎসা ও অফিসিয়াল ইনজুরি সার্টিফিকেট পাওয়ার আইনি অধিকার।',
                'থানায় গিয়ে বিনামূল্যে সরাসরি নিয়মিত ফৌজদারি এজাহার (FIR) দায়ের করার অধিকার।',
                'পুলিশ কর্তৃক তাৎক্ষণিক তদন্ত ও আসামি গ্রেফতার কার্যক্রম নিশ্চিত করার অধিকার।'
              ]
            : [
                'Right to emergency medical treatment and certified Medical Injury Certificate from a government hospital.',
                'Right to file a First Information Report (FIR) free of charge at the local police station.',
                'Right to police investigation and immediate statutory arrest of the accused.'
              ]
          : isVehicleTheft
          ? isBn
            ? [
                'নিকটস্থ থানায় বিনামূল্যে তাৎক্ষণিক সাধারণ ডায়েরি (GD) বা এজাহার দায়ের করার আইনগত অধিকার।',
                'থানার ওয়্যারলেসের মাধ্যমে ট্রাফিক ও হাইওয়ে চেকপোস্টগুলোতে বাইকের নম্বর পাঠিয়ে তল্লাশি নিশ্চিত করা।',
                'জিডির অনুলিপি নিয়ে বিআরটিএ-তে আবেদন দিয়ে গাড়ির মালিকানা হস্তান্তর ও ডিজিটাল রেজিস্ট্রেশন সাময়িক ব্লক করা।',
              ]
            : [
                'Statutory right to lodge a GD or FIR free of charge at the local police station.',
                'Right to have police broadcast the vehicle registration to traffic and highway checkpoints via wireless alert.',
                'Right to notify BRTA to freeze vehicle ownership transfer and prevent fraudulent paperwork.',
              ]
          : isShopTheft
          ? isBn
            ? [
                'দণ্ডবিধি ৩৮০ ধারায় থানায় সরাসরি নিয়মিত ফৌজদারি এজাহার (FIR) নথিভুক্ত করার পূর্ণ অধিকার।',
                'দোকানের সিসিটিভি ফুটেজ, ক্যাশ মেমো ও ইনভেন্টরি তালিকা সরকারি তদন্তের প্রামাণ্য নথি হিসেবে জমা দেওয়ার অধিকার।',
                'পুলিশ মামলা গ্রহণে অনীহা প্রকাশ করলে সার্কেল এএসপি বা মেট্রোপলিটন কোর্টে সিআর মামলা (CrPC 156(3)) দায়ের করার অধিকার।',
              ]
            : [
                'Right to have a cognizable criminal case (FIR) registered at the local police station under Section 380.',
                'Right to submit CCTV footage, invoices, and inventory logs as official forensic evidence.',
                'Right to escalate to the Circle ASP or lodge a direct complaint (CR Case) before the Magistrate under Section 156(3) CrPC if Thana refuses.',
              ]
          : isMobileTheft
          ? isBn
            ? [
                'নিকটস্থ থানায় বিনামূল্যে সাধারণ ডায়েরি (GD) দায়ের করে সরকারি জিডি নম্বর সংগ্রহ করা।',
                'মোবাইল অপারেটরের হেল্পলাইনে (১২১) কল করে চুরি হওয়া সিমটি সাময়িক বন্ধ করা।',
                'জিডি কপি ও ১৫ ডিজিটের আইএমইআই (IMEI) নম্বর পুলিশে প্রদান করে হ্যান্ডসেট ট্র্যাকিং ও উদ্ধার কার্যক্রম শুরু করা।',
              ]
            : [
                'File a formal General Diary (GD) free of charge at the local police station to secure an official GD number.',
                'Call your telecom operator hotline (121) immediately to suspend the stolen SIM card and prevent fraud.',
                'Submit the GD copy and 15-digit IMEI number to police investigation officers for tracking and handset recovery.',
              ]
          : isTheft
          ? isBn
            ? [
                'নিকটস্থ থানায় বিনামূল্যে সাধারণ ডায়েরি (GD) দায়ের করে সরকারি জিডি নম্বর সংগ্রহ করা।',
                'চুরি হওয়া সম্পত্তির রসিদ, চালান বা শনাক্তকরণ বিবরণ পুলিশের নিকট জমা দেওয়া।',
                'তদন্তকারী কর্মকর্তার মাধ্যমে চোরাই মাল উদ্ধার ও জিম্মানামায় ফেরত পাওয়ার অধিকার।',
              ]
            : [
                'File a formal General Diary (GD) free of charge at the local police station to secure an official GD number.',
                'Submit ownership receipts and property identification details to the investigating police officer.',
                'Right to seek restitution and return of recovered stolen property upon proper verification.',
              ]
          : isBn
          ? [
              'নিকটস্থ থানায় একটি সাধারণ ডায়েরি (GD) দায়ের করে ঘটনার আনুষ্ঠানিক সরকারি রেকর্ড সৃষ্টি করা।',
              'হুমকির মেসেজ, স্ক্রিনশট, অডিও ক্লিপ ও ফোন নম্বর ডিজিটাল প্রমাণ হিসেবে পুলিশের নিকট উপস্থাপন করা।',
              'যদি তাৎক্ষণিক শারীরিক বিপদের আশঙ্কা থাকে, তবে সরাসরি জাতীয় জরুরি সেবা ৯৯৯ নম্বরে কল দিয়ে পুলিশের সাহায্য নেওয়া।',
            ]
          : [
              'Formally lodge a General Diary (GD) with your local police station to establish an official record.',
              'Submit digital evidence (screenshots, recordings, phone numbers, profile links) to the police.',
              'Dial the 999 National Emergency Service immediately if there is any immediate physical threat.',
            ],
        whatToDoNext: isAssault
          ? isBn
            ? '১. দ্রুত সরকারি হাসপাতালে গিয়ে চিকিৎসা নিয়ে ডাক্তারী জখমী সনদ সংগ্রহ করুন। ২. নিচের প্রস্তুত এজাহার (FIR) খসড়াটি নিয়ে সংশ্লিষ্ট থানায় ওসির নিকট দাখিল করুন।'
            : '1. Seek immediate care at a government hospital to secure a certified Injury Report. 2. Lodge an FIR application with the local Thana OC using the draft below.'
          : isVehicleTheft
          ? isBn
            ? '১. বাইকের ব্লু-বুক বা রেজিস্ট্রেশন কার্ড, ইঞ্জিন ও চেসিস নম্বর সাথে নিন। ২. আশপাশের সিসিটিভি ফুটেজ সংগ্রহ করুন। ৩. নিচের প্রস্তুত আবেদনপত্রটি নিয়ে সংশ্লিষ্ট থানায় ওসির বরাবর দ্রুত জিডি জমা দিন।'
            : '1. Gather your BRTA registration card/blue book, engine and chassis numbers. 2. Secure any CCTV footage. 3. Lodge your GD with the local Thana OC using the draft below.'
          : isShopTheft
          ? isBn
            ? '১. চুরি হওয়া মালামালের সুনির্দিষ্ট তালিকা ও আর্থিক ক্ষতির পরিমাণ প্রস্তুত করুন। ২. সিসিটিভি ক্যামেরার ভিডিও ব্যাকআপ পেনড্রাইভে রাখুন। ৩. নিচের প্রস্তুত আবেদনপত্রটি নিয়ে সংশ্লিষ্ট থানায় ওসির বরাবর দ্রুত জমা দিন।'
            : '1. Prepare an itemized list of stolen merchandise and estimated loss. 2. Secure CCTV backup on a pen drive. 3. Lodge the formal petition with the local Thana OC immediately.'
          : isMobileTheft
          ? isBn
            ? '১. ফোনের বক্স বা ক্রয়ের রসিদ থেকে ১৫ ডিজিটের আইএমইআই (IMEI) নম্বর নোট করুন। ২. সিম কার্ড ব্লক করতে মোবাইল অপারেটরে কল দিন। ৩. নিচের প্রস্তুত খসড়াটি ব্যবহার করে সংশ্লিষ্ট থানায় ওসির বরাবর জিডি জমা দিন।'
            : '1. Note down your 15-digit IMEI number from your phone box or receipt. 2. Call your mobile operator to suspend your SIM card. 3. Prepare and submit a formal GD application addressed to the Officer-in-Charge (OC).'
          : isTheft
          ? isBn
            ? '১. চুরি হওয়া মালামালের তালিকা ও ক্রয়ের রসিদ সংগ্রহ করুন। ২. ঘটনাস্থল ও সাক্ষীদের তথ্য সংরক্ষণ করুন। ৩. নিচের প্রস্তুত খসড়াটি ব্যবহার করে সংশ্লিষ্ট থানায় ওসির বরাবর জিডি জমা দিন।'
            : '1. Organize property purchase receipts and details. 2. Preserve witness and incident information. 3. Prepare and submit a formal GD application to the Thana OC.'
          : isBn
          ? 'হুমকিদাতার সাথে কোনো প্রকার উত্তপ্ত বাক্যবিনিময়ে যাবেন না। দ্রুত সব স্ক্রিনশট ও প্রমাণ নিরাপদে ব্যাকআপ রাখুন এবং সংশ্লিষ্ট থানার ওসির বরাবরে জিডি খসড়া প্রস্তুত করুন।'
          : 'Avoid confronting the sender. Back up all digital evidence safely and prepare a GD application addressed to the Officer-in-Charge.',
      },
      draftOffer: {
        prompt: isAssault
          ? isBn
            ? 'আপনি কি আক্রমণকারীর বিরুদ্ধে থানায় সরাসরি ফৌজদারি এজাহার (FIR) দায়ের করার জন্য একটি আনুষ্ঠানিক দরখাস্ত প্রস্তুত করতে চান?'
            : 'Would you like to prepare a formal First Information Report (FIR) petition addressed to the Police Station (OC)?'
          : isVehicleTheft
          ? isBn
            ? 'আপনি কি থানায় বাইক চুরির আনুষ্ঠানিক সাধারণ ডায়েরি (GD) করার জন্য একটি লিখিত দরখাস্ত প্রস্তুত করতে চান?'
            : 'Would you like to prepare an official General Diary (GD) application addressed to the Officer-in-Charge (OC) for your stolen bike?'
          : isShopTheft
          ? isBn
            ? 'আপনি কি দোকান থেকে মালামাল চুরির ঘটনায় থানায় এজাহার (FIR) বা সাধারণ ডায়েরি (GD) দাখিল করার জন্য একটি আনুষ্ঠানিক দরখাস্ত প্রস্তুত করতে চান?'
            : 'Would you like to generate a formal police complaint petition (FIR/GD) for the shop burglary under Section 380?'
          : isMobileTheft
          ? isBn
            ? 'আপনি কি মোবাইল ফোন চুরির ঘটনায় থানার ভারপ্রাপ্ত কর্মকর্তা (OC) বরাবর একটি আনুষ্ঠানিক সাধারণ ডায়েরি (GD) আবেদন প্রস্তুত করতে চান?'
            : 'Would you like to prepare an official General Diary (GD) application addressed to the Officer-in-Charge (OC) for your stolen mobile phone?'
          : isTheft
          ? isBn
            ? 'আপনি কি মালামাল চুরির ঘটনায় থানার ভারপ্রাপ্ত কর্মকর্তা (OC) বরাবর একটি আনুষ্ঠানিক সাধারণ ডায়েরি (GD) আবেদন প্রস্তুত করতে চান?'
            : 'Would you like to prepare an official General Diary (GD) application for the stolen property?'
          : isBn
          ? 'আপনি কি এই ঘটনার ভিত্তিতে থানার ভারপ্রাপ্ত কর্মকর্তা (OC) বরাবর একটি আনুষ্ঠানিক সাধারণ ডায়েরি (GD) খসড়া আবেদন প্রস্তুত করতে চান?'
          : 'Would you like to prepare a structured General Diary (GD) draft application addressed to the police station?',
        documentType: 'gd',
        documentTitle: isAssault
          ? isBn
            ? 'থানার ভারপ্রাপ্ত কর্মকর্তা (OC) বরাবর ফৌজদারি এজাহার (FIR) আবেদন'
            : 'First Information Report (FIR) Application to Officer-in-Charge (OC)'
          : isVehicleTheft
          ? isBn
            ? 'মোটরসাইকেল / বাইক চুরির সাধারণ ডায়েরি (GD) আবেদন'
            : 'Police General Diary (GD) Application for Stolen Motorbike'
          : isShopTheft
          ? isBn
            ? 'দোকানে মালামাল চুরির এজাহার / সাধারণ ডায়েরি (GD) আবেদন'
            : 'Police Petition for Shop Theft & Burglary (Penal Code 380)'
          : isMobileTheft
          ? isBn
            ? 'মোবাইল ফোন চুরির সাধারণ ডায়েরি (GD) আবেদন'
            : 'General Diary (GD) Application for Stolen Mobile Phone'
          : isTheft
          ? isBn
            ? 'মালামাল চুরির সাধারণ ডায়েরি (GD) আবেদন'
            : 'General Diary (GD) Application for Stolen Property'
          : isBn
          ? 'থানার ভারপ্রাপ্ত কর্মকর্তা (OC) বরাবর সাধারণ ডায়েরি (GD) আবেদন'
          : 'General Diary (GD) Application to Officer-in-Charge (OC)',
        description: isAssault
          ? isBn
            ? 'MyLaws আপনার ঘটনার বিবরণ, ক্ষতের প্রকৃতি ও আক্রমণকারীর তথ্যের ভিত্তিতে থানায় নিয়মিত মামলা দায়েরের জন্য একটি প্রমিত এজাহার (FIR) খসড়া তৈরি করবে। আপনি সরাসরি বাংলায় সম্পাদনা করে প্রিন্ট-রেডি A4 PDF ডাউনলোড করতে পারবেন।'
            : 'MyLaws will generate a structured legal First Information Report (FIR) application for the Thana Officer-in-Charge (OC), detailing the weapon assault and injury, exportable as an official A4 PDF.'
          : isVehicleTheft
          ? isBn
            ? 'MyLaws আপনার বাইকের রেজিস্ট্রেশন নম্বর, ইঞ্জিন ও চেসিস নম্বর এবং চুরির সময়ের বিবরণ দিয়ে থানার ভারপ্রাপ্ত কর্মকর্তা (OC) বরাবর একটি পরিচ্ছন্ন জিডি দরখাস্ত তৈরি করবে। আপনি সরাসরি সম্পাদনা করে প্রিন্ট-রেডি A4 PDF ডাউনলোড করতে পারবেন।'
            : 'MyLaws will generate an official police GD application detailing the motorbike registration, engine and chassis numbers, and incident timeline, exportable as a print-ready A4 PDF.'
          : isShopTheft
          ? isBn
            ? 'MyLaws আপনার দোকানের নাম, ঠিকানা, চুরি হওয়া পণ্যের তালিকা ও আনুমানিক মূল্যের ভিত্তিতে থানায় ওসির বরাবরে দাখিলের জন্য একটি সুনির্দিষ্ট অভিযোগপত্র খসড়া তৈরি করবে। আপনি সরাসরি বাংলায় সম্পাদনা করে প্রিন্ট-রেডি A4 PDF ডাউনলোড করতে পারবেন।'
            : 'MyLaws will generate an official police complaint specifying the shop address, itemized stolen inventory, and estimated financial loss for the Officer-in-Charge, exportable as an official A4 PDF.'
          : isMobileTheft
          ? isBn
            ? 'MyLaws আপনার ঘটনার বিবরণ ও আইএমইআই অনুযায়ী থানার ওসির নিকট দাখিলের জন্য একটি প্রমিত জিডি খসড়া প্রস্তুত করবে। আপনি সরাসরি সম্পাদনা করে তাৎক্ষণিক A4 PDF ডাউনলোড করতে পারবেন।'
            : 'MyLaws will generate a structured legal GD application for the Thana Officer-in-Charge (OC), detailing the incident time, place, and handset IMEI, exportable as an official print-ready A4 PDF.'
          : isTheft
          ? isBn
            ? 'MyLaws আপনার চুরি যাওয়া সম্পত্তির তালিকা ও বিবরণ অনুযায়ী থানার ওসির নিকট দাখিলের জন্য একটি প্রমিত জিডি খসড়া প্রস্তুত করবে। আপনি সরাসরি সম্পাদনা করে তাৎক্ষণিক A4 PDF ডাউনলোড করতে পারবেন।'
            : 'MyLaws will generate a structured legal GD application for the Thana Officer-in-Charge (OC), exportable as an official print-ready A4 PDF.'
          : isBn
          ? 'MyLaws আপনার ঘটনার বিবরণ অনুযায়ী থানার ওসির নিকট দাখিলের জন্য একটি প্রমিত জিডি খসড়া প্রস্তুত করবে। আপনি সরাসরি সম্পাদনা করে তাৎক্ষণিক A4 PDF ডাউনলোড করতে পারবেন।'
          : 'MyLaws will generate a structured GD application for the police station, exportable as an A4 PDF.',
        missingDetails: isAssault
          ? isBn
            ? ['আক্রমণকারী বা সন্দেহভাজনের নাম-পরিচয় (যদি জানা থাকে)', 'ঘটনার সুনির্দিষ্ট স্থান বা সড়ক এবং প্রত্যক্ষদর্শীদের নাম']
            : ['Assailant name/identity (if known)', 'Exact road/place and witness details']
          : isVehicleTheft
          ? isBn
            ? ['বাইকের রেজিস্ট্রেশন নম্বর (যেমন: ঢাকা মেট্রো-হ-১২-৩৪৫৬), ইঞ্জিন ও চেসিস নম্বর', 'ঘটনাস্থল (কোন সড়ক, দোকান বা গ্যারেজ থেকে নেওয়া হয়েছে)']
            : ['Motorbike registration number, engine & chassis numbers', 'Incident location/street']
          : isShopTheft
          ? isBn
            ? ['দোকানের নাম ও সুনির্দিষ্ট ঠিকানা', 'চুরি হওয়া মালামালের আনুমানিক তালিকা ও মূল্য', 'ঘটনার সময় ও সিসিটিভি ক্যামেরার তথ্য']
            : ['Shop name & full address', 'Inventory list of stolen goods & estimated value', 'Incident timeframe & CCTV status']
          : isMobileTheft
          ? isBn
            ? ['মোবাইলের ব্র্যান্ড, মডেল ও ১৫ ডিজিটের আইএমইআই (IMEI) নম্বর', 'ঘটনা সংঘটনের এলাকা বা থানার নাম']
            : ['Handset Brand, Model & 15-digit IMEI number', 'Incident location or Police Station jurisdiction']
          : isTheft
          ? isBn
            ? ['চুরি যাওয়া মালামালের সুনির্দিষ্ট বিবরণ ও আনুমানিক মূল্য', 'ঘটনা সংঘটনের এলাকা বা থানার নাম']
            : ['Itemized property description & estimated valuation', 'Incident location or police station name']
          : isBn
          ? ['ঘটনা সংঘটনের এলাকা বা থানার নাম', 'হুমকিদাতার ফোন নম্বর বা সোশ্যাল মিডিয়া প্রোফাইল লিঙ্ক (যদি জানা থাকে)']
          : ['Incident jurisdiction or police station name', 'Sender phone number or profile link (if known)'],
      },
    };
  }

  // -------------------------------------------------------------
  // DOMAIN 4: GENERIC / OTHER LEGAL INQUIRY FALLBACK (NO FAKE DRAFTS)
  // -------------------------------------------------------------
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
          ? 'ঘটনা সম্পর্কিত মূল তারিখ, লেনদেনের প্রমাণ এবং যোগাযোগের তথ্য লিপিবদ্ধ ও সংরক্ষণ করুন।'
          : 'Record relevant transaction dates, communication logs, and supporting documents.',
        sourceIds: ['constitution-31'],
      },
      {
        id: 'step-gen-2',
        text: isBn
          ? 'জাতীয় আইনি সহায়তা হেল্পলাইনে (১৬৬৯৯) যোগাযোগ করে আপনার এলাকার প্রযোজ্য সরকারি সেবা সম্পর্কে বিনামূল্যে পরামর্শ নিন।'
          : 'Contact National Legal Aid at 16699 to discover available governmental legal services in your area.',
        sourceIds: ['constitution-27'],
        officeId: nationalLegalAid.id,
      },
    ],
    explanation: [
      {
        text: isBn
          ? 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধানের অনুচ্ছেদ ৩১ অনুযায়ী প্রত্যেক নাগরিকের আইনানুযায়ী আচরণ পাওয়ার ও আইনের আশ্রয় লাভের অবিচ্ছেদ্য অধিকার রয়েছে।'
          : 'Article 31 of the Constitution establishes the inalienable right of every citizen to be treated only in accordance with law.',
        sourceIds: ['constitution-31'],
      },
    ],
    limitations: [
      isBn
        ? 'বর্তমানে MyLaws শ্রম অধিকার, সাধারণ ডায়েরি, ভোক্তা অধিকার ও মৌলিক সাংবিধানিক অধিকারের নির্বাচিত বিধানসমূহ সমর্থন করে। অন্যান্য বিষয়ে সরাসরি আইনি পরামর্শের জন্য আইনজীবীর স্মরণাপন্ন হোন।'
        : 'Currently MyLaws covers selected labour, general diary, consumer, and fundamental rights provisions. For other areas, consult a licensed advocate.',
    ],
    sourcePackVersion: SOURCE_VERSION,
    allowedDraftOptions: [], // NO DRAFT OFFERED FOR GENERIC / UNVERIFIED DOMAINS
    problemSummary: {
      identifiedIssue: isBn ? 'আইনি অধিকার ও সুরক্ষা পর্যালোচনা' : 'Legal Rights & Statutory Review',
      understanding: isBn
        ? 'আমরা আপনার বিষয়টি পর্যালোচনা করেছি। বাংলাদেশের আইন অনুসারে যে কোনো বিরোধ বা অধিকার লঙ্ঘনের ক্ষেত্রে আইনের আশ্রয় লাভের সাংবিধানিক অধিকার রয়েছে।'
        : 'We have analyzed your inquiry. Under Bangladesh law, remedies exist for protection of fundamental rights and lawful treatment.',
      additionalInfoNeeded: [],
    },
    plainLanguageExplanation: {
      heading: isBn
        ? 'সংবিধান ও আইনের সাধারণ বিধানাবলীর পর্যালোচনা'
        : 'Constitutional & General Statutory Protections',
      meaning: isBn
        ? 'সহজ কথায়, সংবিধান ও দেশের প্রচলিত আইন অনুযায়ী আপনার অধিকার সুরক্ষিত এবং আপনি যেকোনো অন্যায় বা বিরোধে সরকারি আইনি সহায়তা ও প্রতিকার লাভের পূর্ণ অধিকারী।'
        : 'In plain language, the Constitution of Bangladesh guarantees that no action detrimental to life, liberty, or property can be taken except in accordance with law.',
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
        ? 'আপনার কাছে থাকা নথিপত্র সংগ্রহ করুন এবং জাতীয় আইনি সহায়তা হেল্পলাইনে (১৬৬৯৯) যোগাযোগ করুন।'
        : 'Organize your documents and consult the National Legal Aid Hotline at 16699.'
    },
  };
}
