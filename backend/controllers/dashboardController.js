const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const userId = String(req.user.id);
    const isValid = Types.ObjectId.isValid(userId);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const userObjectId = new Types.ObjectId(userId);

    const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

    // Totals (use the same id type everywhere)
    const [[incomeAgg] = [], [expenseAgg] = []] = await Promise.all([
      Income.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Expense.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ]);

    const totalIncome = Number(incomeAgg?.total || 0);
    const totalExpense = Number(expenseAgg?.total || 0);

    // Income last 60d, Expense last 30d (if that’s what you really want)
    const [last60DaysIncomeTransactions, last30DaysExpenseTransactions] =
      await Promise.all([
        Income.find({ userId: userObjectId, date: { $gte: daysAgo(60) } })
          .sort({ date: -1 })
          .lean(),
        Expense.find({ userId: userObjectId, date: { $gte: daysAgo(30) } })
          .sort({ date: -1 })
          .lean(),
      ]);

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, t) => sum + Number(t.amount || 0),
      0
    );
    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, t) => sum + Number(t.amount || 0),
      0
    );

    // Recent transactions (last 5 across both)
    const [last5Income, last5Expense] = await Promise.all([
      Income.find({ userId: userObjectId }).sort({ date: -1 }).limit(5).lean(),
      Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5).lean(),
    ]);

    const recentTransactions = [
      ...last5Income.map((t) => ({ ...t, type: "income" })),
      ...last5Expense.map((t) => ({ ...t, type: "expense" })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // robust even if date is string/Date
      .slice(0, 5);

    res.json({
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense,
      last60DaysIncomeTransactions: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      last30DaysExpenseTransactions: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      recentTransactions,
    });
  } catch (error) {
    // log full error server-side for debugging
    console.error("getDashboardData error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};