import React from 'react';

import './TextField.css';

const TextField = ({
    id,
    className,
    onChange,
    children,
    placeholder,
    label,
    type,
    readOnly,
    isLarge,
    onlyNumbers
}) => {

    const handleChange = e => {
        const newValue = e.target.value;

        if (onlyNumbers && !checkContainsOnlyDigits(newValue)) {
            return;
        }

        onChange(newValue);
    };

    return (
        <div className='text-field-wrapper'>
            {label && <label
                id={`${id}-label`}
                htmlFor={id}
            >
                {label}
            </label>}
            {!isLarge
                ? <input
                    id={id}
                    className={`form-control text-field ${className}`}
                    name={`${id}-name`}
                    type={type ? type : 'text'}
                    placeholder={placeholder}
                    value={children || ''}
                    onChange={handleChange}
                    readOnly={readOnly}
                />
                : <textarea
                    id={id}
                    className={`form-control text-field ${className}`}
                    name={`${id}-name`}
                    placeholder={placeholder}
                    value={children || ''}
                    onChange={handleChange}
                    readOnly={readOnly}
                />
            }
        </div>
    );
};

function checkContainsOnlyDigits(str) {
    return /^\d*$/.test(str);
}

export default TextField;