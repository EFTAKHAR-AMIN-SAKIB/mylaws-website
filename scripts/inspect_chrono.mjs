import fs from 'node:fs';

const html = fs.readFileSync('scripts/chrono-index.html', 'utf8');
console.log('Sample of chrono:', html.slice(0, 1000));

// Find Copyright or কপির
const matches = [];
const lines = html.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('কপিরাইট') || line.toLowerCase().includes('copyright') || line.includes('1089') || line.includes('859')) {
    matches.push(`${i}: ${line.trim()}`);
  }
}
console.log('Total matches:', matches.length);
console.log(matches.slice(0, 20).join('\n'));
