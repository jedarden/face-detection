// E2E test setup
jest.setTimeout(30000);

beforeAll(async () => {
  // Set up any global test configuration
  await page.setViewport({ width: 1280, height: 720 });
});

afterAll(async () => {
  // Clean up after all tests
});