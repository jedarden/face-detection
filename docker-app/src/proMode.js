/**
 * Pro Mode Implementation for Face Detection
 * Advanced features including landmarks, expressions, age/gender estimation
 */

import * as faceapi from '@vladmandic/face-api';
import { drawLandmarks, drawFaceContours, drawExpressions, drawAgeGender } from './landmarkDrawing';
import { appConfig } from './config.js';

export class ProMode {
  constructor() {
    this.modelsLoaded = false;
    this.modelPromise = null;
    this.detectionOptions = null;
    this.features = {
      landmarks: true,
      expressions: true,
      ageGender: true,
      faceRecognition: true,
      contours: true,
      regions: true
    };
    this.visualizationStyle = {
      landmarkSize: 2,
      landmarkColor: '#00ff00',
      connectionColor: '#00ffff',
      contourColor: '#ff00ff',
      regionColors: {
        leftEye: '#ff0000',
        rightEye: '#ff0000',
        nose: '#00ff00',
        mouth: '#0000ff',
        jawline: '#ffff00'
      }
    };
  }

  async loadModels() {
    if (this.modelsLoaded) return;
    if (this.modelPromise) return this.modelPromise;

    this.modelPromise = (async () => {
      try {
        const MODEL_URL = appConfig.getModelUrl();
        console.log('Pro mode loading models from:', MODEL_URL);
        
        // Load all required models for Pro mode
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
        ]);

        // Configure detection options for higher accuracy
        this.detectionOptions = new faceapi.SsdMobilenetv1Options({
          minConfidence: 0.5,
          maxResults: 10
        });

        this.modelsLoaded = true;
        console.log('Pro mode models loaded successfully');
      } catch (error) {
        console.error('Error loading Pro mode models:', error);
        throw error;
      }
    })();

    return this.modelPromise;
  }

  async detectFaces(video, canvas) {
    if (!this.modelsLoaded) {
      await this.loadModels();
    }

    try {
      // Perform full face detection with all features
      const detections = await faceapi
        .detectAllFaces(video, this.detectionOptions)
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

      return detections;
    } catch (error) {
      console.error('Pro mode detection error:', error);
      return [];
    }
  }

  drawDetections(canvas, detections, video) {
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    detections.forEach(detection => {
      const { detection: faceDetection, landmarks, expressions, age, gender } = detection;
      
      // Draw bounding box
      this.drawBoundingBox(ctx, faceDetection.box);
      
      // Draw facial landmarks with connections
      if (this.features.landmarks && landmarks) {
        drawLandmarks(ctx, landmarks, this.visualizationStyle);
      }
      
      // Draw face contours
      if (this.features.contours && landmarks) {
        drawFaceContours(ctx, landmarks, this.visualizationStyle);
      }
      
      // Draw expressions
      if (this.features.expressions && expressions) {
        drawExpressions(ctx, expressions, faceDetection.box);
      }
      
      // Draw age and gender
      if (this.features.ageGender && age !== undefined && gender) {
        drawAgeGender(ctx, age, gender, faceDetection.box);
      }
    });

    return detections;
  }

  drawBoundingBox(ctx, box) {
    const { x, y, width, height } = box;
    
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    
    // Draw corner accents
    const cornerLength = 20;
    ctx.lineWidth = 3;
    
    // Top-left corner
    ctx.beginPath();
    ctx.moveTo(x, y + cornerLength);
    ctx.lineTo(x, y);
    ctx.lineTo(x + cornerLength, y);
    ctx.stroke();
    
    // Top-right corner
    ctx.beginPath();
    ctx.moveTo(x + width - cornerLength, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + cornerLength);
    ctx.stroke();
    
    // Bottom-left corner
    ctx.beginPath();
    ctx.moveTo(x, y + height - cornerLength);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x + cornerLength, y + height);
    ctx.stroke();
    
    // Bottom-right corner
    ctx.beginPath();
    ctx.moveTo(x + width - cornerLength, y + height);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x + width, y + height - cornerLength);
    ctx.stroke();
  }

  toggleFeature(feature) {
    if (this.features.hasOwnProperty(feature)) {
      this.features[feature] = !this.features[feature];
    }
  }

  updateVisualizationStyle(style) {
    this.visualizationStyle = { ...this.visualizationStyle, ...style };
  }

  exportDetectionData(detections) {
    return detections.map(detection => ({
      boundingBox: detection.detection.box,
      landmarks: detection.landmarks ? detection.landmarks.positions.map(p => ({ x: p.x, y: p.y })) : null,
      expressions: detection.expressions || null,
      age: detection.age || null,
      gender: detection.gender || null,
      confidence: detection.detection.score
    }));
  }

  getPerformanceTarget() {
    return {
      targetFPS: 20,
      mode: 'pro',
      features: Object.keys(this.features).filter(f => this.features[f])
    };
  }
}

export default ProMode;