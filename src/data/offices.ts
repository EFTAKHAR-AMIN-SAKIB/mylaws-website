import type { OfficeRecord } from '@/types/contracts';

export interface OfficeDetail extends OfficeRecord {
  category: 'legal_aid' | 'labour' | 'police' | 'consumer';
  portalUrl?: string;
  notes: { en: string; bn: string };
}

export const nationalLegalAid: OfficeDetail = {
  id: 'bd-national-legal-aid',
  name: 'জাতীয় সরকারি আইনি সহায়তা / National Government Legal Aid',
  category: 'legal_aid',
  phone: '16699',
  address: 'National Legal Aid Services Organization, 145 Shanti Nagar, Dhaka-1217',
  territory: 'Bangladesh',
  issueScope: 'General legal aid, referral to district legal aid offices and panel lawyers',
  portalUrl: 'https://bangladesh.gov.bd/pages/static-pages/69a55ba386514399668e4e89',
  sourceIds: ['constitution-27', 'constitution-31'],
  verificationDate: '2026-10-27',
  status: 'authoritative',
  notes: {
    en: 'Toll-free national legal aid hotline: 16699. Operates 24/7 for citizen inquiries. District office jurisdiction requires verification.',
    bn: 'টোল-ফ্রি জাতীয় আইনি সহায়তা হেল্পলাইন: ১৬৬৯৯। নাগরিকদের তথ্যের জন্য ২৪ ঘণ্টা চালু। জেলা কার্যালয়ের এখতিয়ার যাচাই সাপেক্ষ।',
  },
};

export const difeOffice: OfficeDetail = {
  id: 'bd-dife-hq',
  name: 'কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর (DIFE)',
  category: 'labour',
  phone: '16104',
  address: 'শ্রম ভবন, ১৯৬, শহীদ সৈয়দ নজরুল ইসলাম সরণি, বিজয়নগর, ঢাকা-১০০০',
  territory: 'Bangladesh (Jurisdiction distributed by regional inspectorates)',
  issueScope: 'Labour Act enforcement, workplace complaints, conciliation under Section 124A',
  portalUrl: 'https://lima.dife.gov.bd/complaint',
  sourceIds: ['labour-5', 'labour-123', 'labour-124a', 'labour-132'],
  verificationDate: '2026-10-27',
  status: 'authoritative',
  notes: {
    en: 'Labour helpline: 16104. Complaints can be lodged online through the LIMA portal. Written complaints can also be submitted to the local inspectorate.',
    bn: 'শ্রম হেল্পলাইন: ১৬১০৪। লিমা (LIMA) পোর্টালের মাধ্যমে অনলাইনে অভিযোগ দাখিল করা যায়। সংশ্লিষ্ট আঞ্চলিক পরিদর্শক কার্যালয়েও লিখিত অভিযোগ দেওয়া যায়।',
  },
};

export const policeGdOffice: OfficeDetail = {
  id: 'bd-police-gd',
  name: 'বাংলাদেশ পুলিশ — অনলাইন জিডি ও থানা',
  category: 'police',
  phone: '999',
  address: 'সংশ্লিষ্ট মেট্রোপলিটন / জেলা থানা (ঘটনাস্থল অথবা বসবাসকারী থানার এখতিয়ার)',
  territory: 'Territorial jurisdiction by Thana / Police Station',
  issueScope: 'General Diary (GD) for loss of property, intimidation, threats, non-cognizable incidents',
  portalUrl: 'https://gd.police.gov.bd/',
  sourceIds: ['penal-503', 'penal-507'],
  verificationDate: '2026-10-27',
  status: 'authoritative',
  notes: {
    en: 'National emergency service: 999. Online GD portal available at gd.police.gov.bd or via official mobile app. Physical GD can be submitted directly at the jurisdictional Thana.',
    bn: 'জাতীয় জরুরি সেবা: ৯৯৯। অনলাইন জিডি gd.police.gov.bd বা অফিশিয়াল অ্যাপের মাধ্যমে করা যায়। সরাসরি সংশ্লিষ্ট থানায় গিয়েও জিডি দাখিল করা যায়।',
  },
};

export const dncrpOffice: OfficeDetail = {
  id: 'bd-dncrp',
  name: 'জাতীয় ভোক্তা-অধিকার সংরক্ষণ অধিদপ্তর (DNCRP)',
  category: 'consumer',
  phone: '16121',
  address: '১ কারওয়ান বাজার (টিসিসিআই ভবন), ঢাকা-১২১৫',
  territory: 'National and District Directorate Offices',
  issueScope: 'Consumers’ Right Protection Act enforcement, complaints under Section 60',
  portalUrl: 'https://dncrp.portal.gov.bd/',
  sourceIds: ['consumer-40', 'consumer-44', 'consumer-45', 'consumer-60'],
  verificationDate: '2026-10-27',
  status: 'authoritative',
  notes: {
    en: 'Consumer rights hotline: 16121. Complaints must be filed within 30 days of the occurrence with purchase receipts and merchant details.',
    bn: 'ভোক্তা অধিকার হটলাইন: ১৬১২১। কারণ উদ্ভবের ৩০ দিনের মধ্যে রসিদ ও বিক্রেতার তথ্যসহ অভিযোগ দাখিল করতে হয়।',
  },
};

export const verifiedOffices: OfficeDetail[] = [
  nationalLegalAid,
  difeOffice,
  policeGdOffice,
  dncrpOffice,
];

export function findOffice(id: string): OfficeDetail | undefined {
  return verifiedOffices.find((o) => o.id === id);
}
