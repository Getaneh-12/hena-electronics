function Hero() {
    return (
        <section className="hero" id="home">

            {/* Background decorative elements */}
            <div className="hero-glow hero-glow-one"></div>
            <div className="hero-glow hero-glow-two"></div>

            <div className="hero-content">

                {/* Small badge */}
                <div className="hero-badge">
                    <span className="hero-badge-dot"></span>
                    Quality Technology • Trusted Service
                </div>

                {/* Small title */}
                <p className="hero-small-title">
                    WELCOME TO HENA ELECTRONICS
                </p>

                {/* Main heading */}
                <h1>
                    Your Technology.
                    <span>Your Choice.</span>
                </h1>

                {/* Description */}
                <p className="hero-description">
                    Discover smartphones, laptops, PCs and quality electronics
                    selected to bring better technology into your everyday life.
                </p>

                {/* Buttons */}
                <div className="hero-buttons">

                    <a href="#products" className="primary-button">
                        Explore Products
                        <span>→</span>
                    </a>

                    <a href="#locations" className="secondary-button">
                        Find Our Store
                        <span>↗</span>
                    </a>

                </div>

                {/* Quick stats */}
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

            {/* Floating decorative cards */}
            <div className="hero-floating-card hero-card-left">
                <span className="hero-card-icon">📱</span>
                <div>
                    <strong>Smartphones</strong>
                    <small>Latest technology</small>
                </div>
            </div>

            <div className="hero-floating-card hero-card-right">
                <span className="hero-card-icon">💻</span>
                <div>
                    <strong>Technology</strong>
                    <small>Built for your needs</small>
                </div>
            </div>

            {/* Scroll indicator */}
            <a href="#categories" className="hero-scroll">
                <span>Scroll to explore</span>
                <span className="hero-scroll-arrow">↓</span>
            </a>

        </section>
    );
}

export default Hero;