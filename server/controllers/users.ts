// ------ Imports ------
import { Request, Response } from "express"; //TS Import
const SpendilowUser = require("../classes/spendilow-user");
import { StatusCodes } from "http-status-codes";
const { BadRequestError, UnauthenticatedError } = require("../errors");
const dbManager = require("../db/db-manager");
const qrCodeGenerator = require("../ts-utilities/generate_qr_code");
const speakeasy = require("speakeasy");
const jwt = require("jsonwebtoken");
import crypto from "crypto";

// ------ REGISTER USER ------
const registerUser = async (req: Request, res: Response) => {
  if (!req.body) {
    throw new BadRequestError(
      "Richiesta non effettuata correttamente, ricontrolla i dati inseriti o contatta il supporto utente."
    );
  }

  const { email } = req.body;

  if (!email) {
    throw new BadRequestError(
      "Email non valida, ricontrolla i dati inseriti o contatta il supporto utente."
    );
  }

  const spendilowUser = await dbManager.databaseInteraction(
    "GET_USER",
    req.body
  );

  //Check if user exists
  if (spendilowUser) {
    throw new BadRequestError(
      "Errore nella creazione dell'account, l'email inserita è già associata ad un account."
    );
  }

  let id: string = crypto.randomUUID();

  const newAccount = new SpendilowUser({ id, ...req.body });

  await newAccount.hashPassword();

  const refreshToken = newAccount.JWTGeneration("refresh");
  const accessToken = newAccount.JWTGeneration("access");

  const createdUser = await dbManager.databaseInteraction(
    "CREATE_USER",
    newAccount
  );

  if (!createdUser) {
    throw new BadRequestError(
      "Errore nella creazione dell'account, i dati non sono validi, ricontrollali o contatta il supporto utente."
    );
  }

  res
    .status(StatusCodes.CREATED)
    .cookie("spendilow-refresh-token", refreshToken, {
      httpOnly: true,
      maxAge: 518400000,
    })
    .cookie("spendilow-access-token", accessToken, {
      httpOnly: true,
      maxAge: 21600000,
    })
    .json({ id: newAccount.id, account: newAccount.email });
};

// ------ LOGIN USER ------
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email o password non validi");
  }

  const retrievedUser = await dbManager.databaseInteraction(
    "GET_USER",
    req.body
  );

  if (!retrievedUser) {
    throw new UnauthenticatedError(
      "L'indirizzo email fornito non è associato ad alcun account."
    );
  }

  const spendilowUser = new SpendilowUser(retrievedUser);

  const isPasswordCorrect: boolean = await spendilowUser.pwdCheck(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("La password fornita è errata.");
  }

  const refreshToken = spendilowUser.JWTGeneration("refresh");
  const accessToken = spendilowUser.JWTGeneration("access");

  res
    .status(StatusCodes.OK)
    .cookie("spendilow-refresh-token", refreshToken, {
      httpOnly: true,
      maxAge: 518400000,
    })
    .cookie("spendilow-access-token", accessToken, {
      httpOnly: true,
      maxAge: 21600000,
    })
    .json({
      id: spendilowUser.id,
      email: spendilowUser.email,
      toBeVerified: spendilowUser.isMFAActive,
    });
};

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

  const existingSpendilowUser = await dbManager.databaseInteraction(
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

  if(!userId){
    thorw new BadRequestError("L'utente che si sta cercando di eliminare non esiste e non corrisponde ad un account registrato, contatta il supporto utente.")
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

  res.status(StatusCodes.OK).json({message: "Utente eliminato correttamente!"});
};

// ------ ACTIVATE MFA FOR USER ------
const activateMFA = async (req: Request, res: Response) => {
  let qrForUser: string = await qrCodeGenerator();
  res.status(StatusCodes.OK).json(qrForUser);
};

// ------ VERIFY MFA FOR USER ------
const verifyMFA = async (req: Request, res: Response) => {
  const { otp } = req.body;
  const verified: boolean = speakeasy.totp.verify({
    secret: process.env.MFA_SEC,
    encoding: "base32",
    token: otp,
  });
  if (verified) {
    res.status(StatusCodes.OK).json({ verified });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ verified });
  }
};

// ------ REFRESH USER TOKENS ------
const refreshUserTokens = async (req: Request, res: Response) => {
  const refreshToken = req.cookies["spendilow-refresh-token"];

  if (!refreshToken) {
    throw new UnauthenticatedError(
      "I token di autenticazione forniti non sono validi, accesso negato."
    );
  }

  try {
    const decodedData = jwt.verify(refreshToken, process.env.JW_SEC);

    const accessToken = jwt.sign(
      { id: decodedData.id, email: decodedData.email },
      process.env.JW_SEC,
      { expiresIn: process.env.WT_LIFE }
    );
    res
      .cookie("spendilow-access-token", accessToken, {
        httpOnly: true,
        maxAge: 21600000,
      })
      .json({ id: decodedData.id, email: decodedData.email });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send({ token: "Invalid" });
  }
};

// ------ Exports ------
module.exports = {
  registerUser,
  loginUser,
  modifyUser,
  deleteUser,
  activateMFA,
  verifyMFA,
  refreshUserTokens,
};
