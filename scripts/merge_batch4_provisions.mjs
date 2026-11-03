import fs from 'fs';

const existingProvisions = JSON.parse(fs.readFileSync('src/data/corpus/provisions.json', 'utf8'));

const partition = JSON.parse(fs.readFileSync('scripts/partition_1893_all.json', 'utf8'));
const realEstate = JSON.parse(fs.readFileSync('scripts/real_estate_2010_all.json', 'utf8'));
const acquisition = JSON.parse(fs.readFileSync('scripts/acquisition_2017_all.json', 'utf8'));

const newActIds = new Set(['act_partition_1893', 'act_real_estate_2010', 'act_acquisition_2017']);

// Filter out any existing entries with these actIds (if any)
const retained = existingProvisions.filter(p => !newActIds.has(p.actId));
console.log(`Retained provisions: ${retained.length}`);

const additions = [...partition, ...realEstate, ...acquisition];
console.log(`Additions to merge: ${additions.length}`);

const combined = [...retained, ...additions];

// Check duplicate IDs
const seen = new Set();
const duplicates = [];
for (const p of combined) {
  if (seen.has(p.id)) {
    duplicates.push(p.id);
  }
  seen.add(p.id);
}

if (duplicates.length > 0) {
  console.error(`ERROR: Found duplicate IDs: ${duplicates.join(', ')}`);
  process.exit(1);
}

// Sort alphabetically by ID
combined.sort((a, b) => a.id.localeCompare(b.id));

fs.writeFileSync('src/data/corpus/provisions.json', JSON.stringify(combined, null, 2) + '\n', 'utf8');
console.log(`Successfully merged provisions! Total corpus: ${combined.length} provisions.`);
