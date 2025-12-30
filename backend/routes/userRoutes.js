import express from "express";
import {
  signup,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateMe,
  getAllUsers,
  updateUser,
} from "../controllers/userController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";
import { generateUserSummary } from "../controllers/aiController.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes (available to any logged-in user)
router.get("/me", protect, getMe);
router.patch("/updateMe", protect, updateMe);

//AI route
router.get("/ai-summary", protect, generateUserSummary);

// Admin only routes
// These allow the Admin to see everyone and update their status
router.get("/", protect, restrictTo("admin"), getAllUsers);
router.patch("/:id", protect, restrictTo("admin"), updateUser);

export default router;
