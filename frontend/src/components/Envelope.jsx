import React, { useState } from 'react';
import './Envelope.css';
import waxSeal from '../assets/wax_seal.png';

const Envelope = ({ onOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    const handleClick = () => {
        if (isOpen) return; // Prevent double click
        setIsOpen(true);
        onOpen(); // Notify parent to play audio etc if needed

        // Wait for flap animation then hide overlay
        setTimeout(() => {
            setIsHidden(true);
        }, 1500); // 1.5s delay to let animation finish before sliding away
    };

    if (isHidden) return null; // Remove from DOM after animation

    return (
        <div className={`envelope-overlay ${isOpen ? 'hidden' : ''}`}>
            <div className={`envelope ${isOpen ? 'open' : ''}`} onClick={handleClick}>

                {/* Letter (Background) */}
                <div className="letter"></div>

                {/* Flaps */}
                <div className="flap flap-left"><div className="texture-bg"></div></div>
                <div className="flap flap-right"><div className="texture-bg"></div></div>
                <div className="flap flap-bottom"><div className="texture-bg"></div></div>

                {/* Top Flap */}
                <div className="flap flap-top"><div className="texture-bg"></div></div>

                {/* Seal - Independent of flaps for easier centering, moves via transition if we wanted, 
                    but simpler if it just fades/scales. 
                    Wait, if Top Flap opens, seal must move with it or disappear.
                    CSS logic: .envelope.open .flap-top transforms. 
                    If seal is separate, it won't rotate. 
                    
                    Re-thinking: If I put seal in flap-top, it rotates 180deg upside down and goes behind.
                    That is realistic.
                    Let's revert stick seal in flap-top, OR:
                    The TOP FLAP rotates UP. 
                    The seal is usually attached to the BOTTOM flap (body) or TOP flap.
                    If attached to TOP, it breaks the seal.
                    If attached to BOTTOM, it stays. 
                    Actually, wax seal breaks. 
                    For animation simplicity: Seal is attached to TOP flap, rotates up and away.
                    
                    The CSS I wrote above puts .wax-seal absolute in .envelope context.
                    "top: 45%; left: 50%"
                    To make it move with flap, it MUST be inside .flap-top or manually animated.
                    Let's put it back inside .flap-top but position it carefully.
                    
                    Issue: .flap-top has clippath. If seal sticks out of clip path, it gets clipped!
                    Clip-path clips children too.
                    Solution: Cannot put seal inside clipped flap if it extends beyond triangle.
                    
                    Alternative strategy:
                    1. Seal is separate div (z-index high).
                    2. When .envelope.open, apply transform to seal to mimic it moving up? Or just fade it out/break it?
                    
                    Let's try: Seal attached to top flap visually but separate DOM? No, hard to sync.
                    
                    REAL STAMP SOLUTION:
                    Sits on top. When clicked, it fades out or "breaks" (split image).
                    Simplest sophisticated: Seal is separate. When clicked, envelope opens, seal fades out immediately or scales up and vanishes.
                */}
                <img src={waxSeal} alt="Sello F&M" className="wax-seal" />

                <div className="open-prompt">Toca el sello para abrir</div>
            </div>

        </div>
    );
};

export default Envelope;
