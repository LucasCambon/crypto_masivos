const express = require("express");
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser, login, enableAdmin, profile } = require("../controllers/users");
const { createUserValidator, updateUserValidator, loginValidation, enableAdminValidation } = require("../middlewares/usersValidations");
const validationsHandler = require("../middlewares/validationsHandler");
const authToken = require("../middlewares/authToken");
const authAdmin = require("../middlewares/authAdmin");

router.get("/list", authToken, authAdmin, getUsers);
router.get("/profile", authToken, profile)
router.post("/create", createUserValidator, validationsHandler, createUser);
router.post("/login", loginValidation, validationsHandler, login);
router.put("/update", authToken, updateUserValidator, validationsHandler, updateUser);
router.put("/update/admin", authToken, authAdmin, enableAdminValidation, validationsHandler, enableAdmin);
router.delete("/delete", authToken, deleteUser);


module.exports = router;