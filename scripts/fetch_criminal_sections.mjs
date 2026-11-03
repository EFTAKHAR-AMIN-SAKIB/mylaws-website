import fs from 'node:fs';

const targetUrls = [
  // CrPC
  { act: 'act_crpc_1898', sec: '154', url: 'https://bdlaws.minlaw.gov.bd/act-75/section-20845.html' },
  { act: 'act_crpc_1898', sec: '161', url: 'https://bdlaws.minlaw.gov.bd/act-75/section-20855.html' },
  { act: 'act_crpc_1898', sec: '167', url: 'https://bdlaws.minlaw.gov.bd/act-75/section-20861.html' },
  { act: 'act_crpc_1898', sec: '173', url: 'https://bdlaws.minlaw.gov.bd/act-75/section-20869.html' },
  { act: 'act_crpc_1898', sec: '496', url: 'https://bdlaws.minlaw.gov.bd/act-75/section-22015.html' },
  { act: 'act_crpc_1898', sec: '497', url: 'https://bdlaws.minlaw.gov.bd/act-75/section-22016.html' },
  { act: 'act_crpc_1898', sec: '498', url: 'https://bdlaws.minlaw.gov.bd/act-75/section-22018.html' },

  // Arms Act 1878
  { act: 'act_arms_1878', sec: '13', url: 'https://bdlaws.minlaw.gov.bd/act-38/section-983.html' },
  { act: 'act_arms_1878', sec: '14', url: 'https://bdlaws.minlaw.gov.bd/act-38/section-984.html' },
  { act: 'act_arms_1878', sec: '19', url: 'https://bdlaws.minlaw.gov.bd/act-38/section-990.html' },
  { act: 'act_arms_1878', sec: '19A', url: 'https://bdlaws.minlaw.gov.bd/act-38/section-991.html' },
  { act: 'act_arms_1878', sec: '20A', url: 'https://bdlaws.minlaw.gov.bd/act-38/section-994.html' },

  // Narcotics Control Act 2018
  { act: 'act_narcotics_2018', sec: '9', url: 'https://bdlaws.minlaw.gov.bd/act-1276/section-48310.html' },
  { act: 'act_narcotics_2018', sec: '36', url: 'https://bdlaws.minlaw.gov.bd/act-1276/section-48375.html' },
  { act: 'act_narcotics_2018', sec: '44A', url: 'https://bdlaws.minlaw.gov.bd/act-1276/section-59353.html' },
  { act: 'act_narcotics_2018', sec: '46', url: 'https://bdlaws.minlaw.gov.bd/act-1276/section-48385.html' },
  { act: 'act_narcotics_2018', sec: '47', url: 'https://bdlaws.minlaw.gov.bd/act-1276/section-48386.html' },
];

async function run() {
  const results = [];
  for (const t of targetUrls) {
    try {
      console.log(`Fetching ${t.act} Sec ${t.sec}...`);
      const res = await fetch(t.url);
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
          .replace(/\s+/g, ' ')
          .trim();
      } else {
        text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      }

      // Also get title from txt-head if available
      const headMatch = html.match(/<div[^>]*class=["'][^"']*txt-head[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
      const head = headMatch ? headMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';

      console.log(`  Length: ${text.length}, Head: ${head.slice(0, 50)}...`);
      results.push({
        actId: t.act,
        sec: t.sec,
        url: t.url,
        head,
        text
      });
    } catch (e) {
      console.error(`Error on ${t.act} Sec ${t.sec}:`, e.message);
    }
  }

  fs.writeFileSync('scripts/criminal_extracted.json', JSON.stringify(results, null, 2), 'utf8');
  console.log(`Saved scripts/criminal_extracted.json with ${results.length} items`);
}

run();
