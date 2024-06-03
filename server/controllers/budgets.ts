// ------ Imports ------
import { Response } from "express"; //TS Import
import { StatusCodes } from "http-status-codes";
const { BadRequestError, UnauthenticatedError } = require("../errors");
const dbManager = require("../db/db-manager");
import crypto from "crypto";

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

// ------ BULK TRANSACTIONS CREATION ------
// const bulkDataCreation = async (req: any, res: any) => {
//   let howMany: number = 10;
//   let userId = req.user.id;

//   for (let i = 0; howMany >= i; i++) {
//     // ------ Random UUID ------

//     let newTransactionID: string = crypto.randomUUID();
//     let randomTargetID: string = crypto.randomUUID();

//     // ------ Random Type ------
//     const transactionTypeArray = ["Income", "Expense", "Budget"];

//     let randomNumber = Math.floor(Math.random() * transactionTypeArray.length);

//     let transaction_type = transactionTypeArray[randomNumber];

//     // ------ Random Date ------
//     const dates = [
//       "2024-02-06",
//       "2024-02-05",
//       "2024-02-01",
//       "2024-01-28",
//       "2024-01-27",
//       "2023-12-20",
//       "2023-12-18",
//       "2023-11-14",
//       "2023-11-13",
//       "2023-11-05",
//       "2022-11-15",
//       "2022-10-30",
//       "2022-10-29",
//       "2022-10-13",
//       "2022-10-08",
//       "2021-07-23",
//       "2021-07-19",
//       "2021-06-02",
//       "2021-05-09",
//       "2020-06-15",
//     ];

//     let randomDate = Math.floor(Math.random() * dates.length);

//     let transaction_date = dates[randomDate];

//     await dbManager.databaseInteraction("CREATE_TRANSACTION", {
//       id: newTransactionID,
//       user_id: userId,
//       amount: 10.8,
//       transaction_date,
//       title: `Fake transaction #${i + 1}`,
//       notes: `For the user ${userId}`,
//       tags: "FakeTag1;FakeTag2;",
//       transaction_type,
//       target_id: randomTargetID,
//     });
//   }

//   res.status(StatusCodes.CREATED).json({ message: "OK" });
// };

// ------ Exports ------
module.exports = {
  createBudget,
  getAllBudgets,
  getSingleBudget,
  deleteSingleBudget,
  updateSingleBudget,
  //   bulkDataCreation,
};
