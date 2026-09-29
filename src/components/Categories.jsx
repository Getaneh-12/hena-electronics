function Categories({ setSelectedCategory }) {

    const handleCategoryClick = (category) => {

        setSelectedCategory(category);

        setTimeout(() => {

            const productsSection =
                document.getElementById("products");

            if (productsSection) {

                productsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

            }

        }, 100);
    };


    return (
        <section
            className="categories"
            id="categories"
        >

            <div className="section-heading">

                <p>
                    SHOP WITH US
                </p>

                <h2>
                    Explore Our Categories
                </h2>

                <span>
                    Find the technology and accessories you need.
                </span>

            </div>


            <div className="category-grid">


                {/* SMARTPHONES */}

                <div className="category-card">

                    <div className="category-icon">
                        📱
                    </div>

                    <h3>
                        Smartphones
                    </h3>

                    <p>
                        Discover the latest smartphones
                        and mobile devices.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            handleCategoryClick(
                                "Smartphones"
                            )
                        }
                    >
                        Explore →
                    </button>

                </div>


                {/* LAPTOPS */}

                <div className="category-card">

                    <div className="category-icon">
                        💻
                    </div>

                    <h3>
                        Laptops
                    </h3>

                    <p>
                        Laptops for students, professionals
                        and everyday use.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            handleCategoryClick(
                                "Laptops"
                            )
                        }
                    >
                        Explore →
                    </button>

                </div>


                {/* ACCESSORIES */}

                <div className="category-card">

                    <div className="category-icon">
                        🎧
                    </div>

                    <h3>
                        Accessories
                    </h3>

                    <p>
                        Headphones, chargers, keyboards
                        and other accessories.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            handleCategoryClick(
                                "Accessories"
                            )
                        }
                    >
                        Explore →
                    </button>

                </div>

            </div>

        </section>
    );
}


export default Categories;