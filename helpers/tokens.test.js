"use strict";

const jwt = require("jsonwebtoken");

const { createToken } = require("./tokens");
const { BadRequestError } = require("../expressError");
const { SECRET_KEY } = require("../config");

describe("createToken", () => {
    test("works: not admin", () => {
        expect.assertions(1);

        const token = createToken( { username: "test", isAdmin: false, role: "manager" });
        const payload = jwt.verify(token, SECRET_KEY);

        expect(payload).toEqual({
            exp: expect.any(Number),
            iat: expect.any(Number),
            username: "test",
            isAdmin: false,
            role: "manager"
        });
    });

    test("works: admin", () => {
        expect.assertions(1);

        const token = createToken( { username: "test", isAdmin: true, role: "customer" });
        const payload = jwt.verify(token, SECRET_KEY);

        expect(payload).toEqual({
            exp: expect.any(Number),
            iat: expect.any(Number),
            username: "test",
            isAdmin: true,
            role: "customer"
        });
    });

    test("works: default", () => {
        expect.assertions(1);

        const token = createToken( { username: "test", role: "cook" });
        const payload = jwt.verify(token, SECRET_KEY);

        expect(payload).toEqual({
            exp: expect.any(Number),
            iat: expect.any(Number),
            username: "test",
            isAdmin: false,
            role: "cook"
        });
    });

    test("error handling: fails to sign token", () => {
        // Use jest.spyOn function to mock jwt.sign() and throw an error
        const mockSign = jest.spyOn(jwt, 'sign').mockImplementation(() => {
            throw new Error("Token signing failed");
        });

        expect.assertions(2);

        try {
            createToken({ username: "test", role: "customer" }); // should return mockSign vice the normal jwt.sign()
        } catch (err) {
            expect(err).toBeInstanceOf(BadRequestError);
            expect(err.message).toEqual("Unable to create token");
        }

        // Restore to original jwt.sign() implementation
        mockSign.mockRestore();
    });

    test("token expiration", async () => {
        // Set expiration for a short duration
        const shortLivedToken = createToken({ username: "test", role: "customer" }, '2s');
        // Wait for slightly longer
        await new Promise(resolve => setTimeout(resolve, 2500));
        // Expect the token to expire and throw error
        expect.assertions(1);

        expect(() => {
            jwt.verify(shortLivedToken, SECRET_KEY);
        }).toThrow(jwt.TokenExpiredError);
    });
});