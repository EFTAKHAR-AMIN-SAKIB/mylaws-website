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
  const res = await fetchUrl('https://bdadvocates.com/wp-json/wp/v2/advocate?per_page=3');
  const items = JSON.parse(res.body);
  console.log("Item 0 ACF:", JSON.stringify(items[0].acf, null, 2));
  console.log("Item 0 districts:", items[0].advocate_district);
  console.log("Item 0 practice areas:", items[0].advocate_practice_area);

  // Check district taxonomy terms
  const distRes = await fetchUrl('https://bdadvocates.com/wp-json/wp/v2/advocate_district?per_page=20');
  console.log("District terms count:", JSON.parse(distRes.body).length);
  console.log("Sample districts:", JSON.parse(distRes.body).slice(0, 10).map(d => ({ id: d.id, name: d.name, slug: d.slug })));

  // Check practice area taxonomy terms
  const pracRes = await fetchUrl('https://bdadvocates.com/wp-json/wp/v2/advocate_practice_area?per_page=20');
  console.log("Practice area terms count:", JSON.parse(pracRes.body).length);
  console.log("Sample practice areas:", JSON.parse(pracRes.body).slice(0, 10).map(p => ({ id: p.id, name: p.name, slug: p.slug })));
}

run().catch(console.error);
