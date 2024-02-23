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
    const { payload } = yield dbManager.databaseInteraction("GET_USER", req.body);
    //Check if user exists
    if (payload.length != 0) {
        throw new BadRequestError("Errore nella creazione dell'account, l'email inserita è già associata ad un account.");
    }
    let id = crypto_1.default.randomUUID();
    const newAccount = new SpendilowUser(Object.assign({ id }, req.body));
    yield newAccount.hashPassword();
    const refreshToken = newAccount.JWTGeneration("refresh");
    const accessToken = newAccount.JWTGeneration("access");
    const { successState } = yield dbManager.databaseInteraction("CREATE_USER", newAccount);
    if (successState) {
        res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .cookie("spendilow-refresh-token", refreshToken, {
            httpOnly: true,
            maxAge: 518400000,
            sameSite: "none",
            secure: true,
        })
            .cookie("spendilow-access-token", accessToken, {
            httpOnly: true,
            maxAge: 21600000,
            sameSite: "none",
            secure: true,
        })
            .json({ id: newAccount.id, account: newAccount.email });
    }
    else {
        throw new BadRequestError("Errore nella creazione dell'account, i dati non sono validi, ricontrollali o contatta il supporto utente.");
    }
});
// ------ LOGIN USER ------
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Email o password non validi");
    }
    const { successState, payload } = yield dbManager.databaseInteraction("GET_USER", req.body);
    if (successState && payload.length === 0) {
        throw new UnauthenticatedError("L'indirizzo email fornito non è associato ad alcun account.");
    }
    const spendilowUser = new SpendilowUser(...payload);
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
        sameSite: "none",
        secure: true,
    })
        .cookie("spendilow-access-token", accessToken, {
        httpOnly: true,
        maxAge: 21600000,
        sameSite: "none",
        secure: true,
    })
        .json({
        id: spendilowUser.id,
        email: spendilowUser.email,
        toBeVerified: spendilowUser.isMFAActive,
    });
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
// ------ Exports ------
module.exports = {
    registerUser,
    loginUser,
    activateMFA,
    verifyMFA,
};
