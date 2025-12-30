import User from "../models/User.js";
import { createSendToken } from "../utils/authUtils.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";

//SIGNUP
export const signup = async (req, res) => {
  console.log("Data received from Postman:", req.body);
  try {
    // 1. Create new user
    // Only allow specific fields to prevent users from making themselves 'admin'
    const newUser = await User.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    });

    // 2. Generate token and send response
    createSendToken(newUser, 201, res);
  } catch (err) {
    console.log(err.keyPattern);
    console.log(err.keyValue);
    // Handle duplicate email error (MongoDB Error Code 11000)
    if (err.code === 11000) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists",
      });
    }

    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password exist in request
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }

    // 2. Check if user exists & password is correct
    // We use .select('+password') because we set select:false in the model
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    // 3. Check if user is active (Requirement check)
    if (user.status === "inactive") {
      return res.status(403).json({
        status: "fail",
        message: "Your account is deactivated. Please contact an admin.",
      });
    }

    // 4. Update last login timestamp (Requirement check)
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

    // 5. If everything is ok, send token
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// 1. PROTECT MIDDLEWARE (Check if user is logged in)
export const protect = async (req, res, next) => {
  try {
    let token;
    // Check if token exists in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ status: "fail", message: "You are not logged in." });
    }

    // Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res
        .status(401)
        .json({ status: "fail", message: "The user no longer exists." });
    }

    // Check if user is active
    if (currentUser.status === "inactive") {
      return res
        .status(403)
        .json({ status: "fail", message: "User account is deactivated." });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ status: "fail", message: "Invalid token. Please log in again." });
  }
};

// 2. AUTHORIZATION MIDDLEWARE (Check user role)
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array like ['admin'], req.user.role comes from 'protect' middleware
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};

export const getMe = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
};
