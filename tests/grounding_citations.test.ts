import { describe, it, expect } from 'vitest';
import { validateGroundedModelAnswer } from '../src/lib/meta';
import { provisions } from '../src/data/legal';

describe('Directive 5: Strict Grounding & Citation Integrity Guardrails', () => {
  const theftProvision = provisions.find((p) => p.id === 'penal-379')!;
  const consumerProvision = provisions.find((p) => p.id === 'consumer-60')!;
  const repealedCyberProvision = provisions.find((p) => p.id === 'cyber-25')!;

  it('rejects output when a model cites a hallucinated / non-candidate ID', () => {
    const res = validateGroundedModelAnswer(
      'Under Section 379, theft is punishable with imprisonment for up to 3 years.',
      ['penal-379', 'hallucinated-fake-section-999'],
      [theftProvision]
    );
    expect(res.isValid).toBe(false);
    expect(res.reason).toContain('Model cited unauthorized or hallucinated ID');
  });

  it('rejects output when a model attaches a valid section to an invented capital punishment / death penalty claim', () => {
    const res = validateGroundedModelAnswer(
      'Under Section 379 of the Penal Code 1860, the thief will be sentenced to the death penalty (মৃত্যুদণ্ড).',
      ['penal-379'],
      [theftProvision]
    );
    expect(res.isValid).toBe(false);
    expect(res.reason).toContain('Model fabricated death penalty claim unsupported by cited provisions');
  });

  it('rejects output when a model asserts specific statutory sections with zero citations', () => {
    const res = validateGroundedModelAnswer(
      'Under Section 379 of the Penal Code, theft is a crime.',
      [],
      [theftProvision]
    );
    expect(res.isValid).toBe(false);
    expect(res.reason).toContain('Model asserted specific statutory sections without citing supporting candidate sources');
  });

  it('rejects output when a model invents an unsupported short limitation deadline for consumer complaints', () => {
    const res = validateGroundedModelAnswer(
      'You must file a complaint within 24 hours of buying the product (২৪ ঘণ্টার মধ্যে অভিযোগ করতে হবে).',
      ['consumer-51'], // cites expired goods, but invents a 24-hour rule contradicting Sec 60
      [theftProvision, provisions.find((p) => p.id === 'consumer-51')!]
    );
    expect(res.isValid).toBe(false);
    expect(res.reason).toContain('contradicting Section 60');
  });

  it('rejects output when a model presents a repealed statute (CSA Section 25) as active governing law', () => {
    const res = validateGroundedModelAnswer(
      'Under Section 25 of the Cyber Security Act 2023, you can file a criminal case for offensive posts.',
      ['cyber-25'],
      [repealedCyberProvision]
    );
    expect(res.isValid).toBe(false);
    expect(res.reason).toContain('Model presented repealed statute [cyber-25] as active governing law without qualification');
  });

  it('allows model output when repealed statute is cited with explicit qualification regarding its repealed/transitional status', () => {
    const res = validateGroundedModelAnswer(
      'Under the former Section 25 of the Cyber Security Act 2023, speech was previously prosecuted, but this provision has been formally repealed under the 2025/2026 reforms.',
      ['cyber-25'],
      [repealedCyberProvision]
    );
    expect(res.isValid).toBe(true);
  });

  it('accepts valid, faithfully grounded statutory explanations with matching citations', () => {
    const res = validateGroundedModelAnswer(
      'দণ্ডবিধি ১৮৬০-এর ৩৭৯ ধারা অনুযায়ী বিনা অনুমতিতে কোনো সম্পত্তি সরিয়ে নেওয়া চুরির অপরাধ, যাতে অনধিক ৩ বছর পর্যন্ত কারাদণ্ড হতে পারে।',
      ['penal-379'],
      [theftProvision]
    );
    expect(res.isValid).toBe(true);
  });
});
