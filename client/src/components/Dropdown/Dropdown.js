import React from 'react';

import { TextField } from '../TextField';
import { Badge } from '../Badge';

import './Dropdown.css';

const Dropdown = ({
    id,
    className,
    defaultValue,
    options,
    onChange,
    readOnly,
    label,
    multiselect,
    withBadges
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

    const handleOptionClick = (value) => {

        let newSelection;
        if (multiselect) {
            if (selected.includes(value)) {
                newSelection = selected.filter(item => item !== value);
            } else {
                newSelection = [...selected, value];
            }
        } else {
            newSelection = value;
        }

        setSelected(newSelection);
        onChange(newSelection);
        setIsOpen(false);

    }

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
            {!withBadges && label && <label
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
                    {withBadges
                        ? label
                        : multiselect && selected.length > 1 ? selected.join(', ') : selected}
                </button>
                <div
                    className={`dropdown-menu ${isOpen ? 'show' : ''}`}
                    aria-labelledby='dropdownMenuButton'
                >
                    {options.map(o =>
                        <span
                            key={o}
                            className='dropdown-item'
                            onClick={() => handleOptionClick(o)}
                        >
                            {o}
                        </span>
                    )}
                </div>
                {withBadges && defaultValue.length > 0 && <div className='dropdown-labels'>
                    {multiselect
                        ? defaultValue.map(l =>
                            <Badge
                                className='dropdown-label'
                                key={l}
                                onDelete={() => {
                                    const newSelection = defaultValue.filter(item => item !== l);
                                    setSelected(newSelection);
                                    onChange(newSelection);
                                }}
                            >
                                {l}
                            </Badge>
                        )
                        : <Badge className='dropdown-label'>{defaultValue}</Badge>}
                </div>}
            </div>
        </>
    );
};

export default Dropdown;