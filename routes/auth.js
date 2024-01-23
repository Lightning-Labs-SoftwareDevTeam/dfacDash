"use strict";

/** Routes for new and returning users */

const express = require("express");
const router = new express.Router;

const jsonschema = require("jsonschema");
const userRegisterSchema = require("../schemas/userRegister.json");
const customerRegisterSchema = require("../schemas/customerRegister.json");
const Customer = require("../models/customer");
const Cook = require("../models/cook");
const { createToken } = require("../helpers/tokens");
const { BadRequestError } = require("../expressError");

/** POST /auth/register
 * 
 * user must include { username, password, firstName, lastName, dodid, role }
 * 
 * returns JWT token which can be used to authenticate further requests
 * Authorization required: none
 */
router.post("/register/customer", async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, customerRegisterSchema);

        if(!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        // if (req.body.karmaScore) req.body.role = "customer";
        // else req.body.role = "92G";

        // Determine user model by the database table associated with the new row
        // which in turn determines the value assigned to the 'role' property
        // let userModel;

        // switch(req.body.role) {
        //     case "customer":
        //         userModel = Customer;
        //         break;
        //     case "92G":
        //         userModel = Cook;
        //         break;
        //     default:
        //         throw new BadRequestError("Invalid user role");
        // }

        const newCustomer = await Customer.register(req.body);
        const token = createToken(newCustomer);

        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
