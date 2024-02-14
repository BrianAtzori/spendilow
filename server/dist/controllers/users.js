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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SpendilowUser = require("../classes/spendilow-user");
const http_status_codes_1 = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const dbManager = require("../db/db-manager");
const qrCodeGenerator = require("../ts-utilities/generate_qr_code");
const speakeasy = require("speakeasy");
const jwt = require("jsonwebtoken");
const crypto_1 = __importDefault(require("crypto"));
// ------ REGISTER USER ------
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        throw new BadRequestError("Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente.");
    }
    const { email } = req.body;
    if (!email) {
        throw new BadRequestError("Email non valida, ricontrolla i dati inseriti o contatta il supporto utente.");
    }
    const spendilowUser = yield dbManager.databaseInteraction("GET_USER", req.body);
    //Check if user exists
    if (spendilowUser) {
        throw new BadRequestError("Errore nella creazione dell'account, l'email inserita è già associata ad un account.");
    }
    let id = crypto_1.default.randomUUID();
    const newAccount = new SpendilowUser(Object.assign({ id }, req.body));
    yield newAccount.hashPassword();
    const refreshToken = newAccount.JWTGeneration("refresh");
    const accessToken = newAccount.JWTGeneration("access");
    const createdUser = yield dbManager.databaseInteraction("CREATE_USER", newAccount);
    if (!createdUser) {
        throw new BadRequestError("Errore nella creazione dell'account, i dati non sono validi, ricontrollali o contatta il supporto utente.");
    }
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .cookie("spendilow-refresh-token", refreshToken, {
        httpOnly: true,
        maxAge: 518400000,
    })
        .cookie("spendilow-access-token", accessToken, {
        httpOnly: true,
        maxAge: 21600000,
    })
        .json({ id: newAccount.id, account: newAccount.email });
});
// ------ LOGIN USER ------
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Email o password non validi");
    }
    const retrievedUser = yield dbManager.databaseInteraction("GET_USER", req.body);
    if (!retrievedUser) {
        throw new UnauthenticatedError("L'indirizzo email fornito non è associato ad alcun account.");
    }
    const spendilowUser = new SpendilowUser(retrievedUser);
    const isPasswordCorrect = yield spendilowUser.pwdCheck(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("La password fornita è errata.");
    }
    const refreshToken = spendilowUser.JWTGeneration("refresh");
    const accessToken = spendilowUser.JWTGeneration("access");
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .cookie("spendilow-refresh-token", refreshToken, {
        httpOnly: true,
        maxAge: 518400000,
    })
        .cookie("spendilow-access-token", accessToken, {
        httpOnly: true,
        maxAge: 21600000,
    })
        .json({
        id: spendilowUser.id,
        email: spendilowUser.email,
        toBeVerified: spendilowUser.isMFAActive,
    });
});
// ------ MODIFY USER ------
const modifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        throw new BadRequestError("Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente.");
    }
    if (!req.params.id) {
        throw new BadRequestError("L'utente che si sta cercando di modificare non esiste o l'ID é errato, contatta il supporto utente.");
    }
    const existingSpendilowUser = yield dbManager.databaseInteraction("GET_USER_BY_ID", req.params.id);
    if (!existingSpendilowUser) {
        throw new BadRequestError("L'utente che si sta cercando di modificare non esiste e non corrisponde ad un account registrato, contatta il supporto utente.");
    }
    const modifiedUser = yield dbManager.databaseInteraction("UPDATE_USER", req.body, existingSpendilowUser.id);
    res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json();
});
// ------ DELETE USER ------
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    if (!userId) {
        throw new BadRequestError("L'utente che si sta cercando di eliminare non esiste e non corrisponde ad un account registrato, contatta il supporto utente.");
    }
    const existingSpendilowUser = yield dbManager.databaseInteraction("GET_USER_BY_ID", req.params.id);
    if (!existingSpendilowUser) {
        throw new BadRequestError("L'utente che si sta cercando di eliminare non esiste e non corrisponde ad un account registrato, contatta il supporto utente.");
    }
    dbManager.databaseInteraction("DELETE_USER", userId);
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ message: "Utente eliminato correttamente!" });
});
// ------ ACTIVATE MFA FOR USER ------
const activateMFA = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let qrForUser = yield qrCodeGenerator();
    res.status(http_status_codes_1.StatusCodes.OK).json(qrForUser);
});
// ------ VERIFY MFA FOR USER ------
const verifyMFA = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
    const verified = speakeasy.totp.verify({
        secret: process.env.MFA_SEC,
        encoding: "base32",
        token: otp,
    });
    if (verified) {
        res.status(http_status_codes_1.StatusCodes.OK).json({ verified });
    }
    else {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ verified });
    }
});
// ------ REFRESH USER TOKENS ------
const refreshUserTokens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies["spendilow-refresh-token"];
    if (!refreshToken) {
        throw new UnauthenticatedError("I token di autenticazione forniti non sono validi, accesso negato.");
    }
    try {
        const decodedData = jwt.verify(refreshToken, process.env.JW_SEC);
        const accessToken = jwt.sign({ id: decodedData.id, email: decodedData.email }, process.env.JW_SEC, { expiresIn: process.env.WT_LIFE });
        res
            .cookie("spendilow-access-token", accessToken, {
            httpOnly: true,
            maxAge: 21600000,
        })
            .json({ id: decodedData.id, email: decodedData.email });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({ token: "Invalid" });
    }
});
// ------ Exports ------
module.exports = {
    registerUser,
    loginUser,
    modifyUser,
    deleteUser,
    activateMFA,
    verifyMFA,
    refreshUserTokens,
};
