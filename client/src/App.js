import React from 'react';

import { Header, TextField } from './components';

function App() {

    const navLinks = [
        { name: 'Salads', link: '/salads/' },
        { name: 'Soups', link: '/soups/' },
        { name: 'Main Dishes', link: '/main-dishes/' },
        { name: 'Desserts', link: '/desserts/' },
    ];

    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div className='app-wrapper'>
            <Header navLinks={navLinks} />
            <div className='content'>
                Hello from Cookbook! Happy cooking! :)
                <TextField
                    id='search-input'
                    onChange={e => setSearchValue(e.target.value)}
                    placeholder='Search for a recipe...'
                >
                    {searchValue}
                </TextField>
            </div>
        </div>
    );
}

export default App;
