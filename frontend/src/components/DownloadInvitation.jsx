import React from 'react';
import './Form.css';

const DownloadInvitation = () => {
    const handleDownload = () => {
        window.open('/invitacion.pdf', '_blank');
    };

    return (
        <section style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            backgroundColor: 'white'
        }}>
            <h2 className="section-title">Descarga tu invitación</h2>
            <p style={{ maxWidth: '600px', margin: '1rem auto 2rem', fontFamily: 'var(--font-body)', fontSize: '1.1rem' }}>
                Descarga nuestra invitación oficial para tenerla siempre contigo.
            </p>
            <button
                className="submit-btn"
                onClick={handleDownload}
            >
                Obtener invitación
            </button>
        </section>
    );
};

export default DownloadInvitation;
