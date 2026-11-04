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
  console.log("Fetching wp-json/wp/v2/advocate?per_page=5...");
  const res = await fetchUrl('https://bdadvocates.com/wp-json/wp/v2/advocate?per_page=5');
  console.log("Status:", res.status);
  console.log("Total count header:", res.headers['x-wp-total'], "Total pages:", res.headers['x-wp-totalpages']);
  if (res.status === 200) {
    const list = JSON.parse(res.body);
    console.log("Received entries count:", list.length);
    if (list.length > 0) {
      console.log("Keys of first entry:", Object.keys(list[0]));
      console.log("First entry title:", list[0].title);
      console.log("First entry link:", list[0].link);
      console.log("First entry content preview:", (list[0].content?.rendered || '').slice(0, 300));
      console.log("First entry meta/custom fields:", list[0].meta, list[0].advocate_category, list[0].district);
    }
  } else {
    console.log("Trying at_biz_dir...");
    const bizRes = await fetchUrl('https://bdadvocates.com/wp-json/wp/v2/at_biz_dir?per_page=5');
    console.log("at_biz_dir Status:", bizRes.status);
  }
}

run().catch(console.error);
