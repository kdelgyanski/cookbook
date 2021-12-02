import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
// import * as recipeService from '../../services/recipeService';

import { TextField } from '../../components';


const CreateRecipe = () => {

    const auth = useContext(AuthContext);

    const [recipe, setRecipe] = React.useState({ authorId: auth.userId });

    const handleSubmit = e => {
        e.preventDefault();

        prepareData(e.currentTarget);

        const fetchCreateRecipe = async () => {
            // TODO: call api
            console.log('api call goes here');
            console.log(recipe);
        };

        fetchCreateRecipe();
    };

    const prepareData = (form) => {
        const formData = new FormData(form);

        setRecipe(oldState => ({
            ...oldState,
            title: formData.get('title-name')
        }));
    };

    return (
        <div className='container app-page'>
            <form onSubmit={handleSubmit}>
                <TextField
                    id='title'
                    label='Title'
                />
                <button className='btn btn-primary'>Add</button>
            </form>
        </div>
    );
}

export default CreateRecipe;