import fs from 'node:fs';

const currentProvisions = JSON.parse(fs.readFileSync('src/data/corpus/provisions.json', 'utf8'));

const dowry = JSON.parse(fs.readFileSync('scripts/generated_dowry_2018.json', 'utf8'));
const mflo = JSON.parse(fs.readFileSync('scripts/generated_mflo_1961.json', 'utf8'));
const dv = JSON.parse(fs.readFileSync('scripts/generated_domestic_violence_2010.json', 'utf8'));
const fc = JSON.parse(fs.readFileSync('scripts/generated_family_courts_2023.json', 'utf8'));

const targetActIds = new Set([
  'act_dowry_2018',
  'act_mflo_1961',
  'act_domestic_violence_2010',
  'act_family_courts_2023'
]);

// Filter out old provisions belonging to these 4 acts
const nonTargetProvisions = currentProvisions.filter(p => !targetActIds.has(p.actId));
console.log(`Current total provisions: ${currentProvisions.length}`);
console.log(`Non-target provisions kept: ${nonTargetProvisions.length}`);

const newBatch = [...dowry, ...mflo, ...dv, ...fc];
console.log(`New target provisions to merge: ${newBatch.length} (Dowry: ${dowry.length}, MFLO: ${mflo.length}, DV: ${dv.length}, FC: ${fc.length})`);

// Combine
const combined = [...nonTargetProvisions, ...newBatch];

// Check duplicate IDs
const seenIds = new Set();
const duplicates = [];
for (const p of combined) {
  if (seenIds.has(p.id)) {
    duplicates.push(p.id);
  }
  seenIds.add(p.id);
}

if (duplicates.length > 0) {
  console.error(`ERROR: Found duplicate provision IDs:`, duplicates);
  process.exit(1);
}

// Sort deterministically
combined.sort((a, b) => {
  if (a.actId !== b.actId) return a.actId.localeCompare(b.actId);
  return a.id.localeCompare(b.id);
});

console.log(`Total provisions after merge: ${combined.length} (net increase of ${combined.length - currentProvisions.length})`);

fs.writeFileSync('src/data/corpus/provisions.json', JSON.stringify(combined, null, 2) + '\n', 'utf8');
console.log('Successfully wrote updated src/data/corpus/provisions.json');
