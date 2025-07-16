// Performance testing helpers

export class PerformanceMonitor {
  constructor() {
    this.measurements = [];
  }

  start(name) {
    performance.mark(`${name}-start`);
  }

  end(name) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    const measure = performance.getEntriesByName(name)[0];
    this.measurements.push({
      name,
      duration: measure.duration,
      timestamp: Date.now()
    });
    
    return measure.duration;
  }

  getAverage(name) {
    const filtered = this.measurements.filter(m => m.name === name);
    if (filtered.length === 0) return 0;
    
    const sum = filtered.reduce((acc, m) => acc + m.duration, 0);
    return sum / filtered.length;
  }

  getMax(name) {
    const filtered = this.measurements.filter(m => m.name === name);
    if (filtered.length === 0) return 0;
    
    return Math.max(...filtered.map(m => m.duration));
  }

  getMin(name) {
    const filtered = this.measurements.filter(m => m.name === name);
    if (filtered.length === 0) return 0;
    
    return Math.min(...filtered.map(m => m.duration));
  }

  reset() {
    this.measurements = [];
    performance.clearMarks();
    performance.clearMeasures();
  }

  getReport() {
    const uniqueNames = [...new Set(this.measurements.map(m => m.name))];
    
    return uniqueNames.map(name => ({
      name,
      count: this.measurements.filter(m => m.name === name).length,
      average: this.getAverage(name),
      min: this.getMin(name),
      max: this.getMax(name)
    }));
  }
}

export const measureFPS = (duration = 1000) => {
  return new Promise((resolve) => {
    let frameCount = 0;
    let startTime = null;
    
    const countFrame = (timestamp) => {
      if (!startTime) startTime = timestamp;
      frameCount++;
      
      if (timestamp - startTime < duration) {
        requestAnimationFrame(countFrame);
      } else {
        const fps = (frameCount / ((timestamp - startTime) / 1000));
        resolve(fps);
      }
    };
    
    requestAnimationFrame(countFrame);
  });
};

export const simulateHighLoad = (duration = 100) => {
  const start = Date.now();
  while (Date.now() - start < duration) {
    // Simulate CPU intensive task
    Math.sqrt(Math.random());
  }
};

export const mockPerformanceAPI = () => {
  const marks = new Map();
  const measures = [];
  
  global.performance = {
    mark: jest.fn((name) => {
      marks.set(name, Date.now());
    }),
    measure: jest.fn((name, startMark, endMark) => {
      const start = marks.get(startMark) || 0;
      const end = marks.get(endMark) || Date.now();
      measures.push({
        name,
        duration: end - start,
        startTime: start
      });
    }),
    getEntriesByName: jest.fn((name) => {
      return measures.filter(m => m.name === name);
    }),
    clearMarks: jest.fn(() => marks.clear()),
    clearMeasures: jest.fn(() => measures.length = 0),
    now: jest.fn(() => Date.now())
  };
  
  return { marks, measures };
};