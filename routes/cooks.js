"use strict";

/** Routes for 92Gs */

const express = require("express");
const router = express.Router();

const jsonschema = require("jsonschema");
const cookNewSchema = require("../schemas/new92G.json");
const update92GSchema = require("../schemas/update92G.json");
const Cook = require("../models/cook");

const {
    authenticateJWT,
    ensureLoggedIn,
    ensureAdmin,
    ensureManager,
    ensureAdminOrManager
} = require("../middleware/auth");

const { BadRequestError, ForbiddenError } = require("../expressError");
const { createToken } = require("../helpers/tokens");

/** CRUD router functions for cooks data */

/** POST route for Creating new cooks
 * 
 * Adds a new 92G to the database, but only for admin users or dfac managers.
 * Registration for normal users happens at a different endpoint.
 * 
 * returns the newly created 92G and an auth token.
 * /{ user } --> {user: { dfacID, username, rank, firstName, lastName, dodid, email, profilePicURL,
 *          isAdmin, isManager, updateMenu, updateHours, updateMeals, updateOrders, role }, token }
 * 
 * Requires login and admin or manager rights
 * 
 * */ 
router.post("/", ensureLoggedIn, ensureAdminOrManager, async (req, res, next) => {
    try {
        // Explicitly setting the role property
        req.body.role = "92G";

        const validator = jsonschema.validate(req.body, cookNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const cook = await Cook.register(req.body);
        const token = createToken(cook);
        return res.status(201).json({ cook, token });
    } catch (err) {
        return next(err);
    }
});

/** GET route for accessing all 92G data - READ
 *  
 * returns all cooks as the response object locals: users
 * / --> {users: [ {cookID, dfacID, username, rank, firstName, lastName, dodid, profilePicURL,
 *          isAdmin, isManager, updateMenu, updateHours, updateMeals, updateOrders, createdAt,
 *          updatedAt, deletedAt}, {...}, ...]
 * Requires login and admin rights
* */
router.get("/", authenticateJWT, ensureLoggedIn, ensureAdmin, async (req, res, next) => {
    try {
        const cooks = await Cook.findAll();

        return res.json({ cooks });
    } catch (err) {
        return next(err);
    }
});

/** GET route for accessing all the data of 92Gs assigned to a specific dfac - READ
 *  
 * returns all of the 92Gs with the given dfacID as the response object locals: users
 * / --> {users: [ {cookID, dfacID, username, rank, firstName, lastName, dodid, profilePicURL,
 *          isAdmin, isManager, updateMenu, updateHours, updateMeals, updateOrders, createdAt,
 *          updatedAt, deletedAt}, {...}, ...]
 * Requires login and DFAC manager rights
* */
router.get("/dfac/:dfacID", authenticateJWT, ensureLoggedIn, ensureManager, async (req, res, next) => {
    try {
        const dfacID = parseInt(req.params.dfacID, 10);
        const managerDfacID = res.locals.user.dfacID

        if (dfacID !== managerDfacID) {
            throw new ForbiddenError("DFAC access denied");
        }
        const cooks = await Cook.findAllFromDFAC(dfacID);
        return res.json({ cooks });
    } catch (err) {
        return next(err);
    }
});

/** GET route for 92G data based on username - READ
 * /[username] --> { cook }
 * 
 * returns { "cook": {dfacID, cookID, username, rank, firstName, lastName, dodid, email, profilePicURL, isAdmin,
 *              isManager, updateMenu, updateHours, updateMeals, updateOrders, createdAt, updated, deletedAt}
 * Requires admin rights or user making request 
 *                          has username === username passed in
 *    or, manager rights for the dfac matching username-dfacID
 */
router.get("/user/:username", authenticateJWT, ensureLoggedIn, async (req, res, next) => {
    try {
        const requestorUsername = res.locals.user.username;
        const targetUsername = req.params.username;
        const user = res.locals.user;

        console.log("Requestor username: ", requestorUsername, " Target username: ", targetUsername);
        const requestorDfacID = res.locals.user.dfacID;
        
        const targetUserDfacID = await Cook.getDFACIDbyUsername(targetUsername);
        console.log("Requestor;s dfacID: ", requestorDfacID, " Target user's dfacID: ", targetUserDfacID);

        if (user.username === targetUsername || user.isAdmin ||
            (user.isManager && user.dfacID === await Cook.getDFACIDbyUsername(targetUsername))) {
            const cook = await Cook.get(targetUsername);
            return res.json({ cook });
        } else {
            throw new ForbiddenError("Access denied");
        }
    } catch (err) {
        return next(err);
    }
});

/** PATCH route for supervisors modifying a cook's data - UPDATE
 * 
 * data can include { dfac_id, rank, firstName, lastName, email, profilePicURL, isAdmin,
 *                      isManager, updateMenu, updateHours, updateMeals, updateOrders }
 * 
 * returns  { dfacID, username, rank, firstName, lastName, email, profilePicURL isAdmin, isManager,
 *             updateMenu, updateHours, updateMeals, updateOrders, updatedAt }
 * 
 * Requires admin rights or manager rights for the dfac matching username-dfacID
 *                              
 */
router.patch("/:username", authenticateJWT, ensureLoggedIn, async (req, res, next) => {
    try {
        const targetUsername = req.params.username;
        const requestorDfacID = res.locals.user.dfacID;
        const targetUserDfacID = await Cook.getDFACIDbyUsername(targetUsername);


        const validator = jsonschema.validate(req.body, update92GSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        if (res.locals.user.isAdmin) {
            const cook = await Cook.update(targetUsername, req.body);
            return res.json({ cook });
        } else if (requestorDfacID === targetUserDfacID && res.locals.user.isManager) {
            const cook = await Cook.update(targetUsername, req.body);
            return res.json({ cook });
        } else {
            throw new ForbiddenError("Access denied");
        }
    } catch (err) {
        return next(err);
    }
});

/** PATCH route for self-modification of 92G data - UPDATE
 * 
 * data can include { password, rank, firstName, lastName, email, profilePicURL }
 * 
 * returns  { dfacID, username, rank, firstName, lastName, email, profilePicURL isAdmin, isManager,
 *             updateMenu, updateHours, updateMeals, updateOrders, updatedAt }}
 * 
 * Requires user making route request has
 *                              username === username passed in
 *                              
 */
router.patch("/:username/self", authenticateJWT, ensureLoggedIn, async (req, res, next) => {
    try {
        const requestorUsername = res.locals.user.username;
        const targetUsername = req.params.username;

        const validator = jsonschema.validate(req.body, customerUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        if (requestorUsername === targetUsername) {
            const cook = await Cook.selfEdit(targetUsername, req.body);
            return res.json({ cook });
        } else {
            throw new ForbiddenError("Access denied");
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
            await Cook.remove(targetUsername);
            return res.json({ deleted: targetUsername });
        } else {
            ensureAdmin(req, res, async () => 
                await Cook.remove(targetUsername)
                .then(() => res.json({ deleted: targetUsername }))
                .catch(next));
            }
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
