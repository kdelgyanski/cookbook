const TextField = ({
    id,
    className,
    onChange,
    children,
    placeholder,
    label,
    type
}) => {
    return (
        <>
            {label && <label
                id={`${id}-label`}
                htmlFor={id}
            >
                {label}
            </label>}
            <input
                id={id}
                className={`form-control ${className}`}
                name={`${id}-name`}
                type={type ? type : 'text'}
                placeholder={placeholder}
                value={children}
                onChange={e => onChange(e.target.value)}
            />
        </>
    );
};

export default TextField;