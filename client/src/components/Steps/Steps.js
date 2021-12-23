import React from 'react';

import { BsCheck, BsX, BsPlus } from 'react-icons/bs';

import Step from './Step';
import { TextField } from '../TextField';

import './Steps.css';

const Steps = ({
    children,
    onAddStep,
    onDeleteStep
}) => {

    const [shouldRenderNewStep, setShouldRenderNewStep] = React.useState(false);
    const [newStep, setNewStep] = React.useState(null);

    return (
        <div className='steps-panel'>
            <h2>Steps</h2>
            {((children && children.length) || shouldRenderNewStep) && <div className='list-wrapper'>
                <ol className='list-group list-group-flush steps'>
                    {children && children.length > 0 && children.map((s, i) =>
                        <Step
                            id={i}
                            key={i}
                            value={s}
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
                </ol>
            </div>}
            {onAddStep && !shouldRenderNewStep && <button
                id='add-new-step'
                className='btn btn-primary add-new-step-btn'
                onClick={() => setShouldRenderNewStep(old => !old)}
            >
                <BsPlus /> Add new step
            </button>}
        </div>
    );
};

export default Steps;