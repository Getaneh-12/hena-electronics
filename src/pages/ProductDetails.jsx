import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        products,
        loading,
    } = useProducts();

    const product = products.find(
        (item) => String(item.id) === String(id)
    );

    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        if (!product) {
            return;
        }

        const productName =
            product.productName || "Product";

        const brand =
            product.brand || "";

        const model =
            product.model || "";

        const category =
            product.category || "Electronics";

        const description =
            product.description ||
            `${productName} available at Hena Electronics in Addis Ababa.`;

        const seoDescription =
            `${productName}${brand ? ` by ${brand}` : ""}${model ? ` ${model}` : ""} - ${description}`;

        const pageTitle =
            `${productName} | Hena Electronics`;

        const canonicalUrl =
            `https://hena-electronics.onrender.com/product/${product.id}`;

        document.title = pageTitle;

        let descriptionTag =
            document.querySelector(
                'meta[name="description"]'
            );

        if (!descriptionTag) {
            descriptionTag =
                document.createElement("meta");

            descriptionTag.setAttribute(
                "name",
                "description"
            );

            document.head.appendChild(
                descriptionTag
            );
        }

        descriptionTag.setAttribute(
            "content",
            seoDescription.slice(0, 160)
        );

        let canonicalTag =
            document.querySelector(
                'link[rel="canonical"]'
            );

        if (!canonicalTag) {
            canonicalTag =
                document.createElement("link");

            canonicalTag.setAttribute(
                "rel",
                "canonical"
            );

            document.head.appendChild(
                canonicalTag
            );
        }

        canonicalTag.setAttribute(
            "href",
            canonicalUrl
        );

        const setMetaProperty = (
            property,
            content
        ) => {
            let meta =
                document.querySelector(
                    `meta[property="${property}"]`
                );

            if (!meta) {
                meta =
                    document.createElement("meta");

                meta.setAttribute(
                    "property",
                    property
                );

                document.head.appendChild(meta);
            }

            meta.setAttribute(
                "content",
                content
            );
        };

        setMetaProperty(
            "og:title",
            pageTitle
        );

        setMetaProperty(
            "og:description",
            seoDescription.slice(0, 160)
        );

        setMetaProperty(
            "og:type",
            "product"
        );

        setMetaProperty(
            "og:url",
            canonicalUrl
        );

        setMetaProperty(
            "og:site_name",
            "Hena Electronics"
        );

        const structuredDataId =
            "hena-product-schema";

        const existingSchema =
            document.getElementById(
                structuredDataId
            );

        if (existingSchema) {
            existingSchema.remove();
        }

        const price =
            Number(product.price || 0);

        const discount =
            Number(product.discount || 0);

        const hasPromotion =
            product.promotion === "active" &&
            discount > 0;

        const finalPrice =
            hasPromotion
                ? price -
                (price * discount) / 100
                : price;

        const productImage =
            product.images &&
                product.images.length > 0
                ? product.images[0]
                : product.image;

        const absoluteImageUrl =
            productImage &&
                productImage.startsWith("http")
                ? productImage
                : productImage
                    ? `https://hena-electronics.onrender.com${productImage}`
                    : "";

        const productSchema = {
            "@context": "https://schema.org",
            "@type": "Product",
            name: productName,
            description: description,
            category: category,

            brand: brand
                ? {
                    "@type": "Brand",
                    name: brand,
                }
                : undefined,

            model: model || undefined,

            image: absoluteImageUrl
                ? [absoluteImageUrl]
                : undefined,

            url: canonicalUrl,

            offers: {
                "@type": "Offer",
                url: canonicalUrl,
                priceCurrency: "ETB",
                price: finalPrice.toFixed(2),

                availability:
                    product.availability ===
                        "available"
                        ? "https://schema.org/InStock"
                        : "https://schema.org/OutOfStock",

                seller: {
                    "@type": "Organization",
                    name: "Hena Electronics",
                },
            },
        };

        const schemaScript =
            document.createElement("script");

        schemaScript.id =
            structuredDataId;

        schemaScript.type =
            "application/ld+json";

        schemaScript.textContent =
            JSON.stringify(
                productSchema
            );

        document.head.appendChild(
            schemaScript
        );

        return () => {
            const schema =
                document.getElementById(
                    structuredDataId
                );

            if (schema) {
                schema.remove();
            }
        };
    }, [product]);

    useEffect(() => {
        setSelectedImage(0);
    }, [id]);

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

    if (!product) {
        return (
            <div className="product-details-page">
                <div className="product-details-container">

                    <button
                        type="button"
                        className="back-button"
                        onClick={() =>
                            navigate("/#products")
                        }
                    >
                        ← Back to Products
                    </button>

                    <div className="product-not-found">

                        <div className="product-empty-icon">
                            📦
                        </div>

                        <h1>
                            Product Not Found
                        </h1>

                        <p>
                            This product may have been
                            removed or is no longer
                            available.
                        </p>

                        <button
                            type="button"
                            className="product-details-button"
                            onClick={() =>
                                navigate("/#products")
                            }
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

    const safeSelectedImage =
        selectedImage < images.length
            ? selectedImage
            : 0;

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
            (originalPrice * discount) / 100
            : originalPrice;

    const amountSaved =
        originalPrice -
        discountedPrice;

    const mainImageAlt =
        product.brand &&
            product.model
            ? `${product.brand} ${product.model} ${product.productName} - Hena Electronics`
            : product.brand
                ? `${product.brand} ${product.productName} - Hena Electronics`
                : `${product.productName} - Hena Electronics`;

    const handleBackToProducts = () => {
        navigate("/#products");

        setTimeout(() => {
            const productsSection =
                document.getElementById(
                    "products"
                );

            if (productsSection) {
                productsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
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
                                    src={
                                        images[
                                        safeSelectedImage
                                        ]
                                    }
                                    alt={
                                        mainImageAlt
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

                            {hasPromotion && (
                                <span
                                    className="details-sale-badge"
                                    aria-label={`Discount ${discount}%`}
                                >
                                    -{discount}%
                                </span>
                            )}

                        </div>

                        {images.length > 1 && (
                            <div
                                className="product-thumbnails"
                                aria-label="Product images"
                            >

                                {images.map(
                                    (
                                        image,
                                        index
                                    ) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className={
                                                safeSelectedImage ===
                                                    index
                                                    ? "product-thumbnail active"
                                                    : "product-thumbnail"
                                            }
                                            onClick={() =>
                                                setSelectedImage(
                                                    index
                                                )
                                            }
                                            aria-label={`View ${product.productName} image ${index + 1}`}
                                            aria-pressed={
                                                safeSelectedImage ===
                                                index
                                            }
                                        >

                                            <img
                                                src={image}
                                                alt={`${product.productName} product image ${index + 1}`}
                                                loading="lazy"
                                            />

                                        </button>
                                    )
                                )}

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

                        {product.model && (
                            <p className="product-details-model">

                                Model:

                                <strong>
                                    {" "}
                                    {product.model}
                                </strong>

                            </p>
                        )}

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

                                        {amountSaved.toLocaleString()}

                                        {" "}ETB

                                    </div>
                                </>
                            ) : (
                                <strong className="product-normal-price">
                                    {originalPrice.toLocaleString()} ETB
                                </strong>
                            )}

                        </div>

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

                        <div className="product-details-divider"></div>

                        {product.description && (
                            <div className="product-description">

                                <h2>
                                    Product Description
                                </h2>

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

                                    <h2>
                                        Specifications
                                    </h2>

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

                            <h2>
                                Interested in this product?
                            </h2>

                            <p>
                                Contact Hena Electronics
                                to check availability and
                                place your order.
                            </p>

                            <div className="product-contact-buttons">

                                <a
                                    href="tel:+251990239030"
                                    className="product-call-button"
                                    aria-label="Call Hena Electronics"
                                >
                                    <span>
                                        📞
                                    </span>

                                    Call Us
                                    {" "}
                                    +251990239030
                                </a>

                                <a
                                    href="https://t.me/Hena_Mobile"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="product-telegram-button"
                                    aria-label="Contact Hena Electronics on Telegram"
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