// ------ Imports ------
import { Request, Response } from "express"; //TS Import
import { StatusCodes } from "http-status-codes";
const { BadRequestError, UnauthenticatedError } = require("../errors");
const dbManager = require("../db/db-manager");

// ------ MODIFY USER ------
const modifyUser = async (req: Request, res: Response) => {
  if (!req.body) {
    throw new BadRequestError(
      "Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente."
    );
  }

  if (!req.params.id) {
    throw new BadRequestError(
      "L'utente che si sta cercando di modificare non esiste o l'ID é errato, contatta il supporto utente."
    );
  }

  //For Email Duplication
  let existingSpendilowUser = await dbManager.databaseInteraction(
    "GET_USER",
    req.body
  );

  //Check if user exists
  if (existingSpendilowUser) {
    throw new BadRequestError(
      "L'email che si sta inserendo é giá utilizzata da un altro account e non puó essere usata per modificare quella dell'account in uso."
    );
  }
  //For Account Editing
  existingSpendilowUser = await dbManager.databaseInteraction(
    "GET_USER_BY_ID",
    req.params.id
  );

  if (!existingSpendilowUser) {
    throw new BadRequestError(
      "L'utente che si sta cercando di modificare non esiste e non corrisponde ad un account registrato, contatta il supporto utente."
    );
  }

  const modifiedUser = await dbManager.databaseInteraction(
    "UPDATE_USER",
    req.body,
    existingSpendilowUser.id
  );

  res.status(StatusCodes.NO_CONTENT).json();
};

// ------ DELETE USER ------
const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  if (!userId) {
    throw new BadRequestError(
      "L'utente che si sta cercando di eliminare non esiste e non corrisponde ad un account registrato, contatta il supporto utente."
    );
  }

  const existingSpendilowUser = await dbManager.databaseInteraction(
    "GET_USER_BY_ID",
    req.params.id
  );

  if (!existingSpendilowUser) {
    throw new BadRequestError(
      "L'utente che si sta cercando di eliminare non esiste e non corrisponde ad un account registrato, contatta il supporto utente."
    );
  }

  dbManager.databaseInteraction("DELETE_USER", userId);

  res
    .status(StatusCodes.OK)
    .json({ message: "Utente eliminato correttamente!" });
};

// ------ GET USER PROFILE ------
const getUserProfile = async (req: Request, res: Response) => {
  const requestId = req.params.id;

  if (!requestId) {
    throw new BadRequestError(
      "Il profilo cercato non esiste e non corrisponde ad un account registrato, contatta il supporto utente."
    );
  }

  const userProfile = await dbManager.databaseInteraction(
    "GET_USER_BY_ID",
    req.params.id
  );

  if (!userProfile) {
    throw new BadRequestError(
      "L'utente che si sta cercando di eliminare non esiste e non corrisponde ad un account registrato, contatta il supporto utente."
    );
  }

  const {
    id,
    email,
    isMFAActive,
    savings,
    salary,
    profileimage,
    workfield,
    username,
  } = userProfile;

  res.status(StatusCodes.OK).json({
    id,
    email,
    isMFAActive,
    savings,
    salary,
    profileimage,
    workfield,
    username,
  });
};

// ------ Exports ------
module.exports = {
  modifyUser,
  deleteUser,
  getUserProfile,
};
