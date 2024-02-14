"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const authenticatedUsersRouter = express.Router();
// ------ Controllers imports and setup ------
const { modifyUser, deleteUser, getUserProfile, } = require("../controllers/authenticated-users");
// ------ MODIFY USER ------
authenticatedUsersRouter.patch("/mod/:id", modifyUser);
// ------ DELETE USER ------
authenticatedUsersRouter.delete("/del/:id", deleteUser);
// ------ GET AUTHENTICATED USER PROFILE ------
authenticatedUsersRouter.get("/get-profile/:id", getUserProfile);
// ------ Exports ------
module.exports = authenticatedUsersRouter;
