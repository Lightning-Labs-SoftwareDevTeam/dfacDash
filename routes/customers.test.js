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

/** POST /customers */
describe("POST /customers", () => {
    test("works for admin users: create non-admin customer", async () => {
        expect.assertions(2);

        const resp = await request(app)
            .post("/customers")
            .send({
                username: "test1",
                password: "pass4321",
                firstName: "test",
                lastName: "one",
                dodid: "1111111111",
                phNumber: '(111) 111-1111',
                isAdmin: false,
                email: "test1@mail.com",
                profilePicURL: "http://t1.img"
            })
            .set("authorization", `Bearer ${a1Token}`);
        console.log("STATUS CODE~~~~~~~~~",resp.statusCode);
        console.log("HEADERS~~~~~~~~~~~~~",resp.headers);
        console.log("BODY~~~~~~~~~~~~~~~~",resp.body);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            customer: {    
                username: "test1",
                firstName: "test",
                lastName: "one",
                phNumber: '(111) 111-1111',
                isAdmin: false,
                karmaScore: 3,
                email: "test1@mail.com",
                profilePicURL: "http://t1.img"
            },
            token: expect.any(String)
        });
    });
});