import fs from 'fs';
import path from 'path';

const workspaceDir = 'E:/vibe coding/POIDH/MyLaws Website';
const provisionsPath = path.join(workspaceDir, 'src/data/corpus/provisions.json');
const provisions = JSON.parse(fs.readFileSync(provisionsPath, 'utf-8'));

const keywordAdditions = {
  'constitution-33': ['গ্রেপ্তার হলে পুলিশের হেফাজতে কী অধিকার আছে', 'পুলিশের হেফাজতে অধিকার', 'পুলিশের হেফাজত', 'গ্রেপ্তার হলে অধিকার', 'গ্রেফতার', 'আটক অধিকার', 'police custody rights', 'arrest safeguards'],
  'crpc-54': ['বিনা পরোয়ানায় গ্রেপ্তার', 'পুলিশের হেফাজতে', 'গ্রেপ্তার হলে', 'arrest rights', 'police arrest without warrant'],
  'crpc-61': ['২৪ ঘণ্টার বেশি আটক', 'পুলিশের হেফাজতে ২৪ ঘণ্টা', 'detention in custody 24 hours'],
  'constitution-35': ['হেফাজতে নির্যাতন', 'পুলিশের হেফাজতে অধিকার', 'custodial rights fair trial'],
  'penal-324': ['churi diye aghat', 'knife attack', 'churi diye voy dekhano', 'ধারালো অস্ত্র দিয়ে আঘাত', 'কুপিয়ে জখম', 'ছুরি দিয়ে আঘাত', 'ছুরিকাঘাত'],
  'penal-325': ['marpit', 'hat vanga', 'bone fracture', '20 din', '২০ দিন ভর্তি', 'হাত ভেঙে দিয়েছে', 'মারপিট করে জখম', 'গুরুতর জখম'],
  'penal-326': ['marattok jokhom', 'churi diye kupiye', 'knife stabbing', 'কুপিয়ে জখম', 'ছুরিকাঘাত', 'মারাত্মক জখম'],
  'penal-141': ['armed men', 'gang threat', 'mob gathering', 'dalboddho humki', 'সশস্ত্র লোক', 'বেআইনি সমাবেশ'],
  'penal-143': ['unlawful assembly punishment', 'mob gathering punishment', 'বেআইনি সমাবেশ শাস্তি'],
  'penal-385': ['chanda na peye paliye gese', 'extortion attempt', 'extortionist ran away', 'ভীতি প্রদর্শন', 'চাঁদা দাবি করে পালিয়ে যাওয়া'],
  'crpc-107': ['protiniyoto humki', 'peace bond', 'shanti rokkhar muchleka', 'শান্তি রক্ষার মুচলেকা', '১০৭ ধারা', 'প্রতিনিয়ত হুমকি'],
  'cyber-19': ['delete database', 'deleted files', 'deleted client database', 'server hacking', 'সার্ভার ডাটা ডিলিট', 'ডাটাবেজ মুছে ফেলা'],
  'cyber-32': ['hospital receptionist', 'leaked medical records', 'confidential data leak', 'রোগীর তথ্য ফাঁস', 'গোপনীয় তথ্য ফাঁস'],
  'penal-468': ['fake appointment letter', 'fraudulent fake letter', 'fake government stamp', 'ভুয়া নিয়োগপত্র দিয়ে টাকা আত্মসাৎ', 'প্রতারণামূলক ভুয়া চিঠি'],
  'consumer-39': ['mrp theke beshi dam', 'pharmacy extra price', 'overcharging mrp', 'ওষুধের প্যাকেটের গায়ে মুদ্রিত মূল্য', 'সর্বোচ্চ মূল্যের চেয়ে বেশি দাম', 'এমআরপি'],
  'consumer-48': ['pressure cooker explosion', 'burn injury product', 'hazardous product', 'defect exploded', 'ত্রুটিপূর্ণ কুকার বিস্ফোরণ', 'বিপজ্জনক পণ্য'],
  'rent-control-18': ['landlord broke lock', 'threw out belongings', 'tenant eviction without decree', 'তালা ভেঙে উচ্ছেদ', 'মালামাল ফেলে দেওয়া'],
  'sra-52': ['neighbor constructing wall', 'boundary wall encroaching', 'boundary dispute stay order', 'দেয়াল নির্মাণ', 'সীমানায় দেয়াল', 'নিষেধাজ্ঞা'],
  'land-crime-6': ['shorik er jomi bikri', 'without informing other heirs', 'co-sharer deceitful sale', 'ওয়ারিশদের না জানিয়ে জমি বিক্রি', 'শরিককে না জানিয়ে বিক্রি'],
  'land-crime-8': ['dredger', 'soil cutting', 'krishi jomir mati', 'ড্রেজার দিয়ে মাটি কাটা', 'কৃষিজমির মাটি কেটে নেওয়া', 'মাটি কাটা'],
  'guardians-25': ['forcibly took child', 'in laws took away child', 'shontan kere niye gese', 'refused to let me see child', 'সন্তান কেড়ে নেওয়া', 'বাচ্চা ফেরত'],
  'mflo-7': ['mukhe teen talaq', 'oral talaq', 'notice na deya', 'no notice to chairman', 'মুখে তিন তালাক', 'চেয়ারম্যানকে নোটিশ না দেওয়া'],
  'dowry-2018-2': ['wedding jewelry', 'jewelry given voluntarily', 'bride gifts not dowry', 'বিয়ের গহনা', 'উপহার যৌতুক নয়'],
  'crpc-498': ['anticipatory bail', 'ogrim jamin', 'high court anticipatory bail', 'falsely accused anticipatory bail', 'অগ্রিম জামিন', 'হাইকোর্টে আগাম জামিন']
};

for (const p of provisions) {
  if (keywordAdditions[p.id]) {
    const existing = new Set(p.keywords || []);
    for (const kw of keywordAdditions[p.id]) {
      existing.add(kw);
    }
    p.keywords = Array.from(existing);
  }
}

fs.writeFileSync(provisionsPath, JSON.stringify(provisions, null, 2), 'utf-8');
console.log('Enriched keywords in provisions.json successfully.');
