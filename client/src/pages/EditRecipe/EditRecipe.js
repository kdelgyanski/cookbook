import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import * as recipeService from '../../services/recipeService';
import AuthContext from '../../context/AuthContext';
import Page from '../Page';
import { RecipeForm } from '../../components';

const EditRecipe = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);

    const recipeId = useParams().id;

    useEffect(() => {
        const getRecipe = async () => {

            try {
                const response = await recipeService.getById(recipeId);
                setRecipe(response);
            } catch (err) {
                setError(err.message);
            }

        };

        getRecipe();
    }, []);

    const handleSubmit = async (e, recipe) => {
        e.preventDefault();

        try {
            await recipeService.updateRecipe(recipe, auth.token);
            navigate(navigate(`/details/${recipe.id}`));
        } catch (err) {
            setError(err.message);
        }

    };

    return (
        <Page
            className='edit-recipe-page'
            error={error}
            onErrorClose={() => setError(null)}
        >
            {recipe && <RecipeForm
                initialRecipe={recipe}
                onSave={handleSubmit}
            />}
        </Page>
    );
};


export default EditRecipe;