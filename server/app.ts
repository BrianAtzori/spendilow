// ------ ENV SETUP ------
require("dotenv").config();

// ------ EXPRESS SETUP ------
import { Express, Request, Response, RequestHandler, Router } from 'express' //TS Import
import { connect } from 'http2';
const express = require('express');
const app: Express = express();
require("express-async-errors");
app.use(express.json());

// ----- DB IMPORT ------
const dbConnectionPool = require('./db/db-connector')

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
}))

// ------ MIDDLEWARE SETUP ------
//Imports
const errorHandlerMiddleware: RequestHandler = require("./middleware/error-handler");
/**
 * TODO: Da inserire e attivare eventuali altri middleware
 */

//Activation
app.use(errorHandlerMiddleware);

//------ ROUTES SETUP ------
const usersRouter: Router = require("./routes/users");


app.use("/api/v1/users", usersRouter);


//------- Try DB Connection or throw error ------

const start = async () => {
    let connection;
    try {
        connection = await dbConnectionPool.getConnection();
        if (connection) {
            app.listen(process.env.PORT, () => {
                console.log(`Server connected to DB and running at http://localhost:${process.env.PORT}`);
            });
        }
    }
    catch (error) {
        console.log(error)
    }
    finally {
        if (connection) return connection.release();
    }
}

start();