// ------ ENV SETUP ------
require("dotenv").config();

// ------ EXPRESS SETUP ------
import { Express, Request, Response, RequestHandler, Router } from 'express' //TS Import
const express = require('express');
const app: Express = express();
require("express-async-errors");
app.use(express.json({limit:'10mb'}));

// ----- DB IMPORT ------
const dbConnectionPool = require('./db/db-connector')

// ------ SWAGGER ------
const swaggerUI = require('swagger-ui-express');
const YAML = require("yamljs")
const swaggerDocument = YAML.load("./swagger.yaml");

//------ SECURITY SETUP ------
//Imports
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const cookieParser = require('cookie-parser');

//Activation
app.use(helmet());
app.use(cors({
    origin: '*'
}));
app.use(xss());
app.set("Trust Proxy", 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 100,
    max: 100,
}))
app.use(cookieParser());

// ------ MIDDLEWARE SETUP ------
//Imports
const errorHandlerMiddleware: RequestHandler = require("./middleware/error-handler");

//Activation
app.use(errorHandlerMiddleware);

//------ ROUTES SETUP ------
const usersRouter: Router = require("./routes/users");
const utilitiesRouter: Router = require("./routes/utilities");

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/utilities", utilitiesRouter);
app.use('/api-docs/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


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
        throw new Error("Errore di connessione al Database, il server non è disponibile.")
    }
    finally {
        if (connection) return connection.release();
    }
}

start();

// ------ Exports ------
module.exports = start;