import { Express, Request, Response } from 'express'
const express = require('express');
const app: Express = express();
const dotenv = require('dotenv');
dotenv.config();
const pool = require('./db')

app.get('/users', async (req: Request, res: Response) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();

        // create a new query
        var query = "select * from splusers";

        // execute the query and set the result to a new variable
        var rows = await conn.query(query);

        // return the results
        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});

app.listen(process.env.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`);
});

