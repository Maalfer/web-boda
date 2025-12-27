import React from 'react';
import iconos from '../assets/iconos.png';
import './Map.css';

const Map = () => {
    return (
        <section id="map" className="map-section">
            <div className="map-message">

                <h2 className="section-title">Lugar de celebración</h2>
                <img
                    src={iconos}
                    alt="Iconos de boda"
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        maxHeight: '200px',
                        objectFit: 'contain',
                        margin: '0.1rem 0'
                    }}
                />
                <p>Os esperamos para celebrarlo juntos el <strong style={{ color: 'var(--color-primary-dark)' }}>sábado 8 de agosto de 2026</strong> a las <strong style={{ color: 'var(--color-primary-dark)' }}>17:30 h.</strong> <br></br>en <strong style={{ color: 'var(--color-primary-dark)' }}>La Hacienda de la Llorea Golf (Gijón)</strong></p>
                <a
                    href="https://www.google.com/maps/search/?api=1&query=La+Hacienda+de+la+Llorea+Golf+Gijon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-button"
                >
                    Cómo llegar
                </a>
            </div>
            <div className="map-container">
                <iframe
                    title="Ubicación Boda"
                    width="100%"
                    height="450"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://maps.google.com/maps?q=43.5358,-5.5894&t=&z=15&ie=UTF8&iwloc=&output=embed"
                >
                </iframe>
            </div>
        </section>
    );
};

export default Map;
