const express = require("express");
const router = express.Router();
const {
  getWallets,
  createWallet
} = require("../controllers/wallets");

router.get("/list", getWallets);
router.post("/create", createWallet);

module.exports = router;