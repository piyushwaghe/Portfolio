const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "piyush",
    database: "portfolio_db"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log("MySQL Connection Failed:", err.message);
    } else {
        console.log("MySQL Connected Successfully!");
    }
});

// Home Route
app.get("/", (req, res) => {
    res.send("Portfolio Backend is Running 🚀");
});

// Projects Route
app.get("/projects", (req, res) => {
    db.query("SELECT * FROM projects", (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(results);
    });
});

// Start Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});