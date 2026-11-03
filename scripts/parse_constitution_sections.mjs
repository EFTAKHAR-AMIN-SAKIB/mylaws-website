import fs from 'node:fs';

const html = fs.readFileSync('scripts/act-367-index.html', 'utf8');

// Match sections in act-367
const re = /href=["'](?:https?:\/\/bdlaws\.minlaw\.gov\.bd)?\/act-367\/section-([0-9]+)\.html["'][^>]*>([^<]+)<\/a>/g;
let m;
const sections = [];
while ((m = re.exec(html)) !== null) {
  sections.push({ secId: m[1], url: `https://bdlaws.minlaw.gov.bd/act-367/section-${m[1]}.html`, title: m[2].trim() });
}

console.log('Total Constitution sections found:', sections.length);
for (const s of sections) {
  // Check if article 26 to 44
  const numMatch = s.title.match(/^([০-৯0-9]+)/);
  if (numMatch) {
    console.log(`[Sec ${s.secId}] ${s.title}`);
  }
}
