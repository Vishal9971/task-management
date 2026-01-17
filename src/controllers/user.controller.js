const User = require('../models/User.model');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not Found',
        error: true,
      });
    }

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};
