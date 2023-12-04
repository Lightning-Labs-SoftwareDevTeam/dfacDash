"use strict";

/** Test the authorization functions defined in auth.js */

const jwt = require("jsonwebtoken");
const { UnauthorizedError, ForbiddenError } = require("../expressError");
const {
    authenticateJWT,
    ensureLoggedIn,
    ensureAdmin
} = require("./auth");

const { SECRET_KEY } = require("../config");
const testJWT = jwt.sign({
        username: "test", isAdmin: false
    }, SECRET_KEY);
const badJWT = jwt.sign({
        username: "test", isAdmin: false
    }, "wrong_key");
const adminJWT = jwt.sign({
        username: "testAdmin", isAdmin: true
    }, SECRET_KEY);

describe("authenticateJWT", () => {
    test("should populate res.locals with user data when valid JWT token provided in header", () => {
        expect.assertions(2);

        // passing the auth token via header
        const req = { headers: { authorization: `Bearer ${testJWT}` } };
        const res = { locals: {} };
        const next = (err) => {
            expect(err).toBeFalsy();
        };

        authenticateJWT(req, res, next);
        expect(res.locals).toEqual({
            user: {
                iat: expect.any(Number),
                username: "test",
                isAdmin: false
            }
        });
    });

    test("res.locals should be empty if user data lacks headers", () => {
        //expect assertions safeguards against false positives, protecting against,
        //for example, a case where the test passes because a callback never executed
        expect.assertions(2);

        //empty header
        const req = {};
        const res = { locals: {} };
        const next = (err) => {
            expect(err).toBeFalsy();
        };

        authenticateJWT(req, res, next);
        expect(res.locals).toEqual({});
    });

    test("res.locals should be empty if header contains invalid token payload", () => {
        expect.assertions(2);

        // bad passcode
        const req = { headers: { authorization: `Bearer ${badJWT}` } };
        const res = { locals: {} };
        const next = (err) => {
            expect(err).toBeFalsy();
        };

        authenticateJWT(req, res, next);
        expect(res.locals).toEqual({});
    });
});

describe("ensureLoggedIn", () => {
    test("works", () => {
        expect.assertions(1);

        // header data shows logged in user
        const req = {};
        // *note -- Express.js convention stores the locals object within the response, not in the request
        const res = { locals: { user: { username: "test", isAdmin: false } } };
        const next = (err) => {
            expect(err).toBeFalsy();
        };

        ensureLoggedIn(req, res, next);
    });

    test("unauth if no login", () => {
        expect.assertions(1);

        //empty res.locals data implies the user never logged in
        const req = {};
        const res = { locals: {} };
        const next = (err) => {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        };

        ensureLoggedIn(req, res, next);
    });
});

describe("ensureAdmin", () => {
    test("works for admin", () => {
        expect.assertions(1);

        // header data shows valid token and isAdmin equals true
        const req = { headers: { authorization: `Bearer ${adminJWT}` } };
        const res = { locals: { user: { username: "testAdmin", isAdmin: true } } };
        const next = (err) => {
            expect(err).toBeFalsy();
        };

        ensureAdmin(req, res, next);
    });

    test("forbidden for non-admin", () => {
        expect.assertions(1);

        // logged-in user with valid token but isAdmin equals false
        const req = { headers: { authorization: `Bearer ${testJWT}` } };
        const res = { locals: { user: { username: "test", isAdmin: false } } };
        const next = (err) => {
            expect(err instanceof ForbiddenError).toBeTruthy();
        };

        ensureAdmin(req, res, next);
    });

    test("forbidden if user not logged-in", () => {
        expect.assertions(1);

        // locals object empty of data
        const req = {};
        const res = { locals: {} };
        const next = (err) => {
            expect(err instanceof ForbiddenError).toBeTruthy();
        };

        ensureAdmin(req, res, next);
    });
});