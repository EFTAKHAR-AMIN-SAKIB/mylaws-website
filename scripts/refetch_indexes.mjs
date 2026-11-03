import fs from 'node:fs';

const ids = ['1444', '1063', '1256', '305'];

async function fetchIndex(id) {
  const url = `https://bdlaws.minlaw.gov.bd/act-${id}.html`;
  console.log(`Fetching index for ${id} from ${url}...`);
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const buf = await res.arrayBuffer();
  let text = '';
  const bytes = new Uint8Array(buf);
  if (bytes[0] === 0xFE && bytes[1] === 0xFF) {
    text = new TextDecoder('utf-16be').decode(buf);
  } else if (bytes[0] === 0xFF && bytes[1] === 0xFE) {
    text = new TextDecoder('utf-16le').decode(buf);
  } else {
    // check if it's utf-16be without BOM
    const testUtf8 = new TextDecoder('utf-8').decode(buf);
    if (testUtf8.includes('\x00')) {
      text = new TextDecoder('utf-16be').decode(buf);
    } else {
      text = testUtf8;
    }
  }
  fs.writeFileSync(`scripts/act-${id}-index.html`, text, 'utf8');
  console.log(`Saved act-${id}-index.html (${text.length} chars)`);
}

for (const id of ids) {
  await fetchIndex(id);
}
