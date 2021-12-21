import React from 'react';
import { useLocation, useHistory, useNavigate } from 'react-router-dom';

import { Panel, Card, TextField } from '../../components';
import * as recipeService from '../../services/recipeService';

const Search = () => {

    const [queryParams, setQueryParams] = useQueryParams();
    const [searchKeyword, setSearchKeyword] = React.useState('');
    const [recipes, setRecipes] = React.useState([]);
    const [triggerSearch, setTriggerSearch] = React.useState(false);

    React.useEffect(() => {

        const query = '?' + queryParams.map(param => {
            return param.key + '=' + param.value;
        }).join('&');

        setSearchKeyword(queryParams[0].value);

        const fetchAllRecipes = async () => {
            try {
                const response = await recipeService.getAll(query);
                setRecipes(response);
                setTriggerSearch(false);
            } catch (err) {
                console.log(err);
            }
        }

        fetchAllRecipes();

    }, [triggerSearch]);

    return (
        <div className='container app-page'>

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
                title='Your search result'
            >
                {recipes.map(r =>
                    <Card
                        id={r.id}
                        key={r.title}
                        title={r.title}
                        imgUrl={r.image ? `http://localhost:8000/${r.image}` : null}
                    />
                )}
            </Panel>

        </div>
    );
};

const useQueryParams = () => {
    const location = useLocation();
    const navigate = useNavigate();

    console.log(location);

    const queryParams = location.search.substr(1).split('&');

    const keyValuePairs = queryParams.map(paramPair => paramPair.split('='));

    const keyValueObjects = keyValuePairs.map(a => a.reduce((acc, curr, index) => {
        console.log(curr);
        if (index === 0) {
            acc['key'] = curr;
        } else {
            acc['value'] = curr;
        }
        return acc;
    }, {}));


    const setUrl = (newQueryParams) => {
        navigate(location.pathname + newQueryParams);
    };

    return [keyValueObjects, setUrl];
}

export default Search;