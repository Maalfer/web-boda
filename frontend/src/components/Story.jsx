import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import Modal from './Modal';
import './Story.css';
import './Form.css'; // Shared form styles

const Story = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        companion: '',
        transport: '',
        allergies: '',
        song: '',
        message: ''
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                name: formData.name,
                companion: formData.companion,
                transport: formData.transport,
                allergies: formData.allergies,
                song: formData.song,
                message: formData.message
            };

            const response = await fetch('http://localhost:8000/rsvp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const duration = 5000;
                const animationEnd = Date.now() + duration;
                const defaults = {
                    startVelocity: 45,
                    spread: 360,
                    ticks: 90,
                    zIndex: 10000,
                    colors: ['#ffffff', '#FFD700', '#FDB931', '#FFFFE0'],
                    scalar: 1.2,
                    gravity: 0.25, // Added
                    decay: 0.91,   // Added
                    shapes: ['circle'] // Added
                };

                const randomInRange = (min, max) => Math.random() * (max - min) + min;

                const interval = setInterval(() => {
                    const timeLeft = animationEnd - Date.now();

                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }

                    const particleCount = 80;

                    // Random bursts across the screen for maximum impact
                    confetti({
                        ...defaults,
                        particleCount,
                        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
                    });
                    confetti({
                        ...defaults,
                        particleCount,
                        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
                    });
                }, 250);
                alert('¡Gracias por confirmar! Hemos tomado nota.');
                setFormData({ name: '', companion: '', transport: '', allergies: '', song: '', message: '' });
                closeModal();
            } else {
                alert('Hubo un error. Por favor intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión.');
        }
    };

    return (
        <section id="story" className="section story">
            <div className="container">
                <h2 className="section-title">Confirmar asistencia</h2>
                <div className="story-content">
                    <p style={{ marginBottom: '0.5rem' }}>
                        Contamos con vosotros para hacer este día aún más especial.
                    </p>
                    <button className="confirm-btn" style={{ marginTop: '1rem' }} onClick={openModal}>Confirmar asistencia</button>

                    <div style={{ marginTop: '2rem' }}>
                        <p style={{ marginBottom: '1rem', fontFamily: 'var(--font-handwriting)', fontSize: '1.5rem' }}>
                            Se ruega confirmación antes del 20 de julio.
                        </p>
                        <p style={{ marginBottom: '1rem', fontFamily: 'var(--font-handwriting)', fontSize: '1.5rem' }}>
                            No dudes en ponerte en contacto con nosotros para más información
                        </p>
                        <div className="contact-links" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                            <a href="https://wa.me/34000000000" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-dark)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '1.2rem' }}>💬</span> WhatsApp (Fátima)
                            </a>
                            <a href="https://wa.me/34000000000" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-dark)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '1.2rem' }}>💬</span> WhatsApp (Mario)
                            </a>
                            <a href="mailto:novios@boda.com" style={{ color: 'var(--color-primary-dark)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '1.2rem' }}>✉️</span> Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title="Confirmar asistencia">
                <form className="rsvp-form-modal" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre y apellidos *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="companion">¿Llevas acompañante? Si es así, nombre y apellidos. *</label>
                        <input
                            type="text"
                            id="companion"
                            name="companion"
                            value={formData.companion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="transport">¿Necesitas transporte? *</label>
                        <select
                            id="transport"
                            name="transport"
                            value={formData.transport}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="No">No</option>
                            <option value="Si">Sí</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="allergies">¿Eres alérgico a algo? Si es así, indícanos a qué *</label>
                        <input
                            type="text"
                            id="allergies"
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="song">¿Cuál es la canción que no te puede faltar en la fiesta? (Opcional)</label>
                        <input
                            type="text"
                            id="song"
                            name="song"
                            value={formData.song}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Deja un mensaje para los novios (Opcional)</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="3"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Enviar confirmación</button>
                </form>
            </Modal>
        </section>
    );
};

export default Story;
