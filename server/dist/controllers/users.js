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
        throw new BadRequestError("Richiesta non effetuata correttamente, ricontrolla i dati inseriti.");
    }
    const newAccount = new SpendilowUser(Object.assign({}, req.body));
    yield newAccount.hashPassword();
    const token = newAccount.JWTGeneration();
    yield dbManager.databaseInteraction('CREATE_USER', newAccount);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ account: newAccount.email, token });
});
// ------ LOGIN USER ------
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Email o password non validi");
    }
    const spendilowUser = yield dbManager.databaseInteraction('GET_USER', req.body);
    console.log(spendilowUser);
    if (!spendilowUser) {
        throw new UnauthenticatedError("L'indirizzo email fornito è errato.");
    }
    const isPasswordCorrect = spendilowUser.pwdCheck(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("La password fornita è errata.");
    }
    const token = SpendilowUser.JWTGeneration();
    res.status(http_status_codes_1.StatusCodes.OK).json({ id: spendilowUser.id, email: spendilowUser.email, token });
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
