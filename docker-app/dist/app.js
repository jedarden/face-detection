// Simple entry point for the face detection application
// This script will be loaded directly in the browser without module bundling

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', async function() {
  console.log('DOM loaded, initializing Face Detection App...');
  
  // Check if face-api.js is available
  if (typeof faceapi === 'undefined') {
    console.error('face-api.js is not loaded');
    showError('face-api.js library is required but not found');
    return;
  }
  
  console.log('face-api.js found, loading models...');
  
  try {
    // Load the face detection models
    const MODEL_URL = '/models';
    console.log('Loading models from:', MODEL_URL);
    
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
    ]);
    
    console.log('Models loaded successfully!');
    
    // Initialize the application UI
    initializeApp();
    
  } catch (error) {
    console.error('Failed to load models:', error);
    showError('Failed to load face detection models: ' + error.message);
  }
});

function initializeApp() {
  console.log('Initializing app UI...');
  
  // Replace loading screen with main app
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="container">
      <h1>Face Detection App</h1>
      <div class="video-container">
        <video id="video" autoplay muted></video>
        <canvas id="overlay"></canvas>
      </div>
      <div class="controls">
        <div class="mode-selector">
          <label>
            <input type="radio" name="mode" value="lite" checked>
            Lite Mode (Bounding Boxes)
          </label>
          <label>
            <input type="radio" name="mode" value="pro">
            Pro Mode (Advanced Features)
          </label>
        </div>
        <button id="startBtn" class="btn btn-primary">Start Detection</button>
        <button id="stopBtn" class="btn btn-secondary" disabled>Stop Detection</button>
        <button id="diagnosticsBtn" class="btn btn-diagnostic">Show Diagnostics</button>
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
      </div>
      <div id="stats" class="stats"></div>
      <div id="diagnostics" class="diagnostics" style="display: none;">
        <h3>Performance Diagnostics</h3>
        <div class="diagnostic-grid">
          <div class="diagnostic-item">
            <span class="metric-label">FPS:</span>
            <span id="fps-value">0</span>
          </div>
          <div class="diagnostic-item">
            <span class="metric-label">Frame Time:</span>
            <span id="frame-time-value">0ms</span>
          </div>
          <div class="diagnostic-item">
            <span class="metric-label">Detection Latency:</span>
            <span id="detection-latency-value">0ms</span>
          </div>
          <div class="diagnostic-item">
            <span class="metric-label">Memory Usage:</span>
            <span id="memory-value">0MB</span>
          </div>
          <div class="diagnostic-item">
            <span class="metric-label">CPU Usage:</span>
            <span id="cpu-value">0%</span>
          </div>
          <div class="diagnostic-item">
            <span class="metric-label">Video Resolution:</span>
            <span id="resolution-value">0x0</span>
          </div>
          <div class="diagnostic-item">
            <span class="metric-label">Detection Count:</span>
            <span id="detection-count-value">0</span>
          </div>
          <div class="diagnostic-item">
            <span class="metric-label">Processing Time:</span>
            <span id="processing-time-value">0ms</span>
          </div>
        </div>
        <div class="diagnostic-charts">
          <canvas id="fps-chart" width="300" height="100"></canvas>
          <canvas id="memory-chart" width="300" height="100"></canvas>
        </div>
      </div>
    </div>
  `;
  
  // Get DOM elements
  const video = document.getElementById('video');
  const canvas = document.getElementById('overlay');
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const diagnosticsBtn = document.getElementById('diagnosticsBtn');
  const cameraSelect = document.getElementById('cameraSelect');
  const cameraSelector = document.getElementById('camera-selector');
  const thresholdSlider = document.getElementById('threshold');
  const thresholdValue = document.getElementById('thresholdValue');
  const stats = document.getElementById('stats');
  const diagnostics = document.getElementById('diagnostics');
  
  // Diagnostic elements
  const fpsValue = document.getElementById('fps-value');
  const frameTimeValue = document.getElementById('frame-time-value');
  const detectionLatencyValue = document.getElementById('detection-latency-value');
  const memoryValue = document.getElementById('memory-value');
  const cpuValue = document.getElementById('cpu-value');
  const resolutionValue = document.getElementById('resolution-value');
  const detectionCountValue = document.getElementById('detection-count-value');
  const processingTimeValue = document.getElementById('processing-time-value');
  const fpsChart = document.getElementById('fps-chart');
  const memoryChart = document.getElementById('memory-chart');
  
  // App state
  let isDetecting = false;
  let detectionInterval = null;
  let currentStream = null;
  let currentMode = 'lite';
  let availableCameras = [];
  
  // Diagnostic state
  let diagnosticsEnabled = false;
  let frameCount = 0;
  let fpsStartTime = performance.now();
  let lastFrameTime = performance.now();
  let frameTimings = [];
  let cpuUsageHistory = [];
  let memoryUsageHistory = [];
  let detectionLatency = 0;
  
  // Set up canvas
  canvas.width = 640;
  canvas.height = 480;
  const ctx = canvas.getContext('2d');
  
  // Configure canvas for mirrored video (horizontally flipped)
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  
  // Event listeners
  startBtn.addEventListener('click', startDetection);
  stopBtn.addEventListener('click', stopDetection);
  diagnosticsBtn.addEventListener('click', () => toggleDiagnostics());
  
  // Mode selector
  document.querySelectorAll('input[name="mode"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      currentMode = e.target.value;
      console.log('Mode changed to:', currentMode);
    });
  });
  
  // Camera selector
  cameraSelect.addEventListener('change', (e) => {
    if (e.target.value) {
      switchCamera(e.target.value);
    }
  });
  
  // Threshold slider
  thresholdSlider.addEventListener('input', (e) => {
    thresholdValue.textContent = e.target.value;
  });
  
  // Initialize camera and start preview immediately
  loadCameras();
  startCameraPreview();
  
  // Initialize diagnostic charts after DOM is ready
  setTimeout(() => {
    if (fpsChart && memoryChart) {
      initializeDiagnosticCharts();
    }
  }, 100);
  
  async function loadCameras() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      availableCameras = devices.filter(device => device.kind === 'videoinput');
      
      if (availableCameras.length > 1) {
        cameraSelector.style.display = 'block';
        cameraSelect.innerHTML = availableCameras.map((camera, index) => 
          `<option value="${camera.deviceId}">${camera.label || 'Camera ' + (index + 1)}</option>`
        ).join('');
      }
      
      console.log('Found cameras:', availableCameras.length);
    } catch (error) {
      console.error('Failed to load cameras:', error);
    }
  }
  
  async function startCameraPreview() {
    try {
      console.log('Starting camera preview...');
      
      // Get camera stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      
      video.srcObject = stream;
      currentStream = stream;
      
      // Wait for video to be ready
      video.addEventListener('loadedmetadata', () => {
        console.log('Camera preview ready');
        // Update video resolution display
        if (diagnosticsEnabled) {
          resolutionValue.textContent = `${video.videoWidth}x${video.videoHeight}`;
        }
      });
      
    } catch (error) {
      console.warn('Camera preview not available (possibly in headless mode):', error.message);
      // Don't show error in headless environments, just log it
      if (error.name !== 'NotAllowedError' && error.name !== 'NotFoundError') {
        console.error('Failed to start camera preview:', error);
      }
    }
  }
  
  async function startDetection() {
    if (isDetecting) return;
    
    try {
      console.log('Starting face detection...');
      
      // If no camera stream, start it first
      if (!currentStream) {
        await startCameraPreview();
      }
      
      // Start detection loop
      isDetecting = true;
      startBtn.disabled = true;
      stopBtn.disabled = false;
      
      detectionInterval = setInterval(detectFaces, 100);
      
    } catch (error) {
      console.error('Failed to start detection:', error);
      showError('Failed to start detection: ' + error.message);
    }
  }
  
  function stopDetection() {
    if (!isDetecting) return;
    
    console.log('Stopping detection...');
    
    isDetecting = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    if (detectionInterval) {
      clearInterval(detectionInterval);
      detectionInterval = null;
    }
    
    // Clear canvas but keep camera preview
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    stats.innerHTML = '';
  }
  
  async function detectFaces() {
    if (!isDetecting || !video.videoWidth || !video.videoHeight) return;
    
    const detectionStartTime = performance.now();
    
    try {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({
        inputSize: 416,
        scoreThreshold: parseFloat(thresholdSlider.value)
      }))
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();
      
      // Calculate detection latency
      detectionLatency = performance.now() - detectionStartTime;
      
      // Clear canvas (account for the mirrored transformation)
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      
      if (detections.length > 0) {
        console.log('Detected faces:', detections.length);
        
        detections.forEach(detection => {
          let { x, y, width, height } = detection.detection.box;
          
          // Tighten bounding box around face (reduce padding)
          const padding = Math.min(width, height) * 0.1; // 10% padding instead of default
          x += padding;
          y += padding;
          width -= padding * 2;
          height -= padding * 2;
          
          // Mirror the x coordinate for flipped video
          const mirroredX = canvas.width - x - width;
          
          if (currentMode === 'lite') {
            // Draw tighter bounding box
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;
            ctx.strokeRect(mirroredX, y, width, height);
            
            // Draw confidence (positioned correctly for mirrored view)
            ctx.fillStyle = '#00ff00';
            ctx.font = '16px Arial';
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform for text
            ctx.scale(-1, 1); // Re-mirror text to display correctly
            ctx.fillText(`${(detection.detection.score * 100).toFixed(1)}%`, -mirroredX - ctx.measureText(`${(detection.detection.score * 100).toFixed(1)}%`).width, y - 5);
            ctx.restore();
          } else if (currentMode === 'pro') {
            // Draw tighter bounding box
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;
            ctx.strokeRect(mirroredX, y, width, height);
            
            // Draw landmarks (mirror the x coordinates)
            if (detection.landmarks) {
              ctx.fillStyle = '#ff0000';
              detection.landmarks.positions.forEach(point => {
                const mirroredPointX = canvas.width - point.x;
                ctx.fillRect(mirroredPointX - 1, point.y - 1, 2, 2);
              });
            }
            
            // Draw age and gender (positioned correctly for mirrored view)
            if (detection.age && detection.gender) {
              ctx.fillStyle = '#00ff00';
              ctx.font = '14px Arial';
              ctx.save();
              ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform for text
              ctx.scale(-1, 1); // Re-mirror text to display correctly
              const text = `${detection.gender} ${Math.round(detection.age)}y`;
              ctx.fillText(text, -mirroredX - ctx.measureText(text).width, y + height + 15);
              ctx.restore();
            }
          }
        });
        
        // Update stats
        stats.innerHTML = `Faces detected: ${detections.length}`;
        
        // Update detection count for diagnostics
        if (diagnosticsEnabled) {
          detectionCountValue.textContent = detections.length.toString();
        }
      } else {
        stats.innerHTML = 'No faces detected';
        if (diagnosticsEnabled) {
          detectionCountValue.textContent = '0';
        }
      }
      
      // Update diagnostics if enabled
      if (diagnosticsEnabled) {
        updateDiagnostics();
      }
      
    } catch (error) {
      console.error('Detection error:', error);
    }
  }
  
  async function switchCamera(deviceId) {
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop());
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId }, width: 640, height: 480 }
      });
      
      video.srcObject = stream;
      currentStream = stream;
      console.log('Switched to camera:', deviceId);
      
      // Update video resolution display
      setTimeout(() => {
        if (diagnosticsEnabled && video.videoWidth && video.videoHeight) {
          resolutionValue.textContent = `${video.videoWidth}x${video.videoHeight}`;
        }
      }, 100);
    } catch (error) {
      console.error('Failed to switch camera:', error);
    }
  }
  
  function toggleDiagnostics() {
    diagnosticsEnabled = !diagnosticsEnabled;
    diagnostics.style.display = diagnosticsEnabled ? 'block' : 'none';
    diagnosticsBtn.textContent = diagnosticsEnabled ? 'Hide Diagnostics' : 'Show Diagnostics';
    
    if (diagnosticsEnabled) {
      startDiagnosticUpdates();
    } else {
      stopDiagnosticUpdates();
    }
  }

  function initializeDiagnosticCharts() {
    try {
      // Initialize FPS chart
      if (fpsChart) {
        const fpsCtx = fpsChart.getContext('2d');
        fpsCtx.fillStyle = '#f8f9fa';
        fpsCtx.fillRect(0, 0, 300, 100);
        fpsCtx.strokeStyle = '#007bff';
        fpsCtx.lineWidth = 2;
      }
      
      // Initialize memory chart
      if (memoryChart) {
        const memoryCtx = memoryChart.getContext('2d');
        memoryCtx.fillStyle = '#f8f9fa';
        memoryCtx.fillRect(0, 0, 300, 100);
        memoryCtx.strokeStyle = '#28a745';
        memoryCtx.lineWidth = 2;
      }
    } catch (error) {
      console.warn('Failed to initialize diagnostic charts:', error);
    }
  }

  function startDiagnosticUpdates() {
    if (diagnosticsEnabled) {
      updateDiagnostics();
      setTimeout(startDiagnosticUpdates, 1000); // Update every second
    }
  }

  function stopDiagnosticUpdates() {
    // Clear diagnostic timers if needed
  }

  function updateDiagnostics() {
    if (!diagnosticsEnabled) return;
    
    // Calculate FPS
    const now = performance.now();
    const deltaTime = now - lastFrameTime;
    lastFrameTime = now;
    
    frameTimings.push(deltaTime);
    if (frameTimings.length > 60) frameTimings.shift(); // Keep last 60 frames
    
    const avgFrameTime = frameTimings.reduce((a, b) => a + b, 0) / frameTimings.length;
    const fps = 1000 / avgFrameTime;
    
    // Update FPS display
    fpsValue.textContent = fps.toFixed(1);
    frameTimeValue.textContent = avgFrameTime.toFixed(1) + 'ms';
    
    // Update memory usage
    if (performance.memory) {
      const memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024; // MB
      memoryValue.textContent = memoryUsage.toFixed(1) + 'MB';
      
      memoryUsageHistory.push(memoryUsage);
      if (memoryUsageHistory.length > 100) memoryUsageHistory.shift();
    }
    
    // Estimate CPU usage based on frame processing time
    const cpuUsage = Math.min(100, (avgFrameTime / 16.67) * 100); // 16.67ms = 60fps
    cpuValue.textContent = cpuUsage.toFixed(1) + '%';
    
    // Update video resolution
    if (video.videoWidth && video.videoHeight) {
      resolutionValue.textContent = `${video.videoWidth}x${video.videoHeight}`;
    }
    
    // Update detection latency
    detectionLatencyValue.textContent = detectionLatency.toFixed(1) + 'ms';
    
    // Update processing time
    processingTimeValue.textContent = avgFrameTime.toFixed(1) + 'ms';
    
    // Update charts
    updateFpsChart();
    updateMemoryChart();
  }

  function updateFpsChart() {
    if (!fpsChart) return;
    
    const ctx = fpsChart.getContext('2d');
    const width = 300;
    const height = 100;
    
    // Clear canvas
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, width, height);
    
    // Draw FPS line
    if (frameTimings.length > 1) {
      ctx.strokeStyle = '#007bff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      const maxFps = 60;
      const step = width / Math.max(frameTimings.length - 1, 1);
      
      frameTimings.forEach((timing, index) => {
        const fps = Math.min(maxFps, 1000 / timing);
        const x = index * step;
        const y = height - (fps / maxFps) * height;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
    }
    
    // Draw labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.fillText('FPS', 5, 15);
    ctx.fillText('60', 5, 25);
    ctx.fillText('0', 5, height - 5);
  }

  function updateMemoryChart() {
    if (!memoryChart) return;
    
    const ctx = memoryChart.getContext('2d');
    const width = 300;
    const height = 100;
    
    // Clear canvas
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, width, height);
    
    // Draw memory usage line
    if (memoryUsageHistory.length > 1) {
      ctx.strokeStyle = '#28a745';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      const maxMemory = Math.max(...memoryUsageHistory, 50); // At least 50MB scale
      const step = width / Math.max(memoryUsageHistory.length - 1, 1);
      
      memoryUsageHistory.forEach((usage, index) => {
        const x = index * step;
        const y = height - (usage / maxMemory) * height;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
    }
    
    // Draw labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.fillText('Memory', 5, 15);
    if (memoryUsageHistory.length > 0) {
      ctx.fillText(Math.max(...memoryUsageHistory).toFixed(0) + 'MB', 5, 25);
    }
    ctx.fillText('0MB', 5, height - 5);
  }

  console.log('App initialized successfully!');
}

function showError(message) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="error">
      <h2>Error</h2>
      <p>${message}</p>
      <button onclick="location.reload()">Retry</button>
    </div>
  `;
}