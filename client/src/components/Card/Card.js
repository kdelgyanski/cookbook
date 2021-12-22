import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = ({
    id,
    className,
    title,
    imgUrl
}) => {

    const navigate = useNavigate();

    return (
        <div
            className={`card ${className} app-card`}
            onClick={() => navigate(`/details/${id}`)}>
            <img className='img-fluid card-img-top card-image' src={imgUrl} alt={title} />
            <div className='card-body'>
                <h5 className='card-title'>{title}</h5>
            </div>
        </div>
    );
};

export default Card;