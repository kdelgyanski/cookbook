import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as recipeService from '../../services/recipeService';

import AuthContext from '../../context/AuthContext';

import { Badge, ErrorModal } from '../../components';
import Ingredients from '../CreateRecipe/Ingredients';

import './Details.css';

import defaultImage from '../../assets/images/no_image.svg';

const Details = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [recipe, setRecipe] = React.useState(null);
    const [labels, setLabels] = React.useState([]);
    const [error, setError] = React.useState(null);

    const recipeId = useParams().id;

    React.useEffect(() => {
        const getRecipe = async () => {

            try {
                const response = await recipeService.getById(recipeId);
                setRecipe(response);
                setLabels([response.type, ...response.category, response.difficulty, ...response.seasonal]);
            } catch (err) {
                console.log(err);
            }

        };

        getRecipe();
    }, [recipeId]);

    const handleDelete = async () => {

        try {
            await recipeService.deleteRecipe(recipeId, auth.token);
            navigate(`/${auth.userId}/my-kitchen`);
        } catch (err) {
            setError(err.message);
        }

    };

    return (
        <>
            {error && <ErrorModal message={error} onClose={() => setError(null)} />}
            {recipe && <div className='container details'>

                <div className='container recipe-header'>
                    <div className='infos-container'>
                        <h2>{recipe.title}</h2>
                        <div className='labels'>
                            {labels.map(l => <Badge key={l} >{l}</Badge>)}
                        </div>
                        <span>Preparation time: {recipe.preparationTime}</span>
                        <span>Time to cook: {recipe.timeToCook}</span>
                    </div>
                    <div className='image-container'>
                        <img
                            className='img-fluid preview-img'
                            src={recipe.image ? `http://localhost:8000/${recipe.image}` : defaultImage}
                            alt='Default'
                        />
                    </div>
                </div>

                <div className='container recipe-ingredients'>
                    <h2>Serving portions: {recipe.servingPortions}</h2>
                    <Ingredients>
                        {recipe.ingredients}
                    </Ingredients>
                </div>

                <div className='container steps'>

                    <div className="accordion">
                        {recipe.steps.map((step, i) =>
                            <Step
                                key={i}
                                number={i}
                                description={step}
                            />
                        )}
                    </div>
                </div>

                {auth.userId === recipe.authorId && <button
                    type='button'
                    className='btn btn-primary delete-recipe-btn'
                    onClick={handleDelete}
                >
                    Delete
                </button>}

            </div>}
        </>
    );
}

const Step = ({
    id,
    number,
    description
}) => {
    return (
        <div className='accordion-item' id={id}>
            <h2 className='accordion-header' id={`step-title-${id}`}>
                <button
                    className='accordion-button'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target={`#step-description-${id}`}
                    aria-expanded='true'
                    aria-controls={`step-description-${id}`}
                >
                    Step #{number}
                </button>
            </h2>
            <div
                id={`step-description-${id}`}
                className='accordion-collapse collapse show'
                aria-labelledby={`step-title-${id}`}
            >
                <div className='accordion-body'>
                    {description}
                </div>
            </div>
        </div>
    );
};


export default Details;