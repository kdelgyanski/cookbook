import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import * as recipeService from '../../services/recipeService';
import AuthContext from '../../context/AuthContext';

import RecipeForm from '../CreateRecipe/RecipeForm';

const EditRecipe = () => {

    //const auth = useContext(AuthContext);

    const [recipe, setRecipe] = React.useState(null);

    const recipeId = useParams().id;

    React.useEffect(() => {
        const getRecipe = async () => {

            try {
                const response = await recipeService.getById(recipeId);
                setRecipe(response);
            } catch (err) {
                console.log(err);
            }

        };

        getRecipe();
    }, [recipeId]);

    const handleSubmit = async (e, recipe) => {
        e.preventDefault();

        // TODO
        console.log('EDIT')
        console.log(recipe);

    };

    return (
        <div className='container app-page'>
            {recipe && <RecipeForm
                initialRecipe={recipe}
                onSave={handleSubmit}
            />}
        </div>
    );
};


export default EditRecipe;