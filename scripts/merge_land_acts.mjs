import fs from 'fs';

const existingProvisions = JSON.parse(fs.readFileSync('src/data/corpus/provisions.json', 'utf8'));

const landCrime = JSON.parse(fs.readFileSync('scripts/land_crime_2023_all.json', 'utf8'));
const sra = JSON.parse(fs.readFileSync('scripts/sra_1877_all.json', 'utf8'));
const rent = JSON.parse(fs.readFileSync('scripts/premises_rent_1991_all.json', 'utf8'));

const targetActIds = new Set(['act_land_crime_2023', 'act_specific_relief_1877', 'act_premises_rent_1991']);

const nonTargetProvisions = existingProvisions.filter(p => !targetActIds.has(p.actId));
console.log(`Non-target provisions retained: ${nonTargetProvisions.length}`);

const newLandProvisions = [...landCrime, ...sra, ...rent];
console.log(`New target land provisions to merge: ${newLandProvisions.length}`);

const mergedProvisions = [...nonTargetProvisions, ...newLandProvisions];

// Check unique IDs
const idSet = new Set();
const duplicateIds = [];
for (const p of mergedProvisions) {
  if (idSet.has(p.id)) {
    duplicateIds.push(p.id);
  }
  idSet.add(p.id);
}

if (duplicateIds.length > 0) {
  console.error(`ERROR: Duplicate IDs found: ${duplicateIds.join(', ')}`);
  process.exit(1);
}

// Sort alphabetically by ID
mergedProvisions.sort((a, b) => a.id.localeCompare(b.id));

fs.writeFileSync('src/data/corpus/provisions.json', JSON.stringify(mergedProvisions, null, 2) + '\n', 'utf8');
console.log(`Successfully merged provisions! Total corpus: ${mergedProvisions.length} provisions.`);
