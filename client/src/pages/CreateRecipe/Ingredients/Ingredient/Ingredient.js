import React from 'react';
import { TextField, Dropdown } from '../../../../components';

import './Ingredient.css';

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
                className='ingredient-item'
                placeholder='product name'
            >
                {ingredient.name}
            </TextField>
            <TextField
                id={(value && `ingredient-${value.name}-quantity`) || 'ingredient-quantity-new'}
                readOnly={readOnly}
                onChange={quantity => setIngredient({ ...ingredient, quantity: quantity })}
                className='ingredient-item'
                placeholder='quantity'
                onlyNumbers
            >
                {ingredient.quantity}
            </TextField>
            <Dropdown
                id={(value && `ingredient-${value.name}-units`) || 'ingredient-unit-new'}
                defaultValue={ingredient.units || 'Units'}
                options={['gram', 'kilogram', 'milliliter', 'liter', 'tbsp', 'tsp', 'to taste', 'pieces']}
                onChange={units => setIngredient({ ...ingredient, units: units })}
                className='ingredient-item'
                readOnly={readOnly}
            />
            {!readOnly && <button
                className='btn btn-primary ingredient-item'
                onClick={(e) => {
                    e.preventDefault();
                    onAddIngredient(ingredient);
                }}
                disabled={ingredient.name === '' || ingredient.quantity === '' || ingredient.units === ''}
            >
                Done
            </button>}
        </li>
    );
};

export default Ingredient;