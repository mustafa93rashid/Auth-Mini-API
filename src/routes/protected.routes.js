const express = require("express");
const router = express.Router();
const protectedController = require("../controllers/protected.controller");
const asyncHandler = require("../utils/asyncHandler");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const { deleteUserValidation } = require("../Validation/protectedValidation");


router.get("/me/welcome", auth, asyncHandler(protectedController.welcome));
router.get("/me/account-summary", auth, asyncHandler(protectedController.accountSummary));

router.get("/admin/overview", [auth, role(["admin"])], asyncHandler(protectedController.adminOverview));
router.get("/admin/users", [auth, role(["admin"])], asyncHandler(protectedController.adminUsers));
router.delete("/admin/users/:id", [auth, role(["admin"], ...deleteUserValidation)], asyncHandler(protectedController.deleteUser));

module.exports = router;
