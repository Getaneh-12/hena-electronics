import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import henaLogo from "../assets/hena-logo.png";

function AdminDashboard() {
    const navigate = useNavigate();

    const {
        products,
        loading,
    } = useProducts();

    const totalProducts =
        products.length;

    const availableProducts =
        products.filter(
            (product) =>
                product.availability ===
                "available"
        ).length;

    const activePromotions =
        products.filter(
            (product) =>
                product.promotion ===
                "active"
        ).length;

    const categories =
        new Set(
            products.map(
                (product) =>
                    product.category
            )
        ).size;

    const recentProducts =
        products.slice(0, 5);

    const categoryCounts =
        products.reduce(
            (result, product) => {
                const category =
                    product.category ||
                    "Other";

                result[category] =
                    (result[category] || 0) + 1;

                return result;
            },
            {}
        );

    const promotionProducts =
        products.filter(
            (product) =>
                product.promotion ===
                "active"
        );

    const getProductImage = (
        product
    ) => {
        if (
            product.images &&
            product.images.length > 0
        ) {
            const image =
                product.images[0];

            if (
                image.startsWith("http")
            ) {
                return image;
            }

            return `http://localhost:5000${image}`;
        }

        if (product.image) {
            if (
                product.image.startsWith(
                    "http"
                )
            ) {
                return product.image;
            }

            return `http://localhost:5000${product.image}`;
        }

        return null;
    };

    return (
        <div className="admin-dashboard-page">

            <header className="admin-dashboard-header">

                <div className="admin-dashboard-brand">

                    <div className="admin-dashboard-logo">
                        <img
                            src={henaLogo}
                            alt="Hena Electronics"
                        />
                    </div>

                    <div>
                        <h1>
                            Admin Dashboard
                        </h1>

                        <p>
                            Manage your Hena Electronics store
                        </p>
                    </div>

                </div>

                <div className="admin-dashboard-header-right">

                    <div className="admin-store-status">
                        <span className="status-dot"></span>

                        <span>
                            Store Online
                        </span>
                    </div>

                    <button
                        className="admin-primary-button"
                        onClick={() =>
                            navigate(
                                "/admin/products/add"
                            )
                        }
                    >
                        + Add Product
                    </button>

                </div>

            </header>

            <section className="admin-welcome">

                <div>
                    <span className="admin-welcome-label">
                        HENA ELECTRONICS
                    </span>

                    <h2>
                        Store Overview
                    </h2>

                    <p>
                        Monitor your products,
                        promotions and inventory
                        from one place.
                    </p>
                </div>

                <button
                    className="admin-view-products-button"
                    onClick={() =>
                        navigate(
                            "/admin/products"
                        )
                    }
                >
                    View All Products →
                </button>

            </section>

            <section className="admin-stats-grid">

                <div className="admin-stat-card">

                    <div className="admin-stat-content">

                        <span>
                            Total Products
                        </span>

                        <strong>
                            {loading
                                ? "..."
                                : totalProducts}
                        </strong>

                        <small>
                            Products in store
                        </small>

                    </div>

                    <div className="admin-stat-icon">
                        📦
                    </div>

                </div>

                <div className="admin-stat-card">

                    <div className="admin-stat-content">

                        <span>
                            Available Products
                        </span>

                        <strong>
                            {loading
                                ? "..."
                                : availableProducts}
                        </strong>

                        <small>
                            Currently available
                        </small>

                    </div>

                    <div className="admin-stat-icon">
                        ✓
                    </div>

                </div>

                <div className="admin-stat-card">

                    <div className="admin-stat-content">

                        <span>
                            Active Promotions
                        </span>

                        <strong>
                            {loading
                                ? "..."
                                : activePromotions}
                        </strong>

                        <small>
                            Running promotions
                        </small>

                    </div>

                    <div className="admin-stat-icon">
                        %
                    </div>

                </div>

                <div className="admin-stat-card">

                    <div className="admin-stat-content">

                        <span>
                            Categories
                        </span>

                        <strong>
                            {loading
                                ? "..."
                                : categories}
                        </strong>

                        <small>
                            Product categories
                        </small>

                    </div>

                    <div className="admin-stat-icon">
                        ◈
                    </div>

                </div>

            </section>

            <section className="admin-dashboard-main-grid">

                <div className="admin-dashboard-card admin-recent-card">

                    <div className="admin-card-header">

                        <div>
                            <span className="admin-section-label">
                                INVENTORY
                            </span>

                            <h2>
                                Recent Products
                            </h2>

                            <p>
                                Your latest products
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                navigate(
                                    "/admin/products"
                                )
                            }
                        >
                            View All
                        </button>

                    </div>

                    {loading ? (
                        <div className="admin-empty-state">
                            Loading products...
                        </div>
                    ) : recentProducts.length === 0 ? (
                        <div className="admin-empty-state">
                            <strong>
                                No products yet
                            </strong>

                            <span>
                                Add your first product
                                to get started.
                            </span>

                            <button
                                onClick={() =>
                                    navigate(
                                        "/admin/products/add"
                                    )
                                }
                            >
                                + Add Product
                            </button>
                        </div>
                    ) : (
                        <div className="admin-recent-products">

                            {recentProducts.map(
                                (product) => {

                                    const image =
                                        getProductImage(
                                            product
                                        );

                                    return (
                                        <div
                                            className="admin-recent-product"
                                            key={
                                                product.id
                                            }
                                        >

                                            <div className="admin-product-image">

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
                                                        📦
                                                    </span>
                                                )}

                                            </div>

                                            <div className="admin-product-info">

                                                <h3>
                                                    {
                                                        product.productName
                                                    }
                                                </h3>

                                                <p>
                                                    {
                                                        product.category
                                                    }
                                                </p>

                                            </div>

                                            <div className="admin-product-availability">

                                                <span
                                                    className={
                                                        product.availability ===
                                                            "available"
                                                            ? "available"
                                                            : "unavailable"
                                                    }
                                                >
                                                    {product.availability ===
                                                        "available"
                                                        ? "Available"
                                                        : "Unavailable"}
                                                </span>

                                            </div>

                                            <strong className="admin-product-price">
                                                {Number(
                                                    product.price
                                                ).toLocaleString()}{" "}
                                                ETB
                                            </strong>

                                        </div>
                                    );
                                }
                            )}

                        </div>
                    )}

                </div>

                <div className="admin-dashboard-card admin-category-card">

                    <div className="admin-card-header">

                        <div>
                            <span className="admin-section-label">
                                INVENTORY
                            </span>

                            <h2>
                                Categories
                            </h2>

                            <p>
                                Products by category
                            </p>
                        </div>

                    </div>

                    {Object.keys(
                        categoryCounts
                    ).length === 0 ? (
                        <div className="admin-small-empty">
                            No categories available.
                        </div>
                    ) : (
                        <div className="admin-category-list">

                            {Object.entries(
                                categoryCounts
                            ).map(
                                ([
                                    category,
                                    count,
                                ]) => {

                                    const percentage =
                                        totalProducts >
                                            0
                                            ? Math.round(
                                                (count /
                                                    totalProducts) *
                                                100
                                            )
                                            : 0;

                                    return (
                                        <div
                                            className="admin-category-item"
                                            key={
                                                category
                                            }
                                        >

                                            <div className="admin-category-top">

                                                <span>
                                                    {
                                                        category
                                                    }
                                                </span>

                                                <strong>
                                                    {
                                                        count
                                                    }
                                                </strong>

                                            </div>

                                            <div className="admin-category-bar">

                                                <span
                                                    style={{
                                                        width: `${percentage}%`,
                                                    }}
                                                ></span>

                                            </div>

                                            <small>
                                                {
                                                    percentage
                                                }
                                                % of
                                                inventory
                                            </small>

                                        </div>
                                    );
                                }
                            )}

                        </div>
                    )}

                </div>

            </section>

            <section className="admin-dashboard-bottom-grid">

                <div className="admin-dashboard-card">

                    <div className="admin-card-header">

                        <div>
                            <span className="admin-section-label">
                                MANAGEMENT
                            </span>

                            <h2>
                                Quick Actions
                            </h2>

                            <p>
                                Frequently used tools
                            </p>
                        </div>

                    </div>

                    <div className="admin-quick-actions">

                        <button
                            onClick={() =>
                                navigate(
                                    "/admin/products/add"
                                )
                            }
                        >
                            <span>
                                <strong>
                                    Add Product
                                </strong>

                                <small>
                                    Add a new item
                                    to your store
                                </small>
                            </span>

                            <b>
                                →
                            </b>
                        </button>

                        <button
                            onClick={() =>
                                navigate(
                                    "/admin/products"
                                )
                            }
                        >
                            <span>
                                <strong>
                                    Manage Products
                                </strong>

                                <small>
                                    Edit or remove
                                    products
                                </small>
                            </span>

                            <b>
                                →
                            </b>
                        </button>

                        <button
                            onClick={() =>
                                navigate(
                                    "/admin/promotions"
                                )
                            }
                        >
                            <span>
                                <strong>
                                    Manage Promotions
                                </strong>

                                <small>
                                    Update store
                                    promotions
                                </small>
                            </span>

                            <b>
                                →
                            </b>
                        </button>

                    </div>

                </div>

                <div className="admin-dashboard-card admin-promotion-card">

                    <div className="admin-card-header">

                        <div>
                            <span className="admin-section-label">
                                PROMOTIONS
                            </span>

                            <h2>
                                Promotion Overview
                            </h2>

                            <p>
                                Current promotional products
                            </p>
                        </div>

                    </div>

                    <div className="admin-promotion-summary">

                        <div className="admin-promotion-number">
                            <strong>
                                {loading
                                    ? "..."
                                    : promotionProducts.length}
                            </strong>

                            <span>
                                Active promotions
                            </span>
                        </div>

                        <div className="admin-promotion-action">

                            <button
                                onClick={() =>
                                    navigate(
                                        "/admin/promotions"
                                    )
                                }
                            >
                                Manage Promotions →
                            </button>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default AdminDashboard;