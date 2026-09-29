import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

function AdminProducts() {

    const { products, deleteProduct } = useProducts();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [availability, setAvailability] = useState("All");
    const [deleteId, setDeleteId] = useState(null);


    /* ========================================
       FILTER PRODUCTS
    ======================================== */

    const filteredProducts = products.filter((product) => {

        const matchesSearch =
            product.productName
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            category === "All" ||
            product.category === category;

        const matchesAvailability =
            availability === "All" ||
            product.availability === availability;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesAvailability
        );
    });


    /* ========================================
       DELETE PRODUCT
    ======================================== */

    const handleDelete = (id) => {
        setDeleteId(id);
    };


    const confirmDelete = () => {

        if (deleteId !== null) {
            deleteProduct(deleteId);
        }

        setDeleteId(null);
    };


    const cancelDelete = () => {
        setDeleteId(null);
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

                    <Link
                        to="/admin/products"
                        className="active"
                    >
                        Products
                    </Link>

                    <Link to="/admin/promotions">
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
                            PRODUCT MANAGEMENT
                        </p>

                        <h1>
                            Products
                        </h1>

                        <p>
                            Manage your Hena Electronics inventory.
                        </p>

                    </div>


                    <Link
                        to="/admin/products/add"
                        className="admin-view-button"
                    >
                        + Add Product
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
                                {products.length}
                            </strong>

                        </div>

                    </div>



                    {/* SMARTPHONES */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            📱
                        </div>

                        <div>

                            <span>
                                Smartphones
                            </span>

                            <strong>
                                {
                                    products.filter(
                                        (product) =>
                                            product.category ===
                                            "Smartphones"
                                    ).length
                                }
                            </strong>

                        </div>

                    </div>



                    {/* LAPTOPS */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            💻
                        </div>

                        <div>

                            <span>
                                Laptops
                            </span>

                            <strong>
                                {
                                    products.filter(
                                        (product) =>
                                            product.category ===
                                            "Laptops"
                                    ).length
                                }
                            </strong>

                        </div>

                    </div>



                    {/* ACCESSORIES */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            🎧
                        </div>

                        <div>

                            <span>
                                Accessories
                            </span>

                            <strong>
                                {
                                    products.filter(
                                        (product) =>
                                            product.category ===
                                            "Accessories"
                                    ).length
                                }
                            </strong>

                        </div>

                    </div>

                </div>



                {/* ========================================
                    PRODUCTS SECTION
                ======================================== */}

                <section className="admin-section">


                    {/* SECTION HEADING */}

                    <div className="admin-section-heading">

                        <div>

                            <p>
                                INVENTORY
                            </p>

                            <h2>
                                All Products
                            </h2>

                        </div>

                    </div>



                    {/* ========================================
                        SEARCH AND FILTERS
                    ======================================== */}

                    <div className="admin-product-filters">


                        {/* SEARCH */}

                        <div className="admin-search">

                            <span>
                                🔍
                            </span>

                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                            />

                        </div>



                        {/* CATEGORY */}

                        <select
                            value={category}
                            onChange={(event) =>
                                setCategory(event.target.value)
                            }
                        >

                            <option value="All">
                                All Categories
                            </option>

                            <option value="Smartphones">
                                Smartphones
                            </option>

                            <option value="Laptops">
                                Laptops
                            </option>

                            <option value="Accessories">
                                Accessories
                            </option>

                        </select>



                        {/* AVAILABILITY */}

                        <select
                            value={availability}
                            onChange={(event) =>
                                setAvailability(event.target.value)
                            }
                        >

                            <option value="All">
                                All Availability
                            </option>

                            <option value="available">
                                Available
                            </option>

                            <option value="out-of-stock">
                                Out of Stock
                            </option>

                        </select>

                    </div>



                    {/* ========================================
                        PRODUCTS TABLE
                    ======================================== */}

                    <div className="admin-products-table">

                        {filteredProducts.length === 0 ? (

                            <div className="admin-empty-products">

                                <div className="admin-empty-icon">
                                    🔍
                                </div>

                                <h3>
                                    No Products Found
                                </h3>

                                <p>
                                    Try changing your search or filters.
                                </p>

                            </div>

                        ) : (

                            <table>

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
                                        (product) => (

                                            <tr
                                                key={product.id}
                                            >


                                                {/* ========================================
                                                    PRODUCT
                                                ======================================== */}

                                                <td>

                                                    <div className="admin-product-info">


                                                        {/* PRODUCT IMAGE */}

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

                                                            <div className="admin-product-placeholder">
                                                                📦
                                                            </div>

                                                        )}



                                                        {/* PRODUCT NAME */}

                                                        <div className="admin-product-name">

                                                            <strong>
                                                                {
                                                                    product.productName
                                                                }
                                                            </strong>


                                                            {/* IMAGE COUNT */}

                                                            <span className="admin-product-image-count">

                                                                📷{" "}

                                                                {
                                                                    product.images &&
                                                                        product.images.length > 0

                                                                        ? `${product.images.length} images`

                                                                        : product.image
                                                                            ? "1 image"
                                                                            : "No image"
                                                                }

                                                            </span>

                                                        </div>

                                                    </div>

                                                </td>



                                                {/* ========================================
                                                    CATEGORY
                                                ======================================== */}

                                                <td>

                                                    {product.category}

                                                </td>



                                                {/* ========================================
                                                    PRICE
                                                ======================================== */}

                                                <td>

                                                    {
                                                        Number(
                                                            product.price
                                                        ).toLocaleString()
                                                    }{" "}
                                                    ETB

                                                </td>



                                                {/* ========================================
                                                    AVAILABILITY
                                                ======================================== */}


                                                <td>

                                                    {product.availability === "available" ? (

                                                        <span className="admin-availability-badge available">
                                                            ● Available
                                                        </span>

                                                    ) : (

                                                        <span className="admin-availability-badge unavailable">
                                                            ● Out of Stock
                                                        </span>

                                                    )}

                                                </td>


                                                {/* ========================================
                                                    PROMOTION
                                                ======================================== */}

                                                <td>

                                                    {product.promotion ===
                                                        "active" ? (

                                                        <span className="admin-promotion-badge">

                                                            🔥{" "}
                                                            {
                                                                product.discount ||
                                                                0
                                                            }
                                                            % OFF

                                                        </span>

                                                    ) : (

                                                        <span className="admin-no-promotion">
                                                            No Promotion
                                                        </span>

                                                    )}

                                                </td>



                                                {/* ========================================
                                                    ACTIONS
                                                ======================================== */}

                                                <td>

                                                    <div className="admin-product-actions">


                                                        {/* EDIT */}

                                                        <Link
                                                            to={`/admin/products/edit/${product.id}`}
                                                            className="admin-edit-button"
                                                        >
                                                            Edit
                                                        </Link>



                                                        {/* DELETE */}

                                                        <button
                                                            type="button"
                                                            className="admin-delete-button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    product.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        )}

                    </div>

                </section>

            </main>



            {/* ========================================
                DELETE CONFIRMATION MODAL
            ======================================== */}

            {deleteId !== null && (

                <div className="product-delete-overlay">

                    <div className="product-delete-modal">


                        <div className="product-delete-icon">
                            🗑️
                        </div>


                        <h2>
                            Delete Product?
                        </h2>


                        <p>
                            Are you sure you want to delete this product?
                            This action cannot be undone.
                        </p>


                        <div className="product-delete-actions">


                            {/* CANCEL */}

                            <button
                                type="button"
                                className="product-delete-cancel"
                                onClick={cancelDelete}
                            >
                                Cancel
                            </button>


                            {/* CONFIRM DELETE */}

                            <button
                                type="button"
                                className="product-delete-confirm"
                                onClick={confirmDelete}
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