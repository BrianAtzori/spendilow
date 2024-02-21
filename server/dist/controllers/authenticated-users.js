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
const http_status_codes_1 = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const dbManager = require("../db/db-manager");
// ------ MODIFY USER ------
const modifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        throw new BadRequestError("Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente.");
    }
    if (!req.user.id) {
        throw new BadRequestError("L'utente che si sta cercando di modificare non esiste o l'ID é errato, contatta il supporto utente.");
    }
    //For Email Duplication
    let existingSpendilowUser = yield dbManager.databaseInteraction("GET_USER", req.body);
    //Check if user exists with that email
    if (existingSpendilowUser && existingSpendilowUser.id != req.user.id) {
        throw new BadRequestError("L'email che si sta inserendo é giá utilizzata da un altro account e non puó essere usata per modificare quella dell'account in uso.");
    }
    //For Account Editing
    existingSpendilowUser = yield dbManager.databaseInteraction("GET_USER_BY_ID", req.user.id);
    if (!existingSpendilowUser) {
        throw new BadRequestError("L'utente che si sta cercando di modificare non esiste e non corrisponde ad un account registrato, contatta il supporto utente.");
    }
    const modifiedUser = yield dbManager.databaseInteraction("UPDATE_USER", req.body, existingSpendilowUser.id);
    res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json();
});
// ------ DELETE USER ------
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    if (!userId) {
        throw new BadRequestError("L'utente che si sta cercando di eliminare non esiste e non corrisponde ad un account registrato, contatta il supporto utente.");
    }
    const existingSpendilowUser = yield dbManager.databaseInteraction("GET_USER_BY_ID", userId);
    if (!existingSpendilowUser) {
        throw new BadRequestError("L'utente che si sta cercando di eliminare non esiste e non corrisponde ad un account registrato, contatta il supporto utente.");
    }
    dbManager.databaseInteraction("DELETE_USER", userId);
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ message: "Utente eliminato correttamente!" });
});
// ------ GET USER PROFILE ------
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requestId = req.user.id;
    if (!requestId) {
        throw new BadRequestError("Il profilo cercato non esiste e non corrisponde ad un account registrato, contatta il supporto utente.");
    }
    const userProfile = yield dbManager.databaseInteraction("GET_USER_BY_ID", requestId);
    if (!userProfile) {
        throw new BadRequestError("L'utente che si sta cercando non esiste e non corrisponde ad un account registrato, contatta il supporto utente.");
    }
    const { id, email, isMFAActive, savings, salary, profileimage, workfield, username, } = userProfile;
    res.status(http_status_codes_1.StatusCodes.OK).json({
        id,
        email,
        isMFAActive,
        savings,
        salary,
        profileimage,
        workfield,
        username,
    });
});
// ------ LOGOUT USER PROFILE ------
const logoutUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user.id) {
        throw new BadRequestError("L'account da cui si sta cercando di fare il logout non esiste o l'ID é errato, contatta il supporto utente.");
    }
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .clearCookie("spendilow-refresh-token")
        .clearCookie("spendilow-access-token")
        .json({ "logged-out": true });
});
// ------ Exports ------
module.exports = {
    modifyUser,
    deleteUser,
    getUserProfile,
    logoutUserProfile,
};
