#!/usr/bin/env node
/**
 * Test script to verify the face detection application loads properly
 */

const puppeteer = require('puppeteer');

async function testAppLoading() {
  console.log('🧪 Testing Face Detection App Loading...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Listen for console messages
    page.on('console', msg => {
      if (msg.type() === 'log') {
        console.log('📝 Browser Log:', msg.text());
      } else if (msg.type() === 'error') {
        console.error('❌ Browser Error:', msg.text());
      }
    });
    
    // Navigate to the app
    console.log('🌐 Navigating to http://localhost:8080...');
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });
    
    // Wait for the app to initialize
    console.log('⏳ Waiting for app initialization...');
    
    // Check if loading message appears
    const loadingMessage = await page.$eval('.loading h2', el => el.textContent).catch(() => null);
    console.log('📋 Loading message:', loadingMessage);
    
    // Wait for models to load (give it up to 30 seconds)
    await page.waitForFunction(() => {
      const logs = window.console;
      return document.body.innerHTML.includes('Face Detection App') && 
             !document.body.innerHTML.includes('Loading Face Detection App');
    }, { timeout: 30000 });
    
    // Check if the main UI loaded
    const hasVideoElement = await page.$('#video') !== null;
    const hasCanvasElement = await page.$('#overlay') !== null;
    const hasStartButton = await page.$('#startBtn') !== null;
    
    console.log('🎥 Video element present:', hasVideoElement);
    console.log('🎨 Canvas element present:', hasCanvasElement);
    console.log('▶️  Start button present:', hasStartButton);
    
    // Check if camera selector is present
    const hasCameraSelector = await page.$('#camera-selector') !== null;
    console.log('📹 Camera selector present:', hasCameraSelector);
    
    // Test if models endpoint is accessible
    const modelsResponse = await page.evaluate(async () => {
      const response = await fetch('/models/manifest.json');
      return response.ok;
    });
    console.log('📦 Models accessible:', modelsResponse);
    
    if (hasVideoElement && hasCanvasElement && hasStartButton && modelsResponse) {
      console.log('✅ App loaded successfully!');
      return true;
    } else {
      console.log('❌ App loading failed');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  } finally {
    await browser.close();
  }
}

// Run the test
testAppLoading().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Test runner error:', error);
  process.exit(1);
});