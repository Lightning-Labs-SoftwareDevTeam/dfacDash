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

