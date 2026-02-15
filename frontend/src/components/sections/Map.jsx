import React, { useState, useEffect, useRef } from 'react';
import iconos from '../../assets/images/iconos.webp';
import './Map.css';

const Map = () => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const mapRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isMapLoaded) {
                        setIsMapLoaded(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (mapRef.current) {
            observer.observe(mapRef.current);
        }

        return () => observer.disconnect();
    }, [isMapLoaded]);
    return (
        <section id="map" className="map-section">
            <div className="map-message">

                <h2 className="section-title">Lugar de celebración</h2>
                <img
                    src={iconos}
                    alt="Iconos de boda"
                    width="627"
                    height="350"
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        maxHeight: '200px',
                        objectFit: 'contain',
                        margin: '0.1rem 0'
                    }}
                />
                <p>Os esperamos para celebrarlo juntos el <strong style={{ color: 'var(--color-primary-dark)' }}>sábado 8 de agosto de 2026</strong> a las <strong style={{ color: 'var(--color-primary-dark)' }}>17:30&nbsp;h.</strong> <br></br>en <strong style={{ color: 'var(--color-primary-dark)' }}>La Hacienda de la Llorea Golf (Gijón)</strong></p>
                <a
                    href="https://www.google.com/maps/search/?api=1&query=La+Hacienda+de+la+Llorea+Golf+Gijon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-button"
                >
                    Cómo llegar
                </a>
            </div>
            <div className="map-container" ref={mapRef}>
                {isMapLoaded ? (
                    <iframe
                        title="Ubicación Boda"
                        width="100%"
                        height="450"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        src="https://maps.google.com/maps?q=43.5358,-5.5894&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        loading="lazy"
                    >
                    </iframe>
                ) : (
                    <div style={{
                        width: '100%',
                        height: '450px',
                        background: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#666',
                        fontSize: '1.1rem'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📍</div>
                            Cargando mapa...
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Map;
