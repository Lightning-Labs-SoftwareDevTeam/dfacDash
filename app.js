"use strict";

/** Express app for dfacDash */

const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const { authenticateJWT } = require("./middleware/auth");
const { NotFoundError } = require("./expressError");
const customerRoutes = require("./routes/customers");
const cookRoutes = require("./routes/cooks");
const dfacRoutes = require("./routes/dfacs");
const authRoutes = require("./routes/auth");

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// routes that require authentication will use the auth JWT middleware
customerRoutes.use(authenticateJWT);
cookRoutes.use(authenticateJWT);
dfacRoutes.use(authenticateJWT);
app.use("/customers", customerRoutes);
app.use("/92G", cookRoutes);
app.use("/dfacs", dfacRoutes);
// routes open to anyone do not require a token
app.use("/auth", authRoutes);

// Handle most errors with 404
app.use((req, res, next) => {
        return next(new NotFoundError());
});

// Everything else unhandled gets caught here
app.use((err, req, res, next) => {
        if (process.env.NODE_ENV !== "test") console.error(err.stack);
        const status = err.status || 500;
        const message = err.message;

        return res.status(status).json({
                error: { message, status }
        });
});

module.exports = app;
