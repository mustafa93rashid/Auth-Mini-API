const jwtService = require("../utils/jwtService");
const auth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwtService.verify(token);

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Not authorized",
      error: error.message,
    });
  }
};

module.exports = auth;
