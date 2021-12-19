import React from 'react';

import { BsCheck, BsX } from 'react-icons/bs';

import Step from './Step';
import { TextField } from '../../../components';

const Steps = ({
    children,
    onAddStep,
    onDeleteStep
}) => {

    const [shouldRenderNewStep, setShouldRenderNewStep] = React.useState(false);
    const [newStep, setNewStep] = React.useState(null);

    return (
        <div>
            <h2>Steps</h2>
            {((children && children.length) || shouldRenderNewStep) && <div className='list-wrapper'>
                <ul className='list-group list-group-flush steps'>
                    {children && children.length > 0 && children.map(i =>
                        <Step
                            key={i.name}
                            value={i}
                            onDeleteStep={onDeleteStep && (value => onDeleteStep(value))}
                        />)}
                    {shouldRenderNewStep && <li className='step'>
                        <TextField
                            id='step-new'
                            className='step-new'
                            onChange={value => setNewStep(value)}
                            placeholder='describe the next step'
                            isLarge
                        >
                            {newStep}
                        </TextField>
                        <div className='control-buttons'>
                            <button
                                type='button'
                                className='btn btn-primary done'
                                onClick={() => {
                                    onAddStep(newStep);
                                    setShouldRenderNewStep(false);
                                    setNewStep('');
                                }}
                                disabled={!newStep || newStep === ''}
                            >
                                <BsCheck />
                            </button>
                            <button
                                type='button'
                                className='btn btn-primary cancel'
                                onClick={() => setShouldRenderNewStep(false)}
                            >
                                <BsX />
                            </button>
                        </div>
                    </li>}
                </ul>
            </div>}
            {onAddStep && !shouldRenderNewStep && <button
                id='add-new-step'
                className='btn btn-primary'
                onClick={() => setShouldRenderNewStep(old => !old)}
            >
                +
            </button>}
        </div>
    );
};

export default Steps;