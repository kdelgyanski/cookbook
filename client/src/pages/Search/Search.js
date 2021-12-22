import { useState, useEffect } from 'react';

import { useQueryParams } from '../../hooks';
import Page from '../Page';
import { Panel, Card, TextField, Dropdown } from '../../components';
import * as recipeService from '../../services/recipeService';

import './Search.css';

const Search = () => {

    const [queryParams, setQueryParams] = useQueryParams();
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);

    const titleValue = getQueryParamValue(queryParams, 'title');
    const courseValue = getQueryParamValue(queryParams, 'course');
    const difficultyValue = getQueryParamValue(queryParams, 'difficulty');
    const seasonalValue = getQueryParamValue(queryParams, 'seasonal') !== '' ? getQueryParamValue(queryParams, 'seasonal').join(',') : '';
    const categoryValue = getQueryParamValue(queryParams, 'category') !== '' ? getQueryParamValue(queryParams, 'category').join(',') : '';

    useEffect(() => {

        const query = createQuery(queryParams);

        const fetchAllRecipes = async () => {
            try {
                const response = await recipeService.getAll(query);
                setRecipes(response);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchAllRecipes();

    }, [titleValue, courseValue, difficultyValue, seasonalValue, categoryValue]);

    const handleFilterChange = (filterKey, value) => {
        let newQueryParams = [...queryParams];
        newQueryParams = updateQueryParam(newQueryParams, filterKey, value);

        setQueryParams(createQuery(newQueryParams));
    };

    return (
        <Page
            className='search-page'
            error={error}
            onErrorClose={() => setError(null)}
        >
            <div className='search-panel'>
                <div className='search-bar'>
                    <TextField
                        id='search-input'
                        className='search-bar'
                        onChange={value => handleFilterChange('title', value)}
                        placeholder='Search for a recipe...'
                    >
                        {getQueryParamValue(queryParams, 'title')}
                    </TextField>
                </div>
                <div className='labels'>
                    <Dropdown
                        id='course'
                        className='label-item'
                        defaultValue={getQueryParamValue(queryParams, 'course')}
                        label='Course'
                        options={['main', 'soup', 'salad', 'dessert']}
                        onChange={value => handleFilterChange('course', value)}
                        withBadges
                    />
                    <Dropdown
                        id='difficulty'
                        className='label-item'
                        defaultValue={getQueryParamValue(queryParams, 'difficulty')}
                        label='Difficulty'
                        options={['easy', 'intermediate', 'advanced']}
                        onChange={value => handleFilterChange('difficulty', value)}
                        withBadges
                    />
                    <Dropdown
                        id='seasonal'
                        className='label-item'
                        defaultValue={getQueryParamValue(queryParams, 'seasonal')}
                        label='Seasonal'
                        options={['spring', 'summer', 'autumn', 'winter']}
                        onChange={value => handleFilterChange('seasonal', value)}
                        multiselect
                        withBadges
                    />
                    <Dropdown
                        id='category'
                        className='label-item'
                        defaultValue={getQueryParamValue(queryParams, 'category')}
                        label='Category'
                        options={[
                            'pork',
                            'chicken',
                            'fish',
                            'beef',
                            'vegetarian',
                            'vegan',
                            'sweet',
                            'asian',
                            'mediterranean'
                        ]}
                        onChange={value => handleFilterChange('category', value)}
                        multiselect
                        withBadges
                    />
                </div>
            </div>

            <Panel
                className='search-result-panel'
                title={
                    recipes.length === 0
                        ? 'Nothing found :('
                        : 'Looking for something like these?'
                }
                singleItem={recipes.length === 0}
            >
                {recipes.length > 0
                    ? recipes.map(r =>
                        <Card
                            id={r.id}
                            key={r.id}
                            title={r.title}
                            imgUrl={r.image ? `http://localhost:8000/${r.image}` : null}
                        />
                    )
                    : <p className='no-results-message'>Sorry, no recipes were found! Try changing the search parameters.</p>
                }
            </Panel>
        </Page>
    );
};

const createQuery = queryParams => {
    return !queryParams || queryParams.length === 0
        ? ''
        : '?' + queryParams.map(param => param.key + '=' + param.value).join('&');
};

const updateQueryParam = (queryParams, key, value) => {

    if (value &&
        ((typeof value === 'string' && value !== '')
            || (typeof value === 'object' && value.length > 0))
    ) {
        if (queryParams.find(p => p.key === key)) {
            queryParams.map(p => p.key === key ? (p.value = value) : p);
        } else {
            queryParams.push({ key: key, value: value });
        }
    } else {
        queryParams = queryParams.filter(p => p.key !== key);
    }

    return queryParams;

};

const getQueryParamValue = (queryParams, key) => {

    let value = '';

    if (queryParams.find(p => p.key === key)) {


        if (['category', 'seasonal'].includes(key)) {
            value = queryParams.find(p => p.key === key).value.split(',');
        } else {
            value = queryParams.find(p => p.key === key).value;
        }
    }

    return value;
};

export default Search;