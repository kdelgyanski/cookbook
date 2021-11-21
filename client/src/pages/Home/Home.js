import React from 'react';
import { Card, TextField } from '../../components';

const Home = () => {

    const weeklyTopMainDishes = [
        { title: 'Grilled Chicken Fillet', imgUrl: 'grilled-chicken-fillet.jpg' },
        { title: 'Backed Salmon', imgUrl: 'salmon.jpg' },
        { title: 'Pasta with meatballs', imgUrl: 'pasta-with-meatballs.jpeg' },
    ];

    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div className='container app-page'>
            This is the Home Page
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
    );
}

export default Home;