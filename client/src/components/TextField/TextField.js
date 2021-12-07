const TextField = ({
    id,
    className,
    onChange,
    children,
    placeholder,
    label,
    type,
    readOnly,
    isLarge
}) => {
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
                    value={children}
                    onChange={onChange && ((e) => onChange(e.target.value))}
                    readOnly={readOnly}
                />
                : <textarea
                    id={id}
                    className={`form-control ${className}`}
                    name={`${id}-name`}
                    placeholder={placeholder}
                    value={children}
                    onChange={onChange && ((e) => onChange(e.target.value))}
                    readOnly={readOnly}
                />
            }
        </>
    );
};

export default TextField;