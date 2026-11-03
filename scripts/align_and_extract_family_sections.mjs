import fs from 'node:fs';

const catalog = JSON.parse(fs.readFileSync('scripts/family_sections_catalog.json', 'utf8'));

const actConfigs = [
  { actId: 'act_family_courts_2023', bdlawsId: '1444', lang: 'bn' },
  { actId: 'act_domestic_violence_2010', bdlawsId: '1063', lang: 'bn' },
  { actId: 'act_dowry_2018', bdlawsId: '1256', lang: 'bn' },
  { actId: 'act_mflo_1961', bdlawsId: '305', lang: 'en' }
];

function cleanHtmlToText(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<div[^>]*class=["'][^"']*clbr[^"']*["'][^>]*>.*?<\/div>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rsquo;/g, '’')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

const extractedAll = {};

for (const cfg of actConfigs) {
  const catList = catalog[cfg.actId];
  const printHtml = fs.readFileSync(`scripts/act-${cfg.bdlawsId}-print.html`, 'utf8');
  const blocks = [...printHtml.matchAll(/<div[^>]*class=["'][^"']*txt-details[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)];

  console.log(`\n=================== ${cfg.actId} ===================`);
  console.log(`Catalog count: ${catList.length}, Blocks count: ${blocks.length}`);

  if (catList.length !== blocks.length) {
    console.error(`MISMATCH in ${cfg.actId}: catalog=${catList.length}, blocks=${blocks.length}`);
  }

  const sectionsData = [];
  for (let i = 0; i < catList.length; i++) {
    const cat = catList[i];
    const rawContent = blocks[i] ? cleanHtmlToText(blocks[i][1]) : '';
    console.log(`Sec ${i + 1}: [${cat.secNumStr}] ${cat.titleText}`);
    console.log(`  Preview: ${rawContent.replace(/\n/g, ' ').substring(0, 100)}...`);
    sectionsData.push({
      index: i + 1,
      secNumStr: cat.secNumStr,
      rawTitle: cat.rawTitle,
      titleText: cat.titleText,
      url: cat.url,
      rawContent
    });
  }
  extractedAll[cfg.actId] = sectionsData;
}

fs.writeFileSync('scripts/family_sections_extracted.json', JSON.stringify(extractedAll, null, 2), 'utf8');
console.log('\nSaved all extracted sections to scripts/family_sections_extracted.json');
