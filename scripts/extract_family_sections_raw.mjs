import fs from 'node:fs';

function extractSectionsFromIndex(actId, bdlawsId) {
  const indexHtml = fs.readFileSync(`scripts/act-${bdlawsId}-index.html`, 'utf8');
  const sectionLinks = [...indexHtml.matchAll(/href=["'](\/act-\d+\/section-\d+\.html)["'][^>]*>([\s\S]*?)<\/a>/gi)];
  
  return sectionLinks.map(m => {
    const url = `https://bdlaws.minlaw.gov.bd${m[1]}`;
    const rawTitle = m[2].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    // rawTitle looks like: "১। সংক্ষিপ্ত শিরোনাম, প্রয়োগ ও প্রবর্তন" or "1. Short title, extent, application and commencement"
    const matchNum = rawTitle.match(/^([০-৯]+|\d+[A-Z]?)\s*[।\.]\s*(.*)$/);
    const secNumStr = matchNum ? matchNum[1] : '';
    const titleText = matchNum ? matchNum[2].trim() : rawTitle;
    return {
      actId,
      bdlawsId,
      url,
      secNumStr,
      rawTitle,
      titleText
    };
  });
}

const acts = [
  { actId: 'act_family_courts_2023', bdlawsId: '1444' },
  { actId: 'act_domestic_violence_2010', bdlawsId: '1063' },
  { actId: 'act_dowry_2018', bdlawsId: '1256' },
  { actId: 'act_mflo_1961', bdlawsId: '305' }
];

const catalog = {};
for (const a of acts) {
  const list = extractSectionsFromIndex(a.actId, a.bdlawsId);
  catalog[a.actId] = list;
  console.log(`${a.actId}: ${list.length} sections found in index`);
}

fs.writeFileSync('scripts/family_sections_catalog.json', JSON.stringify(catalog, null, 2), 'utf8');
console.log('Saved family_sections_catalog.json');
