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
  return common;
}

export function getDraftTitle(type: DocumentType): string {
  return type === 'gd'
    ? 'সাধারণ ডায়েরির আবেদন — খসড়া'
    : 'DIFE-তে লিখিত অভিযোগ — খসড়া';
}

export function getDefaultRecipient(type: DocumentType): string {
  return type === 'gd'
    ? 'ভারপ্রাপ্ত কর্মকর্তা (OC), সংশ্লিষ্ট থানা, বাংলাদেশ পুলিশ'
    : 'মহাপরিদর্শক / আঞ্চলিক উপ-মহাপরিদর্শক, কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর (DIFE)';
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

  const recipientVal = values['recipient']?.trim() || getDefaultRecipient(type);
  const appDateVal = values['applicationDate']?.trim() || new Date().toISOString().split('T')[0];

  const paragraphs: string[] = [
    `বরাবর\n${recipientVal}`,
    `বিষয়: ${getDraftTitle(type)}`,
    'মহোদয়,',
    `আমি ${v('name')}। ঠিকানা: ${v('address')}। যোগাযোগ: ${v('contact')}।`,
    `ঘটনা / কর্মস্থলের স্থান: ${v('place')}\nঘটনার তারিখ ও সময়: ${v('date')}`,
  ];

  if (type === 'dife') {
    paragraphs.push(
      `কাজ ও চাকরির সময়কাল: ${v('role')}\nবকেয়ার সময়কাল: ${v('period')}\nবকেয়া পরিমাণ (আবেদনকারীর তথ্য): ${v('amount')}`
    );
  }

  paragraphs.push(
    `ঘটনার বিবরণ:\n${v('chronology')}`,
    `অনুরোধ / প্রতিকার:\n${v('assistance')}`,
    `সংযুক্তি:\n${values['attachments']?.trim() || 'প্রযোজ্য নয় / উল্লেখ করা হয়নি'}`,
    `আবেদনের তারিখ: ${appDateVal}`,
    `\nস্বাক্ষর: ____________________\n(${values['name']?.trim() || 'আবেদনকারী'})`
  );

  const isComplete = unresolved.length === 0;

  return {
    id,
    templateId: `${type}-application-v1`,
    templateVersion: '1.0.0',
    type,
    facts,
    recipient: recipientVal,
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
    'সতর্কতা: এটি মাই লজ (MyLaws) দ্বারা প্রস্তুতকৃত একটি খসড়া নথি। এটি কোনো আদালত কর্তৃক গৃহীত মামলা, ' +
    'থানার অফিশিয়াল জিডি কপি বা শ্রম পরিদর্শকের বিধিবদ্ধ নোটিশ নয়। দাখিলের পূর্বে সকল তথ্য ও এখতিয়ার নিজে যাচাই করে নিন।';

  return headerNotice + statusLabel + body + footerLegalDisclaimer;
}
