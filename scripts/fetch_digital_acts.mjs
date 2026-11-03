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

async function run() {
  const chrono = await fetchFile('https://bdlaws.minlaw.gov.bd/laws-of-bangladesh-chronological-index.html', 'scripts/chrono-index.html');
  const re = /href=["'](act-[0-9]+)\.html["'][^>]*>([^<]+)<\/a>/g;
  let m;
  const matches = [];
  while ((m = re.exec(chrono)) !== null) {
    const actId = m[1];
    const title = m[2].trim();
    if (
      title.includes('কপিরাইট') ||
      title.toLowerCase().includes('copyright') ||
      title.includes('Pornography') ||
      title.includes('পর্নোগ্রাফি') ||
      title.includes('টেলিযোগাযোগ') ||
      title.includes('Telecommunication')
    ) {
      matches.push({ actId, title });
    }
  }
  console.log('Matches:', matches);

  // Fetch act-1089 and act-859
  await fetchFile('https://bdlaws.minlaw.gov.bd/act-1089.html', 'scripts/act-1089-index.html');
  await fetchFile('https://bdlaws.minlaw.gov.bd/act-859.html', 'scripts/act-859-index.html');
}

run().catch(console.error);
