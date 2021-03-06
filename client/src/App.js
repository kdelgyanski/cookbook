import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Header } from './components';

import './App.css';
import { Home, Details, Search, Login, MyKitchen, CreateRecipe, EditRecipe } from './pages';

import AuthContext from './context/AuthContext';
import { useAuth } from './hooks';

function App() {

    const { userId, username, token, login, logout } = useAuth();

    return (
        <AuthContext.Provider value={{
            isLoggedIn: !!token,
            token: token,
            userId: userId,
            username: username,
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
                        {!!token && <Route path='/edit-recipe/:id' element={<EditRecipe />} />}
                        <Route path='/details/:id' element={<Details />} />
                        {!token && <Route path='/login' element={<Login />} />}
                        <Route path='*' element={<Navigate to='/' />} />
                    </Routes>
                </main>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
