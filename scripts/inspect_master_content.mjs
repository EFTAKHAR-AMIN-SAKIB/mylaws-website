import fs from 'node:fs';

async function check() {
  const res = await fetch('https://bdlaws.minlaw.gov.bd/act-1091/section-41877.html');
  const buf = await res.arrayBuffer();
  const nodeBuf = Buffer.from(buf);
  const html = nodeBuf.toString('utf16le');

  const idx = html.indexOf('masterContent');
  if (idx !== -1) {
    console.log(html.substring(idx, idx + 1000));
  }
}
check();
