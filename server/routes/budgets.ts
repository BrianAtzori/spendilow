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
  updateSingleBudget,
} = require("../controllers/budgets");

// ------ CREATE BUDGET ------
budgetRouter.post("/new/", createBudget);

// ------ GET ALL BUDGETS ------
budgetRouter.get("/get/all", getAllBudgets);

// ------ GET SINGLE BUDGET ------
budgetRouter.get("/get/:id", getSingleBudget);

// ------ UPDATE SINGLE TRANSACTION ------
budgetRouter.patch("/mod/:id", updateSingleBudget);

// ------ DELETE SINGLE BUDGET ------
budgetRouter.delete("/del/:id", deleteSingleBudget);

module.exports = budgetRouter;
