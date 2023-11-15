// ------ ENV SETUP ------
require("dotenv").config();

// ------ EXPRESS SETUP ------
import { Express, Request, Response, RequestHandler } from 'express' //TS Import
const express = require('express');
const app: Express = express();
require("express-async-errors");
app.use(express.json());

// ----- DB IMPORT ------
const pool = require('./db/db')

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
// const errorHandlerMiddleware: RequestHandler = require("./middleware/error-handler");
/**
 * TODO: Da inserire e attivare eventuali altri middleware
 */

//Activation
// app.use(errorHandlerMiddleware);

//------ ROUTES SETUP ------
//const authRouter = require("./routes/auth"); ESEMPIO
/**
 * TODO: Da inserire/importare e mappare eventuali altre rotte
 */

//------- Try DB Connection or throw error ------

const start = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        if (conn) {
            app.listen(process.env.PORT, () => {
                console.log(`Server connected to DB and running at http://localhost:${process.env.PORT}`);
            });
        }
    }
    catch (error) {
        console.log(error)
    }
    finally {
        if (conn) return conn.release();
    }
}

start();

// app.get('/users', async (req: Request, res: Response) => {
//     let conn;
//     try {
//         // establish a connection to MariaDB
//         conn = await pool.getConnection();

//         // create a new query
//         var query = "select * from splusers";

//         // execute the query and set the result to a new variable
//         var rows = await conn.query(query);

//         // return the results
//         res.send(rows);
//     } catch (err) {
//         throw err;
//     }
// });