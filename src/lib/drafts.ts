import type {
  DocumentType,
  DraftDocument,
  DraftFacts,
  FactValue,
  ReviewStatus,
} from '@/types/contracts';

export const draftFieldLabels: Record<string, string> = {
  name: 'আবেদনকারীর নাম / Applicant name',
  contact: 'যোগাযোগ (মোবাইল নম্বর) / Contact',
  address: 'বর্তমান ঠিকানা / Address',
  recipient: 'প্রাপক ও এলাকা (যাচাই করুন) / Recipient',
  place: 'ঘটনা / কর্মস্থলের স্থান',
  date: 'ঘটনার তারিখ ও সময় / unknown',
  role: 'পদবী ও চাকরির সময়কাল / Role & tenure',
  period: 'বকেয়া মজুরির সময়কাল / Unpaid period',
  amount: 'বকেয়া টাকার পরিমাণ (আবেদনকারীর হিসাব)',
  chronology: 'ঘটনার বিবরণ / Facts',
  assistance: 'কী সহায়তা চান / Assistance requested',
  attachments: 'সংযুক্তি (যদি থাকে) / Attachments',
  applicationDate: 'আবেদনের তারিখ / Application date',
};

export function getRequiredFields(type: DocumentType): string[] {
  const common = ['name', 'contact', 'address', 'recipient', 'place', 'date', 'chronology', 'assistance', 'applicationDate'];
  if (type === 'dife') {
    return [...common, 'role', 'period', 'amount'];
  }
  if (type === 'dncrp') {
    return [...common, 'amount'];
  }
  return common;
}

export function getDraftTitle(type: DocumentType): string {
  if (type === 'gd') return 'সাধারণ ডায়েরি (GD) করার জন্য আবেদন';
  if (type === 'dncrp') return 'ভোক্তা অধিকার সংরক্ষণ আইন অনুযায়ী লিখিত অভিযোগ';
  return 'বকেয়া মজুরি ও শ্রম অধিকার সুরক্ষার লক্ষ্যে লিখিত অভিযোগ';
}

export function getDefaultRecipient(type: DocumentType): string {
  if (type === 'gd') return 'ভারপ্রাপ্ত কর্মকর্তা (OC), সংশ্লিষ্ট থানা, বাংলাদেশ পুলিশ';
  if (type === 'dncrp') return 'মহাপরিচালক / উপপরিচালক, জাতীয় ভোক্তা অধিকার সংরক্ষণ অধিদপ্তর (DNCRP)';
  return 'মহাপরিদর্শক / আঞ্চলিক উপ-মহাপরিদর্শক, কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর (DIFE)';
}

export function prepareDraftDocument(
  type: DocumentType,
  facts: DraftFacts,
  id: string = crypto.randomUUID()
): DraftDocument {
  const values = facts.fields.reduce<Record<string, string>>((acc, f) => {
    acc[f.fieldId] = f.value;
    return acc;
  }, {});

  const required = getRequiredFields(type);
  const unresolved: string[] = [];

  const v = (key: string): string => {
    const val = values[key]?.trim();
    if (val && val.length > 0) return val;
    unresolved.push(key);
    return `[${draftFieldLabels[key] || key} লিখুন]`;
  };

  const recipientVal = values['recipient']?.trim();
  const recipientResolved = Boolean(recipientVal && recipientVal.length > 0 && !recipientVal.startsWith('['));
  if (!recipientResolved) {
    unresolved.push('recipient');
  }
  const displayRecipient = recipientResolved
    ? recipientVal
    : `[${draftFieldLabels['recipient'] || 'প্রাপক ও এলাকা'} যাচাই করে লিখুন]`;

  const dateVal = values['applicationDate']?.trim();
  const dateResolved = Boolean(dateVal && dateVal.length > 0 && !dateVal.startsWith('['));
  if (!dateResolved) {
    unresolved.push('applicationDate');
  }
  const displayDate = dateResolved
    ? dateVal
    : `[${draftFieldLabels['applicationDate'] || 'আবেদনের তারিখ'} লিখুন]`;

  const paragraphs: string[] = [
    `বরাবর\n${displayRecipient}`,
    `বিষয়: ${getDraftTitle(type)}`,
    'মহোদয়,',
    `আমি ${v('name')}। ঠিকানা: ${v('address')}। যোগাযোগ: ${v('contact')}।`,
    `ঘটনা / কর্মস্থলের স্থান: ${v('place')}\nঘটনার তারিখ ও সময়: ${v('date')}`,
  ];

  if (type === 'dife') {
    paragraphs.push(
      `কাজ ও চাকরির সময়কাল: ${v('role')}\nবকেয়ার সময়কাল: ${v('period')}\nবকেয়া পরিমাণ (আবেদনকারীর হিসাব): ${v('amount')}`
    );
  } else if (type === 'dncrp') {
    paragraphs.push(
      `দাবিকৃত বা প্রতারিত অর্থের পরিমাণ: ${v('amount')}`
    );
  }

  paragraphs.push(
    `ঘটনার বিবরণ:\n${v('chronology')}`,
    `অনুরোধ / প্রতিকার:\n${v('assistance')}`,
    `সংযুক্তি:\n${values['attachments']?.trim() || 'প্রযোজ্য নয় / উল্লেখ করা হয়নি'}`,
    `আবেদনের তারিখ: ${displayDate}`,
    `\nস্বাক্ষর: ____________________\n(${values['name']?.trim() || 'আবেদনকারী'})`
  );

  const isComplete = unresolved.length === 0;

  return {
    id,
    templateId: `${type}-application-v1`,
    templateVersion: '1.0.0',
    type,
    facts,
    recipient: displayRecipient,
    paragraphs,
    unresolvedPlaceholders: unresolved,
    reviewStatus: isComplete ? 'needs_review' : 'incomplete',
    sourcePackVersion: 'bd-pilot-2026-10-27.1',
    exportStatus: 'never_exported',
  };
}

export function assembleDraftPlainText(
  doc: DraftDocument,
  reviewed: boolean,
  customBody?: string
): string {
  const headerNotice = 'খসড়া — জমা দেওয়ার আগে তথ্য যাচাই করুন\n';
  const hasPlaceholders = doc.unresolvedPlaceholders.length > 0 || (customBody ? customBody.includes('[') : false);
  const statusLabel =
    hasPlaceholders || !reviewed
      ? 'অসম্পূর্ণ খসড়া / Incomplete draft\n\n'
      : 'তথ্য পর্যালোচিত খসড়া / Reviewed draft\n\n';

  const body = customBody || doc.paragraphs.join('\n\n');
  const footerLegalDisclaimer =
    '\n\n----------------------------------------\n' +
    'সতর্কতা: এটি MyLaws দ্বারা প্রস্তুতকৃত একটি খসড়া নথি। এটি কোনো আদালত কর্তৃক গৃহীত মামলা, ' +
    'থানার অফিশিয়াল জিডি কপি বা শ্রম পরিদর্শকের বিধিবদ্ধ নোটিশ নয়। দাখিলের পূর্বে সকল তথ্য ও এখতিয়ার নিজে যাচাই করে নিন।';

  return headerNotice + statusLabel + body + footerLegalDisclaimer;
}
