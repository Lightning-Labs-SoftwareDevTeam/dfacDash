"use strict";

/** Set up and tear down functions shared between all model test files  */

const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");

let orderIDs = []; // possible future setup for testing an array of orders

async function commonBeforeAll() {
    // noinspection SQL without WHERE clause
    await db.query("DELETE FROM customers");
    await db.query("DELETE FROM dfacs");
    await db.query("DELETE FROM cooks");
    await db.query("DELETE FROM items");
    await db.query("DELETE FROM orders");
    await db.query("DELETE FROM order_items");

    await db.query(
        `INSERT INTO customers (username, password, fname, lname, dodid, phnumber, is_admin, karma_score, email, profile_pic) 
            VALUES  ('customer1', 'password1', 'Bart', 'Simpson', 1234567890, '808-080-8080', TRUE, 3, 'bart@mail.com',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSPElOkSxEaD0RzAfl0z7ZvzQ5dRNulf7dhq2oFn62J_WhbFG-rHkfSK7NNuxJbNqu320&usqp=CAU'),
                    ('customer2', 'password2', 'Lisa', 'Simpson', 0987654321, '917-123-4343', FALSE, 19, 'lisa@mail.com',
            'https://media.istockphoto.com/id/867753888/vector/saxophone-flat-icon-music-and-instrument-jazz-sign-vector-graphics-a-coloful-solid-pattern-on.jpg?s=612x612&w=0&k=20&c=pJ8L3piYl3bNpA_RdePKLllXjzCUpJX3V871i7H_mDY=')`
    );
};

async function commonBeforeEach() {
    await db.query("BEGIN");
};

async function commonAfterEach() {
    await db.query("ROLLBACK");
};

async function commonAfterAll() {
    await db.end();
};

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
};