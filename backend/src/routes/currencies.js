const express = require("express");
const router = express.Router();
const { getCurrencies, createCurrency, updateCurrency, deleteCurrency } = require("../controllers/currencies");

router.get("/list", getCurrencies);
router.post("/create", createCurrency);
router.put("/update", updateCurrency);
router.delete("/delete", deleteCurrency);

module.exports = router;
