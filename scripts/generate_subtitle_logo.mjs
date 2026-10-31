import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function main() {
  const horizontalPath = path.resolve('public/images/logo-horizontal.png');
  const outPath = path.resolve('public/images/logo-horizontal-with-subtitle.png');
  const brainPath = path.resolve('C:/Users/CRB/.gemini/antigravity/brain/1ee0edec-c014-4b4b-8e8a-2da48f33dafe/logo_analysis/logo-horizontal-with-subtitle.png');

  // Let's create high-resolution SVG overlay for "LEGAL ASSISTANT"
  // "MYLAWS" in logo-horizontal.png runs from x: 731 to 1910 (width ~ 1180px), y from 215 to 458 (height ~ 243px).
  // The vertical bar runs from y: 113 to 634.
  // We place "LEGAL ASSISTANT" directly underneath "MYLAWS":
  // Starting at x = 740, y ~ 560.
  // Letter spacing ~ 16-20px for luxury editorial / legal assistant aesthetic.
  // Color: #8C653F (the brand gold/bronze) or #3D352E (matching the primary deep bronze/black).
  // Let's check both or test which one is best.

  const svgText = `
    <svg width="1919" height="787" viewBox="0 0 1919 787" xmlns="http://www.w3.org/2000/svg">
      <style>
        .subtitle {
          font-family: 'Cinzel', 'Times New Roman', 'Baskerville', 'Georgia', serif;
          font-size: 78px;
          font-weight: 600;
          letter-spacing: 32px;
          fill: #8C653F;
        }
      </style>
      <text x="735" y="565" class="subtitle">LEGAL ASSISTANT</text>
    </svg>
  `;

  await sharp(horizontalPath)
    .composite([{ input: Buffer.from(svgText), top: 0, left: 0 }])
    .png()
    .toFile(outPath);

  fs.copyFileSync(outPath, brainPath);
  console.log('Successfully generated logo-horizontal-with-subtitle.png');
}

main().catch(console.error);
