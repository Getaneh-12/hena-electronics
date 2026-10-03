import {
    useEffect,
    useRef,
    useState,
} from "react";
import {
    Link,
    useParams,
} from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useAdminAuth } from "../context/AdminAuthContext";

function EditProduct() {
    const { id } = useParams();

    const {
        products,
        updateProduct,
        uploadProductImages,
        deleteProductImage,
    } = useProducts();

    const { getToken } =
        useAdminAuth();

    const fileInputRef =
        useRef(null);

    const [formData, setFormData] =
        useState({
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

    const [
        existingImages,
        setExistingImages,
    ] = useState([]);

    const [
        newImages,
        setNewImages,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        saving,
        setSaving,
    ] = useState(false);

    const [
        deletingImageId,
        setDeletingImageId,
    ] = useState(null);

    const [
        confirmDelete,
        setConfirmDelete,
    ] = useState(null);

    const [
        message,
        setMessage,
    ] = useState({
        type: "",
        text: "",
    });

    useEffect(() => {
        const product =
            products.find(
                (item) =>
                    Number(item.id) ===
                    Number(id)
            );

        if (!product) {
            setLoading(false);
            return;
        }

        setFormData({
            productName:
                product.productName ||
                "",
            category:
                product.category ||
                "Smartphones",
            price:
                product.price ||
                "",
            brand:
                product.brand ||
                "",
            model:
                product.model ||
                "",
            storage:
                product.storage ||
                "",
            ram:
                product.ram ||
                "",
            description:
                product.description ||
                "",
            availability:
                String(
                    product.availability ||
                    "available"
                ).toLowerCase() ===
                    "out of stock"
                    ? "out_of_stock"
                    : String(
                        product.availability ||
                        "available"
                    ).toLowerCase(),
            promotion:
                String(
                    product.promotion ||
                    "inactive"
                ).toLowerCase() ===
                    "active"
                    ? "active"
                    : "inactive",
            discount:
                product.discount ||
                0,
        });
        if (
            Array.isArray(
                product.imageDetails
            )
        ) {
            setExistingImages(
                product.imageDetails
                    .filter(
                        (image) =>
                            image &&
                            image.id !==
                            undefined &&
                            image.id !==
                            null
                    )
                    .map(
                        (image) => ({
                            id:
                                Number(
                                    image.id
                                ),
                            url:
                                image.image_url,
                        })
                    )
            );
        }

        else if (
            Array.isArray(
                product.images
            )
        ) {
            setExistingImages(
                product.images.map(
                    (
                        image,
                        index
                    ) => ({
                        id: null,
                        url: image,
                        temporaryId:
                            `image-${index}-${image}`,
                    })
                )
            );
        } else if (
            product.image
        ) {
            setExistingImages([
                {
                    id: null,
                    url:
                        product.image,
                    temporaryId:
                        `image-${product.image}`,
                },
            ]);
        } else {
            setExistingImages([]);
        }

        setNewImages([]);
        setLoading(false);
    }, [products, id]);

    useEffect(() => {
        return () => {
            newImages.forEach(
                (image) => {
                    if (image.url) {
                        URL.revokeObjectURL(
                            image.url
                        );
                    }
                }
            );
        };
    }, [newImages]);

    const handleChange = (
        event
    ) => {
        const {
            name,
            value,
        } = event.target;

        setFormData(
            (previous) => ({
                ...previous,
                [name]: value,
            })
        );
    };

    const showMessage = (
        type,
        text
    ) => {
        setMessage({
            type,
            text,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleImageSelect = (
        event
    ) => {
        const selectedFiles =
            Array.from(
                event.target.files ||
                []
            );

        if (
            selectedFiles.length ===
            0
        ) {
            return;
        }

        const total =
            existingImages.length +
            newImages.length +
            selectedFiles.length;

        if (total > 3) {
            showMessage(
                "error",
                "A product can have a maximum of 3 images."
            );

            event.target.value =
                "";

            return;
        }

        const validTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];

        const validFiles = [];

        for (
            const file of selectedFiles
        ) {
            if (
                !validTypes.includes(
                    file.type
                )
            ) {
                showMessage(
                    "error",
                    `${file.name} is not a supported image type.`
                );

                continue;
            }

            if (
                file.size >
                5 *
                1024 *
                1024
            ) {
                showMessage(
                    "error",
                    `${file.name} is larger than 5MB.`
                );

                continue;
            }

            validFiles.push({
                file,
                url:
                    URL.createObjectURL(
                        file
                    ),
            });
        }

        if (
            validFiles.length > 0
        ) {
            setNewImages(
                (previous) => [
                    ...previous,
                    ...validFiles,
                ]
            );

            setMessage({
                type: "",
                text: "",
            });
        }

        event.target.value = "";
    };

    const handleRemoveNewImage =
        (index) => {
            setNewImages(
                (previous) => {
                    const image =
                        previous[index];

                    if (
                        image &&
                        image.url
                    ) {
                        URL.revokeObjectURL(
                            image.url
                        );
                    }

                    return previous.filter(
                        (
                            _,
                            imageIndex
                        ) =>
                            imageIndex !==
                            index
                    );
                }
            );
        };

    const requestRemoveExistingImage =
        (image) => {
            if (!image.id) {
                showMessage(
                    "error",
                    "This image is not connected to a database image record."
                );

                return;
            }

            if (
                existingImages.length <=
                1 &&
                newImages.length ===
                0
            ) {
                showMessage(
                    "error",
                    "The product must have at least one image."
                );

                return;
            }

            setConfirmDelete(
                image
            );
        };

    const cancelRemoveImage =
        () => {
            if (
                deletingImageId ===
                null
            ) {
                setConfirmDelete(
                    null
                );
            }
        };

    const handleConfirmRemoveImage =
        async () => {
            if (!confirmDelete) {
                return;
            }

            const image =
                confirmDelete;

            try {
                const token =
                    getToken();

                if (!token) {
                    throw new Error(
                        "Your admin session has expired. Please log in again."
                    );
                }

                setDeletingImageId(
                    Number(
                        image.id
                    )
                );

                setConfirmDelete(
                    null
                );

                setMessage({
                    type: "",
                    text: "",
                });

                await deleteProductImage(
                    Number(id),
                    Number(image.id)
                );

                setExistingImages(
                    (previous) =>
                        previous.filter(
                            (item) =>
                                Number(
                                    item.id
                                ) !==
                                Number(
                                    image.id
                                )
                        )
                );

                showMessage(
                    "success",
                    "Product image removed successfully."
                );
            } catch (
            error
            ) {
                console.error(
                    "Remove image error:",
                    error
                );

                showMessage(
                    "error",
                    error.message ||
                    "Failed to remove product image."
                );
            } finally {
                setDeletingImageId(
                    null
                );
            }
        };

    const handleSubmit = async (
        event
    ) => {
        event.preventDefault();

        if (
            !formData.productName.trim()
        ) {
            showMessage(
                "error",
                "Product name is required."
            );

            return;
        }

        if (!formData.category) {
            showMessage(
                "error",
                "Please select a product category."
            );

            return;
        }

        if (
            !formData.price ||
            Number(
                formData.price
            ) <= 0
        ) {
            showMessage(
                "error",
                "Please enter a valid product price."
            );

            return;
        }

        if (
            formData.promotion ===
            "active" &&
            Number(
                formData.discount
            ) <= 0
        ) {
            showMessage(
                "error",
                "Please enter a discount greater than 0% for an active promotion."
            );

            return;
        }

        if (
            existingImages.length +
            newImages.length >
            3
        ) {
            showMessage(
                "error",
                "A product can have a maximum of 3 images."
            );

            return;
        }

        const token =
            getToken();

        if (!token) {
            showMessage(
                "error",
                "Your admin session has expired. Please log in again."
            );

            return;
        }

        setSaving(true);

        setMessage({
            type: "",
            text: "",
        });

        try {
            const result =
                await updateProduct(
                    id,
                    {
                        ...formData,
                        price:
                            Number(
                                formData.price
                            ),
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
                                ) ||
                                0
                                : 0,
                    }
                );

            if (
                !result ||
                result.success ===
                false
            ) {
                throw new Error(
                    result?.message ||
                    "Failed to update product."
                );
            }

            if (
                newImages.length >
                0
            ) {
                await uploadProductImages(
                    id,
                    newImages.map(
                        (image) =>
                            image.file
                    )
                );
            }

            newImages.forEach(
                (image) => {
                    if (image.url) {
                        URL.revokeObjectURL(
                            image.url
                        );
                    }
                }
            );

            setNewImages([]);

            if (
                fileInputRef.current
            ) {
                fileInputRef.current.value =
                    "";
            }

            showMessage(
                "success",
                "Product and images updated successfully."
            );
        } catch (
        error
        ) {
            console.error(
                "Edit product error:",
                error
            );

            showMessage(
                "error",
                error.message ||
                "Something went wrong while updating the product."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-page">
                <div className="admin-form-loading">
                    Loading product...
                </div>
            </div>
        );
    }

    const currentProduct =
        products.find(
            (product) =>
                Number(
                    product.id
                ) ===
                Number(id)
        );

    if (!currentProduct) {
        return (
            <div className="admin-page">
                <div className="admin-form-empty">
                    <h2>
                        Product not found
                    </h2>

                    <p>
                        The product you are trying to edit could not be found.
                    </p>

                    <Link to="/admin/products">
                        ← Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    const totalImages =
        existingImages.length +
        newImages.length;

    const canAddImages =
        totalImages < 3;

    return (
        <div className="admin-page">
            <div className="add-product-title">
                <span>
                    PRODUCT MANAGEMENT
                </span>

                <h1>
                    Edit Product
                </h1>

                <p>
                    Update product information, specifications and images.
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
                                ? "Changes Saved"
                                : "Update Failed"}
                        </strong>

                        <span>
                            {
                                message.text
                            }
                        </span>
                    </div>
                </div>
            )}

            <form
                className="admin-product-form"
                onSubmit={
                    handleSubmit
                }
            >
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
                            Update specifications that help customers understand the product.
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
                                placeholder="e.g. Samsung"
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
                                placeholder="e.g. Galaxy S25"
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
                            Product Images
                        </h2>

                        <p>
                            Manage the product images. You can have up to 3 images.
                        </p>
                    </div>

                    <div className="edit-image-summary">
                        <span>
                            {totalImages} / 3
                            images
                        </span>

                        <span>
                            {canAddImages
                                ? `You can add ${3 -
                                totalImages
                                } more image${3 -
                                    totalImages !==
                                    1
                                    ? "s"
                                    : ""
                                }`
                                : "Maximum number of images reached"}
                        </span>
                    </div>

                    {existingImages.length >
                        0 && (
                            <div className="admin-image-preview-grid">
                                {existingImages.map(
                                    (
                                        image,
                                        index
                                    ) => (
                                        <div
                                            className="admin-image-preview"
                                            key={
                                                image.id ||
                                                image.temporaryId ||
                                                `existing-${index}`
                                            }
                                        >
                                            <img
                                                src={
                                                    image.url
                                                }
                                                alt={`${formData.productName} ${index +
                                                    1
                                                    }`}
                                            />

                                            <span className="admin-image-preview-label">
                                                Image{" "}
                                                {index +
                                                    1}
                                            </span>
                                            <button
                                                type="button"
                                                className="admin-image-remove-button"
                                                onClick={() =>
                                                    requestRemoveExistingImage(
                                                        image
                                                    )
                                                }
                                                disabled={
                                                    deletingImageId !== null
                                                }
                                                title="Remove image"
                                                aria-label="Remove image"
                                            >
                                                {deletingImageId === image.id
                                                    ? "..."
                                                    : "×"}
                                            </button>

                                        </div>
                                    )
                                )}
                            </div>
                        )}

                    {newImages.length >
                        0 && (
                            <div className="admin-image-preview-grid">
                                {newImages.map(
                                    (
                                        image,
                                        index
                                    ) => (
                                        <div
                                            className="admin-image-preview admin-new-image-preview"
                                            key={
                                                image.url
                                            }
                                        >
                                            <img
                                                src={
                                                    image.url
                                                }
                                                alt={`New image ${index +
                                                    1
                                                    }`}
                                            />

                                            <span className="admin-image-preview-label">
                                                New Image
                                            </span>

                                            <button
                                                type="button"
                                                className="admin-image-remove-button"
                                                onClick={() =>
                                                    handleRemoveNewImage(
                                                        index
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        )}

                    {existingImages.length ===
                        0 &&
                        newImages.length ===
                        0 && (
                            <div className="edit-no-images">
                                No images available for this product.
                            </div>
                        )}

                    {canAddImages && (
                        <div className="admin-image-upload-area">
                            <input
                                ref={
                                    fileInputRef
                                }
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                multiple
                                onChange={
                                    handleImageSelect
                                }
                            />

                            <p>
                                Select JPG, JPEG, PNG or WEBP images.
                            </p>

                            <p>
                                Maximum 5MB per image.
                            </p>

                            <p>
                                Maximum 3 images per product.
                            </p>
                        </div>
                    )}
                </section>

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
                        disabled={
                            saving ||
                            deletingImageId !==
                            null
                        }
                    >
                        {saving
                            ? "Saving Changes..."
                            : "Save Changes"}
                    </button>
                </div>
            </form>

            {confirmDelete && (
                <div className="admin-modal-overlay">
                    <div className="admin-confirm-modal">
                        <div className="admin-confirm-modal-icon">
                            !
                        </div>

                        <h2>
                            Remove Image?
                        </h2>

                        <p>
                            Are you sure you want to remove this image from the product?
                        </p>

                        <div className="admin-confirm-modal-actions">
                            <button
                                type="button"
                                onClick={
                                    cancelRemoveImage
                                }
                                className="admin-cancel-button"
                                disabled={
                                    deletingImageId !==
                                    null
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={
                                    handleConfirmRemoveImage
                                }
                                className="admin-delete-button"
                                disabled={
                                    deletingImageId !==
                                    null
                                }
                            >
                                {deletingImageId !==
                                    null
                                    ? "Removing..."
                                    : "Remove Image"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditProduct;