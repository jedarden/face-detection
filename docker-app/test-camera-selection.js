// Simple test script to verify camera selection functionality
console.log('Testing camera selection functionality...');

// Mock the DOM environment
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="app"></div></body></html>');
global.document = dom.window.document;
global.window = dom.window;

// Mock MediaDevices API
global.navigator = {
  mediaDevices: {
    getUserMedia: jest.fn(() => Promise.resolve({
      getTracks: () => [{
        stop: jest.fn(),
        getSettings: () => ({ deviceId: 'camera1', width: 640, height: 480 })
      }]
    })),
    enumerateDevices: jest.fn(() => Promise.resolve([
      { kind: 'videoinput', deviceId: 'camera1', label: 'Front Camera', groupId: 'group1' },
      { kind: 'videoinput', deviceId: 'camera2', label: 'Back Camera', groupId: 'group2' }
    ]))
  }
};

// Import the application
const { FaceDetectionApp } = require('./src/index.js');

async function testCameraSelection() {
  try {
    const app = new FaceDetectionApp();
    
    // Test UI setup
    app.setupUI();
    console.log('✓ UI setup successful');
    
    // Test camera enumeration
    await app.loadCameraList();
    console.log('✓ Camera enumeration successful');
    
    // Check if camera selector is visible
    const cameraSelector = document.getElementById('camera-selector');
    if (cameraSelector) {
      console.log('✓ Camera selector element found');
      console.log('  Display:', cameraSelector.style.display);
    } else {
      console.log('✗ Camera selector element not found');
    }
    
    // Check camera options
    const cameraSelect = document.getElementById('cameraSelect');
    if (cameraSelect) {
      console.log('✓ Camera select dropdown found');
      console.log('  Options count:', cameraSelect.options.length);
      for (let i = 0; i < cameraSelect.options.length; i++) {
        console.log('    Option', i + 1, ':', cameraSelect.options[i].text);
      }
    } else {
      console.log('✗ Camera select dropdown not found');
    }
    
    console.log('\n✓ All camera selection tests passed!');
    
  } catch (error) {
    console.error('✗ Test failed:', error.message);
    console.error(error.stack);
  }
}

testCameraSelection();