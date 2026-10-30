import fs from 'fs';

function clean(s) {
  return s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

// 1. Act 1444: Land Crime Prevention and Redress Act 2023
if (fs.existsSync('scripts/act-print-1444.html')) {
  const html = fs.readFileSync('scripts/act-print-1444.html', 'utf8');
  console.log('--- ACT 1444 (Land Crime Act 2023) ---');
  // Match sections
  const secRegex = /<div class="liner"[^>]*>([\s\S]*?)<\/div>/g;
  // Let's search for ১৩ and ১৯
  const lines = html.split(/<div class="row[ "]/);
  for (const block of lines) {
    const text = clean(block);
    if (text.startsWith('১৩।') || text.startsWith('১৯।') || text.includes('উপরি-স্তর') || text.includes('আমলযোগ্যতা')) {
      console.log('SECTION BLOCK:\n', text.substring(0, 1000), '\n');
    }
  }
}

// 2. Act 1014: Consumers' Right Protection Act 2009
if (fs.existsSync('scripts/act-print-1014.html')) {
  const html = fs.readFileSync('scripts/act-print-1014.html', 'utf8');
  console.log('--- ACT 1014 (Consumer Protection Act 2009) ---');
  const lines = html.split(/<div class="row[ "]/);
  for (const block of lines) {
    const text = clean(block);
    if (text.startsWith('৪২।') || text.startsWith('৪৩।') || text.startsWith('৪৬।') || text.startsWith('৫০।')) {
      console.log('CONSUMER SECTION BLOCK:\n', text.substring(0, 800), '\n');
    }
  }
}
