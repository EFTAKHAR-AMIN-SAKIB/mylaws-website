import fs from 'node:fs';

const html = fs.readFileSync('scripts/act-857-index.html', 'utf8');
const re = /href=["'](?:https?:\/\/bdlaws\.minlaw\.gov\.bd)?\/act-857\/section-([0-9]+)\.html["'][^>]*>([^<]+)<\/a>/g;
let m;
let count = 0;
while ((m = re.exec(html)) !== null) {
  count++;
  if (count >= 50 && count <= 92) {
    console.log(`${count}: [Sec ${m[1]}] ${m[2].trim()}`);
  }
}
