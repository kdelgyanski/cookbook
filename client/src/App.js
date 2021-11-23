import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components';

import './App.css';
import { Home, Details, Search, Login, MyKitchen, CreateRecipe } from './pages';

function App() {

    const navLinks = [
        { name: 'Salads', link: '/salads/' },
        { name: 'Soups', link: '/soups/' },
        { name: 'Main Dishes', link: '/main-dishes/' },
        { name: 'Desserts', link: '/desserts/' },
        { name: 'Login', link: '/login' },
        { name: 'MyKitchen', link: '/my-kitchen' },
    ];

    return (
        <div className='container app-wrapper'>
            <Header navLinks={navLinks} />

            <main className='container content'>
                Hello from Cookbook! Happy cooking! :)
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/create-recipe' element={<CreateRecipe />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/my-kitchen' element={<MyKitchen />} />
                    <Route path='/details/:id' element={<Details />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
