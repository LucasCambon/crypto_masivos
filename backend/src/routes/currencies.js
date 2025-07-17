const express = require("express");
const router = express.Router();
const { getCurrencies } = require("../controllers/currencies");

router.get("/list", getCurrencies);

module.exports = router;
