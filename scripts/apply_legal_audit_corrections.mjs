import fs from 'fs';

// Read existing legal.ts
let content = fs.readFileSync('src/data/legal.ts', 'utf-8');

// 1. Correct Cyber Security Act and Land Crime Act constants
content = content.replace(
  "const cyber = { en: 'Cyber Security Act, 2023', bn: 'সাইবার নিরাপত্তা আইন, ২০২৩' };",
  "const cyber = { en: 'Cyber Security Act, 2026', bn: 'সাইবার নিরাপত্তা আইন, ২০২৬' };"
);

content = content.replace(
  "const landCrimeAct = { en: 'Land Crime Prevention and Redress Act, 2023', bn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩' };",
  "const landCrimeAct = { en: 'Land Crime Prevention and Redress Act, 2023 (Act No. 36 of 2023)', bn: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩ (২০২৩ সনের ৩৬ নং আইন)' };"
);

// 2. Correct cyberTransitionalNote
const oldCyberNote = `const cyberTransitionalNote = {
  en: 'Audited on 29 October 2026. Note: Cyber Security Act 2023 is currently under legislative review/repeal transition in Bangladesh; offenses involving identity fraud, hacking, extortion, and intimate blackmail remain concurrently actionable under Penal Code 1860, Pornography Control Act 2012, and ICT Act 2006.',
  bn: '২৯ অক্টোবর ২০২৬ তারিখে নিরীক্ষিত। সাইবার নিরাপত্তা আইন ২০২৩ আইনগত পুনর্মূল্যায়নাধীন রয়েছে; পরিচয় জালিয়াতি, হ্যাকিং, ব্ল্যাকমেইল ও চাঁদাবাজি দণ্ডবিধি ১৮৬০, পর্নোগ্রাফি নিয়ন্ত্রণ আইন ২০১২ ও আইসিটি আইনে সরাসরি দণ্ডনীয়।',
};`;

const newCyberNote = `const cyberTransitionalNote = {
  en: 'Governing legislation as of 2026. Note on legislative history: The Cyber Security Act, 2023 was repealed by the Cyber Security Ordinance, 2025 and subsequently enacted with amendments as the Cyber Security Act, 2026. Provisions concerning digital identity fraud, unauthorized access, and hacking are governed by the 2026 Act, while offenses involving intimate blackmail and cheating remain concurrently actionable under the Pornography Control Act, 2012 (Section 8) and Penal Code, 1860 (Section 419).',
  bn: '২০২৬ সালের প্রযোজ্য মূল আইন। আইনগত ইতিহাস: সাইবার নিরাপত্তা আইন ২০২৩ অধ্যাদেশ ২০২৫ দ্বারা বাতিলপূর্বক সংশোধনীসহ সাইবার নিরাপত্তা আইন ২০২৬ হিসেবে প্রতিস্থাপিত হয়েছে। পরিচিতি জালিয়াতি, হ্যাকিং ও অনধিকার প্রবেশের ক্ষেত্রে ২০২৬ সালের বিধান প্রযোজ্য, এবং অন্তরঙ্গ ছবির ব্ল্যাকমেইল ও প্রতারণায় পর্নোগ্রাফি নিয়ন্ত্রণ আইন ২০১২ (ধারা ৮) ও দণ্ডবিধি ১৮৬০ (ধারা ৪১৯) পূর্ণ কার্যকর রয়েছে।',
};`;

content = content.replace(oldCyberNote, newCyberNote);

// 3. Update land-crime-4 explanation
content = content.replace(
  "Under Section 4 of the Land Crime Prevention and Redress Act 2023, forging land transfer deeds, power of attorney, or using forged documents is a non-bailable offense carrying up to 7 years imprisonment.",
  "Under Section 4 of the Land Crime Prevention and Redress Act, 2023 (Act No. 36 of 2023), forging land transfer deeds, power of attorney, or using forged documents is a non-bailable offense carrying up to 7 years imprisonment and fine. Triable by the Court of Senior Judicial Magistrate or Metropolitan Magistrate."
);

content = content.replace(
  "ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ অনুযায়ী জমির ভুয়া বা জাল দলিল তৈরি করা, স্বাক্ষর জাল করা বা জাল দলিল ব্যবহার করা ৭ বছর পর্যন্ত কারাদণ্ডযোগ্য জামিন-অযোগ্য অপরাধ।",
  "ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩ (২০২৩ সনের ৩৬ নং আইন) এর ৪ ধারা অনুযায়ী জমির ভুয়া বা জাল দলিল তৈরি করা, স্বাক্ষর জাল করা বা জাল দলিল ব্যবহার করা অনধিক ৭ বছর পর্যন্ত কারাদণ্ড ও অর্থদণ্ডযোগ্য জামিন-অযোগ্য অপরাধ।"
);

// 4. Update land-crime-7 explanation on Executive Magistrate vs Title
content = content.replace(
  "Section 7 criminalizes illegal land grabbing. Dispossessing a lawful owner or tenant by force carries up to 2 years imprisonment. Executive Magistrates have direct power to restore possession to the lawful owner.",
  "Section 7 of Act No. 36 of 2023 criminalizes illegal land grabbing. Dispossessing a lawful owner or lawful possessor by force carries up to 2 years imprisonment. Under Sections 10 and 11, the Executive Magistrate may issue a show-cause notice and order restoration of possession, while disputed ownership title must still be resolved by the competent Civil Court."
);

content = content.replace(
  "জোরপূর্বক কারো জমি দখল করা বা বেদখল করা ভূমি অপরাধ আইনে ২ বছরের কারাদণ্ডযোগ্য অপরাধ। ম্যাজিস্ট্রেট তদন্ত সাপেক্ষে দ্রুত দখল পুনর্বহালের আদেশ দিতে পারেন।",
  "জোরপূর্বক কারো জমি দখল বা বেদখল করা ২০২৩ সনের ৩৬ নং আইনের ৭ ধারা অনুযায়ী ২ বছর পর্যন্ত কারাদণ্ডযোগ্য অপরাধ। ১০ ও ১১ ধারা মতে নির্বাহী ম্যাজিস্ট্রেট তদন্ত সাপেক্ষে প্রাথমিক দখল পুনর্বহালের আদেশ দিতে পারেন, তবে চূড়ান্ত স্বত্ব ও মালিকানা দেওয়ানি আদালতের এখতিয়ারাধীন।"
);

// 5. Update crpc-154 explanation on mandatory FIR and C.R. Case remedy
content = content.replace(
  "Section 154 obligates the police Officer-in-Charge to register an FIR when cognizable offenses (robbery, assault, murder attempt) are disclosed. Police cannot refuse to register an FIR or substitute it with a GD.",
  "Section 154 obligates the Officer-in-Charge to register an FIR when a cognizable offense is disclosed. While statutory law directs registration, in practice police may verify facts or recommend a GD if cognizable injury is absent or unclear. If the police refuse to record an FIR, the citizen’s statutory remedy is filing a Complaint Register (C.R. Case) directly before the Judicial Magistrate under Section 200 CrPC or petitioning the Superintendent of Police (SP)."
);

content = content.replace(
  "আমলযোগ্য অপরাধ সংঘটিত হলে থানার ভারপ্রাপ্ত কর্মকর্তা এজাহার (FIR) গ্রহণ করতে আইনত বাধ্য। এজাহার না নিয়ে ফিরিয়ে দেওয়া বেআইনি।",
  "আমলযোগ্য অপরাধের তথ্য প্রকাশ পেলে থানার ভারপ্রাপ্ত কর্মকর্তা এজাহার (FIR) লিপিবদ্ধ করতে আইনত বাধ্য। থানা এজাহার নিতে অপারগতা প্রকাশ করলে বা গড়িমসি করলে নাগরিকের সরাসরি জুডিশিয়াল ম্যাজিস্ট্রেট আদালতে সি আর মামলা (নালিশি মামলা) বা পুলিশ সুপারের (SP) নিকট লিখিত দরখাস্ত দেওয়ার আইনি প্রতিকার রয়েছে।"
);

// 6. Update crpc-496 explanation on sureties / bail bond
content = content.replace(
  "Section 496 makes bail an absolute statutory right for bailable offenses. Once an accused offers adequate sureties, the police officer or court is legally bound to grant release on bail.",
  "Section 496 entitles an accused in a bailable offense to release on bail as a statutory right. However, release is conditional on furnishing acceptable, solvent sureties (bail bond) to the satisfaction of the court or police officer, or on personal recognizance if certified indigent."
);

content = content.replace(
  "জামিনযোগ্য অপরাধে জামিন পাওয়া নাগরিকের অধিকার, আদালতের অনুগ্রহ নয়। উপযুক্ত জামিনদার দাখিল করা হলে পুলিশ বা আদালত জামিন দিতে বাধ্য।",
  "জামিনযোগ্য অপরাধে জামিন পাওয়া নাগরিকের আইনগত অধিকার। তবে আদালতের সন্তুষ্টি সাপেক্ষে উপযুক্ত ও দায়বদ্ধ জামিনদার (বেইল বন্ড) দাখিল করা জামিনে মুক্তির আবশ্যক শর্ত।"
);

// 7. Update rent-control-18 explanation on timely payment and Section 19 deposit
content = content.replace(
  "Under Section 18 of the Premises Rent Control Act 1991, as long as a tenant pays rent regularly, the landlord cannot arbitrarily evict them or cut off water/electricity without a court order.",
  "Under Section 18 of the Premises Rent Control Act 1991, as long as a tenant pays rent regularly within the statutory deadline (by the 15th of the following month or agreed contract date), the landlord cannot arbitrarily evict them or cut off utility lines without a formal civil court eviction decree."
);

content = content.replace(
  "Always collect printed rent receipts; if the landlord refuses to accept rent, deposit it legally with the Rent Controller.",
  "ভাড়া পরিশোধের লিখিত মানি রিসিট সংগ্রহ করুন। বাড়িওয়ালা ভাড়া নিতে অস্বীকৃতি জানালে খেলাপ এড়াতে ১৫ দিনের মধ্যে বাড়িভাড়া নিয়ন্ত্রণ কর্মকর্তার (Rent Controller) কার্যালয়ে চালানের মাধ্যমে ভাড়া জমা দেওয়া আবশ্যক।"
);

fs.writeFileSync('src/data/legal.ts', content, 'utf-8');
console.log('Successfully updated src/data/legal.ts with current-law audit corrections!');
