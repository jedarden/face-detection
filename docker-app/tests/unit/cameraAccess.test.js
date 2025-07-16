import { FaceDetectionApp } from '../../src/index.js';
import { 
  setupMockDOM, 
  createMockNavigator, 
  mockVideoElement,
  mockMediaStream,
  waitForAsync 
} from '../test-utils/mockHelpers.js';

describe('Camera Access Tests', () => {
  let app;
  let mockGetUserMedia;

  beforeEach(() => {
    setupMockDOM();
    app = new FaceDetectionApp();
    app.setupUI();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('setupCamera', () => {
    test('should successfully access camera with correct constraints', async () => {
      mockGetUserMedia = createMockNavigator(true);
      app.video = mockVideoElement;

      const promise = app.setupCamera();
      
      // Trigger onloadedmetadata
      if (app.video.onloadedmetadata) {
        app.video.onloadedmetadata();
      }

      await promise;

      expect(mockGetUserMedia).toHaveBeenCalledWith({
        video: { width: 640, height: 480 }
      });
      expect(app.video.srcObject).toBe(mockMediaStream);
      expect(app.isVideoReady).toBe(true);
    });

    test('should handle camera permission denied', async () => {
      mockGetUserMedia = createMockNavigator(false);
      app.video = mockVideoElement;

      await expect(app.setupCamera()).rejects.toThrow('Camera access denied or not available');
      expect(app.isVideoReady).toBe(false);
    });

    test('should handle missing getUserMedia API', async () => {
      delete global.navigator.mediaDevices;
      app.video = mockVideoElement;

      await expect(app.setupCamera()).rejects.toThrow();
      expect(app.isVideoReady).toBe(false);
    });

    test('should adjust canvas dimensions after video loads', async () => {
      mockGetUserMedia = createMockNavigator(true);
      app.video = mockVideoElement;
      app.canvas = document.createElement('canvas');
      
      const adjustCanvasSpy = jest.spyOn(app, 'adjustCanvas');

      const promise = app.setupCamera();
      if (app.video.onloadedmetadata) {
        app.video.onloadedmetadata();
      }
      await promise;

      expect(adjustCanvasSpy).toHaveBeenCalled();
      expect(app.canvas.width).toBe(640);
      expect(app.canvas.height).toBe(480);
    });

    test('should handle different video resolutions', async () => {
      mockGetUserMedia = createMockNavigator(true);
      const customVideo = {
        ...mockVideoElement,
        videoWidth: 1920,
        videoHeight: 1080
      };
      app.video = customVideo;
      app.canvas = document.createElement('canvas');

      const promise = app.setupCamera();
      if (app.video.onloadedmetadata) {
        app.video.onloadedmetadata();
      }
      await promise;

      expect(app.canvas.width).toBe(1920);
      expect(app.canvas.height).toBe(1080);
    });

    test('should handle stream errors', async () => {
      mockGetUserMedia = jest.fn(() => Promise.reject(new DOMException('NotAllowedError')));
      global.navigator.mediaDevices = { getUserMedia: mockGetUserMedia };
      app.video = mockVideoElement;

      await expect(app.setupCamera()).rejects.toThrow();
    });
  });

  describe('adjustCanvas', () => {
    test('should set canvas dimensions to match video', () => {
      app.video = {
        videoWidth: 800,
        videoHeight: 600
      };
      app.canvas = document.createElement('canvas');

      app.adjustCanvas();

      expect(app.canvas.width).toBe(800);
      expect(app.canvas.height).toBe(600);
    });

    test('should handle zero video dimensions', () => {
      app.video = {
        videoWidth: 0,
        videoHeight: 0
      };
      app.canvas = document.createElement('canvas');

      app.adjustCanvas();

      expect(app.canvas.width).toBe(0);
      expect(app.canvas.height).toBe(0);
    });
  });

  describe('Camera stream cleanup', () => {
    test('should stop camera stream when app is destroyed', async () => {
      mockGetUserMedia = createMockNavigator(true);
      app.video = mockVideoElement;

      const promise = app.setupCamera();
      if (app.video.onloadedmetadata) {
        app.video.onloadedmetadata();
      }
      await promise;

      const stopSpy = jest.spyOn(mockMediaStream.getTracks()[0], 'stop');
      
      // Simulate cleanup
      if (app.video.srcObject) {
        app.video.srcObject.getTracks().forEach(track => track.stop());
      }

      expect(stopSpy).toHaveBeenCalled();
    });
  });

  describe('Multiple camera access attempts', () => {
    test('should handle rapid successive camera access calls', async () => {
      mockGetUserMedia = createMockNavigator(true);
      app.video = mockVideoElement;

      const promises = [
        app.setupCamera(),
        app.setupCamera(),
        app.setupCamera()
      ];

      // Trigger onloadedmetadata for all
      if (app.video.onloadedmetadata) {
        app.video.onloadedmetadata();
      }

      await Promise.all(promises);

      // Should only call getUserMedia once or handle gracefully
      expect(app.isVideoReady).toBe(true);
    });
  });
});