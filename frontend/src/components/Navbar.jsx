import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>F & M</a>
            </div>
            <div className="menu-icon" onClick={toggleMenu}>
                <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                {/* Fallback if FontAwesome not available, simplistic bars */}
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
                <li onClick={toggleMenu}><a href="/#hero">Inicio</a></li>
                <li onClick={toggleMenu}><a href="/#map">Lugar de celebración</a></li>
                <li onClick={toggleMenu}><a href="/#story">Confirmar asistencia</a></li>
                <li onClick={toggleMenu}><a href="/#photos">Captura el amor</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
