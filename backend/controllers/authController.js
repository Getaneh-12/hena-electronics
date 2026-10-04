const jwt = require("jsonwebtoken");

// ========================================
// ENVIRONMENT VARIABLES
// ========================================

const ADMIN_USERNAME =
    process.env.ADMIN_USERNAME;

const ADMIN_PASSWORD =
    process.env.ADMIN_PASSWORD;

const JWT_SECRET =
    process.env.JWT_SECRET;

// ========================================
// ADMIN LOGIN
// ========================================

const loginAdmin = (
    req,
    res
) => {
    const {
        username,
        password,
    } = req.body;

    if (
        !ADMIN_USERNAME ||
        !ADMIN_PASSWORD ||
        !JWT_SECRET
    ) {
        console.error(
            "Admin authentication environment variables are missing."
        );

        return res.status(500).json({
            success: false,
            message:
                "Server authentication configuration is missing",
        });
    }

    if (
        username !==
            ADMIN_USERNAME ||
        password !==
            ADMIN_PASSWORD
    ) {
        return res.status(401).json({
            success: false,
            message:
                "Invalid username or password",
        });
    }

    const token =
        jwt.sign(
            {
                username:
                    ADMIN_USERNAME,

                role: "admin",
            },

            JWT_SECRET,

            {
                expiresIn:
                    "8h",
            }
        );

    return res.json({
        success: true,

        message:
            "Login successful",

        token,
    });
};

// ========================================
// EXPORT
// ========================================

module.exports = {
    loginAdmin,
};