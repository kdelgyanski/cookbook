import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

import './Header.css';

import logo from '../../assets/images/mish_mash_3.png';

const Header = () => {

    const location = useLocation();

    const auth = useContext(AuthContext);

    const navLinks = [
        { name: 'Salads', link: '/salads/' },
        { name: 'Soups', link: '/soups/' },
        { name: 'Main Dishes', link: '/main-dishes/' },
        { name: 'Desserts', link: '/desserts/' }
    ];

    auth.isLoggedIn
        ? navLinks.push(
            { name: 'MyKitchen', link: `/${auth.userId}/my-kitchen` },
            { name: 'Logout', link: '/', onClick: auth.logout }
        )
        : navLinks.push({ name: 'Login', link: '/login' });

    return (
        <header className='py-3 text-center app-header'>
            <nav className='nav'>
                <Link
                    to='/'
                    className='nav-link logo'
                >
                    <img className='logo-img' src={logo} alt='logo' />
                </Link>
                {navLinks.map(navLink =>
                    <Link
                        key={navLink.name}
                        to={`${navLink.link}`}
                        className={`nav-link ${navLink.link !== '/' && location.pathname.includes(navLink.link) ? 'active' : ''}`}
                        onClick={navLink.onClick ? navLink.onClick : undefined}
                    >
                        {navLink.name}
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;