class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();
  private isMonitoring = false;

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMonitoring() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.monitorFrameRate();
    this.monitorMemory();
    
    if (__DEV__) {
      console.log('🚀 Performance monitoring started');
    }
  }

  stopMonitoring() {
    this.isMonitoring = false;
    
    if (__DEV__) {
      console.log('⏹️ Performance monitoring stopped');
    }
  }

  private monitorFrameRate() {
    if (!this.isMonitoring) return;

    let frameCount = 0;
    let lastTime = Date.now();

    const countFrame = () => {
      frameCount++;
      const currentTime = Date.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        this.recordMetric('fps', fps);
        
        if (__DEV__ && fps < 30) {
          console.warn(`⚠️ Low FPS detected: ${fps}`);
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      if (this.isMonitoring) {
        requestAnimationFrame(countFrame);
      }
    };

    requestAnimationFrame(countFrame);
  }

  private monitorMemory() {
    if (!this.isMonitoring) return;

    const checkMemory = () => {
      if (__DEV__) {
        // In development, we can log memory info
        const memoryInfo = (performance as any).memory;
        if (memoryInfo) {
          const usedMB = Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024);
          const totalMB = Math.round(memoryInfo.totalJSHeapSize / 1024 / 1024);
          
          this.recordMetric('memory_used_mb', usedMB);
          this.recordMetric('memory_total_mb', totalMB);
          
          if (usedMB > totalMB * 0.8) {
            console.warn(`⚠️ High memory usage: ${usedMB}MB / ${totalMB}MB`);
          }
        }
      }
      
      if (this.isMonitoring) {
        setTimeout(checkMemory, 5000); // Check every 5 seconds
      }
    };

    checkMemory();
  }

  recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const metricArray = this.metrics.get(name)!;
    metricArray.push(value);
    
    // Keep only last 100 values
    if (metricArray.length > 100) {
      metricArray.shift();
    }
  }

  getMetricStats(name: string) {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) return null;

    const sorted = [...values].sort((a, b) => a - b);
    const sum = values.reduce((a, b) => a + b, 0);
    
    return {
      name,
      count: values.length,
      average: Math.round(sum / values.length),
      min: sorted[0],
      max: sorted[sorted.length - 1],
      median: sorted[Math.floor(sorted.length / 2)]
    };
  }

  getPerformanceReport() {
    const report: any = {
      timestamp: new Date().toISOString(),
      metrics: {}
    };

    for (const [name] of this.metrics) {
      const stats = this.getMetricStats(name);
      if (stats) {
        report.metrics[name] = stats;
      }
    }

    return report;
  }

  logPerformanceReport() {
    if (!__DEV__) return;
    
    const report = this.getPerformanceReport();
    console.log('📊 Performance Report:', report);
  }

  // Performance optimization suggestions
  getOptimizationSuggestions(): string[] {
    const suggestions: string[] = [];
    
    const fpsStats = this.getMetricStats('fps');
    if (fpsStats && fpsStats.average < 50) {
      suggestions.push('Consider reducing complex animations or heavy computations');
    }
    
    const memoryStats = this.getMetricStats('memory_used_mb');
    if (memoryStats && memoryStats.average > 100) {
      suggestions.push('Monitor memory usage and consider image optimization');
    }
    
    return suggestions;
  }
}

export default PerformanceMonitor;
