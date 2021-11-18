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
            className={className}
            name={`${id}-name`}
            type='text'
            placeholder={placeholder}
            value={children}
            onChange={onChange}
        />
    );
};

export default TextField;