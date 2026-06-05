const express = require("express");
const router = express.Router();

const protectedController = require("../controllers/protected.controller");
const asyncHandler = require("../utils/asyncHandler");
const auth = require("../middlewares/auth");


router.get("/me/welcome", auth, asyncHandler(protectedController.welcome));
router.get("/me/account-summary", auth, asyncHandler(protectedController.accountSummary));

router.get("/admin/overview", auth, asyncHandler(protectedController.adminOverview));
router.get("/admin/users", auth, asyncHandler(protectedController.adminUsers));
router.delete("/admin/users/:id", auth, asyncHandler(protectedController.deleteUser));

module.exports = router;
