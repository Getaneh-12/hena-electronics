import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

function AdminPromotions() {

    const { products, removePromotion } = useProducts();

    const [removeId, setRemoveId] = useState(null);


    // ========================================
    // PROMOTIONAL PRODUCTS
    // ========================================

    const promotionProducts = products.filter(
        (product) => product.promotion === "active"
    );


    // ========================================
    // STATISTICS
    // ========================================

    const totalPromotions = promotionProducts.length;

    const totalDiscount = promotionProducts.reduce(
        (total, product) =>
            total + Number(product.discount || 0),
        0
    );

    const averageDiscount =
        totalPromotions > 0
            ? Math.round(
                totalDiscount / totalPromotions
            )
            : 0;


    // ========================================
    // REMOVE PROMOTION
    // ========================================

    const handleRemovePromotion = (id) => {

        setRemoveId(id);

    };


    const confirmRemovePromotion = () => {

        if (removeId !== null) {

            removePromotion(removeId);

        }

        setRemoveId(null);

    };


    const cancelRemovePromotion = () => {

        setRemoveId(null);

    };


    return (

        <div className="admin-dashboard">


            {/* ========================================
                SIDEBAR
            ======================================== */}

            <aside className="admin-sidebar">

                <div className="admin-brand">

                    <div className="admin-brand-logo">
                        H
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



            {/* ========================================
                MAIN CONTENT
            ======================================== */}

            <main className="admin-main">


                {/* ========================================
                    HEADER
                ======================================== */}

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



                {/* ========================================
                    STATISTICS
                ======================================== */}

                <div className="admin-stats">


                    {/* ACTIVE PROMOTIONS */}

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



                    {/* AVERAGE DISCOUNT */}

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



                    {/* PROMOTIONAL PRODUCTS */}

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



                {/* ========================================
                    PROMOTIONS SECTION
                ======================================== */}

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



                    {/* ========================================
                        NO PROMOTIONS
                    ======================================== */}

                    {promotionProducts.length === 0 ? (

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


                        /* ========================================
                           PROMOTION GRID
                        ======================================== */

                        <div className="admin-promotion-grid">

                            {promotionProducts.map(
                                (product) => {


                                    // Calculate discounted price

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


                                    return (

                                        <div
                                            className="admin-promotion-card"
                                            key={product.id}
                                        >


                                            {/* ========================================
                                                PRODUCT IMAGE
                                            ======================================== */}

                                            <div className="admin-promotion-image">


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

                                                    <div className="admin-promotion-placeholder">
                                                        📦
                                                    </div>

                                                )}


                                                {/* DISCOUNT BADGE */}

                                                <span className="admin-discount-badge">

                                                    🔥{" "}
                                                    {discount}% OFF

                                                </span>

                                            </div>



                                            {/* ========================================
                                                PRODUCT INFORMATION
                                            ======================================== */}

                                            <div className="admin-promotion-content">


                                                {/* CATEGORY */}

                                                <p className="admin-promotion-category">

                                                    {product.category}

                                                </p>


                                                {/* PRODUCT NAME */}

                                                <h3>

                                                    {product.productName}

                                                </h3>


                                                {/* IMAGE COUNT */}

                                                <span className="admin-promotion-image-count">

                                                    📷{" "}

                                                    {product.images &&
                                                        product.images.length > 0

                                                        ? `${product.images.length} images`

                                                        : product.image
                                                            ? "1 image"
                                                            : "No image"}

                                                </span>



                                                {/* ========================================
                                                    PRICE INFORMATION
                                                ======================================== */}

                                                <div className="admin-promotion-price">


                                                    {/* ORIGINAL PRICE */}

                                                    <div>

                                                        <span className="admin-original-price">

                                                            Original Price

                                                        </span>

                                                        <strong className="admin-original-price-value">

                                                            {originalPrice.toLocaleString()}{" "}
                                                            ETB

                                                        </strong>

                                                    </div>


                                                    {/* DISCOUNTED PRICE */}

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



                                                {/* DISCOUNT INFORMATION */}

                                                <div className="admin-promotion-discount-info">

                                                    You save{" "}

                                                    <strong>

                                                        {
                                                            (
                                                                originalPrice -
                                                                discountedPrice
                                                            ).toLocaleString()
                                                        }{" "}
                                                        ETB

                                                    </strong>

                                                </div>



                                                {/* ========================================
                                                    ACTIONS
                                                ======================================== */}

                                                <div className="admin-promotion-actions">


                                                    {/* EDIT */}

                                                    <Link
                                                        to={`/admin/products/edit/${product.id}`}
                                                        className="admin-edit-button"
                                                    >
                                                        Edit Promotion
                                                    </Link>


                                                    {/* REMOVE */}

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



            {/* ========================================
                REMOVE PROMOTION MODAL
            ======================================== */}

            {removeId !== null && (

                <div className="product-delete-overlay">

                    <div className="product-delete-modal">


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


                            {/* CANCEL */}

                            <button
                                type="button"
                                className="product-delete-cancel"
                                onClick={
                                    cancelRemovePromotion
                                }
                            >
                                Cancel
                            </button>


                            {/* REMOVE */}

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