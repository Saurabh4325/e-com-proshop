import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  // Read JWT from cookie
  let token = req.cookies.jwt;
  if (token) {
    try {
      // Getting payload from token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetching user id from database
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Admin middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) next();
  else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};
