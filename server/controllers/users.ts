// ------ Imports ------
import { Request, Response, } from 'express' //TS Import
const SpendilowUser = require("../classes/spendilow-user")
import { StatusCodes } from "http-status-codes"
const { BadRequestError, UnauthenticatedError } = require("../errors");
const dbManager = require("../db/db-manager");

// ------ REGISTER USER ------
const registerUser = async (req: Request, res: Response) => {

    if (!req.body) {
        throw new BadRequestError("Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente.")
    }

    const { email } = req.body

    if (!email) {
        throw new BadRequestError("Email non valida, ricontrolla i dati inseriti o contatta il supporto utente.");
    }

    const spendilowUser = await dbManager.databaseInteraction('GET_USER', req.body);

    //Check if user exists
    if (spendilowUser) {
        throw new BadRequestError("Errore nella creazione dell'account, l'email inserita è già associata ad un account.");
    }

    const newAccount = new SpendilowUser({ ...req.body });

    await newAccount.hashPassword();

    const token = newAccount.JWTGeneration();

    const createdUser = await dbManager.databaseInteraction('CREATE_USER', newAccount);

    if (!createdUser) {
        throw new BadRequestError("Errore nella creazione dell'account, i dati non sono validi, ricontrollali o contatta il supporto utente.")
    }

    res.status(StatusCodes.CREATED).cookie("jwt", token, { httpOnly: true, }).json({ account: newAccount.email });
}

// ------ LOGIN USER ------
const loginUser = async (req: Request, res: Response) => {

    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError("Email o password non validi");
    }

    const spendilowUser = new SpendilowUser(await dbManager.databaseInteraction('GET_USER', req.body));

    if (!spendilowUser) {
        throw new UnauthenticatedError("L'indirizzo email fornito è errato.");
    }

    const isPasswordCorrect: boolean = spendilowUser.pwdCheck(password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("La password fornita è errata.");
    }

    const token = spendilowUser.JWTGeneration();

    res.status(StatusCodes.OK).cookie("jwt", token, { httpOnly: true }).json({ id: spendilowUser.id, email: spendilowUser.email })
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