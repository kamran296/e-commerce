import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
const Pay = () => {
  return (
    <div style={{height:"100vh",
    display: "flex",
    alignItems:"center",
    justifyContent:"center"
    }}>
      <button style={{border:"none",
    width:120,
    borderRadus:5,

    padding:"20px",
    backgroundColor:"black",
    color: "white",
    
    }}>Success</button>
    </div>
  )
}

export default Pay
