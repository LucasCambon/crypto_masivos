const express = require("express");
const router = express.Router();
const {
  getWallets
} = require("../controllers/wallets");

router.get("/list", getWallets);

module.exports = router;