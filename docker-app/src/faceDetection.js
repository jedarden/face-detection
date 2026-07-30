import * as faceapi from '@vladmandic/face-api';
import { appConfig } from './config.js';

export class FaceDetector {
  constructor(options = {}) {
    this.options = {
      modelPath: options.modelPath || appConfig.getModelUrl(),
      detectionThreshold: options.detectionThreshold || 0.5,
      inputSize: options.inputSize || 416,
      ...options
    };
    
    this.isModelLoaded = false;
    this.detector = null;
  }

  async loadModel() {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri(this.options.modelPath);
      this.detector = new faceapi.TinyFaceDetectorOptions({
        inputSize: this.options.inputSize,
        scoreThreshold: this.options.detectionThreshold
      });
      this.isModelLoaded = true;
      return true;
    } catch (error) {
      console.error('Failed to load face detection model:', error);
      throw new Error('Model loading failed: ' + error.message);
    }
  }

  async detect(input) {
    if (!this.isModelLoaded) {
      throw new Error('Model not loaded. Call loadModel() first.');
    }

    try {
      const detections = await faceapi.detectAllFaces(input, this.detector);
      return detections;
    } catch (error) {
      console.error('Face detection failed:', error);
      return [];
    }
  }

  async detectWithLandmarks(input) {
    if (!this.isModelLoaded) {
      throw new Error('Model not loaded. Call loadModel() first.');
    }

    try {
      const detections = await faceapi.detectAllFaces(input, this.detector)
        .withFaceLandmarks();
      return detections;
    } catch (error) {
      console.error('Face detection with landmarks failed:', error);
      return [];
    }
  }

  setDetectionThreshold(threshold) {
    if (threshold < 0 || threshold > 1) {
      throw new Error('Threshold must be between 0 and 1');
    }
    
    this.options.detectionThreshold = threshold;
    this.detector = new faceapi.TinyFaceDetectorOptions({
      inputSize: this.options.inputSize,
      scoreThreshold: threshold
    });
  }

  setInputSize(size) {
    const validSizes = [128, 160, 224, 320, 416, 512, 608];
    if (!validSizes.includes(size)) {
      throw new Error(`Input size must be one of: ${validSizes.join(', ')}`);
    }
    
    this.options.inputSize = size;
    this.detector = new faceapi.TinyFaceDetectorOptions({
      inputSize: size,
      scoreThreshold: this.options.detectionThreshold
    });
  }

  getOptions() {
    return { ...this.options };
  }

  isReady() {
    return this.isModelLoaded;
  }
}

export default FaceDetector;