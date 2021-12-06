import React from 'react';

const Dropdown = ({
    id,
    defaultValue,
    options,
    onChange
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

    return (
        <div
            id={id}
            className='dropdown'
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
    );
};

export default Dropdown;