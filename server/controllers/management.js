import mongoose from "mongoose";
import User from "../models/User.js";
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password -__v");
    if (!admins.length) {
      return res.status(404).json({ message: "No admins found" });
    }
    res.status(200).json(admins);
  } catch (err) {
    res.status(404).json(err.message);
  }
};
