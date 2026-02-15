import React, { useState, useEffect } from 'react';
import './Countdown.css';

const Countdown = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                días: Math.floor(difference / (1000 * 60 * 60 * 24)),
                horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutos: Math.floor((difference / 1000 / 60) % 60),
                segundos: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { días: 0, horas: 0, minutos: 0, segundos: 0 };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="countdown">
            <div className="countdown-item">
                <span className="countdown-number">{timeLeft.días || 0}</span>
                <span className="countdown-label">Días</span>
            </div>
            <div className="countdown-item">
                <span className="countdown-number">{timeLeft.horas || 0}</span>
                <span className="countdown-label">Horas</span>
            </div>
            <div className="countdown-item">
                <span className="countdown-number">{timeLeft.minutos || 0}</span>
                <span className="countdown-label">Min</span>
            </div>
            <div className="countdown-item">
                <span className="countdown-number">{timeLeft.segundos || 0}</span>
                <span className="countdown-label">Seg</span>
            </div>
        </div>
    );
};

export default Countdown;
