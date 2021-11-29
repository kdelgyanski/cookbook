import React from 'react';
import { Card, TextField, Panel } from '../../components';

const Home = () => {

    const weeklyTopMainDishes = [
        { id: 1, title: 'Grilled Chicken Fillet', imgUrl: 'grilled-chicken-fillet.jpg' },
        { id: 2, title: 'Backed Salmon', imgUrl: 'salmon.jpg' },
        { id: 3, title: 'Pasta with meatballs', imgUrl: 'pasta-with-meatballs.jpeg' },
    ];

    const seasonalTop = [
        { id: 11, title: 'Creamy Vegan Pumpkin Soup', imgUrl: 'creamy-vegan-pumpkin-soup.jpg' },
        { id: 12, title: 'Oven Baked Feta Pasta', imgUrl: 'oven-baked-feta-pasta.jpg' },
        { id: 13, title: 'Pumpkin Pie', imgUrl: 'pumpkin-pie.jpg' },
        { id: 14, title: 'Slow Cooked Pork', imgUrl: 'slow-cooked-pork.jpg' },
        { id: 15, title: 'Slow Cooked Beef', imgUrl: 'slow-cooker-beef.jpg' },
    ];

    const [searchValue, setSearchValue] = React.useState('');

    return (
        <div className='container app-page'>
            This is the Home Page
            <TextField
                id='search-input'
                onChange={setSearchValue}
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
                        id={mainDish.id}
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
                        id={recipe.id}
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