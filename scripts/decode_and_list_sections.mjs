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
  const telecomHtml = await fetchFile('https://bdlaws.minlaw.gov.bd/act-857.html', 'scripts/act-857-index.html');
  const pornoHtml = readDecoded('scripts/act-1091-index.html');
  const copyHtml = readDecoded('scripts/act-1452-index.html');

  const pornoSections = parseSections(pornoHtml, 1091);
  const telecomSections = parseSections(telecomHtml, 857);
  const copySections = parseSections(copyHtml, 1452);

  console.log(`\n======================================================`);
  console.log(`1. Pornography Control Act, 2012 (act-1091): ${pornoSections.length} sections`);
  console.log(`======================================================`);
  for (const s of pornoSections) {
    console.log(`  [Sec ${s.secId}] ${s.title}`);
  }

  console.log(`\n======================================================`);
  console.log(`2. Telecom Regulation Act, 2001 (act-857): ${telecomSections.length} sections`);
  console.log(`======================================================`);
  for (const s of telecomSections) {
    console.log(`  [Sec ${s.secId}] ${s.title}`);
  }

  console.log(`\n======================================================`);
  console.log(`3. Copyright Act, 2023 (act-1452): ${copySections.length} sections`);
  console.log(`======================================================`);
  for (const s of copySections) {
    if (s.title.includes('কম্পিউটার') || s.title.includes('লঙ্ঘন') || s.title.includes('দণ্ড') || s.title.includes('শাস্তি') || s.title.includes('ব্যতিক্রম') || s.title.includes('অধিকার') || s.title.includes('ডিজিটাল') || s.title.includes('পাইরেসি') || s.title.includes('কম্পিউটার প্রোগ্রাম')) {
      console.log(`  [Sec ${s.secId}] ${s.title}`);
    }
  }
}

run().catch(console.error);
