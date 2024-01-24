"use strict";

/** DFAC routes */

const express = require("express");
const router = express.Router();

const jsonschema = require("jsonschema");
const newDfacSchema = require("../schemas/dfacNew.json");
const Dfac = require("../models/dfac");

const { ensureLoggedIn, ensureAdmin, authenticateJWT } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const { createToken } = require("../helpers/tokens");
const { json } = require("body-parser");

/** CRUD router functions for DFAC data */

/** POST route for creating a new DFAC
 * 
 * Adds a new dfac to the database, but only for admin users. Must include
 *  {dfacName, street, city, state, zip, dfacPhone} as input, 
 *  but optionally accepts all the other dfac attributes too
 * 
 * Requires admin and login rights
 */
router.post("/", authenticateJWT, ensureLoggedIn, ensureAdmin, async(req, res, next) => {
    try {
        const validator = jsonschema.validate(req.body, newDfacSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const dfac = await Dfac.add(req.body);
        return res.status(201).json({ dfac });
    } catch (err) {
        return next(err);
    }
});

/** GET route for reading dfac data is in the auth.js routes file. No authorization required */