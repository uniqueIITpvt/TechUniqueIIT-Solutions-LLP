const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const mode = process.argv[2] || 'dev';

if (mode !== 'dev') {
  console.error('Unsupported mode: ' + mode);
  process.exit(1);
}

// Next.js can leave incompatible dev/build manifests behind after routes are
// added or removed while another server is running. Start development from a
// clean output directory so those stale JSON manifests cannot crash next dev.
const nextOutputDir = path.resolve(rootDir, 'frontend', '.next');
try {
  fs.rmSync(nextOutputDir, { recursive: true, force: true });
  console.log('[frontend] cleared stale .next output');
} catch (error) {
  console.error('[frontend] could not clear stale .next output:', error.message);
  process.exit(1);
}

const npmExecPath = process.env.npm_execpath;
const useNpmCli = Boolean(npmExecPath);
const npmCommand = useNpmCli ? process.execPath : process.platform === 'win32' ? 'npm.cmd' : 'npm';

const services = [
  {
    name: 'backend',
    script: 'dev',
    dir: 'backend',
    env: {
      LOCAL_DEV: 'true',
      NODE_ENV: 'development',
      PORT: process.env.PORT || '5000',
      FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
      BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:5000',
    },
  },
  {
    name: 'frontend',
    script: 'dev',
    dir: 'frontend',
    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },
];

const children = [];
let shuttingDown = false;

const npmArgs = (service) =>
  useNpmCli
    ? [npmExecPath, 'run', service.script, '--prefix', service.dir]
    : ['run', service.script, '--prefix', service.dir];

const stopAll = (exitCode = 0) => {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }

  setTimeout(() => process.exit(exitCode), 500);
};

for (const service of services) {
  const child = spawn(npmCommand, npmArgs(service), {
    cwd: rootDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      ...service.env,
    },
    windowsHide: false,
  });

  children.push(child);

  child.on('error', (error) => {
    console.error('[' + service.name + '] ' + error.message);
    stopAll(1);
  });

  child.on('exit', (code, signal) => {
    if (!shuttingDown) {
      console.log('[' + service.name + '] stopped' + (signal ? ' by ' + signal : ''));
      stopAll(code || 1);
    }
  });
}

process.on('SIGINT', () => stopAll(0));
process.on('SIGTERM', () => stopAll(0));
