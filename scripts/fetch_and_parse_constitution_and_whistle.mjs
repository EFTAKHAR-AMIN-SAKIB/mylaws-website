import fs from 'node:fs';

async function fetchDecoded(url) {
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  const nodeBuf = Buffer.from(buf);
  if (nodeBuf[0] === 0xff && nodeBuf[1] === 0xfe) {
    return nodeBuf.toString('utf16le');
  } else if (nodeBuf[0] === 0xfe && nodeBuf[1] === 0xff) {
    nodeBuf.swap16();
    return nodeBuf.toString('utf16le');
  } else {
    return nodeBuf.toString('utf8');
  }
}

async function run() {
  const whistleHtml = await fetchDecoded('https://bdlaws.minlaw.gov.bd/act-1072.html');
  fs.writeFileSync('scripts/act-1072-index.html', whistleHtml, 'utf8');
  console.log('Saved Whistleblower index: act-1072-index.html, length:', whistleHtml.length);

  const re = /href=["'](?:https?:\/\/bdlaws\.minlaw\.gov\.bd)?\/act-1072\/section-([0-9]+)\.html["'][^>]*>([^<]+)<\/a>/g;
  let m;
  const sections = [];
  while ((m = re.exec(whistleHtml)) !== null) {
    sections.push({ secId: m[1], title: m[2].trim(), url: `https://bdlaws.minlaw.gov.bd/act-1072/section-${m[1]}.html` });
  }
  console.log(`Whistleblower Protection Act (act-1072): ${sections.length} sections found`);
  for (const s of sections) {
    console.log(`  [Sec ${s.secId}] ${s.title}`);
  }
}

run().catch(console.error);
