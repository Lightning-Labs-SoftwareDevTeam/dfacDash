"use strict";

/** Routes for customers */

const express = require("express");
const router = express.Router();

const jsonschema = require("jsonschema");
const customerNewSchema = require("../schemas/customerNew.json");
const customerUpdateSchema = require("../schemas/customerUpdate.json");
const Customer = require("../models/customer");

const { ensureLoggedIn, ensureAdmin, authenticateJWT } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const { createToken } = require("../helpers/tokens");

/** CRUD router functions for customers data */

/** POST route for Creating new customers
 * 
 * Adds a new customer to the database, but only for admin users.
 * Registration for normal users happens at a different endpoint.
 * 
 * returns the newly created customer and an auth token.
 * /{ user } --> {user: { username, firstName, lastName, dodid, phNumber, mealCard,
 *          isAdmin, karmaScore, email, profilePicURL, role }, token }
 * Requires login and admin rights
 * */ 
router.post("/", authenticateJWT, ensureLoggedIn, ensureAdmin, async (req, res, next) => {
    try {
        // Explicitly setting the role property
        req.body.role = "customer";

        const validator = jsonschema.validate(req.body, customerNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const customer = await Customer.register(req.body);
        const token = createToken(customer);
        return res.status(201).json({ customer, token });
    } catch (err) {
        return next(err);
    }
});

/** GET route for Reading customer data
 *  
 * returns all customers as the response object locals: users
 * / --> { users: [ {customerID, username, firstName, lastName, dodid, phNumber,
 *                      mealCard, isAdmin, karmaScore, email, profilePicURL, createdAt},
 *          {...}, ...] }
 * Requires login and admin rights
* */
router.get("/", authenticateJWT, ensureLoggedIn, ensureAdmin, async (req, res, next) => {
    try {
        const customers = await Customer.findAll();

        return res.json({ customers });
    } catch (err) {
        return next(err);
    }
});

/** GET route for Reading customer data based on username
 * /[username] --> { customer, orders }
 * 
 * returns { "customer": {customerID, username, firstName, lastName, dodid, phNumber,
 *              mealCard, isAdmin, karmaScore, email, profilePicURL, createdAt, updated, deletedAt}, 
 *             "orders": [{orderID, dfacID, comments, orderDateTime, favorite}, {...}, ...] }
 * Requires admin rights or user making request 
 *                          has username === username passed in
 */
router.get("/:username", authenticateJWT, ensureLoggedIn, async (req, res, next) => {
    try {
        const requestorUsername = res.locals.user.username;
        const targetUsername = req.params.username;

        if (requestorUsername === targetUsername) {
            const customer = await Customer.get(targetUsername);
            return res.json({ customer });
        } else {
            return ensureAdmin(req, res, async () => {
                const customer = await Customer.get(targetUsername);
                return res.json({ customer });
            });
        }
    } catch (err) {
        return next(err);
    }
});

/** PATCH route for Updating a customer's data
 * 
 * data can include { password, firstName, lastName, phNumber,
 *                      mealCard, isAdmin, email, profilePicURL }
 * 
 * returns  { username, firstName, lastName, phNumber, mealCard,
 *             isAdmin, karmaScore, email, profilePicURL, updatedAt }
 * Requires admin rights or user making route request has
 *                              username === username passed in
 */
router.patch("/:username", authenticateJWT, ensureLoggedIn, async (req, res, next) => {
    try {
        const requestorUsername = res.locals.user.username;
        const targetUsername = req.params.username;

        const validator = jsonschema.validate(req.body, customerUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        if (requestorUsername === targetUsername) {
            const customer = await Customer.update(targetUsername, req.body);
            return res.json({ customer });
        } else {
            ensureAdmin(req, res, async () => 
                await Customer.update(targetUsername, req.body)
                .then(customer => res.json({ customer }))
                .catch(next));
            }
    } catch (err) {
        return next(err);
    }
});

/** DELETE route for final CRUD operations
 * 
 *  /[username] --> { deleted: username }
 * If user making request has username === username passed in, ok;
 *  otherwise, user must have admin rights
 */
router.delete("/:username", authenticateJWT, ensureLoggedIn, async (req, res, next) => {
    try {
        const requestorUsername = res.locals.user.username;
        const targetUsername = req.params.username;

        if (requestorUsername === targetUsername) {
            await Customer.remove(targetUsername);
            return res.json({ deleted: targetUsername });
        } else {
            ensureAdmin(req, res, async () => 
                await Customer.remove(targetUsername)
                .then(() => res.json({ deleted: targetUsername }))
                .catch(next));
            }
    } catch (err) {
        return next(err);
    }
});

module.exports = router;

