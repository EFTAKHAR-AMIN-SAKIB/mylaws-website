import fs from 'fs';

async function fetchFile(url, dest) {
  console.log(`Fetching ${url} -> ${dest}...`);
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const buf = Buffer.from(await res.arrayBuffer());
  const text = (buf[0] === 0xfe && buf[1] === 0xff) ? new TextDecoder('utf-16be').decode(buf) : buf.toString('utf8');
  fs.writeFileSync(dest, text, 'utf8');
  console.log(`Saved ${dest} (length: ${text.length})`);
  return text;
}

async function main() {
  await fetchFile('https://bdlaws.minlaw.gov.bd/act-1454.html', 'scripts/act-1454.html');
  await fetchFile('https://bdlaws.minlaw.gov.bd/act-print-1454.html', 'scripts/act-print-1454.html');

  await fetchFile('https://bdlaws.minlaw.gov.bd/act-36.html', 'scripts/act-36.html');
  await fetchFile('https://bdlaws.minlaw.gov.bd/act-print-36.html', 'scripts/act-print-36.html');

  await fetchFile('https://bdlaws.minlaw.gov.bd/act-748.html', 'scripts/act-748.html');
  await fetchFile('https://bdlaws.minlaw.gov.bd/act-print-748.html', 'scripts/act-print-748.html');
}

main().catch(console.error);
