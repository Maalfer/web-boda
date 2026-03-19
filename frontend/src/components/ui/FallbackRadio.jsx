import React, { useState, useEffect } from 'react';
import './FallbackRadio.css';

const FallbackRadio = ({ name, options, value, onChange, required = false }) => {
    const [selectedValue, setSelectedValue] = useState(value || '');
    const [useNative, setUseNative] = useState(false);

    useEffect(() => {
        // Detectar si necesitamos usar radio buttons nativos (fallback)
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        const isMobile = isIOS || isAndroid;
        
        // Usar nativos en móviles viejos o si hay problemas
        setUseNative(isMobile && window.innerWidth < 768);
    }, []);

    const handleChange = (newValue) => {
        setSelectedValue(newValue);
        
        // Simular evento de input
        const syntheticEvent = {
            target: {
                name,
                value: newValue,
                type: 'radio'
            }
        };
        onChange(syntheticEvent);
    };

    if (useNative) {
        // Fallback a radio buttons nativos
        return (
            <div className="native-radio-group">
                {options.map((option) => (
                    <label key={option.value} className="native-radio-label">
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={selectedValue === option.value}
                            onChange={(e) => handleChange(e.target.value)}
                            required={required}
                            className="native-radio-input"
                        />
                        <span className="native-radio-text">{option.label}</span>
                    </label>
                ))}
            </div>
        );
    }

    // Checkbox personalizado (más confiable en móviles)
    return (
        <div className="checkbox-radio-group">
            {options.map((option) => (
                <label key={option.value} className="checkbox-radio-label">
                    <input
                        type="checkbox"
                        checked={selectedValue === option.value}
                        onChange={() => handleChange(option.value)}
                        className="checkbox-radio-input"
                    />
                    <span className="checkbox-radio-custom"></span>
                    <span className="checkbox-radio-text">{option.label}</span>
                </label>
            ))}
        </div>
    );
};

export default FallbackRadio;
