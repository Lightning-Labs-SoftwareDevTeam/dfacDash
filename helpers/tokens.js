"use strict";

const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../expressError");
const { SECRET_KEY } = require("../config");

/** Helper function returns signed JWT from user's data */
function createToken(user, expiration = '1h') {
    console.assert(user.role !== undefined, "createToken passed user without role property");

    let payload = {
        username: user.username,
        role: user.role,
        isAdmin: user.isAdmin || false
    };

    if (user.role === "92G") {
        payload.isManager = user.isManager || false;
        payload.canUpdateMenu = user.updateMenu || false;
        payload.canUpdateHours = user.updateHours || false;
        payload.canUpdateMeals = user.updateMeals || false;
    }

    // expiration set for added security
    const options = { expiresIn: expiration };

    //catch any errors that might occur during the JWT signing process
    try {
        return jwt.sign(payload, SECRET_KEY, options);
    } catch (err) {
        console.error("Error signing token: ", err);
        throw new BadRequestError("Unable to create token");
    }    
};

module.exports = { createToken };
