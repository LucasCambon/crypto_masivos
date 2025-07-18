const express = require("express");
const router = express.Router();
const { getCurrencies, createCurrency } = require("../controllers/currencies");

router.get("/list", getCurrencies);
router.post("/create", createCurrency);

module.exports = router;
