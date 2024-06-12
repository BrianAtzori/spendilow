"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// ------ ENV SETUP ------
require("dotenv").config();
const express = require("express");
const app = express();
require("express-async-errors");
app.use(express.json({ limit: "10mb" }));
// ----- DB IMPORT ------
const dbConnectionPool = require("./db/db-connector");
// ------ SWAGGER ------
// const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
// const swaggerDocument = YAML.load("./swagger.yaml");
//------ SECURITY SETUP ------
//Imports
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const cookieParser = require("cookie-parser");
//Activation
app.use(helmet());
app.use(cors({
    origin: `${process.env.ORIGIN}`,
    credentials: true,
}));
app.use(xss());
app.set("Trust Proxy", 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 100,
    max: 100,
}));
app.use(cookieParser());
// ------ MIDDLEWARE SETUP ------
//Imports
const authenticationMiddleware = require("./middleware/authentication");
const errorHandlerMiddleware = require("./middleware/error-handler");
//------ ROUTES SETUP ------
const usersRouter = require("./routes/users");
const utilitiesRouter = require("./routes/utilities");
const authenticatedUsersRouter = require("./routes/authenticated-users");
const transactionsRouter = require("./routes/transactions");
const budgetRouter = require("./routes/budgets");
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/utilities", utilitiesRouter);
app.use("/api/v1/authenticated-users", authenticationMiddleware, authenticatedUsersRouter);
app.use("/api/v1/authenticated-users/transactions", authenticationMiddleware, transactionsRouter);
app.use("/api/v1/authenticated-users/budgets", authenticationMiddleware, budgetRouter);
// app.use("/api-docs/", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
//Activation for Error Middleware
app.use(errorHandlerMiddleware);
//------- Try DB Connection or throw error ------
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        connection = yield dbConnectionPool.getConnection();
        if (connection) {
            app.listen(process.env.PORT, () => {
                console.log(`Server connected to DB and running at http://localhost:${process.env.PORT}`);
            });
        }
    }
    catch (error) {
        throw new Error("Errore di connessione al Database, il server non è disponibile.");
    }
    finally {
        if (connection)
            return connection.release();
    }
});
start();
// ------ Exports ------
module.exports = start;
