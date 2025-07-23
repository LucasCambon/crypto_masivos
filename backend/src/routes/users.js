const express = require("express");
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser, login, roleManagement, profile } = require("../controllers/users");
const { createUserValidator, updateUserValidator, loginValidation, roleManagementValidation } = require("../middlewares/usersValidations");
const validationsHandler = require("../middlewares/validationsHandler");
const authToken = require("../middlewares/authToken");
const authAdmin = require("../middlewares/authAdmin");

router.get("/list", authToken, authAdmin, getUsers);
router.get("/profile", authToken, profile)
router.post("/create", createUserValidator, validationsHandler, createUser);
router.post("/login", loginValidation, validationsHandler, login);
router.put("/update", authToken, updateUserValidator, validationsHandler, updateUser);
router.put("/update/admin", authToken, authAdmin, roleManagementValidation, validationsHandler, roleManagement);
router.delete("/delete", authToken, deleteUser);


module.exports = router;