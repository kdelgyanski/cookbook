import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as recipeService from '../../services/recipeService';
import { Card, ErrorModal, Panel } from '../../components';

const MyKitchen = () => {

    const userId = useParams().userId;
    const navigate = useNavigate();

    const [recipes, setRecipes] = React.useState([]);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchRecipies = async () => {

            try {
                const recipes = await recipeService.getByAuthorId(userId);
                setRecipes(recipes);
            } catch (err) {
                if (err.statusCode === 404) {
                    setRecipes([]);
                } else {
                    setError(err.message);
                }
            }
        }

        fetchRecipies();

    }, [userId]);

    const handleAddRecipeClick = () => {
        navigate('/create-recipe');
    }

    return (
        <div className='container app-page'>
            This is the MyKitchen Page
            <button type='button' className='btn btn-primary' onClick={handleAddRecipeClick}>Add Recipe</button>
            {error && <ErrorModal message={error} onClose={() => { }} />}
            {recipes.length === 0 && <h2>No recipes created yet!</h2>}
            {recipes.length > 0 && <Panel
                className='my-recipes-panel'
                maxVisibleItems={3}
                title='My Recipes'
            >
                {recipes.map(r =>
                    <Card
                        id={r.id}
                        key={r.title}
                        title={r.title}
                    />)}
            </Panel>}
        </div>
    );
}

export default MyKitchen;