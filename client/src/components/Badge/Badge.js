import './Badge.css';

const Badge = ({
    children
}) => {
    return (
        <span className='badge rounded-pill bg-primary bubble'>{children}</span>
    );
};

export default Badge;