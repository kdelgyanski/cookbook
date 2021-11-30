import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components';

import './App.css';
import { Home, Details, Search, Login, MyKitchen, CreateRecipe } from './pages';

import AuthContext from './context/AuthContext';

function App() {

    const auth = React.useContext(AuthContext);

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [user, setUser] = React.useState(null);

    const login = (user) => {
        setIsLoggedIn(true);
        setUser(user);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            user: user,
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
