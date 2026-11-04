import https from 'https';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'application/json'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function run() {
  const res = await fetchUrl('https://bdadvocates.com/wp-json/wp/v2/advocate?page=1&per_page=10');
  console.log("Status:", res.status);
  const items = JSON.parse(res.body);
  console.log("Count:", items.length);
  for (const it of items) {
    console.log({
      id: it.id,
      title: it.title?.rendered,
      slug: it.slug,
      link: it.link,
      district: it.advocate_district,
      practice: it.advocate_practice_area,
      status: it.advocate_status
    });
  }
}

run().catch(console.error);
