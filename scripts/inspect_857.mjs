import fs from 'node:fs';

const html = fs.readFileSync('scripts/act-857-index.html', 'utf8');
const lines = html.split('\n');
console.log('Total lines in act-857:', lines.length);

// search for href or section or ধারা
const matches = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('act-857') || line.includes('section') || line.includes('ধারা')) {
    matches.push(`${i}: ${line.trim()}`);
    if (matches.length > 25) break;
  }
}
console.log(matches.join('\n'));
