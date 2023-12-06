"use strict";

/** Database setup for dfacdash */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
        db = new Client({
                connectionString: getDatabaseUri(),
                ssl: {
                        rejectUnauthorized: false // worth revisiting for improved security
                }
        });
} else {
        db = new Client({
                connectionString: getDatabaseUri()
        });
};

db.connect(err => {
        if (err) {
                console.error("connection error", err.stack);
        } else {
                console.log("Connected to database!");
        }
});

module.exports = db;