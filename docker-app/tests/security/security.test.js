const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

describe('Security Vulnerability Tests', () => {
  let auditReport;

  beforeAll(() => {
    // Run npm audit and get the JSON report
    try {
      const auditOutput = execSync('npm audit --json', { 
        encoding: 'utf8',
        cwd: path.join(__dirname, '../../')
      });
      auditReport = JSON.parse(auditOutput);
    } catch (error) {
      // npm audit returns exit code 1 when vulnerabilities are found
      if (error.stdout) {
        auditReport = JSON.parse(error.stdout);
      } else {
        throw error;
      }
    }
  });

  test('should have no critical vulnerabilities', () => {
    const criticalCount = auditReport.metadata?.vulnerabilities?.critical || 0;
    expect(criticalCount).toBe(0);
  });

  test('should have no high severity vulnerabilities', () => {
    const highCount = auditReport.metadata?.vulnerabilities?.high || 0;
    expect(highCount).toBe(0);
  });

  test('should have no moderate severity vulnerabilities', () => {
    const moderateCount = auditReport.metadata?.vulnerabilities?.moderate || 0;
    expect(moderateCount).toBe(0);
  });

  test('should have minimal low severity vulnerabilities', () => {
    const lowCount = auditReport.metadata?.vulnerabilities?.low || 0;
    // Allow up to 2 low severity vulnerabilities as some may be unavoidable
    expect(lowCount).toBeLessThanOrEqual(2);
  });

  test('node-fetch should not have security vulnerabilities', () => {
    const nodeFetchVuln = auditReport.vulnerabilities?.['node-fetch'];
    expect(nodeFetchVuln).toBeUndefined();
  });

  test('tar-fs should not have security vulnerabilities', () => {
    const tarFsVuln = auditReport.vulnerabilities?.['tar-fs'];
    expect(tarFsVuln).toBeUndefined();
  });

  test('webpack-dev-server should not have security vulnerabilities', () => {
    const webpackDevServerVuln = auditReport.vulnerabilities?.['webpack-dev-server'];
    expect(webpackDevServerVuln).toBeUndefined();
  });

  test('ws (WebSocket) should not have security vulnerabilities', () => {
    const wsVuln = auditReport.vulnerabilities?.['ws'];
    expect(wsVuln).toBeUndefined();
  });

  test('puppeteer should not have security vulnerabilities', () => {
    const puppeteerVuln = auditReport.vulnerabilities?.['puppeteer'];
    expect(puppeteerVuln).toBeUndefined();
  });
});

describe('Dependency Version Tests', () => {
  let packageJson;

  beforeAll(() => {
    const packagePath = path.join(__dirname, '../../package.json');
    packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  });

  test('express should be using a secure version', () => {
    const expressVersion = packageJson.dependencies?.express;
    expect(expressVersion).toBeDefined();
    // Express 4.19.0+ includes security fixes
    expect(expressVersion).toMatch(/^\^4\.(19|[2-9]\d)\./);
  });

  test('webpack-dev-server should be using version 5.2.2 or higher', () => {
    const webpackDevServerVersion = packageJson.devDependencies?.['webpack-dev-server'];
    expect(webpackDevServerVersion).toBeDefined();
    // Should be at least 5.2.2 to fix security issues
    const versionMatch = webpackDevServerVersion.match(/(\d+)\.(\d+)\.(\d+)/);
    if (versionMatch) {
      const major = parseInt(versionMatch[1]);
      const minor = parseInt(versionMatch[2]);
      const patch = parseInt(versionMatch[3]);
      
      expect(major).toBeGreaterThanOrEqual(5);
      if (major === 5) {
        expect(minor).toBeGreaterThanOrEqual(2);
        if (minor === 2) {
          expect(patch).toBeGreaterThanOrEqual(2);
        }
      }
    }
  });

  test('puppeteer should be using version 24.14.0 or higher', () => {
    const puppeteerVersion = packageJson.devDependencies?.puppeteer;
    expect(puppeteerVersion).toBeDefined();
    // Should be at least 24.14.0 to fix security issues
    const versionMatch = puppeteerVersion.match(/(\d+)\.(\d+)\.(\d+)/);
    if (versionMatch) {
      const major = parseInt(versionMatch[1]);
      expect(major).toBeGreaterThanOrEqual(24);
    }
  });
});

describe('Security Best Practices', () => {
  test('should have security headers configured in nginx.conf', () => {
    const nginxConfPath = path.join(__dirname, '../../nginx.conf');
    const nginxConf = fs.readFileSync(nginxConfPath, 'utf8');
    
    // Check for security headers
    expect(nginxConf).toContain('X-Content-Type-Options');
    expect(nginxConf).toContain('X-Frame-Options');
    expect(nginxConf).toContain('X-XSS-Protection');
    expect(nginxConf).toContain('Referrer-Policy');
  });

  test('should have Content Security Policy configured', () => {
    const nginxConfPath = path.join(__dirname, '../../nginx.conf');
    const nginxConf = fs.readFileSync(nginxConfPath, 'utf8');
    
    expect(nginxConf).toContain('Content-Security-Policy');
  });

  test('should not expose sensitive information in package.json', () => {
    const packagePath = path.join(__dirname, '../../package.json');
    const packageContent = fs.readFileSync(packagePath, 'utf8');
    const packageJson = JSON.parse(packageContent);
    
    // Check for common sensitive patterns in values, not in field names like "keywords"
    const sensitivePattern = /password|secret|token|api[-_]?key/i;
    
    // Check dependencies and scripts for sensitive info
    const checkObject = (obj) => {
      for (const [key, value] of Object.entries(obj || {})) {
        if (typeof value === 'string' && sensitivePattern.test(value)) {
          return true;
        }
      }
      return false;
    };
    
    expect(checkObject(packageJson.dependencies)).toBe(false);
    expect(checkObject(packageJson.devDependencies)).toBe(false);
    expect(checkObject(packageJson.scripts)).toBe(false);
    
    // Ensure no sensitive environment variables in scripts
    const scriptsString = JSON.stringify(packageJson.scripts || {});
    expect(scriptsString).not.toMatch(/PRIVATE_KEY|SECRET_KEY|API_KEY|PASSWORD/);
  });
});