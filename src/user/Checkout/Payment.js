import "./Payment.css";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import axios from "../../axios";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  EMPTY_BASKET,
  getBasketTotal,
  selectBasket,
} from "../../features/cartSlice";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
// import TypeWriter from "react-typewriter";
import Typewriter from "typewriter-effect";
import { selectUser } from "../../features/userSlice";
import { getAddressForm, ORDER_ID } from "../../features/addressForm";
import emailjs from "emailjs-com";
import OrderId from "order-id";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
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
  const order_id = OrderId("my-secret");
  const [clientSecret, setClientSecret] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  //   const [{ basket, user }, dispatch] = useStateValue();
  const basket = useSelector(selectBasket);
  const addressdetail = useSelector(getAddressForm);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const total = useSelector(getBasketTotal);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  var orderDetails = "";
  var order = basket.forEach((product, index) => {
    orderDetails +=
      "<tr><td style='border: 1px solid black; text-align:center'>" +
      product?.name +
      "</td> <td style='border: 1px solid black; text-align:center'>₹ " +
      (product?.originalPrice -
        product?.originalPrice * (product?.discount / 100)) +
      "</td> <td style='border: 1px solid black; text-align:center'>" +
      product?.cartValue +
      "</td> <td style='border: 1px solid black; text-align:center'>₹ " +
      (product?.originalPrice -
        product?.originalPrice * (product?.discount / 100)) *
        product?.cartValue +
      "</td> </tr>";
    return orderDetails;
  });
  console.log(orderDetails);

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
        const order__id = order_id.generate();
        const req = axios
          .post(`/orders`, {
            uid: user.uid,
            email: user.email,
            orderId: order__id,
            date: new Date().toString(),
            orderList: basket,
            status: 0,
            deliveryDate: null,
            placedBy: addressdetail,
            orderTotal: total,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => alert(error));
        dispatch(ORDER_ID({ orderid: order__id }));
        dispatch(EMPTY_BASKET());
        sendEmail(order__id);
        setSucceeded(true);
        setError(null);
        setProcessing(false);
      });
  };
  const sendEmail = (id) => {
    var templateParams = {
      to_name: user.name,
      to_email: user.email,
      order_id: id,
      message: `<div class="orders">
      <table
        style="width:100%; border: 1px solid black;
  text-align:center;"
      >
        <tr>
          <th
            style=" border: 1px solid black;
  text-align:center;"
          >
            Product Name
          </th>
          <th
            style=" border: 1px solid black;
  text-align:center;"
          >
            Product Price
          </th>
          <th
            style=" border: 1px solid black;
  text-align:center;"
          >
            Quantity
          </th>
          <th
            style=" border: 1px solid black;
  text-align:center;"
          >
            Total Price
          </th>
        </tr>
        ${orderDetails}
        <tr>
          <td colspan="4" style="text-align:right;padding-right:30px ">
            <b>Total : ₹ ${total}</b>
          </td>
        </tr>
      </table>
    </div>`,
    };
    console.log(templateParams);
    emailjs.send(
      "",
      "",
      templateParams,
      ""
    );
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
              <h1>Orders is placed successfully.</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
