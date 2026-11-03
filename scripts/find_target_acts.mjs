import fs from 'node:fs';

const chrono = fs.readFileSync('scripts/chrono-index.html', 'utf8');
const acts = JSON.parse(fs.readFileSync('src/data/corpus/acts.json', 'utf8'));

console.log(`Current acts in acts.json: ${acts.length}`);

const keywords = [
  'পিতা-মাতার ভরণ-পোষণ',
  'ভরণ-পোষণ আইন',
  'Parents Care',
  'শিশু আইন',
  'Children Act',
  'Succession Act',
  'উত্তরাধিকার',
  'Special Marriage',
  'বিশেষ বিবাহ'
];

for (const kw of keywords) {
  console.log(`\n=== Search: "${kw}" in chrono-index ===`);
  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let m;
  let found = 0;
  while ((m = rowRegex.exec(chrono)) !== null) {
    const row = m[1];
    if (new RegExp(kw, 'i').test(row)) {
      found++;
      const actLink = row.match(/href=["'](?:\/)?act-(\d+)\.html["']/i);
      const text = row.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      console.log(`  act-${actLink ? actLink[1] : 'unknown'}: ${text}`);
    }
  }
  if (found === 0) console.log('  None found.');
}

console.log('\n=== Checking if already in acts.json ===');
for (const kw of ['parent', 'child', 'succession', 'special_marriage']) {
  const match = acts.filter(a => a.id.includes(kw) || JSON.stringify(a).toLowerCase().includes(kw));
  console.log(`Matching "${kw}":`, match.map(a => `${a.id} (${a.name?.en})`));
}
