// ------ Imports ------
import { Request, Response, } from 'express' //TS Import
const SpendilowUser = require("../classes/spendilow-user")
import { StatusCodes } from "http-status-codes";
const { BadRequestError, UnauthenticatedError } = require("../errors");
const pool = require('../db/db')

// ------ REGISTER USER ------
const registerUser = async (req: Request, res: Response) => {

    if (!req.body) {
        throw new BadRequestError("Richiesta non effetuata correttamente, ricontrolla i dati inseriti.")
    }

    const { id, email, password, savings, salary, profileImage, workfield, username } = new SpendilowUser({ ...req.body });

    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();

        // create a new query
        const query = `
        INSERT INTO \`splusers\` (\`id\`, \`email\`, \`password\`, \`savings\`, \`salary\`, \`profileimage\`, \`workfield\`, \`username\`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;


        // execute the query and set the result to a new variable
        let rows = await conn.query(query, [id, email, password, savings, salary, profileImage, workfield, username]);

        // return the results
        res.json(rows.warningStatus);
    } catch (err) {
        throw err;
    }

}

// ------ LOGIN USER ------
const loginUser = async (req: Request, res: Response) => {
    console.log("Login User")
    res.json("OK");
}

// ------ MODIFY USER ------
const modifyUser = async (req: Request, res: Response) => {
    console.log("Mod User")
    res.json("OK");
}

// ------ DELETE USER ------
const deleteUser = async (req: Request, res: Response) => {
    console.log("Del User")
    res.json("OK");
}

// ------ Exports ------
module.exports = { registerUser, loginUser, modifyUser, deleteUser }