import FaceDetector from './faceDetection.js';
import { DrawingUtils } from './drawingUtils.js';
import { CameraManager } from './cameraUtils.js';
import { PerformanceMonitor } from './performanceMonitor.js';
import * as faceapi from 'face-api.js';

export class LiteModeDetector {
  constructor(options = {}) {
    this.options = {
      targetFPS: options.targetFPS || 30,
      frameSkip: options.frameSkip || 0,
      showConfidence: options.showConfidence !== false,
      boundingBoxColor: options.boundingBoxColor || '#00ff00',
      boundingBoxWidth: options.boundingBoxWidth || 2,
      confidenceThreshold: options.confidenceThreshold || 0.5,
      ...options
    };

    this.detector = new FaceDetector({
      detectionThreshold: this.options.confidenceThreshold
    });
    
    this.drawingUtils = new DrawingUtils();
    this.cameraManager = new CameraManager();
    this.performanceMonitor = new PerformanceMonitor();
    
    this.video = null;
    this.canvas = null;
    this.isRunning = false;
    this.frameCount = 0;
    this.animationId = null;
  }

  async initialize(videoElement, canvasElement) {
    this.video = videoElement;
    this.canvas = canvasElement;
    
    // Load the face detection model
    await this.detector.loadModel();
    
    // Setup camera
    await this.cameraManager.startCamera(this.video);
    
    // Adjust canvas size to match video
    this.adjustCanvasSize();
    
    // Initialize drawing utils with canvas
    this.drawingUtils.setCanvas(this.canvas);
    
    return true;
  }

  adjustCanvasSize() {
    if (this.video && this.canvas) {
      this.canvas.width = this.video.videoWidth;
      this.canvas.height = this.video.videoHeight;
    }
  }

  start() {
    if (this.isRunning) {
      console.warn('Lite mode detection is already running');
      return;
    }

    this.isRunning = true;
    this.frameCount = 0;
    this.performanceMonitor.reset();
    this.detectLoop();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    // Clear the canvas
    this.drawingUtils.clear();
    
    // Log performance summary
    const summary = this.performanceMonitor.getSummary();
    console.log('Performance Summary:', summary);
  }

  async detectLoop() {
    if (!this.isRunning) {
      return;
    }

    this.performanceMonitor.startFrame();

    // Skip frames if configured
    if (this.options.frameSkip > 0 && this.frameCount % (this.options.frameSkip + 1) !== 0) {
      this.frameCount++;
      this.animationId = requestAnimationFrame(() => this.detectLoop());
      return;
    }

    try {
      // Perform face detection
      const detections = await this.detector.detect(this.video);
      
      // Resize results to match display size
      const displaySize = {
        width: this.video.videoWidth,
        height: this.video.videoHeight
      };
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      
      // Clear previous drawings
      this.drawingUtils.clear();
      
      // Draw bounding boxes for each detection
      resizedDetections.forEach(detection => {
        const box = detection.box || detection.detection.box;
        const score = detection.score || detection.detection.score;
        
        // Draw bounding box
        this.drawingUtils.drawBoundingBox(
          box,
          this.options.boundingBoxColor,
          this.options.boundingBoxWidth
        );
        
        // Draw confidence score if enabled
        if (this.options.showConfidence) {
          const confidence = Math.round(score * 100);
          this.drawingUtils.drawText(
            `${confidence}%`,
            box.x,
            box.y - 5,
            {
              color: this.options.boundingBoxColor,
              font: '14px Arial',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: 2
            }
          );
        }
      });
      
      // Update performance metrics
      this.performanceMonitor.endFrame();
      this.updatePerformanceDisplay();
      
    } catch (error) {
      console.error('Detection error:', error);
    }

    this.frameCount++;
    this.animationId = requestAnimationFrame(() => this.detectLoop());
  }

  updatePerformanceDisplay() {
    const fps = this.performanceMonitor.getCurrentFPS();
    const avgDetectionTime = this.performanceMonitor.getAverageFrameTime();
    
    // Draw FPS counter
    this.drawingUtils.drawText(
      `FPS: ${fps}`,
      10,
      25,
      {
        color: fps >= 15 ? '#00ff00' : '#ff0000',
        font: '16px Arial',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 5
      }
    );
    
    // Draw detection time
    this.drawingUtils.drawText(
      `Detection: ${avgDetectionTime.toFixed(1)}ms`,
      10,
      50,
      {
        color: '#00ff00',
        font: '14px Arial',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 5
      }
    );
  }

  setDetectionThreshold(threshold) {
    this.options.confidenceThreshold = threshold;
    this.detector.setDetectionThreshold(threshold);
  }

  setFrameSkip(skip) {
    if (skip < 0) {
      throw new Error('Frame skip must be non-negative');
    }
    this.options.frameSkip = skip;
  }

  setBoundingBoxStyle(color, width) {
    if (color) this.options.boundingBoxColor = color;
    if (width) this.options.boundingBoxWidth = width;
  }

  getPerformanceStats() {
    return this.performanceMonitor.getSummary();
  }

  async cleanup() {
    this.stop();
    await this.cameraManager.stopCamera();
  }
}

export default LiteModeDetector;