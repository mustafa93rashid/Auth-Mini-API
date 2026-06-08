const { body } = require("express-validator");
const validate = require("../middlewares/validate");
const User = require("../models/User");

const registerValidation = [
  body("name")
    .notEmpty().withMessage("Name is required")

    .isString().withMessage("Name must be string").bail()

    .isLength({ min: 3, max: 30 }).withMessage("Name must be between 3 and 30 characters"),

  body("email")
    .trim()

    .notEmpty().withMessage("Email is required").bail()

    .isString().withMessage("Email must be string").bail()

    .isEmail().withMessage("Please provide a valid email address").bail()

    .custom(async (val) => {
      const user = await User.findOne({ email: val });

      if (user) {
        throw new Error("This Email Already Exist");
      }

      return true;
    }),

  body("password")
    .notEmpty().withMessage("Password is required").bail()

    .isString().withMessage("Password must be string").bail()

    .isStrongPassword({
      maxLength: 25,
      minLength: 8,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
      minLowercase: 1,
    }).withMessage("Password is weak").bail(),

  validate,
];

const loginValidation = [
  body("email")
    .isString()
    .withMessage("Invalid email or password")
    .isEmail()
    .withMessage("Invalid email or password"),

  body("password")
    .isString()
    .withMessage("Invalid email or password")
    .bail()

    .notEmpty()
    .withMessage("Password is required")
    .bail()

    .isStrongPassword({
      minLength: 8,
      maxLength: 25,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
      minLowercase: 1,
    })
    .withMessage("Invalid email or password"),

  validate,
];

module.exports = {
  registerValidation,
  loginValidation,
};
