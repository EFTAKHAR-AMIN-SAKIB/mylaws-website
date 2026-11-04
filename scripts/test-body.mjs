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
  const res = await fetchUrl('https://bdadvocates.com/advocate/moni-rani-das-34426/');
  // find the section after the mega menus
  const html = res.body;
  const startIdx = html.indexOf('<div class="et_pb_section');
  const mainIdx = html.indexOf('<main');
  const articleIdx = html.indexOf('<article');
  console.log("Indexes:", { startIdx, mainIdx, articleIdx });

  // Let's search for "MONI RANI DAS" occurrences in the body
  let pos = 0;
  while ((pos = html.indexOf('MONI RANI DAS', pos)) !== -1) {
    console.log("--- Occurrence at", pos, "---");
    console.log(html.slice(pos - 100, pos + 300));
    pos += 14;
  }
}

run().catch(console.error);
