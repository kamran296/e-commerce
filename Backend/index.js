const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const port = process.env.port;

const db = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");
const stripeRouter = require("./routes/stripe");
const cors = require("cors");
const app = express();
mongoose
  .connect(db)
  .then((con) => {
    console.log("Database connected successfully!!");
  })
  .catch((err) => {
    console.log("Error connecting the database!!", err);
  });
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/checkout", stripeRouter);
app.listen(port, () => {
  console.log(`serving on port ${port}`);
});
