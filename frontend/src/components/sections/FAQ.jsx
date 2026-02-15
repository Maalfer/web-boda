import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "¿Puedo llevar acompañante?",
            answer: "Sí, puedes traer a acompañante. Solo te pedimos que nos lo comuniques con antelación para poder organizarlo y que, a ser posible, lo conozcamos.\n\nSi tienes cualquier duda, ponte en contacto con nosotros para confirmarlo directamente."
        },
        {
            question: "¿Habrá parking disponible?",
            answer: "Sí, tanto la iglesia como el castillo cuentan con parking gratuito. Además, hemos organizado un servicio de shuttle entre ambos locales para mayor comodidad."
        },
        {
            question: "¿Qué código de vestimenta debo seguir?",
            answer: "Sugerimos vestimenta de gala. Para los caballeros, traje oscuro y corbata. Para las damas, vestido largo o cóctel. Evitamos el color blanco por respeto a la novia."
        },
        {
            question: "¿Puedo tomar fotos durante la ceremonia?",
            answer: "Durante la ceremonia religiosa te pedimos amablemente que guardes el teléfono y disfrutes del momento. Nuestro fotógrafo se encargará de capturar todos los instantes. Sí podrás tomar fotos durante el banquete."
        },
        {
            question: "¿Puedo llevar niños a la boda?",
            answer: "Amamos a los niños, pero hemos decidido que nuestra boda será un evento para adultos a partir de 16 años para que todos puedan disfrutar plenamente de la celebración."
        },
        {
            question: "¿Hay alojamiento disponible?",
            answer: "Sí, hemos bloqueado habitaciones en varios hoteles cercanos con tarifas especiales. Puedes encontrar la lista de hoteles en la sección de ubicación de nuestra web."
        }
    ];

    const toggleQuestion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <div className="faq-container">
                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    Preguntas frecuentes
                </h2>
                
                <div className="faq-grid">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                            <button
                                className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => toggleQuestion(index)}
                            >
                                <span className="faq-question-text">
                                    {faq.question}
                                </span>
                                <span className="faq-icon">
                                    +
                                </span>
                            </button>
                            
                            <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                                <p className="faq-answer-text">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
