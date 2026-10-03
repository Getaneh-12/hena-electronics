function Locations() {
    return (
        <section className="locations" id="locations">

            <div className="section-heading">

                <p>VISIT US</p>

                <h2>Our Locations</h2>

                <span>
                    Visit Hena Electronics at our convenient
                    locations in Addis Ababa.
                </span>

            </div>


            <div className="location-grid">

                <div className="location-card">

                    <div className="location-icon">
                        📍
                    </div>

                    <div className="location-content">

                        <h3>4 Kilo</h3>

                        <p>
                            Visit our 4 Kilo location for
                            smartphones, laptops and quality
                            electronics.
                        </p>

                        <div className="location-info">

                            <strong>
                                📍 Address
                            </strong>

                            <span>
                                4 Kilo Square, Addis Ababa, Ethiopia
                            </span>

                            <strong>
                                📞 Phone Number
                            </strong>

                            <span>
                                +251 990239030
                            </span>

                        </div>

                        <a
                            href="https://www.google.com/maps/search/?api=1&query=4%20Kilo%20Square%2C%20Addis%20Ababa%2C%20Ethiopia"
                            target="_blank"
                            rel="noreferrer"
                            className="location-button"
                        >
                            View on Map →
                        </a>

                    </div>

                </div>

                <div className="location-card">

                    <div className="location-icon">
                        📍
                    </div>

                    <div className="location-content">

                        <h3>Zenebework</h3>

                        <p>
                            Find our Zenebework location and
                            explore our latest technology products.
                        </p>

                        <div className="location-info">

                            <strong>
                                📍 Address
                            </strong>

                            <span>
                                Zenebework Square, Addis Ababa, Ethiopia
                            </span>

                            <strong>
                                📞 Phone Number
                            </strong>

                            <span>
                                +251 990239030
                            </span>

                        </div>

                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Zenebework%20Square%2C%20Addis%20Ababa%2C%20Ethiopia"
                            target="_blank"
                            rel="noreferrer"
                            className="location-button"
                        >
                            View on Map →
                        </a>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Locations;