import React, { useRef } from 'react';
import invitationImage from '../../assets/images/invitation.webp';
import './DownloadInvitation.css';

const DownloadInvitation = () => {
    const previewCardRef = useRef(null);
    const isDraggingRef = useRef(false);
    const lastPointerRef = useRef({ x: 0, y: 0 });
    const tiltRef = useRef({ rx: 0, ry: 0 });

    const handleDownload = () => {
        window.open(`${import.meta.env.BASE_URL}invitacion.pdf`, '_blank');
    };

    const handlePreviewMouseMove = (e) => {
        const card = previewCardRef.current;
        if (!card) return;

        if (isDraggingRef.current) return;

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

        if (isDraggingRef.current) return;

        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--sx', '0');
        card.style.setProperty('--sy', '0');
    };

    const handlePreviewPointerDown = (e) => {
        const card = previewCardRef.current;
        if (!card) return;

        isDraggingRef.current = true;
        lastPointerRef.current = { x: e.clientX, y: e.clientY };

        card.setPointerCapture?.(e.pointerId);
        card.style.setProperty('--dragging', '1');
    };

    const handlePreviewPointerMove = (e) => {
        const card = previewCardRef.current;
        if (!card || !isDraggingRef.current) return;

        const dx = e.clientX - lastPointerRef.current.x;
        const dy = e.clientY - lastPointerRef.current.y;
        lastPointerRef.current = { x: e.clientX, y: e.clientY };

        const sensitivity = 0.18;
        const nextRy = tiltRef.current.ry + dx * sensitivity;
        const nextRx = tiltRef.current.rx - dy * sensitivity;

        const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
        tiltRef.current = {
            rx: clamp(nextRx, -22, 22),
            ry: clamp(nextRy, -26, 26)
        };

        card.style.setProperty('--rx', `${tiltRef.current.rx}deg`);
        card.style.setProperty('--ry', `${tiltRef.current.ry}deg`);
    };

    const handlePreviewPointerUp = (e) => {
        const card = previewCardRef.current;
        if (!card) return;

        isDraggingRef.current = false;
        card.releasePointerCapture?.(e.pointerId);
        card.style.setProperty('--dragging', '0');
    };

    return (
        <section id="invitation" className="download-invitation-section">
            <div className="download-container">
                <div className="invitation-content">
                    <div className="invitation-right">
                        <div className="invitation-preview">
                            <div
                                ref={previewCardRef}
                                className="preview-card preview-card-tilt"
                                onMouseMove={handlePreviewMouseMove}
                                onMouseLeave={handlePreviewMouseLeave}
                                onPointerDown={handlePreviewPointerDown}
                                onPointerMove={handlePreviewPointerMove}
                                onPointerUp={handlePreviewPointerUp}
                                onPointerCancel={handlePreviewPointerUp}
                            >
                                <img 
                                    src={invitationImage} 
                                    alt="Invitación Fátima y Mario" 
                                    className="invitation-image"
                                    loading="lazy"
                                    decoding="async"
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
