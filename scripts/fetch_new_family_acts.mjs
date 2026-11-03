import fs from 'node:fs';

const actsToFetch = [
  { id: 'act_parents_care_2013', bdlawsId: 'act-1132' },
  { id: 'act_children_2013', bdlawsId: 'act-1119' },
  { id: 'act_succession_1925', bdlawsId: 'act-138' },
  { id: 'act_special_marriage_1872', bdlawsId: 'act-25' }
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
    const buf2 = await res2.arrayBuffer();
    let text2 = '';
    const bytes2 = new Uint8Array(buf2);
    if (bytes2[0] === 0xFE && bytes2[1] === 0xFF) {
      text2 = new TextDecoder('utf-16be').decode(buf2);
    } else if (bytes2[0] === 0xFF && bytes2[1] === 0xFE) {
      text2 = new TextDecoder('utf-16le').decode(buf2);
    } else {
      const utf8 = new TextDecoder('utf-8').decode(buf2);
      if (utf8.includes('\x00')) {
        text2 = new TextDecoder('utf-16be').decode(buf2);
      } else {
        text2 = utf8;
      }
    }
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
