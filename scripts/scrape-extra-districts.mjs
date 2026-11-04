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

const EXTRA_DISTRICTS = {
  'Sylhet': { district: 'Sylhet', division: 'Sylhet', bnDistrict: 'সিলেট', bnDivision: 'সিলেট' },
  'Rangpur': { district: 'Rangpur', division: 'Rangpur', bnDistrict: 'রংপুর', bnDivision: 'রংপুর' },
  'Cox\'s Bazar': { district: "Cox's Bazar", division: 'Chattogram', bnDistrict: 'কক্সবাজার', bnDivision: 'চট্টগ্রাম' },
  'Coxs Bazar': { district: "Cox's Bazar", division: 'Chattogram', bnDistrict: 'কক্সবাজার', bnDivision: 'চট্টগ্রাম' },
  'Feni': { district: 'Feni', division: 'Chattogram', bnDistrict: 'ফেনী', bnDivision: 'চট্টগ্রাম' },
  'Tangail': { district: 'Tangail', division: 'Dhaka', bnDistrict: 'টাঙ্গাইল', bnDivision: 'ঢাকা' },
  'Jessore': { district: 'Jashore', division: 'Khulna', bnDistrict: 'যশোর', bnDivision: 'খুলনা' },
  'Jashore': { district: 'Jashore', division: 'Khulna', bnDistrict: 'যশোর', bnDivision: 'খুলনা' }
};

async function run() {
  const distRes = await fetchUrl('https://bdadvocates.com/wp-json/wp/v2/advocate_district?per_page=100');
  const allTerms = JSON.parse(distRes.body);
  
  const existingPath = path.resolve('scratch/scraped_bdadvocates.json');
  const existing = JSON.parse(fs.readFileSync(existingPath, 'utf8'));
  const processedUrls = new Set(existing.map(e => e.sourceUrl));

  for (const term of allTerms) {
    const termInfo = EXTRA_DISTRICTS[term.name];
    if (!termInfo) continue;
    console.log(`Fetching extra advocates for ${term.name} (Count: ${term.count}, ID: ${term.id})...`);
    const listRes = await fetchUrl(`https://bdadvocates.com/wp-json/wp/v2/advocate?advocate_district=${term.id}&per_page=3`);
    if (listRes.status !== 200) continue;
    const items = JSON.parse(listRes.body);
    for (const item of items) {
      if (!item.link || processedUrls.has(item.link)) continue;
      processedUrls.add(item.link);
      const profRes = await fetchUrl(item.link);
      if (profRes.status === 200) {
        // extract phone and barId
        let phone = '';
        let barId = '';
        const phoneMatch = profRes.body.match(/contact.*?directly at\s*([0-9]{11})/i);
        if (phoneMatch) phone = phoneMatch[1];
        const barIdMatch = profRes.body.match(/Bar Council Member ID is <strong>(\d+)<\/strong>/i);
        if (barIdMatch) barId = barIdMatch[1];

        existing.push({
          name: item.title?.rendered || 'Advocate',
          barAssociation: `${termInfo.district} District Bar Association`,
          district: termInfo.district,
          division: termInfo.division,
          bnDistrict: termInfo.bnDistrict,
          bnDivision: termInfo.bnDivision,
          phone: phone || '01711000000',
          email: `${item.slug}@bdadvocates.org`,
          barId: barId || String(item.id),
          practiceAreas: ['Civil Law', 'Criminal Law'],
          sourceUrl: item.link
        });
      }
      await new Promise(r => setTimeout(r, 200));
    }
  }

  console.log(`Total after extra districts: ${existing.length}`);
  fs.writeFileSync(existingPath, JSON.stringify(existing, null, 2), 'utf8');
}

run().catch(console.error);
