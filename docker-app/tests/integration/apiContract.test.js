/** @jest-environment node */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const app = require('../../server');

const appRoot = path.resolve(__dirname, '../..');
let server;

function get(pathname) {
  return new Promise((resolve, reject) => {
    http.get({
      hostname: '127.0.0.1',
      port: server.address().port,
      path: pathname,
      headers: { Accept: 'application/json' }
    }, (response) => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => { body += chunk; });
      response.on('end', () => resolve({ response, body }));
    }).on('error', reject);
  });
}

function nginxLocations(config, endpoint) {
  const locationPattern = new RegExp(`location = \\/${endpoint} \\{([\\s\\S]*?)\\n\\s*\\}`, 'g');
  return [...config.matchAll(locationPattern)].map((match) => match[1]);
}

function nginxReturn(location) {
  const match = location.match(/return\s+(\d{3})\s+'([^']*)';/);
  if (!match) throw new Error(`No JSON return directive in nginx location:\n${location}`);
  return { status: Number(match[1]), body: match[2] };
}

beforeAll((done) => {
  server = app.listen(0, '127.0.0.1', done);
});

afterAll((done) => {
  server.close(done);
});

describe('HTTP API contract', () => {
  test('GET /health returns a no-cache healthy JSON response with an ISO timestamp', async () => {
    const { response, body } = await get('/health');
    const payload = JSON.parse(body);

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/^application\/json/);
    expect(response.headers['cache-control']).toBe('no-store');
    expect(payload).toEqual({ status: 'healthy', timestamp: expect.any(String) });
    expect(Number.isNaN(Date.parse(payload.timestamp))).toBe(false);
  });

  test('GET /metrics is explicitly unavailable and returns a JSON 404', async () => {
    const { response, body } = await get('/metrics');

    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toMatch(/^application\/json/);
    expect(response.headers['cache-control']).toBe('no-store');
    expect(JSON.parse(body)).toEqual({ error: 'not_found', path: '/metrics' });
  });
});

describe('production nginx API responses', () => {
  const expectedCounts = {
    'nginx.conf': 1,
    'nginx.conf.template': 1,
    'nginx-ssl.conf': 2
  };

  for (const [filename, expectedCount] of Object.entries(expectedCounts)) {
    test(`${filename} declares the documented health and metrics responses`, () => {
      const config = fs.readFileSync(path.join(appRoot, filename), 'utf8');
      const healthLocations = nginxLocations(config, 'health');
      const metricsLocations = nginxLocations(config, 'metrics');

      expect(healthLocations).toHaveLength(expectedCount);
      expect(metricsLocations).toHaveLength(expectedCount);

      for (const location of healthLocations) {
        expect(location).toMatch(/default_type application\/json;/);
        expect(location).toMatch(/add_header Cache-Control "no-store" always;/);
        const result = nginxReturn(location);
        expect(result.status).toBe(200);
        expect(JSON.parse(result.body.replace('$time_iso8601', '2026-10-11T12:00:00+00:00')))
          .toEqual({ status: 'healthy', timestamp: '2026-10-11T12:00:00+00:00' });
      }

      for (const location of metricsLocations) {
        expect(location).toMatch(/default_type application\/json;/);
        expect(location).toMatch(/add_header Cache-Control "no-store" always;/);
        const result = nginxReturn(location);
        expect(result.status).toBe(404);
        expect(JSON.parse(result.body)).toEqual({ error: 'not_found', path: '/metrics' });
      }
    });
  }
});
