import React from 'react';

import { TextField, Dropdown } from '../../../../components';

import './CreateIngredient.css';

const CreateIngredient = ({
    value,
    onAddIngredient
}) => {

    const initialState = value
        ? { name: value.name, quantity: value.quantity, units: value.units }
        : { name: '', quantity: '', units: '' };

    const [ingredient, setIngredient] = React.useState(initialState);

    return (
        <li className='list-group-item create-ingredient'>
            <TextField
                id={'create-ingredient-name'}
                onChange={name => setIngredient({ ...ingredient, name: name })}
                className='ingredient-item'
                placeholder='product name'
            >
                {ingredient.name}
            </TextField>
            <TextField
                id={'create-ingredient-quantity'}
                onChange={quantity => setIngredient({ ...ingredient, quantity: quantity })}
                className='ingredient-item'
                placeholder='quantity'
                onlyNumbers
            >
                {ingredient.quantity}
            </TextField>
            <Dropdown
                id={'create-ingredient-unit'}
                defaultValue={ingredient.units || 'Units'}
                options={['gram', 'kilogram', 'milliliter', 'liter', 'tbsp', 'tsp', 'to taste', 'pieces']}
                onChange={units => setIngredient({ ...ingredient, units: units })}
                className='ingredient-item'
            />
            <button
                className='btn btn-primary'
                onClick={(e) => {
                    e.preventDefault();
                    onAddIngredient(ingredient);
                }}
                disabled={ingredient.name === '' || ingredient.quantity === '' || ingredient.units === ''}
            >
                Done
            </button>
        </li>
    );
};

export default CreateIngredient;