import { describe, it, expect } from 'vitest';
import { retrieve } from '../src/lib/retrieval';
import { createLegalWorkflow } from '../src/lib/workflow';
import { provisions } from '../src/data/legal';
import type { AnswerRequest } from '../src/types/contracts';

interface HeldoutCase {
  id: string;
  categoryType: 'ambiguous' | 'wrong_assumption' | 'historical' | 'exceptions' | 'cross_category' | 'out_of_scope';
  language: 'bn' | 'en' | 'banglish';
  text: string;
  expectedSourceIds: string[];
  expectedReasoning: string;
  expectedWorkflowStatus: 'completed' | 'clarifying' | 'unsupported';
  cautionFlag?: string;
}

export const HELDOUT_BENCHMARK_CASES: HeldoutCase[] = [
  // -------------------------------------------------------------
  // 1. AMBIGUOUS FACTS (5 Cases)
  // -------------------------------------------------------------
  {
    id: 'heldout-ambig-01',
    categoryType: 'ambiguous',
    language: 'bn',
    text: 'ম্যানেজার আমাকে খুব বকাঝকা করেছে এবং এ মাসের টাকা দেয়নি',
    expectedSourceIds: ['labour-123', 'labour-132'],
    expectedReasoning: 'Unclear whether private, EPZ, or domestic; requires workplace clarification under Labour Act 123',
    expectedWorkflowStatus: 'clarifying'
  },
  {
    id: 'heldout-ambig-02',
    categoryType: 'ambiguous',
    language: 'bn',
    text: 'আমার জমিতে অপরিচিত লোক এসে সাইনবোর্ড ঝুলিয়ে দিয়েছে',
    expectedSourceIds: ['land-crime-7', 'land-crime-4', 'sra-8', 'land-crime-8'],
    expectedReasoning: 'Unclear whether ongoing title dispute or criminal dispossession; points to Land Crime Act 7 or SRA 8',
    expectedWorkflowStatus: 'completed'
  },
  {
    id: 'heldout-ambig-03',
    categoryType: 'ambiguous',
    language: 'banglish',
    text: 'Online theke jinish kinsilam, product valo na ar shopkeeper kotha shune na',
    expectedSourceIds: ['consumer-45', 'consumer-47', 'consumer-60'],
    expectedReasoning: 'Unclear whether defective or failure to deliver promised specification; triggers consumer remedies',
    expectedWorkflowStatus: 'completed'
  },
  {
    id: 'heldout-ambig-04',
    categoryType: 'ambiguous',
    language: 'en',
    text: 'Police took my brother from our home last night without showing any papers.',
    expectedSourceIds: ['crpc-54', 'crpc-61', 'constitution-33'],
    expectedReasoning: 'Arrest without warrant safeguards under CrPC 54 and mandatory 24-hour Magistrate production under Section 61',
    expectedWorkflowStatus: 'completed'
  },
  {
    id: 'heldout-ambig-05',
    categoryType: 'ambiguous',
    language: 'bn',
    text: 'স্বামী ৩ মাস ধরে আমার সাথে থাকে না এবং খরচের টাকাও দেয় না',
    expectedSourceIds: ['mflo-9', 'family-court-2023-4', 'domestic-16'],
    expectedReasoning: 'Wife maintenance claim under MFLO Section 9 and Family Courts Act',
    expectedWorkflowStatus: 'completed'
  },

  // -------------------------------------------------------------
  // 2. WRONG ASSUMPTIONS & FALSE LEGAL CLAIMS (5 Cases)
  // -------------------------------------------------------------
  {
    id: 'heldout-false-01',
    categoryType: 'wrong_assumption',
    language: 'bn',
    text: 'দোকানদার আমাকে মেয়াদোত্তীর্ণ জুস বিক্রি করেছে, আমি কি ভোক্তা আইনে তার ফাঁসি বা মৃত্যুদণ্ড দিতে পারি?',
    expectedSourceIds: ['consumer-51', 'consumer-60'],
    expectedReasoning: 'Section 51 provides up to 1 year imprisonment or 50k Tk fine, NOT capital punishment or death penalty',
    expectedWorkflowStatus: 'completed',
    cautionFlag: 'Must reject fabricated death penalty claim'
  },
  {
    id: 'heldout-false-02',
    categoryType: 'wrong_assumption',
    language: 'en',
    text: 'A colleague posted an offensive opinion about politics on Facebook; can police arrest him under Section 25 of Cyber Security Act 2023?',
    expectedSourceIds: ['cyber-protection-core', 'cyber-25'],
    expectedReasoning: 'Section 25 of CSA 2023 has been abolished and repealed; online political speech is not a cybercrime under Cyber Protection Act 2026',
    expectedWorkflowStatus: 'completed',
    cautionFlag: 'Repealed provision must not be advised as active law'
  },
  {
    id: 'heldout-false-03',
    categoryType: 'wrong_assumption',
    language: 'en',
    text: 'Can I file an administrative consumer complaint to DNCRP 7 months after buying a defective phone without a cash memo?',
    expectedSourceIds: ['consumer-60', 'consumer-45'],
    expectedReasoning: 'Under Section 60, consumer complaints must be lodged within 30 days; claim is time-barred after 7 months',
    expectedWorkflowStatus: 'completed',
    cautionFlag: 'Must enforce 30-day limitation rule'
  },
  {
    id: 'heldout-false-04',
    categoryType: 'wrong_assumption',
    language: 'en',
    text: 'As an Additional Secretary in a government ministry, can I sue the government in ordinary Labour Court under Labour Act 2006 for promotion?',
    expectedSourceIds: ['labour-2-65', 'labour-132', 'labour-123', 'constitution-27'],
    expectedReasoning: 'Government civil servants are excluded from Bangladesh Labour Act 2006 under Section 1(4); Administrative Tribunal applies',
    expectedWorkflowStatus: 'completed',
    cautionFlag: 'Labour Act excluded for civil servants'
  },
  {
    id: 'heldout-false-05',
    categoryType: 'wrong_assumption',
    language: 'bn',
    text: 'পুলিশ কি আসামিকে আদালতে না পাঠিয়ে নিজের খুশিমতো ৫ দিন থানায় আটকে রেখে জেরা করতে পারে?',
    expectedSourceIds: ['crpc-61', 'constitution-33', 'crpc-167', 'constitution-35'],
    expectedReasoning: 'Under CrPC Section 61 and Constitution Art 33, police detention exceeding 24 hours without Magistrate order is strictly unconstitutional',
    expectedWorkflowStatus: 'completed',
    cautionFlag: '24-hour constitutional maximum'
  },

  // -------------------------------------------------------------
  // 3. HISTORICAL EVENTS & TRANSITIONAL LAWS (5 Cases)
  // -------------------------------------------------------------
  {
    id: 'heldout-history-01',
    categoryType: 'historical',
    language: 'en',
    text: 'A cyber case was filed against a journalist in 2021 under Digital Security Act Section 25; is that criminal proceeding still valid in 2026?',
    expectedSourceIds: ['cyber-protection-core', 'cyber-25'],
    expectedReasoning: 'DSA 2018 repealed; speech cases under Section 25 are stayed/withdrawn under transitional governance',
    expectedWorkflowStatus: 'completed'
  },
  {
    id: 'heldout-history-02',
    categoryType: 'historical',
    language: 'bn',
    text: '২০২৪ সালের জুলাই মাসে সামাজিক যোগাযোগমাধ্যমে পোস্টের কারণে হওয়া সাইবার নিরাপত্তা আইনের মামলাগুলোর বর্তমান আইনি অবস্থা কী?',
    expectedSourceIds: ['cyber-protection-core', 'cyber-25'],
    expectedReasoning: 'Cyber Security Act 2023 was repealed by Cyber Protection Ordinance 2025 and Cyber Protection Act 2026; political speech cases withdrawn',
    expectedWorkflowStatus: 'completed'
  },
  {
    id: 'heldout-history-03',
    categoryType: 'historical',
    language: 'bn',
    text: '২০১৫ সালে জাল দলিল দিয়ে আমাদের জমি বিক্রি করা হয়েছিল; ২০২৩ সালের নতুন ভূমি অপরাধ আইন কি পেছনের ঘটনায় প্রযোজ্য?',
    expectedSourceIds: ['penal-468', 'sra-39', 'land-crime-4'],
    expectedReasoning: 'Criminal laws generally cannot apply ex post facto (Constitution Art 35); Penal Code 468 and civil cancellation under SRA 39 apply',
    expectedWorkflowStatus: 'completed'
  },
  {
    id: 'heldout-history-04',
    categoryType: 'historical',
    language: 'en',
    text: 'I was terminated from my factory in 2021 and not paid; can I file a wage recovery suit in the Labour Court now in 2026?',
    expectedSourceIds: ['labour-132', 'labour-123'],
    expectedReasoning: 'Under Section 132(1) of Labour Act 2006, claims must be filed within 12 months; recovery is time-barred in Labour Court',
    expectedWorkflowStatus: 'completed'
  },
  {
    id: 'heldout-history-05',
    categoryType: 'historical',
    language: 'en',
    text: 'We were married in 2010 and divorced in 2025; can the wife claim her unpaid deferred dower in Family Court in 2026?',
    expectedSourceIds: ['mflo-10', 'family-court-2023-4', 'family-court-13'],
    expectedReasoning: 'Unpaid dower is a debt due upon dissolution; Family Courts Act 2023 governs recovery',
    expectedWorkflowStatus: 'completed'
  },

  // -------------------------------------------------------------
  // 4. EXCEPTIONS & STATUTORY BOUNDARIES (5 Cases)
  // -------------------------------------------------------------
  {
    id: 'heldout-except-01',
    categoryType: 'exceptions',
    language: 'en',
    text: 'A General Manager in a bank earning 3 lakh Taka with authority to fire employees was terminated; can he claim worker rights in Labour Court?',
    expectedSourceIds: ['labour-2-65', 'labour-33', 'labour-26'],
    expectedReasoning: 'Administrative/managerial employees with hire/fire powers are excluded from "worker" definition under Section 2(65)',
    expectedWorkflowStatus: 'completed'
  },
  {
    id: 'heldout-except-02',
    categoryType: 'exceptions',
    language: 'bn',
    text: 'নিজের বসতবাড়ি নির্মাণের প্রয়োজনে নিজ মালিকানাধীন জমি থেকে সীমিত মাটি কাটলে কি ভূমি অপরাধ আইনের ১৩ ধারা লঙ্ঘন হবে?',
    expectedSourceIds: ['land-crime-13'],
    expectedReasoning: 'Section 13 has a specific statutory proviso exempting limited earth-cutting on private land solely for constructing personal residences',
    expectedWorkflowStatus: 'completed'
  },
  {
    id: 'heldout-except-03',
    categoryType: 'exceptions',
    language: 'bn',
    text: 'বিয়ের সময় কনের বাবা স্বেচ্ছায় জামাতাকে একটি মোটরসাইকেল উপহার দিয়েছেন; পরে এটি কি যৌতুক হিসেবে মামলা করা যাবে?',
    expectedSourceIds: ['dowry-2018-2', 'dowry-2018-3'],
    expectedReasoning: 'Under Section 2 of Dowry Prohibition Act 2018, customary voluntary wedding gifts are excluded from the definition of illegal dowry',
    expectedWorkflowStatus: 'completed'
  },
  {
    id: 'heldout-except-04',
    categoryType: 'exceptions',
    language: 'en',
    text: 'Can a garment worker in Chittagong EPZ file an unpaid wage complaint directly to the general DIFE Labour Inspector?',
    expectedSourceIds: ['labour-123', 'labour-124a', 'constitution-27'],
    expectedReasoning: 'EPZ enterprises are excluded from ordinary DIFE inspectorate; BEPZA Industrial Relations Counsellors govern under EPZ Labour Act 2019',
    expectedWorkflowStatus: 'clarifying'
  },
  {
    id: 'heldout-except-05',
    categoryType: 'exceptions',
    language: 'en',
    text: 'Can police conduct a body search of an arrested female suspect without a female officer present?',
    expectedSourceIds: ['crpc-54', 'constitution-33', 'torture-prevention-15'],
    expectedReasoning: 'Under CrPC Section 52, search of a female detainee must strictly be conducted by another female with strict regard to decency',
    expectedWorkflowStatus: 'completed'
  },

  // -------------------------------------------------------------
  // 5. CROSS-CATEGORY SCENARIOS (5 Cases)
  // -------------------------------------------------------------
  {
    id: 'heldout-cross-01',
    categoryType: 'cross_category',
    language: 'bn',
    text: 'সাবেক স্বামী ইন্টারনেটে গোপন ভিডিও ছড়িয়ে দেওয়ার হুমকি দিয়ে পৈতৃক জমি লিখে দিতে ব্ল্যাকমেইল করছে',
    expectedSourceIds: ['pornography-8', 'penal-384', 'land-crime-4'],
    expectedReasoning: 'Pornography Act Section 8 (intimate video blackmail) + Penal Code 384 (extortion) + Land Crime Act (forced deed execution)',
    expectedWorkflowStatus: 'completed'
  },
  {
    id: 'heldout-cross-02',
    categoryType: 'cross_category',
    language: 'bn',
    text: 'মালিক শ্রমিকদের বেতন আটকে রেখে অফিসে তালা দিয়েছে এবং গুন্ডা দিয়ে মারধর করার হুমকি দিচ্ছে',
    expectedSourceIds: ['labour-123', 'penal-506', 'labour-132'],
    expectedReasoning: 'Labour Act Section 123 (wage arrears) + Penal Code Section 506 (criminal intimidation by hirelings)',
    expectedWorkflowStatus: 'completed'
  },
  {
    id: 'heldout-cross-03',
    categoryType: 'cross_category',
    language: 'en',
    text: 'An online seller delivered counterfeit drugs with a fake BSTI seal and threatened to beat me when I demanded a refund.',
    expectedSourceIds: ['bsti-24', 'consumer-41', 'consumer-45', 'penal-506'],
    expectedReasoning: 'BSTI Act Section 24 (fake seal) + Consumer Act Section 41 (fake medicine) + Penal Code 506 (threats)',
    expectedWorkflowStatus: 'completed'
  },
  {
    id: 'heldout-cross-04',
    categoryType: 'cross_category',
    language: 'bn',
    text: 'জাল দলিল তৈরি করে আমাদের জমি দখল করেছে এবং অভিযোগ দিলে ঘরে আগুন দেওয়ার হুমকি দিচ্ছে',
    expectedSourceIds: ['land-crime-4', 'land-crime-7', 'penal-506', 'land-crime-8'],
    expectedReasoning: 'Land Crime Act 4 & 7 (forgery & illegal possession) + Penal Code 506 (criminal intimidation) + Section 8 (possession recovery)',
    expectedWorkflowStatus: 'completed'
  },
  {
    id: 'heldout-cross-05',
    categoryType: 'cross_category',
    language: 'en',
    text: 'Husband took second marriage without permission, beat wife for 5 lakh dowry, and threw her out of matrimonial home.',
    expectedSourceIds: ['mflo-6', 'dowry-2018-3', 'domestic-14', 'domestic-15'],
    expectedReasoning: 'MFLO Section 6 (polygamy) + Dowry Act 2018 Section 3 (dowry assault) + Domestic Violence Act Section 14 (protection order)',
    expectedWorkflowStatus: 'completed'
  },

  // -------------------------------------------------------------
  // 6. INSUFFICIENT COVERAGE / OUT-OF-SCOPE (5 Cases)
  // -------------------------------------------------------------
  {
    id: 'heldout-scope-01',
    categoryType: 'out_of_scope',
    language: 'en',
    text: 'Our merchant container vessel collided in international maritime waters near Singapore; what admiralty jurisdiction applies?',
    expectedSourceIds: ['constitution-31'],
    expectedReasoning: 'Out of scope: Admiralty Court Act / International maritime collision law; requires licensed maritime counsel',
    expectedWorkflowStatus: 'unsupported'
  },
  {
    id: 'heldout-scope-02',
    categoryType: 'out_of_scope',
    language: 'en',
    text: 'A software company in California copied my patent algorithm; how do I file a patent infringement lawsuit in US Federal Court in San Jose?',
    expectedSourceIds: ['constitution-31'],
    expectedReasoning: 'Out of scope: Foreign US federal patent jurisdiction; MyLaws covers Bangladesh domestic statutes only',
    expectedWorkflowStatus: 'unsupported'
  },
  {
    id: 'heldout-scope-03',
    categoryType: 'out_of_scope',
    language: 'bn',
    text: 'আমার লেখা মৌলিক বাংলা উপন্যাসের কপিরাইট নিবন্ধন করার জন্য কপিরাইট অফিসে আবেদন করার পদ্ধতি কী?',
    expectedSourceIds: ['constitution-31'],
    expectedReasoning: 'Out of scope: Copyright Act 2000 registration procedures; outside the 7 pilot statutory categories',
    expectedWorkflowStatus: 'completed'
  },
  {
    id: 'heldout-scope-04',
    categoryType: 'out_of_scope',
    language: 'en',
    text: 'How do I declare my commercial partnership business legally bankrupt under the Bankruptcy Act 1997?',
    expectedSourceIds: ['constitution-31'],
    expectedReasoning: 'Out of scope: Corporate bankruptcy and insolvency proceedings under Bankruptcy Act 1997',
    expectedWorkflowStatus: 'completed'
  },
  {
    id: 'heldout-scope-05',
    categoryType: 'out_of_scope',
    language: 'bn',
    text: 'বাংলাদেশে হিন্দু উত্তরাধিকার আইন অনুযায়ী নিঃসন্তান বিধবা নারী কি স্বামীর সম্পত্তির পূর্ণ মালিকানা পান?',
    expectedSourceIds: ['constitution-31', 'constitution-27'],
    expectedReasoning: 'Out of scope: Hindu Women’s Rights to Property Act 1937 / Hindu personal law; outside the Muslim/statutory pilot scope',
    expectedWorkflowStatus: 'completed'
  }
];

describe('Held-Out 30-Question Evaluation Benchmark', () => {
  it('evaluates lexical retrieval and citation integrity across in-scope held-out questions (Categories 1-5)', () => {
    const inScopeCases = HELDOUT_BENCHMARK_CASES.filter(c => c.categoryType !== 'out_of_scope');
    let top3MatchCount = 0;
    const failures: Array<{ id: string; query: string; expected: string[]; got: string[] }> = [];

    for (const testCase of inScopeCases) {
      const matches = retrieve(testCase.text, 3);
      const topIds = matches.map((m) => m.provision.id);

      const hasTopMatch = testCase.expectedSourceIds.some((expId) => topIds.includes(expId));
      if (hasTopMatch) {
        top3MatchCount += 1;
      } else {
        failures.push({
          id: testCase.id,
          query: testCase.text,
          expected: testCase.expectedSourceIds,
          got: topIds,
        });
      }
    }

    const accuracy = (top3MatchCount / inScopeCases.length) * 100;
    console.log(`\n==========================================================`);
    console.log(`HELD-OUT IN-SCOPE RETRIEVAL RESULTS:`);
    console.log(`  Total Evaluated: ${inScopeCases.length}`);
    console.log(`  Top-3 Accuracy: ${top3MatchCount}/${inScopeCases.length} (${accuracy.toFixed(1)}%)`);
    console.log(`==========================================================\n`);

    if (failures.length > 0) {
      console.warn(`Held-out benchmark queries missing top-3:`);
      for (const f of failures) {
        console.warn(`  [${f.id}] Expected: ${f.expected.join(', ')} | Got: ${f.got.join(', ')}`);
      }
    }

    // Expect at least 90% top-3 accuracy on challenging held-out queries
    expect(accuracy).toBeGreaterThanOrEqual(90.0);
  });

  it('evaluates workflow status handling on foreign and out-of-scope jurisdictions', () => {
    const foreignCase = HELDOUT_BENCHMARK_CASES.find(c => c.id === 'heldout-scope-02')!;
    const req: AnswerRequest = {
      requestId: 'test-req-heldout-foreign',
      originalMessage: foreignCase.text,
      language: 'en',
      facts: [],
      conversationHistory: [],
      location: null,
      date: null,
      requestedMode: 'online',
    };
    const res = createLegalWorkflow(req, 'online');
    expect(res.status).toBe('unsupported');
    expect(res.userFacts.some(f => f.fieldId === 'jurisdiction' && f.value === 'Outside Bangladesh')).toBe(true);
  });

  it('evaluates maritime international waters case rejection', () => {
    const maritimeCase = HELDOUT_BENCHMARK_CASES.find(c => c.id === 'heldout-scope-01')!;
    const req: AnswerRequest = {
      requestId: 'test-req-heldout-maritime',
      originalMessage: maritimeCase.text,
      language: 'en',
      facts: [],
      conversationHistory: [],
      location: null,
      date: null,
      requestedMode: 'online',
    };
    const res = createLegalWorkflow(req, 'online');
    expect(res.status).toBe('unsupported');
  });
});
