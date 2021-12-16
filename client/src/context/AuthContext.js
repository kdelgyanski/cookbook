import { createContext } from 'react';

const AuthContext = createContext({
    userId: null,
    token: null,
    username: null,
    isLoggedIn: false,
    login: (userId, username, token) => { },
    logout: () => { }
});

export default AuthContext;