import fs from 'node:fs';

function readDecoded(filePath) {
  const nodeBuf = fs.readFileSync(filePath);
  if (nodeBuf[0] === 0xff && nodeBuf[1] === 0xfe) {
    return nodeBuf.toString('utf16le');
  } else if (nodeBuf[0] === 0xfe && nodeBuf[1] === 0xff) {
    nodeBuf.swap16();
    return nodeBuf.toString('utf16le');
  } else {
    return nodeBuf.toString('utf8');
  }
}

const html = readDecoded('scripts/act-1452-index.html');
const re = /href=["'](?:https?:\/\/bdlaws\.minlaw\.gov\.bd)?\/act-1452\/section-([0-9]+)\.html["'][^>]*>([^<]+)<\/a>/g;
let m;
console.log('--- Copyright Act, 2023 (act-1452) Sections ---');
const sections = [];
while ((m = re.exec(html)) !== null) {
  sections.push({ secId: m[1], title: m[2].trim() });
}

for (const s of sections) {
  if (
    s.title.includes('কম্পিউটার') ||
    s.title.includes('সফ্টওয়্যার') ||
    s.title.includes('লঙ্ঘন') ||
    s.title.includes('ব্যতিক্রম') ||
    s.title.includes('দণ্ড') ||
    s.title.includes('শাস্তি') ||
    s.title.includes('ডিজিটাল') ||
    s.title.includes('অনুলিপি') ||
    s.title.includes('টাস্কফোর্স') ||
    s.title.includes('বিচার')
  ) {
    console.log(`[Sec ${s.secId}] ${s.title}`);
  }
}
