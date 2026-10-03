import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import henaLogo from "../assets/hena-logo.png";

function AdminPromotions() {
    const {
        products,
        removePromotion,
    } = useProducts();

    const [removeId, setRemoveId] = useState(null);

    const [message, setMessage] = useState({
        type: "",
        text: "",
    });

    const promotionProducts = products.filter(
        (product) =>
            product.promotion === "active"
    );

    const totalPromotions =
        promotionProducts.length;

    const totalDiscount =
        promotionProducts.reduce(
            (total, product) =>
                total +
                Number(product.discount || 0),
            0
        );

    const averageDiscount =
        totalPromotions > 0
            ? Math.round(
                totalDiscount /
                totalPromotions
            )
            : 0;

    const handleRemovePromotion = (id) => {
        setRemoveId(id);
    };

    const confirmRemovePromotion = async () => {
        if (removeId === null) {
            return;
        }

        try {
            const result =
                await removePromotion(removeId);

            setMessage({
                type: "success",
                text:
                    result?.message ||
                    "Promotion removed successfully.",
            });

            setRemoveId(null);

            setTimeout(() => {
                setMessage({
                    type: "",
                    text: "",
                });
            }, 3000);
        } catch (error) {
            console.error(
                "Remove promotion error:",
                error
            );

            setMessage({
                type: "error",
                text:
                    error.message ||
                    "Failed to remove promotion.",
            });

            setRemoveId(null);

            setTimeout(() => {
                setMessage({
                    type: "",
                    text: "",
                });
            }, 3000);
        }
    };

    const cancelRemovePromotion = () => {
        setRemoveId(null);
    };

    return (
        <div className="admin-dashboard">

            <aside className="admin-sidebar">

                <div className="admin-brand">

                    <div className="admin-brand-logo">
                        <img
                            src={henaLogo}
                            alt="Hena Electronics"
                        />
                    </div>

                    <div>
                        <h2>
                            Hena Electronics
                        </h2>

                        <span>
                            Admin Panel
                        </span>
                    </div>

                </div>

                <nav className="admin-nav">

                    <Link to="/admin">
                        Dashboard
                    </Link>

                    <Link to="/admin/products">
                        Products
                    </Link>

                    <Link
                        to="/admin/promotions"
                        className="active"
                    >
                        Promotions
                    </Link>

                    <Link to="/">
                        View Website
                    </Link>

                </nav>

            </aside>

            <main className="admin-main">

                <div className="admin-header">

                    <div>

                        <p className="admin-label">
                            PROMOTION MANAGEMENT
                        </p>

                        <h1>
                            Promotions
                        </h1>

                        <p>
                            Manage discounts and promotional products.
                        </p>

                    </div>

                    <Link
                        to="/admin/products/add"
                        className="admin-view-button"
                    >
                        + Add Promotion
                    </Link>

                </div>

                {message.text && (
                    <div
                        className={`admin-message ${message.type}`}
                    >
                        <div className="admin-message-icon">
                            {message.type ===
                                "success"
                                ? "✓"
                                : "!"}
                        </div>

                        <div>
                            <strong>
                                {message.type ===
                                    "success"
                                    ? "Success"
                                    : "Error"}
                            </strong>

                            <p>
                                {message.text}
                            </p>
                        </div>

                    </div>
                )}

                <div className="admin-stats">

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            🎉
                        </div>

                        <div>
                            <span>
                                Active Promotions
                            </span>

                            <strong>
                                {totalPromotions}
                            </strong>
                        </div>

                    </div>

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            🏷️
                        </div>

                        <div>
                            <span>
                                Average Discount
                            </span>

                            <strong>
                                {averageDiscount}%
                            </strong>
                        </div>

                    </div>

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            📦
                        </div>

                        <div>
                            <span>
                                Promotional Products
                            </span>

                            <strong>
                                {promotionProducts.length}
                            </strong>
                        </div>

                    </div>

                </div>

                <section className="admin-section">

                    <div className="admin-section-heading">

                        <div>

                            <p>
                                CURRENT OFFERS
                            </p>

                            <h2>
                                Active Promotions
                            </h2>

                        </div>

                    </div>

                    {promotionProducts.length ===
                        0 ? (

                        <div className="admin-empty-products">

                            <div className="admin-empty-icon">
                                🎉
                            </div>

                            <h3>
                                No Active Promotions
                            </h3>

                            <p>
                                Products with active discounts
                                will appear here.
                            </p>

                            <Link
                                to="/admin/products/add"
                                className="admin-view-button"
                            >
                                Add Promotional Product
                            </Link>

                        </div>

                    ) : (

                        <div className="admin-promotion-grid">

                            {promotionProducts.map(
                                (product) => {

                                    const originalPrice =
                                        Number(
                                            product.price ||
                                            0
                                        );

                                    const discount =
                                        Number(
                                            product.discount ||
                                            0
                                        );

                                    const discountedPrice =
                                        originalPrice -
                                        (
                                            originalPrice *
                                            discount /
                                            100
                                        );

                                    return (
                                        <div
                                            className="admin-promotion-card"
                                            key={product.id}
                                        >

                                            <div className="admin-promotion-image">

                                                {product.images &&
                                                    product.images.length >
                                                    0 ? (

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

                                                    <div className="admin-promotion-placeholder">
                                                        📦
                                                    </div>

                                                )}

                                                <span className="admin-discount-badge">
                                                    🔥{" "}
                                                    {discount}%
                                                    OFF
                                                </span>

                                            </div>

                                            <div className="admin-promotion-content">

                                                <p className="admin-promotion-category">
                                                    {
                                                        product.category
                                                    }
                                                </p>

                                                <h3>
                                                    {
                                                        product.productName
                                                    }
                                                </h3>

                                                <span className="admin-promotion-image-count">
                                                    📷{" "}

                                                    {product.images &&
                                                        product.images.length >
                                                        0
                                                        ? `${product.images.length} images`
                                                        : product.image
                                                            ? "1 image"
                                                            : "No image"}
                                                </span>

                                                <div className="admin-promotion-price">

                                                    <div>

                                                        <span className="admin-original-price">
                                                            Original Price
                                                        </span>

                                                        <strong className="admin-original-price-value">
                                                            {originalPrice.toLocaleString()}{" "}
                                                            ETB
                                                        </strong>

                                                    </div>

                                                    <div>

                                                        <span className="admin-sale-price-label">
                                                            Sale Price
                                                        </span>

                                                        <strong className="admin-sale-price">
                                                            {discountedPrice.toLocaleString()}{" "}
                                                            ETB
                                                        </strong>

                                                    </div>

                                                </div>

                                                <div className="admin-promotion-discount-info">

                                                    You save{" "}

                                                    <strong>
                                                        {(
                                                            originalPrice -
                                                            discountedPrice
                                                        ).toLocaleString()}{" "}
                                                        ETB
                                                    </strong>

                                                </div>

                                                <div className="admin-promotion-actions">

                                                    <Link
                                                        to={`/admin/products/edit/${product.id}`}
                                                        className="admin-edit-button"
                                                    >
                                                        Edit Promotion
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        className="admin-delete-button"
                                                        onClick={() =>
                                                            handleRemovePromotion(
                                                                product.id
                                                            )
                                                        }
                                                    >
                                                        Remove Promotion
                                                    </button>

                                                </div>

                                            </div>

                                        </div>
                                    );
                                }
                            )}

                        </div>
                    )}

                </section>

            </main>

            {removeId !== null && (

                <div className="product-delete-overlay">

                    <div
                        className="product-delete-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="product-delete-icon">
                            🔥
                        </div>

                        <h2>
                            Remove Promotion?
                        </h2>

                        <p>
                            This will remove the discount from
                            the product. The product itself will
                            not be deleted.
                        </p>

                        <div className="product-delete-actions">

                            <button
                                type="button"
                                className="product-delete-cancel"
                                onClick={
                                    cancelRemovePromotion
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="product-delete-confirm"
                                onClick={
                                    confirmRemovePromotion
                                }
                            >
                                Remove Promotion
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default AdminPromotions;