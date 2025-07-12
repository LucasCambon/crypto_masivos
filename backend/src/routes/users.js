const express = require("express");
const router = express.Router();
const { getUsers, createUser } = require("../controllers/users");

router.get("/list", getUsers);
router.post("/create", createUser);
//router.put("/update", updateUser);
//router.delete("/delete", deleteUser);


module.exports = router;