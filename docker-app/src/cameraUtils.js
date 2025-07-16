export class CameraManager {
  constructor(options = {}) {
    this.options = {
      preferredWidth: options.preferredWidth || 640,
      preferredHeight: options.preferredHeight || 480,
      facingMode: options.facingMode || 'user',
      ...options
    };
    
    this.stream = null;
    this.videoElement = null;
    this.isActive = false;
  }

  async startCamera(videoElement) {
    if (this.isActive) {
      console.warn('Camera is already active');
      return this.stream;
    }

    this.videoElement = videoElement;

    try {
      // Check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('getUserMedia is not supported in this browser');
      }

      // Get constraints using the updated method
      const constraints = this.getCameraConstraints();

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      // Attach stream to video element
      this.videoElement.srcObject = this.stream;
      
      // Wait for video to be ready
      await this.waitForVideoReady();
      
      this.isActive = true;
      
      return this.stream;
    } catch (error) {
      this.handleCameraError(error);
      throw error;
    }
  }

  async waitForVideoReady() {
    return new Promise((resolve, reject) => {
      if (this.videoElement.readyState >= 2) {
        resolve();
        return;
      }

      const timeout = setTimeout(() => {
        reject(new Error('Video loading timeout'));
      }, 10000);

      this.videoElement.addEventListener('loadedmetadata', () => {
        clearTimeout(timeout);
        resolve();
      }, { once: true });

      this.videoElement.addEventListener('error', (error) => {
        clearTimeout(timeout);
        reject(error);
      }, { once: true });
    });
  }

  handleCameraError(error) {
    let errorMessage = 'Camera access error: ';

    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      errorMessage += 'Camera permission denied. Please allow camera access.';
    } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      errorMessage += 'No camera found on this device.';
    } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
      errorMessage += 'Camera is already in use by another application.';
    } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
      errorMessage += 'Camera does not support the requested resolution.';
    } else if (error.name === 'TypeError') {
      errorMessage += 'Invalid camera constraints.';
    } else {
      errorMessage += error.message || 'Unknown error occurred.';
    }

    console.error(errorMessage, error);
    throw new Error(errorMessage);
  }

  async stopCamera() {
    if (this.stream) {
      // Stop all tracks
      this.stream.getTracks().forEach(track => {
        track.stop();
      });
      
      // Clear video source
      if (this.videoElement) {
        this.videoElement.srcObject = null;
      }
      
      this.stream = null;
      this.isActive = false;
    }
  }

  async switchCamera() {
    if (!this.isActive) {
      throw new Error('Camera is not active');
    }

    // Toggle facing mode
    this.options.facingMode = this.options.facingMode === 'user' ? 'environment' : 'user';
    
    // Stop current camera
    await this.stopCamera();
    
    // Start with new camera
    await this.startCamera(this.videoElement);
  }

  async getAvailableCameras() {
    try {
      // First request camera permissions if not already granted
      // This ensures we get labeled devices
      if (!this.stream) {
        try {
          const tempStream = await navigator.mediaDevices.getUserMedia({ video: true });
          tempStream.getTracks().forEach(track => track.stop());
        } catch (e) {
          // User denied permission or no cameras available
          console.warn('Camera permission not granted:', e);
        }
      }

      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(device => device.kind === 'videoinput');
      
      // Add friendly names if labels are empty
      return cameras.map((camera, index) => ({
        deviceId: camera.deviceId,
        label: camera.label || `Camera ${index + 1}`,
        groupId: camera.groupId
      }));
    } catch (error) {
      console.error('Failed to enumerate devices:', error);
      return [];
    }
  }

  async selectCamera(deviceId) {
    if (!deviceId) {
      throw new Error('Device ID is required');
    }

    this.options.deviceId = deviceId;
    
    if (this.isActive) {
      await this.stopCamera();
      await this.startCamera(this.videoElement);
    }
  }

  getCameraConstraints() {
    const constraints = {
      video: {
        width: { ideal: this.options.preferredWidth },
        height: { ideal: this.options.preferredHeight }
      }
    };

    if (this.options.deviceId) {
      constraints.video.deviceId = { exact: this.options.deviceId };
    } else {
      constraints.video.facingMode = this.options.facingMode;
    }

    return constraints;
  }

  getStreamInfo() {
    if (!this.stream || !this.stream.active) {
      return null;
    }

    const videoTrack = this.stream.getVideoTracks()[0];
    if (!videoTrack) {
      return null;
    }

    const settings = videoTrack.getSettings();
    return {
      width: settings.width,
      height: settings.height,
      frameRate: settings.frameRate,
      deviceId: settings.deviceId,
      facingMode: settings.facingMode,
      label: videoTrack.label
    };
  }

  isStreamActive() {
    return this.isActive && this.stream && this.stream.active;
  }

  async takeSnapshot() {
    if (!this.videoElement || !this.isActive) {
      throw new Error('Camera is not active');
    }

    const canvas = document.createElement('canvas');
    canvas.width = this.videoElement.videoWidth;
    canvas.height = this.videoElement.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(this.videoElement, 0, 0);
    
    return canvas.toDataURL('image/png');
  }
}

export default CameraManager;