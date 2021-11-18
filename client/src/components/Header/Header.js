const Header = ({
    navLinks
}) => {
    return (
        <header className='app-header'>
            This is the header
            <nav>
                {navLinks.map(navLink =>
                    <a
                        key={navLink.name}
                        href={`${navLink.link}`}
                    >
                        {navLink.name}
                    </a>
                )}
            </nav>
        </header>
    );
};

export default Header;