import * as tf from '@tensorflow/tfjs';
import * as faceapi from '@vladmandic/face-api';
import { testModelCompatibility } from '../../src/wasmCompatibility.js';

jest.mock('@tensorflow/tfjs', () => ({ setBackend: jest.fn(), ready: jest.fn() }));
jest.mock('@vladmandic/face-api', () => ({
  nets: {
    tinyFaceDetector: { loadFromUri: jest.fn() },
    ssdMobilenetv1: { loadFromUri: jest.fn() },
    faceLandmark68Net: { loadFromUri: jest.fn() },
    faceExpressionNet: { loadFromUri: jest.fn() },
    ageGenderNet: { loadFromUri: jest.fn() }
  },
  detectAllFaces: jest.fn(),
  TinyFaceDetectorOptions: jest.fn(),
  SsdMobilenetv1Options: jest.fn()
}));

beforeEach(() => {
  jest.clearAllMocks();
  tf.setBackend.mockResolvedValue(true);
  tf.ready.mockResolvedValue();
  for (const net of Object.values(faceapi.nets)) net.loadFromUri.mockResolvedValue();
  faceapi.detectAllFaces.mockImplementation(() => {
    const detections = Promise.resolve([]);
    detections.withFaceLandmarks = jest.fn().mockResolvedValue([]);
    detections.withFaceExpressions = jest.fn().mockResolvedValue([]);
    detections.withAgeAndGender = jest.fn().mockResolvedValue([]);
    return detections;
  });
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    fillRect: jest.fn(), beginPath: jest.fn(), arc: jest.fn(), fill: jest.fn(), stroke: jest.fn()
  });
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => jest.restoreAllMocks());

test('checks each supported model against the WASM backend and /models', async () => {
  const result = await testModelCompatibility();

  expect(tf.setBackend).toHaveBeenCalledWith('wasm');
  expect(tf.ready).toHaveBeenCalled();
  for (const net of Object.values(faceapi.nets)) {
    expect(net.loadFromUri).toHaveBeenCalledWith('/models');
  }
  expect(result).toMatchObject({
    tinyFaceDetector: true,
    ssdMobilenetv1: true,
    faceLandmark68Net: true,
    faceExpressionNet: true,
    ageGenderNet: true
  });
});

test('reports one model failure without hiding the other compatibility results', async () => {
  faceapi.nets.ssdMobilenetv1.loadFromUri.mockRejectedValue(new Error('missing SSD weights'));

  const result = await testModelCompatibility();

  expect(result.ssdMobilenetv1).toBe(false);
  expect(result.tinyFaceDetector).toBe(true);
  expect(result.faceLandmark68Net).toBe(true);
  expect(result.faceExpressionNet).toBe(true);
  expect(result.ageGenderNet).toBe(true);
  expect(console.error).toHaveBeenCalledWith('SsdMobilenetv1 compatibility error:', expect.any(Error));
});

test('surfaces backend initialization errors before claiming any model is compatible', async () => {
  tf.setBackend.mockRejectedValueOnce(new Error('WASM unavailable'));

  await expect(testModelCompatibility()).rejects.toThrow('WASM unavailable');
  expect(faceapi.detectAllFaces).not.toHaveBeenCalled();
});
