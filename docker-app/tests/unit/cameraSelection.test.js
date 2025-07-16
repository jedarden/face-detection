import { CameraManager } from '../../src/cameraUtils';
import { FaceDetectionApp } from '../../src/index';
import { flushPromises } from '../test-utils/mockHelpers';

// Mock MediaDevices API
const mockGetUserMedia = jest.fn();
const mockEnumerateDevices = jest.fn();

// Mock MediaStream
class MockMediaStream {
  constructor() {
    this.active = true;
    this.tracks = [{
      stop: jest.fn(),
      getSettings: () => ({
        deviceId: 'camera1',
        width: 640,
        height: 480,
        frameRate: 30
      })
    }];
  }
  
  getTracks() {
    return this.tracks;
  }
  
  getVideoTracks() {
    return this.tracks;
  }
}

// Setup global mocks
global.navigator.mediaDevices = {
  getUserMedia: mockGetUserMedia,
  enumerateDevices: mockEnumerateDevices
};

describe('Camera Selection Tests', () => {
  let cameraManager;
  let mockVideoElement;
  
  beforeEach(() => {
    cameraManager = new CameraManager();
    mockVideoElement = {
      srcObject: null,
      readyState: 2,
      addEventListener: jest.fn((event, handler) => {
        if (event === 'loadedmetadata') {
          setTimeout(handler, 0);
        }
      })
    };
    
    // Reset mocks
    mockGetUserMedia.mockClear();
    mockEnumerateDevices.mockClear();
    
    // Default mock implementation
    mockGetUserMedia.mockResolvedValue(new MockMediaStream());
  });
  
  afterEach(() => {
    if (cameraManager.stream) {
      cameraManager.stopCamera();
    }
  });
  
  describe('Camera Enumeration', () => {
    test('should enumerate cameras after getting permission', async () => {
      mockEnumerateDevices.mockResolvedValue([
        { kind: 'videoinput', deviceId: 'camera1', label: 'Front Camera', groupId: 'group1' },
        { kind: 'videoinput', deviceId: 'camera2', label: 'Back Camera', groupId: 'group2' },
        { kind: 'audioinput', deviceId: 'mic1', label: 'Microphone', groupId: 'group1' }
      ]);
      
      const cameras = await cameraManager.getAvailableCameras();
      
      expect(cameras).toHaveLength(2);
      expect(cameras[0]).toEqual({
        deviceId: 'camera1',
        label: 'Front Camera',
        groupId: 'group1'
      });
      expect(cameras[1]).toEqual({
        deviceId: 'camera2',
        label: 'Back Camera',
        groupId: 'group2'
      });
    });
    
    test('should handle empty device labels', async () => {
      mockEnumerateDevices.mockResolvedValue([
        { kind: 'videoinput', deviceId: 'camera1', label: '', groupId: 'group1' },
        { kind: 'videoinput', deviceId: 'camera2', label: '', groupId: 'group2' }
      ]);
      
      const cameras = await cameraManager.getAvailableCameras();
      
      expect(cameras[0].label).toBe('Camera 1');
      expect(cameras[1].label).toBe('Camera 2');
    });
    
    test('should request permission if no stream exists', async () => {
      mockEnumerateDevices.mockResolvedValue([]);
      
      await cameraManager.getAvailableCameras();
      
      expect(mockGetUserMedia).toHaveBeenCalledWith({ video: true });
    });
  });
  
  describe('Camera Selection', () => {
    test('should select camera by device ID', async () => {
      await cameraManager.startCamera(mockVideoElement);
      
      await cameraManager.selectCamera('camera2');
      
      expect(cameraManager.options.deviceId).toBe('camera2');
      expect(mockGetUserMedia).toHaveBeenCalledTimes(2);
    });
    
    test('should use exact deviceId constraint when selecting camera', async () => {
      cameraManager.options.deviceId = 'specific-camera';
      const constraints = cameraManager.getCameraConstraints();
      
      expect(constraints.video.deviceId).toEqual({ exact: 'specific-camera' });
      expect(constraints.video.facingMode).toBeUndefined();
    });
    
    test('should throw error if no deviceId provided', async () => {
      await expect(cameraManager.selectCamera()).rejects.toThrow('Device ID is required');
    });
    
    test('should restart camera if already active', async () => {
      await cameraManager.startCamera(mockVideoElement);
      const stopSpy = jest.spyOn(cameraManager, 'stopCamera');
      
      await cameraManager.selectCamera('camera2');
      
      expect(stopSpy).toHaveBeenCalled();
      expect(cameraManager.isActive).toBe(true);
    });
  });
  
  describe('UI Camera Selector', () => {
    let app;
    let container;
    
    beforeEach(() => {
      container = document.createElement('div');
      container.id = 'app';
      document.body.appendChild(container);
      
      app = new FaceDetectionApp();
    });
    
    afterEach(() => {
      if (container.parentNode) {
        document.body.removeChild(container);
      }
    });
    
    test('should show camera selector when multiple cameras available', async () => {
      mockEnumerateDevices.mockResolvedValue([
        { kind: 'videoinput', deviceId: 'camera1', label: 'Camera 1', groupId: 'group1' },
        { kind: 'videoinput', deviceId: 'camera2', label: 'Camera 2', groupId: 'group2' }
      ]);
      
      app.setupUI();
      await app.loadCameraList();
      
      const cameraSelector = document.getElementById('camera-selector');
      const cameraSelect = document.getElementById('cameraSelect');
      
      expect(cameraSelector.style.display).toBe('block');
      expect(cameraSelect.options).toHaveLength(2);
      expect(cameraSelect.options[0].text).toBe('Camera 1');
      expect(cameraSelect.options[1].text).toBe('Camera 2');
    });
    
    test('should hide camera selector when only one camera available', async () => {
      mockEnumerateDevices.mockResolvedValue([
        { kind: 'videoinput', deviceId: 'camera1', label: 'Camera 1', groupId: 'group1' }
      ]);
      
      app.setupUI();
      await app.loadCameraList();
      
      const cameraSelector = document.getElementById('camera-selector');
      
      expect(cameraSelector.style.display).toBe('none');
    });
    
    test('should handle camera switch from UI', async () => {
      mockEnumerateDevices.mockResolvedValue([
        { kind: 'videoinput', deviceId: 'camera1', label: 'Camera 1', groupId: 'group1' },
        { kind: 'videoinput', deviceId: 'camera2', label: 'Camera 2', groupId: 'group2' }
      ]);
      
      app.setupUI();
      await app.loadCameraList();
      
      const switchSpy = jest.spyOn(app, 'switchCamera').mockImplementation(() => Promise.resolve());
      const cameraSelect = document.getElementById('cameraSelect');
      
      // Simulate camera change
      cameraSelect.value = 'camera2';
      cameraSelect.dispatchEvent(new Event('change'));
      
      await flushPromises();
      
      expect(switchSpy).toHaveBeenCalledWith('camera2');
    }, 15000);
  });
  
  describe('Camera Switching During Detection', () => {
    let app;
    let container;
    
    beforeEach(() => {
      container = document.createElement('div');
      container.id = 'app';
      document.body.appendChild(container);
      
      app = new FaceDetectionApp();
    });
    
    afterEach(() => {
      if (container.parentNode) {
        document.body.removeChild(container);
      }
    });
    
    test('should maintain detection state when switching cameras', async () => {
      app.setupUI();
      
      // Mock the detection state
      app.detectionInterval = setInterval(() => {}, 100);
      
      const stopDetectionSpy = jest.spyOn(app, 'stopDetection').mockImplementation(() => {});
      const startDetectionSpy = jest.spyOn(app, 'startDetection').mockImplementation(() => {});
      
      await app.switchCamera('camera2');
      
      expect(stopDetectionSpy).toHaveBeenCalled();
      expect(startDetectionSpy).toHaveBeenCalled();
      
      clearInterval(app.detectionInterval);
    });
    
    test('should handle camera switch errors gracefully', async () => {
      app.setupUI();
      
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      mockGetUserMedia.mockRejectedValueOnce(new Error('Camera not available'));
      
      await app.switchCamera('invalid-camera');
      
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to switch camera:',
        expect.any(Error)
      );
      
      consoleErrorSpy.mockRestore();
    });
  });
  
  describe('Stream Information', () => {
    test('should get current stream information', async () => {
      await cameraManager.startCamera(mockVideoElement);
      
      const info = cameraManager.getStreamInfo();
      
      expect(info).toEqual({
        width: 640,
        height: 480,
        frameRate: 30,
        deviceId: 'camera1',
        facingMode: undefined,
        label: undefined
      });
    });
    
    test('should return null if no active stream', () => {
      const info = cameraManager.getStreamInfo();
      expect(info).toBeNull();
    });
  });
});