import fs from 'node:fs';

const actsToFetch = [
  { id: 'act_domestic_violence_2010', bdlawsId: 'act-1063' },
  { id: 'act_dowry_2018', bdlawsId: 'act-1256' }
];

async function fetchAct(act) {
  const indexUrl = `https://bdlaws.minlaw.gov.bd/${act.bdlawsId}.html`;
  const printUrl = `https://bdlaws.minlaw.gov.bd/act-print-${act.bdlawsId.replace('act-', '')}.html`;
  console.log(`Fetching ${act.id} from ${printUrl} ...`);
  try {
    const res = await fetch(printUrl, {
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
      const utf8 = new TextDecoder('utf-8').decode(buf);
      if (utf8.includes('\x00')) {
        text = new TextDecoder('utf-16be').decode(buf);
      } else {
        text = utf8;
      }
    }
    fs.writeFileSync(`scripts/${act.bdlawsId}-print.html`, text, 'utf8');
    console.log(`Saved ${act.bdlawsId}-print.html (${text.length} chars)`);
  } catch (err) {
    console.error(`Failed to fetch print version for ${act.id}:`, err.message);
  }

  try {
    const res2 = await fetch(indexUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const text2 = await res2.text();
    fs.writeFileSync(`scripts/${act.bdlawsId}-index.html`, text2, 'utf8');
    console.log(`Saved ${act.bdlawsId}-index.html (${text2.length} chars)`);
  } catch (err) {
    console.error(`Failed to fetch index for ${act.id}:`, err.message);
  }
}

async function run() {
  for (const act of actsToFetch) {
    await fetchAct(act);
  }
}

run();
