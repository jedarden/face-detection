# 🐳 Docker Deployment Guide

This guide covers the automated Docker image building and deployment process using GitHub Actions and GitHub Container Registry (GHCR).

## 📋 Overview

The repository includes three automated workflows for Docker image management:

1. **🐳 Production Build** - Builds and publishes production images
2. **🔧 Development Build** - Builds and tests development images  
3. **🔒 Security Scan** - Scans images for vulnerabilities

## 🏗️ Production Workflow

### Triggers
- **Push to main branch** - Builds `latest` tag
- **Version tags** (`v*`) - Builds versioned releases
- **Manual dispatch** - On-demand builds

### Features
- ✅ **Multi-platform builds** (AMD64, ARM64)
- ✅ **Automatic tagging** with semantic versioning
- ✅ **Build caching** for faster builds
- ✅ **Image testing** with nginx configuration validation
- ✅ **GitHub Container Registry** publishing

### Usage

#### Pull Latest Image
```bash
# Pull latest release (v0.0.1)
docker pull ghcr.io/jedarden/face-detection:latest

# Or pull specific version
docker pull ghcr.io/jedarden/face-detection:v0.0.1
```

#### Run Container
```bash
# Run latest release
docker run -d -p 8080:8080 ghcr.io/jedarden/face-detection:latest

# Or run specific version
docker run -d -p 8080:8080 ghcr.io/jedarden/face-detection:v0.0.1
```

#### Pull Specific Version
```bash
docker pull ghcr.io/jedarden/face-detection:v0.0.1
```

## 🔧 Development Workflow

### Triggers
- **Push to develop/feature branches** - Builds development images
- **Pull requests** - Validates builds without publishing
- **Changes to docker-app/** - Only runs when Docker files change

### Features
- ✅ **Automated testing** with health checks
- ✅ **Development tagging** (`dev-branch-name`)
- ✅ **PR validation** without publishing
- ✅ **Fast feedback** with AMD64-only builds

### Usage

#### Pull Development Image
```bash
docker pull ghcr.io/jedarden/face-detection:dev-develop
```

#### Run Development Container
```bash
docker run -d -p 8080:8080 ghcr.io/jedarden/face-detection:dev-develop
```

## 🔒 Security Workflow

### Triggers
- **Push to main** - Scans production builds
- **Pull requests** - Validates security before merge
- **Weekly schedule** - Regular vulnerability checks

### Features
- ✅ **Trivy vulnerability scanning** with SARIF output
- ✅ **Dockerfile linting** with Hadolint
- ✅ **GitHub Security tab** integration
- ✅ **Critical/High severity** focus

### Security Measures
- 🔒 **Non-root user** execution
- 🚫 **No sensitive data** in image layers
- 🔐 **Secure headers** configured in nginx
- 🛡️ **Regular scanning** for vulnerabilities
- 📋 **SARIF results** uploaded to GitHub Security

## 📊 Image Tags

| Tag Pattern | Description | Example |
|-------------|-------------|---------|
| `latest` | Latest stable release | `ghcr.io/jedarden/face-detection:latest` |
| `v{version}` | Specific version | `ghcr.io/jedarden/face-detection:v1.0.0` |
| `v{major}.{minor}` | Major.minor version | `ghcr.io/jedarden/face-detection:v1.0` |
| `v{major}` | Major version | `ghcr.io/jedarden/face-detection:v1` |
| `main` | Main branch build | `ghcr.io/jedarden/face-detection:main` |
| `dev-{branch}` | Development branch | `ghcr.io/jedarden/face-detection:dev-feature-auth` |
| `pr-{number}` | Pull request build | `ghcr.io/jedarden/face-detection:pr-123` |

## 🚀 Deployment Examples

### Docker Compose
```yaml
version: '3.8'
services:
  face-detection:
    image: ghcr.io/jedarden/face-detection:latest
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Kubernetes
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
        image: ghcr.io/jedarden/face-detection:latest
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: face-detection-service
spec:
  selector:
    app: face-detection
  ports:
  - port: 80
    targetPort: 8080
  type: LoadBalancer
```

### Docker Swarm
```bash
docker service create \
  --name face-detection \
  --publish 8080:8080 \
  --replicas 3 \
  --update-delay 10s \
  --update-parallelism 1 \
  --rollback-parallelism 1 \
  ghcr.io/jedarden/face-detection:latest
```

## 🔧 Local Development

### Build Locally
```bash
cd docker-app
docker build -t face-detection-local .
docker run -d -p 8080:8080 face-detection-local
```

### Development with Hot Reload
```bash
cd docker-app
docker-compose up face-detection-dev
```

## 📈 Performance Optimizations

### Multi-stage Build
- **Builder stage**: ~800MB (includes build tools)
- **Production stage**: ~95MB (nginx:alpine + app)
- **Reduction**: 88% smaller final image

### Build Cache
- **GitHub Actions cache**: Speeds up repeated builds
- **Layer caching**: Optimizes Docker layer reuse
- **Multi-platform**: Shared cache across architectures

### Resource Limits
```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

## 🛡️ Security Best Practices

### Image Security
- ✅ **Minimal base image** (nginx:alpine)
- ✅ **Non-root user** execution
- ✅ **No package managers** in final image
- ✅ **Regular security scanning**

### Runtime Security
- ✅ **Read-only root filesystem**
- ✅ **No privileged containers**
- ✅ **Security headers** configured
- ✅ **HTTPS enforcement** available

## 📋 Monitoring

### Health Checks
```bash
# Container health
docker run --health-cmd="curl -f http://localhost:8080/health || exit 1" \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  ghcr.io/jedarden/face-detection:latest

# Application health
curl http://localhost:8080/health
```

### Metrics
- **Application metrics**: Available at `/metrics`
- **Nginx metrics**: Access logs and error logs
- **Container metrics**: CPU, memory, network usage

## 🔄 CI/CD Integration

### GitHub Actions
All workflows are automatically triggered and require no manual intervention:

1. **Code push** → **Build triggered**
2. **Tests pass** → **Image built**
3. **Security scan** → **Vulnerabilities checked**
4. **Image published** → **Available for deployment**

### Status Badges
Add these to your README to show build status:

```markdown
![Docker Build](https://github.com/jedarden/face-detection/actions/workflows/docker-publish.yml/badge.svg)
![Security Scan](https://github.com/jedarden/face-detection/actions/workflows/security-scan.yml/badge.svg)
```

## 📞 Support

For issues with Docker deployment:
1. Check the [GitHub Actions logs](https://github.com/jedarden/face-detection/actions)
2. Review the [Security tab](https://github.com/jedarden/face-detection/security) for vulnerabilities
3. Open an issue with deployment details

---

*Automated Docker deployment with GitHub Actions and GHCR provides secure, scalable, and efficient container distribution.*