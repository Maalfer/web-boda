import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ children, threshold = 0.1 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once visible, we can stop observing if we only want the animation to happen once
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: threshold,
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before the bottom
        });

        const { current } = domRef;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, [threshold]);

    return (
        <div
            ref={domRef}
            className={`reveal ${isVisible ? 'is-visible' : ''}`}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
