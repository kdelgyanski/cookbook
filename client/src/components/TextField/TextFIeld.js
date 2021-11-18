const TextField = ({
    id,
    className,
    onChange,
    children,
    placeholder
}) => {
    return (
        <input
            id={id}
            className={`form-control ${className}`}
            name={`${id}-name`}
            type='text'
            placeholder={placeholder}
            value={children}
            onChange={onChange}
        />
    );
};

export default TextField;