import "./Payment.css";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import axios from "../../axios";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { getBasketTotal, selectBasket } from "../../features/cartSlice";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
// import TypeWriter from "react-typewriter";
import Typewriter from "typewriter-effect";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
function Payment() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const history = useHistory();
  const [clientSecret, setClientSecret] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  //   const [{ basket, user }, dispatch] = useStateValue();
  const basket = useSelector(selectBasket);
  const total = useSelector(getBasketTotal);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies sub units
        url: `/payments/create?total=${total * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [total]);

  // console.log("the secret key is ", clientSecret);
  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        // console.log(paymentIntent);
        setSucceeded(true);
        setError(null);
        setProcessing(false);
      });
  };

  return (
    <div className="payment">
      {processing && (
        <div>
          <Backdrop className={classes.backdrop} open={open}>
            <div className="processing">
              <div className="processing__info">
                <h1>
                  You <bold>Payment</bold> is being under Process{"  "}
                </h1>
                <Typewriter
                  className="typewriter__Processing"
                  options={{
                    strings: ["..."],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
              <br />
              <CircularProgress color="inherit" />
            </div>
          </Backdrop>
        </div>
      )}
      <div className="payment__container">
        <div className="payment__section">
          <div className="payment__details">
            {/* Stripe Magic */}
            {!succeeded ? (
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                <div className="payment__priceContainer">
                  <CurrencyFormat
                    renderText={(value) => <h3>Order Total: {value}</h3>}
                    decimalScale={2}
                    value={total}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                  <button disabled={processing || disabled || succeeded}>
                    <span>
                      {processing ? <p>Processing</p> : "Confirm Payment"}
                    </span>
                  </button>
                </div>
                {error && <div>{error}</div>}
              </form>
            ) : (
              <h1>Payment Process is completed </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
