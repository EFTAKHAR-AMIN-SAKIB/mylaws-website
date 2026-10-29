import { describe, it, expect } from 'vitest';
import { createLegalWorkflow } from '../src/lib/workflow';
import {
  isFollowUpQuery,
  generateFollowUpResponse,
  isGreetingQuery,
  isCapabilityQuery,
  detectInputLanguage,
  isPrimaryLegalInquiry,
} from '../src/lib/followup';
import type { AnswerRequest } from '../src/types/contracts';

describe('Action Checklist & Legal Workflow Engine', () => {
  it('generates practical Action Checklist with 3-5 steps for wage query', () => {
    const req: AnswerRequest = {
      requestId: 'test-1',
      originalMessage: 'আমার মালিক দুই মাসের বেতন দেয়নি',
      language: 'bn',
      facts: [],
    };

    const res = createLegalWorkflow(req);
    expect(res.checklist.length).toBeGreaterThanOrEqual(3);
    expect(res.checklist.length).toBeLessThanOrEqual(5);

    // Should include labour section references and DIFE referral
    const stepSourceIds = res.checklist.flatMap((s) => s.sourceIds || []);
    expect(stepSourceIds).toContain('labour-123');
    expect(res.checklist.some((s) => s.officeId === 'bd-dife-hq')).toBe(true);
    expect(res.allowedDraftOptions).toContain('dife');
  });

  it('prompts clarification when critical facts (workplace, employment type) are missing', () => {
    const req: AnswerRequest = {
      requestId: 'test-clarify',
      originalMessage: 'amr boss 2 mash er beton deynai ami ki krbo',
      language: 'bn',
      facts: [],
    };

    const res = createLegalWorkflow(req);
    expect(res.status).toBe('clarifying');
    expect(res.questions.length).toBeGreaterThan(0);
    expect(res.questions.length).toBeLessThanOrEqual(2);
  });

  it('resolves clarification when facts are supplied', () => {
    const req: AnswerRequest = {
      requestId: 'test-resolved',
      originalMessage: 'আমার মালিক দুই মাসের বেতন দেয়নি',
      language: 'bn',
      facts: [
        { fieldId: 'workplace', value: 'Dhaka, Mirpur', status: 'user_confirmed', provenance: 'user' },
        { fieldId: 'employment', value: 'private', status: 'user_confirmed', provenance: 'user' },
      ],
    };

    const res = createLegalWorkflow(req);
    expect(res.status).toBe('completed');
    expect(res.questions.length).toBe(0);
  });

  it('handles threats with GD Action Checklist and Penal Code sections', () => {
    const req: AnswerRequest = {
      requestId: 'test-gd',
      originalMessage: 'আমাকে অচেনা লোক হুমকি দিচ্ছে, জিডি করতে চাই',
      language: 'bn',
      facts: [],
    };

    const res = createLegalWorkflow(req);
    expect(res.checklist.length).toBeGreaterThanOrEqual(3);
    expect(res.allowedDraftOptions).toContain('gd');
    expect(res.explanation.some((c) => c.sourceIds.includes('penal-503'))).toBe(true);
  });

  it('handles consumer complaints with DNCRP workflow and 4 steps', () => {
    const req: AnswerRequest = {
      requestId: 'test-consumer',
      originalMessage: 'অনলাইনে নকল পণ্য দিয়ে প্রতারণা করেছে, টাকা ফেরত দিচ্ছে না',
      language: 'bn',
      facts: [],
    };

    const res = createLegalWorkflow(req);
    expect(res.problemSummary?.identifiedIssue).toContain('ভোক্তা অধিকার');
    expect(res.plainLanguageExplanation?.meaning).toBeDefined();
    expect(res.draftOffer?.documentType).toBe('dncrp');
    expect(res.allowedDraftOptions).toContain('dncrp');
  });

  it('declines contradictory claims (e.g. paid in full)', () => {
    const req: AnswerRequest = {
      requestId: 'test-contradiction',
      originalMessage: 'আমি পুরো বেতন পেয়েছি, এখন কি শ্রম আদালতে মামলা করব?',
      language: 'bn',
      facts: [],
    };

    const res = createLegalWorkflow(req);
    expect(res.status).toBe('unsupported');
    expect(res.checklist.length).toBe(0);
  });

  it('declines foreign jurisdiction (e.g. Kolkata / India)', () => {
    const req: AnswerRequest = {
      requestId: 'test-foreign',
      originalMessage: 'আমি কলকাতায় একটি দোকানে কাজ করতাম, বেতন দেয়নি',
      language: 'bn',
      facts: [],
    };

    const res = createLegalWorkflow(req);
    expect(res.status).toBe('unsupported');
    expect(res.explanation[0].text).toContain('শুধুমাত্র বাংলাদেশের');
  });

  it('correctly routes mobile phone theft to Penal Code 379 and Police GD with all 4 steps', () => {
    const req: AnswerRequest = {
      requestId: 'test-mobile-theft',
      originalMessage: 'my mobile has stolen today 9:45. so what should i do?',
      language: 'en',
      facts: [],
    };

    const res = createLegalWorkflow(req);
    // Step 1: Specific identified issue
    expect(res.problemSummary?.identifiedIssue).toBe('Mobile Phone Theft & Police General Diary (GD)');
    expect(res.problemSummary?.understanding).toContain('stolen');
    expect(res.problemSummary?.understanding).toContain('Penal Code 1860');

    // Inferred incident date from text
    const dateFact = res.userFacts.find((f) => f.fieldId === 'incident_date');
    expect(dateFact?.value).toContain('today 9:45');

    // Step 2: Distinct heading & statutory meaning
    expect(res.plainLanguageExplanation?.heading).toBe('Penal Code 1860 (Section 379) & Statutory GD Provisions');
    expect(res.plainLanguageExplanation?.meaning).toContain('Section 379');
    expect(res.plainLanguageExplanation?.whatToDoNext).toContain('IMEI');

    // Step 3: 4 Action steps (IMEI, SIM suspend, Thana GD, Tracking)
    expect(res.checklist.length).toBe(4);
    expect(res.checklist[0].id).toBe('step-theft-1');
    expect(res.checklist[0].text).toContain('IMEI');
    expect(res.checklist[1].id).toBe('step-theft-2');
    expect(res.checklist[1].text).toContain('121');
    expect(res.checklist[2].id).toBe('step-theft-3');
    expect(res.checklist[2].sourceIds).toContain('police-44-gd');
    expect(res.checklist[3].id).toBe('step-theft-4');

    // Step 4: GD Draft Offer
    expect(res.draftOffer).toBeDefined();
    expect(res.draftOffer?.documentType).toBe('gd');
    expect(res.draftOffer?.documentTitle).toBe('General Diary (GD) Application for Stolen Mobile Phone');
    expect(res.draftOffer?.missingDetails).toContain('Handset Brand, Model & 15-digit IMEI number');
  });

  it('correctly identifies knife assault and weapon hurt as Criminal FIR instead of theft', () => {
    const req: AnswerRequest = {
      requestId: 'test-knife-assault',
      originalMessage:
        'ami kalre rate rasta diye jayar somoy ekjon amake churi diye aghat koreche ekhon ami tar biruddhe ki korte pari ?',
      language: 'bn',
      facts: [],
    };

    const res = createLegalWorkflow(req);
    // Step 1: Physical assault & FIR, NOT mobile theft
    expect(res.problemSummary?.identifiedIssue).toContain('মারধর, ধারালো অস্ত্রের আঘাত ও ফৌজদারি এজাহার');
    expect(res.problemSummary?.understanding).toContain('ছুরি বা মারাত্মক অস্ত্র');

    // Step 2: Penal Code 323/324 & CrPC 154
    expect(res.plainLanguageExplanation?.heading).toContain('ধারা ৩২৩/৩২৪');
    expect(res.plainLanguageExplanation?.meaning).toContain('ইনজুরি সার্টিফিকেট');

    // Step 3: Medical hospital & FIR steps
    expect(res.checklist.length).toBe(4);
    expect(res.checklist[0].id).toBe('step-assault-1');
    expect(res.checklist[0].text).toContain('সরকারি হাসপাতাল');
    expect(res.checklist[2].id).toBe('step-assault-3');
    expect(res.checklist[2].text).toContain('এজাহার (FIR)');

    // Step 4: FIR draft offer
    expect(res.draftOffer?.documentTitle).toContain('এজাহার (FIR)');
  });

  it('preserves legal issue domain across follow-up conversational turns', () => {
    const followUpReq: AnswerRequest = {
      requestId: 'test-followup',
      originalMessage: 'police jodi amar mamla na ney tahole ami ki korte pari?',
      language: 'bn',
      facts: [
        {
          fieldId: 'issue_type',
          value: 'police_fir_assault',
          status: 'user_confirmed',
          provenance: 'conversation_history',
        },
      ],
      conversationHistory: [
        {
          role: 'user',
          content: 'ami kalre rate rasta diye jayar somoy ekjon amake churi diye aghat koreche',
        },
        {
          role: 'assistant',
          content: 'ফৌজদারি এজাহার ও হাসপাতালের ইনজুরি রিপোর্ট সংক্রান্ত আইনি পরামর্শ',
        },
      ],
    };

    const res = createLegalWorkflow(followUpReq);
    expect(res.allowedDraftOptions).toContain('gd');
    expect(res.problemSummary?.identifiedIssue).toContain('ফৌজদারি এজাহার');
  });

  it('accurately identifies shop inventory theft (dokan theke maal cori) with Penal Code 380 and FIR', () => {
    const req: AnswerRequest = {
      requestId: 'test-shop-theft-1',
      originalMessage: 'amar dokan theke maal cori hoyeche, ekhon ami ki korbo?',
      language: 'bn',
      facts: [],
    };

    const res = createLegalWorkflow(req);
    expect(res.problemSummary?.identifiedIssue).toContain('দোকান থেকে মালামাল চুরি');
    expect(res.problemSummary?.understanding).toContain('৩৮০');
    expect(res.checklist[0].id).toBe('step-shop-1');
    expect(res.checklist[0].sourceIds).toContain('penal-380');
    expect(res.checklist[0].requiredDocuments?.some((d) => d.includes('ট্রেড লাইসেন্স') || d.includes('ইনভেন্টরি'))).toBe(true);
    expect(res.checklist[0].helpfulEvidence?.some((e) => e.includes('সিসিটিভি'))).toBe(true);
    expect(res.draftOffer?.documentTitle).toContain('দোকানে মালামাল চুরি');
  });

  it('generates focused conversational follow-up response for evidence inquiry', () => {
    const history = [
      { role: 'user' as const, content: 'amar dokan theke maal cori hoyeche, ekhon ami ki korbo?' },
      { role: 'assistant' as const, content: 'দোকান চুরির আইনগত প্রতিকার ও এজাহার নির্দেশিকা' },
    ];
    const followUpQuery = 'eitar jonno ki ki proman ba kagojpotro lagte pare?';

    expect(isFollowUpQuery(followUpQuery, history.length)).toBe(true);

    const followUpRes = generateFollowUpResponse({
      query: followUpQuery,
      language: 'bn',
      conversationHistory: history,
      facts: [{ fieldId: 'issue_type', value: 'police_fir_shop_theft', status: 'user_confirmed', provenance: 'test' }],
      issueType: 'police_fir_shop_theft',
    });

    expect(followUpRes.directAnswer).toContain('দোকান থেকে মালামাল চুরি');
    expect(followUpRes.keyPoints?.length).toBeGreaterThanOrEqual(3);
    expect(followUpRes.keyPoints?.some((p: string) => p.includes('ট্রেড লাইসেন্স') || p.includes('মালিকানা'))).toBe(true);
    expect(followUpRes.keyPoints?.some((p: string) => p.includes('সিসিটিভি') || p.includes('ডিজিটাল'))).toBe(true);
    expect(followUpRes.sourceIds).toContain('penal-380');
    expect(followUpRes.suggestedNextStep).toBeDefined();
  });

  it('generates focused simplification for "bujhlam na, sohoj kore bolun"', () => {
    const res = generateFollowUpResponse({
      query: 'bujhlam na, sohoj kore bolun',
      language: 'bn',
      conversationHistory: [{ role: 'user' as const, content: 'police mamla nibe na' }],
      facts: [],
      issueType: 'police_fir_shop_theft',
    });

    expect(res.directAnswer).toContain('সহজ করে বলি');
    expect(res.keyPoints?.length).toBeGreaterThan(0);
  });

  it('handles fact correction "na, beton 20 hajar noy, 12 hajar"', () => {
    const res = generateFollowUpResponse({
      query: 'না, বেতন ২০ হাজার নয়, ১২ হাজার।',
      language: 'bn',
      conversationHistory: [{ role: 'user' as const, content: 'beton baki' }],
      facts: [{ fieldId: 'unpaid_months', value: '2', status: 'user_confirmed', provenance: 'test' }],
      issueType: 'wage_arrears',
    });

    expect(res.directAnswer).toContain('সংশোধন করে নিলাম');
    expect(res.updatedFact?.value).toContain('১২');
  });

  it('handles "police jodi mamla na ney" with CrPC 156(3) magistrate CR case', () => {
    const res = generateFollowUpResponse({
      query: 'police jodi amar mamla na ney tahole ami ki korte pari?',
      language: 'bn',
      conversationHistory: [{ role: 'user' as const, content: 'amar dokan theke maal cori hoyeche' }],
      facts: [],
      issueType: 'police_fir_shop_theft',
    });

    expect(res.directAnswer).toContain('থানা পুলিশ আপনার অভিযোগ বা জিডি গ্রহণ করতে অপারগতা');
    expect(res.keyPoints?.some((p: string) => p.includes('সার্কেল এএসপি') || p.includes('এসপি'))).toBe(true);
    expect(res.keyPoints?.some((p: string) => p.includes('১৫৬(৩)') || p.includes('সিআর'))).toBe(true);
  });

  it('accurately identifies motorbike/vehicle theft (bike cori) and does not misclassify as mobile phone', () => {
    const req: AnswerRequest = {
      requestId: 'test-bike-theft-1',
      originalMessage: 'kale amr bike cori hoyeche, ami ekhon ki korbo',
      language: 'bn',
      facts: [],
    };

    const res = createLegalWorkflow(req);

    // Issue title & identification must be bike/vehicle theft
    expect(res.problemSummary?.identifiedIssue).toContain('মোটরসাইকেল / বাইক চুরি');
    
    // Understanding should be warm & conversational, addressing bike theft
    expect(res.problemSummary?.understanding).toContain('বাইক');
    expect(res.problemSummary?.understanding).toContain('বিআরটিএ');
    expect(res.problemSummary?.understanding).not.toContain('মোবাইল');
    expect(res.problemSummary?.understanding).not.toContain('আইএমইআই');
    expect(res.problemSummary?.understanding).not.toContain('সিম');

    // Checklist must include vehicle-specific steps (BRTA registration, engine & chassis, CCTV, checkpost alert)
    expect(res.checklist[0].id).toBe('step-vehicle-1');
    expect(res.checklist[0].text).toContain('বিআরটিএ রেজিস্ট্রেশন');
    expect(res.checklist[0].text).toContain('ইঞ্জিন নম্বর, চেসিস নম্বর');
    expect(res.checklist[0].requiredDocuments?.some((d) => d.includes('বিআরটিএ') || d.includes('ব্লু-বুক'))).toBe(true);
    expect(res.checklist[1].id).toBe('step-vehicle-2');
    expect(res.checklist[1].text).toContain('সিসিটিভি');
    expect(res.checklist[3].id).toBe('step-vehicle-4');
    expect(res.checklist[3].text).toContain('ওয়্যারলেস বার্তা');

    // Draft offer must be for motorbike GD
    expect(res.draftOffer?.documentTitle).toContain('মোটরসাইকেল / বাইক চুরি');
    expect(res.draftOffer?.description).toContain('ইঞ্জিন ও চেসিস নম্বর');
  });

  it('provides vehicle-specific follow-up answers for bike theft documents & where to go', () => {
    const history = [
      { role: 'user' as const, content: 'kale amr bike cori hoyeche, ami ekhon ki korbo' },
      { role: 'assistant' as const, content: 'মোটরসাইকেল / বাইক চুরি সংক্রান্ত আইনি নির্দেশনা' },
    ];

    // Follow-up 1: Documents inquiry
    const docRes = generateFollowUpResponse({
      query: 'amar kache ki ki proman ba kagojpotro lagte pare?',
      language: 'bn',
      conversationHistory: history,
      facts: [{ fieldId: 'issue_type', value: 'police_gd_vehicle_theft', status: 'user_confirmed', provenance: 'test' }],
      issueType: 'police_gd_vehicle_theft',
    });

    expect(docRes.directAnswer).toContain('বাইক চুরির ঘটনায়');
    expect(docRes.keyPoints?.some((p) => p.includes('বিআরটিএ রেজিস্ট্রেশন') || p.includes('Blue Book'))).toBe(true);
    expect(docRes.keyPoints?.some((p) => p.includes('ইঞ্জিন নম্বর ও চেসিস নম্বর'))).toBe(true);
    expect(docRes.keyPoints?.some((p) => p.includes('ট্যাক্স টোকেন'))).toBe(true);
    expect(docRes.keyPoints?.every((p) => !p.includes('IMEI') && !p.includes('১২১'))).toBe(true);

    // Follow-up 2: Simplification inquiry
    const simpRes = generateFollowUpResponse({
      query: 'bujhlam na, sohoj kore bolun',
      language: 'bn',
      conversationHistory: history,
      facts: [{ fieldId: 'issue_type', value: 'police_gd_vehicle_theft', status: 'user_confirmed', provenance: 'test' }],
      issueType: 'police_gd_vehicle_theft',
    });

    expect(simpRes.directAnswer).toContain('বাইক চুরি হলে');
    expect(simpRes.directAnswer).toContain('ওয়্যারলেস বার্তার (W/T message)');
    expect(simpRes.directAnswer).toContain('বিআরটিএ ডেটাবেজে গাড়িটি লক');

    // Follow-up 3: Where to go first
    const whereRes = generateFollowUpResponse({
      query: 'ami age kothay jabo?',
      language: 'bn',
      conversationHistory: history,
      facts: [{ fieldId: 'issue_type', value: 'police_gd_vehicle_theft', status: 'user_confirmed', provenance: 'test' }],
      issueType: 'police_gd_vehicle_theft',
    });

    expect(whereRes.directAnswer).toContain('বাইকটি চুরি হয়েছে, সেই এলাকার সংশ্লিষ্ট থানা');
    expect(whereRes.keyPoints?.some((p) => p.includes('বিআরটিএ (BRTA)'))).toBe(true);
  });

  it('accurately identifies "hi" and greetings without generating arbitrary legal case cards', () => {
    expect(isGreetingQuery('hi')).toBe(true);
    expect(isGreetingQuery('hello')).toBe(true);
    expect(isGreetingQuery('assalamu alaikum')).toBe(true);
    expect(isGreetingQuery('kemon achen?')).toBe(true);
    expect(isGreetingQuery('kale amr bike cori hoyeche, ami ekhon ki korbo')).toBe(false);

    const req: AnswerRequest = {
      requestId: 'test-greeting-1',
      originalMessage: 'hi',
      language: 'en',
      facts: [],
    };

    const res = createLegalWorkflow(req);
    expect(res.isGreeting).toBe(true);
    expect(res.isFollowUp).toBe(true);
    expect(res.checklist).toHaveLength(0);
    expect(res.followUpResponse?.directAnswer).toContain('MyLaws');
    expect(res.followUpResponse?.directAnswer).toContain('How can I assist you today?');
  });

  it('accurately identifies "what you can provide me?" and provides 4-pillar capability overview', () => {
    expect(isCapabilityQuery('what you can provide me?')).toBe(true);
    expect(isCapabilityQuery('what can you do')).toBe(true);
    expect(isCapabilityQuery('how can you help me?')).toBe(true);
    expect(isCapabilityQuery('tumi ki ki korte paro?')).toBe(true);
    expect(isCapabilityQuery('kale amr bike cori hoyeche, ami ekhon ki korbo')).toBe(false);

    const req: AnswerRequest = {
      requestId: 'test-cap-1',
      originalMessage: 'what you can provide me?',
      language: 'en',
      facts: [],
    };

    const res = createLegalWorkflow(req);
    expect(res.isCapability).toBe(true);
    expect(res.isFollowUp).toBe(true);
    expect(res.checklist).toHaveLength(0);
    expect(res.followUpResponse?.directAnswer).toContain('can provide you');
    expect(res.followUpResponse?.directAnswer).toContain('MyLaws');
    expect(res.followUpResponse?.directAnswer).toContain('Verified Statutory Guidance');
    expect(res.followUpResponse?.directAnswer).toContain('Step-by-Step Action Checklist');
    expect(res.followUpResponse?.directAnswer).toContain('Ready-to-Print Legal Drafts');
    expect(res.followUpResponse?.directAnswer).toContain('Official Emergency Helplines');
    expect(res.followUpResponse?.keyPoints).toHaveLength(4);
  });

  it('detects input language accurately for English, Bengali, and Banglish', () => {
    expect(detectInputLanguage('what you can provide me?')).toBe('en');
    expect(detectInputLanguage('hi')).toBe('en');
    expect(detectInputLanguage('hello how can you help me')).toBe('en');
    expect(detectInputLanguage('আমার বাইক চুরি হয়েছে')).toBe('bn');
    expect(detectInputLanguage('kale amr bike cori hoyeche, ami ekhon ki korbo')).toBe('bn');
    expect(detectInputLanguage('amar 2 mash er beton baki')).toBe('bn');
  });

  it('transitions from greeting/capability to full canonical workflow when user introduces bike theft', () => {
    const history = [
      { role: 'user' as const, content: 'hi' },
      { role: 'assistant' as const, content: 'Hello! I am MyLaws...' },
      { role: 'user' as const, content: 'what you can provide me?' },
      { role: 'assistant' as const, content: 'Here is what MyLaws can provide you...' },
    ];

    const bikeQuery = 'kale amr bike cori hoyeche, ami ekhon ki korbo';
    expect(isPrimaryLegalInquiry(bikeQuery)).toBe(true);
    expect(isFollowUpQuery(bikeQuery, history.length)).toBe(false);

    const req: AnswerRequest = {
      requestId: 'test-turn-3-bike',
      originalMessage: bikeQuery,
      language: 'bn',
      facts: [],
      conversationHistory: history,
    };

    const res = createLegalWorkflow(req);
    // Must be a full canonical workflow, NOT a canned greeting or follow-up
    expect(res.isGreeting).toBeFalsy();
    expect(res.isCapability).toBeFalsy();
    expect(res.problemSummary?.identifiedIssue).toContain('মোটরসাইকেল / বাইক চুরি');
    expect(res.checklist.length).toBe(4);
    expect(res.checklist[0].id).toBe('step-vehicle-1');
    expect(res.draftOffer?.documentTitle).toContain('মোটরসাইকেল / বাইক চুরি');
  });
});
