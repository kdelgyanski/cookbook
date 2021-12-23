import React from 'react';

import { BsTrash } from 'react-icons/bs';

import './Step.css';

const Step = ({
    id,
    value,
    onDeleteStep
}) => {

    return (
        <li className='list-group-item step'>
            <span className='step-value'>{(id + 1) + '. ' + value}</span>
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