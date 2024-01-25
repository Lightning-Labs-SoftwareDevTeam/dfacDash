"use strict"

/** Set up and tear down functions shared between all model test files  */

const db = require("../db");
const Customer = require("../models/customer");
//TODO: create models for other db entities

const { createToken } = require("../helpers/tokens");

let orderIDs = []; // possible future setup for testing an array of orders


async function commonBeforeAll() {
    // noinspection SQL without WHERE clause
    await db.query("DELETE FROM customers");
    await db.query("DELETE FROM dfacs");
    await db.query("DELETE FROM cooks");
    await db.query("DELETE FROM items");
    await db.query("DELETE FROM orders");

    await Customer.register(
        {
            username: "c1",
            password: "Mustard7Cow5Bell",
            firstName: "Moe",
            lastName: "Syzlak",
            dodid: '1231234567',
            phNumber: '808-888-0808',
            isAdmin: false,
            email: "moe@mail.com",
            profilePicURL: "https://assets3.thrillist.com/v1/image/1823889/414x310/crop;webp=auto;jpeg_quality=60;progressive.jpg"
        }
    )
    await Customer.register(
        {
            username: "a1",
            password: "Red8Bone1Beach",
            firstName: "Calliope",
            lastName: "Fuentes",
            dodid: '7654321321',
            phNumber: '818-999-1818',
            isAdmin: true,
            email: "calliope@mail.com",
            profilePicURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8BowjhmHTZ_C5ocGsP21Be6STFzacuqghsg&usqp=CAU"
        }
    )
}

async function commonBeforeEach() {
    await db.query("BEGIN");
}

async function commonAfterEach() {
    await db.query("ROLLBACK");
}

async function commonAfterAll() {
    await db.end();
}

const c1Token = createToken({ username: "c1", isAdmin: false, role: "customer" });
const a1Token = createToken({ username: "a1", isAdmin: true, role: "customer" });

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    c1Token,
    a1Token
}