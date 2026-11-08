import * as faceapi from '@vladmandic/face-api';
import { initializeWASMBackend, getBackendPerformance } from '../../src/wasmBackend.js';
import { registerServiceWorker } from '../../src/registerServiceWorker.js';
import { FaceDetectionApp } from '../../src/index-wasm.js';
import { ProMode } from '../../src/proMode.js';
const webpackConfig = require('../../webpack.common.js');

jest.mock('@vladmandic/face-api', () => ({
  env: { monkeyPatch: jest.fn() },
  nets: {
    tinyFaceDetector: { loadFromUri: jest.fn() },
    ssdMobilenetv1: { loadFromUri: jest.fn() },
    faceLandmark68Net: { loadFromUri: jest.fn() },
    faceExpressionNet: { loadFromUri: jest.fn() },
    ageGenderNet: { loadFromUri: jest.fn() }
  },
  SsdMobilenetv1Options: jest.fn()
}));
jest.mock('../../src/wasmBackend.js', () => ({
  initializeWASMBackend: jest.fn(),
  getBackendPerformance: jest.fn(),
  BackendMonitor: jest.fn().mockImplementation(() => ({ reset: jest.fn() }))
}));
jest.mock('../../src/registerServiceWorker.js', () => ({ registerServiceWorker: jest.fn() }));

beforeEach(() => {
  jest.clearAllMocks();
  document.body.innerHTML = '<div id="app">Loading face detection...</div>';
  global.ImageData = global.ImageData || class ImageData {};
  faceapi.env.monkeyPatch.mockResolvedValue();
  for (const net of Object.values(faceapi.nets)) net.loadFromUri.mockResolvedValue();
  initializeWASMBackend.mockResolvedValue({ backend: 'wasm', fallback: false });
  getBackendPerformance.mockReturnValue({ features: { simd: true, threads: false } });
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(FaceDetectionApp.prototype, 'loadCameraList').mockResolvedValue();
});

afterEach(() => jest.restoreAllMocks());

test('production entry starts on DOM readiness and registers its service worker', () => {
  expect(webpackConfig.entry).toBe('./src/index-wasm.js');
  const init = jest.spyOn(FaceDetectionApp.prototype, 'init').mockResolvedValue();

  document.dispatchEvent(new Event('DOMContentLoaded'));

  expect(registerServiceWorker).toHaveBeenCalledTimes(1);
  expect(init).toHaveBeenCalledTimes(1);
  expect(window.app).toBeInstanceOf(FaceDetectionApp);
});

test('initializes models from /models and displays the selected backend', async () => {
  const app = new FaceDetectionApp();
  jest.spyOn(app, 'setupCamera').mockResolvedValue();
  jest.spyOn(app, 'startDetection').mockImplementation(() => {});

  await app.init();

  expect(faceapi.nets.tinyFaceDetector.loadFromUri).toHaveBeenCalledWith('/models');
  expect(app.isModelLoaded).toBe(true);
  expect(document.getElementById('backend-info')).toHaveTextContent('WASM ACTIVE');
  expect(app.startDetection).toHaveBeenCalled();
});

test('continues with a fallback backend and shows it to the user', async () => {
  initializeWASMBackend.mockResolvedValue({ backend: 'webgl', fallback: true });
  const app = new FaceDetectionApp();
  jest.spyOn(app, 'setupCamera').mockResolvedValue();
  jest.spyOn(app, 'startDetection').mockImplementation(() => {});

  await app.init();

  expect(app.backendType).toBe('webgl');
  expect(document.getElementById('backend-info')).toHaveTextContent('WEBGL MODE');
  expect(app.startDetection).toHaveBeenCalled();
});

test.each([
  ['backend', () => initializeWASMBackend.mockRejectedValue(new Error('all backends failed')),
    'Failed to initialize a processing backend'],
  ['models', () => faceapi.nets.tinyFaceDetector.loadFromUri.mockRejectedValue(new Error('missing weights')),
    'Failed to load face detection models'],
  ['camera', () => {}, 'Please check your camera permissions']
])('shows a useful error when %s initialization fails', async (stage, fail, message) => {
  fail();
  const app = new FaceDetectionApp();
  jest.spyOn(app, 'setupCamera').mockImplementation(
    stage === 'camera' ? () => Promise.reject(new Error('permission denied')) : () => Promise.resolve()
  );
  jest.spyOn(app, 'startDetection').mockImplementation(() => {});

  await app.init();

  expect(document.querySelector('#app .error')).toHaveTextContent(message);
  expect(app.startDetection).not.toHaveBeenCalled();
});

test('Pro Mode loads exactly the models needed by its detection pipeline', async () => {
  const mode = new ProMode();

  await mode.loadModels();

  for (const name of ['ssdMobilenetv1', 'faceLandmark68Net', 'faceExpressionNet', 'ageGenderNet']) {
    expect(faceapi.nets[name].loadFromUri).toHaveBeenCalledWith('/models');
  }
  expect(mode.modelsLoaded).toBe(true);
});
