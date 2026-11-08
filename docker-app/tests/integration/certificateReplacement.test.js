const fs = require('node:fs');
const net = require('node:net');
const os = require('node:os');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');

const appRoot = path.resolve(__dirname, '../..');
const NGINX_IMAGE = 'nginx:alpine';

const read = (filename) => fs.readFileSync(path.join(appRoot, filename), 'utf8');

function run(cmd, args, options = {}) {
  return spawnSync(cmd, args, { encoding: 'utf8', timeout: 30000, ...options });
}

function freePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

function createCertificate(directory, commonName) {
  fs.mkdirSync(directory, { recursive: true });
  execFileSync('openssl', [
    'req', '-x509', '-nodes', '-days', '365', '-newkey', 'rsa:2048',
    '-keyout', path.join(directory, 'selfsigned.key'),
    '-out', path.join(directory, 'selfsigned.crt'),
    '-subj', `/C=US/ST=State/L=City/O=Organization/CN=${commonName}`
  ], { stdio: 'ignore' });
}

function health(port) {
  return run('curl', [
    '-s', '-k', '-o', '/dev/null', '-w', '%{http_code}',
    `https://127.0.0.1:${port}/health`
  ], { timeout: 10000 });
}

function certificateSubject(port) {
  const result = run('sh', [
    '-c',
    `openssl s_client -connect 127.0.0.1:${port} -servername localhost </dev/null 2>/dev/null | openssl x509 -noout -subject -nameopt oneline`
  ], { timeout: 15000 });

  if (result.status !== 0) {
    throw new Error(`certificate inspection failed: ${result.stderr}`);
  }
  return result.stdout.trim();
}

async function startContainer({ name, ports, workspace, certificates }) {
  const result = run('docker', [
    'run', '--rm', '-d', '--name', name,
    '-p', `127.0.0.1:${ports.http}:8080`,
    '-p', `127.0.0.1:${ports.https}:8443`,
    '-v', `${path.join(workspace, 'nginx.conf.template')}:/etc/nginx/nginx.conf.template:ro`,
    '-v', `${path.join(workspace, 'confd')}:/etc/nginx/conf.d:ro`,
    '-v', `${path.join(workspace, 'entrypoint.sh')}:/usr/local/bin/entrypoint.sh:ro`,
    '-v', `${certificates}:/etc/nginx/ssl:ro`,
    '-v', `${path.join(workspace, 'index.html')}:/usr/share/nginx/html/index.html:ro`,
    NGINX_IMAGE, '/usr/local/bin/entrypoint.sh'
  ], { timeout: 30000 });

  if (result.status !== 0) {
    throw new Error(`docker run failed: ${result.stderr}`);
  }

  const deadline = Date.now() + 30000;
  let lastAttempt;
  while (Date.now() < deadline) {
    lastAttempt = health(ports.https);
    if (lastAttempt.status === 0 && lastAttempt.stdout.trim() === '200') return;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`HTTPS listener never became ready: ${lastAttempt ? lastAttempt.stdout : 'no response'}`);
}

async function withContainer(options, callback) {
  try {
    await startContainer(options);
    return await callback(options.ports);
  } finally {
    run('docker', ['rm', '-f', options.name], { timeout: 15000 });
  }
}

const dockerReady =
  run('docker', ['info'], { timeout: 15000 }).status === 0 &&
  run('docker', ['image', 'inspect', NGINX_IMAGE], { timeout: 15000 }).status === 0 &&
  run('openssl', ['version'], { timeout: 10000 }).status === 0;

describe('generated and replacement HTTPS certificates', () => {
  test('the quick-start Compose example exposes 8443 and documents the replacement mount', () => {
    const compose = read('docker-compose.example.yml');

    expect(compose).toMatch(/dockerfile: Dockerfile/);
    expect(compose).toMatch(/- "8080:8080"/);
    expect(compose).toMatch(/- "8443:8443"/);
    expect(compose).toMatch(/profiles: \["custom-cert"\]/);
    expect(compose).toMatch(/service: face-detection-default/);
    expect(compose).toMatch(/- \.\/ssl:\/etc\/nginx\/ssl:ro/);
    expect(compose).toMatch(/selfsigned\.crt and selfsigned\.key/);
  });

  test('the Dockerfile generates the certificate at the paths used by nginx', () => {
    const dockerfile = read('Dockerfile');
    const sslConfig = read('nginx-ssl.conf');

    expect(dockerfile).toMatch(/openssl req -x509[\s\S]*?-keyout \/etc\/nginx\/ssl\/selfsigned\.key[\s\S]*?-out \/etc\/nginx\/ssl\/selfsigned\.crt/);
    expect(sslConfig).toMatch(/ssl_certificate \/etc\/nginx\/ssl\/selfsigned\.crt;/);
    expect(sslConfig).toMatch(/ssl_certificate_key \/etc\/nginx\/ssl\/selfsigned\.key;/);
  });
});

(dockerReady ? describe : describe.skip)('live certificate replacement (requires Docker + cached nginx:alpine)', () => {
  jest.setTimeout(90000);

  let workspace;
  let generatedCertificates;
  let replacementCertificates;

  beforeAll(() => {
    workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'certificate-replacement-'));
    generatedCertificates = path.join(workspace, 'generated');
    replacementCertificates = path.join(workspace, 'replacement');

    // This is the same certificate recipe used by Dockerfile. The temporary
    // directory stands in for /etc/nginx/ssl before a replacement is mounted.
    createCertificate(generatedCertificates, 'localhost');
    createCertificate(replacementCertificates, 'replacement.example.test');

    fs.writeFileSync(path.join(workspace, 'index.html'), '<html><body>certificate-replacement</body></html>');
    fs.copyFileSync(path.join(appRoot, 'nginx.conf.template'), path.join(workspace, 'nginx.conf.template'));
    fs.copyFileSync(path.join(appRoot, 'entrypoint.sh'), path.join(workspace, 'entrypoint.sh'));
    fs.mkdirSync(path.join(workspace, 'confd'));
    fs.copyFileSync(path.join(appRoot, 'nginx-ssl.conf'), path.join(workspace, 'confd', 'ssl.conf'));
  });

  afterAll(() => {
    if (workspace) fs.rmSync(workspace, { recursive: true, force: true });
  });

  test('serves the generated certificate, then presents the mounted replacement', async () => {
    const generatedPorts = { http: await freePort(), https: await freePort() };
    const generatedSubject = await withContainer({
      name: `facedete-cert-generated-${process.pid}-${Date.now()}`,
      ports: generatedPorts,
      workspace,
      certificates: generatedCertificates
    }, async (ports) => {
      expect(health(ports.https).stdout.trim()).toBe('200');
      return certificateSubject(ports.https);
    });

    const replacementPorts = { http: await freePort(), https: await freePort() };
    const replacementSubject = await withContainer({
      name: `facedete-cert-replacement-${process.pid}-${Date.now()}`,
      ports: replacementPorts,
      workspace,
      certificates: replacementCertificates
    }, async (ports) => {
      expect(health(ports.https).stdout.trim()).toBe('200');
      return certificateSubject(ports.https);
    });

    expect(generatedSubject).toMatch(/CN\s*=\s*localhost/);
    expect(replacementSubject).toMatch(/CN\s*=\s*replacement\.example\.test/);
    expect(replacementSubject).not.toBe(generatedSubject);
  });
});
