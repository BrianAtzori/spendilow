// ------ Express + Router Setup ------
import { Router } from 'express' //TS Import
const express = require("express");
const usersRouter: Router = express.Router();

// ------ Controllers imports and setup ------
const { registerUser, loginUser, modifyUser, deleteUser, activateMFA, verifyMFA, refreshUserTokens } = require("../controllers/users")

// ------ REGISTER USER ------
usersRouter.post("/new/", registerUser);

// ------ LOGIN USER ------
usersRouter.post("/login/", loginUser);

// ------ MODIFY USER ------
usersRouter.patch("/mod/:id", modifyUser)

// ------ DELETE USER ------
usersRouter.delete("/del/:id", deleteUser)

// ------ ACTIVATE MFA ------
usersRouter.get("/mfa-activation/", activateMFA)

// ------ VERIFY MFA ------
usersRouter.post("/mfa-verification/", verifyMFA)

// ------ REFRESH USER TOKENS ------
usersRouter.get('/refresh-auth/', refreshUserTokens)

// ------ Exports ------
module.exports = usersRouter;
