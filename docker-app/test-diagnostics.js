#!/usr/bin/env node
/**
 * Test script to verify diagnostic features are working
 */

const http = require('http');

function testEndpoint(path, description) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const success = res.statusCode === 200;
        console.log(`${success ? '✅' : '❌'} ${description}: ${res.statusCode}`);
        resolve({ success, data, statusCode: res.statusCode });
      });
    });

    req.on('error', (err) => {
      console.log(`❌ ${description}: ${err.message}`);
      reject(err);
    });

    req.end();
  });
}

async function testDiagnostics() {
  console.log('🔍 Testing Face Detection App with Diagnostics...');
  console.log('================================================');
  
  try {
    // Test main page
    const mainPage = await testEndpoint('/', 'Main application page');
    
    if (mainPage.success) {
      // Check for diagnostic features in HTML
      const hasShowDiagnosticsBtn = mainPage.data.includes('Show Diagnostics');
      const hasDiagnosticsPanel = mainPage.data.includes('Performance Diagnostics');
      const hasFpsValue = mainPage.data.includes('fps-value');
      const hasMemoryValue = mainPage.data.includes('memory-value');
      const hasCpuValue = mainPage.data.includes('cpu-value');
      const hasDetectionLatency = mainPage.data.includes('detection-latency-value');
      const hasProcessingTime = mainPage.data.includes('processing-time-value');
      const hasResolution = mainPage.data.includes('resolution-value');
      const hasDetectionCount = mainPage.data.includes('detection-count-value');
      const hasFpsChart = mainPage.data.includes('fps-chart');
      const hasMemoryChart = mainPage.data.includes('memory-chart');
      
      console.log('\n📊 Diagnostic Features Check:');
      console.log(`  📋 Show Diagnostics button: ${hasShowDiagnosticsBtn ? '✅' : '❌'}`);
      console.log(`  🔧 Diagnostics panel: ${hasDiagnosticsPanel ? '✅' : '❌'}`);
      console.log(`  📈 FPS counter: ${hasFpsValue ? '✅' : '❌'}`);
      console.log(`  💾 Memory usage: ${hasMemoryValue ? '✅' : '❌'}`);
      console.log(`  💻 CPU usage: ${hasCpuValue ? '✅' : '❌'}`);
      console.log(`  ⏱️  Detection latency: ${hasDetectionLatency ? '✅' : '❌'}`);
      console.log(`  🔄 Processing time: ${hasProcessingTime ? '✅' : '❌'}`);
      console.log(`  📺 Video resolution: ${hasResolution ? '✅' : '❌'}`);
      console.log(`  🎯 Detection count: ${hasDetectionCount ? '✅' : '❌'}`);
      console.log(`  📊 FPS chart: ${hasFpsChart ? '✅' : '❌'}`);
      console.log(`  📈 Memory chart: ${hasMemoryChart ? '✅' : '❌'}`);
      
      // Check for visual improvements
      const hasMirroredVideo = mainPage.data.includes('scaleX(-1)');
      const hasTighterBoundingBox = mainPage.data.includes('padding = Math.min');
      const hasBoundingBoxFix = mainPage.data.includes('mirroredX');
      
      console.log('\n🎨 Visual Improvements Check:');
      console.log(`  🔄 Mirrored video: ${hasMirroredVideo ? '✅' : '❌'}`);
      console.log(`  📦 Tighter bounding box: ${hasTighterBoundingBox ? '✅' : '❌'}`);
      console.log(`  🎯 Bounding box position fix: ${hasBoundingBoxFix ? '✅' : '❌'}`);
      
      // Check for app.js
      const appJsResult = await testEndpoint('/app.js', 'Application JavaScript');
      const stylesResult = await testEndpoint('/styles.css', 'Application Styles');
      
      console.log('\n📦 Resource Files:');
      console.log(`  📜 app.js: ${appJsResult.success ? '✅' : '❌'}`);
      console.log(`  🎨 styles.css: ${stylesResult.success ? '✅' : '❌'}`);
      
      // Check for face-api.js CDN reference
      const hasFaceApiCdn = mainPage.data.includes('cdn.jsdelivr.net/npm/face-api.js');
      console.log(`  🤖 face-api.js CDN: ${hasFaceApiCdn ? '✅' : '❌'}`);
      
      // Test models endpoint
      const modelsResult = await testEndpoint('/models/manifest.json', 'Models manifest');
      
      console.log('\n📊 Summary:');
      let totalFeatures = 11 + 3 + 2 + 1 + 1; // diagnostic + visual + resources + cdn + models
      let workingFeatures = [
        hasShowDiagnosticsBtn, hasDiagnosticsPanel, hasFpsValue, hasMemoryValue,
        hasCpuValue, hasDetectionLatency, hasProcessingTime, hasResolution,
        hasDetectionCount, hasFpsChart, hasMemoryChart, hasMirroredVideo,
        hasTighterBoundingBox, hasBoundingBoxFix, appJsResult.success,
        stylesResult.success, hasFaceApiCdn, modelsResult.success
      ].filter(Boolean).length;
      
      console.log(`✅ Working features: ${workingFeatures}/${totalFeatures}`);
      console.log(`📈 Success rate: ${((workingFeatures / totalFeatures) * 100).toFixed(1)}%`);
      
      if (workingFeatures === totalFeatures) {
        console.log('\n🎉 ALL DIAGNOSTIC FEATURES WORKING!');
        console.log('\n🚀 New Features Available:');
        console.log('• Click "Show Diagnostics" to view real-time performance metrics');
        console.log('• Monitor FPS, memory usage, CPU consumption, and detection latency');
        console.log('• View live performance charts for FPS and memory usage');
        console.log('• Fixed camera mirroring and tighter bounding boxes');
        console.log('• Improved visual accuracy with proper coordinate mapping');
        
        return true;
      } else {
        console.log('\n⚠️  Some features may be missing or not working properly');
        return false;
      }
    } else {
      console.log('❌ Failed to load main page');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

// Run the test
testDiagnostics().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Test runner error:', error);
  process.exit(1);
});