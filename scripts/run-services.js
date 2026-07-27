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

const isWin = process.platform === 'win32';

const services = [
  {
    name: 'backend',
    cmd: process.execPath,
    args: [path.resolve(rootDir, 'backend', 'node_modules', 'nodemon', 'bin', 'nodemon.js'), 'server.js'],
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
    cmd: process.execPath,
    args: [path.resolve(rootDir, 'frontend', 'node_modules', 'next', 'dist', 'bin', 'next'), 'dev'],
    dir: 'frontend',
    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },
];

const children = [];
let shuttingDown = false;

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

const cleanEnv = {};
for (const key of Object.keys(process.env)) {
  if (!key.startsWith('npm_')) {
    cleanEnv[key] = process.env[key];
  }
}

for (const service of services) {
  const serviceDir = path.resolve(rootDir, service.dir);
  const child = spawn(service.cmd, service.args, {
    cwd: serviceDir,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: {
      ...cleanEnv,
      ...service.env,
    },
  });

  child.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    for (const line of lines) {
      if (line.trim()) console.log(`[${service.name}] ${line}`);
    }
  });

  child.stderr.on('data', (data) => {
    const lines = data.toString().split('\n');
    for (const line of lines) {
      if (line.trim()) console.error(`[${service.name}-err] ${line}`);
    }
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
