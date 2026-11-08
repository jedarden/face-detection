const fs = require('node:fs');
const net = require('node:net');
const os = require('node:os');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');

const appRoot = path.resolve(__dirname, '../..');
const NGINX_IMAGE = 'nginx:alpine';

const read = (filename) => fs.readFileSync(path.join(appRoot, filename), 'utf8');

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

function run(cmd, args, options = {}) {
  return spawnSync(cmd, args, { encoding: 'utf8', timeout: 30000, ...options });
}

function curl(url, { insecure = false } = {}) {
  const args = ['-s', '-o', '/dev/null', '-w', '%{http_code} %{content_type}'];
  if (insecure) args.push('-k');
  args.push(url);
  const result = run('curl', args, { timeout: 10000 });
  const [status, contentType] = String(result.stdout).split(' ');
  return { status: Number(status), contentType, exit: result.status };
}

function curlBody(url, { insecure = false } = {}) {
  const args = ['-s'];
  if (insecure) args.push('-k');
  args.push(url);
  return run('curl', args, { timeout: 10000 });
}

// The nginx image (Dockerfile) declares two listeners: plain HTTP on 8080
// (server block in the entrypoint-rendered nginx.conf) and HTTPS on 8443
// (server block in nginx-ssl.conf, copied into /etc/nginx/conf.d and loaded
// through the conf.d include). These tests pin that wiring and, when Docker
// and a cached nginx:alpine image are available, smoke both listeners live.
describe('listener wiring across shipped artifacts', () => {
  test('the nginx Dockerfile exposes both ports and ships the TLS listener', () => {
    const dockerfile = read('Dockerfile');

    expect(dockerfile).toMatch(/EXPOSE 8080 8443/);
    expect(dockerfile).toMatch(
      /openssl req -x509[\s\S]*?-keyout \/etc\/nginx\/ssl\/selfsigned\.key[\s\S]*?-out \/etc\/nginx\/ssl\/selfsigned\.crt[\s\S]*?-subj/
    );
    expect(dockerfile).toMatch(/COPY nginx\.conf\.template \/etc\/nginx\/nginx\.conf\.template/);
    expect(dockerfile).toMatch(/COPY nginx-ssl\.conf \/etc\/nginx\/conf\.d\/ssl\.conf/);
    expect(dockerfile).toMatch(/rm -f \/etc\/nginx\/conf\.d\/default\.conf/);
    expect(dockerfile).toMatch(/ENTRYPOINT \["\/usr\/local\/bin\/entrypoint\.sh"\]/);
  });

  test('the rendered config loads conf.d so port 8443 actually listens', () => {
    const template = read('nginx.conf.template');

    expect(template).toMatch(/include \/etc\/nginx\/conf\.d\/\*\.conf;/);
    expect(template).toMatch(/listen 8080;/);
    expect(template).not.toMatch(/listen 8443/);
  });

  test('nginx-ssl.conf is the HTTPS listener bound to the image certificate paths', () => {
    const ssl = read('nginx-ssl.conf');

    expect(ssl).toMatch(/listen 8443 ssl/);
    expect(ssl).not.toMatch(/listen 8080/);
    expect(ssl).toMatch(/ssl_certificate \/etc\/nginx\/ssl\/selfsigned\.crt;/);
    expect(ssl).toMatch(/ssl_certificate_key \/etc\/nginx\/ssl\/selfsigned\.key;/);
    expect(ssl).toMatch(/ssl_protocols TLSv1\.2 TLSv1\.3;/);
    expect(ssl).toMatch(/location = \/health \{/);
    expect(ssl).toMatch(/location = \/metrics \{/);
  });

  test('the healthcheck probes both listeners', () => {
    const healthCheck = read('health-check');

    expect(healthCheck).toMatch(/http:\/\/localhost:8080\/health/);
    expect(healthCheck).toMatch(/https:\/\/localhost:8443\/health/);
    expect(healthCheck).toMatch(/curl -sfk/);
  });

  test('the Compose service maps both ports but its simple image serves HTTP only', () => {
    const compose = read('docker-compose.yml');
    const simple = read('Dockerfile.simple');

    expect(compose).toMatch(/"\$\{HTTP_PORT:-8080\}:8080"/);
    expect(compose).toMatch(/"\$\{HTTPS_PORT:-8443\}:8443"/);
    expect(compose).toMatch(/dockerfile:\s*Dockerfile\.simple/);
    expect(compose).toMatch(/\.\/ssl:\/etc\/nginx\/ssl:ro/);

    // Honest contract: the Compose production service runs server.js under
    // node, which has no TLS listener, so its 8443 mapping has nothing
    // behind it. TLS exists only in the nginx image (Dockerfile / GHCR).
    expect(simple).toMatch(/EXPOSE 8080/);
    expect(simple).not.toMatch(/EXPOSE[^\n]*8443/);
    expect(simple).not.toMatch(/nginx|ssl_certificate/);
  });
});

const dockerReady =
  run('docker', ['info'], { timeout: 15000 }).status === 0 &&
  run('docker', ['image', 'inspect', NGINX_IMAGE], { timeout: 15000 }).status === 0 &&
  run('openssl', ['version'], { timeout: 10000 }).status === 0;

(dockerReady ? describe : describe.skip)('live listener smoke (requires Docker + a cached nginx:alpine image)', () => {
  jest.setTimeout(60000);

  const containerName = `facedete-listener-smoke-${process.pid}-${Date.now()}`;
  let httpPort;
  let httpsPort;
  let workspace;

  const health = (insecure) => curl(`http://127.0.0.1:${httpPort}/health`, { insecure });
  const healthTls = (insecure) => curl(`https://127.0.0.1:${httpsPort}/health`, { insecure });

  beforeAll(async () => {
    httpPort = await freePort();
    httpsPort = await freePort();
    workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'listener-smoke-'));

    // Mirror the image layout built by the Dockerfile: template and
    // entrypoint at their image paths, nginx-ssl.conf as the only file in
    // conf.d (default.conf removed), and a self-signed certificate under
    // /etc/nginx/ssl generated with the Dockerfile's openssl invocation.
    fs.writeFileSync(path.join(workspace, 'index.html'), '<html><body>listener-smoke</body></html>');
    fs.copyFileSync(path.join(appRoot, 'nginx.conf.template'), path.join(workspace, 'nginx.conf.template'));
    fs.copyFileSync(path.join(appRoot, 'entrypoint.sh'), path.join(workspace, 'entrypoint.sh'));
    const confd = path.join(workspace, 'conf.d');
    fs.mkdirSync(confd);
    fs.copyFileSync(path.join(appRoot, 'nginx-ssl.conf'), path.join(confd, 'ssl.conf'));

    execFileSync('openssl', [
      'req', '-x509', '-nodes', '-days', '365', '-newkey', 'rsa:2048',
      '-keyout', path.join(workspace, 'selfsigned.key'),
      '-out', path.join(workspace, 'selfsigned.crt'),
      '-subj', '/C=US/ST=State/L=City/O=Organization/CN=localhost'
    ], { stdio: 'ignore' });

    const runResult = run('docker', [
      'run', '--rm', '-d', '--name', containerName,
      '-p', `127.0.0.1:${httpPort}:8080`,
      '-p', `127.0.0.1:${httpsPort}:8443`,
      '-v', `${path.join(workspace, 'nginx.conf.template')}:/etc/nginx/nginx.conf.template:ro`,
      '-v', `${confd}:/etc/nginx/conf.d:ro`,
      '-v', `${path.join(workspace, 'entrypoint.sh')}:/usr/local/bin/entrypoint.sh:ro`,
      '-v', `${workspace}:/etc/nginx/ssl:ro`,
      '-v', `${path.join(workspace, 'index.html')}:/usr/share/nginx/html/index.html:ro`,
      NGINX_IMAGE, '/usr/local/bin/entrypoint.sh'
    ], { timeout: 30000 });

    if (runResult.status !== 0) {
      throw new Error(`docker run failed: ${runResult.stderr}`);
    }

    const deadline = Date.now() + 30000;
    let lastError;
    while (Date.now() < deadline) {
      const attempt = health(true);
      if (attempt.status === 200) return;
      lastError = attempt;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    throw new Error(`HTTP listener never became ready; last probe exit=${lastError ? lastError.exit : 'n/a'}`);
  });

  afterAll(() => {
    run('docker', ['rm', '-f', containerName], { timeout: 15000 });
    if (workspace) fs.rmSync(workspace, { recursive: true, force: true });
  });

  test('HTTP 8080 serves the health contract', () => {
    const result = health();

    expect(result.status).toBe(200);
    expect(result.contentType).toMatch(/^application\/json/);
    const payload = JSON.parse(curlBody(`http://127.0.0.1:${httpPort}/health`).stdout);
    expect(payload).toEqual({ status: 'healthy', timestamp: expect.any(String) });
  });

  test('HTTPS 8443 serves the health contract over TLS', () => {
    const result = healthTls(true);

    expect(result.status).toBe(200);
    expect(result.contentType).toMatch(/^application\/json/);
    const payload = JSON.parse(curlBody(`https://127.0.0.1:${httpsPort}/health`, { insecure: true }).stdout);
    expect(payload).toEqual({ status: 'healthy', timestamp: expect.any(String) });
  });

  test('8443 presents the image self-signed certificate, so untrusting clients fail', () => {
    // Without -k, curl refuses the self-signed certificate: the listener
    // really is terminating TLS, not answering plain HTTP.
    const refused = healthTls();
    expect(refused.exit).not.toBe(0);
    expect(refused.status).not.toBe(200);

    const presented = run('sh', [
      '-c',
      `openssl s_client -connect 127.0.0.1:${httpsPort} -servername localhost </dev/null 2>/dev/null | openssl x509 -noout -subject -nameopt oneline`
    ], { timeout: 15000 });

    expect(presented.status).toBe(0);
    expect(presented.stdout).toMatch(/CN\s*=\s*localhost/);
  });

  test('both listeners serve the application entry page and reject /metrics', () => {
    const httpIndex = curlBody(`http://127.0.0.1:${httpPort}/`);
    const httpsIndex = curlBody(`https://127.0.0.1:${httpsPort}/`, { insecure: true });

    expect(httpIndex.stdout).toContain('listener-smoke');
    expect(httpsIndex.stdout).toContain('listener-smoke');

    for (const url of [`http://127.0.0.1:${httpPort}/metrics`, `https://127.0.0.1:${httpsPort}/metrics`]) {
      const metrics = curl(url, { insecure: true });
      expect(metrics.status).toBe(404);
      expect(metrics.contentType).toMatch(/^application\/json/);
    }
  });

  test('nginx starts without conflicting-server warnings', () => {
    const logs = run('docker', ['logs', containerName], { timeout: 15000 });

    expect(logs.status).toBe(0);
    expect(`${logs.stdout}${logs.stderr}`).not.toMatch(/conflicting server name/);
  });
});
