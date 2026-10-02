import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

function AdminProducts() {
    const {
        products,
        deleteProduct,
        loading,
    } = useProducts();

    const [searchTerm, setSearchTerm] =
        useState("");

    const [selectedCategory, setSelectedCategory] =
        useState("All");

    const [deleteTarget, setDeleteTarget] =
        useState(null);

    const [message, setMessage] = useState({
        type: "",
        text: "",
    });

    const categories = [
        "All",
        "Smartphones",
        "Laptops",
        "Accessories",
    ];

    // ========================================
    // FILTER PRODUCTS
    // ========================================

    const filteredProducts = useMemo(() => {
        const search =
            searchTerm
                .trim()
                .toLowerCase();

        return products.filter(
            (product) => {
                const matchesSearch =
                    !search ||
                    product.productName
                        ?.toLowerCase()
                        .includes(search) ||
                    product.brand
                        ?.toLowerCase()
                        .includes(search) ||
                    product.model
                        ?.toLowerCase()
                        .includes(search);

                const matchesCategory =
                    selectedCategory ===
                    "All" ||
                    product.category ===
                    selectedCategory;

                return (
                    matchesSearch &&
                    matchesCategory
                );
            }
        );
    }, [
        products,
        searchTerm,
        selectedCategory,
    ]);

    // ========================================
    // STATISTICS
    // ========================================

    const totalProducts =
        products.length;

    const availableProducts =
        products.filter(
            (product) =>
                String(
                    product.availability
                ).toLowerCase() ===
                "available"
        ).length;

    const promotionProducts =
        products.filter(
            (product) =>
                String(
                    product.promotion
                ).toLowerCase() ===
                "active"
        ).length;

    // ========================================
    // DELETE PRODUCT
    // ========================================

    const handleDelete = async () => {
        if (!deleteTarget) {
            return;
        }

        try {
            const result =
                await deleteProduct(
                    deleteTarget.id
                );

            setMessage({
                type: "success",
                text:
                    result.message ||
                    "Product deleted successfully.",
            });

            setDeleteTarget(null);

            setTimeout(() => {
                setMessage({
                    type: "",
                    text: "",
                });
            }, 3000);

        } catch (error) {
            console.error(
                "Delete product error:",
                error
            );

            setMessage({
                type: "error",
                text:
                    error.message ||
                    "Failed to delete product.",
            });

            setDeleteTarget(null);

            setTimeout(() => {
                setMessage({
                    type: "",
                    text: "",
                });
            }, 3000);
        }
    };

    // ========================================
    // CLEAR SEARCH
    // ========================================

    const clearSearch = () => {
        setSearchTerm("");
        setSelectedCategory("All");
    };

    return (
        <div className="admin-products-page">

            {/* ========================================
                PAGE HEADER
            ======================================== */}

            <div className="admin-products-header">

                <div className="admin-products-heading">

                    <p className="admin-eyebrow">
                        PRODUCT MANAGEMENT
                    </p>

                    <h1>
                        Products
                    </h1>

                    <p>
                        Manage your Hena Electronics
                        product catalog.
                    </p>

                </div>

                <Link
                    to="/admin/products/add"
                    className="admin-add-product-btn"
                >
                    <span>+</span>
                    Add Product
                </Link>

            </div>

            {/* ========================================
                MESSAGE
            ======================================== */}

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

            {/* ========================================
                STATISTICS
            ======================================== */}

            <div className="admin-products-stats">

                <div className="admin-product-stat-card">

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

                <div className="admin-product-stat-card">

                    <div className="admin-stat-icon">
                        ✓
                    </div>

                    <div>
                        <span>
                            Available
                        </span>

                        <strong>
                            {availableProducts}
                        </strong>
                    </div>

                </div>

                <div className="admin-product-stat-card">

                    <div className="admin-stat-icon">
                        🏷️
                    </div>

                    <div>
                        <span>
                            Promotions
                        </span>

                        <strong>
                            {promotionProducts}
                        </strong>
                    </div>

                </div>

                <div className="admin-product-stat-card">

                    <div className="admin-stat-icon">
                        🔎
                    </div>

                    <div>
                        <span>
                            Showing
                        </span>

                        <strong>
                            {filteredProducts.length}
                        </strong>
                    </div>

                </div>

            </div>

            {/* ========================================
                FILTER TOOLBAR
            ======================================== */}

            <div className="admin-products-toolbar">

                <div className="admin-search-box">

                    <span className="admin-search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Search by product, brand or model..."
                        value={
                            searchTerm
                        }
                        onChange={(
                            event
                        ) =>
                            setSearchTerm(
                                event
                                    .target
                                    .value
                            )
                        }
                    />

                    {searchTerm && (
                        <button
                            type="button"
                            className="admin-clear-search"
                            onClick={() =>
                                setSearchTerm(
                                    ""
                                )
                            }
                        >
                            ×
                        </button>
                    )}

                </div>

                <div className="admin-category-filter">

                    {categories.map(
                        (category) => (
                            <button
                                key={
                                    category
                                }
                                type="button"
                                className={
                                    selectedCategory ===
                                        category
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setSelectedCategory(
                                        category
                                    )
                                }
                            >
                                {
                                    category
                                }
                            </button>
                        )
                    )}

                </div>

            </div>

            {/* ========================================
                RESULT INFORMATION
            ======================================== */}

            <div className="admin-products-result-bar">

                <div>
                    <strong>
                        {filteredProducts.length}
                    </strong>

                    <span>
                        {filteredProducts.length ===
                            1
                            ? " product"
                            : " products"}{" "}
                        found
                    </span>
                </div>

                {(searchTerm ||
                    selectedCategory !==
                    "All") && (
                        <button
                            type="button"
                            onClick={
                                clearSearch
                            }
                            className="admin-reset-filter"
                        >
                            Clear filters
                        </button>
                    )}

            </div>

            {/* ========================================
                PRODUCTS CARD
            ======================================== */}

            <div className="admin-products-card">

                {/* LOADING */}

                {loading ? (
                    <div className="admin-products-loading">

                        <div className="admin-loading-spinner">
                        </div>

                        <h3>
                            Loading products...
                        </h3>

                        <p>
                            Please wait while we
                            load your product catalog.
                        </p>

                    </div>
                ) : filteredProducts.length ===
                    0 ? (

                    /* EMPTY */

                    <div className="admin-empty-products">

                        <div className="empty-icon">
                            📦
                        </div>

                        <h3>
                            No products found
                        </h3>

                        <p>
                            {searchTerm ||
                                selectedCategory !==
                                "All"
                                ? "Try changing your search or category filter."
                                : "Your product catalog is empty."}
                        </p>

                        {searchTerm ||
                            selectedCategory !==
                            "All" ? (
                            <button
                                type="button"
                                onClick={
                                    clearSearch
                                }
                                className="admin-empty-reset"
                            >
                                Clear Filters
                            </button>
                        ) : (
                            <Link
                                to="/admin/products/add"
                                className="admin-empty-add"
                            >
                                + Add Your First Product
                            </Link>
                        )}

                    </div>
                ) : (

                    /* TABLE */

                    <div className="admin-products-table-wrapper">

                        <table className="admin-products-table">

                            <thead>

                                <tr>

                                    <th>
                                        Product
                                    </th>

                                    <th>
                                        Category
                                    </th>

                                    <th>
                                        Price
                                    </th>

                                    <th>
                                        Availability
                                    </th>

                                    <th>
                                        Promotion
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredProducts.map(
                                    (product) => {

                                        const image =
                                            product
                                                .images
                                                ?.length >
                                                0
                                                ? product
                                                    .images[0]
                                                : product.image;

                                        const availability =
                                            String(
                                                product.availability ||
                                                ""
                                            ).toLowerCase();

                                        const promotion =
                                            String(
                                                product.promotion ||
                                                "inactive"
                                            ).toLowerCase();

                                        return (
                                            <tr
                                                key={
                                                    product.id
                                                }
                                            >

                                                {/* PRODUCT */}

                                                <td>

                                                    <div className="admin-product-info">

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
                                                                    📱
                                                                </span>
                                                            )}

                                                        </div>

                                                        <div className="admin-product-text">

                                                            <strong>
                                                                {
                                                                    product.productName
                                                                }
                                                            </strong>

                                                            <small>
                                                                {product.brand ||
                                                                    "No brand"}

                                                                {product.model
                                                                    ? ` • ${product.model}`
                                                                    : ""}
                                                            </small>

                                                        </div>

                                                    </div>

                                                </td>

                                                {/* CATEGORY */}

                                                <td>

                                                    <span className="admin-category-badge">
                                                        {
                                                            product.category
                                                        }
                                                    </span>

                                                </td>

                                                {/* PRICE */}

                                                <td>

                                                    <strong className="admin-product-price">

                                                        ETB{" "}
                                                        {Number(
                                                            product.price ||
                                                            0
                                                        ).toLocaleString(
                                                            "en-US"
                                                        )}

                                                    </strong>

                                                </td>

                                                {/* AVAILABILITY */}

                                                <td>

                                                    <span
                                                        className={`admin-status ${availability ===
                                                                "available"
                                                                ? "available"
                                                                : "out-of-stock"
                                                            }`}
                                                    >

                                                        <span className="admin-status-dot">
                                                        </span>

                                                        {availability ===
                                                            "available"
                                                            ? "Available"
                                                            : "Out of Stock"}

                                                    </span>

                                                </td>

                                                {/* PROMOTION */}

                                                <td>

                                                    {promotion ===
                                                        "active" ? (
                                                        <span className="admin-promotion-active">

                                                            🏷️{" "}
                                                            {Number(
                                                                product.discount ||
                                                                0
                                                            )}
                                                            % OFF

                                                        </span>
                                                    ) : (
                                                        <span className="admin-promotion-inactive">
                                                            No Promotion
                                                        </span>
                                                    )}

                                                </td>

                                                {/* ACTIONS */}

                                                <td>

                                                    <div className="admin-product-actions">

                                                        <Link
                                                            to={`/admin/products/edit/${product.id}`}
                                                            className="admin-edit-btn"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            className="admin-delete-btn"
                                                            onClick={() =>
                                                                setDeleteTarget(
                                                                    product
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        );
                                    }
                                )}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

            {/* ========================================
                DELETE CONFIRMATION MODAL
            ======================================== */}

            {deleteTarget && (
                <div
                    className="admin-modal-overlay"
                    onClick={() =>
                        setDeleteTarget(
                            null
                        )
                    }
                >

                    <div
                        className="admin-confirm-modal"
                        onClick={(
                            event
                        ) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="admin-confirm-icon">
                            !
                        </div>

                        <h2>
                            Delete Product?
                        </h2>

                        <p>
                            Are you sure you want
                            to delete{" "}
                            <strong>
                                {
                                    deleteTarget.productName
                                }
                            </strong>
                            ?
                        </p>

                        <span className="admin-confirm-warning">
                            This action cannot be
                            undone.
                        </span>

                        <div className="admin-confirm-actions">

                            <button
                                type="button"
                                className="admin-confirm-cancel"
                                onClick={() =>
                                    setDeleteTarget(
                                        null
                                    )
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="admin-confirm-delete"
                                onClick={
                                    handleDelete
                                }
                            >
                                Delete Product
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default AdminProducts;