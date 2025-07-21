const { body } = require("express-validator");

const createUserValidator = [
  body("username")
    .notEmpty().withMessage("Username is required.")
    .isString().withMessage("Username must be a string.")
    .isLength({ max: 50 }).withMessage("Username must be at most 50 characters."),
  
  body("email")
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Email must be valid.")
    .isLength({ max: 100 }).withMessage("Email must be at most 100 characters."),

  body("password")
    .isStrongPassword({
        minLength: 8,
        maxLength: 20,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    .withMessage(
        "The password must be between 8 and 20 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
];


const updateUserValidator = [

  body("username")
    .optional({ checkFalsy: true })
    .isString().withMessage("Username must be a string.")
    .isLength({ max: 50 }).withMessage("Username must be at most 50 characters."),

  body("email")
    .optional({ checkFalsy: true })
    .isEmail().withMessage("Email must be valid.")
    .isLength({ max: 100 }).withMessage("Email must be at most 100 characters."),

  body("password")
    .optional({ checkFalsy: true })
    .isStrongPassword({
      minLength: 8,
      maxLength: 20,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "The password must be between 8 and 20 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
];

const loginValidation = [
  body("email")
    .notEmpty().withMessage("Email is required."),
  body("password")
    .notEmpty().withMessage("Password is required."),
];

const assignAdminValidator = [
  body("id")
    .notEmpty().withMessage("User ID is required."),
];

module.exports = {
  createUserValidator,
  updateUserValidator,
  loginValidation,
  assignAdminValidator,
};