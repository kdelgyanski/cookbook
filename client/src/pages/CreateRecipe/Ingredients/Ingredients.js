import React from 'react';
import Ingredient from './Ingredient';

const Ingredients = ({
    ingredients,
    onAddIngredient
}) => {

    const [shouldRenderNewIngredient, setShouldRenderNewIngredient] = React.useState(false);

    const handleAddIngredient = value => {
        setShouldRenderNewIngredient(false);
        onAddIngredient(value);
    }

    return (
        <div>
            <h2>Ingredients</h2>
            <ul className='ingredients'>
                {ingredients && ingredients.length > 0 && ingredients.map(i => <Ingredient key={i.name} value={i} />)}
                {shouldRenderNewIngredient && <Ingredient onAddIngredient={value => handleAddIngredient(value)} />}
                {!shouldRenderNewIngredient && <button
                    id='add-new-ingredient'
                    className='btn btn-primary'
                    onClick={() => setShouldRenderNewIngredient(old => !old)}
                >
                    +
                </button>}
            </ul>

        </div>
    );
};

export default Ingredients;