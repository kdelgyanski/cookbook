import React from 'react';

import { useQueryParams } from '../../hooks';
import { Panel, Card, TextField, ErrorModal } from '../../components';
import * as recipeService from '../../services/recipeService';

import './Search.css';

const Search = () => {

    const [queryParams, setQueryParams] = useQueryParams();
    const [searchKeyword, setSearchKeyword] = React.useState('');
    const [recipes, setRecipes] = React.useState([]);
    const [triggerSearch, setTriggerSearch] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {

        const query = createQuery(queryParams);

        const fetchAllRecipes = async () => {
            try {
                const response = await recipeService.getAll(query);

                if (query) {
                    const keyword = queryParams.find(p => p.key === 'title').value;
                    setSearchKeyword(keyword);
                }

                setRecipes(response);
                setTriggerSearch(false);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchAllRecipes();

    }, [triggerSearch]);

    const handleSearch = () => {
        console.log(queryParams);

        let newQueryParams = [...queryParams];

        if (searchKeyword && searchKeyword !== '') {
            newQueryParams.map(p => p.key === 'title' ? (p.value = searchKeyword) : p);
        } else {
            newQueryParams = newQueryParams.filter(p => p.key !== 'title');
        }

        const newQuery = createQuery(newQueryParams);

        setQueryParams(newQuery);
        setTriggerSearch(true);
    };

    return (
        <div className='container app-page search-page'>
            {error && <ErrorModal message={error} onClose={() => setError(null)} />}
            <TextField
                id='search-input'
                className='search-bar'
                onChange={setSearchKeyword}
                placeholder='Search for a recipe...'
                onEnterKeyPress={handleSearch}
            >
                {searchKeyword}
            </TextField>

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

export default Search;