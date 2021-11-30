import { createContext } from 'react';

const AuthContext = createContext({
    user: null,
    isLoggedIn: false,
    login: (user) => { },
    logout: () => { }
});

export default AuthContext;