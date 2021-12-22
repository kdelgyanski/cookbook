import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import * as recipeService from '../../services/recipeService';
import { RecipeForm } from '../../components';
import Page from '../Page';

import './CreateRecipe.css';

const CreateRecipe = () => {

    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [error, setError] = useState(null);

    const handleSubmit = async (e, recipe) => {
        e.preventDefault();

        try {
            await recipeService.create(recipe, auth.token);
            navigate(`/${auth.userId}/my-kitchen`);
        } catch (err) {
            setError(err.message);
        }

    };

    return (
        <Page
            className='create-recipe-page'
            error={error}
            onErrorClose={() => setError(null)}
        >
            <RecipeForm
                initialRecipe={{ authorId: auth.userId, servingPortions: 1, ingredients: [], steps: [] }}
                onSave={handleSubmit}
            />
        </Page>
    );
};


export default CreateRecipe;