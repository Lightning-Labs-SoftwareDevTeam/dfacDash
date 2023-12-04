const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** Helper function returns signed JWT from customer data */
function createToken(user) {
    console.assert(user.role !== undefined, "createToken passed user without role property");

    let payload = {
        username: user.username,
        role: user.role,
        isAdmin: user.isAdmin || false
    };

    // expiration set for added security
    const options = { expiresIn: '1h' };

    return jwt.sign(payload, SECRET_KEY, options);
}

module.exports = { createToken };