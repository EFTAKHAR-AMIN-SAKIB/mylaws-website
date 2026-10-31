import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = path.resolve('public/screenshots');
const BRAIN_DIR = 'C:\\Users\\CRB\\.gemini\\antigravity\\brain\\1ee0edec-c014-4b4b-8e8a-2da48f33dafe\\screenshots';

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(BRAIN_DIR, { recursive: true });

async function runCapture() {
  console.log('Capturing ask page screenshots with demo conversation...');

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    'about:blank',
  ]);

  await new Promise((r) => setTimeout(r, 1500));

  try {
    const vRes = await fetch('http://127.0.0.1:9222/json/version');
    const vData = await vRes.json();
    const webSocketDebuggerUrl = vData.webSocketDebuggerUrl;

    const ws = new globalThis.WebSocket(webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const res = JSON.parse(event.data);
      if (res.id && callbacks.has(res.id)) {
        const cb = callbacks.get(res.id);
        callbacks.delete(res.id);
        cb(res.result);
      }
    };

    function send(method, params = {}) {
      return new Promise((resolve) => {
        const curId = id++;
        callbacks.set(curId, resolve);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    await send('Target.setDiscoverTargets', { discover: true });
    const { targetId } = await send('Target.createTarget', { url: 'http://localhost:3000/ask?lang=en&demo=1' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

    function sendSession(method, params = {}) {
      return new Promise((resolve) => {
        const curId = id++;
        callbacks.set(curId, resolve);
        ws.send(JSON.stringify({ id: curId, sessionId, method, params }));
      });
    }

    await sendSession('Page.enable');
    await sendSession('DOM.enable');

    // 1. Emulate Mobile Viewport (iPhone / modern Android: 390 x 844)
    await sendSession('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    console.log('Navigating to http://localhost:3000/ask?lang=en&demo=1 ...');
    await sendSession('Page.navigate', { url: 'http://localhost:3000/ask?lang=en&demo=1' });
    await new Promise((r) => setTimeout(r, 3500));

    // Capture mobile active chat view
    const mobileScreen = await sendSession('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });

    const mobileBuf = Buffer.from(mobileScreen.data, 'base64');
    fs.writeFileSync(path.join(OUT_DIR, 'ask_mobile_chat.png'), mobileBuf);
    fs.writeFileSync(path.join(BRAIN_DIR, 'ask_mobile_chat.png'), mobileBuf);
    console.log('Mobile screenshot saved to ask_mobile_chat.png');

    // Also capture Bangla version for bilingual review
    await sendSession('Page.navigate', { url: 'http://localhost:3000/ask?lang=bn&demo=1' });
    await new Promise((r) => setTimeout(r, 2500));
    const mobileBnScreen = await sendSession('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });
    const mobileBnBuf = Buffer.from(mobileBnScreen.data, 'base64');
    fs.writeFileSync(path.join(OUT_DIR, 'ask_mobile_chat_bn.png'), mobileBnBuf);
    fs.writeFileSync(path.join(BRAIN_DIR, 'ask_mobile_chat_bn.png'), mobileBnBuf);
    console.log('Mobile BN screenshot saved to ask_mobile_chat_bn.png');

    // 2. Emulate Desktop (1440 x 900)
    await sendSession('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1.5,
      mobile: false,
    });
    await sendSession('Page.navigate', { url: 'http://localhost:3000/ask?lang=en&demo=1' });
    await new Promise((r) => setTimeout(r, 2500));

    const desktopScreen = await sendSession('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });
    const desktopBuf = Buffer.from(desktopScreen.data, 'base64');
    fs.writeFileSync(path.join(OUT_DIR, 'ask_desktop_chat.png'), desktopBuf);
    fs.writeFileSync(path.join(BRAIN_DIR, 'ask_desktop_chat.png'), desktopBuf);
    console.log('Desktop screenshot saved to ask_desktop_chat.png');

    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    chromeProc.kill();
  }
}

runCapture();
