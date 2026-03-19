import React from 'react';
import './RadioGroup.css';

const RadioGroup = ({ name, options, value, onChange, required = false }) => {
    const handleChange = (selectedValue) => {
        // Simular evento de radio button
        const syntheticEvent = {
            target: {
                name,
                value: selectedValue,
                type: 'radio'
            }
        };
        onChange(syntheticEvent);
    };

    return (
        <div className="custom-radio-group">
            {options.map((option) => (
                <div
                    key={option.value}
                    className={`custom-radio-option ${value === option.value ? 'selected' : ''}`}
                    onClick={() => handleChange(option.value)}
                    onTouchEnd={(e) => {
                        e.preventDefault();
                        handleChange(option.value);
                    }}
                >
                    <div className="custom-radio-indicator">
                        <div className="custom-radio-dot"></div>
                    </div>
                    <span className="custom-radio-text">{option.label}</span>
                </div>
            ))}
        </div>
    );
};

export default RadioGroup;
