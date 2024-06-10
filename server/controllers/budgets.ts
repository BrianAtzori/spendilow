import { Response } from "express"; //TS Import
import { StatusCodes } from "http-status-codes";
const { BadRequestError, UnauthenticatedError } = require("../errors");
const dbManager = require("../db/db-manager");
import crypto from "crypto";
import { SpendilowTransaction } from "../classes/transaction";

// ------ CREATE BUDGET ------
const createBudget = async (req: any, res: Response) => {
  if (!req.body) {
    throw new BadRequestError(
      "Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente."
    );
  }

  if (!req.user.id) {
    throw new BadRequestError(
      "L'utente con cui si sta cercando di creare un nuovo budget non esiste o l'ID é errato, contatta il supporto utente."
    );
  }

  let newBudgetId: string = crypto.randomUUID();

  let newSpendilowBudget = {
    id: newBudgetId,
    ...req.body,
    user_id: req.user.id,
  };

  const { successState, payload } = await dbManager.databaseInteraction(
    "CREATE_BUDGET",
    newSpendilowBudget
  );

  if (!successState) {
    throw new BadRequestError(
      `La creazione del budget non é andata a buon fine, riprova oppure contatta il supporto comunicando questo errore: ${payload}`
    );
  }

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Nuovo budget aggiunto!",
  });
};

// ------ GET ALL BUDGETS ------
const getAllBudgets = async (req: any, res: Response) => {
  if (!req.user.id) {
    throw new UnauthenticatedError(
      "L'utente di cui si sta cercando di ottenere i budget non esiste o l'ID é errato, contatta il supporto utente."
    );
  }

  const { successState, payload } = await dbManager.databaseInteraction(
    "GET_ALL_BUDGETS",
    req.user.id
  );

  if (successState) {
    for (let i = 0; i < payload.length; i++) {
      let total = 0;

      const dbInteractionResponse = await dbManager.databaseInteraction(
        "GET_BUDGET_TRANSACTIONS",
        { budgetId: payload[i].id, spendilowUserId: req.user.id }
      );

      if (dbInteractionResponse.successState) {
        dbInteractionResponse.payload.map(
          (transaction: SpendilowTransaction) => {
            total += Number(transaction.amount);
          }
        );
      }

      payload[i] = { ...payload[i], total };
    }

    res.status(StatusCodes.OK).json({ budgets: payload });
  } else {
    throw new Error(
      `La lettura dei budget non é andata a buon fine, riprova oppure contatta il supporto comunicando questo errore: ${payload}`
    );
  }
};

// ------ GET SINGLE BUDGET ------
const getSingleBudget = async (req: any, res: Response) => {
  if (!req.params.id) {
    throw new BadRequestError(
      "Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente."
    );
  }

  if (!req.user.id) {
    throw new UnauthenticatedError(
      "Non posso cercare il budget per questo utente perché l'ID é errato, contatta il supporto utente."
    );
  }

  const { successState, payload } = await dbManager.databaseInteraction(
    "GET_SINGLE_BUDGET",
    { budgetId: req.params.id, spendilowUserId: req.user.id }
  );

  const dbInteractionResponse = await dbManager.databaseInteraction(
    "GET_BUDGET_TRANSACTIONS",
    { budgetId: req.params.id, spendilowUserId: req.user.id }
  );

  if (successState && dbInteractionResponse.successState) {
    let total = 0;

    dbInteractionResponse.payload.map((transaction: SpendilowTransaction) => {
      total += Number(transaction.amount);
    });

    payload[0] = { ...payload[0], total };

    res.status(StatusCodes.OK).json({
      budget: payload[0],
      transactions: dbInteractionResponse.payload,
    });
  } else {
    throw new BadRequestError(
      `La lettura del budget non é andata a buon fine, riprova oppure contatta il supporto comunicando questo errore: Errore`
    );
  }
};

// ------ DELETE SINGLE BUDGET ------
const deleteSingleBudget = async (req: any, res: Response) => {
  if (!req.params.id) {
    throw new BadRequestError(
      "Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente."
    );
  }

  if (!req.user.id) {
    throw new UnauthenticatedError(
      "Non posso eliminare il budget per questo utente perché l'ID é errato, contatta il supporto utente."
    );
  }

  const transactionBudgetRemoveResult = await dbManager.databaseInteraction(
    "DELETE_BUDGET_FROM_TRANSACTIONS",
    {
      budgetId: req.params.id,
      spendilowUserId: req.user.id,
    }
  );

  if (transactionBudgetRemoveResult.successState) {
    const databaseOperationResult = await dbManager.databaseInteraction(
      "DELETE_BUDGET",
      {
        budgetId: req.params.id,
        spendilowUserId: req.user.id,
      }
    );

    if (databaseOperationResult.successState) {
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: "Budget eliminata correttamente!" });
    } else {
      throw new BadRequestError(
        `L'eliminazione del budget non é andata a buon fine, riprova oppure contatta il supporto con questo errore: ${databaseOperationResult.payload}`
      );
    }
  } else {
    throw new BadRequestError(
      `L'eliminazione del budget non é andata a buon fine, riprova oppure contatta il supporto con questo errore: ${transactionBudgetRemoveResult.payload}`
    );
  }
};

// ------ UPDATE SINGLE BUDGET ------
const updateSingleBudget = async (req: any, res: Response) => {
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
      "L'utente con cui si sta cercando di modificare un budget non esiste o l'ID é errato, contatta il supporto utente."
    );
  }

  const { successState, payload } = await dbManager.databaseInteraction(
    "UPDATE_BUDGET",
    {
      budgetId: req.params.id,
      spendilowUserId: req.user.id,
      spendilowBudgetMod: req.body,
    }
  );

  if (!successState) {
    throw new BadRequestError(
      `La modifica del budget non é andata a buon fine, riprova oppure contatta il supporto comunicando questo errore: ${payload}`
    );
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Budget modificato correttamente!",
  });
};

module.exports = {
  createBudget,
  getAllBudgets,
  getSingleBudget,
  deleteSingleBudget,
  updateSingleBudget,
};
