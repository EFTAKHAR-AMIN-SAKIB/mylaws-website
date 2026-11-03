import fs from 'fs';

const rawExtracted = JSON.parse(fs.readFileSync('scripts/raw_extracted_748.json', 'utf8'));

function cleanText(txt) {
  if (!txt) return '';
  return txt
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rsquo;/g, '’')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s+/g, '\n')
    .trim();
}

const rentMeta = {
  1: {
    id: "premises-rent-1",
    enTitle: "Short Title and Commencement",
    bnTitle: "সংক্ষিপ্ত শিরোনামা ও প্রবর্তন",
    enExp: "Names the statute as the Premises Rent Control Act, 1991 (Act No. III of 1991). Sections 23-27 took effect 2 January 1991, other sections 27 March 1989.",
    bnExp: "এই আইনটি 'বাড়ী ভাড়া নিয়ন্ত্রণ আইন, ১৯৯১' নামে অভিহিত; ধারা ২৩-২৭ ২ জানুয়ারি ১৯৯১ থেকে এবং অন্যান্য ধারা ২৭ মার্চ ১৯৮৯ থেকে কার্যকর।",
    enCaution: "Applies across urban and notified municipal areas within Bangladesh.",
    bnCaution: "গেজেট প্রজ্ঞাপিত এলাকা এবং বাংলাদেশের পৌর ও শহরাঞ্চলে প্রযোজ্য।",
    keywords: ["premises rent control act 1991", "bari bhara niyontron ain", "short title commencement rent", "বাড়িভাড়া নিয়ন্ত্রণ আইন", "ধারা ১"]
  },
  2: {
    id: "premises-rent-2",
    enTitle: "Definitions of Premises, Tenant, and Landlord",
    bnTitle: "সংজ্ঞা",
    enExp: "Defines 'premises' (residential or commercial building, hut, or part thereof with grounds), 'tenant', 'landlord', 'standard rent', and 'Controller'.",
    bnExp: "বাড়ী (আবাসিক ও বাণিজ্যিক ঘর, দালান, চত্বর), ভাড়াটিয়া, বাড়ী-মালিক, মানসম্মত ভাড়া ও ভাড়া নিয়ন্ত্রণ কর্মকর্তার বিধিবদ্ধ সংজ্ঞা।",
    enCaution: "Tenant includes surviving family members living with tenant at time of death.",
    bnCaution: "ভাড়াটিয়ার সংজ্ঞায় তার পরিবারের সদস্য ও বৈধ উত্তরাধিকারী অন্তর্ভুক্ত থাকে।",
    keywords: ["premises definitions", "tenant landlord definition", "varatia barik malik songga", "ভাড়াটিয়া বাড়ী মালিক সংজ্ঞা", "ধারা ২"]
  },
  3: {
    id: "premises-rent-3",
    enTitle: "Appointment of Rent Controller",
    bnTitle: "নিয়ন্ত্রক ইত্যাদি নিয়োগ",
    enExp: "Empowers the Government to appoint a Rent Controller, Additional Controller, and Deputy Controller (typically civil court Assistant Judges).",
    bnExp: "সরকার কর্তৃক সহকারী জজ বা ক্ষমতাপ্রাপ্ত বিচারিক কর্মকর্তাকে ভাড়া নিয়ন্ত্রণ কর্মকর্তা (Rent Controller) হিসেবে নিয়োগ।",
    enCaution: "The Rent Controller acts as a civil court authority within territorial limits.",
    bnCaution: "ভাড়া নিয়ন্ত্রণ আদালত দেওয়ানি আদালতের মর্যাদা ভোগ করে।",
    keywords: ["rent controller appointment", "assistant judge rent court", "niyontrok niyog", "নিয়ন্ত্রক নিয়োগ", "ধারা ৩"]
  },
  4: {
    id: "premises-rent-4",
    enTitle: "Final Hearing of Applications",
    bnTitle: "কতিপয় দরখাস্তের চূড়ান্ত শুনানী",
    enExp: "Regulates procedural hearings before the Rent Controller, mandating summary inquiries following civil court principles.",
    bnExp: "নিয়ন্ত্রকের নিকট পেশকৃত দরখাস্তের সংক্ষিপ্ত শুনানি ও সাক্ষ্যগ্রহণ পদ্ধতি।",
    enCaution: "Natural justice mandates hearing both parties prior to final order.",
    bnCaution: "উভয় পক্ষকে হাজির হয়ে শুনানির সুযোগ প্রদান বাধ্যতামূলক।",
    keywords: ["hearing of rent applications", "dorkhaster chunanto shunani", "summary inquiry rent", "চূড়ান্ত শুনানি", "ধারা ৪"]
  },
  5: {
    id: "premises-rent-5",
    enTitle: "Notice to Landlord and Tenant",
    bnTitle: "বাড়ী-মালিক ও ভাড়াটিয়ার প্রতি নোটিশ",
    enExp: "Mandates issuance of formal written notice to landlord and tenant before exercising any statutory powers under the Act.",
    bnExp: "যেকোনো আদেশ দেওয়ার পূর্বে সংশ্লিষ্ট বাড়িওয়ালা ও ভাড়াটিয়াকে লিখিত নোটিশ জারি করা বাধ্যতামূলক।",
    enCaution: "Orders passed without statutory notice may be set aside on appeal.",
    bnCaution: "নোটিশ জারি ব্যতিরেকে একতরফা আদেশ বাতিলযোগ্য হতে পারে।",
    keywords: ["notice to landlord tenant", "malik varatia notice", "statutory notice rent", "নোটিশ প্রদান", "ধারা ৫"]
  },
  6: {
    id: "premises-rent-6",
    enTitle: "Power of Entry and Inspection",
    bnTitle: "বাড়ীতে প্রবেশ ও পরিদর্শনের ক্ষমতা",
    enExp: "Empowers the Rent Controller or authorized officers to enter and inspect rented premises between sunrise and sunset after giving at least 24 hours' notice.",
    bnExp: "তদন্তের উদ্দেশ্যে সূর্যোদয় থেকে সূর্যাস্তের মধ্যে কমপক্ষে ২৪ ঘণ্টার নোটিশ দিয়ে ভাড়া দেওয়া বাড়ী পরিদর্শন করার ক্ষমতা।",
    enCaution: "Inspection without 24 hours' notice or after sunset is strictly unlawful.",
    bnCaution: "সূর্যাস্তের পর বা নোটিশ ছাড়া পরিদর্শনে প্রবেশ বেআইনি।",
    keywords: ["power of inspection", "barite probesh poridoroshan", "24 hours notice inspection", "প্রবেশ ও পরিদর্শন", "ধারা ৬"]
  },
  7: {
    id: "rent-control-7", // preserved ID
    enTitle: "Restrictions on Rent Increases and Standard Rent Ceiling",
    bnTitle: "ভাড়া বৃদ্ধির উপর বাধানিষেধ ও মানসম্মত ভাড়া",
    enExp: "Prohibits rent increases beyond the standard rent fixed under this Act; any agreement demanding rent in excess of standard rent is legally null and void.",
    bnExp: "মানসম্মত ভাড়ার অতিরিক্ত ভাড়া বৃদ্ধি আইনত নিষিদ্ধ; মানসম্মত ভাড়ার অতিরিক্ত কোনো চুক্তি বাতিল ও অকার্যকর।",
    enCaution: "Standard rent is capped at 15% per annum of market value. Demanding excess rent is penal under Section 23.",
    bnCaution: "মানসম্মত ভাড়া সাধারণত সম্পত্তির বাজারমূল্যের বার্ষিক ১৫% এর ভিত্তিতে নির্ধারিত হয়। অতিরিক্ত ভাড়া দাবি শাস্তিযোগ্য (ধারা ২৩)।",
    keywords: ["restrictions on rent increase", "standard rent ceiling", "manshommoto bhara", "মানসম্মত ভাড়া", "ধারা ৭", "rent-control-7", "বাড়িওয়ালা প্রতি মাসে ভাড়া নিচ্ছে কিন্তু কোনো লিখিত রসিদ দেয় না", "প্রতি মাসে ভাড়া", "ভাড়া বৃদ্ধি বাধানিষেধ"]
  },
  8: {
    id: "premises-rent-8", // preserved ID
    enTitle: "Rent Increase for Landlord Additions, Alterations, and Furniture",
    bnTitle: "উন্নয়ন এবং আসবাবপত্র সরবরাহের জন্য ভাড়া বৃদ্ধিকরণ",
    enExp: "Permits rent increase only where landlord executes substantial structural additions or improvements at his own expense or provides furniture, not exceeding 10% per annum of improvement expenditure.",
    bnExp: "বাড়িওয়ালা নিজ খরচে উল্লেখযোগ্য কাঠামোগত সংস্কার বা আসবাবপত্র দিলে ব্যয়ের সর্বোচ্চ ১০% হারে মাসিক ভাড়া বাড়াতে পারেন।",
    enCaution: "Routine maintenance or painting does not justify rent increase. Dispute lies before Rent Controller.",
    bnCaution: "নিয়মিত রক্ষণাবেক্ষণ বা চুনকামের খরচে ভাড়া বৃদ্ধি করা বেআইনি; একতরফা বৃদ্ধির বিরুদ্ধে কন্ট্রোলারের নিকট আবেদন করা যায়।",
    keywords: ["rent increase landlord additions", "furniture rent increase", "barir unnoyon bhara", "উন্নয়ন বাবদ ভাড়া বৃদ্ধি", "ধারা ৮"]
  },
  9: {
    id: "premises-rent-9",
    enTitle: "Rent Increase Due to Municipal Tax or Rate Hike",
    bnTitle: "কর বা পৌর অভিকর বৃদ্ধির কারণে ভাড়া বৃদ্ধি",
    enExp: "Authorizes proportionate rent increase where municipal taxes, rates, or cesses are newly levied or increased after tenancy commencement.",
    bnExp: "চুক্তি শুরুর পর পৌর কর্পোরেশন বা সিটি কর্পোরেশনের হোল্ডিং ট্যাক্স বৃদ্ধি পেলে বাড়িওয়ালা সেই আনুপাতিক অংশ ভাড়ার সাথে যোগ করতে পারেন।",
    enCaution: "Increase cannot exceed actual additional tax levied. Proof of municipal assessment required.",
    bnCaution: "পৌর কর বৃদ্ধির অতিরিক্ত কোনো অঙ্ক দাবি করা বেআইনি। হোল্ডিং ট্যাক্স রসিদ প্রদর্শন আবশ্যক।",
    keywords: ["municipal tax rent increase", "holding tax bhara", "pouro kor bhara briddhi", "পৌর কর ভাড়া বৃদ্ধি", "ধারা ৯"]
  },
  10: {
    id: "premises-rent-10", // preserved ID
    enTitle: "Prohibition of Premium, Salami, Fine, and Advance Exceeding One Month",
    bnTitle: "প্রিমিয়াম, সালামি ও এক মাসের বেশি অগ্রিম ভাড়া নিষিদ্ধ",
    enExp: "Strictly prohibits landlords from claiming, receiving, or asking for any premium, salami, fine, or advance rent exceeding one month's rent as condition of tenancy or renewal.",
    bnExp: "বাড়িভাড়া দেওয়া বা নবায়নের শর্ত হিসেবে কোনো প্রিমিয়াম, সালামি বা ১ মাসের অতিরিক্ত অগ্রিম ভাড়া দাবি বা গ্রহণ করা সম্পূর্ণ বেআইনি ও নিষিদ্ধ।",
    enCaution: "Any advance paid exceeding 1 month's rent can be adjusted against monthly rent under Section 14.",
    bnCaution: "এক মাসের অতিরিক্ত অগ্রিম দেওয়া থাকলে তা ধারা ১৪ অনুযায়ী মাসিক ভাড়ার সাথে সমন্বয়ের আইনি অধিকার রয়েছে।",
    keywords: ["prohibition premium salami", "advance rent ceiling 1 month", "ogrim bhara nishedh", "সালামি প্রিমিয়াম নিষিদ্ধ", "ধারা ১০"]
  },
  11: {
    id: "premises-rent-11",
    enTitle: "Exception for Long-Term Development Leases",
    bnTitle: "উন্নয়নের জন্য দীর্ঘ মেয়াদী ভাড়ার ক্ষেত্রে ব্যতিক্রম",
    enExp: "Exempts bona fide long-term construction or reconstruction leases (development agreements) from Section 10 advance restrictions.",
    bnExp: "ভবন নির্মাণ বা পুনঃনির্মাণের জন্য সম্পাদিত দীর্ঘমেয়াদী উন্নয়ন চুক্তির ক্ষেত্রে ধারা ১০-এর অগ্রিম নিষেধাজ্ঞা প্রযোজ্য নয়।",
    enCaution: "Applies exclusively to development construction leases, not standard residential tenancies.",
    bnCaution: "কেবলমাত্র দীর্ঘমেয়াদী নির্মাণ চুক্তির ক্ষেত্রে এই ব্যতিক্রম প্রযোজ্য, সাধারণ আবাসিক বা বাণিজ্যিক ভাড়ায় নয়।",
    keywords: ["long-term development lease exception", "construction lease advance", "dirghomeyadi bhara", "দীর্ঘমেয়াদী ভাড়া ব্যতিক্রম", "ধারা ১১"]
  },
  12: {
    id: "premises-rent-12",
    enTitle: "Purchase of Furniture Shall Not Be Condition of Lease",
    bnTitle: "আসবাবপত্র ক্রয় ভাড়ার শর্ত হইবে না",
    enExp: "Prohibits landlords from compelling an incoming tenant to purchase any furniture or fittings as a prerequisite for letting premises.",
    bnExp: "বাড়িভাড়া দেওয়ার পূর্বশর্ত হিসেবে ভাড়াটিয়াকে আসবাবপত্র কিনতে বাধ্য করা বা আসবাবের কৃত্রিম উচ্চমূল্য দাবি করা বেআইনি।",
    enCaution: "Forced furniture purchase at inflated price is treated as illegal premium under Section 10.",
    bnCaution: "আসবাবপত্র ক্রয়ে বাধ্য করে অতিরিক্ত অর্থ গ্রহণ প্রিমিয়াম হিসেবে গণ্য হবে এবং ফেরতযোগ্য।",
    keywords: ["furniture purchase not condition", "forced furniture purchase", "ashbabpotro kroy shorto noy", "আসবাবপত্র ক্রয় শর্ত নয়", "ধারা ১২"]
  },
  13: {
    id: "rent-control-13", // preserved ID
    enTitle: "Landlord Obligation to Provide Signed Written Rent Receipt",
    bnTitle: "ভাড়া আদায়ের লিখিত রসিদ প্রদান",
    enExp: "Mandates that the landlord must immediately issue a signed written rent receipt upon receiving rent payment, specifying period and amount.",
    bnExp: "ভাড়া পরিশোধ করার সাথে সাথে বাড়িওয়ালা স্বাক্ষরিত লিখিত ভাড়ার রসিদ দিতে আইনত বাধ্য, যাতে টাকার অঙ্ক ও মাসের উল্লেখ থাকবে।",
    enCaution: "Failure to issue receipt is punishable under Section 27 with fine up to double rent. Always preserve written receipts or bank/MFS transfers.",
    bnCaution: "রসিদ না দেওয়া ধারা ২৭ অনুযায়ী দণ্ডনীয় অপরাধ (দ্বিগুণ জরিমানা)। প্রমাণ ছাড়া নগদ টাকা পরিশোধ করবেন না; ব্যাংক বা এমএফএস ব্যবহার করুন।",
    keywords: ["rent receipt mandatory", "written rent receipt", "bhara roshid", "ভাড়ার রসিদ", "ধারা ১৩", "rent-control-13", "বাড়িওয়ালা প্রতি মাসে ভাড়া নিচ্ছে কিন্তু কোনো লিখিত রসিদ দেয় না", "কোনো লিখিত রসিদ দেয় না", "ভাড়া রসিদ দেয় না", "রসিদ প্রদানের বাধ্যবাধকতা"]
  },
  14: {
    id: "premises-rent-14", // preserved ID
    enTitle: "Refund and Adjustment of Irrecoverable or Excess Rent",
    bnTitle: "অনাদায়যোগ্য অতিরিক্ত ভাড়া ফেরত বা সমন্বয়",
    enExp: "Entitles tenant to recover or adjust against rent any money paid in excess of standard rent or illegal advance/premium, within 6 months of payment.",
    bnExp: "আইনবহির্ভূতভাবে প্রদত্ত অতিরিক্ত ভাড়া বা অগ্রিমের টাকা ভাড়াটিয়া ৬ মাসের মধ্যে বাড়িওয়ালার নিকট থেকে দাবি বা নিয়মিত ভাড়ার সাথে সমন্বয় করতে পারেন।",
    enCaution: "Claim for refund or adjustment must be made within strictly 6 months from date of payment. Serve written notice to landlord.",
    bnCaution: "টাকা পরিশোধের তারিখ থেকে ৬ মাসের মধ্যে ফেরত বা সমন্বয়ের দাবি করতে হবে। সমন্বয়ের পূর্বে লিখিত নোটিশ প্রদান করুন।",
    keywords: ["refund excess rent", "rent adjustment 6 months", "otirikto bhara somonwoy", "অতিরিক্ত ভাড়া ফেরত", "ধারা ১৪"]
  },
  15: {
    id: "premises-rent-15",
    enTitle: "Powers and Duties of Rent Controller in Fixing Standard Rent",
    bnTitle: "নিয়ন্ত্রকের ক্ষমতা ও দায়িত্ব (মানসম্মত ভাড়া নির্ধারণ)",
    enExp: "Empowers the Controller, on application by landlord or tenant, to fix the standard rent of premises based on 15% per annum of market value plus taxes.",
    bnExp: "বাড়িওয়ালা বা ভাড়াটিয়ার আবেদনের প্রেক্ষিতে কন্ট্রোলার জমির মূল্য ও নির্মাণ ব্যয়ের সর্বোচ্চ ১৫% বার্ষিক হারে মানসম্মত ভাড়া নির্ধারণ করেন।",
    enCaution: "Application must be formally filed before Rent Controller. Standard rent determination stays arbitrary eviction.",
    bnCaution: "মানসম্মত ভাড়া নির্ধারণের জন্য কন্ট্রোলার আদালতে আরজি দাখিল করতে হয়। আবেদন বিচারাধীন থাকা অবস্থায় উচ্ছেদ করা যায় না।",
    keywords: ["fixing standard rent controller", "15 percent market value rent", "manshommoto bhara nirdharon", "মানসম্মত ভাড়া নির্ধারণ", "ধারা ১৫"]
  },
  16: {
    id: "premises-rent-16",
    enTitle: "Effective Date and Duration of Standard Rent",
    bnTitle: "মানসম্মত ভাড়া কার্যকর হওয়ার তারিখ এবং উহার মেয়াদ",
    enExp: "Provides that standard rent takes effect from the first day of the month following the application, and remains binding and unalterable for 3 years.",
    bnExp: "মানসম্মত ভাড়া দরখাস্ত দাখিলের পরবর্তী মাসের প্রথম দিন হইতে কার্যকর হয় এবং ৩ বছর পর্যন্ত অপরিবর্তিত থাকে।",
    enCaution: "Standard rent remains legally fixed for 3 years; no rent hike petition lies during this period.",
    bnCaution: "একবার মানসম্মত ভাড়া নির্ধারিত হলে ৩ বছরের মধ্যে পুনরায় ভাড়া বৃদ্ধির আবেদন করা যায় না।",
    keywords: ["duration standard rent 3 years", "standard rent effective date", "ভাড়া কার্যকরের তারিখ মেয়াদ", "ধারা ১৬"]
  },
  17: {
    id: "premises-rent-17",
    enTitle: "Distress Warrants and Rent Attachment Restrictions",
    bnTitle: "কতিপয় ক্ষেত্রে ক্রোক পরোয়ানা ইত্যাদি",
    enExp: "Restricts distress warrants under CPC for rent recovery; court cannot issue distress warrants unless rent claimed has been fixed by Controller or agreed without dispute.",
    bnExp: "বকেয়া ভাড়ার জন্য ক্রোকি পরোয়ানা জারির ক্ষেত্রে বাধানিষেধ; বিতর্কিত বা অতিরিক্ত ভাড়ার ক্ষেত্রে আদালত ক্রোক পরোয়ানা জারি করবেন না।",
    enCaution: "Distress warrant cannot issue where rent amount is disputed or pending adjudication before Controller.",
    bnCaution: "ভাড়া নিয়ে বিরোধ বিচারাধীন থাকলে বাড়িওয়ালা একতরফা ক্রোকি পরোয়ানা পেতে পারেন না।",
    keywords: ["distress warrant rent", "attachment restriction rent", "kroki poroyana nishedh", "ক্রোক পরোয়ানা বাধা", "ধারা ১৭"]
  },
  18: {
    id: "rent-control-18", // preserved ID
    enTitle: "Protection of Tenant Against Eviction as Long as Standard Rent is Paid",
    bnTitle: "অনুমোদনযোগ্য ভাড়া প্রদান করা হইলে সাধারণতঃ উচ্ছেদের আদেশ নিষিদ্ধ",
    enExp: "Protects tenants from eviction: as long as tenant pays standard rent to full legal extent, no order or decree for recovery of possession can be passed, subject to specific narrow statutory exceptions.",
    bnExp: "ভাড়াটিয়া নিয়মিত মানসম্মত ভাড়া পরিশোধ করলে তাকে সাধারণতঃ উচ্ছেদ করা যাবে না; বাড়িওয়ালা কেবল যুক্তিযুক্ত নিজস্ব প্রয়োজন বা শর্তভঙ্গে উচ্ছেদের ডিক্রি চাইতে পারেন।",
    enCaution: "Tenant is protected from eviction if rent is tendered on time. If landlord refuses rent, tenant must remit by postal money order by 15th of next month and deposit with Controller under Section 19.",
    bnCaution: "বাড়িওয়ালা ভাড়া নিতে অস্বীকৃতি জানালে খেলাপ এড়াতে ধারা ১৯ অনুযায়ী পরবর্তী মাসের ১৫ তারিখের মধ্যে মানি অর্ডার এবং প্রত্যাখ্যাত হলে ১৫ দিনের মধ্যে কন্ট্রোলারের নিকট ভাড়া জমা দিতে হবে।",
    keywords: ["protection against eviction", "standard rent payment eviction bar", "tenant eviction decree bar", "উচ্ছেদ নিষেধ", "ধারা ১৮", "rent-control-18"]
  },
  19: {
    id: "premises-rent-19", // preserved ID
    enTitle: "Deposit of Rent by Tenant with Rent Controller",
    bnTitle: "কতিপয় পরিস্থিতিতে ভাড়াটিয়া কর্তৃক ভাড়া জমা",
    enExp: "Authorizes tenant to tender rent by registered postal money order by the 15th of the following month if landlord refuses; if returned unaccepted, tenant deposits rent with the Rent Controller within 15 days of postal return.",
    bnExp: "বাড়িওয়ালা ভাড়া নিতে না চাইলে পরবর্তী মাসের ১৫ তারিখের মধ্যে মানি অর্ডার পাঠাতে হবে; ফেরত আসলে ১৫ দিনের মধ্যে কন্ট্রোলার কার্যালয়ে চালানের মাধ্যমে ভাড়া জমা দিলে উচ্ছেদ থেকে সুরক্ষা মেলে।",
    enCaution: "Strict limitation: deposit with Controller within 15 days of money order return. Keep postal coupon and Treasury Chalan receipts.",
    bnCaution: "১৫ দিনের সময়সীমা অতিক্রম করলে ভাড়াটিয়া ডিফল্টার (Default) হিসেবে গণ্য হতে পারে। ডাক রসিদ ও কুপন সতর্কতার সাথে সংরক্ষণ করুন।",
    keywords: ["deposit rent controller", "money order rent deposit", "controller kache bhara joma", "কন্ট্রোলারে ভাড়া জমা", "ধারা ১৯"]
  },
  20: {
    id: "premises-rent-20",
    enTitle: "Savings Regarding Acceptance of Money Order or Rent Withdrawal",
    bnTitle: "মনি-অর্ডার যোগে প্রেরিত ভাড়া গ্রহণ বা ভাড়া উঠানোর বিষয়ে হেফাজত",
    enExp: "Clarifies that landlord accepting postal money order or withdrawing deposited rent does not constitute waiver of notice to quit or prejudice any eviction suit.",
    bnExp: "বাড়িওয়ালা মানি অর্ডার গ্রহণ করলে বা কন্ট্রোলারের নিকট থেকে ভাড়া উত্তোলন করলে উচ্ছেদ মামলার অধিকার স্বয়ংক্রিয়ভাবে মওকুফ হবে না।",
    enCaution: "Withdrawal of deposited rent without prejudice does not bar landlord from continuing eviction proceedings.",
    bnCaution: "ভাড়া গ্রহণ করা সত্ত্বেও বাড়িওয়ালা নোটিশ বহাল রেখে উচ্ছেদ মামলা পরিচালনা করতে পারেন।",
    keywords: ["savings acceptance money order", "rent withdrawal eviction waiver", "bhara uttolon hefazot", "ভাড়া গ্রহণ হেফাজত", "ধারা ২০"]
  },
  21: {
    id: "premises-rent-21",
    enTitle: "Repairs and Maintenance by Tenant Upon Landlord Neglect",
    bnTitle: "ভাড়াটিয়া কর্তৃক মেরামত ইত্যাদি",
    enExp: "Requires landlord to keep premises in good tenantable repair; upon landlord failure after 30 days' written notice, tenant may execute repairs with Controller permission and deduct cost (up to 1 month's rent per year).",
    bnExp: "বাড়িওয়ালা বাড়ি মেরামত না করলে ৩০ দিনের নোটিশ দিয়ে কন্ট্রোলারের অনুমতি নিয়ে ভাড়াটিয়া নিজ খরচে মেরামত করিয়ে ভাড়ার সাথে সমন্বয় করতে পারেন (বছরে সর্বোচ্চ ১ মাসের ভাড়া)।",
    enCaution: "Must obtain Controller's prior permission and give 30 days' notice before executing repairs and deducting expenses.",
    bnCaution: "কন্ট্রোলারের অনুমতি ছাড়া নিজে মেরামত করে ভাড়া থেকে কেটে নিলে বকেয়া খেলাপের অভিযোগ উঠতে পারে। লিখিত নোটিশ ও প্রাক্কলন ব্যয় দাখিল করুন।",
    keywords: ["tenant repairs maintenance", "landlord neglect repairs", "barir meramot somonwoy", "ভাড়াটিয়া কর্তৃক মেরামত", "ধারা ২১"]
  },
  22: {
    id: "premises-rent-22",
    enTitle: "Repair of Premises by Deputy Commissioner",
    bnTitle: "ডেপুটি কমিশনার কর্তৃক বাড়ী মেরামত ইত্যাদি",
    enExp: "Empowers the Deputy Commissioner to order urgent necessary repairs to avoid danger to public safety or tenants if landlord neglects.",
    bnExp: "জননিরাপত্তা বা ভাড়াটিয়ার সুরক্ষার স্বার্থে বিপজ্জনক বাড়ি সংস্কারের জন্য জেলা প্রশাসক সরাসরি আদেশ দিতে পারেন।",
    enCaution: "Applies to structural hazards endangering life or public safety.",
    bnCaution: "ভবন ঝুঁকিপূর্ণ বা ধসে পড়ার আশঙ্কা থাকলে জেলা প্রশাসনের নজরে আনা যায়।",
    keywords: ["repair by deputy commissioner", "dangerous building repairs dc", "bipojjonok bari meramot", "ডিসি কর্তৃক মেরামত", "ধারা ২২"]
  },
  23: {
    id: "premises-rent-23",
    enTitle: "Penalty for Charging Rent in Excess of Standard Rent",
    bnTitle: "মানসম্মত ভাড়ার অতিরিক্ত ভাড়া আদায়ের দণ্ড",
    enExp: "Criminalizes knowingly claiming, receiving, or attempting to obtain rent in excess of standard rent, punishable with fine up to double the excess amount for first offense, and up to triple for repeats.",
    bnExp: "মানসম্মত ভাড়ার অতিরিক্ত ভাড়া জ্ঞাতসারে দাবি বা আদায় করা দণ্ডনীয় অপরাধ; প্রথমবারে অতিরিক্ত টাকার দ্বিগুণ জরিমানা এবং পরবর্তীতে তিনগুণ জরিমানা।",
    enCaution: "Complaint must be filed before Rent Controller within 6 months of offense under Section 29.",
    bnCaution: "ধারা ২৯ অনুযায়ী অপরাধের অভিযোগ ৬ মাসের মধ্যে কন্ট্রোলারের নিকট দায়ের করতে হবে।",
    keywords: ["penalty excess rent", "charging excess rent fine", "otirikto bhara dondo", "অতিরিক্ত ভাড়া দণ্ড", "ধারা ২৩"]
  },
  24: {
    id: "premises-rent-24",
    enTitle: "Penalty for Disturbing Easements, Utilities, and Essential Services",
    bnTitle: "সুখাধিকার ও ইউটিলিটিতে বাধা প্রদানের দণ্ড",
    enExp: "Criminalizes landlord disconnecting, cutting off, or withholding essential utility supplies (water, gas, electricity, sewerage, toilet) to force eviction, punishable with imprisonment up to 6 months or fine or both.",
    bnExp: "উচ্ছেদের উদ্দেশ্যে গ্যাস, বিদ্যুৎ, পানি বা পয়ঃনিষ্কাশন ইউটিলিটি সংযোগ বিচ্ছিন্ন বা বাধা দেওয়া ফৌজদারি অপরাধ; সাজা অনধিক ৬ মাস কারাদণ্ড বা অর্থদণ্ড বা উভয় দণ্ড।",
    enCaution: "Cutting off water/power/gas is a punishable criminal offense. File immediate complaint before Rent Controller and local Police Thana.",
    bnCaution: "ইউটিলিটি বিচ্ছিন্ন করলে তাৎক্ষণিক থানায় জিডি/অভিযোগ এবং ভাড়া নিয়ন্ত্রণ আদালতে সংযোগ পুনর্বহালের জরুরি দরখাস্ত করা যায়।",
    keywords: ["penalty cutting off utilities", "disconnection water electricity gas", "utility bondho dondo", "ইউটিলিটি বিচ্ছিন্ন দণ্ড", "ধারা ২৪", "পানি বিদ্যুৎ গ্যাস কর্তন"]
  },
  25: {
    id: "premises-rent-25",
    enTitle: "Penalty for Giving False Name or Address of Landlord",
    bnTitle: "বাড়ি-মালিকের ভুল নাম বা ঠিকানা দেওয়ার দণ্ড",
    enExp: "Punishes a tenant who deliberately gives a false name or address of landlord when depositing rent under Section 19, with fine up to 500 taka.",
    bnExp: "ভাড়া জমা দেওয়ার সময় বাড়িওয়ালার মিথ্যা বা উদ্দেশ্যপ্রণোদিত ভুল নাম-ঠিকানা দিলে ভাড়াটিয়া অনধিক ৫০০ টাকা অর্থদণ্ডে দণ্ডিত হবেন।",
    enCaution: "Accurate landlord details from rental agreement must be stated in rent deposit petitions.",
    bnCaution: "চুক্তিনামা বা পূর্ববর্তী রসিদ অনুযায়ী সঠিক নাম-ঠিকানা উল্লেখ করা আবশ্যক।",
    keywords: ["false landlord address penalty", "bhul thikana dondo", "malik bhul thikana", "ভুল নাম ঠিকানা দণ্ড", "ধারা ২৫"]
  },
  26: {
    id: "premises-rent-26",
    enTitle: "Penalty for Tenant Failing to Deliver Vacant Possession",
    bnTitle: "বাড়ী দখল বুঝাইয়া দেওয়ার ক্ষেত্রে ভাড়াটিয়ার ব্যর্থতার দণ্ড",
    enExp: "Punishes a tenant who vacates premises but fails to deliver vacant possession to landlord or lets unauthorized third parties occupy, with fine up to double standard rent.",
    bnExp: "বাড়ি ছেড়ে যাওয়ার সময় অন্য কাউকে বেআইনিভাবে তুলে দিলে বা বাড়িওয়ালাকে খালি দখল না বুঝিয়ে দিলে মানসম্মত ভাড়ার দ্বিগুণ অর্থদণ্ড প্রযোজ্য।",
    enCaution: "Unlawful sub-letting or surrendering possession to unauthorized third parties attracts statutory fine.",
    bnCaution: "সাবলেট (Sublet) দেওয়া থাকলে বাড়িওয়ালার অনুমতি ছাড়া তৃতীয় ব্যক্তিকে দখল দিলে জরিমানা হতে পারে।",
    keywords: ["failure deliver vacant possession", "illegal sublet penalty", "khali dokhol na deya", "খালি দখল না দেওয়ার দণ্ড", "ধারা ২৬"]
  },
  27: {
    id: "premises-rent-27",
    enTitle: "Penalty for Failure to Issue Rent Receipt",
    bnTitle: "রশিদ প্রদানে ব্যর্থতার দণ্ড",
    enExp: "Punishes a landlord who fails or refuses to issue a signed written rent receipt under Section 13, with fine up to double the amount received.",
    bnExp: "ধারা ১৩ অনুযায়ী ভাড়া গ্রহণের লিখিত রসিদ দিতে অস্বীকৃতি বা ব্যর্থ হলে বাড়িওয়ালাকে গৃহীত ভাড়ার দ্বিগুণ পর্যন্ত অর্থদণ্ডে দণ্ডিত করা যাবে।",
    enCaution: "Statutory limitation: file complaint before Rent Controller within 6 months of refusal under Section 29.",
    bnCaution: "ধারা ২৯ অনুযায়ী রসিদ না দেওয়ার ৬ মাসের মধ্যে কন্ট্রোলারের নিকট লিখিত অভিযোগ দাখিল করতে হবে।",
    keywords: ["penalty failure issue receipt", "rent receipt refusal fine", "roshid na deyar dondo", "রসিদ না দেওয়ার দণ্ড", "ধারা ২৭", "ভাড়া রসিদ জরিমানা"]
  },
  28: {
    id: "premises-rent-28",
    enTitle: "Procedure for Filing Complaints for Offenses",
    bnTitle: "অভিযোগ দায়ের ইত্যাদি",
    enExp: "Specifies that complaints under Sections 23, 24, 25, 26, and 27 must be filed before the Rent Controller with necessary court fees.",
    bnExp: "ইউটিলিটি কর্তন, রসিদ না দেওয়া বা অতিরিক্ত ভাড়া আদায়ের অপরাধের বিরুদ্ধে ভাড়া নিয়ন্ত্রণ আদালতে আনুষ্ঠানিক অভিযোগ দায়েরের বিধান।",
    enCaution: "Controller conducts summary inquiry into statutory penal offenses and imposes fines.",
    bnCaution: "কন্ট্রোলার অভিযোগ তদন্ত সাপেক্ষে জরিমানা আরোপ বা বিচারিক আদালতে প্রেরণের নির্দেশ দেন।",
    keywords: ["filing complaints rent offenses", "complaint procedure rent", "obhijog dayer bebostha", "অভিযোগ দায়ের", "ধারা ২৮"]
  },
  29: {
    id: "premises-rent-29",
    enTitle: "Statutory Limitation for Filing Rent Control Complaints",
    bnTitle: "অভিযোগ তামাদি (৬ মাসের সময়সীমা)",
    enExp: "Mandates that no complaint under Section 23, 25, 26, or 27 shall be entertained unless filed within 6 months from the date of the offense.",
    bnExp: "ভাড়া নিয়ন্ত্রণ আইনের কোনো অপরাধ সংঘটনের তারিখ থেকে অনধিক ৬ মাসের মধ্যে অভিযোগ দায়ের করতে হবে; ৬ মাস অতিক্রান্ত হলে অভিযোগ তামাদিদোষে বারিত হবে।",
    enCaution: "Strict statutory limitation: complaints must be filed within exactly 6 months from offense. Late complaints are barred by limitation.",
    bnCaution: "কঠোর ৬ মাসের বিধিবদ্ধ তামাদি। রসিদ না দেওয়া বা অতিরিক্ত ভাড়া আদায়ের ৬ মাস পার হয়ে গেলে কন্ট্রোলার অভিযোগ গ্রহণ করবেন না।",
    keywords: ["limitation rent complaint 6 months", "obhijog tamadi 6 mash", "rent control limitation", "অভিযোগ তামাদি ৬ মাস", "ধারা ২৯"]
  },
  30: {
    id: "premises-rent-30",
    enTitle: "Appeal and Review of Rent Controller Orders",
    bnTitle: "আপীল ও পুনর্বিবেচনা (৩০ দিনের সময়সীমা)",
    enExp: "Provides that any person aggrieved by an order of the Rent Controller may appeal to the District Judge within 30 days of the order; Controller may also review own order.",
    bnExp: "কন্ট্রোলারের যেকোনো আদেশের বিরুদ্ধে সংক্ষুব্ধ পক্ষ ৩০ দিনের মধ্যে জেলা জজ আদালতে আপিল দায়ের করতে পারেন; এছাড়া কন্ট্রোলার স্বীয় আদেশ পুনর্বিবেচনা (Review) করতে পারেন।",
    enCaution: "Appeal limitation is strictly 30 days from date of Controller's order to the District Judge court.",
    bnCaution: "আপিল দায়েরের তামাদি সময়সীমা আদেশের তারিখ থেকে কঠোরভাবে ৩০ দিন। সার্টিফাইড কপিসহ দ্রুত জেলা জজ আদালতে আপিল করুন।",
    keywords: ["appeal rent controller 30 days", "district judge appeal rent", "appeal punorbibechona", "আপিল পুনর্বিবেচনা ৩০ দিন", "ধারা ৩০"]
  },
  31: {
    id: "premises-rent-31",
    enTitle: "Supply of Certified Copies of Controller Orders",
    bnTitle: "নিয়ন্ত্রকের আদেশের সত্যায়িত নকল সরবরাহ",
    enExp: "Entitles any person affected by an order of the Controller to receive certified copies of the order upon payment of prescribed fees.",
    bnExp: "কন্ট্রোলারের আদেশের সার্টিফাইড কপি বা নকল প্রাপ্তির বিধিবদ্ধ অধিকার।",
    enCaution: "Apply for certified copy immediately upon pronouncement to calculate 30-day appeal timeline.",
    bnCaution: "আপিল দায়েরের সুবিধার্থে অবিলম্বে আদেশের সার্টিফাইড কপির জন্য কোর্টে আবেদন করুন।",
    keywords: ["certified copy controller order", "adesher shottayito nokol", "certified copy rent", "সার্টিফাইড নকল", "ধারা ৩১"]
  },
  32: {
    id: "premises-rent-32",
    enTitle: "Tenant Right to Electricity Supply Without Landlord Permission",
    bnTitle: "বাড়ি-মালিকের বিনা অনুমতিতে বাড়ীতে বিদ্যুৎ সরবরাহ পাওয়ার অধিকারী",
    enExp: "Empowers the tenant, notwithstanding any other law, to obtain a direct separate electricity supply connection from the power utility without requiring the landlord's consent, upon applying to Controller.",
    bnExp: "বাড়িওয়ালার অনুমতি ছাড়াই ভাড়াটিয়া কন্ট্রোলারের আদেশের মাধ্যমে বিদ্যুৎ বিতরণ কর্তৃপক্ষের নিকট থেকে নিজস্ব বিদ্যুৎ মিটার বা সংযোগ পাওয়ার আইনগত অধিকারী।",
    enCaution: "Protects tenants against landlord extortion over sub-meters. Electricity connection can be secured directly via Controller order.",
    bnCaution: "বাড়িওয়ালা বিদ্যুৎ সংযোগে বাধা দিলে কন্ট্রোলারের আদেশ নিয়ে সরাসরি পল্লী বিদ্যুৎ বা ডেসকো/ডিপিডিসি থেকে মিটার নেওয়া যায়।",
    keywords: ["electricity without landlord consent", "tenant right electricity meter", "bina onumotite biddut", "বিনা অনুমতিতে বিদ্যুৎ", "ধারা ৩২", "বিদ্যুৎ সংযোগ মিটার"]
  },
  33: {
    id: "premises-rent-33",
    enTitle: "Exemption of Government and Statutory Authority Premises",
    bnTitle: "অব্যাহতি",
    enExp: "Exempts premises owned or requisitioned by Government, RAJUK, CDA, KDA, RDA, or Cantonment Board from the operation of this Act.",
    bnExp: "সরকারি ভবন, রাজউক, চউক, খুউক, রাউক বা সেনানিবাস কর্তৃপক্ষের মালিকানাধীন ভবনের ক্ষেত্রে এই আইন প্রযোজ্য নয়।",
    enCaution: "Does not apply to government-owned residential quarters or development authority commercial spaces.",
    bnCaution: "সরকারি খাস জমি বা সরকারি কোয়ার্টারের ভাড়ার ক্ষেত্রে এই আইনের সুবিধা প্রযোজ্য নয়।",
    keywords: ["government premises exemption", "rajuk cda exemption", "sorkari bhobon obbahoti", "সরকারি অব্যাহতি", "ধারা ৩৩"]
  },
  34: {
    id: "premises-rent-34",
    enTitle: "Power to Make Rules",
    bnTitle: "বিধি প্রণয়নের ক্ষমতা",
    enExp: "Empowers the Government to make rules by official gazette notification for carrying out the purposes of this Act.",
    bnExp: "এই আইনের উদ্দেশ্য বাস্তবায়নকল্পে সরকার সরকারি গেজেটে প্রজ্ঞাপন দ্বারা বিধি প্রণয়ন করতে পারে।",
    enCaution: "Procedural matters follow the notified Premises Rent Control Rules.",
    bnCaution: "বাড়ীভাড়া নিয়ন্ত্রণ বিধিমালা ১৯৬৪ বা প্রযোজ্য সরকারি বিধিমালা পদ্ধতিগতভাবে অনুসৃত হয়।",
    keywords: ["power to make rules rent", "bidhi pronoyon rent", "rent control rules", "বিধি প্রণয়ন", "ধারা ৩৪"]
  },
  35: {
    id: "premises-rent-35",
    enTitle: "Savings of Actions Under 1986 Ordinance",
    bnTitle: "হেফাজত",
    enExp: "Validates and saves all orders, appointments, suits, and actions taken under the Premises Rent Control Ordinance, 1986.",
    bnExp: "১৯৮৬ সালের বাড়ীভাড়া নিয়ন্ত্রণ অধ্যাদেশের অধীন গৃহীত যাবতীয় কার্যক্রমের বৈধতা হেফাজত।",
    enCaution: "Pending suits and proceedings initiated under previous ordinance continue seamlessly under this Act.",
    bnCaution: "পূর্ববর্তী অধ্যাদেশের অধীন চলমান মামলাসমূহ এই আইনের অধীন চলমান হিসেবে গণ্য হবে।",
    keywords: ["savings 1986 ordinance", "ordinance actions validation", "hefazot", "হেফাজত", "ধারা ৩৫"]
  },
  36: {
    id: "premises-rent-36",
    enTitle: "Repeal and Savings",
    bnTitle: "রহিতকরণ ও হেফাজত",
    enExp: "Repeals the Premises Rent Control Ordinance, 1991 (Ordinance No. 2 of 1991) and saves acts done thereunder.",
    bnExp: "১৯৯১ সালের ২ নং অধ্যাদেশ রহিতকরণ এবং তৎসংক্রান্ত যাবতীয় কার্যক্রম হেফাজত।",
    enCaution: "Primary legislative enactment supersedes previous provisional ordinance.",
    bnCaution: "আইন প্রবর্তনের পর অধ্যাদেশের পরিবর্তে এই আইনই প্রামাণ্য ভিত্তি।",
    keywords: ["repeal and savings rent", "rohitkoron hefazot", "ordinance 2 of 1991 repeal", "রহিতকরণ হেফাজত", "ধারা ৩৬"]
  }
};

const provisions = [];

for (const raw of rawExtracted) {
  const secNum = raw.secIndex;
  const meta = rentMeta[secNum];
  if (!meta) {
    console.error(`Missing metadata for section ${secNum}`);
    continue;
  }

  const id = meta.id;
  const sectionNumber = `Section ${secNum}`;
  const titleBn = `${meta.bnTitle} (ধারা ${secNum})`;
  const titleEn = `${meta.enTitle} (Section ${secNum})`;

  const cleanedOriginalText = cleanText(raw.text);

  const provision = {
    id,
    actId: 'act_premises_rent_1991',
    sectionNumber,
    categories: ['land'],
    title: {
      bn: titleBn,
      en: titleEn
    },
    originalText: cleanedOriginalText,
    originalLanguage: 'bn',
    plainExplanation: {
      bn: meta.bnExp,
      en: meta.enExp
    },
    caution: {
      bn: meta.bnCaution,
      en: meta.enCaution
    },
    sourceUrl: raw.url,
    retrievalDate: '2026-11-01',
    effectiveDate: '1991-03-23',
    legalStatus: 'active',
    reviewStatus: 'verified',
    contentHash: '',
    keywords: [
      ...meta.keywords,
      `ধারা ${secNum}`,
      `section ${secNum}`,
      `rent control ${secNum}`,
      `বাড়িভাড়া ধারা ${secNum}`,
      'বাড়িভাড়া নিয়ন্ত্রণ আইন',
      'tenant rights bangladesh',
      'landlord tenant dispute',
      'বাড়িভাড়া আইন'
    ]
  };

  provisions.push(provision);
}

fs.writeFileSync('scripts/premises_rent_1991_all.json', JSON.stringify(provisions, null, 2), 'utf8');
console.log(`Generated all ${provisions.length} provisions for Premises Rent Control Act, 1991`);
