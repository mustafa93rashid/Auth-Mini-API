const User = require("../models/User");
const jwtService = require("../utils/jwtService");
const passwordService = require("../utils/passwordService");
const cookiesService = require("../utils/cookiesService");

class AuthController {
  register = async (req, res) => {
    const { name, phone, email, password } = req.body;

    const hashed = await passwordService.hash(password);

    let user = await User.create({ name, phone, email, password: hashed });
    user = user.toObject();
    delete user.password;

    res.status(201).json({
      success: true,
      data: user,
    });
  };

  login = async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isVerified = await passwordService.compare(password, user.password);

    if (!isVerified) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwtService.sign({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    user = user.toObject();
    delete user.password;

    cookiesService.setData(res, "accessToken", token);

    res.status(201).json({
      success: true,
      data: user,
    });
  };

  logout = async (req, res) => {
    cookiesService.clearData(res, "accessToken");
    res.status(201).json({
      success: true,
      message: "Logged out successfully",
    });
  };
}

module.exports = new AuthController();
