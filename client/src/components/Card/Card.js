import './Card.css';

const Card = ({
    title,
    imgUrl,
    className
}) => {
    return (
        <div className={`card ${className} app-card`}>
            <img className='card-img-top card-image' src={`./images/${imgUrl}`} alt={title} />
            <div className='card-body'>
                <h5 className='card-title'>{title}</h5>
            </div>
        </div>
    );
};

export default Card;