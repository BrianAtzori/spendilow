"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const utilitiesRouter = express.Router();
// ------ Controllers imports and setup ------
const { checkServerAlive } = require("../controllers/utilities");
// ------ CHECK SERVER ALIVE ------
utilitiesRouter.get("/check-server-alive/", checkServerAlive);
// ------ Exports ------
module.exports = utilitiesRouter;
