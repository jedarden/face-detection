import { FaceDetectionApp } from '../../src/index-wasm.js';
import { setupMockDOM, waitForAsync, createMockNavigator } from '../test-utils/mockHelpers.js';

describe('UI Components Tests', () => {
  let app;

  beforeEach(() => {
    setupMockDOM();
    // Mock the MediaDevices API
    createMockNavigator(true, [
      { kind: 'videoinput', deviceId: 'camera1', label: 'Default Camera', groupId: 'group1' }
    ]);
    app = new FaceDetectionApp();
  });

  describe('UI Setup', () => {
    test('should create complete UI structure', () => {
      app.setupUI();

      // Check main container
      const container = document.querySelector('.container');
      expect(container).toBeTruthy();

      // Check title
      const title = document.querySelector('h1');
      expect(title.textContent).toBe('Face Detection App');

      // Check video container
      const videoContainer = document.querySelector('.video-container');
      expect(videoContainer).toBeTruthy();

      // Check video element
      const video = document.getElementById('video');
      expect(video).toBeTruthy();
      expect(video.autoplay).toBe(true);
      expect(video.muted).toBe(true);

      // Check canvas overlay
      const canvas = document.getElementById('overlay');
      expect(canvas).toBeTruthy();

      // Check controls
      const controls = document.querySelector('.controls');
      expect(controls).toBeTruthy();

      // Check buttons
      const startBtn = document.getElementById('startBtn');
      const stopBtn = document.getElementById('stopBtn');
      expect(startBtn).toBeTruthy();
      expect(stopBtn).toBeTruthy();
      expect(startBtn.textContent).toBe('Start Detection');
      expect(stopBtn.textContent).toBe('Stop Detection');
      expect(startBtn.className).toContain('btn-primary');
      expect(stopBtn.className).toContain('btn-secondary');

      // Check stats display
      const stats = document.getElementById('stats');
      expect(stats).toBeTruthy();
      expect(stats.className).toBe('stats');
    });

    test('should have correct initial button states', () => {
      app.setupUI();

      const startBtn = document.getElementById('startBtn');
      const stopBtn = document.getElementById('stopBtn');

      expect(startBtn.disabled).toBe(false);
      expect(stopBtn.disabled).toBe(true);
    });

    test('should attach event listeners to buttons', () => {
      app.setupUI();

      const startBtn = document.getElementById('startBtn');
      const stopBtn = document.getElementById('stopBtn');

      const startDetectionSpy = jest.spyOn(app, 'startDetection');
      const stopDetectionSpy = jest.spyOn(app, 'stopDetection');

      startBtn.click();
      expect(startDetectionSpy).toHaveBeenCalled();

      stopBtn.click();
      expect(stopDetectionSpy).toHaveBeenCalled();
    });
  });

  describe('Button State Management', () => {
    beforeEach(() => {
      app.setupUI();
      app.isModelLoaded = true;
      app.isVideoReady = true;
    });

    test('should toggle button states when starting detection', async () => {
      const startBtn = document.getElementById('startBtn');
      const stopBtn = document.getElementById('stopBtn');

      await app.startDetection();

      expect(startBtn.disabled).toBe(true);
      expect(stopBtn.disabled).toBe(false);
    });

    test('should toggle button states when stopping detection', () => {
      const startBtn = document.getElementById('startBtn');
      const stopBtn = document.getElementById('stopBtn');

      // First start detection
      app.startDetection();
      
      // Then stop
      app.stopDetection();

      expect(startBtn.disabled).toBe(false);
      expect(stopBtn.disabled).toBe(true);
    });
  });

  describe('Stats Display', () => {
    beforeEach(() => {
      app.setupUI();
    });

    test('should update stats with face count', () => {
      app.updateStats(3);

      const stats = document.getElementById('stats');
      expect(stats.innerHTML).toContain('Faces detected: <strong>3</strong>');
    });

    test('should display model information', () => {
      app.updateStats(0);

      const stats = document.getElementById('stats');
      expect(stats.innerHTML).toContain('Model: TinyFaceDetector');
    });

    test('should display feature information', () => {
      app.updateStats(0);

      const stats = document.getElementById('stats');
      expect(stats.innerHTML).toContain('Features: Landmarks, Expressions, Age & Gender');
    });

    test('should handle zero faces detected', () => {
      app.updateStats(0);

      const stats = document.getElementById('stats');
      expect(stats.innerHTML).toContain('Faces detected: <strong>0</strong>');
    });
  });

  describe('Error Display', () => {
    test('should display error message', () => {
      const errorMessage = 'Test error message';
      app.showError(errorMessage);

      const appElement = document.getElementById('app');
      expect(appElement.innerHTML).toContain('<div class="error">');
      expect(appElement.innerHTML).toContain('<h2>Error</h2>');
      expect(appElement.innerHTML).toContain(errorMessage);
    });

    test('should replace entire UI with error display', () => {
      app.setupUI();
      
      // Verify UI exists
      expect(document.getElementById('video')).toBeTruthy();

      app.showError('Critical error');

      // Verify UI is replaced
      expect(document.getElementById('video')).toBeFalsy();
      expect(document.querySelector('.error')).toBeTruthy();
    });
  });

  describe('UI Responsiveness', () => {
    test('should handle rapid button clicks', () => {
      app.setupUI();
      app.isModelLoaded = true;
      app.isVideoReady = true;

      const startBtn = document.getElementById('startBtn');
      const startDetectionSpy = jest.spyOn(app, 'startDetection');

      // Rapid clicks
      startBtn.click();
      startBtn.click();
      startBtn.click();

      // Should still only start once due to button being disabled
      expect(startDetectionSpy).toHaveBeenCalledTimes(3); // All clicks go through
      expect(startBtn.disabled).toBe(true); // But button gets disabled
    });

    test('should prevent starting detection when not ready', () => {
      app.setupUI();
      app.isModelLoaded = false;
      app.isVideoReady = false;

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const startBtn = document.getElementById('startBtn');

      startBtn.click();

      expect(consoleErrorSpy).toHaveBeenCalledWith('Models or video not ready');
      expect(startBtn.disabled).toBe(false); // Button remains enabled
    });
  });

  describe('Canvas Overlay', () => {
    test('should clear canvas when stopping detection', () => {
      app.setupUI();
      const canvas = document.getElementById('overlay');
      const ctx = canvas.getContext('2d');
      const clearRectSpy = jest.spyOn(ctx, 'clearRect');

      app.stopDetection();

      expect(clearRectSpy).toHaveBeenCalledWith(0, 0, canvas.width, canvas.height);
    });

    test('should position canvas over video', () => {
      app.setupUI();
      
      const videoContainer = document.querySelector('.video-container');
      const video = document.getElementById('video');
      const canvas = document.getElementById('overlay');

      // Both should be children of video-container
      expect(videoContainer.contains(video)).toBe(true);
      expect(videoContainer.contains(canvas)).toBe(true);
    });
  });

  describe('Dynamic UI Updates', () => {
    test('should handle stats updates during detection', () => {
      app.setupUI();
      
      // Simulate multiple updates
      app.updateStats(0);
      app.updateStats(1);
      app.updateStats(3);
      app.updateStats(2);

      const stats = document.getElementById('stats');
      expect(stats.innerHTML).toContain('Faces detected: <strong>2</strong>');
    });

    test('should maintain UI structure after multiple operations', () => {
      app.setupUI();
      
      // Perform multiple operations
      app.startDetection();
      app.stopDetection();
      app.updateStats(5);
      app.startDetection();

      // Verify UI elements still exist
      expect(document.getElementById('video')).toBeTruthy();
      expect(document.getElementById('overlay')).toBeTruthy();
      expect(document.getElementById('startBtn')).toBeTruthy();
      expect(document.getElementById('stopBtn')).toBeTruthy();
      expect(document.getElementById('stats')).toBeTruthy();
    });
  });

  describe('Snapshot Feature', () => {
    beforeEach(() => {
      app.setupUI();
      // Mock video and canvas elements with proper properties
      const mockVideo = document.getElementById('video');
      const mockCanvas = document.getElementById('overlay');

      // Use Object.defineProperty to set read-only properties
      Object.defineProperty(mockVideo, 'videoWidth', { value: 640, writable: true });
      Object.defineProperty(mockVideo, 'videoHeight', { value: 480, writable: true });

      app.video = mockVideo;
      app.canvas = mockCanvas;
    });

    test('should have snapshot button in UI', () => {
      const snapshotBtn = document.getElementById('snapshotBtn');
      expect(snapshotBtn).toBeTruthy();
      expect(snapshotBtn.textContent).toBe('Save Snapshot');
      expect(snapshotBtn.className).toContain('btn-snapshot');
    });

    test('should attach event listener to snapshot button', () => {
      const snapshotBtn = document.getElementById('snapshotBtn');
      const saveSnapshotSpy = jest.spyOn(app, 'saveSnapshot');

      snapshotBtn.click();
      expect(saveSnapshotSpy).toHaveBeenCalled();
    });

    test('should create snapshot when video and canvas are available', () => {
      // Mock canvas methods
      const mockContext = {
        save: jest.fn(),
        restore: jest.fn(),
        translate: jest.fn(),
        scale: jest.fn(),
        drawImage: jest.fn(),
      };

      const mockCanvas = {
        width: 640,
        height: 480,
        getContext: jest.fn().mockReturnValue(mockContext),
        toDataURL: jest.fn().mockReturnValue('data:image/png;base64,mockdata')
      };

      // Mock document.createElement for canvas
      const originalCreateElement = document.createElement;
      document.createElement = jest.fn()
        .mockImplementation((tag) => {
          if (tag === 'canvas') return mockCanvas;
          return originalCreateElement.call(document, tag);
        });

      // Mock document.createElement for anchor
      const mockLink = {
        download: '',
        href: '',
        click: jest.fn(),
      };
      document.createElement.mockImplementation((tag) => {
        if (tag === 'canvas') return mockCanvas;
        if (tag === 'a') return mockLink;
        return originalCreateElement.call(document, tag);
      });

      const saveSnapshotSpy = jest.spyOn(app, 'saveSnapshot');
      app.saveSnapshot();

      expect(saveSnapshotSpy).toHaveBeenCalled();
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/png');
      expect(mockLink.download).toMatch(/face-detection-snapshot-.*\.png/);
      expect(mockLink.href).toBe('data:image/png;base64,mockdata');
      expect(mockLink.click).toHaveBeenCalled();

      // Restore original
      document.createElement = originalCreateElement;
    });

    test('should handle missing video or canvas gracefully', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      app.video = null;
      app.canvas = null;

      expect(() => app.saveSnapshot()).not.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Video or canvas not available for snapshot');

      consoleErrorSpy.mockRestore();
    });

    test('should mirror video and overlay in snapshot', () => {
      const mockContext = {
        save: jest.fn(),
        restore: jest.fn(),
        translate: jest.fn(),
        scale: jest.fn(),
        drawImage: jest.fn(),
      };

      const mockCanvas = {
        width: 640,
        height: 480,
        getContext: jest.fn().mockReturnValue(mockContext),
        toDataURL: jest.fn().mockReturnValue('data:image/png;base64,mockdata')
      };

      const mockLink = {
        download: '',
        href: '',
        click: jest.fn(),
      };

      const originalCreateElement = document.createElement;
      document.createElement = jest.fn()
        .mockImplementation((tag) => {
          if (tag === 'canvas') return mockCanvas;
          if (tag === 'a') return mockLink;
          return originalCreateElement.call(document, tag);
        });

      app.saveSnapshot();

      // Verify mirroring was applied for both video and overlay
      expect(mockContext.save).toHaveBeenCalledTimes(2);
      expect(mockContext.translate).toHaveBeenCalledTimes(2);
      expect(mockContext.scale).toHaveBeenCalledTimes(2);
      expect(mockContext.scale).toHaveBeenCalledWith(-1, 1);
      expect(mockContext.restore).toHaveBeenCalledTimes(2);

      document.createElement = originalCreateElement;
    });

    test('should use timestamp in snapshot filename', () => {
      const mockCanvas = {
        width: 640,
        height: 480,
        getContext: jest.fn().mockReturnValue({}),
        toDataURL: jest.fn().mockReturnValue('data:image/png;base64,mockdata')
      };

      const mockLink = {
        download: '',
        href: '',
        click: jest.fn(),
      };

      const originalCreateElement = document.createElement;
      document.createElement = jest.fn()
        .mockImplementation((tag) => {
          if (tag === 'canvas') return mockCanvas;
          if (tag === 'a') return mockLink;
          return originalCreateElement.call(document, tag);
        });

      app.saveSnapshot();

      // Verify filename pattern includes timestamp
      expect(mockLink.download).toMatch(/^face-detection-snapshot-\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}/);
      expect(mockLink.download).toMatch(/\.png$/);

      document.createElement = originalCreateElement;
    });
  });
});