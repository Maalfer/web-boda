// Componente de debugging para identificar problemas con radio buttons
import React, { useEffect, useRef } from 'react';

const StoryDebug = () => {
    const debugRef = useRef(null);

    useEffect(() => {
        const checkRadioButtons = () => {
            const radios = document.querySelectorAll('input[type="radio"]');
            const labels = document.querySelectorAll('.radio-label');
            
            console.log('=== DEBUG RADIO BUTTONS ===');
            console.log('Radio buttons encontrados:', radios.length);
            console.log('Labels encontrados:', labels.length);
            
            radios.forEach((radio, index) => {
                console.log(`Radio ${index}:`, {
                    name: radio.name,
                    value: radio.value,
                    checked: radio.checked,
                    disabled: radio.disabled,
                    style: window.getComputedStyle(radio),
                    parent: radio.parentElement,
                    events: Object.keys(radio._reactEvents || {})
                });
            });

            labels.forEach((label, index) => {
                console.log(`Label ${index}:`, {
                    text: label.textContent,
                    pointerEvents: window.getComputedStyle(label).pointerEvents,
                    touchAction: window.getComputedStyle(label).touchAction,
                    zIndex: window.getComputedStyle(label).zIndex,
                    position: window.getComputedStyle(label).position
                });
            });

            // Detectar dispositivo
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const isTouch = 'ontouchstart' in window;
            console.log('Dispositivo:', { isMobile, isTouch });
            console.log('User Agent:', navigator.userAgent);
            console.log('Viewport:', window.innerWidth + 'x' + window.innerHeight);
        };

        // Ejecutar debugging después de montar el modal
        const timeoutId = setTimeout(checkRadioButtons, 1000);
        
        // También ejecutar cuando haya interacción
        const handleInteraction = () => {
            checkRadioButtons();
        };

        document.addEventListener('click', handleInteraction);
        document.addEventListener('touchstart', handleInteraction);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('touchstart', handleInteraction);
        };
    }, []);

    return null; // Componente invisible, solo para debugging
};

export default StoryDebug;
