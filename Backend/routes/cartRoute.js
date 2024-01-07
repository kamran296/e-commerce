const express = require("express");
const router = express.Router();
const Cart = require("./../models/Cart");
const CryptoJS = require("crypto-js"); /*Used for hashing the password*/
const jwt = require("jsonwebtoken");
const secretKey = "kamran";

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./../middleware/verifyToken");

// CREATE Cart
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  const savedCart = newProduct.save();
  try {
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).jsson({ "error in creating Cart": error });
  }
});

// // UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    console.log(updatedCart, 123);
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ "error in updating Cart": err });
  }
});

// DELETE
router.delete("/delete/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Use has been deleted ");
  } catch (err) {
    res.status(500).json({ "error in deleting": err });
  }
});

// // GET user cart
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ "error in getting Cart ": err });
  }
});

// // GET ALL Cart
router.get("/", verifyTokenAndAuthorization, async (req, res) => {});
try {
  const carts = await Cart.find();
  res.status(200).json(carts);
} catch (error) {
  res.status(500).json({ "erro in get all in cart": error });
}

module.exports = router;
