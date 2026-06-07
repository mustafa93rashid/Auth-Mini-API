const { param } = require("express-validator");
const validate = require("../middlewares/validate");

const deleteUserValidation = [
  param("id")
    .notEmpty().withMessage("User id is required")
    .bail()
    .isMongoId().withMessage("Invalid user id"),

  validate,
];

module.exports = {
  deleteUserValidation,
};