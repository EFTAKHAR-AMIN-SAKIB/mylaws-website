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
  await fetchFile('https://bdlaws.minlaw.gov.bd/act-75.html', 'scripts/act-75-index.html');
  await fetchFile('https://bdlaws.minlaw.gov.bd/act-38.html', 'scripts/act-38-index.html');
  await fetchFile('https://bdlaws.minlaw.gov.bd/act-1276.html', 'scripts/act-1276-index.html');
}

run();
