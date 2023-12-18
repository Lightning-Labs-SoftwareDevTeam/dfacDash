"use strict";

/** Routes for new and returning users */

const express = require("express");
const router = new express.Router;

const jsonschema = require("jsonschema");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");
const Customer = require("../models/customer");
const { createToken } = require("../helpers/tokens");
const { BadRequestError } = require("../expressError");

/** POST /auth/register
 * 
 * user must include { username, password, firstName, lastName, dodid, phNumber, role }
 * 
 * returns JWT token which can be used to authenticate further requests
 * Authorization required: none
 */
router.post("/register", async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, userRegisterSchema);

        if(!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const newCustomer = await Customer.register({ ...req.body, isAdmin: true, role:"customer" });
        const token = createToken(newCustomer);

        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;