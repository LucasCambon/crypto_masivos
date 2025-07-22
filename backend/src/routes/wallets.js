const express = require("express");
const router = express.Router();
const {
  getWallets,
  createWallet,
  updateWallet
} = require("../controllers/wallets");

router.get("/list", getWallets);
router.post("/create", createWallet);
router.put("/update", updateWallet);

module.exports = router;