"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const usersRouter = express.Router();
// ------ Controllers imports and setup ------
const { registerUser, loginUser, activateMFA, verifyMFA, refreshUserTokens, } = require("../controllers/users");
// ------ REGISTER USER ------
usersRouter.post("/new/", registerUser);
// ------ LOGIN USER ------
usersRouter.post("/login/", loginUser);
// ------ ACTIVATE MFA ------
usersRouter.get("/mfa-activation/", activateMFA);
// ------ VERIFY MFA ------
usersRouter.post("/mfa-verification/", verifyMFA);
// ------ REFRESH USER TOKENS ------
usersRouter.get("/refresh-auth/", refreshUserTokens);
// ------ Exports ------
module.exports = usersRouter;
