import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

function EditProduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const { products, updateProduct } = useProducts();


    // Find product
    const product = products.find(
        (item) => String(item.id) === String(id)
    );


    // Existing product images
    const existingImages =
        product?.images && product.images.length > 0
            ? product.images
            : product?.image
                ? [product.image]
                : [];


    const [formData, setFormData] = useState(
        product
            ? { ...product }
            : {
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
            }
    );


    const [imagePreviews, setImagePreviews] =
        useState(existingImages);


    const [saved, setSaved] = useState(false);


    /* ========================================
       PRODUCT NOT FOUND
    ======================================== */

    if (!product) {

        return (
            <div className="admin-page">

                <h1>
                    Product Not Found
                </h1>

                <p>
                    The product you are trying to edit does not exist.
                </p>

                <p>
                    Product ID from URL:
                    <strong> {id}</strong>
                </p>

                <Link to="/admin/products">
                    ← Back to Products
                </Link>

            </div>
        );
    }


    /* ========================================
       HANDLE FORM CHANGE
    ======================================== */

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));

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
       ADD NEW IMAGES
    ======================================== */

    const handleImageChange = async (event) => {

        const files = Array.from(event.target.files);

        if (files.length === 0) {
            return;
        }


        const remainingSlots =
            3 - imagePreviews.length;


        if (files.length > remainingSlots) {

            alert(
                `You can add only ${remainingSlots} more image${remainingSlots === 1 ? "" : "s"
                }. Maximum is 3 images.`
            );

            event.target.value = "";

            return;
        }


        try {

            const convertedImages =
                await Promise.all(

                    files.map(async (file) => {

                        const base64Image =
                            await convertImageToBase64(file);

                        return base64Image;

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
                (_, index) =>
                    index !== indexToRemove
            );

        });

    };


    /* ========================================
       SAVE PRODUCT
    ======================================== */

    const handleSubmit = (event) => {

        event.preventDefault();


        const updatedProduct = {

            ...formData,

            // First image = main image
            image:
                imagePreviews[0] || "",

            // All images
            images:
                imagePreviews,

        };


        updateProduct(
            product.id,
            updatedProduct
        );


        setSaved(true);


        setTimeout(() => {

            navigate("/admin/products");

        }, 1000);

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
                MAIN
            ======================================== */}

            <main className="admin-main">


                {/* HEADER */}

                <div className="admin-header">

                    <div>

                        <p className="admin-label">
                            PRODUCT MANAGEMENT
                        </p>

                        <h1>
                            Edit Product
                        </h1>

                        <p>
                            Update the information of this product.
                        </p>

                    </div>


                    <Link
                        to="/admin/products"
                        className="admin-view-button"
                    >
                        ← Back to Products
                    </Link>

                </div>


                {/* SUCCESS MESSAGE */}

                {saved && (

                    <div className="admin-success-message">

                        Product updated successfully!

                    </div>

                )}


                <form
                    className="admin-product-form"
                    onSubmit={handleSubmit}
                >


                    {/* ========================================
                        BASIC INFORMATION
                    ======================================== */}

                    <div className="admin-form-section">

                        <h2>
                            Basic Information
                        </h2>

                        <div className="admin-form-grid">


                            <div className="admin-form-group">

                                <label>
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="admin-form-group">

                                <label>
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Category
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
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="admin-form-group">

                                <label>
                                    Availability
                                </label>

                                <select
                                    name="availability"
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

                    </div>


                    {/* ========================================
                        DESCRIPTION
                    ======================================== */}

                    <div className="admin-form-section">

                        <h2>
                            Description
                        </h2>

                        <div className="admin-form-group">

                            <label>
                                Product Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="5"
                            />

                        </div>

                    </div>


                    {/* ========================================
                        SPECIFICATIONS
                    ======================================== */}

                    <div className="admin-form-section">

                        <h2>
                            Specifications
                        </h2>

                        <div className="admin-form-grid">


                            <div className="admin-form-group">

                                <label>
                                    Brand
                                </label>

                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="admin-form-group">

                                <label>
                                    Model
                                </label>

                                <input
                                    type="text"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="admin-form-group">

                                <label>
                                    Storage
                                </label>

                                <input
                                    type="text"
                                    name="storage"
                                    value={formData.storage}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="admin-form-group">

                                <label>
                                    RAM
                                </label>

                                <input
                                    type="text"
                                    name="ram"
                                    value={formData.ram}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                    </div>


                    {/* ========================================
                        PRODUCT IMAGES
                    ======================================== */}

                    <div className="admin-form-section">

                        <h2>
                            Product Images
                        </h2>

                        <p>
                            You can keep, remove or add images.
                            Maximum 3 images.
                        </p>

                    </div>


                    <div className="product-image-upload">


                        {/* EXISTING / NEW IMAGES */}

                        {imagePreviews.length > 0 ? (

                            <div className="product-multiple-images">

                                {imagePreviews.map(
                                    (image, index) => (

                                        <div
                                            className="product-image-item"
                                            key={`${image}-${index}`}
                                        >

                                            <img
                                                src={image}
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


                        {/* TITLE */}

                        <h3>

                            {imagePreviews.length === 0
                                ? "No Images"
                                : `${imagePreviews.length} Image${imagePreviews.length > 1
                                    ? "s"
                                    : ""
                                } Selected`}

                        </h3>


                        <p>
                            JPG, PNG or WEBP • Maximum 3 images
                        </p>


                        {/* ADD IMAGE */}

                        {imagePreviews.length < 3 && (

                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                multiple
                                onChange={handleImageChange}
                            />

                        )}

                    </div>


                    {/* ========================================
                        PROMOTION
                    ======================================== */}

                    <div className="admin-form-section">

                        <h2>
                            Promotion
                        </h2>

                        <div className="admin-form-grid">


                            <div className="admin-form-group">

                                <label>
                                    Discount
                                </label>

                                <input
                                    type="number"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleChange}
                                    placeholder="Example: 10"
                                    min="0"
                                    max="100"
                                />

                            </div>


                            <div className="admin-form-group">

                                <label>
                                    Promotion
                                </label>

                                <select
                                    name="promotion"
                                    value={formData.promotion}
                                    onChange={handleChange}
                                >

                                    <option value="none">
                                        No Promotion
                                    </option>

                                    <option value="active">
                                        Active
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>


                    {/* ========================================
                        ACTIONS
                    ======================================== */}

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
                            Save Changes
                        </button>

                    </div>

                </form>

            </main>

        </div>
    );
}

export default EditProduct;