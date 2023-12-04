/** Database setup for dfacdash */
const { Client } = require("pg");

let DB_URI;
if (process.env.NODE_ENV === "test") {
        DB_URI = "postgresql:///dfacdash_test";
} else {
        DB_URI = "postgresql:///dfacdash";
}

let db = new Client({
        connectionString: DB_URI
});
db.connect();
db.connect(err => {
        if (err) {
                console.error("connection error", err.stack);
        } else {
                console.log("Connected to database!");
        }
});

module.exports = db;