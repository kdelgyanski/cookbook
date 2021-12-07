import React from 'react';

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
    onlyNumbers,
    format
}) => {

    const [value, setValue] = React.useState(children || '');

    const handleChange = e => {
        const newValue = e.target.value;

        if (onlyNumbers && !checkContainsOnlyDigits(newValue)) {
            return;
        }

        setValue(newValue)
        onChange(newValue);
    };

    return (
        <>
            {label && <label
                id={`${id}-label`}
                htmlFor={id}
            >
                {label}
            </label>}
            {!isLarge
                ? <input
                    id={id}
                    className={`form-control ${className}`}
                    name={`${id}-name`}
                    type={type ? type : 'text'}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    readOnly={readOnly}
                />
                : <textarea
                    id={id}
                    className={`form-control ${className}`}
                    name={`${id}-name`}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    readOnly={readOnly}
                />
            }
        </>
    );
};

function checkContainsOnlyDigits(str) {
    return /^\d*$/.test(str);
}

export default TextField;