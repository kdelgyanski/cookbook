import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import * as recipeService from '../../services/recipeService';

import { TextField, Counter, Dropdown, ImagePicker } from '../../components';
import Ingredients from './Ingredients';
import Steps from './Steps';

import './CreateRecipe.css';

import defaultPreviewImage from '../../assets/images/no_image.svg'

const reducer = (recipe, action) => {
    let newRecipe;

    switch (action.type) {
        case 'CHANGE_TITLE':
            newRecipe = { ...recipe, title: action.payload }
            break;
        case 'CHANGE_IMAGE':
            newRecipe = { ...recipe, image: action.payload }
            break;
        case 'CHANGE_PREPARATION_TIME':
            newRecipe = { ...recipe, preparationTime: action.payload }
            break;
        case 'CHANGE_TIME_TO_COOK':
            newRecipe = { ...recipe, timeToCook: action.payload }
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
        case 'DELETE_INGREDIENT':
            newRecipe = {
                ...recipe,
                ingredients: recipe.ingredients.filter(i => !areIngredientsEqual(i, action.payload))
            }
            break;
        case 'ADD_STEP':
            newRecipe = { ...recipe, steps: [...recipe.steps, action.payload] }
            break;
        case 'DELETE_STEP':
            newRecipe = {
                ...recipe,
                steps: recipe.steps.filter(s => s !== action.payload)
            }
            break;
        case 'CHANGE_COURSE':
            newRecipe = { ...recipe, course: action.payload }
            break;
        case 'CHANGE_DIFFICULTY':
            newRecipe = { ...recipe, difficulty: action.payload }
            break;
        case 'CHANGE_SEASONAL':
            newRecipe = { ...recipe, seasonal: action.payload }
            break;
        case 'CHANGE_CATEGORY':
            newRecipe = { ...recipe, category: action.payload }
            break;
        default:
            newRecipe = { ...recipe };
    };

    return newRecipe;
};

const CreateRecipe = () => {

    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [recipe, dispatch] = React.useReducer(reducer, { authorId: auth.userId, servingPortions: 1, ingredients: [], steps: [] });
    const [isSaveDisabled, setIsSaveDisabled] = React.useState(true);

    React.useEffect(() => {
        setIsSaveDisabled(checkIsSaveDisabled(recipe));
    }, [recipe]);


    const handleSubmit = async (e) => {
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
            <form
                className='create-recipe-form'
                onSubmit={handleSubmit}
            >
                <div className='heading-info'>
                    <div className='left'>
                        <TextField
                            id='title'
                            label='Title'
                            onChange={(value) => dispatch({ type: 'CHANGE_TITLE', payload: value })}
                        />
                        <div className='time-wrapper'>
                            <TextField
                                id='preparationTime'
                                label='Preparation time'
                                placeholder='time in minutes'
                                onChange={value => dispatch({ type: 'CHANGE_PREPARATION_TIME', payload: value })}
                                onlyNumbers
                            />
                            <TextField
                                id='timeToCook'
                                label='Time to cook'
                                placeholder='time in minutes'
                                onChange={value => dispatch({ type: 'CHANGE_TIME_TO_COOK', payload: value })}
                                onlyNumbers
                            />
                        </div>
                        <div className='labels'>
                            <Dropdown
                                id='course'
                                defaultValue=''
                                label='Course'
                                options={['main', 'soup', 'salad', 'dessert']}
                                onChange={selected => dispatch({ type: 'CHANGE_COURSE', payload: selected })}
                                withBadges
                            />
                            <Dropdown
                                id='difficulty'
                                defaultValue=''
                                label='Difficulty'
                                options={['easy', 'intermediate', 'advanced']}
                                onChange={selected => dispatch({ type: 'CHANGE_DIFFICULTY', payload: selected })}
                                withBadges
                            />
                            <Dropdown
                                id='seasonal'
                                defaultValue=''
                                label='Seasonal'
                                options={['spring', 'summer', 'autumn', 'winter']}
                                onChange={selected => dispatch({ type: 'CHANGE_SEASONAL', payload: selected })}
                                multiselect
                                withBadges
                            />
                            <Dropdown
                                id='category'
                                defaultValue=''
                                label='Category'
                                options={[
                                    'pork',
                                    'chicken',
                                    'fish',
                                    'beef',
                                    'vegetarian',
                                    'vegan',
                                    'sweet',
                                    'asian',
                                    'mediterranean'
                                ]}
                                onChange={selected => dispatch({ type: 'CHANGE_CATEGORY', payload: selected })}
                                multiselect
                                withBadges
                            />
                        </div>
                    </div>
                    <div className='right'>
                        <ImagePicker
                            id='recipe-image'
                            className='recipe-image'
                            onImagePicked={value => dispatch({ type: 'CHANGE_IMAGE', payload: value })}
                            defaultPreview={defaultPreviewImage}
                        />
                    </div>
                </div>
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
                    onAddIngredient={ingredient => dispatch({ type: 'ADD_INGREDIENT', payload: ingredient })}
                    onDeleteIngredient={ingredient => dispatch({ type: 'DELETE_INGREDIENT', payload: ingredient })}
                >
                    {recipe.ingredients}
                </Ingredients>
                <Steps
                    onAddStep={step => dispatch({ type: 'ADD_STEP', payload: step })}
                    onDeleteStep={step => dispatch({ type: 'DELETE_STEP', payload: step })}
                >
                    {recipe.steps}
                </Steps>
                <div className='control-buttons'>
                    <button
                        className='btn btn-primary'
                        disabled={isSaveDisabled}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

const checkIsSaveDisabled = (recipe) => {
    return !recipe.title || recipe.title === ''
        || !recipe.preparationTime || recipe.preparationTime === ''
        || !recipe.timeToCook || recipe.timeToCook === ''
        || !recipe.course || recipe.course === ''
        || !recipe.difficulty || recipe.difficulty === ''
        || !recipe.servingPortions
        || !recipe.ingredients || recipe.ingredients.length === 0
        || !recipe.steps || recipe.steps.length === 0

};

const areIngredientsEqual = (original, toCompare) => {
    return original.name === toCompare.name
        && original.quantity === toCompare.quantity
        && original.units === toCompare.units;
};

export default CreateRecipe;