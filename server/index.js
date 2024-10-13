import express from "express";
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "../server/routes/userRoutes.js";
import transactionRoutes from "../server/routes/transactionRoutes.js";
import budgetRoutes from "../server/routes/budgetRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", transactionRoutes);
app.use("/api", budgetRoutes);

app.get(`/`, (request, response) => {
  console.log(request);
  return response.status(234).send("welcome");
});

mongoose
  .connect(MongoDBURL)
  .then(() => {
    console.log("App connected to database.");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
