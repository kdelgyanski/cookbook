import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import * as recipeService from '../../services/recipeService';
import AuthContext from '../../context/AuthContext';

import RecipeForm from '../CreateRecipe/RecipeForm';

import { ErrorModal } from '../../components';

const EditRecipe = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [recipe, setRecipe] = React.useState(null);
    const [error, setError] = React.useState(null);

    const recipeId = useParams().id;

    React.useEffect(() => {
        const getRecipe = async () => {

            try {
                const response = await recipeService.getById(recipeId);
                setRecipe(response);
            } catch (err) {
                setError(err);
            }

        };

        getRecipe();
    }, []);

    const handleSubmit = async (e, recipe) => {
        e.preventDefault();

        console.log(recipe);

        try {
            await recipeService.updateRecipe(recipe, auth.token);
            navigate(navigate(`/details/${recipe.id}`));
        } catch (err) {
            setError(err);
        }

    };

    return (
        <div className='container app-page'>
            {error && <ErrorModal message={error.message} onClose={() => setError(null)} />}
            {recipe && <RecipeForm
                initialRecipe={recipe}
                onSave={handleSubmit}
            />}
        </div>
    );
};


export default EditRecipe;