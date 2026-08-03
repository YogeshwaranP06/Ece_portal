import https from 'https';

const options = {
  hostname: 'en.wikipedia.org',
  port: 443,
  path: '/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=SRM_Institute_of_Science_and_Technology',
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0'
  }
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', d => {
    data += d;
  });
  res.on('end', () => {
    console.log(data);
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();
