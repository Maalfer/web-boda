import React from 'react';
import './Footer.css';

const Footer = ({ fixed = false }) => {
    return (
        <footer className={`footer ${fixed ? 'fixed' : ''}`}>
            <p>&copy; 2026 Fátima & Mario. Hecho con amor.</p>
        </footer>
    );
};

export default Footer;
