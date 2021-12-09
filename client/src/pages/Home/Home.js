import React from 'react';
import { Card, TextField, Panel } from '../../components';
import * as recipeService from '../../services/recipeService';

const Home = () => {

    const [recipes, setRecipes] = React.useState([]);
    const [seasonalTop, setSeasonalTop] = React.useState([]);

    React.useEffect(() => {

        const fetchAllRecipes = async () => {
            try {
                const response = await recipeService.getAll();
                setRecipes(response);
            } catch (err) {
                console.log(err);
            }
        }

        fetchAllRecipes();

    }, []);

    React.useEffect(() => {

        const fetchSeasonalRecipes = async () => {
            try {
                const response = await recipeService.getAllSeasonal(['autumn']);
                setSeasonalTop(response);
            } catch (err) {
                console.log(err);
            }
        }

        fetchSeasonalRecipes();

    }, []);

    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div className='container app-page'>
            This is the Home Page
            <TextField
                id='search-input'
                onChange={setSearchValue}
                placeholder='Search for a recipe...'
            >
                {searchValue}
            </TextField>

            <Panel
                className='weekly-top-main-dishes-panel'
                maxVisibleItems={3}
                title='Pick of the week'
            >
                {recipes.map(mainDish =>

                    <Card
                        id={mainDish.id}
                        key={mainDish.title}
                        title={mainDish.title}
                        imgUrl={mainDish.imgUrl}
                    />
                )}
            </Panel>

            <Panel
                className='seasonal-top-panel'
                maxVisibleItems={3}
                title='Seasonal'
            >
                {seasonalTop.map(recipe =>
                    <Card
                        id={recipe.id}
                        key={recipe.title}
                        title={recipe.title}
                        imgUrl={recipe.imgUrl}
                    />
                )}
            </Panel>
        </div>
    );
}

export default Home;