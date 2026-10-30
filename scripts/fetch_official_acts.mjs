import fs from 'fs';

async function fetchUrl(url, dest) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const text = await res.text();
    fs.writeFileSync(dest, text, 'utf8');
    console.log(`Fetched ${url} -> ${dest} (${text.length} bytes)`);
  } catch (e) {
    console.error(`Failed ${url}:`, e.message);
  }
}

async function main() {
  await fetchUrl('https://bdlaws.minlaw.gov.bd/act-print-1444.html', 'scripts/act-print-1444.html');
  await fetchUrl('https://bdlaws.minlaw.gov.bd/act-1444/section-52391.html', 'scripts/act-1444-sec-52391.html');
  await fetchUrl('https://bdlaws.minlaw.gov.bd/act-print-1014.html', 'scripts/act-print-1014.html');
  await fetchUrl('https://bdlaws.minlaw.gov.bd/act-print-1454.html', 'scripts/act-print-1454.html');
  await fetchUrl('https://bdlaws.minlaw.gov.bd/act-print-952.html', 'scripts/act-print-952.html');
}

main().catch(console.error);
