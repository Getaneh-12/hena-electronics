import { useState } from "react";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="navbar">

            <div className="navbar-container">

                {/* LOGO */}
                <a
                    href="#home"
                    className="navbar-logo"
                    onClick={closeMenu}
                    style={{ color: "blue" }}
                >
                    Hena<span>Electronics</span>
                </a>


                {/* DESKTOP NAVIGATION */}
                <nav className="navbar-links">

                    <a href="#home">
                        Home
                    </a>

                    <a href="#categories">
                        Categories
                    </a>

                    <a href="#products">
                        Products
                    </a>

                    <a href="#promotions">
                        Promotions
                    </a>

                    <a href="#locations">
                        Locations
                    </a>

                    <a href="#about">
                        About
                    </a>

                    <a href="#contact">
                        Contact
                    </a>

                </nav>


                {/* MOBILE MENU BUTTON */}
                <button
                    type="button"
                    className="navbar-menu-button"
                    onClick={() =>
                        setMenuOpen(!menuOpen)
                    }
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? "✕" : "☰"}
                </button>

            </div>


            {/* MOBILE NAVIGATION */}
            <nav
                className={`navbar-mobile-menu ${menuOpen ? "open" : ""
                    }`}
            >

                <a
                    href="#home"
                    onClick={closeMenu}
                >
                    Home
                </a>

                <a
                    href="#categories"
                    onClick={closeMenu}
                >
                    Categories
                </a>

                <a
                    href="#products"
                    onClick={closeMenu}
                >
                    Products
                </a>

                <a
                    href="#promotions"
                    onClick={closeMenu}
                >
                    Promotions
                </a>

                <a
                    href="#locations"
                    onClick={closeMenu}
                >
                    Locations
                </a>

                <a
                    href="#about"
                    onClick={closeMenu}
                >
                    About
                </a>

                <a
                    href="#contact"
                    onClick={closeMenu}
                >
                    Contact
                </a>

            </nav>

        </header>
    );
}

export default Navbar;