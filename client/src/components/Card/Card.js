import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import * as recipeService from '../../services/recipeService';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import './Card.css';

const Card = ({
    id,
    className,
    children
}) => {

    const navigate = useNavigate();

    const auth = useContext(AuthContext);

    const [recipe, setRecipe] = useState(children);
    const [error, setError] = useState(null);

    const isLiked = recipe.likedBy && recipe.likedBy.includes(auth.userId);
    const imgUrl = recipe.image ? `http://localhost:8000/${recipe.image}` : null;

    const handleLike = async () => {

        if (recipe.likedBy && recipe.likedBy.includes(auth.userId)) {
            recipe.likedBy = recipe.likedBy.filter(u => u !== auth.userId);
        } else {
            recipe.likedBy.push(auth.userId);
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
                        handleLike();
                    }}
                >
                    {isLiked ? <BsHeartFill /> : <BsHeart />}
                </button>
            </div>}
        </div>
    );
};

export default Card;