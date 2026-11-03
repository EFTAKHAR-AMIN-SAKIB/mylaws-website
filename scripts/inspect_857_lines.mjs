import fs from 'node:fs';

const html = fs.readFileSync('scripts/act-857-index.html', 'utf8');
const lines = html.split('\n');
console.log('Lines 1-50:');
console.log(lines.slice(0, 50).join('\n'));
