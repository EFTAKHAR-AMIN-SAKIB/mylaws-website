import fs from 'fs';

async function main() {
  const res = await fetch('https://bdlaws.minlaw.gov.bd/act-1444.html');
  const text = await res.text();
  fs.writeFileSync('scripts/act-1444.html', text, 'utf8');
  console.log('Saved act-1444.html, size:', text.length);
}
main().catch(console.error);
