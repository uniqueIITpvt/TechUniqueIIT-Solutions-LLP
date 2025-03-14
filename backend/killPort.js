const { exec } = require('child_process');
const os = require('os');

const PORT = process.env.PORT || 5000;

// Function to kill process on the specified port
const killProcessOnPort = () => {
  const isWindows = os.platform() === 'win32';

  // Command to find and kill process based on OS
  const command = isWindows
    ? `netstat -ano | findstr :${PORT} && FOR /F "tokens=5" %p in ('netstat -ano | findstr :${PORT}') do (TASKKILL /F /PID %p)`
    : `lsof -i :${PORT} | grep LISTEN | awk '{print $2}' | xargs -r kill -9`;

  console.log(`Attempting to kill any process using port ${PORT}...`);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(
        `No process found using port ${PORT} or error killing process: ${error.message}`
      );
      return;
    }
    if (stderr) {
      console.log(`Error: ${stderr}`);
      return;
    }
    console.log(`Process using port ${PORT} has been terminated: ${stdout}`);
  });
};

// Execute the function
killProcessOnPort();

module.exports = killProcessOnPort;
