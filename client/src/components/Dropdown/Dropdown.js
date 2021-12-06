import React from 'react';

import { TextField } from '../TextField';

const Dropdown = ({
    id,
    className,
    defaultValue,
    options,
    onChange,
    readOnly,
    label
}) => {

    const dropdownRef = React.useRef(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(defaultValue);

    React.useEffect(() => {
        const handleClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            window.addEventListener('click', handleClick);
        }

        return () => window.removeEventListener('click', handleClick);
    }, [isOpen]);

    const toggleDropdown = e => {
        e.preventDefault();
        setIsOpen(open => !open);
    };

    if (readOnly) {
        return (
            <TextField
                id={id}
                className={`dropdown-readonly ${className}`}
                readOnly
            >
                {defaultValue}
            </TextField>
        );
    }

    return (
        <>
            {label && <label
                id={`${id}-label`}
                htmlFor={id}
            >
                {label}
            </label>}
            <div
                id={id}
                className={`dropdown ${className}`}
                ref={dropdownRef}
            >
                <button
                    className='btn btn-primary dropdown-toggle'
                    type='button'
                    id='dropdownMenuButton'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded={isOpen ? 'true' : 'false'}
                    onClick={toggleDropdown}
                >
                    {selected}
                </button>
                <div
                    className={`dropdown-menu ${isOpen ? 'show' : ''}`}
                    aria-labelledby='dropdownMenuButton'
                >
                    {options.map(o =>
                        <span
                            key={o}
                            className='dropdown-item'
                            onClick={(e) => {
                                setSelected(o);
                                onChange(o)
                                setIsOpen(false);
                            }}
                        >
                            {o}
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dropdown;