jest.mock('face-api.js');

import { 
  setupMockDOM, 
  createMockNavigator, 
  mockFaceApiModels,
  flushPromises 
} from '../test-utils/mockHelpers.js';


import { FaceDetectionApp } from '../../src/index.js';
import * as faceapi from 'face-api.js';

describe('FaceDetectionApp Initialization', () => {
  let app;
  let mockGetUserMedia;

  beforeEach(() => {
    setupMockDOM();
    mockGetUserMedia = createMockNavigator(true);
    app = new FaceDetectionApp();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    test('should initialize with default values', () => {
      expect(app.video).toBeNull();
      expect(app.canvas).toBeNull();
      expect(app.isModelLoaded).toBe(false);
      expect(app.isVideoReady).toBe(false);
    });
  });

  describe('init', () => {
    test('should successfully initialize the app', async () => {
      const loadModelsSpy = jest.spyOn(app, 'loadModels');
      const setupUISpy = jest.spyOn(app, 'setupUI');
      const setupCameraSpy = jest.spyOn(app, 'setupCamera');
      const startDetectionSpy = jest.spyOn(app, 'startDetection');

      await app.init();

      expect(loadModelsSpy).toHaveBeenCalled();
      expect(setupUISpy).toHaveBeenCalled();
      expect(setupCameraSpy).toHaveBeenCalled();
      expect(startDetectionSpy).toHaveBeenCalled();
    });

    test('should handle initialization errors gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const showErrorSpy = jest.spyOn(app, 'showError');
      jest.spyOn(app, 'loadModels').mockRejectedValue(new Error('Model loading failed'));

      await app.init();

      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to initialize app:', expect.any(Error));
      expect(showErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Failed to initialize'));
    });
  });

  describe('loadModels', () => {
    test('should load all required face-api models', async () => {
      await app.loadModels();

      expect(faceapi.nets.tinyFaceDetector.loadFromUri).toHaveBeenCalledWith('/models');
      expect(faceapi.nets.faceLandmark68Net.loadFromUri).toHaveBeenCalledWith('/models');
      expect(faceapi.nets.faceRecognitionNet.loadFromUri).toHaveBeenCalledWith('/models');
      expect(faceapi.nets.faceExpressionNet.loadFromUri).toHaveBeenCalledWith('/models');
      expect(faceapi.nets.ageGenderNet.loadFromUri).toHaveBeenCalledWith('/models');
      expect(app.isModelLoaded).toBe(true);
    });

    test('should handle model loading failure', async () => {
      faceapi.nets.tinyFaceDetector.loadFromUri.mockRejectedValue(new Error('Network error'));

      await expect(app.loadModels()).rejects.toThrow('Failed to load face detection models');
      expect(app.isModelLoaded).toBe(false);
    });

    test('should log success message when models are loaded', async () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      
      await app.loadModels();

      expect(consoleLogSpy).toHaveBeenCalledWith('Face detection models loaded successfully');
    });
  });

  describe('setupUI', () => {
    test('should create all required UI elements', () => {
      app.setupUI();

      const appElement = document.getElementById('app');
      expect(appElement.innerHTML).toContain('Face Detection App');
      expect(document.getElementById('video')).toBeTruthy();
      expect(document.getElementById('overlay')).toBeTruthy();
      expect(document.getElementById('startBtn')).toBeTruthy();
      expect(document.getElementById('stopBtn')).toBeTruthy();
      expect(document.getElementById('stats')).toBeTruthy();
    });

    test('should store references to video and canvas elements', () => {
      app.setupUI();

      expect(app.video).toBe(document.getElementById('video'));
      expect(app.canvas).toBe(document.getElementById('overlay'));
    });

    test('should setup event listeners for control buttons', () => {
      app.setupUI();
      
      const startBtn = document.getElementById('startBtn');
      const stopBtn = document.getElementById('stopBtn');
      
      const addEventListenerSpy = jest.spyOn(startBtn, 'addEventListener');
      app.setupUI();

      expect(startBtn.onclick).toBeTruthy();
      expect(stopBtn.onclick).toBeTruthy();
    });

    test('should have stop button disabled initially', () => {
      app.setupUI();
      
      const stopBtn = document.getElementById('stopBtn');
      expect(stopBtn.disabled).toBe(true);
    });
  });

  describe('Model loading timeout', () => {
    test('should timeout if models take too long to load', async () => {
      jest.setTimeout(10000);
      
      // Mock slow loading
      faceapi.nets.tinyFaceDetector.loadFromUri.mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 5000))
      );

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 3000)
      );

      await expect(
        Promise.race([app.loadModels(), timeoutPromise])
      ).rejects.toThrow('Timeout');
    });
  });
});
