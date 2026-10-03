function About() {
    return (
        <section className="about" id="about">

            <div className="about-content">

                <div className="about-text">

                    <p className="about-label">
                        ABOUT HENA ELECTRONICS
                    </p>

                    <h2>
                        Technology You Can
                        <span> Trust.</span>
                    </h2>

                    <p className="about-description">
                        Hena Electronics provides smartphones, laptops
                        and quality electronic accessories for customers
                        in Addis Ababa.
                    </p>

                    <p className="about-description">
                        We focus on providing quality products, attractive
                        offers and convenient locations for our customers.
                    </p>

                    <a
                        href="https://t.me/PCandphone4u"
                        target="_blank"
                        rel="noreferrer"
                        className="about-button"
                    >
                        Visit Our Telegram Group
                        <span>→</span>
                    </a>

                </div>

                <div className="about-features">

                    <div className="about-feature about-feature-main">

                        <div className="about-feature-icon">
                            ✓
                        </div>

                        <div className="about-feature-content">

                            <span className="about-feature-number">
                                01
                            </span>

                            <h3>
                                Quality Products
                            </h3>

                            <p>
                                Smartphones, laptops and accessories
                                selected with quality and customer needs
                                in mind.
                            </p>

                        </div>

                    </div>

                    <div className="about-feature">

                        <div className="about-feature-icon">
                            ⚡
                        </div>

                        <div className="about-feature-content">

                            <span className="about-feature-number">
                                02
                            </span>

                            <h3>
                                Latest Offers
                            </h3>

                            <p>
                                Discover our latest products and
                                special promotions.
                            </p>

                        </div>

                    </div>

                    <div className="about-feature">

                        <div className="about-feature-icon">
                            📍
                        </div>

                        <div className="about-feature-content">

                            <span className="about-feature-number">
                                03
                            </span>

                            <h3>
                                Convenient Locations
                            </h3>

                            <p>
                                Find us at 4 Kilo and Zenebework
                                in Addis Ababa.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default About;