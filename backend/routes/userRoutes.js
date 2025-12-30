import express from "express";
import {
  signup,
  login,
  protect,
  getMe,
  restrictTo,
} from "../controllers/authController.js";
import {
  getAllUsers,
  updateUserStatus,
} from "../controllers/userController.js"; // Import new controllers

const router = express.Router();

// Public
router.post("/signup", signup);
router.post("/login", login);

// Protected (All logged-in users)
router.get("/me", protect, getMe);

// Admin Only
// Note: We chain protect AND restrictTo to ensure security
router.get("/", protect, restrictTo("admin"), getAllUsers);
router.patch("/status/:id", protect, restrictTo("admin"), updateUserStatus);

export default router;
