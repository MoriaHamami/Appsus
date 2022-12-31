const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    function toggleMenu() {
        document.body.classList.toggle('menu-open')
    }

    return <header className="app-header">
        <Link to="/">
            <div className="logo">
                <img src="./assets/img/logo/logo.png" alt="" />
            </div>
        </Link>
        <nav>
            <ul>
                <li onClick={toggleMenu}><NavLink to="/">Home</NavLink></li>
                <li onClick={toggleMenu}><NavLink to="/about">About</NavLink></li>
                <li onClick={toggleMenu}> <NavLink to="/mail">Mail</NavLink></li>
                <li onClick={toggleMenu}><NavLink to="/note">Note</NavLink></li>
                <li onClick={toggleMenu}><NavLink to="/book">Book</NavLink></li>
            </ul>
        </nav>
        {<button className="menu-toggle-btn" onClick={toggleMenu}>☰</button>}
    </header>
}
