import User from "../models/User.js";

// 1. VIEW ALL USERS (With Pagination)
export const getAllUsers = async (req, res) => {
  try {
    // Pagination logic
    const page = parseInt(req.query.page) * 1 || 1;
    const limit = parseInt(req.query.limit) * 1 || 10;
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit).sort("-createdAt"); // Show newest users first

    const totalUsers = await User.countDocuments();

    res.status(200).json({
      status: "success",
      results: users.length,
      total: totalUsers,
      data: { users },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// 2. UPDATE USER STATUS (Activate/Deactivate)
export const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body; // Expecting { "status": "active" } or "inactive"

    if (!["active", "inactive"].includes(status)) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid status" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
