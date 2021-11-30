const Header = ({
    navLinks
}) => {
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