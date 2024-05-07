// ------ Express + Router Setup ------
import { Router } from "express"; //TS Import
const express = require("express");
const budgetRouter: Router = express.Router();

// ------ Controllers imports and setup ------
const {
  createBudget,
  getAllBudgets,
  getSingleBudget,
  deleteSingleBudget,
  //   bulkDataCreation,
} = require("../controllers/budgets");

// ------ CREATE TRANSACTION ------
budgetRouter.post("/new/", createBudget);

// ------ GET ALL TRANSACTIONS ------
budgetRouter.get("/get/all", getAllBudgets);

// ------ GET SINGLE TRANSACTION ------
budgetRouter.get("/get/:id", getSingleBudget);

// ------ DELETE SINGLE TRANSACTION ------
budgetRouter.delete("/del/:id", deleteSingleBudget);

// ------ BULK TRANSACTIONS CREATION------
// budgetRouter.get("/generate/", bulkDataCreation);

module.exports = budgetRouter;
