# 🎯 Face Detection Docker App

A containerized face detection application using face-api.js, built with modern web technologies and served through Docker.

## ✨ Features

- Real-time face detection using webcam
- **📹 Multiple camera support** - Switch between available cameras
- **🎯 Two detection modes:**
  - **🚀 Lite Mode**: Fast bounding box detection only (30 FPS)
  - **⚡ Pro Mode**: Advanced features with landmarks, expressions, age/gender (15-20 FPS)
- Face landmarks detection (68 points)
- Facial expression recognition
- Age and gender estimation
- Dockerized for easy deployment
- Multi-stage Docker build for optimized image size
- Development and production configurations

## 📁 Project Structure

```
docker-app/
├── src/                    # Application source code
│   ├── index.js           # Main application entry
│   └── styles.css         # Application styles
├── tests/                  # Test files
│   ├── unit/              # Unit tests
│   └── e2e/               # End-to-end tests
├── public/                 # Static assets
│   └── index.html         # HTML template
├── Dockerfile             # Production Docker configuration
├── Dockerfile.dev         # Development Docker configuration
├── docker-compose.yml     # Docker Compose configuration
├── nginx.conf             # Nginx server configuration
├── package.json           # NPM dependencies and scripts
├── webpack.*.js           # Webpack configurations
└── .dockerignore          # Docker ignore patterns
```

## 🚀 Quick Start

### 🐳 Using Docker Compose

1. **🏗️ Build and run the production container:**
   ```bash
   docker-compose up face-detection-app
   ```
   The app will be available at http://localhost:8080

2. **🔧 Run in development mode:**
   ```bash
   docker-compose up face-detection-dev
   ```
   The dev server will be available at http://localhost:3000 with hot reload

### 🔧 Using Docker directly

1. **🏗️ Build the production image:**
   ```bash
   docker build -t face-detection-app .
   ```

2. **🚀 Run the container:**
   ```bash
   docker run -p 8080:8080 face-detection-app
   ```

## 👨‍💻 Development

### 💻 Local Development (without Docker)

1. **📦 Install dependencies:**
   ```bash
   npm install
   ```

2. **🔧 Run development server:**
   ```bash
   npm run dev
   ```

3. **🏗️ Build for production:**
   ```bash
   npm run build
   ```

4. **🧪 Run tests:**
   ```bash
   npm test                # Unit tests
   npm run test:e2e       # E2E tests
   ```

### 📜 Scripts

- `npm run dev` - Start webpack dev server with hot reload
- `npm run build` - Build production bundle
- `npm start` - Start Express server (requires build)
- `npm test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint

## 🐳 Docker Details

### 🏭 Production Dockerfile

The production Dockerfile uses a multi-stage build:
1. **Builder stage** - Installs dependencies and builds the application
2. **Production stage** - Uses nginx:alpine for serving the built files

Features:
- Small image size (~50MB)
- Security headers configured
- Gzip compression enabled
- Health check endpoint
- Optimized for caching

### 🔧 Development Dockerfile

The development Dockerfile:
- Includes development tools
- Mounts source code as volumes
- Enables hot reload
- Includes debugging capabilities

## ⚙️ Configuration

### 🌐 Nginx Configuration

The nginx.conf includes:
- Gzip compression for better performance
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Cache headers for static assets
- SPA fallback routing
- Health check endpoint at `/health`

### 📦 Webpack Configuration

- **Common**: Shared configuration for both dev and production
- **Development**: Source maps, dev server, hot reload
- **Production**: Minification, code splitting, optimizations

## 🎮 Usage

### 📹 Camera Selection

When multiple cameras are available on your device, a camera selector will automatically appear:

1. The camera selector dropdown is shown only when 2 or more cameras are detected
2. Select your preferred camera from the dropdown menu
3. The app will automatically switch to the selected camera
4. Detection will continue seamlessly during camera switching

### 🎯 Detection Modes

Toggle between two detection modes:

- **🚀 Lite Mode**: Optimized for speed with basic bounding box detection
- **⚡ Pro Mode**: Full feature set including landmarks, expressions, and age/gender detection

### 🌡️ Detection Threshold

Use the threshold slider to adjust detection sensitivity (0.1 to 0.9):
- Lower values: More detections but potentially more false positives
- Higher values: Fewer but more confident detections

## 🌐 Browser Requirements

- Modern browser with WebRTC support
- Camera/webcam access
- JavaScript enabled

## 🔒 Security Considerations

- The app requires camera permissions
- All face detection happens client-side
- No data is sent to external servers
- Docker image uses non-root user (nginx)
- Security headers are configured

## ⚡ Performance

- Multi-stage Docker build reduces image size
- Static assets are cached with long expiry
- Code splitting for optimal loading
- face-api.js models are cached after first load

## 🛠️ Troubleshooting

1. **📹 Camera not working:**
   - Ensure browser has camera permissions
   - Check if camera is being used by another app
   - Try using HTTPS (some browsers require it)

2. **🤖 Models not loading:**
   - Check browser console for errors
   - Ensure `/models` path is accessible
   - Verify face-api.js weights are copied correctly

3. **🐳 Docker build fails:**
   - Ensure Docker daemon is running
   - Check available disk space
   - Try clearing Docker cache: `docker system prune`

## 🤖 Development History & Prompts

This application was developed through an iterative process using AI-assisted programming. The following prompts guided the development:

### 1. 🏗️ Initial Docker Application Development
**Prompt**: 
> "Based on the research in face-detection-repo/research build a docker image which exposes a single port and serves a web application which uses the user's camera to power two levels of face detection. Lite shows a bounding box around the face. Pro shows an overlay over the face with markers showing various landmarks. Use test driven development to build this application."

**Result**: Created the foundational Docker application with basic face detection capabilities.

### 2. 📹 Multi-Camera Support Implementation
**Prompt**: 
> "Update the application to allow the user to select from multiple cameras--provided there are multiple cameras to select from."

**Technical Implementation**:
- Added `navigator.mediaDevices.enumerateDevices()` to detect available cameras
- Implemented dynamic camera selector UI that shows/hides based on camera count
- Created `switchCamera()` function for seamless camera switching
- Added camera enumeration in `cameraUtils.js`

### 3. 🔧 Docker Configuration Fixes
**Prompt**: 
> "Fix this issue. docker compose logs -f WARN[0000] /workspaces/face-detection/face-detection-repo/docker-app/docker-compose.yml: the attribute 'version' is obsolete, it will be ignored, please remove it to avoid potential confusion healthcheck.test must start either by 'CMD', 'CMD-SHELL' or 'NONE'"

**Technical Implementation**:
- Removed obsolete `version: '3.8'` from docker-compose.yml
- Fixed healthcheck syntax: `test: ["CMD", "/usr/local/bin/health-check"]`
- Updated Docker Compose to modern syntax standards

### 4. ⚡ Build Performance Optimization
**Prompt**: 
> "Seems the build process is hung. [+] Building 239.0s (18/23) ..."

**Technical Implementation**:
- Created simplified `Dockerfile.simple` to diagnose build issues
- Implemented `download-models.js` script for automated model downloading
- Fixed missing face-api.js model files that were causing build hangs
- Optimized Docker build layers for better caching

### 5. 🔄 Application Loading Issues
**Prompt**: 
> "Loading Face Detection App... Please wait while we load the models. nothing else shows"

**Technical Implementation**:
- Switched from ES6 modules to vanilla JavaScript for better browser compatibility
- Changed from local face-api.js to CDN loading: `https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js`
- Fixed module loading issues that prevented app initialization
- Added proper error handling for model loading failures

### 6. 🎨 Visual and UX Improvements
**Prompt**: 
> "The percentage in the lite bounding box is reverse. It's probably because the camera image is also reversed. Tune the bounding box to minimize around the face instead of showing a broader edge."

**Technical Implementation**:
- Fixed mirrored text rendering with canvas transformation reset and re-mirroring
- Implemented tighter bounding boxes with 10% padding instead of default
- Added proper coordinate mirroring for video display
- Enhanced visual accuracy with `mirroredX` calculations

### 7. 📊 Diagnostic Features Implementation
**Prompt**: 
> "Include toggleable diagnostic information showing cpu consumption, fps, memory consumption and other important metrics."

**Technical Implementation**:
- Added comprehensive diagnostic panel with real-time metrics
- Implemented performance monitoring: FPS, memory usage, CPU estimation
- Created interactive performance charts using Canvas API
- Added detection latency, processing time, and video resolution tracking

### 8. 🔤 Text Rendering Fixes
**Prompt**: 
> "The text in both modes is backwards. Fix it."

**Technical Implementation**:
```javascript
// Fixed with proper canvas transformation
ctx.save();
ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform for text
ctx.scale(-1, 1); // Re-mirror text to display correctly
ctx.fillText(text, -mirroredX - ctx.measureText(text).width, y);
ctx.restore();
```

### 9. 📹 Camera Preview Enhancement
**Prompt**: 
> "When the page is first loaded, don't show the blank canvas, already load the camera and preview. Starting the detection should start the face detection loop. Also, when pressing show diagnostics, got this in the front end console. app.js:410 Uncaught ReferenceError: diagnosticsEnabled is not defined at HTMLButtonElement.toggleDiagnostics (app.js:410:3) Put the camera detection above the canvas."

**Technical Implementation**:
- Separated camera preview from detection loop for better UX
- Implemented automatic camera preview on page load
- Fixed diagnostics scope error by moving functions inside proper scope
- Repositioned canvas below video for better visibility
- Added `startCameraPreview()` and enhanced `startDetection()` functions

### 🛠️ Key Technical Decisions

1. **🏗️ Architecture**: Chose vanilla JavaScript over frameworks for better performance and simplicity
2. **🤖 Face Detection**: Used face-api.js with TensorFlow.js for browser-based ML processing
3. **🐳 Docker Strategy**: Multi-stage builds for optimized production images
4. **🛡️ Error Handling**: Graceful fallbacks for camera access and model loading issues
5. **⚡ Performance**: 100ms detection interval for smooth real-time processing
6. **🎨 User Experience**: Immediate camera preview, separated from detection controls

### 🔍 Problem-Solving Approach

The development followed a systematic problem-solving approach:
1. **🎯 Issue Identification**: Clear error messages and user feedback
2. **🔍 Root Cause Analysis**: Debugging through console logs and testing
3. **⚙️ Solution Implementation**: Targeted fixes with minimal disruption
4. **🧪 Testing & Validation**: Comprehensive testing after each change
5. **📚 Documentation**: Detailed documentation of all changes and decisions

This iterative approach ensured a robust, user-friendly application that handles real-world scenarios effectively.

## 📜 License

MIT