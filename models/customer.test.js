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