// ------ Imports ------
import { Request, Response } from "express"; //TS Import
import { StatusCodes } from "http-status-codes";
const { BadRequestError, UnauthenticatedError } = require("../errors");
const dbManager = require("../db/db-manager");
import crypto from "crypto";

// ------ CREATE TRANSACTION ------
const createTransaction = async (req: any, res: Response) => {
  if (!req.body) {
    throw new BadRequestError(
      "Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente."
    );
  }

  if (!req.user.id) {
    throw new BadRequestError(
      "L'utente con cui si sta cercando di creare una transazione non esiste o l'ID é errato, contatta il supporto utente."
    );
  }

  let newTransactionID: string = crypto.randomUUID();

  let { transaction_date, title, notes, tags, transaction_type, target_id } =
    req.body;

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
    .status(StatusCodes.CREATED)
    .json({ message: "Nuova transazione aggiunta!" });
};

// ------ GET ALL TRANSACTIONS ------
const getAllTransactions = async (req: any, res: Response) => {
  if (!req.user.id) {
    throw new BadRequestError(
      "L'utente di cui si sta cercando di ottenere le transazioni non esiste o l'ID é errato, contatta il supporto utente."
    );
  }

  let transactions = await dbManager.databaseInteraction(
    "GET_ALL_TRANSACTIONS",
    req.user.id
  );
  res.status(StatusCodes.OK).json({ transactions });
};

// ------ GET SINGLE TRANSACTION ------
const getSingleTransaction = async (req: any, res: Response) => {
  if (!req.params.id) {
    throw new BadRequestError(
      "Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente."
    );
  }

  if (!req.user.id) {
    throw new BadRequestError(
      "Non posso cercare la transazione per questo utente perché l'ID é errato, contatta il supporto utente."
    );
  }

  let transaction = await dbManager.databaseInteraction(
    "GET_SINGLE_TRANSACTION",
    { transactionId: req.params.id, spendilowUserId: req.user.id }
  );
  res.status(StatusCodes.OK).json({ transaction });
};

// ------ UPDATE SINGLE TRANSACTION ------
const updateSingleTransaction = async (req: any, res: Response) => {
  if (!req.params.id) {
    throw new BadRequestError(
      "Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente."
    );
  }

  if (!req.body) {
    throw new BadRequestError(
      "Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente."
    );
  }

  if (!req.user.id) {
    throw new BadRequestError(
      "L'utente con cui si sta cercando di modificare una transazione non esiste o l'ID é errato, contatta il supporto utente."
    );
  }

  await dbManager.databaseInteraction("UPDATE_TRANSACTION", {
    transactionId: req.params.id,
    spendilowUserId: req.user.id,
    spendilowTransactionMod: req.body,
  });

  res
    .status(StatusCodes.OK)
    .json({ message: "Transazione modificata correttamente!" });
};

// ------ DELETE SINGLE TRANSACTION ------
const deleteSingleTransaction = async (req: any, res: Response) => {
  if (!req.params.id) {
    throw new BadRequestError(
      "Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente."
    );
  }

  if (!req.user.id) {
    throw new BadRequestError(
      "Non posso eliminare la transazione per questo utente perché l'ID é errato, contatta il supporto utente."
    );
  }

  await dbManager.databaseInteraction("DELETE_TRANSACTION", {
    transactionId: req.params.id,
    spendilowUserId: req.user.id,
  });

  res
    .status(StatusCodes.OK)
    .json({ message: "Transazione eliminata correttamente!" });
};

// ------ Exports ------
module.exports = {
  createTransaction,
  getAllTransactions,
  getSingleTransaction,
  updateSingleTransaction,
  deleteSingleTransaction,
};
