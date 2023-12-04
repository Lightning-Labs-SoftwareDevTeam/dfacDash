"use strict";

/** Test config.js file, ensuring application
 * behaves as intended in different environments
 * and taking into account Node.js behavior of 
 * caching modules.
 */

describe("config can come from env", () => {
    let originalEnv;

    // Setup and tear down functions
    beforeAll(() => {
        originalEnv = process.env;
    });
    afterAll(() => {
        // Resets process.env to the original state
        process.env = originalEnv;
    });

    test("config variables correctly set for custom env", () => {
        // Overrides any other env variables, establishes test env
        jest.resetModules(); // clears module cache
        process.env = { ...originalEnv,
                            NODE_ENV: "test",
                            SECRET_KEY: "test-secret-key",
                            PORT: "5000",
                            DATABASE_URI: "postgresql:///dfacdash_test",
                            BCRYPT_WORK_FACTOR: "1"
                        };

        // Import config file for test expectations
        const config = require("./config");

        expect(config.NODE_ENV).toEqual("test");
        expect(config.SECRET_KEY).toEqual("test-secret-key");
        expect(config.PORT).toEqual(5000);
        expect(config.getDatabaseUri()).toEqual("postgresql:///dfacdash_test");
        expect(config.BCRYPT_WORK_FACTOR).toEqual(1);
    });

    test("config variables reset correctly", () => {
        jest.resetModules();
        process.env = { ...originalEnv, NODE_ENV: "test" };

        const config = require("./config");

        expect(config.getDatabaseUri()).toEqual("postgresql:///dfacdash_test");
    });
});