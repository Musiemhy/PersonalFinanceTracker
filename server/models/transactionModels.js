import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  User: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: [
    {
      name: {
        type: String,
        enum: [
          "allowance",
          "food",
          "transportation",
          "entertainment",
          "necessities",
        ],
        required: true,
      },
      amount: { type: Number, required: true },
    },
  ],
  reason: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const Transaction = mongoose.model("Transaction", transactionSchema);

export const createTransaction = async (
  userId,
  type,
  category,
  reason,
  date
) => {
  if (!Array.isArray(category) || category.length === 0) {
    throw new Error("Categories must be a non-empty array");
  }

  const formattedCategories = category.map((categories) => ({
    name: categories.name,
    amount: categories.amount,
  }));

  const transaction = new Transaction({
    User: userId,
    type: type,
    category: formattedCategories,
    reason: reason,
    date: date,
  });

  await transaction.save();
};
