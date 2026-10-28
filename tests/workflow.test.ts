import { describe, it, expect } from 'vitest';
import { createLegalWorkflow } from '../src/lib/workflow';
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
});
