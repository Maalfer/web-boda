class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.monitorFontLoading();
    this.monitorLCP();
    this.monitorCLS();
    this.optimizeImages();
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
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });
  }

  addPerformanceMarks() {
    performance.mark('app-start');
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        performance.mark('dom-loaded');
      });
    } else {
      performance.mark('dom-loaded');
    }
    
    window.addEventListener('load', () => {
      performance.mark('page-loaded');
      
      setTimeout(() => {
        this.measurePerformance();
      }, 0);
    });
  }

  measurePerformance() {
    if ('performance' in window && 'measure' in performance) {
      performance.measure('app-to-dom', 'app-start', 'dom-loaded');
      performance.measure('app-to-page-load', 'app-start', 'page-loaded');
      
      const measures = performance.getEntriesByType('measure');
      measures.forEach(measure => {
        console.log(`${measure.name}: ${measure.duration.toFixed(2)}ms`);
      });
    }
  }

  deferScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  preloadResource(url, as) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = as;
    document.head.appendChild(link);
  }
}

if (typeof window !== 'undefined') {
  window.performanceOptimizer = new PerformanceOptimizer();
}

export default PerformanceOptimizer;
