import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// --- MIDDLEWARE ORDER IS CRITICAL ---

// 1. CORS must be at the very top
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your React app
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);

// 2. Parse JSON bodies
app.use(express.json());

// 3. Routes must come AFTER the middleware above
app.use("/api/users", userRouter);

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Database Connection
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err.message);
  });
