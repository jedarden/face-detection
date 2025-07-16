export class PerformanceMonitor {
  constructor(options = {}) {
    this.options = {
      sampleSize: options.sampleSize || 60, // Keep last 60 frames for FPS calculation
      warningThreshold: options.warningThreshold || 15, // FPS warning threshold
      ...options
    };

    this.reset();
  }

  reset() {
    this.frameTimes = [];
    this.frameStartTime = 0;
    this.lastFrameTime = 0;
    this.totalFrames = 0;
    this.metrics = new Map();
    this.startTime = performance.now();
  }

  startFrame() {
    this.frameStartTime = performance.now();
  }

  endFrame() {
    if (this.frameStartTime === 0) return;

    const frameTime = performance.now() - this.frameStartTime;
    this.frameTimes.push(frameTime);
    
    // Keep only the last N samples
    if (this.frameTimes.length > this.options.sampleSize) {
      this.frameTimes.shift();
    }
    
    this.lastFrameTime = performance.now();
    this.totalFrames++;
    this.frameStartTime = 0;
  }

  getCurrentFPS() {
    if (this.frameTimes.length < 2) return 0;

    const averageFrameTime = this.getAverageFrameTime();
    if (averageFrameTime === 0) return 0;

    return Math.round(1000 / averageFrameTime);
  }

  getAverageFrameTime() {
    if (this.frameTimes.length === 0) return 0;

    const sum = this.frameTimes.reduce((acc, time) => acc + time, 0);
    return sum / this.frameTimes.length;
  }

  getMinFrameTime() {
    if (this.frameTimes.length === 0) return 0;
    return Math.min(...this.frameTimes);
  }

  getMaxFrameTime() {
    if (this.frameTimes.length === 0) return 0;
    return Math.max(...this.frameTimes);
  }

  start(label) {
    this.metrics.set(label, {
      startTime: performance.now(),
      endTime: null,
      duration: null
    });
  }

  end(label) {
    const metric = this.metrics.get(label);
    if (!metric || metric.endTime !== null) {
      console.warn(`Performance metric "${label}" not started or already ended`);
      return 0;
    }

    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;
    
    return metric.duration;
  }

  measure(label, fn) {
    this.start(label);
    try {
      const result = fn();
      if (result instanceof Promise) {
        return result.finally(() => this.end(label));
      }
      this.end(label);
      return result;
    } catch (error) {
      this.end(label);
      throw error;
    }
  }

  async measureAsync(label, asyncFn) {
    this.start(label);
    try {
      const result = await asyncFn();
      this.end(label);
      return result;
    } catch (error) {
      this.end(label);
      throw error;
    }
  }

  getMetric(label) {
    const metric = this.metrics.get(label);
    if (!metric || metric.duration === null) {
      return null;
    }
    return metric.duration;
  }

  getAllMetrics() {
    const results = {};
    for (const [label, metric] of this.metrics) {
      if (metric.duration !== null) {
        results[label] = metric.duration;
      }
    }
    return results;
  }

  getSummary() {
    const fps = this.getCurrentFPS();
    const avgFrameTime = this.getAverageFrameTime();
    const minFrameTime = this.getMinFrameTime();
    const maxFrameTime = this.getMaxFrameTime();
    const totalTime = performance.now() - this.startTime;
    
    return {
      fps,
      avgFrameTime,
      minFrameTime,
      maxFrameTime,
      totalFrames: this.totalFrames,
      totalTime,
      averageFPS: this.totalFrames / (totalTime / 1000),
      isPerformanceGood: fps >= this.options.warningThreshold,
      metrics: this.getAllMetrics()
    };
  }

  getFrameTimeDistribution() {
    if (this.frameTimes.length === 0) return {};

    const buckets = {
      '<16ms': 0,
      '16-33ms': 0,
      '33-50ms': 0,
      '50-100ms': 0,
      '>100ms': 0
    };

    this.frameTimes.forEach(time => {
      if (time < 16) buckets['<16ms']++;
      else if (time < 33) buckets['16-33ms']++;
      else if (time < 50) buckets['33-50ms']++;
      else if (time < 100) buckets['50-100ms']++;
      else buckets['>100ms']++;
    });

    return buckets;
  }

  getPerformanceScore() {
    const fps = this.getCurrentFPS();
    const avgFrameTime = this.getAverageFrameTime();
    
    // Score based on FPS (0-50 points)
    let fpsScore = Math.min(50, (fps / 60) * 50);
    
    // Score based on frame time consistency (0-50 points)
    const minTime = this.getMinFrameTime();
    const maxTime = this.getMaxFrameTime();
    const variance = maxTime - minTime;
    let consistencyScore = Math.max(0, 50 - variance);
    
    return Math.round(fpsScore + consistencyScore);
  }

  logSummary() {
    const summary = this.getSummary();
    console.group('Performance Summary');
    console.log(`FPS: ${summary.fps}`);
    console.log(`Average Frame Time: ${summary.avgFrameTime.toFixed(2)}ms`);
    console.log(`Frame Time Range: ${summary.minFrameTime.toFixed(2)}ms - ${summary.maxFrameTime.toFixed(2)}ms`);
    console.log(`Total Frames: ${summary.totalFrames}`);
    console.log(`Total Time: ${(summary.totalTime / 1000).toFixed(2)}s`);
    console.log(`Performance Score: ${this.getPerformanceScore()}/100`);
    
    const distribution = this.getFrameTimeDistribution();
    console.log('Frame Time Distribution:', distribution);
    
    if (Object.keys(summary.metrics).length > 0) {
      console.log('Custom Metrics:', summary.metrics);
    }
    
    console.groupEnd();
  }
}

// Static instance for global performance monitoring
PerformanceMonitor.global = new PerformanceMonitor();

export default PerformanceMonitor;