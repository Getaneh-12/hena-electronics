import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

function AddProduct() {
    const { addProduct } = useProducts();

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
        promotion: "none",
    });

    const [imagePreviews, setImagePreviews] = useState([]);
    const [savedProduct, setSavedProduct] = useState(false);


    /* ========================================
       HANDLE FORM INPUT
    ======================================== */

    const handleChange = (event) => {
        const { id, value } = event.target;

        setFormData({
            ...formData,
            [id]: value,
        });
    };


    /* ========================================
       CONVERT IMAGE TO BASE64
    ======================================== */

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {

            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = (error) => {
                reject(error);
            };

        });
    };


    /* ========================================
       HANDLE MULTIPLE IMAGES
    ======================================== */

    const handleImageChange = async (event) => {

        const files = Array.from(event.target.files);

        if (files.length === 0) {
            return;
        }

        const remainingSlots = 3 - imagePreviews.length;

        if (files.length > remainingSlots) {

            alert(
                `You can add only ${remainingSlots} more image${remainingSlots === 1 ? "" : "s"
                }. Maximum is 3 images.`
            );

            event.target.value = "";
            return;
        }


        try {

            const convertedImages = await Promise.all(

                files.map(async (file) => {

                    const base64Image =
                        await convertImageToBase64(file);

                    return {
                        url: base64Image,
                        name: file.name,
                    };

                })

            );


            setImagePreviews((currentImages) => [
                ...currentImages,
                ...convertedImages,
            ]);

        } catch (error) {

            console.error(
                "Error converting image:",
                error
            );

            alert(
                "There was a problem uploading the image."
            );

        }

        event.target.value = "";
    };


    /* ========================================
       REMOVE IMAGE
    ======================================== */

    const removeImage = (indexToRemove) => {

        setImagePreviews((currentImages) => {

            return currentImages.filter(
                (_, index) => index !== indexToRemove
            );

        });

    };


    /* ========================================
       SAVE PRODUCT
    ======================================== */

    const handleSubmit = (event) => {

        event.preventDefault();

        const imageUrls = imagePreviews.map(
            (image) => image.url
        );


        addProduct({

            ...formData,

            // First image is the main product image
            image: imageUrls[0] || "",

            // Store all product images
            images: imageUrls,

        });


        console.log(
            "Product Data:",
            formData
        );

        console.log(
            "Product Images:",
            imageUrls
        );


        setSavedProduct(true);
    };


    /* ========================================
       RESET FORM
    ======================================== */

    const resetForm = () => {

        setSavedProduct(false);

        setFormData({

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
            promotion: "none",

        });

        setImagePreviews([]);

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
                            Add Product
                        </h1>

                        <p>
                            Add a new product to Hena Electronics.
                        </p>

                    </div>


                    <Link
                        to="/admin/products"
                        className="admin-back-button"
                    >
                        ← Back to Products
                    </Link>

                </div>


                {/* ========================================
                    SUCCESS MESSAGE
                ======================================== */}

                {savedProduct && (

                    <div className="product-success-message">

                        <div className="success-icon">
                            ✓
                        </div>


                        <div className="success-content">

                            <h3>
                                Product Added Successfully
                            </h3>


                            <p>

                                <strong>
                                    {formData.productName}
                                </strong>{" "}

                                has been added successfully.

                            </p>

                        </div>


                        <div className="success-actions">

                            <Link
                                to="/admin/products"
                                className="success-view-button"
                            >
                                View Products
                            </Link>


                            <button
                                type="button"
                                className="success-add-button"
                                onClick={resetForm}
                            >
                                Add Another
                            </button>

                        </div>

                    </div>

                )}


                {/* ========================================
                    PRODUCT FORM
                ======================================== */}

                <form
                    className="admin-product-form"
                    onSubmit={handleSubmit}
                >


                    {/* BASIC INFORMATION */}

                    <div className="admin-form-section">

                        <h2>
                            Basic Information
                        </h2>

                        <p>
                            Enter the main information about the product.
                        </p>

                    </div>


                    <div className="admin-form-grid">


                        {/* Product Name */}

                        <div className="form-group">

                            <label htmlFor="productName">
                                Product Name
                            </label>

                            <input
                                type="text"
                                id="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                placeholder="e.g. Samsung Galaxy S25"
                                required
                            />

                        </div>


                        {/* Category */}

                        <div className="form-group">

                            <label htmlFor="category">
                                Category
                            </label>

                            <select
                                id="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
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


                        {/* Price */}

                        <div className="form-group">

                            <label htmlFor="price">
                                Price (ETB)
                            </label>

                            <input
                                type="number"
                                id="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="e.g. 45000"
                                min="0"
                                required
                            />

                        </div>


                        {/* Availability */}

                        <div className="form-group">

                            <label htmlFor="availability">
                                Availability
                            </label>

                            <select
                                id="availability"
                                value={formData.availability}
                                onChange={handleChange}
                            >

                                <option value="available">
                                    Available
                                </option>

                                <option value="out-of-stock">
                                    Out of Stock
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* DESCRIPTION */}

                    <div className="admin-form-section">

                        <h2>
                            Product Description
                        </h2>

                    </div>


                    <div className="form-group">

                        <label htmlFor="description">
                            Description
                        </label>

                        <textarea
                            id="description"
                            rows="5"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the product..."
                            required
                        ></textarea>

                    </div>


                    {/* SPECIFICATIONS */}

                    <div className="admin-form-section">

                        <h2>
                            Specifications
                        </h2>

                        <p>
                            Add important technical specifications.
                        </p>

                    </div>


                    <div className="admin-form-grid">


                        {/* Brand */}

                        <div className="form-group">

                            <label htmlFor="brand">
                                Brand
                            </label>

                            <input
                                type="text"
                                id="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                placeholder="e.g. Samsung"
                            />

                        </div>


                        {/* Model */}

                        <div className="form-group">

                            <label htmlFor="model">
                                Model
                            </label>

                            <input
                                type="text"
                                id="model"
                                value={formData.model}
                                onChange={handleChange}
                                placeholder="e.g. Galaxy S25"
                            />

                        </div>


                        {/* Storage */}

                        <div className="form-group">

                            <label htmlFor="storage">
                                Storage
                            </label>

                            <input
                                type="text"
                                id="storage"
                                value={formData.storage}
                                onChange={handleChange}
                                placeholder="e.g. 256GB"
                            />

                        </div>


                        {/* RAM */}

                        <div className="form-group">

                            <label htmlFor="ram">
                                RAM
                            </label>

                            <input
                                type="text"
                                id="ram"
                                value={formData.ram}
                                onChange={handleChange}
                                placeholder="e.g. 12GB"
                            />

                        </div>

                    </div>


                    {/* PRODUCT IMAGES */}

                    <div className="admin-form-section">

                        <h2>
                            Product Images
                        </h2>

                        <p>
                            Images are optional. You can upload up to
                            3 images: Front, Back and Side view.
                        </p>

                    </div>


                    <div className="product-image-upload">


                        {/* IMAGE PREVIEWS */}

                        {imagePreviews.length > 0 ? (

                            <div className="product-multiple-images">

                                {imagePreviews.map(
                                    (image, index) => (

                                        <div
                                            className="product-image-item"
                                            key={`${image.name}-${index}`}
                                        >

                                            <img
                                                src={image.url}
                                                alt={`Product ${index + 1}`}
                                                className="product-image-preview"
                                            />


                                            <span className="product-image-label">

                                                {index === 0 &&
                                                    "Front View"}

                                                {index === 1 &&
                                                    "Back View"}

                                                {index === 2 &&
                                                    "Side View"}

                                            </span>


                                            <button
                                                type="button"
                                                className="product-image-remove"
                                                onClick={() =>
                                                    removeImage(index)
                                                }
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    )
                                )}

                            </div>

                        ) : (

                            <div className="product-upload-icon">
                                📷
                            </div>

                        )}


                        {/* IMAGE TITLE */}

                        <h3>

                            {imagePreviews.length === 0
                                ? "Upload Product Images"
                                : `${imagePreviews.length} Image${imagePreviews.length > 1
                                    ? "s"
                                    : ""
                                } Selected`}

                        </h3>


                        <p>
                            Optional • JPG, PNG or WEBP • Maximum 3 images
                        </p>


                        {/* FILE INPUT */}

                        {imagePreviews.length < 3 && (

                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                multiple
                                onChange={handleImageChange}
                            />

                        )}

                    </div>


                    {/* PROMOTION */}

                    <div className="admin-form-section">

                        <h2>
                            Promotion
                        </h2>

                        <p>
                            Add an optional discount or special offer.
                        </p>

                    </div>


                    <div className="admin-form-grid">


                        {/* Discount */}

                        <div className="form-group">

                            <label htmlFor="discount">
                                Discount (%)
                            </label>

                            <input
                                type="number"
                                id="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                placeholder="e.g. 10"
                                min="0"
                                max="100"
                            />

                        </div>


                        {/* Promotion Status */}

                        <div className="form-group">

                            <label htmlFor="promotion">
                                Promotion Status
                            </label>

                            <select
                                id="promotion"
                                value={formData.promotion}
                                onChange={handleChange}
                            >

                                <option value="none">
                                    No Promotion
                                </option>

                                <option value="active">
                                    Active Promotion
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* ACTIONS */}

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
                        >
                            Save Product
                        </button>

                    </div>

                </form>

            </main>

        </div>
    );
}

export default AddProduct;