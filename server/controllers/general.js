import User from "../models/User.js";
import OverallStats from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded test values for the available data
    const currentMonth = "November";
    const currentYear = "2021";
    const currentDay = "2021-11-15";
    // recent transactions
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdAt: -1 });

    // overall stats
    const overallStat = await OverallStats.find({ year: currentYear });
    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];
    const thisMonthStats = overallStat[0].monthlyData.find(
      ({ month }) => month === currentMonth
    );
    const todayStats = overallStat[0].dailyData.find(
      ({ date }) => date === currentDay
    );
    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
