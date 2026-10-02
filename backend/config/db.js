const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "hena_electronics",
    port: 3306,
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