# Runtime Prefix Support for Face Detection App

This Docker image now supports configurable URL prefixes that can be set at runtime, not build time. This allows the same image to be deployed in different environments with different URL structures.

## Features

- **Runtime Configuration**: Prefix is configured via environment variables, not at build time
- **Flexible Deployment**: Same image works with or without prefixes
- **Automatic Detection**: Falls back to URL path detection if no environment variable is set
- **Dynamic Assets**: All static assets, models, and API endpoints respect the prefix

## Usage

### Without Prefix (Default)

```bash
# Run without any prefix
docker run -p 8080:8080 face-detection-app

# Access at:
# http://localhost:8080/
# http://localhost:8080/health
# http://localhost:8080/models/
```

### With Prefix

```bash
# Run with a custom prefix
docker run -p 8080:8080 -e APP_PREFIX="/face-detection" face-detection-app

# Access at:
# http://localhost:8080/face-detection/
# http://localhost:8080/health (health check has no prefix)
# http://localhost:8080/face-detection/models/
# http://localhost:8080/ redirects to http://localhost:8080/face-detection/
```

### Multiple Prefixes Example

```bash
# Deploy multiple instances with different prefixes
docker run -d -p 8081:8080 -e APP_PREFIX="/app1" --name face-app1 face-detection-app
docker run -d -p 8082:8080 -e APP_PREFIX="/app2" --name face-app2 face-detection-app
docker run -d -p 8083:8080 -e APP_PREFIX="/demo" --name face-demo face-detection-app
```

## Docker Compose Examples

### Simple Deployment

```yaml
version: '3.8'
services:
  face-detection:
    image: face-detection-app
    ports:
      - "8080:8080"
    environment:
      - APP_PREFIX=/face-app
```

### Multi-Instance Deployment

```yaml
version: '3.8'
services:
  face-detection-prod:
    image: face-detection-app
    ports:
      - "8080:8080"
    environment:
      - APP_PREFIX=/production
  
  face-detection-staging:
    image: face-detection-app
    ports:
      - "8081:8080"
    environment:
      - APP_PREFIX=/staging
  
  face-detection-dev:
    image: face-detection-app
    ports:
      - "8082:8080"
    # No prefix for development
```

### Reverse Proxy Setup (Nginx)

```nginx
# nginx.conf for reverse proxy
upstream face_detection_backend {
    server localhost:8080;
}

server {
    listen 80;
    server_name example.com;
    
    # Proxy to face detection app with prefix
    location /ai/face-detection/ {
        proxy_pass http://face_detection_backend/face-detection/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    # Health check endpoint
    location /health {
        proxy_pass http://face_detection_backend/health;
    }
}
```

## Environment Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `APP_PREFIX` | URL prefix for the application | `""` (empty) | `/face-detection` |

**Notes:**
- Leading slash is optional - it will be added automatically if missing
- Trailing slash is not needed and will be handled automatically
- Health check endpoint (`/health`) always works without prefix
- Metrics endpoint (`/metrics`) always works without prefix

## Technical Details

### How It Works

1. **Entrypoint Script**: The `entrypoint.sh` script processes the `APP_PREFIX` environment variable
2. **Nginx Configuration**: Generates appropriate nginx configuration based on the prefix
3. **JavaScript Configuration**: Creates a `config.js` file with runtime configuration
4. **Dynamic Path Resolution**: Application code uses the configuration to construct proper URLs

### File Structure

```
/usr/share/nginx/html/
├── index.html          # Main application
├── config.js           # Generated runtime configuration
├── app.js              # Application bundle
├── styles.css          # Styles
├── models/             # Face detection models
│   ├── *.json         # Model manifests
│   └── *-shard*       # Model weights
└── health.json         # Health check data
```

### Configuration Generation

The entrypoint script creates a `config.js` file:

```javascript
// Without prefix
window.APP_CONFIG = {
  prefix: '',
  modelPath: '/models',
  basePath: ''
};

// With prefix "/face-detection"
window.APP_CONFIG = {
  prefix: '/face-detection',
  modelPath: '/face-detection/models',
  basePath: '/face-detection'
};
```

### URL Patterns

| Scenario | Root | Application | Models | Health |
|----------|------|-------------|---------|---------|
| No Prefix | `/` | `/` | `/models/` | `/health` |
| With Prefix | `/` → `/{prefix}/` | `/{prefix}/` | `/{prefix}/models/` | `/health` |

## Troubleshooting

### Common Issues

1. **404 on Static Assets**: Ensure the prefix matches exactly between environment variable and URL
2. **Models Not Loading**: Check that `/face-detection/models/` (with prefix) or `/models/` (without) is accessible
3. **Configuration Not Applied**: Container might not have restarted after environment variable change

### Debugging

```bash
# Check container logs
docker logs <container-name>

# Verify configuration
docker exec <container-name> cat /usr/share/nginx/html/config.js

# Check nginx configuration
docker exec <container-name> cat /etc/nginx/nginx.conf

# Test endpoints
curl http://localhost:8080/health
curl http://localhost:8080/face-detection/config.js  # with prefix
curl http://localhost:8080/config.js                 # without prefix
```

### Log Output

The container provides detailed logging during startup:

```
🚀 Starting Face Detection App with prefix: '/face-detection'
📝 Configuration:
   - Prefix: /face-detection
   - Models path: /face-detection/models
   - Health check endpoint: /health
   - Application endpoint: /face-detection/
🔍 Validating nginx configuration...
✅ Nginx configuration is valid
🎯 Starting nginx...
```

## Migration Guide

### From Static Prefix to Runtime Prefix

If you previously built images with hardcoded prefixes:

1. **Remove build-time prefix configuration** from Dockerfile
2. **Update deployment** to use environment variables
3. **Test both scenarios** (with and without prefix)

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: face-detection
spec:
  replicas: 3
  selector:
    matchLabels:
      app: face-detection
  template:
    metadata:
      labels:
        app: face-detection
    spec:
      containers:
      - name: face-detection
        image: face-detection-app:latest
        ports:
        - containerPort: 8080
        env:
        - name: APP_PREFIX
          value: "/api/face-detection"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: face-detection-service
spec:
  selector:
    app: face-detection
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: LoadBalancer
```

## Version History

- **v1.1.1**: Added runtime prefix support
- **v1.1.0**: Security fixes and improvements
- **v1.0.0**: Initial release

## Support

For issues related to prefix configuration:

1. Check container logs for configuration errors
2. Verify environment variables are set correctly
3. Test health endpoint first (always works without prefix)
4. Review nginx configuration generation in logs