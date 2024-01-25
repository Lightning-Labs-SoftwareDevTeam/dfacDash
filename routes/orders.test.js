"use strict";

const request = require("supertest");
const db = require("../db");
const app = require("../app");
const Order = require("../models/order");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    c1Token,
    a1Token
} = require("./_testCommon");

// Set up and tear down
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("POST /orders", () => {
    test("works for a customer to create a new order", async () => {
        expect.assertions(2);

        const resp = await request(app)
            .post("/orders")
            .send({
                customerId: 1,
                dfacId: 2,
                comments: "Extra cheese",
                toGo: true,
                favorite: false
            })
            .set("authorization", `Bearer ${c1Token}`);

        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            order: {
                id: expect.any(Number),
                customerId: 1,
                dfacId: 2,
                comments: "Extra cheese",
                toGo: true,
                favorite: false,
                orderTimestamp: expect.any(String),
                readyForPickup: null,
                pickedUp: null,
                canceled: false
            }
        });
    });
});

describe("GET /orders", () => {
    test("works for admin to get all orders", async () => {
        expect.assertions(2);

        const resp = await request(app)
            .get("/orders")
            .set("authorization", `Bearer ${a1Token}`);

        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({
            orders: expect.arrayContaining([
                {
                    id: expect.any(Number),
                    customerId: expect.any(Number),
                    dfacId: expect.any(Number),
                    comments: expect.any(String),
                    toGo: expect.any(Boolean),
                    favorite: expect.any(Boolean),
                    orderTimestamp: expect.any(String),
                    readyForPickup: null,
                    pickedUp: null,
                    canceled: expect.any(Boolean)
                }
            ])
        });
    });
});

describe("DELETE /orders/:id", () => {
    test("works for admin to delete an order", async () => {
        expect.assertions(2);

        const resp = await request(app)
            .delete(`/orders/${1}`)
            .set("authorization", `Bearer ${a1Token}`);

        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({
            order: {
                id: 1,
                customerId: expect.any(Number),
                dfacId: expect.any(Number),
                comments: expect.any(String),
                toGo: expect.any(Boolean),
                favorite: expect.any(Boolean),
                orderTimestamp: expect.any(String),
                readyForPickup: null,
                pickedUp: null,
                canceled: expect.any(Boolean)
            }
        });
    });
});

describe("PATCH /orders/:id", () => {
    test("works for admin to update order status", async () => {
        expect.assertions(2);

        const resp = await request(app)
            .patch(`/orders/${1}`)
            .send({
                readyForPickup: new Date()
            })
            .set("authorization", `Bearer ${a1Token}`);

        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({
            order: {
                id: 1,
                customerId: expect.any(Number),
                dfacId: expect.any(Number),
                comments: expect.any(String),
                toGo: expect.any(Boolean),
                favorite: expect.any(Boolean),
                orderTimestamp: expect.any(String),
                readyForPickup: expect.any(String), // Updated value
                pickedUp: null,
                canceled: expect.any(Boolean)
            }
        });
    });
});
