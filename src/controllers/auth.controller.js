const User = require("../models/User");
const jwtService = require("../utils/jwtService");
const passwordService = require("../utils/passwordService");
const cookiesService = require("../utils/cookiesService");

class AuthController {
  handleFailedLoginAttempts = async (user) => {
    user.failedLoginAttempts = +(user.failedLoginAttempts || 0) + 1;

    if (user.failedLoginAttempts >= 5) {
      user.blocked = true;
      user.lockedUntil = new Date(Date.now() + 30 * 60 * 1000); // Block for 30 minutes
    }

    await user.save();
  };

  resetFailedLoginAttempts = async (user) => {
    user.blocked = false;
    user.lockedUntil = null;
    user.failedLoginAttempts = 0;

    await user.save();
  };

  register = async (req, res) => {
    const { name, email, password } = req.body;

    const hashed = await passwordService.hash(password);

    let user = await User.create({ name, email, password: hashed });
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
      // await this.handleFailedLoginAttempts(user);

      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    if (user.blocked) {
      if (user.lockedUntil <= Date.now()) {
        await this.resetFailedLoginAttempts(user);
      } else {
        return res.status(403).json({
          success: false,
          message: "Account is temporarily locked. Please try again later.",
        });
      }
    }

    const isVerified = await passwordService.compare(password, user.password);

    if (!isVerified) {
      await this.handleFailedLoginAttempts(user);

      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    await this.resetFailedLoginAttempts(user);

    const token = jwtService.generateAcessToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const refreshToken = jwtService.generateRefreshToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    user = user.toObject();
    delete user.password;

    cookiesService.setAccessToken(res, token);
    cookiesService.setRefreshToken(res, refreshToken);

    res.status(201).json({
      success: true,
      data: user,
    });
  };

  logout = async (req, res) => {
    cookiesService.clearTokens(res);
    res.status(201).json({
      success: true,
      message: "Logged out successfully",
    });
  };

  refreshToken = async (req, res) => {
    const refreshToken = cookiesService.getRefreshToken(req);

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "No refresh token provided",
      });
    }

    const decoded = jwtService.verifyRefreshToken(refreshToken);

    const data = {
      _id: decoded._id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };

    const token = jwtService.generateAcessToken(data);
    const refToken = jwtService.generateRefreshToken(data);

    cookiesService.setAccessToken(res, token);
    cookiesService.setRefreshToken(res, refToken);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
    });
  };
}

module.exports = new AuthController();
