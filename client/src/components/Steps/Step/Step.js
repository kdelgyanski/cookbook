import React from 'react';

import { BsTrash } from 'react-icons/bs';

import './Step.css';

import listIcon from '../../../assets/images/ingredient.svg';

const Step = ({
    value,
    onDeleteStep
}) => {

    return (
        <li className='list-group-item step'>
            <img className='list-icon' src={listIcon} alt='bullet point for step list item' />
            <span className='step-value'>{value}</span>
            {onDeleteStep && <button
                className='btn btn-primary delete-step-btn'
                onClick={e => {
                    e.preventDefault();
                    onDeleteStep(value);
                }}
            >
                <BsTrash />
            </button>}
        </li>
    );
};

export default Step;