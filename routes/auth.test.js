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
                fname: 'Pat',
                lname: 'Selmers',
                dodid: '9876543219',
                phnumber: '(999) 999-1234',
                is_admin: false,
                email: 'newtest@mail.com'
            });

        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            "token": expect.any(String)
        });
    });
})