// ------ Imports ------
import { Request, Response, } from 'express' //TS Import
const SpendilowUser = require("../classes/spendilow-user")
import { StatusCodes } from "http-status-codes"
const { BadRequestError, UnauthenticatedError } = require("../errors");
const dbManager = require("../db/db-manager");

// ------ REGISTER USER ------
const registerUser = async (req: Request, res: Response) => {
    if (!req.body) {
        throw new BadRequestError("Richiesta non effetuata correttamente, ricontrolla i dati inseriti.")
    }
    const newAccount = new SpendilowUser({ ...req.body });

    await newAccount.hashPassword();

    const token = newAccount.JWTGeneration();

    await dbManager.databaseInteraction('CREATE_USER', newAccount);

    res.status(StatusCodes.CREATED).json({ account: newAccount.email, token });
}

// ------ LOGIN USER ------
const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError("Email o password non validi");
    }

    const spendilowUser = await dbManager.databaseInteraction('GET_USER',req.body);

    console.log(spendilowUser)

    if (!spendilowUser) {
        throw new UnauthenticatedError("L'indirizzo email fornito è errato.");
    }

    const isPasswordCorrect: boolean = spendilowUser.pwdCheck(password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("La password fornita è errata.");
    }

    const token = SpendilowUser.JWTGeneration();

    res.status(StatusCodes.OK).json({id: spendilowUser.id, email: spendilowUser.email, token})
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