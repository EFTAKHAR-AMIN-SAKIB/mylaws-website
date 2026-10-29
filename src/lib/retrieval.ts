import { provisions, type Category, type Lang, type Provision } from '../data/legal';

const stop = new Set(
  'a an the i my me we our you your he his she her it its to for of is are was were be been in on at and or but with from can could would should what how do does did about tell please have has had not law laws bangladesh legal rights know want help need am this that which explain'.split(' ')
);

const bnStop = new Set(
  'আমি আমার আমাকে আমাদের আপনি আপনার কি কী কেন কিভাবে কীভাবে এবং বা এর এই সেই একটি আছে হয় হবে করে করতে আইন অধিকার বাংলাদেশ সম্পর্কে জানতে চাই বলুন যদি তাহলে'.split(' ')
);

export function normalize(s: string): string {
  return s
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[০-৯]/g, (c) => String(c.charCodeAt(0) - 0x09e6))
    .replace(/[^\p{L}\p{N}\p{M}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokens(s: string): string[] {
  return normalize(s)
    .split(' ')
    .filter((t) => t.length > 1 && !stop.has(t) && !bnStop.has(t));
}

export function isBanglish(text: string): boolean {
  return (
    !/[\u0980-\u09ff]/.test(text) &&
    /\b(amr|amar|ami|kono|beton|betan|deynai|krbo|korbo|nai|tahole|ki|kivabe|jani|dhorse|police|thana|jomi|bari|mrp|dokan|taka|malik|bap)\b/i.test(
      text
    )
  );
}

export function detectLanguage(s: string, fallback: Lang = 'en'): Lang {
  const bn = (s.match(/[\u0980-\u09ff]/g) || []).length;
  const en = (s.match(/[a-z]/gi) || []).length;
  if (bn) return bn >= en * 0.25 ? 'bn' : 'en';
  if (isBanglish(s)) return 'bn';
  return en ? 'en' : fallback;
}

export interface Match {
  provision: Provision;
  score: number;
}

const docs = provisions.map((p) => ({
  p,
  terms: tokens([p.title.en, p.title.bn, p.section, p.quote, ...p.keywords].join(' ')),
}));

const average = docs.reduce((s, d) => s + d.terms.length, 0) / Math.max(docs.length, 1);

const categorySignals: Record<Category, string[]> = {
  work: [
    'employer',
    'salary',
    'salaries',
    'wage',
    'wages',
    'overtime',
    'appointment letter',
    'worker',
    'dife',
    'maternity',
    'leave',
    'holiday',
    'injury',
    'compensation',
    'child labor',
    'বেতন',
    'মজুরি',
    'মজুরী',
    'ওভারটাইম',
    'নিয়োগপত্র',
    'নিয়োগপত্র',
    'শ্রমিক',
    'মাতৃত্বকালীন',
    'ছুটি',
    'অসুস্থতা',
    'ক্ষতিপূরণ',
    'শিশুশ্রম',
    'beton',
    'betan',
    'mojuri',
  ],
  threats: [
    'threat',
    'assault',
    'intimidation',
    'extortion',
    'trespass',
    'general diary',
    'gd',
    'beating',
    'eve teasing',
    'eve-teasing',
    'vandalism',
    'theft',
    'stolen',
    'steal',
    'snatch',
    'snatching',
    'robbery',
    'pickpocket',
    'mobile',
    'phone',
    'হুমকি',
    'মারধর',
    'জিডি',
    'চাঁদাবাজি',
    'অনধিকার প্রবেশ',
    'ইভটিজিং',
    'ভীতি প্রদর্শন',
    'ভাঙচুর',
    'সাধারণ ডায়েরি',
    'চুরি',
    'ছিনতাই',
    'পকেটমার',
    'মোবাইল চুরি',
    'ফোন চুরি',
    'হারিয়ে',
    'হারানো',
    'chadabaji',
    'mardhor',
    'humki',
    'churi',
    'cori',
    'chori',
    'curi',
    'dokan churi',
    'maal cori',
    'maal churi',
    'shop theft',
    'burglary',
    'মাল চুরি',
    'দোকানের মালামাল চুরি',
    'দোকান চুরি',
    'bike',
    'motorbike',
    'motorcycle',
    'scooter',
    'gari',
    'cycle',
    'বাইক',
    'মোটরসাইকেল',
    'গাড়ি',
    'স্কুটার',
    'সাইকেল',
    'বাইক চুরি',
    'মোটরসাইকেল চুরি',
    'গাড়ি চুরি',
    'bike churi',
    'bike cori',
    'gari churi',
    'gari cori',
  ],
  consumer: [
    'shop',
    'seller',
    'refund',
    'expired',
    'product',
    'delivery',
    'delivered',
    'consumer',
    'dncrp',
    'fraud',
    'mrp',
    'weight',
    'short measure',
    'পণ্য',
    'দোকান',
    'ভোক্তা',
    'মেয়াদোত্তীর্ণ',
    'মেয়াদোত্তীর্ণ',
    'বিক্রেতা',
    'ডেলিভারি',
    'রিফান্ড',
    'ওজনে কম',
    'প্রতারণা',
  ],
  land: [
    'property',
    'land',
    'deed',
    'ownership',
    'khatian',
    'bayna',
    'forged',
    'grabbing',
    'mutation',
    'namjari',
    'eviction',
    'boundary',
    'জমি',
    'সম্পত্তি',
    'দলিল',
    'মালিকানা',
    'খতিয়ান',
    'বায়না',
    'জাল দলিল',
    'দখল',
    'বেদখল',
    'নামজারি',
    'উচ্ছেদ',
    'সীমানা',
  ],
  family: [
    'domestic',
    'family',
    'spouse',
    'husband',
    'wife',
    'violence',
    'dowry',
    'talaq',
    'divorce',
    'maintenance',
    'dower',
    'mahr',
    'custody',
    'child marriage',
    'পারিবারিক',
    'পরিবার',
    'স্বামী',
    'স্ত্রী',
    'সহিংসতা',
    'যৌতুক',
    'তালাক',
    'ভরণপোষণ',
    'দেনমোহর',
    'হেফাজত',
    'বাল্যবিয়ে',
  ],
  digital: [
    'online',
    'privacy',
    'threat',
    'threatening',
    'blackmail',
    'harassment',
    'facebook',
    'hacking',
    'hacked',
    'fake id',
    'impersonation',
    'intimate',
    'video viral',
    'cyber',
    'অনলাইন',
    'গোপনীয়তা',
    'ব্ল্যাকমেইল',
    'হয়রানি',
    'হ্যাকিং',
    'ভুয়া আইডি',
    'ভিডিও ফাঁসের হুমকি',
    'সাইবার',
  ],
  rights: [
    'arrest',
    'arrested',
    'detention',
    'discrimination',
    'equality',
    'torture',
    'police custody',
    'magistrate',
    'bail',
    'remand',
    'fir',
    'legal aid',
    '16699',
    'custodial torture',
    'গ্রেপ্তার',
    'গ্রেফতার',
    'আটক',
    'বৈষম্য',
    'সমতা',
    'নির্যাতন',
    'হাজত',
    'জামিন',
    'রিমান্ড',
    'এজাহার',
    'লিগ্যাল এইড',
    'ব্লাস্ট রায়',
  ],
};

function intentCategories(query: string): Category[] {
  const q = normalize(query);
  return (Object.entries(categorySignals) as [Category, string[]][])
    .filter(([, signals]) =>
      signals.some((s) => {
        const n = normalize(s);
        return /[\u0980-\u09ff]/.test(n) ? q.includes(n) : ` ${q} `.includes(` ${n} `);
      })
    )
    .map(([category]) => category);
}

export function searchVariant(text: string): string {
  let res = text;
  const isUnpaidClaim =
    /\b(unpaid|arrears?|due|withheld|not\s+paid|pending)\b/i.test(text) ||
    /বকেয়া|বকেয়া|দেয়নি|দেয়নাই|আটক|পায়নি|পাইনি/u.test(text) ||
    /\b(deynai|painai|paisi\s+na)\b/i.test(text);

  if (isUnpaidClaim && (/\b(beton|betan|betn|mojuri)\b|বেতন|মজুরি/i.test(text))) {
    res += ' wages salary unpaid employment arrears';
  } else if (/\b(beton|betan|mojuri)\b|বেতন|মজুরি/i.test(text)) {
    res += ' wages salary employment';
  }

  if (/\b(thana|police|gd|threat|stolen|theft|churi|steal|mobile|phone|snatch|snatched)\b|জিডি|থানা|হুমকি|চুরি|ছিনতাই|পকেটমার|হারিয়ে/i.test(text)) {
    res += ' intimidation threat general diary theft stolen penal code 379 police';
  }
  return res;
}

export function retrieve(query: string, limit = 3): Match[] {
  const expanded = searchVariant(query);
  const ts = [...new Set(tokens(expanded))];
  if (!ts.length) return [];
  const q = normalize(expanded);
  const intents = intentCategories(expanded);

  const results = docs
    .filter((d) => !intents.length || intents.includes(d.p.category))
    .map(({ p, terms }) => {
      let score = 0;
      for (const t of ts) {
        const count = terms.filter((x) => x === t).length;
        if (count) {
          const df = docs.filter((d) => d.terms.includes(t)).length;
          const idf = Math.log(1 + (docs.length - df + 0.5) / (df + 0.5));
          score += (idf * count * 2.2) / (count + 1.2 * (0.25 + (0.75 * terms.length) / average));
        } else if (t.length >= 5 && terms.some((x) => x.length >= 5 && (x.startsWith(t) || t.startsWith(x)))) {
          score += 0.5;
        }
      }
      const phrase = p.keywords.some((k) => normalize(k).includes(' ') && q.includes(normalize(k)));
      if (phrase) score += 3.0;
      return { provision: p, score };
    })
    .filter((x) => x.score >= 1.2)
    .sort((a, b) => b.score - a.score);

  return results.filter((x) => x.score >= Math.max(1.2, (results[0]?.score || 0) * 0.22)).slice(0, limit);
}

export function searchLibrary(query: string, category?: Category | null): Provision[] {
  let pool = provisions;
  if (category) {
    pool = pool.filter((p) => p.category === category);
  }
  if (!query.trim()) return pool;
  const q = normalize(query);
  const scored = retrieve(query, provisions.length)
    .map((x) => x.provision)
    .filter((p) => !category || p.category === category);
  const extra = pool.filter((p) =>
    normalize(`${p.act.en} ${p.act.bn} ${p.section} ${p.title.en} ${p.title.bn} ${p.quote}`).includes(q)
  );
  return [...new Map([...scored, ...extra].map((p) => [p.id, p])).values()];
}
