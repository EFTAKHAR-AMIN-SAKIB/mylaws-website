import { describe, it, expect } from 'vitest';
import { retrieve } from '../src/lib/retrieval';

describe('Rigorous Quality-Control RAG Retrieval Audit Across All 7 Categories', () => {
  it('Category 1 (Employment & Labor): retrieves Labour Act for unpaid wages & dismissal', () => {
    const query = 'আমার মালিক গত দুই মাসের বেতন দেয় নাই এবং কোনো কারণ ছাড়া চাকরি থেকে বাদ দিয়েছে';
    const matches = retrieve(query, 3);
    expect(matches.length).toBeGreaterThan(0);
    const ids = matches.map(m => m.provision.id);
    console.log('Category 1 Matches:', ids);
    expect(ids.some(id => id.startsWith('labour-'))).toBe(true);
    expect(ids.some(id => id === 'labour-123' || id === 'labour-26' || id === 'labour-132')).toBe(true);
  });

  it('Category 2 (Threats & GD): retrieves Penal Code & Police GD for death threats & vandalism', () => {
    const query = 'এক ব্যক্তি আমাকে হত্যার হুমকি দিয়ে বাড়ি ভেঙে ফেলার কথা বলছে থানায় জিডি করব কীভাবে';
    const matches = retrieve(query, 3);
    expect(matches.length).toBeGreaterThan(0);
    const ids = matches.map(m => m.provision.id);
    console.log('Category 2 Matches:', ids);
    expect(ids.some(id => id === 'penal-506' || id === 'police-44-gd' || id === 'penal-427')).toBe(true);
  });

  it('Category 3 (Cyber & Digital): retrieves Pornography Act & Penal Code 419 for fake account blackmail', () => {
    const query = 'ফেসবুকে আমার ছবি দিয়ে ভুয়া আইডি খুলে পরিচিত মানুষদের কাছে টাকা চাচ্ছে এবং ব্ল্যাকমেইল করছে';
    const matches = retrieve(query, 3);
    expect(matches.length).toBeGreaterThan(0);
    const ids = matches.map(m => m.provision.id);
    console.log('Category 3 Matches:', ids);
    expect(ids.some(id => id === 'penal-419' || id === 'pornography-8' || id.startsWith('cyber-'))).toBe(true);
  });

  it('Category 4 (Consumer & Fraud): retrieves Consumer Rights & E-commerce refund guidelines', () => {
    const query = 'অনলাইন শপ থেকে অগ্রিম টাকা দিয়ে পণ্য কিনেছি কিন্তু পণ্য দেয় নাই এবং রিফান্ডও দিচ্ছে না';
    const matches = retrieve(query, 3);
    expect(matches.length).toBeGreaterThan(0);
    const ids = matches.map(m => m.provision.id);
    console.log('Category 4 Matches:', ids);
    expect(ids.some(id => id === 'consumer-45' || id === 'ecommerce-delivery-2021' || id === 'penal-420')).toBe(true);
  });

  it('Category 5 (Land & Property): retrieves Land Crime Act 2023 (Act 36 of 2023) for forged deeds & grabbing', () => {
    const query = 'জাল দলিল তৈরি করে জালিয়াত চক্র আমার পৈতৃক জমি জোরপূর্বক দখল করে সীমানা পিলার ভেঙে ফেলেছে';
    const matches = retrieve(query, 3);
    expect(matches.length).toBeGreaterThan(0);
    const ids = matches.map(m => m.provision.id);
    console.log('Category 5 Matches:', ids);
    expect(ids.some(id => id === 'land-crime-4' || id === 'land-crime-7' || id === 'land-crime-8')).toBe(true);
  });

  it('Category 6 (Domestic Violence & Family): retrieves Dowry Prohibition & Domestic Violence for maintenance & eviction', () => {
    const query = 'স্বামী যৌতুক দাবি করে মারধর করে বাসা থেকে বের করে দিয়েছে এবং বাচ্চার খরচ বা খোরপোশ দিচ্ছে না';
    const matches = retrieve(query, 3);
    expect(matches.length).toBeGreaterThan(0);
    const ids = matches.map(m => m.provision.id);
    console.log('Category 6 Matches:', ids);
    expect(ids.some(id => id === 'dowry-2018-3' || id === 'domestic-14' || id === 'mflo-9')).toBe(true);
  });

  it('Category 7 (Fundamental Rights & Legal Aid): retrieves CrPC 54/61 and Legal Aid 16699 for illegal arrest & bail', () => {
    const query = 'পুলিশ বিনা পরোয়ানায় ভাইকে আটক করে ২৪ ঘণ্টার বেশি হাজতে রেখেছে জামিন কীভাবে পাব এবং সরকারি আইনজীবী লাগবে';
    const matches = retrieve(query, 3);
    expect(matches.length).toBeGreaterThan(0);
    const ids = matches.map(m => m.provision.id);
    console.log('Category 7 Matches:', ids);
    expect(ids.some(id => id === 'crpc-54' || id === 'crpc-61' || id === 'crpc-496' || id === 'legalaid-16')).toBe(true);
  });
});
