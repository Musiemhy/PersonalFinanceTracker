import express from "express";
import {
  addTransaction,
  getTransactionByUser,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionControllers.js";

const router = express.Router();

router.post("/addtransaction", addTransaction);
router.post("/gettransaction", getTransactionByUser);
router.put("/updatetransaction", updateTransaction);
router.delete("/deletetransaction", deleteTransaction);

export default router;
