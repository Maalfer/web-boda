import React from 'react';
import { useNavigate } from 'react-router-dom';
import polaroid1 from '../assets/polaroid1.jpg';
import polaroid2 from '../assets/polaroid2.jpg';
import './Form.css'; // Reusing button styles

const CaptureLove = () => {
    const navigate = useNavigate();

    return (
        <section id="photos" style={{
            padding: '4rem 2rem',
            backgroundColor: '#f9f9f9'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                gap: '3rem',
                flexWrap: 'wrap'
            }}>
                {/* Left side - Content */}
                <div style={{ flex: '1 1 400px', textAlign: 'center' }}>
                    <h2 className="section-title">Captura el amor</h2>
                    <p style={{ maxWidth: '600px', margin: '1rem auto', fontFamily: 'var(--font-body)', fontSize: '1.1rem' }}>
                        Nos encantaría ver nuestra boda a través de tus ojos. <br></br>Por favor, comparte tus fotos y vídeos accediendo al enlace que se encuentra a continuación.
                    </p>
                    <button
                        className="submit-btn"
                        onClick={() => navigate('/photos')}
                        style={{ marginTop: '1rem' }}
                    >
                        Sube tus fotos
                    </button>
                </div>

                {/* Right side - Polaroids */}
                <div style={{
                    flex: '0 0 300px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    position: 'relative'
                }}>
                    {/* Polaroid 1 */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '1rem',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                        transform: 'rotate(-3deg)',
                        borderRadius: '4px'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '200px',
                            backgroundImage: `url(${polaroid1})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            marginBottom: '0.5rem'
                        }}>
                        </div>
                        <div style={{
                            height: '40px',
                            backgroundColor: 'white'
                        }}></div>
                    </div>

                    {/* Polaroid 2 */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '1rem',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                        transform: 'rotate(2deg)',
                        borderRadius: '4px',
                        marginTop: '-2.5rem'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '200px',
                            backgroundImage: `url(${polaroid2})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            marginBottom: '0.5rem'
                        }}>
                        </div>
                        <div style={{
                            height: '40px',
                            backgroundColor: 'white'
                        }}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CaptureLove;
