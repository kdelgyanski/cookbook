import { BsXCircle } from 'react-icons/bs'
import './Badge.css';

const Badge = ({
    className,
    children,
    onDelete
}) => {
    return (
        <span className={`badge rounded-pill bg-primary bubble ${className}`}>
            {children}
            {onDelete && <BsXCircle className='delete-btn' onClick={onDelete} />}
        </span>
    );
};

export default Badge;