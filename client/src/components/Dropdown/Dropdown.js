import React from 'react';

import { TextField } from '../TextField';
import { Badge } from '../Badge';

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
                            onClick={() => {

                                let newSelection;
                                if (multiselect) {
                                    if (selected.includes(o)) {
                                        newSelection = selected.filter(item => item !== o);
                                    } else {
                                        newSelection = [...selected, o];
                                    }
                                } else {
                                    newSelection = o;
                                }

                                setSelected(newSelection);
                                onChange(newSelection);
                                setIsOpen(false);
                            }}
                        >
                            {o}
                        </span>
                    )}
                </div>
                {withBadges && selected.length > 0 && <div className='dropdown-labels'>
                    {multiselect
                        ? selected.map(l => <Badge key={l}>{l}</Badge>)
                        : <Badge>{selected}</Badge>}
                </div>}
            </div>
        </>
    );
};

export default Dropdown;