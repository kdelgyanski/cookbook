import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components';

import './App.css';
import { Home, Details, Search, Login, MyKitchen, CreateRecipe } from './pages';

import AuthContext from './context/AuthContext';
import { useAuth } from './hooks';

function App() {

    const { userId, token, login, logout } = useAuth();

    return (
        <AuthContext.Provider value={{
            isLoggedIn: !!token,
            token: token,
            userId: userId,
            login: login,
            logout: logout
        }}>
            <div className='app-wrapper'>
                <Header />
                <main className='content'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/search' element={<Search />} />
                        {!!token && <Route path='/:userId/my-kitchen' element={<MyKitchen />} />}
                        {!!token && <Route path='/create-recipe' element={<CreateRecipe />} />}
                        <Route path='/details/:id' element={<Details />} />
                        {!token && <Route path='/login' element={<Login />} />}
                    </Routes>
                </main>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
