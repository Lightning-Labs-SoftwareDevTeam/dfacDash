"use strict";

/** DFAC routes */

const express = require("express");
const router = express.Router();

const jsonschema = require("jsonschema");
const newDfacSchema = require("../schemas/dfacNew.json");
const dfacUpdateSchema = require("../schemas/dfacUpdate.json");
const Dfac = require("../models/dfac");

const { ensureLoggedIn, ensureAdmin, authenticateJWT } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");

/** CRUD router functions for DFAC data */

/** POST route for creating a new DFAC
 *  -- CREATE --
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

/** ~~~~~
 * GET routes for reading dfac data is in the auth.js routes file. No authorization required
 * ~~~~~
 */

/** PATCH route for modifying dfac data
 *          -UPDATE-
 * 
 * data can include { dfacName, dfacLogo, street, bldgNum, city, state, zip, dfacPhone,flashMsg1, flashMsg2,
 *                      bfHours, luHours, dnHours, bchHours, supHours, orderBf, orderLu,
 *                      orderDn, orderBch, orderSup }
 * 
 * returns
 *      { dfac: {dfacID, dfacName, dfacLogo, street, bldgNum, city, state, zip, dfacPhone, flashMsg1, flashMsg2,
 *                       bfHours, luHours, dnHours, bchHours, supHours, orderBf, orderLu, orderDn, orderBch, orderSup} }
 * 
 * Requires supervisory rights
 */
router.patch("/:dfacID", authenticateJWT, ensureLoggedIn, async (req, res, next) => {
    try {
        const dfacTarget = req.params.dfacID;
        const requestorDfacID = res.user.dfacID;

        const validator = jsonschema.validate(req.body, dfacUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        if (res.locals.user.isAdmin) {
            const dfac = await Dfac.update(dfacTarget, req.body);
            return res.json({ dfac });
        } else if (requestorDfacID === dfacTarget && res.locals.user.isManager) {
            const dfac = await Dfac.update(dfacTarget, req.body);
            return res.json({ dfac });
        } else {
            throw new ForbiddenError("Access denied");
        }
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
