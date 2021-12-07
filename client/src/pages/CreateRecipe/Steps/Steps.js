import React from 'react';
import { TextField } from '../../../components';

import './Steps.css';

const Steps = ({
    steps,
    onAddStep
}) => {

    const [shouldRenderNewStep, setShouldRenderNewStep] = React.useState(false);
    const [step, setStep] = React.useState('');

    return (
        <div>
            <h2>Steps</h2>
            <ul className='steps'>
                {steps && steps.length > 0 && steps.map((s, i) => <li className='step' key={i}>{s}</li>)}
                {shouldRenderNewStep && <li className='step'>
                    <TextField
                        id={'step-new'}
                        onChange={value => setStep(value)}
                        placeholder='describe the next step'
                        isLarge
                    >
                        {step}
                    </TextField>
                    <button
                        className='btn btn-primary step-item'
                        onClick={(e) => {
                            e.preventDefault();
                            onAddStep(step);
                            setShouldRenderNewStep(false);
                            setStep('');
                        }}
                        disabled={!step || step === ''}
                    >
                        Done
                    </button>
                </li>}
                {!shouldRenderNewStep && <button
                    id='add-new-step'
                    className='btn btn-primary'
                    onClick={() => setShouldRenderNewStep(old => !old)}
                >
                    +
                </button>}
            </ul>
        </div>
    );
};

export default Steps;