import React from 'react';
import Ingredient from './Ingredient';
import CreateIngredient from './CreateIngredient';

import './Ingredients.css';

const Ingredients = ({
    children,
    onAddIngredient,
    onDeleteIngredient
}) => {

    const [shouldRenderNewIngredient, setShouldRenderNewIngredient] = React.useState(false);

    const handleAddIngredient = value => {
        setShouldRenderNewIngredient(false);
        onAddIngredient(value);
    }

    return (
        <div>
            <h2>Ingredients</h2>
            {((children && children.length) || shouldRenderNewIngredient) && <div className='list-wrapper'>
                <ul className='list-group list-group-flush ingredients'>
                    {children && children.length > 0 && children.map(i =>
                        <Ingredient
                            key={i.name}
                            value={i}
                            onDeleteIngredient={onDeleteIngredient && (value => onDeleteIngredient(value))}
                        />)}
                    {shouldRenderNewIngredient && <CreateIngredient
                        onAddIngredient={value => handleAddIngredient(value)}
                        onCancel={() => setShouldRenderNewIngredient(false)}
                    />}
                </ul>
            </div>}
            {onAddIngredient && !shouldRenderNewIngredient && <button
                id='add-new-ingredient'
                className='btn btn-primary'
                onClick={() => setShouldRenderNewIngredient(old => !old)}
            >
                +
            </button>}
        </div>
    );
};

export default Ingredients;