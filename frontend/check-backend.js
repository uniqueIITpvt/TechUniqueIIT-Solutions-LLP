const http = require('http');

const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const parsedUrl = new URL(backendUrl);

console.log(`Checking if backend server is running at ${backendUrl}...`);

const options = {
  hostname: parsedUrl.hostname,
  port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
  path: '/api/health-check',
  method: 'GET',
  timeout: 5000,
};

const req = http.request(options, (res) => {
  if (res.statusCode === 200) {
    console.log('✅ Backend server is running!');
    process.exit(0);
  } else {
    console.warn(`⚠️ Backend server returned status code: ${res.statusCode}`);
    console.warn('You may experience issues with API requests.');
    process.exit(0);
  }
});

req.on('error', (error) => {
  console.error('❌ Cannot connect to backend server!');
  console.error(`Error: ${error.message}`);
  console.error(
    'Please make sure your backend server is running before starting the frontend.'
  );
  console.error(`Expected backend URL: ${backendUrl}`);

  // Don't exit with error code to allow the frontend to start anyway
  process.exit(0);
});

req.on('timeout', () => {
  console.error('❌ Connection to backend server timed out!');
  console.error(
    'Please make sure your backend server is running before starting the frontend.'
  );
  console.error(`Expected backend URL: ${backendUrl}`);
  req.destroy();

  // Don't exit with error code to allow the frontend to start anyway
  process.exit(0);
});

req.end();
