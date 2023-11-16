// ------ Express + Router Setup ------
import { Express, Request, Response, RequestHandler, Router } from 'express' //TS Import
const express = require("express");
const usersRouter: Router = express.Router();

// ------ Controllers imports and setup ------
const { registerUser, loginUser, modifyUser, deleteUser } = require("../controllers/users")

// ------ REGISTER USER ------
usersRouter.post("/new/", registerUser);

// ------ LOGIN USER ------
usersRouter.post("/login/", loginUser);

// ------ MODIFY USER ------
usersRouter.patch("/mod/:id", modifyUser)

// ------ DELETE USER ------
usersRouter.delete("/del/:id", deleteUser)

// ------ Exports ------
module.exports = usersRouter;
