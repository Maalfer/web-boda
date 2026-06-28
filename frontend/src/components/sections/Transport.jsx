import React from 'react';
import busImg from '../../assets/images/bus.webp';
import './Transport.css';

const Transport = () => {
    return (
        <section id="transport" className="transport-section">
            <div className="transport-container">
                <h2 className="section-title">Transporte a la boda</h2>
                <div className="transport-card">
                    <img src={busImg} alt="Autobús para los invitados" className="transport-image" loading="lazy" />
                    <p className="transport-text">
                        Para que podáis disfrutar de la celebración con total tranquilidad, pondremos a vuestra disposición un autobús.
                    </p>
                    <p className="transport-text">
                        La salida será a las <strong>16:30h.</strong> desde la parada de bús del Colegio El Quirinal (Avilés), y os llevará directamente hasta La Hacienda de la Llorea Golf.
                    </p>
                    <p className="transport-text">
                        Al finalizar la fiesta, el autobús os llevará a las <strong>03:00h</strong> de vuelta a Avilés.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Transport;
