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
const http_status_codes_1 = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const dbManager = require("../db/db-manager");
const crypto_1 = __importDefault(require("crypto"));
// ------ CREATE TRANSACTION ------
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body) {
        throw new BadRequestError("Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente.");
    }
    if (!req.user.id) {
        throw new BadRequestError("L'utente con cui si sta cercando di creare una transazione non esiste o l'ID é errato, contatta il supporto utente.");
    }
    let newTransactionID = crypto_1.default.randomUUID();
    let { transaction_date, title, notes, tags, transaction_type, target_id } = req.body;
    dbManager.databaseInteraction("CREATE_TRANSACTION", {
        id: newTransactionID,
        user_id: req.user.id,
        transaction_date,
        title,
        notes,
        tags,
        transaction_type,
        target_id,
    });
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ message: "Nuova transazione aggiunta!" });
});
// ------ GET ALL TRANSACTIONS ------
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user.id) {
        throw new BadRequestError("L'utente di cui si sta cercando di ottenere le transazioni non esiste o l'ID é errato, contatta il supporto utente.");
    }
    let transactions = yield dbManager.databaseInteraction("GET_ALL_TRANSACTIONS", req.user.id);
    res.status(http_status_codes_1.StatusCodes.OK).json({ transactions });
});
// ------ GET SINGLE TRANSACTION ------
const getSingleTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        throw new BadRequestError("Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente.");
    }
    if (!req.user.id) {
        throw new BadRequestError("Non posso cercare la transazione per questo utente perché l'ID é errato, contatta il supporto utente.");
    }
    let transaction = yield dbManager.databaseInteraction("GET_SINGLE_TRANSACTION", { transactionId: req.params.id, spendilowUserId: req.user.id });
    res.status(http_status_codes_1.StatusCodes.OK).json({ transaction });
});
// ------ UPDATE SINGLE TRANSACTION ------
const updateSingleTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        throw new BadRequestError("Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente.");
    }
    if (!req.body) {
        throw new BadRequestError("Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente.");
    }
    if (!req.user.id) {
        throw new BadRequestError("L'utente con cui si sta cercando di modificare una transazione non esiste o l'ID é errato, contatta il supporto utente.");
    }
    yield dbManager.databaseInteraction("UPDATE_TRANSACTION", {
        transactionId: req.params.id,
        spendilowUserId: req.user.id,
        spendilowTransactionMod: req.body,
    });
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ message: "Transazione modificata correttamente!" });
});
// ------ DELETE SINGLE TRANSACTION ------
const deleteSingleTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        throw new BadRequestError("Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente.");
    }
    if (!req.user.id) {
        throw new BadRequestError("Non posso eliminare la transazione per questo utente perché l'ID é errato, contatta il supporto utente.");
    }
    yield dbManager.databaseInteraction("DELETE_TRANSACTION", {
        transactionId: req.params.id,
        spendilowUserId: req.user.id,
    });
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ message: "Transazione eliminata correttamente!" });
});
// ------ Exports ------
module.exports = {
    createTransaction,
    getAllTransactions,
    getSingleTransaction,
    updateSingleTransaction,
    deleteSingleTransaction,
};
