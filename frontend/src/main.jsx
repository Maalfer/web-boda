import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './utils/performance.js'

const isDevelopment = import.meta.env.DEV

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

document.body.classList.add('font-loading');

if ('performance' in window && 'mark' in performance) {
  performance.mark('app-init-start');
}

createRoot(document.getElementById('root')).render(
  isDevelopment ? <StrictMode><App /></StrictMode> : <App />
)

if ('performance' in window && 'mark' in performance) {
  performance.mark('app-render-complete');
}
