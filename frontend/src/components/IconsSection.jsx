import React from 'react';
import iconos from '../assets/iconos.png';

const IconsSection = () => {
    return (
        <section style={{
            padding: '3rem 2rem',
            textAlign: 'center',
            backgroundColor: '#f9f9f9'
        }}>
            <img
                src={iconos}
                alt="Iconos de boda"
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    maxHeight: '400px',
                    objectFit: 'contain'
                }}
            />
        </section>
    );
};

export default IconsSection;
