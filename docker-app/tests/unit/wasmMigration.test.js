/**
 * WASM Migration Test Suite
 * Test-driven development for WASM implementation with feature parity verification
 */

import { jest } from '@jest/globals';

// Mock TensorFlow.js and backends
jest.mock('@tensorflow/tfjs', () => ({
  setBackend: jest.fn(),
  ready: jest.fn().mockResolvedValue(true),
  getBackend: jest.fn(),
  backend: jest.fn(),
  env: jest.fn(() => ({
    features: {
      'WEBGL_PACK': true,
      'WASM_HAS_SIMD_SUPPORT': true,
      'WASM_HAS_MULTITHREAD_SUPPORT': true
    }
  }))
}));

jest.mock('@tensorflow/tfjs-backend-wasm', () => ({
  setWasmPaths: jest.fn(),
  setThreadsCount: jest.fn()
}));

jest.mock('@vladmandic/face-api', () => ({
  ...jest.requireActual('face-api.js'),
  env: {
    monkeyPatch: jest.fn()
  },
  nets: {
    tinyFaceDetector: {
      loadFromUri: jest.fn().mockResolvedValue(true)
    },
    ssdMobilenetv1: {
      loadFromUri: jest.fn().mockResolvedValue(true)
    },
    faceLandmark68Net: {
      loadFromUri: jest.fn().mockResolvedValue(true)
    },
    faceExpressionNet: {
      loadFromUri: jest.fn().mockResolvedValue(true)
    },
    ageGenderNet: {
      loadFromUri: jest.fn().mockResolvedValue(true)
    },
    faceRecognitionNet: {
      loadFromUri: jest.fn().mockResolvedValue(true)
    }
  },
  detectAllFaces: jest.fn(),
  TinyFaceDetectorOptions: jest.fn(),
  SsdMobilenetv1Options: jest.fn()
}));

describe('WASM Migration Tests', () => {
  describe('Feature Parity Tests', () => {
    test('should maintain same API surface as original face-api.js', async () => {
      const { FaceDetectionApp } = await import('../../src/index.js');
      const app = new FaceDetectionApp();
      
      // Verify all original methods exist
      expect(typeof app.init).toBe('function');
      expect(typeof app.loadModels).toBe('function');
      expect(typeof app.setupUI).toBe('function');
      expect(typeof app.setupCamera).toBe('function');
      expect(typeof app.startDetection).toBe('function');
      expect(typeof app.stopDetection).toBe('function');
      expect(typeof app.detectFaces).toBe('function');
      expect(typeof app.detectFacesPro).toBe('function');
    });

    test('should load same models as original implementation', async () => {
      const { FaceDetectionApp } = await import('../../src/index.js');
      const faceapi = await import('@vladmandic/face-api');
      
      const app = new FaceDetectionApp();
      await app.loadModels();
      
      // Verify all original models are loaded
      expect(faceapi.nets.tinyFaceDetector.loadFromUri).toHaveBeenCalled();
      expect(faceapi.nets.ssdMobilenetv1.loadFromUri).toHaveBeenCalled();
      expect(faceapi.nets.faceLandmark68Net.loadFromUri).toHaveBeenCalled();
      expect(faceapi.nets.faceExpressionNet.loadFromUri).toHaveBeenCalled();
      expect(faceapi.nets.ageGenderNet.loadFromUri).toHaveBeenCalled();
    });

    test('should return same detection result structure', async () => {
      const mockDetection = {
        detection: {
          box: { x: 100, y: 100, width: 200, height: 200 },
          score: 0.95
        },
        landmarks: { positions: [] },
        expressions: { happy: 0.9, sad: 0.1 },
        age: 25,
        gender: 'male',
        genderProbability: 0.95
      };

      const { FaceDetectionApp } = await import('../../src/index.js');
      const faceapi = await import('@vladmandic/face-api');
      
      faceapi.detectAllFaces.mockReturnValue({
        withFaceLandmarks: jest.fn().mockReturnThis(),
        withFaceExpressions: jest.fn().mockReturnThis(),
        withAgeAndGender: jest.fn().mockResolvedValue([mockDetection])
      });

      const app = new FaceDetectionApp();
      app.isModelLoaded = true;
      app.isVideoReady = true;
      app.video = document.createElement('video');
      app.canvas = document.createElement('canvas');
      
      // Verify detection structure matches original
      await app.detectFaces();
      
      expect(faceapi.detectAllFaces).toHaveBeenCalledWith(
        app.video,
        expect.any(Object)
      );
    });
  });

  describe('WASM Backend Tests', () => {
    test('should initialize WASM backend', async () => {
      const tf = await import('@tensorflow/tfjs');
      const { initializeWASMBackend } = await import('../../src/wasmBackend.js');
      
      await initializeWASMBackend();
      
      expect(tf.setBackend).toHaveBeenCalledWith('wasm');
      expect(tf.ready).toHaveBeenCalled();
    });

    test('should detect SIMD support', async () => {
      const { detectWASMFeatures } = await import('../../src/wasmBackend.js');
      
      const features = await detectWASMFeatures();
      
      expect(features).toHaveProperty('simdSupport');
      expect(features).toHaveProperty('threadsSupport');
      expect(features).toHaveProperty('backendName');
    });

    test('should configure optimal thread count', async () => {
      const wasmBackend = await import('@tensorflow/tfjs-backend-wasm');
      const { configureWASMThreads } = await import('../../src/wasmBackend.js');
      
      await configureWASMThreads();
      
      expect(wasmBackend.setThreadsCount).toHaveBeenCalled();
    });

    test('should fallback gracefully if WASM unavailable', async () => {
      const tf = await import('@tensorflow/tfjs');
      tf.setBackend.mockRejectedValueOnce(new Error('WASM not supported'));
      
      const { initializeWASMBackend } = await import('../../src/wasmBackend.js');
      const result = await initializeWASMBackend();
      
      expect(result.backend).toBe('webgl');
      expect(result.fallback).toBe(true);
    });
  });

  describe('Performance Comparison Tests', () => {
    test('should measure inference time for both backends', async () => {
      const { performanceComparison } = await import('../../src/wasmBenchmark.js');
      
      const results = await performanceComparison();
      
      expect(results).toHaveProperty('webgl');
      expect(results).toHaveProperty('wasm');
      expect(results.webgl).toHaveProperty('avgInferenceTime');
      expect(results.wasm).toHaveProperty('avgInferenceTime');
    });

    test('should track memory usage', async () => {
      const { measureMemoryUsage } = await import('../../src/wasmBenchmark.js');
      
      const memoryStats = await measureMemoryUsage();
      
      expect(memoryStats).toHaveProperty('beforeInference');
      expect(memoryStats).toHaveProperty('afterInference');
      expect(memoryStats).toHaveProperty('peakUsage');
    });
  });

  describe('Model Compatibility Tests', () => {
    test('should work with all face-api.js model types', async () => {
      const { testModelCompatibility } = await import('../../src/wasmCompatibility.js');
      
      const compatibility = await testModelCompatibility();
      
      expect(compatibility.tinyFaceDetector).toBe(true);
      expect(compatibility.ssdMobilenetv1).toBe(true);
      expect(compatibility.faceLandmark68Net).toBe(true);
      expect(compatibility.faceExpressionNet).toBe(true);
      expect(compatibility.ageGenderNet).toBe(true);
    });

    test('should maintain detection accuracy', async () => {
      const { compareDetectionAccuracy } = await import('../../src/wasmCompatibility.js');
      
      const accuracy = await compareDetectionAccuracy();
      
      // Accuracy should be within 5% of original
      expect(accuracy.difference).toBeLessThan(0.05);
    });
  });

  describe('Migration Path Tests', () => {
    test('should seamlessly switch from face-api.js to @vladmandic/face-api', async () => {
      // Test that import paths can be updated without breaking functionality
      const originalAPI = jest.requireActual('face-api.js');
      const newAPI = await import('@vladmandic/face-api');
      
      // Verify API compatibility
      expect(typeof newAPI.detectAllFaces).toBe('function');
      expect(typeof newAPI.nets).toBe('object');
      expect(typeof newAPI.TinyFaceDetectorOptions).toBe('function');
    });

    test('should preserve all detection options', async () => {
      const { FaceDetectionApp } = await import('../../src/index.js');
      const app = new FaceDetectionApp();
      
      // Test lite mode options
      const liteOptions = app.getLiteModeOptions();
      expect(liteOptions).toHaveProperty('inputSize');
      expect(liteOptions).toHaveProperty('scoreThreshold');
      
      // Test pro mode options
      const proOptions = app.getProModeOptions();
      expect(proOptions).toHaveProperty('minConfidence');
      expect(proOptions).toHaveProperty('maxResults');
    });
  });

  describe('Browser Compatibility Tests', () => {
    test('should work in browsers without SIMD support', async () => {
      // Mock browser without SIMD
      global.WebAssembly = {
        validate: jest.fn().mockReturnValue(false)
      };
      
      const { initializeWASMBackend } = await import('../../src/wasmBackend.js');
      const result = await initializeWASMBackend();
      
      expect(result.simdEnabled).toBe(false);
      expect(result.backend).toBe('wasm');
    });

    test('should handle SharedArrayBuffer restrictions', async () => {
      // Mock browser without SharedArrayBuffer
      delete global.SharedArrayBuffer;
      
      const { configureWASMThreads } = await import('../../src/wasmBackend.js');
      const config = await configureWASMThreads();
      
      expect(config.threads).toBe(1);
      expect(config.multithreading).toBe(false);
    });
  });

  describe('Error Handling Tests', () => {
    test('should handle WASM loading errors gracefully', async () => {
      const { handleWASMError } = await import('../../src/wasmBackend.js');
      
      const error = new Error('WASM module failed to load');
      const result = await handleWASMError(error);
      
      expect(result.fallback).toBe('webgl');
      expect(result.error).toBeDefined();
    });

    test('should maintain functionality with backend fallback', async () => {
      const { FaceDetectionApp } = await import('../../src/index.js');
      const app = new FaceDetectionApp();
      
      // Force fallback to WebGL
      app.backendType = 'webgl';
      
      await app.init();
      expect(app.isModelLoaded).toBe(true);
    });
  });

  describe('Configuration Tests', () => {
    test('should allow backend selection via config', async () => {
      const { FaceDetectionApp } = await import('../../src/index.js');
      
      // Test WASM preference
      const appWASM = new FaceDetectionApp({ preferredBackend: 'wasm' });
      expect(appWASM.config.preferredBackend).toBe('wasm');
      
      // Test WebGL preference
      const appWebGL = new FaceDetectionApp({ preferredBackend: 'webgl' });
      expect(appWebGL.config.preferredBackend).toBe('webgl');
    });

    test('should expose backend information to UI', async () => {
      const { FaceDetectionApp } = await import('../../src/index.js');
      const app = new FaceDetectionApp();
      
      const backendInfo = app.getBackendInfo();
      expect(backendInfo).toHaveProperty('name');
      expect(backendInfo).toHaveProperty('features');
      expect(backendInfo).toHaveProperty('performance');
    });
  });
});

describe('Integration Tests with WASM', () => {
  test('should complete full detection workflow with WASM backend', async () => {
    const { FaceDetectionApp } = await import('../../src/index.js');
    const app = new FaceDetectionApp({ preferredBackend: 'wasm' });
    
    // Mock DOM and media devices
    document.body.innerHTML = '<div id="app"></div>';
    global.navigator.mediaDevices = {
      getUserMedia: jest.fn().mockResolvedValue({
        getTracks: () => [{ stop: jest.fn() }]
      })
    };
    
    await app.init();
    
    expect(app.isModelLoaded).toBe(true);
    expect(app.backendType).toBe('wasm');
  });

  test('should maintain real-time performance', async () => {
    const { measureFPS } = await import('../../src/wasmBenchmark.js');
    
    const fps = await measureFPS('wasm');
    
    // Should maintain at least 15 FPS for pro mode
    expect(fps.average).toBeGreaterThanOrEqual(15);
  });
});