const jwt = require("jsonwebtoken");

const JWT_SECRET = "hena_electronics_secret_key";

const loginAdmin = (req, res) => {
    const {
        username,
        password,
    } = req.body;

    if (
        username !== "admin" ||
        password !== "admin123"
    ) {
        return res.status(401).json({
            success: false,
            message: "Invalid username or password",
        });
    }

    const token = jwt.sign(
        {
            username: "admin",
            role: "admin",
        },
        JWT_SECRET,
        {
            expiresIn: "8h",
        }
    );

    return res.json({
        success: true,
        message: "Login successful",
        token,
    });
};

module.exports = {
    loginAdmin,
};