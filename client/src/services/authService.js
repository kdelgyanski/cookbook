const BASE_URL = 'http://localhost:8000/api';
const USERS_PATH = '/users';

export const login = async (username, password) => {
    const response = await fetch(`${BASE_URL}${USERS_PATH}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return responseData;
};

export const signUp = async (username, email, password) => {
    const response = await fetch(`${BASE_URL}${USERS_PATH}/signUp`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    });

    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message);
    }
    return responseData;
};