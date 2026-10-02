const multer = require("multer");
const path = require("path");

// ========================================
// STORAGE
// ========================================

const storage =
    multer.diskStorage({
        destination: (
            req,
            file,
            cb
        ) => {
            cb(
                null,
                path.join(
                    __dirname,
                    "../uploads/products"
                )
            );
        },

        filename: (
            req,
            file,
            cb
        ) => {
            const extension =
                path.extname(
                    file.originalname
                ).toLowerCase();

            const uniqueName =
                `${Date.now()}-${Math.round(
                    Math.random() *
                        1000000000
                )}${extension}`;

            cb(
                null,
                uniqueName
            );
        },
    });

// ========================================
// FILE FILTER
// ========================================

const fileFilter = (
    req,
    file,
    cb
) => {
    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
    ];

    if (
        allowedTypes.includes(
            file.mimetype
        )
    ) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only JPG, JPEG, PNG and WEBP images are allowed."
            )
        );
    }
};

// ========================================
// MULTER
// ========================================

const upload = multer({
    storage: storage,

    fileFilter: fileFilter,

    limits: {
        fileSize:
            5 * 1024 * 1024,
    },
});

module.exports = upload;