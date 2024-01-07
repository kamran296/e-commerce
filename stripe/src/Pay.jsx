import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const key =
  "pk_test_51MgWHqSD6j7eAITHikKkzWCer3HmFR67fNQ99Igp9eH3Crt8JGsmeRpc3czIX1YjKvMi6aISl2dIXfXDWJDZGodU00e9wDSKY2";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/checkout/payment",
          { tokenId: stripeToken.id, amount: 2000 }
        );
        console.log(res.data);
        navigate("/success");
      } catch (error) {
        console.log(error.response.data, 123);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StripeCheckout
        name="kshop"
        image="./components/logo"
        billingAddress
        shippingAddress
        description="your total is 200"
        amount={20}
        token={onToken}
        stripeKey={key}
      >
        <button
          style={{
            border: "none",
            width: 120,
            borderRadus: 5,

            padding: "20px",
            backgroundColor: "black",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Pay
        </button>
      </StripeCheckout>
    </div>
  );
};

export default Pay;
