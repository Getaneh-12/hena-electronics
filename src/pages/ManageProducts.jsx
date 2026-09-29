import { useState } from "react";

function ManageProducts() {
    const [search, setSearch] = useState("");

    const products = [
        {
            id: 1,
            name: "iPhone 15 Pro",
            category: "Smartphones",
            price: 65000,
            stock: 12,
            status: "In Stock",
        },
        {
            id: 2,
            name: "Samsung Galaxy S24",
            category: "Smartphones",
            price: 58000,
            stock: 8,
            status: "In Stock",
        },
        {
            id: 3,
            name: "HP Pavilion 15",
            category: "Laptops",
            price: 85000,
            stock: 5,
            status: "In Stock",
        },
        {
            id: 4,
            name: "Dell Inspiron 15",
            category: "Laptops",
            price: 78000,
            stock: 0,
            status: "Out of Stock",
        },
    ];

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="manage-products">

            <div className="products-header">

                <div>
                    <h1>Products</h1>
                    <p>Manage Hena Electronics products</p>
                </div>

                <button className="add-product-btn">
                    + Add Product
                </button>

            </div>

            <div className="products-tools">

                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select>
                    <option value="">All Categories</option>
                    <option value="Smartphones">Smartphones</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Accessories">Accessories</option>
                </select>

            </div>

            <div className="products-table-container">

                <table className="products-table">

                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredProducts.map((product) => (

                            <tr key={product.id}>

                                <td>{product.name}</td>

                                <td>{product.category}</td>

                                <td>
                                    {product.price.toLocaleString()} ETB
                                </td>

                                <td>{product.stock}</td>

                                <td>
                                    <span
                                        className={
                                            product.stock > 0
                                                ? "status-in"
                                                : "status-out"
                                        }
                                    >
                                        {product.status}
                                    </span>
                                </td>

                                <td>
                                    <button className="edit-btn">
                                        Edit
                                    </button>

                                    <button className="delete-btn">
                                        Delete
                                    </button>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ManageProducts;