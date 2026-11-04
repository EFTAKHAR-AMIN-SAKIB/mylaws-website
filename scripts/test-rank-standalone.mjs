import { rankLawyersForContext, LAWYERS } from '../src/data/lawyers.ts';

const domain = 'property';
const district = 'Sylhet';
const matches = rankLawyersForContext({
  domain,
  district,
  limit: 2
});

console.log("Total lawyers:", LAWYERS.length);
console.log("Matches count:", matches.length);
for (const m of matches) {
  console.log(`[${m.district}] ${m.nameBn} (${m.barCouncilId}) - specs: ${m.specializations.join(',')}`);
}
