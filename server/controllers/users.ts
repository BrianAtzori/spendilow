// ------ Imports ------
import { Request, Response } from 'express' //TS Import
import { StatusCodes } from "http-status-codes";
const { BadRequestError, UnauthenticatedError } = require("../errors");

// ------ REGISTER USER ------
const registerUser = async (req: Request, res: Response) => {
    console.log("Register User")
    throw new BadRequestError("BR");
    res.json("OK");
}

// ------ LOGIN USER ------
const loginUser = async (req: Request, res: Response) => {
    console.log("Login User")
    throw new UnauthenticatedError("UN")
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