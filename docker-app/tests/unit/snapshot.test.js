/**
 * Snapshot Feature Tests
 * Tests the saveSnapshot functionality that allows users to download annotated face detection results
 */

import { setupMockDOM } from '../test-utils/mockHelpers.js';

// Mock TensorFlow.js before importing the app
jest.mock('@vladmandic/face-api', () => {
  const mockFaceDetection = {
    detection: {
      box: { x: 100, y: 100, width: 200, height: 200 },
      score: 0.95
    },
    landmarks: {
      positions: Array(68).fill(0).map((_, i) => ({ x: i * 2, y: i * 3 }))
    },
    expressions: { happy: 0.8, neutral: 0.2 },
    age: 25,
    gender: 'male',
    genderProbability: 0.92
  };

  const mockDetectionChain = {
    withFaceLandmarks: jest.fn(() => ({
      withFaceExpressions: jest.fn(() => ({
        withAgeAndGender: jest.fn(() => Promise.resolve([mockFaceDetection]))
      }))
    }))
  };

  return {
    nets: {
      tinyFaceDetector: { loadFromUri: jest.fn(() => Promise.resolve()) },
      faceLandmark68Net: { loadFromUri: jest.fn(() => Promise.resolve()) },
      faceRecognitionNet: { loadFromUri: jest.fn(() => Promise.resolve()) },
      faceExpressionNet: { loadFromUri: jest.fn(() => Promise.resolve()) },
      ageGenderNet: { loadFromUri: jest.fn(() => Promise.resolve()) },
      ssdMobilenetv1: { loadFromUri: jest.fn(() => Promise.resolve()) }
    },
    detectAllFaces: jest.fn(() => mockDetectionChain),
    detectSingleFace: jest.fn(() => mockDetectionChain),
    TinyFaceDetectorOptions: jest.fn(function(options) { return options || {}; }),
    SsdMobilenetv1Options: jest.fn(function(options) { return options || {}; }),
    resizeResults: jest.fn((detections, displaySize) => detections),
    draw: {
      drawDetections: jest.fn(),
      drawFaceLandmarks: jest.fn(),
      drawFaceExpressions: jest.fn()
    },
    env: {
      monkeyPatch: jest.fn()
    }
  };
});

// Mock TensorFlow.js
jest.mock('@tensorflow/tfjs', () => ({
  setBackend: jest.fn(() => Promise.resolve()),
  ready: jest.fn(() => Promise.resolve()),
  getBackend: jest.fn(() => 'cpu'),
  removeBackend: jest.fn(),
  enableProdMode: jest.fn(),
  disposeVariables: jest.fn()
}));

// Mock the WASM backend module
jest.mock('../src/wasmBackend.js', () => ({
  initializeWASMBackend: jest.fn(() => Promise.resolve({ backend: 'wasm', fallback: false })),
  getBackendPerformance: jest.fn(() => ({
    features: { simd: true, threads: false },
    backend: 'wasm'
  })),
  BackendMonitor: jest.fn().mockImplementation(() => ({
    startInference: jest.fn(() => Date.now()),
    endInference: jest.fn(),
    getReport: jest.fn(() => ({
      averageInferenceTime: 50,
      currentMemory: { numBytes: 1000000 }
    })),
    reset: jest.fn()
  }))
}));

// Mock other modules
jest.mock('../src/registerServiceWorker.js', () => ({
  registerServiceWorker: jest.fn()
}));

jest.mock('../src/liteMode.js', () => ({
  LiteModeDetector: jest.fn().mockImplementation(() => ({
    initialize: jest.fn(() => Promise.resolve()),
    start: jest.fn(),
    stop: jest.fn(),
    cleanup: jest.fn(() => Promise.resolve()),
    detector: { loadModel: jest.fn(() => Promise.resolve()) }
  }))
}));

jest.mock('../src/proMode.js', () => ({
  ProMode: jest.fn().mockImplementation(() => ({
    loadModels: jest.fn(() => Promise.resolve()),
    detectFaces: jest.fn(() => Promise.resolve([])),
    drawDetections: jest.fn(),
    toggleFeature: jest.fn()
  }))
}));

describe('Snapshot Feature', () => {
  let app;
  let mockVideo;
  let mockCanvas;

  beforeEach(() => {
    // Setup mock DOM
    setupMockDOM();

    // Create mock video and canvas elements with proper getters
    mockVideo = document.createElement('video');
    mockCanvas = document.createElement('canvas');

    Object.defineProperty(mockVideo, 'videoWidth', {
      value: 640,
      writable: false,
      configurable: true
    });
    Object.defineProperty(mockVideo, 'videoHeight', {
      value: 480,
      writable: false,
      configurable: true
    });

    mockCanvas.width = 640;
    mockCanvas.height = 480;

    document.body.appendChild(mockVideo);
    document.body.appendChild(mockCanvas);
  });

  afterEach(() => {
    if (document.body.contains(mockVideo)) {
      document.body.removeChild(mockVideo);
    }
    if (document.body.contains(mockCanvas)) {
      document.body.removeChild(mockCanvas);
    }
  });

  describe('saveSnapshot method', () => {
    it('should have saveSnapshot method available in FaceDetectionApp class', async () => {
      // Dynamically import the module to ensure mocks are applied
      const { FaceDetectionApp } = await import('../src/index-wasm.js');

      app = new FaceDetectionApp();

      expect(typeof app.saveSnapshot).toBe('function');
    });

    it('should handle missing video element gracefully', async () => {
      const { FaceDetectionApp } = await import('../src/index-wasm.js');

      app = new FaceDetectionApp();
      app.video = null;
      app.canvas = mockCanvas;

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => app.saveSnapshot()).not.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Video or canvas not available for snapshot');

      consoleErrorSpy.mockRestore();
    });

    it('should handle missing canvas element gracefully', async () => {
      const { FaceDetectionApp } = await import('../src/index-wasm.js');

      app = new FaceDetectionApp();
      app.video = mockVideo;
      app.canvas = null;

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => app.saveSnapshot()).not.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Video or canvas not available for snapshot');

      consoleErrorSpy.mockRestore();
    });

    it('should create snapshot with proper canvas compositing', async () => {
      const { FaceDetectionApp } = await import('../src/index-wasm.js');

      app = new FaceDetectionApp();
      app.video = mockVideo;
      app.canvas = mockCanvas;

      // Mock canvas methods
      const mockContext = {
        save: jest.fn(),
        restore: jest.fn(),
        translate: jest.fn(),
        scale: jest.fn(),
        drawImage: jest.fn(),
      };

      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = 640;
      offscreenCanvas.height = 480;

      jest.spyOn(offscreenCanvas, 'getContext').mockReturnValue(mockContext);
      jest.spyOn(offscreenCanvas, 'toDataURL').mockReturnValue('data:image/png;base64,mockdata');

      const createElementSpy = jest.spyOn(document, 'createElement')
        .mockImplementation((tag) => {
          if (tag === 'canvas') return offscreenCanvas;
          return document.createElement(tag);
        });

      const mockLink = {
        download: '',
        href: '',
        click: jest.fn(),
      };

      createElementSpy.mockImplementation((tag) => {
        if (tag === 'canvas') return offscreenCanvas;
        if (tag === 'a') return mockLink;
        return document.createElement(tag);
      });

      const appendChildSpy = jest.spyOn(document.body, 'appendChild');
      const removeChildSpy = jest.spyOn(document.body, 'removeChild');

      app.saveSnapshot();

      // Verify canvas operations
      expect(mockContext.save).toHaveBeenCalledTimes(2);
      expect(mockContext.translate).toHaveBeenCalledTimes(2);
      expect(mockContext.scale).toHaveBeenCalledTimes(2);
      expect(mockContext.scale).toHaveBeenCalledWith(-1, 1); // Mirroring
      expect(mockContext.drawImage).toHaveBeenCalledTimes(2);
      expect(mockContext.restore).toHaveBeenCalledTimes(2);

      // Verify download
      expect(offscreenCanvas.toDataURL).toHaveBeenCalledWith('image/png');
      expect(mockLink.download).toMatch(/face-detection-snapshot-.*\.png/);
      expect(mockLink.href).toBe('data:image/png;base64,mockdata');
      expect(mockLink.click).toHaveBeenCalled();
      expect(appendChildSpy).toHaveBeenCalledWith(mockLink);
      expect(removeChildSpy).toHaveBeenCalledWith(mockLink);

      createElementSpy.mockRestore();
      appendChildSpy.mockRestore();
      removeChildSpy.mockRestore();
    });

    it('should use timestamp in snapshot filename', async () => {
      const { FaceDetectionApp } = await import('../src/index-wasm.js');

      app = new FaceDetectionApp();
      app.video = mockVideo;
      app.canvas = mockCanvas;

      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = 640;
      offscreenCanvas.height = 480;

      jest.spyOn(offscreenCanvas, 'getContext').mockReturnValue({});
      jest.spyOn(offscreenCanvas, 'toDataURL').mockReturnValue('data:image/png;base64,mockdata');

      const mockLink = {
        download: '',
        href: '',
        click: jest.fn(),
      };

      jest.spyOn(document, 'createElement')
        .mockImplementation((tag) => {
          if (tag === 'canvas') return offscreenCanvas;
          if (tag === 'a') return mockLink;
          return document.createElement(tag);
        });

      jest.spyOn(document.body, 'appendChild');
      jest.spyOn(document.body, 'removeChild');

      app.saveSnapshot();

      // Verify filename pattern: face-detection-snapshot-YYYY-MM-DDTHH-MM-SS.png
      expect(mockLink.download).toMatch(/^face-detection-snapshot-\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}/);
      expect(mockLink.download).toMatch(/\.png$/);

      jest.restoreAllMocks();
    });
  });
});
