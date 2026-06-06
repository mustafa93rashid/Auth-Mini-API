const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");
const authController = require("../controllers/auth.controller");   
const auth = require("../middlewares/auth");
const { signupLimiter, loginLimiter } = require("../middlewares/limiter");

router.post("/register", [signupLimiter], asyncHandler(authController.register));
router.post("/login", [loginLimiter], asyncHandler(authController.login));
router.post("/logout", [auth], asyncHandler(authController.logout));

module.exports = router;
