const express = require("express");
const router = express.Router();
const {
  getWallets,
  getWalletById,
  getWalletsByUserId,
  createWallet,
  updateWallet,
  deleteWallet
} = require("../controllers/wallets");

router.get("/list", getWallets);
router.get("/:id", getWalletById); 
router.get("/:user_id", getWalletsByUserId);
router.post("/create", createWallet);
router.put("/update", updateWallet);
router.delete("/delete", deleteWallet);

module.exports = router;