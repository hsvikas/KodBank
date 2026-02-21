const http = require('http');

const testData = JSON.stringify({
  uname: 'testuser123',
  password: 'Test@1234',
  email: 'test@kodbank2.com',
  phone: '9876543210'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': testData.length
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', JSON.stringify(JSON.parse(data), null, 2));
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
  process.exit(1);
});

req.write(testData);
req.end();
