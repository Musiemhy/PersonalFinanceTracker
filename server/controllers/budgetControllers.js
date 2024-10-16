import { Budget, createBudget } from "../models/budgetModels.js";
import mongoose from "mongoose";

export const addBudget = async (request, response) => {
  try {
    const { user, category, startDate, endDate } = request.body;

    if (
      !user ||
      !Array.isArray(category) ||
      category.length === 0 ||
      !startDate ||
      !endDate
    ) {
      return response
        .status(400)
        .send({ message: "Please fill all required fields!" });
    }

    await createBudget(user, category, startDate, endDate);

    return response.status(201).send({ message: "Budget added successfully!" });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
};

export const getBudgetByUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).send({ message: "Did not recieve userId!" });
    }

    const budget = await Budget.find({
      user: userId,
    });

    if (!budget) {
      return res.status(404).send({
        message: "No Budget Yet",
      });
    }

    return res.status(200).json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const getBudgetByDateRange = async (req, res) => {
  try {
    const { dateRange } = req.body;

    if (!dateRange || dateRange.length !== 2) {
      return res
        .status(400)
        .send({ message: "Did not receive valid date range!" });
    }

    const startDate = new Date(dateRange[0]);
    const endDate = new Date(dateRange[1]);

    const budget = await Budget.find({
      $or: [
        { startDate: { $gte: startDate, $lte: endDate } },
        { endDate: { $gte: startDate, $lte: endDate } },
        { startDate: { $lte: startDate }, endDate: { $gte: endDate } },
      ],
    });

    if (!budget || budget.length === 0) {
      return res.status(404).send({ message: "No Budget Yet" });
    }

    return res.status(200).json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const { id, User, category, startDate, endDate } = req.body;

    const updatedBudget = await Budget.findByIdAndUpdate(
      id,
      {
        User,
        category,
        startDate,
        endDate,
      },
      { new: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json(updatedBudget);
  } catch (error) {
    console.error("Error updating budget: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAllHistory = async (req, res) => {
  try {
    const { budgetId } = req.query;

    if (!budgetId) {
      return res.status(400).send({ message: "Did not recieve budgetId!" });
    }

    const budget = await Budget.deleteOne({ _id: budgetId });

    if (!budget) {
      return res.status(404).send({
        message: "No Budgets Yet",
      });
    }

    return res.status(200).json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};
