import fs from 'fs';

async function fetchAct(actNo) {
  const url = `https://bdlaws.minlaw.gov.bd/act-${actNo}.html`;
  console.log(`Fetching ${url}...`);
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const buf = Buffer.from(await res.arrayBuffer());
  const decoded = (buf[0] === 0xfe && buf[1] === 0xff) ? new TextDecoder('utf-16be').decode(buf) : buf.toString('utf8');
  fs.writeFileSync(`scripts/act-${actNo}.html`, decoded, 'utf8');
  console.log(`Saved scripts/act-${actNo}.html (length: ${decoded.length})`);
  return decoded;
}

async function main() {
  await fetchAct(1014);
  await fetchAct(1127);
  await fetchAct(1280);
}

main().catch(console.error);
