"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const authenticatedUsersRouter = express.Router();
// ------ Controllers imports and setup ------
const { modifyUser, deleteUser, getUserProfile, logoutUserProfile, } = require("../controllers/authenticated-users");
// ------ MODIFY USER ------
authenticatedUsersRouter.patch("/mod/", modifyUser);
// ------ DELETE USER ------
authenticatedUsersRouter.delete("/del/", deleteUser);
// ------ GET USER PROFILE ------
authenticatedUsersRouter.get("/get-profile/", getUserProfile);
// ------ LOGOUT USER PROFILE ------
authenticatedUsersRouter.get("/logout/", logoutUserProfile);
// ------ Exports ------
module.exports = authenticatedUsersRouter;
