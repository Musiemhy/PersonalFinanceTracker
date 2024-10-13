import express from "express";
import {
  addBudget,
  getBudgetByUser,
  getBudgetByDateRange,
  updateBudget,
  deleteAllHistory,
} from "../controllers/budgetControllers.js";

const router = express.Router();

router.post("/setbudget", addBudget);
router.post("/getbudget", getBudgetByUser);
router.post("/getbudgetbyrange", getBudgetByDateRange);
router.put("/updatebudget", updateBudget);
router.delete("/deleteall", deleteAllHistory);

export default router;
