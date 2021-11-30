import { createContext } from 'react';

const AuthContext = createContext({
    userId: null,
    token: null,
    isLoggedIn: false,
    login: (userId, token) => { },
    logout: () => { }
});

export default AuthContext;