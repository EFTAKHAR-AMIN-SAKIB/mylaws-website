import fs from 'fs';

const chrono = fs.readFileSync('scripts/chrono-index.html', 'utf8');
const lines = chrono.split('\n');

console.log('--- Specific Relief Act 1877 ---');
lines.forEach((l, i) => {
  if (l.includes('Specific Relief') || l.includes('সুনির্দিষ্ট প্রতিকার')) {
    console.log(`Line ${i}: ${l.trim()}`);
    for (let j = Math.max(0, i - 2); j <= Math.min(lines.length - 1, i + 3); j++) {
      console.log(`   ${lines[j].trim()}`);
    }
  }
});

console.log('--- Premises Rent Control 1991 ---');
lines.forEach((l, i) => {
  if (l.includes('Premises Rent') || l.includes('বাড়িভাড়া') || l.includes('বাড়িভাড়া') || l.includes('Rent Control')) {
    console.log(`Line ${i}: ${l.trim()}`);
    for (let j = Math.max(0, i - 2); j <= Math.min(lines.length - 1, i + 3); j++) {
      console.log(`   ${lines[j].trim()}`);
    }
  }
});
