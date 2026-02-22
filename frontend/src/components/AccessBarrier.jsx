import React, { useState, useEffect } from 'react';
import { verifyPin, checkPinConfigured } from '../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import '../pages/Login.css';

const AccessBarrier = ({ children }) => {
    const [isConfigured, setIsConfigured] = useState(null);
    const [isGranted, setIsGranted] = useState(sessionStorage.getItem('access_granted') === 'true');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    // Comprobar parámetros de la URL
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const accessPin = queryParams.get('acceso');

        if (accessPin && !isGranted) {
            const checkUrlPin = async () => {
                try {
                    const data = await verifyPin(accessPin);
                    if (data.valid) {
                        sessionStorage.setItem('access_granted', 'true');
                        setIsGranted(true);
                        // Limpiar la URL opcionalmente (quitar el parámetro ?acceso=...)
                        navigate(location.pathname, { replace: true });
                    } else {
                        setError('PIN de la URL incorrecto');
                    }
                } catch (err) {
                    console.error("Error validando PIN de URL", err);
                }
            };
            checkUrlPin();
        }
    }, [location, isGranted, navigate]);

    useEffect(() => {
        const checkConfig = async () => {
            try {
                const data = await checkPinConfigured();
                if (!data.configured) {
                    setIsConfigured(false);
                    setIsGranted(true);
                } else {
                    setIsConfigured(true);
                }
            } catch (err) {
                console.error("Error checking PIN configuration", err);
                // Si hay error (ej. backend no disponible), dejamos pasar pero idealmente debería bloquear. 
                // Lo dejamos pasar para no romper la app si no se ha configurado la DB.
                setIsConfigured(false);
                setIsGranted(true);
            }
        };

        if (!isGranted) {
            checkConfig();
        }
    }, [isGranted]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await verifyPin(pin);
            if (data.valid) {
                sessionStorage.setItem('access_granted', 'true');
                setIsGranted(true);
            } else {
                setError('PIN incorrecto');
            }
        } catch (err) {
            setError('Error de conexión');
        }
    };

    // Content is always rendered to show the background
    // But if not granted, an overlay is shown on top

    if (isConfigured === null) {
        return (
            <>
                {children}
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                    Cargando...
                </div>
            </>
        );
    }

    return (
        <>
            {/* Always render the children (the website) behind */}
            <div style={{ filter: !isGranted ? 'blur(4px)' : 'none', pointerEvents: !isGranted ? 'none' : 'auto', userSelect: !isGranted ? 'none' : 'auto' }}>
                {children}
            </div>

            {/* If not granted, render the modal overlay */}
            {!isGranted && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)'
                }}>
                    <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', textAlign: 'center', width: '90%', maxWidth: '400px' }}>
                        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '1.5rem', fontSize: '2.5rem' }}>Acceso Privado</h2>
                        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)', marginBottom: '2rem', fontSize: '1.1rem' }}>Por favor, introduce el PIN para acceder a la web de la boda.</p>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <input
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                placeholder="Introduce el PIN"
                                style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '1.2rem', textAlign: 'center', letterSpacing: '2px', outline: 'none' }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                onBlur={(e) => e.target.style.borderColor = '#ddd'}
                                required
                            />
                            <button
                                type="submit"
                                style={{ padding: '1rem', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '50px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.3s' }}
                                onMouseOver={(e) => e.target.style.backgroundColor = 'var(--color-primary-dark)'}
                                onMouseOut={(e) => e.target.style.backgroundColor = 'var(--color-primary)'}
                            >
                                Entrar
                            </button>
                            {error && <p style={{ color: '#e74c3c', marginTop: '0.5rem', fontFamily: 'var(--font-body)', fontWeight: 'bold' }}>{error}</p>}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AccessBarrier;
