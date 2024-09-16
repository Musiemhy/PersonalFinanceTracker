import express from "express";
import {
  addUser,
  getUserByEmailAndPassword,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/adduser", addUser);
router.post("/getuser", getUserByEmailAndPassword);

export default router;
