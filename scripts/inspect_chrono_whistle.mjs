import fs from 'node:fs';

async function check() {
  const chronoHtml = await (await fetch('https://bdlaws.minlaw.gov.bd/laws-of-bangladesh-chronological-index.html')).text();
  const lines = chronoHtml.split('\n');
  console.log(lines.slice(25480, 25510).join('\n'));
}
check();
