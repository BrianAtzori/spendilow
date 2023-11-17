// ------ Imports ------
import { Request, Response, } from 'express' //TS Import
const SpendilowUser = require("../classes/spendilow-user")
const { BadRequestError, UnauthenticatedError } = require("../errors");
const dbManager = require("../db/db-manager");

/**
 * !JWT Generation and send to user
 * !Password hash
 */

// ------ REGISTER USER ------
const registerUser = async (req: Request, res: Response) => {

    if (!req.body) {
        throw new BadRequestError("Richiesta non effetuata correttamente, ricontrolla i dati inseriti.")
    }

    const newAccount = new SpendilowUser({ ...req.body });

    let queryResult = await dbManager.databaseInteraction('CREATE_USER', newAccount);

    res.json(queryResult);

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