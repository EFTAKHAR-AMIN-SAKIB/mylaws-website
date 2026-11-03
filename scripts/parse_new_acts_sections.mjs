import fs from 'node:fs';

const actConfigs = [
  { id: 'act_parents_care_2013', bdlawsId: '1132' },
  { id: 'act_children_2013', bdlawsId: '1119' },
  { id: 'act_succession_1925', bdlawsId: '138' },
  { id: 'act_special_marriage_1872', bdlawsId: '25' }
];

const catalog = {};

for (const cfg of actConfigs) {
  const indexHtml = fs.readFileSync(`scripts/act-${cfg.bdlawsId}-index.html`, 'utf8');
  const sectionLinks = [...indexHtml.matchAll(/href=["'](\/act-\d+\/section-\d+\.html)["'][^>]*>([\s\S]*?)<\/a>/gi)];
  
  const sections = sectionLinks.map(m => {
    const url = `https://bdlaws.minlaw.gov.bd${m[1]}`;
    const rawTitle = m[2].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    const matchNum = rawTitle.match(/^([০-৯]+|\d+[A-Z]?)\s*[।\.]\s*(.*)$/);
    const secNumStr = matchNum ? matchNum[1] : '';
    const titleText = matchNum ? matchNum[2].trim() : rawTitle;
    return {
      actId: cfg.id,
      bdlawsId: cfg.bdlawsId,
      url,
      secNumStr,
      rawTitle,
      titleText
    };
  });

  catalog[cfg.id] = sections;
  console.log(`\n=================== ${cfg.id} (act-${cfg.bdlawsId}) ===================`);
  console.log(`Total sections in index: ${sections.length}`);
  if (sections.length > 0) {
    console.log(`First 5:`);
    sections.slice(0, 5).forEach((s, i) => console.log(`  ${i+1}. [${s.secNumStr}] ${s.titleText}`));
    console.log(`Last 3:`);
    sections.slice(-3).forEach((s, i) => console.log(`  ${sections.length - 3 + i + 1}. [${s.secNumStr}] ${s.titleText}`));
  }
}

fs.writeFileSync('scripts/new_family_catalog.json', JSON.stringify(catalog, null, 2), 'utf8');
console.log('\nSaved scripts/new_family_catalog.json');
