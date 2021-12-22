import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import * as recipeService from '../../services/recipeService';
import { RecipeForm } from '../../components';

import './CreateRecipe.css';

const CreateRecipe = () => {

    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const handleSubmit = async (e, recipe) => {
        e.preventDefault();

        let result;
        try {
            result = await recipeService.create(recipe, auth.token);
        } catch (err) {
            console.log(err);
        }

        if (result) {
            navigate(`/${auth.userId}/my-kitchen`);
        }

    };

    return (
        <div className='container app-page'>
            <RecipeForm
                initialRecipe={{ authorId: auth.userId, servingPortions: 1, ingredients: [], steps: [] }}
                onSave={handleSubmit}
            />
        </div>
    );
};


export default CreateRecipe;