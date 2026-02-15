import React from 'react';
import './Hero.css';

const AddToCalendar = () => {
    const event = {
        title: 'Boda Fátima & Mario',
        start: '20260808T173000',
        end: '20260809T030000',
        location: 'La Hacienda de la Llorea Golf, Gijón',
        description: '¡Nos casamos! Os esperamos para celebrarlo juntos.'
    };

    const handleGoogleCalendar = () => {
        const startTime = event.start;
        const endTime = event.end;
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="add-calendar-container">
            <button
                className="add-calendar-btn"
                onClick={handleGoogleCalendar}
            >
                Añadir al calendario
            </button>
        </div>
    );
};

export default AddToCalendar;
