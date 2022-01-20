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
    const [favourites, setFavourites] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllRecipes();
    }, []);

    const fetchAllRecipes = async () => {

        try {
            const response = await recipeService.getAll();
            setFavourites(response.filter(r => r.likedBy.includes(userId)));
            setRecipes(response.filter(r => r.authorId === userId));
        } catch (err) {
            setError(err.message);
        }
    };

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
                {recipes.map(r => <Card
                    key={r.id}
                    onLike={() => fetchAllRecipes()}
                    liked={r.likedBy && r.likedBy.includes(userId)}
                >
                    {r}
                </Card>)}
            </Panel>}

            {favourites.length > 0 && <Panel
                className='my-favourites-panel'
                title='My Favourites'
            >
                {favourites.map(r => <Card
                    key={r.id}
                    onLike={() => fetchAllRecipes()}
                    liked={r.likedBy && r.likedBy.includes(userId)}
                >
                    {r}
                </Card>)}
            </Panel>}
        </Page>
    );
};

export default MyKitchen;