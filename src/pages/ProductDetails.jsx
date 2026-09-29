import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

function ProductDetails() {

    const { id } = useParams();

    const { products } = useProducts();

    const product = products.find(
        (item) =>
            String(item.id) === String(id)
    );

    const [selectedImage, setSelectedImage] = useState(0);


    // Product not found
    if (!product) {

        return (
            <div className="product-details-page">

                <div className="product-details-container">

                    <Link
                        to="/"
                        className="back-button"
                    >
                        ← Back to Home
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


    // Product images
    const images =
        product.images &&
            product.images.length > 0
            ? product.images
            : product.image
                ? [product.image]
                : [];


    // Price calculation
    const originalPrice =
        Number(product.price || 0);

    const discount =
        Number(product.discount || 0);

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

        <div className="product-details-page">

            <div className="product-details-container">


                {/* BACK BUTTON */}

                <Link
                    to="/"
                    className="back-button"
                >
                    ← Back to Products
                </Link>



                <div className="product-details-content">


                    {/* ================================
                        PRODUCT IMAGES
                    ================================= */}

                    <div className="product-details-images">


                        <div className="product-main-image">

                            {images.length > 0 ? (

                                <img
                                    src={images[selectedImage]}
                                    alt={product.productName}
                                />

                            ) : (

                                <div className="product-image-placeholder">
                                    📦
                                </div>

                            )}

                        </div>


                        {/* IMAGE THUMBNAILS */}

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
                                                setSelectedImage(index)
                                            }
                                        >

                                            <img
                                                src={image}
                                                alt={
                                                    `${product.productName} ${index + 1} `
                                                }
                                            />

                                        </button>

                                    )
                                )}

                            </div>

                        )}

                    </div>



                    {/* ================================
                        PRODUCT INFORMATION
                    ================================= */}

                    <div className="product-details-info">


                        {/* CATEGORY */}

                        <p className="product-details-category">
                            {product.category}
                        </p>


                        {/* PRODUCT NAME */}

                        <h1>
                            {product.productName}
                        </h1>



                        {/* PROMOTION */}

                        {product.promotion === "active" && (

                            <span className="product-details-discount-badge">
                                🔥 {discount}% OFF
                            </span>

                        )}



                        {/* PRICE */}

                        <div className="product-details-price">

                            {product.promotion === "active" ? (

                                <div className="product-promotion-price">

                                    <span className="product-original-price">
                                        {originalPrice.toLocaleString()} ETB
                                    </span>

                                    <strong className="product-sale-price">
                                        {discountedPrice.toLocaleString()} ETB
                                    </strong>

                                    <div className="product-savings">

                                        Save {amountSaved.toLocaleString()} ETB

                                        <span>
                                            You get {discount}% off
                                        </span>

                                    </div>

                                </div>

                            ) : (

                                <strong className="product-normal-price">
                                    {originalPrice.toLocaleString()} ETB
                                </strong>

                            )}

                        </div>



                        {/* AVAILABILITY */}

                        <div className="product-availability">

                            {product.availability === "available" ? (

                                <span className="available">
                                    ● In Stock
                                </span>

                            ) : (

                                <span className="unavailable">
                                    ● Out of Stock
                                </span>

                            )}

                        </div>



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



                        {/* ================================
                            PRODUCT SPECIFICATIONS
                        ================================= */}

                        <div className="product-specifications">

                            <h3>
                                Product Information
                            </h3>


                            {product.brand && (

                                <div className="product-spec-row">

                                    <span>
                                        Brand
                                    </span>

                                    <strong>
                                        {product.brand}
                                    </strong>

                                </div>

                            )}


                            {product.model && (

                                <div className="product-spec-row">

                                    <span>
                                        Model
                                    </span>

                                    <strong>
                                        {product.model}
                                    </strong>

                                </div>

                            )}


                            {product.storage && (

                                <div className="product-spec-row">

                                    <span>
                                        Storage
                                    </span>

                                    <strong>
                                        {product.storage}
                                    </strong>

                                </div>

                            )}


                            {product.ram && (

                                <div className="product-spec-row">

                                    <span>
                                        RAM
                                    </span>

                                    <strong>
                                        {product.ram}
                                    </strong>

                                </div>

                            )}

                        </div>



                        {/* ================================
                            CONTACT BUTTONS
                        ================================= */}

                        <div className="product-contact-buttons">

                            <a
                                href="tel:+251900000000"
                                className="product-call-button"
                            >
                                📞 Call Us
                                +251956229470
                            </a>


                            <a
                                href="https://t.me/PCandphone4u"
                                target="_blank"
                                rel="noreferrer"
                                className="product-telegram-button"
                            >
                                ✈ Telegram group
                            </a>

                        </div>


                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProductDetails;