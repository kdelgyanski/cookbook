import React from 'react';
import { BsTrash } from 'react-icons/bs';

import './Ingredient.css';

import listIcon from '../../../assets/images/ingredient.svg';

const Ingredient = ({
    value,
    onDeleteIngredient
}) => {

    return (
        <li className='list-group-item ingredient'>
            <img className='list-icon' src={listIcon} alt='bullet point for ingredient list item' />
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