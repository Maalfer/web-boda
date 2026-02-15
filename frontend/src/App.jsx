import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Photos from './pages/Photos';
import NotFound from './pages/NotFound';
import './index.css';

// Wrapper component to use hooks inside Router context
const MainContent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/balulero" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <MainContent />
    </Router>
  );
}

export default App;
