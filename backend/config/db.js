const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "hena_electronics",
    port: Number(process.env.DB_PORT) || 3306,
});

db.connect((error) => {
    if (error) {
        console.error(
            "MySQL connection failed:",
            error.message
        );
        return;
    }

    console.log(
        "MySQL database connected successfully"
    );
});

module.exports = db;