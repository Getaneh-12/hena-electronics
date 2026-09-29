import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useAdminAuth } from "../context/AdminAuthContext";

function AdminDashboard() {

    const { products } = useProducts();

    const totalProducts = products.length;

    const totalPromotions = products.filter(
        (product) => product.promotion === "active"
    ).length;

    const totalSmartphones = products.filter(
        (product) => product.category === "Smartphones"
    ).length;

    const totalLaptops = products.filter(
        (product) => product.category === "Laptops"
    ).length;


    return (
        <div className="admin-dashboard">

            {/* Sidebar */}

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

                    <Link to="/admin/promotions">
                        Promotions
                    </Link>

                    <Link to="/">
                        View Website
                    </Link>

                </nav>

            </aside>


            {/* Main Content */}

            <main className="admin-main">

                <div className="admin-header">

                    <div>

                        <p className="admin-label">
                            ADMINISTRATION
                        </p>

                        <h1>
                            Dashboard
                        </h1>

                        <p>
                            Manage Hena Electronics products and promotions.
                        </p>

                    </div>


                    <Link
                        to="/"
                        className="admin-view-button"
                    >
                        View Website →
                    </Link>

                </div>


                {/* Statistics */}

                <div className="admin-stats">


                    {/* Total Products */}

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


                    {/* Promotions */}

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


                    {/* Smartphones */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            📱
                        </div>

                        <div>

                            <span>
                                Smartphones
                            </span>

                            <strong>
                                {totalSmartphones}
                            </strong>

                        </div>

                    </div>


                    {/* Laptops */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            💻
                        </div>

                        <div>

                            <span>
                                Laptops
                            </span>

                            <strong>
                                {totalLaptops}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* Quick Actions */}

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


                        {/* Add Product */}

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
                                    Upload a smartphone, laptop or
                                    accessory.
                                </p>

                            </div>

                        </Link>


                        {/* Add Promotion */}

                        <Link
                            to="/admin/promotions"
                            className="admin-action-card"
                        >

                            <div className="admin-action-icon">
                                🔥
                            </div>

                            <div>

                                <h3>
                                    Add Promotion
                                </h3>

                                <p>
                                    Create and manage special offers.
                                </p>

                            </div>

                        </Link>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default AdminDashboard;