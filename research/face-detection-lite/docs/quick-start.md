# Quick Start Guide - Face Detection Lite

## Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Webcam or camera device
- Basic web server (for local development)

## Getting Started in 30 Seconds

### Option 1: Direct Browser Opening (Simplest)
1. Open `index.html` in your browser
2. Allow camera permissions when prompted
3. Click "Start Detection"

**Note**: Some browsers may block camera access when opening files directly. Use a local server for best results.

### Option 2: Using Python HTTP Server (Recommended)
```bash
# Navigate to the project directory
cd face-detection-repo/research/face-detection-lite

# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open http://localhost:8000 in your browser.

### Option 3: Using Node.js HTTP Server
```bash
# Install http-server globally (one-time)
npm install -g http-server

# Navigate to project directory
cd face-detection-repo/research/face-detection-lite

# Start server
http-server -p 8000
```
Then open http://localhost:8000 in your browser.

### Option 4: Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Basic Usage

### Starting Face Detection
1. Click "Start Detection" button
2. Grant camera permissions if prompted
3. Face detection begins automatically
4. Green boxes appear around detected faces

### Model Selection
- **Tiny Face Detector (Default)**: Fast, works on most devices
- **SSD MobileNet**: More accurate but slower

### Additional Features
- **Show Landmarks**: Display 68 facial feature points
- **Show Expressions**: Detect emotions (happy, sad, angry, etc.)
- **Show Age & Gender**: Estimate age and gender
- **Switch Camera**: Toggle between cameras (if multiple available)

## Understanding the Display

### Bounding Boxes
- **Green boxes**: Detected faces using Tiny Face Detector
- **Red boxes**: Detected faces using SSD MobileNet (in comparison mode)
- **Percentage**: Confidence score of detection

### Statistics Panel
- **FPS**: Frames processed per second (higher is better)
- **Faces Detected**: Number of faces currently detected
- **Processing Time**: Time taken for each detection cycle
- **Model**: Currently active detection model

## Troubleshooting

### Camera Not Working
1. **Check permissions**: Look for camera icon in address bar
2. **HTTPS required**: Some browsers require HTTPS for camera access
3. **Try different browser**: Chrome/Edge usually work best

### Low Performance
1. **Switch to Tiny Face Detector**: Faster model
2. **Reduce browser tabs**: Close unnecessary tabs
3. **Check lighting**: Better lighting improves detection speed
4. **Update browser**: Ensure you're using latest version

### No Faces Detected
1. **Check lighting**: Ensure adequate lighting on face
2. **Face angle**: Look directly at camera
3. **Distance**: Move closer to camera
4. **Clean camera**: Wipe camera lens

## Examples to Try

### 1. Minimal Detection
Open `examples/minimal-detection.html` for a bare-bones implementation showing only essential code.

### 2. Performance Comparison
Open `examples/performance-comparison.html` to see side-by-side comparison of different models.

## Performance Tips

### For Best Performance
- Use Chrome or Edge browser
- Close other applications
- Ensure good lighting
- Use Tiny Face Detector model
- Disable additional features (landmarks, expressions)

### For Best Accuracy
- Use SSD MobileNet model
- Ensure face is well-lit
- Look directly at camera
- Stay within 1-2 meters of camera

## Customization

### Changing Detection Sensitivity
Edit `src/app.js`:
```javascript
// For Tiny Face Detector
new faceapi.TinyFaceDetectorOptions({
    inputSize: 416,      // Larger = more accurate, slower
    scoreThreshold: 0.5  // Lower = more detections, more false positives
})

// For SSD MobileNet
new faceapi.SsdMobilenetv1Options({
    minConfidence: 0.5   // Lower = more detections, more false positives
})
```

### Changing Visual Style
Edit `src/styles.css`:
```css
/* Change box color */
.face-box {
    stroke: #00ff00;  /* Change to any color */
    stroke-width: 2;  /* Change thickness */
}
```

## API Integration

### Getting Detection Data
```javascript
// Modify app.js to expose detection data
window.getLastDetections = function() {
    return lastDetections;
};

// Access from console or other scripts
const faces = window.getLastDetections();
console.log(`Found ${faces.length} faces`);
```

### Capturing Screenshots
```javascript
// Add to your code
function captureScreenshot() {
    const video = document.getElementById('video');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    // Get image as data URL
    const imageData = canvas.toDataURL('image/png');
    
    // Download image
    const link = document.createElement('a');
    link.download = 'face-detection.png';
    link.href = imageData;
    link.click();
}
```

## Next Steps

### Learn More
- Read the [technical documentation](algorithms.md) for deep dive into algorithms
- Check [optimization guide](optimization-guide.md) for performance tuning
- Explore the source code in `src/app.js`

### Build Something
- Add face filters or masks
- Create a face-based game
- Build an attendance system
- Implement face-based UI controls

### Contribute
- Report issues on GitHub
- Share your improvements
- Create new examples

---

*This quick start guide helps you get up and running with face detection in minutes. For more advanced topics, check the other documentation files.*