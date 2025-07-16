#!/usr/bin/env node
/**
 * Debug script to check what's happening with the loading screen
 */

const puppeteer = require('puppeteer');

async function debugLoading() {
  console.log('🔍 Debugging loading screen issue...');
  
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    
    const page = await browser.newPage();
    
    // Listen for all console messages
    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      const prefix = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '📝';
      console.log(`${prefix} Console ${type}: ${text}`);
    });
    
    // Listen for page errors
    page.on('pageerror', error => {
      console.error(`💥 Page Error: ${error.message}`);
    });
    
    // Listen for request failures
    page.on('requestfailed', request => {
      console.error(`🌐 Request Failed: ${request.url()} - ${request.failure()?.errorText}`);
    });
    
    // Navigate to the app
    console.log('🌐 Navigating to http://localhost:8080...');
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });
    
    // Wait a bit for JavaScript to execute
    await page.waitForTimeout(5000);
    
    // Check current page state
    const pageContent = await page.content();
    console.log('\n📄 Current page state:');
    console.log('Loading screen present:', pageContent.includes('Loading Face Detection App'));
    console.log('Main UI present:', pageContent.includes('Face Detection App') && !pageContent.includes('Loading Face Detection App'));
    
    // Check if scripts loaded
    const scriptsLoaded = await page.evaluate(() => {
      return {
        faceapiLoaded: typeof window.faceapi !== 'undefined',
        domContentLoaded: document.readyState === 'complete',
        appElementExists: !!document.getElementById('app'),
        loadingExists: !!document.querySelector('.loading')
      };
    });
    
    console.log('\n🔧 Script loading status:');
    console.log('face-api.js loaded:', scriptsLoaded.faceapiLoaded);
    console.log('DOM ready:', scriptsLoaded.domContentLoaded);
    console.log('App element exists:', scriptsLoaded.appElementExists);
    console.log('Loading screen exists:', scriptsLoaded.loadingExists);
    
    // Check if our app initialization happened
    const appState = await page.evaluate(() => {
      const appElement = document.getElementById('app');
      if (appElement) {
        return {
          innerHTML: appElement.innerHTML,
          hasVideoElement: !!document.getElementById('video'),
          hasStartButton: !!document.getElementById('startBtn'),
          hasDiagnosticsButton: !!document.getElementById('diagnosticsBtn')
        };
      }
      return null;
    });
    
    console.log('\n📱 App state:');
    if (appState) {
      console.log('Video element present:', appState.hasVideoElement);
      console.log('Start button present:', appState.hasStartButton);
      console.log('Diagnostics button present:', appState.hasDiagnosticsButton);
      
      if (!appState.hasVideoElement) {
        console.log('🔍 App innerHTML preview:');
        console.log(appState.innerHTML.substring(0, 500) + '...');
      }
    } else {
      console.log('❌ App element not found');
    }
    
    // Check network requests
    const resourcesLoaded = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      const links = Array.from(document.querySelectorAll('link[href]'));
      
      return {
        scripts: scripts.map(s => s.src),
        stylesheets: links.map(l => l.href),
        performanceEntries: performance.getEntriesByType('resource').map(e => ({
          name: e.name,
          duration: e.duration,
          status: e.transferSize > 0 ? 'loaded' : 'cached'
        }))
      };
    });
    
    console.log('\n🌐 Network resources:');
    console.log('Scripts:', resourcesLoaded.scripts);
    console.log('Stylesheets:', resourcesLoaded.stylesheets);
    
    // Take a screenshot
    await page.screenshot({ path: 'debug-loading-screen.png', fullPage: true });
    console.log('\n📸 Screenshot saved: debug-loading-screen.png');
    
    return appState && appState.hasVideoElement;
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
    return false;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the debug
debugLoading().then(success => {
  console.log(success ? '\n✅ App appears to be working' : '\n❌ App is not initializing properly');
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Debug runner error:', error);
  process.exit(1);
});