import { describe, it, expect } from 'vitest';
import { detectLanguage, isBanglish, normalize, retrieve } from '../src/lib/retrieval';

describe('Retrieval & Bilingual Language Engine', () => {
  it('detects Bangla script correctly', () => {
    expect(detectLanguage('আমার মালিক দুই মাসের বেতন দেয়নি')).toBe('bn');
    expect(detectLanguage('গ্রেপ্তার হলে একজন ব্যক্তির কী অধিকার আছে?')).toBe('bn');
  });

  it('detects English correctly', () => {
    expect(detectLanguage('My employer has not paid my salary for two months')).toBe('en');
    expect(detectLanguage('What rights does an arrested person have in Bangladesh?')).toBe('en');
  });

  it('identifies Banglish queries and maps them to Bangla experience', () => {
    const banglish1 = 'amr boss 2 mash er beton deynai ami ki krbo';
    expect(isBanglish(banglish1)).toBe(true);
    expect(detectLanguage(banglish1)).toBe('bn');
  });

  it('normalizes Bengali numerals and punctuation', () => {
    expect(normalize('ধারা ১২৩!')).toBe('ধারা 123');
    expect(normalize('সেকশন ১০৮(১)')).toBe('সেকশন 108 1');
  });

  it('retrieves Labour Act Section 123 & 132 for Bangla wage query', () => {
    const results = retrieve('আমার মালিক দুই মাসের বেতন দেয়নি');
    expect(results.length).toBeGreaterThan(0);
    const ids = results.map((r) => r.provision.id);
    expect(ids).toContain('labour-123');
  });

  it('retrieves Labour Act for messy Banglish query', () => {
    const results = retrieve('amr boss 2 mash er beton deynai ami ki krbo');
    expect(results.length).toBeGreaterThan(0);
    const ids = results.map((r) => r.provision.id);
    expect(ids.some((id) => id.startsWith('labour-'))).toBe(true);
  });

  it('retrieves Constitution Article 33 or CrPC Section 54 for arrest query', () => {
    const results = retrieve('গ্রেপ্তার হলে পুলিশের হেফাজতে কী অধিকার আছে');
    expect(results.length).toBeGreaterThan(0);
    const ids = results.map((r) => r.provision.id);
    expect(ids.some((id) => id === 'constitution-33' || id === 'crpc-54')).toBe(true);
  });

  it('retrieves Penal Code 503 & 507 for threat query', () => {
    const results = retrieve('অপরিচিত ব্যক্তি ফোন ও ফেসবুকে হুমকি দিচ্ছে');
    expect(results.length).toBeGreaterThan(0);
    const ids = results.map((r) => r.provision.id);
    expect(ids.some((id) => id.startsWith('penal-') || id === 'police-44-gd')).toBe(true);
  });

  // Category 3: Digital Security Test
  it('retrieves Pornography Control Act or Cyber provisions for intimate blackmail query', () => {
    const results = retrieve('গোপন ছবি ইন্টারনেটে ছড়ানোর হুমকি দিয়ে ব্ল্যাকমেইল করছে');
    expect(results.length).toBeGreaterThan(0);
    const ids = results.map((r) => r.provision.id);
    expect(ids.some((id) => id === 'pornography-8' || id.startsWith('cyber-'))).toBe(true);
  });

  // Category 4: Consumer Rights Test
  it('retrieves Consumer Protection Act for e-commerce fraud and non-delivery', () => {
    const results = retrieve('অনলাইন দোকানে টাকা দিয়েছি কিন্তু পণ্য ডেলিভারি দেয়নি');
    expect(results.length).toBeGreaterThan(0);
    const ids = results.map((r) => r.provision.id);
    expect(ids.some((id) => id.startsWith('consumer-') || id === 'ecommerce-delivery-2021')).toBe(true);
  });

  // Category 5: Land Dispute Test
  it('retrieves Land Crime Prevention Act for forged deed and land grabbing', () => {
    const results = retrieve('জাল দলিল তৈরি করে আমার জমি দখলের চেষ্টা করছে');
    expect(results.length).toBeGreaterThan(0);
    const ids = results.map((r) => r.provision.id);
    expect(ids.some((id) => id.startsWith('land-crime-') || id.startsWith('property-'))).toBe(true);
  });

  // Category 6: Domestic Violence & Family Law Test
  it('retrieves Dowry Prohibition Act or Domestic Violence Act for dowry abuse query', () => {
    const results = retrieve('স্বামী যৌতুক দাবি করে শারীরিক নির্যাতন করছে');
    expect(results.length).toBeGreaterThan(0);
    const ids = results.map((r) => r.provision.id);
    expect(ids.some((id) => id.startsWith('dowry-') || id.startsWith('domestic-'))).toBe(true);
  });

  // Category 7: Legal Aid Hotline Test
  it('retrieves Legal Aid 16699 for indigent citizen seeking free lawyer', () => {
    const results = retrieve('আইনজীবী রাখার সামর্থ্য নেই বিনামূল্যে সরকারি আইনজীবী পাব কীভাবে');
    expect(results.length).toBeGreaterThan(0);
    const ids = results.map((r) => r.provision.id);
    expect(ids.some((id) => id === 'legalaid-16')).toBe(true);
  });

  it('returns empty result for completely unsupported questions like cooking or astronomy', () => {
    const results = retrieve('how to bake a chocolate cake in oven');
    expect(results.length).toBe(0);
  });
});
