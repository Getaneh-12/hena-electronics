const jwt = require("jsonwebtoken");

const JWT_SECRET =  process.env.JWT_SECRET;

const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authentication required",
        });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Invalid authentication token",
        });
    }

    const token = authHeader.substring(7);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid authentication token",
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            JWT_SECRET
        );

        if (decoded.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin access required",
            });
        }

        req.admin = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired authentication token",
        });
    }
};

module.exports = authenticateAdmin;