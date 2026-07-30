# Release Notes v1.1.1

## 🔒 Security Scan Workflow Fixes

**Release Date**: July 16, 2025  
**Type**: Patch Release  
**Focus**: Security Infrastructure Improvements

### 🚀 What's New

#### Security Scan Improvements
- **Fixed GitHub Actions Security Scan**: Resolved all workflow failures that were preventing proper security analysis
- **Updated CodeQL Action**: Upgraded from deprecated v2 to v3 for enhanced security scanning
- **Trivy Container Scanning**: Fixed Docker image access issues for vulnerability scanning
- **SARIF Upload**: Properly configured security results upload to GitHub Security tab

### 🔧 Technical Changes

#### GitHub Actions Workflow Updates
- Updated `.github/workflows/security-scan.yml`:
  - CodeQL action: `github/codeql-action/upload-sarif@v2` → `@v3`
  - Added `load: true` to Docker build step for local image availability
  - Fixed Trivy scanning by exporting Docker image to tar file
  - Resolved "Cannot connect to Docker daemon" errors

#### Security Enhancements
- All security scans now pass successfully
- Comprehensive vulnerability scanning operational
- Docker best practices validation working
- Security results properly uploaded to GitHub Security tab

### 📊 Security Status

- ✅ **0 vulnerabilities** in npm audit
- ✅ **GitHub Actions security scan passing**
- ✅ **Trivy container vulnerability scan operational**
- ✅ **CodeQL analysis working with latest action version**
- ✅ **SARIF results uploading to GitHub Security tab**

### 🛡️ Previous Security Work (v1.1.0)

This release builds on the comprehensive security patches in v1.1.0:
- Updated all vulnerable dependencies
- Added Content-Security-Policy headers
- Implemented npm overrides for transitive dependencies
- Created comprehensive security test suite

### 🔗 Links

- [Security Patch Summary](./SECURITY_PATCH_SUMMARY.md)
- [Migration Guide](./docker-app/SECURITY_UPDATE_MIGRATION.md)
- [GitHub Security Tab](https://github.com/jedarden/face-detection/security)

### 🏗️ Docker Images

New Docker images will be automatically built and published to:
- `ghcr.io/jedarden/face-detection:v1.1.1`
- `ghcr.io/jedarden/face-detection:latest`

### 📋 Verification

To verify the security improvements:

```bash
# Check the latest security scan results
gh run list --workflow="security-scan.yml" --limit 1

# Pull and test the new Docker image
docker pull ghcr.io/jedarden/face-detection:v1.1.1
docker run -d -p 8080:8080 ghcr.io/jedarden/face-detection:v1.1.1
```

### 🔄 Breaking Changes

**None** - This is a patch release with no breaking changes to the application functionality.

### 🐛 Bug Fixes

- Fixed GitHub Actions security scan workflow failures
- Resolved CodeQL action deprecation warnings
- Fixed Trivy Docker daemon access issues
- Corrected SARIF upload configuration

---

**Full Changelog**: [v1.1.0...v1.1.1](https://github.com/jedarden/face-detection/compare/v1.1.0...v1.1.1)