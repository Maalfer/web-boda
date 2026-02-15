import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import Modal from '../ui/Modal';
import { submitRsvp } from '../../services/api';
import './Story.css';
import '../../styles/Form.css';

const Story = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        attendance: '',
        companion: '',
        transport: '',
        allergies: '',
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
                attendance: formData.attendance,
                companion: formData.companion,
                transport: formData.transport,
                allergies: formData.allergies,
                message: formData.message
            };

            const response = await submitRsvp(payload);

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
                    gravity: 0.25,
                    decay: 0.91,
                    shapes: ['circle']
                };

                const randomInRange = (min, max) => Math.random() * (max - min) + min;

                const interval = setInterval(() => {
                    const timeLeft = animationEnd - Date.now();

                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }

                    const particleCount = 80;

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
                setFormData({ name: '', attendance: '', companion: '', transport: '', allergies: '', message: '' });
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
                            <a href={`https://wa.me/${import.meta.env.VITE_PHONE_FATIMA}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-dark)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '1.2rem' }}>💬</span> WhatsApp (Fátima)
                            </a>
                            <a href={`https://wa.me/${import.meta.env.VITE_PHONE_MARIO}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-dark)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '1.2rem' }}>💬</span> WhatsApp (Mario)
                            </a>
                            <a href="mailto:fatimaymariosecasan@gmail.com" style={{ color: 'var(--color-primary-dark)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '1.2rem' }}>✉️</span> fatimaymariosecasan@gmail.com
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
                        <label htmlFor="attendance">¿Asistirás? *</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 'normal' }}>
                                <input
                                    type="radio"
                                    name="attendance"
                                    value="Sí, asistiré"
                                    checked={formData.attendance === 'Sí, asistiré'}
                                    onChange={handleChange}
                                    required
                                />
                                Sí, asistiré
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 'normal' }}>
                                <input
                                    type="radio"
                                    name="attendance"
                                    value="No podré asistir"
                                    checked={formData.attendance === 'No podré asistir'}
                                    onChange={handleChange}
                                    required
                                />
                                No podré asistir
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="companion">¿Llevarás acompañante? Si es así, indícanos su nombre y apellidos *</label>
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
                        <label htmlFor="allergies">¿Tienes alguna alergia, intolerancia o restricción alimentaria? Cuéntanoslo aquí para que disfrutes del banquete al 100% *</label>
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
                        <label htmlFor="transport">¿Necesitarás transporte? Habrá autobús disponible desde Avilés tanto para la ida como para la vuelta de la celebración *</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 'normal' }}>
                                <input
                                    type="radio"
                                    name="transport"
                                    value="Sí, necesitaré autobús"
                                    checked={formData.transport === 'Sí, necesitaré autobús'}
                                    onChange={handleChange}
                                    required
                                />
                                Sí, necesitaré autobús
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 'normal' }}>
                                <input
                                    type="radio"
                                    name="transport"
                                    value="No, iré en coche"
                                    checked={formData.transport === 'No, iré en coche'}
                                    onChange={handleChange}
                                    required
                                />
                                No, iré en coche
                            </label>
                        </div>
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
