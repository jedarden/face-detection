/** @jest-environment node */

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const appRoot = path.resolve(__dirname, '../..');
const healthCheck = path.join(appRoot, 'health-check');

function runHealthcheck({ httpStatus = 0, httpsStatus = 0, indexExists = true } = {}) {
  const tempRoot = fs.mkdtempSync(path.join(process.cwd(), '.healthcheck-test-'));
  const binDir = path.join(tempRoot, 'bin');
  const indexFile = path.join(tempRoot, 'index.html');
  const curlLog = path.join(tempRoot, 'curl.log');
  fs.mkdirSync(binDir);

  fs.writeFileSync(path.join(binDir, 'curl'), `#!/bin/sh\nprintf '%s\\n' "$*" >> "$CURL_LOG"\ncase "$*" in\n  *https://*) exit ${httpsStatus} ;;\n  *) exit ${httpStatus} ;;\nesac\n`);
  fs.chmodSync(path.join(binDir, 'curl'), 0o755);
  if (indexExists) fs.writeFileSync(indexFile, '<html></html>');

  try {
    const result = spawnSync('/bin/sh', [healthCheck], {
      encoding: 'utf8',
      env: {
        ...process.env,
        PATH: `${binDir}:${process.env.PATH}`,
        HEALTHCHECK_HTTP_URL: 'http://health.test/health',
        HEALTHCHECK_HTTPS_URL: 'https://health.test/health',
        HEALTHCHECK_INDEX_FILE: indexFile,
        CURL_LOG: curlLog
      }
    });
    result.curlCalls = fs.readFileSync(curlLog, 'utf8').trim().split('\n');
    return result;
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

describe('Docker healthcheck contract', () => {
  test('the nginx image invokes its script and Compose checks the simple image /health route', () => {
    const dockerfile = fs.readFileSync(path.join(appRoot, 'Dockerfile'), 'utf8');
    const compose = fs.readFileSync(path.join(appRoot, 'docker-compose.yml'), 'utf8');

    expect(dockerfile).toMatch(/COPY health-check \/usr\/local\/bin\/health-check/);
    expect(dockerfile).toMatch(/CMD \/usr\/local\/bin\/health-check \|\| exit 1/);
    expect(compose).toMatch(/dockerfile:\s*Dockerfile\.simple/);
    expect(compose).toMatch(/test:\s*\["CMD",\s*"curl",\s*"-f",\s*"http:\/\/localhost:8080\/health"\]/);
  });

  test('the simple Docker image uses the shared server and checks its /health response', () => {
    const dockerfile = fs.readFileSync(path.join(appRoot, 'Dockerfile.simple'), 'utf8');

    expect(dockerfile).toMatch(/COPY server\.js \.\//);
    expect(dockerfile).toMatch(/CMD curl -f http:\/\/localhost:8080\/health/);
    expect(dockerfile).toMatch(/CMD \["node", "server\.js"\]/);
  });

  test('passes only when both health URLs and the app entry file are available', () => {
    const result = runHealthcheck();
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Health check passed');
    expect(result.curlCalls).toEqual([
      '-sf http://health.test/health',
      '-sfk https://health.test/health'
    ]);
  });

  test.each([
    [{ httpStatus: 22 }, 'HTTP endpoint not responding'],
    [{ httpsStatus: 22 }, 'HTTPS endpoint not responding'],
    [{ indexExists: false }, 'Application files missing']
  ])('fails and identifies an unhealthy dependency (%o)', (options, expectedMessage) => {
    const result = runHealthcheck(options);
    expect(result.status).toBe(1);
    expect(result.stdout).toContain(expectedMessage);
  });
});
