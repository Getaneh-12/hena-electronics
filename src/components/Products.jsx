import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";


function Products({
    selectedCategory,
    setSelectedCategory,
}) {

    const { products } = useProducts();


    const categories = [
        "All",
        "Smartphones",
        "Laptops",
        "Accessories",
    ];


    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter(
                (product) =>
                    product.category === selectedCategory
            );


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

                <span>
                    Browse smartphones, laptops and accessories
                    available at Hena Electronics.
                </span>

            </div>


            {/* CATEGORY FILTER */}

            <div className="product-filter">

                {categories.map(
                    (category) => (

                        <button
                            key={category}
                            type="button"
                            className={
                                selectedCategory === category
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setSelectedCategory(category)
                            }
                        >

                            {category === "All"
                                ? "All Products"
                                : category}

                        </button>

                    )
                )}

            </div>


            {/* NO PRODUCTS */}

            {filteredProducts.length === 0 ? (

                <div className="product-empty">

                    <div className="product-empty-icon">
                        📦
                    </div>

                    <h3>
                        {selectedCategory === "All"
                            ? "Products Coming Soon"
                            : `${selectedCategory} Coming Soon`}
                    </h3>

                    <p>
                        Our latest products will be displayed here.
                        Please check our Telegram channel for current
                        products and offers.
                    </p>

                    <a
                        href="https://t.me/PCandphone4u"
                        target="_blank"
                        rel="noreferrer"
                        className="product-telegram-button"
                    >
                        View Products on Telegram →
                    </a>

                </div>

            ) : (

                <div className="products-grid">

                    {filteredProducts.map(
                        (product) => {

                            const originalPrice =
                                Number(
                                    product.price || 0
                                );


                            const discount =
                                Number(
                                    product.discount || 0
                                );


                            const discountedPrice =
                                originalPrice -
                                (
                                    originalPrice *
                                    discount /
                                    100
                                );


                            const amountSaved =
                                originalPrice -
                                discountedPrice;


                            return (

                                <div
                                    className="product-card"
                                    key={product.id}
                                >

                                    {/* PRODUCT IMAGE */}

                                    <div className="product-card-image">

                                        {product.images &&
                                            product.images.length > 0 ? (

                                            <img
                                                src={
                                                    product.images[0]
                                                }
                                                alt={
                                                    product.productName
                                                }
                                            />

                                        ) : product.image ? (

                                            <img
                                                src={
                                                    product.image
                                                }
                                                alt={
                                                    product.productName
                                                }
                                            />

                                        ) : (

                                            <div className="product-image-placeholder">
                                                📦
                                            </div>

                                        )}


                                        {/* DISCOUNT */}

                                        {product.promotion ===
                                            "active" && (

                                                <span className="product-discount-badge">

                                                    🔥{" "}
                                                    {discount}% OFF

                                                </span>

                                            )}

                                    </div>


                                    {/* PRODUCT INFORMATION */}

                                    <div className="product-card-content">

                                        <p className="product-category">
                                            {product.category}
                                        </p>


                                        <h3>
                                            {product.productName}
                                        </h3>


                                        {/* PRICE */}

                                        <div className="product-card-price">

                                            {product.promotion ===
                                                "active" ? (

                                                <div className="product-card-promotion-price">

                                                    <span className="product-card-original-price">

                                                        {originalPrice.toLocaleString()}
                                                        {" "}
                                                        ETB

                                                    </span>


                                                    <strong className="product-card-sale-price">

                                                        {discountedPrice.toLocaleString()}
                                                        {" "}
                                                        ETB

                                                    </strong>


                                                    <small className="product-card-savings">

                                                        Save{" "}
                                                        {amountSaved.toLocaleString()}
                                                        {" "}
                                                        ETB

                                                    </small>

                                                </div>

                                            ) : (

                                                <strong className="product-card-normal-price">

                                                    {originalPrice.toLocaleString()}
                                                    {" "}
                                                    ETB

                                                </strong>

                                            )}

                                        </div>


                                        {/* DETAILS BUTTON */}

                                        <Link
                                            to={`/product/${product.id}`}
                                            className="product-details-button"
                                        >
                                            View Details
                                        </Link>

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>

            )}

        </section>
    );
}


export default Products;