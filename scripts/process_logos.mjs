import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const BG_R = 253;
const BG_G = 249;
const BG_B = 236;

// Function to make background transparent smoothly
function makeTransparent(data, width, height) {
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const srcIdx = i * 3;
    const dstIdx = i * 4;

    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];

    // Euclidean distance from background in RGB space
    const dr = r - BG_R;
    const dg = g - BG_G;
    const db = b - BG_B;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);

    if (dist < 4) {
      // Pure background
      out[dstIdx] = r;
      out[dstIdx + 1] = g;
      out[dstIdx + 2] = b;
      out[dstIdx + 3] = 0;
    } else if (dist > 35) {
      // Pure foreground
      out[dstIdx] = r;
      out[dstIdx + 1] = g;
      out[dstIdx + 2] = b;
      out[dstIdx + 3] = 255;
    } else {
      // Transition / anti-aliasing edge
      const alpha = Math.min(255, Math.max(0, Math.round(((dist - 4) / 31) * 255)));
      out[dstIdx] = r;
      out[dstIdx + 1] = g;
      out[dstIdx + 2] = b;
      out[dstIdx + 3] = alpha;
    }
  }

  return out;
}

async function run() {
  console.log('Processing new logos...');

  // 1. Process 1.png (Horizontal)
  const img1 = await sharp('public/new_logo_extracted/1.png').raw().toBuffer({ resolveWithObject: true });
  const rgba1 = makeTransparent(img1.data, img1.info.width, img1.info.height);

  // Extract trimmed horizontal logo (bounding box: minX 64, maxX 1943, minY 691, maxY 1438)
  // Let's add 20px padding around it
  const pad1 = 20;
  const left1 = Math.max(0, 64 - pad1);
  const top1 = Math.max(0, 691 - pad1);
  const width1 = Math.min(2000 - left1, 1943 - 64 + pad1 * 2);
  const height1 = Math.min(2000 - top1, 1438 - 691 + pad1 * 2);

  const trimmedHorizontal = await sharp(rgba1, {
    raw: { width: img1.info.width, height: img1.info.height, channels: 4 }
  })
  .extract({ left: left1, top: top1, width: width1, height: height1 })
  .png({ quality: 100, compressionLevel: 9 })
  .toBuffer();

  fs.writeFileSync('public/images/logo-horizontal.png', trimmedHorizontal);
  console.log('Saved public/images/logo-horizontal.png', width1, 'x', height1);

  // Extract standalone icon (emblem) from 1.png (x: 64 to 680, y: 691 to 1438)
  const padIcon = 15;
  const leftIcon = Math.max(0, 64 - padIcon);
  const topIcon = Math.max(0, 691 - padIcon);
  const widthIcon = Math.min(2000 - leftIcon, 680 - 64 + padIcon * 2);
  const heightIcon = Math.min(2000 - topIcon, 1438 - 691 + padIcon * 2);

  const iconBuffer = await sharp(rgba1, {
    raw: { width: img1.info.width, height: img1.info.height, channels: 4 }
  })
  .extract({ left: leftIcon, top: topIcon, width: widthIcon, height: heightIcon })
  .png({ quality: 100, compressionLevel: 9 })
  .toBuffer();

  fs.writeFileSync('public/images/logo-icon.png', iconBuffer);
  console.log('Saved public/images/logo-icon.png', widthIcon, 'x', heightIcon);

  // Extract standalone wordmark from 1.png (x: 780 to 1943, y: 880 to 1180 approx)
  const leftText = 780;
  const topText = 870;
  const widthText = 1943 - 780 + 15;
  const heightText = 1190 - 870 + 15;

  const textBuffer = await sharp(rgba1, {
    raw: { width: img1.info.width, height: img1.info.height, channels: 4 }
  })
  .extract({ left: leftText, top: topText, width: widthText, height: heightText })
  .png({ quality: 100, compressionLevel: 9 })
  .toBuffer();

  fs.writeFileSync('public/images/logo-text.png', textBuffer);
  console.log('Saved public/images/logo-text.png', widthText, 'x', heightText);

  // 2. Process 2.png (Stacked)
  const img2 = await sharp('public/new_logo_extracted/2.png').raw().toBuffer({ resolveWithObject: true });
  const rgba2 = makeTransparent(img2.data, img2.info.width, img2.info.height);

  // Bounding box for 2.png: minX: 351, maxX: 1658, minY: 271, maxY: 1491
  const pad2 = 25;
  const left2 = Math.max(0, 351 - pad2);
  const top2 = Math.max(0, 271 - pad2);
  const width2 = Math.min(2000 - left2, 1658 - 351 + pad2 * 2);
  const height2 = Math.min(2000 - top2, 1491 - 271 + pad2 * 2);

  const trimmedStacked = await sharp(rgba2, {
    raw: { width: img2.info.width, height: img2.info.height, channels: 4 }
  })
  .extract({ left: left2, top: top2, width: width2, height: height2 })
  .png({ quality: 100, compressionLevel: 9 })
  .toBuffer();

  fs.writeFileSync('public/images/logo-stacked.png', trimmedStacked);
  console.log('Saved public/images/logo-stacked.png', width2, 'x', height2);

  // 3. Generate App Icons & Favicons from the iconic Emblem (2.png emblem or 1.png emblem)
  // Let's use the iconic Emblem from 2.png (with golden halo arch) for the square app icon!
  // In 2.png: emblem is minX: 351, maxX: 1658, minY: 271, maxY: 1210 (above wordmark)
  const iconPad = 40;
  const emblemWidth = 1658 - 351;
  const emblemHeight = 1220 - 271;
  // Make it square
  const maxDim = Math.max(emblemWidth, emblemHeight);
  const centerX = (351 + 1658) / 2;
  const centerY = (271 + 1220) / 2;
  const halfDim = (maxDim / 2) + iconPad;

  const sqLeft = Math.max(0, Math.round(centerX - halfDim));
  const sqTop = Math.max(0, Math.round(centerY - halfDim));
  const sqSize = Math.min(2000 - sqLeft, 2000 - sqTop, Math.round(halfDim * 2));

  const squareEmblem = await sharp(rgba2, {
    raw: { width: img2.info.width, height: img2.info.height, channels: 4 }
  })
  .extract({ left: sqLeft, top: sqTop, width: sqSize, height: sqSize })
  .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

  fs.writeFileSync('public/icon.png', squareEmblem);
  console.log('Saved public/icon.png (512x512)');

  const appleIcon = await sharp(squareEmblem)
    .resize(180, 180)
    .png()
    .toBuffer();
  fs.writeFileSync('public/apple-touch-icon.png', appleIcon);
  console.log('Saved public/apple-touch-icon.png (180x180)');

  // Favicon (32x32 PNG as ico)
  const favicon = await sharp(squareEmblem)
    .resize(32, 32)
    .png()
    .toBuffer();
  fs.writeFileSync('public/favicon.ico', favicon);
  console.log('Saved public/favicon.ico (32x32)');

  console.log('All brand logo assets generated successfully.');
}

run();
