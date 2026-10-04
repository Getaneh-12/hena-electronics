import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

function AddProduct() {
    const { getToken } = useAdminAuth();

    const [formData, setFormData] = useState({
        productName: "",
        category: "",
        price: "",
        availability: "available",
        description: "",
        brand: "",
        model: "",
        storage: "",
        ram: "",
        discount: "",
        promotion: "inactive",
    });

    const [imagePreviews, setImagePreviews] = useState([]);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState({
        type: "",
        text: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        const selectedFiles = Array.from(
            event.target.files
        );

        if (selectedFiles.length === 0) {
            return;
        }

        const currentFiles = imagePreviews.map(
            (preview) => preview.file
        );

        const totalImages =
            currentFiles.length +
            selectedFiles.length;

        if (totalImages > 3) {
            setMessage({
                type: "error",
                text: `You can upload a maximum of 3 images. You already selected ${currentFiles.length} image${currentFiles.length === 1 ? "" : "s"}.`,
            });

            event.target.value = "";
            return;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];

        const invalidFile =
            selectedFiles.find(
                (file) =>
                    !allowedTypes.includes(
                        file.type
                    )
            );

        if (invalidFile) {
            setMessage({
                type: "error",
                text: "Only JPG, JPEG, PNG and WEBP images are allowed.",
            });

            event.target.value = "";
            return;
        }

        const largeFile =
            selectedFiles.find(
                (file) =>
                    file.size >
                    5 * 1024 * 1024
            );

        if (largeFile) {
            setMessage({
                type: "error",
                text: "Each image must be smaller than 5MB.",
            });

            event.target.value = "";
            return;
        }

        const newPreviews =
            selectedFiles.map(
                (file) => ({
                    file,
                    url: URL.createObjectURL(
                        file
                    ),
                })
            );

        setImagePreviews(
            (previous) => [
                ...previous,
                ...newPreviews,
            ]
        );

        setMessage({
            type: "",
            text: "",
        });

        event.target.value = "";
    };

    const removeImage = (index) => {
        setImagePreviews(
            (previous) => {
                const imageToRemove =
                    previous[index];

                if (
                    imageToRemove?.url
                ) {
                    URL.revokeObjectURL(
                        imageToRemove.url
                    );
                }

                return previous.filter(
                    (_, imageIndex) =>
                        imageIndex !==
                        index
                );
            }
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            !formData.productName.trim()
        ) {
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

        if (imagePreviews.length > 3) {
            setMessage({
                type: "error",
                text: "You can upload a maximum of 3 images.",
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            return;
        }

        const token = getToken();

        if (!token) {
            setMessage({
                type: "error",
                text: "Your admin session has expired. Please log in again.",
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
            const productResponse =
                await fetch(API_URL, {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        productName:
                            formData.productName.trim(),

                        category:
                            formData.category,

                        price: Number(
                            formData.price
                        ),

                        availability:
                            formData.availability,

                        description:
                            formData.description,

                        brand:
                            formData.brand,

                        model:
                            formData.model,

                        storage:
                            formData.storage,

                        ram:
                            formData.ram,

                        promotion:
                            formData.promotion ===
                                "active"
                                ? "active"
                                : "inactive",

                        discount:
                            formData.promotion ===
                                "active"
                                ? Number(
                                    formData.discount
                                ) || 0
                                : 0,
                    }),
                });

            const productData =
                await productResponse.json();

            if (
                !productResponse.ok ||
                !productData.success
            ) {
                throw new Error(
                    productData.message ||
                    "Failed to create product."
                );
            }

            const productId =
                productData.productId ||
                productData.data?.productId ||
                productData.data?.id;

            if (!productId) {
                throw new Error(
                    "Product was created, but its ID was not returned."
                );
            }

            if (
                imagePreviews.length > 0
            ) {
                const imageFormData =
                    new FormData();

                imagePreviews.forEach(
                    (preview) => {
                        imageFormData.append(
                            "images",
                            preview.file
                        );
                    }
                );

                const imageResponse =
                    await fetch(
                        `${API_URL}/${productId}/images`,
                        {
                            method: "POST",

                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },

                            body:
                                imageFormData,
                        }
                    );

                const imageData =
                    await imageResponse.json();

                if (
                    !imageResponse.ok ||
                    !imageData.success
                ) {
                    throw new Error(
                        imageData.message ||
                        "Product was created, but images could not be uploaded."
                    );
                }
            }

            setMessage({
                type: "success",
                text: "Product and images were added successfully.",
            });

            setFormData({
                productName: "",
                category: "",
                price: "",
                availability:
                    "available",
                description: "",
                brand: "",
                model: "",
                storage: "",
                ram: "",
                discount: "",
                promotion:
                    "inactive",
            });

            imagePreviews.forEach(
                (preview) => {
                    if (preview.url) {
                        URL.revokeObjectURL(
                            preview.url
                        );
                    }
                }
            );

            setImagePreviews([]);

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
                "Add product error:",
                error
            );

            setMessage({
                type: "error",
                text:
                    error.message ||
                    "Something went wrong while adding the product.",
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="admin-page">

            <div className="add-product-title">

                <span>
                    PRODUCTS
                </span>

                <h1>
                    Add New Product
                </h1>

                <p>
                    Add a new product to Hena Electronics.
                </p>

                <Link to="/admin/products">
                    ← Back to Products
                </Link>

            </div>

            {message.text && (
                <div
                    className={`admin-form-message ${message.type}`}
                >

                    <div className="admin-form-message-icon">
                        {message.type ===
                            "success"
                            ? "✓"
                            : "!"}
                    </div>

                    <div className="admin-form-message-content">

                        <strong>
                            {message.type ===
                                "success"
                                ? "Product Added"
                                : "Unable to Add Product"}
                        </strong>

                        <span>
                            {message.text}
                        </span>

                    </div>

                </div>
            )}

            <form
                className="admin-product-form"
                onSubmit={handleSubmit}
            >

                <section className="admin-form-section">

                    <div className="admin-form-section-header">

                        <h2>
                            Basic Information
                        </h2>

                        <p>
                            Enter the main information about the product.
                        </p>

                    </div>

                    <div className="admin-form-grid">

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
                            />

                        </div>

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
                            >

                                <option value="">
                                    Select category
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

                        </div>

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
                                />

                            </div>

                        </div>

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

                <section className="admin-form-section">

                    <div className="admin-form-section-header">

                        <h2>
                            Product Details
                        </h2>

                        <p>
                            Add specifications that help customers understand the product.
                        </p>

                    </div>

                    <div className="admin-form-grid">

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
                                placeholder="e.g. Apple"
                            />

                        </div>

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
                                placeholder="e.g. iPhone 17 Pro"
                            />

                        </div>

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

                <section className="admin-form-section">

                    <div className="admin-form-section-header">

                        <h2>
                            Promotion
                        </h2>

                        <p>
                            Configure promotional pricing for this product.
                        </p>

                    </div>

                    <div className="admin-form-grid">

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

                <section className="admin-form-section">

                    <div className="admin-form-section-header">

                        <h2>
                            Product Images
                        </h2>

                        <p>
                            Upload up to 3 images for this product.
                        </p>

                    </div>

                    <div className="admin-image-upload">

                        <label
                            className="admin-image-upload-box"
                            htmlFor="product-images"
                        >

                            <div className="admin-upload-icon">
                                +
                            </div>

                            <strong>
                                Upload Product Images
                            </strong>

                            <span>
                                Click here to select images
                            </span>

                            <small>
                                JPG, PNG or WEBP • Maximum 5MB each
                            </small>

                        </label>

                        <input
                            id="product-images"
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            multiple
                            onChange={
                                handleImageChange
                            }
                        />

                    </div>

                    <div
                        className="admin-image-counter"
                        style={{
                            marginTop: "12px",
                            fontSize: "14px",
                            color: "#64748b",
                        }}
                    >
                        {imagePreviews.length}
                        /3 images selected
                    </div>

                    {imagePreviews.length > 0 && (
                        <div className="admin-image-preview-grid">

                            {imagePreviews.map(
                                (
                                    preview,
                                    index
                                ) => (
                                    <div
                                        className="admin-image-preview"
                                        key={
                                            preview.url
                                        }
                                    >

                                        <img
                                            src={
                                                preview.url
                                            }
                                            alt={`Product preview ${index + 1}`}
                                        />

                                        <span className="admin-image-preview-label">
                                            Image{" "}
                                            {index + 1}
                                        </span>

                                        <button
                                            type="button"
                                            className="admin-remove-image"
                                            onClick={() =>
                                                removeImage(
                                                    index
                                                )
                                            }
                                        >
                                            ×
                                        </button>

                                    </div>
                                )
                            )}

                        </div>
                    )}

                </section>

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
                            ? "Saving Product..."
                            : "Save Product"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default AddProduct;
