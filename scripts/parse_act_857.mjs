import fs from 'node:fs';

async function run() {
  const res = await fetch('https://bdlaws.minlaw.gov.bd/act-857.html');
  const text = await res.text();
  fs.writeFileSync('scripts/act-857-index.html', text, 'utf8');
  console.log('act-857 saved, chars:', text.length);

  const re = /href=["'](?:https?:\/\/bdlaws\.minlaw\.gov\.bd)?\/act-857\/section-([0-9]+)\.html["'][^>]*>([^<]+)<\/a>/g;
  let m;
  const sections = [];
  while ((m = re.exec(text)) !== null) {
    sections.push({ secId: m[1], title: m[2].trim() });
  }
  console.log('act-857 sections count:', sections.length);
  for (const s of sections) {
    console.log(`Sec ${s.secId}: ${s.title}`);
  }
}

run().catch(console.error);
