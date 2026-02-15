import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './utils/performance.js'

// Performance: Remove StrictMode in production for better performance
const isDevelopment = import.meta.env.DEV

// Register Service Worker for performance optimization
if ('serviceWorker' in navigator && !isDevelopment) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}

// Add font loading classes
document.body.classList.add('font-loading');

// Performance mark for app initialization
if ('performance' in window && 'mark' in performance) {
  performance.mark('app-init-start');
}

createRoot(document.getElementById('root')).render(
  isDevelopment ? <StrictMode><App /></StrictMode> : <App />
)

// Performance mark for app render complete
if ('performance' in window && 'mark' in performance) {
  performance.mark('app-render-complete');
}
