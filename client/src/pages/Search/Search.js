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

        const query = '?' + queryParams.map(param => {
            return param.key + '=' + param.value;
        }).join('&');

        const fetchAllRecipes = async () => {
            try {
                const response = await recipeService.getAll(query);
                setSearchKeyword(queryParams[0].value);
                setRecipes(response);
                setTriggerSearch(false);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchAllRecipes();

    }, [triggerSearch]);

    return (
        <div className='container app-page search-page'>
            {error && <ErrorModal message={error} onClose={() => setError(null)} />}
            <TextField
                id='search-input'
                className='search-bar'
                onChange={setSearchKeyword}
                placeholder='Search for a recipe...'
                onEnterKeyPress={() => {
                    setQueryParams(searchKeyword ? '?title=' + searchKeyword : '');
                    setTriggerSearch(true);
                }}
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

export default Search;