import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
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

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;
    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);
    const salesTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((saleId) =>
        Transaction.findById(saleId)
      )
    );
    const filteredSalesTransactions = salesTransactions.filter(
      (transaction) => transaction !== null
    );
    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSalesTransactions });
  } catch (err) {
    res.status(404).json(err.message);
  }
};
