const express = require("express");
const router = express.Router();
const {
  getWallets,
  getWalletById,
  createWallet,
  updateWallet,
  deleteWallet
} = require("../controllers/wallets");

const { createWalletValidator, updateWalletValidator, deleteWalletValidator } = require("../middlewares/walletsValidations");

const validationsHandler = require("../middlewares/validationsHandler");
const authToken = require("../middlewares/authToken");

router.get("/list", authToken, getWallets);
router.get("/:id", authToken, getWalletById);
router.post("/create", authToken, createWalletValidator, validationsHandler, createWallet);
router.put("/update", authToken, updateWalletValidator, validationsHandler, updateWallet);
router.delete("/delete", authToken, deleteWalletValidator, validationsHandler, deleteWallet);

module.exports = router;