import fs from 'node:fs';

const targets = [
  // Constitution Articles 26 - 44
  { actId: 'act_constitution_1972', sec: '26', secId: '24574', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24574.html' },
  { actId: 'act_constitution_1972', sec: '27', secId: '24575', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24575.html' },
  { actId: 'act_constitution_1972', sec: '28', secId: '24576', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24576.html' },
  { actId: 'act_constitution_1972', sec: '29', secId: '24577', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24577.html' },
  { actId: 'act_constitution_1972', sec: '30', secId: '24578', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24578.html' },
  { actId: 'act_constitution_1972', sec: '31', secId: '24579', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24579.html' },
  { actId: 'act_constitution_1972', sec: '32', secId: '24580', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24580.html' },
  { actId: 'act_constitution_1972', sec: '33', secId: '24581', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24581.html' },
  { actId: 'act_constitution_1972', sec: '34', secId: '24582', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24582.html' },
  { actId: 'act_constitution_1972', sec: '35', secId: '24583', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24583.html' },
  { actId: 'act_constitution_1972', sec: '36', secId: '24584', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24584.html' },
  { actId: 'act_constitution_1972', sec: '37', secId: '24585', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24585.html' },
  { actId: 'act_constitution_1972', sec: '38', secId: '24586', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24586.html' },
  { actId: 'act_constitution_1972', sec: '39', secId: '24587', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24587.html' },
  { actId: 'act_constitution_1972', sec: '40', secId: '24588', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24588.html' },
  { actId: 'act_constitution_1972', sec: '41', secId: '24589', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24589.html' },
  { actId: 'act_constitution_1972', sec: '42', secId: '24590', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24590.html' },
  { actId: 'act_constitution_1972', sec: '43', secId: '24591', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24591.html' },
  { actId: 'act_constitution_1972', sec: '44', secId: '24592', url: 'https://bdlaws.minlaw.gov.bd/act-367/section-24592.html' },

  // Whistleblower Protection Act, 2011 (act-1072)
  { actId: 'act_whistleblower_2011', sec: '1', secId: '41349', url: 'https://bdlaws.minlaw.gov.bd/act-1072/section-41349.html' },
  { actId: 'act_whistleblower_2011', sec: '2', secId: '41350', url: 'https://bdlaws.minlaw.gov.bd/act-1072/section-41350.html' },
  { actId: 'act_whistleblower_2011', sec: '3', secId: '41351', url: 'https://bdlaws.minlaw.gov.bd/act-1072/section-41351.html' },
  { actId: 'act_whistleblower_2011', sec: '4', secId: '41352', url: 'https://bdlaws.minlaw.gov.bd/act-1072/section-41352.html' },
  { actId: 'act_whistleblower_2011', sec: '5', secId: '41353', url: 'https://bdlaws.minlaw.gov.bd/act-1072/section-41353.html' },
  { actId: 'act_whistleblower_2011', sec: '6', secId: '41354', url: 'https://bdlaws.minlaw.gov.bd/act-1072/section-41354.html' },
  { actId: 'act_whistleblower_2011', sec: '7', secId: '41355', url: 'https://bdlaws.minlaw.gov.bd/act-1072/section-41355.html' },
  { actId: 'act_whistleblower_2011', sec: '8', secId: '41356', url: 'https://bdlaws.minlaw.gov.bd/act-1072/section-41356.html' },
  { actId: 'act_whistleblower_2011', sec: '9', secId: '41357', url: 'https://bdlaws.minlaw.gov.bd/act-1072/section-41357.html' },
  { actId: 'act_whistleblower_2011', sec: '10', secId: '41358', url: 'https://bdlaws.minlaw.gov.bd/act-1072/section-41358.html' },
  { actId: 'act_whistleblower_2011', sec: '11', secId: '41359', url: 'https://bdlaws.minlaw.gov.bd/act-1072/section-41359.html' },
  { actId: 'act_whistleblower_2011', sec: '12', secId: '41360', url: 'https://bdlaws.minlaw.gov.bd/act-1072/section-41360.html' },
  { actId: 'act_whistleblower_2011', sec: '13', secId: '41361', url: 'https://bdlaws.minlaw.gov.bd/act-1072/section-41361.html' },
  { actId: 'act_whistleblower_2011', sec: '14', secId: '41362', url: 'https://bdlaws.minlaw.gov.bd/act-1072/section-41362.html' },
  { actId: 'act_whistleblower_2011', sec: '15', secId: '41363', url: 'https://bdlaws.minlaw.gov.bd/act-1072/section-41363.html' },
  { actId: 'act_whistleblower_2011', sec: '16', secId: '41364', url: 'https://bdlaws.minlaw.gov.bd/act-1072/section-41364.html' }
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
      console.error(`Error on ${t.actId} Sec ${t.sec}:`, err.message);
    }
  }

  fs.writeFileSync('scripts/const_whistle_extracted.json', JSON.stringify(results, null, 2), 'utf8');
  console.log(`Saved scripts/const_whistle_extracted.json with ${results.length} items`);
}

run().catch(console.error);
