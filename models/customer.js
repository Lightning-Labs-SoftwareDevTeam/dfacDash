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
     * returns { username, firstName, lastName, phNumber, mealCard, isAdmin, karmaScore, email, profilePicURL,
     *     createdAt, updatedAt }
     * throws UnauthorizedError if customer not found or wrong password
     */
    static async authenticate(username, password) {
        //look for user first
        const result = await db.query(
            `SELECT username,
                    password,
                    fname AS "firstName",
                    lname AS "lastName",
                    phone_number AS "phNumber",
                    meal_card AS "mealCard",
                    is_admin AS "isAdmin",
                    karma_score AS "karmaScore",
                    email,
                    profile_pic AS "profilePicURL",
                    created_at AS "createdAt",
                    updated_at AS "updatedAt"
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
     * returns { username, firstName, lastName, dodid, phNumber, mealCard, karmaScore, email, profilePicURL }
     * throws BadRequestError on duplicates
     */
    static async register(
        { username, password, firstName, lastName, dodid, phNumber, mealCard, isAdmin, email, profilePicURL }
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
                                phone_number,
                                meal_card,
                                is_admin,
                                email,
                                profile_pic)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING username, fname AS "firstName", lname AS "lastName", dodid,
                phone_number AS "phNumber", meal_card AS "mealCard", is_admin AS "isAdmin",
                karma_score AS "karmaScore", email, profile_pic AS "profilePicURL"`,
            [
                username,
                hashedPassword,
                firstName,
                lastName,
                dodid,
                phNumber,
                mealCard,
                isAdmin,
                email,
                profilePicURL
            ]
        );
               
        const customer = result.rows[0]
        customer.role = "customer"; 

        return customer;
    }

    /** Find all customers - Read
     * 
     * returns [{ customerID, username, firstName, lastName, dodid,
     *              phNumber, mealCard, isAdmin, karmaScore, email, profilePicURL, createdAt, updatedAt, deletedAt },
     *          { customerID, username, ... }, { ... }, ...]
     */
    static async findAll() {
        const result = await db.query(
            `SELECT id AS "customerID",
                    username,
                    password,
                    fname AS "firstName",
                    lname AS "lastName",
                    dodid,
                    phone_number AS "phNumber",
                    meal_card AS "mealCard",
                    is_admin AS "isAdmin",
                    karma_score AS "karmaScore",
                    email,
                    profile_pic AS "profilePicURL",
                    created_at AS "createdAt",
                    updated_at AS "updatedAt",
                    deleted_at AS "deletedAt"
                FROM customers
                ORDER BY username`
        );

        return result.rows;
    }

    /** Given a customer username, return data about that customer - Read
     * 
     * returns { customer: { customerID, username, firstName,lastName, dodid, phNumber,
     *              mealCard, isAdmin, karmaScore, email, profilePicURL, createdAt, updatedAt, deletedAt},
     *         order:[{orderID, dfacID, comments, orderDateTime, readyTime, pickedUpTime, canceled,  favorite},
     *                  {orderID, ...}, {...}, ...] }
     * 
     * A separate query selects the customer's orders data and the spread operator
     *     `...` combines the customer object with a property containing an orders array.
     * 
     * throws NotFoundError if customer not found
     */
    static async get(username) {
        const customerRes = await db.query(
            `SELECT id AS "customerID",
                    username,
                    fname AS "firstName",
                    lname AS "lastName",
                    dodid,
                    phone_number AS "phNumber",
                    meal_card AS "mealCard",
                    is_admin AS "isAdmin",
                    karma_score AS "karmaScore",
                    email,
                    profile_pic AS "profilePicURL"
                FROM customers 
                WHERE username = $1`,
            [username]
        );

        const ordersRes = await db.query(
            `SELECT id AS "orderID",
                    dfac_id AS "dfacID",
                    comments,
                    order_timestamp AS "orderDateTime",
                    ready_for_pickup AS "readyTime",
                    picked_up AS "pickedUpTime",
                    canceled,
                    favorite
                FROM orders
                WHERE customer_id = (SELECT id FROM customers WHERE username = $1)`,
            [username]
        );

        const customer = customerRes.rows[0];
        if (!customer) throw new NotFoundError(`No user: ${username}`);

        const orders = ordersRes.rows;

        const customerWithOrders = {
            ...customer,
            orders: orders
        };

        return customerWithOrders;
    }

    /** Patch customer data with `data` - Update
     * 
     * Partial update is perfectly acceptable; fields only changed if patch request
     * includes corresponding data.
     * 
     * Allowable data:
     *      { password, firstName, lastName, phNumber, mealCard, isAdmin, email, profilePicURL }
     * 
     * returns { username, firstName, lastName, phNumber, mealCard, isAdmin,
     *     karmaScore, email, profilePicURL, updatedAt }
     * 
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
                phNumber: "phone_number",
                mealCard: "meal_card",
                isAdmin: "is_admin",
                email: "email",
                profilePicURL: "profile_pic"
            }
        );
        const usernameVarIdx = "$" + (values.length + 1);

        // Automatically adding current timestamp into updated_at field
        const querySql = `UPDATE customers
                            SET ${setCols}, updated_at = CURRENT_TIMESTAMP
                            WHERE username = ${usernameVarIdx}
                            RETURNING username,
                                        fname AS "firstName",
                                        lname AS "lastName",
                                        phone_number AS "phNumber",
                                        meal_card AS "mealCard",
                                        is_admin AS "isAdmin",
                                        karma_score AS "karmaScore",
                                        email,
                                        profile_pic AS "profilePicURL",
                                        updated_at AS "updatedAt"`;
        const result = await db.query(querySql, [...values, username]);

        const customer = result.rows[0];
        if (!customer) throw new NotFoundError(`No user: ${username}`);

        delete customer.password;

        return customer;
    }

    /** "Soft" delete
     * 
     * marks a customer as deleted by setting the deleted_at field without
     *    actually deleting the customer row
     * 
     * returns username of "deleted" customer; throws NotFoundError if no username found
     */
    static async remove(username) {
        let result = await db.query(
            `UPDATE customers
                SET deleted_at = CURRENT_TIMESTAMP
                WHERE username = $1
                RETURNING username`,
            [username]
        );

        const customer = result.rows[0];
        if (!customer) throw new NotFoundError(`No user: ${username}`);

        return customer;
    }
}
function isInOrderWindow() {
    // Define the allowed time frames for ordering
    const allowedTimeFrames = [
        { startHour: 6, startMinute: 30, endHour: 8, endMinute: 30 },
        { startHour: 10, startMinute: 0, endHour: 11, endMinute: 0 },
        { startHour: 15, startMinute: 30, endHour: 16, endMinute: 30 }
    ];

    // Get current date and time
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    // Check if the current time is within any of the allowed time frames
    const isWithinAllowedTimeFrame = allowedTimeFrames.some(({ startHour, startMinute, endHour, endMinute }) => {
        const startTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), startHour, startMinute);
        const endTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), endHour, endMinute);

        return currentDate >= startTime && currentDate <= endTime;
    });

    return isWithinAllowedTimeFrame;
}

// Example usage when a user clicks the "order now" button
const canOrder = isInOrderWindow();

if (canOrder) {
    // Redirect to the order page or perform the order-related action
    console.log("You can access the order page!");
} else {
    // Show a flash message indicating that ordering is not allowed at the current time
    console.log("Ordering is not allowed at the current time.");
}
module.exports = Customer;
