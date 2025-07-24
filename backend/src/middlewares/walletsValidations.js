const { body } = require("express-validator");

const createWalletValidator = [
  body("user_id")
    .notEmpty().withMessage("User  ID is required.")
    .isInt().withMessage("User  ID must be an integer."),
  body("address")
    .notEmpty().withMessage("Address is required.")
    .isString().withMessage("Address must be a string.")
    .isLength({ max: 100 }).withMessage("Address must be at most 100 characters."),
  body("alias")
    .optional({ checkFalsy: true })
    .isString().withMessage("Alias must be a string.")
    .isLength({ max: 50 }).withMessage("Alias must be at most 50 characters."),
  body("currency_id")
    .notEmpty().withMessage("Currency ID is required.")
    .isInt().withMessage("Currency ID must be an integer."),
];

const updateWalletValidator = [
  body("id")
    .notEmpty().withMessage("Wallet ID is required.")
    .isInt().withMessage("Wallet ID must be an integer."),
  body("balance")
    .optional()
    .isFloat({ gte: 0 }).withMessage("Balance must be a number greater than or equal to 0."),
  
  body("type")
    .notEmpty().withMessage("Transaction type is required.")
    .isIn(["deposit", "withdraw"]).withMessage("Type must be 'deposit' or 'withdraw'."),
];

const deleteWalletValidator = [
  body("id")
    .notEmpty().withMessage("Wallet ID is required."),
];

module.exports = {
  createWalletValidator,
  updateWalletValidator,
  deleteWalletValidator,
};
