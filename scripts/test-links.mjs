import https from 'https';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'text/html'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function run() {
  const url = 'https://bdadvocates.com/advocate/?district=Chittagong';
  const res = await fetchUrl(url);
  const regex = /href="([^"]*advocate[^"]*)"/gi;
  let m;
  const list = new Set();
  while ((m = regex.exec(res.body)) !== null) {
    list.add(m[1]);
  }
  console.log("All advocate links found:", Array.from(list).slice(0, 30));
}

run().catch(console.error);
