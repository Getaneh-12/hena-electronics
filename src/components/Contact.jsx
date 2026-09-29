import { useState } from "react";


function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: "",
    });


    const handleChange = (event) => {

        const { id, value } = event.target;

        setFormData({
            ...formData,
            [id]: value,
        });

    };


    const handleSubmit = (event) => {

        event.preventDefault();


        // Telegram username

        const telegramUsername = "Habtemary21";


        // Open Telegram chat

        const telegramUrl =
            `https://t.me/${telegramUsername}`;


        window.open(
            telegramUrl,
            "_blank"
        );


        // Show submitted information
        // in the browser console

        console.log(
            `Customer Name: ${formData.name}\n` +
            `Phone: ${formData.phone}\n` +
            `Message: ${formData.message}`
        );

    };


    return (

        <section
            className="contact"
            id="contact"
        >

            {/* ========================================
                SECTION HEADING
            ======================================== */}

            <div className="section-heading">

                <p>
                    GET IN TOUCH
                </p>

                <h2>
                    Contact Us
                </h2>

                <span>
                    Have a question about our products or
                    promotions? Get in touch with Hena Electronics.
                </span>

            </div>


            <div className="contact-grid">


                {/* ========================================
                    CONTACT INFORMATION
                ======================================== */}

                <div className="contact-info">

                    <div className="contact-info-heading">

                        <span className="contact-label">
                            WE ARE HERE TO HELP
                        </span>

                        <h3>
                            Let's Talk
                        </h3>

                        <p>
                            Contact us for product availability,
                            prices, promotions and other inquiries.
                            Our team is ready to assist you.
                        </p>

                    </div>


                    {/* ========================================
                        LOCATION
                    ======================================== */}

                    <div className="contact-item">

                        <div className="contact-icon">
                            📍
                        </div>

                        <div className="contact-item-content">

                            <strong>
                                Visit Us
                            </strong>

                            <span>
                                4 Kilo & Zenebework,
                                Addis Ababa
                            </span>

                        </div>

                    </div>


                    {/* ========================================
                        PHONE
                    ======================================== */}

                    <div className="contact-item">

                        <div className="contact-icon">
                            📞
                        </div>

                        <div className="contact-item-content">

                            <strong>
                                Phone
                            </strong>

                            <a
                                href="tel:+251912345678"
                                className="contact-phone"
                            >
                                +251 91 234 5678
                            </a>

                        </div>

                    </div>


                    {/* ========================================
                        TELEGRAM
                    ======================================== */}

                    <div className="contact-item">

                        <div className="contact-icon">
                            ✈️
                        </div>

                        <div className="contact-item-content">

                            <strong>
                                Telegram
                            </strong>

                            <a
                                href="https://t.me/Habtemary21"
                                target="_blank"
                                rel="noreferrer"
                                className="contact-phone"
                            >
                                @Habtemary21
                            </a>

                        </div>

                    </div>


                    {/* ========================================
                        TELEGRAM BUTTON
                    ======================================== */}

                    <a
                        href="https://t.me/Habtemary21"
                        target="_blank"
                        rel="noreferrer"
                        className="contact-telegram"
                    >
                        Contact Us on Telegram
                        <span>→</span>
                    </a>

                </div>


                {/* ========================================
                    CONTACT FORM
                ======================================== */}

                <div className="contact-form">

                    <div className="contact-form-heading">

                        <span>
                            QUICK MESSAGE
                        </span>

                        <h3>
                            Send Us a Message
                        </h3>

                        <p>
                            Fill out the form and contact us
                            directly through Telegram.
                        </p>

                    </div>


                    <form onSubmit={handleSubmit}>


                        {/* ========================================
                            NAME
                        ======================================== */}

                        <div className="form-group">

                            <label htmlFor="name">
                                Your Name
                            </label>

                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                            />

                        </div>


                        {/* ========================================
                            PHONE
                        ======================================== */}

                        <div className="form-group">

                            <label htmlFor="phone">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                required
                            />

                        </div>


                        {/* ========================================
                            MESSAGE
                        ======================================== */}

                        <div className="form-group">

                            <label htmlFor="message">
                                Message
                            </label>

                            <textarea
                                id="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="How can we help you?"
                                required
                            ></textarea>

                        </div>


                        {/* ========================================
                            SUBMIT BUTTON
                        ======================================== */}

                        <button
                            type="submit"
                            className="contact-submit"
                        >
                            <span>
                                Send Message
                            </span>

                            <span>
                                →
                            </span>

                        </button>

                    </form>

                </div>

            </div>

        </section>

    );
}


export default Contact;

