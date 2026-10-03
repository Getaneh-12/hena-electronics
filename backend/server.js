const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Hena Electronics Backend is running",
    });
});

app.get("/api/test-db", (req, res) => {
    db.query(
        "SELECT 1 AS result",
        (error, results) => {
            if (error) {
                console.error(
                    "Database test error:",
                    error
                );

                return res.status(500).json({
                    success: false,
                    message: "Database connection failed",
                });
            }

            res.json({
                success: true,
                message: "Database connection is working",
                data: results,
            });
        }
    );
});

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/products",
    productRoutes
);

app.use(
    (error, req, res, next) => {
        console.error(
            "Server error:",
            error
        );

        if (
            error.code ===
            "LIMIT_FILE_SIZE"
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Image is too large. Maximum size is 5MB.",
            });
        }

        if (
            error.message &&
            error.message.includes("Only JPG")
        ) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message:
                error.message ||
                "Something went wrong on the server",
        });
    }
);

app.listen(
    PORT,
    () => {
        console.log(
            `Hena Electronics backend running on http://localhost:${PORT}`
        );
    }
);