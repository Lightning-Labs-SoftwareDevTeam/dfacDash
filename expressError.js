/** ExpressError class extends normal JavaScript error class
 * by adding an HTTP status code parameter for each instance
 * 
 * The error-handing middleware will return the extended error
 */

class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

/** Four common errors extending ExpressError, written here
 * for convenience
 */
class NotFoundError extends ExpressError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}

class ForbiddenError extends ExpressError {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}

class UnauthorizedError extends ExpressError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

class BadRequestError extends ExpressError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}

module.exports = {
    ExpressError,
    NotFoundError,
    ForbiddenError,
    UnauthorizedError,
    BadRequestError
};
