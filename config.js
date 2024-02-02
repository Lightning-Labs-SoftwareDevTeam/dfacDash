"use strict";

/** Shared config for application required in many places */

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const PORT = +process.env.PORT || 3001;

// Use different database depending on use case (dev, testing, or prod)
function getDatabaseUri() {
    const URI_DEV = "postgresql://dfacdash_dev:dfacdash@localhost:6622/dfacdash"; //TODO: Enter your port number
    const URI_TEST = "postgresql://dfacdash_test:dfacdash@localhost:6623/dfacdash"; //TODO: Enter your port number

    return (process.env.NODE_ENV === "test")
        ? URI_TEST
        : process.env.DATABASE_URI || URI_DEV;
}

// Speed up bcrypt during tests since dfacdash does not test the safety algorithm
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" 
                            ? 1 : 12;

console.log("dfacDash Config:".bgGreen);                        
console.log("SECRET_KEY Config:".yellow, SECRET_KEY);                        
console.log("PORT:".yellow, PORT.toString());                        
console.log("BCRYPT_WORK_FACTOR:".yellow, BCRYPT_WORK_FACTOR);                        
console.log("---");      

module.exports = {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri,
    NODE_ENV: process.env.NODE_ENV
};