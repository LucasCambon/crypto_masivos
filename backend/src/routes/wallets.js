const express = require("express");
const router = express.Router();
const {
  getWallets,
  getWalletById,
  createWallet,
  updateWallet,
  deleteWallet
} = require("../controllers/wallets");

router.get("/list", getWallets);
router.get("/walletbyid", getWalletById); 
router.post("/create", createWallet);
router.put("/update", updateWallet);
router.delete("/delete", deleteWallet);

module.exports = router;