#!/usr/bin/env node
/**
 * Manual test script to verify the face detection application
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

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

async function testApp() {
  console.log('🧪 Testing Face Detection App Manually...');
  console.log('==========================================');
  
  // Test main endpoints
  const tests = [
    { path: '/health', description: 'Health check endpoint' },
    { path: '/', description: 'Main application page' },
    { path: '/models/manifest.json', description: 'Models manifest' },
    { path: '/models/tiny_face_detector_model-weights_manifest.json', description: 'Tiny face detector model' },
    { path: '/models/ssd_mobilenetv1_model-weights_manifest.json', description: 'SSD MobileNet model' },
    { path: '/models/face_landmark_68_model-weights_manifest.json', description: 'Face landmarks model' },
    { path: '/models/face_expression_model-weights_manifest.json', description: 'Face expression model' },
    { path: '/models/age_gender_model-weights_manifest.json', description: 'Age/gender model' }
  ];
  
  let passedTests = 0;
  let totalTests = tests.length;
  
  for (const test of tests) {
    try {
      const result = await testEndpoint(test.path, test.description);
      if (result.success) {
        passedTests++;
        
        // Additional checks for specific endpoints
        if (test.path === '/') {
          const hasTitle = result.data.includes('<title>Face Detection App</title>');
          const hasLoadingMessage = result.data.includes('Loading Face Detection App');
          console.log(`  📄 Contains title: ${hasTitle ? '✅' : '❌'}`);
          console.log(`  ⏳ Has loading message: ${hasLoadingMessage ? '✅' : '❌'}`);
        }
        
        if (test.path === '/models/manifest.json') {
          try {
            const manifest = JSON.parse(result.data);
            console.log(`  📦 Models count: ${manifest.models.length}`);
            console.log(`  💾 Total size: ${(manifest.totalSize / 1024 / 1024).toFixed(2)} MB`);
          } catch (e) {
            console.log(`  ❌ Invalid JSON in manifest`);
          }
        }
      }
    } catch (error) {
      console.log(`❌ ${test.description}: ${error.message}`);
    }
  }
  
  console.log('\n📊 Test Summary:');
  console.log(`Passed: ${passedTests}/${totalTests} tests`);
  console.log(`Success rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 All tests passed! The application is ready to use.');
    console.log('\n🚀 To use the application:');
    console.log('1. Open your browser to http://localhost:8080');
    console.log('2. Grant camera permissions when prompted');
    console.log('3. Click "Start Detection" to begin face detection');
    console.log('4. Switch between Lite and Pro modes as needed');
    console.log('5. Select different cameras if multiple are available');
    
    return true;
  } else {
    console.log('\n❌ Some tests failed. Please check the application.');
    return false;
  }
}

// Run the test
testApp().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Test runner error:', error);
  process.exit(1);
});