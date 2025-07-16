const { test, expect } = require('@playwright/test');

test.describe('Face Detection App Loading Diagnosis', () => {
  test.beforeEach(async ({ page }) => {
    // Listen for console messages
    page.on('console', msg => {
      console.log(`🔍 Console ${msg.type()}: ${msg.text()}`);
    });
    
    // Listen for page errors
    page.on('pageerror', error => {
      console.error(`❌ Page Error: ${error.message}`);
    });
    
    // Listen for network failures
    page.on('requestfailed', request => {
      console.error(`🌐 Request Failed: ${request.url()} - ${request.failure()?.errorText}`);
    });
  });

  test('should diagnose loading issues', async ({ page }) => {
    console.log('🚀 Starting loading diagnosis...');
    
    // Navigate to the app
    await page.goto('/');
    
    // Check initial page state
    const title = await page.title();
    console.log(`📄 Page Title: ${title}`);
    
    // Check if loading message is present
    const loadingMessage = await page.locator('.loading').isVisible();
    console.log(`⏳ Loading message visible: ${loadingMessage}`);
    
    // Check if main app content is present
    const appContent = await page.locator('#app').innerHTML();
    console.log(`📱 App content length: ${appContent.length} characters`);
    
    // Check if script tags are present
    const scriptTags = await page.locator('script').count();
    console.log(`📜 Script tags count: ${scriptTags}`);
    
    // Check network requests
    const requests = [];
    page.on('request', request => {
      requests.push(request.url());
    });
    
    // Wait for potential JavaScript execution
    await page.waitForTimeout(5000);
    
    console.log('🌐 Network requests made:');
    requests.forEach(url => console.log(`  - ${url}`));
    
    // Check if face-api.js is loaded
    const faceApiLoaded = await page.evaluate(() => {
      return typeof window.faceapi !== 'undefined';
    });
    console.log(`🤖 face-api.js loaded: ${faceApiLoaded}`);
    
    // Check if FaceDetectionApp is defined
    const appClassDefined = await page.evaluate(() => {
      return typeof window.FaceDetectionApp !== 'undefined';
    });
    console.log(`🎯 FaceDetectionApp defined: ${appClassDefined}`);
    
    // Check if any JavaScript errors occurred
    const hasJSErrors = await page.evaluate(() => {
      return window.jsErrors && window.jsErrors.length > 0;
    });
    console.log(`💥 JavaScript errors: ${hasJSErrors}`);
    
    // Try to manually trigger app initialization
    const manualInit = await page.evaluate(() => {
      try {
        if (typeof window.FaceDetectionApp !== 'undefined') {
          const app = new window.FaceDetectionApp();
          return 'FaceDetectionApp instantiated successfully';
        }
        return 'FaceDetectionApp not available';
      } catch (error) {
        return `Error instantiating: ${error.message}`;
      }
    });
    console.log(`🔧 Manual initialization: ${manualInit}`);
    
    // Check for bundle.js or main.js
    const bundleLoaded = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      return scripts.map(script => script.src);
    });
    console.log('📦 Script sources:', bundleLoaded);
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'debug-loading-issue.png', fullPage: true });
    console.log('📸 Screenshot saved as debug-loading-issue.png');
  });

  test('should check model loading specifically', async ({ page }) => {
    console.log('🧠 Testing model loading...');
    
    await page.goto('/');
    
    // Wait for potential script loading
    await page.waitForTimeout(3000);
    
    // Check if models endpoint is accessible
    const modelsAccessible = await page.evaluate(async () => {
      try {
        const response = await fetch('/models/manifest.json');
        return {
          ok: response.ok,
          status: response.status,
          contentType: response.headers.get('content-type')
        };
      } catch (error) {
        return { error: error.message };
      }
    });
    console.log('📦 Models endpoint test:', modelsAccessible);
    
    // Check specific model files
    const modelFiles = [
      'tiny_face_detector_model-weights_manifest.json',
      'ssd_mobilenetv1_model-weights_manifest.json',
      'face_landmark_68_model-weights_manifest.json'
    ];
    
    for (const modelFile of modelFiles) {
      const modelTest = await page.evaluate(async (file) => {
        try {
          const response = await fetch(`/models/${file}`);
          return {
            file,
            ok: response.ok,
            status: response.status,
            size: response.headers.get('content-length')
          };
        } catch (error) {
          return { file, error: error.message };
        }
      }, modelFile);
      console.log(`🎯 Model ${modelFile}:`, modelTest);
    }
  });

  test('should test manual app initialization', async ({ page }) => {
    console.log('🎮 Testing manual app initialization...');
    
    await page.goto('/');
    
    // Wait for scripts to load
    await page.waitForTimeout(5000);
    
    // Try to manually run the app initialization
    const initResult = await page.evaluate(async () => {
      const results = [];
      
      // Check if face-api is available
      if (typeof faceapi === 'undefined') {
        results.push('❌ face-api.js not loaded');
        return results;
      }
      results.push('✅ face-api.js is available');
      
      // Check if FaceDetectionApp is available
      if (typeof FaceDetectionApp === 'undefined') {
        results.push('❌ FaceDetectionApp not loaded');
        return results;
      }
      results.push('✅ FaceDetectionApp is available');
      
      // Try to create an instance
      try {
        const app = new FaceDetectionApp();
        results.push('✅ FaceDetectionApp instance created');
        
        // Try to load models
        try {
          await app.loadModels();
          results.push('✅ Models loaded successfully');
        } catch (error) {
          results.push(`❌ Model loading failed: ${error.message}`);
        }
        
      } catch (error) {
        results.push(`❌ Failed to create app instance: ${error.message}`);
      }
      
      return results;
    });
    
    console.log('🎯 Manual initialization results:');
    initResult.forEach(result => console.log(`  ${result}`));
  });
});