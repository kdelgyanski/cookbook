import React from 'react';
import { TextField } from '../../../components';

const Ingredients = ({
    ingredients,
    onAddIngredient
}) => {

    const [shouldRenderNewIngredient, setShouldRenderNewIngredient] = React.useState(false);

    const handleAddIngredient = value => {
        setShouldRenderNewIngredient(false);
        onAddIngredient(value);
    }

    return (
        <div>
            <h2>Ingredients</h2>
            <ul className='ingredients'>
                {ingredients && ingredients.length > 0 && ingredients.map(i => <Ingredient key={i.name} value={i} />)}
                {shouldRenderNewIngredient && <Ingredient onAddIngredient={value => handleAddIngredient(value)} />}
                {!shouldRenderNewIngredient && <button
                    id='add-new-ingredient'
                    className='btn btn-primary'
                    onClick={() => setShouldRenderNewIngredient(old => !old)}
                >
                    +
                </button>}
            </ul>

        </div>
    );
};

const Ingredient = ({
    value,
    onAddIngredient
}) => {

    const initialState = value
        ? { name: value.name, quantity: value.quantity, units: value.units }
        : { name: '', quantity: '', units: '' };

    const [ingredient, setIngredient] = React.useState(initialState);
    const readOnly = !onAddIngredient;

    return (
        <li className='ingredient'>
            <TextField
                id={(value && `ingredient-${value.name}`) || 'ingredient-name-new'}
                readOnly={readOnly}
                onChange={name => setIngredient({ ...ingredient, name: name })}
            >
                {ingredient.name}
            </TextField>
            <TextField
                id={(value && `ingredient-${value.name}-quantity`) || 'ingredient-quantity-new'}
                readOnly={readOnly}
                onChange={quantity => setIngredient({ ...ingredient, quantity: quantity })}
            >
                {ingredient.quantity}
            </TextField>
            <TextField
                id={(value && `ingredient-${value.name}-units`) || 'ingredient-unit-new'}
                readOnly={readOnly}
                onChange={units => setIngredient({ ...ingredient, units: units })}
            >
                {ingredient.units}
            </TextField>
            {!readOnly && <button
                className='btn btn-primary'
                onClick={(e) => {
                    e.preventDefault();
                    onAddIngredient(ingredient);
                }}
            >
                Done
            </button>}
        </li>
    );
}

export default Ingredients;