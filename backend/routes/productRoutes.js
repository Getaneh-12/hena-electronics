const express = require("express");

const {
    getProducts,
    getProductById,
    createProduct,
    uploadProductImages,
    updateProduct,
    deleteProduct,
    deleteProductImage,
} = require("../controllers/productController");

const upload = require("../middleware/upload");

const authenticateAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/",
    getProducts
);

router.post(
    "/",
    authenticateAdmin,
    createProduct
);

router.post(
    "/:id/images",
    authenticateAdmin,
    upload.array(
        "images",
        3
    ),
    uploadProductImages
);

router.delete(
    "/:id/images/:imageId",
    authenticateAdmin,
    deleteProductImage
);

router.get(
    "/:id",
    getProductById
);

router.put(
    "/:id",
    authenticateAdmin,
    updateProduct
);

router.delete(
    "/:id",
    authenticateAdmin,
    deleteProduct
);

module.exports = router;