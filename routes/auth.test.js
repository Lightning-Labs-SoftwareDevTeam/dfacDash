"use strict";

/** Tests for authentication routes */
const request = require("supertest");
const app = require("../app");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// POST /auth/register for a brand new user
describe("POST /auth/register", () => {
    test("works for anonymous", async () => {
        expect.assertions(2);

        const resp = await request(app)
            .post("/auth/register")
            .send({
                username: 'new',
                password: '12345six',
                firstName: 'Pat',
                lastName: 'Selmers',
                dodid: '9876543219',
                phNumber: '(999) 999-1234',
                isAdmin: false,
                email: 'newtest@mail.com',
                role: "customer"
            });

        console.log(resp.body);

        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            "token": expect.any(String)
        });
    });
})