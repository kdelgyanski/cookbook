import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as recipeService from '../../services/recipeService';
import { Card, ErrorModal, Panel } from '../../components';
import AuthContext from '../../context/AuthContext';

const MyKitchen = () => {

    const auth = useContext(AuthContext);

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
            <h2>{auth.username}'s kitchen</h2>
            <button type='button' className='btn btn-primary' onClick={handleAddRecipeClick}>Add Recipe</button>
            {error && <ErrorModal message={error} onClose={() => setError(null)} />}
            {recipes.length === 0 && <h2>No recipes created yet!</h2>}
            {recipes.length > 0 && <Panel
                className='my-recipes-panel'
                title='My Recipes'
            >
                {recipes.map(r =>
                    <Card
                        id={r.id}
                        key={r.title}
                        title={r.title}
                        imgUrl={r.image ? `http://localhost:8000/${r.image}` : null}
                    />)}
            </Panel>}
        </div>
    );
}

export default MyKitchen;