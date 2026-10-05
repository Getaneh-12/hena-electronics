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

    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter(
                (product) =>
                    product.category ===
                    selectedCategory
            );

    if (loading) {
        return (
            <section
                className="products"
                id="products"
            >
                <div className="section-heading">
                    <p>OUR PRODUCTS</p>

                    <h2>
                        Explore Our Products
                    </h2>

                    <span>
                        Discover quality electronics
                        from Hena Electronics in Addis Ababa.
                    </span>
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

    if (error) {
        return (
            <section
                className="products"
                id="products"
            >
                <div className="section-heading">
                    <p>OUR PRODUCTS</p>

                    <h2>
                        Explore Our Products
                    </h2>

                    <span>
                        Discover quality electronics
                        from Hena Electronics in Addis Ababa.
                    </span>
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
            <div className="section-heading">
                <p>OUR PRODUCTS</p>

                <h2>
                    Explore Our Products
                </h2>

                <span>
                    Discover smartphones, laptops,
                    computers, accessories, and quality
                    electronics from Hena Electronics
                    in Addis Ababa.
                </span>
            </div>

            <div className="product-filters">
                <button
                    type="button"
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
                    type="button"
                    className={
                        selectedCategory === "Smartphones"
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
                    type="button"
                    className={
                        selectedCategory === "Laptops"
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
                    type="button"
                    className={
                        selectedCategory === "Accessories"
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
                <div className="products-grid">
                    {filteredProducts.map(
                        (product) => {
                            const productImage =
                                product.images &&
                                    product.images.length > 0
                                    ? product.images[0]
                                    : product.image;

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

                            const productImageAlt =
                                product.brand &&
                                    product.model
                                    ? `${product.brand} ${product.model} - ${product.productName} | Hena Electronics`
                                    : `${product.productName} | Hena Electronics`;

                            return (
                                <article
                                    className="product-card"
                                    key={product.id}
                                >
                                    <div className="product-image">
                                        {productImage ? (
                                            <img
                                                src={
                                                    productImage
                                                }
                                                alt={
                                                    productImageAlt
                                                }
                                                loading="lazy"
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

                                        {product.promotion ===
                                            "active" &&
                                            discount > 0 && (
                                                <span
                                                    className="product-promotion-badge"
                                                    aria-label={`Discount ${discount}%`}
                                                >
                                                    -
                                                    {discount}
                                                    %
                                                </span>
                                            )}
                                    </div>

                                    <div className="product-info">
                                        <span className="product-category">
                                            {product.category}
                                        </span>

                                        <h3>
                                            <Link
                                                to={`/product/${product.id}`}
                                                className="product-title-link"
                                            >
                                                {
                                                    product.productName
                                                }
                                            </Link>
                                        </h3>

                                        {product.brand && (
                                            <p className="product-brand">
                                                Brand:{" "}
                                                {
                                                    product.brand
                                                }
                                            </p>
                                        )}

                                        {(product.model ||
                                            product.storage ||
                                            product.ram) && (
                                                <p className="product-details-summary">
                                                    {product.model &&
                                                        `Model: ${product.model}`}

                                                    {product.storage &&
                                                        ` • ${product.storage}`}

                                                    {product.ram &&
                                                        ` • ${product.ram}`}
                                                </p>
                                            )}

                                        <div className="product-price">
                                            {product.promotion ===
                                                "active" &&
                                                discount > 0 ? (
                                                <>
                                                    <strong>
                                                        {discountedPrice.toLocaleString()}
                                                        {" "}
                                                        ETB
                                                    </strong>

                                                    <span className="product-old-price">
                                                        {originalPrice.toLocaleString()}
                                                        {" "}
                                                        ETB
                                                    </span>
                                                </>
                                            ) : (
                                                <strong>
                                                    {originalPrice.toLocaleString()}
                                                    {" "}
                                                    ETB
                                                </strong>
                                            )}
                                        </div>

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

                                        <Link
                                            to={`/product/${product.id}`}
                                            className="product-view-button"
                                            aria-label={`View details for ${product.productName}`}
                                        >
                                            View Product

                                            <span aria-hidden="true">
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