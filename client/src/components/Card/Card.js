import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import * as recipeService from '../../services/recipeService';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import './Card.css';

const Card = ({
    className,
    children,
    onLike,
    liked
}) => {

    const navigate = useNavigate();

    const auth = useContext(AuthContext);

    const [recipe, setRecipe] = useState(children);
    const [error, setError] = useState(null);
    const [isLiked, setIsLiked] = useState(liked);

    useEffect(() => {
        setIsLiked(liked);
    }, [liked]);

    const imgUrl = recipe.image ? `http://localhost:8000/${recipe.image}` : null;

    const handleLike = async () => {

        if (recipe.likedBy && recipe.likedBy.includes(auth.userId)) {
            recipe.likedBy = recipe.likedBy.filter(u => u !== auth.userId);
            setIsLiked(false);
        } else {
            recipe.likedBy.push(auth.userId);
            setIsLiked(true);
        }

        try {
            const response = await recipeService.updateRecipe(recipe, auth.token);
            setRecipe(response);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div
            className={`card ${className} app-card`}
            onClick={() => navigate(`/details/${recipe.id}`)}
        >
            <img className='img-fluid card-img-top card-image' src={imgUrl} alt={recipe.title} />
            <div className='card-body'>
                <h5 className='card-title'>{recipe.title}</h5>
            </div>
            {auth.isLoggedIn && <div className='card-footer'>
                <button
                    type='button'
                    className='btn btn-primary like-recipe-btn'
                    onClick={e => {
                        e.stopPropagation();
                        handleLike().then(() => onLike && onLike());
                    }}
                >
                    {isLiked ? <BsHeartFill /> : <BsHeart />}
                </button>
            </div>}
        </div>
    );
};

export default Card;