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
            answer: "Sí, el restaurante donde se celebrarán la ceremonia, el banquete y la fiesta cuenta con un parking amplio para los invitados, por lo que no tendréis problema para aparcar cómodamente."
        },
        {
            question: "¿Qué código de vestimenta debo seguir?",
            answer: "Podéis vestiros como os sintáis cómodos, siempre dentro de un estilo formal acorde a la ocasión.\n\nOs pedimos evitar el color blanco y los tonos muy claros."
        },
        {
            question: "¿Puedo tomar fotos durante la ceremonia?",
            answer: "Durante la ceremonia habrá un fotógrafo que captará los momentos más importantes, pero podéis hacer todas las fotos que queráis, tanto en la ceremonia como en el banquete y la fiesta.\n\nNos hará mucha ilusión ver la boda desde vuestro punto de vista, por eso hemos incluido un apartado en la web para que podáis subir y compartir vuestras fotos, como veréis más abajo."
        },
        {
            question: "¿Puedo llevar niños a la boda?",
            answer: "Sí, los niños son bienvenidos, solo os pedimos que los padres se hagan cargo de ellos durante toda la celebración.\n\nPor favor, indicadlo en el formulario de confirmación de asistencia para poder organizar el menú infantil."
        },
        {
            question: "¿Hay alojamiento disponible?",
            answer: (
                <div>
                    <p>Sí, justo enfrente del lugar de la celebración está el Hotel Oca Palacio de la Llorea Spa, a muy poca distancia del restaurante. Es una opción cómoda si queréis quedaros a dormir después de la boda.</p>
                    <div style={{ marginTop: '1rem' }}>
                        <a 
                            href="https://share.google/HbpKK810vzpWYVWwB" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--color-primary)',
                                textDecoration: 'none',
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.9rem',
                                padding: '0.5rem 1rem',
                                border: '1px solid var(--color-primary)',
                                borderRadius: '20px',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = 'var(--color-primary)';
                                e.target.style.color = 'white';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.color = 'var(--color-primary)';
                            }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>📍</span>
                            Ver en Google Maps
                        </a>
                    </div>
                </div>
            )
        }
    ];

    const toggleQuestion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="faq-section">
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
