import React from 'react';
import { BsTrash } from 'react-icons/bs';

import './Ingredient.css';

const Ingredient = ({
    value,
    onDeleteIngredient
}) => {

    return (
        <li className='list-group-item ingredient'>
            {value.name} {value.quantity} {value.units}
            {onDeleteIngredient && <button
                className='btn btn-primary delete-ingredient-btn'
                onClick={e => {
                    e.preventDefault();
                    onDeleteIngredient(value);
                }}
            >
                <BsTrash />
            </button>}
        </li>
    );
};

export default Ingredient;