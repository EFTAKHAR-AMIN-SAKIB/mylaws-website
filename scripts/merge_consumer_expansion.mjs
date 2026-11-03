import fs from 'fs';
import path from 'path';

const workspaceDir = process.cwd();
const actsPath = path.join(workspaceDir, 'src/data/corpus/acts.json');
const provisionsPath = path.join(workspaceDir, 'src/data/corpus/provisions.json');

const acts = JSON.parse(fs.readFileSync(actsPath, 'utf8'));
const provisions = JSON.parse(fs.readFileSync(provisionsPath, 'utf8'));

// 1. Update officialUrl in acts.json
for (const a of acts) {
  if (a.id === 'act_consumer_2009') {
    a.officialUrl = 'https://bdlaws.minlaw.gov.bd/act-1014.html';
  } else if (a.id === 'act_food_safety_2013') {
    a.officialUrl = 'https://bdlaws.minlaw.gov.bd/act-1127.html';
  } else if (a.id === 'act_bsti_2018') {
    a.officialUrl = 'https://bdlaws.minlaw.gov.bd/act-1280.html';
  }
}
fs.writeFileSync(actsPath, JSON.stringify(acts, null, 2), 'utf8');
console.log('Updated officialUrls in acts.json');

// 2. Fix sourceUrls for existing provisions in target acts
const sourceUrlFixes = {
  'food-safety-23': 'https://bdlaws.minlaw.gov.bd/act-1127/section-43050.html',
  'food-safety-24': 'https://bdlaws.minlaw.gov.bd/act-1127/section-43051.html',
  'food-safety-29': 'https://bdlaws.minlaw.gov.bd/act-1127/section-43056.html',
  'food-safety-39': 'https://bdlaws.minlaw.gov.bd/act-1127/section-43066.html',
  'food-safety-41': 'https://bdlaws.minlaw.gov.bd/act-1127/section-43068.html',
  'bsti-24': 'https://bdlaws.minlaw.gov.bd/act-1280/section-48445.html',
  'bsti-27': 'https://bdlaws.minlaw.gov.bd/act-1280/section-48448.html',
  'bsti-28': 'https://bdlaws.minlaw.gov.bd/act-1280/section-48449.html',
  'consumer-40': 'https://bdlaws.minlaw.gov.bd/act-1014/section-32522.html',
  'consumer-60': 'https://bdlaws.minlaw.gov.bd/act-1014/section-39167.html',
};

for (const p of provisions) {
  if (sourceUrlFixes[p.id]) {
    p.sourceUrl = sourceUrlFixes[p.id];
  }
}

// 3. Load generated missing provisions
const cNew = JSON.parse(fs.readFileSync('scripts/generated_consumer_provisions.json', 'utf8'));
const bNew = JSON.parse(fs.readFileSync('scripts/generated_bsti_provisions.json', 'utf8'));
const fsNew = JSON.parse(fs.readFileSync('scripts/generated_food_safety_provisions.json', 'utf8'));

console.log(`Loaded additions: Consumer=${cNew.length}, BSTI=${bNew.length}, FoodSafety=${fsNew.length}`);

const existingIds = new Set(provisions.map(p => p.id));
let addedCount = 0;

for (const batch of [cNew, bNew, fsNew]) {
  for (const p of batch) {
    if (!existingIds.has(p.id)) {
      provisions.push(p);
      existingIds.add(p.id);
      addedCount++;
    } else {
      console.warn(`Duplicate ID skipped: ${p.id}`);
    }
  }
}

console.log(`Added ${addedCount} new provisions. Total now: ${provisions.length}`);

// Write back to provisions.json
fs.writeFileSync(provisionsPath, JSON.stringify(provisions, null, 2), 'utf8');
console.log('Saved updated provisions.json');
