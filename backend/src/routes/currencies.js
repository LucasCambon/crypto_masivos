const express = require("express");
const router = express.Router();
const { getCurrencies, createCurrency, updateCurrency } = require("../controllers/currencies");

router.get("/list", getCurrencies);
router.post("/create", createCurrency);
router.put("/update", updateCurrency);

module.exports = router;
