function About() {
    return (
        <section className="about" id="about">

            <div className="about-content">

                {/* LEFT SIDE */}

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
                        Visit Our Telegram Group →
                    </a>

                </div>


                {/* RIGHT SIDE */}

                <div className="about-features">

                    {/* FEATURE 1 */}

                    <div className="about-feature">

                        <div className="about-feature-icon">
                            ✓
                        </div>

                        <div>

                            <h3>
                                Quality Products
                            </h3>

                            <p>
                                Smartphones, laptops and accessories
                                selected for our customers.
                            </p>

                        </div>

                    </div>


                    {/* FEATURE 2 */}

                    <div className="about-feature">

                        <div className="about-feature-icon">
                            ⚡
                        </div>

                        <div>

                            <h3>
                                Latest Offers
                            </h3>

                            <p>
                                Discover our latest products and
                                special promotions.
                            </p>

                        </div>

                    </div>


                    {/* FEATURE 3 */}

                    <div className="about-feature">

                        <div className="about-feature-icon">
                            📍
                        </div>

                        <div>

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
