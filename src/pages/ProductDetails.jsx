import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

function ProductDetails() {

    const { id } = useParams();

    const { products, loading } = useProducts();

    const product = products.find(
        (item) =>
            String(item.id) === String(id)
    );

    const [selectedImage, setSelectedImage] =
        useState(0);


    /* ========================================
       LOADING
    ======================================== */

    if (loading) {

        return (
            <div className="product-details-page">

                <div className="product-details-container">

                    <div className="product-details-loading">

                        <div className="loading-spinner"></div>

                        <p>
                            Loading product...
                        </p>

                    </div>

                </div>

            </div>
        );
    }


    /* ========================================
       PRODUCT NOT FOUND
    ======================================== */

    if (!product) {

        return (

            <div className="product-details-page">

                <div className="product-details-container">

                    <Link
                        to="/"
                        className="back-button"
                    >
                        ← Back to Products
                    </Link>


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

                        <Link
                            to="/"
                            className="product-details-button"
                        >
                            Back to Products
                        </Link>

                    </div>

                </div>

            </div>

        );
    }


    /* ========================================
       PRODUCT IMAGES
    ======================================== */

    const images =
        product.images &&
            product.images.length > 0
            ? product.images
            : product.image
                ? [product.image]
                : [];


    /* ========================================
       PRICE
    ======================================== */

    const originalPrice =
        Number(product.price || 0);

    const discount =
        Number(product.discount || 0);

    const hasPromotion =
        product.promotion === "active" &&
        discount > 0;

    const discountedPrice =
        hasPromotion
            ? originalPrice -
            (
                originalPrice *
                discount /
                100
            )
            : originalPrice;

    const amountSaved =
        originalPrice -
        discountedPrice;


    return (

        <div className="product-details-page">


            {/* ========================================
                MAIN CONTAINER
            ======================================== */}

            <div className="product-details-container">


                {/* ========================================
                    BACK
                ======================================== */}

                <Link
                    to="/"
                    className="back-button"
                >
                    ← Back to Products
                </Link>


                {/* ========================================
                    PRODUCT CONTENT
                ======================================== */}

                <div className="product-details-content">


                    {/* ========================================
                        LEFT SIDE - IMAGES
                    ======================================== */}

                    <div className="product-details-images">


                        {/* MAIN IMAGE */}

                        <div className="product-main-image">

                            {images.length > 0 ? (

                                <img
                                    src={
                                        images[selectedImage]
                                    }
                                    alt={
                                        product.productName
                                    }
                                />

                            ) : (

                                <div className="product-image-placeholder">

                                    <span>
                                        📦
                                    </span>

                                    <p>
                                        No image available
                                    </p>

                                </div>

                            )}


                            {/* PROMOTION */}

                            {hasPromotion && (

                                <span className="details-sale-badge">

                                    -
                                    {discount}
                                    %

                                </span>

                            )}

                        </div>


                        {/* THUMBNAILS */}

                        {images.length > 1 && (

                            <div className="product-thumbnails">

                                {images.map(
                                    (image, index) => (

                                        <button
                                            key={index}
                                            type="button"
                                            className={
                                                selectedImage === index
                                                    ? "product-thumbnail active"
                                                    : "product-thumbnail"
                                            }
                                            onClick={() =>
                                                setSelectedImage(
                                                    index
                                                )
                                            }
                                        >

                                            <img
                                                src={image}
                                                alt={`${product.productName} ${index + 1}`}
                                            />

                                        </button>

                                    )
                                )}

                            </div>

                        )}

                    </div>


                    {/* ========================================
                        RIGHT SIDE - INFORMATION
                    ======================================== */}

                    <div className="product-details-info">


                        {/* CATEGORY */}

                        <span className="product-details-category">

                            {product.category}

                        </span>


                        {/* PRODUCT NAME */}

                        <h1>
                            {product.productName}
                        </h1>


                        {/* BRAND */}

                        {product.brand && (

                            <p className="product-details-brand">

                                Brand:
                                <strong>
                                    {" "}
                                    {product.brand}
                                </strong>

                            </p>

                        )}


                        {/* RATING PLACEHOLDER */}

                        <div className="product-details-meta">

                            <span>
                                ★★★★★
                            </span>

                            <span>
                                Premium Electronics
                            </span>

                        </div>


                        {/* PRICE */}

                        <div className="product-details-price">


                            {hasPromotion ? (

                                <>

                                    <div className="product-details-price-row">

                                        <strong className="product-sale-price">

                                            {discountedPrice.toLocaleString()}
                                            {" "}
                                            ETB

                                        </strong>


                                        <span className="product-original-price">

                                            {originalPrice.toLocaleString()}
                                            {" "}
                                            ETB

                                        </span>

                                    </div>


                                    <div className="product-savings">

                                        Save{" "}
                                        {amountSaved.toLocaleString()}
                                        {" "}
                                        ETB

                                    </div>

                                </>

                            ) : (

                                <strong className="product-normal-price">

                                    {originalPrice.toLocaleString()}
                                    {" "}
                                    ETB

                                </strong>

                            )}

                        </div>


                        {/* AVAILABILITY */}

                        <div className="product-details-stock">

                            {product.availability ===
                                "available" ? (

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


                        {/* DIVIDER */}

                        <div className="product-details-divider"></div>


                        {/* DESCRIPTION */}

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


                        {/* ========================================
                            SPECIFICATIONS
                        ======================================== */}

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


                        {/* ========================================
                            CONTACT
                        ======================================== */}

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
                                    href="tel:+251956229470"
                                    className="product-call-button"
                                >
                                    <span>
                                        📞
                                    </span>

                                    Call Us
                                    +251990239030

                                </a>


                                <a
                                    href="https://t.me/PCandphone4u"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="product-telegram-button"
                                >
                                    <span>
                                        ✈
                                    </span>

                                    Telegram group


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