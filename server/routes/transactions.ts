// ------ Express + Router Setup ------
import { Router } from "express"; //TS Import
const express = require("express");
const transactionsRouter: Router = express.Router();

// ------ Controllers imports and setup ------
const {
  createTransaction,
  getAllTransactions,
  getSingleTransaction,
  updateSingleTransaction,
  deleteSingleTransaction,
} = require("../controllers/transactions");

// ------ CREATE TRANSACTION ------
transactionsRouter.post("/new/", createTransaction);

// ------ GET ALL TRANSACTIONS ------
transactionsRouter.get("/get/all", getAllTransactions);

// ------ GET SINGLE TRANSACTION ------
transactionsRouter.get("/get/:id", getSingleTransaction);

// ------ UPDATE SINGLE TRANSACTION ------
transactionsRouter.patch("/mod/:id", updateSingleTransaction);

// ------ DELETE SINGLE TRANSACTION ------
transactionsRouter.delete("/del/:id", deleteSingleTransaction);

module.exports = transactionsRouter;
