import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import henaLogo from "../assets/hena-logo.png";

function AdminDashboard() {
    const {
        products,
        loading,
    } = useProducts();

    // ========================================
    // STATISTICS
    // ========================================

    const totalProducts =
        products.length;

    const totalPromotions =
        products.filter(
            (product) =>
                product.promotion ===
                "active"
        ).length;

    const totalSmartphones =
        products.filter(
            (product) =>
                product.category ===
                "Smartphones"
        ).length;

    const totalLaptops =
        products.filter(
            (product) =>
                product.category ===
                "Laptops"
        ).length;

    const totalAccessories =
        products.filter(
            (product) =>
                product.category ===
                "Accessories"
        ).length;

    const totalAvailable =
        products.filter(
            (product) =>
                String(
                    product.availability
                ).toLowerCase() ===
                "available"
        ).length;

    const totalOutOfStock =
        products.filter(
            (product) =>
                String(
                    product.availability
                ).toLowerCase() !==
                "available"
        ).length;

    // ========================================
    // RECENT PRODUCTS
    // ========================================

    const recentProducts =
        [...products]
            .sort(
                (a, b) =>
                    Number(b.id) -
                    Number(a.id)
            )
            .slice(0, 5);

    return (
        <div className="admin-dashboard">

            {/* ========================================
                SIDEBAR
            ======================================== */}

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

                    <Link
                        to="/admin"
                        className="active"
                    >
                        <span>▦</span>
                        Dashboard
                    </Link>

                    <Link to="/admin/products">
                        <span>▣</span>
                        Products
                    </Link>

                    <Link to="/admin/promotions">
                        <span>🏷</span>
                        Promotions
                    </Link>

                    <Link to="/">
                        <span>↗</span>
                        View Website
                    </Link>

                </nav>

                <div className="admin-sidebar-footer">

                    <span>
                        Hena Electronics
                    </span>

                    <small>
                        Admin Management System
                    </small>

                </div>

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
                            ADMINISTRATION
                        </p>

                        <h1>
                            Dashboard
                        </h1>

                        <p>
                            Manage Hena Electronics
                            products and promotions.
                        </p>

                    </div>

                    <Link
                        to="/"
                        className="admin-view-button"
                    >
                        View Website →
                    </Link>

                </div>

                {/* ========================================
                    STATISTICS
                ======================================== */}

                <div className="admin-stats">

                    {/* TOTAL PRODUCTS */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            📦
                        </div>

                        <div>

                            <span>
                                Total Products
                            </span>

                            <strong>
                                {totalProducts}
                            </strong>

                        </div>

                    </div>

                    {/* AVAILABLE */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            ✓
                        </div>

                        <div>

                            <span>
                                Available
                            </span>

                            <strong>
                                {totalAvailable}
                            </strong>

                        </div>

                    </div>

                    {/* PROMOTIONS */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            🔥
                        </div>

                        <div>

                            <span>
                                Promotions
                            </span>

                            <strong>
                                {totalPromotions}
                            </strong>

                        </div>

                    </div>

                    {/* OUT OF STOCK */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            !
                        </div>

                        <div>

                            <span>
                                Out of Stock
                            </span>

                            <strong>
                                {totalOutOfStock}
                            </strong>

                        </div>

                    </div>

                </div>

                {/* ========================================
                    QUICK ACTIONS
                ======================================== */}

                <section className="admin-section">

                    <div className="admin-section-heading">

                        <div>

                            <p>
                                MANAGEMENT
                            </p>

                            <h2>
                                Quick Actions
                            </h2>

                        </div>

                    </div>

                    <div className="admin-actions">

                        {/* ADD PRODUCT */}

                        <Link
                            to="/admin/products/add"
                            className="admin-action-card"
                        >

                            <div className="admin-action-icon">
                                ➕
                            </div>

                            <div>

                                <h3>
                                    Add Product
                                </h3>

                                <p>
                                    Upload a smartphone,
                                    laptop or accessory.
                                </p>

                            </div>

                            <span className="admin-action-arrow">
                                →
                            </span>

                        </Link>

                        {/* PRODUCTS */}

                        <Link
                            to="/admin/products"
                            className="admin-action-card"
                        >

                            <div className="admin-action-icon">
                                📦
                            </div>

                            <div>

                                <h3>
                                    Manage Products
                                </h3>

                                <p>
                                    View, edit and delete
                                    your products.
                                </p>

                            </div>

                            <span className="admin-action-arrow">
                                →
                            </span>

                        </Link>

                        {/* PROMOTIONS */}

                        <Link
                            to="/admin/promotions"
                            className="admin-action-card"
                        >

                            <div className="admin-action-icon">
                                🔥
                            </div>

                            <div>

                                <h3>
                                    Manage Promotions
                                </h3>

                                <p>
                                    Create and manage
                                    special offers.
                                </p>

                            </div>

                            <span className="admin-action-arrow">
                                →
                            </span>

                        </Link>

                    </div>

                </section>

                {/* ========================================
                    LOWER DASHBOARD
                ======================================== */}

                <div className="admin-dashboard-grid">

                    {/* ========================================
                        RECENT PRODUCTS
                    ======================================== */}

                    <section className="admin-section admin-recent-section">

                        <div className="admin-section-heading">

                            <div>

                                <p>
                                    CATALOG
                                </p>

                                <h2>
                                    Recent Products
                                </h2>

                            </div>

                            <Link
                                to="/admin/products"
                                className="admin-section-link"
                            >
                                View All →
                            </Link>

                        </div>

                        {loading ? (

                            <div className="admin-dashboard-loading">
                                Loading products...
                            </div>

                        ) : recentProducts.length ===
                            0 ? (

                            <div className="admin-dashboard-empty">

                                <div>
                                    📦
                                </div>

                                <p>
                                    No products available.
                                </p>

                                <Link
                                    to="/admin/products/add"
                                >
                                    Add Product
                                </Link>

                            </div>

                        ) : (

                            <div className="admin-recent-products">

                                {recentProducts.map(
                                    (product) => {

                                        const image =
                                            product.images &&
                                                product.images.length >
                                                0
                                                ? product.images[0]
                                                : product.image;

                                        return (
                                            <div
                                                className="admin-recent-product"
                                                key={
                                                    product.id
                                                }
                                            >

                                                <div className="admin-recent-image">

                                                    {image ? (
                                                        <img
                                                            src={
                                                                image
                                                            }
                                                            alt={
                                                                product.productName
                                                            }
                                                        />
                                                    ) : (
                                                        <span>
                                                            📱
                                                        </span>
                                                    )}

                                                </div>

                                                <div className="admin-recent-info">

                                                    <strong>
                                                        {
                                                            product.productName
                                                        }
                                                    </strong>

                                                    <span>
                                                        {
                                                            product.category
                                                        }
                                                    </span>

                                                </div>

                                                <div className="admin-recent-price">

                                                    <strong>
                                                        ETB{" "}
                                                        {Number(
                                                            product.price ||
                                                            0
                                                        ).toLocaleString(
                                                            "en-US"
                                                        )}
                                                    </strong>

                                                    <span
                                                        className={
                                                            String(
                                                                product.availability
                                                            ).toLowerCase() ===
                                                                "available"
                                                                ? "available"
                                                                : "out-of-stock"
                                                        }
                                                    >
                                                        {String(
                                                            product.availability
                                                        ).toLowerCase() ===
                                                            "available"
                                                            ? "Available"
                                                            : "Out of Stock"}
                                                    </span>

                                                </div>

                                            </div>
                                        );
                                    }
                                )}

                            </div>
                        )}

                    </section>

                    {/* ========================================
                        CATEGORY OVERVIEW
                    ======================================== */}

                    <section className="admin-section">

                        <div className="admin-section-heading">

                            <div>

                                <p>
                                    CATALOG
                                </p>

                                <h2>
                                    Categories
                                </h2>

                            </div>

                        </div>

                        <div className="admin-category-overview">

                            {/* SMARTPHONES */}

                            <Link
                                to="/admin/products"
                                className="admin-category-item"
                            >

                                <div className="admin-category-item-icon">
                                    📱
                                </div>

                                <div>

                                    <strong>
                                        Smartphones
                                    </strong>

                                    <span>
                                        {totalSmartphones}{" "}
                                        products
                                    </span>

                                </div>

                                <span className="admin-category-arrow">
                                    →
                                </span>

                            </Link>

                            {/* LAPTOPS */}

                            <Link
                                to="/admin/products"
                                className="admin-category-item"
                            >

                                <div className="admin-category-item-icon">
                                    💻
                                </div>

                                <div>

                                    <strong>
                                        Laptops
                                    </strong>

                                    <span>
                                        {totalLaptops}{" "}
                                        products
                                    </span>

                                </div>

                                <span className="admin-category-arrow">
                                    →
                                </span>

                            </Link>

                            {/* ACCESSORIES */}

                            <Link
                                to="/admin/products"
                                className="admin-category-item"
                            >

                                <div className="admin-category-item-icon">
                                    🎧
                                </div>

                                <div>

                                    <strong>
                                        Accessories
                                    </strong>

                                    <span>
                                        {totalAccessories}{" "}
                                        products
                                    </span>

                                </div>

                                <span className="admin-category-arrow">
                                    →
                                </span>

                            </Link>

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
}

export default AdminDashboard;