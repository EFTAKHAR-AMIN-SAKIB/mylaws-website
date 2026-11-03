import fs from 'node:fs';

async function check() {
  const res = await fetch('https://bdlaws.minlaw.gov.bd/act-1091/section-41877.html');
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
  console.log('HTML length:', html.length);
  const matches = html.match(/class="[^"]*"/g) || [];
  const unique = [...new Set(matches)];
  console.log('Classes:', unique.slice(0, 30));

  const pIdx = html.indexOf('৪।');
  if (pIdx !== -1) {
    console.log('Context around ৪।:');
    console.log(html.substring(pIdx - 100, pIdx + 300));
  }
}
check();
