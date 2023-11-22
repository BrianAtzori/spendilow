// ------ Imports ------
import { Request, Response, } from 'express' //TS Import
const SpendilowUser = require("../classes/spendilow-user")
import { StatusCodes } from "http-status-codes"
const { BadRequestError, UnauthenticatedError } = require("../errors");
const dbManager = require("../db/db-manager");
const qrCodeGenerator = require("../ts-utilities/generate_qr_code")
const speakeasy = require("speakeasy");

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

    const refreshToken = newAccount.JWTGeneration();
    const accessToken = newAccount.JWTGeneration();

    const createdUser = await dbManager.databaseInteraction('CREATE_USER', newAccount);

    if (!createdUser) {
        throw new BadRequestError("Errore nella creazione dell'account, i dati non sono validi, ricontrollali o contatta il supporto utente.")
    }

    res.
        status(StatusCodes.CREATED).
        cookie("spendilow-refresh-token", refreshToken, { httpOnly: true, }).
        header('Authorization', accessToken).
        json({ id: newAccount.id, account: newAccount.email });
}

// ------ LOGIN USER ------
const loginUser = async (req: Request, res: Response) => {

    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError("Email o password non validi");
    }

    const retrievedUser = await dbManager.databaseInteraction('GET_USER', req.body);

    if (!retrievedUser) {
        throw new UnauthenticatedError("L'indirizzo email fornito non è associato ad alcun account.");
    }

    const spendilowUser = new SpendilowUser(retrievedUser);

    const isPasswordCorrect: boolean = spendilowUser.pwdCheck(password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("La password fornita è errata.");
    }

    const refreshToken = spendilowUser.JWTGeneration();
    const accessToken = spendilowUser.JWTGeneration();

    res.status(StatusCodes.OK).
        cookie("jwt", refreshToken, { httpOnly: true }).
        header("Authorization", accessToken).
        json({ id: spendilowUser.id, email: spendilowUser.email })
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

// ------ ACTIVATE MFA FOR USER ------
const activateMFA = async (req: Request, res: Response) => {
    let qrForUser: string = await qrCodeGenerator();
    res.status(StatusCodes.OK).json(qrForUser);
}

// ------ VERIFY MFA FOR USER ------
const verifyMFA = async (req: Request, res: Response) => {
    const { otp } = req.body;
    const verified: boolean = speakeasy.totp.verify({
        secret: process.env.MFA_SEC,
        encoding: "base32",
        token: otp,
    });
    if (verified) {
        res.status(StatusCodes.OK).json({ verified })
    }
    else {
        res.status(StatusCodes.UNAUTHORIZED).json({ verified })
    }
}

const refreshUserTokens = async (req: Request, res: Response) => {
    const refreshToken = req.cookies["spendilow-refresh-token"];
    if (!refreshToken) {
        throw new UnauthenticatedError("I token di autenticazione forniti non sono validi, accesso negato.")
    }
    
}

// ------ Exports ------
module.exports = { registerUser, loginUser, modifyUser, deleteUser, activateMFA, verifyMFA, refreshUserTokens }