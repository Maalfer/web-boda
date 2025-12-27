import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Photos from './components/Photos';
import Envelope from './components/Envelope';
import NotFound from './components/NotFound';
import './index.css';

// Wrapper component to use hooks inside Router context
const MainContent = () => {
  // Check session storage to see if envelope was already opened
  const [envelopeSeen, setEnvelopeSeen] = useState(() => {
    return sessionStorage.getItem('envelopeSeen') === 'true';
  });
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  const handleEnvelopeOpen = () => {
    setEnvelopeOpened(true);
    setEnvelopeSeen(true);
    sessionStorage.setItem('envelopeSeen', 'true');
  };

  return (
    <>
      {/* Show envelope only if not seen yet in this session */}
      {!envelopeSeen && <Envelope onOpen={handleEnvelopeOpen} />}

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
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;
