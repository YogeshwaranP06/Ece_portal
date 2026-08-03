const https = require('https');
https.get('https://trp.srmtrichy.edu.in/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const urls = data.match(/https?:\/\/[^"'\s]*\.(png|jpg|webp|svg)/gi);
    if(urls) {
       console.log(urls.filter(u => u.includes('logo') || u.includes('TRP') || u.includes('srm')).join('\n'));
    }
  });
}).on('error', err => console.log('Error:', err.message));
