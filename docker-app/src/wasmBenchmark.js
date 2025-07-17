/**
 * WASM Benchmark Module
 * Performance comparison between WebGL and WASM backends
 */

import * as tf from '@tensorflow/tfjs';
import * as faceapi from '@vladmandic/face-api';

/**
 * Run inference benchmark on a specific backend
 */
async function benchmarkBackend(backend, iterations = 10) {
  // Switch to specified backend
  await tf.setBackend(backend);
  await tf.ready();

  const results = {
    backend,
    iterations,
    times: [],
    avgInferenceTime: 0,
    minTime: Infinity,
    maxTime: 0,
    memory: {}
  };

  // Create dummy video element for testing
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 480;
  const ctx = canvas.getContext('2d');
  
  // Generate test image
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 640, 480);
  
  // Draw a simple face-like shape for testing
  ctx.fillStyle = '#ffdbac';
  ctx.beginPath();
  ctx.arc(320, 240, 100, 0, 2 * Math.PI);
  ctx.fill();

  // Warm up
  await faceapi.detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions());

  // Run benchmark
  for (let i = 0; i < iterations; i++) {
    const startMemory = tf.memory();
    const startTime = performance.now();
    
    // Perform detection
    const detections = await faceapi
      .detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    
    const endTime = performance.now();
    const endMemory = tf.memory();
    
    const inferenceTime = endTime - startTime;
    results.times.push(inferenceTime);
    results.minTime = Math.min(results.minTime, inferenceTime);
    results.maxTime = Math.max(results.maxTime, inferenceTime);
    
    // Track memory delta
    if (i === iterations - 1) {
      results.memory = {
        start: startMemory,
        end: endMemory,
        delta: {
          numTensors: endMemory.numTensors - startMemory.numTensors,
          numBytes: endMemory.numBytes - startMemory.numBytes
        }
      };
    }
  }

  // Calculate average
  results.avgInferenceTime = results.times.reduce((a, b) => a + b, 0) / iterations;
  
  // Calculate standard deviation
  const variance = results.times.reduce((acc, time) => {
    return acc + Math.pow(time - results.avgInferenceTime, 2);
  }, 0) / iterations;
  results.stdDev = Math.sqrt(variance);

  return results;
}

/**
 * Compare performance between WebGL and WASM
 */
export async function performanceComparison(iterations = 20) {
  console.log('Starting performance comparison...');
  
  const comparison = {
    webgl: null,
    wasm: null,
    speedup: 0,
    recommendation: ''
  };

  try {
    // Benchmark WebGL
    console.log('Benchmarking WebGL backend...');
    comparison.webgl = await benchmarkBackend('webgl', iterations);
    
    // Benchmark WASM
    console.log('Benchmarking WASM backend...');
    comparison.wasm = await benchmarkBackend('wasm', iterations);
    
    // Calculate speedup
    comparison.speedup = comparison.webgl.avgInferenceTime / comparison.wasm.avgInferenceTime;
    
    // Make recommendation
    if (comparison.speedup > 1.2) {
      comparison.recommendation = 'WASM provides significant performance improvement';
    } else if (comparison.speedup > 0.8) {
      comparison.recommendation = 'Performance is comparable between backends';
    } else {
      comparison.recommendation = 'WebGL performs better for this workload';
    }
    
    console.log('Performance comparison complete:', {
      webglAvg: comparison.webgl.avgInferenceTime.toFixed(2) + 'ms',
      wasmAvg: comparison.wasm.avgInferenceTime.toFixed(2) + 'ms',
      speedup: comparison.speedup.toFixed(2) + 'x',
      recommendation: comparison.recommendation
    });
    
  } catch (error) {
    console.error('Error during performance comparison:', error);
    comparison.error = error.message;
  }

  return comparison;
}

/**
 * Measure memory usage patterns
 */
export async function measureMemoryUsage() {
  const memoryStats = {
    beforeInference: null,
    afterInference: null,
    peakUsage: null,
    leaks: []
  };

  // Initial memory state
  memoryStats.beforeInference = tf.memory();

  // Create test scenario
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 480;

  // Track memory during multiple inferences
  const memorySnapshots = [];
  
  for (let i = 0; i < 5; i++) {
    const detections = await faceapi
      .detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks();
    
    const snapshot = tf.memory();
    memorySnapshots.push(snapshot);
    
    // Check for memory leaks
    if (i > 0) {
      const prevSnapshot = memorySnapshots[i - 1];
      if (snapshot.numTensors > prevSnapshot.numTensors + 10) {
        memoryStats.leaks.push({
          iteration: i,
          tensorLeak: snapshot.numTensors - prevSnapshot.numTensors
        });
      }
    }
  }

  // Final memory state
  memoryStats.afterInference = tf.memory();
  
  // Find peak usage
  memoryStats.peakUsage = memorySnapshots.reduce((peak, snapshot) => {
    return snapshot.numBytes > peak.numBytes ? snapshot : peak;
  }, memorySnapshots[0]);

  return memoryStats;
}

/**
 * Measure FPS for real-time performance
 */
export async function measureFPS(backend, duration = 5000) {
  await tf.setBackend(backend);
  await tf.ready();

  const fpsData = {
    backend,
    frames: 0,
    times: [],
    average: 0,
    min: Infinity,
    max: 0
  };

  // Create test video
  const video = document.createElement('video');
  video.width = 640;
  video.height = 480;
  
  // Mock video with canvas
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 480;

  const startTime = performance.now();
  let lastFrameTime = startTime;

  // Run detection loop
  while (performance.now() - startTime < duration) {
    const frameStart = performance.now();
    
    await faceapi.detectAllFaces(
      canvas,
      new faceapi.TinyFaceDetectorOptions({ inputSize: 320 })
    );
    
    const frameEnd = performance.now();
    const frameTime = frameEnd - frameStart;
    const fps = 1000 / (frameEnd - lastFrameTime);
    
    fpsData.frames++;
    fpsData.times.push(fps);
    fpsData.min = Math.min(fpsData.min, fps);
    fpsData.max = Math.max(fpsData.max, fps);
    
    lastFrameTime = frameEnd;
  }

  // Calculate average FPS
  fpsData.average = fpsData.times.reduce((a, b) => a + b, 0) / fpsData.times.length;

  return fpsData;
}

/**
 * Profile different model sizes
 */
export async function profileModelSizes() {
  const models = [
    {
      name: 'TinyFaceDetector',
      options: new faceapi.TinyFaceDetectorOptions({ inputSize: 128 }),
      size: 'small'
    },
    {
      name: 'TinyFaceDetector',
      options: new faceapi.TinyFaceDetectorOptions({ inputSize: 320 }),
      size: 'medium'
    },
    {
      name: 'SsdMobilenetv1',
      options: new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }),
      size: 'large'
    }
  ];

  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 480;

  const results = [];

  for (const model of models) {
    console.log(`Profiling ${model.name} (${model.size})...`);
    
    const webglTime = await benchmarkModel('webgl', canvas, model.options);
    const wasmTime = await benchmarkModel('wasm', canvas, model.options);
    
    results.push({
      model: model.name,
      size: model.size,
      webgl: webglTime,
      wasm: wasmTime,
      speedup: webglTime / wasmTime
    });
  }

  return results;
}

/**
 * Benchmark a specific model
 */
async function benchmarkModel(backend, input, options, iterations = 10) {
  await tf.setBackend(backend);
  await tf.ready();

  let totalTime = 0;

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    await faceapi.detectAllFaces(input, options);
    totalTime += performance.now() - start;
  }

  return totalTime / iterations;
}

/**
 * Generate performance report
 */
export async function generatePerformanceReport() {
  const report = {
    timestamp: new Date().toISOString(),
    environment: {
      userAgent: navigator.userAgent,
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: navigator.deviceMemory || 'unknown'
    },
    backends: {},
    comparison: null,
    modelProfiling: null,
    recommendations: []
  };

  // Test each backend
  for (const backend of ['webgl', 'wasm']) {
    try {
      await tf.setBackend(backend);
      await tf.ready();
      
      report.backends[backend] = {
        available: true,
        features: tf.env().features,
        memory: tf.memory()
      };
    } catch (error) {
      report.backends[backend] = {
        available: false,
        error: error.message
      };
    }
  }

  // Run performance comparison
  if (report.backends.webgl.available && report.backends.wasm.available) {
    report.comparison = await performanceComparison(20);
    report.modelProfiling = await profileModelSizes();
  }

  // Generate recommendations
  if (report.comparison) {
    if (report.comparison.speedup > 1.2) {
      report.recommendations.push('Use WASM backend for better performance');
    } else if (report.backends.wasm.features?.WASM_HAS_SIMD_SUPPORT) {
      report.recommendations.push('WASM with SIMD provides optimal performance');
    } else {
      report.recommendations.push('WebGL backend recommended for this device');
    }
  }

  return report;
}

export default {
  performanceComparison,
  measureMemoryUsage,
  measureFPS,
  profileModelSizes,
  generatePerformanceReport
};