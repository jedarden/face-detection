# Deployment Guide - Face Detection Lite

## Deployment Options

### 1. Static Hosting (Simplest)

#### GitHub Pages
```bash
# Create gh-pages branch
git checkout -b gh-pages

# Add all files
git add .
git commit -m "Deploy face detection demo"

# Push to GitHub
git push origin gh-pages
```
Access at: `https://[username].github.io/[repository]/`

#### Netlify
1. Drag and drop the folder to [Netlify](https://app.netlify.com/drop)
2. Get instant URL
3. Optional: Connect to Git for auto-deploy

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

### 2. CDN Configuration

#### Using CDN for Libraries
```html
<!-- Replace local references with CDN -->
<script src="https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js"></script>

<!-- Model weights from CDN -->
<script>
const MODEL_URL = 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights';
</script>
```

#### Self-Hosting Models
```javascript
// Download models locally
const models = [
    'tiny_face_detector_model-shard1',
    'tiny_face_detector_model-weights_manifest.json',
    'ssd_mobilenetv1_model-shard1',
    'ssd_mobilenetv1_model-shard2',
    'ssd_mobilenetv1_model-weights_manifest.json'
];

// Update model loading path
await faceapi.nets.tinyFaceDetector.loadFromUri('./models');
```

### 3. HTTPS Requirements

#### Why HTTPS is Required
- Camera access requires secure context
- WebRTC APIs only work over HTTPS
- Browser security policies

#### Local HTTPS Development
```bash
# Generate self-signed certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Serve with HTTPS
npx http-server -S -C cert.pem -K key.pem
```

### 4. Production Optimization

#### Minification
```bash
# Install terser
npm install -g terser

# Minify JavaScript
terser src/app.js -c -m -o src/app.min.js

# Update HTML
<script src="src/app.min.js"></script>
```

#### Bundle Optimization
```javascript
// webpack.config.js
module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.min.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all'
        }
    }
};
```

#### Lazy Loading Models
```javascript
// Load models on-demand
async function loadModelLazy(modelName) {
    const script = document.createElement('script');
    script.src = `models/${modelName}.js`;
    document.head.appendChild(script);
    
    return new Promise((resolve) => {
        script.onload = resolve;
    });
}
```

### 5. Server Deployment

#### Node.js Server
```javascript
// server.js
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// HTTPS configuration
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
```

#### Docker Deployment
```dockerfile
# Dockerfile
FROM nginx:alpine

# Copy static files
COPY . /usr/share/nginx/html

# Copy nginx config for HTTPS
COPY nginx.conf /etc/nginx/nginx.conf

# Copy SSL certificates
COPY certs /etc/nginx/certs

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
```

### 6. Performance Monitoring

#### Analytics Integration
```javascript
// Track performance metrics
function trackPerformance(metrics) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'face_detection_performance', {
            'fps': metrics.fps,
            'processing_time': metrics.processTime,
            'model_used': metrics.model
        });
    }
}
```

#### Error Tracking
```javascript
// Sentry integration
Sentry.init({ 
    dsn: 'YOUR_SENTRY_DSN',
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 0.1
});

// Wrap detection in error handling
try {
    await detectFaces();
} catch (error) {
    Sentry.captureException(error);
}
```

### 7. Cross-Origin Resource Sharing (CORS)

#### Configure CORS Headers
```javascript
// Express.js
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
```

#### Nginx Configuration
```nginx
location /models {
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods "GET, OPTIONS";
}
```

### 8. Progressive Web App (PWA)

#### Service Worker
```javascript
// sw.js
const CACHE_NAME = 'face-detection-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/src/styles.css',
    '/src/app.js',
    '/models/tiny_face_detector_model-weights_manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});
```

#### Manifest File
```json
{
    "name": "Face Detection Lite",
    "short_name": "FaceDetect",
    "start_url": "/",
    "display": "standalone",
    "theme_color": "#3498db",
    "background_color": "#ffffff",
    "icons": [
        {
            "src": "/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        }
    ]
}
```

### 9. Security Considerations

#### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-eval' https://cdn.jsdelivr.net; 
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: blob:;
               media-src 'self' blob:;">
```

#### Permissions Policy
```html
<meta http-equiv="Permissions-Policy" 
      content="camera=(self), microphone=()">
```

### 10. Monitoring and Maintenance

#### Health Check Endpoint
```javascript
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        version: '1.0.0',
        models: {
            tiny: modelLoaded.tiny,
            ssd: modelLoaded.ssd
        }
    });
});
```

#### Auto-Update Models
```javascript
async function checkModelUpdates() {
    const response = await fetch('/api/model-versions');
    const latest = await response.json();
    
    if (latest.version > currentVersion) {
        await updateModels(latest.urls);
    }
}
```

## Deployment Checklist

- [ ] HTTPS configured
- [ ] Models optimized and cached
- [ ] JavaScript minified
- [ ] CORS headers set
- [ ] Analytics configured
- [ ] Error tracking enabled
- [ ] Service worker for offline support
- [ ] Security headers configured
- [ ] Performance monitoring active
- [ ] Backup deployment ready

## Common Issues and Solutions

### Issue: Camera not working in production
**Solution**: Ensure HTTPS is properly configured

### Issue: Slow model loading
**Solution**: Use CDN or implement model caching

### Issue: High bandwidth usage
**Solution**: Implement lazy loading and compress models

### Issue: Poor mobile performance
**Solution**: Use tiny models and reduce input resolution

---

*This deployment guide covers various hosting options and optimization strategies for production deployment of the face detection application.*