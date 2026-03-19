import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
    const modalRef = useRef(null);
    const isMobileRef = useRef(false);

    useEffect(() => {
        // Detect mobile device
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                        window.innerWidth <= 768;
        isMobileRef.current = isMobile;

        if (isOpen) {
            // Save current scroll position
            const scrollY = window.scrollY;
            
            // Disable body scroll but maintain position
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
            
            // Add touch action handling for iOS - but allow interaction with form elements
            document.body.style.touchAction = isMobile ? 'pan-y' : 'none';
            
            // Prevent iOS zoom on input focus
            if (isMobile) {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
                }
            }
        } else {
            // Restore body scroll and position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            
            // Restore viewport settings
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport && isMobileRef.current) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
            }
            
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            // Cleanup: restore body scroll
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            
            // Restore viewport settings
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport && isMobileRef.current) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
            }
        };
    }, [isOpen]);

    // Handle click outside modal
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div 
                ref={modalRef}
                className="modal-content" 
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose}>&times;</button>
                {title && <h2 className="modal-title">{title}</h2>}
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
