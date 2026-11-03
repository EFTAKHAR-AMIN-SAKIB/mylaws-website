import fs from 'node:fs';

async function fetchUrl(url) {
  console.log(`Fetching ${url}...`);
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
  return text;
}

async function run() {
  // 1. Fetch Constitution act index
  const constHtml = await fetchUrl('https://bdlaws.minlaw.gov.bd/act-367.html');
  fs.writeFileSync('scripts/act-367-index.html', constHtml, 'utf8');
  console.log('Saved Constitution index: act-367-index.html, length:', constHtml.length);

  // 2. Search for Whistleblower Act in chrono index
  const chronoHtml = await fetchUrl('https://bdlaws.minlaw.gov.bd/laws-of-bangladesh-chronological-index.html');
  const lines = chronoHtml.split('\n');
  const matches = [];
  lines.forEach((l, idx) => {
    if (l.includes('জনস্বার্থ') || l.toLowerCase().includes('whistle') || l.includes('তথ্য প্রকাশ') || l.includes('সুরক্ষা')) {
      matches.push(`${idx + 1}: ${l.trim()}`);
    }
  });
  console.log('Chrono matches for Whistleblower / জনস্বার্থ:');
  console.log(matches.slice(0, 30).join('\n'));
}

run().catch(console.error);
