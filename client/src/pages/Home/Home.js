import React from 'react';
import { Card, TextField, Panel } from '../../components';

const Home = () => {

    const weeklyTopMainDishes = [
        { title: 'Grilled Chicken Fillet', imgUrl: 'grilled-chicken-fillet.jpg' },
        { title: 'Backed Salmon', imgUrl: 'salmon.jpg' },
        { title: 'Pasta with meatballs', imgUrl: 'pasta-with-meatballs.jpeg' },
    ];

    const seasonalTop = [
        { title: 'Creamy Vegan Pumpkin Soup', imgUrl: 'creamy-vegan-pumpkin-soup.jpg' },
        { title: 'Oven Baked Feta Pasta', imgUrl: 'oven-baked-feta-pasta.jpg' },
        { title: 'Pumpkin Pie', imgUrl: 'pumpkin-pie.jpg' },
        { title: 'Slow Cooked Pork', imgUrl: 'slow-cooked-pork.jpg' },
        { title: 'Slow Cooked Beef', imgUrl: 'slow-cooker-beef.jpg' },
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

            <Panel
                className='weekly-top-main-dishes-panel'
                maxVisibleItems={3}
                title='Pick of the week'
            >
                {weeklyTopMainDishes.map(mainDish =>
                    <Card
                        key={mainDish.title}
                        title={mainDish.title}
                        imgUrl={mainDish.imgUrl}
                    />
                )}
            </Panel>

            <Panel
                className='seasonal-top-panel'
                maxVisibleItems={3}
                title='Seasonal'
            >
                {seasonalTop.map(recipe =>
                    <Card
                        key={recipe.title}
                        title={recipe.title}
                        imgUrl={recipe.imgUrl}
                    />
                )}
            </Panel>
        </div>
    );
}

export default Home;