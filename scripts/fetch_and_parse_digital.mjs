import fs from 'node:fs';

async function fetchFile(url, outPath) {
  console.log(`Fetching ${url} -> ${outPath}...`);
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  const nodeBuf = Buffer.from(buf);
  let text;
  if (nodeBuf[0] === 0xff && nodeBuf[1] === 0xfe) {
    text = nodeBuf.toString('utf16le');
  } else if (nodeBuf[0] === 0xfe && nodeBuf[1] === 0xff) {
    nodeBuf.swap16();
    text = nodeBuf.toString('utf16le');
  } else {
    text = nodeBuf.toString('utf8');
  }
  fs.writeFileSync(outPath, text, 'utf8');
  console.log(`  Saved ${outPath}, chars: ${text.length}`);
  return text;
}

function parseSections(html, actNum) {
  const re = new RegExp(`href=["'](?:https?://bdlaws\\.minlaw\\.gov\\.bd)?/act-${actNum}/section-([0-9]+)\\.html["'][^>]*>([^<]+)<\\/a>`, 'g');
  let m;
  const sections = [];
  while ((m = re.exec(html)) !== null) {
    sections.push({
      secId: m[1],
      url: `https://bdlaws.minlaw.gov.bd/act-${actNum}/section-${m[1]}.html`,
      title: m[2].trim()
    });
  }
  return sections;
}

async function run() {
  const pornoHtml = await fetchFile('https://bdlaws.minlaw.gov.bd/act-1091.html', 'scripts/act-1091-index.html');
  const copyHtml = await fetchFile('https://bdlaws.minlaw.gov.bd/act-1452.html', 'scripts/act-1452-index.html');
  const telecomHtml = fs.readFileSync('scripts/act-859-index.html', 'utf8');

  const pornoSections = parseSections(pornoHtml, 1091);
  const telecomSections = parseSections(telecomHtml, 859);
  const copySections = parseSections(copyHtml, 1452);

  console.log(`Pornography Control Act (act-1091): ${pornoSections.length} sections found`);
  for (const s of pornoSections) {
    console.log(`  Sec ${s.secId}: ${s.title}`);
  }

  console.log(`\nTelecom Regulation Act (act-859): ${telecomSections.length} sections found`);
  for (const s of telecomSections.slice(0, 30)) {
    console.log(`  Sec ${s.secId}: ${s.title}`);
  }
  if (telecomSections.length > 30) {
    console.log(`  ... and ${telecomSections.length - 30} more sections.`);
    for (const s of telecomSections.slice(50, 80)) {
      console.log(`  Sec ${s.secId}: ${s.title}`);
    }
  }

  console.log(`\nCopyright Act, 2023 (act-1452): ${copySections.length} sections found`);
  for (const s of copySections.slice(0, 40)) {
    console.log(`  Sec ${s.secId}: ${s.title}`);
  }
}

run().catch(console.error);
