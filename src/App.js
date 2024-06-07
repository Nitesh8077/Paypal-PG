import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useState } from "react";
import "./App.css"; // Assuming you have an App.css file for styling

const App = () => {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderId, setOrderId] = useState(false);
  const [amount, setAmount] = useState(20); // Default amount set to 20

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Book",
            amount: {
              currency_code: "USD",
              value: amount,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderId) => {
        setOrderId(orderId);
        return orderId;
      });
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  const onError = (data, actions) => {
    setErrorMessage("An error occurred with your payment");
  };

  return (
    <div className="app-container">
      <PayPalScriptProvider
        options={{
          "client-id":
            "AVB1DeR563KPW_f2eYPtxYvqfn2TpkW2VNzfo6hdKiHRxf6MzumaP1YVYOc5KoVeMuVx5oh7CQoZMDgC",
        }}
      >
        <h1>Simple Book</h1>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="amount-input"
          placeholder="enter amount here"
        />
        <button onClick={() => setShow(true)} className="buy-now-button">
          Buy Now
        </button>

        {show ? (
          <div className="paypal-buttons-container">
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            />
          </div>
        ) : null}

        {success && <div className="success-message">Payment Successful!</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </PayPalScriptProvider>
    </div>
  );
};

export default App;
