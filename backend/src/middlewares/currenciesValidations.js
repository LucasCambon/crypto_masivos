const { body } = require("express-validator");

const createCurrencyValidator = [
  body("name")
    .notEmpty().withMessage("Name is required.")
    .isString().withMessage("Name must be a string")
    .isLength({ max: 50 }).withMessage("Username must be at most 50 characters."),
  body("usd_value")
    .notEmpty().withMessage("USD value is required.")
    .isFloat({ gt: 0 }).withMessage("USD value must be a number greater than 0."),
  body("symbol")
    .notEmpty().withMessage("Symbol is required.")
    .isString().withMessage("Symbol must be a string")
    .isLength({ max: 10 }).withMessage("Symbol must be at most 10 characters."),
  body("liquidity")
    .notEmpty().withMessage("Liquidity is required.")
    .isFloat({ gt: 0 }).withMessage("Liquidity must be a number greater than 0."),
  body("volatility")
    .optional({ checkFalsy: true })
    .isIn(["high", "medium", "low"])
    .withMessage("Volatility must be one of: high, medium, low."),
  body("type")
    .optional({ checkFalsy: true })
    .isString().withMessage("Type must be a string")
    .isLength({ max: 30 }).withMessage("Type must be at most 30 characters."),
];

const updateCurrencyValidator = [
  body("id")
    .notEmpty().withMessage("Currency ID is required.")
    .isInt().withMessage("Currency ID must be an integer."),
  body("name")
    .optional({ checkFalsy: true })
    .isString().withMessage("Name must be a string.")
    .isLength({ max: 50 }).withMessage("Name must be at most 50 characters."),
  body("usd_value")
    .optional()
    .isFloat({ gt: 0 }).withMessage("USD value must be a number greater than 0."),
  body("symbol")
    .optional({ checkFalsy: true })
    .isString().withMessage("Symbol must be a string.")
    .isLength({ max: 10 }).withMessage("Symbol must be at most 10 characters."),
  body("type")
    .optional({ checkFalsy: true })
    .isString().withMessage("Type must be a string.")
    .isLength({ max: 30 }).withMessage("Type must be at most 30 characters."),
  body("volatility")
    .optional({ checkFalsy: true })
    .isIn(["high", "medium", "low"]).withMessage("Volatility must be one of: high, medium, low."),
  body("liquidity")
    .optional()
    .isFloat({ gt: 0 }).withMessage("Liquidity must be a number greater than 0."),
];

const deleteCurrencyValidator = [
  body("id")
    .notEmpty().withMessage("Currency ID is required."),
];

module.exports = {
    createCurrencyValidator,
    updateCurrencyValidator,
    deleteCurrencyValidator,
};