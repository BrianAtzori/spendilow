// ------ Imports ------
import { Request, Response } from "express"; //TS Import
import { StatusCodes } from "http-status-codes";
const { BadRequestError, UnauthenticatedError } = require("../errors");
const dbManager = require("../db/db-manager");

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
  getUserProfile,
};
