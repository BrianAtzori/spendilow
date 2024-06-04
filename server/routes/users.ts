// ------ Express + Router Setup ------
import { Router } from "express"; //TS Import
const express = require("express");
const usersRouter: Router = express.Router();

// ------ Controllers imports and setup ------
const {
  registerUser,
  loginUser,
  activateMFA,
  verifyMFA,
} = require("../controllers/users");

// ------ REGISTER USER ------
usersRouter.post("/new/", registerUser);

// ------ LOGIN USER ------
usersRouter.post("/login/", loginUser);

// ------ ACTIVATE MFA ------
usersRouter.get("/mfa-activation/", activateMFA);

// ------ VERIFY MFA ------
usersRouter.post("/mfa-verification/", verifyMFA);

module.exports = usersRouter;
