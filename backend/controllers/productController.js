const db = require("../config/db");

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
                    error: error.message,
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

            const imageSql = `
                SELECT
                    id,
                    product_id,
                    image_url
                FROM product_images
                ORDER BY id ASC
            `;

            db.query(
                imageSql,
                (
                    imageError,
                    images
                ) => {

                    if (imageError) {

                        console.error(
                            "Get images error:",
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
                                    images
                                        .filter(
                                            (image) =>
                                                Number(
                                                    image.product_id
                                                ) ===
                                                Number(
                                                    product.id
                                                )
                                        )
                                        .map(
                                            (image) =>
                                                image.image_url
                                        );

                                return {
                                    ...product,

                                    images:
                                        productImages,

                                    image:
                                        productImages[0] ||
                                        "",
                                };
                            }
                        );

                    res.json({
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
// GET ONE PRODUCT
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
            results
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
                    error: error.message,
                });
            }

            if (
                results.length === 0
            ) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Product not found",
                });
            }

            const product =
                results[0];

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

                    if (
                        imageError
                    ) {

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

                    const imageUrls =
                        images.map(
                            (image) =>
                                image.image_url
                        );

                    product.images =
                        imageUrls;

                    product.image =
                        imageUrls[0] ||
                        "";

                    res.json({
                        success: true,
                        product:
                            product,
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

    console.log(
        "================================="
    );

    console.log(
        "CREATE PRODUCT REQUEST BODY:"
    );

    console.log(
        req.body
    );

    console.log(
        "================================="
    );

    const {
        productName,
        category,
        price,
        brand,
        model,
        storage,
        ram,
        description,
        availability,
        promotion,
        discount,
    } = req.body;


    // ========================================
    // VALIDATION
    // ========================================

    if (
        !productName ||
        !productName.trim() ||
        !category ||
        price === undefined ||
        price === null ||
        price === ""
    ) {

        console.log(
            "CREATE PRODUCT VALIDATION FAILED"
        );

        console.log({
            productName,
            category,
            price,
        });

        return res.status(400).json({
            success: false,
            message:
                "Product name, category and price are required",
        });
    }


    // ========================================
    // INSERT PRODUCT
    // ========================================

    const sql = `
        INSERT INTO products (
            productName,
            category,
            price,
            brand,
            model,
            storage,
            ram,
            description,
            availability,
            promotion,
            discount
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;


    const values = [
        productName.trim(),

        category,

        Number(price),

        brand || "",

        model || "",

        storage || "",

        ram || "",

        description || "",

        availability ||
            "available",

        promotion ||
            "inactive",

        Number(
            discount || 0
        ),
    ];


    console.log(
        "INSERTING PRODUCT:"
    );

    console.log(
        values
    );


    db.query(
        sql,
        values,
        (
            error,
            result
        ) => {

            if (error) {

                console.error(
                    "Create product database error:",
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


            console.log(
                "Product created successfully."
            );

            console.log(
                "Product ID:",
                result.insertId
            );


            res.status(201).json({
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


    // ========================================
    // CHECK PRODUCT
    // ========================================

    const checkSql = `
        SELECT id
        FROM products
        WHERE id = ?
    `;


    db.query(
        checkSql,
        [id],
        (
            productError,
            products
        ) => {

            if (
                productError
            ) {

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


            // ========================================
            // PREPARE IMAGE VALUES
            // ========================================

            const values =
                req.files.map(
                    (file) => [
                        id,
                        `/uploads/products/${file.filename}`,
                    ]
                );


            const imageSql = `
                INSERT INTO product_images (
                    product_id,
                    image_url
                )
                VALUES ?
            `;


            db.query(
                imageSql,
                [values],
                (
                    imageError,
                    result
                ) => {

                    if (
                        imageError
                    ) {

                        console.error(
                            "Save images error:",
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


                    const imageUrls =
                        req.files.map(
                            (file) =>
                                `/uploads/products/${file.filename}`
                        );


                    res.status(
                        201
                    ).json({

                        success: true,

                        message:
                            "Product images uploaded successfully",

                        imageCount:
                            result.affectedRows,

                        images:
                            imageUrls,
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
        brand,
        model,
        storage,
        ram,
        description,
        availability,
        promotion,
        discount,
    } = req.body;


    // ========================================
    // VALIDATION
    // ========================================

    if (
        !productName ||
        !productName.trim() ||
        !category ||
        price === undefined ||
        price === null ||
        price === ""
    ) {

        return res.status(400).json({
            success: false,
            message:
                "Product name, category and price are required",
        });
    }


    const sql = `
        UPDATE products
        SET
            productName = ?,
            category = ?,
            price = ?,
            brand = ?,
            model = ?,
            storage = ?,
            ram = ?,
            description = ?,
            availability = ?,
            promotion = ?,
            discount = ?
        WHERE id = ?
    `;


    const values = [

        productName.trim(),

        category,

        Number(price),

        brand || "",

        model || "",

        storage || "",

        ram || "",

        description || "",

        availability ||
            "available",

        promotion ||
            "inactive",

        Number(
            discount || 0
        ),

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


            res.json({
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


    const sql = `
        DELETE FROM products
        WHERE id = ?
    `;


    db.query(
        sql,
        [id],
        (
            error,
            result
        ) => {

            if (error) {

                console.error(
                    "Delete product error:",
                    error
                );

                return res.status(500).json({
                    success: false,
                    message:
                        "Failed to delete product",
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


            res.json({
                success: true,
                message:
                    "Product deleted successfully",
            });
        }
    );
};


// ========================================
// EXPORT
// ========================================

module.exports = {

    getProducts,

    getProductById,

    createProduct,

    uploadProductImages,

    updateProduct,

    deleteProduct,

};