import React from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { Card, TextField, Panel } from '../../components';
import * as recipeService from '../../services/recipeService';

import './Home.css';

import logo from '../../assets/images/mish_mash_2.png';

const Home = () => {

    const navigate = useNavigate();

    const [recipes, setRecipes] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
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
                const response = await recipeService.getAllSeasonal([getActualSeason()]);
                setSeasonalTop(response);
            } catch (err) {
                console.log(err);
            }
        }

        fetchSeasonalRecipes();

    }, []);

    const handleSearch = () => {
        let searchParams;
        if (searchValue) {
            searchParams = '?' + createSearchParams(`title=${searchValue}`)
        }
        navigate(`/search${searchParams ? searchParams : ''}`);
    };

    return (
        <div className='app-page'>

            <div className='container jumbotron-container' >
                <img className='img-fluid img-big-logo' src={logo} alt='Big Logo' />
                <TextField
                    id='search-input'
                    className='search-bar'
                    onChange={setSearchValue}
                    placeholder='Search for a recipe...'
                    onEnterKeyPress={handleSearch}
                >
                    {searchValue}
                </TextField>
            </div>

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
                        imgUrl={mainDish.image ? `http://localhost:8000/${mainDish.image}` : null}
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
                        imgUrl={recipe.image ? `http://localhost:8000/${recipe.image}` : null}
                    />
                )}
            </Panel>
        </div>
    );
};

const getActualSeason = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();

    let season = '';

    if (month < 2) {
        season = 'winter';
    } else if (month === 2) {
        season = day < 21 ? 'winter' : 'spring';
    } else if (month < 5) {
        season = 'spring';
    } else if (month === 5) {
        season = day < 21 ? 'spring' : 'sommer';
    } else if (month < 8) {
        season = 'sommer';
    } else if (month === 8) {
        season = day < 21 ? 'sommer' : 'autumn';
    } else if (month < 11) {
        season = 'autumn';
    } else {
        season = day < 21 ? 'autumn' : 'winter';
    }

    return season;
};

export default Home;