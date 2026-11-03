import fs from 'node:fs';

// 1. CrPC targets
const crpcHtml = fs.readFileSync('scripts/act-75-index.html', 'utf8');
const crpcLinks = [...crpcHtml.matchAll(/href=["'](\/act-75\/section-\d+\.html)["'][^>]*>([\s\S]*?)<\/a>/gi)];
console.log(`Total CrPC links: ${crpcLinks.length}`);

const crpcTargets = ['154', '161', '167', '173', '496', '497', '498'];
const crpcFound = [];
for (const t of crpcTargets) {
  const match = crpcLinks.find(l => {
    const text = l[2].replace(/<[^>]+>/g, '').trim();
    return text.startsWith(t + '.') || text.startsWith(t + ' ') || text.startsWith(t + '।');
  });
  if (match) {
    const text = match[2].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`CrPC Sec ${t}: ${match[1]} -> ${text}`);
    crpcFound.push({ act: 'crpc', sec: t, url: `https://bdlaws.minlaw.gov.bd${match[1]}`, title: text });
  } else {
    console.log(`CrPC NOT FOUND: ${t}`);
  }
}

// 2. Arms Act targets
const armsHtml = fs.readFileSync('scripts/act-38-index.html', 'utf8');
const armsLinks = [...armsHtml.matchAll(/href=["'](\/act-38\/section-\d+\.html)["'][^>]*>([\s\S]*?)<\/a>/gi)];
console.log(`\nTotal Arms Act links: ${armsLinks.length}`);
armsLinks.forEach(l => {
  const text = l[2].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`  ${l[1]} -> ${text}`);
});

// 3. Narcotics Control Act targets
const narcHtml = fs.readFileSync('scripts/act-1276-index.html', 'utf8');
const narcLinks = [...narcHtml.matchAll(/href=["'](\/act-1276\/section-\d+\.html)["'][^>]*>([\s\S]*?)<\/a>/gi)];
console.log(`\nTotal Narcotics Act links: ${narcLinks.length}`);
narcLinks.forEach(l => {
  const text = l[2].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`  ${l[1]} -> ${text}`);
});
