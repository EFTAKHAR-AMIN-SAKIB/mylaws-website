import fs from 'fs';

const rawExtracted = JSON.parse(fs.readFileSync('scripts/raw_extracted_68.json', 'utf8'));

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

const partitionMeta = {
  1: {
    enTitle: "Title, Extent, and Saving",
    bnTitle: "শিরোনাম, ভৌগোলিক বিস্তৃতি ও হেফাজত",
    enExp: "Names the statute as The Partition Act, 1893 (Act No. IV of 1893), extends to the whole of Bangladesh, and came into force immediately on 9 March 1893.",
    bnExp: "এই আইনটি 'বাটোয়ারা আইন, ১৮৯৩' নামে অভিহিত, সমগ্র বাংলাদেশে প্রযোজ্য এবং ১৮৯৩ সালের ৯ মার্চ তারিখে কার্যকর হয়।",
    enCaution: "Applies to partition suits in civil courts where physical division of joint family or co-owned immovable property is disputed.",
    bnCaution: "দেওয়ানি আদালতে বাটোয়ারা বা বণ্টন মামলায় যৌথ বা পৈতৃক সম্পত্তি ভাগ-বাটোয়ারা সংক্রান্ত বিরোধে প্রযোজ্য।",
    keywords: ["partition act 1893", "bonton mamla ain", "batowara ain", "বাটোয়ারা আইন ১৮৯৩", "বণ্টন মামলা", "ধারা ১"]
  },
  2: {
    enTitle: "Power of Court to Order Sale Instead of Division in Partition Suits",
    bnTitle: "বাটোয়ারা মামলায় সম্পত্তি বিভাজনের পরিবর্তে বিক্রয়ের আদেশ প্রদানের আদালতের ক্ষমতা",
    enExp: "Authorizes the civil court in a partition suit to direct sale of the property and distribution of proceeds if physical division cannot reasonably or conveniently be made, upon request of shareholders holding at least one-half interest.",
    bnExp: "বাটোয়ারা মামলায় সম্পত্তিটি যদি বাস্তবিকভাবে সুবিধাজনকভাবে ভাগ করা না যায় এবং বিক্রি করা অধিক লাভজনক হয়, তবে অন্তত অর্ধেক (৫০%) হিস্যার অংশীদারগণের আবেদনে আদালত সম্পত্তিটি নিলাম বিক্রির নির্দেশ দিতে পারেন।",
    enCaution: "Parties holding collectively at least 50% of the property interest must request the sale before the court orders sale instead of partition.",
    bnCaution: "অন্তত ৫০ শতাংশ হিস্যার শরিকদের সম্মতিক্রমে বিক্রয়ের আবেদন করতে হয়; একক ক্ষুদ্র শরিক জোর করে বিক্রয় করাতে পারেন না।",
    keywords: ["sale instead of division", "partition suit sale", "bibhajon poriborte bikri", "বিভাজনের পরিবর্তে বিক্রয়", "ধারা ২", "বণ্টন নিলাম"]
  },
  3: {
    enTitle: "Procedure When Shareholder Undertakes to Buy Property",
    bnTitle: "কোনো শরিক সম্পত্তি খরিদ করিতে সম্মত হইলে আদালতের কর্মপদ্ধতি",
    enExp: "Provides that if a sale is requested under Section 2, any other shareholder can apply to purchase the share of the party requesting sale; court orders official valuation and offers it to the applying shareholder.",
    bnExp: "ধারা ২ অনুযায়ী বিক্রয়ের আবেদন হলে অন্য কোনো শরিক যদি ওই অংশ কিনতে আগ্রহ প্রকাশ করে, তবে আদালত সম্পত্তির মূল্যায়ন করে আবেদনকারী শরিককে তা কেনার সুযোগ প্রদান করবেন।",
    enCaution: "Prevents property from being auctioned off to strangers by giving existing co-sharers the statutory preemptive option to buy out at court-determined value.",
    bnCaution: "বহিরাগত ব্যক্তির কাছে নিলাম বিক্রি রোধে বিদ্যমান শরিকগণ আদালত নির্ধারিত মূল্যে জমি কিনে নেওয়ার অগ্রক্রয়াধিকার পান।",
    keywords: ["sharer undertakes to buy", "co-sharer buyout partition", "shorik kharid", "শরিক কর্তৃক খরিদ", "ধারা ৩", "বাটোয়ারা অগ্রক্রয়"]
  },
  4: {
    enTitle: "Partition Suit by Transferee of Share in Family Dwelling-House",
    bnTitle: "অবিভক্ত পরিবারের বসতবাড়ির অংশে বহিরাগত ক্রেতার বাটোয়ারা মামলায় শরিকদের খরিদের অধিকার",
    enExp: "Protects family privacy: where a share in an undivided family dwelling-house is transferred to an outsider, and the outsider sues for partition, any family shareholder can undertake to buy the outsider's share at court valuation.",
    bnExp: "পৈতৃক অবিভক্ত বসতবাড়ির অংশ যদি কোনো শরিক পরিবারের বাইরের কোনো অপরিচিত ব্যক্তির নিকট বিক্রি করে এবং সেই বহিরাগত বাটোয়ারা মামলা করে, তবে পরিবারের যেকোনো সদস্য আদালত কর্তৃক নির্ধারিত মূল্যে সেই অংশ কিনে নেওয়ার আইনগত অধিকারী।",
    enCaution: "Crucial citizen protection: an outside stranger purchaser CANNOT force entry or physical co-habitation in an undivided family home; family co-sharers have an unconditional statutory right to buy out the outsider's share.",
    bnCaution: "অত্যন্ত গুরুত্বপূর্ণ নাগরিক অধিকার: বহিরাগত ক্রেতা বসতবাড়িতে জোরপূর্বক বসবাস করতে পারবে না। পরিবারের যেকোনো শরিক ৪ ধারার দরখাস্ত দিয়ে আদালতের মূল্যায়নে উক্ত বহিরাগতকে টাকা পরিশোধ করে অংশটি নিজেরা রেখে দিতে পারেন।",
    keywords: ["dwelling house partition transferee", "section 4 partition act", "outside buyer family house", "bosotbari batowara shorik", "ধারা ৪", "বসতবাড়ি বাটোয়ারা", "বহিরাগত ক্রেতা প্রাক-ক্রয়"]
  },
  5: {
    enTitle: "Representation of Parties Under Disability",
    bnTitle: "অক্ষম বা অপ্রাপ্তবয়স্ক পক্ষগণের প্রতিনিধিত্ব",
    enExp: "Provides that in partition suits, requests for sale, undertakings to buy, or leave under Section 3 or 4 may be made on behalf of minors or persons under disability by their legal guardians.",
    bnExp: "নাবালক বা মানসিক প্রতিবন্ধী অংশীদারদের পক্ষে তাদের বৈধ অভিভাবক বা লিগ্যাল গার্ডিয়ান বিক্রয় বা খরিদের আবেদন করতে পারবেন।",
    enCaution: "The guardian must establish to the court's satisfaction that the undertaking is for the paramount benefit and interest of the minor.",
    bnCaution: "নাবালকের সর্বোত্তম স্বার্থ ক্ষুণ্ণ হলে আদালত অভিভাবকের আবেদন নামঞ্জুর করতে পারেন।",
    keywords: ["parties under disability partition", "minor partition guardian", "nabalok batowara", "অক্ষম পক্ষ প্রতিনিধিত্ব", "ধারা ৫"]
  },
  6: {
    enTitle: "Reserved Bidding and Bidding by Shareholders",
    bnTitle: "সংরক্ষিত মূল্য নির্ধারণ এবং অংশীদারগণ কর্তৃক নিলামে অংশগ্রহণ",
    enExp: "Requires the court to fix a reserve price in every partition sale under Section 2 to prevent distress sales, and allows existing shareholders to bid at the auction.",
    bnExp: "ধারা ২ এর অধীন নিলামে সম্পত্তি বিক্রয়ের সময় আদালত একটি সর্বনিম্ন সংরক্ষিত মূল্য (Reserve price) ধার্য করবেন এবং শরিকগণও নিলামে ডাক দিতে পারবেন।",
    enCaution: "Prevents collusive low-price purchases by requiring independent certified court valuation as reserve price.",
    bnCaution: "কম দামে সম্পত্তি হাতছাড়া রোধে আদালত অনুমোদিত সর্বনিম্ন সংরক্ষিত মূল্য নিশ্চিত করেন।",
    keywords: ["reserved bidding partition", "shareholder bidding auction", "nilam shongrokkhito mulya", "সংরক্ষিত নিলাম মূল্য", "ধারা ৬"]
  },
  7: {
    enTitle: "Procedure to be Followed in Case of Sales",
    bnTitle: "নিলাম বিক্রয়ের ক্ষেত্রে অনুসরণীয় পদ্ধতি",
    enExp: "Directs that sales under this Act shall follow the procedure prescribed under the Code of Civil Procedure (Order XXI CPC) for execution sales, subject to High Court Division rules.",
    bnExp: "এই আইনের অধীন সম্পত্তি বিক্রয়ের ক্ষেত্রে দেওয়ানি কার্যবিধি ১৯০৮-এর ২১ আদেশের নিলাম বিক্রয়ের যাবতীয় পদ্ধতি ও নিয়মাবলী প্রযোজ্য হবে।",
    enCaution: "Requires formal auction proclamation, public notice, and standard 25% earnest deposit by highest bidder at auction.",
    bnCaution: "সিপিসির নিলাম ইশতেহার ও নিলামের বিধিবিধান যথাযথভাবে তামিল করা আবশ্যক।",
    keywords: ["procedure partition sales", "order 21 cpc auction", "nilam bikri poddhoti", "বিক্রয় পদ্ধতি", "ধারা ৭"]
  },
  8: {
    enTitle: "Orders for Sale to be Deemed Appealable Decrees",
    bnTitle: "বিক্রয়ের আদেশ চূড়ান্ত ডিক্রি হিসেবে গণ্য ও আপিলযোগ্য হওয়া",
    enExp: "Enacts that any order for sale made by the court under Section 2, 3, or 4 shall be deemed to be a decree within the meaning of Section 2 of the Code of Civil Procedure, 1908.",
    bnExp: "ধারা ২, ৩ বা ৪ এর অধীন আদালত কর্তৃক প্রদত্ত বিক্রয়ের যেকোনো আদেশ দেওয়ানি কার্যবিধির ২ ধারা অনুযায়ী একটি চূড়ান্ত ডিক্রি হিসেবে গণ্য হবে এবং এর বিরুদ্ধে নিয়মিত আপিল চলে।",
    enCaution: "Directly appealable as a regular First Appeal (or Misc Appeal) before the District Judge or High Court Division, staying execution until appeal disposal.",
    bnCaution: "বিক্রয়ের আদেশের বিরুদ্ধে সংক্ষুব্ধ শরিক নিয়মিত আপিল দায়ের করতে পারেন; আপিল বিচারাধীন থাকা অবস্থায় নিলাম স্থগিতের আবেদন করা যায়।",
    keywords: ["orders for sale deemed decrees", "appeal against partition sale", "bikri adesh dikri", "বিক্রয় আদেশ ডিক্রি", "ধারা ৮", "বাটোয়ারা আপিল"]
  },
  9: {
    enTitle: "Saving of Power to Order Partly Partition and Partly Sale",
    bnTitle: "আংশিক বাটোয়ারা এবং আংশিক বিক্রয়ের আদেশ প্রদানের ক্ষমতা সংরক্ষণ",
    enExp: "Empowers the court in any partition suit to decree physical partition of whatever portion of the property is conveniently divisible and order sale only of the indivisible remaining part.",
    bnExp: "বিরোধীয় সম্পত্তির যে অংশ সুবিধাজনকভাবে ভাগ করা যায় তা শরিকদের মাঝে বণ্টন করে দিয়ে অবশিষ্ট অবিভাজ্য অংশটি বিক্রয়ের আদেশ দেওয়ার আদালতের ক্ষমতা।",
    enCaution: "Provides flexible equitable remedy where agricultural land is divided physically while commercial roadside shop or dwelling room is sold or bought out.",
    bnCaution: "জমি ভাগ করা সম্ভব হলে আদালত সরাসরি বণ্টন করবেন এবং কেবল অবশিষ্টাংশ বিক্রয়ের আদেশ দেবেন।",
    keywords: ["partly partition partly sale", "angshik batowara bikri", "flexible partition remedy", "আংশিক বণ্টন আংশিক বিক্রয়", "ধারা ৯"]
  }
};

const provisions = [];

for (const raw of rawExtracted) {
  const secNum = raw.secIndex;
  if (secNum > 9) continue; // Section 10 is omitted

  const meta = partitionMeta[secNum];
  if (!meta) continue;

  const id = `partition-${secNum}`;
  const sectionNumber = `Section ${secNum}`;
  const titleBn = `${meta.bnTitle} (ধারা ${secNum})`;
  const titleEn = `${meta.enTitle} (Section ${secNum})`;

  const cleanedOriginalText = cleanText(raw.text);

  const provision = {
    id,
    actId: 'act_partition_1893',
    sectionNumber,
    categories: ['land', 'family'],
    title: {
      bn: titleBn,
      en: titleEn
    },
    originalText: cleanedOriginalText,
    originalLanguage: 'en',
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
    effectiveDate: '1893-03-09',
    legalStatus: 'active',
    reviewStatus: 'verified',
    contentHash: '',
    keywords: [
      ...meta.keywords,
      `ধারা ${secNum}`,
      `section ${secNum}`,
      `partition ${secNum}`,
      `বাটোয়ারা ধারা ${secNum}`,
      'The Partition Act 1893',
      'বাটোয়ারা মামলা',
      'বণ্টন মামলা',
      'family property partition'
    ]
  };

  provisions.push(provision);
}

fs.writeFileSync('scripts/partition_1893_all.json', JSON.stringify(provisions, null, 2), 'utf8');
console.log(`Generated all ${provisions.length} provisions for The Partition Act, 1893`);
