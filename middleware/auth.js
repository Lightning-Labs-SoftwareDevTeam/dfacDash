"use strict";

/** Convenience middleware to handle common auth cases in routes */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError, ForbiddenError } = require("../expressError");

/** Authenticate user
 * 
 * If token provided, verify and if valid, store the token payload
 * on res.locals, which will also include username and isAdmin field.
 * 
 * Not an error if no token or invalid token provided
 */
function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
    
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }

        return next();
    } catch (err) {
        return next();
    }
}

/** ensure the customer logged-in; if not, raise Unauthorized error */
function ensureLoggedIn(req, res, next) {
    try {
        if (!res.locals.user) {
            throw new UnauthorizedError();
        }
        return next();
    } catch (err) {
        return next(err);
    }
}

/** ensure the isAdmin value equals true; ensures the logged-in user has
 * admin privileges. If not, raise Forbidden error
 */
function ensureAdmin(req, res, next) {
    try {
        if (!res.locals.user || !res.locals.user.isAdmin) {
            throw new ForbiddenError();
        }
        return next();
    } catch (err) {
        next(err);
    }
}

/** implements a check for differentiating between user roles and ensuring
 * that res.locals.user has correct role property; 
 * cooks have slightly different routes than customers
*/
function ensureRole(role) {
    return (req, res, next) => {
        if (!res.locals.user || res.locals.user.role !== role) {
            throw new ForbiddenError();
        }
        return next()
    };
}

module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    ensureAdmin,
    ensureRole
};