// ------ Express + Router Setup ------
import { Router } from 'express' //TS Import
const express = require("express");
const authenticatedUsersRouter: Router = express.Router();

// ------ Controllers imports and setup ------
const { dummyFunction } = require("../controllers/authenticated-users")

// ------ DUMMY FUNCTION ------
authenticatedUsersRouter.get("/dummy/", dummyFunction)

// ------ Exports ------
module.exports = authenticatedUsersRouter
