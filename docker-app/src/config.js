/**
 * Application configuration module
 * Handles runtime configuration including prefix support
 */

export class AppConfig {
  constructor() {
    this.config = this.loadConfig();
  }

  loadConfig() {
    // Default configuration
    const defaultConfig = {
      prefix: '',
      modelPath: '/models',
      basePath: ''
    };

    // Try to load from window.APP_CONFIG (injected by nginx/entrypoint)
    if (typeof window !== 'undefined' && window.APP_CONFIG) {
      return { ...defaultConfig, ...window.APP_CONFIG };
    }

    // Fallback: Try to detect prefix from current URL path
    if (typeof window !== 'undefined' && window.location) {
      const path = window.location.pathname;
      const pathParts = path.split('/').filter(Boolean);
      
      // Simple heuristic: if we're not at root and the first part doesn't look like a file
      if (pathParts.length > 0 && !pathParts[0].includes('.')) {
        const detectedPrefix = `/${pathParts[0]}`;
        return {
          ...defaultConfig,
          prefix: detectedPrefix,
          modelPath: `${detectedPrefix}/models`,
          basePath: detectedPrefix
        };
      }
    }

    return defaultConfig;
  }

  get prefix() {
    return this.config.prefix;
  }

  get modelPath() {
    return this.config.modelPath;
  }

  get basePath() {
    return this.config.basePath;
  }

  /**
   * Get full URL for a given path, with prefix support
   * @param {string} path - The path to prefix
   * @returns {string} - Full prefixed path
   */
  getPath(path) {
    // Remove leading slash from path
    const cleanPath = path.replace(/^\//, '');
    
    // If no prefix, just return the path with leading slash
    if (!this.config.prefix) {
      return `/${cleanPath}`;
    }
    
    // Return prefixed path
    return `${this.config.prefix}/${cleanPath}`;
  }

  /**
   * Get model URL for face-api.js
   * @returns {string} - Model path URL
   */
  getModelUrl() {
    return this.config.modelPath;
  }

  /**
   * Debug information
   * @returns {object} - Current configuration
   */
  debug() {
    return {
      config: this.config,
      currentPath: typeof window !== 'undefined' ? window.location.pathname : 'N/A',
      currentHost: typeof window !== 'undefined' ? window.location.host : 'N/A'
    };
  }
}

// Export singleton instance
export const appConfig = new AppConfig();

// Export for backward compatibility
export default appConfig;