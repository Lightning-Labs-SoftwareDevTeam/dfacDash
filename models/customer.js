"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError
} = require("../expressError");

const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

/** Customer class consolidates related CRUD functions for users ordering food */

class Customer {
    /** authenticate customer with username and password
     * 
     * returns { username, first_name, last_name, phNumber, isAdmin, karmaScore, email, profilePicURL }
     * throws UnauthorizedError if customer not found or wrong password
     */
    static async authenticate(username, password) {
        //look for user first
        const result = await db.query(
            `SELECT username,
                    password,
                    fname AS "firstName",
                    lname AS "lastName,
                    dodid,
                    phnumber AS "phNumber",
                    is_admin AS "isAdmin",
                    karma_score AS "karmaScore",
                    email,
                    profile_pic AS "profilePicURL"
                FROM customers
                WHERE username = $1`,
            [username]
        );
        const customer = result.rows[0];

        //second, verify customer by comparing hashed password with a new hash from password
        const isValid = await bcrypt.compare(password, customer.password);
        if (isValid === true) {
            delete customer.password;
            return customer;
        }
        //if bad password, throw Unauthorized error
        throw new UnauthorizedError("Invalid username/password");
    }

    /** Register new customer with data - Create
     * 
     * returns { username, firstName, lastName, phNumber, isAdmin }
     * throws BadRequestError on duplicates
     */
    static async register(
        { username, password, firstName, lastName, dodid, phNumber, isAdmin, email, profilePicURL }
    ) {
        const duplicateCheck = await db.query(
            `SELECT username from customers
                WHERE username = $1`,
            [username]
        );
        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO customers
                            (username,
                                password,
                                fname,
                                lname,
                                dodid,
                                phnumber,
                                is_admin,
                                email,
                                profile_pic)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING username, fname AS "firstName", lname AS "lastName",
                phnumber AS "phNumber", is_admin AS "isAdmin", karma_score AS "karmaScore",
                email, profile_pic AS "profilePicURL"`,
            [
                username,
                hashedPassword,
                firstName,
                lastName,
                dodid,
                phNumber,
                isAdmin,
                email,
                profilePicURL
            ]
        );

        const customer = result.rows[0];
        return customer;
    }

    /** Find all customers - Read
     * 
     * returns [{ username, firstName, lastName,
     *              phNumber, isAdmin, karmaScore, email, profilePicURL }, { username, ... }, ...]
     */
    static async findAll() {
        const result = await db.query(
            `SELECT username,
                    password,
                    fname AS "firstName",
                    lname AS "lastName,
                    dodid,
                    phnumber AS "phNumber",
                    is_admin AS "isAdmin",
                    karma_score AS "karmaScore",
                    email,
                    profile_pic AS "profilePicURL"
                FROM customers
                ORDER BY username`
        );

        return result.rows;
    }

    /** Given a customer username, return data about that customer - Read
     * 
     * returns { username, firstName,lastName, dodid, 
     *              phNumber, isAdmin, karmaScore, email, profilePicURL }
     * TODO - connect with orders table and show all previous order data
     * throws NotFoundError if customer not found
     */
    static async get(username) {
        const customerRes = await db.query(
            `SELECT username,
                    password,
                    fname AS "firstName",
                    lname AS "lastName,
                    dodid,
                    phnumber AS "phNumber",
                    is_admin AS "isAdmin",
                    karma_score AS "karmaScore",
                    email,
                    profile_pic AS "profilePicURL"
                FROM customers
                WHERE username = $1`,
            [username]
        );
        const customer = customerRes.rows[0];

        if (!customer) throw new NotFoundError(`No user: ${username}`);
        return customer;
    }

    /** Patch customer data with `data` - Update
     * 
     * Partial update is perfectly acceptable; fields only changed if patch request
     * includes corresponding data.
     * 
     * Allowable data:
     *      { password, firstName, lastName, phNumber, isAdmin, email, profilePicURL }
     * Requires extra validation because of the ability to change password and make a user an admin.
     * 
     * returns { username, firstName, lastName, phNumber, isAdmin, karmaScore,
     *              email, profilePicURL }
     * throws NotFoundError if no customer with given username found
     */
    static async update(username, data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }

        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                firstName: "fname",
                lastName: "lname",
                phNumber: "phnumber",
                isAdmin: "is_admin",
                profilePicURL: "profile_pic"
            }
        );
        const usernameVarIdx = "$" + (values.length + 1);

        const querySql = `Update customers
                            SET ${setCols}
                            WHERE username = ${usernameVarIdx}
                            RETURNING username,
                                        fname AS "firstName",
                                        lname AS "lastName",
                                        phnumber AS "phNumber",
                                        is_admin AS "isAdmin",
                                        karma_score AS "karmaScore",
                                        email,
                                        profile_pic AS "profilePicURL"`;
        const result = await db.query(querySql, [...values, username]);

        const customer = result.rows[0];
        if (!customer) throw new NotFoundError(`No user: ${username}`);

        delete customer.password;

        return customer;
    }

    /** Delete
     * 
     * permanently removes a customer from database
     * returns undefined; throws NotFoundError if no username found
     */
    static async remove(username) {
        let result = await db.query(
            `DELETE FROM customers
                WHERE username = $1
                RETURNING username`,
            [username]
        );

        const customer = result.rows[0];
        if (!customer) throw new NotFoundError(`No user: ${username}`);
    }
}

module.exports = Customer;