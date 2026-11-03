import fs from 'node:fs';

const acts = [
  { id: 'act_family_courts_2023', file: 'scripts/act-1444-index.html', printFile: 'scripts/act-1444-print.html', bdlawsId: '1444' },
  { id: 'act_domestic_violence_2010', file: 'scripts/act-1057-index.html', printFile: 'scripts/act-1057-print.html', bdlawsId: '1057' },
  { id: 'act_dowry_2018', file: 'scripts/act-1249-index.html', printFile: 'scripts/act-1249-print.html', bdlawsId: '1249' },
  { id: 'act_mflo_1961', file: 'scripts/act-305-index.html', printFile: 'scripts/act-305-print.html', bdlawsId: '305' },
];

for (const a of acts) {
  console.log(`\n========================================`);
  console.log(`Analyzing ${a.id} (bdlaws ${a.bdlawsId})`);
  console.log(`========================================`);
  
  const indexHtml = fs.readFileSync(a.file, 'utf8');
  // Check links matching act-{id}/section-{secId}.html
  const secRegex = new RegExp(`href=["'](?:https?:\\/\\/bdlaws\\.minlaw\\.gov\\.bd)?\\/act-${a.bdlawsId}\\/section-(\\d+)\\.html["'][^>]*>([\\s\\S]*?)<\\/a>`, 'gi');
  let match;
  const sections = [];
  while ((match = secRegex.exec(indexHtml)) !== null) {
    const secId = match[1];
    const text = match[2].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
    sections.push({ secId, text });
  }

  console.log(`Found ${sections.length} sections in index:`);
  sections.forEach((s, idx) => {
    console.log(`  ${idx + 1}. [secId: ${s.secId}] ${s.text}`);
  });

  // Also check printFile size and preview
  if (fs.existsSync(a.printFile)) {
    const printHtml = fs.readFileSync(a.printFile, 'utf8');
    console.log(`Print file exists (${printHtml.length} chars). First 300 chars:`);
    console.log(printHtml.substring(0, 300).replace(/\n/g, ' '));
  }
}
