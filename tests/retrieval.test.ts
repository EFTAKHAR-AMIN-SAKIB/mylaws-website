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

  it('retrieves Constitution Article 33 for arrest query', () => {
    const results = retrieve('গ্রেপ্তার হলে পুলিশের হেফাজতে কী অধিকার আছে');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].provision.id).toBe('constitution-33');
  });

  it('retrieves Penal Code 503 & 507 for threat query', () => {
    const results = retrieve('অপরিচিত ব্যক্তি ফোন ও ফেসবুকে হুমকি দিচ্ছে');
    expect(results.length).toBeGreaterThan(0);
    const ids = results.map((r) => r.provision.id);
    expect(ids.some((id) => id.startsWith('penal-'))).toBe(true);
  });

  it('returns empty result for completely unsupported questions like cooking or astronomy', () => {
    const results = retrieve('how to bake a chocolate cake in oven');
    expect(results.length).toBe(0);
  });
});
