import React from 'react';

import { Header, TextField, Card } from './components';

import './App.css';

function App() {

    const navLinks = [
        { name: 'Salads', link: '/salads/' },
        { name: 'Soups', link: '/soups/' },
        { name: 'Main Dishes', link: '/main-dishes/' },
        { name: 'Desserts', link: '/desserts/' },
    ];

    const weeklyTopMainDishes = [
        { title: 'Grilled Chicken Fillet', imgUrl: 'grilled-chicken-fillet.jpg' },
        { title: 'Backed Salmon', imgUrl: 'salmon.jpg' },
        { title: 'Pasta with meatballs', imgUrl: 'pasta-with-meatballs.jpeg' },
    ];

    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div className='container app-wrapper'>
            <Header navLinks={navLinks} />
            <div className='container content'>
                Hello from Cookbook! Happy cooking! :)
                <TextField
                    id='search-input'
                    onChange={e => setSearchValue(e.target.value)}
                    placeholder='Search for a recipe...'
                >
                    {searchValue}
                </TextField>

                <div className='container weekly-top-container'>
                    {weeklyTopMainDishes.map(mainDish =>
                        <Card
                            key={mainDish.title}
                            title={mainDish.title}
                            imgUrl={mainDish.imgUrl}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
