import { describe, it, expect } from 'vitest';
import { POST as answerRoute } from '../src/app/api/answer/route';
import { NextRequest } from 'next/server';

const hasCitation = (r: any, idPattern: string) => {
  const inRelevant = r.relevantProvisions?.some((p: any) => p.id?.includes(idPattern) || p.section?.includes(idPattern));
  const inExplanation = r.explanation?.some((e: any) => e.sourceIds?.some((s: string) => s.includes(idPattern)));
  const inChecklist = r.checklist?.some((c: any) => c.sourceIds?.some((s: string) => s.includes(idPattern)));
  return inRelevant || inExplanation || inChecklist;
};

describe('Demonstrate Corrected Answers Runtime Suite (/api/answer)', () => {
  // Case 1: Expired Medicine
  it('handles expired medicine citing Section 51, 60, and 76(4) 25% reward', async () => {
    const req = new NextRequest('http://localhost:3000/api/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestId: 'test_exp_' + Date.now(),
        originalMessage: 'ফার্মেসিতে আমাকে ৬ মাস আগের মেয়াদোত্তীর্ণ অ্যান্টিবায়োটিক ওষুধ বিক্রি করেছে, এখন টাকা ফেরত দিচ্ছে না',
        language: 'bn',
        facts: [],
      }),
    });
    const res = await answerRoute(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('completed');
    expect(hasCitation(data, 'consumer-51')).toBe(true);
    expect(hasCitation(data, 'consumer-60')).toBe(true);
    expect(hasCitation(data, 'consumer-76')).toBe(true);
    const str = JSON.stringify(data);
    expect(str.includes('২৫') || str.includes('25%')).toBe(true);
    expect(str.includes('১০০% বাধ্যতামূলক নগদ ফেরত')).toBe(false);
  });

  // Case 1B: Section 41 Adulterated Goods Sale
  it('handles knowingly selling adulterated goods/medicines citing Section 41', async () => {
    const req = new NextRequest('http://localhost:3000/api/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestId: 'test_adulteration_' + Date.now(),
        originalMessage: 'দোকানদার জেনেবুঝে আমাকে ভেজাল ও ক্ষতিকর রাসায়নিকযুক্ত ওষুধ বিক্রি করেছে',
        language: 'bn',
        facts: [],
      }),
    });
    const res = await answerRoute(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('completed');
    expect(hasCitation(data, 'consumer-41')).toBe(true);
    const str = JSON.stringify(data);
    expect(str).toContain('ধারা ৪১');
    expect(str).toContain('জ্ঞাতসারে');
  });

  // Case 1C: Section 42 Prohibited Harmful Substances Mixing in Food
  it('handles mixing prohibited substances into food citing Section 42', async () => {
    const req = new NextRequest('http://localhost:3000/api/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestId: 'test_mixing_' + Date.now(),
        originalMessage: 'হোটেলে খাদ্যপণ্যে ক্ষতিকর বিষাক্ত রাসায়নিক ও নিষিদ্ধ উপাদান মেশানো হচ্ছে',
        language: 'bn',
        facts: [],
      }),
    });
    const res = await answerRoute(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('completed');
    expect(hasCitation(data, 'consumer-42')).toBe(true);
    const str = JSON.stringify(data);
    expect(str).toContain('ধারা ৪২');
  });

  // Case 1D: Section 46 Short Weight & Section 48 Short Measure
  it('handles short measure (petrol pump / liquids) citing Section 48', async () => {
    const req = new NextRequest('http://localhost:3000/api/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestId: 'test_measure_' + Date.now(),
        originalMessage: 'পেট্রোল পাম্পে মিটার কারচুপি করে প্রতি লিটারে পরিমাপে কম দিচ্ছে',
        language: 'bn',
        facts: [],
      }),
    });
    const res = await answerRoute(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('completed');
    expect(hasCitation(data, 'consumer-48')).toBe(true);
  });

  // Case 1E: Section 50 Counterfeit Manufacture
  it('handles counterfeit manufacture citing Section 50 without confusing with sale', async () => {
    const req = new NextRequest('http://localhost:3000/api/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestId: 'test_counterfeit_' + Date.now(),
        originalMessage: 'একটি কারখানায় নকল ব্র্যান্ডের পণ্য প্রস্তুত ও উৎপাদন করা হচ্ছে',
        language: 'bn',
        facts: [],
      }),
    });
    const res = await answerRoute(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('completed');
    expect(hasCitation(data, 'consumer-50')).toBe(true);
    const str = JSON.stringify(data);
    expect(str).toContain('প্রস্তুত বা উৎপাদন');
  });

  // Case 2: Land Crime Act Section 13 & 19(1)
  it('preserves Land Crime Act Section 13 3 cumulative conditions and Section 19(1) bailable status', async () => {
    const req = new NextRequest('http://localhost:3000/api/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestId: 'test_land_' + Date.now(),
        originalMessage: 'স্থানীয় প্রভাবশালীরা ড্রেজার লাগিয়ে আমাদের আবাদি কৃষিজমির উপরি-স্তরের মাটি কেটে নিয়ে যাচ্ছে',
        language: 'bn',
        facts: [],
      }),
    });
    const res = await answerRoute(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('completed');
    expect(hasCitation(data, 'land-crime-13')).toBe(true);
    const str = JSON.stringify(data);
    expect(str).toContain('স্বীয় মালিকানাধীন');
    expect(str).toContain('সীমিত পরিসরে');
    expect(str).toContain('ঊর্বরতার ক্ষতিসাধন না করিয়া');
    expect(str.includes('জামিনযোগ্য')).toBe(true);
    expect(str.includes('বসতবাড়ি নির্মাণ কঠোরভাবে অব্যাহতিপ্রাপ্ত')).toBe(false);
  });

  // Case 3: Family Courts Act 2023 (Act No. 26 of 2023)
  it('correctly cites Family Courts Act 2023 as Act No. 26 of 2023 and Sections 5 & 6', async () => {
    const req = new NextRequest('http://localhost:3000/api/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestId: 'test_fam_' + Date.now(),
        originalMessage: 'স্বামী ৩ মাস ধরে কোনো ভরণপোষণ দিচ্ছে না এবং ডিভোর্স না দিয়েও দেনমোহর দিতে অস্বীকার করছে, আমি বাবার বাড়ি চলে এসেছি',
        language: 'bn',
        facts: [],
      }),
    });
    const res = await answerRoute(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('completed');
    const str = JSON.stringify(data);
    expect(str.includes('২৬ নং আইন') || str.includes('Act No. 26 of 2023')).toBe(true);
    expect(hasCitation(data, 'family-court-2023-5') || hasCitation(data, 'family-court-2023-6') || hasCitation(data, 'mflo-1961-9')).toBe(true);
  });

  // Case 4: Context-dependent follow-up "গতকাল"
  it('correctly handles context-dependent follow-up "গতকাল" retaining initial dispute', async () => {
    const req = new NextRequest('http://localhost:3000/api/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestId: 'test_context_yesterday_' + Date.now(),
        originalMessage: 'গতকাল',
        language: 'bn',
        facts: [],
        conversationHistory: [
          { role: 'user', content: 'ফার্মেসি থেকে আমাকে ভেজাল ওষুধ দিয়েছে, আমি অভিযোগ করতে চাই।' },
          { role: 'assistant', content: 'আপনি ওষুধটি কবে ক্রয় করেছিলেন? (ধারা ৬০ অনুযায়ী ৩০ দিনের মধ্যে অভিযোগ করতে হয়)' }
        ]
      }),
    });
    const res = await answerRoute(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('completed');
    expect(data.problemSummary?.identifiedIssue).toContain('ভোক্তা');
    const dateFact = data.userFacts?.find((f: any) => f.fieldId === 'occurrence_date');
    expect(dateFact).toBeDefined();
    expect(dateFact.value).toContain('গতকাল');
  });

  // Case 5: Indigent Legal Aid & 16699
  it('correctly handles free government legal aid inquiry with accurate title, understanding, and checklist', async () => {
    const req = new NextRequest('http://localhost:3000/api/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestId: 'test_legal_aid_' + Date.now(),
        originalMessage: 'অসচ্ছল নাগরিক হিসেবে আদালতে বিনামূল্যে সরকারি আইনজীবী ও আইনি সহায়তা (লিগ্যাল এইড ১৬৬৯৯) পাওয়ার উপায় কী?',
        language: 'bn',
        facts: [],
      }),
    });
    const res = await answerRoute(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('completed');
    expect(data.problemSummary?.identifiedIssue).toMatch(/বিনামূল্যে|আইনজীবী|লিগ্যাল এইড|আইনি/);
    expect(data.problemSummary?.identifiedIssue).not.toContain('গ্রেফতার');
    expect(data.problemSummary?.understanding).not.toContain('গ্রেফতার');
    expect(data.checklist.length).toBe(4);
    expect(data.checklist[0].text).not.toContain('গ্রেফতার');
    expect(data.checklist.some((s: any) => s.officeId === 'bd-national-legal-aid')).toBe(true);
    expect(hasCitation(data, 'legalaid-16')).toBe(true);
  });
});
