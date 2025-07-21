const express = require("express");
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/users");
const { createUserValidator, updateUserValidator, deleteUserValidator } = require("../middlewares/usersValidations");
const validationsHandler = require("../middlewares/validationsHandler");

router.get("/list", getUsers);
router.post("/create", createUserValidator, validationsHandler, createUser);
router.put("/update", updateUserValidator, validationsHandler, updateUser);
router.delete("/delete", deleteUserValidator, validationsHandler, deleteUser);


module.exports = router;