"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const authenticatedUsersRouter = express.Router();
// ------ Controllers imports and setup ------
const { dummyFunction } = require("../controllers/authenticated-users");
// ------ DUMMY FUNCTION ------
authenticatedUsersRouter.get("/dummy/", dummyFunction);
// ------ Exports ------
module.exports = authenticatedUsersRouter;
