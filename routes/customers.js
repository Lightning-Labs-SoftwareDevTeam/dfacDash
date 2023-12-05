"use strict";

/** Routes for customers */

const express = require("express");
const router = express.Router();

const jsonschema = require("jsonschema");
const customerNewSchema = require("../schemas/customerNew.json");
const customerUpdateSchema = require("../schemas/customerUpdate.json");
const Customer = require("../models/customer");

const { ensureLoggedIn, ensureAdmin } = require("../middleware/auth");
const { BadRequestError, ForbiddenError } = require("../expressError");
const { createToken } = require("../helpers/tokens");

/** TODO - CRUD router functions for customers data */

// POST route for Creating new customers

// GET route for Reading customer data
/** returns all customers */
router.get("/", async (req, res, next) => {
    try {
        const results = await db.query(
            `SELECT id,
                    username,
                    fname AS "firstName",
                    lname AS "lastName",
                    dodid,
                    phnumber AS "phNumber",
                    is_admin AS "isAdmin",
                    karma_score AS "karmaScore",
                    email,
                    profile_picAS "profilePicURL"
                FROM customers`)

        return res.json(results.rows);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;