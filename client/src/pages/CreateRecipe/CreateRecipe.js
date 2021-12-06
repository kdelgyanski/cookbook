import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
// import * as recipeService from '../../services/recipeService';

import { TextField, Counter, Dropdown } from '../../components';
import { Ingredients } from './Ingredients';


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
        case 'ADD_INGREDIENT':
            newRecipe = { ...recipe, ingredients: [...recipe.ingredients, action.payload] }
            break;
        case 'CHANGE_COURSE':
            newRecipe = { ...recipe, course: action.payload }
            break;
        case 'CHANGE_DIFFICULTY':
            newRecipe = { ...recipe, difficulty: action.payload }
            break;
        default:
            newRecipe = { ...recipe };
    };

    return newRecipe;
};

const CreateRecipe = () => {

    const auth = useContext(AuthContext);
    const [recipe, dispatch] = React.useReducer(reducer, { authorId: auth.userId, servingPortions: 1, ingredients: [] });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO: call api
        console.log('api call goes here');
        console.log(recipe);

    };

    const addIngredientHandler = ingredient => {
        console.log('Add ingredient');

        dispatch({ type: 'ADD_INGREDIENT', payload: ingredient });
    }

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
                <Ingredients
                    ingredients={recipe.ingredients}
                    onAddIngredient={ingredient => addIngredientHandler(ingredient)}
                />
                <Dropdown
                    id='course'
                    defaultValue=''
                    label='Course'
                    options={['main', 'soup', 'salad', 'dessert']}
                    onChange={selected => dispatch({ type: 'CHANGE_COURSE', payload: selected })}
                />
                <Dropdown
                    id='difficulty'
                    defaultValue=''
                    label='Difficulty'
                    options={['easy', 'intermediate', 'advanced']}
                    onChange={selected => dispatch({ type: 'CHANGE_DIFFICULTY', payload: selected })}
                />
                <button className='btn btn-primary'>Add</button>
            </form>
        </div>
    );
}

export default CreateRecipe;