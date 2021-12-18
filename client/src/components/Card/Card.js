import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = ({
    id,
    title,
    imgUrl,
    className
}) => {

    const navigate = useNavigate();
    const handleClick = () => navigate(`/details/${id}`);

    return (
        <div
            className={`card ${className} app-card`}
            onClick={() => {
                console.log('clicked on card');
                handleClick();
            }}>
            <img className='img-fluid card-img-top card-image' src={imgUrl} alt={title} />
            <div className='card-body'>
                <h5 className='card-title'>{title}</h5>
            </div>
        </div>
    );
};

export default Card;