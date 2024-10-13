import { createTransaction, Transaction } from "../models/transactionModels.js";
import mongoose from "mongoose";

export const addTransaction = async (request, response) => {
  try {
    const { User, type, category, reason, date } = request.body;

    if (!User || !type || category.length === 0 || !reason) {
      return response
        .status(400)
        .send({ message: "Please fill all required fields!" });
    }

    const transaction = await createTransaction(
      User,
      type,
      category,
      reason,
      date
    );

    if (!transaction) {
      return res.status(404).send({
        message: "Could Not Add Transaction",
      });
    }

    return response.status(201).send({ message: "added" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
};

export const getTransactionByUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).send({ message: "Did not recieve userId!" });
    }

    const transaction = await Transaction.find({
      User: new mongoose.Types.ObjectId(userId),
    });

    if (!transaction) {
      return res.status(404).send({
        message: "No Transactions Yet",
      });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id, User, type, category, date, reason } = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      {
        User,
        type,
        category,
        date,
        reason,
      },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error("Error updating transaction: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.query;

    if (!transactionId) {
      return res
        .status(400)
        .send({ message: "Did not recieve transactionId!" });
    }

    const transaction = await Transaction.deleteOne({ _id: transactionId });

    if (!transaction) {
      return res.status(404).send({
        message: "No Transactions Yet",
      });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};
