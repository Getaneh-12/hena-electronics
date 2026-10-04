import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, loading } = useProducts();

    const product = products.find(
        (item) => String(item.id) === String(id)
    );

    const [selectedImage, setSelectedImage] = useState(0);

    if (loading) {
        return (
            <div className="product-details-page">
                <div className="product-details-container">
                    <div className="product-details-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading product...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-details-page">
                <div className="product-details-container">

                    <button
                        type="button"
                        className="back-button"
                        onClick={() => navigate("/#products")}
                    >
                        ← Back to Products
                    </button>

                    <div className="product-not-found">

                        <div className="product-empty-icon">
                            📦
                        </div>

                        <h2>
                            Product Not Found
                        </h2>

                        <p>
                            This product may have been removed
                            or is no longer available.
                        </p>

                        <button
                            type="button"
                            className="product-details-button"
                            onClick={() => navigate("/#products")}
                        >
                            Back to Products
                        </button>

                    </div>
                </div>
            </div>
        );
    }

    const images =
        product.images &&
            product.images.length > 0
            ? product.images
            : product.image
                ? [product.image]
                : [];

    const originalPrice = Number(product.price || 0);
    const discount = Number(product.discount || 0);

    const hasPromotion =
        product.promotion === "active" &&
        discount > 0;

    const discountedPrice = hasPromotion
        ? originalPrice - (originalPrice * discount) / 100
        : originalPrice;

    const amountSaved =
        originalPrice - discountedPrice;

    const handleBackToProducts = () => {
        navigate("/#products");

        setTimeout(() => {
            const productsSection =
                document.getElementById("products");

            if (productsSection) {
                productsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }, 100);
    };

    return (
        <div className="product-details-page">

            <div className="product-details-container">

                <button
                    type="button"
                    className="back-button"
                    onClick={handleBackToProducts}
                >
                    ← Back to Products
                </button>

                <div className="product-details-content">

                    <div className="product-details-images">

                        <div className="product-main-image">

                            {images.length > 0 ? (
                                <img
                                    src={images[selectedImage]}
                                    alt={product.productName}
                                />
                            ) : (
                                <div className="product-image-placeholder">
                                    <span>📦</span>
                                    <p>
                                        No image available
                                    </p>
                                </div>
                            )}

                            {hasPromotion && (
                                <span className="details-sale-badge">
                                    -{discount}%
                                </span>
                            )}

                        </div>

                        {images.length > 1 && (
                            <div className="product-thumbnails">

                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={
                                            selectedImage === index
                                                ? "product-thumbnail active"
                                                : "product-thumbnail"
                                        }
                                        onClick={() =>
                                            setSelectedImage(index)
                                        }
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.productName} ${index + 1}`}
                                        />
                                    </button>
                                ))}

                            </div>
                        )}

                    </div>

                    <div className="product-details-info">

                        <span className="product-details-category">
                            {product.category}
                        </span>

                        <h1>
                            {product.productName}
                        </h1>

                        {product.brand && (
                            <p className="product-details-brand">
                                Brand:
                                <strong>
                                    {" "}
                                    {product.brand}
                                </strong>
                            </p>
                        )}

                        <div className="product-details-meta">
                            <span>
                                ★★★★★
                            </span>

                            <span>
                                Premium Electronics
                            </span>
                        </div>

                        <div className="product-details-price">

                            {hasPromotion ? (
                                <>
                                    <div className="product-details-price-row">

                                        <strong className="product-sale-price">
                                            {discountedPrice.toLocaleString()} ETB
                                        </strong>

                                        <span className="product-original-price">
                                            {originalPrice.toLocaleString()} ETB
                                        </span>

                                    </div>

                                    <div className="product-savings">
                                        Save{" "}
                                        {amountSaved.toLocaleString()} ETB
                                    </div>
                                </>
                            ) : (
                                <strong className="product-normal-price">
                                    {originalPrice.toLocaleString()} ETB
                                </strong>
                            )}

                        </div>

                        <div className="product-details-stock">

                            {product.availability === "available" ? (
                                <>
                                    <span className="stock-dot available"></span>

                                    <strong>
                                        In Stock
                                    </strong>

                                    <span>
                                        Ready to order
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="stock-dot unavailable"></span>

                                    <strong>
                                        Out of Stock
                                    </strong>
                                </>
                            )}

                        </div>

                        <div className="product-details-divider"></div>

                        {product.description && (
                            <div className="product-description">

                                <h3>
                                    Description
                                </h3>

                                <p>
                                    {product.description}
                                </p>

                            </div>
                        )}

                        {(product.brand ||
                            product.model ||
                            product.storage ||
                            product.ram) && (
                                <div className="product-specifications">

                                    <h3>
                                        Specifications
                                    </h3>

                                    <div className="product-spec-grid">

                                        {product.brand && (
                                            <div className="product-spec-card">
                                                <span>
                                                    Brand
                                                </span>

                                                <strong>
                                                    {product.brand}
                                                </strong>
                                            </div>
                                        )}

                                        {product.model && (
                                            <div className="product-spec-card">
                                                <span>
                                                    Model
                                                </span>

                                                <strong>
                                                    {product.model}
                                                </strong>
                                            </div>
                                        )}

                                        {product.storage && (
                                            <div className="product-spec-card">
                                                <span>
                                                    Storage
                                                </span>

                                                <strong>
                                                    {product.storage}
                                                </strong>
                                            </div>
                                        )}

                                        {product.ram && (
                                            <div className="product-spec-card">
                                                <span>
                                                    RAM
                                                </span>

                                                <strong>
                                                    {product.ram}
                                                </strong>
                                            </div>
                                        )}

                                    </div>

                                </div>
                            )}

                        <div className="product-contact-section">

                            <h3>
                                Interested in this product?
                            </h3>

                            <p>
                                Contact Hena Electronics
                                to check availability and
                                place your order.
                            </p>

                            <div className="product-contact-buttons">

                                <a
                                    href="tel:+251990239030"
                                    className="product-call-button"
                                >
                                    <span>
                                        📞
                                    </span>

                                    Call Us
                                    +251990239030
                                </a>

                                <a
                                    href="https://t.me/Hena_Mobile"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="product-telegram-button"
                                >
                                    <span>
                                        ✈
                                    </span>

                                    Contact via Telegram
                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProductDetails;