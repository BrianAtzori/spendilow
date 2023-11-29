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
const SpendilowUser = require("../classes/spendilow-user");
const http_status_codes_1 = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const dbManager = require("../db/db-manager");
const qrCodeGenerator = require("../ts-utilities/generate_qr_code");
const speakeasy = require("speakeasy");
const jwt = require("jsonwebtoken");
// ------ REGISTER USER ------
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        throw new BadRequestError("Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente.");
    }
    const { email } = req.body;
    if (!email) {
        throw new BadRequestError("Email non valida, ricontrolla i dati inseriti o contatta il supporto utente.");
    }
    const spendilowUser = yield dbManager.databaseInteraction('GET_USER', req.body);
    //Check if user exists
    if (spendilowUser) {
        throw new BadRequestError("Errore nella creazione dell'account, l'email inserita è già associata ad un account.");
    }
    const newAccount = new SpendilowUser(Object.assign({}, req.body));
    yield newAccount.hashPassword();
    const refreshToken = newAccount.JWTGeneration('refresh');
    const accessToken = newAccount.JWTGeneration('access');
    const createdUser = yield dbManager.databaseInteraction('CREATE_USER', newAccount);
    if (!createdUser) {
        throw new BadRequestError("Errore nella creazione dell'account, i dati non sono validi, ricontrollali o contatta il supporto utente.");
    }
    res.
        status(http_status_codes_1.StatusCodes.CREATED).
        cookie("spendilow-refresh-token", refreshToken, { httpOnly: true, }).
        header('Authorization', accessToken).
        json({ id: newAccount.id, account: newAccount.email });
});
// ------ LOGIN USER ------
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Email o password non validi");
    }
    const retrievedUser = yield dbManager.databaseInteraction('GET_USER', req.body);
    if (!retrievedUser) {
        throw new UnauthenticatedError("L'indirizzo email fornito non è associato ad alcun account.");
    }
    const spendilowUser = new SpendilowUser(retrievedUser);
    const isPasswordCorrect = spendilowUser.pwdCheck(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("La password fornita è errata.");
    }
    const refreshToken = spendilowUser.JWTGeneration('refresh');
    const accessToken = spendilowUser.JWTGeneration('access');
    res.status(http_status_codes_1.StatusCodes.OK).
        cookie("spendilow-refresh-token", refreshToken, { httpOnly: true }).
        header("Authorization", accessToken).
        json({ id: spendilowUser.id, email: spendilowUser.email });
});
// ------ MODIFY USER ------
const modifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Mod User");
    res.json("OK");
});
// ------ DELETE USER ------
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    console.log("ID FROM CALL:" + userId);
    dbManager.databaseInteraction('DELETE_USER', userId);
    res.json("OK");
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
    const refreshToken = req.cookies['spendilow-refresh-token'];
    if (!refreshToken) {
        throw new UnauthenticatedError("I token di autenticazione forniti non sono validi, accesso negato.");
    }
    try {
        const decodedData = jwt.verify(refreshToken, process.env.JW_SEC);
        const accessToken = jwt.sign({ id: decodedData.id, email: decodedData.email }, process.env.JW_SEC, { expiresIn: process.env.WT_LIFE });
        res.
            header('Authorization', accessToken)
            .json({ id: decodedData.id, email: decodedData.email });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({ token: "Invalid" });
    }
});
// ------ Exports ------
module.exports = { registerUser, loginUser, modifyUser, deleteUser, activateMFA, verifyMFA, refreshUserTokens };
