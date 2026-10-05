const db = require("../config/db");

const cloudinary =
    require("../config/cloudinary");

// ========================================
// GET ALL PRODUCTS
// ========================================

const getProducts = (
    req,
    res
) => {
    const productSql = `
        SELECT *
        FROM products
        ORDER BY created_at DESC
    `;

    db.query(
        productSql,
        (error, products) => {
            if (error) {
                console.error(
                    "Get products error:",
                    error
                );

                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to fetch products",
                    error:
                        error.message,
                });
            }

            if (
                products.length === 0
            ) {
                return res.json({
                    success: true,
                    products: [],
                });
            }

            const productIds =
                products.map(
                    (product) =>
                        product.id
                );

            const imageSql = `
                SELECT
                    id,
                    product_id,
                    image_url
                FROM product_images
                WHERE product_id IN (?)
                ORDER BY id ASC
            `;

            db.query(
                imageSql,
                [productIds],
                (
                    imageError,
                    images
                ) => {
                    if (imageError) {
                        console.error(
                            "Get product images error:",
                            imageError
                        );

                        return res.status(
                            500
                        ).json({
                            success: false,
                            message:
                                "Failed to fetch product images",
                            error:
                                imageError.message,
                        });
                    }

                    const productsWithImages =
                        products.map(
                            (
                                product
                            ) => {
                                const productImages =
                                    images.filter(
                                        (
                                            image
                                        ) =>
                                            Number(
                                                image.product_id
                                            ) ===
                                            Number(
                                                product.id
                                            )
                                    );

                                return {
                                    ...product,

                                    images:
                                        productImages.map(
                                            (
                                                image
                                            ) =>
                                                image.image_url
                                        ),

                                    imageDetails:
                                        productImages.map(
                                            (
                                                image
                                            ) => ({
                                                id:
                                                    Number(
                                                        image.id
                                                    ),

                                                product_id:
                                                    Number(
                                                        image.product_id
                                                    ),

                                                image_url:
                                                    image.image_url,
                                            })
                                        ),

                                    image:
                                        productImages.length >
                                        0
                                            ? productImages[0]
                                                  .image_url
                                            : null,
                                };
                            }
                        );

                    return res.json({
                        success: true,
                        products:
                            productsWithImages,
                    });
                }
            );
        }
    );
};

// ========================================
// GET PRODUCT BY ID
// ========================================

const getProductById = (
    req,
    res
) => {
    const { id } =
        req.params;

    const productSql = `
        SELECT *
        FROM products
        WHERE id = ?
    `;

    db.query(
        productSql,
        [id],
        (
            error,
            products
        ) => {
            if (error) {
                console.error(
                    "Get product error:",
                    error
                );

                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to fetch product",
                    error:
                        error.message,
                });
            }

            if (
                products.length === 0
            ) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Product not found",
                });
            }

            const product =
                products[0];

            const imageSql = `
                SELECT
                    id,
                    product_id,
                    image_url
                FROM product_images
                WHERE product_id = ?
                ORDER BY id ASC
            `;

            db.query(
                imageSql,
                [id],
                (
                    imageError,
                    images
                ) => {
                    if (imageError) {
                        console.error(
                            "Get product images error:",
                            imageError
                        );

                        return res.status(
                            500
                        ).json({
                            success: false,
                            message:
                                "Failed to fetch product images",
                            error:
                                imageError.message,
                        });
                    }

                    return res.json({
                        success: true,

                        product: {
                            ...product,

                            images:
                                images.map(
                                    (
                                        image
                                    ) =>
                                        image.image_url
                                ),

                            imageDetails:
                                images.map(
                                    (
                                        image
                                    ) => ({
                                        id:
                                            Number(
                                                image.id
                                            ),

                                        product_id:
                                            Number(
                                                image.product_id
                                            ),

                                        image_url:
                                            image.image_url,
                                    })
                                ),

                            image:
                                images.length >
                                0
                                    ? images[0]
                                          .image_url
                                    : null,
                        },
                    });
                }
            );
        }
    );
};

// ========================================
// CREATE PRODUCT
// ========================================

const createProduct = (
    req,
    res
) => {
    const {
        productName,
        category,
        price,
        availability,
        description,
        brand,
        model,
        storage,
        ram,
        discount,
        promotion,
    } = req.body;

    if (
        !productName ||
        !category ||
        price === undefined
    ) {
        return res.status(400).json({
            success: false,
            message:
                "Product name, category and price are required",
        });
    }

    const sql = `
        INSERT INTO products
        (
            productName,
            category,
            price,
            availability,
            description,
            brand,
            model,
            storage,
            ram,
            discount,
            promotion
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        productName,
        category,
        price,
        availability ||
            "Available",
        description || "",
        brand || "",
        model || "",
        storage || "",
        ram || "",
        discount || 0,
        promotion ||
            "inactive",
    ];

    db.query(
        sql,
        values,
        (
            error,
            result
        ) => {
            if (error) {
                console.error(
                    "Create product error:",
                    error
                );

                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to create product",
                    error:
                        error.message,
                });
            }

            return res.status(201).json({
                success: true,
                message:
                    "Product created successfully",
                productId:
                    result.insertId,
            });
        }
    );
};

// ========================================
// UPLOAD PRODUCT IMAGES
// ========================================

const uploadProductImages = (
    req,
    res
) => {
    const { id } = req.params;

    if (
        !req.files ||
        req.files.length === 0
    ) {
        return res.status(400).json({
            success: false,
            message:
                "No images were uploaded",
        });
    }

    const checkProductSql = `
        SELECT id
        FROM products
        WHERE id = ?
    `;

    db.query(
        checkProductSql,
        [id],
        async (
            productError,
            products
        ) => {
            if (productError) {
                console.error(
                    "Check product error:",
                    productError
                );

                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to verify product",
                    error:
                        productError.message,
                });
            }

            if (
                products.length === 0
            ) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Product not found",
                });
            }

            try {
                const uploadImage = (
                    file
                ) => {
                    return new Promise(
                        (
                            resolve,
                            reject
                        ) => {
                            const uploadStream =
                                cloudinary.uploader.upload_stream(
                                    {
                                        folder:
                                            "hena-products",

                                        resource_type:
                                            "image",
                                    },
                                    (
                                        error,
                                        result
                                    ) => {
                                        if (error) {
                                            reject(
                                                error
                                            );
                                        } else {
                                            resolve(
                                                {
                                                    url:
                                                        result.secure_url,

                                                    publicId:
                                                        result.public_id,
                                                }
                                            );
                                        }
                                    }
                                );

                            uploadStream.end(
                                file.buffer
                            );
                        }
                    );
                };

                const uploadedImages =
                    await Promise.all(
                        req.files.map(
                            (file) =>
                                uploadImage(
                                    file
                                )
                        )
                    );

                const imageValues =
                    uploadedImages.map(
                        (image) => [
                            id,
                            image.url,
                        ]
                    );

                const imageSql = `
                    INSERT INTO product_images
                    (
                        product_id,
                        image_url
                    )
                    VALUES ?
                `;

                db.query(
                    imageSql,
                    [imageValues],
                    (
                        imageError
                    ) => {
                        if (imageError) {
                            console.error(
                                "Save Cloudinary image URLs error:",
                                imageError
                            );

                            return res.status(
                                500
                            ).json({
                                success: false,
                                message:
                                    "Failed to save product images",
                                error:
                                    imageError.message,
                            });
                        }

                        return res.json({
                            success: true,

                            message:
                                "Product images uploaded successfully",

                            images:
                                uploadedImages.map(
                                    (
                                        image
                                    ) =>
                                        image.url
                                ),
                        });
                    }
                );
            } catch (
                uploadError
            ) {
                console.error(
                    "Cloudinary upload error:",
                    uploadError
                );

                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to upload images to Cloudinary",
                    error:
                        uploadError.message,
                });
            }
        }
    );
};

// ========================================
// DELETE PRODUCT IMAGE
// ========================================

const deleteProductImage = (
    req,
    res
) => {
    const {
        id,
        imageId,
    } = req.params;

    const findImageSql = `
        SELECT
            id,
            product_id,
            image_url
        FROM product_images
        WHERE id = ?
        AND product_id = ?
    `;

    db.query(
        findImageSql,
        [
            imageId,
            id,
        ],
        (
            error,
            results
        ) => {
            if (error) {
                console.error(
                    "Find product image error:",
                    error
                );

                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to find product image",
                    error:
                        error.message,
                });
            }

            if (
                results.length === 0
            ) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Product image not found",
                });
            }

            const image =
                results[0];

            const deleteSql = `
                DELETE FROM product_images
                WHERE id = ?
                AND product_id = ?
            `;

            db.query(
                deleteSql,
                [
                    imageId,
                    id,
                ],
                async (
                    deleteError,
                    deleteResult
                ) => {
                    if (
                        deleteError
                    ) {
                        console.error(
                            "Delete product image error:",
                            deleteError
                        );

                        return res.status(
                            500
                        ).json({
                            success: false,
                            message:
                                "Failed to delete product image",
                            error:
                                deleteError.message,
                        });
                    }

                    if (
                        deleteResult.affectedRows ===
                        0
                    ) {
                        return res.status(
                            404
                        ).json({
                            success: false,
                            message:
                                "Product image not found",
                        });
                    }

                    try {
                        const imageUrl =
                            image.image_url;

                        if (
                            imageUrl &&
                            imageUrl.includes(
                                "res.cloudinary.com"
                            )
                        ) {
                            const parts =
                                imageUrl.split(
                                    "/upload/"
                                );

                            if (
                                parts.length ===
                                2
                            ) {
                                let publicId =
                                    parts[1];

                                publicId =
                                    publicId.replace(
                                        /^v\d+\//,
                                        ""
                                    );

                                publicId =
                                    publicId.replace(
                                        /\.[^/.]+$/,
                                        ""
                                    );

                                await cloudinary.uploader.destroy(
                                    publicId,
                                    {
                                        resource_type:
                                            "image",
                                    }
                                );
                            }
                        }
                    } catch (
                        cloudinaryError
                    ) {
                        console.error(
                            "Delete Cloudinary image error:",
                            cloudinaryError
                        );
                    }

                    return res.json({
                        success: true,

                        message:
                            "Product image deleted successfully",

                        deletedImageId:
                            Number(
                                imageId
                            ),
                    });
                }
            );
        }
    );
};

// ========================================
// UPDATE PRODUCT
// ========================================

const updateProduct = (
    req,
    res
) => {
    const { id } =
        req.params;

    const {
        productName,
        category,
        price,
        availability,
        description,
        brand,
        model,
        storage,
        ram,
        discount,
        promotion,
    } = req.body;

    const sql = `
        UPDATE products
        SET
            productName = ?,
            category = ?,
            price = ?,
            availability = ?,
            description = ?,
            brand = ?,
            model = ?,
            storage = ?,
            ram = ?,
            discount = ?,
            promotion = ?
        WHERE id = ?
    `;

    const values = [
        productName,
        category,
        price,
        availability,
        description,
        brand,
        model,
        storage,
        ram,
        discount || 0,
        promotion ||
            "inactive",
        id,
    ];

    db.query(
        sql,
        values,
        (
            error,
            result
        ) => {
            if (error) {
                console.error(
                    "Update product error:",
                    error
                );

                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to update product",
                    error:
                        error.message,
                });
            }

            if (
                result.affectedRows ===
                0
            ) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Product not found",
                });
            }

            return res.json({
                success: true,
                message:
                    "Product updated successfully",
            });
        }
    );
};

// ========================================
// DELETE PRODUCT
// ========================================

const deleteProduct = (
    req,
    res
) => {
    const { id } =
        req.params;

    const imageSql = `
        SELECT image_url
        FROM product_images
        WHERE product_id = ?
    `;

    db.query(
        imageSql,
        [id],
        (
            imageError,
            images
        ) => {
            if (imageError) {
                console.error(
                    "Get product images before delete error:",
                    imageError
                );

                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to prepare product deletion",
                    error:
                        imageError.message,
                });
            }

            const deleteSql = `
                DELETE FROM products
                WHERE id = ?
            `;

            db.query(
                deleteSql,
                [id],
                async (
                    deleteError,
                    result
                ) => {
                    if (
                        deleteError
                    ) {
                        console.error(
                            "Delete product error:",
                            deleteError
                        );

                        return res.status(
                            500
                        ).json({
                            success: false,
                            message:
                                "Failed to delete product",
                            error:
                                deleteError.message,
                        });
                    }

                    if (
                        result.affectedRows ===
                        0
                    ) {
                        return res.status(
                            404
                        ).json({
                            success: false,
                            message:
                                "Product not found",
                        });
                    }

                    for (
                        const image of images
                    ) {
                        try {
                            const imageUrl =
                                image.image_url;

                            if (
                                imageUrl &&
                                imageUrl.includes(
                                    "res.cloudinary.com"
                                )
                            ) {
                                const parts =
                                    imageUrl.split(
                                        "/upload/"
                                    );

                                if (
                                    parts.length ===
                                    2
                                ) {
                                    let publicId =
                                        parts[1];

                                    publicId =
                                        publicId.replace(
                                            /^v\d+\//,
                                            ""
                                        );

                                    publicId =
                                        publicId.replace(
                                            /\.[^/.]+$/,
                                            ""
                                        );

                                    await cloudinary.uploader.destroy(
                                        publicId,
                                        {
                                            resource_type:
                                                "image",
                                        }
                                    );
                                }
                            }
                        } catch (
                            cloudinaryError
                        ) {
                            console.error(
                                "Delete Cloudinary image error:",
                                cloudinaryError
                            );
                        }
                    }

                    return res.json({
                        success: true,
                        message:
                            "Product deleted successfully",
                    });
                }
            );
        }
    );
};

// ========================================
// EXPORT CONTROLLERS
// ========================================

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    uploadProductImages,
    deleteProductImage,
    updateProduct,
    deleteProduct,
};