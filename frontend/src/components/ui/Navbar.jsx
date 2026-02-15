import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigation = (sectionId) => {
        if (location.pathname !== '/') {
            // If not on home page, navigate to home first, then to section
            navigate('/', { replace: true });
            // Wait a bit for the home page to load, then scroll to section
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            // If already on home page, just scroll to section
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        toggleMenu();
    };

    const handleHomeClick = () => {
        navigate('/', { replace: true });
        toggleMenu();
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <button onClick={handleHomeClick} style={{ 
                    background: 'none', 
                    border: 'none', 
                    textDecoration: 'none', 
                    color: 'inherit', 
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    cursor: 'pointer'
                }}>
                    F <span className="amp">&</span> M
                </button>
            </div>
            <div className="menu-icon" onClick={toggleMenu}>
                <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                {/* Fallback if FontAwesome not available, simplistic bars */}
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
                <li><button onClick={() => handleNavigation('hero')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}>Inicio</button></li>
                <li><button onClick={() => handleNavigation('map')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}>Lugar de celebración</button></li>
                <li><button onClick={() => handleNavigation('story')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}>Confirmar asistencia</button></li>
                <li><button onClick={() => handleNavigation('faq')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}>Preguntas frecuentes</button></li>
                <li><button onClick={() => handleNavigation('photos')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}>Captura el amor</button></li>
                <li><button onClick={() => handleNavigation('invitation')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}>Descarga tu invitación</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;
