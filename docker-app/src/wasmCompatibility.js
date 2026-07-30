/**
 * WASM Compatibility Module
 * Ensures feature parity between original face-api.js and WASM implementation
 */

import * as tf from '@tensorflow/tfjs';
import * as faceapi from '@vladmandic/face-api';

/**
 * Test compatibility of all face-api.js models with WASM backend
 */
export async function testModelCompatibility() {
  const compatibility = {
    tinyFaceDetector: false,
    ssdMobilenetv1: false,
    faceLandmark68Net: false,
    faceLandmark68TinyNet: false,
    faceExpressionNet: false,
    ageGenderNet: false,
    faceRecognitionNet: false
  };

  // Set WASM backend
  await tf.setBackend('wasm');
  await tf.ready();

  // Create test input
  const testCanvas = createTestCanvas();

  try {
    // Test TinyFaceDetector
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    const tinyDetections = await faceapi.detectAllFaces(
      testCanvas,
      new faceapi.TinyFaceDetectorOptions()
    );
    compatibility.tinyFaceDetector = true;
  } catch (error) {
    console.error('TinyFaceDetector compatibility error:', error);
  }

  try {
    // Test SSD MobileNet v1
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    const ssdDetections = await faceapi.detectAllFaces(
      testCanvas,
      new faceapi.SsdMobilenetv1Options()
    );
    compatibility.ssdMobilenetv1 = true;
  } catch (error) {
    console.error('SsdMobilenetv1 compatibility error:', error);
  }

  try {
    // Test Face Landmarks
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    const landmarkDetections = await faceapi
      .detectAllFaces(testCanvas)
      .withFaceLandmarks();
    compatibility.faceLandmark68Net = true;
  } catch (error) {
    console.error('FaceLandmark68Net compatibility error:', error);
  }

  try {
    // Test Face Expressions
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    const expressionDetections = await faceapi
      .detectAllFaces(testCanvas)
      .withFaceExpressions();
    compatibility.faceExpressionNet = true;
  } catch (error) {
    console.error('FaceExpressionNet compatibility error:', error);
  }

  try {
    // Test Age & Gender
    await faceapi.nets.ageGenderNet.loadFromUri('/models');
    const ageGenderDetections = await faceapi
      .detectAllFaces(testCanvas)
      .withAgeAndGender();
    compatibility.ageGenderNet = true;
  } catch (error) {
    console.error('AgeGenderNet compatibility error:', error);
  }

  return compatibility;
}

/**
 * Compare detection accuracy between backends
 */
export async function compareDetectionAccuracy() {
  const results = {
    webgl: null,
    wasm: null,
    difference: 0
  };

  const testCanvas = createTestCanvas();

  // Test with WebGL
  await tf.setBackend('webgl');
  await tf.ready();
  
  const webglDetections = await faceapi
    .detectAllFaces(testCanvas, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceExpressions();
  
  results.webgl = processDetections(webglDetections);

  // Test with WASM
  await tf.setBackend('wasm');
  await tf.ready();
  
  const wasmDetections = await faceapi
    .detectAllFaces(testCanvas, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceExpressions();
  
  results.wasm = processDetections(wasmDetections);

  // Calculate difference
  if (results.webgl.count > 0 && results.wasm.count > 0) {
    results.difference = Math.abs(
      results.webgl.avgConfidence - results.wasm.avgConfidence
    );
  }

  return results;
}

/**
 * Verify API compatibility with original face-api.js
 */
export function verifyAPICompatibility() {
  const compatibility = {
    classes: {},
    methods: {},
    options: {},
    utils: {}
  };

  // Check main classes
  const requiredClasses = [
    'TinyFaceDetectorOptions',
    'SsdMobilenetv1Options',
    'TinyYolov2Options',
    'FaceLandmarks',
    'FaceDetection',
    'FaceExpressions',
    'Gender',
    'Age'
  ];

  for (const className of requiredClasses) {
    compatibility.classes[className] = typeof faceapi[className] === 'function';
  }

  // Check detection methods
  const requiredMethods = [
    'detectAllFaces',
    'detectSingleFace',
    'loadFaceDetectionModel',
    'loadFaceLandmarkModel',
    'loadFaceExpressionModel',
    'loadAgeGenderModel'
  ];

  for (const method of requiredMethods) {
    compatibility.methods[method] = typeof faceapi[method] === 'function';
  }

  // Check utility functions
  const utilityFunctions = [
    'resizeResults',
    'matchDimensions',
    'draw'
  ];

  for (const util of utilityFunctions) {
    compatibility.utils[util] = faceapi[util] !== undefined;
  }

  return compatibility;
}

/**
 * Test detection options parity
 */
export function testDetectionOptions() {
  const optionsParity = {
    tinyFaceDetector: {},
    ssdMobilenetv1: {}
  };

  // Test TinyFaceDetectorOptions
  const tinyOptions = new faceapi.TinyFaceDetectorOptions({
    inputSize: 320,
    scoreThreshold: 0.5
  });

  optionsParity.tinyFaceDetector = {
    inputSize: tinyOptions.inputSize === 320,
    scoreThreshold: tinyOptions.scoreThreshold === 0.5
  };

  // Test SsdMobilenetv1Options
  const ssdOptions = new faceapi.SsdMobilenetv1Options({
    minConfidence: 0.5,
    maxResults: 10
  });

  optionsParity.ssdMobilenetv1 = {
    minConfidence: ssdOptions.minConfidence === 0.5,
    maxResults: ssdOptions.maxResults === 10
  };

  return optionsParity;
}

/**
 * Migrate from face-api.js to @vladmandic/face-api
 */
export async function migrateToVladmandic() {
  const migration = {
    success: false,
    steps: [],
    errors: []
  };

  try {
    // Step 1: Import new library
    migration.steps.push('Imported @vladmandic/face-api');

    // Step 2: Initialize with TensorFlow.js 2.x
    faceapi.env.monkeyPatch({
      Canvas: HTMLCanvasElement,
      Image: HTMLImageElement,
      ImageData: ImageData,
      Video: HTMLVideoElement,
      createCanvasElement: () => document.createElement('canvas'),
      createImageElement: () => document.createElement('img')
    });
    migration.steps.push('Monkey-patched environment');

    // Step 3: Test basic functionality
    const testCanvas = createTestCanvas();
    const detection = await faceapi.detectSingleFace(testCanvas);
    
    if (detection) {
      migration.steps.push('Basic detection working');
    }

    migration.success = true;
  } catch (error) {
    migration.errors.push(error.message);
  }

  return migration;
}

/**
 * Create test canvas with face-like image
 */
function createTestCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 480;
  const ctx = canvas.getContext('2d');

  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 640, 480);

  // Draw face-like shape
  ctx.fillStyle = '#ffdbac';
  ctx.beginPath();
  ctx.arc(320, 240, 100, 0, 2 * Math.PI);
  ctx.fill();

  // Eyes
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(290, 220, 10, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(350, 220, 10, 0, 2 * Math.PI);
  ctx.fill();

  // Mouth
  ctx.beginPath();
  ctx.arc(320, 260, 30, 0, Math.PI);
  ctx.stroke();

  return canvas;
}

/**
 * Process detections for comparison
 */
function processDetections(detections) {
  if (!detections || detections.length === 0) {
    return { count: 0, avgConfidence: 0 };
  }

  const confidences = detections.map(d => d.detection.score);
  const avgConfidence = confidences.reduce((a, b) => a + b, 0) / confidences.length;

  return {
    count: detections.length,
    avgConfidence,
    boxes: detections.map(d => d.detection.box)
  };
}

/**
 * Validate result structure matches original
 */
export function validateResultStructure(detection) {
  const requiredFields = {
    detection: ['box', 'score', 'classScore'],
    box: ['x', 'y', 'width', 'height'],
    landmarks: ['positions', 'shift'],
    expressions: ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised'],
    age: 'number',
    gender: 'string',
    genderProbability: 'number'
  };

  const validation = {
    valid: true,
    missing: []
  };

  // Check detection structure
  if (!detection.detection) {
    validation.valid = false;
    validation.missing.push('detection');
    return validation;
  }

  // Check box
  if (!detection.detection.box) {
    validation.valid = false;
    validation.missing.push('detection.box');
  } else {
    for (const field of requiredFields.box) {
      if (typeof detection.detection.box[field] !== 'number') {
        validation.valid = false;
        validation.missing.push(`detection.box.${field}`);
      }
    }
  }

  // Check score
  if (typeof detection.detection.score !== 'number') {
    validation.valid = false;
    validation.missing.push('detection.score');
  }

  return validation;
}

export default {
  testModelCompatibility,
  compareDetectionAccuracy,
  verifyAPICompatibility,
  testDetectionOptions,
  migrateToVladmandic,
  validateResultStructure
};