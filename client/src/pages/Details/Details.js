import React from 'react';
import { useParams } from 'react-router-dom';
import * as recipeService from '../../services/recipeService';
import { Badge } from '../../components';
import Ingredients from '../CreateRecipe/Ingredients';

const Details = () => {

    const [recipe, setRecipe] = React.useState(null);
    const [labels, setLabels] = React.useState([])

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

    return (
        <>
            {recipe && <div className='container app-page'>

                <div className='container recipe-header'>
                    <h2>{recipe.title}</h2>
                    <div className='labels'>
                        {labels.map(l => <Badge key={l} >{l}</Badge>)}
                    </div>
                    <span>Preparation time: {recipe.preparationTime}</span>
                    <span>Time to cook: {recipe.timeToCook}</span>
                </div>

                <div className='container recipe-ingredients'>
                    <h2>{recipe.servingPortions}</h2>
                    <Ingredients>
                        {recipe.ingredients}
                    </Ingredients>
                </div>

                <img src={`http://localhost:8000/${recipe.image}` || 'NOT_SET'} alt='' />

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