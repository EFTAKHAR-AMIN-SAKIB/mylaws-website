import { describe, it, expect } from 'vitest';
import {
  prepareDraftDocument,
  assembleDraftPlainText,
  getRequiredFields,
  getDraftTitle,
} from '../src/lib/drafts';
import type { DraftFacts } from '../src/types/contracts';

describe('Bangla Complaint & GD Draft Generator', () => {
  it('differentiates required fields between GD and DIFE', () => {
    const gdReq = getRequiredFields('gd');
    const difeReq = getRequiredFields('dife');

    expect(gdReq).not.toContain('amount');
    expect(gdReq).not.toContain('period');
    expect(difeReq).toContain('amount');
    expect(difeReq).toContain('period');
    expect(difeReq).toContain('role');
  });

  it('marks draft as incomplete when required fields are missing and preserves visible placeholders', () => {
    const facts: DraftFacts = {
      fields: [
        { fieldId: 'name', value: 'মো: রফিকুল ইসলাম', status: 'user_confirmed', provenance: 'user' },
        // other fields omitted
      ],
    };

    const doc = prepareDraftDocument('dife', facts);
    expect(doc.reviewStatus).toBe('incomplete');
    expect(doc.unresolvedPlaceholders.length).toBeGreaterThan(0);

    // Placeholders must be visible in paragraphs
    const combined = doc.paragraphs.join('\n');
    expect(combined).toContain('[বর্তমান ঠিকানা / Address লিখুন]');
    expect(combined).toContain('মো: রফিকুল ইসলাম');
  });

  it('marks draft as needs_review when all required fields are filled', () => {
    const facts: DraftFacts = {
      fields: [
        { fieldId: 'name', value: 'মো: রফিকুল ইসলাম', status: 'user_confirmed', provenance: 'user' },
        { fieldId: 'contact', value: '01700000000', status: 'user_confirmed', provenance: 'user' },
        { fieldId: 'address', value: 'মিরপুর-১০, ঢাকা', status: 'user_confirmed', provenance: 'user' },
        { fieldId: 'recipient', value: 'আঞ্চলিক উপ-মহাপরিদর্শক, ডিআইএফই ঢাকা', status: 'user_confirmed', provenance: 'user' },
        { fieldId: 'place', value: 'তেজগাঁও শিল্প এলাকা', status: 'user_confirmed', provenance: 'user' },
        { fieldId: 'date', value: '১ সেপ্টেম্বর থেকে বর্তমান', status: 'user_confirmed', provenance: 'user' },
        { fieldId: 'role', value: 'সিনিয়র অপারেটর (৩ বছর)', status: 'user_confirmed', provenance: 'user' },
        { fieldId: 'period', value: 'সেপ্টেম্বর ও অক্টোবর ২০২৬', status: 'user_confirmed', provenance: 'user' },
        { fieldId: 'amount', value: '৩৫,০০০ টাকা', status: 'user_confirmed', provenance: 'user' },
        { fieldId: 'chronology', value: 'গত দুই মাস যাবত মালিক মজুরি পরিশোধ করেননি। বারবার তাগাদা দেওয়া সত্ত্বেও কোনো ব্যবস্থা নেওয়া হয়নি।', status: 'user_confirmed', provenance: 'user' },
        { fieldId: 'assistance', value: 'আইন অনুযায়ী বকেয়া মজুরি দ্রুত আদায়ের জন্য পরিদর্শকের পদক্ষেপ প্রার্থনা করছি।', status: 'user_confirmed', provenance: 'user' },
        { fieldId: 'applicationDate', value: '2026-10-28', status: 'user_confirmed', provenance: 'user' },
      ],
    };

    const doc = prepareDraftDocument('dife', facts);
    expect(doc.unresolvedPlaceholders.length).toBe(0);
    expect(doc.reviewStatus).toBe('needs_review');
  });

  it('assembles formatted plain text with warning and status labels', () => {
    const facts: DraftFacts = {
      fields: [
        { fieldId: 'name', value: 'তানভীর আহমেদ', status: 'user_confirmed', provenance: 'user' },
        { fieldId: 'recipient', value: 'ভারপ্রাপ্ত কর্মকর্তা, ধানমন্ডি থানা', status: 'user_confirmed', provenance: 'user' },
      ],
    };

    const doc = prepareDraftDocument('gd', facts);
    const unreviewedText = assembleDraftPlainText(doc, false);
    expect(unreviewedText).toContain('খসড়া — জমা দেওয়ার আগে তথ্য যাচাই করুন');
    expect(unreviewedText).toContain('অসম্পূর্ণ খসড়া / Incomplete draft');

    // Fully reviewed text
    const reviewedText = assembleDraftPlainText(
      { ...doc, unresolvedPlaceholders: [] },
      true,
      'সম্পূর্ণ বিবরণ'
    );
    expect(reviewedText).toContain('তথ্য পর্যালোচিত খসড়া / Reviewed draft');
  });
});
