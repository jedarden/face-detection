const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const app = require('../../server');

const root = path.resolve(__dirname, '../..');
const modelNames = [
  'tiny_face_detector',
  'ssd_mobilenetv1',
  'face_landmark_68',
  'face_expression',
  'age_gender'
];
let server;

function getModel(filename) {
  return new Promise((resolve, reject) => {
    http.get({
      hostname: '127.0.0.1', port: server.address().port, path: `/models/${filename}`
    }, (response) => {
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => resolve({ status: response.statusCode, body: Buffer.concat(chunks) }));
    }).on('error', reject);
  });
}

beforeAll(done => { server = app.listen(0, '127.0.0.1', done); });
afterAll(done => { server.close(done); });

test.each(modelNames)('%s manifest and every referenced shard are shipped and served at /models', async (name) => {
  const filename = `${name}_model-weights_manifest.json`;
  const sourcePath = path.join(root, 'public/models', filename);
  const manifest = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  const paths = [...new Set(manifest.flatMap(group => group.paths))];

  expect(paths.length).toBeGreaterThan(0);
  for (const asset of [filename, ...paths]) {
    expect(asset).toMatch(/^[a-z0-9_-]+(?:\.json)?$/);
    const source = fs.readFileSync(path.join(root, 'public/models', asset));
    const built = fs.readFileSync(path.join(root, 'dist/models', asset));
    const served = await getModel(asset);

    expect(source.length).toBeGreaterThan(0);
    expect(Buffer.compare(built, source)).toBe(0);
    expect(served.status).toBe(200);
    expect(Buffer.compare(served.body, source)).toBe(0);
  }
});
