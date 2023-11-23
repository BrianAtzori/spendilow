// ------ Express + Router Setup ------
import { Router } from "express";
const express = require("express");
const utilitiesRouter: Router = express.Router();

// ------ Controllers imports and setup ------
const {checkServerAlive} = require("../controllers/utilities")

// ------ CHECK SERVER ALIVE ------
utilitiesRouter.get("/check-server-alive/",checkServerAlive)

// ------ Exports ------
module.exports = utilitiesRouter;