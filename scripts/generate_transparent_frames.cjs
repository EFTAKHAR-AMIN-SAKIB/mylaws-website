const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processAllFrames() {
  console.log('Starting transparent frame generation for 180 frames...');
  const startTime = Date.now();
  
  const cropX = 280;
  const cropW = 720;
  const cropH = 720;
  
  // We can process in batches of 10 concurrently
  const BATCH_SIZE = 10;
  
  for (let i = 1; i <= 180; i += BATCH_SIZE) {
    const batch = [];
    for (let j = i; j < i + BATCH_SIZE && j <= 180; j++) {
      batch.push(j);
    }
    
    await Promise.all(batch.map(async (frameNum) => {
      const numStr = String(frameNum).padStart(3, '0');
      const srcPath = path.join(__dirname, '..', 'public', 'frames_raw', `frame_${numStr}.webp`);
      const dstPath = path.join(__dirname, '..', 'public', 'frames', `frame_${numStr}.webp`);
      
      const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });
      const out = Buffer.alloc(cropW * cropH * 4);
      
      for (let y = 0; y < cropH; y++) {
        for (let x = 0; x < cropW; x++) {
          const srcIdx = (y * info.width + (x + cropX)) * 3;
          const dstIdx = (y * cropW + x) * 4;
          
          const r = data[srcIdx];
          const g = data[srcIdx + 1];
          const b = data[srcIdx + 2];
          
          out[dstIdx] = r;
          out[dstIdx + 1] = g;
          out[dstIdx + 2] = b;
          
          const d = Math.hypot(r - 237, g - 232, b - 220);
          if (d <= 14) {
            out[dstIdx + 3] = 0;
          } else if (d < 28) {
            out[dstIdx + 3] = Math.round(((d - 14) / 14) * 255);
          } else {
            out[dstIdx + 3] = 255;
          }
        }
      }
      
      await sharp(out, { raw: { width: cropW, height: cropH, channels: 4 } })
        .webp({ quality: 90, effort: 4 })
        .toFile(dstPath);
    }));
    
    process.stdout.write(`Processed frames up to ${Math.min(i + BATCH_SIZE - 1, 180)} / 180...\r`);
  }
  
  console.log(`\nAll 180 frames generated successfully in ${((Date.now() - startTime) / 1000).toFixed(1)}s!`);
}

processAllFrames().catch(err => {
  console.error('Error generating frames:', err);
  process.exit(1);
});
