"use strict";

/** tests for customer model */

const db = require("../db");
const Customer = require("./customer")
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError
} = require("../expressError");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    c1Token,
    a1Token
} = require("./_testCommon");
// set up and tear down
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// authenticate function
describe("authenticate", () => {
    test("works", async () => {
        expect.assertions(1);
        let bart = await db.query(
            `SELECT username FROM customers
                WHERE fname='Bart'`
        );
        console.log(bart);
        const customer = await Customer.authenticate("customer1", "password1");
        expect(customer).toEqual({
            username: "customer1",
            firstName: "Bart",
            lastName: "Simpson",
            phNumber: "808-080-8080",
            isAdmin: false,
            karmaScore: 3,
            email: "bart@mail.com",
            profilePicURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSPElOkSxEaD0RzAfl0z7ZvzQ5dRNulf7dhq2oFn62J_WhbFG-rHkfSK7NNuxJbNqu320&usqp=CAU"
        });
    });
});
"use strict";

/* Tests for each of the customers routes */

const request = require("supertest");

const db = require("../db");
const app = require("../app");
const Customer = require("../models/customer");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    c1Token,
    a1Token
} = require("./_testCommon");

// setups and teardowns
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// Include the isInOrderWindow function
const { isInOrderWindow } = require("./your-file-name"); // Replace with the actual file path

// New test suite for isInOrderWindow function
describe("isInOrderWindow", () => {
    test('returns true when current time is within allowed time frames on a weekday', () => {
        // Mock the current date and time for testing purposes (assuming a weekday)
        const currentDate = new Date(2022, 0, 3, 7, 0); // January 3, 2022, 07:00 AM (Monday)
        global.Date = jest.fn(() => currentDate);

        // Call the function
        const result = isInOrderWindow();

        // Assert that the result is true
        expect(result).toBe(true);
    });

    test('returns true when current time is within allowed time frames on a weekend for brunch', () => {
        // Mock the current date and time for testing purposes (assuming a Saturday)
        const currentDate = new Date(2022, 0, 8, 8, 0); // January 8, 2022, 08:00 AM (Saturday)
        global.Date = jest.fn(() => currentDate);

        // Call the function
        const result = isInOrderWindow();

        // Assert that the result is true
        expect(result).toBe(true);
    });

    test('returns false when current time is outside allowed time frames on a weekend for dinner', () => {
        // Mock the current date and time for testing purposes (assuming a Sunday)
        const currentDate = new Date(2022, 0, 9, 16, 0); // January 9, 2022, 04:00 PM (Sunday)
        global.Date = jest.fn(() => currentDate);

        // Call the function
        const result = isInOrderWindow();

        // Assert that the result is false
        expect(result).toBe(false);
    });
});

/** POST /customers */
describe("POST /customers", () => {
    test("works for admin users: create non-admin customer", async () => {
        // ... your existing test code for POST /customers
    });
});


