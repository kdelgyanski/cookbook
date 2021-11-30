const BASE_URL = 'http://localhost:8000/api';
const USERS_PATH = '/users';

export const login = async (username, password) => {
    fetch(`${BASE_URL}${USERS_PATH}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(res => res.json())
        .catch(error => console.error(error));
};

export const signUp = (username, email, password) => {
    fetch(`${BASE_URL}${USERS_PATH}/signUp`, {
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
        .then(res => res.json())
        .catch(error => console.error(error));
};