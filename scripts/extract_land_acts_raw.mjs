import fs from 'fs';

function extractSections(printFile, indexFile, actNo) {
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

  // Split by row lineremoves
  const rowChunks = printHtml.split(/<div class="row lineremoves[^"]*">/i).slice(1);
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

  const combined = [];
  for (let i = 0; i < printSections.length; i++) {
    const ps = printSections[i];
    const il = indexLinks[i] || {};
    let title = ps.head;
    if (!title && il.tocText) {
      title = il.tocText.replace(/^[০-৯\d\s।৷\-–—\.]+/g, '').trim();
    }
    combined.push({
      secIndex: i + 1,
      title: title || `Section ${i+1}`,
      tocText: il.tocText || '',
      url: il.url || '',
      text: ps.details
    });
  }
  return combined;
}

const s1454 = extractSections('scripts/act-print-1454.html', 'scripts/act-1454.html', 1454);
const s36 = extractSections('scripts/act-print-36.html', 'scripts/act-36.html', 36);
const s748 = extractSections('scripts/act-print-748.html', 'scripts/act-748.html', 748);

console.log('Land Crime 1454:', s1454.length, 'sections');
console.log('Specific Relief 36:', s36.length, 'sections');
console.log('Premises Rent 748:', s748.length, 'sections');

fs.writeFileSync('scripts/raw_extracted_1454.json', JSON.stringify(s1454, null, 2), 'utf8');
fs.writeFileSync('scripts/raw_extracted_36.json', JSON.stringify(s36, null, 2), 'utf8');
fs.writeFileSync('scripts/raw_extracted_748.json', JSON.stringify(s748, null, 2), 'utf8');
