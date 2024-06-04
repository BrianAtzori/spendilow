import { Request, Response } from "express";
const SpendilowUser = require("../classes/spendilow-user");
import { StatusCodes } from "http-status-codes";
const { BadRequestError, UnauthenticatedError } = require("../errors");
const dbManager = require("../db/db-manager");
const qrCodeGenerator = require("../ts-utilities/generate_qr_code");
const speakeasy = require("speakeasy");
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

  const { payload } = await dbManager.databaseInteraction("GET_USER", req.body);

  //Check if user exists
  if (payload.length != 0) {
    throw new BadRequestError(
      "Errore nella creazione dell'account, l'email inserita è già associata ad un account."
    );
  }

  let id: string = crypto.randomUUID();

  const newAccount = new SpendilowUser({ id, ...req.body });

  await newAccount.hashPassword();

  const refreshToken = newAccount.JWTGeneration("refresh");
  const accessToken = newAccount.JWTGeneration("access");

  const databaseOperationResult = await dbManager.databaseInteraction(
    "CREATE_USER",
    newAccount
  );

  if (databaseOperationResult.successState) {
    res
      .status(StatusCodes.CREATED)
      .cookie("spendilow-refresh-token", refreshToken, {
        httpOnly: true,
        maxAge: 518400000,
        sameSite: "none",
        secure: true,
      })
      .cookie("spendilow-access-token", accessToken, {
        httpOnly: true,
        maxAge: 21600000,
        sameSite: "none",
        secure: true,
      })
      .json({ id: newAccount.id, account: newAccount.email });
  } else {
    throw new BadRequestError(
      `Errore nella creazione dell'account, i dati non sono validi, ricontrollali o contatta il supporto utente comunicando questo errore: ${databaseOperationResult.payload}`
    );
  }
};

// ------ LOGIN USER ------
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email o password non validi");
  }

  const { successState, payload } = await dbManager.databaseInteraction(
    "GET_USER",
    req.body
  );

  if (successState && payload.length === 0) {
    throw new UnauthenticatedError(
      "L'indirizzo email fornito non è associato ad alcun account."
    );
  }

  const spendilowUser = new SpendilowUser(...payload);

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
      sameSite: "none",
      secure: true,
    })
    .cookie("spendilow-access-token", accessToken, {
      httpOnly: true,
      maxAge: 21600000,
      sameSite: "none",
      secure: true,
    })
    .json({
      id: spendilowUser.id,
      email: spendilowUser.email,
      toBeVerified: spendilowUser.isMFAActive,
    });
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

module.exports = {
  registerUser,
  loginUser,
  activateMFA,
  verifyMFA,
};
