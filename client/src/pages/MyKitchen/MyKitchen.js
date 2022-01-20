import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as recipeService from '../../services/recipeService';
import { Card, Panel } from '../../components';
import Page from '../Page';
import AuthContext from '../../context/AuthContext';

const MyKitchen = () => {

    const auth = useContext(AuthContext);

    const userId = useParams().userId;
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
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

    return (
        <Page
            className='my-kitchen-page'
            error={error}
            onErrorClose={() => setError(null)}
        >
            <h2>{auth.username}'s kitchen</h2>
            <button
                type='button'
                className='btn btn-primary'
                onClick={() => navigate('/create-recipe')}
            >
                Add Recipe
            </button>
            {recipes.length === 0 && <h2>No recipes created yet!</h2>}
            {recipes.length > 0 && <Panel
                className='my-recipes-panel'
                title='My Recipes'
            >
                {recipes.map(r => <Card key={r.title}>{r}</Card>)}
            </Panel>}
        </Page>
    );
};

export default MyKitchen;