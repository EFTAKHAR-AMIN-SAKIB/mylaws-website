import fs from 'node:fs';

const currentProvisions = JSON.parse(fs.readFileSync('src/data/corpus/provisions.json', 'utf8'));

const pc = JSON.parse(fs.readFileSync('scripts/generated_parents_care_2013.json', 'utf8'));
const sm = JSON.parse(fs.readFileSync('scripts/generated_special_marriage_1872.json', 'utf8'));
const succ = JSON.parse(fs.readFileSync('scripts/generated_succession_1925.json', 'utf8'));
const child = JSON.parse(fs.readFileSync('scripts/generated_children_2013.json', 'utf8'));

const newBatch = [...pc, ...sm, ...succ, ...child];
console.log(`Current provisions count: ${currentProvisions.length}`);
console.log(`New provisions to add: ${newBatch.length} (Parents Care: ${pc.length}, Special Marriage: ${sm.length}, Succession Cert: ${succ.length}, Children Act: ${child.length})`);

// Ensure we don't duplicate if already present
const newActIds = new Set(['act_parents_care_2013', 'act_special_marriage_1872', 'act_succession_1925', 'act_children_2013']);
const filteredCurrent = currentProvisions.filter(p => !newActIds.has(p.actId));

const combined = [...filteredCurrent, ...newBatch];

// Verify uniqueness of IDs
const seen = new Set();
const duplicates = [];
for (const p of combined) {
  if (seen.has(p.id)) {
    duplicates.push(p.id);
  }
  seen.add(p.id);
}

if (duplicates.length > 0) {
  console.error('DUPLICATE IDS FOUND:', duplicates);
  process.exit(1);
}

// Sort deterministically
combined.sort((a, b) => {
  if (a.actId !== b.actId) return a.actId.localeCompare(b.actId);
  return a.id.localeCompare(b.id);
});

console.log(`Final combined provisions: ${combined.length}`);

fs.writeFileSync('src/data/corpus/provisions.json', JSON.stringify(combined, null, 2) + '\n', 'utf8');
console.log('Successfully updated src/data/corpus/provisions.json');
