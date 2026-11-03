import fs from 'node:fs';

const chrono = fs.readFileSync('scripts/chrono-index.html', 'utf8');

const armsMatches = [...chrono.matchAll(/href=["'](\/act-\d+\.html)["'][^>]*>([\s\S]*?)<\/a>/gi)]
  .filter(m => m[2].toLowerCase().includes('arms'));

console.log('Arms matches:');
armsMatches.forEach(m => console.log(`  ${m[1]} -> ${m[2].replace(/<[^>]+>/g, '').trim()}`));

const narcMatches = [...chrono.matchAll(/href=["'](\/act-\d+\.html)["'][^>]*>([\s\S]*?)<\/a>/gi)]
  .filter(m => m[2].toLowerCase().includes('narcotics') || m[2].includes('মাদক'));

console.log('\nNarcotics matches:');
narcMatches.forEach(m => console.log(`  ${m[1]} -> ${m[2].replace(/<[^>]+>/g, '').trim()}`));
