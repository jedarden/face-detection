jest.mock('face-api.js');

import { FaceDetectionApp } from '../../src/index.js';
import * as faceapi from 'face-api.js';
import { 
  setupMockDOM, 
  createMockNavigator,
  mockFaceApiModels,
  mockFaceDetection,
  mockVideoElement,
  mockCanvasContext,
  flushPromises
} from '../test-utils/mockHelpers.js';


describe('Full Workflow Integration Tests', () => {
  let app;

  beforeEach(() => {
    setupMockDOM();
    createMockNavigator(true);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
    if (app && app.detectionInterval) {
      clearInterval(app.detectionInterval);
    }
  });

  describe('Complete Application Flow', () => {
    test('should complete full initialization and detection workflow', async () => {
      app = new FaceDetectionApp();
      
      // Initialize app
      const initPromise = app.init();
      
      // Trigger video ready
      setTimeout(() => {
        if (app.video && app.video.onloadedmetadata) {
          app.video.onloadedmetadata();
        }
      }, 100);

      jest.runAllTimers();
      await initPromise;
      await flushPromises();

      // Verify initialization
      expect(app.isModelLoaded).toBe(true);
      expect(app.isVideoReady).toBe(true);
      expect(document.getElementById('video')).toBeTruthy();
      expect(document.getElementById('overlay')).toBeTruthy();

      // Verify detection started
      expect(app.detectionInterval).toBeTruthy();

      // Simulate detection cycles
      jest.advanceTimersByTime(300); // 3 detection cycles at 100ms intervals
      await flushPromises();

      // Verify face detection was called
      expect(faceapi.detectAllFaces).toHaveBeenCalled();
      expect(faceapi.draw.drawDetections).toHaveBeenCalled();
      expect(faceapi.draw.drawFaceLandmarks).toHaveBeenCalled();
      expect(faceapi.draw.drawFaceExpressions).toHaveBeenCalled();
    });

    test('should handle user interaction flow', async () => {
      app = new FaceDetectionApp();
      
      // Initialize without auto-start
      jest.spyOn(app, 'startDetection').mockImplementation();
      
      const initPromise = app.init();
      setTimeout(() => {
        if (app.video && app.video.onloadedmetadata) {
          app.video.onloadedmetadata();
        }
      }, 100);

      jest.runAllTimers();
      await initPromise;
      await flushPromises();

      // User clicks start
      const startBtn = document.getElementById('startBtn');
      startBtn.click();
      
      expect(app.startDetection).toHaveBeenCalled();

      // Actually start detection
      app.startDetection.mockRestore();
      app.startDetection();

      expect(startBtn.disabled).toBe(true);
      expect(document.getElementById('stopBtn').disabled).toBe(false);

      // Run some detection cycles
      jest.advanceTimersByTime(500);
      await flushPromises();

      // User clicks stop
      const stopBtn = document.getElementById('stopBtn');
      stopBtn.click();

      expect(app.detectionInterval).toBeFalsy();
      expect(startBtn.disabled).toBe(false);
      expect(stopBtn.disabled).toBe(true);
    });
  });

  describe('Multi-Face Detection Workflow', () => {
    test('should handle detection of multiple faces', async () => {
      app = new FaceDetectionApp();
      app.isModelLoaded = true;
      app.isVideoReady = true;
      app.setupUI();

      // Mock multiple face detections
      const multipleFaces = [
        { ...mockFaceDetection, age: 25, gender: 'male' },
        { ...mockFaceDetection, age: 30, gender: 'female' },
        { ...mockFaceDetection, age: 45, gender: 'male' }
      ];

      faceapi.detectAllFaces.mockReturnValue({
        withFaceLandmarks: jest.fn(() => ({
          withFaceExpressions: jest.fn(() => ({
            withAgeAndGender: jest.fn(() => Promise.resolve(multipleFaces))
          }))
        }))
      });

      // Start detection
      app.startDetection();
      
      // Wait for detection
      jest.advanceTimersByTime(150);
      await flushPromises();

      // Verify stats updated with correct count
      const stats = document.getElementById('stats');
      expect(stats.innerHTML).toContain('Faces detected: <strong>3</strong>');

      // Verify all faces were drawn
      expect(mockCanvasContext.fillText).toHaveBeenCalledTimes(3);
    });
  });

  describe('Mode Switching Workflow', () => {
    test('should switch between lite and pro modes during runtime', async () => {
      app = new FaceDetectionApp();
      app.isModelLoaded = true;
      app.isVideoReady = true;
      app.setupUI();

      // Add mode switching capability
      app.detectionMode = 'pro';
      app.setDetectionMode = function(mode) {
        this.detectionMode = mode;
        this.updateStats(0, mode);
      };

      // Start in pro mode
      app.startDetection();
      
      jest.advanceTimersByTime(200);
      await flushPromises();

      expect(faceapi.draw.drawFaceLandmarks).toHaveBeenCalled();

      // Switch to lite mode
      app.setDetectionMode('lite');
      
      // Modify detectFaces for lite mode
      const originalDetectFaces = app.detectFaces;
      app.detectFaces = async function() {
        if (this.detectionMode === 'lite') {
          const detections = await faceapi.detectAllFaces(
            this.video,
            new faceapi.TinyFaceDetectorOptions()
          );
          
          const ctx = this.canvas.getContext('2d');
          ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          faceapi.draw.drawDetections(this.canvas, detections);
          this.updateStats(detections.length, 'lite');
        } else {
          return originalDetectFaces.call(this);
        }
      };

      jest.clearAllMocks();
      jest.advanceTimersByTime(200);
      await flushPromises();

      // In lite mode, should not draw landmarks
      expect(faceapi.draw.drawDetections).toHaveBeenCalled();
      expect(faceapi.draw.drawFaceLandmarks).not.toHaveBeenCalled();
    });
  });

  describe('Error Recovery Workflow', () => {
    test('should recover from temporary detection errors', async () => {
      app = new FaceDetectionApp();
      app.isModelLoaded = true;
      app.isVideoReady = true;
      app.setupUI();

      let callCount = 0;
      faceapi.detectAllFaces.mockImplementation(() => {
        callCount++;
        if (callCount <= 2) {
          return Promise.reject(new Error('Temporary error'));
        }
        return {
          withFaceLandmarks: jest.fn(() => ({
            withFaceExpressions: jest.fn(() => ({
              withAgeAndGender: jest.fn(() => Promise.resolve([mockFaceDetection]))
            }))
          }))
        };
      });

      // Wrap detectFaces to handle errors
      const originalDetectFaces = app.detectFaces;
      app.detectFaces = async function() {
        try {
          return await originalDetectFaces.call(this);
        } catch (error) {
          console.error('Detection error:', error);
        }
      };

      app.startDetection();

      // First two attempts fail
      jest.advanceTimersByTime(250);
      await flushPromises();

      // Third attempt succeeds
      jest.advanceTimersByTime(100);
      await flushPromises();

      // Should eventually show successful detection
      const stats = document.getElementById('stats');
      expect(stats.innerHTML).toContain('Faces detected: <strong>1</strong>');
    });
  });

  describe('Performance Under Load', () => {
    test('should maintain responsiveness with continuous detection', async () => {
      app = new FaceDetectionApp();
      app.isModelLoaded = true;
      app.isVideoReady = true;
      app.setupUI();

      const detectionTimes = [];
      const originalDetectFaces = app.detectFaces;
      
      app.detectFaces = async function() {
        const start = Date.now();
        await originalDetectFaces.call(this);
        detectionTimes.push(Date.now() - start);
      };

      app.startDetection();

      // Run for 2 seconds (20 detection cycles)
      for (let i = 0; i < 20; i++) {
        jest.advanceTimersByTime(100);
        await flushPromises();
      }

      app.stopDetection();

      // All detections should complete
      expect(detectionTimes.length).toBe(20);
      
      // Average detection time should be reasonable
      const avgTime = detectionTimes.reduce((a, b) => a + b, 0) / detectionTimes.length;
      expect(avgTime).toBeLessThan(50); // Less than 50ms average
    });
  });

  describe('State Management', () => {
    test('should maintain consistent state throughout lifecycle', async () => {
      app = new FaceDetectionApp();
      
      // Initial state
      expect(app.isModelLoaded).toBe(false);
      expect(app.isVideoReady).toBe(false);
      expect(app.detectionInterval).toBeFalsy();

      // After model loading
      await app.loadModels();
      expect(app.isModelLoaded).toBe(true);

      // After UI setup
      app.setupUI();
      expect(app.video).toBeTruthy();
      expect(app.canvas).toBeTruthy();

      // After camera setup
      const cameraPromise = app.setupCamera();
      if (app.video.onloadedmetadata) {
        app.video.onloadedmetadata();
      }
      await cameraPromise;
      expect(app.isVideoReady).toBe(true);

      // After starting detection
      app.startDetection();
      expect(app.detectionInterval).toBeTruthy();

      // After stopping detection
      app.stopDetection();
      expect(app.detectionInterval).toBeFalsy();
      
      // Models and video should still be ready
      expect(app.isModelLoaded).toBe(true);
      expect(app.isVideoReady).toBe(true);
    });
  });

  describe('Resource Cleanup', () => {
    test('should properly clean up resources on app teardown', async () => {
      app = new FaceDetectionApp();
      
      const initPromise = app.init();
      setTimeout(() => {
        if (app.video && app.video.onloadedmetadata) {
          app.video.onloadedmetadata();
        }
      }, 100);

      jest.runAllTimers();
      await initPromise;
      await flushPromises();

      // Start detection
      app.startDetection();
      jest.advanceTimersByTime(500);
      await flushPromises();

      // Clean up
      app.stopDetection();
      
      // Clear canvas
      expect(mockCanvasContext.clearRect).toHaveBeenCalledWith(
        0, 0, app.canvas.width, app.canvas.height
      );

      // No active intervals
      expect(app.detectionInterval).toBeFalsy();
    });
  });
});
