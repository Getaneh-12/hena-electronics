const db = require("../config/db");
const fs = require("fs");
const path = require("path");

const getProducts = (req, res) => {
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

            if (products.length === 0) {
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

                        return res.status(500).json({
                            success: false,
                            message:
                                "Failed to fetch product images",
                            error:
                                imageError.message,
                        });
                    }

                    const productsWithImages =
                        products.map(
                            (product) => {
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
                products.length ===
                0
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

                        return res.status(500).json({
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

const uploadProductImages = (
    req,
    res
) => {
    const { id } =
        req.params;

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
        (
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
                products.length ===
                0
            ) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Product not found",
                });
            }

            const imageValues =
                req.files.map(
                    (file) => [
                        id,
                        `/uploads/products/${file.filename}`,
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
                (imageError) => {
                    if (imageError) {
                        console.error(
                            "Upload product images error:",
                            imageError
                        );

                        return res.status(500).json({
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
                    });
                }
            );
        }
    );
};

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
                results.length ===
                0
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
                (
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

                        return res.status(500).json({
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
                        return res.status(404).json({
                            success: false,
                            message:
                                "Product image not found",
                        });
                    }

                    const relativePath =
                        image.image_url.replace(
                            /^\/+/,
                            ""
                        );

                    const filePath =
                        path.join(
                            __dirname,
                            "..",
                            relativePath
                        );

                    fs.unlink(
                        filePath,
                        (
                            fileError
                        ) => {
                            if (
                                fileError &&
                                fileError.code !==
                                    "ENOENT"
                            ) {
                                console.error(
                                    "Delete image file error:",
                                    fileError
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
        }
    );
};

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
                (
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

                        return res.status(500).json({
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
                        return res.status(404).json({
                            success: false,
                            message:
                                "Product not found",
                        });
                    }

                    images.forEach(
                        (image) => {
                            const relativePath =
                                image.image_url.replace(
                                    /^\/+/,
                                    ""
                                );

                            const filePath =
                                path.join(
                                    __dirname,
                                    "..",
                                    relativePath
                                );

                            fs.unlink(
                                filePath,
                                () => {}
                            );
                        }
                    );

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

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    uploadProductImages,
    deleteProductImage,
    updateProduct,
    deleteProduct,
};