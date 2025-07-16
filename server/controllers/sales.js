import OverallStat from "../models/overAllStat.js";

export const getSales = async (req, res) => {
  try {
    const overAllStats = await OverallStat.find();
    res.status(200).json(overAllStats[0]);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
