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

const s68 = extractSections('scripts/act-print-68.html', 'scripts/act-68.html', 68);
const s1055 = extractSections('scripts/act-print-1055.html', 'scripts/act-1055.html', 1055);
const s1220 = extractSections('scripts/act-print-1220.html', 'scripts/act-1220.html', 1220);

console.log('Partition Act 68:', s68.length, 'sections');
console.log('Real Estate Act 1055:', s1055.length, 'sections');
console.log('Acquisition Act 1220:', s1220.length, 'sections');

fs.writeFileSync('scripts/raw_extracted_68.json', JSON.stringify(s68, null, 2), 'utf8');
fs.writeFileSync('scripts/raw_extracted_1055.json', JSON.stringify(s1055, null, 2), 'utf8');
fs.writeFileSync('scripts/raw_extracted_1220.json', JSON.stringify(s1220, null, 2), 'utf8');
