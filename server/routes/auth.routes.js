import express from "express";
import {
  register,
  login,
  updateUser,
} from "../controllers/auth.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/update", protect, updateUser);

export default router;
