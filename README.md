# 🎯 Face Detection Repository

[![Docker Build](https://github.com/jedarden/face-detection/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/jedarden/face-detection/actions/workflows/docker-publish.yml)
[![Security Scan](https://github.com/jedarden/face-detection/actions/workflows/security-scan.yml/badge.svg)](https://github.com/jedarden/face-detection/actions/workflows/security-scan.yml)
[![Docker Image](https://ghcr-badge.egpl.dev/jedarden/face-detection/latest_tag?trim=major&label=Docker%20Image&color=blue)](https://github.com/jedarden/face-detection/pkgs/container/face-detection)
[![Security](https://img.shields.io/badge/Security-Patched%20v1.1.0-green)](./docker-app/SECURITY_UPDATE_MIGRATION.md)

This repository contains comprehensive research and implementations of face detection technology, from basic research to production-ready Docker applications.

## 🔒 Security Update (v1.1.0)
All known security vulnerabilities have been patched in version 1.1.0. The application now passes comprehensive security audits with 0 vulnerabilities. See the [Security Migration Guide](./docker-app/SECURITY_UPDATE_MIGRATION.md) for details.

## 📁 Repository Structure

### 1. 🔬 `/research/face-detection-lite` - Research & Web Demo
Comprehensive research on face detection algorithms with a working web demonstration:
- **Research**: Deep dive into Viola-Jones, HOG, and deep learning approaches
- **Implementation**: Browser-based face detection using face-api.js
- **Documentation**: Technical guides, optimization strategies, and deployment instructions
- **Examples**: Minimal implementation and performance comparison demos

✨ Key features:
- Real-time webcam face detection
- Multiple detection models (Tiny Face, SSD MobileNet)
- Optional landmarks, expressions, age/gender detection
- Comprehensive performance optimization guide

### 2. 🐳 `/docker-app` - Production Docker Application
A production-ready Dockerized face detection application with two modes:

#### 🚀 Lite Mode
- Real-time face detection with bounding boxes
- 30 FPS performance target
- Minimal resource usage
- Adjustable detection threshold

#### ⚡ Pro Mode
- 68-point facial landmarks overlay
- Expression recognition (7 emotions)
- Age and gender estimation
- Advanced visualization options
- 15-20 FPS performance

✨ Key features:
- Test-Driven Development approach
- Comprehensive test suite (unit, integration, E2E)
- Multi-stage Docker builds (~95MB image)
- Health monitoring and metrics
- SSL/TLS support
- Production-ready nginx configuration

## 🚀 Quick Start

### 🔬 Research Demo
```bash
cd research/face-detection-lite
python3 -m http.server 8000
# Open http://localhost:8000
```

### 🐳 Docker Application

#### From GitHub Container Registry (Recommended)
```bash
# Pull latest release
docker pull ghcr.io/jedarden/face-detection:latest

# Or pull specific version
docker pull ghcr.io/jedarden/face-detection:v0.0.1

# Run container
docker run -d -p 8080:8080 ghcr.io/jedarden/face-detection:v0.0.1
# Open http://localhost:8080
```

#### From Source
```bash
cd docker-app
docker-compose up
# Open http://localhost:8080
```

### 👨‍💻 Development Mode
```bash
cd docker-app
docker-compose --profile development up
# Open http://localhost:3000
```

## 🛠️ Technologies Used

- **Face Detection**: face-api.js, TensorFlow.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Nginx (production), Express (development)
- **Containerization**: Docker, Docker Compose
- **Testing**: Jest, Puppeteer
- **Build Tools**: Webpack, Babel

## 📊 Performance

- **Lite Mode**: 25-30 FPS on modern hardware
- **Pro Mode**: 15-20 FPS with full features
- **Docker Image**: ~95MB production size
- **Browser Support**: Chrome, Firefox, Edge, Safari

## 📚 Documentation

Each subdirectory contains detailed documentation:
- `/research/face-detection-lite/README.md` - Research findings and algorithm details
- `/docker-app/README.md` - Docker application setup and configuration
- `/docker-app/SUMMARY.md` - Comprehensive build summary
- `DOCKER_DEPLOYMENT.md` - 🐳 Docker deployment guide with GHCR integration

## 🐳 Docker Images

Pre-built Docker images are automatically published to GitHub Container Registry:

### 🏷️ Available Tags
- `latest` - Latest stable release (v0.0.1)
- `v0.0.1` - First stable release
- `v{version}` - Specific version releases
- `main` - Main branch builds
- `dev-{branch}` - Development branch builds

### 📦 Image Registry
```
ghcr.io/jedarden/face-detection
```

### 🔄 Automated Builds
- ✅ **Multi-platform** (AMD64, ARM64)
- ✅ **Security scanning** with Trivy
- ✅ **Automated testing** before publication
- ✅ **Semantic versioning** for releases
- ✅ **GitHub Actions** CI/CD pipeline
- ✅ **GHCR integration** for image hosting

### 📊 Build Status
All builds are automatically triggered on:
- 🔄 **Push to main** - Latest production builds
- 🏷️ **Version tags** - Semantic version releases
- 🔀 **Pull requests** - Validation builds
- 🕐 **Schedule** - Weekly security scans

## 📜 License

This project is for educational and research purposes. Please refer to individual library licenses for commercial use.

## 🤖 Development Process & Prompts

This application was built through an iterative development process using AI-assisted programming. Below are the key prompts that guided the development:

### 🏗️ Initial Setup & Research
1. **📁 Project Structure**: 
   > "Create a new folder named face-detection-repo/"

2. **🔬 Research Phase**: 
   > "conduct deep research about basic face detection, the kind where a bounding box is put around the detected face. Use github repos, academic papers, youtube transcripts, and any other web sources to create a webpage that can demonstrate this technology using a device's webcam and the local compute resources. Put the results into face-detection-repo/research/face-detection-lite"

### 🎯 Core Application Development
3. **🐳 Docker Application**: 
   > "Based on the research in face-detection-repo/research build a docker image which exposes a single port and serves a web application which uses the user's camera to power two levels of face detection. Lite shows a bounding box around the face. Pro shows an overlay over the face with markers showing various landmarks. Use test driven development to build this application. If stuck, conduct deep research into the problem and the solutions. Keep iterating until the application is complete and passes all tests. Once complete, update the documentation to summarize what was built. Spawn up to 5 agents to work on this application concurrently."

### 🚀 Feature Enhancements
4. **📹 Multi-Camera Support**: 
   > "Update the application to allow the user to select from multiple cameras--provided there are multiple cameras to select from."

5. **🔧 Docker Fixes**: 
   > "Fix this issue. vscode ➜ /workspaces/face-detection/face-detection-repo/docker-app (workspace/basic) $ docker compose logs -f WARN[0000] /workspaces/face-detection/face-detection-repo/docker-app/docker-compose.yml: the attribute 'version' is obsolete, it will be ignored, please remove it to avoid potential confusion healthcheck.test must start either by 'CMD', 'CMD-SHELL' or 'NONE'"

6. **⚡ Build Performance**: 
   > "Seems the build process is hung. [+] Building 239.0s (18/23) ..."

7. **🔄 Loading Issues**: 
   > "Loading Face Detection App... Please wait while we load the models. nothing else shows"

### 🎨 Visual & UX Improvements
8. **🎯 Visual Fixes**: 
   > "The percentage in the lite bounding box is reverse. It's probably because the camera image is also reversed. Tune the bounding box to minimize around the face instead of showing a broader edge."

9. **📊 Diagnostics**: 
    > "Include toggleable diagnostic information showing cpu consumption, fps, memory consumption and other important metrics."

10. **🔤 Text Rendering**: 
    > "The text in both modes is backwards. Fix it."

11. **📦 Container Integration**: 
    > "The face detection diagnostics should be included in the main container."

### ⚡ Final Optimizations
12. **📹 Camera Preview**: 
    > "When the page is first loaded, don't show the blank canvas, already load the camera and preview. Starting the detection should start the face detection loop. Also, when pressing show diagnostics, got this in the front end console. app.js:410 Uncaught ReferenceError: diagnosticsEnabled is not defined at HTMLButtonElement.toggleDiagnostics (app.js:410:3) Put the camera detection above the canvas."

13. **🔄 CI/CD Pipeline**: 
    > "Set up the workflow to build and publish the docker image hosted on ghcr"

14. **📊 Documentation Enhancement**: 
    > "Update the readme with the prompts which were used to create the application."

15. **🎨 Visual Enhancement**: 
    > "Add emojis to the readme for each section."

### 🛠️ Technical Decisions Made

#### 🏗️ Architecture Choices
- **Frontend**: Vanilla JavaScript instead of frameworks for better performance and simplicity
- **Face Detection**: face-api.js with TensorFlow.js for browser-based ML processing
- **Docker**: Multi-stage builds to minimize image size (~95MB final)
- **Testing**: Jest + Puppeteer for comprehensive testing coverage

#### 🔍 Problem-Solving Approach
1. **🐳 Docker Build Issues**: Simplified Dockerfile, automated model downloads during build
2. **📦 ES6 Module Loading**: Switched to CDN-based loading for better compatibility
3. **🔄 Text Mirroring**: Implemented canvas transformation reset and re-mirroring for proper text display
4. **📹 Camera Preview**: Separated camera initialization from detection loop for better UX
5. **📊 Diagnostics Integration**: Fixed variable scope issues and implemented real-time performance monitoring

#### ⚡ Performance Optimizations
- **🎯 Tighter Bounding Boxes**: Reduced padding from default to 10% for better face framing
- **🔄 Efficient Detection Loop**: 100ms interval for smooth real-time processing
- **💾 Memory Management**: Implemented proper cleanup and garbage collection
- **⚡ WebGL Acceleration**: Utilized TensorFlow.js WebGL backend for GPU acceleration

#### 🎨 User Experience Enhancements
- **📹 Automatic Camera Preview**: Immediate camera feed on page load
- **📱 Responsive Design**: Mobile-friendly layout with proper scaling
- **👁️ Visual Feedback**: Clear separation between video preview and detection canvas
- **📊 Diagnostic Tools**: Real-time FPS, memory usage, and performance charts
- **🛡️ Error Handling**: Graceful fallbacks for camera access issues

### 📋 Development Methodology
- **🧪 Test-Driven Development**: Comprehensive test suite covering unit, integration, and E2E scenarios
- **🔄 Iterative Refinement**: Continuous improvement based on user feedback and testing results
- **📊 Performance Monitoring**: Real-time metrics and bottleneck analysis
- **📚 Documentation**: Thorough documentation of all decisions and implementations

---

*Built with a focus on performance, user privacy, and production readiness through AI-assisted iterative development.*