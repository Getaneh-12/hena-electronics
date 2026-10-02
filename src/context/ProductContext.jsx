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


// ========================================
// FORMAT IMAGE URL
// ========================================

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


// ========================================
// FORMAT PRODUCT
// ========================================

const formatProduct = (
    product
) => {

    let productImages = [];


    // ========================================
    // PRODUCT IMAGES ARRAY
    // ========================================

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


    // ========================================
    // OLD SINGLE IMAGE
    // ========================================

    if (
        productImages.length === 0 &&
        product.image
    ) {

        productImages = [
            formatImageUrl(
                product.image
            ),
        ].filter(Boolean);
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


        createdAt:
            product.created_at,


        updatedAt:
            product.updated_at,
    };
};


// ========================================
// PRODUCT PROVIDER
// ========================================

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


    // ========================================
    // GET PRODUCTS
    // ========================================

    const fetchProducts =
        async () => {

            try {

                setLoading(true);

                setError(null);


                const response =
                    await fetch(
                        API_URL
                    );


                if (
                    !response.ok
                ) {

                    let errorMessage =
                        "Failed to fetch products";


                    try {

                        const errorData =
                            await response.json();


                        errorMessage =
                            errorData.message ||
                            errorMessage;

                    } catch {
                        // Ignore invalid JSON
                    }


                    throw new Error(
                        errorMessage
                    );
                }


                const data =
                    await response.json();


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


                console.log(
                    "Products received from backend:",
                    productList
                );


                const formattedProducts =
                    productList.map(
                        formatProduct
                    );


                console.log(
                    "Formatted products:",
                    formattedProducts
                );


                setProducts(
                    formattedProducts
                );

            } catch (
            error
            ) {

                console.error(
                    "Error fetching products:",
                    error
                );


                setError(
                    error.message ||
                    "Could not load products."
                );


                setProducts([]);

            } finally {

                setLoading(false);
            }
        };


    // ========================================
    // LOAD PRODUCTS
    // ========================================

    useEffect(
        () => {

            fetchProducts();

        },
        []
    );


    // ========================================
    // ADD PRODUCT
    // ========================================

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

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body:
                                JSON.stringify({

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
                                }),
                        }
                    );


                const data =
                    await response.json();


                if (
                    !response.ok
                ) {

                    throw new Error(
                        data.message ||
                        "Failed to add product"
                    );
                }


                await fetchProducts();


                return data;

            } catch (
            error
            ) {

                console.error(
                    "Error adding product:",
                    error
                );

                throw error;
            }
        };


    // ========================================
    // UPDATE PRODUCT
    // ========================================

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

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body:
                                JSON.stringify({

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
                                }),
                        }
                    );


                const data =
                    await response.json();


                if (
                    !response.ok
                ) {

                    throw new Error(
                        data.message ||
                        "Failed to update product"
                    );
                }


                await fetchProducts();


                return data;

            } catch (
            error
            ) {

                console.error(
                    "Error updating product:",
                    error
                );

                throw error;
            }
        };


    // ========================================
    // DELETE PRODUCT
    // ========================================

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
                        }
                    );


                const data =
                    await response.json();


                if (
                    !response.ok
                ) {

                    throw new Error(
                        data.message ||
                        "Failed to delete product"
                    );
                }


                await fetchProducts();


                return data;

            } catch (
            error
            ) {

                console.error(
                    "Error deleting product:",
                    error
                );

                throw error;
            }
        };


    // ========================================
    // REMOVE PROMOTION
    // ========================================

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

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body:
                                JSON.stringify({

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
                                }),
                        }
                    );


                const data =
                    await response.json();


                if (
                    !response.ok
                ) {

                    throw new Error(
                        data.message ||
                        "Failed to remove promotion"
                    );
                }


                await fetchProducts();


                return data;

            } catch (
            error
            ) {

                console.error(
                    "Error removing promotion:",
                    error
                );

                throw error;
            }
        };


    // ========================================
    // PROVIDER
    // ========================================

    return (

        <ProductContext.Provider
            value={{

                products,

                loading,

                error,

                fetchProducts,

                addProduct,

                updateProduct,

                deleteProduct,

                removePromotion,

            }}
        >

            {children}

        </ProductContext.Provider>
    );
}


// ========================================
// USE PRODUCTS
// ========================================

export function useProducts() {

    return useContext(
        ProductContext
    );
}