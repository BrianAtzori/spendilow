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
    const token = newAccount.JWTGeneration();
    const createdUser = yield dbManager.databaseInteraction('CREATE_USER', newAccount);
    if (!createdUser) {
        throw new BadRequestError("Errore nella creazione dell'account, i dati non sono validi, ricontrollali o contatta il supporto utente.");
    }
    res.status(http_status_codes_1.StatusCodes.CREATED).cookie("jwt", token, { httpOnly: true, }).json({ account: newAccount.email });
});
// ------ LOGIN USER ------
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Email o password non validi");
    }
    const spendilowUser = new SpendilowUser(yield dbManager.databaseInteraction('GET_USER', req.body));
    if (!spendilowUser) {
        throw new UnauthenticatedError("L'indirizzo email fornito è errato.");
    }
    const isPasswordCorrect = spendilowUser.pwdCheck(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("La password fornita è errata.");
    }
    const token = spendilowUser.JWTGeneration();
    res.status(http_status_codes_1.StatusCodes.OK).cookie("jwt", token, { httpOnly: true }).json({ id: spendilowUser.id, email: spendilowUser.email });
});
// ------ MODIFY USER ------
const modifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Mod User");
    res.json("OK");
});
// ------ DELETE USER ------
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Del User");
    res.json("OK");
});
// ------ Exports ------
module.exports = { registerUser, loginUser, modifyUser, deleteUser };
