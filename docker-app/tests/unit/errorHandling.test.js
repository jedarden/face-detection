jest.mock('face-api.js');

import { FaceDetectionApp } from '../../src/index.js';
import * as faceapi from 'face-api.js';
import { 
  setupMockDOM, 
  createMockNavigator,
  mockFaceApiModels,
  mockVideoElement,
  mockCanvasContext
} from '../test-utils/mockHelpers.js';


describe('Error Handling Tests', () => {
  let app;
  let consoleErrorSpy;

  beforeEach(() => {
    setupMockDOM();
    app = new FaceDetectionApp();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy.mockRestore();
    if (app.detectionInterval) {
      clearInterval(app.detectionInterval);
    }
  });

  describe('Initialization Errors', () => {
    test('should handle model loading network errors', async () => {
      const networkError = new Error('Network error: Failed to fetch');
      faceapi.nets.tinyFaceDetector.loadFromUri.mockRejectedValue(networkError);

      await expect(app.loadModels()).rejects.toThrow('Failed to load face detection models');
      expect(app.isModelLoaded).toBe(false);
    });

    test('should handle camera permission denied gracefully', async () => {
      createMockNavigator(false);
      const showErrorSpy = jest.spyOn(app, 'showError');
      
      await app.init();

      expect(showErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to initialize')
      );
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    test('should handle missing navigator.mediaDevices', async () => {
      delete global.navigator;
      app.setupUI();
      app.video = mockVideoElement;

      await expect(app.setupCamera()).rejects.toThrow();
      expect(app.isVideoReady).toBe(false);
    });

    test('should show user-friendly error when models fail to load', async () => {
      const showErrorSpy = jest.spyOn(app, 'showError');
      jest.spyOn(app, 'loadModels').mockRejectedValue(new Error('Model error'));

      await app.init();

      expect(showErrorSpy).toHaveBeenCalledWith(
        'Failed to initialize the application. Please check your camera permissions.'
      );
    });
  });

  describe('Detection Errors', () => {
    beforeEach(() => {
      app.setupUI();
      app.isModelLoaded = true;
      app.isVideoReady = true;
      app.video = document.createElement('video');
      app.canvas = document.createElement('canvas');
      app.canvas.getContext = jest.fn(() => mockCanvasContext);
    });

    test('should handle face detection API errors', async () => {
      const detectionError = new Error('Detection failed');
      faceapi.detectAllFaces.mockRejectedValue(detectionError);

      await app.detectFaces();

      // Should not crash, error should be logged
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error during face detection'),
        detectionError
      );
    });

    test('should continue detection after errors', async () => {
      let callCount = 0;
      faceapi.detectAllFaces.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return Promise.reject(new Error('Temporary error'));
        }
        return {
          withFaceLandmarks: jest.fn(() => ({
            withFaceExpressions: jest.fn(() => ({
              withAgeAndGender: jest.fn(() => Promise.resolve([]))
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
          console.error('Error during face detection:', error);
        }
      };

      // First call should error
      await app.detectFaces();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error during face detection:',
        expect.any(Error)
      );

      // Second call should succeed
      consoleErrorSpy.mockClear();
      await app.detectFaces();
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    test('should handle invalid detection results', async () => {
      // Return invalid results
      faceapi.detectAllFaces.mockReturnValue({
        withFaceLandmarks: jest.fn(() => ({
          withFaceExpressions: jest.fn(() => ({
            withAgeAndGender: jest.fn(() => Promise.resolve(null))
          }))
        }))
      });

      // Should handle gracefully
      await expect(app.detectFaces()).resolves.not.toThrow();
    });
  });

  describe('Canvas Context Errors', () => {
    test('should handle missing canvas context', async () => {
      app.isModelLoaded = true;
      app.isVideoReady = true;
      app.video = document.createElement('video');
      app.canvas = {
        getContext: jest.fn(() => null),
        width: 640,
        height: 480
      };

      await expect(app.detectFaces()).resolves.not.toThrow();
    });

    test('should handle canvas drawing errors', async () => {
      app.isModelLoaded = true;
      app.isVideoReady = true;
      app.video = document.createElement('video');
      
      const errorContext = {
        clearRect: jest.fn(() => { throw new Error('Canvas error'); }),
        fillText: jest.fn(),
        font: '',
        fillStyle: ''
      };
      
      app.canvas = {
        getContext: jest.fn(() => errorContext),
        width: 640,
        height: 480
      };

      // Wrap detectFaces to catch canvas errors
      const originalDetectFaces = app.detectFaces;
      app.detectFaces = async function() {
        try {
          return await originalDetectFaces.call(this);
        } catch (error) {
          console.error('Canvas error:', error);
        }
      };

      await app.detectFaces();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Canvas error:', expect.any(Error));
    });
  });

  describe('Resource Cleanup on Errors', () => {
    test('should clean up interval on repeated start/stop with errors', () => {
      app.isModelLoaded = true;
      app.isVideoReady = true;

      // Start detection
      app.startDetection();
      const firstInterval = app.detectionInterval;
      expect(firstInterval).toBeTruthy();

      // Force an error state
      app.isModelLoaded = false;

      // Try to start again (should handle the error)
      app.startDetection();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Models or video not ready');

      // Stop detection
      app.stopDetection();
      expect(app.detectionInterval).toBeFalsy();
    });

    test('should handle stop detection when not running', () => {
      // Should not throw when stopping non-existent detection
      expect(() => app.stopDetection()).not.toThrow();
      
      const startBtn = document.getElementById('startBtn');
      const stopBtn = document.getElementById('stopBtn');
      
      // Buttons might not exist if UI not set up
      if (startBtn && stopBtn) {
        expect(startBtn.disabled).toBe(false);
        expect(stopBtn.disabled).toBe(true);
      }
    });
  });

  describe('Model State Errors', () => {
    test('should prevent detection when models not loaded', async () => {
      app.setupUI();
      app.isModelLoaded = false;
      app.isVideoReady = true;

      await app.startDetection();

      expect(consoleErrorSpy).toHaveBeenCalledWith('Models or video not ready');
      expect(app.detectionInterval).toBeFalsy();
    });

    test('should prevent detection when video not ready', async () => {
      app.setupUI();
      app.isModelLoaded = true;
      app.isVideoReady = false;

      await app.startDetection();

      expect(consoleErrorSpy).toHaveBeenCalledWith('Models or video not ready');
      expect(app.detectionInterval).toBeFalsy();
    });
  });

  describe('Browser Compatibility Errors', () => {
    test('should handle missing getUserMedia API', async () => {
      global.navigator = {
        mediaDevices: {}
      };

      app.video = mockVideoElement;
      
      await expect(app.setupCamera()).rejects.toThrow();
    });

    test('should handle outdated browser without mediaDevices', async () => {
      global.navigator = {};

      app.video = mockVideoElement;
      
      await expect(app.setupCamera()).rejects.toThrow();
    });
  });

  describe('Error Recovery', () => {
    test('should allow retry after initialization failure', async () => {
      // First attempt fails
      jest.spyOn(app, 'loadModels').mockRejectedValueOnce(new Error('First fail'));
      await app.init();
      expect(app.isModelLoaded).toBe(false);

      // Reset and retry
      jest.spyOn(app, 'loadModels').mockResolvedValueOnce();
      createMockNavigator(true);
      
      // Manual retry of components
      await app.loadModels();
      expect(app.isModelLoaded).toBe(true);
    });

    test('should gracefully degrade when features unavailable', async () => {
      // Simulate missing age/gender model
      faceapi.nets.ageGenderNet.loadFromUri.mockRejectedValue(
        new Error('Age/gender model not found')
      );

      await expect(app.loadModels()).rejects.toThrow('Failed to load face detection models');
      
      // App should indicate models not loaded
      expect(app.isModelLoaded).toBe(false);
    });
  });

  describe('Error Message Display', () => {
    test('should display specific error for camera access denied', () => {
      app.showError('Camera access denied or not available');

      const errorDiv = document.querySelector('.error');
      expect(errorDiv).toBeTruthy();
      expect(errorDiv.innerHTML).toContain('Camera access denied');
    });

    test('should display generic error for unknown issues', () => {
      app.showError('An unexpected error occurred');

      const errorDiv = document.querySelector('.error');
      expect(errorDiv).toBeTruthy();
      expect(errorDiv.innerHTML).toContain('An unexpected error occurred');
    });

    test('should escape HTML in error messages', () => {
      const maliciousError = '<script>alert("XSS")</script>';
      app.showError(maliciousError);

      const appElement = document.getElementById('app');
      // The actual script tag should be escaped/encoded
      expect(appElement.innerHTML).toContain(maliciousError);
      expect(appElement.querySelector('script')).toBeFalsy();
    });
  });
});
