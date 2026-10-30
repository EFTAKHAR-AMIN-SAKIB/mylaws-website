import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.resolve('public/screenshots');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const configs = [
  {
    name: 'desktop_bn.png',
    url: 'http://localhost:3000/download?lang=bn',
    width: 1440,
    height: 2400,
  },
  {
    name: 'desktop_en.png',
    url: 'http://localhost:3000/download?lang=en',
    width: 1440,
    height: 2400,
  },
  {
    name: 'mobile_bn.png',
    url: 'http://localhost:3000/download?lang=bn',
    width: 390,
    height: 3100,
  },
  {
    name: 'mobile_en.png',
    url: 'http://localhost:3000/download?lang=en',
    width: 390,
    height: 3100,
  },
];

console.log('Capturing responsive screenshots in Bangla and English...');

for (const cfg of configs) {
  const outFile = path.join(outputDir, cfg.name);
  console.log(`Generating ${cfg.name} (${cfg.width}x${cfg.height})...`);
  const cmd = `"${chromePath}" --headless=new --no-sandbox --disable-gpu --virtual-time-budget=2000 --window-size=${cfg.width},${cfg.height} --screenshot="${outFile}" "${cfg.url}"`;
  execSync(cmd);
  const stat = fs.statSync(outFile);
  console.log(`✅ ${cfg.name} created (${(stat.size / 1024).toFixed(1)} KB)`);
}

console.log('All 4 screenshots captured successfully!');
