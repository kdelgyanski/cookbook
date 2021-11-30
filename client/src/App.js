import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components';

import './App.css';
import { Home, Details, Search, Login, MyKitchen, CreateRecipe } from './pages';

import AuthContext from './context/AuthContext';

function App() {

    const auth = React.useContext(AuthContext);

    const [token, setToken] = React.useState(null);
    const [userId, setUserId] = React.useState(null);

    const login = (userId, token) => {
        setToken(token);
        setUserId(userId);
    };

    const logout = () => {
        setToken(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn: !!token,
            token: token,
            userId: userId,
            login: login,
            logout: logout
        }}>
            <div className='container app-wrapper'>
                <Header />

                <main className='container content'>
                    Hello from Cookbook! Happy cooking! :)
                <Routes>
                        <Route path='/' element={<Home />} />
                        {!auth.isLoggedIn && <Route path='/login' element={<Login />} />}
                        {auth.isLoggedIn && <Route path='/create-recipe' element={<CreateRecipe />} />}
                        <Route path='/search' element={<Search />} />
                        {auth.isLoggedIn && <Route path='/my-kitchen' element={<MyKitchen />} />}
                        <Route path='/details/:id' element={<Details />} />
                    </Routes>
                </main>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
