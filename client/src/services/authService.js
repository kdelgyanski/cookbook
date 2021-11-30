const BASE_URL = 'http://localhost:8000/api';
const USERS_PATH = '/users';

export const login = async (username, password) => {
    return fetch(`${BASE_URL}${USERS_PATH}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(res => {
            const responseData = res.json();
            if (!res.ok) {
                throw new Error(responseData.message);
            }
            return responseData;
        });
};

export const signUp = (username, email, password) => {
    return fetch(`${BASE_URL}${USERS_PATH}/signUp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    })
        .then(res => {
            const responseData = res.json();
            if (!res.ok) {
                throw new Error(responseData.message);
            }
            return responseData;
        });
};