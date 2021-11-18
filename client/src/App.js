import { Header } from './components';

function App() {

    const navLinks = [
        { name: 'Salads', link: '/salads/' },
        { name: 'Soups', link: '/soups/' },
        { name: 'Main Dishes', link: '/main-dishes/' },
        { name: 'Desserts', link: '/desserts/' },
    ];

    return (
        <div className='app-wrapper'>
            <Header navLinks={navLinks} />
            <div className='content'>
                Hello from Cookbook! Happy cooking! :)
            </div>
        </div>
    );
}

export default App;
