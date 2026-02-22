import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Photos from './pages/Photos';
import NotFound from './pages/NotFound';
import AccessBarrier from './components/AccessBarrier';
import './index.css';

// Wrapper component to use hooks inside Router context
const MainContent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AccessBarrier><Home /></AccessBarrier>} />
        <Route path="/photos" element={<AccessBarrier><Photos /></AccessBarrier>} />
        <Route path="/login" element={<Login />} />
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
