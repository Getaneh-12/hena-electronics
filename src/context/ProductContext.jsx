import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const ProductContext =
    createContext(null);

const API_URL =
    "http://localhost:5000/api/products";

const BACKEND_URL =
    "http://localhost:5000";

const getToken = () => {
    return (
        localStorage.getItem(
            "henaAdminToken"
        ) || ""
    );
};

const getAuthHeaders = () => {
    const token =
        getToken();

    if (!token) {
        return {};
    }

    return {
        Authorization:
            `Bearer ${token}`,
    };
};

const getJsonHeaders = () => {
    return {
        "Content-Type":
            "application/json",
        ...getAuthHeaders(),
    };
};

const formatImageUrl = (
    imageUrl
) => {
    if (!imageUrl) {
        return "";
    }

    if (
        typeof imageUrl ===
        "object"
    ) {
        imageUrl =
            imageUrl.image_url ||
            imageUrl.imageUrl ||
            imageUrl.url ||
            imageUrl.path ||
            "";
    }

    if (!imageUrl) {
        return "";
    }

    imageUrl =
        String(imageUrl);

    if (
        imageUrl.startsWith(
            "http://"
        ) ||
        imageUrl.startsWith(
            "https://"
        )
    ) {
        return imageUrl;
    }

    if (
        imageUrl.startsWith("/")
    ) {
        return (
            BACKEND_URL +
            imageUrl
        );
    }

    return (
        BACKEND_URL +
        "/" +
        imageUrl
    );
};

const formatProduct = (
    product
) => {
    let productImages = [];

    if (
        Array.isArray(
            product.images
        )
    ) {
        productImages =
            product.images
                .map(
                    formatImageUrl
                )
                .filter(Boolean);
    } else if (
        product.images
    ) {
        productImages = [
            formatImageUrl(
                product.images
            ),
        ].filter(Boolean);
    }

    if (
        productImages.length ===
        0 &&
        product.image
    ) {
        productImages = [
            formatImageUrl(
                product.image
            ),
        ].filter(Boolean);
    }

    let imageDetails = [];

    if (
        Array.isArray(
            product.imageDetails
        )
    ) {
        imageDetails =
            product.imageDetails
                .map(
                    (image) => ({
                        id:
                            image.id,
                        product_id:
                            image.product_id,
                        image_url:
                            formatImageUrl(
                                image.image_url
                            ),
                    })
                )
                .filter(
                    (image) =>
                        image.image_url
                );
    }

    if (
        imageDetails.length ===
        0 &&
        productImages.length > 0
    ) {
        imageDetails =
            productImages.map(
                (
                    imageUrl,
                    index
                ) => ({
                    id: null,
                    image_url:
                        imageUrl,
                })
            );
    }

    return {
        id:
            product.id,

        productName:
            product.productName ||
            product.product_name ||
            "",

        category:
            product.category ||
            "",

        price:
            Number(
                product.price || 0
            ),

        availability:
            product.availability ||
            "unavailable",

        description:
            product.description ||
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

        discount:
            Number(
                product.discount ||
                0
            ),

        promotion:
            String(
                product.promotion ||
                "inactive"
            ).toLowerCase(),

        images:
            productImages,

        image:
            productImages[0] ||
            "",

        imageDetails:
            imageDetails,

        createdAt:
            product.created_at,

        updatedAt:
            product.updated_at,
    };
};

export function ProductProvider({
    children,
}) {
    const [
        products,
        setProducts,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState(null);

    const fetchProducts =
        async () => {
            try {
                setLoading(true);
                setError(null);

                const response =
                    await fetch(
                        API_URL
                    );

                const data =
                    await response.json();

                if (
                    !response.ok ||
                    data.success ===
                    false
                ) {
                    throw new Error(
                        data.message ||
                        "Failed to fetch products"
                    );
                }

                let productList =
                    [];

                if (
                    Array.isArray(
                        data
                    )
                ) {
                    productList =
                        data;
                } else if (
                    Array.isArray(
                        data.products
                    )
                ) {
                    productList =
                        data.products;
                } else if (
                    Array.isArray(
                        data.data
                    )
                ) {
                    productList =
                        data.data;
                }

                const formattedProducts =
                    productList.map(
                        formatProduct
                    );

                setProducts(
                    formattedProducts
                );
            } catch (
            fetchError
            ) {
                console.error(
                    "Error fetching products:",
                    fetchError
                );

                setError(
                    fetchError.message ||
                    "Could not load products."
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct =
        async (
            product
        ) => {
            try {
                const response =
                    await fetch(
                        API_URL,
                        {
                            method:
                                "POST",
                            headers:
                                getJsonHeaders(),
                            body:
                                JSON.stringify(
                                    {
                                        productName:
                                            product.productName,
                                        category:
                                            product.category,
                                        price:
                                            Number(
                                                product.price
                                            ),
                                        availability:
                                            product.availability,
                                        description:
                                            product.description,
                                        brand:
                                            product.brand,
                                        model:
                                            product.model,
                                        storage:
                                            product.storage,
                                        ram:
                                            product.ram,
                                        discount:
                                            Number(
                                                product.discount ||
                                                0
                                            ),
                                        promotion:
                                            String(
                                                product.promotion ||
                                                "inactive"
                                            ).toLowerCase() ===
                                                "active"
                                                ? "active"
                                                : "inactive",
                                    }
                                ),
                        }
                    );

                const data =
                    await response.json();

                if (
                    !response.ok ||
                    data.success ===
                    false
                ) {
                    throw new Error(
                        data.message ||
                        "Failed to add product"
                    );
                }

                await fetchProducts();

                return data;
            } catch (
            addError
            ) {
                console.error(
                    "Error adding product:",
                    addError
                );

                throw addError;
            }
        };

    const updateProduct =
        async (
            id,
            updatedProduct
        ) => {
            try {
                const response =
                    await fetch(
                        `${API_URL}/${id}`,
                        {
                            method:
                                "PUT",
                            headers:
                                getJsonHeaders(),
                            body:
                                JSON.stringify(
                                    {
                                        productName:
                                            updatedProduct.productName,
                                        category:
                                            updatedProduct.category,
                                        price:
                                            Number(
                                                updatedProduct.price
                                            ),
                                        availability:
                                            updatedProduct.availability,
                                        description:
                                            updatedProduct.description,
                                        brand:
                                            updatedProduct.brand,
                                        model:
                                            updatedProduct.model,
                                        storage:
                                            updatedProduct.storage,
                                        ram:
                                            updatedProduct.ram,
                                        discount:
                                            Number(
                                                updatedProduct.discount ||
                                                0
                                            ),
                                        promotion:
                                            String(
                                                updatedProduct.promotion ||
                                                "inactive"
                                            ).toLowerCase() ===
                                                "active"
                                                ? "active"
                                                : "inactive",
                                    }
                                ),
                        }
                    );

                const data =
                    await response.json();

                if (
                    !response.ok ||
                    data.success ===
                    false
                ) {
                    throw new Error(
                        data.message ||
                        "Failed to update product"
                    );
                }

                await fetchProducts();

                return data;
            } catch (
            updateError
            ) {
                console.error(
                    "Error updating product:",
                    updateError
                );

                throw updateError;
            }
        };

    const uploadProductImages =
        async (
            id,
            files
        ) => {
            try {
                if (
                    !files ||
                    files.length === 0
                ) {
                    throw new Error(
                        "Please select at least one image"
                    );
                }

                const formData =
                    new FormData();

                files.forEach(
                    (file) => {
                        formData.append(
                            "images",
                            file
                        );
                    }
                );

                const token =
                    getToken();

                if (!token) {
                    throw new Error(
                        "Admin authentication is required."
                    );
                }

                const response =
                    await fetch(
                        `${API_URL}/${id}/images`,
                        {
                            method:
                                "POST",
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                            body:
                                formData,
                        }
                    );

                const data =
                    await response.json();

                if (
                    !response.ok ||
                    data.success ===
                    false
                ) {
                    throw new Error(
                        data.message ||
                        "Failed to upload product images"
                    );
                }

                await fetchProducts();

                return data;
            } catch (
            uploadError
            ) {
                console.error(
                    "Error uploading product images:",
                    uploadError
                );

                throw uploadError;
            }
        };
    const deleteProductImage =
        async (
            productId,
            imageId
        ) => {
            try {
                const token =
                    getToken();

                if (!token) {
                    throw new Error(
                        "Admin authentication is required. Please login again."
                    );
                }

                const productIdValue =
                    Number(
                        productId
                    );

                const imageIdValue =
                    Number(
                        imageId
                    );

                if (
                    !Number.isInteger(
                        productIdValue
                    ) ||
                    productIdValue <= 0
                ) {
                    throw new Error(
                        "Invalid product ID."
                    );
                }

                if (
                    !Number.isInteger(
                        imageIdValue
                    ) ||
                    imageIdValue <= 0
                ) {
                    throw new Error(
                        "Invalid image ID."
                    );
                }

                const response =
                    await fetch(
                        `${API_URL}/${productIdValue}/images/${imageIdValue}`,
                        {
                            method:
                                "DELETE",
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );

                const data =
                    await response.json();

                if (
                    response.status ===
                    401
                ) {
                    localStorage.removeItem(
                        "henaAdminToken"
                    );

                    throw new Error(
                        "Your admin session has expired. Please login again."
                    );
                }

                if (
                    !response.ok ||
                    data.success !==
                    true
                ) {
                    throw new Error(
                        data.message ||
                        "Failed to remove product image."
                    );
                }

                await fetchProducts();

                return data;
            } catch (
            deleteImageError
            ) {
                console.error(
                    "Error deleting product image:",
                    deleteImageError
                );

                throw deleteImageError;
            }
        };

    const deleteProduct =
        async (
            id
        ) => {
            try {
                const response =
                    await fetch(
                        `${API_URL}/${id}`,
                        {
                            method:
                                "DELETE",
                            headers:
                                getAuthHeaders(),
                        }
                    );

                const data =
                    await response.json();

                if (
                    !response.ok ||
                    data.success ===
                    false
                ) {
                    throw new Error(
                        data.message ||
                        "Failed to delete product"
                    );
                }

                await fetchProducts();

                return data;
            } catch (
            deleteError
            ) {
                console.error(
                    "Error deleting product:",
                    deleteError
                );

                throw deleteError;
            }
        };

    const removePromotion =
        async (
            id
        ) => {
            try {
                const product =
                    products.find(
                        (item) =>
                            String(
                                item.id
                            ) ===
                            String(
                                id
                            )
                    );

                if (!product) {
                    throw new Error(
                        "Product not found"
                    );
                }

                const response =
                    await fetch(
                        `${API_URL}/${id}`,
                        {
                            method:
                                "PUT",
                            headers:
                                getJsonHeaders(),
                            body:
                                JSON.stringify(
                                    {
                                        productName:
                                            product.productName,
                                        category:
                                            product.category,
                                        price:
                                            Number(
                                                product.price
                                            ),
                                        availability:
                                            product.availability,
                                        description:
                                            product.description,
                                        brand:
                                            product.brand,
                                        model:
                                            product.model,
                                        storage:
                                            product.storage,
                                        ram:
                                            product.ram,
                                        discount:
                                            0,
                                        promotion:
                                            "inactive",
                                    }
                                ),
                        }
                    );

                const data =
                    await response.json();

                if (
                    !response.ok ||
                    data.success ===
                    false
                ) {
                    throw new Error(
                        data.message ||
                        "Failed to remove promotion"
                    );
                }

                await fetchProducts();

                return data;
            } catch (
            promotionError
            ) {
                console.error(
                    "Error removing promotion:",
                    promotionError
                );

                throw promotionError;
            }
        };

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                error,
                fetchProducts,
                addProduct,
                updateProduct,
                uploadProductImages,
                deleteProductImage,
                deleteProduct,
                removePromotion,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    return useContext(
        ProductContext
    );
}