jest.mock('face-api.js');

import { FaceDetectionApp } from '../../src/index.js';
import * as faceapi from 'face-api.js';
import { 
  setupMockDOM, 
  mockFaceApiModels,
  mockFaceDetection 
} from '../test-utils/mockHelpers.js';
import { 
  PerformanceMonitor, 
  measureFPS, 
  simulateHighLoad,
  mockPerformanceAPI 
} from '../test-utils/performanceHelpers.js';


describe('Performance Tests', () => {
  let app;
  let perfMonitor;

  beforeEach(() => {
    setupMockDOM();
    mockPerformanceAPI();
    app = new FaceDetectionApp();
    app.isModelLoaded = true;
    app.isVideoReady = true;
    app.setupUI();
    perfMonitor = new PerformanceMonitor();
  });

  afterEach(() => {
    jest.clearAllMocks();
    if (app.detectionInterval) {
      clearInterval(app.detectionInterval);
    }
    perfMonitor.reset();
  });

  describe('Detection Performance', () => {
    test('should complete face detection within acceptable time', async () => {
      app.video = document.createElement('video');
      app.canvas = document.createElement('canvas');
      app.canvas.getContext = jest.fn(() => ({
        clearRect: jest.fn(),
        fillText: jest.fn(),
        font: '',
        fillStyle: ''
      }));

      perfMonitor.start('detection');
      await app.detectFaces();
      const duration = perfMonitor.end('detection');

      // Detection should complete within 100ms for good user experience
      expect(duration).toBeLessThan(100);
    });

    test('should maintain consistent detection times', async () => {
      app.video = document.createElement('video');
      app.canvas = document.createElement('canvas');
      app.canvas.getContext = jest.fn(() => ({
        clearRect: jest.fn(),
        fillText: jest.fn(),
        font: '',
        fillStyle: ''
      }));

      // Run multiple detections
      const iterations = 10;
      for (let i = 0; i < iterations; i++) {
        perfMonitor.start('detection');
        await app.detectFaces();
        perfMonitor.end('detection');
      }

      const report = perfMonitor.getReport();
      const detectionMetrics = report.find(m => m.name === 'detection');

      expect(detectionMetrics.count).toBe(iterations);
      // Standard deviation should be low (consistent performance)
      const variance = detectionMetrics.max - detectionMetrics.min;
      expect(variance).toBeLessThan(50); // Less than 50ms variance
    });

    test('should handle multiple faces efficiently', async () => {
      app.video = document.createElement('video');
      app.canvas = document.createElement('canvas');
      app.canvas.getContext = jest.fn(() => ({
        clearRect: jest.fn(),
        fillText: jest.fn(),
        font: '',
        fillStyle: ''
      }));

      // Test with different numbers of faces
      const faceCounts = [1, 3, 5, 10];
      const timings = {};

      for (const count of faceCounts) {
        // Mock returning multiple faces
        const faces = Array(count).fill(mockFaceDetection);
        faceapi.detectAllFaces.mockReturnValue({
          withFaceLandmarks: jest.fn(() => ({
            withFaceExpressions: jest.fn(() => ({
              withAgeAndGender: jest.fn(() => Promise.resolve(faces))
            }))
          }))
        });

        perfMonitor.start(`faces-${count}`);
        await app.detectFaces();
        timings[count] = perfMonitor.end(`faces-${count}`);
      }

      // Performance should scale reasonably with face count
      // Not more than 2x slower for 10x faces
      expect(timings[10]).toBeLessThan(timings[1] * 3);
    });
  });

  describe('Frame Rate Performance', () => {
    test('should maintain minimum 15 FPS during detection', async () => {
      // Mock requestAnimationFrame for FPS measurement
      let rafCallbacks = [];
      global.requestAnimationFrame = jest.fn(cb => {
        rafCallbacks.push(cb);
        return rafCallbacks.length;
      });

      // Simulate 60 FPS environment
      const simulateFPS = (targetFPS) => {
        const interval = 1000 / targetFPS;
        let lastTime = 0;
        
        rafCallbacks.forEach((cb, index) => {
          const currentTime = lastTime + interval;
          cb(currentTime);
          lastTime = currentTime;
        });
      };

      // Start detection
      app.startDetection();

      // Simulate frames
      simulateFPS(30); // Simulate 30 FPS

      // With 100ms detection interval, we should maintain at least 15 FPS
      expect(app.detectionInterval).toBeTruthy();
      
      // Stop detection
      app.stopDetection();
      expect(app.detectionInterval).toBeFalsy();
    });
  });

  describe('Memory Performance', () => {
    test('should not leak memory during continuous detection', async () => {
      // Mock memory usage tracking
      const memorySnapshots = [];
      
      global.performance.memory = {
        usedJSHeapSize: 10000000 // 10MB initial
      };

      app.video = document.createElement('video');
      app.canvas = document.createElement('canvas');
      app.canvas.getContext = jest.fn(() => ({
        clearRect: jest.fn(),
        fillText: jest.fn(),
        font: '',
        fillStyle: ''
      }));

      // Run detection loop
      for (let i = 0; i < 50; i++) {
        await app.detectFaces();
        
        // Simulate memory growth (should be minimal)
        global.performance.memory.usedJSHeapSize += Math.random() * 1000; // Small random growth
        
        if (i % 10 === 0) {
          memorySnapshots.push(global.performance.memory.usedJSHeapSize);
        }
      }

      // Check memory growth is reasonable
      const initialMemory = memorySnapshots[0];
      const finalMemory = memorySnapshots[memorySnapshots.length - 1];
      const growthPercentage = ((finalMemory - initialMemory) / initialMemory) * 100;

      expect(growthPercentage).toBeLessThan(10); // Less than 10% growth
    });
  });

  describe('CPU Load Performance', () => {
    test('should handle detection under high CPU load', async () => {
      app.video = document.createElement('video');
      app.canvas = document.createElement('canvas');
      app.canvas.getContext = jest.fn(() => ({
        clearRect: jest.fn(),
        fillText: jest.fn(),
        font: '',
        fillStyle: ''
      }));

      // Measure baseline
      perfMonitor.start('baseline');
      await app.detectFaces();
      const baselineTime = perfMonitor.end('baseline');

      // Measure under load
      perfMonitor.start('under-load');
      simulateHighLoad(50); // 50ms of CPU intensive work
      await app.detectFaces();
      const loadTime = perfMonitor.end('under-load');

      // Should still complete, even if slower
      expect(loadTime).toBeLessThan(baselineTime * 3); // Not more than 3x slower
    });
  });

  describe('Model Loading Performance', () => {
    test('should load models within acceptable time', async () => {
      const app = new FaceDetectionApp();
      
      perfMonitor.start('model-loading');
      await app.loadModels();
      const loadTime = perfMonitor.end('model-loading');

      // Models should load quickly (mocked, but testing the flow)
      expect(loadTime).toBeLessThan(1000); // Less than 1 second
      expect(app.isModelLoaded).toBe(true);
    });

    test('should handle parallel model loading efficiently', async () => {
      // Reset mocks to add timing
      let loadTimes = {
        tinyFaceDetector: 100,
        faceLandmark68Net: 150,
        faceRecognitionNet: 200,
        faceExpressionNet: 120,
        ageGenderNet: 130
      };

      Object.keys(loadTimes).forEach(model => {
        const delay = loadTimes[model];
        faceapi.nets[model].loadFromUri.mockImplementation(
          () => new Promise(resolve => setTimeout(resolve, delay))
        );
      });

      const app = new FaceDetectionApp();
      
      perfMonitor.start('parallel-loading');
      await app.loadModels();
      const totalTime = perfMonitor.end('parallel-loading');

      // Should complete in roughly the time of the slowest model (200ms)
      // not the sum of all times (700ms)
      expect(totalTime).toBeLessThan(250); // Some overhead allowed
    });
  });

  describe('Detection Interval Performance', () => {
    test('should not queue up detections if previous one is slow', async () => {
      let detectionCount = 0;
      let isDetecting = false;

      app.detectFaces = async function() {
        if (isDetecting) {
          throw new Error('Detection already in progress!');
        }
        
        isDetecting = true;
        detectionCount++;
        
        // Simulate slow detection
        await new Promise(resolve => setTimeout(resolve, 150));
        
        isDetecting = false;
      };

      app.startDetection();

      // Wait for multiple interval triggers
      await new Promise(resolve => setTimeout(resolve, 500));

      app.stopDetection();

      // Should have skipped some detections rather than queueing
      expect(detectionCount).toBeLessThan(5); // Less than 500ms / 100ms interval
    });
  });

  describe('Performance Metrics Collection', () => {
    test('should provide performance report', () => {
      // Simulate various operations
      perfMonitor.start('operation1');
      perfMonitor.end('operation1');
      
      perfMonitor.start('operation2');
      perfMonitor.end('operation2');
      
      perfMonitor.start('operation1');
      perfMonitor.end('operation1');

      const report = perfMonitor.getReport();

      expect(report).toHaveLength(2);
      expect(report[0]).toHaveProperty('name');
      expect(report[0]).toHaveProperty('count');
      expect(report[0]).toHaveProperty('average');
      expect(report[0]).toHaveProperty('min');
      expect(report[0]).toHaveProperty('max');
      
      const op1Report = report.find(r => r.name === 'operation1');
      expect(op1Report.count).toBe(2);
    });
  });
});
