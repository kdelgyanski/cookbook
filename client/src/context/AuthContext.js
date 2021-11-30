import { createContext } from 'react';

const AuthContext = createContext({
    user: null,
    isLoggedIn: false,
    login: () => { },
    logout: () => { }
});

export default AuthContext;