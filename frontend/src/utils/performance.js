// Performance monitoring and optimization
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    // Monitor font loading
    this.monitorFontLoading();
    
    // Monitor LCP
    this.monitorLCP();
    
    // Monitor CLS
    this.monitorCLS();
    
    // Optimize images
    this.optimizeImages();
    
    // Add performance marks
    this.addPerformanceMarks();
  }

  monitorFontLoading() {
    if ('fonts' in document) {
      Promise.all([
        document.fonts.load('1em Lovely Girl'),
        document.fonts.load('1em Griffiths')
      ]).then(() => {
        document.body.classList.add('fonts-loaded');
        console.log('Custom fonts loaded');
      });
    }
  }

  monitorLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  monitorCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        console.log('CLS:', clsValue);
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }

  optimizeImages() {
    // Add loading="lazy" to images that don't have it
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });
  }

  addPerformanceMarks() {
    // Mark key performance points
    performance.mark('app-start');
    
    // Mark when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        performance.mark('dom-loaded');
      });
    } else {
      performance.mark('dom-loaded');
    }
    
    // Mark when page is fully loaded
    window.addEventListener('load', () => {
      performance.mark('page-loaded');
      
      // Measure performance
      setTimeout(() => {
        this.measurePerformance();
      }, 0);
    });
  }

  measurePerformance() {
    if ('performance' in window && 'measure' in performance) {
      // Measure time from app start to DOM loaded
      performance.measure('app-to-dom', 'app-start', 'dom-loaded');
      
      // Measure time from app start to page loaded
      performance.measure('app-to-page-load', 'app-start', 'page-loaded');
      
      // Log performance measures
      const measures = performance.getEntriesByType('measure');
      measures.forEach(measure => {
        console.log(`${measure.name}: ${measure.duration.toFixed(2)}ms`);
      });
    }
  }

  // Defer non-critical JavaScript
  deferScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  // Preload critical resources
  preloadResource(url, as) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = as;
    document.head.appendChild(link);
  }
}

// Initialize performance optimizer
if (typeof window !== 'undefined') {
  window.performanceOptimizer = new PerformanceOptimizer();
}

export default PerformanceOptimizer;
