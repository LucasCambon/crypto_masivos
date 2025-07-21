const express = require("express");
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser, login } = require("../controllers/users");
const { createUserValidator, updateUserValidator, deleteUserValidator, loginValidation } = require("../middlewares/usersValidations");
const validationsHandler = require("../middlewares/validationsHandler");

router.get("/list", getUsers);
router.post("/create", createUserValidator, validationsHandler, createUser);
router.post("/login", loginValidation, validationsHandler, login);
router.put("/update", updateUserValidator, validationsHandler, updateUser);
router.delete("/delete", deleteUserValidator, validationsHandler, deleteUser);


module.exports = router;