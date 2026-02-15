import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Performance: Remove StrictMode in production for better performance
const isDevelopment = import.meta.env.DEV

createRoot(document.getElementById('root')).render(
  isDevelopment ? <StrictMode><App /></StrictMode> : <App />
)
