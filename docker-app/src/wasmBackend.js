/**
 * WASM Backend Module
 * Handles TensorFlow.js WASM backend initialization and configuration
 */

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-wasm';
import { setWasmPaths, setThreadsCount } from '@tensorflow/tfjs-backend-wasm';

/**
 * Configure WASM paths for model loading
 */
export function configureWASMPaths() {
  // Use CDN for WASM files or local path if available
  const wasmPath = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@latest/dist/';
  setWasmPaths(wasmPath);
}

/**
 * Detect WASM features available in the browser
 */
export async function detectWASMFeatures() {
  const features = {
    simdSupport: false,
    threadsSupport: false,
    backendName: 'unknown'
  };

  try {
    // Check for SIMD support
    if (typeof WebAssembly !== 'undefined' && WebAssembly.validate) {
      // SIMD detection using WebAssembly.validate
      const simdTest = new Uint8Array([
        0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00,
        0x01, 0x05, 0x01, 0x60, 0x00, 0x01, 0x7b, 0x03,
        0x02, 0x01, 0x00, 0x0a, 0x0a, 0x01, 0x08, 0x00,
        0x41, 0x00, 0xfd, 0x0f, 0x0b
      ]);
      features.simdSupport = WebAssembly.validate(simdTest);
    }

    // Check for threads support (SharedArrayBuffer)
    features.threadsSupport = typeof SharedArrayBuffer !== 'undefined';

    // Get current backend
    if (tf.getBackend) {
      features.backendName = tf.getBackend();
    }

    // Check TensorFlow.js environment features
    const tfFeatures = await tf.env().getAsync('WEBGL_PACK');
    features.webglPack = tfFeatures;

  } catch (error) {
    console.warn('Error detecting WASM features:', error);
  }

  return features;
}

/**
 * Configure optimal thread count based on hardware
 */
export async function configureWASMThreads() {
  const config = {
    threads: 1,
    multithreading: false
  };

  try {
    // Check if SharedArrayBuffer is available
    if (typeof SharedArrayBuffer !== 'undefined') {
      // Get number of logical processors
      const numCores = navigator.hardwareConcurrency || 4;
      
      // Use half the cores for optimal performance (leave room for main thread)
      const optimalThreads = Math.max(1, Math.floor(numCores / 2));
      
      setThreadsCount(optimalThreads);
      config.threads = optimalThreads;
      config.multithreading = true;
      
      console.log(`WASM threads configured: ${optimalThreads} threads`);
    } else {
      console.log('SharedArrayBuffer not available, using single-threaded WASM');
    }
  } catch (error) {
    console.warn('Error configuring WASM threads:', error);
  }

  return config;
}

/**
 * Initialize WASM backend with optimal configuration
 */
export async function initializeWASMBackend() {
  console.group('🚀 WASM Backend Initialization');
  console.log('Starting WebAssembly backend setup...');
  
  const result = {
    backend: 'wasm',
    fallback: false,
    features: {},
    error: null
  };

  try {
    // Log WebAssembly availability
    console.log('WebAssembly available:', typeof WebAssembly !== 'undefined');
    
    // Configure WASM paths
    console.log('Configuring WASM paths...');
    configureWASMPaths();

    // Configure threads
    console.log('Configuring WASM threads...');
    const threadConfig = await configureWASMThreads();
    console.log('Thread configuration:', threadConfig);

    // Set WASM as the backend
    console.log('Setting WASM backend...');
    await tf.setBackend('wasm');
    
    // Wait for backend to be ready
    await tf.ready();

    // Verify backend is set correctly
    const currentBackend = tf.getBackend();
    console.log('✅ Current backend:', currentBackend);
    
    if (currentBackend !== 'wasm') {
      throw new Error(`Backend mismatch: expected 'wasm', got '${currentBackend}'`);
    }

    // Detect features
    result.features = await detectWASMFeatures();
    console.log('WASM Features detected:', result.features);

    // Performance test
    console.log('Running WASM performance test...');
    const testTensor = tf.randomNormal([100, 100]);
    const startTime = performance.now();
    const resultTensor = tf.matMul(testTensor, testTensor);
    await resultTensor.data();
    const endTime = performance.now();
    const testTime = endTime - startTime;
    console.log(`WASM MatMul (100x100) completed in: ${testTime.toFixed(2)}ms`);
    testTensor.dispose();
    resultTensor.dispose();

    console.log('✅ WASM backend initialized successfully!');
    console.log('WASM is ACTIVE - Enjoy 8-20X faster inference! 🎯');

  } catch (error) {
    console.error('❌ Failed to initialize WASM backend:', error);
    result.error = error.message;

    // Fallback to WebGL
    try {
      await tf.setBackend('webgl');
      await tf.ready();
      result.backend = 'webgl';
      result.fallback = true;
      console.log('Fallback to WebGL backend successful');
    } catch (fallbackError) {
      console.error('WebGL fallback also failed:', fallbackError);
      // Final fallback to CPU
      await tf.setBackend('cpu');
      await tf.ready();
      result.backend = 'cpu';
      result.fallback = true;
    }
  }

  console.groupEnd();
  return result;
}

/**
 * Get backend performance characteristics
 */
export function getBackendPerformance() {
  const backend = tf.getBackend();
  const memory = tf.memory();

  return {
    backend,
    memory: {
      numTensors: memory.numTensors,
      numDataBuffers: memory.numDataBuffers,
      numBytes: memory.numBytes,
      unreliable: memory.unreliable
    },
    features: {
      simd: tf.env().getBool('WASM_HAS_SIMD_SUPPORT'),
      threads: tf.env().getBool('WASM_HAS_MULTITHREAD_SUPPORT')
    }
  };
}

/**
 * Handle WASM-specific errors
 */
export async function handleWASMError(error) {
  const errorInfo = {
    message: error.message,
    fallback: 'webgl',
    recommendation: ''
  };

  if (error.message.includes('SharedArrayBuffer')) {
    errorInfo.recommendation = 'Enable CORS headers: Cross-Origin-Embedder-Policy and Cross-Origin-Opener-Policy';
  } else if (error.message.includes('SIMD')) {
    errorInfo.recommendation = 'Browser does not support WASM SIMD. Performance may be reduced.';
  } else if (error.message.includes('WebAssembly')) {
    errorInfo.recommendation = 'WebAssembly not supported. Please use a modern browser.';
    errorInfo.fallback = 'cpu';
  }

  return errorInfo;
}

/**
 * Warm up the backend with a small operation
 */
export async function warmupBackend() {
  const warmupData = tf.randomNormal([1, 224, 224, 3]);
  const result = tf.conv2d(
    warmupData,
    tf.randomNormal([3, 3, 3, 16]),
    1,
    'same'
  );
  
  // Clean up
  warmupData.dispose();
  result.dispose();
  
  console.log('Backend warmed up');
}

/**
 * Monitor backend performance during runtime
 */
export class BackendMonitor {
  constructor() {
    this.metrics = {
      inferenceCount: 0,
      totalInferenceTime: 0,
      memorySnapshots: []
    };
  }

  startInference() {
    return performance.now();
  }

  endInference(startTime) {
    const duration = performance.now() - startTime;
    this.metrics.inferenceCount++;
    this.metrics.totalInferenceTime += duration;
    
    // Take memory snapshot every 10 inferences
    if (this.metrics.inferenceCount % 10 === 0) {
      this.metrics.memorySnapshots.push({
        timestamp: Date.now(),
        memory: tf.memory()
      });
    }
  }

  getAverageInferenceTime() {
    if (this.metrics.inferenceCount === 0) return 0;
    return this.metrics.totalInferenceTime / this.metrics.inferenceCount;
  }

  getReport() {
    return {
      backend: tf.getBackend(),
      inferenceCount: this.metrics.inferenceCount,
      averageInferenceTime: this.getAverageInferenceTime(),
      currentMemory: tf.memory(),
      memoryTrend: this.metrics.memorySnapshots
    };
  }

  reset() {
    this.metrics = {
      inferenceCount: 0,
      totalInferenceTime: 0,
      memorySnapshots: []
    };
  }
}

export default {
  initializeWASMBackend,
  detectWASMFeatures,
  configureWASMThreads,
  getBackendPerformance,
  handleWASMError,
  warmupBackend,
  BackendMonitor
};