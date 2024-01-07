const express = require("express");
const User = require("../models/User");
const CryptoJS = require("crypto-js"); /*Used for hashing the password*/
const jwt = require("jsonwebtoken");
const JWT_SEC = "kamran";
// Register
module.exports.registerUser = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.secretKey
    ).toString(),
    // req.body,
  });
  await newUser.save();
  try {
    console.log(newUser);

    res.status(200).json({ newUser });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

// Login user
module.exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (!user) {
      res.status(401).json("Wrong login credentials");
    }
    const hashedPasssword = CryptoJS.AES.decrypt(
      user.password,
      process.env.secretKey
    );

    const OriginalPassword = hashedPasssword.toString(CryptoJS.enc.Utf8);
    if (OriginalPassword != req.body.password) {
      res.status(401).json("Wrong login credentials");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    console.log(password);
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log("error from login ");
    res.status(400).json({ error: err });
  }
};
