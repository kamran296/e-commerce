const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51MgWHqSD6j7eAITHUhvFi26dWDMZ1lVe7eMHpMBvHrQkaNoujt1np9gaBrP2vCqHE1dux44vEUg6lmbHGPQXnqOD00LL9fF1nR"
);
console.log(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
  await stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "inr",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
