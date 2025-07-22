# Release Notes - v2.0.1

## 🐛 Bug Fixes

### Fixed Content Security Policy (CSP) blocking CDN resources

**Issue**: [#3](https://github.com/jedarden/face-detection/issues/3)

**Problem**: 
- Application failed to load in production Kubernetes environments
- CSP headers blocked face-api.js from loading from CDN
- Error: `Refused to load the script 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js'`

**Solution**:
- Updated nginx.conf to allow scripts from cdn.jsdelivr.net and unpkg.com
- Modified CSP header to include required CDN domains while maintaining security

**Changes**:
- Updated `nginx.conf` Content-Security-Policy header
- Added `https://cdn.jsdelivr.net` and `https://unpkg.com` to script-src directive
- Bumped version from 2.0.0 to 2.0.1

## 📋 Technical Details

### Before:
```
script-src 'self' 'unsafe-inline' 'unsafe-eval';
```

### After:
```
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com;
```

## 🚀 Deployment

This patch release fixes production deployment issues. No new features or breaking changes.

**Docker Image**: `ghcr.io/jedarden/face-detection:v2.0.1`

## ✅ Testing

- [x] Verified CSP headers allow CDN resources
- [x] face-api.js loads successfully from CDN
- [x] Application functions properly in Kubernetes
- [x] Security headers still protect against XSS

---

*Fixed for deployment at https://face.jedarden.com*