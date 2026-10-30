import fs from 'fs';

const html = fs.readFileSync('scripts/act-1444.html', 'utf8');

function cleanHtml(raw) {
  return raw
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Find section 13 and 19 specifically
const regex = /<div class="row act-section-row"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
let m;
while ((m = regex.exec(html)) !== null) {
  const block = cleanHtml(m[1]);
  if (block.includes('১৩।') || block.includes('১৯।') || block.includes('উপরি-স্তর') || block.includes('আমলযোগ্যতা')) {
    console.log('--- FOUND SECTION ---');
    console.log(block);
  }
}
