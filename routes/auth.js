"use strict";

/** Routes for new and returning users; no token required */

const express = require("express");
const router = new express.Router;

const jsonschema = require("jsonschema");
const customerRegisterSchema = require("../schemas/customerRegister.json");
const cookRegisterSchema = require("../schemas/new92G.json");
const Customer = require("../models/customer");
const Cook = require("../models/cook");
const { createToken } = require("../helpers/tokens");
const { BadRequestError } = require("../expressError");

/** POST /auth/register/customer
 * 
 * customer must include { username, password, firstName, lastName, dodid, mealCard, isAdmin, role }
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

        const newCustomer = await Customer.register(req.body);
        const token = createToken(newCustomer);

        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    }
});

/** POST /auth/register/92G
 * 
 * 92G must include { dfacID, username, password, firstName, lastName, dodid,
 *    email, isAdmin, isManager, updateMenu, updateHours, updateMeals, updateOrders, role }
 * 
 * returns JWT token which can be used to authenticate further requests
 * Authorization required: none
 */
router.post("/register/92G", async (req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, cookRegisterSchema);

        if(!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const newCook = await Cook.register(req.body);
        const token = createToken(newCook);

        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
