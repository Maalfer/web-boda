import React, { useRef } from 'react';
import invitationImage from '../../assets/images/invitation.png';
import './DownloadInvitation.css';

const DownloadInvitation = () => {
    const previewCardRef = useRef(null);

    const handleDownload = () => {
        window.open('/invitacion.pdf', '_blank');
    };

    const handlePreviewMouseMove = (e) => {
        const card = previewCardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const px = (x / rect.width) * 2 - 1;
        const py = (y / rect.height) * 2 - 1;

        const maxTilt = 18;
        const ry = px * maxTilt;
        const rx = -py * maxTilt;

        card.style.setProperty('--rx', `${rx}deg`);
        card.style.setProperty('--ry', `${ry}deg`);
        card.style.setProperty('--sx', `${px}`);
        card.style.setProperty('--sy', `${py}`);
    };

    const handlePreviewMouseLeave = () => {
        const card = previewCardRef.current;
        if (!card) return;

        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--sx', '0');
        card.style.setProperty('--sy', '0');
    };

    return (
        <section className="download-invitation-section">
            <div className="download-container">
                <div className="invitation-content">
                    <div className="invitation-right">
                        <div className="invitation-preview">
                            <div
                                ref={previewCardRef}
                                className="preview-card preview-card-tilt"
                                onMouseMove={handlePreviewMouseMove}
                                onMouseLeave={handlePreviewMouseLeave}
                            >
                                <img 
                                    src={invitationImage} 
                                    alt="Invitación Fátima y Mario" 
                                    className="invitation-image"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="invitation-left">
                        <h2 className="section-title">Descarga tu invitación</h2>
                        <p className="invitation-description">
                            Guarda nuestro recuerdo más especial. Descarga nuestra invitación oficial para tenerla siempre contigo como un tesoro de este día único.
                        </p>
                        <div className="download-action download-action-inline">
                            <button className="download-btn" onClick={handleDownload}>
                                <span className="btn-text">Obtener invitación</span>
                                <span className="btn-shine"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DownloadInvitation;
