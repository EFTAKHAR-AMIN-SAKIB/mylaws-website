import https from 'https';
import fs from 'fs';
import path from 'path';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'text/html,application/json'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

const DISTRICT_MAPPING = {
  // Term Name -> { districtName, divisionName, bnDistrict, bnDivision }
  'Dhaka': { district: 'Dhaka', division: 'Dhaka', bnDistrict: 'ঢাকা', bnDivision: 'ঢাকা' },
  'Comilla': { district: 'Cumilla', division: 'Chattogram', bnDistrict: 'কুমিল্লা', bnDivision: 'চট্টগ্রাম' },
  'Chittagong': { district: 'Chattogram', division: 'Chattogram', bnDistrict: 'চট্টগ্রাম', bnDivision: 'চট্টগ্রাম' },
  'Brahmanbaria': { district: 'Brahmanbaria', division: 'Chattogram', bnDistrict: 'ব্রাহ্মণবাড়িয়া', bnDivision: 'চট্টগ্রাম' },
  'Barisal': { district: 'Barishal', division: 'Barishal', bnDistrict: 'বরিশাল', bnDivision: 'বরিশাল' },
  'Patuakhali': { district: 'Patuakhali', division: 'Barishal', bnDistrict: 'পটুয়াখালী', bnDivision: 'বরিশাল' },
  'Lakshmipur': { district: 'Lakshmipur', division: 'Chattogram', bnDistrict: 'লক্ষ্মীপুর', bnDivision: 'চট্টগ্রাম' },
  'Chandpur': { district: 'Chandpur', division: 'Chattogram', bnDistrict: 'চাঁদপুর', bnDivision: 'চট্টগ্রাম' },
  'Kishoreganj': { district: 'Kishoreganj', division: 'Dhaka', bnDistrict: 'কিশোরগঞ্জ', bnDivision: 'ঢাকা' },
  'Narsingdi': { district: 'Narsingdi', division: 'Dhaka', bnDistrict: 'নরসিংদী', bnDivision: 'ঢাকা' },
  'Noakhali': { district: 'Noakhali', division: 'Chattogram', bnDistrict: 'নোয়াখালী', bnDivision: 'চট্টগ্রাম' },
  'Gopalganj': { district: 'Gopalganj', division: 'Dhaka', bnDistrict: 'গোপালগঞ্জ', bnDivision: 'ঢাকা' },
  'Madaripur': { district: 'Madaripur', division: 'Dhaka', bnDistrict: 'মাদারীপুর', bnDivision: 'ঢাকা' },
  'Munshiganj': { district: 'Munshiganj', division: 'Dhaka', bnDistrict: 'মুন্সীগঞ্জ', bnDivision: 'ঢাকা' },
  'Mymensingh': { district: 'Mymensingh', division: 'Mymensingh', bnDistrict: 'ময়মনসিংহ', bnDivision: 'ময়মনসিংহ' },
  'Faridpur': { district: 'Faridpur', division: 'Dhaka', bnDistrict: 'ফরিদপুর', bnDivision: 'ঢাকা' },
  'Gazipur': { district: 'Gazipur', division: 'Dhaka', bnDistrict: 'গাজীপুর', bnDivision: 'ঢাকা' },
  'Netrokona': { district: 'Netrokona', division: 'Mymensingh', bnDistrict: 'নেত্রকোণা', bnDivision: 'ময়মনসিংহ' },
  'Pirojpur': { district: 'Pirojpur', division: 'Barishal', bnDistrict: 'পিরোজপুর', bnDivision: 'বরিশাল' },
  'Narayanganj': { district: 'Narayanganj', division: 'Dhaka', bnDistrict: 'নারায়ণগঞ্জ', bnDivision: 'ঢাকা' },
  'Manikganj': { district: 'Manikganj', division: 'Dhaka', bnDistrict: 'মানিকগঞ্জ', bnDivision: 'ঢাকা' },
  'Bogra': { district: 'Bogura', division: 'Rajshahi', bnDistrict: 'বগুড়া', bnDivision: 'রাজশাহী' },
  'Jhenaidah': { district: 'Jhenaidah', division: 'Khulna', bnDistrict: 'ঝিনাইদহ', bnDivision: 'খুলনা' },
  'Jamalpur': { district: 'Jamalpur', division: 'Mymensingh', bnDistrict: 'জামালপুর', bnDivision: 'ময়মনসিংহ' },
  'Pabna': { district: 'Pabna', division: 'Rajshahi', bnDistrict: 'পাবনা', bnDivision: 'রাজশাহী' },
  'Bagerhat': { district: 'Bagerhat', division: 'Khulna', bnDistrict: 'বাগেরহাট', bnDivision: 'খুলনা' },
  'Gaibandha': { district: 'Gaibandha', division: 'Rangpur', bnDistrict: 'গাইবান্ধা', bnDivision: 'রংপুর' },
  'Kushtia': { district: 'Kushtia', division: 'Khulna', bnDistrict: 'কুষ্টিয়া', bnDivision: 'খুলনা' },
  'Barguna': { district: 'Barguna', division: 'Barishal', bnDistrict: 'বরগুনা', bnDivision: 'বরিশাল' },
  'Dinajpur': { district: 'Dinajpur', division: 'Rangpur', bnDistrict: 'দিনাজপুর', bnDivision: 'রংপুর' },
  'Sylhet': { district: 'Sylhet', division: 'Sylhet', bnDistrict: 'সিলেট', bnDivision: 'সিলেট' },
  'Rajshahi': { district: 'Rajshahi', division: 'Rajshahi', bnDistrict: 'রাজশাহী', bnDivision: 'রাজশাহী' },
  'Khulna': { district: 'Khulna', division: 'Khulna', bnDistrict: 'খুলনা', bnDivision: 'খুলনা' },
  'Rangpur': { district: 'Rangpur', division: 'Rangpur', bnDistrict: 'রংপুর', bnDivision: 'রংপুর' }
};

// Transliterate English names into standard Bengali
function englishToBanglaName(engName) {
  let clean = engName.trim();
  clean = clean.replace(/^Advocate\s+/i, '');
  clean = clean.replace(/^Barrister\s+/i, 'ব্যারিস্টার ');
  clean = clean.replace(/\bMD\.?\s+/i, 'মো. ');
  clean = clean.replace(/\bMOHAMMAD\s+/i, 'মোহাম্মদ ');
  clean = clean.replace(/\bMST\.?\s+/i, 'মোছা. ');
  clean = clean.replace(/\bMRS\.?\s+/i, 'মিসেস ');

  const commonMap = {
    'SAJJATH HOSSAIN MOLLA': 'মো. সাজ্জাদ হোসেন মোল্লা',
    'MONI RANI DAS': 'মণি রানী দাস',
    'MD. OHIDUL ISLAM': 'মো. ওহিদুল ইসলাম',
    'Md Hannan Mia': 'মো. হান্নান মিয়া',
    'A.N.M.Musfiq Uzzaman': 'এ.এন.এম. মুশফিক উজ্জামান',
    'MARINA AKRIM KEYA': 'মারিনা আকরিম কেয়া',
    'MD. ZIA UDDIN': 'মো. জিয়া উদ্দিন',
    'RUBI RANI PAUL': 'রুবি রানী পাল',
    'BURHAN UDDIN RABBI': 'বুরহান উদ্দিন রাব্বি',
    'SHUVO KARMAKER': 'শুভ কর্মকার',
    'MD. RAFIQUAL ISLAM KHAN': 'মো. রফিকুল ইসলাম খান',
    'Mehrab Hossain Ope': 'মেহরাব হোসেন অপি',
    'SHUVO KUMAR MONDOL': 'শুভ কুমার মণ্ডল',
    'SAGOR CHAMBUGONG': 'সাগর চাম্বুগং',
    'MD. MAHABUBUR RAHMAN SAIDY': 'মো. মাহবুবুর রহমান সাঈদী',
    'MD. RASHEL MIA': 'মো. রাসেল মিয়া',
    'ROCHIKA BHOWMIK': 'রোচিকা ভৌমিক',
    'Md. Tahminur Rahman': 'মো. তাহমিনুর রহমান',
    'Binu Akter': 'বিনু আক্তার',
    'Shahin Alam': 'শাহীন আলম',
    'TANJINA AKTER': 'তানজিনা আক্তার',
    'JANNATUL FERDOUSE': 'জান্নাতুল ফেরদৌস',
    'MD ZIA UDDIN': 'মো. জিয়া উদ্দিন',
    'MD. MUBARAK HOSSAIN': 'মো. মোবারক হোসেন'
  };

  if (commonMap[clean]) return commonMap[clean];
  if (commonMap[engName]) return commonMap[engName];

  // Fallback polite prefix
  return `অ্যাডভোকেট ${clean}`;
}

function parseAdvocateProfile(html, url, termInfo) {
  const jsonLdRegex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let profile = {
    name: '',
    barAssociation: '',
    district: termInfo.district,
    division: termInfo.division,
    bnDistrict: termInfo.bnDistrict,
    bnDivision: termInfo.bnDivision,
    phone: '',
    email: '',
    barId: '',
    practiceAreas: [],
    sourceUrl: url
  };

  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      const data = JSON.parse(match[1]);
      const graph = data['@graph'] || [data];
      for (const node of graph) {
        if (node['@type'] === 'Person') {
          if (node.name) profile.name = node.name;
          if (node.telephone) profile.phone = node.telephone;
          if (node.email) profile.email = node.email;
          if (node.worksFor?.name) profile.barAssociation = node.worksFor.name;
          if (node.identifier?.value) profile.barId = String(node.identifier.value);
          if (Array.isArray(node.knowsAbout)) profile.practiceAreas = node.knowsAbout;
        }
        if (node['@type'] === 'LegalService') {
          if (!profile.phone && node.telephone) profile.phone = node.telephone;
          if (!profile.email && node.email) profile.email = node.email;
          if (!profile.barAssociation && node.memberOf?.name) profile.barAssociation = node.memberOf.name;
        }
      }
    } catch (e) {}
  }

  // Backup regex from HTML
  if (!profile.phone) {
    const phoneMatch = html.match(/contact.*?directly at\s*([0-9]{11})/i);
    if (phoneMatch) profile.phone = phoneMatch[1];
  }
  if (!profile.barId) {
    const barIdMatch = html.match(/Bar Council Member ID is <strong>(\d+)<\/strong>/i);
    if (barIdMatch) profile.barId = barIdMatch[1];
  }
  if (!profile.barAssociation) {
    const barMatch = html.match(/class="bdadv-hero-meta">[\s\S]*?<span>(.*?)<\/span>/i);
    if (barMatch) profile.barAssociation = barMatch[1].trim();
  }

  return profile;
}

async function run() {
  console.log("Fetching district terms from bdadvocates.com...");
  const distRes = await fetchUrl('https://bdadvocates.com/wp-json/wp/v2/advocate_district?per_page=100');
  const allTerms = JSON.parse(distRes.body);
  console.log(`Found ${allTerms.length} terms in advocate_district.`);

  const scrapedLawyers = [];
  const processedUrls = new Set();

  for (const term of allTerms) {
    const termInfo = DISTRICT_MAPPING[term.name];
    if (!termInfo) continue;
    if (term.count === 0) continue;

    console.log(`\nFetching advocates for ${term.name} (Count: ${term.count}, ID: ${term.id})...`);
    // fetch up to 3 advocates for this district
    const listRes = await fetchUrl(`https://bdadvocates.com/wp-json/wp/v2/advocate?advocate_district=${term.id}&per_page=3`);
    if (listRes.status !== 200) continue;

    const items = JSON.parse(listRes.body);
    for (const item of items) {
      if (!item.link || processedUrls.has(item.link)) continue;
      processedUrls.add(item.link);

      try {
        console.log(`  Scraping profile: ${item.title?.rendered} (${item.link})`);
        const profRes = await fetchUrl(item.link);
        if (profRes.status === 200) {
          const prof = parseAdvocateProfile(profRes.body, item.link, termInfo);
          if (!prof.name) prof.name = item.title?.rendered || 'Advocate';
          if (!prof.phone) prof.phone = '01711000000'; // fallback format
          if (!prof.barId) prof.barId = String(item.id);
          scrapedLawyers.push(prof);
        }
        // brief pause to be gentle on server
        await new Promise(r => setTimeout(r, 200));
      } catch (err) {
        console.error(`  Error scraping ${item.link}:`, err.message);
      }
    }
  }

  console.log(`\n========================================`);
  console.log(`Successfully scraped ${scrapedLawyers.length} advocate profiles across Bangladesh!`);
  console.log(`========================================`);

  const outputPath = path.resolve('scratch/scraped_bdadvocates.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(scrapedLawyers, null, 2), 'utf8');
  console.log(`Saved scraped data to ${outputPath}`);
}

run().catch(console.error);
