const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");
const authController = require("../controllers/auth.controller");   
const auth = require("../middlewares/auth");
const { signupLimiter, loginLimiter } = require("../middlewares/limiter");
const { registerValidation, loginValidation } = require("../Validation/auth.validate");

router.get("/profile", [auth], asyncHandler(authController.profile))

router.post("/register", [signupLimiter, ...registerValidation], asyncHandler(authController.register));

router.post("/login", [loginLimiter, ...loginValidation], asyncHandler(authController.login));

router.post("/logout", [auth], asyncHandler(authController.logout));

router.put("/refresh-token",  asyncHandler(authController.refreshToken));


module.exports = router;
