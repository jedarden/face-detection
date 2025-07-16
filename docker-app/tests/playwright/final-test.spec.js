const { test, expect } = require('@playwright/test');

test.describe('Face Detection App - Final Test', () => {
  test.beforeEach(async ({ page }) => {
    // Listen for console messages
    page.on('console', msg => {
      console.log(`🔍 Console ${msg.type()}: ${msg.text()}`);
    });
    
    // Listen for page errors
    page.on('pageerror', error => {
      console.error(`❌ Page Error: ${error.message}`);
    });
  });

  test('should load and initialize the app successfully', async ({ page }) => {
    console.log('🚀 Testing app initialization...');
    
    // Navigate to the app
    await page.goto('/');
    
    // Check initial loading state
    await expect(page.locator('.loading')).toBeVisible();
    await expect(page.locator('.loading h2')).toContainText('Loading Face Detection App');
    
    // Wait for face-api.js to load
    await page.waitForFunction(() => typeof window.faceapi !== 'undefined', {
      timeout: 30000
    });
    
    console.log('✅ face-api.js loaded successfully');
    
    // Wait for app to initialize (loading screen should disappear)
    await page.waitForFunction(() => {
      const loadingElement = document.querySelector('.loading');
      return !loadingElement || loadingElement.style.display === 'none' || !loadingElement.offsetParent;
    }, {
      timeout: 30000
    });
    
    console.log('✅ App initialized, loading screen removed');
    
    // Check if main UI elements are present
    await expect(page.locator('h1')).toContainText('Face Detection App');
    await expect(page.locator('#video')).toBeVisible();
    await expect(page.locator('#overlay')).toBeVisible();
    await expect(page.locator('#startBtn')).toBeVisible();
    await expect(page.locator('#stopBtn')).toBeVisible();
    
    console.log('✅ Main UI elements are present');
    
    // Check mode selector
    await expect(page.locator('input[name="mode"][value="lite"]')).toBeVisible();
    await expect(page.locator('input[name="mode"][value="pro"]')).toBeVisible();
    
    console.log('✅ Mode selector is present');
    
    // Check if models are accessible
    const modelsTest = await page.evaluate(async () => {
      try {
        const response = await fetch('/models/manifest.json');
        const manifest = await response.json();
        return {
          success: true,
          modelCount: manifest.models.length,
          totalSize: manifest.totalSize
        };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });
    
    expect(modelsTest.success).toBe(true);
    expect(modelsTest.modelCount).toBe(13);
    console.log(`✅ Models accessible: ${modelsTest.modelCount} files, ${(modelsTest.totalSize / 1024 / 1024).toFixed(2)} MB`);
    
    // Take a screenshot for verification
    await page.screenshot({ path: 'app-loaded-successfully.png', fullPage: true });
    console.log('📸 Screenshot saved: app-loaded-successfully.png');
  });

  test('should handle camera permissions gracefully', async ({ page }) => {
    console.log('📹 Testing camera permissions...');
    
    await page.goto('/');
    
    // Wait for app to load
    await page.waitForFunction(() => typeof window.faceapi !== 'undefined', {
      timeout: 30000
    });
    
    await page.waitForSelector('#startBtn');
    
    // Mock camera permissions denial
    await page.context().grantPermissions([]);
    
    // Try to click start button
    await page.click('#startBtn');
    
    // Wait a bit to see if any error handling occurs
    await page.waitForTimeout(2000);
    
    // Check if the button is still clickable (app should handle the error)
    const startBtnDisabled = await page.locator('#startBtn').isDisabled();
    console.log(`🔴 Start button disabled after camera denial: ${startBtnDisabled}`);
    
    // App should still be functional
    await expect(page.locator('h1')).toContainText('Face Detection App');
    console.log('✅ App remains functional after camera permission denial');
  });

  test('should switch between modes correctly', async ({ page }) => {
    console.log('🔄 Testing mode switching...');
    
    await page.goto('/');
    
    // Wait for app to load
    await page.waitForFunction(() => typeof window.faceapi !== 'undefined', {
      timeout: 30000
    });
    
    await page.waitForSelector('#startBtn');
    
    // Test mode switching
    await page.click('input[name="mode"][value="pro"]');
    
    // Check if mode changed
    const proModeChecked = await page.locator('input[name="mode"][value="pro"]').isChecked();
    expect(proModeChecked).toBe(true);
    console.log('✅ Pro mode selected');
    
    // Switch back to lite mode
    await page.click('input[name="mode"][value="lite"]');
    
    const liteModeChecked = await page.locator('input[name="mode"][value="lite"]').isChecked();
    expect(liteModeChecked).toBe(true);
    console.log('✅ Lite mode selected');
  });

  test('should have working threshold control', async ({ page }) => {
    console.log('🎚️ Testing threshold control...');
    
    await page.goto('/');
    
    // Wait for app to load
    await page.waitForFunction(() => typeof window.faceapi !== 'undefined', {
      timeout: 30000
    });
    
    await page.waitForSelector('#threshold');
    
    // Test threshold slider
    await page.locator('#threshold').fill('0.7');
    
    const thresholdValue = await page.locator('#thresholdValue').textContent();
    expect(thresholdValue).toBe('0.7');
    console.log('✅ Threshold control working');
  });
});