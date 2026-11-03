import fs from 'node:fs';

const html = fs.readFileSync('scripts/act-857-index.html', 'utf8');
const re = /href=["'](?:https?:\/\/bdlaws\.minlaw\.gov\.bd)?\/act-857\/section-([0-9]+)\.html["'][^>]*>([^<]+)<\/a>/g;
let m;
console.log('--- Telecom Regulation Act (act-857) All Sections ---');
let count = 0;
while ((m = re.exec(html)) !== null) {
  const secId = m[1];
  const title = m[2].trim();
  count++;
  console.log(`${count}: [Sec ${secId}] ${title}`);
}
