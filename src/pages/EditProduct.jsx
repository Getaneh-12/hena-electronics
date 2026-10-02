import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

function EditProduct() {
    const { id } = useParams();

    const { products, updateProduct } = useProducts();

    const [formData, setFormData] = useState({
        productName: "",
        category: "Smartphones",
        price: "",
        brand: "",
        model: "",
        storage: "",
        ram: "",
        description: "",
        availability: "available",
        promotion: "inactive",
        discount: 0,
    });

    const [productImages, setProductImages] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState({
        type: "",
        text: "",
    });

    /* =====================================================
       LOAD PRODUCT
    ===================================================== */

    useEffect(() => {
        const product = products.find(
            (item) => Number(item.id) === Number(id)
        );

        if (!product) {
            setLoading(false);
            return;
        }

        setFormData({
            productName: product.productName || "",
            category: product.category || "Smartphones",
            price: product.price || "",
            brand: product.brand || "",
            model: product.model || "",
            storage: product.storage || "",
            ram: product.ram || "",
            description: product.description || "",

            // Keep availability consistent with Add Product
            availability:
                String(
                    product.availability || "available"
                ).toLowerCase() === "out of stock"
                    ? "out_of_stock"
                    : String(
                        product.availability || "available"
                    ).toLowerCase(),

            promotion:
                String(
                    product.promotion || "inactive"
                ).toLowerCase() === "active"
                    ? "active"
                    : "inactive",

            discount: product.discount || 0,
        });

        const images =
            product.images &&
                product.images.length > 0
                ? product.images
                : product.image
                    ? [product.image]
                    : [];

        setProductImages(images);

        setLoading(false);
    }, [products, id]);

    /* =====================================================
       HANDLE CHANGE
    ===================================================== */

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    /* =====================================================
       SUBMIT
    ===================================================== */

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.productName.trim()) {
            setMessage({
                type: "error",
                text: "Product name is required.",
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            return;
        }

        if (!formData.category) {
            setMessage({
                type: "error",
                text: "Please select a product category.",
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            return;
        }

        if (
            !formData.price ||
            Number(formData.price) <= 0
        ) {
            setMessage({
                type: "error",
                text: "Please enter a valid product price.",
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            return;
        }
        if (
            formData.promotion === "active" &&
            Number(formData.discount) <= 0
        ) {
            setMessage({
                type: "error",
                text: "Please enter a discount greater than 0% for an active promotion.",
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            return;
        }

        setSaving(true);

        setMessage({
            type: "",
            text: "",
        });

        try {
            const result = await updateProduct(
                id,
                {
                    ...formData,

                    price: Number(formData.price),

                    promotion:
                        formData.promotion === "active"
                            ? "active"
                            : "inactive",

                    discount:
                        formData.promotion === "active"
                            ? Number(formData.discount) || 0
                            : 0,
                }
            );

            if (!result || result.success === false) {
                throw new Error(
                    result?.message ||
                    "Failed to update product."
                );
            }

            setMessage({
                type: "success",
                text: "Product updated successfully.",
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            setTimeout(() => {
                setMessage({
                    type: "",
                    text: "",
                });
            }, 3500);

        } catch (error) {
            console.error(
                "Edit product error:",
                error
            );

            setMessage({
                type: "error",
                text:
                    error.message ||
                    "Something went wrong while updating the product.",
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } finally {
            setSaving(false);
        }
    };

    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {
        return (
            <div className="admin-page">
                <div className="admin-form-loading">
                    Loading product...
                </div>
            </div>
        );
    }

    /* =====================================================
       FIND CURRENT PRODUCT
    ===================================================== */

    const currentProduct = products.find(
        (product) =>
            Number(product.id) === Number(id)
    );

    if (!currentProduct) {
        return (
            <div className="admin-page">
                <div className="admin-form-empty">
                    <h2>Product not found</h2>

                    <p>
                        The product you are trying to edit
                        could not be found.
                    </p>

                    <Link to="/admin/products">
                        ← Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="add-product-title">

                <span>
                    PRODUCT MANAGEMENT
                </span>

                <h1>
                    Edit Product
                </h1>

                <p>
                    Update product information and details.
                </p>

                <Link to="/admin/products">
                    ← Back to Products
                </Link>

            </div>

            {/* =================================================
                MESSAGE
            ================================================= */}

            {message.text && (
                <div
                    className={`admin-form-message ${message.type}`}
                >
                    <div className="admin-form-message-icon">
                        {message.type === "success"
                            ? "✓"
                            : "!"}
                    </div>

                    <div className="admin-form-message-content">

                        <strong>
                            {message.type === "success"
                                ? "Changes Saved"
                                : "Update Failed"}
                        </strong>

                        <span>
                            {message.text}
                        </span>

                    </div>
                </div>
            )}

            {/* =================================================
                FORM
            ================================================= */}

            <form
                className="admin-product-form"
                onSubmit={handleSubmit}
            >

                {/* =================================================
                    BASIC INFORMATION
                ================================================= */}

                <section className="admin-form-section">

                    <div className="admin-form-section-header">

                        <h2>
                            Basic Information
                        </h2>

                        <p>
                            Update the main information about this product.
                        </p>

                    </div>

                    <div className="admin-form-grid">

                        {/* PRODUCT NAME */}

                        <div className="admin-form-group">

                            <label>
                                Product Name
                                <span className="required">
                                    *
                                </span>
                            </label>

                            <input
                                type="text"
                                name="productName"
                                value={
                                    formData.productName
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter product name"
                                required
                            />

                        </div>

                        {/* CATEGORY */}

                        <div className="admin-form-group">

                            <label>
                                Category
                                <span className="required">
                                    *
                                </span>
                            </label>

                            <select
                                name="category"
                                value={
                                    formData.category
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            >

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

                        </div>

                        {/* PRICE */}

                        <div className="admin-form-group">

                            <label>
                                Price
                                <span className="required">
                                    *
                                </span>
                            </label>

                            <div className="admin-price-input">

                                <span>
                                    ETB
                                </span>

                                <input
                                    type="number"
                                    name="price"
                                    value={
                                        formData.price
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    required
                                />

                            </div>

                        </div>

                        {/* AVAILABILITY */}

                        <div className="admin-form-group">

                            <label>
                                Availability
                            </label>

                            <select
                                name="availability"
                                value={
                                    formData.availability
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <option value="available">
                                    Available
                                </option>

                                <option value="out_of_stock">
                                    Out of Stock
                                </option>

                            </select>

                        </div>

                    </div>

                    {/* DESCRIPTION */}

                    <div className="admin-form-group admin-description-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={
                                formData.description
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Write a short description about the product..."
                            rows="5"
                        />

                    </div>

                </section>

                {/* =================================================
                    PRODUCT DETAILS
                ================================================= */}

                <section className="admin-form-section">

                    <div className="admin-form-section-header">

                        <h2>
                            Product Details
                        </h2>

                        <p>
                            Update specifications that help customers
                            understand the product.
                        </p>

                    </div>

                    <div className="admin-form-grid">

                        {/* BRAND */}

                        <div className="admin-form-group">

                            <label>
                                Brand
                            </label>

                            <input
                                type="text"
                                name="brand"
                                value={
                                    formData.brand
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="e.g. Samsung"
                            />

                        </div>

                        {/* MODEL */}

                        <div className="admin-form-group">

                            <label>
                                Model
                            </label>

                            <input
                                type="text"
                                name="model"
                                value={
                                    formData.model
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="e.g. Galaxy S25"
                            />

                        </div>

                        {/* STORAGE */}

                        <div className="admin-form-group">

                            <label>
                                Storage
                            </label>

                            <input
                                type="text"
                                name="storage"
                                value={
                                    formData.storage
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="e.g. 256GB"
                            />

                        </div>

                        {/* RAM */}

                        <div className="admin-form-group">

                            <label>
                                RAM
                            </label>

                            <input
                                type="text"
                                name="ram"
                                value={
                                    formData.ram
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="e.g. 8GB"
                            />

                        </div>

                    </div>

                </section>

                {/* =================================================
                    CURRENT IMAGES
                ================================================= */}

                <section className="admin-form-section">

                    <div className="admin-form-section-header">

                        <h2>
                            Product Images
                        </h2>

                        <p>
                            Current images attached to this product.
                        </p>

                    </div>

                    {productImages.length > 0 ? (

                        <div className="admin-image-preview-grid">

                            {productImages.map(
                                (image, index) => (

                                    <div
                                        className="admin-image-preview"
                                        key={image}
                                    >

                                        <img
                                            src={image}
                                            alt={`${formData.productName} ${index + 1}`}
                                        />

                                        <span className="admin-image-preview-label">
                                            Image {index + 1}
                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    ) : (

                        <div className="edit-no-images">
                            No images available for this product.
                        </div>

                    )}

                </section>

                {/* =================================================
                    PROMOTION
                ================================================= */}

                <section className="admin-form-section">

                    <div className="admin-form-section-header">

                        <h2>
                            Promotion
                        </h2>

                        <p>
                            Manage the promotional status and discount.
                        </p>

                    </div>

                    <div className="admin-form-grid">

                        {/* PROMOTION */}

                        <div className="admin-form-group">

                            <label>
                                Promotion Status
                            </label>

                            <select
                                name="promotion"
                                value={
                                    formData.promotion
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <option value="inactive">
                                    Inactive
                                </option>

                                <option value="active">
                                    Active
                                </option>

                            </select>

                        </div>

                        {/* DISCOUNT */}

                        <div className="admin-form-group">

                            <label>
                                Discount
                            </label>

                            <div className="admin-price-input">

                                <span>
                                    %
                                </span>

                                <input
                                    type="number"
                                    name="discount"
                                    value={
                                        formData.discount
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="0"
                                    min="0"
                                    max="100"
                                    step="1"
                                />

                            </div>

                        </div>

                    </div>

                </section>

                {/* =================================================
                    ACTION BUTTONS
                ================================================= */}

                <div className="admin-form-actions">

                    <Link
                        to="/admin/products"
                        className="admin-cancel-button"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        className="admin-save-button"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving Changes..."
                            : "Save Changes"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default EditProduct;