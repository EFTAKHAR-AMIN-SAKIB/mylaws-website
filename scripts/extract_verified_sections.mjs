import fs from 'fs';

function clean(str) {
  return str
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

console.log('================ 1. LAND CRIME ACT 2023 (Act 1454) ================');
const landHtml = fs.readFileSync('scripts/act-print-1454.html', 'utf8');
const landText = clean(landHtml);

// Find section 13
const s13Start = landText.indexOf('১৩।');
const s14Start = landText.indexOf('১৪।');
console.log('--- Section 13 ---');
console.log(landText.substring(s13Start, s14Start !== -1 ? s14Start : s13Start + 600));

// Find section 19
const s19Start = landText.indexOf('১৯।');
const s20Start = landText.indexOf('২০।');
console.log('\n--- Section 19 ---');
console.log(landText.substring(s19Start, s20Start !== -1 ? s20Start : s19Start + 800));

console.log('\n================ 2. FAMILY COURTS ACT 2023 (Act 1444) ================');
const famHtml = fs.readFileSync('scripts/act-print-1444.html', 'utf8');
const famText = clean(famHtml);

// Find section 4 and 5
const f4Start = famText.indexOf('৪।');
const f5Start = famText.indexOf('৫।');
const f6Start = famText.indexOf('৬।');
console.log('--- Section 4 ---');
console.log(famText.substring(f4Start, f5Start));
console.log('\n--- Section 5 ---');
console.log(famText.substring(f5Start, f6Start));

console.log('\n================ 3. CONSUMERS PROTECTION ACT 2009 (Act 1014) ================');
const consHtml = fs.readFileSync('scripts/act-print-1014.html', 'utf8');
const consText = clean(consHtml);

for (const sec of ['৪২।', '৪৩।', '৪৬।', '৫০।']) {
  const start = consText.indexOf(sec);
  console.log(`\n--- Consumer Section ${sec} ---`);
  console.log(consText.substring(start, start + 600));
}

console.log('\n================ 4. LABOUR ACT 2006 (Act 952) ================');
const labHtml = fs.readFileSync('scripts/act-print-952.html', 'utf8');
const labText = clean(labHtml);

const l103Start = labText.indexOf('১০৩।');
const l104Start = labText.indexOf('১০৪।');
const l105Start = labText.indexOf('১০৫।');
const l106Start = labText.indexOf('১০৬।');
console.log('--- Labour Section 103 ---');
console.log(labText.substring(l103Start, l104Start));
console.log('\n--- Labour Section 105 ---');
console.log(labText.substring(l105Start, l106Start));
