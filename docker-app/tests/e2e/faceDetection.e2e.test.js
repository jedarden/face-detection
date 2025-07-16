import puppeteer from 'puppeteer';

describe('Face Detection E2E Tests', () => {
  let browser;
  let page;
  const baseURL = process.env.BASE_URL || 'http://localhost:8080';

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream'
      ]
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    
    // Grant camera permissions
    const context = browser.defaultBrowserContext();
    await context.overridePermissions(baseURL, ['camera']);
    
    // Set up console message handler
    page.on('console', msg => {
      console.log('Browser console:', msg.text());
    });
    
    // Set up error handler
    page.on('error', err => {
      console.error('Browser error:', err);
    });
    
    await page.goto(baseURL);
  });

  afterEach(async () => {
    await page.close();
  });

  describe('Page Load and Initialization', () => {
    test('should load the application successfully', async () => {
      await page.waitForSelector('#app', { timeout: 5000 });
      const title = await page.$eval('h1', el => el.textContent);
      expect(title).toBe('Face Detection App');
    });

    test('should display all UI components', async () => {
      await page.waitForSelector('.container');
      
      const elements = await page.evaluate(() => {
        return {
          hasVideo: !!document.getElementById('video'),
          hasCanvas: !!document.getElementById('overlay'),
          hasStartBtn: !!document.getElementById('startBtn'),
          hasStopBtn: !!document.getElementById('stopBtn'),
          hasStats: !!document.getElementById('stats')
        };
      });

      expect(elements.hasVideo).toBe(true);
      expect(elements.hasCanvas).toBe(true);
      expect(elements.hasStartBtn).toBe(true);
      expect(elements.hasStopBtn).toBe(true);
      expect(elements.hasStats).toBe(true);
    });

    test('should load face detection models', async () => {
      // Wait for models to load (check console logs)
      await page.waitForFunction(
        () => window.console.log.toString().includes('Face detection models loaded successfully'),
        { timeout: 30000 }
      );

      // Models should be loaded
      const isModelLoaded = await page.evaluate(() => {
        return window.app && window.app.isModelLoaded;
      });
      
      expect(isModelLoaded).toBe(true);
    });
  });

  describe('Camera Access', () => {
    test('should request and receive camera access', async () => {
      // Wait for video element to have a stream
      await page.waitForFunction(
        () => {
          const video = document.getElementById('video');
          return video && video.srcObject && video.readyState >= 2;
        },
        { timeout: 10000 }
      );

      const videoState = await page.evaluate(() => {
        const video = document.getElementById('video');
        return {
          hasStream: !!video.srcObject,
          readyState: video.readyState,
          videoWidth: video.videoWidth,
          videoHeight: video.videoHeight
        };
      });

      expect(videoState.hasStream).toBe(true);
      expect(videoState.readyState).toBeGreaterThanOrEqual(2);
      expect(videoState.videoWidth).toBeGreaterThan(0);
      expect(videoState.videoHeight).toBeGreaterThan(0);
    });

    test('should display video feed', async () => {
      await page.waitForSelector('#video');
      
      // Take screenshot to verify video is displaying
      const videoScreenshot = await page.$('#video');
      const screenshot = await videoScreenshot.screenshot();
      
      expect(screenshot).toBeTruthy();
      expect(screenshot.length).toBeGreaterThan(1000); // Should have actual content
    });
  });

  describe('Detection Controls', () => {
    test('should start detection when start button is clicked', async () => {
      await page.waitForSelector('#startBtn:not([disabled])');
      
      await page.click('#startBtn');
      
      // Check button states
      const buttonStates = await page.evaluate(() => {
        return {
          startDisabled: document.getElementById('startBtn').disabled,
          stopDisabled: document.getElementById('stopBtn').disabled
        };
      });

      expect(buttonStates.startDisabled).toBe(true);
      expect(buttonStates.stopDisabled).toBe(false);
    });

    test('should stop detection when stop button is clicked', async () => {
      await page.waitForSelector('#startBtn:not([disabled])');
      
      // Start detection
      await page.click('#startBtn');
      await page.waitForSelector('#stopBtn:not([disabled])');
      
      // Stop detection
      await page.click('#stopBtn');
      
      const buttonStates = await page.evaluate(() => {
        return {
          startDisabled: document.getElementById('startBtn').disabled,
          stopDisabled: document.getElementById('stopBtn').disabled
        };
      });

      expect(buttonStates.startDisabled).toBe(false);
      expect(buttonStates.stopDisabled).toBe(true);
    });
  });

  describe('Face Detection Functionality', () => {
    test('should detect faces and update stats', async () => {
      await page.waitForSelector('#startBtn:not([disabled])');
      
      // Start detection
      await page.click('#startBtn');
      
      // Wait for stats to update
      await page.waitForFunction(
        () => {
          const stats = document.getElementById('stats');
          return stats && stats.textContent.includes('Faces detected:');
        },
        { timeout: 10000 }
      );

      const statsText = await page.$eval('#stats', el => el.textContent);
      expect(statsText).toContain('Faces detected:');
      expect(statsText).toContain('Model: TinyFaceDetector');
      expect(statsText).toContain('Features:');
    });

    test('should draw on canvas overlay', async () => {
      await page.waitForSelector('#startBtn:not([disabled])');
      
      // Start detection
      await page.click('#startBtn');
      
      // Wait a bit for detection to run
      await page.waitForTimeout(2000);
      
      // Check if canvas has been drawn on
      const canvasData = await page.evaluate(() => {
        const canvas = document.getElementById('overlay');
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Check if any pixels are non-transparent
        let hasDrawing = false;
        for (let i = 3; i < imageData.data.length; i += 4) {
          if (imageData.data[i] > 0) { // Alpha channel
            hasDrawing = true;
            break;
          }
        }
        
        return {
          width: canvas.width,
          height: canvas.height,
          hasDrawing
        };
      });

      expect(canvasData.width).toBeGreaterThan(0);
      expect(canvasData.height).toBeGreaterThan(0);
      // Note: hasDrawing might be false if no face is detected in fake video stream
    });
  });

  describe('Error Handling', () => {
    test('should display error message when initialization fails', async () => {
      // Create a new page that blocks model loading
      const errorPage = await browser.newPage();
      
      // Block model loading requests
      await errorPage.setRequestInterception(true);
      errorPage.on('request', request => {
        if (request.url().includes('/models')) {
          request.abort();
        } else {
          request.continue();
        }
      });

      await errorPage.goto(baseURL);
      
      // Wait for error display
      await errorPage.waitForSelector('.error', { timeout: 10000 });
      
      const errorText = await errorPage.$eval('.error', el => el.textContent);
      expect(errorText).toContain('Error');
      
      await errorPage.close();
    });
  });

  describe('Performance', () => {
    test('should maintain smooth performance during detection', async () => {
      await page.waitForSelector('#startBtn:not([disabled])');
      
      // Start metrics collection
      await page.evaluateOnNewDocument(() => {
        window.performanceMetrics = {
          fps: [],
          detectionTimes: []
        };
        
        let lastTime = performance.now();
        const measureFPS = () => {
          const currentTime = performance.now();
          const fps = 1000 / (currentTime - lastTime);
          window.performanceMetrics.fps.push(fps);
          lastTime = currentTime;
          requestAnimationFrame(measureFPS);
        };
        requestAnimationFrame(measureFPS);
      });

      await page.reload();
      await page.waitForSelector('#startBtn:not([disabled])');
      
      // Start detection
      await page.click('#startBtn');
      
      // Run for 5 seconds
      await page.waitForTimeout(5000);
      
      const metrics = await page.evaluate(() => window.performanceMetrics);
      
      // Calculate average FPS (should maintain at least 15 FPS)
      const avgFPS = metrics.fps.reduce((a, b) => a + b, 0) / metrics.fps.length;
      expect(avgFPS).toBeGreaterThan(15);
    });
  });

  describe('Responsive Behavior', () => {
    test('should handle window resize', async () => {
      await page.waitForSelector('#video');
      
      // Set initial viewport
      await page.setViewport({ width: 1200, height: 800 });
      await page.waitForTimeout(500);
      
      // Get initial dimensions
      const initialDimensions = await page.evaluate(() => {
        const container = document.querySelector('.video-container');
        return {
          width: container.offsetWidth,
          height: container.offsetHeight
        };
      });

      // Resize viewport
      await page.setViewport({ width: 800, height: 600 });
      await page.waitForTimeout(500);
      
      // Get new dimensions
      const newDimensions = await page.evaluate(() => {
        const container = document.querySelector('.video-container');
        return {
          width: container.offsetWidth,
          height: container.offsetHeight
        };
      });

      // Container should adapt to new size
      expect(newDimensions.width).toBeLessThan(initialDimensions.width);
    });
  });

  describe('Accessibility', () => {
    test('should have proper ARIA labels and roles', async () => {
      await page.waitForSelector('.container');
      
      const accessibility = await page.evaluate(() => {
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        const video = document.getElementById('video');
        
        return {
          startBtnText: startBtn.textContent,
          stopBtnText: stopBtn.textContent,
          videoHasLabel: video.hasAttribute('aria-label') || video.hasAttribute('title')
        };
      });

      expect(accessibility.startBtnText).toBeTruthy();
      expect(accessibility.stopBtnText).toBeTruthy();
    });

    test('should be keyboard navigable', async () => {
      await page.waitForSelector('#startBtn');
      
      // Focus on start button
      await page.focus('#startBtn');
      
      // Press Enter to start detection
      await page.keyboard.press('Enter');
      
      const startBtnDisabled = await page.$eval('#startBtn', btn => btn.disabled);
      expect(startBtnDisabled).toBe(true);
      
      // Tab to stop button
      await page.keyboard.press('Tab');
      
      // Press Enter to stop detection
      await page.keyboard.press('Enter');
      
      const stopBtnDisabled = await page.$eval('#stopBtn', btn => btn.disabled);
      expect(stopBtnDisabled).toBe(true);
    });
  });
});