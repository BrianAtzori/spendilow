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
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const pool = require('./db');
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = yield pool.getConnection();
        // create a new query
        var query = "select * from splusers";
        // execute the query and set the result to a new variable
        var rows = yield conn.query(query);
        // return the results
        res.send(rows);
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn)
            return conn.release();
    }
}));
app.listen(process.env.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`);
});
