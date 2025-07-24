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

const { createWalletValidator, updateWalletValidator, deleteWalletValidator } = require("../middlewares/walletsValidations");

const validationsHandler = require("../middlewares/validationsHandler");
const authToken = require("../middlewares/authToken");
const authAdmin = require("../middlewares/authAdmin");

router.get("/list", authToken, authAdmin, getWallets);
router.get("/:id", authToken, getWalletById); 
router.get("/user/:user_id", authToken, getWalletsByUserId);
router.post("/create", authToken, createWalletValidator, validationsHandler, createWallet);
router.put("/update", authToken, updateWalletValidator, validationsHandler, updateWallet);
router.delete("/delete", authToken, deleteWalletValidator, validationsHandler, deleteWallet);

module.exports = router;