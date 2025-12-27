import React from 'react';
import { useNavigate } from 'react-router-dom';
import detectiveCocker from '../assets/cocker_detective.png';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: 'var(--color-background)'
        }}>
            <img
                src={detectiveCocker}
                alt="Detective Cocker"
                style={{
                    width: '300px',
                    borderRadius: '50%',
                    marginBottom: '2rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}
            />
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-text)' }}>404</h1>
            <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
                ¡Vaya! Parece que esta página no existe.
            </h2>
            <p style={{ marginBottom: '2rem', color: 'var(--color-text-light)' }}>
                Parece que te has perdido en el camino a la boda.
            </p>
            <button
                onClick={() => navigate('/')}
                style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-text)',
                    padding: '1rem 2rem',
                    borderRadius: '30px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    transition: 'transform 0.2s'
                }}
            >
                Volver al Inicio
            </button>
        </div>
    );
};

export default NotFound;
