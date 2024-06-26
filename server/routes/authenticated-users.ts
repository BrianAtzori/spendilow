// ------ Express + Router Setup ------
import { Router } from "express"; //TS Import
const express = require("express");
const authenticatedUsersRouter: Router = express.Router();

// ------ Controllers imports and setup ------
const {
  modifyUser,
  deleteUser,
  getUserProfile,
  logoutUserProfile,
  verifyUserAccess,
} = require("../controllers/authenticated-users");

// ------ MODIFY USER ------
authenticatedUsersRouter.get("/verify/", verifyUserAccess);

// ------ MODIFY USER ------
authenticatedUsersRouter.patch("/mod/", modifyUser);

// ------ DELETE USER ------
authenticatedUsersRouter.delete("/del/", deleteUser);

// ------ GET USER PROFILE ------
authenticatedUsersRouter.get("/get-profile/", getUserProfile);

// ------ LOGOUT USER PROFILE ------
authenticatedUsersRouter.get("/logout/", logoutUserProfile);

module.exports = authenticatedUsersRouter;
