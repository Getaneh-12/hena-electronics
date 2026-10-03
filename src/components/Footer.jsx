import logo from "../assets/hena-logo.png";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">
                <div className="footer-brand">

                    <div className="footer-brand-header">

                        <div className="footer-logo-wrapper">
                            <img
                                src={logo}
                                alt="Hena Electronics"
                                className="footer-logo"
                            />
                        </div>

                        <div className="footer-brand-text">
                            <h2>Hena Electronics</h2>

                            s    <p>
                                Mobile • PC • Electronics
                            </p>
                        </div>

                    </div>

                    <p className="footer-description">
                        Quality smartphones, laptops and electronics
                        at convenient locations in Addis Ababa.
                    </p>

                </div>
                <div className="footer-links">

                    <h3>Quick Links</h3>

                    <a href="#home">Home</a>
                    <a href="#products">Products</a>
                    <a href="#promotions">Promotions</a>
                    <a href="#locations">Locations</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>

                </div>

                <div className="footer-links">

                    <h3>Our Locations</h3>
                    <a
                        href="https://www.google.com/maps/search/?api=1&query=4%20Kilo%20Square%2C%20Addis%20Ababa%2C%20Ethiopia"
                        target="_blank"
                        rel="noreferrer">📍 4 kilo </a>

                    <a
                        href="https://www.google.com/maps/search/?api=1&query=Zenebework%20Square%2C%20Addis%20Ababa%2C%20Ethiopia"
                        target="_blank"
                        rel="noreferrer">📍 Zenebework</a>

                </div>

                <div className="footer-links">

                    <h3>Contact Us</h3>

                    <a
                        href="tel:+251956229470"
                        className="footer-phone"
                    >
                        📞 +251 990239030
                    </a>

                    <a
                        href="https://t.me/PCandphone4u"
                        target="_blank"
                        rel="noreferrer"
                    >
                        ✈️ View Telegram group
                    </a>

                </div>

            </div>
            <div className="footer-bottom">

                <p>
                    © 2026 Hena Electronics. All rights reserved.
                </p>

                <p>
                    Addis Ababa, Ethiopia
                </p>

            </div>

        </footer>
    );
}

export default Footer;