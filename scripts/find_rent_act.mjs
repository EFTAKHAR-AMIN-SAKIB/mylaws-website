import fs from 'fs';

const chrono = fs.readFileSync('scripts/chrono-index.html', 'utf8');
const lines = chrono.split('\n');

lines.forEach((l, i) => {
  if (l.includes('1991') && (l.includes('ভাড়া') || l.includes('ভাড়া') || l.includes('Act') || l.includes('আইন') || l.includes('Rent') || l.includes('Premises'))) {
    if (l.includes('Rent') || l.includes('Premises') || l.includes('ভাড়া') || l.includes('ভাড়া')) {
      console.log(`Line ${i}: ${l.trim()}`);
      for (let j = Math.max(0, i - 2); j <= Math.min(lines.length - 1, i + 3); j++) {
        console.log(`   ${lines[j].trim()}`);
      }
    }
  }
});
