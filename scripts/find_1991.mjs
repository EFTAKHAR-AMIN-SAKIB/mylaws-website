import fs from 'fs';

const chrono = fs.readFileSync('scripts/chrono-index.html', 'utf8');
const lines = chrono.split('\n');

for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.includes('/act-') && (l.includes('1991') || l.includes('১৯৯১'))) {
    console.log(l.trim());
  }
}
