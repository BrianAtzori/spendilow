"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const authenticatedUsersRouter = express.Router();
// ------ Controllers imports and setup ------
const { getUserProfile } = require("../controllers/authenticated-users");

// ------ GET AUTHENTICATED USER PROFILE ------
authenticatedUsersRouter.get("/get-profile/:id", getUserProfile);

// ------ Exports ------
module.exports = authenticatedUsersRouter;
