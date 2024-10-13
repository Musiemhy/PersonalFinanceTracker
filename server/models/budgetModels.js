import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categories: [
    {
      name: {
        type: String,
        enum: ["food", "transportation", "entertainment", "necessities"],
        required: true,
      },
      amount: { type: Number, required: true },
    },
  ],
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
});

export const Budget = mongoose.model("Budget", budgetSchema);

export const createBudget = async (userId, categories, startDate, endDate) => {
  if (!Array.isArray(categories) || categories.length === 0) {
    throw new Error("Categories must be a non-empty array");
  }

  const formattedCategories = categories.map((category) => ({
    name: category.name,
    amount: category.amount,
  }));

  const budget = new Budget({
    user: userId,
    categories: formattedCategories,
    startDate: startDate,
    endDate: endDate,
  });

  await budget.save();
};
