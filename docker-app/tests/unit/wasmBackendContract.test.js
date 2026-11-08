import * as tf from '@tensorflow/tfjs';
import { setWasmPaths, setThreadsCount } from '@tensorflow/tfjs-backend-wasm';
import {
  configureWASMThreads,
  detectWASMFeatures,
  initializeWASMBackend
} from '../../src/wasmBackend.js';

jest.mock('@tensorflow/tfjs', () => ({
  setBackend: jest.fn(),
  ready: jest.fn(),
  getBackend: jest.fn(),
  env: jest.fn(),
  randomNormal: jest.fn(),
  matMul: jest.fn()
}));
jest.mock('@tensorflow/tfjs-backend-wasm', () => ({
  setWasmPaths: jest.fn(),
  setThreadsCount: jest.fn()
}));

const originalWasm = Object.getOwnPropertyDescriptor(global, 'WebAssembly');
const originalSharedBuffer = Object.getOwnPropertyDescriptor(global, 'SharedArrayBuffer');

function setGlobal(name, value) {
  Object.defineProperty(global, name, { configurable: true, writable: true, value });
}

function restoreGlobal(name, descriptor) {
  if (descriptor) Object.defineProperty(global, name, descriptor);
  else delete global[name];
}

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'group').mockImplementation(() => {});
  jest.spyOn(console, 'groupEnd').mockImplementation(() => {});
  tf.setBackend.mockResolvedValue(true);
  tf.ready.mockResolvedValue();
  tf.getBackend.mockReturnValue('wasm');
  tf.env.mockReturnValue({ getAsync: jest.fn().mockResolvedValue(true) });
  const input = { dispose: jest.fn() };
  const output = { data: jest.fn().mockResolvedValue(new Float32Array(1)), dispose: jest.fn() };
  tf.randomNormal.mockReturnValue(input);
  tf.matMul.mockReturnValue(output);
});

afterEach(() => {
  restoreGlobal('WebAssembly', originalWasm);
  restoreGlobal('SharedArrayBuffer', originalSharedBuffer);
  jest.restoreAllMocks();
});

test('initializes self-hosted WASM, probes features, and disposes the test tensors', async () => {
  setGlobal('WebAssembly', { validate: jest.fn().mockReturnValue(true) });
  setGlobal('SharedArrayBuffer', class SharedArrayBuffer {});
  Object.defineProperty(navigator, 'hardwareConcurrency', { configurable: true, value: 8 });

  const result = await initializeWASMBackend();

  expect(result).toMatchObject({ backend: 'wasm', fallback: false, error: null });
  expect(result.features).toMatchObject({ simdSupport: true, threadsSupport: true, backendName: 'wasm' });
  expect(setWasmPaths).toHaveBeenCalledWith('/wasm/');
  expect(setThreadsCount).toHaveBeenCalledWith(4);
  expect(tf.setBackend).toHaveBeenCalledWith('wasm');
  expect(tf.matMul).toHaveBeenCalled();
  expect(tf.randomNormal.mock.results[0].value.dispose).toHaveBeenCalled();
  expect(tf.matMul.mock.results[0].value.dispose).toHaveBeenCalled();
});

test('reports an unsupported environment and uses single-threaded WASM', async () => {
  setGlobal('WebAssembly', undefined);
  setGlobal('SharedArrayBuffer', undefined);

  expect(await detectWASMFeatures()).toMatchObject({
    simdSupport: false, threadsSupport: false, backendName: 'wasm'
  });
  expect(await configureWASMThreads()).toEqual({ threads: 1, multithreading: false });
  expect(setThreadsCount).not.toHaveBeenCalled();
});

test('falls back to WebGL when WASM initialization fails', async () => {
  tf.setBackend.mockRejectedValueOnce(new Error('WASM unavailable'));
  tf.getBackend.mockReturnValue('webgl');

  const result = await initializeWASMBackend();

  expect(result).toMatchObject({ backend: 'webgl', fallback: true, error: 'WASM unavailable' });
  expect(tf.setBackend.mock.calls.map(([backend]) => backend)).toEqual(['wasm', 'webgl']);
});

test('falls back to CPU if WASM and WebGL both fail', async () => {
  tf.setBackend.mockRejectedValueOnce(new Error('WASM unavailable'))
    .mockRejectedValueOnce(new Error('WebGL unavailable'));

  const result = await initializeWASMBackend();

  expect(result).toMatchObject({ backend: 'cpu', fallback: true, error: 'WASM unavailable' });
  expect(tf.setBackend.mock.calls.map(([backend]) => backend)).toEqual(['wasm', 'webgl', 'cpu']);
});
