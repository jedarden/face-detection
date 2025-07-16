describe('Face Detection App E2E', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  });

  test('should load the application', async () => {
    await expect(page.title()).resolves.toMatch('Face Detection App');
  });

  test('should display app container', async () => {
    const app = await page.$('#app');
    expect(app).toBeTruthy();
  });

  test('should request camera permissions', async () => {
    // Grant camera permissions for testing
    const context = browser.defaultBrowserContext();
    await context.overridePermissions('http://localhost:3000', ['camera']);
    
    // Reload page to trigger camera setup
    await page.reload({ waitUntil: 'networkidle2' });
    
    // Wait for video element
    await page.waitForSelector('#video', { timeout: 5000 });
    const video = await page.$('#video');
    expect(video).toBeTruthy();
  });

  test('should have start and stop buttons', async () => {
    await page.waitForSelector('.controls', { timeout: 5000 });
    
    const startBtn = await page.$('#startBtn');
    const stopBtn = await page.$('#stopBtn');
    
    expect(startBtn).toBeTruthy();
    expect(stopBtn).toBeTruthy();
    
    // Check initial states
    const startBtnDisabled = await page.$eval('#startBtn', btn => btn.disabled);
    const stopBtnDisabled = await page.$eval('#stopBtn', btn => btn.disabled);
    
    expect(startBtnDisabled).toBe(false);
    expect(stopBtnDisabled).toBe(true);
  });
});