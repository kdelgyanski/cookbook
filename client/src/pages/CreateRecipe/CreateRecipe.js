import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
// import * as recipeService from '../../services/recipeService';

import { TextField, Counter } from '../../components';


const reducer = (recipe, action) => {
    let newRecipe;

    switch (action.type) {
        case 'CHANGE_TITLE':
            newRecipe = { ...recipe, title: action.payload }
            break;
        case 'INCREASE_SERVING_PORTIONS':
            newRecipe = { ...recipe, servingPortions: recipe.servingPortions + 1 }
            break;
        case 'DECREASE_SERVING_PORTIONS':
            newRecipe = { ...recipe, servingPortions: recipe.servingPortions - 1 }
            break;
        default:
            newRecipe = { ...recipe };
    };

    return newRecipe;
};

const CreateRecipe = () => {

    const auth = useContext(AuthContext);
    const [recipe, dispatch] = React.useReducer(reducer, { authorId: auth.userId, servingPortions: 1 });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO: call api
        console.log('api call goes here');
        console.log(recipe);

    };

    return (
        <div className='container app-page'>
            <form onSubmit={handleSubmit}>
                <TextField
                    id='title'
                    label='Title'
                    onChange={(value) => dispatch({ type: 'CHANGE_TITLE', payload: value })}
                />
                <Counter
                    id='serving-portions'
                    label='Serving Portions'
                    onDecrease={(e) => {
                        e.preventDefault();
                        if (recipe.servingPortions > 1) {
                            dispatch({ type: 'DECREASE_SERVING_PORTIONS' });
                        }
                    }}
                    decreaseDisabled={recipe.servingPortions < 2}
                    onIncrease={(e) => {
                        e.preventDefault();
                        dispatch({ type: 'INCREASE_SERVING_PORTIONS' });
                    }}
                >
                    {recipe.servingPortions}
                </Counter>
                <button className='btn btn-primary'>Add</button>
            </form>
        </div>
    );
}

export default CreateRecipe;