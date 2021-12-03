import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
// import * as recipeService from '../../services/recipeService';

import { TextField, Counter } from '../../components';


const CreateRecipe = () => {

    const auth = useContext(AuthContext);
    const [recipe, setRecipe] = React.useState({ authorId: auth.userId, servingPortions: 1 });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO: call api
        console.log('api call goes here');
        console.log(recipe);

    };

    return (
        <div className='container app-page'>
            <form onSubmit={handleSubmit}>
                <TextField
                    id='title'
                    label='Title'
                    onChange={(value) => setRecipe(recipe => ({ ...recipe, title: value }))}
                />
                <Counter
                    id='serving-portions'
                    label='Serving Portions'
                    onDecrease={(e) => {
                        e.preventDefault();
                        if (recipe.servingPortions > 1) {
                            setRecipe(recipe => ({ ...recipe, servingPortions: recipe.servingPortions - 1 }));
                        }
                    }}
                    decreaseDisabled={recipe.servingPortions < 2}
                    onIncrease={(e) => {
                        e.preventDefault();
                        setRecipe(recipe => ({ ...recipe, servingPortions: recipe.servingPortions + 1 }));
                    }}
                >
                    {recipe.servingPortions}
                </Counter>
                <button className='btn btn-primary'>Add</button>
            </form>
        </div>
    );
}

export default CreateRecipe;