import { useState, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { Card, TextField, Panel } from '../../components';
import Page from '../Page';
import * as recipeService from '../../services/recipeService';

import './Home.css';

import logo from '../../assets/images/mish_mash_2.png';

const Home = () => {

    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [seasonalTop, setSeasonalTop] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchAllRecipes = async () => {
            try {
                const response = await recipeService.getAll();
                setRecipes(response);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchAllRecipes();

    }, []);

    useEffect(() => {

        const fetchSeasonalRecipes = async () => {
            try {
                const response = await recipeService.getAllSeasonal([getActualSeason()]);
                setSeasonalTop(response);
            } catch (err) {
                setError(err.message);
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
        <Page
            className='home-page'
            error={error}
            onErrorClose={() => setError(null)}
        >
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
                className='weekly-top-recipes-panel'
                maxVisibleItems={3}
                title='Pick of the week'
            >
                {filterOnlyLastWeekRecipes(recipes)
                    .sort((a, b) => {
                        if (a.likedBy && b.likedBy) {
                            return b.likedBy.length - a.likedBy.length;
                        } else if (a.likedBy) {
                            return -1;
                        } else {
                            return 1;
                        }
                    })
                    .map(r =>
                        <Card
                            id={r.id}
                            key={r.id}
                            title={r.title}
                            imgUrl={r.image ? `http://localhost:8000/${r.image}` : null}
                        />
                    )}
            </Panel>

            <Panel
                className='seasonal-top-panel'
                maxVisibleItems={3}
                title='Seasonal'
                viewMoreUrl={`/search?seasonal=${getActualSeason()}`}
            >
                {seasonalTop.map(recipe =>
                    <Card
                        id={recipe.id}
                        key={recipe.id}
                        title={recipe.title}
                        imgUrl={recipe.image ? `http://localhost:8000/${recipe.image}` : null}
                    />
                )}
            </Panel>
        </Page>
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

const getDateBeforeOneWeek = () => {
    const date = new Date();
    return date.setDate(date.getDate() - 7);
};

const filterOnlyLastWeekRecipes = recipes => {
    return recipes.filter(r => {
        const creationDate = new Date(r.createdAt).getTime();

        return creationDate > getDateBeforeOneWeek();
    });
}

export default Home;