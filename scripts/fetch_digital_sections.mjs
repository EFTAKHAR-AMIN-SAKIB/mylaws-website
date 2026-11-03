import fs from 'node:fs';

const targets = [
  // Pornography Control Act, 2012 (act-1091)
  { actId: 'act_pornography_2012', sec: '1', secId: '41874', url: 'https://bdlaws.minlaw.gov.bd/act-1091/section-41874.html' },
  { actId: 'act_pornography_2012', sec: '2', secId: '41875', url: 'https://bdlaws.minlaw.gov.bd/act-1091/section-41875.html' },
  { actId: 'act_pornography_2012', sec: '3', secId: '41876', url: 'https://bdlaws.minlaw.gov.bd/act-1091/section-41876.html' },
  { actId: 'act_pornography_2012', sec: '4', secId: '41877', url: 'https://bdlaws.minlaw.gov.bd/act-1091/section-41877.html' },
  { actId: 'act_pornography_2012', sec: '5', secId: '41878', url: 'https://bdlaws.minlaw.gov.bd/act-1091/section-41878.html' },
  { actId: 'act_pornography_2012', sec: '6', secId: '41879', url: 'https://bdlaws.minlaw.gov.bd/act-1091/section-41879.html' },
  { actId: 'act_pornography_2012', sec: '7', secId: '41880', url: 'https://bdlaws.minlaw.gov.bd/act-1091/section-41880.html' },
  { actId: 'act_pornography_2012', sec: '8', secId: '41881', url: 'https://bdlaws.minlaw.gov.bd/act-1091/section-41881.html' },
  { actId: 'act_pornography_2012', sec: '9', secId: '41882', url: 'https://bdlaws.minlaw.gov.bd/act-1091/section-41882.html' },
  { actId: 'act_pornography_2012', sec: '10', secId: '41883', url: 'https://bdlaws.minlaw.gov.bd/act-1091/section-41883.html' },
  { actId: 'act_pornography_2012', sec: '11', secId: '41884', url: 'https://bdlaws.minlaw.gov.bd/act-1091/section-41884.html' },
  { actId: 'act_pornography_2012', sec: '12', secId: '41885', url: 'https://bdlaws.minlaw.gov.bd/act-1091/section-41885.html' },
  { actId: 'act_pornography_2012', sec: '13', secId: '41886', url: 'https://bdlaws.minlaw.gov.bd/act-1091/section-41886.html' },
  { actId: 'act_pornography_2012', sec: '14', secId: '41887', url: 'https://bdlaws.minlaw.gov.bd/act-1091/section-41887.html' },
  { actId: 'act_pornography_2012', sec: '15', secId: '41888', url: 'https://bdlaws.minlaw.gov.bd/act-1091/section-41888.html' },

  // Telecom Regulation Act, 2001 (act-857)
  { actId: 'act_telecom_2001', sec: '59', secId: '33625', url: 'https://bdlaws.minlaw.gov.bd/act-857/section-33625.html' },
  { actId: 'act_telecom_2001', sec: '66', secId: '33644', url: 'https://bdlaws.minlaw.gov.bd/act-857/section-33644.html' },
  { actId: 'act_telecom_2001', sec: '67', secId: '33645', url: 'https://bdlaws.minlaw.gov.bd/act-857/section-33645.html' },
  { actId: 'act_telecom_2001', sec: '69', secId: '33647', url: 'https://bdlaws.minlaw.gov.bd/act-857/section-33647.html' },
  { actId: 'act_telecom_2001', sec: '70', secId: '33648', url: 'https://bdlaws.minlaw.gov.bd/act-857/section-33648.html' },
  { actId: 'act_telecom_2001', sec: '71', secId: '33649', url: 'https://bdlaws.minlaw.gov.bd/act-857/section-33649.html' },
  { actId: 'act_telecom_2001', sec: '77', secId: '33655', url: 'https://bdlaws.minlaw.gov.bd/act-857/section-33655.html' },
  { actId: 'act_telecom_2001', sec: '78', secId: '33656', url: 'https://bdlaws.minlaw.gov.bd/act-857/section-33656.html' },
  { actId: 'act_telecom_2001', sec: '79', secId: '33657', url: 'https://bdlaws.minlaw.gov.bd/act-857/section-33657.html' },
  { actId: 'act_telecom_2001', sec: '83', secId: '33661', url: 'https://bdlaws.minlaw.gov.bd/act-857/section-33661.html' },

  // Copyright Act, 2023 (act-1452)
  { actId: 'act_copyright_2023', sec: '2', secId: '52628', url: 'https://bdlaws.minlaw.gov.bd/act-1452/section-52628.html' },
  { actId: 'act_copyright_2023', sec: '26', secId: '52652', url: 'https://bdlaws.minlaw.gov.bd/act-1452/section-52652.html' },
  { actId: 'act_copyright_2023', sec: '69', secId: '52695', url: 'https://bdlaws.minlaw.gov.bd/act-1452/section-52695.html' },
  { actId: 'act_copyright_2023', sec: '70', secId: '52696', url: 'https://bdlaws.minlaw.gov.bd/act-1452/section-52696.html' },
  { actId: 'act_copyright_2023', sec: '77', secId: '52702', url: 'https://bdlaws.minlaw.gov.bd/act-1452/section-52702.html' },
  { actId: 'act_copyright_2023', sec: '100', secId: '52726', url: 'https://bdlaws.minlaw.gov.bd/act-1452/section-52726.html' },
  { actId: 'act_copyright_2023', sec: '105', secId: '52731', url: 'https://bdlaws.minlaw.gov.bd/act-1452/section-52731.html' },
  { actId: 'act_copyright_2023', sec: '115', secId: '52741', url: 'https://bdlaws.minlaw.gov.bd/act-1452/section-52741.html' }
];

async function fetchOne(target) {
  console.log(`Fetching ${target.actId} Sec ${target.sec}...`);
  const res = await fetch(target.url);
  const buf = await res.arrayBuffer();
  const nodeBuf = Buffer.from(buf);
  let html;
  if (nodeBuf[0] === 0xff && nodeBuf[1] === 0xfe) {
    html = nodeBuf.toString('utf16le');
  } else if (nodeBuf[0] === 0xfe && nodeBuf[1] === 0xff) {
    nodeBuf.swap16();
    html = nodeBuf.toString('utf16le');
  } else {
    html = nodeBuf.toString('utf8');
  }

  const match = html.match(/<div[^>]*class=["'][^"']*txt-details[^"']*["'][^>]*>([\s\S]*?)<\/div>\s*<\/div>/i);
  let text = '';
  if (match) {
    text = match[1]
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/[ \t]+/g, ' ')
      .replace(/\n\s+/g, '\n')
      .replace(/\s+/g, ' ')
      .trim();
  } else {
    // fallback
    const bodyMatch = html.match(/<div class="col-md-11 boxed-layout[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i);
    if (bodyMatch) {
      text = bodyMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    } else {
      text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    }
  }

  const headMatch = html.match(/<div[^>]*class=["'][^"']*txt-head[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
  const head = headMatch ? headMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';

  console.log(`  Length: ${text.length}, Head: ${head.slice(0, 50)}...`);
  return {
    actId: target.actId,
    sec: target.sec,
    secId: target.secId,
    url: target.url,
    head,
    text
  };
}

async function run() {
  const results = [];
  for (const t of targets) {
    try {
      const item = await fetchOne(t);
      results.push(item);
      await new Promise(r => setTimeout(r, 150));
    } catch (err) {
      console.error(`Error fetching ${t.actId} Sec ${t.sec}:`, err.message);
    }
  }

  fs.writeFileSync('scripts/digital_extracted.json', JSON.stringify(results, null, 2), 'utf8');
  console.log(`Saved scripts/digital_extracted.json with ${results.length} items`);
}

run().catch(console.error);
