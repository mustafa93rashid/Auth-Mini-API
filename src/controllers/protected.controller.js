const User = require("../models/User");

class ProtectedController {
  welcome = async (req, res) => {
    res.status(200).json({
      success: true,
      message: `Welcome ${req.user.name}`,
    });
  };

  accountSummary = async (req, res) => {
    res.status(200).json({
      success: true,
      data: {
        userId: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        status: "active",
      },
    });
  };

  adminOverview = async (req, res) => {
    res.status(200).json({
      success: true,
      data: {
        totalUsers: 10,
        totalAdmins: 2,
        totalRequests: 25,
      },
    });
  };

adminUsers = async (req, res) => {
  const users = await User.find().select("-password");

  res.status(200).json({
    success: true,
    data: users,
  });
};

deleteAdminUser = async (req, res) => {
  if (req.user._id.toString() === req.params.id) {
    return res.status(400).json({
      success: false,
      message: "You cannot delete your own account",
    });
  }

  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};
}

module.exports = new ProtectedController();