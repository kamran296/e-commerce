const express = require("express");
const router = express.Router();
const Product = require("./../models/Product");
const CryptoJS = require("crypto-js"); /*Used for hashing the password*/
const jwt = require("jsonwebtoken");
const secretKey = "kamran";

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./../middleware/verifyToken");

// CREATE PRODUCT
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const product = await Product.findOne({ title: req.body.title });
    if (product) {
      return res.status(400).json("Product already exist");
    }
    const newProduct = new Product(req.body);

    newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    return res.status(500).jsson({ "error in creating product": error });
  }
});

// // UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    console.log(updatedProduct, 123);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ "error in updating product": err });
  }
});

// DELETE
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Use has been deleted ");
  } catch (err) {
    res.status(500).json({ "error in deleting": err });
  }
});

// // GET
// router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // console.log(product);
    if (!product) {
      return res.status(400).json("unable to get the product");
    }
    // const { password, ...others } = user._doc;
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ "error in getting product ": err });
  }
});

// // GET ALL PRODUCT
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ "error in getting user ": err });
  }
});

// // USER STATS

// router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
//   const date = new Date();
//   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//   try {
//     const data = await User.aggregate([
//       { $match: { createdAt: { $gte: lastYear } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: 1 },
//         },
//       },
//     ]);
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
