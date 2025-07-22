const express = require("express");
const router = express.Router();
const { getCurrencies, createCurrency, updateCurrency, deleteCurrency } = require("../controllers/currencies");
const { createCurrencyValidator, updateCurrencyValidator, deleteCurrencyValidator } = require("../middlewares/currenciesValidations");
const validationsHandler = require("../middlewares/validationsHandler");
const authToken = require("../middlewares/authToken");
const authAdmin = require("../middlewares/authAdmin");

router.get("/list", getCurrencies);
router.post("/create", authToken, authAdmin, createCurrencyValidator, validationsHandler, createCurrency);
router.put("/update", authToken, authAdmin, updateCurrencyValidator, validationsHandler,  updateCurrency);
router.delete("/delete", authToken, authAdmin, deleteCurrencyValidator, validationsHandler,  deleteCurrency);

module.exports = router;
