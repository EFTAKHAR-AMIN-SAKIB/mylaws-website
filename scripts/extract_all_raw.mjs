import fs from 'fs';

function extractAll(printFile, indexFile) {
  const printHtml = fs.readFileSync(printFile, 'utf8');
  const indexHtml = fs.readFileSync(indexFile, 'utf8');

  // Extract links from index
  const linkRegex = /<a[^>]+href=["'](\/act-\d+\/section-\d+\.html)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const indexLinks = [];
  let m;
  while ((m = linkRegex.exec(indexHtml)) !== null) {
    indexLinks.push({
      url: 'https://bdlaws.minlaw.gov.bd' + m[1],
      tocText: m[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ')
    });
  }

  // Extract rows from printHtml
  // Split by row lineremoves
  const rowChunks = printHtml.split(/<div class="row lineremoves\s*">/i).slice(1);
  const printSections = [];
  for (const rowContent of rowChunks) {
    const headMatch = rowContent.match(/<div[^>]*class=["'][^"']*txt-head[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
    const detailsMatch = rowContent.match(/<div[^>]*class=["'][^"']*txt-details[^"']*["'][^>]*>([\s\S]*?)(?:<\/div>\s*<\/div>|<\/div>\s*<hr|$)/i);
    
    if (headMatch || detailsMatch) {
      let head = headMatch ? headMatch[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ') : '';
      let details = detailsMatch ? detailsMatch[1] : '';
      details = details
        .replace(/<div class="clbr">&nbsp;<\/div>/gi, '\n')
        .replace(/<div class="na">&nbsp;<\/div>/gi, ' ')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/&nbsp;/g, ' ')
        .replace(/&zwnj;/g, '')
        .replace(/&zwj;/g, '')
        .replace(/<[^>]+>/g, '')
        .replace(/\r/g, '')
        .replace(/[ \t]+/g, ' ')
        .replace(/\n\s+/g, '\n')
        .trim();
      
      printSections.push({ head, details });
    }
  }

  // Combine
  const combined = [];
  for (let i = 0; i < printSections.length; i++) {
    const ps = printSections[i];
    const il = indexLinks[i] || {};
    // Extract section title from head or tocText
    let titleBn = ps.head;
    if (!titleBn && il.tocText) {
      titleBn = il.tocText.replace(/^[০-৯\d\s।৷\-–—]+/, '').trim();
    }
    combined.push({
      secIndex: i + 1,
      titleBn: titleBn || `ধারা ${i+1}`,
      tocText: il.tocText || '',
      url: il.url || '',
      text: ps.details
    });
  }
  return combined;
}

const cSections = extractAll('scripts/act-print-1014.html', 'scripts/act-1014.html');
const fSections = extractAll('scripts/act-print-1127.html', 'scripts/act-1127.html');
const bSections = extractAll('scripts/act-print-1280.html', 'scripts/act-1280.html');

console.log(`Consumer: ${cSections.length} sections`);
console.log(`Food Safety: ${fSections.length} sections`);
console.log(`BSTI: ${bSections.length} sections`);

fs.writeFileSync('scripts/extracted_raw_consumer.json', JSON.stringify(cSections, null, 2), 'utf8');
fs.writeFileSync('scripts/extracted_raw_food_safety.json', JSON.stringify(fSections, null, 2), 'utf8');
fs.writeFileSync('scripts/extracted_raw_bsti.json', JSON.stringify(bSections, null, 2), 'utf8');
console.log('Saved raw extracted sections to scripts/extracted_raw_*.json');
