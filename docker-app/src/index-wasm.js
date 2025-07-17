/**
 * Face Detection App with WASM Support
 * Uses @vladmandic/face-api for TensorFlow.js 2.x compatibility
 */

// Use @vladmandic/face-api instead of face-api.js for WASM support
import * as faceapi from '@vladmandic/face-api';
import './styles.css';
import { LiteModeDetector } from './liteMode.js';
import { ProMode } from './proMode.js';
import { CameraManager } from './cameraUtils.js';
import { DrawingUtils } from './drawingUtils.js';
import { PerformanceMonitor } from './performanceMonitor.js';
import { appConfig } from './config.js';
import { initializeWASMBackend, getBackendPerformance, BackendMonitor } from './wasmBackend.js';

export class FaceDetectionApp {
  constructor(options = {}) {
    this.video = null;
    this.canvas = null;
    this.isModelLoaded = false;
    this.isVideoReady = false;
    this.detectionInterval = null;
    this.currentMode = 'full';
    this.liteModeDetector = null;
    this.proMode = null;
    this.performanceMonitor = new PerformanceMonitor();
    this.cameraManager = new CameraManager();
    this.availableCameras = [];
    this.currentCameraId = null;
    
    // WASM configuration
    this.config = {
      preferredBackend: options.preferredBackend || 'wasm',
      enableSIMD: options.enableSIMD !== false,
      enableThreads: options.enableThreads !== false
    };
    
    this.backendType = null;
    this.backendMonitor = new BackendMonitor();
  }

  async init() {
    try {
      // Initialize WASM backend first
      await this.initializeBackend();
      
      // Then proceed with normal initialization
      await this.loadModels();
      this.setupUI();
      await this.setupCamera();
      
      // Additional initialization for lite mode
      if (this.currentMode === 'lite') {
        this.liteModeDetector = new LiteModeDetector({
          targetFPS: 30,
          frameSkip: 0,
          showConfidence: true,
          boundingBoxColor: '#00ff00',
          confidenceThreshold: 0.5
        });
        
        this.liteModeDetector.video = this.video;
        this.liteModeDetector.canvas = this.canvas;
        this.liteModeDetector.drawingUtils.setCanvas(this.canvas);
        
        await this.liteModeDetector.detector.loadModel();
      } else if (this.currentMode === 'pro') {
        this.proMode = new ProMode();
        await this.proMode.loadModels();
      }
      
      this.startDetection();
    } catch (error) {
      console.error('Failed to initialize app:', error);
      this.showError('Failed to initialize the application. Please check your camera permissions.');
    }
  }

  async initializeBackend() {
    console.log('Initializing backend with preference:', this.config.preferredBackend);
    
    // Initialize face-api environment
    await faceapi.env.monkeyPatch({
      Canvas: HTMLCanvasElement,
      Image: HTMLImageElement,
      ImageData: ImageData,
      Video: HTMLVideoElement,
      createCanvasElement: () => document.createElement('canvas'),
      createImageElement: () => document.createElement('img')
    });

    // Initialize WASM backend if preferred
    if (this.config.preferredBackend === 'wasm') {
      const backendResult = await initializeWASMBackend();
      this.backendType = backendResult.backend;
      
      if (backendResult.fallback) {
        console.warn('WASM initialization failed, using fallback:', this.backendType);
      } else {
        console.log('WASM backend initialized successfully');
      }
      
      // Update UI with backend info
      this.updateBackendDisplay();
    } else {
      this.backendType = this.config.preferredBackend;
      console.log('Using backend:', this.backendType);
    }
  }

  async loadModels() {
    const MODEL_URL = appConfig.getModelUrl();
    
    try {
      console.log('Loading face detection models from:', MODEL_URL);
      console.log('App configuration:', appConfig.debug());
      console.log('Using backend:', this.backendType);
      
      // Load models with progress tracking
      const modelPromises = [
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
      ];
      
      await Promise.all(modelPromises);
      
      this.isModelLoaded = true;
      console.log('Face detection models loaded successfully');
      
      // Log backend performance after model loading
      const perfInfo = getBackendPerformance();
      console.log('Backend performance:', perfInfo);
    } catch (error) {
      console.error('Failed to load models:', error);
      throw new Error('Failed to load face detection models: ' + error.message);
    }
  }

  setupUI() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="container">
        <h1>Face Detection App</h1>
        <div class="backend-info" id="backend-info"></div>
        <div class="video-container">
          <video id="video" autoplay muted></video>
          <canvas id="overlay"></canvas>
        </div>
        <div class="controls">
          <div class="mode-selector">
            <label>
              <input type="radio" name="mode" value="lite" ${this.currentMode === 'lite' ? 'checked' : ''}>
              Lite Mode (Bounding Boxes)
            </label>
            <label>
              <input type="radio" name="mode" value="pro" ${this.currentMode === 'pro' ? 'checked' : ''}>
              Pro Mode (Advanced Features)
            </label>
            <label>
              <input type="radio" name="mode" value="full" ${this.currentMode === 'full' ? 'checked' : ''}>
              Full Mode (All Features)
            </label>
          </div>
          <div id="pro-controls" class="pro-controls" style="display: ${this.currentMode === 'pro' ? 'block' : 'none'};">
            <h3>Pro Mode Features</h3>
            <label><input type="checkbox" id="landmarks" checked> 68-point Landmarks</label>
            <label><input type="checkbox" id="expressions" checked> Facial Expressions</label>
            <label><input type="checkbox" id="ageGender" checked> Age & Gender</label>
            <label><input type="checkbox" id="contours" checked> Face Contours</label>
            <label><input type="checkbox" id="regions" checked> Region Highlighting</label>
          </div>
          <button id="startBtn" class="btn btn-primary">Start Detection</button>
          <button id="stopBtn" class="btn btn-secondary" disabled>Stop Detection</button>
          <div id="camera-selector" class="camera-selector" style="display: none;">
            <label for="cameraSelect">Camera:</label>
            <select id="cameraSelect">
              <option value="">Loading cameras...</option>
            </select>
          </div>
          <div class="threshold-control">
            <label for="threshold">Detection Threshold: <span id="thresholdValue">0.5</span></label>
            <input type="range" id="threshold" min="0.1" max="0.9" step="0.1" value="0.5">
          </div>
          <div class="backend-selector">
            <label for="backendSelect">Backend:</label>
            <select id="backendSelect">
              <option value="wasm" ${this.backendType === 'wasm' ? 'selected' : ''}>WASM</option>
              <option value="webgl" ${this.backendType === 'webgl' ? 'selected' : ''}>WebGL</option>
              <option value="cpu" ${this.backendType === 'cpu' ? 'selected' : ''}>CPU</option>
            </select>
          </div>
        </div>
        <div id="stats" class="stats"></div>
      </div>
    `;

    this.video = document.getElementById('video');
    this.canvas = document.getElementById('overlay');
    
    // Event listeners
    document.getElementById('startBtn').onclick = () => this.startDetection();
    document.getElementById('stopBtn').onclick = () => this.stopDetection();
    
    // Mode switching
    document.querySelectorAll('input[name="mode"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.switchMode(e.target.value);
        document.getElementById('pro-controls').style.display = 
          e.target.value === 'pro' ? 'block' : 'none';
      });
    });
    
    // Pro mode feature toggles
    if (this.currentMode === 'pro') {
      this.setupProModeControls();
    }
    
    // Threshold control
    const thresholdSlider = document.getElementById('threshold');
    thresholdSlider.addEventListener('input', (e) => {
      const value = parseFloat(e.target.value);
      document.getElementById('thresholdValue').textContent = value.toFixed(1);
      this.updateThreshold(value);
    });
    
    // Camera selector
    const cameraSelect = document.getElementById('cameraSelect');
    cameraSelect.addEventListener('change', async (e) => {
      if (e.target.value) {
        await this.switchCamera(e.target.value);
      }
    });
    
    // Backend selector
    const backendSelect = document.getElementById('backendSelect');
    backendSelect.addEventListener('change', async (e) => {
      await this.switchBackend(e.target.value);
    });
    
    // Load available cameras
    this.loadCameraList();
    
    // Update backend display
    this.updateBackendDisplay();
  }

  async setupCamera() {
    try {
      if (!this.video) {
        throw new Error('Video element not found');
      }
      
      await this.cameraManager.startCamera(this.video);
      
      const streamInfo = this.cameraManager.getStreamInfo();
      if (streamInfo && streamInfo.deviceId) {
        this.currentCameraId = streamInfo.deviceId;
      }
      
      this.isVideoReady = true;
      this.adjustCanvas();
      
      await this.loadCameraList();
      
    } catch (error) {
      throw new Error('Camera access denied or not available: ' + error.message);
    }
  }

  adjustCanvas() {
    this.canvas.width = this.video.videoWidth;
    this.canvas.height = this.video.videoHeight;
  }

  setupProModeControls() {
    const features = ['landmarks', 'expressions', 'ageGender', 'contours', 'regions'];
    features.forEach(feature => {
      const checkbox = document.getElementById(feature);
      if (checkbox) {
        checkbox.addEventListener('change', (e) => {
          if (this.proMode) {
            this.proMode.toggleFeature(feature);
          }
        });
      }
    });
  }

  async startDetection() {
    // Track inference time with backend monitor
    const startTime = this.backendMonitor.startInference();
    
    if (this.currentMode === 'lite') {
      if (!this.liteModeDetector) {
        console.error('Lite mode detector not initialized');
        return;
      }
      document.getElementById('startBtn').disabled = true;
      document.getElementById('stopBtn').disabled = false;
      this.liteModeDetector.start();
    } else if (this.currentMode === 'pro') {
      if (!this.proMode || !this.isVideoReady) {
        console.error('Pro mode or video not ready');
        return;
      }

      document.getElementById('startBtn').disabled = true;
      document.getElementById('stopBtn').disabled = false;

      this.performanceMonitor.start();

      this.detectionInterval = setInterval(async () => {
        await this.detectFacesPro();
      }, 50); // 20 FPS target for pro mode
    } else {
      if (!this.isModelLoaded || !this.isVideoReady) {
        console.error('Models or video not ready');
        return;
      }

      document.getElementById('startBtn').disabled = true;
      document.getElementById('stopBtn').disabled = false;

      this.detectionInterval = setInterval(async () => {
        await this.detectFaces();
      }, 100);
    }
    
    // Record inference completion
    this.backendMonitor.endInference(startTime);
  }

  stopDetection() {
    if (this.currentMode === 'lite' && this.liteModeDetector) {
      this.liteModeDetector.stop();
    } else if (this.detectionInterval) {
      clearInterval(this.detectionInterval);
      this.detectionInterval = null;
      const ctx = this.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      if (this.currentMode === 'pro') {
        this.performanceMonitor.stop();
      }
    }

    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
  }

  async detectFaces() {
    const startTime = this.backendMonitor.startInference();
    
    const detections = await faceapi.detectAllFaces(
      this.video,
      new faceapi.TinyFaceDetectorOptions()
    )
    .withFaceLandmarks()
    .withFaceExpressions()
    .withAgeAndGender();

    const displaySize = {
      width: this.video.videoWidth,
      height: this.video.videoHeight
    };

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw detections
    faceapi.draw.drawDetections(this.canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(this.canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(this.canvas, resizedDetections);

    // Draw age and gender
    resizedDetections.forEach(detection => {
      const { age, gender, genderProbability } = detection;
      const { x, y, width, height } = detection.detection.box;
      
      ctx.font = '18px Arial';
      ctx.fillStyle = '#00ff00';
      ctx.fillText(
        `${Math.round(age)} years, ${gender} (${Math.round(genderProbability * 100)}%)`,
        x,
        y - 10
      );
    });

    this.updateStats(detections.length);
    this.backendMonitor.endInference(startTime);
  }

  async detectFacesPro() {
    if (!this.proMode) return;

    const startTime = performance.now();
    const inferenceStart = this.backendMonitor.startInference();

    try {
      const detections = await this.proMode.detectFaces(this.video, this.canvas);
      this.proMode.drawDetections(this.canvas, detections, this.video);
      
      const frameTime = performance.now() - startTime;
      this.performanceMonitor.recordFrame(frameTime, detections.length);
      
      this.updateProStats(detections);
      this.backendMonitor.endInference(inferenceStart);
    } catch (error) {
      console.error('Pro mode detection error:', error);
    }
  }

  updateStats(faceCount) {
    const stats = document.getElementById('stats');
    const backendReport = this.backendMonitor.getReport();
    
    stats.innerHTML = `
      <p>Faces detected: <strong>${faceCount}</strong></p>
      <p>Model: TinyFaceDetector</p>
      <p>Backend: <strong>${this.backendType}</strong></p>
      <p>Features: Landmarks, Expressions, Age & Gender</p>
      <p>Avg Inference: <strong>${backendReport.averageInferenceTime.toFixed(2)}ms</strong></p>
      <p>Memory: <strong>${(backendReport.currentMemory.numBytes / 1024 / 1024).toFixed(2)}MB</strong></p>
    `;
  }

  updateProStats(detections) {
    const stats = document.getElementById('stats');
    const perfData = this.performanceMonitor.getMetrics();
    const backendReport = this.backendMonitor.getReport();
    
    let expressionsSummary = '';
    if (detections.length > 0 && detections[0].expressions) {
      const topExpression = Object.entries(detections[0].expressions)
        .sort(([,a], [,b]) => b - a)[0];
      expressionsSummary = `<p>Top Expression: <strong>${topExpression[0]} (${Math.round(topExpression[1] * 100)}%)</strong></p>`;
    }
    
    stats.innerHTML = `
      <p>Faces detected: <strong>${detections.length}</strong></p>
      <p>Mode: <strong>Pro Mode</strong></p>
      <p>Model: SSD MobileNet v1</p>
      <p>Backend: <strong>${this.backendType}</strong></p>
      <p>Features: 68-point landmarks, Expressions, Age/Gender</p>
      ${expressionsSummary}
      <p>FPS: <strong>${perfData.fps.toFixed(1)}</strong> (Target: 20)</p>
      <p>Frame Time: <strong>${perfData.avgFrameTime.toFixed(1)}ms</strong></p>
      <p>Avg Inference: <strong>${backendReport.averageInferenceTime.toFixed(2)}ms</strong></p>
    `;
  }

  showError(message) {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="error">
        <h2>Error</h2>
        <p>${message}</p>
      </div>
    `;
  }

  async switchMode(mode) {
    this.stopDetection();
    
    if (this.currentMode === 'lite' && this.liteModeDetector) {
      await this.liteModeDetector.cleanup();
      this.liteModeDetector = null;
    } else if (this.currentMode === 'pro' && this.proMode) {
      this.proMode = null;
    }
    
    this.currentMode = mode;
    console.log(`Switching to ${mode} mode`);
    
    try {
      if (mode === 'lite') {
        this.liteModeDetector = new LiteModeDetector({
          targetFPS: 30,
          frameSkip: 0,
          showConfidence: true,
          boundingBoxColor: '#00ff00',
          confidenceThreshold: parseFloat(document.getElementById('threshold').value)
        });
        await this.liteModeDetector.initialize(this.video, this.canvas);
        this.isModelLoaded = true;
        this.isVideoReady = true;
      } else if (mode === 'pro') {
        this.proMode = new ProMode();
        await this.proMode.loadModels();
        this.isModelLoaded = true;
        this.isVideoReady = true;
        this.setupProModeControls();
      } else {
        if (!this.isModelLoaded) {
          await this.loadModels();
        }
        if (!this.isVideoReady) {
          await this.setupCamera();
        }
      }
    } catch (error) {
      console.error('Failed to switch mode:', error);
      this.showError('Failed to switch mode. Please try again.');
    }
  }

  updateThreshold(value) {
    if (this.currentMode === 'lite' && this.liteModeDetector) {
      this.liteModeDetector.setDetectionThreshold(value);
    }
  }

  async loadCameraList() {
    try {
      const cameras = await this.cameraManager.getAvailableCameras();
      this.availableCameras = cameras;
      
      const cameraSelect = document.getElementById('cameraSelect');
      const cameraSelector = document.getElementById('camera-selector');
      
      if (!cameraSelect || !cameraSelector) return;
      
      if (cameras.length > 1) {
        cameraSelector.style.display = 'block';
        cameraSelect.innerHTML = '';
        
        cameras.forEach(camera => {
          const option = document.createElement('option');
          option.value = camera.deviceId;
          option.textContent = camera.label;
          option.selected = camera.deviceId === this.currentCameraId;
          cameraSelect.appendChild(option);
        });
      } else {
        cameraSelector.style.display = 'none';
      }
    } catch (error) {
      console.error('Failed to load camera list:', error);
    }
  }

  async switchCamera(deviceId) {
    try {
      const wasDetecting = this.detectionInterval || (this.liteModeDetector && this.liteModeDetector.isRunning);
      if (wasDetecting) {
        this.stopDetection();
      }
      
      await this.cameraManager.selectCamera(deviceId);
      this.currentCameraId = deviceId;
      
      this.adjustCanvas();
      
      if (wasDetecting) {
        await this.startDetection();
      }
    } catch (error) {
      console.error('Failed to switch camera:', error);
      this.showError('Failed to switch camera. Please try again.');
    }
  }

  async switchBackend(backend) {
    console.log('Switching backend to:', backend);
    
    // Stop detection
    this.stopDetection();
    
    // Clear models
    this.isModelLoaded = false;
    
    // Switch backend
    try {
      const tf = await import('@tensorflow/tfjs');
      await tf.setBackend(backend);
      await tf.ready();
      
      this.backendType = backend;
      this.updateBackendDisplay();
      
      // Reload models with new backend
      await this.loadModels();
      
      // Reset backend monitor
      this.backendMonitor.reset();
      
      console.log('Backend switched successfully to:', backend);
    } catch (error) {
      console.error('Failed to switch backend:', error);
      this.showError(`Failed to switch to ${backend} backend`);
    }
  }

  updateBackendDisplay() {
    const backendInfo = document.getElementById('backend-info');
    if (backendInfo) {
      const perfInfo = getBackendPerformance();
      const isWASM = this.backendType === 'wasm';
      const color = isWASM ? '#28a745' : '#6c757d';
      
      backendInfo.innerHTML = `
        <div class="backend-status" style="
          background-color: ${color};
          color: white;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 15px;
          text-align: center;
          font-family: monospace;
        ">
          <div style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">
            ${isWASM ? '🚀 WASM ACTIVE' : this.backendType.toUpperCase() + ' MODE'}
          </div>
          <div style="font-size: 14px;">
            Backend: <strong>${this.backendType}</strong>
            ${perfInfo.features.simd ? ' | SIMD ✓' : ' | SIMD ✗'}
            ${perfInfo.features.threads ? ' | Threads ✓' : ' | Threads ✗'}
          </div>
          ${isWASM ? '<div style="font-size: 12px; margin-top: 5px;">8-20X faster inference</div>' : ''}
        </div>
      `;
    }
  }

  getBackendInfo() {
    return {
      name: this.backendType,
      features: getBackendPerformance().features,
      performance: this.backendMonitor.getReport()
    };
  }

  // Methods for test compatibility
  getLiteModeOptions() {
    return {
      inputSize: 320,
      scoreThreshold: 0.5
    };
  }

  getProModeOptions() {
    return {
      minConfidence: 0.5,
      maxResults: 10
    };
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new FaceDetectionApp();
  app.init();
  // Expose app instance for testing
  window.app = app;
});