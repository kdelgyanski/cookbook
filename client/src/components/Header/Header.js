import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Header = () => {

    const auth = useContext(AuthContext);

    const navLinks = [
        { name: 'Salads', link: '/salads/' },
        { name: 'Soups', link: '/soups/' },
        { name: 'Main Dishes', link: '/main-dishes/' },
        { name: 'Desserts', link: '/desserts/' }
    ];

    auth.isLoggedIn
        ? navLinks.push({ name: 'MyKitchen', link: '/my-kitchen' }, { name: 'Logout', link: '/', onClick: auth.logout })
        : navLinks.push({ name: 'Login', link: '/login' });

    return (
        <header className='container py-3 text-center app-header'>
            <h2 className='display-3'>This is the header</h2>
            <nav className='nav'>
                {navLinks.map(navLink =>
                    <a
                        key={navLink.name}
                        href={`${navLink.link}`}
                        className='nav-link'
                        onClick={navLink.onClick ? navLink.onClick : undefined}
                    >
                        {navLink.name}
                    </a>
                )}
            </nav>
        </header>
    );
};

export default Header;