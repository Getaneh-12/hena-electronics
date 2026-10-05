function Hero() {
    return (
        <section className="hero" id="home">

            <div className="hero-glow hero-glow-one"></div>
            <div className="hero-glow hero-glow-two"></div>

            <div className="hero-content">

                <h1 className="hero-small-title">
                    Hena Electronics
                </h1>

                <div className="hero-badge">
                    <span className="hero-badge-dot"></span>
                    Quality Technology • Trusted Service
                </div>

                <h2>
                    Your Technology.
                    <span>Your Choice.</span>
                </h2>

                <p className="hero-description">
                    Hena Electronics is an electronics store in Addis Ababa
                    offering smartphones, laptops, computers, accessories,
                    and quality technology products. Explore our products
                    and find a store near you.
                </p>

                <div className="hero-buttons">

                    <a
                        href="#products"
                        className="primary-button"
                    >
                        Explore Products
                        <span>→</span>
                    </a>

                    <a
                        href="#locations"
                        className="secondary-button"
                    >
                        Find Our Store
                        <span>↗</span>
                    </a>

                </div>

                <div className="hero-stats">

                    <div className="hero-stat">
                        <strong>Quality</strong>
                        <span>Products</span>
                    </div>

                    <div className="hero-stat-divider"></div>

                    <div className="hero-stat">
                        <strong>Trusted</strong>
                        <span>Service</span>
                    </div>

                    <div className="hero-stat-divider"></div>

                    <div className="hero-stat">
                        <strong>2</strong>
                        <span>Store Locations</span>
                    </div>

                </div>

            </div>

            <div className="hero-floating-card hero-card-left">

                <span className="hero-card-icon">
                    📱
                </span>

                <div>
                    <strong>Smartphones</strong>
                    <small>Latest technology</small>
                </div>

            </div>

            <div className="hero-floating-card hero-card-right">

                <span className="hero-card-icon">
                    💻
                </span>

                <div>
                    <strong>Technology</strong>
                    <small>Built for your needs</small>
                </div>

            </div>

            <a
                href="#categories"
                className="hero-scroll"
            >
                <span>Scroll to explore</span>
                <span className="hero-scroll-arrow">
                    ↓
                </span>
            </a>

        </section>
    );
}

export default Hero;