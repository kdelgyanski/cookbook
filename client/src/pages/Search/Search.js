import React from 'react';

import { useQueryParams } from '../../hooks';
import { Panel, Card, TextField, ErrorModal, Dropdown } from '../../components';
import * as recipeService from '../../services/recipeService';

import './Search.css';

const Search = () => {

    const [queryParams, setQueryParams] = useQueryParams();
    const [searchKeyword, setSearchKeyword] = React.useState('');
    const [course, setCourse] = React.useState('');
    const [difficulty, setDifficulty] = React.useState('');
    const [seasonal, setSeasonal] = React.useState([]);
    const [category, setCategory] = React.useState([]);

    const [recipes, setRecipes] = React.useState([]);
    const [triggerSearch, setTriggerSearch] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {

        const query = createQuery(queryParams);

        const fetchAllRecipes = async () => {
            try {
                const response = await recipeService.getAll(query);

                if (queryParams.find(p => p.key === 'title')) {
                    const keyword = queryParams.find(p => p.key === 'title').value;
                    setSearchKeyword(keyword);
                }

                setRecipes(response);
                setTriggerSearch(false);
            } catch (err) {
                setError(err.message);
                setTriggerSearch(false);
            }
        }

        fetchAllRecipes();

    }, [triggerSearch]);

    const handleSearch = () => {
        let newQueryParams = [...queryParams];

        newQueryParams = updateQueryParam(newQueryParams, 'title', searchKeyword);
        newQueryParams = updateQueryParam(newQueryParams, 'course', course);
        newQueryParams = updateQueryParam(newQueryParams, 'difficulty', difficulty);
        newQueryParams = updateQueryParam(newQueryParams, 'seasonal', seasonal);
        newQueryParams = updateQueryParam(newQueryParams, 'category', category);

        const newQuery = createQuery(newQueryParams);

        setQueryParams(newQuery);
        setTriggerSearch(true);
    };

    return (
        <div className='container app-page search-page'>
            {error && <ErrorModal message={error} onClose={() => setError(null)} />}
            <div className='search-panel'>
                <div className='search-bar'>
                    <TextField
                        id='search-input'
                        className='search-bar'
                        onChange={setSearchKeyword}
                        placeholder='Search for a recipe...'
                        onEnterKeyPress={handleSearch}
                    >
                        {searchKeyword}
                    </TextField>
                    <button
                        className='btn btn-primary search-button'
                        type='button'
                        onClick={handleSearch}
                    >
                        Search
                        </button>
                </div>
                <div className='labels'>
                    <Dropdown
                        id='course'
                        className='label-item'
                        defaultValue={course ? course : ''}
                        label='Course'
                        options={['main', 'soup', 'salad', 'dessert']}
                        onChange={setCourse}
                        withBadges
                    />
                    <Dropdown
                        id='difficulty'
                        className='label-item'
                        defaultValue={difficulty ? difficulty : ''}
                        label='Difficulty'
                        options={['easy', 'intermediate', 'advanced']}
                        onChange={setDifficulty}
                        withBadges
                    />
                    <Dropdown
                        id='seasonal'
                        className='label-item'
                        defaultValue={seasonal ? seasonal : ''}
                        label='Seasonal'
                        options={['spring', 'summer', 'autumn', 'winter']}
                        onChange={setSeasonal}
                        multiselect
                        withBadges
                    />
                    <Dropdown
                        id='category'
                        className='label-item'
                        defaultValue={category ? category : ''}
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
                        onChange={setCategory}
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
                            key={r.title}
                            title={r.title}
                            imgUrl={r.image ? `http://localhost:8000/${r.image}` : null}
                        />
                    )
                    : <p className='no-results-message'>Sorry, no recipes were found! Try changing the search parameters.</p>
                }
            </Panel>

        </div>
    );
};

const createQuery = queryParams => {
    return queryParams && queryParams.length === 0
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

export default Search;