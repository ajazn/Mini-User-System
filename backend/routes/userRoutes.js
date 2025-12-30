import express from "express";
import {
  signup,
  login,
  getMe,
  updateMe,
  getAllUsers,
  updateUser,
} from "../controllers/userController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes (available to any logged-in user)
router.get("/me", protect, getMe);
router.patch("/updateMe", protect, updateMe);

// Admin only routes
// These allow the Admin to see everyone and update their status
router.get("/", protect, restrictTo("admin"), getAllUsers);
router.patch("/:id", protect, restrictTo("admin"), updateUser);

export default router;
