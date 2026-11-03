import path from 'path';
import sharp from 'sharp';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const entrySize = 16;
  let offset = headerSize + count * entrySize;
  
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4); // count
  
  const entries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(item.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += item.buffer.length;
  }
  
  return Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.buffer)]);
}

async function buildFavicons() {
  const rootDir = path.resolve(__dirname, '..');
  const logoPath = path.join(rootDir, 'public/images/logo-icon.png');
  
  // 1. Load clean logo and trim any transparent edge whitespace
  const trimmedBuf = await sharp(logoPath).trim().toBuffer();
  
  // 2. Master Canvas 512x512
  const masterSize = 512;
  const logoInnerSize = 410; // nicely proportioned: 80% coverage with balanced margins
  
  const logoResized = await sharp(trimmedBuf)
    .resize(logoInnerSize, logoInnerSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer();
    
  // Elegant squircle SVG badge with warm ivory fill and refined gold accent border
  const badgeSvg = Buffer.from(
    `<svg width="${masterSize}" height="${masterSize}" viewBox="0 0 ${masterSize} ${masterSize}" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="${masterSize - 16}" height="${masterSize - 16}" rx="104" ry="104" fill="#FAF8F3" stroke="#8A6840" stroke-width="12" />
    </svg>`
  );
  
  // 3. Composite master 512x512 image
  const master512 = await sharp(badgeSvg)
    .composite([{ input: logoResized, gravity: 'center' }])
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();
    
  // 4. Generate all required resolutions
  const img16 = await sharp(master512).resize(16, 16).png().toBuffer();
  const img32 = await sharp(master512).resize(32, 32).png().toBuffer();
  const img48 = await sharp(master512).resize(48, 48).png().toBuffer();
  const img180 = await sharp(master512).resize(180, 180).png().toBuffer();
  const img192 = await sharp(master512).resize(192, 192).png().toBuffer();
  
  // 5. Generate Multi-Resolution ICO (16x16, 32x32, 48x48)
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: img16 },
    { width: 32, height: 32, buffer: img32 },
    { width: 48, height: 48, buffer: img48 }
  ]);
  
  // 6. Write to public/
  fs.writeFileSync(path.join(rootDir, 'public/favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(rootDir, 'public/icon.png'), master512);
  fs.writeFileSync(path.join(rootDir, 'public/icon-192.png'), img192);
  fs.writeFileSync(path.join(rootDir, 'public/apple-touch-icon.png'), img180);
  
  // 7. Write to src/app/ for native Next.js 15 metadata discovery
  fs.writeFileSync(path.join(rootDir, 'src/app/favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(rootDir, 'src/app/icon.png'), master512);
  fs.writeFileSync(path.join(rootDir, 'src/app/apple-icon.png'), img180);
  
  console.log('All favicons and app icons generated successfully!');
  console.log('- public/favicon.ico (Multi-size: 16x16, 32x32, 48x48)');
  console.log('- public/icon.png (512x512)');
  console.log('- public/icon-192.png (192x192)');
  console.log('- public/apple-touch-icon.png (180x180)');
  console.log('- src/app/favicon.ico');
  console.log('- src/app/icon.png');
  console.log('- src/app/apple-icon.png');
}

buildFavicons().catch(console.error);
