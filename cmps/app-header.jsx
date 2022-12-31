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
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li> <NavLink to="/mail">Mail</NavLink></li>
                <li><NavLink to="/note">Note</NavLink></li>

            </ul>
        </nav>
        {<button class="menu-toggle-btn" onClick={toggleMenu}>☰</button>}
    </header>
}
