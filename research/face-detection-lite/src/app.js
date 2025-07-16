// Face Detection Application
class FaceDetectionApp {
    constructor() {
        // Elements
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('overlay');
        this.ctx = this.canvas.getContext('2d');
        this.loader = document.getElementById('loader');
        
        // Buttons
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.switchCameraBtn = document.getElementById('switchCameraBtn');
        this.modelSelect = document.getElementById('modelSelect');
        
        // Options
        this.showLandmarks = document.getElementById('showLandmarks');
        this.showExpressions = document.getElementById('showExpressions');
        this.showAgeGender = document.getElementById('showAgeGender');
        
        // Stats
        this.fpsElement = document.getElementById('fps');
        this.faceCountElement = document.getElementById('faceCount');
        this.processTimeElement = document.getElementById('processTime');
        this.currentModelElement = document.getElementById('currentModel');
        
        // State
        this.isRunning = false;
        this.currentStream = null;
        this.currentDeviceId = null;
        this.devices = [];
        this.currentDeviceIndex = 0;
        this.animationId = null;
        
        // Performance tracking
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fps = 0;
        
        // Model options
        this.modelOptions = {
            tiny: new faceapi.TinyFaceDetectorOptions({
                inputSize: 416,
                scoreThreshold: 0.5
            }),
            ssd: new faceapi.SsdMobilenetv1Options({
                minConfidence: 0.5
            })
        };
        
        this.currentModel = 'tiny';
        
        // Initialize
        this.init();
    }
    
    async init() {
        // Show loader
        this.loader.classList.add('active');
        
        try {
            // Load models
            await this.loadModels();
            
            // Get camera devices
            await this.getCameraDevices();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Hide loader
            this.loader.classList.remove('active');
            
            console.log('Face detection app initialized');
        } catch (error) {
            console.error('Initialization error:', error);
            this.showError('Failed to initialize. Please check console for details.');
            this.loader.classList.remove('active');
        }
    }
    
    async loadModels() {
        const MODEL_URL = 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights';
        
        // Load required models
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
        ]);
        
        console.log('All models loaded');
    }
    
    async getCameraDevices() {
        const devices = await navigator.mediaDevices.enumerateDevices();
        this.devices = devices.filter(device => device.kind === 'videoinput');
        
        console.log('Found cameras:', this.devices.length);
        
        // Hide switch camera button if only one camera
        if (this.devices.length <= 1) {
            this.switchCameraBtn.style.display = 'none';
        }
    }
    
    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.switchCameraBtn.addEventListener('click', () => this.switchCamera());
        this.modelSelect.addEventListener('change', (e) => this.changeModel(e.target.value));
        
        // Handle video metadata loaded
        this.video.addEventListener('loadedmetadata', () => {
            this.canvas.width = this.video.videoWidth;
            this.canvas.height = this.video.videoHeight;
        });
    }
    
    async start() {
        try {
            this.loader.classList.add('active');
            this.loader.textContent = 'Starting camera...';
            
            // Get user media
            await this.startCamera();
            
            // Update UI
            this.startBtn.disabled = true;
            this.stopBtn.disabled = false;
            this.isRunning = true;
            
            // Start detection loop
            this.detect();
            
            this.loader.classList.remove('active');
        } catch (error) {
            console.error('Start error:', error);
            this.showError('Failed to start camera. Please ensure camera permissions are granted.');
            this.loader.classList.remove('active');
        }
    }
    
    async startCamera(deviceId = null) {
        // Stop current stream if exists
        if (this.currentStream) {
            this.currentStream.getTracks().forEach(track => track.stop());
        }
        
        const constraints = {
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: deviceId ? undefined : 'user'
            }
        };
        
        if (deviceId) {
            constraints.video.deviceId = { exact: deviceId };
        }
        
        this.currentStream = await navigator.mediaDevices.getUserMedia(constraints);
        this.video.srcObject = this.currentStream;
        
        // Store current device ID
        const videoTrack = this.currentStream.getVideoTracks()[0];
        const settings = videoTrack.getSettings();
        this.currentDeviceId = settings.deviceId;
    }
    
    stop() {
        this.isRunning = false;
        
        // Stop animation
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        // Stop camera
        if (this.currentStream) {
            this.currentStream.getTracks().forEach(track => track.stop());
            this.currentStream = null;
        }
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update UI
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        
        // Reset stats
        this.fpsElement.textContent = '0';
        this.faceCountElement.textContent = '0';
        this.processTimeElement.textContent = '0ms';
    }
    
    async switchCamera() {
        if (this.devices.length <= 1) return;
        
        this.currentDeviceIndex = (this.currentDeviceIndex + 1) % this.devices.length;
        const newDevice = this.devices[this.currentDeviceIndex];
        
        try {
            await this.startCamera(newDevice.deviceId);
        } catch (error) {
            console.error('Switch camera error:', error);
            this.showError('Failed to switch camera');
        }
    }
    
    changeModel(model) {
        this.currentModel = model;
        this.currentModelElement.textContent = model === 'tiny' ? 'Tiny Face' : 'SSD MobileNet';
    }
    
    async detect() {
        if (!this.isRunning) return;
        
        const startTime = performance.now();
        
        try {
            // Clear previous drawings
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Detect faces
            let detections;
            
            if (this.currentModel === 'tiny') {
                detections = await faceapi.detectAllFaces(
                    this.video, 
                    this.modelOptions.tiny
                );
            } else {
                detections = await faceapi.detectAllFaces(
                    this.video, 
                    this.modelOptions.ssd
                );
            }
            
            // Add landmarks if enabled
            if (this.showLandmarks.checked) {
                detections = await faceapi.detectAllFaces(
                    this.video,
                    this.currentModel === 'tiny' ? this.modelOptions.tiny : this.modelOptions.ssd
                ).withFaceLandmarks();
            }
            
            // Add expressions if enabled
            if (this.showExpressions.checked) {
                detections = await faceapi.detectAllFaces(
                    this.video,
                    this.currentModel === 'tiny' ? this.modelOptions.tiny : this.modelOptions.ssd
                ).withFaceLandmarks().withFaceExpressions();
            }
            
            // Add age and gender if enabled
            if (this.showAgeGender.checked) {
                detections = await faceapi.detectAllFaces(
                    this.video,
                    this.currentModel === 'tiny' ? this.modelOptions.tiny : this.modelOptions.ssd
                ).withFaceLandmarks().withAgeAndGender();
            }
            
            // Draw detections
            this.drawDetections(detections);
            
            // Update stats
            const processTime = performance.now() - startTime;
            this.updateStats(detections.length, processTime);
            
        } catch (error) {
            console.error('Detection error:', error);
        }
        
        // Continue detection loop
        this.animationId = requestAnimationFrame(() => this.detect());
    }
    
    drawDetections(detections) {
        // Resize canvas if needed
        const displaySize = { width: this.video.videoWidth, height: this.video.videoHeight };
        faceapi.matchDimensions(this.canvas, displaySize);
        
        // Resize detections
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        
        // Draw bounding boxes
        resizedDetections.forEach(detection => {
            const box = detection.detection.box;
            
            // Draw box
            this.ctx.strokeStyle = '#00ff00';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(box.x, box.y, box.width, box.height);
            
            // Draw landmarks if available
            if (detection.landmarks && this.showLandmarks.checked) {
                faceapi.draw.drawFaceLandmarks(this.canvas, detection);
            }
            
            // Draw expressions if available
            if (detection.expressions && this.showExpressions.checked) {
                const expressions = detection.expressions;
                const maxExpression = Object.entries(expressions)
                    .reduce((a, b) => a[1] > b[1] ? a : b);
                
                this.drawLabel(
                    `${maxExpression[0]} (${Math.round(maxExpression[1] * 100)}%)`,
                    box.x,
                    box.y - 10
                );
            }
            
            // Draw age and gender if available
            if (detection.age && detection.gender && this.showAgeGender.checked) {
                const age = Math.round(detection.age);
                const gender = detection.gender;
                const genderProbability = Math.round(detection.genderProbability * 100);
                
                this.drawLabel(
                    `${gender} (${genderProbability}%), ${age} years`,
                    box.x,
                    box.y + box.height + 20
                );
            }
        });
    }
    
    drawLabel(text, x, y) {
        this.ctx.font = '14px Arial';
        this.ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
        const textWidth = this.ctx.measureText(text).width;
        this.ctx.fillRect(x - 2, y - 14, textWidth + 4, 18);
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(text, x, y);
    }
    
    updateStats(faceCount, processTime) {
        // Update face count
        this.faceCountElement.textContent = faceCount;
        
        // Update process time
        this.processTimeElement.textContent = `${Math.round(processTime)}ms`;
        
        // Calculate FPS
        this.frameCount++;
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastTime;
        
        if (deltaTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / deltaTime);
            this.fpsElement.textContent = this.fps;
            this.frameCount = 0;
            this.lastTime = currentTime;
        }
    }
    
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const container = document.querySelector('.container');
        container.insertBefore(errorDiv, container.firstChild);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FaceDetectionApp();
});