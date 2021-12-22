import { useLocation, useNavigate } from 'react-router-dom';

const useQueryParams = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = location.search.substr(1).split('&');

    let keyValueObjects = [];

    if (location.search !== '') {

        const keyValuePairs = queryParams.map(paramPair => paramPair.split('='));

        keyValueObjects = keyValuePairs.map(a => a.reduce((acc, curr, index) => {
            if (curr === '') {
                return null;
            }

            index === 0
                ? acc['key'] = curr
                : acc['value'] = curr;

            return acc;
        }, {}));
    }

    const setUrl = newQueryParams => {
        navigate(location.pathname + newQueryParams);
    };

    return [keyValueObjects, setUrl];
};

export default useQueryParams;