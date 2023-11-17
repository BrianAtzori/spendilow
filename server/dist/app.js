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
const express = require('express');
const app = express();
require("express-async-errors");
app.use(express.json());
// ----- DB IMPORT ------
const dbConnectionPool = require('./db/db-connector');
//------ SECURITY SETUP ------
//Imports
const helmet = require("helmet");
const cors = require("express-cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
//Activation
app.use(helmet());
app.use(cors());
app.use(xss());
app.set("Trust Proxy", 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 100,
    max: 100,
}));
// ------ MIDDLEWARE SETUP ------
//Imports
const errorHandlerMiddleware = require("./middleware/error-handler");
/**
 * TODO: Da inserire e attivare eventuali altri middleware
 */
//Activation
app.use(errorHandlerMiddleware);
//------ ROUTES SETUP ------
const usersRouter = require("./routes/users");
app.use("/api/v1/users", usersRouter);
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
        console.log(error);
    }
    finally {
        if (connection)
            return connection.release();
    }
});
start();
