const Task = require('../models/Task.model');

exports.getTaskAnalytics = async (req, res) => {
  try {
    const completed = await Task.countDocuments({
      status: 'COMPLETED',
    });
    const pending = await Task.countDocuments({
      status: 'PENDING',
    });
    const overdue = await Task.countDocuments({
      status: 'PENDING',
      dueDate: { $lt: new Date() },
    });

    return res.status(200).json({ completed, pending, overdue });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};
