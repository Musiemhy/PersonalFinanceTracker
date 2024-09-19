import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  User: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: {
    type: String,
    enum: ["salary", "refund", "payment", "transfer", "withdrawal"],
    required: true,
  },
  amount: { type: Number, required: true },
  reason: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
