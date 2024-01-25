"use strict";

/** Set up and tear down functions shared between all model test files  */
const bcrypt = require("bcrypt");

const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { createToken } = require("../helpers/tokens");

let orderIDs = []; // possible future setup for testing an array of orders

async function commonBeforeAll() {
    // noinspection SQL without WHERE clause
    await db.query("DELETE FROM customers");
    await db.query("DELETE FROM dfacs");
    await db.query("DELETE FROM cooks");
    await db.query("DELETE FROM items");
    await db.query("DELETE FROM orders");


    const c1Hash = await bcrypt.hash('password1', BCRYPT_WORK_FACTOR);
    console.log(c1Hash);
    const c2Hash = await bcrypt.hash('password2', BCRYPT_WORK_FACTOR);

    await db.query(
        `INSERT INTO customers (username, password, fname, lname, dodid, phnumber, is_admin, karma_score, email, profile_pic) 
            VALUES  ('customer1', $1, 'Bart', 'Simpson', '1234567890', '808-080-8080', FALSE, 3, 'bart@mail.com',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSPElOkSxEaD0RzAfl0z7ZvzQ5dRNulf7dhq2oFn62J_WhbFG-rHkfSK7NNuxJbNqu320&usqp=CAU'),
                    ('customer2', $2, 'Lisa', 'Simpson', '0987654321', '917-123-4343', TRUE, 19, 'lisa@mail.com',
            'https://media.istockphoto.com/id/867753888/vector/saxophone-flat-icon-music-and-instrument-jazz-sign-vector-graphics-a-coloful-solid-pattern-on.jpg?s=612x612&w=0&k=20&c=pJ8L3piYl3bNpA_RdePKLllXjzCUpJX3V871i7H_mDY=')`,
        [c1Hash, c2Hash]
    );

    await db.query(
        `INSERT INTO dfacs (id, dfacname, dfac_logo, dfacaddress, dfacphnumber, rating, hours)
            VALUES ('dfac1', 'https://media.defense.gov/2016/Oct/04/2001643776/-1/-1/0/161004-F-XX000-003.JPG',
            '123 Food Court')`
    )
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

/** Alternative way of exporting: prefix the definition! 
 * export let name1, name2/*, … */; // also var
// export const name1 = 1, name2 = 2/*, … */; // also var, let
// export function functionName() { /* … */ }
// export class ClassName { /* … */ }
// export function* generatorFunctionName() { /* … */ }
// export const { name1, name2: bar } = o;
// export const [ name1, name2 ] = array; */