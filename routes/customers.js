"use strict";

/** Routes for customers */

const express = require("express");
const router = express.Router();

const jsonschema = require("jsonschema");
const customerNewSchema = require("../schemas/customerNew.json");
const customerUpdateSchema = require("../schemas/customerUpdate.json");
const Customer = require("../models/customer");

const { ensureLoggedIn, ensureAdmin } = require("../middleware/auth");
const { BadRequestError, ForbiddenError } = require("../expressError");
const { createToken } = require("../helpers/tokens");

/** TODO - CRUD router functions for customers data */