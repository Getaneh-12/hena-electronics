const express = require("express");

const {
    getProducts,
    getProductById,
    createProduct,
    uploadProductImages,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

const upload = require("../middleware/upload");

const router = express.Router();

// ========================================
// GET ALL PRODUCTS
// ========================================

router.get(
    "/",
    getProducts
);

// ========================================
// CREATE PRODUCT
// ========================================

router.post(
    "/",
    createProduct
);

// ========================================
// UPLOAD PRODUCT IMAGES
// ========================================

router.post(
    "/:id/images",
    upload.array(
        "images",
        3
    ),
    uploadProductImages
);

// ========================================
// GET ONE PRODUCT
// ========================================

router.get(
    "/:id",
    getProductById
);

// ========================================
// UPDATE PRODUCT
// ========================================

router.put(
    "/:id",
    updateProduct
);

// ========================================
// DELETE PRODUCT
// ========================================

router.delete(
    "/:id",
    deleteProduct
);

module.exports = router;