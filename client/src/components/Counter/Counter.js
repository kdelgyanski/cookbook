import './Counter.css';

const Counter = ({
    id,
    children,
    label,
    onDecrease,
    onIncrease,
    decreaseDisabled,
    increaseDisabled
}) => {

    return (
        <div id={`${id}-wrapper`} className='counter-wrapper'>
            <div className='counter-heading'>
                <label
                    id={`${id}-label`}
                    htmlFor={id}
                >
                    {label}
                </label>
            </div>
            <div className='counter-content'>
                <button
                    className='btn btn-primary btn-decrease'
                    onClick={onDecrease}
                    disabled={decreaseDisabled}
                >
                    {'<'}
                </button>
                <input
                    id={id}
                    name={`${id}-name`}
                    className='counter-value'
                    type='text'
                    readOnly
                    value={children}
                />
                <button
                    className='btn btn-primary btn-increase'
                    onClick={onIncrease}
                    disabled={increaseDisabled}
                >
                    {'>'}
                </button>
            </div>
        </div>
    );
};

export default Counter;