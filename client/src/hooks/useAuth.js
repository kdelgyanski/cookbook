import React from 'react';

const USER_DATA_KEY = 'userData';

let logoutTimer;

const useAuth = () => {
    const [token, setToken] = React.useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = React.useState(null);
    const [userId, setUserId] = React.useState(null);

    React.useEffect(() => {
        const userData = JSON.parse(localStorage.getItem(USER_DATA_KEY));
        if (userData && userData.token && new Date(userData.expiration) > new Date()) {
            login(userData.userId, userData.token, new Date(userData.expiration));
        }
    }, []);

    React.useEffect(() => {

        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }

    }, [token, tokenExpirationDate]);

    const login = (userId, token, expirationDate) => {
        setToken(token);
        setUserId(userId);
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpirationDate);
        
        localStorage.setItem(USER_DATA_KEY, JSON.stringify({
            userId: userId,
            token: token,
            expiration: tokenExpirationDate.toISOString()
        }));
    };

    const logout = () => {
        setToken(null);
        setUserId(null);
        setTokenExpirationDate(null);
        localStorage.removeItem(USER_DATA_KEY);
    };

    return { userId, token, login, logout };
};

export default useAuth;