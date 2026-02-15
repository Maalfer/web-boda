import React from 'react';
import './Hero.css';

import Countdown from './Countdown';
import AddToCalendar from './AddToCalendar';

const Hero = () => {
    return (
        <section id="hero" className="hero">
            <div className="hero-content">
                <h1 className="hero-title">Fátima <span className="amp">&</span> Mario</h1>
                <p className="hero-big-date">08/08/2026</p>
                <div className="hero-invitation">
                    <p>¡Nos casamos! Y queremos que forméis parte de este día tan especial para nosotros.</p>
                </div>
                <Countdown targetDate="2026-08-08T17:30:00" />
                <AddToCalendar />
            </div>
        </section>
    );
};

export default Hero;
