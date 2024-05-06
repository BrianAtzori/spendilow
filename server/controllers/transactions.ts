// ------ Imports ------
import { Response } from "express"; //TS Import
import { StatusCodes } from "http-status-codes";
const { BadRequestError, UnauthenticatedError } = require("../errors");
const dbManager = require("../db/db-manager");
import crypto from "crypto";
const SpendilowTransaction = require("../classes/transaction");

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

  //* Transaction ID with target null=user budget
  //* If defined in body target ID, keep that target

  if (req.body.target_id != null) {
    //TODO: check if transaction exist
    req.body.target_id;
  } else {
    //nothing?
  }

  let userID: string = req.user.id;

  let newSpendilowTransaction = new SpendilowTransaction({
    id: newTransactionID,
    user_id: userID,
    ...req.body,
  });

  const { successState, payload } = await dbManager.databaseInteraction(
    "CREATE_TRANSACTION",
    newSpendilowTransaction
  );

  if (!successState) {
    throw new BadRequestError(
      `L'aggiunta della transazione non é andata a buon fine, riprova oppure contatta il supporto comunicando questo errore: ${payload}`
    );
  }

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Nuova transazione aggiunta!",
  });
};

// ------ GET ALL TRANSACTIONS ------
const getAllTransactions = async (req: any, res: Response) => {
  if (!req.user.id) {
    throw new UnauthenticatedError(
      "L'utente di cui si sta cercando di ottenere le transazioni non esiste o l'ID é errato, contatta il supporto utente."
    );
  }

  const { successState, payload } = await dbManager.databaseInteraction(
    "GET_ALL_TRANSACTIONS",
    req.user.id
  );

  if (successState) {
    res.status(StatusCodes.OK).json({ transactions: payload });
  } else {
    throw new Error(
      `La lettura delle transazioni non é andata a buon fine, riprova oppure contatta il supporto comunicando questo errore: ${payload}`
    );
  }
};

// ------ GET SINGLE TRANSACTION ------
const getSingleTransaction = async (req: any, res: Response) => {
  if (!req.params.id) {
    throw new BadRequestError(
      "Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente."
    );
  }

  if (!req.user.id) {
    throw new UnauthenticatedError(
      "Non posso cercare la transazione per questo utente perché l'ID é errato, contatta il supporto utente."
    );
  }

  const { successState, payload } = await dbManager.databaseInteraction(
    "GET_SINGLE_TRANSACTION",
    { transactionId: req.params.id, spendilowUserId: req.user.id }
  );

  if (successState) {
    res.status(StatusCodes.OK).json({ transaction: payload[0] });
  } else {
    throw new BadRequestError(
      `La lettura della transaziona non é andata a buon fine, riprova oppure contatta il supporto comunicando questo errore: ${payload}`
    );
  }
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
    throw new UnauthenticatedError(
      "L'utente con cui si sta cercando di modificare una transazione non esiste o l'ID é errato, contatta il supporto utente."
    );
  }

  const { successState, payload } = await dbManager.databaseInteraction(
    "UPDATE_TRANSACTION",
    {
      transactionId: req.params.id,
      spendilowUserId: req.user.id,
      spendilowTransactionMod: req.body,
    }
  );

  if (!successState) {
    throw new BadRequestError(
      `La modifica della transazione non é andata a buon fine, riprova oppure contatta il supporto comunicando questo errore: ${payload}`
    );
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Transazione modificata correttamente!",
  });
};

// ------ DELETE SINGLE TRANSACTION ------
const deleteSingleTransaction = async (req: any, res: Response) => {
  if (!req.params.id) {
    throw new BadRequestError(
      "Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente."
    );
  }

  if (!req.user.id) {
    throw new UnauthenticatedError(
      "Non posso eliminare la transazione per questo utente perché l'ID é errato, contatta il supporto utente."
    );
  }

  const databaseOperationResult = await dbManager.databaseInteraction(
    "DELETE_TRANSACTION",
    {
      transactionId: req.params.id,
      spendilowUserId: req.user.id,
    }
  );

  if (databaseOperationResult.successState) {
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Transazione eliminata correttamente!" });
  } else {
    throw new BadRequestError(
      `L'eliminazione della transazione non é andata a buon fine, riprova oppure contatta il supporto.`
    );
  }
};

// ------ BULK TRANSACTIONS CREATION ------
const bulkDataCreation = async (req: any, res: any) => {
  let howMany: number = 10;
  let userId = req.user.id;

  for (let i = 0; howMany >= i; i++) {
    // ------ Random UUID ------

    let newTransactionID: string = crypto.randomUUID();
    let randomTargetID: string = crypto.randomUUID();

    // ------ Random Type ------
    const transactionTypeArray = ["Income", "Expense", "Budget"];

    let randomNumber = Math.floor(Math.random() * transactionTypeArray.length);

    let transaction_type = transactionTypeArray[randomNumber];

    // ------ Random Date ------
    const dates = [
      "2024-02-06",
      "2024-02-05",
      "2024-02-01",
      "2024-01-28",
      "2024-01-27",
      "2023-12-20",
      "2023-12-18",
      "2023-11-14",
      "2023-11-13",
      "2023-11-05",
      "2022-11-15",
      "2022-10-30",
      "2022-10-29",
      "2022-10-13",
      "2022-10-08",
      "2021-07-23",
      "2021-07-19",
      "2021-06-02",
      "2021-05-09",
      "2020-06-15",
    ];

    let randomDate = Math.floor(Math.random() * dates.length);

    let transaction_date = dates[randomDate];

    await dbManager.databaseInteraction("CREATE_TRANSACTION", {
      id: newTransactionID,
      user_id: userId,
      amount: 10.8,
      transaction_date,
      title: `Fake transaction #${i + 1}`,
      notes: `For the user ${userId}`,
      tags: "FakeTag1;FakeTag2;",
      transaction_type,
      target_id: randomTargetID,
    });
  }

  res.status(StatusCodes.CREATED).json({ message: "OK" });
};

// ------ Exports ------
module.exports = {
  createTransaction,
  getAllTransactions,
  getSingleTransaction,
  updateSingleTransaction,
  deleteSingleTransaction,
  bulkDataCreation,
};
