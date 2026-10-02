import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

function Products({
    selectedCategory,
    setSelectedCategory,
}) {

    const {
        products,
        loading,
        error,
    } = useProducts();


    /* ========================================
       FILTER PRODUCTS
    ======================================== */

    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter(
                (product) =>
                    product.category ===
                    selectedCategory
            );


    /* ========================================
       LOADING
    ======================================== */

    if (loading) {

        return (

            <section
                className="products"
                id="products"
            >

                <div className="section-heading">

                    <p>
                        OUR PRODUCTS
                    </p>

                    <h2>
                        Explore Our Products
                    </h2>

                </div>


                <div className="products-message">

                    <h3>
                        Loading products...
                    </h3>

                    <p>
                        Please wait while we load our
                        latest products.
                    </p>

                </div>

            </section>

        );

    }


    /* ========================================
       ERROR
    ======================================== */

    if (error) {

        return (

            <section
                className="products"
                id="products"
            >

                <div className="section-heading">

                    <p>
                        OUR PRODUCTS
                    </p>

                    <h2>
                        Explore Our Products
                    </h2>

                </div>


                <div className="products-message">

                    <h3>
                        Unable to load products
                    </h3>

                    <p>
                        Please make sure the Hena Electronics
                        backend is running.
                    </p>

                </div>

            </section>

        );

    }


    return (

        <section
            className="products"
            id="products"
        >


            {/* ========================================
                SECTION HEADER
            ======================================== */}

            <div className="section-heading">

                <p>
                    OUR PRODUCTS
                </p>

                <h2>
                    Explore Our Products
                </h2>

                <span>
                    Discover quality electronics
                    from Hena Electronics.
                </span>

            </div>


            {/* ========================================
                CATEGORY FILTER
            ======================================== */}

            <div className="product-filters">

                <button
                    className={
                        selectedCategory === "All"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setSelectedCategory("All")
                    }
                >
                    All
                </button>


                <button
                    className={
                        selectedCategory ===
                            "Smartphones"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setSelectedCategory(
                            "Smartphones"
                        )
                    }
                >
                    Smartphones
                </button>


                <button
                    className={
                        selectedCategory ===
                            "Laptops"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setSelectedCategory(
                            "Laptops"
                        )
                    }
                >
                    Laptops
                </button>


                <button
                    className={
                        selectedCategory ===
                            "Accessories"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setSelectedCategory(
                            "Accessories"
                        )
                    }
                >
                    Accessories
                </button>

            </div>


            {/* ========================================
                NO PRODUCTS
            ======================================== */}

            {filteredProducts.length === 0 ? (

                <div className="products-message">

                    <h3>
                        No products found
                    </h3>

                    <p>
                        There are currently no products
                        in this category.
                    </p>

                </div>

            ) : (


                /* ========================================
                   PRODUCT GRID
                ======================================== */

                <div className="products-grid">

                    {filteredProducts.map(
                        (product) => {


                            /* ================================
                               PRODUCT IMAGE
                            ================================= */

                            const productImage =
                                product.images &&
                                    product.images.length > 0
                                    ? product.images[0]
                                    : product.image;


                            /* ================================
                               DISCOUNTED PRICE
                            ================================= */

                            const discount =
                                Number(
                                    product.discount || 0
                                );


                            const originalPrice =
                                Number(
                                    product.price || 0
                                );


                            const discountedPrice =
                                discount > 0
                                    ? originalPrice -
                                    (
                                        originalPrice *
                                        discount
                                    ) /
                                    100
                                    : originalPrice;


                            return (

                                <article
                                    className="product-card"
                                    key={product.id}
                                >


                                    {/* ========================================
                                        IMAGE
                                    ======================================== */}

                                    <div className="product-image">

                                        {productImage ? (

                                            <img
                                                src={
                                                    productImage
                                                }
                                                alt={
                                                    product.productName
                                                }
                                            />

                                        ) : (

                                            <div className="product-no-image">

                                                <span>
                                                    📦
                                                </span>

                                                <p>
                                                    No Image
                                                </p>

                                            </div>

                                        )}


                                        {/* PROMOTION BADGE */}

                                        {product.promotion ===
                                            "active" &&
                                            discount > 0 && (

                                                <span className="product-promotion-badge">

                                                    -
                                                    {discount}
                                                    %

                                                </span>

                                            )}

                                    </div>


                                    {/* ========================================
                                        PRODUCT INFORMATION
                                    ======================================== */}

                                    <div className="product-info">


                                        <span className="product-category">

                                            {
                                                product.category
                                            }

                                        </span>


                                        <h3>

                                            {
                                                product.productName
                                            }

                                        </h3>


                                        {product.brand && (

                                            <p className="product-brand">

                                                {
                                                    product.brand
                                                }

                                            </p>

                                        )}


                                        {/* PRICE */}

                                        <div className="product-price">

                                            {product.promotion ===
                                                "active" &&
                                                discount > 0 ? (

                                                <>

                                                    <span className="product-old-price">

                                                        {originalPrice.toLocaleString()}
                                                        {" "}
                                                        ETB

                                                    </span>


                                                    <strong>

                                                        {discountedPrice.toLocaleString()}
                                                        {" "}
                                                        ETB

                                                    </strong>

                                                </>

                                            ) : (

                                                <strong>

                                                    {originalPrice.toLocaleString()}
                                                    {" "}
                                                    ETB

                                                </strong>

                                            )}

                                        </div>


                                        {/* AVAILABILITY */}

                                        <div className="product-availability">

                                            {product.availability ===
                                                "available" ? (

                                                <span className="available">

                                                    ● Available

                                                </span>

                                            ) : (

                                                <span className="out-of-stock">

                                                    ● Out of Stock

                                                </span>

                                            )}

                                        </div>


                                        {/* VIEW PRODUCT */}

                                        <Link
                                            to={`/product/${product.id}`}
                                            className="product-view-button"
                                        >

                                            View Product

                                            <span>
                                                →
                                            </span>

                                        </Link>

                                    </div>

                                </article>

                            );

                        }
                    )}

                </div>

            )}

        </section>

    );

}

export default Products;