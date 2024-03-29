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
        throw new UnauthenticatedError("L'utente che si sta cercando di modificare non esiste o l'ID é errato, contatta il supporto utente.");
    }
    //For Email Duplication
    let databaseOperationResult = yield dbManager.databaseInteraction("GET_USER", req.body);
    //Check if user exists with that email
    if (databaseOperationResult.successState &&
        databaseOperationResult.payload.length > 0) {
        if (databaseOperationResult.payload[0].id != req.user.id) {
            throw new BadRequestError("L'email che si sta inserendo é giá utilizzata da un altro account e non puó essere usata per modificare quella dell'account in uso.");
        }
    }
    //For Account Editing
    const { successState, payload } = yield dbManager.databaseInteraction("GET_USER_BY_ID", req.user.id);
    if (!successState) {
        throw new BadRequestError("Qualcosa é andato storto durante la modifica, oppure l'utente che si sta cercando di modificare non esiste e non corrisponde ad un account registrato, contatta il supporto utente.");
    }
    const userUpdateResult = yield dbManager.databaseInteraction("UPDATE_USER", req.body, payload[0].id);
    if (userUpdateResult.successState) {
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json();
    }
    else {
        throw new BadRequestError(`La modifica dell'utente non é andata a buon fine, riprova oppure contatta il supporto comunicando questo errore: ${userUpdateResult.payload}`);
    }
});
// ------ DELETE USER ------
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user.id) {
        throw new UnauthenticatedError("L'utente che si sta cercando di eliminare non esiste e non corrisponde ad un account registrato, contatta il supporto utente.");
    }
    const { successState } = yield dbManager.databaseInteraction("GET_USER_BY_ID", req.user.id);
    if (!successState) {
        throw new BadRequestError("L'utente che si sta cercando di eliminare non esiste e non corrisponde ad un account registrato, contatta il supporto utente.");
    }
    // First you delete every transaction for that user
    const deleteUserTransactions = yield dbManager.databaseInteraction("DELETE_USER_TRANSACTIONS", req.user.id);
    if (!deleteUserTransactions.successState) {
        throw new BadRequestError("Qualcosa é andato storto durante l'eliminazione dei dati dell'utente e quindi non é stato possibile eliminare il suo profilo.");
    }
    const databaseOperationResult = yield dbManager.databaseInteraction("DELETE_USER", req.user.id);
    if (databaseOperationResult.successState) {
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .clearCookie("spendilow-refresh-token")
            .clearCookie("spendilow-access-token")
            .json({ success: true, message: "Utente eliminato correttamente!" });
    }
    else {
        throw new Error("L'eliminazione dell'utente non é andata a buon fine, riprova oppure contatta il supporto.");
    }
});
// ------ GET USER PROFILE ------
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user.id) {
        throw new UnauthenticatedError("Il profilo cercato non esiste e non corrisponde ad un account registrato, contatta il supporto utente.");
    }
    const { successState, payload } = yield dbManager.databaseInteraction("GET_USER_BY_ID", req.user.id);
    if (payload.length === 0) {
        throw new BadRequestError(`L'utente che si sta cercando non esiste e non corrisponde ad un account registrato, contatta il supporto utente.`);
    }
    const { id, email, isMFAActive, savings, salary, profileimage, workfield, username, } = payload[0];
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
        throw new UnauthenticatedError("L'account da cui si sta cercando di fare il logout non esiste o l'ID é errato, contatta il supporto utente.");
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
