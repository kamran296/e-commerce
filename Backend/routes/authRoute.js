const express = require("express");
const router = express.Router();
const authController = require("./../controller/authController");

// Register

router.post("/register", authController.registerUser);

// login post
router.post("/login", authController.loginUser);
module.exports = router;
